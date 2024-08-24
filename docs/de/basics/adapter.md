---
lastChanged: "24.08.2024"
---
# Controller und Adapter

## Was ist ein Controller?

Ein Controller in ioBroker ist eine zentrale Komponente, die für die Verwaltung und Koordination des gesamten ioBroker-Systems verantwortlich ist.
Er übernimmt Aufgaben wie die Verwaltung der Adapter, die Speicherung von Daten und die Bereitstellung von Schnittstellen für die Kommunikation zwischen den verschiedenen Komponenten des Systems.
Momentan ist Controller mit TypeScript geschrieben.

### Hauptfunktionen eines Controllers
- 
- **Verwaltung der Adapter**: Der Controller überwacht und steuert die verschiedenen Adapter, die im ioBroker-System installiert sind.
- **Datenverwaltung**: Der Controller speichert und verwaltet die Daten, die von den Adaptern gesammelt werden.
- **Systemüberwachung**: Der Controller überwacht den Zustand des gesamten Systems und stellt sicher, dass alle Komponenten und Adapter ordnungsgemäß funktionieren. Er kann Benachrichtigungen und Alarme auslösen, wenn Probleme auftreten.

## Was ist ein Adapter?

Ein Adapter in ioBroker ist eine Softwarekomponente, die es ermöglicht, verschiedene Geräte,
Dienste oder Protokolle in das ioBroker-System zu integrieren.
Adapter fungieren als Schnittstellen zwischen ioBroker und den externen Systemen, die Sie steuern oder von denen sie Daten sammeln.

### Hauptfunktionen eines Adapters

1. **Datenintegration**: Adapter sammeln Daten von externen Geräten oder Diensten und stellen diese Daten im ioBroker zur Verfügung. Dies kann z.B. Sensordaten, Statusinformationen oder andere relevante Daten umfassen.
2. **Steuerung**: Adapter ermöglichen es, externe Geräte oder Dienste über das ioBroker-System zu steuern. Dies kann z.B. das Ein- und Ausschalten von Geräten, das Einstellen von Parametern oder das Ausführen von Befehlen umfassen.
3. **Protokollübersetzung**: Adapter übersetzen die Kommunikationsprotokolle externer Geräte oder Dienste in ein Format, das ioBroker verstehen kann. Dies ermöglicht die nahtlose Integration verschiedener Systeme, die unterschiedliche Protokolle verwenden.

### Beispiele für Adapter

- **Zigbee-Adapter**: Ermöglicht die Integration von Zigbee-basierten Geräten wie Lampen, Sensoren und Schaltern.
- **MQTT-Adapter**: Ermöglicht die Kommunikation mit MQTT-basierten Diensten und Geräten.
- **HTTP-Adapter**: Ermöglicht die Integration von Diensten, die über HTTP kommunizieren.

### Vorteile der Verwendung von Adaptern

- **Flexibilität**: Adapter ermöglichen die Integration einer Vielzahl von Geräten und Diensten, unabhängig von deren Kommunikationsprotokollen.
- **Erweiterbarkeit**: Neue Adapter können entwickelt werden, um zusätzliche Geräte oder Dienste zu unterstützen, wodurch das ioBroker-System kontinuierlich erweitert werden kann.
- **Zentralisierung**: Durch die Verwendung von Adaptern können alle Geräte und Dienste zentral über das ioBroker-System verwaltet und gesteuert werden.

### Typen von Adaptern
- **Geräteadapter**: Diese Adapter ermöglichen die Integration und Steuerung von physischen Geräten wie Lampen, Sensoren und Schaltern. Beispiele sind der Zigbee-Adapter und der Z-Wave-Adapter.  
- **Protokolladapter**: Diese Adapter übersetzen verschiedene Kommunikationsprotokolle in ein Format, das ioBroker verstehen kann. Beispiele sind der MQTT-Adapter und der HTTP-Adapter.  
- **Serviceadapter**: Diese Adapter ermöglichen die Integration von Online-Diensten und APIs. Beispiele sind der Alexa-Adapter und der Google-Home-Adapter.  
- **Datenbankadapter**: Diese Adapter ermöglichen die Speicherung und Abfrage von Daten in verschiedenen Datenbanksystemen. Beispiele sind der SQL-Adapter und der InfluxDB-Adapter.  
- **Visualisierungsadapter**: Diese Adapter bieten Möglichkeiten zur Visualisierung und Darstellung von Daten. Beispiele sind der Vis-Adapter und der Flot-Adapter.  
- **Skriptadapter**: Diese Adapter ermöglichen das Erstellen und Ausführen von Skripten innerhalb von ioBroker. Beispiele sind der JavaScript-Adapter und der Blockly-Adapter.  
- **Spezialadapter**: Diese Adapter bieten spezielle Funktionen oder Integrationen, die nicht in die anderen Kategorien passen. Beispiele sind der Ping-Adapter und der Backitup-Adapter.
