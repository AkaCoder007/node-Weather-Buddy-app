const request = require("postman-request");
// getting coordinatesof location by geocoding Api using forward geooding

const geocode = (location, callback) => {
  const geoCodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYW5pbGxwaXlhayIsImEiOiJja3cwYzM2MjI0cjJtMndrbGs4MWtka3czIn0.39gyRgsytqoy5eZudvoNtg&limit=1`;

  request({ url: geoCodingUrl, json: true }, function (error, { body = {} }) {
    if (error) {
      callback("ERROR: Unable to Connect to the Location services", undefined);
      return;
    }
    if (body.features.length == 0) {
      callback(
        "ERROR: Unable to find the Location, Try another Search",
        undefined
      );
      return;
    }
    const { center: coords, place_name: location } = body.features[0];
    const data = new Object({ coords: coords, location: location });
    callback(undefined, data);
  });
};

module.exports = geocode;
