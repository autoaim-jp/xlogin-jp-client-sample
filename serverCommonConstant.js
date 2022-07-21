const scc = {}
scc.server = {}
scc.server.PUBLIC_BUILD_DIR = 'view/build'
scc.server.PUBLIC_STATIC_DIR = 'view/static'


scc.url = {}
scc.url.ERROR_PAGE = '/error'

scc.session = {}
scc.session.SESSION_ID = 'sid'
scc.session.SESSION_COOKIE_SECURE = false
scc.session.REDIS_PORT = 6379
scc.session.REDIS_HOST = '127.0.0.1'
scc.session.REDIS_DB = 2

export const init = (env) => {
  scc.env = {}
  scc.env.SERVER_ORIGIN = env.SERVER_ORIGIN
  scc.env.AUTH_SERVER_ORIGIN = env.AUTH_SERVER_ORIGIN
  scc.env.CLIENT_ID = env.CLIENT_ID
}

export default scc

