---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.simple-proxy-manager/README.md
title: ioBroker.simple-proxy-manager
hash: AXJ5+qdVDCaAJSme9gf8iiT473qK0tuzbMm7Q84d4h4=
---
![Logo](../../../en/adapterref/iobroker.simple-proxy-manager/admin/simple-proxy-manager.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.simple-proxy-manager.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.simple-proxy-manager.svg)
![Anzahl der Installationen](https://iobroker.live/badges/simple-proxy-manager-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/simple-proxy-manager-stable.svg)
![NPM](https://nodei.co/npm/iobroker.simple-proxy-manager.png?downloads=true)

# IoBroker.simple-proxy-manager
**Tests:** [![Test und Release](https://github.com/lubepi/ioBroker.simple-proxy-manager/workflows/Test%20and%20Release/badge.svg)](https://github.com/lubepi/ioBroker.simple-proxy-manager/actions?query=workflow%3A%22Test+and+Release%22)

Einfacher HTTPS/HTTP-Reverse-Proxy-Manager für ioBroker.

## Merkmale
- **HTTPS + HTTP parallel** – beide Server laufen immer.
- **Pro Host Protokoll** – Backend mit Zertifikat = HTTPS, ohne Zertifikat = HTTP
- **Zertifikat pro virtuellem Host** – ACME (Let's Encrypt), selbstsignierte oder manuell erstellte Sammlungen
- **Konfigurierbare Backends** über die Admin-Oberfläche
- **IP-Filterung** für interne Dienste (CIDR-basiert, IPv4 + IPv6, mehrere Netzwerke)
- **HTTP → HTTPS-Weiterleitung** mit ACME-Challenge-Weiterleitung
- **Automatische Neuladung des SSL-Zertifikats** bei ACME-Erneuerung
- **Warnung vor Ablauf des Zertifikats** im Protokoll
- **HSTS** (Strenge Transportsicherheit)
- **WebSocket-Unterstützung** (z. B. für ioBroker Admin)
- **Dual-Stack** IPv4 + IPv6
- Option **Ursprung ändern**

## Voraussetzungen
- **Node.js** >= 22
- **ioBroker** mit js-controller >= 6.0.11
- **ACME-Adapter** für automatische SSL-Zertifikate (optional – auch ohne Zertifikate verwendbar)
- Die konfigurierten Ports müssen verfügbar sein (Standardwerte: 80 für HTTP, 443 für HTTPS)

## Konfiguration
### Registerkarte "Allgemein"
| Einstellung | Standard | Beschreibung |
| ------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| HTTPS-Port | 443 | Port für HTTPS |
| HTTP-Port | 80 | Port für HTTP – Backends ohne Zertifikat werden hier bedient; mit Zertifikat → Weiterleitung zu HTTPS |
| ACME-Adapteranschluss | 0 | Interner Anschluss des ACME-Adapters (0 = deaktiviert) |
| HSTS aktivieren | ✓ | Strict-Transport-Security-Header (nur HTTPS) |
| HSTS-Maximalalter | 31536000 | HSTS-Gültigkeitsdauer in Sekunden (1 Jahr) |
| Prüfintervall | 1 | Wie oft werden Zertifikate geprüft (Stunden) |
| Ablaufwarnung | 0 | Warnung X Tage vor Ablauf (0 = deaktiviert) |
| Sicherheitsereignisse protokollieren | ✗ | Verweigerten Zugriff (IP-Filterung, WebSocket) als Warnmeldungen protokollieren |
| Anfragen protokollieren | ✗ | Jede eingehende Anfrage (IP, Host, URL) als Debug-Einträge protokollieren |

### Registerkarte "Backends"
Jedes Backend definiert einen virtuellen Host:

| Feld | Beschreibung |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Aktiv** | Backend aktivieren/deaktivieren |
| **Hostname** | Domain, die über DNS auf diesen Server verweist |
| **Ziel-URL** | Backend-Adresse (`http://IP:Port`) |
| **Zulässige Netzwerke** | Durch Kommas getrennte CIDR-Netzwerke/IPs (z. B. `192.168.0.0/24, fd00::/8`). Leer = Zugriff von überall erlaubt. |
| **Zulässige Netzwerke** | Durch Kommas getrennte CIDR-Netzwerke/IPs (z. B. `192.168.0.0/24, fd00::/8`). Leer = Zugriff von überall erlaubt. |
| **Ursprung ändern** | Den Host-Header auf die Ziel-IP-Adresse umschreiben |

### Beispielkonfiguration
| Hostname | Ziel-URL | Zertifikat | Zulässige Netzwerke | Ursprung ändern |
| ---------------------- | ----------------------- | -------------------------------- | ---------------------------- | ------------- |
| `website.example.com` | `http://127.0.0.1:3000` | `acme` | – | ✗ |
| `host.example.com` | `http://192.168.0.1` | _(kein Zertifikat)_ | `192.168.0.0/24, 10.0.0.0/8` | ✓ |
| `host.example.com` | `http://192.168.0.1` | _(kein Zertifikat)_ | `192.168.0.0/24, 10.0.0.0/8` | ✓ |

In diesem Beispiel:

- `website.example.com` → **HTTPS** mit Let's Encrypt-Zertifikat, HTTP-Weiterleitungen zu HTTPS
- `iobroker.example.com` → **HTTPS** mit ioBroker-Standardzertifikat (`default`), nur lokales Netzwerk
- `host.example.com` → **HTTP** (kein Zertifikat), nur lokales Netzwerk

## Staaten
| Bundesland | Typ | Beschreibung |
| ------------------------------ | ------- | ----------------------------------------------- |
| `info.connection` | Boolescher Wert | Proxy läuft |
| `certificates.<name>.daysLeft` | Anzahl | Tage bis zum Ablauf (pro Sammlung) |
| `certificates.<name>.daysLeft` | Nummer | Tage bis zum Ablauf (pro Sammlung) |

Für jede verwendete Zertifikatssammlung werden dynamisch Zertifikatszustände erstellt (z. B. `certificates.acme.daysLeft`, `certificates.default.expires`).

## ACME-Adapterkonfiguration
Der ACME-Adapter muss auf einem anderen Port als 80 laufen, wenn der Proxy auf dem Standardport 80 läuft. ACME-Anfragen werden vom Proxy automatisch an den konfigurierten ACME-Port weitergeleitet.

1. Stellen Sie den ACME-Adapteranschluss auf **8080** (oder einen beliebigen gewünschten Anschluss) ein.
2. Stellen Sie im Proxy-Manager denselben Wert wie für den ACME-Adapterport ein.
3. Geben Sie alle gewünschten Domänen im ACME-Adapter ein.

## Zertifikate
Der Adapter liest Zertifikate von `system.certificates` und bietet drei Typen an:

### 1. Einzelzertifikate nach Namenskonvention
Dies sind Zertifikate, die der Benutzer manuell über die ioBroker-Systemeinstellungen hinzufügen kann. Alle in `system.certificates → native.certificates` gespeicherten Schlüssel-/Zertifikatpaare können verwendet werden, sofern sie dieser Namenskonvention entsprechen:

| Legende | Inhalt |
| --------------- | ----------------------------------------------------- |
| `{name}Private` | Privater Schlüssel (PEM) |
| `{name}Chained` | Vollständige Zertifikatskette (PEM, bevorzugt gegenüber `Public`) |
| `{name}Chained` | Vollständige Zertifikatskette (PEM, bevorzugt gegenüber `Public`) |

Der Basisname `{name}` wird in der Dropdown-Liste angezeigt und in der Konfiguration gespeichert.

> **Beispiel:** Wenn ioBroker die Schlüssel `myCertPrivate` und `myCertChained` gespeichert hat, > wird `myCert` in der Dropdown-Liste angezeigt.

#### Das ioBroker-Standardzertifikat
Das mit ioBroker ausgelieferte selbstsignierte Zertifikat ist unter den Namen `defaultPrivate` und `defaultPublic` in `system.certificates` gespeichert. Es folgt der gleichen Konvention wie jedes andere Zertifikat:

- Basisname: **`default`**
- Wird in der Dropdown-Liste als `Standard` angezeigt
- Ideal für interne Dienste, die kein öffentlich signiertes Zertifikat benötigen

### 2. ACME-Sammlungen
Let's Encrypt-Zertifikate werden automatisch vom ACME-Adapter generiert. Sie werden im Ordner `system.certificates → native.collections` unter dem in der ACME-Adapterkonfiguration vergebenen Namen gespeichert. ACME-Herausforderungen auf Port 80 werden vom Proxy automatisch an den konfigurierten ACME-Port weitergeleitet.

### Protokoll pro Host
Der Adapter entscheidet **pro Backend**, ob HTTPS oder HTTP verwendet wird:

| Backend-Zertifikat | HTTP-Anfrage | HTTPS-Anfrage |
| ------------------- | ---------------------- | --------------------------- |
| Festlegen | 301-Weiterleitung → HTTPS | Mit SNI-Zertifikat bereitgestellt |
| Leer | Direktzugriff (HTTP) | 302 Weiterleitung → HTTP |

Beide Server laufen **parallel**. Jeder Backend-Server kann seine eigene Zertifikatsquelle verwenden. **SNI** (Server Name Indication) wählt während des TLS-Handshakes automatisch das korrekte Zertifikat für den angeforderten Hostnamen aus.

Hosts mit unbekanntem Hostnamen werden auf TLS-Ebene abgewiesen – es wird kein Fallback-Zertifikat verwendet.

Details zum Laden des Zertifikats sind im Debug-Protokoll verfügbar.

## Changelog
### **WORK IN PROGRESS**
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

### 0.1.6 (2026-03-16)

- Add rich README header with badges and logo
- Update release workflow documentation
- Switch to NPM Trusted Publishing

[Older changelogs can be found there](CHANGELOG_OLD.md)

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