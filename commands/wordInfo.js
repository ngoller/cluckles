const { getMerriamSynonym, getMerriamDefinition, getMerriamAntonym } = require('../integrations/dictionary')

function wordInfo (lookupType, event, tokens, web) {
  let message = ''
  if (tokens.length > 1) {
    const word = tokens[1]
    if (!word) {
      message = ':ghost: A ghost. Spooky. Have you ever seen a ghostly chicken? :ghost:'
    } else if (word.toLowerCase() === 'cluckles') {
      message = 'Cluck cluck cluck.'
    } else {
      let func
      switch (lookupType) {
        case 'def':
        case 'define':
          func = getMerriamDefinition
          message = 'Cluckles thinks this is a made up word'
          break
        case 'ant':
        case 'antonym':
          func = getMerriamAntonym
          message = "Cluckles doesn't think this word has antonyms"
          break
        case 'syn':
        case 'synonym':
          func = getMerriamSynonym
          message = "Cluckles doesn't know this word ._."
          break
      }
      func(tokens[1], (def) => {
        if (def) {
          message = def
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

module.exports = { wordInfo }
