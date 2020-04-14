const request = require('request')

module.exports.getWeather = (latitude, longitude, callback) => {
  // 37.8267
  // -122.4233
  const weatherUrl = `http://api.weatherstack.com/current?access_key=2a6504ae4d94fcdcd25af9825ebe0a95&query=${latitude},${longitude}`

  request({url: weatherUrl, json: true}, (err, response) => {
    const {error, current} = response.body;

    if (err ){
      callback('Unable to connect to api')
    } else if (error) {
      callback('Unable to get weather data')
    }
    else { 
      callback(null, 'It is currently ' + current.temperature + ' degrees out.')
    }
  })
}

// raw https call

// const https = require('https')

// const url = 'http://api.weatherstack.com/current?access_key=2a6504ae4d94fcdcd25af9825ebe0a95&query=40,31'

// const request = https.request(url, (response) => {
//   let data = ''

//   response.on('data', (chunk) => {
//     data = data + chunk.toString()
//   })

//   response.on('end', () => {
//     const body = JSON.parse(data)
//   })
// })

// request.on('error', (error) => {
//   console.log(error)
// })

// request.end();

