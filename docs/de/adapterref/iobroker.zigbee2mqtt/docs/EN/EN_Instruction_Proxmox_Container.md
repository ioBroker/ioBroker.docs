---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md
title: kein Titel
hash: QTjPL1+42+VD2E1r+6Hecy7o5I1WbMsVNI7hpuEe5jQ=
---
Ein Leitfaden/Erfahrungsbericht des Nutzers [Acgua](https://github.com/Acgua) :

Ich bin von einem ZigBee-Adapter mit über 30 Geräten auf einen ConBee II Stick umgestiegen. Mein Vorgehen für den Proxmox-Container sieht ungefähr so aus:

### Proxmox-Behälter vorbereiten:

- Debian 11-Container erstellt: 512 MB RAM, 512 MB Swap-Speicher, 4 GB Festplattenspeicher, 1 Kern
- `apt update -y && apt upgrade -y` ,`apt install -y sudo usbutils curl git` (und möglicherweise noch einige weitere benötigte Pakete)
- `adduser z2m` ,`adduser z2m sudo` ,`su z2m` (ab sofort nur noch Benutzer akzeptieren)`z2m` (nicht mehr Wurzel)
- USB-Stick (ConBee II) gemäß [ioBroker-Doku](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/de/install/proxmox.md#proxmox---lxc-linux-containers---usb-ger%C3%A4te-durchreichen) weitergeben

### Mosquitto im Container installieren:

(angepasst an [dieses Handbuch](https://randomnerdtutorials.com/how-to-install-mosquitto-broker-on-raspberry-pi/) )

- `sudo apt install -y mosquitto mosquitto-clients`
- Automatischen Start einrichten:`sudo systemctl enable mosquitto.service`
- Fernzugriff aktivieren (ohne Authentifizierung):`sudo nano /etc/mosquitto/mosquitto.conf` und fügen Sie die Zeilen hinzu`listener 1883` Und`allow_anonymous true` am Ende der Datei. (Anmerkung an mich selbst: auf Authentifizierung ändern!).
- Mosquitto neu starten:`sudo systemctl restart mosquitto`
- Status prüfen:`systemctl status mosquitto`
- `sudo reboot` Dann überprüfen Sie mit`systemctl status mosquitto` wenn Mosquitto automatisch startet.

### Installieren Sie Zigbee2MQTT im Container:

- Gehen Sie ungefähr gemäß der [offiziellen Anleitung für Linux](https://www.zigbee2mqtt.io/guide/installation/01_linux.html) vor. **Wichtig:** Laut Anleitung ist NodeJS 16 installiert (`...setup_16.x` Ich habe dies auf 18 geändert (offiziell unterstützt).
- Konfiguration in`/opt/zigbee2mqtt/data/configuration.yaml` gemäß den Anweisungen eingeben`server: 'mqtt://localhost'` als MQTT-Server.
- Zigbee2MQTT soll [gemäß Dokumentation](https://www.zigbee2mqtt.io/guide/installation/01_linux.html#optional-running-as-a-daemon-with-systemctl) beim Systemstart automatisch gestartet werden.
- `sudo reboot` dann verwenden`systemctl status zigbee2mqtt.service` um zu überprüfen, ob Zigbee2MQTT automatisch startet.

### ioBroker Zigbee2MQTT-Adapter

- Vorgehensweise gemäß Dokumentation – [Installation inkl. Umstellung vom ioBroker/Zigbee-Adapter](/#/docs/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md)
- **Wichtig, falls ConBee II Stick** : anpassen`configuration.yaml` wieder:
  1. unter`serial` eingeben:`adapter: deconz` Die
  2. unter`advanced` Löschen Sie die Zeile`transmit_power: 20` Der ConBee II scheint dazu nicht in der Lage zu sein, und beim Starten von Zigbee2MQTT treten Fehler auf.

### Screenshots

Proxmox (letzter Neustart erst vor 50 Minuten). Erfreulich geringer Ressourcenbedarf.

![Proxmox Container Performance](../../../../../en/adapterref/iobroker.zigbee2mqtt/docs/img/ProxmoxContainerPerfomence.png)