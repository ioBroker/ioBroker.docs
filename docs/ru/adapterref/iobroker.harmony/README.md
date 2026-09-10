---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.harmony/README.md
title: ioBroker.harmony
hash: Icl1F6peKW51uwhYKAdA5qdghRDGZaAd6LxPWJyryP0=
---
![Логотип](../../../en/adapterref/iobroker.harmony/admin/harmony.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.harmony)
![Загрузки](https://img.shields.io/npm/dm/iobroker.harmony.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.harmony)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/harmony/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.harmony)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.harmony/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.harmony)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.harmony)
![Версия NPM](http://img.shields.io/npm/v/iobroker.harmony.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/harmony-stable.svg)
![Количество установок](https://iobroker.live/badges/harmony-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.harmony/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.harmony/actions/workflows/codeql.yml/badge.svg)

# ioBroker.harmony

**Версия:**

**Тесты:**

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## ioBroker Logitech Harmony адаптер

Адаптер Logitech Harmony позволяет интегрировать один или несколько концентраторов Logitech Harmony в систему ioBroker.

Концентратор Logitech Harmony позволяет управлять широким спектром развлекательных устройств и устройств умного дома. Через этот концентратор ioBroker может запускать и останавливать действия, считывать статус действия и дистанционно управлять устройствами, отправляя виртуальные нажатия клавиш.

![Центр Гармонии](../../../en/adapterref/iobroker.harmony/media/harmony_850.jpg "Консоль Logitech Harmony Hub с пультом дистанционного управления Harmony Elite.")

## Обзор

### Logitech Harmony

Logitech Harmony совместима с более чем 270 000 развлекательных устройств и устройств для умного дома. В их число входят телевизоры и кабельные приставки, проигрыватели дисков и игровые консоли, AV-ресиверы и медиаплееры, а также умное освещение, замки, термостаты и многое другое.

С помощью Logitech Harmony вы можете переключать программы, регулировать громкость, назначать избранные треки, управлять освещением и другими интеллектуальными устройствами. Главная особенность системы — возможность создавать действия, которые управляют несколькими устройствами одним нажатием клавиши.

1. Концентратор Logitech Harmony подключается к домашней сети через Wi-Fi.
2. Концентраторы Harmony не имеют порта Ethernet.
3. Данный маршрутизатор поддерживает только диапазон Wi-Fi 2,4 ГГц. Диапазон 5 ГГц не поддерживается.
4. Следует использовать маршрутизатор 802.11 g/n. Стандарт 802.11 a/b не поддерживается.
5. В качестве протокола шифрования Wi-Fi хаб поддерживает WEP 64/128, WPA Personal и WPA2-AES.
6. Для того чтобы приложение Harmony могло обнаружить хаб и взаимодействовать с ним, UPnP включать необязательно. Однако его необходимо включить, чтобы сам хаб мог обнаруживать другие устройства в сети и взаимодействовать с ними — это касается таких устройств, как Philips Hue, Sonos, Nest, Roku или смарт-телевизоры.
7. Максимальное количество устройств на один хаб — 8. Возможно подключение до 15 устройств, если хотя бы одно устройство Harmony Touch или Ultimate One зарегистрировано в качестве пульта дистанционного управления на хабе.
8. Максимальное количество избранных каналов на одном мобильном устройстве — 50.

### Адаптер Logitech Harmony

Адаптер Logitech Harmony автоматически обнаруживает каждый концентратор Logitech Harmony, который использует ту же подсеть, что и сервер ioBroker, через Wi-Fi-соединение.

Объекты для запуска функций и действий устройства (= командные макросы) создаются в ioBroker автоматически адаптером. Также доступно текущее состояние хаба. Путем записи или чтения созданных объектов можно изменять их состояние, а следовательно, запускать или запрашивать действия.

## Предварительные условия перед установкой

С помощью адаптера ioBroker для системы Logitech Harmony нельзя создавать или изменять устройства и действия. Поэтому перед использованием адаптера необходимо настроить систему дистанционного управления в соответствии с инструкциями в руководстве Logitech, и она должна работать совместно с управляемыми устройствами.

## Установка

Экземпляр адаптера устанавливается через административный интерфейс ioBroker. Подробное описание необходимых шагов установки можно найти **[здесь](https://www.iobroker.net/#en/documentation/admin/adapter.md)** .

После завершения установки экземпляра адаптера автоматически открывается окно конфигурации.

## Конфигурация

Адаптер самостоятельно находит каждый хаб Harmony в подсети сервера ioBroker. В большинстве случаев никакой дополнительной настройки не требуется.

### Окно «Настройки адаптера Logitech Harmony»

| Поле                                               | Описание                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Сетевой интерфейс**                              | Интерфейс, на котором адаптер осуществляет поиск. На хостах с несколькими сетями (несколько сетевых адаптеров, Docker, VPN) выберите правильный интерфейс, чтобы как широковещательный, так и ответный адрес хаба использовали его. Широковещательный адрес формируется на основе этого интерфейса, поэтому маски подсети, отличные от /24, также работают (#331). Оставьте поле пустым, чтобы осуществлять поиск по всем интерфейсам — это рекомендуемая настройка для большинства установок. |
| **Интервал обнаружения**                           | Как часто отправляется широковещательное сообщение об обнаружении. Значение по умолчанию — 2000 мс, минимально допустимое значение — 500 мс.                                                                                                                                                                                                                                                                                                                                                   |
| **IP-адреса концентратора, установленные вручную** | Необязательный список адресов хабов. Как только он содержит хотя бы одну запись, адаптер связывается именно с этими адресами и полностью пропускает широковещательную рассылку. Используйте его, когда хаб находится в другой подсети, чем ioBroker, или когда широковещательный трафик заблокирован в вашей сети (#147).                                                                                                                                                                      |

После завершения настройки диалоговое окно настроек остается пустым.`SAVE AND CLOSE` После этого адаптер перезапускается.

В экземплярах, обновленных с версии 2.1.0 или более ранних, удаленная настройка _Discovery-Subnets_ автоматически переносится при первом запуске: адрес, являющийся широковещательным адресом одного из ваших интерфейсов, выбирает этот интерфейс, любой другой адрес становится IP-адресом хаба, назначенным вручную. Адаптер записывает в журнал информацию о преобразованном адресе.

## Экземпляры

В результате установки адаптера был создан активный экземпляр адаптера Logitech Harmony Hub.`Instances` раздел.

![Пример](../../../en/adapterref/iobroker.harmony/media/a_harmony_instanz.png "Первый случай")

На сервере ioBroker можно установить только один экземпляр адаптера Logitech Harmony.

Цвет поля состояния экземпляра показывает, включен ли адаптер и подключен ли он к концентратору Logitech Harmony. Если навести указатель мыши на символ, отобразятся дополнительные сведения.

## Объекты адаптера

В`Objects` В этом разделе все устройства и действия, обнаруженные адаптером в хабе, отображаются в виде дерева. Кроме того, объекты указывают, насколько бесперебойно осуществляется связь с хабом.

![Объекты](../../../en/adapterref/iobroker.harmony/media/a_harmony_objekte.png "Объекты адаптера Harmony")

Каждое состояние указано вместе с его типом данных и правами доступа. Права доступа могут быть как для чтения (R), так и для записи (W). Для каждого состояния разрешен как минимум чтение (R), а для некоторых — и запись. Для поиска определенного состояния рекомендуется использовать комбинацию клавиш "CTRL + F".

| Объект                            | Доступ | Описание                                                                                                                          |
| --------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **гармония.0**                    | Р      | Название первого _экземпляра_ адаптера Logitech Harmony                                                                           |
|  **Центр Гармонии**               | Р      | Название _центра_                                                                                                                 |
|   **Apple TV третьего поколения** | Р      | Название _устройства_ , содержащее его функции.                                                                                   |
|   **Denon AV-Empfänger**          | Р      | Название _устройства_ , содержащее его функции.                                                                                   |
|   **:**                           | Р      | Дополнительные _устройства_                                                                                                       |
|   **деятельность**                | Р      | Список всех _мероприятий,_ запланированных в центре «Гармония».                                                                   |
|   _**hubBlocked**_                | Р      | Показывает, занят ли хаб в данный момент, например, запускается или останавливается какое-либо действие или отправляется команда. |
|   _**hubConnected**_              | Р      | Состояние соединения между адаптером и концентратором.                                                                            |

`hubBlocked` и`hubConnected` Они доступны только для чтения, запись в них не имеет никакого эффекта.

### Функции устройства

При открытии устройства отображается список всех функций, относящихся к этому устройству. Эти функции устройства являются специфичными для каждого устройства и, следовательно, различаются между устройствами разных типов.

![Устройство](../../../en/adapterref/iobroker.harmony/media/a_harmony_geraet.png "Функции устройства")

#### Запуск функции устройства

Все функции устройства`{instance}.{hub name}.{device}.{device function}` Запускает соответствующую реакцию указанного устройства. Значения функций устройства можно считывать и записывать. Проверить срабатывание можно, щелкнув указатель мыши по значку колокольчика справа от функции. В качестве альтернативы можно ввести значение с помощью символа карандаша.

Значения имеют единицу измерения.`milliseconds` Если ввести значение от 1 до 250 мс, концентратор Harmony обычно отправляет одно нажатие клавиши заданной длительности. Значения, превышающие 250 мс, могут привести к многократному срабатыванию функции устройства.

После срабатывания функции устройства значение возвращается к нулю.

### Деятельность

Ниже перечислены все мероприятия, запланированные в центре «Гармония».`activities` .

![Деятельность](../../../en/adapterref/iobroker.harmony/media/a_harmony_activities.png "Деятельность")

#### Начало деятельности

Действие запускается путем ввода числа больше 0 в соответствующем поле.`{instance}.{hub name}.activities.{activity}` Во время выполнения действия это значение сначала изменяется на 1 (= начало), а затем на 2 (= активно).

#### Прекращение деятельности

Выполняемые действия останавливаются путем установки их значения равным 0. В качестве альтернативы, в объект можно ввести любое число.`{instance}.{hub name}.activities.currentStatus` Чтобы остановить выполняющуюся активность. Пока активность останавливается,`{instance}.{hub name}.activities.currentStatus` изменяется с 3 (= остановка) на 0 (= неактивен).

#### Дополнительные значения статуса

`{instance}.{hub name}.activities.currentActivity` Возвращает текущее запущенное действие в виде строки.

`{instance}.{hub name}.activities.currentStatus` Отображает статус хаба Harmony. Значения означают:

- 0 = неактивен
- 1 = начало
- 2 = активный
- 3 = остановка

`{instance}.{hub name}.activities.{activity}` Отображает статус отдельного действия. Значение значений такое же, как и для`{instance}.{hub name}.activities.currentStatus` .

## Удаление

Если экземпляр необходимо удалить повторно, он удаляется вместе со значком корзины, присвоенным ему в настройках.`Instances` раздел.

![Удалить](../../../en/adapterref/iobroker.harmony/media/adapter_harmony_delete_01.png)

Появляется запрос на подтверждение, который необходимо подтвердить нажатием _**кнопки «ОК»**_ .

![Удалить2](../../../en/adapterref/iobroker.harmony/media/adapter_harmony_delete_02.png)

После этого снова появляется окно, в котором отображается информация о том, как обрабатываются команды удаления.

![Удалить3](../../../en/adapterref/iobroker.harmony/media/adapter_harmony_delete_03.png)

Данная деинсталляция полностью удаляет все объекты, принадлежащие данному экземпляру.

Если необходимо полностью удалить установочные файлы с хоста, это нужно сделать с помощью значка корзины на плитке адаптера Harmony.`Adapters` раздел.

## Часто задаваемые вопросы

1. **Соединение с хабом постоянно прерывается.**

   Для связи концентратора Harmony с адаптером требуется отличное радиосоединение. Рекомендуется использовать точку доступа Wi-Fi в непосредственной близости от концентратора.

2. **Как проще всего реализовать кнопку «все выключено» через ioBroker?**

   Набор`{instance}.{hub name}.activities.currentStatus` до 0.

3. **В Windows появляется сообщение.`ERR! code ENOGIT` Эта ошибка появляется во время установки адаптера, и адаптер не работает.**

   Перед установкой адаптера Harmony загрузите и установите GIT с сайта <https://git-scm.com/download/win> .

4. **В Linux появляется сообщение`ERR! code ENOGIT` Эта ошибка появляется во время установки адаптера, и адаптер не работает.**

   Установите GIT из командной строки с помощью команды:`sudo apt install git` перед установкой адаптера Harmony.

5. **Скрипты больше не работают с более новыми версиями адаптера.**

   Начиная с версии 0.9.1 адаптера, имена объектов изменились. Старые имена...`harmony.0.Harmony_Hub` стал`harmony.0.Harmony Hub` Например. Пожалуйста, проверьте объекты и адаптируйте компоненты, которые на их основе созданы, например, скрипты.

   Начиная с версии 3.0.0, каждая точка в названиях хаба, активности, устройства и команды заменяется на`_` И не только первый. Штаты, в названии которых содержалась точка, воссоздаются под новым идентификатором, поэтому скрипты, представления VIS и псевдонимы, которые ссылались на такие штаты, также должны быть адаптированы.

6. **На ночь Wi-Fi автоматически отключается. После повторного включения Wi-Fi адаптер не подключается к хабу автоматически.**

   Добавьте функцию автоматического перезапуска экземпляра Harmony (в экспертном режиме) примерно через 5-10 минут после запуска Wi-Fi роутера.

7. **Центр управления не найден.**

   Проверьте, действительно ли концентратор находится в той же подсети и VLAN, что и сервер ioBroker. Разрешены ли многоадресные рассылки или они фильтруются маршрутизатором? Горит ли зеленый индикатор состояния на концентраторе? Доступен ли концентратор через приложение Logitech? Следуйте инструкциям Logitech для решения проблем с подключением.

   Если концентратор находится в другой подсети или если широковещательный трафик заблокирован в вашей сети, введите его адрес в поле **«IP-адреса концентратора вручную»** в настройках экземпляра.

8. **Можно установить только один экземпляр адаптера.**

   На сервере ioBroker можно установить только один экземпляр адаптера Logitech Harmony.

## Примеры

### JavaScript

Функции запуска устройства. Здесь AV-ресивер Denon включается или выключается при изменении значения другого состояния.

```javascript
if (getState("hm-rpc.0.MEQ01234567.2.STATE").val == true) {
  setState("harmony.0.Harmony Hub.Denon AV-Empfänger.PowerOn"/*Denon AV-Empfänger:PowerOn*/, '1', true);
  // control switch == ON: switch without delay
} else if (getState("hm-rpc.0.MEQ01234567.2.STATE").val == false) {
  // control switch == OFF: switch with a delay
  var timeout = setTimeout(function () {
    setState("harmony.0.Harmony Hub.Denon AV-Empfänger.PowerOn"/*Denon AV-Empfänger:PowerOn*/, '1', true);
  }, 1000);
}
```

### Блокли

Функции запуска устройства. Здесь AV-ресивер Denon включается или выключается при изменении значения другого состояния.

![Блокли](../../../en/adapterref/iobroker.harmony/media/a_hamony_simple_blockly.jpg "Блокли")

[Исходный код](https://github.com/iobroker-community-adapters/ioBroker.harmony/blob/master/media/a_harmony_blockly.xml)

## Ссылки

- Страница производителя [: https://www.logitech.com/de-de/product/harmony-hub](https://www.logitech.com/de-de/product/harmony-hub)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.0 (2026-08-06)
- (copilot) Adapter requires node.js >= 22 now
- (krobipd) State ID sanitisation hardened — tab/newline and other whitespace in hub-supplied device names no longer crash subscribe (#98). Dots are also collapsed so labels cannot split the ID path. Empty results fall back to `unnamed`.
- (krobipd) Async event handlers (`stateChange`, hub discovery, client online/offline/state) now have proper error handling — a single failing await no longer terminates the adapter with an unhandled promise rejection.
- (krobipd) Existing activities are now correctly recognised on every restart — the inverted `if` in `initHub` left the bookkeeping empty and made every activity log as `Added new activity` after each adapter start. As a side effect, activities deleted on the hub are now also pruned from the state tree, and the per-activity `-control` state is no longer falsely flagged as stale during the cleanup pass.
- (GermanBluefox) **Breaking:** the `Discovery-Subnets` setting was replaced by a network interface selector plus a manual hub list. Existing instances are migrated automatically on first start — a directed broadcast address selects the matching interface, any other address is carried over as a manual hub IP. The conversion is written to the log and runs exactly once.
- (GermanBluefox) **Breaking:** dots in hub, activity, device and command names are now replaced by `_` throughout, not just the first one. States whose name contained a dot are recreated under the new ID and the outdated objects are removed on the next hub sync. Adapt scripts, VIS views and aliases that referenced such states.
- (GermanBluefox) Discovery now restarts by itself after a socket error, with a delay growing from 30 s to at most 5 min, instead of staying silently dead until the adapter is restarted.
- (GermanBluefox) A single unreachable address no longer stops discovery for every other hub — send failures are logged per address.
- (GermanBluefox) A broadcast address entered in the manual hub list works again instead of failing with `EACCES` on every ping.
- (GermanBluefox) Dependencies updated: TypeScript 6, `@tsconfig/node22`, `@iobroker/adapter-core` 3.4.3, `@iobroker/testing` 5.3.0. The unused `sinon-chai` and `chai-as-promised` test helpers are gone.
- (GermanBluefox) `npm run build` and `npm run check` compile without errors again. The sources carried 26 strict-mode violations — unguarded `null` accesses on hub clients and discovery sockets, `Array.pop()` results used as strings, and `delete` on properties typed as required — none of which were caught because the scripts had been failing for a while.
- (GermanBluefox) `npm run lint` works again. It reported nothing but parse errors on every file (`project` and `projectService` were both enabled), and `allowDefaultProject` sat outside `projectService`, so no rule ever ran. An unused `tsconfig.json` left over from the vendored discovery library was shadowing the real one for everything under `src/discover/` and hid the Node.js types from the linter.

### 2.1.0 (2026-04-15)
- (copilot) Adapter requires admin >= 7.7.22 now

### 2.0.5 (2026-02-06)
* (@GermanBluefox) Corrected the type of value

### 2.0.4 (2026-01-29)
* (@brkai) Trying to fix the activities

### 2.0.3 (2025-11-04)
* (@GermanBluefox) Corrected the table in the configuration

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2019 Pmant <patrickmo@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.harmony/blob/master/CHANGELOG_OLD.md)