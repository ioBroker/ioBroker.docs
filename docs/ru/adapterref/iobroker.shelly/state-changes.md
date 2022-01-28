---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-coap.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.shelly/master/docs/en/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/state-changes.md
title: ioBroker.шелли
hash: /CtJFOi7c6OZS8TDpUPQzlWXdoqcwtTIhw+TzVPRW/Q=
---
![логотип](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.шелли
## Изменения состояния
По умолчанию состояние обновляется только при изменении значения. В этом случае функция *Обновлять объекты, даже если значения не изменились* отключена.

Пример:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Время последнего изменения: 01.02.2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (время последнего изменения: 01.02.2020 **10:20:00**) - статус в ioBroker не обновляется
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Время последнего изменения: 01.02.2020 10:22:00)

Если вы активируете *Обновлять объекты, даже если значения не изменяются*, все состояния постоянно обновляются, даже если значения не изменяются. Так что меняется только время последнего обновления.

Пример:

* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (Время последнего изменения: 01.02.2020 10:20:00)
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'S' (время последнего изменения: 01.02.2020 **10:21:00**) - время обновляется хотя не было изменение значения
* shelly.0.SHBTN-1#A4CF12F454A3#1.Button.Event = 'L' (Время последнего изменения: 01.02.2020 10:22:00)