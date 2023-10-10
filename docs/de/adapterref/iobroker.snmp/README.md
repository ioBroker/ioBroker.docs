---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.snmp/README.md
title: ioBroker.snmp
hash: 5fWBjXvIrO/ZnPzJQv6aytMx8BLt5umK8be2edSHF7M=
---
![Logo](../../../en/adapterref/iobroker.snmp/admin/snmp.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.snmp)
![Downloads](https://img.shields.io/npm/dm/iobroker.snmp.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.snmp)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.snmp)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.snmp/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.snmp)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.snmp)
![NPM-Version](http://img.shields.io/npm/v/iobroker.snmp.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/snmp-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/snmp-installed.svg)

# IoBroker.snmp
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.snmp/actions/workflows/codeql.yml)

## Wachposten
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

## Die Info
Mit diesem Adapter können Informationen von Geräten wie Druckern, Netzwerkgeräten usw. mithilfe des SNMP-Protokolls abgefragt werden.

## Adapter-Konfiguration
Der Adapter fragt angegebene Oids ab, die in Oid-Gruppen gruppiert sind, die wiederum Geräten zugewiesen sind. Die Konfigurationsdaten werden auf mehreren Registerkarten eingegeben. Der Adapter unterstützt IPv4- und IPv6-Verbindungen.

Einzelheiten finden Sie in der unten aufgeführten Dokumentation.

## Dokumentation
[Englische Dokumentation](docs/en/snmp.md)<br> [deutsche Dokumentation](docs/de/snmp.md)<br> [Russische Dokumentation](docs/ru/snmp.md)

## __IN ARBEIT__
-->

### 2.4.11 (13.07.2023)
* (McM1957) Node-net-snmp wurde aktualisiert, um die uint32-Verarbeitung zu verbessern (#282)
* (McM1957) Mehrere andere Abhängigkeiten wurden aktualisiert

### 2.4.10 (08.07.2023)
* (McM1957) Ein weiterer Tippfehler bei der Fehlerausgabe wurde behoben

### 2.4.9 (05.07.2023)
* (McM1957) Eine Option zum Deaktivieren des Schließens der Lesesitzung im Fehlerfall wurde hinzugefügt.
* (McM1957) Die Protokollierung im Fehlerfall wurde verbessert, wenn das Debug-Protokoll aktiviert ist.

### 2.4.8 (04.07.2023)
* (McM1957) behoben: UDP-Ports gingen während der Fehlerbehandlung verloren (#282)
* (McM1957) behoben: Falsche toString()-Syntax verursachte mehrere Probleme, z. B. fehlende Fehlerausgabe (#283)
* (McM1957) Abhängigkeiten wurden aktualisiert

### 2.4.7 (12.04.2023)
* (McM1957) geändert: Mehrere externe Module, einschließlich Net-SNMP, wurden aktualisiert

### 2.4.6 (26.03.2023)
* (McM1957) Behoben: Die SNMP-Einstellung funktionierte nicht für den numerischen Wert 0 (#240)

### 2.4.5 (20.03.2023)
* (McM1957) Behoben: SNMPv3-Absturz bei Verwendung der SHA-Authentifizierung (#236)

### 2.4.4 (03.03.2023)
* (McM1957) Behoben: Absturz vom Wachposten gemeldet (#235)

### 2.4.3 (01.03.2023)
* (McM1957) Übersetzungen und Abhängigkeiten wurden aktualisiert.

### 2.4.2 (25.02.2023)
* (McM1957) Ein von Sentry gemeldetes Problem wurde behoben. (#230)

### 2.4.1 (22.02.2023)
* (McM1957) Ein Fehler auf den Konfigurationsseiten wurde behoben. (#228)

### 2.4.0 (21.02.2023)
* (McM1957) Unterstützung zum Schreiben von Daten in Oids wurde implementiert. (#150)
* (McM1957) Große Teile des Codes wurden neu geschrieben, sodass das OID-Schreiben unterstützt wird.
* (McM1957) Zustände, die Typinformationen enthalten, können jetzt deaktiviert werden. (#218)
* (McM1957) Zustände, die den Online- und Fehlerstatus von Geräten anzeigen, wurden hinzugefügt. Der Status „online“ wurde in den Ordner „Info“ verschoben.
* (McM1957) Der Gerätestatus wird jetzt in der Objektansicht anhand von Farben und Symbolen angezeigt.
* (McM1957) Der Datentyp „automatisch“ wurde zur Datentypauswahl für OID-Zustände hinzugefügt.
* (McM1957) Ein von Sentry gemeldetes Problem wurde behoben. (#224)
* (McM1957) Eine falsche Einstellung der Bestätigungsflags wurde korrigiert. (#225)
* (McM1957) Unterstützung für die Nachrichtenauthentifizierung sha224, sha256, sha384 und sha512 wurde hinzugefügt (#210)

### 2.3.0 (13.12.2022)
* (McM1957) Unterstützung für die Verwendung nativer Datentypen für Zustände hinzugefügt. (#143)
* (McM1957) Unterstützung zum Speichern binärer OID-Daten als JSON wurde hinzugefügt. (#188)
* (McM1957) Falsche Einstellung des Schreibmodus wurde behoben. (#191)
* (McM1957) Tabellen in der deutschen Dokumentation wurden korrigiert. (#192)
* (McM1957) Das Benennen eines OID mit dem reservierten Namen „online“ wurde blockiert. (#203)
* (McM1957) Einige Änderungen im Zusammenhang mit der Codequalität wurden implementiert. (#201, #190)

### 2.2.1 (18.10.2022)
* (McM1957) Ein Fehler in io-package.json wurde behoben.
* (McM1957) Ukrainische Übersetzungen wurden hinzugefügt.

### 2.2.0 (18.10.2022)
* (McM1957) Das Kompatibilitätsflag ist jetzt veraltet und wird in zukünftigen Versionen entfernt. Bitte passen Sie die Konfiguration bei Bedarf an.
* (McM1957) SNMP V3-Unterstützung wurde hinzugefügt (#71)
* (McM1957) Unterstützung für IPv6 wurde hinzugefügt (#138)
* (McM1957) Der Code wurde wie von eslint vorgeschlagen bereinigt
* (McM1957) Basismodule wurden auf aktuelle Versionen aktualisiert
* (McM1957) Dokumentation wurde aktualisiert (en, de, ru)

### 2.1.10 (22.09.2022)
* (McM1957) Die Validierung von OID und Gerätenamen wurde verbessert, Absturz wurde vom Wachposten gemeldet (#169)

### 2.1.9 (13.09.2022)
* (McM1957) Unterstützung für (IPv4)-Domänennamen wurde erneut hinzugefügt (#165)
* (McM1957) Geräte ohne aktives OID verursachen keinen schwerwiegenden Fehler mehr, sondern protokollieren nur noch eine Warnung (#155)
* (McM1957) Timerwerte werden jetzt strenger validiert (#156, #164)
* (McM1957) Einige von Sentry gemeldete Abstürze wurden behoben (#167)
* (McM1957) Externe Pakete wurden von Dependabot aktualisiert

### 2.1.8 (08.09.2022)
* (McM1957) HOTFIX: Der Parameter „Community“ wurde beim Update auf Version v2.x.x von früheren Versionen nicht migriert. (#163)

### 2.1.7 (27.08.2022)
* (McM1957) Die Dokumentation in README.md wurde aktualisiert (#133)

### 2.1.6 (19.08.2022)
* (McM1957) Einige von Sentry gemeldete Probleme wurden behoben (#151, #152)

### 2.1.5 (11.08.2022)
* (McM1957) Die Funktionalität der Option „optional“ wurde wiederhergestellt. (#147)

### 2.1.4 (08.08.2022)
* (McM1957) HOTFIX – Ein Systemabsturz bei SNMP v1-Fehlern wurde behoben (#145)

### 2.1.3 (07.08.2022)
* (McM1957) Eine neue Option zur Steuerung der Anzahl von OIDs innerhalb einer einzelnen Anfrage wurde hinzugefügt, um TOOBIG-Fehler zu vermeiden (#72)

### 2.1.2 (02.08.2022)
* (McM1957) Konvertierung von Gleitkommawerten wurde korrigiert (#16)

### 2.1.1 (01.08.2022)
* (McM1957) Einige externe Pakete wurden aktualisiert

### 2.1.0 (30.07.2022)
* (McM1957) net-snmp wurde auf Version 3.8.2 aktualisiert
* (McM1957) Unterstützung für SNMP v2c wurde hinzugefügt (#116)
* (McM1957) Der Qualitätsmarker von Zustandsobjekten wird im Falle eines Fehlers oder einer Zeitüberschreitung verwendet
* (McM1957) Der OID-Marker „Optional“ wurde implementiert. Dieser Marker unterdrückt Fehler für OIDs, die nicht immer verfügbar sind. (#116)
* (McM1957) Unterstützung für Counter64-OIDs wurde hinzugefügt. (#57)
* (McM1957) Die von der SNMP-Kommunikation zurückgegebenen Daten werden jetzt mit mehr Details protokolliert.
* (McM1957) Der Kompaktmodus wurde aktiviert. (#20)
* (McM1957) Bekannte Einschränkung: Derzeit werden nur SNMP V1 und SNMP V2c unterstützt.
* (McM1957) Bekannte Einschränkung: Das beschreibbare OID-Attribut ist noch nicht implementiert.

### 2.0.1 (22.07.2022)
* (McM1957) Fehlerhafte Handhabung des Kompatibilitätsmodus-Flags wurde korrigiert (#135)
* (McM1957) Protokollierung von Fehlern für ungültige OIDs korrigiert (#134)

### 2.0.0 (21.07.2022)
* WICHTIG: Diese Version wird die Konfigurationsstrukturen ändern!

Bitte sichern Sie Ihre Konfiguration, bevor Sie mit der Installation beginnen.
Die Installation wird versuchen, die alte Konfiguration zu konvertieren – es kann jedoch nicht garantiert werden, dass dies in allen Fällen gelingt.

* (McM1957) Viele Teile des Codes wurden neu geschrieben
* (McM1957) Der Adapter verwendet jetzt die Admin5-Schnittstelle
* (McM1957) Timer-Werte können jetzt pro Gerät unterschiedlich eingestellt werden (#105)
* (McM1957) Durch Ändern der Reihenfolge der Konfigurationseinträge werden keine Daten mehr zerstört (#15)
* (McM1957) Statusobjekte für Geräte können jetzt benannt werden. Das alte Verhalten ist optional verfügbar.
* (McM1957) Bekannte Einschränkung: Derzeit wird nur SNMP V1 unterstützt.
* (McM1957) Bekannte Einschränkung: OID-Attribute optional und beschreibbar sind noch nicht implementiert.

### 1.0.0 (21.03.2022)
* WICHTIG: Diese Version wird die Objektstrukturen ändern!
* (McM1957) Latenz für die Aktualisierung von info.connection wurde reduziert
* (McM1957) Übermäßige Fehlerprotokollierung, wenn das Ziel nicht erreichbar ist, wurde optimiert
* (McM1957) Es wurde ein zusätzliches Online-Objekt auf der IP-Basis hinzugefügt, um anzuzeigen, dass das Ziel erreichbar ist
* (McM1957) Wenn OIDs unterschiedliche Communities für ein Gerät angeben, wird eine Warnung ausgegeben
* (Apollon77) Wache zur Absturzmeldung wurde hinzugefügt

### 0.5.0
* (Marcolotti) Dokumentation hinzufügen (de,en,ru)
* (Marcolotti) Sprachen hinzufügen (de,en,ru)

### 0.0.3
* (Apollon77) Objekttyp korrigieren

### 0.0.2
* (Bluefox) Korrekturen

### 0.0.1
* (Bluefox) Refactoring
* (Marcolotti) Erstveröffentlichung

## Changelog

<!--

## License
The MIT License (MIT)

Copyright (c) 2017-2023 Marcolotti <info@ct-j.de>, McM1957 <mcm57@gmx.at>, ioBroker Community Developers 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.