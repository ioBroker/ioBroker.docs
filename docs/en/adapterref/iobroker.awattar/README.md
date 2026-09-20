![Logo](admin/awattar.png)
# ioBroker.awattar

[![NPM version](http://img.shields.io/npm/v/iobroker.awattar.svg)](https://www.npmjs.com/package/iobroker.awattar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.awattar.svg)](https://www.npmjs.com/package/iobroker.awattar)
![Number of Installations (latest)](http://iobroker.live/badges/awattar-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/awattar-stable.svg)
[![Dependency Status](https://img.shields.io/david/sirjojo69/iobroker.awattar.svg)](https://david-dm.org/sirjojo69/iobroker.awattar)
[![Known Vulnerabilities](https://snyk.io/test/github/sirjojo69/ioBroker.awattar/badge.svg)](https://snyk.io/test/github/sirjojo69/ioBroker.awattar)

[![NPM](https://nodei.co/npm/iobroker.awattar.png?downloads=true)](https://nodei.co/npm/iobroker.awattar/)

**Tests:** ![Test and Release](https://github.com/sirjojo69/ioBroker.awattar/workflows/Test%20and%20Release/badge.svg)

<p>
<a href="https://www.awattar.de/" target="_blank">
<img border="0" alt="aWATTar" src="admin/awattarBig.png">
</a>
</p>

## aWATTar adapter for ioBroker

This adapter reads the hourly prices for the coming day of the electricity provider <a href="https://www.awattar.de/" target="_blank"> aWATTar </a>
for the hourly and hourly CAP tariffs.
With this information you can then control when e.g. your electric car or the home storage should be charged (namely at the cheapest time).
Since this provider offers its services only in Austria and Germany, note that some field labels in the admin UI are in German.

In the adapter settings you will find 5 fields (each pre-filled with default values):
<li>The variable "URL for aWATTar API" contains the URL for aWATTar's API price data feed.</li>
<li>If you want to know the cheapest hours during the night (e.g. for charging your EV), use the following two parameters.
<ul>The variable "Start Threshold Loading (e.g. for EV)" contains a time that marks the start of a period for which you want to get the cheapest hours in sorted order.</ul>
<ul>The variable "End Threshold Loading" contains a time that marks the end of a period for which you want to get the cheapest hours in sorted order.</ul>
</li>
<li>The variable "actual VAT rate (percent)" must contain the currently valid VAT rate. The prices delivered by the API do not include VAT.</li>
<li>The variable "Arbeitspreis ('Netznutzung' + 'Umlagen, Abgaben, Steuern' + 'Kosten für Ökostromzertifikate, Abrechnung und Vertrieb', incl. VAT)" lets you enter your personal energy rate (depends on your postal code / grid operator).</li>
<br>
The results are then available in the adapter's object tree (awattar.0).
The folder "prices" contains one entry per hour of the day with the electricity price for that hour.
The folder "prices_ordered" contains -sorted by hourly price- one entry for each hour of the period configured in the settings, with the electricity price for that hour.
<br><br>
By default the adapter is configured to fetch the values for the next 24 hours at 15:00.
This schedule can of course be adjusted.
According to the <a href="https://www.awattar.de/services/api" target="_blank">aWATTar API documentation</a>, these values are available every day starting at 14:00.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.2.0
* (repository maintenance) Fixed: admin/i18n translations were excluded from the npm package (missing languages in Admin UI for installed users)
* (repository maintenance) Fixed: Admin UI translations (words.js) never matched the actual field labels; corrected and completed for all supported languages
* (repository maintenance) Fixed: replaced plain setTimeout() with adapter.setTimeout()/clearTimeout() so the shutdown timer is properly cleaned up
* (repository maintenance) Updated dependencies (@iobroker/adapter-core, @iobroker/adapter-dev, @iobroker/testing, @alcalzone/release-script)
* (repository maintenance) Migrated ESLint to @iobroker/eslint-config (flat config) and reformatted the codebase accordingly
* (repository maintenance) Raised minimum Node.js version to >=20, added Node.js 22/24/26 to the test matrix
* (repository maintenance) Updated js-controller/admin dependency requirements, fixed io-package.json schema issues (removed unknown/deprecated properties, invalid news entry)
* (repository maintenance) Migrated NPM publishing to Trusted Publishing (OIDC)
* (repository maintenance) Migrated admin/i18n to short format ({lang}.json)
* (repository maintenance) Removed obsolete gulpfile.js and .travis.yml, added Dependabot configuration and auto-merge workflow
* (repository maintenance) Translated README.md to English, fixed LICENSE copyright year

### 1.1.0
* (Apollon77) Updates to testing from ioBroker Core team to make testing compatible with js-controller 4.0
* (SirJojo69) changed copyright
* (SirJojo69) updated js-controller dependency to 5.0.19
* (SirJojo69) fixed stat and end date format to DD.MM.YYYY
* (SirJojo69) adapter runs once at start
* (mcm1957) Updates to testing

### 1.0.6
* (SirJojo69) new version for official repo

### 1.0.5
* (SirJojo69) Added total price and gross price, API call with start and end parameters. Some internal fixes.

### 1.0.3
* (SirJojo69) Changed some settings.

### 1.0.1
* (SirJojo69) deleted admin tab.

### 1.0.0
* (SirJojo69) first stable release.

### 0.0.1
* (SirJojo69) initial release.

## License
MIT License
Copyright (c) 2026 sirjojo69 <gtj.howe@gmx.de>

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