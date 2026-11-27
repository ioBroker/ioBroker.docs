---
chapters: {"pages":{"de/adapterref/iobroker.statechart/README.md":{"title":{"de":"ioBroker.statechart"},"content":"de/adapterref/iobroker.statechart/README.md"},"de/adapterref/iobroker.statechart/reference.md":{"title":{"de":"ioBroker.statechart: Referenz"},"content":"de/adapterref/iobroker.statechart/reference.md"},"de/adapterref/iobroker.statechart/development.md":{"title":{"de":"ioBroker.statechart: Entwicklung"},"content":"de/adapterref/iobroker.statechart/development.md"}}}
---
# ioBroker.statechart: Referenz

[Übersicht](/#/adapters/statechart) | [English](https://github.com/IggePop/ioBroker.statechart/blob/main/docs/en/reference.md)

## Der Editor

Links steht die Liste der Charts, in der Mitte das Chart und rechts die Reiter **Eigenschaften**, **Variablen** und
**Verlauf**. Beide Seitenspalten lassen sich durch Ziehen ihres Rands in der Breite ändern (Doppelklick:
Standardbreite) und mit dem Pfeil auf ihrem Rand einklappen, für mehr Platz für das Chart. Ein Doppelklick auf einen
Zustand oder Übergang klappt die rechte Spalte wieder auf. Der Browser merkt sich die Breiten und welche Spalten
eingeklappt sind.

Die Werkzeugleiste über dem Chart ist nach Aufgaben gruppiert, der Tooltip jedes Symbols zeigt Namen und Tastenkürzel:

| Gruppe | Symbole |
|---|---|
| Speichern | **Speichern** (Strg+S, auch während der Eingabe in einem Feld; blau, wenn es ungespeicherte Änderungen gibt) |
| Verlauf | **Rückgängig** (Strg+Z), **Wiederholen** (Strg+Y) |
| Zwischenablage | **Ausschneiden** (Strg+X), **Kopieren** (Strg+C), **Einfügen** (Strg+V), auch zwischen Charts, und **Löschen** (Entf; ein Oberzustand mit seinen Unterzuständen, Strg+Z holt sie zurück) |
| Hinzufügen | **Zustand hinzufügen**, **Funktion hinzufügen**, **Notiz hinzufügen**, in der Farbe des Elements, das sie anlegen |
| Anordnen | Ausgewählte Elemente **ausrichten** oder ihnen die **gleiche Breite** oder **Höhe** wie dem zuerst ausgewählten geben (Menü, nach einer Auswahl mit dem Rahmen wie dem größten), **Am Raster einrasten** ein und aus, **Ansicht** (Menü: Raster, also die Punkte im Hintergrund, Minimap und Zoom-Knöpfe anzeigen), **Alles anzeigen** (zoomt und verschiebt so, dass das ganze Chart zu sehen ist) |
| Ausgabe (rechts) | **Code anzeigen**, **Chart exportieren** (JSON), **Als Bild exportieren** (PNG), siehe [Import und Export](#import-und-export) |
| Ausführen (rechts) | Chart **anhalten** oder **starten** (wie in der Liste der Charts), **Live-Werte** ein und aus, **Simulation** starten und beenden, siehe [Ein laufendes Chart beobachten](#ein-laufendes-chart-beobachten) und [Simulation](#simulation) |

Mit **Am Raster einrasten** rasten Zustände, Funktionsblöcke und Notizen an den Punkten des Hintergrunds ein. Der Browser
merkt sich die Einstellung, wie auch die des Menüs **Ansicht**.

## Beschriftung von Übergängen

```
event[bedingung]{aktion}
```

Alle Teile sind optional und dürfen über mehrere Zeilen gehen.

| Teil | Bedeutung | Beispiel |
|---|---|---|
| `event` | Name eines Eingangs: Der Übergang wird nur geprüft, wenn sich dieser Eingang ändert | `motion` |
| `after(n, einheit)` | Statt eines Events: ein Zeitausdruck, siehe unten | `after(30, sec)` |
| `[bedingung]` | JavaScript-Ausdruck, der Übergang wird nur genommen, wenn er wahr ist | `[temp > 21 && !fenster]` |
| `{aktion}` | JavaScript, wird ausgeführt, wenn der Übergang genommen wird | `{zaehler++; licht = true;}` |

Beispiel: `motion[motion && brightness < 50]{light = true;}` wird geprüft, wenn sich der Eingang `motion` ändert, und
genommen, wenn eine Bewegung erkannt ist und die Variable `brightness` unter 50 liegt. Dann schaltet er den Ausgang
`light` ein.

Ohne Event wird ein Übergang bei jeder Änderung eines beliebigen Eingangs geprüft. Hat ein Zustand
mehrere ausgehende Übergänge, werden sie in der Reihenfolge ihrer **Priorität** geprüft (steht am Pfeil).

**Verzweigungen** (wenn / sonst wenn / sonst) entstehen durch mehrere Übergänge vom selben Zustand mit demselben
Event und unterschiedlichen Bedingungen. Genommen wird der erste nach Priorität, dessen Bedingung gilt, der letzte ohne
Bedingung ist das „sonst“:

```
motion[temp > 25]   → Kühlen   Priorität 1
motion[temp < 18]   → Heizen   Priorität 2
motion              → Lüften   Priorität 3, „sonst“
```

In Stateflow zeichnet man solche Verzweigungen oft mit einer Connective Junction, einem Verzweigungspunkt auf einem
Pfeil. Das Chart verhält sich genauso, nur steht das Event an jedem Übergang. Connective Junctions werden nicht
unterstützt, siehe [Einschränkungen](#einschränkungen).

### Zeitlogik

Statt eines Events kann ein Übergang wie bei Stateflow einen Zeitausdruck haben. Die Zeit wird ab dem Betreten des
Quellzustands gemessen, in den Einheiten `msec`, `sec` und `min`:

| Ausdruck | Gültig | Beispiel |
|---|---|---|
| `after(n, einheit)` | ab *n* Einheiten. Ein Timer weckt das Chart, danach wird die Bedingung bei jedem weiteren Aufwecken erneut geprüft | `after(30, sec)[!motion]` |
| `before(n, einheit)` | während der ersten *n* Einheiten, ohne Timer | `before(5, sec)[taster]` |
| `at(n, einheit)` | genau einmal: beim Aufwecken durch seinen Timer nach *n* Einheiten, nicht später | `at(10, min)` |
| `every(n, einheit)` | alle *n* Einheiten, beim Aufwecken durch seinen Timer | `every(15, min){zaehler++;}` |
| `after(n, einheit, bedingung)` | sobald die Bedingung *n* Einheiten ununterbrochen wahr ist. Ein Timer weckt das Chart genau dann | `after(5, min, !motion)` |
| `at("ereignis", minuten)` | jeden Tag zu einem Astro-Ereignis, optional um Minuten verschoben (negativ: vorher), beim Aufwecken durch seinen Timer | `at("sunset", -30)` |
| `at("HH:mm")` | jeden Tag zu dieser Uhrzeit | `at("22:30")[!fenster]` |

Dieselben Operatoren können statt der Zeit das Aufwecken durch einen Eingang zählen: `after(3, taster)` gilt beim
dritten und jedem weiteren Aufwecken durch `taster` seit dem Betreten des Zustands, `at(3, taster)` nur beim dritten,
`every(2, taster)` bei jedem zweiten und `before(3, taster)` bei den ersten beiden. Diese Übergänge werden nur beim
Aufwecken durch diesen Eingang geprüft, das Aufwecken, das den Zustand betreten hat, zählt nicht mit.

`at("sunset")` und `at("22:30")` werden nicht ab dem Betreten des Zustands gemessen: Solange der Zustand aktiv ist,
gelten sie einmal am Tag zu dieser Zeit. Astro-Ereignisse: `sunrise`, `sunriseEnd`, `goldenHourEnd`, `solarNoon`,
`goldenHour`, `sunsetStart`, `sunset`, `dusk`, `nauticalDusk`, `night`, `nadir`, `nightEnd`, `nauticalDawn`, `dawn`,
berechnet für den Standort aus den ioBroker-Systemeinstellungen. Findet ein Ereignis an einem Tag nicht statt
(Polargebiete), gilt der Übergang an diesem Tag nicht.

Die Bedingung von `after(n, einheit, bedingung)` wird bei jedem Aufwecken geprüft. Sie sollte daher von Eingängen und
Variablen abhängen, nicht von Funktionen wie `isTimeBetween()`, die sich ohne Aufwecken ändern. In Bedingungen und
Aktionen liefern `elapsed(einheit)` und `duration(bedingung, einheit)` die Zeiten als Zahl (siehe Hilfsfunktionen).
Die Zähler und die Zeiten von `after(n, einheit, bedingung)` laufen nach einem Neustart des Adapters weiter.

## Wo eine Variable verwendet wird

Wenn du im Reiter **Variablen** eine Variable aufklappst, zeigt **Verwendet in** (ein Klick klappt es auf) die Zustände, Übergänge und
Funktionsblöcke, die sie verwenden, mit der Stelle (z.B. `entry`, Bedingung, Aktion) und ob die Variable dort gelesen
oder geschrieben wird. Ein Klick auf einen Eintrag wählt das Element aus und verschiebt die Ansicht dorthin. Es zählen
nur echte Verwendungen: nicht der Name in einem Text oder Kommentar und nicht eine gleichnamige lokale Variable, die im
Code deklariert wird.

## Wann Eingänge das Chart aufwecken

Jeder Eingang hat im Reiter **Variablen** unter **Optionen zum Aufwecken** drei Einstellungen (ein Klick klappt sie
auf, die Schaltfläche zeigt „angepasst“, wenn eine davon vom Standard abweicht):

| Einstellung | Werte | Standard |
|---|---|---|
| **Aufwecken bei** | jeder Aktualisierung / nur bei Wertänderung | jeder Aktualisierung |
| **Bestätigt (ack)** | egal / nur bestätigte Werte (`ack=true`) / nur Befehle (`ack=false`) | egal |
| **Entprellen (ms)** | das Chart wird erst geweckt, wenn der Eingang so lange keine Aktualisierung bekommen hat, mit dem letzten Wert | 0 (aus) |

Aktualisierungen, die wegen ack aussortiert werden, ändern die Variable nicht. Sie enthält dann z.B. nur bestätigte Werte.

## Aktionen

Aktionen und Bedingungen sind JavaScript. Alle Variablen des Charts sind direkt über ihren Namen
verfügbar, dazu `Math`, `Date`, `JSON` usw. sowie `log("Text")` zum Schreiben ins ioBroker-Log.

| Aktion | Wird ausgeführt |
|---|---|
| `entry` | beim Betreten des Zustands |
| `during` | bei jedem Aufwecken des Charts, solange der Zustand aktiv ist und keiner seiner ausgehenden Übergänge genommen wird |
| `exit` | beim Verlassen des Zustands |

## Verschachtelte Zustände

Lass einen Zustand über einem anderen los, um ihn zum **Unterzustand** zu machen, und zieh ihn wieder
heraus, um das rückgängig zu machen. Beim Ziehen wird der Zustand hervorgehoben, in den er verschoben
würde. Jede Ebene hat ihren eigenen Startzustand (Punkt mit Pfeil).

- Beim Betreten eines Superstates wird auch sein Start-Unterzustand betreten (oder der Unterzustand,
  auf den der Übergang zeigt). Beim Verlassen wird zuerst der aktive Unterzustand verlassen.
- Bei jedem Aufwecken wird jeder aktive Zustand in dieser Reihenfolge bearbeitet, beginnend mit dem äußersten:
  1. Übergänge, die den Zustand verlassen, 2. seine `during`-Aktion, 3. seine **inneren Übergänge**,
  4. sein aktiver Unterzustand. Die Übergänge eines Superstates haben also Vorrang vor denen seiner Unterzustände.
- Ein Übergang von einem Zustand zu einem seiner eigenen Unterzustände ist ein **innerer Übergang**
  (Punkt am Anfang): Der Zustand bleibt aktiv, nur sein aktiver Unterzustand wird verlassen, seine
  eigenen `entry`/`exit` laufen nicht. Mit der Option **Elternzustand verlassen und neu betreten** wird
  er stattdessen verlassen und neu betreten.

### History-Junction

Mit der Option **Zum zuletzt aktiven Unterzustand zurückkehren (History)** eines Zustands mit Unterzuständen geht es
beim Betreten in den Unterzustand zurück, der beim letzten Verlassen aktiv war, statt in seinen Startzustand. Wie bei
Stateflow zeigt der Zustand einen Kreis mit einem **H**. Beispiel: ein Zustand „Auto“ mit den Unterzuständen „Eco“
und „Komfort“ und ein Zustand „Manuell“. Nach „Manuell“ kehrt das Chart nach „Komfort“ zurück, wenn das vorher aktiv
war.

- Der Startzustand gilt nur beim ersten Betreten des Zustands und nach einem Start ohne gespeicherten Zustand
  (z.B. nach `reset` oder einem geänderten Chart).
- Sie gilt für alle Übergänge, die am Zustand enden, auch für seine Selbstübergänge und die aus seinen
  Unterzuständen. Ein Übergang zu einem seiner Unterzustände betritt wie gewohnt diesen Unterzustand.
- Gemerkt wird nur der direkte Unterzustand (flache History): Dessen eigene Unterzustände starten in ihrem
  Startzustand, außer er hat selbst eine History-Junction.
- Die History bleibt bei einem Neustart des Adapters erhalten, wie die aktiven Zustände.

## Parallele Zustände

Mit der Option **Unterzustände sind parallel (UND)** eines Zustands sind alle seine Unterzustände gleichzeitig aktiv
statt genau einer, z.B. „Heizung“ und „Fenster“ in einem Zustand „Zuhause“. Die Option **Zustände der obersten Ebene
sind parallel (UND)** des Charts macht dasselbe für die oberste Ebene. Wie bei Stateflow haben parallele Zustände einen
gestrichelten Rahmen und zeigen oben rechts ihre Position in der Ausführungsreihenfolge. Sie haben keinen Startzustand.

- Beim Betreten des Elternzustands werden alle parallelen Zustände betreten (jeder mit seinem Start-Unterzustand), in
  ihrer Ausführungsreihenfolge. Beim Verlassen werden sie in umgekehrter Reihenfolge verlassen.
- Bei jedem Aufwecken wird nach dem Elternzustand (seinen Übergängen und seiner `during`-Aktion) jeder parallele
  Zustand in seiner Ausführungsreihenfolge bearbeitet, siehe oben. Ein Übergang in einem von ihnen hält die anderen
  nicht auf, jeder kann also im selben Aufwecken einen Übergang nehmen. Ein Übergang, der den Elternzustand verlässt,
  beendet die Bearbeitung der übrigen.
- Die Ausführungsreihenfolge wird in den Eigenschaften der parallelen Zustände festgelegt: kleinere zuerst, Zustände
  ohne Zahl nach den anderen.
- Übergänge zwischen parallelen Zuständen oder zwischen ihren Unterzuständen sind nicht möglich, beide sind ohnehin
  aktiv.
- `activeState` enthält alle aktiven Zustände, durch Kommas getrennt, z.B. `Zuhause.Heizung.An, Zuhause.Fenster.Zu`.

## Hilfsfunktionen

In Bedingungen, Aktionen und Funktionsblöcken:

| Funktion | Zweck |
|---|---|
| `log(text, stufe)` | schreibt ins ioBroker-Log, Stufe `"debug"`, `"info"` (Standard), `"warn"` oder `"error"` |
| `setState(id, wert, ack)` | schreibt einen beliebigen Datenpunkt, `ack` ist standardmäßig `false` |
| `setStateDelayed(id, wert, ms, ack)` | schreibt verzögert, wird beim Anhalten des Charts verworfen |
| `sendTo(instanz, befehl, nachricht)` | sendet eine Nachricht an einen Adapter, z.B. `sendTo("telegram.0", "send", { text: "Fenster offen" })` |
| `isTimeBetween("22:00", "06:00")` | wahr, wenn die aktuelle Uhrzeit im Bereich liegt, auch über Mitternacht |
| `isDaytime()` | wahr zwischen Sonnenaufgang und Sonnenuntergang |
| `astroTime("sunset", minuten)` | Zeitpunkt eines Astro-Ereignisses heute als `Date`: `sunrise`, `sunset`, `dawn`, `dusk`, `solarNoon`, ... |
| `hasChanged(variable)` | wahr, wenn sich die Variable geändert hat, siehe unten |
| `hasChangedFrom(variable, wert)` | wahr, wenn sich die Variable geändert hat und vorher `wert` war |
| `hasChangedTo(variable, wert)` | wahr, wenn sich die Variable auf `wert` geändert hat, z.B. `hasChangedTo(taster, true)` für eine steigende Flanke |
| `getState("id")` | liest einen beliebigen ioBroker-Datenpunkt: `{ val, ack, ts, lc }`, `null` wenn es ihn nicht gibt, z.B. `[getState("0_userdata.0.lux").val < 50]`. Die ID muss als Text dastehen: Der Adapter liest diese Datenpunkte beim Start des Charts und hält sie aktuell. Anders als Eingänge wecken sie das Chart nicht |
| `elapsed(einheit)` | Zeit seit Betreten des Zustands (in Bedingungen von Übergängen: des Quellzustands), Einheit `sec` (Standard), `msec` oder `min`, z.B. `[elapsed(min) > 10]` |
| `duration(bedingung, einheit)` | Zeit, die die Bedingung ununterbrochen wahr ist, gemessen beim Aufwecken, Einheit `sec` (Standard), `msec` oder `min`. Weckt das Chart nicht, dafür gibt es `after(n, einheit, bedingung)` |

`isDaytime()` und `astroTime()` nutzen den Standort aus den ioBroker-Systemeinstellungen. Datenpunkte, deren Änderung
das Chart wecken soll, werden als Eingänge angelegt, `getState()` ist für Datenpunkte, die nur in einer Bedingung oder
Aktion gebraucht werden. Zeitabhängige Funktionen wecken das Chart nicht von selbst, sie werden beim Aufwecken
ausgewertet, für eine Uhrzeit gibt es `at("22:30")`.

Die **Änderungserkennung** funktioniert wie in Stateflow: Sie vergleicht den Wert der Variablen zu Beginn des
aktuellen Aufweckens mit ihrem Wert zu Beginn des vorherigen. Eingänge, Ausgänge und lokale Variablen lassen sich
prüfen. Eine Aktualisierung mit demselben Wert ist keine Änderung, ebenso wenig ein Aufwecken durch einen anderen
Eingang oder einen Timer. `[hasChangedTo(taster, true)]` ist also nur einmal pro Tastendruck wahr. Beim Aufwecken
nach dem Start hat sich noch nichts geändert. Ändert eine Aktion eine lokale Variable, sieht man das erst beim
nächsten Aufwecken, auch im Super-Step. Objekte und Arrays werden nach ihrem Inhalt verglichen.

## Funktionsblöcke

**Funktion hinzufügen** legt einen Block für eigenes JavaScript an. Er wird beim Start des Charts
einmal ausgeführt. Alle darin deklarierten Funktionen und Konstanten können in jeder Bedingung und
Aktion des Charts verwendet werden:

```js
const LIMIT = 22;

function zuWarm(temp) {
    return temp > LIMIT;
}
```

Beschriftung eines Übergangs: `[zuWarm(temperatur)]{heizung = false;}`

## Kommentare und Notizen

- **Kommentar:** Zustände, Übergänge, Funktionsblöcke und das Chart selbst haben in ihren Eigenschaften ein Feld
  **Kommentar**. Eine Sprechblase auf der Zeichenfläche zeigt, dass es einen Kommentar gibt, der Kommentar erscheint
  als Tooltip (beim Überfahren oder Antippen).
- **Notizen** (Symbol **Notiz hinzufügen** in der Werkzeugleiste) sind freie Texte auf der Zeichenfläche, wie
  Haftzettel. Lass eine Notiz über einem Zustand los, dann bewegt sie sich mit ihm.
- **Farbe:** Zustände sind hellgelb, unter **Farbe** in ihren Eigenschaften lässt sich eine andere Farbe wählen, z.B.
  um zusammengehörige Zustände oder Fehlerzustände hervorzuheben. Jede zweite Ebene verschachtelter Zustände
  (Unterzustände, deren Unter-Unter-Unterzustände usw.) ist etwas dunkler, damit sie sich vom Elternzustand abhebt.
  Funktionsblöcke haben immer einen hellgrauen Hintergrund. Im dunklen Theme werden die Farben abgedunkelt.
- **Rechtwinklige Übergänge:** Mit dieser Option in den Eigenschaften des Charts bestehen die Pfeile aus waagerechten
  und senkrechten Linien statt aus Kurven. Zustände nebeneinander oder untereinander werden mit einer geraden Linie
  verbunden, in der Mitte des Bereichs, in dem sie sich überlappen.

Kommentare, Notizen und Farben haben keinen Einfluss auf die Ausführung. Sie stehen im generierten Code und in exportierten
Dateien, und wenn sie sich ändern, wird der Zustand nach einem Neustart trotzdem wiederhergestellt.

## Zustände und Übergänge deaktivieren

Die Option **Deaktiviert** in den Eigenschaften eines Zustands oder Übergangs schaltet ihn ab, wie Auskommentieren im
Code. Er bleibt im Chart und lässt sich jederzeit wieder einschalten.

- Ein deaktivierter **Übergang** wird nie genommen.
- Ein deaktivierter **Zustand** wird nie betreten. Seine Unterzustände und alle Übergänge von und zu ihm sind ebenfalls
  deaktiviert.
- Deaktivierte Zustände und Übergänge werden hellgrau dargestellt und nicht geprüft, sie dürfen also unfertigen Code
  enthalten. **Code anzeigen** lässt sie weg und nennt sie am Anfang.
- Ist der Startzustand einer Ebene deaktiviert, startet das Chart stattdessen im ersten aktiven Zustand dieser Ebene,
  und die Prüfung meldet eine Warnung.
- Deaktivieren oder Aktivieren ändert die Logik: Nach dem Speichern startet ein laufendes Chart neu im Startzustand.

## Prüfung des Charts

Während du bearbeitest, prüft der Editor das Chart. Fehler erscheinen rot, Warnungen orange, beide am Zustand,
Übergang, Funktionsblock oder an der Variablen, die Meldung steht im Tooltip des Symbols (beim
Überfahren oder Antippen). Hinweise zeigt nur ein blaues
Symbol. Beim Start eines Charts schreibt der Adapter Fehler und Warnungen ins Log, Hinweise nur mit der Log-Stufe
debug.

- **Code:** Syntaxfehler, unbekannte Variablen und Events, ungültige Zeitlogik, Schreiben eines Eingangs (Warnung).
  Sie werden auch in den Code-Editoren unterstrichen.
- **Datenpunkte von Eingängen und Ausgängen** (Warnung): Es ist kein Datenpunkt gewählt, oder er existiert in ioBroker
  nicht, z.B. wegen eines Tippfehlers. Dann wird das Chart von dem Eingang nie geweckt, oder es schreibt ins Leere.
  Der Adapter schreibt beim Start des Charts außerdem eine Warnung ins Log.
- **Zustände, die nie aktiv werden** (Warnung): Kein Übergang führt zu ihnen, und sie werden auch nicht als
  Startzustand betreten. Gemeldet wird nur der oberste, seine Unterzustände werden ebenfalls nie aktiv.
- **Übergänge, die nie genommen werden** (Warnung): Ein Übergang davor (mit höherer Priorität) gilt immer, d.h. er hat
  keine Bedingung (oder eine, die immer erfüllt ist) und keine Zeitlogik, und kein Event oder dasselbe Event. Oder einer
  davor hat dasselbe Event, dieselbe Zeitlogik und dieselbe Bedingung. Die Übergänge, die einen Zustand verlassen,
  werden vor seinen inneren Übergängen geprüft, wie beim Ausführen des Charts.
- **Bedingungen, die nie erfüllt sind** (Warnung, z.B. `[1 > 2]`) oder immer (Hinweis, z.B. `[true]`). Ausgewertet
  werden nur Bedingungen, die nicht von Variablen oder Funktionen abhängen.
- **Zustände, die nie verlassen werden** (Hinweis): Weder der Zustand noch ein Zustand, der ihn enthält, hat einen
  ausgehenden Übergang. Das ist oft gewollt, z.B. bei einem Zustand „Fehler“. Zustände mit `during`-Aktion werden
  nicht gemeldet, sie arbeiten, solange sie aktiv sind.
- **Variablen:** ein Ausgang, der nie geschrieben wird (Warnung), ein Eingang, der nicht verwendet wird und das Chart
  nur aufweckt (Hinweis), eine lokale Variable, die nicht verwendet oder nur geschrieben wird (Hinweis).

Welche Werte die Datenpunkte haben werden, kann die Prüfung nicht wissen. Ob eine Bedingung mit Variablen je erfüllt
wird, zeigt die [Simulation](#simulation).

## Ein laufendes Chart beobachten

Während ein Chart läuft, zeigt der Editor, was es tut:

- Die **aktiven Zustände** haben einen breiten grünen Rahmen mit hellgrünem Schein.
- **Live-Werte** (Tafel oben links auf der Zeichenfläche, ein- und ausgeschaltet mit dem Symbol **Live-Werte** in der
  Werkzeugleiste, grün, solange sie angezeigt werden): die aktuellen Werte aller Variablen. Sie stehen auch in der Zeile jeder Variable im Reiter **Variablen**.
- Ein **Übergang leuchtet kurz auf**, wenn das Chart ihn nimmt.
- **Angehaltenes Chart:** Der Editor zeigt weiter den Stand beim Anhalten, eingefroren: Die zuletzt aktiven Zustände
  haben einen grauen statt grünen Rahmen, die Live-Werte sind grau und mit der Zeit überschrieben, von der sie stammen.
  Das hilft herauszufinden, was passiert ist, z.B. nachdem der Adapter ein Chart wegen eines Fehlers angehalten hat.
  Beim Starten des Charts werden sie ersetzt.
- Der Reiter **Verlauf** listet die Starts des Charts und die genommenen Übergänge, der neueste zuerst: wann, von
  welchem Zustand zu welchem, ausgelöst durch welchen Eingang oder einen Timer (`after`), und welche Zustände danach
  aktiv waren. Ein Klick auf einen Übergang wählt ihn im Chart aus. Der Adapter behält die letzten 200 Ereignisse,
  auch bei geschlossenem Editor und über einen Neustart hinweg. **Verlauf leeren** löscht sie.

Live-Werte und Verlauf kommen vom laufenden Chart. Sie beziehen sich also auf das gespeicherte Chart, nicht auf
ungespeicherte Änderungen im Editor.

## Simulation

Der Knopf mit dem Kolben in der Werkzeugleiste startet eine **Simulation**: Das Chart läuft so, wie es im Editor zu
sehen ist, auch mit ungespeicherten Änderungen, aber im Haus wird nichts geschaltet.

- Das echte Chart wird angehalten, solange die Simulation läuft.
- Die Eingänge beginnen mit ihren aktuellen Werten. Danach ändern sie sich nur, wenn du sie in der Tafel oben links
  setzt: Wahrheitswerte mit einem Schalter, andere Werte im Textfeld mit Enter (eine Zahl, `true`/`false` oder Text).
  Der Blitz neben einem Eingang weckt das Chart mit seinem Event, ohne seinen Wert zu ändern. Echte Änderungen der
  Eingänge werden ignoriert.
- Ausgänge, `setState()`, `setStateDelayed()` und `sendTo()` werden nicht ausgeführt. Der Verlauf zeigt sie als
  **Nicht ausgeführt: …**, die Live-Werte zeigen die simulierten Werte der Ausgänge. `getState()` liest die echten
  Datenpunkte.
- Timer und Zeitlogik laufen in Echtzeit, außer du spulst die Zeit vor (siehe unten).
- Aktive Zustände, Live-Werte und Verlauf funktionieren wie beim echten Chart, die Ereignisse der Simulation sind im
  Verlauf markiert. Der gespeicherte Zustand des echten Charts wird nicht verändert.
- **Simulation beenden** beendet sie, danach macht das echte Chart dort weiter, wo es vorher war. Die Simulation endet
  auch beim Speichern des Charts, bei einem Neustart des Adapters, bei der Auswahl eines anderen Charts und nach zwei
  Minuten, wenn der Editor geschlossen wurde.

Die Leiste oben auf der Zeichenfläche zeigt die simulierte Zeit, den nächsten Timer und den Zustand der Simulation:

- **Zeit vorspulen:** Der Vorspul-Knopf springt zum nächsten Timer, z.B. ans Ende von `after(2, min)`, die Knöpfe
  **+1 min**, **+10 min** und **+1 h** lassen Zeit vergehen. Die bis dahin fälligen Timer lösen in ihrer Reihenfolge
  aus, `every(...)` so oft, wie es fällig ist. Alles, was von der Zeit abhängt, nutzt die simulierte Zeit: `elapsed()`,
  `isTimeBetween()`, `at("22:30")`, Astro-Ereignisse und die Zeiten im Verlauf.
- **Pause:** Die folgenden Ereignisse (von Hand gesetzte Eingänge, Events, Timer) warten, statt verarbeitet zu werden.
  **Einzelschritt** verarbeitet das nächste wartende Ereignis, **Fortsetzen** verarbeitet alle und läuft weiter.
- **Haltepunkte:** In den Eigenschaften eines Zustands oder Übergangs hält **Haltepunkt** die Simulation an, wenn der
  Zustand betreten oder der Übergang genommen wird. Er wird als roter Punkt angezeigt und greift auch bei den
  Startzuständen direkt nach dem Start. Die Simulation hält nach dem Schritt an, in dem der Haltepunkt erreicht wurde,
  der Verlauf zeigt, wo. Mit Super-Step hält sie nach dem Übergang, der Rest der Kette ist der nächste Schritt.
  Haltepunkte werden nicht im Chart gespeichert, sie gehen beim Neuladen des Editors verloren.

## Import und Export

- **Chart exportieren** (Symbol in der Werkzeugleiste des Editors) speichert das Chart als JSON-Datei, mit
  ungespeicherten Änderungen.
- **Als Bild exportieren** (Symbol in der Werkzeugleiste des Editors) speichert das ganze Chart als PNG-Bild, auch die
  Teile außerhalb des sichtbaren Bereichs, z.B. für eine Frage im Forum. Es sieht aus wie im Editor, ohne Auswahl,
  Minikarte und Tafeln.
- **Alle Charts exportieren** (Symbol über der Chart-Liste) speichert alle gespeicherten Charts in einer Datei.
- **Charts importieren** (Symbol über der Chart-Liste) fügt die Charts einer solchen Datei als neue Charts hinzu,
  vorhandene Charts werden nicht verändert. Die Datei wird vorher geprüft (Aufbau, IDs, Verweise zwischen Zuständen
  und Übergängen).

Importierte Charts sind **angehalten**: Ihre Variablen können auf Datenpunkte eines anderen Systems verweisen. Prüfe sie
im Reiter **Variablen** und starte das Chart dann mit dem Knopf in der Chart-Liste.

## Frühere Versionen

Beim Speichern eines Charts wird die Version davor aufbewahrt, die letzten 10 davon. Sie stehen unter **Frühere
Versionen** in den Eigenschaften des Charts (Klick auf eine freie Stelle der Zeichenfläche), mit dem Zeitpunkt, zu dem
sie ersetzt wurden. **Wiederherstellen** lädt eine Version als ungespeicherte Änderung in den Editor: ansehen, mit
Strg+Z zurücknehmen oder speichern. Ob das Chart läuft oder angehalten ist, ändert sich dadurch nicht. Die früheren
Versionen liegen im Objekt des Charts und sind nicht Teil exportierter Dateien.

## Vom Adapter angelegte Datenpunkte

Für jedes Chart legt der Adapter unter `statechart.<instanz>.charts.<chart>` an:

| Datenpunkt | Inhalt |
|---|---|
| `activeState` | Name des aktiven Zustands, verschachtelte Zustände als `Eltern.Kind`, parallele durch Kommas getrennt. Leer, solange das Chart angehalten ist |
| `activeStateIds` | IDs aller aktiven Zustände als JSON. Ein angehaltenes Chart behält die letzten |
| `snapshot` | Gespeicherter Zustand des Charts (aktive Zustände, wann sie betreten wurden, lokale Variablen), siehe unten |
| `values` | Aktuelle Werte aller Variablen als JSON. Ein angehaltenes Chart behält die letzten |
| `history` | Die letzten 200 Ereignisse (Starts und genommene Übergänge) als JSON. Schreiben ohne ack leert ihn |
| `simulation` | `true`, solange das Chart als Simulation aus dem Editor läuft |
| `simulationStatus` | Status der Simulation als JSON: angehalten, Zeitversatz, wartende Ereignisse, nächster Timer, Haltepunkt |
| `error` | Letzter Fehler oder letzte Warnung des Charts, z.B. `On/entry: boom` oder `Stopped: …`, siehe [Fehler im Code](#fehler-im-code). Wird beim Start des Charts geleert und bleibt erhalten, wenn es wegen eines Fehlers angehalten wird. Meldungen von `log()` erscheinen hier nicht, ebenso wenig Probleme einer Simulation |

Das Chart selbst ist im Objekt `statechart.<instanz>.charts.<chart>` gespeichert.

### Ein Chart aus vis oder Skripten steuern

Drei Datenpunkte steuern ein Chart. Sie reagieren auf Befehle (ohne ack geschrieben), der Adapter bestätigt sie mit ack:

| Datenpunkt | Schreiben | Wirkung |
|---|---|---|
| `enabled` | `false` / `true` | Hält das Chart an oder startet es in seinem Startzustand, wie ▶ und ⏸ in der Chart-Liste oder in der Werkzeugleiste. Der Datenpunkt zeigt immer, ob das Chart läuft, auch wenn es im Editor gestartet oder angehalten wurde |
| `reset` | `true` | Startet ein laufendes Chart neu in seinem Startzustand, die entry-Aktionen der Startzustände laufen. Ein angehaltenes Chart bleibt angehalten |
| `event` | Name eines Eingangs | Weckt das Chart mit dem Event dieses Eingangs, ohne seinen Wert zu ändern: Übergänge wie `taster[...]` und Zählausdrücke wie `after(3, taster)` reagieren so, als wäre der Eingang aktualisiert worden. Andere Namen werden als Warnung geloggt |

Beispiel für ein Skript im JavaScript-Adapter: `setState("statechart.0.charts.licht.reset", true);`

## Neustart des Adapters

Nach einem Neustart des Adapters oder von ioBroker macht jedes Chart in den Zuständen weiter, die
vorher aktiv waren, mit seinen lokalen Variablen. Die entry-Aktionen laufen nicht noch einmal, und Timer
laufen mit ihrer Restzeit weiter. Ein Timer, der abgelaufen ist, während der Adapter gestoppt war, greift
gleich nach dem Start. Wie nach jedem Start wacht das Chart dann einmal auf, so werden Änderungen der
Eingänge während des Stopps bemerkt.

Das gilt auch nach dem Speichern im Editor, wenn nur Positionen, Größen, Kommentare, Notizen oder Farben
geändert wurden. Im Startzustand beginnt das Chart stattdessen, wenn seine Logik geändert wurde (Zustände,
Übergänge, Variablen, Funktionsblöcke), nach dem Anhalten und wenn die Option **Zustand nach Neustart
wiederherstellen** in den Chart-Eigenschaften ausgeschaltet ist. Variablen, die in
Funktionsblöcken deklariert sind, werden nicht wiederhergestellt.

## Ausführung und Unterschiede zu anderen Statechart-Werkzeugen

- Der Adapter führt die Charts mit [XState](https://stately.ai/docs/xstate) aus.
- Jede Änderung eines Eingangs weckt das Chart einmal auf, ebenso ein ablaufendes `after(...)` und der Start des
  Charts (auch nach dem Wiederherstellen). Übergänge ohne Event, z.B. ohne Beschriftung, werden bei jedem Aufwecken
  geprüft und greifen deshalb direkt nach dem Start, wenn ihre Bedingung wahr ist.
- Standardmäßig wird pro Aufwecken nur ein Übergang genommen, ein folgender wartet auf das nächste Aufwecken. Mit der
  Chart-Option **Weiterschalten, bis kein Übergang mehr gilt (Super-Step)** wird das Chart nach einem Übergang sofort
  erneut geprüft, bis kein Übergang mehr gilt, wie bei der Super-Step-Semantik von Stateflow. Das Event eines
  Eingangs zählt nur für den ersten Übergang eines Aufweckens, during-Aktionen können mehrmals laufen. Zum Schutz vor
  Schleifen werden pro Aufwecken höchstens 100 Übergänge genommen, danach wird eine Warnung geloggt.
- `{aktion}` wird während des Übergangs ausgeführt, also nach `exit` des alten und vor `entry` des
  neuen Zustands. Eine eigene Condition Action und `/aktion` werden (noch) nicht unterstützt.
- Übergänge werden wie bei Stateflow ausgewählt (außen vor innen, siehe oben), XState führt sie nur aus.
  Reines XState würde die Übergänge der Unterzustände zuerst prüfen.
- Zeitlogik wird in Echtzeit gemessen, nicht in Zeitschritten: Bedingungen werden nur beim Aufwecken geprüft.
  `after(n, einheit, bedingung)` ersetzt das bei Stateflow übliche `[duration(bedingung) > n]`, das ein Aufwecken
  zum richtigen Zeitpunkt bräuchte.
- Bedingungen und Aktionen sind JavaScript, nicht MATLAB- oder C-Syntax.

## Fehler im Code

Bedingungen, Aktionen und Funktionsblöcke laufen im Prozess des Adapters, jedes Chart in einem eigenen
JavaScript-Kontext. Alle Charts teilen sich den Prozess, deshalb schützt der Adapter sie voreinander:

- **Exception:** Sie wird mit Chart und Stelle als Warnung geloggt, der Rest dieser Bedingung oder Aktion wird
  übersprungen. Das Chart läuft weiter.
- **Zeitlimit:** Jede Bedingung und Aktion muss innerhalb von 1 Sekunde fertig sein. Ein Chart, das es überschreitet,
  z.B. wegen einer Endlosschleife, wird sofort angehalten wie mit ⏸, der Grund steht als Fehler im Log. Behebe den
  Fehler und starte es wieder. Eine Simulation wird stattdessen beendet.
- **Promises:** Callbacks von Promises (`.then()`, `async`-Funktionen) laufen direkt nach dem Code, der sie erzeugt,
  innerhalb seines Zeitlimits. Eine Exception darin wird wie jede andere geloggt und startet den Adapter nicht neu.
- **Schreibzugriffe:** Ein Chart darf höchstens 1000-mal pro Minute schreiben (Ausgänge, `setState()`,
  `setStateDelayed()`, `sendTo()`), weit mehr, als ein Chart braucht. Ein Chart, das mehr schreibt, z.B. wegen einer
  Rückkopplung über die eigenen Eingänge, wird angehalten wie nach einer Zeitüberschreitung.

Der letzte Fehler oder die letzte Warnung eines Charts steht außerdem in seinem Datenpunkt `error`, z.B. um ihn in vis
anzuzeigen oder sich benachrichtigen zu lassen.

## Einschränkungen

- Verbindungspunkte (Verzweigungen von Übergängen, Connective Junctions) werden nicht unterstützt. Verzweigungen
  entstehen stattdessen durch mehrere Übergänge mit Prioritäten, siehe [Beschriftung von Übergängen](#beschriftung-von-übergängen).
- Bedingungen und Aktionen laufen in einem eigenen JavaScript-Kontext mit Zeitlimit (siehe
  [Fehler im Code](#fehler-im-code)), das ist aber **keine Sicherheits-Sandbox**: Wer Charts bearbeiten darf, kann im Adapter beliebigen Code
  ausführen, wie beim JavaScript-Adapter auch.