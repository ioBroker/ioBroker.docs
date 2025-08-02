---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/protocol-coap.md
title: ioBroker.shelly
hash: 3XDteAEV6pM9eOz5aWZOezb3pF10fD1EEYiHyntKT+w=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/protocol-coap.md).

## CoAP (CoIoT)
**CoAP/CoIoT поддерживается только устройствами Gen1. Устройства Plus и Pro (Gen2) не поддерживают этот протокол!**

![iobroker_general_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_general_coap.png)

**Если используется версия прошивки выше 1.9.4, на устройствах Shelly необходимо настроить сервер CoIoT (одноадресная рассылка).**

Введите IP-адрес вашего сервера ioBroker в качестве сервера CoIoT, а затем порт `5683`. Например, если ваш ioBroker доступен по адресу `192.168.1.2`, введите туда `192.168.1.2:5683` и активируйте CoIoT.

![shelly_coap](../../../de/adapterref/iobroker.shelly/img/shelly_coap.png)

**После этого изменения устройство Shelly необходимо перезагрузить!**

CoAP/CoIoT добавляет все устройства в вашу сеть. Если вы хотите исключить отдельные устройства, вы можете настроить их в черный список. Для этого вставьте серийные номера в таблицу:

![iobroker_coap](../../../de/adapterref/iobroker.shelly/img/iobroker_coap.png)

### Старая прошивка
Если вы используете Shelly с прошивкой ниже или равной 1.9.4, дополнительная настройка не требуется. Ваши устройства будут автоматически найдены адаптером.

**Важно: поскольку CoAP/CoIoT использует многоадресные пакеты UDP, устройства Shelly должны находиться в той же подсети, что и сервер ioBroker.**

### Важные инструкции
#### Докер
Если у вас есть ioBroker, работающий в контейнере Docker, контейнер необходимо настроить в сетевом режиме `host` или `macvlan`. Если контейнер Docker работает в сетевом режиме `bridge`, устройства Shelly не будут найдены.

#### Прошивка Shelly 1.8.0 (или новее)
- Если вы используете протокол CoAP/CoIoT, начиная с этой версии необходимо использовать адаптер версии 4.0.0 (или новее).
- Для устройств со старой прошивкой (кроме Shelly 4 Pro) необходимо использовать адаптер версии 3.3.6 (или старше). Версия адаптера 4.0.0 (или новее) несовместима со старыми версиями прошивки!

#### Прошивка Shelly 1.9.4 (или новее)
- Начиная с этой версии, сервер CoAP/CoIoT должен храниться на каждом Shelly, если используется протокол CoAP/CoIoT (одноадресная рассылка).