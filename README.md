# midttrafik-live
Pull bus data from `live.midttrafik.dk/*` and output as JSON.

The JSON documentation applies to the served XML too.

## Data-Format
### getStops (getstop.php)
Get a list of stops within the area specified by radius centered at latitude and longitude. 
```
getStops(latitude, longitude, radius, callback):
```
Callback takes two arguments `err` and `data`,  below is an example of the data. 
```
[
{ Number: '751470500',                  // Unique stop identifier
  Name: 'Lystrup Centervej/Hallen',     // Descriptive name of the stop
  Lat: '56.237044',                     // Lat and Lon designate the location of the stop.
  Lon: '10.234663',                     // ^^
  Distance: '216'                       // Distance from the provided lat/lon to the stop lat/lon in meters.
}, 
 ... 
]
```
### getBuses (getbuses.php)
Get a list of busses within the area specified by radius centered at latitude and longitude. 
```
getBuses(latitude, longitude, radius, callback):
```
Callback takes two arguments `err` and `data`,  below is an example of the data. 
```
[
{ Id: '722',                            // Unique bus identifier?
  Name: 'AH78574 - 682',
  Updated: '2016-11-23 17:25:23',       // Time when this data was published (NOT ACQUIRED)
  Delay: '639',                         // Current delay in seconds (can be negative)
  Lat: '56.2227683333333',              // Lat and Lon designate the location of the bus.
  Lon: '10.2184766666667',              // ^^
  JourneyId: '645a5a0e-5b6e-4436-9...', // Unique journey identifier (used for getRouteStops)
  Distance: '1839',                     // Distance from the provided lat/lon to bus lat/lon in meters.
  Line: '1A',                           // The bus line
  StartStation: '751470600',            // Unique stop identifier for start station
  EndStation: '751422000',              // Unique stop identifier for end station
  StartName: 'Majsmarken',              // Descriptive name of the stop (May be different from stop descriptive name??)
  EndName: 'Kolt',                      // Descriptive name of the stop (May be different from stop descriptive name??)
  StartTime: '2016-11-23 17:04:00',     // When the bus is expected to have started the journey
  EndTime: '2016-11-23 18:15:00',       // When the bus is expected to end the journey
  DirectionText: 'Kolt'                 // Which station are we going towards (EndName)
}, 
 ... 
] 
```
### getRouteStops (getroutestops.php)
Get a list of stops that `bus` has already or will pass on it's route. 
```
getRouteStops(bus, callback):
```
Callback takes two arguments `err` and `data`,  below is an example of the data. 
```
[
{ Number: '751439100',                  // Unique stop identifier.
  Name: 'Randersvej/Motorvejen',        // Descriptive name of the stop
  StopPassed: '0',                      // Whether the bus has passed this stop on route yet.
  Lat: '56.21123',                      // Lat and Lon designate the location of the stop.
  Lon: '10.172742',                     // ^^
  ArriveTime: '2016-11-23 17:19:00',    // Planned arrive time
  DepartureTime: '2016-11-23 17:19:00', // Planned departure time
  DepartureExpected: ''                 // Expected delay in departure in minutes
}, 
 ... 
] 
```
### getStopDepartures (getstopinfo2.php)
**Note: There is a `getstopinfo.php` as well**
Get a list of busses that's passing by the `stop`.
```
getStopDepartues(stop, callback):
```
Callback takes two arguments `err` and `data`,  below is an example of the data. 
```
[
{ name: 'Bus 114',                      // Descriptive name of the bus
  type: 'BUS',                          // BUS/TB seen??
  stop: 'Viborgvej/Bredskiftevej ...',  // The stop this information is reported for (may differ from getStops().Name)
  time: '11:31',                        // time and date are designate the planned arrive time.
  date: '24.11.16',                     // ^^
  messages: '0',                        // Absolutely no clue??
  rtTime: '13:43',                      // rtTime and rtDate are optional, and do only exist on busses,
  rtDate: '24.11.16',                   //  which are running late, and represent the real arrive time.
  finalStop: 'Aarhus Rutebilstation',   // Final stop this bus will get to
  direction: 'Aarhus'                   // Which direction the bus is going
},
 ...
]
```
