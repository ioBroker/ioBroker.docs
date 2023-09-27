---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.worx.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.worx.svg
BADGE-Number of Installations: https://iobroker.live/badges/worx-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/worx-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.worx.png?downloads=true
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.worx/README.md
title: ioBroker.worx 适配器
hash: qh79wqJ6UtWyIF11OwDiyEIyfntDCdq4lI/mbxcFpRE=
---
![标识](../../../en/admin/worx.png)

# IoBroker.worx 适配器
＃＃ 描述
### 实例设置
- `App Email`：您的应用程序用户名（电子邮件）
- `应用程序密码`：您的应用程序密码
- `应用程序名称`：选择您的设备
- `Delay for EdgeCut`：EdgeCut 何时开始（例如 5 秒到草坪）

![实例设置 img/instance_1.png](../../../en/adapterref/iobroker.worx/img/instance_1.png)

- `以分钟和米为单位的距离和时间`：默认 h 和 km
- `每 10 分钟 Ping 一次 MQTT 连接。`：只是为了测试。请不要超过1小时！
- `更新令牌后更新 MQTT 数据。`：刷新令牌后加载 Worx 数据。每天/设备 24 个额外查询。

![实例设置 img/instance_2.png](../../../en/adapterref/iobroker.worx/img/instance_2.png)

＃＃＃ 文件夹
- `activityLog`：您的活动日志（可以控制）
- `area`：区域（可以控制）
- `日历`：时间表（可以控制）
- `Modules`：您的模块（可以控制）
- `割草机`：你的割草机（可以控制）
- `产品`：您设备的所有属性（只读）
- `rawMqtt`：来自云端的所有数据（只读）

![文件夹 img/all_folders.png](../../../en/adapterref/iobroker.worx/img/all_folders.png)

### 活动日志（Wire 和 Vision）
- `last_update`：上次更新时间戳
- `manuell_update`：加载当前活动日志（状态更改后自动）
- `payload`：作为 JSON 表的活动日志（对于 VIS 或 Blockly）

![活动 img/activity.png](../../../en/adapterref/iobroker.worx/img/activity.png)

### 区域（无愿景）
- `实际区域`：当前
- `actualAreaIndicator`：下一个数组区域开始
- `area_0`：区域 1 的起点（以米为单位）（数组 = 0）（可更改）
- `area_1`：区域 2 的起点（以米为单位）（数组 = 1）（可更改）
- `area_2`：区域 3 的起点（以米为单位）（数组 = 2）（可更改）
- `area_3`：区域 4 的起点（以米为单位）（数组 = 3）（可更改）
- `startSequence`：数组区域开始（0-9 事件），例如仅从区域 3 开始 [2,2,2,2,2,2,2,2,2,2]（可更改）
- `zoneKeeper`：在狭窄区域交叉口安全驾驶（必须创建区域）（自固件 3.30 起）（可更改）

![区域 img/areas.png](../../../en/adapterref/iobroker.worx/img/areas.png)

### 日历（Wire 和 Vision）
- 例如星期三的时间设置

    - `wednesday.borderCut`：有或没有边界剪切（立即更改值）（可更改）
    - `wednesday.startTime`: 开始时间 hh:mm (0-23/0-59) 例如09:00（立即更改值）（可更改）
    - `wednesday.workTime`：工作时间以分钟为单位（180 分钟 = 3 小时），例如30 = Endzeit 09:30（立即更改值）（可更改）
    - `calJson_sendto`：如果所有数据点均已设置，则按按钮发送（有 1.1 秒延迟）。割草机现在将割草 30 分钟（可更改）
    - `calJson_tosend`：此数据发送到 Mqtt（割草时间表/自动设置）。您也可以自己创建此 JSON。 （多变）
    - `calendar.calJson`：每周割草计划的数组。您也可以自己创建此数组。 （割草时间表 1/自动设置 - 仅适用于钢丝）（可更改）
    - `calendar.calJson2`：每周割草计划的数组。您也可以自己创建此数组。 （割草时间表 2/自动设置 - 仅适用于钢丝）（可更改）

