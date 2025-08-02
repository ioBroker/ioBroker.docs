![Logo](admin/owfs.png)
# ioBroker OWFS Adapter

![Number of Installations](http://iobroker.live/badges/owfs-installed.svg)
![Number of Installations](http://iobroker.live/badges/owfs-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.owfs.svg)](https://www.npmjs.com/package/iobroker.owfs)

![Test and Release](https://github.com/ioBroker/ioBroker.owfs/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/owfs/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.owfs.svg)](https://www.npmjs.com/package/iobroker.owfs)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## *One wire file system* adapter for ioBroker.

Supported

This adapter uses the owfs library from https://www.npmjs.com/package/owjs and accordingly requires owfs server.

## Install OWFS Linux

`sudo apt-get install owfs`

Sometimes you need to write the following steps:
- To start the server to communicate over serial interface with 1wire sensors 

`owserver -d "/dev/ttyUSB0" --nozero`

`/dev/ttyUSB0` is the name of your serial device. Here was a USB stick used for that.

This command starts the 1wire server on local port 4304.

- To show the data from the local 1wire server in the file system, call the following command: 

`owfs -C -m /mnt/1wire --allow_other`

Before you must create the directory */mnt/1wire* with command `mkdir /mnt/1wire`

## Install OWFS windows
http://sourceforge.net/projects/owfs/

## Changelog
### 0.7.0 (2022-04-25)
* IMPORTANT: Requires now at least js-controller 2.0
* (boellner) ignore 85 degree error value for file system too
* (Apollon77) Add sentry for crash reporting

### 0.6.4 (2020-01-26)
* (CC1337) Added option to not log 85°C readings. They appear if a DS18B20 has a power failure and returns this initial register value.

### 0.6.3 (2020-01-23)
* (INgo Rah) Added the alarm state handling

### 0.6.2 (2019-10-29)
* (RustyThePropellerHead) Improved data integrity when reading from local OWFS via a file system

### 0.6.1 (2018-07-11)
* (bluefox) compact mode supported
* (lvogt) Added data points counter.A/.B/.ALL from DS2423 to config page
* (lvogt) Added option to not log faulty readouts

### 0.5.0 (2018-03-16)
* (bluefox) Ready for Admin3

### 0.4.1 (2017-05-29)
* (ausHaus) fix translations

### 0.4.0 (2017-02-26)
* (bluefox) support iButtons

### 0.3.4 (2016-08-28)
* (bluefox) filter out service entries by list

### 0.3.3 (2016-08-25)
* (bluefox) custom poll interval for every sensor

### 0.3.2 (2016-08-24)
* (bluefox) support of local OWFS via a file system

### 0.2.2 (2016-07-29)
* (bluefox) add new data points: pressure, volts, ...

### 0.2.1 (2016-07-28)
* (bluefox) fixes of writing

### 0.2.0 (2016-07-27)
* (bluefox) discover sensors
* (bluefox) used another npm library to fix writing

### 0.1.1 (2016-07-25)
* (bluefox) check configuration

### 0.1.0 (2016-07-08)
* (bluefox) remove rooms
* (bluefox) fix creation of states
* (bluefox) convert states to numbers
* (bluefox) support of quality codes

### 0.0.1 (2014-11-02)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2015-2024, bluefox <dogafox@gmail.com>

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
