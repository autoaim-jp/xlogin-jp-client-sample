/* mypage/input.js */
export const fetchUserProfile = ({ apiEndpoint, getRequest }) => {
  const url = `${apiEndpoint}/user/profile`
  return getRequest(url)
}

export const fetchMessage = ({ apiEndpoint, getRequest }) => {
  const url = `${apiEndpoint}/message/content`
  return getRequest(url)
}


export const getBackupEmailAddress = ({ userInfoResult }) => { 
  const backupEmailAddress = userInfoResult?.userInfo?.public?.['auth:backupEmailAddress']
  return backupEmailAddress || ''
}

export default {}

