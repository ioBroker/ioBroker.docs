---
chapters: {"pages":{"de/adapterref/iobroker.parcelapp/README.md":{"title":{"de":"ioBroker.parcelapp — Nutzerdokumentation"},"content":"de/adapterref/iobroker.parcelapp/README.md"},"de/adapterref/iobroker.parcelapp/scripting.md":{"title":{"de":"Skripte und Automatisierung"},"content":"de/adapterref/iobroker.parcelapp/scripting.md"},"de/adapterref/iobroker.parcelapp/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.parcelapp/faq.md"}}}
---
# Häufige Fragen

Kapitel: [Hauptseite](/#/adapters/parcelapp) · [Skripte und Automatisierung](/#/docs/adapterref/iobroker.parcelapp/scripting.md) · **diese Seite**

---

## Anfragegrenzen

parcel.app erzwingt zwei Grenzen je API-Schlüssel:

| Vorgang                     | Grenze            | Wer verbraucht sie                                                                                  |
| --------------------------- | ----------------- | --------------------------------------------------------------------------------------------------- |
| GET (Sendungen lesen)       | **20 pro Stunde** | jede Abfrage, die zusätzliche Abfrage nach einem `addDelivery`, jeder Klick auf _Verbindung testen_ |
| POST (Sendungen hinzufügen) | **20 pro Tag**    | jedes `addDelivery` — auch die fehlgeschlagenen                                                     |

Der Adapter führt beide Budgets selbst und fragt deshalb nie nach der 21. Anfrage:

- Er zählt jedes GET der letzten Stunde. Eine reguläre Abfrage braucht eine freie Anfrage; ein Klick
  auf _Verbindung testen_ mit dem eingestellten Schlüssel ebenso, sonst antwortet der Knopf „The
  hourly request budget of parcel.app is used up", ohne parcel.app zu fragen.
- Nach einem `addDelivery` fragt er einmal zusätzlich ab, damit die neue Sendung früh erscheint —
  höchstens einmal je Abfrageintervall und nur, solange jeder regulären Abfrage ihre Anfrage bleibt.
- Er nimmt höchstens **20 `addDelivery`-Aufrufe in beliebigen 24 Stunden** an, dieselbe Grenze, die
  parcel.app setzt. Der 21. Aufruf wird lokal abgewiesen, mit dem Zeitpunkt, ab dem der nächste
  wieder geht. Ein fehlgeschlagenes `addDelivery` zählt mit — ein Skript, das ein falsches
  `carrier_code` in einer Schleife wiederholt, landet also dort.

Deshalb kann das Abfrageintervall auch nicht unter 5 Minuten gehen: 12 Abfragen pro Stunde lassen
Luft für die zusätzlichen Abfragen und ein paar Verbindungstests.

Antwortet parcel.app trotzdem mit einem Anfragegrenzen-Fehler (ein anderer Client mit demselben
Schlüssel oder mehrere Neustarts in einer Stunde), pausiert der Adapter seine Anfragen für die vom
Server verlangte Abkühlzeit (mindestens eine Minute, höchstens ein Tag) und schreibt eine Warnung.
Er klopft nicht weiter an.

## Der Verbindungstest sagt, der Schlüssel sei in Ordnung, aber es erscheint nichts

Am wahrscheinlichsten gibt es nichts zu zeigen: bei eingeschaltetem _Zugestellte Pakete automatisch
entfernen_ listet der Adapter nur Sendungen, die **nicht** zugestellt sind. Wenn alles in deinem
Konto angekommen ist, sind null Sendungen das richtige Ergebnis und `info.connection` bleibt grün.

Andernfalls hilft das Log auf Stufe „debug" — der Adapter protokolliert dort jede Anfrage, ihren
Statuscode und die Zahl der empfangenen Sendungen.

## Ich habe eine Sendung hinzugefügt und sie hat keine Sendungsdaten

Gib ihr 45 bis 90 Minuten. parcel.app holt die Sendungsdaten selbst beim Zusteller und liegt laut
eigener FAQ im Schnitt 45 und höchstens etwa 90 Minuten hinter dessen Website — vorher trägt eine
frisch hinzugefügte Sendung keine Ereignisse. Der Adapter kann das nicht verkürzen; häufigeres
Abfragen verbrennt nur das Anfragebudget.

## Meine Amazon-Sendungen aktualisieren sich nicht

parcel.app aktualisiert Amazon-Sendungen nur auf einem iPhone mit der parcel.app-App — solange die App
geöffnet ist oder über deren Hintergrundaktualisierung (parcel.app-FAQ). Die API und damit dieser
Adapter sieht, was dieses Gerät zuletzt geliefert hat. Ist kein iPhone mit der App beteiligt,
behalten Amazon-Sendungen ihren ersten Stand.

## `deliveryWindow` und `deliveryEstimate` bleiben leer

Dafür gibt es drei verschiedene Gründe, und das Debug-Log unterscheidet sie:

- **Die Sendung ist nicht im Status 2, 4 oder 8.** Nur _Unterwegs_, _In Zustellung_ und
  _Registriert_ können ein voraussichtliches Zustelldatum tragen. Es ist nichts kaputt.
- **Der Zusteller meldet gar kein Datum.** Häufig — viele Zusteller nennen erst kurz vor der
  Zustellung eines. Es wird nichts protokolliert, weil nichts schiefgelaufen ist.
- **Der Zusteller meldet ein Datum, das der Adapter nicht liest.** parcel.app reicht die
  Schreibweise des Zustellers unverändert durch, und die Formate unterscheiden sich. Für das
  erwartete Datum liest der Adapter `2026-09-06 14:30:00` (die dokumentierte Vorgabe, mit oder ohne
  Uhrzeit — die einzige Form, die in echten Antworten vorkommt) und `September 6, 2026 14:30`.
  Mehrdeutige Formen wie `06.09.2026` verweigert er bewusst — das kann der 6. September oder der 9. Juni sein, und ein falsches Datum ist schlimmer als keins. Stelle die Instanz auf
  Protokollstufe `debug` und suche nach `expected-date drift`: die Zeile nennt den genau abgelehnten
  Wert. Melde ihn bitte mit dieser Zeile, dann kann das Format ergänzt werden.

Ein reines Datum ohne Uhrzeit (oder Mitternacht) ist ein Zustell*tag*, kein Stundenfenster —
`deliveryWindow` bleibt dann leer, während `deliveryEstimate` weiterhin _heute_ oder _morgen_ sagt.
Meldet parcel.app einen **Bereich** von Tagen — von Montag bis Mittwoch, oft als Mitternacht bis
Mitternacht —, gilt jeder Tag des Bereichs als _heute_; _überfällig_ ist die Sendung erst nach dem
letzten.

Eine Sendung **in Zustellung** gilt als _heute_, wenn der Zusteller sie heute erfasst hat — auch ohne
erwartetes Datum oder mit einem, das schon zurückliegt. Den Tag dieser Erfassung liefert das neueste
Ereignis, dessen Datum parcel.app in der Sprache der Sendung und in mehr Formen schickt als das
erwartete Datum: mit Jahr (`2026-09-25 07:12:00`, `September 25, 2026 7:12`), die UPS-Punktform mit
dem Monat zuerst (`09.25.2026 07:12`, nur gelesen, wo Tag und Monat unterscheidbar sind) und eine
Wochentagsform ohne Jahr in allen App-Sprachen (`Friday, 25 September 7:12 am`,
`Freitag, 25. September 5:50`, `domingo 24 agosto 11:23 PM`). Eine Form, die er nicht liest,
hinterlässt eine `event-date drift`-Zeile auf Debug-Stufe.

Alles, was vom Datum abhängt — die Schätzung, `todayCount` und das Gesamtfenster —, rückt direkt nach
Mitternacht weiter, ohne parcel.app zu fragen: aus _morgen_ wird _heute_ mit Beginn des Tages, nicht
erst mit der ersten Abfrage danach.

## Eine Sendung zeigt „Unbekannt (-1)"

parcel.app hat einen Statuswert geschickt, den der Adapter nicht deuten konnte — vermutlich einen
dort neu eingeführten Statuscode. Die Sendung bleibt bewusst sichtbar, statt als zugestellt behandelt
und entfernt zu werden. Sobald der Adapter den neuen Code kennt, wird sie wieder richtig angezeigt;
die Sendungsdaten selbst sind davon nicht betroffen. Ein unlesbarer Wert wird nie als die Zahl
gelesen, mit der er zufällig beginnt: `"0abc"` ist _unbekannt_, nicht _zugestellt_ (im Modus
„automatisch entfernen" hätte das die Sendung gelöscht). Der Admin zeigt neben `statusCode` die
Bedeutung jedes Codes.

## Eine Sendung ist aus dem Objektbaum verschwunden

Drei mögliche Gründe, nach Wahrscheinlichkeit:

1. Sie wurde zugestellt und _Zugestellte Pakete automatisch entfernen_ ist eingeschaltet. Dann tut
   die Einstellung genau ihre Arbeit.
2. Du hast die Sendung in parcel.app gelöscht. Der Adapter bildet dein Konto ab und folgt.
3. parcel.app liefert sie nicht mehr aus. Der Adapter entfernt eine Sendung nur, wenn die API sie
   nicht mehr listet — ein vorübergehender Fehler oder eine fehlerhafte Antwort löscht nie etwas.

Eine Sendung wird **nie** entfernt, weil ein einzelner Schreibvorgang fehlgeschlagen ist. Das war
einmal ein echter Defekt und ist seit v0.9.0 abgesichert.

## Kann ich eine Sendung aus ioBroker heraus löschen?

Nein. Die parcel.app-API hat keinen Lösch-Endpunkt — löschen geht nur in der parcel.app-App oder im
Web. Die ioBroker-Datenpunkte von Hand zu löschen hilft ebenfalls nicht: die nächste Abfrage legt
sie wieder an, solange parcel.app die Sendung noch liefert.

## Ich habe dieselbe Sendungsnummer zweimal, bei zwei Zustellern

Beide werden verfolgt, jede mit ihrem eigenen Gerät — auch bei drei oder mehr Zustellern und auch
bei Einträgen ganz ohne Sendungsnummer. Das passiert, wenn eine Nummer zuerst mit dem falschen
Zusteller angelegt wurde: die API hat keinen Lösch-Endpunkt, der Eintrag bleibt also, und man legt
die Nummer mit dem richtigen Zusteller erneut an. Die zweite Sendung bekommt einen Anhang an ihrer
Objekt-Kennung, damit sich die beiden nie gegenseitig überschreiben. Ist der falsche Eintrag in
parcel.app weg, entfernt die Abfrage, die das bemerkt, seine Objekte, und die verbliebene Sendung
rückt bei der Abfrage danach auf die Kennung ohne Anhang.

**Korrigiert** man stattdessen den Zusteller des bestehenden Eintrags in parcel.app, behält die
Sendung ihr Gerät und alle Datenpunkte — der Adapter erkennt dieselbe Sendung an Sendungsnummer und
Zusatzinformation. Dasselbe gilt für eine Nummer, die in anderer Groß-/Kleinschreibung neu eingegeben
wurde. `lastUpdated` springt dabei, weil sich der Zusteller geändert hat.

Welche Sendung welche Kennung besitzt, steht im Geräte-Objekt (`native.identity`); ein Neustart des
Adapters vertauscht deshalb nie die Kennungen zweier Sendungen, egal in welcher Reihenfolge
parcel.app sie liefert.

## Warum ist `lastUpdated` alt, obwohl der Adapter abfragt?

Weil es „die Sendungsdaten haben sich zuletzt geändert" bedeutet und nicht „der Adapter hat zuletzt
abgefragt". Eine Sendung, die übers Wochenende im Depot liegt, behält einen wochenendalten
Zeitstempel — das ist die nützliche Lesart. Ob der Adapter lebt, sagt `info.connection`.

Was ihn **nicht** bewegt: die Schätzung, die von _in 2 Tagen_ zu _morgen_ wechselt, ein neuer
Anzeigename, den parcel.app einem Zusteller gibt, und der Statustext, der mit der Systemsprache
wechselt. Ein neuer Zusteller-**Code** bewegt ihn — die Sendung wird jetzt woanders verfolgt.

## Die Verbindungsanzeige war kurz rot

Nur ein echter Fehler der parcel.app-API färbt `info.connection` rot. Ein Aussetzer der
ioBroker-Datenbank während des Schreibens tut das nicht — er erscheint als
`Removing stale packages failed …` oder `Updating the summary failed …` auf Warnstufe — beide mit
`(API connection is fine, retrying next poll)` — und die Anzeige bleibt grün.

Ein Netzwerkfehler oder eine Zeitüberschreitung ist ein **Zustand**, kein Log-Ereignis:
`info.connection` zeigt ihn, das Log führt ihn nur auf Debug-Stufe — eine Zeile je Störung würde nur
den Datenpunkt wiederholen. Alles, worauf du reagieren musst, erscheint einmal als Warnung: ein
ungültiger Schlüssel (HTTP 401), ein Abo-Problem (HTTP 403), eine Anfragegrenze (HTTP 429) oder eine
unerwartete Antwort. Wiederholt gleiche Fehler stehen danach nur noch auf Debug-Stufe, eine lange
Störung flutet das Log also nicht.

Nach einem ungültigen Schlüssel oder einem Abo-Problem hält der Adapter Abstand: nach der n-ten
Ablehnung in Folge überspringt er die nächsten 2^(n-1) - 1 Abfragen (nie mehr als sechs Stunden),
damit ein falscher Schlüssel nicht das Stundenbudget eines Schlüssels verbraucht, der anderswo
funktioniert. Eine erfolgreiche Antwort oder ein neuer Schlüssel in den Einstellungen (die Instanz
startet neu) beendet das. _Verbindung testen_ fragt immer.

## Ich habe eine Sendung im Admin umbenannt und der Adapter hat es überschrieben

Ja, und seit v0.13.0 ist das so gewollt. Der Gerätename ist die Beschreibung aus parcel.app, und der
Adapter hält ihn damit gleich: benennst du die Sendung dort um, folgt das Gerät bei der nächsten
Abfrage. Vor v0.13.0 war der Name auf seinem ersten Wert eingefroren — damit kam auch deine eigene
Änderung in parcel.app nie an.

Für eine eigene Bezeichnung nimm einen Alias oder einen Datenpunkt in `0_userdata` — der gehört dir
und wird vom Adapter nie angefasst. Die **Namen der Datenpunkte** unterhalb einer Sendung gehören
genauso dem Adapter und werden bei jedem Start aufgefrischt, damit eine verbesserte Übersetzung auch
deine Anlage erreicht.

## Welche Zusteller werden unterstützt?

Alle — der Adapter unterstützt, was parcel.app unterstützt, denn parcel.app macht die
Sendungsverfolgung. Die aktuelle Liste ist
[`supported_carriers.json`](https://api.parcel.app/external/supported_carriers.json).

## Schickt der Adapter meine Daten irgendwohin?

Der Adapter spricht mit `api.parcel.app` — und für Fehlerberichte mit Sentry
(`ingest.de.sentry.io`). Dein API-Schlüssel liegt verschlüsselt im Instanz-Objekt und wird nie ins
Log geschrieben.

Die Fehlerberichte über Sentry sind **an**, solange sie nicht abgeschaltet sind: das ioBroker-Plugin
meldet, solange die Diagnose-Einstellung des Systems (_Systemeinstellungen → Statistik_) nicht auf
_keine_ steht — die Vorgabe des js-controllers ist _erweitert_ — und die Datenübermittlung weder für
den Host noch für diese Instanz abgeschaltet ist, und nie auf CI-Systemen. Ein Bericht enthält den
Fehler mit seinem Stacktrace und technischen Kontext wie Versionen und Plattform, dazu eine anonyme
Installationskennung. Alle Wege zum Abschalten nennt die
[Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry).

## Wo melde ich ein Problem?

Auf [GitHub](https://github.com/krobipd/ioBroker.parcelapp/issues). Am meisten hilft ein Log auf
Stufe „debug" über die Minuten um das Problem herum — der Adapter protokolliert dort jede Anfrage
und jede Datenpunkt-Entscheidung.