var mt = require('../index.js');

// Example of usage:
var latitude = 56.23768998815982;
var longitude = 10.231356261596662;
var radius = 1968.3468750945158;

mt.getBuses(latitude, longitude, radius, function(err, buses)
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
    mt.getRouteStops(bus, function(err, stops)
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

mt.getStops(latitude, longitude, radius, function(err, stops)
{
    // Print the closest stop
    console.log(stops[0] || 'No stops found');
    mt.getStopDepartures(stops[0], function(err, buses)
    {
        var firstDelayed_index = buses.findIndex(function(elem)
        {
            return elem.rtTime != undefined;
        });

        if(firstDelayed_index == -1)
        {
            console.error("No buses were delayed for this stop");
            console.log(buses[0]);
            process.exit(1);
        }
        var bus = buses[firstDelayed_index];
        console.log(bus);
    });
});
