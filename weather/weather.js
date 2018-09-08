var request = require('request');

var getWeather = (lat, lng,callback)=>{

  request({url:`https://api.darksky.net/forecast/eb10ace92c5708cebd72b23584f8037d/${lat},${lng}`, json:true},(err,response,body)=>{
    if(!err && response.statusCode === 200)
    {
      callback(undefined,{
        temp: body.currently.temperature,
        apparentTemp:body.currently.apparentTemperature
      }
        );
    }
    else{
          callback('Couldn\'t fetch from forecase server.');
    }
  })
};
module.exports.getWeather = getWeather;
