---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tractive-gps/README.md
title: ioBroker.tractive-gps
hash: g8VrbNDoLmYPA1H3vfwazDDbJcw04EbwgBpnmQO0HsA=
---
![Logo](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)
![Downloads](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tractive-gps-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tractive-gps-installed.svg)

# IoBroker.tractive-gps
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>

**Version:**

## Haftungsausschluss
Alle in diesem Projekt erwähnten Produkt- und Firmennamen, Logos und Marken gehören ihren jeweiligen Eigentümern. Tractive und die zugehörigen Namen, Logos und Marken sind Eigentum der Tractive GmbH oder ihrer jeweiligen Eigentümer. Ihre Verwendung dient ausschließlich der Identifizierung und impliziert keine Zugehörigkeit zu, Unterstützung durch oder Empfehlung seitens der Tractive GmbH oder ihrer verbundenen Unternehmen. Dies ist ein privates, nicht-kommerzielles Projekt, das zu Freizeitzwecken entwickelt wurde.

## Wächter
**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Anweisungen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Verwendung der Sentry-Berichterstattung beginnt mit js-controller 3.0.

## Beschreibung
Der Adapter verbindet ioBroker mit einem Tractive-Konto und stellt aktuelle Informationen zu Haustieren und GPS-Trackern als ioBroker-Status bereit. Dadurch können Standorte, Akkustände, Verbindungsstatus, Haustierinformationen und unterstützte Tracker-Funktionen in Automatisierungen und Visualisierungen genutzt werden.

Der Adapter nutzt eine inoffizielle Schnittstelle zum Tractive-Dienst. Ein funktionierendes Tractive-Konto und ein aktives Abonnement für die Tracker sind erforderlich. Dieser Community-Adapter steht in keiner Verbindung zu Tractive und wird von Tractive weder unterstützt noch gefördert.

> [Deutsche Dokumentation](README_DE.md)

## Anforderungen
- Node.js 22.13 oder neuer
- js-controller 7.2.2 oder neuer
- Admin 7.8.23 oder neuer
- VIS 1 oder VIS 2 Version 2.12.8 oder neuer, bei Verwendung eines enthaltenen Widgets
- Ein Tractive-Konto mit mindestens einem zugehörigen Tracker

## Merkmale
- Ruft die tatsächlichen Namen und Details der mit dem Konto verknüpften Haustiere ab.
- Liefert die aktuellen GPS-Koordinaten, die Höhe, die Geschwindigkeit, die Positionsgenauigkeit, die Entfernung vom konfigurierten ioBroker-Standort und den Zeitpunkt der letzten Aktualisierung.
- Löst optional Koordinaten in eine lesbare Adresse auf.
- Zeigt den Akkustand, den Ladezustand, die verwendete Positionsquelle (`KNOWN_WIFI`/`GPS`), den Status "Zuhause/Abwesend", den Online-Status und den Energiesparstatus an.
- Liefert Modell, Firmware, Hardwareversion, Funktionen, Geschlecht, Geburtsdatum, Größe, Gewicht und weitere verfügbare Informationen.
- Unterstützt Live-Tracking, LED- und Summerbefehle, wenn der Tracker die entsprechende Fähigkeit meldet.
- Speichert alle abgerufenen Konto-, Abonnement-, Anteils-, Haustier-, Tracker-, Positions- und Hardwaredaten als logischen lokalen Zustandsbaum und als einen vollständigen JSON-Snapshot.
- Enthält responsive Karten für VIS 1 und VIS 2 mit einem Haustierbild, einer interaktiven Karte, einer Reichweitenanzeige, dem Tracker-Status und Bedienelementen.
- Unterstützt ein von Tractive bereitgestelltes Bild oder ein benutzerdefiniertes Bild, das auf ioBroker hochgeladen wurde.
- Erkennt fehlende oder veraltete Trackerdaten, ohne vorhandene Objekte automatisch zu löschen.

## Konfiguration
Öffnen Sie die Adapterinstanz und konfigurieren Sie die folgenden Einstellungen:

| Schauplatz | Beschreibung |
| --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| E-Mail | E-Mail-Adresse des Tractive-Kontos. |
| Passwort | Passwort des Tractive-Kontos. Es wird im standardmäßigen verschlüsselten Konfigurationsformat von ioBroker gespeichert. |
| Aktualisierungsintervall | Zeit zwischen regelmäßigen Positionsaktualisierungen. Werte zwischen 2 und 60 Minuten sind verfügbar. |
| Koordinaten in eine Adresse auflösen | Fordert eine lesbare Adresse für die aktuellen Koordinaten an. Deaktivieren Sie diese Option, wenn keine Adresse benötigt wird. |

