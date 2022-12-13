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

export const getSaveBackupEmailAddress = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/backupEmailAddress/save`
  return () => {
    const backupEmailAddressInputElm = document.querySelector('#backupEmailAddressInput')
    const param = { backupEmailAddress: backupEmailAddressInputElm.value }
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

/* onSubmit */
export const setOnSubmitBackupEmailAddress = ({ onSubmitBackupEmailAddress }) => {
  const backupEmailAddressFormElm = document.querySelector('#backupEmailAddressForm')
  backupEmailAddressFormElm.onsubmit = (e) => {
    e.preventDefault()
    onSubmitBackupEmailAddress()
  }
}

/* show data */
export const showBackupEmailAddress = ({ backupEmailAddress }) => {
  const backupEmailAddressInputElm = document.querySelector('#backupEmailAddressInput')
  backupEmailAddressInputElm.value = backupEmailAddress
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

export const showBackupEmailAddressForm = ({ splitPermissionListResult }) => {
  const { splitPermissionList } = splitPermissionListResult.result
  if (splitPermissionList.optional['rw:auth:backupEmailAddress']) {
    document.querySelector('#backupEmailAddressForm').classList.remove('hidden')
  } else {
    document.querySelector('#backupEmailAddressPermissionRequestContainer').classList.remove('hidden')
  }
}

export const addTabMenuContainer = ({ createTabMenuContainer, showTabButton, tabList, activeTabContainerId }) => {
  const tabMenuContainerElm = createTabMenuContainer()
  const tabMenuContainerWrapElm = document.querySelector('#tabMenuContainerWrap')
  tabMenuContainerWrapElm.appendChild(tabMenuContainerElm)

  showTabButton({ tabMenuContainerElm, tabList, activeTabContainerId })
}


