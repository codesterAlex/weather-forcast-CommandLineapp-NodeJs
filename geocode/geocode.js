const request =  require('request');

var geocodeAddress = (address,callback)=>{
  var encodedAddress = encodeURIComponent(address);
  request({
    url:`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json:true
  },(err,response,body)=>{
    if(err)
    {
      callback("Unable to connect with google services");
    }
    else if(body.status === "ZERO_RESULTS"){
      callback("Sorry!!! Unable to find entered address");
    }
    else if(body.status==="OVER_QUERY_LIMIT")
    {
      callback("Unable to get google services");
    }
    else if(body.status==="OK")
    {
      callback(undefined,{
        address:body.results[0].formatted_address,
        latitude:body.results[0].geometry.location.lat,
        longitude:body.results[0].geometry.location.lng
      });
    }

  });
}

module.exports = {
  geocodeAddress,
}
