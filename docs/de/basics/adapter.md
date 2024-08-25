---
lastChanged: 24.08.2024
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/basics/adapter.md
title: Controller und Adapter
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
hash: rX78U8X1Tc4gCcfD0BxZf25oR3whd6R0b4YXewZbVtg=
---
# Controller und Adapter
## Was ist ein Controller?
Ein Controller in ioBroker ist eine zentrale Komponente, die für die Verwaltung und Koordination des gesamten ioBroker-Systems verantwortlich ist.
Er übernimmt Aufgaben wie die Verwaltung der Adapter, die Speicherung von Daten und die Bereitstellung von Schnittstellen für die Kommunikation zwischen den Adaptern.
Derzeit wird der Controller mit TypeScript geschrieben.

### Hauptfunktionen eines Controllers
- **Adapterverwaltung**: Der Controller überwacht und steuert die verschiedenen im ioBroker-System installierten Adapter.
- **Datenverwaltung**: Der Controller speichert und verwaltet die von den Adaptern gesammelten Daten.
**Systemüberwachung**: Der Controller überwacht den Zustand des gesamten Systems und stellt sicher, dass alle Komponenten und Adapter ordnungsgemäß funktionieren. Bei Problemen kann er Benachrichtigungen und Alarme auslösen.
- **Kommunikation**: Der Controller stellt die Schnittstellen bereit, über die die verschiedenen Adapter von ioBroker miteinander kommunizieren können.

## Was ist ein Adapter?
Ein Adapter in ioBroker ist eine Softwarekomponente, die es Ihnen ermöglicht, verschiedene Geräte, Dienste oder Protokolle in das ioBroker-System zu integrieren.

Es kann verschiedene Aktionen mit den gesammelten Daten durchführen, z. B. sie speichern, verarbeiten oder an andere Systeme weiterleiten. Es kann die Daten auch auf verschiedene Weise visualisieren.

Adapter fungieren als Schnittstellen zwischen ioBroker und den externen Systemen, die Sie steuern oder von denen bzw. zwischen denen Sie Daten sammeln, und dem Menschen.

### Hauptfunktionen eines Adapters
1. **Datenintegration**: Adapter sammeln Daten von externen Geräten oder Diensten und stellen diese im ioBroker zur Verfügung. Dies können beispielsweise Sensordaten, Statusinformationen oder andere relevante Daten sein.
2. **Steuerung**: Adapter ermöglichen die Steuerung externer Geräte oder Dienste über das ioBroker-System. Dazu kann beispielsweise das Ein- und Ausschalten von Geräten, das Setzen von Parametern oder das Ausführen von Befehlen gehören.
3. **Visualisierung**: Adapter können Daten auf verschiedene Weise visualisieren, beispielsweise in Diagrammen, Grafiken, Tabellen, Schaltflächen, Schiebereglern usw.
4. **Verlauf**: Adapter können Daten zur späteren Analyse oder Visualisierung speichern.
5. **Automatisierung**: Adapter können Aktionen basierend auf bestimmten Bedingungen oder Ereignissen auslösen.
6. **Benachrichtigung**: Adapter können basierend auf bestimmten Bedingungen oder Ereignissen Benachrichtigungen oder Warnungen senden.
7. **Service**: Adapter können Konfigurationen sichern, Firmware aktualisieren usw.

### Beispiele für Adapter
- **Zigbee-Adapter**: Ermöglicht die Integration von Zigbee-basierten Geräten wie Lampen, Sensoren und Schaltern.
- **MQTT-Adapter**: Ermöglicht die Kommunikation mit MQTT-basierten Diensten und Geräten.
- **JavaScript-Adapter**: Ermöglicht Ihnen, Skripte in JavaScript/TypeScript zu schreiben oder die Logikblöcke grafisch zu kombinieren, um Geräte oder Dienste zu steuern.

### Vorteile der Verwendung von Adaptern
- **Flexibilität**: Adapter ermöglichen die Integration einer breiten Palette von Geräten und Diensten, unabhängig von ihren Kommunikationsprotokollen.
- **Erweiterbarkeit**: Es können neue Adapter entwickelt werden, um zusätzliche Geräte oder Dienste zu unterstützen, sodass das ioBroker-System kontinuierlich erweitert werden kann.
- **Zentralisierung**: Durch den Einsatz von Adaptern können alle Geräte und Dienste zentral über das ioBroker-System verwaltet und gesteuert werden.

### Adaptertypen
- `general` - Adapter für allgemeine Zwecke. Beispiele sind die Adapter `web`, `welcome` oder `js-controller`.
- „Alarm“ – Für Sicherheits- und Alarmfunktionen. Beispiele sind die Kameraadapter.
- „climate-control“ – Zur Steuerung von Heizungs-, Lüftungs- und Klimaanlagen. Beispiele sind die Adapter „Daikin“ oder „dysonairpurifier“.
- „Kommunikation“ – Zur Kommunikation mit anderen Systemen oder Diensten. Beispiele sind die „Rest-API“ oder „Cloud“-Adapter.
- „Datum und Uhrzeit“ – Zur zeitgesteuerten Steuerung von Geräten. Beispiele sind der Adapter „trashschedule“ oder „birthdays“.
- „energy“ - Zur Überwachung und Steuerung des Energieverbrauchs bzw. der Energieverbrauchserzeugung. Beispiele hierfür sind die Adapter „Solarlog“ oder „SMA-EM“.
- „Garden“ – Zur Steuerung von Gartengeräten. Beispiele sind der Adapter „Gardena“ oder „Rainbird“.
- „Geoposition“ – Zum Verfolgen der Position von Geräten. Beispiele sind der Adapter „Geofency“ oder „Owntracks“.
- „Hardware“ – Diese Adapter ermöglichen die Integration und Steuerung von physischen Geräten wie Lampen, Sensoren und Schaltern. Beispiele sind der Zigbee-Adapter, der Z-Wave-Adapter usw.
- „health“ – Zur Überwachung von Gesundheitsdaten. Beispiele sind der Adapter „fitbit-fitness“ oder „withings“.
- „Haushalt“ – Zur Steuerung von Haushaltsgeräten wie Staubsaugern oder Geschirrspülern. Beispiele sind der Adapter „Botvac“ oder „Ecovacs-Deebot“.
- „Infrastruktur“ – Zur Überwachung und Steuerung von Infrastrukturgeräten wie Routern, Druckern oder NAS. Beispiele sind der „Fritzbox“- oder „Proxmox“-Adapter.
- „iot-systems“ – Zur Integration von IoT-Systemen mit verschiedenen Gerätetypen. Beispiele sind der Adapter „s7“ oder „tasmota“.
- ...
