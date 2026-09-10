---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
---
# FAQ

Here the most frequently asked questions are answered. Basically the official documentation of Zigbee2MQTT can be consulted. 
This WIKI primarily clarifies questions about the handling of the adapter and not with the Zigbee2MQTT itself.

Official Documentation: https://www.zigbee2mqtt.io/guide/getting-started

# Table of contents
- [Table of contents](#table-of-contents)

## Connection/configuration page to Zigbee2MQTT is not displayed in ioBroker <a name="1"></a>
Initial situation:

If one uses an encrypted connection over HTTPS in the ioBroker Admin, the browser does not load the embedded Zigbee2MQTT UI.

Cause:

Unfortunately, an encrypted connection cannot (yet) be configured in Zigbee2MQTT. By using the HTTPS connection of the Admin Adapter unfortunately no unencrypted iFrame connection can be used, which is the case here.

Solution:
-  disable the HTTPS connection in the Admin Adapter.
-  proxy connection for the configuration page of Zigbee2MQTT, but it is not yet clear whether the websocket connection used by this adapter will still work.

## What is the difference between this adapter and the ioBroker/Zigbee adapter? <a name="2"></a>
The ioBroker/Zigbee adapter uses the data basis of Zigbee2MQTT, but manages its devices itself.

This Zigbee2MQTT adapter outsources the management of the devices to the official software and only gets the data from it to control the devices via ioBroker. 
This means that the Zigbee network runs independently of the ioBroker. A much bigger advantage from the developer's point of view is that new functions do not have to be implemented by a 1-3 man team (as with the ioBroker/Zigbee adapter), but by a much larger team with several hundred developers and a much larger community, since Zigbee2MQTT is also used by various other systems as a basis.

## What exactly is Zigbee2MQTT/Z2M? <a name="3"></a>
Zigbee2MQTT ist ein Open-Source-Projekt (vermutlich DAS Projekt, wenn es um Zigbee im Open Source Bereich geht), mit dem Zigbee Geräte über MQTT direkt angesprochen und verwaltet werden können, ohne dass hierfür eine Bridge eines Herstellers benötigt wird. Somit ist es auch möglich Geräte mehrere Hersteller über ein System zu verwalten, ohne dass man zu Hause immer die Bridge des jeweiligen Herstellers braucht. 
Zigbee2MQTT ist die Basis vieler Verschiedener SmartHome Zentralen, wie FEHM, HomeAssitent und jetzt auch ioBroker, wenn es um die Verwaltung von Zigbee Geräten geht.
Bedeutet aber auch das hier eine zusätzliche Software installiert, eingerichtet und gepflegt werden muss!

## How do I get the exposes from a device? <a name="4"></a>

- You must enter the IEEE address (`0x......`) from the affected device into the datapoint `zigbee2mqtt.[X].info.debugmessages`
- Then restart the adapter
- And now look for the warning message in the log, which starts like this: `-->> fromZ2M -> 0x...... exposes:`

## Which Zigbee2MQTT configuration parameters are needed? <a name="5"></a>

This adapter is based on the current JSON payload of Zigbee2MQTT, so the legacy mode is not supported in v1.
This means that the following config parameters are **mandatory** for the adapter to work properly!

```yaml
advanced:
    <Your other parameters>
    legacy_api: false
    legacy_availability_payload: false
    cache_state: false
    output: json
device_options:
    legacy: false
availability: true
```

If you install v2 

```yaml
advanced:
    <Your other parameters>  
    cache_state: false
    output: json
availability:
    enabled: true
```

## Why are devices in ioBroker not also deleted after being deleted from z2m? <a name="6"></a>
Since the data points are created very dynamically and to prevent possible errors, the devices are not deleted. Otherwise the user defined settings (if available) of the datapoint would be lost.
Normally the name should be replaced by "Device removed!" and available should be set to "false", so you can delete the datapoints afterwards if you want to.