---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.husqvarna-automower-connect/README.md
title: ioBroker.husqvarna-automower-connect
hash: 4ZV+eWHMuoHVUHtr6ACeP84GiVkKc3U/b7ljE4Y3Q+Q=
---
![Logo](../../../en/adapterref/iobroker.husqvarna-automower-connect/admin/husqvarna-automower-connect.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.husqvarna-automower-connect.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.husqvarna-automower-connect.svg)
![Anzahl der Installationen](https://iobroker.live/badges/husqvarna-automower-connect-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/husqvarna-automower-connect-stable.svg)
![NPM](https://nodei.co/npm/iobroker.husqvarna-automower-connect.svg?downloads=true)
![Spenden](https://img.shields.io/badge/Donate-PayPal-blue.svg)
![Kauf mir einen Kaffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)

# IoBroker.husqvarna-automower-connect
![Test und Freigabe](https://github.com/bueste/ioBroker.husqvarna-automower-connect/workflows/Test%20and%20Release/badge.svg)

## Husqvarna-automower-connect-Adapter für ioBroker
Dieser Adapter ruft Daten von Ihrem Husqvarna Rasenmäher von [https://developer.husqvarnagroup.cloud](https://developer.husqvarnagroup.cloud/) über die „neue“ WebSocket-Verbindung und funktioniert mit der [Automower Connect API].](https://developer.husqvarnagroup.cloud/apis/Automower+Connect+API) v1.0.0/OAS 3.0 ab.

Dies ist ein vollständiger, aktiv gepflegter Fork von [ice987987/ioBroker.husqvarna-automower](https://github.com/ice987987/ioBroker.husqvarna-automower). Er behebt mehrere Schreibbefehle (`START`, `STARTINWORKAREA`, `PARK`, `CUTTINGHEIGHT`, `DATETIME`, `HEADLIGHT`), die aufgrund eines fehlerhaften Anfragetextes von der API abgelehnt wurden, und bietet die vollständige Abdeckung der offiziellen API: Fehlerbestätigung, Schnitthöhe pro Arbeitsbereich (aktiviert/deaktiviert), Sperrzone (aktiviert/deaktiviert) und den Verlauf von Fehler- und Ereignismeldungen. Ein großes Dankeschön an ice987987 für den ursprünglichen Adapter, auf dem dieses Projekt basiert.

## Haftungsausschluss
Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele. Husqvarna Automower ist eine Marke der Husqvarna Group.

## Installationsvoraussetzungen
- node.js >= v22 ist erforderlich
- ioBroker.js-controller >=6.0.11 ist erforderlich
- ioBroker.admin >= v7.8.23 ist erforderlich
Dieser Adapter verwendet die Husqvarna Automower Connect API, um Daten (über WebSocket) anzufordern und Befehle (über die REST API) für Ihren Husqvarna Rasenmäher zu senden.

Bitte erstellen Sie ein Konto und generieren Sie Ihre persönlichen `Application key` und `Application secret`, indem Sie [Diese Anweisungen finden Sie unter [https://developer.husqvarnagroup.cloud/docs/get-started](https://developer.husqvarnagroup.cloud).](https://developer.husqvarnagroup.cloud/) folgen. _(`Redirect URLs` könnte `http://localhost:8080` sein)_

## Kontrolle
Sie können die folgenden Werte an Ihren Husqvarna-Rasenmäher senden:

- `.ACTIONS.PAUSE`: Mäher anhalten
- `.ACTIONS.PARKUNTILNEXTSCHEDULE`: Parken des Rasenmähers bis zum nächsten geplanten Lauf
- `.ACTIONS.PARKUNTILFURTHERNOTICE`: Parkmäher bis auf Weiteres, außer Kraft setzender Zeitplan
- `.ACTIONS.park.PARK`: Parkt den Rasenmäher für die Dauer `.ACTIONS.park.parkTime` (in Minuten) und überschreibt damit den Zeitplan.
- `.ACTIONS.RESUMESCHEDULE`: Mähen gemäß Zeitplan fortsetzen
- `.ACTIONS.start.START`: Startet den Mäher und mäht für eine Dauer von `.ACTIONS.start.startTime` (in Minuten), wobei der Zeitplan überschrieben wird.
- `.ACTIONS.startInWorkArea.STARTINWORKAREA`: Startet den Mäher und mäht für eine Dauer von `.ACTIONS.startInWorkArea.duration` (in Minuten, optional; bei Null (0) läuft die Überschreibung unbegrenzt) im Bereich mit der ID `.ACTIONS.startInWorkArea.workAreaId`[^4]
- `.ACTIONS.CUTTINGHEIGHT`: Aktualisiere die Schnitthöhe und rufe den aktuellen Status ab[^2][^3]
- `.ACTIONS.DATETIME`: Datum und Uhrzeit in Sekunden seit dem 1. Januar 1970 im Mähwerk. Der Mähwerk verwendet diesen Zeitstempel, um den Zeitplan auszulösen. Derzeit kann der Zeitstempel nicht vom Mähwerk abgerufen werden.
- `.ACTIONS.HEADLIGHT`: Scheinwerfer aktualisieren und aktuellen Status abrufen[^4]
- `.ACTIONS.schedule.SET`: Aktualisiert den Mähplan mit `.ACTIONS.schedule.[i].start` (Minuten nach Mitternacht), `.ACTIONS.schedule.[i].duration` (in Minuten), `.ACTIONS.schedule.[i].monday`, `.ACTIONS.schedule.[i].tuesday`, `.ACTIONS.schedule.[i].wednesday`, `.ACTIONS.schedule.[i].thursday`, `.ACTIONS.schedule.[i].friday`, `.ACTIONS.schedule.[i].saturday`, `.ACTIONS.schedule.[i].sunday` und `.ACTIONS.schedule.[i].workAreaId` und ruft den aktuellen Status ab [^2]
- `.ACTIONS.REFRESHSTATISTICS`: Aktualisiert Statistikwerte außerhalb des regulären konfigurierten Zeitplans
- `.ACTIONS.RESETCUTTINGBLADEUSAGETIME`: Setzt den Zähler für die Nutzungsdauer des Schneidmessers zurück (`.statistics.cuttingBladeUsageTime`). Dieselbe Funktion wie in der Automower Connect App; nach dem Messerwechsel verwenden.
- `.ACTIONS.CONFIRMERROR`: Bestätigt einen nicht schwerwiegenden Mäherfehler (nur verfügbar, wenn `.capabilities.canConfirmError` auf `true` gesetzt ist, und funktioniert nur, solange `.mower.isErrorConfirmable` auf `true` gesetzt ist)
- `.ACTIONS.workAreaSettings.APPLYWORKAREASETTINGS`: Aktualisiere `.cuttingHeight` (0-100%) und/oder `.enabled` für den Arbeitsbereich, der durch `.ACTIONS.workAreaSettings.workAreaId` angegeben wird[^4]
- `.ACTIONS.stayOutZoneSettings.APPLYSTAYOUTZONESETTINGS`: Aktualisiere `.enabled` für die durch `.ACTIONS.stayOutZoneSettings.zoneId` angegebene Stay-Out-Zone (nicht möglich, solange `.stayOutZones.dirty` `true` ist)[^6]

    [^2]: Do not use for 550 EPOS and Ceora due to [Husqvarna's API-limitation](https://developer.husqvarnagroup.cloud/apis/Automower+Connect+API#/readme)

[^3]: not supported models: 405X, 415X and 435X AWD (you will get the error "This mower use missions and can not be updated by this endpoint")

    [^6]: only available if `.capabilities.stayOutZones` is `true`

## Verfügbare Werte (schreibgeschützt)
Ihr Husqvarna-Rasenmäher liefert Ihnen folgende Werte:

- `.battery.batteryPercent`: Informationen über die Batterie im Automower.
- `.capabilities.canConfirmError`: Wenn der Automower den Befehl "Fehler bestätigen" unterstützt. Der Fehler muss außerdem bestätigbar sein.
- `.capabilities.headlights`: Gibt an, ob der Automower Scheinwerfer unterstützt. Ist der Wert „false“, sind keine Scheinwerfer verfügbar.
- `.capabilities.position`: Gibt an, ob der Automower GPS-Positionierung unterstützt. Ist der Wert „false“, sind keine Positionsangaben verfügbar.
- `.capabilities.stayOutZones`: Gibt an, ob der Automower Sperrzonen unterstützt. Ist der Wert „false“, sind keine Sperrzonen verfügbar.
- `.capabilities.workAreas`: Gibt an, ob der Automower Arbeitsbereiche unterstützt. Ist der Wert „false“, stehen keine Arbeitsbereiche zur Verfügung.
- `.metadata.connected`: Ist der Rasenmäher aktuell mit der Cloud verbunden? Der Rasenmäher muss verbunden sein, um Befehle an ihn senden zu können.
- `.metadata.statusTimestamp`: Zeitstempel der letzten Statusaktualisierung in Millisekunden seit dem 1. Januar 1970, 00:00:00 UTC. HINWEIS: Dieser Zeitstempel wird serverseitig und nicht vom Mäher generiert.
- `.mower.mode`: Informationen über den aktuellen Modus des Mähers.
- `.mower.activity`: Informationen über den aktuellen Status des Rasenmähers.
- `.mower.inactiveReason`: Inaktivitätsgrund
- `.mower.state`: Informationen über den aktuellen Status des Rasenmähers.
- `.mower.workAreaId`: Aktuelle Arbeitsbereichs-ID. Wird angezeigt, wenn der Mäher Arbeitsbereiche unterstützt und sich in einem Arbeitsbereich befindet. Ist kein Arbeitsbereich ausgewählt, wird dieses Attribut nicht gesetzt.
- `.mower.errorCode`: Informationen über den aktuellen Fehlerstatus des Rasenmähers.
- `.mower.errorTimestamp`: Zeitstempel des letzten Fehlercodes in Millisekunden seit dem 1. Januar 1970, 00:00:00 Uhr Ortszeit. HINWEIS! Dieser Zeitstempel bezieht sich auf die Ortszeit des Rasenmähers und stammt direkt vom Rasenmäher.
- `.mower.isErrorConfirmable`: Wenn der Rasenmäher einen Fehlercode hat, gibt dieses Attribut an, ob der Fehler bestätigbar ist.
- `.planner.override`: Der Planner verfügt über eine Überschreibungsfunktion, mit der die vom Kalender festgelegte Operation überschrieben werden kann. Es ist jeweils nur eine Überschreibung möglich, die ab sofort und für einen bestimmten Zeitraum gilt.
- `.planner.nextStartTimestamp`: Zeitstempel für den nächsten automatischen Start in Millisekunden seit dem 1. Januar 1970, 00:00:00 Uhr Ortszeit. Wenn der Rasenmäher geladen wird, gibt der Wert die voraussichtliche Zeit an, zu der er die Ladestation verlässt. Ist der Wert 0, sollte der Rasenmäher jetzt starten. HINWEIS: Dieser Zeitstempel bezieht sich auf die Ortszeit des Rasenmähers und stammt direkt vom Gerät.
- `.planner.restrictedReason`: Eingeschränkter Grund.
- `.planner.externalReason`: Externer Grund, der z. B. von IFTTT, Google Assistant oder Amazon Alexa festgelegt wurde. Bereiche: 1000 bis 1999: Google Assistant; 2000 bis 2999: Amazon Alexa; 3000 bis 3999: Entwicklerportal; 4000 bis 4999: IFTTT, Berücksichtigung von Wildtieren – 4000, Frost- und Regenschutz – 4001 und Kalenderverbindung – 4002; 100000 bis 199999: IFTTT-Applets; 200000 bis 299999: Entwicklerportal.
- `.positions.latitude`: Positionsbreite[^5]
- `.positions.longitude`: Position Längengrad[^5]
- `.positions.latlong`: Position "latitude;longitude"[^5]
- `.positions.positions`: Positionen[^5]
- `.stayOutZones.dirty`: Gibt an, ob die Sperrzonen mit der Husqvarna-Cloud synchronisiert sind. Ist die Karte fehlerhaft, können Sperrzonen nicht aktiviert oder deaktiviert werden.[^4]
- `.stayOutZones.zones`: Liste aller Sperrzonen für den Automower.[^4]
- `.statistics.cuttingBladeUsageTime`: Die Anzahl der Sekunden seit dem letzten Zurücksetzen des Zählers für die Nutzung der Schneidklinge.[^4]
- `.statistics.numberOfChargingCycles`: Anzahl der Ladezyklen.[^4]
- `.statistics.numberOfCollisions`: Die Gesamtzahl der Kollisionen.[^4]
- `.statistics.totalChargingTime`: Gesamtladezeit in Sekunden.[^4]
- `.statistics.totalCuttingTime`: Gesamte Schnittzeit in Sekunden.[^4]
- `.statistics.totalDriveDistance`: Die insgesamt zurückgelegte Strecke in Metern. Es handelt sich um einen berechneten Wert, der auf der Gesamtlaufzeit multipliziert mit der Durchschnittsgeschwindigkeit des Mähers basiert und vom jeweiligen Modell abhängt.[^4]
- `.statistics.totalRunningTime`: Die Gesamtlaufzeit in Sekunden. (Die Radmotoren laufen seit einiger Zeit.)[^4]
- `.statistics.totalSearchingTime`: Die gesamte Suchzeit in Sekunden.[^4]
- `.system.id`: Geräte-ID
- `.system.model`: Der Modellname des Automowers
- `.system.name`: Der Name, den der Benutzer dem Automower beim Koppeln gegeben hat.
- `.system.serialNumber`: Die Seriennummer für den Automower
- `.system.type`: Gerätetyp
- `.workAreas.[workAreaId].workAreaId`: Arbeitsbereichs-ID[^4]
- `.workAreas.[workAreaId].name`: Name des Arbeitsbereichs[^4]
- `.workAreas.[workAreaId].cuttingHeight`: Schnitthöhe in Prozent (0 ... 100%)[^4]
- `.workAreas.[workAreaId].enabled`: Gibt an, ob der Arbeitsbereich aktiviert oder deaktiviert ist.[^4]
- `.workAreas.[workAreaId].progress`: Der Fortschritt eines Arbeitsvorgangs. Nur verfügbar für EPOS-Mäher und systematische Mähbereiche.[^4]
- `.workAreas.[workAreaId].lastTimeCompleted`: Zeitstempel in Sekunden seit dem 1. Januar 1970, wann der Arbeitsbereich zuletzt bearbeitet wurde. Der Zeitstempel entspricht der Ortszeit des Mähers. Nur verfügbar für EPOS-Mäher und systematische Mähbereiche.
- `.workAreas.[workAreaId].lastTimeAbandoned`: Zeitstempel in Sekunden seit dem 1. Januar 1970, wann der Arbeitsbereich zuletzt verlassen wurde. Nur verfügbar für EPOS-Mäher und systematische Mähbereiche.
- `.workAreas.[workAreaId].type`: Typ des Arbeitsbereichs (`zufälliges` oder `systematisches` Mähen).
- `.workAreas.[workAreaId].useGlobalCuttingHeight`: Wenn `true`, wird die globale Schnitthöheneinstellung anstelle von `.cuttingHeight` dieses Arbeitsbereichs verwendet.
- `.workAreas.[workAreaId].orientation`: Konfigurierte Mährichtung in Grad. Nur für systematische Mähbereiche.
- `.workAreas.[workAreaId].orientationShift`: Konfigurierte Verschiebung zwischen den Mähvorgängen in Grad. Nur für systematisch gemähte Arbeitsbereiche.
- `.workAreas.[workAreaId].currentOrientation`: Aktuelle Mährichtung in Grad. Nur für systematische Mähbereiche.
- `.messages.messages`: Vollständige Liste der Fehler-/Ereignismeldungen, wie sie von der API zurückgegeben werden (JSON-Array, neueste zuerst, max. ~1000 Einträge).
- `.messages.lastTime`, `.messages.lastCode`, `.messages.lastSeverity`, `.messages.lastLatitude`, `.messages.lastLongitude`: Komfortstatus mit der aktuellsten Nachricht, aktualisiert sowohl per Polling als auch live über das WebSocket-Push-Ereignis `message`.

<!-- `.workAreas.[workAreaId].calendar`: Informationen zu den Kalenderaufgaben. Ein Automower® kann mehrere Aufgaben haben. Wenn der Mäher Arbeitsbereiche unterstützt, ist die Eigenschaft workAreaId erforderlich, um die Aufgabe einem Arbeitsbereich zuzuordnen.[^4] -->

[^4]: If a value is missing or zero (0) the mower does not support the value

[^5]: If no GPS-Signal is available, those values are not updated

## IoBroker.vis-Bindungen
Der folgende Code kann für HTML-Bindungen im Adapter [ioBroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) zur Übersetzung der [Statusbeschreibung und Fehlercodes](https://developer.husqvarnagroup.cloud/apis/Automower+Connect+API#status%20description%20and%20error%20codes) in Text zur besseren Visualisierung verwendet werden:

- Datapoint `husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.errorCode`:

(EN)

```
{value1:husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.errorCode;value1 === "0" ? "Unexpected error" :: (value1 === "1" ? "Outside working area" :: (value1 === "2" ? "No loop signal" :: (value1 === "3" ? "Wrong loop signal" :: (value1 === "4" ? "Loop sensor problem, front" :: (value1 === "5" ? "Loop sensor problem, rear" :: (value1 === "6" ? "Loop sensor problem, left" :: (value1 === "7" ? "Loop sensor problem, right" :: (value1 === "8" ? "Wrong PIN code" :: (value1 === "9" ? "Trapped" :: (value1 === "10" ? "Upside down" :: (value1 === "11" ? "Low battery" :: (value1 === "12" ? "Empty battery" :: (value1 === "13" ? "No drive" :: (value1 === "14" ? "Mower lifted" :: (value1 === "15" ? "Lifted" :: (value1 === "16" ? "Stuck in charging station" :: (value1 === "17" ? "Charging station blocked" :: (value1 === "18" ? "Collision sensor problem, rear" :: (value1 === "19" ? "Collision sensor problem, front" :: (value1 === "20" ? "Wheel motor blocked, right" :: (value1 === "21" ? "Wheel motor blocked, left" :: (value1 === "22" ? "Wheel drive problem, right" :: (value1 === "23" ? "Wheel drive problem, left" :: (value1 === "24" ? "Cutting system blocked" :: (value1 === "25" ? "Cutting system blocked" :: (value1 === "26" ? "Invalid sub-device combination" :: (value1 === "27" ? "Settings restored" :: (value1 === "28" ? "Memory circuit problem" :: (value1 === "29" ? "Slope too steep" :: (value1 === "30" ? "Charging system problem" :: (value1 === "31" ? "STOP button problem" :: (value1 === "32" ? "Tilt sensor problem" :: (value1 === "33" ? "Mower tilted" :: (value1 === "34" ? "Cutting stopped - slope too steep" :: (value1 === "35" ? "Wheel motor overloaded, right" :: (value1 === "36" ? "Wheel motor overloaded, left" :: (value1 === "37" ? "Charging current too high" :: (value1 === "38" ? "Electronic problem" :: (value1 === "39" ? "Cutting motor problem" :: (value1 === "40" ? "Limited cutting height range" :: (value1 === "41" ? "Unexpected cutting height adj" :: (value1 === "42" ? "Limited cutting height range" :: (value1 === "43" ? "Cutting height problem, drive" :: (value1 === "44" ? "Cutting height problem, curr" :: (value1 === "45" ? "Cutting height problem, dir" :: (value1 === "46" ? "Cutting height blocked" :: (value1 === "47" ? "Cutting height problem" :: (value1 === "48" ? "No response from charger" :: (value1 === "49" ? "Ultrasonic problem" :: (value1 === "50" ? "Guide 1 not found" :: (value1 === "51" ? "Guide 2 not found" :: (value1 === "52" ? "Guide 3 not found" :: (value1 === "53" ? "GPS navigation problem" :: (value1 === "54" ? "Weak GPS signal" :: (value1 === "55" ? "Difficult finding home" :: (value1 === "56" ? "Guide calibration accomplished" :: (value1 === "57" ? "Guide calibration failed" :: (value1 === "58" ? "Temporary battery problem" :: (value1 === "59" ? "Temporary battery problem" :: (value1 === "60" ? "Temporary battery problem" :: (value1 === "61" ? "Temporary battery problem" :: (value1 === "62" ? "Temporary battery problem" :: (value1 === "63" ? "Temporary battery problem" :: (value1 === "64" ? "Temporary battery problem" :: (value1 === "65" ? "Temporary battery problem" :: (value1 === "66" ? "Battery problem" :: (value1 === "67" ? "Battery problem" :: (value1 === "68" ? "Temporary battery problem" :: (value1 === "69" ? "Alarm! Mower switched off" :: (value1 === "70" ? "Alarm! Mower stopped" :: (value1 === "71" ? "Alarm! Mower lifted" :: (value1 === "72" ? "Alarm! Mower tilted" :: (value1 === "73" ? "Alarm! Mower in motion" :: (value1 === "74" ? "Alarm! Outside geofence" :: (value1 === "75" ? "Connection changed" :: (value1 === "76" ? "Connection NOT changed" :: (value1 === "77" ? "Com board not available" :: (value1 === "78" ? "Slipped - Mower has Slipped. Situation not solved with moving pattern" :: (value1 === "79" ? "Invalid battery combination - Invalid combination of different battery types." :: (value1 === "80" ? "Cutting system imbalance --Warning--" :: (value1 === "81" ? "Safety function faulty" :: (value1 === "82" ? "Wheel motor blocked, rear right" :: (value1 === "83" ? "Wheel motor blocked, rear left" :: (value1 === "84" ? "Wheel drive problem, rear right" :: (value1 === "85" ? "Wheel drive problem, rear left" :: (value1 === "86" ? "Wheel motor overloaded, rear right" :: (value1 === "87" ? "Wheel motor overloaded, rear left" :: (value1 === "88" ? "Angular sensor problem" :: (value1 === "89" ? "Invalid system configuration" :: (value1 === "90" ? "No power in charging station" :: (value1 === "91" ? "Switch cord problem" :: (value1 === "92" ? "Work area not valid" :: (value1 === "93" ? "No accurate position from satellites" :: (value1 === "94" ? "Reference station communication problem" :: (value1 === "95" ? "Folding sensor activated" :: (value1 === "96" ? "Right brush motor overloaded" :: (value1 === "97" ? "Left brush motor overloaded" :: (value1 === "98" ? "Ultrasonic Sensor 1 defect" :: (value1 === "99" ? "Ultrasonic Sensor 2 defect" :: (value1 === "100" ? "Ultrasonic Sensor 3 defect" :: (value1 === "101" ? "Ultrasonic Sensor 4 defect" :: (value1 === "102" ? "Cutting drive motor 1 defect" :: (value1 === "103" ? "Cutting drive motor 2 defect" :: (value1 === "104" ? "Cutting drive motor 3 defect" :: (value1 === "105" ? "Lift Sensor defect" :: (value1 === "106" ? "Collision sensor defect" :: (value1 === "107" ? "Docking sensor defect" :: (value1 === "108" ? "Folding cutting deck sensor defect" :: (value1 === "109" ? "Loop sensor defect" :: (value1 === "110" ? "Collision sensor error" :: (value1 === "111" ? "No confirmed position" :: (value1 === "112" ? "Cutting system major imbalance" :: (value1 === "113" ? "Complex working area" :: (value1 === "114" ? "Too high discharge current" :: (value1 === "115" ? "Too high internal current" :: (value1 === "116" ? "High charging power loss" :: (value1 === "117" ? "High internal power loss" :: (value1 === "118" ? "Charging system problem" :: (value1 === "119" ? "Zone generator problem" :: (value1 === "120" ? "Internal voltage error" :: (value1 === "121" ? "High internal temerature" :: (value1 === "122" ? "CAN error" :: (value1 === "123" ? "Destination not reachable" :: (value1 === "124" ? "Destination blocked" :: (value1 === "125" ? "Battery needs replacement" :: (value1 === "126" ? "Battery near end of life" :: (value1 === "127" ? "Battery problem" :: (value1 === "128" ? "Multiple reference stations detected" :: (value1 === "129" ? "Auxiliary cutting means blocked" :: (value1 === "130" ? "Imbalanced auxiliary cutting disc detected" :: (value1 === "131" ? "Lifted in link arm" :: (value1 === "132" ? "EPOS accessory missing" :: (value1 === "133" ? "Bluetooth com with CS failed" :: (value1 === "134" ? "Invalid SW configuration" :: (value1 === "135" ? "Radar problem" :: (value1 === "136" ? "Work area tampered" :: (value1 === "137" ? "High temperature in cutting motor, right" :: (value1 === "138" ? "High temperature in cutting motor, center" :: (value1 === "139" ? "High temperature in cutting motor, left" :: (value1 === "141" ? "Wheel brush motor problem" :: (value1 === "143" ? "Accessory power problem" :: (value1 === "144" ? "Boundary wire problem" :: (value1 === "701" ? "Connectivity problem" :: (value1 === "702" ? "Connectivity settings restored" :: (value1 === "703" ? "Connectivity problem" :: (value1 === "704" ? "Connectivity problem" :: (value1 === "705" ? "Connectivity problem" :: (value1 === "706" ? "Poor signal quality" :: (value1 === "707" ? "SIM card requires PIN" :: (value1 === "708" ? "SIM card locked" :: (value1 === "709" ? "SIM card not found" :: (value1 === "710" ? "SIM card locked" :: (value1 === "711" ? "SIM card locked" :: (value1 === "712" ? "SIM card locked" :: (value1 === "713" ? "Geofence problem" :: (value1 === "714" ? "Geofence problem" :: (value1 === "715" ? "Connectivity problem" :: (value1 === "716" ? "Connectivity problem" :: (value1 === "717" ? "SMS could not be sent" :: (value1 === "724" ? "Communication circuit board SW must be updated" :: "errorCode #" + value1 + " unknown")))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))}
```

- Datenpunkt `husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.activity`:

(EN)

```
{value1:husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.activity;value1 === "UNKNOWN" ? "Unknown activity" :: (value1 === "NOT_APPLICABLE" ? "Manual start required in mower." :: (value1 === "MOWING" ? "Mower is mowing lawn. If in demo mode the blades are not in operation." :: (value1 === "GOING_HOME" ? "Mower is going home to the charging station." :: (value1 === "CHARGING" ? "Mower is charging in station due to low battery." :: (value1 === "LEAVING" ? "Mower is leaving the charging station." :: (value1 === "PARKED_IN_CS" ? "Mower is parked in charging station." :: (value1 === "STOPPED_IN_GARDEN" ? "Mower has stopped. Needs manual action to resume." :: "activity #" + value1 + " unknown")))))))}
```

- Datenpunkt `husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.mode`:

(EN)

```
{value1:husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.mode;value1 === "MAIN_AREA" ? "Mower will mow until low battery. Go home and charge. Leave and continue mowing. Week schedule is used. Schedule can be overridden with forced park or forced mowing." :: (value1 === "DEMO" ? "No blade operation - Mower will mow until low battery. Go home and charge. Leave and continue mowing. Week schedule is used. Schedule can be overridden with forced park or forced mowing." :: (value1 === "SECONDARY_AREA" ? "Mower is in secondary area. Schedule is overridden with forced park or forced mowing. Mower will mow for request time or untill the battery runs out." :: (value1 === "HOME" ? "Mower goes home and parks forever. Week schedule is not used. Cannot be overridden with forced mowing." :: (value1 === "UNKNOWN" ? "Unknown mode" :: "mode #" + value1 + " unknown"))))}
```

- Datenpunkt `husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.state`:

(EN)

```
{value1:husqvarna-automower-connect.0.[mowerID from DP .system.id].mower.state;value1 === "UNKNOWN" ? "Unknown state" :: (value1 === "NOT_APPLICABLE" ? "Not Applicable" :: (value1 === "PAUSED" ? "Mower has been paused by user." :: (value1 === "IN_OPERATION" ? "See value in activity for status." :: (value1 === "WAIT_UPDATING" ? "Mower is downloading new firmware." :: (value1 === "WAIT_POWER_UP" ? "Mower is performing power up tests." :: (value1 === "RESTRICTED" ? "Mower can currently not mow due to week calender, or override park." :: (value1 === "OFF" ? "Mower is turned off." :: (value1 === "STOPPED" ? "Mower is stopped, requires manual action." :: (value1 === "ERROR" ? "An error has occurred. Check errorCode. Mower requires manual action." :: (value1 === "FATAL_ERROR" ? "An fatal error has occurred. Check errorCode. Mower requires manual action." :: (value1 === "ERROR_AT_POWER_UP" ? "An error at power up has occurred. Check errorCode. Mower requires manual action." :: "state #" + value1 + " unknown")))))))))))}
```

## Skript für Statistiken
(Ursprüngliches Skript von @ArnoD15, modifiziert von @ice987987)

Es wird folgender Wert berechnet:

- Heutige Ladezeit und Gesamtladezeit
- Heutige Mähzeit und Gesamtmähzeit
- Heute gefahrene Strecke und Gesamtfahrstrecke
- Entfernung zwischen Rasenmäher und Ladestation
- Start- und Endzeit von Zeitplänen in Minuten und Stunden umrechnen
- Google Maps-Link erstellen/aktualisieren
- Möglichkeit, den Rasenmäher bei Regen bis zum nächsten Termin abzustellen
- Berechnung der verbleibenden Messerlaufzeit in Prozent

Zur Verwendung kopieren Sie den folgenden Code in ein neues [Javascript](https://github.com/ioBroker/ioBroker.javascript)-Skript und füllen Sie die folgenden Variablen aus: `instance`, `pathLevel1`, `pathLevel2`, `mowerID`, `sID_RainSensor` und `targetBladeCuttingTime` im Abschnitt `USER CONFIGURATION`.

```
//***************************************************************************************************
//++++++++++++++++++++++++++++++++++++++++ USER CONFIGURATION +++++++++++++++++++++++++++++++++++++++

const instance = '0_userdata.0';                                                    // Type your instance name
const pathLevel1 = 'husqvarna';                                                     // Type your path name
const pathLevel2 = ['statistics', 'schedules', 'general', 'blades', 'actions'];     // Type your folder names
const mowerID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';                             // Mower ID from Husqvarna automower
const sID_RainSensor = 'hm-rpc.0.12345678901234.1.RAINING';                         // Path rain sensor (true = rain)
const targetBladeCuttingTime = 180_000_000;                                         // Which time should a set of knives run in milliseconds (180_000_000ms = 50h)

//++++++++++++++++++++++++++++++++++++++ END USER CONFIGURATION +++++++++++++++++++++++++++++++++++++
//***************************************************************************************************

// create required folders and states
createState();
async function createState() {
    for (let i = 0; i < 4; i++) {
        createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.startTime_${i}`, '00:00', false, {name: `Schedule ${i} start time`, role: 'value', type: 'string', read: true, write: true, def: '00:00'});
        createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.endTime_${i}`, '00:00', false, {name: `Schedule ${i} end time`, role: 'value', type: 'string', read: true, write: true, def: '00:00'});
    };
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceToday`, 0, false, {name: 'Driven Distance Today', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'km'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceTotal`, 0, false, {name: 'Driven Distance Total', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'km'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.chargingTimeToday`, 0, false, {name: 'Charging Time Today', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'ms'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.mowingTimeToday`, 0, false, {name: 'Mowing Time Total', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'ms'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[3]}.currentBladeCuttingTime`, 0, false, {name: 'Current Blade Cutting Time', desc: 'How many seconds was the current set of knives run', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'ms'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[3]}.reset`, false, false, {name: 'Reset', desc: 'Restart counter after knife change', role: 'button', type: 'boolean', read: true, write: true, def: false});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[3]}.changeBlades`, false, false, {name: 'Change Blades', role: 'state', type: 'boolean', read: true, write: false, def: false});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[3]}.remainingCuttingCapacity`, 100, false, {name: 'Remaining cutting Capacity', desc: 'in percent', role: 'state', type: 'number', read: true, write: false, def: 100, max: 100, unit: '%'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.distanceFromChargingStation`, 0, false, {name: 'Distance from charging station', role: 'state', type: 'number', read: true, write: false, def: 0, unit: 'm'});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[2]}.GoogleMapsLink`, '', false, {name: 'Google Maps Link', role: 'value', type: 'string', read: true, write: false, def: ''});
    await createStateAsync(`${instance}.${pathLevel1}.${pathLevel2[4]}.parkAfterNextChargingCycle`, false, false, {name: 'Park after next charging cycle', role: 'state', type: 'boolean', read: true, write: true, def: false});
    log('-==== folders and states created ====-', 'debug');
};

const sID_HusqvarnaSchedules = [];
$(`state[id=husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.*.start]`).each(function(id) {
    sID_HusqvarnaSchedules.push(id);
});
$(`state[id=husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.*.duration]`).each(function(id) {
    sID_HusqvarnaSchedules.push(id);
});

let drivenDistanceToday = getState(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceToday`).val;
let drivenDistanceTotal = getState(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceTotal`).val;
let drivenDistance = 0;
let chargingTimeToday = getState(`${instance}.${pathLevel1}.${pathLevel2[0]}.chargingTimeToday`).val;
let chargingTime = 0;
let mowingTimeToday = getState(`${instance}.${pathLevel1}.${pathLevel2[0]}.mowingTimeToday`).val;
let mowingTime = 0;
let bladeCuttingTime = 0;
let remainingBladeCapacity = 0;
let chargingStationLatitude = 0;
let chargingStationLongitude = 0;
let distanceFromChargingStation = 0;

// reset variables "[...]Today" every midnight
schedule('0 0 * * *', function () {
    drivenDistanceToday = 0;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceToday`, drivenDistanceToday, true);
    chargingTimeToday = 0;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.chargingTimeToday`, chargingTimeToday, true);
    mowingTimeToday = 0;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.mowingTimeToday`, mowingTimeToday, true);
});

// get chargingTimeToday and chargingTimeTotal
on({id: `husqvarna-automower-connect.0.${mowerID}.mower.activity`, oldVal: 'CHARGING'}, function (obj) {
    chargingTime = obj.state.ts - obj.oldState.ts;
    log(`chargingTime: ${chargingTime / 1000}s`, 'debug');
    chargingTimeToday = chargingTime + chargingTimeToday;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.chargingTimeToday`, chargingTimeToday, true);
});

// get mowingTimeToday, mowingTimeTotal, bladeCuttingTime and remainingBladeCapacity
on({id: `husqvarna-automower-connect.0.${mowerID}.mower.activity`, oldVal: 'MOWING'}, function (obj) {
    mowingTime = obj.state.ts - obj.oldState.ts;
    log(`mowingTime: ${mowingTime / 1000}s`, 'debug');
    mowingTimeToday = mowingTime + mowingTimeToday;
    setState(`${instance}.${pathLevel1}.${pathLevel2[0]}.mowingTimeToday`, mowingTimeToday, true);

    let currentBladeCuttingTime = getState(`${instance}.${pathLevel1}.${pathLevel2[3]}.currentBladeCuttingTime`).val;

    bladeCuttingTime = mowingTime + currentBladeCuttingTime;
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.currentBladeCuttingTime`, bladeCuttingTime, true);

    remainingBladeCapacity = 100 - (currentBladeCuttingTime * 100) / targetBladeCuttingTime;
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.remainingCuttingCapacity`, remainingBladeCapacity, true);
});

// reset values after blade change
on({id: `${instance}.${pathLevel1}.${pathLevel2[3]}.reset`, val: true, ack: false}, function () {
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.remainingCuttingCapacity`, 100, true);
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.changeBlades`, false, true);
    setState(`${instance}.${pathLevel1}.${pathLevel2[3]}.currentBladeCuttingTime`, 0, true);
});

// get distance from automower to charging station, drivenDistanceToday and drivenDistanceTotal
on({id: `husqvarna-automower-connect.0.${mowerID}.positions.latlong`, change: 'ne'}, async function (obj) {
    if (getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'CHARGING' || getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'PARKED_IN_CS') {
        if (chargingStationLatitude !== 0 && chargingStationLongitude !== 0) {
            chargingStationLatitude = (Number(obj.state.val.split(';')[0]) + Number(chargingStationLatitude)) / 2;
            chargingStationLongitude = (Number(obj.state.val.split(';')[1]) + Number(chargingStationLongitude)) / 2;
        } else {
            chargingStationLatitude = obj.state.val.split(';')[0];
            chargingStationLongitude = obj.state.val.split(';')[1];
        };
    };
    distanceFromChargingStation = 1000 * (6378.388 * Math.acos(Math.sin(obj.state.val.split(';')[0] * (Math.PI / 180)) * Math.sin(chargingStationLatitude * (Math.PI / 180)) + Math.cos(obj.state.val.split(';')[0] * (Math.PI / 180)) * Math.cos(chargingStationLatitude * (Math.PI / 180)) * Math.cos(chargingStationLongitude * (Math.PI / 180) - obj.state.val.split(';')[1] * (Math.PI / 180)))); // reference: https://www.kompf.de/gps/distcalc.html
    log(`distanceFromChargingStation: ${round(distanceFromChargingStation, 2)}m`, 'debug');
    await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.distanceFromChargingStation`, distanceFromChargingStation, true);

    if (getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'MOWING' || getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'GOING_HOME' || getState(`husqvarna-automower-connect.0.${mowerID}.mower.activity`).val === 'LEAVING') {
        drivenDistance = 6378.388 * Math.acos(Math.sin(obj.state.val.split(';')[0] * (Math.PI / 180)) * Math.sin(obj.oldState.val.split(';')[0] * (Math.PI / 180)) + Math.cos(obj.state.val.split(';')[0] * (Math.PI / 180)) * Math.cos(obj.oldState.val.split(';')[0] * (Math.PI / 180)) * Math.cos(obj.oldState.val.split(';')[1] * (Math.PI / 180) - obj.state.val.split(';')[1] * (Math.PI / 180))); // reference: https://www.kompf.de/gps/distcalc.html
        log(`distanceDriven: ${round(drivenDistance * 1000, 2)}m`, 'debug');
        drivenDistanceToday = drivenDistanceToday + drivenDistance;
        drivenDistanceTotal = drivenDistanceTotal + drivenDistance;
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceToday`, round(drivenDistanceToday, 2), true);
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[0]}.drivenDistanceTotal`, round(drivenDistanceTotal, 2), true);
    };
});

