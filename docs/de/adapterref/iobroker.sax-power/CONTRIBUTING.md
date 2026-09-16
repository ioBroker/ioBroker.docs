---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/CONTRIBUTING.md
title: Mitwirken
hash: ibLiGvkq5ca4b8DMqccbqbCJYZaxymniP9fCmW+soYY=
---
# Mitwirken

Vielen Dank für Ihre Hilfe bei der Verbesserung des ioBroker SAX-Netzteils.

## Bevor Sie ein Problem melden

Überprüfen Sie bitte:

- ob das Problem auch in der neuesten Version noch auftritt
- ob die Adapterinstanz verbunden ist
- ob das SAX Power Cloud-Konto im offiziellen Dashboard funktioniert
- ob das Problem bereits gemeldet wurde

Veröffentlichen Sie keine Passwörter, Bearer-Token, private E-Mail-Adressen, vollständige Seriennummern oder andere sensible Informationen.

## Fehlerberichte

Ein hilfreicher Fehlerbericht enthält Folgendes:

- Adapterversion
- ioBroker js-controller Version
- Node.js-Version
- Betriebssystem oder Containerumgebung
- Anzahl der erkannten Speichergeräte
- relevante Adapterprotokollmeldungen
- Schritte zur Reproduktion des Problems
- erwartetes und tatsächliches Verhalten

Verwenden Sie die bereitgestellte GitHub-Fehlerberichtvorlage.

## Funktionsanfragen

Beschreiben:

- das Problem, das die Funktion lösen würde
- das erwartete Verhalten
- ob zusätzlicher Cloud- oder Modbus-Zugriff erforderlich wäre
- irgendwelche Sicherheitsimplikationen für die beschreibbare Funktionalität

## Entwicklungsumgebung

Abhängigkeiten installieren und Qualitätsprüfungen durchführen:

```bash
npm ci
npm run check
npm run test:package
npm pack --dry-run
```

Die React-Administrationsschnittstelle hat ihren eigenen Abhängigkeitsbaum unter`src-admin` Die

## Pull-Anfragen

Pull-Anfragen sollten Folgendes beinhalten:

- einen fokussierten Fokus haben
- Das Verhalten der Version 1.0 (schreibgeschützt) sollte beibehalten werden, sofern es nicht explizit geändert wird.
- Tests einbeziehen, wo dies praktikabel ist
- Alle bestehenden Prüfungen bestehen
- Die Dokumentation wird aktualisiert, wenn sich das öffentliche Verhalten ändert.
- Vermeiden Sie nicht zusammenhangslose Formatierungen oder Refactorings.

## Commit-Nachrichten

Verwenden Sie nach Möglichkeit kurze Commit-Nachrichten im herkömmlichen Stil, zum Beispiel:

```text
feat: add device diagnostic state
fix: handle missing PV power
docs: clarify history aggregation
test: cover multiple storage devices
```