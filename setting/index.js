/* /setting/index.js */
import xdevkitSetting, { init as xdevkitSettingInit } from './xdevkitSetting.js'

export const init = (env) => {
  xdevkitSettingInit(env)
}

export const setting = {}
setting.server = {}
setting.server.PUBLIC_BUILD_DIR = 'view/build'
setting.server.PUBLIC_STATIC_DIR = 'view/static'

export const getXdevkitSetting = () => {
  return xdevkitSetting
}

