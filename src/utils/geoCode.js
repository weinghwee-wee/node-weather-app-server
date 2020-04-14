const request = require('request')

module.exports.getLocation = (address, callback) => {
  const geocodingUrl = `http://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1Ijoid2Vpbmdod2VlIiwiYSI6ImNrOHduamNoOTB5Z2UzZ2pzZDZhaWRkcTYifQ.xQ8bv5bzb-ItgRZ1zabLVA`

  request({url: geocodingUrl, json: true}, (error, {body}) => {
    const {features} = body

    if (error) {
      callback('Unable to connect to geocode api')
    } else if (!features.length) {
      callback('Cannot find location')
    } else {
      callback(null, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      })
    }
  })
}
