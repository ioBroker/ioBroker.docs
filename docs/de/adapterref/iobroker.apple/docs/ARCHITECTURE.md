---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/ARCHITECTURE.md
title: Technische Architektur
hash: /dqzW9uGeZPRK3w31ZbHTtZeNux7ZciGHpVGqoxilv0=
---
# Technische Architektur

Status: Erste Abgrenzungsdefinition; konkrete APIs bleiben vorbehaltlich der Ergebnisse des Machbarkeitsnachweises.

## Kernregel

ioBroker bildet die Plattformgrenze. Apple-Protokolle und externe Dienste fungieren als Adapter für interne Schnittstellen; der ioBroker-Zustandsbaum ist eine versionierte Projektion des normalisierten Domänenmodells und keine direkte Ausgabe von Protokollobjekten.

## Schichten

```text
ioBroker lifecycle / configuration / objects / messages
                         |
application services: registry, commands, scenes, player facade
                         |
domain contracts: device, capability, source, player, output, group
                /                         \
local device backends                 cloud services
Apple TV / HomePod / AirPlay          Apple Music / future Alexa
                \                         /
        upstream protocol and API clients
```

Die Abhängigkeiten weisen nach innen auf Domänenverträge. Protokollpakete dürfen ioBroker-Zustände nicht direkt schreiben, und Zustandsbehandler dürfen keine Low-Level-Protokollmethoden direkt aufrufen.

## Geplante Module

- `adapter`: ioBroker-Lebenszyklus, Konfiguration, Abonnements, Objekterstellung, Entladen und Nachrichten.
- `domain`: stabile Typen, Fähigkeitsvokabular, normalisierte Metadaten, Fehler und Befehls-/Ergebnisverträge.
- `registry`: Geräteidentität, ermittelte Protokolldienste, konfigurierte Geräte, Player, Ausgänge und Gruppen.
- `backends/apple`: Fassade um Apple SDK/Protokollpakete, Pairing, Servicezustand, Wiederverbindung und Ereignisnormalisierung.
- `sources`: URL-, Datei-, Radio-, TTS-Artefakt- und Apple Music-Referenzen.
- `providers`: optionale externe Kanäle und Inhaltskataloge, die vom Anbieter getrennt werden und von Wiedergabefähigkeitsansprüchen getrennt sind.
- `players`: Backend-neutraler Wiedergabevertrag und Routing/Auflösung.
- `commands`: Validierung, Fähigkeitsprüfungen, Serialisierung pro Ziel, Versand, Timeout und Ergebnisberichterstattung.
- `scenes`: Deklarative Szenenvalidierung und begrenzte Ausführung.
- `music`: Entwickler-/Benutzerautorisierung, Apple Music API-Client, Paginierung, Caching und normalisierte Ergebnisse.
- `objects`: Definitionen und idempotente Abstimmung von ioBroker-Objekten und -Zuständen.
- `security` Abstraktion der Geheimhaltung und der dauerhaften Speicherung von Anmeldeinformationen.
- `platform`: eingeschränkte, ioBroker-eigene Dienste, einschließlich des injizierten Timer-Schedulers, der von Laufzeit- und Protokollkomponenten verwendet wird.

Hierbei handelt es sich um Verantwortungsbereiche, nicht um eine obligatorische Ordnerstruktur, bis der aktuelle ioBroker-Generator das Basisprojekt erstellt.

## Öffentliche Namensraumhierarchie

Das reservierte Top-Level-Objektlayout trennt physische Endpunkte, logische Player, Orchestrierung und Content-Dienste:

```text
apple.<instance>
├── info
├── devices
│   ├── appletv.<stableDeviceId>
│   ├── homepod.<stableDeviceId>
│   └── airplayReceiver.<stableDeviceId>
├── players
├── groups
├── commands
├── scenes
└── music
```

