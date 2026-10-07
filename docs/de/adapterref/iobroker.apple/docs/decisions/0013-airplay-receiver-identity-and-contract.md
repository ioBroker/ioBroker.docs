---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md
title: ADR 0013: AirPlay-Empfängeridentität und schreibgeschützter Vertrag
hash: fp5viedoufNqO70zIoKpUAQur+m7S3Fo3Fq9I2KqQTk=
---
# ADR 0013: AirPlay-Empfängeridentität und schreibgeschützter Vertrag

- Status: akzeptiert; Eigentumsverhältnisse des Projekts durch ADR 0015 geändert
- Datum: 01.09.2026

## Kontext

Die generische AirPlay-Empfängererkennung klassifiziert bereits Macs im Empfängermodus, AirPort Express-Geräte, kompatible Lautsprecher, Smart-TVs und AV-Receiver, zeigt aber nur die Anzahl der Klassen und temporäre Administratorinformationen an. Namen, Adressen, Ports und DNS-SD-Instanznamen können sich ändern und besitzen daher keine dauerhaften ioBroker-Objektpfade. Die aktuelle SDK-Dokumentation rechtfertigt auch nicht die Behauptung, dass der Adapter auf jeden beworbenen Empfänger streamen oder diesen steuern kann.

Der Adapter benötigt einen stabilen ersten Gerätevertrag, der die Inventarisierung und externe Bindungen verbessert, ohne die spekulative Wiedergabe, Kopplung, Lautstärke oder Transportsemantik einzufrieren.

## Entscheidung

Erstellen Sie unten ein einzelnes schreibgeschütztes Objekt. `devices.airplayReceiver.<stableDeviceId>` Nur wenn die Geräteerkennung eine normalisierte 12-stellige Protokoll-Geräte-ID bereitstellt und der Benutzer das Gerät gemäß ADR 0015 explizit als aktiv festgelegt hat. Die ID stammt aus AirPlay TXT. `deviceid` oder die führende Geräte-ID einer RAOP-Dienstinstanz. Der öffentliche Pfad verwendet Kleinbuchstaben im Hexadezimalformat; `info.deviceId` zeigt den normalisierten Wert in Großbuchstaben an.

Leiten Sie niemals einen öffentlichen Gerätepfad allein aus Anzeigename, Modell, IP-Adresse, Port, Hostname, FQDN, Dienstinstanzsuffix, Erkennungsreihenfolge oder öffentlichem Schlüssel ab. Ein öffentlicher Schlüssel kann zwar AirPlay- und RAOP-Beobachtungen innerhalb eines Scans korrelieren, autorisiert aber allein kein dauerhaftes Geräteobjekt. Schwach identifizierte Empfänger bleiben in der Zählung der Klassenerkennung und im Admin-Snapshot enthalten.

Die Klassifizierung bleibt exklusiv: Apple TV zuerst, HomePod an zweiter Stelle, dann generischer AirPlay-Empfänger. Eine Protokollgeräte-ID, die von einem erkannten Apple TV oder HomePod beansprucht wird, darf kein generisches Empfängerobjekt erzeugen. Korrelierte AirPlay- und RAOP-Dienste erzeugen einen generischen Empfänger.

Der anfängliche Zustandsvertrag pro Gerät lautet:

| Staatszusatz          | Typ             | Rolle           | Lesen | Schreiben | Bedeutung                                             |
| --------------------- | --------------- | --------------- | ----- | --------- | ----------------------------------------------------- |
| `info.name`           | Zeichenkette    | `info.name`     | Ja    | NEIN      | Letzter Anzeigename                                   |
| `info.type`           | Zeichenkette    | `text`          | Ja    | NEIN      | Konstante `airplayReceiver`                           |
| `info.model`          | Zeichenkette    | `info.hardware` | Ja    | NEIN      | Aktuell gemeldetes Modell oder leer                   |
| `info.deviceId`       | Zeichenkette    | `text`          | Ja    | NEIN      | Stabile normalisierte Protokoll-ID                    |
| `info.lastSeen`       | Nummer          | `value.time`    | Ja    | NEIN      | Letzter erfolgreicher Scan mit dem Empfänger          |
| `discovery.available` | boolescher Wert | `indicator`     | Ja    | NEIN      | Im letzten erfolgreichen vollständigen Scan vorhanden |
| `services.airplay`    | boolescher Wert | `indicator`     | Ja    | NEIN      | Der AirPlay-Dienst wurde in diesem Scan beworben.     |
| `services.raop`       | boolescher Wert | `indicator`     | Ja    | NEIN      | Der RAOP-Service wurde in diesem Scan beworben.       |

