---
BADGE-Number of Installations: http://iobroker.live/badges/xbox-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.xbox.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.xbox.svg
BADGE-NPM: https://nodei.co/npm/iobroker.xbox.png?downloads=true
---
![Logo](media/xbox.png)

# Xbox Adapter

Der Xbox Adapter ermöglicht die Einbindung einer Xbox One bzw. Xbox One X
Spielekonsole in das ioBroker System.

## Überblick

### Xbox One Spielekonsole
Die Xbox One ist eine von Microsoft entwickelte Spielekonsole, die aktuell gängige
Videospiele wiedergeben kann. Zusätzlich ist die Xbox One fähig, diverese Komponenten
des Heimkinosystems zu steuern und ermöglicht die Nutzung von Microsoft Apps. <br/>
Weiter Ausprägungen der Xbox One sind derzeit die Xbox One X und die Xbox One S, welche
die gleichen Funktionalitäten wie die Ursprungskonsole, jedoch mit verbesserter Leistung
bieten.

### Xbox Adapter
Der Xbox Adapter kann für je eine Xbox One Konsole eingerichtet werden, was eine
Steuerung sowie das Auslesen von Informationen ermöglicht. <br/>
Der Adapter legt automatisch alle Befehle und Stati in Form von Objekten an.
Ein Großteil der Stati kann ebenfalls ausgelesen werden, wie z. B. der aktuelle Titel, der Einschaltzustand usw.
Durch geziehltes Beschreiben oder Lesen der angelegten Objekten kann deren Status geändert und
damit Aktionen ausgelöst oder auch abgefragt werden.

