const { WebClient } = require('@slack/client')
const web = new WebClient(process.env.SLACK_TOKEN)

function handleEvent(ctx, next) {
    ctx.status = 200

    if (ctx.request.body.type === 'url_verification') {
        ctx.body = ctx.request.body.challenge
    } else {
        const event = ctx.request.body.event
        if (event && event.subtype !== 'bot_message') {
            console.log(event)
            if (event && event.type) {
                switch (event.type) {
                    case 'app_mention':
                        break
                    case 'message':
                        if (event.text.startsWith('!?')) {
                            web.chat.postMessage({
                                text: Math.random() > .5 ? ':nod:' : ':shake:',
                                channel: event.channel,
                            }).then((res) => {
                                console.log('Message sent: ', res.ts);
                            }).catch(console.error)
                        }
                        break
                }
            }
        }

    }
};

module.exports = { handleEvent }