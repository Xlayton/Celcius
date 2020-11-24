const apiKey = "9e31f156020b4909b6b171432201111";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Location refers to US Zipcode, UK Postcode, Canada Postalcode, IP address, Latitude/Longitude (decimal degree) or city name.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//This function takes in a zipcode and returns the weather in that location
function weatherInLocation(location) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            console.log(data);
            let currentWeatherType = document.getElementById("currentWeatherType");
            currentWeatherType.innerText = data.current.condition.text;
            changeBackgroundColor(data.current.condition.text);
        })
        .catch(function () {
            console.log("Error: I don't know what happened");
        });
}

//This function takes in a date and zipcode and returns the astonomy in that location
//The date variable should be a string in the format "yyyy-mm-dd";
function astronomyInLocation(date, location) {
    fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${location}&dt=${date}`)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            // let sunRise = document.getElementById("sunRise");
            // sunRise.innerHTML = data.astronomy.astro.sunrise;
            console.log(data);
        })
        .catch(function () {
            console.log("Error: I don't know what happened");
        });
}

//This function takes in a date and zipcode and returns the weather in that location, 
//even if the date is from the past
//The date variable should be a string in the format "yyyy-mm-dd";
function weatherHistoryInLocation(date, location) {
    fetch(`http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${location}&dt=${date}`)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            console.log(data);
        })
        .catch(function () {
            console.log("Error: I don't know what happened");
        });
}

//This function takes in a number of days (Max of 3) and zipcode and returns the weather in that location over the time period set
function weatherForecastInLocation(days, location) {
    // http://api.weatherapi.com/v1/forecast.json?key=9e31f156020b4909b6b171432201111&q=84102&days=3
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=${days}`)
        .then(function (resp) {
            return resp.json()
        }) // Convert data to json
        .then(function (data) {
            let reg = /[0-9]{2}(?=:[0-9]{2})/;
            let time = `${parseInt(getTime()) + 1}`;
            let counter = 0;

            //Top of the page content and hourly cast
            let currentDate = document.getElementById("currentTime");
            currentDate.innerText = `Date: ${data.current.last_updated}`;
            let currentCity = document.getElementById("currentCity");
            currentCity.innerText = data.location.name;
            let currentTemp = document.getElementById("currentTemp");
            currentTemp.innerHTML = `${data.current.temp_f}&deg;F`;
            let weatherIcon = document.getElementById("weatherIcon");
            weatherIcon.src = data.current.condition.icon;
            let currentHigh = document.getElementById("currentHigh");
            currentHigh.innerHTML = `High: ${data.forecast.forecastday[0].day.maxtemp_f}&deg;F&nbsp;`;
            let currentLow = document.getElementById("currentLow");
            currentLow.innerHTML = `Low: ${data.forecast.forecastday[0].day.mintemp_f}&deg;F`;
            document.getElementById(`currentHour`).innerHTML = `
                        <p>Now</p>
                        <img id="weatherIcon" src="${data.current.condition.icon}">
                        <p>${data.current.temp_f}&deg;F</p>
                    `;
            for (let hour of data.forecast.forecastday[0].hour) {
                if (hour.time.match(reg)[0] === time) {
                    document.getElementById(`hour${counter}`).innerHTML = `
                        <p>${time === 12 ? time : time - 12}:00</p>
                        <img id="weatherIcon" src="${hour.condition.icon}">
                        <p>${hour.temp_f}&deg;F</p>
                    `;
                    counter++;
                    if (counter > 6) break;
                    time = `${parseInt(time) + 1}`;
                }
            }

            //day forecast
            //day 1
            let day1Date = document.getElementById("day1Date");
            day1Date.innerHTML = data.forecast.forecastday[0].date;
            let day1High = document.getElementById("day1High");
            day1High.innerHTML = `H: ${data.forecast.forecastday[0].day.maxtemp_f}&deg;F`;
            let day1Low = document.getElementById("day1Low");
            day1Low.innerHTML = `L: ${data.forecast.forecastday[0].day.mintemp_f}&deg;F`;
            let possibleConditionDay1 = document.getElementById("possibleConditionDay1");
            possibleConditionDay1.innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;
            document.getElementById("forecast1Icon").innerHTML = `<img id="weatherIcon" src="${data.forecast.forecastday[0].day.condition.icon}">`;
            
            //day 2
            let day2Date = document.getElementById("day2Date");
            day2Date.innerHTML = data.forecast.forecastday[1].date;
            let day2High = document.getElementById("day2High");
            day2High.innerHTML = `H: ${data.forecast.forecastday[1].day.maxtemp_f}&deg;F`;
            let day2Low = document.getElementById("day2Low");
            day2Low.innerHTML = `L: ${data.forecast.forecastday[1].day.mintemp_f}&deg;F`;
            let possibleConditionDay2 = document.getElementById("possibleConditionDay2");
            possibleConditionDay2.innerHTML = `${data.forecast.forecastday[1].day.condition.text}`;
            document.getElementById("forecast2Icon").innerHTML = `<img id="weatherIcon" src="${data.forecast.forecastday[1].day.condition.icon}">`;

            //day 3
            let day3Date = document.getElementById("day3Date");
            day3Date.innerHTML = data.forecast.forecastday[2].date;
            let day3High = document.getElementById("day3High");
            day3High.innerHTML = `H: ${data.forecast.forecastday[2].day.maxtemp_f}&deg;F`;
            let day3Low = document.getElementById("day3Low");
            day3Low.innerHTML = `L: ${data.forecast.forecastday[2].day.mintemp_f}&deg;F`;
            let possibleConditionDay3 = document.getElementById("possibleConditionDay3");
            possibleConditionDay3.innerHTML = `${data.forecast.forecastday[2].day.condition.text}`;
            document.getElementById("forecast3Icon").innerHTML = `<img id="weatherIcon" src="${data.forecast.forecastday[2].day.condition.icon}">`;

            console.log(data);
        })
        .catch(function () {
            console.log("Error: I don't know what happened");
        });
}

