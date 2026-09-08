---
title:       "Werte aufzeichnen"
lastChanged: "08.09.2026"
---

# Werte aufzeichnen

Ein Datenpunkt kennt nur seinen **aktuellen** Wert. Wie warm es gestern Nacht
war oder wie viel Strom letzte Woche geflossen ist, weiß ioBroker nur, wenn es
jemand mitgeschrieben hat. Genau das machen die Aufzeichnungsadapter.

## Welcher Adapter

| Adapter | Wohin | Wann |
| --- | --- | --- |
| **history** | In Dateien auf dem Rechner | Wenige Datenpunkte, kurze Zeiträume. Zum Anfangen. |
| **influxdb** | In eine Zeitreihendatenbank | Viele Datenpunkte über Jahre. Der übliche Weg für gewachsene Anlagen. |
| **sql** | In MySQL, PostgreSQL oder SQLite | Wenn ohnehin eine solche Datenbank vorhanden ist. |

Fangen Sie mit `history` an. Der Umstieg später ist möglich, und für die ersten
Diagramme reicht es allemal. Der Vergleich der drei Adapter, die Migration und
was bei einer Sicherung mit den Daten passiert, stehen unter
[Datenaufzeichnung](/docs/config/history.md).

!> Aufzeichnen bedeutet Schreiben, und Schreiben verbraucht eine SD-Karte. Wer
dauerhaft viele Werte mitschreiben will, sollte das nicht auf einer SD-Karte
tun, sondern auf einer SSD oder einer Datenbank auf einem anderen Rechner.

## Einrichten

1. Den Adapter `history` installieren und eine Instanz anlegen. In deren
   Konfiguration stehen die Voreinstellungen, die später für jeden neuen
   Datenpunkt gelten.
2. Im Reiter [Objekte](/docs/admin/objects.md)
   den Datenpunkt suchen, der aufgezeichnet werden soll.
3. Am Ende der Zeile öffnet das Zahnrad die Einstellungen für diesen Datenpunkt.
   Dort die history-Instanz einschalten.

Ab jetzt wird geschrieben. Rückwirkend gibt es nichts: aufgezeichnet wird erst
ab dem Einschalten.

## Die Einstellungen, auf die es ankommt

| Einstellung | Was sie bewirkt |
| --- | --- |
| **Bei Änderung oder im Intervall** | Bei Änderung ist fast immer richtig. Ein Intervall erzeugt auch dann Daten, wenn sich nichts tut. |
| **Mindeständerung** | Erst ab dieser Abweichung wird geschrieben. Damit fällt das Rauschen eines Sensors weg. |
| **Entprellzeit** | Sperrt kurz nach einem Schreibvorgang. Hilft bei Werten, die im Sekundentakt zappeln. |
| **Aufbewahrung** | Wie lange die Werte behalten werden. Ohne Begrenzung wächst der Speicher unbegrenzt. |

?> Nur aufzeichnen, was Sie tatsächlich ansehen werden. Jeden Datenpunkt
mitzuschreiben, weil man ihn vielleicht einmal braucht, ist der häufigste Grund
für ein System, das nach einem Jahr langsam wird.

Sinnvoll sind Temperaturen, Verbräuche, Füllstände und Schaltzustände, an denen
Sie später ablesen wollen, wann etwas passiert ist. Nicht sinnvoll sind
Zähler, die ohnehin schon einen Verlauf enthalten, und interne Datenpunkte der
Adapter.

## Nachsehen, ob es funktioniert

Warten Sie eine Weile und ändern Sie den Wert einmal. Danach zeigt der Reiter
Objekte am Datenpunkt an, dass eine Aufzeichnung aktiv ist, und die
history-Instanz protokolliert, wenn etwas nicht stimmt. Wenn nichts ankommt,
lohnt der Blick ins
[Protokoll](/docs/admin/log.md).

## Wie es weitergeht

Aufgezeichnete Werte sieht man sich am besten als Diagramm an:
[Diagramme](/docs/tutorial/flot.md).
