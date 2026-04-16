---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tapo/README.md
title: ioBroker.tapo
hash: zJ00Y8JOfjWdGGUkWKlwttkEu9B+n3zEk8j3EoF43aY=
---
![标识](../../../en/adapterref/iobroker.tapo/admin/tapo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.tapo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tapo.svg)
![安装数量](https://iobroker.live/badges/tapo-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/tapo-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tapo.png?downloads=true)

# IoBroker.tapo
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.tapo/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tapo 适配器
TP-Link Tapo适配器

基于 https://github.com/apatsufas/homebridge-tapo-p100

## 登录
Die Tapo Mail 和 Passwort eingeben。 Es werden die Geräte via Cloud abgerufen, aber lokal gesteuert。
Wenn die IP nicht gefunden wird muss sie manuell unter tapo.0.id.ip gesetzt werden。

## Status-Werte (eingehend)
Alle Geraete werden regelmaessig gepollt。 Die Werte werden automatisch under `tapo.0.id.*`angelegt。

### 所有设备
地址：`tapo.0.80A5897B21C7.nickname`、`tapo.0.80A5897B21C7.device_on`

| 价值 | 类型 | 描述 |
| --- | --- | --- |
| 昵称 | 字符串 | Geraetename |
| device_id | 字符串 | 设备 ID |
|型号|字符串|模型设计 |
| fw_ver | 字符串 | 固件版本 |
| hw_ver | 字符串 | 硬件版本 |
|麦克 |字符串| MAC 地址 |
|设备开启 |布尔 |盖拉特/澳大利亚 |
|准时 |数量 |塞昆登 (Sekunden) 的 Einschaltdauer |
| rssi | 号码 | WLAN信号强度 |
| 信号强度 | 编号 | 信号强度（1-3） |
| ssid | 字符串 | WLAN 名称 |
| ip | 字符串 | IP地址 |
|过热|布尔 | Ueberhitzungsstatus | 状态 |

### Lampen (zusaetzlich)
地址：`tapo.0.80A5897B21C7.brightness`、`tapo.0.80A5897B21C7.hue`

| 价值 | 类型 | 描述 |
| --- | --- | --- |
|亮度|数量 |地狱 (0-100) |
|颜色温度 |数量 |开尔文法布温度|
|色调|数量 | Farbton（0-360，nur L530/L630）|
|饱和度|数量 | Saettigung（0-100，nur L530/L630）|

### P110/P115 Energiedaten (zusaetzlich)
地址：`tapo.0.80A5897B21C7.current_power`、`tapo.0.80A5897B21C7.voltage_mv`

| 价值 | 类型 | 描述 |
| --- | --- | --- |
|当前功率|数量 |现在 (mW) |
|今日能源 |数量 |能量消耗 (Wh) |
|月能源 |数量 | Energieverbrauch Monat (Wh) | 能量消耗 |
| voltage_mv | number | Spannung (mV) |
| current_ma | number | Strom (mA) |
|功率_MW |数量 |莱斯顿 (mW) |
|电流（消耗）|数量 |现在 (W, berechnet) |
|总计（消耗）|数量 | Energie heute（kWh，berechnet）|

### Hub-Sensoren（子设备）
示例：`tapo.0.80A5897B21C7.child_SENSOR_ID.current_temp`

|传感器|韦尔特 |说明 |
| --- | --- | --- |
| T100（Bewegung）|检测到 |警告 |
| T110（联系）|打开|图尔/芬斯特·奥芬 |
| T300（漏水） | water_leak_status，报警中 | 漏水状态 |
| T310/T315（温度/Feuchte）|当前温度、当前湿度、温度单位 |温度和通风 |
| KE100（恒温器）| 目标温度、当前温度、防冻开启、温度控制状态 | 恒温器状态 |

所有传感器均位于 `battery_percentage`、`at_low_battery` 和 `signal_level` 中。

### 相机状态
地址：`tapo.0.80A5897B21C7.alarm`、`tapo.0.80A5897B21C7.personDetection`

| 价值 | 类型 | 描述 |
| --- | --- | --- |
|报警|布尔 |警报激活 |
|眼睛|布尔 | Privacy-Modus (invertiert: true = Kamera sieht) |
|通知 |布尔 | Push-Benachrichtigungen 活动 |
|运动检测 |布尔 |激活|
| led | 布尔值 | LED激活 |
| autoTrack | 布尔值 | 自动跟踪已激活 |
|人物检测 |布尔 |人员活动 |
|车辆检测|布尔 |激活状态 |
|宠物检测 |布尔 |激活 |
|婴儿哭声检测 |布尔 | Baby-Schrei-Erkennung 活动 |
|树皮检测 |布尔 |积极行动|
|喵检测|布尔 |活动注意事项 |
|玻璃破碎检测 |布尔 | Glasbruch-Erkennung 活动 |
|篡改检测 |布尔 |操作-Erkennung aktiv |
|图像翻转 |布尔 |垂直图片 |
|最不发达国家|布尔 |林森韦尔泽伦斯克雷克图活动 |
|录音 |布尔 |音频-Aufnahme aktiv |
|自动升级|布尔 |固件自动更新激活 |

Nicht jedes Geraet liefert alle Werte。 Felder die das Geraet nicht unterstuetzt werden nichtangelegt。

### 相机-Erkennungsereignisse
地址：`tapo.0.80A5897B21C7.detection.active`、`tapo.0.80A5897B21C7.detection.events.0.alarm_type`

Die Kamera wird lokal gepollt und liefert Erkennungs-Events（Bwegung、Personen 等）。 Die letzten 10 Events werden abgerufen (`searchDetectionList`), neuestes Event zuerst.

| 价值 | 类型 | 描述 |
| --- | --- | --- |
|检测.活跃 |布尔 |在 30 Sekunden 中真正的温恩 Erkennung |
|检测.eventCount |数量 | 10 分钟内的 Anzahl Ereignisse |
| detection.events.0.start_time | number | Unix-Timestamp Start des neuesten Events |
| detection.events.0.end_time | number | Unix-Timestamp Ende des neuesten Events |
|检测.事件.0.alarm_type |数量 | Erkennungstyp（siehe Tabelle unten）|
|检测.事件.1.start_time |数量 | Zweitneuestes 事件 (usw.bis 9) |
|运动事件 |布尔 | ONVIF 技术咨询 | ONVIF 技术咨询 |

#### Alarm_type Werte
| ID | 描述 |
| --- | --- |
| 2 | Bewegung（运动） |
| 3 | 篡改 |
| 4 | Linienueberquerung（穿越线）|
| 5 | 区域入侵 |
| 6 | 人（人类） |
| 7 | Baby-Schrei（婴儿哭声）|
| 8 | Fahrzeug（车辆） |
| 9 | 等级（宠物） |
| 11 | 贝伦（树皮） |
| 12 | 喵 |
| 13 | 玻璃破碎 |
| 14 | 烟雾 |
| 15 | 15 Paket abgelegt（包裹递送）|
| 16 | 16 Paket abgeholt（包裹领取）|
| 20 | 20 Gesichtserkennung（人脸检测）|
| 32 | 32 Herumlungern（闲逛）|

不使用 Typen 的相机。 Die verfuegbaren Werte haengen von Modell 和 Firmware ab。

### 报警配置
地址：`tapo.0.80A5897B21C7.alarmInfo.enabled`、`tapo.0.80A5897B21C7.alarmInfo.alarm_volume`

| 价值 | 类型 | 描述 |
| --- | --- | --- |
| alarmInfo.enabled | string | Alarm aktiv (on/off) |
| alarmInfo.alarm_mode | mixed | 报警模式（例如：声音、灯光） |
| AlarmInfo.alarm_volume | AlarmInfo.alarm_volume |字符串 |劳特斯塔克 |
| AlarmInfo.alarm_duration | AlarmInfo.alarm_duration |字符串| Dauer 在 Sekunden |
| AlarmInfo.alarm_type |字符串| Sirenen 型 |
| alarmInfo.light_type | string | Licht-Typ |
| alarmInfo.light_alarm_enabled | string | 灯光报警器已启用（开/关） |
| alarmInfo.sound_alarm_enabled | string | 声音警报已启用（开/关） |

### Alarm-Event-Typen（welche Erkennungen loesen Alarm aus）
地址：`tapo.0.80A5897B21C7.alertEventTypes.motion`、`tapo.0.80A5897B21C7.alertEventTypes.person`

| 价值 | 类型 | 描述 |
| --- | --- | --- |
|警报事件类型.motion |布尔 |警报器 |
| alertEventTypes.person | 布尔值 | 针对人员的警报 |
|警报事件类型.vehicle |布尔 | Fahrzeug | 警报 |
| alertEventTypes.pet | 布尔值 | 层级警报 |

### Benachrichtigungen einrichten
Fuer Benachrichtigungen bei Erkennung ein ioBroker-Skript auf `detection.events.0.start_time` 触发：

```javascript
const alarmTypen = { 2:'Bewegung', 3:'Manipulation', 4:'Linienueberquerung', 5:'Bereichsintrusion',
  6:'Person', 7:'Baby-Schrei', 8:'Fahrzeug', 9:'Tier', 11:'Bellen', 12:'Miauen',
  13:'Glasbruch', 14:'Rauch', 15:'Paket abgelegt', 16:'Paket abgeholt', 20:'Gesicht', 32:'Herumlungern' };

on({ id: 'tapo.0.DEVICE_ID.detection.events.0.start_time', change: 'ne' }, (obj) => {
  const typ = getState('tapo.0.DEVICE_ID.detection.events.0.alarm_type').val;
  sendTo('telegram.0', {
    text: (alarmTypen[typ] || 'Typ ' + typ) + ' um ' + new Date(obj.state.val * 1000).toLocaleString()
  });
});
```

Blockly-Beispiel（又名 XML importierbar）：

```xml
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="on_ext" x="38" y="13">
    <mutation xmlns="http://www.w3.org/1999/xhtml" items="1"></mutation>
    <field name="CONDITION">ne</field>
    <field name="ACK_CONDITION"></field>
    <value name="OID0">
      <shadow type="field_oid">
        <field name="oid">tapo.0.DEVICE_ID.detection.events.0.start_time</field>
      </shadow>
    </value>
    <statement name="STATEMENT">
      <block type="telegram">
        <field name="INSTANCE">.0</field>
        <field name="LOG"></field>
        <value name="MESSAGE">
          <block type="text_join">
            <mutation items="3"></mutation>
            <value name="ADD0">
              <block type="text">
                <field name="TEXT">Tapo Erkennung: Typ </field>
              </block>
            </value>
            <value name="ADD1">
              <block type="get_value">
                <field name="ATTR">val</field>
                <field name="OID">tapo.0.DEVICE_ID.detection.events.0.alarm_type</field>
              </block>
            </value>
            <value name="ADD2">
              <block type="text">
                <field name="TEXT"> erkannt</field>
              </block>
            </value>
          </block>
        </value>
      </block>
    </statement>
  </block>
</xml>
```

Das Polling-Intervall 位于 Adaptereinstellungen konfigurierbar 中（标准：10 Sekunden）。 Alles lokal, kein Cloud-Zugriff noetig。

## 施托伊恩
tapo.0.id.remote auf true/false setzen steuert den jeweiligen Befehl。 Der Befehl wird lokal and das Gerät gesendet。

### 插头/开关（P100、P110、P115 等）
|远程|类型 |说明 |
| --- | --- | --- |
| 刷新 | 布尔值 | 手动状态刷新 |
|设置电源状态 |布尔 |艾因/澳大利亚 |
|设置PowerStateChild |字符串|儿童设备 Steuern：`childId,true` 或 `childId,false` |
|设置 LED 启用 |布尔 | LED 指示灯 ein/aus |
|设置自动关闭 |布尔 |自动关闭定时器 ein/aus |
|设置自动关闭延迟 |数量 | Minuten 的自动关闭 Verzoegerung |
|设置儿童保护 |布尔 | Tastensperre（按钮锁）ein/aus |
|设置电源保护 |布尔 | Ueberlastschutz ein/aus |
|设置电源保护阈值 |数量 |瓦特的 Ueberlast-Schwellwert |
|设置自动更新 |布尔 |固件自动更新 ein/aus |

P110/P115 liefern zusaetzlich Energiedaten（Leistung、Spannung、Strom）。

### 灯（L510E、L520E、L530、L630、L900、L920，...）
Alle Plug-Remotes plus：

|远程|类型 |说明 |
| --- | --- | --- |
|设置亮度 |数量 |一切皆有可能 |
|设置颜色温度 |数量 |法布温度 (2500-6500K) |
|设置颜色 |字符串 |法贝设置：`hue, saturation` |
|设置光效 |字符串| Lichteffekt ID 或“关闭” |
|设置渐进式关闭 |布尔 |桑夫特斯艾因/Ausschalten |

### 粉丝 (F1xx)
|远程|类型 |说明 |
| --- | --- | --- |
|设置风扇速度级别 |数量 | Geschwindigkeit 0-4 (0 = 澳元) |
|设置风扇睡眠模式 |布尔 |斯拉夫莫杜斯 ein/aus |

### 中心（H100、H200）
|远程|类型 |说明 |
| --- | --- | --- |
|玩闹钟 |布尔 |警报abspielen |
|停止警报 |布尔 |警报停止 |
|设置闹钟音量 |字符串 |警报 Lautstaerke：静音/低/正常/高 |
|设置闹钟持续时间 |数量 |塞昆登 (Sekunden) 的警报 Dauer |

### 温控器/温控阀 (KE100)
|远程|类型 |说明 |
| --- | --- | --- |
|设置目标温度 |数量 |温度设定 |
|设置温度偏移 |数量 |温度偏移 (-10 bis 10) |
|设置霜冻保护 |布尔 | Frostschutz ein/aus |

### 集线器传感器（T100、T110、T300、T310、T315）
传感器数据（温度、Luftfeuchtigkeit、Bewegung、Kontakt、Wasserleck）通过 `getChildDeviceList` abgerufen 和 als Status angezeigt 自动执行。

### 相机（C200、C310、C520、TC70、...）
|远程|类型 |说明 |
| --- | --- | --- |
| 刷新 | 布尔值 | 手动状态刷新 |
|设置警报配置 |布尔 |警报 ein/aus |
| 设置镜头遮罩配置 | 布尔值 | 隐私（眼睛）ein/aus |
| setForceWhitelampState | 设置强制白灯状态布尔 | Weisslicht ein/aus |
|设置 LED 状态 |布尔 | LED ein/aus |
|设置消息推送配置 |布尔 |澳大利亚 | Benachrichtigungen |
|设置检测配置 |布尔 | Bewegungserkennung ein/aus |
|设置自动跟踪目标 |布尔 |自动追踪 ein/aus |
|设置人员检测 |布尔 |个人信息/澳大利亚 |
|设置车辆检测 |布尔 | Fahrzeugerkennung ein/aus |
|设置宠物检测 |布尔 | Tiererkennung ein/aus |
|设置BabyCryDetection |布尔 | Baby-Schrei-Erkennung ein/aus | 婴儿玩具 |
|设置树皮检测 |布尔 |贝伦-Erkennung ein/aus |
|设置喵检测 |布尔 | Miauen-Erkennung ein/aus |
| setGlassBreakDetection | 设置玻璃破裂检测布尔 |格拉斯布鲁赫-Erkennung ein/aus |
|设置篡改检测 |布尔 |操作-Erkennung ein/aus |
| setImageFlipVertical | 设置图像翻转垂直布尔 |垂直图片 |
|设置镜头畸变校正 |布尔 |澳大利亚/Linsenverzerrungskorrektur |
|设置录音音频 |布尔 |音频 aufnehmen ein/aus |
|设置自动升级 |布尔 |固件自动更新 ein/aus |
|设置HDR |布尔 | HDR ein/aus | HDR |
| setCoverConfig | 布尔值 | 隐私区域 ein/aus |
|设置记录计划 |布尔 | SD-Karten Aufnahme ein/aus | SD-Karten Aufnahme ein/aus |
|移动电机 |字符串|相机位于：`x, y` (-360..360, -45..45) |
|移动电机步进|字符串 |施里特温克尔 (0-360) |
|移动到预设 |字符串| Zu Preset 华氏 (ID) |
|校准电机 |布尔 |电机校准 |
|保存预设 |字符串 |预设 speichern（名称）|
| 删除预设 | 字符串 | 预设删除（ID） |
| 设置巡航 | 字符串 | 巡逻：x/y/关闭 |
|启动手动闹钟 |布尔 | Manuellen 警报启动 |
|停止手动报警|布尔 | Manuellen 警报停止|
| 设置闹钟模式 | 字符串 | 闹钟模式：both/light/sound/off |
|设置日夜模式 |字符串|标签/夜间模式：自动/开/关 |
|设置LightFrequencyMode |字符串 |光频率：自动/50/60 |
|设置扬声器音量 |数量 |劳茨普雷彻-劳茨斯塔克 (0-100) |
|设置麦克风音量 |数量 |米克罗芬-劳茨塔尔克 (0-100) |
| 设置运动检测灵敏度 | 字符串 | Bewegungs-Sensitivitaet: high/normal/low |
|设置PersonDetectionSensitivity |字符串|个人敏感度：高/正常/低 |
|设置Osd |字符串 | OSD 说明文本 |
|重启 |布尔 |新斯塔滕相机 |
|格式化 SD 卡 |布尔 | SD-Karte 格式|

相机无法正常工作。请勿将日志中的任何 Fehlermeldung 写入日志中。

## Kamerasteuerung aktivieren
![替代文字](./img/tpcamera01.jpeg "TP Labor") ![替代文字](../../../en/adapterref/iobroker.tapo/img/tpcamera02.jpeg "TP 劳工")

## 讨论和问题
<https://forum.iobroker.net/topic/57336/test-adapter-tp-link-tapo/>

## Changelog
### 0.5.0 (2026-04-02)

- Support for TPAP/SPAKE2+ protocol (P100 FW 1.4.3+ and newer devices)
- Support for KLAP v1 (md5) handshake
- Fix camera connection for firmware 1.9.1+ (C310 etc.)
- 30+ new camera remotes (detection, motor, alarm, cruise, presets, image/audio, OSD)
- New data points for camera status and detection events
- New remotes for plugs, lamps, fans, hubs and thermostats
- Device-specific remotes (only relevant controls per device type)
- Energy data (voltage, current) for P110/P115
- Automatic reconnect for devices that go offline and come back
- Less log spam for unreachable devices

### 0.4.8 (2025-02-04)

- disable sentry to prevent crashes

### 0.4.7 (2025-01-14)

- disable battery devices
- improved wrong formatted mail adresses

### 0.4.6 (2025-01-10)

- add checks for battery devices

### 0.4.5 (2024-12-16)

- fix camera remotes

### 0.4.4 (2024-12-12)

- improve handshake if e-mail is not entered in lowercase

### 0.4.3 (2024-12-09)

- fix handshake for device with HW v1.20

### 0.4.1 (2024-11-29)

- fixed Get Device Info failed error

### 0.3.4 (2024-11-10)

- update Tapo local lib

### 0.3.3 (2024-06-17)

- ignore ssl legacy error
-

### 0.3.2 (2024-05-27)

update onvif lib to fix issues with newer cameras

### 0.2.9 (2024-01-30)

- fix tapo Plugs and setLensMask

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2030 TA2k <tombox2020@gmail.com>

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