---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/protocol-mqtt.md
title: ioBroker.shelly
hash: Q9oP75fCGPw8B0RiW4pzL/QKPVh9I7OE5KTWs6HN4GA=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/protocol-mqtt.md).

## MQTT
![iobroker_general_mqtt](../../../de/adapterref/iobroker.shelly/img/iobroker_general_mqtt.png)

### Важные инструкции
- Невозможно подключить адаптер Shelly к существующему MQTT-брокеру.
- Адаптер Shelly запускает собственный брокер MQTT, который запускается на порту «1882», чтобы избежать конфликта с другими брокерами MQTT в той же системе (порт по умолчанию для MQTT — «1883»).
- Невозможно подключить клиент MQTT (например, MQTT Explorer) к внутреннему брокеру MQTT.
- Порт по умолчанию внутреннего брокера MQTT можно настроить в конфигурации адаптера.
- **Знание протокола MQTT не требуется** — вся связь осуществляется внутри компании.

Вопросы? Сначала взгляните на [Часто задаваемые вопросы](faq.md)!

### Конфигурация
1. Откройте конфигурацию адаптера Shelly в ioBroker.
2. Выберите «MQTT (и HTTP)» в качестве *Протокола* в *Общих настройках*.
3. Откройте вкладку **Настройки MQTT**.
4. Выберите имя пользователя и надежный пароль (эту информацию необходимо хранить на всех устройствах Shelly)

> Адаптер Shelly запускает собственный брокер MQTT (внутренний). Настроенное имя пользователя и пароль должны храниться на всех устройствах Shelly, которые должны подключаться к этому брокеру.

![iobroker_mqtt](../../../de/adapterref/iobroker.shelly/img/iobroker_mqtt.png)

Включите MQTT на своих устройствах Shelly.

### Устройства поколения 2+ (Plus и Pro)
1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Откройте вкладку Настройки и перейдите в Сети -> Mqtt.
3. Активируйте MQTT и введите только что настроенные данные пользователя и IP-адрес системы, в которой установлен ioBroker, а затем настроенный порт (например, `192.168.1.2:1882`).
4. Сохраните конфигурацию — Shelly автоматически перезагрузится.

- **Не меняйте «идентификатор клиента» в этой конфигурации**
- **Для устройств поколения 2+ (Gen2+) все опции RPC должны быть активированы (см. скриншоты)!**
- SSL/TLS не должен быть активирован

![Шелли gen2](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen2.png)

### Устройства поколения 1
1. Откройте веб-конфигурацию Shelly в браузере (не в приложении Shelly!)
2. Перейдите в «Настройки Интернета и безопасности -> Дополнительно - Настройки разработчика».
3. Активируйте MQTT и введите только что настроенные данные пользователя и IP-адрес системы, в которой установлен ioBroker, а затем настроенный порт (например, `192.168.1.2:1882`).
4. Сохраните конфигурацию — Shelly автоматически перезагрузится.

![Шелли 1 поколение](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen1.png)

### Качество обслуживания (QoS)
TODO (см. ru)