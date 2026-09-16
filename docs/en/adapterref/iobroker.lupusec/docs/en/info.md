---
chapters: {"pages":{"en/adapterref/iobroker.lupusec/README.md":{"title":{"en":"ioBroker.lupusec"},"content":"en/adapterref/iobroker.lupusec/README.md"},"en/adapterref/iobroker.lupusec/docs/en/info.md":{"title":{"en":"Sensor / Devices"},"content":"en/adapterref/iobroker.lupusec/docs/en/info.md"}}}
---
# Sensor / Devices

Every sensor or device sends a whole bunch of information. In ioBroker you see all the status information you can see in the Lupusec App. too. You have in ioBroker the same functionality too control the devices like switches, relays, shutter, ... like in the Lupusec App.
But it is not possible to change the settings of the Lupusec sensors and devices in ioBroker. Technical it is possible, but I think it does not make sense till now.

## Generic Information

All sensors and devices own follwoing states.

| state      | descriptions                                                                                                                                   | read/write |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| area       | area of alarm system                                                                                                                           | read       |
| battery_ok | the state ist false, if battery of the sensor is low or flat                                                                                   | read       |
| bypass     | This action allows you to activate or deactivate the bypass function of the selected sensor. This action can only be applied to alarm sensors. | read       |
| cond_ok    | conditon of sensor okay                                                                                                                        | read       |
| name       | name of sensor                                                                                                                                 | read/write |
| rssi       | value of Received Signal Strength Indication of sensor                                                                                         | read       |
| tamper_ok  | tampering contact is okay. This action can only be applied to alarm sensors.                                                                   | read       |
| type       | sensor type as number                                                                                                                          | read       |
| type_name  | sensor type as text                                                                                                                            | read       |
| zone       | sensor zone                                                                                                                                    | read       |

## Door contact / window contact (Type 4)

| Status          | Descriptinon | Read/Write |
| --------------- | ------------ | ---------- |
| alarm_status    |              | read       |
| alarm_status_ex |              | read       |
| status          |              | read       |
| status_ex       |              | read       |

## Water sensor (Type 5)

## Motion detector / 360 degree motion detector (Type 9)

## Smoke Detector / Heat Detector (Type 14)

## Status Indicator / Mini Indoor Siren (Type 22)

## Power Switch (Type 24)

## 1 channel relay with ZigBee repeater (Type 24)

## 2 channel relay with ZigBee repeater (Type 24)

## Keypad (Type 37)

## Power Switch Meter (Type 48)

## Room sensor V1 (Type 54)

## Dimmer (Type 66)

## Hue (Type 74)

## Roller shutter relay V1 (Type 76)

## Radiator thermostat (Type 79)

## Radiator thermostat V2 (Type 79)

## Light sensor (Type 78)

## CO sensor (Type 13)