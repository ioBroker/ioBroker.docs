---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: +tbCESlGG5fdNULnJ0UmXUthVpC4zt2f2QJ+qUltyKA=
---
![Логотип](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Количество установок](http://iobroker.live/badges/philips-air-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Адаптер для очистителя воздуха Philips для ioBroker
Подключает очистители воздуха Philips и некоторые вентиляторы Philips/Versuni к ioBroker.

**Протестировано с AC2729 и вентиляторами Philips/Versuni CX3550/01 и CX7550/01**, но должно работать и с более новыми очистителями, которые обмениваются данными через локальный CoAP с шифрованием.

![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Ссылка на сайт Philips](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Использование
Введите IP-адрес или имя хоста вашего устройства. Вы можете найти его в настройках маршрутизатора, где устройство часто отображается как `MiCO`.
Доступ к большинству устройств осуществляется через CoAP, что является протоколом по умолчанию. Некоторые более старые модели, такие как AC2729 и AC3829, отвечают только по HTTP — если соединение не устанавливается, измените протокол в настройках экземпляра.
Затем выберите модель вашего устройства, чтобы адаптер создал элементы управления, соответствующие вашему устройству. Если вашей модели нет в списке, выберите `Generic`: вы по-прежнему получите все значения только для чтения, но без элементов управления, специфичных для модели.
Может случиться так, что устройство не сообщает все переменные; они остаются незаполненными в дереве объектов. Необработанные значения, которые адаптер не распознает, собираются в `unknownStates`.

### Какую модель устройства мне следует выбрать?
| Ваше устройство | Модель для выбора |
| --- | --- |
| AC2889 и другие классические очистители, например, AC1214, AC2729, AC2939, AC3059 или AC3829 | `AC2889` |
| Напольный вентилятор CX3550/01 | `CX3550` |
| Башенный вентилятор CX7550/01 | `CX7550` |
| Что-нибудь еще, или если вы не уверены | `Generic` |
| Что-нибудь еще, или если вы не уверены | `Generic` |

Все классические очистители сообщают об одних и тех же простых ключах (`pwr`, `om`, `mode` и так далее), поэтому одна запись охватывает все семейство. На данный момент подтверждено на реальном оборудовании: AC2729, AC2889, AC3221, AC3829, CX3550/01 и CX7550/01.

Если вы не уверены, сначала подключитесь к `Generic` и посмотрите на необработанные ключи в `unknownStates`: простые имена, такие как `pwr` или `pm25`, означают классическое устройство, ключи, такие как `D03102`, означают устройство следующего поколения. Если окажется, что ваше устройство относится к модели следующего поколения, которой нет в списке, пожалуйста, создайте заявку с отладочным логом — именно так были добавлены CX7550/01 и AC3221.

![Объекты](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Вентилятор Philips/Versuni CX3550/01
CX3550/01 поддерживается через локальное зашифрованное CoAP-соединение. API-интерфейсы Philips, Versuni или HomeID не используются.

Протестированы функции CX3550/01:

- Включение/выключение питания
- Скорость вращения вентилятора 1, 2 и 3
- Спящий режим
- Естественный ветерок
- Включение/выключение колебаний
- Звуковой сигнал включен/выключен
- Считывание состояния через локальный CoAP
- Показания состояния таймера

Управление таймером для CX3550/01 намеренно не поддерживается. Локальная запись данных таймера может привести к тому, что прошивка установит значение `D03102` в `0`, что выключит вентилятор. Поэтому адаптер предоставляет информацию о таймере CX3550/01 только в режиме чтения.

Более подробная информация приведена в [docs/CX3550.md](docs/CX3550.md).

## Башенный вентилятор Philips/Versuni CX7550/01
Устройство CX7550/01 (серия «Умный башенный вентилятор 7000») использует то же локальное зашифрованное соединение CoAP, но другие необработанные значения, чем CX3550/01 — выберите `CX7550` в качестве модели устройства.

Протестированы функции CX7550/01:

- Включение/выключение питания
- Скорость вращения вентилятора от 1 до 12 и функция AutoAdapt
- Спящий режим
- Естественный ветерок
- Включение/выключение колебаний
- Таймер (выкл., от 1 до 12 часов) - возможность записи на данной модели.
- Звуковой сигнал включен/выключен
- Яркость дисплея, цветовая температура и постоянно отображаемая информация.
- Комнатная температура

Более подробная информация приведена в [docs/CX7550.md](docs/CX7550.md).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-08-23)

- (tt-tom17) New "Device model" setting: pick your model so the adapter shows the correct controls for your device
- (tt-tom17) Added support for the AC3221 next-generation purifier (MatthiasBosch)
- (tt-tom17) Added support for the CX7550/01 tower fan (DrBakterius)
- (tt-tom17) The adapter now warns in the log when the selected model does not seem to match the connected device
- (tt-tom17) Values the adapter does not recognise are collected under "unknownStates"
- (tt-tom17) IMPORTANT: all state IDs starting with "cx" were renamed to generic names (for example "fanMode" instead of "cxFanMode"). Please select your device model once in the settings; the old "cx*" objects can be deleted manually
- (tt-tom17) Fixed switches that did nothing when a script or visualisation wrote them as the text "true"/"false" instead of a real on/off value
- (tt-tom17) Fixed devices connected via HTTP logging "Cannot parse: undefined" every time a command was sent; the device answer is now read correctly
- (tt-tom17) Fixed devices using the HTTP protocol (for example the AC3829 and AC2729) that stopped connecting in version 1.4.0 and only logged "fetch failed (UND_ERR_SOCKET)"; requests are sent the way these devices expect again

### 1.6.1 (2026-07-03)
- (Holly86) Added support for Philips/Versuni CX3550/01 pedestal fan.
- (Holly86) Added CX fan modes, oscillation, beep and read-only timer state.
- (Holly86) Timer control is intentionally not exposed because local timer writes can switch the fan off.

### 1.5.0 (2026-06-24)
- (tt-tom17) CoAP connection now stays stable instead of disconnecting every few minutes
- (tt-tom17) Fixed adapter checker warnings

### 1.4.0 (2026-06-17)
- (tt-tom17) Connection to CoAP and HTTP devices is much more reliable now: several cases that could crash the adapter, freeze the connection or stop it from reconnecting have been fixed
- (tt-tom17) Air quality, filter and on/off values are now shown with the correct type and update reliably
- (tt-tom17) Clearer log messages, including a hint to switch to CoAP when a device does not answer on HTTP
- (tt-tom17) HTTP mode no longer needs the extra "philips-air" package and its outdated dependencies
- (tt-tom17) The device address field now accepts an IP address or a hostname and warns about invalid input
- (tt-tom17) Dependencies updated

### 1.3.0 (2026-06-15)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
* (mcm1957) Dependencies have been updated

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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