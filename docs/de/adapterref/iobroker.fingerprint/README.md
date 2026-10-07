---
chapters: {"pages":{"en/adapterref/iobroker.fingerprint/README.md":{"title":{"en":"ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/README.md"},"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md":{"title":{"en":"Haftungsausschluss (Disclaimer) — ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fingerprint/README.md
title: ioBroker.fingerprint
hash: Kk5+ExG/e5aEtblXjBoKbq93+7YsmLiZs+qGXgMuOwI=
---
<img src="https://raw.githubusercontent.com/sadam6752-tech/ioBroker.fingerprint/main/admin/fingerprint.png" width="120" alt="FingerprintDoorbell logo" />

# ioBroker.fingerprint

Integriert die ESP32-basierte [FingerprintDoorbell](https://github.com/sadam6752-tech/FingerprintDoorbell) über einfaches HTTP in ioBroker – **weder MQTT noch ein simple-api-Adapter sind erforderlich** .

Der Adapter verfügt über einen kleinen HTTP-Webhook-Empfänger. Die Türklingel kontaktiert diesen direkt bei einem erkannten Fingerabdruck oder einem unbekannten Fingerring. Der Adapter fragt außerdem den Online-/Offline-Status des Geräts ab und kann es neu starten oder den Berührungsring aktivieren.

## Firmware-Anforderung

Dieser Adapter kommuniziert mit der **FingerprintDoorbell** -Firmware, die auf Ihrem ESP32 läuft.

- **Empfohlen: Firmware v0.9.4 oder neuer** – dann funktioniert alles Folgende, einschließlich der Registrierung über den Adapter, der LED-Ring-Steuerung, des WLAN-Signals und der zuverlässigen Mehrfinger-Sicherung/Wiederherstellung.
- **Firmware v0.9.3** — Zuverlässige Sicherung/Wiederherstellung aller Finger (vollständige 1536-Byte-Vorlagen).
- **Firmware v0.9.1** – aktiviert _den Servermodus_ (der Adapter provisioniert das Gerät automatisch, keine manuellen URLs erforderlich) plus `control.ignoreTouchRing` und die Fingerabdruckliste.
- **Die Firmware v0.9** funktioniert auch im Basismodus (manuelles Einfügen der Match-/Ring-URLs).

Funktionsübersicht nach Firmware:

| Besonderheit                                               | Firmware      |
| ---------------------------------------------------------- | ------------- |
| Match / Klingeln / Status / Neustart                       | Version 0.9   |
| Servermodus, Berührungsring ignorieren, Fingerabdruckliste | Version 0.9.1 |
| Sichern / Wiederherstellen (alle Finger)                   | Version 0.9.3 |
| Anmeldung über Adapter, LED-Ring, WLAN-RSSI                | Version 0.9.4 |

Die Firmware erhalten Sie hier:

- **Am einfachsten – Flashen über den Browser (frischer ESP32):** [Web Flasher](https://sadam6752-tech.github.io/FingerprintDoorbell/) – ESP32 über USB verbinden und _auf Installieren_ klicken (Chrome/Edge/Opera oder Firefox 151+).
- **Späteres Update per OTA:** öffnen `http://<device-ip>/update` → _Firmware_ → hochladen `firmware.bin` aus den [Veröffentlichungen](https://github.com/sadam6752-tech/FingerprintDoorbell/releases) .
- **Manueller Download:** die neueste ZIP-Datei aus den [Releases](https://github.com/sadam6752-tech/FingerprintDoorbell/releases) (enthält `firmware.bin`, `spiffs.bin` und Flash-Anweisungen).

Überprüfen Sie die laufende Version unter `http://<device-ip>/api/status` (Feld `version`).

## So funktioniert es

```
FingerprintDoorbell (ESP32)                 ioBroker.fingerprint
─────────────────────────                   ────────────────────
match  ──► HTTP GET /match?id=..  ─────────►  webhook receiver ──► lastMatch.*
ring   ──► HTTP GET /ring          ─────────►  webhook receiver ──► ring.*
                                    ◄───────  poll GET /debug   ──► info.connection
reboot                              ◄───────  GET /reboot        ◄── control.reboot
touch ring                          ◄───────  GET /set-touch-ring ◄── control.ignoreTouchRing
```

## Aufstellen

1. Installieren und fügen Sie eine Instanz des Adapters hinzu.
2. Konfigurieren Sie in den Instanzeinstellungen Folgendes:
   - **Geräte-IP-Adresse** / **Geräte-Port** – die IP-Adresse der Türklingel und der WebUI-Port (Standard: 80)
   - **Administratorbenutzername / Administratorpasswort** – falls die HTTP-Basisauthentifizierung auf dem Gerät aktiviert ist
   - **Webhook-Bindungs-IP / Webhook-Port** – wo der Adapter lauscht (Standard) `0.0.0.0:8095`)
3. In der **FingerprintDoorbell-Weboberfläche unter „Einstellungen“** legen Sie die HTTP-Aktions-URLs so fest, dass sie auf diesen Adapter verweisen (kopieren Sie die vorgefertigten URLs aus den Instanzeinstellungen – diese enthalten bereits das Webhook-Token; ersetzen Sie die vorhandenen URLs). `<iobroker-ip>` (mit der ioBroker-Host-IP):

   ```
   HTTP Match URL: http://<iobroker-ip>:8095/match?id={id}&name={name}&confidence={confidence}&token=<token>
   HTTP Ring URL:  http://<iobroker-ip>:8095/ring?token=<token>
   ```

## Haftungsausschluss

Dieser Adapter ist eine unabhängige, von der Community entwickelte Integration. Er steht in **keiner** Verbindung zu den Autoren der FingerprintDoorbell-Firmware, den Sensorherstellern oder der ioBroker GmbH und wird von **diesen weder unterstützt noch empfohlen. Die Software wird ohne jegliche Gewährleistung** bereitgestellt (siehe MIT [-Lizenz](https://github.com/sadam6752-tech/ioBroker.fingerprint/blob/main/LICENSE) ); die Nutzung erfolgt auf eigene Gefahr.

- **Kein zertifiziertes Sicherheitsprodukt.** Fingerabdrucksensoren für Endverbraucher (z. B. R503) können Fehlalarme auslösen und manipuliert werden. Verlassen Sie sich **nicht** allein auf diesen Adapter als Schutz für Türen, Schlösser, Alarmanlagen oder andere Einrichtungen, die Personen oder Eigentum schützen. Sorgen Sie stets für einen unabhängigen mechanischen oder anderweitigen Zugang.
- **Nicht für sicherheitskritische Anwendungen geeignet.** Netzwerk-, WLAN-, Strom- oder Softwareausfälle können zu Verzögerungen oder Abbrüchen führen. Verwenden Sie das Gerät niemals an Orten, an denen ein Ausfall Leben oder Gesundheit gefährden könnte (z. B. Notausgänge).
- **Ihr Netzwerk, Ihre Verantwortung.** Die WebUI des Geräts und der Webhook verwenden unverschlüsseltes HTTP (Basisauthentifizierung und ein gemeinsames Token werden unverschlüsselt übertragen). Verwenden Sie diese nur in einem vertrauenswürdigen LAN/VLAN, geben Sie den Webhook-Port oder das Gerät niemals dem Internet preis und halten Sie das Token geheim.
- **Biometrische Daten / Datenschutz (DSGVO).** Fingerabdruckvorlagen, Namen, Zeitstempel und Zugriffsprotokolle sind personenbezogene Daten. Sie sind der Verantwortliche: Holen Sie die Einwilligung der registrierten Personen ein, schützen Sie Sicherungsdateien (`fingerprints-backup.json` enthält die Rohvorlagen (unverschlüsselt) und beachten Sie die für Sie geltenden Gesetze (z. B. DSGVO/BDSG, Betriebsratsvorschriften für Arbeitnehmer).
- **Aktionen werden unbeaufsichtigt ausgeführt.** Fingerprint-Regeln schreiben in beliebige ioBroker-Objekte (Lampen, Schlösser, Alarme, Skripte). Testen Sie Ihre Regeln sorgfältig, bevor Sie sich darauf verlassen.
- Die Autoren übernehmen keine Haftung für Schäden, Datenverlust, unbefugten Zugriff, Einbruch oder sonstige Folgen, die sich aus der Verwendung oder dem Missbrauch dieser Software ergeben.

Eine deutsche Version ist unter [DISCLAIMER.de.md](/#/docs/adapterref/iobroker.fingerprint/DISCLAIMER.de.md) verfügbar.

## Sicherheit

Die Kommunikation ist in beide Richtungen authentifiziert:

- **Adapter → Gerät** (Statusabfrage, Neustart, Berührungsring): HTTP-Basisauthentifizierung mit dem konfigurierten Administratorbenutzer / Administratorpasswort.
- **Gerät → Adapter** (Match/Ring-Webhooks): ein gemeinsam genutztes **Webhook-Token** . Das Token wird beim ersten Start automatisch generiert und in den Instanzeinstellungen angezeigt. Anfragen ohne gültiges Token (über `token` Abfrageparameter oder `X-Auth-Token` Anfragen mit dem Header werden mit HTTP 401 abgelehnt. Optional können Sie die Option _„Webhooks nur von der Geräte-IP akzeptieren“_ aktivieren, um auch Anfragen von anderen Hosts abzulehnen.

Bei Firmware-Versionen < v0.9.1 muss das Token manuell in die Geräte-URLs eingefügt werden. Ab v0.9.1 (Servermodus) stellt der Adapter die URLs und das Token automatisch bereit.

`adminPassword` Und `webhookToken` werden als **geschützte** native Attribute deklariert (`protectedNative` In `io-package.json` Daher können andere Adapter sie nicht lesen. Sie werden als Klartext in der Instanzkonfiguration gespeichert – verschlüsselt über `encryptedNative` wird absichtlich nicht verwendet, da das Webhook-Token vom Adapter selbst generiert wird.

## Fingerabdruckaktionen (ohne Skripting)

Über die Registerkarte **„Fingerprint-Aktionen“** können Sie ioBroker-Objekte direkt über einen Fingerabdruck auslösen – JavaScript ist nicht erforderlich:

1. Klicken Sie auf **„Fingerabdrücke vom Gerät laden“** , um die Tabelle mit den registrierten Fingern (ID + Name) zu füllen. Vorhandene Zeilen bleiben erhalten (Zusammenführung).
2. Wählen Sie für jede Zeile ein **Zielobjekt** und eine **Aktion** aus (`Set value` oder `Toggle`), ein **Wert** und optional ein **Mindestkonfidenzintervall** (leer lassen, um es zu ignorieren).
3. Der **Wert** wird frei typisiert und in den Typ des Zielobjekts umgewandelt:
   - boolesches Ziel: `true`, `1`, `on`, `yes`, `ja`, `да` → wahr; alles andere → falsch
   - Zahlenziel: als Zahl interpretiert (`,` (als Dezimaltrennzeichen akzeptiert)
   - Zeichenkettenziel: unverändert verwendet
4. **Die Ring-Aktion** aktiviert ein ausgewähltes Objekt, wenn ein unbekannter Finger klingelt (z. B. ein Glockenspiel).

### Intelligente Regeln (v0.5.0)

- **Entprellfunktion (s)** — wiederholte Betätigungen desselben Fingers innerhalb von N Sekunden ignorieren.
- Kontrollkästchen **„Bedingungen“** – erzwingt zeitbasierte Zugriffsfenster für diesen Finger. Definieren Sie die Fenster auf der Registerkarte **„Bedingungen“** : Geben Sie eine oder mehrere Finger-IDs ein (kommagetrennt, z. B. 1x ... `1,2,4`), die Wochentage ankreuzen und eine `From` /`To` Zeit (`HH:MM` Mehrere Zeilen für denselben Finger werden mit einem ODER verknüpft; Zeitbereiche können Mitternacht überschreiten (z. B. `22:00` –`06:00` Wenn die Bedingungen aktiviert sind, aber keine Zeile übereinstimmt, wird die Aktion übersprungen.
- **Alarm-** Kontrollkästchen (Panikfinger) – Zusätzlich zur normalen Aktion legt es das unter **„Alarmziel“** konfigurierte Objekt fest. Beispiel: Ein spezieller Finger öffnet die Tür wie gewohnt und löst zusätzlich einen Alarm aus.
- Die Option **„Snapshot** “ legt zusätzlich zur normalen Aktion das unter **„Snapshot-Ziel“** konfigurierte Objekt fest. Beispiel: Auslösen eines Skripts, das einen ESP32-CAM-Snapshot aufnimmt und sendet.

## Finger verwalten (v0.6.0)

Über die Registerkarte **„Finger verwalten“** können Sie Finger verwalten, ohne die WebUI des Geräts öffnen zu müssen:

- **Umbenennen** — Geben Sie eine Finger-ID und einen neuen Namen ein und klicken Sie dann auf _Umbenennen_ .
- **Backup erstellen** – lädt alle Fingerabdruckvorlagen vom Sensor herunter und speichert sie in einer Datei auf dem ioBroker-Host (`<iobroker-data>/fingerprint.0/fingerprints-backup.json`), das Adapteraktualisierungen übersteht.
- **Wiederherstellung aus der Sicherung** – schreibt die Fingerabdrücke aus dieser Datei zurück auf den Sensor.

Speichern Sie zuerst die Instanzeinstellungen, damit die Geräteverbindung hergestellt werden kann.

> **Hinweis:** Für eine zuverlässige Sicherung und Wiederherstellung _aller_ Finger ist Firmware- **Version 0.9.4** (vollständige 1536-Byte-Vorlagen) erforderlich. Mit älterer Firmware erstellte Sicherungen sind unvollständig – erstellen Sie diese nach dem Update neu.

## Neuen Finger registrieren (v0.7.0, Firmware ≥ v0.9.4)

Sie können einen neuen Fingerabdruck direkt über ioBroker registrieren – die WebUI des Geräts muss nicht geöffnet werden:

- **Admin-UI:** Registerkarte _"Finger verwalten"_ → _Neuen Finger registrieren_ → Freie ID (1–200) und Namen eingeben → **Registrierung starten** .
- **Staaten:** schreiben `control.enrollId` Und `control.enrollName` dann setzen `control.enrollStart` =`true` Die

Die Registrierung erfolgt auf dem Gerät und erfordert, dass der Benutzer den Finger **5 Mal** auf den Sensor legt. Der Fortschritt wird live angezeigt. `enroll` Kanal:

| Zustand          | Typ             | Beschreibung                            |
| ---------------- | --------------- | --------------------------------------- |
| `enroll.active`  | boolescher Wert | `true` während einer Einschreibung      |
| `enroll.step`    | Nummer          | Aktueller Scan-Schritt (0–5)            |
| `enroll.status`  | Zeichenkette    | `idle` /`scanning` /`success` / `error` |
| `enroll.message` | Zeichenkette    | Letzte für Menschen lesbare Statuszeile |

Bei erfolgreicher Aktualisierung wird die Fingerabdruckliste automatisch aktualisiert.

## LED-Ringsteuerung (v0.7.0, Firmware ≥ v0.9.4)

Steuern Sie den RGB-Ring des Sensors über ioBroker:

- `control.ledMode` —`0` aus, `1` An, `2` Atmung, `3` blinkend
- `control.ledColor` —`1` Rot, `2` Blau, `3` lila, `4` Grün, `5` Gelb, `6` Cyan, `7` Weiß

Durch Schreiben in einen der beiden Zustände wird der Ring sofort aktiviert.

## Staaten

| Zustand                      | Typ                            | Beschreibung                                                      |
| ---------------------------- | ------------------------------ | ----------------------------------------------------------------- |
| `info.connection`            | boolescher Wert                | Gerät erreichbar (über `/api/status` oder `/debug` Umfrage)         |
| `info.uptime`                | Nummer                         | Gerätebetriebszeit in Sekunden                                    |
| `info.freeHeap`              | Nummer                         | Freier Heap in Bytes                                              |
| `info.firmwareVersion`       | Zeichenkette                   | Geräte-Firmwareversion                                            |
| `info.serverMode`            | boolescher Wert                | Das Gerät sendet Ereignisse direkt an diesen Adapter.             |
| `info.wifiRssi`              | Nummer                         | WLAN-Signalstärke in dBm (Firmware ≥ v0.9.4)                      |
| `fingerprints.<id>.name`     | Zeichenkette                   | Name des registrierten Fingers mit dieser ID                      |
| `fingerprints.<id>.lastSeen` | Nummer                         | Zeitstempel der letzten Fingerabgleichung                         |
| `fingerprints.<id>.count`    | Nummer                         | Wie oft der Finger übereinstimmte                                 |
| `lastAccess.text`            | Zeichenkette                   | Letzter lesbarer Zugriffseintrag (gewährt/verweigert)             |
| `lastAccess.granted`         | boolescher Wert                | Ob der letzte Zugriff gewährt wurde                               |
| `lastAccess.timestamp`       | Nummer                         | Zeitstempel des letzten Zugriffs                                  |
| `stats.totalMatches`         | Nummer                         | Übereinstimmungen der Fingerabdrücke                              |
| `stats.totalRings`           | Nummer                         | Anzahl der Türklingeln (Finger unbekannt)                         |
| `stats.lastPerson`           | Zeichenkette                   | Name der zuletzt erkannten Person                                 |
| `lastMatch.id`               | Nummer                         | ID des zuletzt zugeordneten Fingers (1–200)                       |
| `lastMatch.name`             | Zeichenkette                   | Name des zuletzt übereinstimmenden Fingers                        |
| `lastMatch.confidence`       | Nummer                         | Selbstvertrauen im Spiel                                          |
| `lastMatch.timestamp`        | Nummer                         | Zeitstempel des letzten Spiels                                    |
| `lastMatch.matched`          | boolescher Wert                | Bei jedem Spielereignis auf „true“ setzen.                        |
| `ring.ringing`               | boolescher Wert                | Trifft für ein paar Sekunden beim Klingeln an der Tür zu.         |
| `ring.timestamp`             | Nummer                         | Zeitstempel des letzten Klingelns                                 |
| `control.reboot`             | boolescher Wert (Schaltfläche) | Starten Sie das Gerät neu.                                        |
| `control.ignoreTouchRing`    | boolescher Wert (Schalter)     | Den Touch-Ring ignorieren (Firmware ≥ v0.9.1)                     |
| `control.enrollId`           | Nummer                         | Slot-ID (1–200) für die nächste Registrierung (Firmware ≥ v0.9.4) |
| `control.enrollName`         | Zeichenkette                   | Name für die nächste Registrierung (Firmware ≥ v0.9.4)            |
| `control.enrollStart`        | boolescher Wert (Schaltfläche) | Registrierung starten (Firmware ≥ v0.9.4)                         |
| `control.ledMode`            | Nummer                         | LED-Ringmodus 0–3 (Firmware ≥ v0.9.4)                             |
| `control.ledColor`           | Nummer                         | LED-Ringfarbe 1–7 (Firmware ≥ v0.9.4)                             |
| `enroll.active`              | boolescher Wert                | Registrierung läuft (Firmware ≥ v0.9.4)                           |
| `enroll.step`                | Nummer                         | Aktueller Einschreibungsscan Schritt 0–5                          |
| `enroll.status`              | Zeichenkette                   | `idle` /`scanning` /`success` / `error`                           |
| `enroll.message`             | Zeichenkette                   | Letzte Zeile zum Einschreibungsstatus                             |

## Firmware-Hinweis

- **Match / Ring / Status / Reboot** funktionieren mit FingerprintDoorbell **v0.9** unverändert.
- ** `control.ignoreTouchRing` ** Der Servermodus und die Fingerabdruckliste erfordern **Version 0.9.1** .
- **Für die Sicherung/Wiederherstellung** aller Finger ist **Version 0.9.3** (vollständige 1536-Byte-Vorlagen) erforderlich.
- **Anmeldung über Adapter, LED-Ring, `info.wifiRssi` ** Erfordert **Version 0.9.4** .

## Changelog

### 0.7.10

- Polling interval is range-checked (5–600 s) even if the config is edited outside the UI
- Removed unused translation keys; translated the `localLinks` name into all languages

### 0.7.9

- New: link to the device WebUI in the instance list of Admin (`localLinks`)

### 0.7.8

- README is English-only (German disclaimer moved to `DISCLAIMER.de.md`), added the 0.7.7 changelog entry, updated `@iobroker/testing` to 6.3.x

### 0.7.7

- Security/stability: errors in the async webhook handlers can no longer crash the adapter; objects are only created for valid finger IDs (1–200); constant-time token comparison; webhook timeouts; name length and device response size limits; LED values are range-checked; fixed an unhandled rejection after a failed backup request
- Added a disclaimer to the README
- Updated `@iobroker/testing` to 6.3.x

### 0.7.6

- **HOTFIX for v0.7.5**: declaring `adminPassword` / `webhookToken` as `encryptedNative`
  made the js-controller transform previously stored plain text values into unusable data
  before the adapter started, so the device login (HTTP Basic auth) and the server-mode
  provisioning failed. `encryptedNative` was removed again — the values are only declared as
  `protectedNative` now, so stored values keep working
- Unusable values are detected automatically: the webhook token is regenerated and the log
  asks to enter the admin password again (this also covers settings that were saved while
  v0.7.5 was active)
- New `lib/secrets.js` with unit tests for the secret repair logic

### 0.7.5

- Repository checker fixes: moved `protectedNative` / `encryptedNative` to the **root** of
  `io-package.json` (inside `common` they were ignored and the schema reported error E1105),
  reduced `common.news` to 7 entries, added the complete MIT license text including the
  copyright line to the README, completed the `.vscode` JSON schema settings, bumped
  `@iobroker/testing` to 6.2.x

### 0.7.4

- Repository review fixes: corrected state roles (`control.enrollId`/`ledColor`
  use `level`, `ring.ringing` uses `sensor`), marked `adminPassword` /
  `webhookToken` as protected & encrypted native, added Node.js 26 to CI,
  bumped `@iobroker/testing` to 6.x, added `.vscode` JSON schema settings

### 0.7.3

- Automated npm publishing via npm Trusted Publishing (OIDC) with provenance;
  removed the npm token from the deploy workflow

### 0.7.2

- Repository compliance for the ioBroker adapter repo: responsive size attributes
  in the admin UI, license copyright line, Ukrainian translations, a deploy
  workflow job, and internal cleanups (no functional change)

### 0.7.1

- The *Enroll a new finger* section (Manage Fingers) now also shows the
  *Available fingers* reference dropdown, so you can pick a free slot ID

### 0.7.0

- **Enroll from the adapter** (firmware ≥ v0.9.4): start enrollment from the *Manage Fingers*
  tab or via `control.enrollStart`; live progress in the `enroll` channel
  (`active` / `step` / `status` / `message`)
- **LED ring control** (firmware ≥ v0.9.4): `control.ledMode` + `control.ledColor`
- **WiFi signal**: new `info.wifiRssi` state (firmware ≥ v0.9.4)
- **Conditions**: added an *Available fingers* reference dropdown (id → name) so you know
  which IDs to enter

### 0.6.1

- Fix invalid jsonConfig: remove unsupported `attr` from the Manage Fingers rename fields (settings page failed to load)

### 0.6.0

- **Manage Fingers** tab: rename a finger, and backup / restore all fingerprints
  (stored in a file on the ioBroker host that survives adapter updates)
- **Snapshot** action: per-rule checkbox + a *Snapshot target* object — set in addition
  to the normal action, e.g. to trigger a script that captures an ESP32-CAM snapshot

### 0.5.1

- Conditions: the Finger field accepts several IDs comma-separated (e.g. `1,2,4`); added a hint/tooltip

Older entries: see CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 sadam6752-tech sadam6752@gmail.com

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