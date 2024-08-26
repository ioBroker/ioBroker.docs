---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: DYyTobJiWFCFHEUKBVPRm8iV5QBcZWMfhs3JkLncA9I=
---
![Логотип](../../../en/adapterref/iobroker.innoxel/admin/innoxel.png)

![узел](https://img.shields.io/node/v-lts/iobroker.innoxel)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.innoxel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.innoxel.svg)
![лицензия](https://img.shields.io/npm/l/iobroker.innoxel)
![Количество установок](https://iobroker.live/badges/innoxel-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/innoxel-stable.svg)
![Статус зависимости](https://img.shields.io/david/matthsc/iobroker.innoxel.svg)
![НПМ](https://nodei.co/npm/iobroker.innoxel.png?downloads=true)

# IoBroker.innoxel
Адаптер для Innoxel Master 3 (https://innoxel.ch)

![Тестирование и выпуск](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

## Требования
- NodeJS >= 18.x
- ioBroker >= 4.x, с администратором >= 5.x
- Система «Умный дом Innoxel Master 3»

## Монтаж
Пока адаптер не является частью стабильного репозитория, вы можете установить последнюю версию, включив экспертный режим в ioBroker, и установить адаптер из npm. Не устанавливайте его напрямую с Github, это приведет к ошибке при запуске адаптера («невозможно найти стартовый файл»).

После установки создайте новый экземпляр и настройте параметры:

- Настройки подключения для доступа к мастеру innoxel
    -   айпи адрес
    - порт
    -   имя пользователя
    -   пароль
- Интервалы опроса для разных областей
    - изменения состояния (т.е. переключатели, диммер)
    - комнатный климат/термостаты
    -   погода
    - сведения о главном устройстве innoxel (требуются права администратора для пользователя, подключающегося к мастеру innoxel)

## Поддерживаемые модули и прошивки
Предварительная версия этого адаптера работает уже более 2 лет с прошивкой 1.4.1.0, а затем 1.5.1.0.

Эта первоначально выпущенная версия была протестирована с прошивкой 1.6.0.0.

Следующие модули были протестированы/поддерживаются:

- Инноксель Мастер 3
- Переключатель 8 G1
- Двигатель 4 x 230 В переменного тока G1
- Размер 4 x 600 ВА
- Дегустатор RGB
- Термо
- Станция влажной уборки P03/3-RS485-CET

Если у вас работает с другими модулями или у вас есть другие модули, которые не работают, пожалуйста, смело открывайте проблему.

## Сообщения
Адаптер поддерживает сообщения, описанные в следующих разделах.

### ТриггерВМодуле
Имитируйте нажатие кнопки на «Дегустаторе».

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
    // do something after the button press has been executed
});
```

- <code>moduleId</code> — идентификатор/адрес «Дегустатора»
<code>channelId</code> - индекс кнопки на &quot;Дегустаторе&quot;
- <code>callback</code> (необязательно) функция обратного вызова для вызова при выполнении действия

### SetDimValue
Имитируйте нажатие кнопки на «Дегустаторе».

```ts
sendTo("innoxel.0", "setDimValue", "<moduleId>:<channelId>:<dimValue>:<dimSpeed>", callback);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
    // do something after value has been set
});
```

- <code>moduleId</code> — идентификатор/адрес модуля диммера.
<code>channelId</code> - канал диммера на модуле
- <code>dimValue</code> — устанавливаемое значение в процентах (0–100).
- <code>dimSpeed</code> (необязательно) — используемая скорость затемнения (0–15).
- <code>callback</code> (необязательно) функция обратного вызова для вызова при выполнении действия

### Установка температуры
Установите температуру нагрева или охлаждения.

```ts
sendTo("innoxel.0", "setTemperature", "<moduleId>:<temperatureType>:<temperature>", callback);

// i.e. to set setTemperatureHeating to 20° on room climate module 0
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20");
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20", () => {
    // do something after the button press has been executed
});
```

- <code>moduleId</code> — это идентификатор/адрес модуля климата в помещении.
<code>temperatureType</code> — тип температуры, который необходимо установить (absenceSetbackTemperatureCooling, отсутсвиеSetbackTemperatureHeating, nightSetbackTemperatureCooling, nightSetbackTemperatureHeating, setTemperatureCooling, setTemperatureHeating, )
- устанавливаемая <code>temperature</code> с шагом 0,5°. Также есть минимальное/максимальное значение в зависимости от типа.
- <code>callback</code> (необязательно) функция обратного вызова для вызова при выполнении действия

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.1 (2024-03-23)

-   (matthsc) log soap messages in log level silly
-   (matthsc) fix another potential error when updating modules
-   (matthsc & dependabot) dependency updates

### 0.4.0 (2024-03-20)

-   (matthsc) fix potential error when processing identities
-   (matthsc) drop support for Node 16

### 0.3.1 (2023-05-23)

-   (matthsc) change actual value from temperature sensor if it doesn't provide values
-   (matthsc & dependabot) dependency updates

### 0.3.0 (2023-04-22)

-   (matthsc) allow to set heating/cooling temperatures
-   (matthsc & dependabot) dependency updates

### 0.2.0 (2022-09-28)

-   (matthsc) drop support for Node 12 and js-controller 3
-   (matthsc) implement migrations from create-adapter
-   (matthsc & dependabot) dependency updates

### 0.1.5 (2022-02-12)

-   (matthsc) don't always terminate adapter on errors while updating identities
-   (matthsc) improve error messages

### 0.1.4 (2022-01-25)

-   (matthsc) fix double decryption issues with password in adapter admin
-   (matthsc) change input field types in adapter admin

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

Copyright (c) 2024 matthsc <matthsc@gmx.net>

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
