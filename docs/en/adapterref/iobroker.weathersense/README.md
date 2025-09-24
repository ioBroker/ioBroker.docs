![Logo](admin/weathersense.png)

# ioBroker.weathersense

[![NPM version](https://img.shields.io/npm/v/iobroker.weathersense.svg)](https://www.npmjs.com/package/iobroker.weathersense)
[![Downloads](https://img.shields.io/npm/dm/iobroker.weathersense.svg)](https://www.npmjs.com/package/iobroker.weathersense)
![Number of Installations](https://iobroker.live/badges/weathersense-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/weathersense-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.weathersense.png?downloads=true)](https://nodei.co/npm/iobroker.weathersense/)

**Tests:** ![Test and Release](https://github.com/ltspicer/ioBroker.weathersense/workflows/Test%20and%20Release/badge.svg)

## WeatherSense adapter for ioBroker

WeatherSense is a cloud for weather stations. This adapter reads data from the WeatherSense server.

See: https://play.google.com/store/apps/details?id=com.emax.weahter&hl=de_CH

Some WiFi weather stations use the WeatherSense Cloud.

For example, this WiFi weather station from Ideoon (Pearl):

![Screenshot](https://github.com/ltspicer/WeatherSense/blob/main/wetterstation.png)

## Use:

Simply enter your WeatherSense account login details (email and password).
The weather station data is stored in the weathersense data point.
The data can also be sent via MQTT.

## Changelog
### 3.0.3 (2025-09-14)

- eslint-config & testing version updated

### 3.0.2 (2025-08-29)

- Passwords protected, clean convert string > number

### 3.0.1 (2025-08-18)

- Delay 0-117s added

### 3.0.0 (2025-08-18)

- Type and channel position swapped for more meaningful sorting

### 2.0.2 (2025-08-17)

- Unit hPa added

### 2.0.1 (2025-08-17)

- More data output
- Cleaner type & channel output

### 1.0.3 (2025-07-03)

- Delay with different syntax

### 1.0.2 (2025-07-02)

- New release because SSH troubles in dev portal

### 1.0.1 (2025-07-02)

- Code cleanups

### 1.0.0 (2025-07-01)

- Initial release

## License

MIT License

Copyright (c) 2025 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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
