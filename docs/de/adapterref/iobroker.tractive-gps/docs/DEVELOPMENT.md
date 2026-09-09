---
chapters: {"pages":{"en/adapterref/iobroker.tractive-gps/README.md":{"title":{"en":"ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/README.md"},"en/adapterref/iobroker.tractive-gps/README_DE.md":{"title":{"en":"ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/README_DE.md"},"en/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md":{"title":{"en":"Developer documentation for ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md
title: Entwicklerdokumentation für ioBroker.tractive-gps
hash: bu35S+r/opLGqZ2OleWndOA3n8KI/kTk0TvUCvWq6Gg=
---
# Entwicklerdokumentation für ioBroker.tractive-gps

Dieses Dokument richtet sich an Mitwirkende. Benutzerinstallation, Konfiguration, Zustände und Widget-Nutzung sind in der Haupt- [README](/#/adapters/tractive-gps) und [der deutschen README](/#/docs/adapterref/iobroker.tractive-gps/README_DE.md) dokumentiert.

## Entwicklungsanforderungen

- Node.js 22.13 oder neuer
- npm 10 oder neuer
- Für lokale Integrationstests wird js-controller 7.2.2 oder neuer benötigt.
- Admin 7.8.23 oder neuer
- Für Widget-Tests wird VIS 2 Version 2.12.8 oder neuer benötigt.

Installieren Sie alle Workspace-Abhängigkeiten aus dem Repository-Stammverzeichnis:

```bash
npm install
```

## Repository-Struktur

```text
src/
├── main.ts                         Adapter lifecycle, scheduling, messages, and commands
├── lib/
│   ├── tractive-api.ts             Authentication, requests, validation, and rate limiting
│   ├── helpers/stateHelpers.ts     ioBroker object and state creation
│   └── services/dataAggregation.ts API normalization and synchronization
└── types/types.ts                  Shared backend types

src-admin/                          React-based Admin 8 configuration
src-widgets/                        VIS 2 PetTrackerCard widget
admin/                              Built Admin files and translations
widgets/                            Built VIS 2 files and classic VIS 1 widget sources
build/                              Compiled adapter backend
test/                               Package and integration tests
```

## Adapterlebenszyklus

Beim Start erstellt der Adapter seine Lebenszyklusobjekte, authentifiziert sich bei Tractive, führt eine vollständige Synchronisierung durch, abonniert die Status der Aktualisierungs- und Tracker-Befehle und plant die nächste reguläre Synchronisierung.

Synchronisierungsläufe werden nacheinander ausgeführt. Eine neue Anfrage, die während eines laufenden Synchronisierungslaufs gestellt wird, wird in eine Warteschlange gestellt, anstatt einen überlappenden Lauf zu starten.

Der Synchronisierungsplan ist nach Datentyp unterteilt:

- Trackerlisten und Positionen verwenden das konfigurierte Abfrageintervall.
- Hardware- und Akkuberichte verwenden ein 15-Minuten-Intervall.
- Haustierprofile, Bilder, Tracker-Details und die Suchfunktion werden täglich vollständig synchronisiert.

## Tractive API-Client

`src/lib/tractive-api.ts` Besitzt alle HTTP-Zugriffe. Wichtige Regeln:

- Die Anmeldeinformationen werden ausschließlich im Text der Anmeldeanfrage gesendet.
- Zugriffstoken werden im Speicher abgelegt.
- Ein einzelnes gemeinsames Aktualisierungsversprechen verhindert gleichzeitige Authentifizierungsaktualisierungen.
- Eine fehlgeschlagene Anfrage wird nach HTTP 401 einmal wiederholt.
- Die Anfragen werden serialisiert und mit Leerzeichen versehen, bevor sie versendet werden.
- HTTP 429 bewirkt eine kontoweite Abkühlphase und eine adaptive Anfrageverzögerung.
- `Retry-After` wird als Sekunden oder als HTTP-Datum akzeptiert.
- Protokolle dürfen niemals Anfrage-URLs, Anmeldeinformationen, Token, Nutzdaten, vollständige Antworten oder Koordinaten enthalten.
- Externe Werte werden validiert, bevor sie die API-Grenze überschreiten.

Die Tractive-Schnittstelle ist inoffiziell und kann sich ohne Vorankündigung ändern. Änderungen an Endpunkten erfordern Tests mit bereinigten Testumgebungen.

## Anmeldeinformationen

Die Admin-Anwendung verwendet`AdminConnection` aus`@iobroker/socket-client` Die normale ioBroker-Speichern-Schaltfläche ruft die serverseitige Funktion auf.`encrypt()` Methode, damit Passwörter im AES-Konfigurationsformat von ioBroker geschrieben werden.

`io-package.json` gibt das Passwort in beiden an`encryptedNative` Und`protectedNative` Der Adapter empfängt den entschlüsselten Wert vom js-Controller zur Laufzeit.

Fügen Sie keine separate Schaltfläche zum Speichern der Anmeldeinformationen hinzu und speichern Sie keine Zugriffstoken dauerhaft.

## Objektmodell

Das öffentliche stabile Objektmodell besteht aus:

- `info.*` für Lebenszyklus- und Synchronisierungsinformationen,
- `pets.<pet-id>.info.*` für normalisierte Haustierdaten,
- `trackers.<tracker-id>.*` für normalisierte Tracker-, Positions-, Gesundheits- und Befehlsdaten,
- `api.data.*` Und`info.currentApi` für den bereinigten API-Spiegel.

Die API-Spiegelung muss Anmeldeinformationen, E-Mail-Adressen, Zugriffs- und Aktualisierungstoken, Autorisierungsfelder, Benutzer-IDs und IDs benachbarter Benutzer entfernen. Arrays werden als JSON-Strings gespeichert. Vorhandene Tracker-Objekte bleiben erhalten und werden als fehlend markiert, anstatt gelöscht zu werden.

## Tracker-Befehle

Befehlszustände werden nur für vom Tracker gemeldete Fähigkeiten erstellt. Befehle für denselben Tracker werden serialisiert. Ein Zustand wird erst nach erfolgreicher Tractive-Anfrage bestätigt.

## Admin-Oberfläche

Die Anwendung Admin 8 befindet sich in`src-admin/` und verwendet React, TypeScript, Material UI,`@iobroker/gui-components` , Und`AdminConnection` Die

Die Konfiguration wird ausschließlich über den Standard-Speicherworkflow von ioBroker gespeichert. Übersetzungen müssen für jedes Gebietsschema aktualisiert werden.`src-admin/src/i18n/` und wiederaufgebaut zu`admin/i18n/` Die

## VIS-Widgets

Der Quellcode des Widgets befindet sich in`src-widgets/` Die`PetTrackerCard` nutzt die VIS 2 Komponenten-API und Leaflet/OpenStreetMap.

Die klassische VIS 1-Implementierung wird registriert durch`widgets/tractive-gps.html` , wie von VIS 1 gefordert. Die Quellressourcen befinden sich in`src-widgets/public/vis1/` Vite kopiert sie nach`widgets/tractive-gps/vis1/` parallel zum VIS 2-Build. Es verwendet das VIS 1 EJS und`vis.binds` APIs. Die bereitgestellten Leaflet-Dateien müssen mit den`leaflet` Version in`src-widgets/package.json` Die

Widget-Änderungen müssen Folgendes beibehalten:

- automatische Anpassung der hellen und dunklen Designfarben
- API-Image und benutzerdefiniertes ioBroker-Image-Fallback,
- sicher`_PRJ_NAME` Bildpfadverarbeitung
- Konfigurierbare Interaktions- und Zoomgrenzen für die Karte,
- automatische Anpassung des konfigurierten oder gemeldeten Radius,
- Bereinigung von Leaflet-Instanzen und Ereignis-Listenern.

## Befehle

Führen Sie vor dem Einreichen der Änderungen die folgenden Prüfungen durch:

```bash
npm run check
npm run lint
npm test
npm run build
```

Einzelne Befehle:

```bash
npm run test:ts
npm run test:package
npm run test:integration
npm run build:ts
npm run build:admin
npm run build:widgets
```

## Freigabeprozess

Das Root-Adapterpaket sowie die privaten Admin- und VIS-Arbeitsbereiche verwenden eine feste Lerna-Versionsnummerierung. Die Versionen müssen beibehalten werden.`package.json` ,`src-admin/package.json` ,`src-widgets/package.json` ,`io-package.json` , Und`lerna.json` synchronisiert.

Die Freigaben müssen aus einem sauberen und aktuellen System erstellt werden.`main` Branche. Führen Sie zunächst einen Testlauf mit der entsprechenden semantischen Versionserhöhung durch:

```bash
npm run release -- major --dryRun --noPush --yes
```

Verwenden`major` für grundlegende Änderungen,`minor` für abwärtskompatible Funktionen und`patch` für rückwärtskompatible Korrekturen. Nach Überprüfung der Testausgabe führen Sie denselben Befehl ohne`--dryRun` Und`--noPush` Das Release-Skript aktualisiert das Changelog und die ioBroker-News, erstellt das Projekt, generiert den Release-Commit und das annotierte Tag und überträgt diese. Das Tag löst anschließend den Trusted-Publishing-Workflow aus.

## Lokaler ioBroker-Entwicklungsserver

Das Projekt verwendet`@iobroker/dev-server` für lokale Integrationstests:

```bash
npm run dev-server -- doctor --json
npm run dev-server
```

Verwenden`npm run dev` für den Uhrenmodus`npm run dev-update` um die lokale Adapterinstallation zu aktualisieren, und`npm run dev-upload` neu erstellte Dateien hochladen.

## Dokumentations- und Änderungsprotokollregeln

Die Haupt-README-Dateien dienen der Benutzerdokumentation. Fügen Sie dort keine Build-Anweisungen, Erläuterungen zur internen Architektur, Hinweise zur Abhängigkeitsverwaltung oder Workflows für Mitwirkende hinzu. Solche Informationen gehören in diese Datei.

Die README-Datei muss diese Abschnitte unbedingt enthalten:

- Haftungsausschluss
- Fehlerberichterstattung mit Sentry
- Änderungsprotokoll
- Credits
- Lizenz