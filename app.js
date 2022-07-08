const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const ejs = require('ejs');
const port = 3000;
const https = require('https');
const { join } = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {});
})

app.post("/", (req, res) => {
    var query = req.body.city;
    const keyAPI = "---";
    const units = "metric";
    const urlCurrntlyWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + keyAPI + "&units=" + units + "";
    const urlFiveDaysWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + query + "&appid=" + keyAPI + "&units=" + units + "";
    https.get(urlCurrntlyWeather, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
        
            const weatherData = JSON.parse(data);
            //////////////////////////////////////Currently Weather//////////////////////////////////
            const humidity = Math.round(weatherData.main.humidity);
            const pressure = Math.round(weatherData.main.pressure);
            const wind = Math.round(weatherData.wind.speed);
            const realTemp = Math.round(weatherData.main.feels_like);
            const minTemp = Math.round(weatherData.main.temp_min);
            const maxTemp = Math.round(weatherData.main.temp_max);
            const country = weatherData.sys.country;
            const city = weatherData.name;
            const temp = Math.round(weatherData.main.temp);
            const desc = weatherData.weather[0].description;
            const imageIcon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png";
            res.render('index', {
                pressure: pressure,
                humidity: humidity,
                wind: wind,
                minTemp: minTemp,
                maxTemp: maxTemp,
                realTemp: realTemp,
                temp: temp,
                query: query,
                desc: desc,
                imageURL: imageURL,
                imageIcon: imageIcon,
                country: country,
                city: city,
            });
            
        });
    });
});

app.post('/', function (req, res) {
    https.get(urlFiveDaysWeather, (r) => {
        console.log(r.statusCode);
        r.on("data1", function (data1) {
            let weatherData1 = JSON.parse(JSON.stringify(data1))
            console.log(weatherData1.list[1].main.humidity)
            //////////////////////////////////////5 Days Weather//////////////////////////////////
            const hhh= weatherData1.list[0].main.humidity;
            const pressure = weatherData1.list[0].main.pressure;
            const wind = Math.round(weatherData1.wind.speed);
            const realTemp = Math.round(weatherData1.main.feels_like);
            const minTemp = Math.round(weatherData1.main.temp_min);
            const maxTemp = Math.round(weatherData1.main.temp_max);
            const country = weatherData1.sys.country;
            const city = weatherData1.name;
            const temp = Math.round(weatherData1.main.temp);
            const desc = weatherData1.weather[0].description;
            const imageIcon = weatherData1.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + imageIcon + "@2x.png";
            res.render('index', {
                pressure: pressure,
                hhh: hhh,
                wind: wind,
                minTemp: minTemp,
                maxTemp: maxTemp,
                realTemp: realTemp,
                temp: temp,
                query: query,
                desc: desc,
                imageURL: imageURL,
                imageIcon: imageIcon,
                country: country,
                city: city,
            });
            res.send();
        });

    });
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
})
