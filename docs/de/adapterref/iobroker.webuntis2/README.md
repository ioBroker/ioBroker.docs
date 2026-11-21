---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.webuntis2/README.md
title: ioBroker.webuntis2
hash: If/cbYXQqAgAUweDyF8zPV7569PAk4gSXe5LnlUxJCg=
---
![WebUnits2](../../../en/adapterref/iobroker.webuntis2/docs/webuntis2-readme-banner.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.webuntis2.svg)

# ioBroker.webuntis2

WebUntis2 verbindet ioBroker mit WebUntis. Es ruft Stundenpläne für ein Schüler- oder Familienkonto ab und stellt sie in ioBroker für Visualisierungen, Benachrichtigungen und Automatisierungen zur Verfügung.

## Was der Adapter bietet

- Schulsuche nach Schulnamen, Stadt oder Adresse
- Einfache Schulauswahl bei der Einrichtung
- Sichere Konfiguration von Benutzername und Passwort
- Ein Verbindungstest vor dem Speichern
- Stundenpläne für heute, morgen und die laufende Woche
- Unterrichtsdetails wie Fach, Lehrer, Raum, Klasse, Zeit und Status, mit verfügbaren Langnamen in weiteren Bundesstaaten
- Informationen zu Änderungen, Ersatzstunden und ausgefallenen Unterrichtsstunden
- Tageszusammenfassungen mit Unterrichtsstunden, Schulzeiten, Fächern und Änderungen
- Informationen zur aktuellen und nächsten Unterrichtsstunde, einschließlich der verbleibenden Zeit
- Aktuelle und kommende Schulferien
- Anstehende Prüfungen, einschließlich Fach, Datum sowie Start- und Endzeit
- Hausaufgaben für zuverlässig identifizierte Schüler, mit Abgabeterminen, Bearbeitungsstatus und Anhängen
- Fehlzeiten und Entschuldigungsstatus der Studierenden, einschließlich unbekannter Statuswerte
- Nachrichten des Tages, einschließlich Betreff, Text und Hinweise auf Anhänge
- Stundenpläne, Feiertage, E-Mails, Nachrichten des Tages, Hausaufgaben, Abwesenheiten und Prüfungen werden standardmäßig alle fünf Minuten aktualisiert; das Intervall kann im Admin-Bereich konfiguriert werden.
- Die Werte für die aktuelle und die nächste Lektion werden standardmäßig jede Minute aktualisiert; das Intervall kann im Adminbereich konfiguriert werden.

## Installation und Einrichtung

1. Installieren Sie **WebUntis2** aus der ioBroker-Adapterliste.
2. Erstellen Sie ein neues `webuntis2` Beispiel.
3. Suchen Sie nach Ihrer Schule, indem Sie einen Teil ihres Namens oder eine Stadt eingeben.
4. Wählen Sie die passende Schule aus den Ergebnissen aus.
5. Geben Sie den WebUnits-Benutzernamen und das Passwort ein.
6. Verwenden Sie **„Verbindung testen“** und speichern Sie die Einstellungen.

Der Adapter speichert die ausgewählte Schule zusammen mit den für die Verbindung erforderlichen Informationen. Eine manuelle Eingabe der Serveradresse ist nicht nötig, da diese von der Schulsuche bereitgestellt wird.

## Administrator-Konfigurationsschnittstelle

Der Adapter verwendet eine React-basierte Admin-Oberfläche, da die Einrichtung zwei interaktive Vorgänge umfasst: die Suche nach WebUnitis-Schulen anhand einer vom Benutzer eingegebenen Suchanfrage und die Anzeige der zurückgegebenen Schulen zur Auswahl sowie die Überprüfung der eingegebenen Anmeldedaten anhand der ausgewählten Schule vor dem Speichern. Beide Vorgänge rufen den Adapter asynchron auf und müssen Lade-, Ergebnis- und Fehlerzustände im selben Formular anzeigen. `jsonConfig` Die Steuerelemente allein bieten diesen vollständigen Abfrage- und Ergebnis-Workflow nicht; um ihn dort nachzubilden, wäre eine benutzerdefinierte Komponente oder entsprechender benutzerdefinierter UI-Code erforderlich. React hält diese Setup-Interaktionen zusammen, während der Adapter weiterhin für WebUnit-Anfragen und die Validierung zuständig ist.

