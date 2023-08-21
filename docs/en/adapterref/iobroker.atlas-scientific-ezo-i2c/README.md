![Logo](admin/atlas-scientific-ezo-i2c.png)

# ioBroker.atlas-scientific-ezo-i2c

[![NPM version](https://img.shields.io/npm/v/iobroker.atlas-scientific-ezo-i2c.svg)](https://www.npmjs.com/package/iobroker.atlas-scientific-ezo-i2c)
[![Downloads](https://img.shields.io/npm/dm/iobroker.atlas-scientific-ezo-i2c.svg)](https://www.npmjs.com/package/iobroker.atlas-scientific-ezo-i2c)
![Number of Installations](https://iobroker.live/badges/atlas-scientific-ezo-i2c-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/atlas-scientific-ezo-i2c-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.atlas-scientific-ezo-i2c.png?downloads=true)](https://nodei.co/npm/iobroker.atlas-scientific-ezo-i2c/)

**Tests:** ![Test and Release](https://github.com/Buzze11/ioBroker.atlas-scientific-ezo/workflows/Test%20and%20Release/badge.svg)

### If you like this adapter, please read this to the end and help me with donating my efforts

I am happy about every single person I can help to integrate these great Atlas Scientific Sensors into their own home, and I hope you can imagine how much time and effort such an adapter development entails.. That said, I'm very thankful about your help to me with a donation in Paypal..

[![Donate with PayPal](https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=7PGJFJX8X3Y82)

## Atlas Scientific EZO I2C Adapter for ioBroker

This ioBroker Adapter integrates several Atlas Scientific EZO Devices https://atlas-scientific.com/ into your own ioBroker environment. The EZO devices have to be configured for I2C Bus and have to be mounted on a device (e.g. RaspberryPi..) with configured and enabled I2C Bus.

### Currently Supported Devices

* EZO DO - Dissolved Oxygen -> https://atlas-scientific.com/dissolved-oxygen
* EZO ORP - Oxidation-reduction potential -> https://atlas-scientific.com/orp
* EZO pH - Potential of Hydrogen -> https://atlas-scientific.com/ph
* EZO RTD - Resistance Temperature Detector -> https://atlas-scientific.com/temperature
* EZO PMP - Embedded Peristaltic Dosing Pump -> https://atlas-scientific.com/peristaltic/ezo-pmp/ (untested due to missing hardware)
* EZO EC - Electrical conductivity -> https://atlas-scientific.com/conductivity

### Future Support
* Please create a feature request issue, if you think about further implementations


## Getting started

### Installation

Especially make sure, that you have properly configured and enabled I2C on your system (if needed):

-   [Configuring I2C on the Raspberry Pi](https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md)

### Setup Adapter

After the Adapter installation and the preconfiguration on the RaspberryPi you will find the new Adapter in the Instaces Section where you can further configure your sensors.

![Image](pictures/adapter_instance.png)

With a click on the wrench icon a new settings window will appear, pre selected with the "General" Settings Tab.

Here you have to insert the I2C Number into the Textfield which has been configured on the Raspberry Pi (0 or 1). Afterwards you can press the "Device Search"-Button to search for all connected EZO circuits. The detected device-addresses will be listed on the left hand side.

![Image](pictures/device_search.png)

With a click on one of the detected devices the "unconfigured" device screen appears.

![Image](pictures/unconfigured_device.png)

Click the dropdown menu to select the type of your desired device.

![Image](pictures/device_selector.png)

After you`ve selected the type of device the settings screen for the desired device appear. Repeat those steps for each device you want to use.

![Image](pictures/configured_device.png)

## General Configuration (all devices)

* **Address:** Non adjustable (except change of IP Address)
* **Device Type:** Desired Device Type Dropdown
* **Name:** Name of the Device stored on the device later on (Whitespace will be removed. If longer than 16 characters, only the first 16 will be sent.)
* **Polling Interval:** Interval in milliseconds for the device value polling. If > 0 the device will be reading all values in this intervall. Please increase the intervall time when you will receive wrong readings. I suggest at least to start with 15000ms
* **Active Switch:** Switch to enable or disable the use of that sensor
* **LED Active Switch:** With this setting you can enable or disable the LED on the EZO Device

### Common Functionalities (all devices)

* **"Find EZO Board"-Button** -> With a click on this button the LED on the EZO Board starts flashing fast.
* **"Factory Reset"-Button** -> Execute a factory reset for that device
* **"Change I2C Address"-Button** -> Here you can program a new I2C Address for that adapter. Please make sure you save the config afterwards.

### Common States / Objects (all devices)
Some states have a state change detection mechanism running which gives the possibility that some values can be set not only by the Admin UI but additionally with changes directly to the state value from outside. (e.g. via Script or manually) This can be useful for example if you want to use comepsation values from a sensor like temperature to adjust the temperature compensation value on the PH Sensor.

* **"IsPaused"** -> Switch to temporarely pause all measure readings from Device unless it is "Actice" during runtime. true = paused, false = measurements active. Value is defaultet to false (measure active) on Adapter Start/Restart.


## DO-Related funtionalities & Settings

### DO Admin-UI Elements

![Image](pictures/do_config.png)

* **"Clear Calibration"-Button** -> Delete calibration Data  
* **"Calibrate Atmospheric"-Button** -> calibrate to atmospheric oxygen levels  
* **"Calibrate 0DO"-Button** -> calibrate device to 0 dissolved oxygen  
* **"Set Temp. Compensation"-Button** -> set the temperature compensation with the desired value inside the textfield e.g. 20.4  
* **"Set Pressure Compensation"-Button** -> set the pressure compensation with the desired value in kPA inside the textfield e.g. 101.3  
* **"Set Salinity Compensation"-Button** -> set the salinity compensation with the desired value inside the textfield e.g. 50000 us  
* **"isPpt"-Switch** -> Switch to define if Salinity value read/set in ppt instead of us

### DO States with include State change detection

For DO Sensor following states are listening for changes: 
* **"Temperature_compensation"** -> Sets the temperature compensation
* **"Salinity_compensation"** -> Sets the salinity compensation
* **"Pressure_compensation"** -> Sets the pressure compensation
* **"Calibrate_Clear"** -> Set to true to clear sensor calibration. Will be set to false calibration was cleared.
* **"Calibrate_Atmospheric"** -> Set to true to run an atmospheric sensor calibration. Will be set to false after calibration run.
* **"Calibrate_Zero_DO"** -> Set to true to to run a zero dissolved oxygen sensor calibration. Will be set to false after calibration run.


## pH-Related funtionalities & Settings

### PH Admin-UI Elements

![Image](pictures/ph_config.png)

* **"Clear Calibration"-Button** -> Delete calibration Data  
* **"Calibrate Low"-Button** -> execute the low value calibration (usually 4.0 )
* **"Calibrate Mid"-Button** -> execute the mid value calibration (usually 7.0 )  
* **"Calibrate High"-Button** -> execute the high value calibration (usually 10.0 )  
* **"Set Temp. Compensation"-Button** -> set the temperature compensation with the desired value inside the textfield e.g. 20.4

### pH States with include State change detection

For pH Sensor following states are listening for changes: 
* **"Temperature_compensation"** -> Sets the temperature compensation
* **"Calibrate_Clear"** -> Set to true to clear sensor calibration. Will be set to false automatically after calibration was cleared.
* **"Calibrate_Low"** -> Set a dot separated value e.g. 4.0 to run the low calibration with desired value. Will be cleared after calibration automatically
* **"Calibrate_Mid"** -> Set a dot separated value e.g. 7.0 to run the low calibration with desired value. Will be cleared after calibration automatically
* **"Calibrate_High"** -> Set a a dot separated value e.g. 10.0 to run the low calibration with desired value. Will be cleared after calibration automatically


## ORP-Related funtionalities & Settings

### ORP Admin-UI Elements

![Image](pictures/orp_config.png)

* **"Clear Calibration"-Button** -> Delete calibration Data  
* **"Calibrate"-Button** -> calibrate to desired value

### ORP States with include State change detection

For ORP Sensor following states are listening for changes: 
* **"Temperature_compensation"**"-> Sets the temperature compensation
* **"Calibrate_Clear"** -> Set to true to clear sensor calibration. Will be set to false automatically after calibration was cleared.
* **"Calibrate"** -> Set a dot separated value e.g. xx.x mV to run the calibration with desired value. Will be cleared after calibration automatically

## EC-Related funtionalities & Settings

### EC Admin-UI Elements

![Image](pictures/ec_config.png)

* **"Clear Calibration"-Button** -> Delete calibration Data  
* **"Calibrate Dry"-Button** -> run a dry sensor calibration
* **"Calibrate Low"-Button** -> calibrate device low point to desired value  
* **"Calibrate High"-Button** -> calibrate device high point to desired value
* **"Calibrate Singlepoint"-Button** -> calibrate device singlepoint to desired value


* **"Set Temp. Compensation"-Button** -> set the temperature compensation with the desired value inside the textfield e.g. 20.4  
* **"Set TDS Conversion"-Button** -> set the TDS (ppt) conversion factor with the desired value from the textfield between 0.001 to 1.00 
* **"Set Probe Type"-Button** -> set the used probe type to the desired type from the textfield (K0.1, K1.0 or K10)  
* **"EC(us)"-Switch** -> Switch to enable or disable "Conductivity = μS/cm" inside the reading string
* **"TDS(ppm)"-Switch** -> Switch to enable or disable "Total dissolved solids = ppm" inside the reading string
* **"S(ppt)"-Switch** -> Switch to enable or disable "Salinity = PSU (ppt) 0.00 – 42.00" inside the reading string
* **"SG"-Switch** -> Switch to enable or disable "Specific gravity (sea water only) = 1.00 – 1.300" inside the reading string


### EC States with include State change detection

For EC Sensor following states are listening for changes: 
* **"Temperature_compensation"** -> Sets the temperature compensation
* **"Calibrate_Clear"** -> Set to true to clear sensor calibration. Will be set to false calibration was cleared.
* **"Calibrate_Singlepoint"** -> Set to true to run a singlepoint sensor calibration. Will be set to false after calibration run.
* **"Calibrate_Dry"** -> Set to true to run a dry sensor calibration. Will be set to false after calibration run.
* **"Calibrate_Low"** -> Set to true to to run a low sensor calibration with the desired value. Will be cleared after calibration automatically
* **"Calibrate_High"** -> Set to true to to run a high sensor calibration with the desired value. Will be cleared after calibration automatically


## RTD-Related funtionalities & Settings

### RTD Admin-UI Elements

![Image](pictures/rtd_config.png)

* **"Clear Calibration"-Button** -> Delete calibration Data  
* **"Calibrate"-Button** -> calibrate to desired value

### RTD States with include State change detection

For RTD Sensor following states are listening for changes: 
* **"Calibrate_Clear"** -> Set to true to clear sensor calibration. Will be set to false automatically after calibration was cleared.
* **"Calibrate"** -> Set a dot separated value e.g. xx.x mV to run the calibration with desired value. Will be cleared after calibration automatically

## Pump-Related funtionalities & Settings

### Pump Admin-UI Elements

![Image](pictures/pump_config.png)

* **"Clear Calibration"-Button** -> Delete calibration Data  
* **"Calibrate"-Button** -> calibrate to desired volume

### Pump Control Section

* **"Reverse"-Switch** -> If set in the config all commands to the pump will be executed with the reverse Flag set so that the pump direction is inverted 
* **"Clear dispensed Volume"-Button** -> The total dispensed volume counter will be set to 0
* **"Continous Dispense"-Button** -> Pump will continuously run at ~105ml/min (with supplied tubing)
* **"Stop Dispense"-Button** -> Pump will immediately stop dispensing 
* **"Pause Pump"-Button** -> Pump will immediately pause dispensing 
* **"Set Dose over Time"-Button** -> Pump will dispense the given amount of ml within the given duration in minutes
* **"Dispense Volume"-Button** -> Pump will dispense the given amount of ml 
* **"Set constant Flow Rate"-Button** -> Pump will dispense the given amount of ml per minute "ml/min" for the given duration in minutes

### Pump States with include State change detection
For EZO Pumps the following states are listening for changes: 
* **"Continous_dispense"** -> If set to true the pump will jump into continous dispense mode with 105ml/min (reverse switch considered). If set to false the pump will stop dispensing.
* **"Dose_over_time"** -> Format: commaseparated values ml,duration in min -> Dispenses the given volume over the given minutes. ml for volume and duration in minutes. Negative amounts will run the pump in reverse. The state will be cleared automatically after the command has been executed.
* **"Dispense_volume"** -> Dispenses the given volume(ml). Negative amounts will run the pump in reverse. The state will be cleared automatically after the command has been executed.
* **"Constant_flow_rate"** -> Format: commaseparated values ml per min,duration -> Dispenses constantly the given volume/min over the given duration in minutes. ml for volume/min and duration in minutes. Negative amounts will run the pump in reverse.  The state will be cleared automatically after the command has been executed.
* **"Pause_Pump"** -> If set to true the pump will be paused. Unpause is done on next dispense action.

## PRS-Related funtionalities & Settings

### PRS Admin-UI Elements

![Image](pictures/prs_config.png)

* **"Clear Calibration"-Button** -> Delete calibration Data  
* **"Calibrate Zeropoint"-Button** -> calibrate device zeropoint 
* **"Calibrate High"-Button** -> calibrate device high point to desired value

* **"psi"-Switch** -> Switch to enable or disable "output will be in psi" inside the reading string
* **"atm"-Switch** -> Switch to enable or disable "output will be in atm" inside the reading string
* **"bar"-Switch** -> Switch to enable or disable "output will be in bar" inside the reading string
* **"kPa"-Switch** -> Switch to enable or disable "output will be in kPa" inside the reading string
* **"inh2o"-Switch** -> Switch to enable or disable "output will be in inches of water" inside the reading string
* **"cmh2o"-Switch** -> Switch to enable or disable "output will be in cm of water" inside the reading string


### PRS States with include State change detection

For PRS Sensor following states are listening for changes: 
* **"Calibrate_Clear"** -> Set to true to clear sensor calibration. Will be set to false calibration was cleared.
* **"Calibrate_Zeropoint"** -> Set to true to run a zeropoint sensor calibration. Will be set to false after calibration run.
* **"Calibrate_High"** -> Set to true to to run a high sensor calibration with the desired value. Will be cleared after calibration automatically
* **"Alarm_enabled"** -> Set to true to to enable Alarm pin from sensor, false to disable
* **"Alarm_Threshold"** -> Set the desired value for alarm threshold. After change value will be written to sensor
* **"Alarm_Tolerance"** -> Set the desired value for alarm threshold. After change value will be written to sensor


## Visualization example with Grafana Dashboard

Here you can see a little example how easy it ist to visualize the adapter values. For this example an InfluxDB instance is collecting and storing the values delivered from the adapter. 

![Image](pictures/dashboard_example.png)

<details>
  <summary>Example Code Grafana-Dashboard JSON</summary>
  
  ### JSON Export from Grafana
  ```json
{
    "annotations": {
      "list": [
        {
          "builtIn": 1,
          "datasource": {
            "type": "grafana",
            "uid": "-- Grafana --"
          },
          "enable": true,
          "hide": true,
          "iconColor": "rgba(0, 211, 255, 1)",
          "name": "Annotations & Alerts",
          "type": "dashboard"
        }
      ]
    },
    "editable": true,
    "fiscalYearStartMonth": 0,
    "graphTooltip": 0,
    "id": 1,
    "links": [],
    "liveNow": false,
    "panels": [
      {
        "collapsed": false,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 0
        },
        "id": 16,
        "panels": [],
        "title": "Temperatur (RTD)",
        "type": "row"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "mappings": [],
            "max": 28,
            "min": 0,
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 0
                },
                {
                  "color": "#EAB839",
                  "value": 10
                },
                {
                  "color": "dark-green",
                  "value": 20
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 6,
          "w": 3,
          "x": 0,
          "y": 1
        },
        "id": 4,
        "options": {
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "showThresholdLabels": false,
          "showThresholdMarkers": true
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "$__interval"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x63.Temperature",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "Temperatur aktuell",
        "type": "gauge"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [
              {
                "options": {
                  "0": {
                    "color": "dark-red",
                    "index": 0,
                    "text": "unkalibriert"
                  },
                  "1": {
                    "color": "dark-green",
                    "index": 1,
                    "text": "kalibriert"
                  }
                },
                "type": "value"
              }
            ],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 1
        },
        "id": 11,
        "options": {
          "colorMode": "background",
          "graphMode": "none",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x63.IsCalibrated",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "RTD Kalibrierung",
        "type": "stat"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "axisSoftMax": 28,
              "axisSoftMin": -2,
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "opacity",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "smooth",
              "lineStyle": {
                "fill": "solid"
              },
              "lineWidth": 2,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "celsius"
          },
          "overrides": [
            {
              "matcher": {
                "id": "byName",
                "options": "atlas-scientific-ezo-i2c.0.0x61.Temperature_compensation.last"
              },
              "properties": [
                {
                  "id": "displayName",
                  "value": "DO temp compensation"
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "atlas-scientific-ezo-i2c.0.0x62.Temperature_compensation.last"
              },
              "properties": [
                {
                  "id": "displayName",
                  "value": "PH temp compensation"
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "atlas-scientific-ezo-i2c.0.0x63.Temperature.last"
              },
              "properties": [
                {
                  "id": "displayName",
                  "value": "Current Temperature"
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "PH temp compensation"
              },
              "properties": [
                {
                  "id": "color",
                  "value": {
                    "fixedColor": "super-light-yellow",
                    "mode": "fixed"
                  }
                }
              ]
            }
          ]
        },
        "gridPos": {
          "h": 6,
          "w": 12,
          "x": 5,
          "y": 1
        },
        "id": 1,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x63.Temperature",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "Temperaturverlauf",
        "transformations": [
          {
            "id": "convertFieldType",
            "options": {
              "conversions": [
                {
                  "destinationType": "number",
                  "targetField": "atlas-scientific-ezo-i2c.0.0x63.Temperature.last"
                }
              ],
              "fields": {}
            }
          }
        ],
        "type": "timeseries"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [
              {
                "options": {
                  "false": {
                    "color": "dark-green",
                    "index": 0,
                    "text": "aktiv"
                  },
                  "true": {
                    "color": "dark-red",
                    "index": 1,
                    "text": "pausiert"
                  }
                },
                "type": "value"
              }
            ],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 3
        },
        "id": 20,
        "options": {
          "colorMode": "background",
          "graphMode": "none",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x63\\.IsPaused\\.last$/",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "$__interval"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x63.IsPaused",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "RTD Messung",
        "type": "stat"
      },
      {
        "collapsed": false,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 7
        },
        "id": 15,
        "panels": [],
        "title": "PH",
        "type": "row"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "mappings": [],
            "max": 14,
            "min": 0,
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                },
                {
                  "color": "dark-red",
                  "value": 0
                },
                {
                  "color": "red",
                  "value": 1
                },
                {
                  "color": "orange",
                  "value": 2
                },
                {
                  "color": "yellow",
                  "value": 3
                },
                {
                  "color": "super-light-green",
                  "value": 4
                },
                {
                  "color": "light-green",
                  "value": 5
                },
                {
                  "color": "green",
                  "value": 6
                },
                {
                  "color": "dark-green",
                  "value": 7
                },
                {
                  "color": "green",
                  "value": 8
                },
                {
                  "color": "super-light-blue",
                  "value": 9
                },
                {
                  "color": "blue",
                  "value": 10
                },
                {
                  "color": "dark-blue",
                  "value": 11
                },
                {
                  "color": "super-light-purple",
                  "value": 12
                },
                {
                  "color": "purple",
                  "value": 13
                },
                {
                  "color": "dark-purple",
                  "value": 14
                }
              ]
            },
            "unit": "pH"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 6,
          "w": 3,
          "x": 0,
          "y": 8
        },
        "id": 5,
        "options": {
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "showThresholdLabels": false,
          "showThresholdMarkers": true,
          "text": {}
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "$__interval"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x62.PH_Value",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "PH Wert aktuell",
        "type": "gauge"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [
              {
                "options": {
                  "0": {
                    "color": "dark-red",
                    "index": 0,
                    "text": "unkalibriert"
                  },
                  "1": {
                    "color": "super-light-green",
                    "index": 1,
                    "text": "Einpunkt"
                  },
                  "2": {
                    "color": "green",
                    "index": 2,
                    "text": "Zweipunkt"
                  },
                  "3": {
                    "color": "dark-green",
                    "index": 3,
                    "text": "Dreipunkt"
                  }
                },
                "type": "value"
              }
            ],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 8
        },
        "id": 12,
        "options": {
          "colorMode": "background",
          "graphMode": "none",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x62.IsCalibrated",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "PH Kalibrierung",
        "type": "stat"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "axisSoftMax": 10,
              "axisSoftMin": 0,
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "smooth",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "pH"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 6,
          "w": 12,
          "x": 5,
          "y": 8
        },
        "id": 2,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": false
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x62.PH_Value",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "PH Verlauf",
        "transformations": [
          {
            "id": "convertFieldType",
            "options": {
              "conversions": [
                {
                  "destinationType": "number",
                  "targetField": "atlas-scientific-ezo-i2c.0.0x63.Temperature.last"
                }
              ],
              "fields": {}
            }
          }
        ],
        "type": "timeseries"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [
              {
                "options": {
                  "false": {
                    "color": "dark-green",
                    "index": 0,
                    "text": "aktiv"
                  },
                  "true": {
                    "color": "dark-red",
                    "index": 1,
                    "text": "pausiert"
                  }
                },
                "type": "value"
              }
            ],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 10
        },
        "id": 21,
        "options": {
          "colorMode": "background",
          "graphMode": "none",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x62\\.IsPaused\\.last$/",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "$__interval"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x62.IsPaused",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "PH Messung",
        "type": "stat"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 12
        },
        "id": 10,
        "options": {
          "colorMode": "value",
          "graphMode": "area",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x62.Temperature_compensation",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "PH Temp. Kompensation ",
        "type": "stat"
      },
      {
        "collapsed": false,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 14
        },
        "id": 14,
        "panels": [],
        "title": "Redox (ORP)",
        "type": "row"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "mappings": [],
            "max": 1019,
            "min": 0,
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "dark-red",
                  "value": 0
                },
                {
                  "color": "orange",
                  "value": 200
                },
                {
                  "color": "#EAB839",
                  "value": 400
                },
                {
                  "color": "super-light-green",
                  "value": 600
                },
                {
                  "color": "dark-green",
                  "value": 800
                },
                {
                  "color": "dark-green",
                  "value": 1019
                }
              ]
            },
            "unit": "mvolt"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 6,
          "w": 3,
          "x": 0,
          "y": 15
        },
        "id": 6,
        "options": {
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "showThresholdLabels": false,
          "showThresholdMarkers": true,
          "text": {}
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "$__interval"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x64.ORP_Value",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "Redox (ORP) aktuell",
        "type": "gauge"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [
              {
                "options": {
                  "0": {
                    "color": "dark-red",
                    "index": 0,
                    "text": "unkalibriert"
                  },
                  "1": {
                    "color": "dark-green",
                    "index": 1,
                    "text": "kalibriert"
                  }
                },
                "type": "value"
              }
            ],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 15
        },
        "id": 17,
        "options": {
          "colorMode": "background",
          "graphMode": "none",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x64.IsCalibrated",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "Redox Kalibrierung",
        "type": "stat"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "smooth",
              "lineWidth": 2,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "mvolt"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 6,
          "w": 12,
          "x": 5,
          "y": 15
        },
        "id": 3,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": false
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x64.ORP_Value",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "Redox Verlauf",
        "transformations": [
          {
            "id": "convertFieldType",
            "options": {
              "conversions": [
                {
                  "destinationType": "number",
                  "targetField": "atlas-scientific-ezo-i2c.0.0x63.Temperature.last"
                }
              ],
              "fields": {}
            }
          }
        ],
        "type": "timeseries"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [
              {
                "options": {
                  "false": {
                    "color": "dark-green",
                    "index": 0,
                    "text": "aktiv"
                  },
                  "true": {
                    "color": "dark-red",
                    "index": 1,
                    "text": "pausiert"
                  }
                },
                "type": "value"
              }
            ],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 17
        },
        "id": 22,
        "options": {
          "colorMode": "background",
          "graphMode": "none",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x64\\.IsPaused\\.last$/",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "$__interval"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x64.IsPaused",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "Redox Messung",
        "type": "stat"
      },
      {
        "collapsed": false,
        "gridPos": {
          "h": 1,
          "w": 24,
          "x": 0,
          "y": 21
        },
        "id": 13,
        "panels": [],
        "title": "Gelöster Sauerstoff (DO)",
        "type": "row"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "mappings": [],
            "max": 10,
            "min": 0,
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                },
                {
                  "color": "dark-orange",
                  "value": 3
                },
                {
                  "color": "dark-yellow",
                  "value": 6
                },
                {
                  "color": "dark-green",
                  "value": 8
                },
                {
                  "color": "dark-green",
                  "value": 10
                }
              ]
            },
            "unit": "mg/L"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 6,
          "w": 3,
          "x": 0,
          "y": 22
        },
        "id": 18,
        "options": {
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "showThresholdLabels": false,
          "showThresholdMarkers": true,
          "text": {}
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "javascript.0.DO_Sensor.DO_mg_L",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "mg/L Sauerstoff",
        "transformations": [
          {
            "id": "convertFieldType",
            "options": {
              "conversions": [],
              "fields": {}
            }
          }
        ],
        "type": "gauge"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [
              {
                "options": {
                  "0": {
                    "color": "dark-red",
                    "index": 0,
                    "text": "unkalibriert"
                  },
                  "1": {
                    "color": "super-light-green",
                    "index": 1,
                    "text": "Atmospherisch"
                  },
                  "3": {
                    "color": "dark-green",
                    "index": 2,
                    "text": "Atmospherisch & 0 DO"
                  }
                },
                "type": "value"
              }
            ],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 22
        },
        "id": 19,
        "options": {
          "colorMode": "background",
          "graphMode": "none",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x61.IsCalibrated",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "DO Kalibrierung",
        "type": "stat"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "lineInterpolation": "smooth",
              "lineWidth": 2,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "mg/L"
          },
          "overrides": [
            {
              "matcher": {
                "id": "byName",
                "options": "javascript.0.DO_Sensor.DO_Percent.last"
              },
              "properties": [
                {
                  "id": "custom.axisPlacement",
                  "value": "right"
                },
                {
                  "id": "unit",
                  "value": "percent"
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "javascript.0.DO_Sensor.DO_mg_L.last"
              },
              "properties": [
                {
                  "id": "displayName",
                  "value": "Dissolved Oxygen mg/L"
                }
              ]
            },
            {
              "matcher": {
                "id": "byName",
                "options": "javascript.0.DO_Sensor.DO_Percent.last"
              },
              "properties": [
                {
                  "id": "displayName",
                  "value": "Dissolved Oxygen %"
                }
              ]
            }
          ]
        },
        "gridPos": {
          "h": 6,
          "w": 10,
          "x": 5,
          "y": 22
        },
        "id": 7,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "timezone": [
            ""
          ],
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "javascript.0.DO_Sensor.DO_mg_L",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          },
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "hide": false,
            "measurement": "javascript.0.DO_Sensor.DO_Percent",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "B",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "Gelöster Sauerstoff ",
        "transformations": [
          {
            "id": "convertFieldType",
            "options": {
              "conversions": [
                {
                  "destinationType": "number",
                  "targetField": "atlas-scientific-ezo-i2c.0.0x61.Dissolved_Oxygen.last"
                }
              ],
              "fields": {}
            }
          }
        ],
        "type": "timeseries"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "thresholds"
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                },
                {
                  "color": "dark-orange",
                  "value": 30
                },
                {
                  "color": "dark-yellow",
                  "value": 60
                },
                {
                  "color": "dark-green",
                  "value": 80
                },
                {
                  "color": "dark-green",
                  "value": 100
                }
              ]
            },
            "unit": "percent"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 6,
          "w": 2,
          "x": 15,
          "y": 22
        },
        "id": 9,
        "options": {
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "/^javascript\\.0\\.DO_Sensor\\.DO_Percent\\.last$/",
            "values": false
          },
          "showThresholdLabels": false,
          "showThresholdMarkers": true,
          "text": {}
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "$__interval"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "javascript.0.DO_Sensor.DO_Percent",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "% Sauerstoff",
        "transformations": [
          {
            "id": "convertFieldType",
            "options": {
              "conversions": [],
              "fields": {}
            }
          }
        ],
        "type": "gauge"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [
              {
                "options": {
                  "false": {
                    "color": "dark-green",
                    "index": 0,
                    "text": "aktiv"
                  },
                  "true": {
                    "color": "dark-red",
                    "index": 1,
                    "text": "pausiert"
                  }
                },
                "type": "value"
              }
            ],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "dark-red",
                  "value": null
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 24
        },
        "id": 23,
        "options": {
          "colorMode": "background",
          "graphMode": "none",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x61\\.IsPaused\\.last$/",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "$__interval"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x61.IsPaused",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "DO Messung",
        "type": "stat"
      },
      {
        "datasource": {
          "type": "influxdb",
          "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
        },
        "fieldConfig": {
          "defaults": {
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            },
            "unit": "short"
          },
          "overrides": []
        },
        "gridPos": {
          "h": 2,
          "w": 2,
          "x": 3,
          "y": 26
        },
        "id": 24,
        "options": {
          "colorMode": "value",
          "graphMode": "area",
          "justifyMode": "auto",
          "orientation": "auto",
          "reduceOptions": {
            "calcs": [
              "lastNotNull"
            ],
            "fields": "/^atlas\\-scientific\\-ezo\\-i2c\\.0\\.0x61\\.Temperature_compensation\\.last$/",
            "values": false
          },
          "textMode": "auto"
        },
        "pluginVersion": "10.0.2",
        "targets": [
          {
            "datasource": {
              "type": "influxdb",
              "uid": "c9af6e75-ad53-408b-9093-079ced28a598"
            },
            "groupBy": [
              {
                "params": [
                  "1m"
                ],
                "type": "time"
              },
              {
                "params": [
                  "null"
                ],
                "type": "fill"
              }
            ],
            "measurement": "atlas-scientific-ezo-i2c.0.0x61.Temperature_compensation",
            "orderByTime": "ASC",
            "policy": "autogen",
            "refId": "A",
            "resultFormat": "time_series",
            "select": [
              [
                {
                  "params": [
                    "value"
                  ],
                  "type": "field"
                },
                {
                  "params": [],
                  "type": "last"
                }
              ]
            ],
            "tags": []
          }
        ],
        "title": "DO Temp. Kompensation ",
        "type": "stat"
      }
    ],
    "refresh": "5s",
    "schemaVersion": 38,
    "style": "dark",
    "tags": [],
    "templating": {
      "list": []
    },
    "time": {
      "from": "now-15m",
      "to": "now"
    },
    "timepicker": {},
    "timezone": "",
    "title": "NAF Stein Bruthaus-Wassermonitor",
    "uid": "d6d13e1c-3d76-4996-8b30-42db5d61a555",
    "version": 11,
    "weekStart": ""
  }
  ```
</details>

## Run Scripts per Javascript-Adapter Instance

In some cases it is helpful to make the use of javascript code execution. I have added some examples to the repository including description.

![Image](pictures/jsadapter.png)

### Example 1: Get Substrings from DO Sensor Value related to active Params mg/l & %
This script is created for use in the "Script execution" JavaScript adapter. The data points must of course be adapted to the local setup
The script splits the value string supplied by the DO sensor, which can contain mg/L as well as % depending on the activated parameters, into two values and stores them in two 
data points.

![Image](pictures/do_Substrings.png)

<details>
  <summary>Example 1 Script </summary>
  
  ```javascript
   console.log('Start');

   const DO_mg_L = 'javascript.' + instance + '.DO_Sensor.DO_mg_L';
   createState(DO_mg_L, 0, {"type": "string", read: true, write: false, role: "value.do", unit: "mg/L"});
   const DO_Percent = 'javascript.' + instance + '.DO_Sensor.DO_Percent';
   createState(DO_Percent, 0, {"type": "string", read: true, write: false, role: "value.do", unit: "%"});


   function buildSubstrings(str, start, end) {
   const arr = str.split(',');
   console.log('Array:' + arr.toString());
   return arr; 
   }

   on({id: 'atlas-scientific-ezo-i2c.0.0x61.Dissolved_Oxygen', change: "any"}, function (obj) { 
   
   console.log('Value changed: ' + obj.state.val);
   const doString = obj.state.val;
   const result = buildSubstrings(doString, 0, 1);
   console.log(result.toString());
   
   // Only mg/L
   if(result.length === 1){
      console.log('Setting state DO_mg_L: ' + result[0].toString());
      setState(DO_mg_L, result[0], true);
   }
   // mg/l & %
   else if (result.length === 2) {
      console.log('Setting state DO_mg_L: ' + result[0].toString());
      setState(DO_mg_L, result[0], true);
      console.log('Setting state DO_Percent: ' + result[1].toString());
      setState(DO_Percent, result[1], true);
   }
   });
