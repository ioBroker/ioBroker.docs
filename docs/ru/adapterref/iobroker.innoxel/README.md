---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: zylei5wGtI1BkOrVUAkm/O7G4yKwgTd+32tp5Z2XmEk=
---
![Логотип](../../../en/adapterref/iobroker.innoxel/admin/innoxel.png)

![узел](https://img.shields.io/node/v-lts/iobroker.innoxel)
![версия NPM](https://img.shields.io/npm/v/iobroker.innoxel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.innoxel.svg)
![лицензия](https://img.shields.io/npm/l/iobroker.innoxel)
![Количество установок](https://iobroker.live/badges/innoxel-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/innoxel-stable.svg)
![Статус зависимости](https://img.shields.io/david/matthsc/iobroker.innoxel.svg)
![НПМ](https://nodei.co/npm/iobroker.innoxel.png?downloads=true)

# IoBroker.innoxel
Адаптер для Innoxel Master 3 (https://innoxel.ch)

![Тестируйте и выпускайте](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

## Требования
- NodeJS >= 12.x
- ioBroker >= 3.x, с администратором >= 5.x
- Система «Умный дом» Innoxel Master 3

## Установка
Пока адаптер не является частью последнего или стабильного репозитория, вы можете установить последнюю версию, включив экспертный режим в ioBroker, и установить адаптер из npm или github.

После установки создайте новый экземпляр и настройте параметры:

- Настройки подключения для доступа к innoxel master
    -   айпи адрес
    - порт
    -   имя пользователя
    -   пароль
- Интервалы опроса для разных областей
    - изменения состояния (например, переключатели, диммер)
    - комнатный климат/термостаты
    -   Погода
    - сведения об основном устройстве innoxel

## Поддерживаемые модули и прошивки
Предрелизная версия этого адаптера работает более 2 лет с прошивкой 1.4.1.0, а затем 1.5.1.0.

Эта первоначально выпущенная версия была протестирована с прошивкой 1.6.0.0.

Были протестированы/поддерживаются следующие модули:

- Иноксель Мастер 3
- Переключатель 8 G1
- Двигатель 4 x 230 В переменного тока G1
- Дим. 4 x 600 ВА
- Дегустатор RGB
- Термо
- Веттерстанция P03/3-RS485-CET

Если это работает для вас с другими модулями или у вас есть другие модули, которые не работают, пожалуйста, не стесняйтесь открывать проблему.

## Сообщения
Адаптер поддерживает сообщения, описанные в следующих разделах.

### ТриггерВМодуле
Имитация нажатия кнопки на "Дегустаторе".

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
    // do something after the button press has been executed
});
```

- <code>moduleId</code> - это id/адрес &quot;дегустатора&quot;
- <code>channelId</code> - это индекс кнопки на &quot;Дегустаторе&quot;
- <code>callback</code> (необязательно) функция обратного вызова для вызова, когда действие было выполнено

### SetDimValue
Имитация нажатия кнопки на "Дегустаторе".

```ts
sendTo("innoxel.0", "setDimValue", "<moduleId>:<channelId>:<dimValue>:<dimSpeed>", callback);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
    // do something after value has been set
});
```

- <code>moduleId</code> - это идентификатор/адрес модуля диммера.
- <code>channelId</code> - канал диммера на модуле
- <code>dimValue</code> - значение в процентах для установки (0-100)
- <code>dimSpeed</code> (опционально) - используемая скорость затемнения (0-15)
- <code>callback</code> (необязательно) функция обратного вызова для вызова, когда действие было выполнено

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.3 (2022-01-16)

-   (matthsc) improve error messages

### 0.1.2 (2022-01-07)

-   (matthsc) catch authentication errors
-   (matthsc) fix authentication
-   (matthsc) remove build folders from git

### 0.1.1 (2022-01-01)

-   (matthsc) implement adapter review feedback

### 0.1.0 (2021-12-30)

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