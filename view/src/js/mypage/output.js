/* create elm */
export const showUserProfile = ({ userInfoResult, applyElmList }) => {
  const { userInfo } = userInfoResult

  Object.entries(userInfo?.public || {}).forEach(([key, value]) => {
    applyElmList(`[data-var='${key}']`, (elm) => {
      elm.clearChildren()
      elm.appendChild(document.createTextNode(value))
    })
  })
}


/* request */
export const getAddTimer = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/timer/add`
  return () => {
    return postRequest(url)
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

export const getDeleteMessage = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/message/delete`
  return () => {
    const param = {}
    return postRequest(url, param)
  }
}


/* onClick */
export const setOnClickAddTimerButton = ({ onClickAddTimerButton }) => {
  const addTimerBtn = document.querySelector('#addTimerBtn')
  addTimerBtn.onclick = (e) => {
    e.preventDefault()
    onClickAddTimerButton()
  }
}

export const setOnClickSaveMessageButton = ({ onClickSaveMessageButton }) => {
  const saveMessageBtn = document.querySelector('#saveMessageBtn')
  saveMessageBtn.onclick = (e) => {
    e.preventDefault()
    onClickSaveMessageButton()
  }
}

export const setOnClickDeleteMessageButton = ({ onClickDeleteMessageButton }) => {
  const deleteMessageBtn = document.querySelector('#deleteMessageBtn')
  deleteMessageBtn.onclick = (e) => {
    e.preventDefault()
    onClickDeleteMessageButton()
  }
}

/* show elm */
export const showMessage = ({ messageResult }) => {
  document.querySelector('#messageContent').value = messageResult.result.fileContent
}

export const showEditor = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:${clientId}:file`]) {
    document.querySelector('#editorContainer').classList.remove('hidden')
  } else {
    document.querySelector('#filePermissionRequestContainer').classList.remove('hidden')
  }
}

export const showTabButton = ({ tabList, activeTabContainerId }) => {
  console.log({ tabList, activeTabContainerId })
  const getOnClickTabButton = ({ activeTabContainerId }) => {
    return (e) => {
      if(e) {
        e.preventDefault()
      }
      showTabButton({ tabList, activeTabContainerId })
      showTabContainer({ tabList, activeTabContainerId })
    }
  }
  const tabMenuContainer = document.querySelector('#tabMenuContainer')
  tabMenuContainer.clearChildren()
  Object.entries(tabList).forEach(([tabContainerId, value]) => {
    let tabItemElm = null
    if (tabContainerId === activeTabContainerId) {
      tabItemElm = document.querySelector('#tabActiveItemTemplate').cloneNode(true)
    } else {
      tabItemElm = document.querySelector('#tabItemTemplate').cloneNode(true)
    }
    tabItemElm.id = `btn_${tabContainerId}`
    tabItemElm.classList.remove('hidden')
    tabItemElm.children[0].innerText = value
    tabItemElm.children[0].onclick = getOnClickTabButton({ activeTabContainerId: tabContainerId })
    tabMenuContainer.appendChild(tabItemElm)
    if (tabContainerId === activeTabContainerId) {
      showTabContainer({ tabList, activeTabContainerId: tabContainerId })
    }
  })
}

export const showTabContainer = ({ activeTabContainerId, tabList }) => {
  Object.keys(tabList).forEach((tabContainerId) => {
    const tabContainerElm = document.querySelector(`#${tabContainerId}`)
    tabContainerElm.classList.add('hidden')
  })
  const tabContainerElm = document.querySelector(`#${activeTabContainerId}`)
  tabContainerElm.classList.remove('hidden')
}

