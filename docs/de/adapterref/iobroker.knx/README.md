---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: rXrT4jC7T4e+NWRa1Yj/h88/IlzfPQ9VwsayDPPc0Kg=
---
![Logo](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.knx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.knx.svg)
![NPM](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
#### Inhaltsverzeichnis
* [Beschreibung](#Beschreibung)
* [Anforderungen](#Anforderungen)
* [Funktionen](#Funktionen)
* [Adapterkonfiguration](#adapter-configuration)
    * [Lizenz installieren](#install-the-license)
    * [Konfigurationsschnittstelle](#configuration-interface)
    * [Objekte](#Objekte)
    * [Nutzung](#Nutzung)
    * [Datenpunkttypen (DPT)](#data-point-types-dpt)
    * [Wie der Import funktioniert](#wie-der-Import-funktioniert)
    * [Vermeidung von Problemen](#Vermeidung-von-Problemen)
* [GA-Tool](#ga-Tool)
    * [Direct Link non-KNX state to KNX vice-verse](#direct-link-non-knx-state-to-knx-vice-verse)
* [Geplante Funktionen](#planned-features)
* [Änderungsprotokoll](#Änderungsprotokoll)

## Beschreibung
de: Dieser Adapter ermöglicht den Import von knxproj-Dateien aus ETS. Es erstellt die Übersetzung zwischen KNX-Gruppenadressen und ioBroker und platziert die Geräte in Räumen (insbesondere für MobileUI).

ru: [Установка и базовая настройка адаптера](docs/ru/README.md)

Es verbindet sich mit Standard-KNX/LAN-Gateways.

**Achtung: Mit dem Wechsel auf die KNX-Adapter Version 2.x hat sich die Lizenzierung geändert. Eine neue Lizenz erhalten Sie bei [https://iobroker.net](https://iobroker.net/)**

**Sie sollten auch iobroker js-controller UND admin auf die neueste Version aktualisieren.**

Bevor Sie beginnen: Jeder DPT von com.Objects sollte in Ihrem ETS-Projekt eingestellt sein. Jedes Gerät sollte in Ihre Anlagenstruktur einsortiert werden.

## Anforderungen
* Knotenversion >= 14.15.4
* Admin-Version >= 5.2.0
* js-controller Version >=3.3.20

Ohne diese Voraussetzungen kann der Adapter nicht installiert werden oder funktioniert nicht richtig.

## Merkmale
* Importieren der `knxproj`-Datei
* Erzeugen einer ETS-ähnlichen Objektstruktur
* Act-Channel und State-Channel finden und kombinieren (Heuristik)
* Aktualisieren aller Zustände beim Start
* Keine Cloud oder Internet erforderlich
* Senden eines READ auf den KNX-Bus, während auf das State-Objekt geschrieben wird
* GA-Objekte mit GA-Tools bearbeiten und modifizieren
* Zustand-Akt-Beziehungen mit GA-Tools bearbeiten und modifizieren
* NEU: Nicht-KNX-State-Direktverbindung zulassen (umgekehrt)
* NEU: Adapterantworten auf GroupValueRead an ein mit DirectLink verbundenes Objekt
* NEU: Import passwortgeschützter Projektdateien (Dank an aKzenT)

##Adapterkonfiguration
Öffnen Sie nach der Installation dieses Adapters die Adapterkonfiguration.

###Installieren Sie die Lizenz
Der erste Schritt besteht darin, die Lizenz zu beantragen. Wenn Sie keine Lizenz installiert haben, werden 500 Datenpunkte angewendet.

* (1) zeigt Ihre System-ID, Sie benötigen diese, um eine Lizenz zu erhalten
* (2) Klicken Sie hier, um Ihre Lizenz zu beantragen

![knxV2-Erststart-Mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-first-start-mod.jpg)

Wenn Sie unter [https://iobroker.net](https://iobroker.net/) bereits eine neue Lizenz erstellt haben, können Sie diese in (2) einfügen, ODER Sie können diese direkt online erwerben, indem Sie auf (1) klicken.

![knxV2-2-1-Installieren-Lizenz-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-1-Install-License-mod.jpg)

Wenn Sie auf (1) geklickt haben, geben Sie Ihren iobroker.net-Konto-Login ein.

![knxV2-2-2-Installieren-Lizenz-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-2-Install-License-online-mod.jpg)

Wenn Ihre Daten korrekt sind, sehen Sie alle Ihre Lizenzen, die Sie erhalten haben. Wählen Sie diejenige aus, die Sie verwenden möchten.

![knxV2-2-3-Installieren-Lizenz-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-3-Install-License-online-mod.jpg)

Wenn dies erfolgreich war, speichern Sie es.

![knxV2-2-4-Installieren-Lizenz-online-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-4-Install-License-online-mod.jpg)

Das ist alles. Klicken Sie unten auf dieser Seite auf die Schaltfläche zum Speichern.

### Konfigurationsschnittstelle
![knxV2-2-5-Installieren-Lizenz-online-angewendet-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-2-5-Install-License-online-applied-mod.jpg)

1. KNX-Gateway IP: IPv4 des KNX-LAN Gateway.
2. KNX-Gateway-Port: Standard ist Port 3671.
3. Physikalische Adresse: Physikalische Adresse der iobroker knx-Instanz **! wichtig: das ist nicht die phys. Adresse des LAN-Gateways !** und Darf nicht auf 0 enden
4. KNX-Pakete pro Sekunde: Dies begrenzt die Paketrate. Wenn sich das KNX Lan Gateway zu oft neu verbindet oder vorübergehend nicht erreichbar ist, reduzieren Sie diese Rate.
5. Local iobroker IP: Wählen Sie die IP / Schnittstelle aus, an die der Adapter gebunden werden soll
6. Loglevel: Normalerweise ist Level "Info", zum Debuggen Level erhöhen.
7. Nur neue Datenpunkte importieren: Dies ist standardmäßig aktiviert. Im Falle einer Deaktivierung werden neue GAs generiert UND bestehende GAs werden neu erstellt.
8. Schaltfläche Datei hochladen: Drag'n Drop ist hier verfügbar oder klicken Sie auf den Dateiauswahldialog. Hier können Sie Ihren ETS-Export im `knxproj`-Format hochladen.

Nach erfolgreichem Import zeigt ein Dialog die Anzahl der importierten Objekte an. Drücken Sie nun "Speichern & Schließen" und der Adapter sollte starten.
Beim Start liest der Adapter alle Gruppenadressen mit Read-Flag und Write-Flag. Dies kann einige Zeit dauern und Ihren KNX-Bus stark belasten. Aber die Werte in Ihrem Vis werden nach dem Start aktualisiert.
Das Hochladen einer passwortgeschützten Datei ist noch nicht verfügbar.

9. Host-ID: Dies ist eine spezielle ID des iobroker-Hosts. Diese ID wird zum Generieren und Validieren der Lizenz benötigt
10. GA-Tools: Toolbox zum schnellen Wechseln von GA's

### Objekte
Hier befindet sich unter knx.0 der Gruppenadressbaum wie in Ihrem ETS-Projekt. Verwenden Sie zum Ändern der Eigenschaften das GA-Tool.

### Verwendung
Wenn der Adapter erfolgreich startet, stehen Ihnen Ihre Datenpunkte für alles zur Verfügung, was Sie gerne tun.

### Datenpunkttypen (DPT)
Alle DPTs gemäß „System Specifications, Interworking, Datapointtypes“ der KNX Association sind verfügbar. Das heißt, es gibt 2 Arten von Informationen, die Sie erhalten können: 1) ein Wert oder ein String 2) kommaseparierte Werte oder ein Array von Werten (im Moment weiß ich nicht, was der bessere Weg ist)

Beispielsweise wird ein DPT5.001 als unsigned Integer mit 8-Bit kodiert. Dies ergibt einen einzigen Wert. Der DPT3.007 (Control Dimming) ist als 1Bit(Boolean)+3Bit(unsigned Int) kodiert.
Dies ergibt z.B. in einem Wert wie "0,5", wobei "0" "Verringern" und "5" die Anzahl der Intervalle bedeutet.

### So funktioniert der Import
1. Auslesen aller Kommunikationsobjektreferenzen (COR):

    Kombinieren der Gruppenadressreferenz ID'd mit DPT der entsprechenden COR (falls vorhanden).

2. Generierung der Gruppenadressstruktur (GAS):

    Generieren des GAS basierend auf GAR-IDs und Setzen von DPT (falls noch nicht geschehen)

3. Suche nach staatlichen Adressen:

in ets-exports sind keine informationen über state und act-adressen enthalten. Der adapter parst alle GA's von "status" oder "state". Wenn es 2 GAs mit einer Ähnlichkeit von mehr als 90 % gibt, dann ist eine Adresse der Akt und die andere der Zustand. Es wird auch geprüft, ob die DPT's ähnlich sind. Deshalb ist es nicht einfach, einen Peer zu finden, wenn die GA-Namensgebung nicht konsistent ist.

4. Flagcheck in der Gerätekonfiguration:

   Die Flags werden wie folgt behandelt:

    | KNX | | | iobroker | | |
    |-------|-----------|------------|----------|----------|-------------------------------------------------|
    | Lesen | Schreiben Sie | Übertragen | Lesen | Schreiben Sie | Erklärung |
    | - | - | - | - | - | der Wert wird durch GroupValueRead| aktualisiert |
    | x | - | - | x | x | Das Senden eines beliebigen Werts in diesem Zustand löst ein GroupValueRead| aus |
    | - | x | - | - | x | mit GroupValueWrite| den Wert nach KNX schreiben |
    | - | - | x | x | - | der Zustandswert wird durch GroupValueResponse | aktualisiert |
    | x | - | x | x | x | Das Senden eines beliebigen Werts in diesem Zustand löst ein GroupValueRead| aus |

6. Erstellung von Datenpunkt-Peers (DPP):

Ein DPP wird erstellt, wenn GA, GAR und DPT gültig sind. Dies sind die DPP, mit denen der Adapter arbeitet.
Wenn DPT in einem GA fehlt, weil es nicht gefunden werden konnte, wird das DPP nicht erstellt. Das geht mit GA-Tool.

7. beim Adapterstart:

Alle mit "Read" Flag markierten GAs werden beim Start geprüft. Dies kann sich auf einen höheren Busverkehr auswirken. Am Ende sind alle Zustände aktuell.

###Vermeidung von Problemen
* saubere ETS-Programmierung und noch wichtiger saubere ETS-Programmierung und vor allem saubere ETS-Programmierung
* Weisen Sie die DPTs zu!!
* einheitliche Kennzeichnung der GA-Bezeichnungen (z. B. „EG Wohnen Decke Licht schalten“ und „EG Wohnen Decke Licht schalten Status“ )
* Vermeidung von Sonderzeichen ",./;&%$§[]" (kann Probleme bei der Gaserzeugung verursachen)
* Überprüfen Sie, ob das KNX/LAN GW erreichbar ist. Ist dies nicht der Fall, versucht der Adapter ständig, eine Verbindung herzustellen.
* Physikalische Adresse richtig wählen ( wichtig bei Verwendung von Linienkopplern ). !!! ACHTUNG: die hier eingetragene physikalische Adresse ist NICHT die Adresse des LAN Gateways und darf nicht auf 0 enden !!!
* Der Port der LAN-Schnittstelle ist normalerweise 3671
* Aufgrund der Möglichkeit der Statusabfrage ist eines zu beachten: Es muss darauf geachtet werden, dass nicht mehr als 40 Anfragen pro Sekunde durch den ioBroker generiert werden, da diese dann physikalisch generiert werden können

  kann vom Adapter nicht mehr an das Gateway weitergegeben werden.

## GA-Tool
Das GA-Tool macht es einfach, Eigenschaften von GA's zu ändern.

![knxV2-3-6-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-6-GATools-mod.jpg)

1. zeigt den GA-Baum und den ausgewählten GA
2. im Eigenschaftenbereich der Name des ausgewählten GA
3. iobroker-Flags setzen
4. GA DPT einstellen
5. Anerkannte Rechtsakte GA
6. anerkannter Staat GA

![knxV2-3-2-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-2-GATools-mod.jpg)

1. Zeigen Sie die Beziehung zwischen Staat und Tat auf
2. Wenn eine Beziehung besteht, kann sie entfernt werden

Wenn noch keine Relation existiert, kann durch Klicken auf (2) für den ausgewählten GA (1) eine neue erstellt werden.
Im Dialog (3) kann der Peer ausgewählt werden

![knxV2-3-5-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-5-GATools-mod.jpg)

Wenn es mehr GAs zum Ändern von Eigenschaften gibt, verwenden Sie die Mehrfachauswahl. Diese Funktion funktioniert nur für GAs ohne Beziehung.

![knxV2-3-4-GATools-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-4-GATools-mod.jpg)

1. ausgewählte GAs
2. zu ändernde Eigenschaften
3. Es ist keine Änderung möglich

### Direct Link Nicht-KNX-Zustand zu KNX umgekehrt
Seit Adapter Version 2.0.6 ist es möglich, einen Nicht-KNX ioBroker Zustand direkt mit einem GA zu verknüpfen. Damit können Uhrzeit, Datum, beliebige Zustände oder Infos auf KNX übernommen werden. (ein kleiner Tipp: Sie können jede Ihrer IOT-Komponenten direkt mit einem GA in KNX verknüpfen (z. B. einen Homematic-Taster mit einem KNX-GA verknüpfen oder einen KNX-Tastensensor mit Ihrem Sonosplayer verknüpfen)). Die Zustände können mit einem GroupValueRead gelesen werden und wenn sich die Zustände ändern, werden sie automatisch auf KNX aktualisiert. Auch wenn Sie auf KNX wechseln, wird das verknüpfte Nicht-KNX-IOT-Gerät aktualisiert.

![knxV2-3-7-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-7-GATools-DirectLink-mod.jpg)

1. Wählen Sie den GA aus, zu dem eine Verbindung hergestellt werden soll
2. den ausgewählten GA anzeigen
3. Dieses GA muss das Attribut **write** haben
4. Wählen Sie einen gültigen Datenpunkttyp (wenn sie nicht übereinstimmen, funktioniert es nicht)
5. Es ist nicht erlaubt, eine Act-State-Beziehung zu haben
6. Schaltfläche zur Auswahl eines Nicht-KNX-Objekts zur Verknüpfung

![knxV2-3-8-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-8-GATools-DirectLink-mod.jpg)

1. Wählen Sie das Nicht-KNX-Objekt aus, das Sie verknüpfen möchten
2. Klicken Sie auf OK, wenn Sie fertig sind

![knxV2-3-9-GATools-Directlink-mod](../../../en/adapterref/iobroker.knx/docs/pictures/knxV2-3-9-GATools-DirectLink-mod.jpg)

Jetzt ist KNX-GA **(1)** direkt mit Nicht-KNX-iobroker **(2)** verknüpft. Mit **(3)** können Sie diese Verknüpfung löschen.

## Geplante Funktionen
* esf-Import
* GA-Mon-Busüberwachungstool

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __LAUFENDE ARBEIT__ -->
## Ausnahmen und Fehler
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Der Entwickler kann keine weiteren speziellen Informationen über das System/config/user/enviroment erhalten. Falls keine Lizenz gefunden wird, werden auch die Adapterversion und die Host-ID gemeldet.

## Changelog
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
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

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

For <500 datapoints there is no need of registration or adding a license key. If you have more then 500 datapoints you need a license. You can choose  
between yearly and permanent licence.

To use this adapter in ioBroker you need to accept the source code license of the adapter. The source code of this adapter is available under the CC-NC-BY license.

Additionally you need a license to use the adapter. The license editions are available on [https://iobroker.net/www/pricing](https://iobroker.net/www/pricing)


## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2021 K.Ringmann <info@punktnetzwerk.net>

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