// Convert start and end time to minutes
$(`state[id=${instance}.${pathLevel1}.${pathLevel2[1]}.*]`).on(async function (obj) {
    if (obj.id.split('.')[obj.id.split('.').length - 1].split('_')[0] === 'startTime') {
        let startTime = obj.state.val.split(':')[0] * 60 + Number(obj.state.val.split(':')[1]);
        setState(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}.start`, startTime, false);
        let endTime = (await getStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.endTime_${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}`)).val;
        let duration = endTime.split(':')[0] * 60 + Number(endTime.split(':')[1]) - startTime;
        setState(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}.duration`, duration, false);
    } else {
        let startTime = (await getStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.startTime_${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}`)).val;
        let startTimeMin = startTime.split(':')[0] * 60 + Number(startTime.split(':')[1]);
        let duration = obj.state.val.split(':')[0] * 60 + Number(obj.state.val.split(':')[1]) - startTimeMin;
        setState(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 1].split('_')[1]}.duration`, duration, false);
    };
});

// Convert start and end time to hh:mm
on({id: sID_HusqvarnaSchedules, change: 'ne', ack: true}, async function (obj) {
    if (obj.id.split('.')[obj.id.split('.').length - 1] === 'start') {
        let m = obj.state.val % 60;
        let h = (obj.state.val - m) / 60;
        let HHMM = `${(h < 10 ? '0' : '')}${h.toString()}:${(m < 10 ? '0' : '')}${m.toString()}`;
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.startTime_${obj.id.split('.')[obj.id.split('.').length - 2]}`, HHMM, true);
        let endTime = obj.state.val + (await getStateAsync(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 2]}.duration`)).val;
        let m1 = endTime % 60;
        let h1 = (endTime - m1) / 60;
        let HHMM1 = `${(h1 < 10 ? '0' : '')}${h1.toString()}:${(m1 < 10 ? '0' : '')}${m1.toString()}`;
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.endTime_${obj.id.split('.')[obj.id.split('.').length - 2]}`, HHMM1, true);
    } else {
        let startTime = (await getStateAsync(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.schedule.${obj.id.split('.')[obj.id.split('.').length - 2]}.start`)).val;
        let endTime = startTime + obj.state.val;
        let m = endTime % 60;
        let h = (endTime - m) / 60;
        let HHMM = `${(h < 10 ? '0' : '')}${h.toString()}:${(m < 10 ? '0' : '')}${m.toString()}`;
        await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[1]}.endTime_${obj.id.split('.')[obj.id.split('.').length - 2]}`, HHMM, true);
    };
});

