---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md
title: ADR 0012: Apple TV Admin-Tabellen
hash: saqJq7LTqeQZlmawANe3hJGfrSLEJpTvCIaunzoIGQI=
---
# ADR 0012: Apple TV Admin-Tabellen

- Status: Ersetzt durch ADR 0017 hinsichtlich Administratorkompatibilität und Build-Grenzen; Tabellenverhalten weiterhin akzeptiert
- Datum: 01.09.2026

## Kontext

Die standardmäßigen JSON-Konfigurationssteuerelemente können zwar zur Laufzeit bereitgestellte Geräte auflisten oder eine Adapternachricht aufrufen, jedoch keine temporären Erkennungsdaten, ein nicht persistentes PIN-Feld und mehrere zeilenspezifische Aktionen in einer dynamischen Tabelle zusammenfassen. Die bisherigen Apple-TV-Auswahlfelder beanspruchten daher viel vertikalen Platz und zeigten ungültige Platzhaltersymbole für Aktionsnamen an, die vom Standard nicht unterstützt wurden. `sendTo` Komponente.

Die aktuelle Test- und Bereitstellungsbasislinie verwendet ioBroker Admin 7.8.23. Admin 8 verwendet eine andere gemeinsame React- und GUI-Komponentengenerierung und lehnt absichtlich benutzerdefinierte Komponenten der Legacy-Generierung ab.

## Entscheidung

Rendern Sie die Apple TV-Kopplung und die Verwaltung gekoppelter Geräte mit einer benutzerdefinierten JSON-Konfigurationskomponente, die aus dem Quellcode erstellt wurde. `src-admin/` Die Komponente nutzt die offizielle Admin 7 Module Federation-Schnittstelle und importiert ihre Steuerelemente und Symbole aus den Admin 7 React/MUI-Bibliotheken. Die generierten Produktionsressourcen sind unten verfügbar. `admin/custom/` und sind im Adapterpaket enthalten.

Die ADRs 0015 und 0016 verwendeten diese Quell-/Build-Grenze später für die Verwaltungstabellen von HomePod und AirPlay Receiver sowie – historisch gesehen – für die zweisprachige Instanzauswahl. ADR 0016 wurde inzwischen ersetzt, da die aktuellen ioBroker-Checklistenregeln vorschreiben, dass die Admin-Benutzeroberfläche der systemweiten Admin-Sprache folgen muss.

Die Komponente nutzt die bestehende Adapternachrichtengrenze. Die Antworten der Kandidaten- und Gerätepaarlisten fügen neben den bestehenden nicht-geheimen strukturierten Feldern weitere, nicht-geheime Felder hinzu. `label` Und `value` Felder. `getPairingStatus` fügt die stabile Geräte-ID nur während einer aktiven Kopplungssitzung hinzu, sodass der Browser den globalen Kopplungskoordinator für eine Sitzung an die richtige Tabellenzeile binden kann.

Die PIN wird nur im Komponentenzustand gespeichert, auf vier Ziffern gefiltert und einmalig gesendet an `finishPairing` Sie wird nach Abschluss oder Abbruch entfernt. Sie wird niemals über die JSON-Konfiguration geschrieben. `onChange` Der Pfad wird niemals zur nativen Adapterkonfiguration.

Die Komponente behält die bestehende Regel „eine Pairing-Sitzung pro Instanz“ bei. Sie serialisiert sichtbare Aktionen während einer laufenden Anfrage, aktualisiert den Bestand nach jeder Aktion und führt zehn Sekunden lang eine automatische Aktualisierung des Verbindungs- und Erkennungsstatus durch. Passive und automatische Operationen behalten ihre explizite Browserbestätigung.

Diese Generation zielt auf Admin 7.8.23 bis einschließlich der verbleibenden Admin 7-Linie ab. Die deklarierte globale Admin-Abhängigkeit wird eingeschränkt auf `>=7.8.23 <8.0.0` Die Unterstützung von Admin 8 erfordert die Neuerstellung oder Hinzufügung einer GUI-API-Komponente der zweiten Generation und das Testen beider Generationen, bevor der Unterstützungsbereich erweitert wird. Diese Kompatibilitätsänderung ist für eine zukünftige Nebenversion vor Version 1.0 vorgesehen.

## Konsequenzen

Jedes erkannte Apple TV verfügt über eine kompakte Zeile mit Name/Modell, Kopplungsstatus, Start-, temporärer PIN-, Beenden- und Abbruch-Steuerelementen. Jedes gekoppelte Apple TV hat eine Zeile mit Verbindungs-/Aktivierungsstatus und den Aktionen „Aktivieren“, „Passivieren“ und „Vergessen“. Alle Aktionen verwenden integrierte MUI-Symbole, wodurch der begrenzte Zeichenketten-Symbol-Wortschatz des Standards vermieden wird. `sendTo` Kontrolle.

Der Quellcode-Build fügt festgelegte Entwicklungsabhängigkeiten hinzu, die nur für Administratoren bestimmt sind, und generierte Frontend-Assets. Protokollverhalten, Anmeldeinformationen, Persistenzformat und öffentliche Objekt-IDs bleiben unverändert. Die additiven Nachrichtenfelder bleiben nicht geheim und sind abwärtskompatibel mit den vorherigen Selektoren.

## Alternativen in Betracht gezogen

- Speichern von Laufzeitzeilen in einer Standard-JSON-Konfiguration `table` wurde abgelehnt, da die Erkennungsergebnisse und PINs keine dauerhafte Adapterkonfiguration darstellen.
- HTML rendern durch `textSendTo` wurde abgelehnt, da keine unterstützte Zeilenaktions- oder Transient-Input-Nachrichtengrenze vorhanden ist.
- Die Beibehaltung kompakter Selektoren wurde verworfen, da sie den gewünschten gerätespezifischen Workflow nicht ermöglichen würde.
- Der Versuch, nur für Admin 8 zu bauen, wurde abgelehnt, da auf dem getesteten ioBroker-Host Admin 7.8.23 ausgeführt wird.

## Validierung

Neben der vollständigen Adapterprüfung müssen auch die Typüberprüfung und der Build der Produktionskomponente erfolgreich sein. Vertragstests verifizieren die benutzerdefinierte Komponentenreferenz, den generierten Einstiegspunkt, die PIN-Zeilenaktionen und die aktive Pairing-Geräte-ID. Die Registerkarte „Geräte“ muss auf einem repräsentativen Linux-aarch64-ioBroker-Host unter Admin 7.8.23 ohne Konsolen- oder Komponentenladerfehler geladen werden.