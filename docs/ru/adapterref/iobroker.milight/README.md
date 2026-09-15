---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.milight/README.md
title: ioBroker.milight
hash: gH5MmGu2CA0Hmsc6WrFnc9b5uy994z34NNheypNY4oA=
---
![Логотип](../../../en/adapterref/iobroker.milight/admin/easybulb_logo.png)

![Количество установок](http://iobroker.live/badges/milight-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.milight.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.milight.svg)
![Статус сборки](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.milight.png?downloads=true)

# ioBroker.milight

Адаптер для ioBroker для светодиодных ламп, таких как milight, easybulb, limitless.

## Общие настройки:

на странице администратора

- IP-адрес -> IP-адрес моста
- Порт -> порт моста
- delaybetweenPackages -> задержка в миллисекундах между UDP-пакетами (100 мс для версии 5)
- repeatPackage -> количество повторений (1 для версии 5)
- версия протокола Milight v5 или v6 -> автоматически устанавливает соответствующий порт
- Установка максимальной яркости при переключении в белый режим.

## Типы луковичных растений в зонах:

на странице администратора

- базовый режим = мост ТОЛЬКО для зоны 1 и V6
- RGBWW = полноцветная лампа с белым светодиодом и регулировкой цветовой температуры (увеличение цветовой температуры означает более холодный оттенок), ТОЛЬКО в версии 6.
- RGB = лампочка чистого цвета без белого, ТОЛЬКО для зоны 1.
- RGBW = цветная лампа с белым светодиодом
- Белый = лампа белого света WW/CW с регулировкой цветовой температуры (увеличение цветовой температуры означает более холодный оттенок).

Для управления всеми четырьмя зонами можно использовать Zone0 или ZoneAll; в версии 6 адаптер настраивается с помощью команд base/bridge, а в версии 5 — с помощью команд rgbw.

## Штаты в версии 6

|                    доступное состояние                   |          базовый/мост         |               Белый              |              RGB              |                    RGBW                   |                   RGBWW                   |
| :------------------------------------------------------: | :---------------------------: | :------------------------------: | :---------------------------: | :---------------------------------------: | :---------------------------------------: |
|             ВКЛ/ВЫКЛ в качестве переключателя            |   состояние(зона1), функция   |     состояние(зона), функция     |   состояние(зона1), функция   |          состояние(зона), функция         |          состояние(зона), функция         |
|                      ВКЛ как кнопка                      |       on(zone1), native       |         on(zone), native         |       on(zone1), native       |              on(zone), native             |              on(zone), native             |
|                     ВЫКЛ. как кнопка                     |       off(zone1), native      |         off(zone), native        |       off(zone1), native      |             off(zone), native             |             off(zone), native             |
|            colorMode как логическое состояние            |                               |                                  |                               | colorMode (0=ночной режим, 1=белый режим) | colorMode (0=ночной режим, 1=белый режим) |
|                    maxWhite как кнопка                   |                               |      maxBright(zone), native     |                               |                                           |                                           |
|                  белый режим как кнопка                  |    whiteMode(zone1), native   |                                  |                               |          whiteMode(zone), native          |          whiteMode(zone), native          |
|                  ночной режим как кнопка                 |                               |   ночной режим (зона), нативный  |                               |       ночной режим (зона), нативный       |       ночной режим (зона), нативный       |
|          Яркость в единицах измерения (0-100%).          |     яркость(зона), родная     |                                  |                               |           яркость(зона), родная           |           яркость(зона), родная           |
|         цвет в виде 3 шестнадцатеричных значений         |       цвет(зона), родной      |                                  |       цвет(зона), родной      |             цвет(зона), родной            |             цвет(зона), родной            |
| RGB в виде комбинированного значения (#000000 - #FFFFFF) |      rgb(зона), нативный      |                                  |      rgb(зона), нативный      |            rgb(зона), нативный            |            rgb(зона), нативный            |
|                    режим как значение                    |     режим(зона), нативный     |                                  |                               |           режим(зона), нативный           |           режим(зона), нативный           |
|                  modeSpeedUp как кнопка                  |                               |     modeSpeedUp(zone), native    |                               |       режим SpeedUp (зона), нативный      |       режим SpeedUp (зона), нативный      |
|                 modeSpeedDown как кнопка                 |                               | режим SpeedDown (зона), нативный |                               |        modeSpeedDown(zone), native        |        modeSpeedDown(zone), native        |
|                     ссылка как кнопка                    |                               |                                  |                               |           ссылка(зона), нативный          |           ссылка(зона), нативный          |
|                  кнопка «Отключить как»                  |                               |                                  |                               |            unlink(zone), native           |            unlink(zone), native           |
|             Насыщенность в единицах (0-100%)             |                               |                                  |                               |                                           |       Насыщенность (зона), нативная       |
|  Значение colorTemp (0-100 соответствует 2700K и 6500K)  |                               |                                  |                               |                                           |          colorTemp (zone), native         |
|                  кнопка «Яркость вверх»                  |  функция brightnessUp (зона)  |    brightnessUp (zone), native   |  brightnessUp (zone), native  |        функция brightnessUp (зона)        |        функция brightnessUp (зона)        |
|               Уменьшение яркости как кнопка              | функция brightnessDown (зона) |   brightnessDown (zone), native  | brightnessDown (zone), native |       функция brightnessDown (зона)       |       функция brightnessDown (зона)       |
|                    colorUp как кнопка                    |     функция colorUp(zone)     |                                  |                               |           функция colorUp(zone)           |           функция colorUp(zone)           |
|                   цвет Вниз как кнопка                   |    цвет Down(zone), функция   |                                  |    цвет Down(zone), функция   |          цвет Down(zone), функция         |                                           |
|               насыщенностьВверх как кнопка               |                               |                                  |                               |                                           |        функция saturationUp (зона).       |
|                насыщенностьВниз как кнопка               |                               |                                  |                               |                                           |       saturationDown (zone), функция      |
|                  colorTempUp как кнопка                  |                               |    colorTempUp (zone), native    |                               |                                           |        colorTempUp (zone), функция        |
|                 colorTempDown как кнопка                 |                               |   colorTempDown (zone), native   |                               |                                           |       colorTempDown (zone), функция       |
|               оттенок как значение (0-360)               |                               |                                  |                               |          оттенок (зона), функция          |          оттенок (зона), функция          |

## Состояния в версии 5/версии 4

|                    доступное состояние                   |            RGB           |           Белый          |                      RGBW                      |
| :------------------------------------------------------: | :----------------------: | :----------------------: | :--------------------------------------------: |
|             ВКЛ/ВЫКЛ в качестве переключателя            | состояние(зона), функция | состояние(зона), функция |            состояние(зона), функция            |
|                      ВКЛ как кнопка                      |     on(zone), native     |     on(zone), native     |                on(zone), native                |
|                     ВЫКЛ. как кнопка                     |     off(zone), native    |     off(zone), native    |                off(zone), native               |
|            colorMode как логическое состояние            |                          |                          | colorMode (0/hs=whiteMode, 1/ct=color(hue=55)) |
|                    maxWhite как кнопка                   |                          |  maxBright(zone), native |                                                |
|                  белый режим как кнопка                  |                          |                          |             whiteMode(zone), native            |
|                  ночной режим как кнопка                 |                          |                          |          ночной режим (зона), нативный         |
|             цвет как значение оттенка (0-255)            |                          |                          |                 оттенок, родной                |
| RGB в виде комбинированного значения (#000000 - #FFFFFF) |                          |                          |                  rgb, нативный                 |
|                  colorTempUp как кнопка                  |                          |   более теплый, местный  |                                                |
|                 colorTempDown как кнопка                 |                          | более прохладный, родной |                                                |
|          Яркость в единицах измерения (0-100%).          |                          |                          |                 яркость, родной                |
|  Яркость в виде значения (0-100%), расширенный диапазон  |                          |                          |                                                |
|                 effectModeNext как кнопка                |                          |                          |             effectModeNext, native             |
|                    Ускорить как кнопку                   |      speedUp, native     |                          |              effectSpeedUp, native             |
|                   Ускорение как кнопка                   |     speedDown, native    |                          |             effectSpeedDown, native            |
|                    brightUp как кнопка                   |     brightUp, native     |     brightUp, native     |                                                |
|                   brightDown как кнопка                  |   яркий Даун, коренной   |   яркий Даун, коренной   |                                                |
|                 effectModeNext как кнопка                |   effectSpeedUp, native  |                          |                                                |
|                 effectModePrev как кнопка                |  effectSpeedDown, native |                          |                                                |

Функции effectSpeedUp/Down имеют разное значение (для RGB они меняют режим, для RGBW — скорость)!

## Конфигурация:

На странице администратора адаптера версии 5 также можно использовать для ламп версии 4.

## TODO:

- ??

## Известные проблемы:

- ??

## Changelog

### **WORK IN PROGRESS**
- (iobroker-bot) Adapter requires node.js >= 20 now.:
### 0.4.0
* compact mode
### 0.3.6
* (foxthefox) node-milight-promise 0.3.1 (former version 0.2.32)

### 0.3.5
* (mrinc)     fix for the v5 color setting (was always blue)
* (foxthefox) nightModeSwitch added on white bulbs for command from Alexa

### 0.3.4
* (foxthefox) adminv3 added

### 0.3.3
* (foxthefox) setting of state after usage of command OFF/ON
* (foxthefox) v6 widget for RGBW; RGBWW mode switch night/weiß instead weiß/farbe
* (foxthefox) v6 widget for RGBW, RGBWW speedup/down correction, no hide of color temp vs. color when switching night/weiß
* (foxthefox) v5 widget for RGBW with color changing to matching the selected color
* (foxthefox) v6 widget for RGBWW with colortemperature changing to matching the selected colortemperature

### 0.3.2
* (foxthefox) V5 uses brightUp/brightDown instead brightnessUp/brightnessDown
* (foxthefox) corrections in V5 for white Commands (cooler/warmer/maxBright)
* (foxthefox) new RGBWW V6 widget
* (foxthefox) update for effects and correctios in RGBW V6 widget
* (foxthefox) added CW/WW widget V4 and V6
* (foxthefox) added disco button in RGBW V4

### 0.3.1
* (bluefox) added checking of methods before calling them

### 0.3.0
* (foxthefox) cleanup of states
* (foxthefox) added white/rgb lamp
* (foxthefox) correction of mismatch RGBW/RGBWW in v6
* (foxthefox) v6 brightness only 0-0x64(100)

### 0.2.2/0.2.1
* (foxthefox) debug messages with v5/v6 prefix; v6 colorset->colormode

### 0.2.0 
* (bluefox) discovery for v6

### 0.1.1
* (foxthefox) switch lamp on with full brightness -> checkbox in admin for v5

### 0.1.0
* (foxthefox) tested with bridge version 4 and protocol version v5
* (bluefox)v6 implementation
* (foxthefox) node-milight-promise 0.0.9
* (foxthefox) jqui widget RGBW lamp

### 0.0.1
* (foxthefox) initial setup

## License

The MIT License (MIT)

Copyright (c) 2018-2026 foxthefox <foxthefox@wysiwis.net>