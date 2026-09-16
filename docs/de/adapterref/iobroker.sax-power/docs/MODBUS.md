---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/docs/MODBUS.md
title: Modbus-Integrations-Roadmap
hash: 1Efyi5HE9/fHvJmGkjLFebhAuL+mfJz3nScdYllMtwE=
---
# Modbus-Integrations-Roadmap

## Versionsstatus 1.0

Die Modbus-Steuerung wird in Version 1.0 absichtlich nicht bereitgestellt.

Version 1.0 bietet:

- SAX Power Cloud-Verbindung
- Geräteerkennung
- Live-Messungen
- historische Statistiken
- aggregierte Live-Werte

Es bietet keine beschreibbare Lade- oder Entladesteuerung.

## Geplante Gestaltung

Eine spätere Version kann optional Steuerbefehle an beschreibbare Zustände eines installierten ioBroker Modbus-Adapters weiterleiten.

Das Design sollte unabhängig von einer festen Modbus-Instanznummer bleiben. Benutzer wählen die benötigte Modbus-Instanz aus, und der Adapter ermittelt die darunter liegenden beschreibbaren numerischen Zustände.

## Bekannte SAX Power-Registerinformationen

Basierend auf der während der Entwicklung eingesehenen SAX Power-Dokumentation:

- Register 44 dient zur Festlegung der Ladeleistungsbegrenzung.
- Register 43 ist für die Entladeleistungsgrenze vorgesehen.

Register 43 ist möglicherweise nicht in jeder bestehenden ioBroker Modbus-Konfiguration vorhanden.

Der Adapter darf nicht davon ausgehen, dass die Modbus-Instanz`modbus.1` Die

## Sicherheitsanforderungen

Bevor die Modbus-Steuerung freigegeben wird, muss die Implementierung Folgendes beinhalten:

- explizite Opt-in
- Validierung von beschreibbaren Zielzuständen
- Wertebereichsvalidierung
- Clear-Einheiten
- sicheres Startverhalten
- Nach der Installation werden keine automatischen Schreibvorgänge durchgeführt.
- Abhängigkeits- und Verfügbarkeitsprüfungen
- Fehlerbehebung
- Prüffreundliche Protokollierung ohne sensible Daten
- Tests auf fehlende oder veraltete Zustände

## Intelligentes Laden

Eine spätere Steuerungsfunktion kann eine benutzerdefinierte Abrechnungslogik integrieren. Diese Funktion ist von der grundlegenden Modbus-Weiterleitung getrennt und muss Abhängigkeiten wie die folgenden berücksichtigen:

- PV-Verfügbarkeit
- Haushaltsverbrauch
- Gitterrichtung
- Batterie-SOC
- konfigurierte Grenzwerte
- veraltete Messungen
- Kommunikationsfehler
- mehrere Speichergeräte
- manuelle Überschreibung
- Ausweichverhalten

Version 1.0 beinhaltet keinen Kontrollalgorithmus.