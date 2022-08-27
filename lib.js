/* /lib.js */
const mod = {}

const init = (axios) => {
  mod.axios = axios
}

const apiRequest = (isPost, url, param = {}, header = {}, json = true) => {
  return new Promise((resolve) => {
    const query = param && Object.keys(param).map((key) => { return `${key}=${param[key]}` }).join('&')
    const queryString = query ? `?${query}` : ''
    const opt = {
      method: isPost ? 'POST' : 'GET',
      url: url + (isPost ? '' : queryString),
      headers: { ...header },
      timeout: 30 * 1000,
    }
    if (json) {
      opt.responseType = 'json'
    }
    if (isPost && param) {
      opt.data = json ? param : param.toString()
    }
    mod.axios(opt)
      .then((res) => {
        resolve({ res, data: res.data })
      })
      .catch((error) => {
        resolve({ error })
      })
  })
}

const postRequest = (clientId, accessToken, url, param) => {
  const header = {
    authorization: `Bearer ${accessToken}`,
    'x-xlogin-client-id': clientId,
  }
  return apiRequest(true, url, param, header)
}

const getRequest = (clientId, accessToken, url, param) => {
  const header = {
    authorization: `Bearer ${accessToken}`,
    'x-xlogin-client-id': clientId,
  }
  return apiRequest(false, url, param, header)
}

export default {
  init,
  postRequest,
  getRequest,
  apiRequest,
}

