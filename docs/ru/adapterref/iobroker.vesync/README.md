---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vesync/README.md
title: ioBroker.vesync
hash: ZlLroBHFTTtHdQT7BwblSUW7per57Hsa4m1r/audHnM=
---
![Логотип](../../../en/adapterref/iobroker.vesync/admin/vesync.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.vesync.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vesync.svg)
![Количество установок](https://iobroker.live/badges/vesync-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vesync-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.vesync.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.vesync/workflows/Test%20and%20Release/badge.svg)

# ioBroker.vesync

## адаптер vesync для ioBroker

Адаптер для VeSync

# Логинаблауф

Используйте приложение «Почта» и пароль.

# Steuerung

Вы можете получить доступ через vesync.0.id.remote gesteuert werden

startCook Beispieles Fritten:

```
{
            "accountId": "000000",
            "cookTempDECP": 0,
            "hasPreheat": 1,
            "hasWarm": false,
            "imageUrl": "",
            "mode": "Fries",
            "readyStart": true,
            "recipeId": 18,
            "recipeName": "Fritten",
            "recipeType": 3,
            "startAct": {
                "appointingTime": 0,
                "cookSetTime": 240,
                "cookTemp": 75,
                "cookTempDECP": 0,
                "imageUrl": "",
                "level": 0,
                "preheatTemp": 75,
                "shakeTime": 120,
                "targetTemp": 0
            },
            "tempUnit": "c"
        }
```

AirFry

```
{
            "accountId": "000000",
            "cookTempDECP": 0,
            "hasPreheat": 0,
            "hasWarm": false,
            "imageUrl": "",
            "mode": "AirFry",
            "readyStart": true,
            "recipeId": 14,
            "recipeName": "Air Fry",
            "recipeType": 3,
            "startAct": {
                "appointingTime": 0,
                "cookSetTime": 600,
                "cookTemp": 180,
                "cookTempDECP": 0,
                "imageUrl": "",
                "level": 0,
                "preheatTemp": 0,
                "shakeTime": 0,
                "targetTemp": 0
            },

```

режим приготовления:

```
{
            "accountId": "8604100",
            "appointmentTs": 0,
            "cookSetTemp": 175,
            "cookSetTime": 15,
            "cookStatus": "cooking",
            "customRecipe": "Manuell",
            "mode": "custom",
            "readyStart": true,
            "recipeId": 1,
            "recipeType": 3,
            "tempUnit": "celsius"
        }
```

Останавливаться:

```
{
            "cookStatus": "end"
        }
```

## Discussion und Fragen

<https://forum.iobroker.net/topic/59466/test-adapter-vesync>

## Changelog
### 1.0.4 (2026-05-18)

- Add Cosori Oven support (CS130, CS125, CS100, AG500) with getOvenStatusV2, startStepCook, skipStep, setTempUnit
- Add Cosori Dual Blaze TwinFry multi-zone support (getAirfryerMultiStatus, startMultiCook, quitSyncFinish)
- Add Purifier pet mode (setPurifierMode: pet, turbo, pollen)

### 1.0.3 (2026-01-12)

- fix login
- add new devices

### 0.0.10 (2026-01-11)

- fix login

### 0.0.9 (2024-12-21)

- fix login

### 0.0.8 (2024-10-26)

- fix login

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022-2026 TA2k <tombox2020@gmail.com>

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