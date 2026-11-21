---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-tracker/docs/en/test-plan.md
title: Abnahme- und Testplan (erste reale Tests)
hash: KHLWSnozKnZEbZYYsndC1S3XC2kfCIK9a/hPFrvx18U=
---
# Abnahme- und Testplan (erste reale Tests)
Dieses Dokument dient als Arbeitsanleitung für die **ersten Tests an einer realen ioBroker-Installation**. Es beschreibt Anforderungen, Testdaten, die Testfälle T1-T29 mit ihren Erwartungen und die Akzeptanzkriterien. Für die Installation bis zum ersten Punch gibt es Abschnitt [`getting-started.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/getting-started.md); dessen Schritte entsprechen der unten beschriebenen Vorbereitung. Der öffentliche Abschnitt `README.md` ist auf Englisch (eine Anforderung des Adapter-Checkers); dieses Betriebsdokument ist auch auf Deutsch in Abschnitt [`../de/testplan.md`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/de/testplan.md) verfügbar (der Originaltext mit dem beibehaltenen Protokoll).

## 1. Ziel
Um nachzuweisen, dass der Adapter im produktiven Betrieb das leistet, was die Spezifikation (Abschnitte 3, 4, 9) verlangt: Stempeln (online, offline, Terminal), Berechnen (Ziel, Pausen, Saldo, Urlaub, Feiertage), Berichten (Excel, PDF), Durchsetzen von Berechtigungen auf dem Server, Sichern und Wiederherstellen.

## 2. Testumgebung
| Artikel | Anforderung |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ioBroker | js-controller ≥ 6.0.11, admin ≥ 7.6.20 |
| Node.js | ≥ 22 (lokal mit Version 22.22 geprüft) |
| Anschlüsse | Adapteranschluss frei (Standard `8092`), `127.0.0.1` ist für den Test ausreichend |
| HTTPS | **erforderlich** für die Installation der PWA (Service Worker); im Test entweder das eigene Zertifikat des Adapters (**HTTPS verwenden**), ein Reverse-Proxy (nginx/caddy) mit einem selbst ausgestellten Zertifikat oder ein Gerät im selben Netzwerk mit einem gültigen Zertifikat |
| Browser | Chrome/Edge (Android) oder Safari (iOS) für die Installation; Desktop-Browser für die API-Ansicht |
| Endgerät | Tablet/Smartphone im Kioskmodus (Bildschirm bleibt eingeschaltet) **oder** ein Browser-Tab |
| Zeit | eine Stunde für den Lauf; T3 (offline) benötigt Ruhe, um die Synchronisation zu beobachten |

Zwei Konten sind zwingend erforderlich: **Administrator** (alles) und **Mitarbeiter** (nur eigene Daten) - nur so werden Berechtigungsfehler sichtbar.

## 3. Installation für den Test
```bash
cd <repo>
npm ci
npm run install:pwa
npm run build:pwa      # creates www/ (web app)
npm run build          # creates build/ (adapter)
npm run dev-server     # starts the adapter in a throw-away js-controller
```

Alternativ bei einer bestehenden Installation: Installieren Sie das veröffentlichte Paket `iobroker.time-tracker` von npm wie in [`getting-started.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/getting-started.md) beschrieben.

Nach dem Start: Öffnen Sie die Instanz, überprüfen Sie **Port** und **Bindungsadresse**, setzen Sie `report_font_path` nur dann, wenn PDF-Berichte in `ru`, `uk` oder `zh-cn` benötigt werden (ansonsten antwortet der Bericht mit `422 report_font_missing` - das ist das erwartete Verhalten, kein Fehler).

| Sprache | Geprüfte Schriftart (17.09.2026, echter Bericht mit der eingebetteten Schriftart) |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| `ru`, `uk` | `arial.ttf` (Arial deckt Kyrillisch ab) |
| `pl` | `arial.ttf` - die polnischen Buchstaben (ś, ć, ł, ż, ę) liegen außerhalb der integrierten Schriftart |
| `de`, `en`, `fr`, `it`, `es`, `nl`, `pt` | Keine erforderlich; bei Verwendung eines Schriftartsatzes wird dieser ebenfalls eingebettet. |
| `de`, `en`, `fr`, `it`, `es`, `nl`, `pt` | keine erforderlich; bei einem Schriftartensatz wird es auch eingebettet |

Eine **fehlende** Datei oder eine Schriftart ohne die benötigten Zeichen führt zur gleichen Fehlermeldung wie eine Einstellung, die gar nicht festgelegt ist - der Bericht wird also niemals mit leeren Feldern ausgeliefert.

## 4. Testdaten
1. Melden Sie sich im Admin-Formular an: mit dem Konto „admin“ (oder dem konfigurierten Login) und dem Startpasswort der Instanz.

