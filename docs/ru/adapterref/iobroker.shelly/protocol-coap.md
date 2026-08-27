---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/protocol-coap.md
title: ioBroker.shelly
hash: iM2D2Z+N9DE47HtPBt8tjmTYL6Ku1UZN5M5BsL4VzfE=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/protocol-coap.md)

## CoAP (CoIoT)
**Протокол CoAP/CoIoT поддерживается только устройствами первого поколения (Gen1) — устройства Plus и Pro (Gen2) этот протокол не поддерживают!**

![iobroker_general_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_general_coap.png)

**Если используется версия прошивки выше 1.9.4, на устройствах Shelly необходимо настроить сервер CoIoT (одноадресная передача).**

В качестве IP-адреса сервера ioBroker необходимо указать сервер CoIoT, а затем порт `5683`. Например, если ioBroker доступен по адресу `192.168.1.2`, то необходимо указать `192.168.1.2:5683` и активировать CoIoT.

![shelly_coap](../../../de/adapterref/iobroker.shelly/img/shelly_coap.png)

**После внесения этих изменений устройство Shelly необходимо перезагрузить!**

CoAP/CoIoT добавляет все устройства в сеть. Если необходимо исключить отдельные устройства, их можно настроить в черном списке. Для этого необходимо ввести их серийные номера в таблицу.

![iobroker_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_coap.png)

### Более старые версии прошивки
Если используется устройство Shelly с версией прошивки 1.9.4 или ниже, дополнительная настройка не требуется. Адаптер автоматически обнаружит устройство.

**Важно: Поскольку CoAP/CoIoT использует многоадресные UDP-пакеты, устройства Shelly должны находиться в той же подсети, что и сервер ioBroker.**

### Важные инструкции
#### Docker
Если ioBroker работает в контейнере Docker, контейнер должен быть настроен в сетевом режиме `host` или `macvlan`. Если контейнер Docker работает в сетевом режиме `bridge`, устройства Shelly обнаружены не будут.

#### Прошивка Shelly 1.8.0 (или новее)
- При использовании протокола CoAP/CoIoT, начиная с этой версии, адаптер должен быть версии 4.0.0 (или новее).
Для устройств со старой версией прошивки (кроме Shelly 4 Pro) необходимо использовать адаптер версии 3.3.6 (или более раннюю). Адаптер версии 4.0.0 (или более поздняя) несовместим со старыми версиями прошивки!

#### Прошивка Shelly 1.9.4 (или новее)
Начиная с этой версии, при использовании протокола CoAP/CoIoT (одноадресная передача) на каждом устройстве Shelly необходимо настроить сервер CoAP/CoIoT.