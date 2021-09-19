---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mielecloudservice/README.md
title: ioBroker.MieleCloudService
hash: pxyqft6dlCHb2foiKkAC5Zx9+wuSpLGUHa0DXCUB9go=
---
![Logo](../../../en/adapterref/iobroker.mielecloudservice/admin/mielecloudservice.svg)

![Anzahl der Installationen](http://iobroker.live/badges/mielecloudservice-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.mielecloudservice.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Grizzelbee/ioBroker.mielecloudservice/badge.svg?targetFile=package.json)
![NPM](https://nodei.co/npm/iobroker.mielecloudservice.png?downloads=true)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/iobroker.mielecloudservice.svg)

# IoBroker.MieleCloudService [![Build-Status](https://travis-ci.com/Grizzelbee/ioBroker.mielecloudservice.svg?branch=master)](https://travis-ci.com/Grizzelbee/ioBroker.mielecloudservice)
## Beschreibung
Dieser Adapter dient zum Abrufen von Informationen zu all Ihren Miele@Home-Geräten von der offiziellen Miele Drittanbieter-API.
Egal ob direkt über WLAN oder XGW3000 Gateway verbunden. Es implementiert die **Miele 3rd Party API V1.0.5**

##sentry.io
Dieser Adapter verwendet sentry.io, um Details zu Abstürzen zu sammeln und diese automatisch an den Autor zu melden. Dafür wird das [ioBroker.sentry](https://github.com/ioBroker/plugin-sentry) Plugin verwendet. Bitte lesen Sie die [Plugin-Homepage](https://github.com/ioBroker/plugin-sentry) für detaillierte Informationen darüber, was das Plugin tut, welche Informationen gesammelt werden und wie Sie es deaktivieren können, wenn Sie den Autor nicht mit Ihren Informationen zu Abstürzen unterstützen möchten.

##Voraussetzungen
* Miele@Home-Benutzer (Smartphone-App)
* Miele@Home-Passwort (Smartphone-App)
* Miele Client_id (von https://www.miele.com/developer/)
* Miele Client_secret (von https://www.miele.com/developer/ )

## Installation
Gehen Sie zur Installation wie folgt vor:

1. Installieren Sie über den Admin mit dem
 * Stable Repo - um die aktuelle stabile Version zu erhalten
 * neuestes Repo - um die neueste Testversion zu erhalten (vielleicht nicht stabil)
 * über: https://github.com/Grizzelbee/ioBroker.mielecloudservice.git - um die neueste Entwicklungsversion zu erhalten
2. App-Account für Miele@Home in der Miele Smartphone App erstellen
3. Erstellen Sie ein Entwicklerkonto unter https://www.miele.com/f/com/en/register_api.aspx
4. Fügen Sie Ihre Miele-Geräte zur App hinzu (falls nicht automatisch hinzugefügt)
6. Geben Sie client_secret und client_id ein, die Sie vom Miele-Entwicklerteam erhalten haben, sowie Konto-ID und Passwort von der App.

## Steuern Sie Ihre Geräte
### Aktionen
Alle derzeit unterstützten und dokumentierten Aktionen für alle Geräte sind implementiert (API V1.0.5).
> Bitte denken Sie daran, dass Aktionen nur funktionieren, wenn Sie Ihr Gerät in den entsprechenden Zustand versetzen (z. B. Mobile Control, PowerOn, ...).
Weitere Informationen zu Aktionen finden Sie unter [Miele-Dokumentation](#documentation).

### Programme (Eingeführt in API V1.0.5)
Mit API V1.0.5 hat Miele einen neuen Endpunkt namens "/programs" eingeführt.
Die Unterstützung für diesen Endpunkt beginnt mit der Adapterversion 4.5.0. Es wird ein neuer Datenpunkt [device.Actions.Program] erstellt, der alle unterstützten Programme auflistet, die von Miele zurückgegeben werden.
**Bei Auswahl eines der Werte wird das Programm sofort ausgeführt!** Derzeit werden nur einfache Programme unterstützt. Z.B. Öfen benötigen einige zusätzliche Informationen - dies wird in einer zukünftigen Version implementiert.

Bei der Veröffentlichung des Adapters hat Miele ein paar Gerätekategorien dokumentiert, die diesen Endpunkt unterstützen und nur (zumindest für mich) eine Teilmenge davon wirklich funktioniert. Für mein Kaffeesystem, Waschmaschine und Trockner funktioniert es nur für das Kaffeesystem.
Aber Miele arbeitet daran und erweitert den Support regelmäßig.
Weitere Informationen finden Sie in der allgemeinen Miele API-Dokumentation (unten).

## Bekannte Probleme
* keiner

## Dokumentation
Bitte beachten Sie hauptsächlich die von Miele veröffentlichte API-Hauptdokumentation

* [Allgemeine Dokumentation](https://www.miele.com/developer/swagger-ui/index.html)
* [Voraussetzungen zum Ausführen einer Aktion auf einem Gerät](https://www.miele.com/developer/swagger-ui/put_additional_info.html)

Es gibt einige Datenpunkte in 2 Arten. Als menschenlesbarer Text und als Zahl.
Diese zu einem Textfeld gehörenden numerischen Datenfelder haben den gleichen Namen, aber ein "_raw" angehängt.
Die Felder, die eine allgemeine Bedeutung haben, sind unten aufgeführt.
Die nicht aufgeführten Felder unterscheiden sich in ihrer Bedeutung von Gerät zu Gerät und werden von Miele nicht dokumentiert.
Wenn Sie in Skripten auf diese Felder verweisen müssen, verwenden Sie immer die _raw-Werte.
Die Textwerte können sich in Zukunft ändern und sind auch von der Sprache abhängig.
Hier ist eine Liste, wofür diese Rohwerte stehen:

###Gerätetypen
 | Rohwert | Staat|
 |----------|-------|
 |1 | WASCHMASCHINE|
 |2 | TROCKNER|
 |7 | SPÜLMASCHINE|
 |8 | GESCHIRRSPÜLMASCHINE SEMI-PROF|
 |12 | OFEN|
 |13 | OFEN MIKROWELLE|
 |14 | KOCHFELD-HIGHLIGHT|
 |15 | DAMPFBACKOFEN|
 |16 | MIKROWELLE|
 |17 | KAFFEESYSTEM|
 |18 | HAUBE|
 |19 | KÜHLSCHRANK|
 |20 | GEFRIERSCHRANK|
 |21 | KÜHL-/GEFRIERKOMBINATION|
 |23 | STAUBSAUGER, AUTOMATISCHER ROBOTERSTAUBSAUGER|
 |24 | WASCHTROCKNER|
 |25 | GESCHIRRWÄRMER|
 |27 | KOCHFELDINDUKTION|
 |28 | KOCHFELD GAS|
 |31 | DAMPFBACKOFENKOMBINATION|
 |32 | WEINSCHRANK|
 |33 | WEINKONDITIONIEREINHEIT|
 |34 | WEINLAGERKONDITIONIERUNGSEINHEIT|
 |39 | DOPPELBACKOFEN|
 |40 | DOPPELDAMPFBACKOFEN|
 |41 | DOPPEL-DAMPFBACKOFEN-KOMBINATION|
 |42 | DOPPELTE MIKROWELLE|
 |43 | DOPPELTE MIKROWELLE|
 |45 | DAMPFBACKOFEN MIKROWELLEN-KOMBINATION|
 |48 | VAKUUMSCHUBLADE|
 |67 | DIALOGOFEN|
 |68 | WEINSCHRANK-GEFRIERKOMBINATION|

### Status/Status
 | Rohwert | Staat|
 |----------|-------|
 |1| AUS|
 |2| STAND_BY|
 |3| PROGRAMMIERT|
 |4| PROGRAMMED_WAITING_TO_START|
 |5| LAUFEN|
 |6| PAUSE|
 |7| END_PROGRAMMED|
 |8| AUSFALL|
 |9| PROGRAMME_INTERRUPTED|
 |10| LEERLAUF|
 |11| RINSE_HOLD|
 |12| SERVICE|
 |13| SUPERFREEZING|
 |14| ÜBERKÜHLUNG|
 |15| ÜBERHITZUNG|
 |144| STANDARD|
 |145| GESPERRT|
 |146| SUPERCOOLING_SUPERFREEZING|
 |255| Gerät offline|

### Programmtyp/Programmart
| Rohwert | Staat|
|----------|-------|
|0 | Normalbetrieb |
|1 | Eigenes Programm |
|2 | Automatikprogramm |
|3 | Reinigungs-/Pflegeprogramm |

### Trocknungsschritt/Trockenstufe
 | Rohwert | Staat|
 |----------|-------|
 |0 | Extra trocken|
 |1 | Normal Plus|
 |2 | Normal|
 |3 | Leicht trocken|
 |4 | Handbügeleisen Stufe 1|
 |5 | Handbügeleisen Stufe 2|
 |6 | Bügeleisen|

###Programmbezeichnung
| Rohwert | Staat | verfügbar für |
|-----------|-------------------------|-----------------|
| 1 | "Baumwolle" / "Baumwolle" | Waschmaschine |
| 3 | "Pflegeleicht" | Waschmaschine |
| 4 | "Feinwäsche" | Waschmaschine |
| 8 | "Wolle" | Waschmaschine |
| 9 | "Seide" | Waschmaschine |
| 21 | "Pumpen/Schleudern" | Waschmaschine |
| 23 | "Oberhemden" | Waschmaschine |
| 27 | "Imprägnieren" | Waschmaschine |
| 29 | "Sportwäsche" | Waschmaschine |
| 31 | "Automatisches Plus" | Waschmaschine |
| 37 | "Im Freien" | Waschmaschine |
| 48 | "Flusen ausspülen" | Waschtrockner |
| 50 | "Dunkle Wäsche" | Waschtrockner |
| 52 | "Nur Spülen/Stärken" | Waschmaschine |
| 122 | "Express 20" | Waschtrockner |
| 123 | "Dunkles/Jeans" | Waschmaschine |

###Programmphase
| Rohwert | Staat| verfügbar für |
|----------|-------|---------------|
|258 | "einweichen" | Waschmaschine |
|260 | "Waschen" / "Waschen" | Waschmaschine |
|261 | "Spülen" / "Spülen" | Waschmaschine |
|265 | "Pumpen" | Waschmaschine |
|266 | "Schleudern" / "Spinnen" | Waschmaschine |
|267 | "Strickschutz" / "" | Waschmaschine |
|268 | "Ende" / "Ende" | Waschmaschine |
|256 | "Vorbügeln" | Waschmaschine |
|512 | "Ende" / "Fertig" | Wäschetrockner |
|514 | "Trocknen" / "Trocknen" | Waschtrockner, Wäschetrockner |
|519 | "Abkühlen" / "Abkühlen" | Waschtrockner |
|521 | "Strickschutz" / "" | Wäschetrockner |
|522 | "Ende" / "Fertig" | Wäschetrockner |
|531 | "Komfortkühlen" | Wäschetrockner |
|532 | "Flusen ausspülen" | Waschtrockner |

## Urheberrechte ©
Copyright (c) 2019, 2021 grizzelbee <open.source@hingsen.de>

## Changelog

### V4.5.0 (2021-09-05) (Invincible)
* (grizzelbee) New: [164](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/164) fixed bug in SignalFailure and signalInfo when havin no value
* (grizzelbee) New: [155](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/155) fixed >missing object< bug on arrays 
* (grizzelbee) New: [154](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/154) Reintroduced TargetTemp to washer dryers
* (grizzelbee) New: [140](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/140) Switched from data polling to server sent events (push data)
* (grizzelbee) New: [71](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/71) If there is no internet connection on startup retry connecting until connection is established 
* (grizzelbee) Fix: estimatedEndTime won't be shown anymore when device is off
* (grizzelbee) Fix: Don't rethrowing errors in APISendRequest anymore
* (grizzelbee) Fix: fixed a few minor bugs
* (grizzelbee) Upd: Updated dependencies
* (grizzelbee) New: Added some additional API languages newly supported by Miele
* (grizzelbee) New: Added support for Miele API V1.0.5
* (grizzelbee) New: Added correct tier of adapter to io-package
* (grizzelbee) New: Added more program phases for tumble dryers to documentation

### V4.2.0 (2021-05-17) (A new Dimension)
* (grizzelbee) New: Adding Pause action to dish-washers

### V4.1.0 (2021-05-15) (Carry me over)
* (grizzelbee) New: [149](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/149) Adding support (Start, Stop, Pause) for Miele Scout RX2 vacuum cleaner robots
* (Stan23)     New: Added new program phase  soak/Einweichen

### V4.0.22 (2021-05-06) (Twisted mind)
* (grizzelbee) Fix: [142](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/142) Reintroduced TargetTemp for washing machines

### V4.0.21 (2021-05-03) (The Edge)
* (grizzelbee) Fix: Fixed accidental function name: createStateSpinAPIStartActionningSpeed
* (grizzelbee) Fix: Fixed State value to set for "*.PlateStep_1" has to be type "number" but received type "string"

### V4.0.20 (2021-04-30) (Sleepwalkers)
* (grizzelbee) Fix: [137](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/137) Fixed Read-only state "info.connection" has been written without ack-flag with value "false"
* (grizzelbee) Fix: [138](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/138) Fixed State value to set for ".Schleuderdrehzahl" has wrong type "string" but has to be "number"
* (grizzelbee) Fix: [139](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/139) Fixed State value to set for ".ACTIONS.Light" has wrong type "number" but has to be "string" 
* (grizzelbee) Upd: Changed device group from channel to folder  as documented [here](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/objectsschema.md)

### V4.0.19 (2021-04-29) (The scarecrow)
* (grizzelbee) Fix: Fixed light switch bug causing an exception when switching - 2nd attempt
* (grizzelbee) Fix: Fixed No-Icon Bug when appliance is unknown

### V4.0.18 (2021-04-28) (Ghostlights)
* (grizzelbee) Fix: Fixed light switch bug causing an exception when switching 

### V4.0.17 (2021-04-27) (Ghost in the moon)
* (grizzelbee) New: Added ioBroker sentry plugin to report issues automatically
* (grizzelbee) New: Added Light-Switch to washing machines, Tumble Dryers, Washer dryers and Dish washers
* (grizzelbee) Upd: Updated dependencies

> **Hint:** 
> The behavior of the light-switch has slightly changed with this release. It not only tests the action capabilities of 
> the device but also shows the state of the light state delivered by the API. If no actions are reported by the API, the 
> switch will be without function and only show the current state. If actions have been reported the switch will work as you expect.
> If your device reports no light state and no actions the switch will show 'None' and won't do anything.

### V4.0.16 (2021-04-21) (Black Orchid)
* (grizzelbee) Fix: Units for EcoFeedback will be shown now, even machine is not running during setup
* (stan23)     New: added new program states

### V4.0.15 (2021-04-19) (Moonglow)
* (grizzelbee) Fix: [130](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/130) targetTemp for fridges and freezers will now correctly been updated in action section with current values

### V4.0.14 (2021-04-18) (Alchemy)
* (grizzelbee) Fix: [127](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/127) targetTemp for fridges caused exception and crash of adapter

### V4.0.13 (2021-04-12) (The toy master)
* (grizzelbee) Fix: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) targetTemp addresses zones for fridges and freezers dynamically now

### V4.0.12 (2021-04-12) (Promised land)
* (grizzelbee) Fix: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) targetTemp addresses zones for fridges and freezers dynamically now

### V4.0.11 (2021-04-11) (Cry just a little)
* (grizzelbee) Fix: targetTemp min and max values are now taken from API - no constant values anymore

### V4.0.10 (2021-04-10) (Another angel down)
* (grizzelbee) Fix: targetTemp min and max values are now taken from API - no constant values anymore

### V4.0.9 (2021-04-09) (Farewell)
* (grizzelbee) Fix: Errors during action execution will be shown correctly
* (grizzelbee) Fix: Actions will be executed correctly

### V4.0.8 (2021-04-09) (The seven angels)
* (grizzelbee) Fix: fixed datatype of VentilationStep data point
* (grizzelbee) Fix: fixed ventilation step switch for hoods (attempt 4)

### V4.0.7 (2021-04-09) (Lost in space)
* (grizzelbee) Fix: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) added missing path to object ID; data point will be created in the correct place now
* (grizzelbee) New: targetTemp min and max values are now taken from API - no constant values anymore

### V4.0.6 (2021-04-08) (The great mystery)
* (grizzelbee) Fix: fixes Light switch for hoods and other devices supporting light
* (grizzelbee) Fix: fixes ventilation step switch for hoods (attempt 3)

### V4.0.5 (2021-04-08) (The haunting)
* (grizzelbee) Fix: fixes ventilation step switch for hoods (attempt 2)
* (grizzelbee) Fix: fixes error on creating TargetTemperature data points

### V4.0.4 (2021-04-07) (Wastelands)
* (grizzelbee) Fix: fixes ventilation step switch for hoods
* (grizzelbee) Fix: fixed missing getLightState

### V4.0.3 (2021-04-07) (The raven child)
* (grizzelbee) Fix: [109](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/109) fixes 404 error when querying possible actions for device.
* (grizzelbee) Fix: fixes errors when executing actions on devices with API-Id!=fabNumber

### V4.0.2 (2021-04-07) (Angel of Babylon)
* (grizzelbee) Fix: [107](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/107) fixes #107 and 404 error when device is unknown.

### V4.0.1 (2021-04-06) (Sign of the cross)
* (grizzelbee) Fix: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) setting the targetTemperature should work now.
* (grizzelbee) Fix: [96](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/96) Added missing ACTIONS.Action_Information again
* (grizzelbee) Fix: [97](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/97) removed unneeded additional "VentilationStep/Lüfterstufe" in path and fixed warning with this. VentilationStep-switch should work properly now.
* (grizzelbee) Fix: [98](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/98) Color-Action has now valid type 'String'
* (grizzelbee) Fix: [102](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/102) Fixed ACTIONS.VentilationStep has no existing object
* (grizzelbee) Fix: Power switch is write protected now when in state 'None'. State 'None' means: No action permitted.
* (grizzelbee) Fix: Light switch is write protected now when in state 'None'. State 'None' means: No action permitted.
* (grizzelbee) Fix: http error 404 will be catched when requesting device actions

### V4.0.0 (2021-03-18) (Symphony of life)
> ***Hint:*** The adapter received a complete code refactoring! This means that most of the code has been changed and some parts are working now differently than ever before. Update with care and read the change log!
* (grizzelbee) New: FULL support of Miele cloud API v1.0.4
* (grizzelbee) Upd: [83](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/83) estimatedEndTime isn't shown anymore after the device has finished
* (grizzelbee) Upd: [85](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/85) full code refactoring and split into multiple files. 
* (grizzelbee) Upd: [86](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/86) every folder and device now gets a nice little icon
* (grizzelbee) Upd: [89](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/89) Washer dryers are fully supported now
* (grizzelbee) Upd: [90](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/90) implemented targetTemperature for fridges & freezers
* (grizzelbee) Upd: Devices get fully created on startup and aren't modified afterwards - only updated
* (grizzelbee) Upd: New folder ecoFeedback to group ecoFeedback states 
* (grizzelbee) Upd: New folder IDENT to group ident states
* (grizzelbee) Upd: Removed signalActionRequired - since there is no signalDoor for washing machines, dryers and dishwashers this approach doesn't work
* (grizzelbee) Upd: All folders and states which are being created depend on the capabilities of their devices as described in [this Miele documentation](https://www.miele.com/developer/assets/API_V1.x.x_capabilities_by_device.pdf). So there shouldn't be useless states anymore caused by the generic Miele cloud API.

### V3.0.2 (2021-03-05)
* (grizzelbee) Fix: [79](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/79) When a devices serial is missing, the identNumber is assigned instead.
* (grizzelbee) Upd: Changed folder name cooktops to hobs since this is the more common name
* (grizzelbee) Upd: added PowerOn/Off buttons for Coffee-systems & hoods
* (grizzelbee) Upd: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) testing actions better before sending to permit errors

### V3.0.1 (2021-02-25)
> *Hint:* Action_Information and Action_Status objects are created on first action execution and contain infos to the last executed action.
> Please take care of notes regarding [Controlling your devices](#Controlling your devices).
* (grizzelbee) Upd: Improved logging in some parts - objects get stringified.
* (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Actions are working again
* (grizzelbee) Upd: Actions are tested before sending whether they are permitted in current device state
* (grizzelbee) Upd: estimatedEndTime doesn't show seconds anymore
* (grizzelbee) Upd: Improved documentation
* (grizzelbee) Upd: removed unused function decrypt
* (grizzelbee) Upd: removed superfluent parameters


### V3.0.0 (2021-02-18)
> Hint: ecoFeedback objects are created on the first run of the device. This allows to only create them, when they contain data.
* (grizzelbee) New: BREAKING CHANGE: Making use of build-in password de-/encryption. This raises the need to re-enter your passwords again, because the old ones can't be decrypted anymore.
* (grizzelbee) New: [70](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/70) Implements Miele API 1.0.4
* (grizzelbee) New: [64](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/64) Introduces data point estimatedFinishingTime
* (grizzelbee) New: [54](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/54) Poll interval can now freely be selected in seconds and minutes
* (grizzelbee) Upd: [73](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/73) BREAKING CHANGE: Removed white-spaces from any ID in device tree. This creates completely new device trees. So please delete the old ones.
* (grizzelbee) Upd: removed david-dm badge
* (grizzelbee) Upd: updated dependencies
* (grizzelbee) Fix: added passwords to encryptedNative
* (grizzelbee) Fix: added passwords to protectedNative
* (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) added missing info.connection object to io-package
* (grizzelbee) Fix: [63](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/63) Fixed new Warnings introduced with js-controller 3.2
* (grizzelbee) Fix: [74](https://github.com/Grizzelbee/ioBroker.mielecloudservice/issues/74) Light-Actions should work now

### V2.0.3 (2020-09-15)
* (grizzelbee) Upd: Updated country list in config dialog
* (grizzelbee) New: Some more debug code

### V2.0.2 (2020-09-15)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on failed authentication preventing a valid error message

### V2.0.1 (2020-09-14)
* (grizzelbee) New: Added some debug Code to find an Error
* (grizzelbee) Fix: fixed error on logout while invalidating token

### V2.0.0 - Support for Miele API V1.0.3 (2020-08-25)
Some breaking changes in this release. Some data points changed their type. May require fixes in scripts. **Update with care!**
Due to the fix that data points with invalid values aren't created any longer, I recommend deleting all data points in Object view.
* (grizzelbee) Change: New Icon
* (grizzelbee) Fix: Number-data points are no longer created as strings due to their unit. They are correct numbers with units now.
* (grizzelbee) Fix: Unit °Celsius is now shown as °C - not longer °Celsius
* (grizzelbee) New: Introduced support for °Fahrenheit
* (grizzelbee) New: Introduced support for new Value "plateStep" for Hobs.
* (grizzelbee) New: Performing a LogOut from Miele API on shutdown to invalidate the Auth-Tokens.
* (grizzelbee) Fix: Data points with invalid values (null/-32768) are no longer created.

### V1.2.4 (2020-06-09)
* (grizzelbee) Fix: fixed No-Data Bug (introduced in V1.2.3)

### V1.2.3 (2020-06-07)
* (grizzelbee) Upd: fixed snyk badge
* (grizzelbee) Upd: Improved error handling

### V1.2.2 (2020-05-23)
* (grizzelbee) Upd: removed node 8 from testing on travis.com
* (grizzelbee) Fix: signalActionRequired should work better now
* (grizzelbee) Upd: Updated documentation
* (grizzelbee) Upd: Improved error handling in function APISendRequest
* (grizzelbee) Fix: Moved testing of Config to On(Ready) and fixed unit tests with this.

### V1.2.1 (2020-04-22)
* (grizzelbee) New: Introduced new boolean state (**signalActionRequired**) that indicates that the machine has finished running, but a human action, like putting the wet clothes to the dryer, ... is needed. State is cleared automatically when the door of the appliance is opened, or it is restarted. State is implemented for washing machines, tumble dryers, washer dryer and dishwashers. **Doesn't work perfectly currently.**
* (grizzelbee) Upd: Updated Documentation
* (grizzelbee) Fix: Fixed warnings with js-Controller >=3.0 (Issue #23)

### V1.2.0 (2020-04-18)
* (grizzelbee) New: Added new boolean state (**Connected**) that indicates whether the device is connected to WLAN or a gateway.
* (grizzelbee) New: Added new boolean state (**signalInUse**) that indicates whether the device is switched off (false) or in Use (true).
* (grizzelbee) Change: replaced the deprecated http-library **request** with **axios**
* (grizzelbee) Change: Made functions communicating with API asynchronous

### V1.1.0 (2020-03-07)
* (grizzelbee) New: Added Actions - Implemented all currently supported and documented Actions for all devices.
> Please remember that Actions will only work if you put your device into the appropriate state (e.g. Mobile Control)
please refer to [Miele-Documentation](#documentation) for more Information on actions.

### V1.0.5 (2020-02-14)
* (grizzelbee) removed node-schedule as a dependency
* (grizzelbee) implemented scheduling via setTimeout, which raises the opportunity
  to schedule with less than a minute in the future

### V1.0.4 (2020-02-12)
* (grizzelbee) removed unneeded setTimeout from main
* (grizzelbee) Clearing scheduler on unload of adapter
* (grizzelbee) Minor updates and fixed typos in Readme

### V1.0.3 (2020-02-06)
* (grizzelbee) removed an overseen logging of Passwords
* (grizzelbee) Fixed createTemperatureDatapoint to work with less than 3 values delivered from API
* (grizzelbee) Added some documentation
* (grizzelbee) Started implementation of DeviceActions


### V1.0.2 (2020-02-05)
* (grizzelbee) removed any logging of Passwords
* (grizzelbee) Fixed bug in config interface introduced during password encryption that config values aren't loaded properly

### V1.0.1 (2020-02-04)
* (grizzelbee) Fixes in environment for getting adapter into the Repo
* (grizzelbee) Passwords are stored encrypted now

### V1.0.0 (2020-02-03)
* (grizzelbee) renamed to MieleCloudService to get the ability to publish; the old Name is still blocked by hash99
* (grizzelbee) Rewritten adapter from scratch - therefore it's incompatible with prior versions and needs to be installed freshly.
* (grizzelbee) Fix: fixed all build-errors
* (grizzelbee) Fix: Fixed "NRefreshToken is not a function"-Bug
* (grizzelbee) Chg: removed Push-API checkbox (maybe introduced newly when API supports this)
* (grizzelbee) Chg: New Icon
* (grizzelbee) New: added support for non-german Miele-Accounts (ALL should be included)
* (grizzelbee) Complete new layout of data points
* (grizzelbee) Device types are grouped now

### 0.9.1 (2019-07-26)
* (grizzelbee) Fix: Fixed small bug introduced in V0.9.0 throwing an exception in debugging code

### 0.9.0 (2019-07-26)
* (grizzelbee) Upd: New versioning due to completeness and stability of the adapter (about 90%)
* (grizzelbee) New: make poll interval configurable  (currently 1,2,3,4,5,7,10,15 Minutes)
* (grizzelbee) Fix: fixed ESLint config
* (grizzelbee) Upd: Changed order of config fields in UI
* (grizzelbee) New: Set 5 Minutes poll interval and english response language as default to get initial values
* (grizzelbee) New: Parent-Datapoint of time values will be used to get a pretty readable time in the format h:mm. The deeper datapoints 0 and 1 will still be updated, but his will be removed in a future version to reduce workload.

### 0.0.5 (2019-07-25)
* (grizzelbee) Upd: some code maintenance
* (grizzelbee) New: added reply-language to config
  - Miele API is currently able to reply in German or English, now you can choose.
* (grizzelbee) New: created new Icon
* (grizzelbee) Fix: fixed translation issues and translated adapter UI using gulp
* (grizzelbee) Upd: Made changes to travis requested by apollon77

### 0.0.4
* (hash99) add devices configuration

### 0.0.3
* (hash99) adapter conform

### 0.0.1
* (hash99) initial release

## License
The MIT License (MIT)

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