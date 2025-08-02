---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/debug.md
title: ioBroker.shelly
hash: jewN0ODcNYhVW2t/1J05+xr6ZHrxICAjpV86oZ5wjQE=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/debug.md).

## Отладка
*Отладка доступна только для устройств поколения 2+*

### Требования
- Устройство поколения 2+
— Экземпляр адаптера Shelly в режиме MQTT (версия >= 6.0.0)

### Включить отладку
1. Режим отладки необходимо включать отдельно на каждом устройстве Shelly. Для этого можно использовать либо веб-интерфейс, либо состояние `<device-id>.Sys.debugEnabled`.
2. Чтобы сообщения отладки записывались в стандартный журнал ioBroker (уровень журнала «info»), в экземпляре должна быть активирована конфигурация «Журнал отладочных сообщений» (по умолчанию — «false»).

Все отладочные сообщения в журнале начинаются с `[Shelly Debug Message] ...`.