```
</details>

### Example 2: Set the Temperature compensation for several Sensors
This script is created for use in the "Script execution" JavaScript adapter. The data points must of course be adapted to the local setup
It checks the temperature values supplied by the RTD sensor, truncates the decimal places to 1. 
If a change from the old to the new value occurred, the temp_compensation states of the desired (target) sensors are set with time offset

![Image](pictures/tempcompensation.png)

<details>
  <summary>Example 2 Script </summary>
  
  ```javascript
   console.log('Start temp compensation Script');

   const ph_temp_compensation = 'atlas-scientific-ezo-i2c.0.0x62.Temperature_compensation';
   const do_temp_compensation = 'atlas-scientific-ezo-i2c.0.0x61.Temperature_compensation';

   on({id: 'atlas-scientific-ezo-i2c.0.0x63.Temperature', change: "any"}, function (obj) { 

   const newTemptring = obj.state.val;
   const oldTempString = obj.oldState.val;
   const newTempCut = parseFloat(newTemptring).toFixed(1);
   const oldTempCut = parseFloat(oldTempString).toFixed(1);

   console.log('Temp value received: Old:' + oldTempCut + ' New:' + newTempCut );

   if(!(newTempCut === oldTempCut))
   {
      console.log('Temp changed from ' + oldTempCut + ' to' + newTempCut );
      console.log('Setting state ph_temp_compensation: ' + newTempCut);
      setStateDelayed(ph_temp_compensation, newTempCut, 5000);
      console.log('Setting state do_temp_compensation: ' + newTempCut);
      setStateDelayed(do_temp_compensation, newTempCut, 8000);
   }
   });
