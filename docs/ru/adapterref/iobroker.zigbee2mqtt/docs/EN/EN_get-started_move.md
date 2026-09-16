---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md
title: Установка, включая перенос данных с адаптера ioBroker/Zigbee.
hash: JqzFY/GWycxVS4kHsgVnpyNlbyYefrQdHy1Tk5lJCZ0=
---
# Установка, включая перенос данных с адаптера ioBroker/Zigbee.

Для установки адаптера, а также для его перемещения требуется некоторая предварительная работа. Здесь мы описываем базовую установку и её требования. Подробную информацию, инструкции и настройки можно найти на странице [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/getting-started/) .

## Установка

В нашем примере Zigbee2MQTT настраивается через Docker / Docker Compose. Дополнительные методы настройки можно найти в официальной документации. В качестве предварительного условия необходимо предоставить среду Docker Server!

1. Отредактируйте существующий или создайте новый файл Docker-Compose.yml и добавьте следующую запись. Важно, чтобы эти настройки были адаптированы к вашей среде, например, путь к USB-антенне в разделе "devices" или путь к файлу конфигурации в разделе "volumes".

   ```yml
   zigbee2mqtt:
       container_name: zigbee2mqtt
       restart: unless-stopped
       image: koenkk/zigbee2mqtt
       ports:
       - 8080:8080
       devices:
       - /dev/ttyUSB0:/dev/dev/ttyUSB0
       volumes:
       - /etc/localtime:/etc/localtime:ro
       - ./zigbee2mqtt/data:/app/data
       environment:
       - TZ=Europe/Berlin
   ```

2. Далее необходимо создать стандартную конфигурацию. Здесь можно использовать официальную или оптимизированную версию для ioBroker. Для этого создайте файл configuration.yaml в папке ./zigbee2mqtt/data/.

   Исходная конфигурация:

   ```yml
   # Let new devices join our zigbee network
   permit_join: true
   # Docker-Compose makes the MQTT-Server available using "mqtt" hostname
   mqtt:
      base_topic: zigbee2mqtt
      server: mqtt://Your Data:Your Port (im normall Fall lautet der Port : 1885)
   # Zigbee Adapter path
   serial:
      port: /dev/ttyUSB0
   # Enable the Zigbee2MQTT frontend
   frontend:
      port: 8080
   advanced:
      pan_id: Your Data
      ext_pan_id: Your Data
      channel: Your Data
      network_key: Your Data
   ```

   Для **оптимизированной и рекомендуемой** версии адаптера значения в поле "Ваши данные" необходимо адаптировать к вашей среде.

   для версии v1.

```yml
 homeassistant: false
 permit_join: false
 frontend:
    port: 8080
    host: 0.0.0.0
 mqtt:
    base_topic: zigbee2mqtt
    server: mqtt://Your Data:Your Port (im normall Fall lautet der Port : 1885)
 serial:
    port: /dev/ttyUSB0
 advanced:
    pan_id: Your Data
    ext_pan_id: Your Data
    channel: Your Data
    network_key: Your Data
    last_seen: ISO_8601_local
    homeassistant_legacy_entity_attributes: false
    legacy_api: false
    legacy_availability_payload: false
    cache_state: false
    output: json
    transmit_power: 10
    log_level: warn
 device_options:
    legacy: false
 availability: true
```

для версии v2.

```yml
homeassistant:
   enabled: false
permit_join: false
frontend:
   port: 8080
   host: 0.0.0.0
   enabled: true
mqtt:
   base_topic: zigbee2mqtt
   server: mqtt://Your Data:Your Port (im normall Fall lautet der Port : 1885)
serial:
   port: /dev/ttyUSB0
advanced:
   pan_id: Your Data
   ext_pan_id: Your Data
   channel: Your Data
   network_key: Your Data
   last_seen: ISO_8601_local      
   cache_state: false
   output: json
   transmit_power: 10
   log_level: warn
device_options:      
availability:
   enabled: true
```

```
Here is an example from the configuration of the Zigbee adapter in ioBroker and how this must be changed:
```

