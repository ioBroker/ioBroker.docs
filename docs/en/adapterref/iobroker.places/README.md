![Logo](admin/places.png)
# ioBroker.places
![Number of Installations](http://iobroker.live/badges/places-installed.svg)
![Number of Installations](http://iobroker.live/badges/places-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.places.svg)](https://www.npmjs.com/package/iobroker.places)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.places/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/places/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.places.svg)](https://www.npmjs.com/package/iobroker.places)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Description
This is an ioBroker adapter for processing location information messages which should contain a user, a geo-position and a timestamp as minimum. 
The adapters analyzes whether the location information is within a radius around the location configuration of ioBroker or optional other places.

## Configuration

There is just one mandatory configuration value: the radius (meters) which will be used to identify the current location of a user. 
The location of ioBroker is used to identify users being "at home", other places can be added as part of the configuration.

* **Radius** (_mandatory_) should be the radius in meters used to check whether the user is at a specific place (home or custom).
* **Name for home** can be used to set a custom name for the home place.
* **Google Maps API key** will be used for enabling geo-coding. A missing API key will be fetched from a configured vis-map instance (if available) when configuration page has been opened.
* **Google Maps Geocoding** can be activated to get a real address and an elevation for a provided geo-position.
* **Places** is a flexible list containing custom places where each place should have valid values for name, latitude and longitude.
* **Users** is a flexible list containing user mappings.

## Usage

To process location update just send a message using the following syntax:

```
// send a message to all instances of places adapter
sendTo('places', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
});

// send a message to a specific instance of places adapter adapter
sendTo('places.0', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
});

// send a message to a specific instance and define a callback
sendTo('places.0', {
        user:       "Name of person", 
        latitude:   50.9576191, 
        longitude:  6.8272409, 
        timestamp:  1520932471
}, function (res) { log(JSON.stringify(res)); });
```

## Structure for returned messages

The following block shows how response messages look like. For each value the ioBroker object tree has an according state.

```
{
    "user":         "Name of person",       // name of person (may have been replaced by user mapping)
    "latitude":     50.9576191,
    "longitude":    6.8272409,
    "timestamp":    1520932471000,
    "date":         "2018-03-13 10:14:31",  // date extracted from timestamp
    "atHome":       false,                  // true if inside the configured radius around ioBroker
    "homeDistance": 104898,                 // distance in meters between position and ioBroker
    "name":         "",                     // name of place found within the configuration
    "address":      "",                     // readable address (if geocoding is active)
    "elevation":    "",                     // elevation in meters (if geocoding is active)
}
```

## Sample: OwnTracks + ioBroker.iot + ioBroker.places
### 1. Configure iobroker.iot
Add a custom services **xyz** under **White list for Services**.

### 2. Configure OwnTracks mobile apps
Change the mode to **HTTP Private** and use the following address as **Host** : https://iobroker.pro/service/custom_xyz/<user-app-key>

### 3. Configure iobroker.places
On the tab Integration you have to select the instance of the cloud adapter and **xyz** as service. The adapter will listen to incoming requests for the service and start the processing.


## Sample: Telegram + ioBroker.telegram + ioBroker.places
### 1. Configure iobroker.telegram
Enable the option to **store raw requests**.

### 2. Create script (ioBroker.javascript)
Create a short script with a subscription to the raw request, f.e. from **telegram.0.communicate.requestRaw**, and send a new request object to iobroker.places (or an instance of it):

```
on({id: "telegram.0.communicate.requestRaw", change: "ne"}, function (obj) {
    var data = JSON.parse(obj.newState.val);
    if (data.from && data.location) {
        sendTo('places.0', {
            user: data.from.first_name, 
            latitude: data.location.latitude, 
            longitude: data.location.longitude, 
            timestamp: data.date
        }, function (res) { log('places analyzed telegram position as: ' + JSON.stringify(res)); });
    }
});
```

## Credits
The implementation is partly based on dschaedls [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) adapter. The logo has been taken from [Free Icons PNG](http://www.freeiconspng.com/images/maps-icon) and has been modified to have a transparent background.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2025-05-13)
* (TicoM1) Defaultvalue for state `personsAtHome` has been corrected.
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >=7.4.10 now.
* (mcm1957) Several issues reported by repository checker have been fixed.
* (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.2 (2022-04-17)
* (Apollon77) Fix personsAtHome and anybodyAtHome states

### 1.1.1 (2022-03-29)
* (Apollon77) Allow (again?) to consume external subscribed state value independently of ack flag

### 1.1.0 (2022-03-25)
* (Basgo) Correctly set ack flag
* (Apollon77) Add Sentry for crash reporting

### 1.0.0 (2020-08-16)
* (bluefox) Updated packages
* (bluefox) Refactoring

### 0.7.0 (2019-01-12)
* (BasGo) Added compact mode, replaced integration of iobroker.cloud with iobroker.iot

### 0.6.2 (2018-12-06)
* (bluefox) Error with blockly was fixed

### 0.6.1
* (BasGo) Added handling for invalid route details

### 0.6.0
* (BasGo) Changed implementation to use promises
* (BasGo) Added route details for driving home

### 0.5.1
* (BasGo) Extended help texts

### 0.5.0
* (BasGo) Added optional subscription for cloud adapter

### 0.4.2
* (BasGo) UI fixes

### 0.4.1
* (BasGo) Configuration dialog extended

### 0.4.0
* (BasGo) Google Maps can be used for configuration
* (BasGo) Geocoding can be activated

### 0.3.0
* (BasGo) Added user mappings

### 0.2.3
* (BasGo) Optimized state handling
* (BasGo) Added option to clear array

### 0.2.2
* (BasGo) Added check for newer entries

### 0.2.1
* (BasGo) Extended configuration

### 0.2.0
* (BasGo) Materialized admin page

### 0.1.1
* (BasGo) Fixed some smaller issues

### 0.1.0
* (BasGo) Initial release

## License

The MIT License (MIT)

Copyright (c) 2023-2025 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2022 BasGo <basgo@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
