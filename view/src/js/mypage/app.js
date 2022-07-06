/* mypage/app.js */
const asocial = {}
import * as setting from '../setting.js'
asocial.setting = setting
import * as lib from '../lib.js'
asocial.lib = lib

import * as input from './input.js'
asocial.input = input
import * as output from './output.js'
asocial.output = output

/* a is an alias of asocial */
const a = asocial

const loadProfile = async () => {
  const userInfoResult = await a.input.fetchUserProfile(argNamed({
    setting: a.setting.get('apiEndpoint'),
    lib: [ a.lib.getRequest ],
  }))
  a.lib.redirect(userInfoResult)
  a.output.showUserProfile(argNamed({
    lib: [ a.lib.applyElmList ],
    other: { userInfoResult },
  }))
}

const main = async () => {
  a.lib.switchLoading(true)
  a.lib.setOnClickNavManu()
  a.lib.monkeyPatch()

  await a.app.loadProfile()

  setTimeout(() => {
    a.lib.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  loadProfile,
}

a.app.main()

