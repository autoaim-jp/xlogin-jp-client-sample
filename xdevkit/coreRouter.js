const mod = {}
const lib = require('./lib.js')

const CLIENT_ID = process.env.CLIENT_ID
const XLOGIN_REDIRECT_URI = encodeURIComponent(`${process.env.SERVER_ORIGIN}/f/xlogin/callback`)
const scope = 'r:email_address,*r:user_name,*r:service_user_id'
const filter_key_list = ['email_address', 'user_name', 'service_user_id']

/* xdevkit common constant */
const xdevkitConstant = {}
xdevkitConstant.API_VERSION = 'v0.7'
xdevkitConstant.STATE_L = 64
xdevkitConstant.CODE_VERIFIER_L = 64
xdevkitConstant.XLOGIN_ISSUER = process.env.AUTH_SERVER_ORIGIN
xdevkitConstant.XLOGIN_RESPONSE_TYPE = 'code'
xdevkitConstant.XLOGIN_CODE_CHALLENGE_METHOD = 'S256'

xdevkitConstant.XLOGIN_AUTHORIZATION_ENDPOINT = `${process.env.AUTH_SERVER_ORIGIN}/api/${xdevkitConstant.API_VERSION}/auth/connect`
xdevkitConstant.XLOGIN_CODE_ENDPOINT = `${process.env.AUTH_SERVER_ORIGIN}/api/${xdevkitConstant.API_VERSION}/auth/code`
xdevkitConstant.XLOGIN_USER_INFO_ENDPOINT = `${process.env.AUTH_SERVER_ORIGIN}/api/${xdevkitConstant.API_VERSION}/user/info`

const init = (express, scc, statusList) => {
  mod.express = express
  mod.scc = scc
  mod.statusList = statusList
}

/* POST /f/xlogin/connect */
const handleXloginConnect = (redirectAfterAuth) => {
  const oidcSessionPart = {}
  oidcSessionPart['iss'] = xdevkitConstant.XLOGIN_ISSUER
  oidcSessionPart['code_verifier'] = lib.getRandomB64UrlSafe(xdevkitConstant.CODE_VERIFIER_L)
  oidcSessionPart['redirect_after_auth'] = redirectAfterAuth

  const oidcQueryParam = {}
  oidcQueryParam['code_challenge_method'] = xdevkitConstant.XLOGIN_CODE_CHALLENGE_METHOD
  oidcQueryParam['code_challenge'] = lib.convertToCodeChallenge(oidcSessionPart['code_verifier'], oidcQueryParam['code_challenge_method'])
  oidcQueryParam['state'] = lib.getRandomB64UrlSafe(xdevkitConstant.STATE_L)
  oidcQueryParam['response_type'] = xdevkitConstant.XLOGIN_RESPONSE_TYPE 
  oidcQueryParam['scope'] = scope
  oidcQueryParam['client_id'] = CLIENT_ID
  oidcQueryParam['redirect_uri'] = XLOGIN_REDIRECT_URI

  const oidcQueryStr = lib.objToQuery(oidcQueryParam) 
  const redirectTo = `${xdevkitConstant.XLOGIN_AUTHORIZATION_ENDPOINT}?${oidcQueryStr}`

  const newUserSession = { oidc: Object.assign(oidcSessionPart, oidcQueryParam) }

  const status = mod.statusList.OK
  return { status, session: newUserSession, response: null, redirect: redirectTo }
}

/* GET /f/xlogin/callback */
const handleXloginCode = async (state, code, iss, userSession) => {
  if (!userSession || !userSession.oidc) {
    const status = mod.statusList.INVALID_SESSION
    return { status, session: {}, response: null, redirect: mod.scc.url.ERROR_PAGE }
  }

  if (state !== userSession.oidc['state']) {
    const status = mod.statusList.INVALID_SESSION
    return { status, session: null, response: null, redirect: mod.scc.url.ERROR_PAGE }
  }

  if (iss !== userSession.oidc['iss']) {
    const status = mod.statusList.INVALID_OIDC_ISSUER
    return { status, session: null, response: null, redirect: mod.scc.url.ERROR_PAGE }
  }

  /* request access_token */
  const accessTokenResponse = await lib.getAccessTokenByCode(lib.apiRequest, code, userSession.oidc, xdevkitConstant.XLOGIN_CODE_ENDPOINT)
  if (!accessTokenResponse) {
    const status = mod.statusList.INVALID_SESSION
    return { status, session: null, response: null, redirect: mod.scc.url.ERROR_PAGE }
  }

  const accessToken = accessTokenResponse?.data?.result?.access_token
  if (accessTokenResponse.error || !accessToken) {
    const status = mod.statusList.API_ERROR
    return { status, session: null, response: null, redirect: mod.scc.url.ERROR_PAGE, error: encodeURIComponent(accessTokenResponse.error) }
  }

  /* request user_info */
  const userInfoResponse = await lib.getUserInfo(lib.apiRequest, CLIENT_ID, filter_key_list, accessToken, xdevkitConstant.XLOGIN_USER_INFO_ENDPOINT)
  if (!userInfoResponse) {
    const status = mod.statusList.INVALID_SESSION
    return { status, session: null, response: null, redirect: mod.scc.url.ERROR_PAGE }
  }

  const userInfo = userInfoResponse?.data?.result?.user_info
  if (userInfoResponse.error || !userInfo) {
    const status = mod.statusList.API_ERROR
    return { status, session: null, response: null, redirect: mod.scc.url.ERROR_PAGE, error: encodeURIComponent(userInfoResponse.error) }
  }

  const status = mod.statusList.LOGIN_SUCCESS
  const redirectTo = lib.addQueryStr(userSession.oidc['redirect_after_auth'], lib.objToQuery({ code: status }))

  return { status, session: { userInfo }, response: null, redirect: redirectTo }
}

/* GET /f/user/profile */
const handleUserProfile = (authSession) => {
  if (!authSession || !authSession.userInfo) {
    const status = mod.statusList.INVALID_SESSION
    const redirectTo = mod.scc.url.ERROR_PAGE
    return { status, session: {}, response: { redirect: redirectTo }, }
  }

  const { userInfo } = authSession
  const status = mod.statusList.OK
  return { status, session: authSession, response: { userInfo } }
}

const output = (req, res, handleResult) => {
  console.log('output error:', handleResult.error)
  req.session.auth = handleResult.session

  if (handleResult.response) {
    return res.json(handleResult.response)
  } else if (handleResult.redirect) {
    return res.redirect(handleResult.redirect)
  } else {
    return res.redirect(mod.scc.url.ERROR_PAGE)
  }
}

const getRouter = () => {
  const expressRouter = mod.express.Router()

  expressRouter.get('/f/xlogin/connect', (req, res) => {
    const { redirectAfterAuth } = req.query
    const resultHandleXloginConnect = handleXloginConnect(redirectAfterAuth)
    output(req, res, resultHandleXloginConnect)
  })

  expressRouter.get('/f/xlogin/callback', async (req, res) => {
    const { state, code, iss } = req.query
    const resultHandleXloginCode = await handleXloginCode(state, code, iss, req.session.auth)
    output(req, res, resultHandleXloginCode)
  })

  expressRouter.get('/f/user/profile', (req, res) => {
    const resultHandleUserProfile = handleUserProfile(req.session.auth)
    output(req, res, resultHandleUserProfile)
  })

  return expressRouter
}


module.exports = {
  init,
  getRouter,
}

