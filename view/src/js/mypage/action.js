export const getOnClickAddTimerButton = ({ addTimer }) => {
  return () => {
    addTimer()
  }
}

export const getOnClickSaveMessageButton = ({ saveMessage }) => {
  return () => {
    saveMessage()
  }
}

export const getOnClickDeleteMessageButton = ({ deleteMessage }) => {
  return () => {
    deleteMessage()
  }
}

export const getOnSubmitBackupEmailAddress = ({ saveBackupEmailAddress }) => {
  return () => {
    saveBackupEmailAddress()
  }
}

export default {}

