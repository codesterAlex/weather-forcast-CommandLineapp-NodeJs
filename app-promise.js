const yargs = require('yargs');
const axios = require('axios');
//const cordova = require('cordova-plugin-geolocation');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
.options({
  a:{
    demand: true,
    alias: 'address',
    describe:'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help','h')
.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{
  if(response.data.status === "ZERO_RESULTS"){
    throw new Error('Sorry, address doesn\'t exist');
  }
  var lat=response.data.results[0].geometry.location.lat ;
  var lng = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/eb10ace92c5708cebd72b23584f8037d/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response)=>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  var summ = response.data.currently.summary;
  var hourlySum = response.data.hourly.summary;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
  console.log(`\tSo, the summary is that it's ${summ} right now.`)
  console.log(`*Tip*\n\tIf you're planning for going out within a hour just remember ${hourlySum}`);

}).catch((e)=>{
  if(e.code === 'ENOTFOUND')
  {
    console.log('unable to connect with api servers')
  }else{
    console.log(e.message);
  }
  //console.log(e);
});
// eb10ace92c5708cebd72b23584f8037d
// https://api.darksky.net/forecast/eb10ace92c5708cebd72b23584f8037d/37.8267,-122.4233
