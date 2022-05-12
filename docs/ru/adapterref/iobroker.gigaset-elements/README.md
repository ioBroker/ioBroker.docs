---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gigaset-elements/README.md
title: ioBroker.gigaset-элементы
hash: dr6+nr1+Dowx9ZjTlJlvvhfyb8/EoxK62tPsvY6OueY=
---
![Логотип](../../../en/adapterref/iobroker.gigaset-elements/admin/gigaset-elements.png)

![узел](https://img.shields.io/node/v-lts/iobroker.gigaset-elements)
![версия NPM](https://img.shields.io/npm/v/iobroker.gigaset-elements.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gigaset-elements.svg)
![лицензия](https://img.shields.io/npm/l/iobroker.gigaset-elements)
![Количество установок](https://iobroker.live/badges/gigaset-elements-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/gigaset-elements-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.gigaset-elements.png?downloads=true)

# IoBroker.gigaset-элементы
Адаптер для Gigaset Elements (https://gigaset.com/smart-home)

![Тестируйте и выпускайте](https://github.com/matthsc/ioBroker.gigaset-elements/workflows/Test%20and%20Release/badge.svg)

## Требования
- NodeJS >= 12.x
- ioBroker >= 3.x, с администратором >= 5.x
- Система Gigaset Elements

## Установка
Пока адаптер не является частью последнего или стабильного репозитория, вы можете установить последнюю версию, включив экспертный режим в ioBroker, и установить адаптер из npm или github.

После установки создайте новый экземпляр и настройте параметры:

- Настройки подключения для доступа к облаку Gigaset Elements
    -   Эл. адрес
    -   пароль
    - интервал аутентификации, должен быть 6 (часов)
- Интервалы опроса для разных областей
    - события (например, открытие/наклон/закрытие окна/двери) - количество секунд между опросами
    - данные элемента/датчика (например, температура, влажность) - количество минут между опросами

## Ограничения
Адаптер в настоящее время только читает данные и не позволяет ничего изменить.

### Поддерживаемые элементы
На данный момент адаптер был протестирован/работает со следующими элементами, а тестовые данные доступны через [Gigaset-элементы-API](https://github.com/matthsc/gigaset-elements-api):

| Тип элемента | Имя элемента | Протестировано |
| ------------ | --------------------- | --------- |
| is01 | Сирена | математика |
| мм01 | Универсальный/Оконный/Дверной | математика |
| wd01 | Вода | математика |

Адаптер также поддерживает следующие другие устройства:

| Тип устройства | Понятное имя | Типы событий |
| ----------- | ------------- | ----------- |
| gp02 | Телефон | gp.call |

Если у вас есть другие элементы или вы сталкиваетесь с типами событий, которые еще не обрабатываются адаптером, вы можете включить экспертный режим в ioBroker, перейти на вкладку _Отладка_ в настройках адаптера (видима только в экспертном режиме) и использовать «Отладка — Подготовка». тестовые данные», чтобы сгенерировать тестовые данные, которые можно отправить как часть проблемы github для этого адаптера, чтобы включить дополнительные элементы/типы событий. Персональные данные, такие как имена и идентификаторы базовых станций или элементов, удаляются из сгенерированных данных, насколько это возможно.

## Сообщения
Пока адаптер поддерживает только сообщения, используемые для тестирования/отладки.

### Тестирование
Ответы обратного вызова: <code>{ response: &quot;&lt;message&gt;&quot; }</code> , если действие было выполнено успешно, или <code>{ error: &quot;&lt;error message&gt;&quot; }</code> , если что-то пошло не так.

#### Пинг
Отправьте ping адаптеру и получите <code>{ response: &quot;pong&quot; }</code> .

```ts
sendTo("gigaset-elements.0", "test", "ping", callback);
```

#### Обработка тестовых данных
Обработка тестовых данных из [Gigaset-элементы-API](https://github.com/matthsc/gigaset-elements-api). Создает базовые станции, элементы и обрабатывает захваченные тестовые события.

```ts
sendTo("gigaset-elements.0", "test", "process-test-data", callback);
```

### Отладка
Ответами обратного вызова являются либо <code>{ response: object }</code> , если действие было выполнено успешно, либо <code>{ error: &quot;&lt;error message&gt;&quot; }</code> в случае, если что-то пошло не так.

#### Подготовка тестовых данных
Загрузите текущие данные из Gigaset Elements API и подготовьте их для интеграции в качестве тестовых данных в [Gigaset-элементы-API](https://github.com/matthsc/gigaset-elements-api), т. е. для новых событий или элементов, для которых еще нет тестовых данных.

Загружает базовые станции, элементы и события из API, сокращает их, чтобы свести к минимуму объем данных, и пытается удалить личную информацию, такую как имена и идентификаторы, из данных.

Возвращает данные в виде объекта <code>{ response: { bs: [], elements: [], events: [] } }</code> .

```ts
sendTo("gigaset-elements.0", "debug", { action: "prepare-test-data" from?: Date }, callback);
```

#### Загрузить данные базовой станции и элемента
Загружает и возвращает исходные данные базовой станции и элементов в виде объекта <code>{ response: { bs: [], elements: []} }</code> .

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
### 0.2.0 (2022-04-30)

-   (matthsc) add support for phones
-   (matthsc) add Node 18 to test matrix
-   (matthsc) dependency updates

### 0.1.3 (2022-03-22)

-   (matthsc) fix "unknown" element position state
-   (matthsc) add more tests
-   (matthsc) dependency updates

### 0.1.2 (2022-02-28)

-   (matthsc) fix test data generation
-   (matthsc) dependency updates

### 0.1.1 (2022-02-12)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2022-01-29)

-   (matthsc) initial release

## License

MIT License

Copyright (c) 2022 matthsc <matthsc@gmx.net>

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