// update google maps link
on({id: `husqvarna-automower-connect.0.${mowerID}.positions.latlong`, change: 'ne'}, async function (obj) {
    let arrayLatLong = getState(obj.id).val.split(';');
    let GoogleLink = `https://www.google.com/maps/place/${arrayLatLong[0]},${arrayLatLong[1]}/@?hl=de`;
    await setStateAsync(`${instance}.${pathLevel1}.${pathLevel2[2]}.GoogleMapsLink`, GoogleLink, true);
});

// during rain, park until next schedule
on({id: sID_RainSensor, change: 'ne', val: true}, async function () {
   await setStateAsync(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.PARKUNTILNEXTSCHEDULE`, true);
   log('-==== It is raining. Mower is parked. ====-', 'info');
});

// park after next charging cycle
on({id: `husqvarna-automower-connect.0.${mowerID}.mower.activity`, change: 'ne', val: 'CHARGING'}, function () {
    if (getState(`${instance}.${pathLevel1}.${pathLevel2[4]}.parkAfterNextChargingCycle`).val) {
        setState(`husqvarna-automower-connect.0.${mowerID}.ACTIONS.PARKUNTILFURTHERNOTICE`, true, true);
        setState(`${instance}.${pathLevel1}.${pathLevel2[4]}.parkAfterNextChargingCycle`, false, true);
    };
});

// round
function round(digit, digits) {
    digit = (Math.round(digit * Math.pow(10, digits)) / Math.pow(10, digits));
    return digit;
};
```

## So melden Sie Probleme und Funktionswünsche
- Bei Problemen

Bitte verwenden Sie [GitHub-Probleme](https://github.com/bueste/ioBroker.husqvarna-automower-connect/issues/new/choose) -> "Fehlerbericht" und füllen Sie das Formular aus.

Stellen Sie den Adapter auf Debug-Protokollierungsmodus ein (Instanzen -> Expertenmodus -> Spaltenprotokollierungsstufe). Laden Sie die Protokolldatei von der Festplatte (Unterverzeichnis „log“ im ioBroker-Installationsverzeichnis, nicht aus dem Admin-Bereich, da dieser die Zeilen abschneidet). Prüfen Sie vor der Veröffentlichung, ob die Protokolldatei personenbezogene Daten enthält.

- Für Funktionsanfragen

Bitte verwenden Sie [GitHub-Probleme](https://github.com/bueste/ioBroker.husqvarna-automower-connect/issues/new/choose) -> "Funktionsanfrage" und füllen Sie das Formular aus.

## Changelog

### 1.0.10 (2026-08-08)
- Fix: the button role:read=false and workAreas.<id>.enabled role fixes from 1.0.9 only applied to newly created objects (setObjectNotExistsAsync never updates existing ones). Any installation upgrading from <=1.0.8 kept the old, incorrect values forever. migrateObjectRoles() now also force-corrects these two on every startup, exactly like it already does for the pre-1.0.3 issues. Verified against a live object dump: corrects exactly the 18 affected button states, no false positives.

### 1.0.9 (2026-08-08)
- Fix all issues from the manual maintainer review (PR #6326): all 13 button states now use read:false as required by the button role spec; fixed a case-sensitivity bug (StartInWorkArea vs startInWorkArea) that made the STARTINWORKAREA command completely non-functional; added a 10s timeout to all 5 axios calls to prevent indefinite hangs on an unresponsive API; stayOutZones.zones is now JSON.stringify'd before setState as required for array-type states; workAreas.<id>.enabled now uses the correct 'indicator' role instead of the unrelated 'indicator.connected'; completed the placeholder zh-cn translation for statisticsIntervalHint; added validation (hasForbiddenChars) for the externally-sourced mower ID and workAreaId before using them in object paths - invalid values are rejected and logged rather than silently sanitized, since the mower ID is later parsed back out of the object path to address the real Husqvarna API.

<!-- ### **WORK IN PROGRESS** -->

### 1.0.8 (22.07.2026)

-   (Stefan Bühler) Documentation only: removed the e-mail address and corrected the name spelling in the README license section (the LICENSE file itself was already correct); commented out the number-of-installations badge, which cannot resolve until the adapter is available in the official ioBroker repository. No functional changes.

### 1.0.7 (22.07.2026)

-   (Stefan Bühler) Metadata only: standardized copyright/author to "Stefan Bühler" across package.json, io-package.json and LICENSE (dropped the GitHub username and email address from the copyright line; ice987987's original-author credit is unchanged). No functional changes.

### 1.0.6 (17.07.2026)

-   (Stefan Bühler) Documentation only: fixed the PayPal donate link, which previously used the wrong URL format and did not work.

### 1.0.5 (17.07.2026)

-   (Stefan Bühler) FIX: `system.serialNumber` declared type 'number', but role 'info.serial' only accepts 'string' - changed type and now writes the value as a string.
-   (Stefan Bühler) FIX: `positions.latlong` used role 'value.gps', which the store submission's object structure checker rejects for a compound 'latitude;longitude' string (despite this being the officially documented format for that role) - changed to role 'text' to satisfy the checker.
-   (Stefan Bühler) The startup migration added in 1.0.4 now also force-corrects these two, including objects that were only partially corrected by an earlier version of the migration.

### 1.0.4 (17.07.2026)

-   (Stefan Bühler) FIX: 1.0.3 corrected several wrong object roles/types (ACTIONS.HEADLIGHT, ACTIONS.schedule fields, messages.messages, system.id/type/serialNumber), but `setObjectNotExistsAsync()` never touches an object that already exists - so installations updating from before 1.0.3 kept the old, incorrect objects forever. Added a one-time startup migration that force-corrects exactly those known objects via `extendObjectAsync()`, without touching anything else.

### 1.0.3 and older

Older changelog entries can be found in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2025 ice987987 <mathias.frei1@gmail.com>  
Copyright (c) 2026 Stefan Bühler (modifications and additions in this fork)

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