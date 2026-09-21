---
title:       "Datenaufzeichnung"
lastChanged: "21.09.2026"
---

# Datenaufzeichnung

Ein Datenpunkt kennt nur seinen aktuellen Wert. Wer wissen will, wie warm es
gestern Nacht war oder wie viel Strom letzte Woche geflossen ist, braucht einen
Adapter, der mitschreibt. Drei stehen zur Wahl, und die Entscheidung fällt früh,
weil ein späterer Wechsel Arbeit macht.

?> Nicht zu verwechseln mit den beiden **internen** Datenbanken für Objekte und
Zustände. Die halten den aktuellen Stand des Systems und werden unter
[Redis](/docs/config/redis.md) behandelt. Hier geht es um den Verlauf.

<img src="media/aufzeichnung.webp" width="900" alt="Ein Datenpunkt und die drei Adapter, die seinen Verlauf mitschreiben" />

*Ein Datenpunkt kennt nur seinen jetzigen Wert. Wer den Verlauf braucht,
schaltet die Aufzeichnung ein und wählt, wohin sie geht.*

## Was der Verlauf ist und was nicht

Ein Zustand hat genau einen Wert: den jetzigen. Kommt ein neuer, ist der alte
weg. Die Zustandsdatenbank ist ein Zettel, auf dem immer der letzte Stand steht,
kein Heft, in dem die Seiten bleiben.

Ein Aufzeichnungsadapter hängt sich daneben: Er hört bei den Datenpunkten mit,
die Sie ihm nennen, und schreibt jeden neuen Wert zusätzlich mit Zeitstempel
weg. Erst daraus entsteht ein Verlauf, den ein Diagramm zeichnen kann.

Daraus folgen vier Dinge, die regelmäßig für Überraschungen sorgen:

* **Aufgezeichnet wird ab dem Einschalten.** Rückwirkend gibt es nichts, auch
  nicht von gestern.
* **Aufgezeichnet wird je Datenpunkt.** Nicht die Anlage wird eingeschaltet,
  sondern jeder einzelne Wert, den Sie später sehen wollen.
* **Der Verlauf steckt nicht in den internen Datenbanken.** Objekte und Zustände
  sind der jetzige Stand, der Verlauf liegt woanders, siehe
  [Redis](/docs/config/redis.md).
* **Das ioBroker-Backup enthält ihn nicht automatisch.** Es sichert Objekte,
  Zustände und Konfigurationen. Die aufgezeichneten Werte sind ein eigener
  Punkt in [BackItUp](/docs/config/backup.md).

?> In den [Systemeinstellungen](/docs/admin/settings.md)
steht unter *Standard-Historie*, welche Instanz vorgeschlagen wird, wenn ein
Dialog oder ein Diagramm nach der Quelle fragt. Das ist eine Voreinstellung,
keine Aufzeichnung: eingeschaltet wird weiterhin je Datenpunkt.

## Welcher Adapter

| Adapter | Legt ab | Passt, wenn |
| --- | --- | --- |
| **history** | Dateien im ioBroker-Datenverzeichnis | Wenige Datenpunkte, überschaubare Zeiträume, kein zusätzlicher Dienst gewünscht |
| **influxdb** | InfluxDB, eine Zeitreihendatenbank | Viele Datenpunkte über Jahre. Der übliche Weg für gewachsene Anlagen |
| **sql** | MySQL, PostgreSQL, MS-SQL oder SQLite | Eine solche Datenbank ist ohnehin vorhanden, oder die Daten sollen von anderen Programmen mitgelesen werden |

**history** speichert in zwei Stufen: die Werte landen zuerst im Arbeitsspeicher
und werden erst beim Erreichen einer eingestellten Anzahl in Dateien
geschrieben. Das schont die Karte, bedeutet aber auch, dass die zuletzt
gesammelten Werte bei einem harten Stromausfall verloren sind.

Die Dateien liegen in einem Ordner unterhalb von `/opt/iobroker/iobroker-data`,
ohne eigene Angabe in `history`, und darin je Tag ein Unterordner. Ein absoluter
Pfad wie `/mnt/history` ist ebenfalls möglich, etwa auf einen angehängten
Datenträger. Wo die Daten liegen, ist für die Sicherung wichtig, siehe unten.

?> Für den Anfang **history**. Er braucht keinen zweiten Dienst, und der
Umstieg auf InfluxDB ist später möglich, siehe unten.

!> Aufzeichnen heißt Schreiben, und Schreiben verbraucht eine SD-Karte. Wer
dauerhaft viele Werte mitschreibt, sollte das nicht auf einer SD-Karte tun,
sondern auf einer SSD oder in einer Datenbank auf einem anderen Rechner.

