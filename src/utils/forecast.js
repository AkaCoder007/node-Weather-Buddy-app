const request = require("postman-request");

const foreCastWeather = (coords, callback) => {
  let url = `http://api.weatherstack.com/current?access_key=8dc4df85bd4e8ebd86da89b4c58abe4e&query=${coords}`;

  request({ url: url, json: true }, (error, { body = {} }) => {
    if (error) {
      callback(" ERROR: Unable to Connect to the Weather service", undefined);
      return;
    }

    if (body.error) {
      callback(body.error.info, undefined);
      return;
    }
    if (body.current) {
      data = body.current;
      callback(undefined, data);
    }
  });
};

module.exports = foreCastWeather;
