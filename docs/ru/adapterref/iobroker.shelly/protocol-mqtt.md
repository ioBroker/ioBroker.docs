---
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shelly/protocol-mqtt.md
title: ioBroker.shelly
hash: 4b2wumy82IaKgz88kpC53rUH26Zi6vVsM2wI2ApYQow=
---
![логотип](../../../de/admin/shelly.png)

# IoBroker.shelly
Это немецкая документация - [🇺🇸 Английская версия](../en/protocol-mqtt.md)

## MQTT
![iobroker_general_mqtt](../../../de/adapterref/iobroker.shelly/img/iobroker_general_mqtt.png)

### Важные инструкции
— Подключение адаптера Shelly к существующему MQTT-брокеру невозможно.
- Адаптер Shelly запускает собственный MQTT-брокер, который запускается на порту `1882`, чтобы избежать конфликтов с другими MQTT-брокерами в той же системе (стандартный порт для MQTT — `1883`).
— Невозможно подключить MQTT-клиент (например, MQTT Explorer) к внутреннему MQTT-брокеру.
- Порт по умолчанию для внутреннего MQTT-брокера можно настроить в конфигурации адаптера.
- **Знание протокола MQTT не требуется** - вся связь осуществляется внутри системы.

Есть вопросы? Сначала проверьте [Часто задаваемые вопросы](faq.md)!

>[!ВАЖНО] >Адаптер Shelly не поддерживает подключение устройств Shelly через NAT (например, во многих конфигурациях VPN или с помощью расширителя диапазона Shelly).

### Конфигурация
1. Откройте конфигурацию адаптера Shelly в ioBroker.
2. В разделе «Общие настройки» выберите протокол `MQTT (и HTTP)`.
3. Откройте вкладку **Настройки MQTT**.
4. Выберите имя пользователя и надежный пароль (эту информацию необходимо ввести на всех устройствах Shelly).

Адаптер Shelly запускает собственный внутренний MQTT-брокер. На всех устройствах Shelly, которые должны подключаться к этому брокеру, необходимо ввести настроенное имя пользователя и пароль.

![iobroker_mqtt](../../../de/adapterref/iobroker.shelly/img/iobroker_mqtt.png)

На всех устройствах Shelly должна быть включена поддержка MQTT.

### Устройства 2-го поколения и старше (Plus и Pro)
1. Откройте веб-интерфейс конфигурации Shelly в браузере (не в приложении Shelly!).
2. Откройте вкладку «Настройки» и перейдите в раздел «Сети -> MQTT».
3. Активируйте MQTT и введите только что настроенные данные пользователя и IP-адрес системы, на которой установлен ioBroker, а затем настроенный порт (например, `192.168.1.2:1882`).
4. Сохраните конфигурацию — Shelly автоматически перезагрузится.

- **Не изменяйте "идентификатор клиента" в этой конфигурации.**
**Для устройств второго поколения (Gen2+) необходимо включить все параметры RPC (см. скриншоты)!**
- SSL/TLS не должен быть включен.

![shelly gen2](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen2.png)

### Устройства первого поколения
1. Откройте веб-интерфейс конфигурации Shelly в браузере (не в приложении Shelly!).
2. Перейдите в раздел «Параметры интернета и безопасности» -> «Дополнительно» — «Параметры разработчика».
3. Активируйте MQTT и введите только что настроенные данные пользователя и IP-адрес системы, на которой установлен ioBroker, а затем настроенный порт (например, `192.168.1.2:1882`).
4. Сохраните конфигурацию — Shelly автоматически перезагрузится.

![shelly gen1](../../../de/adapterref/iobroker.shelly/img/shelly_mqtt-gen1.png)

### Качество обслуживания (QoS)
В протоколе MQTT существует 3 уровня качества обслуживания (QoS):

- Не более одного раза (0) - гарантия доставки отсутствует (запустил и забыл)
- Хотя бы один раз (1) - гарантирует, что сообщение дойдёт до получателя хотя бы один раз
- Ровно один раз (2) - гарантирует, что каждое сообщение дойдёт до получателя ровно один раз.