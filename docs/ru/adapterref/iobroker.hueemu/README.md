---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.hueemu
BADGE-stable: https://iobroker.live/badges/hueemu-stable.svg
BADGE-Installations: https://iobroker.live/badges/hueemu-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.hueemu
BADGE-Test and Release: https://github.com/krobipd/ioBroker.hueemu/actions/workflows/test-and-release.yml/badge.svg
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
hash: /+IMDZURCS6yAruQpWwJkX/LJscZe+sIM4TLeU+6hPA=
---
# hueemu — мост Philips Hue для устройств, поддерживающих только технологию Hue.

Этот адаптер позволяет ioBroker выглядеть как **мост Philips Hue** (мост версии 2, модель BSB002) в вашей локальной сети. Любое устройство, способное управлять светильниками Hue через API Hue — концентратор Logitech Harmony, старая модель Echo, настенная панель, заброшенное приложение для панели управления — видит опубликованные вами светильники и переключает их. Клиенты, которые ищут устройство в сети через SSDP (Alexa, Harmony), находят мост самостоятельно; любому другому клиенту присваивается его IP-адрес. За каждым из этих «светильников» скрывается состояние ioBroker по вашему выбору.

Это аналог настоящего моста: вместо аппаратного обеспечения Philips, ответ принимает ваш экземпляр ioBroker — и предлагаемые им светильники могут быть любыми, известными дереву объектов, от лампочки Zigbee до диммера KNX и реле в контроллере отопления.

