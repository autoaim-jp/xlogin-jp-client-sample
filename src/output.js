/* /output.js */
const timerAddRequest = ({ accessToken, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest, }) => {
  const path = `/api/${API_VERSION}/notification/append`
  const param = {
    notificationRange: CLIENT_ID,
    subject: 'timer',
    detail: 'TIME\'S UP!',
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}

export default {
  timerAddRequest,
}

