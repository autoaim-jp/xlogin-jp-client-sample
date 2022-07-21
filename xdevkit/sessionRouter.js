const mod = {}

const init = (express, expressSession, Redis, RedisStore, scc) => {
  mod.express = express
  mod.expressSession = expressSession
  mod.Redis = Redis
  mod.RedisStore = RedisStore
  mod.scc = scc
}

const getRouter = () => {
  const expressRouter = mod.express.Router()
  const redis = new mod.Redis({
    port: mod.scc.session.REDIS_PORT,
    host: mod.scc.session.REDIS_HOST,
    db: mod.scc.session.REDIS_DB,
  })
  expressRouter.use(mod.expressSession({
    secret : process.env.SESSION_SECRET, 
    resave : true,
    saveUninitialized : true,                
    rolling : true,
    name : mod.scc.session.SESSION_ID,
    cookie: {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      secure: mod.scc.session.SESSION_COOKIE_SECURE,
      httpOnly: true,
      sameSite: 'lax',
    },
    store: new (mod.RedisStore(mod.expressSession))({ client: redis }),
  }))

  return expressRouter
}

export default {
  init,
  getRouter,
}

