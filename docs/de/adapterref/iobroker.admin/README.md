---
BADGE-Number of Installations: http://iobroker.live/badges/admin-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.admin/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/admin/svg-badge.svg
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

![adapter_admin_konfiguration](img/admin_img_002.jpg)

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

![iobroker_adapter_admin_](img/admin_img_001.jpg)

Ausführliche Informationen sind in den Seiten hinterlegt, die über die Überschriften verlinkt sind.

### [Adapter](/#/docs/adapterref/iobroker.admin/admin/tab-adapters.md)

Hier werden die verfügbaren und installierten Adapter angezeigt und verwaltet.

### [Instanzen](/#/docs/adapterref/iobroker.admin/admin/tab-instances.md)

Hier werden die bereits über den Reiter Adapter installierten Instanzen aufgelistet und können entsprechend konfiguriert werden.

### [Objekte](/#/docs/adapterref/iobroker.admin/admin/tab-objects.md)

Die verwalteten Objekte (z.B. die Geräte/Variablen/Programme der CCU). Hier können Objekte angelegt und gelöscht werden. 
Über die _Pfeil hoch_ und _Pfeil runter_ Knöpfe können ganze Objektstrukturen hoch- oder runtergeladen werden. 
Ein weiterer Knopf ermöglicht die Anzeige der Expertenansicht.

Werden Werte in roter Schrift angezeigt, sind sie noch nicht bestätigt (`ack = false`).

### [Zustände](/#/docs/adapterref/iobroker.admin/admin/tab-states.md)

Die aktuellen Zustände der Objekte.

### [Ereignisse](/#/docs/adapterref/iobroker.admin/admin/tab-events.md)

Eine Liste der laufenden Aktualisierung der Zustände.

### [Gruppen](/#/docs/adapterref/iobroker.admin/admin/tab-groups.md)

Hier werden die angelegten Usergruppen angelegt und die Rechte verwaltet

### [Benutzer](/#/docs/adapterref/iobroker.admin/admin/tab-users.md)

Hier können Benutzer angelegt und zu den bestehenden Gruppen hinzugefügt werden.

### [Aufzählungen](/#/docs/adapterref/iobroker.admin/admin/tab-enums.md)

Hier werden die Favoriten, Gewerke und Räume aus der Homematic-CCU aufgelistet.

### [hosts](/#/docs/adapterref/iobroker.admin/admin/tab-hosts.md)

Informationen über den Rechner, auf dem ioBroker installiert ist. 
Hier kann die aktuelle Version des js-Controllers upgedated werden. 
Liegt eine neue Version vor, erscheint die Beschriftung des Reiters in grüner Farbe.

### [Log](/#/docs/adapterref/iobroker.admin/admin/tab-log.md)

Hier wird das log angezeigt

Im Reiter Instanzen kann bei den einzelnen Instanzen der zu loggende Loglevel eingestellt werden. 
In dem Auswahlmenü wird der anzuzeigende Mindest-Loglevel ausgewählt. 
Sollte ein Error auftreten, erscheint die Beschriftung des Reiters in roter Farbe.

Nach der Installation zusätzlicher Adapter können noch weitere Reiter über das 
Bleistift-Icon oben rechts (1) aktiviert werden. Die Beschreibung dieser 
Reiter befindet sich bei dem entsprechenden Adapter.

### [Systemeinstellungen](/#/docs/adapterref/iobroker.admin/admin/tab-system.md)

In dem sich hier öffnenden Menü werden Einstellungen wie Sprache, Zeit- und Datumsformat sowie 
weitere systemweite Einstellungen getätigt. 

![Admin Systemeinstellungen](img/admin_img_006.jpg) 

