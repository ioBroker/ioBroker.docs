---
BADGE-Number of Installations: http://iobroker.live/badges/sprinklecontrol-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sprinklecontrol.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sprinklecontrol.svg
BADGE-Dependency Status: https://img.shields.io/david/Dirk-Peter-md/iobroker.sprinklecontrol.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Dirk-Peter-md/ioBroker.sprinklecontrol/badge.svg
BADGE-Travis-CI: http://img.shields.io/travis/Dirk-Peter-md/ioBroker.sprinklecontrol/master.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sprinklecontrol.png?downloads=true
---
![Logo](img/sprinklecontrol.png)
# SprinkleControl
### *The adapter for weather-dependent automatic garden irrigation.*
(by means of a weather sensor HmIP-SWO-PL – plus)

Unfortunately my knowledge of English is too small for an adapter description.
I would be very grateful for any help with the translation.

---
---
## Mode of action
- - -

The ambient data (temperature, humidity, brightness, wind speed, amount of rain) are evaluated in Sprinkle Control.
The evaporation determined in this way is used to determine the theoretical soil moisture of the individual irrigation areas.
At a point in time specified under "Time settings", the watering circuits that fall below a certain percentage are activated.
These different irrigation circuits are then controlled in such a way that the maximum pump output (l / h), and the maximum number of irrigation circuits are not exceeded.
Both are customizable.

![schaltverhalten.jpg](img/schaltverhalten.jpg)

**Example for a switching behavior on a day (start time of all valves: 6:00)**


My irrigation works with the Homematic IP weather sensor plus (HmIP-SWO-PL) and **was only tested with this**.
In the ioBroker forum, however, there are also some tests that are carried out with weather stations via the Sainlogic adapter.

---
---
## Installation
- - -

An instance of the Sprinkle Control Adapter is installed through the ioBroker Admin interface by clicking the plus sign (+).
Depending on the active repository specified in the Admin adapter, the stable (default) or beta version (latest) will be installed.

---
---
## Adapter configuration - MAIN SETTINGS
- - -

![screenshot1.jpg](img/screenshot1.jpg)

* 1: Go to the Sprinkle Control page on GitHub
* 2: Load the adapter configuration from a file
* 3: Save the adapter configuration from a file
* 4: Add a new watering circle
* 5: Check box to enable / disable the irrigation circuit
* 6: The name of the irrigation circle is automatically read from the objects when the ID is selected and can then be changed as required.
* 7: Unique ID of the data point to be controlled in the objects
* 8: Change the selected irrigation actuator
* 9: Open the individual configuration of the respective irrigation circuit
* 10: Move the line position
* 11: Delete watering circuit with all configured data!

- - -
### Individual configuration of an irrigation circuit
- - -

Open the individual configuration of the respective irrigation circuit

![screenshot2.jpg](img/screenshot2.jpg)

**Irrigation settings**
- *Watering time in min:* Set the watering time in minutes. This lengthens the further the trigger falls below the "lowest percentage of soil moisture".
- *maximum irrigation extension in %:* Limitation of the irrigation duration in percent (100% = irrigation duration is not extended).
- *Watering interval in min:* The watering time is divided into an interval. (e.g. 5 minutes on, at least 5 minutes off, 5 minutes on, etc.)
    - **Hint:** With me, I have a lawn grate at the entrance. Here the water only runs down the slope when it is irrigated. I was able to counteract this by pouring at intervals.

**Switch-on point for watering**
- *Switch-on point (soil moisture) of the irrigation valves in %:* Switch-on threshold: If this value is not reached, watering begins with the start time.
- *Soil moisture = 100% after irrigation:* When activated, the soil moisture is set to 100% after watering. Otherwise, it will stay just below it due to evaporation during irrigation.

**maximum soil moisture**
- *maximum soil moisture after the irrigation in (mm):* Maximum theoretical water content in the soil after irrigation. The higher this value, the longer the watering intervals.
  - **Hint:** Lawn grid: 5; Flowerbed: 10; Lawn area: 14
- *maximum soil moisture after the rain in (mm):* Maximum theoretical water content in the soil after heavy rain. This value must be greater than after irrigation!
  - **Hint:** Lawn grid: 6; Flowerbed: 15; Lawn area: 19
  
- - -
#### Individual configuration of an irrigation circuit - MAIN SETTINGS
- - -

![screenshot3.jpg](img/screenshot3.jpg)

**Sprinkler consumption**
- *Flow amount in l/h:* Specific flow rate of the current irrigation station
    - **Hint:** is often found in the instruction manual or on the Internet
- *Booster:* Removes all active irrigation circuits from the network for 30 s and then switches them on again
    - **Hint:** My pump delivers a maximum of 1800 l/h, and my lawn sprinklers need 1400 l/h, but full pressure, to start them. With the booster function, I can also water my conifers with a drip line that only needs 300 l / h.
    > - **Danger:** This function should be used very sparingly, as only one irrigation circuit can water with an active booster at a time.

