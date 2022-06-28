const https = require('https')
const express = require('express')
const session = require('express-session')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const Redis = require('ioredis')
const RedisStore = require('connect-redis')(session)
require('dotenv').config()
process.env.APP_PATH = `${__dirname}/`

const xdevkitLib = require('./xdevkitLib.js')
const lib = require('./lib.js')
const statusList = require('./statusList.js')
const scc = require('./serverCommonConstant.js')

const CLIENT_ID = process.env.CLIENT_ID
const XLOGIN_REDIRECT_URI = encodeURIComponent(`${process.env.SERVER_ORIGIN}/f/xlogin/callback`)

/* xdevkit common constant */
const xdevkitConstant = {}
xdevkitConstant.STATE_L = 64
xdevkitConstant.CODE_VERIFIER_L = 64
xdevkitConstant.XLOGIN_SCOPE = 'read_user'
xdevkitConstant.XLOGIN_ISSUER = process.env.AUTH_SERVER_ORIGIN
xdevkitConstant.XLOGIN_RESPONSE_TYPE = 'code'
xdevkitConstant.XLOGIN_CODE_CHALLENGE_METHOD = 'S256'

xdevkitConstant.XLOGIN_AUTHORIZATION_ENDPOINT = `${process.env.AUTH_SERVER_ORIGIN}/api/v0.2/auth/connect`
xdevkitConstant.XLOGIN_CODE_ENDPOINT = `${process.env.AUTH_SERVER_ORIGIN}/api/v0.2/auth/code`
xdevkitConstant.XLOGIN_USER_INFO_ENDPOINT = `${process.env.AUTH_SERVER_ORIGIN}/api/v0.2/user/info`

/* server common constant */

/* POST /f/xlogin/connect */
const handleXloginConnect = (redirectAfterAuth) => {
  const oidcSessionPart = {}
  oidcSessionPart['iss'] = xdevkitConstant.XLOGIN_ISSUER
  oidcSessionPart['code_verifier'] = xdevkitLib.getRandomStr(xdevkitConstant.CODE_VERIFIER_L)
  oidcSessionPart['redirect_after_auth'] = redirectAfterAuth

  const oidcQueryParam = {}
  oidcQueryParam['code_challenge_method'] = xdevkitConstant.XLOGIN_CODE_CHALLENGE_METHOD
  oidcQueryParam['code_challenge'] = xdevkitLib.convertToCodeChallenge(oidcSessionPart['code_verifier'], oidcQueryParam['code_challenge_method'])
  oidcQueryParam['state'] = xdevkitLib.getRandomStr(xdevkitConstant.STATE_L)
  oidcQueryParam['response_type'] = xdevkitConstant.XLOGIN_RESPONSE_TYPE 
  oidcQueryParam['scope'] = xdevkitConstant.XLOGIN_SCOPE
  oidcQueryParam['client_id'] = CLIENT_ID
  oidcQueryParam['redirect_uri'] = XLOGIN_REDIRECT_URI

  const oidcQueryStr = xdevkitLib.objToQuery(oidcQueryParam) 
  const redirectTo = `${xdevkitConstant.XLOGIN_AUTHORIZATION_ENDPOINT}?${oidcQueryStr}`

  const newUserSession = { oidc: Object.assign(oidcSessionPart, oidcQueryParam) }

  const status = statusList.OK
  return { status, session: newUserSession, response: null, redirect: redirectTo }
}

/* GET /f/xlogin/callback */
const handleXloginCode = (state, code, iss, userSession) => {
  if (!userSession || !userSession.oidc) {
    const status = statusList.INVALID_SESSION
    return { status, session: {}, response: null, redirect: scc.url.ERROR_PAGE }
  }

  if (state !== userSession.oidc['state']) {
    const status = statusList.INVALID_SESSION
    return { status, session: null, response: null, redirect: scc.url.ERROR_PAGE }
  }

  if (iss !== userSession.oidc['iss']) {
    const status = statusList.INVALID_OIDC_ISSUER
    return { status, session: null, response: null, redirect: scc.url.ERROR_PAGE }
  }

  /* request access_token */
  const accessTokenResponse = xdevkitLib.getAccessTokenByCode(code, userSession.oidc, xdevkitConstant.XLOGIN_CODE_ENDPOINT)
  if (!accessTokenResponse) {
    const status = statusList.INVALID_SESSION
    return { status, session: null, response: null, redirect: scc.url.ERROR_PAGE }
  }

  if (accessTokenResponse.error || !accessTokenResponse.content || !accessTokenResponse.content['access_token']) {
    const status = statusList.API_ERROR
    return { status, session: null, response: null, redirect: scc.url.ERROR_PAGE, error: encodeURIComponent(accessTokenResponse.error) }
  }

  /* request user_info */
  const accessToken = accessTokenResponse.content['access_token']
  const userInfoResponse = xdevkitLib.getUserInfo(accessToken, xdevkitConstant.XLOGIN_USER_INFO_ENDPOINT)
  if (!userInfoResponse) {
    const status = statusList.INVALID_SESSION
    return { status, session: null, response: null, redirect: scc.url.ERROR_PAGE }
  }
  if (userInfoResponse.error || !userInfoResponse.content || !userInfoResponse.content['user_info']) {
    const status = statusList.API_ERROR
    return { status, session: null, response: null, redirect: scc.url.ERROR_PAGE, error: encodeURIComponent(userInfoResponse.error) }
  }

  const userInfo = userInfoResponse.content['user_info']
  const status = statusList.LOGIN_SUCCESS
  const redirectTo = xdevkitLib.addQueryStr(userSession.oidc['redirect_after_auth'], xdevkitLib.objToQuery({ code: status }))

  return { status, session: { userInfo }, response: null, redirect: redirectTo }
}

