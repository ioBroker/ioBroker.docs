---
BADGE-Number of Installations: http://iobroker.live/badges/admin-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.admin.svg
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
---
## ausführliche Beschreibung

Der Adapter admin dient der Bedienung der gesamten ioBroker-Installation. Er stellt ein Webinterface zur Verfügung. Dieses wird unter der `<IP-Adresse des Servers>:8081` aufgerufen. Dieser Adapter wird direkt bei der Installation von ioBroker angelegt.

Über das vom Adapter zur Verfügung gestellte GUI können u.a. folgenden Funktionen abgerufen werden:

*   Installation weiterer Adapter
*   Zugriff auf Objektübersicht
*   Zugriff auf die Zustandsübersicht der Objekte
*   Zugriff auf Benutzer und Gruppen Administration
*   Zugriff auf das Logfile
*   Verwaltung der Hosts

## Installation

Dieser Adapter wird direkt bei der Installation von ioBroker angelegt eine manuelle Installation ist nicht notwendig

## Konfiguration

![adapter_admin_konfiguration](img/admin_konfiguration.png)

#### IP

Hier wird die IP-Adresse unter der der Adapter erreichbar ist eingegeben. Verschiedene Ipv4 und Ipv6 Möglichkeiten stehen zur Auswahl. 
<span style="color: #ff0000;">**Default ist 0.0.0.0\. Dies darf nicht verändert werden!**</span>

#### Port

Hier wird der Port, unter der der Administrator aufgerufen werden kann eingestellt. Falls auf dem Server mehrere Webserver laufen muss dieser Port angepasst werden, damit es nicht zu Problemen wegen doppelter Portvergabe kommt.

#### Verschlüsselung

Soll das sichere Protokoll https verwendet werden ist hier ein Haken zu setzen.

#### Authentifikation

Soll eine Authentifizierung erfolgen ist hier ein Haken zu setzen.

## Bedienung

Über den Webbrowser die folgende Seite aufrufen: 

`<IP-Adresse des Servers>:8081`

## Reiter

Die Hauptseite des Administrators besteht aus mehreren Reitern. In der Grundinstallation werden die Reiter wie in der Abbildung angezeigt. Über das Bleistift-Icon rechts oben (1) können nach der Installation zusätzlicher Adapter weitere Reiter hinzugefügt werden. Dort können auch Reiter deaktiviert werden um eine besser Übersicht zu erhalten.

![iobroker_adapter_admin_001a](img/admin_ioBroker_Adapter_Admin_001a.jpg)

Ausführliche Informationen sind in den Seiten hinterlegt, die über die Überschriften verlinkt sind.

### [Adapter](admin/tab-adapters.md)

Hier werden die verfügbaren und installierten Adapter angezeigt und verwaltet.

### [Instanzen](admin/tab-instances.md)

Hier werden die bereits über den Reiter Adapter installierten Instanzen aufgelistet und können entsprechend konfiguriert werden.

### [Objekte](admin/tab-objects.md)

Die verwalteten Objekte (z.B. die Geräte/Variablen/Programme der CCU). Hier können Objekte angelegt und gelöscht werden. 
Über die _Pfeil hoch_ und _Pfeil runter_ Knöpfe können ganze Objektstrukturen hoch- oder runtergeladen werden. 
Ein weiterer Knopf ermöglicht die Anzeige der Expertenansicht.

Werden Werte in roter Schrift angezeigt, sind sie noch nicht bestätigt (`ack = false`).

### [Zustände](admin/tab-states.md)

Die aktuellen Zustände der Objekte.

### [Ereignisse](admin/tab-events.md)

Eine Liste der laufenden Aktualisierung der Zustände.

### [Gruppen](admin/tab-groups.md)

Hier werden die angelegten Usergruppen angelegt und die Rechte verwaltet

### [Benutzer](admin/tab-users.md)

Hier können Benutzer angelegt und zu den bestehenden Gruppen hinzugefügt werden.

### [Aufzählungen](admin/tab-enums.md)

