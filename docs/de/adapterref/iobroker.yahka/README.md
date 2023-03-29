---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yahka/README.md
title: iobroker.yahka
hash: SsZqL6Zf+r1aOVnFbH3rE1PbMBkxdSQtGk2UXpKue6E=
---
![Logo](../../../en/adapterref/iobroker.yahka/admin/yahka.png)

![Anzahl der Installationen](http://iobroker.live/badges/yahka-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yahka.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yahka.svg)
![Prüfungen](https://travis-ci.org/ioBroker/ioBroker.yahka.svg?branch=master)
![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# Iobroker.yahka
## Installation und Verwendung
Einzelheiten zur Installation und Konfiguration dieses Adapters finden Sie im [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki)

## Voraussetzungen
Bevor Sie den Adapter installieren können, müssen Sie einige Pakete (für Linux) installieren: `sudo apt-get install libavahi-compat-libdnssd-dev`

## Installieren Sie die neueste **Version**
Klicken Sie einfach auf die Schaltfläche „+“ hinter „Homekit yahka adapter“ im ioBroker Admin Panel auf der Seite „Adapter“.

## Installiere die neueste **Beta**
Wenn Sie am Rande sein und die neueste Beta testen möchten, können Sie den Adapter über eine GitHub-URL installieren.

(Manchmal ist ein zusätzlicher Upload (z. B. `iobroker upload yahka`) und ein Neustart des Adapters erforderlich)

## Backup wiederherstellen
Achtung: Um `ioBroker.yahka` auf einem anderen System wiederherstellen zu können, muss neben den üblichen `iobroker backup` und `iobroker restore` auch der Ordner `yahka.X.hapdata` unter `/opt/iobroker/iobroker-data` gesichert werden und ggf. restauriert. [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/ioBroker.yahka-auf-ein-anderes-System-umziehen) / [Issue](https://github.com/jensweigele/ioBroker.yahka/issues/176)

## Fehlerbehebung
### Bridge funktioniert nicht oder das Gerät reagiert nicht
Versuchen Sie, den MAC/Benutzernamen der Bridge zu ändern oder den ciao-Werbetreibenden zu aktivieren

### Nicht alle neuen Funktionen sind verfügbar:
Wenn nach einem Yahka-Update nicht alle neuen Funktionen verfügbar sind, versuchen Sie einen Upload (z. B. `iob upload yahka`) und starten Sie den Adapter neu.

### Fehlender Avahi-Daemon (Linux)
Wenn Sie den folgenden Fehler im Protokoll haben:

```
Error:	2016-07-26 18:57:17.989	error	at Error (native)
Error:	2016-07-26 18:57:17.989	error	dns service error: unknown
uncaught	2016-07-26 18:57:17.985	error	exception: dns service error: unknown
```

Sie müssen einige zusätzliche Schritte ausführen:

* Avahi-Daemon installieren:

`sudo apt-get install avahi-daemon -y`

* Bearbeiten Sie die avahi-daemon.conf

`sudo nano avahi-daemon.conf `

folgende Variablen ändern:

```
host-name=\<put in your hostname\>
domain-name=local
use-ipv4=yes
use-ipv6=yes
enable-dbus=yes
```

### Pam-devel-Paket fehlt (Linux)
Wenn Sie den folgenden Fehler im Protokoll haben:

```
../authenticate_pam.cc:30:31: fatal error: security/pam_appl.h: Datei oder Verzeichnis nicht gefunden
#include <security/pam_appl.h>
```

Sie müssen das Paket pam-devel installieren:

* Avahi-Daemon installieren:

`sudo apt-get install pam-devel -y`

### Bonjour fehlt (Fenster)
- Herunterladen: `https://www.samuelattard.com/files/bonjourcore2.msi`
- Ausführen: `msiexec /i bonjourcore2.msi /qn`
- entfernen: `del bonjourcore2.msi`
- Herunterladen: `https://www.samuelattard.com/files/bonjoursdksetup.exe`
- Ausführen: `bonjoursdksetup.exe /quiet`
- Entfernen: `del bonjoursdksetup.exe`
- Set: `set BONJOUR_SDK_HOME=C:\Program Files\Bonjour SDK`

Und danach den Yahka-Adapter installieren.

## Ein paar Worte zu HomeKit
Die Architektur von HomeKit ist wie folgt:

Es gibt **Geräte** als logische Einheiten. Jedes Gerät kann mehrere **Dienste** haben und jeder Dienst hat mehrere **Eigenschaften**.

Am Ende ist ein Merkmal ein Endpunkt, von dem Werte gelesen oder geschrieben werden können.

Welche Eigenschaften ein Dienst haben kann, wird von Apple/HomeKit definiert und durch den Diensttyp bestimmt. Die Diensttypen werden ebenfalls von Apple/HomeKit definiert.

Beispiel:

Ein Garagentoröffner ist ein Gerät, das zwei Dienste haben kann:

1. Garagentoröffner
2. Licht

Der Garagentoröffner-Dienst selbst kann verschiedene Eigenschaften haben wie: CurrentDoorState, TargetDoorState und viele mehr.

Außerdem könnte der Lichtdienst verschiedene Eigenschaften haben, wie: Ein (und viele andere zum Ändern der Lichtfarbe usw.)

## Was Yahka tut
Mit Yahka ist es möglich, einen ioBroker-Datenpunkt auf ein HomeKit-Merkmal abzubilden.

Da manchmal Mappings notwendig sind (z. B. die „State“-Werte eines Garagentors unterscheiden sich zwischen HomeKit und anderen Systemen), gibt es auch die Möglichkeit, Funktionen anzugeben, um die Werte umzuwandeln. Dies wird unten beschrieben.

Um zu viel Administrationsaufwand zu vermeiden, befinden sich alle Geräte, die Sie in Yahka erstellen, hinter einer sogenannten „Bridge“. Mit dieser Bridge müssen Sie die Bridge nur mit Ihrem iOS-Gerät koppeln, um Zugriff auf alle Geräte zu erhalten. Andernfalls müssten Sie jedes Yahka-Gerät mit Homekit koppeln.

## Bridge einrichten und Geräte und Dienste erstellen
Jedes Gerät, das mit Homekit gekoppelt werden soll, benötigt einen "Benutzernamen", der die Form einer Mac-Adresse hat. Yahka generiert automatisch einen zufälligen Benutzernamen für jede Yahka-Instanz.

**Wichtig: Wenn Sie den Benutzernamen ändern, nachdem Sie Yahka mit HomeKit gekoppelt haben, müssen Sie alle Geräte in iOS neu konfigurieren (Raumzuweisung, Position usw.). Das Ändern des Benutzernamens auf iOS bedeutet, dass es sich um ein komplett neues Gerät handelt!**

Neben dem Benutzernamen müssen Sie einen PIN-Code angeben, der auf dem iOS-Gerät eingegeben werden muss.
Dies alles kann durch Klicken auf ":yahka.0" im Admin-Panel von Yahka angegeben werden. (Erweitern Sie das Panel auf der rechten Seite, nachdem Sie auf den Listeneintrag geklickt haben). Dort könnte auch der Name der Brücke geändert werden.

Nachdem Sie die Bridge eingerichtet haben, können Sie die gewünschten Geräte mit der Schaltfläche "Gerät hinzufügen" oben hinzufügen.
Sobald ein Gerät hinzugefügt/ausgewählt wurde, können Sie diesem Gerät Dienste hinzufügen.

Es ist notwendig, einen Dienstnamen und einen Diensttyp anzugeben.

Je nach Servicetyp ändert sich die Liste der verfügbaren Merkmale.

## Merkmale einrichten
Wenn Sie ein Merkmal unterstützen möchten, müssen Sie das Kontrollkästchen "Aktiviert" auf der linken Seite des Merkmals aktivieren.
Für jedes Merkmal könnten Sie die folgenden Eigenschaften angeben:

- InOutFunction: Sie können eine vordefinierte Funktion angeben, die für die Übergabe der Werte von HomeKit an ioBroker und umgekehrt verantwortlich ist
- InOutParameter: Hier können Sie Parameter für die ausgewählte InOutFunction angeben. Die verfügbaren/erwarteten Parameter hängen von der ausgewählten Funktion ab. Nachfolgend finden Sie eine kurze Übersicht über die Funktionen und Parameter.
- ConversionFunction: zusätzlich zur InOutFunction könnte man auch eine Funktion angeben, die einen von HomeKit kommenden Wert in ioBroker umwandelt (und umgekehrt)
- ConversionParameter: wie InOutParameter - die verfügbaren/erwarteten Parameter hängen von der ausgewählten Funktion ab.

## Übersicht der InOut-Funktionen
| Funktion | Erwarteter Parameter | Beschreibung |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| konstant | Wert | Die const-Funktion übergibt den in „InOutParameter“ angegebenen Wert immer dann an die Conversion-Funktion, wenn HomeKit den Wert liest. Wenn HomeKit den Wert schreiben möchte, wird diese Aktion verweigert |
| ioBroker.Zustand | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreibvorgänge. Alle Operationen werden sofort ohne Pufferung oder Filterung ausgeführt (Werte werden an die angegebenen Konvertierungsfunktionen übergeben) |
| ioBroker.State.Defered | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreibvorgänge. Schreiboperationen von HomeKit werden direkt an die Konvertierungsfunktion übergeben. Änderungen von ioBroker werden für 150ms entprellt – was bedeutet, dass der Wert nur dann an HomeKit übermittelt wird, wenn innerhalb von 150ms keine weitere Änderung aufgetreten ist. |
| ioBroker.State.OnlyACK | Name eines ioBroker-Datenpunkts | Mit dieser Funktion verwendet der Adapter den angegebenen ioBroker-Datenpunkt für Lese- und Schreibvorgänge. Schreiboperationen von HomeKit werden direkt an die Konvertierungsfunktion übergeben. Änderungen von ioBroker werden nur dann an HomeKit weitergeleitet, wenn das „Acknowledged“-Flag des Wertes gesetzt ist. Andernfalls wird der zuletzt bestätigte Wert an HomeKit | übermittelt |
| ioBroker.homematic.<br> WindowCovering.TargetPosition | ID des HomeMatic-Level-Datenpunkts<br> oder<br> String-Array mit der Id des Füllstandsdatenpunkts und der Id des Arbeitsdatenpunkts | Diese Funktion dient speziell zur Steuerung der HomeMatic Fensterabdeckung. Diese Funktion verzögert die Übertragung von Werten an HomeKit, während sich die Fensterbespannung bewegt. Dies ist notwendig, um ein Flackern des Schiebereglers der Fensterabdeckung in iOS | zu vermeiden |

## Übersicht der Konvertierungsfunktionen
| Funktion | Erwarteter Parameter | Beschreibung |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Durchgang | \<keine\> | Der Wert von ioBroker wird ohne Konvertierung an HomeKit übergeben (und umgekehrt) |
| HomematicDirectionTo<br> HomekitPositionState | \<none\> | Diese Funktion bildet das Enum Richtung von Homematic Fensterbespannung auf das Enum PositionState von HomeKit ab (und zurück) |
| HomematicControlModeTo<br> HomekitHeatingCoolingState | \<none\> | Diese Funktion bildet die ControlMode-Enumeration von Homematic auf die HeathingCoolingState-Enumeration von HomeKit ab (und zurück) |
| level255 | \<none\> | Diese Funktion skaliert einen ioBroker-Wert mit einem Wertebereich von 0 bis 255 auf einen HomeKit-Wert mit einem Wertebereich von 0 bis 100 (und zurück).<br> **Beispiel:** 255 in ioBroker wird in 100 für HomeKit umgewandelt. |
| scaleInt<br> scaleFloat | `{ "homekit.min": <number>, "homekit.max": <number>, "iobroker.min": <number>, "iobroker.max": <number> }` | Diese Funktion ähnelt &quot;level255&quot;, ist aber allgemeiner. Es wandelt einen ioBroker-Wert mit einem Bereich von „iobroker.min“ (0 falls weggelassen) bis „iobroker.max“ in einen HomeKit-Wert mit einem Wertebereich von „homekit.min“ (0 falls weggelassen) bis „homekit.max“ um. (und zurück).<br> **Beispiel:** Wenn das Parameterfeld ist: `{ "homekit.max": 500, "iobroker.max": 250}`<br> Der Wert von ioBroker wird tatsächlich mit 2 multipliziert, bevor er an HomeKit gesendet wird.<br> **Die min-Parameter sind erst ab Version 0.8.0 verfügbar** |
| Farbton | \<keine\> | Diese Funktion ist eine spezialisierte Version von scaleInt mit den Parametern `iobroker.max=65535` und `homekit.max=360`. |
| Farbton | \<keine\> | Diese Funktion ist eine spezialisierte Version von scaleInt mit den Parametern „iobroker.max=65535“ und „homekit.max=360“. |

## Homematic Jalousieaktor \ Fensterverkleidung
Um die Homematic Jalousieaktoren (z. B. HM-LC-Bl1PBU-FM) einzubinden, sind folgende Einstellungen notwendig:

* Fügen Sie einem Gerät einen Dienst hinzu
* Setzen Sie den Dienstnamen auf einen Namen und den Diensttyp auf "WindowCovering". Der Dienstuntertyp kann leer gelassen werden
* Aktivieren und füllen Sie die folgenden Merkmale aus:

| Merkmalsname | 1: InOut-Funktion<br> 2: Konvertierungsfunktion | 1: InOut-Parameter<br> 2: Konvertierungsparameter |
|---------------------|---------------------------------------------------------------------------|----------------------------------------------------------------|
| AktuellePosition | 1: ioBroker.State.OnlyACK<br> 2: Durchgang | 1: _\<path to homematic object\> _.1.LEVEL<br> 2: \<empty\> |
| PositionZustand | 1: ioBroker.State.OnlyACK<br> 2: HomematicDirectionToHomekitPositionState | 1: _\<path to homematic object\> _.1 RICHTUNG<br> 2: \<empty\> |
| Zielposition | 1: ioBroker.homematic.WindowCovering.TargetPosition<br> 2: Durchgang | 1: _\<path to homematic object\> _.1.LEVEL<br> 2: \<empty\> |

Der Wert _\<Pfad zum Homematic-Objekt\>_ muss durch den tatsächlichen Pfad zum Gerät ersetzt werden (z. B. hm-rpc.0.NEQ0012345)

Allgemeine Informationen zur Konfigurationsmaske finden Sie unter: TODO

Weitere Informationen zur Konfiguration, den InOut-Funktionen und Konvertierungsfunktionen finden Sie unter: [Wiki](https://github.com/jensweigele/ioBroker.yahka/wiki/Configuration,-InOut-Functions-and-Conversion-Functions)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
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
* (jw) Updated to HAP-NodeJS 0.9.2
* (jw) Fixed crashes due to changes in used HomeKit Library
* (nh) improved changelog in readme

### 0.13.1 (2021-01-14)
* (jw) switched to HAP-NodeJS 0.9.0-beta.113 and added useLegacyAdvertiser option
* (jw) fixed bug which prevented cameras from deletion and duplication

### 0.13.0 (2021-01-08)
* (jw) updated dependencies
* (jw) improved state selector (scrolling and refresh on open)

### 0.12.0 (2020-12-23)
* (jw) updated dependencies
* (jw) added support for linking services to support Television Services
* (jw) added possibility to publish devices without the bridge (necessary for TV service)
* (jw) added support for audio stream in camera 
* (jw) added support for custom characteristics on the services (e.g. to add Wattage characteristic to plugs) 
* (jw) added support for additional services to camera (to enable usage of doorbell service)> 
  (many20) fixed scaleInt conversion - results are now rounded

### 0.11.0 (2020-02-19)
* Intermediate release

### 0.10.0 (2020-02-19)
* (apollon77) updated dependencies, nodejs 12 support

### 0.10.0
* (jw) updated dependencies
* (apollon77) removed support for NodeJS 4 - NodeJS 6 is now the minimum required NodeJS version (merged #109)  
* (yaming116) fixed scale conversion to support min values others than 0

### 0.9.2 (2019-03-12)
* (jw) fixed a bug where the adapter didn't start anymore
* (jw) removed the reference to the git repository of the hap community types

### 0.9.1 (2019-01-29)
* (jw) fixed a bug where the adapter crashes if a state does not exist
* (jw) added io functions for HomeMatic dimmers ([#30](https://github.com/jensweigele/ioBroker.yahka/issues/30) and [#75](https://github.com/jensweigele/ioBroker.yahka/issues/75))
* (jw) fixed a bug where adapter didn't start anymore when using the conversion function "inverse" ([#98](https://github.com/jensweigele/ioBroker.yahka/issues/98))
* (jw) updated to latest HAP-NodeJS library to support TV services and characteristics (available since iOS 12.2 beta 1)<br>Note: that's still in development, not all services are working correctly. For more information see:  ([#89](https://github.com/jensweigele/ioBroker.yahka/issues/89))

### 0.9.0 (2019-01-24)
* (jw) added more services and characteristics (from https://github.com/homespun/hap-nodejs-community-types)
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
* (jw) updated hap-nodejs to support the following new services: Faucet, IrrigationSystem and Valve
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

Copyright (c) 2016-2023 Jens Weigele (iobroker.yahka@gmail.com)

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