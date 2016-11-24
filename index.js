var request = require('request');
var parseString = require('xml2js').parseString;

// TODO: Error handling

var midttrafik = 
{
    getBuses: function(latitude, longitude, radius, callback)
    {
        var url = 'https://live.midttrafik.dk/getbuses.php?lat=' + latitude + '&lon=' + longitude + '&radius=' + radius;
        request(url, function(err, response, body)
        {
            parseString(body, function(err, json_raw)
            {
                var json = json_raw.Result.Bus;
                json = json.map(function(elem)
                {
                    return elem.$;
                });
                // Output a JSON array of the busses found
                callback(null, json);
            });
        });
    },

    getStops: function(latitude, longitude, radius, callback)
    {
        var url = 'https://live.midttrafik.dk/getstop.php?p=1&lat=' + latitude + '&lon=' + longitude + '&radius=' + radius;
        request(url, function(err, response, body)
        {
            parseString(body, function(err, json_raw)
            {
                var json = json_raw.Result.Stop;
                json = json.map(function(elem)
                {
                    return elem.$;
                });
                // Output a JSON array of the busses found
                callback(null, json);
            });
        });
    },

    getRouteStops: function(bus, callback)
    {
        var url = 'https://live.midttrafik.dk/getroutestops.php?p=1&journeyid=' + bus.JourneyId;
        request(url, function(err, response, body)
        {
            parseString(body, function(err, json_raw)
            {
                var json = json_raw.Result.Stop;
                json = json.map(function(elem)
                {
                    return elem.$;
                });
     
                // Output a JSON array of the stops
                callback(null, json);
            });
        });
    },

    getStopDepartures: function(stop, callback)
    {
        var url = 'https://live.midttrafik.dk/getstopinfo2.php?station=' + stop.Number + '&journeys=10';
        request(url, function(err, response, body)
        {
            parseString(body, function(err, json_raw)
            {
                var json = json_raw.MultiDepartureBoard.Departure;
                json = json.map(function(elem)
                {
                    return elem.$;
                });
     
                // Output a JSON array of the stops
                callback(null, json);
            });
        });
    }
}

module.exports = midttrafik;
