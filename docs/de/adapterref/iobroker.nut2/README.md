---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.nut2
BADGE-stable: https://iobroker.live/badges/nut2-stable.svg
BADGE-Installations: https://iobroker.live/badges/nut2-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.nut2
BADGE-Test and Release: https://github.com/krobipd/ioBroker.nut2/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"de/adapterref/iobroker.nut2/README.md":{"title":{"de":"ioBroker.nut2 — Einrichtung"},"content":"de/adapterref/iobroker.nut2/README.md"},"de/adapterref/iobroker.nut2/datapoints.md":{"title":{"de":"Datenpunkte"},"content":"de/adapterref/iobroker.nut2/datapoints.md"},"de/adapterref/iobroker.nut2/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.nut2/faq.md"}}}
---
# ioBroker.nut2 — Einrichtung

Dieser Adapter liest unterbrechungsfreie Stromversorgungen über einen **NUT-Server** (Network UPS Tools). Er spricht
nie direkt mit der USV: Die USB- oder Netzwerkverbindung zur Hardware gehört dem NUT-Server, der Adapter ist einer
seiner Clients. Deshalb beginnt jede Einrichtung auf dem Rechner, an dem die USV hängt.

Die README ist die Kurzfassung. Diese Seite geht eine vollständige Einrichtung durch.

## 1. Sicherstellen, dass ein NUT-Server läuft

Es braucht einen Rechner, auf dem `upsd` läuft und mindestens eine USV eingerichtet ist — ein Linux-Host, ein NAS
(Synology, QNAP und UGREEN bringen NUT mit) oder ein Raspberry Pi mit der USV am USB.

Auf diesem Rechner prüfen:

```bash
upsc -l                 # listet die USV-Namen, z. B. "ups0"
upsc ups0               # zeigt alle Werte dieser USV
```

Gibt `upsc -l` nichts aus, liegt das Problem auf der NUT-Seite und der Adapter kann nicht helfen — zuerst den Treiber
in Ordnung bringen (`/etc/nut/ups.conf`, danach `upsdrvctl start`).

## 2. Den Server für den Adapter erreichbar machen

`upsd` lauscht nur auf localhost, solange man ihm nichts anderes sagt. In `/etc/nut/upsd.conf`:

```
LISTEN 0.0.0.0 3493
```

Danach `upsd` neu starten. Port `3493/TCP` muss zwischen ioBroker-Host und NUT-Server offen sein.

Viele NAS-Systeme betreiben NUT in einem „USV-Server"-Modus mit einer eigenen Freigabeliste in der Weboberfläche — die
IP-Adresse des ioBroker-Hosts muss dort eingetragen sein.

## 3. Einen Benutzer anlegen (optional, aber empfohlen)

Zum Lesen der Werte braucht es überhaupt keine Anmeldung. Ein Benutzer wird nur für zwei Dinge gebraucht: die USV
schalten (Befehle) und Variablen schreiben. Eintrag in `/etc/nut/upsd.users`:

```
[iobroker]
    password = etwas-langes-waehlen
    upsmon secondary
    actions = SET
    instcmds = ALL
```

Zwei Zeilen mit verschiedenen Aufgaben:

- `upsmon secondary` ist das, was eine **Anmeldung** überhaupt möglich macht. Der Adapter meldet sich einmal beim Start
  an, auf einer kurzen zweiten Verbindung, ausschließlich um Ihnen zu sagen, ob die Zugangsdaten funktionieren. Ohne
  diese Zeile wird die Anmeldung abgelehnt — siehe die häufigen Fragen, das ist kein Fehler.
- `actions` und `instcmds` entscheiden, was der Benutzer tatsächlich **tun** darf. `upsd` prüft sie je Befehl,
  unabhängig von der Anmeldung.

Nach dem Bearbeiten `upsd` neu starten.

## 4. Instanz in ioBroker anlegen

Adapter installieren, Instanz anlegen, Reiter **Verbindung** ausfüllen:

