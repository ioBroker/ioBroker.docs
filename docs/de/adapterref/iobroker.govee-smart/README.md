---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.govee-smart
BADGE-stable: https://iobroker.live/badges/govee-smart-stable.svg
BADGE-Installations: https://iobroker.live/badges/govee-smart-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.govee-smart
BADGE-Test and Release: https://github.com/krobipd/ioBroker.govee-smart/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
---
# Govee Smart

Steuert Govee-WLAN-Geräte aus ioBroker: LED-Streifen, Lampen und Panels, Thermo- und Hygrometer,
Luftgüte-Monitore, Steckdosen, Batterie-Taster und Fernbedienungen sowie Geräte wie Heizer,
Luftbefeuchter, Duftspender, Wasserkocher, Eiswürfelbereiter, Ventilatoren und Luftreiniger.

Der Adapter spricht mit deinen Geräten **lokal, wann immer es geht**. Eine Lampe mit aktivierter
lokaler Schnittstelle antwortet im eigenen Netz in Millisekunden, und die Cloud darf niemals
überschreiben, was das Gerät gerade lokal gemeldet hat. Die Cloud liefert nur, was sie allein
weiß — Gerätenamen, Fähigkeiten, Szenen und Snapshots — und übernimmt die Steuerung für Geräte
ohne lokale Schnittstelle.

## Was du bekommst, je nachdem was du einträgst

Alles außer der ersten Zeile ist freiwillig. Je mehr du einträgst, desto mehr steht zur Verfügung;
trägst du nichts ein, funktioniert die lokale Steuerung trotzdem.

| Was du einträgst                    | Was der Adapter kann                                                                           |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| Nichts                              | Lampen im eigenen Netz finden und schalten: Ein/Aus, Helligkeit, Farbe, Farbtemperatur, Status |
| + Govee-API-Schlüssel               | Gerätenamen, Fähigkeiten, Szenen, Snapshots und Segmente                                       |
| + Govee-Konto (E-Mail und Passwort) | Echtzeit-Statusmeldungen von Govee: Änderungen aus der App oder am Gerät erscheinen sofort     |

Der API-Schlüssel ist kostenlos und kommt aus der Govee-Home-App. Die Konto-Anmeldung ist dieselbe,
die die App benutzt; der Adapter hört darüber nur zu und schickt keine Befehle darüber.

**Die lokale Schnittstelle muss je Gerät in der Govee-Home-App eingeschaltet werden**
(Geräte-Einstellungen → LAN Control). Ohne sie läuft das Gerät über die Cloud — das funktioniert,
dauert aber einige Sekunden je Befehl und ist von Govee mengenmäßig begrenzt.

## Einrichten

1. Adapter installieren und eine Instanz anlegen.
2. Die Instanz-Einstellungen öffnen. Die Karte **Verbindung** führt durch die drei Stufen oben und
   sagt, was läuft und was nicht — samt Anmelde-Test, der sich wirklich anmeldet und nicht nur das
   Formular prüft.
3. Verlangt Govee einen Bestätigungscode (das tut es bei einem neuen Client), fragt die Karte
   danach. Mehr ist nicht nötig: der Adapter merkt sich die Anmeldung über Neustarts hinweg, es
   werden also keine weiteren Codes verschickt.
4. Geräte erscheinen unter `devices.<modell>_<kennung>`. In der Govee-App angelegte Gruppen
   erscheinen unter `groups.`.

## Ein Problem melden

Im Reiter **Experte** des Adapters auf **Diagnose** drücken, Gerät wählen und den Knopf drücken:
Der Adapter erstellt einen Bericht, und der Browser legt ihn als Datei ab. Diese Datei an ein
GitHub-Issue anhängen — die Issue-Formulare fragen genau nach dieser Datei.

Die Geräteliste zeigt alle Geräte, erreichbar oder nicht — ein Bericht wird gerade dann gebraucht,
wenn etwas klemmt. Der Datenpunkt `diag.lastExport` je Gerät hält fest, wann der letzte Bericht
erzeugt wurde.

Der Bericht ist **anonymisiert**: Adressen, E-Mail-Adressen und Gerätenamen werden durch
gleichbleibende Marken ersetzt, Gerätekennungen gekürzt, und Zugangsdaten tauchen gar nicht erst
auf. Derselbe echte Wert bekommt innerhalb einer Datei immer dieselbe Marke — der Bericht bleibt
also nachvollziehbar, ohne etwas über dein Zuhause preiszugeben. Die Datei erklärt das in ihrem
eigenen Kopf.

Ein Bericht ist das, was ein Gerät einpflegen oder einen Fehler finden lässt, ohne dass jemand
deine Hardware braucht. Reicht er dafür nicht, liegt das am Bericht und nicht an dir — bitte sag es
im Issue.

## Wo mehr steht

Das Wiki hat die Tiefe, auf Deutsch und Englisch:

