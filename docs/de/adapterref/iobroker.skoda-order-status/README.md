---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.skoda-order-status/README.md
title: ioBroker.skoda-Auftragsstatus
hash: 0rHIRFKbfSt4YFxhCKH6Lxc7NmheATZisi+edRzXfdw=
---
![Logo](../../../en/adapterref/iobroker.skoda-order-status/admin/skoda-order-status.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.skoda-order-status.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.skoda-order-status.svg)
![Anzahl der Installationen](https://iobroker.live/badges/skoda-order-status-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/skoda-order-status-stable.svg)
![NPM](https://nodei.co/npm/iobroker.skoda-order-status.png?downloads=true)
![Test und Freigabe](https://github.com/SentiQ/ioBroker.skoda-order-status/workflows/Test%20and%20Release/badge.svg)

# ioBroker.skoda-Auftragsstatus

## skoda-order-status-Adapter für ioBroker

Den Status einer **ausstehenden Škoda-Fahrzeugbestellung** können Sie über die inoffizielle MyŠkoda-API abfragen.

Damit wird die Lücke geschlossen, die durch Fahrzeugadapter wie z. B. `vw-connect`: Die Auftragsverfolgung in der MyŠkoda App („Track & Explore“) funktioniert **auch, bevor** eine Fahrzeugidentifikationsnummer (VIN) existiert.

Herstellerseite: [Škoda Auto](https://www.skoda-auto.com/)

## Merkmale

- Melden Sie sich mit Ihrer MyŠkoda-E-Mail-Adresse und Ihrem Passwort an.
- Automatische Erkennung aller offenen Aufträge im Konto
- Englische Statusbezeichnungen und Checkpoint-Daten
- Konfigurierbares Abfrageintervall (Standard: 1 Stunde)
- Das Aktualisierungstoken wird verschlüsselt auf der Instanz gespeichert.

## Konfiguration

1. Installieren Sie den Adapter und erstellen Sie eine Instanz.
2. Geben Sie Ihre **MyŠkoda-E-Mail-Adresse** und **Ihr Passwort** ein.
3. Optional kann das **Abfrageintervall** geändert werden (900–86400 Sekunden, Standardwert 3600).
4. Speichern. Der Adapter meldet sich an, ermittelt offene Aufträge und erstellt ein Gerät pro Kommissions-ID.

## Objekte

Jeder offene Auftrag ist ein Gerät unter `skoda-order-status.0.<commissionId>`:

| Zustand                                                                      | Beschreibung                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `orderStatus`                                                                | Rohstatus (`ORDER_CONFIRMED`, `IN_PRODUCTION`, `IN_DELIVERY`, `TO_HANDOVER`) |
| `orderStatusLabel`                                                           | Englisches Etikett (Bestätigt, In Produktion, In Auslieferung, Zur Übergabe)  |
| `model` /`trimLevel`                                                         | Fahrzeugmodell und Ausstattung                                                |
| `exteriorColour` /`interiorColour`                                           | Farben                                                                        |
| `batteryKwh` /`maxPerformanceKw`                                             | Batterie und Stromversorgung (falls vorhanden)                                |
| `commissionId`                                                               | Auftrags-ID                                                                   |
| `dealerId` /`activationState`                                                | Händler und Aktivierung                                                       |
| `orderConfirmedDate` /`inProductionDate` /`inDeliveryDate` /`toHandoverDate` | Checkpoint-Termine                                                            |
| `checkpointsReached` /`checkpointsPending`                                   | JSON-Listen von Checkpoints                                                   |
| `lastPoll`                                                                   | Letzte erfolgreiche Umfrage (ISO-Zeitstempel)                                 |

`info.connection` Ist `true` während die Anmeldung über die MyŠkoda API funktioniert.

## Haftungsausschluss

Dieser Adapter verwendet eine **inoffizielle, per Reverse Engineering entwickelte** MyŠkoda-API. Er steht in keiner Verbindung zu Škoda Auto. Die Nutzung erfolgt auf eigene Gefahr.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.9 (2026-09-11)
* (SentiQ) HTTP timeouts, sequential polling, English state labels

### 0.1.8 (2026-09-03)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.7 (2026-09-02)
* (SentiQ) repository PR checker error

### 0.1.6 (2026-09-02)
* (SentiQ) fix fr news translation

### 0.1.5 (2026-09-02)
* (SentiQ) fix state roles and connection i18n

## License
MIT License

Copyright (c) 2026 SentiQ <yves@nuesser.digital>

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
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.