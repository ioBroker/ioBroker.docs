---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md
title: ADR 0014: Vertrag über vorübergehende HomePod-Verbindung und -Steuerung
hash: skO8nT6hDyPcUbotb8frDVM1Bkd/sOTfegoBnbLFxS4=
---
# ADR 0014: Vertrag über vorübergehende HomePod-Verbindung und -Steuerung

- Status: Zur Umsetzung angenommen; Management gemäß ADR 0015 geändert; Validierung am realen Gerät ausstehend
- Datum: 02.09.2026

## Kontext

Der Adapter klassifiziert bereits AirPlay-Anfragen für HomePod und HomePod mini, zeigt aber nur die Anzahl der Anfragen und eine temporäre Administratorübersicht an. Der Entwickler besitzt derzeit keine HomePod-Hardware. Die erste Implementierung muss daher für öffentliche, freiwillige Tests geeignet sein, ohne die Funktionsfähigkeit eines ungetesteten Modells oder einer ungetesteten Softwareversion zu garantieren.

Die festgesteckte `@basmilius/apple-sdk@0.13.4` enthüllt `HomePod` Und `HomePodMini` Geräte, die die temporäre AirPlay-Kopplung nutzen. Das SDK benötigt weder eine PIN noch dauerhafte HomePod-Anmeldeinformationen und bietet per Push-Benachrichtigung Status-, Wiedergabe- und Lautstärkeregelung. `pyatv` Die Referenz beschreibt unabhängig davon die Fernbedienung des HomePod über eine kurzzeitige AirPlay-Kopplung ohne gespeicherte Anmeldeinformationen.

## Entscheidung

Bieten Sie nur dann einen verwaltbaren HomePod-Kandidaten an, wenn ein Erkennungsscan alle folgenden Ergebnisse liefert:

- ein AirPlay-Dienst mit dem erwarteten DNS-SD-Diensttyp;
- ein passendes Modell `AudioAccessory<major>,<minor>`;
- eine eindeutige, standardisierte 12-stellige AirPlay-Geräte-ID.

Erstellen Sie unten das entsprechende Objekt. `devices.homepod.<stableDeviceId>` und beginnt seine vorübergehende Sitzung erst nach expliziter aktiver Annahme gemäß ADR 0015.

Der öffentliche Pfad verwendet Kleinbuchstaben im Hexadezimalformat. Anzeigename, Netzwerkadresse, Port, Hostname, Dienstreihenfolge und öffentlicher Schlüssel bestimmen niemals den dauerhaften Objektpfad. HomePod mini bleibt im Netzwerk. `homepod` Diese Klasse unterscheidet sich nur durch ihr angegebenes Modell.

Die HomePod-Verbindung nutzt bei jeder neuen AirPlay-Protokollsitzung eine automatische, temporäre Kopplung. Es findet keine PIN-Abfrage statt und es werden keine HomePod-Anmeldeinformationen gespeichert. Öffentliche Kopplungsstatus dienen ausschließlich der Diagnose und sind lesbar. `pairing.mode` Ist `transient` Und `pairing.status` Ist `idle`, `pairing`, `paired`, oder `error` Die

Der anfängliche gerätespezifische, schreibgeschützte Zustandsvertrag lautet:

