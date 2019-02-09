const https = require('https')

function request (options, callback) {
  const req = https.request(options, (res) => {
    let data = ''
    res.on('data', (d) => {
      data += d
    })

    res.on('end', () => {
      let json

      try {
        json = JSON.parse(data)
      } catch (e) {
        console.error(`Json parsed from ${options.hostname} cannot be parsed.`)
      }

      callback(json)
    })
  })

  req.on('error', (error) => {
    console.error(error)
  })

  req.end()
}

module.exports = { request }
