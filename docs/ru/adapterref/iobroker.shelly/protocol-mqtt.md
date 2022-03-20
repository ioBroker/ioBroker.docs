---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/protocol-mqtt.md
title: ioBroker.шелли
hash: Bd+LVUP47yND7GlSfMKQwS9NFjqNftpSs/7lAVFW0Q0=
---
![логотип](../../../de/adapterref/iobroker.shelly/../../admin/shelly.png)

# IoBroker.шелли
##MQTT
### Важные инструкции
- Невозможно подключить адаптер Shelly к существующему брокеру MQTT в вашей сети.
- Адаптер Shelly запускает своего собственного брокера MQTT, который запускается на порту 1882, чтобы избежать конфликта с другими брокерами MQTT в той же системе.
- Стандартный порт MQTT-брокера можно настроить в конфигурации адаптера
- Знание протокола MQTT не требуется - все коммуникации обрабатываются внутри

### Конфигурация
1. Откройте конфигурацию адаптера Shelly в ioBroker.
2. Выберите ```MQTT и HTTP``` как *Протокол* в *Общих настройках*.
3. Откройте вкладку **Настройки MQTT**.
4. Выберите имя пользователя и безопасный пароль (вы должны хранить эту информацию на устройствах Shelly).

![iobroker_general](../../../de/adapterref/iobroker.shelly/./img/iobroker_general_mqtt.png)

![iobroker_mqtt](../../../de/adapterref/iobroker.shelly/./img/iobroker_mqtt.png)

Активируйте MQTT на своих устройствах Shelly:

1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Перейдите в «Настройки Интернета и безопасности» -> «Дополнительно» — «Настройки разработчика».
3. Активируйте MQTT и введите данные пользователя, которые вы только что настроили, и IP-адрес вашей установки ioBroker, а затем порт 1882 (например, ```192.168.20.242:1882```)
4. Сохраните конфигурацию — Shelly перезапустится автоматически.

- Для устройств Gen1: не меняйте ```пользовательский префикс MQTT``` (адаптер не будет работать, если вы измените это значение).

![Шелли gen1](../../../de/adapterref/iobroker.shelly/./img/shelly_mqtt-gen1.png)

![Шелли Gen2](../../../de/adapterref/iobroker.shelly/./img/shelly_mqtt-gen2.png)

**Для устройств 2-го поколения должны быть включены все параметры RPC (см. снимок экрана)!**