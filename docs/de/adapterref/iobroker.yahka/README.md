---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: 5kS1aNzjVYFZ7GMXeZQp0GDoEU84l7z6x91GrxmtWbQ=
---
![Logo](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![Anzahl der Installationen](http://iobroker.live/badges/yahka-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yahka.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![Tests](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)
![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# Iobroker.yahka
## Installation und Verwendung
Einzelheiten zur Installation und Konfiguration dieses Adapters finden Sie im [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki)

## Voraussetzungen
Bevor Sie den Adapter installieren können, müssen Sie einige Pakete (für Linux) herunterladen: `sudo apt-get install libavahi-compat-libdnssd-dev`

## Installieren Sie die neueste **Version**
Klicken Sie einfach im ioBroker-Admin-Panel auf der Seite „Adapter“ auf die Schaltfläche „+“ hinter „Homekit Yahka-Adapter“.

## Installieren Sie die neueste **Beta**
Wenn Sie auf dem Laufenden sein und die neueste Beta testen möchten, können Sie den Adapter über eine GitHub-URL installieren.

(Manchmal ist ein zusätzlicher Upload (z.B. `iobroker upload yahka`) und Adapterneustart notwendig)

## Sichern und Wiederherstellen
Achtung: Um `ioBroker.yahka` auf einem anderen System wiederherstellen zu können, muss neben den üblichen `iobroker backup` und `iobroker restore` auch der Ordner `yahka.X.hapdata` unter `/opt/iobroker/iobroker-data` gesichert und ggf. wiederhergestellt werden. [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/ioBroker.yahka-auf-ein-anderes-System-umziehen) / [Problem](https://github.com/jensweigele/ioBroker.yahka/issues/176)

Eine weitere Möglichkeit zur Sicherung und Wiederherstellung ist der Adapter [Sicherung](https://github.com/simatec/ioBroker.backitup/blob/master/README.md). Dieser sichert automatisch den Ordner `yahka.X.hapdata`.
Eine Wiederherstellung ist auch über die BackItUp-GUI möglich.

Eine ausführliche Beschreibung finden Sie unter [Hier](https://github.com/simatec/ioBroker.backitup/wiki/ioBroker.backitup-Wiki-Deutsch#yahka-backup).

## Fehlerbehebung
### Die Bridge funktioniert nicht oder ein Gerät reagiert nicht
Versuchen Sie, den MAC/Benutzernamen der Bridge zu ändern oder den Ciao-Werbetreibenden zu aktivieren

### Es sind nicht alle neuen Funktionen verfügbar:
Sollten nach einem Yahka-Update nicht alle neuen Features zur Verfügung stehen, versuche einen Upload (z.B. `iob upload yahka`) und starte den Adapter neu.

### Fehlender Avahi-Daemon (Linux)
Wenn im Protokoll der folgende Fehler angezeigt wird:

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

Sie müssen einige zusätzliche Schritte ausführen:

* Avahi-Daemon installieren:

`sudo apt-get install avahi-daemon -y`

* Bearbeiten Sie avahi-daemon.conf

`sudo nano avahi-daemon.conf `

Ändern Sie die folgenden Variablen:

```
host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### Fehlendes pam-devel-Paket (Linux)
Wenn im Protokoll der folgende Fehler angezeigt wird:

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

Sie müssen das Paket pam-devel installieren:

* Avahi-Daemon installieren:

`sudo apt-get install pam-devel -y`

### Bonjour fehlt (Windows)
– Download: `https://www.samuelattard.com/files/bonjourcore2.msi`
– Ausführen: „msiexec /i bonjourcore2.msi /qn“
- entfernen: „del bonjourcore2.msi“.
- Download: `https://www.samuelattard.com/files/bonjoursdksetup.exe`
- Ausführen: `bonjoursdksetup.exe /quiet`
- Entfernen: „del bonjoursdksetup.exe“.
- Stellen Sie ein: „set BONJOUR_SDK_HOME=C:\Programme\Bonjour SDK“.

Und installieren Sie danach den Yahka-Adapter.

## Einige Worte zu HomeKit
Die Architektur von HomeKit ist wie folgt:

Es gibt **Geräte** als logische Einheiten. Jedes Gerät kann mehrere **Dienste** haben und jeder Dienst hat mehrere **Eigenschaften**.

Am Ende ist ein Merkmal ein Endpunkt, von dem Werte gelesen oder in den Werte geschrieben werden können.

Welche Eigenschaften ein Dienst haben kann, wird von Apple/HomeKit vorgegeben und durch den Diensttyp bestimmt. Die Diensttypen werden ebenfalls von Apple/HomeKit vorgegeben.

Beispiel:

Ein Garagentoröffner ist ein Gerät, das zwei Funktionen haben kann:

1. Garagentoröffner
2. Licht

Der Garagentoröffnerdienst selbst kann verschiedene Eigenschaften haben, wie: CurrentDoorState, TargetDoorState und viele mehr.

Außerdem könnte der Lichtdienst verschiedene Eigenschaften haben, wie: „Ein“ (und viele andere zum Ändern der Lichtfarbe usw.)

## Was Yahka macht
Mit Yahka ist es möglich, einen ioBroker-Datenpunkt einer HomeKit-Eigenschaft zuzuordnen.

Da manchmal Zuordnungen notwendig sind (z. B. sind die „State“-Werte eines Garagentors zwischen HomeKit und anderen Systemen unterschiedlich), besteht auch die Möglichkeit, Funktionen zum Konvertieren der Werte anzugeben. Dies wird weiter unten beschrieben.

Um zu viel Verwaltungsaufwand zu vermeiden, befinden sich alle Geräte, die Sie in Yahka erstellen, hinter einer sogenannten „Bridge“. Mit dieser Bridge müssen Sie die Bridge nur mit Ihrem iOS-Gerät koppeln, um Zugriff auf alle Geräte zu erhalten. Andernfalls müssten Sie jedes Yahka-Gerät mit Homekit koppeln.

## Richten Sie die Bridge ein und erstellen Sie Geräte und Dienste
Jedes Gerät, das mit Homekit gekoppelt werden muss, benötigt einen „Benutzernamen“, der die Form einer Mac-Adresse hat. Yahka generiert automatisch einen zufälligen Benutzernamen für jede Yahka-Instanz.

**Wichtig: Wenn du den Benutzernamen änderst, nachdem du Yahka mit HomeKit gekoppelt hast, musst du alle Geräte in iOS neu konfigurieren (Raumzuordnung, Position usw.). Die Änderung des Benutzernamens bedeutet für iOS, dass es sich um ein komplett neues Gerät handelt!**

Neben dem Benutzernamen muss noch ein PIN-Code angegeben werden, der auf dem iOS-Gerät eingegeben werden muss.

Dies alles kann durch einen Klick auf „:yahka.0“ im Admin-Panel von Yahka angegeben werden. (Erweitern Sie das Panel auf der rechten Seite, nachdem Sie auf den Listeneintrag geklickt haben.) Der Name der Bridge kann dort ebenfalls geändert werden.

Nachdem Sie die Bridge eingerichtet haben, können Sie die gewünschten Geräte mit der Schaltfläche „Gerät hinzufügen“ oben hinzufügen.
Sobald ein Gerät hinzugefügt/ausgewählt ist, können Sie diesem Gerät Dienste hinzufügen.

Es ist notwendig, einen Dienstnamen und einen Diensttyp anzugeben.

Je nach Diensttyp ändert sich die Liste der verfügbaren Merkmale.

## Merkmale einrichten
Wenn Sie eine Eigenschaft unterstützen möchten, müssen Sie das Kontrollkästchen „aktiviert“ auf der linken Seite der Eigenschaft aktivieren.
Für jede Eigenschaft können Sie die folgenden Eigenschaften angeben:

- InOutFunction: Sie können eine vordefinierte Funktion angeben, die für die Übergabe der Werte von HomeKit an ioBroker und umgekehrt verantwortlich ist
- InOutParameter: Hier können Sie Parameter für die ausgewählte InOutFunction angeben. Die verfügbaren/erwarteten Parameter hängen von der ausgewählten Funktion ab. Nachfolgend finden Sie eine kurze Übersicht über die Funktionen und Parameter.
- ConversionFunction: Zusätzlich zur InOutFunction können Sie auch eine Funktion angeben, die einen von HomeKit kommenden Wert in ioBroker konvertiert (und umgekehrt).
- ConversionParameter: dasselbe wie InOutParameter – die verfügbaren/erwarteten Parameter hängen von der ausgewählten Funktion ab.

## Übersicht der InOut-Funktionen
| Funktion | Erwarteter Parameter | Beschreibung |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| const | Wert | Die const-Funktion übergibt den in „InOutParameter“ angegebenen Wert immer dann an die Konvertierungsfunktion, wenn HomeKit den Wert liest. Wenn HomeKit den Wert schreiben möchte, wird diese Aktion verweigert |
| ioBroker.State | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreibvorgänge. Alle Vorgänge werden sofort und ohne Pufferung oder Filterung ausgeführt (Werte werden an die angegebenen Konvertierungsfunktionen übergeben) |
| ioBroker.State.Deferred | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreiboperationen. Schreiboperationen von HomeKit werden direkt an die Konvertierungsfunktion übergeben. Änderungen von ioBroker werden 150ms lang entprellt - das heißt, der Wert wird nur dann an HomeKit übermittelt, wenn innerhalb von 150ms keine andere Änderung erfolgt. |
| ioBroker.State.OnlyACK | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreiboperationen. Schreiboperationen von HomeKit werden direkt an die Konvertierungsfunktion übergeben. Änderungen von ioBroker werden nur dann an HomeKit weitergeleitet, wenn das "Acknowledged"-Flag des Wertes gesetzt ist. Andernfalls wird der letzte quittierte Wert an HomeKit übermittelt |
| ioBroker.homematic.<br> WindowCovering.TargetPosition | Id des HomeMatic Level Datenpunkts<br> oder<br> String-Array mit der Id des Level-Datenpunkts und der Id des Working-Datenpunkts | Diese Funktion ist speziell für die Steuerung der HomeMatic-Fensterabdeckung gedacht. Diese Funktion verzögert die Übertragung der Werte an HomeKit, während sich die Fensterabdeckung bewegt. Dies ist notwendig, um ein Flackern des Fensterabdeckungs-Schiebereglers in iOS zu vermeiden |

## Übersicht der Konvertierungsfunktionen
| Funktion | Erwarteter Parameter | Beschreibung |
|------------------------------------------------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Passthrough | \<none\> | Der Wert von ioBroker wird ohne Konvertierung an HomeKit übergeben (und umgekehrt) |
| HomematicRichtungZu<br> HomekitPositionState | \<none\> | Diese Funktion bildet die Richtungsaufzählung der Homematic-Fensterabdeckung auf die PositionState-Aufzählung von HomeKit ab (und umgekehrt) |
| HomematicControlModeTo<br> HomekitHeizungKühlungZustand | \<none\> | Diese Funktion bildet die ControlMode-Aufzählung von Homematic auf die HeathinCoolingState-Aufzählung von HomeKit ab (und zurück) |
| Stufe 255 | \<none\> | Diese Funktion skaliert einen ioBroker-Wert mit einem Wertebereich von 0 bis 255 auf einen HomeKit-Wert mit einem Wertebereich von 0 bis 100 (und zurück).<br> **Beispiel:** 255 in ioBroker wird für HomeKit in 100 umgewandelt. |
| MaßstabInt<br> scaleFloat | `{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }` | Diese Funktion ist ähnlich wie „level255“, aber allgemeiner. Sie wandelt einen ioBroker-Wert mit einem Bereich von „iobroker.min“ (0, wenn weggelassen) bis „iobroker.max“ in einen HomeKit-Wert mit einem Wertebereich von „homekit.min“ (0, wenn weggelassen) bis „homekit.max“ (und zurück) um.<br> **Beispiel:** Wenn das Parameterfeld lautet: `{ "homekit.max": 500, "iobroker.max": 250}`<br> Der Wert von ioBroker wird tatsächlich mit 2 multipliziert, bevor er an HomeKit gesendet wird.<br> **Die Min-Parameter sind erst ab Version 0.8.0 verfügbar** |
| Farbton | \<keine\> | Diese Funktion ist eine spezialisierte Version von scaleInt mit den Parametern `iobroker.max=65535` und `homekit.max=360`. |
| Farbton | \<keine\> | Diese Funktion ist eine spezialisierte Version von scaleInt mit den Parametern „iobroker.max=65535“ und „homekit.max=360“. |

## Homematic Jalousieaktor \ Fensterabdeckung
Zur Einbindung der Homematic Jalousieaktoren (z.B. HM-LC-Bl1PBU-FM) sind folgende Einstellungen notwendig:

* Fügen Sie einem Gerät einen Dienst hinzu
* Setzen Sie den Servicenamen auf einen beliebigen Namen und den Servicetyp auf „WindowCovering“. Der Serviceuntertyp kann leer gelassen werden
* Aktivieren und füllen Sie folgende Merkmale aus:

| Merkmalsname | 1: InOut-Funktion<br> 2: Konvertierungsfunktion | 1: InOut-Parameter<br> 2: Konvertierungsparameter |
|---------------------|---------------------------------------------------------------------------|----------------------------------------------------------------|
| Aktuelle Position | 1: ioBroker.State.OnlyACK<br> 2: Durchgang | 1: _\<path to homematic object\> _.1.EBENE<br> 2: \<empty\> |
| PositionState | 1: ioBroker.State.OnlyACK<br> 2: HomematicDirectionToHomekitPositionState | 1: _\<path to homematic object\> _.1.RICHTUNG<br> 2: \<empty\> |
| Zielposition | 1: ioBroker.homematic.WindowCovering.Zielposition<br> 2: Durchgang | 1: _\<path to homematic object\> _.1.EBENE<br> 2: \<empty\> |

Der Wert _\<Pfad zum Homematic-Objekt\>_ muss durch den tatsächlichen Pfad zum Gerät ersetzt werden (z. B. hm-rpc.0.NEQ0012345).

Allgemeine Informationen zur Konfigurationsmaske finden Sie unter: TODO

Weitere Informationen zur Konfiguration, den InOut-Funktionen und Konvertierungsfunktionen finden Sie unter: [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

## Hinweise für Entwickler
Dieses Repo enthält ein Untermodul. Bevor Sie es erstellen, müssen Sie dieses auch schließen/initialisieren. Verwenden Sie beispielsweise `git submodule update --init --recursive`, um seinen Inhalt zu aktualisieren und abzurufen.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 1.0.9 (2024-09-08)
* Corrected Admin GUI

### 1.0.6 (2024-08-30)
* (tarikweiss) Fixes errors with non-existing service types

### 1.0.5 (2024-08-29)
* (tarikweiss) Fixes errors with non-existing service types
* (bluefox) Revert renaming of states back: `HomematicControlModeToHomekitHeatingCoolingState => HomematicControlModeToHomekitHeathingCoolingState, Deferred => Defered`

### 1.0.4 (2024-08-12)
* (Apollon77) Important: js-controller 5.0 is required at least
* (tarikweiss) Rewrote community types from submodule (js) to typescript
* (tarikweiss) Added the ability to set an ioBroker state for the availability indication in HomeKit

### 1.0.3 (2023-03-29)
* (TA2K) Corrected empty device list with rebuild

### 1.0.1 (2023-03-24)
* (foxriver76) we ensured controller 5 compatibility
* (bluefox) Formatting

### 0.17.0 (2022-10-17)
* Added AVAHI advertiser as default and updated HomeKit Library to improve performance and stability
* Update release and test scripts

### 0.14.0 (unreleased)
* (jw) added support to group devices in Admin Interface
* (jw) added support to mark services as "primary" and as "hidden"
* (jw) added ioFunctions "round" and "invert"
* (jw) updated dependencies
* (jw) Updated to HAP-Node.js 0.9.2
* (jw) Fixed crashes due to changes in used HomeKit Library
* (nh) improved changelog in readme

### 0.13.1 (2021-01-14)
* (jw) switched to HAP-Node.js 0.9.0-beta.113 and added useLegacyAdvertiser option
* (jw) fixed bug which prevented cameras from deletion and duplication

### 0.13.0 (2021-01-08)
* (jw) updated dependencies
* (jw) improved state selector (scrolling and refresh on open)

### 0.12.0 (2020-12-23)
* (jw) updated dependencies
* (jw) added support for linking services to support Television Services
* (jw) added possibility to publish devices without the bridge (necessary for TV service)
* (jw) added support for audio stream in camera 
* (jw) added support for custom characteristics on the services (e.g., to add Wattage characteristic to plugs) 
* (jw) added support for additional services to camera (to enable usage of doorbell service)> 
  (many20) fixed scaleInt conversion - results are now rounded

### 0.11.0 (2020-02-19)
* Intermediate release

### 0.10.0 (2020-02-19)
* (apollon77) updated dependencies, Node.js 12 support

### 0.10.0
* (jw) updated dependencies
* (apollon77) removed support for Node.js 4 - Node.js 6 is now the minimum required Node.js version (merged #109)  
* (yaming116) fixed scale conversion to support min values others than 0

### 0.9.2 (2019-03-12)
* (jw) fixed a bug where the adapter didn't start anymore
* (jw) removed the reference to the git repository of the hap community types

### 0.9.1 (2019-01-29)
* (jw) fixed a bug where the adapter crashes if a state does not exist
* (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))
* (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
* (jw) updated to a latest HAP-Node.js library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))

### 0.9.0 (2019-01-24)
* (jw) added more services and characteristics (from https://github.com/homespun/hap-Node.js-community-types)
* (jw) improved admin interface to support individual editors for IO/Conversion functions
* (jw) added new conversion function "script" which adds the ability to run JavaScript functions as conversion functions
* (jw) fixed a bug in the scaleInt and scaleFloat methods (thanks to balzreber) 
* (jw) added ioFunction "MultiState" to get multiple states and/or separate between read and write states 
* (jw) added conversion function "map" to customize mappings between ioBroker and HomeKit 
* (jw) added possibility to specify IP for Bonjour broadcasting (for bridge configuration and camera configuration)([#86](https://github.com/jensweigele/ioBroker.yahka/issues/86)) 
* (jw) switched to webpack and refactored admin interface and io/conversion functions 
* (jw) fixed a problem where numeric values where transmitted to homekit as strings ([#87](https://github.com/jensweigele/ioBroker.yahka/issues/87))
* (jw) added possibility to specify "firmware" version for bridge and devices ([#90](https://github.com/jensweigele/ioBroker.yahka/issues/90))
* (jw) added Internet Explorer / MS Edge detection to print error message in admin panel ([#83](https://github.com/jensweigele/ioBroker.yahka/issues/83))
* (jw) added support for new compact mode ([#95](https://github.com/jensweigele/ioBroker.yahka/issues/95))
* (jw) added support for specifying device information via data points ([#91](https://github.com/jensweigele/ioBroker.yahka/issues/91))
* (SchumyHao) added Chinese support

### 0.8.2 (2018-12-09)
* (jw) Removed a bug which flooded logging when starting/stopping the adapter which led to excessive memory consumption

### 0.8.1 (2018-12-04)
* (jw) updated dependencies
* (jw) change default name of new instances
* (foxriver76) remove excessive logging
* (mdietz666) scaleInt and scaleFloat now supports min-values (this allows mapping from e.g. -90 to 90 to 0 to 180)
* (arichter83) added "Duplicate Device" functionality

### 0.7.1 (2018-02-14)
* (jw) fixed a bug where state selection with admin 2.0.9 did not work anymore
* (jw) restructured repository to support install via url

### 0.7.0 (2018-02-01)
* (bluefox) Fixed the ID select dialog in Admin3
* (jw) updated hap-Node.js to support the following new services: Faucet, IrrigationSystem and Valve
* (jw) added ip-package to dependencies to avoid errors on some installations

### 0.6.1 (2018-01-25)
* (jw) fixed startup crash

### 0.6.0 (2018-01-24)
* (jw) add support for IP-Cameras
* (jw) included iOS 11 device definitions
* (jw) allowed negative temperatures for temperature sensors
* (jw) fixed crashes due to duplicate device names
* (oliverschulze) added conversion functions "hue" and "level255"
* (jw) added conversion functions scaleInt, scaleFloat and inverse
* (jw) devices are now sorted by name in the admin panel

### 0.5.5 (2017-05-08)
  (bluefox) allow select ID in configuration dialog

### 0.5.4 (2017-02-08)
* (jw) improve log output
* (jw) added HomematicControlModeToHomekitHeathingCoolingState mapping

### 0.5.3 (2017-02-08)
* (jw) internal release

### 0.5.2 (2016-12-23)
* (jw) fixed issues with empty characteristic values
* (jw) fixed issue with empty adapter.systemConfig.system object

### 0.5.1 (2016-10-05)
* (jw) fixed issue with wrongly displayed logo

### 0.5.0 (2016-10-05)
* (jw) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2024 Jens Weigele (iobroker.yahka@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.