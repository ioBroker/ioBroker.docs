![Logo](admin/absolutehumidity.svg)
# ioBroker.absolutehumidity

[![NPM version](https://img.shields.io/npm/v/iobroker.absolutehumidity.svg)](https://www.npmjs.com/package/iobroker.absolutehumidity)
[![Downloads](https://img.shields.io/npm/dm/iobroker.absolutehumidity.svg)](https://www.npmjs.com/package/iobroker.absolutehumidity)
![Number of Installations](https://ioBroker.live/badges/absolutehumidity-installed.svg)
![Current version in stable repository](https://ioBroker.live/badges/absolutehumidity-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.absolutehumidity.png?downloads=true)](https://nodei.co/npm/iobroker.absolutehumidity/)

**Tests:** ![Test and Release](https://github.com/BenAhrdt/ioBroker.absolutehumidity/workflows/Test%20and%20Release/badge.svg)

## absolutehumidity adapter for ioBroker

build absolute humidity from actual temperature and relative humidity

## Calculation method

The adapter uses empirical Magnus approximation formulas to calculate the
saturation vapor pressure from temperature and relative humidity.

* Absolute humidity is calculated from the saturation vapor pressure using the
  Magnus/Bolton approximation and the ideal gas law. The result is returned in
  g/m³.
* Dew point temperature is calculated using the Magnus formula with Sonntag
  coefficients. The result is returned in °C.

Small deviations from online tables are expected because different tables often
use different Magnus, Tetens, Sonntag, Bolton or Buck coefficient sets.

<img width="927" height="590" alt="image" src="https://github.com/user-attachments/assets/15aad0cf-144b-4ccb-8d38-c8d7710aab48" />

The instance page is interactive, allowing for the calculation of absolute humidity, dew point temperature, and ventilation recommendations based on data recorded via analog or manual methods. Simply enter the values, and the result will be displayed automatically.

## Installation
As long as the adapter is not yet listed in the stable repository, it can be installed manually from NPM. Note: NEVER install it from GitHub.

Installation Link:
[https://github.com/BenAhrdt/ioBroker.absolutehumidity](https://github.com/BenAhrdt/ioBroker.absolutehumidity)

<img width="955" height="703" alt="image" src="https://github.com/user-attachments/assets/d7c43f37-30be-4a16-99f0-6e7e34164478" />

## Create a tab in the tab bar 

Use the pin to create a tab in the tab bar. Use "+ Add device" to add a device.

<img width="747" height="621" alt="image" src="https://github.com/user-attachments/assets/ec36adbc-4e2b-4a26-85f1-34413f02d5b9" />

## Add a Device
To add a device, you must assign a name and select the two states for temperature and relative humidity. 
Optionally, you can specify whether these two values ​​should also be included (again) in the adapter's objects.

<img width="795" height="437" alt="image" src="https://github.com/user-attachments/assets/4160b3ec-3e49-4a5a-81ae-a826de288698" />

## Tile view
The tiles for outdoor use are displayed in green, and those for indoor use in blue.
In the tile view, the tiles are sorted in ascending order, that is, from dry to more humid. 
(If the green tile appears first, ventilating the room might be advisable)

<img width="1147" height="428" alt="image" src="https://github.com/user-attachments/assets/b08264af-3350-4ffb-85ed-3ce7d15e2f5a" />

## Object view

<img width="935" height="386" alt="image" src="https://github.com/user-attachments/assets/de0d67d2-4935-428b-a3c8-199c9b1bdcce" />

## Iobroker Forum Link

[https://forum.iobroker.net/topic/85455/test-adapter-absolut-humidity](https://forum.iobroker.net/topic/85455/test-adapter-absolut-humidity)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.6 (2026-09-28)
* Rename the visible Device Manager references to Config Manager in the adapter configuration and translations.
* Add delayed device configuration backups with manual restore and startup recovery when no device configuration exists.

### 0.1.5 (2026-09-27)
* Update the repository-check dependencies and test the adapter on Node.js 26.

### 0.1.4 (2026-09-21)
* Keep long Device Manager measurements readable with a smaller value font and at most two decimal places.

### 0.1.3 (2026-09-21)
* Restore the regular adapter configuration page with interactive outdoor and indoor preview cards, and provide a link to the Device Manager in Config Manager.

### 0.1.2 (2026-09-20)
* Keep the Device Manager in the adapter configuration instead of a separate Admin tab. Render the four live measurements through one shared HTML row template per card; Admin's read-only numeric state control otherwise adds a progress indicator for percent and bounded states.

## Collaboration
The adapter was developed in collaboration with Joerg Froehner

## License
MIT License

Copyright (c) 2026 BenAhrdt <github@ben-schmidt.net>

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