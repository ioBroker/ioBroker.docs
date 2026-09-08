---
title:       "Adapter testen"
lastChanged: "08.09.2026"
---

# Adapter testen

Ein Adapter läuft beim Entwickler fast immer. Das eigene Gerät antwortet, die
eigene Konfiguration ist vollständig, und die Netzwerkverbindung steht. Auf
fremden Systemen ist all das nicht garantiert, und genau dort fallen die Fehler
auf. Automatische Tests holen einen Teil davon vor die Veröffentlichung.

## Drei Arten von Prüfung

| Art | Was sie feststellt |
| --- | --- |
| **Paketprüfung** | Ob `package.json` und `io-package.json` zusammenpassen, ob alle Pflichtangaben da sind, ob die Versionen stimmen und die Übersetzungen vollständig sind. |
| **Startprüfung** | Ob der Adapter gegen einen echten js-controller startet, sich meldet und sich wieder sauber beenden lässt. |
| **Eigene Tests** | Ob die Auswertung der Gerätedaten stimmt. Das kann nur schreiben, wer den Adapter kennt. |

Die ersten beiden liefert das Paket
[`@iobroker/testing`](https://github.com/ioBroker/testing). Es ist in dem
Gerüst, das der [Adapter Creator](https://adapter-creator.iobroker.in/) erzeugt,
bereits eingerichtet. Wer einen älteren Adapter übernimmt, ergänzt es.

?> Die Startprüfung ist die wertvollste der drei. Sie findet die Fehler, die
Anwender am häufigsten treffen: der Adapter startet nicht, oder er lässt sich
nicht beenden und wird beim Neustart doppelt.

## Was eigene Tests abdecken sollten

Nicht die Verbindung zum Gerät, sondern das, was danach kommt. Prüfen Sie die
Auswertung mit aufgezeichneten Antworten des Geräts, und zwar auch mit den
unschönen Fällen:

* Das Gerät antwortet nicht.
* Es antwortet mit einer Fehlermeldung statt mit Daten.
* Ein Feld fehlt oder ist leer.
* Ein Wert liegt außerhalb des erwarteten Bereichs.

Der Umgang mit diesen Fällen ist es, der einen Adapter im Dauerbetrieb von einem
unterscheidet, der nach zwei Wochen stehen bleibt.

## Automatisch mitlaufen lassen

Das erzeugte Gerüst bringt eine Konfiguration für GitHub Actions mit. Damit
laufen die Tests bei jeder Änderung und für mehrere Node.js-Versionen. Das ist
wichtiger, als es klingt: ioBroker läuft auf sehr unterschiedlichen Systemen,
und ein Adapter, der nur mit der Node-Version des Entwicklers funktioniert,
macht viel Arbeit im Forum.

## Von Hand ausprobieren

Automatische Tests ersetzen den Blick nicht. Vor einer Veröffentlichung lohnt
sich der Durchgang durch die Fälle, die kein Test abdeckt:

1. Adapter auf einem frischen System installieren, ohne die eigene bestehende
   Konfiguration.
2. Instanz anlegen und die Konfigurationsseite in einer anderen Sprache öffnen.
3. Falsche Zugangsdaten eintragen und ansehen, was das Protokoll sagt. Steht
   dort, was zu tun ist?
4. Das Gerät während des Betriebs vom Netz nehmen und wieder anschließen.
5. Instanz beenden und im Protokoll prüfen, dass nichts hängen bleibt.

Wie sich ein Adapter dabei im Debugger beobachten lässt, steht unter
[Debugging](/docs/dev/adapterdebug.md).