Die Admin-Konfiguration bietet außerdem `timetableRefreshIntervalMinutes` für den vollständigen Fahrplan und die Datenaktualisierung, und `currentNextRefreshIntervalMinutes` Für den Status der aktuellen/nächsten Unterrichtsstunde. Beide akzeptieren ganze Minuten; die vollständige Aktualisierung ist auf 5–8.640 Minuten (6 Tage) begrenzt, und Aktualisierungen der aktuellen/nächsten Unterrichtsstunde haben ein Minimum von 1 Minute. Die Standardwerte sind 5 bzw. 1 Minute. Fehlende Legacy-Einstellungen und ungültige oder außerhalb des zulässigen Bereichs liegende Werte werden sicher auf die Standardwerte zurückgesetzt. Wenn kein erfolgreicher Stundenplan-Snapshot vorhanden ist, wird die vollständige Aktualisierung nach fünf Minuten unabhängig vom konfigurierten Intervall wiederholt. Wenn eine Stundenplanaktualisierung nach dem teilweisen Schreiben von Gruppen fehlschlägt, versucht der Adapter umgehend, die Daten wiederherzustellen. `today` und Aktueller/Nächster Snapshot aus dem gespeicherten erfolgreichen Snapshot ohne weitere WebUnits-Anfrage. Automatische Aktualisierungen des aktuellen/nächsten Snapshots folgen ihrem konfigurierten Intervall, auch wenn vollständige Aktualisierungen häufiger erfolgen; Start und `info.refresh` Aktualisieren Sie sie umgehend und starten Sie ihren Timer neu. Die Berechnungen für „Aktuelles/Nächstes“ wählen das aktuelle Datum aus dem zwischengespeicherten Wochenplan aus. An jedem lokalen Datumsübergang aktualisiert der Adapter außerdem die `today` Datum, Lektionen und Zusammenfassung werden aus dem Cache abgerufen und die aktuelle/nächste Lektion sofort neu berechnet, selbst wenn das konfigurierte Intervall länger als ein Tag ist; hierfür ist keine zusätzliche WebUnits-Anfrage erforderlich. Die maximale Aktualisierungsdauer von sechs Tagen sorgt dafür, dass das Datum zwischen den vollständigen Aktualisierungen innerhalb der geladenen rollierenden Woche bleibt.

## Daten in ioBroker

Der Instanzbaum hat vier Kanäle der obersten Ebene: `students`, `holidays`, `inbox`, Und `info` Der Adapter liest den Kontotyp automatisch von WebUnits und meldet ihn in der `info.accountType` als `Student`, `Parent`, oder `Other` Die

Jeder Schüler hat unten einen Kanal. `students.<name>` Die Kanal-ID basiert auf dem Namen des Studierenden, normalisiert für ioBroker-IDs; doppelte normalisierte Namen werden mit der WebUntis-Studierenden-ID abgeglichen. Falls WebUntis keinen Studierendennamen angibt, wird die ID als Fallback verwendet. Stundenpläne sind verfügbar unter \[Link einfügen]. `students.<name>.timetable.today`, `students.<name>.timetable.tomorrow`, Und `students.<name>.timetable.week` Jede Lektion enthält lesbare Angaben zu Fach, Lehrer, Raum, Klasse, Start- und Endzeit sowie zum Lektionsstatus. `startTime` Und `endTime` sind Zeichenketten mit dem `time` Rolle.

Die Tagesübersichten zeigen an, ob Schule stattfindet, wie viele und wie lange die Unterrichtsstunden dauern, wann die erste und letzte Stunde beginnt, welche Fächer in der Reihenfolge des Stundenplans angeboten werden und ob es Änderungen oder Ausfälle gibt. Jeder Tageskanal enthält außerdem …`lessonComparison` JSON-Array mit der Unterrichtsnummer, dem ursprünglichen und dem tatsächlichen Fach, dem Lehrer, dem Raum und dem Status. Die Unterrichtsnummer entspricht der Position in der Tagesliste. Ursprüngliche und tatsächliche Start- und Endzeiten sind derzeit identisch. `info` Dieser Abschnitt enthält Informationen zum Verbindungsstatus, zum Kontotyp und zu Aktualisierungen. Informationen zu Feiertagen finden Sie weiter unten. `holidays` Die