## Einschalten

Der Adapter wird installiert, eine Instanz angelegt, und danach wird **je
Datenpunkt** entschieden, ob er aufgezeichnet wird. Das geschieht im Reiter
[Objekte](/docs/admin/objects.md) über das Zahnrad am Ende der Zeile.

<img src="media/history_aufzeichnung_einschalten.webp" width="900" alt="Der Dialog Benutzerdefinierte Einstellungen mit eingeschalteter Aufzeichnung" />

*Das Zahnrad öffnet diesen Dialog. Jede installierte Aufzeichnungsinstanz
bekommt hier einen eigenen Abschnitt; der Haken bei **Aktiviert** schaltet den
Datenpunkt ein und blendet die Einstellungen darunter ein.*

In der Konfiguration der Instanz stehen die Voreinstellungen, die für jeden neu
eingeschalteten Datenpunkt gelten. Am Datenpunkt selbst lassen sie sich
überschreiben.

Aufgezeichnet wird **ab dem Einschalten**. Rückwirkend gibt es nichts.

Wie das Schritt für Schritt abläuft, steht unter
[Werte aufzeichnen](/docs/tutorial/history.md).

## Die Einstellungen, auf die es ankommt

| Einstellung | Wirkung |
| --- | --- |
| **Nur Änderungen aufzeichnen** | Fast immer richtig. Andernfalls entstehen auch dann Daten, wenn sich nichts tut. |
| **Minimale Abweichung** | Erst ab dieser Differenz wird geschrieben. Damit fällt das Rauschen eines Sensors weg. |
| **Entprellzeit** | Sperrt kurz nach einem Schreibvorgang. Hilft bei Werten, die im Sekundentakt zappeln. |
| **Aufbewahrung** | Wie lange die Werte behalten werden. Ohne Begrenzung wächst der Speicher unbegrenzt. |

Die vollständige Beschreibung aller Felder steht in der Dokumentation des
jeweiligen Adapters:
[history](/adapters/history),
[influxdb](/adapters/influxdb),
[sql](/adapters/sql).

## Was aufgezeichnet gehört und was nicht

Der häufigste Grund für ein System, das nach einem Jahr träge wird, ist nicht zu
wenig Rechenleistung, sondern dass jemand alles mitgeschrieben hat, weil er es
vielleicht einmal brauchen könnte.

* **Sinnvoll**: Temperaturen, Verbräuche, Füllstände, Schaltzustände, bei denen
  Sie später ablesen wollen, wann etwas passiert ist.
* **Nicht sinnvoll**: interne Datenpunkte der Adapter, Zähler, die ohnehin einen
  Verlauf enthalten, und alles, was Sie nie ansehen werden.

## Vom history-Adapter auf eine Datenbank umsteigen

Der history-Adapter bringt dafür Skripte mit, die im Verzeichnis
`/opt/iobroker/node_modules/iobroker.history/converter` liegen und mit `node`
aufgerufen werden. Der empfohlene Ablauf:

**1. Das neue Ziel einrichten und laufen lassen.** Den neuen Adapter
konfigurieren und dieselben Datenpunkte dort einschalten. Prüfen, dass die Werte
ankommen. In dieser Zeit wird doppelt geschrieben, in history und in das neue
Ziel. Das ist gewollt und der Grund, warum bei der Migration nichts verloren
geht.

**2. Den vorhandenen Bestand analysieren.** Das Analyse-Skript ermittelt, welche
Daten im Ziel bereits vorhanden sind, und legt das Ergebnis in JSON-Dateien ab.
Aufgerufen wird es im Verzeichnis der Konverter:

```bash
cd /opt/iobroker/node_modules/iobroker.history/converter
node analyzeinflux.js influxdb.0 info --deepAnalyze
```

Für eine SQL-Datenbank entsprechend:

```bash
node analyzesql.js sql.0 info
```

Der erste Parameter ist die Zielinstanz, der zweite die Protokollstufe.
`--deepAnalyze` erfasst zusätzlich, welche Werte je Tag schon vorhanden sind.
Ohne diese Angabe wird nur der jeweils früheste Wert ermittelt. Der Unterschied
zählt, wenn im Ziel bereits Lücken bestehen, die mitgefüllt werden sollen.

**3. Den history-Adapter stoppen und konvertieren.**

```bash
node history2db.js
```

