---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.nextcloud-monitoring/README.md
title: ioBroker.nextcloud-Überwachung
hash: momSlqN6CXpmBHPru4FOT30LKaT66YrCXQSfXks16wM=
---
![Logo](../../../en/adapterref/iobroker.nextcloud-monitoring/admin/nextcloud_monitoring.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.nextcloud-monitoring.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/nextcloud-monitoring-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.nextcloud-monitoring.svg)
![Anzahl der Installationen](https://iobroker.live/badges/nextcloud-monitoring-installed.svg)
![NPM](https://nodei.co/npm/iobroker.nextcloud-monitoring.png?downloads=true)

# IoBroker.nextcloud-Überwachung
**Tests:** ![Test und Freigabe](https://github.com/H5N1v2/iobroker.nextcloud-monitoring/workflows/Test%20and%20Release/badge.svg)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Anweisungen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Verwendung der Sentry-Berichterstattung beginnt mit js-controller 3.0.

Ich nutze meinen eigenen Sentry-Server, der auf Glitchtip basiert.

# Nextcloud-Monitoring-Adapter für ioBroker
---

## ⚠️ Wichtiger Hinweis: Änderung der Namenskonvention (v1.1.2+)
> **ACHTUNG:** Aufgrund der offiziellen Namensrichtlinien von ioBroker wurde dieser Adapter von `nextcloud_monitoring` (Unterstrich) in **`nextcloud-monitoring`** (Bindestrich) umbenannt.

**Was bedeutet das für Sie?**

* **Keine automatischen Updates:** Wenn Sie Version 1.1.1 oder älter verwenden, erhalten Sie keine Updates mehr über den alten Paketnamen.
* **Neuinstallation erforderlich:** Bitte deinstallieren Sie die alte Version (`nextcloud_monitoring`) und installieren Sie die neue Version (`nextcloud-monitoring`) über das ioBroker-Repository oder GitHub.
* **Einstellungen:** Sie müssen Ihre Instanzkonfiguration in der neuen Version einmalig erneut eingeben.

Wir entschuldigen uns für die Unannehmlichkeiten, aber diese Änderung war notwendig, um den offiziellen ioBroker-Repository-Standards zu entsprechen.

---

## Beschreibung
### Erstens: Wenn Sie ein Widget speziell für diesen Adapter suchen, erstellen Sie es mit [VIS2-Widget-Nextcloud-Überwachung](https://github.com/H5N1v2/VIS2-widget-nextcloud-monitoring)
Dieser Adapter ermöglicht die detaillierte Überwachung Ihrer Nextcloud-Instanz über die offizielle OCS-API (`serverinfo`). Er liefert zahlreiche Systemdaten, Benutzerstatistiken, Shares sowie Leistungskennzahlen von PHP (OPcache/FPM) und der Datenbank direkt in ioBroker.

## Merkmale
* **Systemstatus:** CPU-Auslastung, RAM-Nutzung, freier Festplattenspeicher und Nextcloud-Version.
* **Benutzerstatistik:** Anzahl der aktiven Benutzer (5 Min., 1 Std., 24 Std.), Gesamtzahl der Dateien und Speichernutzung.
* **Freigaben:** Überwachung von Linkfreigaben, Gesprächsräumen und föderierten Freigaben.
* **Serverzustand:** PHP-Version, Speicherlimit, OPcache-Trefferrate und detaillierte FPM-Prozessstatistiken.
* **Widget:** Ein spezielles Widget speziell für die Nextcloud-Überwachung ist [HIER](https://github.com/H5N1v2/VIS2-widget-nextcloud-monitoring) verfügbar.

---

## Installation und Konfiguration
### 1. Verbindungseinstellungen
* **Domain:** Geben Sie Ihre Nextcloud-Domain ohne `https://` ein (z. B. `cloud.yourdomain.com`).
* **Token:** Das OCS-API-Token Ihrer Nextcloud (siehe Abschnitt „Anleitung: Token“).
* **Aktualisierungsintervall:** Zeit in Minuten zwischen API-Anfragen (Standard: 10 Min., Minimum: 5 Min.).
* **Mehrere Server:** Sie können jetzt mehrere Server hinzufügen, z. B. my_server_1 und weitere Server, z. B. other_server_2.

### 2. Datenoptionen
* **Apps überspringen:** Deaktiviert die detaillierte Liste der installierten Apps, um die API-Last zu reduzieren.
* **Updateprüfung überspringen:** Deaktiviert die Suche nach neuen Nextcloud-Versionen.

---

# Anleitung: Token erstellen und festlegen
Für den Zugriff auf die `serverinfo`-API ist ein gültiges API-Token erforderlich. Dieses Token muss direkt in der Nextcloud-Konfiguration gespeichert werden.

### Token generieren (Linux / Windows)
Um Zugriff zu ermöglichen, müssen Sie ein Token (eine zufällige Zeichenfolge) generieren und es in Ihrer Nextcloud-Instanz mit dem Tool `occ` registrieren.

**Befehl zum Generieren des Tokens:**

* **Linux (Terminal):**

`openssl rand -hex 32`

* **Windows (PowerShell):**

`$bytes = New-Object Byte[] 32; (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [System.BitConverter]::ToString($bytes).Replace("-", "").ToLower()`

Alternativ können Sie Online-Tools wie beispielsweise verwenden

[it-tools.tech/token-generator](https://it-tools.tech/token-generator).*

# Token in Nextcloud festlegen
**Beispiel für Linux (Standardpfad) im Terminal:**

```bash
sudo -u www-data php /path_to/your/nextcloud_folder/occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
```

**Beispiel für Linux (direkt im Nextcloud-Ordner) im Terminal:**

```bash
sudo -u www-data php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
```

**Wenn Sie Nextcloud in einem Webspace oder bei einem anderen Anbieter nutzen, benötigen Sie in der Regel kein sudo. Führen Sie einfach Folgendes aus:**

```bash
#Directly in your Nextcloudfolder
hp occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN

 Or with path
hp /path_to/your/nextcloud_folder/occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
``

Befehl für Windows (PowerShell/CMD): Navigieren Sie zu Ihrem Nextcloud-Verzeichnis und führen Sie folgenden Befehl aus:

`php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN`

Überwachte Datenpunkte (Auszug)

| Pfad | Beschreibung | Datentyp |
| :--- | :--- | :--- |
| `system.version` | Installierte Nextcloud-Version | Zeichenkette |
| `system.freespace` | Freier Speicherplatz | Zeichenkette |
| `storage.num_users` | Gesamtzahl der Benutzer | Anzahl |
| `server.php.opcache_hit_rate` | Effizienz des PHP-Cache | Zeichenkette |
| `fpm.active_processes` | Aktive PHP-FPM-Prozesse | Anzahl |
| `activeUsers.last5min` | Benutzer, die in den letzten 5 Minuten aktiv waren | Anzahl |
| `activeUsers.last5min` | Benutzer, die in den letzten 5 Minuten aktiv waren | Anzahl |

# Fehlerbehebung (FAQ)
### Ungültige Domäne: Geben Sie die Domäne ohne Protokoll ein.
Korrekt: mycloud.com oder mycloud.com/folder

Falsch: https://mycloud.com oder http://mycloud.com/folder

### Die API liefert keine Daten:
Stellen Sie sicher, dass die App „Server Info“ (Standard-App) in Ihrer Nextcloud unter „Apps“ aktiviert ist. Ohne diese App kann der Adapter keine Daten abrufen.

### Token-Fehler:
Überprüfen Sie mit folgendem Befehl, ob das Token in Nextcloud korrekt gespeichert wurde:

* Unter Linux:

`sudo -u www-data php /path_to/your/nextcloud_folder/occ config:app:get serverinfo token`

Oder falls Sie sich direkt im Ordner befinden, verwenden Sie:

`sudo -u www-data php occ config:app:get serverinfo token`

* Wenn Sie Ihre Nextcloud in einem Webspace oder bei einem anderen Anbieter nutzen, benötigen Sie in der Regel kein sudo:

`php occ config:app:get serverinfo token` oder `php /path_to/your/nextcloud_folder/occ config:app:get serverinfo token`

### Wartungsmodus:
Befindet sich Ihre Nextcloud im Wartungsmodus, kann der Adapter keine Daten abrufen und protokolliert eine entsprechende Meldung. Dies ist normales Verhalten, da die API während der Wartung deaktiviert ist.

## Support & Feedback
Falls Sie **Fehler** entdecken, **Funktionswünsche** haben oder **Verbesserungsvorschläge** machen möchten, erstellen Sie bitte ein **Issue** auf GitHub. Dies hilft, den Fortschritt zu verfolgen und anderen Nutzern mit ähnlichen Problemen zu helfen.

[👉 Hier ein neues Problem melden](https://github.com/H5N1v2/iobroker.nextcloud-monitoring/issues)

---

## Changelog
### 2.0.6 (2026-03-30)
* (H5N1v2) Update axios dependency to version 1.14.0

### 2.0.5 (2026-03-26)
* (H5N1v2) add sentry plugin to automatically report errors to developer

### 2.0.4 (2026-03-25)
* (H5N1v2) update @types/node dependency to version 22.19.15
* (mcm1957) fix: update opcache hit rate state type from string to number

### 2.0.3 (2026-03-18)
* (mcm1957) fix: reevaluate state roles
* (mcm1957) fix: creation of intermediate objects missing

### 2.0.2 (2026-03-05)
* (H5N1v2) fix: language used for stateIds and names
* (H5N1v2) fix: creation of intermediate objects missing
* (H5N1v2) chore: update dependencies to latest versions
* (H5N1v2) added axios in dependencies

### 2.0.1 (2026-02-05)
* (H5N1v2) fix: Optimize state creation by caching existing states
* (H5N1v2) fix: Set Connection header to 'close' in API request

### 2.0.0 (2026-01-16)
* (H5N1v2) Added Multi-Server Support: You can now manage and monitor multiple Nextcloud instances within a single adapter instance using a dynamic table configuration.
* (H5N1v2) Refactored State Structure: Reorganized the object tree to provide a cleaner and more logical hierarchy for all monitored data.
* (H5N1v2) Expanded Data Points: Added several new monitoring points including detailed PHP Opcache, APCu stats, and FPM process information.
* (H5N1v2) Enhanced Localization: Updated and added comprehensive translations for 11 languages (DE, EN, IT, FR, ES, NL, RU, UK, ZH-CN, PL, PT).
* (H5N1v2) Improved Admin UI: Integrated a dynamic table-based management system with helpful tooltips and descriptions for better user experience.

### 1.1.3 (2026-01-14)
* (H5N1v2) repair tsconfig and cleanup release config

### 1.1.2 (2026-01-14)
* (H5N1v2) Change name from nextcloud_monitoring to nextcloud-monitoring
* (H5N1v2) Improved handling of Nextcloud maintenance mode (logged as info instead of error)

### 1.1.1 (2026-01-13)
* (H5N1v2) fixed: repository URLs and naming conventions
* (H5N1v2) added: encrypted and protected native support for tokens

### 1.1.0

* (H5N1v2) Initial release.
* (H5N1v2) Multi-language support for object names (DE/EN/IT/ES/RU etc.).
* (H5N1v2) Support for OCS API Token.
* (H5N1v2) Integrated dynamic update interval.

---

## License
MIT License

Copyright (c) 2026 H5N1v2 <h5n1@iknox.de>

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