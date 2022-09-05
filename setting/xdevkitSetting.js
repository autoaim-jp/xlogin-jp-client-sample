/* /setting/xdevkitSetting.js */

const setting = {}
setting.session = {}
setting.session.SESSION_ID = 'sid'
setting.session.SESSION_COOKIE_SECURE = false
setting.session.REDIS_PORT = 6379
setting.session.REDIS_HOST = '127.0.0.1'
setting.session.REDIS_DB = 2

setting.api = {}
setting.api.API_VERSION = 'v0.7'
setting.api.STATE_L = 64
setting.api.CODE_VERIFIER_L = 64
setting.api.XLOGIN_RESPONSE_TYPE = 'code'
setting.api.XLOGIN_CODE_CHALLENGE_METHOD = 'S256'
setting.api.SCOPE = 'r:auth:emailAddress,*r:auth:userName,*r:$CLIENT_ID:serviceUserId,*rw:$CLIENT_ID:notification,rw:$CLIENT_ID:file'

setting.url = {}
setting.url.ERROR_PAGE = '/error'
setting.url.XLOGIN_AUTHORIZATION_ENDPOINT = `/api/${setting.api.API_VERSION}/auth/connect`
setting.url.XLOGIN_CODE_ENDPOINT = `/api/${setting.api.API_VERSION}/auth/code`
setting.url.XLOGIN_USER_INFO_ENDPOINT = `/api/${setting.api.API_VERSION}/user/info`
setting.url.XLOGIN_REDIRECT_URI = encodeURIComponent('/f/xlogin/callback')


export const init = (env) => {
  setting.env = {}
  setting.env.SERVER_ORIGIN = env.SERVER_ORIGIN
  setting.env.AUTH_SERVER_ORIGIN = env.AUTH_SERVER_ORIGIN
  setting.env.CLIENT_ID = env.CLIENT_ID

  setting.api.SCOPE = setting.api.SCOPE.replace(/\$CLIENT_ID/g, env.CLIENT_ID)
}

export default setting