![文件夹 img/calendar.png](../../../en/adapterref/iobroker.worx/img/calendar.png)

### 模块（有线和视觉）
- 限制模块（有线和视觉）

    - `DF.OLMSwitch_Cutting`：防止磁带被碾过 - 真开/假关
    - `DF.OLMSwitch_FastHoming`：快速返回充电站 - true-on/false-off

- ACS 模块（仅限有线）
    - `US.ACS`：启用或禁用 ACS - 1-开/0-关

![模块 img/module.png](../../../en/adapterref/iobroker.worx/img/module.png)

### 割草机（电线和视觉）
- `AutoLock`：自动锁定真开/假关（电线和视觉/可更改）
- `AutoLockTimer`：定时器自动锁定最大值。 10 分钟，30 秒步长（线材和视觉/可更换）
- `batteryChargeCycle`：电池充电周期（电线和视觉/只读）
- `batteryCharging`: 电池充电 false->no/true->yes (wire & Vision/readonly)
- `batteryState`：电池状态百分比（电线和视觉/只读）
- `batteryTemperature`：电池温度（摄氏度）（电线和视觉/只读）
- `batteryVoltage`：电池电压（伏特）（电线和视觉/只读）
- `direction`：梯度方向（电线和视觉/只读）
- `edgecut`：启动 EdgeCut（电线和视觉/可更改）
- `error`：来自割草机的错误消息（电线和视觉/只读）

```json
{
    "states": {
        "0": "No error", //(wire & Vision)
        "1": "Trapped", //(wire & Vision unknown)
        "2": "Lifted", //(wire & Vision)
        "3": "Wire missing", //(wire & Vision unknown)
        "4": "Outside wire", //(wire & Vision unknown)
        "5": "Raining", //(wire & Vision)
        "6": "Close door to mow", //(wire & Vision)
        "7": "Close door to go home", //(wire & Vision)
        "8": "Blade motor blocked", //(wire & Vision)
        "9": "Wheel motor blocked", //(wire & Vision)
        "10": "Trapped timeout", //(wire & Vision)
        "11": "Upside down", //(wire & Vision)
        "12": "Battery low", //(wire & Vision)
        "13": "Reverse wire", //(wire & Vision unknown)
        "14": "Charge error", //(wire & Vision)
        "15": "Timeout finding home", //(wire & Vision)
        "16": "Mower locked", //(wire & Vision)
        "17": "Battery over temperature", //(wire & Vision)
        "18": "dummy model", //(wire & Vision)
        "19": "Battery trunk open timeout", //(wire & Vision)
        "20": "wire sync", //(wire & Vision unknown)
        "21": "msg num", //(wire & Vision)
        "110": "Camera error" //(Vision)
    }
}
```

![割草机 img/mower_1.png](../../../en/adapterref/iobroker.worx/img/mower_1.png)

- `固件`：当前安装的固件（Wire & Vision/只读）
- `firmware_available`：可用固件（Wire & Vision/只读）
- `firmware_available_all`：最后可用的 JSON 固件 - 当有新的更新可用时，此 JSON 将更新（wire & Vision/只读）

```json
{
    "mandatory": false,
    "product": {
        "uuid": "1236ll8d-0000-0000-9999-07ff6690003f",
        "version": "3.30.0+1",
        "released_at": "2023-05-24",
        "changelog": "•\tSupport for new models \tWR166E and WR184E\n•\tImproved Grass cutting coverage\n•\tImproved ACS\n•\tAdded Zone Keeper function (need to be enabled by app)\n•\tImproved wheel torque algorithm\n• \tNew FML firmware\n•\tFixed \"FML\" and \"Radiolink\" Activation problem\n•\tFixed some translations error\n•\tRain delay can now be cleared pressing START / HOME button, (1 minute after countdown has started)\n•\tImproved PRO Battery management\n• \tImproved boundary wire recognition\n• \tFixed border cut when zones are active\n• \tNew wifi firmware for board HW REV > 7\n\nThe Worx Landroid team would like to thank our amazing beta testers, with hundreds of hours of their own free time to make this firmware possible."
    }
}
```

