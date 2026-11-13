---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.fb-guard.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fb-guard.svg
BADGE-Number of Installations: https://iobroker.live/badges/fb-guard-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/fb-guard-stable.svg
BADGE-Test and Release: https://github.com/Flyor/ioBroker.fb-guard/workflows/Test%20and%20Release/badge.svg
---
![Logo](../../admin/fb-guard.png)
# ioBroker.fb-guard

Überwacht die Sicherheit deiner [FRITZ!Box](https://fritz.com) und meldet sich per Telegram oder E-Mail, wenn etwas auffällt.

## Wozu

Wer in die Oberfläche deiner Box kommt, hat das ganze Heimnetz in der Hand: Portfreigaben, DNS, Telefonie, VPN-Zugänge. Das kann über ein erratenes oder abgegriffenes Kennwort passieren, über eine Sicherheitslücke in der Firmware oder über eine Freigabe, die vor Jahren eingerichtet und vergessen wurde. Die Box schreibt das meiste davon ins Ereignisprotokoll, aber dort liest es niemand, und warnen tut sie nicht.

fb-guard liest es für dich. Gemeldet werden fehlgeschlagene und unerwartete Anmeldungen an der Box selbst (Oberfläche, Fernzugang, Apps, TR-064) und getrennt davon Geräte, die mit falschem Schlüssel ins WLAN wollen. Dazu prüft er die Einstellungen, die einen Angriff leichter machen.

## Was geprüft wird

- **Fehlgeschlagene Anmeldungen** aus dem Ereignisprotokoll, je Adresse zusammengefasst, mit Zeit, Benutzername, Zugangsweg und der Angabe, ob sie aus dem Internet oder aus dem Heimnetz kamen
- **Fehlgeschlagene WLAN-Anmeldungen** (falscher Schlüssel), je Gerät zusammengefasst, mit dem Hinweis, ob die Box das Gerät schon kennt
- **Anmeldungen aus dem Internet** von Adressen, die nicht auf deiner Liste bekannter Adressen stehen
- **Offene Ports**: Portfreigaben, MyFRITZ!, Fernzugang, FTP über das Internet, TR-069 und UPnP, jeweils mit einer kurzen Erklärung, wofür der Port meist da ist
- **Firmware**: Update verfügbar, aber nicht installiert, automatische Updates aus, Labor-Firmware und neuere Labor-Versionen, und ob dein Modell überhaupt noch Updates bekommt oder eine neue Box fällig ist
- **Einstellungen**: Werkskennwort aktiv, Anmeldung ohne Kennwort, Zwei-Faktor-Anmeldung aus, neue Box-Benutzer, offenes oder schwaches WLAN, WPS
- **Neustarts der Box** (dabei wird das Ereignisprotokoll geleert)
- Ein **Sicherheitswert von 0 bis 100** für deine Visualisierung

Der Adapter liest nur. Er ändert nichts an der Box und spricht nur mit deiner eigenen Box.

## Einrichtung

1. Adapter installieren und die Einstellungen öffnen. Die Reiter führen von links nach rechts durch die Einrichtung.
2. Auf der Box einen eigenen Benutzer für den Adapter anlegen, nur mit dem Recht "FRITZ!Box Einstellungen" und ohne Zugang aus dem Internet.
3. "Verbindung testen" klicken.
4. Telegram und/oder E-Mail wählen und eine Testnachricht senden.

Alle Funde stehen in den Einstellungen im Reiter "Funde", jeweils mit Erklärung. Was gewollt ist (z. B. eine selbst eingerichtete Portfreigabe), hakst du dort ab und speicherst. Danach wird es nicht mehr gemeldet. Ändert sich daran etwas, meldet sich der Adapter wieder. Auf Wunsch kommt täglich oder wöchentlich eine Übersicht aller offenen Funde.

## Sicherheit und Datenschutz

- Das Kennwort wird in ioBroker verschlüsselt gespeichert und nie ins Log geschrieben.
- Die Verbindung zur Box läuft über TLS. Der Schlüssel des Box-Zertifikats wird beim ersten Verbinden gemerkt. Ändert er sich, meldet sich der Adapter nicht mehr an. "Verbindung testen" zeigt den Fingerabdruck des Zertifikats, damit du ihn mit der Box vergleichen kannst.
- Nach einer abgelehnten Anmeldung hört der Adapter auf, es weiter zu versuchen, damit er dich nicht aussperrt.
- Externe Dienste sind ab Werk aus. Derzeit gibt es nur einen: den Firmware-Abgleich. Er liest die Versionsdatei vom Download-Server des Herstellers, die öffentliche Liste zur Produktunterstützung auf fritz.com und bei Labor-Firmware die öffentliche Labor-Seite. Übertragen wird höchstens der Modellname.
- Der Port-Test prüft nur deine eigene WAN-Adresse.
- Die Diagnose schwärzt Kennwörter, Schlüssel, Benutzernamen, Adressen und Seriennummern.
- Tipp: Öffne den ioBroker-Admin über HTTPS, dann sind deine Eingaben auch auf dem Weg verschlüsselt.

Keine Garantie: Der Adapter hilft, Probleme zu bemerken, macht dein Netz aber nicht von allein sicher.

## Haftungsausschluss

FRITZ!, FRITZ!Box, FRITZ!OS und MyFRITZ! sind Marken der FRITZ! GmbH. Dieses Projekt steht in keiner Verbindung zur FRITZ! GmbH (ehemals AVM) und wird von ihr weder unterstützt noch geprüft. Keine Garantie für Sicherheit, Nutzung auf eigenes Risiko.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.3 (2026-11-03)
* (Flyor) Messages and states are available in all ioBroker languages
* (Flyor) Summaries and vendor checks run at a random time, so not all systems access the services at once

### 0.1.2 (2026-10-12)
* (Flyor) The trusted certificate is bound to the box address and to its key, so a renewed certificate or a new box address no longer raises an alarm
* (Flyor) "Trust certificate again" accepts exactly the certificate from the warning
* (Flyor) Test connection shows the certificate fingerprint and checks the rights more strictly
* (Flyor) Readable adapter title
* (Flyor) Firmware comparison with the vendor server works again with the current file format
* (Flyor) Lab firmware is reported, and newer lab versions are found on the vendor lab page
* (Flyor) README explains what the adapter is for
* (Flyor) Failed Wi-Fi logins (wrong key) are reported per device
* (Flyor) Reports when the model gets no more updates, using the vendor support list

### 0.1.1 (2026-10-11)
* (Flyor) Clearer log messages: network problems and internal errors are no longer mixed up
* (Flyor) Pressing "run now" several times no longer queues the same checks again
* (Flyor) Small cleanups in the package

### 0.1.0 (2026-10-11)
* (Flyor) First release: failed logins, open ports, firmware and settings checks, findings and confirmation right in the settings, setup wizard, Telegram and e-mail

Older changes are in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 Flyor <AskMe@Stonehiller.de>

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