```
</details>



### DISCLAIMER

Please make sure that you consider copyrights and trademarks when you use names or logos of a company and add a disclaimer to your README.
You can check other adapters for examples or ask in the developer community. Using a name or logo of a company without permission may cause legal problems for you.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0 (2023-08-14)
- NPM Package updates

### 2.2.3 (2023-08-12)
- Added support for EZO PRS Sensor
- Added help for PRS in readme.md

### 2.2.2 (2023-08-06)
- Bugfixings: Fixed wrong order of delay initialization and delay values for some drivers
- Added backend hardware driver for embedded EZO PRS (not functional right now)

### 2.2.1 (2023-08-04)
- Added support for EC Electrical conductivity sensors
- Extended Help with new implementation

### 2.2.0 (2023-08-02)
- Several Bugfixes in Pump implementation
- adjusted readme.md

### 2.1.0 (2023-08-01)
- Added example Grafana Dashboard code and documentation
- Added example Scripts and documentation for helpful Javascript Adapter

### 2.0.0 (2023-07-31)
- Feature request: add the "active" Switch to objects #10 Part I -> Added State including state change listeners "IsPaused" to pause measure per sensor during runtime
- Feature request: add the "calibration" switches to objects #10 Part II -> Added calibration state objects
- Adjusted Readme with Help for new Features
- Added state translations for alphanumeric and boolean states to clear text

### 1.2.4 (2023-07-06)
- Finished first Pump implementation (UI and Pump control) untested due to missing device
- extended README.md
- Further translations

### 1.2.3 (2023-07-03)
- implemented delay after each polling cycle to decouple memory race conditions on device for I2C
- First steps in base implementation for peristaltic pump
- added translations for new values

### 1.2.2 (2023-06-19)
- Removed forbidden characters from sensor state objects
- added state roles where possible 
- added state units where senseful
- adjusted Readme according changes

### 1.2.1 (2023-06-16)
- Extended Help with Statechangelisteners

### 1.2.0 (2023-06-16)
- Code cleanup
- Exchanged standard setTimeOut / clearTimeout calls with adapter wrapper methods
- Removed "later" function in index.ts and used Delay Class instead

### 1.1.0 (2023-06-08)

- Removed Developer Info
- Extended Test Matrix to [16.x, 18.x, 20.x]
- Patched Translations
- Removed Whitespaces for all States from Sensors and exchanged with underscores

### 1.0.0 (2023-06-06)
- further bugfixes
- patched release yml file
- added  releaseconfig.json

### 0.0.3 (2023-05-09)
bugfixes

### 0.0.2 (2023-05-09)
-   (Buzze11) initial release

### 0.0.1 (2023-05-09)

### DISCLAIMER

Please make sure that you consider copyrights and trademarks when you use names or logos of a company and add a disclaimer to your README.
You can check other adapters for examples or ask in the developer community. Using a name or logo of a company without permission may cause legal problems for you.

## License

                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

    "License" shall mean the terms and conditions for use, reproduction,
    and distribution as defined by Sections 1 through 9 of this document.

    "Licensor" shall mean the copyright owner or entity authorized by
    the copyright owner that is granting the License.

    "Legal Entity" shall mean the union of the acting entity and all
    other entities that control, are controlled by, or are under common
    control with that entity. For the purposes of this definition,
    "control" means (i) the power, direct or indirect, to cause the
    direction or management of such entity, whether by contract or
    otherwise, or (ii) ownership of fifty percent (50%) or more of the
    outstanding shares, or (iii) beneficial ownership of such entity.

    "You" (or "Your") shall mean an individual or Legal Entity
    exercising permissions granted by this License.

    "Source" form shall mean the preferred form for making modifications,
    including but not limited to software source code, documentation
    source, and configuration files.

    "Object" form shall mean any form resulting from mechanical
    transformation or translation of a Source form, including but
    not limited to compiled object code, generated documentation,
    and conversions to other media types.

    "Work" shall mean the work of authorship, whether in Source or
    Object form, made available under the License, as indicated by a
    copyright notice that is included in or attached to the work
    (an example is provided in the Appendix below).

    "Derivative Works" shall mean any work, whether in Source or Object
    form, that is based on (or derived from) the Work and for which the
    editorial revisions, annotations, elaborations, or other modifications
    represent, as a whole, an original work of authorship. For the purposes
    of this License, Derivative Works shall not include works that remain
    separable from, or merely link (or bind by name) to the interfaces of,
    the Work and Derivative Works thereof.

    "Contribution" shall mean any work of authorship, including
    the original version of the Work and any modifications or additions
    to that Work or Derivative Works thereof, that is intentionally
    submitted to Licensor for inclusion in the Work by the copyright owner
    or by an individual or Legal Entity authorized to submit on behalf of
    the copyright owner. For the purposes of this definition, "submitted"
    means any form of electronic, verbal, or written communication sent
    to the Licensor or its representatives, including but not limited to
    communication on electronic mailing lists, source code control systems,
    and issue tracking systems that are managed by, or on behalf of, the
    Licensor for the purpose of discussing and improving the Work, but
    excluding communication that is conspicuously marked or otherwise
    designated in writing by the copyright owner as "Not a Contribution."

    "Contributor" shall mean Licensor and any individual or Legal Entity
    on behalf of whom a Contribution has been received by Licensor and
    subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of
   this License, each Contributor hereby grants to You a perpetual,
   worldwide, non-exclusive, no-charge, royalty-free, irrevocable
   copyright license to reproduce, prepare Derivative Works of,
   publicly display, publicly perform, sublicense, and distribute the
   Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of
   this License, each Contributor hereby grants to You a perpetual,
   worldwide, non-exclusive, no-charge, royalty-free, irrevocable
   (except as stated in this section) patent license to make, have made,
   use, offer to sell, sell, import, and otherwise transfer the Work,
   where such license applies only to those patent claims licensable
   by such Contributor that are necessarily infringed by their
   Contribution(s) alone or by combination of their Contribution(s)
   with the Work to which such Contribution(s) was submitted. If You
   institute patent litigation against any entity (including a
   cross-claim or counterclaim in a lawsuit) alleging that the Work
   or a Contribution incorporated within the Work constitutes direct
   or contributory patent infringement, then any patent licenses
   granted to You under this License for that Work shall terminate
   as of the date such litigation is filed.

4. Redistribution. You may reproduce and distribute copies of the
   Work or Derivative Works thereof in any medium, with or without
   modifications, and in Source or Object form, provided that You
   meet the following conditions:

    (a) You must give any other recipients of the Work or
    Derivative Works a copy of this License; and

    (b) You must cause any modified files to carry prominent notices
    stating that You changed the files; and

    (c) You must retain, in the Source form of any Derivative Works
    that You distribute, all copyright, patent, trademark, and
    attribution notices from the Source form of the Work,
    excluding those notices that do not pertain to any part of
    the Derivative Works; and

    (d) If the Work includes a "NOTICE" text file as part of its
    distribution, then any Derivative Works that You distribute must
    include a readable copy of the attribution notices contained
    within such NOTICE file, excluding those notices that do not
    pertain to any part of the Derivative Works, in at least one
    of the following places: within a NOTICE text file distributed
    as part of the Derivative Works; within the Source form or
    documentation, if provided along with the Derivative Works; or,
    within a display generated by the Derivative Works, if and
    wherever such third-party notices normally appear. The contents
    of the NOTICE file are for informational purposes only and
    do not modify the License. You may add Your own attribution
    notices within Derivative Works that You distribute, alongside
    or as an addendum to the NOTICE text from the Work, provided
    that such additional attribution notices cannot be construed
    as modifying the License.

    You may add Your own copyright statement to Your modifications and
    may provide additional or different license terms and conditions
    for use, reproduction, or distribution of Your modifications, or
    for any such Derivative Works as a whole, provided Your use,
    reproduction, and distribution of the Work otherwise complies with
    the conditions stated in this License.

5. Submission of Contributions. Unless You explicitly state otherwise,
   any Contribution intentionally submitted for inclusion in the Work
   by You to the Licensor shall be under the terms and conditions of
   this License, without any additional terms or conditions.
   Notwithstanding the above, nothing herein shall supersede or modify
   the terms of any separate license agreement you may have executed
   with Licensor regarding such Contributions.

6. Trademarks. This License does not grant permission to use the trade
   names, trademarks, service marks, or product names of the Licensor,
   except as required for reasonable and customary use in describing the
   origin of the Work and reproducing the content of the NOTICE file.

7. Disclaimer of Warranty. Unless required by applicable law or
   agreed to in writing, Licensor provides the Work (and each
   Contributor provides its Contributions) on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
   implied, including, without limitation, any warranties or conditions
   of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
   PARTICULAR PURPOSE. You are solely responsible for determining the
   appropriateness of using or redistributing the Work and assume any
   risks associated with Your exercise of permissions under this License.

8. Limitation of Liability. In no event and under no legal theory,
   whether in tort (including negligence), contract, or otherwise,
   unless required by applicable law (such as deliberate and grossly
   negligent acts) or agreed to in writing, shall any Contributor be
   liable to You for damages, including any direct, indirect, special,
   incidental, or consequential damages of any character arising as a
   result of this License or out of the use or inability to use the
   Work (including but not limited to damages for loss of goodwill,
   work stoppage, computer failure or malfunction, or any and all
   other commercial damages or losses), even if such Contributor
   has been advised of the possibility of such damages.

9. Accepting Warranty or Additional Liability. While redistributing
   the Work or Derivative Works thereof, You may choose to offer,
   and charge a fee for, acceptance of support, warranty, indemnity,
   or other liability obligations and/or rights consistent with this
   License. However, in accepting such obligations, You may act only
   on Your own behalf and on Your sole responsibility, not on behalf
   of any other Contributor, and only if You agree to indemnify,
   defend, and hold each Contributor harmless for any liability
   incurred by, or claims asserted against, such Contributor by reason
   of your accepting any such warranty or additional liability.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

Copyright 2023 Buzze11

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## Third Party Licenses

Some small parts of this project are based on ioBroker.i2c fro UncleSamSwiss https://github.com/UncleSamSwiss/ioBroker.i2c

Copyright 2021 UncleSamSwiss

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

See the License for the specific language governing permissions and limitations under the License.
