---
chapters: {"pages":{"en/adapterref/iobroker.zigbee2mqtt/README.md":{"title":{"en":"ioBroker.zigbee2mqtt"},"content":"en/adapterref/iobroker.zigbee2mqtt/README.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md":{"title":{"en":"Wiki"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/wiki.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_AdapterConfig.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md":{"title":{"en":"Installation"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md":{"title":{"en":"Installation incl. moving from ioBroker/Zigbee adapter"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_get-started_move.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md":{"title":{"en":"FAQ"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md"},"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_Instruction_Proxmox_Container.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.zigbee2mqtt/docs/EN/EN_faq.md
title: Häufig gestellte Fragen
hash: yjuNgbrR36yfFPMuA+jmGRGqMW0YwSSkEc6g2+PSb2c=
---
# Häufig gestellte Fragen

Hier werden die am häufigsten gestellten Fragen beantwortet. Grundsätzlich kann die offizielle Dokumentation von Zigbee2MQTT herangezogen werden. Dieses Wiki klärt primär Fragen zur Handhabung des Adapters und nicht zu Zigbee2MQTT selbst.

Offizielle Dokumentation: <https://www.zigbee2mqtt.io/guide/getting-started>

# Inhaltsverzeichnis

- [Häufig gestellte Fragen](#faq)
- [Inhaltsverzeichnis](#table-of-contents)
  - [Die Verbindungs-/Konfigurationsseite für Zigbee2MQTT wird in ioBroker nicht angezeigt.](#connectionconfiguration-page-to-zigbee2mqtt-is-not-displayed-in-iobroker-)
  - [Worin besteht der Unterschied zwischen diesem Adapter und dem ioBroker/Zigbee-Adapter?](#what-is-the-difference-between-this-adapter-and-the-iobrokerzigbee-adapter-)
  - [Was genau ist Zigbee2MQTT/Z2M?](#what-exactly-is-zigbee2mqttz2m-)
  - [Wie erhalte ich die Belichtungszeiten eines Geräts?](#how-do-i-get-the-exposes-from-a-device-)
  - [Welche Zigbee2MQTT-Konfigurationsparameter werden benötigt?](#which-zigbee2mqtt-configuration-parameters-are-needed-)
  - [Warum werden Geräte in ioBroker nicht ebenfalls gelöscht, nachdem sie aus z2m gelöscht wurden?](#why-are-devices-in-iobroker-not-also-deleted-after-being-deleted-from-z2m-)

## Die Verbindungs-/Konfigurationsseite für Zigbee2MQTT wird in ioBroker nicht angezeigt.<a name="1"></a>

Ausgangssituation:

Wenn man im ioBroker Admin eine verschlüsselte Verbindung über HTTPS verwendet, lädt der Browser die eingebettete Zigbee2MQTT-Benutzeroberfläche nicht.

Ursache:

Leider kann in Zigbee2MQTT (noch) keine verschlüsselte Verbindung konfiguriert werden. Durch die Verwendung der HTTPS-Verbindung des Admin-Adapters ist leider keine unverschlüsselte iFrame-Verbindung möglich, wie sie hier verwendet wird.

Lösung:

- Deaktivieren Sie die HTTPS-Verbindung im Admin-Adapter.
- Es handelt sich um eine Proxy-Verbindung zur Konfigurationsseite von Zigbee2MQTT, aber es ist noch nicht klar, ob die von diesem Adapter verwendete WebSocket-Verbindung weiterhin funktionieren wird.

## Worin besteht der Unterschied zwischen diesem Adapter und dem ioBroker/Zigbee-Adapter?<a name="2"></a>

Der ioBroker/Zigbee-Adapter nutzt die Datenbank von Zigbee2MQTT, verwaltet seine Geräte aber selbst.

Dieser Zigbee2MQTT-Adapter lagert die Geräteverwaltung an die offizielle Software aus und bezieht die Daten lediglich von dieser, um die Geräte über ioBroker zu steuern. Dadurch läuft das Zigbee-Netzwerk unabhängig von ioBroker. Ein wesentlich größerer Vorteil für Entwickler besteht darin, dass neue Funktionen nicht mehr von einem kleinen Team (1–3 Personen wie beim ioBroker/Zigbee-Adapter) implementiert werden müssen, sondern von einem deutlich größeren Team mit mehreren Hundert Entwicklern und einer wesentlich größeren Community, da Zigbee2MQTT auch von verschiedenen anderen Systemen als Basis genutzt wird.

## Was genau ist Zigbee2MQTT/Z2M?<a name="3"></a>

Zigbee2MQTT ist ein Open-Source-Projekt (vermutlich DAS Projekt, wenn es um Zigbee im Open Source Bereich geht), mit dem Zigbee Geräte über MQTT direkt angesprochen und verwaltet werden können, ohne dass hierfür eine Bridge eines Herstellers benötigt wird. Somit ist es auch möglich, Geräte mehrerer Hersteller über ein System zu verwalten, ohne dass man zu Hause immer die Bridge des jeweiligen Herstellers braucht. Zigbee2MQTT ist die Basis vieler SmartHome-Zentralen, wie FEHM, HomeAssitent und jetzt auch ioBroker, wenn es um die Verwaltung von Zigbee-Geräten geht. Bedeutet aber auch das hier eine zusätzliche Software installiert, eingerichtet und gepflegt werden muss!

## Wie erhalte ich die Belichtungszeiten eines Geräts?<a name="4"></a>

- Sie müssen die IEEE-Adresse eingeben (`0x......` ) vom betroffenen Gerät zum Datenpunkt`zigbee2mqtt.[X].info.debugmessages`
- Starten Sie anschließend den Adapter neu.
- Suchen Sie nun im Protokoll nach der Warnmeldung, die folgendermaßen beginnt:`-->> fromZ2M -> 0x...... exposes:`

## Welche Zigbee2MQTT-Konfigurationsparameter werden benötigt?<a name="5"></a>

Dieser Adapter basiert auf der aktuellen JSON-Nutzlast von Zigbee2MQTT, daher wird der Legacy-Modus in Version 1 nicht unterstützt. Das bedeutet, dass die folgenden Konfigurationsparameter für die korrekte Funktion des Adapters **zwingend erforderlich** sind!

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

Wenn Sie Version 2 installieren

```yaml
advanced:
    <Your other parameters>  
    cache_state: false
    output: json
availability:
    enabled: true
```

## Warum werden Geräte in ioBroker nicht ebenfalls gelöscht, nachdem sie aus z2m gelöscht wurden?<a name="6"></a>

Da die Datenpunkte sehr dynamisch erstellt werden und um mögliche Fehler zu vermeiden, werden die Geräte nicht gelöscht. Andernfalls gingen die benutzerdefinierten Einstellungen (sofern vorhanden) des Datenpunkts verloren. Normalerweise sollte der Name durch „Gerät entfernt!“ ersetzt und die Verfügbarkeit auf „false“ gesetzt werden, damit Sie die Datenpunkte später bei Bedarf löschen können.