Auch die Repositorien und Sicherheitseinstellungen können hier eingestellt werden. 
Eine tiefergehende Beschreibung ist über den Link in dem Titel dieses Abschnitts zu erreichen.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 8.0.12 (2026-09-09)
- (@GermanBluefox) Updated `@iobroker/json-config` to 10.x, which does not bring `react-ace` any more: the admin hands its own editor in with the new property `AceEditor`. Until now every custom component of every adapter carried the whole `ace-builds` in its bundle, although only three of the sixty controls ever show an editor
- (@GermanBluefox) Added the "Did you know ...?" dialog. It shows one tip about the admin when it is opened, and one can leaf through the tips. The checkbox in the dialog switches it off for the whole installation, and the system settings switch it on again ("Tips at start")
- (@GermanBluefox) Fixed: the assistant switched the reasoning of an OpenAI-compatible endpoint off as soon as a base URL was configured. That is right for a small local model and wrong for everything else - in front of a proxy that serves a hosted model it turns off the reasoning one is paying for. The chat settings have a "Reasoning effort" selector now, and its default leaves the parameter out and lets the endpoint decide. A model that refuses function tools while reasoning still gets `none` automatically, as before, because it says so itself
- (@GermanBluefox) Fixed: the admin sent the user to the login page and sometimes logged them out for good, when the access token expired while the browser tab was in the background. The refresh timer of a hidden tab fires late, and the server cut the connection the very second the token expired. Together with the new `@iobroker/socket-classes` and `@iobroker/socket-client` the connection now refreshes the token when the server asks for it, and a refresh that was already done by another tab is no longer mistaken for an invalid login
- (@GermanBluefox) Fixed: the login page threw the stored tokens away when its token refresh failed because another tab had renewed them in the meantime, which logged out every tab
- (@GermanBluefox) Added the setting "Stay logged in for" (days). Until now the login without a password was renewed for one week at most
- (@GermanBluefox) Fixed: `/session` always reported an expired session, as it looked up the second character of the access token instead of the token
- (@GermanBluefox) The help text of "Login timeout" explains that the value is the lifetime of the access token, which is renewed automatically while the admin is open
- (@GermanBluefox) Fixed with the new `@iobroker/gui-components`: the object browser lost the column widths as soon as the objects page was left and opened again, the checkboxes of the states view columns had no effect while "Auto" was off, the buttons column could not be resized, and switching "Auto" off left the table with nothing but the ID column after a reload: https://github.com/ioBroker/ioBroker.admin/issues/3616
- (@GermanBluefox) Fixed: an adapter could be updated, although a dependency was not fulfilled. The update dialog showed the dependency in red, but the check behind the button did not know `globalDependencies`, where an adapter declares which admin version it needs. Both now come from the same place, which also covers the other hosts of a multihost setup: https://github.com/ioBroker/ioBroker.admin/issues/3614
- (@GermanBluefox) Intro was redesigned

### 8.0.11 (2026-09-01)
- (@GermanBluefox) CI: requests to a host that is not running (e.g. in adapter tests without js-controller) are answered immediately with a timeout error, so the GUI does not wait for its read timeout
- (@GermanBluefox) Fixed: clearing the adapter name filter showed an empty adapter list instead of all adapters

### 8.0.9 (2026-08-31)
- (@GermanBluefox) The discovery dialog opens on the result page when the last scan left proposals that are not ignored
- (@GermanBluefox) The discovery button carries a badge with the number of proposals that are neither created nor ignored
- (@GermanBluefox) Added the option to create the first instance directly after the installation from npm/GitHub/URL/file, if the adapter has no instance yet
- (@GermanBluefox) Updated web socket server
- (@GermanBluefox) Improvements of the device manager

### 8.0.8 (2026-08-27)
- (@GermanBluefox) Added the option to answer ACME HTTP-01 challenges of the acme adapter
- (@GermanBluefox) Fixed the CORS headers missing on the OAuth2 endpoints. They answer without passing the request on, so retrieving a token from a browser on another origin failed with `No Access-Control-Allow-Origin header is present`. The CORS middleware is now registered in front of all routes
- (@GermanBluefox) `src-admin/src/version.json` is now generated from `package.json` at build time, so the version logged by the GUI is no longer stale

### 8.0.7 (2026-08-26)
- (@GermanBluefox) The JSON tabs (`common.adminTab.link`) are now validated against the JsonConfig schema too
- (SimonFischer04) Admin can now run behind a reverse-proxy sub-path (e.g. `/admin/`)
- (SimonFischer04) Prefix legacy jQuery adapter-icon URLs and inject `info.js` into `<HEAD>` as well
- (@GermanBluefox) Corrected layout of Config view

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>