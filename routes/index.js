module.exports = (router) => {
  router.use('/slackEvent', require('./slackEventRouter'))
}
