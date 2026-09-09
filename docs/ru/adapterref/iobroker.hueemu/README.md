---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.hueemu
BADGE-stable: https://iobroker.live/badges/hueemu-stable.svg
BADGE-Installations: https://iobroker.live/badges/hueemu-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.hueemu
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hueemu/README.md
title: hueemu - мост Philips Hue для устройств, поддерживающих только технологию Hue.
hash: 34DmJv3YSamzrLW0m1MRqv+ItKyMOdXAHlPQY9yPz/4=
---
# hueemu — мост Philips Hue для устройств, поддерживающих только технологию Hue.

Этот адаптер позволяет ioBroker выглядеть как **мост Philips Hue** (мост версии 2, модель BSB002) в вашей локальной сети. Любое устройство, способное управлять светильниками Hue — концентратор Logitech Harmony, старая модель Echo, настенная панель, заброшенное приложение для панели управления — находит мост, видит опубликованные вами светильники и переключает их. За каждым из этих «светильников» скрывается состояние ioBroker по вашему выбору.

Это аналог настоящего моста: вместо аппаратного обеспечения Philips, ответ принимает ваш экземпляр ioBroker — и предлагаемые им светильники могут быть любыми, известными дереву объектов, от лампочки Zigbee до диммера KNX и реле в контроллере отопления.