---
---
#### Individual configuration of an irrigation circuit - PUMP SETTINGS
- - -

![screenshot4.jpg](img/screenshot4.jpg)

**Settings for Valve**
- *Control voltage of the valves:* Clicking the (+) symbol opens the Select-ID State window. Here you can select the STATE for the control voltage of the valves. This output becomes active as soon as one of the valves is active.
  If you do not need this STATE, leave this field blank!
- *Maximum parallel operation of the valves:* The number of active valves can be limited here. For example, if the output of the control transformer is not sufficient to switch several valves in parallel.
- *Switching distance between the valves in ms:* Enter a time in milliseconds. This is the waiting time until the next valve is switched, which means, for example, that 6 outputs are switched one after the other and not simultaneously.

**Settings for Pump**
- *Main pump:* Clicking the (+) symbol opens the Select ID window. The CONDITION of the pump that is responsible for the water supply is saved here.
- *maximum pump output of the main pump in l/h:* The maximum pump output is saved here. This then limits the irrigation circuits so that enough pressure is still applied to the valves.
  - **Danger:** The actual pump output must be specified here. Not the one on the nameplate. For example, I have a "Gardena 5000/5 LCD" which, due to the length of the line, only generates an output of 1800 l / h and not 4500 l / h, as stated on the type plate.
**Add cistern pump**
- *Add cistern pump as priority pump* 
    - *cistern pump:* The cistern pump is entered here. This is deactivated if the level in the cistern is too low. In this case the main pump continues to water.
    - *maximum pump capacity of the cistern in l/h:* The maximum pump output in l / h is saved here. See Adjusting the Main Pump.
    - *Sensor of the level in the cistern:* STATE of the level sensor to determine the level in 0 ... 100%.
      - *built-in:* Hm-Sen-Wa-Od Capacitive level meter from HomeMatic. 
    - *Minimum fill level of the cysts in %:* If this is not reached, the switching point is switched to the main pump and the valves are adjusted according to the amount consumed while the watering is running.

---
---
## Adapter configuration - TIME SETTINGS
- - -

![screenshot5.jpg](img/screenshot5.jpg)

The start times for the sprinkle control can be set on this tab.

###Settings for start time
- *Start time for irrigation:*
  - *Start with a fixed start time:* The **Start time of the week** can be set here.
  - *Start time at sunrise:* Here is the start time at sunrise. It can be shifted from -120 min to + 120 min via **Time shift in min**.
  - *Start time at the end of the golden hour:*
  
###Settings for start time on weekends
- *different start time on weekends:* If you want to start watering at a different time on the weekend so as not to annoy your neighbors, for example, you can activate it here.
- *Start time at the weekend:*

###Settings for the start time on public holidays
- *Start time of public holidays as on weekends:* If public holidays should be treated like weekends, this can be activated here.
- *public holidays Instance* The external public holiday instance must then be selected here (for example the adapter "Deutsche Feiertage").

---
---
## Adapter configuration - EXTRA SETTINGS
- - -

![screenshot6.jpg](img/screenshot6.jpg)

### Astro settings
SprinkleControl takes the latitude and longitude from the ioBroker system settings.
SprinkleControl uses these values to calculate the position of the sun and the extraterrestrial radiation for evaporation.

### Debug settings
When activated, additional information is displayed in the log. This allows errors to be analyzed more quickly.

### Additional notification setting
Activate the Notifications tab. The communication settings are then made on the new Notifications tab.

### Sensors "(Homematic HmIP-SWO-PL)" for calculating the evaporation
> - **Danger:** The program is adapted to the "HomeMatic weather station HmIP-SWO-PL" for calculating the evaporation! Without this data, no irrigation circuits are triggered.

- But I heard from the forum that the program also works with weather data via the "Sainlogic Adapter".
- The sensors calculate the maximum possible evaporation of the potential evapotranspiration according to Penman ETp and thus control the irrigation system.
  This happens every time the temperature changes.

### Weather forecast
- If you activate the "Use weather forecast" box, a selection box will appear. Here the instance of the adapter "Das Wetter" must be selected.
  "Path 2: XML file with 5-day weather forecast and detailed information for every 3 hours" must be filled out in the "Das Wetter" adapter
  so that SprinkleControl can access the object **"daswetter.0.NextDaysDetailed.Location_1.Day_1.rain_value"**. This value is then used to postpone watering when it is supposed to rain.

---
---
## Adapter configuration - NOTIFICATIONS
- - -

![screenshot7.jpg](img/screenshot7.jpg)

