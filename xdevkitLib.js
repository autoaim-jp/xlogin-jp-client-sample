let mod = {}

const init = (crypto) => {
  mod.crypto = crypto
}

const getRandomB64UrlSafe = (len) => {
  return mod.crypto.randomBytes(len).toString('base64url').slice(0, len)
}

const objToQuery = (obj) => {
  return Object.entries(obj).map(([key, value]) => { return `${key}=${value}` }).join('&')
}

const convertToCodeChallenge = (codeVerifier, codeChallengeMethod) => {
  if (codeChallengeMethod === 'S256') {
    return `Base64(S256(${codeVerifier}))`
  } else {
    throw new Error('unimplemented')
  }
}

const getAccessTokenByCode = (apiRequest, code, oidcSessionPart, endpoint) => {
  if (!code || !oidcSessionPart['client_id'] || !oidcSessionPart['state'] || !oidcSessionPart['code_verifier']) {
    return null
  }

  const { client_id, state, code_verifier } = oidcSessionPart
  const oidcQueryStr = objToQuery({ client_id, state, code, code_verifier })
  const reqUrl = `${endpoint}?${oidcQueryStr}`
  console.log({ reqUrl })

  return apiRequest(false, reqUrl, {}, {}, true)
}

const getUserInfo = (apiRequest, clientId, filter_key_list, accessToken, endpoint) => {
  if (!accessToken) {
    return null
  }

  const header = { 
    'Authorization': `Bearer ${accessToken}`,
    'X_XLOGIN_CLIENT_ID': clientId,
  }
  const filter_key_list_str = filter_key_list.join(',')
  const param = {
    filter_key_list_str,
  }
  return apiRequest(false, endpoint, param, header, true)
}

const addQueryStr = (url, queryStr) => {
  if (url.indexOf('?') >= 0) {
    return `${url}&${queryStr}`
  } else {
    return `${url}?${queryStr}`
  }
}

module.exports = {
  init,
  getRandomB64UrlSafe,
  objToQuery,
  convertToCodeChallenge,
  getAccessTokenByCode,
  getUserInfo,
  addQueryStr,
}

