(() => {
  const setXloginButtonHandler = (loginActionPath, redirectAfterAuth) => {
    document.querySelectorAll('[data-id="xloginLoginBtn"]').forEach((elm) => {
      elm.onclick = () => {
        window.location.href = `${loginActionPath}?redirectAfterAuth=${redirectAfterAuth}`
      }
    })
  }

  const main = () => {
    setXloginButtonHandler('/f/xlogin/connect', '/mypage')
  }

  main()
})();

