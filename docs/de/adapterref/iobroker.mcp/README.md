---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcp/README.md
title: ioBroker.mcp
hash: biPH4rPRb+GHsloLOCfhsQ6SiuWpblvywj7w39BIzOU=
---
<img src="admin/mcp.png" alt="ioBroker.mcp" width="200"/>

# IoBroker.mcp
MCP-Server für ioBroker

## Beschreibung
Dieser Adapter stellt ioBroker als [MCP (Model Context Protocol)](https://modelcontextprotocol.io)-Server bereit, sodass MCP-fähige Clients (z. B. Claude Desktop) Ihre Installation über einen genau definierten Satz von Tools lesen und steuern können.

## Merkmale
- MCP-Server über den **Streamable HTTP**-Transport (`/mcp`-Endpunkt)
- Konfigurierbarer HTTP/HTTPS-Webserver
- Konfigurierbarer Port und Bindungsadresse
- Optionale Authentifizierung
- Optionale SSL/TLS-Unterstützung
- Netzwerkdiagnose (ICMP-Ping / TCP-Probe) zur Fehlerbehebung bei Adapterverbindungen
- Suche im **Adapter-Repository** zur Empfehlung installierbarer Adapter

## Betriebsmodi
Der Adapter kann auf zwei Arten betrieben werden:

1. **Standalone** (Standard) – startet einen eigenen Webserver auf dem konfigurierten Port. Der MCP-Endpunkt ist

`http(s)://<host>:<port>/mcp`.

2. **Web-Erweiterung** – Sie läuft innerhalb eines bestehenden [`web`](https://github.com/ioBroker/ioBroker.web)-Adapters.

Die Instanz wird verwendet und teilt ihren Webserver (Port, Authentifizierung, SSL). Wählen Sie die Ziel-Webinstanz in der Administratorkonfiguration aus („Webadapter erweitern“). Der MCP-Endpunkt wird dann über den Webadapter bereitgestellt, z. B.

`http(s)://<host>:8082/mcp/`.

Wenn eine Webinstanz ausgewählt wird, werden die Standalone-Servereinstellungen (Port, Bindungsadresse, Authentifizierung, SSL) ausgeblendet, da sie von der gewählten `web`-Instanz übernommen werden.

## Konfiguration
Der Adapter kann über die ioBroker-Admin-Oberfläche mithilfe von JSONConfig konfiguriert werden:

### Serverkonfiguration
- **Webadapter erweitern**: Wählen Sie eine `web`-Instanz aus, die als Erweiterung ausgeführt werden soll. Lassen Sie das Feld leer, um den Adapter eigenständig auszuführen.
- **Port**: Der Port, an dem der Webserver lauscht (Standard: 8093) – nur für Standalone-Systeme
- **Bindungsadresse**: IP-Adresse, an die der Server gebunden werden soll (0.0.0.0 für alle Schnittstellen) – nur für Standalone-Systeme

### Authentifizierung
- **Authentifizierung aktivieren**: Aktivieren Sie die ioBroker-Benutzerauthentifizierung für den Webserver.
- **Standardbenutzer**: Der ioBroker-Benutzer, mit dessen Berechtigungen jede MCP-Anfrage ausgeführt wird (Standard: `admin`).

Alle Lese- und Schreibvorgänge von Objekten/Zuständen, die von den Tools durchgeführt werden, erfolgen im Namen dieses Benutzers, sodass dessen Zugriffskontrolllisten (ACLs) durchgesetzt werden. Ein einfacher Name wie `operator` wird automatisch zu `system.user.operator` erweitert.
Wenn die Anwendung als Web-Erweiterung ausgeführt wird und hier kein Benutzer festgelegt ist, wird der Standardbenutzer der Host-Instanz `web` verwendet.

### Berechtigungen
- **Zustände festlegen**: Erlauben Sie MCP-Clients, Zustandswerte zu schreiben (die Tools `set_state` und `set_states`).

Standardmäßig ist der Status **ein**.

- **Objekt-/Dateiänderungen zulassen**: Erlauben Sie MCP-Clients, Objekte und Dateien zu erstellen/zu ändern/zu löschen (die `set_object`,

`delete_object`, `create_state`, `create_scene`, `write_file`, `delete_file`, `rename_file` und `mkdir`). Standard: **aus**. Wenn diese Option deaktiviert ist, sind diese Tools nicht verfügbar.

### SSL/TLS-Konfiguration
- **HTTPS aktivieren**: Aktivieren Sie HTTPS/SSL für sichere Verbindungen
- **Öffentliches Zertifikat**: Pfad zur öffentlichen Zertifikatsdatei
- **Privater Schlüssel**: Pfad zur Datei mit dem privaten Schlüssel
- **Verkettetes Zertifikat**: Pfad zur verketteten Zertifikatsdatei (optional)

## MCP-Endpunkt
Der MCP-Server wird unter `POST/GET/DELETE /mcp` über den Streamable-HTTP-Transport mit sitzungsbezogenem Status (über den `Mcp-Session-Id`-Header verfolgt) bereitgestellt. Richten Sie Ihren MCP-Client auf folgende Adresse:

- standalone: `http(s)://<host>:<port>/mcp`
- Web-Erweiterung: `http(s)://<Host>:<WebPort>/mcp/`

### Verfügbare Werkzeuge
| Werkzeug | Beschreibung |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `get_states` | Ruft den aktuellen Wert eines oder mehrerer Zustände ab; IDs können Platzhalter enthalten (z. B. `hue.0.*.brightness`) |
| `search_objects` | Objekte/Zustände nach Schlüsselwort durchsuchen (abgeglichen mit ID und Name); optionale Filter für Objekt `type`, `role`, `room` und Quellinstanz `adapter` |
| `list_devices` | Listet erkannte Geräte gruppiert nach Raum auf (verwendet den ioBroker-Typdetektor, um funktionale Geräte mit benannten Steuerelementen anzuzeigen); optionaler `language`- und `room`-Filter |
| `list_instances` | Adapterinstanzen mit ihrem Status auflisten |
| `list_adapters` | Installierte Adapter mit Metadaten (Version, Titel, Beschreibung, Schlüsselwörter) auflisten |
| `search_adapter_repository` | Durchsuchen Sie das ioBroker-Adapter-**Repository** (alle *installierbaren* Adapter, nicht nur die installierten) nach Stichwort; optionale Filter `type` Kategorie, `onlyNotInstalled` und `language` – verwenden Sie diese, um zu empfehlen, welcher Adapter für ein Gerät/einen Dienst installiert werden soll. |
| `list_hosts` | Liste der ioBroker-Hosts mit ihrem Status auf |
| `list_rooms` | Liste der Räume (`enum.rooms.*`) mit lokalisierten Namen und Mitgliederdetails; optional `language` und `withIcons` |
| `list_functions` | Listenfunktionen (`enum.functions.*`) mit lokalisierten Namen und Memberdetails; optional `language` und `withIcons` |
| `history_query` | Historische Werte abfragen (erfordert einen History-Adapter); Aggregationen: `raw`, `min`, `max`, `avg`, `sum`, `count`, `minmax`, `percentile`, `quantile`, `integral` |
| `read_file` | Eine Datei aus einem Adapter-Dateispeicher lesen (optional Base64) |
| `list_files` | Verzeichnis in einem Adapter-Dateispeicher auflisten |
| `file_exists` | Prüfen, ob eine Datei im Dateispeicher eines Adapters existiert |
| `get_logs` | Ruft die letzten ioBroker-Logzeilen ab; optionale Filter nach `level` (Fehler/Warnung/Info/Debug), Quelle `adapter` und Startzeit (`from_ts`) |
| `write_log` | Schreibe eine Nachricht in das ioBroker-Protokoll |
| `system_info` | System- und JS-Controller-Informationen abrufen |
| `ping_host` | Diagnose der Konnektivität zu einem Netzwerkgerät: ICMP-Ping an `host` plus optionale TCP-Verbindung zu `port` – nützlich zur Untersuchung von Adapter- `ETIMEDOUT`/Verbindungsfehlern |
| `set_state` | Den Wert eines Zustands festlegen (Wert wird in den Zustandstyp umgewandelt) — erfordert *Zustände festlegen zulassen* |
| `set_states` | Mehrere Zustände in einem Aufruf festlegen (für Szenen-/Gruppenaktionen wie "Alle Lichter aus") — erfordert *Zustandsfestlegung zulassen* |
| `set_object` | Objekt erstellen/aktualisieren (führt gemeinsame/native zusammen) — erfordert *Objekt-/Dateiänderungen zulassen* |
| `delete_object` | Ein Objekt löschen, optional mit allen untergeordneten Objekten — erfordert *Objekt-/Dateiänderungen zulassen* |
| `create_state` | Erstelle ein neues Zustandsobjekt mit Typ/Rolle/Einheit/Min./Max. und optionalem Anfangswert — erfordert *Objekt-/Dateiänderungen zulassen* |
| `create_scene` | Szene für den ioBroker `scenes` Adapter erstellen oder aktualisieren (Zustands-/Wertpaare werden gemeinsam angewendet) — erfordert *Objekt-/Dateiänderungen zulassen* |
| `write_file` | Eine Datei in einen Adapterdateispeicher schreiben — erfordert *Objekt-/Dateiänderungen zulassen* |
| `delete_file` | Eine Datei aus dem Adapterdateispeicher löschen — erfordert *Objekt-/Dateiänderungen zulassen* |
| `rename_file` | Eine Datei innerhalb desselben Adapter-Dateispeichers umbenennen/verschieben — erfordert *Objekt-/Dateiänderungen zulassen* |
| `mkdir` | Erstelle ein Verzeichnis im Adapterdateispeicher — erfordert *Objekt-/Dateiänderungen zulassen* |
| `mkdir` | Erstellt ein Verzeichnis im Adapterdateispeicher — erfordert *Objekt-/Dateiänderungen zulassen* |

Der Zugriff auf Objekte/Zustände erfolgt ausschließlich mit den Berechtigungen des konfigurierten **Standardbenutzers**. Die Schreibwerkzeuge werden nur registriert, wenn die entsprechende Berechtigungsoption aktiviert ist.

### Ressourcen & Live-Updates (SSE)
Zustände und Objekte werden außerdem als MCP-Ressourcen mithilfe des kanonischen ioBroker-URI-Schemas bereitgestellt, sodass Clients sie lesen und abonnieren können. Der Server überträgt Änderungen über den Streamable HTTP SSE-Stream (`notifications/resources/updated`).

- Zustände: `iobstate://<id>` (z. B. `iobstate://javascript.0.temperature`) – `resources/read` gibt Folgendes zurück

`{ id, val, ack, ts, lc, q }`.

- Objekte: `iobobject://<id>` (z.B. `iobobject://system.adapter.admin.0`) – `resources/read` gibt das Objekt zurück.
- Logs: `ioblog://all` (jede Quelle) oder `ioblog://<source> ` (z. B. `ioblog://admin.0`) – `resources/read`

Gibt die letzten Logzeilen (`{ source, logs: [{ ts, level, source, message }] }`) zurück. Durch das Abonnieren wird die Logweiterleitung für den Adapter aktiviert; jede neue übereinstimmende Zeile löst ein `notifications/resources/updated` aus.

- `resources/subscribe` abonniert den zugrunde liegenden ioBroker-Status/das Objekt/das Protokoll; bei jeder Änderung wird der Client

Empfängt ein `notifications/resources/updated` für diese URI und liest sie erneut. `resources/unsubscribe` beendet den Vorgang.

Abonnements werden pro Sitzung verfolgt und referenzgezählt, sodass der Adapter einen Zustand/ein Objekt nur einmal abonniert, unabhängig davon, wie viele Clients/Sitzungen es beobachten, und das Abonnement aufhebt, wenn der letzte Client/die letzte Sitzung die Sitzung verlässt.

(Dateien verwenden `iobfile://<adapter>/<path>` im gleichen Schema; sie sind über die Werkzeuge `read_file`/`write_file` verfügbar und nicht als abonnierbare Ressourcen.)

### Gesundheitsendpunkte (nicht MCP)
- `GET /` - Grundlegende Serverinformationen
- `GET /status` - Serverstatus, Betriebszeit und Anzahl aktiver Sitzungen
- `GET /api/info` - Adapterinformationen

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.11 (2026-07-02)
* (@GermanBluefox) Default port was changed to 8011
* (@GermanBluefox) Corrected the issue with authentication

### 1.0.8 (2026-06-18)
* (@GermanBluefox) Used `@iobroker/mcp-server` package

### 1.0.5 (2026-06-17)
* (@GermanBluefox) Added debug for ICMP ping and TCP probe in `ping_host` tool

### 1.0.2 (2026-06-13)
* (@GermanBluefox) Some repo checker errors were fixed

### 1.0.0 (2026-06-12)
* (@GermanBluefox) Allowed node 18

### 0.3.1 (2026-06-11)
* (@GermanBluefox) Added `search_adapter_repository` tool to search the whole adapter repository (not only installed adapters)
* (@GermanBluefox) Added `ping_host` tool (ICMP ping + optional TCP probe) for network diagnostics

### 0.2.5 (2026-06-11)
* (@GermanBluefox) Supported direct import of MCP server

### 0.2.0 (2026-06-11)
* (@GermanBluefox) Many changes: see the previous changelog entry

### 0.1.5 (2026-06-11)
* (@GermanBluefox) Added wildcard support to `get_states` (e.g. `hue.0.*.brightness`)
* (@GermanBluefox) Added `set_states` for writing multiple states in one call (scenes/group actions)
* (@GermanBluefox) Added `delete_object` and `create_state` tools (gated by *Allow object/file changes*)
* (@GermanBluefox) Added `create_scene` tool that creates scenes for the ioBroker `scenes` adapter
* (@GermanBluefox) Added file management tools: `list_files`, `file_exists`, `delete_file`, `rename_file`, `mkdir`
* (@GermanBluefox) Added `list_adapters` to list installed adapters with metadata
* (@GermanBluefox) Extended `search_objects` with `type` and `adapter` filters; the keyword now also matches object names
* (@GermanBluefox) Extended `history_query` with the aggregations `count`, `minmax`, `percentile`, `quantile` and `integral`

### 0.1.4 (2026-05-28)
* (@GermanBluefox) Initial development

### 0.0.1 (2025-01-03)
* Initial release with basic web server functionality
*Configurable port, bind address, authentication, and SSL

## License

MIT License

Copyright (c) 2025-2026 ioBroker

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