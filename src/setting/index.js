/* /setting/index.js */
import xdevkitSetting, { init as xdevkitSettingInit } from './xdevkitSetting.js'
import browserServerSetting from './browserServerSetting.js'

export const setting = {}

export const init = (env) => {
  xdevkitSettingInit(env)

  setting.env = {}
  setting.env.CLIENT_ID = env.CLIENT_ID
  setting.env.SERVER_ORIGIN = env.SERVER_ORIGIN
  setting.env.SESSION_SECRET = env.SESSION_SECRET
  setting.env.TLS_KEY_PATH = env.TLS_KEY_PATH
  setting.env.TLS_CERT_PATH = env.TLS_CERT_PATH
  setting.env.SERVER_PORT = env.SERVER_PORT
}


setting.server = {}
setting.server.PUBLIC_BUILD_DIR = 'view/build'
setting.server.PUBLIC_STATIC_DIR = 'view/static'

setting.user = {}
setting.user.MESSAGE_FILE_PATH = '/message.txt'

setting.xdevkitSetting = xdevkitSetting
setting.browserServerSetting = browserServerSetting

