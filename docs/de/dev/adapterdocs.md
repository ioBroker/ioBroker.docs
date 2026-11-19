---
title:       "Adapter-Dokumentation"
lastChanged: "19.11.2026"
editLink:    "https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adapterdocs.md"
---
# Adapter-Dokumentation: README, doc/ und common.docs

Ein Adapter trägt seine Dokumentation an drei Stellen, jede für andere Leser:

| Datei                  | Leser                                                            | Sprache               |
|------------------------|------------------------------------------------------------------|-----------------------|
| `README.md`            | alle, die den Adapter auf GitHub, npm oder iobroker.net finden   | nur Englisch          |
| `doc/en/…`, `doc/de/…` | Anwender, die den Adapter installieren und einrichten (optional) | ein Ordner je Sprache |
| `DEVELOPMENT.md`       | alle, die am Adapter selbst bauen oder mitentwickeln (optional)  | Englisch              |

`common.docs` in der `io-package.json` teilt ioBroker mit, wo die Anwenderdokumentation liegt.

## 1. README.md

### Pflicht

- **Nur Englisch.** Keine deutschen Absätze, keine zweisprachigen Abschnitte, kein "Deutsche
  Beschreibung weiter unten". Übersetzungen gehören nach `doc/<sprache>/` (siehe Abschnitt 2). Der
  [Repository-Checker][checker] meldet ein nicht englisches README (`W6016`).
- **Sagen, was der Adapter tut** - gleich in den ersten Zeilen: welches Gerät, welcher Dienst oder
  welches Protokoll angebunden wird und was der Anwender davon hat.
- **Auf Hersteller oder Gerät verlinken**, sofern es eines gibt: Produktseite, API-Dokumentation,
  Webseite des Dienstes. Es muss ohne Raten erkennbar sein, welches Gerät gemeint ist.
- **Ausreichend ausführlich.** Ein Anwender muss den Adapter installieren, einrichten und benutzen
  können, ohne den Code zu lesen: Voraussetzungen, die Einstellungen im Admin-Dialog, die angelegten
  Datenpunkte, bekannte Einschränkungen. Eine feste Wortzahl gibt es nicht - das beurteilt der Review,
  auch mit Unterstützung durch KI. Ein README aus Titel, einem Satz, Changelog und Lizenz reicht nicht.
- **Keine Anleitungen zur (Mit-)Entwicklung.** Bauen, Tests, dev-server, Debugging, Release-Ablauf und
  "how to contribute" gehören in die `DEVELOPMENT.md`. Das README verlinkt sie mit einer Zeile.
- **Keine Installation über npm oder GitHub.** Adapter werden über den Admin installiert. Anleitungen
  wie `npm install iobroker.xyz` oder "von GitHub-URL installieren" meldet der Checker (`E6012`, `E6013`).
- **`## Changelog` und `## License`** als letzte beiden Abschnitte, die Lizenz ganz am Ende
  (`E6003`, `E6004`, `W6021`).
- Nutzt der Adapter Sentry: der Sentry-Hinweis weit oben (`W6023`).

### Gerüst

```markdown
![Logo](admin/myadapter.png)
# ioBroker.myadapter

[![NPM version](https://img.shields.io/npm/v/iobroker.myadapter.svg)](https://www.npmjs.com/package/iobroker.myadapter)
...

## myadapter adapter for ioBroker

Connects ioBroker to the XY-1000 heat pump by [Manufacturer](https://www.manufacturer.example/xy-1000)
over its local Modbus TCP interface. Reads temperatures, power and operating mode and lets you
change the target temperature and the mode.

## Requirements
- XY-1000 with firmware 2.4 or newer, Modbus TCP enabled in the device menu
- The device must be reachable from the ioBroker host on port 502

## Configuration
| Setting  | Description                                   | Default |
|----------|-----------------------------------------------|---------|
| IP       | Address of the heat pump                      | -       |
| Interval | Polling interval in seconds                   | 30      |

## States
| State               | Writable | Description                 |
|---------------------|:--------:|-----------------------------|
| `info.connection`   |    -     | Connected to the device     |
| `control.mode`      |    ✓     | 0 = off, 1 = heat, 2 = cool |

## Known limitations
- Only one device per instance.

## Documentation
- [User guide (English)](doc/en/README.md)
- [Benutzerhandbuch (Deutsch)](doc/de/README.md)

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2026-11-19)
- (author) initial release

## License
MIT License

Copyright (c) 2026 Author Name
...
```

Das Gerüst ist absichtlich englisch - genau so soll das README aussehen.

## 2. Anwenderdokumentation in doc/en und doc/de

