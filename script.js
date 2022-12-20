let inputBtn = document.querySelector(".input__weather--btn")
let mainDiv = document.querySelector(".mainDiv")
let foreCastDiv = document.querySelector(".foreCast--container")

const fetchApi = async (fetchCity, fetchUrl) => {
    mainDiv.innerHTML = `<p> Loading ${fetchCity.charAt(0).toUpperCase() + fetchCity.slice(1)}'s weather information...</p>`
    foreCastDiv.innerHTML = ''

    try {
        let response = await fetch(fetchUrl)
        let data = await response.json()
        if (data.temperature && data.wind && data.description) {
            let ihtml =
                `
                 <div class="weatherInfo" >
                    <p class="city"><span>City </span>${fetchCity.charAt(0).toUpperCase() + fetchCity.slice(1)}</p>
                    <p class="temperature"><span>Temperature </span>${data.temperature}</p>
                    <p class="wind"><span>Wind </span>${data.wind}</p>
                    <p class="status"><span>Status </span>${data.description}</p>
                </div>`
            mainDiv.innerHTML = ihtml

            let forecast = data.forecast
            forecast.forEach((forecast) => {
                let ihtml1 =
                    `
                    <div class="foreCast--details">
                        <p align="center" class="foreCastDay">Day ${forecast.day} Forecast</p>
                        <p class="foreCastTemp">Temperature: ${forecast.temperature}</p>
                        <p class="foreCastWind">Wind: ${forecast.wind}</p>
                    </div >`
                foreCastDiv.insertAdjacentHTML("beforeend", ihtml1)
            })
        } else {
            mainDiv.innerHTML = `<p class ="error"> Sorry, no weather data found of ${fetchCity} !!!</p>`
        }
    }

    catch (err) {
        console.log("API is not working")
        mainDiv.innerHTML = `<p class = "error"> Sorry, API is not working at the moment!!!</p>`
    }

}

const BtnFunc = () => {
    city = document.querySelector(".input__weather--userChoice").value.toLowerCase()
    console.log(city)
    url = `https://goweather.herokuapp.com/weather/${city}`
    fetchApi(city, url)
}

inputBtn.addEventListener("click", BtnFunc)