---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/state-changes.md
title: ioBroker.shelly
hash: rkeOdF+pLvPvPPWG9ZwdD/ZmWNTbeaEbYr5z++0cs3U=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/state-changes.md).

## Изменения состояния
В стандарте состояние обновляется только при изменении значения. В этом случае функция *Обновлять объекты, даже если значения не изменяются* отключена.

Пример:

* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (время последнего изменения: 01.02.2020 10:20:00)`
* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (время последнего изменения: 1 февраля 2020 **10:20:00**)` - обновление статуса не происходит в ioBroker
* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (время последнего изменения: 01.02.2020 10:22:00)`

Если установлен флажок *Обновлять объекты, даже если значения не изменяются*, все состояния будут постоянно обновляться, даже если значения не изменяются. Так что меняется только время последнего обновления.

Пример:

* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (время последнего изменения: 01.02.2020 10:20:00)`
* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (последнее изменение времени: 01.02.2020 **10:21:00**)` - время обновляется, хотя там не изменилось ли значение
* `shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (время последнего изменения: 01.02.2020 10:22:00)`