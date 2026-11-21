---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-tracker/docs/en/getting-started.md
title: Erste Schritte und Erststarttest
hash: 8esbDg0Oz2jU2vQopR3IIHw1XfW90d014d/ttKGYaGc=
---
# Erste Schritte und Erststarttest

Diese Anleitung führt Sie einmalig durch die Installation bis zum ersten Plug. Sie ist bewusst kurz gehalten und erklärt bei jedem Schritt, wie man erkennt, ob er erfolgreich war. Der vollständige Abnahmetest befindet sich in[`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) Die

## 1. Anforderungen

- Eine ioBroker-Instanz mit js-Controller (die CI prüft gegen den realen Controller), Node ≥ 22
- ein freier TCP-Port (Standard) `8092`)
- Für die **installierbare PWA** und den Service Worker: HTTPS – entweder der Adapter selbst (Einstellung **„HTTPS verwenden“** , Schritt 3) oder ein Reverse-Proxy (nginx/caddy), siehe README, Abschnitt „HTTPS und Reverse-Proxy“. Für einen einfachen Funktionstest, `http://<host>:8092` ist genug
- optional: ein Tablet oder Smartphone für das Kiosk-Terminal, ein NFC-Tag für T14/T15

## 2. Installieren

Der Adapter ist auf **npm** verfügbar – die übliche Installationsmethode ist die Installation über die ioBroker-Administration oder über npm. **Die Instanz `time-tracker.0` wird automatisch erstellt.**

- **Administrator:** Registerkarte _„Adapter“_ → nach _„time-tracker“_ suchen; falls der Adapter nicht in der Liste enthalten ist, das Symbol **„Von benutzerdefinierter URL installieren“** verwenden, Registerkarte **„npm“** und den Paketnamen eingeben. `iobroker.time-tracker` Die
- **Befehlszeile:** `iobroker install iobroker.time-tracker` (erstellt die Instanz ebenfalls – um sie separat zu erstellen:) `iobroker add time-tracker`).

**Prüfen:** Im Protokoll steht `web interface found at …/www`, `API listening on http://127.0.0.1:8092/api` Und `API routes: …` der Staat `time-tracker.0.info.connection` Ist `true` Die

> **Nur für Entwickler:** Das Repository enthält **nicht** `build/` Und `www/` (Die Web-App ist vorkompiliert), daher kann ioBroker in seiner jetzigen Form keinen Klon starten. `cannot find start file!`). Einmal kompilieren und den **Entwicklungsserver** des Projekts verwenden:
>
> ```bash
> npm ci
> npm run install:pwa    # dependencies of the web app
> npm run build:pwa      # web app → www/
> npm run build          # adapter → build/
> npm run dev-server     # local ioBroker with the adapter
> ```

## 3. Konfigurieren Sie die Instanz

In den Instanzeinstellungen (Registerkarten _Allgemein_ , _Sicherheit_ , _Migration und Sicherung_ ):

