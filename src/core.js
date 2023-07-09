/* /core.js */
/**
 * @name コア機能を集約したファイル
 * @memberof file
 */

/* local setting */
const mod = {}

const init = (setting, output, input, lib) => {
  mod.setting = setting
  mod.output = output
  mod.input = input
  mod.lib = lib
}

const handleTimerAdd = async ({ accessToken }) => {
  setTimeout(async () => {
    const timerAddResponse = await mod.output.timerAddRequest(argNamed({
      param: { accessToken },
      xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
      lib: [mod.lib.postRequest],
    }))

    console.log({ timerAddResponse })
  }, 10 * 1000)

  const handleResult = { response: { status: mod.setting.browserServerSetting.getValue('statusList.OK') } }
  return handleResult
}

const handleNotificationOpen = async ({ accessToken, notificationIdList }) => {
  const notificationOpenResponse = await mod.output.notificationOpenRequest(argNamed({
    param: { accessToken, notificationIdList },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.postRequest],
  }))
  console.log({ notificationOpenResponse })

  const handleResult = { response: { status: mod.setting.browserServerSetting.getValue('statusList.OK') } }
  return handleResult
}

const handleNotificationList = async ({ accessToken }) => {
  const notificationListResponse = await mod.input.notificationListRequest(argNamed({
    param: { accessToken },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.getRequest],
  }))

  if (!notificationListResponse || !notificationListResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    const handleResult = { response: { status, result } }
    return handleResult
  }

  const { result } = notificationListResponse.data
  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

const handleMessageSave = async ({ accessToken, message }) => {
  const fileSaveResponse = await mod.output.fileSaveRequest(argNamed({
    param: { accessToken, message },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    setting: mod.setting.getList('user.MESSAGE_FILE_PATH'),
    lib: [mod.lib.postRequest],
  }))
 
  console.log({ fileSaveResponse })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status } }
  return handleResult
}

const handleMessageContent = async ({ accessToken }) => {
  const fileGetResponse = await mod.input.fileGetRequest(argNamed({
    param: { accessToken },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    setting: mod.setting.getList('user.MESSAGE_FILE_PATH'),
    lib: [mod.lib.getRequest],
  }))

  console.log({ fileGetResponse })

  if (!fileGetResponse || !fileGetResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    const handleResult = { response: { status, result } }
    return handleResult
  }

  const { result } = fileGetResponse.data
  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  const handleResult = { response: { status, result } }
  return handleResult
}

const handleMessageDelete = async ({ accessToken }) => {
  const fileDeleteResponse = await mod.output.fileDeleteRequest(argNamed({
    param: { accessToken },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    setting: mod.setting.getList('user.MESSAGE_FILE_PATH'),
    lib: [mod.lib.postRequest],
  }))

  console.log({ fileDeleteResponse })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status } }
  return handleResult
}

const handleFileList = async ({ accessToken, filePath }) => {
  const fileListResponse = await mod.input.fileListRequest(argNamed({
    param: { accessToken, filePath },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    setting: mod.setting.getList('user.MESSAGE_FILE_PATH'),
    lib: [mod.lib.getRequest],
  }))

  console.log({ fileListResponse })

  if (!fileListResponse || !fileListResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}

    const handleResult = { response: { status, result } }
    return handleResult
  }

  const { result } = fileListResponse.data

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

const handleSplitPermissionList = async ({ splitPermissionList }) => {
  const clientId = mod.setting.xdevkitSetting.getValue('env.CLIENT_ID')
  const result = { splitPermissionList, clientId }

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

const handleUpdateBackupEmailAddress = async ({ accessToken, backupEmailAddress }) => {
  const updateBackupEmailAddressResponse = await mod.output.updateBackupEmailAddressRequest(argNamed({
    param: { accessToken, backupEmailAddress },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.postRequest],
  }))

  console.log({ updateBackupEmailAddressResponse })
  if (!updateBackupEmailAddressResponse || !updateBackupEmailAddressResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}

    const handleResult = { response: { status, result } }
    return handleResult
  }

  const { result } = updateBackupEmailAddressResponse.data

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

const createResponse = ({ req, res, handleResult }) => {
  console.log('endResponse:', req.url, handleResult)
  // req.session.auth = handleResult.session

  const ERROR_PAGE = mod.setting.xdevkitSetting.getValue('url.ERROR_PAGE')
  const { redirect } = handleResult

  if (handleResult.response) {
    const json = handleResult.response
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  if (req.method === 'GET') {
    if (handleResult.redirect) {
      return mod.output.endResponse({ res, redirect, ERROR_PAGE })
    }

    const redirect = ERROR_PAGE
    return mod.output.endResponse({ res, redirect, ERROR_PAGE })
  }

  if (redirect) {
    const json = { redirect }
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  const json = { redirect: ERROR_PAGE }
  return mod.output.endResponse({ res, json, ERROR_PAGE })
}

const handleInvalidSession = ({ req, res }) => {
  if (!req.session || !req.session.auth) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    return res.json({ status })
  }

  return null
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

  createResponse,
  handleInvalidSession,
}

