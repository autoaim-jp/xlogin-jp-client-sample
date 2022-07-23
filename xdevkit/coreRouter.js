import lib from './lib.js'

const mod = {}

const XLOGIN_REDIRECT_URI = encodeURIComponent('/f/xlogin/callback')
const scope = 'r:emailAddress,*r:userName,*r:serviceUserId'
const filterKeyList = ['emailAddress', 'userName', 'serviceUserId']

/* xdevkit common constant */
const xdevkitConstant = {}
xdevkitConstant.API_VERSION = 'v0.7'
xdevkitConstant.STATE_L = 64
xdevkitConstant.CODE_VERIFIER_L = 64
xdevkitConstant.XLOGIN_RESPONSE_TYPE = 'code'
xdevkitConstant.XLOGIN_CODE_CHALLENGE_METHOD = 'S256'

xdevkitConstant.XLOGIN_AUTHORIZATION_ENDPOINT = `/api/${xdevkitConstant.API_VERSION}/auth/connect`
xdevkitConstant.XLOGIN_CODE_ENDPOINT = `/api/${xdevkitConstant.API_VERSION}/auth/code`
xdevkitConstant.XLOGIN_USER_INFO_ENDPOINT = `/api/${xdevkitConstant.API_VERSION}/user/info`

const init = (express, setting, browserServerSetting) => {
  mod.express = express
  mod.setting = setting
  mod.bsc = browserServerSetting
}

const coreGetErrorResponse = (status, error, isServerRedirect, response = null, session = {}) => {
  const redirect = `${mod.setting.url.ERROR_PAGE}?error=${encodeURIComponent(error)}`
  if (isServerRedirect) {
    return { status, session, response, redirect, error }
  } else {
    if (response) {
      return { status, session, response, error }
    } else {
      return { status, session, response: { status, error, redirect }, error }
    }
  }
}

/* POST /f/xlogin/connect */
const handleXloginConnect = (redirectAfterAuth) => {
  const oidcSessionPart = {}
  oidcSessionPart['iss'] = mod.setting.env.AUTH_SERVER_ORIGIN
  oidcSessionPart['codeVerifier'] = lib.getRandomB64UrlSafe(xdevkitConstant.CODE_VERIFIER_L)
  oidcSessionPart['redirectAfterAuth'] = redirectAfterAuth

  const oidcQueryParam = {}
  oidcQueryParam['codeChallengeMethod'] = xdevkitConstant.XLOGIN_CODE_CHALLENGE_METHOD
  oidcQueryParam['codeChallenge'] = lib.convertToCodeChallenge(oidcSessionPart['codeVerifier'], oidcQueryParam['codeChallengeMethod'])
  oidcQueryParam['state'] = lib.getRandomB64UrlSafe(xdevkitConstant.STATE_L)
  oidcQueryParam['responseType'] = xdevkitConstant.XLOGIN_RESPONSE_TYPE 
  oidcQueryParam['scope'] = scope
  oidcQueryParam['clientId'] = mod.setting.env.CLIENT_ID
  oidcQueryParam['redirectUri'] = mod.setting.env.SERVER_ORIGIN + XLOGIN_REDIRECT_URI

  const oidcQueryStr = lib.objToQuery(oidcQueryParam) 
  const redirectTo = `${mod.setting.env.AUTH_SERVER_ORIGIN}${xdevkitConstant.XLOGIN_AUTHORIZATION_ENDPOINT}?${oidcQueryStr}`

  const newUserSession = { oidc: Object.assign(oidcSessionPart, oidcQueryParam) }

  const status = mod.bsc.statusList.OK
  return { status, session: newUserSession, response: null, redirect: redirectTo }
}

/* GET /f/xlogin/callback */
const handleXloginCode = async (state, code, iss, userSession) => {
  if (!userSession || !userSession.oidc) {
    const status = mod.bsc.statusList.INVALID_SESSION
    const error = 'handle_xlogin_code_session'
    return coreGetErrorResponse(status, error, true)
  }

  if (state !== userSession.oidc['state']) {
    const status = mod.bsc.statusList.INVALID_SESSION
    const error = 'handle_xlogin_code_state'
    return coreGetErrorResponse(status, error, true)
  }

  if (iss !== userSession.oidc['iss']) {
    const status = mod.bsc.statusList.INVALID_OIDC_ISSUER
    const error = 'handle_xlogin_code_iss'
    return coreGetErrorResponse(status, error, true)
  }

  /* request accessToken */
  const accessTokenResponse = await lib.getAccessTokenByCode(lib.apiRequest, code, userSession.oidc, mod.setting.env.AUTH_SERVER_ORIGIN + xdevkitConstant.XLOGIN_CODE_ENDPOINT)
  if (!accessTokenResponse) {
    const status = mod.bsc.statusList.INVALID_SESSION
    const error = 'handle_xlogin_code_access_token'
    return coreGetErrorResponse(status, error, true)
  }

  const accessToken = accessTokenResponse?.data?.result?.accessToken
  if (accessTokenResponse.error || !accessToken) {
    const status = mod.bsc.statusList.API_ERROR
    const error = encodeURIComponent(accessTokenResponse.error)
    return coreGetErrorResponse(status, error, true)
  }

  /* request userInfo */
  const userInfoResponse = await lib.getUserInfo(lib.apiRequest, mod.setting.env.CLIENT_ID, filterKeyList, accessToken, mod.setting.env.AUTH_SERVER_ORIGIN + xdevkitConstant.XLOGIN_USER_INFO_ENDPOINT)
  if (!userInfoResponse) {
    const status = mod.bsc.statusList.INVALID_SESSION
    const error = 'handle_xlogin_code_user_info'
    return coreGetErrorResponse(status, error, true)
  }

  const userInfo = userInfoResponse?.data?.result?.userInfo
  if (userInfoResponse.error || !userInfo) {
    const status = mod.bsc.statusList.API_ERROR
    const error = encodeURIComponent(userInfoResponse.error)
    return coreGetErrorResponse(status, error, true)
  }

  const status = mod.bsc.statusList.LOGIN_SUCCESS
  const redirectTo = lib.addQueryStr(userSession.oidc['redirectAfterAuth'], lib.objToQuery({ code: status }))

  return { status, session: { userInfo }, response: null, redirect: redirectTo }
}

/* GET /f/user/profile */
const handleUserProfile = (authSession) => {
  if (!authSession || !authSession.userInfo) {
    const status = mod.bsc.statusList.INVALID_SESSION
    const error = 'handle_user_profile_session'
    return coreGetErrorResponse(status, error, false)
  }

  const { userInfo } = authSession
  const status = mod.bsc.statusList.OK
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
    return res.redirect(mod.setting.url.ERROR_PAGE)
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


export default {
  init,
  getRouter,
}

