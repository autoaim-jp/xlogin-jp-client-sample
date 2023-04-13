/* /index/app.js */
import * as setting from '../_setting/index.js'

import * as output from './output.js'
import * as action from './action.js'
import * as lib from '../lib.js'

const asocial = {}
asocial.output = output
asocial.action = action
asocial.lib = lib
asocial.setting = setting
/* a is an alias of asocial */
const a = asocial

const main = async () => {
  a.lib.switchLoading(true)
  a.lib.setOnClickNavManu()
  a.lib.monkeyPatch()
  a.app.loadXloginButton()
  setTimeout(() => {
    a.lib.switchLoading(false)
  }, 300)
}

const loadXloginButton = async () => {
  const splitPermissionListResult = await a.lib.fetchSplitPermissionList(a.setting.getBrowserServerSetting().apiEndpoint)
  a.lib.reloadXloginLoginBtn(splitPermissionListResult.result.clientId)
}

a.app = {
  main,
  loadXloginButton,
}

a.app.main()

