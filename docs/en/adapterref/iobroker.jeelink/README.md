![Logo](admin/jeelab_logo.png)
# ioBroker.jeelink
![Number of Installations](http://iobroker.live/badges/jeelink-installed.svg) 
![Number of Installations](http://iobroker.live/badges/jeelink-stable.svg) 
[![NPM version](http://img.shields.io/npm/v/iobroker.jeelink.svg)](https://www.npmjs.com/package/iobroker.jeelink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.jeelink.svg)](https://www.npmjs.com/package/iobroker.jeelink)

**Tests:** ![Test and Release](https://github.com/foxthefox/ioBroker.jeelink/workflows/Test%20and%20Release/badge.svg)

This is an adapter for ioBroker to integrate RFM12B/RFM69 via Jeelink.
The jeelink can be used with the preloaded software (rfmdemo) for the reading of openenergy sensors (emon).
For the usage of LaCrosse sensors, the firmware has to be exchanged (see iobroker forum).

## Installation:
### released version
```javascript
npm install iobroker.jeelink
```
on raspberry it might help to use:
```javascript
 npm install --unsafe-perm iobroker.jeelink
 ```
 because serialport package must be built on unsupported arm-hw 

### the actual development version from github (when under testing, may not work!)
```javascript
npm install https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```
or
```javascript
npm install --unsafe-perm https://github.com/foxthefox/ioBroker.jeelink/tarball/master --production
```
## Settings:
- USB port of JeelinkAdapter usually /dev/ttyACME
- Serial Speed usually 57600 Baud

## Configuration:
to be done in admin
* deinition of the USB port
* setting the baudrate
- define sensor address which is received on air
- define unique sensors address within adapter (LaCrosse changes the on air address after battery change, so observe the debug log and adjust the sensor address after battery change)
- define the type of sensor (see below examples)
- define the room

## Sensors
|Object|device variants|telegram example|Description|
|--------|-------|:-:|--------|
|emonTH|emonTH|OK 19 ...|sensor from openenergy.org|
|emonWater|emonWater|OK 21 ... |sensor with RFM12B for water metering|
|LaCrosseDTH |TX|OK 9 ... |sensors from LaCrosse, technoline|
|LaCrosseDTT |TX|OK 9 ... |sensors from LaCrosse, technoline double temp|
|HMS100TF |TXH29DTH-IT|H00 ... |sensors technoline|
|LaCrosseBMP180||OK WS ... |sensor mod, superjee|
|LaCrosseWS|WS1080,TX22,WS1600|OK WS ... |Weather Station|
|EC3000|EC3000|OK 22 ... |Energy Meter|
|EMT7110|EMT7110|OK EMT7110 ... |Energy Meter|
|level|level|OK LS ... |level sensor|
|DavisVantage|Davis Vantage|OK VALUE DAVIS ... |Weather Station|

## TODO:
* other sensor types
* put the sensor code in separate file
* pushing new sensor to config, then visible in admin/config page
* HMS100TF Temp below 0°C and battery low to be implemented


## Changelog:

### 1.2.4 (npm)
* (foxthefox) eslint upgrade and corrections

### 1.2.4 (npm)
* (foxthefox) IOB checker corrections


### 1.2.3 (npm)
* (foxthefox) serialport 12
* (foxthefox) translation with @iobroker/adapter-dev

### 1.2.2
* (foxthefox) more datapoints for Davis Vantage

### 1.2.1
* (foxthefox) corrections for Davis Vantage

### 1.2.0
* (foxthefox) new device Davis Vantage

### 1.1.1
* (foxthefox) state change as log.debug, not as log.info
* (foxthefox) some more info at adapter startup
* (foxthefox) moved sp.write and deleted separate function

### 1.1.0
* (foxthefox) usage of newest serialport (9.x -> 10.5)
* (foxthefox) changes in github workflow

### 1.0.3
* (atl285) correction wrong type of baudRate config, causing adapter crash

### 1.0.2
* (foxthefox) upper range temperature 50->70

### 1.0.1
* (foxthefox) round -> this round
* (foxthefox) baudrate settings in admin as number

### 1.0.0
* (foxthefox) refactoring, use of classbased style,
* (foxthefox) github actions instead of travis

### 0.1.4
* (o0shojo0o) nodejsV14 compatibility

### 0.1.3
* (atl285) added new sensor type LacCrosseDTT (double temp like TX25-IT)

### 0.1.2
* correction for weather (no data is given by value = 255)

### 0.1.1
* delete buffer function to be compatible with nodejs10
* enhanced automatic testing

### 0.1.0
* compact mode

### 0.0.7
* new level sensor (fhem)

### 0.0.6
* last version of serialport
* new sensor TXH29DTH-IT
* new weather station WS1600
* new sensor EC3000, EMT7110 not verified with life data

### 0.0.5
* adminv3 improved with values2table

### 0.0.4
* command to USB-stick for configuration
* added superjee, BMP180 sensor on jeenode
* admin v3 implementation

### 0.0.3
* abs humidity and dewpoint calculation

### 0.0.2
* definition of unique sensor ID for iobroker datapoint
* implementation of LaCrosseDTH
* definition of sensors via admin

### 0.0.1
* working with 3 sensors emon

## License

The MIT License (MIT)

Copyright (c) 2016 - 2024 foxthefox <foxthefox@wysiwis.net>
Copyright (c) 2024 foxthefox <foxthefox@wysiwis.net>
