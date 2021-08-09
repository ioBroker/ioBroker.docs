---
title:       "Admin"
lastChanged: "14.05.2021"
---

# Die Admin-Oberfläche

!> **Wegen des Umfangs der Dokumentation ist dies nur eine Übersicht, ausführliche 
Informationen sind in den Seiten hinterlegt, die über die Überschriften der 
Abschnitte zu den Reitern verlinkt sind. Bitte die Überschriften anklicken.**


Der Adapter Admin dient der Bedienung der gesamten ioBroker-Installation. 
Er stellt ein Webinterface zur Verfügung. Dieses wird unter der 
``<IP-Adresse des Servers>:8081`` aufgerufen.

Dieser Adapter wird direkt bei der Installation von ioBroker angelegt eine manuelle 
Installation ist nicht notwendig

![Der Admin in der Kachelansicht](media/ADMIN_Adapter_Kachel.png)

Über das vom Adapter zur Verfügung gestellte GUI können u.a. folgende 
Funktionen abgerufen werden:

* Eingabe von systemweiten Einstellungen
* Installation weiterer Adapter und Instanzen
* Zugriff auf die Konfiguration der Instanzen
* Zugriff auf Objektübersicht
* Zugriff auf die Zustandsübersicht der Objekte
* Zugriff auf die Administration von Benutzern und Gruppen
* Zugriff auf das Logfile
* Verwaltung der Hosts

Die Adapteransicht teilt sich in drei Bereiche auf:

1 - [Menüleiste](#menüleiste)

2 - [Hauptfenster](#das-hauptfenster)

3 - [Systemeinstellungen](#systemeinstellungen)

![Die Struktur des Admin](media/ADMIN_Screen_numbers.png)

## Menüleiste
Die Menüleiste enthält mehrere Menüpunkte. In der Grundinstallation werden diese 
Punkte wie in der Abbildung angezeigt. Über das Dreieck-Icon links oben (1) können 
nach der Installation zusätzlicher Adapter weitere Punkte aktiviert bzw. für eine 
bessere Übersicht auch deaktiviert werden.

![Menüpunkte](media/ADMIN_Screen01_menuitems_numbers.png)

Über das **X**  (2) kann die Menüleiste mit den Reitern ausgeblendet werden um 
auf mobilen Geräten mehr Platz zu schaffen.

![Menü eingeklappt](media/ADMIN_Screen01_menucollapsed.png)

über das "Burger-Icon" kann die Menüleiste wieder angezeigt werden


## Das Hauptfenster
Das Hauptfenster zeigt den jeweils zum ausgewählten Menüpunkt gehörenden Inhalt an.

Ausführliche Informationen zu diesem Inhalt sind in den Seiten hinterlegt, die über die 
Überschriften verlinkt sind.

[Übersicht](https://www.iobroker.net/#de/documentation/admin/overview.md)
Hier werden alle Seiten mit eigenem Webinterface sowie Informationen zu den 
Hosts angezeigt.

[Adapter](https://www.iobroker.net/#de/documentation/admin/adapter.md)
Hier werden die verfügbaren und installierten Adapter angezeigt und verwaltet.

[Instanzen](https://www.iobroker.net/#de/documentation/admin/instances.md)
Hier werden die bereits über den Reiter Adapter installierten Instanzen aufgelistet 
und können entsprechend konfiguriert werden.

[Objekte](https://www.iobroker.net/#de/documentation/admin/objects.md)
Die verwalteten Objekte Strukturen und Datenpunkte der Geräte, die über Adapter 
eingebunden sind. Hier können Objekte angelegt und gelöscht werden. Über die 
"Pfeil hoch"" und ""Pfeil runter"" Buttons können ganze Objektstrukturen 
hoch- oder runtergeladen werden.

Werden Werte in roter Schrift angezeigt, sind sie noch nicht vom Empfänger 
bestätigt (ack = false).

[Aufzählungen](https://www.iobroker.net/#de/documentation/admin/enums.md)
Hier werden die Favoriten, Gewerke und Räume aus der Homematic-CCU aufgelistet.

[Log](https://www.iobroker.net/#de/documentation/admin/log.md)
Hier wird das log angezeigt

Im Reiter Instanzen kann bei den einzelnen Instanzen der zu loggende Loglevel 
eingestellt werden. In dem Auswahlmenü wird der anzuzeigende Mindest-Loglevel 
ausgewählt. Sollte ein Error auftreten, erscheint die Beschriftung des Reiters in roter Farbe.


[Ereignisse](https://www.iobroker.net/#de/documentation/admin/events.md)
Eine Liste der laufenden Aktualisierung der Zustände.

[Benutzer](https://www.iobroker.net/#de/documentation/admin/users.md)
Hier können Benutzer angelegt und zu den bestehenden Gruppen hinzugefügt werden.

[Skripte](scripts.md)
Bei installierten Java-Skript Adapter kann auf dieser Seite eigene Skripte mit 
javascript, Blockly oder Typescript erstellt werden.

[Hosts](https://www.iobroker.net/#de/documentation/admin/hosts.md)
Informationen über den Rechner, auf dem ioBroker installiert ist.  Liegt eine neue Version vor, 
erscheint ein Hinweis in diesem Eintrag der Menüleiste.


## Systemeinstellungen
In dem sich hier öffnenden Menü werden [Systemeinstellungen](https://www.iobroker.net/#de/documentation/admin/settings.md) wie Sprache, Zeit- 
und Datumsformat sowie weitere systemweite Einstellungen getätigt.

Auch die Repositories und Sicherheitseinstellungen können hier eingestellt werden.


[Übersicht]: https://www.iobroker.net/#de/documentation/admin/overview.md
[Adapter]: https://www.iobroker.net/#de/documentation/admin/adapter.md
[Instanzen]: https://www.iobroker.net/#de/documentation/admin/instances.md
[Objekte]: https://www.iobroker.net/#de/documentation/admin/objects.md
[Aufzählungen]: https://www.iobroker.net/#de/documentation/admin/enums.md
[Log]: https://www.iobroker.net/#de/documentation/admin/log.md
[Ereignisse]: https://www.iobroker.net/#de/documentation/admin/events.md
[Benutzer]: https://www.iobroker.net/#de/documentation/admin/users.md
[Hosts]: https://www.iobroker.net/#de/documentation/admin/hosts.md
[Systemeinstellungen]: https://www.iobroker.net/#de/documentation/admin/settings.md
