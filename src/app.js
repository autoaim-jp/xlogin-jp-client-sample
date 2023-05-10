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
import { setting, init as settingInit } from './setting/index.js'

const _getOtherRouter = () => {
  const expressRouter = express.Router()
  if (setting.env.SERVER_ORIGIN.indexOf('https') >= 0) {
    expressRouter.use(helmet())
  }
  expressRouter.use(bodyParser.urlencoded({ extended: true }))
  expressRouter.use(bodyParser.json())

  expressRouter.use(express.static(setting.server.PUBLIC_BUILD_DIR, { index: 'index.html', extensions: ['html'] }))
  expressRouter.use(express.static(setting.server.PUBLIC_STATIC_DIR, { index: 'index.html', extensions: ['html'] }))
  return expressRouter
}

const _getActionRouter = () => {
  const expressRouter = express.Router()
  expressRouter.post(`${setting.bsc.apiEndpoint}/timer/add`, action.handleTimerAdd)
  expressRouter.post(`${setting.bsc.apiEndpoint}/notification/open`, action.handleNotificationOpen)
  expressRouter.get(`${setting.bsc.apiEndpoint}/notification/list`, action.handleNotificationList)
  expressRouter.post(`${setting.bsc.apiEndpoint}/message/save`, action.handleMessageSave)
  expressRouter.get(`${setting.bsc.apiEndpoint}/message/content`, action.handleMessageContent)
  expressRouter.post(`${setting.bsc.apiEndpoint}/message/delete`, action.handleMessageDelete)
  expressRouter.get(`${setting.bsc.apiEndpoint}/file/list`, action.handleFileList)
  expressRouter.post(`${setting.bsc.apiEndpoint}/backupEmailAddress/save`, action.handleUpdateBackupEmailAddress)

  expressRouter.get(`${setting.bsc.apiEndpoint}/session/splitPermissionList`, action.handleSplitPermissionList)
  return expressRouter
}

const _startServer = (expressApp) => {
  if (setting.env.SERVER_ORIGIN.indexOf('https') >= 0) {
    const tlsConfig = {
      key: fs.readFileSync(setting.env.TLS_KEY_PATH),
      cert: fs.readFileSync(setting.env.TLS_CERT_PATH),
    }
    const server = https.createServer(tlsConfig, expressApp)
    server.listen(setting.env.SERVER_PORT, () => {
      console.log(`${setting.env.CLIENT_ID} listen to port: ${setting.env.SERVER_PORT}, origin: ${setting.env.SERVER_ORIGIN}`)
    })
  } else {
    expressApp.listen(setting.env.SERVER_PORT, () => {
      console.log(`${setting.env.CLIENT_ID} listen to port: ${setting.env.SERVER_PORT}, origin: ${setting.env.SERVER_ORIGIN}`)
    })
  }
}

const main = () => {
  dotenv.config()
  lib.init(axios, crypto)
  settingInit(process.env)
  xdevkit.init(setting.xdevkitSetting)
  console.log('?', setting.xdevkitSetting.get('env.CLIENT_ID'))
  action.init(setting, lib)

  const expressApp = express()
  expressApp.use(_getOtherRouter())
  expressApp.use(xdevkit.getRouter())
  expressApp.use(_getActionRouter())

  _startServer(expressApp)
}

main()