Verwenden Sie **Verbindung testen**, um die eingegebenen Anmeldeinformationen zu überprüfen. Speichern Sie alle Einstellungen mit der üblichen ioBroker-Schaltfläche **Speichern** am unteren Rand der Konfigurationsseite.

Das Passwort bleibt unverändert, wenn das Passwortfeld nach dem Speichern der Konfiguration leer gelassen wird. Vorhandene Passwörter, die das ältere ioBroker-Verschlüsselungsformat verwenden, werden beim nächsten Speichern der Konfiguration in das aktuelle AES-Format konvertiert.

### Datenaktualisierungsplan
Die Positionen werden gemäß dem konfigurierten Aktualisierungsintervall aktualisiert.
- Informationen zu Akku und Hardware werden alle 15 Minuten aktualisiert.
- Haustierprofile, Bilder und andere statische Details werden bei der täglichen vollständigen Synchronisierung aktualisiert.
- Nach dem Start des Adapters wird außerdem eine vollständige Synchronisierung durchgeführt.

Tractive kann Anfragen vorübergehend mit HTTP 429 einschränken. Der Adapter speichert Anfragen in Pausen, pausiert alle Anfragen, sobald eine solche Einschränkung gemeldet wird, und versucht es automatisch erneut. Eine erfolgreiche Aktualisierung wird in `info.lastSuccessfulSync` und `info.dataFresh` angezeigt.

## Objekte und Zustände
Die wichtigsten Objekte sind wie folgt gruppiert:

```text
tractive-gps.0
├── info
│   ├── connection
│   ├── dataFresh
│   ├── lastSync
│   ├── lastSuccessfulSync
│   ├── currentApi
│   ├── refresh
│   └── status
├── account.*
├── subscriptions.<subscription-id>.*
├── pets.<pet-id>
│   ├── info.*
│   ├── activity.*
│   └── media.*
├── trackers.<tracker-id>
│   ├── info.*
│   ├── status.*
│   ├── location.*
│   ├── hardware.*
│   └── commands.*
```

### Adapterinformationen
- `info.connection`: Gibt an, ob die letzte Synchronisierung erfolgreich war.
- `info.dataFresh`: Gibt an, ob aktuell nutzbare Daten verfügbar sind.
- `info.lastSync`: Zeitpunkt des letzten Synchronisierungsversuchs.
- `info.lastSuccessfulSync`: Zeitpunkt der letzten erfolgreichen Synchronisierung.
- `info.refresh`: Schaltfläche zum manuellen Starten einer vollständigen Synchronisierung.
- `info.status`: Aktueller Adapterstatus.
- `info.currentApi`: Vollständiger JSON-Snapshot der aktuell verfügbaren Tractive-Daten.

### Haustiere
Die folgenden Zustände (`pets.<pet-id>.*`) enthalten nützliche Profilinformationen zum Haustier, die Tracker-Zuordnung, Aktivitätsziele und das Profilbild. Leere Felder und interne API-Felder werden nicht angezeigt.

### Tracker
Die folgenden Zustände (`trackers.<tracker-id>.*`) enthalten die Tracker-Identifikation, den Betriebs- und Online-Status, die Position, die Positionsquelle, die Entfernung zum ioBroker-Systemstandort, die Adresse, Batterieinformationen und unterstützte Befehle. `location.sensorUsed` enthält die Tractive-Positionsquelle. `status.home` wird von `KNOWN_WIFI` oder `GPS` abgeleitet. Der Zustand `connectionType` ist nicht vorhanden. Die geografische Breite und Länge des ioBrokers werden in den Systemeinstellungen konfiguriert.

### Vollständige API-Daten
Nur für Skripte, Automatisierungen und Visualisierungen relevante Werte werden als separate Zustände angelegt. Leere Werte, API-Metadaten, interne Versionsfelder und doppelte Darstellungen werden entfernt. Die vollständige, unveränderte kombinierte Antwort bleibt als ein einziger JSON-Wert in `info.currentApi` verfügbar. Anmeldekennwörter und Zugriffstoken werden ihr niemals hinzugefügt.

## Tracker-Befehle
Die folgenden beschreibbaren Zustände werden nur dann erstellt, wenn sie vom ausgewählten Tracker unterstützt werden:

- `trackers.<tracker-id>.commands.liveTracking`
- `trackers.<tracker-id>.commands.led`
- `trackers.<tracker-id>.commands.buzzer`

Setzen Sie den gewünschten Zustand auf `true` oder `false`. Der Zustand wird bestätigt, nachdem Tractive den Befehl angenommen hat.

## VIS-Widgets
Der Adapter enthält ein klassisches `PetTrackerCard` für VIS 1 und ein natives React `PetTrackerCard` für VIS 2. Fügen Sie für jedes Haustier oder jeden Tracker ein Widget hinzu und weisen Sie die gewünschten Zustände in den Widget-Einstellungen zu.

