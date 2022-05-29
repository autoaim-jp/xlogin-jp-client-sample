const generateSessionId = (len) => {
  const sessionIdVerifier = 'deadbeef'.repeat(len / 8).slice(0, len)
  const sessionId = `sha256(${sessionIdVerifier})`
  return { sessionId, sessionIdVerifier }
}

module.exports = {
  generateSessionId,
}

