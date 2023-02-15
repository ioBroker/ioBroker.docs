![Logo](admin/twinkly.png)
# ioBroker.twinkly

![Number of Installations (latest)](http://iobroker.live/badges/twinkly-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/twinkly-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.twinkly.svg)](https://www.npmjs.com/package/iobroker.twinkly)
[![Downloads](https://img.shields.io/npm/dm/iobroker.twinkly.svg)](https://www.npmjs.com/package/iobroker.twinkly)

[![Test and Release](https://github.com/patrickbs96/ioBroker.twinkly/workflows/Test%20and%20Release/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3A%22Test+and+Release%22++)
[![CodeQL](https://github.com/patrickbs96/ioBroker.twinkly/workflows/CodeQL/badge.svg)](https://github.com/patrickbs96/ioBroker.twinkly/actions?query=workflow%3ACodeQL)
[![Known Vulnerabilities](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly)

## twinkly adapter for ioBroker

Adapter to communicate with the [Twinkly lights](https://www.twinkly.com/).

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Settings
The following Settings are available:
![Admin Settings](img/admin.png)

In the table you can add all the Twinkly lights you want to control. 

| Column       | Description                                                                                                                     |
|--------------|---------------------------------------------------------------------------------------------------------------------------------|
| `Enabled`    | Shall this connection be accessed                                                                                               |
| `Name`       | Name of the connection in ioBroker                                                                                              |
| `IP Address` | IP-Address to the Twinkly Lights                                                                                                |
| `Mode On`    | Which `ledMode` should be activated when state `on` is enabled.<br/>Color, Effect, Movie, Music Reactive, Playlist or last Mode |

The following additionals States are created per device when checked:
* Device Info
* MQTT
* Network Status


The following States are available:

| State         | Writable           | Description                                                                                                                     |
|---------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `connected`   | :x:                | Device Connected                                                                                                                |
| `details`     | :x:                | Device Details                                                                                                                  |
| `firmware`    | :x:                | Firmware Version                                                                                                                |
| `ledBri`      | :heavy_check_mark: | Brightness (deactivate control with -1)                                                                                         |
| `ledColor`    | :heavy_check_mark: | Color of LEDs, HSV/RGB(W)/HEX (`Color`)                                                                                         |
| `ledConfig`   | :heavy_check_mark: | Configuration of LEDs                                                                                                           |
| `ledEffect`   | :heavy_check_mark: | Effects (`Effect`)                                                                                                              |
| `ledLayout`   | :heavy_check_mark: | Layout of LEDs (disabled for further testing)                                                                                   |
| `ledMode`     | :heavy_check_mark: | Mode: Color, Effect, Movie, Music Reactive, Playlist, Off, RealTime (not yet supported), Demo                                   |
| `ledMovie`    | :heavy_check_mark: | Active Movie, If multiple Movies are added in the Playlist feature then they can be selected here. (`Movie`)                    |
| `ledPlaylist` | :heavy_check_mark: | Active Playlist Entry, Switch between Movies. (`Playlist`)                                                                      |
| `ledSat`      | :heavy_check_mark: | Saturation 0-100 (deactivate control with -1)                                                                                   |
| `mqtt`        | :heavy_check_mark: | MQTT-Connection                                                                                                                 |
| `name`        | :heavy_check_mark: | Name                                                                                                                            |
| `network`     | :x:                | Network-Information                                                                                                             |
| `on`          | :heavy_check_mark: | On/Off Switch                                                                                                                   |
| `paused`      | :heavy_check_mark: | Pause Connection to Twinkly so you can do changes in the App. Otherwise you might loose the connection while working in the App |
| `timer`       | :heavy_check_mark: | Update the Timer                                                                                                                |



[Private API information](https://xled-docs.readthedocs.io/en/latest/) by [Pavol Babinčák](https://github.com/scrool)


## Known Issues
* The maximum length for the movie name is 15 characters


## Code Expamples

### Upload Movie
```
sendTo('twinkly.0', 'uploadMovie', {
    connection : 'Fenster',
    frames     : [
        [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
        [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...],
        ...
    ],
    delay : 250
});
```

### Upload Template Movie
Upload a predefined movie.
- 0: Twinkle Blue-White
- 1: Twinkle Christmas-Green-Red
```
sendTo('twinkly.0', 'uploadTemplateMovie', {
    connection : 'Fenster',
    template   : 1
});

```
### Upload Twinkle Movie
```
sendTo('twinkly.0', 'uploadTwinkleMovie', {
    connection  : 'Fenster',
    baseColor   : '#00873f', // or {r: 0, g: 135, b: 62}
    secondColor : '#c30F15'  // or {r: 195, g: 15, b: 22}
});
```

<!--
### Send Realtime Frame
```
sendTo('twinkly.0', 'sendrealtimeframe', {
    connection : 'Fenster',
    frame      : [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
});
```
-->

### Generate Frame in a specific color
Returns a full frame in one color.
By sending the colors in the property `colors` you get an array of frames returned.
```
sendTo('twinkly.0', 'generateFrame', {
    connection : 'Fenster',
    color      : '#dd0055' // or {r: 221, g: 0, b: 85}
});
response => {
    // [{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...]
    ...
}

sendTo('twinkly.0', 'generateFrame', {
    connection : 'Fenster',
    colors     : ['#dd0055', ...] // or [{r: 221, g: 0, b: 85}, ...]
});
response => {
    // [[{"r":221,"g":0,"b":85},{"r":221,"g":0,"b":85}, ...], ..]
    ...
}
```

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 1.0.13 (2023-02-01)
* Update dependencies

### 1.0.12 (2022-12-22)
* Slave can write ledBri and ledSat

### 1.0.11 (2022-12-13)
* Extend Sentry logging for details.groups when "deprecated"
* Cancel active pause not working after startup if active beforehand
* Merge libraries request and twinkly
* Optimized Code in requests
* Updated Sentry logging for better viewability

### 1.0.10 (2022-12-05)
* Add sendTo message `uploadTwinkleMovie` to upload a twinkle movie with own colors
* Update Release Integration in Github Actions and Sentry

### 1.0.9 (2022-11-27)
* Now detects if Twinkly is in a group (firmware >= 2.8.3). If so, the group can only be controlled by the master, the states from the slave are read-only.

### 1.0.8 (2022-11-26)
* Add `musicreactive` Mode
* Add Ukrainian translation
* Rework how objects are created, objects are now created after first connect after startup and updated after a firmware update

### 1.0.7 (2022-11-19)
* Fixed deprecated messages from Sentry with api-validations
* Automatic switch mode had an error with playlists. Playlist item could never be selected.

## License
MIT License

Copyright (c) 2023 patrickbs96 <patrickbsimon96@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