| Staatszusatz              | Typ             | Rolle                     | Bedeutung                                                                    |
| ------------------------- | --------------- | ------------------------- | ---------------------------------------------------------------------------- |
| `info.name`               | Zeichenkette    | `info.name`               | Letzter Anzeigename                                                          |
| `info.type`               | Zeichenkette    | `text`                    | Konstante `homepod`                                                          |
| `info.model`              | Zeichenkette    | `info.hardware`           | Das zuletzt gemeldete Modell                                                 |
| `info.deviceId`           | Zeichenkette    | `text`                    | Stabile normalisierte Protokoll-ID                                           |
| `info.lastSeen`           | Nummer          | `value.time`              | Letzter erfolgreicher Scan mit dem HomePod                                   |
| `discovery.available`     | boolescher Wert | `indicator`               | Im neuesten erfolgreichen Scan vorhanden                                     |
| `services.airplay`        | boolescher Wert | `indicator`               | Der AirPlay-Dienst wurde in diesem Scan beworben.                            |
| `services.raop`           | boolescher Wert | `indicator`               | Beworbener korrelierter RAOP-Dienst                                          |
| `connection.state`        | Zeichenkette    | `text`                    | Normalisierter Verbindungslebenszyklus                                       |
| `connection.online`       | boolescher Wert | `indicator.connected`     | Nutzbare temporäre AirPlay-Sitzung                                           |
| `connection.lastError`    | Zeichenkette    | `text`                    | Fehlercode für stabiles Projekt                                              |
| `pairing.mode`            | Zeichenkette    | `text`                    | Konstante `transient`                                                        |
| `pairing.status`          | Zeichenkette    | `text`                    | Nicht-geheime transiente Paarungsphase                                       |
| `capabilities.playback`   | boolescher Wert | `indicator`               | Mediensteuerungsprotokoll beworben und nutzbar                               |
| `capabilities.nowPlaying` | boolescher Wert | `indicator`               | Push-Status-Sitzung nutzbar                                                  |
| `capabilities.volume`     | boolescher Wert | `indicator`               | Aktuell verfügbare Lautstärkeregelung und -steuerung                         |
| `nowPlaying.title`        | Zeichenkette    | `media.title`             | Aktueller Titel oder leerer                                                  |
| `nowPlaying.artist`       | Zeichenkette    | `media.artist`            | Aktueller Künstler oder leer                                                 |
| `nowPlaying.album`        | Zeichenkette    | `media.album`             | Aktuelles Album oder leer                                                    |
| `nowPlaying.duration`     | Nummer          | `value.interval`          | Dauer in Sekunden                                                            |
| `nowPlaying.position`     | Nummer          | `value.interval`          | Position in Sekunden                                                         |
| `nowPlaying.isPlaying`    | boolescher Wert | `media.state`             | Aktuelle Wiedergabe-Markierung                                               |
| `volume.available`        | boolescher Wert | `indicator`               | Aktuelle Verfügbarkeit                                                       |
| `volume.level`            | Nummer          | `value` /`level.volume`   | Volumen von 0 bis 100; erst nach Erreichen der Volumenkapazität beschreibbar |
| `volume.muted`            | boolescher Wert | `media.mute`              | Aktueller Stumm-Zustand                                                      |
| `lastCommand.*`           | Skalar          | bestehende Ergebnisrollen | Letzter akzeptierter Befehl und stabiles Ergebnis                            |

Nachdem der angeschlossene Receiver die Unified Media Control- oder Hangdog-Fernbedienungssteuerung gemeldet hat, wird ein boolescher Wert erstellt. `button` Staaten unten `playback` für `play`, `pause`, `playPause`, `stop`, `next`, Und `previous` Sobald Volumen verfügbar ist, machen Sie `volume.level` Und `volume.muted` beschreibbar. Eingehende Befehle verwenden `ack=false`; bestätigte Status- und Befehlsergebnisschreibvorgänge verwenden `ack=true` Befehle werden pro HomePod serialisiert und prüfen vor der Ausführung erneut die aktuelle Verbindung und die Fähigkeiten. Numerische Lautstärkeänderungen sind endliche Werte von 0 bis 100 und werden in den SDK-Bereich von 0 bis 1 konvertiert. Boolesche Stummschaltungsbefehle werden explizit dem Stummschalten oder Aufheben der Stummschaltung zugeordnet.

