---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md
title: Bewertung der vorgelagerten Quelle
hash: Dwmn1QkKLX33bsL1vvoXsGto2428zotCBcjkv/Ig1u0=
---
# Bewertung der vorgelagerten Quelle

Forschungs-Snapshot: 31.08.2026. Überprüfen Sie Versionen und Verhalten erneut, bevor Sie eine Abhängigkeit übernehmen oder aktualisieren.

ioBroker-Stand-der-Technik-Revalidierung: 03.09.2026. Bitte validieren Sie das Repository, die Registry und den Anforderungsstatus erneut, bevor Sie diesen Adapter an ein offizielles ioBroker-Repository übermitteln.

HomePod-API-Revalidierung: 02.09.2026. Der akzeptierte npm-Pin bleibt bestehen. `0.13.4` Es wurden keine Abhängigkeitsaktualisierungen vorgenommen. Sowohl die installierten Deklarationen als auch die Dokumentation des Upstream-Projekts geben Auskunft darüber, dass…`HomePod` /`HomePodMini` Automatisches temporäres Pairing, Push-Status, Wiedergabe und Lautstärke. `pyatv` Die Steuerung des HomePod per Fernbedienung über eine temporäre AirPlay-Kopplung wird unabhängig dokumentiert. Diese API-Beobachtungen rechtfertigen eine noch nicht verifizierte Implementierungsvorschau, jedoch keine Aussage zur Hardwarekompatibilität; siehe ADR 0014.

## Zusammenfassung

| Quelle                                        | Geprüfte Momentaufnahme                  | Lizenz            | Rolle in diesem Projekt                                                                                                       |
| --------------------------------------------- | ---------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `h2okopfmt/ioBroker.apple-tv`                 | begehen `eb7e8a5` (2026-02-22)            | MIT               | Angehaltener, unveröffentlichter ioBroker-Entwurf; nur Stand der Technik-Recherche                                            |
| ioBroker AdapterRequests Problem 909          | Geöffnet ab dem 03.09.2026               | n / A             | Rekordnachfrage nach Apple TV-Medieninformationen in Visualisierungen                                                         |
| `basmilius/apple-protocols`                   | source commit `5e41636`; npm SDK `0.13.4` | MIT               | Bevorzugte TypeScript-Protokollgrundlage, hinter unserer Fassade                                                              |
| `basmilius/homey-apple`                       | begehen `04f51a6`, Etikett `v1.8.0`       | GPL-3.0           | Nur als Verhaltens-/Lebenszyklusreferenz; Code nicht kopieren                                                                 |
| `postlund/pyatv`                              | begehen `b277a4c`, freigeben `0.18.0`     | MIT               | Ausgereiftes Protokoll und Funktionsreferenz; kein Standard-Sidecar                                                           |
| `BewhiskeredBard/homebridge-alexa-player`     | begehen `33a5248` (2023)                  | MIT               | Alexa dient lediglich als historischer Referenzwert; für die Wiedergabe von Apple Music ist dies kein ausreichender Nachweis. |
| Apple Music API / MusicKit                    | offizielle aktuelle Dokumentation        | Apple-Begriffe    | Offizieller Katalog und Schnittstelle für Abonnentendaten                                                                     |
| ioBroker-Entwickler-/Repository-Dokumentation | offizielle aktuelle Dokumentation        | projektspezifisch | Grundgerüst, Test, Metadaten und Veröffentlichungsanforderungen                                                               |

## Bestehende ioBroker-Landschaft

Der Test vom 03.09.2026 umfasste GitHub-Repositories, die npm-Registry, die offiziellen Listen der neuesten und stabilen Repositorys von ioBroker sowie ioBroker selbst. `AdapterRequests` und eine gezielte Suche im ioBroker-Forum.

### `h2okopfmt/ioBroker.apple-tv`

Das öffentliche, unter der MIT-Lizenz stehende Repository ist der bisher bekannteste Versuch, ioBroker weiterzuentwickeln. Die zugehörige README-Datei gibt derzeit an, dass die Entwicklung unvollständig und pausiert ist. Der geprüfte Snapshot des Standardzweigs enthält einen umfangreichen JavaScript-Entwurf, jedoch kein Testverzeichnis und keinen GitHub-Actions-Workflow. Er wird nicht veröffentlicht als `iobroker.apple-tv` auf npm oder in den offiziellen ioBroker latest/stable-Repositories gelistet.

