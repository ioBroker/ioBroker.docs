---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.atlas-scientific-ezo-i2c/README.md
title: ioBroker.atlas-科学-ezo-i2c
hash: v9RAK7QEG5BrWsrUSr+aIbnA5Z3BCv9GgjX7ZtuS+MM=
---
![标识](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/admin/atlas-scientific-ezo-i2c.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.atlas-scientific-ezo-i2c.svg)
![下载](https://img.shields.io/npm/dm/iobroker.atlas-scientific-ezo-i2c.svg)
![安装数量](https://iobroker.live/badges/atlas-scientific-ezo-i2c-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/atlas-scientific-ezo-i2c-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.atlas-scientific-ezo-i2c.png?downloads=true)

# IoBroker.atlas-scientific-ezo-i2c
**测试：** ![测试与发布](https://github.com/Buzze11/ioBroker.atlas-scientific-ezo/workflows/Test%20and%20Release/badge.svg)

### 如果您喜欢这个适配器，请读到最后并帮助我贡献我的努力
我很高兴我能帮助每个人将这些伟大的 Atlas Scientific 传感器集成到他们自己的家中，我希望您能想象这样一个适配器开发需要多少时间和精力。也就是说，我非常感谢您帮助我通过 Paypal 捐款..

[![通过 PayPal 捐赠](https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png)](https://www.paypal.com/donate/?hosted_button_id=7PGJFJX8X3Y82)

## 适用于 ioBroker 的 Atlas Scientific EZO I2C 适配器
此 ioBroker 适配器将多个 Atlas Scientific EZO 设备 https://atlas-scientific.com/ 集成到您自己的 ioBroker 环境中。 EZO 设备必须针对 I2C 总线进行配置，并且必须安装在配置并启用 I2C 总线的设备（例如 RaspberryPi..）上。

### 当前支持的设备
* EZO DO - 溶解氧 -> https://atlas-scientific.com/dissolved-oxygen
* EZO ORP - 氧化还原电位 -> https://atlas-scientific.com/orp
* EZO pH - 氢的潜力 -> https://atlas-scientific.com/ph
* EZO RTD - 电阻温度检测器 -> https://atlas-scientific.com/Temperature
* EZO PMP - 嵌入式蠕动计量泵 -> https://atlas-scientific.com/peristaltic/ezo-pmp/（由于缺少硬件而未经测试）
* EZO EC - 电导率 -> https://atlas-scientific.com/conductivity

### 未来的支持
* 如果您考虑进一步实施，请创建一个功能请求问题

＃＃ 入门
＃＃＃ 安装
特别要确保您已在系统上正确配置并启用了 I2C（如果需要）：

- [在树莓派上配置I2C](https://github.com/fivdi/i2c-bus/blob/master/doc/raspberry-pi-i2c.md)

### 设置适配器
在 RaspberryPi 上安装适配器并进行预配置后，您将在实例部分找到新的适配器，您可以在其中进一步配置传感器。

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/adapter_instance.png)

单击扳手图标，将出现一个新的设置窗口，该窗口已通过“常规”设置选项卡预先选择。

在这里，您必须将 I2C 编号插入已在 Raspberry Pi 上配置的文本字段（0 或 1）。之后您可以按“设备搜索”按钮来搜索所有连接的 EZO 电路。检测到的设备地址将列在左侧。

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/device_search.png)

单击检测到的设备之一，将出现“未配置”设备屏幕。

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/unconfigured_device.png)

单击下拉菜单选择所需设备的类型。

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/device_selector.png)

选择设备类型后，将出现所需设备的设置屏幕。对您要使用的每个设备重复这些步骤。

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/configured_device.png)

## 常规配置（所有设备）
* **地址：** 不可调整（IP 地址更改除外）
* **设备类型：** 所需的设备类型下拉列表
* **名称：** 稍后存储在设备上的设备名称（空格将被删除。如果超过 16 个字符，则仅发送前 16 个字符。）
* **轮询间隔：** 设备值轮询的时间间隔（以毫秒为单位）。如果 > 0，设备将读取此间隔内的所有值。如果您会收到错误的读数，请增加间隔时间。我建议至少从 15000ms 开始
* **主动开关：** 开关以启用或禁用该传感器的使用
* **LED 主动开关：** 通过此设置，您可以启用或禁用 EZO 设备上的 LED

