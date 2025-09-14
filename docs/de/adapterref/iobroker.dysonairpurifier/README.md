---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: TrVvrFSq4u7AaaRxKlcy45ySYcqrWFFO5HjRluhLbPc=
---
# IoBroker.dysonAirPurifier
![Logo](admin/dyson_logo.svg)![Logo](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![NPM](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

[![Testen und Freigeben](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-release.yml) ![CodeQL](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/codeQL.yml/badge.svg)

## IoBroker-Adapter für Dyson-Luftreiniger und -Ventilatoren
Dieser Adapter verbindet ioBroker mit verschiedenen Dyson-Luftreinigern.
Ventilator-Symbol im Logo erstellt von [Freepik](https://www.flaticon.com/de/autoren/freepik) von [www.flaticon.com](https://www.flaticon.com/de/).

&gt; Wenn Ihnen dieser Adapter gefällt und Sie erwägen, mich zu unterstützen<br/> &gt; [![Spenden mit PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

### Unterstützte Geräte
Dyson Pure Humidify+Cool (PH01, Produkttyp 358)
Dyson Pure Humidify+Cool (PH03, Produkttyp 358E)
Dyson Pure Humidify+Cool Formaldehyd (PH04, Produkttyp 358K)
- Dyson Pure Cool Tower, Modell 2018 (TP04, Produkttyp 438)
- Dyson Pure Cool Tower Formaldehyd, Modell 2018 (TP07, Produkttyp 438E)
- Dyson Pure Cool Tower Formaldehyd, Modell 2018 (TP07, Produkttyp 438K)
Dyson Pure Hot+Cool Link (HP02, Produkttyp 455)
- Dyson Pure Hot+Cool Link Neu (Produkttyp 455A)
- Dyson Pure Cool Link Desk (DP01, Produkttyp 469)
Dyson Pure Cool Link Tower (TP02, Produkttyp 475)
- Dyson Pure Cool Desk, Modell 2018 (DP04, Produkttyp 520)
- Dyson Pure Hot+Cool, Modell 2018 (HP04, Produkttyp 527)
Dyson Pure Hot+Cool (HP07, Produkttyp 527E)
- Dyson Pure Hot+Cool Formaldehyd (HP09, Produkttyp 527K)
- Dyson Purifier Big+Quiet Formaldehyd (BP03, Produkttyp 664)

## Merkmale
Verbindet Ihre Dyson-Ventilatoren, Heizlüfter, Luftreiniger und Luftbefeuchter mit ioBroker.

- Liest Werte von Geräten und Sensoren
- Kann Geräte steuern, indem Sie einige Werte ändern können (Hauptstrom, Oszillation, Heizung, Lüftergeschwindigkeit, ...)
- Liest die Geräteliste von Dyson-Servern
- Verwaltet eine _unbegrenzte_ Anzahl von Fans (tatsächlich begrenzen die Ressourcen Ihres ioBroker-Hosts die Anzahl).

## So funktioniert es
Beim Start wird die Dyson Cloud nach allen bekannten Geräten, die mit Ihrem Konto verknüpft sind, und deren MQTT-Passwörtern abgefragt. Mit dieser Liste verbindet sich der Adapter lokal mit allen Geräten und interagiert mit ihnen.

- Die Verbindung zur Dyson-Cloud wird nur benötigt, um die Liste der an Ihr Konto gebundenen Geräte und deren MQTT-Passwörter abzurufen.
- Daher werden neue Geräte nur beim Start des Adapters erkannt.
- Die Dyson-Cloud wird beim Start des Adapters nur einmal abgefragt.
- Dyson-Ventilatoren fungieren als MQTT-Server und der Adapter als Client.
- Die gesamte Kommunikation zwischen Geräten und Adapter erfolgt ausschließlich lokal.
- Alle Verbindungsinformationen im Adapter werden beim Neustart gelöscht und neu erstellt.

## Installation
### Voraussetzungen
- Dieser Adapter benötigt Node.js >= Version 18.2
- Mindestens js-Controller 3.0.0 wird benötigt
- Mindestens Admin 6.0.0 ist erforderlich
- Um diesen Adapter zum Laufen zu bringen, benötigen Sie ein Dyson-Konto.
- Denken Sie daran, Ihren Fan zu Ihrem Konto hinzuzufügen. Entweder über die App oder online.

### Adapterinstallation
#### Verwenden von npm
Führen Sie `npm install iobroker.dysonairpurifier` auf Ihrer ioBroker-Installation aus, um die neueste Version dieses Adapters aus dem npm-Repository zu holen.

#### Alternative: Verwenden der GitHub-URL
Installieren Sie es über die ioBroker-Admin-Benutzeroberfläche, indem Sie auf die neueste stabile Version auf GitHub verweisen: <https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

Sie können mit diesen Methoden auch ältere Release-Versionen installieren (indem Sie in der URL auf einen Versionstag verweisen, z. B. `v0.6.0` statt `master`), aber im Allgemeinen wird die aktuellste Version bevorzugt.

### Konfigurationsdaten benötigt
- Dyson-Konto-Benutzername
- Dyson-Kontopasswort (dieser Adapter kann Passwörter mit bis zu 32 Zeichen verarbeiten)
- die IP-Adresse Ihres Ventilators/Luftreinigers in Ihrem LAN (nicht in allen Fällen).

Dyson-Benutzername und -Passwort sind allgemeine Konfigurationsdaten, die auf der Konfigurationsseite des Adapters eingegeben werden müssen.
Im Unterschied dazu wird die IP im Feld `Hostname` im Gerätebaum auf der Registerkarte `devices` eingetragen.

#### So konfigurieren Sie den Adapter
> Beim ersten regulären Start dieses Adapters wird die Dyson-API für alle Ihre Geräte abgefragt. Alle unterstützten Geräte werden im Gerätebaum angelegt – mit den von der API bereitgestellten Basisinformationen und dem zusätzlichen Feld `Hostaddress`.
> > Führen Sie den Adapter daher einmal aus, und Ihre Dyson-Geräte werden mit ihren Basiseinstellungen im Gerätebaum angelegt.
> > Stoppen Sie anschließend den Adapter, geben Sie die IP(s) in das/die Feld(er) `Hostaddress` im Gerätebaum ein und starten Sie den Adapter neu. Danach sollten Ihre Dyson-Geräte im Gerätebaum mit Daten gefüllt sein.

_Bitte beachten_: Aufgrund einer nicht konformen mDNS-Implementierung von Dyson müssen Sie _nach dem ersten Lauf_ die lokale IP des Geräts angeben.

_Zusätzlicher Hinweis_: Seit Version 0.7.1 versucht der Adapter, sich über den Hostnamen (Seriennummer) mit dem Gerät zu verbinden, solange keine Hostadresse/IP angegeben ist. Dies funktioniert unter zwei Voraussetzungen:

1. In Ihrem LAN läuft ein DNS-Server. Entweder in Ihrem Router (z.B. FritzBoxen haben einen DNS-Server) oder ein dedizierter.
2. Sie haben den Standardgerätenamen nicht geändert.
3. Der Gerätename ist seiner IP korrekt zugeordnet (falls Sie Ihr DNS manuell verwalten).

### 2-Faktor-Authentifizierung (seit V0.9.0)
Nach der Installation des Adapters sollte dieser automatisch gestartet werden – falls nicht, starten Sie ihn bitte zuerst.
Nach einem Update wird er ebenfalls automatisch neu gestartet. In beiden Fällen bleibt er im Status „gelb“ und zeigt wahrscheinlich einige Fehler im Protokoll an – das ist vorerst in Ordnung.

- Öffnen Sie den Konfigurationsdialog des Adapters
- Geben Sie mindestens Ihre E-Mail-Adresse, das Passwort und die Ländervorwahl ein - der Rest ist optional
- Klicken Sie auf die Schaltfläche „2FA-Code-E-Mail“, um den Vorgang zu starten
- Sie erhalten automatisch eine "ChallengeId" im entsprechenden Feld, eine E-Mail und einen Dialog mit weiteren Anweisungen
- Geben Sie den 6-stelligen Code aus der E-Mail in das Feld „Dyson Einmalpasswort“ ein.
- Klicken Sie auf die Schaltfläche "Fertig stellen"
- danach sollten Sie ein Token von Dyson erhalten haben (aus Sicherheitsgründen unsichtbar)
- Klicken Sie auf „Speichern und schließen“, nachdem Sie die Einrichtung abgeschlossen haben – der Adapter sollte neu starten und grün werden.

Alle Werte werden gespeichert und weiterhin angezeigt.

> Normalerweise müssen Sie diese 2 FA nicht regelmäßig durchführen – Sie können sie aber bei Bedarf wiederholen.

#### Wenn bei 2-FA das 401-Problem auftritt, versuchen Sie bitte diese Problemumgehung:
1. Melden Sie sich von Ihrer Dyson Smartphone-App ab
2. Warten Sie einige Minuten
3. Geben Sie Ihre Anmeldedaten für den Adapter ein (falls noch nicht geschehen) und führen Sie das 2FA-Verfahren bis zum Ende durch.
4. Der Adapter sollte starten und grün werden.
5. Warten Sie eine Weile (bis zu einer Stunde oder vielleicht länger, da Dyson einen Blocker für zu viele Anfragen in einem kurzen Zeitrahmen hat)
6. Melden Sie sich erneut bei Ihrer Dyson-Smartphone-App an, wenn Sie sie verwenden möchten.

## Steuern Ihres/Ihrer Geräte(s)
Dieser Adapter kann derzeit die folgenden Zustände Ihrer Geräte steuern:

- FanMode, Gerätemodus (Manuell, Auto, Aus)
- FanSpeed, Aktuelle Lüftergeschwindigkeit
- Nachtmodus, Nachtmoduszustand
- Oszillation, Oszillation des Lüfters (Ein, Aus).
- OscillationRight , OscillationAngle Obergrenze
- OscillationLeft, OscillationAngle Untergrenze
- Schwingungswinkel , Schwingungswinkel
- ContinuousMonitoring, kontinuierliche Überwachung von Umgebungssensoren, auch wenn das Gerät ausgeschaltet ist.
- MainPower, Hauptstromversorgung des Lüfters.
- AutomaticMode, Lüfter ist im Automatikmodus.
- Strömungsrichtung, Richtung, in die der Ventilator bläst. EIN=Vorne; AUS=Hinten (auch bekannt als Jet-Fokus)
- Jetfocus, Richtung, in die der Lüfter bläst. EIN=Vorne; AUS=Hinten (auch bekannt als Jetfocus)
- Heizmodus, Heizmodus [EIN/AUS]
- HeatingTargetTemp , Zieltemperatur für die Heizung
- AirQualityTarget, Zielluftqualität für den Automodus.
- Befeuchtungsmodus, Ein / Aus
- HumidifyAutoMode, Auto / Aus
- AutoHumidificationTarget, Auto HumidificationTarget
- HumidificationTarget, Manuelles HumidificationTarget
- TemperatureUnit, Einheit zur Anzeige von Temperaturwerten (Lüfteranzeige).
- Wasserhärte, Weich, Mittel, Hart

Mögliche Werte für diese Zustände sind, soweit bekannt, unten dokumentiert.
Die Lüftergeschwindigkeit erlaubt nur Werte von 1 bis 10 und die Einstellung „Auto“. Wenn Sie die Lüftergeschwindigkeit auf 0 reduzieren möchten, müssen Sie den Hauptschalter ausschalten.
Dies geschieht auch in der Dyson-App.

### SystemStates-Ordner (seit 2.4.0)
Die Geräte können Fehler melden. Diese Funktion wurde in Adapterversion 2.4.0 hinzugefügt.
Zurzeit liegen nur grobe Informationen zu den Fehlern vor, und die Datenpunkte variieren von Gerät zu Gerät.
Wenn Sie genauere Informationen zu einem Fehler haben, melden Sie diese gerne, damit ich den Adapter verbessern kann.
Alle Status geben an, ob ein Fehler vorliegt oder nicht. `True` bedeutet einen Fehler, `false` bedeutet „Kein Fehler“.

### Poll Intervall
- Ab v3.2.2 deaktiviert ein Polling-Intervall von 0 das Polling definitiv. Aus mathematischen Gründen mag es vorher funktioniert haben – aber nicht mit Sicherheit und mit unbekannten Nebenwirkungen.

Das ist gut zu wissen, da die Geräte (zumindest meine) ihren Status normalerweise selbst senden, wenn er sich ändert. Mit dieser Einstellung können Sie Ihren Netzwerkverkehr reduzieren, indem unnötige Abfragen verhindert werden.

### Bekannte Probleme
- Keine automatische IP-Erkennung der Geräte
- Immer noch viele unbekannte Gerätemeldungen (meist Fehler und Warnungen)
- Filter-Reset funktioniert nicht, da die richtige MQTT-Nachricht unbekannt ist
- Manchmal verliert der Adapter die MQTT-Verbindung zu einem Lüfter und kann diese nicht wiederherstellen. „Dies liegt normalerweise nicht am Adapter selbst, sondern an Ihrem lokalen Netzwerk!“
- In manchen Fällen reicht es aus, den Lüfter für ca. 10 Sekunden vom Stromnetz zu trennen und ihn anschließend wieder anzuschließen. Probieren Sie es einfach aus!
- In anderen Fällen lag ein IP/DNS-Problem vor. Das Zurücksetzen des DHCP/DNS-Servers (Router) löste das Problem.

## Erklärung der Dyson-API-Daten (Nachrichtennutzlast)
Informationen kopiert und erweitert von <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md>

### AKTUELLER STAND
| Name | Bedeutung | mögliche Werte | Einheit |
|--------------|------------------------------------------------------------|----------------------|------|
| Modusgrund | Der aktuelle Modus wurde durch RemoteControl, App, Scheduler | PRC, LAPP, LSCH, PUI | | festgelegt. |
| Staatsvernunft | | MODUS | |
| RSSI | WLAN-Stärke | -100 – 0 | dBm |
| Kanal | WIFI-Kanal | 52 | |
| fqhp |                                                            | 96704 |      |
| fghp | | 70480 | |

#### Produktstatus
| Name | Bedeutung | mögliche Werte | Einheit |
| ---- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --- |
| ercd | Letzter Fehlercode | KEINE oder einige Hexadezimalwerte | |
| Filf | verbleibende Filterlebensdauer | 0000 - 4300 | Stunden |
| fmod | Modus | LÜFTER, AUTO, AUS | |
| fpwr | Hauptstromversorgung | EIN, AUS | |
| fnst | Lüfterstatus | EIN, AUS, LÜFTER | |
| fnsp | Lüftergeschwindigkeit | 0001 - 0010, AUTO |                                     |
| fdir | Lüfterrichtung aka. Jet-Fokus/ EIN=Vorne, AUS=Hinten | EIN, AUS | |
| ffoc | JetFocus | EIN, AUS | |
| nmod | Nachtmodus | EIN, AUS | |
| oson | Oszillation | EIN , AUS | |
| osal | Untere Grenze des Schwingungswinkels | 0005 – 355 | ° (Grad) |
| osau | Obere Grenze des Schwingungswinkels | 0005 – 355 | ° (Grad) |
| oscs | OscillationActive | EIN, AUS, LEERLAUF | |
| ancp | Oszillationswinkel | CUST, 0180 | ° (Grad) |
| qtar | Luftqualitätsziel | 0001=Gut, 0002=Normal, 0003=Schlecht, 0004=Sehr schlecht | |
| rhtm | Kontinuierliche Überwachung | EIN, AUS | |
| auto | Automatikmodus | EIN, AUS | |
| nmdv | Max. Lüftergeschwindigkeit im Nachtmodus? | 0004 | |
| cflr | Status Kohlefilter | 0000 - 0100 | Prozent |
| cflt | Kohlefilter | CARF, KEINE |                                     |
| hflr | Status HEPA-Filter | 0000 - 0100 | Prozent |
| hflt | HEPA-Filter | GHEP, GCOM |                                     |
| sltm | Sleeptimer | EIN, AUS | | |
| hmod | Heizmodus [EIN/AUS] | HEIZEN | |
| hmax | Zieltemperatur für Heizen | 0 .. 5000 | K |
| hume | Befeuchtungsmodus | EIN, AUS, | |
| haut | Automatischer Befeuchtungsmodus | HUMIDIFY_AUTO_MODE_ON, HUMIDIFY_AUTO_MODE_OFF | |
| humt | Befeuchtungsziel | HUMIDIFICATION_MODE_OFF, HUMIDIFICATION_MODE_THIRTY, HUMIDIFICATION_MODE_FORTY, HUMIDIFICATION_MODE_FIFTY, HUMIDIFICATION_MODE_SIXTY, HUMIDIFICATION_MODE_SEVENTY | |
| cdrr | CleanDurationRemaining | Ganzzahl | Minuten |
| Rechteck | AutoHumidificationTarget | Ganzzahl | % |
| cltr | VerbleibendeZeitBisZurNächstenReinigung | Ganzzahl | Stunden |
| Wasser | Wasserhärte | SOFT="2025", MEDIUM="1350", HARD="0675" | |
| wacd | Warncode | KEINE... |                                     |
| rstf | Filterlebenszyklus zurücksetzen | „RSTF“, „STET“, RESET_FILTER_LIFE_IGNORE, RESET_FILTER_LIFE_ACTION | |
| corf | Temperaturformat | EIN=Celsius, AUS=Fahrenheit |                                     |
| clcr | DeepcleanCycle | CLNO=inaktiv, CLAC=Tiefenreinigung läuft, CLCM=Beendet | |
| hsta | Heizzustand | AKTIV/LEERLAUF | |
| msta | Befeuchtungszustand | Aktiv/Leerlauf AUS, HUMD | |
| psta | [HP0x] Unbekannt | INIT, CLNG, INV, AUS |                                     |
| bril | unbekannt | 0002 | LEVEL_LOW, LEVEL_MEDIUM, LEVEL_HIGH |
| fqhp | unbekannt | | |
| Neigung | [HP0x] Unbekannt | Zeichenfolge | |
| wählen | [DP0x] Unbekannt | | |

| Fehlercodes | Bedeutung |
|-------------|----------------------------------------------------------------------------------------------|
| KEINE | Es ist kein Fehler aktiv |
| 57C2 | unbekannt |
| 11E1 | Die Oszillation wurde deaktiviert. Drücken Sie zum Fortfahren die Taste „Oszillation“ auf Ihrer Fernbedienung. |

#### Planer
| Name | Bedeutung | mögliche Werte | Einheit |
|------|--------------------|-----------------|------|
| dstv | Sommerzeit | 0001... | |
| srsc | ? | 7c68... | |
| tzid | Zeitzone?          | 0001... |      |

### UMWELT-STROM-SENSOR-DATEN
#### Daten
| Name | Bedeutung | mögliche Werte | Einheit |
|------|----------------------------|-----------------|---------|
| hact | Luftfeuchtigkeit (%) | 0000 - 0100 | Prozent |
| Pakt | Staub | 0000 - 0009 | |
| sltm | Sleep-Timer | AUS... 9999 | Minuten |
| Takt | Temperatur in Kelvin | 0000 - 5000 | K |
| vact | flüchtige organische Verbindungen | 0001 - 0009 | |
| hcho | Formaldehyd (nicht verwendet) | | |
| hchr | Formaldehyd | | |
| pm25 | PM2,5 (nicht verwendet) | 0018 | |
| pm10 | PM10 (nicht verwendet) | 0011 | |
| va10 | flüchtige organische Verbindungen | 0004 | |
| noxl | NO2 | 0000 - 0014 | |
| p25r | PM2,5-Feinstaub | 0019 | µg/m³ |
| p10r | PM10-Feinstaub | 0018 | µg/m³ |

### UMWELT- UND NUTZUNGSDATEN
Redundante Werte?

#### Daten
| Name | Bedeutung | mögliche Werte | Einheit |
| ----------- | ------------------------------------------------------------------------ | ------------------------------------------- | ----------- | --- |
| pal0 – pal9 | Anzahl der Sekunden, die seit Beginn der Stunde in dieser Staubschicht verbracht wurden | 0000 – 3600 | |
| palm | scheint ein Medianwert von palX zu sein | | |
| vol0 – vol9 | Anzahl der Sekunden, die seit Beginn der Stunde in dieser VOC-Ebene verbracht wurden | 0000 – 3600 | |
| volm | scheint ein Medianwert von volX zu sein | | |
| aql0 – aql9 | Anzahl der Sekunden, die bei dieser Luftqualitätsstufe verbracht wurden | max (pal, vol)) seit Beginn der Stunde | 0000 – 3600 | |
| aqlm | scheint ein Medianwert von aqlX zu sein | | |
| fafs | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| faos | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| fofs | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| fons | scheint eine Anzahl von Sekunden zu sein, die in einer bestimmten Zeit verbracht werden | 0000 - 3600 | |
| Brummen | Luftfeuchtigkeit ? (%) | 0000 - 0100 | |
| tmpm | Temperatur in Kelvin? | 0000 - 5000 | |

### Sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisch an den Autor zu melden. Dafür wird das Plugin [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) verwendet. Detaillierte Informationen zur Funktion des Plugins, den gesammelten Informationen und zur Deaktivierung des Plugins, falls Sie den Autor nicht mit Ihren Absturzinformationen unterstützen möchten, finden Sie im [Plugin-Startseite](https://github.com/ioBroker/plugin-sentry).

## Rechtliche Hinweise
Dyson, Pure Cool, Pure Hot & Cool und andere sind Marken oder eingetragene Marken von [Dyson Ltd.](https://www.dyson.com). Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

## Changelog
### **WORK IN PROGRESS**
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: [#338](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/338) Fixed Admin dependency
- (grizzelbee) Fix: [#341](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/341) Fixed linting
- fixes #342 Updated minimum required NodeJs Version to 20

### 3.2.7 (2025-02-13)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: Moved to eslint 9 and fixed new lint issues

### 3.2.6 (2024-11-13)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed issues mentioned by adapter checker regarding responsive design

### 3.2.5 (2024-10-08) 
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Fixed GUI issues
- (grizzelbee) Fix: Added missing files to files-section in package.json

### 3.2.4 (2024-10-01)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Fix: Removed plugin-sentry
- (grizzelbee) Fix: [#318](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/318) Added tests for node 22
- (grizzelbee) Upd: [#315](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/315) Fixed some issues mentioned by adapter-checker

### 3.2.3 (2024-06-21) (Marching on)
- (grizzelbee) Fix: Added missing clearInterval in onUnload

### 3.2.2 (2024-06-18) (Marching on)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: [#286](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/286) Fixed polling which got broken in v3.1.10
- (grizzelbee) Upd: Poll intervall of 0 disables polling

### 3.2.1 (2024-06-04) (Marching on)
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Upd: [#286](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/286) Fixed polling which got broken in v3.1.10

### 3.2.0 (2024-05-28) (Marching on)

- (grizzelbee) Chg: Lamps (Product type 552a) won't generate a warning on startup any longer but show an info that they are not supported by this adapter.
- (grizzelbee) Chg: Vacuum cleaner robots (Product types 276 and 277) won't generate a warning on startup any longer but show an info that they are not supported by this adapter.
- (grizzelbee) New: [#289](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/289) Added Support for Dyson Purifier Big+Quiet Formaldehyde (BP03, Produce type 664) 
- (grizzelbee) Fix: [#287](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/287) Added Switzerland again to config 
- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Chg: removed obsolete index_m.html
- (grizzelbee) Fix: Fixed broken NO2Index
- (grizzelbee) Fix: Fixed broken fan speeds 0-10
- (grizzelbee) Fix: Fixed polling of sensor data
- (grizzelbee) Fix: setting fan speed = Auto works

### 3.1.10 (2024-05-14) (Marching on)

- (grizzelbee) Fix: [#281](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/281) Removed duplicate Sleeptimer field from config
- (grizzelbee) New: Enabled editing of field Sleeptimer 
- (grizzelbee) Fix: [#283](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/283) Late config of fields
- (grizzelbee) Fix: Mapping text values in fields Sleeptimer & fanspeed to numerical values

### 3.1.9 (2024-05-13) (Marching on)

- (arcticon)   Fix: [#278](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/278) Changeable fields are working again.

### 3.1.8 (2024-05-10) (Marching on)

- (arcticon)   Upd: Dependencies got updated
- (grizzelbee) Chg: code refactoring  
- (arcticon)   Chg: code refactoring  
- (arcticon)   Chg: [#273](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/273) Performance improvements
- (arcticon)   Chg: [#274](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/274) Update of outdated certificate

### 3.1.7 (2024-04-24) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Fix: [#266](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/266) HeatingMode switch is now working correctly

### 3.1.6 (2024-04-24) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Fix: [#266](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/266) HeatingMode switch is now working correctly

### 3.1.5 (2024-04-16) (Marching on)

- (grizzelbee) Fix: Requesting at least admin v6.13.16 as dependency

### 3.1.4 (2024-03-22) (Marching on)

- (grizzelbee) Fix: Lamps (Product type 552) won't generate a warning on startup anymore but show an info that they are not supported by this adapter.

### 3.1.3 (2024-02-28) (Marching on)

- (grizzelbee) Fix: 2FA Process is working again - truely

### 3.1.2 (2024-02-26) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Fix: 2FA Process is working again
- (grizzelbee) New: At least Node.js V18.2.0 is required

### 3.1.1 (2024-02-01) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Fix: [#244](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/244) Fixed PM2.5, PM10, VOC Values to be compliant to the dyson App
- (grizzelbee) Fix: [#113](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/113) Fixed NO2 Values to be compliant to the dyson App
- (grizzelbee) Fix: [#244](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/244) Fixed PM2.5, PM10, VOC Indexes
- (grizzelbee) New: Changed admin user interface to jsonConfig
- (grizzelbee) Upd: Code cleanup

### 3.0.0 (2024-01-11) (Marching on)

- (grizzelbee) Upd: dependencies got updated
- (grizzelbee) Upd: updated year of copyright in license
- (grizzelbee) New: [#244](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/244) Added HCHO-Index
- (grizzelbee) Chg: BREAKING CHANGES:
  - Replaced values in field pm25 with values from pm25r and calculating them accordingly to the dyson App
  - Replaced values in field pm10 with values from pm10r and calculating them accordingly to the dyson App
  - [#244](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/244) Replaced values in field hcho with values from hchr and calculating them accordingly to the dyson App
  - Fields pm25r and pm10r are now deprecated and will be removed

### 2.5.9 (2023-08-21) (Halo of the dark)

- (grizzelbee) Fix: Updated year in license- and readme file to make adapter checker happy

### 2.5.8 (2023-08-09) (Halo of the dark)

- (grizzelbee) Fix: Fixed calculation of hmax temperatures for heater models.

### 2.5.7 (2022-12-06) (Halo of the dark)

- (grizzelbee) New: Added support for Dyson Pure Humidify+Cool Formaldehyde (PH04, ProductType 358K)
- (grizzelbee) Upd: Upgraded axios to 1.2.1

### 2.5.6 (2022-11-28) (Halo of the dark)

- (grizzelbee) Fix: [#213](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/213) Fixed warning due to wrong data type on field FILTER_REPLACEMENT

### 2.5.4 (2022-11-27) (Halo of the dark)

- (grizzelbee) Upd: [#207](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/207) Downgraded axios to 0.27.2 due to an error in version 1.x returning data as binary instead of string.

### 2.5.3 (2022-11-26) (Halo of the dark)

- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Chg: [#207](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/207) better and easier detection of supported devices

### 2.5.2 (2022-11-17) (Halo of the dark)

- (grizzelbee) Upd: Dependencies got updated
- (grizzelbee) Chg: Moved log message "requesting new state of device" from info to debug
- (grizzelbee) New: Added Dyson Pure Hot+Cool Formaldehyde (Type 527K) to device list.
- (grizzelbee) New: Added Dyson Pure Cool Tower Formaldehyde (Type 438K) to device list.

### 2.5.1 (2022-03-23) (Halo of the dark)

- (grizzelbee) Fix: Improved layout of config page and added tooltips to the checkboxes

### 2.5.0 (2022-03-22) (Halo of the dark)

- (grizzelbee) New: [#185](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/185) Added config option to disable logging of reconnect events

### 2.4.1 (2022-03-20) (Echo from the past)

- (grizzelbee) New: Changed SystemState from text to boolean data points

### 2.4.0 (2022-03-17) (Echo from the past)

- (grizzelbee) New: Added warning code to device tree
- (grizzelbee) New: Added Device-faults as SystemState to device tree
- (grizzelbee) New: Added donate button to readme and config page
- (grizzelbee) Upd: Switched "Sending data to device" message from loglevel info to debug
- (grizzelbee) Upd: reduced amount of debug messages
- (grizzelbee) Upd: Updated dependencies

### 2.3.2 (2022-03-04) (Fairytale of doom)

- (grizzelbee) Fix: Fixed: Sentry-Error: [DYSONAIRPURIFIER-D](https://sentry.io/organizations/grizzelbee/issues/3021418514)
- (grizzelbee) Upd: Updated dependencies

### 2.3.1 (2022-01-14) (Fairytale of doom)

- (grizzelbee) Upd: Updated dependencies
- (grizzelbee) Upd: Updated documentation

### 2.3.0 (2021-12-02) (Fairytale of doom)

- (grizzelbee) New: Added some GUI elements for air quality in folder icons
- (grizzelbee) New: Added support for HEPA PTFE filters
- (grizzelbee) New: Added support for Combined PTFE filters
- (grizzelbee) Chg: Fanspeed is now a number (not string anymore) to work properly with IoT-Adapter. Please delete this data point and let get recreated.

### 2.2.0 (2021-11-07) (Welcome to my wasteland)

- (grizzelbee) New: [#154](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/154) Added support for dyson Humidify+Cool PH03/358E.

### 2.1.4 (2021-10-20) (Running to the edge)

- (grizzelbee) New: [#152](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/152) Added token-indicator to config page in admin to show whether a token has already been received and saved or not.

### 2.1.3 (2021-10-17) (Running to the edge)

- (grizzelbee) Fix: [#148](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/148) Hostaddress is used properly when given.
- (grizzelbee) Fix: [#149](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/149) OscillationAngle "Breeze" is working now
- (grizzelbee) Fix: [#150](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/150) Strange delay and jumping of boolean switches is fixed

### 2.1.2 (2021-10-07) (Running to the edge)

- (grizzelbee) New: Removed NO2 from general AirQuality to be more compliant to dyson-app
- (grizzelbee) Upd: Code cleanup
- (grizzelbee) Upd: Removed delay between sending a command and new values getting displayed (max 30 Secs)

### 2.1.1 (2021-10-05) (Running to the edge)

- (grizzelbee) New: Added some more data points
- (grizzelbee) New: Added switch for temperature unit of the fan display
- (grizzelbee) New: Improved logging of unknown data points
- (germanBluefox) Fix: Fixed icon links
- (grizzelbee) Fix: fixed dependencies badge
- (grizzelbee) Fix: added missing dependency plugin-sentry
- (grizzelbee) Fix: Setting HumidificationTarget now works

### 2.0.1 (2021-10-04) (Lost in forever)

- (grizzelbee) Fix: Turning on HeatingMode should work now
- (grizzelbee) Fix: Sentry-error [DYSONAIRPURIFIER-7](https://sentry.io/organizations/nocompany-6j/issues/2690134161/?project=5735771) -> Cannot read property '3' of undefined
- (grizzelbee) Upd: Updated dependencies

### 2.0.0 (2021-09-26) (Lost in forever)

- (grizzelbee) New: Added DeepCleanCycle to known data points
- (grizzelbee) Fix: Switching water hardness now really works
- (grizzelbee) BREAKING CHANGES: Please recreate your object tree and test your scripts!
- (grizzelbee) Chg: All ON/OFF switches are now boolean types to be more compliant to ioBroker standards for VIS and other adapters. Please delete those data points and let them being recreated if necessary.
- (grizzelbee) Chg: All angles are numbers now
- (grizzelbee) Chg: All 2-way switches are boolean now
-

### V1.1.0 (2021-09-15) (Coming home)

- (grizzelbee) New: Added correct tier-level to io-package
- (grizzelbee) New: improved logging of unknown data points
- (grizzelbee) New: Added support for dyson Pure Hot+Cool Link (ProductType 455A)
- (grizzelbee) New: Added support for formaldehyde sensor
- (grizzelbee) New: oscillation angles can be set
- (grizzelbee) Upd: Improved OscillationAngle data point to display only the values supported by the current model
- (grizzelbee) Fix: removed info: undefined is not a valid state value for id "Hostaddress"

### V1.0.0 (2021-08-26) (Dim the spotlight)

- (grizzelbee) Fix: [#130](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/130) Fixed the newly introduced bug showing wrong values for temperatures
- (grizzelbee) Upd: Pushed to version 1.0.0
- (grizzelbee) Upd: Updated dependencies

### V0.9.5 (2021-08-23) (Marching on)

- (grizzelbee) Doc: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Documented workaround for 2FA 401 Issue in ReadMe
- (grizzelbee) Fix: [#128](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/128) Fixed saving of config data
- (grizzelbee) Fix: [#107](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/107) Fixed type error on temperatures
- (grizzelbee) Fix: fixed warnings on startup

### V0.9.4 (2021-08-20) ()

- (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Credentials won't get logged but shown in a popup in admin when failing 2FA process.
- (grizzelbee) New: Added adminUI tag to io-package
- (grizzelbee) New: Cleanup of io-package

### V0.9.3 (2021-08-19) (Paralyzed)

- (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Leading and trailing whitespaces will be removed from all config values when saving
- (grizzelbee) New: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Password will be logged in clear text in case of a http 401 (unauthorized) error during 2FA
- (grizzelbee) Chg: [#124](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/124) Removed general debug logging of 2FA login data

### V0.9.2 (2021-08-15) (Pearl in a world of dirt)

- (bvol) New: [#114](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/114) Added Switzerland to country selection in config , Thanks, @BVol, for his code!
- (grizzelbee) Fix: [#119](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/119) Updated dyson certificate to enable connection again. Thanks, @Krobipd, for helping with the link
- (grizzelbee) Upd: Updated dependencies

### V0.9.1 (2021-05-17) (Still breathing)

- (grizzelbee) New: [#105](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/105) TP02, HP02 and others supporting the fmod token are now able to switch from Off to Auto- and manual-mode

### V0.9.0 (2021-05-15) (Still breathing)

- (grizzelbee) New: Added ioBroker sentry plugin to report errors automatically
- (grizzelbee) New: Added support for Dyson Pure Cool TP07 (438E)
- (grizzelbee) New: Added support for Dyson 2-factor login method
- (grizzelbee) New: Added "keep Sensorvalues" to config to prevent destroying old values when continuous monitoring is off and fan is switched off (TP02)
- (grizzelbee) Fix: FilterLife should now be correctly in hours and percent in two separate data fields for fans supporting this (e.g. TP02)

### V0.8.2 (2021-04-09) (Still breathing)

- (grizzelbee) Fix: [#80](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/80) fixed npm install hint in documentation
- (grizzelbee) Fix: [#82](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/82) fixed common.dataSource type with type >poll<
- (grizzelbee) Fix: [#95](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/95) Added support for dyson Hot+Cool Formaldehyde (527E)
- (grizzelbee) Fix: [#94](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/94) Fixed dustIndex

### V0.8.1 (2021-02-19) (Fall into the flames)

- (grizzelbee) New: added icons to each fan type in device tree
- (grizzelbee) New: Showing Filter type correctly - not as code anymore
- (grizzelbee) Upd: updated dependencies

### V0.8.0 (2021-02-18) (Beyond the mirror)

- (grizzelbee) New: Log as info if account is active on login; else log as warning.
- (grizzelbee) New: [#21](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/21) Improvement for humidifier support
- (grizzelbee) Fix: [#67](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/67) Adapter sometimes wrote objects instead of values.

### V0.7.5 (2021-02-12) (I won't surrender)

- (grizzelbee) Fix: [#65](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/65) Adapter get online again after changes to dyson cloud API login procedure.
- (grizzelbee) New: Adapter reconnects with new host address when it gets changed manually

### V0.7.4 (2021-02-10) (Human)

- (grizzelbee) Fix: fixed adapter traffic light for info.connection
- (grizzelbee) Fix: Minor fixes

### V0.7.3 (2021-02-10) (When angels fall)

- (theimo1221) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) added default country
- (theimo1221) New: added function to mask password to dyson-utils.js
- (grizzelbee) New: extended config test and error logging
- (grizzelbee) New: added password to protectedNative in io-package.json
- (grizzelbee) Fix: fixed showing password in config (leftover from testing/fixing)
- (grizzelbee) Fix: fixed detection of needed js-controller features
- (grizzelbee) Fix: fixed detection if IP is given or not
- (grizzelbee) Upd: creating all data points with await

### V0.7.2 (2021-02-10) (Songs of love and death)

- (grizzelbee) Fix: [#59](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/59) Fixed bug while loading/saving config which led to wrong values displayed for country and temperature unit
- (grizzelbee) Upd: switched "Skipping unknown ..." message from info to debug

### V0.7.1 (2021-02-06) (Horizons)

- (grizzelbee) New: When no host address is given - adapter tries to connect via default hostname of the device
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) Filterlifetime is now correctly displayed in hours and percent for devices supporting this
- (grizzelbee) Fix: [#48](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/48) Fixed countrycodes for UK and USA
- (grizzelbee) Fix: [#52](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/52) Fixed VOCIndex
- (grizzelbee) Fix: Removed option to control Fan state since it corresponds to the state of the fan in auto-mode. Controlling it is senseless.
- (grizzelbee) Fix: Fixed await...then antipattern.
- (grizzelbee) Fix: Fixed undefined roles
- (grizzelbee) Fix: Fixed some bad promises and moved code to dysonUtils
- (grizzelbee) Fix: Fixed encrypting password using js-controller 3.0 build-in routine
- (grizzelbee) Upd: Added topic "Controlling your device(s)" to readme
- (grizzelbee) Upd: Removed unnecessary saving of MQTT password
- (grizzelbee) Upd: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) Added some more dyson codes for heaters and humidifiers

### V0.7.0 (2021-01-08) (Afraid of the dark)

- (jpwenzel) New: Removing crypto from package dependency list (using Node.js provided version)
- (jpwenzel) New: Introducing unit tests
- (jpwenzel) New: At least Node.js 10.0.0 is required
- (grizzelbee) New: [#23](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/23) - Introduced new data field AirQuality which represents the worst value of all present indexes.
- (grizzelbee) New: BREAKING CHANGE! - switched over to the adapter-prototype build-in password encryption. Therefore, you'll need to enter your password again in config.
- (grizzelbee) New: At least js-controller 3.0.0 is required
- (grizzelbee) New: At least admin 4.0.9 is required
- (jpwenzel) Fix: General overhaul of readme
- (jpwenzel) Fix: Code refactoring
- (grizzelbee) Fix: fixed some datafield names - please delete the whole device folder and get them newly created.
- (grizzelbee) Fix: [#18](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/18) - Fixed creating the indexes when there is no according sensor
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Displaying Filter life value in hours again
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Creating additional Filter life value in percent
- (grizzelbee) Fix: removed materializeTab from ioPackage
- (grizzelbee) Fix: calling setState now as callback in createOrExtendObject
- (grizzelbee) Fix: Removed non-compliant values for ROLE
- (grizzelbee) Fix: calling setState in callback of set/createObject now
- (grizzelbee) Fix: ensuring to clear all timeouts in onUnload-function

### V0.6.0 (2020-10-29) (Rage before the storm)

- (grizzelbee) New: [#17](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/17) - Added online-indicator for each device
- (grizzelbee) New: [#19](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/19) - Extended Password length from 15 characters to 32
- (grizzelbee) New: [#20](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/20) - Improved error handling on http communication with Dyson API
- (grizzelbee) Fix: Fixed typo within data field anchorpoint - please delete the old ancorpoint manually.
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours

### V0.5.1 (2020-10-27) (Heart of the hurricane)

- (grizzelbee) Fix: Added missing clearTimeout

### V0.5.0 (2020-10-27) (Heart of the hurricane)

- (grizzelbee) New: Editable data fields have now appropriate value lists
- (grizzelbee) New: Added more country codes
- (grizzelbee) New: Target temperature of heater can now be set - **in the configured unit!**
- (grizzelbee) Fix: [#13](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/13) - Filter life value is now displayed in percent not in hours
- (grizzelbee) Fix: [#6](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/6) - Changing the fanspeed does now fully work.

### V0.4.1 (2020-10-16) (unbroken)

- (grizzelbee) New: [#8](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/8) - Documented ProductTypes for better overview and user experience in ReadMe
- (grizzelbee) New: [#9](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/9) - Added some Hot&Cool specific datafields
- (grizzelbee) New: Logging of from devices, when shutting down the adapter
- (grizzelbee) New: [#10](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/10) - Polling device data every X (configurable) seconds for new data, hence sensors don't send updates on changing values
- (grizzelbee) New: [#11](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/11) - Added Austria and France to Country-List
- (grizzelbee) Fix: Fixed bug in error handling when login to Dyson API fails
- (grizzelbee) Fix: [#12](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/issues/12) - Fixed Dyson API login by completely securing via HTTPS.
- (grizzelbee) Fix: Updated some descriptions in config

### V0.4.0 (2020-09-29)

- (grizzelbee) New: devices are now **controllable**
- (grizzelbee) New: state-change-messages are processed correctly now
- (grizzelbee) Fix: Added missing °-Sign to temperature unit
- (grizzelbee) Fix: Terminating adapter when starting with missing Dyson credentials
- (grizzelbee) Fix: NO2 and VOC Indices should work now
- (grizzelbee) Fix: Fixed build errors

### V0.3.0 (2020-09-27) - first version worth giving it a try

- (grizzelbee) New: Messages received via Web-API and MQTT getting processed
- (grizzelbee) New: datapoints getting created and populated
- (grizzelbee) New: Added config item for desired temperature unit (Kelvin, Fahrenheit, Celsius)
- (grizzelbee) New: Added missing product names to product numbers
- (grizzelbee) New: Hostaddress/IP is editable / configurable
- (grizzelbee) New: calculate quality indexes for PM2.5, PM10, VOC and NO2 according to Dyson App

### V0.2.0 (2020-09-22) - not working! Do not install/use

- (grizzelbee) New: Login to Dyson API works
- (grizzelbee) New: Login to Dyson AirPurifier (2018 Dyson Pure Cool Tower [TP04]) works
- (grizzelbee) New: mqtt-Login to [TP04] works
- (grizzelbee) New: mqtt-request from [TP04] works
- (grizzelbee) New: mqtt-request to [TP04] is responding

### V0.1.0 (2020-09-04) - not working! Do not install/use

- (grizzelbee) first development body (non-functional)

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

Copyright (c) 2025 Hanjo Hingsen <open-source@hingsen.de>