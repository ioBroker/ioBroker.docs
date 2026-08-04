---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.siku/README.md
title: ioBroker.siku
hash: CTR15LRZLi2/9Z5eGgOOGNmBlsB8297HeVnxE33zN0g=
---
![Logo](../../../en/adapterref/iobroker.siku/admin/siku.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.siku.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.siku.svg)
![Anzahl der Installationen](https://iobroker.live/badges/siku-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/siku-stable.svg)
![NPM](https://nodei.co/npm/iobroker.siku.png?downloads=true)

# IoBroker.siku
**Tests:** ![Test und Freigabe](https://github.com/ChrMaass/ioBroker.siku/workflows/Test%20and%20Release/badge.svg)

## Übersicht
Dieser Adapter integriert **SIKU RV V2**-Wohnraumlüftungsgeräte und kompatible Geräte der **Oxxify smart**-Serie in ioBroker. Dies schließt ausdrücklich Geräte ein, die unter den Bezeichnungen **Oxxify.smart 30**, **Oxxify.smart 50** und **Oxxify.smart 50 K** vermarktet werden.

Der aktuelle Stand des Repositorys zielt auf eine funktionsvollständige **öffentliche Beta** für den Betrieb im lokalen Netzwerk und die offizielle ioBroker `latest`-Aufnahme ab.

## Merkmale
- UDP-Kommunikation basierend auf dem dokumentierten Herstellerprotokoll
- Unterstützung mehrerer Geräte in **einer** Adapterinstanz
- Sendererkennung im lokalen Netzwerk
- JSON-Konfigurationsbasierte Admin-Seite für mehrere Geräte
- Separate RTC-Zeitprüfung alle 24 Stunden standardmäßig
- Neustart-persistente RTC-Planung basierend auf dem Zeitstempel des letzten Prüfversuchs
- Zeitsynchronisation nur bei Überschreitung des konfigurierten Drift-Schwellenwerts
- Zustandsbasierte Steuerung der wichtigsten Betriebsparameter
- Vollständige wöchentliche Zeitplanabbildung über ioBroker-Zustände mit paketgrößensicheren Lesevorgängen alle 15 Minuten
- Lokalisierte Enumerationsbezeichnungen für Lüftergeschwindigkeit, Lüftermodus und Timer-Modus
- Lesbare lokale Zeitstempel-Begleitstaaten für Umfrage- und Entdeckungszeitstempel
- Gerätespezifische Passwörter werden in ihrem verschachtelten Konfigurationspfad verschlüsselt und vor normalen Konfigurationszugriffen geschützt.
- Eine Adapterinstanz pro ioBroker-Host, um UDP-Portkonflikte zu vermeiden

## Unterstützte Kernfunktionen
- Erkennung von Mastergeräten per Broadcast (`0x007C`, `0x00B9`)
- Verwaltung mehrerer Geräte über stabile Geräte-IDs
- Abfrage von Status-, Sensor- und Diagnosewerten
- Schreiben zentraler Parameter über Zustände, zum Beispiel:
  - Leistung
- Lüftergeschwindigkeit
- manuelle Lüftergeschwindigkeit
- Lüftermodus
- Timer-Modus
- Sollwert für Luftfeuchtigkeit
- Sensor-Aktivierungsflags
- Einmalige Schreib-Reset-Befehle mit anschließendem Rücklesen anstelle unsicherer Wiederholungsversuche
- Wöchentliche Zeitplanstruktur wie zum Beispiel:
- `schedule.monday.p1.speed`
- `schedule.monday.p1.endHour`
- `schedule.monday.p1.endMinute`
- ... bis einschließlich `schedule.sunday.p4.*`
- Diagnosewerte wie zum Beispiel:
- Filter-Countdown
- Öffnungszeiten
- Alarmstufe
- Anzeige für Filterwechsel
- letzte Entdeckung / letzte Umfrage / letzte Überprüfung

## Gerätereferenzen
Der Adapter ist für die SIKU RV V2-Familie wie den **SIKU RV 50 W Pro WiFi V2**, kompatible Geräte der **Oxxify smart**-Serie und verwandte Geräte der gleichen Protokollfamilie konzipiert.

Die aktuelle Kompatibilitätsbeschreibung und die Suchbegriffe umfassen explizit **Oxxify.smart 30**, **Oxxify.smart 50**, **Oxxify.smart 50 K**, **Oxxify smart**, **Oxxify smart 30**, **Oxxify smart 50**, **Oxxify smart 50 K** und kompatible, per App steuerbare, dezentrale Wärmerückgewinnungs-Lüftungsanlagen.

- Hersteller-Produktseite: [SIKU RV 50 W Pro WiFi V2](https://www.siku.at/SIKU-RV-50-W-Pro-WiFi-V2/50523)
- Herstellerübersicht: [SIKU Produkte](https://www.siku.at/en/products/)
- Kompatible Serienübersicht: [Dezentrale Lüftung Oxxify](https://raumluft-shop.de/lueftung/dezentrale-lueftungsanlage-mit-waermerueckgewinnung/oxxify.html)
- Beispiele für kompatible Produkte: [Oxxify.smart 30](https://raumluft-shop.de/oxxify-smart-30.html) und [Oxxify.smart 50](https://raumluft-shop.de/oxxify-smart-50.html)
- Offizielle Beschreibung der mobilen App: [SIKU RV WIFI im App Store](https://apps.apple.com/at/app/siku-rv-wifi/id1444515926)

## Entwicklung
Nützliche Skripte:

| Drehbuch | Zweck |
| -------------------- | ---------------------------------------------- |
| `npm run build` | TypeScript-Quellen kompilieren |
| `npm run lint` | ESLint ausführen |
| `npm run test` | Unit- und Pakettests ausführen |
| `npm run coverage` | TypeScript-Testabdeckung erzwingen und melden |
| `npm run dev-server` | Lokale ioBroker-Entwicklungsumgebung starten |
| `npm run release` | Offizielles Release/Tag über Release-Tools erstellen |
| `npm run release` | Erstelle eine offizielle Version/ein offizielles Tag über die Release-Tools |

Der Adapter wurde mit den offiziellen ioBroker-Tools generiert und in TypeScript entwickelt.

## CI / CD
- Bei normalen Pull Requests wird nach Linting, Typüberprüfung und Unit-Abdeckung ein schlanker Ubuntu-Smoke-Test durchgeführt.
- Dependabot Pull Requests führen vor dem automatischen Zusammenführen die vollständige Matrix der unterstützten Betriebssysteme/Node.js durch.
- `main` führt die für die Aufnahme in das ioBroker-Repository erforderliche, releaserelevante Linux/macOS/Windows-Matrix aus.
- Für zusätzliche Prüfungen steht weiterhin ein separater, geplanter/manueller Windows-Regressionsworkflow zur Verfügung, da der Bootstrap des ioBroker-Controllers dort deutlich langsamer ist.
- Laufzeitänderungen können nach einem erfolgreichen `main`-Lauf automatisch eine Patch-Version erhalten; Aktualisierungen von Dokumentationen, Tests, Workflows und Abhängigkeiten, die nur für die Entwicklung gelten, erzeugen keine leeren Releases.
- Getaggte Releases werden über Trusted Publishing direkt von GitHub Actions auf npm veröffentlicht.
- GitHub-Releases werden automatisch mit generierten Release-Notes durch die Standard-Bereitstellungsaktion von ioBroker erstellt.

## Veröffentlichungsbereitschaft
Eine kurze Checkliste für Releases und Repositories finden Sie in [RELEASING.md](RELEASING.md).

## Beta-Notizen
- Erkennung, Abfrage, Zeitprüfungen und geplante Lesevorgänge wurden bereits anhand mehrerer realer Geräte validiert.
- Die Live-Schreibtests wurden bewusst konservativ gehalten.
- Netzwerk-/Dienstfunktionen wie Wi-Fi-Neukonfiguration, Passwortänderungen oder Werksreset werden absichtlich nicht als normale beschreibbare Zustände angezeigt.

## Erweiterte Messagebox-API
Der Adapter stellt diese `sendTo`-Befehle für Skripte und Integrationen bereit:

- `discover`: Führt die UDP-Broadcast-Suche durch. Ohne explizites Passwort versucht der Adapter das Standardpasswort und alle anderen Passwörter.

Konfigurierte Gerätepasswörter (maximal 16) werden innerhalb eines Empfangsfensters von maximal 10 Sekunden übermittelt. Konfigurationsaktualisierungen werden nur für Anrufe zurückgegeben und angewendet, die von einer ioBroker-Admin-Instanz weitergeleitet werden; andere Anrufer erhalten `discoveryFoundNotSaved`.

- `syncTimeAll`: Führt eine manuelle RTC-Prüfung/Synchronisierung für alle konfigurierten Geräte durch.
- `syncTimeDevice`: Führt eine manuelle RTC-Prüfung/Synchronisierung für ein konfiguriertes Gerät anhand der `deviceId` durch.
- `readDevice`: Liest ausgewählte Rohprotokollparameter von einem explizit angegebenen IPv4/Geräte-ID-Ziel für Diagnosezwecke.

Die Diagnoseantwort `readDevice` serialisiert Paketmetadaten und zurückgegebene Parameterwerte als Hexadezimalzeichenketten. Gerätepasswörter werden niemals zurückgegeben; die Antwort enthält lediglich `passwordLength`.

Das herstellereigene UDP-Protokoll überträgt sein kurzes Gerätepasswort unverschlüsselt, auch während der Erkennung. Betreiben Sie den Adapter nur in einem vertrauenswürdigen, isolierten lokalen Netzwerk. Die oben genannte Admin-Ursprungsprüfung dient der Nachrichtenweiterleitung für die Konfigurationsverarbeitung und stellt keine Sicherheitsbarriere gegen bereits in ioBroker ausgeführten Schadcode dar.

## Changelog

<!-- Release script placeholder for the next version. Keep this heading at the start of a line. -->
### **WORK IN PROGRESS**

### 0.2.3 (2026-07-26)

- Harden RTC scheduling, UDP shutdown/error handling, malformed response isolation, schedule write recovery and
  password/object lifecycle behavior.

### 0.2.2 (2026-07-11)

- Harden repository-checker compatibility for nested password protection, compact-mode CI scripts and release recovery.

### 0.2.1 (2026-07-10)

- Create the localized fan-speed text state object before writing its value.

### 0.2.0 (2026-07-10)

- Correct nested encryption and migration of per-device passwords from earlier beta versions.
- Harden UDP response correlation and write-only reset handling to prevent stale or repeated commands.
- Restrict fan-speed writes to protocol-defined values and expose localized enum labels.
- Persist the 24-hour RTC schedule across restarts and keep clock reads outside normal polling.
- Split weekly schedule reads into protocol-size-safe chunks and refresh them every 15 minutes.
- Extract the object factory and operation scheduler, expand tests and enforce coverage in CI.
- Modernize ioBroker dependencies, release actions and automatic patch-release classification.

### 0.1.8 (2026-06-09)

- Cleaned up unused Admin translations found during the adapter checklist review.
- Documented the advanced messagebox commands for script/integration use.
- Added a code-side upper bound for the RTC time sync drift threshold.

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 Christian Maaß <christian@maass.it>

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