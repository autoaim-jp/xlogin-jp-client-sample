import axios from 'axios'
import crypto from 'crypto'
import express from 'express'
import expressSession from 'express-session'
import Redis from 'ioredis'
import RedisStore from 'connect-redis'

import coreRouter from './coreRouter.js'
import sessionRouter from './sessionRouter.js'

import lib from './lib.js'

const init = (scc, statusList) => {
  lib.init(crypto, axios)
  coreRouter.init(express, scc, statusList)
  sessionRouter.init(express, expressSession, Redis, RedisStore, scc)
}


export default {
  init,
  coreRouter,
  sessionRouter,
}