Die Umsetzungsrichtung unterscheidet sich ebenfalls wesentlich von diesem Projekt. Es unterstützt austauschbare `pyatv` Und `node-appletv-x` Backends können Python-/Systempakete von der Adapterlaufzeit aus installieren, bieten anbieterspezifische TV-Streaming-Integrationen und ermöglichen eine adressbasierte Geräteidentitäts-Fallback. Dieses Projekt hingegen verwendet eine reine TypeScript-Standardlaufzeitumgebung, bindet das ausgewählte Protokoll-SDK an projekteigene Schnittstellen, installiert niemals Systempakete zur Laufzeit, leitet dauerhafte Identitäten aus Protokollnachweisen ab, speichert Kopplungs-Credentials in einem verschlüsselten, instanzbezogenen Speicher und behandelt das ioBroker-Objektmodell als getesteten öffentlichen Vertrag.

Die Einbringung des angestrebten einheitlichen Apple-Mediendesigns in diesen Entwurf würde den Austausch der Adapteridentität, des öffentlichen Vertrags, des Abhängigkeits-/Laufzeitmodells, der Persistenz und großer Teile der Architektur erfordern, anstatt eine schrittweise, abgestimmte Implementierung zu erreichen. Die Beibehaltung der Unabhängigkeit `ioBroker.apple` Das Projekt ist daher gerechtfertigt. Keine Quelle von `h2okopfmt/ioBroker.apple-tv` wurde kopiert, angepasst, übersetzt oder von anderen Anbietern vertrieben; das Repository wurde nur auf Überschneidungen und Herkunft geprüft.

Quelle: <https://github.com/h2okopfmt/ioBroker.apple-tv>

### Anfragen und angrenzende Adapter

Das Ticket Open AdapterRequests 909 fragt nach Apple TV-Medieninformationen für ioBroker-Visualisierungen. Der angeforderte Metadaten-Anwendungsfall überschneidet sich mit dem geplanten und teilweise implementierten Now Playing-Vertrag und liefert relevante Nachfragenachweise; es wird jedoch weder eine Implementierung noch ein bestehender Adapter zur Erweiterung definiert. Die Anfrage sollte erneut geprüft werden, sobald dieses Repository für öffentliche Tests bereit ist.

Veröffentlichte Pakete wie z.B. `iobroker.apple-device-finder` Und `iobroker.icloud` Diese Dokumentation deckt die Anwendungsfälle für iCloud/Meine Identität suchen und Standort ab, nicht jedoch die lokale Apple TV-Medienerkennung, Kopplung, Steuerung oder HomePod-/AirPlay-Steuerung. (Die separat veröffentlichte Dokumentation) `@sebbo2002/pyatv-mqtt-bridge` Stellt pyatv über MQTT bereit und ist weder ein ioBroker-Adapter noch ein Ersatz für einen nativen getesteten Objektvertrag.

Die offiziellen Repository-Listen von ioBroker (neueste/stabile Version) enthielten zum Zeitpunkt dieser Überprüfung keinen Apple TV Media-Adapter. Eine gezielte API-Suche im Forum ergab keinen entsprechenden Support- oder Testthread. Diese Ergebnisse rechtfertigen die eigenständige Weiterführung des Projekts, sind aber eher zeitkritisch als ein Beweis dafür, dass keine anderen Bemühungen existieren.

Quellen:

- <https://github.com/ioBroker/AdapterRequests/issues/909>
- <https://www.npmjs.com/package/iobroker.apple-device-finder>
- <https://www.npmjs.com/package/iobroker.icloud>
- <https://www.npmjs.com/package/@sebbo2002/pyatv-mqtt-bridge>
- <https://github.com/ioBroker/ioBroker.repositories>
- <https://forum.iobroker.net/>

## `basmilius/apple-protocols`

Das Monorepo enthält separate Pakete für Kodierung, Verschlüsselung, gemeinsame Erkennung/Kopplung/Speicherung, RTSP, AirPlay, Companion Link, RAOP, Audioquellen und ein High-Level-SDK. Das SDK stellt Apple TV- und HomePod-Geräteklassen sowie Controller für Fernbedienungseingabe, Wiedergabe, Lautstärke, Medien, Status, Coverbilder, Multiroom, Apps, Konten, Ein-/Ausschalten, Tastatur und Systemfunktionen bereit.

Bestätigte Stärken:

- TypeScript/Node-Implementierung mit ESM npm-Paketen;
- AirPlay- und Begleitererkennung sowie HAP-basierte Kopplung;
- Apple TV und vorübergehende HomePod-Verbindungen;
- typisierte Push-Ereignisse für Aktuelle Wiedergabe, Wiedergabe, Lautstärke, Coverbild, aktive App, unterstützte Befehle und Clusteränderungen;
- Steuerungen für den geplanten Hauptfunktionsumfang;
- Abstraktionen lokaler Audioquellen und RAOP/AirPlay-Streaming;
- MIT-Lizenz und veröffentlichte npm-Pakete.

