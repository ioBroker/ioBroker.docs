---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skoda-order-status/README.md
title: ioBroker.skoda-order-status
hash: 0rHIRFKbfSt4YFxhCKH6Lxc7NmheATZisi+edRzXfdw=
---
![Логотип](../../../en/adapterref/iobroker.skoda-order-status/admin/skoda-order-status.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.skoda-order-status.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.skoda-order-status.svg)
![Количество установок](https://iobroker.live/badges/skoda-order-status-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/skoda-order-status-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.skoda-order-status.png?downloads=true)
![Тестирование и выпуск](https://github.com/SentiQ/ioBroker.skoda-order-status/workflows/Test%20and%20Release/badge.svg)

# ioBroker.skoda-order-status

## адаптер skoda-order-status для ioBroker

Получите информацию о статусе **ожидающего оформления заказа на автомобиль Škoda** через неофициальный API MyŠkoda.

Это заполняет пробел, оставленный такими автомобильными адаптерами, как... `vw-connect` Отслеживание заказов в приложении MyŠkoda ("Отслеживание и изучение") работает **до того, как** будет установлен VIN-номер.

Сайт производителя: [Škoda Auto](https://www.skoda-auto.com/)

## Функции

- Войдите в систему, используя адрес электронной почты и пароль MyŠkoda.
- Автоматическое обнаружение всех открытых ордеров на счете.
- Статусные метки на английском языке и даты контрольных точек
- Настраиваемый интервал опроса (по умолчанию: 1 час)
- Токен обновления хранится в зашифрованном виде на экземпляре.

## Конфигурация

1. Установите адаптер и создайте экземпляр.
2. Введите свой адрес электронной почты и **пароль** **от MyŠkoda** .
3. При желании можно изменить **интервал опроса** (900–86400 секунд, по умолчанию 3600).
4. Сохранить. Адаптер входит в систему, обнаруживает открытые заказы и создает одно устройство на каждый идентификатор комиссии.

## Объекты

Каждый открытый ордер представляет собой устройство, находящееся в процессе `skoda-order-status.0.<commissionId>`:

| Состояние                                                                    | Описание                                                                            |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `orderStatus`                                                                | Исходный статус (`ORDER_CONFIRMED`, `IN_PRODUCTION`, `IN_DELIVERY`, `TO_HANDOVER`) |
| `orderStatusLabel`                                                           | Надпись на английском языке (Подтверждено, В производстве, В доставке, К передаче)  |
| `model` /`trimLevel`                                                         | Модель и комплектация автомобиля                                                    |
| `exteriorColour` /`interiorColour`                                           | Цвета                                                                               |
| `batteryKwh` /`maxPerformanceKw`                                             | Батарея и источник питания (если имеется)                                           |
| `commissionId`                                                               | Идентификатор заказа на комиссию                                                    |
| `dealerId` /`activationState`                                                | Дилер и активация                                                                   |
| `orderConfirmedDate` /`inProductionDate` /`inDeliveryDate` /`toHandoverDate` | Даты контрольных точек                                                              |
| `checkpointsReached` /`checkpointsPending`                                   | JSON-списки контрольных точек                                                       |
| `lastPoll`                                                                   | Последний успешный опрос (метка времени ISO)                                        |

`info.connection` является `true` при этом вход через API MyŠkoda работает.

## Отказ от ответственности

Этот адаптер использует **неофициальный, полученный методом обратной разработки** API MyŠkoda. Он не связан с компанией Škoda Auto. Используйте на свой страх и риск.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.9 (2026-09-11)
* (SentiQ) HTTP timeouts, sequential polling, English state labels

### 0.1.8 (2026-09-03)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.7 (2026-09-02)
* (SentiQ) repository PR checker error

### 0.1.6 (2026-09-02)
* (SentiQ) fix fr news translation

### 0.1.5 (2026-09-02)
* (SentiQ) fix state roles and connection i18n

## License
MIT License

Copyright (c) 2026 SentiQ <yves@nuesser.digital>

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
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.