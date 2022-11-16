---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.smartgarden/README.md
title: ioBroker.smartgarden
hash: zkZXcslBa/4upJZAxaBfbeYY8UUByjrbYb3XjQmjSUg=
---
![Logo](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

![Eingerichtet](http://iobroker.live/badges/smartgarden-installed.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.smartgarden.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.smartgarden.svg)
![Build-Status](https://travis-ci.org/jpgorganizer/ioBroker.smartgarden.svg?branch=master)
![Stabil](http://iobroker.live/badges/smartgarden-stable.svg)
![NPM](https://nodei.co/npm/iobroker.smartgarden.png?downloads=true)

# IoBroker.smartgarden
## IoBroker smartgarden Adapter für GARDENA smart system
Ein Adapter für GARDENA smart system mit offiziellem [GARDENA smart system API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) und Service.

Der Adapter ermöglicht die Entwicklung einer Anwendung (z. B. mit VIS), die parallel zur offiziellen GARDENA App genutzt werden kann. Der Adapter und seine Zusatzfunktionen beeinträchtigen keine der Grundfunktionen der GARDENA App und umgekehrt.

Der Adapter ist kein vollständiger Ersatz für die GARDENA App, sondern eine Ergänzung, um die GARDENA Geräte in ein Smart Home mit ioBroker einzubinden.
Mit dem Adapter lassen sich die wichtigsten Aktionen durchführen. Außerdem bietet sie die Möglichkeit, eigene Ideen umzusetzen, die mit der GARDENA App nicht möglich sind.

## Unterstützte Geräte
  - GARDENA smart SILENO Mähroboter
  - GARDENA smart Bewässerungssteuerung
  - GARDENA smart Druckpumpe
  - GARDENA smart Water Control
  - GARDENA smart Netzteil
  - GARDENA smart-Sensor

Weitere Informationen zu den Geräten finden Sie unter [GARDENA deutsche Website](https://www.gardena.com/de/produkte/smart/smartsystem/) und [hier auf englisch](https://www.gardena.com/uk/products/smart/smart-system/).

## Anforderungen
Um diesen Adapter zu verwenden, benötigen Sie folgende Dinge:

1. ein GARDENA smart system Konto
1. einen GARDENA Applikationsschlüssel
1. ein GARDENA Anwendungsgeheimnis

Um diese Dinge zu erhalten, gehen Sie bitte zum Husqvarna Developer Portal unter [https://developer.husqvarnagroup.cloud/](https://developer.husqvarnagroup.cloud/).

Bitte registrieren Sie sich oder melden Sie sich an, wenn Sie bereits ein Konto haben, und erstellen Sie eine neue Anwendung, um Ihren *Anwendungsschlüssel* und Ihr *Anwendungsgeheimnis* zu erhalten.

Derzeit sieht die Seite wie in den folgenden Screenshots aus.

---

![meine Anwendungen](../../../en/adapterref/iobroker.smartgarden/img/myapplications.png)

Drücken Sie die Taste **NEUE ANWENDUNG**

---

![neue Anwendung erstellen](../../../en/adapterref/iobroker.smartgarden/img/createnewapplication.png)

Formular mit eigenen Daten bearbeiten. Derzeit wird das Feld *Umleitungs-URLs* nicht verwendet. Deshalb können Sie derzeit einen beliebigen Wert eingeben.
Drücken Sie die Schaltfläche **ERSTELLEN**

---

![mysmartgarden-Anwendung](../../../en/adapterref/iobroker.smartgarden/img/mysmartgardenapplication.png)

Auf der nächsten Seite erhalten Sie den *Application Key* und das *Application Secret*.
Sie benötigen diese Werte für Ihre Adapterinstanzkonfiguration.
Und Sie müssen die APIs verbinden

  - Authentifizierungs-API ***und***
  - GARDENA Smart-System-API.

Drücken Sie dazu die Schaltfläche **NEUE API VERBINDEN** und wählen Sie die erste API aus. Und wiederholen Sie dies für die zweite API.

---

**Notiz:**

  - Wenn Sie bereits einen Husqvarna Automower® Connect oder a

GARDENA smart system-Konto können Sie sich mit diesem Konto anmelden und mit Anwendung erstellen fortfahren, um den Anwendungsschlüssel und das Anwendungsgeheimnis zu erhalten.

	---

***Und es ist fast sicher, dass Sie ein Konto haben.*** *Bitte verwenden Sie dasselbe Konto wie für die GARDENA App, in dem Ihre GARDENA Geräte registriert sind. Andernfalls erhalten Sie keinen Zugriff auf Ihre Geräte.*

	---

  - Stellen Sie sicher, dass Sie die Anwendung mit den APIs verbunden haben
    - Authentifizierungs-API ***und***
- GARDENA Smart-System-API.

Und natürlich benötigen Sie eine laufende ioBroker-Installation (mindestens mit admin5 UI) und Sie sollten mindestens einen funktionierenden [GARDENA smart-Gerät](#supported-devices) besitzen.

## Inhaltsverzeichnis
  * [ioBroker smartgarden adapter for GARDENA smart system](#iobroker-smartgarden-adapter-for-gardena-smart-system)
  * [Unterstützte Geräte](#supported-devices)
  * [Anforderungen](#Anforderungen)
  * [Inhaltsverzeichnis](#Inhaltsverzeichnis)
  * [Installation](#Installation)
  * [Setup-Adapter](#Setup-Adapter)
  * [Unterstützung erhalten](#getting-support)
  * [Datenpunkte des Adapters](#Datenpunkte-des-Adapters)
     * [Allgemeines über Datenpunkte](#general-things-to-know-about-data-points)
     * [Für SERVICE_MOWER](#for-service_mower)
     * [Für SERVICE_VALVE_SET](#for-service_valve_set)
     * [Für SERVICE_VALVE](#for-service_valve)
     * [Für SERVICE_POWER_SOCKET](#for-service_power_socket)
     * [Für SERVICE_SENSOR](#for-service_sensor)
     * [Für SERVICE_COMMON](#for-service_common)
  * [Ratenlimits](#Ratenlimits)
  * [Bewässerung beim Mähen nicht erlaubt](#Bewässerung-nicht-erlaubt-beim-Mähen)
     * [Was ist das Problem?](#was-ist-das-Problem)
* [Was wird getan?](#was-wird-getan)
* [Basisverhalten – WARNUNG](#basic-behaviour----warning)
  * [Wünsche für Datenpunkte](#Wünsche-für-Datenpunkte)
  * [Anmerkung](#Anmerkung)
  * [Änderungsprotokoll](#Änderungsprotokoll)
     * [2.0.0](#200)
     * [1.0.6](#106)
     * [vorherige Versionen](#105)
  * [Credits](#Credits)
  * [Lizenz](#Lizenz)

## Installation
Adapter ist vorhanden

- bei npm: Installieren Sie mit `npm install iobroker.smartgarden`
- bei GitHub unter https://github.com/jpgorganizer/ioBroker.smartgarden.

Eine Beschreibung zur Installation von GitHub ist in [hier](https://www.iobroker.net/docu/index-235.htm?page_id=5379&lang=de#3_Adapter_aus_eigener_URL_installieren) verfügbar.

## Setup-Adapter
1. Installieren Sie den Adapter
2. Erstellen Sie eine Instanz des Adapters
3. Überprüfen und vervollständigen Sie die Instanzkonfiguration

   **Wenn Sie einen Wert dieser Einstellungen ändern, starten Sie bitte Ihren Adapter neu.**

3.1 Anwendungsschlüssel und Anwendungsgeheimnis und/oder optionalen Benutzernamen und Passwort in der Konfiguration der Hauptinstanz bearbeiten

      | Parameter | Beschreibung |
      | - | - |
|***obligatorisch***||
      | Anwendungsschlüssel | Anwendungsschlüssel (API-Schlüssel), z. unter [Anforderungen](#requirements) |
| entweder *Anwendungsgeheimnis*<br> oder *Benutzername und Passwort* \*) \*\*)||
      | Anwendungsgeheimnis \*)| Anwendungsgeheimnis, z. unter [Anforderungen](#requirements) - nur wenn *username* und *password* leer sind (neu in v2.0.0)*|
      | Anwendungsgeheimnis \*)| Anwendungsgeheimnis, z. unter [Anforderungen](#Anforderungen) - nur wenn *Benutzername* und *Passwort* leer sind (neu in v2.0.0)*|
|***nicht empfohlen***||
      | Benutzername \*) \*\*)| Benutzername für GARDENA smart system - nur wenn *Anwendungsgeheimnis* leer ist|
      | Passwort \*) \*\*)| entsprechendes Passwort - nur wenn *Benutzername* angegeben ist|

**ANMERKUNGEN:** \*)

     - Ab Release v2.0.0 **bevorzugtes Login-Verfahren mit *Anwendungsschlüssel* und

*Anwendungsgeheimnis*** als früheres Login-Verfahren mit *Benutzername* und *Passwort* wird von Gardena nicht mehr unterstützt, funktioniert aber dennoch für viele Benutzer.
Aus diesem Grund ist es hier noch verfügbar, aber im Fehlerfall gibt es dafür keinen Support mehr.
Es wird daher empfohlen, *Anwendungsschlüssel* und *Anwendungsgeheimnis* zu verwenden!

     - *Anwendungsschlüssel*, *Anwendungsgeheimnis* und *Passwort* werden verschlüsselt und darin gespeichert

     den Adapter und werden zur Authentifizierung beim GARDENA Applikationshost einfach entschlüsselt.

   \*\*)

     - Parameter wird eingestellt und ist möglicherweise in einer zukünftigen Version nicht mehr verfügbar

3.2 Überprüfen Sie die Standardwerte verschiedener Einstellungen und schalten Sie Optionen in der Instanzkonfiguration ein/aus. Für die meisten Benutzer sind die Standardwerte in Ordnung.

      | Parameter | Beschreibung |
      | - | - |
      | Prognose | Prognose für Ladezeit und Restzeit des Mähers verwenden; prognostizierte Lade- und Mähzeit des Mähers ein-/ausschalten; Standard: aus; *(neu in v0.5.0)*|
      | Zyklen | Anzahl der MÄHER-Verlaufszyklen; Sie können jede Zahl ab 3 (Minimum) verwenden, aber 10 (Standard) scheint ein guter Wert zu sein; nur relevant, wenn obige *'Prognose'* eingeschaltet ist; *(neu in v0.5.0)*|
      | Bewässerungscheck| Verwenden Sie die Überprüfung, ob während des Mähens bewässert werden darf; Ein-/ Ausschalten; Standard: aus; *(neu in v0.6.0)*|
| Überwachungsgrenze | Überwachung der Ratenbegrenzungen der Gardena Smart System API verwenden; Ein-/ Ausschalten; Standard: aus; *(neu in v1.0.2)*|

3.3 Überprüfen Sie die Standardwerte der Systemeinstellungen und schalten Sie Optionen in der Instanzkonfiguration ein/aus. **Die meisten Benutzer müssen auf dieser Registerkarte nichts ändern.**

      | Parameter | Beschreibung |
      | - | - |
      | Protokollebene | Loglevel: 0 = keine Logeinträge, 1 = einige Logeinträge, 2 = einige weitere Logeinträge, 3 = alle Logeinträge; Standard: 0 - keine Logeinträge|
      | Protokoll verschönern | Zustands-IDs im Protokoll kürzer machen; Ein-/ Ausschalten; Standard ein; *(neu in v1.0.5)*|
      | Verbindungswiederholungsintervall | Intervall für den erneuten Verbindungsversuch zum Gardena Webservice im Fehlerfall (in Sekunden); Standard: 300, Minimum: 60; *(neu in v1.0.3)*|
      | Ping-Intervall | Intervall für das Senden von Ping's an den Gardena Webservice (in Sekunden); Standard: 150, Minimum: 1, Maximum: 300|
      | Authentifizierungsfaktor | Faktor für die Gültigkeit des Authentifizierungstokens; Standard: 0,999 |
      | Auth-URL| URL des Authentifizierungshosts; Standard: [https://api.authentication.husqvarnagroup.dev](https://api.authentication.husqvarnagroup.dev)|
      | Basis-URL| Webservice Basis-URL; Standard: [https://api.smart.gardena.dev](https://api.smart.gardena.dev)|

## Unterstützung erhalten
Um Hilfe zu erhalten, lesen Sie diese [README](README.md) und die [FAQ](FAQ.md) sorgfältig durch.
Wenn Sie weitere Unterstützung benötigen, treten Sie bitte dem [ioBroker-Forenthread](https://forum.iobroker.net/topic/31289/neuer-adapter-smartgarden-adapter-for-gardena-smart-system) bei.

## Datenpunkte des Adapters
Der Adapter dient zur Überwachung und Steuerung von GARDENA smart system Geräten.
Dafür wird es einen `LOCATION` und einen oder mehrere `DEVICE` geben.
Für jeden `DEVICE` wird es geben

  - ein `SERVICE_COMMON_<id>` und
  - ein oder mehrere `SERVICE_<servicelink_type>_<id>`.

Wobei `<servicelink_type>` eine Typbeschreibung für das Gerät ist, zum Beispiel MÄHER oder VENTIL und `<id>` eine (codierte) GARDENA-Geräte-ID ist, die von der API verwendet wird.
Siehe Beschreibung für ServiceLink unter [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).

Die Steuerung/Überwachung für jedes Gerät ist über die in der folgenden Tabelle aufgeführten `SERVICE_<servicelink_type>` möglich. `SERVICE_COMMON` enthält allgemeine Informationen über das Gerät.

  | Gerät | SERVICE_<Servicelink_Typ> |
  | - | - |
  | smart SILENO Mähroboter | SERVICE_MOWER und SERVICE_COMMON |
  | intelligente Bewässerungssteuerung | SERVICE_VALVE_SET, SERVICE_VALVE und SERVICE_COMMON |
  | intelligente Druckpumpe | SERVICE_VALVE und SERVICE_COMMON |
  | intelligente Wassersteuerung | SERVICE_VALVE und SERVICE_COMMON |
  | smart Netzteil | SERVICE_POWER_SOCKET und SERVICE_COMMON |
  | intelligenter Sensor | SERVICE_SENSOR und SERVICE_COMMON |

Weitere Informationen zu den Datenpunkten finden Sie unter [https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger).
Dort finden Sie zu jedem Datenpunkt eine Beschreibung; mit Ausnahme derjenigen, die als Datenpunkte des Adapters und nicht der GARDENA smart system API gekennzeichnet sind.

Der Adapter erstellt seine eigenen Datenpunkte für verschiedene Features / Optionen, wenn das Feature ausgewählt wird. Diese Datenpunkte werden beim Abwählen der Funktion nicht automatisch gelöscht. Wenn Sie diese Datenpunkte nicht mehr benötigen, können sie manuell gelöscht werden.

### Allgemeines über Datenpunkte
Der Adapter verändert keine von der GARDENA smart system API übermittelten Werte.
Das einzige, was getan wird (ab Version 1.0.0), ist die Überprüfung der Art von *timestamps* und *numbers*.

| suchen Sie nach | Beschreibung |
| - | - |
| Zeitstempel | alle Zeitstempel sind in UTC angegeben; wenn ein empfangener Zeitstempel kein gültiger Zeitstempel ist, wird stattdessen `01 Jan 1970 00:00:00Z` (Unix-Zeit Null) verwendet. Wenn Sie also dieses Datum/diese Uhrzeit sehen, melden Sie sich bitte. |
| Zahlen | wenn eine Zahl keine gültige Zahl ist, wird stattdessen "-1" verwendet. Wenn Sie also diese Nummer sehen, melden Sie sich bitte. |

Anfragen zur Steuerung eines Geräts sind erfolgreich, sobald der Befehl vom Smart Gateway akzeptiert wurde. Eine erfolgreiche Ausführung des Befehls auf dem Gerät selbst kann durch einen entsprechenden Zustandswechsel beobachtet werden.
*Beispiel:* Das Senden eines Befehls zum Starten des VALVE-Dienstes einer intelligenten Wassersteuerung führt dazu, dass der Datenpunkt `activity_value` des Dienstes geändert wird, nachdem das Gerät den Befehl verarbeitet hat.

**Anmerkungen:**

  - Anfragen zur Steuerung eines Geräts können nicht gesendet werden, solange der Smartgarden-Adapter dies nicht tut

    mit GARDENA smart system API verbunden.

  - Bitte prüfen Sie, ob Sie den Wert für einen Befehl mit `ack=false` setzen. Siehe [Kapitel Befehle und Status im Leitfaden für Adapterentwickler] (https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#commands-and-statuses)

### Für SERVICE_MOWER
#### Kontrolle
Um das Gerät zu steuern, verwenden Sie den Datenpunkt

- `activity_control_i`

  *Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

  Ändern Sie diesen Datenpunkt, um den Mäher zu starten.

  - Um für eine definierte Zeit zu starten, setzen Sie den Wert auf die geplante Dauer in

  Sekunden (bitte Vielfache von 60 verwenden)

  - Für den automatischen Betrieb setze den String `START_DONT_OVERRIDE`
  - um den aktuellen Vorgang abzubrechen und zur Nutzung der Ladestation zurückzukehren

  Zeichenkette `PARK_UNTIL_NEXT_TASK`

  - um den aktuellen Vorgang abzubrechen, zur Ladestation zurückkehren und ignorieren

  Zeitplan verwenden Zeichenfolge `PARK_UNTIL_FURTHER_NOTICE`

  **Hinweis:** Der Mäher startet nur mit einem vollständig aufgeladenen Akku.

#### Überwachung
Alle anderen Datenpunkte dienen nur der Überwachung und Information.

Spezielle Datenpunkte:

- `activity_mowing_i`

  *Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

  Dieser Datenpunkt zeigt zwei verschiedene Zustände für den Mäher:

  - `true`: Mähen bzw
  - `false`: nicht mähen.

Dieser Datenpunkt kann für weitere Aktionen verwendet werden, bei denen es wichtig ist zu wissen, ob der Mäher sicher auf dem Rasen steht oder nicht.

Abhängig vom Wert des Datenpunktes `activity_value` wird dieser Datenpunkt gesetzt.
Einzelheiten entnehmen Sie bitte der folgenden Tabelle.

  | `activity_value` | `activity_mowing_i` |
  |`OK_CHARGING` Der Mäher muss mähen, aber unzureichender Ladezustand hält ihn in der Ladestation. | falsch |
  |`PARKED_TIMER` Der Mäher ist gemäß Timer geparkt, startet wieder zur konfigurierten Zeit. | falsch |
  |`PARKED_PARK_SELECTED` Der Mäher ist bis auf Weiteres abgestellt. | falsch |
  |`PARKED_AUTOTIMER` Der Mäher unterbricht das Mähen wegen unzureichender Grashöhe. | falsch |
  |`PAUSED` Der Mäher befindet sich in einem Wartezustand mit geschlossener Klappe. | falsch |
  |`OK_CUTTING` Der Mäher mäht im AUTO-Modus (Zeitplan). | wahr |
  |`OK_CUTTING_TIMER_OVERRIDDEN` Der Mäher mäht außerhalb des Zeitplans. | wahr |
  |`OK_SEARCHING` Der Mäher sucht nach der Ladestation. | wahr |
  |`OK_LEAVING` Der Mäher verlässt die Ladestation. | wahr |
  |`NONE` Es findet keine Aktivität statt, möglicherweise aufgrund eines Fehlers. | wahr |
  |`NONE` Es findet keine Aktivität statt, möglicherweise aufgrund eines Fehlers. | wahr |
  |alle anderen Werte | wahr |

- `batteryState_chargingTime_remain_i` *(unter SERVICE_COMMON...)* und<br/>

`activity_mowingTime_remain_i` *(unter SERVICE_MÄHER...)*

  *Beide Datenpunkte werden vom Adapter generiert und werden aufgrund der GARDENA smart system API nicht benötigt.*

Diese Datenpunkte zeigen eine Prognose für die verbleibende Lade- und Mähzeit des Mähers in Sekunden.
Sie werden erst angelegt, wenn die Funktion in der Instanzkonfiguration ausgewählt wird.

Zur Prognose eines Wertes wird eine Historie der letzten paar Lade- und Mähzyklen in zwei Zuständen `info.saveMowingHistory` und `info.saveChargingHistory` gespeichert.

Diese Funktion kann in der Konfiguration der Adapterinstanz zusammen mit der Anzahl der gespeicherten Lade- und Mähzyklen im Verlauf ein-/ausgeschaltet werden.

Um diese Funktion in Betrieb zu nehmen, **achten Sie bitte darauf, dass mindestens ein Mäh- und Ladezyklus fehlerfrei abläuft (z. B. nicht manuell oder sensorgesteuert unterbrochen wird).** Besser ist es, wenn mindestens drei Durchgänge fehlerfrei abgeschlossen werden.
Diese Funktion versucht den Normalfall zu erkennen und geht zunächst davon aus, dass der nächste Prozess ein Normalfall ist. Ist dieser fehlerhaft, so wird dieser fehlerhafte Lauf als Normalfall angesehen und die dann normal durchlaufenden Läufe als Fehlerfall. Wenn während des Laufs ein Fehler auftritt, stoppen Sie bitte den Adapter, löschen Sie die beiden Datenpunkte und starten Sie erneut.

Weitere Informationen zu allgemeinen Prognosemechanismen finden Sie unter [PROGNOSE.md](FORECAST.md).

  **Anmerkungen:**

    1. Prognosewerte sind nur verfügbar, wenn mindestens einer vollständig ist

Lade- und Mähzyklus wird im Verlauf gespeichert.

    2. Der Verlauf wird unter `Info` gespeichert, damit bei Bedarf der `LOCATION` benötigt wird

zu löschen, z. bei einem zukünftigen Update geht es nicht verloren.

    3. Wenn Sie Ihren Mäher vom GARDENA smart system trennen und

Verbinden Sie ihn erneut, die Historie geht verloren, da Ihr Mäher innerhalb des GARDENA smart Systems eine neue ID erhält. Das bedeutet, dass der Adapter den Mäher nicht als den vorherigen Mäher erkennen kann – möglicherweise handelt es sich um einen zweiten.
In diesem Fall empfiehlt es sich, diese beiden Datenpunkte zu löschen und den Adapter neu zu starten, damit nicht ständig die bisherigen (jetzt alten) History-Sets gelesen und geschrieben werden. Der Adapter beginnt dann mit dem Aufbau einer neuen Historie.

4. Diese Funktion sollte für mehr als einen Mäher funktionieren, ist es aber

nicht getestet *(das kann ich nicht, da ich nur einen Mäher habe)*.
Wenn Sie mehr als einen Mäher haben, testen und melden Sie Fehler und natürlich, ob er wie vorgesehen funktioniert. Danke im Voraus dafür.

- `lastErrorCode_value`

Bitte achten Sie besonders auf den Datenpunkt `lastErrorCode_value`.
Eine Beschreibung möglicher Werte finden Sie unter https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/swagger, siehe „MowerService - lastErrorCode“

### Für SERVICE_VALVE_SET
#### Kontrolle
Um das Gerät zu steuern, verwenden Sie den Datenpunkt

- `stop_all_valves_i`

  *Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

  Ändern Sie diesen Datenpunkt, um alle Ventile zu stoppen.

  - Um alle Ventile sofort zu stoppen, verwenden Sie den String `STOP_UNTIL_NEXT_TASK`

**Hinweis:** Zeigen Sie den Wert dieses Datenpunkts nicht in Ihrer Anwendung an, da der Wert meist undefiniert ist. Außerdem kann dieser Datenpunkt nicht als Auslöser für eigene Aktionen dienen, da er erst nach dem Auslösen des Befehls auf den Wert *null* gesetzt wird.

#### Überwachung
Alle anderen Datenpunkte dienen nur der Überwachung und Information.

### Für SERVICE_VALVE
#### Kontrolle
Um das Gerät zu steuern, verwenden Sie den Datenpunkt

- `duration_value`

  Ändern Sie diesen Datenpunkt, um das Ventil zu starten.

  - Um für eine definierte Zeit zu starten, setzen Sie den Wert auf den Wert in Sekunden

  (bitte Vielfache von 60 verwenden).

**Hinweis:** Es gibt einige Einschränkungen für die zulässigen Werte.
Bitte melden Sie, wenn Sie andere Einschränkungen sehen.

    | Gerät | Grenze |
    | - | - |
    |GARDENA smart Bewässerungssteuerung| 5400 Sekunden (90 Minuten) |
    |GARDENA smart Pumpe | 36000 (10 Stunden) |
    |GARDENA smart Wassersteuerung | 36000 (10 Stunden) |

  - Um die aktuelle Bewässerung abzubrechen und mit dem Zeitplan fortzufahren, verwenden Sie die Zeichenfolge

  `STOP_UNTIL_NEXT_TASK`

  - Zum Überspringen des automatischen Betriebs bis zur angegebenen Zeit, die derzeit aktiv ist

Vorgang kann abgebrochen werden oder nicht (abhängig vom Gerätemodell) Zeichenfolge `PAUSE_<number_of_seconds>` verwenden, z. `PAUSE_86400` für 24 Stunden pausieren (bitte Vielfache von 60 verwenden)

  - Um den automatischen Betrieb wiederherzustellen, wenn er angehalten wurde, verwenden Sie die Zeichenfolge „UNPAUSE“.

- `irrigationWhileMowing_allowed_i` und `irrigationWhileMowing_mowerDefinition_i`

  *Diese Datenpunkte werden vom Adapter generiert und werden aufgrund der GARDENA smart system API nicht benötigt.*

Diese Datenpunkte ermöglichen die Steuerung der Funktion *Bewässerung während des Mähens nicht erlaubt*.
Sie werden erst angelegt, wenn die Funktion in der Instanzkonfiguration ausgewählt wird.
Beschreibung dieser Funktion siehe Kapitel [Bewässerung während des Mähens nicht erlaubt](#Irrigation-not-allowed-while-mowing).

#### Überwachung
Alle anderen Datenpunkte dienen nur der Überwachung und Information.

Spezieller Datenpunkt:

- `duration_leftover_i`

  *Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

Der Wert beschreibt die Anzahl der Minuten, bis das Ventil geschlossen wird und die Bewässerung stoppt.

    - Eine Ganzzahl, eins (`1`) oder mehr.
    - "null", wenn nicht definiert

### Für SERVICE_POWER_SOCKET
#### Kontrolle
Um das Gerät zu steuern, verwenden Sie den Datenpunkt

- `duration_value`

  Ändern Sie diesen Datenpunkt, um die Steckdose zu starten.

  - Um für eine definierte Zeit zu starten, setzen Sie den Wert auf den Wert in Sekunden

  (bitte Vielfache von 60 verwenden)

  - Um das Gerät dauerhaft einzuschalten, verwenden Sie bitte den String `START_OVERRIDE`.
  - Um das Gerät zu stoppen, verwenden Sie `STOP_UNTIL_NEXT_TASK`.
  - Zum Überspringen des automatischen Betriebs bis zur angegebenen Zeit. Die derzeit aktive Operation

wird NICHT storniert. Verwenden Sie die Zeichenfolge `PAUSE_<number_of_seconds>`, z. `PAUSE_86400` für 24 Stunden pausieren (bitte Vielfache von 60 verwenden)

  - Um den automatischen Betrieb wiederherzustellen, wenn er angehalten wurde, verwenden Sie die Zeichenfolge „UNPAUSE“.

#### Überwachung
Alle anderen Datenpunkte dienen nur der Überwachung und Information.

Spezieller Datenpunkt:

- `duration_leftover_i`

  *Dieser Datenpunkt wird vom Adapter generiert und wird aufgrund der GARDENA smart system API nicht benötigt.*

  Der Wert beschreibt die Anzahl der Minuten, bis die Steckdose abgeschaltet wird.

    - Eine Ganzzahl, eins (`1`) oder mehr.
    - "null", wenn nicht definiert

### Für SERVICE_SENSOR
#### Kontrolle
Keine Steuerfunktionen verfügbar.

#### Überwachung
Alle Datenpunkte dienen nur der Überwachung und Information.

### Für SERVICE_COMMON
`SERVICE_COMMON` liefert allgemeine Informationen über das Gerät.
Die Beschreibung wird bei Bedarf in die Beschreibung anderer SERVICE_... integriert.

## Ratenlimits
Es gibt einige Grenzen, die Sie beachten sollten.
Siehe Kapitel *Ratenbegrenzungen* in [*LIESMICH*](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/readme) der GARDENA smart system API-Beschreibung.

Um Ihnen zu helfen zu sehen, ob Sie diese Ratenlimits erreichen, können Sie die Überwachung in der Instanzkonfiguration mit dem Parameter *Überwachung der Ratenlimits* einschalten.

Wenn Sie den Überwachungsstatus aktiviert haben, wird `info.RateLimitCounter` bei jeder Anfrage aktualisiert.
Dieser Zustand speichert eine Datenstruktur mit der Anzahl der Anfragen pro Monat, Tag, Stunde und für die letzten 30 und 31 Tage.

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

  - Diese Stunde ist die Uhrzeit in UTC
  - Dass die tatsächliche Anzahl der Anfragen höher sein kann. Besonders als

  solange der jeweilige Zeitraum nicht vollständig von der Überwachung erfasst wird.

  - Dass diese Struktur sehr groß wird und nie von der gelöscht wird

Adapter. Also bitte ab und zu manuell löschen oder die Überwachung ausschalten - zumindest wenn Sie keine Probleme mit den Ratenlimits haben.

## Bewässerung während des Mähens nicht erlaubt
### Was ist das Problem?
Wenn Sie sowohl einen Mäher als auch eine Beregnungsanlage mit Versenkregnern haben, besteht die Gefahr, dass Ihr Mäher bei laufender Beregnung auf einen Versenkregner stößt und diesen beschädigt oder selbst Schaden anrichtet.

Um dies zu verhindern, sollten während des Mähens die Beregnungsanlage oder besser einzelne Ventile abgeschaltet werden.

### Was wird getan?
Mit dieser Funktion ist es möglich, die Bewässerung zu stoppen, wenn sich der Mäher auf dem Rasen befindet. Dies kann für jedes Ventil separat definiert werden.

Für jedes Ventil können ein oder mehrere Mäher definiert werden, für die das Ventil nicht geöffnet sein darf, während der Mäher mäht.
Grundsätzlich hat der Mäher Vorrang vor der Beregnung, d.h. wenn der Konflikt auftritt, dass der Mäher mäht und ein Ventil offen ist, wird das Ventil geschlossen und eine entsprechende Warnung gesetzt.

Zusätzlich kann definiert werden, dass ein Ventil unabhängig vom Mäher nie öffnen soll. Z.B. kann verwendet werden, wenn ein Ventil oder das dahinter liegende Rohr beschädigt ist.

Die gesamte Prüfung kann in der Instanzkonfiguration mit dem Parameter *Bewässerungsprüfung* ein- oder ausgeschaltet werden.

Für jeden `SERVICE_VALVE` stehen drei Datenpunkte zur Verfügung.
Sie werden zur Konfiguration und zum Melden von Warnungen verwendet.

  | Datenpunkt | beschreibbar | Beschreibung der Datenpunkte |
  | - | - | - |
  |`irrigationWhileMowing_allowed_i` | ja | auf `false` setzen, wenn geprüft werden soll, ob die Bewässerung erlaubt ist, während der Mäher auf dem Rasen mäht, `true` sonst |
  |`irrigationWhileMowing_warningCode_i`| nein | Warncode wird gesetzt, wenn Ventil öffnet. Mögliche Warncodes siehe nächste Tabelle. Wenn mehr als eine Warnung gesetzt ist, werden Codes mit `+` verkettet (z. B. `STOPPED+UNKNOWN_MOWER`).|
  |`irrigationWhileMowing_warningCode_i`| nein | Warncode wird gesetzt, wenn Ventil öffnet. Mögliche Warncodes siehe nächste Tabelle. Wenn mehr als eine Warnung gesetzt ist, werden Codes mit „+“ verkettet (z. B. „STOPPED+UNKNOWN_MOWER“).|

* ***Mäher-ID-Format***

  `smartgarden.0.LOCATION_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.DEVICE_xxxxxxxx-xxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxx.SERVICE_MOWER_xxxxxxxx-xxxxxx-xxxxxx-xxxxxxxxxxxxxxxxxxxxx`

Sie können diese Mäher-ID aus der Registerkarte „Objekte“ von ioBroker kopieren, siehe roter Pfeil im folgenden Bild.

    ![Mäher-ID](../../../en/adapterref/iobroker.smartgarden/img/mowerid_admin5.jpg)

* ***Warncodes***

  | Warncode| Beschreibung|
  | - | - |
  | `NO_WARNING` |keine Warnung, Ventil geöffnet |
  | `STOPPED` |Ventil automatisch geschlossen, weil Mäher mäht |
  | `FORBIDDEN` |Ventil geschlossen, da Sondercode `IRRIGATION_FORBIDDEN` im Datenpunkt `irrigationWhileMowing_mowerDefinition_i`| eingestellt ist |
  | `VERBOTEN` |Ventil geschlossen, weil der Sondercode `IRRIGATION_FORBIDDEN` im Datenpunkt `irrigationWhileMowing_mowerDefinition_i`| gesetzt ist |

Diese Funktion wird jedes Mal ausgeführt, wenn

- ein Ventil wird geöffnet oder
- Ein Mäher beginnt zu mähen

Es läuft nicht, wenn Sie die Werte in den oben aufgeführten Datenpunkten ändern.
Das heißt: Wenn es eine Konfliktsituation gibt und Sie `irrigationWhileMowing_allowed_i` von `true` auf `false` ändern, wird der Konflikt nicht erkannt und der Konflikt wird fortgesetzt. Dasselbe Verhalten gilt bei einer Änderung von `irrigationWhileMowing_mowerDefinition_i`.

### Grundlegendes Verhalten -- WARNUNG
Diese Funktion kann nicht verhindern, dass sich ein Ventil öffnet, während der Mäher mäht. Z.B. Dies kann manuell über die GARDENA App oder automatisch über einen Zeitplan erfolgen.

Diese Funktion kann das Ventil nur im Konfliktfall schnellstmöglich schließen. Und ein Konflikt darf auch nicht erkannt werden.
So kann es passieren, dass Wasser durchgelassen wird.
**Z.B. Es kann nicht verhindert werden, dass die Versenkregner ausfahren und der Mäher gegen die Versenkregner** stößt, aber die Wahrscheinlichkeit, dass dies geschieht, wurde minimiert.
**Es liegt also an Ihrer Anwendung, dafür zu sorgen, dass dieser Konflikt niemals auftritt.**

## Wünsche für Datenpunkte
Dieser Adapter meldet **jeden Wert** als Datenpunkt, der über die GARDENA smart system API geliefert wird. Wenn jemand mehr Werte möchte, kontaktieren Sie bitte GARDENA und teilen Sie ihm mit, dass dieser Wert auch in die API aufgenommen wird. Gehen Sie dazu bitte zu ***Kontakt & Feedback hinterlassen*** in der Fußzeile von [GARDENA Entwicklerportal](https://developer.husqvarnagroup.cloud).

## Notiz
Dies ist ein privates Projekt. Ich stehe in keiner Verbindung zu GARDENA oder Husqvarna.

## Credits
Vielen Dank an GARDENA/Husqvarna für die Bereitstellung dieser [öffentliche API](https://developer.husqvarnagroup.cloud/apis/GARDENA+smart+system+API#/general) und besonderen Dank an Ihr Support-Team für die sehr gute und sehr schnelle Unterstützung.

Smartgarden-Logo: http://www.freepik.com Entworfen von Freepik

## Changelog
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

Copyright (c) 2020 - 2022 jpgorganizer, https://github.com/jpgorganizer 

smartgarden by jpgorganizer is licensed under a 
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License 
[(CC-BY-NC-SA-4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/) 
Based on a work at https://github.com/jpgorganizer/ioBroker.smartgarden. 
 

<!--- SVN: $Rev: 2832 $ $Date: 2022-06-13 14:12:51 +0200 (Mo, 13 Jun 2022) $ --->