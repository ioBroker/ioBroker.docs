---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md
title: ADR 0008: Semantische Versionierung und Releaseklassifizierung
hash: cs7MG9+QUJl+e2MCmqH+tbLYvbWgqDSI6lzp/pTPgJw=
---
# ADR 0008: Semantische Versionierung und Releaseklassifizierung
Status: akzeptiert
- Datum: 31.08.2026

## Kontext
Die Entwicklungsrichtlinien für ioBroker erfordern semantische Versionierung. Dieser Adapter stellt mehr als nur eine JavaScript-API bereit: ioBroker-Objekte und -Zustände, Administratorkonfigurationen, Nachrichten, Befehle, persistente Daten, Laufzeitanforderungen und dokumentiertes Integrationsverhalten werden extern genutzt. Eine Versionsnummer muss angeben, ob diese Nutzer ohne Migration aktualisieren können.

Das Projekt befindet sich aktuell unterhalb der Version `1.0.0`. SemVer erlaubt Instabilität in `0.y.z`, jedoch würden stillschweigende Patch-Releases frühe Automatisierungs- und Visualisierungsintegrationen unzuverlässig machen.

Referenzen:

- https://semver.org/
- https://forum.iobroker.net/topic/26204/versionierung-von-iobroker-und-adaptern

## Entscheidung
Verwenden Sie Semantic Versioning 2.0.0 in der Form `MAJOR.MINOR.PATCH`.

Für stabile Versionen, die mit `1.0.0` beginnen:

- den Wert `MAJOR` bei jeder inkompatiblen Änderung eines öffentlichen Vertrags erhöhen;
- `MINOR` wird für abwärtskompatible Funktionalität oder bei öffentlichen Funktionen erhöht.

Diese Funktionalität ist veraltet;

- `PATCH` nur für rückwärtskompatible Korrekturen inkrementieren.

Der Vertrag für den öffentlichen Adapter umfasst:

- Objekt- und Status-IDs, Hierarchie, Typen, Rollen, Einheiten, Bereiche, Lese-/Schreibzugriff

Flaggen, Werte und Bestätigungssemantik;

- Administratorkonfigurationsfelder und Validierung;
- Schemata für Nachrichtenfelder, Befehle, Szenen und JSON-Nutzdaten;
- normalisiertes Spieler- und Integrationsverhalten;
- Beibehaltung der Konfigurations- und Anmeldeinformationsformate, wenn ein Upgrade nicht möglich ist

sie transparent migrieren;

- dokumentierte Mindestanforderungen an Node.js, js-controller und Admin;
- dokumentiertes, unterstütztes Verhalten, dessen Entfernung eine bestehende

Installation.

Beispiele für größere Änderungen nach `1.0.0` sind das Umbenennen/Entfernen eines Zustands, das Ändern eines Zustandstyps oder einer Befehlsbedeutung, das Erfordernis einer manuellen Neukopplung ohne Migrationspfad, das Wegfallen einer dokumentierten Laufzeitversion oder das Entfernen unterstützten Verhaltens. Zusätzliche optionale Zustände und Funktionen sind in der Regel geringfügig, solange bestehende Nutzer unverändert weiterarbeiten.

Während der anfänglichen Entwicklungsphase (`0.y.z`) sollte eine strengere Projektrichtlinie als die minimale SemVer-Anforderung angewendet werden:

- `0.MINOR.0` stellt einen Meilenstein für eine Funktion dar und kann eine explizite

genehmigte Kompatibilitätsunterbrechung;

- `0.y.PATCH` ist immer abwärtskompatibel;
- Jeder Kompatibilitätsbruch muss in den Versionshinweisen als „BREEKING“ gekennzeichnet werden und

Zusammenfassende Commit-/Review-Informationen sind erforderlich, eine akzeptierte ADR ist notwendig und beinhaltet die Auswirkungen von Migration und Rollback;

- die Abschaffung veralteter Technologien und eine transparente Migration einer Umstellung vorziehen;
- `1.0.0` deklariert den ersten stabilen öffentlichen Adaptervertrag.

Vorabversionen können `-alpha.N`, `-beta.N` oder `-rc.N` verwenden. Sie haben eine niedrigere Priorität als die entsprechende reguläre Version und bieten nicht die gleiche Stabilitätsgarantie wie diese.

Veröffentlichte Versionen und Git-Tags sind unveränderlich. Ersetzen Sie niemals ein veröffentlichtes npm-Artefakt und verwenden Sie keinen Release-Tag für andere Inhalte wieder. Eine Korrektur ist eine neue Version.

Eine Veröffentlichung muss diese Standorte beibehalten:

- `package.json`-Version;
- Version des Stammpakets in `package-lock.json`;
- `io-package.json` `common.version` und `common.news`;
- Versionshinweise/Änderungsprotokoll für Endbenutzer;
- Git-Tag `vMAJOR.MINOR.PATCH` oder dessen gültige Vorabversion.

Bitte erhöhen Sie die Versionsnummern nicht spekulativ während der regulären Feature-Entwicklung. Versionsauswahl, Tagging, Veröffentlichung auf npm und Erstellung des GitHub-Releases erfolgen gemeinsam, nachdem die Qualitätsprüfung erfolgreich abgeschlossen wurde.

## Konsequenzen
Anhand der Versionsnummer lässt sich das Upgrade-Risiko ableiten. Öffentliche ioBroker- und Integrationsverträge müssen bei der Releaseklassifizierung geprüft werden, nicht nur TypeScript-Exporte. Frühe Releases können sich weiterentwickeln, Patch-Releases dürfen jedoch keine Kompatibilitätsbrüche verschleiern, und jeder absichtliche Bruch wird in der Migration dokumentiert.

Änderungen an Funktionen, Fehlerbehebungen und Abhängigkeiten müssen anhand ihrer beobachtbaren Auswirkungen bewertet werden. Eine geringfügige Codeänderung kann eine Hauptversion erforderlich machen, während eine umfangreiche interne Umstrukturierung als Patch gelten kann, sofern das Verhalten unverändert bleibt und verifiziert wurde.

## In Betracht gezogene Alternativen
- Informelle Versionsnummern: abgelehnt, da sie kein Upgrade kommunizieren.

Kompatibilität und Konflikte mit den ioBroker-Richtlinien.

- Jede `0.y.z`-Version sollte ohne Migrationsdisziplin als vollständig instabil behandelt werden:

abgelehnt, da die Anwender von Automatisierungs- und Visualisierungsanwendungen vorhersehbare Aktualisierungen benötigen, bevor `1.0.0`.

- Kalenderversionierung: abgelehnt, da Kompatibilität und nicht das Veröffentlichungsdatum ausschlaggebend ist.

primäre Informationen, die Benutzer benötigen.

## Validierung
- Die Projektdefinition, der Leitfaden für Mitwirkende und die README-Datei verweisen auf diesen ADR.
- Paket, Sperrdatei, ioBroker-News, Änderungsprotokoll und Git-Tag stimmen für jedes überein

Veröffentlichte Version; `0.2.0` ist der erste Feature-Meilenstein, der diese Richtlinie verwendet.

Der Release-Workflow akzeptiert SemVer-Tags und Pre-Release-Tags.