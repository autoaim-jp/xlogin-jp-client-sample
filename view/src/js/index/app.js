/* /index/app.js */
const asocial = {}
import * as output from './output.js'
asocial.output = output
import * as action from './action.js'
asocial.action = action
import * as lib from '../lib.js'
asocial.lib = lib
/* a is an alias of asocial */
const a = asocial

const main = async () => {
  a.lib.switchLoading(true)
  a.lib.setOnClickNavManu()
  a.lib.monkeyPatch()
  a.app.loadXloginButton()
  setTimeout(() => {
    a.lib.switchLoading(false)
  }, 300)
}

const loadXloginButton = () => {
  const onClickXloginButton = a.action.getOnClickXloginButton()
  a.output.setOnClickXloginButton(argNamed({
    onClick: { onClickXloginButton },
  }))
}

a.app = {
  main,
  loadXloginButton,
}

a.app.main()

