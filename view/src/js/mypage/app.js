/* mypage/app.js */
const asocial = {}
import * as setting from '../_setting/index.js'
asocial.setting = setting
import * as lib from '../lib.js'
asocial.lib = lib

import * as input from './input.js'
asocial.input = input
import * as action from './action.js'
asocial.action = action
import * as output from './output.js'
asocial.output = output

/* a is an alias of asocial */
const a = asocial

const loadProfile = async () => {
  const userInfoResult = await a.input.fetchUserProfile(argNamed({
    browserServerSetting: a.setting.getBrowserServerSetting().get('apiEndpoint'),
    lib: [ a.lib.getRequest ],
  }))
  a.lib.redirect(userInfoResult)
  a.output.showUserProfile(argNamed({
    lib: [ a.lib.applyElmList ],
    other: { userInfoResult },
  }))
}

const loadTimerBtn = async () => {
  const addTimer = a.output.getAddTimer(argNamed({
    browserServerSetting: a.setting.getBrowserServerSetting().get('apiEndpoint'),
    lib: [ a.lib.postRequest ],
  }))

  const onClickAddTimerButton = a.action.getOnClickAddTimerButton(argNamed({
    output: { addTimer },
  }))
  a.output.setOnClickAddTimerButton(argNamed({
    onClick: { onClickAddTimerButton },
  }))
}

const showNotification = () => {
  setInterval(() => {
    a.lib.showNotification(a.setting.bsc.apiEndpoint)
  }, 5 * 1000)
}

const main = async () => {
  a.lib.switchLoading(true)
  a.lib.setOnClickNavManu()
  a.lib.monkeyPatch()

  await a.app.loadProfile()
  a.app.loadTimerBtn()

  a.app.showNotification()

  setTimeout(() => {
    a.lib.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  loadProfile,
  loadTimerBtn,
  showNotification,
}

a.app.main()