Das Skript liest die JSON-Dateien aus Schritt 2 und überträgt nur, was noch
nicht da ist. Danach schreibt es die Dateien fort, sodass ein zweiter Lauf
normalerweise keine Duplikate erzeugt. Ohne vorherige Analyse lässt es sich auch
aufrufen, dann muss ein Startdatum als Parameter angegeben werden, und alles vor
diesem Zeitpunkt wird konvertiert. Der Vorgang kann lange dauern.

**4. Erst danach aufräumen.** Wenn die Werte im Ziel vollständig sind und die
Protokolle das bestätigen: die history-Daten löschen und den Adapter
deaktivieren.

!> Vor der Migration ein [Backup](/docs/config/backup.md) anlegen. Die alten
Daten erst löschen, wenn die neuen nachweislich vollständig sind, und dazu
stichprobenartig in ein Diagramm sehen, das weit zurückreicht.

Die vollständige Parameterliste der drei Skripte steht in der
[Dokumentation des history-Adapters](/adapters/history).

## Was bei einer Sicherung passiert

Hier gibt es einen Irrtum, der teuer werden kann: **ein ioBroker-Backup enthält
die aufgezeichneten Werte nicht.** Es sichert Objekte, Zustände und den
Dateispeicher, also den aktuellen Stand des Systems. Der Verlauf liegt woanders,
und das gilt für alle drei Adapter:

* Bei **history** liegen die Dateien zwar unterhalb von `iobroker-data`, sind
  aber kein Teil des ioBroker-Backups. Bei einem absoluten Pfad liegen sie
  ohnehin außerhalb.
* Bei **influxdb** und **sql** liegen die Daten in einer eigenen Datenbank, oft
  sogar auf einem anderen Rechner.

[BackItUp](/docs/config/backup.md) führt sie deshalb als **eigene Backup-Typen**,
die zusätzlich zum ioBroker-Backup angelegt werden: *History Daten*, *InfluxDB*,
*MySql*, *PostgreSQL* und *SQLite3*. Diese Schalter sind ab Werk **nicht**
gesetzt.

!> Wer aufzeichnet, schaltet im Sicherungsadapter den passenden Schalter
zusätzlich ein. Sonst steht nach einem Restore ein vollständig eingerichtetes
System da, in dem alle Diagramme leer sind.

## Wo Sie den Verlauf benutzen

Aufzeichnen ist die eine Hälfte, ihn wieder herauszuholen die andere. Dafür gibt
es mehrere Wege, und alle stellen dieselbe Frage: **aus welcher Quelle**. Wer
mehr als einen Aufzeichnungsadapter betreibt, gibt jedes Mal an, ob die Werte
aus `history`, `influxdb` oder `sql` kommen. Welche Instanz vorgeschlagen wird,
steht in den [Systemeinstellungen](/docs/admin/settings.md) unter
*Standard-Historie*.

### Als Diagramm im Admin

Der übliche Weg. Der Adapter `echarts` bringt einen eigenen Reiter in den Admin
mit. Dort stellen Sie ein Diagramm zusammen, weisen jeder Linie einen
aufgezeichneten Datenpunkt zu und speichern das Ergebnis als **Voreinstellung**.
Diese Voreinstellung ist es, die alle weiteren Wege wiederverwenden.

<img src="media/history_echarts.webp" width="900" alt="Der Reiter Diagramme mit der Liste der aufgezeichneten Datenpunkte und dem Verlauf" />

*Links stehen alle Datenpunkte, für die eine Aufzeichnung läuft, gruppiert nach
der Instanz, die sie schreibt. Ein Klick darauf zeichnet den Verlauf. Oben
rechts stellen Sie Zeitraum, Aggregation und Aktualisierung ein.*

?> Solange nichts aufgezeichnet wird, ist die Liste links leer. Das ist der
häufigste Grund für ein Diagramm, das sich nicht bauen lässt.

Schritt für Schritt steht das unter [Diagramme](/docs/tutorial/flot.md).

### Auf einer eigenen Seite

Eine gespeicherte Voreinstellung lässt sich ohne Visualisierung direkt aufrufen,
über den `web`-Adapter:

```
http://IP:8082/echarts/index.html?preset=echarts.0.MEINE-VOREINSTELLUNG
```

Das genügt für ein Wandtablet, das nur ein Diagramm zeigen soll, oder für ein
Lesezeichen am Rechner.

### In der Visualisierung

Für [vis und vis-2](/docs/viz/vis-2.md) gibt es ein Widget, das eine
Voreinstellung anzeigt. Sie wählen sie aus einer Liste aus, mehr ist nicht zu
tun.

