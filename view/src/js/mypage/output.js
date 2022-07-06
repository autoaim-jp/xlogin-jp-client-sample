export const showUserProfile = ({ userInfoResult, applyElmList }) => {
  const { userInfo } = userInfoResult

  if (userInfo.serviceUserId) {
    applyElmList('[data-id="serviceUserId"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.serviceUserId))
    })
  }

  if (userInfo.userName) {
    applyElmList('[data-id="userName"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.userName))
    })
  }

  if (userInfo.emailAddress) {
    applyElmList('[data-id="userEmailAddress"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.emailAddress))
    })
  }

}

