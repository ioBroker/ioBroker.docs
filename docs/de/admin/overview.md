---
title:       "Übersicht und Schnellzugriff"
lastChanged: "07.09.2026"
---

# Reiter Übersicht

Die Übersicht ist die Startseite des Admin. Sie beantwortet auf einen Blick die Frage,
ob das System gesund ist, und verlinkt von dort in die passenden Reiter.

<img src="media/admin_uebersicht.png" alt="Der Reiter Uebersicht in Admin 8" width="900" />

Oben rechts steht der Host, auf den sich die Anzeige bezieht, daneben, ob er **online**
ist. Darunter folgen vier Kacheln:

| Kachel | Bedeutung |
| ------ | --------- |
| Systemstatus | Sammelmeldung aus laufenden Instanzen, Speicher und Protokoll. `OK` heißt: keine Fehler offen. |
| Adapter | Wie viele Adapter installiert sind, und wie viele davon aktiv genutzt werden. |
| Instanzen | Wie viele Instanzen angelegt und wie viele davon gestartet sind. |
| Objekte | Anzahl der Objekte und der davon beschreibbaren Zustände. |

Der Block **Systeminformationen** zeigt die Daten des Hosts: Plattform, Architektur,
Node.js- und NPM-Version, die Laufzeit seit dem letzten Neustart sowie die aktuelle
Auslastung von RAM und CPU.

?> Wenn die RAM-Anzeige dauerhaft am Anschlag steht oder die Node.js-Version nicht der
[empfohlenen LTS-Version](/docs/install/nodejs.md)
entspricht, ist das der erste Punkt, an dem man ansetzt.

Unten stehen die **Aktiven Adapter** mit ihrer Version und ihrem Zustand sowie die
letzten Zeilen aus dem **Systemprotokoll**. Über *Alle anzeigen* geht es in die
vollständige [Instanzenliste](/docs/admin/instances.md)
bzw. in die [Protokolle](/docs/admin/log.md).

# Reiter Schnellzugriff

Der Schnellzugriff sammelt alle Adapter, die eine eigene Weboberfläche mitbringen, als
Kacheln. Ein Klick auf eine Kachel öffnet diese Oberfläche unter der Adresse, die unten
in der Kachel steht.

<img src="media/admin_schnellzugriff.png" alt="Der Reiter Schnellzugriff mit den Kacheln der Weboberflaechen" width="900" />

Am Ende steht je eine Kachel pro Host des Systems. Bei einer Standardinstallation ist das
der eine ioBroker-Server, bei einem
[Multihost-System](/docs/config/multihost.md)
der Master und alle weiteren Hosts. Der Knopf **Info** in dieser Kachel klappt die
Hardware- und Systemdaten des Hosts auf:

<img src="media/admin_schnellzugriff_hostinfo.png" alt="Die Info-Ansicht einer Host-Kachel" width="340" />

## Kacheln anpassen

Welche Kacheln angezeigt werden, lässt sich frei festlegen. Dazu rechts unten auf das
Bleistift-Symbol klicken. Jede Kachel bekommt dann ein Häkchen, das an- und abgewählt
werden kann:

<img src="media/admin_schnellzugriff_edit.png" alt="Der Schnellzugriff im Bearbeitungsmodus" width="900" />

Unten rechts stehen im Bearbeitungsmodus drei Knöpfe:

* **+** legt eine eigene Kachel an, zum Beispiel für ein Gerät im Netzwerk, das nicht
  über ioBroker läuft.
* **Haken** speichert die Auswahl.
* **X** verwirft sie.
