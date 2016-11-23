# midttrafik-live
Pull bus data from 'live.midttrafik.dk/getbuses.php' and output as JSON.

## Data-Format

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
```
getJourney(bus):
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
