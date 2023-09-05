![Logo](admin/wolf.png)
# ioBroker.wolf

![Number of Installations](http://iobroker.live/badges/wolf-installed.svg)
![Number of Installations](http://iobroker.live/badges/wolf-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.wolf.svg)](https://www.npmjs.com/package/iobroker.wolf)

![Test and Release](https://github.com/ioBroker/ioBroker.wolf/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/wolf/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wolf.svg)](https://www.npmjs.com/package/iobroker.wolf)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Connect to WOLF devices.
Read in [english](docs/en/README.md).

Lese auf [deutsch](docs/de/README.md).

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 1.7.0 (2023-01-26)
* (fred0815) added missing ISM8i states
* (fred0815) optimized channel object naming
* (fred0815) fixed configuration of polling interval
* (Apollon77) Adjust some temperature states to allow to go negative

### 1.6.1 (2023-01-16)
* (Apollon77) Fixed some crash cases with unknown datapoints

### 1.6.0 (2022-12-30)
* (Apollon77) Add DPT10 Encoding (TimeofDay) - but ignores weekday!
* (Apollon77) Adjust some temperature states to allow to go negative
* (Apollon77) Add additional polling of all values to ensure that all values are updated
* (Apollon77) Fix configuration issue with Mixing modules

### 1.5.0 (2022-05-30)
* (Apollon77) make sure datapoints are created correctly and resolve name-mixup since 1.2.0 (all states now be names with _t!)
* (Apollon77) Drop support for Admin <3.0.0
* (Apollon77) Fix crash cases reported by Sentry

### 1.4.0 (2022-04-26)
* IMPORTANT: Requires now at least js-controller 2.0
* (Apollon77) Optimize Configuration UI to prevent people from selecting bind interfaces that do not allow external connections!
* (Apollon77) Correctly create all objects when "Status as bool" is used
* (Apollon77) Adjust some min/max values
* (Apollon77/Dark-Tower-Coder) Fix parsing of DP 149
* (Apollon77/Dark-Tower-Coder) Add encoding of DPT_Date type
* (Dark-Tower-Coder) return value for DPT_Switch corrected from '0ff' to 'Off'
* (Apollon77) Add sentry for crash reporting

### 1.3.4 (2021-11-14)
* (eifel-tech) Min value of outside temperature corrected

### 1.3.2 (2021-08-31)
* (eifel-tech/tobias) Corrected error: DP 149 with correct Type (Issue #30)
* (eifel-tech/tobias) Changes for js-controller 3.3

### 1.2.1 [2020.06.20]
* (schweigel) Corrected error: DPT_Switch in boolean mode didn't work correct

### 1.2.0 [2020.03.20]
* (LHBL2003) Added for all variables "write" as Bool value
* (bluefox) Admin3 compatibility

### 1.1.1 [2019.12.02]
* (schweigel) Fixed: DPT_Date is wrong
* (schweigel) Fixed: CWL - DPT_TimeOfDay - error

### 1.1.0 [2019.09.13]
* (RustyThePropellerHead) ISM8i Firmware v1.50 Update to be able to use the new DataPoints (FW Released in 2016)
                          * As a side note the GLT °C boiler set point is defined and read as a 1 °C resolution, but you can send the boiler set point commands with 0.1 °C resolution
* (RustyThePropellerHead) DHW minimum value reduced from 20 °C to 0 °C to allow for deactivation                          
* (RustyThePropellerHead) Reorganisation of the hg0 to have its own area on the adapter configuration webpage.
* (RustyThePropellerHead) Scaling DPT_FlowRate_m3/h corrected
* (RustyThePropellerHead) Lookup "Programmwahl CWL" corrected

### 1.0.0 [2017.11.21]
* (bluefox) resize logo

### 0.9.1 [2016.12.19]
* (smiling_Jack) Add Bool option
* (smiling_Jack) Add Bar option
* (smiling_Jack) Bugfix Type 5.001 Scaling

### 0.1.0 [2015.12.01]
* (smiling_Jack) Add writing to ism8

### 0.0.9 [2015.11.06]
* (smiling_Jack) Bugfix
* (smiling_Jack) Add test output

### 0.0.8 [2015.11.02]
* (smiling_Jack) Bugfix io-package

### 0.0.7 [2015.11.02]
* (smiling_Jack) new object management
* (smiling_Jack) Bugfixes

### 0.0.6 [2015.10.20]
* (smiling_Jack) Bugfix parsing

### 0.0.5 [2015.10.16]
* (smiling_Jack) Add support for multiple data
* (smiling_Jack) Add debug output 
* (smiling_Jack) Bugfixes

### 0.0.4 [2015.10.15]
* (smiling_Jack) Bugfix on parse error
* (smiling_Jack) Add DPT_HVACContrMode
* (smiling_Jack) Add DPT_HVACMode

### 0.0.3 [2015.10.14]
* (smiling_Jack) add CWL
* (smiling_Jack) remove ISM8 ip

### 0.0.2 [2015.10.12]
* (smiling_Jack) add BWL-1-S
* (smiling_Jack) update readme

### 0.0.1 [2015.10.08]
* (smiling_Jack) first release

## License

The MIT License (MIT)

Copyright (c) 2015-2023 smiling_Jack, ioBroker-Community

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
