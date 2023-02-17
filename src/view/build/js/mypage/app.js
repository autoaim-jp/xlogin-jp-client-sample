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
  return userInfoResult
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

const loadPermission = async () => {
  const splitPermissionListResult = await a.lib.fetchSplitPermissionList(a.setting.getBrowserServerSetting().apiEndpoint)
  a.output.showEditor(argNamed({
    param: { splitPermissionListResult },
  }))

  a.output.showBackupEmailAddressForm(argNamed({
    param: { splitPermissionListResult },
  }))

  a.lib.reloadXloginLoginBtn(splitPermissionListResult.result.clientId)
}

const loadTabBtn = async () => {
  const tabList = { editorTabContainer: 'エディタ', timerTabContainer: 'タイマー', backupEmailAddressFormTabContainer: 'バックアップメールアドレス' }
  const activeTabContainerId = Object.keys(tabList)[0]

  a.output.addTabMenuContainer(argNamed({
    lib: [a.lib.createTabMenuContainer, a.lib.showTabButton],
    param: { tabList, activeTabContainerId },
  }))
}

const loadBackupEmailAddressForm = async ({ userInfoResult }) => {
  const backupEmailAddress = a.input.getBackupEmailAddress(argNamed({
    param: { userInfoResult },
  }))
  a.output.showBackupEmailAddress(argNamed({
    param: { backupEmailAddress },
  }))


  const saveBackupEmailAddress = a.output.getSaveBackupEmailAddress(argNamed({
    browserServerSetting: a.setting.getBrowserServerSetting().get('apiEndpoint'),
    lib: [a.lib.postRequest],
  }))
  const onSubmitBackupEmailAddress = a.action.getOnSubmitBackupEmailAddress(argNamed({
    param: { saveBackupEmailAddress },
  }))
  a.output.setOnSubmitBackupEmailAddress(argNamed({
    param: { onSubmitBackupEmailAddress },
  }))
}

const main = async () => {
  a.lib.switchLoading(true)
  a.lib.setOnClickNavManu()
  a.lib.monkeyPatch()

  const userInfoResult = await a.app.loadProfile()
  await a.app.loadBackupEmailAddressForm({ userInfoResult })
  a.app.loadTimerBtn()
  a.app.loadMessageContent()
  a.app.loadMessageBtn()
  a.app.loadTabBtn()

  a.app.showNotification()
  a.app.loadPermission()

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
  loadPermission,
  loadTabBtn,
  loadBackupEmailAddressForm,
}

a.app.main()

