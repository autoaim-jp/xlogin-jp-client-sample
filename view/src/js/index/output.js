/* /index/output.js */
export const setOnClickXloginButton = ({ onClickXloginButton }) => {
  document.querySelectorAll('[data-id="xloginLoginBtn"]').forEach((elm) => {
    elm.onclick = onClickXloginButton
  })
}

export default {}