> **Если ваш голосовой помощник поддерживает Matter, используйте [адаптер Matter](https://github.com/ioBroker/ioBroker.matter) .** Все современные устройства Alexa, Google Home и Apple Home поддерживают Matter, что является лучшим вариантом во всех отношениях. Этот адаптер предназначен для клиентов, у которых нет и никогда не будет возможности использовать Matter.

## Требования

- Node.js 22 или новее
- js-controller 7.2.2 или новее
- admin 8.0.11 или новее
- Клиент и хост ioBroker находятся в **одной локальной сети.**

## Настройка

### 1. Создайте экземпляр.

Установите адаптер и создайте один экземпляр. Он запустится на порту 8080 и сразу же объявит о себе в сети — перед запуском ничего настраивать не нужно.

### 2. Хост / IP-адрес

Оставьте **поле "Хост/IP"** включенным.`0.0.0.0` («слушать на всех интерфейсах»). Затем адаптер вычисляет маршрутизируемый адрес вашего хоста ioBroker и объявляет его клиентам.

Указывайте конкретный адрес только в том случае, если ваш хост находится в **нескольких сетях** , а клиент может получить к нему доступ только из одной из них.

### 3. HTTP-порт

`8080` Это значение по умолчанию, работающее с хабом Harmony.

**В некоторых версиях прошивки Alexa мост обнаруживается только на порту 80.** Если Alexa не обнаруживает мост, установите порт на`80` В Linux для портов ниже 1024 обычно требуются дополнительные привилегии для процесса ioBroker — если адаптер не может привязать порт 80, то причина именно в этом.

### 4. Опубликуйте информацию о своих источниках света.

Откройте вкладку **«Устройства»** . Каждая карта представляет собой один индикатор, предоставляемый мостом.

**Автоматически** — нажмите **«Поиск источников света»** . Адаптер просматривает дерево объектов в поисках элементов, которые ведут себя как источники света (выключатель, диммер, лампа с цветовой температурой, цветная лампа), и отображает найденные элементы в виде контрольного списка. Отметьте нужные элементы; будут добавлены только они. Все найденные элементы, которые не удалось сопоставить, будут учтены в последующем сообщении, поэтому ничего не исчезнет незаметно.

**Вручную** — нажмите **«Добавить светильник»** , дайте ему имя, выберите тип светильника и с помощью обозревателя объектов укажите для каждого поля состояние ioBroker.

| Световой тип             | Что видит клиент                         |
| ------------------------ | ---------------------------------------- |
| **Вкл/Выкл**             | включено и выключено                     |
| **Регулировка яркости**  | Включение/выключение и яркость           |
| **Цветовая температура** | Вкл/выкл, яркость, теплый-холодный белый |
| **Цвет**                 | Вкл/Выкл, яркость, полноцветный режим    |

### 5. Сопряжение клиента

Клиент сможет подключиться только после того, как вы откроете окно сопряжения — это эквивалентно нажатию кнопки на реальном мосте.

1. В разделе « **Объекты** ioBroker» установите`hueemu.0.startPairing` к`true`
2. В течение **50 секунд** запустите поиск устройства в вашем клиенте.
3. Новая запись в разделе`hueemu.0.clients.` подтверждает пару

**Alexa (старые модели Echo):** приложение Alexa → Устройства →`+` → Philips Hue. **Harmony:** Настройка Harmony → Добавить устройство → Освещение → Philips Hue → найти bridge.

## Шкалы значений — что проверять, если цвет выглядит неправильно.

Адаптеры ioBroker хранят одно и то же значение в разных единицах измерения. Оттенок хранится в градусах (0–360) одним адаптером и в собственном формате Hue (0–65535) другим; цветовая температура измеряется в Кельвинах, а яркость — в процентах или в исходном формате (0–254).

Адаптер считывает единицу измерения и диапазон значений из состояния, к которому он привязан, и самостоятельно устанавливает шкалу при каждом запуске — как для найденных в результате поиска источников света, так и для источников света, добавленных вами вручную, и это применяется как к чтению, так и к записи. Если состояние ничего не говорит о единице измерения или диапазоне — что происходит, например, с цветовой температурой адаптера Zigbee, — адаптер переключается на чтение значения и записывает его обратно тем же способом, которым он его считал.

Поэтому, если индикатор реагирует, но отображает неправильный цвет, неправильный оттенок белого или переключается на максимальную яркость, откройте его карту памяти и установите шкалу вручную — параметр «Автоматический (на основе данных)» позволяет адаптеру самостоятельно определять параметры:

- **Яркость / Насыщенность** —`Percent (0..100)` для типичного`level.dimmer` ,`Normalized (0..1)` , или`Raw (1..254)` для источника, который уже использует собственный диапазон частот Hue.
- **Оттенок** —`Degrees (0..360)` для обычного состояния цвета ioBroker,`Native` для 0–65535
- **Цветовая температура** —`Kelvin` для штата со значениями в диапазоне 2700–6500,`Native` для mired (примерно 153–500)

## Светильники, не имеющие состояния включения/выключения.

Некоторые диммеры предлагают только регулировку яркости без отдельного переключателя — распространённый пример — диммерный канал HomeMatic. Они работают следующим образом: яркость сохраняется как включена/выключена. Значение источника 0 означает выключение, всё, что выше, — включение. Выключение записывает 0; включение записывает полную яркость, потому что источник, находящийся на значении 0, больше не знает, каким было его значение.

## Что в итоге оказывается в дереве объектов?

```
hueemu.0.
├── info/
│   ├── connection — whether the bridge is answering Hue clients
│   └── error      — why it is not (empty while everything works)
├── startPairing   — opens the pairing window for 50 seconds (button)
├── disableAuth    — accept every request without pairing (switch)
└── clients/       — one entry per paired client
    └── <name>     — the key that client uses
```

`info.connection` Это быстрый ответ на вопрос «работает ли он вообще?». Запуск может завершиться неудачей по причинам, которые не отображаются в списке экземпляров — например, HTTP-порт уже занят или нет доступного сетевого адреса — и тогда...`info.error` Просто и понятно доносит суть дела.

`disableAuth` Это вспомогательное средство для обслуживания, а не настройка, которую следует оставлять включенной: с его помощью каждое устройство в вашей сети может управлять освещением без сопряжения. В любом случае, количество новых клиентов ограничено 100 в час; одно предупреждение в журнале сообщит вам, когда этот лимит был достигнут.

## Порты, используемые адаптером

| Порт | Протокол | Зачем                                | Настраиваемый                         |
| ---- | -------- | ------------------------------------ | ------------------------------------- |
| 8080 | TCP      | сам API Hue                          | Да — клиенты изучают это через SSDP.  |
| 1900 | УДП      | обнаружение, чтобы клиенты вас нашли | Нет — это исправлено стандартом UPnP. |
| —    | TCP      | необязательный HTTPS                 | Да, отключено, если не указан порт.   |

## Поиск неисправностей

**Клиент не обнаруживает мост.** Убедитесь, что UDP-порт 1900 не заблокирован между клиентом и хостом ioBroker, и что оба находятся в одном сетевом сегменте — гостевая сеть или отдельная VLAN не будут работать без дополнительной маршрутизации. На хосте с несколькими сетевыми картами установите **Host / IP** на конкретный адрес локальной сети вместо`0.0.0.0` С помощью Alexa попробуйте порт 80.

**Сопряжение не удалось.**`startPairing` должно быть`true` **Перед** началом поиска в клиенте окно составляет всего 50 секунд. Оно закрывается после успешного сопряжения — так же работает и настоящий мост.

**Световой индикатор загорается, но не реагирует.** Убедитесь, что заданное вами состояние действительно доступно для записи. Состояние состояния (датчик, отображающий информацию, сообщаемую устройством) можно прочитать, но нельзя записать, поэтому индикатор будет показывать значение и игнорировать все команды.

**Свет отображает неправильный цвет или яркость.** См. раздел «Шкалы значений» выше.

**Вы родом из старого поколения.`createLight` Настройка.** Ваши светильники автоматически переключаются при первом запуске, и адаптер перезапускается один раз. Ничего не нужно делать вручную. Стоит сделать это позже: старый подход использовал внутренние состояния адаптера в качестве посредников, что требовало скрипта для управления реальным устройством. Теперь вы можете направлять каждый светильник непосредственно на состояние устройства и добавить этот скрипт.

## Конфиденциальность

Адаптер взаимодействует только с устройствами в вашей собственной сети; он не имеет подключения к облаку и самостоятельно ничего не отправляет в интернет.

Единственное исключение — это отправка сообщений об ошибках через Sentry, и только если вы включили диагностику в **системных настройках ioBroker → Диагностика и отправка сообщений об ошибках** . В этом случае при сбое передается анонимный идентификатор установки и техническая ошибка — без имени, адреса электронной почты, IP-адреса и информации о вашем регионе.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.17.1 (2026-09-07)

- Improved: The switch that turns off authentication now warns what it really does — every client on the network is then served without a key and can pair itself.

### 1.17.0 (2026-09-06)

- Fixed: Brightness and saturation left on "Auto" are now written in the unit the datapoint really uses — a percent dimmer no longer receives Hue values like 127 or 254.
- Fixed: The scale of a light added by hand is now determined from the datapoint as well, exactly like a light found by the search.
- Fixed: A pairing that could not be stored is no longer reported as successful — the client retries instead of losing access at the next restart.
- Fixed: A client key is now checked exactly as it was issued; a key that merely resembles a paired one is rejected.
- New: The instance now shows in the object tree whether the bridge is answering, and why not when it is not.
- Fixed: On a host with Docker or a VPN, the automatically announced address is now the real network address instead of a virtual one.
- Fixed: A light whose configured datapoint does not exist is reported as unreachable instead of pretending to work.
- Fixed: Edit and delete in the devices tab always act on the light you clicked, even when the list changed in the meantime.
- Improved: The first start after this update completes the scales of lights added earlier — if it finds anything to complete, the instance restarts once.

### 1.16.0 (2026-09-03)

- Fixed: If an action in the devices tab fails, you now get a message saying what went wrong instead of a dialog that never finishes.

### 1.15.2 (2026-09-03)

- Fixed: When a very old setup is upgraded, its already paired clients now get their proper name and explanation right away instead of after the next restart.

### 1.15.1 (2026-09-03)

- Fixed: Every datapoint of the adapter now carries a name and a short explanation in your admin language, paired clients included.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2020-2021 Christopher Holomek <holomekc.github@gmail.com>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_