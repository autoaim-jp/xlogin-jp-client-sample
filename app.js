const xdevkitLib = require('./xdevkitLib.js')
const lib = require('./lib.js')
const statusList = require('./statusList.js')

const CLIENT_ID = 'foo'
const XLOGIN_REDIRECT_URI = encodeURIComponent('https://sample.reiwa.co/f/xlogin/callback')

/* xdevkit common constant */
const xdevkitConstant = {}
xdevkitConstant.STATE_L = 64
xdevkitConstant.CODE_VERIFIER_L = 64
xdevkitConstant.XLOGIN_SCOPE = 'read_user'
xdevkitConstant.XLOGIN_ISSUER = 'https://xlogin.jp'
xdevkitConstant.XLOGIN_RESPONSE_TYPE = 'code'
xdevkitConstant.XLOGIN_CODE_CHALLENGE_METHOD = 'S256'

xdevkitConstant.XLOGIN_AUTHORIZATION_ENDPOINT = 'https://xlogin.jp/api/v0.2/auth/connect'
xdevkitConstant.XLOGIN_CODE_ENDPOINT = 'https://xlogin.jp/api/v0.2/auth/code'
xdevkitConstant.XLOGIN_USER_INFO_ENDPOINT = 'https://xlogin.jp/api/v0.2/user/info'

/* server common constant */
const scc = {}
scc.url = {}
scc.url.ERROR_PAGE = '/error'

scc.session = {}
scc.session.SESSION_ID_VERIFIER_L = 64
scc.session.SESSION_ID = 'sid'
scc.session.SESSION_ID_VERIFIER = 'sidv'


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

  const { sessionId, sessionIdVerifier } = lib.generateSessionId(scc.session.SESSION_ID_VERIFIER_L)
  const newUserSession = { oidc: Object.assign(oidcSessionPart, oidcQueryParam) }


  const status = statusList.OK
  return { status, cookie: [[scc.session.SESSION_ID, sessionId, {}], [scc.session.SESSION_ID_VERIFIER, sessionIdVerifier, {}]], sessionId, session: newUserSession, response: null, redirect: redirectTo }
}

/* GET /f/xlogin/callback */
const handleXloginCode = (state, code, iss, sessionId, userSession) => {
  /*
  // inputでバリデーションを行う
  if (!state || !code || !iss) {
    const status = statusList.NOT_ENOUGH_PARAM
    return { status, session: null, response: null, redirect: scc.url.ERROR_PAGE }
  }
  */

  if (!sessionId || !userSession || !userSession.oidc) {
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
  console.log('?')

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
  const { sessionId: newSessionId, sessionIdVerifier: newSessionIdVerifier } = lib.generateSessionId(scc.session.SESSION_ID_VERIFIER_L)
  const redirectTo = xdevkitLib.addQueryStr(userSession.oidc['redirect_after_auth'], xdevkitLib.objToQuery({ code: status }))

  return { status, cookie: [[scc.session.SESSION_ID, newSessionId, {}], [scc.session.SESSION_ID_VERIFIER, newSessionIdVerifier, {}]], sessionId: newSessionId, session: { userInfo }, response: null, redirect: redirectTo }
}


const main = () => {
  console.log('==================================================')

  const resultHandleXloginConnect = handleXloginConnect('/')
  console.log(resultHandleXloginConnect)
  console.log('==================================================')

  const state = 'state'
  const iss = xdevkitConstant.XLOGIN_ISSUER
  const client_id = 'foo'
  const code_verifier = 'code_verifier'
  const redirect_after_auth = 'https://sample.reiwa.co/'
  const resultHandlerXloginCode = handleXloginCode(state, 'code', iss, 'sessionId', { oidc: { state, iss, client_id, code_verifier, redirect_after_auth } })
  console.log(resultHandlerXloginCode)
  console.log('==================================================')
}

main()

