---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: IX8wwEGhFukRuRh2V5wWig9ootgfbrqj/qqw9DojjmE=
---
![Logo](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.knx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### Inhaltsverzeichnis
* [Beschreibung](#description)
* [Anforderungen](#Anforderungen)
* [Funktionen](#Funktionen)
* [Installation](#installation)
* [Adapterkonfiguration](#adapter-configuration)
* [Installieren Sie die Lizenz](#install-the-license)
* [Konfigurationsschnittstelle](#configuration-interface)
* [Objekte](#Objekte)
* [Verwendung](#Verwendung)
* [Datenpunkttypen (DPT)](#data-point-types-dpt)
* [So funktioniert der Import](#so-funktioniert-der-import)
* [Vermeidung von Problemen](#avoidance-of-problems)
* [GA-Tool](#ga-tool)
* [Direkte Verbindung vom Nicht-KNX-Zustand zum KNX-Zustand und umgekehrt](#direct-link-non-knx-state-to-knx-vice-verse)
* [Geplante Funktionen](#planned-features)
* [Änderungsprotokoll](#changelog)

## Beschreibung
en: Dieser Adapter ermöglicht den Import von `knxproj` Dateien aus der ETS. Er führt die Übersetzung zwischen KNX-Gruppenadressen und ioBroker durch und ordnet die Geräte den Räumen zu (insbesondere für MobileUI).

ru: [Установка и базовая настройка адаптера](docs/ru/README.md)

Es lässt sich mit Standard-KNX/LAN-Gateways verbinden.

**Achtung: mit dem Wechsel auf KNX-Adapter Version 2.x hat sich die Lizenzierung geändert. Eine neue Lizenz erhalten Sie unter [https://iobroker.net](https://iobroker.net/)**

**Sie sollten außerdem den iobroker js-controller UND den Admin auf die neueste Version aktualisieren.**

Bevor Sie beginnen: Jeder DPT von com.Objects sollte in Ihrem ETS-Projekt festgelegt sein. Jedes Gerät sollte in Ihre Anlagenstruktur einsortiert sein.

## Anforderungen
* Knotenversion >= 14.15.4
* Admin-Version >= 5.2.0
* js-controller Version >=3.3.20

Ohne diese Voraussetzung lässt sich der Adapter nicht installieren oder funktioniert nicht ordnungsgemäß.

## Merkmale
* `knxproj`-Datei importieren
* Generieren einer ETS-ähnlichen Objektstruktur
* Finden und Kombinieren von Akt-Kanal und Zustands-Kanal (Heuristik)
* Aktualisierung aller Zustände beim Start
* keine Cloud oder Internet erforderlich
* Ausgeben eines READ auf den KNX-Bus, während auf das Statusobjekt geschrieben wird
* GA-Objekte mit GA-Tools bearbeiten und ändern
* Zustands-Gesetzes-Beziehungen mit GA-Tools bearbeiten und ändern
* NEU: Erlaubt eine direkte Verbindung zu Nicht-KNX-Zuständen (und umgekehrt)
* NEU: Adapterantworten auf GroupValueRead an ein per DirectLink verbundenes Objekt
* NEU: Import von passwortgeschützten Projektdateien (danke an aKzenT)

###Installation
Dieser Adapter kann nur mit npm installiert werden. Die Installation über GitHub funktioniert **nicht**.

##Adapterkonfiguration
Öffnen Sie nach der Installation dieses Adapters die Adapterkonfiguration.

###Installieren Sie die Lizenz
Der erste Schritt besteht darin, die Lizenz anzuwenden. Wenn Sie keine Lizenz installiert haben, werden 500 Datenpunkte angewendet.

* (1) zeigt Ihre System-ID, diese benötigen Sie zum Erwerb einer Lizenz
* (2) Klicken Sie hier, um Ihre Lizenz anzuwenden

![knxV2-erster-Start-Mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

Wenn Sie bereits eine neue Lizenz unter [https://iobroker.net](https://iobroker.net/) erstellt haben, können Sie diese in (2) einfügen, ODER Sie können sie direkt online erwerben, indem Sie auf (1) klicken.

![knxV2-2-1-Install-Lizenz-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

Wenn Sie auf (1) geklickt haben, geben Sie Ihren iobroker.net-Konto-Login ein.

![knxV2-2-2-Lizenz-Online-Mod installieren](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

Wenn Ihre Angaben korrekt sind, werden Ihnen alle Lizenzen angezeigt, die Sie erhalten haben. Wählen Sie die Lizenz aus, die Sie verwenden möchten.

![knxV2-2-3-Lizenz-Online-Mod installieren](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

Wenn dies erfolgreich war, speichern Sie es.

![knxV2-2-4-Lizenz-Online-Mod installieren](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

Das ist alles. Klicken Sie unten auf dieser Seite auf die Schaltfläche zum Speichern.

### Konfigurationsschnittstelle
![knxV2-2-5-Lizenz installieren-online-angewendet-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. KNX-Gateway IP: IPv4 des KNX-LAN Gateways.
2. KNX-Gateway-Port: Standard ist Port 3671.
3. Physikalische Adresse: Physikalische Adresse der iobroker knx-Instanz. **Wichtig: Dies ist nicht die physikalische Adresse des LAN-Gateways!** und darf nicht mit 0 enden.
4. KNX-Pakete pro Sekunde: Dies begrenzt die Paketrate. Wenn das KNX Lan Gateway zu oft erneut eine Verbindung herstellt oder vorübergehend nicht erreichbar ist, reduzieren Sie diese Rate.
5. lokale iobroker IP: Wählen Sie die IP / Schnittstelle aus, an die der Adapter gebunden wird
6. Loglevel: Normalerweise ist dies die Ebene „Info“, zum Debuggen erhöhen Sie die Ebene.
7. Nur neue Datenpunkte importieren: Dies ist standardmäßig aktiviert. Bei Deaktivierung werden neue GAs generiert UND vorhandene GAs neu erstellt.
8. Schaltfläche „Datei hochladen“: Drag-and-Drop ist hier verfügbar oder per Klick auf den Dateiauswahldialog. Hier können Sie Ihren ETS-Export im Format „knxproj“ hochladen.

Nach erfolgreichem Import zeigt ein Dialog die Anzahl der importierten Objekte an. Drücken Sie nun auf „Speichern & Schließen“ und der Adapter sollte starten.
Während des Starts liest der Adapter alle Gruppenadressen mit Lese-Flag und Schreib-Flag. Dies kann eine Weile dauern und zu einer hohen Belastung Ihres KNX-Busses führen. Die Werte in Ihrer Vis werden jedoch nach dem Start aktualisiert.
Das Hochladen einer passwortgeschützten Datei ist derzeit nicht verfügbar.

9. Host-ID: Dies ist eine spezielle ID des iobroker-Hosts. Diese ID ist für die Generierung und Validierung der Lizenz erforderlich
10. GA-Tools: Werkzeugkasten für schnell wechselnde GAs

### Objekte
Hier ist unter knx.0 der Gruppenadressbaum wie in Ihrem ETS-Projekt. Verwenden Sie zum Ändern der Eigenschaften das GA-Tool.

### Verwendung
Wenn der Adapter erfolgreich startet, stehen Ihnen Ihre Datenpunkte für alles zur Verfügung, was Sie tun möchten.

### Datenpunkttypen (DPT)
Alle DPTs gemäß „Systemspezifikationen, Interworking, Datenpunkttypen“ der KNX Association sind verfügbar. Das bedeutet, dass Sie zwei Arten von Informationen erhalten können: 1) einen Wert oder eine Zeichenfolge 2) durch Kommas getrennte Werte oder ein Array von Werten (im Moment weiß ich nicht, was der bessere Weg ist, damit umzugehen)

Beispielsweise wird ein DPT5.001 als vorzeichenloser Integer mit 8 Bit kodiert. Dies ergibt einen einzelnen Wert. Der DPT3.007 (Control Dimming) wird als 1Bit(Boolean)+3Bit(unsigned Int) kodiert.

Dies ergibt beispielsweise einen Wert wie „0,5“, wobei „0“ „Verringerung“ und „5“ die Anzahl der Intervalle bedeutet.

### So funktioniert der Import
1. Lesen aller Kommunikationsobjektreferenzen (COR):

Kombination der Gruppenadressreferenz-ID mit dem DPT des entsprechenden COR (sofern vorhanden).

2. Generierung der Gruppenadressstruktur (GAS):

Generieren des GAS basierend auf GAR-IDs und Festlegen des DPT (falls noch nicht geschehen)

3. Feststellung des Staates, in dem ein Gesetz behandelt wird:

in ets-Exporten gibt es keine Informationen über Status- und Aktadressen. Der Adapter analysiert alle GAs von „Status“ oder „State“. Wenn es 2 GAs mit einer Ähnlichkeit von mehr als 90 % gibt, dann ist eine Adresse Akteur und die andere der Status. Es wird auch geprüft, ob die DPTs ähnlich sind. Deshalb ist es nicht einfach, ein Paar zu finden, wenn die GA-Benennung nicht konsistent ist.

4. Flag-Check in der Gerätekonfiguration:

Die Flags werden wie folgt behandelt:

| KNX | KNX | KNX | ioBroker | ioBroker | |
    |-------|-------|----------|----------|----------|----------------------------------------------------------|
| Lesen | Schreiben | Übertragen | Lesen | Schreiben | Erklärung |
| - | - | - | - | - | der Wert wird durch GroupValueRead aktualisiert |
| x | - | - | x | x | Das Senden eines beliebigen Werts in diesem Status löst einen GroupValueRead aus |
| - | x | - | - | x | Schreibe den Wert mit GroupValueWrite auf KNX |
| - | - | x | x | - | der Statuswert wird von GroupValueResponse aktualisiert |
| x | - | x | x | x | Das Senden eines beliebigen Werts in diesem Status löst einen GroupValueRead aus |

6. Erstellen von Datapoint-Peers (DPP):

Ein DPP wird erstellt, wenn GA, GAR und DPT gültig sind. Dies sind die DPP, mit denen der Adapter arbeitet.
Wenn DPT in einem GA fehlt, weil es nicht gefunden werden konnte, wird das DPP nicht erstellt. Dies kann mit dem GA-Tool durchgeführt werden.

7. Beim Adapterstart:

Alle mit "Read" Flag markierten GA's werden beim Start überprüft. Dies kann sich auf den höheren Busverkehr auswirken. Am Ende sind alle Zustände aktuell.

### Vermeidung von Problemen
* saubere ETS-Programmierung und noch wichtiger saubere ETS-Programmierung und am wichtigsten saubere ETS-Programmierung
* Weisen Sie die DPTs zu!!
* einheitliche Kennzeichnung der GA-Bezeichnungen (z. B. „EG Wohnen Decke Licht schalten“ und „EG Wohnen Decke Licht schalten Status“)
* Vermeidung von Sonderzeichen ",./;&%$§[]" (kann zu Problemen bei der Gaserzeugung führen)
* Prüfen Sie, ob das KNX/LAN GW erreichbar ist. Ist dies nicht der Fall, versucht der Adapter fortlaufend eine Verbindung herzustellen.
* Physikalische Adresse korrekt wählen (wichtig beim Einsatz von Linienkopplern). !!! ACHTUNG: die hier eingetragene physikalische Adresse ist NICHT die Adresse des LAN-Gateways und darf nicht auf 0 enden!!!
* Der Port der LAN-Schnittstelle ist in der Regel 3671
* Aufgrund der Möglichkeit der Statusabfrage muss eines beachtet werden: Es muss sichergestellt werden, dass nicht mehr als 40 Anfragen pro Sekunde vom ioBroker generiert werden, da diese dann physikalisch

können vom Adapter nicht mehr an das Gateway weitergegeben werden.

## GA-Werkzeug
Das GA-Tool erleichtert das Ändern der Eigenschaften von GAs.

![knxV2-3-6-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. zeigt den GA-Baum und ausgewählte GA
2. im Eigenschaftsbereich der Name des ausgewählten GA
3. ioBroker-Flags setzen
4. GA DPT einstellen
5. anerkannte Handlung GA
6. anerkannter Staat GA

![knxV2-3-2-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. Zeigen Sie die Zustands-Akt-Beziehung
2. Wenn eine Beziehung besteht, kann sie entfernt werden

Wenn keine Relation existiert, kann durch Klicken auf (2) für die ausgewählte GA (1) eine neue erstellt werden.

Im Dialog (3) kann der Peer ausgewählt werden

![knxV2-3-5-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

Wenn mehrere GAs vorhanden sind, deren Eigenschaften geändert werden sollen, verwenden Sie die Mehrfachauswahl. Diese Funktion funktioniert nur für GAs ohne Beziehung.

![knxV2-3-4-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. ausgewählte GAs
2. Zu ändernde Eigenschaften
3. Es ist keine Veränderung möglich

### Direkte Verbindung vom Nicht-KNX-Zustand zum KNX-Zustand und umgekehrt
Seit Adapterversion 2.0.6 ist es möglich, einen Nicht-KNX-ioBroker-Status direkt mit einem GA zu verknüpfen. Dies kann verwendet werden, um Zeit, Datum, beliebige Status oder Informationen auf KNX anzuwenden. (ein kleiner Hinweis: Sie können jede Ihrer IOT-Komponenten direkt mit einem GA in KNX verknüpfen (z. B. einen Homematic-Button mit einem KNX-GA verknüpfen oder einen KNX-Tastensensor mit Ihrem Sonos-Player verknüpfen)). Die Status können mit einem GroupValueRead gelesen werden, und wenn sich der Status ändert, wird er automatisch auf KNX aktualisiert. Wenn Sie den Status auf KNX ändern, wird auch das verknüpfte Nicht-KNX-IoT-Gerät aktualisiert.

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1. Wählen Sie das GA aus, mit dem Sie sich verbinden möchten
2. zeige das ausgewählte GA
3. Dieser GA muss das Attribut **write** haben
4. Wählen Sie einen gültigen Datenpunkttyp (wenn sie nicht übereinstimmen, funktioniert es nicht)
5. Es ist keine Akt-Zustand-Beziehung erlaubt
6. Schaltfläche zum Auswählen eines Nicht-KNX-Objekts zur Verknüpfung mit

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1. Wählen Sie das Nicht-KNX-Objekt aus, das Sie verknüpfen möchten
2. Klicken Sie auf „OK“, wenn Sie fertig sind

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

Nun ist KNX-GA **(1)** direkt mit dem Nicht-KNX-Iobroker **(2)** verknüpft. Mit **(3)** können Sie diese Verbindung löschen.

## Geplante Funktionen
* esf-import
* GA-Mon Busüberwachungstool

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->
## Ausnahmen und Fehler
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Der Entwickler kann keine weiteren speziellen Informationen über das System/die Konfiguration/den Benutzer/die Umgebung abrufen. Falls keine Lizenz gefunden wird, werden auch die Adapterversion und die Host-ID gemeldet.

## Vielen Dank für die Unterstützung und Hilfe
* Blaufuchs
* foxriver76

## Changelog
### 2.0.30 (22.12.2024)
* fixed GUI errors, starting redesign GA-Tools

### 2.0.29 (11.12.2024)
* updated the adapter import schema for ETS 6.3.0
* nodejs >= 20 is required 

### 2.0.28
* Update license related data and fix package version

### 2.0.27 (02.05.2024)
* updated the adapter import schema for ETS 6.2.2
* fixed UTF-8 error

### 2.0.26 (28.03.2024)
* updated the adapter import schema for ETS 6.2.1
* nodejs >= 18 is required

### 2.0.25 (03.03.2024)
* updated the adapter import schema for ETS 6.2.0
* small bug-fixes

### 2.0.24 (24.11.2023)
* updated the adapter import schema for ETS 6.1.1

### 2.0.23 (11.10.2023)
* corrected wrong GW Port after adapter upgrade
* allow self-defined values for min and max
* some small other fixes

### 2.0.22 (04.07.2023)
* added import specification, solved problems in GaTools
    
### 2.0.21 (17.06.2023)
* fixed license handling

### 2.0.20 (16.06.2023)
* fixed license handling with js-controller Version > 5

### 2.0.19 (29.05.2023)
* added ETS V6.1.0 import
* required node version >= 16.13.1

### 2.0.18 (08.04.2023)
* fixed send-delay
* small changes

### 2.0.17 (14.10.2022)
* added ETSv6.0.6 import
* major changes in Adapter Config UI
* fixed change of port settings for LAN-GW

### 2.0.16 (04.09.2022)
* added ETSv6.0.5 import

### 2.0.15 (02.06.2022)
* fixed import error with extrem large KNX catalogue files
* fixed unrecognized connection breaks

### 2.0.14 (08.04.2022)
* added ETSv6.0.4 (override 6.0.3)
* small bugfixes

### 2.0.13 (12.03.2022)
* added ETSv5.7.7 import
* fixed "unknown value" bug
* some other small fixes

### 2.0.12 (25.02.2022)
* fixed handling of undefined DP
* updated the data point types
* fix warning with incompatible DPT in future
* the biggest issue of all: I get shocked because of the war in Ukraine. My thoughts are with the people of Ukraine, I am infinitely sorry for what is happening to them and their country. It is an inhuman shame.
* can't fix it, but I appeal to everyone: Be neighbors and not enemies. Respect the other and do not fight yourselves.

### 2.0.11
* fixed password handling for projects from upgraded ETS

### 2.0.10
* import of ETS6.0.2 projects **ETS6.0.1 not possible**
* bugfixes

### 2.0.9
* import password protected project files
* bug fixes

### 2.0.8
* fixed bug with unackn write
* fixed bug in linkedState

### 2.0.7
* fixed bug with unable to write on KNX

### 2.0.6
* fixed problem on ETSv6 import
* many small bugfixes
* implemented GA-Tools directLink feature

### 2.0.5

* fixed problem on ETSv4 import
* corrected some messages
* corrected DPT14.x min and max range

### 2.0.4

* fixed DPT9.xxx calculation
* implemented date-and-time DPT19.00x
* fixed confusing "no license error"
* small bugfixes

### 2.0.3 (2021-12-04)

* fixed counting 1st Datapoint
* automaticly remove old V1 license", preventing confusion after upgrade from V1 to V2

### 2.0.1

* fixed problem with license acceptance

### 2.0.0 (2021-11-15) **Major release**

* Breaking change! => new license is neccessary V1 Licenses will not work => V1 business Licenses can changed to V2
* complete refactoring of knx-admin
* added Tool for handling GA in knx-admin
* fixed many bugs (in knx-stack, on importing ETS Projects, reconnect and timeouts)
* added new datapoint types
* added import till ETS V6
* changed license management

### 1.0.46 (2021-03-23)

* New admin GUI

### 1.0.45 (2021_03_22)

* import of ETS v5.7.5 projects

### 1.0.44 (2021_01_22)

* fixed act and state handling
* added some new datapoint types
* fix facility and room recognition and device allocation

### 1.0.42 (2020_09_03)

* Fixed problem with missing index_m.html

### 1.0.41

* fixed bug on GroupValue_Response event
* corrected connection to Gira GW

### 1.0.40

* fixed some import errors for ETS 5.7.x
* fixed bug on GroupValue_Response event

### 1.0.39

* fixed import error

### 1.0.38

* fixed some bugs on import
* show warning if import-file ist password protected

### 1.0.37 (2010-01-31)

* update for ETS 5.7.3 import

### 1.0.36 (2019-10-16)

* some bugs fixed

### 1.0.35 (2019-09-15)

* fixed permanent reconnects, if no traffic on knx-bus

### 1.0.34 (2019-09-15)

* changes on importer for detecting project-id

### 1.0.33 (2019-09-12)

* fixed bug while writing to bus
* added units to states
* fixed "read/write of undefined" error

### 1.0.32 (2019-09-03)

* updated importer for ETS V5.7.2, some changes in KNX-stack state-machine

### 1.0.31

* some fixes on ETS5.7.2 importer
* small changes in knx-stack statemachine
* added (again) phys address to admin config dialog
* fixed bug in deviceTree generation

### 1.0.30

* new Importer for ETS5.7.2 knxproj files
* extended accepted Data point types
* new adapter configuration menu
* implemented a switch for the user to decide to use "true" and "false" or "0" or "1" for binary values
* fixed bug in GroupValue_Read
* implemented a selector for local network interface for KNX to Gateway communication
* extended State Object for later features
* fixed some small other bugs

### 1.0.20

* fixed bug in handling KNX-data packages, which occurs periodical reconnects
* fixed bug in KNX-project file upload procedure

### 1.0.19

* reverted to true/false handling for DPT1.x

### 1.0.18

* fixed upload issue with ETS5.6.x project files
* switched values for "boolean" from 1 and 0 to true false 
* fixed recognition of role set for DPT1.x to switch
* fixed DPT16.xxx writing to KNX-Bus with values < 14Byte

### 1.0.17 (2018-08-16)

* Better state processing
* Add configurable package rate
* corrected Bug in "import only new objects"

### 1.0.15 (2018-07-18)

* change ChID on reconnect
* on Startup read wait for response of State channel or timeout

### 1.0.13 (2018-07-04)

* elimination of special signs while importing
* small bug-fixes

### 1.0.12 (2018-06-19)

* reduced and sorted log output
* small bug-fixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)

* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)

* closing local port in case of undefined connection state
* added advanced debug-level via adapter-config
* many fixes

### 1.0.9 (2018-04-29)

* changed to state-wise processing
* fixed "disconnect-request"
* changed connection handling with knxd
* many small fixes

### 1.0.8 (2018-04-04)

* modified package queue
* fixed ACK if sending to KNX-Bus
* many small fixes

### 1.0.7 (2018-03-16)

* fixed Adapter-lock while uploading projects

### 1.0.6 (2018-03-11)

* fixed connection problem
* corrected package counter

### 1.0.5 (2018-03-01)

* fixed empty objects, related to DPT1 (error message \[object Object\] unknown Input value)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise property update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)

* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)

* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)

* fixed certificate error

### 1.0.0 (2018-02-25)

* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapter-configuration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed post-comma values to scale-value of DPT
* implemented "add" mode for knx project upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)

* some small bug-fixes
* insert slider to set a sendDelay for slow KNX/LAN Gateways to prevent connection loss

### 0.8.5 (2017-06-05)

* project loader rebuild, dpt13-fix

### 0.8.3 (2017-04-24)

* added act channel update of corresponding state
* fix bug in state-vis update
* optimized knxproj upload

### 0.8.2 (2017-02-26)

* implemented device-config parsing from knxproj
* better choice of state/val of DP objects

### 0.8.1 (2017-02-06)

* fixed DPT1 switch problem

### 0.8.0 (2017-02-xx) comming soon

### 0.7.3 (2016-12-22)

* (chefkoch009) more DPT's are supported
* faster Startup
* implemented generation of room list with device dependencies

### 0.7.2 (2016-11-20)

* (chefkoch009) added necessary dependencies

### 0.7.1 (2016-11-19)

* (chefkoch009) Support standard KNX/LAN Gateways.

### 0.7.0 (2016-10-13)

* (chefkoch009) Support of project export

### 0.6.0 (2016-07-20)

* (chefkoch009) redesign

### 0.5.0

*  (vegetto) include vis widget

#### 0.4.0

* (bluefox) fix errors with grunt

#### 0.2.0

* (bluefox) initial release

## License

For less than 500 data points, there is no need for registration or adding a license key.
If you have more than 500 data points, you need a license.
You can choose between yearly and permanent license.

To use this adapter in ioBroker, you need to accept the source code license of the adapter.
The source code of this adapter is available under the CC-NC-BY license.

Additionally, you need a license to use the adapter. The license editions are available on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)

## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2024 K.Ringmann <info@punktnetzwerk.net>

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)