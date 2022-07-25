/* /index/action.js */
export const getOnClickXloginButton = () => {
  return () => {
    window.location.href = '/f/xlogin/connect?redirectAfterAuth=/mypage'
  }
}

