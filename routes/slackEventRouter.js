const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/slackEventController')

router.post('/', Ctrl.handleEvent)

module.exports = router.routes()
