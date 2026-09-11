---
title:       "Stärken von ioBroker"
lastChanged: "11.09.2026"
---
# Stärken von ioBroker

Diese Seite fasst zusammen, was ioBroker ausmacht. Sie ist gedacht für alle, die
vor der Entscheidung stehen, ob ioBroker das richtige System für sie ist, und für
alle, die jemandem erklären möchten, warum sie es einsetzen.

## Herstellerunabhängig und offen

ioBroker bindet Geräte, Protokolle und Onlinedienste über Adapter ein, und zwar
unabhängig davon, von wem das einzelne Gerät stammt. Zigbee, Z-Wave, KNX, Modbus,
MQTT, Hersteller-Clouds, Sprachassistenten: Was ein Adapter übersetzen kann, wird
Teil desselben Systems. Sie sind damit an keinen Hersteller gebunden und können
Geräte austauschen, ohne Ihre Automatisierungen neu aufbauen zu müssen.

## Modular aufgebaut

ioBroker besteht aus einem schlanken Kern und Adaptern, die Sie einzeln
installieren. Sie holen sich also nur das ins System, was Sie wirklich brauchen.
Jede Instanz eines Adapters läuft für sich; fällt eine aus, arbeitet der Rest
weiter, und Sie können sie einzeln anhalten, neu starten oder anders einstellen.

## Alles über die Oberfläche

Konfigurationsdateien müssen Sie nicht bearbeiten. Adapter installieren,
Instanzen einrichten, Objekte ansehen, Benutzer anlegen, Protokolle lesen: all
das geschieht in der Admin-Oberfläche im Browser.

## Automatisieren, wie Sie möchten

Für einfache Abläufe genügen die grafischen Werkzeuge: der Regel-Assistent für
"Wenn dies, dann das" und Blockly, wo Sie Bausteine zusammensetzen. Wer mehr
möchte, schreibt JavaScript oder TypeScript, nutzt Node-RED oder bindet eigene
Node.js-Module ein. Alle Wege führen auf dieselben Daten, und sie lassen sich
nebeneinander verwenden.

## Visualisierung

Für die Oberfläche, die Sie täglich bedienen, gibt es mehrere Wege: vis-2,
ioControl, Lovelace, HabPanel und weitere. Sie bauen damit Ansichten, die zu
Ihrem Zuhause passen, statt sich mit einer vorgegebenen App zu begnügen.

## Der js-controller als Kern

Der js-controller ist das Herz des Systems. Er verwaltet die Objekte und
Zustände, startet und überwacht die Instanzen und hält die Verbindung zwischen
allen Teilen. Adapter sprechen nicht miteinander, sondern über diesen Kern.
Daraus folgt die Offenheit des Systems: Ein neuer Adapter muss nur die
gemeinsame Sprache beherrschen, nicht jedes andere Gerät kennen.

## Skalierbar bis zum Multi-Host-System

ioBroker wächst mit seinen Aufgaben. Es beginnt auf einem kleinen Rechner mit
wenigen Geräten und reicht bis zu Anlagen, die ihre Last auf mehrere Hosts
verteilen. Das entlastet den einzelnen Rechner und erhöht zugleich die
Ausfallsicherheit.

## Redis als optionale Datenbank

In der Voreinstellung legt ioBroker Objekte und Zustände in Dateien ab. Für
größere Anlagen lässt sich stattdessen Redis verwenden. Das beschleunigt die
Zugriffe deutlich und ist der übliche Weg, wenn viele Zustände in kurzer Folge
geschrieben werden.

## Benutzer und Rechte

Sie legen Benutzer und Gruppen an und bestimmen, wer was sehen und bedienen
darf. In einem Haushalt mit mehreren Personen oder in einer Anlage, die jemand
anderes betreut, ist das der Unterschied zwischen "alle dürfen alles" und einer
Oberfläche, die jedem genau das zeigt, was ihn angeht.

## Ihre Daten bleiben bei Ihnen

ioBroker läuft bei Ihnen zu Hause. Werte, Verläufe und Regeln liegen auf Ihrem
Rechner, nicht bei einem Anbieter. Ob ein einzelnes Gerät zusätzlich eine Cloud
des Herstellers benötigt, hängt vom Gerät ab; das System selbst braucht keine.
Für den Zugriff von unterwegs gibt es eigene Wege, die Sie bewusst einschalten.

## Open Source und eine starke Community

ioBroker ist quelloffen und kostenlos. Die Entwicklung findet öffentlich statt,
und ein großer Teil der Adapter stammt aus der Community. Im Forum,
insbesondere im deutschsprachigen Raum, finden Sie Hilfe, Beispiele und
Anleitungen, meist innerhalb weniger Stunden.
