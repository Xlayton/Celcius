console.log("Working");

const apiKey = "9e31f156020b4909b6b171432201111";

//This function takes in a zipcode and returns the weather in that location
function weatherInZipCode(zipCode) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${zipCode}`)
        .then(function (resp) { return resp.json() }) // Convert data to json
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
        .then(function (resp) { return resp.json() }) // Convert data to json
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