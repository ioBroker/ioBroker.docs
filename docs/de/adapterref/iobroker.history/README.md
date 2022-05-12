---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.history/README.md
title: ioBroker.history
hash: PtdWXDfO7iyz5LSlWyu5E++pME8W7qWuproQAaoXRFc=
---
![Logo](../../../en/adapterref/iobroker.history/admin/history.png)

![Anzahl der Installationen](http://iobroker.live/badges/history-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.history.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.history.svg)
![Tests](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![NPM](https://nodei.co/npm/iobroker.history.png?downloads=true)
![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

# IoBroker.history
Dieser Adapter speichert den Statusverlauf in einem zweistufigen Prozess.

## Aufbau
* [englische Beschreibung](docs/en/README.md)
* [deutsche Beschreibung](docs/de/README.md)

## 1.9.0 (2020-01-16)
* (foxriver76) Verwendung von adapter.objects entfernt
* __benötigt js-controller >= 2.0.0__

### 1.8.7 (2019-09-02)
* (paul53) alte Dateien sollten automatisch gelöscht werden

### 1.8.6
* Mehrere kleinere Probleme behoben und einige Texte optimiert

### 1.8.5 (2018-07-02)
* (Apollon77) Fehler in storeState behoben

### 1.8.4 (2018-06-24)
* (Apollon77) Behebung/Ermöglichung, das Schreiben von Start- und Endwerten zu deaktivieren

### 1.8.0 (2018-06-19/24)
* (Apollon77) Option zum Schreiben von Daten auf eine andere ID hinzugefügt, um Gerätewechsel zu erleichtern. Das Abrufen von Daten funktioniert für beide IDs

### 1.7.4 (2018-04-03)
* (AlCalzone) Korrigieren Sie die Handhabung von Dateinamen für Staaten mit Sonderzeichen

### 1.7.3 (2018-03-28)
* (Apollon77) Respektieren Sie die Einstellung „für immer behalten“ für die Aufbewahrung aus der Datenpunktkonfiguration

### 1.7.2 (2018-02-05)
* (bondrogeen) Admin3-Korrekturen

### 1.7.1 (2018-01-31)
* (Bluefox) Admin3-Korrekturen

### 1.7.0 (2018-01-17)
* (Bluefox) Bereit für Admin3

### 1.6.6 (2017-12-20)
* (bluefox) Übersetzungen

### 1.6.5 (2017-10-05)
* (Apollon77) Relog-Wert-Funktion behoben

### 1.6.4 (2017-08-12)
* (Bluefox) Option "Letzten Wert speichern" hinzufügen

### 1.6.3 (2017-08-03)
* (Apollon77) Verhalten des Protokollintervalls behoben, um immer den aktuellen Wert zu protokollieren

### 1.6.2 (2017-04-07)
* Fehlerbehebung bei Datentypkonvertierungen

### 1.6.0 (2017-02-28)
* (Apollon77) Einige Zeichen in Verlaufsdateinamen ersetzen

### 1.5.3 (2017-02-22)
* (Apollon77) Kleine Korrektur für ältere Konfigurationen

### 1.5.2
* (Apollon77) Verbesserte Min-Delta-Logik für Datenpunkte vom Typ Mixed

### 1.5.1 (2017-01-16)
* (bluefox) Behandlung von Float-Werten in Adapter-Konfiguration und Datenpunkt-Konfiguration korrigiert.

### 1.5.0 (2016-12-01)
* (Apollon77) Nachrichten enableHistory/disableHistory hinzufügen
* (Apollon77) fügt Unterstützung hinzu, um Änderungen nur dann zu protokollieren, wenn der Wert von einem Mindestwert für Zahlen abweicht
* (Apollon77) Fixierung der Gesamtrechnung

### 1.4.0 (2016-10-29)
* (Apollon77) Option hinzugefügt, um unveränderte Werte erneut zu protokollieren, um die Visualisierung zu vereinfachen
* (Apollon77) Konverterskripte hinzugefügt, um Verlaufsdaten in die Datenbank zu verschieben

### 1.3.1 (2016-09-25)
* (Apollon77) Behoben: ts wird als Wert zugewiesen
* (Bluefox) Selektor für History-Objekte reparieren

### 1.3.0 (2016-08-30)
* (Bluefox) nur mit neuem Admin kompatibel

### 1.2.0 (2016-08-27)
* (Bluefox) Name des Objekts von Historie zu Benutzerdefiniert ändern

### 1.1.0 (2016-08-27)
* (Bluefox) Fixe Aggregation des letzten Punktes
* (Bluefox) Aggregation none Liefert nur die Rohdaten ohne Aggregation

### 1.0.5 (2016-07-24)
* (Bluefox) Aggregation in großen Intervallen behoben

### 1.0.4 (2016-07-05)
* (Bluefox) Aggregation auf Sekunden korrigiert

### 1.0.3 (2016-05-31)
* (Blaufuchs) Linie bis zum Ende ziehen, wenn null ignoriert wird

### 1.0.2 (2016-05-29)
* (bluefox) Max und Min miteinander vertauschen

### 1.0.1 (2016-05-28)
* (Bluefox) End-/Startwerte auch für "bei Änderung" berechnen

### 1.0.0 (2016-05-20)
* (Bluefox) Standard-Aggregationsname ändern

### 0.4.1 (2016-05-14)
* (Bluefox) Support-SessionId

### 0.4.0 (2016-05-05)
* (Bluefox) Aggregationsdatei vom SQL-Adapter verwenden
* (Bluefox) Korrigieren Sie die Wertespeicherung beim Beenden
* (Bluefox) alle 5 Minuten alle gecachten Daten speichern
* (Bluefox) Unterstützung von ms

### 0.2.1 (2015-12-14)
* (Bluefox) Beschreibung der Einstellungen hinzufügen
* (Bluefox) Platzieren Sie die Aggregatfunktion in einer separaten Datei, um die gemeinsame Nutzung mit anderen Adaptern zu ermöglichen
* (lächelnd-Jack) Hinzufügen Demodaten generieren
* (lächelnd-Jack) Geschichte in eigenen Fork bekommen
* (Bluefox) StoreAck-Flag hinzufügen
* (Bluefox) Mockup für onchange

### 0.2.0 (2015-11-15)
* (Smiling_Jack) Speichern und Laden im Adapter und nicht im js-Controller
* (Smiling_Jack) Aggregation von Datenpunkten
* (Smiling_Jack) Unterstützung von Speicherpfaden

### 0.1.3 (2015-02-19)
* (bluefox) kleinen Fehler im Verlauf behoben (Danke an Dschaedl)
* (Bluefox) Admin-Seite aktualisieren

### 0.1.2 (2015-01-20)
* (Bluefox) aktiviert die Schaltfläche zum Speichern und Schließen durch die Konfiguration

### 0.1.1 (2015-01-10)
* (Bluefox) prüfen, ob Zustand nicht gelöscht wurde

### 0.1.0 (2015-01-02)
* (Bluefox) npm-Installation aktivieren

### 0.0.8 (2014-12-25)
* (Bluefox) Unterstützung des Entprellintervalls

### 0.0.7 (2014-11-01)
* (bluefox) jede Änderung speichern und nicht nur lc != ts

### 0.0.6 (2014-10-19)
* (Bluefox) Konfigurationsseite hinzufügen

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2020 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

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