/* /core.js */
/**
 * @name コア機能を集約したファイル
 * @memberof file
 */

/* local setting */
const mod = {}

const init = (setting, output, input, lib) => {
  mod.setting = setting
  mod.output = output
  mod.input = input
  mod.lib = lib
}

const handleTimerAdd = ({ accessToken }) => {
  setTimeout(async () => {
    const timerAddResponse = await mod.output.timerAddRequest(argNamed({
      param: { accessToken },
      xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
      lib: [mod.lib.postRequest],
    }))

    console.log({ timerAddResponse })
  }, 10 * 1000)

}

export default {
  init,

  handleTimerAdd,
}

