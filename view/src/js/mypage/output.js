export const showUserProfile = ({ userInfoResult, applyElmList }) => {
  const { userInfo } = userInfoResult

  if (userInfo?.public?.serviceUserId) {
    applyElmList('[data-var="serviceUserId"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.public.serviceUserId))
    })
  }

  if (userInfo?.public?.userName) {
    applyElmList('[data-var="userName"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.public.userName))
    })
  }

  if (userInfo?.public?.emailAddress) {
    applyElmList('[data-var="userEmailAddress"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.public.emailAddress))
    })
  }

}

