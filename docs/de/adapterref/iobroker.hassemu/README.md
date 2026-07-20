---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hassemu/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hassemu@main/admin/hassemu.svg" width="48" align="top" /> ioBroker.hassemu
hash: /lJG327SVBLROodZOHrPZr6Y++7D0fw3o4O92npA/kU=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hassemu@main/admin/hassemu.svg" width="48" align="top" /> ioBroker.hassemu

![npm-Version](https://img.shields.io/npm/v/iobroker.hassemu)
![stabil](https://iobroker.live/badges/hassemu-stable.svg)
![Installationen](https://iobroker.live/badges/hassemu-installed.svg)
![npm-Downloads](https://img.shields.io/npm/dt/iobroker.hassemu)
![Knoten](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Typoskript](https://img.shields.io/badge/TypeScript-strict-blue)
![Lizenz](https://img.shields.io/badge/license-MIT-green)
![Posten](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Emuliert einen Home Assistant-Server, sodass Anzeigen, die nur ein HA-Dashboard akzeptieren, stattdessen jede beliebige Web-URL anzeigen.

---

## Wozu dient es?
Das Display schließt das HA-Onboarding ab und zeigt dann die jeweilige Web-URL an, auf die Sie es verweisen – VIS, VIS-2, Aura, Grafana, Node-RED, alles, was HTTP ist.

Typische Clients: Shelly Wall Display-Familie (integrierte HA-Seite; geräteinterne HA-App ab Firmware 2.6.0), Home Assistant Companion App (Android-Wandpanels, per Sideloading installierte Apps). Alle Geräte, die denselben HA-Onboarding-Prozess verwenden, sollten funktionieren. Falls es bei Ihnen nicht klappt, erstellen Sie bitte ein Ticket mit dem Trace des fehlerhaften Endpunkts.

---

## Merkmale
- Eine URL pro Anzeige oder eine globale URL für alle
- Automatische Erkennung über mDNS sowie automatische Erkennung jeder auf dem Host installierten VIS / VIS-2 / Aura-Instanz (siehe [Unterstützte Dashboards](#supported-dashboards) unten)
- Zwei parallele HA-Anmeldevorgänge – der klassische JSON-Anmeldevorgang `login_flow` für ältere Clients sowie der Browser-OAuth2-Ablauf, der von der geräteinternen HA-App auf Shelly Wall Display 2.6.0+ verwendet wird.
- Emulation der Registrierung für die mobile App, damit die HA Companion App das Onboarding abschließt
- Cookie-basiert: Displays behalten ihre URL auch nach Neustarts, IP-Änderungen und Umbenennungen bei.

---

## Wächter / Fehlerberichterstattung
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Die Meldung erfolgt nur, wenn Sie die Fehlerberichterstattung in den ioBroker-Diagnoseeinstellungen aktiviert haben (Systemeinstellungen → Diagnose und Fehlerberichterstattung). Es wird lediglich eine anonyme Installations-ID übermittelt – kein Name, keine E-Mail-Adresse und keine IP-Adresse.

Einzelheiten und Hinweise zur Deaktivierung finden Sie in Abschnitt [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Für die Fehlerberichterstattung ist js-controller 3.0 oder neuer erforderlich.

---

## Unterstützte Dashboards
Das Modus-Dropdown-Menü erkennt automatisch, welche Komponenten auf Ihrem ioBroker-Host installiert sind. Sie haben jederzeit die Möglichkeit, eine beliebige andere HTTP-URL als `manual` einzufügen.

| Quelle | Was wird entdeckt? | Anmerkungen |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ioBroker VIS** (`vis.0`+) | Ein Eintrag pro Projekt, plus ein Eintrag pro Ansicht innerhalb jedes Projekts | Funktioniert mit jeder `web.*`-Instanz – mehrere Webinstanzen erhalten ein `(web.X)`-Suffix am Label |
| **ioBroker Aura** (`aura.0`+) | Ein Eintrag pro laufender Aura-Instanz, der auf deren Frontend verweist | Liest den in Aura konfigurierten Wert für `native.port` (Standardwert 8095, ignoriert den fest codierten Wert in der Aura-Vorlage für `localLinks`) — funktioniert mit den Überschreibungen für `https` und `customUrl` |
| **Admin-Kacheln** | Alles, was ein Adapter über `common.localLinks` / `common.welcomeScreen` ankündigt (Jarvis, Material, Grafana, benutzerdefinierte Benutzeroberfläche…) | Löst `%ip%`, `%port%`, `%protocol%`, `%bind%` und instanzübergreifende Referenzen wie `%web.0_port%` auf |
| **Manuelle URL** | Eine URL Ihrer Wahl (Grafana, Node-RED, benutzerdefiniertes HTML, alles, was HTTP/HTTPS unterstützt) | Setzen Sie die Anzeigewerte `mode` auf `manual` und die URL in `manualUrl`. `javascript:`, `data:` und `file:` werden aus Sicherheitsgründen abgelehnt. |
| **Manuelle URL** | Eine URL Ihrer Wahl – Grafana, Node-RED, benutzerdefiniertes HTML, alles, was HTTP/HTTPS verwendet | Stellen Sie den Anzeigemodus auf `manual` und die URL in `manualUrl` ein. `javascript:`, `data:` und `file:` werden aus Sicherheitsgründen nicht akzeptiert. |

Möchten Sie eine URL hinzufügen, die der Adapter nicht automatisch erkennt? Setzen Sie `manual` und fügen Sie sie ein.

---

## Anforderungen
- Node.js ≥ 22
- ioBroker js-controller ≥ 7.2.2
- ioBroker Admin ≥ 7.8.23

---

## Anschlüsse
| Hafen | Verwendung |
| ---------- | ----------------------------------- |
| 8123 / TCP | HA-Emulation (fest, HA-Standard) |
| 5353 / UDP | mDNS-Broadcast (nur wenn mDNS aktiviert ist) |

Eine Instanz pro Host. Port 8123 ist fest für Hochverfügbarkeit reserviert. Bei mehreren ioBroker-Hosts im selben LAN läuft Hassemu nur auf einem davon.

**Der gesamte Datenverkehr erfolgt unverschlüsselt über HTTP.** HA-Clients unterstützen HTTPS in diesem Fall nicht. Behandeln Sie Port 8123 als LAN-exklusiv und leiten Sie ihn niemals ins Internet weiter. Bei aktivierter Authentifizierung werden Benutzername, Passwort und Token unverschlüsselt über Ihr LAN übertragen. Die Authentifizierung schützt die HA-API vor anderen LAN-Geräten – sie bietet keinen Schutz vor Internetzugriffen.

---

## Erste Schritte
1. Starten Sie die Hassemu-Instanz in ioBroker.
2. Fügen Sie auf dem Display einen Home Assistant-Server hinzu. Bei aktiviertem mDNS wird er automatisch angezeigt; andernfalls geben Sie `http://<ioBroker-IP>:8123` manuell ein.
3. Schließen Sie das HA-Onboarding auf dem Display ab. Bei deaktivierter Authentifizierung können Sie sich durchklicken; bei aktivierter Authentifizierung geben Sie Benutzername und Passwort aus den Instanzeinstellungen ein.
4. Auf dem Display wird nun die **Landingpage** mit eigener Geräte-ID angezeigt – das bedeutet, dass das Gerät verbunden ist und auf eine URL wartet.
5. Öffnen Sie in ioBroker den Objektbrowser und legen Sie für dieses Gerät `hassemu.0.clients.<id>.mode` fest: Wählen Sie eine erkannte URL aus dem Dropdown-Menü oder wählen Sie `manual` und geben Sie eine beliebige URL in `clients.<id>.manualUrl` ein.
6. Die Anzeige wird innerhalb von ca. 30 Sekunden neu geladen und zeigt Ihre URL an.

Möchten Sie auf jedem Display dieselbe URL anzeigen? Stellen Sie `global.mode` (plus `global.manualUrl` für eine freie URL) ein und aktivieren Sie den Hauptschalter `global.enabled`, anstatt jeden Client einzeln zu konfigurieren.

---

## Konfiguration
| Option | Was | Standard |
| ------------------- | --------------------------------------------------------------------------------- | --------- |
| Binden | Netzwerkschnittstelle | 0.0.0.0 |
| Dienstname | Name, den das Display anzeigt | ioBroker |
| mDNS | Automatische LAN-Erkennung. Aus → `http://<ioBroker-IP>:8123` manuell auf dem Display einstellen. | Ein |
| Authentifizierung | Anmeldung erforderlich (schützt die HA-API im LAN; Anmeldeinformationen werden unverschlüsselt über HTTP übertragen) | Aus |
| Benutzername / Passwort | Wenn die Authentifizierung aktiviert ist | admin / — |
| Trust Proxy | Nur hinter einem vertrauenswürdigen Reverse-Proxy, der TLS beendet und X-Forwarded-* entfernt | deaktiviert |

---

## Staatsbaum
```
hassemu.0.
├── info.
│   ├── connection      — server is running
│   ├── serverUuid      — server identity (read-only)
│   └── refreshUrls     — re-scan URL list (button, set to true)
├── global.
│   ├── enabled         — master switch
│   ├── mode            — URL choice used by every client whose mode is `global`
│   └── manualUrl       — free-text URL, used when global.mode = `manual`
└── clients.
    └── <id>            — one channel per display (channel name = hostname or IP)
        ├── mode        — per-client URL choice
        ├── manualUrl   — free-text URL, used when mode = `manual`
        ├── ip          — last seen client IP
        └── remove      — forget this client (button, set to true)
```

### Welche URL wird dem Display angezeigt?
| `mode` | URL |
| `global` | use `global.mode` |
| `manual` | use `manualUrl` |
| `manual` | use `manualUrl` |
| leer (`---`) | Landingpage |
| leer (`---`) | Landingpage |

Hauptschalter:

- **on** — alle Anzeigen folgen dem `global.mode`
- **aus** — alle Anzeigen kehren zu `---` zurück
- neue Anzeigen beginnen immer bei `---`

---

## Aktualisieren
Die Anzeige lädt sich nach einer URL-Änderung innerhalb von ca. 30 Sekunden neu.

Nach dem Hinzufügen oder Umbenennen eines VIS-2-Projekts oder einer Ansicht muss `info.refreshUrls` auf `true` gesetzt werden, damit es in der Dropdown-Liste angezeigt wird.

Wenn Hassemu offline geht, während ein Display in Betrieb ist, wechselt das Display nach ca. 1,5 Minuten zu einer leeren Offline-Seite mit einem Aktualisierungsbutton und kehrt automatisch zum Dashboard zurück, sobald Hassemu wieder verfügbar ist. Einschränkung: Ein Display, das neu startet, während Hassemu offline ist, kann diese Seite nicht laden und zeigt einen Verbindungsfehler an, bis der Adapter wieder läuft.

---

## Fehlerbehebung
Setzen Sie zunächst den Protokollierungsgrad der Instanz auf `debug` – seit Version 1.31.1 protokolliert der Adapter jeden Entscheidungspunkt (Identifizierung, OAuth2, URL-Erkennung, Resolver-Kette, Webhooks der mobilen App, Master-Switch). Die meisten Symptome lassen sich allein anhand dieses Protokolls eingrenzen.

**Die Anzeige findet den Server nicht.** – Bei aktiviertem mDNS sollte das Protokoll `mDNS: Broadcasting` anzeigen. Fehlt diese Zeile, konnte mDNS nicht gebunden werden (Port 5353/UDP). Abhilfe: Deaktivieren Sie mDNS in der Instanzkonfiguration und stellen Sie die Anzeige manuell auf `http://<ioBroker-IP>:8123` ein.

**Die Anzeige zeigt die falsche URL oder die Landingpage an.** – Öffnen Sie den Objektbrowser und prüfen Sie `clients.<id>.mode` (und `manualUrl`, falls der Modus `manual` ist). Prüfen Sie bei `mode='global'` auch `global.mode` / `global.manualUrl`. Die Geräte-ID wird auf der Landingpage angezeigt und unter `clients.<id>.ip` gespeichert. Das Debug-Protokoll zeigt die vollständige Resolver-Kette (`chain=global→manual→…`) pro Anfrage an.

**Das Display hat seine Identität verloren (neue ID bei jedem Besuch)** – das Display speichert den Cookie nicht. Häufige Ursachen: aggressiver Datenschutzmodus, Zurücksetzen auf Werkseinstellungen, Browser-Cache leeren. Die alten `clients.<id>`-Kanäle können über die Schaltfläche `remove` entfernt werden, die eigentliche Ursache liegt jedoch beim Display, nicht bei Hassemu.

**Die HA Companion App meldet „Server ist nicht Home Assistant“** – Richten Sie die App auf `http://<ioBroker-IP>:8123` aus, nicht auf den ioBroker-Admin-Port. Falls ein Reverse-Proxy vor Hassemu geschaltet ist, stellen Sie sicher, dass `/manifest.json` unverändert durchgeleitet wird – die App analysiert `name === "Home Assistant"`, um den Server zu verifizieren.

**Der Aura-Eintrag im Dropdown-Menü verweist auf den falschen Port.** – `native.port` der Aura-Instanz muss mit dem tatsächlich verwendeten Port übereinstimmen. Lösen Sie `info.refreshUrls = true` aus, um die Erkennung nach der Korrektur der Aura-Konfiguration erneut auszuführen.

---

## Upgrade
Die Migration wird automatisch beim Start des Adapters ausgeführt.

Haben Sie Skripte, die noch in `visUrl` schreiben? Aktualisieren Sie diese – schreiben Sie stattdessen in `manualUrl` und setzen Sie `mode` auf `manual`.

**Sie nutzen ein Shelly Wall Display mit Firmware 2.6.0 oder neuer?** Stellen Sie sicher, dass Sie Hassemu **≥ 1.29.2** verwenden. Die in Firmware 2.6.0 eingeführte Home Assistant-App benötigt eine Serveridentitätsprüfung, eine Registrierung der mobilen App und ein „Verbunden“-Signal für die WebView – alle drei wurden mit Version 1.29.0 bis 1.29.2 eingeführt. Führen Sie nach dem Upgrade die Home Assistant-Einrichtung des Displays erneut durch.

---

## Unterstützung der Entwicklung
Dieser Adapter ist kostenlos und Open Source. Wenn er Ihnen nützlich ist, würde ich mich über eine kleine Spende freuen:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.37.0 (2026-07-09)

- A custom name you give a display now survives even when its network hostname resolves later — the name you set sticks.
- A display that keeps losing its identity no longer fills ioBroker with unused entries over time.
- A display connection that simply goes away (a panel powered off) is now cleaned up instead of lingering until the adapter restarts.
- The manual URL-refresh datapoint is now `info.refreshUrls` (was `info.refresh_urls`); the old one is removed automatically on upgrade — update any script that wrote to the old name.
- Corrected the configuration help texts and the README to match the current setup, documented the offline behaviour, and added a first-steps guide.

### 1.36.0 (2026-06-22) — stable

- Fixed a rare adapter crash and restart loop that a malformed connection message could trigger — it briefly took all connected displays offline until the adapter recovered.
- A custom name you give a display (its channel name) is no longer overwritten with the device's IP address when that IP changes.
- With authentication enabled, a display again reloads automatically after you change its target URL.
- With authentication enabled, a password is now required — the settings can no longer be saved with an empty password.

### 1.35.3 (2026-06-15)

- Fixed Home Assistant discovery pointing the display at the wrong address on multi-interface hosts; it now uses the address the adapter actually listens on.

### 1.35.2 (2026-06-12)

- Displays whose registration became stale after an adapter restart now re-register automatically — the server previously answered in a way the companion app did not recognize as "please register again"
- Removing a display now also clears its leftover app registration, so a re-added display starts with a fresh one

### 1.35.1 (2026-06-09)

- Internal cleanup. No user-facing changes.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

<!-- prettier-ignore -->
*Developed with assistance from Claude.ai*