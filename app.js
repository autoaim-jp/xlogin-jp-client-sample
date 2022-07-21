import fs from 'fs'
import axios from 'axios'
import https from 'https'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'

import lib from './lib.js'
import xdevkit from './xdevkit/index.js'
import statusList from './statusList.js'
import scc, { init as sccInit } from './serverCommonConstant.js'

const main = () => {
  dotenv.config()
  sccInit(process.env)
  xdevkit.init(scc, statusList)
  lib.init(axios)

  const expressApp = express()
  expressApp.use(helmet())
  expressApp.use(bodyParser.urlencoded({ extended: true }))
  expressApp.use(bodyParser.json())

  expressApp.use(xdevkit.sessionRouter.getRouter())
  expressApp.use(xdevkit.coreRouter.getRouter(express))

  expressApp.use(express.static(scc.server.PUBLIC_BUILD_DIR, { index: 'index.html', extensions: ['html'] }))
  expressApp.use(express.static(scc.server.PUBLIC_STATIC_DIR, { index: 'index.html', extensions: ['html'] }))

  if (process.env.SERVER_ORIGIN.indexOf('https') >= 0) {
    const tlsConfig = {
      key: fs.readFileSync(process.env.TLS_KEY_PATH),
      cert: fs.readFileSync(process.env.TLS_CERT_PATH),
    }
    const server = https.createServer(tlsConfig, expressApp)
    server.listen(process.env.SERVER_PORT, () => {
      console.log(`Example app listening at port: ${process.env.SERVER_PORT}, origin: ${process.env.SERVER_ORIGIN}`)
    })
  } else {
    expressApp.listen(process.env.SERVER_PORT, () => {
      console.log(`Example app listening at port: ${process.env.SERVER_PORT}, origin: ${process.env.SERVER_ORIGIN}`)
    })
  }

  console.log(`open: ${process.env.SERVER_ORIGIN}/f/xlogin/connect`)
}

main()

