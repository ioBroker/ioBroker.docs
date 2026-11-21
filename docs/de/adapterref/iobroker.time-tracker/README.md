---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-tracker/README.md
title: ioBroker.time-tracker
hash: WL4JqPN17gYVQdcXmsRqzyhuWDj501NHijyscDD7/dg=
---
![Logo](../../../en/adapterref/iobroker.time-tracker/admin/time-tracker.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.time-tracker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.time-tracker.svg)
![Lizenz](https://img.shields.io/github/license/sadam6752-tech/ioBroker.time-tracker.svg)
![NPM](https://nodei.co/npm/iobroker.time-tracker.png?downloads=true)
![Test und Freigabe](https://github.com/sadam6752-tech/ioBroker.time-tracker/workflows/Test%20and%20Release/badge.svg)

# ioBroker.time-tracker

Eine Stempeluhr für ioBroker. Mitarbeiter stempeln ein und aus, der Adapter berechnet Zielzeit und Saldo, Abwesenheiten und Urlaub werden verwaltet und der Monatsbericht wird als PDF oder Excel-Datei heruntergeladen. Alles läuft im Browser – als App auf dem Smartphone installierbar – und ein gemeinsam genutztes Tablet in der Werkstatt oder am Eingang stempelt mit einem Ausweis oder einer PIN. Alle Daten bleiben auf Ihrem eigenen ioBroker-Server: keine Cloud, kein Abonnement.

## Merkmale

- **Ein- und Ausstempeln** in der Web-App (Smartphone, Tablet, PC); installierbar als App (PWA) und speichert die Stempelzeiten auch offline
- **Terminal für alle** : Ausweis (RFID/NFC) oder PIN auf einem gemeinsam genutzten Tablet sowie eine Anzeigetafel, die anzeigt, wer am Arbeitsplatz ist.
- **Arbeitszeit** : Zielvorgabe basierend auf Wochenstunden, Beschäftigungsniveau und Arbeitstagen; Pausen (gestempelt oder nach gestaffelten Regeln), Überstundenregelungen, Überstundenübertragung, Urlaub und Feiertage
- **Abwesenheiten und Urlaub** : Anträge und Genehmigungen, halbe Tage, eine Vorschau der bereits geplanten Tage – und der Rückweg: Ein Mitarbeiter zieht einen offenen Antrag selbst zurück, beantragt die Stornierung einer genehmigten Abwesenheit, und die Verwaltung ändert, löscht oder lehnt sie ab.
- **Korrekturen** durch die Verwaltung (Änderung, Löschung, Hinzufügen eines Stempels oder eines ganzen Tages) – jede Änderung hat eine Begründung, und die Stempelhistorie bleibt lesbar; die Verwaltung öffnet den Tag direkt in der Monatsansicht eines Mitarbeiters.
- **Tagesnotizen** : Ein Mitarbeiter ändert seine Arbeitszeiten nicht selbst – er hinterlässt eine Notiz für die Verwaltung („Ein- oder Ausstempeln vergessen“), die vom Büro verbucht und als erledigt markiert wird.
- **Monatliche Kontoauszüge** im PDF- und Excel-Format, für das eigene Konto und – mit Recht – für jeden Mitarbeiter; Statistiken und Auszahlungen inklusive.
- **Rollen** : Administrator, Manager, Mitarbeiter; jede Entscheidung wird auf dem Server überprüft.
- **Automatisierungen** : Aggregationen, Live-Ereignisse und Befehle gemäß ioBroker-Status
- **Backups** : Erstellen, Herunterladen, Hochladen, beim nächsten Start wiederherstellen, Löschen – mit einem Aufbewahrungszeitraum
- **11 Sprachen** ; jeder Mitarbeiter wählt seine eigene

## Anforderungen

- ioBroker mit js-controller >= 6.0.11 und **Node.js >= 22** (erforderlich für den mitgelieferten SQLite-Treiber)
- HTTPS für die App auf einem Smartphone (der Service Worker benötigt dies) – ein Reverse-Proxy mit Let's Encrypt wird empfohlen.
- **Der Kompaktmodus** wird unterstützt: Die Instanz kann einen Prozess mit anderen Adaptern teilen (Kompaktgruppe). `1` oder höher). Die Datenbankarbeit erfolgt synchron, daher empfiehlt sich bei einem leistungsschwachen Host (z. B. einem Raspberry Pi) oder bei vielen Mitarbeitern die Wahl einer kompakten Gruppe. `0` in den Instanzeinstellungen – der Adapter läuft dann wie zuvor in einem eigenen Prozess.

## Installation

1. Installieren Sie den Adapter in der ioBroker-Administration: **Adapter** → Filter für _Zeiterfassung_ → installieren. Auf einem Rechner ohne Administrationsoberfläche kann dasselbe Paket über die Registry installiert werden. `iobroker install iobroker.time-tracker` **Die Instanz `time-tracker.0` wird automatisch erstellt** —`iobroker add time-tracker` wird nur benötigt, wenn Sie die Instanz für sich allein haben möchten.
2. Starten Sie die Instanz und öffnen Sie die Web-App auf dem Port der Instanzeinstellungen (Standard **8092** ): `http://<ioBroker host>:8092/` Die Instanzkachel im Adminbereich wird auf die gleiche Weise als Symbol angezeigt (siehe [Link in der Instanzliste](#the-link-in-the-instance-list) ), daher müssen Host und Port nicht eingegeben werden.
3. Melden Sie sich mit dem Startpasswort an (siehe [Erste Schritte](#first-start) ) und erstellen Sie Ihre Mitarbeiter.

### Der Link in der Instanzliste

Der Adapter meldet sich selbstständig über die Weboberfläche an (`common.localLinks`), und der Administrator erzeugt daraus ein Symbol: die Kachel von `time-tracker.0` Bei **Instances** bietet _die App „Zeiterfassung öffnen“_ dasselbe an – ein Klick genügt, und der Anmeldebildschirm erscheint, ohne dass Host und Port eingegeben werden müssen.

Die Adresse wird **nicht** im Adapter gespeichert; der Administrator setzt sie aus den Instanzeinstellungen zusammen – die Bindungsadresse gibt den Host und den Port an. Mit der Standardeinstellung `127.0.0.1` Der Link führt direkt zum ioBroker-Rechner (dort antwortet die App), mit `0.0.0.0` Es verwendet die Adresse, mit der Sie den Administrator kontaktiert haben, sodass Telefon und PC denselben Link verwenden. Eine Reverse-Proxy-Regel für `time-tracker.0` ersetzt den Link durch einen eigenen Pfad.

## Erster Start

Beim ersten Start werden die Datenbank, die Rollen und die Einstellungen erstellt – sowie **ein Administratorkonto** , denn andernfalls könnte sich niemand anmelden:

| Instanzeinstellung                      | Bedeutung                                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Anmeldung des ersten Administrators     | Anmeldung dieses Kontos, Standard `admin`                                                                 |
| Startpasswort des ersten Administrators | Passwort dieses Kontos; leer = ein zufälliges Passwort wird einmalig in das Adapterprotokoll geschrieben |

Das Konto beginnt mit der Aufforderung „Passwort ändern“. Das Startpasswort wird also genau einmal verwendet, und die App fordert sofort ein neues an. Konten, die später in der Administration erstellt werden, funktionieren genauso.

Das Startpasswort erscheint **einmal im ioBroker-Protokoll** : open `Logs` Im Adminbereich nach der Zeile suchen `administrator "admin" created with the start password "…" - change it at the first login` Die Instanzeinstellungen zeigen denselben Hinweis – geben Sie dort Ihr eigenes Passwort ein, dann muss nichts durchsucht werden.

**Auch die spätere Eingabe des Passworts funktioniert.** Solange das Konto noch sein unverändertes Startpasswort besitzt (die erzwungene Passwortänderung wurde also nie abgeschlossen), wendet der Adapter bei **jedem** Start das konfigurierte Startpasswort an. Ein nach dem ersten Start – oder nach der Wiederherstellung einer Datenbank – eingegebener Wert funktioniert daher sofort. Im Protokoll wird bei jedem Start vermerkt, welcher der vier Fälle vorliegt:

- `administrator "admin" created with the start password "Zf-…" - change it at the first login` — Es existierte kein Administrator und das Feld war leer; dies ist das generierte Passwort.
- `administrator "admin" created with the configured start password - it has to be changed at the first login` — Da kein Administrator vorhanden war, wurden die Werte der Instanzeinstellungen verwendet.
- `administrator "admin" exists already and still has its start password - it was set from the instance settings now`— Das Konto existierte, das konfigurierte Startpasswort wurde übernommen (der Eintrag im Audit-Trail lautet `start password from the instance settings`).
- `the configured start password is not used: administrator "admin" changed his password already` — Das Konto hat sein Passwort in der App geändert, daher hat die Einstellung keine Wirkung mehr: Löschen Sie das Feld (das Passwort gehört zur Profilseite dieses Kontos) oder stellen Sie eine Datenbank wieder her, die noch das ursprüngliche Passwort enthält.

Anschließend ist die übliche Reihenfolge: Mitarbeiter anlegen ( **Administration → Mitarbeiter** ), Arbeitszeit festlegen ( **Arbeitsprofil-** Schaltfläche der Zeile: Beschäftigungsstufe, Wochenstunden, Arbeitstage, Überstundenmodell, Urlaub, Übertrag, bezahlte Pausenminuten, eigene Pausenregeln) und – falls ein Tablet verwendet wird – ein Terminal anlegen und den Kiosk aktivieren (siehe [Terminal](#terminal-kiosk) ).

## Konfiguration

Der Adapter wird in den **Instanzeinstellungen** des ioBroker-Administrators konfiguriert:

| Einstellung                                                    | Bedeutung                                                                                                                                                                                            |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hafen                                                          | Port des HTTP-Servers (Web-App, API, Terminal)                                                                                                                                                       |
| Bindungsadresse                                                | Schnittstelle zum Abhören, ausgewählt aus den lokalen Adressen (`0.0.0.0` = alle)                                                                                                                    |
| Instanzzeitzone                                                | Ausweichzeitzone (IANA-Name), z. B. `Europe/Berlin`                                                                                                                                                   |
| Standardsprache für neue Benutzer                              | eine der 11 unterstützten Sprachen                                                                                                                                                                   |
| Urlaubsland                                                    | Land, das zur Generierung der Feiertage verwendet wird (Standard) `DE`)                                                                                                                              |
| Datenbankdatei                                                 | optionaler Pfad; leer = Adapterdatenverzeichnis                                                                                                                                                      |
| Kiosk-Terminal aktivieren                                      | schaltet das gemeinsame Badge-/PIN-Terminal ein                                                                                                                                                      |
| Verwenden Sie HTTPS                                            | Der Adapter antwortet selbst über HTTPS; wählen Sie dann das öffentliche Zertifikat, den privaten Schlüssel und, falls vorhanden, die Zertifikatskette aus der Zertifikatssammlung von ioBroker aus. |
| Vertraue dem Reverse-Proxy.                                    | verwenden `X-Forwarded-*` eines Proxys (Clientadresse, HTTPS)                                                                                                                                         |
| Sitzungsgeheimnis                                              | Geheimnis für CSRF-Token (im Ruhezustand verschlüsselt; leer = einmal generiert)                                                                                                                     |
| Badge-Link-Geheimnis (HMAC)                                    | Geheimnis für signierte Badge-/NFC-Verbindungen (verschlüsselt im Ruhezustand); leer = wird beim ersten Start generiert und neben der Datenbank gespeichert                                          |
| Sitzungsdauer in Minuten                                       | wie lange ein Login gültig ist                                                                                                                                                                       |
| Tage, an denen die Offline-Warteschlange von selbst akzeptiert | Wie weit zurückliegend die Stempel der Offline-Warteschlange ohne Entscheidung der Verwaltung akzeptiert werden                                                                                      |
| Runde schnelle Schläge auf Minuten                             | Rundung des Schnellschlags (0 = aus)                                                                                                                                                                 |
| Fehlzeiten nur bis heute berechnen                             | Zukünftige Abwesenheiten verkürzen die Zielzeit nicht.                                                                                                                                               |
| Arbeitszeit von Abwesenheiten abziehen                         | lässt den Urlaub zu Überstunden werden                                                                                                                                                               |
| Bewahren Sie Datenbanksicherungen mehrere Tage lang auf.       | Aufbewahrung der Backups                                                                                                                                                                             |

Diese Einstellungen überschreiben die in der Datenbank gespeicherten Werte und werden bei jedem Start angewendet.

### Einstellungen innerhalb der App

Weitere Einstellungen werden in der Web-App bearbeitet ( **Administration → Einstellungen** , rechts). `settings.edit`):

| Einstellung                                 | Bedeutung                                                                                                                                                                                                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pausenregel (`auto` /`punched` /`staffel`) | wie die Pause eines Tages bestimmt wird: die gestaffelte Pause (`auto`, Standard) oder nur die abgestuften Regeln                                                                                                                                                           |
| Stufenweise Pausenregeln (Pausenstaffel)    | „Von … bis … Minuten Blocklänge → so viele Minuten abgezogen“; die Pause eines Tages **ohne** Stempelung. Das Arbeitsprofil eines Mitarbeiters kann **eigene Regeln** beinhalten: Eine Regel mit demselben „Von Minuten“ ersetzt die Unternehmensregel nur für diese Person. |
| Bezahlte Pausenminuten (pro Mitarbeiter)    | wie hoch die Auszeit ausfällt: `0` = nicht bezahlt `15` = eine Viertelstunde, `1440` = beliebige Länge (Arbeitsprofil)                                                                                                                                                          |
| Firmenbranding                              | Logo, Hintergrundbild und Hintergrundfarbe für den Anmeldebildschirm, die Kopfzeile und die Kioskbildschirme – die Farbe färbt auch das Bild ein.                                                                                                                            |
| Unicode-Schriftart für PDF-Aussagen         | `report_font_path`: benötigt für `ru`, `uk`, `zh-cn` und Polnisch, andernfalls wird der Export mit einer klaren Botschaft abgelehnt                                                                                                                                          |

Die eintägige Pause wird in der Monatsansicht der App und in der Monatsabrechnung angezeigt – mit dem bezahlten Teil daneben.

## Rollen

| Rolle      | Mai                                                                                                                                |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `employee` | Stempeln, eigenen Monat und Jahr einsehen, Abwesenheiten beantragen, eine Nachricht für die Verwaltung hinterlassen – an einem Tag |
| `manager`  | alles, was ein Mitarbeiter tun kann, zuzüglich Stempelzeiten, Abrechnungen und Korrekturen für andere Mitarbeiter                  |
| `admin`    | Alles außer dem Stempeln: Mitarbeiter, Rollen, Terminals, Einstellungen, Backups                                                   |

Das **Administratorkonto** wird bei der Installation erstellt und gehört niemandem: Es verwaltet die Mitarbeiter, anstatt mit ihnen zusammenzuarbeiten, daher stempelt es nicht ein (die Rolle hat keine `time.punch` Wer auch arbeitet, erhält das Recht durch die `employee` Rolle – Berechtigungen sind die Gesamtheit der Rollen eines Kontos. `manager` Schläge und Korrekturen.

**Es bleibt immer ein aktiver Administrator übrig:** Deaktivierung oder Übernahme der Funktion `admin` Die Übernahme einer Rolle durch den _letzten_ aktiven Administrator wird verweigert (Problem). `last_administrator`, 409) – ohne diese Rolle konnte niemand mehr die Installation verwalten, und der einzige Weg zurück wäre ein Neustart der Instanz mit einem freien Konto. `adminLogin` Die Web-App weist vor der Änderung darauf hin: Der Wechsel des **eigenen** Kontos erklärt, warum sich ein Konto nicht selbst deaktivieren kann (`PATCH` Und `DELETE /users/:id` Wenn Sie dies auch auf dem Server ablehnen, wird im Rollendialog der letzte Administrator genannt und die Speichersperre wird weiterhin gespeichert, obwohl die Rolle nicht mehr vorhanden ist.

Das **Bearbeitungsfenster** (`edit_window_days` (Standardwert 7 Tage) legt fest, wie weit die **Offline-Warteschlange** selbstständig einen Stempelvorgang einreichen darf: Ein älterer Stempelvorgang in der Warteschlange trifft ein, sobald der Konflikt behoben ist. `too_old` Die Arbeitszeiten werden gezählt, sobald die Verwaltung sie akzeptiert hat. Ansonsten hängt nichts von dieser Einstellung ab – die Mitarbeiter ändern ihre Arbeitszeiten nicht selbst, und die Verwaltung ist an keine vorgegebenen Zeitvorgaben gebunden.

### Zeiten, Korrekturen und Anmerkungen

Stempeln ist das, was ein Mitarbeiter tut (`POST /punch`, der Schnellstempel, die Offline-Warteschlange). Ein **handschriftlicher** Stempel ist eine Korrektur der Verwaltung (`time.edit_other`) und enthält einen Grund im Prüfprotokoll – die Monatsansicht eines Mitarbeiters bietet genau das: Der Stift neben einem Tag fügt einen vergessenen Stempel hinzu, korrigiert eine Zeitangabe oder entfernt eine (`time.delete`).

Ein Mitarbeiter, dem ein vergessener Stempelvorgang aufgefallen ist, ändert die Zeiten **nicht** : Er öffnet den Tag in der Monatsansicht und hinterlässt eine **Notiz** für das Büro (`PUT /api/day-notes` eigene Tage mit `time.edit_own` Die Verwaltung liest es in der Tageszeile und am Tag des betreffenden Mitarbeiters, bucht den Tag und markiert die Notiz als **erledigt** (`POST /api/day-notes/handled`) — es bleibt zur Dokumentation sichtbar.

## Web-App, Terminal und API

Alles wird über den Port der Instanzeinstellungen bereitgestellt:

| Weg                         | Inhalt                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------- |
| `/` (und alle anderen Wege) | die Web-App von `www/` — Stempelkarte, Monats-, Jahresbericht, Abwesenheiten, Profil |
| `/api/...`                  | die REST-API (JSON; Fehler als `application/problem+json`)                          |
| `/api/stream`               | Live-Events, daher aktualisiert sich die App automatisch ohne Neuladen.             |
| `/terminal/<token>/`        | der Kioskbildschirm (Ausweis und PIN)                                               |
| `/presence/<token>/`        | der Vorstand „wer ist gerade bei der Arbeit“                                        |

Auf der Tafel wird jeder Mitarbeiter mit seinem aktuellen Status angezeigt. Die **geleistete Arbeitszeit des Tages** erscheint daneben (`1:23`, `0:00` (vor dem ersten Stempeln des Tages), sofern das **Arbeitsprofil** des jeweiligen Mitarbeiters dies zulässt ( _Arbeitszeit auf der Anwesenheitskarte_ , standardmäßig deaktiviert): Die Tafel ist sichtbar, bevor die PIN eingegeben wird, daher entscheidet die Verwaltung dies für jeden Mitarbeiter einzeln – die API sendet die Minuten nur für Mitarbeiter, die zugestimmt haben.

### Terminal (Kiosk)

**Aktivieren Sie die Kiosk-Terminal-** Funktion, erstellen Sie dann das Gerät unter **Administration → Terminals** und kopieren Sie das Gerätetoken – es wird **nur einmal** angezeigt, da nur sein Hashwert gespeichert wird. Die vorgefertigte Adresse für das Tablet wird daneben angezeigt:

```
http://<ioBroker host>:<port>/terminal/<device token>/
```

Das Token befindet sich im Pfad, sodass ein Tablet es beibehält, wenn die Seite zum Startbildschirm hinzugefügt wird (iOS speichert die Startadresse einer installierten App ohne Abfrage). Ältere Links der Form `/terminal?token=…` Und `/presence?token=…` Funktioniert immer noch: Der Adapter sendet sie an die neue Adresse.

Der Bildschirm bietet ein Feld für den Ausweis (Scannen oder Eingeben der Stempelzeiten), die Mitarbeiterliste für Name und PIN, die Uhrzeit und – nach jedem Stempelvorgang – Name, Richtung und die Tageszahlen für einige Sekunden. Ein Gerät kann auf die dort arbeitenden Mitarbeiter beschränkt werden; ohne Zuweisung werden alle angezeigt. **Mitarbeiter benötigen ihre PIN und** können zwischen „Ausweis und PIN“ und „Nur Ausweis“ umschalten. Der Token verbleibt im Browser des Tablets, daher wird die URL nur beim ersten Start benötigt.

## Staaten

Die Stempelungen bleiben in der Datenbank; der Adapter veröffentlicht Aggregate und Steuerelemente:

| Zustand                                                                                     | Typ             | Zweck                                                             |
| ------------------------------------------------------------------------------------------- | --------------- | ----------------------------------------------------------------- |
| `time-tracker.0.info.connection`                                                            | boolescher Wert | Adapter/Dienst bereit                                             |
| `time-tracker.0.info.lastBackup`                                                            | Nummer          | Momentaufnahme des neuesten Datenbank-Backups                     |
| `time-tracker.0.info.lastRemoteBackup`                                                      | Zeichenkette    | Datei der letzten Kopie auf dem externen Server                   |
| `time-tracker.0.info.remoteBackupError`                                                     | Zeichenkette    | Fehler beim letzten Kopieren auf den externen Server (leer = ok)  |
| `time-tracker.0.info.version` /`info.schemaVersion` /`info.dbSizeBytes` /`info.lastError`   | —               | Instanzinformationen                                              |
| `time-tracker.0.users.<id>.displayName`                                                     | Zeichenkette    | Name des Mitarbeiters                                             |
| `time-tracker.0.users.<id>.hasOpenEntry`                                                    | boolescher Wert | Der Mitarbeiter ist eingestempelt.                                |
| `time-tracker.0.users.<id>.lastPunch`                                                       | Nummer          | Moment des letzten Schlags von heute                              |
| `time-tracker.0.users.<id>.todayWorkedMinutes`                                              | Nummer          | Heute gearbeitete Minuten                                         |
| `time-tracker.0.users.<id>.todayBalanceMinutes`                                             | Nummer          | Tagesbilanz in Minuten                                            |
| `time-tracker.0.users.<id>.openConflicts`                                                   | Nummer          | Schläge warten auf eine Entscheidung                              |
| `time-tracker.0.commands.punchUserId`                                                       | Nummer          | Mitarbeiter, auf die die Stempelbefehle gelten (`0` (der einzige) |
| `time-tracker.0.commands.punch`                                                             | boolescher Wert | Ein- oder Ausstempeln (Taste)                                     |
| `time-tracker.0.commands.quickPunch`                                                        | boolescher Wert | Stanzen mit der konfigurierten Schnellrundung                     |
| `time-tracker.0.commands.closeMonth`                                                        | Zeichenkette    | einen Monat später, Wert `YYYY-MM`                                |
| `time-tracker.0.commands.recalc`                                                            | Zeichenkette    | eine Periode neu berechnen, `YYYY-MM` oder `YYYY`                  |
| `time-tracker.0.commands.backup`                                                            | boolescher Wert | Datenbanksicherung erstellen (Schaltfläche)                       |
| `time-tracker.0.users.<id>.monthWorkedMinutes` /`monthBalanceMinutes` /`yearBalanceMinutes` | Nummer          | Monats- und Jahreszahlen                                          |
| `time-tracker.0.company.presentCount`                                                       | Nummer          | Die Mitarbeiter haben sich gerade eingestempelt.                  |
| `time-tracker.0.company.present`                                                            | Zeichenkette    | ihre Namen, durch ein Komma getrennt                              |
| `time-tracker.0.company.openConflicts` /`company.lastPunch`                                 | Nummer          | Schläge warten auf eine Entscheidung, letzter Schlag              |
| `time-tracker.0.events.lastAt` /`lastType` /`lastUser` /`lastDirection` /`lastSource`       | —               | neuestes Ereignis der Instanz                                     |
| `time-tracker.0.calendar.feedFile`                                                          | Zeichenkette    | Die `.ics` **Dateipfad** (für `ical`)                              |
| `time-tracker.0.calendar.feedUrl`                                                           | Zeichenkette    | Link zum Abonnieren des Firmenkalenders                           |
| `time-tracker.0.calendar.absences`                                                          | Zeichenkette    | die Abwesenheiten des Fensters als JSON                           |
| `time-tracker.0.calendar.updatedAt`                                                         | Nummer          | wann der Kalender geschrieben wurde                               |

### Befehle (Zustände)

Ein Skript, ein Blockly-Block, ein Dashboard oder ein anderer Adapter steuert die Instanz durch verschiedene Zustände – ohne HTTP und ohne Anmeldung. Der Adapter schreibt solche Aktionen als _System_ in das Audit-Log (`actorId: 0`) und die Logzeile beschreibt, was passiert ist.

| Zustand                        | Wert                             | Wirkung                                                                                  |
| ------------------------------ | -------------------------------- | ---------------------------------------------------------------------------------------- |
| `commands.punchUserId`         | Mitarbeiter-ID, `0` = automatisch | dem Mitarbeiter, auf den die beiden Stempeltasten zutreffen                              |
| `commands.punch`               | `true`                           | Schläge nach innen oder außen – die Richtung ergibt sich aus den Schlägen des Tages      |
| `commands.quickPunch`          | `true`                           | Dasselbe gilt, aber der Augenblick wird mit _schnellen Schlägen auf Minuten_ abgerundet. |
| `commands.closeMonth`          | `YYYY-MM`                        | Schließt den Monat ab (die Logzeile weist Saldo und Überstunden aus)                     |
| `commands.recalc`              | `YYYY-MM` oder `YYYY`             | berechnet die Aggregate dieses Zeitraums neu.                                            |
| `commands.backup`              | `true`                           | schreibt eine Datenbanksicherung                                                         |
| `commands.rotateCalendarToken` | `true`                           | Erstellt oder erneuert den Kalenderlink des Unternehmens                                 |

```js
setState("time-tracker.0.commands.punchUserId", 3); // target employee (0 = the only one)
setState("time-tracker.0.commands.punch", true); // punch in or out
setState("time-tracker.0.commands.quickPunch", true); // punch with quick rounding
setState("time-tracker.0.commands.recalc", "2026-08"); // a month, or "2026" for a year
setState("time-tracker.0.commands.closeMonth", "2026-08"); // closing needs YYYY-MM
setState("time-tracker.0.commands.backup", true); // write a backup now
```

Zwei Dinge sollten Sie wissen:

- **Die Schaltflächen sind zustandslos:** nur `true` löst sie aus (alle anderen Werte werden ignoriert), und der Adapter setzt sie wieder zurück. `false` sofort – also niemals schreiben `false` Um „auszustempeln“, verwenden Sie `punch` und überlassen Sie die Richtung dem Adapter.
- **Welcher Mitarbeiter?** Die Stempelbefehle verwenden den in der Liste hinterlegten Mitarbeiter. `commands.punchUserId` Der Adapter spiegelt die aktuelle Auswahl bei jeder Aktualisierung in diesen Zustand zurück, und `0` bedeutet „der einzige Mitarbeiter“. Bei mehreren Mitarbeitern und keiner anderen Wahlmöglichkeit verweigert der Befehl die Eingabe, anstatt zu raten – das Protokoll meldet dann Folgendes: `several employees exist - set command_punch_user_id or write users.<id> commands` Die

Pro Mitarbeiter, ohne Zielvorgabe: schreiben `users.<id>.present` (`true` = Einchecken `false` = Ausstempeln, idempotent — siehe _Erster Start_ ) oder eine Nachricht senden (siehe _Nachrichten (`sendTo`)_ unten).

Jeder Befehl endet mit einem aktualisierten Zustandsbaum (`users.*`, `company.*`, `events.*` Ein Dashboard folgt den Anweisungen. Bei einem falschen Zeitraum oder einem unbekannten bzw. deaktivierten Mitarbeiter wird eine Warnung im Adapterprotokoll ausgegeben – niemals eine fehlerhafte Instanz.

### Kalender für ioBroker (Feed und Status)

Die Abwesenheiten des gesamten Unternehmens erreichen ioBroker auf zwei Wegen – die Datei ohne Sitzung und ohne Token, der Link mit dem Instanztoken:

| Was       | Wo                                                                                                                                         | Wer benutzt es?                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| **Datei** | `<iobroker-data>/files/time-tracker.<n>/storage/calendar.ics`, bei jeder Änderung und alle 5 Minuten neu geschrieben                      | Die `ical` Adapter als **lokale Datei** – keine URL, kein Token, kein Netzwerk         |
| **URL**   | `calendar.feedUrl` (`http://<host>:<port>/api/calendar.ics?token=…`)                                                                      | eine Kalender-App oder ein Skript, das den Link weitergibt an `ical.0.iCalReadTrigger` |
| **Daten** | `calendar.absences` — die gleichen Tage wie JSON (`login`, `name`, `from`, `to`, `code`, `type`, `portion`, `approval`, `status`, `note`) | Skripte, Blockly, VIS                                                                 |
| **Wann**  | `calendar.updatedAt`                                                                                                                       | um zu sehen, wie aktuell die drei oben genannten sind                                 |

Die Datei befindet sich unten `files/time-tracker.<n>/storage/`, weil der daneben liegende Instanzordner nur vom Adapter selbst gelesen werden kann. `storage` ist ein **Mountpunkt** : ein Objekt vom Typ `meta` Die Datei bleibt hängen, und die Datei-API von ioBroker schreibt die ID darunter. Nur über dieses Objekt kennt der Dateimanager den Ordner – der Instanz-Namespace selbst ist kein Mountpunkt, und ein Schreibvorgang darunter wird verweigert (der Hintergrund befindet sich in D11). Das Objekt wird bei jedem Start erstellt, sodass der Ordner vom ersten Start an vorhanden ist, noch bevor der erste Kalender geschrieben wurde. `ical` Der Adapter zeigt auf den **Pfad** von `calendar.feedFile` Der Dateimanager der Admin-Benutzeroberfläche (`Objects` →`files`) zeigt den Ordner an `time-tracker.<n>` mit `storage` Die Datei wird heruntergeladen – dies wird auf einer realen Installation bestätigt (Abnahmefall **T28** in[`docs/en/test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) (bestanden mit 0.7.12).

Der Dateiserver eines `web` Die Instanz liefert diese Datei ebenfalls aus – unterhalb des **Mountpunkts** funktioniert der Link (`http://<host>:8081/files/time-tracker.0/storage/calendar.ics`, an einer realen Installation überprüft: Der Download liefert die `VCALENDAR` Datei). Der vorherige Pfad ohne `storage` (`…/files/time-tracker/calendar.ics`) antwortet mit einem leeren Archiv und bleibt daher außerhalb dieser Datei. Ein Browser, eine Kalender-App oder ein Skript verwendet daher entweder `calendar.feedUrl` (der Link mit dem Instanztoken) oder der obige Dateiserver-Link – der Hintergrund befindet sich in D11 von[`docs/en/decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md) Die

Der Zeitraum erstreckt sich ein Jahr zurück und bis Ende nächsten Jahres. Der Link zum **Unternehmen** existiert erst, nachdem jemand danach gefragt hat: schreiben `true` Zu `commands.rotateCalendarToken` Der erste Aufruf erstellt das Token, jeder weitere Aufruf ersetzt es – ein alter Link funktioniert sofort nicht mehr. Dieser Link gibt die Abwesenheiten **aller** Mitarbeiter frei, behandeln Sie ihn daher wie ein Passwort. Der persönliche Link eines Mitarbeiters bleibt unverändert. `POST /calendar/token` (Die App hat einen entsprechenden Button) und zeigt nur diesen Mitarbeiter an.

```js
setState("time-tracker.0.commands.rotateCalendarToken", true); // create or renew the link of the company
log(getState("time-tracker.0.calendar.feedUrl").val); // paste it into a calendar app
setState("ical.0.iCalReadTrigger", "read " + getState("time-tracker.0.calendar.feedUrl").val);
```

`calendar.absences` Es handelt sich um JSON, daher kann es von jedem Skript gelesen werden – die Feldliste befindet sich in der obigen Tabelle. T21 in[`docs/en/test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) enthält einen kleinen Codeausschnitt, der die laufenden Abwesenheiten protokolliert.

### Aktionen (Auslöseregeln)

Die Hardwareanbindung über ioBroker erfolgt über einen Zustand: Ein Fingerabdruckleser, ein Knopf, ein Türkontakt oder ein Dashboard schreibt diesen Zustand, und der Adapter erledigt den Rest. Eine Regel wird unter **Administration → Aktionen** verwaltet.

| Feld                      | Bedeutung                                                                                                                                                                                                   |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zustand                   | der Zustand des anderen Adapters, z.B. `fingerprint.0.lastMatch.name`                                                                                                                                        |
| Auslösen                  | _Der Status enthält den Wert_ : Der Wert muss gleich _dem Wert_ sein — oder _der Wert ist der Mitarbeiter_ , wobei der Wert den Mitarbeiter benennt (ID, Login oder angezeigter Name).                      |
| Wert                      | der Wert, der die Regel auslöst (Modus _State enthält den Wert_ ) —`toggle` (oder `*`) wird bei **jeder** Änderung ausgelöst, daher funktioniert auch ein Schalter, der ein- und wieder ausgeschaltet wird. |
| Mitarbeiter               | wer geschlagen wird (Modus _State trägt den Wert_ )                                                                                                                                                         |
| Aktion                    | Ein- oder Ausstempeln, schnell runden, auf „Anwesend“ stellen, auf „Abwesend“ stellen                                                                                                                       |
| Abklingzeit               | Sekunden, die vergehen müssen, bevor die Regel erneut ausgelöst werden kann                                                                                                                                 |
| Feuer bei jedem Schreiben | Die Regel greift auch, wenn der Wert **derselbe** ist wie zuvor. Standardmäßig ist sie aktiviert, wenn _der Wert dem Mitarbeiter entspricht_ , und deaktiviert bei einem festen Wert.                       |
| Wert → Mitarbeiter        | (Moduswert _ist der Mitarbeiter_ ) Zu welchem Mitarbeiter gehört ein Wert?; leer = der Wert selbst benennt den Mitarbeiter                                                                                  |

Standardmäßig wird eine Regel nur ausgelöst, wenn sich der **Wert ändert** . Ein Dashboard, das seinen Status selbstständig aktualisiert, ist daher unproblematisch, und die Abklingzeit verhindert ein schnelles Blinken des Status. Ein Lesegerät, das meldet, **wer** es berührt hat, benötigt das andere Verhalten: Es schreibt denselben Namen erneut, wenn dieselbe Person es erneut scannt – das ist ein neuer Stempelvorgang. Daher ist _„Bei jedem Schreibvorgang auslösen“_ standardmäßig aktiviert, wenn _der Wert der Mitarbeiter ist_ (die Abklingzeit und der Duplikatschutz von 30 Sekunden bleiben bestehen). Jeder Stempelvorgang erscheint mit dem entsprechenden Vermerk im Prüfprotokoll. `trigger.<id>` sodass sein Ursprung nachvollziehbar bleibt.

**Mit dem `fingerprint` Adapter.** Verwenden Sie den Zustand. `fingerprint.0.lastMatch.name`, mode _Value ist der Mitarbeiter_ und der Name des registrierten Fingers soll der **angezeigte Name oder der Login** des Mitarbeiters sein. `lastMatch.id` Es handelt sich um den _Slot_ des Fingers (1–200), nicht um die Mitarbeiter-ID: Verwenden Sie ihn nur zusammen mit einer **Wertzuordnung** (Slot 3 → Anna). Ein fehlender Wert in einer Zuordnung löst keine Aktion aus. `lastMatch.matched` Aufenthalte `true` für jedes Spiel, daher passt es nicht zu einer Regel, die bei einer Änderung auslöst – bei _"Feuer bei jedem Schreibvorgang"_ wäre das der Fall, aber es wird nicht angegeben, wer es war.

**Rückmeldung an den Leser.** Der Adapter kommuniziert nicht mit dem Gerät, aber jeder Regelschlag erscheint sofort in `time-tracker.0.events.*`: `lastUser` (WHO), `lastDirection` (`in` oder `out`), `lastSource` (`trigger.<id>`) Und `lastAt` Ein kleines Skript kann es auf dem Lesegerät, einem Display oder einem Lautsprecher anzeigen – zum Beispiel `on({ id: 'time-tracker.0.events.lastAt', change: 'any' }, () => sendTo('telegram.0', getState('time-tracker.0.events.lastUser').val + ' ' + getState('time-tracker.0.events.lastDirection').val))` Ein Scan, der nicht ausgelöst wurde (Abklingzeit, Duplikatschutz von 30 Sekunden, Mitarbeiter ohne Karteneintrag), hinterlässt einen Eintrag im Protokoll auf Ebene . `debug` und nichts in `events.*` Die

Der Adapter speichert den letzten Wert eines überwachten Zustands nur im Arbeitsspeicher. Nach einem Neustart löst der erste Schreibvorgang eine Regel aus, die bei einer Änderung greift, selbst wenn der Wert mit dem vor dem Neustart identisch ist; eine Regel, die bei jedem Schreibvorgang greift, ist davon nicht betroffen.

### Regeln (automatisch)

Der Adapter kann auch eigenständig agieren – die entsprechende Tabelle befindet sich unter **Administration → Einstellungen** :

| Art                        | Was es tut                                                                                                                                                                                               |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Automatische Ausstempelung | Zum konfigurierten Ortszeitpunkt des Mitarbeiters wird der Öffnungstag durch Stempeln beendet (Hinweis). `auto.clockOut`)                                                                                |
| Fehlenden Schlag melden    | Derselbe Moment, aber nichts wird geschrieben – die Instanz meldet es nur.                                                                                                                               |
| Pausenerinnerung           | Erinnert einen Mitarbeiter daran, dass sein laufender Arbeitsblock die konfigurierte Länge erreicht hat.                                                                                                 |
| Gültigkeitszeitraum        | Optionale Datumsangaben für „gültig ab“ und „gültig bis“: Außerhalb dieser Felder bleibt die Regel unverändert, beide Enden gehören zum Zeitraum, ein leeres Feld bedeutet „ab sofort“ oder „ohne Ende“. |

Jede Regel wird **höchstens einmal pro Mitarbeiter und lokalem Datum** ausgeführt; `automation_runs` Die Tabelle speichert diese Entscheidung und dient gleichzeitig als Protokoll – jede Zeile benennt ihren **letzten Durchlauf** , sodass eine zuvor stumme Regel sofort sichtbar ist. Die Tabelle wird **als Ganzes** gespeichert, wie der Hinweis neben „Regeln speichern“ erklärt: Die Bearbeitung einer Regel ändert die Liste, nur die Schaltfläche schreibt sie. Der **Gültigkeitszeitraum** wird mit dem lokalen Kalendertag des Mitarbeiters verglichen, ähnlich wie die Wochentage, sodass eine Urlaubsvertretung automatisch enden kann. Die Ereignisse `automation.clockOut`, `automation.missingPunch` Und `automation.breakReminder` erscheinen in `events.*` Auch so können Benachrichtigungen von einem Benachrichtigungsadapter erfasst werden.

### Nachrichten (`sendTo`)

Ein Skript, ein Blockly-Block oder ein anderer Adapter steuert die Instanz ohne HTTP:

```js
sendTo("time-tracker.0", "punch", { user: "anna", quick: true }, answer => log(answer.message));
sendTo("time-tracker.0", "present", { user: 2, present: false });
sendTo("time-tracker.0", "status", { user: "anna" }, answer => log(JSON.stringify(answer.data)));
sendTo("time-tracker.0", "report", { user: "anna", period: "2026-09", format: "pdf" }, answer =>
	writeFile("statement.pdf", Buffer.from(answer.data.base64, "base64")),
);
sendTo("time-tracker.0", "backup");
```

`user` ist eine Benutzer-ID, ein Login oder der angezeigte Name. `report` Sie antworten mit dem Dateinamen, dem MIME-Typ und der Datei selbst als Base64 (PDF oder Excel), damit sie per E-Mail oder mit einem Messenger-Adapter versendet werden kann.

## Berichte

Die Monatsansicht und der Jahresbericht der App bieten die Aufstellung des angezeigten Zeitraums als **PDF** und **Excel-** Datei an. `.xlsx` Die PDF-Datei enthält die Tagesübersicht, die Monatsnummern, die Abwesenheiten und zwei Unterschriftenzeilen. Die Datei wird in der Sprache und Zeitzone des Mitarbeiters erstellt; die Verwaltung kann einen anderen Mitarbeiter auswählen und denselben Kontoauszug für ihn herunterladen.

Neben den beiden Schaltflächen befindet sich eine dritte: die **Rohdaten im CSV-Format** . Sie enthält eine Zeile pro Lochung (`date`, `time`, `direction`, `source`, `note` Die Datei ist durch Semikolon getrennt und im UTF-8-Format mit Byte Order Mark (BOM) kodiert – Tabellenkalkulationsprogramme können sie daher direkt öffnen und Lohnabrechnungsprogramme können sie ohne weitere Nachfrage lesen. Der Header ist absichtlich auf Englisch, da die Datei für die maschinelle Verarbeitung bestimmt ist.

Für `ru`, `uk`, `zh-cn` und Polish the PDF benötigt eine Unicode-Schriftart: set `report_font_path` in den App-Einstellungen zu einem `.ttf` /`.otf` Datei, die das Skript abdeckt. Ohne sie wird der Export mit einer klaren Fehlermeldung abgebrochen (`report_font_missing`) anstatt leere Kästchen zu zeichnen.

## Backups

**Administration → Backups** erstellt mit einem Klick eine Kopie der Datenbank und listet die vorhandenen Kopien auf:

| Aktion           | Was geschieht                                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| Jetzt erstellen  | schreibt eine Kopie (`VACUUM INTO`) in den Sicherungsordner                                                    |
| Herunterladen    | übergibt die Datei an den Browser                                                                               |
| Hochladen        | Nimmt eine heruntergeladene Datei zurück, prüft sie und stellt sie für den nächsten Start in die Warteschlange. |
| Wiederherstellen | reiht eine der aufgelisteten Dateien für den nächsten Start ein (mit Angabe eines Grundes).                     |
| Löschen          | Entfernt nach einer Bestätigung eine einzelne Datei.                                                            |

Für eine Wiederherstellung wird eine geschlossene Datenbank benötigt. Daher wird sie **beim Start des Adapters** angewendet – so die App – und die vorherige Datenbank wird daneben gespeichert. `<database>.before-restore-<time>`. Backups, die älter als die Aufbewahrungsfrist der Instanzeinstellungen sind, werden automatisch entfernt; das neueste Backup bleibt immer erhalten.

### Auf einen externen Server kopieren (SFTP)

Ein Backup, das sich im selben Verzeichnis wie die Datenbank befindet, geht zusammen mit dem Host verloren. Über die Registerkarte **„Migration und Backup“** der Instanzeinstellungen kann daher **jedes** Backup per SFTP auf einen anderen Computer (z. B. ein Synology NAS) kopiert werden – ohne Mounten und ohne `sudo` benötigt:

| Einstellung                                          | Bedeutung                                                                                                                                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backups auf einen externen Server kopieren (SFTP)    | schaltet die Kopie ein                                                                                                                                                                      |
| Serveradresse / SSH-Port                             | Der Server verwendet standardmäßig Port 22.                                                                                                                                                 |
| Benutzername / Passwort                              | Das Konto auf dem Server (das Passwort wird verschlüsselt gespeichert); verwenden Sie einen Benutzer, der nur in das Zielverzeichnis schreiben darf.                                        |
| Verzeichnis auf dem Server                           | wird erstellt, wenn fehlt, z.B. `/backups/time-tracker`                                                                                                                                      |
| Server-Fingerabdruck                                 | `SHA256:…` Host-Schlüssel – Empfehlung: Kopieren Sie ihn aus der Antwort des **Verbindungstests** oder aus dem Protokoll nach der ersten Sicherung; leer = der Server ist nicht verifiziert |
| Kopien, die auf dem Server aufbewahrt werden sollen. | Die ältesten Kopien nach dieser Nummer werden gelöscht. `0` = alle behalten                                                                                                                  |

Die Kopie wird nach jeder Datensicherung ausgeführt, unabhängig davon, wie diese erstellt wurde (App, `commands.backup`, `sendTo`, dem Tagesplan). Die Datei wird unter einem temporären Namen hochgeladen, ihre Größe wird überprüft und erst dann umbenannt, sodass eine unvollständige Datei niemals wie ein Backup aussieht. Nur Dateien, die wie ein Backup dieses Adapters benannt sind (`time-tracker-<time>.sqlite`) jemals auf dem Server gelöscht werden, und die Überreste eines unterbrochenen Uploads (`….sqlite.part` Alles andere im Verzeichnis bleibt erhalten. Ein fehlgeschlagener Kopiervorgang hat niemals Auswirkungen auf die lokale Sicherung: Er wird protokolliert, im Audit-Log eingetragen und angezeigt. `info.remoteBackupError` Das letzte gute Exemplar befindet sich in `info.lastRemoteBackup`. **Bei der Verbindungsprüfung** werden die Werte des Formulars ausprobiert, ohne sie zu speichern (ein leeres Passwortfeld verwendet das gespeicherte Passwort, jedoch nur für denselben Server, Benutzer und Port) und der einzugebende Fingerabdruck angezeigt.

## HTTPS und Reverse-Proxy

Die App auf einem Smartphone benötigt **HTTPS** – ein Service Worker läuft nur auf einer sicheren Verbindung. Dafür gibt es zwei Möglichkeiten.

**HTTPS ist im Adapter selbst aktiviert.** Aktivieren Sie in den Instanzeinstellungen die Option **„HTTPS verwenden“** und wählen Sie das öffentliche Zertifikat, den privaten Schlüssel und, falls vorhanden, die Zertifikatskette aus. Die Zertifikate stammen aus der Zertifikatssammlung von ioBroker ( **Admin > Einstellungen > Zertifikate** ; die Einträge). `defaultPublic` /`defaultPrivate` Es handelt sich dabei um das selbstsignierte Zertifikatspaar, das ioBroker selbst erstellt (ein Let's Encrypt-Zertifikat funktioniert auf die gleiche Weise). Die App antwortet dann unter `https://<host>:<port>/` Der Session-Cookie ist `Secure` und der Link in der Instanzliste und der Kalenderlink wechseln zu `https` Die Weboberfläche funktioniert von selbst. Fehlt das Zertifikat oder kann es nicht gelesen werden, greift sie **nicht** auf unverschlüsseltes HTTP zurück: Sie bleibt nicht verfügbar, und der Grund wird im Protokoll vermerkt. Ein selbstsigniertes Zertifikat führt zu einer einmaligen Warnung des Browsers; ein Smartphone installiert die App nur, wenn es dem Zertifikat vertraut (installieren Sie das Zertifikat auf dem Smartphone oder verwenden Sie ein Zertifikat einer anerkannten Zertifizierungsstelle). Durch Ändern der Einstellung wird die Instanz neu gestartet.

**Ein Reverse-Proxy wird vorgeschaltet.** Platzieren Sie nginx oder caddy vor dem Adapter und aktivieren Sie **die Option „Reverse-Proxy vertrauen“** : Der Adapter übernimmt dann die Client-Adresse von `x-forwarded-for` für die Ratenbegrenzungen und den Prüfpfad, und `x-forwarded-proto: https` erstellt den Session-Cookie `Secure` Ohne diesen Schalter werden beide Header ignoriert, da sie von jedem Client gesendet werden könnten.

## Fehlerbehebung

| Problem                                                  | Ursache und Lösung                                                                                                   |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `/` Antworten `404 not_found`                             | Die Web-App fehlt: Installieren Sie den Adapter neu – das Paket enthält die integrierte Web-App. `www/`               |
| Lässt sich nicht als App auf dem Telefon installieren.   | Die Seite ist nicht über HTTPS erreichbar – siehe oben                                                               |
| Das PDF lehnt den Empfang ab oder zeigt leere Felder an. | `report_font_path` fehlt – siehe [Berichte.](#reports)                                                               |
| Eine Wiederherstellung scheint nichts zu bewirken.       | Es wird beim nächsten Start angewendet: Starten Sie die Instanz neu.                                                 |
| Ein Mitarbeiter kann sich nicht anmelden                 | Das Startpasswort muss bei der ersten Verwendung geändert werden; die Administration kann ein neues festlegen.       |
| Ein Schlag fehlt.                                        | Es kann in der Offline-Warteschlange warten oder als Konflikt markiert werden (siehe _Synchronisierung_ in der App). |

## Sprachen

Die Admin-Benutzeroberfläche, die App und die Berichte werden in **11 Sprachen** ausgeliefert. `en` (Basis- und Ausweichlösung), `de`, `ru`, `pt`, `nl`, `fr`, `it`, `es`, `pl`, `uk`, `zh-cn` — und jeder Mitarbeiter wählt seine eigene. Datumsangaben, Zahlen und Einheiten werden formatiert mit `Intl` Weitere Übersetzungen sind willkommen:[`docs/en/i18n.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/i18n.md) Die

## Sicherheitsheader

Die Web-App wird mitgeliefert `Content-Security-Policy` (Nur eigene Skripte, keine Inline-Skripte, keine Einbettung durch andere Seiten), `X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, `X-Content-Type-Options: nosniff` und ein `Permissions-Policy` Ohne Kamera, Mikrofon und Standort. Bei **Verwendung von HTTPS** sendet der Adapter zusätzlich `Strict-Transport-Security` (ein halbes Jahr, nur dieser Host); hinter einem Reverse-Proxy, der die TLS-Verschlüsselung durchführt, ist der Proxy für das Senden der Daten zuständig. Der Live-Stream der App verweigert einen Browser-Handshake von einer Seite eines anderen Hosts (`Origin`).

## Datenschutz

Alles läuft auf Ihrem eigenen ioBroker-Host: kein Cloud-Service, keine Telemetrie. Stempelungen und persönliche Daten bleiben in der lokalen SQLite-Datei, der Zugriff ist rollenbasiert und jede Korrektur wird in einem Prüfprotokoll protokolliert.

## Haftungsausschluss

**Haftungsausschluss.** Diese Software wird kostenlos und ohne jegliche Gewährleistung, insbesondere ohne Zusicherung der Eignung für einen bestimmten Zweck, bereitgestellt. Sie stellt keine Rechts-, Steuer- oder Arbeitsrechtsberatung dar und ist kein offiziell zugelassenes oder zertifiziertes Zeiterfassungssystem. Soweit gesetzlich zulässig, ist die Haftung ausgeschlossen; die Haftung für Vorsatz und grobe Fahrlässigkeit, für Schäden an Leben, Körper oder Gesundheit sowie die Haftung nach zwingendem Recht bleiben unberührt. Sie sind verantwortlich für:

- die Richtigkeit der erfassten Zeiten, Abwesenheiten, Salden und Berichte sowie die Überprüfung der Ergebnisse (z. B. anhand Ihrer Lohnabrechnung oder mit Ihrer Lohnbuchhaltung).
- Einhaltung der für Sie geltenden Vorschriften (z. B. Arbeitszeit und Arbeitsrecht, Rechte des Betriebsrats, Mitarbeiterinformationen und Einwilligung, Aufbewahrungsfristen, DSGVO).
- regelmäßige Datensicherungen – auch außerhalb des Adapters – und Tests, ob diese wiederhergestellt werden können.

Die deutsche Fassung dieser Mitteilung befindet sich in[`docs/de/haftungsausschluss.md`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/de/haftungsausschluss.md) Die

Derselbe Hinweis, nur in Kurzform, wird auf der Anmeldeseite und im Profil der Web-App in allen 11 Sprachen angezeigt.

## Dokumentation

Die Dokumentation ist auf Englisch ([`docs/en/`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/en/) ); die deutschen Originale befinden sich in[`docs/de/`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/de/) Die

| Dokumentieren                                                                                       | Inhalt                                                                                                                  |
| --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [`docs/en/getting-started.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/getting-started.md) | ein Überblick über die erste Einrichtung                                                                                |
| [`docs/en/test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md)             | Abnahmetests und was noch offen ist                                                                                     |
| [`docs/en/decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md)             | die Entscheidungen hinter dem Design                                                                                    |
| [`docs/en/technical.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/technical.md)             | Interna: HTTP-Schnittstelle, Sitzungen, Live-Ereignisse, Datenbank                                                      |
| [`docs/en/development.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/development.md)         | Erstellen, Testen, Veröffentlichen                                                                                      |
| [`docs/en/i18n.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/i18n.md)                       | wie die 11 Sprachen vollständig erhalten werden                                                                         |
| [`docs/en/adapter-check.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/adapter-check.md)     | die lokale Vorprüfung der ioBroker-Adapterregeln                                                                        |
| [`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.time-tracker/CONTRIBUTING.md)                       | Beitragsregeln (Reinraum) und das Freigabeverfahren                                                                     |
| [`docs/de/`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/de/)            | die deutschen Originale der oben genannten Dokumente, eine deutsche Zusammenfassung und der deutsche Haftungsausschluss |

## Links

- Repository: <https://github.com/sadam6752-tech/ioBroker.time-tracker>
- Probleme: <https://github.com/sadam6752-tech/ioBroker.time-tracker/issues>
- ioBroker-Forum: <https://forum.iobroker.net/>

## Herkunft

Dieses Projekt ist eine unabhängige Implementierung der in der internen Spezifikation beschriebenen Zeiterfassung. Verhalten, Berechnungsregeln und Datenformate entsprechen dieser Spezifikation; es wurde **kein Quellcode** aus anderen Projekten übernommen. Die Verifizierungsprotokolle werden außerhalb dieses Repositorys gespeichert.

## Changelog

### **WORK IN PROGRESS**

### 0.8.2 (2026-11-20)

- (Alex) change: the adapter supports the **compact mode** (`common.compact: true`, decision D2); compact group `0`
  keeps it in a process of its own.
- (Alex) chore: `@iobroker/testing` 6.3.2, the changelog links to `CHANGELOG_OLD.md` (repository checker).

### 0.8.1 (2026-11-14)

- (Alex) fix: the address of the kiosk terminal and of the presence board carries the device token in its path
  (`/terminal/<token>/`, `/presence/<token>/`). iOS saves a page to the home screen without its query, so a tablet
  started from the home screen came up without its token; the app with its manifest now lives below the path of the
  token. Older links with `?token=` are sent to the new address.

### 0.8.0 (2026-10-18)

- (Alex) chore: the request bodies of the REST API are checked with zod (D22); the messages are worded as before, and
  every invalid field of a request is now listed in `errors[]`.

### 0.7.27 (2026-10-18)

- (Alex) fix: the names of the holiday countries in the instance settings are translated (note of the review).
- (Alex) chore: the REST API and its tests are split into one module per area (`src/lib/web/routes/`); the routes,
  their order and their behaviour are unchanged.

### 0.7.26 (2026-10-13)

- (Alex) fix: the instance receives `sendTo` messages (`common.messagebox` was missing): **Test connection**
  of the external backup answers, and the messages for scripts (`punch`, …) reach the adapter.
- (Alex) docs: the help of the field _Server fingerprint_ says what to do: copy the fingerprint from the answer of
  **Test connection** or from the log after the first backup.

Older changes are listed in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Alex <sadam6752@gmail.com>

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