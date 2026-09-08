---
title:       "Datenaufzeichnung"
lastChanged: "08.09.2026"
---

# Datenaufzeichnung

Ein Datenpunkt kennt nur seinen aktuellen Wert. Wer wissen will, wie warm es
gestern Nacht war oder wie viel Strom letzte Woche geflossen ist, braucht einen
Adapter, der mitschreibt. Drei stehen zur Wahl, und die Entscheidung fällt früh,
weil ein späterer Wechsel Arbeit macht.

?> Nicht zu verwechseln mit den beiden **internen** Datenbanken für Objekte und
Zustände. Die halten den aktuellen Stand des Systems und werden unter
[Redis](/docs/config/redis.md) behandelt. Hier geht es um den Verlauf.

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

## Ansehen

Aufgezeichnete Werte werden als Diagramm ausgewertet, üblicherweise mit
`echarts`. Der Weg dorthin steht unter
[Diagramme](/docs/tutorial/flot.md).
