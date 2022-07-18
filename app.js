const fs = require('fs')
const axios = require('axios')
const https = require('https')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
require('dotenv').config()
process.env.APP_PATH = `${__dirname}/`


const lib = require('./lib.js')
const xdevkit = require('./xdevkit/index.js')
const statusList = require('./statusList.js')
const scc = require('./serverCommonConstant.js')

const main = () => {
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