- `firmware_available_date`：可用固件日期 - 重新安装适配器且没有可用更新时的虚拟 1970-01-01（wire & Vision/只读）
- `firmware_update_start`：分两步开始固件更新（wire & Vision/changeable）
- `firmware_update_start_approved`：开始固件更新 - `firmware_update_start` 必须设置为 true（wire & Vision/changeable）
- `gradient`：grad 中的梯度（wire & Vision/只读）
- `inclination`：梯度倾斜（电线和视觉/只读）
- `last_command`：来自 iobroker 或 APP 的最后一个请求，作为 JSON 表（wire & Vision/只读）
- `mowTimeExtend`：割草时间延长百分比范围：-100%->100%（有线/可更改）
- `mowerActive`：暂停割草计划（有线/可更改）
- `mqtt_update`：更新 Mqtt 数据最大值。 150/天（有线和视觉/可变）
- `mqtt_update_count`：计数器更新 Mqtt 数据（wire & Vision/只读）

![割草机 img/mower_2.png](../../../en/adapterref/iobroker.worx/img/mower_2.png)

- `oneTimeJson`：一次性割草为 JSON（wire & Vision/可更改）

```json
{
    "wtm": 60, //Minutes
    "bc": 0 //0=w/o bordercut 1=with bordercut or use the next datapoints
}
```

- `oneTimeStart`：一次性割草开始“首先填充 oneTimeWithBorder 和 oneTimeWorkTime” - 延迟 1.1 秒（电线和视觉/可更改）
- `oneTimeWithBorder`：带边框 - 立即更改值（电线和视觉/可更改）
- `oneTimeWorkTime`：最长工作时间。 8 小时，30 分钟步长 - 立即更改值（电线和视觉/可更改）
- `在线`：在线割草机（电线和视觉/只读）
- `partyModus`：Partymodus 打开/关闭（电线和视觉/可更改）
- `暂停`：割草机中断打开/关闭（电线和视觉/可更改）
- `reset_battery_time`：分两步重置电池电量（电线和视觉/可更改）
- `reset_battery_time_approved`：确认重置电池电量 - `reset_battery_time` 必须设置为 true（电线和视觉/可修改）
- `reset_blade_time`：分两步重置刀片工作时间（线材和视觉/可更改）
- `reset_blade_time_approved`：确认重置刀片工作时间 - `reset_battery_time` 必须设置为 true（线材和视觉/可更改）

![割草机 img/mower_3.png](../../../en/adapterref/iobroker.worx/img/mower_3.png)

- `sendCommand`：发送 cmd 命令（wire & Vision/可更改）

```json
{
    "states": {
        "1": "Start", //(wire & Vision)
        "2": "Stop", //(wire & Vision)
        "3": "Home", //(wire & Vision)
        "4": "Start Zone Taining", //(wire & Vision unknown)
        "5": "Lock", //(wire & Vision unknown)
        "6": "Unlock", //(wire & Vision)
        "7": "Restart Robot", //(wire & Vision)
        "8": "pause when follow wire", //(wire & Vision unknown)
        "9": "safe homing" //(wire & Vision unknown)
    }
}
```

- `state`：对于启动割草机为 True，对于停止割草机为 False（电线和视觉/可更改）
- `status`：割草机状态（电线和视觉/只读）

```json
{
    "states": {
        "0": "IDLE", //(wire & Vision)
        "1": "Home", //(wire & Vision)
        "2": "Start sequence", //(wire & Vision)
        "3": "Leaving home", //(wire & Vision)
        "4": "Follow wire", //(wire & Vision unknown)
        "5": "Searching home", //(wire & Vision)
        "6": "Searching wire", //(wire & Vision unknown)
        "7": "Mowing", //(wire & Vision)
        "8": "Lifted", //(wire & Vision)
        "9": "Trapped", //(wire & Vision)
        "10": "Blade blocked", //(wire & Vision)
        "11": "Debug", //(wire & Vision)
        "12": "Remote control", //(wire & Vision)
        "13": "escape from off limits", //(wire & Vision)
        "30": "Going home", //(wire & Vision)
        "31": "Zone training", //(wire & Vision)
        "32": "Border Cut", //(wire & Vision)
        "33": "Searching zone", //(wire & Vision)
        "34": "Pause" //(wire & Vision)
    }
}
```

