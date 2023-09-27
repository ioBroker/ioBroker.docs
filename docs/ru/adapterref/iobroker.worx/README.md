---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.worx.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.worx.svg
BADGE-Number of Installations: https://iobroker.live/badges/worx-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/worx-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.worx.png?downloads=true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.worx/README.md
title: Адаптер ioBroker.worx
hash: qh79wqJ6UtWyIF11OwDiyEIyfntDCdq4lI/mbxcFpRE=
---
![Логотип](../../../en/admin/worx.png)

# Адаптер ioBroker.worx
## Описание
### Настройки экземпляра
- «Электронная почта приложения»: ваше имя пользователя приложения (электронная почта).
- `Пароль приложения`: ваш пароль приложения.
- «Имя приложения»: выберите свое устройство.
- «Задержка для EdgeCut»: когда должен запускаться EdgeCut (например, 5 секунд до газона)

![Настройки экземпляра img/instance_1.png](../../../en/adapterref/iobroker.worx/img/instance_1.png)

- `Расстояние и время в минутах и м`: по умолчанию ч и км.
- «Пинг-соединение MQTT каждые 10 минут».: Просто для проверки. Пожалуйста, не более 1 часа!
- `Обновление данных MQTT после обновления токена`: загружает данные Worx после обновления токена. 24 дополнительных запроса в день/устройства.

![Настройки экземпляра img/instance_2.png](../../../en/adapterref/iobroker.worx/img/instance_2.png)

### Папка
- `activityLog`: журнал вашей активности (возможен контроль)
- `области`: Области (возможно управление)
- `календарь`: расписание (возможно управление)
- `Модули`: Ваш модуль(и) (возможно управление)
- `косилка`: Ваша косилка (возможно управление)
- `product`: все свойства ваших устройств (только чтение).
- `rawMqtt`: все данные из облака (только чтение).

![Папка img/all_folders.png](../../../en/adapterref/iobroker.worx/img/all_folders.png)

###Журнал активности (Wire и Vision)
- `last_update`: последнее обновление как временная метка.
- `manuell_update`: загружает текущий журнал активности (автоматически после изменения статуса)
- `полезная нагрузка`: журнал активности в виде таблицы JSON (для VIS или Blockly).

![Активность img/activity.png](../../../en/adapterref/iobroker.worx/img/activity.png)

### Области (без обзора)
- `actualArea`: Текущий
- `actualAreaIndicator`: начало следующей зоны массива.
- `area_0`: начало зоны 1 в метрах (массив=0) (изменяемо)
- `area_1`: начало зоны 2 в метрах (массив=1) (изменяемо)
- `area_2`: начало зоны 3 в метрах (массив=2) (изменяемо)
- `area_3`: Начало зоны 4 в метрах (массив=3) (изменяемо)
- `startSequence`: начало зоны массива (события 0-9), например. Запуск только в зоне 3 [2,2,2,2,2,2,2,2,2,2] (изменяемо)
- `zoneKeeper`: Безопасное вождение в узких зонах пересечения (Области должны быть созданы) (начиная с прошивки 3.30) (изменяемо)

![Площадь img/areas.png](../../../en/adapterref/iobroker.worx/img/areas.png)

### Календарь (Wire и Vision)
- Например. установка времени на среду

    - `wednesday.borderCut`: с обрезанием рамки или без него (изменить значение без задержки) (изменяемо)
    - `wednesday.startTime`: время начала чч:мм (0-23/0-59), например 09:00 (Изменить значение без задержки) (изменяемо)
    - `wednesday.workTime`: рабочее время в минутах (180 минут = 3 часа), например 30 = Конец 09:30 (Изменить значение без задержки) (изменяемо)
    - `calJson_sendto`: если все точки данных установлены, нажмите кнопку для отправки (с задержкой 1,1 секунды). Теперь газонокосилка будет косить в течение 30 минут (можно изменить).
    - `calJson_tosend`: эти данные отправляются в Mqtt (оба графика кошения устанавливаются автоматически). Вы также можете создать этот JSON самостоятельно. (Сменный)
    - `calendar.calJson`: массив для еженедельного плана кошения. Вы также можете создать этот МАССИВ самостоятельно. (график кошения 1/устанавливается автоматически – только для проволоки) (изменяемый)
    - `calendar.calJson2`: массив для еженедельного плана кошения. Вы также можете создать этот МАССИВ самостоятельно. (график кошения 2/устанавливается автоматически – только для проволоки) (изменяемый)

