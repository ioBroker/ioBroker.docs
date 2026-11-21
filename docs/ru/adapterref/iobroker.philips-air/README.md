---
chapters: {"pages":{"en/adapterref/iobroker.philips-air/README.md":{"title":{"en":"ioBroker.philips-air"},"content":"en/adapterref/iobroker.philips-air/README.md"},"en/adapterref/iobroker.philips-air/docs/CX3550.md":{"title":{"en":"Philips/Versuni CX3550/01"},"content":"en/adapterref/iobroker.philips-air/docs/CX3550.md"},"en/adapterref/iobroker.philips-air/docs/CX7550.md":{"title":{"en":"Philips/Versuni CX7550/01"},"content":"en/adapterref/iobroker.philips-air/docs/CX7550.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: JHdtwM7if9+G/+pf8StvEiRibCXDyf70CyVJ9o5CxYg=
---
![Логотип](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![Количество установок](https://iobroker.live/badges/philips-air-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.philips-air.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# ioBroker.philips-air

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Адаптер для очистителя воздуха Philips для ioBroker

Позволяет подключать очистители воздуха Philips и некоторые вентиляторы Philips/Versuni к ioBroker. **Протестировано с AC2729 и вентиляторами Philips/Versuni CX3550/01 и CX7550/01** , но должно работать и с более новыми очистителями, которые обмениваются данными через локальный CoAP с шифрованием.![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[Ссылка на сайт Philips](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Использование

Введите IP-адрес или имя хоста вашего устройства. Вы можете найти его в настройках вашего маршрутизатора, где устройство часто отображается как IP-адрес. `MiCO` Большинство устройств подключаются через CoAP, что является протоколом по умолчанию. Некоторые более старые модели, такие как AC2729 и AC3829, отвечают только по HTTP — если соединение не устанавливается, измените протокол в настройках экземпляра. Затем выберите модель вашего устройства, чтобы адаптер создал элементы управления, соответствующие вашему устройству. Новый экземпляр запускается с `Generic` Вы получаете все значения, доступные только для чтения, но не получаете элементы управления, пока не выберете модель. `Generic` Это также правильный выбор, если вашей модели нет в списке. Может случиться так, что устройство не сообщает обо всех переменных; они остаются незаполненными в дереве объектов. Необработанные значения, которые адаптер не распознает, собираются в разделе `unknownStates`.

### Два варианта настройки времени

Оба параметра измеряются в миллисекундах и редко требуют корректировки.

| Параметр                        | По умолчанию | Что это делает                                                                                                                                                                                                                                                                                               |
| ------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Таймаут активности              | 30000        | Время, необходимое для обработки одного запроса к устройству до его отмены. В протоколе HTTP это также интервал опроса.                                                                                                                                                                                      |
| Интервал повторного подключения | 30000        | Сколько времени следует подождать перед первой попыткой повторного подключения после неудачной попытки. Последующие неудачи удваивают время ожидания, до пяти минут, чтобы недоступное устройство не подвергалось чрезмерной нагрузке. Время ожидания не должно быть короче, чем время ожидания подключения. |

При использовании CoAP устройство самостоятельно передает свой статус, поэтому опрос не требуется. Некоторые устройства — например, CX7550/01 — могут оставаться в режиме ожидания в течение нескольких часов; в этом случае адаптер проверяет соединение, запрашивая его напрямую у устройства, вместо того чтобы переустанавливать соединение.

### Какую модель устройства мне следует выбрать?

| Ваше устройство                                                                                       | Модель для выбора |
| ----------------------------------------------------------------------------------------------------- | ----------------- |
| AC2889 и другие классические очистители, например, AC1214, AC2729, AC2939, AC3059, AC3829 или AC4236. | `AC2889`          |
| AC3221                                                                                                | `AC3221`          |
| AC3737/10 2-в-1 очиститель/увлажнитель воздуха                                                        | `AC3737`          |
| Напольный вентилятор CX3550/01                                                                        | `CX3550`          |
| башенный вентилятор CX7550/01                                                                         | `CX7550`          |
| Что-нибудь еще, или если вы не уверены?                                                               | `Generic`         |

Все классические очистители воздуха выдают одни и те же простые сигналы (`pwr`, `om`, `mode` и так далее), поэтому одна запись охватывает все семейство. На данный момент подтверждено на реальном оборудовании: AC2729, AC2889, AC3221, AC3829, AC4236/14, CX3550/01 и CX7550/01. `AC3737` Запись была создана на основе полного кадра состояния AC3737/10 (GitHub #407), а затем подтверждена на этом устройстве: показания совпадают с данными приложения, и устройство выполнило операцию записи режима и целевого значения влажности из ioBroker. Два замечания, касающиеся этой модели «2 в 1»: назначены все три пары фильтров, но не так, как в других моделях нового поколения — пара 4800 ч здесь относится к фильтру увлажнителя (фитилю), а пара 2400 ч — к воздушному фильтру. `hepaFilter*`), оба показателя подтвердились, судя по процентам, отображаемым приложением. `status.waterTankPresent` На самом деле это означает «бак установлен»: бак находится внутри, но пуст, и остается на месте. `true`, пока `device.error` переключается на `no water`.

Номер модели сам по себе ничего не говорит о наборе регистров: AC4236/14 имеет более высокий номер, чем AC3221, но это классическое устройство, и для его работы требуется... `AC2889` Выберите запись, которая соответствует ключам, отображаемым вашим устройством, а не ту, которая наиболее близка по названию.

Если вы не уверены, свяжитесь с нами. `Generic` Сначала посмотрите на исходные ключи ниже. `unknownStates`: простые названия, такие как `pwr` или `pm25` под этим подразумевается классическое устройство, например, клавиши. `D03102` Это означает устройство следующего поколения. Если ваше устройство окажется моделью следующего поколения, которой нет в списке, пожалуйста, создайте заявку с отладочным логом — именно так были добавлены CX7550/01 и AC3221.

![Объекты](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Вентилятор Philips/Versuni CX3550/01

CX3550/01 поддерживается через локальное зашифрованное CoAP-соединение. API облачных сервисов Philips, Versuni или HomeID не используются.

Протестированы функции CX3550/01:

- Включение/выключение питания
- Скорость вращения вентилятора 1, 2 и 3
- Спящий режим
- Естественный ветерок
- Включение/выключение колебаний
- Звуковой сигнал включения/выключения
- Считывание состояния через локальный CoAP
- Показания состояния таймера

Управление таймером для CX3550/01 намеренно не поддерживается. Локальная запись данных в таймер может привести к установке параметров прошивки. `D03102` к `0`, что отключает вентилятор. Таким образом, адаптер отображает информацию о таймере CX3550/01 только в режиме чтения.

Более подробная информация содержится в файле [docs/CX3550.md](/#/docs/adapterref/iobroker.philips-air/docs/CX3550.md) .

## Башенный вентилятор Philips/Versuni CX7550/01

Вентилятор CX7550/01 (серия «Умный башенный вентилятор 7000») использует то же локальное зашифрованное CoAP-соединение, но другие необработанные значения, чем CX3550/01 — выберите `CX7550` в качестве модели устройства.

Протестированы функции CX7550/01:

- Включение/выключение питания
- Скорость вращения вентилятора от 1 до 12 и функция AutoAdapt
- Спящий режим
- Естественный ветерок
- Включение/выключение колебаний
- Таймер (выкл., от 1 до 12 часов) — на этой модели можно записывать.
- Звуковой сигнал включения/выключения
- Яркость дисплея, цветовая температура, отображение цветов и то, что постоянно отображается на дисплее.
- Комнатная температура

Более подробная информация содержится в файле [docs/CX7550.md](/#/docs/adapterref/iobroker.philips-air/docs/CX7550.md) .

## Changelog
### 2.4.1 (2026-11-17)
- (tt-tom17) AC2889 family: the child lock is now written as a boolean, the format the classic devices expect - an AC4236/14 ignored the command before (GitHub #411)

### 2.4.0 (2026-11-06)
- (tt-tom17) New device model "AC3737" for the AC3737/10 2-in-1 purifier/humidifier: readings, all three filter pairs, the humidity target, the water tank state, the "no water" error and the preferred index are now named instead of appearing as raw values; writing the mode and the humidity target is confirmed on the device
- (copilot) Adapter requires node.js >= 22.19.0 now
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.3.0 (2026-10-26)

- (tt-tom17) A new instance now starts with the device model "Generic" (read-only values, no controls) instead of silently using the AC2889 controls; instances that already have a model keep it
- (tt-tom17) With the device model "Generic" the log now names the model your device looks like, so you know which one to select
- (tt-tom17) Dependencies updated

### 2.2.0 (2026-09-08)

- (tt-tom17) Added the combined allergen/sleep preset ("Allergie-/Ruhemodus") reported by the AC4236/14 (VMI1)
- (tt-tom17) Classic devices now show the total filter life next to the remaining hours, plus the device language and version (VMI1)
- (tt-tom17) The "wrong device model" warning is no longer silenced by a single register that both models use (VMI1)
- (tt-tom17) Fixed a device attribute spelled like one of the adapter's own state names being treated as a mapped value (VMI1)

### 2.1.0 (2026-08-29)

- (tt-tom17) Fixed error messages ("DB closed", "setTimeout called, but adapter is shutting down") that appeared in the log every time the adapter was stopped or restarted (MatthiasBosch)
- (tt-tom17) New setting "Log unknown device attributes as debug": moves the "Unknown raw device attribute" messages from the info log to the debug log (off by default)
- (tt-tom17) Fixed devices connected via CoAP reconnecting every few minutes, and the log filling with "connection lost / connected" pairs, although the connection was fine - this affected quiet devices such as the CX7550/01 (DrBakterius)
- (tt-tom17) A device that stays unreachable is now retried at growing intervals instead of every 30 seconds, and stops repeating the same error line in the log
- (tt-tom17) No longer suggests switching to CoAP when an HTTP device that was working loses its connection - the hint now only appears while HTTP has never worked (tukey42)

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