---
chapters: {"pages":{"en/adapterref/iobroker.alarm/README.md":{"title":{"en":"ioBroker.alarm"},"content":"en/adapterref/iobroker.alarm/README.md"},"en/adapterref/iobroker.alarm/docs/en/alarm_en.md":{"title":{"en":"ioBroker.alarm"},"content":"en/adapterref/iobroker.alarm/docs/en/alarm_en.md"}}}
---
![Logo](admin/alarm.png)
# ioBroker.alarm

![Number of Installations](http://iobroker.live/badges/alarm-installed.svg) ![Number of Installations](http://iobroker.live/badges/alarm-stable.svg)[![NPM version](http://img.shields.io/npm/v/iobroker.alarm.svg)](https://www.npmjs.com/package/iobroker.alarm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.alarm.svg)](https://www.npmjs.com/package/iobroker.alarm)
[![Known Vulnerabilities](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)](https://snyk.io/test/github/misanorot/ioBroker.alarm)

[![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)](https://nodei.co/npm/iobroker.alarm/)

**Github Actions**:

![GitHub Actions](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=ZYHW84XXF5REJ&source=url)

# Contents
* [Overview](#iobroker-alarm)
* [Main Settings](#tab-main-settings)
* [Notifications](#tab-notifications)
* [Monitoring](#tab-monitoring)
* [Speech Output](#tab-speech-output)
* [Shortcuts](#tab-shortcuts)
* [Other Alarms](#tab-other-alarms)
* [Zones](#tab-zones)
* [Presence Simulation](#tab-presence)
* [States](#states)

## ioBroker Alarm

This adapter allows you to set up a home alarm system without extensive programming knowledge.
It offers the ability to configure 3 security circuits and monitor them during night rest, activation, or deactivation. Additionally, internal adapter states can be directly linked to external states. These links are configured in the Shortcuts tab. A simple presence simulation can be easily configured to enhance protection against burglars. Notifications about various events are also possible and can be sent via various channels such as Telegram or Email. *(Provided the corresponding adapter is installed!)*

**All states for monitoring and zones must be of type "boolean"! *(true, false, 1, 0)***

----------------------------------------------------------------------------------------------------------------------

### Tab Main Settings

Here you configure settings such as night rest times, siren duration, silent alarm, and password.

* **Activation time**: Delay before activation when using a delay data point
* **Siren time at burglary**: During a burglary, the data point alarm.0.status.siren / siren_inside is set to true for this duration
* **Flash frequency at burglary**: Used to control a lamp
* **Siren time at sharp inside**: During a burglary in sharp-inside mode, the data point alarm.0.status.siren_inside is set to true for this duration
* **Night rest start & end**: These settings are used for automatic night rest (optional)
* **Password**: For activation/deactivation of the system via password
* **Alarm delay**: Delay time before burglary is triggered (during this time, the silent alarm is triggered)
* **Log**: When selected, various messages are written to the info log list
* **Ignore states**: If a window of the alarm circuit is open during activation, this is ignored and the system is activated with warnings
* **Outdoor siren for inside**: When selected, the outdoor siren is also triggered when the sharp-inside alarm is triggered
* **Leave mode**: When selected, the alarm system is activated before the countdown expires if the corresponding contact is triggered (must be selected in the Monitoring tab)

#### Delayed Triggering

Sensors with trigger mode "Delayed" (e.g., motion detectors, IP cameras) do not immediately raise an alarm. Instead, they only trigger an alarm when a configurable number of **different** delayed sensors have been activated within a specified time window. This significantly reduces false alarms from unreliable sensors while maintaining security effectiveness.

**Configuration:**

* **Number of sensors**: How many unique delayed-mode sensors must trigger to raise an alarm (default: 3)
* **Time window (min)**: The time window in minutes within which the sensors must trigger (default: 2)

**How it works:**

1. A delayed-mode sensor triggers and is recorded with a timestamp.
2. Entries older than the configured time window are automatically removed.
3. If the number of unique delayed sensors that have triggered within the time window reaches the configured threshold, a full alarm is raised.
4. When the alarm system is deactivated, all recorded delayed triggers are cleared.

**Example:** With the default settings (3 sensors, 2 minutes), if 3 different motion detectors detect movement within 2 minutes, the alarm is triggered. A single motion detector triggering 3 times does **not** meet the threshold — it must be 3 **different** sensors.

**Use cases:**

| Sensor Type | Recommended Mode | Reason |
|---|---|---|
| Door/window contacts | Direct | Highly reliable, immediate response needed |
| Glass break sensors | Direct | Highly reliable, immediate response needed |
| Motion detectors | Delayed | May produce false positives |
| Presence sensors | Delayed | May produce false positives |
| IP cameras | Delayed | May produce false positives |

Each circuit can be configured individually in the Monitoring tab by setting the "Trigger mode" column to either "Direct" or "Delayed".

----------------------------------------------------------------------------------------------------------------------

### Tab Notifications

Notifications via other adapters such as Telegram, Email, or others.

* **1:** Add the corresponding adapter or instance. Can also be entered directly!
* **2:** For notifications to the Telegram adapter, it is possible to use user or chat IDs.

**If a zone is selected in the Zones area, a notification is sent regardless of the system state!**

----------------------------------------------------------------------------------------------------------------------

### Tab Monitoring

Here the circuits of the system are configured.
*The names of the states can be changed.*

The alarm circuit has "high" priority and takes precedence over all other circuits when the system is activated (sharp). It is used for the actual monitoring of the system, corresponding to full protection of an alarm system. The sharp-inside circuit is monitored when the system is in the sharp-inside state, corresponding to perimeter protection. The notification circuit is only used for notifications during the states sharp, sharp inside, and night rest.
*It is perfectly possible to check all three circuits for a single state.*

* **1:** Add a device
* **2:** Edit a device
* **3:** If it is necessary to trigger individual states not on *true* but on *false* (e.g., wire-break-safe sensors), you can check "negate".
* **4:** Alarm circuit
* **5:** If you have a contact that should not trigger the alarm circuit immediately, you can activate "silent alarm". After the configured time (Main Settings) expires, the alarm is triggered.
* **6:** If you have enabled the "leave" option in the Main Settings tab, you can select "leave" for the corresponding data point. This means that during delayed activation, the countdown does not have to expire — closing the door is sufficient.
* **7:** Sharp inside circuit
* **8:** When selected, the silent alarm is also triggered for sharp inside
* **9:** Notification circuit
* **10:** Trigger mode — "Direct" triggers the alarm immediately, "Delayed" requires confirmation from multiple sensors within a time window (see [Delayed Triggering](#delayed-triggering))

----------------------------------------------------------------------------------------------------------------------

### Tab Speech Output

If speech output is desired, e.g., when the state changes, it can be configured here with the desired phrases.
*You must ensure that the selected data point can be written with text! E.g., "sayit.0.tts"*

* **1:** If you want to have names announced with announcements, you can select this option.
* **2:** Add a device
* **3:** Delay time of speech output in ms (e.g., for different rooms)

----------------------------------------------------------------------------------------------------------------------

### Tab Shortcuts

Here it is possible to directly link adapter-internal states with external states. This eliminates the need for a script or similar workaround. For example, it is possible to lock a door when night rest begins.

* **1:** Add a device
* **2:** Select which internal state should trigger the reaction
* **3:** Select which value should be triggered on
* **4:** ID to be set
* **5:** Value to write to the ID
* **6:** Select which ID should trigger the reaction
* **7:** Trigger --> any = triggered on every change / ne = triggered only when value changes
* **8:** Select which value should be triggered on
* **9:** Select which internal state should be written to

----------------------------------------------------------------------------------------------------------------------

### Tab Other Alarms

Two freely configurable monitoring circuits are available. These are monitored constantly regardless of the alarm system state!
By default, these are labeled as fire and water alarm. Throughout the configuration, these are labeled as circuits 1 and 2.

If it is necessary to trigger individual states not on *true* but on *false* (e.g., wire-break-safe sensors), you can check "negate".

#### Make sure not to use any states from the main monitoring circuits!

----------------------------------------------------------------------------------------------------------------------

### Tab Zones

3 zones are available for free configuration. These are typically used for monitoring and notification of lower-value areas, such as a stable or similar. These 3 zones operate independently of the main circuit monitoring. If you want to integrate them into the main circuit, you can add the respective zone state *e.g., alarm.X.zone.one* to the main circuit (Monitoring tab). However, this means that notifications for the corresponding zones will be ignored.

Via the state *alarm.x.zone.one_on_off*, you can activate or deactivate the zone at any time without restarting the adapter! This allows, for example, motion detectors to be integrated more flexibly into the main circuit.

*Note: When integrated into the main circuit, these are also displayed in the lists when deactivated.*

----------------------------------------------------------------------------------------------------------------------

### Tab Presence

Here you can configure an ID-specific presence simulation that can be optionally activated when the system is set to "sharp". The data point *alarm.X.presence.on_off* is available as an option, allowing you to activate or deactivate the simulation without restarting the adapter.

Execution per state occurs only ONCE!
If the instance is restarted during an active system, the presence simulation will NOT be continued until the next activation! If the value of the configured state changes during the simulation, this is not taken into account!

* **1:** Setting the global delay time before the simulation starts (before the ID-specific settings take effect)
* **2:** Add a device
* **3:** Open the specific settings for the ID

#### Presence Settings

* **Trigger mode:** time = time range, sunrise = sunrise until noon, sunset = sunset until 10 PM, light = when the light value of the trigger falls below the set threshold
* **Time range from/to:** Time window in which the simulation should take place
* **On duration:** How long the ID should remain switched on
* **Random factor:** Highest (1-10) random factor for the time
* **Time delay:** Delay after the mode trigger occurs
* **Value ON/OFF:** Values to write when switching on/off
* **Light sensor trigger:** State ID for light sensor (for light mode)
* **Light value:** Lux threshold below which the device activates

*(The trigger query occurs every minute)*

**For the presence simulation, a location configuration is required! Correct functionality of sunrise and sunset requires a correct location specification!**

----------------------------------------------------------------------------------------------------------------------

### States

The adapter provides a number of states:

#### "alarm.x.use....."
These are the actual states for operating the alarm system.

- use.activate_nightrest -> Activate night rest
- use.activate_sharp_inside_circuit -> Activate monitoring of the warning circuit (sharp inside)
- use.disable -> Deactivate the system (alarm circuit)
- use.enable -> Activate the system (alarm circuit)
- use.enable_with_delay -> Activate the system (alarm circuit) with delay
- use.list -> Deactivate/Activate/Warning circuit/Activate with delay
- use.quit_changes -> Reset states *info.notification_circuit_changes, info.sharp_inside_siren, status.activation_failed, other_alarms.one_changes, other_alarms.two_changes*
- use.toggle_password -> Deactivate/Activate the system (alarm circuit) with password
- use.toggle_with_delay -> Deactivate/Activate the system (alarm circuit) with delay
- use.toggle_with_delay_and_password -> Deactivate/Activate the system (alarm circuit) with password and delay
- use.panic -> Manual triggering of the alarm system (burglary), even when deactivated

#### "alarm.x.status...."
Here you can read the state of the system.

- status.sleep -> Signals the state of automatic night rest

#### "alarm.x.info...."
Provides additional information such as which "doors are open" or a log state.
The log_today state is cleared at midnight.

#### "alarm.x.other_alarms...."
Contains information about the "other" alarm circuits 1 + 2.

#### "alarm.x.zone...."
Shows whether there was a trigger in the respective zones.

----------------------------------------------------------------------------------------------------------------------

## Problems
- If you add a Telegram or similar via the +, you can only select one state of the instance and must delete everything up to *telegram.0*.

#### Important: Use of this adapter is at your own risk. No liability is accepted for any malfunctions!