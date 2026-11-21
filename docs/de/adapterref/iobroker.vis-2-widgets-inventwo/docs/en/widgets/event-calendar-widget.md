---
chapters: {"pages":{"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md":{"title":{"en":"inventwo Widgets for ioBroker vis 2.0"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md":{"title":{"en":"vis-2-widgets-inventwo — Documentation"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/README.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md":{"title":{"en":"Migrating inventwo vis-1 widgets"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/migration.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md":{"title":{"en":"Universal Widget – Design Examples"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/universal-widget-design-examples.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md":{"title":{"en":"Example View – Hexagonal Smart-Home Dashboard"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/hexagonal-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md":{"title":{"en":"Example View - Smart Home Dashboard (3x3 Grid)"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/example-views/rectangle-view.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md":{"title":{"en":"inventwo Widgets for ioBroker VIS 2 — User Guide"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/index.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md":{"title":{"en":"Universal Widget — Interaction Types"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/interaction-types.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md":{"title":{"en":"Universal Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md":{"title":{"en":"Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md":{"title":{"en":"Radial Slider Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/radial-slider-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md":{"title":{"en":"Switch Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/switch-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md":{"title":{"en":"Checkbox Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/checkbox-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md":{"title":{"en":"Table Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md":{"title":{"en":"Dropdown Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/dropdown-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md":{"title":{"en":"Marquee Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/marquee-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md":{"title":{"en":"Value List Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/value-list-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md":{"title":{"en":"Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md":{"title":{"en":"Event Calendar Widget"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/content-types.md":{"title":{"en":"Universal Widget — Content Types"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/content-types.md"},"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/styling-and-shapes.md":{"title":{"en":"Universal Widget — Styling and Shapes"},"content":"en/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/universal/styling-and-shapes.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/event-calendar-widget.md
title: Eventkalender-Widget
hash: puLzbMq7D19zx+8z77fX2FsNP83taIsgXFfgLIL1xhY=
---
> 🌐 **Englisch** | [Deutsch](https://github.com/inventwo/ioBroker.vis-2-widgets-inventwo/blob/master/docs/de/widgets/event-calendar-widget.md)

# Eventkalender-Widget

Das Event-Kalender-Widget zeigt Ereignisse/Termine (z. B. aus einem iCal-Kalender) in einer Google-Kalender-ähnlichen Ansicht an, basierend auf [FullCalendar](https://fullcalendar.io/) . Alle Farben, Schriftgrößen und Rahmen sind konfigurierbar, und alle im kostenlosen/MIT-lizenzierten FullCalendar-Paket verfügbaren Ansichten werden unterstützt: Monat, Woche, Tag, Mehrmonats- (Jahres-) und vier Listenansichten.

Suchen Sie stattdessen einen einfachen Datumswähler? Verwenden Sie das [Kalender-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md) .

---

## So fügen Sie das Widget hinzu

1. Ziehen Sie **den Eventkalender** aus der Liste der **inventwo design** Widgets in Ihre Ansicht.
2. Klicken Sie auf **Ereignisse (Datenpunkt)** und wählen Sie den Datenpunkt aus, der die JSON-Ereignisliste enthält (siehe „ [Ereignisse anzeigen“](#showing-events) weiter unten).
3. Wählen Sie die **Ansicht** und passen Sie die Einstellungen für Kopfzeile/Navigation/Wochennummer und Farbe an.

---

## Einstellungen

### Gemeinsam

| Einstellung                                     | Was es tut                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ereignisse (Datenpunkt)**                     | Datenpunkt mit einer JSON-Liste von Ereignissen (siehe [„Ereignisse anzeigen“](#showing-events) weiter unten). Wird ignoriert, sobald mindestens ein Kalender in der Gruppe _„Zusätzliche Kalender“_ unten konfiguriert ist.                                                                                                                                                                                           |
| **Erster Tag der Woche**                        | Ob die Woche am **Montag** oder **Sonntag** beginnt.                                                                                                                                                                                                                                                                                                                                                                   |
| **Sicht**                                       | **Monat** , **Woche** , **Tag** , **Mehrmonatsansicht (Jahr)** (eine Tabelle/ein Stapel von mehreren Monaten) oder eine von vier **Listenansichten** ( **Liste - Tag/Woche/Monat/Jahr** , eine Agenda-ähnliche Liste anstehender Ereignisse).                                                                                                                                                                          |
| **Kopfzeile anzeigen**                          | Standardmäßig aktiviert. Deaktivieren Sie diese Option, um die Symbolleiste (Titel + Navigationsschaltflächen) vollständig auszublenden.                                                                                                                                                                                                                                                                               |
| **Navigation nach Monat/Woche/Tag ermöglichen** | Wird nur angezeigt, wenn **die Kopfzeilenleiste** aktiviert ist. Standardmäßig aktiviert. Deaktivieren Sie diese Option, um den Titel sichtbar zu halten, aber die Schaltflächen „Zurück“, „Weiter“ und „Heute“ auszublenden, sodass der Benutzer nicht zu einem anderen Monat/einer anderen Woche/einem anderen Tag wechseln kann.                                                                                    |
| **Kalenderwochennummern anzeigen**              | Fügt jeder Tageszelle ein Kalenderwochen-Badge hinzu (hauptsächlich sichtbar in Monats-/Mehrmonatsansichten).                                                                                                                                                                                                                                                                                                          |
| **Kalenderwochentyp**                           | Nur sichtbar, wenn die Kalenderwochen angezeigt werden. **ISO-8601** : Die Wochen beginnen am Montag, Woche 1 ist die Woche, die den ersten Donnerstag des Jahres enthält (europäischer Standard). **Vereinfacht** : Länderspezifische Kalenderwochennummerierung.                                                                                                                                                     |
| **Max. Ereignisse pro Tag**                     | Nur in der **Monats-** / **Mehrmonats- (Jahres-)** Ansicht sichtbar und wirksam. Standardmäßig auf `0` = Keine Begrenzung, die Tageszellen wachsen wie zuvor mit der Anzahl der Ereignisse. Bei einem Wert über 0 werden nur so viele Ereigniskacheln pro Tag angezeigt; die restlichen befinden sich hinter einem „+N weitere“-Link, der beim Anklicken ein Popover mit allen Ereignissen des jeweiligen Tages öffnet. |

---

### Zusätzliche Kalender

Standardmäßig zeigt das Widget die Ereignisse eines einzelnen Datenpunkts an ( **Ereignisse (Datenpunkt)** oben). Um mehrere Kalender gleichzeitig anzuzeigen – z. B. einen iCal-Kalender pro Familienmitglied – listen Sie diese stattdessen hier auf. Jeder Kalender erhält eine eigene Farbe und Bezeichnung, die in einer Legende unterhalb des Kalenders angezeigt werden.

Sobald hier mindestens ein Kalender konfiguriert ist, wird das einzelne **Ereignisfeld (Datenpunkt)** oben vollständig ignoriert und kann leer gelassen werden.

| Einstellung                                  | Was es tut                                                                                                                                                                                                                                                      |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anzahl der Kalender**                      | Wie viele Kalender sollen unten konfiguriert werden?                                                                                                                                                                                                            |
| **Legende anzeigen**                         | Standardmäßig aktiviert. Wird erst angezeigt, wenn mindestens ein Kalender konfiguriert ist. Schaltet die Farb-/Beschriftungslegende unterhalb des Kalenders um.                                                                                                |
| **Ereignisse (Datenpunkt)** _(pro Kalender)_ | Datenpunkt, der die JSON-Ereignisliste dieses Kalenders enthält (gleiches Format wie oben, siehe [Ereignisse anzeigen](#showing-events) ).                                                                                                                      |
| **Farbe** _(pro Kalender)_                   | Überschreibt die Farbe jedes Ereignisses in diesem Kalender (seine eigene Farbe). `color` /`_calColor` und die alternative **Hintergrundfarbe des Ereignisses** ). Lassen Sie dieses Feld leer, um die vom Ereignis/Adapter bereitgestellte Farbe beizubehalten. |
| **Etikett** _(pro Kalender)_                 | Beschriftung für diesen Kalender in der Legende. Feld leer lassen, um die Beschriftung in der Legende auszublenden (sie wird trotzdem im Kalender angezeigt).                                                                                                   |

Die unten aufgeführten [Farbregeln für Ereignisse](#event-color-rules) gelten weiterhin für alle Kalender und überschreiben die Kalenderfarbe bei einer Übereinstimmung. Um die Zuordnung eines Ereignisses zu einem bestimmten Kalender eindeutig zu gestalten, erhält jede Ereigniskachel einen 4 Pixel breiten, farbigen linken Rand in der Farbe des jeweiligen Kalenders, unabhängig davon, ob eine Farbregel die Füllfarbe der Kachel überschrieben hat. In den Listenansichten (die Ereignisse als Tabellenzeilen darstellen) wird stattdessen der integrierte Punkt vor dem Ereignistitel farbig dargestellt, sodass dieser in seiner Spalte zentriert bleibt.

---

### Farbregeln für Veranstaltungen

Der ioBroker **ical-** Adapter stellt nur eine Farbe pro Kalender bereit (`_calColor` Im Gegensatz zu Google Kalender, wo einzelne Ereignisse farblich gekennzeichnet werden, werden hier nicht pro Ereignis angezeigt. Dadurch erhalten alle Ereignisse desselben Kalenders die gleiche Farbe und sind nicht unterscheidbar. Mit Ereignisfarbregeln können Sie Farben stattdessen manuell anhand des Ereignistitels zuweisen.

| Einstellung                           | Was es tut                                                                                                                                                                                                                                                                                    |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anzahl der Regeln**                 | Wie viele Regeln müssen unten konfiguriert werden?                                                                                                                                                                                                                                            |
| **Der Titel enthält** _(gemäß Regel)_ | Der Text, der mit dem Veranstaltungstitel abgeglichen werden soll. Die Groß-/Kleinschreibung wird nicht beachtet, und der Abgleich gilt, wenn der Titel diesen Text _enthält_ (nicht nur eine exakte Übereinstimmung) – z. B. `Geburtstag` Passend zu „Geburtstag Mama“ und „Geburtstag Papa“. |
| **Hintergrundfarbe** _(gemäß Regel)_  | Die Farbe, die für Veranstaltungen verwendet wird, deren Titel übereinstimmt.                                                                                                                                                                                                                 |

Die Regeln werden der Reihe nach geprüft (Regel 1, dann Regel 2 usw.), und die erste Übereinstimmung gewinnt. Eine übereinstimmende Regel hat Vorrang vor der vom Ereignis selbst vorgegebenen Farbe. `color` /`_calColor` und die Fallback- **Hintergrundfarbe des Ereignisses** aus der unten stehenden _Ereigniskachelgruppe_ ) - genau darum geht es, da die eigene Farbe des Adapters nicht geeignet ist, Ereignisse zu unterscheiden.

---

### inventwo — Kalenderereignisse: Kopfzeile

Die FullCalendar-Symbolleiste: Titel und die Navigationsschaltflächen für vorheriges/nächstes/heute.

| Einstellung                                                          | Was es tut                                                                  |
| -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Vom Widget**                                                       | Kopieren Sie diese Einstellungen aus einem anderen Ereigniskalender-Widget. |
| **Farbe des Headertitels**                                           | Farbe des Monats-/Jahres-/Tagestitels.                                      |
| **Schriftgröße des Titels**                                          | Schriftgröße des Titels in Pixeln.                                          |
| **Schaltflächentextfarbe**                                           | Textfarbe der Schaltflächen „Zurück“, „Weiter“ und „Heute“.                 |
| **Hintergrundfarbe der Schaltfläche**                                | Hintergrundfarbe der Schaltflächen. Akzeptiert `transparent` Die             |
| **Rahmenfarbe der Schaltfläche**                                     | Rahmenfarbe der Schaltflächen.                                              |
| **Radius der Schaltflächenränder**                                   | Abrundung der Ecken der Schaltflächen in Pixeln.                            |
| **Schaltflächentextfarbe (Hover)**                                   | Textfarbe beim Überfahren mit der Maus/Fokussieren/Aktivieren.              |
| **Hintergrundfarbe der Schaltfläche (beim Überfahren mit der Maus)** | Hintergrundfarbe beim Überfahren mit der Maus/Fokussieren/Aktivieren.       |

---

### inventwo — Kalenderereignisse: Wochentage

Die Zeile mit den Wochentagsspaltenüberschriften (Monats-/Wochen-/Tages-/Mehrmonatsansicht) – und, da es sich um die gleiche Art von Überschrift handelt, auch die Titelleiste für Tag/Datum, die in den Listenansichten über den Ereignissen jedes Tages angezeigt wird.

| Einstellung                         | Was es tut                                                                                                               |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Vom Widget**                      | Kopieren Sie diese Einstellungen aus einem anderen Ereigniskalender-Widget.                                              |
| **Textfarbe an Wochentagen**        | Farbe der Wochentagsabkürzungen/Spaltenüberschriften und des Tages-/Datumstextes in der Titelleiste der Listenansichten. |
| **Hintergrundfarbe an Wochentagen** | Hintergrundfarbe der Wochentags-Kopfzeile und der Titelleiste der Listenansichten. Akzeptiert `transparent` Die           |
| **Schriftgröße an Wochentagen**     | Schriftgröße der Wochentagsbezeichnungen und des Titelleistentextes der Listenansichten in Pixeln.                       |

---

### inventwo — Kalenderereignisse: Tag

| Einstellung                                | Was es tut                                                                                                                            |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Vom Widget**                             | Kopieren Sie diese Einstellungen aus einem anderen Ereigniskalender-Widget.                                                           |
| **Textfarbe der Tagesnummer**              | Farbe der Tagesnummer, die in jeder Kachel angezeigt wird (Monats-/Mehrmonatsansicht).                                                |
| **Schriftgröße der Tagesnummer**           | Schriftgröße der Tagesnummer in Pixeln.                                                                                               |
| **Textfarbe für Tag außerhalb des Monats** | Die Textfarbe der vorangehenden/nachfolgenden Tage aus dem vorherigen/nächsten Monat wird verwendet, um das Monatsraster auszufüllen. |
| **Hintergrundfarbe fürs Wochenende**       | Hintergrundfarbe der Samstag/Sonntag-Spalten. Akzeptiert `transparent` um sie ungestylt zu lassen.                                     |
| **Textfarbe der Wochennummer**             | Wird nur angezeigt, wenn **die Option „Kalenderwochennummern anzeigen“** aktiviert ist. Textfarbe des Wochennummern-Badges.           |
| **Hintergrundfarbe der Kalenderwoche**     | Wird nur angezeigt, wenn **die Option „Kalenderwochennummern anzeigen“** aktiviert ist. Hintergrundfarbe des Wochennummern-Badges.    |
| **Schriftgröße der Wochennummer**          | Wird nur angezeigt, wenn **die Kalenderwochennummern** angezeigt werden. Schriftgröße des Wochennummern-Badges in Pixeln.             |

---

### inventwo — Kalenderereignisse: heute

| Einstellung                         | Was es tut                                                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Vom Widget**                      | Kopieren Sie diese Einstellungen aus einem anderen Ereigniskalender-Widget.                                          |
| **Hintergrundfarbe heute**          | Hintergrundfarbe der heutigen Zelle/Spalte.                                                                          |
| **Textfarbe heute**                 | Textfarbe der heutigen Tagesnummer/Spaltenüberschrift.                                                               |
| **Heute Randfarbe**                 | Farbe des Hervorhebungsrahmens um die heutige Zelle/Spalte.                                                          |
| **Heutige Grenzbreite**             | Dicke dieser Grenze in Pixel (0–10).                                                                                 |
| **Aktuelle Zeitanzeige anzeigen**   | Standardmäßig aktiviert. Nur in der Wochen-/Tagesansicht sichtbar. Zeigt eine Live-Linie zum aktuellen Zeitpunkt an. |
| **Farbe der aktuellen Zeitanzeige** | Wird nur angezeigt, wenn die Anzeige aktiviert ist. Farbe dieser Linie (und ihres Pfeilmarkers).                     |

---

### inventwo — Kalenderereignisse: Ereigniskacheln

| Einstellung                            | Was es tut                                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Vom Widget**                         | Kopieren Sie diese Einstellungen aus einem anderen Ereigniskalender-Widget.                                                           |
| **Hintergrundfarbe der Veranstaltung** | Ausweichhintergrundfarbe für eine Ereigniskachel, die verwendet wird, wenn das Ereignis selbst keine angibt. `color` (siehe unten).    |
| **Textfarbe der Veranstaltung**        | Textfarbe der Ereigniskacheln.                                                                                                        |
| **Rahmenfarbe der Veranstaltung**      | Rahmenfarbe der Ereigniskacheln.                                                                                                      |
| **Ereignis-Randradius**                | Abrundung der Ecken von Ereigniskacheln in Pixeln.                                                                                    |
| **Schriftgröße der Veranstaltung**     | Schriftgröße des Veranstaltungstitels in Pixeln.                                                                                      |
| **"+N weitere" Linkfarbe**             | Farbe des Links „+N weitere“, der in der Monatsansicht angezeigt wird, wenn ein Tag mehr Ereignisse enthält, als in die Zelle passen. |

---

### inventwo — Kalenderereignisse: Grenzen

Die Gitterlinien zwischen den Tageszellen/Spalten.

| Einstellung                | Was es tut                                                                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Vom Widget**             | Kopieren Sie diese Einstellungen aus einem anderen Ereigniskalender-Widget.                    |
| **Rastergrenzen anzeigen** | Standardmäßig aktiviert. Deaktivieren Sie diese Option, um alle Gitternetzlinien auszublenden. |
| **Rahmenbreite**           | Wird nur angezeigt, wenn Rahmen aktiviert sind. Dicke in Pixel (0–5).                          |
| **Rahmenfarbe**            | Wird nur angezeigt, wenn Rahmen aktiviert sind. Farbe der Gitterlinien.                        |

---

## Ereignisse anzeigen

Das Ereigniskalender-Widget analysiert keine iCal-Daten (`.ics`) Daten selbst. Stattdessen sollte **\`Events(datapoint)\` ** auf einen Datenpunkt verweisen, dessen Wert ein JSON-Array von Ereignissen ist. Jedes Ereignis ist ein Objekt mit:

| Feld     | Alternativfeld     | Erforderlich | Beschreibung                                                                                                                                                                                                                          |
| -------- | ------------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`  | `summary`, `event` | Ja           | Der auf der Ereigniskachel angezeigte Text.                                                                                                                                                                                           |
| `start`  | `_date`            | Ja           | Beginn des Ereignisses. ISO-Datums-/Zeitzeichenfolge (z. B. `2026-08-03T10:00:00` oder ein Zeitstempel in Millisekunden.                                                                                                               |
| `end`    | `_end`             | NEIN         | Ende der Veranstaltung, gleiches Format wie zuvor `start` Standardmäßig `start` (eintägige Veranstaltung).                                                                                                                              |
| `allDay` | `_allDay`          | NEIN         | Auf einstellen `true` für ganztägige Veranstaltungen. Gemäß der Standardkonvention von iCal/FullCalendar, `end` /`_end` wird dann als **exklusiv** betrachtet – der Tag _nach_ dem letzten sichtbaren Tag, nicht der letzte Tag selbst. |
| `color`  | `_calColor`        | NEIN         | Überschreibt **die Hintergrundfarbe des Ereignisses** für dieses spezifische Ereignis.                                                                                                                                                |

Die Spalte „alternatives Feld“ existiert, da das Widget auch das direkt vom JSON-Datenpunkt des ioBroker **-ical-** Adapters erzeugte JSON akzeptiert (z. B. `ical.0.data.table`) – Kein Konvertierungsskript erforderlich, einfach **Events (Datenpunkt)** darauf verweisen. Beispiel für diese native Form:

```json
[
  {
    "event": "Wertstoff",
    "_date": "2026-07-28T22:00:00.000Z",
    "_end": "2026-07-29T22:00:00.000Z",
    "_allDay": true,
    "_calColor": "#FF0000"
  }
]
```

Oder mit der einfachen, benutzerdefinierten Form:

```json
[
  { "title": "Team meeting", "start": "2026-08-03T10:00:00", "end": "2026-08-03T11:00:00" },
  { "title": "Vacation", "start": "2026-08-05", "end": "2026-08-10", "allDay": true, "color": "#c0743c" }
]
```

Beachten Sie das exklusive Ende für das oben genannte ganztägige Beispiel „Urlaub“: um die Veranstaltung vom 5. bis 9. August anzuzeigen. `end` ist auf den 10. August (den darauffolgenden Tag) festgelegt.

---

## Tipps

- **Sprache:** Monats-/Wochentagsnamen werden automatisch an die Browsersprache angepasst.
- **Größenänderung:** Der Kalender behält seine Größe live bei, wenn Sie das Widget im vis-Editor vergrößern oder verkleinern – ein Neuladen der Seite ist nicht erforderlich.
- **Listenansichten:** Ideal für ein kompaktes Widget mit "anstehenden Ereignissen" – wählen Sie **"Liste - Woche"** oder **"Liste - Monat"** und deaktivieren Sie die Kopfzeile/Navigation für eine feste Agendaansicht.
- **Stilwiederverwendung:** Verwenden Sie das **„Von“-Widget** in jeder Stilgruppe, um mehrere Veranstaltungskalender optisch einheitlich zu halten.

---

## Siehe auch

- [Kalender-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/calendar-widget.md) – einfacher Datumswähler ohne Ereignisse
- [Tabellen-Widget](/#/docs/adapterref/iobroker.vis-2-widgets-inventwo/docs/en/widgets/table-widget.md) – zur Anzeige von Datumswerten als Teil einer größeren Datentabelle