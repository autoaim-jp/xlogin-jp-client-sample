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

export const getSaveMessage = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/message/save`
  return () => {
    const messageContentElm = document.querySelector('#messageContent')
    const param = { message: messageContentElm.value }
    return postRequest(url, param)
  }
}

export const setOnClickSaveMessageButton = ({ onClickSaveMessageButton }) => {
  const saveMessageBtn = document.querySelector('#saveMessageBtn')
  saveMessageBtn.onclick = (e) => {
    e.preventDefault()
    onClickSaveMessageButton()
  }
}