1. **Sitzungsgeheimnis** und **Badge-Link-Geheimnis (HMAC)** festlegen (beide werden verschlüsselt gespeichert; ohne das HMAC-Geheimnis sind signierte Badge-Links deaktiviert). Wenn das **Sitzungsgeheimnis** leer bleibt, generiert der Adapter beim ersten Start eines und speichert es in der Datei. `session-secret` neben der Datenbank – so bleiben Sitzungen und CSRF-Tokens auch nach einem Neustart erhalten. Ein Eintrag in diesem Feld hat immer Vorrang und ermöglicht eine gezielte Rotation.
2. Port und Bindungsadresse prüfen (`127.0.0.1` = nur lokal, `0.0.0.0` = LAN — bewusste Opt-in). Der Link in der Instanzzeile (Schritt 4) entspricht genau diesen beiden Werten.
3. Zeitzone prüfen (`Europe/Berlin`), Standardsprache und Urlaubsland.
4. Legen Sie das **Startpasswort des ersten Administrators** fest – oder lassen Sie es leer: dann wird **einmalig** ein zufälliges Passwort in das Protokoll geschrieben (`info.lastError` (bleibt leer, wenn nichts schiefgegangen ist). Der Wert zählt auch, wenn Sie ihn **nach** dem ersten Start eingeben: Solange der erste Administrator das Startpasswort noch nicht geändert hat – die App fordert die Änderung beim ersten Login an – setzt der Adapter das konfigurierte Passwort bei **jedem** Start und protokolliert dies (`… exists already and still has its start password - it was set from the instance settings now` Wenn das Passwort bereits geändert wurde, hat die Einstellung **keine Auswirkung** und der Adapter **gibt eine Warnung aus** :`the configured start password is not
   used` Anschließend wird das Feld geleert (der Administrator ändert das Passwort im eigenen Profil der App) oder eine Sicherung wiederhergestellt, die noch das Startpasswort enthält. Bei jedem Start wird genau einer dieser Fälle gemeldet – eine stille Instanz existiert nicht mehr.
5. Optional: **Kiosk-Terminal aktivieren** und Backups beibehalten.
6. HTTPS ohne Proxy: Aktivieren Sie **„HTTPS verwenden“** und wählen Sie Zertifikat und Schlüssel aus der Zertifikatssammlung von ioBroker ( **Admin → Einstellungen → Zertifikate** ). Fehlt das Zertifikat, bleibt die App deaktiviert – es erfolgt **kein** automatischer Fallback auf HTTP; die Ursache ist im Protokoll vermerkt.
7. Hinter einem Proxy: Aktivieren Sie **„Vertrauen Sie dem Reverse-Proxy“** (ansonsten `X-Forwarded-*` wird ignoriert).

## 4. Erstanmeldung

Öffnen Sie die Web-App (`http://<host>:8092/`) — bequemer: Klicken Sie auf das Symbol in der Zeile `time-tracker.0` In der Admin-Liste **unter „Instanzen** “ („Zeiterfassungs-App öffnen“) gelangen Sie zur selben Adresse, die sich aus Host und Port der Instanzeinstellungen zusammensetzt. Melden Sie sich anschließend mit dem Admin-Login und dem Startpasswort an. Der Server fordert sofort eine **Passwortänderung** an – die PWA zeigt hierfür ein eigenes Fenster an. Danach:

1. **Administration → Benutzer** : Mitarbeiter anlegen (Login, Name, Passwort, Rolle) und jedem eine **Ausweis-PIN** (4–8 Ziffern) zuweisen, falls die Mitarbeiter am Kiosk mit PIN stempeln sollen. Mit **„Foto“** speichern Sie ein Bild des Mitarbeiters (PNG/JPEG/WEBP/GIF bis zu 256 KB). Dieses wird auf den Kacheln des Anwesenheitsbildschirms und am Kiosk angezeigt; ohne Bild wird ein Platzhalter angezeigt. Im **Arbeitsprofil** eines Mitarbeiters wird **unter „Arbeitszeit“ auf der Anwesenheitskarte** die heutige Arbeitszeit auf dessen Kachel angezeigt. `1:23`, ohne einen Schlag `0:00` Die Karte ist für alle sichtbar, noch **bevor** die PIN eingegeben wird. Daher hat die Verwaltung beschlossen, dass die Karte für jeden Mitarbeiter standardmäßig **deaktiviert** ist.
2. **Administration → Terminals** : Terminal erstellen (PIN erforderlich), **Gerätetoken kopieren** und die angezeigte Adresse öffnen `…/terminal/<token>/` Auf dem Tablet – das war der Kiosk-Schritt von T4. Ohne **PIN-Eingabe funktionierte** das Gerät ohne PIN: Das Scannen eines Ausweises oder die Auswahl des Namens genügte. Eine falsche PIN wurde weiterhin abgelehnt.
3. **Administration → Einstellungen** : festlegen `report_font_path` zu einem Unicode `.ttf` /`.otf` Wenn die Dokumente in **russischer** , **britischer** oder **chinesischer Sprache** gedruckt werden sollen (ansonsten wird der Export abgelehnt), `report_font_missing`).
4. **Verwaltung → Korrekturen** : Prüfen und korrigieren Sie die Stempelzeiten eines Mitarbeiters. Wählen Sie dazu Mitarbeiter und Monat aus, ändern Sie die Uhrzeit (Stiftsymbol), löschen Sie einen Stempel (Papierkorb) oder **fügen Sie** fehlende Stempel hinzu („Stempel oder Tag hinzufügen“: Datum, Ankunft, Abfahrt; lassen Sie „Abfahrt“ leer, wenn nur ein Stempel fehlt). Der **Grund** oben im Tab wird im Prüfprotokoll vermerkt, und hinzugefügte Stempel erhalten den Vermerk „Von der Verwaltung hinzugefügt“ – so bleibt jede Korrektur nachvollziehbar.

## 5. Erste Stempelungen und Kontrollen

- Melden Sie sich in der Web-App an (Ein-/Ausloggen), öffnen Sie die Monatsansicht und laden Sie den Bericht als XLS und PDF herunter.

- Beispiel laden (T17) gegen die laufende Instanz:

  ```bash
  npm run load-smoke -- --login <user> --password '<password>' --count 5
  ```

  Erwartet: `OK: kein Fehler, alle Stempel vorhanden, Antwortzeiten im Sekundenbereich.` (Code 0; das Skript gibt die Ausgabe auf Deutsch aus).

- Automatische Überprüfung des Erststartprozesses (Anmeldung, erzwungene Passwortänderung, Mitarbeiter mit Ausweis-PIN, Zeiterfassung, Tages- und Monatsauswertung, XLS- und PDF-Bericht, Datensicherung):

  ```bash
  npm run first-run -- --login admin --password '<start password>'
  ```

  Erwartet: `Ergebnis: <all>/<all> Schritte erfüllt` Und `OK: Erststart-Strecke ohne Fehler.` (Code 0). Das Skript erstellt den Mitarbeiter. `pruefung` Mit Stempeln und PIN – anschließend in der Administration löschen, um saubere Daten zu gewährleisten. Was absichtlich ausgelassen wird (da eine Einstellung erforderlich ist), wird am Ende selbst erwähnt: Das Kiosk-Terminal und die Badge-Verknüpfung werden im Testplan manuell geprüft.

- **Anwesenheitskontrolle von ioBroker:** Jeder Mitarbeiter hat den beschreibbaren Status `time-tracker.0.users.<id>.present` (Rolle `switch`). `true` Stempelt ein (bezahlte Arbeitszeit), `false` Ausstanzungen – gedacht für einen Fingerabdruckleser, eine RFID-Brücke, ein Dashboard oder ein Skript. Schreiben ist idempotent (eine zweite `true` erzeugt keinen zweiten Schlag) und erscheint als normaler Schlag mit der Note `state.present` Die `users.<id>.hasOpenEntry` Es bleibt die reine Darstellung.

- **Befehle von ioBroker (Skript, Blockly, Dashboard):** unten `time-tracker.0.commands.*` Es gibt sechs beschreibbare Zustände – sie steuern den Adapter ohne Weboberfläche. Was Sie schreiben, wird anschließend im Adapterprotokoll (und im Audit-Protokoll als _System_ ) protokolliert:

  ```js
  setState("time-tracker.0.commands.punchUserId", 3); // target employee (0 = the only one)
  setState("time-tracker.0.commands.punch", true); // punch in or out
  setState("time-tracker.0.commands.quickPunch", true); // with quick rounding
  setState("time-tracker.0.commands.recalc", "2026-08"); // month, or "2026" for the year
  setState("time-tracker.0.commands.closeMonth", "2026-08"); // the month closing needs YYYY-MM
  setState("time-tracker.0.commands.backup", true); // write a backup now
  ```

  **Die beiden Schlagknöpfe reagieren auf `true` ausschließlich** (alle anderen Werte werden ignoriert), und der Adapter setzt sie wieder auf `false` sofort – also **niemals** schreiben `false` zum Ausstempeln: `punch` nimmt automatisch die richtige Richtung.

  **Welcher Mitarbeiter?** Die Stempelbefehle erfassen den Mitarbeiter. `commands.punchUserId` (Der Adapter entspricht der dort aktuell gewählten Option.) `0` = „der einzige Mitarbeiter“). Wenn mehrere Mitarbeiter vorhanden sind und keine Auswahlmöglichkeit besteht, wird der Befehl abgelehnt und dies im Protokoll vermerkt. Die Mitarbeiter-ID wird in der Instanz unter angezeigt. `users.<id>` (die Zahl dahinter) `users.`).

  Auch ohne einen festgelegten Zielmitarbeiter funktioniert es **pro Mitarbeiter** : `time-tracker.0.users.<id>.present` (siehe oben) oder eine Nachricht über `sendTo("time-tracker.0", "punch", { user: "anna" }, answer => …)` Die

  Fehler (falscher Zeitraum, unbekannter oder deaktivierter Mitarbeiter) werden als **Warnung im Protokoll** angezeigt – die Instanz läuft weiter.

