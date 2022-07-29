/* /_setting/index.js */
import * as browserServerSetting from './browserServerSetting.js'

const settingList = {
}

export const getBrowserServerSetting = () => {
  return browserServerSetting
}

export const get = (...keyList) => {
  const constantList = keyList.reduce((prev, curr) => {
    prev[curr] = settingList[curr]
    return prev
  }, {})
  for(const key of keyList) {
    if(!constantList[key]) {
      throw new Error('[error] undefined setting constant: ' + key)
    }
  }
  return constantList
}

