---
chapters: {"pages":{"de/adapterref/iobroker.trashschedule/README.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/README.md"},"de/adapterref/iobroker.trashschedule/blockly.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/blockly.md"},"de/adapterref/iobroker.trashschedule/faq.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/faq.md"},"de/adapterref/iobroker.trashschedule/javascript.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/javascript.md"}}}
---
![Logo](../../admin/trashschedule.png)

# ioBroker.trashschedule

## FAQ

### Der Trashschedule-Adapter bleibt gelb

Wenn der Adapter gelb bleibt, können vom iCal-Adapter keine Termine abgeholt werden. Das liegt entweder daran, dass der iCal-Adapter

- den dort konfigurierten Kalender nicht abrufen kann (Zugriffsrechte),
- oder dass im verwendeten Kalender keine Termine enthalten sind / der eingestellte Zeitraum zu klein ist.

**Weiterhin muss im iCal-Adapter bei Verwendung des "Ereignisse"-Features (siehe Tab im Admin) der Haken bei "anzeigen" gesetzt werden.** Ist der Haken nicht gesetzt, werden die treffenden Termine vom iCal-Adapter gefiltert und können somit nicht mehr vom Trashschedule-Adapter gelesen werden.

### Einige Typen werden nicht gefunden / gefüllt

Das könnte daran liegen, dass der iCal-Adapter nicht "weit genug in die Zukunft schaut". Einfach die Anzahl der Tage höher stellen, sodass auch diese Termine gefunden werden können. Meine Empfehlung wären 8 Wochen, also 56 Tage. Damit sollte man die meisten Abholungen (und die darauf folgenden) finden. Weihnachtsbäume o.ä. stellen natürlich eine Ausnahme dar.

### Die verbleibenden Tage aktualisieren sich nicht

Die Idee ist, dass der iCal-Adapter regelmäßig den Kalender neu holt. Daher sollte hier ein Intervall definiert werden, wie oft die Daten aus der iCal-Datei / iCal-Url neu gelesen werden. Es ist nicht nötig, den Trashschedule-Adapter regelmäßig neustarten zu lassen (dieser würde ja nur wieder die gleichen/alten Daten vom iCal lesen). iCal ist also führend und muss dafür sorgen, dass immer aktuelle Termine vorliegen. **Es sollte also mindestens einmal täglich (möglichst früh am Tag) die iCal-Instanz gestartet werden (siehe Cron-Einstellungen auf der Instanz).**

### State value to set for "trashschedule.0.type.xxx.nextWeekday" has to be type "string" but received type "number"

In späteren Adapter-Versionen wurden die Datentypen von einigen Datenpunkten angepasst. Sollten entsprechende Fehler im Log auftauchen, kann dies dadurch gelöst werden, dass der Adapter noch einmal alle Datenpunkte neu anlegt. Lösche dazu einfach alle Datenpunkte, welche sich unter ``trashschedule.0`` befinden. Das kann einfach in der Objekt-Ansicht erledigt werden.

Sobald die Instanz einmal neugestartet wurde, sind alle Datenpunkten wieder vorhanden.

### Einige Tonnen sind im VIS widget nicht vorhanden oder werden nicht richtig dargestellt

Die Farben der Tonnen und die verschiedenen Schattierungen im genutzten SVG werden dynamisch berechnet. Dort gab es vor Version 0.0.9 noch ein paar Fehler, welche mittlerweile behoben sind. Es hilft ein Update des Adapters auf 0.0.9 oder neuer. Weiterhin sollte ein "Upload" von VIS und Trashschedule über das Adapter-Tab durchgeführt werden (Experten-Modus aktivieren).

### Die Uhrzeiten der Termine werden vom Trashschedule-Adapter ignoriert

Das Verhalten ist so gewünscht. Dem Adapter sind Uhrzeiten egal - es interessiert nur der Tag der Abholung.

### Das VIS-Widget funktioniert in der VIS-App für Android nicht

Das liegt nicht in meiner Hand. Die App arbeitet anders - Widgets müssen vom Entwickler manuell hinterlegt werden. Ich empfehle die Nutzung der App **Fully Kiosk Browser**. Damit gibt es solche Probleme nicht.

### Das VIS-Widget ist leer / zeigt nichts an

Im Widget muss unter "Object ID" der JSON-Knoten angegeben werden, z.B.: `trashschedule.0.type.json`

### In welchem Format werden die Farben der Tonnen hinterlegt?

Die Farben werden als Hex-Codes, also z.B. mit `#13a7eb` angegeben. Das regelt in neueren Versionen aber der Color-Picker für Dich. Wähle einfach die gewünschte Farbe aus.

### VIS zeigt "invalid date"

1. Trashschedule Instanz stoppen
2. Alle Datenpunkte des Adapters löschen (also von trashschedule.0). Einfach in der Objektansicht auf die Mülltonne klicken und weg damit.
3. In der Expertenansicht der Adapterliste erst bei Trashschedule auf Upload klicken, dann bei VIS auf Upload klicken
4. iCal einmal Instanzliste neustarten, dann Trashschedule wieder starten

### Die hinterlegte Stunde (aktuellen Tag ab Stunde x überspringen) wird ignoriert

Dieses Problem ist ab Version 1.0.5 behoben. Bitte aktualisiere den Adapter auf 1.0.5 oder neuer.