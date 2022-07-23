const setting = {}
setting.server = {}
setting.server.PUBLIC_BUILD_DIR = 'view/build'
setting.server.PUBLIC_STATIC_DIR = 'view/static'


setting.url = {}
setting.url.ERROR_PAGE = '/error'

setting.session = {}
setting.session.SESSION_ID = 'sid'
setting.session.SESSION_COOKIE_SECURE = false
setting.session.REDIS_PORT = 6379
setting.session.REDIS_HOST = '127.0.0.1'
setting.session.REDIS_DB = 2

export const init = (env) => {
  setting.env = {}
  setting.env.SERVER_ORIGIN = env.SERVER_ORIGIN
  setting.env.AUTH_SERVER_ORIGIN = env.AUTH_SERVER_ORIGIN
  setting.env.CLIENT_ID = env.CLIENT_ID
}

export default setting

