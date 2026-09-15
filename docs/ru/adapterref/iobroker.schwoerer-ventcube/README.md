---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.schwoerer-ventcube/README.md
title: ioBroker.schwoerer-ventcube
hash: a9C+euhKNMUF8sRykOutusRyN5xlkmiyDvGcrezyQ3w=
---
![Логотип](../../../en/adapterref/iobroker.schwoerer-ventcube/admin/schwoerer-ventcube.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.schwoerer-ventcube.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.schwoerer-ventcube.svg)
![Количество установок (последние)](http://iobroker.live/badges/schwoerer-ventcube-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/schwoerer-ventcube-stable.svg)
![Языковая оценка: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Excodibur/ioBroker.schwoerer-ventcube.svg?logo=lgtm&logoWidth=18)
![статус релиза на GitHub](https://github.com/Excodibur/iobroker.schwoerer-ventcube/workflows/Build%2C%20Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/schwoerer-ventcube/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.schwoerer-ventcube.png?downloads=true)

# ioBroker.schwoerer-ventcube

## Адаптер schwoerer-ventcube для ioBroker

Адаптер для системы Schwoererhaus Ventcube. Более подробную информацию о Ventcube Fresh можно найти [здесь](https://www.bauinfocenter.de/lueftung/lueftungsanlagen/) .

**Предупреждение** : Данный адаптер не разработан и не поддерживается официально компанией [Schwoererhaus KG](https://www.schwoererhaus.de/) , которая является дистрибьютором системы Ventcube. Следуйте инструкциям внимательно и на свой страх и риск.

### Предварительные условия

Для доступа к сетевому интерфейсу Ventcube необходимо выполнить следующие (известные) предварительные условия:

- Устройство Ventcube необходимо подключить к вашей внутренней сети (обычно через сетевой кабель).
- Для работы интерфейса Modbus TCP необходима поддержка (панель управления: >= V1.05, VentCube: >= V02.11), и зачастую его приходится сначала включать вручную.
  - В панели управления войдите в раздел «Службы» (используйте стандартный пароль из документации).
  - В разделе «Основные настройки» убедитесь, что сетевое соединение установлено и что «9. Сетевой интерфейс» и «10. Modbus TCP» активны.
  - Если последние две настройки не активны, активируйте их и перезапустите Ventcube (например, временно отключив питание).

### Параметры конфигурации

В зависимости от настроек Ventcube, специфичных для конкретного здания, не все параметры, которые можно получить или изменить через интерфейс Ventcube, будут использоваться. Каждый параметр в папке "parameters" отображается рядом с записью в папке "lastUpdate", указывающей метку времени последнего получения данных для каждого параметра.

Все параметры, упомянутые в приведенной ниже спецификации, были добавлены в адаптер и доступны через опцию _**«Расширенные функции»**_ , которая настраивается во время развертывания адаптера. Включение этой опции приведет к тому, что адаптер будет периодически получать данные по более чем 100 параметрам, большинство из которых могут не использоваться в обычных домохозяйствах. Область тестирования была ограничена _**базовыми функциями**_ (включены по умолчанию).

Для корректного подключения адаптера к Ventcube, вероятно, потребуется изменить следующие значения по умолчанию в процессе его развертывания:

| Параметр                              | Значение по умолчанию | Объяснение                                                                                                                                                                                                                                                         |
| ------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Server`                              | HERMES-LT             | Обычно Ventcube регистрируется в сети с помощью _HERMES-LT_ , но если это не работает, попробуйте использовать IP-адрес.                                                                                                                                           |
| `Port`                                | 502                   |                                                                                                                                                                                                                                                                    |
| `Interval`                            | 30                    | Через сколько секунд метрики должны обновляться на сервере?                                                                                                                                                                                                        |
| `Request Timeout`                     | 5000                  | Сколько миллисекунд нужно подождать, пока запросы к Ventcube не истекут по времени?                                                                                                                                                                                |
| `Reconnection Attempts`               | 10                    | В случае потери соединения с Ventcube, сколько раз следует предпринять попытку повторного подключения?                                                                                                                                                             |
| `Delay between reconnection attempts` | 10000                 | Сколько времени нужно подождать между попытками переподключения (в миллисекундах)?                                                                                                                                                                                 |
| `Advanced Functions`                  | ✓                     | Если Ventcube используется только для вентиляции, базовых функций может быть достаточно, но для обеспечения работы функций обогрева/охлаждения или получения системных показателей (коды ошибок, сведения о вентиляторе) следует активировать расширенные функции. |

#### Интересные функции (для начала).

- _**Betriebsart**_ , changeable
- _**Взрыв в воздухе**_ (30-минутный воздушный взрыв 4-го уровня), изменяемый
- _**Ist Temp Raum 1**_ (температура внутри дома)
- _**T10 Внешняя температура**_

### Система отсчета

Адаптер ioBroker был успешно протестирован со следующими компонентами:

| Панель управления | Венткуб | Спецификация Modbus                                                                                                                     |
| ----------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| V01.10            | V02.26  | [Parameterliste\_Modbus\_TCP\_03.2020](https://schwoerer-service.com/storage/files/Community/2020/Parameterliste_Modbus_TCP_032020.pdf) |

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

See [Changelog](https://github.com/Excodibur/ioBroker.schwoerer-ventcube/blob/master/CHANGELOG.md) for a list of all changes.

<!--
	Placeholder for the next version (add instead of version-number-headline below):
	## __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.

### 1.4.2 (2021-08-08)
* Removed test configuration from default adapter values

### 1.4.1 (2021-06-05)
* Corrected Modbus address for ***T6*** measurement (Issue #60)[https://github.com/Excodibur/ioBroker.schwoerer-ventcube/issues/60], (PR #61)[https://github.com/Excodibur/ioBroker.schwoerer-ventcube/pull/61]
* Added scheduling priority ***Tier 2*** (introduced with JS-Controller 3.3.0)
* (Development) added tests for Node.js 16 Support

### 1.4.0 (2021-04-30)
* Added Admin 5 support

### 1.3.0 (2020-09-23)
* Added new parameter ***request timeout***
* Added info channel to inform about adapter status
* Redefined state roles to describe available data better
* Improvements to Adapter termination process


### 1.2.0 (2020-09-15)
* Added missing reconnect behaviour in case Ventcube is not reachable
* Added connection settings for new reconnect-behaviour
* Reworked layout ouf settings page
* (Development) Fixed mock-server connection handling and Windows integration tests
* (Development) Moved integration tests (windows, Linux, OSX) from Travis to Github Actions

## License
MIT License

Copyright (c) 2020-2026 Excodibur

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