const output = (req, res, handleResult) => {
  console.log('output error:', handleResult.error)
  req.session.auth = handleResult.session

  if (handleResult.response) {
    return res.json(handleResult.response)
  } else if (handleResult.redirect) {
    return res.redirect(handleResult.redirect)
  } else {
    return res.redirect(scc.url.ERROR_PAGE)
  }
}

const main = () => {
  const expressApp = express()
  expressApp.use(helmet())
  const redis = new Redis({
    port: scc.session.REDIS_PORT,
    host: scc.session.REDIS_HOST,
    db: scc.session.REDIS_DB,
  })
  expressApp.use(session({
    secret : process.env.SESSION_SECRET, 
    resave : true,
    saveUninitialized : true,                
    rolling : true,
    name : scc.session.SESSION_ID,
    cookie: {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: scc.session.SESSION_COOKIE_SECURE,
      httpOnly: true,
      sameSite: 'lax',
    },
    store: new RedisStore({ client: redis }),
  }))

  expressApp.use(bodyParser.urlencoded({ extended: true }))
  expressApp.use(bodyParser.json())

  expressApp.use((req, res, next) => {
    /*
    if (req.headers['origin']) {
      return res.status(403).end('0')
    }
    */
    return next()
  })

  expressApp.get('/f/xlogin/connect', (req, res) => {
    const { redirectAfterAuth } = req.query
    const resultHandleXloginConnect = handleXloginConnect(redirectAfterAuth)
    output(req, res, resultHandleXloginConnect)
  })

  expressApp.get('/f/xlogin/callback', (req, res) => {
    /*
    res.end('<script>window.location.href = `/f/xlogin/callbackAfterRedirect${window.location.search}`</script>')
  })

  expressApp.get('/f/xlogin/callbackAfterRedirect', (req, res) => {
  */
    const { state, code, iss } = req.query
    const resultHandleXloginCode = handleXloginCode(state, code, iss, req.session.auth)
    output(req, res, resultHandleXloginCode)
  })

  expressApp.use(express.static(scc.server.PUBLIC_BUILD_DIR, { index: 'index.html', extensions: ['html'] }))
  expressApp.use(express.static(scc.server.PUBLIC_STATIC_DIR, { index: 'index.html', extensions: ['html'] }))
 
  if (process.env.SERVER_ORIGIN.indexOf('https') >= 0) {
    const tlsConfig = {
      key: fs.readFileSync(process.env.TLS_KEY_PATH),
      cert: fs.readFileSync(process.env.TLS_CERT_PATH),
    }
    const server = https.createServer(tlsConfig, expressApp)
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Example app listening at port: ${process.env.SERVER_PORT}, origin: ${process.env.SERVER_ORIGIN}`)
    })
  } else {
    expressApp.listen(process.env.SERVER_PORT, () => {
      console.log(`Example app listening at port: ${process.env.SERVER_PORT}, origin: ${process.env.SERVER_ORIGIN}`)
    })
  }

  console.log('==================================================')

  const resultHandleXloginConnect = handleXloginConnect('/')
  console.log(resultHandleXloginConnect)
  console.log('==================================================')

  const state = 'state'
  const iss = xdevkitConstant.XLOGIN_ISSUER
  const client_id = CLIENT_ID
  const code_verifier = 'code_verifier'
  const redirect_after_auth = `${process.env.SERVER_ORIGIN}/`
  const resultHandlerXloginCode = handleXloginCode(state, 'code', iss, { oidc: { state, iss, client_id, code_verifier, redirect_after_auth } })
  console.log(resultHandlerXloginCode)
  console.log('==================================================')
  console.log(`open: ${process.env.SERVER_ORIGIN}/f/xlogin/connect`)
}

main()

