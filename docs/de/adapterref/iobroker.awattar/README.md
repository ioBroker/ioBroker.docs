---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.awattar/README.md
title: ioBroker.awattar
hash: 6X5dejZNzwFKbpi9448XLQRo27Yytc3pwvvpRiz7wMg=
---
![Logo](../../../en/adapterref/iobroker.awattar/admin/awattar.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.awattar.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.awattar.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/awattar-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/awattar-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/sirjojo69/iobroker.awattar.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/sirjojo69/ioBroker.awattar/badge.svg)
![NPM](https://nodei.co/npm/iobroker.awattar.png?downloads=true)
![Test und Freigabe](https://github.com/sirjojo69/ioBroker.awattar/workflows/Test%20and%20Release/badge.svg)

# ioBroker.awattar

<p>
<a href="https://www.awattar.de/" target="_blank">
<img border="0" alt="aWATTar" src="admin/awattarBig.png">
</a>
</p>

## aWATTar-Adapter für ioBroker

Dieser Adapter liest die stündlichen Preise des Stromanbieters für den kommenden Tag aus.<a href="https://www.awattar.de/" target="_blank"> aWATTar</a> für die stündlichen und stündlichen CAP-Tarife. Mit diesen Informationen können Sie steuern, wann beispielsweise Ihr Elektroauto oder Ihr Heimspeicher geladen werden soll (nämlich zum günstigsten Zeitpunkt). Da dieser Anbieter seine Dienste nur in Österreich und Deutschland anbietet, beachten Sie bitte, dass einige Feldbezeichnungen in der Benutzeroberfläche auf Deutsch sind.

In den Adaptereinstellungen finden Sie 7 Felder (jeweils mit Standardwerten vorausgefüllt):

<li>The variable "URL for aWATTar API" contains the URL for aWATTar's API price data feed.</li>
<li>If you want to know the cheapest hours during the night (e.g. for charging your EV), use the following two parameters.
<ul>The variable "Start Threshold Loading (e.g. for EV)" contains a time that marks the start of a period for which you want to get the cheapest hours in sorted order.</ul>
<ul>The variable "End Threshold Loading" contains a time that marks the end of a period for which you want to get the cheapest hours in sorted order.</ul>
</li>
<li>The variable "actual VAT rate (percent)" must contain the currently valid VAT rate (decimals are possible, e.g. 19 or 19,5). The prices delivered by the API do not include VAT.</li>
<li>The variable "Surcharge on the absolute market price (percent)" is optional. Some suppliers add a percentage of the market price, e.g. aWATTar a 3 % procurement component (enter 3). The surcharge is based on the absolute value, so negative prices also get a positive surcharge. Enter 0 if your contract has no such component.</li>
<li>The variable "Fixed surcharge per kWh (cent, before VAT)" is optional. A fixed amount in cent per kWh that is added to the net price before VAT is applied. Enter 0 if your contract has no such component.</li>
<li>The variable "Arbeitspreis ('Netznutzung' + 'Umlagen, Abgaben, Steuern' + 'Kosten für Ökostromzertifikate, Abrechnung und Vertrieb', incl. VAT)" lets you enter your personal energy rate (depends on your postal code / grid operator).</li>
<br>
<b>How the prices are calculated</b> (market price = value delivered by the API, converted to cent/kWh):
<pre>
nettoPriceKwh     = market price
nettoFullPriceKwh = nettoPriceKwh + |nettoPriceKwh| * (percent surcharge / 100) + fixed surcharge
bruttoPriceKwh    = nettoFullPriceKwh * (1 + VAT / 100)
totalPriceKwh     = bruttoPriceKwh + Arbeitspreis
</pre>
With both surcharges set to 0, <code>nettoFullPriceKwh</code> equals <code>nettoPriceKwh</code> and the results are the same as in versions before 1.6.0.
The folder "pricesOrdered" and "pricesOrderedTomorrow" contain the plain market price only (<code>priceKwh</code>), without surcharges, VAT and Arbeitspreis.
<br><br>
The results are then available in the adapter's object tree (awattar.0).
The folder "prices" contains one entry per hour of the day with the electricity price for that hour (net, net including surcharges, gross and total price).
The folder "pricesOrdered" contains -sorted by hourly price- one entry for each hour of the period configured in the settings, with the electricity price for that hour.
The folder "pricesOrderedTomorrow" contains -sorted by hourly price- one entry for each hour of tomorrow (the whole day, independent of the configured period), e.g. to plan the discharge of a home storage in the most expensive hours. It is filled as soon as tomorrow's prices are available (see below); until then it is empty.
<br><br>
By default the adapter is configured to fetch the values for the next 24 hours at 15:00.
This schedule can of course be adjusted.
According to the <a href="https://www.awattar.de/services/api" target="_blank">aWATTar API documentation</a>, these values are available every day starting at 14:00.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.6.0
* New: optional settings "surcharge on the absolute market price (percent)" and "fixed surcharge per kWh (cent)" for suppliers like aWATTar (3 % procurement component since 09/2022, see #20); both default to 0. New data point `nettoFullPriceKwh`; `bruttoPriceKwh` and `totalPriceKwh` are based on it. Formula: `net full = net + |net| * percent/100 + fixed`, `gross = net full * (1 + VAT/100)`, `total = gross + energy rate`
* Changed: the VAT rate now accepts decimals and a comma as decimal separator

### 1.5.0
* New: the folder `pricesOrderedTomorrow` contains all hours of tomorrow sorted by price (independent of the configured period, 23-25 entries depending on daylight saving time); outdated entries are removed on every run
* Fixed: the last hour of the configured period was missing in `pricesOrdered` (the hour ending exactly at the configured end time was left out, e.g. 05:00-06:00 for an end time of 06:00); it is now included. Periods now contain one more hour than before
* (repository maintenance) Pinned `@types/node` to 22.x

### 1.4.0
* Migrated the Admin UI from the legacy Materialize HTML page to jsonConfig (same fields, existing settings are kept unchanged)
* Fixed: a decimal comma in the work rate (e.g. `20,08`) was cut off at the comma, so only the integer part (`20`) was added to the total price; both `20,08` and `20.08` are now handled
* (repository maintenance) Added the jsonConfig schema reference to `.vscode/settings.json`; bumped `@iobroker/testing` to 6.3.0

### 1.3.0
* Dropped Node.js 20 support (reached end of life on 2026-04-30); Node.js 22 is now the minimum required version
* (repository maintenance) Pinned chai/chai-as-promised/sinon-chai below their new ESM-only major versions in Dependabot config, since the test suite is CommonJS

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