Alle drei Geräteklassenordner geben einen `info.deviceCount` Zusammenfassung der jüngsten erfolgreichen Erkennung. Apple TV erhält seinen gekoppelten Steuerungsvertrag. Generische AirPlay-Empfänger mit einer dauerhaften 12-stelligen AirPlay- oder RAOP-Geräte-ID können explizit in den schreibgeschützten Erkennungs- und beworbenen Dienstvertrag aus ADR 0013 aufgenommen werden; schwach identifizierte Empfänger bleiben nur Zähl-/Admin-Beobachtungen. HomePods mit einem validierten AirPlay-Dienst, `AudioAccessory` Modell und dauerhafte 12-stellige AirPlay-Geräte-ID können explizit in den temporären Steuerungsvertrag aus ADR 0014 übernommen werden. Apple TV und HomePod haben Vorrang vor der generischen AirPlay-Empfängerklasse, sodass kein Endpunkt zweimal vorkommt. Stabile technische IDs bleiben Objektsegmente, während `common.name` bietet lesbare Beschriftungen wie zum Beispiel`AppleTV Living
Room ` oder` HomePod Office` Die

Die Administratorinventarisierung unterscheidet zwischen der aktuellen temporären Erkennungs-Snapshot und der dauerhaften Geräteverwaltung. Sie kann für alle drei Klassen einen geschwärzten Erkennungsnamen und ein geschwärztes Modell anzeigen. Ein gekoppeltes Apple TV ist standardmäßig aktiv; nur aktive Kopplungen können eine Verbindung herstellen und einen individuellen Baum projizieren. Passive Kopplungen behalten ihre Anmeldeinformationen, sind aber getrennt und haben keinen individuellen Baum. HomePods und AirPlay-Empfänger müssen explizit hinzugefügt werden, werden nach der Hinzufügung aus der Kandidatenliste entfernt und erhalten nur im aktiven Zustand einen Baum. Passive Datensätze behalten ihre Administratoridentität; das Löschen entfernt die lokale Verwaltung und ermöglicht es einem noch sichtbaren Ziel, wieder als Kandidat angezeigt zu werden. Die ADRs 0011 und 0015 definieren diese Verträge.

Die Apple TV-Admin-Inventarverwaltung wird durch eine quellcodekontrollierte, benutzerdefinierte JSON-Konfigurationskomponente gerendert. Sie nutzt ausschließlich die nicht-geheime Nachrichten-API des Adapters und speichert eine PIN ausschließlich im Browserspeicher. Die Komponente greift nicht direkt auf den Anmeldeinformationsspeicher, das Protokoll-Backend oder den ioBroker-Objektbaum zu. Alle benutzerdefinierten Konfigurationskomponenten verwenden die GUI-API-Generation 2 und benötigen Admin 8; die ADRs 0012 und 0017 definieren die Tabellen- und Kompatibilitätsgrenzen.

Der HomePod verfügt über keine dauerhaften Kopplungsdaten. Seine nicht-geheimen Nutzungs- und Aktivierungsdaten werden getrennt von den Apple TV-Anmeldeinformationen gespeichert. Jedes aktive, eindeutig identifizierte Zielgerät besitzt eine automatische, temporäre AirPlay-Sitzung. Wiedergabe- und Lautstärkeänderungen werden erst dann ausgeführt, nachdem die Sitzung ihre Zugriffsberechtigung gemeldet hat. Aktive, gespeicherte Verbindungen bleiben auch ohne Verbindung bestehen, wobei sichere Standardeinstellungen verwendet werden, sodass Skripte stabile Bindungen beibehalten; passive und gelöschte Verbindungen werden entfernt.

`music` Dieser Bereich ist für den Autorisierungsstatus, den Katalog, die Bibliothek, Wiedergabelisten, Empfehlungen und Suchergebnisse von Apple Music reserviert. Es handelt sich um einen Namensraum für einen Inhaltsdienst, niemals um eine Geräteklasse. Tokens und andere Geheimnisse sind keine öffentlichen Objekte. ADR 0010 definiert die Hierarchie und die anfängliche Pfadmigration.

