---
chapters: {"pages":{"en/adapterref/iobroker.noolitef/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.noolitef/README.md"},"en/adapterref/iobroker.noolitef/docs/install.md":{"title":{"en":"Installation Guide"},"content":"en/adapterref/iobroker.noolitef/docs/install.md"},"en/adapterref/iobroker.noolitef/docs/programming.md":{"title":{"en":"Programming Guide"},"content":"en/adapterref/iobroker.noolitef/docs/programming.md"},"en/adapterref/iobroker.noolitef/docs/devices.md":{"title":{"en":"Device Setup List"},"content":"en/adapterref/iobroker.noolitef/docs/devices.md"}}}
---
# Device Setup List 

## Type of device

### On Off switcher

*On Off switcher* - The separatelly buttons for ON and OFF command object

The device has the following states:

* onTurnOn - set *true* if user press ON button
* onTurnOff - set *true* if user press OFF button
* onBrightUp - set *true* if user long press ON button
* onBrightDown - set *true* if user long press OFF button
* onStopReq - *true* when the user has stopped long pressing the buttons
* onLowBattery - set *true* if battery is low

### On and Off keypad

*On and Off keypad* - The button with both ON and OFF command object

The device has the following states:

* onSwitch - change *true/false* when user press this button
* onBrightBack - set *true* value if user long press this button
* onStopReq - *true* when the user has stopped long pressing the button
* onLowBattery - set *true* if battery is low

### Scenario button

*Scenario button* - The scenario button for preset noolite devices object

The device has the following states:

* onExecuteScenario - set *true* when user short press this button
* onSaveScenario - set *true* when user long press this button
* onLowBattery - set *true* if battery is low

### RGB Remote control

*RGB Remote control* - RGB remote control with on/off button, color select button and cycle color button object

The device has the following states:

* onSwitch - change *true/false* when user press ON/OFF button
* onSwitchMode - set *true* when user press _select mode_ button
* onSwitchColour - set *true* when user press _select colour_ button
* onBrightBack - set *true* when user long press ON/OFF button
* onStopReq - *true* when the user has stopped long pressing the ON/OFF button
* onLowBattery - set *true* if battery is low

### Door Sendor
*Door sensor* - The door magnetic sensor object

The device has the following states:

* isOpen - *true* if the door is open, *false* if the door is closed
* onLowBattery - set *true* if battery is low
  
### Water Sensor

*Water sensor* - The Water sensor device object

The device has the following states:

* Alarm - *true* if a water leak is detected
* onLowBattery - set *true* if battery is low
  
### Motion Sensor

*Motion sensor* -  The motion sensor device object

The device has the following states:

* MotionDetect - set to *true* if the sensor detected movements, otherwise - *false*
* onLowBattery - set *true* if battery is low
  
### Switch

*Switch* - The simple relay object

* status - if set as *true* driver send to relay *on* command, otherwise - *off* command

### Dimmer

*Dimmer* - The relay with dimmer functional object

The device has the following states:

* status - if set as *true* driver send to relay *on* command, otherwise - *off* command
* brightness - send *setBrightness* command to relay with value of state. The value is measured as a percentage

### RGB ribbon

*RGB Ribbon* - The RGB controller object

The device has the following states:

* status - if set as *true* driver send to relay *on* command, otherwise - *off* command
* currentColor - set color for RGB Ribbon. Color set as *#RRGGBB* patterns