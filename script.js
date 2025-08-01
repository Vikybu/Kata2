const btnOk = document.getElementById('btn_ok')
const divGPS = document.querySelector('#gps')
const divTemperature = document.getElementById('temperature')
const divCity = document.getElementById('city')
const divDetails = document.getElementById('details')
const precipitationP = document.getElementById('precipitation')
const humidityP = document.getElementById('humidity')

//Récupération des coordonnées par l'API nominatim
async function fetchCoordinates(){
    const cityInput = document.getElementById('cityInput')
    const city = cityInput.value
    const response = await fetch (`https://nominatim.openstreetmap.org/search?format=json&q=${city}`)
    const data = await response.json()
    if(data.length != 0){
        const latitude = data[0].lat
        const longitude = data[0].lon
        divCity.innerText = `${city}`
        divGPS.innerText = `Coordonnées GPS: ${latitude}, ${longitude}`
        return data
    } else {
        divCity.innerText = `Ville non trouvé`
        divGPS.innerText = `-`
    }
}


//Récupération des coordonnées par l'API open-météo
async function fetchWeather(data){
    console.log(data.length)
    const latitude = data[0].lat
    const longitude = data[0].lon
    const response = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,relative_humidity_2m`)
    const donnees = await response.json()
    const temperature = donnees.current.temperature_2m   
    const precipitation = donnees.current.precipitation
    const humidity = donnees.current.relative_humidity_2m
    divTemperature.innerText = `${temperature} °C`
    precipitationP.innerText = `Precipitation : ${precipitation} mm`
    humidityP.innerText = `Humidité relative : ${humidity} %`
}


btnOk.addEventListener('click', async () => {
    divCity.innerText = ''
    divGPS.innerText = ''
    const data = await fetchCoordinates()
    divTemperature.innerText = ''
    divTemperature.innerText = ``
    precipitationP.innerText = ''
    if (data != undefined){
        await fetchWeather(data)
    } else {
        divTemperature.innerText = `-`
        precipitationP.innerText = 'Vérifier le nom de la ville'
        humidityP.innerText = ''
    }

})