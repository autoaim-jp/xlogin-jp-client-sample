/* /input.js */

const notificationListRequest = async ({ accessToken, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest, }) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/notification/list`
  const param = { notificationRange: CLIENT_ID }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}

const fileGetRequest = async ({ accessToken, MESSAGE_FILE_PATH, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest, }) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/file/content`
  const param = {
    owner: CLIENT_ID,
    filePath: MESSAGE_FILE_PATH,
  }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}

const fileListRequest = async ({ accessToken, filePath, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest, }) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/file/list`
  const param = {
    owner: CLIENT_ID,
    filePath,
  }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}

export default {
  notificationListRequest,
  fileGetRequest,
  fileListRequest,
}

