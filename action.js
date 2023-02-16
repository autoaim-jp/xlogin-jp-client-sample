/* /action.js */
const mod = {}

const init = (setting, lib) => {
  mod.setting = setting
  mod.lib = lib
}

const handleTimerAdd = (req, res) => {
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/notification/append`
  const { accessToken } = req.session.auth
  setTimeout(async () => {
    const param = {
      notificationRange: mod.setting.xdevkitSetting.env.CLIENT_ID,
      subject: 'timer',
      detail: 'TIME\'S UP!',
    }
    const timerAddResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)
    console.log({ timerAddResponse })
  }, 10 * 1000)

  const status = mod.setting.bsc.statusList.OK
  res.json({ status })
}

const handleNotificationOpen = async (req, res) => {
  const { notificationIdList } = req.body
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/notification/open`
  const { accessToken } = req.session.auth
  const param = {
    notificationRange: mod.setting.xdevkitSetting.env.CLIENT_ID,
    notificationIdList,
  }
  const notificationOpenResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)
  console.log({ notificationOpenResponse })

  const status = mod.setting.bsc.statusList.OK
  res.json({ status })
}

const handleNotificationList = async (req, res) => {
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/notification/list`
  const { accessToken } = req.session.auth
  const param = { notificationRange: mod.setting.xdevkitSetting.env.CLIENT_ID }
  const notificationListResponse = await mod.lib.getRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)

  const { result } = notificationListResponse.data
  const status = mod.setting.bsc.statusList.OK
  res.json({ status, result })
}

const handleMessageSave = async (req, res) => {
  const { message } = req.body
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/file/update`
  const { accessToken } = req.session.auth
  const param = {
    owner: mod.setting.xdevkitSetting.env.CLIENT_ID,
    filePath: mod.setting.user.MESSAGE_FILE_PATH,
    content: message,
  }
  const fileSaveResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)
  console.log({ fileSaveResponse })

  const status = mod.setting.bsc.statusList.OK
  res.json({ status })
}

const handleMessageContent = async (req, res) => {
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/file/content`
  const { accessToken } = req.session.auth
  const param = {
    owner: mod.setting.xdevkitSetting.env.CLIENT_ID,
    filePath: mod.setting.user.MESSAGE_FILE_PATH,
  }
  const fileGetResponse = await mod.lib.getRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)
  console.log({ fileGetResponse })

  const { result } = fileGetResponse.data

  const status = mod.setting.bsc.statusList.OK
  res.json({ status, result })
}

const handleMessageDelete = async (req, res) => {
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/file/delete`
  const { accessToken } = req.session.auth
  const param = {
    owner: mod.setting.xdevkitSetting.env.CLIENT_ID,
    filePath: mod.setting.user.MESSAGE_FILE_PATH,
  }
  const fileDeleteResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)
  console.log({ fileDeleteResponse })

  const status = mod.setting.bsc.statusList.OK
  res.json({ status })
}

const handleFileList = async (req, res) => {
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/file/list`
  const { accessToken } = req.session.auth
  const { filePath } = req.query
  const param = {
    owner: mod.setting.xdevkitSetting.env.CLIENT_ID,
    filePath,
  }
  const fileListResponse = await mod.lib.getRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)
  console.log({ fileListResponse })

  const { result } = fileListResponse.data

  const status = mod.setting.bsc.statusList.OK
  res.json({ status, result })
}


const handleSplitPermissionList = async (req, res) => {
  if (!req.session || !req.session.auth) {
    const status = mod.setting.bsc.statusList.INVALID_SESSION
    const result = {}
    res.json({ status, result })
    return
  }
  const { splitPermissionList } = req.session.auth
  const clientId = setting.env.CLIENT_ID
  const result = { splitPermissionList, clientId }

  const status = mod.setting.bsc.statusList.OK
  res.json({ status, result })
}


const handleUpdateBackupEmailAddress = async (req, res) => {
  const { backupEmailAddress } = req.body
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/user/update`
  const { accessToken } = req.session.auth
  const param = {
    backupEmailAddress,
  }
  const updateBackupEmailAddressResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)
  const { result } = updateBackupEmailAddressResponse.data
  console.log({ updateBackupEmailAddressResponse })

  const status = mod.setting.bsc.statusList.OK
  res.json({ status, result })
}


export default {
  init,
  handleTimerAdd,
  handleNotificationOpen,
  handleNotificationList,
  handleMessageSave,
  handleMessageContent,
  handleMessageDelete,
  handleFileList,
  handleSplitPermissionList,
  handleUpdateBackupEmailAddress,
}