Hier werden die Favoriten, Gewerke und Räume aus der Homematic-CCU aufgelistet.

### [hosts](admin/tab-hosts.md)

Informationen über den Rechner, auf dem ioBroker installiert ist. 
Hier kann die aktuelle Version des js-Controllers upgedated werden. 
Liegt eine neue Version vor, erscheint die Beschriftung des Reiters in grüner Farbe.

### [Log](admin/tab-log.md)

Hier wird das log angezeigt

Im Reiter Instanzen kann bei den einzelnen Instanzen der zu loggende Loglevel eingestellt werden. 
In dem Auswahlmenü wird der anzuzeigende Mindest-Loglevel ausgewählt. 
Sollte ein Error auftreten, erscheint die Beschriftung des Reiters in roter Farbe.

Nach der Installation zusätzlicher Adapter können noch weitere Reiter über das 
Bleistift-Icon oben rechts (1) aktiviert werden. Die Beschreibung dieser 
Reiter befindet sich bei dem entsprechenden Adapter.

### [Systemeinstellungen](admin/tab-system.md)

In dem sich hier öffnenden Menü werden Einstellungen wie Sprache, Zeit- und Datumsformat sowie 
weitere systemweite Einstellungen getätigt. 

![Admin Systemeinstellungen](img/admin_Systemeinstellungen.jpg) 

Auch die Repositorien und Sicherheitseinstellungen können hier eingestellt werden. 
Eine tiefergehende Beschreibung ist über den Link in dem Titel dieses Abschnitts zu erreichen.

## Changelog
### **WORK IN PROGRESS**
* (foxriver76) fixed `between` function for showing news
* (foxriver76) if date string is not parseable show the original string instead of `Invalid Date`

### 6.10.0 (2023-09-08)
* (foxriver76) various minor improvements
* (foxriver76) fixed problem with discovery dialog
* (foxriver76) object browser now validates setting state of type number
* (foxriver76) allow to specify unique columns for tables
* (foxriver76) fix crash on invalid states, which are missing the property `common.role`

### 6.9.2 (2023-09-01)
* (foxriver76) show info, if server time differs from client time
* (foxriver76) remove confusion with different names for state (datapoint and state)
* (jogibear9988) fixed link on 404-page being opened inside child view
* (foxriver76) fixed issue if non-text default values are provided to a text jsonConfig component
* (foxriver76) implemented del key shortcut to delete a selected object

### 6.9.1 (2023-08-22)
* (foxriver76) allow resizing of all columns in objects tab
* (foxriver76) without expert mode users are only allowed to edit objects in `0_userdata.0` and `alias.0` namespace
* (foxriver76) fixed keyboard navigation
* (foxriver76) fixed problem with showing controller upgrade instructions if no UI upgrade is supported

### 6.9.0 (2023-08-21)
* (bluefox) Added possibility to change log direction
* (bluefox) JSON config: Added possibility to filter out internal IP addresses
* (bluefox) JSON config: Added _changed flag for formula in JSON config
* (bluefox) JSON config: Added option `reloadBrowser` to sendto in JSON config
* (bluefox) JSON config: Allowed positioning of add button on the very top of the table
* (bluefox) JSON config: Trim strings by saving and not by typing
* (bluefox) Added alias creation from object browser
* (bluefox) Allowed to change chart type
* (foxriver76) show a date picker when setting state (role: date/type: number)
* (foxriver76) fixed problem, that creation of folders was not possible
* (foxriver76) adapted text to clarify, that only tarball can be installed from path
* (foxriver76) type string/role date will now also be previewed as a date in objects tab
* (foxriver76) fixed problem with table formatting on history data point viewer
* (foxriver76) fixed problem that could render update dialog with invalid property
* (foxriver76) fixed sentry icon being in wrong position if no compact flag provided

### 6.8.3 (2023-08-16)
* (foxriver76) added description to adapter rating dialog
* (bluefox) Extended the select component with grouping
* (bluefox) Allowed the sorting of adapters by name and not only by title
* (bluefox) Allowed the set state JSON config component

## License
The MIT License (MIT)

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>