| Einstellung           | Was hineingehört                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| NUT-Server-Adresse    | Hostname oder IP des Rechners, auf dem `upsd` läuft                                                       |
| Port                  | `3493`, sofern nicht geändert                                                                             |
| Netzwerkschnittstelle | Auf „alle" lassen, außer der ioBroker-Host hängt in mehreren Netzen und nur eines erreicht den NUT-Server |
| Abfrageintervall      | `15` Sekunden sind ein guter Ausgangswert — siehe unten                                                   |
| Benutzer / Passwort   | Der Benutzer aus Schritt 3, oder leer lassen für reine Überwachung                                        |

**Verbindung testen** drücken. Die Antwort benennt, was wirklich geprüft wurde: ob die Verbindung verschlüsselt ist,
wie viele USVen der Server anbietet und — wenn Zugangsdaten eingetragen sind — ob die Anmeldung akzeptiert wurde.

Danach speichern. Der Adapter verbindet sich, erkennt jede USV am Server und legt die Datenpunkte an.

### Wie oft sollte abgefragt werden?

Schneller als der NUT-Treiber seine Daten auffrischt, bringt nichts. In `/etc/nut/ups.conf` hat der Treiber zwei
Einstellungen: `pollinterval` (wie oft der Status aufgefrischt wird, Vorgabe 2 s) und `pollfreq` (der ganze Wertesatz,
Vorgabe 30 s bei USB-Treibern). Alle 15 Sekunden ist ein sinnvoller Mittelweg; unter 2 Sekunden liest der Adapter nur
noch Werte erneut, die sich nicht geändert haben.

Wer von einem Stromausfall _im Moment des Geschehens_ erfahren will statt beim nächsten Abruf, senkt nicht das
Intervall, sondern nutzt die Ereignis-Klingel aus den häufigen Fragen.

## 5. Die Verbindung verschlüsseln (optional)

Ohne TLS gehen Benutzername und Passwort im Klartext über das Netz. Wenn das in Ihrer Umgebung zählt: `upsd` kann mit
TLS-Unterstützung gebaut werden und bietet dann **STARTTLS**:

1. Am Server `CERTFILE` (oder `CERTPATH`) in der `upsd.conf` einrichten.
2. Im Adapter **TLS verwenden (STARTTLS)** anhaken.

In der Voreinstellung prüft der Adapter das Zertifikat nicht — das verschlüsselt gegen Mitlesen, erkennt aber keinen
Mann-in-der-Mitte, weil fast jeder NUT-Server ein selbstsigniertes Zertifikat verwendet.

Für echten Schutz zusätzlich **Gültiges Zertifikat verlangen** anhaken und bei **CA-Zertifikatsdatei** eine PEM-Datei
auf dem ioBroker-Host angeben, gegen die geprüft werden kann — die eigene Zertifizierungsstelle oder das
selbstsignierte Serverzertifikat selbst. Die Datei wird nur gelesen, solange die strenge Prüfung an ist; ein Pfad, der
von einem früheren Versuch übrig geblieben ist, schadet nicht.

Wurde der NUT-Server ohne TLS gebaut, sagt der Verbindungstest das, statt still auf Klartext zurückzufallen.

## 6. Die USV aus ioBroker schalten (optional)

Zwei Schalter im Reiter **Erweitert** öffnen die Schreibrichtung, beide sind bewusst aus:

- **Befehle aktivieren** legt je Befehl, den die USV anbietet, eine Taste an (Signalton, Selbsttest, Last abschalten …).
  Der Kanal `commands` erscheint erst, wenn das an ist **und** Zugangsdaten hinterlegt sind — `upsd` prüft
  Befehlsrechte gegen einen benannten Benutzer.
- **SET VAR aktivieren** macht die USV-Variablen, die der Server als schreibbar meldet, auch in ioBroker schreibbar.

