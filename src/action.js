/* /action.js */

// TODO remove
const mod = {}
const init = (setting, lib) => {
  mod.setting = setting
  mod.lib = lib
}


const getHandlerTimerAdd = ({ handleTimerAdd, OK }) => {
  return (req, res) => {
    const { accessToken } = req.session.auth

    handleTimerAdd({ accessToken })

    const status = OK
    res.json({ status })
  }
}

const handleNotificationOpen = async (req, res) => {
  const { notificationIdList } = req.body
  const origin = mod.setting.xdevkitSetting.getValue('env.API_SERVER_ORIGIN')
  const path = `/api/${mod.setting.xdevkitSetting.getValue('api.API_VERSION')}/notification/open`
  const { accessToken } = req.session.auth
  const param = {
    notificationRange: mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'),
    notificationIdList,
  }
  const notificationOpenResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'), accessToken, origin, path, param)
  console.log({ notificationOpenResponse })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  res.json({ status })
}

const handleNotificationList = async (req, res) => {
  const origin = mod.setting.xdevkitSetting.getValue('env.API_SERVER_ORIGIN')
  const path = `/api/${mod.setting.xdevkitSetting.getValue('api.API_VERSION')}/notification/list`
  if (!req.session || !req.session.auth) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    return res.json({ status })
  }
  const { accessToken } = req.session.auth
  const param = { notificationRange: mod.setting.xdevkitSetting.getValue('env.CLIENT_ID') }
  const notificationListResponse = await mod.lib.getRequest(mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'), accessToken, origin, path, param)

  if (!notificationListResponse || !notificationListResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    res.json({ status, result })
    return null
  }
  const { result } = notificationListResponse.data
  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  res.json({ status, result })

  return null
}

const handleMessageSave = async (req, res) => {
  const { message } = req.body
  const origin = mod.setting.xdevkitSetting.getValue('env.API_SERVER_ORIGIN')
  const path = `/api/${mod.setting.xdevkitSetting.getValue('api.API_VERSION')}/file/update`
  const { accessToken } = req.session.auth
  const param = {
    owner: mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'),
    filePath: mod.setting.getValue('user.MESSAGE_FILE_PATH'),
    content: message,
  }
  const fileSaveResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'), accessToken, origin, path, param)
  console.log({ fileSaveResponse })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  res.json({ status })
}

const handleMessageContent = async (req, res) => {
  const origin = mod.setting.xdevkitSetting.getValue('env.API_SERVER_ORIGIN')
  const path = `/api/${mod.setting.xdevkitSetting.getValue('api.API_VERSION')}/file/content`
  const { accessToken } = req.session.auth
  const param = {
    owner: mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'),
    filePath: mod.setting.getValue('user.MESSAGE_FILE_PATH'),
  }
  console.log('???', accessToken, origin, path, param)
  const fileGetResponse = await mod.lib.getRequest(mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'), accessToken, origin, path, param)
  console.log({ fileGetResponse })

  if (!fileGetResponse || !fileGetResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    res.json({ status, result })
    return
  }

  const { result } = fileGetResponse.data
  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  res.json({ status, result })
}

const handleMessageDelete = async (req, res) => {
  const origin = mod.setting.xdevkitSetting.getValue('env.API_SERVER_ORIGIN')
  const path = `/api/${mod.setting.xdevkitSetting.getValue('api.API_VERSION')}/file/delete`
  const { accessToken } = req.session.auth
  const param = {
    owner: mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'),
    filePath: mod.setting.getValue('user.MESSAGE_FILE_PATH'),
  }
  const fileDeleteResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'), accessToken, origin, path, param)
  console.log({ fileDeleteResponse })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  res.json({ status })
}

const handleFileList = async (req, res) => {
  const origin = mod.setting.xdevkitSetting.getValue('env.API_SERVER_ORIGIN')
  const path = `/api/${mod.setting.xdevkitSetting.getValue('api.API_VERSION')}/file/list`
  const { accessToken } = req.session.auth
  const { filePath } = req.query
  const param = {
    owner: mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'),
    filePath,
  }
  const fileListResponse = await mod.lib.getRequest(mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'), accessToken, origin, path, param)
  console.log({ fileListResponse })
  if (!fileListResponse || !fileListResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    res.json({ status, result })
    return
  }

  const { result } = fileListResponse.data

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  res.json({ status, result })
}


const handleSplitPermissionList = async (req, res) => {
  if (!req.session || !req.session.auth) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    res.json({ status, result })
    return
  }
  const { splitPermissionList } = req.session.auth
  const clientId = mod.setting.xdevkitSetting.getValue('env.CLIENT_ID')
  const result = { splitPermissionList, clientId }

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  res.json({ status, result })
}


const handleUpdateBackupEmailAddress = async (req, res) => {
  const { backupEmailAddress } = req.body
  const origin = mod.setting.xdevkitSetting.getValue('env.API_SERVER_ORIGIN')
  const path = `/api/${mod.setting.xdevkitSetting.getValue('api.API_VERSION')}/user/update`
  const { accessToken } = req.session.auth
  const param = {
    backupEmailAddress,
  }
  const updateBackupEmailAddressResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.getValue('env.CLIENT_ID'), accessToken, origin, path, param)
  console.log({ updateBackupEmailAddressResponse })
  if (!updateBackupEmailAddressResponse || !updateBackupEmailAddressResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    res.json({ status, result })
    return
  }

  const { result } = updateBackupEmailAddressResponse.data

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  res.json({ status, result })
}


export default {
  // TODO remove
  init,

  getHandlerTimerAdd,

  handleNotificationOpen,
  handleNotificationList,
  handleMessageSave,
  handleMessageContent,
  handleMessageDelete,
  handleFileList,
  handleSplitPermissionList,
  handleUpdateBackupEmailAddress,
}