![конфигурация Zigbee](../../../../../en/adapterref/iobroker.zigbee2mqtt/docs/img/zigbeeAdpter.png)

```yml
mqtt:
   base_topic: zigbee2mqtt
   server: mqtt://192.168.1.1:1885 # ioBroker IP address with MQTT adapter or MQTT server see Zigbee2MQTT docu
Serial:
   port: /dev/ttyACM0 #Path to the Zigbee antenna
advanced:
   pan_id: 0x1A2C #PAN ID from ioBroker converted to Hex
   ext_pan_id: [0x00, 0x12, 0x4b, 0x02, 0x37, 0xb9, 0x88] #extended PAN ID from the ioBroker and in the notation [0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD]
   channel: 15 #Channel from ioBroker
   network_key: [0x02, 0x03, 0x05, 0x08, 0x09, 0x0B, 0x0D, 0x0B, 0x00, 0x02, 0x04, 0x07, 0x08, 0x0A, 0x0C, 0x0D] # Network key/transport key and in the notation [0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD]
```

Обратите внимание, что в шестнадцатеричный формат необходимо преобразовать ТОЛЬКО PAN\_ID. Полезным инструментом может быть конвертер шестнадцатеричных чисел, например, такой: <https://www.rapidtables.com/convert/number/hex-to-decimal.html> .

```
The remaining values are already in the correct format, they only have to be converted into the correct notation..     
```

- Итак, из ext\_pan\_id:`00124b0237b988`
- к ext\_pan\_id:`0x00` ,`0x12` ,`0x4b` ,`0x02` ,`0x37` ,`0xb9` ,`0x88`

Именно так необходимо переписать параметр network\_key.

Это важно, потому что в противном случае координатор получит неверные данные, и вы не сможете восстановить сеть "просто так".

3. Как видно, требуется MQTT-сервер, который в настоящее время не имеет функции для этого адаптера, но необходим для запуска. Для этой цели его можно настроить в адаптере в ioBroker или использовать дополнительный контейнер Docker ( <https://www.zigbee2mqtt.io/guide/getting-started/#_2-setup-and-start-zigbee2mqtt> ), как описано в оригинальной документации.

4. Теперь вам нужно начать подготовку к переезду. Для этого выполните следующие действия:
   - Удалите все группы в текущем адаптере Zigbee. К сожалению, это приводит к различным ошибкам при импорте базы данных. Если вы не удалите их здесь, вам придется удалять их вручную из базы данных. Это занимает много времени, и в случае ошибок база данных будет повреждена. К сожалению, удаление этих групп в Zigbee2MQTT невозможно.
   - Остановить ioBroker/Zigbee-адаптер
   - Скопируйте базу данных из ioBroker в контейнер и переименуйте её. Источник: /opt/iobroker/iobroker-data/zigbee\_/shepart.db Назначение: "каталог Docker"/zigbee2mqtt/data/database.db

5. После того, как вы всё это сделаете, вы сможете использовать`docker-compose up -d` Чтобы применить конфигурацию Docker и настроить контейнер, через некоторое время можно подключиться к веб-интерфейсу Zigbee2MQTT по адресу <http://Dockerhost-IP:8080> . Конфигурация также должна измениться, и введенные шестнадцатеричные значения должны быть преобразованы. Если веб-интерфейс не запускается/недоступен, значит, есть ошибка, и она отобразится в логе контейнера (99%).

6. Установка адаптера Zigbee2MQTT через вкладку «Адаптеры» в ioBroker.

7. Настройка адаптера. См. [раздел «Настройка адаптера».](https://github.com/arteck/ioBroker.zigbee2mqtt/blob/main/docs/EN/EN/EN_AdapterConfig.md)

8. Если все прошло успешно, то мы успешно перевели нашу сеть Zigbee на новую систему, и нам еще предстоит внести несколько корректировок в новую систему.
   - Создать удаленные группы заново
   - дать устройствам имя
   - И наконец, что не менее важно, мы можем настраивать все скрипты и другие адаптеры, используемые для определенных состояний в сети Zigbee.