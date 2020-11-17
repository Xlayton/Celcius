const apiKey = "9e31f156020b4909b6b171432201111";
const newsStories = []

function getNews() {
    fetch("http://newsapi.org/v2/top-headlines?country=us&q=weather&apiKey=20ba8aef150a4b599827f02a43125c32")
        .then(res => res.json())
        .then(data => {
            newsStories.push(...data.articles)
        })
    // fetch("http://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=20ba8aef150a4b599827f02a43125c32")
    //     .then(res => res.json())
    //     .then(data => console.log(data))
}
getNews()

//This function takes in a zipcode and returns the weather in that location
function weatherInZipCode(zipCode) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zipCode}`)
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
function astronomyInZipCode(date, zipCode) {
    fetch(`https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${zipCode}&dt=${date}`)
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

window.onload = function () {
    weatherInZipCode(76067);
    //The date variable should be a string in the format "yyyy-mm-dd";
    astronomyInZipCode('2020-11-11', 84102);
}