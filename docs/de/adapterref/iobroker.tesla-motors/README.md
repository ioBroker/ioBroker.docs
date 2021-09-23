---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tesla-motors/README.md
title: ioBroker.tesla-motoren
hash: z6cbEnYX6PzPGXJ6Wx0ZbRKE/ig2WXsFm7jBW7UOkkA=
---
![Logo](../../../en/adapterref/iobroker.tesla-motors/admin/tesla-motors.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.tesla-motors.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tesla-motors.svg)
![Stabil](http://iobroker.live/badges/tesla-motors-stable.svg)
![Eingerichtet](http://iobroker.live/badges/tesla-motors-installed.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/dbweb-ch/iobroker.tesla-motors.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/dbweb-ch/ioBroker.tesla-motors/badge.svg)
![Build-Status](http://img.shields.io/travis/dbweb-ch/ioBroker.tesla-motors.svg)
![NPM](https://nodei.co/npm/iobroker.tesla-motors.png?downloads=true)

# IoBroker.tesla-motoren
## Tesla-Motoren-Adapter für ioBroker
Dieser Adapter verleiht ioBroker die Kontrolle über Ihr Tesla-Auto.

## Aufbau
1. Erstellen Sie eine neue Instanz des Adapters, jedes Auto benötigt eine eigene Instanz.
2. Wählen Sie Ihre bevorzugte Aktualisierungsrate (Siehe [Refresh Rate](#refreshRate))
2. Geben Sie Ihren Tesla-Benutzernamen und Ihr Tesla-Passwort ein.
3. Klicken Sie auf „Token abrufen“, um einen Token und einen Refresh-Token von Tesla anzufordern.
4. Wählen Sie Ihr Auto im Dropdown-Menü aus.

###<a name="refreshRate"></a> Aktualisierungsrate
Um Batterie zu sparen, geht das Auto nach einer bestimmten Zeit ohne Aktivität in den Schlafmodus.<br /> Das Abrufen von Informationen aus dem Auto kann nur erfolgen, wenn das Auto wach ist.<br /> Benutzer berichteten von einem sogenannten &quot;Vampire-Drain&quot;, bei dem das Auto bis zu 10 km Reichweite pro Tag verbrauchen kann, wenn es nicht in den Ruhezustand geht.<br /> Um dies zu verhindern, können Sie Ihre gewünschte Bildwiederholrate wählen:

* **Aus** - Der Adapter weckt das Auto nicht von selbst auf. Es weckt das Auto nur auf Anfrage (wenn Sie einen Zustand festlegen).

<br />Wenn das Auto von selbst aufgewacht ist, fordert der Adapter einmal die Autodaten an.

* **Gemäßigt** - Der Adapter weckt das Auto einmal pro Stunde auf, um seinen Zustand zu ermitteln.
* **Aggressiv** - Der Adapter weckt das Auto einmal pro Minute auf.
* **Smart** - Der Adapter versucht, intelligent zu sein. Es beobachtet die Autozustände, um festzustellen, ob es wach sein oder bald schlafen gehen sollte.

Auf jeden Fall lässt es das Auto nach 10 Minuten einschlafen, wenn es bemerkt wurde (keine Aktion, kein Klima, kein Fahren, kein Laden).
Es weckt das Auto dann nicht mehr auf, wenn Sie das brauchen, können Sie es selbst auslösen.

## Verwenden des Adapters
Der Adapter erstellt mehrere Zustände. Sie sind nach ihren Themen gruppiert:

* **chargeState** - Informationen zum Laden, Akku und Reichweite.
* **climateState** - Temperaturen und Fensterzustände.
* **driveState** - Position und Geschwindigkeit
* **softwareUpdate** - Informationen zu anstehenden Software-Updates
* **Fahrzeug** - Informationen zu Ihrem Fahrzeug

Es gibt eine spezielle Gruppe namens **Befehl**, in der Sie alle Befehle finden, um Ihr Auto zu steuern.
Einige von ihnen funktionieren in beide Richtungen, zum Beispiel ändert sich der Klimazustand, wenn das Klima vom Auto ausgeschaltet wird. Dies sehen Sie in der Spalte "Senden / Empfangen".

Name | Beschreibung | **S**end / **R**eceieve -------------- | -------------- | -------------- LadePort | Ladeanschluss öffnen / schließen | SR UnlockChargePort | Entsperrt den Ladeport | S Aufladen | Ladevorgang starten / stoppen | SR Klima | Klima starten / stoppen | SR RemoteStart | Fernstart aktivieren / deaktivieren | SR-Wachmodus | Wachmodus aktivieren / deaktivieren | SR SetChargeLimit | Ladegrenze in % einstellen | SR Solltemperatur | Stellen Sie die Zieltemperatur ein. Vergessen Sie nicht, das Klima einzuschalten! | SR SpeedLimit | Geschwindigkeitsbegrenzung aktivieren | SR SpeedLimitValue | Geschwindigkeitsgrenzwert | SR StartSoftwareUpdate | Software-Update starten | SR SunRoofVent | Sonnendachentlüftung | SR ValetMode | Valet-Modus | SR ValetPin | Valet-Pin | SR-Standby | Wenn sich das Auto im Standby-Modus befindet (Stellen Sie dies ein, um manuell aufzuwachen) | SR Türschloss | Verriegelt / Öffnet die Tür | SR-Blitzlichter | Blinke die Lichter | S honkHorn | Hupen | S openFrunk | Offener Frunk (kein Empfang) | S openTrunk | Offener Kofferraum (kein Empfang) | S Sitzheizung_links | Sitzheizung Linke Stufe (0-3) | SR Sitzheizung_Rückseite_Mitte | Sitzheizung hinten Mitte (0-3) | SR Sitzheizung_hinten_links | Sitzheizung hinten links (0-3) | SR Sitzheizung_hinten_rechts | Sitzheizung hinten rechts (0-3) | SR Sitzheizung_rechts | Sitzheizung Rechte Stufe (0-3) | SR Lenkradheizung | Lenkradheizung | SR windowVent | Fensterlüfter | SR

## Sicherheit &amp; Referenzen
Die Tesla-API verwendet einen Token-basierten Sicherheitsansatz.<br /> Der Token läuft ab (derzeit nach 45 Tagen), aber das System kann mit dem Refresh-Token einen neuen Token abrufen.<br /> Ihre Anmeldeinformationen müssen nicht gespeichert werden, damit der Adapter funktioniert, aber wenn Sie Probleme beim Aktualisieren des Tokens haben, kann dies die Stabilität erhöhen, da der Adapter jederzeit ein komplett neues Token erhalten kann.<br /><aside class="warning"> Warnung:<br /> Mit Ihren Tesla-Anmeldeinformationen können Sie das Auto währenddessen steuern, einschließlich geöffneter Fenster und sogar herumfahren. Bewahren Sie Ihre Zugangsdaten auf!<br /> Um alle Token abzulehnen, ändern Sie Ihr Tesla-Konto-Passwort!</aside>

## Mitwirkende
* dbweb-ch
* Apollon77
* Hombach
* klein0r

## Changelog
Note that missing version entries are typically dependency updates for security.
### 0.5.5
* (dbweb-ch) Fix issue with manual token input
* (dbweb-ch) Fix issue with token refresh and double encryption
### 0.5.4
* (Hombach) Fixed vulnerability; removed tests for node 10
* (dbweb-ch) Enable to manual entry tokens
### 0.5.3
* (dbweb-ch) Improved smart wakeup plan
* (dbweb-ch) wakeup more reliable on action request
* (dbweb-ch) Don't wake up the car every 12 hours anymore. If this is needed, trigger it by iobroker.
### 0.5.1
* (Hombach) Added tests for node 16; updated dependencies
### 0.5.0
* (klein0r) Store passwords and other sensitive information encrypted (BREAKING CHANGE)
### 0.4.3
* (dbweb-ch) Refresh mode aggressive: change refresh rate to 1 second instead of 1 minute
* (dbweb-ch) Add homelink support
### 0.4.2
* (dbweb-ch) Define instanceObject \"info.connection\" to prevent warning with js-controller 3.2.
### 0.4.1
* (dbweb-ch) Add \"Stopped\" as charge state where car can go asleep
### 0.4.0
* (dbweb-ch) Implement 2FA Authentification, use new authentification flow
### 0.3.2
* (dbweb-ch) Bugfix logging leading to a crash when authentication failed
### 0.3.1
* (dbweb-ch) Check token refresh more often
### 0.3.0
* (Hombach) Removed tests for node 8; updated dependencies
### 0.2.3
* (dbweb-ch) Refresh info every 5 seconds when car is moving
### 0.2.2
* (dbweb-ch) Use decrypt from ioBrokerTools, fix issue with selecting car
### 0.2.1
* (dbweb-ch) Fix bug with odomoter, refactor object creation, fix issues with compact mode
### 0.2.0
* (dbweb-ch) Included testing
* (dbweb-ch) Encrypt passwords
### 0.1.2
* (dbweb-ch) Added Roles, refactor states. 
* Attention: "awake" replaced by "standby" and inverted!
* Attention: Door lock is inverted.
### 0.1.1
* (dbweb-ch) Fix for Wakeup plan "smart"
### 0.1.0
* (dbweb-ch) Small fixes for Beta-Version release
### 0.0.3
* (dbweb-ch) control all state, added wakeup strategy
### 0.0.2
* (dbweb-ch) added all states
### 0.0.1
* (dbweb-ch) initial release

## License
MIT License

Copyright (c) 2021 Dominic Blattmann <nick@dbweb.ch>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.