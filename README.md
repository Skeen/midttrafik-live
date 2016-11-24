# midttrafik-live
Pull bus data from 'live.midttrafik.dk/getbuses.php' and output as JSON.

## Data-Format
### getStops
Get a list of stops within the area specified by radius centered at latitude and longitude. 
```
getStops(latitude, longitude, radius, callback):
```
Callback takes two arguments `err` and `data`,  below is an example of the data. 
```
[
{ Number: '751470500',
  Name: 'Lystrup Centervej/Hallen',
  Lat: '56.237044',
  Lon: '10.234663',
  Distance: '216' }, 
 ... 
]
```
### getBuses
Get a list of busses within the area specified by radius centered at latitude and longitude. 
```
getBuses(latitude, longitude, radius, callback):
```
Callback takes two arguments `err` and `data`,  below is an example of the data. 
```
[
{ Id: '722',
  Name: 'AH78574 - 682',
  Updated: '2016-11-23 17:25:23',
  Delay: '639',
  Lat: '56.2227683333333',
  Lon: '10.2184766666667',
  JourneyId: '645a5a0e-5b6e-4436-9924-b32c0086b967',
  Distance: '1839',
  Line: '1A',
  StartStation: '751470600',
  EndStation: '751422000',
  StartName: 'Majsmarken',
  EndName: 'Kolt',
  StartTime: '2016-11-23 17:04:00',
  EndTime: '2016-11-23 18:15:00',
  DirectionText: 'Kolt' }, 
 ... 
] 
```
### getRouteStops
Get a list of stops that `bus` has already or will pass on it's route. 
```
getRouteStops(bus, callback):
```
Callback takes two arguments `err` and `data`,  below is an example of the data. 
```
[
{ Number: '751439100',
  Name: 'Randersvej/Motorvejen',
  StopPassed: '0',
  Lat: '56.21123',
  Lon: '10.172742',
  ArriveTime: '2016-11-23 17:19:00',
  DepartureTime: '2016-11-23 17:19:00',
  DepartureExpected: '' }, 
 ... 
] 
```
### getStopDepartures
Get a list of busses that's passing by the `stop`.
```
getStopDepartues(stop, callback):
```
Callback takes two arguments `err` and `data`,  below is an example of the data. 
```

[
{ name: 'Bus 114',
  type: 'BUS',
  stop: 'Viborgvej/Bredskiftevej (Aarhus)',
  time: '11:31',
  date: '24.11.16',
  messages: '0',
  rtTime: '13:43',
  rtDate: '24.11.16',
  finalStop: 'Aarhus Rutebilstation',
  direction: 'Aarhus' },
 ...
]
```
