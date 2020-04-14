const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/src/public'))
app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/src/views/partials'))


const geoCode = require('./src/utils/geoCode')
const forecast = require('./src/utils/forecast')

app.get('/', (req, res) => {
  // render a view template using res.render()
  res.render('index', {
    // object of parameter to be sent to templating engine
    title: 'Weather app',
    name: 'WH'
  })
})

app.get('/about', (req, res) => {
  // render a view template using res.render()
  res.render('about', {
    title: 'About',
    name: 'WH'
  })
})

app.get('/help', (req, res) => {
  // render a view template using res.render()
  res.render('help', {
    title: 'Help',
    name: 'WH'
  })
})

app.get('/weather', (req, res) => {
  const {address} = req.query

  if  (!req.query.address) {
    return res.send({
      error: 'You must provide address'
    })
  }

  geoCode.getLocation(address, (error, geocodeData) => {
    if (error) {
      res.send({error})
    } else {
      const {latitude, longitude} = geocodeData;

      forecast.getWeather(latitude, longitude, (error, weatherData) => {
        if (error) {
          res.send({error})
        } else {
          res.send({
            weatherData,
            geocodeData,
            address
          })
        }
      })
    }
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'WH'
  })
})

app.listen(port, () => {
  console.log('Connected to server port ' + port)
})