Für ein WebUntis-Elternkonto stellt WebUntis die ID und den Namen jedes verknüpften Schülers bereit; der Adapter erstellt dieselben Daten. `students.<name>` Die Struktur wird automatisch erstellt. Der Stundenplan jedes Schülers enthält Unterrichtsdetails, Tageszusammenfassungen und die Werte der aktuellen/nächsten Unterrichtsstunde. Prüfungen sind verfügbar unter `students.<name>.exams` Dies umfasst ein JSON-Array und nummerierte Eingabekanäle. Feiertage und Nachrichten bleiben Daten auf Kontoebene, da WebUnits diese Antworten nicht einem einzelnen Schüler zuordnet.

Nachrichten sind direkt unten verfügbar. `inbox.unread` Und `inbox.read` Jede Nachricht hat einen nummerierten Kanal, geordnet nach ihrer Ankunftszeit. `inbox.unread.count` Gibt die Anzahl der ungelesenen Nachrichtenkanäle an. `inbox.read.count` Gibt die Anzahl der gelesenen Nachrichtenkanäle an. Nachrichtenkanäle umfassen Datum/Uhrzeit, Absender, Betreff, Inhalt und einen Anhangsindikator. Der Adapter ruft den vollständigen Inhalt ab, wenn der WebUnits-Endpunkt dies zulässt, und verwendet andernfalls die verfügbare Vorschau. `contentIsPreview` Die Eigenschaften unterscheiden die beiden.

Der `Read (local or WebUntis)` Der Zustand ist der effektive Status und ist `true` Wenn eine Nachricht lokal als gelesen markiert wurde oder WebUnits sie als gelesen meldet. `readInWebUntis` enthält nur den von WebUnits gemeldeten Status.

Drücken `markAsUnread` auf eine Nachricht in `inbox.read` um es zurück zu verschieben nach `inbox.unread` WebUntis meldet die Nachricht weiterhin als ungelesen. Bereits gelesene Nachrichten bleiben in WebUntis erhalten. `inbox.read` Die

Der `info.refresh` Durch Klicken auf die Schaltfläche wird sofort eine vollständige Aktualisierung beim Systemstart durchgeführt: Stundenplan, Posteingangsnachrichten, Nachrichten des Tages, Hausaufgaben, Abwesenheiten, Prüfungen, Feiertage, Aufräumarbeiten und abgeleitete aktuelle/nächste Unterrichtszustände.

Die Tagesnachrichten sind verfügbar unter `newsOfDay.today`. Der `date` Und `count` Die Bundesstaaten geben Datum und Anzahl der Nachrichten an. `json` Zustand bei `newsOfDay.today.json` enthält die vollständige Nachrichtenliste als JSON-Array. Jede Nachricht hat außerdem einen nummerierten Kanal (`01`, `02`, ...) mit `id`, `subject`, `text`, Und `hasAttachments` Die Liste wird gemäß dem konfigurierten Aktualisierungsintervall (standardmäßig fünf Minuten) aktualisiert und wird außerdem über folgende Schritte aktualisiert: `info.refresh` Bei einer fehlgeschlagenen Anfrage bleiben die zuletzt erfolgreichen Daten erhalten, während eine erfolgreiche leere Antwort den Zähler auf null setzt und veraltete Nachrichtenkanäle entfernt.

Die anstehenden Prüfungen sind unterhalb des jeweiligen Studentenprofils aufgeführt. `exams` Kanal. `students.<name>.exams.count` gibt die Anzahl der im angeforderten Zeitraum angekündigten Prüfungen an. `students.<name>.exams.upcoming` enthält ein JSON-Array, `students.<name>.exams.upcomingText` Der Anzeigetext für die Prüfungen des jeweiligen Schülers wird durch Zeilenumbrüche ergänzt. Jede Prüfung verfügt außerdem über einen fortlaufend nummerierten Kanal, z. B. `students.<name>.exams.entries.01` oder `students.<name>.exams.entries.02` Die Prüfungen sind nach Datum, Startzeit und WebUnits-ID sortiert, sodass mehrere Prüfungen am selben Tag oder im selben Fach getrennt bleiben. Die Kanalnummern können sich ändern, wenn sich die Reihenfolge der Prüfungen ändert; verwenden Sie die `id` Feld zur Identifizierung einer Prüfung über Aktualisierungen hinweg. Das Array enthält die folgenden Felder:

