const axios = require('axios')
const crypto = require('crypto')
const express = require('express')
const expressSession = require('express-session')
const Redis = require('ioredis')
const RedisStore = require('connect-redis')(expressSession)

const coreRouter = require('./coreRouter.js')
const sessionRouter = require('./sessionRouter.js')

const lib = require('./lib.js')

const init = (scc, statusList) => {
  lib.init(crypto, axios)
  coreRouter.init(express, scc, statusList)
  sessionRouter.init(express, expressSession, Redis, RedisStore, scc)
}


module.exports = {
  init,
  coreRouter,
  sessionRouter,
}