- `torque`：车轮扭矩范围 -50->50（线材和视觉/可更改）
- `totalBladeTime`：刀片总时间（线材和视觉/只读）
- `totalDistance`：总距离（电线和视觉/只读）
- `totalTime`：总工作时间（线路和视觉/只读）
- `waitRain`：最大下雨延迟。 12 小时，30 分钟步长（线材和视觉/可更换）
- `wifiQuality`：Wifi 质量（有线和视觉/只读）

![割草机 img/mower_4.png](../../../en/adapterref/iobroker.worx/img/mower_4.png)

### 另外对于视力
-   区域
    - `rfid`：总区域（只读）
    - `startSequence`：多区域 JSON（视觉/可变）[示例](#example-blockly-startsequence-vison)

例子：

```json
{
    "mz": {
        "p": [
            // Passages between zones
            {
                "z1": 1, // Zone from (must z1 < z2)
                "z2": 2, // Zone to (must z2 > z1)
                "t1": "E000000000000000", // RFID id from z1
                "t2": "E0000000KKKKKKKK" // RFID id from z2
            }
        ],
        "s": [
            // The zones themselves
            {
                "id": 1, // Numbering - Start with 1
                "c": 1, // 1 if the charging station is in this zone. 0 for no charging station.
                "cfg": {
                    "cut": {
                        "bd": 100, // bordercut in mm
                        "ob": 0 // 1 for driving over slabs if they are detected, otherwise 0.
                    }
                }
            },
            {
                "id": 2, // Numbering
                "c": 0, // 1 if the charging station is in this zone. 0 for no charging station.
                "cfg": {
                    "cut": {
                        "bd": 100, // bordercut in mm
                        "ob": 0 // 1 for driving over slabs if they are detected, otherwise 0.
                    }
                }
            }
        ]
    }
}
```

默认无区域：

```json
{
    "mz": {
        "p": [],
        "s": [
            {
                "id": 1,
                "c": 1,
                "cfg": {
                    "cut": {
                        "bd": 150,
                        "ob": 0
                    }
                }
            }
        ]
    }
}
```

![愿景 img/areas_vision.png](../../../en/adapterref/iobroker.worx/img/areas_vision.png)

- 割草机
    - `log_improvement`：发送改进日志到 worx 禁用/启用（可更改）
    - `log_troubleshooting`：发送故障排除日志到 worx 禁用/启用（可更改）

![视觉 img/logs_vision.png](../../../en/adapterref/iobroker.worx/img/logs_vision.png)

- 割草机
    - `paused`：暂停的时间表（以分钟为单位）（可更改）

![视觉 img/paused_vision.png](../../../en/adapterref/iobroker.worx/img/paused_vision.png)

### Info_mqtt（有线和视觉）
- `incompleteOperationCount`：提交给连接但尚未完成的操作总数。未确认的操作是其中的一个子集。
- `incompleteOperationSize`：提交给连接但尚未完成的操作的总数据包大小。未确认的操作是其中的一个子集。
- `unackedOperationCount`：已发送到服务器并正在等待相应 ACK 才能完成的操作总数。
- `unackedOperationSize`：已发送到服务器并在完成之前等待相应 ACK 的操作的总数据包大小。
- `last_update`：令牌的最后更新
- `next_update`：令牌的下一次更新
- `online`：MQTT 连接状态（false=离线/true=在线）

![视觉 img/mqtt_info.png](../../../en/adapterref/iobroker.worx/img/mqtt_info.png)

### Blockly 启动序列 Vison 示例
```
<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="${]4s$w?n24Az}=7iAIY">mz</variable>
    <variable id="o.FQ]_Xa!tHn2T7Ak{Pt">value</variable>
    <variable id="/@E4iFRMr:x+u?{7yFlB">test</variable>
    <variable id="jxTInS{}mk_)WJa[:,fA">i</variable>
  </variables>
  <block type="procedures_defcustomnoreturn" id="u:w*aBH!92nydG0Mu.1-" x="-87" y="-87">
    <mutation statements="false">
      <arg name="mz" varid="${]4s$w?n24Az}=7iAIY"></arg>
      <arg name="value" varid="o.FQ]_Xa!tHn2T7Ak{Pt"></arg>
    </mutation>
    <field name="NAME">set_bd</field>
    <field name="SCRIPT">bXouY2ZnLmN1dC5iZCA9IDE1MA==</field>
    <comment pinned="false" h="80" w="160">Beschreibe diese Funktion …</comment>
  </block>
  <block type="variables_set" id="jiP0218}2,Y]B]RdKD~`" x="-87" y="-35">
    <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
    <value name="VALUE">
      <block type="convert_json2object" id=";Ef{FHk_~heeozyHFxci">
        <value name="VALUE">
          <block type="get_value" id="LMfldD:[D4%}yWE8,N0y">
            <field name="ATTR">val</field>
            <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.areas.startSequence</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="controls_forEach" id="D{XG==q$flbH?32eX%D(">
        <field name="VAR" id="jxTInS{}mk_)WJa[:,fA">i</field>
        <value name="LIST">
          <block type="get_attr" id="b~2/cb$WhEj*9i6,(ey5">
            <value name="PATH">
              <shadow type="text" id="+n~;GfHf{,#D!5D}H+m=">
                <field name="TEXT">s</field>
              </shadow>
            </value>
            <value name="OBJECT">
              <block type="variables_get" id="YloS$N%I=6[yk;loD*1O">
                <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO">
          <block type="procedures_callcustomnoreturn" id="er{Pwq:Y7n_I|CQoup,|">
            <mutation name="set_bd">
              <arg name="mz"></arg>
              <arg name="value"></arg>
            </mutation>
            <value name="ARG0">
              <block type="variables_get" id="(-_i0(y:W}U_x?s(7k%4">
                <field name="VAR" id="jxTInS{}mk_)WJa[:,fA">i</field>
              </block>
            </value>
            <value name="ARG1">
              <block type="math_number" id="{2u/=v!k|yJsOesq[CU^">
                <field name="NUM">150</field>
              </block>
            </value>
            <next>
              <block type="debug" id="b1}}DmS-[_W:+Y+$|%)r">
                <field name="Severity">log</field>
                <value name="TEXT">
                  <shadow type="text" id="7wx?ca_U[S~8DA4}*RXx">
                    <field name="TEXT">test</field>
                  </shadow>
                  <block type="variables_get" id="_zz;w64g-!E$zX$]pvyI">
                    <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="debug" id="o[S0+1%{oLU+r:03tz7=">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="7wx?ca_U[S~8DA4}*RXx">
                <field name="TEXT">test</field>
              </shadow>
              <block type="variables_get" id="tjqxQ(MO|CR~/Xq5;Pm[">
                <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
              </block>
            </value>
            <next>
              <block type="control" id="C^lZ^SNIQ#,vh}?hSG_O">
                <mutation xmlns="http://www.w3.org/1999/xhtml" delay_input="false"></mutation>
                <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.areas.startSequence</field>
                <field name="WITH_DELAY">FALSE</field>
                <value name="VALUE">
                  <block type="convert_object2json" id="z)EXA+%8lB4K#7!Hp1V%">
                    <field name="PRETTIFY">FALSE</field>
                    <value name="VALUE">
                      <block type="variables_get" id="C4np)gS@^Y*?-0I+R6+r">
                        <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>

<xml xmlns="https://developers.google.com/blockly/xml">
  <variables>
    <variable id="${]4s$w?n24Az}=7iAIY">mz</variable>
    <variable id="o.FQ]_Xa!tHn2T7Ak{Pt">value</variable>
    <variable id="/@E4iFRMr:x+u?{7yFlB">test</variable>
    <variable id="jxTInS{}mk_)WJa[:,fA">i</variable>
  </variables>
  <block type="procedures_defcustomnoreturn" id="u:w*aBH!92nydG0Mu.1-" x="-87" y="-87">
    <mutation statements="false">
      <arg name="mz" varid="${]4s$w?n24Az}=7iAIY"></arg>
      <arg name="value" varid="o.FQ]_Xa!tHn2T7Ak{Pt"></arg>
    </mutation>
    <field name="NAME">set_bd</field>
    <field name="SCRIPT">bXouY2ZnLmN1dC5iZCA9IDE1MA==</field>
    <comment pinned="false" h="80" w="160">Beschreibe diese Funktion …</comment>
  </block>
  <block type="variables_set" id="jiP0218}2,Y]B]RdKD~`" x="-87" y="-35">
    <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
    <value name="VALUE">
      <block type="convert_json2object" id=";Ef{FHk_~heeozyHFxci">
        <value name="VALUE">
          <block type="get_value" id="LMfldD:[D4%}yWE8,N0y">
            <field name="ATTR">val</field>
            <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.areas.startSequence</field>
          </block>
        </value>
      </block>
    </value>
    <next>
      <block type="controls_forEach" id="D{XG==q$flbH?32eX%D(">
        <field name="VAR" id="jxTInS{}mk_)WJa[:,fA">i</field>
        <value name="LIST">
          <block type="get_attr" id="b~2/cb$WhEj*9i6,(ey5">
            <value name="PATH">
              <shadow type="text" id="+n~;GfHf{,#D!5D}H+m=">
                <field name="TEXT">s</field>
              </shadow>
            </value>
            <value name="OBJECT">
              <block type="variables_get" id="YloS$N%I=6[yk;loD*1O">
                <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
              </block>
            </value>
          </block>
        </value>
        <statement name="DO">
          <block type="procedures_callcustomnoreturn" id="er{Pwq:Y7n_I|CQoup,|">
            <mutation name="set_bd">
              <arg name="mz"></arg>
              <arg name="value"></arg>
            </mutation>
            <value name="ARG0">
              <block type="variables_get" id="(-_i0(y:W}U_x?s(7k%4">
                <field name="VAR" id="jxTInS{}mk_)WJa[:,fA">i</field>
              </block>
            </value>
            <value name="ARG1">
              <block type="math_number" id="{2u/=v!k|yJsOesq[CU^">
                <field name="NUM">150</field>
              </block>
            </value>
            <next>
              <block type="debug" id="b1}}DmS-[_W:+Y+$|%)r">
                <field name="Severity">log</field>
                <value name="TEXT">
                  <shadow type="text" id="7wx?ca_U[S~8DA4}*RXx">
                    <field name="TEXT">test</field>
                  </shadow>
                  <block type="variables_get" id="_zz;w64g-!E$zX$]pvyI">
                    <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </statement>
        <next>
          <block type="debug" id="o[S0+1%{oLU+r:03tz7=">
            <field name="Severity">log</field>
            <value name="TEXT">
              <shadow type="text" id="7wx?ca_U[S~8DA4}*RXx">
                <field name="TEXT">test</field>
              </shadow>
              <block type="variables_get" id="tjqxQ(MO|CR~/Xq5;Pm[">
                <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
              </block>
            </value>
            <next>
              <block type="control" id="C^lZ^SNIQ#,vh}?hSG_O">
                <mutation xmlns="http://www.w3.org/1999/xhtml" delay_input="false"></mutation>
                <field name="OID">worx.0.xxxxxxxxxxxxxxxxxxxx.areas.startSequence</field>
                <field name="WITH_DELAY">FALSE</field>
                <value name="VALUE">
                  <block type="convert_object2json" id="z)EXA+%8lB4K#7!Hp1V%">
                    <field name="PRETTIFY">FALSE</field>
                    <value name="VALUE">
                      <block type="variables_get" id="C4np)gS@^Y*?-0I+R6+r">
                        <field name="VAR" id="/@E4iFRMr:x+u?{7yFlB">test</field>
                      </block>
                    </value>
                  </block>
                </value>
              </block>
            </next>
          </block>
        </next>
      </block>
    </next>
  </block>
</xml>
```

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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