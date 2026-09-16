---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"},"de/adapterref/iobroker.shelly/devicemanager.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/devicemanager.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/protocol-coap.md
title: ioBroker.shelly
hash: avNKPAhup5VE26YaWQOFIOHFlp5sUKFFOQT38zHODek=
---
![логотип](../../../de/admin/shelly.png)

# ioBroker.shelly

Это немецкая версия документации - [🇺🇸 Английская версия](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/master/docs/en/protocol-coap.md)

## CoAP (CoIoT)

**Протокол CoAP/CoIoT поддерживается только устройствами первого поколения (Gen1) — устройства Plus и Pro (Gen2) этот протокол не поддерживают!**

![iobroker\_general\_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_general_coap.png)

**Если используется версия прошивки выше 1.9.4, на устройствах Shelly необходимо настроить сервер CoIoT (одноадресная передача).**

В поле IP-адреса сервера ioBroker необходимо указать сервер CoIoT, а затем порт.`5683` Если ioBroker расположен, например, по адресу`192.168.1.2` Если до него можно добраться, значит, он там.`192.168.1.2:5683` Зарегистрировано и CoIoT активирован.

![shelly\_coap](../../../de/adapterref/iobroker.shelly/img/shelly_coap.png)

**После внесения этих изменений устройство Shelly необходимо перезагрузить!**

CoAP/CoIoT добавляет все устройства в сеть. Если необходимо исключить отдельные устройства, их можно настроить в черном списке. Для этого необходимо ввести их серийные номера в таблицу.

![iobroker\_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_coap.png)

### Более старая версия прошивки

Если используется устройство Shelly с версией прошивки 1.9.4 или ниже, дополнительная настройка не требуется. Адаптер автоматически обнаружит устройство.

**Важно: поскольку CoAP/CoIoT использует многоадресные UDP-пакеты, устройства Shelly должны находиться в той же подсети, что и сервер ioBroker.**

### Важные инструкции

#### докер

Если ioBroker работает в контейнере Docker, контейнер должен быть в сетевом режиме.`host` или`macvlan` Необходимо настроить контейнер Docker. Должен ли контейнер Docker находиться в сетевом режиме?`bridge` При запуске устройства Shelly не обнаруживаются.

#### Прошивка Shelly версии 1.8.0 (или новее)

- При использовании протокола CoAP/CoIoT, начиная с этой версии, адаптер должен быть версии 4.0.0 (или новее).
- Для устройств со старой версией прошивки (кроме Shelly 4 Pro) необходимо использовать адаптер версии 3.3.6 (или более раннюю). Адаптер версии 4.0.0 (или более поздняя) несовместим со старыми версиями прошивки!

#### Прошивка Shelly версии 1.9.4 (или новее)

- Начиная с этой версии, при использовании протокола CoAP/CoIoT (одноадресная передача) на каждом устройстве Shelly необходимо настроить сервер CoAP/CoIoT.