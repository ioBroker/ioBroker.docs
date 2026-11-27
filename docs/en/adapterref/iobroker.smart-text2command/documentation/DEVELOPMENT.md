---
chapters: {"pages":{"en/adapterref/iobroker.smart-text2command/README.md":{"title":{"en":"ioBroker.smart-text2command"},"content":"en/adapterref/iobroker.smart-text2command/README.md"},"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md":{"title":{"en":"Testanleitung ohne echte Geräte"},"content":"en/adapterref/iobroker.smart-text2command/documentation/TESTANLEITUNG.md"},"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md":{"title":{"en":"Example sentences for smart-text2command (English)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ExampleSentences-en.md"},"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md":{"title":{"en":"Beispielsätze für smart-text2command (Deutsch)"},"content":"en/adapterref/iobroker.smart-text2command/documentation/Beispielsaetze-de.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md":{"title":{"en":"`sendTo`-API für andere ioBroker-Adapter"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md"},"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md":{"title":{"en":"Konfigurierte `sendTo`-Aktion für eigene Intents"},"content":"en/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md"},"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md":{"title":{"en":"Entwicklung und technische Architektur"},"content":"en/adapterref/iobroker.smart-text2command/documentation/DEVELOPMENT.md"},"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md":{"title":{"en":"ioBroker.smart-text2command – Technische Spezifikation"},"content":"en/adapterref/iobroker.smart-text2command/documentation/ioBroker.smart-text2command_SPECIFICATION.md"}}}
---
# Entwicklung und technische Architektur

Diese Seite ergänzt die [Nutzeranleitung](/#/adapters/smart-text2command). Die ausführlichen
Nachrichtenformate stehen in [SENDTO_API.md](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_API.md) und [SENDTO_INTENT_ACTION_SPECIFICATION.md](/#/docs/adapterref/iobroker.smart-text2command/documentation/SENDTO_INTENT_ACTION_SPECIFICATION.md).

## Lokaler Build und Tests

Benötigt werden Node.js 22 oder neuer und ioBroker Admin 8 oder neuer.
Backend und Admin-Oberfläche haben getrennte Abhängigkeiten.

```sh
npm ci
npm ci --prefix src-admin
npm run check
npm run check:admin
npm run build
npm run lint
npm run format:check
npm test
npm run test:integration
```

`npm run build` prüft das Backend und baut die React-Admin-Oberfläche
nach `admin/`. Die TypeScript-Tests liegen unter `test/`. `dev:watch` startet
den ioBroker-Dev-Server ohne Adapterprozess; `watch:react` baut den
Admin-Quellcode bei Änderungen neu.

## Verarbeitung

- `src/main.ts` initialisiert Geräteliste, Modell, `sendTo`-Router und die
  Analyse über `input.text`.
- `src/devices/` findet Geräte, Kanäle und States, ordnet Räume und Funktionen
  zu und prüft aktuelle Freigaben. Geräte-IDs stammen vorrangig vom nächsten
  übergeordneten Gerät, sonst Kanal oder State.
- `src/nlp/` lädt die deutschen und englischen Trainingsressourcen, trainiert
  im Worker und aktiviert ein neues Modell nur nach bestandenen Regressionen.
  Geräte-Aliase benötigen kein neues Modelltraining.
- `src/commands/` löst Gerät und Datenpunkt auf, plant eine Aktion und prüft vor
  dem Zugriff den aktuellen ioBroker-State und dessen Freigabe erneut.
- `src/dialog/` verwaltet zeitlich begrenzte Rückfragen getrennt nach Absender,
  Nutzer und Session-ID.
- `src/api/MessageRouter.ts` verarbeitet `processText` sowie Admin-Befehle.
  Verwaltungsbefehle erfordern einen Admin-Absender und Mitgliedschaft in `system.group.administrator`.
- `src-admin/` enthält die React-19-Oberfläche. Sprachtexte für den Admin liegen
  in `src-admin/src/myi18n/`; Laufzeitantworten in `resources/messages/`,
  Sprachregeln in `resources/language-rules/` und Trainingssätze in `resources/training/`.

## Persistenz und Grenzen

Im Instanzdatenverzeichnis liegen `devices-v1.json`, `training/user-intents-v1.json`,
`audit-v1.json`, `test-lab-history-v1.json` und Modellversionen unter `models/`.
Die Gesprächshistorie behält höchstens 30 Sessions mit jeweils 50 Anfragen.
Ein beschädigtes aktives Modell kann auf die vorherige gültige Version
zurückfallen; beschädigte Freigabe- oder Intent-Daten verhindern die jeweilige Initialisierung.

Freigaben sind an den Fingerprint eines konkreten Datenpunkts gebunden.
Relevante Änderungen an Ziel, Typ, Lese-/Schreibrechten, Bereich oder Mapping
machen eine betroffene Freigabe ungültig. Das Umbenennen eines States allein
ändert den Fingerprint nicht. Die eigentliche Ausführung nutzt
ioBroker-State-Zugriffe oder einen explizit konfigurierten ausgehenden
`sendTo`-Aufruf; es gibt keinen Betriebssystem-`exec`-Pfad.