let mod = {}

const init = (axios) => {
  mod.axios = axios
}

const apiRequest = (isPost, url, param = {}, header = {}, json = true) => {
  return new Promise((resolve, reject) => {
    const query = param && Object.keys(param).map((key) => { return key + '=' + param[key] }).join('&')
    const opt = {
      method: isPost? 'POST': 'GET',
      url: url + (isPost? '': (query? '?' + query: '')),
      headers: Object.assign({
      }, header),
      timeout: 30 * 1000,
    }
    if(json) {
      opt.responseType = 'json'
    }
    if(isPost && param) {
      opt.data = json? (isPost? (param? param: {}): {}): param.toString()
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



module.exports = {
  init,
  apiRequest,
}

