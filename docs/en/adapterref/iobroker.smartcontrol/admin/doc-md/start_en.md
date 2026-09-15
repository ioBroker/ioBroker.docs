---
chapters: {"pages":{"en/adapterref/iobroker.smartcontrol/README.md":{"title":{"en":"ioBroker.smartcontrol"},"content":"en/adapterref/iobroker.smartcontrol/README.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/start_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-target-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-conditions_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-motion_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-devices_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-trigger-times_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-zones_de.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_en.md"},"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.smartcontrol/admin/doc-md/table-execution_de.md"}}}
---
<!-- Markdown Collapsible Section, see https://gist.github.com/pierrejoubert73/902cc94d79424356a8d20be2b382e1ab -->
<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">About this adapter</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

In our home automation we have several **triggers**, e.g.
 * motion sensor in the corridor triggers, 
 * a wall switch is pressed, 
 * a certain time occurs (e.g. 30 minutes after sunset or Mon-Fri at 7:00)

In addition, we often want that additional conditions are (not) met (e.g. 'Today is a holiday', 'living room window is open', brightness is greater than 100 lux, etc.).

So as soon as something triggers and optionally conditions apply or do not apply, target states (i.e. **Target devices**) should be switched.
In addition, a timer should run after a motion sensor is triggered, which (as soon as there is no more motion) switches off the target devices after the set number of seconds.

Smart Control takes care of this and executes everything according to IFTTT.

The goal is to replace many JavaScript and Blockly's and to provide a very user-friendly environment for various scenarios.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">How to start?</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

You simply go through the individual options pages (tabs) as follows:

| Tab | What to do |
|--------|------------|
|1. TARGET DEVICES | Here you enter all your target devices to be switched, e.g. lights, radio, etc. You can enter single device states in the first table, and/or use so-called enumerations ("enums") in the second table. [Documentation link : Enumerations](https://www.iobroker.net/#en/documentation/admin/enums.md) |
|2. ADDITIONAL CONDITIONS | *optional*: Here you enter additional conditions that should (not) apply, e.g.: nobody present, holiday today, etc. |
|3. TRIGGERS |Here you enter triggers, e.g. motion sensors, wall switches, etc., as well as any time-dependent triggers (e.g. every day at 8:00 am). |
|4 ZONES |Here you bring everything together by defining all "zones" (e.g. bathroom 1st floor, coffee corner, etc.) and assigning triggers and target devices to be switched, as well as defining further conditions for execution. |
| FURTHER OPTIONS | Here you can set additional adapter options. |

### By clicking on the dark blue highlighted headline you will get more information about the settings, example:

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_show-explanation.gif?raw=true)

### Note: Drop-down fields in tables

Drop-down fields that offer several selectable values must be clicked "on the side". This is an issue of the ioBroker admin adapter, not of Smart Control. [The issue is reported and addressed](https://github.com/ioBroker/ioBroker.admin/issues/590) in the ioBroker admin adapter, and will come with the next update.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_dropdown-ani.gif?raw=true)

<br>Simple remedy: Just click on the blue button to the left of it and you will get a much better selection dialog:

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_open-dialog.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Adapter states</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### smartcontrol.x.info.astroTimes

Here you see all current astro times of your geo-coordinates, which you have set in the ioBroker-Admin-Options (wrench top left).

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-astro.png?raw=true)

### smartcontrol.x.info.log.zoneActivations.json

With <code>smartcontrol.x.info.log.zoneActivations.json</code> the adapter provides a state, which provides information as JSON once a a zone has been successfully executed  (the newest entry appears at the top). In the adapter options, tab "FURTHER OPTIONS" -> "Logging", you can set the number of JSON entries accordingly.

### smartcontrol.x.options

Here you can switch on and off individual rows for each options table (state 'active').
<br>In addition you can change the time in seconds (state 'duration') and the brightness threshold (state 'briThreshold') for all motion sensors.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-options-motion.png?raw=true)

**Please note:** A change of these states causes a restart of the adapter instance so that the changes can take effect.

### smartcontrol.x.targetDevices

For each table row under "1. TARGET DEVICES" the adapter adds linked states here. If you change these states, the original target state is changed accordingly, and vice versa.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-target-devices.png?raw=true)

### smartcontrol.x.Test

Here you have states purely for testing the adapter. These states do not provide any functions or features and are only used to test the adapter. After the first installation of an instance of this adapter, the adapter options are preset with some of these states. For example, start testing by activating a trigger state, e.g. set 'smartcontrol.0.Test.trigger.Bathroom_motion' to 'true'. Then you check if something is triggered (based on the settings in '4. ZONES' etc.).
<br>The ioBroker Log (ioBroker Admin > Log) provides detailed information. For debugging, please set the log level of the adapter instance to 'debug' to get much more information in the log.

![image](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/blob/master/admin/doc-md/img/start_states-test.png?raw=true)

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

<details>
  <summary style="font-size:1.3em; border:1px solid #ddd; background-color:#E0EBF3; color:black; padding:10px 0 10px 5px">Questions / problems / suggestions for improvement</summary> <!-- Header -->
  <!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->

### Questions about usage, etc.

The best way is to ask a question in the ioBroker forum, ideally you reference @Mic so that I, as the developer, get a notification. Current forum thread for this adapter is here: [ioBroker-Forum: Smart Control](https://forum.iobroker.net/topic/36728/). Feel free to write in English or German.

### Error / Bug

First check the ioBroker log for all hints and follow them accordingly. If you are not sure if you have done everything correctly in the adapter settings, see above -> *Questions about usage, etc.*. 
<br>If you really have an error caused by this adapter:
1. go to [GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues) and open a new issue. 
2. describe **in detail** the issue and step-by-step what you were doing when/before the bug occurred. Also set the log level of the adapter to "debug", reproduce the error and set the log output in code tags in the issue. ioBroker cuts off log lines, so please go directly to the log file (by clicking on "Download Log"). 
3. add screenshots, if likely helpful for me as developer
4. add the adapter options export, if possibly useful for troubleshooting for me, by clicking on the blue "arrow down" button in the top right corner of the SmartControl adapter options

### Enhancement/feature requests

Open a new Github issue at [GitHub: Smart Control Issues](https://github.com/iobroker-community-adapters/ioBroker.smartcontrol/issues), in English or German.

</details>
<!-- Markdown Collapsible Section - We must have an empty line below (per link above)  -->