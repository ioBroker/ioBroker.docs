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

### 2.41.0 (2026-09-26)

- Changed: Discovery follows the selected network interface only — the additional scan addresses setting is gone, and the broadcast goes to the network of the chosen card
- Fixed: `info.cloudConnected` turns false while the Govee Cloud stays unreachable and true again with its next answer — until now only a rejected API key cleared it

### 2.40.0 (2026-09-25)

- New: Optional additional scan addresses — lights in another subnet or behind a router that blocks multicast are found by asking them directly
- New: Heaters with an auto-stop setting get `control.auto_stop` — stop heating at the target temperature or keep it
- New: Models that report the cloud temperature in °F are converted to °C — the H5179 by default, 14 further models with the experimental switch
- Fixed: Cloud events such as lack of water, presence or a full ice bucket now reach their datapoints — until now none did
- Fixed: The segment count of strips that report in groups of three is measured correctly — H61A8 and H7020 no longer grow phantom or lose real segments
- Fixed: A strip nothing had measured yet accepts segment commands, uses its scenes over LAN and works in the wizard and in snapshots
- Fixed: A device the account still lists is no longer deleted when the cached device list misses it
- Fixed: A fresh account login is kept for the next reconnect, and successful logins are capped per hour — repeated logins can make Govee lock the account for 24 hours
- Fixed: After an account change the saved login of the previous account is no longer reused
- Fixed: Dropdowns send the value Govee declared, and a LAN light's colour-temperature range follows what the device reports
- Fixed: Group music plays the same mode on every member, and a member without music or without the scene no longer counts as reached
- Fixed: A Govee snapshot is activated by its name — reordering snapshots in the app no longer triggers the wrong one
- Fixed: A command that could not be sent is no longer confirmed, and a day whose cloud budget is spent refuses commands instead of queueing them until midnight
- Fixed: With the account connected, lights are still asked for their status once a minute and after every LAN command, so a lost command is corrected
- Fixed: Port 4002 taken by another program is now reported instead of silently losing the lights' replies, and `info.connection` turns false when the last device goes quiet
- Improved: Leftovers of very old versions, including emptied login fields, no longer linger in the instance settings — expect one extra restart right after the update
- Fixed: Stopping the adapter during its start no longer leaves parts of it running, and a message sent during the start is answered
- Fixed: The segment wizard is cancelled when you leave the card, and the connection card shows Govee's reason instead of a raw text key
- Fixed: The diagnostics report hides Govee account topics and the device's LAN address in number form, and a device name only replaces whole words
- Improved: Temperature, humidity, battery, air quality and filter life carry translated names — the cloud path wrote Govee's English wording in every language
- Improved: Bluetooth-only models are no longer listed as supported, and the Wi-Fi meat thermometer H5610 was added

### 2.39.2 (2026-09-22)

- Fixed: App groups are no longer asked for a device state at every start — Govee answered each call with an error that only filled the diagnostics report
- Fixed: A scene request Govee refuses is no longer taken as "no scenes" — the cached scenes and snapshots stay, and the report names the reason once

### 2.39.1 (2026-09-22)

- Fixed: The diagnostics report no longer contains your Wi-Fi network name, the Govee app's device number or a group's id — they appeared in clear in every exported file
- Improved: The diagnostics report keeps Govee's complete account-list entry and shows commands waiting for an offline device and when the adapter started

### 2.39.0 (2026-09-22)

- New: A device that has gone quiet is asked for its status over the Govee account connection — a bulb or purifier that works but showed as unreachable now stays reachable
- Improved: The cloud budget follows Govee's per-device limits — a command for one light no longer waits for another light's calls or for library downloads
- New: A command Govee refused because the device was offline is delivered once the device reports back (within five minutes), instead of being lost
- Fixed: Scenes and libraries that arrived after a busy start now reach the scene dropdown and the cache — they used to stay at `---` and were fetched again on every start
- Fixed: A scene list that shrank no longer leaves withdrawn scenes in the dropdown
- Fixed: The diagnostics report no longer lists a reachability refresh for appliances, which never get one
- New: 28 more Govee models are recognised — meat thermometers, motion and pressure sensors, heaters, kettles, a composter and the gateways that carry battery sensors
- New: H1771 Table Lamp reported working by a user

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