Erkenntnisse, die unser Design beeinflussen:

- npm `@basmilius/apple-sdk@0.13.4` Es ist ausschließlich ESM-kompatibel und deklariert keinen Node.js-Engine-Bereich. Dynamischer Import aus kompiliertem CommonJS und isolierte lokale Erkennung wurden unter Node 22.23.2 und 24.20.0 auf macOS sowie unter Node 22.23.2 auf Linux erfolgreich durchgeführt. `aarch64` ADR 0007 übernimmt es und `@basmilius/apple-common@0.13.4` als exakte Laufzeitabhängigkeiten der Version 0.1; das vollständige Laufzeitverhalten von ioBroker bleibt eine Voraussetzung für die Freigabevalidierung.
- Das veröffentlichte SDK-Tarball deklariert die MIT-Lizenz, lässt aber die zugehörige Lizenz aus. `LICENSE` Datei. Die gezogene Datei. `apple-rtsp` Das Artefakt tut dies ebenfalls. `THIRD_PARTY_NOTICES.md` Dieser Artefakt-Hinweis wird protokolliert und ist im Paket enthalten; Aktualisierungen der Abhängigkeiten erfordern eine erneute Lizenzprüfung.
- Der überprüfte Quellcode-Branch verwendet eine Platzhalterversion für die Veröffentlichungszeit. `0.0.0` in Workspace-Paketen; die npm-Version ist die Referenz für die Übernahme.
- Die SDK-Erkennung fragt AirPlay und Companion Link ab und korreliert die Ergebnisse anhand der IP-Adresse. Die IP-Adresse ist für unsere dauerhafte Geräteidentität nicht stabil genug.
- `DiscoveredDevice.services` Beinhaltet RAOP, aber das überprüfte SDK `discover()` Die Implementierung führt nicht zu Ergebnissen im Rahmen des RAOP-Programms.
- Die SDK-Discovery-API hat kein Timeout oder `AbortSignal` Es führt nacheinander AirPlay- und Companion-Link-Scans von jeweils etwa vier Sekunden Dauer durch. Der temporäre PoC-Worker kann sicher beendet werden, dies beweist jedoch nicht die vollständige Bereinigung des Adapters.
- Das niedrige Niveau `Discovery.discoverAll()` Es wird eine parallele, vier Sekunden dauernde Abfrage für AirPlay, Companion Link und RAOP durchgeführt. Der zugehörige Collector kann auch nicht verwandte mDNS-Dienste zurückgeben, und die Zusammenführung der Daten im Upstream-Prozess verwendet den Namen jeder Dienstinstanz als deren ID. Unser PoC validiert daher den tatsächlichen DNS-SD-Typ, verwirft leere/nicht verwandte Ergebnisse und führt eine eigene Korrelation durch.
- Die überprüften Apple-TV-Ergebnisse lieferten übereinstimmende Identitätsnachweise für die AirPlay-Geräte-ID, die Companion-Kopplungsidentität, das RAOP-Instanzpräfix und den öffentlichen AirPlay/RAOP-Schlüssel. Die projektinterne Korrelation verwendet diese Werte und nutzt niemals IP-Adresse oder Anzeigenamen als dauerhafte Identität.
- `createDevice()` fällt zurück auf `HomePod` Für unbekannte Gerätetypen muss unser Adapter diese explizit klassifizieren und unbekannte Geräte sicher abweisen bzw. darstellen.
- Das SDK legt eine globale `storage` Konfigurations- und Speicherklassen werden zwar verwendet, der überprüfte übergeordnete Kopplungs-/Verbindungsablauf lädt/speichert Anmeldeinformationen jedoch nicht automatisch darüber. Der Adapter verfügt über explizite Persistenz.
- Wiederherstellungsoptionstypen und ein generisches `ConnectionRecovery` Es gibt zwar Hilfsprogramme, aber der übergeordnete Geräteverbindungsprozess gewährleistet keine durchgängige Wiederherstellung. Die erneute Erkennung und die Orchestrierung der Wiederverbindung obliegen dem Adapter.
- Apple TV AirPlay und die optionale Companion Link-Funktion haben unterschiedliche Status. Ein Companion Link-Fehler wird während der Verbindungsherstellung als optional erkannt, daher darf unser öffentliches Online-/Degraded-Modell nicht beide Protokolle zu einem einzigen booleschen Wert zusammenfassen.
- Es gibt zwar Multi-Room-Methoden, aber für die Gruppenerkennung, die Stabilität der Ausgabe-UID, das Timing, die Synchronisation, die Fehlerbehebung und die Verwendung gemischter Empfänger ist weiterhin ein Proof of Concept (PoC) mit realen Geräten erforderlich.