> **Если ваш голосовой помощник поддерживает Matter, используйте [адаптер Matter](https://github.com/ioBroker/ioBroker.matter) .** Все современные устройства Alexa, Google Home и Apple Home поддерживают Matter, что является лучшим вариантом во всех отношениях. Этот адаптер предназначен для клиентов, у которых нет и никогда не будет возможности использовать Matter.

## Требования

- Node.js 22 или более поздняя версия
- js-controller 7.2.5 или новее
- admin 8.3.5 или новее
- Клиент и хост ioBroker находятся в **одной локальной сети.**

## Настройка

### 1. Создайте экземпляр.

Установите адаптер и создайте один экземпляр. Экземпляр будет создан **в остановленном состоянии** : сначала выберите хост/IP-адрес и порт (шаги 2 и 3), затем запустите его. Он будет прослушивать порт 8080, если вы не выберете другой.

### 2. Хост / IP-адрес

Оставьте **поле "Хост/IP"** включенным. `0.0.0.0` ("\[IPv4] 0.0.0.0 - Прослушивать все IP-адреса"). Затем мост прослушивает все сети вашего хоста ioBroker и сообщает каждому клиенту адрес хоста в сети этого клиента — он никогда не выбирает один адрес самостоятельно.

Указывайте конкретный адрес только в том случае, если мост должен обслуживать **только одну сеть** : тогда он будет прослушивать и отвечать только в этой сети. Список принадлежит ioBroker и отображает все IPv4-адреса хоста, включая 127.0.0.1 — при выборе этого адреса мосту будет доступен только сам хост ioBroker.

### 3. Порт

`8080` Это значение по умолчанию, работающее с хабом Harmony.

**Для работы Alexa требуется порт 80, а более новые устройства Echo также пытаются использовать HTTPS на порту 443.** Для Alexa установите **порт** на `80` Для более новых моделей Echo также включите параметр **«Использовать HTTPS»** и установите **порт HTTPS** на `443` Для порта с номером ниже 1024 требуется право на его привязку — установщик ioBroker предоставляет это право Node.js в Linux; если в логах указано, что порт не может быть привязан, значит, это право отсутствует.

В данном случае **HTTPS** — это вариант, и это уже ваш вопрос:

- HTTPS доступен только для более новых моделей Echo, которые также пытаются использовать порт 443 — поэтому порт HTTPS должен быть следующим: `443`.
- Устройство Harmony использует только HTTP, как и сетевые объявления и более старые модели Echo: включение HTTPS ничего не дает Harmony, и HTTP всегда продолжает работать.
- HTTPS здесь ничем не защищает: Echo не проверяет сертификат, и HTTP остается открытым рядом с ним.

При включенной опции **«Использовать HTTPS»** мост использует сертификат, выбранный в полях сертификатов, из ioBroker (системные настройки → Сертификаты; собственная пара сертификатов ioBroker, если вы не выбрали ни один, или наборы сертификатов Let's Encrypt из адаптера acme в качестве опции). Сертификат, которого нет у ioBroker, или HTTPS без порта HTTPS, останавливает экземпляр с уведомлением до тех пор, пока вы не исправите настройки. Если более ранняя версия использовала HTTPS, обновление автоматически включит опцию **«Использовать HTTPS»** .

**Параметр Trust X-Forwarded-\* headers** остается отключенным, если адаптер не находится за обратным прокси-сервером, которому вы доверяете и который удаляет предоставленные клиентом заголовки пересылки. Это лишь изменяет отображаемый в журнале отладки адрес клиента.

**Удаление точек данных** — когда адаптер перестаёт предоставлять точку данных (например, удалённый индикатор на его карте или объект более ранней версии), он её удаляет. Функция **«Удалять точки данных с записью** » (вкл.) определяет, будет ли это также относиться к записанной вами точке данных (история, SQL, InfluxDB); если выключена, она остаётся, и журнал её учитывает. **Функция «Удалять также записанные данные»** (выкл., отображается с первым вариантом) заставляет каждый экземпляр записи сначала удалить свои собственные данные.

### 4. Опубликуйте информацию о своих источниках света.

Откройте вкладку **«Устройства»** . Каждая карта представляет собой один индикатор, предоставляемый мостом.

**Автоматически** — нажмите **«Поиск источников света»** . Адаптер просматривает дерево объектов в поисках элементов, которые ведут себя как источники света (выключатель, диммер, лампа с цветовой температурой, цветная лампа), и отображает найденные элементы в виде контрольного списка. Отметьте нужные элементы; будут добавлены только они. Все найденные элементы, которые не удалось сопоставить, будут учтены в последующем сообщении, поэтому ничего не исчезнет незаметно.

**Вручную** — нажмите **«Добавить светильник»** , дайте ему имя, выберите тип светильника и с помощью обозревателя объектов укажите для каждого поля состояние ioBroker.

| Световой тип             | Что видит клиент                                               |
| ------------------------ | -------------------------------------------------------------- |
| **Вкл/Выкл**             | Включение и выключение (отображается как регулируемая яркость) |
| **Регулировка яркости**  | Включение/выключение и яркость                                 |
| **Цветовая температура** | Вкл/выкл, яркость, теплый-холодный белый                       |
| **Цвет**                 | Вкл/Выкл, яркость, полноцветный режим                          |
| **Цвет без белого**      | Вкл/выкл, яркость, цвет, ползунок «Без белого»                 |

Например, светодиодная лента, имеющая цвет, но не имеющая белой температуры, вручную устанавливается в **режим «Цвет» без белого** ; поиск выдает все цветные лампы как **«Цвет»** .

Номер каждого светильника сохраняется навсегда: удаление или изменение порядка светильников ничего не меняет для остальных, поэтому сценарии Alexa продолжают указывать на лампы, с которыми они были настроены. Изменение в карточках вступает в силу немедленно, без перезапуска. Светильник может указывать на точку данных, которую не подтверждает ни одно устройство — например, из `0_userdata` Это может быть сценарий или визуализация — и мост будет следовать за каждым его изменением точно так же.

### 5. Сопряжение клиента

Клиент сможет подключиться только после того, как вы откроете окно сопряжения — это эквивалентно нажатию кнопки на реальном мосте.

1. В разделе « **Объекты** ioBroker» установите `hueemu.0.startPairing` к `true`
2. В течение **50 секунд** запустите поиск устройства в вашем клиенте.
3. Новая запись в разделе `hueemu.0.clients.` подтверждает пару

**Alexa (старые модели Echo):** приложение Alexa → Устройства →`+` → Philips Hue → **Philips Hue V1** . Если у вас несколько устройств Echo, пусть поиск выполняет только одно. Устройства Echo первого поколения больше не поддерживают этот путь. Alexa обрабатывает максимум 49 светильников на один мост — при большем количестве она не найдет ни одного. Используйте один эмулированный мост на одну учетную запись Alexa: два экземпляра объявляют свои светильники под одними и теми же идентификаторами, и Alexa их путает.

**Harmony:** Настольная программа MyHarmony → Устройства → Добавить устройство → Поиск устройств (или Освещение → Philips Hue).

## Шкалы значений — на что обращать внимание, если цвет выглядит неправильно.

Адаптеры ioBroker хранят одно и то же значение в разных единицах измерения. Оттенок хранится в градусах (0–360) одним адаптером и в собственном формате Hue (0–65535) другим; цветовая температура измеряется в Кельвинах, а яркость — в процентах или в исходном формате (0–254).

Адаптер считывает единицу измерения и диапазон значений из состояния, к которому он привязан, и самостоятельно устанавливает шкалу при каждом запуске — как для найденных в результате поиска источников света, так и для источников света, добавленных вами вручную, и это применяется как к чтению, так и к записи. Если состояние ничего не говорит о единице измерения или диапазоне — что происходит, например, с цветовой температурой адаптера Zigbee, — адаптер переключается на чтение значения и записывает его обратно тем же способом, которым он его считал.

Поэтому, если индикатор реагирует, но отображает неправильный цвет, неправильный оттенок белого или переключается на максимальную яркость, откройте его карту памяти и установите шкалу вручную — параметр «Автоматический (на основе данных)» позволяет адаптеру самостоятельно определять параметры:

- **Яркость / Насыщенность** —`Percent (0..100)` для типичного `level.dimmer`, `Normalized (0..1)`, `Raw (1..254 Hue)` для источника, который уже использует собственную линейку продуктов Hue, или `Byte (0..255)`
- **Оттенок** —`Degrees (0..360)` для обычного состояния цвета ioBroker, `Native (no conversion)` для 0–65535
- **Цветовая температура** —`Kelvin` для штата со значениями в диапазоне 2700–6500, `Native (no conversion)` для mired (примерно 153–500), `Percent (0..100, 0 = cold)` для штата, где значения температуры в процентах варьируются от самой низкой до самой высокой.

Установленная вами шкала относится к тому состоянию, для которого она была установлена: если привязать другую шкалу к карточке и оставить шкалу как есть, она вернется в режим «Автоматический» — выберите шкалу на том же шаге, чтобы сохранить ее.

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
├── clients/       — one entry per paired client
│   └── <model>-<xxxx> — the device type that client paired with; xxxx are the last four characters of its key, which stays in the instance data folder
└── lights/        — the lights the bridge offers
    └── <n>        — one light, named as on its card; n is its Hue light number
```

`info.connection` Это быстрый ответ на вопрос «работает ли он вообще?». Запуск может завершиться неудачей по причинам, которые не отображаются в списке экземпляров. В этом случае появляется ошибка системы — например, порт уже занят. `info.error` Как есть; при возникновении проблемы адаптер диагностирует её самостоятельно (порт не задан, сетевой адрес недоступен). `info.error` шоу `Unknown` А в журнале содержится пояснение.

Сопряжённый клиент удаляется путём удаления его записи в соответствующем разделе. `hueemu.0.clients` — его ключ сразу перестаёт работать.

Клиенты Hue видят, что светильник недоступен, если состояние, которое его переключает — без него, состояние яркости — отсутствует (удалено или опечатка в карточке), а также если светильник вообще не привязан ни к какому состоянию. Отсутствие состояния цвета само по себе делает его доступным. Светильник, удаленный при... `hueemu.0.lights` Мгновенно исчез с моста, словно удаленный с карты памяти.

`disableAuth` Это вспомогательное средство для обслуживания, а не настройка, которую следует оставлять включенной: с его помощью каждое устройство в вашей сети может управлять освещением без сопряжения, и каждый запрос на сопряжение будет удовлетворен.

## Порты, используемые адаптером

| Порт | Протокол | Зачем                                | Настраиваемый                                                     |
| ---- | -------- | ------------------------------------ | ----------------------------------------------------------------- |
| 8080 | TCP      | Сам API Hue (Alexa: 80)              | Да — клиенты изучают это через SSDP.                              |
| 1900 | УДП      | обнаружение, чтобы клиенты вас нашли | Нет — это исправлено стандартом UPnP.                             |
| —    | TCP      | необязательный HTTPS (Alexa: 443)    | Да, отключено, если не включен **параметр «Использовать HTTPS».** |

## Поиск неисправностей

**Клиент не обнаруживает мост.** Убедитесь, что UDP-порт 1900 не заблокирован между клиентом и хостом ioBroker, и что оба находятся в одном сетевом сегменте — гостевая сеть или отдельная VLAN не будут работать без дополнительной маршрутизации: мост отвечает только клиентам в сети, частью которой является сам хост ioBroker. Для Alexa см. порт 80 и HTTPS 443 выше.

**Сопряжение не удалось.** `startPairing` должно быть `true` **Перед** началом поиска в клиентском приложении окно составляет всего 50 секунд. Клиент, который подключается, запрашивая ключ, снова закрывает окно — так же поступает и настоящий мост; клиент, который получает доступ во время поиска индикаторов, оставляет окно открытым до истечения 50 секунд.

**Световой индикатор загорается, но не реагирует.** Убедитесь, что заданное вами состояние действительно доступно для записи. Состояние состояния (датчик, отображающий информацию, сообщаемую устройством) можно прочитать, но нельзя записать, поэтому индикатор будет показывать значение и игнорировать все команды.

**Свет отображает неправильный цвет или яркость.** См. раздел «Шкалы значений» выше.

**Возврат к более старой версии** не поддерживается. В версиях 1.19.0 и более ранних идентификатор моста и светильники сохраняются в настройках экземпляра и не обнаруживаются на новых местах: создается новый идентификатор, поэтому каждому клиенту приходится заново искать мост и выполнять сопряжение, и светильники не отображаются, пока вы не добавите их заново. В версиях ниже 1.18.0 более старые версии также больше не находят адрес прослушивания под новым ключом и нумеруют светильники заново, поэтому Alexa видит другие светильники.

**Вы родом из старого поколения. `createLight` Настройка.** Ваши светильники автоматически переключаются при первом запуске, без перезагрузки. Ничего не нужно делать вручную. Стоит сделать это позже: старый подход использовал внутренние состояния адаптера в качестве посредников, что требовало скрипта для управления реальным устройством. Теперь вы можете направлять каждый светильник непосредственно на состояние устройства и добавить этот скрипт.

## Конфиденциальность

Адаптер взаимодействует только с устройствами в вашей собственной сети; он не имеет подключения к облаку и самостоятельно ничего не отправляет в интернет.

Функция отправки сообщений об ошибках через Sentry активна по умолчанию; что именно она отправляет и как её отключить, описано в [разделе Sentry основного файла README](https://github.com/krobipd/ioBroker.hueemu/blob/main/README.md#sentry--error-reporting) .

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.0.0 (2026-11-20)

- New: Two new options decide whether a vanished datapoint you record is deleted and whether its recorded data goes too.
- Changed: The bridge now answers only clients in its own networks, with a chosen address only those in that network.
- Changed: Saving the settings can no longer reset the bridge identity.
- Changed: A damaged identity file stops the start with an error.
- Changed: The lights moved from the settings into the object tree (lights) — a change in the device manager takes effect without a restart.
- Changed: A paired client's object is now named after its device type, e.g. clients.harmony-hub-ac37; every pairing stays.
- Improved: The keys of paired clients no longer show in the object tree.
- Changed: An alias on a paired client's object follows it to the new object.
- Changed: Going back to 1.19.0 or older is not supported — that version creates a new bridge identity and finds no lights.
- Changed: The undocumented /health route is gone.
- Changed: Pairing has no limit any more — every device that asks within the 50 seconds is paired.
- Fixed: A text switch (e.g. EIN/AUS) that a client switched on is now read back as on.
- Fixed: A light bound to another datapoint no longer keeps the old datapoint's scale.
- Fixed: A client's pairing date no longer changes with every rename or object update.
- Fixed: A UDN or MAC that is not text no longer stops the start.
- Fixed: A stray write to one of the adapter's read-only datapoints is no longer confirmed.
- Fixed: Opening the device manager right after the instance started no longer fails.
- Fixed: A new instance shows "Unknown" as the reason until its first start instead of an empty text.
- Fixed: A bridge that cannot start, for example on a taken port, now ends with an error and js-controller restarts it.
- New: A wrong setting, for example an invalid port, stops the instance with a notification in the admin — it starts again when you save the settings.
- Changed: Listening on all addresses, the bridge now works in every network of the host.
- Fixed: A message the adapter does not know (sendTo from a script) now gets an error answer instead of none.
- New: Light type "Color without white".
- Improved: A chosen address the host does not have no longer stops the bridge — it listens on every address and warns once.
- Improved: The settings always open on the first tab, Configuration.
- Changed: HTTPS is switched on with the new option "Use HTTPS" and takes a certificate ioBroker holds instead of its own; an HTTPS port set before keeps HTTPS on.

### 1.19.0 (2026-09-25) — stable

- Fixed: With an HTTPS port the instance no longer restarts endlessly — the certificate key is now really stored encrypted, and a key that does not fit its certificate is replaced.
- Fixed: Clients that send no or another content type (phue, curl) can pair and switch again instead of getting error 901 from the bridge.
- Fixed: The number of a deleted light is never handed out again, not even the highest one — Alexa no longer mistakes a new lamp for the old one.
- New: Color temperature in percent (e.g. tradfri) and brightness from 0 to 255 are recognized and converted, and both can be chosen by hand on the light's card.
- Improved: Values are fitted to the target datapoint — clamped to its range, never written into a read-only state, and a text switch gets its own ON/OFF.
- Fixed: Switching off with a brightness in the same command now stays off for every light, and a group the bridge does not have no longer switches all lights.
- Fixed: Deleting a paired client in the admin now revokes its access at once instead of only at the next restart of the instance.
- Improved: The light search also finds relays and dimmers assigned to the function Light, and offers a lamp with a device and channel level only once.
- Fixed: openHAB's Hue binding can read the bridge again (time stamps in the bridge's format), and a color set by hue and saturation is shown as such in apps.

### 1.18.0 (2026-09-15) — stable

- Changed: The listen address and port are now stored under the standard keys the admin's port-conflict check reads — another adapter set to the bridge's port is warned before it collides.
- Improved: Your configured Host / IP address survives the update unchanged — nothing to re-enter, and the bridge keeps listening where it did before.
- Fixed: Every light now keeps its number for good — deleting or reordering a light no longer shifts the others, so Alexa keeps switching the lamp it was set up with (numbered once, one restart).
- Fixed: A light whose datapoint is written by a script, vis or 0_userdata now follows every change — the bridge used to ignore values no device had confirmed.
- Fixed: A dimmer without an on/off state is no longer offered and stored again on every "Search lights" run, and a light named by a translated object name is offered under that name instead of its id.
- Fixed: Two lights bound to the same datapoint get two separate cards — deleting the second one used to remove the first.
- Fixed: A client that pairs while the bridge is still loading its client list no longer risks being refused until the next restart.
- Fixed: A light whose datapoint was deleted now reports itself unreachable with default values instead of serving the last value it had seen.
- Changed: A state attribute no Hue light has is answered with the bridge's own error 6 instead of a success — for single lights and groups alike.

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