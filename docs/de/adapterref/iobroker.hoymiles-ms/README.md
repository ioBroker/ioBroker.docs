---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.hoymiles-ms.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.hoymiles-ms.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/hoymiles-ms-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/hoymiles-ms-stable.svg
BADGE-License: https://img.shields.io/github/license/mcm4iob/ioBroker.hoymiles-ms?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
---
# ioBroker.hoymiles-ms Dokumentation

## Übersicht

Der **ioBroker.hoymiles-ms** Adapter integriert **Hoymiles MicroStorage Systeme** (derzeit unterstützt das Hoymiles MS-A2 Modell) in ioBroker. Dieser Adapter ermöglicht die Überwachung und Steuerung Ihres Hoymiles MS-A2 Energiespeichersystems über die ioBroker Plattform.

Das Hoymiles MS-A2 ist eine MicroStorage Einheit, die Solar-Wechselrichter und Batteriespeicher-Funktionen kombiniert. Weitere Informationen zum Gerät finden Sie [hier](https://www.hoymiles.com/de/products/micro-storage).

**Hinweis:** Dieser Adapter ist nicht mit Hoymiles verbunden und ist ein unabhängiges Community-Projekt.

## Funktionen

- **Echtzeit-Überwachung**: Batteriestatus, Stromverbrauch, Netzinteraktion
- **Energieverfolgung**: Überwachung von Energieproduktion, -verbrauch und -speicherung
- **Netzüberwachung**: Verfolgung von netzgekoppeltem und netzunabhängigem Betrieb
- **Systemstatistiken**: Umfassender Überblick über die Systemleistung
- **Leistungssteuerung**: Einstellung und Kontrolle der Ausgangsleistung
- **Mehrere Geräte**: Handhabung mehrerer MS-A2 Einheiten gleichzeitig
- **MQTT-Kommunikation**: Zuverlässige Kommunikation über MQTT-Protokoll

## Voraussetzungen

Vor der Einrichtung des Adapters stellen Sie sicher, dass Sie haben:

1. **ioBroker System** läuft (Node.js >= 20)
2. **Hoymiles MS-A2** MicroStorage Einheit
3. **S-Miles Home App** auf Ihrem mobilen Gerät installiert
4. **Netzwerkkonnektivität** zwischen ioBroker und MS-A2 Einheit
5. **Freien TCP-Port** für MQTT-Kommunikation (Standard: 1881)

## Adapter-Einrichtung und Konfiguration

### Schritt 1: Adapter installieren

Installieren Sie den Adapter über die ioBroker Admin-Oberfläche:

1. Öffnen Sie die ioBroker Admin-Oberfläche in Ihrem Webbrowser
2. Navigieren Sie zum "Adapter" Tab
3. Suchen Sie nach "hoymiles-ms" im Adapter-Repository
4. Klicken Sie auf die "Installieren" Schaltfläche neben dem Adapter

**Wichtig:** Installieren Sie niemals ioBroker-Adapter direkt mit npm. Verwenden Sie immer die ioBroker Admin-Oberfläche für ordnungsgemäße Installation und Abhängigkeitsverwaltung.

### Schritt 2: Adapter konfigurieren

1. Öffnen Sie die ioBroker Admin-Oberfläche
2. Navigieren Sie zu "Adapter" und finden Sie "hoymiles-ms"
3. Klicken Sie auf das Konfigurationssymbol (Zahnrad)
4. Konfigurieren Sie die folgenden Einstellungen:

#### MQTT-Server-Konfiguration

| Parameter | Beschreibung | Standardwert | Hinweise |
|-----------|--------------|--------------|----------|
| **Client-Modus** | MQTT-Client-Modus aktivieren | `false` | Derzeit nicht implementiert |
| **MQTT-Netzwerk** | Netzwerkschnittstelle zum Binden | `0.0.0.0` | Auf allen Schnittstellen lauschen |
| **MQTT-Port** | TCP-Port für MQTT-Server | `1881` | Konflikte mit anderen MQTT-Diensten vermeiden |

**Wichtige Hinweise:**
- Der Adapter arbeitet derzeit nur im **MQTT-Server-Modus**
- **Authentifizierung wird noch nicht unterstützt** - stellen Sie sicher, dass Ihr Netzwerk sicher ist
- Port 1881 wird gewählt, um Konflikte mit ioBroker.mqtt (1883) und ioBroker.shelly (1882) zu vermeiden

### Schritt 3: Speichern und Adapter starten

1. Klicken Sie "Speichern & Schließen" im Konfigurationsdialog
2. Aktivieren Sie die Adapter-Instanz
3. Der Adapter startet und beginnt auf MQTT-Verbindungen zu lauschen

## Hoymiles MS-A2 Geräte-Einrichtung

Um Ihre MS-A2 Einheit mit dem ioBroker Adapter zu verbinden, müssen Sie sie über die S-Miles Home App konfigurieren.

### Schritt 1: S-Miles Home App öffnen

1. Starten Sie die S-Miles Home App auf Ihrem mobilen Gerät
2. Stellen Sie sicher, dass Sie mit demselben Netzwerk wie Ihre MS-A2 Einheit verbunden sind

### Schritt 2: MQTT-Konfiguration aufrufen

1. Navigieren Sie zur **Konfigurations**-Seite (Zahnrad-Symbol oben rechts)
2. Scrollen Sie nach unten, um den Abschnitt **"MQTT-Service"** zu finden
3. **Aktivieren** Sie den MQTT-Service

### Schritt 3: MQTT-Einstellungen konfigurieren

| Einstellung | Wert | Beschreibung |
|-------------|------|--------------|
| **Server-Adresse** | `<ioBroker-IP>` | IP-Adresse Ihres ioBroker Systems |
| **Port** | `1881` | Im Adapter konfigurierter Port (Standard: 1881) |
| **Client-Präfix** | `MSA` | Optionaler Identifikator-Präfix (Standard: MSA) |
| **Authentifizierung** | `Deaktiviert` | Muss deaktiviert sein (noch nicht unterstützt) |

**Beispiel-Konfiguration:**
- Server-Adresse: `192.168.1.100` (ersetzen Sie durch Ihre ioBroker IP)
- Port: `1881`
- Client-Präfix: `MSA`
- Benutzername: *(leer lassen)*
- Passwort: *(leer lassen)*

### Schritt 4: Einstellungen anwenden

1. Speichern Sie die MQTT-Konfiguration in der S-Miles Home App
2. Die MS-A2 Einheit startet ihren MQTT-Service neu
3. Überprüfen Sie die ioBroker Logs für Verbindungsbestätigung

## Betrieb und Datenfluss

### Datenaktualisierungsintervalle

Die MS-A2 Einheit sendet Daten in verschiedenen Intervallen (diese werden von der Hoymiles API definiert und können nicht konfiguriert werden):

- **Konfigurationsdaten**: Einmal beim Verbindungsaufbau gesendet
- **Echtzeit-Daten**: Aktualisierung alle **1 Sekunde**
- **Systemstatistiken**: Aktualisierung alle **5 Minuten**

### Geräte-Verbindungsstatus

- Der Adapter überwacht die Gerätekonnektivität automatisch
- Geräte gelten als **offline**, wenn 30 Sekunden lang keine Daten empfangen werden
- Der Verbindungsstatus wird im `info.online` Zustand angezeigt

## Vom Adapter erstellte Zustände

Der Adapter erstellt dynamisch Zustände basierend auf den von Ihrer MS-A2 Einheit empfangenen Daten. Zustände sind hierarchisch organisiert:

### Geräteinformations-Zustände

| Zustand | Typ | Einheit | Rolle | Beschreibung |
|---------|-----|---------|-------|--------------|
| `device.manufacturer` | string | - | text | Gerätehersteller |
| `device.model` | string | - | info.model | Gerätemodell |
| `device.name` | string | - | info.name | Gerätename |
| `device.sw_version` | string | - | info.firmware | Software-Version |
| `device.identifiers` | array | - | list | Geräte-Identifikatoren |

### Batterie-Zustände

| Zustand | Typ | Einheit | Rolle | Beschreibung |
|---------|-----|---------|-------|--------------|
| `device.bat_i` | number | A | value.current | Batteriestrom |
| `device.bat_p` | number | W | value.power | Batterieleistung |
| `device.bat_temp` | number | °C | value.temperature | Batterietemperatur |
| `device.bat_v` | number | V | value.voltage | Batteriespannung |
| `device.bat_sts` | string | - | text | Batteriestatus |
| `device.soc` | number | % | value | Ladezustand |

### Netzverbindungs-Zustände (Netz Ein)

| Zustand | Typ | Einheit | Rolle | Beschreibung |
|---------|-----|---------|-------|--------------|
| `device.grid_on.v` | number | V | value.voltage | Netzspannung (netzbetrieben) |
| `device.grid_on.i` | number | A | value.current | Netzstrom (netzbetrieben) |
| `device.grid_on.f` | number | Hz | value.frequency | Netzfrequenz (netzbetrieben) |
| `device.grid_on.p` | number | W | value.power.active | Wirkleistung (netzbetrieben) |
| `device.grid_on.q` | number | Var | value.power.reactive | Blindleistung (netzbetrieben) |
| `device.grid_on.ein` | number | Wh | value.energy.consumed | Verbrauchte Energie (netzbetrieben) |
| `device.grid_on.eout` | number | Wh | value.energy.produced | Erzeugte Energie (netzbetrieben) |
| `device.grid_on.etin` | number | Wh | value.energy.consumed | Gesamt verbrauchte Energie (netzbetrieben) |
| `device.grid_on.etout` | number | Wh | value.energy.produced | Gesamt erzeugte Energie (netzbetrieben) |

### Netzverbindungs-Zustände (Netz Aus)

| Zustand | Typ | Einheit | Rolle | Beschreibung |
|---------|-----|---------|-------|--------------|
| `device.grid_off.v` | number | V | value.voltage | Netzspannung (netzunabhängig) |
| `device.grid_off.i` | number | A | value.current | Netzstrom (netzunabhängig) |
| `device.grid_off.f` | number | Hz | value.frequency | Netzfrequenz (netzunabhängig) |
| `device.grid_off.p` | number | W | value.power.active | Wirkleistung (netzunabhängig) |
| `device.grid_off.q` | number | Var | value.power.reactive | Blindleistung (netzunabhängig) |
| `device.grid_off.ein` | number | Wh | value.energy.consumed | Verbrauchte Energie (netzunabhängig) |
| `device.grid_off.eout` | number | Wh | value.energy.produced | Erzeugte Energie (netzunabhängig) |
| `device.grid_off.etin` | number | Wh | value.energy.consumed | Gesamt verbrauchte Energie (netzunabhängig) |
| `device.grid_off.etout` | number | Wh | value.energy.produced | Gesamt erzeugte Energie (netzunabhängig) |

### Wechselrichter-Zustände

| Zustand | Typ | Einheit | Rolle | Beschreibung |
|---------|-----|---------|-------|--------------|
| `device.inv.v` | number | V | value.voltage | Wechselrichterspannung |
| `device.inv.i` | number | A | value.current | Wechselrichterstrom |
| `device.inv.p` | number | W | value.power.active | Wechselrichter Wirkleistung |
| `device.inv.q` | number | Var | value.power.reactive | Wechselrichter Blindleistung |
| `device.inv.ein` | number | Wh | value.energy.consumed | Wechselrichter verbrauchte Energie |
| `device.inv.eout` | number | Wh | value.energy.produced | Wechselrichter erzeugte Energie |
| `device.inv.etin` | number | Wh | value.energy.consumed | Wechselrichter gesamt verbrauchte Energie |
| `device.inv.etout` | number | Wh | value.energy.produced | Wechselrichter gesamt erzeugte Energie |

### Echtzeit-Daten-Zustände

| Zustand | Typ | Einheit | Rolle | Beschreibung |
|---------|-----|---------|-------|--------------|
| `realtime.bat_p` | number | W | value.power | Echtzeit Batterieleistung |
| `realtime.bat_sts` | string | - | text | Echtzeit Batteriestatus |
| `realtime.grid_on_p` | number | W | value.power | Echtzeit Netzleistung (netzbetrieben) |
| `realtime.grid_off_p` | number | W | value.power | Echtzeit Netzleistung (netzunabhängig) |
| `realtime.soc` | number | % | value | Echtzeit Ladezustand |
| `realtime.sys_bat_p` | number | W | value.power | Echtzeit System-Batterieleistung |
| `realtime.sys_grid_p` | number | W | value.power | Echtzeit System-Netzleistung |
| `realtime.sys_load_p` | number | W | value.power | Echtzeit System-Lastleistung |
| `realtime.sys_plug_p` | number | W | value.power | Echtzeit System-Steckerleistung |
| `realtime.sys_pv_p` | number | W | value.power | Echtzeit System-PV-Leistung |
| `realtime.sys_soc` | number | % | value | Echtzeit System-Ladezustand |
| `realtime.sys_sp_p` | number | W | value.power | Echtzeit System-Sollwertleistung |

### Systemstatistik-Zustände

| Zustand | Typ | Einheit | Rolle | Beschreibung |
|---------|-----|---------|-------|--------------|
| `system.bat_p` | number | W | value.power | System-Batterieleistung |
| `system.chg_e` | number | Wh | value.energy.consumed | System-Ladeenergie |
| `system.dchg_e` | number | Wh | value.energy.produced | System-Entladeenergie |
| `system.grid_p` | number | W | value.power | System-Netzleistung |
| `system.ems_mode` | string | - | state | Energiemanagementsystem-Modus |
| `system.plug_in_e` | number | Wh | value.energy.consumed | System-Stecker-Eingangsenergie |
| `system.plug_out_e` | number | Wh | value.energy.produced | System-Stecker-Ausgangsenergie |
| `system.pv_e` | number | Wh | value.energy.produced | System-PV-Energie |
| `system.pv_p` | number | W | value.power | System-PV-Leistung |
| `system.soc` | number | % | value | System-Ladezustand |
| `system.sp_p` | number | W | value.power | System-Sollwertleistung |

### Leistungssteuerungs-Zustände

| Zustand | Typ | Einheit | Rolle | Zugriff | Beschreibung |
|---------|-----|---------|-------|---------|--------------|
| `power_ctrl.min` | number | W | value.power | Lesen | Minimale Leistungseinstellung |
| `power_ctrl.max` | number | W | value.power | Lesen | Maximale Leistungseinstellung |
| `power_ctrl.set` | number | W | level.power | Lesen/Schreiben | **Leistungssollwert (steuerbar)** |
| `power_ctrl.step` | number | W | value.power | Lesen | Leistungsanpassungs-Schrittgröße |

### Informations-Zustände

| Zustand | Typ | Einheit | Rolle | Beschreibung |
|---------|-----|---------|-------|--------------|
| `info.online` | boolean | - | indicator.reachable | Geräte-Online-Status |
| `info.ip` | string | - | info.ip | Geräte-IP-Adresse |
| `info.timestamp` | number | - | date | Letzter Daten-Zeitstempel |
| `device.rssi` | number | db | value | Wi-Fi-Signalstärke |

### EMS-Steuerungs-Zustände

| Zustand | Typ | Rolle | Zugriff | Werte | Beschreibung |
|---------|-----|-------|---------|-------|--------------|
| `ems_mode.command` | string | state | Lesen/Schreiben | `general`, `mqtt_ctrl` | **EMS-Modus-Steuerung** |

## Leistungssteuerungs-Funktionalität

Der Adapter bietet Leistungssteuerungsfähigkeiten über spezifische schreibbare Zustände:

### Leistungsausgang einstellen

Um die Leistungsabgabe Ihrer MS-A2 Einheit zu steuern:

1. **EMS-Modus setzen**: Setzen Sie zuerst `ems_mode.command` auf `mqtt_ctrl`
2. **Leistungspegel setzen**: Schreiben Sie den gewünschten Leistungswert in `power_ctrl.set`
3. **Gültiger Bereich**: Leistungswert muss zwischen `power_ctrl.min` und `power_ctrl.max` liegen
4. **Schrittgröße**: Verwenden Sie `power_ctrl.step` für angemessene Schritte

### Beispiel Leistungssteuerung

```javascript
// MQTT-Steuerungsmodus aktivieren
setState('hoymiles-ms.0.MSA_12345.ems_mode.command', 'mqtt_ctrl');

// Leistungsabgabe auf 500W setzen (Beispiel)
setState('hoymiles-ms.0.MSA_12345.power_ctrl.set', 500);
```

### Hinweise zur Leistungssteuerung

- Leistungssteuerung ist nur verfügbar, wenn sich das Gerät im `mqtt_ctrl` Modus befindet
- Leistungseinstellungen werden sofort von der MS-A2 Einheit angewendet
- Überwachen Sie die Echtzeit-Zustände, um Leistungsänderungen zu verifizieren
- Kehren Sie zum `general` Modus zurück, um automatischen Betrieb wiederherzustellen

## Unterstützung mehrerer Geräte

Der Adapter handhabt automatisch mehrere MS-A2 Einheiten:

- Jedes Gerät wird durch seine eindeutige Client-ID identifiziert
- Zustände werden dynamisch für jedes verbundene Gerät erstellt
- Geräteobjekte werden unter separaten Ordnern organisiert
- Online-Status wird individuell für jedes Gerät verfolgt

## Fehlerbehebung

### Häufige Probleme

**Gerät verbindet sich nicht:**
1. Überprüfen Sie die Netzwerkkonnektivität zwischen ioBroker und MS-A2
2. Überprüfen Sie die MQTT-Server-Konfiguration in den Adapter-Einstellungen
3. Stellen Sie sicher, dass Port 1881 nicht von der Firewall blockiert wird
4. Überprüfen Sie MQTT-Einstellungen in der S-Miles Home App

**Zustände aktualisieren sich nicht:**
1. Überprüfen Sie den Geräte-Online-Status (`info.online`)
2. Überprüfen Sie Zeitstempel-Aktualisierungen (`info.timestamp`)
3. Überprüfen Sie Adapter-Logs auf Fehlermeldungen
4. Starten Sie den Adapter bei Bedarf neu

**Leistungssteuerung funktioniert nicht:**
1. Stellen Sie sicher, dass der EMS-Modus auf `mqtt_ctrl` gesetzt ist
2. Überprüfen Sie, ob der Leistungswert im min/max-Bereich liegt
3. Überprüfen Sie, dass das Gerät online ist und antwortet
4. Überwachen Sie Echtzeit-Zustände auf Änderungen

### Log-Analyse

Aktivieren Sie detailliertes Logging, indem Sie das Adapter-Log-Level auf "debug" oder "silly" setzen:

- **Info-Level**: Verbindungsereignisse und grundlegende Operationen
- **Debug-Level**: Detaillierte MQTT-Kommunikation
- **Silly-Level**: Alle MQTT-Nachrichten und Zustandsaktualisierungen

### Netzwerkanforderungen

- **Port 1881/TCP**: Muss von MS-A2 zu ioBroker erreichbar sein
- **Firewall**: Stellen Sie sicher, dass MQTT-Traffic erlaubt ist
- **Netzwerkstabilität**: Stabile Verbindung für zuverlässigen Betrieb erforderlich

## FAQ

**F: Kann ich einen anderen MQTT-Port verwenden?**
A: Ja, konfigurieren Sie einen beliebigen freien Port in den Adapter-Einstellungen und aktualisieren Sie die MS-A2 Konfiguration entsprechend.

**F: Unterstützt der Adapter Authentifizierung?**
A: Noch nicht. Authentifizierungsunterstützung ist für zukünftige Versionen geplant.

**F: Kann ich mehrere MS-A2 Einheiten überwachen?**
A: Ja, jede Einheit erscheint als separates Gerät mit eigenen Zuständen.

**F: Wie oft werden Daten aktualisiert?**
A: Echtzeit-Daten werden jede Sekunde aktualisiert, Systemstatistiken alle 5 Minuten (gesteuert von der Hoymiles API).

**F: Kann ich Lade-/Entladepläne steuern?**
A: Derzeit wird nur Leistungsausgangssteuerung unterstützt. Erweiterte Terminplanung könnte in zukünftigen Versionen hinzugefügt werden.

**F: Was passiert, wenn die Netzwerkverbindung verloren geht?**
A: Der Adapter erkennt offline Geräte und markiert sie entsprechend. Daten werden fortgesetzt, wenn die Verbindung wiederhergestellt ist.

**F: Gibt es Einschränkungen?**
A: Der Adapter ist derzeit auf schreibgeschützte Überwachung und grundlegende Leistungssteuerung beschränkt. Erweiterte Funktionen hängen von den Hoymiles API-Fähigkeiten ab.

## Unterstützung und Beiträge

Für Probleme, Fragen oder Beiträge:

- **GitHub Issues**: [Probleme hier melden](https://github.com/mcm4iob/ioBroker.hoymiles-ms/issues)
- **ioBroker Forum**: [Community-Unterstützung und Diskussionen](https://forum.iobroker.net/topic/81667/test-adapter-hoymiles-ms-v0-2-x)
- **Dokumentation**: Dieses Dokument und Inline-Code-Kommentare

**Wenn Ihnen dieser Adapter gefällt, denken Sie bitte über eine Spende nach:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

---

*Dieser Adapter ist ein unabhängiges Community-Projekt und ist nicht mit Hoymiles verbunden.*

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.2 (2026-01-10)
* (mcm1957) Subscription code has been fixed to allow operation with hoymiles mqtt v3.0
* (mcm1957) NOTE: TOU topics are not yet supported and raising warnings currently.

### 0.2.1 (2026-01-09)
* (mcm1957) ignore empty and invalid payloads. [#90]
* (mcm1957) Dependencies have been updated

### 0.2.0 (2025-08-23)
* (mcm1957) States are created dynamically now. So no states should be created if a system does not provide data for it (i.e slave micro storage).
* (mcm1957) State values are reset during startup now to prevent stale information.
* (mcm1957) Support to control power consumption and delivery has been added.
* (mcm1957) Dependencies have been updated

### 0.1.2 (2025-08-03)
* (mcm1957) Warnings raised from slave systems have been removed
* (mcm1957) Dependencies have been updated

### 0.1.1 (2025-07-27)
* (mcm1957) Handling of configuration has been corrected
* (mcm1957) Translations have been adapted

### 0.1.0 (2025-07-26)
* (mcm1957) initial release

## License
MIT License

Copyright (c) 2025-2026 mcm1957 <mcm57@gmx.at>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.