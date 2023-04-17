![Logo](admin/pvoutputorg.png)
# ioBroker.pvoutputorg

![Number of Installations](http://iobroker.live/badges/pvoutputorg-installed.svg) ![Number of Installations](http://iobroker.live/badges/pvoutputorg-stable.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pvoutputorg.svg)](https://www.npmjs.com/package/iobroker.pvoutputorg)
[![NPM version](http://img.shields.io/npm/v/iobroker.pvoutputorg.svg)](https://www.npmjs.com/package/iobroker.pvoutputorg)

[![Known Vulnerabilities](https://snyk.io/test/github/rg-engineering/ioBroker.pvoutputorg/badge.svg)](https://snyk.io/test/github/rg-engineering/ioBroker.pvoutputorg)
![GitHub Actions](https://github.com/rg-engineering/ioBroker.pvoutputorg/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.pvoutputorg.png?downloads=true)](https://nodei.co/npm/iobroker.pvoutputorg/)


**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** 
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.


**If you like it, please consider a donation:**
                                                                          
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YBAZTEBT9SYC2&source=url) 

The adapter connects to [PvOutput.org](https://pvoutput.org). System-ID and API-key is used to establish the connection. Both needs to be configured on admin page.
The system, status and statistical data for all configured systems are currently being read and displayed in data points.
The generated energy can be uploaded to PvOutput.org permanantly.

For detailed information please have a look on [pvoutput.org help](https://pvoutput.org/help/overview.html)

If you support pvoutput.org with a donation, additional features will be made available to you. At the moment these are not supported here in the adapter yet.

# Download

The adapter downloads three types of data
* System data
* Status data
* Statistic Data

To download data the adapter runs an adjustable cron job. The download frequency can be adjusted on admin page with "interval to read data [min]".
Typically value for download frequency is 15 minutes, but no longer then 59 minutes.

## System Data
The adapter retrieves system status information and live output data.

more on [API documentation](https://pvoutput.org/help/api_specification.html#id25)

## Status Data
Status data (or live data) includes all possible system data available for your system.

more on [API documentation](https://pvoutput.org/help/api_specification.html#id16)

## Statistic Data
The adapter retrieves system statisticial information.

more on [API documentation](https://pvoutput.org/help/api_specification.html#id21)

# Upload
Data upload is only an option. If you upload data with other application like sbfspot then disable upload here in the adapter.

## Upload Live Data

To upload live data / status data the adapter runs an adjustable cron job. The upload frequency can be adjusted on admin page with "interval to write data [min]".
Typically value for upload frequency is 5 to 15 minutes, but no longer then 59 minutes.

The adapter provides a lot of datapoints in "upload" folder for every system. Only power or energy datapoint must be used. All others are optionally. 

more on [API documentation](https://pvoutput.org/help/api_specification.html#add-status-service)

### Power and Energy Calculation
Power and energy values can be derived from one another. When a system sends only power values the corresponding energy values are automatically calculated.
Similarly when only energy values are sent, PVOutput will calculate the average power.

more on [API documentation](https://pvoutput.org/help/api_specification.html#power-and-energy-calculation)

### Cumulative Energy - CumulativeFlag in system configuration
The following values are valid for the Cumulative Flag.
1 = Energy Generation and Energy Consumption values are lifetime energy values. Consumption and generation energy is reset to 0 at the start of the day.
2 - Only Energy Generation generation is a lifetime energy value.
3 - Only Energy Consumption consumption is a lifetime energy value.

Default: 1 

more on [API documentation](https://pvoutput.org/help/api_specification.html#cumulative-energy)

### Net Data - NetDataFlag in system configuration
The parameter when set to 1 will indicate that the power values passed are net export/import rather than gross generation/consumption. 
This option is used for devices that are unable to report gross consumption data. The provided import/export data is merged with existing 
generation data to derive consumption.

Default : unchecked

more on [API documentation](https://pvoutput.org/help/api_specification.html#net-data)

## Upload End Of Day Data

At the end of the day a separate upload command will be executed. A lot of different data can be uploaded. These data are available as a Datapoint in upload-folder ofer every system. All of them are optionally.

more on [API documentation](https://pvoutput.org/help/api_specification.html#add-output-service)

## known issues
* please create issues at [github](https://github.com/rg-engineering/ioBroker.pvoutputorg/issues) if you find bugs or whish new features
   
## Changelog

### 1.8.8 (2023-04-07)
* (René) dependencies updates

### 1.8.7 (2023-01-31)
* (René) dependencies updates

### 1.8.6 (2022-11-29)
* (René) see issue #4 : bug fix negative temperatures

### 1.8.5 (2022-10-01)
* (René) bug fix wrong date

### 1.8.4 (2022-08-21)
* (René) bug fix WeatherConditions
* (René) bug fix EoD upload

### 1.8.0 (2022-08-20)
* (René) WeatherConditions can be used directly from DasWetter adapter 

### 1.7.0 (2022-07-17)
* (René) WeatherConditions for upload end of the day (EoD) data added
* (René) write-Interval selectable out of 5, 10 or 15 minutes according PVOutput.org-specification

### 1.6.1 (2022-07-06)
* (René) bug fix date string in write status and end of day data

### 1.6.0 (2022-07-01)
* (René) change back from cron to interval
* (René) end of day data are written 1 hour after sunset
* (René) read and write data only when daylight as an option 

### 1.5.0 (2022-04-21)
* (René) datapoint added to show when data uploaded to pvoutput.org

### 1.4.0 (2022-06-01)
* (René) changed to post requests

### 1.3.0 (2022-05-26)
* (René) Upload live data and end-of-day
* (René) better error handling when receiving errors from server
* (René) CumulativeFlag and NetDataFlag added for upload service

### 1.2.0 (2022-05-21)
* (René) IsActive per system added

### 1.1.0 (2022-05-20)
* (René) write data to PvOutput.org added
* (René) change to cron

### 1.0.0 (2022-04-29)
* (René) first official release

### 0.0.1 (2022-04-24)
* (René) initial release

## License
MIT License

Copyright (c) 2022-2023 rg-engineering info@rg-engineering.eu

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