Wenn diese Einstellung leer ist, wird **einmalig** ein zufälliges Startpasswort im Adapterprotokoll gespeichert. **Ändern Sie das Passwort umgehend** (der Adapter fordert dies beim ersten Login an). Ein Startpasswort, das **nach** dem ersten Start eingegeben wird, ist ebenfalls gültig, solange der erste Administrator das Startpasswort noch nicht geändert hat: Starten Sie die Instanz neu, dann steht im Protokoll `… exists already and still has its start password - it was set from the instance settings now` und der Login funktioniert mit dem eingegebenen Wert. Nach der Änderung in der App warnt der Adapter stattdessen mit `the configured start password is not used` (D15 in [`decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md)).

2. Erstellen Sie in der Web-App unter **Administration → Mitarbeiter** Folgendes:
- `anna` (Rolle _employee_), Passwort gemäß den Richtlinien (≥ 8 Zeichen, Groß- und Kleinbuchstaben, Ziffern)
- `chef` (Rolle _manager_, falls die Akzeptanz der Monate anderer Personen getestet werden soll)
- Legen Sie eine **Badge-PIN** (4-8 Ziffern) für `anna` → für T4 fest
3. Überprüfen Sie das Arbeitsprofil von `anna` in der Web-App (**Administration → Mitarbeiter → _Arbeitsprofil_**): Beschäftigungsstufe,

Wöchentliche Arbeitsstunden, Arbeitstage, Überstundenmodell, Urlaubstage, Überträge und **bezahlte Pausenminuten pro Tag** (z. B. `15` = eine Viertelstunde Pause wird bezahlt, `0` = die Pause wird nicht bezahlt); außerdem wählen Sie die **Pausenregel** unter **Administration → Einstellungen** (Standard: gestempelte Pause, ansonsten die Staffelung).

4. Erstellen Sie ein **Terminal** - in der Web-App unter **Administration → Terminals** (oder per `POST /api/terminals`).

PIN-Abfrage aktiviert. Öffnen Sie anschließend die Kioskansicht auf dem Gerät: Die Administration zeigt die fertige Adresse `http://<adapter host>:<port>/terminal/<device token>/` dafür an (das Token wird **einmal** angezeigt; das Gerät merkt es sich für den nächsten Start).

5. Erstellen Sie die gesetzlichen Feiertage für das Testjahr (Einstellung _Feiertagsland_), überprüfen Sie den Abwesenheitstyp _Urlaub_.

## 5. Testfälle
| Nr. | Titel | Schritte | Erwartung |
| --- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T1 | Anmeldung und Berechtigungen | Melden Sie sich als `admin` an, dann als `anna`; rufen Sie `GET /api/users` einmal mit jedem Token auf (Browserkonsole oder curl) | `admin`: 200 mit einer Liste; `anna`: **403** `permission_denied` - die API entscheidet, nicht die Schnittstelle |
| T2 | Online ein-/ausstempeln | Melden Sie sich mit `anna` an, stempeln Sie „ein“, warten Sie kurz, „ausstempeln“ | Bestätigung mit der Uhrzeit; die Tageswerte (Arbeitszeit/Ziel/Saldo) werden ohne Neuladen aktualisiert; das Ereignis trifft sofort ein |
| T4 | Kiosk-Terminal | Terminal öffnen, Badge-PIN `anna` eingeben, stempeln | stempeln mit Quelle `terminal`, sichtbar in der Monatsansicht; ein Konto ohne Stempelberechtigung wird mit 403 abgelehnt |
| T5 | RFID-Tag | Tag erstellen, `POST /rfid/scan` mit gültigem Token/TTL (curl) | 201 + Lochung; abgelaufenes TTL → 401/403 |
| T5 | RFID-Tag | Tag erstellen, `POST /rfid/scan` mit gültigem Token/TTL (curl) | 201 + Stempelung; abgelaufenes TTL → 401/403 |
| T7 | Berichte | Erstellen Sie Excel- und PDF-Dateien für einen Monat **und** ein Jahr; vergleichen Sie Tage mit einer **gestempelten Pause** und Tage **ohne** Stempelung; wählen Sie dann als Administrator im Tab _Berichte_ einen Mitarbeiter aus und laden Sie dessen Excel-/PDF-Datei. Öffnen Sie anschließend die Monatsansicht über den Monatsnamen. Beide Dateien werden geladen, der Dateiname enthält den Zeitraum und die Nummern entsprechen der Monatsansicht. Die Spalte **Pause** zeigt die gestempelte Pause (Lücke zwischen den Paaren) oder, an Tagen ohne Stempelung, die Pausenskala an, jedoch niemals beides gleichzeitig. Die Spalte **davon bezahlt** zeigt die bezahlten Minuten an (Summe am Ende). Die Mitarbeiterdatei enthält **den** Mitarbeiter-Login im Namen, und die Monatsansicht zeigt die Arbeitstage an. ohne Unicode-Schriftart in `ru`/`uk`/`zh-cn` → **422 `report_font_missing` ** mit einem Hinweis auf `report_font_path` |
| T8 | Abwesenheiten | Antrag für `anna` (z. B. Urlaub, halber Tag) stellen, Status ändern | Antrag in der Listen- und Monatsansicht, der Faktor beeinflusst Soll/Ist, die Statusänderung ist im Audit enthalten |
| T9 | Monatsabschluss | Befehl `commands.closeMonth` in ioBroker setzen | Abschlussstatus ändern sich, Ereignis im Live-Stream, zweiter Abschluss läuft fehlerfrei (idempotent) |
| T10 | Sichern und Wiederherstellen | „Jetzt Sicherung erstellen“; dann die Zeile **herunterladen** (Schaltfläche in der Liste) und die Datei außerhalb des Adapters speichern; dann eine Liste **auswählen und wiederherstellen** und die Instanz neu starten; zusätzlich die gespeicherte Datei über **Sicherung hochladen** laden und eine einzelne Sicherung **löschen** (Bestätigung) | Sicherung mit Zeitstempel, die Rotation behält die konfigurierte Anzahl bei; der Download liefert die Datei als Anhang; eine hochgeladene Datei wird überprüft und als „wird beim nächsten Start wiederhergestellt“ angezeigt; eine fremde Datei wird mit „Diese Datei ist keine Sicherung dieses Adapters“ abgelehnt und eine ausstehende Wiederherstellung bleibt unberührt; nach dem Neustart zeigt das Protokoll `restored the database from …` an und die Daten der Sicherung sind vorhanden (die vorherige Datei befindet sich daneben als `<database>.before-restore-…`) |
| T11 | Live-Events | Öffnen Sie die PWA in zwei Browsern (`admin` + `anna`), stempeln Sie in einem ein | der andere Browser aktualisiert sich sofort; ein Mitarbeiter sieht **keine** Events anderer |
| T11 | Live-Events | Öffnen Sie die PWA in zwei Browsern (`admin` + `anna`), melden Sie sich in einem an | der andere Browser aktualisiert sich gleichzeitig; ein Mitarbeiter sieht **keine** Events anderer |
| T13 | Sicherheit | (a) 20 falsche Passwörter; (b) Anfrage ohne CSRF-Token; (c) `../../etc/passwd` im Pfad; (d) Anfrage ohne Token | (a) **423**-Sperre, die nach der Zeit abläuft; (b) 403; (c) 400/404; (d) 401 |
| T14 | ioBroker-Zustände und -Befehle | Überprüfen Sie die Zustände unter `time-tracker.0.*`, setzen Sie `commands.punch` | Werte plausibel, `info.connection` wahr, Schaltflächenzustände `read: false`, ein gelöschter Benutzer hinterlässt keine Zustände |
| T15 | Sprachen | Umschalten der Benutzeroberfläche auf `de`, dann `ru`, dann `zh-cn`; Berichte in derselben Sprache | keine abgeschnittenen Texte, Datum/Zahlen lokal formatiert, Bericht in der Sprache des Benutzers |
| T15 | Sprachen | Benutzeroberfläche wechseln: erst auf „de“, dann auf „ru“, dann auf „zh-cn“; Berichte in derselben Sprache | Keine abgeschnittenen Texte, Datum/Zahlen lokal formatiert, Bericht in der Sprache des Benutzers |
| T17 | Laden (Beispiel) | `npm run load-smoke -- --login <user> --password '<password>'` (Standard: 5 parallele Stempelungen; `--count 10 --base http://…` möglich, Passwort alternativ in `ZT_PASSWORD`) | keine Fehler, alle 5 Stempelungen vorhanden, Antwortzeiten im Sekundenbereich - das Skript prüft sich selbst und beendet nur dann mit Code 0 |
| T18 | Notiz und Korrektur im Monat | Melden Sie sich als `anna` an und öffnen Sie den Stift eines vergangenen Tages im Monat (nur das Feld „Notiz für die Verwaltung“, keine Zeitfelder), speichern Sie eine Notiz; öffnen Sie als `admin` den Monat dieses Mitarbeiters, öffnen Sie denselben Tag (Stempel des Mitarbeiters und seine Notiz), fügen Sie einen Stempel hinzu und klicken Sie auf „Als erledigt markieren“; prüfen Sie dann, ob das Administratorkonto selbst stempeln kann | die Notiz erscheint als Symbol am Tag (offen = gelb, erledigt = grau) und das Speichern sendet `PUT /day-notes`; die Verwaltung sieht **die Stempel des Mitarbeiters** (nicht ihre eigenen) und „Stempel hinzufügen“ landet in ihrem Konto (`source: admin`); `POST /entries` mit dem Token des Mitarbeiters antwortet `403 permission_denied`; Das Administratorkonto hat keine Punch-Button-Funktion; auf der Startseite wird dessen Zweck erklärt. |
| T19 | Administratorschutz | Drücken Sie in der Administration den Schalter in der **eigenen** Zeile, öffnen Sie dann „Rollen“ und entfernen Sie das Häkchen bei „Administrator“. Anschließend `PATCH /api/users/<own id>` mit `{"isActive": false}` und mit `{"roleKeys": []}` (Konsole oder curl, mit CSRF-Token) | Der Schalter öffnet lediglich den Hinweis „Eigenes Konto“, das Konto bleibt aktiv; der Rollendialog zeigt den Hinweis zum zuletzt aktiven Administrator an und lässt „Speichern“ deaktiviert; die API antwortet beide Male mit **409** `last_administrator`, die Rollen bleiben `["admin"]` |
| T19 | Administratorschutz | In der Administration den Schalter der **eigenen** Zeile betätigen, dann „Rollen“ öffnen und das Häkchen bei „Administrator“ entfernen; anschließend `PATCH /api/users/<eigene ID>` mit `{"isActive": false}` und mit `{"roleKeys": []}` (Konsole oder curl, mit CSRF-Token) ausführen. | Der Schalter öffnet lediglich den Hinweis „Eigenes Konto“, das Konto bleibt aktiv; der Rollendialog zeigt den Hinweis zum zuletzt aktiven Administrator an und lässt „Speichern“ deaktiviert; die API antwortet beide Male mit **409** `last_administrator`, die Rollen bleiben `["admin"]`. |
| T21 | Kalender in ioBroker | Schreiben Sie `true` nach `commands.rotateCalendarToken`, öffnen Sie dann `calendar.feedUrl` **im Browser** (die URL muss `/api/calendar.ics?token=…` enthalten), geben Sie `calendar.feedFile` im `ical`-Adapter als **lokale Datei** ein (oder geben Sie den Link zu `ical.0.iCalReadTrigger` an) und starten Sie das Skript aus der README-Datei (Abschnitt _Kalender für ioBroker_) auf der Registerkarte "Skripte"; erstellen Sie dann eine Abwesenheit in der App | der Browser zeigt den Text `VCALENDAR` an (keine Anmeldung); Der `ical`-Adapter und das Skript zeigen das Fehlen als „Name: Typ (Code)“ an, `calendar.updatedAt` und `calendar.absences` ändern sich direkt nach ihrer Erstellung; ein zweiter Aufruf des Befehls erzeugt ein **neues** Token, der alte Link antwortet mit **401** |
| T21 | Kalender in ioBroker | Schreiben Sie `true` in `commands.rotateCalendarToken`, öffnen Sie dann `calendar.feedUrl` **im Browser** (die URL muss `/api/calendar.ics?token=…` enthalten), geben Sie `calendar.feedFile` im `ical`-Adapter als **lokale Datei** ein (oder geben Sie den Link zu `ical.0.iCalReadTrigger` an) und starten Sie das Skript aus der README-Datei (Abschnitt _Calendar for ioBroker_) im Skript-Tab; erstellen Sie dann eine Abwesenheit in der App | Der Browser zeigt den Text `VCALENDAR` an (keine Anmeldung); der `ical`-Adapter und das Skript zeigen die Abwesenheit als „Name: Typ (Code)“ an, `calendar.updatedAt` und `calendar.absences` ändern sich direkt nach der Erstellung; ein zweiter Aufruf des Befehls erstellt ein **neues** Token, der alte Link antwortet mit **401** |

## 6. Akzeptanzkriterien
- **T1-T13 sind grün.** T14-T17 waren jeweils mindestens einmal erfolgreich.
- Die Wiederherstellung aus dem Backup (T10) funktioniert: Datei kopieren, Adapter neu starten, Daten sind da.
Jede Abweichung wird protokolliert (Anzahl, Beobachtung, Bewertung) und entweder behoben oder bewusst als offenes Problem übernommen.

Punkt.

## 7. Protokoll (wird während des Tests ausgefüllt)
Die Akzeptanzprüfung lief auf **0.7.2** (Tag `v0.7.2`, Commit `3661f71`); **T1-T17** wurden in diesem Lauf am 24.09.2026 geprüft und hier eingetragen (die Zeilen blieben bis zum 27.09.2026 leer); **T18** stammt aus der 0.7.1-Runde und wurde mit dieser Version aktualisiert, T19 und T20 wurden mit 0.7.2 hinzugefügt; T21 wurde mit Version 0.7.3/0.7.4 akzeptiert, T22 ist die Konvertierung in Version 0.7.5 (Quellordner der Webanwendung und Intervallüberlappung), T23 der Gültigkeitszeitraum der Regeln in Version 0.7.6, T24 die Kalenderroute in Version 0.7.7/0.7.8, T25 und T26 die Regelübersicht und die Stornierungsroute in Version 0.7.8, T27 die Eingabe von Feiertagen in Version 0.7.9. **T28** (die Kalenderdatei wird über die Datei-API des Adapters erstellt) schlug mit **0.7.11** fehl und wurde **am 27.09.2026 mit Version 0.7.12** erfolgreich abgeschlossen - die Gründe für den Fehler und die Korrektur sind im Anhang zu D11 aufgeführt. **T29** (HTTPS im Adapter) wurde am 01.10.2026 mit Version 0.7.16 akzeptiert.

| Nr. | Datum | Tester | Ergebnis (OK / Abweichung) | Beobachtung |
| --- | ---------- | ------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T1 | 24.09.2026 | Alex | ok | `GET /api/users` mit dem Token von `admin` → 200 mit einer Liste, mit dem Token von `anna` → **403** `permission_denied`; die Schnittstelle zeigt die Administration nur dem Administrator an |
| T2 | 24.09.2026 | Alex | ok | Bestätigung mit der Uhrzeit, die Tageswerte werden ohne Neuladen aktualisiert, das Live-Ereignis trifft sofort ein |
| T4 | 24.09.2026 | Alex | ok | Stempel mit Quelle `terminal`, sichtbar in der Monatsansicht; ein Konto ohne Stempelrecht wurde mit Fehlercode 403 abgelehnt |
| T5 | 24.09.2026 | Alex | ok | `POST /rfid/scan` mit gültigem Token → 201 + Stempelung; abgelaufene TTL → 401/403 |
| T5 | 24.09.2026 | Alex | ok | `POST /rfid/scan` mit gültigem Token → 201 + Punch; abgelaufene TTL → 401/403 |
| T6 | 24.09.2026 | Alex | ok | Tagessummen wie in der Liste, Feiertage und Abwesenheiten markiert, offene Stempelung markiert, Saldo plausibel; die Kopfzeile zeigt **Pause** (mit bezahlten Pausen mit "davon bezahlt"), jede Tageszeile eine eigene Pause |
| T7 | 24.09.2026 | Alex | ok | Excel- und PDF-Dateien für einen Monat **und** ein Jahr, Dateiname mit dem Zeitraum, Zahlen identisch mit der Monatsansicht; die Spalte **Pause** zeigt die gestempelte Pause oder, an Tagen ohne Stempelung, die Pausenstaffelung und **niemals beides**, **wovon bezahlt** die bezahlten Minuten; die Datei des Mitarbeiters enthält **seine** Anmeldedaten |
| T8 | 24.09.2026 | Alex | ok | Anfrage in der Liste und in der Monatsansicht, der Faktor beeinflusst Soll und Ist, die Statusänderung ist im Audit |
| T10 | 24.09.2026 | Alex | ok | Backup mit Zeitstempel, die Rotation behält die konfigurierte Anzahl bei, der Download liefert die Datei als Anhang; ein hochgeladenes Backup wird beim nächsten Start überprüft und wiederhergestellt (Protokoll: `restored the database from …`), eine fremde Datei wird abgelehnt |
| T10 | 24.09.2026 | Alex | ok | Backup mit Zeitstempel, die Rotation behält die konfigurierte Anzahl bei, der Download liefert die Datei als Anhang; ein hochgeladenes Backup wird beim nächsten Start geprüft und wiederhergestellt (Protokoll: `Datenbank wiederhergestellt von …`), eine fremde Datei wird abgelehnt |
| T11 | 24.09.2026 | Alex | ok | Der zweite Browser wurde gleichzeitig aktualisiert; ein Mitarbeiter hat **keine** Ereignisse anderer gesehen |
| T13 | 24.09.2026 | Alex | ok | (a) **423** Sperre, die nach der Zeit abgelaufen ist; (b) 403 ohne CSRF-Token; (c) 400/404 für `../../etc/passwd`; (d) 401 ohne Token |
| T14 | 24.09.2026 | Alex | ok | Werte plausibel, `info.connection` wahr, Schaltflächenzustände `read: false`, ein gelöschter Benutzer hat keine Zustände hinterlassen |
| T15 | 24.09.2026 | Alex | ok | Keine abgeschnittenen Texte in `de`, `ru` und `zh-cn`, Datum und Zahlen lokal formatiert, Berichte in der Sprache des Benutzers |
| T15 | 24.09.2026 | Alex | ok | Keine abgeschnittenen Texte in `de`, `ru` und `zh-cn`, Datum und Zahlen lokal formatiert, Berichte in der Sprache des Benutzers |
| T17 | 24.09.2026 | Alex | ok | `npm run load-smoke` beendet mit Code 0 - 5 parallele Eingaben, alle anwesend, Antwortzeiten im Sekundenbereich |
| T18 | 24.09.2026 | Alex | ok | alles wie erwartet: Notiz am Tag (Symbol), Korrektur im Monat einer anderen Person ist beim Mitarbeiter gelandet, `POST /entries` des Mitarbeiters 403, Administratorkonto ohne Stempeltaste |
| T19 | 24.09.2026 | Alex | ok | Der Wechsel der eigenen Zeile öffnete nur den Hinweis, der Rollendialog deaktivierte „Speichern“, die API antwortete mit 409 `last_administrator`, Rollen unverändert |
| T19 | 24.09.2026 | Alex | ok | Der Wechsel der eigenen Zeile öffnete nur den Hinweis, der Rollendialog deaktivierte „Speichern“, die API antwortete mit 409 `last_administrator`, Rollen unverändert |
| T21 | 24.09.2026 | Alex | ok (eine Abweichung, behoben in 0.7.4) | `calendar.feedUrl` hat die Datei geliefert, der Download über den Dateiserver funktioniert, das Skript von §10a protokolliert die Abwesenheiten; beim ersten Durchlauf führte der Link zur Anmeldung - es fehlte das Präfix `/api`, behoben in 0.7.4 (die Datei befindet sich im Instanzordner `files/time-tracker.0/`, sichtbar als eigener Eintrag im Dateimanager) |
| T22 | 24.09.2026 | Alex | ok | Konvertierung für 0.7.5: Die Quellen der Web-App befinden sich in `src-www/` (vor `src-pwa/` meldete der Repochecker fünf `W5042` für react, MUI und i18next), die reguläre Synchronisierung und die stündliche Backup-Prüfung überspringen einen Lauf anstatt sich zu überlappen, und `onStateChange` schreibt nicht mehr für jeden fremden Zustand eine Debug-Zeile; `npm run check`, `lint`, `build`, `build:pwa`, `test:ts`, `test:package`, `check:adapter`, `check:i18n` und `version:check` sind grün, die Web-App wird unverändert ab `www/` ausgeliefert. |
| T22 | 24.09.2026 | Alex | ok | Umstellung für 0.7.5: Die Quellen der Web-App befinden sich in `src-www/` (vor `src-pwa/` meldete der Repochecker fünf `W5042` für react, MUI und i18next), die reguläre Synchronisierung und die stündliche Backup-Prüfung überspringen einen Lauf anstatt sich zu überlappen, und `onStateChange` schreibt nicht mehr für jeden fremden Zustand eine Debug-Zeile; `npm run check`, `lint`, `build`, `build:pwa`, `test:ts`, `test:package`, `check:adapter`, `check:i18n` und `version:check` sind grün, die Web-App wird unverändert von `www/` ausgeliefert |
| T24 | 25.09.2026 | Alex | ok | Kalenderroute korrigiert: `calendar.feedUrl` liefert die vollständige ICS-Datei (Browser zeigt `VCALENDAR` an, keine Anmeldung) und der `ical`-Adapter liest `calendar.feedFile` als lokale Datei; der Dateiserver-Link wird aus der README, T21 und den Statusbeschreibungen entfernt, da `…/files/time-tracker/calendar.ics` nur eine leere ZIP-Datei liefert (siehe D11) |
| T24 | 25.09.2026 | Alex | ok | Kalenderroute korrigiert: `calendar.feedUrl` liefert die vollständige ICS-Datei (Browser zeigt `VCALENDAR` an, keine Anmeldung erforderlich) und der `ical`-Adapter liest `calendar.feedFile` als lokale Datei; der Dateiserver-Link wird aus der README, T21 und den Statusbeschreibungen entfernt, da `…/files/time-tracker/calendar.ics` nur eine leere ZIP-Datei liefert (siehe D11) |
| T26 | 26.09.2026 | Alex | ok (vorgestellt in 0.7.8, akzeptiert in 0.7.9) | Stornierungsablauf: `anna` zieht eine offene Anfrage zurück, beantragt die Stornierung einer genehmigten Abwesenheit (Grund optional) und sieht „Stornierung beantragt“; `admin` lehnt unter _Stornierungsanfragen_ (die gebuchten Aufenthaltstage) ab und akzeptiert die nächste Anfrage (die Abwesenheit ist aufgehoben, die Löschung erfolgt in `cancelRequested: true`); „Ändern“/„Löschen“ in _Alle Abwesenheiten_ ändern die Daten oder entfernen die Zeile, und **„Abbrechen“ schließt das Änderungsfenster** wieder (behoben in 0.7.9: zuvor blieb das Formular geöffnet und verdeckte die Liste) (siehe D13) |
| T27 | 26.09.2026 | Alex | ok | Feiertag eingeben (0.7.9): Öffnen Sie den Reiter **Feiertage** in der Administration und geben Sie einen Tag ein - wählen Sie das Datum **aus dem Kalenderfeld des Feldes** (nicht eingeben), geben Sie den Namen ein, lassen Sie „Region (optional)“ leer; erstellen Sie dann denselben Tag mit einer Region (`BE`) und entfernen Sie beide Zeilen wieder; sehen Sie sich dann den Tag im Kalender des Reiters **Abwesenheiten** an (das Datum stammt aus dem Kalenderfeld des Browsers, nicht eingegeben), und „Feiertag hinzufügen“ ist **nur** aktiv, wenn Datum und Name vorhanden sind (vorher bleibt die Schaltfläche grau und es wird nichts gesendet); Die neue Zeile erscheint sofort in der Liste (Datum in der Sprache der Benutzeroberfläche, Name, Region), die ohne Region eingegebene Zeile enthält das **Land der Instanz** (nicht mehr ein festes `DE`), die Zeile mit `BE` steht daneben; ein Tag des nächsten Jahres übernimmt das „Jahr“ des Tabs; der Tag wird im Abwesenheitskalender hervorgehoben (siehe D14) |
| T28 | 27.09.2026 | Alex | ok (0.7.11 fehlgeschlagen, mit 0.7.12 erfolgreich) | Kalenderdatei über die Datei-API (0.7.12): Starten Sie die Instanz neu und öffnen Sie im ioBroker-Dateimanager (Admin → Objekte → `files` oder Registerkarte _Dateien_) den Ordner `time-tracker.0` mit dem Unterordner `storage` und laden Sie `calendar.ics` herunter; rufen Sie dann `http://<host>:8081/files/time-tracker.0/storage/calendar.ics` **und** `http://<host>:8081/files/time-tracker/storage/calendar.ics` im Browser auf; Dann eine Abwesenheit erstellen und fünf Minuten warten - **0.7.11 fehlgeschlagen:** Im Protokoll stand `Cannot write file INFO.txt: time-tracker.0 is not an object of type "meta"` und die gleiche Zeile für `calendar.ics` - die Datei hing im Instanz-Namespace anstatt an einem Mountpunkt fest, weder Ordner noch Datei wurden erstellt (Nachtrag zu D11). Mit 0.7.12 ist der Ordner `time-tracker.0` → `storage` im Dateimanager sichtbar (ebenfalls ohne Abwesenheit), und `calendar.ics` kann heruntergeladen werden; der Download liefert den Text `VCALENDAR`; wenn einer der beiden Links die Datei liefert, wird sie wieder in die README und T21 aufgenommen - wenn nur eine leere ZIP-Datei (22 Bytes, `PK\x05\x06`) dort ankommt, bleibt der Link außerhalb; `calendar.ics` und `calendar.updatedAt` ändern sich spätestens nach fünf Minuten. **Ergebnis 27.09.2026 (0.7.12):** Das Protokoll ist fehlerfrei, der Dateimanager zeigt den Ordner `time-tracker.0` → `storage` an, und der Download liefert eine `calendar.ics`, die inhaltlich korrekt ist - bestanden; der direkte Link `http://<host>:8081/files/time-tracker.0/storage/calendar.ics` liefert die Datei ebenfalls (heruntergeladen und inhaltlich geprüft), weshalb sie wieder in der README und in T21 aufgeführt ist; der Pfad ohne `/storage` bleibt unberücksichtigt (siehe D11). |
| T29 | 01.10.2026 | Alex | ok (0.7.16) | HTTPS im Adapter (D17): Aktivieren Sie **HTTPS verwenden** in den Instanzeinstellungen, wählen Sie `defaultPublic`/`defaultPrivate` und speichern Sie die Einstellungen. Öffnen Sie `https://<host>:<port>/` (bestätigen Sie die Warnung zum selbstsignierten Zertifikat), melden Sie sich an und bestätigen Sie. Das Symbol in der Instanzliste führt zu `https`; `calendar.feedUrl` beginnt mit `https`. Zweiter Durchlauf: Löschen Sie das Zertifikat oder ändern Sie den Namen → die Seite ist **nicht** erreichbar, der Grund wird im Protokoll angegeben (kein Fallback auf HTTP). Deaktivieren Sie HTTPS anschließend wieder → `http` wie zuvor. |
| T29 | 01.10.2026 | Alex | ok (0.7.16) | HTTPS im Adapter (D17): Aktivieren Sie **HTTPS verwenden** in den Instanzeinstellungen, wählen Sie `defaultPublic`/`defaultPrivate`, speichern Sie; öffnen Sie `https://<Host>:<Port>/` (bestätigen Sie die Warnung zum selbstsignierten Zertifikat), melden Sie sich an, geben Sie ein; das Symbol in der Instanzliste führt zu `https`; `calendar.feedUrl` beginnt mit `https`. Zweiter Durchlauf: Löschen Sie das Zertifikat oder ändern Sie den Namen → die Seite ist **nicht** erreichbar, das Protokoll nennt den Grund (kein Fallback auf HTTP). Dann deaktivieren Sie HTTPS → `http` wie zuvor. |

## 8. Absichtlich nicht im Rahmen dieser Runde
| Lücke | Effekt im Test |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Erweiterung des Adminbereichs | **Erledigt**: Rollenwechsel pro Zeile, Einstellungen, Tags, Feiertage, Statistiken und Badges sind vorhanden - und seit dieser Runde auch die **Aktionen** (ein ioBroker-Status löst Stempeln oder Anwesenheit aus) zusammen mit `sendTo`-Nachrichten (`punch`, `present`, `status`, `report`, `backup`). Der frühere Wunsch „NFC-Bedienung mit dem Telefon“ wurde **absichtlich verworfen**: Er funktioniert nur mit Android Chrome und stand in keinem Verhältnis zu seiner Verwendung; ein Fingerabdruckleser, ein Knopf oder ein Türkontakt wird jetzt über die Aktionstabelle angebunden. |
| Keine E2E-Tests (Playwright) | `npm run e2e`, `test/e2e/server.mjs` startet die eigentliche API + die erstellte PWA: **Alles grün** (Login, Session über Cookie, Statistiken, Kiosk und Anwesenheitstoken, Badge-Link, Branding, Zeitkorrektur, Anwesenheitskacheln, Benutzer und Terminal, **Aktionstabelle**, plus **erzwungene Passwortänderung mit dem Startpasswort**, **Monatsansicht**, **PDF-Abrechnung zum Download**, **Abwesenheitsanfrage**, **Backup herunterladen, hochladen und löschen**, **Arbeitsprofil mit bezahlten Pausen**, **Layout-Messung** (bei 360 px Breite darf keine Linie Aktionen über den Text legen), **Feiertage**, **Tagesnotizen mit Korrektur**, **abgelaufenes Terminal-Token**, die **Aktionsliste**, die **Seiteninformationen**). Der E2E-Server läuft auf einer temporären Datenbankdatei (nicht im Arbeitsspeicher), sodass auch ein Backup wiederhergestellt werden kann. Der frühere Rendering-Fehler nach dem Login (React #130) ist behoben - die Symbole kommen als echtes ES-Modul über den Alias in `vite.config.ts` an - es gibt **keine** verzögerten Fälle mehr. T1-T13 müssen weiterhin manuell bearbeitet werden, da sie Berechtigungen, Offline-Betrieb und echte Geräte prüfen. |
| PDF-Schriftarten (`ru`, `uk`, `zh-cn`) | Benötigt eine Unicode-Schriftartdatei bis einschließlich `report_font_path`; andernfalls wird eine eindeutige Fehlermeldung angezeigt. |
| PDF-Schriftarten (`ru`, `uk`, `zh-cn`) | Benötigt eine Unicode-Schriftartdatei über `report_font_path`; andernfalls wird eine eindeutige Fehlermeldung angezeigt. |

## 9. Ausweichszenario
Der Adapter schreibt **ausschließlich** in sein Datenverzeichnis (SQLite-Datei) und in seine eigenen ioBroker-Objekte. Ein bestehender alter

Die Anwendung bleibt unberührt und kann weiterlaufen.

- Fallback: `iobroker stop time-tracker`, Datenbankdatei speichern, alte Anwendung weiter betreiben.
- Vor jedem Testlauf ein Backup (T10) erstellen und die Datei **außerhalb** des Adapterverzeichnisses kopieren.

## 10. Ergebnis und nächste Schritte (nach dem Test)
- Offene Abweichungen in [`decisions.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/decisions.md) protokollieren.
Erst dann wird die Versionsnummer markiert (`npm run release -- patch|minor`) - der Deployment-Job veröffentlicht die Version dann über npm (vertrauenswürdig).

(Veröffentlichung vorausgesetzt) und erstellt das GitHub-Release.

## 10a. Prüfen Sie den Codeausschnitt für T21 (nur zum Nachschlagen, nicht Teil des Adapters)
`calendar.absences` ist JSON; dieses Skript im **Skript-Tab** schreibt die heute laufenden Abwesenheiten in das Protokoll und meldet sie bei jeder Aktualisierung des Adapters erneut:

```js
const id = "time-tracker.0.calendar.absences";

/** Writes the absences running today into the log. */
function checkCalendar() {
	const state = getState(id);
	if (!state || !state.val) {
		log("time-tracker: no absences yet", "warn");
		return;
	}
	const today = formatDate(new Date(), "YYYY-MM-DD");
	const running = JSON.parse(state.val).filter(a => a.approval === "approved" && a.from <= today && a.to >= today);
	log(
		running.length === 0
			? "time-tracker: nobody is absent today"
			: `time-tracker: ${running.map(a => `${a.name} - ${a.type} (${a.code}) until ${a.to}`).join(", ")}`,
	);
}

checkCalendar();
on(id, checkCalendar);
```

## 11. Entwicklungshinweise (Weboberfläche)
**Browser-Tests** (`npm run e2e`, Ordner `test/e2e/`): Sie beginnen mit `test/e2e/server.mjs` - das ist die eigentliche API auf einer In-Memory-Datenbank mit den erstellten Webdateien aus `www/`. Kein ioBroker, keine Netzwerkverbindung erforderlich. Vor dem Start muss `npm run build:pwa` ausgeführt worden sein; die Tests blockieren den Service Worker, da Workbox sonst die alten Dateien aus dem Precache ausliefern würde.

**Wichtig:** Prüfen Sie zuerst den Exit-Code des Builds und lesen Sie dann das Testergebnis. Ein abgebrochener Build (z. B. aufgrund eines nicht verwendeten Imports) lässt `www/` unverändert - die Tests werden dann im Hintergrund mit dem **alten** Zustand ausgeführt.

**Ein Durchlauf ist für genau einen Server bestimmt.** `playwright.config.ts` übernimmt einen laufenden E2E-Server (`reuseExistingServer`), und dieser Server behält seine Datenbank **im Speicher**: Ein zweiter Durchlauf trifft auf den Zustand des ersten.

Der Doppelscan-Schutz verwirft dann alle Eingaben innerhalb von 30 Sekunden, und die Überprüfung des Startpassworts schlägt fehl, da es bereits geändert wurde. Vor einem weiteren Durchlauf muss der Server auf Port `8099` beendet oder neu gestartet werden; andernfalls hinterlässt ein abgebrochener Durchlauf einen Zombie-Server, auf dem die nächste Runde mit `ERR_CONNECTION_REFUSED` fehlschlägt (die Überprüfung „Aktionen liegen nicht im Text“ in `test/e2e/layout.spec.ts` sieht dann ebenfalls einen anderen Datenbestand als erwartet).

**Entwickeln Sie die Web-App gegen den laufenden Adapter** (schnelles Feedback, React im Entwicklungsmodus mit lesbaren Fehlern):

```bash
npm --prefix src-www run dev     # port 5173, fetches /api/… through the proxy of 127.0.0.1:8092
```

Zwei Fallstricke, die dort Zeit kosten:

Der Proxy in `src-www/vite.config.ts` muss als **berechneter** Schlüssel `[API_PREFIX]` angegeben werden. Mit `API_PREFIX:`

Der Text wird als Literal verglichen, der Proxy kommt nie zum Einsatz und jede API-Anfrage landet in der App-Shell (die Anmeldung schlägt dann fehl, `GET /api/auth/me` gibt die HTML-Datei zurück).

- `@mui/icons-material` 5.x liefert jedes Symbol zweimal aus: als CommonJS (`Menu.js`) und als ES-Modul (`esm/Menu.js`).

Ohne den Alias in `vite.config.ts` kann der Standardimport als Modulobjekt ankommen `{ default: … }` - React bricht dann mit der Meldung „Element type is invalid … got: object“ ab (React #130), und zwar erst nach der Anmeldung, da die Symbole nur in der Shell und in den Formularen vorkommen.

Nach einer Änderung an `vite.config.ts` wird der Cache `src-www/node_modules/.vite` gelöscht, andernfalls antwortet der Entwicklungsserver mit `504 Outdated Optimize Dep`.

### Eine echte ioBroker-Instanz lokal (Entwicklungsserver)
`npm run dev-server setup` (einmalig) und anschließend `npm run dev-server watch` erstellen eine vollständige ioBroker-Installation mit dem Adapter unter `.dev-server/default`. Die Webanwendung läuft dann unter `http://127.0.0.1:8092`, die Administrationsoberfläche unter `http://127.0.0.1:8081`. Falls in den Instanzeinstellungen kein Startpasswort hinterlegt ist, wird **einmalig** eines generiert und im Protokoll gespeichert.

```text
warn: time-tracker.0 administrator "admin" created with the start password "Zf-…" - change it at the first login
info: time-tracker.0 administrator "admin" exists already and still has its start password - it was set from the instance settings now
warn: time-tracker.0 the configured start password is not used: administrator "admin" changed his password already (empty the field "Start password of the first administrator" to silence this)
```

> **Windows 11 ohne `wmic`:** `dev-server watch` bricht dort mit `spawn wmic.exe ENOENT` ab - das Tool liest die Festplattengröße bis einschließlich `wmic`, und dieser Fehler wird in Version 0.8.0 nicht behandelt (`wmic` wurde von Microsoft entfernt). Controller und Adapter sind zu diesem Zeitpunkt bereits installiert; Es genügt, den Controller direkt zu starten: > > ```powershell > cd .dev-server\default > node node_modules\iobroker.js-controller\controller.js # läuft im Vordergrund > node node_modules\iobroker.js-controller\iobroker.js start time-tracker.0 # zweite Konsole > node node_modules\iobroker.js-controller\iobroker.js start admin.0 # optional: Admin-Oberfläche > ``` > > Beenden Sie mit `iobroker.js stop time-tracker.0` oder Strg+C im Controller-Fenster. Auf diese Weise ist kein Hot Reload erforderlich: > Führen Sie nach Änderungen `npm run build` (Adapter) oder `npm run build:pwa` (Web-App) aus und starten Sie die Instanz einmal neu.

Damit Änderungen an der Web-App ohne Neuinstallation wirksam werden, kann der mitgelieferte Ordner `www` auf den Ordner im Repository verweisen (der Adapter liest die Dateien bei jeder Anfrage von der Festplatte):

```powershell
cd .dev-server\default\node_modules\iobroker.time-tracker
cmd /c rmdir www                     # removes only the link, not the target
New-Item -ItemType Junction -Path www -Target <repository>\www
```

> **Verknüpfen Sie nur `www` und entfernen Sie immer Verknüpfungen mit `cmd /c rmdir`.** Zwei Erfahrungen aus der Einrichtung: > > - Eine Verknüpfung ist **nicht** für den Adaptercode geeignet (`build/`): Der JS-Controller findet den Adapter dann nicht mehr und beendet ihn mit `CANNOT_FIND_ADAPTER_DIR`.

> - `Remove-Item -Recurse` an einer Verknüpfung in PowerShell löscht auch den **Inhalt des Ziels**. Bei `cmd /c rmdir <path>` verschwindet nur die Verknüpfung.

> > Nach Adapteränderungen müssen die Dateien neu erstellt und kopiert werden: > > ```powershell > npm run build > Copy-Item build .dev-server\default\node_modules\iobroker.time-tracker\build -Recurse -Force > ```

`.dev-server/` und `iobroker.*.tgz` werden bereits in `.gitignore` behandelt.

**Beachten Sie beim Testen den Port:** `npm run test:integration` startet eine eigene ioBroker-Instanz und bindet denselben Port wie der Adapter (Standard `8092`). Wenn Ihre eigene Instanz läuft, kann die Testinstanz ihre API nicht öffnen und die Prüfung schlägt mit der Fehlermeldung „Startet die HTTP-API auf dem konfigurierten Port“ fehl. Stoppen Sie daher zuerst Ihre eigene Instanz (`iobroker.js stop time-tracker.0`).