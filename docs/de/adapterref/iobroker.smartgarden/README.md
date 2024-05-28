---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartgarden/README.md
title: ioBroker.smartgarden
hash: NIFVjqdmC+X5w6lP0U8ZoBkFph1wZ215F5ygUTNzGGI=
---
![Logo](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

![Eingerichtet](http://iobroker.live/badges/smartgarden-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.smartgarden.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smartgarden.svg)
![Build-Status](https://travis-ci.org/jpgorganizer/ioBroker.smartgarden.svg?branch=master)
![Stabil](http://iobroker.live/badges/smartgarden-stable.svg)
![NPM](https://nodei.co/npm/iobroker.smartgarden.png?downloads=true)

# IoBroker.smartgarden
## IoBroker Smartgarden-Adapter für GARDENA Smart System
Ein Adapter für das GARDENA smart system mit offiziellem [GARDENA smart system API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) und Service.

Der Adapter ermöglicht die Entwicklung einer Anwendung (z. B. mit VIS), die parallel zur offiziellen GARDENA-App verwendet werden kann. Der Adapter und seine zusätzlichen Funktionen beeinträchtigen keine der Grundfunktionen der GARDENA-App und umgekehrt.

Der Adapter ist kein vollständiger Ersatz für die GARDENA App, sondern eine Ergänzung, um die GARDENA Geräte in ein Smart Home mit ioBroker einzubinden.

Die wichtigsten Aktionen lassen sich mit dem Adapter durchführen. Zudem bietet er die Möglichkeit, eigene Ideen umzusetzen, die mit der GARDENA App nicht möglich sind.

## Unterstützte Geräte
- GARDENA smart SILENO Mähroboter
- GARDENA smart Irrigation Control
- GARDENA smart Pressure Pump
- GARDENA smart Water Control
- GARDENA smart Power Adapter
- GARDENA smart Sensor

Weitere Informationen zu den Geräten finden Sie unter [GARDENA Deutsche Website](https://www.gardena.com/de/produkte/smart/smartsystem/) und [hier auf Englisch](https://www.gardena.com/uk/products/smart/smart-system/).

## Anforderungen
Um diesen Adapter verwenden zu können, benötigen Sie Folgendes:

1. ein GARDENA smart system Konto
1. einen GARDENA Anwendungsschlüssel
1. ein GARDENA Anwendungsgeheimnis

Um diese Dinge zu erhalten, gehen Sie bitte zum Husqvarna Developer Portal unter [https://developer.husqvarnagroup.cloud/](https://developer.husqvarnagroup.cloud/).

Bitte registrieren oder anmelden, wenn Sie bereits ein Konto haben, und erstellen Sie eine neue Anwendung, um Ihren *Anwendungsschlüssel* und Ihr *Anwendungsgeheimnis* zu erhalten.

Aktuell sieht die Seite wie in den folgenden Screenshots aus.

---

![meine Anwendungen](../../../en/adapterref/iobroker.smartgarden/img/myapplications.png)

Drücken Sie die Schaltfläche **NEUE ANWENDUNG**

---

![Neue Anwendung erstellen](../../../en/adapterref/iobroker.smartgarden/img/createnewapplication.png)

Formular mit eigenen Daten bearbeiten. Aktuell wird das Feld *Umleitungs-URLs* nicht verwendet. Daher können Sie aktuell beliebige Werte eintragen.

Button **ERSTELLEN** drücken

---

![mysmartgardenapplikation](../../../en/adapterref/iobroker.smartgarden/img/mysmartgardenapplication.png)

Auf der nächsten Seite erhalten Sie den *Anwendungsschlüssel* und das *Anwendungsgeheimnis*.
Sie benötigen diese Werte für die Konfiguration Ihrer Adapterinstanz.
Und Sie müssen die APIs verbinden

- Authentifizierungs-API ***und***
- GARDENA smart system API.

Klicken Sie dazu auf die Schaltfläche **NEUE API VERBINDEN** und wählen Sie die erste API aus. Wiederholen Sie dies für die zweite API.

---

**Notiz:**

- Wenn Sie bereits einen Husqvarna Automower® Connect oder einen

GARDENA Smart System-Konto. Sie können sich mit diesem Konto anmelden und mit „Anwendung erstellen“ fortfahren, um den Anwendungsschlüssel und das Anwendungsgeheimnis zu erhalten.

	---

***Und mit ziemlicher Sicherheit hast Du auch ein Konto.*** *Bitte verwende dasselbe Konto wie für die GARDENA App, in dem auch Deine GARDENA Geräte registriert sind. Sonst erhältst Du keinen Zugriff auf Deine Geräte.*

	---

- Stellen Sie sicher, dass Sie die Anwendung mit den APIs verbunden haben
- Authentifizierungs-API ***und***
- GARDENA smart system API.

Und natürlich benötigen Sie eine laufende ioBroker-Installation (zumindest mit der Admin5-Benutzeroberfläche) und Sie sollten mindestens ein funktionierendes [GARDENA Smartgerät](#supported-devices) besitzen.

## Inhaltsverzeichnis
* [ioBroker Smartgarden-Adapter für GARDENA Smart System](#iobroker-smartgarden-adapter-for-gardena-smart-system)
* [Unterstützte Geräte](#supported-devices)
* [Anforderungen](#Anforderungen)
* [Inhaltsverzeichnis](#table-of-contents)
* [Installation](#installation)
* [Adapter einrichten](#setup-adapter)
* [Unterstützung erhalten](#getting-support)
* [Datenpunkte des Adapters](#data-points-of-the-adapter)
* [Allgemeines, was Sie über Datenpunkte wissen sollten](#general-things-to-know-about-data-points)
* [Für SERVICE_MOWER](#for-service_mower)
* [Für SERVICE_VALVE_SET](#for-service_valve_set)
* [Für SERVICE_VALVE](#für-service_valve)
* [Für SERVICE_POWER_SOCKET](#for-service_power_socket)
* [Für SERVICE_SENSOR](#for-service_sensor)
* [Für SERVICE_COMMON](#for-service_common)
* [Ratenbegrenzungen](#rate-limits)
* [Bewässerung während des Mähens nicht erlaubt](#Irrigation-not-allowed-while-mowing)
* [Was ist das Problem?](#was-ist-das-problem)
* [Was wird getan?](#was-wird-getan)
* [Grundlegendes Verhalten – WARNUNG](#basic-behaviour----warning)
* [Wünsche für Datenpunkte](#Wünsche-für-Datenpunkte)
* [Anmerkung](#Anmerkung)
* [Änderungsprotokoll](#changelog)
* [2.0.1](#201)
* [2.0.0](#200)
* [vorherige Versionen](#106)
* [Credits](#Credits)
* [Lizenz](#Lizenz)

## Installation
Adapter ist vorhanden

- bei npm: Installieren mit `npm install iobroker.smartgarden`
– bei GitHub unter https://github.com/jpgorganizer/ioBroker.smartgarden.

Eine Installationsbeschreibung von GitHub ist verfügbar [Hier](https://www.iobroker.net/docu/index-235.htm?page_id=5379&lang=de#3_Adapter_aus_eigener_URL_installieren).

## Adapter einrichten
1. Installieren Sie den Adapter
2. Erstellen Sie eine Instanz des Adapters
3. Instanzkonfiguration prüfen und vervollständigen

**Wenn Sie einen dieser Einstellungen ändern, starten Sie bitte Ihren Adapter neu.**

3.1 Anwendungsschlüssel und Anwendungsgeheimnis und/oder optional Benutzernamen und Passwort in der Hauptinstanzkonfiguration bearbeiten

| Parameter | Beschreibung |
      | - | - |
|***obligatorisch***||
| Anwendungsschlüssel | Anwendungsschlüssel (API-Schlüssel), z.B. unter [Anforderungen](#requirements) |
	  | entweder *Anwendungsgeheimnis*<br> oder *Benutzername und Passwort* \*) \*\*)||
| Anwendungsgeheimnis \*)| Anwendungsgeheimnis zB unter [Anforderungen](#requirements) - nur wenn *Benutzername* und *Passwort* leer sind (neu in v2.0.0)*|
| Anwendungsgeheimnis \*)| Anwendungsgeheimnis, zB unter [Anforderungen](#Anforderungen) - nur wenn *Benutzername* und *Passwort* leer sind (neu in v2.0.0)*|
|***nicht empfohlen***||
| Benutzername \*) \*\*)| Benutzername für GARDENA smart system - nur wenn *Anwendungsgeheimnis* leer ist|
| Passwort \*) \*\*)| zugehöriges Passwort - nur wenn *Benutzername* angegeben ist|

**ANMERKUNGEN:** \*)

- Ab Version v2.0.0 **ist das bevorzugte Anmeldeverfahren die Verwendung des *Anwendungsschlüssels* und

*Anwendungsgeheimnis***, da das bisherige Login-Verfahren mit *Benutzername* und *Passwort* von Gardena nicht mehr unterstützt wird, aber trotzdem bei vielen Benutzern noch funktioniert.
Aus diesem Grund ist es hier zwar noch verfügbar, im Fehlerfall gibt es dafür aber keinen Support mehr.
Es wird also empfohlen, *Anwendungsschlüssel* und *Anwendungsgeheimnis* zu verwenden!

- *Anwendungsschlüssel*, *Anwendungsgeheimnis* und *Passwort* werden verschlüsselt und gespeichert innerhalb

dem Adapter und werden lediglich zur Authentifizierung beim GARDENA Anwendungshost entschlüsselt.

   \*\*)

- Parameter wird abgekündigt und ist in einer zukünftigen Version möglicherweise nicht mehr verfügbar

3.2 Überprüfen Sie die Standardwerte verschiedener Einstellungen und schalten Sie Optionen in der Instanzkonfiguration ein/aus. Für die meisten Benutzer sind die Standardwerte in Ordnung.

| Parameter | Beschreibung |
      | - | - |
| Prognose | Prognose für Ladezeit und verbleibende Mäherzeit verwenden; prognostizierte Lade- und Mähzeit des Mähers ein-/ausschalten; Standard: aus; *(neu in v0.5.0)*|
| Zyklen | Anzahl der MOWER-Verlaufszyklen; Sie können jede beliebige Zahl ab 3 (Minimum) verwenden, aber 10 (Standard) scheint ein guter Wert zu sein; nur relevant, wenn die obige *„Prognose“* aktiviert ist; *(neu in v0.5.0)*|
| Bewässerungsprüfung| Prüfung verwenden, ob Bewässerung während des Mähens erlaubt ist; ein-/ausschalten; Standard: aus; *(neu in v0.6.0)*|
| Limit überwachen | Überwachung der Ratenlimits der Gardena Smart System API verwenden; ein-/ausschalten; Standard: aus; *(neu in v1.0.2)*|

3.3 Überprüfen Sie die Standardwerte der Systemeinstellungen und schalten Sie die Optionen in der Instanzkonfiguration ein/aus. **Die meisten Benutzer müssen auf dieser Registerkarte nichts ändern.**

| Parameter | Beschreibung |
      | - | - |
| Loglevel | Loglevel: 0 = keine Logeinträge, 1 = einige Logeinträge, 2 = einige weitere Logeinträge, 3 = alle Logeinträge; Standard: 0 – keine Logeinträge|
| Protokoll verschönern | Status-IDs im Protokoll kürzer machen; ein-/ausschalten; Standard: ein; *(neu in v1.0.5)*|
| Verbindungswiederholungsintervall | Intervall für den erneuten Verbindungsversuch mit Gardena Webservice im Fehlerfall (in Sekunden); Standard: 300, Minimum: 60; *(neu in v1.0.3)*|
| Ping-Intervall | Intervall für das Senden von Pings an den Gardena Webservice (in Sekunden); Standard: 150, Minimum: 1, Maximum: 300|
| Auth-Faktor | Faktor für die Gültigkeit des Authentifizierungstokens; Standard: 0,999 |
| Auth-URL| URL des Authentifizierungshosts; Standard: [https://api.authentication.husqvarnagroup.dev](https://api.authentication.husqvarnagroup.dev)|
| Basis-URL| Basis-URL des Webservice; Standard: [https://api.smart.gardena.dev](https://api.smart.gardena.dev)|

## Unterstützung erhalten
Um Hilfe zu erhalten, lesen Sie diese [README](README.md) und die [FAQ](FAQ.md) sorgfältig durch.
Wenn Sie weitere Unterstützung benötigen, treten Sie bitte den [ioBroker-Forumsthread](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system) bei.

## Datenpunkte des Adapters
Der Adapter ist für die Überwachung und Steuerung von GARDENA Smart System-Geräten konzipiert.
Dafür gibt es einen `LOCATION` und einen oder mehrere `DEVICE`.
Für jeden `DEVICE` gibt es

- eine `SERVICE_COMMON_<id>` und
– ein oder mehrere „SERVICE_<servicelink_type>_<id>“.

Dabei ist `<servicelink_type>` eine Typbeschreibung für das Gerät, z. B. MOWER oder VALVE, und `<id>` ist eine (codierte) GARDENA-Geräte-ID, die von der API verwendet wird.
Siehe Beschreibung für ServiceLink unter [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).

Die Steuerung/Überwachung der einzelnen Geräte ist über die in der folgenden Tabelle aufgeführten `SERVICE_<servicelink_type>` möglich. Die `SERVICE_COMMON` liefern allgemeine Informationen zum Gerät.

| Gerät | SERVICE_<Servicelink_Typ> |
  | - | - |
| smarter Mähroboter SILENO | SERVICE_MOWER und SERVICE_COMMON |
| intelligente Bewässerungssteuerung | SERVICE_VALVE_SET, SERVICE_VALVE und SERVICE_COMMON |
| intelligente Druckpumpe | SERVICE_VALVE und SERVICE_COMMON |
| intelligente Wassersteuerung | SERVICE_VALVE und SERVICE_COMMON |
| intelligentes Netzteil | SERVICE_POWER_SOCKET und SERVICE_COMMON |
| Smart-Sensor | SERVICE_SENSOR und SERVICE_COMMON |

Wenn Sie weitere Informationen zu den Datenpunkten benötigen, schauen Sie bitte unter [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger) nach.
Dort finden Sie eine Beschreibung für jeden Datenpunkt; außer für diejenigen, die als Datenpunkte des Adapters und nicht der GARDENA smart system API gekennzeichnet sind.

Der Adapter erstellt bei Auswahl der jeweiligen Features/Optionen eigene Datenpunkte. Diese Datenpunkte werden bei Abwahl des Features nicht automatisch gelöscht. Sollten Sie diese Datenpunkte nicht mehr benötigen, können Sie diese manuell löschen.

### Allgemeines zu Datenpunkten
Der Adapter verändert keine Werte, die von der GARDENA smart system API übermittelt werden.

Ab Version 1.0.0 wird lediglich der Typ der *Zeitstempel* und *Zahlen* überprüft.

| prüfen auf | Beschreibung |
| - | - |
| Zeitstempel | alle Zeitstempel werden in UTC angegeben; wenn ein empfangener Zeitstempel kein gültiger Zeitstempel ist, wird stattdessen `01 Jan 1970 00:00:00Z` (Unix-Zeit Null) verwendet. Wenn Sie also dieses Datum/diese Uhrzeit sehen, melden Sie es bitte. |
| Zahlen | Wenn eine Zahl keine gültige Zahl ist, wird stattdessen „-1“ verwendet. Wenn Sie diese Zahl sehen, melden Sie sie bitte. |

Anfragen zur Steuerung eines Gerätes sind erfolgreich, sobald der Befehl vom Smart Gateway akzeptiert wurde. Eine erfolgreiche Ausführung des Befehls auf dem Gerät selbst kann durch eine entsprechende Statusänderung beobachtet werden.
*Beispiel:* Das Senden eines Befehls zum Starten des VALVE-Dienstes einer Smart Water Control führt dazu, dass der Datenpunkt `activity_value` des Dienstes geändert wird, nachdem das Gerät den Befehl verarbeitet hat.

**Anmerkungen:**

- Anfragen zur Steuerung eines Geräts können nicht gesendet werden, wenn der Smartgarden-Adapter nicht

verbunden mit der GARDENA smart system API.

- Bitte überprüfen Sie, ob Sie den Wert für einen Befehl mit `ack=false` festgelegt haben. Siehe [Kapitel „Befehle und Status“ im Handbuch für Adapterentwickler](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#commands-and-statuses)

### Für SERVICE_MOWER
#### Kontrolle
Zur Steuerung des Gerätes verwenden Sie den Datenpunkt

- „activity_control_i“: Typ „Zeichenfolge“

*Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

Ändern Sie diesen Datenpunkt, um den Mäher zu starten.

- Um für eine bestimmte Zeit zu starten, setzen Sie den Wert auf die geplante Dauer in

Sekunden (bitte verwenden Sie Vielfache von 60; das Minimum ist 60); beachten Sie den Datentyp `string`

- für den automatischen Betrieb setzen Sie die Zeichenfolge `START_DONT_OVERRIDE`
- um den aktuellen Vorgang abzubrechen und zur Nutzung der Ladestation zurückzukehren

Zeichenfolge `PARK_UNTIL_NEXT_TASK`

- Um den aktuellen Vorgang abzubrechen, kehren Sie zur Ladestation zurück und ignorieren Sie

Zeitplan verwenden Zeichenfolge `PARK_UNTIL_FURTHER_NOTICE`

**Hinweis:** Der Mäher startet nur mit einem vollständig geladenen Akku.

#### Überwachung
Alle anderen Datenpunkte dienen lediglich zur Überwachung und Information.

Besondere Datenpunkte:

- `Aktivität_Mähen_i`

*Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

Dieser Datenpunkt zeigt zwei verschiedene Zustände des Mähers:

- `true`: Mähen oder
- „false“: mäht nicht.

Dieser Datenpunkt kann für weitere Aktionen verwendet werden, bei denen es wichtig ist zu wissen, ob sich der Mäher sicher auf dem Rasen befindet oder nicht.

Abhängig vom Wert des Datenpunkts `activity_value` wird dieser Datenpunkt gesetzt.
Weitere Einzelheiten finden Sie in der folgenden Tabelle.

| `activity_value` | `activity_mowing_i` |
|`OK_CHARGING` Der Mäher muss mähen, aber der unzureichende Ladestand hält ihn in der Ladestation. | false |
|`PARKED_TIMER` Der Mäher wird gemäß Timer geparkt und startet zur konfigurierten Zeit erneut. | false |
|`PARKED_PARK_SELECTED` Der Mäher ist bis auf Weiteres geparkt. | false |
|`PARKED_AUTOTIMER` Der Mäher überspringt das Mähen wegen unzureichender Grashöhe. | false |
|`PAUSED` Der Mäher befindet sich im Wartezustand mit geschlossener Luke. | false |
|`OK_CUTTING` Der Mäher mäht im AUTO-Modus (Zeitplan). | true |
|`OK_CUTTING_TIMER_OVERRIDDEN` Der Rasenmäher mäht außerhalb des Zeitplans. | true |
|`OK_SEARCHING` Der Mäher sucht nach der Ladestation. | true |
|`OK_LEAVING` Der Mäher verlässt die Ladestation. | true |
|`NONE` Es findet keine Aktivität statt, möglicherweise aufgrund eines Fehlers. | true |
|`NONE` Es findet keine Aktivität statt, möglicherweise aufgrund eines Fehlers. | true |
|alle anderen Werte | wahr |

- `batteryState_chargingTime_remain_i` *(unter SERVICE_COMMON...)* und<br/>

`activity_mowingTime_remain_i` *(unter SERVICE_MOWER...)*

*Beide Datenpunkte werden vom Adapter generiert und werden aufgrund der GARDENA smart system API nicht benötigt.*

Diese Datenpunkte zeigen eine Prognose der verbleibenden Lade- und Mähzeit des Mähers in Sekunden.
Sie werden nur erstellt, wenn die Funktion in der Instanzkonfiguration ausgewählt wird.

Zur Vorhersage eines Wertes wird ein Verlauf der letzten Lade- und Mähzyklen in zwei Zuständen gespeichert: `info.saveMowingHistory` und `info.saveChargingHistory`.

Diese Funktion kann in der Adapterinstanzkonfiguration zusammen mit der Anzahl der im Verlauf gespeicherten Lade- und Mähzyklen ein- und ausgeschaltet werden.

Um diese Funktion in Betrieb zu nehmen, **stellen Sie bitte sicher, dass mindestens ein Zyklus aus Mähen und Laden fehlerfrei abläuft (also nicht manuell oder sensorgesteuert unterbrochen wurde).** Besser ist es, wenn mindestens drei Durchläufe fehlerfrei durchlaufen werden.

Diese Funktion versucht den Normalfall zu erkennen und geht zunächst davon aus, dass es sich beim nächsten Vorgang um einen Normalfall handelt. Ist dieser fehlerhaft, dann wird dieser fehlerhafte Durchlauf als Normalfall angesehen und die dann normal durchlaufenden Durchläufe als Fehlerfall. Tritt während des Durchlaufs ein Fehler auf, stoppen Sie bitte den Adapter, löschen Sie die beiden Datenpunkte und starten Sie erneut.

Weitere Informationen zu allgemeinen Prognosemechanismen finden Sie unter [PROGNOSE.md](FORECAST.md).

  **Anmerkungen:**

1. Prognosewerte sind nur verfügbar, wenn mindestens ein vollständiger

Lade- und Mähzyklus werden im Verlauf gespeichert.

2. Der Verlauf wird unter „Info“ gespeichert, so dass bei Bedarf der „STANDORT“

gelöscht werden, zB bei einem zukünftigen Update gehen diese nicht verloren.

3. Wenn Sie Ihren Rasenmäher vom GARDENA smart system trennen und

Wenn Sie ihn erneut anschließen, geht der Verlauf verloren, da Ihr Mäher im GARDENA smart system eine neue ID erhält. Dies bedeutet, dass der Adapter den Mäher nicht als den vorherigen Mäher erkennen kann - möglicherweise handelt es sich um einen zweiten.
In diesem Fall wird empfohlen, diese beiden Datenpunkte zu löschen und den Adapter neu zu starten, damit die vorherigen (jetzt alten) Verlaufssätze nicht ständig gelesen und geschrieben werden. Der Adapter beginnt dann, einen neuen Verlauf aufzubauen.

4. Diese Funktion sollte für mehr als einen Mäher funktionieren, aber es ist

nicht getestet *(das kann ich nicht, weil ich nur einen Rasenmäher habe)*.
Wenn Sie mehr als einen Rasenmäher haben, testen Sie ihn bitte und melden Sie Fehler und natürlich auch, ob er wie vorgesehen funktioniert. Vielen Dank im Voraus dafür.

- `letzterFehlerCode_Wert`

Bitte achten Sie besonders auf den Datenpunkt `lastErrorCode_value`.
Eine Beschreibung der möglichen Werte finden Sie unter https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger, siehe „MowerService – lastErrorCode“

### Für SERVICE_VALVE_SET
#### Kontrolle
Zur Steuerung des Gerätes verwenden Sie den Datenpunkt

- `stop_all_valves_i`: Typ `Zeichenfolge`

*Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

Ändern Sie diesen Datenpunkt, um alle Ventile zu stoppen.

- Um alle Ventile sofort zu stoppen, verwenden Sie die Zeichenfolge „STOP_UNTIL_NEXT_TASK“.

**Hinweis:** Zeigen Sie den Wert dieses Datenpunkts nicht in Ihrer Anwendung an, da der Wert meist undefiniert ist. Darüber hinaus kann dieser Datenpunkt nicht als Auslöser für eigene Aktionen dienen, da er nach Auslösen des Befehls einfach auf den Wert *null* gesetzt wird.

#### Überwachung
Alle anderen Datenpunkte dienen lediglich zur Überwachung und Information.

### Für SERVICE_VALVE
#### Kontrolle
Zur Steuerung des Gerätes verwenden Sie den Datenpunkt

- „Dauerwert“: Typ „Zeichenfolge“

Ändern Sie diesen Datenpunkt, um das Ventil zu starten.

- Um für eine definierte Zeit zu starten, setzen Sie den Wert auf den Wert in Sekunden

(bitte verwenden Sie Vielfache von 60; das Minimum ist 60); berücksichtigen Sie den Datentyp `string`.

**Hinweis:** Es gibt einige Einschränkungen für die zulässigen Werte.
Bitte melden Sie sich, wenn Sie andere Einschränkungen feststellen.

| Gerät | Grenze |
    | - | - |
|GARDENA smart Irrigation Control| 5400 Sekunden (90 Minuten) |
|GARDENA smart Pump | 36000 (10 Stunden) |
|GARDENA smart Water Control | 36000 (10 Stunden) |

- Um die aktuelle Bewässerung abzubrechen und mit dem Zeitplan fortzufahren, verwenden Sie die Zeichenfolge

`STOP_UNTIL_NEXT_TASK`

- Um den automatischen Betrieb bis zu einer bestimmten Zeit zu überspringen, wird der aktuell aktive

Der Vorgang wird möglicherweise abgebrochen oder nicht (hängt vom Gerätemodell ab). Verwenden Sie die Zeichenfolge `PAUSE_<number_of_seconds>`, z. B. `PAUSE_86400`, um für 24 Stunden zu pausieren (verwenden Sie bitte ein Vielfaches von 60; das Minimum ist 60).

- Um den automatischen Betrieb wiederherzustellen, wenn er angehalten wurde, verwenden Sie die Zeichenfolge „UNPAUSE“.

- `irrigationWhileMowing_allowed_i` und `irrigationWhileMowing_mowerDefinition_i`

*Diese Datenpunkte werden vom Adapter generiert und werden aufgrund der GARDENA smart system API nicht benötigt.*

Diese Datenpunkte ermöglichen die Steuerung der Funktion *Bewässerung während des Mähens nicht erlaubt*.
Sie werden nur erstellt, wenn die Funktion in der Instanzkonfiguration ausgewählt ist.
Eine Beschreibung dieser Funktion finden Sie im Kapitel [Bewässerung während des Mähens nicht erlaubt](#Irrigation-not-allowed-while-mowing).

#### Überwachung
Alle anderen Datenpunkte dienen lediglich zur Überwachung und Information.

Besonderer Datenpunkt:

- `restliche_Dauer_i`

*Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

Der Wert beschreibt die Anzahl der Minuten bis das Ventil geschlossen wird und die Bewässerung stoppt.

– Eine Ganzzahl, eins („1“) oder mehr.
- „null“, wenn nicht definiert

### Für SERVICE_POWER_SOCKET
#### Kontrolle
Zur Steuerung des Gerätes verwenden Sie den Datenpunkt

- „Dauerwert“: Typ „Zeichenfolge“

Ändern Sie diesen Datenpunkt um die Steckdose zu starten.

- Um für eine definierte Zeit zu starten, setzen Sie den Wert auf den Wert in Sekunden

(bitte verwenden Sie Vielfache von 60; das Minimum ist 60); beachten Sie den Datentyp `string`

- Um das Gerät dauerhaft einzuschalten, verwenden Sie bitte die Zeichenfolge „START_OVERRIDE“.
– Um das Gerät zu stoppen, verwenden Sie „STOP_UNTIL_NEXT_TASK“.
- Um den automatischen Betrieb bis zur angegebenen Zeit zu überspringen. Der aktuell aktive Betrieb

wird NICHT abgebrochen. Verwenden Sie die Zeichenfolge `PAUSE_<number_of_seconds>`, z. B. `PAUSE_86400`, um für 24 Stunden zu pausieren (bitte verwenden Sie Vielfache von 60; das Minimum ist 60).

- Um den automatischen Betrieb wiederherzustellen, wenn er angehalten wurde, verwenden Sie die Zeichenfolge „UNPAUSE“.

#### Überwachung
Alle anderen Datenpunkte dienen lediglich zur Überwachung und Information.

Besonderer Datenpunkt:

- `restliche_Dauer_i`

*Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

Der Wert beschreibt die Anzahl der Minuten bis zur Abschaltung der Steckdose.

– Eine Ganzzahl, eins („1“) oder mehr.
- „null“, wenn nicht definiert

### Für SERVICE_SENSOR
#### Kontrolle
Keine Steuerfunktionen verfügbar.

#### Überwachung
Alle Datenpunkte dienen lediglich zur Überwachung und Information.

### Für SERVICE_COMMON
Der `SERVICE_COMMON` liefert allgemeine Informationen zum Gerät.
Die Beschreibung wird bei Bedarf in die Beschreibung anderer SERVICE_... integriert.

## Ratenbegrenzungen
Es gibt einige Beschränkungen, die Sie beachten sollten.
Bitte lesen Sie das Kapitel *Ratenbegrenzungen* in [*LIESMICH*](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/readme) der API-Beschreibung des GARDENA Smart Systems.

Damit Sie feststellen können, ob Sie diese Ratenbegrenzungen erreichen, können Sie die Überwachung in der Instanzkonfiguration mit dem Parameter *Überwachung von Ratenbegrenzungen* aktivieren.

Wenn Sie den Überwachungsstatus aktiviert haben, wird bei jeder Anfrage der Status `info.RateLimitCounter` aktualisiert.
Dieser Status speichert eine Datenstruktur mit der Anzahl der Anfragen pro Monat, Tag, Stunde und für die letzten 30 und 31 Tage.

Die Struktur ist in [JSON](https://en.wikipedia.org/wiki/JSON) und sieht aus wie

```
{
  "2020": {                          <<< year
    "2020-08": {                     <<< month
      "count": 21,                   <<< number of requests for month
      "2020-08-27": {                <<< day
        "11": {                      <<< hour
          "count": 3                 <<< number of requests for hour
        },
        "12": {                      <<< hour
          "count": 13                <<< number of requests for hour
        },
        "count": 16                  <<< number of requests for day
      },
      "2020-08-28": {                <<< day
        "14": {                      <<< hour
          "count": 5                 <<< number of requests for hour
        },
        "count": 5                   <<< number of requests for day
      }
    }
  },
     ...
  "last30days": {
    "count": 2021                    <<< number of requests in last 30 days
  },
  "last31days": {
    "count": 2098                    <<< number of requests in last 31 days
  }
}
```

**Notiz:**

- Diese Stunde ist die Zeitangabe in UTC
- Dass die tatsächliche Zahl der Anfragen höher sein kann. Insbesondere

sofern der jeweilige Zeitraum nicht vollständig durch die Überwachung abgedeckt ist.

- Dass diese Struktur sehr groß wird und nie vom

Adapter. Lösche ihn also bitte von Zeit zu Zeit manuell oder schalte das Monitoring ab – zumindest, wenn du keine Probleme mit den Rate Limits hast.

## Bewässerung während des Mähens nicht erlaubt
### Was ist das Problem?
Wenn Sie sowohl einen Rasenmäher als auch eine Bewässerungsanlage mit Versenkregnern besitzen, besteht die Gefahr, dass Ihr Rasenmäher bei laufender Bewässerung auf einen Versenkregner auffährt und diesen beschädigt oder selbst Schaden anrichtet.

Um dies zu verhindern, sollte die Bewässerungsanlage oder besser einzelne Ventile während des Mähbetriebs abgeschaltet werden.

### Was wird getan?
Mit dieser Funktion ist es möglich, die Bewässerung zu stoppen, wenn sich der Mäher auf dem Rasen befindet. Dies kann für jedes Ventil separat festgelegt werden.

Pro Ventil können ein oder mehrere Mähwerke definiert werden, bei denen das Ventil nicht geöffnet sein darf, während das Mähwerk mäht.
Grundsätzlich hat das Mähwerk Vorrang vor der Bewässerung, d.h. kommt es zum Konflikt, dass das Mähwerk mäht und ein Ventil geöffnet ist, wird das Ventil geschlossen und eine entsprechende Warnung gesetzt.

Zusätzlich kann definiert werden, dass ein Ventil unabhängig vom Mäher niemals geöffnet werden soll. Dies kann z.B. verwendet werden, wenn ein Ventil oder die dahinterliegende Leitung beschädigt ist.

Die gesamte Prüfung kann in der Instanzkonfiguration mit dem Parameter *Bewässerungsprüfung* ein- oder ausgeschaltet werden.

Für jeden `SERVICE_VALVE` stehen drei Datenpunkte zur Verfügung.
Sie werden zur Konfiguration und zur Meldung von Warnungen verwendet.

| Datenpunkt | beschreibbar | Beschreibung der Datenpunkte |
  | - | - | - |
|`irrigationWhileMowing_allowed_i` | ja |auf `false` setzen, wenn geprüft werden soll, ob eine Bewässerung zulässig ist, während der Rasenmäher mäht, andernfalls auf `true` |
|`irrigationWhileMowing_warningCode_i`| nein | Warncode wird gesetzt, wenn Ventil öffnet. Mögliche Warncodes siehe nächste Tabelle. Wenn mehr als eine Warnung gesetzt ist, werden die Codes mit `+` verkettet (z.B. `STOPPED+UNKNOWN_MOWER`).|
|`irrigationWhileMowing_warningCode_i`| nein | Warncode wird gesetzt, wenn Ventil öffnet. Mögliche Warncodes siehe nächste Tabelle. Wenn mehr als eine Warnung gesetzt ist, werden die Codes mit `+` verkettet (z.B. `STOPPED+UNKNOWN_MOWER`).|

* ***Mäher-ID-Format***

`smartgarden.0.LOCATION_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.DEVICE_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.SERVICE_MOWER_xxxxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxx`

Sie können diese Mäher-ID aus der Registerkarte „Objekte“ von ioBroker kopieren, siehe roter Pfeil im folgenden Bild.

    ![Mäher-ID](../../../en/adapterref/iobroker.smartgarden/img/mowerid_admin5.jpg)

* ***Warncodes***

| Warncode| Beschreibung|
  | - | - |
| `NO_WARNING` |keine Warnung, Ventil geöffnet |
| `STOPPED` |Ventil automatisch geschlossen, da Mäher mäht |
| `FORBIDDEN` |Ventil geschlossen, da Sondercode `IRRIGATION_FORBIDDEN` im Datenpunkt `irrigationWhileMowing_mowerDefinition_i` gesetzt ist|
| `FORBIDDEN` |Ventil geschlossen, da Sondercode `IRRIGATION_FORBIDDEN` im Datenpunkt `irrigationWhileMowing_mowerDefinition_i` gesetzt ist|

Diese Funktion wird immer ausgeführt, wenn

- ein Ventil geöffnet wird oder
- ein Rasenmäher beginnt zu mähen

Es wird nicht ausgeführt, wenn Sie die Werte in den oben aufgeführten Datenpunkten ändern.
Das bedeutet: Wenn eine Konfliktsituation vorliegt und Sie `irrigationWhileMowing_allowed_i` von `true` nach `false` ändern, wird der Konflikt nicht erkannt und der Konflikt bleibt bestehen. Dasselbe Verhalten gilt für eine Änderung von `irrigationWhileMowing_mowerDefinition_i`.

### Grundlegendes Verhalten -- WARNUNG
Diese Funktion kann nicht verhindern, dass sich ein Ventil öffnet, während der Rasenmäher mäht. Dies kann beispielsweise manuell über die GARDENA-App oder automatisch über einen Zeitplan erfolgen.

Diese Funktion kann das Ventil nur im Konfliktfall so schnell wie möglich schließen. Und ein Konflikt kann auch nicht erkannt werden.
Es kann also passieren, dass Wasser durchgelassen wird.
**Es kann z. B. nicht verhindert werden, dass die Versenkregner ausfahren und der Rasenmäher gegen die Versenkregner fährt**, aber die Wahrscheinlichkeit, dass dies passiert, wurde minimiert.
**Es liegt also an Ihrer Anwendung, dafür zu sorgen, dass dieser Konflikt nie auftritt.**

## Wünsche für Datenpunkte
Dieser Adapter meldet **jeden Wert** als Datenpunkt, der über die GARDENA smart system API bereitgestellt wird. Falls jemand weitere Werte wünscht, bitte GARDENA kontaktieren und mitteilen, dass dieser Wert auch in die API aufgenommen wird. Dazu bitte unter ***Kontakt & Feedback hinterlassen*** in der Fußzeile auf [GARDENA Developer Portal](https://developer.husqvarnagroup.cloud) gehen.

## Notiz
Dies ist ein privates Projekt. Ich stehe in keiner Verbindung mit GARDENA oder Husqvarna.

## Credits
Vielen Dank an GARDENA/Husqvarna für die Bereitstellung dieses [öffentliche API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) und besonderer Dank an Ihr Support-Team für die sehr gute und sehr schnelle Unterstützung.

Smartgarden-Logo: http://www.freepik.com Entworfen von Freepik

## Changelog
### 2.0.1
* (jpgorganizer) 2024-May-25
  - fixed warning `smartgarden has an invalid jsonConfig`, e.g. 
  [Issue 72](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/72)
  - fixed [Issue 64](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/64)
    `Connection == true` when adapter is stopped
  - Fix comparison with `NaN` in api.js, e.g. [Pull request 67](https://github.com/jpgorganizer/ioBroker.smartgarden/pull/67)
  - some further minor changes

### 2.0.0
* (jpgorganizer) 2022-Jun-13
  - support for new login procedure to Gardena webservice: using *Application secret* and *Application key* 
    instead of *username* and *password*. 
    [Issue 47](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/47)
  
    Procedure with *username* and *password* is still available, as it's still working for some users.
	
    **TODO** for all existing users: please re-enter your login data, even if you will still use *username* and *password*!
  - **support for admin4 UI removed; at least admin5 is needed!**
  - new configuration page
  - function and configuration parameter `pre-define states` removed. All Gardena data points get deleted and created again.
  - documentation has been adjusted


### 1.0.6
* (jpgorganizer) 2022-May-04
  - some minor changes in documentation, including [Issue 41](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/41)
and new limit for SERVICE_VALVE (just smart Irrigation Control)
  - bug fix in error handling
  - changes due to new Gardena API v1.1.0
  - necessary changes due to changed behavior Gardena Service [Issue 43](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/43)
  - tests against js-controller 4.x, [Issue 40](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/40)
  
### 1.0.5
* (jpgorganizer) 2021-May-13
  - necessary adjustments due to js-controller v3.3; e.g. [Issue 29](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/29)
    - nearly all data points get deleted and created again with intended role/unit
    - data types for following data points changed from `string` to `number`: 
	  - for all devices: `rfLinkLevel_value` 
      - for mower: `batteryLevel_value`, `operatingHours_value` 
      - for sensor: `batteryLevel_value`, `soilHumidity_value`, `soilTemperature_value`, `lightIntensity_value`, `ambientTemperature_value`
  - compatibility test with node.js v14 and node.js v16 and added to Travis CI test; 
    compatibility test with the upcoming Admin 5 React UI;
    e.g. [Issue 30](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/30)
  - new parameter *beautify log* in instance configuration; makes state ids a little bit shorter in log if switched on

### 1.0.4
* (jpgorganizer) 2021-Feb-22
  - necessary adjustments due to js-controller v3.2
  - option `useTestVariable` in adapter/instance configuration removed

### 1.0.3
* (jpgorganizer) 2021-Jan-26
  - improved error handling
  - new parameter `connection retry interval`
  - axios vulnerability solved, using version `>=0.21.1`
  
### 1.0.2
* (jpgorganizer) 2020-Aug-30
  - monitoring rate limits, see chapter [Rate Limits](#rate-limits) and discussion at 
  [Issue 18](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/18)


### 1.0.1
* (jpgorganizer) 2020-Aug-17
  - better reconnection to GARDENA smart system server in case of your internet connection was broken
  - textual changes in io-package.json
  - improved README and FAQ
  
### 1.0.0
* (jpgorganizer) 2020-Jun-13
  - code rework, no functional change expected
  - support `PAUSE` for SERVICE_VALVE, SERVICE_POWER_SOCKET. e.g. 
	[Issue 14](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/14)
  - internal representation for all timestamps changed from format like 
    `2020-05-26T05:03:47.613+0000` to `2020-05-26T05:03:47.613Z` to 
    support Safari browser e.g. 
	[Issue 12](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/12).
  - support forecast values for mower id's in format with suffix, 
    e.g. `d8a1faef-2ee3-421d-a3f8-f8ed577c2ad3:suffix`, e.g. 
	[Issue 12](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/12)
  - making the adapter more fault tolerant at startup, e.g. trimming 
    whitespaces from username, etc.
  - README: new chapter *Getting support*, 
  - README: chapter *Known Errors* deleted, should be resolved by GARDENA 
  - README: links to GARDENA/Husqvarna developer portal adjusted to the new address

### 0.6.0
* (jpgorganizer) 2020-May-03
  - new feature *Irrigation not allowed while mowing*, 
    for detailed description see 
	[Irrigation not allowed while mowing](#Irrigation-not-allowed-while-mowing); 
    e.g. 
	[Issue 5](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/5)
  - rework instance config dialog
  - improvement of documentation

### 0.5.1
* (jpgorganizer) 2020-Apr-26
  - some corrections (sensor, typo)
  - integration of travis-ci
  
### 0.5.0
* (jpgorganizer)  2020-Apr-25
  - MOWER: forecast for remaining charging time and remaining mowing time 
  integrated, e.g. [Issue 1](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/1)
  - **IMPORTANT CHANGE** for existing users: the id for LOCATION, all 
    DEVICE's and all SERVICE's has changed due to support of History adapter. 
	(History adapter cannot handle id's with `%` (percent) character 
	within id's, although the `%` is not forbidden in id's in ioBroker), e.g. 
	[Issue 8](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/8). 
  
    So you **must delete all states** of the adapter instance to 
    install this release and please check your application carefully for 
    necessary adjustments regarding the change of the id names.

  - devices *Water Control* and *Smart Pump* tested (many thanks to user 
    gammler2003 and xengosam at 
    [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)
  - some code rework and improvement of documentation
  - dependency corrected, important for js-controller v3, e.g. 
    [Issue 7](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/7)
  - adapter now available at npm
  
### 0.4.2
* (jpgorganizer) 2020-Apr-01
  - error *missing SENSOR data* fixed (many thanks to user dslraser and 
  muckel at 
  [ioBroker Forum](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system/) for testing)

### 0.4.1
* (jpgorganizer) 2020-Mar-31
  - Dependency get's resolved now
  
### 0.4.0 
* (jpgorganizer) 2020-Mar-31
  - **NOTE:** with this version an additional dependency is necessary at runtime. 
  If it does not get installed together with the installation of this adapter, 
  please install seperately with 
  `npm install https://github.com/jpgorganizer/ioBroker.utils` or 
  `npm i @jpgorganizer/utils`
  - **NOTE:** you **must delete all states** of the adapter instance to 
  install this release and please check your application carefully for 
  necessary adjustments regarding type/role changes (see below) 
  - data types of (nearly) all data points adjusted for compliance with 
  ioBroker guidance: 
    * states now have special ioBroker type and role instead of former 
	`string`/`text` where applicable, e.g. `number`/`value.battery` for 
	`batteryLevel_value`, see 
	[Issue 3](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/3)
  - data point `activity_value_i` replaced by `activity_mowing_i` with 
    type/role `boolean`/`indicator.working`: `true` means *mowing*, `false` 
  means *not mowing*
  - possibility to pre-define states integrated, see new switch 
  `PreDefine States` in adapter/instance configuration, see 
  [Issue 2](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/2)
  - states are readonly now; except states for commands, see 
  [Issue 4](https://github.com/jpgorganizer/ioBroker.smartgarden/issues/4)
  - input field for `useTestVariable` in adapter/instance configuration 
  switched to a *checkbox* (former: *text*); please check your settings
  - error in command  `stop_all_valves_i` in VALVE_SET fixed
  
### 0.3.0
* (jpgorganizer) 2020-Mar-25
  - create all states read/write 
  - error TypeError: Cannot read property 'val' of null with useTestVariable 
  fixed



### 0.2.0
* (jpgorganizer) 2020-Mar-24
  - **IMPORTANT** : data point for MOWER control (command) changed from  
  `duration_value` to `activity_control_i`
  - rework leftovertimer 
  - improved error handling
  - improved logging (see  loglevel in adapter configurations)

### 0.0.1 
* (jpgorganizer) 2020-Mar-01
  - initial release

## License

Copyright (c) 2020 - 2024 jpgorganizer, https://github.com/jpgorganizer 

smartgarden by jpgorganizer is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
[(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden. 
 

<!--- SVN: $Rev: 3209 $ $Date: 2024-05-25 12:16:16 +0200 (Sa, 25 Mai 2024) $ --->