var request = require('request');
var parseString = require('xml2js').parseString;

// TODO: Error handling

function getBuses(latitude, longitude, radius, callback)
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
            //console.log(json);
            callback(null, json);
        });
    });
}

function getStops(latitude, longitude, radius, callback)
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
            //console.log(json);
            callback(null, json);
        });
    });

}

function getJourney(bus, callback)
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
            //console.log(json);
            callback(null, json);
            /*
            var json = json_raw.Result.Bus;
            json = json.map(function(elem)
            {
                return elem.$;
            });
            // Output a JSON array of the busses found
            //console.log(json);
            callback(json);
            */
        });
    });

}

// Example of usage:
var latitude = 56.23768998815982;
var longitude = 10.231356261596662;
var radius = 1968.3468750945158;
getBuses(latitude, longitude, radius, function(err, buses)
{
    // Find the first bus 1A
    var A1_index = buses.findIndex(function(elem)
    {
        return elem.Line == "1A";
    });

    if(A1_index == -1)
    {
        console.error("No A1 found");
        process.exit(1);
    }
    var bus = buses[A1_index];
    console.log(bus);

    getJourney(bus, function(err, stops)
    {
        // Find the first stop we haven't passed yet (next stop)
        var nextStop_index = stops.findIndex(function(elem)
        {
            return elem.StopPassed == '0';
        });

        if(nextStop_index == -1)
        {
            console.error("No next stop found");
            process.exit(1);
        }
        var stop = stops[nextStop_index];
        console.log(stop);
    });
});

getStops(latitude, longitude, radius, function(err, stops)
{
    // Print the closest stop
    console.log(stops[0] || 'No stops found');
});
