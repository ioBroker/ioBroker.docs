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

### 2.37.1 (2026-09-15)

- Fixed: The instance settings open on the Configuration tab again also when the admin keeps its settings on the server — 2.37.0 handled the browser storage only, so every open still landed on Expert

### 2.37.0 (2026-09-15)

- Changed: The two folders "snapshots" and "diagnostics" at the top of the object tree are gone — a saved local snapshot is kept with its device, and no diagnostics report is stored any more
- Changed: A diagnostics report is generated and downloaded from the Expert tab only — the adapter keeps no copy in the instance, and the copies left by earlier versions are removed at the first start
- Changed: Local snapshots saved by earlier versions are carried over into their device objects at the first start, so nothing you saved is lost when the folder disappears
- Fixed: The instance settings open on the Configuration tab again — the admin remembered the last tab you used, and once you had visited the Expert tab every later visit started there
- Fixed: The device icons in the object tree are visible on the dark themes again — they were drawn in plain black, invisible on a dark background, and now take the row's text colour
- Fixed: A group's "membersUnreachable" datapoint is created together with the group — it used to appear only with the first reachability check, up to 20 seconds after the rest of the group
- Changed: The admin warns when another adapter on the same host takes the LAN port 4002 — the port shows as a fixed field in the adapter settings next to the network interface

### 2.36.0 (2026-09-14)

- Fixed: A command the adapter could not send is no longer confirmed — no cloud connection, or a light reachable on neither channel — the datapoint used to claim the device had taken the value
- Fixed: Music sensitivity and auto-colour are no longer confirmed on a light or group that cannot apply them — the datapoint keeps the old value and the log says why, instead of claiming success
- Fixed: The segment wizard restores the brightness the strip had before it ran — it turns the strip to full while measuring, and a dimmed strip stayed bright afterwards
- Fixed: The segment wizard no longer stays locked for five minutes when the strip cannot be reached at start — it stops with the reason, and can be started again right away
- Fixed: Sensor values update again on an installation that removed its API key but kept the Govee account — they had frozen at the last reading, and the adapter took a minute to report ready
- Changed: A sensor reading that has not changed is no longer written again every two minutes — the datapoint keeps its timestamp until the value itself changes
- Changed: The three summary datapoints under `info` exist right after the start instead of appearing twenty seconds later
- New: Seven datapoints real devices report now carry a translated name — main light, background light, fan, fan speed, reverse airflow, pillar light and base light
- New: Explanations where the name alone does not say it — reverse airflow, pillar and base light, warm mist, the preset-scene dropdown and the unreachable members of a group

### 2.35.2 (2026-09-11)

- Fixed: A light that is unplugged no longer shows as switched on after a start — Govee's answer for a device it cannot reach carries the values of the last contact, and those are no longer written

### 2.35.1 (2026-09-11)

- Fixed: The values Govee reports for a device at start no longer wait behind the loading of the scene libraries — on an installation with a dozen lights they arrived seven minutes after the start

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