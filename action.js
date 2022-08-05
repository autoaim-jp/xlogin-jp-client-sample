/* /action.js */
const mod = {}

const init = (setting, lib) => {
  mod.setting = setting
  mod.lib = lib
}

const handleTimerAdd = (req, res) => {
  const url = `${mod.setting.xdevkitSetting.env.AUTH_SERVER_ORIGIN}/api/${mod.setting.xdevkitSetting.api.API_VERSION}/notification/append`
  const accessToken = req.session.auth.accessToken
  setTimeout(async () => {
    const param = {
      notificationRange: mod.setting.xdevkitSetting.env.CLIENT_ID,
      subject: 'timer',
      detail: 'TIME\'S UP!',
    }
    const timerAddResponse = await mod.lib.postRequest(mod.setting.xdevkitSetting.env.CLIENT_ID, accessToken, url, param)
    console.log({ timerAddResponse })
  },  10 * 1000)

  const status = mod.setting.bsc.statusList.OK
  res.json({ status, })
}

export default {
  init,
  handleTimerAdd,
}

