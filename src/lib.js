/* /lib.js */
const mod = {}

const init = (axios, crypto) => {
  mod.crypto = crypto
  mod.axios = axios
}

const objToQuery = (obj) => {
  return Object.entries(obj).map(([key, value]) => { return `${key}=${value}` }).join('&')
}

const apiRequest = (isPost, origin, path, param = {}, header = {}, json = true) => {
  const calcSha256AsB64 = (str) => {
    const sha256 = mod.crypto.createHash('sha256')
    sha256.update(str)
    return sha256.digest('base64')
  }
  const calcSha256HmacAsB64 = (secret, str) => {
    const sha256Hmac = mod.crypto.createHmac('sha256', secret)
    sha256Hmac.update(str)
    return sha256Hmac.digest('base64')
  }

  return new Promise((resolve) => {
    const query = param && objToQuery(param)
    const queryString = query ? `?${query}` : ''
    const pathWithQueryString = `${path}${isPost ? '' : queryString}`
    const contentHash = calcSha256AsB64(JSON.stringify(param))
    const timestamp = Date.now()
    const dataToSign = `${timestamp}:${pathWithQueryString}:${contentHash}`
    const signature = calcSha256HmacAsB64(process.env.CLIENT_SECRET, dataToSign)
    const url = origin + path

    const opt = {
      method: isPost ? 'POST' : 'GET',
      url: url + pathWithQueryString,
 
      headers: { 
        ...header, 
        'x-xlogin-timestamp': timestamp,
        'x-xlogin-signature': signature,
        'tmp-dataToSign': dataToSign,
      },
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

const postRequest = (clientId, accessToken, origin, path, param) => {
  const header = {
    authorization: `Bearer ${accessToken}`,
    'x-xlogin-client-id': clientId,
  }
  return apiRequest(true, origin, path, param, header)
}

const getRequest = (clientId, accessToken, origin, path, param) => {
  const header = {
    authorization: `Bearer ${accessToken}`,
    'x-xlogin-client-id': clientId,
  }
  return apiRequest(false, origin, path, param, header)
}

export default {
  init,
  postRequest,
  getRequest,
  apiRequest,
}

