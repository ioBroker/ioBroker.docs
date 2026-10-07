---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md
title: ADR 0015: Explizite Verwaltung von HomePod- und AirPlay-Empfängern
hash: IeB1/kUgksCrOcjnDsVRQNqB4KdvVP4E5z7yXrDFTTs=
---
# ADR 0015: Explizite Verwaltung von HomePod- und AirPlay-Empfängern

- Status: akzeptiert
- Datum: 02.09.2026

## Kontext

Die ADRs 0013 und 0014 führten stabile gerätespezifische Objektverträge für eindeutig identifizierte AirPlay-Empfänger und HomePods ein. Ihre erste Implementierung projizierte jedes eindeutig identifizierte Ziel automatisch. Das Admin-Design erfordert jedoch eine bewusste Unterscheidung zwischen temporärer Erkennung, lokal verwaltetem Inventar und aktiver öffentlicher Projektion für alle Geräteklassen.

HomePods nutzen automatisches, temporäres Pairing anstelle von Anmeldeinformationen, während generische AirPlay-Empfänger derzeit nur Lesezugriffe auf die Erkennung ermöglichen. Daher kann keine der beiden Klassen die Anmeldeinformationen von Apple TV als dauerhafte Verwaltungsgrenze wiederverwenden.

## Entscheidung

Ein eindeutig identifizierter HomePod oder generischer AirPlay-Empfänger erscheint zunächst als nicht verwalteter Erkennungskandidat. Die Erkennung allein erstellt keinen eigenen öffentlichen Objektbaum und startet keine HomePod-Protokollsitzung. Schwach identifizierte Beobachtungen bleiben nur in der Klassenübersicht und -anzahl sichtbar, da für sie kein stabiler lokaler Verwaltungsschlüssel existiert.

Durch eine explizite Administratoraktion wird ein aktueller Kandidat als aktiv festgelegt. Das Gerät wird anschließend von der Tabelle der erkannten Geräte in die Tabelle der verwalteten Geräte verschoben und kann nicht in beiden Tabellen erscheinen. Der Adapter speichert seine Klasse, die normalisierte 12-stellige Protokoll-ID, den aktuellen Namen, das aktuelle Modell und das Aktivierungsflag in der nur für den Besitzer zugänglichen atomaren Instanzdatei. `managed-devices.v1.json` Diese Datei enthält keine Adresse, keinen Port, keinen Hostnamen, keinen TXT-Eintrag, keinen Schlüssel, kein Token, keine Anmeldeinformationen und keine PIN.

Für ein übernommenes Gerät:

- „aktiv“ bedeutet, dass ein klassenspezifischer öffentlicher Objektbaum existieren kann;
- Ein aktiver HomePod kann seine automatische, vorübergehende AirPlay-Sitzung herstellen;
- Ein aktiver generischer Empfänger empfängt nur die schreibgeschützte Inventarliste ADR 0013;
- Der passive Modus behält den lokalen Verwaltungsdatensatz bei, trennt jedoch jede HomePod-Sitzung und entfernt den gesamten individuellen Objektbaum;
- Durch die Reaktivierung wird der Baum entweder sofort wiederhergestellt, wenn das Gerät aktuell entdeckt wird, oder nach einer späteren erfolgreichen Entdeckung.
- Durch das Löschen wird der lokale Eintrag entfernt, die HomePod-Sitzung getrennt und die Objektstruktur gelöscht. Ein weiterhin sichtbares Gerät wird sofort wieder als nicht verwalteter Erkennungskandidat angezeigt und kann erneut eingebunden werden.

Aktive verwaltete Root-Einträge bleiben auch nach vorübergehender Abwesenheit mit den in den ADRs 0013 und 0014 definierten nicht verfügbaren Standardeinstellungen erhalten. Passive, gelöschte und nie übernommene Root-Einträge werden beim Neustart und nach Änderungen der Verwaltung entfernt. Die Anzahl der erfassten Einträge umfasst weiterhin alle ausschließlich klassifizierten Beobachtungen und ist unabhängig von der lokalen Verwaltung.

Die administrativen Verwaltungsvorgänge und der Abgleich der Erkennungsergebnisse nutzen eine gemeinsame, serialisierte Laufzeitwarteschlange. Die HomePod-Deaktivierung wartet auf die Ausführung von Befehlen in der Warteschlange, einen aktiven Verbindungsversuch, die Trennung der Backend-Verbindung und das endgültige Auftreten von Ereignissen, bevor der Baum gelöscht wird. Die Apple TV-Kopplungs-, Anmelde- und Aktivierungsverträge bleiben unverändert.

## Migration

Die einzelnen HomePod- und AirPlay-Empfängerverträge wurden nach der Veröffentlichung hinzugefügt. `0.2.0` Diese Geräte wurden noch nicht freigegeben. Entwicklungsinstallationen können dennoch automatisch erlernte Stammverzeichnisse aus diesen Vorabversionen enthalten. Beim ersten Start mit dieser Einstellung werden diese Stammverzeichnisse entfernt, es sei denn, das Gerät wurde explizit in den neuen Store aufgenommen. Der Benutzer aktiviert dann das aktuell erkannte Gerät in der Administration, um dessen Stammverzeichnis neu zu erstellen.

Die nächste Version, die diese Geräteverträge enthält, ist ein kleineres Feature-Update vor Version 1.0. Nein `0.2.x` Die Veröffentlichung kann diese Management- und Prognoseänderung mit sich bringen.

## Konsequenzen

Die Besitzverhältnisse des Objektbaums sind nun für alle von der Erkennung verwalteten Klassen einheitlich: Netzwerkpräsenz entspricht der Beobachtung, lokale Verwaltung der dauerhaften Absicht, und nur die aktive Absicht erlaubt die Projektion. Offline- und passive Geräte behalten lesbare Fallback-Metadaten in der Administrationsoberfläche, ohne Protokolldetails in die native Konfiguration oder öffentliche Zustände preiszugeben.

Die zusätzliche lokale Datendatei ist ein Persistenzvertrag. Formatänderungen erfordern Validierung, Migration, Neustarttests, ein ADR-Update und eine kompatible SemVer-Entscheidung. Die bestehenden Hardware-Validierungsanforderungen gelten weiterhin für die Steuerung von HomePods und die Erkennung des Empfängermodells.

## Validierung

Die Tests umfassen atomare Persistenz nur für Eigentümer, Schema-Ablehnung, klassengetrennte Identität, Verschiebung von Kandidaten zu verwalteten Objekten, Vermeidung doppelter Einträge, aktive/passive Projektion, HomePod-Trennung, explizites Löschen, Wiederauftauchen von Kandidaten, Bereinigung beim Start, Offline-Aufbewahrung und normalisierte Administratorfehler. Die vollständige Adapter-Gateway- und die unterstützte Knotenmatrix sind vor der Veröffentlichung erforderlich; die Hardware-Validierung des HomePod steht noch aus.