Einführungsregel: Das SDK in eine eigene, schlanke Backend-Schnittstelle einbetten. SDK-Typen weder im ioBroker-Objektvertrag noch in den Anwendungsdiensten offenlegen.

Der aufgezeichnete Erkennungs-Checkpoint fand lokale Kandidaten auf macOS, wobei die Anzahl der Kandidaten in fünf Durchläufen zwischen 9 und 12 schwankte und die meisten als … klassifiziert wurden. `unknown` und lieferte keinen RAOP-Dienst zurück. Siehe `docs/poc/apple-sdk-discovery-0.13.4.md` Diese Ergebnisse wurden auf einem Linux-aarch64-Testsystem reproduziert, wobei die Anzahl der Kandidaten und Dienste ebenfalls variierte und die Apple-TV-Klassifizierung zeitweise fehlschlug. Dies ist lediglich ein Teilerfolg und rechtfertigt keine Implementierung in der Laufzeitumgebung.

Der anschließende, vom Projekt entwickelte Low-Level-Pfad bestand zehn aufeinanderfolgende Linux-aarch64-Scans in Konfigurationen mit einem und zwei Apple TVs. Ein getestetes Apple TV bestand außerdem die PIN-Kopplung, die PoC-basierte Speicherung der Anmeldeinformationen (nur für den Besitzer), das Neuladen neuer Prozesse, fünf neue AirPlay-Plus-Companion-Verbindungen, minimierte Statusabfragen, einen Remote-HID-Befehl, ausgelöste Ereignisse wie „Ein/Aus“, „Aktuelle Wiedergabe“ und „Aktive App“ sowie die Prozessbereinigung. Die 17 Tests umfassende Suite inklusive des tatsächlichen Neuladens der Anmeldeinformationen wurde unter Linux ebenfalls erfolgreich getestet. `aarch64` Unter Node.js 24 sind ein drittes verfügbares Apple TV, zusätzliche Medienereignistypen, die Wiederherstellung nach unerwartetem Datenverlust, tatsächliche Adress-/Portänderungen und die direkte Bereinigung beim Entladen des Adapters noch nicht verifiziert. Diese Ergebnisse akzeptieren zwar die eingeschränkte Apple-TV-Funktionalität, rechtfertigen aber nicht, das SDK-Verhalten direkt als öffentlichen Adaptervertrag offenzulegen.

Quelle: <https://github.com/basmilius/apple-protocols>

## `basmilius/homey-apple`

Dies ist das relevanteste Beispiel für die Einbettung des TypeScript SDK in eine Smart-Home-Laufzeitumgebung. Der Quellcode zeigt Muster, die wir in unserer eigenen Implementierung nachbilden müssen:

- Plattformerkennung plus Unicast-Wiedererkennung;
- Korrelation anhand gespeicherter MAC-Adressen bei Änderungen von mDNS-Kennungen oder Caches;
- schrittweise PIN-Kopplung und explizite Serialisierung der Anmeldeinformationen;
- unabhängige AirPlay- und Companion Link-Wiederherstellung;
- begrenzte schnelle Erholung, gefolgt von langsameren Wiederholungsversuchen;
- Ereignisweiterleitung an Plattformfunktionen;
- Bereinigung von Wiederherstellungstimern, Protokollsitzungen und Ereignislogik beim Entladen.

Das Repository steht unter der GPL-3.0. Wir dürfen das beobachtbare Verhalten und die Architektur untersuchen, dürfen aber die Implementierung nicht ohne eine ausdrückliche Vereinbarung über eine kompatible Lizenz in einen anders lizenzierten Adapter kopieren.

Quelle: <https://github.com/basmilius/homey-apple>

## `postlund/pyatv`

`pyatv` ist die ausgereifte Vergleichsbasis. Sie modelliert mehrere Dienste pro Gerät, basiert auf Zeroconf, da sich Adressen und Ports ändern können, speichert Anmeldeinformationen pro Protokoll, wählt ein geeignetes Protokoll pro Funktion aus und stellt Listener-/Push-Updater-Schnittstellen bereit.

Das unterstützte Protokollmodell und die zugehörigen Tests sind wertvoll für die Validierung von Erkennung, Kopplung, Funktionsverfügbarkeit, Ausgabegeräten, AirPlay/RAOP-Streaming und Metadatensemantik. Python wurde nicht als Laufzeitumgebung gewählt: Ein Sidecar verursacht zusätzliche Kosten für Installation, Lebenszyklus, IPC, Aktualisierung, Sicherheit und Kompaktmodus. Es bleibt nur dann eine Ausweichlösung, wenn eine dokumentierte TypeScript-Lücke einen erforderlichen Meilenstein blockiert.

