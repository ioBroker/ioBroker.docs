---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.gigaset-elements/README.md
title: ioBroker.gigaset-elements
hash: 2RJmBwhoBCYP1l9pHAmoLJ7RiSl+1r3oeU7h54l8eT8=
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

![Testen und freigeben](https://github.com/matthsc/ioBroker.gigaset-elements/workflows/Test%20and%20Release/badge.svg)

## Anforderungen
- NodeJS >= 12.x
- ioBroker >= 3.x, mit Admin >= 5.x
- Gigaset Elements-System

## Installation
Bis der Adapter Teil des neuesten oder stabilen Repositorys ist, können Sie die neueste Version installieren, indem Sie den Expertenmodus in ioBroker aktivieren und den Adapter von npm oder github installieren.

Erstellen Sie nach der Installation eine neue Instanz und konfigurieren Sie die Einstellungen:

- Verbindungseinstellungen für den Zugriff auf die Gigaset Elements Cloud
    -   Email
    -   Passwort
    - Authentifizierungsintervall, sollte 6 (Stunden) betragen
- Polling-Intervalle für verschiedene Bereiche
    - Ereignisse (z. B. Fenster/Tür öffnen/kippen/schließen) - Anzahl Sekunden zwischen Abfragen
    - Element-/Sensordaten (z. B. Temperatur, Feuchtigkeit) - Anzahl der Minuten zwischen den Abfragen

## Einschränkungen
Der Adapter liest derzeit nur Daten und lässt keine Änderungen zu.

### Unterstützte Elemente
Bisher wurde der Adapter getestet/es ist bekannt, dass er mit den folgenden Elementen funktioniert, und Testdaten sind über [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api) verfügbar:

| Elementtyp | Elementname | Getestet von |
| ------------ | --------------------- | --------- |
| ist01 | Sirene | matthsc |
| um01 | Universal/Fenster/Tür | matthsc |
| wd01 | Wasser | matthsc |

Wenn Sie andere Elemente haben oder auf Ereignistypen stoßen, die noch nicht vom Adapter verarbeitet werden, können Sie den Expertenmodus in ioBroker aktivieren, in den Adaptereinstellungen auf die Registerkarte _Debug_ gehen (nur im Expertenmodus sichtbar) und „Debug – Prepare test data", um Testdaten zu generieren, die als Teil eines Github-Problems für diesen Adapter eingereicht werden können, um die zusätzlichen Elemente/Ereignistypen enthalten zu bekommen. Personenbezogene Daten wie Basisstations- oder Elementnamen und -IDs werden so weit wie möglich aus den generierten Daten entfernt.

## Mitteilungen
Bisher unterstützt der Adapter nur Nachrichten, die zum Testen/Debuggen verwendet werden.

### Testen
Callback-Antworten sind entweder <code>{ response: &quot;&lt;message&gt;&quot; }</code> , wenn die Aktion erfolgreich war, oder <code>{ error: &quot;&lt;error message&gt;&quot; }</code> , falls etwas schief gelaufen ist.

#### Pingen
Senden Sie einen Ping an den Adapter und erhalten Sie eine <code>{ response: &quot;pong&quot; }</code> .

```ts
sendTo("gigaset-elements.0", "test", "ping", callback);
```

#### Testdaten verarbeiten
Testdaten aus [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api) verarbeiten. Erstellt Basisstationen, Elemente und verarbeitet erfasste Testereignisse.

```ts
sendTo("gigaset-elements.0", "test", "process-test-data", callback);
```

### Debugging
Callback-Antworten sind entweder <code>{ response: object }</code> , wenn die Aktion erfolgreich war, oder <code>{ error: &quot;&lt;error message&gt;&quot; }</code> , falls etwas schief gelaufen ist.

#### Testdaten vorbereiten
Laden Sie aktuelle Daten aus der Gigaset Elements API und bereiten Sie diese für die Integration als Testdaten in [gigaset-elements-api](https://github.com/matthsc/gigaset-elements-api) vor, z. B. für neue Ereignisse oder Elemente, die noch keine Testdaten haben.

Lädt Basisstationen, Elemente und Ereignisse aus der API, reduziert sie, um die Datenmenge zu minimieren, und versucht, persönliche Informationen wie Namen und IDs aus den Daten zu entfernen.

Gibt die Daten als <code>{ response: { bs: [], elements: [], events: [] } }</code> Objekt zurück.

```ts
sendTo("gigaset-elements.0", "debug", { action: "prepare-test-data" from?: Date }, callback);
```

#### Basisstations- und Elementdaten laden
Lädt die Rohdaten der Basisstation und der Elemente als <code>{ response: { bs: [], elements: []} }</code> -Objekt und gibt sie zurück.

```ts
sendTo("gigaset-elements.0", "test", { action: "load-bases-elements" }, callback);
```

#### Ereignisse laden
Lädt Ereignisse und gibt ein <code>{ response: { events: [] } }</code> Objekt zurück.

Ereignisdaten sind normalerweise für 1 Monat verfügbar, ältere Daten scheinen nicht verfügbar zu sein.

```ts
sendTo("gigaset-elements.0", "test", { action: "load-events", from: Date, to: Date }, callback);
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.1.1 (2022-02-12)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2022-01-29)

-   (matthsc) initial release

## License

MIT License

Copyright (c) 2022 matthsc <matthsc@gmx.net>

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