export const getOnClickAddTimerButton = ({ addTimer }) => {
  return (e) => {
    e.preventDefault()
    addTimer()
  }
}

