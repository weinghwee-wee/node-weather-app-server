
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const getWeather = (location) => {
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then(data => {
      const {error, weatherData, geocodeData} = data

      if (error) {
        messageOne.textContent = error
        messageTwo.textContent = ""
      } else {
        console.log(geocodeData)
        messageOne.textContent = geocodeData.location
        messageTwo.textContent = weatherData
      }
    })
  })
}

weatherForm.addEventListener('submit', (event) => {
  const searchValue = document.querySelector('input').value
  event.preventDefault()

  getWeather(searchValue)
})
