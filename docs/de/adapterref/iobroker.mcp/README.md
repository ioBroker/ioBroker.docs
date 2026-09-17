---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcp/README.md
title: ioBroker.mcp
hash: hmH8v1QfLMqVR3bw0iwfBiP1d5d1CLuaX/UKPXFyxgI=
---
<img src="admin/mcp.png" alt="ioBroker.mcp" width="200"/>

# ioBroker.mcp

MCP-Server für ioBroker

## Beschreibung

Dieser Adapter stellt ioBroker als [MCP-Server (Model Context Protocol)](https://modelcontextprotocol.io) bereit, sodass MCP-fähige Clients (z. B. Claude Desktop) Ihre Installation über einen genau definierten Satz von Tools lesen und steuern können.

## Merkmale

- MCP-Server über den **Streamable HTTP-** Transport (`/mcp` Endpunkt)
- Konfigurierbarer HTTP/HTTPS-Webserver
- Konfigurierbarer Port und Bindungsadresse
- Optionale Authentifizierung
- Optionale SSL/TLS-Unterstützung
- Netzwerkdiagnose (ICMP-Ping / TCP-Probe) zur Fehlerbehebung bei Adapterverbindungen
- Adapter- **Repository-** Suche zur Empfehlung installierbarer Adapter

## Betriebsarten

Der Adapter kann auf zwei Arten betrieben werden:

1. **Standalone** (Standard) – es startet einen eigenen Webserver auf dem konfigurierten Port. Der MCP-Endpunkt ist `http(s)://<host>:<port>/mcp` Die
2. **Web-Erweiterung** – sie läuft innerhalb einer bestehenden[`web`](https://github.com/ioBroker/ioBroker.web) Die Adapterinstanz teilt ihren Webserver (Port, Authentifizierung, SSL). Wählen Sie die Zielwebinstanz in der Administratorkonfiguration aus („Webadapter erweitern“). Der MCP-Endpunkt wird dann über den Webadapter bereitgestellt, z. B. `http(s)://<host>:8082/mcp/` Die

   Wenn eine Webinstanz ausgewählt wird, werden die Einstellungen des eigenständigen Servers (Port, Bindungsadresse, Authentifizierung, SSL) ausgeblendet, da sie von der gewählten Instanz übernommen werden. `web` Beispiel.

## Konfiguration

Der Adapter kann über die ioBroker-Admin-Oberfläche mithilfe von JSONConfig konfiguriert werden:

### Serverkonfiguration

- **Webadapter erweitern** : Wählen Sie einen aus `web` Instanz, die als Erweiterung ausgeführt werden soll. Leer lassen, um das Programm eigenständig auszuführen.
- **Port** : Der Port, an dem der Webserver lauscht (Standard: 8093) – nur für Standalone-Systeme
- **Bindungsadresse** : IP-Adresse, an die der Server gebunden werden soll (0.0.0.0 für alle Schnittstellen) – nur für Standalone-Systeme

### Authentifizierung

- **Authentifizierung aktivieren** : Aktivieren Sie die ioBroker-Benutzerauthentifizierung für den Webserver.
- **Standardbenutzer** : Der ioBroker-Benutzer, mit dessen Berechtigungen jede MCP-Anfrage ausgeführt wird (Standard: `admin` Alle Lese- und Schreibvorgänge von Objekten/Zuständen, die von den Tools durchgeführt werden, erfolgen im Namen dieses Benutzers, sodass dessen Zugriffskontrolllisten (ACLs) durchgesetzt werden. Ein einfacher Name wie `operator` wird automatisch erweitert auf `system.user.operator` Wenn die Anwendung als Web-Erweiterung ausgeführt wird und hier kein Benutzer festgelegt ist, wird der Host `web` Der Standardbenutzer der Instanz wird verwendet.

### OAuth

MCP-Clients wie Claude Desktop verbinden sich über eine Browseranmeldung anstatt über ein manuell erstelltes Token. Der Client findet den Server selbstständig, der Benutzer meldet sich an und bestätigt die Anmeldung, und der Client sieht niemals das ioBroker-Passwort.

- **OAuth aktivieren (Browser-Login)** : Im Standalone-Modus ist hierfür _die Aktivierung der Authentifizierung_ erforderlich. Als **Web-Erweiterung** muss die ausgewählte Option aktiviert sein. `web` Die Instanz stellt das Login bereit, daher muss OAuth **auch dort** aktiviert sein („Drittanbieterclients zulassen“) – andernfalls erhalten MCP-Clients lediglich eine Weiterleitung zur Anmeldeseite, die sie nicht nutzen können.
- **Öffentliche URL** : Die extern erreichbare Adresse dieses Servers ohne Pfad, z. B. `https://iobroker.example.com` Erforderlich hinter einem Reverse-Proxy: Die für die OAuth-Erkennung veröffentlichten URLs müssen für den Client erreichbar sein. Als Web-Erweiterung muss sie mit der in der Konfiguration festgelegten öffentlichen URL übereinstimmen. `web` Beispiel.
- **Selbstregistrierung von Clients zulassen** : MCP-Clients können sich selbst registrieren (Standard: **aktiviert** ). Ist diese Option deaktiviert, muss jeder Client zunächst manuell registriert werden. Im Web-Extension-Modus ist dies die `web` Die Option ist in den Instanzeinstellungen ausgeblendet.

**HTTPS ist** für alles außer `localhost` — Der Datenfluss läuft über den Browser des Benutzers, und MCP-Clients lehnen einfache Daten ab. `http://` für entfernte Hosts.

Zugriffstoken sind an diesen Endpunkt gebunden, daher wird ein Token, das für einen anderen Dienst auf demselben Server ausgestellt wurde, abgelehnt. Clients können ihre Token über folgende Methode erneut löschen: `POST /oauth/revoke` Die

### Berechtigungen

- **Zustandseinstellungen zulassen** : MCP-Clients dürfen Zustandswerte schreiben (die `set_state` Und `set_states` Werkzeuge). Standard: **ein** .
- **Einstellungen als destruktiv kennzeichnen** : Deklarieren `set_state` Und `set_states` mit `destructiveHint: true` So können MCP-Clients warnen, bevor ein Zustand geschrieben wird. Standard: **aktiviert** . Wenn deaktiviert, werden beide Tools als nicht-destruktive Schreibvorgänge deklariert (`readOnlyHint` Aufenthalte `false` Ob ein Kunde dann noch eine Bestätigung verlangt, hängt vom Kunden ab.
- **Objekt-/Dateiänderungen zulassen** : MCP-Clients dürfen Objekte und Dateien erstellen, ändern und löschen (die `set_object`, `delete_object`, `create_state`, `create_scene`, `write_file`, `delete_file`, `rename_file` Und `mkdir` Werkzeuge). Standard: **Aus** . Wenn diese Option deaktiviert ist, werden diese Werkzeuge überhaupt nicht angezeigt.

### SSL/TLS-Konfiguration

- **HTTPS aktivieren** : Aktivieren Sie HTTPS/SSL für sichere Verbindungen
- **Öffentliches Zertifikat** : Pfad zur öffentlichen Zertifikatsdatei
- **Privater Schlüssel** : Pfad zur Datei mit dem privaten Schlüssel
- **Verkettetes Zertifikat** : Pfad zur verketteten Zertifikatsdatei (optional)

## Verbindung von ChatGPT und Claude

In den Connector-Verzeichnissen von Claude und ChatGPT ist noch keine offizielle ioBroker-Anwendung vorhanden. Fügen Sie ioBroker bis dahin als **benutzerdefinierten Connector** hinzu. Es gibt zwei Möglichkeiten, auf Ihre Installation zuzugreifen:

|               | A: via ioBroker Remote (empfohlen)                                             | B: direkt zu Ihrem Server                                        |
| ------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Server-URL    | `https://mcp.iobroker.in/mcp`                                                  | `https://<your public address>/mcp`                              |
| Login         | E-Mail-Adresse und Passwort Ihres [ioBroker.pro](https://iobroker.pro) -Kontos | ioBroker-Benutzer Ihrer Installation                             |
| Anforderungen | ioBroker.pro-Konto und Unterstützung oder aktives Fernabonnement               | öffentliche HTTPS-Adresse (Portweiterleitung oder Reverse-Proxy) |
| Offene Ports  | keiner                                                                         | Ihr MCP oder Webport muss aus dem Internet erreichbar sein.      |

### A: via ioBroker Remote

1. Konfigurieren Sie diesen Adapter (eigenständig oder als Web-Erweiterung). Lassen Sie **„Authentifizierung aktivieren“** und **„OAuth aktivieren“** **deaktiviert** : Die Anmeldung erfolgt auf iobroker.pro, und ioBroker.iot verbindet sich lokal ohne Anmeldeinformationen mit dieser Instanz. Als Web-Erweiterung wird die ausgewählte `web` Die Instanz darf auch keine Authentifizierung verwenden. Der Port muss nicht aus dem Internet erreichbar sein.
2. Aktivieren Sie in den Einstellungen von **ioBroker.iot** (angemeldet mit Ihrem ioBroker.pro-Konto) die **Option „Fernzugriff zulassen“** und wählen Sie diese Instanz als **MCP-Instanz** aus. Speichern Sie die Einstellungen.
3. Fügen Sie den Konnektor in Claude oder ChatGPT (siehe unten) mit der URL hinzu. `https://mcp.iobroker.in/mcp` Die
4. Es öffnet sich eine Anmeldeseite mit dem Titel „Mit ioBroker verbinden“: Geben Sie die E-Mail-Adresse und das Passwort Ihres ioBroker.pro-Kontos ein und klicken Sie auf **„Anmelden und zulassen“** . Erlauben Sie die Verbindung nur, wenn Sie sie gerade erst selbst eingerichtet haben.

Der Zugriff wird mit einer verifizierten E-Mail-Adresse und einer gültigen ioBroker.pro-Lizenz gewährt. Neue Konten können nach der Registrierung 7 Tage lang ohne Lizenz genutzt werden.

Gut zu wissen:

- ioBroker.iot muss mit der Cloud verbunden sein, andernfalls erhält der Client die Fehlermeldung „ioBroker ist offline“.
- Live-Updates (Abonnement von Ressourcen) sind über Remote nicht verfügbar. Alle Tools funktionieren.
- Nach einem Neustart der MCP-Instanz startet der Client selbstständig eine neue Sitzung.
- Durch Entfernen des Connectors im Client wird der Zugriff beendet. Ein bereits ausgestelltes Zugriffstoken bleibt bis zu einer Stunde gültig. Um den Zugriff sofort zu beenden, löschen Sie **die MCP-Instanz** in ioBroker.iot.

### B: direkt zu Ihrem Server

1. Aktivieren Sie **die Authentifizierung** und **OAuth** . Aktivieren Sie als Web-Erweiterung OAuth („Drittanbieterclients zulassen“) in der `web` Instanz ebenfalls.
2. Stellen Sie sicher, dass der Server über **HTTPS** aus dem Internet erreichbar ist und geben Sie diese Adresse als **öffentliche URL** ein.
3. Verwenden Sie die URL `https://<your public address>/mcp` (als Weberweiterung) `https://<your public address>/mcp/`) im Client und melden Sie sich mit einem ioBroker-Benutzer an.

### Claude (claude.ai, Claude Desktop)

Benutzerdefinierte Anschlüsse sind in allen Tarifen verfügbar, im kostenlosen Tarif ist nur ein benutzerdefinierter Anschluss möglich.

1. Öffnen Sie **Anpassen → Konnektoren** , klicken Sie auf **+** und wählen Sie **Benutzerdefinierten Konnektor hinzufügen** .
2. Geben Sie einen Namen ein (z. B. `ioBroker`) und die Server-URL. Die **erweiterten Einstellungen** (OAuth-Client-ID und -Geheimnis) bleiben leer, Claude registriert sich selbst.
3. Klicken Sie auf **„Hinzufügen“** . Falls die Anmeldung nicht automatisch startet, klicken Sie neben dem Connector auf **„Verbinden** “.
4. Klicken Sie im Chat auf **+** (unten links) → **Connectors** und aktivieren Sie **ioBroker** .

Team und Unternehmen: Ein Inhaber fügt den Konnektor zunächst unter **Organisationseinstellungen → Konnektoren** → **Hinzufügen** → **Benutzerdefiniert** → **Web** hinzu. Mitglieder öffnen dann **Anpassen → Konnektoren** und klicken auf **Verbinden** .

**Claude Code:**

```bash
claude mcp add --transport http iobroker https://mcp.iobroker.in/mcp
```

Dann führe es aus `/mcp` in Claude Code auswählen `iobroker` und melde dich im Browser an.

### ChatGPT

Für benutzerdefinierte MCP-Verbindungen ist der **Entwicklermodus** erforderlich, der für Plus-, Pro-, Business-, Enterprise- und Education-Konten in ChatGPT im Web verfügbar ist. In Business- und Enterprise-Arbeitsbereichen muss dieser Modus zuvor von einem Administrator aktiviert werden.

1. Öffnen Sie **Einstellungen → Sicherheit und melden Sie sich an** und aktivieren Sie **den Entwicklermodus** .
2. Öffnen Sie [ChatGPT Plugins](https://chatgpt.com/plugins) und klicken Sie auf **+** .
3. Geben Sie einen Namen ein (z. B. `ioBroker` Geben Sie eine Beschreibung ein (z. B. „Liest und steuert mein ioBroker Smart Home“). Wählen Sie unter **„Verbindung** **“ den öffentlichen Endpunkt** und geben Sie die Server-URL ein. Wählen Sie **OAuth** als Authentifizierungsmethode.
4. Stellen Sie die Verbindung her und melden Sie sich an. ChatGPT listet anschließend die Tools von ioBroker auf.
5. Öffnen Sie im Chat **+** → **Entwicklermodus** und wählen Sie **ioBroker** aus. Es ist hilfreich, ioBroker in der Anfrage explizit zu benennen, z. B. „Verwenden Sie ioBroker, um das Licht in der Küche auszuschalten“.

ChatGPT kennzeichnet Verbindungen im Entwicklermodus als risikoreich und fragt vor Schreibvorgängen nach.

Die Menünamen stammen aus den Hilfeseiten von [Claude](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) und [ChatGPT](https://developers.openai.com/api/docs/guides/developer-mode) (September 2026) und können sich ändern.

### Empfehlungen

- Legen Sie einen **Standardbenutzer** mit genau den Rechten fest, die die KI haben soll. Jedes Tool wird mit seinen entsprechenden Berechtigungen ausgeführt.
- Lassen Sie **„Objekt-/Dateiänderungen zulassen“** deaktiviert, es sei denn, Sie benötigen diese Option.
- Lassen Sie **die Mark-Einstellungszustände als destruktiv** aktiviert, damit die Kunden fragen, bevor sie etwas ändern.

## MCP-Endpunkt

Der MCP-Server ist unter folgender Adresse erreichbar: `POST/GET/DELETE /mcp` unter Verwendung des Streamable-HTTP-Transports mit sitzungsbezogenem Status (verfolgt über den `Mcp-Session-Id` Kopfzeile). Richten Sie Ihren MCP-Client auf Folgendes:

- eigenständig: `http(s)://<host>:<port>/mcp`
- Weberweiterung: `http(s)://<host>:<webPort>/mcp/`

### Verfügbare Werkzeuge

| Werkzeug                    | Beschreibung                                                                                                                                                                                                                                                                                                                      |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_states`                | Ruft den aktuellen Wert eines oder mehrerer Zustände ab; IDs können Platzhalter enthalten (z. B. `hue.0.*.brightness`)                                                                                                                                                                                                            |
| `get_object`                | Ein einzelnes Objekt anhand seiner ID lesen                                                                                                                                                                                                                                                                                       |
| `search_objects`            | Objekte/Zustände anhand von Schlüsselwörtern durchsuchen (Abgleich von ID und Name); optionale Filter für Objekte `type`, `role`, `room` und Quelle `adapter` Beispiel                                                                                                                                                              |
| `list_devices`              | Listet erkannte Geräte gruppiert nach Raum auf (nutzt den ioBroker-Typdetektor, um funktionale Geräte mit benannten Steuerelementen anzuzeigen); optional `language` Und `room` Filter                                                                                                                                              |
| `list_instances`            | Liste der Adapterinstanzen mit ihrem Status                                                                                                                                                                                                                                                                                       |
| `list_adapters`             | Liste der installierten Adapter mit Metadaten (Version, Titel, Beschreibung, Schlüsselwörter)                                                                                                                                                                                                                                     |
| `search_adapter_repository` | Durchsuchen Sie das ioBroker-Adapter **-Repository** (alle _installierbaren_ Adapter, nicht nur die installierten) anhand eines Stichworts; optional `type` Kategorie, `onlyNotInstalled` Und `language` Filter – Verwenden Sie diese Funktion, um zu empfehlen, welcher Adapter für ein Gerät/einen Dienst installiert werden soll. |
| `list_hosts`                | Liste der ioBroker-Hosts mit ihrem Status                                                                                                                                                                                                                                                                                         |
| `list_rooms`                | Liste der Zimmer (`enum.rooms.*`) mit lokalisierten Namen und Mitgliederdetails; optional `language` Und `withIcons`                                                                                                                                                                                                              |
| `list_functions`            | Listenfunktionen (`enum.functions.*`) mit lokalisierten Namen und Mitgliederdetails; optional `language` Und `withIcons`                                                                                                                                                                                                          |
| `history_query`             | Historische Werte abfragen (erfordert einen Verlaufsadapter); Aggregationen: `raw`, `min`, `max`, `avg`, `sum`, `count`, `minmax`, `percentile`, `quantile`, `integral`                                                                                                                                                           |
| `read_file`                 | Eine Datei aus einem Adapterdateispeicher lesen (optional Base64)                                                                                                                                                                                                                                                                 |
| `list_files`                | Ein Verzeichnis in einem Adapterdateispeicher auflisten                                                                                                                                                                                                                                                                           |
| `file_exists`               | Prüfen, ob eine Datei im Dateispeicher des Adapters vorhanden ist.                                                                                                                                                                                                                                                                |
| `get_logs`                  | Aktuelle ioBroker-Protokollzeilen abrufen; optionale Filter nach `level` (Fehler/Warnung/Info/Debug), Quelle `adapter` und Startzeit (`from_ts`)                                                                                                                                                                                   |
| `write_log`                 | Schreibe eine Nachricht in das ioBroker-Protokoll.                                                                                                                                                                                                                                                                                |
| `system_info`               | System- und JS-Controller-Informationen abrufen                                                                                                                                                                                                                                                                                   |
| `ping_host`                 | Verbindungsaufbau zu einem Netzwerkgerät diagnostizieren: ICMP-Ping an `host` plus eine optionale TCP-Verbindung zu `port` — nützlich, um den Adapter zu untersuchen `ETIMEDOUT` /Verbindungsfehler                                                                                                                                  |
| `set_state`                 | Den Wert eines Zustands festlegen (Wert wird in den Zustandstyp umgewandelt) — erfordert _die Option „Zustände festlegen zulassen“._                                                                                                                                                                                              |
| `set_states`                | Mehrere Zustände in einem Anruf festlegen (für Szenen-/Gruppenaktionen wie „Alle Lichter aus“) – erfordert _die Zulassung zum Festlegen von Zuständen_                                                                                                                                                                            |
| `set_object`                | Objekt erstellen/aktualisieren (zusammengeführte Common/Native-Funktionen) – erfordert die _Berechtigung „Objekt-/Dateiänderungen zulassen“._                                                                                                                                                                                     |
| `delete_object`             | Ein Objekt löschen, optional mit allen untergeordneten Objekten – erfordert _die Zulassung von Objekt-/Dateiänderungen_                                                                                                                                                                                                           |
| `create_state`              | Erstelle ein neues Zustandsobjekt mit Typ/Rolle/Einheit/Min./Max. und optionalem Anfangswert – erfordert _die Berechtigung „Objekt-/Dateiänderungen zulassen“._                                                                                                                                                                   |
| `create_scene`              | Erstellen oder Aktualisieren einer Szene für den ioBroker `scenes` Adapter (Zustands-/Wertpaare werden gemeinsam angewendet) — erfordert _Objekt-/Dateiänderungen zulassen_                                                                                                                                                        |
| `write_file`                | Eine Datei in einen Adapterdateispeicher schreiben – erfordert: _Objekt-/Dateiänderungen zulassen_                                                                                                                                                                                                                                |
| `delete_file`               | Eine Datei aus dem Adapterdateispeicher löschen – erfordert _die Zulassung von Objekt-/Dateiänderungen_                                                                                                                                                                                                                           |
| `rename_file`               | Eine Datei innerhalb desselben Adapter-Dateispeichers umbenennen/verschieben – erfordert _die Berechtigung „Objekt-/Dateiänderungen zulassen“._                                                                                                                                                                                   |
| `mkdir`                     | Erstellen Sie ein Verzeichnis im Adapterdateispeicher – erfordert _die Zulassung von Objekt-/Dateiänderungen_                                                                                                                                                                                                                     |

Der Zugriff auf Objekte/Zustände erfolgt ausschließlich mit den Berechtigungen des konfigurierten **Standardbenutzers** . Die Schreibwerkzeuge werden nur registriert, wenn die entsprechende Berechtigungsoption aktiviert ist.

### Ressourcen & Live-Updates (SSE)

Zustände und Objekte werden auch als MCP- **Ressourcen** unter Verwendung des kanonischen ioBroker-URI-Schemas bereitgestellt, sodass Clients sie lesen und **abonnieren** können. Der Server überträgt Änderungen über den Streamable HTTP SSE-Stream (`notifications/resources/updated`).

- Staaten: `iobstate://<id>` (z.B `iobstate://javascript.0.temperature`) –`resources/read` Rückgaben `{ id, val, ack, ts, lc, q }` Die
- Objekte: `iobobject://<id>` (z.B `iobobject://system.adapter.admin.0`) –`resources/read` Gibt das Objekt zurück.
- Protokolle: `ioblog://all` (jede Quelle) oder `ioblog://<source>` (z.B `ioblog://admin.0`) –`resources/read` gibt die letzten Logzeilen zurück (`{ source, logs: [{ ts, level, source, message }] }` Durch das Abonnieren wird die Protokollweiterleitung für den Adapter aktiviert; jede neue übereinstimmende Zeile löst eine `notifications/resources/updated` Die
- `resources/subscribe` abonniert den zugrunde liegenden ioBroker-Status/das Objekt/das Protokoll; bei jeder Änderung erhält der Client eine `notifications/resources/updated` für diese URI und liest sie erneut. `resources/unsubscribe` stoppt es.

Abonnements werden pro Sitzung verfolgt und referenzgezählt, sodass der Adapter einen Zustand/ein Objekt nur einmal abonniert, unabhängig davon, wie viele Clients/Sitzungen es beobachten, und das Abonnement aufhebt, wenn der letzte Client/die letzte Sitzung die Sitzung verlässt.

(Dateien verwenden `iobfile://<adapter>/<path>` im selben Programm; sie sind über die `read_file` /`write_file` Werkzeuge und nicht als abonnierbare Ressourcen.)

### Gesundheitsendpunkte (nicht MCP)

- `GET /` - Grundlegende Serverinformationen
- `GET /status` - Serverstatus, Betriebszeit und Anzahl aktiver Sitzungen
- `GET /api/info`- Adapterinformationen

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (@GermanBluefox) Added instructions for connecting ChatGPT and Claude (via ioBroker Remote or directly)

### 1.1.6 (2026-09-15)
* (@GermanBluefox) Added IP address selector
* (@GermanBluefox) New option "Mark setting states as destructive" (default on): `set_state`/`set_states` can be declared as non-destructive writes

### 1.1.4 (2026-09-03)
* (@GermanBluefox) `read_file` reads large files in chunks: new optional `offset`/`length` parameters, at most 512 KiB per call by default; the result now contains `size`, `offset`, `length`, `truncated` and `nextOffset` (MCP clients reject tool results above 1 MB, ioBroker/ioBroker.mcp#63)

### 1.1.3 (2026-09-03)
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (@GermanBluefox) Updated packages

### 1.1.2 (2026-08-26)
* (@GermanBluefox) Node.js 22 is required now
* (@GermanBluefox) Corrected OAuth page

### 1.1.0 (2026-08-04)
* (@GermanBluefox) Added OAuth: MCP clients can now be connected through a browser login instead of a manually created token
* (@GermanBluefox) OAuth also works as a web extension, using the host `web` instance as the authorization server (requires OAuth enabled there too)
* (@GermanBluefox) Updated `@iobroker/mcp-server` and `@iobroker/webserver`

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