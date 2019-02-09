const request = require('../lib/request')

const appId = process.env.OXFORD_APP_ID
const appKey = process.env.OXFORD_APP_KEY
const merriamKey = process.env.MERRIAM_DICTIONARY_KEY
// const thesaurusKey = process.env.MERRIAM_THESAURUS_KEY

function getOxfordDefinition (word, callback) {
  const options = {
    hostname: 'od-api.oxforddictionaries.com',
    path: `/api/v1/entries/en/ace/regions=us`,
    method: 'GET',
    headers: {
      accept: 'application/json',
      app_id: appId,
      app_key: appKey
    }
  }

  request.request(options, callback)
}

function getMerriamDefinition (word, callback) {
  const options = {
    hostname: 'www.dictionaryapi.com',
    path: `/api/v3/references/collegiate/json/${word}?key=${merriamKey}`,
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  }

  request.request(options, (json) => {
    try {
      console.log(json)
      const definition = json[0].shortdef.join('\n')
      callback(definition)
    } catch (error) {
      callback()
    }
  })
}

module.exports = { getMerriamDefinition, getOxfordDefinition }