## Voraussetzungen vor der Installation
1. Bevor der Adapter hinzugefügt werden kann, muss mindestens Python 3.5 auf dem Hostsystem
installiert sein.
2. Wenn die Xbox über den Adapter eingeschaltet werden soll, muss der
['Schnelles Hochfahren'-Modus](https://support.xbox.com/de-DE/xbox-one/console/learn-about-power-modes)
in der Konsole konfiguriert sein.

## Danksagung
Vielen Dank an [Team Open Xbox](https://openxbox.org/) für die Entwicklung und Bereitstellung des
[xbox-rest-server](https://github.com/OpenXbox/xbox-smartglass-rest-python) sowie den zugehörigen Bilbiotheken.

## Installation
Eine Instanz des Adapters wird über die ioBroker Admin-Oberfläche installiert.
Die ausführliche Anleitung für die dazu notwendigen Installatonschritte kann hier (TODO:LINK) nachgelesen werden.
<br/><br/>
Nach Abschluss der Installation einer Adapterinstanz öffnet sich automatisch ein Konfigurationsfenster.

## Konfiguration
![Adapter Configuration](media/adapter-configuration.png "Konfiguration")<br/>
<span style="color:grey">*Admin Oberfläche*</span>

| Feld         | Beschreibung |
|:-------------|:-------------|
|Xbox Live ID  |Hier soll die Live ID der Xbox eingetragen werden, welche in den Einstellungen der Konsole zu finden ist.|
|IP            |Hier soll die IP-Adresse der Konsole eingetragen werden.|
|Authentifizierung bei Xbox Live|Wenn die Checkbox angehakt wurde, wird sich mit der E-Mail Adresse und Password bei Xbox Live eingeloggt.|
|E-Mail Adresse|Hier soll die E-Mail Adresse des Xbox Live Kontos eingetragen werden.|
|Passwort      |Hier soll das zugehörige Passwort für das Xbox Live Konto eingegeben werden.|

Nach Abschluss der Konfiguration wird der Konfigurationsdialog mit `SPEICHERN UND SCHLIEßEN` verlassen.
Dadurch efolgt im Anschluß ein Neustart des Adapters.

## Instanzen
Die Installation des Adapters hat im Bereich `Instanzen` eine aktive Instanz des Xbox Adapters angelegt.
<br/><br/>
![Instanz](media/instance.png "Instanz")<br/>
<span style="color:grey">*Erste Instanz*</span>

Auf einem ioBroker Server können mehrere Xbox Adapter Instanzen angelegt werden. Ebenfalls kann eine mit mehreren
ioBroker Servern gleichzeitig verbunden sein. Sollen mehrere Geräte von einem ioBroker Server gesteuert werden, sollte
je Xbox eine Instanz angelegt werden.
<br/><br/>
Ob der Adapter aktiviert oder mit der Xbox verbunden ist, wird mit der Farbe des Status-Feldes der
Instanz verdeutlicht. Zeigt der Mauszeiger auf das Symbol, werden weitere Detailinformationen dargestellt.

## Objekte des Adapters
Im Bereich `Objekte` werden in einer Baumstruktur alle von der Xbox
unterstützen Informationen und Aktivitäten aufgelistet. Zusätzlich wird auch noch
darüber informiert, ob die Kommunikation mit der Xbox reibungslos erfolgt.


![Objekte](media/objects.png "Xbox Objekte")</br>
<span style="color:grey">*Objekte des Xbox Adapters*</span>

Nachfolgend werden die Objekte nach Channel unterteilt.
Jeder Datenpunkt ist mit seinem zugehörigen Datentyp sowie seinen Berechtigungen aufgehführt. Insofern es sich um einen Button
handelt, wird auf die Beschreibung des Typs und der Rechte verzichtet.
Berechtigungen können lesend (R) sowie schreibend (W) sein. Jeder Datenpunkt kann mindestens gelesen (R) werden, während
andere ebenfalls beschrieben werden können. Zur Suche nach einem bestimmten Datenpunkt empfiehlt sich die Suche mittels
der Tastenkombination "STRG + F".

### Channel: Info

* info.connection

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |boolean|R|
   
   *Nur lesbarer Indikator, der true ist, wenn der ioBroker mit der Xbox verbunden ist.*

* info.currentTitles

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|R|

   *Nur lesbarer JSON string, welcher aus Key-Value Paaren besteht. Der Key ist der Name eines laufenden Titels,
   und der Value die ID des Titels konvertiert ins Hexadezimalsystem. Diese ID kann genutzt werden, um mittels dem
   settings.launchTitle State den gewünschten Titel zu starten.*

* info.activeTitleName

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|R|

    *Enthält den Namen des aktiven Titel (Titel im Vordergrund), in Form eines Strings.*

* info.activeTitleId

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|R|

    *Enthält die ins Hexadezimalsystem konvertierte ID des Titels im Vordergrund als String.*

* info.activeTitleImage

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|R|

    *Enthält den Link zum Coverbild des Titels im Vordergrund in Form eines Strings.*

* info.activeTitleType

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|R|

    *Enthält die Art des Titels, welcher sich im Vordergrund befindet, in Form eines nur lesbaren Strings, z. B. 'Game'.*

* info.gamertag

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|R|

    *String Wert, der den Gamertag des aktuell authentifizierten Accounts enthält.*

* info.gamerscore

  |Datentyp|Berechtigung|
  |:---:|:---:|
  |number|R|

  *Number-Wert, welcher den Gamerscore des aktuell authentifizierten Accounts enthält.*

* info.installedApplications

  |Datentyp|Berechtigung|
  |:---:|:---:|
  |string|R|

  *String der eine kommaseparierte Liste mit den aktuell installierten Applikationen enthält. DLCs sind ausgeschlossen.*

* info.authenticated

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |boolean|R|

    *Boolscher Wert, welcher true ist, wenn die Authentifizierung mit Xbox Live erfolgreich war, ansonsten false.*
   
### Channel: Settings

* settings.power

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |boolean|R/W|

   *Boolscher Wert, mit welchem die Xbox an und ausgeschaltet werden kann. Ebenfalls dient der Wert als Indikator
   ob die Xbox ein- oder ausgeschaltet ist.*

* settings.launchTitle/launchStoreTitle

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|R/W|

   *Durch Setzen des String Wertes auf eine hexadezimale Title ID, kann ein Titel auf der Xbox gestartet werden.
   Die Title ID eines aktiven Spiels kann durch den info.currentTitles State herausgefunden werden.
   Der State wird bestätigt, sobald er an die Xbox übermittelt wurde, was nicht heißt, dass der Befehl auch ausgeführt wurde.*

   *Beispiel:*
    ```javascript
    setState('settings.launchTitle', '2340236c', false); // Starte Red Dead Redemption 2
    ```
  
   *`launchStoreTitle` erlaubt das Setzen von sprechenden Namen*

* settings.inputText

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|R/W|

   *Durch beschreiben des String States, kann Text in ein aktives Eingabefeld eingefügt werden, z. B. um eine private
   Nachricht zu versenden oder einen Code einzugeben.
   Der State wird bestätigt, sobald er an die Xbox übermittelt wurde, was nicht heißt, dass der Befehl auch ausgeführt wurde.*

   *Beispiel:*
   ```javascript
   setState('settings.inputText', 'H1 M8 h0w d0 u do?', false); // Versendet einen nerdigen Text
   ```

* settings.gameDvr

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |string|W|
    *Schreibbarer String, welcher die definierte Zeit eines Spiels aufzeichnet. Der State ist
    verfügbar, wenn die Authentifizierung in den Einstellungen vorgenommen wurde.
    Ebenfalls muss der authentifizierte Account auf der Xbox angemeldet sein und ein Spiel
    muss sich im Vordergrund befinden.
    
    *Beispiel:*
   ```javascript
   setState('settings.gameDvr', '-60,30', false); // zeichne die letzten 60 Sekunden bis zu den nächsten 30 Sekunden auf (90 Sekunden gesamt)
   ```

### Channel: Gamepad

* gamepad.a

   *Emuliert den A Button des Controllers.*

* gamepad.b

   *Emuliert den B Button des Controllers.*

* gamepad.x

   *Emuliert den X Button des Controllers.*
   
* gamepad.y

   *Emuliert den Y Button des Controllers.*
   
* gamepad.clear

   *Emuliert den 'Clear' Button des Controllers.*
   
* gamepad.dPadDown

   *Emuliert den DPAD runter Button des Controllers.*
   
* gamepad.dPadUp

   *Emuliert den DPAD hoch Button des Controllers.*
   
* gamepad.dPadRight

   *Emuliert den DPAD rechts Button des Controllers.*
   
* gamepad.dPadLeft

   *Emuliert den DPAD links Button des Controllers.*
   
* gamepad.enroll

   *Emuliert den 'Enroll' Button des Controllers.*
   
* gamepad.leftShoulder

   *Emuliert ein drücken des linken Schulter Buttons des Controllers.*
   
* gamepad.rightShoulder

   *Emuliert ein drücken des rechten Schulter Buttons des Controllers.*
   
* gamepad.leftThumbstick

   *Emuliert ein drücken des linken Sticks des Controllers.*
   
* gamepad.rightThumbstick

   *Emuliert ein drücken des rechten Sticks des Controllers.*
   
* gamepad.menu

   *Emuliert die Menü Taste des Controllers.*
   
* gamepad.nexus

   *Emuliert die Nexus (Xbox) Taste des Controllers.*
 
* gamepad.view

   *Emuliert die 'View' Taste des Controllers.*
   
### Channel: Media

* media.seek

    |Datentyp|Berechtigung|
    |:---:|:---:|
    |number|R/W|

   *Number-Wert um zu einer bestimmten Stelle von Medieninhalten zu springen. Der State
   wird bestätigt, sobald er beim Server angekommen ist, was nicht heißt, dass dieser auch
   ausgeführt wurde.*

* media.play

   *Button zur Wiedergabe von Medieninhalten.*
   
* media.pause

   *Button zum Pausieren von Medieninhalten.*
   
* media.playPause

   *Kombinierter Wiedergabe/Pause Button für Medieninhalte.*
   
* media.back

   *Zurück-Taste für Medieninhalte.*
   
* media.channelDown

   *Button der den Kanal für Medieninhalte nach unten schaltet.*
   
* media.channelUp

   *Button der den Kanal für Medieninhalte nach oben schaltet.*
   
* media.fastForward

   *Button zum vorspulen von Medieninhalten.*
   
* media.menu

   *Menü Button für Medieninhalte.*
   
* media.nextTrack

   *Button der bei Wiedergabe von Medieninhalten zum nächsten Titel springt.*
   
* media.previousTrack

   *Button der bei Wiedergabe von Medieninhalten zum vorherigen Titel springt.*
   
* media.record

   *Aufnahmeknopf für Medieninhalte.*
   
* media.rewind

   *Button zum Zurückspulen von Medieninhalten.*
   
* media.stop

   *Stop-Button für Medieninhalte.*
   
* media.view

   *View Button für Medieninhalte.*

### Folder: Friends
Für jeden Freund wird ein Channel angelegt, in diesem befinden sich mehrere nur lesbare States.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.1.2 (2025-02-06)
* (@foxriver76) upgrade lib to fix most of the commands

### 1.1.0 (2023-09-04)
* (foxriver76) allow to send web API commands even if Xbox is locally not connected

### 1.0.2 (2022-12-14)
* (foxriver76) we have ensured, that instance object is existing again

### 1.0.1 (2022-11-02)
* (foxriver76) we have optimized error logging messages

### 1.0.0 (2022-09-09)
* (foxriver76) updated dependencies
* (foxriver76) see previous beta versions

### 1.0.0-beta.10 (2022-08-20)
* (foxriver76) we now determine correct store locale for germany if system language is "de"

### 1.0.0-beta.9 (2022-08-07)
* (foxriver76) we fixed `activeTitleName` of applications which have no short title

### 1.0.0-beta.8 (2022-08-03)
* (foxriver76) removed unused messagebox

### 1.0.0-beta.7 (2022-08-02)
* (foxriver76) we have revived acknowledgment flag for power on state

### 1.0.0-beta.6 (2022-08-02)
* (foxriver76) we are now synchronizing friends

### 1.0.0-beta.5 (2022-08-01)
* (foxriver76) fixed `activeTitleImage` which is now the cover and always an url
* (foxriver76) optimized `launchStoreTitle` by preventing API calls for DLCs
* (foxriver76) added gamerscore as state (synched every 10 minutes)
* (foxriver76) added list of installed applications to a new state

### 1.0.0-beta.4 (2022-07-30)
* (foxriver76) we have optimized `launchStoreTitle` to check for installed apps first
* (foxriver76) we have optimized error logging

### 1.0.0-beta.2 (2022-07-30)
* (foxriver76) added `launchStoreTitle` state to launch apps by their names

### 1.0.0-beta.1 (2022-07-29)
* (foxriver76) fixed missing state objects

### 1.0.0-beta.0 (2022-07-29)
* (foxriver76) complete TypeScript rewrite
* (foxriver76) removed Python dependencies by siwtching to Xbox API written in Node.js
* (foxriver76) fixed title launch (closes #39)
* (foxriver76) fixed Xbox Live Auth (closes #63)

### 0.7.10 (2022-05-20)
* (foxriver76) fixed error with mising admin ui on new installations

### 0.7.9 (2022-05-20)
* (foxriver76) fixed wrong default value of `media.seek` (closes #113)

### 0.7.8 (2022-02-20)
* (foxriver76) we now set `unsafePerm` flag to ensure compatibility with future controller
* (foxriver76) updated dependencies

### 0.7.7 (2021-04-18)
* (foxriver76) do not log rest server logging on levels above debug, so it can be activated when needed

### 0.7.6 (2021-03-29)
* (foxriver76) added `requests` package as pip dev
* (foxriver76) added logging for rest server

### 0.7.3 (2020-12-25)
* (foxriver76) fixed debug logging on discovery

### 0.7.2 (2020-11-23)
* (foxriver76) removed logging of error on adapter stoppage due to rest server termination
* (foxriver76) removed warn logging for debugging
* (foxriver76) fixed currentTitles and activeTitle states

### 0.7.0 (2020-11-04)
* (foxriver76) replaced deprecated requests module by axios
* (foxriver76) migrated to xbox-smartglass 1.3
* (foxriver76) removed Python3.6 support 
* (foxriver76) event based rest server startage (faster and more robust)
* (foxriver76) GameDVR now supports custom time

### 0.6.9 (2020-11-02)
* (foxriver76) dependency upgrade, fixes installation problems

### 0.6.8 (2020-09-24)
* (foxriver76) minor optimization

### 0.6.5 (2020-05-28)
* (foxriver76) fixed problem with auth-only states

### 0.6.4 (2020-05-11)
* (foxriver76) compatibility with controller v3

### 0.6.3 (2020-04-02)
* (foxriver76) try specific python versions first on install
* (foxriver76) bump dependency, because of auth bug in smartglass

### 0.6.1 (2020-03-17)
* (foxriver76) fixes for compact mode compatibility
* (foxriver76) more translations added
* (foxriver76) minor optimizations

### 0.6.0 (2020-03-01)
* (foxriver76) dependency upgrade (smartglass has been refactored)
* __python 3.6 required!__

### 0.5.12 (2020-01-17)
* (foxriver76) let js-controller know which apt packages are required

### 0.5.11 (2019-11-27)
* (foxriver76) we not try to install apt packages any longer if already installed

### 0.5.8
* (foxriver76) increased stopTimeout to successfully shut down adapter on windows based systems
* (foxriver76) now using setStateChanged instead of own implementation

### 0.5.7
* (foxriver76) fix gamertag not set if no state on the object exists yet

### 0.5.6
* (foxriver76) if still logged in dont log warning/set auth false anymore
* (foxriver76) on logout only set auth to false, but keep gamertag

### 0.5.5
* (foxriver76) minor optimizations

### 0.5.3
* (foxriver76) improve log message quality
* (foxriver76) more promisification
* (foxriver76) minor fix for compact mode

### 0.5.0
* (foxriver76) support of compact mode
* (foxriver76) fixes and optimizations

### 0.4.4
* (foxriver76) small fixes and optimizations

### 0.4.2
* (foxriver76) use adapter-core module

### 0.4.1
* (foxriver76) minor type fix

### 0.4.0
* (foxriver76) Seek converted to number, to jump to specific position
* (foxriver76) try reauthentication when auth gets lost

### 0.3.0
* (foxriver76) new state activeTitleType added
* (foxriver76) minor fixes
* (foxriver76) authentication for 2 factor auth added

### 0.2.2
* (foxriver76) minor fix when currentTitles empty, activeTitle states should be too
* (foxriver76) dont set info.connection on power off, because will be
self detected and prevents reconnection on shutdown

### 0.2.1
* (foxriver76) minor fix on state name

### 0.2.0
* (foxriver76) Authentication for Xbox Live added
* (foxriver76) When logged in current titles contains the correct title full name
* (foxriver76) Added decryption and encryption
* (foxriver76) minor fixes
* (foxriver76) Added new states

### 0.1.7
* (foxriver76) rest-server will now be stopped on windows unload too
* (foxriver76) enhanced windows debug logging

### 0.1.6
* (foxriver76) fix rest-server start on win when nopy not in own node_modules folder

### 0.1.5
* (foxriver76) starting rest-server on windows fixed
* (foxriver76) stopping rest-server on windows fixed

### 0.1.4
* (foxriver76) set info.connection and settings.power to false on unload
* (foxriver76) not only rely on ping to check if xbox is on, use available too

### 0.1.3
* (foxriver76) minor fix
* (foxriver76) bump smartglass-rest requirement to 0.9.7
* (foxriver76) enables pwoer on for not multicastable consoles
* (foxriver76) only use discovery when Xbox disconnected and online

### 0.1.2
* (foxriver76) fix when currentTitles is empty

### 0.1.1
* (foxriver76) minor fixes
* (foxriver76) explicit require versions of python deps
* (foxriver76) fix for power on, when Xbox not in broadcast network

### 0.1.0
* (foxriver76) brought back live id to settings
* (foxriver76) input text state to enter text in an open text field
* (foxriver76) ability to find consoles which are not available via broadcast
* (foxriver76) info state for active titles & launch title state

### 0.0.13
* (foxriver76) minor fix
* (foxriver76) restart adapter on rest server error
* (foxriver76) log when losing connection without ping

### 0.0.12
* (foxriver76) when console unavailable, also do not connect
* (foxriver76) debug logging for unavailable console
* (foxriver76) only set power states on change

### 0.0.11
* (foxriver76) minor connection fix

### 0.0.10
* (foxriver76) when status is connecting, don't connect again

### 0.0.9
* (foxriver76) LiveID is not necessary anymore

### 0.0.8
* (foxriver76) If reconnect attempts fail often in a row, only log it once
* (foxriver76) removed unneeded objects from io-package and adjusted title

### 0.0.6
* (foxriver76) Stop making connect requests when already connected
* (foxriver76) more user friendly logging
* (foxriver76) more robustness in nopys path

### 0.0.5
* (foxriver76) using relative paths for starting server
* (foxriver76) adding commands for windows
* (foxriver76) enhanced installation manual

### 0.0.4
* (foxriver76) automatically install required Debian packages
* (foxriver76) updated Readme
* (foxriver76) make installation for Windows possible
* (foxriver76) improved logging
* (foxriver76) detect OS

### 0.0.3
* (foxriver76) fixed state handling
* (foxriver76) using ping to check consoles power status instead of connection
* (foxriver76) stop powering on if it is unsuccessful for 15 seconds
* (foxriver76) restarting adapter when REST snpm erver is down

### 0.0.2
* (foxriver76) fixed endpoints
* (foxriver76) automated installation of dependencies
* (foxriver76) readme updated
* (foxriver76) code optimized

### 0.0.1
* (foxriver76) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2023 Moritz Heusinger <moritz.heusinger@gmail.com>

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