Beides braucht die passenden Rechte in der `upsd.users` (Schritt 3). Mit den Last-Befehlen vorsichtig umgehen:
`load.off` nimmt allem den Strom, was an der USV hängt.

## Wie es weitergeht

- [Datenpunkte](/#/docs/adapterref/iobroker.nut2/datapoints.md) — was der Adapter anlegt und was die einzelnen Teile bedeuten.
- [Häufige Fragen](/#/docs/adapterref/iobroker.nut2/faq.md) — unter anderem sofortige Ereignis-Meldungen über `upsmon`.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.15.1 (2026-09-07)

- New: ten more data points explain themselves — the battery date, the UPS's own clock, the three driver versions, the UPS identifier, the UPS type and the USB vendor and product IDs
- Fixed: the battery maintenance date is the date of the NEXT change or service, not of the last one — its name said the opposite in all eleven languages
- Improved: setting up the upsmon trigger is one line in upsmon.conf instead of a shell script, and points at the rest-api adapter; the older simple-api path stays documented

### 0.15.0 (2026-09-07)

- Fixed: a data point no longer holds a value of the wrong kind — a reading that stops matching the data point's type is discarded with one warning instead of being written into it
- Fixed: a NUT server that is switched off or restarting no longer makes the instance look broken — the adapter names the server it cannot reach and keeps retrying
- Fixed: value limits taken from the UPS disappear again when the UPS stops reporting them, instead of standing forever and causing warnings about every value outside them
- Fixed: credentials containing a space are now refused with an explanation instead of a bare protocol error nobody can act on
- Fixed: enabling instant commands now says why no command buttons appear when the UPS does not answer the command list
- Fixed: a UPS variable without a dot in its name is now writable, and can no longer take over one of the adapter's own channels
- Fixed: over a third of the data points carried an English label in every language — 157 more variable names are now translated into all eleven
- Fixed: the phases of a three-phase UPS, the sensors of a multi-sensor probe and the individual outlets no longer all share one name — each keeps the marker that says which one it is
- Fixed: the outlet buttons of a PDU are now named and explained like every other command instead of showing their raw NUT name
- New: explanations for the battery voltage, battery temperature, battery health and input current, which stood without one next to explained siblings

### 0.14.0 (2026-09-04)

- Fixed: a certificate file left over in the settings no longer stops the adapter — it is only read while strict certificate checking is actually switched on
- Fixed: value lists of writable data points stay in your language instead of falling back to the raw NUT wording after the first poll
- Fixed: the connection test no longer reports an error when only the credentials are refused — it says so and confirms that reading works, matching what the adapter does
- Fixed: the connection test now answers in your language when something goes wrong, not only when it succeeds
- Fixed: a UPS that disappears from the NUT server and comes back gets its manufacturer and model name again instead of keeping the bare UPS name
- Fixed: renamed data points of the adapter itself now reach existing installations instead of only new ones
- Fixed: enabling instant commands without credentials no longer fails silently — the adapter now explains why no command buttons are created
- New: detailed user documentation in English and German is now part of the repository and shown in the ioBroker documentation portal

### 0.13.0 (2026-09-02)

- New: every data point now carries a short explanation in your language — what it means, not just what it is called
- New: status text, severity levels and selection lists are shown in your language instead of English
- Changed: wrong credentials no longer stop the monitoring — the adapter warns, keeps reading the UPS values, and only refuses commands and writable variables
- Fixed: during a power failure, machines protected by the same UPS now shut down without waiting for this adapter
- Fixed: a countdown that is not running is now empty instead of showing "-1 seconds", on every UPS brand
- Fixed: model and other text values no longer carry the padding some UPS models send along
- Fixed: channel names from older adapter versions are corrected instead of staying as they were
- Fixed: the connection test answers in your language now, like the rest of the settings page

### 0.12.1 (2026-09-02)

- Fixed: the "Test connection" button in the settings stayed silent — clicking it produced no result at all. It answers again, on every instance updated from 0.9.0 or later

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

_Developed with assistance from Claude.ai_