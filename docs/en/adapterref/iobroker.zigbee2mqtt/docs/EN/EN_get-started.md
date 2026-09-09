---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
---
# Installation

The installation of the adapter requires some preparatory work. 
Here the basic installation including all requirements is described. Detailed information, instructions and settings can be found on the page of [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/getting-started/).

`ATTENTION: If the coordinator has been used somewhere else before, it must be reset, otherwise errors will happen.`

## Installation

In our example Zigbee2MQTT is set up via Docker / Docker Compose. You can find more setup methods on the official documentation.
As a prerequisite here is a submitted Docker server give!

1. edit existing or new Docker-Compose.yml and add the following entry.
   It is only important that these settings are adapted to your environment, e.g. the path to the USB antenna under "devices" or the path to the configuration file under "volumes".

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

2. Next, a standard configuration should be built.
   Here you can use the official or the optimized version for ioBroker.
   Create the file configuration.yaml under ./zigbee2mqtt/data/ - values with "Your Data" must be adapted to your environment.
   
   Original configuration:

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

   For the adapter **optimized and recommended** version - values with "Your Data" must be adapted to your environment.

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
3. As can be seen, an MQTT server is required, which currently has no function for this adapter, but is required for startup.
   For this purpose, one can be configured in the adapter in ioBroker or an additional Docker container (https://www.zigbee2mqtt.io/guide/getting-started/#_2-setup-and-start-zigbee2mqtt) can be used as in the original documentation.

4. Once all this is done, we can use `docker-compose up -d` to take over the Docker configuration and design the container.
   After a short time we can then connect to the web interface of Zigbee2MQTT with http://Dockerhost-IP:8080.

5. Installation of the Zigbee2MQTT adapter via the Adapter Tab in ioBroker

6. Configuration of the adapter See [Adapter configuration](https://github.com/arteck/ioBroker.zigbee2mqtt/blob/main/docs/EN/EN/EN_AdapterConfig.md)

7. Now everything should run and the devices can be tuned in. Here is a detailed instruction: https://www.zigbee2mqtt.io/guide/usage/pairing_devices.html