const request = require('../lib/request')

const merriamKey = process.env.MERRIAM_DICTIONARY_KEY
const thesaurusKey = process.env.MERRIAM_THESAURUS_KEY

function getMerriamDefinition (word, callback) {
  const options = {
    hostname: 'www.dictionaryapi.com',
    path: `/api/v3/references/collegiate/json/${word}?key=${merriamKey}`,
    method: 'GET'
  }

  request.request(options, (json) => {
    try {
      const firstOption = json[0]
      let definition
      if (typeof firstOption === 'string') {
        definition = `Did you mean ${firstOption}?`
      } else {
        definition = json[0].shortdef.join('\n')
      }
      callback(definition)
    } catch (error) {
      callback()
    }
  })
}

function getMerriamSynonym (word, callback) {
  const options = {
    hostname: 'www.dictionaryapi.com',
    path: `/api/v3/references/thesaurus/json/${word}?key=${thesaurusKey}`,
    method: 'GET'
  }

  request.request(options, (json) => {
    try {
      const firstOption = json[0]
      let synonym
      if (typeof firstOption === 'string') {
        synonym = `Did you mean ${firstOption}?`
      } else {
        synonym = json[0].meta.syns[0].join(', ')
      }
      callback(synonym)
    } catch (error) {
      callback()
    }
  })
}

function getMerriamAntonym (word, callback) {
  const options = {
    hostname: 'www.dictionaryapi.com',
    path: `/api/v3/references/thesaurus/json/${word}?key=${thesaurusKey}`,
    method: 'GET'
  }

  request.request(options, (json) => {
    try {
      const firstOption = json[0]
      let antonym
      if (typeof firstOption === 'string') {
        antonym = `Did you mean ${firstOption}?`
      } else {
        antonym = json[0].meta.ants[0].join(', ')
      }
      callback(antonym)
    } catch (error) {
      callback()
    }
  })
}

module.exports = { getMerriamDefinition, getMerriamSynonym, getMerriamAntonym }