Jede Projektion schreibt verwendet `ack=true` Der Vertrag gibt keine beschreibbaren Statusinformationen, Anmeldeinformationen, Netzwerk-Endpunkte, TXT-Einträge, Rohdaten-Bitfelder oder Upstream-SDK-Typen preis. Die beworbene Dienstverfügbarkeit dient lediglich der Erkennung und ist kein Nachweis für eine nutzbare Protokollsitzung oder eine erfolgreiche Audiowiedergabe.

Aktive verwaltete Empfängerobjekte bleiben im Objektbaum erhalten, wenn sie bei einem späteren erfolgreichen Scan nicht mehr gefunden werden. Sie werden als nicht verfügbar markiert, ihre angekündigten Dienstkennzeichen werden auf „false“ gesetzt, und `lastSeen` Bleibt unverändert. Beim Start werden vor dem ersten Scan dieselben sicheren, nicht verfügbaren Standardeinstellungen angewendet. Ein fehlgeschlagener Scan löscht keine zuvor erfolgreich erkannten Geräte. Passive und explizit gelöschte Geräte haben keine individuelle Objektstruktur; ein noch sichtbares gelöschtes Gerät wird wieder in die Liste der nicht verwalteten Geräte aufgenommen.

`devices.airplayReceiver.info.deviceCount` Die Zählung umfasst weiterhin alle ausschließlich klassifizierten Empfänger der jüngsten erfolgreichen Entdeckung, einschließlich Beobachtungen ohne dauerhafte Identifizierung. Sie kann daher größer sein als die Anzahl der einzelnen Empfängerobjekte.

## Konsequenzen

Automatisierungen und Visualisierungen können an Empfängerpfade gebunden werden, die auch bei Umbenennungen der Anzeige, DHCP-Änderungen, Portänderungen, vorübergehender Abwesenheit und Neustarts des Adapters erhalten bleiben. Benutzer können aktuelle Erkennungsdaten von einer aktiven Verbindung unterscheiden. Offline aktive Empfänger bleiben sichtbar, bis der Benutzer sie in den passiven Modus versetzt oder ihren lokalen Verwaltungseintrag löscht. Erkennungsbeobachtungen ohne explizite Übernahme erzeugen keine Automatisierungsbindungen.

Streaming, temporäre Kopplung, Lautstärke, Transport, Metadaten, Covergestaltung, Gruppierung und Empfängeraktivierung fallen nicht unter diesen Vertrag. Jede dieser Funktionen erfordert spezifische SDK-Nachweise, Fähigkeitserkennung, Fehlersemantik und Validierung auf realen Geräten, bevor beschreibbare Zustände oder Verfügbarkeitsansprüche hinzugefügt werden können.

Diese rückwärtskompatible Funktionserweiterung ist für eine zukünftige Nebenversion vor Version 1.0 vorgesehen.

## Alternativen in Betracht gezogen

- Namensbasierte Pfade wurden abgelehnt, da Umbenennungen und Duplikate die Identität beeinträchtigen.
- IP- oder endpunktbasierte Pfade wurden abgelehnt, da sich DHCP- und DNS-SD-Ports ändern.
- Vollständige Public-Key-Pfade wurden abgelehnt, da Beobachtungen, die ausschließlich auf Public-Key-Daten basieren, noch nicht über ausreichend geräteübergreifende und Reset-Evidenz für eine dauerhafte Identität verfügen.
- Das Löschen fehlender Empfängerobjekte nach jedem Scan wurde verworfen, da ein verlustbehaftetes mDNS-Ergebnis stabile Automatisierungsbindungen entfernen würde.
- Das Hinzufügen von Streaming- oder Kontrollzuständen wurde abgelehnt, da Werbung kein Nachweis für Fähigkeiten oder eine erfolgreiche Sitzung ist.

## Validierung

Vertrags- und Korrelationstests umfassen die Normalisierung der AirPlay-Geräte-ID, die RAOP-Identität, die AirPlay/RAOP-Korrelation, die Unabhängigkeit von Umbenennung und Adresse, den Klassenausschluss, die Unterdrückung schwacher Identitäten, die deterministische Reihenfolge und die Metadaten schreibgeschützter Objekte. `ack=true` Vorsprung, `lastSeen` Standardeinstellungen beim Start und Beibehaltung des Status bei abwesenden Geräten. Die vollständige Adapterprüfung ist erforderlich, da sich der öffentliche Objektvertrag und das Discovery-IPC-Schema ändern. Die Realgeräteerkennung muss weiterhin die Identitäts- und Dienstfelder für jedes Empfängermodell bestätigen, bevor modellspezifische Unterstützung beansprucht wird.