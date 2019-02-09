require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const logger = require('koa-logger')

const app = new Koa()
const router = new Router()

app.use(logger())
app.use(BodyParser())

// // logger
// app.use(async (ctx, next) => {
//     await next()
//     const rt = ctx.response.get('X-Response-Time')
//     console.log(`${ctx.method} ${ctx.url} - ${rt}`)
// });

// // x-response-time
// app.use(async (ctx, next) => {
//     const start = Date.now()
//     await next()
//     const ms = Date.now() - start
//     ctx.set('X-Response-Time', `${ms}ms`)
// });

require('./routes')(router)
app.use(router.routes())
app.use(router.allowedMethods())

const port = process.env.PORT
app.listen(port)
