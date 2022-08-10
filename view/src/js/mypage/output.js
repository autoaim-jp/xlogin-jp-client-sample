export const showUserProfile = ({ userInfoResult, applyElmList }) => {
  const { userInfo } = userInfoResult

  Object.entries(userInfo?.public || {}).forEach(([key, value]) => {
    applyElmList(`[data-var='${key}']`, (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(value))
    })
  })
}


export const getAddTimer = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/timer/add`
  return () => {
    return postRequest(url)
  }
}

export const setOnClickAddTimerButton = ({ onClickAddTimerButton }) => {
  const addTimerBtn = document.querySelector('#addTimerBtn')
  addTimerBtn.onclick = (e) => {
    e.preventDefault()
    onClickAddTimerButton()
  }
}

