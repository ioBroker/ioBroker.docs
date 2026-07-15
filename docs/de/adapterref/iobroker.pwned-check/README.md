---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pwned-check/README.md
title: ioBroker.pwned-check
hash: vgvs+zBTh58scQomT7gXNZRJIJQNXbdjCPyF6VIckY4=
---
![Logo](../../../en/adapterref/iobroker.pwned-check/admin/pwned-check.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.pwned-check.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.pwned-check.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pwned-check-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pwned-check-stable.svg)
![NPM](https://nodei.co/npm/iobroker.pwned-check.png?downloads=true)

# IoBroker.pwned-check
**Tests:** ![Test und Freigabe](https://github.com/ipod86/ioBroker.pwned-check/workflows/Test%20and%20Release/badge.svg)

## IoBroker-Adapter zur Überprüfung von Passwort- und E-Mail-Sicherheitslücken
Dieser Adapter prüft, ob Ihre Passwörter oder E-Mail-Adressen in bekannten Datenlecks aufgetaucht sind – ohne jemals Ihre tatsächlichen Passwörter an irgendeinen Server zu senden.

## Merkmale
**Datenschutz hat oberste Priorität** – Passwörter werden niemals übertragen. Der SHA-1-Hash wird lokal im Browser berechnet; nur die ersten 5 Zeichen werden an die API gesendet (k-Anonymität).
- **Passwortprüfung** – nutzt die kostenlose k-Anonymitäts-API von [Have I Been Pwned](https://haveibeenpwned.com/API/v3#PwnedPasswords) – kein API-Schlüssel erforderlich
- **E-Mail-Prüfung** – nutzt die kostenlose [XposedOrNot](https://xposedornot.com) API – kein API-Schlüssel erforderlich
- **Details zum Datenleck** – einzelne Datenpunkte pro Leckagequelle unter `emails.<id>.leaks.*`
- **ioBroker-Benachrichtigungen** – sendet eine Systembenachrichtigung in der konfigurierten Systemsprache (11 Sprachen werden unterstützt), wenn ein neuer Sicherheitsverstoß erkannt wird.
- **HTML-Visualisierung** – generiert einen sofort einsatzbereiten HTML-Datenpunkt zur Verwendung in VIS oder anderen Dashboards
- **Konfigurierbares Erscheinungsbild** – Design (hell/dunkel), Hintergrundtransparenz, Kartentransparenz, Schriftgröße
- **Konfigurierbares Intervall** – Überprüfung alle 3, 6, 12 oder 24 Stunden
- **Malware-Erkennung** – erkennt pawns-cli (iProyal-Proxy-Software) durch Prozess- und Dateiprüfung (**nur Linux** – wird unter Windows und macOS automatisch übersprungen)

## Plattformunterstützung
Die Überprüfung auf Passwort- und E-Mail-Sicherheitslücken funktioniert auf **allen Plattformen** (Linux, Windows, macOS).

Die Malware-Erkennung (pawns-cli-Prüfung) ist ausschließlich unter Linux verfügbar – das Malware-Erkennungstool (pawns-cli) ist eine Linux-Binärdatei und nicht für Windows oder macOS erhältlich. Die Prüfung wird auf Nicht-Linux-Systemen automatisch übersprungen; es ist keine Konfiguration erforderlich.

## Installation
Installation über die ioBroker-Admin-Oberfläche – Suche nach **pwned-check**.

## Konfiguration
### Registerkarte Passwörter
Fügen Sie für jedes zu überwachende Passwort einen Eintrag hinzu. Geben Sie eine **Beschreibung** (z. B. den Dienstnamen) und das **Passwort** ein. Der SHA-1-Hash wird in Ihrem Browser berechnet und gespeichert – das Passwort im Klartext wird niemals gespeichert.

| Feld | Beschreibung |
|-------|-------------|
| Beschreibung | Eine Bezeichnung für dieses Passwort (z. B. "GitHub") |
| Passwort | Einmal eingeben; nur der SHA-1-Hash wird gespeichert |

### Registerkarte „E-Mails“
Fügen Sie pro zu überwachender E-Mail-Adresse einen Eintrag hinzu.

| Feld | Beschreibung |
|-------|-------------|
| E-Mail | Die zu überprüfende E-Mail-Adresse |

### Registerkarte „Einstellungen“
| Einstellungen | Beschreibung | Standardwerte |
|---------|-------------|---------|
| Intervall | Wie oft soll auf neue Verstöße geprüft werden? | 24 Stunden |
| Thema | Helle oder dunkle Visualisierung | Licht |
| Hintergrundtransparenz | Deckkraft des äußeren Containers (0 = vollständig transparent) | 100 % |
| Kartentransparenz | Deckkraft der einzelnen Eintrittskarten | 100 % |
| Schriftgröße | Textgröße in der Visualisierung | 14 px |

## Datenpunkte
Der Adapter erzeugt Datenpunkte unter `pwned-check.<instance>`.

### Passwörter
| Datenpunkt | Typ | Beschreibung |
|-----------|------|-------------|
| `passwords.<id>.isPwned` | boolescher Wert | `true` falls bei einem Verstoß festgestellt |
| `passwords.<id>.lastCheck` | Zeichenkette | ISO-Zeitstempel der letzten erfolgreichen Prüfung |
| `passwords.<id>.lastCheck` | Zeichenkette | ISO-Zeitstempel der letzten erfolgreichen Überprüfung |

### E-Mails
| Datenpunkt | Typ | Beschreibung |
|-----------|------|-------------|
| `emails.<id>.isPwned` | boolescher Wert | `true` falls bei einem Verstoß festgestellt |
| `emails.<id>.leaks.<service>` | boolescher Wert | `true` für jede gefundene Sicherheitslücke |
| `emails.<id>.leaks.<service>` | boolescher Wert | `true` für jede gefundene Sicherheitslücke |

### Andere
| Datenpunkt | Typ | Beschreibung |
|-----------|------|-------------|
| `visualisation` | Zeichenkette | HTML-Codeausschnitt zur Verwendung in VIS oder ioBroker.vis-2 |
| `info.connection` | boolean | `true` solange eine Prüfung läuft |

## Datenschutz
Passwörter werden **niemals** im Klartext gespeichert – nur ihr SHA-1-Hash.
- Passwort-Hashes werden mithilfe der HIBP-k-Anonymitätsmethode überprüft: Es werden nur die ersten 5 Hexadezimalzeichen des Hashs übertragen; der vollständige Hash verlässt niemals Ihr System.
- E-Mail-Adressen werden über HTTPS an die XposedOrNot-API gesendet.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.9 (2026-07-01)
* (ipod86) fix: update adapter-core to 3.4.1, clarify malware scanner description in README (W0034)
* (ipod86) fix: update admin dependency to >= 7.8.23 and fix dependabot cooldown format (W8917)

### 0.0.8 (2026-06-09)
* (ipod86) fix: robust language detection for widget (toLowerCase + language fallback)
* (ipod86) fix: translate all widget strings to system language (SAFE/PWNED/section headers/last check)

### 0.0.7 (2026-06-08)
* (ipod86) fix: translate all object names and widget texts to English/system language
* (ipod86) fix: malware notification now only sent on new detection, not on every check
* (ipod86) fix: malware check skipped on non-Linux platforms (Windows/macOS)
* (ipod86) fix: i18n description key corrected in 9 language files

### 0.0.6 (2026-06-06)
* (ipod86) fix: add missing intermediate folder/channel objects for emails, passwords, system, leaks (E3009)
* (ipod86) fix: update @alcalzone/release-script to >=5.2.1 (E0036)

### 0.0.5 (2026-05-31)
* (ipod86) fix: use this.setInterval/clearInterval/setTimeout/delay instead of plain JS timers (W5004, W5005, W5051)
* (ipod86) fix: add missing i18n key "label" to all languages (W5604)
* (ipod86) fix: engines.node >= 22, @tsconfig/node22, @types/node ^22, deploy node 24 (E0028, E3022)
* (ipod86) fix: add dependabot ignore block for @types/node major versions (E8917)
* (ipod86) fix: remove Node 20 from test matrix (W3024)
* (ipod86) fix: upgrade typescript to 6.0.3, release-script to 5.2.0, @iobroker/eslint-config to 2.3.4

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 ipod86

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