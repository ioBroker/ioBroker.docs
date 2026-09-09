---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md
title: Установка
hash: rNTtappA8fXXYATIaWye0tuTHGPMI7JooCj9lsGt2EY=
---
# Установка

Для установки адаптера требуется некоторая предварительная работа. Здесь описана базовая установка, включая все необходимые компоненты. Подробную информацию, инструкции и настройки можно найти на странице [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/getting-started/) .

`ATTENTION: If the coordinator has been used somewhere else before, it must be reset, otherwise errors will happen.`

## Установка

В нашем примере Zigbee2MQTT настраивается через Docker / Docker Compose. Дополнительные методы настройки можно найти в официальной документации. В качестве предварительного условия необходимо предоставить Docker-сервер!

1. Отредактируйте существующий или новый файл Docker-Compose.yml и добавьте следующую запись. Важно лишь, чтобы эти настройки были адаптированы к вашей среде, например, путь к USB-антенне в разделе "devices" или путь к файлу конфигурации в разделе "volumes".

   ```yml
   zigbee2mqtt:
       container_name: zigbee2mqtt
       restart: unless-stopped
       image: koenkk/zigbee2mqtt
       ports:
       - 8080:8080
       devices:
       - /dev/ttyUSB0:/dev/ttyUSB0
       volumes:
       - /etc/localtime:/etc/localtime:ro
       - ./zigbee2mqtt/data:/app/data
       environment:
       - TZ=Europe/Berlin
   ```

2. Далее необходимо создать стандартную конфигурацию. Здесь можно использовать официальную или оптимизированную версию для ioBroker. Создайте файл configuration.yaml в папке ./zigbee2mqtt/data/ — значения для параметра "Ваши данные" должны быть адаптированы к вашей среде.

   Исходная конфигурация:

   ```yml
    # Let new devices join our zigbee network
    permit_join: true
    mqtt:
        base_topic: zigbee2mqtt
        server: mqtt://Your Data:Your Port (in the normal case the port is : 1885)
    # Zigbee Adapter path
    serial:
        port: /dev/ttyUSB0
    # Enable the Zigbee2MQTT frontend
    frontend:
        port: 8080
    # Let Zigbee2MQTT generate a new network key on first start
    advanced:
        network_key: GENERATE
   ```

   Для **оптимизированной и рекомендуемой** версии адаптера значения в поле "Ваши данные" необходимо адаптировать к вашей среде.

   ```yml
    homeassistant: false
    permit_join: true
    frontend:
        port: 8080
        host: 0.0.0.0
    mqtt:
        base_topic: zigbee2mqtt
        server: mqtt://Your Data:Your Port (in the normal case the port is : 1885)
    serial:
        port: /dev/ttyACM0
    advanced:
        pan_id: GENERATE
        ext_pan_id: [0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD, 0xDD]
        channel: 11
        network_key: GENERATE
        last_seen: ISO_8601_local
        homeassistant_legacy_entity_attributes: false
        legacy_api: false
        legacy_availability_payload: false
        cache_state: false
        output: json
        transmit_power: 20
        log_level: warn
    device_options:
        legacy: false
    availability:
      enabled: true
      active:
         timeout: 10
      passive:
         timeout: 1100
   ```

3. Как видно, требуется MQTT-сервер, который в настоящее время не имеет функции для этого адаптера, но необходим для запуска. Для этой цели его можно настроить в адаптере в ioBroker или использовать дополнительный контейнер Docker ( <https://www.zigbee2mqtt.io/guide/getting-started/#_2-setup-and-start-zigbee2mqtt> ), как описано в оригинальной документации.

4. После того, как все это будет сделано, мы сможем использовать`docker-compose up -d` Чтобы получить доступ к конфигурации Docker и создать контейнер, через некоторое время мы сможем подключиться к веб-интерфейсу Zigbee2MQTT по адресу <http://Dockerhost-IP:8080> .

5. Установка адаптера Zigbee2MQTT через вкладку «Адаптер» в ioBroker.

6. Настройка адаптера. См. [раздел «Настройка адаптера».](https://github.com/arteck/ioBroker.zigbee2mqtt/blob/main/docs/EN/EN/EN_AdapterConfig.md)

7. Теперь всё должно работать, и устройства можно настроить. Вот подробная инструкция: <https://www.zigbee2mqtt.io/guide/usage/pairing_devices.html>