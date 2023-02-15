---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.statistics?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.statistics?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.statistics?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.statistics?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.statistics?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.statistics?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.statistics?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/workflow/status/iobroker-community-adapters/iobroker.statistics/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/iobroker-community-adapters/iobroker.statistics?label=repo%20vulnerabilities&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.statistics.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/statistics-stable.svg
BADGE-Installed: http://iobroker.live/badges/statistics-installed.svg
---
![Logo](../../admin/statistics.png)

# ioBroker.statistics

Der Adapter speichert für jedes aktive Objekt die Werte temporär in ``statistics.x.temp`` für die fortlaufende Bewertung.

Zu vorgegebenen Zeiten (Tag, Woche, Monat, Quartal, Jahr) erfolgt die Übernahme der temporären Werte in die Struktur ``statistics.x.save``.

Für bestimmte Werte sind auch 5min Zwischenwerte ermittelt, wie es z.B. bei den 433MHz Steckdosen von ELV der Fall ist, die einen Verbrauchswert alle 5min übermitteln.

## Impulse

Stellt das binäre Objekt eine Impulsfolge dar, die z.B. aus Zählerimpulsen entsteht, so ist hier das Prinzip dargestellt:

![impulse](img/count.png)

Der Adapter zählt die Impulse und es wird mit einer Zählerkonstanten multipliziert.
So ergibt sich aus den 0/1 Wechseln eine analoge Größe, die auch dann im Adapter sofort weiter benutzt werden kann (z.B. für Summendelta)
Die sich ergebende Analoggröße ist eine stetig steigende.

## Binärzustände

Stellt das binäre Objekt Schalzustände dar, so kann daraus die Zeit für den Zustand mit logisch 1 und die Zeit mit logisch 0 ermittelt werden.
Diese Betriebszeitzählung sollte nicht auf Impulse aus Zählern angewendet werden.

![binary](img/timeCount.png)

## Analogwerte

Grundsätzlich wir das Minimum Maximum und der Durchschnitt ermittelt.
Der Durchschnitt ist der arithmetische Mittelwert.

Für einen fortlaufenden Verbrauchswert wie er bei der Energiezählung entsteht kann man eine Delta ermitteln um die Verbräuche je Zeiteinheit darzustellen. 
Dies kann auch auf Verbräuche angewendet werden, die aus Impulszählung entstehen.

![impulse](img/sumDelta.png)

## Optionen

| Attribute         | Type    | State-Type |
|-------------------|---------|------------|
| enabled           | boolean | -          |
| count             | boolean | boolean    |
| fiveMin           | boolean | boolean    |
| sumCount          | boolean | boolean    |
| impUnitPerImpulse | number  | boolean    |
| impUnit           | string  | boolean    |
| timeCount         | boolean | boolean    |
| avg               | boolean | number     |
| minmax            | boolean | number     |
| sumDelta          | boolean | number     |
| sumIgnoreMinus    | boolean | number     |
| groupFactor       | number  | boolean    |
| logName           | string  | -          |
| sumGroup          | string  | -          |

```json
"custom": {
    "statistics.0": {
        "enabled": true,
        "count": false,
        "fiveMin": false,
        "sumCount": false,
        "impUnitPerImpulse": 1,
        "impUnit": "",
        "timeCount": false,
        "avg": true,
        "minmax": true,
        "sumDelta": true,
        "sumIgnoreMinus": true,
        "groupFactor": 2,
        "logName": "mynumber",
        "sumGroup": "energy"
    }
}
```

## sendTo

```javascript
sendTo('statistics.0', 'enableStatistics', {
    id: '0_userdata.0.manual'
}, (data) => {
    if (data.success) {
        console.log(`Added statistics`);
    } else {
        console.error(data.err);
    }
});
```

```javascript
sendTo('statistics.0', 'enableStatistics', {
    id: '0_userdata.0.mynumber',
    options: {
        avg: true,
        minmax: true,
        sumDelta: true,
        sumIgnoreMinus: true
    }
}, (data) => {
    if (data.success) {
        console.log(`Added statistics`);
    } else {
        console.error(data.err);
    }
});
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 2.3.1 (2023-01-11)
* (klein0r) Added Ukrainian language

### 2.3.0 (2022-11-03)
NodeJS 14.5.0 is required

* (klein0r) Added hourly, weekly, monthly, ... averages
* (klein0r) Added promises to avoid parallel execution of tasks (lead to incorrect calculations)
* (klein0r) Fixed init values for save/temp
* (klein0r) Added option to enable statistics for objects via sendTo
* (klein0r) Allow sum delta to substract values (negative delta)
* (klein0r) Delete states when option in unchecked
* (klein0r) Removed dayMin and dayMax from avg (use minmax for that case!)
* (klein0r) Fix: Calculation of avg when no change of value

### 2.2.0 (2022-07-07)
* (klein0r) Added absolute min and max values

### 2.1.1 (2022-06-16)
* (klein0r) Fixed usage of default values for groups

### 2.1.0 (2022-06-16)
* (klein0r) Added support for translated object names
* (klein0r) Fixed sum calculation
* (klein0r) Increased precision to 5 digits
* (klein0r) Translated all objects

## License

The MIT License (MIT)

Copyright (c) 2018-2023 foxthefox <foxthefox@wysiwis.net>,
                        bluefox <dogafox@gmail.com> and
                        Matthias Kleine <info@haus-automatisierung.com>

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