---
title:       "Adapter updaten"
lastChanged: "07.09.2026"
---

# Adapter aktualisieren und zurückstufen

Adapter sind der Teil von ioBroker, der sich am häufigsten bewegt. Sie werden
einzeln aktualisiert - es gibt keinen Grund, alle auf einmal zu erneuern, und
mehrere gute Gründe dagegen.

## Im Admin

Unter *Adapter* trägt jeder Eintrag seine installierte Version und die, die im
Repository liegt. Ist eine neuere vorhanden, erscheint der Pfeil zum
Aktualisieren. Ein Klick darauf zeigt zuerst die Änderungen der neuen Version -
diese Liste ist es wert, gelesen zu werden, denn dort steht, wenn eine Version
etwas verlangt oder abschafft.

Die ausführliche Beschreibung der Adapterverwaltung steht im
[Tutorial zur Adapterverwaltung](https://www.iobroker.net/#de/documentation/tutorial/adapter.md).

## Auf der Konsole

```bash
iob update --updatable      # zeigt nur, was aktualisierbar ist - ändert nichts
iob upgrade <adapter>       # aktualisiert genau diesen Adapter
iob upgrade                 # aktualisiert alle Adapter (nicht den js-controller)
```

?> `iob update` **ändert nichts**. Es liest nur nach, was im Repository steht.
   Verändert wird erst mit `iob upgrade`.

## Zurückstufen

Manchmal soll es nicht die neueste Version sein: weil eine Fassung einen Fehler
mitbringt, oder weil eine ältere gebraucht wird, bis ein anderer Adapter
nachzieht.

`iob upgrade <adapter>` setzt den Adapter auf die Version, die im eingestellten
Repository steht - **auch dann, wenn das eine niedrigere ist**. Ein Repository
lässt sich dem Befehl auch direkt mitgeben:

```bash
iob upgrade <adapter> <repository-url>
```

Beim Wechsel von *Latest* zurück auf *Stable* geschieht dasselbe von selbst.

!> Ein Zurückstufen ist kein sauberer Rückwärtsgang. Datenpunkte und
   Einstellungen, die die neuere Version angelegt hat, bleiben stehen, und die
   ältere Version kennt sie nicht. Vor dem Zurückstufen also
   [sichern](https://www.iobroker.net/#de/documentation/install/update.md), und
   danach die Instanz aufmerksam beobachten.

## Aus GitHub installieren

Wenn eine Fehlerbehebung noch nicht veröffentlicht ist, lässt sich ein Adapter
direkt aus dem Quelltext installieren - im Admin über *Adapter aus eigener URL
installieren* im Expertenmodus.

!> Solche Fassungen sind Vorabversionen. Sie werden **nicht** über das normale
   Update erneuert und bleiben stehen, bis man sich selbst darum kümmert. Für
   eine Anlage im Alltag ist das der falsche Weg; für einen Test in einer
   zweiten Instanz ist er richtig.

## Nach dem Update

* Läuft die Instanz wieder? Unter *Instanzen* muss sie grün sein.
* Steht etwas im Protokoll? Warnungen direkt nach einem Update sind der
  häufigste Hinweis auf eine Einstellung, die sich geändert hat.
* Kommen die Werte an? Ein Blick in die Objekte des Adapters genügt.

## Weiterlesen

* [Updates durchführen](https://www.iobroker.net/#de/documentation/install/update.md) - die Reihenfolge der drei Schichten
* [Repositories](https://www.iobroker.net/#de/documentation/basics/repositories.md) - Stable und Latest
* [Adapterfehler](https://www.iobroker.net/#de/documentation/trouble/adapter.md) - wenn ein Adapter nach dem Update nicht startet
