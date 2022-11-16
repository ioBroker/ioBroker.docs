---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/protocol-coap.md
title: ioBroker.shelly
hash: caVSRUn5lV64VZTjAIYf8TiMzwy1C2bVXiaYDsVE7PU=
---
![логотип](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.шелли
## КоАП
![iobroker_general_coap](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_coap.png)

**Если используется версия микропрограммы выше 1.9.4, сервер CoIoT должен быть настроен на устройствах Shelly (одноадресная рассылка).**

Введите IP-адрес вашего сервера ioBroker в качестве сервера CoIoT, а затем порт ```5683```. Например, если ваш ioBroker доступен по адресу ```192.168.1.2```, введите ```192.168.1.2:5683``` и активируйте CoIoT.

![shelly_coap](../../../de/adapterref/iobroker.shelly/./img/shelly_coap.png)

CoAP добавляет все устройства в вашей сети. Если вы хотите исключить отдельные устройства, вы можете настроить их в черный список. Для этого введите серийные номера в таблицу:

![iobroker_coap](../../../de/adapterref/iobroker.shelly/./img/iobroker_coap.png)

### Старая прошивка
Если вы используете Shelly с прошивкой ниже или равной 1.9.4, дальнейшая настройка не требуется. Ваши устройства будут найдены адаптером автоматически.

**Важно: поскольку CoAP использует многоадресные пакеты UDP, устройства Shelly должны находиться в той же подсети, что и сервер ioBroker.**

### Важные инструкции
#### Докеры
Если вы используете ioBroker в контейнере Docker, контейнер должен быть настроен в сетевом режиме §§ГГГГ_0§§ или §§ГГГГГ_1§§. Если контейнер Docker работает в сетевом режиме ```bridge```, устройства Shelly не будут найдены.

#### Прошивка Shelly 1.8.0 (или новее)
- Если вы используете протокол CoAP, адаптер должен быть версии 4.0.0 (или новее), начиная с этой версии.
- Для устройств с более старой прошивкой (кроме Shelly 4 Pro) необходимо использовать адаптер версии 3.3.6 (или старше). Адаптер версии 4.0.0 (или новее) не совместим со старыми версиями прошивки!

#### Прошивка Shelly 1.9.4 (или новее)
- Начиная с этой версии сервер CoIoT должен храниться на каждом Shelly, если используется протокол CoAP (unicast).