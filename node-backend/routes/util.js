var config      = require('../config');
var request     = require('request');

var getAddress = (req, res) => {
    if (req.query.lat && req.query.lon) {
        var url = 'https://api.geocod.io/v1.3/reverse?api_key=' + config.geocodio_key +
        "&q=" + req.query.lat + "," + req.query.lon;
        request.get(url, (err, response, body) => {
            if (err)
                return res.json({success: false, message: err});
            try {
                var parsed = JSON.parse(response.body);
                var address = parsed.results[0].address_components;
                return res.json({success:true, address: address});
            } catch (err) {return res.json({success: false, message: err.message});}
        })
    } else {return res.json({success: false, message: 'No lat/lon specified'});}
}

var functions = {
    getAddress: getAddress
}

module.exports = functions;