## Geräte- und Protokolllebenszyklus

Ein logisches Gerät kann AirPlay-, Companion Link- und RAOP-Dienste mit unterschiedlichen Kennungen, Hostnamen, Ports und Statusinformationen bereitstellen. Die Registry korreliert diese anhand von Nachweisen wie stabiler Protokoll-ID, MAC-/Geräte-ID, Diensteigenschaften und expliziter Benutzerbestätigung. Eine IP-Adresse allein reicht niemals für eine dauerhafte Identität aus.

Der generische Empfänger-Slice akzeptiert nur eine normalisierte 12-stellige AirPlay- oder RAOP-Gerätekennung für eine dauerhafte öffentliche Identität. Ein öffentlicher Schlüssel kann Dienste innerhalb eines Scans korrelieren, erzeugt aber selbst kein dauerhaftes Objekt. Die Verfügbarkeit eines Empfängers bedeutet dessen Anwesenheit in einem erfolgreichen Erkennungsscan, nicht eine verbundene oder getestete Audiositzung.

Jede Protokollsitzung hat einen expliziten Lebenszyklus:

```text
unknown -> discovered -> pairingRequired -> connecting -> online
                    \                     /           |
                     -> unavailable <----             |
                          |                            |
                          +------ recovering <---------+
```

Eine vom Benutzer initiierte Entladung/Entfernung ist von einer unerwarteten Verbindungsunterbrechung zu unterscheiden und darf niemals eine erneute Verbindung einplanen.

## Ereignis- und Zustandsfluss

```text
protocol event
  -> backend normalization
  -> domain snapshot/event
  -> capability-aware state projection
  -> ioBroker state with ack=true
  -> automation/visualization
```

Beschreibbarer Zustandsfluss:

```text
ioBroker state with ack=false
  -> parse and validate
  -> typed command
  -> capability and target check
  -> serialized backend execution
  -> structured result
  -> confirmed states/result with ack=true
```

Protokollereignisse sind maßgebend. Optimistische Zustandsänderungen werden nur dann verwendet, wenn das Protokoll eine Operation nicht bestätigen kann, und werden als Annahmen gekennzeichnet.

## Generischer Befehlsvertrag

Der interne Befehlsbereich ist konzeptionell wie folgt:

```json
{
	"version": 1,
	"requestId": "caller-generated-id",
	"target": "player-or-device-id",
	"command": "launchApp",
	"parameters": {
		"bundleId": "com.apple.Music"
	}
}
```

Das Ergebnis enthält die Anforderungs-ID, das Ziel, den Befehl, Start- und Endzeitpunkt, den Status und einen stabilen Fehlercode. Geheimnisse und unformatierte Upstream-Ausnahmen werden nicht zurückgegeben. Doppelte Anforderungs-IDs können abgelehnt oder idempotent behandelt werden; die endgültige Richtlinie erfordert eine automatische Anforderungszuweisung (ADR), bevor der Endpunkt gesperrt wird.

## Szenenausführung

Szenen sind deklarative Konfigurationen. Ein Szenenausführer validiert die gesamte Szene vor ihrer Ausführung, löst Ziele zur Laufzeit auf und protokolliert ein Ergebnis pro Schritt. Zu den erforderlichen Steuerungsmöglichkeiten gehören die Gesamtdauer, die maximale Verzögerung, die maximale Anzahl an Schritten, die Abbruch- und Zielsperrungsoption sowie eine definierte Stopp-/Fortsetzungsrichtlinie im Fehlerfall.

Beliebiger JavaScript-Code, Shell-Befehle, dynamische Importe oder direkte Schreibvorgänge in ioBroker-Objekte sind keine gültigen Szenenschritte.

## Apple Music Trennung

