---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.govee-smart/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart
hash: MmAk/+FsnENpdUXKDHJwMHjEWCcEPZ5LfKNvlaSWMh8=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart

![npm-Version](https://img.shields.io/npm/v/iobroker.govee-smart)
![stabil](https://iobroker.live/badges/govee-smart-stable.svg)
![Installationen](https://iobroker.live/badges/govee-smart-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.govee-smart)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Posten](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Steuern Sie alle WLAN-Produkte ([Govee](https://www.govee.com/)) über ioBroker – Lampen, Sensoren und Haushaltsgeräte. Geräte, die ausschließlich über Bluetooth funktionieren, werden nicht unterstützt.

Der Adapter nutzt alle verfügbaren Govee-Kanäle (LAN, Cloud REST, AWS IoT MQTT, OpenAPI MQTT, App API) und wählt für jedes Gerät denjenigen aus, der die schnellste Antwort liefert. Details finden Sie in **[Wiki](https://github.com/krobipd/ioBroker.govee-smart/wiki)**.

---

## Dokumentation
Die vollständige Benutzerdokumentation befindet sich im **[Wiki](https://github.com/krobipd/ioBroker.govee-smart/wiki)**.

| Thema | Englisch | Deutsch |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Landingpage | [Startseite](https://github.com/krobipd/ioBroker.govee-smart/wiki/Home) | [Startseite](https://github.com/krobipd/ioBroker.govee-smart/wiki/Startseite) |
| Unterstützte Modelle, Statusbedeutungen, eigene hinzufügen | [Geräte](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) | [Geräte](https://github.com/krobipd/ioBroker.govee-smart/wiki/Geraete) |
| Jeder Datenpunkt, wo er landet, was er bewirkt | [Zustandsbaum](https://github.com/krobipd/ioBroker.govee-smart/wiki/State-Tree) | [Datenpunkte](https://github.com/krobipd/ioBroker.govee-smart/wiki/Datenpunkte) |
| Thermometer, Heizgeräte, Wasserkocher usw. — Zustandsbaum, Aktualisierungen, Fehlerbehebung | [Sensoren und Geräte](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensors-and-Appliances) | [Sensoren und Geräte](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensoren-und-Appliances) |
| Lichter — Segmentanzahl, Assistent, Streifen schneiden, Stapelverarbeitung | [Segmente](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segments) | [Segmente](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segmente) |
| Lichter – Szenenbibliothek, Geschwindigkeitsregler, Cloud- vs. lokale Schnappschüsse | [Szenen und Schnappschüsse](https://github.com/krobipd/ioBroker.govee-smart/wiki/Scenes-and-Snapshots) | [Szenen und Schnappschüsse](https://github.com/krobipd/ioBroker.govee-smart/wiki/Szenen-und-Snapshots) |
| Lichter — Gruppenverzweigung, Fähigkeitsüberschneidung | [Gruppen](https://github.com/krobipd/ioBroker.govee-smart/wiki/Groups) | [Gruppen](https://github.com/krobipd/ioBroker.govee-smart/wiki/Gruppen) |
| Ordnerbenennung, Start, Diagnose, Fehlerbehebung | [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) | [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) |
| Ordnerbenennung, Start, Diagnose, Fehlerbehebung | [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) | [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) |

---

## Merkmale
- **Funktionsbasiert** – Die Zustände werden anhand der von der Govee-API für jedes Gerät gemeldeten Daten generiert. Keine fest codierten Artikelnummern, keine manuell gepflegte Geräteliste, die veraltet sein könnte.
- **LAN-Priorität für Beleuchtung** – UDP-Multicast-Erkennung, Befehle unter 50 ms, Statusaktualisierungen über AWS IoT MQTT
- **Cloud + MQTT-Push für Sensoren und Geräte** – Messwerte über die App-API, Ereignisse über den OpenAPI MQTT-Broker
- **Farbe und Helligkeit pro Segment** für LED-Streifen mit den entsprechenden Funktionen, einschließlich Stapelverarbeitungsbefehlen und einem visuellen Segmenterkennungsassistenten (mit einer in Echtzeit korrigierbaren Streifenkarte) für zugeschnittene Streifen
- **Szenen, DIY-Szenen, Musikmodus, Farbverlauf-Umschaltung** – lokal über BLE-over-LAN aktiviert, falls möglich, ansonsten Cloud-Fallback
- **Cloud- und lokale Snapshots** – Govee-App-Snapshots und ioBroker-seitige Snapshots nebeneinander
- **Gruppen** – Verbindung von Govee-Gruppen mit ioBroker durch Überschneidung der Fähigkeiten der Mitglieder
- **Diagnose-Export-Schaltfläche pro Gerät** – JSON-Dump mit einem Klick für Fehlerberichte
- **Funktioniert ohne Anmeldeinformationen** – Standardmäßig nur im LAN nutzbar, jede Anmeldeinformationsstufe schaltet weitere Funktionen frei.
- **Nutzungsbegrenzte Cloud-Nutzung** – Tages- und Minutenbudgets, die an das Govee-Kontingent angepasst sind

---

## Wächter / Fehlerberichterstattung
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Meldung erfolgt nur, wenn Sie die Fehlerberichterstattung in den ioBroker-Diagnoseeinstellungen aktiviert haben (Systemeinstellungen → Diagnose und Fehlerberichterstattung). Es wird lediglich eine anonyme Installations-ID übermittelt – kein Name, keine E-Mail-Adresse und keine IP-Adresse.

Einzelheiten und Hinweise zur Deaktivierung finden Sie in Abschnitt [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Für die Fehlerberichterstattung ist js-controller 3.0 oder neuer erforderlich.

---

## Anforderungen
- Node.js >= 22
- ioBroker js-controller >= 7.2.2
- ioBroker Admin >= 8.0.1
- Ein Govee-Konto und mindestens ein Govee-WLAN-Gerät. Für die LAN-Steuerung wird eine Lampe benötigt, bei der der LAN-Modus in der Govee Home App aktiviert ist – siehe die [Liste der LAN-kompatiblen Geräte](https://app-h5.govee.com/user-manual/wlan-guide) von Govee.

---

## Erste Schritte
Der Adapter funktioniert ohne Zugangsdaten ausschließlich im LAN. Durch Hinzufügen eines API-Schlüssels werden Szenen, Segmente und die Gerätesteuerung freigeschaltet. Mit Ihrer Govee-E-Mail-Adresse und Ihrem Passwort erhalten Sie Sensormesswerte (Temperatur/Luftfeuchtigkeit über die App-API), Statusbenachrichtigungen in Echtzeit und die vollständige Gruppensteuerung. Informationen zu den Zugangsdaten, zum Erhalt eines API-Schlüssels und zu den Netzwerkvoraussetzungen finden Sie in Abschnitt [Einrichtungsseite](https://github.com/krobipd/ioBroker.govee-smart/wiki/Setup).

---

## Geräteunterstützung
Unter `diag.tier` wird der Teststatus jedes Geräts angezeigt. Unter [Geräteseite](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) sind alle unterstützten Modelle und deren Status aufgeführt.

---

## Fehlerbehebung
Häufige Probleme (keine Geräte gefunden, leere Szenenauswahl, Segmentfarben ändern sich nicht, eingeschränkte Gruppenbefehle, verzögerte Statusaktualisierungen) werden auf der Wiki-Seite [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) / [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) behandelt.

Für alle anderen Fälle setzen Sie **`diag.export`** auf `true` auf dem betroffenen Gerät, kopieren Sie das JSON aus `diag.result` und öffnen Sie eine [GitHub-Problem](https://github.com/krobipd/ioBroker.govee-smart/issues).

---

## Danksagungen
Die Implementierung des MQTT-Authentifizierungs- und BLE-over-LAN-Protokolls (ptReal) dieses Adapters basiert auf den Forschungsergebnissen von Wez Furlong (siehe [govee2mqtt](https://github.com/wez/govee2mqtt)). Deren Reverse-Engineering des Govee AWS IoT MQTT-Protokolls und der undokumentierten API-Endpunkte war von unschätzbarem Wert.

---

## Unterstützung
- [Wiki](https://github.com/krobipd/ioBroker.govee-smart/wiki) — Benutzerdokumentation (EN / DE)
- [GitHub Issues](https://github.com/krobipd/ioBroker.govee-smart/issues) — Fehlerberichte, Funktionsanfragen
- [ioBroker Forum](https://forum.iobroker.net/) — Allgemeine Fragen

### Unterstützung der Entwicklungsabteilung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.24.0 (2026-08-04)

- This version needs ioBroker Admin 8. The segment detection wizard is built for Admin 8 and no longer runs on Admin 7, so this update is not offered there.

### 2.23.1 (2026-08-04)

- Test release during the move to ioBroker Admin 8.

### 2.23.0 (2026-08-04)

- Test release during the move to ioBroker Admin 8.

### 2.22.0 (2026-07-23)

- A Govee app device group of the "same mode" type no longer appears as a phantom, uncontrollable device in the object tree.
- Seven more Govee models join the catalog, from Edison bulbs to a ceiling fan. They start as experimental — enable them in the adapter settings to try them.
- Sensors that reach the cloud through a Govee gateway now show which gateway they are connected through, instead of an empty IP field.

### 2.21.0 (2026-07-12) — stable

- The segment-detection wizard for cut LED strips now has a visual admin interface: a live map of the strip that fills in as you measure each segment and can be corrected before you apply it.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_