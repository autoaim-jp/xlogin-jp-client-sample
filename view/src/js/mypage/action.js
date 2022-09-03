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

export default {}