### 通用功能（所有设备）
* **“查找 EZO 板”按钮** -> 单击此按钮，EZO 板上的 LED 开始快速闪烁。
* **“恢复出厂设置”按钮** -> 对该设备执行恢复出厂设置
* **“更改 I2C 地址”按钮** -> 您可以在此处为该适配器编程新的 I2C 地址。请确保之后保存配置。

### 常见状态/对象（所有设备）
某些状态具有正在运行的状态更改检测机制，这使得某些值不仅可以由管理 UI 设置，而且还可以从外部直接更改状态值。 （例如，通过脚本或手动）这可能很有用，例如，如果您想使用温度等传感器的补偿值来调整 PH 传感器上的温度补偿值。

* **“IsPaused”** -> 切换到暂时暂停设备的所有测量读数，除非它在运行时为“Actice”。 true = 已暂停，false = 测量处于活动状态。适配器启动/重新启动时，值默认为 false（测量活动）。

## DO 相关功能和设置
### DO 管理 UI 元素
![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/do_config.png)

* **“清除校准”按钮** -> 删除校准数据
* **“校准大气”按钮** -> 校准大气氧气水平
* **“校准 0DO”-按钮** -> 将设备校准至 0 溶解氧
* **“设置温度补偿”按钮** -> 在文本字段内设置温度补偿所需的值，例如20.4
* **“设置压力补偿”-按钮** -> 在文本字段内使用所需的 kPA 值设置压力补偿，例如101.3
* **“设置盐度补偿”按钮** -> 在文本字段内设置盐度补偿所需的值，例如50000 我们
* **"isPpt"-开关** -> 切换以定义盐度值是否在 ppt 中而不是在我们中读取/设置

### DO 状态包含状态变化检测
对于 DO 传感器，以下状态正在侦听变化：

* **“Temperature_compensation”** -> 设置温度补偿
* **“Salinity_compensation”** -> 设置盐度补偿
* **“Pressure_compensation”** -> 设置压力补偿
* **“Calibrate_Clear”** -> 设置为 true 以清除传感器校准。将设置为假校准被清除。
* **“Calibrate_Atmospheric”** -> 设置为 true 以运行大气传感器校准。校准运行后将设置为 false。
* **“Calibrate_Zero_DO”** -> 设置为 true 以运行零溶解氧传感器校准。校准运行后将设置为 false。

## PH 相关功能和设置
### PH 管理 UI 元素
![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/ph_config.png)

* **“清除校准”按钮** -> 删除校准数据
* **“校准低”按钮** -> 执行低值校准（通常为 4.0 ）
* **“校准中值”按钮** -> 执行中值校准（通常为 7.0 ）
* **“校准高”按钮** -> 执行高值校准（通常为 10.0 ）
* **“设置温度补偿”按钮** -> 在文本字段内设置温度补偿所需的值，例如20.4

### PH 状态，包括状态变化检测
对于 pH 传感器，以下状态正在监听变化：

* **“Temperature_compensation”** -> 设置温度补偿
* **“Calibrate_Clear”** -> 设置为 true 以清除传感器校准。清除校准后将自动设置为 false。
* **“Calibrate_Low”** -> 设置点分隔值，例如4.0 以所需值运行低校准。校准后自动清零
* **“Calibrate_Mid”** -> 设置点分隔值，例如7.0 以所需值运行低校准。校准后自动清零
* **“Calibrate_High”** -> 设置一个点分隔值，例如10.0 以所需值运行低校准。校准后自动清零

## ORP 相关功能和设置
### ORP 管理 UI 元素
![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/orp_config.png)

* **“清除校准”按钮** -> 删除校准数据
* **“校准”按钮** -> 校准到所需值

### ORP 状态包含状态变化检测
对于 ORP 传感器，以下状态正在侦听变化：

* **"Temperature_compensation"**"-> 设置温度补偿
* **“Calibrate_Clear”** -> 设置为 true 以清除传感器校准。清除校准后将自动设置为 false。
* **“校准”** -> 设置点分隔值，例如xx.x mV 以所需值运行校准。校准后自动清零

## EC 相关功能和设置
### EC 管理 UI 元素
![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/ec_config.png)

* **“清除校准”按钮** -> 删除校准数据
* **“校准干”按钮** -> 运行干传感器校准
* **“校准低点”按钮** -> 将设备低点校准到所需值
* **“校准高点”按钮** -> 将设备高点校准到所需值
* **“校准单点”按钮** -> 将设备单点校准到所需值