Daneben gibt es Widgets, die den Verlauf nebenbei zeigen, ohne eigenes Diagramm.
In den [Material-Widgets](/docs/viz/widgets-material.md) etwa *Istwert mit
Diagramm*: zwei Messwerte groß, darunter der Verlauf als Fläche. Solche Widgets
bleiben leer, solange der Datenpunkt nicht aufgezeichnet wird.

### Im Skript

Der [JavaScript-Adapter](/docs/logic/javascript.md) liest den Verlauf mit
`getHistory`:

```javascript
const ende = Date.now();

getHistory(
    'history.0',
    {
        id: 'hm-rpc.0.ABC123.1.TEMPERATURE',
        start: ende - 24 * 3600000,
        end: ende,
        aggregate: 'average',
        step: 3600000,
    },
    (fehler, werte) => {
        if (fehler) {
            console.error(fehler);
            return;
        }
        werte.forEach(w => log(`${new Date(w.ts).toLocaleString()}: ${w.val}`));
    },
);
```

Lassen Sie die Instanz weg, wird die Standard-Historie aus den
Systemeinstellungen genommen. So kommen Sie an Werte, die kein Diagramm zeichnen
soll: der Verbrauch des Vormonats für eine Meldung, das Tagesmaximum für einen
Vergleich, der Zählerstand von Mitternacht.

### In Blockly

Dasselbe geht ohne Code. In [Blockly](/docs/logic/blockly.md) nehmen Sie den
Baustein **sendTo** und geben als Befehl `getHistory` an, als Ziel die Instanz
und als Parameter dieselben Angaben wie oben. Das Ergebnis kommt als Liste
zurück.

### Als Bild verschicken

`echarts` kann eine Voreinstellung **auf dem Server** zeichnen und als Bild
zurückgeben, ohne dass ein Browser beteiligt ist. Damit landet ein Diagramm in
einer Telegram-Nachricht oder in einer E-Mail:

```javascript
sendTo(
    'echarts.0',
    {
        preset: 'echarts.0.MEINE-VOREINSTELLUNG',
        renderer: 'png',
        width: 1024,
        height: 300,
        theme: 'dark',
    },
    ergebnis => {
        if (ergebnis.error) {
            console.error(ergebnis.error);
            return;
        }
        // ergebnis.data ist das Bild als Base64-Adresse
    },
);
```

Als Format stehen `svg`, `png`, `jpg` und `pdf` zur Wahl. Mit `fileName` legt
der Adapter das Bild stattdessen im Dateispeicher ab, mit `fileOnDisk` auf der
Festplatte.

### Mit anderen Programmen

Wer `influxdb` oder `sql` aufzeichnet, hat die Werte in einer gewöhnlichen
Datenbank liegen. **Grafana** liest sie direkt von dort, ohne ioBroker
dazwischen, und lohnt sich, sobald es um viele Auswertungen geht.

Für alle, die das Diagramm lieber selbst schreiben, gibt es den Adapter
[flexcharts](/adapters/flexcharts). Er stellt Apache ECharts ohne Oberfläche
bereit: die Diagrammbeschreibung entsteht im Skript oder als JSON in einem
Datenpunkt.

### Die Aggregation

Jeder dieser Wege fragt danach, und sie entscheidet, ob ein Diagramm lesbar ist
oder den Browser lahmlegt. Der Gedanke dahinter: der Zeitraum wird in gleich
große Abschnitte geteilt, und je Abschnitt kommt **ein** Wert zurück statt
aller.

| Aggregation | Ergebnis je Abschnitt |
| --- | --- |
| `average` | der Mittelwert. Die übliche Wahl für Temperaturen |
| `min`, `max` | der kleinste oder größte Wert |
| `minmax` | Anfang, Ende, Minimum und Maximum. Zeichnet Ausreißer mit, ohne alle Werte zu holen |
| `total` | die Summe. Für Verbräuche |
| `count` | die Anzahl der Werte |
| `none` | keine Zusammenfassung, alle Rohwerte |

Die Größe der Abschnitte geben Sie mit `step` in Millisekunden an oder mit
`count` als gewünschte Anzahl. Ohne beides sind es 500 Abschnitte.

?> `none` ist verlockend, weil es die echten Werte liefert. Bei einem Jahr
Temperaturen im Minutentakt sind das über eine halbe Million Punkte, und daran
scheitert jeder Browser. Für lange Zeiträume gehört eine Zusammenfassung dazu.

!> Bei jeder Aggregation außer `none` sind der erste und der letzte Punkt aus
Werten **außerhalb** des Zeitraums berechnet. Wer die Zahlen weiterrechnet,
etwa für eine Monatssumme, lässt diese beiden weg.
