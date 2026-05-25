---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.innoxel/README.md
title: ioBroker.innoxel
hash: HEjFi/yoc2LNXdA4xAbLmvgbX1xYMOhBWzioRLUNoF0=
---
![Логотип](../../../en/adapterref/iobroker.innoxel/admin/innoxel.png)

![узел](https://img.shields.io/node/v-lts/iobroker.innoxel)
![Версия NPM](https://img.shields.io/npm/v/iobroker.innoxel.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.innoxel.svg)
![лицензия](https://img.shields.io/npm/l/iobroker.innoxel)
![Количество установок](https://iobroker.live/badges/innoxel-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/innoxel-stable.svg)
![Статус зависимости](https://img.shields.io/david/matthsc/iobroker.innoxel.svg)
![НПМ](https://nodei.co/npm/iobroker.innoxel.png?downloads=true)

# IoBroker.innoxel
Адаптер для Innoxel Master 3 (https://innoxel.ch)

![Тестирование и выпуск](https://github.com/matthsc/ioBroker.innoxel/workflows/Test%20and%20Release/badge.svg)

## Требования
- NodeJS >= 22.x
- ioBroker >= 6.0.11, с административным доступом >= 6.x
- Система «умный дом» Innoxel Master 3

## Установка
Пока адаптер не станет частью стабильного репозитория, вы можете установить последнюю версию, включив экспертный режим в ioBroker и установив адаптер из npm. Не устанавливайте его напрямую из Github, это приведет к ошибке при запуске адаптера ("не удается найти стартовый файл").

Адаптер можно установить непосредственно из стабильных/бета-версий репозиториев. После установки создайте новый экземпляр и настройте параметры:

- Настройки подключения для доступа к Innoxel Master
- IP-адрес
- порт
  - имя пользователя
  - пароль
- Интервалы опроса для разных областей
- изменения состояния (например, переключателей, диммеров)
- климат в помещении / термостаты
  - погода
- Сведения об устройстве Innoxel Master (для подключения к Innoxel Master требуются права администратора)

Обратите внимание: не устанавливайте адаптер напрямую из Github, это приведет к ошибке при запуске адаптера ("не удалось найти файл запуска").

## Поддерживаемые модули и микропрограммы
Предварительная версия этого адаптера работала более 2 лет с прошивкой 1.4.1.0, а затем 1.5.1.0.

Первоначально выпущенная версия была протестирована с прошивкой версии 1.6.0.0.

Следующие модули были протестированы/поддерживаются:

- Инноксель Мастер 3
- Switch 8 G1
- Двигатель 4 x 230 В переменного тока G1
- Dim 4 x 600 ВА
- Дегустационный RGB
- Термо
- Станция влажной уборки P03/3-RS485-CET

Если у вас всё работает с другими модулями, или если у вас есть другие модули, которые не работают, пожалуйста, не стесняйтесь создать заявку в службу поддержки.

## Сообщения
Адаптер поддерживает сообщения, описанные в следующих разделах.

### TriggerInModule
Имитация нажатия кнопки на дегустационном устройстве.

```ts
sendTo("innoxel.0", "triggerInModule", "<moduleId>:<channelId>", callback);

// i.e. to trigger button 1 on "Taster" with id/address 20
sendTo("innoxel.0", "triggerInModule", "20:1");
sendTo("innoxel.0", "triggerInModule", "20:1", () => {
  // do something after the button press has been executed
});
```

- <code>moduleId</code> — это идентификатор/адрес &quot;дегустатора&quot;.
- <code>channelId</code> — это индекс кнопки на странице &quot;Taster&quot;.
- Функция <code>callback</code> (необязательно) — функция обратного вызова, которая будет вызвана после выполнения действия.

### SetDimValue
Имитация нажатия кнопки на дегустационном устройстве.

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

- <code>moduleId</code> — это идентификатор/адрес модуля диммера.
- <code>channelId</code> — это номер канала диммера на модуле.
- <code>dimValue</code> — это значение в процентах, которое нужно установить (0-100).
- <code>dimSpeed</code> (опционально) — скорость затемнения (0-15).
- Функция <code>callback</code> (необязательно) — функция обратного вызова, которая будет вызвана после выполнения действия.

### SetTemperature
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

- <code>moduleId</code> — это идентификатор/адрес модуля климат-контроля в помещении.
- <code>temperatureType</code> — это тип устанавливаемой температуры (absenceSetbackTemperatureCooling, absenceSetbackTemperatureHeating, nightSetbackTemperatureCooling, nightSetbackTemperatureHeating, setTemperatureCooling, setTemperatureHeating, )
- <code>temperature</code> : заданная температура с шагом 0,5°. Также есть минимальное/максимальное значение в зависимости от типа.
- Функция <code>callback</code> (необязательно) — функция обратного вызова, которая будет вызываться после выполнения действия.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-05-16)
- (matthsc) implement adapter checker feedback and create-adapter migrations
- (copilot) Adapter requires node.js >= 22 now
- (matthsc & dependabot) dependency updates

### 1.0.1 (2024-12-09)
- (matthsc) implement adapter checker feedback
- (matthsc) cleanup changelog

### 1.0.0 (2024-11-17)

- (matthsc) drop support for Node 18
- (matthsc) switch admin to json config
- (matthsc) prepare for future controller versions (fix deprecation warnings)
- (matthsc & dependabot) dependency updates

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 matthsc <matthsc@gmx.net>

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