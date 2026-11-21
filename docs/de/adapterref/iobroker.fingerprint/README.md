---
chapters: {"pages":{"en/adapterref/iobroker.fingerprint/README.md":{"title":{"en":"ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/README.md"},"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md":{"title":{"en":"Haftungsausschluss (Disclaimer) — ioBroker.fingerprint"},"content":"en/adapterref/iobroker.fingerprint/DISCLAIMER.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fingerprint/README.md
title: ioBroker.fingerprint
hash: 99wXQMkIBykzoE0jCJouqLb7XrETk4ClVjwKGlE84w0=
---
![Stabil](https://iobroker.live/badges/fingerprint-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.fingerprint.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fingerprint.svg)
![Lizenz](https://img.shields.io/github/license/sadam6752-tech/ioBroker.fingerprint.svg)
![NPM](https://nodei.co/npm/iobroker.fingerprint.png?downloads=true)
![Test und Freigabe](https://github.com/sadam6752-tech/ioBroker.fingerprint/actions/workflows/test-and-release.yml/badge.svg)
![Anzahl der Installationen](https://iobroker.live/badges/fingerprint-installed.svg)

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
- **Biometrische Daten / Datenschutz (DSGVO).** Fingerabdruckvorlagen, Namen, Zeitstempel und Zugriffsprotokolle sind personenbezogene Daten. Sie sind der Verantwortliche: Holen Sie die Einwilligung der betroffenen Personen ein und schützen Sie die Sicherungsdateien (diese enthalten die unverschlüsselten Rohdatenvorlagen) im Speicherordner. `fingerprint.0.storage`, lesbar für jeden Administratorbenutzer und möglicherweise über ein `web` Instanz und auf einem externen SFTP-Server (siehe _Backup_ ) und beachten Sie die für Sie geltenden Gesetze (z. B. DSGVO/BDSG, Betriebsratsvorschriften für Arbeitnehmer).
- **Aktionen werden unbeaufsichtigt ausgeführt.** Fingerprint-Regeln schreiben in beliebige ioBroker-Objekte (Lampen, Schlösser, Alarme, Skripte). Testen Sie Ihre Regeln sorgfältig, bevor Sie sich darauf verlassen.
- Die Autoren übernehmen keine Haftung für Schäden, Datenverlust, unbefugten Zugriff, Einbruch oder sonstige Folgen, die sich aus der Verwendung oder dem Missbrauch dieser Software ergeben.

Eine deutsche Version ist unter [DISCLAIMER.de.md](/#/docs/adapterref/iobroker.fingerprint/DISCLAIMER.de.md) verfügbar.

## Sicherheit

Die Kommunikation ist in beide Richtungen authentifiziert:

- **Adapter → Gerät** (Statusabfrage, Neustart, Berührungsring): HTTP-Basisauthentifizierung mit dem konfigurierten Administratorbenutzer / Administratorpasswort.
- **Gerät → Adapter** (Match/Ring-Webhooks): ein gemeinsam genutztes **Webhook-Token** . Das Token wird beim ersten Start automatisch generiert und in den Instanzeinstellungen angezeigt. Anfragen ohne gültiges Token (über `token` Abfrageparameter oder `X-Auth-Token` Anfragen mit dem Header werden mit HTTP 401 abgelehnt. Optional können Sie die Option _„Webhooks nur von der Geräte-IP akzeptieren“_ aktivieren, um auch Anfragen von anderen Hosts abzulehnen.

Bei Firmware-Versionen < v0.9.1 muss das Token manuell in die Geräte-URLs eingefügt werden. Ab v0.9.1 (Servermodus) stellt der Adapter die URLs und das Token automatisch bereit.

`adminPassword` Und `webhookToken` werden **verschlüsselt** in der Instanzkonfiguration gespeichert (`encryptedNative`) und sind **geschützt** (`protectedNative` Daher können andere Adapter sie nicht lesen. Werte, die von Version 0.7.12 oder älter als Klartext gespeichert wurden, werden beim ersten Start von Version 0.7.13 automatisch verschlüsselt: Das Protokoll zeigt Folgendes: `… is now stored encrypted (one-time migration)` Die Instanz wird einmal neu gestartet – das ist zu erwarten und kein Absturz.

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
- **Einen neuen Finger registrieren** – siehe unten.

Sicherung und Wiederherstellung befinden sich auf der Registerkarte **„Sicherung** “ (siehe _Sicherung_ ).

Speichern Sie zuerst die Instanzeinstellungen, damit die Geräteverbindung hergestellt werden kann.

## Backup (v0.8.0, Speicherordner und Wiederherstellung v0.8.1)

Alles rund um Backups finden Sie auf der Registerkarte **„Backup“** der Instanzeinstellungen: **Backup erstellen** , **Backup wiederherstellen** + **das ausgewählte Backup wiederherstellen** , das automatische Backup, das Kopieren auf einen externen Server und die Wiederherstellung von diesem Server.

> **Hinweis:** Für eine zuverlässige Sicherung und Wiederherstellung _aller_ Finger ist Firmware- **Version 0.9.4** (vollständige 1536-Byte-Vorlagen) erforderlich. Mit älterer Firmware erstellte Sicherungen sind unvollständig – erstellen Sie diese nach dem Update neu.

### Speicherordner

Jede Datensicherung (manuell, automatisch, vom Server abgerufen, Sicherheitskopie) ist eine Datei im ioBroker-Dateispeicherordner. `fingerprint.0.storage/backups/`:

| Datei                                | Hergestellt von                                                      | Automatisch gelöscht                                                                                                       |
| ------------------------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `fingerprint-backup-<time>.json`     | _Backup erstellen_                                                   | niemals                                                                                                                    |
| `fingerprint-auto-<time>.json`       | automatische Sicherung                                               | die ältesten Backups, die über _die automatischen Backups hinaus aufbewahrt werden sollen_ (Standard 7, 0 = alle behalten) |
| `fingerprint-prerestore-<time>.json` | Sicherheitskopie des Sensors unmittelbar vor einer Wiederherstellung | niemals                                                                                                                    |

- Im Adminbereich, Registerkarte „ **Dateien“** , öffnen `fingerprint.0.storage` →`backups` Um eine Sicherungskopie **herunterzuladen** oder **hochzuladen** (z. B. eine Kopie von Ihrem NAS); hochgeladene Dateien müssen das oben genannte Namensmuster beibehalten.
- Der Montagepunkt ist vom Typ `meta.user` Daher wird bei ioBroker-Backups (BackItUp: diese Instanz und ihre Dateien einschließen) der Ordner mitgesichert.
- Die Sicherungsdatei der Version 0.8.0 und älter (`<iobroker-data>/fingerprint.0/fingerprints-backup.json`) wird einmal in den Ordner verschoben als `fingerprint-backup-<time of the file>.json` Die alte Datei wird umbenannt in `fingerprints-backup.json.migrated` Die
- Wie alle Dateien im Speicher sind auch die Backups für jeden Administrator lesbar, und wenn ein `web` Die Instanz dient dem Dateispeicher ohne Anmeldung, möglicherweise im Browser. Sie enthält die Rohdaten der Fingerabdruckvorlagen (biometrische Daten): Schützen Sie Ihre Admin- und Webinstanzen entsprechend.

### Wiederherstellen

Registerkarte **„Sicherung“** → **Wiederherstellbare Sicherung** : Wählen Sie eine Sicherung (neueste zuerst; öffnen Sie die Einstellungen erneut, um die Liste zu aktualisieren) → **Ausgewählte Sicherung wiederherstellen** → Bestätigen. Der Adapter prüft die Datei (gültiges JSON, Finger-IDs 1–200, keine Duplikate, Vorlagen vorhanden) und speichert den aktuellen Inhalt des Sensors als `fingerprint-prerestore-<time>.json` Anschließend wird die Sicherung auf den Sensor geschrieben. Kann der aktuelle Inhalt nicht vom Gerät gelesen werden, wird die Wiederherstellung abgebrochen.

### Wiederherstellung nach einer Neuinstallation von ioBroker

1. Installieren Sie den Adapter und geben Sie die Geräteeinstellungen ein (IP-Adresse, Administratorbenutzername/Passwort). Speichern.
2. Bringen Sie eine Ersatzlösung mit – eine der folgenden:
   - **aus einem ioBroker/BackItUp-Backup** : Nach der Wiederherstellung ist der Speicherordner wieder vorhanden;
   - **Hochladen** : Admin → **Dateien** →`fingerprint.0.storage` →`backups` → Datei hochladen;
   - **Vom SFTP-Server** : Registerkarte **„Backup“** → SFTP-Einstellungen eingeben, Kopieren aktivieren, speichern → **Backup auf dem Server** → auswählen → **Vom Server abrufen und wiederherstellen** . Die Datei wird in den Speicherordner abgerufen und in einem Schritt wiederhergestellt.
3. Für die ersten beiden Methoden: Registerkarte **„Sicherung“** → **Wiederherstellbare Sicherung** → **Die ausgewählte Sicherung wiederherstellen** .

### Automatische Datensicherung

Im Tab **„Backup“** der Instanzeinstellungen kann die automatische Sicherung des Fingerabdrucks **täglich** oder **wöchentlich** erstellt werden – diese Funktion ist standardmäßig **deaktiviert** . Jede automatische Sicherung erzeugt eine neue Datei im Speicherordner; das Gerät muss erreichbar sein.

- Das Zeitintervall beginnt mit der letzten Datensicherung (manuell oder automatisch), auch nach einem Neustart des Adapters. Eine überfällige Datensicherung wird fünf Minuten nach dem Start ausgeführt.
- Ein Gerät, das **keine** Fingerabdrücke zurückgibt, erstellt keine Sicherung (die automatische Sicherung wird übersprungen und protokolliert).
- Ist das Gerät nicht erreichbar, erfolgt der nächste Versuch nach einer Stunde. Eine laufende Registrierung verzögert die Datensicherung um zehn Minuten.
- Der Zeitpunkt der letzten Datensicherung wird angezeigt in `info.lastBackup` Die

### Auf einen externen Server kopieren (SFTP)

Ein Backup, das sich auf demselben Rechner wie ioBroker befindet, geht bei Ausfall dieses Rechners verloren. Über den **Backup-** Tab können Sie **jedes Backup** (automatisch und manuell) per **SFTP** auf einen anderen Computer, beispielsweise ein NAS, kopieren. Der Adapter stellt die SSH-Verbindung selbstständig her: kein Mounten, kein …`sudo`, kein Shell-Befehl.

1. Erstellen Sie auf dem Server einen Benutzer, der nur in das Zielverzeichnis schreiben darf (kein Administrator) und schalten Sie SFTP ein (auf einem Synology: _Systemsteuerung → Dateidienste → FTP → SFTP-Dienst aktivieren_ ).
2. Im Tab **„Backup“** aktivieren Sie die Kopierfunktion und geben Hostname, Benutzername, Passwort und das Verzeichnis ein (dieses wird automatisch erstellt, falls es fehlt). Das Passwort wird verschlüsselt gespeichert und niemals in das Protokoll geschrieben.
3. Klicken Sie auf _„Verbindung testen“_ : Der Adapter meldet sich an, erstellt das Verzeichnis, schreibt und löscht eine kleine Testdatei und zeigt den **Fingerabdruck** des Servers an. Geben Sie diesen Fingerabdruck in den Einstellungen ein, um nur diesem Server zu vertrauen – ein anderer Server wird dann abgelehnt, bevor das Passwort gesendet wird. Auch ohne Fingerabdruck funktioniert das Kopieren, der Server wird jedoch nicht verifiziert (das Protokoll warnt bei jedem Kopiervorgang mit dem Fingerabdruck).

So verhält es sich:

- Zuerst wird eine lokale Sicherung erstellt. Schlägt das Kopieren fehl, bleibt die Sicherung erhalten, der Fehler wird protokolliert und angezeigt. `info.remoteBackupError` Die letzte erfolgreiche Kopie befindet sich in `info.lastRemoteBackup` Ein fehlgeschlagener Kopiervorgang wird **nicht wiederholt** : Die nächste Sicherung wird erneut kopiert.
- Dateinamen: `fingerprint-backup-<time>.json` (von Hand) und `fingerprint-auto-<time>.json` (automatisch), Zeitangabe in UTC.
- Eine Kopie erscheint erst dann unter ihrem endgültigen Namen, wenn sie fertiggestellt ist (hochgeladen als `.part` (Größe geprüft, umbenannt). Die gesamte Kopie ist auf zehn Minuten begrenzt. Überbleibsel unterbrochener Uploads dieses Adapters werden durch die nächste fehlerfreie Kopie entfernt.
- _Die Option „Kopien auf dem Server behalten“_ löscht die ältesten **automatisch erstellten** Kopien ab einer bestimmten Anzahl (0 = alle behalten). Manuell erstellte Backups und alle anderen Dateien im Verzeichnis werden niemals gelöscht.
- Es wird ausschließlich die Anmeldung mit Passwort unterstützt. Die Datei selbst ist serverseitig **unverschlüsselt** , die Übertragung jedoch schon. Sie enthält die Rohdaten der Fingerabdruckvorlagen (biometrische Daten): Bewahren Sie sie auf einem Datenträger auf, auf den nur Sie Zugriff haben.

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

| Zustand                      | Typ                            | Beschreibung                                                             |
| ---------------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| `info.connection`            | boolescher Wert                | Gerät erreichbar (über `/api/status` oder `/debug` Umfrage)                |
| `info.uptime`                | Nummer                         | Gerätebetriebszeit in Sekunden                                           |
| `info.freeHeap`              | Nummer                         | Freier Heap in Bytes                                                     |
| `info.firmwareVersion`       | Zeichenkette                   | Geräte-Firmwareversion                                                   |
| `info.serverMode`            | boolescher Wert                | Das Gerät sendet Ereignisse direkt an diesen Adapter.                    |
| `info.wifiRssi`              | Nummer                         | WLAN-Signalstärke in dBm (Firmware ≥ v0.9.4)                             |
| `info.lastBackup`            | Nummer                         | Zeitpunkt der letzten Fingerabdrucksicherung (manuell oder automatisch)  |
| `info.lastRemoteBackup`      | Zeichenkette                   | Pfad der letzten Kopie auf dem externen SFTP-Server                      |
| `info.remoteBackupError`     | Zeichenkette                   | Fehler beim letzten Kopieren auf den externen Server (leer = in Ordnung) |
| `fingerprints.<id>.name`     | Zeichenkette                   | Name des registrierten Fingers mit dieser ID                             |
| `fingerprints.<id>.lastSeen` | Nummer                         | Zeitstempel der letzten Fingerabgleichung                                |
| `fingerprints.<id>.count`    | Nummer                         | Wie oft der Finger übereinstimmte                                        |
| `lastAccess.text`            | Zeichenkette                   | Letzter lesbarer Zugriffseintrag (gewährt/verweigert)                    |
| `lastAccess.granted`         | boolescher Wert                | Ob der letzte Zugriff gewährt wurde                                      |
| `lastAccess.timestamp`       | Nummer                         | Zeitstempel des letzten Zugriffs                                         |
| `stats.totalMatches`         | Nummer                         | Übereinstimmungen der gesamten Fingerabdrücke                            |
| `stats.totalRings`           | Nummer                         | Anzahl der Türklingeln (Finger unbekannt)                                |
| `stats.lastPerson`           | Zeichenkette                   | Name der zuletzt erkannten Person                                        |
| `lastMatch.id`               | Nummer                         | ID des zuletzt zugeordneten Fingers (1–200)                              |
| `lastMatch.name`             | Zeichenkette                   | Name des zuletzt übereinstimmenden Fingers                               |
| `lastMatch.confidence`       | Nummer                         | Selbstvertrauen im Spiel                                                 |
| `lastMatch.timestamp`        | Nummer                         | Zeitstempel des letzten Spiels                                           |
| `lastMatch.matched`          | boolescher Wert                | Bei jedem Spielereignis auf „true“ setzen.                               |
| `ring.ringing`               | boolescher Wert                | Trifft für ein paar Sekunden beim Klingeln an der Tür zu.                |
| `ring.timestamp`             | Nummer                         | Zeitstempel des letzten Klingelns                                        |
| `control.reboot`             | boolescher Wert (Schaltfläche) | Starten Sie das Gerät neu.                                               |
| `control.ignoreTouchRing`    | boolescher Wert (Schalter)     | Den Touch-Ring ignorieren (Firmware ≥ v0.9.1)                            |
| `control.enrollId`           | Nummer                         | Slot-ID (1–200) für die nächste Registrierung (Firmware ≥ v0.9.4)        |
| `control.enrollName`         | Zeichenkette                   | Name für die nächste Registrierung (Firmware ≥ v0.9.4)                   |
| `control.enrollStart`        | boolescher Wert (Schaltfläche) | Registrierung starten (Firmware ≥ v0.9.4)                                |
| `control.ledMode`            | Nummer                         | LED-Ringmodus 0–3 (Firmware ≥ v0.9.4)                                    |
| `control.ledColor`           | Nummer                         | LED-Ringfarbe 1–7 (Firmware ≥ v0.9.4)                                    |
| `enroll.active`              | boolescher Wert                | Registrierung läuft (Firmware ≥ v0.9.4)                                  |
| `enroll.step`                | Nummer                         | Aktueller Einschreibungsscan Schritt 0–5                                 |
| `enroll.status`              | Zeichenkette                   | `idle` /`scanning` /`success` / `error`                                  |
| `enroll.message`             | Zeichenkette                   | Letzte Zeile zum Einschreibungsstatus                                    |

## Firmware-Hinweis

- **Match / Ring / Status / Reboot** funktionieren mit FingerprintDoorbell **v0.9** unverändert.
- ** `control.ignoreTouchRing` ** Der Servermodus und die Fingerabdruckliste erfordern **Version 0.9.1** .
- **Für die Sicherung/Wiederherstellung** aller Finger ist **Version 0.9.3** (vollständige 1536-Byte-Vorlagen) erforderlich.
- **Anmeldung über Adapter, LED-Ring, `info.wifiRssi` ** Erfordert **Version 0.9.4** .

## Changelog

### **WORK IN PROGRESS**

- `@iobroker/testing` 6.3.2 (repository checker W0037)

### 0.8.3

- The webhook port is declared in the used resources registry of js-controller (js-controller 8 and newer), and a warning is logged when another instance already uses it; nothing changes on older controllers

### 0.8.2

- Admin UI: *Create backup* and *Restore* moved from *Manage Fingers* to the **Backup** tab, so everything about backups is on one page

### 0.8.1

- New **storage folder** `fingerprint.0.storage/backups/` (`meta.user`): every backup is a file there — download and upload it in the admin tab *Files*; ioBroker/BackItUp backups take it along. The backup file of 0.8.0 is moved there once
- New: **restore a chosen backup** (list newest first, confirmation). Before every restore the current content of the sensor is saved as a safety copy (`fingerprint-prerestore-…`); the file is checked first (JSON, ids 1–200, no duplicates, templates)
- New: **restore from the external SFTP server** — list the backups on the server, fetch one into the storage folder and restore it (for a new installation of ioBroker)
- New setting *Automatic backups to keep* (default 7); backups made by hand and safety copies are never deleted
- Tests: storage, restore, safety copy and SFTP restore against a real js-controller, a simulated device and an SFTP server inside the test

### 0.8.0

- New **Backup** tab: automatic fingerprint backup (off, daily, weekly; off by default). The interval counts from the last backup, also after a restart; an empty device never replaces an existing backup
- New: every backup (by hand and automatic) can be copied to an external server over **SFTP** (e.g. a NAS) — upload as `.part` with size check and rename, optional host key fingerprint, test button, cleanup of old automatic copies. The password is stored encrypted (`encryptedNative`)
- New states `info.lastBackup`, `info.lastRemoteBackup`, `info.remoteBackupError`
- Admin buttons wait until the adapter has finished its start
- New dependency `ssh2`; tests against an SFTP server inside the test and an integration test with a simulated device

### 0.7.13

- Security: `adminPassword` and `webhookToken` are stored encrypted (`encryptedNative`), resolving repository checker warning W1074
- Values stored as plain text by older versions are encrypted automatically on the first start (`lib/secrets.js`). The log shows `… is now stored encrypted (one-time migration)` and the instance restarts once; nothing has to be entered again
- A newly generated webhook token is stored encrypted
- Tests: unit tests against the encryption of js-controller 7.2.2 and integration tests with a real js-controller

### 0.7.12

- Security: the webhook token no longer appears in error messages; the backup file is only readable by its owner (`0600`); match events with invalid finger IDs are ignored; device-supplied names are sanitized (control characters, length); rejected webhook requests are logged rate-limited; removed the unused `getWebhookInfo` message command
- Stability: the webhook start is retried every 30 s if the port is busy
- Admin UI: quotes and backslashes in the rename/enroll name fields are rejected (they broke the request)

### 0.7.11

- Fix: `lastMatch.matched` is reset after 3 s, so every match is a state change for scripts
- Fix: `info.connection` is correct when status polling is disabled (one initial poll is always done)
- Fix: match/ring counters no longer lose concurrent events
- Faster adapter stop (idle webhook connections are closed)
- README: added badges

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