Die Ressourcen der Apple Music API werden zu normalisierten Quellreferenzen. Ein Wiedergabe-Resolver fragt ein Player-Backend, ob es diese Referenz verarbeiten kann. Mögliche Strategien sind das Starten/Suchen einer App auf Apple TV oder das Anfordern der Wiedergabe durch ein zukünftiges Alexa-Backend. AirPlay-Streaming wird nur verwendet, wenn bereits eine rechtmäßige und technisch verfügbare Audioquelle vorhanden ist; es wird nicht aus den Metadaten der Apple Music API generiert.

Die Öffentlichkeit `music` Der Namespace ist jetzt reserviert, aber es werden keine leeren Objekte oder spekulative Zustandsschemata erstellt, bevor die Apple Music-Autorisierungs- und Datenverträge von einem dedizierten ADR akzeptiert werden.

## Beharrlichkeit

Es werden drei Datenklassen getrennt betrachtet:

- öffentlicher Laufzeitstatus: Verbindung, Metadaten, Fortschritt, Fähigkeiten, Ergebnisse;
- dauerhafte, nicht geheime Konfiguration: Geräteaktivierung, Namen, Gruppen, Szenen, Einstellungen;
- Geheimnisse: Kopplung von Anmeldeinformationen und Service-Tokens.

Die Aktivierung von Apple TV wird getrennt von den Anmeldeinformationen in einer versionierten, nur für den Besitzer bestimmten atomaren Instanzdatendatei gespeichert, die ausschließlich explizit deaktivierte Geräte-IDs enthält. Fehlende Einträge bedeuten, dass ein Gerät aktiv ist. Daher werden Kopplungen, die mit älteren Versionen erstellt wurden, migriert, ohne dass die Anmeldeinformationsdatenbank neu geschrieben werden muss. Die Kopplungsgeheimnisse verbleiben in ihrem separat verschlüsselten Anmeldeinformationsspeicher. Explizit aktivierte HomePods und AirPlay-Empfänger verwenden die separate, nur für den Besitzer bestimmte atomare Instanzdatendatei. `managed-devices.v1.json` Das Inventar enthält ausschließlich Klasse, stabile ID, Fallback-Name/-Modell und Aktivierung. Die ADRs 0006, 0011 und 0015 definieren diese Formate und das Bereinigungsverhalten.

## Grenzen testen

- Domänen, Befehle, Szenen, Normalisierung und Objektprojektion werden ohne Netzwerkgeräte getestet.
- Backend-Tests verwenden aufgezeichnete/synthetische Protokollobjekte nur dann, wenn Lizenzen und Datenschutz dies zulassen.
- Adapterintegrationstests überprüfen Startvorgang, Objekterstellung, Zustandsänderungen, Nachrichten, Entladen und Komprimierungsmodus.
- Tests auf realen Geräten verifizieren die per Reverse Engineering gewonnenen Protokolle und werden in einer Kompatibilitätsmatrix aufgezeichnet; es wird nicht erwartet, dass sie in der öffentlichen CI ausgeführt werden.
- Die Vertragsdetails enthalten ausschließlich neutrale, generierte Daten.

## Entscheidungen zur offenen Architektur

- genauen Mechanismus zur Verschlüsselung und Speicherung von Anmeldeinformationen;
- CommonJS- versus ESM-Adapterausgabe nach Generator- und SDK-Kompatibilitäts-PoC;
- eingefrorener Objektbaum und generisches Befehlsschema;
- Streaming-Prozess-/Ressourcenbeschränkungen und FFmpeg-Richtlinie;
- API externer Anbieter, Autorisierung, Deep-Linking und Lebenszyklusrichtlinie;
- Besitz- und Synchronisierungssemantik für Gruppen mit mehreren Räumen;
- Apple Music-Autorisierungsablauf, geeignet für ioBroker Admin;
- direkte zukünftige Alexa-Backend-Integration versus separate Adapterintegration.