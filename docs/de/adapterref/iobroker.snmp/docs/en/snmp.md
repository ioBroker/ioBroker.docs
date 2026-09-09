---
chapters: {"pages":{"en/adapterref/iobroker.snmp/README.md":{"title":{"en":"ioBroker.snmp"},"content":"en/adapterref/iobroker.snmp/README.md"},"en/adapterref/iobroker.snmp/docs/en/snmp.md":{"title":{"en":"SNMP adapter information"},"content":"en/adapterref/iobroker.snmp/docs/en/snmp.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.snmp/docs/en/snmp.md
title: SNMP-Adapterinformationen
hash: E2vjtjqGeU2lDOZtFheooc9slWHIsK4b/wajJ7bxABs=
---
# SNMP-Adapterinformationen

## allgemeine Informationen

Das Simple Network Management Protocol (SNMP) ist ein Internetstandardprotokoll zum Sammeln und Organisieren von Informationen über verwaltete Geräte in IP-Netzwerken und zum Ändern dieser Informationen, um das Geräteverhalten anzupassen. Zu den Geräten, die SNMP typischerweise unterstützen, gehören Kabelmodems, Router, Switches, Server, Workstations, Drucker und weitere.

SNMP wird in der Netzwerkverwaltung häufig zur Netzwerküberwachung eingesetzt. SNMP stellt Verwaltungsdaten in Form von Variablen auf den verwalteten Systemen bereit, die in einer Management Information Base (MIB) organisiert sind und den Systemstatus und die Konfiguration beschreiben. Diese Variablen können dann von Verwaltungsanwendungen remote abgefragt (und unter bestimmten Umständen auch manipuliert) werden.

Drei bedeutende Versionen von SNMP wurden entwickelt und eingesetzt. SNMPv1 ist die ursprüngliche Version des Protokolls. Neuere Versionen, SNMPv2c und SNMPv3, bieten Verbesserungen in Leistung, Flexibilität und Sicherheit. (Text entnommen aus Wikipedia, der freien Enzyklopädie)

Der SNMP-Adapter verwendet die sogenannten OIDs (Object Identifier), um diese Werte vom konfigurierten Gerät auszulesen.

## Konfiguration

Der Adapter fragt spezifizierte OIDs (Objektkennungen) ab, die in OID-Gruppen gruppiert und anschließend Geräten zugewiesen werden. Die Konfigurationsdaten werden auf mehreren Registerkarten eingegeben:

### TAB OID-Gruppen

Hier geben Sie alle OIDs an, die vom Adapter abgefragt werden sollen, eine OID pro Zeile.

<p align=center><img src="img/snmp_tab_oids.jpg" width="600" /></p>

| Parameter    | Typ             | Beschreibung                                                     | Kommentar                                                                                                                     |
| ------------ | --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| aktiv        | boolescher Wert | Wenn auf „true“ gesetzt, wird OID verwendet.                     | kann verwendet werden, um eine einzelne OID zu deaktivieren.                                                                  |
| OID-Gruppe   | Text            | Name der OID-Gruppe                                              | wird verwendet, um einer Gruppe ein Gerät zuzuweisen.                                                                         |
| OID-Name     | Text            | Dem OID zugewiesener Name                                        | wird zur Benennung des Datenpunkts verwendet                                                                                  |
| OID          | Text            | oid string (1.2.3.4.)                                            | OID-Zeichenkette, wie vom Gerätehersteller angegeben                                                                          |
| beschreibbar | boolescher Wert | sollte auf „true“ gesetzt werden, wenn die OID beschreibbar ist. | Für zukünftige Verwendung reserviert                                                                                          |
| optional     | boolescher Wert | sollte auf „true“ gesetzt werden, wenn OID optional ist.         | Wenn auf „true“ gesetzt, wird kein Fehler ausgelöst, wenn die OID unbekannt ist (Funktionalität nicht verfügbar mit SNMP V1). |

Sie können jede OID einfach durch Setzen des Aktivierungsflags aktivieren/deaktivieren. Beachten Sie, dass die ID des ioBroker-Status zum Speichern der gelesenen Daten normalerweise aus dem Gerätenamen (siehe Registerkarte „Geräte“) und dem hier angegebenen OID-Namen zusammengesetzt ist. Sie können Punkte innerhalb des OID-Namens verwenden, um eine Ordnerstruktur zu erstellen.

Falls einige OIDs nicht immer verfügbar sind, sollten Sie das optionale Flag setzen, um unnötige Fehler zu vermeiden. Bitte beachten Sie, dass dies die Verwendung von SNMP v2c oder SNMPv3 erfordert.

### TAB-Geräte

Hier legen Sie fest, welche Geräte abgefragt werden sollen.

<p align=center><img src="img/snmp_tab_devices.jpg" width="600" /></p>

| Parameter                             | Typ             | Beschreibung                                                           | Kommentar                                                                                                                                                     |
| ------------------------------------- | --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| aktiv                                 | boolescher Wert | Wenn auf „true“ gesetzt, wird das Gerät verwendet.                     | kann verwendet werden, um ein einzelnes Gerät zu deaktivieren                                                                                                 |
| Name                                  | Text            | Name des Geräts                                                        | wird verwendet, um Namen für Datenpunkte zu erstellen.                                                                                                        |
| IP-Adresse                            | Text            | IP-Adresse (IPv4 oder IPv6) oder Domänenname mit optionaler Portnummer | IPv4 1.2.3.4 oder 1.2.3.4:161, IPv6 2001:abcd::30ff, IPv6 \[2001:abcd::30ff] oder \[2001:abcd::30ff]:161, Domain myhost.domain.org oder myhost.domain.org:161 |
| IPv6                                  | boolescher Wert | Wenn IPv6 eingestellt ist, sollte es verwendet werden.                 |                                                                                                                                                               |
| OID-Gruppe                            | Text            | OID-Gruppe, die auf der Registerkarte „IOD-Gruppen“ angegeben ist      | Eine OID-Gruppe kann mehreren Geräten zugewiesen werden.                                                                                                      |
| SNMP-Version                          | wählen          | Zu verwendende SNMP-Version                                            |                                                                                                                                                               |
| Community (v1, v2c) oder Auth-ID (v3) | Text            | Community für SNMP v1 oder v2c, Autorisierungsgruppe für SNMP v3       |                                                                                                                                                               |
| Zeitüberschreitung (Sek.)             | Nummer          | Verarbeitungs-Timeout in Sekunden                                      |                                                                                                                                                               |
| Wiederholung (Sek.)                   | Nummer          | Wiederholungsintervall in Sekunden                                     |                                                                                                                                                               |
| Umfrage (Sek.)                        | Nummer          | Abfrageintervall in Sekunden                                           |                                                                                                                                                               |

### TAB-Autorisierung

Dieser Tab enthält SNMP V3-Autorisierungsinformationen.

<p align=center><img src="img/snmp_tab_authorization.jpg" width="600" /></p>

| Parameter                 | Typ     | Beschreibung                       | Kommentar                                                |
| ------------------------- | ------- | ---------------------------------- | -------------------------------------------------------- |
| Name (ID)                 | Text    | ID der Autorisierungsdaten         | muss mit der Auth-Id auf den Tab-Geräten übereinstimmen. |
| Sicherheitsstufe          | Auswahl | gewünschte Sicherheitsmethode      | Siehe Artikelbeschreibung                                |
| Benutzername              | Text    | Benutzername zur Authentifizierung |                                                          |
| Verfahren                 | Auswahl | Passwort-Hashing-Methode           | Unterstützte Methoden sind MD5 oder SHA.                 |
| Autorisierungsschlüssel   | Text    | Passwort zur Authentifizierung     |                                                          |
| Verschlüsselung           | Auswahl | Verschlüsselungsmethode            |                                                          |
| Verschlüsselungsschlüssel | Text    | Verschlüsselungsschlüssel          |                                                          |

Beachten Sie, dass Name(id) eindeutig sein muss.

Bei Auswahl des SNMP-V3-Protokolls ist eine erweiterte Authentifizierung erforderlich. Geben Sie bei den Geräten in der Spalte „Auth-Id“ den Namen eines Authentifizierungsblocks an. Auf dieser Registerkarte müssen Sie die gewünschte Sicherheitsstufe wie folgt auswählen:

- Minimum – nur ein Benutzername ist erforderlich.
- Authentifizierung – Benutzername und Passwort erforderlich
- Authentifizierung und Verschlüsselung – Benutzername, Passwort und Verschlüsselungsschlüssel sind erforderlich.

Bitte beachten Sie, dass das angegebene Sicherheitsniveau vom Zielgerät unterstützt werden muss und Benutzername, Passwort und Verschlüsselungsschlüssel mit den auf dem Zielgerät eingegebenen Daten übereinstimmen müssen. Sie können denselben Autorisierungsblock für mehrere Geräte verwenden, sofern diese dieselben Daten verwenden.

### TAB-Optionen

Hier legen Sie einige allgemeine Optionen fest.

<p align=center><img src="img/snmp_tab_options.jpg" width="600" /></p>

| Parameter            | Typ             | Beschreibung                                                                      | Kommentar                                                                                                                                           |
| -------------------- | --------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paketgröße           | ganze Zahl      | Maximale Anzahl von OIDs, die innerhalb einer einzelnen Anfrage gesendet werden   | Reduzieren Sie diesen Wert im Falle von ZU GROSSEN Fehlern.                                                                                         |
| Kompatibilitätsmodus | boolescher Wert | Wenn diese Option aktiviert ist, basieren die Datenpunktnamen auf der IP-Adresse. | Hinweis: Veraltet – nicht mehr verwenden. Diese Option funktioniert nicht mit IPv6-Adressen. Wird möglicherweise in zukünftigen Versionen entfernt. |

Die Option „Paketgröße“ kann verwendet werden, um die Anzahl der in einer Anfrage abgefragten OIDs zu reduzieren. Je nach Zielgerät kann die Anzahl der mit einer Anfrage abgefragten OIDs begrenzt sein. In diesem Fall kann das Gerät mit dem Fehler „TOOBIG“ antworten. Versuchen Sie in diesem Fall, den Wert für die Option „Paketgröße“ zu verringern.

## OID-Beispiele

Die Suche nach Hersteller und MIB ist in den meisten Fällen erfolgreich. Alternativ können Sie eine MIB-Browser-Software verwenden, um Ihr Zielgerät abzufragen, z. B. <https://www.ireasoning.com/mibbrowser.shtml>

### Drucker

Für die meisten Drucker existiert ein Standard (PRINTER MIB). <http://www.oidview.com/mibs/0/Printer-MIB.html>

Für den Samsung CLP320 Farblaser sind beispielsweise die folgenden OIDs gültig.

Anzahl der gedruckten Seiten: 1.3.6.1.2.1.43.10.2.1.4.1.1

Schwarzer Toner: 1.3.6.1.2.1.43.11.1.1.9.1.1

Toner Cyan: 1.3.6.1.2.1.43.11.1.1.9.1.2

Toner Magenta: 1.3.6.1.2.1.43.11.1.1.9.1.3

Toner gelb: 1.3.6.1.2.1.43.11.1.1.9.1.4

Life\_drum-Einheit: 1.3.6.1.2.1.43.11.1.1.9.1.7

### NAS-Systeme - Synology

Synology: SNMP ist auf Synology DiskStations standardmäßig deaktiviert und muss in der WebUI aktiviert werden. Wichtig ist, dass Port 161 standardmäßig beibehalten und die Community korrekt eingestellt ist. In der Regel ist die Community „öffentlich“.

<https://global.download.synology.com/download/Document/MIBGuide/Synology_DiskStation_MIB_Guide.pdf>

### USV

Für APC USVs könnten Sie <https://www.opsview.com/resources/monitoring/blog/apc-ups-monitoring-useful-oids> besuchen.