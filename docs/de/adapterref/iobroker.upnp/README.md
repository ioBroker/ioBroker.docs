---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.upnp/README.md
title: ioBroker.upnp
hash: qKl3jUBUbIAfp2+IKp9xFSeH5ZAUfTIlwtHbPgiTM3s=
---
![Logo](../../../en/adapterref/iobroker.upnp/admin/upnp-discovery.png)

![Anzahl der Installationen](http://iobroker.live/badges/upnp-stable.svg)
![Logo](http://img.shields.io/npm/v/iobroker.upnp.svg)
![Bild](https://travis-ci.org/Jey-Cee/ioBroker.upnp.svg?branch=master)

# IoBroker.upnp
1. [Deutsch](#german_description)
	 * [Was ist UPnP?](#was-ist-upnp)
	 * [Funktionsbeschreibung](#funktionsbeschreibung)
	 * [Objektstruktur](#objektstruktur)
	 * [Allgemeine Objekte](#allgemeine-objekte)
	 * [Upnp Objekte](#upnp-objekte)
* [Steuerung](#steuerung)
	 * [Geräte/Dienst Spezifische Besonderheiten](#gerätedienst-spezifische-besonderheiten)

2. [Englisch](#english_description)
* [Was ist UPnP?](#was-ist-upnp)
* [Funktionsbeschreibung](#funktionsbeschreibung)
* [Objektstruktur](#Objektstruktur)
* [Allgemeine Objekte](#general-objects)
* [Upnp-Objekte](#Objektstruktur)
* [Strg](#Strg)
* [Geräte-/Dienstspezifische Funktionen](#devicesservice-specific-features)

3. [Änderungsprotokoll](#changelog)

## Deutsche Beschreibung
### Verwendungszweck
Dient der Kommunikation und Interaktion mit allen UPnP-ähnlichen Geräten.

#### Was ist UPnP?
UPnP = Universelles Plug-and-Play. Ist der Versuch eine Standardisierung der Kommunikation zwischen Geräten im Netzwerk herzustellen.
Dazu gibt es sogenannte „Schemas“, diese werden in Form einer xml-Datei dargestellt. Sie enthalten alle Informationen über das Gerät oder die Software und deren Dienste, die sie bereit stellen. Damit diese Dienste auch Nutzbar sind, wird auch eine Beschreibung zu jedem Dienst mitgeliefert. Diese Beschreibung folgt dem für den Dienst festgelegten Schema, dadurch können schnell Informationen und Befehle ausgetauscht werden, ohne dass es nötig ist, zu wissen, welches Modell oder von welchem Hersteller das Gerät oder die Software ist.  In der Vergangenheit wurde diese Standardisierung vor allem für Mediengeräte und Software genutzt. Seit einiger Zeit gibt es Bestrebungen auch die Kommunikation des „IoT – Internet of Things“ mit dieser Standardisierung zu vereinheitlichen.
Dazu wurde 2016 die „Open Connectivity Foundation“ gegründet, diese übernimmt die Aufgaben des UPnP-Forums, welches die Zertifizierung von UPnP-Fähigen Geräten durchgeführt und Standards erstellt hat.

#### Funktionsbeschreibung
Der Adapter führt beim ersten Start einen Broadcast durch und Wertet die Antworten aus. Die Antworten enthalten den Link zu den xml-Dateien der Dienste. Anhand der xml-Dateien werden die Objekte in ioBroker erzeugt und mit allen verfügbaren Informationen befüllt.

Zeitverzögert wird ein Dienst gestartet, der auf Nachrichten von Geräten/Diensten wartet, die sich an- oder abmelden. Neu erkannte Geräte/Dienste werden automatisch zu den vorhandenen hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät an und abonniert Statusmeldungen, damit ioBroker jede Änderung (die gesendet wird) des Gerätes/Dienstes automatisch mitgeteilt bekommt.

#### Objektstruktur
Jedes Gerät oder jede Software, die auf den Broadcast reagiert, wird als eigenständiges Objekt angelegt. Unterhalb dieses Objekts befinden sich alle bereitgestellten Dienste mit ihren Möglichkeiten. Die Möglichkeiten werden in 3 Kategorien (Rolle/role) eingeteilt: Indicator.state, action und argument.

**state –** ist eine Variable, die den aktuellen Zustand eines Objekts/Datenpunkts im Gerät/Dienst darstellt. Jeder Indicator.state hat einen bestimmten Typ wie number, string, boolean,…. Darüber hinaus ist auch genau festgelegt, welchen Wert oder Wertebereich der inidcator.state haben kann, diese Angaben sind im „native“ eines Objekts hinterlegt.
Bisher implementierte Native’s:

- sendEvents = Bedeutung bis jetzt Unbekannt.
-allowedValues = Strings die akzeptiert werden.
- Minimum = Gibt den günstigsten Zahlenwert an der akzeptiert wird.
- Maximum = Gibt den höchsten Zahlenwert an der akzeptiert wird.
- step = Gibt an, in welchen Schritten ein Wert verändert werden kann.

**Button –** „Anfrage“ ist ein Befehl, der an das Gerät/den Dienst geschickt werden kann und von diesem Aktzeptiert wird. Dieses Objekt hat im Regelfall ein Unterobjekt, das Argument.

**Argument –** ist ein Unterobjekt von einem Aktion-Channel. Der Typ ist „gemischt“, da er nicht vorgegeben wird. In den nativen Objekten finden sich verschiedene Informationen, sie können von Argument zu Argument anders sein.
Bisher bekannte Eingeborene:

- Direction = Gibt die Richtung an in der Informationsfluss statt findet.

„In“ bedeutet, dass kein Wert zurückgeliefert wird.
„Out“ bedeutet, dass ein Wert zurückgeliefert wird.

- relatedStateVariable = Gibt den Indicator.state an der für den Austausch der Daten

Zuständig ist.

- argumentNumber = Gibt an das wievielte Argument der Aktion es ist.

### Allgemeine Objekte
Die folgenden Objekte finden sich für jedes Gerät/jeden Dienst und werden zur Verwaltung benötigt. Sie sind nicht Bestandteil des UPnP-Standards oder der Geräte-/Dienstbeschreibung des jeweiligen Gerätes.

**Alive –** wird vom Gerät/Dienst auf „true“ gesetzt und vom Adapter nach x Sekunden auf „null“ gesetzt, wenn das Gerät/Dienst diesen nicht wieder auf „true“ setzt. Die Ablaufzeit hängt davon ab, welche maximale Lebensdauer vom Gerät für das Alive-Signal mitgeteilt wurde. Wenn sich ein Gerät abmeldet, wird der Status auf „false“ gesetzt. Es ist möglich, dieses Objekt von Hand oder per Skript auf „true“ zu setzen, das sollte jedoch nur gemacht werden, wenn man sicher ist, dass das Gerät/Dienst erreichbar ist. Wenn Alive manuell auf „true“ gesetzt wurde, sollte es auch manuell auf „false“ gesetzt werden, wenn nicht mehr nötig, da sonst Fehler auftreten können.

**Sid –** Dient als Identifikation der Subscription. Diese Sid wird jedes Mal vom Host generiert, wenn ein Abonnement von einem Client angefordert wird. Die Seite läuft nach einer vom Host definierten Zeit ab, daher wird sie immer wieder aktualisiert. Sie gelten nur für einen bestimmten Dienst.

**request –** sendet eine SOAP-Anfrage mit den gegebenen Optionen

### UPnP Objekte
Die hier auf gelisteten Objekte finden sich im UPnP-Standard und/oder den Geräte-/Dinestbeschreibungen. Es handelt sich hier nicht um eine vollständige Liste aller Objekte, diese Auswahl an Objekten stellt lediglich häufig vorkommende Objekte dar.

**(A_ARG_TYPE_)InstanceID –** Die InstanceID ist am häufigsten zu finden und wird zwingend benötigt, da sie die Instanz eines Dienstes angibt der angesprochen werden soll. In den meisten Fällen ist die InstanceID = 0. Diese ID wird bei jeder Event-Nachricht von einem Dienst und jedem Befehl der an einen Dienst gesendet wird, mit übergeben.

**(A_ARG_TYPE_)Channel(*) –** Das Channel Objekt findet sich im Zusammenhang mit Audio/Video Diensten. Ein Kanal muss zum Beispiel angegeben werden, wenn die Lautstärke verändert werden soll. Mögliche Werte können beispielsweise „Master“, „LF“ oder „RF“ sein. In diesem Beispiel steht „Master“ für die allgemeine Lautstärke, „LF“ für links vorne und „RF“ für rechts vorne. Wenn jetzt die Lautstärke nur vorne rechts verändert werden soll, gibt man „RF“ bei Channel an.

**(Set/Get)Volume(*) –** Das Volume Objekt findet sich im Zusammenhang mit Audio/Video Diensten. Je nachdem, was erwartet wird, wird es zum Anzeigen der Lautstärke genutzt oder zum Einstellen der Lautstärke. Dieses Objekt hat immer einen Mindestwert und einen Maximalwert, den man angeben kann, in den meisten Fällen liegt der Wertebereich zwischen 0 und 100. Die Schrittweite liegt normal bei 1, das heißt, es können nur glatte Zahlen angegeben werden.

### Steuerung
**Button –** „Anfrage“ Eine Aktion stellt einen Befehl dar, der an das Gerät/den Dienst geschickt werden kann. Zu jeder Aktion gehören auch Argumente, die zwingend angegeben werden müssen. Action’s erkennt den Menschen an ihrer Rolle/role, dort steht „action“. Beschreibt man die Aktion mit „send“ wird der Befehl an das Gerät/den Dienst gesendet.

**state.argument.x –** Muss unbedingt bei einer Aktion angegeben werden, wenn unter der Rolle „state.argument.in“ steht. Mögliche Werte die angegeben werden können/müssen findet man in der „Related State Variable“. Der Name dieser „Related State Variable“ ist im Objekt unter „native“ -> „relatedStateVariable“ hinterlegt.  Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, hierzu gibt es „native“ -> Argument_No. Ein Argument erkennt man an seiner Rolle/role, dort steht „argument“.  Manche Zeichenfolgen müssen mit einem „“ in den Datenpunkt geschrieben werden. Es kann nicht pauschal geantwortet werden, wann das der Fall ist, aber bei komplexen Strings wie zum Beispiel URL’s kann das der Fall sein. Hier hilft nur ausprobieren. Will man ein " in einem Argument übergeben muss man "&quot;" verwenden.

**(Related State) Variable –** Es handelt sich um Variablen, die für den Datenaustausch genutzt werden. In den Native‘s der Variablen finden sich verschiedene Informationen:

- erlaubtValues = gibt Auskunft über die möglichen Inhalte der Variable oder was als Argument mit einer Aktion gesendet werden kann.
- Minimum = der niedrigste Wert den die Variable enthalten kann oder als Argument mit einer Aktion gesendet werden kann.
- Maximum= der höchste Wert den die Variable enthalten kann oder als Argument mit einer Aktion gesendet werden kann.
- step = gibt an in welchen Schritten ein Wert angegeben wird.
- sendEvents = ? Mögliche Werte sind „yes“ oder „no“. Es ist aber völlig unklar, was das zu bedeuten hat. Die Annahme, dass die Werte für diese Variable nur dann von einem Gerät/Dienst automatisch gesendet werden, wenn „yes“ bei sendEvents steht, hat sich nicht bestätigt.

Beispiel, wie man die Werte pollen kann:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Es gibt auch die Möglichkeit, bei dem „request“ Objekt das Polling im Admin einzustellen. Dafür klickt man auf das Schraubenschlüssel-Symbol bei dem Objekt.

### Geräte/Dienst Spezifische Besonderheiten
**Sonos:** Für QPlay ist es nicht möglich, ein Abonnement zu erstellen. Möglicherweise ist hierfür eine Authentifizierung notwendig

**Phillips Hue Bridge 2:** Die Implementierung des UPnP-Standards in der Hue Bridge 2 ist Fehlerhaft, weshalb die Hue Bridge 2 zwar gefunden wird, jedoch nicht über UPnP ansprechbar ist.

**Yamaha:** Verwendet eine auf dem UPnP-Standard basierende API, die jedoch ein eigenes Datenformat verwendet. Derzeit wird das vom UPnP-Adapter nicht unterstützt.

**Sony:** Verwendet eine ScalarWebApi genannte Schnittstelle, die über UPnP ansprechbar ist, jedoch ein eigenes Datenformat verwendet. Derzeit wird das vom UPnP-Adapter nicht unterstützt.

**Amazon Kindle:** Stellt einen UPnP-Dienst bereit, jedoch wird keine UPnP-Dienstbeschreibung geliefert und kann daher nicht genutzt werden.

## Englische Beschreibung
***Übersetzung von https://www.deepl.com/translator***

### Verwendungszweck
Dient zur Kommunikation und Interaktion mit allen UPnP-fähigen Geräten.

#### Was ist UPnP?
UPnP = Universal Plug and Play. Der Versuch, die Kommunikation zwischen Geräten im Netzwerk zu standardisieren. Dazu gibt es sogenannte „Schemata“, die in Form einer xml-Datei dargestellt werden. Sie enthalten alle Informationen über das Gerät bzw. die Software und deren Dienste, die sie bereitstellen. Damit diese Dienste auch genutzt werden können, wird zu jedem Dienst eine Beschreibung bereitgestellt. Diese Beschreibung folgt dem für den Dienst festgelegten Schema und ermöglicht so einen schnellen Austausch von Informationen und Befehlen, ohne zu wissen, um welches Modell oder welchen Hersteller es sich bei dem Gerät bzw. der Software handelt. In der Vergangenheit wurde diese Standardisierung vor allem für Mediengeräte und Software verwendet. Seit einiger Zeit gibt es Bestrebungen, mit dieser Standardisierung auch die Kommunikation des „IoT – Internet of Things“ zu standardisieren. Zu diesem Zweck wurde 2016 die „Open Connectivity Foundation“ gegründet, die die Aufgaben des UPnP-Forums übernimmt, das die Zertifizierung UPnP-fähiger Geräte durchgeführt und Standards erstellt hat.

#### Funktionsbeschreibung
Der Adapter sendet und wertet die Antworten beim ersten Start aus. Die Antworten enthalten den Link zu den xml-Dateien der Dienste. Die xml-Dateien werden verwendet, um die Objekte im ioBroker zu erstellen und mit allen verfügbaren Informationen zu füllen.

Zeitversetzt wird ein Dienst gestartet, der auf Nachrichten von Geräten/Diensten wartet, die sich an- oder abmelden. Neu erkannte Geräte/Dienste werden automatisch zu den bestehenden hinzugefügt. Ein zweiter Dienst meldet sich bei jedem verfügbaren Gerät an und abonniert Statusmeldungen, so dass ioBroker automatisch über Änderungen am Gerät/Dienst informiert (gesendet) wird.

#### Objektstruktur
Jedes Gerät oder jede Software, die auf den Broadcast reagiert, wird als eigenes Objekt angelegt. Unterhalb dieses Objekts finden sich alle verfügbaren Dienste mit ihren Fähigkeiten. Die Möglichkeiten sind in 3 Kategorien (Rolle/Rolle) unterteilt: Indikator, Status, Aktion und Argument.

**state -** ist eine Variable, die den aktuellen Status eines Objekts/Datenpunkts im Gerät/Dienst darstellt. Jeder indicator.state hat einen bestimmten Typ wie Zahl, Zeichenfolge, Boolean, …. Außerdem wird auch genau angegeben, welchen Wert oder Wertebereich der indikator.state haben kann, diese Details werden im „nativen“ eines Objekts gespeichert. Bisher implementierte native s:

- sendEvents = Bedeutung bisher unbekannt.
– allowedValues = akzeptierte Zeichenfolgen.
- Minimum = Gibt den niedrigsten Wert an, bei dem der Wert akzeptiert wird.
- maximum = Gibt den höchsten Wert an, bei dem die Annahme erfolgt.
- step = Gibt an, in welchen Schritten ein Wert geändert werden kann.

**button -** "reuqest" ist ein Befehl, der an das Gerät/den Dienst gesendet und von diesem akzeptiert werden kann. Dieses Objekt hat normalerweise ein Unterobjekt, das Argument.

**Argument -** ist ein Unterobjekt einer Aktion. Der Typ ist „gemischt“, da er nicht angegeben ist. Die Natives des Objekts enthalten unterschiedliche Informationen, sie können von Argument zu Argument unterschiedlich sein. Bisher bekannte Natives:

- direction = Gibt an, in welche Richtung der Informationsfluss erfolgt. „In“ bedeutet, dass kein Wert zurückgegeben wird. „Out“ bedeutet, dass ein Wert zurückgegeben wird.
- relatedStateVariable = Gibt den Indikator bzw. den Status zurück, für den der Datenaustausch zuständig ist.
- argumentNumber = Gibt die Anzahl der Argumente der Aktion zurück.

### Allgemeine Objekte
Die folgenden Objekte sind bei jedem Gerät/Dienst vorhanden und werden für die Administration benötigt. Sie sind nicht Bestandteil des UPnP-Standards oder der Geräte-/Bedienungsanleitung des jeweiligen Gerätes.

**Alive -** wird vom Gerät/Dienst auf "true" gesetzt und vom Adapter nach x Sekunden auf "null" gesetzt, wenn das Gerät/der Dienst es nicht wieder auf "true" setzt. Die Ablaufzeit hängt von der maximalen Lebensdauer des vom Gerät gegebenen Alive-Signals ab. Wenn sich ein Gerät abmeldet, wird der Status auf "false" gesetzt. Es ist möglich, dieses Objekt manuell oder per Skript auf "true" zu setzen, dies sollte jedoch nur erfolgen, wenn Sie sicher sind, dass das Gerät/der Dienst erreichbar ist. Wenn Alive manuell auf "true" gesetzt wurde, sollte es auch manuell auf "false" gesetzt werden, wenn es nicht mehr notwendig ist, da sonst Fehler auftreten können.

**Sid -** Dient als Identifikation des Abonnements. Diese Seite wird vom Host jedes Mal erstellt, wenn ein Abonnement von einem Client angefordert wird. Die Sid läuft nach einer vom Host definierten Zeit ab, wird also immer wieder aktualisiert. Sie ist nur für einen bestimmten Dienst gültig.

### UPnP-Objekte
Die hier aufgelisteten Objekte finden sich im UPnP-Standard und/oder in den Geräte-/Dinest-Beschreibungen. Dies ist keine vollständige Liste aller Objekte, diese Auswahl an Objekten stellt nur häufig vorkommende Objekte dar.

**(A_ARG_TYPE_)InstanceID -** Die instanceID ist die gebräuchlichste und wird benötigt, da sie die anzusprechende Instanz eines Dienstes angibt. In den meisten Fällen ist die instanceID = 0. Diese ID wird mit jeder Ereignismeldung eines Dienstes und jedem Befehl, der an einen Dienst gesendet wird, übergeben.

**(A_ARG_TYPE_)Channel (*) -** Das Channel-Objekt ist mit Audio-/Video-Diensten verknüpft. Beispielsweise muss ein Channel angegeben werden, wenn man die Lautstärke ändern möchte. Mögliche Werte können beispielsweise „Master“, „LF“ oder „RF“ sein. In diesem Beispiel steht „Master“ für die allgemeine Lautstärke, „LF“ für links vorne und „RF“ für rechts vorne. Wenn man die Lautstärke nur auf der rechten Frontseite ändern möchte, muss man bei Channel „RF“ angeben.

**(Set/Get)Volume (*) -** Das Volume-Objekt ist mit Audio-/Videodiensten verknüpft. Je nachdem, wo es vorkommt, wird es zur Anzeige der Lautstärke oder zur Lautstärkeregelung verwendet. Dieses Objekt hat immer einen minimalen und einen maximalen Wert, die angegeben werden können, in den meisten Fällen liegt der Wertebereich zwischen 0 und 100. Die Schrittweite beträgt normalerweise 1, was bedeutet, dass nur gerade Zahlen eingegeben werden können.

### Kontrolle
**button -** Die Aktion "request" ist ein Befehl, der an das Gerät/den Dienst gesendet werden kann. Jede Aktion enthält auch Argumente, die als obligatorisch angegeben werden müssen. Aktionen erkennt man an ihrer Rolle/Rolle, die "action" lautet. Wenn man die Aktion mit "senden" beschreibt, wird der Befehl an das Gerät/den Dienst gesendet.

**state.argument.x -** Obligatorisch für eine Aktion, wenn Rolle "state.argument.in" ist. Mögliche Werte die angegeben werden können/müssen, findet man in der "Related State Variable". Der Name dieser "Related State Variable" ist im Objekt unter "native" -> "relatedStateVariable" hinterlegt. Die Argumente müssen in einer bestimmten Reihenfolge angegeben werden, dafür gibt es "native" -> Argument_No. Ein Argument erkennt man an seiner Rolle/Rolle, dort steht "Argument". Manche Strings müssen mit einem """" im Datenpunkt geschrieben werden. Diese Frage kann man nicht pauschal beantworten, bei komplexen Strings wie URL's kann das aber der Fall sein. Da hilft nur ausprobieren. Wenn man in einem Argument ein " übergeben will muss man """ verwenden.

**(Related State) Variable -** Dies sind Variablen, die für den Datenaustausch verwendet werden. Im Native der Variable gibt es einige Informationen:

- allowedValues = gibt Auskunft über den möglichen Inhalt der Variable bzw. was als Argument bei einer Aktion gesendet werden kann.
- Minimum = der niedrigste Wert, den die Variable enthalten oder als Argument mit einer Aktion gesendet werden kann.
- Maximum = der höchste Wert, den die Variable enthalten oder als Argument mit einer Aktion gesendet werden kann.
- Schritt = gibt an, in welchen Schritten ein Wert angegeben wird.
- sendEvents = ? Mögliche Werte sind "yes" oder "no". Es ist aber völlig unklar, was das bedeutet. Die Annahme, dass die Werte für diese Variable nur dann automatisch von einem Gerät/Dienst gesendet werden, wenn bei sendEvents "yes" eingestellt ist, hat sich nicht bestätigt.

Beispiel zum Abfragen der Werte:

```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

Sie können die Abfrage im Administrator über die Objektkonfiguration aktivieren.

### Geräte-/Dienstspezifische Funktionen
**Sonos:** Es ist nicht möglich, ein Abonnement für QPlay zu erstellen. Dies erfordert möglicherweise eine Authentifizierung.

**Phillips Hue Bridge 2:** Die Implementierung des UPnP-Standards in der Hue Bridge 2 ist fehlerhaft, weshalb die Hue Bridge 2 zwar gefunden, aber nicht über UPnP erreichbar ist.

**Yamaha:** Verwendet eine API, die auf dem UPnP-Standard basiert, aber ein eigenes Datenformat verwendet. Dies wird derzeit vom UPnP-Adapter nicht unterstützt.

**Sony:** Verwendet eine ScalarWebApi-Schnittstelle namens UPnP-adressierbar, verwendet aber ein eigenes Datenformat. Derzeit wird dies vom UPnP-Adapter nicht unterstützt.

**Amazon Kindle:** Bietet einen UPnP-Dienst, es liegt jedoch keine UPnP-Dienstbeschreibung vor und daher kann das Produkt nicht verwendet werden.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog

### 1.1.0 (2024-09-30)
* (Jey Cee) Migrate config to JSONConfig 
* (Jey Cee) Fix issues found by adapter checker
* (Jey Cee) Use default test and release action

### 1.0.21 (2022-02-27)
* small fixes

### 1.0.20 (2021-12-04)
* (foxriver76) ensure compatibility with future controller versions
__requires controller v3.3.0__

### 1.0.19 (2021-05-28)
* (bluefox) added support for Admin5

### 1.0.17 (2021-02-21)
* (jey-cee) fix warning messages with js-controller 3.2.x [Github issue #63](https://github.com/iobroker-community-adapters/ioBroker.upnp/issues/63)

### 1.0.16 (2020-04-27)
* (jey-cee) fixes for js-controller 3

### 1.0.15 (2019-08-27)
* (jey-cee) make control of devices work again (including player controls)

### 1.0.14 (2019-08-04)
* (bluefox) Tried to fix error with player

### 1.0.11 (2019-03-07)
* (bluefox) Invalid characters in XML will be replaced

### 1.0.7 (2019-03-01)
Breaking change: naming was changed and command to poll has another name - "request"
* (bluefox) refactoring
* (bluefox) scheduling per action configurable from admin

### 0.3.9
* fix auto discover

### 0.3.8
* (jey-cee) changes for object name's
* (jey-cee) fix for empty USN
* (jey-cee) added simple media player controls

### 0.3.7
* (jey-cee) fixed auto discover

### 0.3.6
*(jey-cee) fixed problem with settings

### 0.3.5
* (jey-cee) added option in settings for disable auto discover

### 0.3.4
* (jey-cee) added Travis-CI Tests

### 0.3.3
* (jey-cee) try to fix bug that cause to crash the adapter when sending actions
* (jey-cee) added unsubscribe on subscription error
* (jey-cee) added sync between Arguments and the related State Variable
* (jey-cee) fixed bug when sending an action and there comes no answer

### 0.3.2
* (jey-cee) updated version number from 0.2.4 to 0.3.2

### 0.3.0
* (jey-cee) added native Argument_No for object type argument
* (jey-cee) changed state update handling for event messages, fix for A_ARG_TYPE states
* (jey-cee) added possibility for controling UPnP devices

### 0.2.4
* (jey-cee) updated npm package node-upnp-subscriptions to resolve max handler problem
* (jey-cee) added support for 2nd stage deviceList
* (jey-cee) bugfix: iobroker stops while updating a lot of objects
* (jey-cee) added handling for initial messages from devices

### 0.2.3
* (jey-cee) fixed Dead message handler
* (jey-cee) added Subscription to service (only event message handling)
* (jey-cee) when adapter stops Alive state is set to false and sid(subscription id) is cleared

### 0.2.2
* (jey-cee) added listener for Alive/Dead messages from devices
* (jey-cee) if new devices joining the network they will added automatically
* (jey-cee) replace whitespace chars in device id's on creation, because objects and sub-object with whitespace chars wasn't usable

### 0.2.1
* (jey-cee) bug fixing: corrected creation of native's and smaller Bugs

### 0.2.0
* (jey-cee) getting all xml data from UPnP devices

### 0.1.0
* (jey-cee) initial release

## License
The MIT License (MIT)

Copyright (c) 2016-2024 Jey Cee <iobroker@all-smart.net>

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