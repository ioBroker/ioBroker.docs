---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md
title: Installation
hash: rNTtappA8fXXYATIaWye0tuTHGPMI7JooCj9lsGt2EY=
---
# Installation

Die Installation des Adapters erfordert einige Vorbereitungsarbeiten. Hier wird die grundlegende Installation inklusive aller Voraussetzungen beschrieben. Detaillierte Informationen, Anleitungen und Einstellungen finden Sie auf der Seite von [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/getting-started/) .

`ATTENTION: If the coordinator has been used somewhere else before, it must be reset, otherwise errors will happen.`

## Installation

In unserem Beispiel wird Zigbee2MQTT über Docker/Docker Compose eingerichtet. Weitere Einrichtungsmethoden finden Sie in der offiziellen Dokumentation. Voraussetzung ist ein bereitgestellter Docker-Server.

1. Bearbeiten Sie die vorhandene oder neue Docker-Compose.yml-Datei und fügen Sie den folgenden Eintrag hinzu. Wichtig ist nur, dass diese Einstellungen an Ihre Umgebung angepasst werden, z. B. der Pfad zur USB-Antenne unter „devices“ oder der Pfad zur Konfigurationsdatei unter „volumes“.

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

2. Als Nächstes sollte eine Standardkonfiguration erstellt werden. Hierfür können Sie die offizielle oder die optimierte Version für ioBroker verwenden. Erstellen Sie die Datei configuration.yaml unter ./zigbee2mqtt/data/ – die Werte für „Ihre Daten“ müssen an Ihre Umgebung angepasst werden.

   Ursprüngliche Konfiguration:

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

   Bei der für den Adapter **optimierten und empfohlenen** Version müssen die Werte mit „Ihre Daten“ an Ihre Umgebung angepasst werden.

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

3. Wie ersichtlich, wird ein MQTT-Server benötigt, der aktuell für diesen Adapter keine Funktion bietet, aber für den Start erforderlich ist. Hierfür kann ein solcher Server im Adapter in ioBroker konfiguriert oder ein zusätzlicher Docker-Container ( <https://www.zigbee2mqtt.io/guide/getting-started/#_2-setup-and-start-zigbee2mqtt> ) wie in der Originaldokumentation beschrieben verwendet werden.

4. Sobald all dies erledigt ist, können wir verwenden`docker-compose up -d` Die Docker-Konfiguration wird übernommen und der Container entworfen. Nach kurzer Zeit kann dann über <http://Dockerhost-IP:8080> eine Verbindung zur Weboberfläche von Zigbee2MQTT hergestellt werden.

5. Installation des Zigbee2MQTT-Adapters über die Registerkarte „Adapter“ in ioBroker

6. Konfiguration des Adapters Siehe [Adapterkonfiguration](https://github.com/arteck/ioBroker.zigbee2mqtt/blob/main/docs/EN/EN/EN_AdapterConfig.md)

7. Jetzt sollte alles funktionieren und die Geräte können gekoppelt werden. Hier finden Sie eine detaillierte Anleitung: <https://www.zigbee2mqtt.io/guide/usage/pairing_devices.html>