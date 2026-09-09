---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"},"de/adapterref/iobroker.shelly/devicemanager.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/devicemanager.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/debug.md
title: ioBroker.shelly
hash: kIw784MdBVbNBrhrZZKYq1BwixEUGbncL20Cz5j51BY=
---
![логотип](../../../de/admin/shelly.png)

# ioBroker.shelly

Это немецкая версия документации - [🇺🇸 Английская версия](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/master/docs/en/debug.md)

## Отлаживать

_Функция отладки доступна только для устройств второго поколения и старше._

### Требования

- Устройство Gen 2+
- Экземпляр адаптера Shelly в режиме MQTT (версия >= 6.0.0)

### Включить отладку

1. Режим отладки необходимо активировать отдельно на каждом устройстве Shelly. Это можно сделать либо через веб-интерфейс, либо проверив состояние устройства.`<device-id>.Sys.debugEnabled` .
2. Для обеспечения записи отладочных сообщений в стандартный журнал ioBroker (уровень логирования)`info` ), конфигурацию необходимо настроить в экземпляре.`Debug-Meldungen protokollieren` быть активирован (по умолчанию)`false` ).

Все отладочные сообщения в журнале начинаются с`[Shelly Debug Message] ...`