const path = require("path");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const express = require("express");
const request = require("postman-request");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000; //
const directoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

app.use(express.static(directoryPath)); ///serve up the directory of html files

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// ---------------Routings
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Buddy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

//--------- Main routing for the app
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "Address is not provided",
    });
    return;
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      res.send({
        error: error,
      });
      return;
    }
    // res.send(data);

    forecast([data.coords[1], data.coords[0]], (error, response) => {
      if (error) {
        res.send({
          error: error,
        });
        return;
      }
      res.send({
        temperature: response.temperature,
        weatherIcon: response.weather_icons,
        weatherDescription: `${response.weather_descriptions} weather, the temperature is ${response.temperature}°C`,
        location: data.location,
      });
    });
  });

  // res.send({ weather: "Cloudy", location: req.query.address });
  // res.send({ weather: "Cloudy", location: "khaprail,sainikpuri" });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 page not found",
  });
});

//----------------Listening to the port
app.listen(port, () => {
  console.log(`App is listening at ${port}`);
});
