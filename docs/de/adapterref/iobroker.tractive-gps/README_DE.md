---
chapters: {"pages":{"en/adapterref/iobroker.tractive-gps/README.md":{"title":{"en":"ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/README.md"},"en/adapterref/iobroker.tractive-gps/README_DE.md":{"title":{"en":"ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/README_DE.md"},"en/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md":{"title":{"en":"Developer documentation for ioBroker.tractive-gps"},"content":"en/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tractive-gps/README_DE.md
title: ioBroker.tractive-gps
hash: uRR3zyQhEWf5v1b3dzQXPfvWJiZJScwCOrP+PGIHI40=
---
![Logo](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)
![Downloads](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)
![NPM-Version](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tractive-gps-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tractive-gps-installed.svg)

# ioBroker.tractive-gps

**Version:**

## Hakla

Alle in diesem Projekt genannten Produkt- und Firmennamen, Logos und Marken gehören ihren jeweiligen Eigentümern. Tractive und die damit verbundenen Namen, Logos und Marken sind Eigentum der Tractive GmbH bzw. ihrer jeweiligen Rechteinhaber. Ihre Verwendung dient ausschließlich der Identifikation und bedeutet weder eine Verbindung mit noch einem Sponsoring oder eine Unterstützung durch die Tractive GmbH oder mit ihrem verbundenen Unternehmen. Dies ist ein privates, nicht kommerzielles Projekt, das zu Freizeitzwecken entwickelt wird.

## Posten

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Programmfehler automatisch an den Entwickler zu melden.** Weitere Einzelheiten und eine Anleitung zum Deaktivieren der Fehlerberichterstattung enthält die [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Fehlerberichterstattung wird ab js-controller 3.0 verwendet.

## Beschreibung

Der Adapter verbindet ioBroker mit einem Tractive-Konto und stellt aktuelle Informationen zu Haustieren und GPS-Trackern als ioBroker-Datenpunkte bereit. Dadurch lassen sich Positionen, Batteriestände, Verbindungszustände, Tierinformationen und unterstützte Tracker-Funktionen in Automatisierungen und Visualisierungen verwenden.

Der Adapter verwendet eine inoffizielle Tractive-Service-Schnittstelle. Ein funktionierendes Tractive-Konto und ein aktives Abonnement für den Tracker werden vorausgesetzt. Dieser Community-Adapter ist weder mit Tractive verbunden noch wird er von Tractive unterstützt.

> [Englische Dokumentation](/#/adapters/tractive-gps)

## Voraussetzungen

- Node.js 22.13 oder neuer
- js-controller 7.2.2 oder neuer
- Admin 7.8.23 oder neuer
- VIS 1 oder VIS 2 ab Version 2.12.8 für eines der mitgelieferten Widgets; Die Versionsanforderung gilt nur für VIS 2
- Tractive-Konto mit mindestens einem zugeordneten Tracker

## Funktionen

- Ruft die echten Namen und Profildaten der mit dem Konto verbundenen Tiere ab.
- Stellt aktuelle GPS-Koordinaten, Höhe, Geschwindigkeit, Positionsgenauigkeit, Entfernung zum konfigurierten ioBroker-Standort und Aktualisierungszeit bereit.
- Kann Koordinaten optional in eine lesbare Adresse umwandeln.
- Stellt Batteriestand, Ladezustand,verwendete Positionsquelle (`KNOWN_WIFI` /`GPS` ), Zuhause-/Unterwegs-Status, Online-Status und Energiesparzustand bereit.
- Liefert Modell, Firmware, Hardwareversion, Fähigkeiten, Geschlecht, Geburtstag, Größe, Gewicht und weitere verfügbare Informationen.
- Unterstützt Live-Tracking, LED und Signalton, sofern der Tracker die jeweilige Funktion meldet.
- Speichert alle abgerufenen Konto-, Abonnement-, Freigabe-, Tier-, Tracker-, Positions- und Hardwaredaten als logischen lokalen Datenbaum sowie als vollständigen JSON-Schnappschuss.
- Enthält responsive Karten für VIS 1 und VIS 2 mit Tierbild, interaktiver Karte, Bereichsanzeige, Tracker-Status und Befehlssteuerung.
- Unterstützt ein von Tractive bereitgestelltes Bild oder ein eigenes, in ioBroker hochgeladenes Bild.
- Erkennt fehlende oder veraltete Tracker-Daten, ohne dass Objekte automatisch gelöscht werden.

## Konfiguration

Die Adapterinstanz öffnen und folgende Einstellungen vornehmen:

| Einstellung                           | Beschreibung                                                                                               |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| E-Mail                                | E-Mail-Adresse des Tractive-Kontos.                                                                        |
| Passwort                              | Passwort des Tractive-Kontos. Es wird mit dem ioBroker-Standardverfahren verschlüsselt gespeichert.        |
| Aktualisierungsintervall              | Zeit zwischen den regulären Positionsabfragen. Zur Auswahl stehen 2 bis 60 Minuten.                        |
| Koordinaten in einer Adresse auflösen | Ruft eine lesbare Adresse zu den aktuellen Koordinaten ab. Deaktivieren, wenn keine Adresse benötigt wird. |

Mit **Verbindung testen** können die eingegebenen Zugangsdaten geprüft werden. Alle Einstellungen werden anschließend mit dem normalen ioBroker-Button **Speichern** am unteren Ende der Konfigurationsseite gespeichert.

Nach dem ersten Speichern bleibt das Passwort unverändert, wenn das Passwortfeld leer gelassen wird. Passwörter im älteren ioBroker-Verschlüsselungsformat werden beim nächsten Speichern automatisch in das aktuelle AES-Format umgewandelt.

### Aktualisierung der Daten

- Positionen werden entsprechend dem eingestellten Aktualisierungsintervall abgerufen.
- Batterie- und Hardwareinformationen werden alle 15 Minuten aktualisiert.
- Tierprofile, Bilder und weitere statistische Angaben werden beim täglichen Vollabgleich aktualisiert.
- Nach dem Start des Adapters wird ebenfalls ein Vollabgleich durchgeführt.

Tractive kann vorübergehend mit HTTP 429 begrenzt sein. Der Adapter verteilt seine Anfragen, pausiert innerhalb dieser Begrenzung alle weiteren Anfragen und wiederholt sie automatisch. Eine erfolgreiche Aktualisierung ist an`info.lastSuccessfulSync` und`info.dataFresh` identifizierbar.

## Objekte und Datenpunkte

Die wichtigsten Objekte sind wie folgt gegliedert:

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

- `info.connection` : Zeigt an, ob die letzte Synchronisierung erfolgreich war.
- `info.dataFresh` : Zeigt an, ob aktuelle nutzbare Daten vorhanden sind.
- `info.lastSync` : Zeitpunkt des letzten Synchronisierungsversuchs.
- `info.lastSuccessfulSync` : Zeitpunkt der letzten erfolgreichen Synchronisierung.
- `info.refresh` : Taster zum manuellen Starten eines vollständigen Abgleichs.
- `info.status` Aktueller Adapterstatus.
- `info.currentApi` : Vollständiger JSON-Schnappschuss der aktuell verfügbaren Tractive-Daten.

### Tiere

Die Datenpunkte unter`pets.<pet-id>.*` Enthalten nützliche Tierprofildaten, Tracker-Zuordnung, Aktivitätsziele und das Profilbild. Leere und interne API-Felder werden weggelassen.

### Tracker

Die Datenpunkte unter`trackers.<tracker-id>.*` Enthalten Tracker-Kennung, Betriebs- und Onlinestatus, Position, Positionsquelle, Entfernung zum ioBroker-Systemstandort, Adresse, Batterieinformationen und unterstützte Befehle.`location.sensorUsed` Enthält die Tractive-Positionsquelle.`status.home` wird aus`KNOWN_WIFI` daher`GPS` abgeleitet. Einen doppelten Datenpunkt`connectionType` mehr gibt es nicht. Breiten- und Längengrad des ioBroker-Standorts werden in den Systemeinstellungen festgelegt.

### Vollständige API-Daten

Nur für Skripte, Automatisierungen und Visualisierungen werden sinnvoll nutzbare Werte als einzelne Datenpunkte angelegt. Leere Werte, API-Metadaten, interne Versionsfelder und doppelte Darstellungen werden weggelassen. Die vollständige unveränderte kombinierte Antwort bleibt als einzelner JSON-Wert in`info.currentApi` verfügbar. Anmeldepasswort und Zugriffstoken werden dabei nie abgelegt.

## Tracker-Befehle

Folgende schreibbare Datenpunkte werden nur angelegt, wenn der gewählte Tracker die jeweilige Funktion unterstützt:

- `trackers.<tracker-id>.commands.liveTracking`
- `trackers.<tracker-id>.commands.led`
- `trackers.<tracker-id>.commands.buzzer`

Der gewünschte Datenpunkt wird angezeigt`true` Oder`false` gesetzt. Er wird bestätigt, sobald Tractive den Befehl angenommen hat.

## VIS-Widgets

Der Adapter enthält einen klassischen`PetTrackerCard` für VIS 1 sowie eine native React-`PetTrackerCard` für VIS 2. Für jedes Tier bzw. jeden Tracker wird ein eigenes Widget eingefügt und in den Widget-Einstellungen mit den gewünschten Datenpunkten verknüpft.

Die Karte kann Folgendes anzeigen:

- Tiername, Tierart, Geschlecht, Alter und Gewicht,
- Tracker-Name und Online-Status,
- Tierbild aus dem lokalen Datenpunkt`media.localProfilePictureUrl` ,
- interaktive Prospekt-/OpenStreetMap-Karte,
- gemeldeter oder manuell eingestellter Positionsradius,
- Batteriestand, Positionsquelle, Zuhause-/Unterwegs-Status und Entfernung zu ioBroker,
- letzte Aktualisierung, Adresse, Energiesparzustand, Ladezustand, Geschwindigkeit, Höhe und Positionsgenauigkeit,
- Schalter für Signalton, LED und Live-Tracking bei unterstützten Trackern.

Für das Tractive-Bild wird`pets.<pet-id>.media.localProfilePictureUrl` als Bilddatenpunkt ausgewählt. Er enthält die URL der im lokalen ioBroker-Dateispeicher abgelegten Kopie. Wird kein Bild geliefert oder kann es nicht geladen werden, lässt sich im Widget-Bereich **Darstellung** ein eigenes Bild auswählen oder hochladen.

Die Karte kann den vollständigen Genauigkeits- oder Bereichskreis automatisch eingeben. Minimaler und maximaler Zoom, Bedienung, Bereichsquelle und ein manueller Radius sind in den Widget-Einstellungen konfigurierbar. Zur Anzeige der Karte werden Kartenkacheln von OpenStreetMap geladen.

Für die Befehlsschalter werden die entsprechenden Datenpunkte unter`trackers.<tracker-id>.commands.*` Im Widget-Bereich **Befehle** zugeordnet. Während der Bearbeitung der VIS-Ansicht sind die Befehle gesperrt; Im Laufzeitmodus lassen sie sich bedienen.

## Datenschutz und Sicherheit

- Das Passwort wird mit dem verschlüsselten ioBroker-Konfigurationsverfahren gespeichert.
- Zugriffstoken bleiben im Arbeitsspeicher und werden automatisch erneuert.
- Ausgewählte Konto- und Abonnementinformationen werden im logischen Objektbaum gespeichert. Die vollständig abgerufenen API-Daten werden lokal in`info.currentApi` abgelegt. Der Zugriff auf den ioBroker-Objektbaum sollte entsprechend geschützt werden.
- Passwort und Zugriffstoken werden dem API-Datenbaum nie hinzugefügt und verbleiben geschützt in der verschlüsselten Konfiguration bzw. im Arbeitsspeicher.
- Genaue Positionen werden lokal in ioBroker-Datenpunkten gespeichert, weil sie für die Funktion des Adapters erforderlich sind.
- Die Rückwärts-Geokodierung ist optional und wird bei Aktivierung Koordinaten an den Adressdienst von Tractive gesendet.
- Die Sentry-Fehlerberichterstattung richtet sich nach der globalen ioBroker-Sentry-Konfiguration.
- API-Antwortinhalte und der vollständige lokale Schnappschuss werden weder im Adapterprotokoll geschrieben noch ausdrücklich an Sentry übertragen.

## Implementierung

- **Verbindungstest schlägt fehl:** E-Mail-Adresse, Passwort, Internetverbindung und anfänglichen HTTPS-Zugriff prüfen.
- **Keine Tiere oder Tracker sichtbar:** Prüfen Sie, ob der Tracker dem eingestellten Tractive-Konto zugeordnet sind, und starten Sie anschließend die Adapterinstanz neu.
- **Daten werden nicht aktualisiert:**`info.status` ,`info.dataFresh` und`info.lastSuccessfulSync` prüfen.
- **HTTP 429 wird gemeldet:** Die Instanz weiterlaufen lassen. Der Adapter pausiert seine Anfragen und wiederholt sie automatisch nach Ablauf der Traktiv-Begrenzung.
- **Keine sichtbare Adresse:** Rückwärts-Geokodierung in der Adapterkonfiguration aktivieren.
- **Ein Befehl fehlt:** Der Tracker meldet die notwendige Fähigkeit dafür nicht.
- **Tierbild fehlt:**`localProfilePictureUrl` im Widget zuordnen oder ein eigenes Bild auswählen.

## Entwicklerdokumentation

Informationen zum Mitwirken finden Sie in der [Entwicklerdokumentation](/#/docs/adapterref/iobroker.tractive-gps/docs/DEVELOPMENT.md) .

## Credits

Ursprünglich erstellt von [xXBJXx](https://github.com/xXBJXx) und gepflegt durch die Organisation ioBroker Community Adapters.

## Lizenz

Copyright © 2023–2026 ioBroker Community Developers <iobroker-community-adapters@gmx.de>\
&#x20;Copyright © 2023 xXBJXx <issi.dev.iobroker@gmail.com>

MIT-Lizenz. Siehe [LICENSE](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/blob/main/LICENSE) .

## Changelog

### 3.1.0 (2026-08-25)

- (xXBJXx) Hinweise des Repository-Checkers zu Abhängigkeiten, Metadaten, Dokumentation und adapterverwalteten Timern behoben (#319).
- (xXBJXx) Eine klassische VIS-1-Tierkarte zusätzlich zum nativen VIS-2-Widget ergänzt und korrekt registriert, einschließlich Tierbild, Leaflet-Karte, Positions- und Tracker-Details, automatischer Theme-Farben und Tracker-Befehlssteuerung.

### 3.0.0 (2026-08-24)

- (xXBJXx) BREAKING: vollständig für Node.js 22, js-controller 7.2.2 und Admin 8 neu geschrieben.
- (xXBJXx) Sentry über die ioBroker-Adapterintegration eingerichtet (#4).
- (xXBJXx) Gespeicherte Autorisierungsdaten durch eine Anmeldung im Arbeitsspeicher, automatische Token-Erneuerung, Antwortprüfung, Wiederholungen und kontoweite Ratenbegrenzung ersetzt (#16, #115, #213, #231).
- (xXBJXx) Objektstrukturen `pets.*`, `trackers.*` und Zustandsinformationen ergänzt.
- (xXBJXx) Tiernamen korrigiert sowie alle verfügbaren Tierprofildaten mit richtigen Größen- und Gewichtseinheiten ergänzt.
- (xXBJXx) Fehlende Datenpunktdefinitionen für zuvor unbekannte API-Felder korrigiert (#81, #113, #305; ersetzt #114 und #175).
- (xXBJXx) Die doppelte API-Hierarchie durch einen ausgewählten Datenbaum für Konto, Abonnements, Tiere, Tracker, Position und Hardware ersetzt und den vollständigen JSON-Schnappschuss beibehalten.
- (xXBJXx) `sensor_used` und Entfernung zu ioBroker auf Grundlage von PR #3 wiederhergestellt, den Zuhause-/Unterwegs-Status ergänzt und den doppelten Datenpunkt `connectionType` entfernt.
- (xXBJXx) Tractive-CDN-URLs für Profilbilder korrigiert und Zuhause-/Unterwegs-Status sowie Entfernung zur VIS-2-Karte hinzugefügt.
- (xXBJXx) Tractive-Profilbilder in ioBroker zwischengespeichert, damit VIS 2 die als Binärdownload ausgelieferten CDN-Dateien anzeigen kann.
- (xXBJXx) Die Profilbildablage durch einen eigenen ioBroker-Dateicontainer vom Typ `meta` korrigiert.
- (xXBJXx) Lokale Profilbild-URL, textuellen Ladezustand, Geschwindigkeit und Höhe in die ausgewählten Datenpunkte und die VIS-2-Karte aufgenommen.
- (xXBJXx) Erkennung relativer ioBroker-Datei-URLs in `localProfilePictureUrl` korrigiert.
- (xXBJXx) Live-Tracking-, LED- und Signalton-Befehle für unterstützte Tracker ergänzt.
- (xXBJXx) Bedienelemente für Signalton, LED und Live-Tracking in die VIS-2-Karte aufgenommen.
- (xXBJXx) Die VIS-2-Karte in kompakte Bereiche für Befehle, Position, Tracker und Tierdaten gegliedert.
- (xXBJXx) Release-Werkzeuge aktualisiert und Lerna mit einheitlicher Versionierung für die privaten npm-Workspaces ergänzt.
- (xXBJXx) Adapterkonfiguration für Admin 8 erneuert und die ungültige jsonConfig-Konfiguration entfernt (#176).
- (xXBJXx) VIS-2-Widget `PetTrackerCard` mit Tierbild, Leaflet-/OpenStreetMap-Karte, Bereichsanzeige und Tracker-Informationen ergänzt.
- (xXBJXx) Unterstützung für Tractive-Profilbilder und eigene ioBroker-Bilder ergänzt.
- (xXBJXx) Automatische Farben für das helle und dunkle VIS-2-Theme ergänzt.
- (xXBJXx) Konfigurierbare Kartenbedienung, automatische Bereichsanpassung sowie minimalen und maximalen Zoom ergänzt.
- (xXBJXx) Passwortspeicherung auf serverseitige ioBroker-AES-Verschlüsselung mit automatischer Migration älterer Passwörter umgestellt.
- (xXBJXx) Wiederkehrende API-Anfragen reduziert und getrennte Aktualisierungsintervalle für Positionen, Batterieinformationen und statische Profildaten ergänzt.
- (xXBJXx) Adaptive Behandlung von HTTP 429, globale Anfragepausen, vorsichtige Wiederholungen und zwischengespeicherte Adressauflösung ergänzt.
- (xXBJXx) Lint-Prüfung auf ESLint 9 und `@iobroker/eslint-config` umgestellt (#45).
- (xXBJXx) Node.js 24 zur CI-Testmatrix hinzugefügt (#116).
- (xXBJXx) Automatische npm-Veröffentlichungen auf Trusted Publishing mit GitHub OIDC umgestellt (#169).
- (xXBJXx) Repository-Metadaten und Schema-Konfiguration aktualisiert und dadurch die Wartungs-PRs #214, #215, #216 und #291 ersetzt.
- (xXBJXx) Abhängigkeiten und Workspace-Werkzeuge aktualisiert und dadurch die PRs #91, #140, #147, #203, #211, #220, #256, #281, #298, #301 und #303 ersetzt.
- (xXBJXx) Tests, Dokumentation und Datenschutzmaßnahmen aktualisiert.

### 2.1.0 (2024-11-12)

- (mcm1957) Node.js 20 wird benötigt.
- (mcm1957) js-controller 5.0.19 und Admin 6.17.14 werden benötigt.
- (simatec) Oberfläche an die Regeln für responsives Design angepasst.
- (mcm1957) Fehler beim jsonConfig-Befehl zur erneuten Autorisierung korrigiert.
- (mcm1957) Abhängigkeiten aktualisiert.

### 2.0.1 (2024-08-20)

- (bluefox) Verschlüsselung des Zugriffstokens korrigiert.

### 2.0.0 (2024-08-18)

- (bluefox) BREAKING: Zugangsdaten müssen erneut eingegeben werden.
- (bluefox) Alten Code entfernt und Bedienoberfläche neu geschrieben.
- (bluefox) Abhängigkeiten aktualisiert.

### 1.2.0 (2024-04-28)

- (mcm1957) Node.js 18 und js-controller 5 oder neuer werden benötigt.
- (mcm1957) Abhängigkeiten aktualisiert.

### 1.1.0 (2023-11-05)

- (Scrounger) Objekte werden nur noch bei Bedarf erstellt.
- (Scrounger) Übermäßig viele Warnungen reduziert.
- (Scrounger) Entfernungsberechnung zwischen ioBroker und Tracker ergänzt.

Frühere Änderungen sind in [CHANGELOG_OLD.md](https://github.com/iobroker-community-adapters/ioBroker.tractive-gps/blob/main/CHANGELOG_OLD.md) dokumentiert.