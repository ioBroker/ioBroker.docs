---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: TqfTBZ14ipWOHZEM5vYMcTxv//UOU3mtRfvsOq3kFj8=
---
![Логотип](../../../en/adapterref/iobroker.innoxel/admin/innoxel.png)

![узел](https://img.shields.io/node/v-lts/iobroker.innoxel)
![версия НПМ](https://img.shields.io/npm/v/iobroker.innoxel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.innoxel.svg)
![лицензия](https://img.shields.io/npm/l/iobroker.innoxel)
![Количество установок](https://iobroker.live/badges/innoxel-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/innoxel-stable.svg)
![Статус зависимости](https://img.shields.io/david/matthsc/iobroker.innoxel.svg)
![НПМ](https://nodei.co/npm/iobroker.innoxel.png?downloads=true)

# IoBroker.innoxel
Адаптер для Innoxel Master 3 (https://innoxel.ch)

![Тест и выпуск](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

## Требования
- NodeJS >= 20.x
- ioBroker >= 6.0.11, с администратором >= 6.x
- Система «Умный дом» Innoxel Master 3

## Установка
Пока адаптер не является частью стабильного репозитория, вы можете установить последнюю версию, включив экспертный режим в ioBroker и установив адаптер из npm. Не устанавливайте его напрямую из Github, это приведет к ошибке при запуске адаптера ("не удается найти файл запуска").

Адаптер можно установить прямо из стабильных/бета-репозиториев. После установки создайте новый экземпляр и настройте параметры:

- Настройки подключения для доступа к innoxel master
- IP-адрес
- порт
  - имя пользователя
  - пароль
- Интервалы опроса для разных областей
- изменения состояния (т.е. переключатели, диммер)
- климат в помещении / термостаты
  - погода
- сведения об устройстве innoxel master (требуются права администратора для пользователя, подключающегося к innoxel master)

Обратите внимание: не устанавливайте адаптер напрямую из Github, это приведет к ошибке при запуске адаптера («не удается найти файл запуска»).

## Поддерживаемые модули и прошивки
Предварительная версия этого адаптера работала более 2 лет с прошивкой 1.4.1.0, а затем 1.5.1.0.

Первоначально выпущенная версия была протестирована с прошивкой 1.6.0.0.

Были протестированы/поддерживаются следующие модули:

- Инноксель Мастер 3
- Переключатель 8 G1
- Двигатель 4 x 230 В переменного тока G1
- Мощность 4 x 600 ВА
- Дегустатор RGB
- Термо
- Станция влажной уборки P03/3-RS485-CET

Если у вас все работает с другими модулями или у вас есть другие модули, которые не работают, пожалуйста, не стесняйтесь открывать проблему.

## Сообщения
Адаптер поддерживает сообщения, описанные в следующих разделах.

### ТриггерВМодуле
Имитация нажатия кнопки на «Тестере».

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
  // do something after the button press has been executed
});
```

- <code>moduleId</code> — это идентификатор/адрес «Тестер»
- <code>channelId</code> - это индекс кнопки на &quot;Тестере&quot;
- <code>callback</code> (необязательно) функция обратного вызова, вызываемая после выполнения действия

### SetDimValue
Имитация нажатия кнопки на «Тестере».

```ts
sendTo(
  "innoxel.0",
  "setDimValue",
  "<moduleId>:<channelId>:<dimValue>:<dimSpeed>",
  callback
);

// i.e. to set the value of channel 7 on dim module 1 to 80%
sendTo("innoxel.0", "setDimValue", "1:7:80");
sendTo("innoxel.0", "setDimValue", "1:7:80", () => {
  // do something after value has been set
});
```

- <code>moduleId</code> — идентификатор/адрес модуля диммера
- <code>channelId</code> - канал диммера на модуле
- <code>dimValue</code> — это значение в процентах для установки (0-100)
- <code>dimSpeed</code> (необязательно) — скорость затемнения, которую следует использовать (0-15)
- <code>callback</code> (необязательно) функция обратного вызова, вызываемая после выполнения действия

### Установить температуру
Установите температуру нагрева или охлаждения.

```ts
sendTo(
  "innoxel.0",
  "setTemperature",
  "<moduleId>:<temperatureType>:<temperature>",
  callback
);

// i.e. to set setTemperatureHeating to 20° on room climate module 0
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20");
sendTo("innoxel.0", "setTemperature", "1:setTemperature:20", () => {
  // do something after the button press has been executed
});
```

- <code>moduleId</code> - это идентификатор/адрес модуля климата помещения
- <code>temperatureType</code> — тип температуры, который необходимо задать (absenceSetbackTemperatureCooling, lackSetbackTemperatureHeating, nightSetbackTemperatureCooling, nightSetbackTemperatureHeating, setTemperatureCooling, setTemperatureHeating, )
- <code>temperature</code> температура для установки, с шагом 0,5°. Также есть мин/макс значение в зависимости от типа
- <code>callback</code> (необязательно) функция обратного вызова, вызываемая после выполнения действия

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.0 (2024-11-17)

- (matthsc) drop support for Node 18
- (matthsc) switch admin to json config
- (matthsc) prepare for future controller versions (fix deprecation warnings)
- (matthsc & dependabot) dependency updates

### 0.4.2 (2024-08-11)

- (matthsc & dependabot) dependency updates

### 0.4.1 (2024-03-23)

- (matthsc) log soap messages in log level silly
- (matthsc) fix another potential error when updating modules
- (matthsc & dependabot) dependency updates

### 0.4.0 (2024-03-20)

- (matthsc) fix potential error when processing identities
- (matthsc) drop support for Node 16

### 0.3.1 (2023-05-23)

- (matthsc) change actual value from temperature sensor if it doesn't provide values
- (matthsc & dependabot) dependency updates

### 0.3.0 (2023-04-22)

- (matthsc) allow to set heating/cooling temperatures
- (matthsc & dependabot) dependency updates

### 0.2.0 (2022-09-28)

- (matthsc) drop support for Node 12 and js-controller 3
- (matthsc) implement migrations from create-adapter
- (matthsc & dependabot) dependency updates

### 0.1.5 (2022-02-12)

- (matthsc) don't always terminate adapter on errors while updating identities
- (matthsc) improve error messages

### 0.1.4 (2022-01-25)

- (matthsc) fix double decryption issues with password in adapter admin
- (matthsc) change input field types in adapter admin

### 0.1.3 (2022-01-16)

- (matthsc) improve error messages

### 0.1.2 (2022-01-07)

- (matthsc) catch authentication errors
- (matthsc) fix authentication
- (matthsc) remove build folders from git

### 0.1.1 (2022-01-01)

- (matthsc) implement adapter review feedback

### 0.1.0 (2021-12-30)

- (matthsc) initial release

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