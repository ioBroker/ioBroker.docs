---
title:       "ioBroker Grundlagen"
lastChanged: "07.09.2026"
---


# ioBroker Grundlagen

ioBroker ist eine reine Softwarelösung um verschiedene IoT-Systeme zu einem Gesamtsystem zu verbinden.
Demnach wird auch zu jedem System weiterhin eine Zentrale (Gateway/Interface) benötigt um dessen Geräte einbinden zu können.

In Sonderfällen kann so eine Zentrale per Software nachgebildet werden,
oder als Hardware (USB-Stick o.ä.) an den ioBroker Server angesteckt werden.

## Modularität
ioBroker ist modular aufgebaut. Diese Module heißen bei ioBroker ***Adapter***.  
Es gibt über 800 [Adapter](/adapters) zur Anbindung von diverser Hardware oder Einbindung verschiedenster Informationen wie Wetter, Kalender usw.

Daher müssen in einer Installation nur die Adapter installiert werden, die für die individuellen Bedürfnisse benötigt werden.
Dies spart Speicherplatz und Rechenpower.

Zu jedem Adapter werden sogenannte ***Instanzen*** erstellt.
Dieses sind die "Arbeitsversionen" der Adapter.
Je nach Adapter können beliebig viele Instanzen erzeugt werden um verschiedene Subsysteme
oder unterschiedliche Aufgabenbereiche voneinander abzugrenzen.

In diesen Instanzen findet die entsprechende Konfiguration statt.

## Architektur
### Server
Eine Besonderheit von ioBroker besteht darin, dass die Aufgaben auch auf mehrere Server verteilt werden **können**.
In so einem Fall spricht man von einem ***Multihost-System***.
Gründe für die Aufteilung können räumlicher Art oder eine Leistungsverteilung sein.

### Anforderungen an die Hardware
Ein ioBroker Server kann nahezu auf jeder Hardware installiert werden.
Einzige Bedingung ist, dass es für das entsprechende Betriebssystem eine aktuelle Version von [nodejs](https://nodejs.org/en/download/) gibt.

!> ioBroker empfiehlt die LTS-Version **Node.js 22**. Ungerade Node.js-Versionen dürfen nicht verwendet werden. Einzelheiten dazu stehen unter [Node.js installieren](/docs/install/nodejs.md).

Als Mindestausstattung gelten 2 GB RAM und 32 GB Speicherplatz, empfohlen werden 4 GB
(besser 6 bis 8 GB) RAM und 64 GB Speicherplatz. Zum Ausprobieren genügt ein Raspberry Pi 4;
als zusätzlicher Host für wenige Adapter in einem Multihost-System reicht auch weniger.
Die vollständige Tabelle steht unter [Anforderungen](/docs/install/requirements.md).

### Software
ioBroker verwaltet die Daten in einer Datenbank. Dementsprechend ist auch die Struktur der Daten organisiert.

Zu jedem Adapter gibt es einen sogenannten Namespace, der sämtliche Daten zu einer Instanz des Adapters enthält.
Dementsprechend lautet der Name des Namespaces z.B.: ***AdapterName.0***

Innerhalb dieses Bereiches legt ioBroker die Geräte, deren Kanäle und wiederum deren Datenpunkte mit ihren Werten (Zuständen) an.

<img src="media/objekte_baum.png" alt="Der Objektbaum: Adapter, Instanz, Geraet, Kanal, Datenpunkte" width="900" />

Im Beispiel gehört der Namespace `hm-rpc.0` zur ersten Instanz des HomeMatic-Adapters. Darunter
liegt das Gerät `LEQ0903185` (ein Türschloss), darunter dessen Kanäle und darin die einzelnen
Datenpunkte mit ihren aktuellen Werten. Mehr dazu unter
[Objekte](/docs/basics/objects.md) und [Zustände](/docs/basics/states.md).

[nodejs]: https://nodejs.org