Die Karte kann Folgendes anzeigen:

- Name, Art, Geschlecht, Alter und Gewicht des Haustiers
- Name des Trackers und Online-Status,
- Haustierbild aus dem lokalen `media.localProfilePictureUrl`-Zustand,
- interaktive Leaflet/OpenStreetMap-Karte,
- gemeldeter oder manuell konfigurierter Positionsradius,
- Akkustand, Positionsquelle, Anwesenheits-/Abwesenheitsstatus und Entfernung von ioBroker,
- letzte Aktualisierung, Adresse, Energiesparmodus, Ladestatus, Geschwindigkeit, Höhe und Positionsgenauigkeit,
- Schalter für Summer, LED und Live-Tracking bei unterstützten Trackern.

Wählen Sie für das Tractive-Bild `pets.<pet-id>.media.localProfilePictureUrl` als Bildstatus aus. Dieser enthält die URL der im lokalen ioBroker-Dateispeicher abgelegten Kopie. Falls kein Bild zurückgegeben wird oder es nicht geladen werden kann, wählen Sie im Abschnitt **Darstellung** des Widgets ein benutzerdefiniertes Bild aus oder laden Sie es hoch.

Die Karte kann automatisch den gesamten Genauigkeits- oder Entfernungsbereich ausfüllen. Minimaler und maximaler Zoomfaktor, Interaktionsmöglichkeiten, Entfernungsmessquelle und ein manueller Radius lassen sich im Widget konfigurieren. Zum Anzeigen der Karte werden Kartenkacheln von OpenStreetMap heruntergeladen.

Um die Befehlsschalter zu verwenden, weisen Sie ihnen die entsprechenden Zustände `trackers.<tracker-id>.commands.*` im Abschnitt **Befehle** des Widgets zu. Befehle sind während der Bearbeitung der VIS-Ansicht deaktiviert und werden im Laufzeitmodus aktiviert.

## Datenschutz und Sicherheit
- Das Passwort wird mithilfe des verschlüsselten Konfigurationsmechanismus von ioBroker gespeichert.
- Zugriffstoken werden im Speicher gehalten und automatisch aktualisiert.
Ausgewählte Konto- und Abonnementinformationen werden im logischen Objektbaum gespeichert. Die vollständigen abgerufenen API-Daten werden lokal in `info.currentApi` gespeichert. Schützen Sie den Zugriff auf den ioBroker-Objektbaum entsprechend.
- Passwörter und Zugriffstoken werden niemals dem API-Statusbaum hinzugefügt und bleiben durch die verschlüsselte Konfiguration oder im Speicher geschützt.
- Genaue Positionen werden lokal in ioBroker-Zuständen gespeichert, da sie für den Zweck des Adapters erforderlich sind.
- Die umgekehrte Geokodierung ist optional und sendet, falls aktiviert, Koordinaten an den Adressdienst von Tractive.
- Die Fehlerberichterstattung von Sentry richtet sich nach der globalen ioBroker Sentry-Konfiguration.
- Die API-Antworttexte und der vollständige lokale Snapshot werden nicht in das Adapterprotokoll geschrieben oder explizit an Sentry übermittelt.

## Fehlerbehebung
- **Verbindungstest fehlgeschlagen:** Überprüfen Sie die E-Mail-Adresse, das Passwort, die Internetverbindung und den ausgehenden HTTPS-Zugriff.
- **Es werden keine Haustiere oder Tracker angezeigt:** Überprüfen Sie, ob die Tracker dem konfigurierten Tractive-Konto zugewiesen sind, und starten Sie dann die Adapterinstanz neu.
- **Daten wurden nicht aktualisiert:** Überprüfen Sie `info.status`, `info.dataFresh` und `info.lastSuccessfulSync`.
- **HTTP-Fehler 429 wird gemeldet:** Lassen Sie die Instanz aktiv. Der Adapter pausiert Anfragen und wiederholt sie automatisch, sobald das Transaktionslimit abgelaufen ist.
- **Es wird keine Adresse angezeigt:** Aktivieren Sie die umgekehrte Geokodierung in der Adapterkonfiguration.
- **Ein Befehl fehlt:** Der Tracker hat die erforderliche Fähigkeit nicht gemeldet.
- **Das Haustierbild fehlt:** Weisen Sie dem Widget `localProfilePictureUrl` zu oder wählen Sie ein benutzerdefiniertes Bild aus.

## Entwicklerdokumentation
Informationen für Mitwirkende finden Sie in [Entwicklerdokumentation](docs/DEVELOPMENT.md).

