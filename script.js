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
            console.log(data);
        })
        .catch(function () {
            console.log("Error: I don't know what happened");
        });
}

updateZipCode = () => {  
    var zipCode = document.getElementById('zipInput').value;
    weatherInLocation(zipCode);
    //The date variable should be a string in the format "yyyy-mm-dd"
    astronomyInLocation('2020-11-11', zipCode);
    //The date variable should be a string in the format "yyyy-mm-dd"
    weatherHistoryInLocation('2020-11-11', zipCode);
    //Takes in number of days and zipcode
    weatherForecastInLocation(3, zipCode);
}


window.onload = function () {
    getNews()
    weatherInLocation(76067);
    //The date variable should be a string in the format "yyyy-mm-dd"
    astronomyInLocation('2020-11-11', 84102);
    //The date variable should be a string in the format "yyyy-mm-dd"
    weatherHistoryInLocation('2020-11-11', 84102);
    //Takes in number of days and zipcode
    weatherForecastInLocation(3, 84102);
}