- **Einrichtung** — die drei Stufen, die lokale Schnittstelle, Bestätigungscodes, was tun, wenn ein Kanal aus bleibt
- **Verhalten** — welcher Kanal was macht, wie Erreichbarkeit entschieden wird, was bei Cloud-Ausfall passiert
- **Datenpunkte** — jeder Datenpunkt, wer ihn schreibt und was du selbst schreiben darfst
- **Szenen und Snapshots** — Szenen, DIY-Szenen, Cloud-Snapshots und lokal gespeicherte Snapshots
- **Segmente** — Segmentsteuerung, der Erkennungs-Assistent, gekürzte Streifen und manuelle Segmentlisten
- **Gruppen** — wie sich Govee-App-Gruppen hier verhalten
- **Sensoren und Geräte** — Messwerte, Ereignisse und was die Cloud-Grenzen bedeuten
- **Geräte** — jedes unterstützte Modell, erzeugt aus dem Katalog des Adapters

→ <https://github.com/krobipd/ioBroker.govee-smart/wiki>

## Gerät nicht dabei?

Schick einen Diagnosebericht, dann kommt das Modell dazu. Genau dafür gibt es ihn — der Katalog
wächst aus Nutzer-Meldungen, und niemand muss Hardware verschicken.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.35.2 (2026-09-11)

- Fixed: A light that is unplugged no longer shows as switched on after a start — Govee's answer for a device it cannot reach carries the values of the last contact, and those are no longer written

### 2.35.1 (2026-09-11)

- Fixed: The values Govee reports for a device at start no longer wait behind the loading of the scene libraries — on an installation with a dozen lights they arrived seven minutes after the start

### 2.35.0 (2026-09-11)

- New: An air purifier's mode, level and filter life follow the device's own status report — a change made in the Govee app shows in ioBroker within a second, no cloud call (H7127, #47)
- Fixed: Filter life, air quality, mode and level of an appliance are read from Govee's device-state query at start — the adapter read that answer from the wrong field since its first version (#47)
- Fixed: A light without a local connection gets its power, brightness and colour from the same query at start; Govee's empty answers no longer turn into false or blank values
- Fixed: A light without a local connection on an installation with only an API key stays reachable — the 20-minute check meant to renew it never received an answer before
- Fixed: An installation using only an API key lost its appliance commands by mid-morning — a reachability poll that never got an answer used up the device's daily budget
- Changed: An appliance's reachability is no longer polled every 20 minutes; its own status push, a command and the start-up query count instead — polling would cost 72 of its 90 daily calls
- Fixed: The diagnostics report now records mode, level, temperature and music commands with their outcome — it only listed power, brightness and colour before
- Fixed: A datapoint Govee newly reports for a device is there from the first start on — it used to disappear again and only show up after the next restart
- Fixed: The filter life of an air purifier now carries its unit (%) — Govee declares none, and the datapoint had no unit since its first version
- Changed: The DreamView switch, the music auto-colour switch and the DIY-scene selector now carry an explanation in the object tree

### 2.34.0 (2026-09-10)

- Fixed: Air purifiers, heaters, humidifiers and fans — choosing a mode or a speed now reaches the device, where the adapter used to send a value Govee rejected as "Invalid parameter type" (#47)
- Fixed: The speed selector of an air purifier now offers the levels the device actually has, instead of the single unusable entry it showed before (#47)
- Fixed: On an appliance updating from an older version the level datapoint accepts values again — it kept the selection list of the previous version and refused every write against it
- Changed: On appliances whose modes share the same level numbers — kettles, some fans and humidifiers — the level is a plain number now; a selection list could only ever show one mode's levels
- Fixed: An installation with no light at all now reads its device states at start — filter life, air quality and every other reported value stayed empty forever (#47)
- Fixed: A heater's target temperature is sent in the shape the Govee API asks for, and the datapoint is labelled in the unit the heater itself reports — a 5–30 °C heater used to read °F
- Fixed: The current speed level now arrives from the cloud together with the mode — until now only the mode updated while the level datapoint kept showing its default
- Fixed: A command the Govee cloud rejects no longer counts as successful, so the datapoint stops showing a change the device never made, and the reason is named
- New: A device's night-light scene is selectable — the adapter received the scene list and the current scene from Govee and threw both away without creating a datapoint
- Fixed: The scene dropdown's "---" entry now carries the same value the adapter writes when it resets the dropdown, so the entry stopped being rewritten on every start
- New: The H7127 air purifier is confirmed by a user report — it is no longer listed as untested and no longer asks for the experimental switch at start
- Changed: The diagnostics report no longer repeats the privacy note the export button already shows, and says instead what only the file itself can say

### 2.33.0 (2026-09-08)

- Fixed: A light without a local API stays reachable while it reports its own state — Govee's device list lagged behind the bulb and overrode it every two minutes (reported for the H600D)
- Fixed: A status message the Govee cloud replays after a reconnect no longer counts as a fresh sign of life for the next half hour
- New: The H600D GU10 smart bulb is recognised from a user report
- New: 486 more Govee models start as experimental — every model the homebridge-govee project lists as of September 2026, from bulbs and strips to fans, heaters and ice makers
- New: An experimental model is tried by enabling "experimental device support"; a diagnostics report from the Expert tab confirms it for everyone
- Changed: The wiki's device list folds each device type into one block with its counts, so 602 entries stay readable

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