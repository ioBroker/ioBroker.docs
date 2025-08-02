---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.mielecloudservice
hash: bxu3vb+SjaR2PsJUQyYA4WUmRy5xhp6wY8m3GijYVNs=
---
![Logo](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![Anzahl der Installationen](http://iobroker.live/badges/mielecloudservice-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)
![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)

# IoBroker.mielecloudservice [![Testen und Freigeben](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.mielecloudservice/actions/workflows/test-and-release.yml)
## Mielecloudservice-Adapter für ioBroker
Vernetzen Sie Ihre Miele-Geräte (XGW3000 & WiFiConn@ct)

&gt;Wenn Ihnen dieser Adapter gefällt und Sie erwägen, mich zu unterstützen:<br/> &gt;[![Spenden mit PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

## Beschreibung
Dieser Adapter dient zum Abrufen von Informationen zu all Ihren Miele@Home-Geräten von der offiziellen Miele-API von Drittanbietern.

Unabhängig davon, ob sie direkt über WLAN oder XGW3000 Gateway verbunden sind. Er implementiert die **Miele-API von Drittanbietern V1.0.5**

## Voraussetzungen
* Miele@Home User (Smartphone App)
* Miele@Home Passwort (Smartphone App)
* Miele Client_id (von https://www.miele.com/developer/)
* Miele Client_secret (von https://www.miele.com/developer/ )

## Installation
Gehen Sie zur Installation wie folgt vor:

1. Installieren Sie über den Admin mit dem
1. Installieren Sie über den Admin mit dem
* stabiles Repo - um die aktuelle stabile Version zu erhalten
* latest Repo - um die neueste Testversion zu erhalten (möglicherweise nicht stabil)
* über: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git – um die neueste Entwicklungsversion zu erhalten
2. App-Konto für Miele@Home in der Miele Smartphone App anlegen
3. Erstellen Sie ein Entwicklerkonto unter https://www.miele.com/f/com/en/register_api.aspx
4. Fügen Sie Ihre Miele-Geräte zur App hinzu (sofern nicht automatisch hinzugefügt)
6. Geben Sie das Client-Geheimnis und die Client-ID ein, die Sie vom Miele-Entwicklerteam erhalten haben, sowie die Konto-ID und das Passwort aus der App.

## Merkmale
Dieser Adapter implementiert derzeit fast alle Funktionen der Miele API V1.0.5 und einige Teile der API V1.0.6.
Die Funktionen der API können (und tun dies derzeit auch) von den Funktionen der iOS- und Android-Apps abweichen.
Zum Beispiel sind keine Informationen zum TwinDos verfügbar – selbst die Apps haben sie.
Dazu gehören:

* Alle bekannten und dokumentierten Gerätetypen werden unterstützt (API V1.0.6).
* Grundlegende Informationen zu allen Gerätetypen.
* Erweiterte Informationen für alle Gerätetypen.
* EcoFeedback (Wasser- und/oder Stromverbrauch) für Geräte, die dies melden.

`Note: Not all devices report this information - event not if they do so in the iOS or Android apps. Search for the ecoFeedback folder in the device tree.`

* Unterstützte Aktionen, die Sie auf diesem Gerät ausführen können – die Funktionen des Geräts werden größtenteils von der API selbst gemeldet.

## Bekannte Probleme
* Die Programme werden grundsätzlich seit v6.0.0 des Adapters unterstützt. Ausgenommen Programme die zusätzliche Parameter benötigen wie z.B. für Öfen.

## Konfiguration
### Grundkonfiguration
Um diesen Adapter zum Laufen zu bringen, benötigen Sie mindestens:

* Miele@Home User (aus der Smartphone App)
* Miele@Home Passwort (aus der Smartphone App)
* Miele Client_id (von https://www.miele.com/developer/)
* Miele Client_secret (von https://www.miele.com/developer/ )

### Daten von Miele-Servern anfordern
Seit V6.2.0 haben Sie die Möglichkeit zu wählen zwischen

* Server-Sent Events (Kontrollkästchen „Server-Sent Events“ ist aktiviert – Standard und *dringend empfohlen*)
* Zeitbasierte Datenabfrage (Kontrollkästchen „Vom Server gesendete Ereignisse“ ist deaktiviert)
* Verzögerte Verarbeitung

#### Vom Server gesendete Ereignisse (dringend empfohlen)
Server-Sent Events sind eine sehr praktische Methode, um Daten von den Miele-Servern abzurufen, da die Server Ihnen Daten senden, sobald es Änderungen gibt. Kein nutzloses Polling alle xx Sekunden, bei dem ignoriert wird, ob es Änderungen gab oder nicht. Leider gibt es bei dieser Verbindungsart Probleme – sie schlägt ziemlich oft fehl und nur ein Neustart des Adapters löst dieses Problem.

#### Zeitbasierte Datenabfrage
Um die Stabilität des Adapters zu verbessern, habe ich die Datenabfrage als Konfigurationsoption wieder eingeführt, die Sie verwenden können, wenn SSE für Sie ausfällt.
Trotzdem ist SSE die Standardeinstellung, und ich empfehle dringend, es auszuprobieren und zu verwenden, da es viele Ressourcen auf Ihrer und auf Mieles Seite spart. Abgesehen davon konzentriere ich mich seit Version 5.x.x auf SSE.
Die zeitbasierte Datenabfrage basiert auf den beiden Konfigurationsoptionen:

* Poll-Intervall
* Einheit des Polling-Intervalls (Sekunden/Minuten)

#### Verzögerte Verarbeitung
Falls Sie mehrere Miele-Geräte besitzen und diese gleichzeitig verwenden, kann es vorkommen, dass die API in kurzer Zeit viele Nachrichten sendet. Abhängig von Ihrer ioBroker-Hardware kann dies Ihren Server überlasten und dazu führen, dass die Visualisierung nicht mehr reagiert oder der Broker überhaupt nicht mehr reagiert. Um dies zu vermeiden, reduziert diese Konfigurationsoption die Anzahl der verarbeiteten Nachrichten auf eine Nachricht alle xxx Millisekunden.
Zugehörige Konfigurationsoptionen:

* verzögerte Bearbeitung
* Nachrichtenverzögerung

## Steuern Sie Ihre Geräte
### Aktionen
Alle derzeit unterstützten und dokumentierten Aktionen für alle Geräte sind implementiert (API V1.0.5).
> Bitte beachten Sie, dass Aktionen nur funktionieren, wenn Sie Ihr Gerät in den entsprechenden Zustand versetzen (z. B. Mobile Control, PowerOn, ...).
Weitere Informationen zu Aktionen finden Sie unter [Miele-Dokumentation](#documentation).

### Programme (Eingeführt in API V1.0.5)
Mit API V1.0.5 hat Miele einen neuen Endpunkt namens „/programs“ eingeführt.
Die Unterstützung für diesen Endpunkt beginnt mit Adapterversion 4.5.0. Ein neuer Datenpunkt [device.Actions.Program] wird erstellt, der alle von Miele zurückgegebenen unterstützten Programme auflistet.
**Wenn Sie einen der Werte auswählen, wird das Programm sofort ausgeführt!** Derzeit werden nur einfache Programme unterstützt. Beispielsweise benötigen Backöfen einige zusätzliche Informationen – dies wird in einer zukünftigen Version implementiert.

Bei der Veröffentlichung des Adapters hat Miele einige Gerätekategorien dokumentiert, die diesen Endpunkt unterstützen, und nur (zumindest bei mir) eine Teilmenge davon funktioniert wirklich. Für mein Kaffeesystem, meine Waschmaschine und meinen Wäschetrockner funktioniert es nur für das Kaffeesystem.
Aber Miele arbeitet daran und erweitert die Unterstützung regelmäßig.
Weitere Informationen finden Sie in der allgemeinen Miele-API-Dokumentation (unten).

## Dokumentation
Wenn Sie ein tieferes Verständnis erlangen möchten oder eine Rohwertumrechnung benötigen, lesen Sie bitte [dieser Dokumentation.](machine_states.md)

## Sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisch dem Autor zu melden. Dafür wird das Plugin [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) verwendet. Detaillierte Informationen dazu, was das Plugin macht, welche Informationen gesammelt werden und wie man es deaktivieren kann, wenn man den Autor nicht mit Informationen zu Abstürzen unterstützen möchte, finden Sie unter [Plugin-Startseite](https://github.com/ioBroker/plugin-sentry).

## Urheberrecht
Copyright (c) 2025 grizzelbee <open.source@hingsen.de>

## Changelog
### **WORK IN PROGRESS**
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Added screen size settings in Admin-UI for responsive design
- (grizzelbee) Fix: Fixed sentry MIELECLOUDSERVICE-5V

### 6.5.7 (2024-10-01)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed some minor issues found by adapter-checker
- (grizzelbee) Upd: Added tests for node 22

### 6.5.6 (2024-05-10) (Dying for an Angel)

- (grizzelbee) New: [402](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/402) Added signalDoor to Washing machines, Tumble dryer and Washer dryer
- (grizzelbee) Upd: Dependencies got updated

### 6.5.5 (2024-01-03) (Dying for an Angel)

- (grizzelbee) Upd: Added year 2024 to licence
- (grizzelbee) Upd: Dependencies got updated

### 6.5.4 (2023-05-03) (Dying for an Angel)
* (grizzelbee) New: Added file `.ncurc.json` to prevent axios-oauth-client from being automatically updated by `npx npm-check-updates`

### 6.5.3 (2023-04-26) (Dying for an Angel)
* (grizzelbee) Fix: two minor bug fixes - including a fix that prevents objects from being updated constantly.

### 6.5.2 (2023-04-21) (Dying for an Angel)
* (grizzelbee) Fix: [367](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/367) Fixed "oauth is not a function" error during startup by downgrading axios-oauth-client to v1.5.0

### 6.5.1 (2023-04-21) (Dying for an Angel)
* (grizzelbee) Fix: Some minor fixes for ioBroker adapter checker

### 6.5.0 (2023-04-18) (Dying for an Angel)
* (grizzelbee) New: added device type 74 = Hob with vapour extraction (part of Miele API v1.0.6)
* (grizzelbee) Upd: Updated ReadMe file
* (grizzelbee) Chg: Dependencies got Updated
* (grizzelbee) Chg: Important: Requires at least Node.js 14
* (grizzelbee) Chg: Changed SpinningSpeed from number to string 
* (grizzelbee) New: Added RAW-Value to SpinningSpeed 
* (grizzelbee) Chg: Changed PlateStep-xxx from number to string (related to issue [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356))
* (grizzelbee) New: Added RAW-Value to Platesteps (related to issue [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356))
* (grizzelbee) Fix: [343](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/343) GENERIC_BUSINESS_ERROR occurred when switching ventilationStep
* (grizzelbee) Fix: [356](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/356) In some cases the value 0 (zero) is ignored (e.g. at PlateStep)
* (grizzelbee) Fix: [359](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/359) Fixed "oauth is not a function" error during startup by downgrading axios-oauth-client to v1.5.0

### 6.4.0 (2022-09-07) (Dying for an Angel)
* (grizzelbee) Fix: program names get localized now
* (grizzelbee) New: moved Admin-UI to jsonConfig
* (grizzelbee) Chg: BREAKING CHANGE: removed duplicate en-/decryption of passwords due to jsonConfig
* (grizzelbee) Chg: Moved some documentation from the readme file to machine_states.md

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values
* (grizzelbee) New: Parent-Datapoint of time values will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
   - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

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