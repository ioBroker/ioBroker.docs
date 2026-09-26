---
chapters: {"pages":{"en/adapterref/iobroker.luxtronik2-controller/README.md":{"title":{"en":"ioBroker.luxtronik2-controller"},"content":"en/adapterref/iobroker.luxtronik2-controller/README.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md"},"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.luxtronik2-controller/README.md
title: ioBroker.luxtronik2-Controller
hash: VX5VBGjgw7FuveRKiH2plCoEp8Juix6diYcu2+OlPwg=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.luxtronik2-controller.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.luxtronik2-controller.svg)
![NPM](https://nodei.co/npm/iobroker.luxtronik2-controller.png?downloads=true)
![Test und Freigabe](https://github.com/TbsJah/ioBroker.luxtronik2-controller/workflows/Test%20and%20Release/badge.svg)

<img src="admin/luxtronik2-controller.png" alt="Projekt Logo" width="20%">

# ioBroker.luxtronik2-Controller

## luxtronik2-Controller-Adapter für ioBroker

Dieser ioBroker-Adapter ermöglicht die lokale Steuerung und Überwachung von Wärmepumpen mit [Luxtronik 2.x-Reglern](https://www.alpha-innotec.com/en/products/accessories/control/luxtronik) (z. B. Alpha Innotec, Novelan). Der Adapter ist vollständig in TypeScript geschrieben.

## Danksagungen & Geschichte

Dieses Projekt baut auf den Vorarbeiten bestehender Open-Source-Projekte auf. Besonderer Dank gilt:

[Bouni](https://github.com/bouni/luxtronik-2) , dessen Pionierarbeit und Codeentwicklungen die wesentliche Grundlage für die Kommunikation mit Luxtronik-Steuerungen bilden.

[Coolchip:](https://github.com/coolchip/luxtronik2) Für das grundlegende Reverse Engineering des Luxtronik-Netzwerkprotokolls.

[UncleSamSwiss:](https://github.com/UncleSamSwiss/ioBroker.luxtronik2) Für den originalen ioBroker-Adapter.

Neuerungen dieser Version: Der luxtronik2-Controller integriert nativ die TCP-Kommunikation (Port 8888/8889) und benötigt keine externen Bibliotheken. Zusätzlich wurden Steuerungsmakros, eine Logik zum Schutz des Kompressors und eine automatisierte Datenpunktverwaltung implementiert.

### Merkmale

- **Native TCP-Kommunikation:** Direkte Verbindung zur Wärmepumpe ohne zusätzlichen Aufwand.
- **Kompressorschutz (Zyklusoptimierung):** Intelligente Zusammenführung von Heizungs- und Warmwasserzyklen zur deutlichen Reduzierung der Kompressorstarts.
- **Dynamische HUP-Steuerung:** Automatische Spannungsanpassung der Heizungsumwälzpumpe (HUP) auf Basis der Vor- und Rücklauftemperaturdifferenz für maximale Effizienz.
- **Integrierte Aktionen (Makros):** Vordefinierte Steuerungslogik für Zwangsheizung, Warmwasseranforderungen und die Umwälzpumpe (ZIP) – einschließlich eines automatischen Rückfalls auf sichere Standardwerte.
- **Bedarfsgesteuerte Zirkulation (ZIP):** Steuern Sie Ihre Zirkulationspumpe über vorhandene ioBroker-Bewegungssensoren oder direkt über externe Aktoren (z. B. Shelly) – ganz ohne Hardwareänderungen an der Wärmepumpe.
- **Benutzerdefinierte Datenpunkte:** Messwerte (Index 3004) und Parameter (Index 3003) lassen sich flexibel über die Adapterkonfiguration hinzufügen. Unix-Zeitstempel werden automatisch in lesbare Formate umgewandelt.
- **Erweiterte Statusmeldungen und Berechnungen:** Live-Berechnung der Temperaturverteilung, der thermischen Energie und detaillierte Textausgaben der aktuellen Systemzustände (einschließlich Offsets, Frostschutz und Kühlstatus).
- **Intelligentes Benachrichtigungssystem:** Fehlercodes und kritische Abschaltungen (z. B. Probleme mit der Durchflussrate) werden direkt an Telegram oder das ioBroker-Benachrichtigungssystem gesendet – inklusive Schutz vor Cooldown-Spam.
- **Automatisierte DTA-Datensicherung:** Geplante Downloads von DTA-Diagnoseprotokollen direkt von der Wärmepumpe in Ihren ioBroker-Speicher zur einfachen Analyse (z. B. in OpenDTA).
- **Automatische Objektverwaltung:** Abgewählte oder gelöschte Datenpunkte sowie leere Ordnerstrukturen werden beim Neustart des Adapters automatisch und sauber aus ioBroker entfernt.
- **Breite Kompatibilität:** Vollständige Unterstützung für ältere (V2.x) und neuere (V3.x) Firmware-Generationen (z. B. Alpha Innotec, Novelan) unter Verwendung dynamischer Skalierungsfaktoren.

## ⚠️ Warnung

Einige Einstellungen dieser Integration können die Leistung Ihrer Wärmepumpe beeinträchtigen. Fehlkonfigurationen können dazu führen, dass der Regler in einen Fehlerzustand wechselt, der einen manuellen Reset vor Ort erfordert.

Dieses Projekt dient dem Schutz Ihrer Wärmepumpe, indem die Konfigurationsoptionen auf sichere Werte beschränkt werden. Dennoch kann keine Garantie gegeben werden. Bitte seien Sie vorsichtig, konsultieren Sie Ihr Luxtronik-Handbuch und ändern Sie keine Einstellungen, die Sie nicht vollständig verstehen.

## 🔧 Kompatibilität

Die Integration ermöglicht die Überwachung und Steuerung von Wärmepumpen mit einem Luxtronik2-Regler. Sie funktioniert lokal ohne Internetverbindung. Sie wurde und wird mit einer LWD50A (LD5) von Alpha Innotec getestet.

## ⚠️ Haftungsausschluss ⚠️

_Dieses Projekt steht in keiner Verbindung zu Alpha Innotec, Novelan, ait-deutschland GmbH oder anderen Unternehmen. Es handelt sich um ein privates Projekt, das in der Freizeit gepflegt wird. Die Nutzung erfolgt auf eigene Gefahr._

## Fehler melden & Mitwirken

Fehlerberichte, Kompatibilitätshinweise für bestimmte Firmware-Versionen oder Funktionsanfragen können über den Issue-Tracker im [GitHub-Repository](https://github.com/TbsJah/ioBroker.luxtronik2-controller/issues) eingereicht werden.

## Information

[Info Deutsch](/#/docs/adapterref/iobroker.luxtronik2-controller/documentation/readme_de.md)

[Info Englisch](/#/docs/adapterref/iobroker.luxtronik2-controller/documentation/readme_en.md)

<img src="documentation/Bilder/Haupteinstellung.png" alt="Haupteinstellung" width="100%">
<img src="documentation/Bilder/Objekte.png" alt="Objekte" width="100%">
<img src="documentation/Bilder/Datenpunkte.png" alt="Datenpunkte" width="100%">
<img src="documentation/Bilder/Benachrichtigung.png" alt="Benachrichtigung" width="100%">
<img src="documentation/Bilder/EigeneWerte.png" alt="EigeneWerte" width="100%">
<img src="documentation/Bilder/Fehlermeldung.png" alt="Fehlermeldung" width="100%">
<img src="documentation/Bilder/Bewegungssensoren.png" alt="Bewegungssensoren" width="100%">

## Changelog

// ### **WORK IN PROGRESS**
### 0.11.1 (2026-09-22)

- Resolve issues which are reported by repository checker

### 0.11.0 (2026-09-21)

- **Improvements:**
    - Added global rounding to 2 decimal places for all calculated telemetry values (e.g., converting operating seconds to hours). This provides a cleaner ioBroker state tree and prevents excessively long floating-point numbers from cluttering history databases (like InfluxDB).

### 0.10.4 (2026-09-21)

- Update Readme

### 0.10.3 (2026-09-21)

- **Features & Improvements:**
    - Optimized the automated DTA backup process by directly utilizing the `/NewProc` file stream, eliminating unnecessary artificial delays and stabilizing the heat pump controller.
    - Streamlined the backup configuration: Removed the custom file path input to prevent file system conflicts. Backups are now securely stored in the universally accessible global `0_userdata.0/luxtronik_backups/` directory.
    - Added a clear information box in the adapter configuration, explaining where to find the generated backup files within the ioBroker UI.

- **Fixes:**
    - Fixed the persistent `not an object of type "meta"` crash during DTA backups. The storage architecture was migrated away from isolated adapter namespaces to the robust, native `0_userdata.0` global storage, completely resolving folder creation permission issues on existing instances.
    - Corrected the dynamic file naming logic (`dta_live_...` vs. `dta_history_...`) to accurately reflect whether a live memory dump or a fallback history log was downloaded.

### 0.10.2 (2026-09-21)

- **🚀 Features:**
    - Implemented automated DTA file backup management with customizable cron schedules and automatic meta-directory creation in the ioBroker file system.

- **🛠 Chores / Under the Hood**
    - Enhanced TypeScript type checking, resolved strict ESLint warnings, and upgraded Node.js type definitions to support Node.js version 22.
    - Optimized image scaling and layout rendering in `jsonConfig.json` for cleaner adapter settings presentation.

## License

MIT License

Copyright (c) 2026 TbsJah <github.tbsjah@googlemail.com>

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