![Папка img/calendar.png](../../../en/adapterref/iobroker.worx/img/calendar.png)

### Модулей (Wire и Vision)
- Модуль ограничения (провод и зрение)

    - `DF.OLMSwitch_Cutting`: предотвращает перетирание магнитной ленты - истинное включение/ложное выключение.
    - `DF.OLMSwitch_FastHoming`: быстрый возврат на зарядную станцию - истинное включение/ложное выключение.

- Модуль ACS (только проводной)
    - `US.ACS`: включить или отключить ACS - 1-вкл./0-выкл.

![Модуль img/module.png](../../../en/adapterref/iobroker.worx/img/module.png)

### Косилка (Wire и Vision)
- «AutoLock»: автоматическая блокировка истинного включения/ложного выключения (проводное и визуальное/изменяемое)
- AutoLockTimer: максимальная автоматическая блокировка таймера. 10 минут с шагом 30 секунд (проводное и Vision/сменное)
- `batteryChargeCycle`: цикл зарядки аккумулятора (проводное и Vision/только чтение)
- `batteryCharging`: зарядка аккумулятора ложная->нет/истина->да (проводное и Vision/только чтение)
- `batteryState`: состояние батареи в % (проводное и Vision/только чтение)
- `batteryTemperature`: температура батареи в градусах Цельсия (проводное и Vision/только чтение)
- `batteryVoltage`: напряжение батареи в Вольтах (проводное и Vision/только чтение)
- `direction`: направление в градусах (провод и видение/только чтение)
- `edgecut`: запустить EdgeCut (проволока и Vision/сменный)
- `error`: сообщение об ошибке от газонокосилки (провод и Vision/только чтение)

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

![Косилка img/mower_1.png](../../../en/adapterref/iobroker.worx/img/mower_1.png)

- `firmware`: текущая установленная прошивка (проводное и Vision/только чтение).
- `firmware_available`: Доступная прошивка (проводное и Vision/только чтение)
- `firmware_available_all`: последняя доступная прошивка в формате JSON. Этот JSON будет обновляться при появлении нового обновления (проводное и Vision/только чтение).

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

- `firmware_available_date`: дата доступной прошивки - Dummy 1970-01-01, когда адаптер переустановлен и обновление недоступно (проводное и Vision/только чтение)
- `firmware_update_start`: запустить обновление прошивки в 2 этапа (проводное и Vision/сменное)
- «firmware_update_start_approved»: начать обновление прошивки. Для параметра «firmware_update_start» должно быть установлено значение «истина» (проводное и Vision/изменяемое)
- `gradient`: Градиент в градациях (проводное и Vision/только чтение)
- `inclination`: наклон в градусах (провод и видение/только чтение)
- `last_command`: последний запрос от iobroker или приложения в виде таблицы JSON (проводное и Vision/только чтение)
- `mowTimeExtend`: увеличение времени кошения в %. Диапазон: -100%->100% (проводной/изменяемый).
- `mowerActive`: приостановить план кошения (проводной/изменяемый)
- `mqtt_update`: макс. обновление данных Mqtt. 150/день (проводной и Vision/сменный)
- `mqtt_update_count`: счетчик обновления данных Mqtt (проводное и Vision/только чтение)

![Косилка img/mower_2.png](../../../en/adapterref/iobroker.worx/img/mower_2.png)

- `oneTimeJson`: однократное покос в формате JSON (проводное и Vision/изменяемое)

```json
{
    "wtm": 60, //Minutes
    "bc": 0 //0=w/o bordercut 1=with bordercut or use the next datapoints
}
```

