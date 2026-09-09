---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
---
A guide/experience report from the user [Acgua](https://github.com/Acgua):

I switched from zigbee adapter, with 30+ devices, ConBee II stick.
My approach for proxmox container approximately:

### Prepare proxmox container:

-   Debian 11 container created: 512 MB RAM, 512 MB swap, 4 GB HD memory, 1 core
-   `apt update -y && apt upgrade -y`, `apt install -y sudo usbutils curl git` (and possibly a few more required packages)
-   `adduser z2m`, `adduser z2m sudo`, `su z2m` (from now on take only user `z2m`, no longer root)
-   Pass USB stick (ConBee II) according to [ioBroker-Doku](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/de/install/proxmox.md#proxmox---lxc-linux-containers---usb-ger%C3%A4te-durchreichen)

### Install Mosquitto in container:

(adapted from [this manual](https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/))

-   `sudo apt install -y mosquitto mosquitto-clients`
-   Set up Auto Start: `sudo systemctl enable mosquitto.service`
-   Enable Remote Access (No Authentication): `sudo nano /etc/mosquitto/mosquitto.conf` and add the lines `listener 1883` and `allow_anonymous true` at the end of the file. (Note to self: change to auth!).
-   Restart Mosquitto: `sudo systemctl restart mosquitto`
-   Check status: `systemctl status mosquitto`
-   `sudo reboot`,then check with `systemctl status mosquitto` if Mosquitto starts automatically.

### Install Zigbee2MQTT in container:

-   Proceed approximately according to the [official instructions for Linux](https://www.zigbee2mqtt.io/guide/installation/01_linux.html). **Important:** according to the instructions NodeJS 16 is installed (`...setup_16.x`), I changed this to 18 (officially supported)
-   Configuration in `/opt/zigbee2mqtt/data/configuration.yaml` according to the instructions, entering `server: 'mqtt://localhost'` as the MQTT server.
-   Set up to start Zigbee2MQTT automatically on boot [according to doc](https://www.zigbee2mqtt.io/guide/installation/01_linux.html#optional-running-as-a-daemon-with-systemctl).
-   `sudo reboot`, then use `systemctl status zigbee2mqtt.service` to check if Zigbee2MQTT starts automatically.

### ioBroker Zigbee2MQTT Adapter

-   Procedure according to docu - [Installation incl. moving from ioBroker/Zigbee adapter](/#/docs/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md)
-   **Important, if ConBee II Stick**: adjust `configuration.yaml` again:
    1. under `serial` enter: `adapter: deconz`.
    2. under `advanced` delete the line `transmit_power: 20`, the ConBee II seems not to be able to do this and errors occur when starting Zigbee2MQTT

### Screenshots

Proxmox (last restart was just 50 minutes ago). Nice low resource requirements.

![Proxmox Container Perfomence](../img/ProxmoxContainerPerfomence.png)