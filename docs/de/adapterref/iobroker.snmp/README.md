---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.snmp/README.md
title: ioBroker.snmp
hash: i8OfdmNKPXpxuu3YtpvwN8rjo9aAM2ExXyFgqKx6ugE=
---
![Logo](../../../en/adapterref/iobroker.snmp/admin/snmp.png)

![Anzahl der Installationen](http://iobroker.live/badges/snmp-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.snmp.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.snmp.svg)

# IoBroker.snmp
![Testen und freigeben](https://github.com/iobroker-community-adapters/iobroker.snmp/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/snmp/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Die Info
Dieser Adapter kann verwendet werden, um Informationen von Geräten wie Druckern, Netzwerkgeräten usw. über das SNMP-Protokoll abzurufen.

## __IN ARBEIT__
-->

### 2.3.0 (2022-12-13)
* (McM1957) Unterstützung für die Verwendung nativer Datentypen für Zustände hinzugefügt. (#143)
* (McM1957) Unterstützung wurde hinzugefügt, um binäre OID-Daten als json zu speichern. (#188)
* (McM1957) Falsche Einstellung des Schreibmodus wurde behoben. (#191)
* (McM1957) Tabellen in der deutschen Dokumentation wurden korrigiert. (#192)
* (McM1957) Das Benennen eines Oids mit dem reservierten Namen 'online' wurde blockiert. (#203)
* (McM1957) Einige Änderungen in Bezug auf die Codequalität wurden implementiert. (#201, #190)

### 2.2.1 (2022-10-18)
* (McM1957) Fehler in io-package.json behoben.
* (McM1957) Ukrainische Übersetzungen wurden hinzugefügt.

### 2.2.0 (2022-10-18)
* (McM1957) Das Kompatibilitäts-Flag ist jetzt veraltet und wird in zukünftigen Versionen entfernt. Bitte ggf. Config anpassen.
* (McM1957) SNMP V3-Unterstützung wurde hinzugefügt (#71)
* (McM1957) Unterstützung für IPv6 wurde hinzugefügt (#138)
* (McM1957) Code wurde wie von eslint vorgeschlagen bereinigt
* (McM1957) Basismodule wurden auf aktuelle Versionen aktualisiert
* (McM1957) Dokumentation wurde aktualisiert (en, de, ru)

### 2.1.10 (2022-09-22)
* (McM1957) Validierung von OID und Gerätenamen wurde verbessert, Absturz wurde von Sentry gemeldet (#169)

### 2.1.9 (2022-09-13)
* (McM1957) Unterstützung für (IPv4) Domainnamen wurde neu hinzugefügt (#165)
* (McM1957) Geräte ohne aktive OID verursachen keinen schwerwiegenden Fehler mehr, sondern melden nur noch eine Warnung (#155)
* (McM1957) Timerwerte werden nun strenger validiert (#156, #164)
* (McM1957) Einige von Sentry gemeldete Abstürze wurden behoben (#167)
* (McM1957) externe Pakete wurden von dependentabot aktualisiert

### 2.1.8 (2022-09-08)
* (McM1957) HOTFIX: Parameter "community" wurde beim Update auf Version v2.x.x von früheren Releases nicht migriert. (#163)

### 2.1.7 (2022-08-27)
* (McM1957) Dokumentation in README.md wurde aktualisiert (#133)

### 2.1.6 (2022-08-19)
* (McM1957) Einige von Sentry gemeldete Probleme wurden behoben (#151, #152)

### 2.1.5 (2022-08-11)
* (McM1957) Die Funktionalität der Option "optional" wurde wiederhergestellt. (#147)

### 2.1.4 (2022-08-08)
* (McM1957) HOTFIX - Ein Systemabsturz bei SNMP v1 Fehlern wurde behoben (#145)

### 2.1.3 (2022-08-07)
* (McM1957) Eine neue Option zur Steuerung der Anzahl von OIDs innerhalb einer einzelnen Anfrage wurde hinzugefügt, um TOOBIG-Fehler zu vermeiden (#72)

### 2.1.2 (2022-08-02)
* (McM1957) Konvertierung von Floatingpoint-Werten wurde korrigiert (#16)

### 2.1.1 (2022-08-01)
* (McM1957) Einige externe Pakete wurden aktualisiert

### 2.1.0 (2022-07-30)
* (McM1957) net-snmp wurde auf Version 3.8.2 aktualisiert
* (McM1957) Unterstützung für SNMP v2c wurde hinzugefügt (#116)
* (McM1957) Der Qualitätsmarker von Zustandsobjekten wird im Fehler- oder Zeitüberschreitungsfall verwendet
* (McM1957) Der OID-Marker 'Optional' wurde implementiert. Dieser Marker unterdrückt Fehler bei nicht immer verfügbaren OIDs. (#116)
* (McM1957) Unterstützung für Counter64-OIDs wurde hinzugefügt. (#57)
* (McM1957) Die von der SNMP-Kommunikation zurückgegebenen Daten werden jetzt detaillierter protokolliert.
* (McM1957) Der Kompaktmodus wurde aktiviert. (#20)
* (McM1957) Bekannte Einschränkung: derzeit werden nur SNMP V1 und SNMP V2c unterstützt.
* (McM1957) Bekannte Einschränkung: OID-Attribut schreibbar ist noch nicht implementiert.

### 2.0.1 (2022-07-22)
* (McM1957) Fehlerhafte Behandlung des Kompatibilitätsmodus-Flags wurde korrigiert (#135)
* (McM1957) Protokollierung von Fehlern bei ungültigen OIDs korrigiert (#134)

### 2.0.0 (2022-07-21)
* WICHTIG: Diese Version wird die Konfigurationsstrukturen ändern!

Bitte sichern Sie Ihre Konfiguration, bevor Sie mit der Installation beginnen.
Die Installation wird versuchen, die alte Konfiguration zu konvertieren - aber es ist nicht garantiert, dass sie in allen Fällen erfolgreich ist.

* (McM1957) Viele Teile des Codes wurden neu geschrieben
* (McM1957) Der Adapter verwendet jetzt die admin5-Schnittstelle
* (McM1957) Timerwerte können jetzt pro Gerät unterschiedlich eingestellt werden (#105)
* (McM1957) Das Ändern der Reihenfolge der Konfigurationseinträge zerstört keine Daten mehr (#15)
* (McM1957) Zustandsobjekte für Geräte können jetzt benannt werden. Das alte Verhalten ist optional verfügbar.
* (McM1957) Bekannte Einschränkung: derzeit wird nur SNMP V1 unterstützt.
* (McM1957) Bekannte Einschränkung: OID-Attribute optional und beschreibbar sind noch nicht implementiert.

### 1.0.0 (2022-03-21)
* WICHTIG: Diese Version wird die Objektstrukturen ändern!
* (McM1957) Latenz für die Aktualisierung von info.connection wurde reduziert
* (McM1957) Exzessive Fehlerprotokollierung wenn Ziel nicht erreichbar ist wurde optimiert
* (McM1957) Zusätzliches Online-Objekt auf der IP-Basis, um anzuzeigen, dass das Ziel erreichbar ist, wurde hinzugefügt
* (McM1957) Wenn OIDs unterschiedliche Communities für ein Gerät angeben, wird eine Warnung ausgegeben
* (Apollon77) Sentry für Absturzmeldungen wurde hinzugefügt

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

## __Adapter-Konfiguration__
Der Adapter fragt bestimmte OIDs ab, die in OID-Gruppen gruppiert sind, die wiederum Geräten zugewiesen sind. Die Konfigurationsdaten werden auf mehreren Registerkarten eingegeben:

### __TAB OID-Gruppen__
Hier geben Sie alle OIDs an, die vom Adapter abgefragt werden sollen, ein OID pro Zeile.

| Parameter | Geben Sie | ein Beschreibung | Kommentar |
|---------------|-------------|-----------------------------------|-------------------------------------|
| aktiv | boolesch | wenn auf true gesetzt, wird OID verwendet | kann verwendet werden, um eine einzelne OID | zu deaktivieren |
| OID-Gruppe | Text | Name der OID-Gruppe | wird verwendet, um die Gruppe dem Gerät | zuzuweisen |
| OID-Name | Text | Name, der der OID | zugeordnet ist wird verwendet, um den Datenpunkt | zu benennen |
| OID | Text | oid-Zeichenfolge (1.2.3.4.) | oid-Zeichenfolge, wie vom Gerätehersteller angegeben |
| beschreibbar | boolesch | sollte auf true gesetzt werden, wenn OID beschreibbar ist | reserviert für zukünftige Verwendung |
| optional | boolesch | sollte auf true gesetzt werden, wenn OID optional ist | wenn auf true gesetzt, wird kein Fehler ausgelöst, wenn oid unbekannt ist |

### __TAB-Gerät__
Hier legen Sie fest, welche Geräte abgefragt werden sollen.

| Parameter | Geben Sie | ein Beschreibung | Kommentar |
|---------------|-------------|-----------------------------------|-------------------------------------|
| aktiv | boolesch | wenn auf true gesetzt, wird das Gerät verwendet | kann verwendet werden, um ein einzelnes Gerät zu deaktivieren |
| Name | Text | Name des Geräts | wird verwendet, um Namen von Datenpunkten zu erstellen |
| IP-Adresse | Text | IP-Adresse (IPv4 oder IPv6) mit optionaler Portnummer | HINWEIS: derzeit wird nur IPv4 unterstützt |
| OID-Gruppe | Text | Auf der Registerkarte IOD-Gruppen | angegebene OID-Gruppe Eine OID-Gruppe kann mehr als einem Gerät zugeordnet werden | |
| SNMP-Version | wählen Sie | Zu verwendende SNMP-Version | HINWEIS: SNMPv3 wird noch nicht unterstützt |
| Community (v1, v2c) oder Auth-ID (v3) | Text | Community für SNMP v1 oder V2c, Autorisierungsgruppe für SNMP v3 | HINWEIS: SNMPv3 wird noch nicht unterstützt |
| Zeitüberschreitung (Sek.) | Zahl | Verarbeitungszeitüberschreitung in Sekunden | |
| Wiederholung (Sek.) | Nummer | Wiederholungsintervall in Sekunden | |
| Abfrage (Sek.) | Nummer | Abfrageintervall in Sekunden | |

### __TAB-Autorisierung__
Diese Registerkarte enthält SNMP V3-Autorisierungsinformationen. Bitte beachten Sie, dass SNMP V3 noch nicht implementiert ist.

| Parameter | Geben Sie | ein Beschreibung | Kommentar |
|---------------|-------------|-----------------------------------|-------------------------------------|

### __TAB-Optionen__
Hier legen Sie einige allgemeine Optionen fest

| Parameter | Geben Sie | ein Beschreibung | Kommentar |
|---------------|-------------|-----------------------------------|-------------------------------------|
| Paketgröße | Ganzzahl | maximale Anzahl von OIDs, die innerhalb einer einzigen Anfrage gesendet werden | reduzieren Sie diesen Wert bei TOOBIG-Fehlern |
| Kompatibilitätsmodus | boolesch | wenn diese Option aktiviert ist, basieren die Datenpunktnamen auf der IP-Adresse | HINWEIS: veraltet - nicht mehr verwenden. Dieses Flag funktioniert nicht mit IPv6-Adressen. Kann in zukünftigen Versionen entfernt werden. |

## __Lizenz__
Die MIT-Lizenz (MIT)

Copyright (c) 2017-2022 Marcolotti <info@ct-j.de>, McM1957 <mcm57@gmx.at>, ioBroker Community Developers

Hiermit wird jeder Person, die eine Kopie dieser Software und der dazugehörigen Dokumentationsdateien (die „Software“) erhält, kostenlos die Erlaubnis erteilt, uneingeschränkt mit der Software zu handeln, einschließlich, aber nicht beschränkt auf die Rechte zur Nutzung, Vervielfältigung, Änderung und Zusammenführung , Kopien der Software zu veröffentlichen, zu verteilen, unterzulizenzieren und/oder zu verkaufen und Personen, denen die Software zur Verfügung gestellt wird, dies zu gestatten, vorbehaltlich der folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Genehmigungshinweis müssen in allen Kopien oder wesentlichen Teilen der Software enthalten sein.

DIE SOFTWARE WIRD OHNE MÄNGELGEWÄHR UND OHNE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG BEREITGESTELLT, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF GEWÄHRLEISTUNGEN DER MARKTFÄHIGKEIT, EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND NICHTVERLETZUNG VON RECHTEN DRITTER. DIE AUTOREN ODER URHEBERRECHTSINHABER SIND IN KEINEM FALL HAFTBAR FÜR ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNG, OB IN EINER VERTRAGSAKTION, UNERLAUBTER HANDLUNG ODER ANDERWEITIG, DIE SICH AUS, AUS ODER IM ZUSAMMENHANG MIT DER SOFTWARE ODER DER NUTZUNG ODER ANDEREN HANDLUNGEN IN DER SOFTWARE ERGEBEN SOFTWARE.

## Changelog

<!--