* **“设置温度补偿”按钮** -> 在文本字段内设置温度补偿所需的值，例如20.4
* **“设置 TDS 转换”-按钮** -> 将 TDS (ppt) 转换系数设置为文本字段中 0.001 到 1.00 之间的所需值
* **“设置探头类型”-按钮** -> 将使用的探头类型设置为文本字段中所需的类型（K0.1、K1.0 或 K10）
* **"EC(us)"-开关** -> 开关以启用或禁用读取字符串内的“电导率 = μS/cm”
* **“TDS(ppm)”-开关** -> 开关以启用或禁用读取字符串内的“总溶解固体 = ppm”
* **"S(ppt)"-开关** -> 开关以启用或禁用读取字符串内的“Salinity = PSU (ppt) 0.00 – 42.00”
* **“SG”-开关** -> 开关以启用或禁用读取字符串内的“比重（仅限海水）= 1.00 – 1.300”

### EC 状态包含状态变化检测
对于 EC 传感器，以下状态正在侦听变化：

* **“Temperature_compensation”** -> 设置温度补偿
* **“Calibrate_Clear”** -> 设置为 true 以清除传感器校准。将设置为假校准被清除。
* **“Calibrate_Singlepoint”** -> 设置为 true 以运行单点传感器校准。校准运行后将设置为 false。
* **“Calibrate_Dry”** -> 设置为 true 以运行干传感器校准。校准运行后将设置为 false。
* **“Calibrate_Low”** -> 设置为 true 以使用所需值运行低传感器校准。校准后自动清零
* **“Calibrate_High”** -> 设置为 true 以使用所需值运行高传感器校准。校准后自动清零

## RTD 相关功能和设置
### RTD 管理 UI 元素
![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/rtd_config.png)

* **“清除校准”按钮** -> 删除校准数据
* **“校准”按钮** -> 校准到所需值

### RTD 状态，包括状态变化检测
对于 RTD 传感器，以下状态正在侦听变化：

* **“Calibrate_Clear”** -> 设置为 true 以清除传感器校准。清除校准后将自动设置为 false。
* **“校准”** -> 设置点分隔值，例如xx.x mV 以所需值运行校准。校准后自动清零

## 泵相关功能和设置
### Pump 管理 UI 元素
![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/pump_config.png)

* **“清除校准”按钮** -> 删除校准数据
* **“校准”按钮** -> 校准到所需的音量

### 泵控制部分
* **“反向”-开关** -> 如果在配置中设置，则所有发送到泵的命令都将在设置反向标志的情况下执行，以便泵方向反转
* **“清除分配量”-按钮** -> 总分配量计数器将设置为 0
* **“连续分配”按钮** -> 泵将以 ~105ml/min 的速度连续运行（使用提供的管道）
* **“停止分配”按钮** -> 泵将立即停止分配
* **“暂停泵”-按钮** -> 泵将立即暂停分配
* **“随时间设置剂量”-按钮** -> 泵将在给定的持续时间内（以分钟为单位）分配给定量的毫升
* **“分配体积”-按钮** -> 泵将分配给定量的毫升
* **“设置恒定流量”-按钮** -> 泵将在给定的持续时间内（以分钟为单位）分配每分钟给定的毫升量“ml/min”

### 泵状态，包括状态变化检测
对于 EZO 泵，以下状态正在监听变化：

* **“Continous_dispense”** -> 如果设置为 true，泵将以 105ml/min 的速度跳入连续分配模式（考虑反向开关）。如果设置为 false，泵将停止分配。
* **“Dose_over_time”** -> 格式：逗号分隔值 ml，持续时间（分钟） -> 在给定分钟内分配给定体积。 ml 表示体积和持续时间（以分钟为单位）。负值将使泵反向运行。命令执行后状态会自动清除。
* **“Dispense_volume”** -> 分配给定的体积（ml）。负值将使泵反向运行。命令执行后状态会自动清除。
* **“Constant_flow_rate”** -> 格式：逗号分隔值 ml 每分钟，持续时间 -> 在给定的持续时间内（以分钟为单位）持续分配给定的体积/分钟。 ml 代表体积/分钟和持续时间（以分钟为单位）。负值将使泵反向运行。命令执行后状态会自动清除。
* **“Pause_Pump”** -> 如果设置为 true，泵将暂停。在下一个分配操作时取消暂停。

