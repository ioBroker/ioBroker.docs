---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rssfeed/README.md
title: ioBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)
hash: Xa4qBhowhEn6TvFjZozTQPpz0VgyJsHuYFwntgBQ4hQ=
---
# ioBroker-Adapter zum Anfordern und Anzeigen von RSS-Feeds verschiedener Standards (Atom, RSS, RDF)

![NPM-Version](https://img.shields.io/npm/v/iobroker.rssfeed.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rssfeed.svg)
![Anzahl der Installationen](https://iobroker.live/badges/rssfeed-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/rssfeed-stable.svg)
![NPM](https://nodei.co/npm/iobroker.rssfeed.png?downloads=true)

![Logo](../../../en/adapterref/iobroker.rssfeed/admin/rssfeed.png)

**Tests:**![Test und Freigabe](https://github.com/oweitman/ioBroker.rssfeed/workflows/Test%20and%20Release/badge.svg)

## Überblick

Dieser Adapter ruft RSS-Feeds verschiedener Standards ab und speichert sie, darunter Atom, RSS und RDF. Die enthaltenen VIS-1- und VIS-2-Widgets können die gespeicherten Feeds anzeigen. Ihre Template-fähigen Widgets unterstützen benutzerdefinierte HTML- und CSS-Ausgabe über EJS.

Wichtig: Aufgrund von Fehlern in automatisch generierten Übersetzungen ist nur die englische Übersetzung gültig.

## Inhaltsverzeichnis

- [Überblick](#overview)
- [Konfiguration](#configuration)
- [Dokumentation](#documentation)
  - [VIS 1-Widgets](#vis-1-widgets)
  - [VIS 2-Widgets](#vis-2-widgets)
  - [EJS-Template-Notation](#ejs-template-notation)
- [Todo](#todo)
- [Änderungsprotokoll](#changelog)
- [Lizenz](#license)

## Konfiguration

Installieren Sie den Adapter aus dem stabilen Repository. Neue Funktionen und Fehlerbehebungen können Sie möglicherweise auch im Beta-Repository testen. Ankündigungen dazu finden Sie im Test- und Support-Thread des Adapters im ioBroker-Forum.

[iobroker Forum RSS-Feed-Support-Thread](https://mdcldn.short.gy/GqaIDT)

Nach der Installation erscheint der Adapter in der ioBroker-Adapterliste. Falls Änderungen an der Webseite, wie z. B. Widgets oder der Konfigurationsdialog, nicht sichtbar sind, laden Sie die Adapterdateien erneut hoch.

```bash
iobroker upload rssfeed
```

Erstellen Sie eine Instanz mit der Plus-Schaltfläche in der Adapterliste.

### Allgemeine Einstellungen

| Einstellung                        | Beschreibung                                                                                                                                                           |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Standardaktualisierungsrate (Min.) | Standardintervall für die Abfrage von Datenfeeds in Minuten. Der Standardwert beträgt 60 Minuten.                                                                      |
| Maximale Artikelanzahl (Standard)  | Standardmäßig festgelegte maximale Anzahl an Artikeln, die für einen Feed gespeichert werden.                                                                          |
| Benutzeragent                      | Optionaler, aber empfohlener HTTP-User-Agent, der beim Anfordern eines Feeds gesendet wird. Aktualisieren Sie ihn, falls ein Anbieter ältere Browserkennungen ablehnt. |

Die Standardeinstellung für den User-Agent ist:

```text
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0.0.0 Safari/537.36
```

### Feed-Einstellungen

| Einstellung           | Beschreibung                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| Name                  | Name für den erstellten Zustand. Der Name muss innerhalb seines Ordners eindeutig sein.                  |
| Kategorie             | Optionaler Unterordner, in dem der Status erstellt wird.                                                 |
| URL                   | Vollständige Feed-Adresse, einschließlich`http://` oder`https://` Die                                    |
| Aktualisierung (Min.) | Optionales, feedspezifisches Aktualisierungsintervall. Ist dieses leer, wird der Standardwert verwendet. |
| Max-Artikel           | Optionales, feedspezifisches Artikellimit. Wenn leer, wird der allgemeine Wert verwendet.                |

Nach dem Speichern der Konfiguration ist jeder Feed als JSON-Zustand im Objektbaum verfügbar. Das Entfernen eines Feeds aus der Konfiguration löscht nicht automatisch seine bestehenden Zustände.

## Dokumentation

Die detaillierte Benutzerdokumentation ist nach VIS-Generierung und Vorlagensprache unterteilt. Jede Widget-Anleitung wurde anhand ihrer aktuellen Quellcode-Definition geprüft und dokumentiert die Einstellungen, Standardwerte, Vorlagendaten und das relevante Laufzeitverhalten.

### VIS 1-Widgets

Der VIS 1-Leitfaden beschreibt alle klassischen Widgets: Einzel-Feeds, kombinierte Feeds, Metadaten- und Artikel-Helfer sowie die Titelleiste. Er enthält für jedes Widget ein separates Kapitel und eine Konfigurationstabelle sowie VIS 1-spezifische Template-Variablen und Verhaltensweisen.

[Öffnen Sie die Dokumentation des VIS 1-Widgets.](docs/vis1-widgets.md)

### VIS 2-Widgets

Der VIS 2-Leitfaden behandelt alle fünf React-basierten Komponenten, ihre vollständigen Eigenschafteneditor-Einstellungen, Standardwerte, Template-Variablen, das Feed-Aggregationsverhalten und bekannte, für den Benutzer sichtbare Einschränkungen.

[Öffnen Sie die Dokumentation des VIS 2-Widgets.](docs/vis2-widgets.md)

### EJS-Template-Notation

Der EJS-Leitfaden erläutert die allgemeine Template-Notation unabhängig von einem bestimmten Widget. Er behandelt maskierte und nicht maskierte Ausgaben, Bedingungen, Schleifen, Fallback-Werte, CSS, Links, Skripte, Timer und Fehlerbehebung. Die widgetspezifischen Variablen und Beispiele befinden sich weiterhin im zugehörigen VIS-Leitfaden.

[Öffnen Sie die EJS-Vorlagendokumentation](docs/ejs-templates.md)

## Todo

- Nicht verwendete Einträge aufräumen in`info.lastRequest` beim Speichern der Administratorkonfiguration.
- Fügen Sie eine Schaltfläche zum Löschen nicht verwendeter Feed-Zustände aus der Objektstruktur hinzu.

## Changelog

[Older changelogs can be found here](CHANGELOG_OLD.md)

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 5.0.1 (2026-09-01)

- update EJS and update preparation mechanism
- integrate the VIS 2 RSS feed widgets into this adapter
- split the VIS 1, VIS 2, and EJS documentation into dedicated user guides
- add automatic overflow handling and scrollbars to widgets
- fix date/publish date usage in templates
- updated and reworked readme

### 4.1.2 (2026-06-10)

- fix package lock

### 4.1.0 (2026-06-10)

- fix repochecker

### 4.0.4-alpha.0 (2026-06-09)

- add user agent to settings and Axios requests

### 4.0.3 (2026-03-26)

- update packages
- fix repochecker

## License

MIT License

Copyright (c) 2021-2026 oweitman <oweitman@gmx.de>

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