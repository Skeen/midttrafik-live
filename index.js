var request = require('request');
var parseString = require('xml2js').parseString;

var latitude = 56.23768998815982;
var longitude = 10.231356261596662;
var radius = 1968.3468750945158;

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
        console.log(json);
        /* // Filter to only show a specific bus-line
        console.log(json.filter(function(elem)
        {
            return elem.Line == "1A";
        }));
        */
    });
});
