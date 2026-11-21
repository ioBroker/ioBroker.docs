---
chapters: {"pages":{"en/adapterref/iobroker.ultimate-updater/README.md":{"title":{"en":"ioBroker.ultimate-updater"},"content":"en/adapterref/iobroker.ultimate-updater/README.md"},"en/adapterref/iobroker.ultimate-updater/README.de.md":{"title":{"en":"ioBroker.ultimate-updater"},"content":"en/adapterref/iobroker.ultimate-updater/README.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ultimate-updater/README.md
title: ioBroker.ultimate-updater
hash: +HlIHjTkMJBa2IJatURKz75kPKRQRfySYifqKDIFTWs=
---
![Logo](../../../en/adapterref/iobroker.ultimate-updater/admin/ultimate-updater.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ultimate-updater.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ultimate-updater.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ultimate-updater-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ultimate-updater-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ultimate-updater.png?downloads=true)
![Test und Freigabe](https://github.com/ipod86/ioBroker.ultimate-updater/workflows/Test%20and%20Release/badge.svg)

# ioBroker.ultimate-updater

🇩🇪 [Deutsche Version](/#/docs/adapterref/iobroker.ultimate-updater/README.de.md)

## Ultimate Updater-Adapter für ioBroker

Bringt den Aktualisierungsstatus Ihrer Proxmox-Hosts, LXC-Container und VMs in ioBroker ein und ermöglicht es Ihnen, Prüfungen und Aktualisierungen per Knopfdruck zu starten.

Der Adapter ist ein Client für **[Ultimate Updater](https://github.com/BassT23/Proxmox) von [@BassT23](https://github.com/BassT23)** . Ultimate Updater übernimmt die eigentliche Arbeit auf Ihrem Proxmox-Cluster (Update-Ausführung, Snapshots/Backups, Filter, Statusmodell); dieser Adapter liest lediglich den Status über die Integrations-API v1 und löst die angebotenen Aktionen aus. Name und Symbol werden mit freundlicher Genehmigung von [@BassT23](https://github.com/BassT23) verwendet – vielen Dank!

Das Adaptersymbol ist das Originalsymbol von Ultimate Updater von BassT23 und wird mit seiner Genehmigung verwendet ( [web-ui/assets/ultimate-updater-icon.png](https://github.com/BassT23/Proxmox/blob/master/web-ui/assets/ultimate-updater-icon.png) ).

> **Inoffizieller Community-Adapter.** Er steht in keiner Verbindung zu Ultimate Updater oder der Proxmox Server Solutions GmbH. Proxmox® ist eine eingetragene Marke der Proxmox Server Solutions GmbH.

### Anforderungen

- Node.js >= 22, js-controller >= 6.0.11, admin >= 7.8.23 (für den Anmeldeinformationsmanager wird admin 7.9 benötigt)
- Ultimate Updater **5.2 oder neuer** (bis zur Veröffentlichung von 5.2: der `develop` Zweigstelle) mit aktivierter Web-UI (Standardport `8765`)
- Ein **API-Token** für die Integrations-API v1. Es funktioniert ausschließlich über HTTPS und verfügt über eigene Berechtigungen. Auf dem Proxmox-Host:
  ```bash
  ultimate-updater-api-token enable
  ultimate-updater-api-token create iobroker --permissions read,logs,check,update,reboot,cancel
  ```
  Das Token wird nur einmal angezeigt. Lassen Sie Berechtigungen weg, die Sie nicht erteilen möchten (z. B. `read,logs,check` Nur für Status- und Prüfvorgänge); die entsprechenden Schaltflächen melden dann "Zugriff verweigert".

Die Anmeldung über die Web-Oberfläche mit einem Proxmox-Konto wird bewusst nicht unterstützt: Sie erfordert ein Konto mit vollen Administratorrechten und ihre Endpunkte stellen keine stabile Schnittstelle dar.

### Konfiguration

| Einstellung                                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IP-Adresse / Hostname, Port, HTTPS verwenden | Adresse der Ultimate Updater Web-Benutzeroberfläche (die API funktioniert nur über HTTPS)                                                                                                                                                                                                                                                                                                                           |
| API-Token                                    | **Geben Sie die Zugangsdaten hier ein** (verschlüsselt gespeichert) oder **verwenden Sie die Anmeldeinformationsverwaltung** des Administrators (Einstellungen → Anmeldeinformationen, eine „Schlüssel“-Anmeldeinformation; benötigt Administratorversion 7.9 und js-controller Version 7.2.2 oder neuer). Geänderte Anmeldeinformationen werden sofort verwendet, ohne dass der Adapter neu gestartet werden muss. |
| TLS-Zertifikat validieren                    | Standardmäßig deaktiviert, da die Web-Benutzeroberfläche üblicherweise das selbstsignierte Proxmox-Zertifikat verwendet.                                                                                                                                                                                                                                                                                            |
| Vollständige Statusaktualisierung            | Intervall zum Lesen aller Ziele (Minuten, Standardwert 60). Nach Abschluss eines Auftrags wird der Status sofort aktualisiert.                                                                                                                                                                                                                                                                                      |
| Job-Abfrageintervall                         | Wie oft die Jobliste überprüft wird: im Leerlauf (Standard 30 s) und während ein Job ausgeführt wird (Standard 2 s)                                                                                                                                                                                                                                                                                                 |
| Von „Alle aktualisieren“ ausgeschlossen      | VMs/CTs, die von den Schaltflächen für die kollektive Aktualisierung übersprungen werden (z. B. der ioBroker-Container selbst), können weiterhin einzeln aktualisiert werden. Die Liste wird von der laufenden Instanz geladen.                                                                                                                                                                                     |
| Zu den kollektiven Aktualisierungen gehören: | **Nur laufende VMs/CTs** (Standard) oder **alle VMs/CTs** . "Alle" funktioniert nur, wenn die Aktualisierung gestoppter Gäste auch im Ultimate Updater aktiviert ist (`STOPPED_CONTAINER` /`STOPPED_VM` in seiner `update.conf` Anschließend werden sie für das Update gestartet und wieder beendet. Andernfalls überspringt Ultimate Updater sie, und ihre Ausführung schlägt fehl.                                 |
| Neustart-Tasten zulassen                     | Erstellt ein `reboot` Schaltfläche für Hosts/VMs/CTs, die neu gestartet werden müssen. Standardmäßig deaktiviert.                                                                                                                                                                                                                                                                                                    |
| Ziele löschen, die nicht mehr existieren     | Entfernt die Zustände von Hosts/VMs/CTs, die Ultimate Updater nicht mehr meldet (z. B. gelöscht in Proxmox). Standardmäßig aktiviert; bei Deaktivierung bleiben die Zustände erhalten.                                                                                                                                                                                                                              |
| Benachrichtigungen                           | Neue Sicherheitsupdates, Neustart erforderlich, Auftrag fehlgeschlagen/unterbrochen – all dies kann deaktiviert werden.                                                                                                                                                                                                                                                                                             |

### Staaten

| Zustand                                                                                      | Beschreibung                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`                                                                            | Verbindung zur Web-Benutzeroberfläche                                                                                                                                                                                                                                       |
| `info.lastRefresh`, `info.targetCount`, `info.updaterVersion`, `info.updaterUpdateAvailable` | allgemeine Informationen                                                                                                                                                                                                                                                    |
| `jobRunning`                                                                                 | Ein Prüf-/Aktualisierungsauftrag wird ausgeführt.                                                                                                                                                                                                                           |
| `summary.text`                                                                               | Kurze Zusammenfassung in der Systemsprache, z. B. „7 Updates auf 3 Systemen, 1 Neustart erforderlich“                                                                                                                                                                       |
| `summary.report`                                                                             | Statusbericht als mehrzeiliger Text, ähnlich der Status-E-Mail von Ultimate Updater (Aktualisierungen pro Knoten, aktuell, Neustart erforderlich, nicht erreichbar, Fehler, übersprungen), Überschriften in der Systemsprache – z. B. für Telegram oder eine Markdown-Karte |
| `summary.*`                                                                                  | Ausstehende Sicherheits-/normale Updates insgesamt, Ziele mit Updates, nicht erreichbare Ziele, Ziele, die einen Neustart benötigen                                                                                                                                         |
| `targets.<name>_<id>.*`                                                                      | Alle Felder, die Ultimate Updater pro Host/LXC/VM liefert (z. B. `security_updates`, `normal_updates`, `reboot_required`, `reachable`, `last_check`)                                                                                                                        |
| `targets.<…>.jobState`, `targets.<…>.jobUnit`                                                | Status und ID des letzten Jobs dieses Ziels (`none` (falls keine vorhanden ist)                                                                                                                                                                                             |
| `widget.data`                                                                                | Alle Ziele und Jobs in einem JSON-Zustand – gelesen von der Webkomponente                                                                                                                                                                                                   |
| `jobs.<unit>.*`                                                                              | Laufende und kürzlich abgeschlossene Jobs; bei fehlgeschlagenen Jobs werden die letzten Protokollzeilen gespeichert in `log`                                                                                                                                                 |

### Tasten

| Taste                   | Aktion                                                                                                                                                                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `targets.<…>.checkNow`  | Prüfen Sie diesen Host/diese VM/diesen CT (kein Update)                                                                                                                                                                                                                |
| `targets.<…>.updateNow` | Aktualisieren Sie diesen Host/diese VM/diesen CT (Hosts werden über Knotenaktualisierung aktualisiert, Gäste bleiben unberührt).                                                                                                                                       |
| `checkAll`              | Überprüfen Sie alle Ziele einschließlich der Hosts.                                                                                                                                                                                                                    |
| `updateAllVmsCts`       | Aktualisierung aller VMs/CTs, Hosts und ausgeschlossenen Ziele übersprungen                                                                                                                                                                                            |
| `updateSecurityOnly`    | Die VMs/CTs mit ausstehenden Sicherheitsupdates werden **vollständig** aktualisiert; Hosts und ausgeschlossene Ziele werden übersprungen. Ultimate Updater bietet keine reinen Sicherheitsupdates an, daher werden alle ausstehenden Updates dieser Ziele installiert. |
| `bulk.stop`             | Beenden Sie eine laufende kollektive Aktualisierung nach dem aktuellen Ziel                                                                                                                                                                                            |
| `targets.<…>.reboot`    | Host/VM/CT neu starten – diese Option ist nur verfügbar, wenn Neustart-Schaltflächen zulässig sind und das Zielsystem neu gestartet werden muss.                                                                                                                       |
| `jobs.<unit>.cancel`    | Diesen Auftrag abbrechen – diese Option ist nur verfügbar, solange der Auftrag ausgeführt wird.                                                                                                                                                                        |

Nichts wird automatisch aktualisiert oder neu gestartet – nur wenn Sie eine Taste drücken. Während ein Vorgang ausgeführt wird, sind weitere Aktionen nicht möglich.

**Kollektive Aktualisierungen führen die Ziele nacheinander aus:** Ultimate Updater antwortet, sobald ein Auftrag _gestartet_ wurde (HTTP 202), sodass der Adapter wartet, bis der Auftrag eines Ziels abgeschlossen ist, bevor er den nächsten startet. Auch Aufträge, die an anderer Stelle gestartet wurden (z. B. in der Web-Oberfläche), werden berücksichtigt. Der Fortschritt wird angezeigt in `bulk.active` Und `bulk.progress` (z.B `3/7: web`, am Ende z.B. `4 ok, 2 unchanged, 1 failed, 0 not started`; "unverändert" = Jobstatus `skipped` (Es gab nichts zu aktualisieren).

### Widget (Webkomponente) für AURA, vis-2 und andere Visualisierungen

Der Adapter stellt das Widget **„Ultimate Updater-Tabelle“** bereit (eine Webkomponente, die in AURA, vis-2 und allen anderen Visualisierungen mit Webkomponentenunterstützung verwendet werden kann): Alle Hosts, VMs und Container werden in einer Tabelle mit den offenen Updates (Sicherheit/Sonstiges), Neustarthinweisen, Jobstatus und Schaltflächen – analog zu den oben genannten Zuständen – für das Dashboard angezeigt. Es werden weder Skripte noch eine einfache API benötigt: Die Schaltflächenzustände werden direkt über die Visualisierungsverbindung geschrieben.

![Ultimative Updater-Tabelle](https://raw.githubusercontent.com/ipod86/ioBroker.ultimate-updater/main/docs/widget_en.jpg)

- Zusammenfassungszeile mit Fortschrittsanzeige für „Alle prüfen“ und Sammelaktualisierungen, Schaltflächen _„Alle prüfen“_ , _„Alle VMs/CTs aktualisieren“_ und _„Nur mit Sicherheitsupdates“_
- Pro System: Statuspunkt, Typ und ID, Flags (Neustart, läuft, fehlgeschlagen), Schaltflächen zum Prüfen/Aktualisieren/Neustarten als Symbole oder Text
- Fehlgeschlagene Aufträge: Der Grund und die letzten Protokollzeilen werden unterhalb der Zeile angezeigt (das Protokoll ist beim Öffnen schreibgeschützt).
- Fragen vor Updates und Neustarts erscheinen direkt unter der gedrückten Zeile.
- Optionale **CPU-, RAM- und Festplattenauslastung durch den [Proxmox-Adapter](https://github.com/iobroker-community-adapters/ioBroker.proxmox)** pro System, orange/rot für einstellbare Grenzwerte (Festplatte: Container; VMs nur mit Gastagent)
- Einstellungen: Welche Schaltflächen und Systeme werden angezeigt (Hosts, ausgeschaltete Systeme, nur Systeme mit Updates), Reihenfolge, Zeilenhöhe, Textgröße, gestreifte Zeilen und Farben
- Neue oder gelöschte Systeme erscheinen von selbst

In AURA (0.106.0 oder neuer) befindet sich das Widget nach der Installation in der Widget-Liste. Stellen Sie **die Klicks des Widgets auf „Komponente“** ein, da die Schaltflächen sonst nicht angeklickt werden. vis-2 benötigt Version 2.20.7 oder neuer.

### Benachrichtigungen

Der Adapter nutzt den Benachrichtigungsmanager von ioBroker, sodass Telegram, E-Mail, Pushover usw. zentral in ioBroker konfiguriert werden. Benachrichtigungen werden nur bei Änderungen und in der Systemsprache versendet.

- **Neue Sicherheitsupdates** – die Anzahl der Sicherheitsupdates für Host/VM/CT hat sich erhöht
- **Neustart erforderlich** – ein Host/eine VM/ein CT muss neu gestartet werden.
- **Auftrag fehlgeschlagen** – ein Prüf-/Aktualisierungs-/Neustartauftrag ist fehlgeschlagen oder wurde unterbrochen (ebenso wie Aufträge, die fehlgeschlagen sind, während der Adapter angehalten war).

Beim ersten Start erfolgt keine Benachrichtigung; es wird lediglich der aktuelle Zustand protokolliert.

### Sicherheit

- Das **API-Token** gewährt keinen Proxmox-Login. Es funktioniert nur über HTTPS und enthält genau die Berechtigungen, die Sie ihm erteilen (`read`, `logs`, `check`, `update`, `reboot`, `cancel` Gewähren Sie nur die benötigten Berechtigungen und widerrufen Sie diese auf dem Host mit `ultimate-updater-api-token revoke <id>` Die
- Das Token wird verschlüsselt in ioBroker (oder im zentralen Anmeldeinformationsmanager) gespeichert. Jeder, der Zugriff auf die ioBroker-Administration oder die zugehörige Objektdatenbank hat, kann es mit den entsprechenden Berechtigungen verwenden.
- Der Adapter **validiert das TLS-Zertifikat standardmäßig nicht** , da die Web-Oberfläche normalerweise das selbstsignierte Proxmox-Zertifikat verwendet. Ohne Validierung ist die Verbindung zwar verschlüsselt, aber ein Angreifer in Ihrem Netzwerk könnte das Token auslesen. Aktivieren Sie _die TLS-Zertifikatvalidierung,_ wenn die Web-Oberfläche ein vertrauenswürdiges Zertifikat verwendet, und betreiben Sie den Adapter nur in einem vertrauenswürdigen Netzwerk.
- Beschränken Sie den Zugriff auf den Port der Ultimate Updater Web-Benutzeroberfläche auf die Hosts, die ihn benötigen (z. B. durch Firewall-Regeln).

### Hinweis zur API

Der Adapter verwendet die dokumentierte, versionierte Integrations-API v1 von Ultimate Updater 5.2 (Bearer-Token, separate Berechtigungen, nur HTTPS), die zusammen mit BassT23 ( [BassT23/Proxmox#378](https://github.com/BassT23/Proxmox/issues/378) ) entwickelt wurde.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-11-14)
* (ipod86) fix: web component loads much faster and in one step (all targets and jobs in the new state `widget.data`); confirmation box no longer white in some themes

### 0.2.0 (2026-11-14)
* (ipod86) feat: widget "Ultimate Updater table" (web component) for AURA, vis-2 and other visualisations, optionally with CPU/RAM/disk from the proxmox adapter

### 0.1.3 (2026-11-14)
* (ipod86) fix: one notification per category and status refresh with all targets, instead of one per target – the notification manager sent the open ones again for every single notification (repeated Telegram messages)

### 0.1.2 (2026-11-12)
* (ipod86) fix: object fields of the API (e.g. `error`, `skip_reason`) are always channels; null clears their states; broken objects are repaired on start
* (ipod86) fix: log messages of notifications are always English
* (ipod86) fix: unhandled promise rejections in background tasks; waits end right away on stop
* (ipod86) fix: no default IP address, a missing address is reported
* (ipod86) chore: only the buttons are subscribed; title "Ultimate Updater" in all languages; README notes the permission for name and icon

### 0.1.1 (2026-10-25)
* (ipod86) release published by the GitHub workflow (trusted publishing); news only for versions on npm; normalized repository URL

Older changelogs are available in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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