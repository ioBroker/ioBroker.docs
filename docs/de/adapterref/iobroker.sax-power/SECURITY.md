---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/SECURITY.md
title: Sicherheitsrichtlinie
hash: 7twPuEZosaLVhV8hmLZ+VUiyghBGkTzWAQNiilQrQIg=
---
# Sicherheitsrichtlinie

## Unterstützte Versionen

Für die neueste veröffentlichte Version des Adapters werden Sicherheitskorrekturen bereitgestellt.

## Meldung einer Sicherheitslücke

Bitte veröffentlichen Sie keine Sicherheitslücken in einem öffentlichen GitHub-Issue.

Kontaktieren Sie den/die Verantwortliche/n privat über die mit dem GitHub-Konto oder -Repository verknüpften Kontaktdaten. Geben Sie Folgendes an:

- betroffene Adapterversion
- Auswirkungen
- Reproduktionsschritte
- relevante Protokolle, aus denen Geheimnisse entfernt wurden
- vorgeschlagene Minderungsmaßnahmen, sofern bekannt

Bitte nicht einschließen:

- SAX Power-Passwörter
- Inhaber-Tokens
- private E-Mail-Adressen
- vollständige Speicherseriennummern
- Informationen zu privaten Netzwerken

## Sicherheitsmodell

Version 1.0:

- Führt schreibgeschützte SAX Power Cloud-Anfragen durch
- speichert Anmeldeinformationen in der ioBroker-Instanzkonfiguration
- speichert Authentifizierungstoken im Speicher
- Schreibt keine Anmeldeinformationen oder Token in die Protokolle.
- stellt keine beschreibbaren Modbus-Steuerungszustände bereit
- Führt keine Cloud-Konfigurationsänderungen durch

Für keine Software kann absolute Sicherheitslückenfreiheit garantiert werden. Verantwortungsbewusste Meldungen sind willkommen.