- **Doppelerfassungsschutz (wichtig für Lesegeräte):** Zwei Stempelvorgänge innerhalb von **30 Sekunden** werden als Doppelscan gewertet – der zweite wird nicht gezählt. Ein Fingerabdruck- oder RFID-Lesegerät, das mehrmals auslöst, ist in diesem Fall unproblematisch; für eine sofortige erneute Stempelung muss der Abstand größer als 30 Sekunden sein. Dies gilt für alle Erfassungsmethoden (Web-App, Kiosk, Badge, ioBroker-Objekt).

- Offline-Beispiel: WLAN-Verbindung trennen, stempeln, Verbindung wiederherstellen – der Stempel wird später zugestellt (siehe _Synchronisierung_ ).

- Administration → **Backups** : Klicken Sie auf „Jetzt erstellen“; der Status `time-tracker.0.info.lastBackup` Sprünge.

- Optional, empfohlen: Kopieren Sie die Backups auf einen anderen Computer. Gehen Sie in den Instanzeinstellungen auf die Registerkarte _„Migration und Backup“_ , Abschnitt _„Externes Backup“_ : Aktivieren Sie die **Option „Backups auf einen externen Server kopieren (SFTP)“** , geben Sie Server, Benutzername, Passwort und Verzeichnis ein, klicken Sie auf **„Verbindung testen“** (der Fingerabdruck wird angezeigt) und speichern Sie die Einstellungen. Nach dem nächsten Backup…`time-tracker.0.info.lastRemoteBackup` benennt die Kopie auf dem Server und `info.remoteBackupError` ist leer.