- `oneTimeStart`: однократный запуск кошения "сначала заполните oneTimeWithBorder и oneTimeWorkTime" - с задержкой 1,1 секунды (проводное и Vision/изменяемое)
- `oneTimeWithBorder`: с рамкой - изменение значения без задержки (проводное и Vision/изменяемое)
- `oneTimeWorkTime`: Макс. рабочее время. 8 часов с шагом 30 минут — изменение значения без задержки (проводное и Vision/изменяемое)
- «онлайн»: газонокосилка онлайн (проводное и Vision/только чтение)
- `partyModus`: включение/выключение Partymodus (проводное и Vision/изменяемое)
- «Пауза»: включение/выключение прерывания газонокосилки (проводное и Vision/изменяемое)
- `reset_battery_time`: сброс заряда батареи в 2 этапа (проводной и визуальный/сменный)
- `reset_battery_time_approved`: подтвердите сброс заряда батареи. - `reset_battery_time` должно быть установлено в значение true (проводное и визуальное/изменяемое)
- `reset_blade_time`: сброс рабочего времени лезвия в 2 этапа (провод и зрение/изменяемое)
- `reset_blade_time_approved`: подтвердите сброс рабочего времени лезвия. - `reset_battery_time` должно быть установлено в значение true (проводное и визуальное/изменяемое)

![Косилка img/mower_3.png](../../../en/adapterref/iobroker.worx/img/mower_3.png)

- `sendCommand`: отправить команду cmd (проводное и Vision/изменяемое)

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

- `state`: True для запуска газонокосилки и False для остановки косилки (проводное и Vision/изменяемое)
- `status`: статус газонокосилки (проводное и Vision/только чтение)

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

- «крутящий момент»: диапазон крутящего момента колеса -50->50 (проводной и Vision/сменный)
- `totalBladeTime`: общее время работы блейда (проводное и Vision/только чтение)
- `totalDistance`: общее расстояние (провод и зрение/только чтение)
- `totalTime`: общее время работы (проводное и Vision/только чтение)
- `waitRain`: Макс. задержка дождя. 12 часов с шагом 30 минут (проводное и Vision/сменное)
- `wifiQuality`: качество Wi-Fi (проводное и Vision/только чтение)

![Косилка img/mower_4.png](../../../en/adapterref/iobroker.worx/img/mower_4.png)

### Дополнительно для зрения
-   Область
    - `rfid`: общая площадь (только чтение)
    - `startSequence`: многозонный JSON (видение/изменяемый) [Пример](#example-blockly-startsequence-vison)

Пример:

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

По умолчанию без зоны:

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

![Видение img/areas_vision.png](../../../en/adapterref/iobroker.worx/img/areas_vision.png)

- Косилка
    - `log_improvement`: отправлять журнал улучшений в worx, отключить/включить (изменяемо)
    - `log_troubleshooting`: отправлять журнал устранения неполадок в worx, отключить/включить (изменяемо)

![Видение img/logs_vision.png](../../../en/adapterref/iobroker.worx/img/logs_vision.png)

- Косилка
    - `paused`: приостановленное расписание в минутах (изменяемое)

![Видение img/paused_vision.png](../../../en/adapterref/iobroker.worx/img/paused_vision.png)

### Info_mqtt (Wire и Vision)
- `incompleteOperationCount`: общее количество операций, отправленных на соединение, которые еще не были завершены. Неподдерживаемые операции являются подмножеством этого.
- `incompleteOperationSize`: общий размер пакета операций, отправленных на соединение, которые еще не завершены. Неподдерживаемые операции являются подмножеством этого.
- `unackedOperationCount`: общее количество операций, которые были отправлены на сервер и ожидают соответствующего подтверждения, прежде чем они могут быть завершены.
- `unackedOperationSize`: общий размер пакетов операций, которые были отправлены на сервер и ожидают соответствующего подтверждения, прежде чем они могут быть завершены.
- `last_update`: последнее обновление токена.
- `next_update`: следующее обновление токена.
- `online`: состояние соединения MQTT (false=оффлайн/true=онлайн)

![Видение img/mqtt_info.png](../../../en/adapterref/iobroker.worx/img/mqtt_info.png)

### Пример Blockly startsequence Vison
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