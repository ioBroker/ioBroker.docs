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

Alles ist freiwillig: ohne Eintrag findet und schaltet der Adapter die Lampen im eigenen Netz lokal;
ein kostenloser Govee-API-Schlüssel bringt Namen, Fähigkeiten, Szenen, Snapshots und Segmente; das
Govee-Konto bringt Echtzeit-Status — was jede Stufe im Einzelnen bringt, steht auf der Wiki-Seite
[Einrichtung](https://github.com/krobipd/ioBroker.govee-smart/wiki/Einrichtung).

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
4. Geräte erscheinen unter `devices.<modell>-<kennung>` — das Modell und die letzten vier Zeichen
   der eigenen Kennung des Geräts, zum Beispiel `devices.h61be-525f`. Enden zwei Geräte eines Modells
   auf dieselben vier Zeichen, bekommt das zweite seine ganze Kennung. In der Govee-App angelegte
   Gruppen erscheinen unter `groups.`.

## Umstieg von 2.x

Version 3.0.0 gibt jedem Gerät einmal eine neue Objekt-ID: aus `devices.h61be_525f` wird
`devices.h61be-525f`, mit Bindestrich wie bei den anderen Geräte-Adaptern dieses Entwicklers. Der
Umzug passiert beim ersten Start von selbst: Werte, Aufzeichnungs-Einstellungen, Räume, Funktionen
und Aliase ziehen mit, aufgezeichnete Verläufe laufen in ihrer bisherigen Reihe weiter. Skripte und
Visualisierungen mit den alten IDs müssen angepasst werden.

## Ein Problem melden

Im Reiter **Experte** des Adapters auf **Diagnose** drücken, Gerät wählen und den Knopf drücken:
Der Adapter erstellt einen Bericht, und der Browser legt ihn als Datei ab. Diese Datei an ein
GitHub-Issue anhängen — das Formular für Geräte-Unterstützung fragt genau nach dieser Datei.

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

### 3.1.1 (2026-10-01)

- Fixed: a cloud command that fails because the Govee server name cannot be resolved is sent again within 10 seconds instead of being lost after one try
- Fixed: after a failed command the light's real state is read back right away, so its datapoint no longer stays on the wrong value — also without a Govee account
- Fixed: calls that never reached Govee (DNS or connection errors) no longer use up the daily budget, so an appliance is not blocked for the rest of the day
- Fixed: a group command that only some of its lights took now names the lights that did not switch and why, so a dark light no longer goes unnoticed
- Improved: connection errors in the log are written in plain words, e.g. that the Govee server name could not be resolved and the DNS is the likely cause

### 3.1.0 (2026-10-01)

- Fixed: a rejected background token refresh of the Govee account now counts toward the login protection and asks to check email/password instead of retrying silently
- Fixed: "Test login" in the connection card counts toward the account's login limit (3 per hour) and says when the next test is possible
- Fixed: segment colours and brightness are confirmed only after the command went out — a refused Cloud command no longer leaves them acked
- Fixed: stopping the adapter while it is still starting really stops it — it no longer goes on to search the network or log in to your Govee account afterwards
- Fixed: a light found on the network before the saved data loads keeps its scene speed and remembered libraries after a restart
- Fixed: a group offers only the colour temperatures every member supports, so no member is sent a value outside its range
- Fixed: when Govee no longer accepts the account session, scene, music and DIY libraries, snapshots and groups ask for a fresh login instead of reading as empty
- Fixed: a Cloud rate limit or rejected API key is reported once, with the real waiting time — no longer three times or with a wrong retry hint
- Fixed: moving a 2.x device tree to its new id no longer loses recordings or room assignments when the move fails or is interrupted
- Fixed: a light whose scene library has not loaded yet keeps its `scenes.scene_speed` datapoint, value and recording — a start without saved data deleted and re-created it
- Improved: a restart leaves the object tree untouched when nothing changed, so scripts and history that watch object changes no longer see needless updates
- Fixed: a mode or level dropdown only takes a value the device declares — a fan speed no longer shows `50`, an air purifier's level no longer `0` in Auto mode
- Fixed: the manual device sync after a failed start shows the Cloud connected and stops the pending retry; a device it adds gets its first values without a log warning
- Fixed: a Govee e-mail or password of spaces only counts as not entered — at start, in the sensor hint and in the connection card's test
- Fixed: the refresh button of a light keeps its scene list across restarts and corrects a wrong segment count; devices that are not lights no longer use up Cloud calls
- Fixed: a temperature reading carries °C whichever way it arrives — a model that declares Fahrenheit no longer flips the unit to °F (the value is always °C)
- Fixed: a segment colour above 255 is sent as 255 — it wrapped to 0 before; a segment brightness is rounded like the light's brightness
- Improved: a lamp that is unplugged or unreachable on your network leaves one warning in the log instead of a new warning for every command you send to it
- Fixed: a group that is switched off or set to a colour clears its scene and music dropdowns the same way a single light already does
- Fixed: a heater that declares no temperature unit shows none instead of an invented °F; a command delivered after the device came back shows the value that was sent
- Fixed: an untested model without catalog corrections no longer warns to turn on the experimental switch — it works as it is; the log only asks for a diagnostics report
- Fixed: the settings describe the experimental switch for what it does — it turns on the catalog corrections of untested models; every device appears without it
- Improved: after you press the device sync or the refresh button, the log tells you what it found, for example which new devices were added to the object tree
- Fixed: the connection card words every answer in the admin's language — a full login window shows the time on your own clock, and a repeated login test no longer claims a code was just requested
- Fixed: the music mode read from Govee's state answer showed the mode at that position instead of the reported one; a mode the device never declared is no longer written
- Fixed: the segment detection wizard no longer counts a dark segment at the end when the measurement runs all the way to the longest strip Govee supports
- Improved: appliance modes and levels and the device type show readable names in your ioBroker language; scripts may still write the names Govee uses, such as Auto

### 3.0.1 (2026-09-27)

- Improved: the note the Admin shows before an update to 3.x is short now: the warning, one example old → new and a link to the details

### 3.0.0 (2026-09-26)

- Changed: every device gets a new object ID once — model and last four characters with a hyphen, e.g. `devices.h61be-525f`; scripts and visualizations need the new IDs
- Changed: the move carries values, recording settings, rooms, functions and aliases along, and recorded history continues in its old series
- Fixed: two devices of one model whose IDs end alike now get a tree each and each receives its own commands — until now they shared one
- New: the H1741 battery table lamp reports its charge level in `sensor.battery`; Govee reports a fully charged battery as about 80 percent
- Fixed: fans and heaters with a numeric level (H7102, H7130) store it as a number, and the H7121 no longer puts a warning in the log at every refresh

### 2.41.0 (2026-09-26)

- Changed: Discovery follows the selected network interface only — the additional scan addresses setting is gone, and the broadcast goes to the network of the chosen card
- Fixed: `info.cloudConnected` turns false while the Govee Cloud stays unreachable and true again with its next answer — until now only a rejected API key cleared it

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