Das README ist die Visitenkarte des Adapters. Die eigentliche Anleitung für Anwender liegt in einem
eigenen Ordner, mit einem Unterordner je Sprache:

```
doc/
  en/
    README.md        ← Startseite der Anleitung
    devices.md       ← weitere Seiten, von README.md aus verlinkt
    media/           ← Screenshots für diese Sprache
  de/
    README.md
    devices.md
    media/
```

Was hineingehört: Einrichtung Schritt für Schritt mit Screenshots, jede Einstellung erklärt, der
Objektbaum und die Bedeutung der Datenpunkte, Beispiele (Blockly, JavaScript, vis), FAQ und
Fehlersuche. Weitere Seiten werden von der `README.md` desselben Ordners aus verlinkt; iobroker.net
folgt diesen Links und zeigt die Seiten als Kapitel des Adapters an.

**Warum doc/de wichtig ist.** Ohne deutsche Dokumentation ist die deutsche Seite des Adapters auf
iobroker.net eine Maschinenübersetzung des englischen READMEs. Eine von einem Menschen geschriebene
(oder wenigstens gelesene) deutsche Anleitung ist deutlich besser - und ein großer Teil der
ioBroker-Anwender liest Deutsch.

**README_de.md ist nur ein Workaround.** Eine deutsche Kopie des READMEs im Hauptverzeichnis

- erscheint auf iobroker.net nur, wenn sie in `common.docs` eingetragen ist,
- dupliziert Changelog und Lizenz, die dann vom README abweichen,
- bietet keinen Platz für mehrere Seiten oder Screenshots je Sprache.

Den Inhalt nach `doc/de/README.md` verschieben und Changelog und Lizenz dort entfernen - iobroker.net
übernimmt beides automatisch aus dem englischen README.

*Hinweis*: Manche Adapter verwenden `docs/` statt `doc/`. Beides funktioniert, solange `common.docs`
auf die richtigen Dateien zeigt.

## 3. common.docs in der io-package.json

`common.docs` listet die Anwenderdokumentation je Sprache auf. Die Schlüssel sind Sprachkürzel, die
Werte Pfade **relativ zum Hauptverzeichnis des Repositorys**:

```json
{
  "common": {
    "docs": {
      "en": "doc/en/README.md",
      "de": "doc/de/README.md"
    }
  }
}
```

Mehrere Seiten je Sprache werden als Array angegeben:

```json
"docs": {
  "en": ["doc/en/README.md", "doc/en/devices.md"],
  "de": ["doc/de/README.md", "doc/de/devices.md"]
}
```

Regeln:

- **`en` ist Pflicht**, sobald `docs` existiert (das [Schema der io-package.json][schema] verlangt es).
  Gibt es keine eigene englische Anleitung, ist `"en": "README.md"` in Ordnung.
- Erlaubte Schlüssel: `en`, `de`, `ru`, `pt`, `nl`, `fr`, `it`, `es`, `pl`, `uk`, `zh-cn`.
- Pfade ohne führenden Schrägstrich, keine URLs. Groß- und Kleinschreibung muss exakt zur Datei auf
  GitHub passen.
- Der **erste Eintrag** einer Sprache wird zur Adapterseite auf iobroker.net in dieser Sprache. Von
  dort verlinkte Seiten im selben Ordner werden automatisch mitgenommen; nicht verlinkte Seiten
  trotzdem eintragen.
- Changelog, Lizenz und Badges kommen immer aus der `README.md`. In `doc/` nicht wiederholen.

## Checkliste für den Review

- [ ] `README.md` ist ausschließlich englisch
- [ ] `README.md` sagt, was der Adapter tut, und verlinkt Hersteller / Gerät / Dienst (falls zutreffend)
- [ ] `README.md` ist ausführlich genug, um den Adapter zu installieren, einzurichten und zu benutzen
- [ ] Keine Entwicklungs- oder Mitmach-Anleitungen in `README.md` - die stehen in `DEVELOPMENT.md`
- [ ] Anwenderanleitung in `doc/en/` und `doc/de/` (statt `README_de.md` im Hauptverzeichnis)
- [ ] `common.docs` in `io-package.json` zeigt auf diese Dateien, `en` ist vorhanden

Siehe auch: [Veröffentlichen eines Adapters](/docs/dev/adapterpublish.md),
[io-package.json](/docs/dev/iopackage.md), [Styleguide für Adapter-Dokumentation](/docs/dev/adapterdocstyleguide.md).

[checker]: https://adapter-check.iobroker.in/
[schema]: https://github.com/ioBroker/ioBroker.js-controller/blob/master/schemas/io-package.json
