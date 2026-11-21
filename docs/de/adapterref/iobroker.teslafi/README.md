---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.teslafi/README.md
title: ioBroker.teslafi
hash: zZ8jXiqQ2D7rCBec/vRim2x0l9kXwfKBRQYlqPEnnHw=
---
![Logo](../../../en/adapterref/iobroker.teslafi/admin/teslafi.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.teslafi.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.teslafi.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
![CodeQL](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)
![Bekannte Schwachstellen von SNYK](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/teslafi-stable.svg)
![Installiert](https://iobroker.live/badges/teslafi-installed.svg)
![NPM](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)

# ioBroker.teslafi

## Versionen

## Sentry

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Hinweise zum Deaktivieren der Fehlerberichterstattung finden Sie unter \[Link einfügen].<a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry"> Sentry-Plugin-Dokumentation</a> !

## ioBroker TeslaFi Adapter – Nahtlose Tesla-Datenintegration für Ihr Smart Home

Der TeslaFi-Adapter ermöglicht die mühelose Integration von Fahrzeugdaten aus Ihrem TeslaFi-Konto in das ioBroker-System. Nutzen Sie diese Daten, um Ihr Tesla-Erlebnis zu verbessern und Ihre Hausautomatisierungsabläufe zu optimieren.

## Warum dieser Adapter?

Der Hauptzweck dieses Adapters besteht darin, Tesla-Daten in ioBroker zu integrieren, ohne die Fahrzeugsysteme direkt abzufragen. Durch die Nutzung des bestehenden Datenabfragemechanismus von TeslaFi vermeidet der Adapter zusätzliche Anfragen an das Fahrzeug, wodurch die Batterielebensdauer verlängert und ein effizienter Datenzugriff gewährleistet wird.

## Merkmale

Der Adapter verbindet sich mit der TeslaFi-API, um umfassende Details zu Ihrem Tesla-Fahrzeug abzurufen und diese Daten in ioBroker zugänglich zu machen. Alle von TeslaFi unterstützten Tesla-Modelle sind vollständig kompatibel. Aktuell sind folgende Datenkategorien verfügbar:

- **Thermischer Zustand** : Einblicke in das Wärmemanagementsystem und die Temperaturen.
- **Batteriestatus** : Informationen zum Batteriestatus, Ladezustand und Reichweite.
- **Fahrzeugstatus** : Allgemeiner Fahrzeugstatus, einschließlich Position und Gesamtzustand.
- **Fahrzeugdaten** : Fahrzeugspezifische Details wie Name und Fahrgestellnummer.

## Typische Anwendungsfälle

- **Automatisierung** : Lösen Sie Smart-Home-Aktionen basierend auf dem Echtzeitstatus Ihres Tesla aus. Beispielsweise kann die Klimaanlage automatisch angepasst werden, sobald das Fahrzeug ankommt.
- **Energiemanagement** : Optimieren Sie den Energieverbrauch durch die Planung von Fahrzeugladezeiten und die Überwachung des Batteriestatus direkt über ioBroker.
- **Benachrichtigungen und Berichte** : Richten Sie Warnmeldungen für bestimmte Fahrzeugzustände ein, z. B. bei niedrigem Batteriestand, abgeschlossenen Ladevorgängen oder verfügbaren Updates.

## Konfiguration

Die Konfiguration des Adapters ist unkompliziert:

1. Geben Sie Ihren TeslaFi-API-Schlüssel im Konfigurationsbildschirm des Adapters ein.
2. Legen Sie das gewünschte Abfrageintervall fest, um anzupassen, wie häufig die Daten aktualisiert werden.
3. Aktivieren Sie optional **die Option „TeslaFi-Codierung für Datenanfragen verwenden“ (encoding=1)** , falls Ihr Fahrzeugname Sonderzeichen enthält. Dadurch werden zusätzliche Funktionen hinzugefügt. `encoding=1` Die Option betrifft ausschließlich Datenanfragen; Fahrzeugbefehle bleiben unverändert. Sie ist standardmäßig deaktiviert, auch für bestehende Installationen. Antworten werden weiterhin ohne zusätzliche Dekodierung als JSON interpretiert. Ob der Parameter ein bestimmtes Namensproblem behebt, muss mit TeslaFi überprüft werden, sowohl mit deaktivierter als auch mit aktivierter Option.

## Geofencing (Anwesenheit / Betreten / Verlassen)

Der Adapter kann den von TeslaFi markierten Standort aktivieren (`vehicle-state.location`) in zuverlässige Anwesenheitsereignisse umgewandelt – beispielsweise, um das Garagentor nur dann zu öffnen, wenn das Auto tatsächlich nach Hause kommt. Die Zuordnung erfolgt anhand des exakten Standortnamens (wie in TeslaFi getaggt), sodass keine GPS-Entfernungsberechnung erforderlich ist.

Konfigurieren Sie Ihre Geofences im Tab **„Geofence“** . Jede Zeile enthält:

| Spalte                                       | Bedeutung                                                                                                                                                              |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name des TeslaFi-Standorts**               | Genauer Tag-Name von TeslaFi (z. B. `Home`)                                                                                                                            |
| **Min. entfernt (Minuten)**                  | Das Auto muss mindestens so lange weg gewesen sein, bevor ein `enter` Das Ereignis kann ausgelöst werden (blockiert kurzzeitige Neupositionierung)                      |
| **Bewegung erforderlich**                    | Nur Feuer `enter` wenn sich das Auto tatsächlich bewegt hat, während es weg war                                                                                         |
| **Bewegungsgeschwindigkeitsschwelle (km/h)** | Geschwindigkeit, die als Bewegung zählt                                                                                                                                |
| **Debounce (Umfragen)**                      | Anzahl aufeinanderfolgender Wahlen, die eine Änderung vor dem Erreichen eines bestimmten Alters bestehen bleiben muss `enter` /`leave` Brände (Schutz vor GPS-Flimmern) |

Für jeden konfigurierten Standort erstellt der Adapter Folgendes:

- `geofence.current` – der aktuell markierte Ort
- `geofence.<Location>.present` – Anwesenheit bestätigt (boolesch)
- `geofence.<Location>.enter` – Impulse `true` für eine einzelne Umfrage zu einer gefilterten Ankunft
- `geofence.<Location>.leave` – Impulse `true` für eine einzelne Umfrage zum Thema Abreise
- `geofence.<Location>.awaySince` – Zeitstempel (ms) seit Abfahrt des Wagens; `0` während der Anwesenheit

`<Location>` wird der Name des TeslaFi-Standorts durch Zeichen ersetzt, die in ioBroker-Objekt-IDs nicht zulässig sind. `_` Zum Beispiel ein Ort mit dem Tag `My Home` Ergebnisse in den Staaten `geofence.My_Home.*` Die

NEIN `enter` Das Ereignis wird beim Start des Adapters ausgelöst, GPS-Schwankungen im geparkten Zustand hingegen nicht.

### Beispiel: Öffnen Sie die Garage bei der Heimkehr

Löse eine JavaScript/Blockly-Regel bei steigender Flanke aus `teslafi.0.geofence.Home.enter`:

```javascript
on({ id: "teslafi.0.geofence.Home.enter", val: true, ack: true }, () => {
	setState("zigbee.0.garage_door.open", true);
});
```

Mit `minAwayMinutes: 10`, `requireMotion: true` Und `debouncePolls: 2` Dies wird genau einmal ausgelöst, wenn das Auto nach einer tatsächlichen Fahrt nach Hause zurückkehrt, wobei kurze Positionsänderungen in der Nähe des Hauses, GPS-Schwankungen und Neustarts des Adapters ignoriert werden.

## Kompatibilität

Der Adapter ist mit allen von TeslaFi unterstützten Tesla-Modellen kompatibel. Ein gültiges TeslaFi-Konto mit API-Zugriff ist erforderlich.

## Aktive Weiterentwicklung und Nutzerbeiträge

Der TeslaFi-Adapter wird aktiv weiterentwickelt, und auf Wunsch der Nutzer können zusätzliche Funktionen oder Datenkategorien hinzugefügt werden. Teilen Sie uns Ihre Ideen mit und helfen Sie mit, den Adapter für die gesamte Community zu verbessern!

## Spenden

<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.1.1 (2026-11-11)

- (HombachC) added optional TeslaFi encoding for data requests (#45)
- (hombach) updated ioBroker/testing
- (hombach) updated dependencies
- (hombach) updated axios

### 3.1.0 (2026-10-11)

- (hombach) added geofence presence/enter/leave with away- and motion-gates (#325)
- (hombach) fixed speed unit: `vehicle-state.speed` is now labeled mph and a new `vehicle-state.speed_km` (km/h) was added
- (hombach) geofence: harden against invalid config values, non-numeric speed and colliding/duplicate location names
- (hombach) speed unit label is now also corrected on existing installations
- (hombach) switch to iobroker testing 6.x
- (hombach) updated dependencies

### 3.0.4 (2026-08-10)

- (hombach) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts
- (hombach) updated dependencies

### 3.0.3 (2026-07-05)

- (hombach) removed unneeded test devDependencies (chai, sinon-chai, proxyquire) and switched tests to Node.js assert
- (hombach) updated axios

### 3.0.2 (2026-06-19)

- (hombach) fixed warnings by adapter checker

## License

MIT License

Copyright (c) 2024-2026 C.Hombach <TeslaFi@homba.ch>

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