---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gigaset-elements/README.md
title: ioBroker.gigaset-elements
hash: 1oyVwCTbRtET9A4NHBQpmOTqee1TGRRmfusOyCqqJ6Y=
---
![Logo](../../../en/adapterref/iobroker.gigaset-elements/admin/gigaset-elements.png)

![Knoten](https://img.shields.io/node/v-lts/iobroker.gigaset-elements)
![NPM-Version](https://img.shields.io/npm/v/iobroker.gigaset-elements.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.gigaset-elements.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.gigaset-elements)
![Anzahl der Installationen](https://iobroker.live/badges/gigaset-elements-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/gigaset-elements-stable.svg)
![NPM](https://nodei.co/npm/iobroker.gigaset-elements.png?downloads=true)

# IoBroker.gigaset-elements
Adapter für Gigaset Elements (https://gigaset.com/smart-home)

![Test und Freigabe](https://github.com/matthsc/ioBroker.gigaset-elements/workflows/Test%20and%20Release/badge.svg)

## Anforderungen
- NodeJS >= 18.x
- ioBroker >= 4.x, mit Admin >= 5.x
- Gigaset Elements-System

## Installation
Sie können den Adapter aus dem Stable- oder Latest/Test-Repository installieren (indem Sie den Expertenmodus in ioBroker aktivieren und den Adapter aus npm installieren). Installieren Sie es nicht direkt von Github, da dies beim Start des Adapters zu einem Fehler führt („Startdatei kann nicht gefunden werden“).

Erstellen Sie nach der Installation eine neue Instanz und konfigurieren Sie die Einstellungen:

- Verbindungseinstellungen für den Zugriff auf die Gigaset Elements Cloud
    -   Email
    -   Passwort
    - Authentifizierungsintervall in Stunden, sollte 6 sein
- Abfrageintervalle für verschiedene Bereiche
    - Ereignisse (z. B. Fenster/Tür öffnen/kippen/schließen) - Anzahl der Sekunden zwischen den Abfragen
    - Element-/Sensordaten (z. B. Temperatur, Luftfeuchtigkeit) - Anzahl der Minuten zwischen den Abfragen
    - Systemzustandsdaten (grün/orange/rot) - Anzahl der Minuten zwischen den Abfragen

### Unterstützte Elemente
Bisher wurde der Adapter mit den folgenden Elementen getestet bzw. es ist bekannt, dass er funktioniert. Testdaten sind über [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api) verfügbar:

| Elementtyp | Elementname | Getestet von |
| ------------ | ----------------------- | --------------------------------------------------------------------- |
| is01 | Sirene | matthsc |
| um01 | Universal/Fenster/Tür | matthsc |
| wd01 | Wasser | matthsc |
| sd01 | Rauch (nur Testalarm) | HomeControl |
| sp01 | Stecker | matthsc (Hardware gesponsert von [Voggl93](https://github.com/Voggl93)) |

Der Adapter unterstützt auch die folgenden anderen Geräte:

| Gerätetyp | Freundlicher Name | Ereignistypen |
| ----------- | ------------- | ----------- |
| gp02 | Telefon | gp.call |

### Stellen Sie Testdaten für nicht unterstützte Elemente bereit
Wenn Sie andere Elemente haben oder auf Ereignistypen stoßen, die noch nicht vom Adapter verarbeitet werden, können Sie den Expertenmodus in ioBroker aktivieren, in den Adaptereinstellungen zur Registerkarte _Debug_ gehen (nur im Expertenmodus sichtbar) und „Debug – Vorbereiten“ verwenden Testdaten“, um Testdaten zu generieren, die als Teil eines Github-Problems für diesen Adapter übermittelt werden können, um die zusätzlichen Elemente/Ereignistypen einzubeziehen. Persönliche Daten wie Basisstations- oder Elementnamen und -IDs werden so weit wie möglich aus den generierten Daten entfernt.

## Mitteilungen
Bisher unterstützt der Adapter nur Nachrichten, die zum Testen/Debuggen verwendet werden.

### Testen
Rückrufantworten sind entweder <code>{ response: &quot;&lt;message&gt;&quot; }</code> , wenn die Aktion erfolgreich war, oder <code>{ error: &quot;&lt;error message&gt;&quot; }</code> , falls etwas schief gelaufen ist.

#### Ping
Senden Sie einen Ping an den Adapter und erhalten Sie eine <code>{ response: &quot;pong&quot; }</code> .

```ts
sendTo("gigaset-elements.0", "test", "ping", callback);
```

#### Testdaten verarbeiten
Testdaten aus [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api) verarbeiten. Erstellt Basisstationen, Elemente und verarbeitet erfasste Testereignisse.

```ts
sendTo("gigaset-elements.0", "test", "process-test-data", callback);
```

### Debuggen
Rückrufantworten sind entweder <code>{ response: object }</code> , wenn die Aktion erfolgreich war, oder <code>{ error: &quot;&lt;error message&gt;&quot; }</code> , falls etwas schief gelaufen ist.

#### Testdaten vorbereiten
Laden Sie aktuelle Daten aus der Gigaset Elements API und bereiten Sie diese für die Integration als Testdaten in [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api) vor, also für neue Ereignisse oder Elemente, die noch keine Testdaten haben.

Lädt Basisstationen, Elemente und Ereignisse von der API, reduziert sie, um die Datenmenge zu minimieren, und versucht, persönliche Informationen wie Namen und IDs aus den Daten zu entfernen.

Gibt die Daten als <code>{ response: { bs: [], elements: [], events: [] } }</code> -Objekt zurück.

```ts
sendTo("gigaset-elements.0", "debug", { action: "prepare-test-data" from?: Date }, callback);
```

#### Basisstations- und Elementdaten laden
Lädt die Rohdaten der Basisstation und der Elemente als <code>{ response: { bs: [], elements: []} }</code> -Objekt und gibt sie zurück.

```ts
sendTo("gigaset-elements.0", "test", { action: "load-bases-elements" }, callback);
```

#### Ereignisse laden
Lädt Ereignisse und gibt ein <code>{ response: { events: [] } }</code> -Objekt zurück.

Ereignisdaten sind in der Regel 1 Monat lang verfügbar, ältere Daten scheinen nicht verfügbar zu sein.

```ts
sendTo("gigaset-elements.0", "test", { action: "load-events", from: Date, to: Date }, callback);
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.3 (2023-11-21)

-   (matthsc) bugfix

### 0.4.2 (2023-11-20)

-   (matthsc) downgrade typescript to fix integration tests

### 0.4.1 (2023-11-20)

-   (matthsc) add states for batterySaverMode, momentaryPowerMeasurement (plug), setPoint (thermostat)
-   (matthsc) allow to change setPoint for thermostat (experimental/untested)
-   (matthsc) allow to change intrusion mode
-   (matthsc) allow to trigger user alarm
-   (matthsc) add info.systemHealth state
-   (matthsc/dependabot) dependency updates

### 0.4.0 (2023-10-15)

-   (matthsc) add support for plugs
-   (matthsc) drop support for Node 14 and 16
-   (matthsc/dependabot) dependency updates

### 0.3.0 (2022-09-28)

-   (matthsc) drop support for Node 12 and js-controller 3
-   (matthsc) implement migrations from create-adapter
-   (matthsc/dependabot) dependency updates

### 0.2.2 (2022-09-17)

-   (matthsc) fix probably_open state
-   (matthsc/dependabot) dependency updates

### 0.2.1 (2022-07-02)

-   (matthsc) add initial support for smoke detectors
-   (matthsc/dependabot) dependency updates

### 0.2.0 (2022-04-30)

-   (matthsc) add support for phones
-   (matthsc) add Node 18 to test matrix
-   (matthsc/dependabot) dependency updates

### 0.1.3 (2022-03-22)

-   (matthsc) fix "unknown" element position state
-   (matthsc) add more tests
-   (matthsc/dependabot) dependency updates

### 0.1.2 (2022-02-28)

-   (matthsc) fix test data generation
-   (matthsc/dependabot) dependency updates

### 0.1.1 (2022-02-12)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2022-01-29)

-   (matthsc) initial release

## License

MIT License

Copyright (c) 2023 matthsc <matthsc@gmx.net>

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