const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/index.html");

})


app.post("/", function(req, res) {

    console.log(req.body);
    var query = String(req.body.cityname);
    console.log(query);
    const apiKey = "ea84f006891ffe11b3e4c23dd62e2120";
    const unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;
    console.log(url);
    https.get(url, function(response) {

        response.on("data", function(data) {

            // console.log(data);
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            var temp = weatherData.main.temp;
            var description = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Current Temp is: " + temp + " degree celcius</h1>");
            res.write("<p>The weather is currently " + description + "<p>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })


})

app.listen(3000, function(req, res) {
    console.log("server started");
})