Aktive verwaltete HomePod-Objektstämme bleiben erhalten, wenn eine spätere erfolgreiche Erkennung sie nicht enthält. Erkennung, Verbindung, Kopplung, Dienste und Funktionen werden als nicht verfügbar markiert und der temporäre Wiedergabestatus gelöscht. Eine fehlgeschlagene Erkennung löscht die vorherige erfolgreiche Beobachtung nicht. Beim erneuten Erscheinen wird der nicht dauerhafte Endpunkt aktualisiert und eine neue temporäre Sitzung gestartet. Passive oder gelöschte Geräte haben keinen individuellen Stamm oder keine Sitzung. Bei unerwartetem Verbindungsverlust wird auf den nächsten begrenzten Erkennungs-/Wiederverbindungszyklus gewartet; das Entladen bricht die Erkennung ab, führt keine weiteren Aktionen aus, entfernt Listener und trennt alle Sitzungen.

Das Debug-Logging erfasst bereinigte Lebenszyklusphasen, eine verkürzte Gerätereferenz, das gemeldete Modell, die Dienstpräsenz, die Kopplungsphase, boolesche Werte für die Fähigkeiten, den Befehlsnamen, den normalisierten Nicht-Inhaltsstatus und den stabilen Fehlercode bzw. die Fehlerklasse. Es darf keine Namen, Adressen, Ports, Hostnamen, TXT-Einträge, Rohdaten von Discovery-Objekten, URLs, PINs, Anmeldeinformationen, Token, Schlüssel, Coverbilder, Titel, Interpreten, Alben oder Rohdaten von Upstream-Fehlern protokollieren.

## Konsequenzen

Öffentliche Tester können Erkennung, automatisches, temporäres Pairing, Verbindung, Push-Status, Wiedergabebefehle und Lautstärke überprüfen, ohne ein HomePod-Geheimnis zu erhalten oder zu verarbeiten. Stabile Objektpfade bleiben auch nach Umbenennung, DHCP-Änderungen, Portänderungen, Neustart des Adapters und vorübergehender Abwesenheit erhalten.

Die Implementierung ist bewusst eine ungeprüfte Vorschau. Sie darf erst dann als hardwarekompatibel bezeichnet werden, wenn Ergebnisse mit HomePod-Modell, Softwareversion, Erkennungsnachweisen, Verbindungsergebnis, jedem Befehl, Ereignisaktualisierungen, Wiederverbindung, Neustart und Entladungsbereinigung protokolliert wurden. Covergestaltung, direktes Audiostreaming, Stereopaar-Semantik, Multiroom-Gruppierung, Alarme, Gegensprechanlage, Siri und Home-Einstellungen sind von dieser Vereinbarung ausgenommen.

## Alternativen in Betracht gezogen

- Die Wiederverwendung des Apple TV PIN-Anmeldeverfahrens wurde abgelehnt, da HomePod eine temporäre Sitzung verwendet und das SDK dauerhafte Anmeldeinformationen dafür ignoriert.
- Die Erstellung von Geräteobjekten allein anhand des Modell- oder Anzeigenamens wurde abgelehnt, da beides keine dauerhafte Identität darstellt.
- Die Offenlegung jeder einzelnen SDK-Controller-Methode wurde abgelehnt, da der öffentliche Vertrag klein, auf bestimmte Fähigkeiten beschränkt und von Freiwilligen testbar bleiben muss.
- Das Warten auf lokal verfügbare Hardware wurde für diesen Meilenstein verworfen, da der gewählte Weg eine konservative, nicht verifizierte Vorschau plus eine öffentliche Testmatrix ist.

## Validierung

Unit- und Adaptertests müssen starke Identitätsprüfung, Klassenausschluss, temporäre Verbindungen ohne Speicherung von Anmeldeinformationen, fähigkeitsgesteuerte Objekte, Push-Projektion, Befehlsserialisierung, Volumenvalidierung, normalisierte Fehler, redigierte Diagnosen, Wiedererkennung, Abwesenheit, Neustart-Standardeinstellungen und Entladen abdecken. Die vollständige Qualitätsprüfung und die Matrix der unterstützten Node.js-Versionen sind vor der Veröffentlichung eines Release Candidates erforderlich. Die Validierung von HomePod steht noch aus.