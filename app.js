import fs from 'fs'
import axios from 'axios'
import https from 'https'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'

import xdevkit from './xdevkit/index.js'
import { setting, init as settingInit, getXdevkitSetting } from './setting/index.js'

const _getOtherRouter = () => {
  const expressRouter = express.Router()
  expressRouter.use(helmet())
  expressRouter.use(bodyParser.urlencoded({ extended: true }))
  expressRouter.use(bodyParser.json())

  expressRouter.use(express.static(setting.server.PUBLIC_BUILD_DIR, { index: 'index.html', extensions: ['html'] }))
  expressRouter.use(express.static(setting.server.PUBLIC_STATIC_DIR, { index: 'index.html', extensions: ['html'] }))
  return expressRouter
}

const _startServer = (expressApp) => {
  if (process.env.SERVER_ORIGIN.indexOf('https') >= 0) {
    const tlsConfig = {
      key: fs.readFileSync(process.env.TLS_KEY_PATH),
      cert: fs.readFileSync(process.env.TLS_CERT_PATH),
    }
    const server = https.createServer(tlsConfig, expressApp)
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`${process.env.CLIENT_ID} listen to port: ${process.env.SERVER_PORT}, origin: ${process.env.SERVER_ORIGIN}`)
    })
  } else {
    expressApp.listen(process.env.SERVER_PORT, () => {
      console.log(`${process.env.CLIENT_ID} listen to port: ${process.env.SERVER_PORT}, origin: ${process.env.SERVER_ORIGIN}`)
    })
  }
}

const main = () => {
  dotenv.config()
  settingInit(process.env)
  xdevkit.init(getXdevkitSetting())

  const expressApp = express()
  expressApp.use(_getOtherRouter())
  expressApp.use(xdevkit.getRouter())

  _startServer(expressApp)
}

main()

