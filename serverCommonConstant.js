const scc = {}
scc.server = {}
scc.server.PORT = 3001
scc.server.PUBLIC_DIR = `${process.env.APP_PATH}public`

scc.url = {}
scc.url.ERROR_PAGE = '/error'

scc.session = {}
scc.session.SESSION_ID = 'sid'
scc.session.SESSION_COOKIE_SECURE = false
scc.session.REDIS_PORT = 6379
scc.session.REDIS_HOST = '127.0.0.1'
scc.session.REDIS_DB = 2


module.exports = scc

