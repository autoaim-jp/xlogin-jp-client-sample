/* /setting/index.js */
import xdevkitSetting, { init as xdevkitSettingInit } from './xdevkitSetting.js'
import browserServerSetting from './browserServerSetting.js'

export const init = (env) => {
  xdevkitSettingInit(env)
}

export const setting = {}

setting.env = {}
setting.env.CLIENT_ID = process.env.CLIENT_ID
setting.env.SERVER_ORIGIN = process.env.SERVER_ORIGIN
setting.env.SESSION_SECRET = process.env.SESSION_SECRET
setting.env.TLS_KEY_PATH = process.env.TLS_KEY_PATH
setting.env.TLS_CERT_PATH = process.env.TLS_CERT_PATH
setting.env.SERVER_PORT = process.env.SERVER_PORT

setting.server = {}
setting.server.PUBLIC_BUILD_DIR = 'view/build'
setting.server.PUBLIC_STATIC_DIR = 'view/static'

setting.user = {}
setting.user.MESSAGE_FILE_PATH = '/message.txt'

setting.xdevkitSetting = xdevkitSetting
setting.bsc = browserServerSetting

