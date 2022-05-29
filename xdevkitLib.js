const getRandomStr = (len) => {
  return 'deadbeef'.repeat(len / 8).slice(0, len)
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

const getAccessTokenByCode = (code, oidcSessionPart, endpoint) => {
  if (!code || !oidcSessionPart['client_id'] || !oidcSessionPart['state'] || !oidcSessionPart['code_verifier']) {
    return null
  }

  const { client_id, state, code_verifier } = oidcSessionPart
  const oidcQueryStr = objToQuery({ client_id, state, code, code_verifier })
  const reqUrl = `${endpoint}?${oidcQueryStr}`

  return { error: null, content: { 'access_token': `requestResult(${reqUrl})` } }
}

const getUserInfo = (accessToken, endpoint) => {
  if (!accessToken) {
    return null
  }

  return { error: null, content: { 'user_info': { serviceUserId: 123456 } } }
}

const addQueryStr = (url, queryStr) => {
  if (url.indexOf('?') >= 0) {
    return `${url}&${queryStr}`
  } else {
    return `${url}?${queryStr}`
  }
}

module.exports = {
  getRandomStr,
  objToQuery,
  convertToCodeChallenge,
  getAccessTokenByCode,
  getUserInfo,
  addQueryStr,
}

