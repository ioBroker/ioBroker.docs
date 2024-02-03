![Logo](admin/zendure-solarflow.png)

# ioBroker.zendure-solarflow

[![NPM version](https://img.shields.io/npm/v/iobroker.zendure-solarflow.svg)](https://www.npmjs.com/package/iobroker.zendure-solarflow)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zendure-solarflow.svg)](https://www.npmjs.com/package/iobroker.zendure-solarflow)
![Number of Installations](https://iobroker.live/badges/zendure-solarflow-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/zendure-solarflow-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.zendure-solarflow.png?downloads=true)](https://nodei.co/npm/iobroker.zendure-solarflow/)

**Tests:** ![Test and Release](https://github.com/nograx/ioBroker.zendure-solarflow/workflows/Test%20and%20Release/badge.svg)

## Zendure Solarflow adapter for ioBroker

This project is an ioBroker Adapter to read data from the Zendure Solarflow Cloud API. It uses the official API provided by Zendure.
You can read more about the API here: https://github.com/Zendure/developer-device-data-report

Notes:
1. You have to use the global Zendure Server!

2. It is possible to control the Output limit with the state created in the productId/deviceKey/control subfolder. Please deactivate/uncheck all modes in the Zendure App, otherwise it is not possible to set the output limit!

    ![Solarflow Setings Window](https://raw.github.com/nograx/ioBroker.zendure-solarflow/master/Screenshots/ZendureSolarflowSettings.png)

3. You will be logged out of the official iOS or Android App after logging in with the ioBroker adapter. This is a normal behavior. As a workaround you can create an second Zendure account with another e-mail and grant access to your Solarflow HUB to this account. Then use the second account for ioBroker / the Zendure Solarflow adapter.

## Credits

Credits goes to https://github.com/reinhard-brandstaedter/solarflow which helped a lot with the knowledge about the MQTT server from Zendure! Thanks!

## Donate

If you find the adapter useful for you and want to support my work, feel free to donate by Paypal. Thank You!
(this is an personal Donate link for Nograx, in no relation to the ioBroker Project!)<br />

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/paypalme/PeterFrommert)

## Changelog
### 1.0.7 (2024-01-16)
- Add control for charge and discharge limit
- Update Readme Screenshot

### 1.0.6 (2024-01-16)
- Update Readme

### 1.0.5 (2024-01-15)
- Added state for both Solarflow PV inputs

### 1.0.4 (2023-12-16)

- Added Timeout for axios

### 1.0.3 (2023-12-12)

- Password is now encrypted. NOTE: You have to re-enter the password after adapter update!

### 1.0.2 (2023-12-12)

- Adapter improvements suggested by iobroker team
- Fixed battery pack temperature (data is in kelvin, so now converting to celcius)

### 1.0.1 (2023-11-03)

- Fix translations
- Use 'extendObjectAsync' instead of 'setObjectNotExistsAsync'
- First official release version

### 0.1.0-alpha.2 (2023-10-27)

- Don't stop the adapter when no login information is provided!

### 0.1.0-alpha.1 (2023-10-27)

- Fix Typescript typos

### 0.1.0-alpha.0 (2023-10-26)

- Get battery information
- Reset states if no new data comes in (e.g. when Hub goes offline). Currently the last value still persist when Hub goes offline, so you may have 'pseudo' data in your states.

### 0.0.2 (2023-10-25)

- Initital Release, retrieving Hub data, telemetry and setting the output limit works!

### 0.0.1 (2023-10-24)

- First test

## License

MIT License

Copyright (c) 2024 Peter Frommert

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
