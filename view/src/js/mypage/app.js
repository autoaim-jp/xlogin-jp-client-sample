/* mypage/app.js */
import * as setting from '../_setting/index.js'
import * as lib from '../lib.js'

import * as input from './input.js'
import * as action from './action.js'
import * as output from './output.js'

const asocial = {}
asocial.setting = setting
asocial.lib = lib
asocial.input = input
asocial.action = action
asocial.output = output

/* a is an alias of asocial */
const a = asocial

const loadProfile = async () => {
  const userInfoResult = await a.input.fetchUserProfile(argNamed({
    browserServerSetting: a.setting.getBrowserServerSetting().get('apiEndpoint'),
    lib: [a.lib.getRequest],
  }))
  a.lib.redirect(userInfoResult)
  a.output.showUserProfile(argNamed({
    lib: [a.lib.applyElmList],
    other: { userInfoResult },
  }))
}

const loadTimerBtn = async () => {
  const addTimer = a.output.getAddTimer(argNamed({
    browserServerSetting: a.setting.getBrowserServerSetting().get('apiEndpoint'),
    lib: [a.lib.postRequest],
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
  }, 30 * 1000)
}

const loadMessageContent = async () => {
  const messageResult = await a.input.fetchMessage(argNamed({
    browserServerSetting: a.setting.getBrowserServerSetting().get('apiEndpoint'),
    lib: [a.lib.getRequest],
  }))

  a.output.showMessage(argNamed({
    param: { messageResult },
  }))
}

const loadMessageBtn = () => {
  const saveMessage = a.output.getSaveMessage(argNamed({
    browserServerSetting: a.setting.getBrowserServerSetting().get('apiEndpoint'),
    lib: [a.lib.postRequest],
  }))
  const onClickSaveMessageButton = a.action.getOnClickSaveMessageButton(argNamed({
    output: { saveMessage },
  }))
  a.output.setOnClickSaveMessageButton(argNamed({
    onClick: { onClickSaveMessageButton },
  }))

  const deleteMessage = a.output.getDeleteMessage(argNamed({
    browserServerSetting: a.setting.getBrowserServerSetting().get('apiEndpoint'),
    lib: [a.lib.postRequest],
  }))
  const onClickDeleteMessageButton = a.action.getOnClickDeleteMessageButton(argNamed({
    output: { deleteMessage },
  }))
  a.output.setOnClickDeleteMessageButton(argNamed({
    onClick: { onClickDeleteMessageButton },
  }))
}

const main = async () => {
  a.lib.switchLoading(true)
  a.lib.setOnClickNavManu()
  a.lib.monkeyPatch()

  await a.app.loadProfile()
  a.app.loadTimerBtn()
  a.app.loadMessageContent()
  a.app.loadMessageBtn()

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
  loadMessageContent,
  loadMessageBtn,
}

a.app.main()

