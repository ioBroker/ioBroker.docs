---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcp/README.md
title: ioBroker.mcp
hash: 1JiRsCG7aexp86doYMxFcPAZjVyK8O1TfBI8OsB2ggE=
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
2. **Web-Erweiterung** – sie läuft innerhalb einer bestehenden[`web`](https://github.com/ioBroker/ioBroker.web) Die Adapterinstanz teilt ihren Webserver (Port, Authentifizierung, SSL). Wählen Sie die Zielwebinstanz in der Administratorkonfiguration aus („Webadapter erweitern“). Der MCP-Endpunkt wird dann über den Webadapter bereitgestellt, z. B. `http(s)://<host>:8082/mcp` Die

   Wenn eine Webinstanz ausgewählt wird, werden die Einstellungen des eigenständigen Servers (Port, Bindungsadresse, Authentifizierung, SSL) ausgeblendet, da sie von der gewählten Instanz übernommen werden. `web` Beispiel.

## Konfiguration

Der Adapter kann über die ioBroker-Admin-Oberfläche mithilfe von JSONConfig konfiguriert werden:

### Serverkonfiguration

- **Webadapter erweitern** : Wählen Sie einen aus `web` Instanz, die als Erweiterung ausgeführt werden soll. Leer lassen, um das Programm eigenständig auszuführen.
- **Port** : Der Port, an dem der Webserver lauscht (Standard: 8093) – nur für Standalone-Systeme
- **Bindungsadresse** : IP-Adresse, an die der Server gebunden werden soll (0.0.0.0 für alle Schnittstellen) – nur für Standalone-Systeme
- **MCP-Server-URL** : Die Adresse, die im MCP-Client eingegeben werden muss, mit einer Schaltfläche zum Kopieren. Im Standalone-Modus wird sie aus SSL, Bindungsadresse und Port dieser Instanz erstellt; als Web-Erweiterung aus SSL, Bindungsadresse und Port des ausgewählten Servers. `web` Instanz (bei „alle Instanzen“ eine URL pro Instanz). Bei OAuth und einer **öffentlichen URL** wird die öffentliche URL verwendet, andernfalls der Hostname aus der Adresse der Admin-Seite.

### Authentifizierung

- **Authentifizierung aktivieren** : Aktivieren Sie die ioBroker-Benutzerauthentifizierung für den Webserver.
- **Standardbenutzer** : Der ioBroker-Benutzer, mit dessen Berechtigungen MCP-Anfragen ausgeführt werden, wenn die Authentifizierung deaktiviert ist (Standard: `admin` Bei aktivierter Authentifizierung wird jede Sitzung mit den Berechtigungen des angemeldeten Benutzers ausgeführt, daher ist dieses Feld dann ausgeblendet. Alle Lese- und Schreibvorgänge von Objekten/Zuständen, die von den Tools durchgeführt werden, erfolgen im Namen dieses Benutzers, sodass dessen Zugriffskontrolllisten (ACLs) durchgesetzt werden. Ein einfacher Name wie `operator` wird automatisch erweitert auf `system.user.operator` Als Web-Erweiterung werden die Authentifizierung und der Standardbenutzer der `web` Instanz anwenden.

### OAuth

MCP-Clients wie Claude Desktop verbinden sich über eine Browseranmeldung anstatt über ein manuell erstelltes Token. Der Client findet den Server selbstständig, der Benutzer meldet sich an und bestätigt die Anmeldung, und der Client sieht niemals das ioBroker-Passwort.

- **OAuth aktivieren (Browser-Login)** : Im Standalone-Modus ist hierfür _die Aktivierung der Authentifizierung_ erforderlich. Als **Web-Erweiterung** muss die ausgewählte Option aktiviert sein. `web` Die Instanz stellt das Login bereit, daher muss OAuth **auch dort** aktiviert sein („Drittanbieterclients zulassen“) – andernfalls erhalten MCP-Clients lediglich eine Weiterleitung zur Anmeldeseite, die sie nicht nutzen können.
- **Öffentliche URL** : Die extern erreichbare Adresse dieses Servers ohne Pfad, z. B. `https://iobroker.example.com` Erforderlich hinter einem Reverse-Proxy: Die für die OAuth-Erkennung veröffentlichten URLs müssen für den Client erreichbar sein. Als Web-Erweiterung muss sie mit der in der Konfiguration festgelegten öffentlichen URL übereinstimmen. `web` Beispiel.
- **Selbstregistrierung von Clients zulassen** : MCP-Clients können sich selbst registrieren (Standard: **aktiviert** ). Ist diese Option deaktiviert, muss jeder Client zunächst manuell registriert werden. Im Web-Extension-Modus ist dies die `web` Die Option ist in den Instanzeinstellungen ausgeblendet.

**HTTPS ist** für alles außer `localhost` — Der Datenfluss läuft über den Browser des Benutzers, und MCP-Clients lehnen einfache Daten ab. `http://` für entfernte Hosts.

Zugriffstoken sind an diesen Endpunkt gebunden, daher wird ein Token, das für einen anderen Dienst auf demselben Server ausgestellt wurde, abgelehnt. Clients können ihre Token über folgende Methode erneut löschen: `POST /oauth/revoke` Die

### Berechtigungen

Alle Optionen, die das System verändern, sind standardmäßig **deaktiviert** ; aktivieren Sie nur die Optionen, die der MCP-Client wirklich benötigt.

**Staaten und Objekte**

- **Zustandseinstellungen zulassen** : MCP-Clients dürfen Zustandswerte schreiben und Systembenachrichtigungen bestätigen (die `set_state`, `set_states` Und `clear_notifications` Tools). Standard: **aktiviert** . Welche Zustände geschrieben werden können, wird durch die ACLs des Benutzers bestimmt, unter dem die Anfrage ausgeführt wird (angemeldeter Benutzer oder Standardbenutzer). `set_states` Überprüft zunächst die Schreibberechtigung aller Zustände und schreibt nichts, wenn einer davon nicht beschreibbar ist.
- **Einstellungen als destruktiv markieren** (`setStateDestructive`): Deklarieren `set_state` Und `set_states` mit `destructiveHint: true` So können MCP-Clients warnen, bevor ein Zustand geschrieben wird. Standard: **aktiviert** . Wenn deaktiviert, werden beide Tools als nicht-destruktive Schreibvorgänge deklariert (`readOnlyHint` Aufenthalte `false` Ob ein Kunde dennoch eine Bestätigung verlangt, hängt dann vom Kunden ab.
- **Objekt-/Dateiänderungen zulassen** (`allowObjectChange`): Erlauben Sie MCP-Clients, Objekte, Aliase und Dateien zu erstellen/zu ändern/zu löschen (die `set_object`, `delete_object`, `create_state`, `create_scene`, `create_alias`, `write_file`, `delete_file`, `rename_file` Und `mkdir` Werkzeuge). Standard: **aus** .

**System**

- **Erlauben Sie die Steuerung von Instanzen** (`allowInstanceControl`): Adapterinstanzen starten, stoppen und neu starten sowie deren Protokollierungsstufe ändern (`start_instance`, `stop_instance`, `restart_instance`, `set_log_level` Standardmäßig: **aus** .
- **Adapterverwaltung zulassen** (`allowAdapterManagement`): Instanzen hinzufügen und löschen sowie Adapter aus dem Repository aktualisieren (`add_instance`, `delete_instance`, `upgrade_adapter` Standardmäßig: **aus** .
- **Skriptänderungen zulassen** (`allowScriptChange`): Erstellen, Ändern, Starten/Stoppen und Löschen von Skripten des JavaScript-Adapters und einmaliges Ausführen von Code (`set_script`, `enable_script`, `delete_script`, `run_script`). Lesen von Drehbüchern (`list_scripts`, `get_script`) ist immer möglich. Skripte werden mit vollem Zugriff auf ioBroker ausgeführt. Standard: **deaktiviert** .
- **Erlauben Sie Nachrichten an Adapter** (`sendToAllowlist`): Adapter (`telegram`) oder Instanzen (`backitup.0`) Die `send_to` Das Tool kann Nachrichten an senden, die durch Kommas getrennt sind; `*` Erlaubt alle. Standardwert: leer, dann ist nichts vorhanden. `send_to` Werkzeug.

**Sicherheit**

- **Bitten Sie vor gefährlichen Handlungen um Bestätigung** (`confirmDangerous` MCP-Clients, die [die Benutzerabfrage](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation) unterstützen, fragen den Benutzer, bevor ein Objekt oder eine Instanz gelöscht, eine Instanz gestoppt, ein Adapter aktualisiert oder installiert, ein Skript gespeichert oder ausgeführt oder eine Nachricht gesendet wird. Clients ohne Benutzerabfrage verlassen sich auf die `destructiveHint` der Werkzeuge und ihrer eigenen Bestätigung. Standard: **ein** .
- **Download-/Upload-Links zulassen** (`transferLinks` Tools können kurzlebige Links für Daten bereitstellen, die zu groß für eine MCP-Nachricht sind (siehe [Große Ergebnisse und Dateien](#large-results-and-files) ). Standardmäßig **aktiviert** .

**Entwickler**

- **Installation von Paketen zulassen (nur für Entwickler)** `allowPackageInstall`): Biete die `install_package` Tool, das ein Adapterpaket auf einem ioBroker-Host installiert – von npm, GitHub, einer URL oder einem `.tgz` Datei - genau wie _Installation von benutzerdefinierter URL / Datei_ in ioBroker.admin (`iobroker url ...` Standardmäßig **deaktiviert** . Diese Option ist nur für Adapterentwickler relevant, z. B. um einem KI-Agenten zu ermöglichen, einen Adapter zu erstellen und ihn mit folgenden Komponenten zu packen: `npm pack` und installieren Sie die `.tgz` auf einem Testsystem. Ein installiertes Paket läuft mit vollen Rechten auf dem Host, daher sollte es niemals auf einem Produktivsystem oder für Kunden aktiviert werden, denen Sie nicht vollständig vertrauen.

**Rechte des ioBroker-Benutzers** Die oben genannten Optionen legen fest, welche Tools verfügbar sind; was ein Aufruf bewirken kann, wird durch die Rechte des ioBroker-Benutzers bestimmt, unter dem die MCP-Sitzung ausgeführt wird (der angemeldete Benutzer oder der Standardbenutzer ohne Authentifizierung), wie in ioBroker.admin:

- die Zugriffskontrolllisten (ACLs) von Objekten, Zuständen und Dateien zum Lesen und Schreiben dieser Objekte,
- die "anderen" Rechte der Benutzergruppen: Befehle auf einem Host **ausführen** (`install_package`, `add_instance`, `delete_instance`, `upgrade_adapter`) und **sendto** für Nachrichten an Adapter (`send_to`, `run_script` Ohne sie wird der Aufruf abgelehnt, bevor irgendetwas ausgeführt wird. Administratoren haben alle Rechte.

Einer Sitzung werden nicht einmal die Werkzeuge angeboten, die ein Recht benötigen, das den Gruppen ihrer Benutzer fehlt: ohne das Schreibrecht für Zustände nein `set_state` /`set_states`, ohne das Schreibrecht für Objekte nein `set_object`, `create_state`, `start_instance`, ..., ohne das Löschrecht für Staaten Nr. `delete_orphan_states`, ohne Schreibrecht für Dateien nein `write_file`, ohne **ausführen** nein `install_package`, ohne **sendto** no `send_to` Die Rechte werden beim Start der Sitzung eingelesen; jeder Aufruf wird ohnehin überprüft.

`check_permissions` zeigt diese Rechte und die ACLs der jeweiligen Objekte an.

**Protokoll** Jeder Aufruf eines Änderungswerkzeugs wird auf Informationsebene mit dem Benutzer, dem Werkzeug und seinen Argumenten protokolliert (`MCP system.user.admin: set_state(id="hue.0.light.state", value=true)`), und jeder fehlgeschlagene Aufruf wird als Warnung mit denselben Details ausgegeben. Lange Werte werden gekürzt; Dateiinhalte, Skriptcode und `send_to` Die Nutzlasten werden durch ihre Größe ersetzt.

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
3. Verwenden Sie die URL `https://<your public address>/mcp` Im Client und melden Sie sich mit einem ioBroker-Benutzer an.

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

Dann führe aus `/mcp` In Claude Code auswählen `iobroker` und melde dich im Browser an.

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

- Lassen Sie die KI sich mit einem ioBroker-Benutzer anmelden, der nur über die benötigten Rechte verfügt, oder legen Sie einen solchen Benutzer ohne Authentifizierung als **Standardbenutzer** fest. Jedes Tool wird mit seinen Berechtigungen ausgeführt.
- Lassen Sie **„Objekt-/Dateiänderungen zulassen“** deaktiviert, es sei denn, Sie benötigen diese Option.
- Aktivieren Sie die **Systemoptionen** (Instanzen, Adapter, Skripte, Nachrichten) nur für vertrauenswürdige Clients und nur für die benötigten. Bei der **Option „Nachrichten an Adapter zulassen“** müssen die Adapter explizit angegeben werden. `*` Die
- Lassen Sie **die Option „Paketinstallation zulassen“** deaktiviert. Diese ist nur für Adapterentwickler auf Testsystemen gedacht.
- Lassen Sie **die Markierungseinstellungen auf destruktiv eingestellt** und **fragen Sie vor gefährlichen Aktionen nach einer Bestätigung** , damit die Kunden fragen, bevor sie etwas ändern oder umschalten.

## MCP-Endpunkt

Der MCP-Server ist unter folgender Adresse erreichbar: `POST/GET/DELETE /mcp` unter Verwendung des Streamable-HTTP-Transports mit sitzungsbezogenem Status (verfolgt über den `Mcp-Session-Id` Kopfzeile). Richten Sie Ihren MCP-Client auf Folgendes:

- eigenständig: `http(s)://<host>:<port>/mcp`
- Weberweiterung: `http(s)://<host>:<webPort>/mcp`

### Verfügbare Werkzeuge

| Werkzeug                    | Beschreibung                                                                                                                                                                                                                                                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `get_states`                | Ruft den aktuellen Wert eines oder mehrerer Zustände ab; IDs können Platzhalter enthalten (z. B. `hue.0.*.brightness`); eine ID ohne Status wird zurückgegeben mit `exists: false` oder ein Hinweis                                                                                                                                 |
| `wait_for_state`            | Warten Sie, bis ein Staat ein `value` (oder, ohne `value` (bis zur Aktualisierung), optional nur mit `ack`; gibt auf nach `timeout` Sekunden (Standard 30, höchstens 50) mit `reached: false`                                                                                                                                         |
| `find_orphan_states`        | Finde Zustände ohne Objekt (z. B. `system.adapter.vis.0.alive` einer gelöschten Instanz) anhand einer ID `pattern` mit Ausnahme des Upload-Fortschritts `system.adapter.<adapter>.upload`, die absichtlich kein Objekt haben; löschen Sie sie mit `delete_orphan_states` oder auf dem Host mit `iobroker state del <id>`              |
| `get_object`                | Ein einzelnes Objekt wird anhand seiner ID gelesen; ein Objekt, das zu groß für eine einzelne Antwort ist, wird in Base64-Teile zerlegt. `offset`, überprüft mit `sha256` (für Clients, die Code ausführen können)                                                                                                                  |
| `check_permissions`         | Zeigen Sie den Benutzer und die Gruppen der MCP-Sitzung, die Rechte ihrer Gruppen und, für gegebene Objekt-IDs, ob sie das Objekt lesen/schreiben/löschen und den Zustand lesen/schreiben dürfen.                                                                                                                                  |
| `search_objects`            | Objekte/Zustände anhand von Schlüsselwörtern durchsuchen (Abgleich von ID und Name); optionale Filter für Objekte `type`, `role`, `room` und Quelle `adapter` Beispiel                                                                                                                                                               |
| `list_devices`              | Listet erkannte Geräte gruppiert nach Raum auf (nutzt den ioBroker-Typdetektor, um funktionale Geräte mit benannten Steuerelementen anzuzeigen); optional `language` Und `room` Filter                                                                                                                                               |
| `list_instances`            | Liste der Adapterinstanzen mit ihrem Status                                                                                                                                                                                                                                                                                        |
| `list_adapters`             | Liste der installierten Adapter mit Metadaten (Version, Titel, Beschreibung, Schlüsselwörter)                                                                                                                                                                                                                                      |
| `search_adapter_repository` | Durchsuchen Sie das ioBroker-Adapter **-Repository** (alle _installierbaren_ Adapter, nicht nur die installierten) anhand eines Stichworts; optional `type` Kategorie, `onlyNotInstalled` Und `language` Filter – Verwenden Sie diese Funktion, um zu empfehlen, welcher Adapter für ein Gerät/einen Dienst installiert werden soll.  |
| `list_hosts`                | Liste der ioBroker-Hosts mit ihrem Status                                                                                                                                                                                                                                                                                          |
| `list_rooms`                | Liste der Zimmer (`enum.rooms.*`) mit lokalisierten Namen und Mitgliederdetails; optional `language` Und `withIcons`                                                                                                                                                                                                               |
| `list_functions`            | Listenfunktionen (`enum.functions.*`) mit lokalisierten Namen und Mitgliederdetails; optional `language` Und `withIcons`                                                                                                                                                                                                           |
| `history_query`             | Historische Werte abfragen (erfordert einen Verlaufsadapter); Aggregationen: `raw`, `min`, `max`, `avg`, `sum`, `count`, `minmax`, `percentile`, `quantile`, `integral`                                                                                                                                                            |
| `read_file`                 | Eine Datei aus einem Adapter-Dateispeicher lesen (optional Base64); große Dateien in Blöcken lesen über `offset` /`length`; `download: true` gibt stattdessen einen Download-Link zurück                                                                                                                                            |
| `list_files`                | Ein Verzeichnis in einem Adapterdateispeicher auflisten                                                                                                                                                                                                                                                                            |
| `file_exists`               | Prüfen, ob eine Datei im Dateispeicher des Adapters vorhanden ist.                                                                                                                                                                                                                                                                 |
| `get_logs`                  | Aktuelle ioBroker-Protokollzeilen abrufen; optionale Filter nach `level` (Fehler/Warnung/Info/Debug), Quelle `adapter`, Startzeit (`from_ts`) Und `search` in der Nachricht (Text oder `/regex/flags`); `logFile` Zeigt den Zeitpunkt der letzten Zeile und die Dateigröße an                                                        |
| `write_log`                 | Schreibe eine Nachricht in das ioBroker-Protokoll.                                                                                                                                                                                                                                                                                 |
| `system_info`               | System- und JS-Controller-Informationen abrufen                                                                                                                                                                                                                                                                                    |
| `list_adapter_updates`      | Liste der installierten Adapter auf, für die eine neuere Version im aktiven Repository verfügbar ist.                                                                                                                                                                                                                              |
| `list_notifications`        | Listen Sie die Systembenachrichtigungen der Hosts auf (die Glocke im Adminbereich): Speicherplatzmangel, defekte Adapter, ...                                                                                                                                                                                                      |
| `list_scripts`              | Listen Sie die Skripte des JavaScript-Adapters auf (ohne Quellcode).                                                                                                                                                                                                                                                               |
| `get_script`                | Lesen Sie ein Skript einschließlich seines Quellcodes; ein langer Quellcode wird abschnittsweise gelesen. `offset` /`length` — das Ergebnis trägt `size`, `truncated` Und `nextOffset`                                                                                                                                               |
| `ping_host`                 | Verbindungsaufbau zu einem Netzwerkgerät diagnostizieren: ICMP-Ping an `host` plus eine optionale TCP-Verbindung zu `port` — nützlich, um den Adapter zu untersuchen `ETIMEDOUT` /Verbindungsfehler                                                                                                                                   |
| `set_state`                 | Den Wert eines Zustands festlegen (Wert wird in den Zustandstyp umgewandelt); mit `wait_ack` (Sekunden) Es wartet, bis das Gerät den Befehl bestätigt (`ack: true`) und gibt den bestätigten Status zurück — erfordert _die Zulassung zum Festlegen von Status_                                                                    |
| `set_states`                | Mehrere Zustände in einem Anruf festlegen (für Szenen-/Gruppenaktionen wie „Alle Lichter aus“) – erfordert _die Zulassung zum Festlegen von Zuständen_                                                                                                                                                                             |
| `clear_notifications`       | Systembenachrichtigungen bestätigen, optional für einen bestimmten Bereich/eine bestimmte Kategorie/eine bestimmte Instanz – erfordert _die Einstellung „Zulassen“._                                                                                                                                                               |
| `set_object`                | Objekt erstellen/aktualisieren (zusammengeführte Common/Native-Funktionen) – erfordert die _Berechtigung „Objekt-/Dateiänderungen zulassen“._                                                                                                                                                                                      |
| `delete_object`             | Ein Objekt löschen, optional mit allen untergeordneten Objekten – erfordert _die Zulassung von Objekt-/Dateiänderungen_                                                                                                                                                                                                            |
| `delete_orphan_states`      | Zustände ohne Objekt löschen, die durch ihre IDs oder durch Muster wie `system.adapter.vis.0.*` Jeder Zustand wird zunächst erneut geprüft, sodass ein Zustand mit einem Objekt und dem Upload-Fortschritt eines Adapters niemals gelöscht wird – erfordert die _Option „Objekt-/Dateiänderungen zulassen“._                        |
| `create_state`              | Erstelle ein neues Zustandsobjekt mit Typ/Rolle/Einheit/Min./Max. und optionalem Anfangswert – erfordert _die Berechtigung „Objekt-/Dateiänderungen zulassen“._                                                                                                                                                                    |
| `create_scene`              | Erstellen oder Aktualisieren einer Szene für den ioBroker `scenes` Adapter (Zustands-/Wertpaare werden gemeinsam angewendet) — erfordert _Objekt-/Dateiänderungen zulassen_                                                                                                                                                         |
| `create_alias`              | Erstellen Sie einen Alias (`alias.0.*`) verweist auf einen Zustand, optional mit einem separaten Schreibzustand — erfordert _Änderungen an Objekten/Dateien zulassen_                                                                                                                                                             |
| `write_file`                | Eine Datei in einen Adapterdateispeicher schreiben, von `content` oder aus einer Datei, die über `prepare_upload` (`upload_id`) — erfordert _Änderungen an Objekten/Dateien zulassen_                                                                                                                                               |
| `delete_file`               | Eine Datei aus dem Adapterdateispeicher löschen – erfordert _die Zulassung von Objekt-/Dateiänderungen_                                                                                                                                                                                                                            |
| `rename_file`               | Eine Datei innerhalb desselben Adapter-Dateispeichers umbenennen/verschieben – erfordert _die Berechtigung „Objekt-/Dateiänderungen zulassen“._                                                                                                                                                                                    |
| `mkdir`                     | Erstellen Sie ein Verzeichnis im Adapterdateispeicher – erfordert _die Zulassung von Objekt-/Dateiänderungen_                                                                                                                                                                                                                      |
| `prepare_upload`            | Einen einmaligen Upload-Link für eine Datei abrufen, die zu groß für ein Tool-Argument ist (z. B. eine `.tgz` Für Clients, die Shell-Befehle ausführen können – erfordert _die Aktivierung von „Download-/Upload-Links zulassen“_ und _„Objekt-/Dateiänderungen zulassen“_ oder _„Installation von Paketen zulassen“._              |
| `install_package`           | Installieren Sie ein Adapterpaket (npm, GitHub, URL, `.tgz` aus dem Dateispeicher, als Base64 oder hochgeladen über `prepare_upload` Auf einem Host die aktivierten Instanzen neu starten und melden, ob sie gestartet wurden (mit ihren ersten Logzeilen) – erfordert _die Installation von Paketen zulassen_ (nur für Entwickler). |
| `start_instance`            | Eine Instanz starten (aktivieren) – erfordert _die Berechtigung zum Steuern von Instanzen_                                                                                                                                                                                                                                         |
| `stop_instance`             | Instanz stoppen (deaktivieren) – erfordert die _Option „Steuerung von Instanzen zulassen“._                                                                                                                                                                                                                                        |
| `restart_instance`          | Eine laufende Instanz neu starten – erfordert _die Berechtigung zum Steuern von Instanzen_                                                                                                                                                                                                                                         |
| `set_log_level`             | Ändern Sie den Protokollierungsgrad einer Instanz, temporär oder dauerhaft – erfordert _die Berechtigung zum Steuern von Instanzen._                                                                                                                                                                                               |
| `add_instance`              | Erstellen Sie eine Instanz eines Adapters aus dem Repository (`iobroker add`) — erfordert die _Option „Adapterverwaltung zulassen“_                                                                                                                                                                                               |
| `delete_instance`           | Löschen Sie eine Instanz mit ihren Objekten und Zuständen (`iobroker del`) — erfordert die _Option „Adapterverwaltung zulassen“_                                                                                                                                                                                                  |
| `upgrade_adapter`           | Aktualisieren Sie einen Adapter auf das Repository oder eine bestimmte Version (`iobroker upgrade`) — erfordert die _Option „Adapterverwaltung zulassen“_                                                                                                                                                                         |
| `set_script`                | Erstellen Sie ein JavaScript-/TypeScript-Skript oder ändern Sie dessen Quellcode – erfordert die _Option „Skriptänderungen zulassen“._                                                                                                                                                                                             |
| `enable_script`             | Skript starten oder stoppen – erfordert die _Option „Änderung von Skripten zulassen“._                                                                                                                                                                                                                                             |
| `delete_script`             | Skript löschen – erfordert die _Option „Änderung von Skripten zulassen“_ .                                                                                                                                                                                                                                                         |
| `run_script`                | Führe den Code einmalig im JavaScript-Adapter aus und gib dessen Log-Ausgabe zurück (JavaScript ≥ 10.1.0) – erfordert _die Aktivierung der Skriptänderungsberechtigung._                                                                                                                                                           |
| `send_to`                   | Sende eine Nachricht an eine Adapterinstanz (`sendTo`) und die Antwort zurückgeben – nur Instanzen in _„Nachrichten an Adapter zulassen“_                                                                                                                                                                                         |

Der Zugriff auf Objekte und Zustände erfolgt mit den Berechtigungen des angemeldeten Benutzers oder des **Standardbenutzers** ohne Authentifizierung. Schreibwerkzeuge werden nur registriert, wenn die entsprechende Berechtigungsoption aktiviert ist, und nur Benutzern angeboten, deren Gruppen über die erforderlichen Rechte verfügen.

### Große Ergebnisse und Dateien

MCP-Clients lehnen Tool-Ergebnisse ab, die größer als 1 MiB sind, und ein Modell kann keine Megabytes an Base64-Daten als Tool-Argument übergeben. Daher:

- **Alle Ergebnisse bleiben unterhalb des Grenzwerts.** Listen (`get_states`, `search_objects`, `list_files`, `list_scripts`, `history_query`) so viele Einträge wie möglich zurückgeben und hinzufügen `truncated`, `total`, `nextOffset` und ein `hint`; rufen Sie erneut an mit `offset` eingestellt auf `nextOffset` für den nächsten Teil. `get_logs` Die neuesten Zeilen werden beibehalten. Alle anderen Ergebnisse, die zu groß sind, werden durch einen Download-Link oder eine Fehlermeldung ersetzt, die zur Eingrenzung der Anfrage auffordert.
- **Große Skripte und Objekte in Teilen** : `get_script` mit `offset` (beginnen Sie mit `0`) gibt die Quelle in Teilen von höchstens `length` Bytes (Standardwert 512 KiB, weniger, falls die Escape-Sequenz das Limit überschreiten würde) mit `size`, `truncated` Und `nextOffset`, wie `read_file` Die `get_object` mit `offset` Gibt das gesamte Objekt-JSON in Base64-kodierten Teilen zurück. Für Clients, die Code ausführen können, aber keine Download-Links erhalten: Weiter mit `offset` eingestellt auf `nextOffset` und die `sha256` Im ersten Teil wird der SHA-256-Hash der zusammengefügten Bytes geprüft, bevor diese analysiert werden. Jeder Teil liest das Objekt erneut mit den Rechten des Sitzungsbenutzers; falls sich das Objekt zwischenzeitlich geändert hat, schlägt der Aufruf fehl und der Lesevorgang beginnt von vorn.
- **Download-Links** (`download_url`): Eine Schnittliste enthält einen Link zu allen ihren Einträgen als JSON-Objekt, und `read_file` mit `download: true` Gibt einen Link zur gesamten Datei zurück. Clients, die Shell-Befehle ausführen können (z. B. Claude Code), rufen sie mit folgendem Befehl ab: `curl -o <file> "<download_url>"` Die
- **Upload-Links** : `prepare_upload` gibt einen Link und ein `upload_id` Der Client lädt die Datei hoch mit `curl -T <file> "<url>"` (`PUT` oder `POST`, Rohdaten, bis zu 100 MB) und übergibt die `upload_id` Zu `write_file` oder `install_package` Ein Link kann nur einmal verwendet werden. Auf diese Weise kann ein KI-Agent eine Installation durchführen. `.tgz` Es wurde gebaut mit `npm pack` Die

Die Links sind `<mcp endpoint>/transfer/<token>` Das zufällig generierte Token dient als Anmeldeinformation und funktioniert daher ohne Anmeldung am MCP-Endpunkt. Es ist 15 Minuten gültig. Als Web-Erweiterung mit aktivierter Authentifizierung im Webadapter ist es nicht verfügbar, da der Webadapter zunächst eine Anmeldung erfordert; die Tools geben dies anschließend aus.

### Aufforderungen

MCP-Clients bieten diese als vorgefertigte Befehle an (z. B. als Slash-Befehle):

- `diagnose_adapter` (`instance`) - Finden Sie heraus, warum eine Instanz nicht funktioniert: Status, Protokoll, Benachrichtigungen, Konnektivität und verfügbare Updates.
- `room_overview` (`room`) - Zusammenfassung der Ausstattung eines Zimmers und aller Ungewöhnlichkeiten.
- `create_automation` (`description`) - eine Beschreibung in ein Skript für den JavaScript-Adapter umwandeln.

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
- `GET /api/info` - Adapterinformationen

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (@GermanBluefox) `get_script` returns a long source in parts (`offset`, `length`), like `read_file` (`@iobroker/mcp-server` 1.10.0)
* (@MarcoHe85) `get_object` returns an object that is too large for one answer in base64 parts (`offset`, `length`), checked with SHA-256 (`sha256`), for clients that get no download links (`@iobroker/mcp-server` 1.10.0)
* (@GermanBluefox) `list_devices`: a name (`smartName` without `smartType`) on one state of a detected device names that device instead of splitting the state off as a device of its own, and a room or function hidden from the smart home (`smartName: false`) is still the room or function of its devices (`@iobroker/mcp-server` 1.9.2)

### 1.8.1 (2026-10-27)
* (@GermanBluefox) Fixed: js-controller usually killed the instance with SIGKILL when stopping it, because the adapter never closed its server and the connections of the MCP clients

### 1.8.0 (2026-10-27)
* (@GermanBluefox) New tool `delete_orphan_states`: deletes the states without object found by `find_orphan_states`, but never a state with an object (`@iobroker/mcp-server` 1.9.0)

### 1.7.1 (2026-10-26)
* (@GermanBluefox) `find_orphan_states` no longer reports the upload progress of the adapters (`system.adapter.<adapter>.upload`), which js-controller writes without object on purpose (`@iobroker/mcp-server` 1.8.1)

### 1.7.0 (2026-10-26)
* (@GermanBluefox) Security: commands on a host need the "execute" right of the user, messages to adapters the "sendto" right, like in admin; a session is only offered the tools its user has the rights for (`@iobroker/mcp-server` 1.8.0)
* (@GermanBluefox) Every change made via MCP is logged with the user, the tool and its arguments; `get_logs` searches the messages for a text or a regular expression (`@iobroker/mcp-server` 1.8.0)
* (@GermanBluefox) `set_state` can wait for the confirmation of the device (`wait_ack`); new tools `wait_for_state` and `find_orphan_states` (`@iobroker/mcp-server` 1.8.0)
* (@GermanBluefox) `install_package` reports a done installation even if the instances could not be restarted afterwards (`@iobroker/mcp-server` 1.8.0)

### 1.6.2 (2026-10-26)
* (@GermanBluefox) Fixed: `get_logs` always returned `size: null` for the log file (`@iobroker/mcp-server` 1.7.1)

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