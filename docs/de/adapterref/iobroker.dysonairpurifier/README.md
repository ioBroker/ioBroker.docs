---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.dysonairpurifier/README.md
title: ioBroker.dysonAirPurifier
hash: Mca/cLLWmPpc4Sm9zG2fFtgOlXM1fZ58FgrIX/P2enE=
---
# ioBroker.dysonAirPurifier

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/dysonairpurifier-installed.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.dysonairpurifier.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/dysonairpurifier-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Grizzelbee/ioBroker.dysonairpurifier/badge.svg)
![Test und Freigabe](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/Grizzelbee/ioBroker.dysonairpurifier/actions/workflows/codeQL.yml/badge.svg)
![NPM](https://nodei.co/npm/iobroker.dysonAirPurifier.svg?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.dysonairpurifier.svg)

![Logo](admin/dyson_logo.svg)![Logo](../../../en/adapterref/iobroker.dysonairpurifier/admin/dyson_pure_cool.jpg)

## ioBroker-Adapter für Dyson Luftreiniger und Ventilatoren

Dieser Adapter verbindet ioBroker mit verschiedenen Dyson-Luftreinigern. Das Lüftersymbol im Logo wurde von [Freepik](https://www.flaticon.com/de/autoren/freepik) ( [www.flaticon.com](https://www.flaticon.com/de/) ) erstellt.

> Wenn Ihnen dieser Adapter gefällt und Sie mich unterstützen möchten<br/> >[![Spenden Sie mit PayPal](admin/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=SPUDTXGNG2MYG)

### Unterstützte Geräte

- Dyson Pure Humidify+Cool (PH01, Produkttyp 358)
- Dyson Pure Humidify+Cool (PH03, Produkttyp 358E)
- Dyson Pure Humidify+Cool Formaldehyd (PH04, Produkttyp 358K)
- Dyson Pure Cool Tower, Modell 2018 (TP04, Produkttyp 438)
- Dyson Pure Cool Tower Formaldehyd, Modell 2018 (TP07, Produkttyp 438E)
- Dyson Pure Cool Tower Formaldehyd, Modell 2018 (TP07, Produkttyp 438K)
- Dyson Pure Hot+Cool Link (HP02, Produkttyp 455)
- Dyson Pure Hot+Cool Link Neu (Produkttyp 455A)
- Dyson Pure Cool Link Desk (DP01, Produkttyp 469)
- Dyson Pure Cool Link Tower (TP02, Produkttyp 475)
- Dyson Pure Cool Desk, Modell 2018 (DP04, Produkttyp 520)
- Dyson Pure Hot+Cool, Modell 2018 (HP04, Produkttyp 527)
- Dyson Pure Hot+Cool (HP07, Produkttyp 527E)
- Dyson Pure Hot+Cool Formaldehyd (HP09, Produkttyp 527K)
- Dyson Luftreiniger Big+Quiet Formaldehyd (BP03, Produkttyp 664)

## Merkmale

Verbindet Ihre Dyson Ventilatoren, Heizlüfter, Luftreiniger und Luftbefeuchter mit ioBroker.

- Liest Werte von Geräten und Sensoren aus
- Kann Geräte steuern, indem Ihnen die Möglichkeit gegeben wird, einige Werte zu ändern (Hauptleistung, Oszillation, Heizung, Lüftergeschwindigkeit, ...).
- Liest die Geräteliste von den Dyson-Servern.
- Kann eine _unbegrenzte_ Anzahl von Lüftern verwalten (die Anzahl wird jedoch durch die Ressourcen Ihres ioBroker-Hosts begrenzt).

## So funktioniert es

Beim Start fragt die Dyson Cloud alle bekannten, mit Ihrem Konto verbundenen Geräte und deren MQTT-Passwörter ab. Mit dieser Liste verbindet sich der Adapter lokal mit allen Geräten und kommuniziert mit ihnen.

- Die Verbindung zur Dyson Cloud wird nur benötigt, um die Liste der mit Ihrem Konto verbundenen Geräte und deren MQTT-Passwörter abzurufen.
- Neue Geräte werden daher nur beim Start des Adapters erkannt.
- Die Dyson-Cloud wird nur einmal während des Adapterstarts abgefragt.
- Dyson-Ventilatoren fungieren als MQTT-Server und der Adapter als Client.
- Die gesamte Kommunikation zwischen den Geräten und dem Adapter findet ausschließlich lokal statt.
- Sämtliche Verbindungsinformationen im Adapter werden beim Neustart verworfen und neu aufgebaut.

## Installation

### Voraussetzungen

- Dieser Adapter benötigt Node.js >= Version 18.2
- Mindestens js-Controller 3.0.0 wird benötigt.
- Mindestens Admin 6.0.0 ist erforderlich.
- Um diesen Adapter nutzen zu können, benötigen Sie ein Dyson-Konto.
- Vergessen Sie nicht, Ihren Fan zu Ihrem Konto hinzuzufügen. Entweder über die App oder online.

### Adapterinstallation

#### Verwendung von npm

Laufen`npm install iobroker.dysonairpurifier` Installieren Sie ioBroker, um die neueste Version dieses Adapters aus dem npm-Repository zu beziehen.

#### Alternative: Verwendung der GitHub-URL

Installieren Sie ioBroker über die Admin-Oberfläche, indem Sie auf die neueste stabile Version auf GitHub verweisen: <https://github.com/Grizzelbee/ioBroker.dysonairpurifier/tarball/master/>

Sie können auch ältere Release-Versionen mit diesen Methoden installieren (indem Sie auf ein Versions-Tag verweisen, z. B.`v0.6.0` anstatt`master` (in der URL), wobei die aktuellste Version in der Regel bevorzugt wird.

### Benötigte Konfigurationsdaten

- Dyson-Kontobenutzername
- Dyson-Kontopasswort (dieser Adapter kann Passwörter mit bis zu 32 Zeichen verarbeiten)
- Die IP-Adresse Ihrer Ventilatoren/Luftreiniger in Ihrem LAN (nicht in allen Fällen).

Benutzername und Passwort für Dyson sind allgemeine Konfigurationsdaten, die auf der Konfigurationsseite des Adapters eingegeben werden müssen. Die IP-Adresse hingegen wird in das entsprechende Feld eingetragen.`Hostname` im Gerätebaum auf dem`devices` Registerkartenseite.

#### So konfigurieren Sie den Adapter

> Beim ersten regulären Start dieses Adapters wird die Dyson-API nach allen Ihren Geräten abgefragt und alle unterstützten Geräte werden im Gerätebaum erstellt – mit ihren von der API bereitgestellten Basisinformationen und einem zusätzlichen Feld.`Hostaddress` Die
>
> Bitte führen Sie den Adapter einmal aus, dann werden Ihre Dyson-Geräte mit ihren Grundeinstellungen im Gerätebaum erstellt.
>
> Dann stoppen Sie den Adapter und geben Sie die IP-Adresse(n) in das entsprechende Feld ein.`Hostaddress` Aktualisieren Sie die Felder im Gerätebaum und starten Sie den Adapter neu. Danach sollten Ihre Dyson-Geräte im Gerätebaum mit Daten gefüllt sein.

_Bitte beachten Sie_ : Aufgrund einer nicht konformen mDNS-Implementierung durch Dyson müssen Sie _nach dem ersten Start_ die lokale IP-Adresse des Geräts angeben.

_Zusätzlicher Hinweis_ : Seit Version 0.7.1 versucht der Adapter, sich über den Hostnamen (Seriennummer) mit dem Gerät zu verbinden, sofern keine Hostadresse/IP-Adresse angegeben ist. Dies funktioniert unter zwei Voraussetzungen:

1. In Ihrem lokalen Netzwerk (LAN) läuft ein DNS-Server. Entweder ist dieser in Ihrem Router integriert (z. B. verfügen Fritz!Boxen über einen eigenen DNS-Server) oder es handelt sich um einen dedizierten Server.
2. Sie haben den Standardgerätenamen nicht geändert.
3. Der Gerätename ist korrekt seiner IP-Adresse zugeordnet (falls Sie Ihre DNS-Einstellungen manuell verwalten).

### Zwei-Faktor-Authentifizierung (seit Version 0.9.0)

Nach der Installation des Adapters sollte dieser automatisch starten. Falls nicht, starten Sie ihn bitte zuerst. Nach einem Update startet er ebenfalls automatisch neu. In beiden Fällen bleibt er im Status „Gelb“ und zeigt möglicherweise einige Fehler im Protokoll an – das ist vorerst in Ordnung.

- Öffnen Sie den Konfigurationsdialog des Adapters.
- Geben Sie mindestens Ihre E-Mail-Adresse, das Passwort und die Ländervorwahl an – der Rest ist optional.
- Klicken Sie auf die Schaltfläche „2FA-Code-E-Mail“, um den Vorgang zu starten.
- Sie erhalten automatisch eine „Challenge-ID“ im entsprechenden Feld, eine E-Mail und einen Dialog mit weiteren Anweisungen.
- Geben Sie den 6-stelligen Code aus der E-Mail in das Feld „Dyson Einmalpasswort“ ein.
- Klicken Sie auf die Schaltfläche „Fertigstellen“.
- Anschließend sollten Sie von Dyson ein Token erhalten haben (aus Sicherheitsgründen unsichtbar).
- Klicken Sie nach Abschluss der Einrichtung auf „Speichern & Schließen“ – der Adapter sollte neu starten und grün leuchten.

Alle Werte werden gespeichert und anschließend angezeigt.

> Normalerweise ist diese 2-FA nicht regelmäßig erforderlich – Sie können sie aber bei Bedarf wiederholen.

#### Falls bei der Zwei-Faktor-Authentifizierung der Fehlercode 401 auftritt, versuchen Sie bitte folgende Problemumgehung:

1. Melden Sie sich von Ihrer Dyson-Smartphone-App ab.
2. Warten Sie ein paar Minuten.
3. Geben Sie Ihre Anmeldedaten im Adapter ein (falls dies noch nicht geschehen ist) und folgen Sie dem 2FA-Verfahren bis zum Ende.
4. Der Adapter sollte starten und grün leuchten.
5. Warten Sie eine Weile (bis zu einer Stunde oder möglicherweise länger, da Dyson eine Sperre für zu viele Anfragen in kurzer Zeit hat).
6. Melden Sie sich wieder in Ihrer Dyson-Smartphone-App an, wenn Sie diese nutzen möchten.

## Steuerung Ihres/Ihrer Geräts/Geräte

Dieser Adapter kann derzeit die folgenden Zustände Ihrer Geräte steuern:

- Lüftermodus, Betriebsmodus des Geräts (Manuell, Automatisch, Aus)
- Lüftergeschwindigkeit, Aktuelle Lüftergeschwindigkeit
- Nachtmodus, Nachtmodus-Zustand
- Oszillation, Oszillation des Lüfters (Ein, Aus).
- Schwingung rechts, obere Grenze des Schwingungswinkels
- OszillationLinks , Oszillationswinkel Untere Grenze
- Schwingungswinkel , Schwingungswinkel
- ContinuousMonitoring, Kontinuierliche Überwachung von Umweltsensoren auch bei ausgeschaltetem Gerät.
- MainPower, Hauptstromversorgung des Lüfters.
- Automatikmodus, Lüfter ist im Automatikmodus.
- Luftstromrichtung, Richtung, in die der Ventilator bläst. EIN = Vorne; AUS = Hinten (auch Strahlfokus genannt)
- Jetfocus, Richtung, in die der Ventilator bläst. EIN = Vorne; AUS = Hinten (auch Jetfocus genannt)
- Heizmodus , Heizmodus \[EIN/AUS]
- HeatingTargetTemp , Zieltemperatur für die Heizung
- AirQualityTarget , Ziel-Luftqualität für den Automatikmodus.
- Befeuchtungsmodus, Ein/Aus
- HumidifyAutoMode , Auto / Aus
- Automatisches Befeuchtungsziel, Automatisches Befeuchtungsziel
- Befeuchtungsziel, Manuelles Befeuchtungsziel
- TemperatureUnit , Einheit zur Anzeige der Temperaturwerte (Lüfteranzeige).
- Wasserhärte: weich, mittel, hart

Die möglichen Werte für diese Zustände sind unten aufgeführt, soweit bekannt. Die Lüftergeschwindigkeit kann nur Werte von 1 bis 10 und „Auto“ annehmen. Um die Lüftergeschwindigkeit auf 0 zu reduzieren, muss das Gerät vom Stromnetz getrennt werden. Dies wird auch von der Dyson-App durchgeführt.

### SystemStates-Ordner (seit Version 2.4.0)

Die Geräte können Fehler melden. Diese Funktion wurde in Adapterversion 2.4.0 hinzugefügt. Aktuell liegen nur grobe Informationen zu den Fehlern vor, und die Datenpunkte variieren von Gerät zu Gerät. Sollten Sie genauere Informationen zu einem Fehler haben, zögern Sie bitte nicht, mir diese zu melden, um den Adapter zu verbessern. Alle Statusmeldungen geben an, ob ein Fehler vorliegt oder nicht.`True` bedeutet ein Scheitern`false` bedeutet „Kein Ausfall“.

### Umfrageintervall

- Ab Version 3.2.2 deaktiviert ein Abfrageintervall von 0 definitiv die Abfrage. Zuvor mag es aus mathematischen Gründen funktioniert haben – aber das ist nicht sicher und die Nebenwirkungen sind unbekannt. Es ist gut zu wissen, da die Geräte (zumindest meine) ihren Status normalerweise selbstständig senden, sobald er sich ändert. Durch die Verwendung dieser Einstellung wird der Netzwerkverkehr reduziert, da unnötige Abfragen vermieden werden.

### Bekannte Probleme

- Keine automatische IP-Erkennung von Geräten
- Es gibt immer noch viele unbekannte Gerätemeldungen (meist Fehler und Warnungen).
- Der Filter-Reset funktioniert nicht, da die korrekte MQTT-Nachricht unbekannt ist.
- Manchmal verliert der Adapter die MQTT-Verbindung zu einem Lüfter und kann diese nicht wiederherstellen.`This is usually no issue of the adapter itself, but an issue in your local network!`
  - In manchen Fällen genügt es, den Ventilator für etwa 10 Sekunden vom Stromnetz zu trennen, um ihn zurückzusetzen, und ihn dann wieder anzuschließen. Probieren Sie es einfach aus!
  - In anderen Fällen handelte es sich um ein IP-/DNS-Problem. Das Zurücksetzen des DHCP-/DNS-Servers (Routers) hat das Problem behoben.

## Erläuterung der Dyson-API-Daten (Nachrichtennutzlast)

Die Informationen wurden von <https://github.com/shadowwa/Dyson-MQTT2RRD/blob/master/README.md> kopiert und erweitert.

### AKTUELLER ZUSTAND

| Name        | Bedeutung                                                                     | mögliche Werte       | Einheit |
| ----------- | ----------------------------------------------------------------------------- | -------------------- | ------- |
| Modus-Grund | Der aktuelle Modus wurde über Fernbedienung, App oder Zeitplaner eingestellt. | PRC, LAPP, LSCH, PUI |         |
| Grund       |                                                                               | MODUS                |         |
| RSSI        | WLAN-Stärke                                                                   | -100 - 0             | dBm     |
| Kanal       | WLAN-Kanal                                                                    | 52                   |         |
| fqhp        |                                                                               | 96704                |         |
| fghp        |                                                                               | 70480                |         |

#### Produktzustand

\| Name | Bedeutung | Mögliche Werte | Einheit | | ---- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --- | | ercd | Letzter Fehlercode | KEINER oder einige Hexadezimalwerte | | | filf | Verbleibende Filterlebensdauer | 0000 - 4300 | Stunden | | fmod | Modus | LÜFTER, AUTO, AUS | | | fpwr | Hauptstromversorgung | EIN, AUS | | | fnst | Lüfterstatus | EIN, AUS, LÜFTER | | | fnsp | Lüfterdrehzahl | 0001 - 0010, AUTO | | | fdir | Lüfterrichtung (Jet-Fokus) / EIN=Vorne, AUS=Hinten | EIN, AUS | | | ffoc | Jet-Fokus | EIN, AUS | | | nmod | Nachtmodus | EIN, AUS | | | oson | Oszillation | EIN, AUS | | | osal | Untere Grenze des Oszillationswinkels | 0005 - 355 | ° (Grad) | | osau | Obere Grenze des Schwingwinkels | 0005 - 355 | ° (Grad) | | oscs | Schwingung aktiv | EIN, AUS, Leerlauf | | | ancp | Schwingwinkel | CUST, 0180 | ° (Grad) | | qtar | Zielwert für Luftqualität | 0001=Gut, 0002=Normal, 0003=Schlecht, 0004=Sehr schlecht | | | rhtm | Kontinuierliche Überwachung | EIN, AUS | | | auto | Automatikmodus | EIN, AUS | | | nmdv | Maximale Lüfterdrehzahl im Nachtmodus? | 0004 | | | cflr | Status Aktivkohlefilter | 0000 - 0100 | Prozent | | cflt | Aktivkohlefilter | CARF, KEINE | | | hflr | Status HEPA-Filter | 0000 - 0100 | Prozent | | hflt | HEPA-Filter | GHEP, GCOM | | | sltm | Sleeptimer | EIN, AUS | | | | hmod | Heizmodus \[EIN/AUS] | HEIZUNG | | | hmax | Zieltemperatur für Heizung | 0 .. 5000 | K | | hume | Befeuchtungsmodus | EIN, AUS, | | | haut | Automatischer Befeuchtungsmodus | AUTOMATISCHER BEFEUCHTUNGSMODUS EIN, AUTOMATISCHER BEFEUCHTUNGSMODUS AUS | | | humt | Befeuchtungsziel | AUS, DREISSIG, VIERZIG, FÜNFZIG, SECHZIG, SIEBZIG | | | cdrr | Verbleibende Reinigungsdauer | Ganzzahl | Minuten | | Rechteck | Automatisches Befeuchtungsziel | Ganzzahl | % | | cltr | Verbleibende Zeit bis zur nächsten Reinigung | Ganzzahl | Stunden | | wath | Wasserhärte | WEICH="2025", MITTEL="1350", HART="0675" | | | wacd | Warncode | KEINE... | | | rstf | Filterlebenszyklus zurücksetzen | 'RSTF', 'STET', RESET\_FILTER\_LIFE\_IGNORE, RESET\_FILTER\_LIFE\_ACTION | | | corf | Temperaturformat | EIN=Celsius, AUS=Fahrenheit | | | clcr | Tiefenreinigungszyklus | CLNO=inaktiv, CLAC=Tiefenreinigung läuft, CLCM=Abgeschlossen | | | hsta | Heizzustand | AKTIV/INAKTIV | | | msta | Befeuchtungszustand | Aktiv/Inaktiv AUS, FEUCHT | | | psta | \[HP0x] Unbekannt | INIT, CLNG, INV, AUS | | | bril | unbekannt | 0002 | LEVEL\_LOW, LEVEL\_MEDIUM, LEVEL\_HIGH | | fqhp | unbekannt | | | | Neigung | \[HP0x] Unbekannt | Zeichenkette | | | Wählscheibe | \[DP0x] Unbekannt | | |

| Fehlercodes | Bedeutung                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| KEINER      | Es ist kein Fehler aktiv                                                                                               |
| 57C2        | unbekannt                                                                                                              |
| 11E1        | Die Oszillation wurde deaktiviert. Bitte drücken Sie die Taste „Oszillation“ auf Ihrer Fernbedienung, um fortzufahren. |

#### Terminplaner

| Name | Bedeutung  | mögliche Werte | Einheit |
| ---- | ---------- | -------------- | ------- |
| DSTV | Sommerzeit | 0001...        |         |
| srsc | ?          | 7c68...        |         |
| tzid | Zeitzone?  | 0001...        |         |

### Umweltstromsensordaten

#### Daten

| Name | Bedeutung                         | mögliche Werte | Einheit |
| ---- | --------------------------------- | -------------- | ------- |
| Hakt | Luftfeuchtigkeit (%)              | 0000 - 0100    | Prozent |
| Pakt | Staub                             | 0000 - 0009    |         |
| sltm | Schlaftimer                       | AUS... 9999    | Minuten |
| Takt | Temperatur in Kelvin              | 0000 - 5000    | K       |
| Vakt | flüchtige organische Verbindungen | 0001 - 0009    |         |
| hcho | Formaldehyd (nicht verwendet)     |                |         |
| hchr | Formaldehyd                       |                |         |
| PM25 | PM2.5 (nicht verwendet)           | 0018           |         |
| pm10 | PM10 (nicht verwendet)            | 0011           |         |
| va10 | flüchtige organische Verbindungen | 0004           |         |
| noxl | NO2                               | 0000 - 0014    |         |
| p25r | PM2,5 Feinstaub                   | 0019           | µg/m³   |
| p10r | PM10 Feinstaub                    | 0018           | µg/m³   |

### UMWELT- UND NUTZUNGSDATEN

Redundante Werte?

#### Daten

\| Name | Bedeutung | Mögliche Werte | Einheit | | ----------- | ------------------------------------------------------------------------ | ------------------------------------------- | ----------- | --- | | pal0 - pal9 | Anzahl der Sekunden, die seit Stundenbeginn in diesem Staubniveau verbracht wurden | 0000 - 3600 | | | palm | scheint ein Medianwert von palX zu sein | | | | vol0 - vol9 | Anzahl der Sekunden, die seit Stundenbeginn in diesem VOC-Niveau verbracht wurden | 0000 - 3600 | | | volm | scheint ein Medianwert von volX zu sein | | | | aql0 - aql9 | Anzahl der Sekunden, die seit Stundenbeginn in diesem Luftqualitätsniveau verbracht wurden | max (pal, vol)) | 0000 - 3600 | | | aqlm | scheint ein Medianwert von aqlX zu sein | | | | fafs | scheint eine Anzahl der Sekunden zu sein, die in einem bestimmten Zeitraum verbracht wurden | 0000 - 3600 | | | faos | scheint die Anzahl der in einem bestimmten Zeitraum verbrachten Sekunden zu sein | 0000 - 3600 | | | fofs | scheint die Anzahl der in einem bestimmten Zeitraum verbrachten Sekunden zu sein | 0000 - 3600 | | | fons | scheint die Anzahl der in einem bestimmten Zeitraum verbrachten Sekunden zu sein | 0000 - 3600 | | | humm | Luftfeuchtigkeit (%) | 0000 - 0100 | | | tmpm | Temperatur in Kelvin | 0000 - 5000 | |

### sentry.io

Dieser Adapter nutzt sentry.io, um Details zu Abstürzen zu erfassen und diese automatisch an den Autor zu melden. Hierfür wird das Plugin [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) verwendet. Auf der [Homepage des Plugins](https://github.com/ioBroker/plugin-sentry) finden Sie detaillierte Informationen zu dessen Funktionsweise, den erfassten Daten und wie Sie die Erfassung deaktivieren können, falls Sie den Autor nicht mit Ihren Absturzinformationen unterstützen möchten.

## Rechtliche Hinweise

Dyson, pure cool, pure hot & cool und andere sind Marken oder eingetragene Marken der [Dyson Ltd.](https://www.dyson.com) Alle anderen Marken sind Eigentum ihrer jeweiligen Inhaber.

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