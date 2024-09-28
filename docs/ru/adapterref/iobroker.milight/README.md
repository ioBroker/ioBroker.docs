---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.milight/README.md
title: ioBroker.milight
hash: qErBHu72dxLHQ4Qw9RqTJzzOvk+r3FR4JZKRKiDV7+k=
---
![Логотип](../../../en/adapterref/iobroker.milight/admin/easybulb_logo.png)

![Количество установок](http://iobroker.live/badges/milight-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.milight.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.milight.svg)
![Статус сборки](https://travis-ci.org/foxthefox/ioBroker.milight.svg?branch=master)
![НПМ](https://nodei.co/npm/iobroker.milight.png?downloads=true)

# IoBroker.milight
адаптер для ioBroker для светодиодных ламп типа milight, easybulb, limitless

## Общие настройки:
на странице администратора

* IP-адрес-> IP моста
* Порт -> порт моста
* delaybetweenPackages -> задержка мс между пакетами UDP (100 мс для v5)
* repeatPackage -> количество повторений (1 для v5)
* версия протокола milight v5 или v6 -> автоматически устанавливает соответствующий порт
* установка полной яркости при переключении в белый режим

## Тип лампочек в зонах:
на странице администратора

* базовый = мост ТОЛЬКО для зоны 1 и v6
* RGBWW = полноцветная лампа с белым светодиодом и регулировкой цветовой температуры (увеличение цветовой температуры означает более холодный цвет), ТОЛЬКО в версии 6
* RGB = лампочка чистого цвета без белого ТОЛЬКО для зоны 1
* RGBW = цветная лампочка с белым светодиодом
* Белый = белая лампа WW/CW с регулировкой цветовой температуры (увеличение цветовой температуры означает более холодный цвет)

Zone0 или ZoneAll можно использовать для подачи команд всем 4 зонам, адаптер настроен в v6 с помощью команд base/bridge, а в v5 — с помощью команд rgbw.

## Состояния в версии 6
| доступное состояние | базовый/мост | Белый | RGB | RGBW | RGBWW |
|:-------------------------------------------:|:--------------------------------:|:------------------------------:|:------------------------------:|:-------------------------------------:|:--------------------------------------:|
| ВКЛ/ВЫКЛ как переключатель | состояние (зона1), функция | состояние (зона), функция | состояние (зона1), функция | состояние (зона), функция | состояние (зона), функция |
| ВКЛ как кнопка | вкл(зона1), собственный | вкл(зона), собственный | вкл(зона1), собственный | вкл(зона), собственный | вкл(зона), собственный |
| ВЫКЛ как кнопка | выкл(зона1), собственный | выкл(зона), собственный | выкл(зона1), собственный | выкл(зона), собственный | выкл(зона), собственный |
| colorMode как логическое состояние | | | | colorMode (0=nightMode, 1=whiteMode) | colorMode (0=nightMode, 1=whiteMode) |
| maxWhite как кнопка | | maxBright(zone), нативный | | | |
| whiteMode как кнопка | whiteMode(zone1), собственный | | | whiteMode(zone), собственный | whiteMode(zone), собственный |
| nightMode как кнопка | | nightMode(zone), собственный | | nightMode(zone), собственный | nightMode(zone), собственный |
| яркость как значение (0-100%) | яркость(зона), исходная | | | яркость(зона), исходная | яркость(зона), исходная |
| цвет как 3 шестнадцатеричных значения | цвет(зона), собственный | | цвет(зона), собственный | цвет(зона), собственный | цвет(зона), собственный |
| rgb как комбинированное значение (#000000 - #FFFFFF) | rgb(зона), собственный | | rgb(зона), собственный | rgb(зона), собственный | rgb(зона), собственный |
| режим как значение | режим(зона), собственный | | | режим(зона), собственный | режим(зона), собственный |
| modeSpeedUp как кнопка | | modeSpeedUp(зона), собственный | | modeSpeedUp (зона), собственный | modeSpeedUp (зона), собственный |
| modeSpeedDown как кнопка | | modeSpeedDown (зона), собственный | | modeSpeedDown(зона), собственный | modeSpeedDown(зона), собственный |
| ссылка как кнопка | | | | ссылка(зона), нативная | ссылка(зона), нативная |
| отменить связь как кнопка | | | | отменить связь(зона), нативный | отменить связь(зона), нативный |
| насыщенность как значение (0-100%) | | | | | Насыщенность (зона), нативная |
| colorTemp как значение (0-100 соответствует 2700K - 6500K) | | | | | colorTemp (зона), собственный |
| brightup как кнопка | brightUp (зона), функция | brightUp (зона), собственный | brightUp (зона), собственный | brightUp (зона), функция | brightUp (зона), функция |
| brightDown как кнопка | brightDown (зона), функция | brightDown (зона), собственный | brightDown (зона), собственный | brightDown (зона), функция | brightDown (зона), функция |
| colorUp как кнопка | colorUp(зона), функция | | | colorUp(зона), функция | colorUp(зона), функция |
| цвет Вниз как кнопка | цвет Вниз(зона), функция | | цвет Вниз(зона), функция | цвет Вниз(зона), функция | |
| saturationUp как кнопка | | | | | saturationUp (зона), функция |
| saturationDown как кнопка | | | | | saturationDown (зона), функция |
| colorTempUp как кнопка | | colorTempUp (зона), нативная | | | colorTempUp (зона), функция |
| colorTempDown как кнопка | | colorTempDown (зона), нативный | | | colorTempDown (зона), функция |
| оттенок как значение (0-360) | | | | оттенок (зона), функция | оттенок (зона), функция |

## Состояния в версии 5/версии 4
| доступное состояние | RGB | Белый | RGBW |
|:---------------------------------------------:|:-----------------------:|:-----------------------:|:----------------------------------------:|
| ВКЛ/ВЫКЛ как переключатель | состояние (зона), функция | состояние (зона), функция | состояние (зона), функция |
| ВКЛ как кнопка | вкл(зона), нативный | вкл(зона), нативный | вкл(зона), нативный |
| ВЫКЛ как кнопка | выкл(зона), нативный | выкл(зона), нативный | выкл(зона), нативный |
| colorMode как логическое состояние | | | colorMode (0/hs=whiteMode, 1/ct=color(hue=55)) |
| maxWhite как кнопка | | maxBright(zone), нативный | |
| whiteMode как кнопка | | | whiteMode(зона), нативный |
| nightMode как кнопка | | | nightMode(zone), нативный |
| цвет как значение оттенка (0-255) | | | оттенок, собственный |
| rgb как комбинированное значение (#000000 - #FFFFFF) | | | rgb, собственный |
| colorTempUp как кнопка | | теплее, нативнее | |
| colorTempDown как кнопка | | охладитель, родной | |
| яркость как значение (0-100%) | | | яркость, исходная |
| яркость как значение (0-100%), расширенный диапазон | | | |
| effectModeNext как кнопка | | | effectModeNext, нативный |
| speedUp как кнопка | speedUp, нативный | | effectSpeedUp, нативный |
| speedDown как кнопка | speedDown, нативный | | effectSpeedDown, нативный |
| brightUp как кнопка | brightUp, нативный | brightUp, нативный | |
| brightDown как кнопка | brightDown, нативный | brightDown, нативный | |
| effectModeNext как кнопка | effectSpeedUp, нативный | | |
| effectModePrev как кнопка | effectSpeedDown, нативный | | |

effectSpeedUp/Down имеет разное значение (для rgb изменяет режим, для rgbw изменяет скорость)!

## Конфигурация:
на странице администратора адаптера версии 5 также для использования с лампами v4

## ДЕЛАТЬ:
* ??

## Известные проблемы:
* ??

## Changelog
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

Copyright (c) 2018 - 2020 foxthefox <foxthefox@wysiwis.net>