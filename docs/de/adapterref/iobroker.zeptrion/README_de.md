---
chapters: {"pages":{"en/adapterref/iobroker.zeptrion/README.md":{"title":{"en":"ioBroker.zeptrion"},"content":"en/adapterref/iobroker.zeptrion/README.md"},"en/adapterref/iobroker.zeptrion/README_de.md":{"title":{"en":"ioBroker.zeptrion"},"content":"en/adapterref/iobroker.zeptrion/README_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zeptrion/README_de.md
title: ioBroker.zeptrin
hash: PCYPBAP9QA8c3nmVrkS/1lhMLRuAAJhPM3JYE56o/xk=
---
# ioBroker.zeptrin

![NPM-Version](https://img.shields.io/npm/v/iobroker.zeptrion.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.zeptrion.svg)
![Tests](https://github.com/bueste/ioBroker.zeptrion/workflows/Test%20and%20Release/badge.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg)
![Spenden](https://img.shields.io/badge/Spenden-PayPal-blue.svg)
![Kauf mir einen Kaffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

![Logo](../../../en/adapterref/iobroker.zeptrion/admin/zeptrion.png)

Adapter für [Feller](https://www.feller.ch/) **[zeptrion / zApp](https://www.feller.ch/de/connected-buildings/zeptrion)** WLAN-Aktoren (WLAN-Nebenstelle 4K = zApp-Gateway, WLAN-Zwischenmodul 2K = zApp-Booster) für Licht- und Storensteuerung, basierend auf der zrap Webservice API (Feller-Dokument 10.ZEPAPI-E.1612 / Version 1.0, Firmware ab 01.08.18).

## Funktionsumfang

- **Kanalsteuerung** (`zrap/chctrl` ): ein/aus/stopp/umschalten, öffnen/schließen, bewegen\_öffnen/bewegen\_schließen, dimmen\_erhöhen/dimmen\_verringern inkl. zeitgesteuerter Varianten (`_t` in ms), sowie Szenen restart\_s1-4 / store\_s1-4 / delete\_s1-4 - als einzelne Buttons UND als frei`command` -Textfeld.
- **Kanalzustand** (`zrap/chscan` als periodischer Resync +`zrap/chnotify` als Long-Poll-Push für nahezu Echtzeit-Updates) und **Kanalbeschreibung** (`zrap/chdes` , lesen/schreiben: Name, Gruppe, Icon, Typ, Kategorie).
- **Geräteinformationen** (`zrap/id` ): Hardware-/Software-/Bootloader-Version, Seriennummer, Systemname, Gerätetyp.
- **Signalstärke** (`zrap/rssi` , gepollt).
- **Netzwerkstatus** (`zrap/net` , schreibgeschützt): SSID, IP, MAC, Modus, Verschlüsselung, Maske, Gateway.
- **Systembefehle** (`zrap/sys` ): Neustart, Werksreset, Zurücksetzen im Access-Point-Modus.
- **Standort** (`zrap/loc` ), **NTP-Konfiguration** (`zrap/ntp` ) und **Datum/Zeit** (`zrap/date` ) inkl. Ein-Klick-Synchronisation der Geräte-Uhrzeit mit dem ioBroker-Host.
- **mDNS-Discovery** (Kapitel 4 der API-Doku): durchsucht das lokale Netz nach zeptrion-Geräten und übernimmt Funde deaktiviert in die Konfigurationstabelle (Discovery kombiniert mit manueller Kontrolle/Aktivierung).
- **Sammelbefehle für Hagelalarm** :`control.closeAllShutters` /`openAllShutters` /`stopAllShutters` Steuern Sie alle konfigurierten Kanäle über alle aktiven Geräte gleichzeitig
  - Dank Multicast-Bündelung (siehe unten) als je EIN Request pro Gerät, nicht pro Kanal.
- **Multicast-Befehlsbündelung** : Kanalbefehle desselben Geräts, die innerhalb von 50 ms eintreffen, werden automatisch zu einem einzigen`zrap/chctrl` -Multicast-POST gebündelt (Kapitel 3.6.5 der API-Doku) statt mehrerer sequentieller Einzelrequests.
- **Storen-Positionsschätzung** (optional,`posEstimate` ): da die Hardware laut Doku für Storenkanäle praktisch immer`-1` (unbekannt) liefert, kann pro Gerät eine Motor-Laufzeit hinterlegt werden; Der Adapter schätzt daraus die Position anhand der Bewegungsrichtung und verstrichener Zeit (Best Effort, kein Hardware-Feedback, manuell kalibrierbar).
- **Smartfront-Unterstützung** (optional,`zapi/smartfront/*` ): Temperatur/Helligkeit/ Luftfeuchtigkeit auslesen, LED-Hintergrundfarbe setzen (nur für Geräte mit angeschlossenem Feller-Smartfront-Taster, Checkbox in der Konfiguration).
- Robustes Fehlerhandling: unterscheidet sich von ECONNREFUSED/Timeout/DNS-Fehler, Backoff bei wiederholten Fehlern, pro Gerät und global sichtbarem Verbindungsstatus. mDNS-Discovery ist gegen zusätzliche Exceptions durch fremde/kaputte Netzwerkpakete abgesichert.

Nicht implementiert (siehe „Bekannte Einschränkungen“): Schreibzugriff auf`zrap/net` (WLAN-Zugangsdaten ändern),`zrap/scheduler` , Smartbutton-Webhook-Programmierung (`zapi/smartbt/*` ).

## Installation

Admin-Oberfläche -> Adapter -> "zeptrion" suchen -> Installieren.

## Konfiguration

- **HTTP-Timeout** : Timeout pro Anfrage an ein Gerät (Standard 4000 ms).
- **Discovery-Button** : durchsucht das lokale Netz per mDNS (Service-Type`_zapp._tcp` , Zurückgreifen`_http._tcp` für Firmware < 01.08.xx anhand des Hostnamen-Musters`zapp-YYWWNNNN` ). Neue Geräte werden in der Tabelle übernommen **deaktiviert** - Zeile danach prüfen, ID/Name vergeben, Kanalzahl gefunden (3340-4-x = 4 Kanäle, 3340-2-x = 2 Kanäle) und aktivieren. mDNS funktioniert nur innerhalb des gleichen Netzsegments/VLANs.
- **Geräte-Tabelle** (auch komplett manuell befüllbar, ohne Discovery):
  - `Aktiv` ,`ID` (az 0-9 \_ -),`Bezeichnung` ,`IP-Adresse/Hostname` ,`Kanäle` (1-4),`Art` (Storen/Licht/unbekannt - steuert die ioBroker-Objektrollen, siehe unten),`Laufzeit Storenmotor` (Sekunden, 0=deaktiviert - schaltet`posEstimate` frei, siehe unten, gilt als Standard für alle Kanäle),`Laufzeit/Kanal` (optional, kommagetrennt, zB`22,28` - überschreibt die Standard-Laufzeit einzeln je Kanal; nützlich bei 2K-Geräten, deren Kanäle unterschiedliche Motor-Laufzeiten haben; leere Einträge gefallen auf die Standard-Laufzeit zurück),`Smartfront` (Checkbox, nur bei angeschlossenem Feller-Smartfront-Taster aktivieren),`Poll (s)` (Standard 30, für RSSI + periodischen chscan-Resync; die eigentlichen Kanalupdates laufen unabhängig davon über den chnotify-Long-Poll).

## Objektbaum pro Gerät (`zeptrion.0.<id>` )

```
<id>.info.connection / lastError / hw / sw / boot / sn / sys / type / oen / rssi / refresh
<id>.network.ssid / ip / mac / mode / enc / mask / gw / bssid        (read-only)
<id>.system.reboot / unlock / factoryDefault / networkDefault      (Buttons; factoryDefault erfordert unlock binnen 30s)
<id>.location.name                                                  (read/write)
<id>.ntp.url / per                                                   (read/write)
<id>.date.rfc1123 / tz / dst / syncNow                               (read/write + Button)

<id>.channels.chN.val                                    Kanalzustand 0-100 / -1 (roher Hardwarewert)
<id>.channels.chN.posEstimate                             nur bei Art=Storen: Software-Positionsschätzung
                                                           0=zu/100=offen, auch manuell schreibbar (Kalibrierung)
<id>.channels.chN.name / group / icon / type / cat        Kanalbeschreibung (read/write)
<id>.channels.chN.command                                 freies Kommando (String)
<id>.channels.chN.stop / on / off / toggle / open / close /
                  move_open / move_close / dim_up / dim_down        (Buttons)
<id>.channels.chN.recall_s1..4 / store_s1..4 / delete_s1..4          (Buttons)

<id>.smartfront.temp / lux / hum       nur wenn "Smartfront" aktiviert (read)
<id>.smartfront.ledState               aktueller LED-Status als JSON (read)
<id>.smartfront.ledSet                 LED(s) setzen, JSON-Array (write)
```

Weltweit:

```
info.connection                mind. ein Gerät erreichbar
control.closeAllShutters       Button: ALLE konfigurierten Kanäle -> "close"
control.openAllShutters        Button: ALLE konfigurierten Kanäle -> "open"
control.stopAllShutters        Button: ALLE konfigurierten Kanäle -> "stop"
```

## Objekt-Rollen und „Art“ (Art)

Die zrap-API selbst unterscheidet sich nicht zwischen Licht- und Storenkanal - das steckt allein in der Verkabelung/im Aktor. Damit Visualisierungen (VIS, evtl. spätere ioBroker.iot/Alexa-Anbindung) Kanäle trotzdem sinnvoll klassifizieren können, kann pro Gerät die „Art“ gesetzt werden:

| Kunst                | `<ch>.val` Rolle | `stop` /`open` /`close` Rolle                            |
| -------------------- | ---------------- | -------------------------------------------------------- |
| Storen/Rolladen      | `level.blind`    | `button.stop` /`button.open.blind` /`button.close.blind` |
| Licht                | `level.dimmer`   | generisch`button`                                        |
| unbekannt (Standard) | `value`          | generisch`button`                                        |

Wichtig:`level.blind` täuscht **keine** echte Positionsrückmeldung vor - laut Feller-Doku liefert`chscan` /`chnotify` für einen Storenkanal so gut wie immer`-1` (unbekannt), da die Hardware selbst keine Lamellenposition zurückmeldet. Die Rolle verbessert nur die Erkennung durch VIS-Widgets, der Zahlenwert bleibt idR uninformativ.

## Hagelalarm-Nutzung

```javascript
// JavaScript-Adapter Beispiel
on({id: 'wetter.0.warnungen.hagel', val: true}, function () {
    setState('zeptrion.0.control.closeAllShutters', true);
});
```

Fehler bei einzelnen Geräten (offline etc.) unterbrechen die Kanäle übrigens nicht - jeder fehlgeschlagene Kanal wird einzeln geloggt und in`<id>.info.lastError` vermerkt.

## Bekannte Einschränkungen / bewusste Entscheidungen

- **Smartbutton-Webhook-Programmierung** (`zapi/smartbt/prgm` /`prgn` /`prgs` ) ist nicht implementiert: Dabei ruft der Taster bei Tastendruck direkt eine URL auf ioBroker auf (echtes Push, ganz ohne Polling). Das würde einen eingehenden HTTP-Server im Adapter voraussetzen, den es aktuell nicht gibt - eine größere Architekturerweiterung, kein kleiner Zusatz. Bleibt als möglicher zukünftiger Ausbauschritt dokumentiert.
- **Schreibzugriff auf`zrap/net`** ist nicht implementiert - WLAN-Zugangsdaten eines Aktors per Skript zu ändern ist riskant (Verbindungsverlust, Reboot nötig). Kann bei Bedarf ergänzt werden.
- **Planer (`zrap/scheduler` )** und die **zeptrionAir-Smartfront-Services** (`zapi/smartfront/*` ,`zapi/smartbt/*` ) sind nicht implementiert, da für den Storen-/Hagel-Use-Case nicht relevant. Stirb`zrapGet` /`zrapPost` -Struktur in`main.js` lässt sich leicht erweitern.
- `chctrl` liefert laut Doku HTTP 302 ohne Body - Redirects werden bewusst nicht verfolgt (`maxRedirects: 0` ), um unnötige Zusatzanfragen zu vermeiden.
- Bei wiederholten Fehlern eines Geräts wird das Poll-Intervall bis maximal das 5-fache verlängert (einfacher Backoff).

## Entwicklung / Tests

```bash
npm install
npm run lint
npm test              # Package-Konsistenz + Unit-Tests
npm run test:integration   # startet echten js-controller (dauert länger)
```

## Changelog

### 1.0.5 (2026-07-22)
- Admin-UI: Die drei `validatorErrorText`-Meldungen sind jetzt Inline-i18n-Objekte statt reiner englischer Texte (ioBroker-Checker W5617).
- Abhängigkeiten: Deklarierte Mindestversionen für `bonjour-service` (^1.2.1 -> ^1.4.3) und `eslint` (^10.6.0 -> ^10.7.0) angehoben; beide waren durch die bestehenden Caret-Ranges ohnehin abgedeckt, daher keine Verhaltensänderung.

### 1.0.4 (2026-07-21)
- Nur Dokumentation: Buy-Me-a-Coffee-Link neben dem PayPal-Spenden-Badge ergänzt. Keine funktionalen Änderungen.

### 0.7.0 (2026-07-10)
- Skalierung für 20+ Geräte: paralleles Setup, Poll-Jitter, Duplikat-Erkennung
- Strikte Startup-Validierung jeder konfigurierten Geräte-Zeile
- CSV-Massenimport (eigener Konfig-Tab) mit Zeilen-Validierung und Auto-ID
- FIX: Positionsschätzung nach Stopp während Endlagenfahrt korrekt
- FIX: Adapter-Timer-Cleanup (this.clearTimeout), führende Nullen in chdes-Codes bleiben erhalten

### 0.6.0 (2026-07-10)
- Auto-ID aus Host, Geräte-Test-Button (Erreichbarkeit + zeptrion-Verifikation + Kanalzahl-Prüfung)
- Kanal-Objektnamen aus dem Gerät (chdes), neues Icon, Geräte-Icons

### 0.5.1 (2026-07-10)
- KRITISCHER FIX: XML-Parser übersprang die Nutzdaten wegen des XML-Deklarations-Keys - alle GET-Werte blieben in 0.5.0 null

### 0.5.0 (2026-07-07)
- setPosition: zeitbasierte %-Anfahrt für Storen (Chunking wegen 32s-API-Limit, Referenzfahrt bei unbekannter Position)
- tiltOpen/tiltClose: Lamellen-Kipp-Impulse (konfigurierbare Impulsdauer)
- calibrate: Positionsschätzung ohne Fahrt setzen

### 0.4.0 (2026-07-07) - Security- & Qualitäts-Härtung
- **Verriegelter Werksreset**: `system.factoryDefault` funktioniert nur noch innerhalb
  von 30s nach Setzen von `system.unlock` - ein einzelner versehentlicher setState aus
  Script/VIS kann das Gerät nicht mehr plätten.
- **Crashsicheres onStateChange**: der komplette Handler (inkl. der Sammelbefehle) läuft
  jetzt in einer zentralen Fehlerbehandlung - keine Unhandled Promise Rejections mehr
  möglich.
- **Eingabevalidierung**: Kanalbeschreibung (32/32/24/4/4 Bytes UTF-8), Standort (32),
  NTP-URL (32) und NTP-Intervall (0-255) werden vor dem Senden geprüft; klare
  Fehlermeldung statt HTTP-400 vom Gerät. Umlaute zählen korrekt als 2 Bytes.
- **Adapter-verwaltete Timer** (`this.setTimeout`) überall - automatische Aufräumung
  beim Unload gemäss ioBroker-Guidelines.
- **Verbindungs-Ökonomie**: solange der chnotify-Long-Poll gesund läuft, wird der
  redundante chscan-Resync nur noch bei jedem 5. Poll ausgeführt (schont die
  schwachen Embedded-Webserver der Unterputzaktoren).
- **chnotify abschaltbar** (Experten-Tab) für Umgebungen mit Verbindungsproblemen.
- **Admin-UI neu**: Tabs (Geräte/Experten), durchgängig EN+DE, Eingabe-Validatoren
  (ID-Muster, Host-Muster), Tooltips an jeder Spalte, Sicherheitshinweis.
- ESLint auf Flat Config (v9) migriert, Lint läuft sauber durch; Smoke-Tests für
  Kommando-Validierung, Byte-Limits, Positionsmathematik und Multicast-Body.

### 0.3.0 (2026-07-07)
- Kanalbefehle desselben Geräts werden innerhalb eines 50ms-Fensters automatisch zu
  einem einzigen Multicast-POST an `/zrap/chctrl` gebündelt statt sequentiell einzeln
  gesendet - insbesondere `control.closeAllShutters` (Hagelalarm) profitiert davon
  massiv (ein Request pro Gerät statt einer pro Kanal).
- Optionale zeitbasierte Storen-Positionsschätzung (`posEstimate`) anhand konfigurierbarer
  Motor-Laufzeit, da die Hardware selbst keine Position zurückmeldet.
- Optionale Smartfront-Unterstützung (`zapi/smartfront/*`): Temperatur/Helligkeit/
  Feuchtigkeit auslesen, LED-Hintergrundfarbe setzen.
- Rollen-Korrektur: `level.blind` sitzt jetzt auf der Positionsschätzung statt auf dem
  rohen (meist -1) Hardwarewert.

### 0.2.0 (2026-07-07)
- Kanalzustände werden jetzt primär über `zrap/chnotify` (Long-Poll) nahezu in
  Echtzeit aktualisiert statt nur per Intervall-Polling; `chscan`-Poll bleibt als
  periodischer Resync/Fallback erhalten.
- Zusätzliches Sicherheitsnetz (Busy-Window, 5s) verhindert, dass ein zeitgleicher
  chscan-Resync einen gerade gesendeten Bewegungsbefehl mit einem veralteten Wert
  überschreibt.
- mDNS-Discovery-Handler gegen Exceptions durch fremde/kaputte Netzwerkpakete
  abgesichert (try/catch je Service-Event statt nur um die Subscription herum).
- Neues Geräte-Feld "Art" (Storen/Licht/unbekannt) steuert Standard-Objektrollen
  (`level.blind`, `button.stop`, `button.open.blind`, `button.close.blind` bzw.
  `level.dimmer`) für bessere VIS-/Smart-Home-Integration.
- Strukturierte `native`-Metadaten (Host, Kanalnummer, Art) an Geräte-/Kanal-Objekten.

### 0.1.0 (2026-07-07)
- Erste Version: Kanalsteuerung, Kanalzustand/-beschreibung, Geräte-/Netzwerkinfo,
  Systembefehle, Standort/NTP/Datum, Sammelbefehle für Hagelalarm, mDNS-Discovery.

## License

MIT License

Copyright (c) 2026 Stefan Bühler

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