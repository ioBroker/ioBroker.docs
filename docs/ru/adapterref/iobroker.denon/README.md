---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.denon.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.denon.svg
BADGE-Number of Installations: https://iobroker.live/badges/denon-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/denon-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.denon.png?downloads=true
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.denon/workflows/Test%20and%20Release/badge.svg
chapters: {"pages":{"en/adapterref/iobroker.denon/README.md":{"title":{"en":"ioBroker.denon"},"content":"en/adapterref/iobroker.denon/README.md"},"en/adapterref/iobroker.denon/docs/en/states.md":{"title":{"en":"All states"},"content":"en/adapterref/iobroker.denon/docs/en/states.md"},"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md":{"title":{"en":"Upgrading from 1.x to 2.0"},"content":"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.denon/README.md
title: ioBroker.denon
hash: Js630SZilXhBfrAP7RvTOh9OrZYyP6VpXosttxutHK4=
---
![Логотип](../../../en/adapterref/iobroker.denon/admin/denon.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.denon.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.denon.svg)
![Количество установок](https://iobroker.live/badges/denon-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/denon-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.denon.png?downloads=true)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.denon/workflows/Test%20and%20Release/badge.svg)

# ioBroker.denon

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub

## Адаптер Denon/Marantz AVR для ioBroker

Управляйте своим AV-ресивером Denon или Marantz через ioBroker: питание, громкость, вход, режим объемного звучания, зоны 2/3, тюнер и множество настроек звука и видео. Изменения, внесенные на ресивере (например, с помощью пульта дистанционного управления), мгновенно отображаются в ioBroker.

[🇩🇪 Немецкая документация](https://github.com/iobroker-community-adapters/ioBroker.denon/blob/master/docs/de/README.md)

## Отказ от ответственности

DENON и Marantz являются товарными знаками компании D\&M Holdings Inc. Разработчики данного модуля никоим образом не связаны с компанией D\&M Holdings Inc., а также с ее дочерними компаниями, логотипами или товарными знаками.

## Быстрый старт

1. На ресивере установите параметр "Сеть" → "Управление сетью" в положение **"Всегда включено"** (подробности [ниже](#network-setup-of-the-av-receiver) ).
2. В ioBroker откройте вкладку "Адаптеры", найдите **Denon** и нажмите "+".
3. Введите IP-адрес приемника в настройках экземпляра (или выберите его из списка найденных устройств) и сохраните.
4. Через несколько секунд `info.connection` Загорается зеленый индикатор, и в разделе «Состояние вашего приемника» отображаются данные о его состоянии. `denon.0`.

Вот и всё. Какие именно состояния создаются, зависит от модели: адаптер создает только то, что поддерживает ваш приемник.

Требования: AV-ресивер Denon или Marantz в сети (LAN или WLAN), Node.js >= 22.19, js-controller >= 7.2.5, admin >= 8.3.5.

## Наиболее важные штаты

Для VIS, Blockly или скриптов этого обычно достаточно (`zone2` и `zone3` работает так же, как `main`):

| Состояние                   | Цель                                                    | Пример                                               |
| --------------------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| `denon.0.system.power`      | весь приемник включен / в режиме ожидания               | `true` = включено, `false` = все выключено            |
| `denon.0.main.power`        | основная зона только включение/выключение               | `true`                                               |
| `denon.0.main.volume`       | громкость (0 ... 98, как на дисплее)                    | `40`                                                 |
| `denon.0.main.mute`         | немой                                                   | `true`                                               |
| `denon.0.main.input`        | выбрать ввод                                            | `TV` или имя из меню приемника, например. `TV Audio` |
| `denon.0.main.quickSelect`  | Быстрый выбор с функцией вызова (Marantz: Smart Select) | `1`                                                  |
| `denon.0.main.surroundMode` | режим объемного звучания                                | `STEREO`                                             |
| `denon.0.info.connection`   | подключен к приемнику                                   | `true`                                               |

Кнопки, такие как `main.volumeUp` или `remote.up` запускаются с помощью `true` Все остальные штаты: [Все штаты](/#/docs/adapterref/iobroker.denon/docs/en/states.md) .

## Конфигурация

Обычно достаточно ввести только IP-адрес.

| Параметр                                       | Значение                                                                                                                                                                                                                                  |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IP-адрес получателя                            | например `192.168.1.50` (IPv6 и имена хостов также работают). Во время работы экземпляра предлагаются найденные в сети приемники. Поиск находит только устройства в той же сети, что и ioBroker, в противном случае введите адрес вручную. |
| Интервал обновления (мс)                       | Частота считывания значений, которые приемник не сообщает самостоятельно (например, таймер сна). Значение по умолчанию 7000 = каждые 7 секунд.                                                                                            |
| Пауза между командами (мс)                     | Увеличивайте значение только в том случае, если получатель пропускает команды. Значение по умолчанию — 100, минимум — 50.                                                                                                                 |
| Порт                                           | Всегда 23. Меняйте это значение только для преобразователя последовательного порта в сетевой.                                                                                                                                             |
| Автоматическое определение марки, модели и зон | Рекомендуется. При запуске считывает марку, модель и количество зон с ресивера. Управление всегда осуществляется через порт 23.                                                                                                           |

## Настройка сети AV-ресивера

1. Нажмите кнопку SETUP на пульте дистанционного управления, меню появится на переднем дисплее и на телевизоре.
2. Выберите «Сеть» → «Настройки» и выполните настройку.
   - DHCP: Включено, если доступен DHCP-сервер (например, маршрутизатор), в противном случае задайте IP-адрес, маску подсети и шлюз вручную.
   - Прокси: "Выкл"
3. Выберите «Сеть» → «Управление сетью» (на некоторых моделях «Управление IP») и установите значение **«Всегда включено»** . При значении «Выкл. в режиме ожидания» ресивер игнорирует сетевые команды в режиме ожидания и не может быть включен с помощью ioBroker.

Совет: задайте получателю фиксированный IP-адрес в настройках маршрутизатора, чтобы адрес не менялся.

## Часто задаваемые вопросы

** `info.connection` не становится зелёным**

- Правильный ли IP-адрес? Он отображается в меню ресивера в разделе «Сеть» → «Информация» или в списке устройств вашего маршрутизатора.
- Приёмник поддерживает только **одно** управляющее соединение. Если им управляет другое приложение (Home Assistant, второй ioBroker, скрипт), адаптер не получает никакого соединения.
- Включен ли параметр "Управление сетью" в значение "Всегда включено"?

**Приёмник не включается**

- Вероятно, для параметра "Управление сетью" установлено значение "Выкл. в режиме ожидания". Установите значение "Всегда включено".

**Отсутствует государство**

- Адаптер только создает состояния, на которые реагирует ресивер. Если какое-либо из них отсутствует, ваша модель не имеет этой функции (например, басы/высокие частоты во второй зоне на AVR-X2200W).
- Некоторые значения отображаются только во время работы зоны.

**В списке отсутствует элемент ввода или он имеет другое имя.**

- Список формируется на основе настроек приемника: скрытые в меню приемника входы также скрыты здесь, переименованные входы отображают новое имя. После внесения изменений в настройках приемника перезапустите экземпляр.

**Отсутствуют кнопки отображения, закрытия или воспроизведения.**

- В моделях с системой HEOS (примерно с 2016 года) эта информация не передается через управляющее соединение.
- Для управления воспроизведением, отображения информации о воспроизведении и обложки на этих моделях, помимо данного адаптера, используется [адаптер HEOS](https://github.com/withstu/ioBroker.heos) . Оба устройства могут работать одновременно.

## Обновление с версии 1.x

В версии 2.0 все состояния переименованы (например) `zoneMain.powerZone` →`main.power`) и удаляет старое дерево объектов при первом запуске. Необходимо будет скорректировать скрипты, VIS и псевдонимы, настройки истории состояний будут потеряны. Пожалуйста, сначала сделайте резервную копию. Полная таблица старая → новая: [Обновление с версии 1.x](/#/docs/adapterref/iobroker.denon/docs/en/upgrade-1x.md)

## Все штаты и подробности

- [Все штаты](/#/docs/adapterref/iobroker.denon/docs/en/states.md) – описание каждого штата.
- [Многозонные усилители (DENON POA-3012CI)](/#/docs/adapterref/iobroker.denon/docs/en/states.md#multi-zone-amplifiers-denon-poa-3012ci)
- [Технические характеристики](/#/docs/adapterref/iobroker.denon/docs/en/states.md#technical-details) – подключение, управление скоростью, различия между Denon и Marantz.

## Отсутствующие функции и ошибки

Если у вас отсутствуют какие-либо функции или вы обнаружили ошибку, пожалуйста, создайте [заявку](https://github.com/iobroker-community-adapters/ioBroker.denon/issues) . Добавьте, пожалуйста, отладочный лог и модель вашего приемника.

Версия 2.0 протестирована с ресивером Denon AVR-X2200W. Тестировщики сообщили о её работоспособности с Marantz CINEMA 60 и Marantz SR6011.

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы @foxriver76 ( <https://github.com/foxriver76> ), который разрабатывал предыдущие версии этого адаптера.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.3 (2026-11-20)
* (Schimi1983) README: hint to the HEOS adapter for playback and now playing on HEOS models
* (Schimi1983) Marantz Cinema: new state `main.audio.autoLipSync`, `tuner.preset` shows `0` when no preset is selected (`TPANOFF`)

### 2.0.2 (2026-11-19)
* (Schimi1983) new settings from the Marantz Cinema protocols: M-DAX, IMAX Enhanced, DAC filter, illumination; Bass Sync
* (Schimi1983) README shortened: list of all states and upgrade table moved to the docs folder

### 2.0.1 (2026-11-19)
* (Schimi1983) value lists are updated with extendObject instead of setObject, old workflow file removed (#451)
* (Schimi1983) Marantz Cinema: option lines (`OPINF…`) are no longer logged as unhandled
* (Schimi1983) audio signal code 12 is shown as "No signal" (Marantz Cinema sends it in standby)

### 2.0.0 (2026-11-17)
* (Schimi1983) **Breaking change:** complete rework of the adapter. All states have new names (e.g. `zoneMain.powerZone` → `main.power`), the old object tree is deleted on the first start. Scripts, VIS and aliases must be adjusted, see "Upgrade from 1.x" in the README
* (Schimi1983) stable connection with automatic reconnect, new configuration page, input names from the receiver, states only for functions the receiver supports
* (Schimi1983) requires Node.js 22.19 or newer, js-controller 7.2.5 or newer and admin 8.3.5 or newer
* (Schimi1983) adapter is now maintained by iobroker-community-adapters

Older changes can be found in CHANGELOG_OLD.md

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2026 Moritz Heusinger <moritz.heusinger@gmail.com>

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