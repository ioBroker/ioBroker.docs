---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: 446KT1mq24U1sxvwHHLu8Ft523jsf5ainuqeZ2zjeBo=
---
![Logo](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.knx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### Inhaltsverzeichnis
* [Beschreibung](#description)
* [Anforderungen](#requirements)
* [Funktionen](#features)
* [Installation](#installation)
* [Adapterkonfiguration](#adapter-configuration)
* [Lizenz installieren](#install-the-license)
* [Konfigurationsschnittstelle](#configuration-interface)
* [Objekte](#objects)
* [Verwendung](#Verwendung)
* [Datenpunkttypen (DPT)](#data-point-types-dpt)
* [So funktioniert der Import](#how-the-import-works)
* [Vermeidung von Problemen](#avoidance-of-problems)
* [GA-Tool](#ga-tool)
* [Direkte Verbindung zwischen Nicht-KNX-System und KNX-System (und umgekehrt)](#direct-link-non-knx-state-to-knx-vice-verse)
* [Geplante Funktionen](#planned-features)
* [Änderungsprotokoll](#changelog)

## Beschreibung
Dieser Adapter ermöglicht den Import von `knxproj`-Dateien aus ETS. Er generiert die Übersetzung zwischen KNX-Gruppenadressen und ioBroker und ordnet die Geräte Räumen zu (insbesondere für MobileUI).

ru: [Установка и базовая настройка адаптера](docs/ru/README.md)

Es ist mit Standard-KNX/LAN-Gateways kompatibel.

**Achtung: Mit dem Wechsel zu KNX-Adapter Version 2.x hat sich die Lizenzierung geändert. Sie können eine neue Lizenz unter [https://iobroker.net](https://iobroker.net/) erhalten.**

**Sie sollten außerdem iobroker js-controller UND admin auf die neueste Version aktualisieren.**

Vor Beginn: Alle DPTs von com.Objects müssen in Ihrem ETS-Projekt eingerichtet sein. Alle Geräte müssen Ihrer Anlagenstruktur zugeordnet sein.

## Anforderungen
* Node-Version >= 24.0.0
* Administratorversion >= 5.2.0
* js-controller Version >= 3.3.20

Ohne diese Voraussetzung lässt sich der Adapter nicht installieren oder er funktioniert nicht richtig.

## Merkmale
* Importieren der `knxproj`-Datei
* Erzeugung einer ETS-ähnlichen Objektstruktur
* Auffinden und Kombinieren von Handlungs- und Zustandskanälen (Heuristik)
* Aktualisierung aller Zustände beim Start
* Keine Cloud oder Internetverbindung erforderlich
* Senden eines Lesebefehls an den KNX-Bus während des Schreibens auf das Zustandsobjekt
* GA-Objekte mit GA-Tools bearbeiten und modifizieren
* Bearbeiten und Ändern von Beziehungen zwischen Bundesstaaten und Gesetzen mit GA-Tools
* NEU: Direkte Verbindung eines Nicht-KNX-Zustands zulassen (und umgekehrt)
* NEU: Adapterantworten auf GroupValueRead für ein mit directLink verbundenes Objekt
* NEU: Import passwortgeschützter Projektdateien (danke an aKzenT)
* NEU: Responsives Design für die Admin-Oberfläche (materialize)

###Installation
Dieser Adapter lässt sich nur mit npm installieren. Die Installation über GitHub funktioniert **nicht**.

##Adapterkonfiguration
Nach der Installation dieses Adapters öffnen Sie die Adapterkonfiguration.

###Lizenz installieren
Der erste Schritt besteht darin, die Lizenz anzuwenden. Falls Sie keine Lizenz installiert haben, werden 500 Datenpunkte angerechnet.

* (1) zeigt Ihre System-ID an; diese benötigen Sie zum Erhalt einer Lizenz.
* (2) Klicken Sie hier, um Ihre Lizenz zu beantragen

![knxV2-first-start-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

Wenn Sie bereits eine neue Lizenz unter [https://iobroker.net](https://iobroker.net/) erstellt haben, können Sie diese in (2) einfügen, ODER Sie können sie direkt online erwerben, indem Sie auf (1) klicken.

![knxV2-2-1-Install-License-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

Wenn Sie auf (1) geklickt haben, geben Sie Ihre iobroker.net-Konto-Anmeldedaten ein.

![knxV2-2-2-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

Wenn Ihre Daten korrekt sind, werden Ihnen alle Ihre Lizenzen angezeigt. Wählen Sie die gewünschte Lizenz aus.

![knxV2-2-3-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

Falls dies erfolgreich war, speichern Sie es.

![knxV2-2-4-Install-License-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

Das ist alles. Klicken Sie unten auf dieser Seite auf die Schaltfläche zum Speichern.

### Konfigurationsschnittstelle
![knxV2-2-5-Install-License-online-applied-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. KNX-Gateway IP: IPv4 des KNX-LAN Gateways.
2. KNX-Gateway-Port: Standardmäßig ist Port 3671 eingestellt.
3. Physikalische Adresse: Physikalische Adresse der iobroker KNX-Instanz. **Wichtig: Dies ist nicht die physische Adresse des LANs.**

Gateway!** und darf nicht auf 0 enden

4. KNX-Pakete pro Sekunde: Dies begrenzt die Paketrate. Wenn das KNX LAN-Gateway zu oft die Verbindung wiederherstellt oder vorübergehend nicht erreichbar ist.

Wenn Sie die Möglichkeit nutzen, reduzieren Sie diesen Satz.

5. Lokale iobroker-IP: Wählen Sie die IP-Adresse/Schnittstelle aus, an die der Adapter gebunden werden soll.
6. loglevel: Normalerweise ist dies die Stufe "Info", zum Debuggen erhöhen Sie die Stufe.
7. Nur neue Datenpunkte importieren: Diese Option ist standardmäßig aktiviert. Wenn sie deaktiviert wird, werden neue GAs generiert UND

Die bestehenden GAs werden neu erstellt.

8. Schaltfläche „Datei hochladen“: Hier können Sie per Drag & Drop oder durch Klicken auf den Dateiauswahldialog Ihre ETS-Datei hochladen.

Exportieren Sie im Format `knxproj`.

Nach erfolgreichem Import zeigt ein Dialogfeld die Anzahl der importierten Objekte an. Klicken Sie nun auf „Speichern & Schließen“. Der Adapter sollte nun starten.

Beim Start liest der Adapter alle Gruppenadressen mit Lese- und Schreibflag. Dies kann einige Zeit dauern und die KNX-Buslast erhöhen. Die Werte in Ihrer Visualisierung werden jedoch nach dem Start aktualisiert.

Das Hochladen einer passwortgeschützten Datei ist derzeit nicht möglich.

9. Host-ID: Dies ist eine spezielle ID des iobroker-Hosts. Diese ID ist für die Generierung und Validierung der Lizenz erforderlich.
10. GA-Tools: Werkzeugkasten für sich schnell ändernde GAs

### Objekte
Hier finden Sie unter knx.0 die Gruppenadressstruktur, wie in Ihrem ETS-Projekt. Zum Ändern der Eigenschaften verwenden Sie GA-Tool.

### Verwendung
Wenn der Adapter erfolgreich startet, stehen Ihnen Ihre Datenpunkte für alle gewünschten Aktionen zur Verfügung.

### Datenpunkttypen (DPT)
Alle DPTs gemäß „System Specifications, Interworking, Datapointtypes“ der KNX Association sind verfügbar. Das bedeutet, dass Sie zwei Arten von Informationen erhalten können:

1) ein Wert oder eine Zeichenkette 2) durch Kommas getrennte Werte oder ein Array von Werten (momentan weiß ich noch nicht, welche Methode besser geeignet ist)

Beispielsweise wird ein DPT5.001 als vorzeichenlose Ganzzahl mit 8 Bit kodiert. Dies ergibt einen einzelnen Wert. Der DPT3.007 (Steuerungsdimmung) wird als 1 Bit (Boolescher Wert) + 3 Bit (vorzeichenlose Ganzzahl) kodiert.

Dies führt beispielsweise zu einem Wert wie „0,5“, wobei „0“ „Verringern“ und „5“ die Anzahl der Intervalle bedeutet.

### So funktioniert der Import
1. Lesen aller CommunicationObjectReferences (COR):

Kombination der groupadressreference ID mit dem DPT des entsprechenden COR (falls vorhanden).

2. Generierung der Gruppenadressstruktur (GAS):

GAS auf Basis der GAR-IDs generieren und DPT festlegen (falls noch nicht geschehen).

3. Ermittlung der Adressen in den einzelnen Bundesstaaten und Gesetzen:

In ets-exports sind keine Informationen über Status- und Akteursadressen enthalten. Der Adapter analysiert alle GAs mit dem Status „Status“ oder „Status“.

Wenn zwei GAs eine Ähnlichkeit von über 90 % aufweisen, wird eine Adresse dem Akteur und die andere dem Status zugeordnet. Zusätzlich wird geprüft, ob die DPTs ähnlich sind. Daher ist es schwierig, ein passendes Paar zu finden, wenn die GA-Benennung nicht einheitlich ist.

4. Flag-Prüfung in der Gerätekonfiguration:

Die Flaggen werden wie folgt behandelt:

| KNX | KNX | KNX | ioBroker | ioBroker | |
       |-------|-------|----------|----------|----------|----------------------------------------------------------|
| Lesen | Schreiben | Senden | Lesen | Schreiben | Erklärung |
| - | - | - | - | - | Der Wert wird von GroupValueRead aktualisiert |
| x | - | - | x | x | Senden eines beliebigen Werts in diesem Zustand löst GroupValueRead aus |
| - | x | - | - | x | Wert mit GroupValueWrite an KNX senden |
| - | - | x | x | - | Der Statuswert wird von GroupValueResponse aktualisiert |
| x | - | x | x | x | Senden eines beliebigen Werts in diesem Zustand löst GroupValueRead aus |

6. Erstellung von Datenpunkt-Peers (DPP):

Ein DPP wird erstellt, wenn GA, GAR und DPT gültig sind. Dies sind die DPPs, mit denen der Adapter arbeitet. Falls DPT in einem GA fehlt, weil es nicht gefunden werden konnte, wird kein DPP erstellt. Dies kann mit dem GA-Tool behoben werden.

7. Beim Start des Adapters:

Alle mit dem „Gelesen“-Flag gekennzeichneten GAs werden zu Beginn überprüft. Dies kann zu einem höheren Busverkehr führen. Am Ende sind alle Bundesstaaten auf dem neuesten Stand.

### Vermeidung von Problemen
* Saubere ETS-Programmierung und, noch wichtiger, saubere ETS-Programmierung und am wichtigsten, saubere ETS-Programmierung
* Weisen Sie die DPTs zu!!
* einheitliche Kennzeichnung der GA-Bezeichnungen (z. B. „EG Wohnen Decke Licht schalten“ und „EG Wohnen Decke Licht schalten Status“)
* Vermeidung der Sonderzeichen ",./;&%$§[]" (kann Probleme bei der Gaserzeugung verursachen)
* Prüfen Sie, ob das KNX/LAN-Gateway erreichbar ist. Falls nicht, versucht der Adapter ständig, eine Verbindung herzustellen.
* Wählen Sie die korrekte physikalische Adresse (wichtig bei Verwendung von Leitungskupplungen). !!! ACHTUNG: Die eingegebene physikalische Adresse

Dies ist NICHT die Adresse des LAN-Gateways und darf nicht mit 0 enden!!!

* Der Port der LAN-Schnittstelle ist üblicherweise 3671.
* Aufgrund der Möglichkeit von Statusabfragen ist Folgendes zu beachten: Es muss sichergestellt werden, dass nicht mehr als 40 Anfragen pro Sitzung gestellt werden.

Die zweiten werden vom ioBroker generiert, da diese dann physisch erzeugt werden können und nicht mehr vom Adapter an das Gateway weitergeleitet werden können.

## GA-Tool
Mit dem GA-Tool lassen sich die Eigenschaften von GAs einfach ändern.

![knxV2-3-6-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. zeigt den GA-Baum und den ausgewählten GA-Baum.
2. Im Abschnitt „Eigenschaften“ den Namen des ausgewählten GA angeben.
3. iobroker-Flags setzen
4. GA DPT einstellen
5. anerkannter Akt GA
6. anerkannter Staat GA

![knxV2-3-2-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. Zeigen Sie die Zustands-Handlungs-Beziehung.
2. Falls eine Beziehung besteht, kann sie entfernt werden.

Besteht keine Beziehung, kann durch Klicken auf (2) für die ausgewählte GA (1) eine neue erstellt werden.
Im Dialog (3) kann der Peer ausgewählt werden.

![knxV2-3-5-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

Wenn mehrere GAs Eigenschaften geändert werden sollen, verwenden Sie die Mehrfachauswahl. Diese Funktion ist nur für GAs ohne Beziehung verfügbar.

![knxV2-3-4-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. ausgewählte GAs
2. Zu ändernde Eigenschaften
3. Es ist keine Änderung möglich

### Direkte Verbindung zwischen Nicht-KNX- und KNX-Systemen und umgekehrt
Seit Adapterversion 2.0.6 ist es möglich, den Status eines Nicht-KNX-ioBrokers direkt mit einem GA zu verknüpfen. Dadurch lassen sich Uhrzeit, Datum, beliebige Status oder Informationen an KNX übertragen. (Kleiner Tipp: Sie können jede Ihrer IoT-Komponenten direkt mit einem GA in KNX verbinden, z. B. einen Homematic-Taster mit einem KNX-GA oder einen KNX-Tastensensor mit Ihrem Sonos-Player.) Die Status können mit `GroupValueRead` ausgelesen werden. Ändert sich der Status, wird er automatisch in KNX aktualisiert. Umgekehrt wird bei einer Änderung in KNX das verknüpfte Nicht-KNX-IoT-Gerät aktualisiert.

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1. Wählen Sie das GA aus, mit dem eine Verbindung hergestellt werden soll.
2. Zeigen Sie die ausgewählte GA an.
3. Diese GA muss das **write**-Attribut besitzen.
4. Wählen Sie einen gültigen Datenpunkttyp (wenn diese nicht übereinstimmen, funktioniert es nicht).
5. Es ist nicht zulässig, eine Akt-Zustands-Beziehung zu haben.
6. Schaltfläche zur Auswahl eines Nicht-KNX-Objekts zur Verknüpfung mit

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1. Wählen Sie das Nicht-KNX-Objekt aus, das Sie verknüpfen möchten.
2. Klicken Sie auf OK, wenn Sie fertig sind.

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

KNX-GA **(1)** ist nun direkt mit dem Nicht-KNX-iobroker **(2)** verknüpft. Mit **(3)** kann diese Verknüpfung aufgehoben werden.

## Geplante Funktionen
* esf-import
* GA-Mon Busüberwachungstool

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->
## Ausnahmen und Fehler
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Der Entwickler kann keine weiteren spezifischen Informationen über System/Konfiguration/Benutzer/Umgebung abrufen. Falls keine Lizenz gefunden wird, werden auch die Adapterversion und die Host-ID gemeldet.

Vielen Dank für die Unterstützung und Hilfe!
* Blaufuchs
* foxriver76

## Changelog

[Older changelogs can be found there](CHANGELOG_OLD.md)

### 2.0.40 (05.04.2026)

* fixed connection state response handling

### 2.0.39 (05.04.2026)

* added support for ETS 6.4.1
* bug fixing
* dependency updates

### 2.0.38 (01.03.2026)

* 0

### 2.0.37 (20.02.2026)

* dependency updates
* bug fix in adapter configuration

### 2.0.35 (05.02.2026)

* dependency updates
* bug fixing in GA-Tools
* feature enhancements in GA-Tools

### 2.0.33 (22.6.2025)

* unstable knx-connection problem solved

### 2.0.31 (22.05.2025)

* updated the adapter import schema for ETS 6.3.1
* nodejs >= 22 is required

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
* the biggest issue of all: I get shocked because of the war in Ukraine. My thoughts are with the people of Ukraine, I
  am infinitely sorry for what is happening to them and their country. It is an inhuman shame.
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
* show warning if import-file is password protected

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

* (vegetto) include vis widget

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

Additionally, you need a license to use the adapter. The license editions are available
on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)

## License

The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2026 K.Ringmann info@punktnetzwerk.net

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