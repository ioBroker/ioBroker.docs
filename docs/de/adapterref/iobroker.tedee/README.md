---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tedee/README.md
title: ioBroker.tedee
hash: QIl9g1Oofm6MEZ/uxLhspd4PZDpqRB1eWB6V8eyd6K0=
---
![Logo](../../../en/adapterref/iobroker.tedee/admin/tedee.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tedee.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tedee.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tedee-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tedee-stable.svg)
![NPM](https://nodei.co/npm/iobroker.tedee.png?downloads=true)

# IoBroker.tedee
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.tedee/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Tedee-Adapter für ioBroker
Adapter für Tedee-Schlösser

Dieser Adapter verwendet die lokale Bridge-API, um eine Tedee-Sperre zu steuern

Alle Lock-Geräte von Tedee werden unterstützt.

1. Aktivieren Sie Betatests in Ihrem Benutzerprofil
2. Aktivieren Sie die API in den Bridge-Einstellungen
3. Kopieren Sie die IP und das Token in den Instanzeinstellungen

![Logo](../../../en/adapterref/iobroker.tedee/admin/tedee_api.png)

Der Adapter empfängt alle Statusaktualisierungen sofort über Webhooks. Das Intervall in den Einstellungen dient nur als Backup für kontinuierliche Aktualisierungen.

Aktueller Status einer Sperre: tedee.0.id.state

- 0 Unkalibriert
- 1 Kalibrieren
- 2 freigeschaltet
- 3 SemiLocked
- 4 Entsperren
- 5 Verriegelung
- 6 Gesperrt
- 7 gezogen
- 8 Ziehen
- 9 Unbekannt
- 18 Aktualisierung

## Verwendung
Sie können das tedee-Schloss über tedee.0.id.remote steuern

- Sperren zum Sperren/Entsperren
- Ziehen, um zu ziehen
- Entsperren entsperren

Freischaltmodi:

- 0 - (oder kein Parametersatz) - Normal. Aus geschlossener Position: Nur entriegeln oder mit automatischem Ziehen entriegeln, falls aktiviert. Aus geöffneter Position: nichts.
- 2 - Kraft. Erzwingen Sie die Bewegung, bis das Schloss auf Widerstand stößt.
- 3 - Ohne Zug. Aus geschlossener Position: Nur Entriegelung ohne Auto-Pull. Aus geöffneter Position: nichts.
- 4 - Entriegeln oder ziehen. Aus geschlossener Position: Nur entriegeln oder mit automatischem Ziehen entriegeln, falls aktiviert. Aus geöffneter Position: ziehen.

## Haftungsausschluss
Tedee ist eine Marke von tedee. Ich werde in keiner Weise von tedee oder den damit verbundenen Tochtergesellschaften, Logos oder Marken unterstützt oder bin mit ihnen verbunden

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.3.0 (2023-12-16)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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