- Führen Sie den Backup- und Wiederherstellungsprozess einmal durch: Stoppen Sie die Instanz, kopieren Sie die Backup-Datei **aus** dem Adapterverzeichnis heraus und starten Sie die Instanz neu.

## 6. Kein Datenimport

Der Adapter liest **keine** Daten von anderen Zeiterfassungssystemen. Mitarbeiter, Stempelungen und Abwesenheiten werden in der Benutzeroberfläche angelegt:

- **Mitarbeiter:** Verwaltung → Benutzer (Login, Name, Passwort, Rolle, optionales Foto, Ausweis-PIN)
- **Vergangene Zeiten:** Administration → **Korrekturen** – hier können Stempelungen geändert, gelöscht und hinzugefügt werden, auch ganze vergangene Tage (Datum, Eingang, Ausgang). Der **Grund** (Feld über der Liste oder im Dialogfeld) wird im Überwachungsprotokoll des Adapters gespeichert; das Symbol neben jeder Stempelung zeigt jederzeit deren **Verlauf** (wer, wann, warum) an.

## 7. Wenn etwas feststeckt

| Symptom                                      | Erster Ort zum Suchen                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Web-App nicht erreichbar                     | Protokoll `API listening on …`, Zustand `info.connection`                                                            |
| PWA kann nicht installiert werden            | HTTPS erforderlich (eigenes Zertifikat oder Reverse-Proxy), überprüfen Sie den Service-Worker-Bereich im Protokoll. |
| Fehlende/leere Meldung in `ru` /`uk` /`zh-cn` | Satz `report_font_path` (Administration → Einstellungen)                                                             |
| Der Kiosk akzeptiert keine PIN.              | Zustand `info.lastError` Kontosperrung nach 5 fehlgeschlagenen Versuchen (15 Minuten)                                |
| Alles unklar                                 | laufen `npm run test:ts`, `npm run test:package`, `npm run test:integration` lokal                                   |

Die Akzeptanzkriterien und das Protokollblatt befinden sich in[`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) (T1–T29); Abweichungen und Entscheidungen in[`decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md) Die