changeBackgroundColor = currentWeather => {
    console.log(currentWeather);

    switch (currentWeather) {
        case "Sunny":
            document.body.style.backgroundColor = "#87ceeb";
            break;
        case "Clear":
            document.body.style.backgroundColor = "#d9f0fd";
            break;
        case "Partly cloudy":
            document.body.style.backgroundColor = "#b1d5ee";
            break;
        case "Cloudy":
            document.body.style.backgroundColor = "#ecfbfa";
            break;
        case "Overcast":
            document.body.style.backgroundColor = "#b3c0c8";
            break;
        case "Mist":
            document.body.style.backgroundColor = "#e9e9e7";
            break;
        case "Fog":
            document.body.style.backgroundColor = "#d3d4d5";
            break;
        case "Light rain":
            document.body.style.backgroundColor = "#c5e2f7";
            break;
        case "Moderate rain":
            document.body.style.backgroundColor = "#92bad2";
            break;
        case "Heavy rain":
            document.body.style.backgroundColor = "#53789e";
            break;
        case "Patchy rain possible":
            document.body.style.backgroundColor = "#abbebf";
            break;
        case "Patchy light drizzle":
            document.body.style.backgroundColor = "#abbebf";
            break;
        case "Light snow":
            document.body.style.backgroundColor = "#fcfdfd";
            break;
        case "Moderate snow":
            document.body.style.backgroundColor = "#e8ecf1";
            break;
        case "Heavy snow":
            document.body.style.backgroundColor = "#dcdde0";
            break;
        case "Patchy snow possible":
            document.body.style.backgroundColor = "#fcfdfd";
            break;
        case "Blowing snow":
            document.body.style.backgroundColor = "#e1edf3";
            break;
        case "Blizzard":
            document.body.style.backgroundColor = "#c2d3df";
            break;
        default:
            break;
    }
}

updateZipCode = () => {
    var zipCode = document.getElementById('zipInput').value;
    console.log(zipCode);
    weatherInLocation(zipCode);
    //Takes in number of days and zipcode
    weatherForecastInLocation(3, zipCode);
}


window.onload = function () {
    weatherInLocation(76067);
    //The date variable should be a string in the format "yyyy-mm-dd"
    astronomyInLocation('2020-11-11', 84102);
    //The date variable should be a string in the format "yyyy-mm-dd"
    //Not being used
    // weatherHistoryInLocation('2020-11-11', 84102);
    //Takes in number of days and zipcode
    weatherForecastInLocation(3, 'Salt Lake City');
}

function getTime() {
    let reg = /[0-9]{2}(?=:[0-9]{2})/;
    let time = new Date();
    return time.toTimeString().match(reg)[0];
}