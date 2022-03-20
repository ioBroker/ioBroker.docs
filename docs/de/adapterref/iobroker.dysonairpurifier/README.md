---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: wE2GvSKVqbB0ZUIQhgsyUCRJ6SNOfKH2bodwoOh2eKE=
---
# IoBroker.dysonAirPurifier
![Logo](admin/dyson_logo.svg)![Logo](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

![Anzahl der Installationen (neueste)](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![NPM](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

[![Test und Freigabe](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-deploy.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-deploy.yml) ![CodeQL](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/codeQL.yml/badge.svg)

## IoBroker Adapter für Dyson Luftreiniger und Ventilatoren
Dieser Adapter verbindet ioBroker mit verschiedenen Dyson Luftreinigern.
Fan-Icon im Logo erstellt von [Freepik] (https://www.flaticon.com/de/autoren/freepik) von [www.flaticon.com](https://www.flaticon.com/de/).

&gt; Wenn Ihnen dieser Adapter gefällt und Sie erwägen, mich zu unterstützen<br/> &gt; [![Mit payPal spenden](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

### Unterstützte Geräte
* Dyson Pure Cool Link Tower (TP02, Produkttyp 475)
* Dyson Pure Cool Tower, Modell 2018 (TP04, Produkttyp 438)
* Dyson Pure Cool Tower Formaldehyd, Modell 2018 (TP07, Produkttyp 438E)
* Dyson Pure Cool Link Schreibtisch (DP01, Produkttyp 469)
* Dyson Pure Cool Desk, Modell 2018 (DP04, Produkttyp 520)
* Dyson Pure Hot+Cool Link (HP02, Produkttyp 455)
* Dyson Pure Hot+Cool Link Neu (Produkttyp 455A)
* Dyson Pure Hot+Cool, Modell 2018 (HP04, Produkttyp 527)
* Dyson Pure Hot+Cool (HP07, Produkttyp 527E)
* Dyson Pure Humidify+Cool (PH01, Produkttyp 358)
* Dyson Pure Humidify+Cool (PH03, Produkttyp 358E)

## Merkmale
Verbindet Ihre Dyson Ventilatoren, Heizlüfter, Luftreiniger und Luftbefeuchter mit ioBroker.

* Liest Werte von Geräten und Sensoren
* Kann Geräte steuern, indem es Ihnen die Möglichkeit gibt, einige Werte zu ändern (Hauptleistung, Oszillation, Heizung, Lüftergeschwindigkeit, ...)
* Liest die Geräteliste von Dyson-Servern
* Behandelt eine *unbegrenzte* Anzahl von Fans (sicherlich begrenzen die Ressourcen Ihres ioBroker-Hosts die Anzahl).

## Wie es funktioniert
Beim Start wird die Dyson Cloud nach allen bekannten Geräten, die mit Ihrem Konto verbunden sind, und ihren MQTT-Passwörtern abgefragt. Mit dieser Liste in Händen verbindet sich der Adapter lokal mit allen Geräten und interagiert mit ihnen.

* Die Verbindung zur Dyson Cloud wird nur benötigt, um die Liste der an Ihr Konto gebundenen Geräte und deren MQTT-Passwörter abzurufen.
* Daher werden neue Geräte nur beim Start des Adapters erkannt.
* Die Dyson Cloud wird nur einmal während des Adapterstarts abgefragt.
* Dyson-Fans fungieren als MQTT-Server und der Adapter fungiert als Client.
* Die gesamte Kommunikation zwischen Geräten und dem Adapter findet nur lokal statt.
* Alle Verbindungsinformationen im Adapter werden gelöscht und beim Neustart neu aufgebaut.

## Installation
### Sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisch an den Autor zu melden. Dafür wird das Plugin [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) verwendet. Bitte beachten Sie die [Plugin-Homepage](https://github.com/ioBroker/plugin-sentry) für detaillierte Informationen darüber, was das Plugin tut, welche Informationen gesammelt werden und wie es deaktiviert werden kann, wenn Sie den Autor nicht mit Ihren Informationen zu Abstürzen unterstützen möchten.

### Voraussetzungen
* Dieser Adapter benötigt Node.js >= Version 10
* Es wird mindestens js-Controller 3.0.0 benötigt
* Mindestens Admin 4.0.9 ist erforderlich
* Um diesen Adapter zum Laufen zu bringen, benötigen Sie ein Dyson-Konto.
* Stellen Sie sicher, dass Sie Ihren Fan zu Ihrem Konto hinzufügen. Entweder per App oder online.

### Adapterinstallation
#### Mit npm
Führen Sie ```npm install iobroker.dysonairpurifier``` in Ihrer ioBroker-Installation aus, um die neueste Version dieses Adapters aus dem npm-Repository abzurufen.

#### Alternative: GitHub-URL verwenden
Installieren Sie über die ioBroker-Admin-Benutzeroberfläche, indem Sie auf die neueste stabile Version auf GitHub verweisen: <https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

Sie können mit diesen Methoden auch ältere Release-Versionen installieren (indem Sie in der URL auf ein Versions-Tag verweisen, z. B. ```v0.6.0``` anstelle von ```master```), aber die neueste Version wird im Allgemeinen bevorzugt.

### Konfig-Daten benötigt
* Benutzername des Dyson-Kontos
* Dyson-Kontopasswort (dieser Adapter kann Passwörter mit bis zu 32 Zeichen verarbeiten)
* die IP-Adresse Ihres Ventilators/Luftreinigers in Ihrem LAN (nicht in allen Fällen).

Der Dyson-Benutzername und das Passwort sind allgemeine Konfigurationsdaten, die auf der Konfigurationsseite des Adapters eingegeben werden müssen.
Im Unterschied dazu wird die IP in das Feld `Hostname` im Gerätebaum auf der Registerkarte `devices` eingetragen.

#### So konfigurieren Sie den Adapter
> Beim ersten regulären Start dieses Adapters wird die Dyson API für alle Ihre Geräte abgefragt und alle unterstützten Geräte werden im Gerätebaum angelegt – mit ihren von der API bereitgestellten Basisinformationen und einem zusätzlichen Feld `Hostaddress`.
> > Führen Sie den Adapter also bitte einmal aus, und Ihre Dyson-Geräte werden mit ihren Grundeinstellungen im Gerätebaum angelegt.
> > Stoppen Sie dann den Adapter, geben Sie die IP(s) in das/die Feld(er) `Hostaddress` im Gerätebaum ein und starten Sie den Adapter neu. Danach sollten Ihre Dyson-Geräte im Gerätebaum mit Daten gefüllt sein.

*Hinweis*: Aufgrund einer nicht konformen mDNS-Implementierung von Dyson müssen Sie *nach dem ersten Start* die lokale IP des Geräts angeben.

*Zusätzlicher Hinweis*: Seit Version 0.7.1 versucht der Adapter, sich mit dem Gerät über seinen Hostnamen (Seriennummer) zu verbinden, solange keine Hostadresse/IP angegeben wird. Dies funktioniert unter zwei Voraussetzungen:

1. In Ihrem LAN läuft ein DNS-Server. Entweder in Ihrem Router (bei FritzBoxen läuft z. B. ein DNS) oder einem dedizierten.
2. Sie haben den Standardgerätenamen nicht geändert.
3. Der Gerätename ist seiner IP korrekt zugeordnet (falls Sie Ihr DNS manuell verwalten).

### 2-Faktor-Authentifizierung (seit V0.9.0)
Nach der Installation des Adapters sollte dieser automatisch gestartet werden - falls nicht, bitte zuerst starten.
Nach einem Update wird es auch automatisch neu gestartet. In beiden Fällen bleibt es im "gelben" Zustand und zeigt wahrscheinlich einige Fehler im Protokoll an - das ist vorerst in Ordnung.

* Öffnen Sie den Konfigurationsdialog des Adapters
* Geben Sie mindestens Ihre eMail-Adresse, das Passwort und die Ländervorwahl ein - der Rest ist optional
* Klicken Sie auf die Schaltfläche 2FA-Code-E-Mail, um den Vorgang zu starten
* Sie erhalten automatisch eine "challengeId" im entsprechenden Feld, eine eMail und einen Dialog mit weiteren Anweisungen
* Geben Sie den 6-stelligen Code aus der eMail in das Feld „Dyson One Time Password“ ein
* Klicken Sie auf die Schaltfläche "Fertig stellen".
* Danach sollten Sie einen Token von Dyson erhalten haben (aus Sicherheitsgründen unsichtbar)
* Klicken Sie auf Speichern & Schließen, nachdem Sie Ihre Einrichtung abgeschlossen haben - der Adapter sollte neu starten und grün werden.

Alle Werte werden gespeichert und weiterhin angezeigt.
> Normalerweise müssen Sie diese 2 FA nicht regelmäßig machen - aber Sie können sie bei Bedarf wiederholen.

#### Wenn Sie während 2-FA mit dem 401-Problem konfrontiert werden. Bitte versuchen Sie diese Problemumgehung:
1. Melden Sie sich von Ihrer Dyson Smartphone-App ab
2. Warten Sie einige Minuten
3. Geben Sie Ihre Zugangsdaten zum Adapter ein (falls noch nicht geschehen) und folgen Sie der 2FA-Prozedur bis zum Ende.
4. Der Adapter sollte starten und grün werden.
5. Warten Sie eine Weile (bis zu einer Stunde oder vielleicht länger, da Dyson einen Blocker für zu viele Anfragen in einem kurzen Zeitrahmen hat)
6. Melden Sie sich erneut bei Ihrer Dyson-Smartphone-App an, wenn Sie sie verwenden möchten.

## Steuerung Ihrer Geräte
Dieser Adapter ist derzeit in der Lage, die folgenden Zustände Ihrer Geräte zu steuern:

* FanMode, Gerätemodus (Manuell, Auto, Aus)
* FanSpeed , Aktuelle Lüftergeschwindigkeit
* Nachtmodus, Nachtmoduszustand
* Oszillation, Oszillation des Lüfters (Ein, Aus).
* OscillationRight , OscillationAngle Upper Boundary
* OscillationLeft , OscillationAngle Lower Boundary
* Oszillationswinkel , Oszillationswinkel
* ContinuousMonitoring, Kontinuierliche Überwachung von Umgebungssensoren, auch wenn das Gerät ausgeschaltet ist.
* MainPower, Hauptleistung des Lüfters.
* AutomaticMode , Lüfter ist im Automatikmodus.
* Flowdirection , Richtung, in die der Lüfter bläst. EIN=vorne; AUS = Zurück (auch bekannt als Jet-Fokus)
* Jetfocus , Richtung, in die der Lüfter bläst. EIN=vorne; AUS = Zurück (auch bekannt als Jet-Fokus)
* Heizmodus, Heizmodus [EIN/AUS]
* HeatingTargetTemp , Zieltemperatur für das Heizen
* AirQualityTarget , Zielluftqualität für den automatischen Modus.
* Befeuchtungsmodus, Ein / Aus
* BefeuchtenAutoModus, Auto / Aus
* Automatisches Befeuchtungsziel, Automatisches Befeuchtungsziel
* Befeuchtungsziel, manuelles Befeuchtungsziel
* TemperatureUnit , Einheit zur Anzeige der Temperaturwerte (Lüfteranzeige).
* Wasserhärte, weich, mittel, hart

Mögliche Werte für diese Zustände sind, soweit bekannt, weiter unten dokumentiert.
Lüftergeschwindigkeit erlaubt nur Werte von 1 bis 10 und Auto. Wenn Sie Ihre Lüftergeschwindigkeit auf 0 stellen möchten, müssen Sie die Hauptstromversorgung ausschalten.
Das macht auch die Dyson-App.

### Bekannte Probleme
* Keine automatische IP-Erkennung von Geräten
* Manchmal verliert der Adapter die MQTT-Verbindung zu einem Lüfter und kann sich nicht wieder verbinden. In meinem Fall reicht es aus, den Lüfter für ca. 10 Sekunden vom Netz zu nehmen, um ihn zurückzusetzen und wieder einzustecken. Versuche es.

## Erklärung der Dyson API-Daten (Nachrichtennutzlast)
Informationen kopiert und erweitert von <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md>

### AKTUELLEN ZUSTAND
| Name | Bedeutung | mögliche Werte | Einheit |
|--------------|------------------------------------------------------------|----------------------|------|
| Modusgrund | Der aktuelle Modus wurde von RemoteControl, App, Scheduler | festgelegt PRC, LAPP, LSCH, PUI | |
| Staatsgrund | | MODUS | |
| rsi | WLAN-Stärke | -100 - 0 | dBm |
| Kanal | WLAN-Kanal | 52 | |
| fqhp | | 96704 | |
| fghp | | 70480 | |

#### Produktzustand
| Name | Bedeutung | mögliche Werte | Einheit |
|------|-------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
| erd | Letzter Fehlercode | NONE oder einige Hexa-Werte | |
| filf | verbleibende Filterlebensdauer | 0000 - 4300 | Stunden |
| fmod | Modus | LÜFTER, AUTO, AUS | |
| fwr | Hauptstrom | EIN, AUS | |
| fnst | Lüfterstatus | EIN, AUS, LÜFTER | |
| fnsp | Lüftergeschwindigkeit | 0001 - 0010, AUTO | |
| fdir | Fandirection aka. Düsenfokus/ EIN=vorne, AUS=hinten | EIN, AUS | |
| ffoc | JetFocus | EIN, AUS | |
| nmod | Nachtmodus | EIN, AUS | |
| Osson | Schwingung | EIN, AUS | |
| ossal | Oszillationswinkel untere Grenze | 0005 - 355 | ° (Grad) |
| Osau | Oszillationswinkel Obergrenze | 0005 - 355 | ° (Grad) |
| osz | OszillationAktiv | EIN, AUS, LEERLAUF | |
| ankp | Oszillationswinkel | KUNDE, 0180 | ° (Grad) |
| qtar | Luftqualitätsziel | 0001=Gut, 0002=Normal, 0003=Schlecht, 0004=Sehr schlecht | |
| rhtm | Kontinuierliche Überwachung | EIN, AUS | |
| automatisch | Automatikmodus | EIN, AUS | |
| nmdv | Max. Lüftergeschwindigkeit im Nachtmodus? | 0004 | |
| cfrl | Status Aktivkohlefilter | 0000 - 0100 | Prozent |
| cflt | Kohlefilter | CARF, KEINE | |
| hflr | Status HEPA-Filter | 0000 - 0100 | Prozent |
| hflt | HEPA-Filter | GHEP, GCOM | |
| sltm | Sleeptimer | EIN, AUS || |
| hmod | Heizungsmodus [EIN/AUS] | WÄRME | |
| hmax | Solltemperatur für Heizung | 0 .. 5000 | K. |
| Hume | Befeuchtungsmodus | EIN, AUS, | |
| hoch | Auto-Modus befeuchten | HUMIDIFY_AUTO_MODE_ON, HUMIDIFY_AUTO_MODE_OFF | |
| summen | Befeuchtungsziel | HUMIDIFICATION_MODE_OFF, HUMIDIFICATION_MODE_THIRTY, HUMIDIFICATION_MODE_FORTY, HUMIDIFICATION_MODE_FIFTY, HUMIDIFICATION_MODE_SIXTY, HUMIDIFICATION_MODE_SEVENTY | |
| cdr | CleanDurationRemaining | Ganzzahl | Minuten |
| rechteck | AutoHumidificationTarget | Ganzzahl | % |
| cltr | TimeRemainingToNextClean | Ganzzahl | Stunden |
| was | Wasserhärte | SOFT="2025", MEDIUM="1350", HARD="0675" | |
| wacd | Warncode | KEINE...                                                                                                                                                           | |
| rstf | Filterlebenszyklus zurücksetzen | 'RSTF', 'STET', RESET_FILTER_LIFE_IGNORE, RESET_FILTER_LIFE_ACTION | |
| Korf | Temperaturformat | EIN=Celsius, AUS=Fahrenheit | |
| clcr | DeepcleanCycle | CLNO=inaktiv, CLAC=Deep clean in progress, CLCM=Fertig | |
| hsta | Heizzustand | AKTIV/RUHE | |
| msta | Befeuchtungszustand | Aktiv/Leerlauf AUS, HUMD | |
| psta | [HP0x] Unbekannt | INIT, CLNG, INV, AUS | |
| brillant | unbekannt | 0002 | STUFE_NIEDRIG, STUFE_MITTEL, STUFE_HOCH |
| fqhp | unbekannt | | |
| Neigung | [HP0x] Unbekannt | Zeichenfolge | |
| wählen | [DP0x] Unbekannt | | |

| Fehlercodes | Bedeutung |
|-------------|----------------------------------------------------------------------------------------------|
| KEINE        | Es ist kein Fehler aktiv |
| 57C2 | unbekannt |
| 11E1 | Die Oszillation wurde deaktiviert. Bitte drücken Sie die Taste "Oszillation" auf Ihrer Fernbedienung, um fortzufahren. |

#### Planer
| Name | Bedeutung | mögliche Werte | Einheit |
|------|--------------------|-----------------|------|
| dstv | Sommerzeit | 0001... | |
| srsc | ? | 7c68... | |
| zitat | Zeitzone? | 0001... | |

### UMWELT-STROM-SENSOR-DATEN
#### Daten
| Name | Bedeutung | mögliche Werte | Einheit |
|------|----------------------------|-----------------|---------|
| akt | Feuchtigkeit (%) | 0000 - 0100 | Prozent |
| Pakt | Staub | 0000 - 0009 | |
| sltm | Sleep-Timer | AUS... 9999 | Minuten |
| Takt | Temperatur in Kelvin | 0000 - 5000 | K. |
| vakt | flüchtige organische Verbindungen | 0001 - 0009 | |
| hcho | Formaldehyd ||
| pm25 | PM2.5 | 0018 ||
| pm10 | PM10 | 0011 ||
| va10 | flüchtige organische Verbindungen | 0004 ||
| noxl | NO2 | 0000 - 0014 ||
| p25r | | 0019 ||
| p10r | | 0018 ||

### UMWELT-UND-NUTZUNGSDATEN
Redundante Werte?

#### Daten
| Name | Bedeutung | mögliche Werte | Einheit |
|-------------|--------------------------------------------------------------------------|---------------------------------------------|-------------|
| pal0 - pal9 | Anzahl der Sekunden, die seit dem Beginn der Stunde in diesem Staubniveau verbracht wurden | 0000 - 3600 | |
| Palme | scheint ein Medianwert von palX | zu sein | |
| vol0 - vol9 | Anzahl der Sekunden, die seit dem Beginn der Stunde | auf diesem VOC-Niveau verbracht wurden 0000 - 3600 | |
| Volumen | scheint ein Medianwert von volX | zu sein | |
| aql0 - aql9 | Anzahl der Sekunden verbringen in diesem Niveau der Luftqualität | max (pal, vol)) seit Beginn der Stunde | 0000 - 3600 | |
| aqlm | scheint ein Medianwert von aqlX | zu sein | |
| fafs | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| Faos | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| fofs | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| fons | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| summen | Feuchtigkeit ? (%) | 0000 - 0100 | |
| tpm | Temperatur in Kelvin? | 0000 - 5000 | |

## Rechtliche Hinweise
Dyson, pure cool, pure hot & cool und andere sind Warenzeichen oder eingetragene Warenzeichen von [Dyson Ltd.](https://www.dyson.com) Alle anderen Warenzeichen sind Eigentum ihrer jeweiligen Inhaber.

## Changelog

### V2.4.0 (2022-03-17) (Echo from the past)
* (grizzelbee) New: Added warning code to device tree
* (grizzelbee) New: Added Device-faults as SystemState to device tree
* (grizzelbee) New: Added donate button to readme and config page
* (grizzelbee) Upd: Switched "Sending data to device" message from loglevel info to debug
* (grizzelbee) Upd: reduced amount of debug messages
* (grizzelbee) Upd: Updated dependencies


### V2.3.2 (2022-03-04) (Fairytale of doom)
* (grizzelbee) Fix: Fixed: Sentry-Error: [DYSONAIRPURIFIER-D](https://sentry.io/organizations/grizzelbee/issues/3021418514)
* (grizzelbee) Upd: Updated dependencies

### V2.3.1 (2022-01-14) (Fairytale of doom)
* (grizzelbee) Upd: Updated dependencies
* (grizzelbee) Upd: Updated documentation

### V2.3.0 (2021-12-02) (Fairytale of doom)
* (grizzelbee) New: Added some GUI elements for air quality in folder icons
* (grizzelbee) New: Added support for HEPA PTFE filters
* (grizzelbee) New: Added support for Combined PTFE filters
* (grizzelbee) Chg: Fanspeed is now a number (not string anymore) to work properly with IoT-Adapter. Please delete this data point and let get recreated. 

### V2.2.0 (2021-11-07) (Welcome to my wasteland)
* (grizzelbee) New: [#154](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/154) Added support for dyson Humidify+Cool PH03/358E.

### V2.1.4 (2021-10-20) (Running to the edge)
* (grizzelbee) New: [#152](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/152) Added token-indicator to config page in admin to show whether a token has already been received and saved or not.

### V2.1.3 (2021-10-17) (Running to the edge)
* (grizzelbee) Fix: [#148](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/148) Hostaddress is used properly when given.
* (grizzelbee) Fix: [#149](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/149) OscillationAngle "Breeze" is working now 
* (grizzelbee) Fix: [#150](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/150) Strange delay and jumping of boolean switches is fixed 

### V2.1.2 (2021-10-07) (Running to the edge)
* (grizzelbee) New: Removed NO2 from general AirQuality to be more compliant to dyson-app
* (grizzelbee) Upd: Code cleanup
* (grizzelbee) Upd: Removed delay between sending a command and new values getting displayed (max 30 Secs)


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
* (grizzelbee) Fix: Sentry-error [DYSONAIRPURIFIER-7](https://sentry.io/organizations/nocompany-6j/issues/2690134161/?project=5735771) -> Cannot read property '3' of undefined
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
* (grizzelbee) New: Editable data fields have now appropriate value lists
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

Copyright (c) 2020 .. 2022 Hanjo Hingsen <open-source@hingsen.de>