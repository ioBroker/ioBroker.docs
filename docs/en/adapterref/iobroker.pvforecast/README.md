---
BADGE-Number of Installations: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.pvforecast.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast.svg
chapters: {"pages":{"en/adapterref/iobroker.pvforecast/README.md":{"title":{"en":"ioBroker.pvforecast - Adapter for the forecast of PV incomes"},"content":"en/adapterref/iobroker.pvforecast/README.md"},"en/adapterref/iobroker.pvforecast/vis.md":{"title":{"en":"ioBroker.pvforecast - VIS"},"content":"en/adapterref/iobroker.pvforecast/vis.md"}}}
---
![Logo](../../admin/pvforecast.png)

# ioBroker.pvforecast - Adapter for the forecast of PV incomes

This Adapter replaced the javascript from the [ioBroker forum](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter)

The adapter take the roh data from https://api.forecast.solar and need this information

## Settings

1. longitude (-180 (west) … 180 (east))
2. latitude (-90 (south) … 90 (nord))
4. link to homepage
5. Api key
6. graph y-axis step

![pvforecast options](https://user-images.githubusercontent.com/76852173/155196821-61d26563-48cc-4ddd-a37f-417088c60951.JPG)

## With an api-key, you can receive optional the weather data with following points

higher time resolution
datetime -  date and time
sky - A numerical value between 0 and 1 percentage of clear sky [1 = clear sky].
temperature [°C]
condition - text
icon - text + number
wind_speed -  [km/h]
wind_degrees - north at 0°[clockwise]. (windSpeed is zero, value will not be defined)
wind_direction - Short name 

## For the equipment you can make the following settings

1. tilt (0°-90°)
2. azimuth (-180 = north, -90 = east, 0 = south, 90 = west, 180 = north)
3. plant power (kWh)
4. plant name
5. graph legend name
9. graph color
10. graph label color 

![pvforecast pvsystem](https://user-images.githubusercontent.com/76852173/155196852-62b928ca-4c8b-407e-8947-a45c7b31972a.JPG)

All this information is needed, that the adapter runs perfect.

If longitude and latitude in the iobroker main settings, the adapter will fill out the fields automatic.

# VIS example

Please install: [Material Design](https://github.com/Scrounger/ioBroker.vis-materialdesign) before you use the example.
If you want to take the json graph and table you can use this [example](./vis.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Apollon77) Added Sentry for crash reporting
* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 2.4.0 (2022-12-09)
* (stromdao) Added SolarPredictionAPI

### 2.3.0 (2022-06-26)
* (klein0r) Add summary values to InfluxDB
* (klein0r) Use cron to ensure update on day change
* (klein0r) Removed visibility from weather data (doesn't exist in response)

### 2.2.1 (2022-06-23)
* (klein0r) Fixed tilt validation - allow zero tilt (0)

### 2.2.0 (2022-06-09)
* (klein0r) Added raw JSON data states for own graphs
* (klein0r) Improved debug log
* (klein0r) Updated azimuth image for dark theme

### 2.1.5 (2022-06-03)
* (klein0r) Added installed peak power as state
* (klein0r) Fixed time shift when using solcast

## License
MIT License

Copyright (c) 2021-2023 Patrick-Walther
                   Matthias Kleine <info@haus-automatisierung.com>

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