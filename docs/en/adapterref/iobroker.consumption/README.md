![Logo](admin/consumption.png)
# ioBroker.consumption

[![NPM version](http://img.shields.io/npm/v/iobroker.consumption.svg)](https://www.npmjs.com/package/iobroker.consumption)
[![Downloads](https://img.shields.io/npm/dm/iobroker.consumption.svg)](https://www.npmjs.com/package/iobroker.consumption)
[![Dependency Status](https://img.shields.io/david/bluefox/iobroker.consumption.svg)](https://david-dm.org/bluefox/iobroker.consumption)
[![Known Vulnerabilities](https://snyk.io/test/github/bluefox/ioBroker.consumption/badge.svg)](https://snyk.io/test/github/bluefox/ioBroker.consumption)

[![NPM](https://nodei.co/npm/iobroker.consumption.png?downloads=true)](https://nodei.co/npm/iobroker.consumption/)

## Consumption adapter for ioBroker
Calculates consumption for defined sensors and resources.

You can define different resources, like water, heating, electricity and make an analysis in vis with it.

4 different analysis types are implemented:
- Plan - Actual consumption in €/$ in this year compared with planned values and compared with the previous year.
- Donut - Comparison between sensors or resources in the form of pie/donut diagram
- Stack - Monthly consumption of every sensor and resource compared with data from the previous year in the form of stack bar diagram.
- Heat map - Hourly consumption in this year for resources 
- Table - Monthly consumption of every sensor and resource compared with the previous year in the form of table  

## Requirements
Adapter requires the my-SQL or postgres SQL DB and ioBroker.sql adapter to be installed (It will be automatically installed)
It should work with SQLite too, but it is not recommended because of performance.
 
MS-SQL is not yet supported, but could be easily implemented if required. 

**Adapter is still beta.**
    
**Free edition supports only four sensors and only one station.** 
To support more sensors or stations, you need a valid license. Request it under info@iobroker.com.   

## Usage
You have resources (like water, energy, heating, gas, etc), stations (like house, dacha, village villa, etc) and sensors.

Sensor is a counter, that always increases its value like an electricity meter that is always growing.

You must spread all these sensors first into defined resources and then into stations.

**Actually is only one station being supported!**

After that, you can analyze your consumption in time and resources over years.

You can compare the actual year with the previous one and build some prognose about consumption.

Plan over all costs for the current year.
![Prognose](img/planAll.png)

Distribution of costs by resources.
![Prognose](img/pieAll.png)

Distribution of consumption by sensors of one resource.
![Prognose](img/pieHeating.png)

Distribution of consumption by sensors and months of one resource.
![Prognose](img/stackBarWater.png)

Heatmap of consumption of one resource for the current year.
![Prognose](img/heatmap.png)

Table of consumption of one resource for the current year for every month.
![Prognose](img/tableHeating.png)

### Covert function
The sensor data can be converted, but the formula must be linear.
You can write the formula in javascript, but take care that the result must be a number(float).
Examples:
- Wh => kWh: `val / 1000`
- kWh => Wh: `val * 1000`
- °F => °C: `(val - 32) / 1.8`
- °C => °F: `val * 1.8 + 32`

## Update echarts (only for the developers)
Go to https://echarts.apache.org/en/builder.html
Select:
- Chart: bar, line, pie, heat-map, 
- Coordinate Systems: grid
- Component: title, legend, tooltip, MarkPoint, MarkArea, VisualMap, Toolbox
- Others: SVG Renderer, Utilities, Code Compression

## ToDo
- Price for every sensor possible
- Change prices: 
  - remove all prices by resources, 
  - add check box by every sensor: own price
  - hide station=>resource price if every sensor has own price
  - write directly into states and do not save the price in the object  
  
- Heatmap
  - Show by year   
- Charts

- Export data as PDF
- More than one station.
- Style selects according to theme (unit, start, end)

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.0.3 (2026-10-14)
* (@GermanBluefox) Updated packages and the metadata, the adapter requires node.js >= 22 and js-controller >= 6.0.11 now

### 1.0.2 (2024-03-19)
* (bluefox) Fixed plan display

### 1.0.1 (2023-09-14)
* (bluefox) Fixed pie chart

### 0.8.0 (2023-05-12)
* (bluefox) Do not take the price of sensor if it is empty or 0
* (bluefox) Refactoring (async/await)

### 0.7.0 (2023-02-08)
* (bluefox) Added offset and factor to sensors

## License

Commercial license.

Copyright (c) 2020-2026 Bluefox <dogafox@gmail.com>, all rights reserved.

This license is a legal agreement between you and ioBroker GmbH (“ioBroker”) for the use of `ioBroker.consumption` adapter (the “Software”).
By downloading of `ioBroker.consumption` adapter you agree to be bound by the terms and conditions of this license.
ioBroker GmbH reserves the right to alter this agreement at any time, for any reason, without notice.

### Permitted Use
One license grants the right to perform one installation of the Software.
Each additional installation of the Software requires an additional purchased license.

The complete license text can be found in the [LICENSE](https://github.com/ioBroker/ioBroker.consumption/blob/master/LICENSE) file.