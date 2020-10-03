const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
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
      var temp = weatherData.main.temp;
      var min_temp = weatherData.main.temp_min;
      var max_temp = weatherData.main.temp_max;
      var pressure = weatherData.main.pressure;
      var humidity = weatherData.main.humidity;
      var description = weatherData.weather[0].description;
      var icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write(
        `
          <body style="box-sizing: border-box;
          padding: 0;
          margin: 0;
          font-family: monospace;">

          <div style="position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          background-color: #8bc6ec;
          background-image: linear-gradient(135deg, #8bc6ec 0%, #9599e2 100%);
          display:flex;
          flex-direction:column;
          align-items: center;
          ">

          <h1 style="font-size:35px; margin-top:150px">Current Temperature: ${temp}&#176C</h1>

          <p style="font-size:30px">The weather is currently ${description}<p>

          <img src=${imageUrl}>
        <div style="display:flex;flex-direction:row;flex-wrap: wrap;width:37em;justify-content: space-between;">
        <h2 style="font-size:25px;color:white">Min Temp: ${min_temp}&#176C</h2>
        <h2 style="font-size:25px;color:white">Max Temp: ${max_temp}&#176C</h2>
        <h2 style="font-size:25px;color:white">Pressure: ${pressure}</h2>
        <h2 style="font-size:25px;color:white">Humidity: ${humidity}</h2>
        </div>
          </div>
          </body>
          `
      );
      res.send();
    });
  });
});

app.listen(3000, function (req, res) {
  console.log("server started");
});