Quelle: <https://github.com/postlund/pyatv>

## Alexa-Referenzen

Die Rezension `homebridge-alexa-player` Der Quellcode ist alt, eindeutig vor Version 1.0, und verwendet `alexa-remote2` mit Cookie-/Proxy-Authentifizierung. Es unterstützt grundlegende Spielerfunktionen und deklariert einen `playMusicProvider` Die API ist zwar vorhanden, ihre eigene Implementierung erweist sich jedoch nicht als zuverlässig für die gezielte Suche/Wiedergabe von Apple Music auf Echo Show.

Folgen:

- Alexa bleibt ein zukünftiges Backend hinter der generischen Benutzeroberfläche des Players.
- Authentifizierung/Cookie-Sicherheit, Änderungen bei Amazon, Anbieter-IDs, Anfragesemantik, Kontoregion und das Verhalten von Echo Show erfordern einen neuen, isolierten Spike.
- Es gibt keine Alexa-Abhängigkeit im Kern des Apple-Geräts.
- Eine separate Adapterintegration ist möglicherweise der Einbettung inoffizieller Amazon-Web-APIs vorzuziehen; die Entscheidung darüber trifft ADR nach dem Spitzenwert.

Quelle: <https://github.com/BewhiskeredBard/homebridge-alexa-player>

## Apple Music API und MusicKit

Die offizielle Dokumentation bestätigt, dass abonnentenspezifische Anfragen neben einem Entwicklertoken auch ein Musikbenutzertoken erfordern. Endpunkte für kürzlich abgespielte Titel und Empfehlungen sind vorbehaltlich der Autorisierungs- und Ressourcentypregeln verfügbar. MusicKit verwaltet Musikbenutzertoken für unterstützte Apple-/Web-App-Abläufe.

Die APIs liefern Metadaten zu Katalog, Bibliothek, Verlauf, Empfehlungen und Coverbildern; sie erzeugen keinen allgemeinen DRM-freien Audiostream zur Weiterleitung über AirPlay. Autorisierung, Katalognavigation und Wiedergabesteuerung bleiben daher separate Module.

Quellen:

- <https://developer.apple.com/documentation/applemusicapi>
- <https://developer.apple.com/documentation/applemusicapi/user-authentication-for-musickit>
- <https://developer.apple.com/documentation/musickit>

## ioBroker Baseline

Die offiziellen ioBroker-Richtlinien schreiben vor, den aktuellen Adapter-Ersteller zu verwenden und keinen alten Adapter zu kopieren. Die Aufnahme in ein öffentliches Repository erfordert die korrekte Benennung des Repositorys/npm-Pakets, eine Administratorkonfiguration, eine englische README-Datei, eine Lizenz, gültige Statusrollen, Paket- und Integrationstests in GitHub Actions, die Veröffentlichung auf npm sowie die Einhaltung der Adapter-Checker-Vorgaben.

Die aktuelle Dokumentation zur Kompatibilität von js-controller unterstützt Node 22 und 24 in den entsprechenden Zeilen für moderne Controller. Unsere genauen Mindestanforderungen stehen erst nach der Überprüfung des SDK-PoC und der generierten Vorlage fest.

Quellen:

- <https://github.com/ioBroker/create-adapter>
- <https://github.com/ioBroker/ioBroker.repositories>
- <https://github.com/ioBroker/ioBroker.js-controller>

## Erforderliche Nachweise vor der Adoption

1. Installieren Sie veröffentlichte SDK-Pakete in einem generierten ioBroker-Adapter.
2. Kompilieren und starten Sie unter Node.js 22 und 24 auf Linux.
3. Überprüfen Sie den ESM-Import/die Bündelung sowie den Inhalt des npm-Pakets.
4. Ein Apple TV wird auch nach Neustarts und Adress-/Portänderungen wiederholt erkannt.
5. Anmeldeinformationen koppeln, serialisieren, verschlüsseln/speichern, neu laden und erneut verbinden.
6. Überprüfen Sie explizit den Zustand und die Bereinigung von AirPlay und Companion Link.
7. Übungsbefehle und Push-Ereignisse ausführen.
8. Stellen Sie sicher, dass keine Listener, Sockets, Timer, Timing-Server oder Streams den Entladevorgang überstehen.
9. Tragen Sie die Upstream-Versionen und Details zum realen Gerät/Betriebssystem in die Kompatibilitätsmatrix ein.