let div = document.querySelector('.out')
let select = document.createElement('select')
div.append(select)
let option
select.classList.add('city')

const cities = {
    2927043: "Stuttgart Feuerbach",
    701404: "Melitopol",
    698428: "Orikhiv",
    702550: "Lviv"
}

for (let key in cities) {
    option = document.createElement('option')
    option.textContent = cities[key]
    option.setAttribute("value", key)
    select.append(option)
}

const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "0d62e700f2fa8576a4aa790330178d18"
}

function getWeather() {
    const cityId = document.querySelector('.city').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function showWeather(data) {
    document.querySelector('.city-name').textContent = data.name
    document.querySelector('.temp').innerHTML = 'Temperature: ' + Math.floor(data.main.temp) + '&deg'
    document.querySelector('.wind_deg').innerHTML = 'Direction of the wind: ' + data.wind.deg + '&deg'
    document.querySelector('.wind_speed').textContent = 'Wind speed: '
        + Math.round(data.wind.speed) + ' m/sec'
    document.querySelector('.pressure').textContent = 'Pressure: ' + data.main.pressure + ' mm'
    document.querySelector('.description').textContent = 'Description: ' + data.weather[0]['description']
    document.querySelector('.icon').innerHTML = '<img src = "https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png">'
}

getWeather();

document.querySelector('.city').onchange = getWeather;
