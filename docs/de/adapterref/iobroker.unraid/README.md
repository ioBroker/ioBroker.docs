---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.unraid/README.md
title: ioBroker.unraid
hash: Klz4BrytXGLfoSSr+r2o3NOepVL0kjcr7g4bE06sAZo=
---
![Logo](../../../en/adapterref/iobroker.unraid/admin/unraid.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.unraid.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.unraid.svg)
![Anzahl der Installationen](https://iobroker.live/badges/unraid-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/unraid-stable.svg)
![NPM](https://nodei.co/npm/iobroker.unraid.png?downloads=true)

# IoBroker.unraid
> **⚠️ In Entwicklung**: Dieser Adapter befindet sich in aktiver Entwicklung. Zusätzliche Datenpunkte und Funktionen sind für zukünftige Versionen geplant.

**Tests:** ![Test und Freigabe](https://github.com/ingel81/ioBroker.unraid/workflows/Test%20and%20Release/badge.svg)

## Unraid-Adapter für ioBroker
Dieser Adapter verbindet ioBroker über die GraphQL-API mit Unraid-Servern, um Systemmetriken und -status zu überwachen.

## Merkmale
- Überwachung der CPU- und Speicherauslastung (einschließlich Statistiken pro Kern)
- Serverstatus und Netzwerkinformationen verfolgen
- Docker-Container überwachen und steuern (Start/Stopp)
- Array-Festplatten (Daten, Parität, Cache) mit Zustandsinformationen anzeigen
- Netzwerkfreigaben überwachen (Nutzung, Konfiguration, Dateisystemdetails)
- Virtuelle Maschinen überwachen und steuern (Starten/Stoppen/Anhalten/Fortsetzen/Neustarten)
- Konfigurierbares Abfrageintervall

## Konfiguration
### Generieren eines API-Tokens in Unraid
#### Für Unraid-Versionen vor 7.2:
1. Installieren Sie das **„Unraid Connect Plugin“** aus dem Unraid Community Applications Store.
2. Navigieren Sie nach der Installation zu: **Einstellungen → Verwaltungszugriff → API-Schlüssel**

#### Für Unraid 7.2 und höher:
Die API-Funktionalität ist integriert. Gehen Sie direkt zu: **Einstellungen → Verwaltungszugriff → API-Schlüssel**

#### Token erstellen:
1. Klicken Sie auf **"API-Schlüssel hinzufügen"**
2. Berechtigungen konfigurieren:
- **Basisrolle**: Wählen Sie **"Betrachter"** (bietet Lesezugriff auf Systeminformationen, Metriken, Datenträger usw.).
- **Zusätzliche Berechtigungen** (erforderlich für Steuerungsfunktionen):
- **Docker Manager**: Ermöglicht das Starten/Stoppen von Docker-Containern
- **VM-Manager**: Ermöglicht das Starten, Stoppen und Anhalten virtueller Maschinen

**Schnelleinrichtungsalternative**: Kopieren Sie diese Vorlagenzeichenfolge und fügen Sie sie in **API-Schlüssel → "Aus Vorlage erstellen"** ein:

```
?name=ioBroker+unraid+adapter+key&scopes=role%3Aviewer%2Cdocker%2Bvms%3Acreate_any%2Bdelete_any%2Bread_any%2Bupdate_any%2Carray%2Bdashboard%2Bdisk%2Binfo%2Blogs%2Bnetwork%3Aread_any
```

3. Geben Sie dem Token einen beschreibenden Namen (z. B. „ioBroker“).
4. Kopieren Sie das generierte Token (API-Schlüssel) – Sie benötigen es für die Adapterkonfiguration.

![Unraid API-Token](../../../en/adapterref/iobroker.unraid/docs/de/img/unraid_token01.png)

### Adaptereinstellungen
1. **Basis-URL**: Geben Sie Ihre Unraid-Serveradresse ein (z. B. `https://192.168.1.10` oder `https://tower.local`).
2. **API-Token**: Fügen Sie das Admin-Token ein, das Sie in Unraid generiert haben.
3. **Abfrageintervall**: Legen Sie fest, wie oft Daten abgerufen werden sollen (Standard: 60 Sekunden, Minimum: 10 Sekunden)
4. **Selbstsignierte Zertifikate**: Aktivieren Sie diese Option, wenn Ihr Unraid-Server ein selbstsigniertes HTTPS-Zertifikat verwendet.
5. **Datendomänen**: Wählen Sie die zu überwachenden Datenkategorien aus (Systeminformationen, Serverstatus, Metriken usw.).

### Konfigurationsschnittstelle
![Konfiguration](../../../en/adapterref/iobroker.unraid/docs/de/img/ioBroker_config01.png)

### Erstellte Objekte
Der Adapter erstellt eine strukturierte Objektstruktur für die überwachten Daten:

![Objekte](../../../en/adapterref/iobroker.unraid/docs/de/img/ioBroker_objects01.png)<br>

![Docker-Containersteuerung](../../../en/adapterref/iobroker.unraid/docs/de/img/ioBroker_objects02.png)<br>

![VM-Steuerung](../../../en/adapterref/iobroker.unraid/docs/de/img/ioBroker_objects03.png)

## Anforderungen
- Unraid-Server (Version 7.0.0+ empfohlen)
- Für Versionen vor 7.2: Installieren Sie das „Unraid Connect Plugin“ aus den Community-Anwendungen.
- Ab Version 7.2: API-Unterstützung ist integriert
- API-Token mit Viewer-Rolle (plus Docker/VM Manager für Steuerungsfunktionen)
- Netzwerkzugriff von ioBroker auf den Unraid-Server

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.7.1 (2025-11-30)

- (ingel81) Minor pipeline issues fixed

### 0.7.0 (2025-11-30)

- (ingel81) Migrated admin UI to @iobroker/adapter-react-v5 (React 18, MUI v6)
- (ingel81) Extended Unraid GraphQL schema (CPU package power and temperatures)
- (ingel81) Refined API token documentation with Viewer role permissions
- (ingel81) Updated dependencies (release-script 5.x, adapter-react-v5 8.x)

### 0.6.2 (2025-10-19)

- (ingel81) dependencies updated

### 0.6.2-alpha.1 (2025-10-19)

- (ingel81) npm deployment adjusted pt.2

### 0.6.2-alpha.0 (2025-10-19)

- (ingel81) npm deployment adjusted

### 0.6.1 (2025-09-28)

- (ingel81) fix: Use themecolors in settings

### 0.6.0 (2025-09-24)

- (ingel81) Added VM and Docker container control functionality
- (ingel81) Code refactoring and cleanup
- (ingel81) Translation

### 0.5.3 (2025-09-23)

- (ingel81) Support for node 20, 22 and 24

### 0.5.2 (2025-09-22)

- (ingel81) Documentation
- (ingel81) Minor admin page improvements

### 0.5.1 (2025-09-22)

- (ingel81) ESLint9 Migration
- (ingel81) Code refactor

### 0.5.0 (2025-09-21)

- (ingel81) More Unraid queries: Docker containers, shares, VMs, array disks with dynamic state creation,
- (ingel81) Apollo Client migration

### 0.4.1 (2025-09-21)

- (ingel81) Documentation

### 0.4.0 (2025-09-21)

- (ingel81) Adapter renamed to iobroker.unraid

### 0.3.0 (2025-09-21)

- (ingel81) Translations
- (ingel81) Logo
- (ingel81) Readme

### 0.2.2 (2025-09-21)

- (ingel81) Release testing with npm, reloaded2

## License

MIT License

Copyright (c) 2025 ingel81 <ingel81@sgeht.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.