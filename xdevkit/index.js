import axios from 'axios'
import crypto from 'crypto'
import express from 'express'
import expressSession from 'express-session'
import Redis from 'ioredis'
import RedisStore from 'connect-redis'

import coreRouter from './coreRouter.js'
import sessionRouter from './sessionRouter.js'

import lib from './lib.js'

const init = (setting, browserServerSetting) => {
  lib.init(crypto, axios)
  coreRouter.init(express, setting, browserServerSetting)
  sessionRouter.init(express, expressSession, Redis, RedisStore, setting)
}


export default {
  init,
  coreRouter,
  sessionRouter,
}

