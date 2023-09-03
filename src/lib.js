/* /lib.js */
const mod = {}

const init = (axios, http, crypto) => {
  mod.crypto = crypto
  mod.http = http
  mod.axios = axios
}

const objToQuery = (obj) => {
  return Object.entries(obj).map(([key, value]) => { return `${key}=${value}` }).join('&')
}

const _calcSha256AsB64 = (str) => {
  const sha256 = mod.crypto.createHash('sha256')
  sha256.update(str)
  return sha256.digest('base64')
}
const _calcSha256HmacAsB64 = (secret, str) => {
  const sha256Hmac = mod.crypto.createHmac('sha256', secret)
  sha256Hmac.update(str)
  return sha256Hmac.digest('base64')
}


const apiRequest = (isPost, origin, path, param = {}, header = {}, json = true) => {
  return new Promise((resolve) => {
    const query = param && objToQuery(param)
    const queryString = query ? `?${query}` : ''
    const pathWithQueryString = `${path}${isPost ? '' : queryString}`
    const contentHash = _calcSha256AsB64(JSON.stringify(isPost ? param : {}))
    const timestamp = Date.now()
    const dataToSign = `${timestamp}:${pathWithQueryString}:${contentHash}`
    const signature = _calcSha256HmacAsB64(process.env.CLIENT_SECRET, dataToSign)
    const url = origin + pathWithQueryString

    const opt = {
      method: isPost ? 'POST' : 'GET',
      url,

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

const postFormRequest = (clientId, accessToken, origin, path, formData) => {
  return new Promise((resolve) => {
    const header = {
      authorization: `Bearer ${accessToken}`,
      'x-xlogin-client-id': clientId,
    }
    const content = { contentType: formData.getHeaders()['content-type'] }
    const contentHash = _calcSha256AsB64(JSON.stringify(content))
    const timestamp = Date.now()
    const dataToSign = `${timestamp}:${path}:${contentHash}`
    const signature = _calcSha256HmacAsB64(process.env.CLIENT_SECRET, dataToSign)

    const parsedUrl = new URL(origin)
    const request = mod.http.request({
      method: 'post',
      host: parsedUrl.hostname,
      port: parsedUrl.port,
      path,
      headers: {
        ...header,
        'x-xlogin-timestamp': timestamp,
        'x-xlogin-signature': signature,
        'tmp-dataToSign': dataToSign,
        ...formData.getHeaders(),
      },
    })
    formData.pipe(request)

    request.on('response', (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(data)
      })
    })
    request.on('error', (err) => {
      console.log('err', err)
      resolve(null)
    })
  })
}

export default {
  init,
  postRequest,
  getRequest,
  apiRequest,

  postFormRequest,
}

