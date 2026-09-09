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

### 2.33.0 (2026-09-08)

- Fixed: A light without a local API stays reachable while it reports its own state — Govee's device list lagged behind the bulb and overrode it every two minutes (reported for the H600D)
- Fixed: A status message the Govee cloud replays after a reconnect no longer counts as a fresh sign of life for the next half hour
- New: The H600D GU10 smart bulb is recognised from a user report
- New: 486 more Govee models start as experimental — every model the homebridge-govee project lists as of September 2026, from bulbs and strips to fans, heaters and ice makers
- New: An experimental model is tried by enabling "experimental device support"; a diagnostics report from the Expert tab confirms it for everyone
- Changed: The wiki's device list folds each device type into one block with its counts, so 602 entries stay readable

### 2.32.1 (2026-09-07)

- Fixed: Your devices and their recorded history no longer disappear from the object tree when the Govee cloud cannot be reached at startup

### 2.32.0 (2026-09-07)

- Fixed: In an account without a single light, every device stopped being switchable after a restart — appliances, plugs and sensors had no state and no reachability until you pressed sync devices
- Fixed: A device could stay green for up to 30 minutes after Govee had reported it offline; an arriving reading no longer overrides an explicit offline report
- Fixed: With only an API key configured, devices fell offline 30 minutes after the start although they were still controllable — the proof now renews itself without account credentials
- Fixed: Scene and snapshot commands that fell back to the cloud and failed there were still confirmed as carried out; a command that did not arrive now stays unconfirmed
- Fixed: A manually chosen segment list could only ever lengthen the learned strip and never shorten it again — the wizard's own measurement was overwritten by it
- Fixed: Under load the adapter stopped counting appliance commands against their daily limit, so a heater or humidifier could burn through its Govee quota and stop responding
- Fixed: On a device model the adapter does not know yet, the tier datapoint told the user to press a button that 2.31.0 had already removed from the admin page
- Fixed: Without account credentials, a group from the Govee app grew an empty entry in the object tree on every restart; it now appears only once its members are actually known
- New: Datapoints carry an explanation in all 11 languages wherever the name alone does not say enough — 99 of them instead of 26
- Changed: The adapter can no longer be installed directly from GitHub — install it from the ioBroker repository or from npm, as with every other adapter

### 2.31.1 (2026-09-04)

- Fixed: When the adapter met a device model it does not know yet, its log asked the user to press a button that 2.31.0 had removed — it now points at the Expert tab, where the report is actually made

### 2.31.0 (2026-09-03)

- Fixed: On instances upgraded from 2.27.0 or newer, every admin card was dead — diagnostics, segment wizard and connection test alike; affected installations repair themselves on the next start
- Fixed: A card that could not reach the adapter reported "no devices yet" instead of the real error
- Changed: Segment detection and diagnostics now share one **Expert** tab with a button each
- Changed: The per-device `diag.export` button is gone; the Expert tab builds the report and hands you the file in one press
- Changed: `diag.lastExport` now records WHEN the last report was taken, instead of naming the file
- Improved: Both cards say "Loading devices …" while they search, and explain the wait if it takes long
- Fixed: The diagnostics report still described the reachability rule as it was before 2.30.0

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