## Credits
Ursprünglich erstellt von [xXBJXx](https://github.com/xXBJXx) und gepflegt von der ioBroker Community Adapters Organisation.

## Changelog
### 3.1.0 (2026-08-25)

- (xXBJXx) Addressed repository-checker findings for dependencies, metadata, documentation, and adapter-managed timers (#319).
- (xXBJXx) Added and correctly registered a classic VIS 1 pet tracker card alongside the native VIS 2 widget, including the pet image, Leaflet map, location and tracker details, automatic theme colors, and tracker command controls.

### 3.0.0 (2026-08-24)

- (xXBJXx) BREAKING: rewritten for Node.js 22, js-controller 7.2.2, and Admin 8.
- (xXBJXx) Configured Sentry through ioBroker's adapter integration (#4).
- (xXBJXx) Replaced stored authorization data with in-memory authentication, automatic token renewal, request validation, retry handling, and account-wide rate limiting (#16, #115, #213, #231).
- (xXBJXx) Added the `pets.*`, `trackers.*`, and health object structures.
- (xXBJXx) Fixed pet names and added all available pet profile states with corrected height and weight units.
- (xXBJXx) Fixed missing state definitions for API fields that were not known in advance (#81, #113, #305; supersedes #114 and #175).
- (xXBJXx) Replaced the duplicate API hierarchy with a curated account, subscription, pet, tracker, position, and hardware state tree while retaining the complete JSON snapshot.
- (xXBJXx) Restored `sensor_used` and distance-from-ioBroker information based on PR #3, added home/away information, and removed the duplicate `connectionType` state.
- (xXBJXx) Fixed Tractive CDN profile-picture URLs and added home/away status and distance to the VIS 2 card.
- (xXBJXx) Cached Tractive profile pictures in ioBroker so VIS 2 can display CDN files delivered as binary downloads.
- (xXBJXx) Fixed profile-picture storage by using a dedicated ioBroker `meta` file container.
- (xXBJXx) Added the local profile-picture URL, textual charging state, speed, and altitude to the curated states and VIS 2 card.
- (xXBJXx) Fixed recognition of relative ioBroker file URLs in `localProfilePictureUrl`.
- (xXBJXx) Added live tracking, LED, and buzzer commands for supported trackers.
- (xXBJXx) Added buzzer, LED, and live-tracking controls to the VIS 2 card.
- (xXBJXx) Reorganized the VIS 2 card into compact command, location, tracker, and pet sections.
- (xXBJXx) Updated the release tooling and added fixed-version Lerna support for the private npm workspaces.
- (xXBJXx) Rebuilt the adapter configuration for Admin 8 and removed the invalid jsonConfig configuration (#176).
- (xXBJXx) Added the VIS 2 `PetTrackerCard` widget with pet image, Leaflet/OpenStreetMap map, range display, and tracker information.
- (xXBJXx) Added support for Tractive profile images and custom ioBroker images.
- (xXBJXx) Added automatic light and dark theme colors to the VIS 2 widget.
- (xXBJXx) Added configurable map interaction, automatic range fitting, and minimum and maximum zoom.
- (xXBJXx) Switched password storage to ioBroker's server-side AES encryption and automatic migration of older passwords.
- (xXBJXx) Reduced recurring API traffic and added separate update intervals for positions, battery information, and static profile data.
- (xXBJXx) Added adaptive HTTP 429 handling, global request pauses, conservative retries, and cached address lookup.
- (xXBJXx) Migrated linting to ESLint 9 and `@iobroker/eslint-config` (#45).
- (xXBJXx) Added Node.js 24 to the CI test matrix (#116).
- (xXBJXx) Migrated automated npm releases to Trusted Publishing with GitHub OIDC (#169).
- (xXBJXx) Updated repository metadata and schema configuration, superseding maintenance PRs #214, #215, #216, and #291.
- (xXBJXx) Updated dependencies and workspace tooling, superseding PRs #91, #140, #147, #203, #211, #220, #256, #281, #298, #301, and #303.
- (xXBJXx) Updated tests, documentation, and privacy safeguards.

### 2.1.0 (2024-11-12)

- (mcm1957) Adapter requires Node.js 20 now.
- (mcm1957) Adapter requires js-controller 5.0.19 and Admin 6.17.14 now.
- (simatec) Adapter changed to meet responsive design rules.
- (mcm1957) Corrected an error in the jsonConfig reauthorization command.
- (mcm1957) Dependencies have been updated.

### 2.0.1 (2024-08-20)

- (bluefox) Fixed encryption of the access token.

### 2.0.0 (2024-08-18)

- (bluefox) BREAKING: credentials must be entered again.
- (bluefox) Removed old code and rewrote the GUI.
- (bluefox) Updated dependencies.

Earlier changes are documented in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

Copyright (c) 2023-2026 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 xXBJXx <issi.dev.iobroker@gmail.com>

MIT License. See [LICENSE](LICENSE).