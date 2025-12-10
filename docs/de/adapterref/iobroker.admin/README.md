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

![Admin Systemeinstellungen](img/admin_img_006.jpg) 

Auch die Repositorien und Sicherheitseinstellungen können hier eingestellt werden. 
Eine tiefergehende Beschreibung ist über den Link in dem Titel dieses Abschnitts zu erreichen.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Layout fix in edit object dialog

### 7.7.20 (2025-11-15)
- (@GermanBluefox) Small optimizations
- (@GermanBluefox) Allowed to upload objects via text

### 7.7.19 (2025-10-26)
- (@GermanBluefox) Updated schema location for JsonConfig

### 7.7.18 (2025-10-25)
- (@GermanBluefox) Improvement of categories: drag&drop, visibility
- (@copilot) Added missing filterFunc property to jsonConfig objectId schema to match documentation and implementation
- (@copilot, @SimonFischer04) Added extended reverse proxy example section with screenshots, limitations (admin root requirement), and adapter compatibility notes
- (@copilot, @SimonFischer04) Fixed instances page reverse proxy link mapping so adapter localLinks are rewritten to the configured proxy paths (prefix matching + web port replacement, with duplicate link collapse)
- (@copilot, @SimonFischer04) Fixed intro page reverse proxy link remapping so links are correctly rewritten immediately and after navigating away and back (load reverseProxy config before instance scan and use prefix startsWith matching)
- (@GermanBluefox) Fixed multi-selection in the select ID dialog

### 7.7.3 (2025-09-25)
- Many GUI changes: See previous changelog below for details

### 7.7.2 (2025-09-24)
- (@copilot) Fixed JSONCONFIG table validator bug where validation errors persisted after deleting table rows
- (@GermanBluefox) Made small fix for JsonConfig component `state`
- (@copilot) Fixed repository refresh issue: repositories are now automatically refreshed when switching repository source (stable/latest) without requiring manual "Check for updates"
- (@copilot) Added CSV file editing support in file browser - CSV files can now be edited directly in the file manager
- (@copilot) Implemented sortable columns for instances table (name, status, memory, ID, host, loglevel)
- (@copilot) Fixed adapter license icon linking to use commercial license URL instead of GitHub license
- (@copilot) Fixed license icon spacing in list view to maintain consistent layout
- (@GermanBluefox) Allows entering minus values with JsonConfig number component
- (@copilot) Fixed textIP checkbox inconsistency between Objects and States tabs for the same host configuration
- (@GermanBluefox) Added icon to `www` folder for windows
- (@copilot) Confirmed and documented Copilot issue handling guidelines: PRs use neutral language (no "fixes" keywords), issues closed manually by maintainers, and "fixed" labels added when appropriate
- (@copilot) Enhanced Copilot instructions to make issue management policy more prominent - no auto-closing issues, manual validation required
- (@copilot) Enhanced repository timestamp display to show both generated and read timestamps - shows when repository data was generated and when it was last read by admin backend
- (@copilot) Fixed jsonConfig port validation to properly account for bind addresses, allowing the same port on different IP addresses
- (@copilot) Added error indicators to JSON Config tabs and accordions to improve the visibility of validation errors
- (@copilot) Added export/import functionality for accordion sections in JsonConfig allowing users to save accordion data as JSON files and import them back with replace or add options
- (@copilot) Fixed time difference warning that incorrectly appeared when the browser tab was inactive for a while
- (@copilot) For GitHub-installed adapters, show version + commit hash instead of just version
- (@copilot) Fixed table export error when table items contain null values
- (@copilot) Object Browser: Added formatted duration display for values with role "value.duration" - shows time durations in HH:mm:ss format instead of raw seconds
- (@copilot) Enhanced GitHub Actions to skip tests when only README.md is changed, speeding up CI for Copilot PRs (tested with mixed file changes)
- (@GermanBluefox) Added the docker checker in JSON config
- (@copilot) Fixed js-controller update notifications to use "The js-controller" instead of "Adapter js-controller"
- (@copilot) Fixed JSONConfig sendTo jsonData attribute parser problem where backslashes (\) in text inputs caused JSON parsing errors
- (@copilot) Fixed step type behavior in chart display - "Schritte" now shows value until next point (step after) instead of step before
- (@copilot) Added all three-step type options (stepStart, stepMiddle, stepEnd) to chart display with clearer descriptions
- (@copilot) Fixed React error #62 in the Files tab caused by malformed CSS calc() function
- (@copilot) Added loading indicator to JSONConfig autocompleteSendTo component during sendTo operations
- (@copilot) Mark adapters removed from repository with "not maintained" text instead of empty version field
- (@copilot) Enhanced responsive design: modals and popups now use full screen on xs and sm breakpoints
- (@copilot) Added logout dropdown menu to user icon for improved user experience
- (@copilot) Updated OAuth2 documentation in DEVELOPER.md to include both cloud-based and direct callback approaches with clear guidance on when to use each method
- (@copilot) Only show adapters with satisfied dependencies in update all dialog
- (@copilot) Added new `readOnly` attribute for jsonEditor in jsonConfig - allows opening the editor to view JSON content without allowing modifications
- (@GermanBluefox) Reading of same instances was optimized in GUI
- (@GermanBluefox) Do not show the http page if admin is secured
- (@GermanBluefox) Show loading progress for custom tabs
- (@GermanBluefox) Fixing change of the language in the admin

## License

The MIT License (MIT)

Copyright (c) 2014-2025 bluefox <dogafox@gmail.com>