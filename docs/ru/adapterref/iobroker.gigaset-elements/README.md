---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gigaset-elements/README.md
title: ioBroker.gigaset-elements
hash: 1oyVwCTbRtET9A4NHBQpmOTqee1TGRRmfusOyCqqJ6Y=
---
![Логотип](../../../en/adapterref/iobroker.gigaset-elements/admin/gigaset-elements.png)

![узел](https://img.shields.io/node/v-lts/iobroker.gigaset-elements)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.gigaset-elements.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gigaset-elements.svg)
![лицензия](https://img.shields.io/npm/l/iobroker.gigaset-elements)
![Количество установок](https://iobroker.live/badges/gigaset-elements-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/gigaset-elements-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.gigaset-elements.png?downloads=true)

# IoBroker.gigaset-elements
Адаптер для Gigaset Elements (https://gigaset.com/smart-home)

![Тестирование и выпуск](https://github.com/matthsc/ioBroker.gigaset-elements/workflows/Test%20and%20Release/badge.svg)

## Требования
- NodeJS >= 18.x
- ioBroker >= 4.x, с администратором >= 5.x
- Система Gigaset Elements

## Монтаж
Вы можете установить адаптер из стабильного или последнего/тестового репозитория (включив экспертный режим в ioBroker и установив адаптер из npm). Не устанавливайте его напрямую с Github, это приведет к ошибке при запуске адаптера («невозможно найти стартовый файл»).

После установки создайте новый экземпляр и настройте параметры:

- Настройки подключения для доступа к облаку Gigaset Elements
    -   электронная почта
    -   пароль
    - интервал аутентификации в часах, должен быть 6
- Интервалы опроса для разных областей
    - события (т.е. открытие/наклон/закрытие окна/двери) - количество секунд между опросами
    - данные элемента/датчика (т.е. температура, влажность) - количество минут между опросами
    - данные о состоянии системы (зеленый/оранжевый/красный) - количество минут между опросами

### Поддерживаемые элементы
На данный момент адаптер протестирован/известно, что он работает со следующими элементами, а тестовые данные доступны через [Gigaset-elements-API](https://github.com/matthsc/gigaset-elements-api):

| Тип элемента | Имя элемента | Протестировано |
| ------------ | ----------------------- | --------------------------------------------------------------------- |
| is01 | Сирена | математика |
| um01 | Универсальный/Окно/Дверь | математика |
| wd01 | Вода | математика |
| сд01 | Дым (только тестовая сигнализация) | Домашнее управление |
| сп01 | Вилка | matthsc (аппаратное обеспечение, спонсируемое [Voggl93](https://github.com/Voggl93)) |

Адаптер также поддерживает следующие другие устройства:

| Тип устройства | Дружественное имя | Типы событий |
| ----------- | ------------- | ----------- |
| gp02 | Телефон | gp.call |

### Предоставьте тестовые данные для неподдерживаемых элементов.
Если у вас есть другие элементы или вы столкнулись с типами событий, которые еще не обрабатываются адаптером, вы можете включить экспертный режим в ioBroker, перейти на вкладку _Debug_ в настройках адаптера (видна только в экспертном режиме) и использовать «Отладка — Подготовка». тестовые данные» для создания тестовых данных, которые можно отправить как часть задачи GitHub для этого адаптера, чтобы включить дополнительные элементы/типы событий. Персональные данные, такие как имена и идентификаторы базовой станции или элементов, удаляются из сгенерированных данных, насколько это возможно.

## Сообщения
Пока что адаптер поддерживает только сообщения, используемые для тестирования/отладки.

### Тестирование
Ответами обратного вызова являются либо <code>{ response: &quot;&lt;message&gt;&quot; }</code> если действие было успешным, либо <code>{ error: &quot;&lt;error message&gt;&quot; }</code> , если что-то пошло не так.

#### Пинг
Отправьте пинг адаптеру и получите <code>{ response: &quot;pong&quot; }</code> .

```ts
sendTo("gigaset-elements.0", "test", "ping", callback);
```

#### Обработка тестовых данных
Обработка тестовых данных из [Gigaset-elements-API](https://github.com/matthsc/gigaset-elements-api). Создает базовые станции, элементы и обрабатывает записанные тестовые события.

```ts
sendTo("gigaset-elements.0", "test", "process-test-data", callback);
```

### Отладка
Ответами обратного вызова являются либо <code>{ response: object }</code> если действие было успешным, либо <code>{ error: &quot;&lt;error message&gt;&quot; }</code> если что-то пошло не так.

#### Подготовьте тестовые данные
Загрузите текущие данные из API Gigaset Elements и подготовьте их для интеграции в качестве тестовых данных в [Gigaset-elements-API](https://github.com/matthsc/gigaset-elements-api), т. е. для новых событий или элементов, для которых еще нет тестовых данных.

Загружает базовые станции, элементы и события из API, уменьшает их, чтобы минимизировать объем данных, и пытается удалить из данных личную информацию, такую как имена и идентификаторы.

Возвращает данные в виде объекта <code>{ response: { bs: [], elements: [], events: [] } }</code> .

```ts
sendTo("gigaset-elements.0", "debug", { action: "prepare-test-data" from?: Date }, callback);
```

#### Загрузка данных базовой станции и элемента
Загружает и возвращает необработанные данные базовой станции и элементов в виде объекта <code>{ response: { bs: [], elements: []} }</code> .

```ts
sendTo("gigaset-elements.0", "test", { action: "load-bases-elements" }, callback);
```

#### Загрузка событий
Загружает события и возвращает объект <code>{ response: { events: [] } }</code> .

Данные о событиях обычно доступны за 1 месяц, более старые данные, похоже, недоступны.

```ts
sendTo("gigaset-elements.0", "test", { action: "load-events", from: Date, to: Date }, callback);
```

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.3 (2023-11-21)

-   (matthsc) bugfix

### 0.4.2 (2023-11-20)

-   (matthsc) downgrade typescript to fix integration tests

### 0.4.1 (2023-11-20)

-   (matthsc) add states for batterySaverMode, momentaryPowerMeasurement (plug), setPoint (thermostat)
-   (matthsc) allow to change setPoint for thermostat (experimental/untested)
-   (matthsc) allow to change intrusion mode
-   (matthsc) allow to trigger user alarm
-   (matthsc) add info.systemHealth state
-   (matthsc/dependabot) dependency updates

### 0.4.0 (2023-10-15)

-   (matthsc) add support for plugs
-   (matthsc) drop support for Node 14 and 16
-   (matthsc/dependabot) dependency updates

### 0.3.0 (2022-09-28)

-   (matthsc) drop support for Node 12 and js-controller 3
-   (matthsc) implement migrations from create-adapter
-   (matthsc/dependabot) dependency updates

### 0.2.2 (2022-09-17)

-   (matthsc) fix probably_open state
-   (matthsc/dependabot) dependency updates

### 0.2.1 (2022-07-02)

-   (matthsc) add initial support for smoke detectors
-   (matthsc/dependabot) dependency updates

### 0.2.0 (2022-04-30)

-   (matthsc) add support for phones
-   (matthsc) add Node 18 to test matrix
-   (matthsc/dependabot) dependency updates

### 0.1.3 (2022-03-22)

-   (matthsc) fix "unknown" element position state
-   (matthsc) add more tests
-   (matthsc/dependabot) dependency updates

### 0.1.2 (2022-02-28)

-   (matthsc) fix test data generation
-   (matthsc/dependabot) dependency updates

### 0.1.1 (2022-02-12)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2022-01-29)

-   (matthsc) initial release

## License

MIT License

Copyright (c) 2023 matthsc <matthsc@gmx.net>

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
