import fs from 'fs'
import axios from 'axios'
import crypto from 'crypto'
import https from 'https'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'

import xdevkit from './xdevkit/server/index.js'
import action from './action.js'
import lib from './lib.js'
import setting from './setting/index.js'

const _getOtherRouter = () => {
  const expressRouter = express.Router()
  if (setting.getValue('env.SERVER_ORIGIN').indexOf('https') >= 0) {
    expressRouter.use(helmet())
  }
  expressRouter.use(bodyParser.urlencoded({ extended: true }))
  expressRouter.use(bodyParser.json())

  expressRouter.use(express.static(setting.getValue('server.PUBLIC_BUILD_DIR'), { index: 'index.html', extensions: ['html'] }))
  expressRouter.use(express.static(setting.getValue('server.PUBLIC_STATIC_DIR'), { index: 'index.html', extensions: ['html'] }))
  return expressRouter
}

const _getActionRouter = () => {
  const expressRouter = express.Router()
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/timer/add`, action.handleTimerAdd)
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/notification/open`, action.handleNotificationOpen)
  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/notification/list`, action.handleNotificationList)
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/message/save`, action.handleMessageSave)
  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/message/content`, action.handleMessageContent)
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/message/delete`, action.handleMessageDelete)
  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/file/list`, action.handleFileList)
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/backupEmailAddress/save`, action.handleUpdateBackupEmailAddress)

  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/session/splitPermissionList`, action.handleSplitPermissionList)
  return expressRouter
}

const _startServer = (expressApp) => {
  if (setting.getValue('env.SERVER_ORIGIN').indexOf('https') >= 0) {
    const tlsConfig = {
      key: fs.readFileSync(setting.getValue('env.TLS_KEY_PATH')),
      cert: fs.readFileSync(setting.getValue('env.TLS_CERT_PATH')),
    }
    const server = https.createServer(tlsConfig, expressApp)
    server.listen(setting.getValue('env.SERVER_PORT'), () => {
      console.log(`${setting.getValue('env.CLIENT_ID')} listen to port: ${setting.getValue('env.SERVER_PORT')}, origin: ${setting.getValue('env.SERVER_ORIGIN')}`)
    })
  } else {
    expressApp.listen(setting.getValue('env.SERVER_PORT'), () => {
      console.log(`${setting.getValue('env.CLIENT_ID')} listen to port: ${setting.getValue('env.SERVER_PORT')}, origin: ${setting.getValue('env.SERVER_ORIGIN')}`)
    })
  }
}

const main = () => {
  dotenv.config()
  lib.init(axios, crypto)
  setting.init(process.env)
  action.init(setting, lib)

  const expressApp = express()
  expressApp.use(_getOtherRouter())
  expressApp.use(xdevkit.getRouter({ xdevkitSetting: setting.xdevkitSetting }))
  expressApp.use(_getActionRouter())

  _startServer(expressApp)
}

main()