```json
[
	{
		"id": 4102,
		"displayText": "05.11.2026 · 08:00–09:30 · Mathematik · Kapitel 4, Aufgaben 1–6"
	},
	{
		"subject": "Englisch",
		"date": "2026-11-05",
		"startTime": "10:00",
		"text": "Unit 3",
		"displayText": "05.11.2026 · 10:00–10:45 · Englisch · Unit 3"
	}
]
```

Das Individuum `entries.<NN>` Kanäle enthüllen `id` Die Verfügbarkeit hängt von den Schulberechtigungen und dem API-Umfang des WebUntis-Kontos ab. Bei einer fehlgeschlagenen oder verweigerten Anfrage bleiben die Daten der letzten erfolgreichen Prüfung erhalten; eine erfolgreiche Antwort ohne Prüfungen löscht veraltete Einträge. Prüfungsdaten enthalten keine Noten oder persönlichen Daten der Schüler. Wird die Cookie-authentifizierte Prüfungsanfrage verweigert, versucht der Adapter sie einmal mit seinem REST-Token erneut. Bei Elternkonten lädt der Adapter die verknüpften Schüler aus den WebUntis-App-Daten und liest den Stundenplan jedes Schülers, sodass identische Prüfungen getrennt bleiben und dem richtigen Kind zugeordnet werden. Schulberechtigungen können den Zugriff auf einen oder mehrere Stundenpläne von Kindern weiterhin verweigern; eine fehlgeschlagene Aktualisierung erhält die Daten der letzten erfolgreichen Prüfung.

## Hausaufgaben und Fehlzeiten

Hausaufgaben und Fehlzeiten werden beim Start und im Rahmen des regulären Aktualisierungszyklus aktualisiert. Sie werden auch berücksichtigt, wenn `info.refresh` wird ausgelöst. Ihre Daten werden gespeichert unter `students.<student>` Die verknüpften Schülerkonten der Eltern bleiben somit getrennt. Der Adapter verwendet die eigene Schüler-ID des Kontos für Schülerkonten und die von WebUnits zurückgegebenen verknüpften Schüler-IDs für Elternkonten.

- `students.<student>.homework` enthält `count`, `openCount`, `completedCount` Und `unknownCount`, gefolgt von nummerierten Einträgen mit der Hausaufgaben-ID, der zugehörigen Lektions-ID, dem Fach und dem Lehrer (sofern verfügbar), dem Datum, dem Fälligkeitsdatum, dem Text, der Bemerkung, dem Bearbeitungsstatus und dem Anhangsindikator.
- `homework.unassigned` Enthält Hausaufgaben auf Kontoebene, die keinem Schüler zugeordnet werden können. Hausaufgaben ohne expliziten Schülerbezug werden nur dann zugewiesen, wenn genau eine Schüleridentität bekannt ist; sind keine oder mehrere Schüler bekannt, bleiben sie unzugewiesen. Der Adapter ermittelt die Zuordnung nicht anhand von Fach- oder Lehrernamen; der Kanal verfügt über dieselben Zählfelder wie die Schüler-Hausaufgabenkanäle.
- `students.<student>.absences` ist ein Kanal, der nummerierte Abwesenheitskanäle enthält (`01`, `02` usw.). Jeder Datensatz hat genau diese neun schreibgeschützten Zustände: `startDate`, `endDate`, `startTime`, `endTime`, `reason`, `excuseStatus`, `excuseStatusKnown`, `excuseText`, Und `isExcused` Die
- `students.<student>.absences.json` Enthält dieselben Datensätze wie ein JSON-Array. Jedes Datensatzobjekt besitzt genau die neun oben aufgeführten Schlüssel. Ein unklarer Entschuldigungsstatus wird wie folgt dargestellt: `unknown` und wird niemals als unentschuldigt ausgelegt.

