const { WebClient } = require('@slack/client')
const web = new WebClient(process.env.SLACK_TOKEN)

const { definition } = require('../commands/definition')

function handleEvent (ctx, next) {
  ctx.status = 200

  if (ctx.request.body.type === 'url_verification') {
    ctx.body = ctx.request.body.challenge
  } else {
    const event = ctx.request.body.event
    // Ignore own messages and messages from other bots
    if (event && event.subtype !== 'bot_message') {
      console.debug(event)
      if (event && event.type) {
        switch (event.type) {
          case 'app_mention':
            web.chat.postMessage({
              text: ':wave:',
              channel: event.channel
            }).catch(console.error)
            break
          case 'message':
            handleMessage(event)
            break
        }
      }
    }
  }
};

function handleMessage (event) {
  const tokens = event.text.split(' ')
  if (event.text.startsWith('!?')) {
    web.chat.postMessage({
      text: Math.random() > 0.5 ? ':nod:' : ':shake:',
      channel: event.channel
    }).catch(console.error)
  } else if (event.text.startsWith('!def')) {
    definition(event, tokens, web)
  }
}

module.exports = { handleEvent }
