---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.residents.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.residents.svg
BADGE-Number of Installations: https://iobroker.live/badges/residents-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/residents-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.residents.png?downloads=true
---
# Bewohner (Residents)

Dieser Adapter hilft dabei, den Anwesenheits- und Aktivitätsstatus der einzelnen Mitbewohner abzubilden. Daraus wird ein logischer Gesamtstatus über alle Mitbewohner und deren Anwesenheit bzw. momentane Aktivität zu Hause gebildet. Die Bewohner werden durch eigene virtuelle Geräte vom Typ Mitbewohner, Gast, oder Haustier repräsentiert.

Wir können zwischen kurzfristiger und langfristiger Abwesenheit unterscheiden, mit einer gewissen Vorhersagefähigkeit hinsichtlich der erwarteten Rückkehr. Auf der Grundlage dieser Informationen kann die Heizung bei längerer Abwesenheit entweder leicht oder stärker als üblich reduziert werden. Wenn ein Bewohner auf dem Weg zurück nach Hause ist, weiß das Haus, dass es sich auf die baldige Ankunft seines Menschen vorbereiten sollte.

Zusätzlich zur einfachen An-/Abwesenheitslogik wird die Anwesenheit durch die Tatsache erweitert, dass man zu Hause wach ist oder schläft. Ein ziemlich komplexer Schlafens- und Aufwachprozess wird hier unterstützt, um komfortable Aufwachroutinen für jeden Einzelnen und das Haus selbst zu ermöglichen.

Der Adapter ist außerdem so konzipiert, dass er _in Zukunft_ ein ausgeklügeltes System zum Routing von Benachrichtigung unterstützt. Damit können aus eigenen Skripten heraus Nachrichten an eine bestimmte Person adressiert werden, unabhängig vom Transportmedium. Das tatsächliche Transportmedium kann dynamisch auf der Grundlage des Anwesenheits- und Aktivitätsstatus ermittelt werden. So können z. B. Sprachbenachrichtigungen zu Hause durch Textnachrichten während der Abwesenheit ersetzt werden, indem die Nachricht an einen anderen ioBroker-Adapter umgeleitet wird. Die Nachrichten könnten auch an ein bestimmtes Gerät in dem Raum weitergeleitet werden, in dem sich der Bewohner gerade aufhält, beispielsweise einen Lautsprecher oder ein Display.

## Konfiguration

## Changelog
### 1.0.0 (2024-08-24) - 2024 Maintenance Release

-   (jpawlowski) Set minimum Node version to 18.x
-   (jpawlowski) Set minimum JS-Controller version to 5.0.19
-   (jpawlowski) Update package dependencies
-   (jpawlowski) Some minor internal housekeeping

## License

MIT License

Copyright (c) 2022-2025 Julian Pawlowski <metres_topaz.0v@icloud.com>

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