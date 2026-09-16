---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md
title: Installation inkl. Umstellung vom ioBroker/Zigbee-Adapter
hash: JqzFY/GWycxVS4kHsgVnpyNlbyYefrQdHy1Tk5lJCZ0=
---
# Installation inkl. Umstellung vom ioBroker/Zigbee-Adapter

Die Installation des Adapters sowie die Versetzung des ioBrocker/Zigbee-Adapters erfordern einige Vorbereitungen. Hier beschreiben wir die grundlegende Installation und ihre Voraussetzungen. Detaillierte Informationen, Anleitungen und Einstellungen finden Sie auf der Seite von [Zigbee2MQTT](https://www.zigbee2mqtt.io/guide/getting-started/) .

## Installation

In unserem Beispiel wird Zigbee2MQTT über Docker/Docker Compose eingerichtet. Weitere Einrichtungsmethoden finden Sie in der offiziellen Dokumentation. Voraussetzung hierfür ist eine bereitgestellte Docker-Server-Umgebung!

1. Bearbeiten Sie die vorhandene oder neue Docker-Compose.yml-Datei und fügen Sie den folgenden Eintrag hinzu. Es ist wichtig, dass diese Einstellungen an Ihre Umgebung angepasst werden, z. B. der Pfad zur USB-Antenne unter „devices“ oder der Pfad zur Konfigurationsdatei unter „volumes“.

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

2. Als Nächstes sollte eine Standardkonfiguration erstellt werden. Hierfür können Sie die offizielle oder die optimierte Version für ioBroker verwenden. Erstellen Sie dazu die Datei configuration.yaml im Verzeichnis ./zigbee2mqtt/data/.

   Ursprüngliche Konfiguration:

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

   Bei der für den Adapter **optimierten und empfohlenen** Version müssen die Werte mit „Ihre Daten“ an Ihre Umgebung angepasst werden.

   für Version v1.

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

für Version v2.

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

![ZigBee-Konfiguration](../../../../../en/adapterref/iobroker.zigbee2mqtt/docs/img/zigbeeAdpter.png)

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

Bitte beachten Sie, dass NUR die PAN\_ID in das HEX-Format konvertiert werden muss. Ein Hex-Konverter wie dieser ist dabei hilfreich: <https://www.rapidtables.com/convert/number/hex-to-decimal.html> .

```
The remaining values are already in the correct format, they only have to be converted into the correct notation..     
```

- also von ext\_pan\_id:`00124b0237b988`
- zur ext\_pan\_id:`0x00` ,`0x12` ,`0x4b` ,`0x02` ,`0x37` ,`0xb9` ,`0x88`

Genau so muss der Netzwerkschlüssel neu codiert werden.

Dies ist wichtig, da der Koordinator sonst falsche Daten erhält und Sie das Netzwerk nicht einfach so wiederherstellen können.

3. Wie ersichtlich, wird ein MQTT-Server benötigt, der aktuell für diesen Adapter keine Funktion bietet, aber für den Start erforderlich ist. Hierfür kann ein solcher Server im Adapter in ioBroker konfiguriert oder ein zusätzlicher Docker-Container ( <https://www.zigbee2mqtt.io/guide/getting-started/#_2-setup-and-start-zigbee2mqtt> ) wie in der Originaldokumentation beschrieben verwendet werden.

4. Nun müssen Sie mit den Umzugsvorbereitungen beginnen. Gehen Sie dazu bitte wie folgt vor:
   - Löschen Sie alle Gruppen im aktuellen ZigBee-Adapter. Diese führen leider zu verschiedenen Fehlern beim Importieren der Datenbank. Wenn Sie sie nicht hier entfernen, müssen Sie sie manuell aus der Datenbank löschen. Dies ist zeitaufwändig und kann im Fehlerfall die Datenbank beschädigen. Das Löschen dieser Gruppen in ZigBee2MQTT ist leider nicht möglich.
   - Stoppen Sie den ioBroker/Zigbee-Adapter.
   - Kopieren Sie die Datenbank von ioBroker in den Container und benennen Sie sie um. Quelle: /opt/iobroker/iobroker-data/zigbee\_/shepart.db Ziel: „Docker-Verzeichnis“/zigbee2mqtt/data/database.db

5. Sobald Sie all dies erledigt haben, können Sie verwenden`docker-compose up -d` Um die Docker-Konfiguration anzuwenden und den Container zu erstellen, können wir nach kurzer Zeit die Weboberfläche von Zigbee2MQTT unter <http://Dockerhost-IP:8080> aufrufen. Die Konfiguration sollte sich nun geändert haben und die eingegebenen Hexadezimalwerte sollten konvertiert worden sein. Falls die Weboberfläche nicht erreichbar ist, liegt weiterhin ein Fehler vor, der im Container-Log bis 99 % angezeigt wird.

6. Installation des Zigbee2MQTT-Adapters über die Registerkarte „Adapter“ in ioBroker.

7. Konfiguration des Adapters Siehe [Adapterkonfiguration](https://github.com/arteck/ioBroker.zigbee2mqtt/blob/main/docs/EN/EN/EN_AdapterConfig.md)

8. Wenn jetzt alles gut gegangen ist, haben wir unser Zigbee-Netzwerk erfolgreich umgestellt und können noch einige Anpassungen am neuen System vornehmen.
   - Gelöschte Gruppen erneut erstellen
   - Gib den Geräten einen Namen
   - Und nicht zuletzt können wir alle Skripte und andere Adapter anpassen, die für bestimmte Zustände des Zigbee-Netzwerks verwendet werden.