---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tapo/README.md
title: ioBroker.tapo
hash: NZZlPgk6tEpWMvMhoy6ZkKwcotfviMd4dbVqujDyd4g=
---
![Логотип](../../../en/adapterref/iobroker.tapo/admin/tapo.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.tapo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tapo.svg)
![Количество установок](https://iobroker.live/badges/tapo-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/tapo-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.tapo.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.tapo/workflows/Test%20and%20Release/badge.svg)

# ioBroker.tapo

## адаптер tapo для ioBroker

Адаптер для TP-Link Tapo

на основе <https://github.com/apatsufas/homebridge-tapo-p100>

## Логинаблауф

Выберите «Почта и пароль». Es werden die Geräte через Cloud abgerufen, aber local gesteuert. Если IP-адрес не используется, вам нужно вручную использовать Tapo.0.id.ip.

## Status-Werte (eingehend)

Alle Geraete werden regelmaessig gepollt. Die Werte werden autotisch unter`tapo.0.id.*` angelegt.

### Alle Geraete

Пример:`tapo.0.80A5897B21C7.nickname` ,`tapo.0.80A5897B21C7.device_on`

| Верт            | Тип        | Описание                          |
| --------------- | ---------- | --------------------------------- |
| прозвище        | нить       | Гераетенаме                       |
| device\_id      | нить       | Гераете-ID                        |
| модель          | нить       | Modellbezeichnung                 |
| fw\_ver         | нить       | Версия прошивки                   |
| hw\_ver         | нить       | Аппаратная версия                 |
| мак             | нить       | MAC-адрес                         |
| device\_on      | логический | Geraet ein/aus                    |
| вовремя         | число      | Einschaltdauer in Sekunden        |
| rssi            | число      | WLAN-Signalstaerke                |
| уровень сигнала | число      | Сигналстарке (1-3)                |
| SSID            | нить       | Название беспроводной сети (WLAN) |
| IP              | нить       | IP-адрес                          |
| перегретый      | логический | Ueberhitzungsstatus               |

### Lampen (zusaetzlich)

Пример:`tapo.0.80A5897B21C7.brightness` ,`tapo.0.80A5897B21C7.hue`

| Верт         | Тип   | Описание                        |
| ------------ | ----- | ------------------------------- |
| яркость      | число | Хеллигкейт (0-100)              |
| color\_temp  | число | Фарбтемпература в Кельвинах     |
| оттенок      | число | Фарбтон (0-360, ну L530/L630)   |
| насыщенность | число | Сэттигунг (0-100, от L530/L630) |

### P110/P115 Энергетические данные (zusaetzlich)

Пример:`tapo.0.80A5897B21C7.current_power` ,`tapo.0.80A5897B21C7.voltage_mv`

| Верт                  | Тип   | Описание                           |
| --------------------- | ----- | ---------------------------------- |
| текущая\_мощность     | число | Актуальная мощность (мВт)          |
| сегодня\_энергия      | число | Потребление энергии сегодня (Вт·ч) |
| месяц\_энергия        | число | Потребление энергии в месяц (Втч)  |
| напряжение\_мв        | число | Шпанунг (мВ)                       |
| current\_ma           | число | Стром (мА)                         |
| power\_mw             | число | Мощность (мВт)                     |
| текущее (потребление) | число | Aktuelle Leistung (W, берехнет)    |
| общее (потребление)   | число | Energie heute (кВтч, бережнет)     |

### Hub-Sensoren (Детские устройства)

Пример:`tapo.0.80A5897B21C7.child_SENSOR_ID.current_temp`

| Датчик                            | Верте                                                                     | Описание                      |
| --------------------------------- | ------------------------------------------------------------------------- | ----------------------------- |
| T100 (Bewegung)                   | обнаружено                                                                | Bewegung erkannt              |
| Т110 (Контакт)                    | открыть                                                                   | Tuer/Fenster offen            |
| Т300 (Вассерлек)                  | water\_leak\_status, in\_alarm                                            | Статус Вассерлека             |
| T310/T315 (температура/влажность) | текущая\_температура, текущая\_влажность, единица\_измерения\_температуры | Температура и люфтфойхтигкейт |
| KE100 (термостат)                 | target\_temp, current\_temp, frost\_protection\_on, trv\_states           | Состояние термостата          |

Все сенсорные датчики`battery_percentage` ,`at_low_battery` унд`signal_level` .

### Статус камеры

Пример:`tapo.0.80A5897B21C7.alarm` ,`tapo.0.80A5897B21C7.personDetection`

| Верт                                     | Тип        | Описание                                                  |
| ---------------------------------------- | ---------- | --------------------------------------------------------- |
| тревога                                  | логический | Активация сигнализации                                    |
| глаза                                    | логический | Режим конфиденциальности (инвертированный: true = камера) |
| уведомления                              | логический | Push-Benachrichtigungen aktiv                             |
| Обнаружение движения                     | логический | Bewegungserkennung aktiv                                  |
| вел                                      | логический | LED активный                                              |
| автотрек                                 | логический | Активация автоматического отслеживания                    |
| personDetection                          | логический | Personenerkennung aktiv                                   |
| VehicleDetection                         | логический | Fahrzeugerkennung aktiv                                   |
| обнаружение питомцев                     | логический | Tiererkennung aktiv                                       |
| babyCryDetection                         | логический | Baby-Schrei-Erkennung aktiv                               |
| Обнаружение коры                         | логический | Bellen-Erkennung aktiv                                    |
| обнаружение мяука                        | логический | Miauen-Erkennung aktiv                                    |
| glassBreakDetection                      | логический | Glasbruch-Erkennung aktiv                                 |
| обнаружение несанкционированного доступа | логический | Manipulations-Erkennung aktiv                             |
| imageFlip                                | логический | Bild vertikal gespiegelt                                  |
| льдк                                     | логический | Linsenverzerrungscorrektur актив                          |
| запись аудио                             | логический | Активное аудиозапись                                      |
| автоматическое обновление                | логический | Активировано автоматическое обновление прошивки           |

Nicht jedes Geraet Lifert alle Werte. Felder die das Geraet nicht unterstuetzt werden nicht angelegt.

### Kamera-Erkennungsereignisse

Пример:`tapo.0.80A5897B21C7.detection.active` ,`tapo.0.80A5897B21C7.detection.events.0.alarm_type`

Die Kamera wird local gepollt und Lifert Erkennungs-Events (Bewegung, Personen и т. д.). Die letzten 10 Events werden abgerufen (`searchDetectionList` ), neuestes Event zuerst.

| Верт                           | Тип        | Описание                                       |
| ------------------------------ | ---------- | ---------------------------------------------- |
| обнаружение.актив              | логический | true wenn Erkennung in den letzten 30 Sekunden |
| detection.eventCount           | число      | Anzahl Ereignisse in den Letzten 10 Minuten    |
| detection.events.0.start\_time | число      | Unix-Timestamp Начало новых событий            |
| detection.events.0.end\_time   | число      | Unix-Timestamp Ende des neuesten Events        |
| detection.events.0.alarm\_type | число      | Erkennungstyp (siehe Tablele unten)            |
| detection.events.1.start\_time | число      | Zweitneuestes Event (usw. bis 9)               |
| motionEvent                    | логический | ONVIF Echtzeit-Bewegungserkennung              |

#### alarm\_type Werte

| ИДЕНТИФИКАТОР | Описание                                |
| ------------- | --------------------------------------- |
| 2             | Bewegung (motion)                       |
| 3             | Манипуляция (подделка)                  |
| 4             | Linienueberquerung (пересечение линии)  |
| 5             | Интрузия Берейхса (интрузия территории) |
| 6             | Человек                                 |
| 7             | Baby-Schrei (детский плач)              |
| 8             | Fahrzeug (vehicle)                      |
| 9             | Уровень (питомец)                       |
| 11            | Беллен (кора)                           |
| 12            | Мяуэн (мяу)                             |
| 13            | Разбить стекло (Glasbruch)              |
| 14            | Rauch (дым)                             |
| 15            | Paket abgelegt (доставка посылок)       |
| 16            | Paket abgeholt (выдача посылки)         |
| 20            | Gesichtserkennung (распознавание лиц)   |
| 32            | Herumlungern (праздное шатание)         |

Nicht jede Kamera Lifert alle Typen. Die verfuegbaren Werte haengen von Modell und Firmware ab.

### Настройка сигнализации

Пример:`tapo.0.80A5897B21C7.alarmInfo.enabled` ,`tapo.0.80A5897B21C7.alarmInfo.alarm_volume`

| Верт                            | Тип       | Описание                                    |
| ------------------------------- | --------- | ------------------------------------------- |
| alarmInfo.enabled               | нить      | Активация сигнализации (вкл/выкл)           |
| alarmInfo.alarm\_mode           | смешанный | Режимы сигнализации (звук, свет)            |
| alarmInfo.alarm\_volume         | нить      | Лаутстарке                                  |
| alarmInfo.alarm\_duration       | нить      | Dauer in Sekunden                           |
| alarmInfo.alarm\_type           | нить      | Sirenen-Typ                                 |
| alarmInfo.light\_type           | нить      | Licht-Typ                                   |
| alarmInfo.light\_alarm\_enabled | нить      | Активная световая сигнализация (вкл/выкл)   |
| alarmInfo.sound\_alarm\_enabled | нить      | Активация звуковой сигнализации (вкл/выкл). |

### Alarm-Event-Typen (выбор типа сигнала тревоги)

Пример:`tapo.0.80A5897B21C7.alertEventTypes.motion` ,`tapo.0.80A5897B21C7.alertEventTypes.person`

| Верт                    | Тип        | Описание                    |
| ----------------------- | ---------- | --------------------------- |
| alertEventTypes.motion  | логический | Alarm bei Bewegung          |
| alertEventTypes.person  | логический | Сигнал тревоги для человека |
| alertEventTypes.vehicle | логический | Alarm bei Fahrzeug          |
| alertEventTypes.pet     | логический | Сигнализация на уровне      |

### Benachrichtigungen einrichten

Fuer Benachrichtigungen bei Erkennung ein ioBroker-Skript auf`detection.events.0.start_time` триггер:

```javascript
const alarmTypen = {
  2: "Bewegung",
  3: "Manipulation",
  4: "Linienueberquerung",
  5: "Bereichsintrusion",
  6: "Person",
  7: "Baby-Schrei",
  8: "Fahrzeug",
  9: "Tier",
  11: "Bellen",
  12: "Miauen",
  13: "Glasbruch",
  14: "Rauch",
  15: "Paket abgelegt",
  16: "Paket abgeholt",
  20: "Gesicht",
  32: "Herumlungern",
};

on({ id: "tapo.0.DEVICE_ID.detection.events.0.start_time", change: "ne" }, (obj) => {
  const typ = getState("tapo.0.DEVICE_ID.detection.events.0.alarm_type").val;
  sendTo("telegram.0", {
    text: (alarmTypen[typ] || "Typ " + typ) + " um " + new Date(obj.state.val * 1000).toLocaleString(),
  });
});
```

Blockly-Beispiel (также как XML importierbar):

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

Интервал опроса находится в конфигурационной панели Adapteinstellungen (стандартно: 10 секунд). Alles local, kein Cloud-Zugriff noetig.

## Стойерн

Tapo.0.id.remote auf true/false setzen steuert den jeweiligen Befehl. Der Befehl wird locale и das Gerät gendet.

### Вилки/выключатели (P100, P110, P115, ...)

| Удаленный                   | Тип        | Описание                                                |
| --------------------------- | ---------- | ------------------------------------------------------- |
| обновить                    | логический | Обновление состояния ручного управления                 |
| setPowerState               | логический | Эйн/Аус                                                 |
| setPowerStateChild          | нить       | Child-Device steuern:`childId,true` Одер`childId,false` |
| setLedEnabled               | логический | LED Indikator ein/aus                                   |
| setAutoOff                  | логический | Таймер автоматического отключения ein/aus               |
| setAutoOffDelay             | число      | Автоматическое отключение Verzoegerung через минуту     |
| setChildProtection          | логический | Tastensperre (Блокировка кнопок) ein/aus                |
| setPowerProtection          | логический | Ueberlastschutz ein/aus                                 |
| setPowerProtectionThreshold | число      | Ueberlast-Schwellwert in Watt                           |
| setAutoUpdate               | логический | Автоматическое обновление прошивки ein/aus              |

P110/P115liefern zusaetzlich Energiedaten (Leistung, Spannung, Strom).

### Лампен (L510E, L520E, L530, L630, L900, L920, ...)

Alle Plug-Remote plus:

| Удаленный          | Тип        | Описание                             |
| ------------------ | ---------- | ------------------------------------ |
| установить яркость | число      | Helligkeit setzen                    |
| setColorTemp       | число      | Фартерматура (2500-6500K)            |
| setColor           | нить       | Farbe setzen:`hue, saturation`       |
| setLightEffect     | нить       | Идентификатор светового эффекта`off` |
| setGradualOnOff    | логический | Sanftes Ein-/Ausschalten             |

### Фанаты (F1xx)

| Удаленный        | Тип        | Описание                      |
| ---------------- | ---------- | ----------------------------- |
| setFanSpeedLevel | число      | Geschwindigkeit 0-4 (0 = aus) |
| setFanSleepMode  | логический | Schlafmodus ein/aus           |

### Втулка (H100, H200)

| Удаленный        | Тип        | Описание                                                      |
| ---------------- | ---------- | ------------------------------------------------------------- |
| playAlarm        | логический | Alarm abspielen                                               |
| стоп-сигнал      | логический | Сигнализация отключена                                        |
| setAlarmVolume   | нить       | Сигнализация Lautstaerke: без звука/низкий/нормальный/высокий |
| setAlarmDuration | число      | Alarm Dauer in secunden                                       |

### Термостат / термостатический клапан (KE100)

| Удаленный            | Тип        | Описание                         |
| -------------------- | ---------- | -------------------------------- |
| setTargetTemperature | число      | Zieltemperatur setzen            |
| setTemperatureOffset | число      | Смещение температуры (-10 до 10) |
| setFrostProtection   | логический | Frostschutz ein/aus              |

### Хаб-сенсорен (T100, T110, T300, T310, T315)

Датчики температуры (температура, люфтфойхтигкейт, Bewegung, Kontakt, Wasserleck) автоматически передаются через`getChildDeviceList` abgerufen и другие статусы.

### Камеры (C200, C310, C520, TC70, ...)

| Удаленный                     | Тип        | Описание                                             |
| ----------------------------- | ---------- | ---------------------------------------------------- |
| обновить                      | логический | Обновление состояния ручного управления              |
| setAlertConfig                | логический | Alarm ein/aus                                        |
| setLensMaskConfig             | логический | Privacy (Eyes) ein/aus                               |
| setForceWhitelampState        | логический | Weisslicht ein/aus                                   |
| setLedStatus                  | логический | LED ein/aus                                          |
| setMsgPushConfig              | логический | Benachrichtigungen ein/aus                           |
| setDetectionConfig            | логический | Bewegungserkennung ein/aus                           |
| setAutoTrackTarget            | логический | Автоматическое отслеживание ein/aus                  |
| setPersonDetection            | логический | Personenerkennung ein/aus                            |
| setVehicleDetection           | логический | Fahrzeugerkennung ein/aus                            |
| setPetDetection               | логический | Tiererkennung ein/aus                                |
| setBabyCryDetection           | логический | Baby-Schrei-Erkennung ein/aus                        |
| setBarkDetection              | логический | Bellen-Erkennung ein/aus                             |
| setMeowDetection              | логический | Miauen-Erkennung ein/aus                             |
| setGlassBreakDetection        | логический | Glasbruch-Erkennung ein/aus                          |
| setTamperDetection            | логический | Манипуляции-Erkennung ein/aus                        |
| setImageFlipVertical          | логический | Bild vertikal spiegeln                               |
| setLensDistortionCorrence     | логический | Linsenverzerrungscorrektur ein/aus                   |
| setRecordAudio                | логический | Audio aufnehmen ein/aus                              |
| setAutoUpgrade                | логический | Автоматическое обновление прошивки ein/aus           |
| установить HDR                | логический | HDR ein/aus                                          |
| setCoverConfig                | логический | Зоны конфиденциальности ein/aus                      |
| setRecordPlan                 | логический | SD-Karten Aufnahme ein/aus                           |
| moveMotor                     | нить       | Kamera bewegen:`x, y` (-360..360, -45..45)           |
| moveMotorStep                 | нить       | Schrittwinkel (0-360)                                |
| moveToPreset                  | нить       | Zu Preset fahren (ID)                                |
| калибровать двигатель         | логический | Motor kalibrieren                                    |
| сохранить Предустановка       | нить       | Предварительно заданные параметры (Имя)              |
| deletePreset                  | нить       | Предварительно заданный loeschen (ID)                |
| setCruise                     | нить       | Патрулирование: x/y/выкл.                            |
| запуск вручную Сигнализация   | логический | Ручной запуск сигнализации                           |
| stopManualAlarm               | логический | Ручная остановка сигнализации                        |
| setAlarmMode                  | нить       | Режим сигнализации: оба/свет/звук/выкл.              |
| setDayNightMode               | нить       | Режимы Tag/Nacht: авто/вкл/выкл                      |
| setLightFrequencyMode         | нить       | Lichtfrequenz: auto/50/60                            |
| setSpeakerVolume              | число      | Лаутпрехер-Лаутштаерке (0-100)                       |
| setMicrophoneVolume           | число      | Микрофон-Лаутстерке (0-100)                          |
| setMotionDetectionSensitivity | нить       | Bewegungs-Sensitivitaet: высокая/нормальная/низкая   |
| setPersonDetectionSensitivity | нить       | Персонен-чувствительность: высокая/нормальная/низкая |
| setOsd                        | нить       | OSD Beschriftungstext                                |
| перезагрузить                 | логический | Kamera neustarten                                    |
| формат SD-карты               | логический | SD-Karte formatieren                                 |

Не используйте камеру для всех функций. Ничего не нужно делать, если вы хотите, чтобы ваш журнал вышел из журнала.

## Kamerasteuerung aktivieren

![альтернативный текст](./img/tpcamera01.jpeg "TP Labor")![альтернативный текст](../../../en/adapterref/iobroker.tapo/img/tpcamera02.jpeg "TP Labor")

## Discussion und Fragen

<https://forum.iobroker.net/topic/57336/test-adapter-tp-link-tapo/>

## Changelog
### 0.6.12 (2026-08-11)

- Fix intermittent "Expected double-quoted property name in JSON" on KLAP/TPAP devices: requests per device are now serialized, so rapid commands (or a poll racing a command) no longer corrupt the AES sequence counter and garble the decrypted response

### 0.6.11 (2026-08-11)

- Fix: L530 name variants (e.g. "L530 Series", hw 1.0) are now detected as color bulbs, so `setColor`/`setColorTemp` are available (match by prefix instead of exact "L530")

### 0.6.10 (2026-08-11)

- Fix `setColorTemp` for L530/L530E: send the value directly in Kelvin (it was wrongly converted from mired, e.g. 6000 became 2500) and send only `color_temp` (no hue/saturation), which made the lamp briefly apply the temperature and then revert to a warm hue

### 0.6.9 (2026-08-11)

- Publish the configured PTZ presets as a state (`presets`: id -> name), refreshed after save/delete, so you can see which names/ids `moveToPreset` accepts

### 0.6.8 (2026-08-11)

- PTZ move-to-preset now accepts the preset name (not just the numeric id) and reports success correctly
- Camera connect/reconnect log messages now show the IP instead of `undefined`

### 0.6.7 (2026-08-11)

- Doorbell ring now also works for hub-paired battery doorbells (e.g. D210 + H200): the ring UDP packet (port 20005) is sent from the hub IP, so any packet on the doorbell port now triggers the `ringEvent` (matches Home Assistant)

### 0.6.6 (2026-08-11)

- Fix: an unreachable camera/doorbell (ONVIF/EHOSTUNREACH) no longer aborts init, so the `ringEvent` state and doorbell UDP listener are set up even for battery/hub-paired doorbells (D210)

### 0.6.5 (2026-08-11)

- Log all incoming doorbell UDP (port 20005) packets at debug level to help diagnose hub-paired doorbells (e.g. D210 + H200)

### 0.6.4 (2026-08-11)

- Camera ONVIF port (2020) unreachable is now an info hint, not an error (EHOSTUNREACH/ETIMEDOUT)
- Capture onvif socket errors so they no longer surface as uncaught errors

### 0.6.3 (2026-08-10)

- Camera line crossing detection (on/off toggle + status), ported from python-kasa
- List dynamic light effects (`getLightEffects`) for L530/L630
- Battery status exposed for battery-powered cameras via device info

### 0.6.2 (2026-08-10)

- Fix camera PTZ move-to-preset (the request was missing the `preset` wrapper)
- Support for Tapo smart chime D100C (play/stop chime, volume, ring type) - uses the plug/TPAP protocol

### 0.6.1 (2026-08-09)

- Support for Tapo video doorbells (D-series, e.g. D235) - initialized as camera devices
- Fetch SMART.TAPODOORBELL / SMART.TAPOCHIME device types from the cloud (doorbells were missing from the device list)
- Also fetch SMART.TAPOLOCK / SMART.TAPOROBOVAC / SMART.TAPONVR device types
- Doorbell ring event (`ringEvent` state) via UDP broadcast (port 20005) and alarm polling fallback

### 0.6.0 (2026-07-30)

- Fix camera login for newer firmware (FW 1.4.3+, e.g. C200 1.4.4)
- Use the Camera Account credentials (Stream Username/Password) for local camera login
- Try camera default credentials (admin, LV3 built-in) when the password is rejected
- TPAP/SPAKE2+ fallback for cameras that no longer use the stok login
- Stop amplifying device lockouts: no repeated login attempts while a camera is suspended
- Actionable, rate-limited camera log messages (Camera Account / Third-Party Compatibility hints)

### 0.5.5 (2026-05-25)

- added udp detection for better device detection

### 0.5.4 (2026-04-02)

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