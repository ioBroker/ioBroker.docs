![Logo](admin/hoover.png)

# ioBroker.hoover

[![NPM version](https://img.shields.io/npm/v/iobroker.hoover.svg)](https://www.npmjs.com/package/iobroker.hoover)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hoover.svg)](https://www.npmjs.com/package/iobroker.hoover)
![Number of Installations (latest)](https://iobroker.live/badges/hoover-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/hoover-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.hoover.png?downloads=true)](https://nodei.co/npm/iobroker.hoover/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.hoover/workflows/Test%20and%20Release/badge.svg)

## hoover adapter for ioBroker

Adapter for hoover devices

## Loginablauf

Die hon Mail und Passwort eingeben.

## Steuern

hoover.0.id.remote auf true/false setzen steuert den jeweiligen Befehl

hoover.0.id.remote.send für Benutzerdefinierte Befehle

Folgende Beispiele können angepasst und in hoover.0.id.remote.send gesendet werden.
Die Werte unter Paramter können angepasst werden.

Beispiel für AC:

Ac Start Kühlen

```json
{
  "macAddress": "set by adapter",
  "timestamp": "2024-04-12T10:16:04.886Z",
  "ancillaryParameters": {},
  "applianceOptions": {},
  "applianceType": "AC",
  "attributes": {
    "prStr": "PROGRAMS.AC.IOT_COOL",
    "channel": "mobileApp",
    "origin": "standardProgram"
  },
  "commandName": "startProgram",
  "device": {
    "mobileId": "78A04D05-8F3C-43BE-90A6-5BC3B1A2CA52",
    "mobileOs": "ios",
    "osVersion": "17.4.1",
    "appVersion": "2.7.9",
    "deviceModel": "iPhone10,5"
  },
  "parameters": {
    "onOffStatus": "1",
    "windSpeed": "5",
    "tempSel": "22"
  },
  "transactionId": "78-e3-6d-27-fb-f4_2024-04-12T10:16:04.886Z",
  "programName": "PROGRAMS.AC.IOT_COOL"
}
```

AC STOP

```json
{
  "ancillaryParameters": {},
  "applianceOptions": {},
  "applianceType": "AC",
  "attributes": {
    "channel": "mobileApp",
    "origin": "standardProgram"
  },
  "commandName": "stopProgram",
  "device": {
    "appVersion": "2.7.9",
    "deviceModel": "iPhone10,5",
    "mobileId": "78A04D05-8F3C-43BE-90A6-5BC3B1A2CA52",
    "mobileOs": "ios",
    "osVersion": "16.7.7"
  },
  "macAddress": "setbyadapter",
  "parameters": {
    "onOffStatus": "0"
  },
  "programName": "PROGRAMS.AC.IOT_COOL",
  "timestamp": "2024-04-12T10:21:44.919Z",
  "transactionId": "2024-04-12T10:21:44.919Z"
}
```

AC Einstellungen ändern

```json
{
  "macAddress": "set by adapter",
  "timestamp": "2024-04-12T10:52:40.997Z",
  "ancillaryParameters": {},
  "applianceOptions": {},
  "applianceType": "AC",
  "attributes": {
    "prStr": "Kühl",
    "channel": "mobileApp",
    "origin": "standardProgram"
  },
  "commandName": "startProgram",
  "device": {
    "mobileId": "78A04D05-8F3C-43BE-90A6-5BC3B1A2CA52",
    "mobileOs": "ios",
    "osVersion": "16.7.7",
    "appVersion": "2.7.9",
    "deviceModel": "iPhone10,5"
  },
  "parameters": {
    "10degreeHeatingStatus": "0",
    "ch2oCleaningStatus": "0",
    "cleaningTimeStatus": "0",
    "echoStatus": "0",
    "electricHeatingStatus": "0",
    "energySavePeriod": "15",
    "energySavingStatus": "0",
    "filterChangeStatusCloud": "0",
    "freshAirStatus": "0",
    "halfDegreeSettingStatus": "0",
    "healthMode": "0",
    "heatAccumulationStatus": "0",
    "humanSensingStatus": "0",
    "humidificationStatus": "0",
    "humiditySel": "30",
    "intelligenceStatus": "0",
    "lightStatus": "0",
    "lockStatus": "0",
    "machMode": "1",
    "muteStatus": "0",
    "onOffStatus": "1",
    "operationName": "grSetDAC",
    "pm2p5CleaningStatus": "0",
    "pmvStatus": "0",
    "rapidMode": "0",
    "screenDisplayStatus": "1",
    "selfCleaning56Status": "0",
    "selfCleaningStatus": "0",
    "silentSleepStatus": "0",
    "specialMode": "0",
    "tempSel": "22",
    "tempUnit": "0",
    "voiceSignStatus": "0",
    "voiceStatus": "0",
    "windDirectionHorizontal": "0",
    "windDirectionVertical": "2",
    "windSensingStatus": "0",
    "windSpeed": "3"
  },
  "transactionId": "2024-04-12T10:52:40.997Z",
  "programName": "PROGRAMS.AC.IOT_COOL"
}
```

AC Heizen

```json
{
  "macAddress": "set by adapter",
  "timestamp": "2023-10-29T19:01:37.014Z",
  "ancillaryParameters": {
    "ecoMode": {
      "category": "general",
      "typology": "range",
      "mandatory": 1,
      "defaultValue": "0",
      "minimumValue": "0",
      "maximumValue": "1",
      "incrementValue": "1"
    },
    "programFamily": {
      "category": "cluster",
      "typology": "enum",
      "mandatory": 1,
      "enumValues": ["standard"],
      "defaultValue": "[standard]"
    },
    "programRules": {
      "category": "rule",
      "typology": "fixed",
      "mandatory": 0,
      "fixedValue": {
        "tempSel": {
          "ecoMode": {
            "1": {
              "machMode": {
                "1": {
                  "typology": "fixed",
                  "fixedValue": "26"
                },
                "4": {
                  "typology": "fixed",
                  "fixedValue": "20"
                }
              }
            }
          }
        },
        "windSpeed": {
          "ecoMode": {
            "1": {
              "machMode": {
                "1|4": {
                  "typology": "enum",
                  "defaultValue": "1",
                  "enumValues": "1|2|3|5"
                }
              }
            }
          }
        },
        "windDirectionVertical": {
          "ecoMode": {
            "1": {
              "machMode": {
                "1|4": {
                  "typology": "fixed",
                  "fixedValue": "3"
                }
              }
            }
          }
        }
      }
    },
    "remoteActionable": {
      "category": "general",
      "typology": "fixed",
      "mandatory": 0,
      "fixedValue": "1"
    },
    "remoteVisible": {
      "category": "general",
      "typology": "fixed",
      "mandatory": 0,
      "fixedValue": "1"
    }
  },
  "applianceOptions": {},
  "applianceType": "AC",
  "attributes": {
    "prStr": "Heizen",
    "channel": "mobileApp",
    "origin": "standardProgram"
  },
  "commandName": "startProgram",
  "device": {
    "mobileId": "36bcee2ebe0dbdas",
    "mobileOs": "android",
    "osVersion": "28",
    "appVersion": "2.3.12",
    "deviceModel": "S23"
  },
  "parameters": {
    "onOffStatus": "1",
    "windSpeed": "5",
    "tempSel": "22"
  },
  "transactionId": "2023-10-29T19:01:37.014Z",
  "programName": "PROGRAMS.AC.IOT_HEAT"
}
```

## Diskussion und Fragen

<https://forum.iobroker.net/topic/55667/test-adapter-hoover-hon>

## Changelog

### 0.1.3 (2024-10-21)

- fix for login

### 0.0.7

- (TA2k) add wizard app login

### 0.0.6

- (TA2k) fix login

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022-2030 TA2k <tombox2020@gmail.com>

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

```

```
