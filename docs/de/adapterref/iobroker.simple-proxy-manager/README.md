---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.simple-proxy-manager/README.md
title: ioBroker.simple-proxy-manager
hash: UTr88QGjNED57Lb8T4ue3W0L9+s+gBXGYUdLOOyM3mw=
---
![Logo](../../../en/adapterref/iobroker.simple-proxy-manager/admin/simple-proxy-manager.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.simple-proxy-manager.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.simple-proxy-manager.svg)
![Anzahl der Installationen](https://iobroker.live/badges/simple-proxy-manager-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/simple-proxy-manager-stable.svg)
![NPM](https://nodei.co/npm/iobroker.simple-proxy-manager.png?downloads=true)
![Test und Freigabe](https://github.com/lubepi/ioBroker.simple-proxy-manager/workflows/Test%20and%20Release/badge.svg)

# ioBroker.simple-proxy-manager

Einfacher HTTPS/HTTP-Reverse-Proxy-Manager für ioBroker.

## Merkmale

- **HTTPS und HTTP parallel** – beide Server laufen immer.
- **Protokoll pro Host** – Backend mit Zertifikat = HTTPS, ohne Zertifikat = HTTP
- **Zertifikat pro virtuellem Host** – ACME (Let's Encrypt), selbstsignierte oder manuell erstellte Zertifikate
- **Konfigurierbare Backends** über die Admin-Oberfläche
- **IP-Filterung** für interne Dienste (CIDR-basiert, IPv4 + IPv6, mehrere Netzwerke)
- **HTTP → HTTPS-Weiterleitung** mit ACME-Challenge-Weiterleitung
- **Automatisches Neuladen des SSL-Zertifikats** bei ACME-Erneuerung
- **Warnung über abgelaufenes Zertifikat** im Protokoll
- **HSTS** (Strenge Transportsicherheit)
- **WebSocket-Unterstützung** (z. B. für ioBroker Admin)
- **Dual-Stack** IPv4 + IPv6
- Option **„Ursprung ändern“**

## Voraussetzungen

- **Node.js** >= 22
- **ioBroker** mit js-controller >= 6.0.11
- **ACME-Adapter** für automatische SSL-Zertifikate (optional – auch ohne Zertifikate verwendbar)
- Die konfigurierten Ports müssen verfügbar sein (Standardwerte: 80 für HTTP, 443 für HTTPS).

## Konfiguration

### Registerkarte „Allgemein“

| Einstellung                          | Standard | Beschreibung                                                                                          |
| ------------------------------------ | -------- | ----------------------------------------------------------------------------------------------------- |
| HTTPS-Port                           | 443      | Port für HTTPS                                                                                        |
| HTTP-Port                            | 80       | Port für HTTP – Backends ohne Zertifikat werden hier bedient; mit Zertifikat → Weiterleitung zu HTTPS |
| ACME-Adapteranschluss                | 0        | Interner Anschluss des ACME-Adapters (0 = deaktiviert)                                                |
| HSTS aktivieren                      | ✓        | Strict-Transport-Security-Header (nur HTTPS)                                                          |
| HSTS-Maximalalter                    | 31536000 | Gültigkeitsdauer des HSTS in Sekunden (1 Jahr)                                                        |
| Prüfintervall                        | 1        | Wie oft werden die Zertifikate überprüft (Stunden)                                                    |
| Ablaufwarnung                        | 0        | Warnung X Tage vor Ablauf (0 = deaktiviert)                                                           |
| Sicherheitsereignisse protokollieren | ✗        | Zugriffsverweigerungen (IP-Filterung, WebSocket) als Warneinträge protokollieren                      |
| Protokollanfragen                    | ✗        | Jede eingehende Anfrage (IP, Host, URL) als Debug-Einträge protokollieren                             |

### Registerkarte „Backends“

Jedes Backend definiert einen virtuellen Host:

| Feld                    | Beschreibung                                                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aktiv**               | Backend aktivieren/deaktivieren                                                                                                                                      |
| **Hostname**            | Domain, die über DNS auf diesen Server verweist                                                                                                                      |
| **Ziel-URL**            | Backend-Adresse (`http://IP:Port` )                                                                                                                                  |
| **Zertifikat**          | Zertifikat von`system.certificates` **Mit Zertifikat** = HTTPS + automatische HTTP→HTTPS-Weiterleitung. **Ohne Zertifikat** = nur HTTP (kein HTTPS für diesen Host). |
| **Zulässige Netzwerke** | Kommagetrennte CIDR-Netzwerke/IPs (z. B.`192.168.0.0/24, fd00::/8` Leer = Zugriff von überall erlaubt.                                                               |
| **Ursprung ändern**     | Schreiben Sie den Host-Header auf die Ziel-IP-Adresse um.                                                                                                            |

### Beispielkonfiguration

| Hostname               | Ziel-URL                | Zertifikat                               | Zulässige Netzwerke          | Ursprung ändern |
| ---------------------- | ----------------------- | ---------------------------------------- | ---------------------------- | --------------- |
| `website.example.com`  | `http://127.0.0.1:3000` | `acme`                                   | –                            | ✗               |
| `iobroker.example.com` | `http://127.0.0.1:8081` | `default` (von ioBroker selbst signiert) | `192.168.0.0/24`             | ✗               |
| `host.example.com`     | `http://192.168.0.1`    | _(kein Zertifikat)_                      | `192.168.0.0/24, 10.0.0.0/8` | ✓               |

In diesem Beispiel:

- `website.example.com` → **HTTPS** mit Let's Encrypt-Zertifikat, HTTP-Weiterleitungen zu HTTPS
- `iobroker.example.com` → **HTTPS** mit ioBroker-Standardzertifikat (`default` ), nur lokales Netzwerk
- `host.example.com` → **HTTP** (ohne Zertifikat), nur lokales Netzwerk

## Staaten

| Zustand                        | Typ             | Beschreibung                               |
| ------------------------------ | --------------- | ------------------------------------------ |
| `info.connection`              | boolescher Wert | Der Proxy läuft.                           |
| `certificates.<name>.expires`  | Zeichenkette    | Ablaufdatum des Zertifikats (pro Sammlung) |
| `certificates.<name>.daysLeft` | Nummer          | Tage bis zum Ablaufdatum (pro Kollektion)  |

Zertifikatsstatus werden dynamisch für jede verwendete Zertifikatssammlung erstellt (z. B.`certificates.acme.daysLeft` ,`certificates.default.expires` ).

## ACME-Adapterkonfiguration

Der ACME-Adapter muss auf einem anderen Port als 80 laufen, wenn der Proxy auf dem Standardport 80 läuft. ACME-Anfragen werden vom Proxy automatisch an den konfigurierten ACME-Port weitergeleitet.

1. Stellen Sie den ACME-Adapteranschluss auf **8080** (oder einen beliebigen gewünschten Anschluss) ein.
2. Stellen Sie im Proxy-Manager denselben Wert wie für den ACME-Adapterport ein.
3. Geben Sie alle gewünschten Domänen im ACME-Adapter ein.

## Zertifikate

Der Adapter liest Zertifikate von`system.certificates` und bietet drei Arten an:

### 1. Einzelzertifikate nach Namenskonvention

Dies sind Zertifikate, die der Benutzer manuell über die ioBroker-Systemeinstellungen hinzufügen kann. Alle Schlüssel-/Zertifikatspaare werden in`system.certificates → native.certificates` können verwendet werden, sofern sie dieser Namenskonvention folgen:

| Schlüssel       | Inhalt                                                            |
| --------------- | ----------------------------------------------------------------- |
| `{name}Private` | Privater Schlüssel (PEM)                                          |
| `{name}Public`  | Zertifikat (PEM)                                                  |
| `{name}Chained` | Vollständige Zertifikatskette (PEM, bevorzugt gegenüber`Public` ) |

Der Basisname`{name}` Das ist das, was im Dropdown-Menü erscheint und in der Konfiguration gespeichert ist.

> **Beispiel:** Wenn ioBroker die Schlüssel gespeichert hat`myCertPrivate` Und`myCertChained` ,`myCert` wird im Dropdown-Menü erscheinen.

#### Das ioBroker-Standardzertifikat

Das mit ioBroker ausgelieferte selbstsignierte Zertifikat wird unter den Namen gespeichert`defaultPrivate` Und`defaultPublic` In`system.certificates` Es folgt der gleichen Konvention wie jedes andere Zertifikat:

- Basisname:**`default`**
- Wird im Dropdown-Menü angezeigt als`default`
- Ideal für interne Dienste, die kein öffentlich signiertes Zertifikat benötigen.

### 2. ACME-Sammlungen

Let's Encrypt-Zertifikate werden automatisch vom ACME-Adapter generiert. Sie werden gespeichert in`system.certificates → native.collections` unter dem Namen, der der Sammlung in der ACME-Adapterkonfiguration zugewiesen wurde. ACME-Herausforderungen auf Port 80 werden vom Proxy automatisch an den konfigurierten ACME-Port weitergeleitet.

### Pro-Host-Protokoll

Der Adapter entscheidet **pro Backend** , ob HTTPS oder HTTP verwendet wird:

| Backend-Zertifikat | HTTP-Anfrage                 | HTTPS-Anfrage            |
| ------------------ | ---------------------------- | ------------------------ |
| Satz               | 301 Weiterleitung → HTTPS    | Mit SNI-Zertifikat       |
| Leer               | Direkt bereitgestellt (HTTP) | 302 Weiterleitung → HTTP |

Beide Server laufen **parallel** . Jeder Backend-Server kann seine eigene Zertifikatsquelle verwenden. **SNI** (Server Name Indication) wählt während des TLS-Handshakes automatisch das korrekte Zertifikat für den angeforderten Hostnamen aus.

Hosts mit unbekanntem Hostnamen werden auf TLS-Ebene abgewiesen – es wird kein Fallback-Zertifikat verwendet.

Details zum Laden des Zertifikats sind im Debug-Protokoll verfügbar.

## Changelog
### 1.0.0 (2026-07-07)
- (copilot) Adapter requires node.js >= 22 now

### 0.1.10 (2026-04-29)

- Harden error handling: certificate loading, renewal, cleanup and adapter teardown are now individually guarded so a single failure no longer aborts the entire operation
- Fix: register server `error`/`close` handlers before calling `listen()` (correct Node.js pattern)
- Code quality: remove inconsistent `typeof this.terminate` guards, rename misleading `certHashes` to `certPemCache`, fix template literal formatting

### 0.1.9 (2026-04-06)

- Optimize logging behavior: request logs now use debug level, transient backend restart errors are logged as debug with details, and startup logs are less noisy
...
- Harden certificate handling: hosts with configured but unavailable certificates now fail closed for HTTPS/WSS instead of falling back silently
- Improve `info.connection` state handling: state is now true only when both HTTP and HTTPS listeners are active

### 0.1.8 (2026-03-26)
- Update GitHub Actions test matrix (Node.js 20, 22, 24)
- Address reviewer suggestions (use `node:` prefix, specific state roles, interval limiting)
- Fix linting errors

### 0.1.7 (2026-03-20)

- Docs: remove generic installation section per S6014

[Older changelogs can be found there](https://github.com/lubepi/ioBroker.simple-proxy-manager/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 lubepi

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