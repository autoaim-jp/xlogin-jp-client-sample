export const showUserProfile = ({ userInfoResult, applyElmList }) => {
  const { userInfo } = userInfoResult

  if (userInfo?.public?.service_user_id) {
    applyElmList('[data-id="service_user_id"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.public.service_user_id))
    })
  }

  if (userInfo?.public?.user_name) {
    applyElmList('[data-id="user_name"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.public.user_name))
    })
  }

  if (userInfo?.public?.email_address) {
    applyElmList('[data-id="user_email_address"]', (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(userInfo.public.email_address))
    })
  }

}

