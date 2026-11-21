---
chapters: {"pages":{"en/adapterref/iobroker.time-tracker/README.md":{"title":{"en":"ioBroker.time-tracker"},"content":"en/adapterref/iobroker.time-tracker/README.md"},"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md":{"title":{"en":"Acceptance and test plan (first real tests)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/test-plan.md"},"en/adapterref/iobroker.time-tracker/docs/en/decisions.md":{"title":{"en":"Decisions and deviations"},"content":"en/adapterref/iobroker.time-tracker/docs/en/decisions.md"},"en/adapterref/iobroker.time-tracker/docs/en/i18n.md":{"title":{"en":"Translations (i18n)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/i18n.md"},"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md":{"title":{"en":"Getting started and first-start test"},"content":"en/adapterref/iobroker.time-tracker/docs/en/getting-started.md"},"en/adapterref/iobroker.time-tracker/docs/en/technical.md":{"title":{"en":"Technical notes (internals)"},"content":"en/adapterref/iobroker.time-tracker/docs/en/technical.md"},"en/adapterref/iobroker.time-tracker/docs/en/development.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.time-tracker/docs/en/development.md"},"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md":{"title":{"en":"Checking the adapter rules"},"content":"en/adapterref/iobroker.time-tracker/docs/en/adapter-check.md"},"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.time-tracker/CONTRIBUTING.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-tracker/docs/en/decisions.md
title: Entscheidungen und Abweichungen
hash: h6DO5OAe66YuHoQmThzn/n9gYwMIyBTPKTMMU6ZqwdU=
---
# Entscheidungen und Abweichungen
Dieses Dokument protokolliert Entscheidungen, die vom ursprünglichen Geltungsbereich abweichen, um deren Nachvollziehbarkeit zu gewährleisten. Wie die anderen Dokumente unter `docs/` existiert es auch in deutscher Sprache ([`../de/entscheidungen.md`](https://github.com/sadam6752-tech/ioBroker.time-tracker/blob/main/docs/de/entscheidungen.md), der Originaltext); `README.md` ist in englischer Sprache (eine Anforderung des Adapterprüfers).

## D1 - Kein Import der alten Daten des Vorgängersystems (16.09.2026)
**Entscheidung:** Der Adapter liest **keine** vorhandenen Daten des Vorgängersystems. Es gibt keinen Importer, keinen Testlauf und keine Importberichte.

**Was wurde mit Commit `184414c` entfernt?** (65 Dateien, 41 Zeilen hinzugefügt, 3861 entfernt):

| Teil | Umfang |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Parser (`src/lib/legacy/parsers.ts`) | `Data/users.txt`, `Data/group.txt`, `<login>/userdaten.txt` (18 indexbasierte Zeilen), `<login>/absenz.txt`, `Timetable/<year>` (12 Zeilen mit Ziel-/Saldoangaben in Stunden), `Timetable/<year>.<month>` (Stempelzeiten), `Timetable/A<year>` (Abwesenheiten), `Timetable/auszahlungen`, `Timetable/total.txt`, `include/Settings/pausen.txt`, `include/Settings/settings.txt` |
| Import (`import.ts`) | Mapping und Normalisierung, Testlauf und Reallauf, Idempotenz, Duplikate, Bericht |
| Schnittstelle | Registerkarte "Admin", Adapterbefehl (`sendTo`), REST-Routen, `native` Felder (Verzeichnis, Testlauf, Wiederholung) |
| Testdaten | `fixtures/smalltime/**` und `tools/make-legacy-fixture.mjs` |
| Provenienz | `docs/provenance.md`, `tools/cleanroom-check.ps1` (siehe D3) |
| Provenienz | `docs/provenance.md`, `tools/cleanroom-check.ps1` (siehe D3) |

**Folgen**

- Die Migrationen bereinigen die Zwischenzustände: `users.legacy_sha1`, `work_profiles.legacy_source` und

`rfid_tags.legacy_code` zusammen mit dem Index `idx_rfid_legacy` werden entfernt, falls sie existieren (`src/lib/db/migrations.ts`).

**Kein Benutzer ist betroffen:** Die Entfernung erfolgte am 16.09.2026 um 08:18 Uhr, die erste Veröffentlichung von Version 0.0.4 erschien auf npm am

16:32 - **Keine** veröffentlichte Version enthielt den Importer.

- `time_entries.source` und `EntrySource` kennen weiterhin den Wert `import`; er wird nur nicht mehr erstellt.
Der Akzeptanzpunkt der internen Spezifikation „alte Daten können mit einem Testlauf importiert werden“ ist daher

**absichtlich offen**; der Akzeptanzlauf in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) überprüft jetzt nur noch das Verhalten des Adapters selbst.

**Begründung:** Ein Importeur hätte die Bedeutung jeder einzelnen Spalte der vorhandenen Daten korrigieren müssen. Ohne eine exakte Kopie der Daten der Referenzinstallation wäre diese Zuordnung nur erraten worden - und die Regeln in [`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.time-tracker/CONTRIBUTING.md), Abschnitt 1, verbieten die Ableitung aus fremdem Programmcode oder dessen Schnittstelle. Dies war nicht nötig: Der Adapter beginnt mit leeren Stammdaten, die Administration erstellt Benutzer, Arbeitsprofile und Abwesenheiten selbst. Durch die Entfernung wurden 65 Dateien und 3861 Zeilen gelöscht; der vorherige Zustand bleibt über die Historie (`184414c`) erreichbar.

**Soll der Import rückgängig gemacht werden:** Der vollständige Status befindet sich im Git-Verlauf (`git show 184414c^:src/lib/legacy/import.ts`).

Benötigt werden: Testdaten unter `fixtures/smalltime/**` (aus einer realen Installation, **nicht** aus fremdem Programmcode), die vier Datenbankspalten über eine neue Migration, der Admin-Tab, der Adapterbefehl und REST-Routen.

## D2 - `common.compact: true` (geändert am 20.11.2026, vorher: `false`)
**Bis Version 0.8.1** lief der Adapter als eigener Prozess (`common.compact: false`), da er seinen eigenen HTTP-Port bindet und während seiner gesamten Laufzeit eine SQLite-Datei im WAL-Modus geöffnet hält.

**Seit dem 20.11.2026** wird der Kompaktmodus unterstützt (Vorschlag `S1039` des Repository-Prüfers). Eine Codeprüfung ergab, dass kein eigener Prozess erforderlich ist: Alle Timer sind vom Adapter selbst implementiert (`this.setTimeout`/`this.setInterval`, ebenso der WebSocket-Ping und das SFTP-Zeitlimit), `onUnload` schließt den HTTP-Server mit allen Verbindungen und anschließend die Datenbank, es gibt keine `process.env`/`process.exit`/`process.on`, und der einzige Modulzustand ist ein Cache mit simulierten Passwort-Hashes, der von zwei Instanzen gemeinsam genutzt werden kann. Die Adapter `web` und `admin` binden Ports auch im Kompaktmodus.

**Kosten des gemeinsamen Prozesses:** better-sqlite3 und das Passwort-Hashing (`scryptSync`) laufen synchron. Während eines Backups (`VACUUM INTO`), einer Neuberechnung, eines PDF-/Excel-Berichts oder einer Anmeldung warten die anderen Adapter der Kompaktgruppe. Ein Absturz des nativen Moduls beendet die gesamte Gruppe. `compact: true` bietet lediglich die Wahlmöglichkeit: Die **Kompaktgruppe** der Instanz entscheidet - Gruppe `0` hält den Adapter wie zuvor in einem eigenen Prozess. Die README empfiehlt Gruppe `0` für einen leistungsschwachen Host oder eine stark ausgelastete Installation.

Die Regel „keine `process.env`/`process.exit` im Quellcode“ bleibt bestehen (in einem gemeinsam genutzten Prozess würde ein Exit auch die anderen Adapter beenden); siehe [`adapter-check.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/adapter-check.md).

## D3 - Herkunftsdatensatz außerhalb des Repositorys (16.09.2026)
Bis zum 16.09.2026 befanden sich die Dateien `docs/provenance.md` (Quelle und Datum des Referenzsystems, Protokollierungsverfahren) und `tools/cleanroom-check.ps1` (Textvergleich mit der Referenzinstallation) im Repository. Beide wurden mit dem Commit `184414c` entfernt, da mit dem Importer (D1) nur der Teil entfernt wurde, der Formate und Kennungen des Vorgängersystems betraf.

**Was erhalten bleibt:** Der Abschnitt ["Herkunft"](/#/adapters/time-tracker#provenance) von `README.md` benennt den Ursprung, und die Reinraumregeln sind in [`CONTRIBUTING.md`](/#/docs/adapterref/iobroker.time-tracker/CONTRIBUTING.md) (Abschnitt 1) verbindlich. Der Datensatz selbst wird **außerhalb** dieses Repositorys aufbewahrt.

**Wenn der automatische Vergleich zurückgegeben werden soll:** Das Skript befindet sich im Verlauf (`git show 184414c^:tools/cleanroom-check.ps1`); es erwartet die Referenzinstallation als Pfadparameter (`-LegacyPath`) und meldet Treffer als Liste.

## D4 - Backups aus dem Browser: Upload über den Rohdatenkörper, Limit pro Route (17.09.2026)
Die Administration konnte ein Backup herunterladen und ein **aufgelistetes** wiederherstellen. Das **Löschen** und **Wiederherstellen einer heruntergeladenen Datei** fehlten - beides erfordert die gleiche Entscheidung beim Transport: Die API liest jeden Datenkörper gegen ein **routerweites** Limit (2 MiB), und eine Route konnte bisher kein eigenes Limit festlegen. Ein Backup ist größer als dieses Limit.

**Entscheidung:** `RouteDefinition` erhält optional ein `maxBodyBytes`. Nur `POST /backup/restore` setzt dieses Limit (64 MiB), alle anderen Routen bleiben bei 2 MiB - die Tests bestätigen beides (ein großer Datenkörper an eine andere Route endet weiterhin in `413 payload_too_large`).

Der Webserver liest mit demselben Limit (`MAX_BACKUP_UPLOAD_BYTES`), da der Transport einen Datenkörper ablehnt, bevor eine Route ihn überhaupt empfängt. _(Geändert in D18: Der Transport fragt nun den Router nach dem Limit der Route und gewährt das erhöhte Limit nur einem angemeldeten Aufrufer, der es gegebenenfalls wiederherstellen kann.)_

Der Upload trifft als **roher Body** (`application/octet-stream`) ein, nicht als Base64-kodiertes JSON: Der Browser sendet die ausgewählte Datei direkt (`body: file`), der Server speichert sie für diesen Inhaltstyp als **Bytes** anstatt als Text. Die Dekodierung als UTF-8 würde die Binärdaten zerstören; es gibt einen Test mit einer Bytefolge, die kein gültiges UTF-8 ist (Größe **und** SHA-256-Hash müssen übermittelt werden). Name und Grund werden als Abfrageparameter übertragen; der Name dient lediglich als Bezeichnung für Anzeige und Protokollierung und wird vor dem Speichern auf `[A-Za-z0-9._-]` bereinigt.

**Sicherheitsnetz:** Die neue Datei ersetzt die wartende Datei erst, **nachdem** sie geprüft wurde - sie wird zunächst als `<…>.part` geschrieben, verifiziert und dann umbenannt. Eine abgelehnte Datei lässt daher eine bereits in der Warteschlange befindliche Wiederherstellung unberührt, und eine unvollständig geschriebene Datei kann beim nächsten Start niemals zur Datenbank werden.

**Löschen:** `DELETE /api/backup/:name` löscht nur Dateien in der Liste (Dateien von außerhalb werden nicht gelöscht), schreibt `backup.remove` ins Protokoll und fragt in der Benutzeroberfläche nach. Die automatische Rotation bleibt unberührt und läuft im Hintergrund weiter.

## D5 - Bruch vom Schlag oder von der Bruchskala (17.09.2026)
Die Zeitaufstellung enthält eine Spalte „Pause“, und die Berechnung lautete `balance = sum(pairs) − scale − target`. Zwei Dinge daran waren irreführend oder falsch:

1. **Die Spalte zeigte die tatsächliche Pause nicht an.** Wer ein-/ausstempelt/… bildet Paare; die Zeit zwischen zwei Paaren beträgt

Die Pause fehlte in der Summe der Paare (dem „Brutto“) - die Spalte „Pause“ wurde jedoch allein durch die Pausenskala gefüllt. Ergebnis: Wer eine halbe Stunde gearbeitet hat, sah `Break 0:00`.

2. **Ein gestanzter Pausenabzug wurde zweimal vorgenommen**, da zusätzlich eine Skalierungsregel Anwendung fand: Die Lücke fehlte im Bruttoergebnis.

bereits, und die Regel zog noch einmal ab (07:00/13:30/14:00/17:00 ergab 9:00 statt 9:30).

**Entscheidung:** Die Berechnung beginnt nun mit der **Anwesenheit** (vom ersten bis zum letzten abgeschlossenen Schlag) und zieht genau eine Pause ab:

| Modus (`pause_mode`) | Spalte „Pause“ | Arbeitszeit |
| `auto` (Standard) | gestanzter Bruch, ansonsten die Skala | Anwesenheit − Bruch |
| `punched` | nur der gestanzte Bruch (`0:00` wenn nichts gestanzt wurde) | Anwesenheit − Bruch |
| `staffel` | nur die Skalenregeln | Anwesenheit − Bruch |
| `staffel` | nur die Skalenregeln | Anwesenheit − Pause |

Die Skala behält ihren Zweck: Sie dient als flache Pause für Tage, an denen niemand boxt. Ein Tag mit **offenem** Punch hat noch keine endgültige Pause - die Skala greift auch hier.

**Bezahlte Pause:** Neues Feld `work_profiles.pause_paid_minutes` (Migration 13) mit einem Zahlenfeld im Arbeitsprofil jedes Mitarbeiters: **Diese Anzahl an Minuten Pause pro Tag wird bezahlt** (`0` = gar nicht). Der Wert `1440` bedeutet, dass eine Pause beliebiger Länge bezahlt wird; Unternehmen, die nur eine Viertelstunde bezahlen, geben `15` ein. Die bezahlten Minuten werden der Arbeitszeit hinzugefügt, der Rest der Pause wird abgezogen - die Spalte „Pause“ zeigt weiterhin die **gesamte** Pause an, sodass die Aussage verständlich bleibt. (Ursprünglich war dies ein Ja/Nein-Schalter; Migration 13 ändert dies: „bezahlt“ wird zu `1440`.)

**Anmerkung:** Anfangs gab es keine Möglichkeit, die Pausenskala beizubehalten - die Tabelle `pause_rules` hatte keinen Eintrag mehr (der Datenimport wurde mit D1 abgebrochen), daher waren die Regeln bei einer Neuinstallation leer und „Pause“ war immer `0:00`. Seit der letzten Runde gibt es `GET`/`PUT /api/pause-rules` (rechts `settings.edit`) und einen Editor im Tab **Einstellungen**: Regeln mit „Von Minuten / Bis Minuten / Pausenminuten“ und einem Schalter pro Regel; der Aufruf ersetzt die gesamte Tabelle, fehlende Regeln werden entfernt.

**Nachweis:** Im Zeitnachweis ist neben „Pause“ die Spalte **„wovon bezahlt“** (`day_aggregates.paid_break_min`, Migration 14) mit einer Summe angegeben - so zeigen sowohl die PDF-Datei als auch die Excel-Datei, welcher Teil der Pause bezahlt wurde.

## D6 - Nur die Verwaltung ändert die Zeiten, der Mitarbeiter notiert den Tag (24.09.2026)
Wer eine Zeit ändern kann, kann auch die Arbeitszeit erfinden. Bis hierhin konnte ein Benutzer (`employee`) innerhalb des Bearbeitungsfensters eigene Stempelzeiten ändern und hinzufügen (`edit_window_days`, Standardwert: 7 Tage); in der Monatsansicht öffnete der Stift genau diesen Dialog. Zwei Dinge daran waren falsch:

1. **Der Monatsdialog war nicht mit dem Mitarbeiter verknüpft.** Der `DayCorrectionsDialog` fragte nach den Stempelungen **ohne** `userId`.

(`api.entries(date, date)`), der Server nutzte also das eigene Konto - und `createEntry` schrieb mit `userId: session.user.id`. Im Monat eines Mitarbeiters (`/month?userId=…`) zeigte die Verwaltung daher ihre **eigenen** Stempelungen an und änderte sie; „Stempel hinzufügen“ erstellte eine Stempelung im eigenen Konto.

2. **Die Zeiteinteilung ist nicht Sache des Mitarbeiters.** Ein vergessener Stempelvorgang ist eine **Botschaft**, keine Korrektur: Der Mitarbeiter

Die Verwaltung weiß, dass sie es vergessen haben, und bucht es.

**Entscheidung:** Die Zeiten gehören der Verwaltung, **vermerkt der Mitarbeiter**.

| Rolle | Monat eintragen | Inhalt des Dialogs |
| ----------------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `admin`, `manager` (`time.edit_other`) | eigener Monat und Monat eines Mitarbeiters | Stempelungen des Tages: hinzufügen, Zeit ändern, löschen (`time.delete`), **Grund** für den Protokolleintrag - verknüpft mit dem Mitarbeiter, dessen Monat geöffnet ist |
| `Mitarbeiter` | Nur eigener Monat | **Tagesnotiz** („Ein-/Ausstempeln vergessen“), sonst nichts |

Auf dem dahinterliegenden Server: `POST /api/entries` (manuelle Eingabe) und jede Einstellung von `tsUtc` in `PATCH /api/entries/:id` erfordert `time.edit_other`; ein eigener Stempelvorgang kann jetzt nur noch **auskommentiert** werden (`note`). `DELETE` bleibt `time.delete`. Das Stempeln wird über `time.punch` (`/punch`, `/punch/quick`, die Offline-Warteschlange `/entries/sync`) fortgesetzt.

**Der Vermerk** benötigt einen eigenen Bereich, da er genau für Tage gedacht ist, an denen **kein** Stempelvorgang stattgefunden hat: Tabelle `day_notes` (Migration 25, ein Eintrag pro Mitarbeiter und Tag) mit `GET`/`PUT /api/day-notes` (eigene Tage mit `time.edit_own`, andere Tage mit `time.edit_other`; ein leerer Text löscht den Eintrag) und `POST /api/day-notes/handled` - die Administration hakt den Vermerk als **erledigt** ab, er bleibt sichtbar. Der Monat kennzeichnet einen Tag mit einem Vermerk (Symbol neben dem Saldo): offen = gelb, erledigt = grau.

**Das Administratorkonto hat keine Stempelberechtigung:** Es wird bei der Installation erstellt und ist keiner bestimmten Person zugeordnet; es verwaltet die Mitarbeiter. Die Rolle `admin` verliert daher die Berechtigung `time.punch` (Seed und Migration 26); wer auch immer die Berechtigung hat, erhält sie über die Rolle `employee` zurück (Berechtigungen ergeben sich aus der Vereinigung der Rollen). Die Rolle `manager` behält die Stempelberechtigung und Korrekturfunktion bei. Die Startseite erklärt dem Konto ohne Stempelberechtigung dessen Zweck.

**Auswirkung auf das Bearbeitungsfenster:** Es blieb eine Prüfung übrig, die niemand mehr erreichen konnte: `requireInsideEditWindow` hätte eigene Stempelungen außerhalb von `edit_window_days` abgelehnt - aber nach dieser Entscheidung kann nur noch derjenige mit `time.edit_other` seine eigenen Zeiten ändern, und für ihn wurde die Prüfung vorzeitig beendet. Sie wird daher entfernt (zusammen mit dem Problem `edit_window_closed`). Die Einstellung bleibt an genau einer Stelle erhalten und wirkt dort: in der **Offline-Warteschlange** - ein Stempeleintrag, der älter als `edit_window_days` ist, wird als Konflikt `too_old` gespeichert und nur dann gezählt, wenn die Administration ihn akzeptiert.

`GET /entries/conflicts` verwendet `?userId=`, sodass die Administration die Warteschlange eines Mitarbeiters einsehen kann.

**Nachweis:** `src/lib/db/repositories/dayNotes.test.ts`, die Berechtigungen in `src/lib/web/routes/corrections.test.ts` (Mitarbeiter: 403 für Zeiten, 200 für die eigene Notiz), `too_old` in `src/lib/services/sync.test.ts` und der Ablauf in `test/e2e/day-notes.spec.ts` (Notiz des Mitarbeiters, Korrektur und „Erledigt“ der Administration).

## D7 - Es bleibt immer ein aktiver Administrator (24.09.2026)
Ein Administrator kann sich die Administratorrechte entziehen. Dies geschieht auf zwei Wegen: durch **Deaktivierung** des eigenen Kontos (eine spezielle Regel verhindert dies bereits - `PATCH /users/:id` und `DELETE /users/:id` verweigern dies, da die laufende Sitzung sofort beendet würde) und durch **Entfernen der Rolle `admin` ** über den Rollendialog. Der zweite Weg ist ungeschützt: Wer als letzter aktiver Administrator die Rolle entzieht, kann anschließend nichts mehr verwalten - Mitarbeiter, Rollen, Terminals, Einstellungen und Backups hängen allein von dieser Rolle ab. Die Wiederherstellung ist nur durch einen Neustart der Instanz mit einer **freien** Rolle `adminLogin` möglich (`ensureAdministrator` erstellt nur dann einen Administrator, wenn kein **aktiver** vorhanden ist, und schlägt mit `LoginExistsError` fehl, wenn der konfigurierte Login bereits vergeben ist).

**Entscheidung:** Eine Änderung, die dazu führen würde, dass die Installation ohne aktiven Administrator zurückbleibt, wird abgelehnt - Problem `last_administrator`, Status 409. Die Regel prüft **beide** Felder zusammen (`isActive` und `roleKeys`), da eine Anfrage beide setzen kann und nur **aktive** Konten berücksichtigt werden: Ein deaktivierter Administrator nützt niemandem.

| Situation | Ergebnis |
| ---------------------------------------------------------------------- | ------------------------------------------------ |
| Der letzte aktive Administrator wurde deaktiviert | 409 `last_administrator` |
| Der letzte aktive Administrator verliert die Rolle / `roleKeys: []` | 409 `last_administrator` |
| eigenes Konto deaktivieren | 400 `ValidationError` (eigene Regel, unverändert) |
| eigenes Konto deaktivieren | 400 `ValidationError` (eigene Regel, unverändert) |

`DELETE /users/:id` deaktiviert ebenfalls Konten, erfordert jedoch `user.deactivate` - nur die Rolle `admin` beinhaltet diese Voraussetzung, sodass der Aufrufer selbst ein aktiver Administrator ist und das Ziel nie der letzte ist. Die Regel befindet sich daher nur in `PATCH`; ein Kommentar an dieser Stelle dokumentiert dies.

**Die Benutzeroberfläche warnt im Vorfeld:** Beim Deaktivieren des **eigenen** Kontos wird in einem Dialog erläutert, warum das Konto nicht deaktiviert werden kann, anstatt eine Anfrage zu senden, die abgelehnt würde. Für den zuletzt aktiven Administrator wird im Rollendialog angezeigt, dass die Rolle nicht entzogen werden kann, und die Schaltfläche „Speichern“ ist deaktiviert, solange das Häkchen fehlt. Für alle anderen eigenen Konten wird lediglich darauf hingewiesen, dass alle Administratorrechte sofort erlöschen. Die Servermeldung erscheint in allen elf Sprachen als `error.last_administrator`.

**Nachweis:** `src/lib/web/routes/users.test.ts` („hält den letzten aktiven Administrator an seinem Platz“: zweiter Administrator, Ablehnung für den letzten, Erfolg, sobald ein anderer die Rolle übernimmt), `test/e2e/users.spec.ts` (Warnung im eigenen Konto, Speichern deaktiviert, unveränderter Zustand).

## D8 - Der Kalender wird als Feed und als Status an ioBroker übermittelt (24.09.2026)
Der persönliche ICS-Link aus Version 0.5.0 (`POST /calendar/token` → `GET /calendar.ics?token=…`) ist für Mitarbeiter gedacht: Er zeigt **eine** Person an und wird in eine Kalender-App eingetragen. Für ioBroker fehlten beide: eine Ansicht des **gesamten Unternehmens** und eine Methode, die ohne Netzwerk, Token und Kopieren auskommt.

**Entscheidung:** Der Firmenkalender wird auf drei Arten angeboten, alle ohne Sitzung:

| Weg | Wie | Für wen |
| ---- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Datei | `<iobroker-data>/files/time-tracker.<n>/calendar.ics`, wird bei jeder Änderung und alle 5 Minuten neu geschrieben | der `ical`-Adapter als **lokale Datei** - keine URL, kein Token, kein Netzwerk - und ein Browser über den Dateiserver einer `web`-Instanz |
| Daten | `calendar.absences` (JSON) und `calendar.updatedAt` | Skripte, Blockly, VIS |
| Daten | `calendar.absences` (JSON) und `calendar.updatedAt` | Skripte, Blockly, VIS |

Die Datei befindet sich absichtlich in `files/` anstatt im benachbarten Instanzordner: Nur der Adapter kann diese Datei lesen, während eine `web`-Instanz `files/` als Download (`http://<host>:8081/files/time-tracker.0/calendar.ics`) bereitstellt. Der **Link** muss unterhalb des Präfixes `/api` stehen - andernfalls erhält der Browser die Weboberfläche mit dem Anmeldebereich anstelle des Kalenders (`companyFeedUrl` in `src/lib/services/calendar.ts` protokolliert dies; die Routine wird getestet).

(Nachtrag 25.09.2026: Der Weg über den Dateiserver erwies sich als nicht praktikabel - siehe **D11**. Nachtrag 27.09.2026: Seit Version 0.7.11 wird die Datei über die Datei-API des Adapters erstellt; seit Version 0.7.12 hängt sie an einem **Mountpunkt** und befindet sich unter `files/time-tracker.<n>/storage/calendar.ics` - warum der Instanz-Namespace selbst nicht der Mountpunkt sein kann, ist in **D11** beschrieben. Ob der Dateiserver die Datei anschließend ausliefert, wird mit **T28** geprüft - der Fall, der am 27.09.2026 mit Version 0.7.12 erfolgreich war: Das Protokoll ist fehlerfrei, der Ordner befindet sich im Dateimanager, der Download liefert eine fehlerfreie Datei, und der Dateiserver stellt sie unter dem Mountpunkt (`http://<host>:8081/files/time-tracker.0/storage/calendar.ics`) bereit. Nur der Pfad ohne `storage` bleibt ohne Datei.)

Das Instanztoken erscheint **nicht** von selbst: `commands.rotateCalendarToken` (ein boolescher Zustand wie `commands.backup`) erstellt es und ersetzt es bei jedem weiteren Aufruf - ein alter Link ist sofort ungültig. Das ist beabsichtigt: Der Link öffnet die Abwesenheitsübersicht **aller** Mitarbeiter, sodass nur derjenige darauf zugreifen kann, der ihn anfordert. `calendar.feedUrl` bleibt so lange leer, bis dies geschehen ist.

Die ICS-Konstruktion (`absenceEvents`, `calendarDocument`) wird in einen Dienst (`src/lib/services/calendar.ts`) ausgelagert, der von der Route **und** dem Adapter verwendet wird - zwei Versionen desselben Formats wären der nächste Fehler. Der Firmenkalender stellt den Namen des Mitarbeiters an erste Stelle (`Anna Muster: Vacation (F)`), damit ein Tag im Firmenkalender lesbar bleibt; `UID` bleibt `absence-<id>@time-tracker`, damit eine Kalender-App ein Ereignis **aktualisiert** und nicht dupliziert.

**Beweis:** `src/lib/services/calendar.test.ts` (DTEND exklusiv, Escaping, JSON-Ansicht), `src/lib/web/routes/absences.test.ts` (Firmenfeed über das Instanztoken, persönlicher Link bleibt persönlich, altes Token ungültig), `src/lib/adapter/states.test.ts` (Zustände und Befehl) und die Akzeptanz **T21** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D9 - Die Quellen der Web-App werden `src-www/` genannt (24.09.2026)
Der Repository-Checker liest die Quellen des Repositorys und überprüft importierte Pakete anhand des Stammverzeichnisses `package.json` (`W5042`). Es werden nur die Ordner einer **festen** Liste übersprungen (`excludedSourceDirs` in `lib/M5000_Code.js`): `/admin`, `/build`, `/docs`, `/test`, `/tools`, `/www`, `/widgets`, `/src-admin`, `/src-www`, `/src-vis`, `/src-widgets` und weitere.

`src-pwa/` war **nicht** enthalten, weshalb der PR für das LATEST-Repository fünf `W5042` (react, MUI, i18next, `@tanstack/react-query`, `react-i18next`) meldete und vor der Überprüfung eine Entscheidung forderte: Nur `dependencies` zählen - `@types/*` und `@iobroker/types` sind die einzige Ausnahme, die möglicherweise in `devDependencies` liegt.

**Entscheidung:** Die Quelldateien der Webanwendung befinden sich in ** `src-www/` ** (vor `src-pwa/`). Der Ordner ist in der Liste des Prüfers enthalten, passt namentlich zur Lieferung aus `www/`, und die Anwendungsabhängigkeiten verbleiben in `src-www/package.json`: Sie gehören nicht zur Installation eines Adapters, da zur Laufzeit nichts aus den Quelldateien geladen wird - `npm run build:pwa` legt das fertige Bundle in `www/` ab. Die andere Vorgehensweise (react, MUI und i18next in das Stammverzeichnis `package.json` zu verschieben) hätte jeder ioBroker-Installation einen zweiten Frontend-Stack bereitgestellt und wäre inhaltlich falsch gewesen. Funktional ändert die Konvertierung nichts: Der Adapter liefert weiterhin `www/`, alle Skripte und Workflows verweisen nur auf den neuen Pfad.

**Beweis:** `npm run check`, `npm run lint`, `npm run build`, `npm run build:pwa`, `npm run test:ts`, `npm run test:package`, `npm run check:adapter`, `npm run check:i18n` und `npm run version:check` sind grün; die Akzeptanz ist **T22** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D10 - Eine automatische Regel kann ein Gültigkeitsfenster haben (24.09.2026)
Eine Regel galt so lange, bis sie jemand deaktivierte. Für eine dauerhafte Regel ist das richtig - für eine Urlaubsvertretung, einen Saisonarbeiter oder ein Projekt hingegen nicht: Dort sollte die Regel von selbst beginnen und enden, ohne dass sich jemand daran erinnern muss.

**Entscheidung:** Jede Regel enthält zwei optionale Datumsfelder `active_from` und `active_until` (Migration 27). Beide sind **einfache Datumsangaben** (`YYYY-MM-DD`), bewusst ohne Uhrzeit: Die Regelzeit selbst ist bereits als Minute des lokalen Tages in der Regel enthalten, und ein Zeitfenster mit Uhrzeit hätte die Frage der Zeitzone aufgeworfen (die Regel gilt *pro Mitarbeiter* lokal). Verglichen wird daher das **lokale Kalenderdatum des Mitarbeiters** (`local.date` in `runAutomationRules`) - genau der Tag, mit dem die Wochentage und die Markierung in `automation_runs` arbeiten. Es muss nichts umgerechnet werden: „Gültig bis 15.10.“ bedeutet für jeden Mitarbeiter den 15. Oktober an seinem Standort, und ein Datumswechsel um Mitternacht führt nicht zu Problemen.

Beide Enden sind **inklusiv**; ein leeres Feld steht für die offene Seite - „gültig ab leer“ = ab sofort, „gültig bis leer“ = unbegrenzt. Der Auswahlwert „ab jetzt“ konnte nicht gespeichert werden: Er hätte beim Speichern in ein festes Datum umgewandelt werden müssen und wäre dann wie eine bewusst festgelegte Grenze ausgesehen. Die Benutzeroberfläche gibt die Bedeutung dennoch wieder: Die Felder enthalten „Leer = ab jetzt“ und „Leer = unbegrenzt“, und die Regelliste zeigt „gültig ab …“, „gültig bis …“ oder „gültig … - …“ für eine eingeschränkte Regel an.

Die Überprüfung des Zeitfensters erfolgt in `evaluateAutomation` (reine Funktion, direkt nach der Wochentagsprüfung). Die Entscheidung und ihre Begründung sind daher im Debug-Log protokolliert und können ohne Adapter getestet werden. Ein abgelaufenes Zeitfenster ist **kein** Fehler; das Speichern bleibt möglich, da sonst alte Regeln nicht mehr geändert werden könnten. Das Zeitfenster setzt die Markierung in `automation_runs` **nicht** zurück: Eine Regel wird weiterhin höchstens einmal pro Periode (Tag oder ISO-Woche) ausgelöst. Liegt die Regelzeit des ersten Tages vor „gültig ab“, wird dieser Tag übersprungen und nicht nachgeholt.

**Beweis:** `src/lib/adapter/automation.test.ts` (Tag vorher, genau „von“, genau „bis“, Tag nach, beide Enden leer), `src/lib/db/repositories/automations.test.ts` (speichern und lesen, „auslassen hält“, „leer löscht“, 30.02. wird abgelehnt, „bis vor von“ wird abgelehnt), `src/lib/web/routes/settings.test.ts` (die Daten reisen mit der Regel, 400 für ein ungültiges Datum) und die Annahme **T23** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md). Die Liste unterhalb der Tabelle wurde inzwischen **gestrichen** (zuletzt war sie auf fünf Einträge beschränkt): `GET /automation-rules/runs` liefert eine Zeile **pro Regel** (die neueste bis `latestRuns`), und die Regelzeile schreibt sie in eine eigene Zeile - siehe **D12** in diesem Dokument und **T25** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D12 - Die Regelübersicht zeigt den letzten Lauf pro Regel (26.09.2026)
**Anlass:** Die Liste „Letzte Ausführungen“ unterhalb der Regeltabelle war ein Protokoll ohne Bezug zu den Regeln: Sie zeigte die fünf neuesten Zeilen aller Regeln an, und eine Regel, die seit einer Woche nicht mehr ausgeführt worden war, erschien nicht mehr darin.

**Entscheidung:** Die Liste wird entfernt. `GET /automation-rules/runs` liefert **eine Zeile pro Regel** anstelle der neuesten Zeilen (der neueste Durchlauf; `latestRuns()` im Repository verwendet die SQLite-Regel, dass bei genau einem Aggregat (`MAX`) die anderen Spalten aus der übereinstimmenden Zeile stammen), und die Regelzeile wird in einer eigenen Zeile benannt (`Last run: … · employee`, andernfalls `never run`). Zusätzlich wird neben „Regeln speichern“ der Hinweis angezeigt, dass die Tabelle **als Ganzes** gespeichert wird - bis dahin ist eine Änderung nur in der Form vorgesehen.

**Übrigens:** Eine Regel, die an **allen sieben** Tagen gilt, schreibt denselben Text zweimal in ihre Zeile („einmal täglich“ aufgrund der Wochentage und der Wiederholung). Die Angabe zu den Wochentagen bleibt nun leer, wenn keine Einschränkung vorliegt - genau wie die Gültigkeitsangabe, die ebenfalls nur erscheint, wenn sie festgelegt ist.

**Beweis:** `src/lib/db/repositories/automations.test.ts` („meldet einen Durchlauf pro Regel - den neuesten“), `src/lib/web/routes/settings.test.ts` (die Antwort enthält eine Zeile pro Regel) und **T25** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D13 - Es handelt sich um eine Stornierungsanfrage, nicht um eine stille Buchung (26.09.2026)
**Anlass:** Genehmigte Abwesenheiten konnten weder vom Mitarbeiter geändert noch storniert werden; nur die Verwaltung konnte sie löschen, und die App bot dafür keine Möglichkeit. Fälle wie „Der Urlaub wird doch auf eine andere Woche verschoben“ mussten manuell bearbeitet werden.

**Entscheidung:** Die Löschung einer genehmigten Abwesenheit bleibt eine Entscheidung der Verwaltung. Der/Die Mitarbeiter/in **beantragt** die Löschung (`POST /absences/:id/cancellation`, Grund optional in `cancel_note`); die Abwesenheit **wird in der Zwischenzeit weitergezählt**, da `isApproved` ausschließlich von `approval` abhängt. Die Verwaltung antwortet mit dem bestehenden `DELETE /absences/:id` - also „Ja“, und die Löschung wird in `cancelRequested: true` im Prüfprotokoll vermerkt - oder mit `POST /absences/:id/cancellation/decline` („Nein“, Grund im Prüfprotokoll). Der/Die Mitarbeiter/in zieht einen **offenen** Antrag selbst zurück (`DELETE /absences/:id/cancellation`); er/sie kann seinen/ihren Eintrag trotzdem löschen. Wenn ein Mitarbeiter eine genehmigte Abwesenheit ändert, bleibt die bisherige Vorgehensweise bestehen: Es wird auf `requested` zurückgegriffen, und eine wartende Stornierung verfällt mit der alten Entscheidung (`setApproval` löscht sie).

Dieses Modell hat zwei Gründe: `approval` enthält einen `CHECK`-Wert aus Migration 21. Ein anderer Zustand (`cancelled`) hätte gemäß den SQLite-Regeln einen Tabellenneubau erzwungen - die Spalten `cancel_requested_at` und `cancel_note` (Migration 28) genügen und lassen `isApproved` unverändert. Zudem lässt sich eine Stornierung, die ohne Antwort verschwindet, im Audit nicht mehr von einem Datenfehler unterscheiden.

**Nachweis:** `src/lib/db/repositories/absences.test.ts` (die Anfrage wird fortlaufend gezählt, zurückgezogen und abgelehnt, die Prüfaktionen `absence.cancel_request`/`_withdraw`/`_decline` werden protokolliert, nur genehmigte Abwesenheiten können storniert werden, die Entscheidung löscht eine ausstehende Stornierung), `src/lib/web/routes/absences.test.ts` (Anfrage, Genehmigungen, Rückzug, Ablehnung, 400 für eine Abwesenheit, die noch nicht genehmigt ist) und die Annahme **T26** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D11 - Der Dateiserver kann nicht auf den Kalender zugreifen (25.09.2026)
Bei der erneuten Überprüfung von T21 stellte sich heraus, dass der in D8 und der README-Datei versprochene Download über eine `web`-Instanz **nicht** funktioniert: `http://<host>:8081/files/time-tracker.0/calendar.ics` liefert die Datei nicht, und der naheliegende Weg ohne Instanznummer (`…/files/time-tracker/calendar.ics`) liefert ein **leeres ZIP-Archiv** (22 Bytes, `PK\x05\x06`). Die Anfrage landet daher im öffentlichen Webbereich und nicht im Instanzordner; es wird also kein Kalender angezeigt.

**Entscheidung:** Der Dateipfad wird **nicht mehr** als Download angeboten. `calendar.feedFile` bleibt unverändert - der **absolute Pfad** der geschriebenen Datei, die der `ical`-Adapter als lokale Datei liest (im Test geprüft, funktioniert einwandfrei). Für Browser, Kalender-Apps und Skripte ist `calendar.feedUrl` der Pfad: die Verknüpfung des Adapters mit dem Instanztoken, die dieselbe, vollständige Datei liefert. Die README-Datei, der Testplan und der Eintrag in der Statustabelle bestätigen dies nun (dort wird `feedFile` explizit als *Pfad* bezeichnet).

Zwei Punkte bleiben offen und wurden bewusst nicht abgeschlossen:

- **Schreiben:** Die Datei wird bei jeder Änderung und alle fünf Minuten mit `writeFileSync` neu geschrieben - zuerst leer, dann geschrieben.

Ein Leser, der genau in diesem Moment liest, kann eine halbe Datei erfassen. Ein atomarer Schreibvorgang wäre robust (zuerst `calendar.ics.tmp`, dann `rename`); kein akutes Problem, da der `ical`-Adapter in Minutenintervallen liest.

- **Sichtbarkeit:** Alles unterhalb von `<iobroker-data>/files/…` ist über eine `Web`-Instanz **ohne Anmeldung** erreichbar.

Der Firmenkalender befindet sich daher in einem öffentlichen Ordner, obwohl die API ein Token erfordert. Wer dies nicht wünscht, kann die Datei zurück in den Instanzordner verschieben (`<iobroker-data>/time-tracker.<n>/`) - der Adapter `ical` liest sie trotzdem von dort.

**Beweis:** **T24** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) (der Link liefert die vollständige ICS-Datei, der `ical`-Adapter liest `calendar.feedFile`, README und Dokumentation nennen keinen Dateiserver-Link mehr) und der geänderte Abschnitt *Calendar for ioBroker* in der README.

**Nachtrag (26.09.2026, 0.7.10):** Ein Punkt blieb damals bestehen - der **Name des Status**. `calendar.feedFile` hieß „Kalenderdatei (.ics)“ und empfahl damit weiterhin eine herunterzuladende Datei, obwohl der Wert der **Pfad** für den Adapter `ical` ist (bei `(.ics)` bleibt der Dateityp in der Bezeichnung). Er heißt nun in allen elf Sprachen „Pfad der Kalenderdatei (.ics)“. `ensureObject` in `states.ts` führt `common` bei jedem Start zusammen, weshalb die Korrektur nicht nur neue, sondern auch bestehende Instanzen betrifft. `calendar.feedUrl` bleibt „Firmenabonnementlink“, und `calendar.absences` / `calendar.updatedAt` bleiben unverändert. **Nachweis:** Überprüfung des Namens in `src/lib/adapter/states.test.ts` (Deutsch und Englisch) und der Zeile der Statustabelle in der README-Datei.

**Nachtrag (27.09.2026, 0.7.11):** Der Grund für die leere ZIP-Datei lag in der **Art und Weise, wie die Datei erstellt wurde**. Sie wurde mit `fs.mkdirSync`/`fs.writeFileSync` erstellt - also **neben** der Datei-API des Adapters. Dem Dateimanager ist nur bekannt, was über die Datei-API erstellt wird (der Aufruf erstellt auch den Ordner); ein Ordner, der von `fs` erstellt wird, bleibt für ihn ein fremder Ordner. Die Datei wird daher an die Datei-API weitergeleitet: `publishCalendar` schreibt mit `writeFileAsync(<namespace>, "calendar.ics", …)`, der neue Baustein `src/lib/adapter/calendarFile.ts` speichert den Pfad, und `onReady` stellt mithilfe einer Hinweisdatei (`INFO.txt`) sicher, dass der Ordner bereits **vor** dem ersten Kalender existiert - eine neue Instanz hätte andernfalls bis zur ersten Abwesenheit einen leeren Ordner. Der absolute Pfad für `calendar.feedFile` bleibt unverändert; der Adapter `ical` liest weiterhin die lokale Datei.

Ob der Dateiserver-Link (`…/files/time-tracker.0/calendar.ics`) die Datei tatsächlich liefert, ist **noch nicht** bestätigt: **T28** prüft dies bei der eigentlichen Installation. Bis dahin bleibt der Link aus der README-Datei und der Dokumentation entfernt, und `calendar.feedUrl` ist der vorgesehene Weg für Browser, Kalender-Apps und Skripte. Der zweite offene Punkt - der **atomare Schreibvorgang** - bleibt offen: `writeFileAsync` schreibt ebenfalls zuerst leer und dann voll.

**Beweis:** `src/lib/adapter/calendarFile.test.ts` (die Hinweisdatei wird genau einmal erstellt, der Kalender landet unverändert wie in `calendar.ics`) und die beiden Stellen in `src/main.ts` (`onReady`, `publishCalendar`).

**Nachtrag (27.09.2026, 0.7.12):** Der Weg von 0.7.11 war **falsch ausgerichtet**, was durch die Abnahme aufgedeckt wurde. Im Protokoll der tatsächlichen Installation hieß es:

```
error Cannot write file INFO.txt: time-tracker.0 is not an object of type "meta"
warn  the folder 'files/time-tracker.0' could not be prepared: time-tracker.0 is not an object of type "meta"
error Cannot write file calendar.ics: time-tracker.0 is not an object of type "meta"
```

`writeFileAsync(<namespace>, …)` wird von der Objektdatenbank abgelehnt. Die ioBroker-Dokumentation im Entwicklerhandbuch (*Dateien speichern*) erklärt den Grund: Dateien werden **immer** an ein Objekt vom Typ `meta` - den **Mountpunkt** - gebunden, und das Schreiben erfolgt **darunter** (`writeFileAsync(mountPoint, "file", …)`). Der Instanz-Namespace ist kein Mountpunkt; er gehört zum Instanzobjekt `system.adapter.time-tracker.0`. Die Prüfung `validateMetaObject` in `objectsInRedisClient` schlägt nicht nur bei einem Objekt des falschen Typs fehl, sondern auch dann, wenn gar kein Objekt existiert - ein manuell im Dateimanager erstellter Ordner hätte denselben Namen.

**Entscheidung:** Die Datei hängt nun bei `<namespace>.storage` (`type: "meta"`, `common.type: "meta.folder"`), der Pfad ist `files/time-tracker.<n>/storage/calendar.ics`. Der Name ist `storage` und nicht `calendar`, da `calendar` im Objektbaum bereits der Kanal der Kalenderzustände (`calendar.feedUrl` und seine Geschwister) ist und ein Objekt nicht gleichzeitig Kanal und Mountpunkt sein kann. `meta.folder` statt `meta.user`: Der Adapter überschreibt die Datei bei jedem Start und jeder Änderung, daher gehört sie **nicht** in die Datensicherung. Der Mountpunkt wird zu Beginn erstellt (idempotent über `setObjectNotExists`, wie der Rest des Objektbaums) - absichtlich **nicht** über `instanceObjects` in `io-package.json`, da sein einsprachiger Name einen zweiten Speicherort für dieselben elf Texte eröffnet hätte. Die Hinweisdatei `INFO.txt` wird entfernt: Nicht mehr die Datei hält den Ordner offen, sondern das Objekt selbst. Der Kalender wird nun in einem eigenen Block `try` (`the calendar could not be written: …`) veröffentlicht - in Version 0.7.11 lief er im Statusblock mit, weshalb ein Dateifehler als `states could not be published` im Protokoll stand und die eigentliche Ursache verschleierte.

**Beweis:** `src/lib/adapter/calendarFile.test.ts` (die Datei hängt an einem Mountpunkt und **niemals** am Namensraum selbst, das Objekt wird genau einmal als `meta.folder` mit elf Sprachen erstellt, der absolute Pfad endet in `files/time-tracker.0/storage/calendar.ics`), `src/lib/adapter/states.test.ts` (jeder Objektname in elf Sprachen) und die beiden Stellen in `src/main.ts` (`onReady`, `publishCalendar`).

**Installationsnachweis (27.09.2026, T28):** Mit Version 0.7.12 ist das Protokoll fehlerfrei, der Dateimanager zeigt den Ordner `time-tracker.0` → `storage` mit dem Ordner `calendar.ics` an, und der Download liefert eine inhaltskorrekte Datei - der Fall ist abgeschlossen. Auch der **Dateiserver** liefert die Datei nun aus: Der direkte Link `http://<host>:8081/files/time-tracker.0/storage/calendar.ics` (also **unterhalb** des Mountpunkts) wurde geprüft, die heruntergeladene Datei war fehlerfrei. Der alte Pfad ohne `storage` (`…/files/time-tracker/calendar.ics`) bleibt bestehen - dort kommt weiterhin eine leere ZIP-Datei an. Das erklärt auch, warum der Link in der Dokumentation und in T21 0.7.7/0.7.8 verschwunden ist: Es war nicht der Dateiserver, der falsch war, sondern der Pfad.

## D14 - Der Feiertags-Tab wird mit dem Datumsfeld des Browsers (26.09.2026) angezeigt.
**Anlass:** Beim erneuten Überprüfen des Feiertags-Tabs in Version 0.7.8 blieb die Schaltfläche „Feiertag hinzufügen“ **ausgegraut**. Das Datumsfeld war ein Textfeld, und die Schaltfläche wurde nur aktiv, wenn der Wert exakt dem Format `YYYY-MM-DD` entsprach - ein eingegebenes `24.12.2026`, ein fehlendes `0` oder ein leerer Name reichten nicht aus, und das Format wurde lediglich durch eine Klammer in der Beschriftung definiert. Beim Schreiben des Browsertests trat ein weiterer Fehler auf: Ein eingegebener Tag **ohne Region** wurde der Region `DE` zugeordnet. Die Liste (`GET /holidays` ohne `region`) zeigte bis dahin nur `DE` an, aber die Auswertung berechnet mit dem **Feiertagsland der Instanz** (`holidayRegion()` im Aggregationsdienst) - eine Schweizer oder österreichische Instanz hätte daher ihren eigenen, manuell eingegebenen Feiertag weder gesehen noch gezählt.

**Entscheidung:**

1. Das Datum stammt aus dem Feld des Browsers (`type="date"`), wie überall in der App. Die Bezeichnung lautet lediglich „Datum“.

jetzt (11 Sprachen); der Formathinweis entfällt, da der Browser bei einem Datumsfeld das Format automatisch vorgibt.

2. Ein Feiertag **ohne Region** gehört zum Land der Instanz: `POST /holidays` füllt `holiday_country` aus

die Einstellungen, anstatt die Region offen zu lassen.

3. `listByYear(year)` **ohne** Region liefert alle Regionen des Jahres - der Tab zeigt die Region in jeder Zeile an, daher …

Die Beschränkung auf einen einzelnen Urlaubstag ist nicht zulässig (nach einem Wechsel des Urlaubslandes bleiben die alten Tage so sichtbar und löschbar). Bei einer Region erfolgt die Filterung wie bisher; die Auswertung erfolgt ohnehin mit der jeweiligen Region, `isHoliday` und `dateSet` bleiben unverändert.

4. Nach der Erstellung springt der Reiter zum „Jahr“ des eingegebenen Tages. Die Liste zeigt **ein** Jahr und dann den Tag des nächsten Jahres an.

wäre sofort verstaut und außer Sichtweite gebracht worden.

**Übrigens:** Das Fenster „Abwesenheit ändern“ ließ sich nicht mit „Abbrechen“ schließen. Es bleibt so lange geöffnet, wie eine neue Abwesenheit erfasst **oder** eine bestehende geändert wird, und die Schaltfläche hat nur den ersten Status gelöscht. Jetzt werden beide gelöscht (`closeForm`).

**Beweis:** `test/e2e/holidays.spec.ts` (neue Datei: Die Schaltfläche ist nur mit einem Datum **und** einem Namen aktiv, das Feld ist ein Datumsfeld, die Zeile enthält ihre Region, sie kann entfernt werden, auf das Jahr folgt ein Tag des nächsten Jahres), die erweiterte Prüfung in `src/lib/web/routes/settings.test.ts` (ein Tag ohne Region enthält das Land der Instanz), `src/lib/db/repositories/holidays.test.ts` („listet jede Region eines Jahres auf, wenn keine Region abgefragt wird“), die Änderungsbrücke in `test/e2e/absences-admin.spec.ts` und **T27** in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D15 - Das Startpasswort zählt auch nach dem ersten Start (01.10.2026)
**Anlass:** Die Instanzeinstellung „Startpasswort des ersten Administrators“ wirkte sich nur bei der **Erstellung** des Kontos aus. Wer das Feld erst nach dem ersten Start - also nach dem Durchlauf, bei dem das Konto mit dem generierten Passwort erstellt wurde - ausfüllte, erlebte genau das, was im Fehlerbericht beschrieben war: **Kein Passwort im Protokoll** (das Konto existierte bereits, daher wurde keines generiert) und **keine Anmeldung** mit dem eigenen Passwort (der Adapter hatte es noch nie gesehen). Die alte Version von `ensureAdministrator` wurde sofort beendet, sobald ein Administrator existierte - ohne Protokolleintrag und somit ohne Hinweis darauf, dass die Einstellung keine Wirkung hatte.

**Entscheidung:** Solange der erste Administrator das Startpasswort noch nicht geändert hat (er trägt `must_change_pw = 1`; die App fordert die Änderung beim ersten Login an), übernimmt der Adapter bei jedem Start das konfigurierte Passwort. Ziel ist das Konto mit dem konfigurierten Login, andernfalls der älteste Administrator. Nach der Änderung hat die Einstellung keine Auswirkung mehr - ein vergessenes Feld darf niemals ein vom Administrator in der App festgelegtes Passwort zurücksetzen. Jeder Start meldet genau eines von sechs Ergebnissen: `created` (mit einem generierten oder konfigurierten Passwort), `start_password_reset`, `start_password_unchanged`, `password_changed`, `existing`, `failed`. Der Fall „bereits geändert“ ist eine **Warnung**, da die Einstellung dann sichtbar wirkungslos ist - genau dieses Schweigen war der Fehler.

**Folgen**

Die Entscheidung kann in `src/lib/services/firstAdministrator.ts` getestet werden; `src/main.ts` meldet lediglich das Ergebnis (`switch`).

über die sechs Fälle). `src/lib/services/firstAdministrator.test.ts` behandelt dies: Erstellung mit einem konfigurierten und mit einem generierten Passwort (einschließlich der Richtlinie), Übernahme mit einem unveränderten Startpasswort, einem unveränderten Passwort ohne Audit-Eintrag, einem geänderten Passwort (Hash bleibt erhalten), einem bestehenden Administrator ohne konfiguriertes Passwort und einem Login, der übernommen wird (`failed`).

- Ein **belegter** Login bleibt ein Fehler; der Notausstieg aus D7 (Neustart mit einem freien `adminLogin`) bleibt unverändert gültig.

weil es nur funktioniert, wenn kein **aktiver** Administrator vorhanden ist.

- Die Übernahme schreibt einen Audit-Eintrag (`user.update`, `passwordChanged`, Grund „Passwort von der Instanz starten“).

Einstellungen“) - damit sie nachvollziehbar sind.

- `README.md` („Erste Schritte“), [`getting-started.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/getting-started.md) (Schritt 3.4) und [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md) (Test

Daten und das Logbeispiel des Entwicklungsservers) benennen Sie die vier Logzeilen.

## D16 - Die Instanzleitung führt in die App (`common.localLinks`) (01.10.2026)
**Anlass:** Wer in der Administration nach der App sucht, findet dort nur die **Instanz**: Das Symbol einer Zeile in der Liste **Instanzen** öffnet die Einstellungen, nicht die Benutzeroberfläche. Host und Port befinden sich in den Instanzeinstellungen (Standard: 8092) und mussten bisher manuell eingegeben werden - auf dem Smartphone die häufigste Hürde beim Start. Adapter mit eigener Benutzeroberfläche hingegen melden der Administration schon lange `common.localLinks`; die Administration stellt daraus ein Symbol in der Instanzzeile (und in der Übersicht) dar, das direkt dorthin führt.

**Entscheidung:** Der Adapter kündigt `common.localLinks._default` mit `%protocol%://%ip%:%port%/` an - **keine** feste Adresse, sondern die Platzhalter der Administrationsoberfläche: `%protocol%`/`%ip%` werden aus der Bindungsadresse und `%port%` aus dem Instanzport zusammengesetzt.

Dadurch bleibt die Verbindung auch nach einem Portwechsel erhalten. Der Eintrag enthält einen Namen in **elf** Sprachen und `order: 5` (der Name erscheint direkt in der Benutzeroberfläche, daher keine feste Sprache). Bewusst **ohne** eigene `icon`/`color`: Die Administrationsoberfläche zeigt dann ihr Standardsymbol für eine Adapterschnittstelle an - eine Bilddatei, die im npm-Paket enthalten sein müsste, wäre eine zusätzliche Fehlerquelle ohne Mehrwert. `intro` bleibt nicht gesetzt (Standardwert: `true`), daher bleibt der Link auch auf der Übersichtsseite bestehen.

**Folgen**

- Der Link folgt der **Bind-Adresse**: Bei `127.0.0.1` (Standard) führt er zur ioBroker-Maschine selbst, bei `0.0.0.0`

Die Adresse, die der Browser verwendet hat, um den Administrator zu erreichen, wird verwendet. Jeder, der sich im LAN anmeldet, hat `0.0.0.0` gesetzt - dann funktioniert derselbe Link sowohl vom Smartphone als auch vom PC. Mit einem vorgeschalteten Reverse-Proxy ersetzt eine Proxy-Regel für `time-tracker.0` den Link durch seinen Pfad (dies wird vom Administrator selbst konfiguriert).

- `/` ist die Anmeldeseite, solange keine Sitzung besteht: Der Link öffnet genau die Anmeldeseite, nicht die Einstellungen.
- `README.md` (Installationsschritt 2), [`getting-started.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/getting-started.md) (Schritte 3 und 4) und

[`technical.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/technical.md) (HTTP-Oberfläche) Benennen Sie den Link.

- `tools/check-i18n.ps1` prüft die Sprachschlüssel von `common.titleLang`, `common.desc`, `common.news` - **und jetzt auch**

`common.localLinks.<key>.name`: Der Name wird wortwörtlich angezeigt; ein fehlender Schlüssel würde sonst erst im Betrieb auffallen. Alle anderen Prüfungen bleiben unverändert (der Adapterprüfer kennt `localLinks` schon lange).

**Beweis:** der Eintrag `_default` in `io-package.json`, die Nachricht von `npm run check:i18n` und die Instanzzeile im Adminbereich, die das Symbol „Zeiterfassungs-App öffnen“ enthält.

## D17 - HTTPS im Adapter selbst, mit den Zertifikaten von ioBroker (01.10.2026)
**Anlass:** Die App auf dem Smartphone benötigt HTTPS (Service Worker, Installation). Bisher war dies nur über einen Reverse-Proxy möglich (`trustProxy`). Der `web`-Adapter von ioBroker kann hier **nicht** helfen: Er leitet keinen fremden Port weiter, sondern stellt lediglich Adapter bereit, die sich als Web-Erweiterung einbinden - die Zeiterfassung nutzt einen eigenen Server (`http.createServer`). Betrieb: Lokale Installation ohne Internetzugang.

**Entscheidung:** Der Server kann selbst HTTPS verwenden (`https.createServer`). Neue Instanzeinstellungen: `secure` (Schalter) und die **Namen** `certPublic`, `certPrivate`, `certChained` aus der Zertifikatssammlung von ioBroker (`getCertificatesAsync`, im Format vom Typ `certificate`). Es gibt keine eigene Zertifikatsverwaltung und keine Dateipfade. Der Schlüssel heißt absichtlich `secure`: Der Administrator leitet den Platzhalter `%protocol%` des Links in der Instanzliste (`common.localLinks`) davon ab, sodass der Link ohne Weiteres zu `https://…` wird. Ein reiner Transportwechsel: Routen, Berechtigungen, CSRF und Beschränkungen bleiben unberührt.

**Folgen**

- Der Session-Cookie enthält das `Secure`-Attribut, ohne dass ein Proxy-Header (`secureTransport` im Router) erforderlich ist. `trustProxy`

bleibt auch beim Betrieb hinter einem Proxy unverändert.

- Der Kalenderlink (`calendar.feedUrl`) und der Badge-Link folgen dem Schema (`https`).
- **Kein stiller Fallback auf HTTP:** Wenn das Zertifikat fehlt oder nicht gelesen werden kann, startet der Webserver nicht, und das Protokoll wird entsprechend aktualisiert.

Der Grund wird angegeben - beispielsweise ein belegter Port. Eine Ausweichlösung würde eine unverschlüsselte Anmeldung ermöglichen, was der Betreiber mit dem Schalter genau verhindern wollte.

- Für den Browser genügt ein selbstsigniertes Zertifikat (`defaultPublic`/`defaultPrivate`), das eine einmalige Warnung ausgibt; für den

**Installation der App auf dem Telefon:** Das Telefon muss dem Zertifikat vertrauen (installieren Sie das Zertifikat dort oder verwenden Sie ein Zertifikat einer anerkannten Zertifizierungsstelle). Auf dem Computer mit `localhost` ist HTTP auch ohne HTTPS eine sichere Verbindung.

- Ein Zertifikatswechsel wird nach einem Neustart der Instanz wirksam.

**Nachweis:** `src/lib/web/server.tls.test.ts` (eine echte HTTPS-Verbindung mit einem Testzertifikat, `Secure` Cookie, Ablehnung eines Clients ohne Vertrauen, fehlerhaftes Zertifikat), Router- und Kalendertest; Akzeptanz auf einer realen Instanz: Testfall T29 in [`test-plan.md`](/#/docs/adapterref/iobroker.time-tracker/docs/en/test-plan.md).

## D18 - Eine Regel kann bei jedem Schreibvorgang ausgelöst werden, und eine Wertzuordnung benennt den Mitarbeiter (07.10.2026)
**Anlass:** Überprüfung des Adapters anhand des Adapters `ioBroker.fingerprint` (Punkte A1/A2 der internen Codeüberprüfung): Eine Regel, die nur ausgelöst wird, wenn sich der **Wert** des Status ändert. Der Fingerabdruckadapter schreibt bei jeder Übereinstimmung denselben Namen (`lastMatch.name`) und belässt `lastMatch.matched` bei `true` - wer morgens und abends alleine gescannt hat, wurde abends **nicht** ausgestempelt. Und `lastMatch.id` ist die **Slotnummer** des Fingers (1-200), keine Mitarbeiter-ID; der Modus „Wert ist der Mitarbeiter“ liest Zahlen jedoch zuerst als Mitarbeiter-ID.

**Entscheidung:** (1) Eine neue Regeleigenschaft `fireOnRepeat` („Bei jedem Schreibvorgang auslösen“): Standardmäßig **ein** für Modus `user`, **aus** für einen festen Wert; Migration 29 aktiviert sie für bestehende Regeln des Modus `user`. Die Abklingzeit und der Schutz vor Doppeleingaben (30 Sekunden) bleiben unverändert und erfassen Geräte mit hoher Datenübertragungsrate. (2) Eine neue Regeleigenschaft `valueMap` (Wert → Mitarbeiter, JSON in `value_map`). Wenn eine Regel eine Zuordnung enthält, wird nur ein Wert aus dieser Zuordnung ausgelöst; alle anderen Werte werden nicht ausgelöst - auch nicht, wenn die Zahl zufällig eine Mitarbeiter-ID ist. Ohne Zuordnung bleibt das bisherige Verhalten erhalten (ID, Login oder angezeigter Name).

**Absichtlich nicht umgesetzt:** Die Auflösung „Nummer = Mitarbeiter-ID“ bleibt ohne Zuordnung, sodass Skripte, die eine ID schreiben, weiterhin ausgeführt werden; das Formular und die README-Datei benennen die Falle.

**Verwandt (B1/B2 desselben Berichts):** Der Transport liest den Nachrichtentext innerhalb des Limits der **Route** und erst nach Überprüfung der Sitzung, falls die Route ein höheres Limit aufweist (Wiederherstellung eines Backups). Nachrichtentexte, die das Limit überschreiten, werden ohne Lektüre zurückgewiesen. Eingaben, die ohne Anmeldung gesendet werden können, sind längenbeschränkt; Anmeldename und User-Agent werden gekürzt gespeichert; die Protokolleinträge fehlgeschlagener und gesperrter Anmeldungen werden nach 90 Tagen gelöscht (alle anderen bleiben erhalten).

**Beweis:** `src/lib/adapter/triggers.test.ts`, `src/lib/db/repositories/triggers.test.ts`, `src/lib/web/server.test.ts`, `src/lib/services/auth.test.ts`, Browsertest `test/e2e/triggers.spec.ts`.

### Nachtrag D18 (07.10.2026): A3, B3, B4, B5, C1 derselben Rezension
- **B3 - Ursprung des Livestreams:** Ein Browser-Handshake mit einem Cookie wird abgelehnt (403 `origin_not_allowed`), wenn der `Ursprung`

Es handelt sich nicht um den `Host` der Anfrage (hinter einem vertrauenswürdigen Proxy zählt auch `x-forwarded-host`). Ein Token in der URL und Clients ohne `Origin` (Integrationen) sind nicht betroffen. Grund: `SameSite=Lax` trennt Seiten verschiedener *Websites*, nicht Dienste desselben Hosts auf einem anderen Port.

- **B4 - Sicherheitsheader der Webanwendung:** `Content-Security-Policy` (eigene Skripte, kein Inline-Skript,

`frame-ancestors 'none'` (Inline-Styles erlaubt, da die Komponentenbibliothek sie zur Laufzeit schreibt), `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`; mit eigenem TLS zusätzlich `Strict-Transport-Security` (180 Tage, ohne `includeSubDomains`). Hinter einem Proxy sendet der Proxy den HSTS-Header.

- **B5 - Anmeldesperre:** Die Zählung erfolgt pro **Name und Adresse** (Limit wie zuvor) und pro Name über **alle** Adressen (fünf

(mal so viele). Wer den Namen des Administrators eingibt, sperrt nur seine eigene Adresse; wer ihn aus mehreren Adressen errät, sperrt das Konto. Ein unbekannter Name wird anhand eines Köder-Hashs mit denselben Kosten berechnet, sodass die Antwortzeit ihn nicht verrät. **Unverändert:** `scryptSync` blockiert den Prozess für etwa 50 ms pro Versuch; das Limit pro Adresse (20 Versuche pro Minute) hält diese Blockade gering.

- **A3 - Rückmeldung an das Gerät:** Der Adapter kommuniziert nicht mit dem Lesegerät; jeder Strich einer Linie wird sofort erfasst.

`events.*` (`lastUser`, `lastDirection`, `lastSource`). Die README-Datei beschreibt dies anhand eines Beispielskripts und erläutert, welche Einträge im Protokoll für einen Scan ohne Eingabe eines Stempels stehen.

- **C1 - README-Beispiel:** `fingerprint.0.lastMatch` existiert nicht; die README-Datei benennt `lastMatch.name`, `lastMatch.id` (mit

eine Wertezuordnung) und der Grund, warum `lastMatch.matched` nicht passt.

## D19 - Die Dokumentation ist auf Englisch, die deutschen Originale befinden sich in `docs/de/` (09.10.2026)
**Anlass:** Im Rahmen der Überprüfung des Repositorys (PR #6702 von `ioBroker.repositories`) wird um die Dokumentation in englischer Sprache gebeten, weitere Sprachen sind willkommen: Die Entwicklerdokumente unter `docs/` waren bisher nur in deutscher Sprache verfügbar.

**Entscheidung:** Alle Dokumente von `docs/` liegen in englischer Sprache in `docs/en/` vor; die deutschen Originale wurden nach `docs/de/` verschoben (sie bleiben unverändert, inklusive des bisherigen Annahmeprotokolls). `CONTRIBUTING.md` im Stammverzeichnis ist englischsprachig, das zugehörige deutsche Original befindet sich in `docs/de/CONTRIBUTING.md`. Die README-Datei bleibt englischsprachig und nennt beide Ordner in ihrer Dokumentationstabelle.
Tools und Tests, die ein Dokument benennen, verweisen auf die englische Datei.

## D20 - Alles, was ein Benutzer sieht, ist Englisch oder entspricht einer Spracheinstellung (11.10.2026)
**Anlass:** Bei der zweiten Überprüfung von PR #6702 (Checkliste V3.5) wurden vier Dinge festgestellt: Deutsche Texte, die noch im Code vorhanden waren, und vier Admin-Texte, die mit dem englischen Text identisch waren.

**Entscheidung:**

1. **Die vorgegebenen Abwesenheitsarten sind englischsprachig** (`Urlaub`, `Krankheit`, `Unfall`, `Militärdienst`, `Intern`,

`Further training`, `External`). Sie werden in der Datenbank gespeichert und können in der Administration umbenannt werden; eine bestehende Installation behält die vorhandenen Namen bei (der Seed wird nie überschrieben).

2. **Der Kalendername** (`X-WR-CALNAME`) folgt einer Sprache: der persönliche Kalender der Sprache des Mitarbeiters (`locale` von

Das Konto), der Firmenkalender und die schriftliche Datei in der Sprache der Instanz (`default_language`). Die Namen existieren in allen elf Sprachen (`src/lib/services/calendar.ts`), Englisch dient als Fallback. Die Abwesenheitstypbezeichnungen in den Ereignissen stammen aus der Datenbank und entsprechen daher den von der Administration vergebenen Namen.

3. **Die Standardsprache einer neuen Instanz ist Englisch.** (`native.defaultLanguage`, Einstellung `default_language`).

Die bestehende Instanz behält ihre Konfiguration bei.

4. ** `index.html` und das Manifest sind auf Englisch** (`lang="en"`, Titel, Beschreibung, App-Name); sobald die App ihren Namen kennt

Sprache, der Tab-Titel und das Attribut `lang` folgen darauf (`src-www/src/i18n/index.ts`).

5. **Ein neues Konto spricht die Sprache der Instanz.** Das vom Administrator erstellte Konto erhält die Einstellung

`default_language` entspricht `locale` (zuvor galt der Datenbankstandard `de-DE`, sodass neue Administratoren überall Deutsch sahen: Benutzeroberfläche, Berichte, Kalendernamen); der erste Administrator erhält `native.defaultLanguage`, und ohne Sprachangabe ist ein Konto auf Englisch. Bestehende Konten behalten ihre Sprache.

6. **Kein übersetzter Text entspricht dem englischen Wortlaut**, auch nicht dann, wenn das Wort in der Sprache gültig ist (`Terminal`,

`Menu`, `PDF`, `Date`, …): Die Prüfliste V3.5 meldet jeden dieser Werte als nicht übersetzt. Die Webanwendung, die Berichtsbezeichnungen, die Objektnamen und die Administratortexte wurden entsprechend angepasst. `src/lib/translations.test.ts` schlägt fehl, wenn eine Sprache einen Text enthält, der dem englischen Text entspricht (die Liste der zulässigen Sprachen für `tools/check-i18n.ps1` ist leer).

7. `Port` (de, fr, pl) und `General` (es) in `admin/i18n/` werden übersetzt, obwohl sie in diesen Sprachen gültige Wörter sind.

Sprachen: Der Prüfer vergleicht die Werte mit dem englischen Text.

**Nachweis:** `src/lib/services/calendar.test.ts` (Namen in allen elf Sprachen, Fallback, `zh`), Kalenderfeed-Tests in `src/lib/web/routes/absences.test.ts` (Feeds), `src/lib/web/routes/users.test.ts` (Sprache eines neuen Kontos), `src/lib/db/repositories/absences.test.ts` (vordefinierte Namen), `src/lib/services/firstAdministrator.test.ts` (Sprache des ersten Administrators), `test/e2e/absence-types.spec.ts`.
Überprüft ohne Befund: Protokollzeilen, Statusnamen und Rollen (11 Sprachen), Berichtsbezeichnungen (11 Sprachen, in der Sprache des Mitarbeiters), Namen von Feiertagen (Englisch mit Legende), alle Texte der Web-App (nur bis `i18next`).

## D21 - Jedes Backup wird per SFTP auf einen externen Server kopiert (13.10.2026)
**Anlass:** Ein Backup der Datenbank ging auf dem Host verloren. Über den Tab „Migration und Backup“ der Instanzeinstellungen konnte keine Kopie vom Hostsystem erstellt werden. Der zugehörige Adapter `e-invoices` hatte dieses Problem am Vortag gelöst; das gleiche Design wird hier verwendet.

**Entscheidung:**

1. **SFTP mit `ssh2` ** (reines JavaScript, keine Systemtools, kein Mounten, kein `sudo`). Die Datei wird als `<name>.part` hochgeladen.

Die Größe wird verglichen und erst dann umbenannt, sodass eine halbe Datei niemals wie ein Backup aussieht (`src/lib/services/remoteBackup.ts`, der eigentliche Zusammenhang in `sftpSsh2.ts`).

2. **Ein Hook für jeden Weg zur Datensicherung.** `BackupDeps.onCreated` wird nach jeder Datensicherung ausgeführt (app, `commands.backup`, `sendTo`,

Tagesablauf); ein fehlerhafter Hook führt niemals zu einem Fehler in einer korrekten lokalen Sicherung. Der Adapter kopiert von dort.

3. **Der Host-Schlüssel kann fixiert werden** (`SHA256:…`): Ein anderer Fingerabdruck wird abgelehnt, bevor das Passwort gesendet wird. Leer bedeutet

nicht verifiziert; im Protokoll und auf der Testschaltfläche wird der Fingerabdruck zum Eingeben angezeigt.

4. **Das Löschen auf dem Server ist eingeschränkt.** Nur Dateien mit dem Namen `time-tracker-<time>.sqlite` (die älteste Datei außerhalb der _zu behaltenden Kopien_)

Die Einträge `0` = alle) und `….sqlite.part` werden gelöscht. Andere Namen (auch `time-tracker-prerestore-…`) bleiben unverändert.

5. **Ein fehlgeschlagener Kopiervorgang ist sichtbar und harmlos**: Er wird protokolliert und in das Audit-Log geschrieben (`backup.remote_copy`,

`backup.remote_copy_failed`) und in `info.remoteBackupError` dargestellt; `info.lastRemoteBackup` enthält die letzte funktionierende Datei. Die Kopien werden nacheinander ausgeführt und sind zeitlich begrenzt.

6. **Das Passwort lautet `encryptedNative` und `protectedNative`.** Der Verbindungstest verwendet die Werte des nicht gespeicherten Formulars und

Das gespeicherte Passwort wird nur für denselben Server, Benutzer und Port verwendet, daher kann die Schaltfläche nicht dazu benutzt werden, das gespeicherte Passwort an einen anderen Server zu senden.

**Nachweis:** `src/lib/services/remoteBackup.test.ts` (Kopie, Größenprüfung, Aufbewahrung, Restbestände, Zeitlimit, Testeinstellungen), `src/lib/services/sftpSsh2.test.ts` (gegen einen echten SFTP-Server während des Prozesses, Fingerabdruck), der Hook-Test in `src/lib/services/backup.test.ts`.

## D22 - Anfragetexte werden mit zod geprüft (18.10.2026)
**Anlass:** Jede Route las ihren Inhalt mit kleinen, handgeschriebenen Lesegeräten (`requireString`, `optionalNumber`, …) und überprüfte den Rest manuell. Das funktionierte, aber eine Route zeigte nicht auf einen Blick, welche Datentypen sie akzeptiert, und brach beim ersten ungültigen Feld ab.

**Entscheidung:**

1. **zod 4** prüft den Inhalt jeder Route an der Grenze. Eine Route deklariert ihren Inhalt als Objekt von Feldregeln.

(`bodySchema({ login: requiredText(128), … })` in `src/lib/web/routes/validate.ts`) und liest die typisierten Werte mit `parseBody`.

2. **Die Meldungen bleiben unverändert.** Jede Regel formuliert ihre Meldung so, wie sie den Reader ersetzt hat (`Anmeldung erforderlich`,

`direction must be in, out or auto (got x)`, …), sodass die Webanwendung und die Clients keine Änderung feststellen. Ein Test fixiert den Wortlaut.

3. **Jedes ungültige Feld wird in `errors[]` gemeldet (RFC 9457); die Fehlermeldung befindet sich im ersten Feld.
4. **Die Bedeutung eines fehlenden Feldes bleibt eindeutig:** Ein optionales Feld wird zu `null`, ein Feld einer Änderung, das nicht gesendet wird.

Bei `undefined` (`keepMissing` behält der Datensatz seinen Wert), eine Zahl in einem Text wird weiterhin an ihrer vorherigen Position verwendet (`employeeRef`, `year`). zod lehnt einen fehlenden Schlüssel für bestimmte Schemaarten ab; jede Regel wird mit einem fehlenden Feld getestet.

5. **Prüfen, die den Datenbankzugriff im Ablauf erfordern** (Existiert der Mitarbeiter? Darf der Anrufer die Aufgabe erledigen?). Zwei Stellen speichern die Datenbankzugriffe.

ihre eigene Lesart absichtlich: `PUT /settings` ist ein freier Schlüssel/Wert-Speicher mit einer Regel pro Schlüssel, und die Terminal-Session wird aus dem Body oder der Abfrage entnommen.

6. zod ist an eine Version gebunden, die älter ist als die Dependabot-Abklingzeit (7 Tage), wenn es hinzugefügt wird.

**Beweis:** `src/lib/web/routes/validate.test.ts` (Nachrichten, alle ungültigen Felder, fehlende Felder, verschachtelte Pfade) und die API-Tests in `src/lib/web/routes/*.test.ts`, die unverändert ausgeführt werden.