- Once the NOTIFICATIONS tab has been activated, you can choose your notification method and enter your details here.
- The following notification methods are supported:
  - E-mail
  - Pushover
  - Telegram
  - WhatsApp

---
---
## Admin => Objekte => sprinklecontrol.0.
- - -

![screenshot8.jpg](img/screenshot8.jpg)

### control
- **Holiday:** If the "Holiday" is set to true, watering will start like the weekend if the weekend setting is enabled. A connection with a calendar would also be possible here.
- **autoOnOff:** When the setting is "Off", the automatic mode of the irrigation system is disabled.
- **parallelOfMax:** For example (3: 4). Three of four possible irrigation circles are active here. (This is just an ad!)
- **restFlow:** Display of the possible residual flow of the pump. (This is just an ad!)

### evaporation
- **ETpCurrent:** This is the current evaporation as a daily value in mm / day.
- **ETpToday:** The current daily value of evaporation is displayed here. This will be moved to ETpYesterday at 00:05 and then reset to 0.
- **ETpYesterday:** Yesterday's evaporation is shown here.

### info
- **cisternState** If necessary, the status of the cistern and its status are displayed here.
- **nextAutoStart** Indicates the next start of the irrigation system.
- **rainToday** The precipitation forecast for today is displayed here. The adapter "the weather" is necessary for this.
- **rainTomorrow** Precipitation forecast for tomorrow from the adapter "the weather".

### sprinkle.*.
- **history**
  - **curCalWeekConsumed:** Current weekly consumption of the irrigation circuit in liters
  - **curCalWeekRunningTime:** current total weekly running time of the irrigation circuit
  - **lastCalWeekConsumed:** last weekly consumption in liters of the irrigation circuit
  - **lastCalWeekRunningTime:** last weekly total run time of the watering cycle
  - **lastConsumed:** Water consumption during the last watering in liters
  - **lastOn:** last start of the watering cycle (05.07 14:14)
  - **lastRunningTime:** last watering duration
- **actualSoilMoisture** This is the current virtual soil moisture in % => trigger criterion (max. 100% after irrigation, over 100% after heavy rain). Attention: This value can differ considerably from the actual soil moisture.
- **autoOn** Automatically on (Here you can switch off the automatic watering of this circuit, e.g. during a repair, whereby manual watering is possible at any time.)
- **countdown** Remaining watering time
- **runningTime** Watering duration
  - If a number greater than 0 is entered here, the watering cycle begins for the specified time in minutes.
  - If you enter a 0, the watering of the watering circle will be ended.
- **sprinklerState** Display of the status of the irrigation circuit.
  - off(0) → Irrigation circuit off.
  - wait(1) → The irrigation circuit is waiting for the pump capacity to become available.
  - on(2) → Irrigation circle on.
  - break(3) → The watering cycle was interrupted (configuration, watering interval)
  - Boost(4) → The boost function of the current irrigation circuit is active (configuration, booster on).
  - off(Boost)(5) → Irrigation circuit interrupted for 30 s because a boost function is active.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.1.7 (22.05.2021)
* (Dirk-Peter-md) Beschreibung in englischer Sprache hinzugefügt
* (Dirk-Peter-md) bereit für stable

### 0.1.6 (18.05.2021)
* (Dirk-Peter-md) AutoOn-Schalter pro Bewässerungskreis hinzugefügt
* (Dirk-Peter-md) weitere Fehler beseitigt (js-Controller)
* (Dirk-Peter-md) Niederschlagszähler von der Verdunstung gelöst

### 0.1.5 (05.05.2021)
* (Dirk-Peter-md) Zurücksetzen der Regenmenge im 24-Stunden-Modus hinzugefügt

### 0.1.4 (21.04.2021)
* (Dirk-Peter-md) Fehler bei deaktivierter Wettervorhersage behoben

### 0.1.3 (18.04.2021)
* (Dirk-Peter-md) Schaltabstand zwischen den Ventilen eingebaut, main.js aufgeteilt

### 0.1.2 (30.12.2020)
* (Dirk-Peter-md) Beschreibung von SprinkleControl überarbeitet

### 0.1.1 (08.11.2020)
* (Dirk-Peter-md) Integration von Nachrichten per Telegramm, E-Mail, Pushover und WhatsApp

### 0.0.12 (10.10.2020)
* (Dirk-Peter-md) Bewässerung über eine 2. Pumpe (Zisterne mit Vorrangschaltung) in abhängigkeit vom Füllstand hinzugefügt.

### 0.0.11 (30.08.2020)
* (Dirk-Peter-md) Bug in der Verarbeitung der Regenvorhersage vom Adapter "Das Wetter"
* (Dirk-Peter-md) Bug auf Travis CI


*************************************************************************************************************************************

## License
MIT License

Copyright (c) 2021 Dirk Peter <dirk.peter@freenet.de>

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
FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.