Diese Bereiche sind schreibgeschützt. Der Zugriff hängt von den WebUntis-Berechtigungen der Schule ab. Bei einer fehlgeschlagenen oder verweigerten Anfrage bleiben die zuletzt erfolgreichen Daten erhalten, während ein gültiges leeres Ergebnis veraltete Einträge löscht. Der Hausaufgaben-Endpunkt kann auf das Schuljahr der aktuellen WebUntis-Sitzung beschränkt sein; der Adapter ändert das Schuljahr dieser gemeinsamen Sitzung nicht.

## Anforderungen und Hinweise

- Es werden Node.js 22.19 oder neuer, js-controller 7.2.2 oder neuer und Admin 8.2.0 oder neuer benötigt.
- Ein WebUnits-Konto mit Zugriff auf die ausgewählte Schule ist erforderlich.
- Die Anmeldung mit Benutzername und Passwort wird unterstützt.
- QR-Code-, Microsoft 365-, SAML- und OAuth-Login werden nicht unterstützt.
- Die Hausaufgaben werden für das aktuelle Schuljahr aus WebUnits gelesen. Der Adapter wechselt die gemeinsame Sitzung nicht zu einem anderen Schuljahr; kann dieser Kontext nicht validiert werden, bleiben die vorherigen Hausaufgabendaten erhalten.
- [WebUntis](https://webuntis.com/) ist ein externer Dienst. Dieses Projekt ist unabhängig und steht in keiner Verbindung zur Untis GmbH.

## Datenschutz und Sicherheit

Das Passwort wird mithilfe des geschützten Konfigurationsmechanismus von ioBroker gespeichert. Anmeldedaten, Cookies und Sitzungsinformationen werden weder in Protokollen angezeigt noch als Status veröffentlicht. Geben Sie Anmeldedaten oder persönliche Schülerinformationen nicht in Problem- oder Supportanfragen weiter.

## Unterstützung

Falls die Verbindung nicht funktioniert, überprüfen Sie zunächst die ausgewählte Schule und die WebUnits-Anmeldung in einem Browser. Führen Sie anschließend den Verbindungstest in der Adapterkonfiguration durch und fügen Sie bei einer Supportanfrage nur relevante, nicht sensible Protokollmeldungen bei.

[![Spenden](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Changelog

### **WORK IN PROGRESS**

- (Voodoo2man) Added configurable refresh intervals with a six-day full-refresh
  maximum and five-minute retries without a successful snapshot; kept Current/Next,
  today's timetable views, and next-update reporting aligned with the cached week.
- (Voodoo2man) Updated the testing tooling to @iobroker/testing 6.3.2.

### 0.3.0 (2026-11-02)

- (Voodoo2man) Added messages of the day
- (Voodoo2man) Added homework data
- (Voodoo2man) Added absence records

### 0.2.2 (2026-11-02)

- (Voodoo2man) Added support for Node.js 22.19 and newer while retaining Node.js 24 and 26 CI coverage.
- (Voodoo2man) Resolved the reported `qs` and `minimatch` development-dependency alerts.

### 0.2.1 (2026-10-28)

- (Voodoo2man) Moved read and unread messages directly under inbox, renamed the unread count state to inbox.unread.count, and removed the redundant JSON state.
- (Voodoo2man) Kept inbox refresh independent of timetable failures and replaced the local read toggle with a mark-as-unread button.

### 0.2.0 (2026-10-25)

- (Voodoo2man) Raised the minimum Node.js, js-controller, and Admin requirements.
- (Voodoo2man) Added the Ukrainian Admin translation.
- (Voodoo2man) Added multi Student support and structure.
- (Voodoo2man) Added upcoming exams
- (Voodoo2man) Added read and unread inbox messages
- (Voodoo2man) Added a manual full refresh button
- (Voodoo2man) Improved timetable details
- (Voodoo2man) Removed duplicate date states.

### 0.1.10 (2026-10-18)

- (Voodoo2man) Improved configuration feedback, holiday names, and connection status; reduced routine login log messages; verified Node.js 26 compatibility; and migrated Dependabot auto-merging to the `pull_request` event.

For earlier releases, see CHANGELOG_OLD.md.

## License

Copyright (c) 2026 Voodoo2man <Voodoo2man@outlook.de>

MIT License. See [LICENSE](https://github.com/Voodoo2man/ioBroker.webuntis2/blob/main/LICENSE).