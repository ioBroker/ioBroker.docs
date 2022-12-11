---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/protocol-mqtt.md
title: ioBroker.shelly
hash: qxNm4ySumCUo+BXI5OLJubJf3/4YwmXzmm3JLoNQDp4=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.шелли
##MQTT
![iobroker_general_mqtt](../../../de/adapterref/iobroker.shelly/img/iobroker_general_mqtt.png)

### Важные инструкции
- Невозможно подключить адаптер Shelly к существующему брокеру MQTT в вашей сети.
- Адаптер Shelly запускает своего собственного брокера MQTT, который запускается на порту 1882, чтобы избежать конфликта с другими брокерами MQTT в той же системе (порт по умолчанию для MQTT — 1883).
- Невозможно подключить клиент MQTT (например, MQTT Explorer) к внутреннему брокеру MQTT.
- Стандартный порт MQTT-брокера можно настроить в конфигурации адаптера
- **Знание протокола MQTT не требуется** - вся коммуникация осуществляется внутри компании

### Конфигурация
1. Откройте конфигурацию адаптера Shelly в ioBroker.
2. Выберите ```MQTT (и HTTP)``` как *Протокол* в *Общих настройках*.
3. Откройте вкладку **Настройки MQTT**.
4. Выберите имя пользователя и безопасный пароль (вы должны хранить эту информацию на всех устройствах Shelly).

![iobroker_mqtt](../../../de/adapterref/iobroker.shelly/img/iobroker_mqtt.png)

Активируйте MQTT на своих устройствах Shelly.

### Устройства первого поколения
1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Перейдите в «Настройки Интернета и безопасности» -> «Дополнительно» — «Настройки разработчика».
3. Активируйте MQTT и введите данные пользователя, которые вы только что настроили, и IP-адрес вашей установки ioBroker, а затем настроенный порт (например, ```192.168.1.2:1882```)
4. Сохраните конфигурацию — Shelly перезапустится автоматически.

![shelly_mqtt gen1](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen1.png)

### Устройства поколения 2 (Plus и Pro)
1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Перейдите в ```Сети -> Mqtt```
3. Активируйте MQTT и введите данные пользователя, которые вы только что настроили, и IP-адрес вашей установки ioBroker, а затем настроенный порт (например, ```192.168.1.2:1882```)
4. Сохраните конфигурацию — Shelly перезапустится автоматически.

- **Не изменяйте «идентификатор клиента» в этой конфигурации**
- **Для устройств 2-го поколения должны быть включены все параметры RPC (см. скриншоты)!**
- SSL не должен быть активирован

![shelly_mqtt gen2](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen2.png)

![shelly_mqtt gen2](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen2-old.png)

### Качество обслуживания (QoS)
TODO (см. en)