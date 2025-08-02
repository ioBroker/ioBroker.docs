---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.dreame/README.md
title: ioBroker.мечта
hash: m3Z73x1GlLvBtpVNeaPYWbjy5ChBc34At6Z39b6bxzQ=
---
![Логотип](../../../en/adapterref/iobroker.dreame/admin/dreame.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.dreame.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.dreame.svg)
![Количество установок](https://iobroker.live/badges/dreame-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/dreame-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.dreame.png?downloads=true)

# IoBroker.мечта
**Тесты:** ![Тест и выпуск](https://github.com/TA2k/ioBroker.dreame/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Адаптер Dreame для ioBroker
Адаптер для устройств Dreame Home протестирован с L10 L20 и x40

#### DeviceId.статус
Текущее состояние устройств

#### DeviceId.удаленный
Удаленное управление устройствами Начало: dreame.0.xxxxx.remote.start-sweep Остановка: dreame.0.xxxxx.remote.start-charge

Ярлык запуска:

dreame.0.XXXXXXXXX.удаленный.запуск-очистка

```
[
                {
                    "piid": 1,
                    "value": 25
                },
                {
                    "piid": 10,
                    "value": "32"
                }
]
```

"value": "32" -> Идентификатор ярлыка

Список сочетаний клавиш:

мечта.0.XXXXX.статус.4-48

Имена закодированы в base64. Если нет состояния 4-48, вам придется использовать сокращенный вариант.

### Уборка комнат
dreame.0.XXXX.удаленный.запуск-очистка

```
 [
                {
                    "piid": 1,
                    "value": 18
                },
                {
                    "piid": 10,
                    "value": "{\"selects\":[[X,1,3,2,1]]}"
                }
            ]
```

X = идентификатор комнаты

Несколько комнат:

```
 [
                {
                    "piid": 1,
                    "value": 18
                },
                {
                    "piid": 10,
                    "value": "{\"selects\":[[X,1,3,2,1],[Y,1,3,2,1]]}"
                }
            ]
```

X = комната 1 Y = комната 2

Карта смены мечты.XXXXXXX.remote.update-map

```
 [
                {
                    "piid": 4,
                    "value": "{\"sm\":{},\"mapid\":X}"
                }
            ]
```

X = mapId dreame.0.XXXX.status.6-99 или dreame.0.XXXX.map.curid

### Управление режимами очистки
Включить CleanGenius: dreame.0.XXXXXX.remote.customCommand

```
[
  {
    "value": "{\"k\":\"SmartHost\",\"v\":1}",
    "siid": 4,
    "piid": 50
  }
]
```

Отключить CleanGenius:

```
[
  {
    "value": "{\"k\":\"SmartHost\",\"v\":0}",
    "siid": 4,
    "piid": 50
  }
]
```

CleanGenius Глубокая очистка: \"v\":2

Режим CleanGenius: значение: 3 или значение 2

```
[
            {

                "value": 2,
                "siid": 28,
                "piid": 5
            }
        ]

```

Изменить режим очистки:

```
[
{

                "value": 5122,
                "siid": 4,
                "piid": 23
            }
        ]
```

Значения: 5120, 5121, 5122...

Режим вакуума:

```
[
{

                "value": 2,
                "siid": 4,
                "piid": 4
            }
        ]

```

Интенсивность мытья:

```
[
            {

                "value": 28,
                "siid": 28,
                "piid": 1
            }
        ]
```

Маршрут:

```
 [
            {

                "value": "{\"k\":\"CleanRoute\",\"v\":1}",
                "siid": 4,
                "piid": 50
            }
        ]
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.2 (2025-01-24)

- reduce cpu load while cleaning

### 0.2.1 (2025-01-15)

- fix for canvas installation

### 0.2.0 (2024-12-28)

- add simple maps

### 0.1.0 (2024-12-14)

- bugfixes

### 0.1.0 (2024-12-14)

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

````

```

```
````