## PRS 相关功能和设置
### PRS 管理 UI 元素
![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/prs_config.png)

* **“清除校准”按钮** -> 删除校准数据
* **“校准零点”-按钮** -> 校准设备零点
* **“校准高点”按钮** -> 将设备高点校准到所需值

* **“psi”-开关** -> 开关以启用或禁用读取字符串内的“输出将以 psi 为单位”
* **“atm”-开关** -> 开关以启用或禁用读取字符串内的“输出将在 atm 中”
* **“bar”-开关** -> 开关以启用或禁用读取字符串内的“输出将在 bar 中”
* **“kPa”-开关** -> 开关以启用或禁用读取字符串内的“输出将以 kPa 为单位”
* **“inh2o”-开关** -> 开关以启用或禁用读取字符串内的“输出将以英寸水柱为单位”
* **“cmh2o”-开关** -> 开关以启用或禁用读取字符串内的“输出将以厘米水柱为单位”

### PRS 状态包含状态变化检测
对于 PRS 传感器，以下状态正在侦听变化：

* **“Calibrate_Clear”** -> 设置为 true 以清除传感器校准。将设置为假校准被清除。
* **“Calibrate_Zeropoint”** -> 设置为 true 以运行零点传感器校准。校准运行后将设置为 false。
* **“Calibrate_High”** -> 设置为 true 以使用所需值运行高传感器校准。校准后自动清零
* **“Alarm_enabled”** -> 设置为 true 以启用传感器的警报引脚，设置为 false 以禁用
* **“Alarm_Threshold”** -> 设置所需的警报阈值。更改后值将写入传感器
* **“Alarm_Tolerance”** -> 设置所需的警报阈值。更改后值将写入传感器

## 使用 Grafana Dashboard 的可视化示例
在这里您可以看到一个小示例，说明可视化适配器值是多么容易。对于此示例，InfluxDB 实例正在收集并存储从适配器传递的值。

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/dashboard_example.png)

<details><summary>示例代码 Grafana-Dashboard JSON</summary>

  ### 从 Grafana 导出 JSON
```json

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

</详情>

## 每个 Javascript-Adapter 实例运行脚本
在某些情况下，使用 javascript 代码执行会很有帮助。我已经在存储库中添加了一些示例，包括描述。

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/jsadapter.png)

### 示例 1：从与活动参数 mg/l 和 % 相关的 DO 传感器值中获取子字符串
创建此脚本是为了在“脚本执行”JavaScript 适配器中使用。当然，数据点必须适应本地设置脚本将 DO 传感器提供的值字符串（根据激活的参数可以包含 mg/L 以及 %）拆分为两个值并将它们存储在两个数据点中。

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/do_Substrings.png)

<details><summary>示例 1 脚本</summary>

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
`

</详情>

### 示例 2：设置多个传感器的温度补偿
创建此脚本是为了在“脚本执行”JavaScript 适配器中使用。当然，数据点必须适应本地设置。它检查 RTD 传感器提供的温度值，将小数位截断为 1。
如果发生从旧值到新值的更改，则所需（目标）传感器的 temp_compensation 状态将设置时间偏移

![图像](../../../en/adapterref/iobroker.atlas-scientific-ezo-i2c/pictures/tempcompensation.png)

<details><summary>示例 2 脚本</summary>

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
`

</详情>

### 免责声明
当您使用公司名称或徽标时，请确保考虑版权和商标，并在自述文件中添加免责声明。
您可以查看其他适配器的示例或在开发者社区中询问。未经许可使用公司名称或徽标可能会给您带来法律问题。

## 第三方许可证
该项目的一些小部分基于 UncleSamSwiss 的 ioBroker.i2c https://github.com/UncleSamSwiss/ioBroker.i2c

版权所有 2021 瑞士叔叔

根据 Apache 许可证 2.0 版（“许可证”）获得许可；除非遵守许可证，否则您不得使用此文件。您可以在以下位置获取许可证副本：

http://www.apache.org/licenses/LICENSE-2.0

除非适用法律要求或书面同意，否则根据许可证分发的软件均按“原样”分发，不带任何明示或暗示的保证或条件。

请参阅许可证，了解许可证下管理权限和限制的特定语言。

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