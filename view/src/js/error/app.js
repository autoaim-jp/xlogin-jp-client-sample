/* error/app.js */
const asocial = {}
import * as browserServerSetting from '../browserServerSetting.js'
asocial.browserServerSetting = browserServerSetting
import * as lib from '../lib.js'
asocial.lib = lib

import * as output from './output.js'
asocial.output = output

/* a is an alias of asocial */
const a = asocial

const loadErrorMessage = () => {
  a.output.showErrorModal(argNamed({
    lib: [ a.lib.getSearchQuery, a.lib.getErrorModalElmAndSetter, a.lib.showModal ],
    browserServerSetting: a.browserServerSetting.get('labelList'),
  }))
}

const main = async () => {
  a.lib.switchLoading(true)
  a.lib.setOnClickNavManu()
  a.lib.monkeyPatch()

  a.app.loadErrorMessage()

  setTimeout(() => {
    a.lib.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  loadErrorMessage,
}

a.app.main()

