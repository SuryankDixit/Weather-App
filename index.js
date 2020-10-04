const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("input");
});

app.post("/", function (req, res) {
  console.log(req.body);
  var query = String(req.body.cityname);
  console.log(query);
  const apiKey = "ea84f006891ffe11b3e4c23dd62e2120";
  const unit = "metric";
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;
  console.log(url);
  https.get(url, function (response) {
    response.on("data", function (data) {
      // console.log(data);
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      var city_name = weatherData.name;
      var temp = weatherData.main.temp;
      var min_temp = weatherData.main.temp_min;
      var max_temp = weatherData.main.temp_max;
      var pressure = weatherData.main.pressure;
      var humidity = weatherData.main.humidity;
      var description = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      let tempDetails = {
        city_name: city_name,
        temp: temp,
        description: description,
        min_temp: min_temp,
        max_temp: max_temp,
        pressure: pressure,
        humidity: humidity,
        imageUrl: imageUrl,
      };

      res.render("details", { tempDetails: tempDetails });
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("server started");
});
