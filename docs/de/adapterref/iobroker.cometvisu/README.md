---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cometvisu/README.md
title: ioBroker.cometvisu
hash: 7eOMpp+VkyhNtOTEg+HmoXXZwMUKynI/2wLNAA9UADE=
---
![Logo](../../../en/adapterref/iobroker.cometvisu/admin/cometvisu.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.cometvisu.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cometvisu.svg)
![Anzahl der Installationen](https://iobroker.live/badges/cometvisu-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/cometvisu-stable.svg)
![NPM](https://nodei.co/npm/iobroker.cometvisu.png?downloads=true)
![Test und Freigabe](https://github.com/joltcoke/ioBroker.cometvisu/workflows/Test%20and%20Release/badge.svg)

# ioBroker.cometvisu

## Cometvisu-Adapter für ioBroker

Stellt die CometVisu-Visualisierung über den ioBroker-Webadapter bereit.

[CometVisu](https://www.cometvisu.org) ist eine webbasierte Visualisierungsanwendung für die Hausautomation. Sie läuft im Browser, wird über XML konfiguriert und unter [CometVisu/CometVisu](https://github.com/CometVisu/CometVisu) entwickelt. Dieser Adapter stellt eine CometVisu-Version aus einer ioBroker-Installation bereit und verbindet sie mit ioBroker als Backend.

## Anforderungen

Die Visualisierung erfolgt über [iobroker.web](https://github.com/ioBroker/ioBroker.web) (Version 7.0.3 oder neuer), das auch für Login, Session und Socket-Verbindung zuständig ist. Dieser Adapter verfügt über keinen eigenen Webserver.

Für Charts und historische Daten wird beispielsweise ein ioBroker-History-Adapter benötigt. `iobroker.sql` (4.1.1 oder neuer).

## Aufstellen

1. Installieren Sie den Adapter und erstellen Sie eine Instanz.
2. Wählen Sie eine **CometVisu-Version** aus. Die Liste enthält die offiziellen Versionen von GitHub sowie alle Archive, die Sie selbst hochladen; die ausgewählte Version wird beim Speichern entpackt.
3. Wählen Sie die **Webinstanz** aus, die die Anwendung bereitstellen soll.

Die Visualisierung ist dann erreichbar unter `http://<host>:<web port>/cometvisu/` Die

## So funktioniert es

Der Adapter speichert den ausgewählten Build auf der Festplatte und registriert sich selbst als Erweiterung des Webadapters (`common.webExtension`), das es unter `/cometvisu` Jede Version wird in ein eigenes Verzeichnis entpackt, sodass beim Zurückwechseln zu einer zuvor verwendeten Version kein erneutes Entpacken erforderlich ist, und alles, worauf nicht mehr verwiesen wird, wird beim Start entfernt.

CometVisu lernt durch die `X-CometVisu-Backend-*` Die Antwort-Header werden automatisch übermittelt, sodass in der Visualisierung selbst kein Backend konfiguriert werden muss. Die passende Socket-Client-Bibliothek wird vom Server geladen, der die Visualisierung bereitstellt. Daher funktionieren beide Socket-Modi des Webadapters.

## Hochladen Ihres eigenen Builds

Beliebig `CometVisu-*.tar.gz` Dateien können in den Einstellungen hochgeladen werden. Uploads werden anhand ihres Dateinamens getrennt, sodass mehrere Dateien nebeneinander vorhanden sein und gewechselt werden können. Durch erneutes Hochladen desselben Namens wird der vorherige Eintrag überschrieben.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.7 (2026-09-14)

- (joltcoke) a CometVisu build is downloaded and unpacked when it is chosen in the settings, so starting the adapter no longer needs GitHub at all
- (joltcoke) setting the version outside the settings dialog no longer fetches anything: pick it there once and save, which a newly created instance now needs as well
- (joltcoke) an archive uploaded again under the same name is unpacked right away instead of only after a manual restart of the instance
- (joltcoke) the settings dialog shows how far the preparation of a build has come, and marks the selected version once it lies ready on the server
- (joltcoke) releases that were only tried out are removed when the settings dialog is closed instead of lying around until the next start
- (joltcoke) the settings dialog says when the release list is missing because GitHub rate limited the browser, and from when it will work again
- (joltcoke) the texts of the settings dialog are translated into all eleven adapter languages
- (joltcoke) the two version fields in the settings take the width they need instead of most of the panel
- (joltcoke) the settings component requires admin 8.0.11, which is the first version that can load it
- (joltcoke) updated @iobroker/json-config to 10.0.0, @iobroker/gui-components to 10.2.3 and @module-federation/vite to 1.21.3

### 0.0.6 (2026-09-12)

- (joltcoke) the settings dialog no longer makes the admin log a failed i18n request and a missing mf-manifest.json
- (joltcoke) updated @iobroker/testing to 6.2.1, which the adapter checker asks for

### 0.0.5 (2026-09-07)

- (joltcoke) the configuration manager and the editor of CometVisu now work, the adapter answers their API
- (joltcoke) editing requires a login on the web instance unless it is explicitly allowed without one
- (joltcoke) the editor completes addresses from the ioBroker states
- (joltcoke) files can be uploaded through the manager again

### 0.0.4 (2026-09-06)

- (joltcoke) the adapter now requires node.js 22 and is tested on 22 and 24
- (joltcoke) the admin page is available in all eleven languages ioBroker ships
- (joltcoke) updated express to 5, TypeScript to 6 in both packages, axios and tar to their current releases
- (joltcoke) dependabot updates are scheduled by cron, wait seven days and use the ioBroker automerge action

### 0.0.3 (2026-09-05)

- (joltcoke) "ioBroker" is no longer listed in "common.keywords", where the adapter checker rejects it

Older entries are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Florian Schirmer <jolt@tuxbox.org>

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