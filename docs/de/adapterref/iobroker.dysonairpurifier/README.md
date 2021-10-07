---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: qIIQ0NkL5r+D3EtW3RoniBBT+J5Udkjr1YROqFrhz3A=
---
# IoBroker.dysonAirPurifier
![Logo](admin/dyson_logo.svg)![Logo](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![NPM](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

[![Abhängigkeitsstatus](https://david-dm.org/Grizzelbee/iobroker.dysonairpurifier.svg)](https://david-dm.org/Grizzelbee/iobroker.dysonairpurifier) [![Test und Veröffentlichung](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-deploy.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-deploy.yml)

## IoBroker Adapter für Dyson Luftreiniger und Lüfter
Dieser Adapter verbindet ioBroker mit verschiedenen Dyson Luftreinigern.

Fan-Icon im Logo erstellt von [Freepik](https://www.flaticon.com/de/autoren/freepik) von [www.flaticon.com](https://www.flaticon.com/de/).

### Unterstützte Geräte
* Dyson Pure Cool Link Tower (TP02, Produkttyp 475)
* Dyson Pure Cool Tower, Modell 2018 (TP04, Produkttyp 438)
* Dyson Pure Cool Tower Formaldehyd, Modell 2018 (TP07, Produkttyp 438E)
* Dyson Pure Cool Link Desk (DP01, Produkttyp 469)
* Dyson Pure Cool Desk, Modell 2018 (DP04, Produkttyp 520)
* Dyson Pure Hot+Cool Link (HP02, Produkttyp 455)
* Dyson Pure Hot+Cool Link Neu (Produkttyp 455A)
* Dyson Pure Hot+Cool, Modell 2018 (HP04, Produkttyp 527)
* Dyson Pure Hot+Cool (HP07, Produkttyp 527E)
* Dyson Pure Humidify+Cool (PH01, Produkttyp 358)

## Merkmale
Verbindet Ihre Dyson-Lüfter, Heizlüfter, Luftreiniger und Luftbefeuchter mit ioBroker.

* Liest Werte von Geräten und Sensoren
* Kann Geräte steuern, indem Sie einige Werte ändern können (Hauptleistung, Oszillation, Heizung, Lüftergeschwindigkeit, ...)
* Liest Geräteliste von Dyson-Servern

## Installation
### Sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisch an den Autor zu melden. Dafür wird das [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) Plugin verwendet. Bitte lesen Sie die [Plugin-Homepage](https://github.com/ioBroker/plugin-sentry) für detaillierte Informationen darüber, was das Plugin tut, welche Informationen gesammelt werden und wie Sie es deaktivieren können, wenn Sie den Autor nicht mit Ihren Informationen zu Abstürzen unterstützen möchten.

###Voraussetzungen
* Dieser Adapter benötigt Node.js >= Version 10
* Mindestens js-Controller 3.0.0 ist erforderlich
* Mindestens Admin 4.0.9 ist erforderlich
* Um diesen Adapter zum Laufen zu bringen, benötigen Sie ein Dyson-Konto.
* Stellen Sie sicher, dass Sie Ihren Fan zu Ihrem Konto hinzufügen. Entweder per App oder online.

### Adapterinstallation
#### Verwenden von npm
Führen Sie ```npm install iobroker.dysonairpurifier``` auf Ihrer ioBroker-Installation aus, um die neueste Version dieses Adapters aus dem npm-Repository zu erhalten.

#### Alternative: GitHub-URL verwenden
Installieren Sie über die ioBroker Admin-Benutzeroberfläche, indem Sie auf die neueste stabile Version auf GitHub verweisen: <https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

Sie können mit diesen Methoden auch ältere Release-Versionen installieren (indem Sie auf ein Versions-Tag verweisen, z.

### Konfig-Daten benötigt
* Dyson-Konto-Benutzername
* Dyson-Kontopasswort (dieser Adapter kann Passwörter mit bis zu 32 Zeichen verarbeiten)
* die IP-Adresse Ihrer Ventilatoren/Luftreiniger in Ihrem LAN.

*Bitte beachten*: Aufgrund des frühen Entwicklungsstandes und einer nicht konformen mDNS-Implementierung von Dyson müssen Sie *nach dem ersten Durchlauf* die lokale IP des Geräts angeben.

*Zusätzlicher Hinweis*: Seit Version 0.7.1 versucht der Adapter, sich über seinen Hostnamen (Seriennummer) mit dem Gerät zu verbinden, wenn keine Hostadresse/IP angegeben ist. Dies funktioniert unter zwei Voraussetzungen:

1. In Ihrem LAN läuft ein DNS-Server. Entweder in Ihrem Router (z.B. FritzBoxen haben einen DNS am Laufen) oder einen dedizierten.
2. Sie haben den Standardgerätenamen nicht geändert.

> Beim ersten Start dieses Adapters wird die Dyson API für alle Ihre Geräte abgefragt und alle unterstützten Geräte werden im Gerätebaum angelegt -- mit ihren von der API bereitgestellten Basisinformationen und einem zusätzlichen Feld "Hostadresse".
> > Führen Sie den Adapter also einmal aus, und Ihre Dyson-Geräte werden mit ihren Grundeinstellungen im Gerätebaum angelegt.
> > Stoppen Sie dann den Adapter, geben Sie die IP(s) in das/die Feld(er) Hostaddress ein und starten Sie den Adapter neu. Danach sollten Ihre Dyson-Geräte im Gerätebaum mit Daten gefüllt sein.

### 2-Faktor-Authentifizierung (seit V0.9.0)
Nach der Installation des Adapters sollte dieser automatisch gestartet werden - falls nicht, starten Sie ihn bitte zuerst.
Nach einem Update wird es auch automatisch neu gestartet. In beiden Fällen bleibt es im "gelben" Zustand und zeigt wahrscheinlich einige Fehler im Protokoll an - das ist vorerst in Ordnung.

* Öffnen Sie den Konfigurationsdialog des Adapters
* Geben Sie mindestens Ihre eMail-Adresse, das Passwort und den Ländercode ein - der Rest ist optional
* Klicken Sie auf die Schaltfläche 2FA-Code E-Mail, um den Vorgang zu starten
* Du erhältst automatisch eine "challengeId" im entsprechenden Feld, eine eMail und einen Dialog mit weiteren Anweisungen
* geben Sie den 6-stelligen Code aus der eMail in das Feld "dyson one time password" ein
* Klicken Sie auf die Schaltfläche "Fertig stellen"
* danach solltest du einen Token von Dyson erhalten haben (aus Sicherheitsgründen unsichtbar)
* Klicken Sie auf Speichern & Schließen, nachdem Sie Ihre Einrichtung abgeschlossen haben - der Adapter sollte neu starten und grün werden.

Alle Werte werden gespeichert und weiterhin angezeigt.
> Normalerweise müssen Sie diese 2 FA nicht planmäßig durchführen - Sie können sie jedoch bei Bedarf wiederholen.

#### Wenn Sie während 2-FA mit dem 401-Problem konfrontiert sind. Bitte versuchen Sie diese Problemumgehung:
1. Melden Sie sich von Ihrer Dyson Smartphone-App ab
2. Warten Sie ein paar Minuten
3. Geben Sie Ihre Zugangsdaten zum Adapter ein (falls noch nicht geschehen) und folgen Sie dem 2FA-Verfahren bis zum Ende.
4. Der Adapter sollte starten und grün werden.
5. Warten Sie eine Weile (bis zu einer Stunde oder vielleicht länger, da Dyson einen Blocker für zu viele Anfragen in kurzer Zeit hat)
6. Melden Sie sich wieder bei Ihrer Dyson Smartphone-App an, wenn Sie diese verwenden möchten.

## Steuern Sie Ihr(e) Gerät(e)
Dieser Adapter kann derzeit die folgenden Zustände Ihrer Geräte steuern:

* FanMode , Gerätemodus (Manuell, Auto, Aus)
* FanSpeed, aktuelle Lüftergeschwindigkeit
* Nachtmodus, Nachtmodusstatus
* Oszillation , Oszillation des Lüfters (Ein, Aus).
* OscillationRight, OscillationAngle Upper Boundary
* OscillationLeft , OscillationAngle Lower Boundary
* Oszillationswinkel , Oszillationswinkel
* ContinuousMonitoring, kontinuierliche Überwachung von Umgebungssensoren, auch wenn das Gerät ausgeschaltet ist.
* MainPower , Hauptstrom des Lüfters.
* AutomaticMode , Lüfter befindet sich im Automatikmodus.
* Strömungsrichtung, Richtung, in die der Ventilator bläst. EIN=Vorne; AUS=Zurück (auch bekannt als Jet-Fokus)
* Jetfocus, Richtung, in die der Lüfter bläst. EIN=Vorne; AUS=Zurück (auch bekannt als Jet-Fokus)
* Heizmodus , Heizmodus [EIN/AUS]
* HeatingTargetTemp , Zieltemperatur für das Heizen
* AirQualityTarget , Zielluftqualität für den Automodus.
* Befeuchtungsmodus, Ein / Aus
* HumidifyAutoMode, Auto / Aus
* AutoBefeuchtungsziel, Autobefeuchtungsziel
* Befeuchtungsziel, Manuelles Befeuchtungsziel
* TemperatureUnit , Einheit zur Anzeige von Temperaturwerten in (Lüfteranzeige).
* Wasserhärte, weich, mittel, hart

Mögliche Werte für diese Zustände sind, soweit bekannt, im Folgenden dokumentiert.
Die Lüftergeschwindigkeit lässt nur Werte von 1 bis 10 und Auto zu. Wenn Sie die Lüftergeschwindigkeit auf 0 reduzieren möchten, müssen Sie die Hauptstromversorgung ausschalten.
Das macht auch die Dyson-App.

### Bekannte Probleme
* Keine automatische IP-Erkennung von Geräten

## Erläuterung der Dyson API-Daten (Nachrichtennutzlast)
Informationen kopiert und erweitert von <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md>

### AKTUELLEN ZUSTAND
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| Modus-Grund | Aktueller Modus wurde von RemoteControl, App, Scheduler eingestellt | VR China, LAPP, LSCH, PUI | |
| Staatsgrund | | MODUS | |
| rssi | WLAN-Stärke| -100 - 0| dBm|
| Kanal| WIFI-Kanal| 52 | |
| fqhp | | 96704 | |
| fghp | | 70480 | |

#### Produktstatus
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| ercd | Letzter Fehlercode | NONE oder einige Hexawerte | |
| fil | Restlebensdauer des Filters | 0000 - 4300 | Stunden|
| fmod | Modus | LÜFTER, AUTO, AUS | |
| fpwr | Hauptstrom | EIN, AUS | |
| fnst | Lüfterstatus | EIN, AUS, LÜFTER | |
| fnsp | Lüftergeschwindigkeit | 0001 - 0010, AUTO | |
| fdir | Fandirektion aka. Jet-Fokus/ EIN=Vorne, AUS=Zurück | EIN, AUS | |
| ffoc | JetFocus | EIN, AUS |
| nmod | Nachtmodus | EIN , AUS | |
| oson | Schwingung | EIN, AUS| |
| osal | Oszillationswinkel untere Grenze | 0005 - 355| ° (Grad)|
| osau | Oszillationswinkel Obere Grenze | 0005 - 355 | ° (Grad)|
| oscs | OszillationAktiv | EIN, AUS, LEERLAUF | |
| ancp | Oszillationswinkel | CUST, 0180 |° (Grad)|
| qtar | Luftqualitätsziel | 0001=Gut, 0002=Normal, 0003=Schlecht, 0004=Sehr schlecht | |
| rhtm | Kontinuierliche Überwachung | EIN, AUS | |
| automatisch | Automatischer Modus | EIN, AUS | |
| nmdv | Nachtmodus Max. Lüftergeschwindigkeit? | 0004 | |
| cflr | Status Kohlefilter | 0000 - 0100 | Prozent |
| cflt | Kohlefilter | CARF, KEINE | |
| hflr | Status HEPA-Filter | 0000 - 0100 | Prozent |
| hflt | HEPA-Filter | GHEP, GCOM | |
| sltm | Sleeptimer | EIN, AUS ||
| hmod | Heizungsmodus [EIN/AUS] | WÄRME | |
| hmax | Solltemperatur zum Heizen | 0 .. 5000 | K |
| Hume | Befeuchtungsmodus | EIN, AUS, |
| haut | Auto-Modus befeuchten| HUMIDIFY_AUTO_MODE_ON, HUMIDIFY_AUTO_MODE_OFF |
| summe | Befeuchtungsziel| HUMIDIFICATION_MODE_OFF, HUMIDIFICATION_MODE_THIRTY, HUMIDIFICATION_MODE_FORTY, HUMIDIFICATION_MODE_FIFTY, HUMIDIFICATION_MODE_SIXTY, HUMIDIFICATION_MODE_SEVENTY |
| cdrr | CleanDurationRemaining| ganze Zahl | Minuten |
| gerade | AutoBefeuchtungsziel| ganze Zahl | % |
| cltr | TimeRemainingToNextClean| ganze Zahl| Stunden |
| wat | Wasserhärte| WEICH="2025", MITTEL="1350", HARD="0675"|
| wacd | Warncode | KEINE... |

| rstf | Filterlebenszyklus zurücksetzen | RESET_FILTER_LIFE_IGNORE, RESET_FILTER_LIFE_ACTION

| Korf | Temperaturformat | EIN=Celsius, AUS=Fahrenheit |
| clcr | DeepcleanCycle | CLNO=inaktiv, CLAC=Deep Clean im Gange, CLCM=Fertig |
| hsta | Heizzustand | AKTIV/LEERLAUF |
| msta | Befeuchtungszustand | Aktiv/Leerlauf AUS, HUMD |
| psta | [HP0x] Unbekannt | INIT, CLNG, INV, AUS |
| hell | unbekannt | 0002 | LEVEL_LOW, LEVEL_MEDIUM, LEVEL_HIGH |
| fqhp | unbekannt| |
| Neigung | [HP0x] Unbekannt | Zeichenfolge |
| Zifferblatt | [DP0x] Unbekannt | |

|Fehlercodes| Bedeutung |
| ----- | ----- |
| KEINE | Es ist kein Fehler aktiv |
|57C2| unbekannt |
|11E1| Oszillation wurde deaktiviert. Bitte drücken Sie die Taste "Oszillation" auf Ihrer Fernbedienung, um fortzufahren.|

#### Planer
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| dstv | TageslichtSparZeit | 0001... | |
| srsc | ? | 7c68... | |
| tzid | Zeitzone? | 0001... | |

###UMWELT-STROM-SENSOR-DATEN
#### Daten
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| tat | Luftfeuchtigkeit (%) | 0000 - 0100 | Prozent |
| Pakt | Staub | 0000 - 0009 | |
| sltm | Sleep-Timer | AUS... 9999 | Minuten |
| Takt | Temperatur in Kelvin | 0000 - 5000 | K|
| frei | flüchtige organische Verbindungen | 0001 - 0009 | |
| hcho | Formaldehyd||
| pm25 | PM2.5 |0018||
| pm10 | PM10 |0011||
| va10 | flüchtige organische Verbindungen|0004||
| noxl | NO2 |0000 - 0014||
| p25r | |0019||
| p10r | |0018||

###UMWELT-UND-NUTZUNGSDATEN
Redundante Werte?

#### Daten
| Name | Bedeutung | mögliche Werte | Einheit |
| ------------- | ----- | ----- | ----- |
| Kumpel0 - Kumpel9 | Anzahl der Sekunden, die seit Beginn der Stunde in dieser Staubschicht verbracht wurden | 0000 - 3600 | |
| Handfläche | scheint ein Medianwert von palX | . zu sein | |
| vol0 - vol9 | Anzahl der Sekunden, die seit Beginn der Stunde auf dieser Ebene von Voc verbracht wurden | 0000 - 3600 | |
| volm | scheint ein Medianwert von volX | . zu sein | |
| aql0 - aql9 | Anzahl der Zweitausgaben in dieser Luftqualität | max (pal, vol)) seit Beginn der Stunde | 0000 - 3600 | |
| aqlm | scheint ein Medianwert von aqlX | . zu sein | |
| fafs | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| faos | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| fofs | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| fons | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| summen | Feuchtigkeit ? (%) | 0000 - 0100 | |
| tmpm | Temperatur in Kelvin? | 0000 - 5000 | |

## Rechtliche Hinweise
Dyson, pure cool, pure hot & cool und andere sind Marken oder eingetragene Marken von [Dyson Ltd.](https://www.dyson.com) Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

## Changelog

### V2.1.1 (2021-10-05) (Running to the edge)
* (grizzelbee) New: Added some more data points 
* (grizzelbee) New: Added switch for temperature unit of the fan display
* (grizzelbee) New: Improved logging of unknown data points
* (germanBluefox) Fix: Fixed icon links
* (grizzelbee) Fix: fixed dependencies badge
* (grizzelbee) Fix: added missing dependency plugin-sentry
* (grizzelbee) Fix: Setting HumidificationTarget now works

### V2.0.1 (2021-10-04) (Lost in forever)
* (grizzelbee) Fix: Turning on HeatingMode should work now
* (grizzelbee) Fix: Sentry-error [2690134161](https://sentry.io/organizations/nocompany-6j/issues/2690134161/?project=5735771) -> Cannot read property '3' of undefined
* (grizzelbee) Upd: Updated dependencies

### V2.0.0 (2021-09-26) (Lost in forever)
* (grizzelbee) New: Added DeepCleanCycle to known data points
* (grizzelbee) Fix: Switching water hardness now really works
* (grizzelbee) BREAKING CHANGES: Please recreate your object tree and test your scripts!
* (grizzelbee) Chg: All ON/OFF switches are now boolean types to be more compliant to ioBroker standards for VIS and other adapters. Please delete those data points and let them being recreated if necessary.
* (grizzelbee) Chg: All angles are numbers now
* (grizzelbee) Chg: All 2-way switches are boolean now
* 
### V1.1.0 (2021-09-15) (Coming home)
* (grizzelbee) New: Added correct tier-level to io-package
* (grizzelbee) New: improved logging of unknown data points
* (grizzelbee) New: Added support for dyson Pure Hot+Cool Link (ProductType 455A) 
* (grizzelbee) New: Added support for formaldehyde sensor
* (grizzelbee) New: oscillation angles can be set
* (grizzelbee) Upd: Improved OscillationAngle data point to display only the values supported by the current model  
* (grizzelbee) Fix: removed info: undefined is not a valid state value for id "Hostaddress"

### V1.0.0 (2021-08-26) (Dim the spotlight)
* (grizzelbee) Fix: [#130](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/130) Fixed the newly introduced bug showing wrong values for temperatures
* (grizzelbee) Upd: Pushed to version 1.0.0
* (grizzelbee) Upd: Updated dependencies

### V0.9.5 (2021-08-23) (Marching on)
* (grizzelbee) Doc: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Documented workaround for 2FA 401 Issue in ReadMe
* (grizzelbee) Fix: [#128](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/128) Fixed saving of config data
* (grizzelbee) Fix: [#107](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/107) Fixed type error on temperatures
* (grizzelbee) Fix: fixed warnings on startup

### V0.9.4 (2021-08-20) ()
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Credentials won't get logged but shown in a popup in admin when failing 2FA process. 
* (grizzelbee) New: Added adminUI tag to io-package
* (grizzelbee) New: Cleanup of io-package

### V0.9.3 (2021-08-19) (Paralyzed)
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Leading and trailing whitespaces will be removed from all config values when saving
* (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Password will be logged in clear text in case of a http 401 (unauthorized) error during 2FA
* (grizzelbee) Chg: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Removed general debug logging of 2FA login data


### V0.9.2 (2021-08-15) (Pearl in a world of dirt)
* (bvol)       New: [#114](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/114) Added Switzerland to country selection in config , Thanks, @BVol, for his code! 
* (grizzelbee) Fix: [#119](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/119) Updated dyson certificate to enable connection again. Thanks, @Krobipd, for helping with the link
* (grizzelbee) Upd: Updated dependencies 

### V0.9.1 (2021-05-17) (Still breathing)
* (grizzelbee) New: [#105](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/105) TP02, HP02 and others supporting the fmod token are now able to switch from Off to Auto- and manual-mode

### V0.9.0 (2021-05-15) (Still breathing)
* (grizzelbee) New: Added ioBroker sentry plugin to report errors automatically 
* (grizzelbee) New: Added support for Dyson Pure Cool TP07 (438E)
* (grizzelbee) New: Added support for Dyson 2-factor login method
* (grizzelbee) New: Added "keep Sensorvalues" to config to prevent destroying old values when continuous monitoring is off and fan is switched off (TP02)  
* (grizzelbee) Fix: FilterLife should now be correctly in hours and percent in two separate data fields for fans supporting this (e.g. TP02)

### V0.8.2 (2021-04-09) (Still breathing)
* (grizzelbee) Fix: [#80](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/80) fixed npm install hint in documentation
* (grizzelbee) Fix: [#82](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/82) fixed common.dataSource type with type >poll<
* (grizzelbee) Fix: [#95](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/95) Added support for dyson Hot+Cool Formaldehyde (527E)
* (grizzelbee) Fix: [#94](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/94) Fixed dustIndex


### V0.8.1 (2021-02-19) (Fall into the flames)
* (grizzelbee) New: added icons to each fan type in device tree
* (grizzelbee) New: Showing Filter type correctly - not as code anymore
* (grizzelbee) Upd: updated dependencies

### V0.8.0 (2021-02-18) (Beyond the mirror)
* (grizzelbee) New: Log as info if account is active on login; else log as warning. 
* (grizzelbee) New: [#21](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/21) Improvement for humidifier support
* (grizzelbee) Fix: [#67](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/67) Adapter sometimes wrote objects instead of values.

### V0.7.5 (2021-02-12) (I won't surrender)
* (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/65) Adapter get online again after changes to dyson cloud API login procedure.
* (grizzelbee) New: Adapter reconnects with new host address when it gets changed manually

### V0.7.4 (2021-02-10) (Human)
* (grizzelbee) Fix: fixed adapter traffic light for info.connection
* (grizzelbee) Fix: Minor fixes

### V0.7.3 (2021-02-10) (When angels fall)
* (theimo1221) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) added default country
* (theimo1221) New: added function to mask password to dyson-utils.js
* (grizzelbee) New: extended config test and error logging
* (grizzelbee) New: added password to protectedNative in io-package.json
* (grizzelbee) Fix: fixed showing password in config (leftover from testing/fixing)
* (grizzelbee) Fix: fixed detection of needed js-controller features
* (grizzelbee) Fix: fixed detection if IP is given or not
* (grizzelbee) Upd: creating all data points with await 


### V0.7.2 (2021-02-10) (Songs of love and death)
* (grizzelbee) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) Fixed bug while loading/saving config which led to wrong values displayed for country and temperature unit
* (grizzelbee) Upd: switched "Skipping unknown ..." message from info to debug 

### V0.7.1 (2021-02-06) (Horizons)
* (grizzelbee) New: When no host address is given - adapter tries to connect via default hostname of the device
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) Filterlifetime is now correctly displayed in hours and percent for devices supporting this
* (grizzelbee) Fix: [#48](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/48) Fixed countrycodes for UK and USA
* (grizzelbee) Fix: [#52](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/52) Fixed VOCIndex
* (grizzelbee) Fix: Removed option to control Fan state since it corresponds to the state of the fan in auto-mode. Controlling it is senseless.
* (grizzelbee) Fix: Fixed await...then antipattern.
* (grizzelbee) Fix: Fixed undefined roles
* (grizzelbee) Fix: Fixed some bad promises and moved code to dysonUtils
* (grizzelbee) Fix: Fixed encrypting password using js-controller 3.0 build-in routine
* (grizzelbee) Upd: Added topic "Controlling your device(s)" to readme
* (grizzelbee) Upd: Removed unnecessary saving of MQTT password
* (grizzelbee) Upd: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) Added some more dyson codes for heaters and humidifiers


### V0.7.0 (2021-01-08) (Afraid of the dark)
* (jpwenzel)   New: Removing crypto from package dependency list (using Node.js provided version)
* (jpwenzel)   New: Introducing unit tests
* (jpwenzel)   New: At least NodeJs 10.0.0 is required
* (grizzelbee) New: [#23](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/23) - Introduced new data field AirQuality which represents the worst value of all present indexes.
* (grizzelbee) New: BREAKING CHANGE! - switched over to the adapter-prototype build-in password encryption. Therefore, you'll need to enter your password again in config.
* (grizzelbee) New: At least js-controller 3.0.0 is required
* (grizzelbee) New: At least admin 4.0.9 is required
* (jpwenzel)   Fix: General overhaul of readme
* (jpwenzel)   Fix: Code refactoring
* (grizzelbee) Fix: fixed some datafield names - please delete the whole device folder and get them newly created.
* (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/18) - Fixed creating the indexes when there is no according sensor
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Displaying Filter life value in hours again
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Creating additional Filter life value in percent
* (grizzelbee) Fix: removed materializeTab from ioPackage
* (grizzelbee) Fix: calling setState now as callback in createOrExtendObject
* (grizzelbee) Fix: Removed non-compliant values for ROLE
* (grizzelbee) Fix: calling setState in callback of set/createObject now
* (grizzelbee) Fix: ensuring to clear all timeouts in onUnload-function

### V0.6.0 (2020-10-29) (Rage before the storm)
* (grizzelbee) New: [#17](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/17) - Added online-indicator for each device
* (grizzelbee) New: [#19](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/19) - Extended Password length from 15 characters to 32
* (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/20) - Improved error handling on http communication with Dyson API
* (grizzelbee) Fix: Fixed typo within data field anchorpoint - please delete the old ancorpoint manually.
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours

### V0.5.1 (2020-10-27) (Heart of the hurricane)
* (grizzelbee) Fix: Added missing clearTimeout

### V0.5.0 (2020-10-27) (Heart of the hurricane)
* (grizzelbee) New: Editable data fields have now appropiate value lists
* (grizzelbee) New: Added more country codes
* (grizzelbee) New: Target temperature of heater can now be set - **in the configured unit!**
* (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours
* (grizzelbee) Fix: [#6](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/6) - Changing the fanspeed does now fully work.  

### V0.4.1 (2020-10-16) (unbroken)
* (grizzelbee) New: [#8](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/8) - Documented ProductTypes for better overview and user experience in ReadMe
* (grizzelbee) New: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) - Added some Hot&Cool specific datafields
* (grizzelbee) New: Logging of from devices, when shutting down the adapter
* (grizzelbee) New: [#10](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/10) - Polling device data every X (configurable) seconds for new data, hence sensors don't send updates on changing values
* (grizzelbee) New: [#11](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/11) - Added Austria and France to Country-List
* (grizzelbee) Fix: Fixed bug in error handling when login to Dyson API fails
* (grizzelbee) Fix: [#12](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/12) - Fixed Dyson API login by completely securing via HTTPS.
* (grizzelbee) Fix: Updated some descriptions in config
  
### V0.4.0 (2020-09-29)
* (grizzelbee) New: devices are now **controllable**
* (grizzelbee) New: state-change-messages are processed correctly now
* (grizzelbee) Fix: Added missing °-Sign to temperature unit
* (grizzelbee) Fix: Terminating adapter when starting with missing Dyson credentials
* (grizzelbee) Fix: NO2 and VOC Indices should work now
* (grizzelbee) Fix: Fixed build errors

### V0.3.0 (2020-09-27) - first version worth giving it a try
* (grizzelbee) New: Messages received via Web-API and MQTT getting processed
* (grizzelbee) New: datapoints getting created and populated
* (grizzelbee) New: Added config item for desired temperature unit (Kelvin, Fahrenheit, Celsius)
* (grizzelbee) New: Added missing product names to product numbers
* (grizzelbee) New: Hostaddress/IP is editable / configurable
* (grizzelbee) New: calculate quality indexes for PM2.5, PM10, VOC and NO2 according to Dyson App

### V0.2.0 (2020-09-22) - not working! Do not install/use
* (grizzelbee) New: Login to Dyson API works
* (grizzelbee) New: Login to Dyson AirPurifier (2018 Dyson Pure Cool Tower [TP04]) works
* (grizzelbee) New: mqtt-Login to [TP04] works
* (grizzelbee) New: mqtt-request from [TP04] works
* (grizzelbee) New: mqtt-request to [TP04] is responding

### V0.1.0 (2020-09-04) - not working! Do not install/use
* (grizzelbee) first development body (non-functional)

## License

MIT License

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

Copyright (c) 2021 Hanjo Hingsen <open-source@hingsen.de>