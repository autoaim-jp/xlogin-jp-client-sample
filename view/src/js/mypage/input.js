export const fetchUserProfile = ({ apiEndpoint, getRequest }) => {
  const url = apiEndpoint + '/user/profile'
  return getRequest(url)
}

