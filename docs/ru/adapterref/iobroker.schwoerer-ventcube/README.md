---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schwoerer-ventcube/README.md
title: ioBroker.schwoerer-ventcube
hash: R21i7JZQEDmG0ZtnGRGE6OViAK5St/HwwIGOPIZRX0M=
---
![Логотип](../../../en/adapterref/iobroker.schwoerer-ventcube/admin/schwoerer-ventcube.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.schwoerer-ventcube.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.schwoerer-ventcube.svg)
![Статус зависимости](https://img.shields.io/david/Excodibur/iobroker.schwoerer-ventcube.svg)
![Количество установок (последнее)](http://iobroker.live/badges/schwoerer-ventcube-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/schwoerer-ventcube-stable.svg)
![Уровень языка: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.schwoerer-ventcube.svg?logo=lgtm&logoWidth=18)
![НПМ](https://nodei.co/npm/iobroker.schwoerer-ventcube.png?downloads=true)

# IoBroker.schwoerer-ventcube
![Статус выпуска Github](https://github.com/Excodibur/iobroker.schwoerer-ventcube/workflows/Build%2C%20Test%20and%20Release/badge.svg)

[![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/schwoerer-ventcube/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Переходник schwoerer-ventcube для ioBroker
Адаптер для системы Schwoererhaus Ventcube. Более подробную информацию о Ventcube Fresh можно найти в [здесь](https://www.bauinfocenter.de/lueftung/lueftungsanlagen/).

** Заявление об ограничении ответственности **: этот адаптер не разработан и официально не поддерживается компанией [Schwoererhaus KG](https://www.schwoererhaus.de/), распространяющей систему Ventcube. Инструкции следует выполнять осторожно и на свой страх и риск.

### Предварительные условия
Для доступа к сетевому интерфейсу Ventcube должны быть выполнены следующие (известные) предварительные условия:

- Ventcube должен быть подключен к вашей внутренней сети (обычно через сетевой кабель).
- Интерфейс Modbus TCP должен поддерживаться (Панель управления:> = V1.05, VentCube:> = V02.11), и часто его нужно сначала включить вручную
    * В Панели управления войдите в раздел «Сервис» (используйте стандартный пароль из документов)
* В основных настройках убедитесь, что сетевое соединение установлено и что «9. Сетевой интерфейс» и «10. Modbus TCP» активны.
* Если две последние настройки не активны, активируйте их и перезапустите Ventcube (например, временно отключив питание).

### Параметры конфигурации
В зависимости от настроек Ventcube для конкретного здания не все параметры, которые можно получить или изменить через интерфейс Ventcube, будут использоваться. Каждый параметр в папке «параметры» идет рядом с записью в папке «lastUpdate», которая указывает метку времени последней выборки для каждого параметра.

Все параметры, упомянутые в указанной ниже спецификации, были добавлены к адаптеру, и к ним можно получить доступ с помощью параметра ***Advanced Functions*** , который можно настроить во время развертывания адаптера. Включение этой опции приведет к тому, что адаптер будет периодически извлекать данные для более чем 100 параметров, большинство из которых может не использоваться в обычных домашних хозяйствах. Объем теста был ограничен ***Базовыми функциями*** (по умолчанию включен).

Следующие значения конфигурации по умолчанию, вероятно, потребуется изменить во время развертывания адаптера для правильного подключения к Ventcube:

| Параметр | Значение по умолчанию | Объяснение |
| `Server` | HERMES-LT | Обычно Ventcube регистрируется в сети с помощью _HERMES-LT_, но если это не работает, попробуйте использовать IP-адрес. |
| `Port` | 502 | |
| `Interval` | 30 | Через сколько секунд должны обновляться метрики с сервера |
| `Request Timeout` | 5000 | Сколько миллисекунд ждать до истечения времени ожидания запросов к Ventcube |
| `Reconnection Attempts` | 10 | Если соединение с Ventcube потеряно, сколько раз следует пытаться восстановить соединение |
| `Delay between reconnection attempts` | 10000 | Как долго ждать между попытками повторного подключения (в миллисекундах) |
| `Advanced Functions` | & # 10003; | Хотя базовых функций может быть достаточно, если Ventcube используется только для вентиляции воздуха, расширенные функции следует активировать, если требуются функции нагрева / охлаждения или системные показатели (коды ошибок, сведения о вентиляторах). |
| `Расширенные функции` | & # 10003; | Хотя базовых функций может быть достаточно, если Ventcube используется только для вентиляции воздуха, расширенные функции следует активировать, если требуются функции нагрева / охлаждения или системные показатели (коды ошибок, сведения о вентиляторах). |

#### Интересные функции (для начала)
- ***Betriebsart*** , изменяемый
- ***Stoßlüftung*** (30-минутная воздушная волна 4-го уровня), изменяемая
- ***Ist Temp Raum 1*** (температура в помещении)
- ***T10 Außentemperatur***

### Система отсчета
Адаптер ioBroker был успешно протестирован с:

| Панель управления | Ventcube | Спецификация Modbus |
|---------------|----------|-----------------------------------|
| V01.10 | V02.26 | [Parameterliste_Modbus_TCP_03.2020](https://schwoerer-service.com/storage/files/Community/2020/Parameterliste_Modbus_TCP_032020.pdf) |

## Changelog
See [Changelog](https://github.com/Excodibur/ioBroker.schwoerer-ventcube/blob/master/CHANGELOG.md).

## License
MIT License

Copyright (c) 2020-2021 Excodibur

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