---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.omoda/README.md
title: ioBroker.omoda
hash: A9vHKEqmtsrZqWaz5ie+qeb/ZUIFhwzOWRk0TnruWsg=
---
![Logo](../../../en/adapterref/iobroker.omoda/admin/omoda.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.omoda.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.omoda.svg)
![Anzahl der Installationen](https://iobroker.live/badges/omoda-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/omoda-stable.svg)
![NPM](https://nodei.co/npm/iobroker.omoda.png?downloads=true)

# IoBroker.omoda
**Tests:** ![Test und Freigabe](https://github.com/AlanSRU/ioBroker.omoda/workflows/Test%20and%20Release/badge.svg)

## Omoda-Adapter für ioBroker
Integriert Ihr **Omoda / Jaecoo**-Auto in ioBroker: Fahrzeugstatus, GPS-Standort, Batterie-/Ladezustand sowie Fernverriegelung und Klimatisierung – unter Verwendung desselben Cloud-Backends wie das offizielle [Omoda / Jaecoo App](https://www.omoda.com/).

⚠️ **Inoffizielle, durch Reverse Engineering entwickelte Software.** Steht in keiner Verbindung zu Omoda, Jaecoo oder Chery und wird von diesen Unternehmen weder unterstützt noch empfohlen. Die Software wird ohne Gewährleistung bereitgestellt. Die Nutzung erfolgt auf eigene Gefahr und nur auf Ihrem eigenen Fahrzeug. Namen und Marken gehören ihren jeweiligen Eigentümern. Siehe [LIZENZ](LICENSE).

### Was es bewirkt
- **Status** — Türen, Fenster, Schiebedach, Schloss, Motor, Klimaanlage läuft, Reifendruck/Reifentemperatur.
- **Standort** — GPS-Breiten-/Längengrad, Geschwindigkeit, Kurs.
- **Batterie & Laden** — Ladezustand, elektrische/Gesamtreichweite, Ladezustand, Ladeleistung,

Ladestecker angeschlossen, verbleibende Ladezeit.

- **Befehle** — Verriegeln/Entriegeln, Klimaanlage ein/aus mit einstellbarer Zieltemperatur, GPS-Anfrage

Standort und „Wake & Refresh Full Status“.

Zusätzliche Funktionen der Fahrzeug-App (individuelle Sitzheizung/-belüftung, Entfroster, Start/Stopp des Ladevorgangs von Elektrofahrzeugen und geplantes Laden, Steuerung von Fenstern/Schiebedach/Kofferraum, Diebstahlalarm) sind für eine spätere Version geplant.

### Anforderungen
- Ein **Omoda / Jaecoo Konto** mit dem zugehörigen Fahrzeug (Zugriff für Eigentümer oder Bevollmächtigte).
- Die **E-Mail-Adresse** und die **Befehls-PIN** des Kontos.
- Region: Standardmäßig **Europa** (funktioniert auch in Großbritannien). Andere Märkte sind möglich.

Konfiguriert unter **Region & Polling** in den Adaptereinstellungen.

**Tipp:** Erwägen Sie die Verwendung eines **delegierten zweiten Kontos** für den Adapter. Wenn Sie sich hier und in der offiziellen App mit demselben Konto anmelden, werden Sie ständig gegenseitig abgemeldet.

### Aufstellen
1. Installieren Sie den **Omoda/Jaecoo**-Adapter über die Registerkarte **Adapter** im ioBroker-Adminbereich und erstellen Sie einen neuen Adapter.

ein Beispiel.

2. Geben Sie auf der Registerkarte **Konto** Ihre **E-Mail-Adresse** und Ihre **Befehls-PIN** ein und speichern Sie.
3. Klicken Sie auf der Registerkarte **Anmelden (OTP)** auf **OTP-Code anfordern** – Ihnen wird ein Einmalcode per E-Mail zugesendet.
4. Geben Sie den Code ein und drücken Sie **OTP bestätigen**. Der Adapter meldet sich an und erkennt Ihr(e) Fahrzeug(e).

Erstellung eines Geräts pro Fahrgestellnummer gemäß `omoda.0.<VIN>`.

Ein neues OTP ist nur dann erforderlich, wenn die Sitzung später abläuft (in der Regel, weil die offizielle App geöffnet wurde); andernfalls wird die Sitzung automatisch aktualisiert.

### Hinweise und Sicherheit
Die **Befehls-PIN** ist Ihre Konto-PIN. Die wiederholte Eingabe einer **falschen PIN** kann zur Kontosperrung führen.

Konto**, daher stoppt der Adapter nach ein paar fehlgeschlagenen Versuchen – überprüfen Sie die PIN in den Einstellungen erneut, bevor Sie es erneut versuchen.

- Viele Werte werden im Standby-Modus als „null“ angezeigt; Batterie-, Geschwindigkeits- und Kilometerstandaktualisierungen erfolgen während

**während der Fahrt oder des Ladevorgangs**, oder nach dem Drücken von **Vollständigen Status aktualisieren** (wodurch das Auto kurzzeitig aufgeweckt wird).

- Das Aufwecken des Autos ist vom Backend **begrenzt**, daher erzwingt der Adapter eine Abkühlphase.
Die MQTT-Telemetrieverbindung verwendet **Mutual TLS**. Das Client-Zertifikat/Schlüsselmaterial und das

Die fest zugeordnete Zertifizierungsstelle (CA) wird zusammen mit dem Adapter in `data/certs-store.json` (verschlüsselt, wie von der Upstream-HA-Integration wiederhergestellt) ausgeliefert, sodass der Adapter offline ohne erneute Bereitstellung funktioniert. Sollte Chery die MQTT-CA- oder Client-Zertifikate jemals rotieren, muss diese Datei neu generiert und eine neue Adapterversion veröffentlicht werden – bis dahin ist keine Telemetrieverbindung möglich.

## Credits
Dieser Adapter ist eine Portierung der hervorragenden Reverse-Engineering-Arbeit von **Caslinovich** und **JackRonan** im Rahmen der Home-Assistant-Integration **[omoda-jaecoo-ha](https://github.com/JackRonan/omoda-jaecoo-ha)**. Die Protokollkonstanten, Formeln zur Anforderungssignierung, die Ableitung von MQTT-Anmeldeinformationen und die Endpunktrezepte wurden von ihnen wiederhergestellt und werden hier unter der MIT-Lizenz verwendet – ohne ihren Einsatz gäbe es dieses Projekt nicht. Bitte markieren Sie das Originalprojekt mit einem Stern und unterstützen Sie es. Alle Fehler in dieser ioBroker-Portierung gehen auf mein Konto, nicht auf das der Entwickler.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-08-10)
* (Alan Paris) **BREAKING:** `commands.lock` now follows the ioBroker `switch.lock` spec — **true UNLOCKS** the car, false locks it. Any script writing `true` to lock must be inverted. This is the polarity Alexa/Google (via ioBroker.iot), VIS lock widgets and type-detector already assume, so the old behaviour unlocked the car when the user asked to lock it
* (Alan Paris) Fixed telemetry fields the car reports as `null` being stored as real values: `doors.locked` no longer reads "locked" when nothing was reported, and GPS no longer jumps to latitude/longitude 0
* (Alan Paris) `info.connection` now returns to false when the session expires (e.g. the official app logs in on the same account) instead of staying true while every poll silently failed
* (Alan Paris) Corrected the "Dept ID" help text in all 11 languages — the default is 44 (UK), not 39
* (Alan Paris) The OTP code is now encrypted at rest, not only marked protected
* (Alan Paris) `location.heading` uses a plain `value` role (`value.direction` is an up/down/opening enum, not a compass bearing)
* (Alan Paris) Car MQTT reconnects back off from 10 s to 2 min and stop repeating the same warning, instead of retrying every 10 s forever when the broker keeps rejecting us
* (Alan Paris) The captcha solver yields to the event loop, so it can no longer stall other adapters sharing a compact host process
* (Alan Paris) Removed unused constants, token-store helpers and the placeholder test file
* (Alan Paris) Default "Dept ID" is now 44 (UK) instead of 39 (IT) — existing instances keep the value they already have (upstream 37f8f2b)
* (Alan Paris) Fixed a stale "charge remaining time": the field vanishes from the payload when charging ends, so the state now clears instead of showing the last value for hours (upstream a0f61ed)
* (Alan Paris) Command confirmations no longer cry "check failed" when the car reports only the climate module — the backend includes it on nearly every successful OFF command (upstream 2cc7d56)
* (Alan Paris) Backend rejections caused by vehicle permissions or a malformed request (A00374/A00554/A00567/A00604/A00643/A00757) no longer count towards the wrong-PIN anti-lockout (upstream 8aa4176)
* (Alan Paris) Correct state roles for info.model and info.brand; account email marked as protected
* (Alan Paris) The charging/driving fast-follow poll now self-schedules, so a slow probe can no longer overlap the next one

### 0.1.1 (2026-07-18)
* (Alan Paris) Security: never log the VIN or MQTT user id in cleartext (masked to a short suffix)
* (Alan Paris) Fixed a leak of the car MQTT client and polling timers when re-logging in after a session drop
* (Alan Paris) Added credit to the upstream Home Assistant integration (JackRonan/omoda-jaecoo-ha) in the README and LICENSE
* (Alan Paris) Added full admin UI translations for all 11 languages
* (Alan Paris) Config: clearer "Dept ID" help — it must match your account country's dialing code (UK=44, IT=39, …)
* (Alan Paris) Require Node.js >= 22 and admin >= 7.6.17; enabled automated npm publishing via trusted publishing (OIDC)
* (Alan Paris) Marked the OTP code as protected; various adapter-checker compliance fixes

### 0.1.0 (2026-07-18)
* (Alan Paris) initial release

## License
MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

Portions Copyright (c) 2026 Caslinovich and the omoda-jaecoo-ha contributors (JackRonan),
ported from https://github.com/JackRonan/omoda-jaecoo-ha (MIT) and retained under its terms.

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