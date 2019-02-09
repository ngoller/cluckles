const { getMerriamDefinition } = require('../integrations/dictionary')

function definition (event, tokens, web) {
  let message = ''
  if (tokens.length > 1) {
    const word = tokens[1]
    if (!word) {
      message = ':ghost: A ghost. Spooky. Have you ever seen a ghostly chicken? :ghost:'
    } else if (word.toLowerCase() === 'cluckles') {
      message = 'Cluck cluck cluck.'
    } else {
      getMerriamDefinition(tokens[1], (def) => {
        message = def
        if (!message) {
          message = "Cluckles doesn't know this word :thinking_face:"
        }
        web.chat.postMessage({
          text: message,
          channel: event.channel
        }).catch(console.error)
      })
      return
    }
  } else {
    message = ':ghost:'
  }

  web.chat.postMessage({
    text: message,
    channel: event.channel
  }).catch(console.error)
}

module.exports = { definition }
