---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.teltonika/README.md
title: ioBroker Teltonika
hash: ZsiA6OEQPKNBizl82nxkN5RI3Hd4I6HPpCzVunVT5LQ=
---
![Anzahl der Installationen](http://iobroker.live/badges/teltonika-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.teltonika.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.teltonika.svg)

<img src="admin/teltonika.svg" height="100px"/>

# IoBroker Teltonika
![Test und Freigabe](https://github.com/ioBroker/ioBroker.teltonika/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/teltonika/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter liest Daten von Teltonika-Routern über MQTT und von Teltonika-Geräten über SNMP.

Router verbinden sich selbst über MQTT mit dem Adapter. Geräte ohne MQTT-Publisher – beispielsweise die TSW Managed Switches – werden stattdessen über SNMP abgefragt; tragen Sie sie im SNMP-Tab ein oder lassen Sie den Netzwerkscan sie finden. Ein Router, der beides unterstützt, wird nur einmal, nämlich über SNMP, ausgelesen.

Über MQTT kann es folgende Informationen auslesen:

- Temperatur ('RUT2', 'RUT9', 'RUTX', 'RUT3', 'RUT1', 'TRB2', 'TRB5', 'OTD', 'RUTM', 'RUTC')
- Signalstärke
- Mobilfunkanbieter
- Netzwerkstatus
- Verbindungstyp (2G/3G/4G/5G)
- WAN-IP-Adresse
- Betriebszeit
- Name
- digitaler Eingang 1 ('RUT9')
- Digitaleingang 2 ('RUT9')
- analoger Eingang ('RUT9', 'TRB2', 'TRB141')
- Pin 2 Status ('TRB2')
- Pin 3 Status ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')
- Status von Pin 4 ('RUT1', 'RUT2', 'RUT9', 'RUTX', 'RUT3', 'TRB1', 'TRB2', 'TRB5', 'RUTM')

## Verwendung
Schritte:

- Starten Sie zuerst die Instanz.
- Gehen Sie zu Ihrem Router und öffnen Sie die MQTT-Einstellungen.

  ![Einstellungen](../../../en/adapterref/iobroker.teltonika/img/settings.png)

- MQTT-Publisher aktivieren
- Legen Sie die MQTT-Broker-Adresse auf die Adresse Ihrer ioBroker-Instanz fest.
- Stellen Sie den MQTT-Broker-Port ein. Wichtig: Der Standardport dieses Adapters ist 1885, um Konflikte mit anderen MQTT-Adaptern zu vermeiden.
- Einstellungen speichern
Bei einigen Routern ist ein Neustart erforderlich, damit die Einstellungen angewendet werden.
Nach einiger Zeit werden die Datenpunkte in der Adapterinstanz erstellt.

**Hinweis**: Getestet wurde nur mit `RUTC`- und `TSW202`-Geräten.

### SNMP
Geräte, die keinen MQTT-Publisher anbieten, werden über SNMP ausgelesen:

- Aktivieren Sie den SNMP-Agenten auf dem Gerät unter *Dienste → SNMP → SNMP-Einstellungen* und legen Sie eine schreibgeschützte Community fest.
- Öffnen Sie im Adapter die Registerkarte *SNMP*, geben Sie einen Adressbereich ein und klicken Sie auf *Scannen*, oder fügen Sie das Gerät manuell hinzu.
Heute werden die Familien „RUTC“ und „TSW2“ unterstützt. Andere Modelle greifen auf die Werte zurück, die jedes Mal von Teltonika verwendet werden.

Gerätefreigaben (Seriennummer, Name, Betriebszeit, CPU); um sie vollständig auszulesen, laden Sie die MIB vom Gerät unter *SNMP-Systemübersicht* herunter, fügen Sie sie in `MIBs/` ein und führen Sie `npm run generate-oids` aus.

Neben den oben aufgeführten Werten liefert SNMP auch Statistiken pro Port für Switches (Verbindung, Geschwindigkeit, Duplex, übertragene Bytes und Raten) sowie für die benannten digitalen Ein- und Ausgänge eines Routers.

Drei weitere Zweige sind verfügbar, aber standardmäßig **deaktiviert**, da sie den Standort des Geräts und identifizierbare Clients offenlegen und sich bei jeder Abfrage ändern:

- *GPS-Position* — Breitengrad, Längengrad, Genauigkeit, Satelliten und Fixzeit
- *WLAN-Funkgeräte und -Netzwerke* – Funkstatus und Kanal sowie pro SSID Verschlüsselung, Modus und Anzahl der Clients
- *Hotspot-Sitzungen* – die IP-Adresse, der Benutzer und der Autorisierungsstatus jeder Sitzung

Die MAC-Tabelle pro Client wird überhaupt nicht gelesen, auch nicht, wenn der Wi-Fi-Zweig aktiviert ist: Die Clientanzahl pro SSID enthält den nützlichen Teil, ohne dass eine fortlaufende Liste der Hardwareadressen aller Clients im Objektbaum geführt wird.

### Schaltanschlüsse
Wenn Sie eine *Schreib-Community* für ein Gerät angeben, werden dessen Ports über `<device>.ports.<name>.enabled` schaltbar. Bleibt das Feld leer, liest der Adapter nur, und der Zustand wird ohne Schreibflag erstellt.

Der Switch verwendet `ifAdminStatus` der Standard-IF-MIB, da die Teltonika-MIB keine beschreibbaren Daten bereitstellt. **PoE kann nicht gesteuert werden**: Diese Geräte antworten ohne Objekte unter der POWER-ETHERNET-MIB.

Ein Port ist nur dann schaltbar, wenn sein Name genau einer Schnittstelle entspricht. Bei einem TSW202 ist dies auf alle Ports übertragbar, da beide Tabellen `port1`…`port8` enthalten. Ein RUTC meldet vier Ports mit dem Namen `LAN` für Schnittstellen `lan1`…`lan4`, die nicht eindeutig zugeordnet werden können. Daher ist nur der Port `WAN` schaltbar.

### Widgets für den Gerätemanager
Für den *Geräte*-Adapter sind zwei Komponenten registriert:

- **Teltonika-Geräte** – jeder Router und Switch einer Instanz als Kachel: Erreichbarkeit, eine Leiste, die die

Der Verbindungsstatus jedes Ports sowie – bei einem Router – Betreiber, Verbindungstyp und Signalstärke werden angezeigt. Ein Klick öffnet die Detailansicht mit Frontpanel, digitalen Ein- und Ausgängen sowie den WAN-Adressen.

- **Teltonika-Anschlüsse** – die Vorderseite eines einzelnen Geräts auf einer eigenen Kachel, mit Angaben zu Verbindung, Geschwindigkeit, Duplex und

Übertragene Bytes pro Port. Die Ports werden so dargestellt, wie sie auf der Hardware beschriftet sind: ungerade Nummern in der oberen Reihe, gerade Nummern darunter, Glasfaserkäfige in einer eigenen Gruppe. Das Gerät wird aus einer Dropdown-Liste ausgewählt, die vom Adapter befüllt wird. Durch Klicken auf die Kachel öffnet sich der Detaildialog für dieses Gerät.

Ein Router zeigt zusätzlich seine **WAN-Schnittstellen** an, da mwan3 diese überwacht: Name, Failover-Status (`online`, `standby`, `notracking`), ob die Schnittstelle aktiviert ist und wie lange sie bereits aktiv ist. Beachten Sie, dass die Adressspalte der WebUI hier kein Gegenstück hat – mwan3 meldet über SNMP die Hosts, die es anpingt, um eine Verbindung zu beurteilen, nicht die Adresse der Schnittstelle.

Wenn eine Schreib-Community konfiguriert ist, kann ein Port über das Bedienfeld umgeschaltet werden. Es gibt bewusst keine PoE-Anzeige – siehe oben, diese Geräte stellen überhaupt keine PoE-Objekte bereit, daher würde ein Blitzsymbol für nicht vorhandene Daten stehen.

Die Widgets erkennen Geräte aus dem Objektbaum und nicht aus der Adapterkonfiguration, da MQTT-Router sich selbst ankündigen und SNMP-Geräte bei ihrer ersten Abfrage erscheinen.

### Fallen
Der Adapter kann SNMP-Traps empfangen. Aktivieren Sie diese Funktion im Reiter *SNMP* und legen Sie unter *Dienste → SNMP → Trap-Einstellungen* den Host fest. Beachten Sie, dass Port 162 unter Linux ein privilegierter Port ist; gegebenenfalls ist ein höherer Port erforderlich.

Jede Benachrichtigung erscheint als `<device>.traps.<name>` mit dem Zeitpunkt des letzten Eingangs und `<device>.traps.last` mit der Bezeichnung der aktuellsten Benachrichtigung. Die meisten Teltonika-Benachrichtigungen enthalten keine Nutzdaten – von den sieben von einem RUTC definierten Benachrichtigungen enthält nur `signalChangeNotification` Daten –, daher wird ein Trap aufgezeichnet und anschließend eine sofortige Abfrage des betreffenden Geräts ausgelöst, woraus die tatsächlichen Werte stammen. Ein TSW202 definiert überhaupt keine Traps.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog
### 1.0.0 (2026-08-10)
* (bluefox) Added SNMP support for devices without an MQTT publisher, such as the TSW switches
* (bluefox) Added a network scan that finds Teltonika devices and fills the device table
* (bluefox) Split the configuration into an MQTT and an SNMP tab
* (bluefox) Added optional SNMP branches for GPS, Wi-Fi and hotspot sessions, switched off by default
* (bluefox) Removed the router type setting, which was never evaluated
* (bluefox) Split the modem address: `wan` keeps the IPv4 address, `wanIPv6` is added where the device has one
* (bluefox) Added an SNMP trap receiver that records notifications and polls the device that sent one
* (bluefox) Community strings and SNMPv3 keys are now stored encrypted
* (bluefox) Ports can be switched through `ports.<name>.enabled` when a write community is configured
* (bluefox) Added two device manager widgets: an overview of all devices and a front panel view of the ports
* (bluefox) `info.connection` now also lists the devices polled over SNMP, so an instance without MQTT clients
  no longer appears disconnected
* (bluefox) Added the WAN interfaces of a router under `interfaces.<name>`: status, enabled and uptime
* (bluefox) A port state created before a write community was configured now becomes writable instead of
  staying read-only forever

### 0.1.0 (2025-12-07)
* (bluefox) Changed roles of the states

### 0.0.2 (2025-12-03)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2025-2026, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.