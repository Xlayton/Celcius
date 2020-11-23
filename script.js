const apiKey = "9e31f156020b4909b6b171432201111";
let newsStories = []

//There's a soft limit of 21 stories because API stuff :\
function getNews(numOfStories = 10) {
    newsStories = []
    fetch("http://newsapi.org/v2/top-headlines?country=us&q=weather&apiKey=20ba8aef150a4b599827f02a43125c32")
        .then(res => res.json())
        .then(data => {
            console.log(1, data)
            newsStories.push(...data.articles)
            if (newsStories.length < 10) {
                fetch("http://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=20ba8aef150a4b599827f02a43125c32")
                    .then(res => res.json())
                    .then(data => {
                        console.log(2, data)
                        let fillerStories = data.articles.slice(newsStories.length > 0 ? newsStories.length - 1 : newsStories.length, newsStories.length > 0 ? numOfStories - 1 : numOfStories)
                        newsStories.push(...fillerStories)
                        updateNewsArticles()
                    })
            } else {
                updateNewsArticles()
            }
        })
}

function updateNewsArticles() {
    console.log("Image it was loading HTML on the screen. Can you see it? Beautiful", newsStories)
}

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
                        <p>${data.current.temp_f}&deg;F</p>
                    `;
            for (let hour of data.forecast.forecastday[0].hour) {
                if (hour.time.match(reg)[0] === time) {
                    document.getElementById(`hour${counter}`).innerHTML = `
                        <p>${time === 12 ? time : time - 12}:00</p>
                        <p>${hour.temp_f}&deg;F</p>
                    `;
                    counter++;
                    if(counter > 6) break;
                    time = `${parseInt(time) + 1}`;
                }
            }

            //day forecast
            //day 1
            let day1High = document.getElementById("day1High");
            day1High.innerHTML = `${data.forecast.forecastday[0].day.maxtemp_f}&deg;F`;
            let day1Low = document.getElementById("day1Low");
            day1Low.innerHTML = `${data.forecast.forecastday[0].day.mintemp_f}&deg;F`;
            let possibleConditionDay1 = document.getElementById("possibleConditionDay1");
            possibleConditionDay1.innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;
            //day 2
            let day2High = document.getElementById("day2High");
            day2High.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_f}&deg;F`;
            let day2Low = document.getElementById("day2Low");
            day2Low.innerHTML = `${data.forecast.forecastday[1].day.mintemp_f}&deg;F`;
            let possibleConditionDay2 = document.getElementById("possibleConditionDay2");
            possibleConditionDay2.innerHTML = `${data.forecast.forecastday[1].day.condition.text}`;
            //day 3
            let day3High = document.getElementById("day3High");
            day3High.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_f}&deg;F`;
            let day3Low = document.getElementById("day3Low");
            day3Low.innerHTML = `${data.forecast.forecastday[2].day.mintemp_f}&deg;F`;
            let possibleConditionDay3 = document.getElementById("possibleConditionDay3");
            possibleConditionDay3.innerHTML = `${data.forecast.forecastday[2].day.condition.text}`;
            console.log(data);
        })
        .catch(function () {
            console.log("Error: I don't know what happened");
        });
}

updateZipCode = () => {
    var zipCode = document.getElementById('zipInput').value;
    console.log(zipCode);
    //Takes in number of days and zipcode
    weatherForecastInLocation(3, zipCode);
}


window.onload = function () {
    getNews()
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