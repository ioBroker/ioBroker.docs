---
chapters: {"pages":{"en/adapterref/iobroker.ultimate-updater/README.md":{"title":{"en":"ioBroker.ultimate-updater"},"content":"en/adapterref/iobroker.ultimate-updater/README.md"},"en/adapterref/iobroker.ultimate-updater/README.de.md":{"title":{"en":"ioBroker.ultimate-updater"},"content":"en/adapterref/iobroker.ultimate-updater/README.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ultimate-updater/README.de.md
title: ioBroker.ultimate-updater
hash: 1FxG01HaE0rHcUZV2pQJgOOHD9lCTOrTOTKxAr7jB58=
---
![Logo](../../../en/adapterref/iobroker.ultimate-updater/admin/ultimate-updater.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ultimate-updater.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ultimate-updater.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ultimate-updater-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ultimate-updater-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ultimate-updater.png?downloads=true)
![Test und Freigabe](https://github.com/ipod86/ioBroker.ultimate-updater/workflows/Test%20and%20Release/badge.svg)

# ioBroker.ultimate-updater

🇬🇧 [Englische Version](/#/adapters/ultimate-updater)

## Ultimate-Updater-Adapter für ioBroker

Halten Sie den Update-Status Ihrer Proxmox-Hosts, LXC-Container und VMs in ioBroker und starten Sie Prüfungen und Updates per Knopfdruck.

Der Adapter ist ein Client für den **[Ultimate Updater](https://github.com/BassT23/Proxmox) von [@BassT23](https://github.com/BassT23)** . Der Ultimate Updater erledigt die eigentliche Arbeit auf dem Proxmox-Cluster (Updates, Snapshots/Backups, Filter, Statusmodell); Dieser Adapter liegt nur dessen Status über die Integrations-API v1 und löst die dort angebotenen Aktionen aus. Name und Icon werden mit Genehmigung von [@BassT23](https://github.com/BassT23) verwendet – vielen Dank!

Das Adapter-Icon ist das originale Ultimate-Updater-Icon von BassT23, verwendet mit seiner Erlaubnis ( [web-ui/assets/ultimate-updater-icon.png](https://github.com/BassT23/Proxmox/blob/master/web-ui/assets/ultimate-updater-icon.png) ).

> **Inoffizieller Community-Adapter.** Er steht in keiner Verbindung zum Ultimate Updater oder zur Proxmox Server Solutions GmbH. Proxmox® ist eine eingetragene Marke der Proxmox Server Solutions GmbH.

### Voraussetzungen

- Node.js >= 22, js-controller >= 6.0.11, Admin >= 7.8.23 (der Credentials-Manager benötigt Admin 7.9)
- Ultimate Updater **5.2 oder neuer** (bis 5.2 erscheint: der `develop` -Zweig) mit aktivierter Web-UI (Standardport `8765`)
- Ein **API-Token** für die Integrations-API v1. Er funktioniert nur über HTTPS und hat eigene Rechte. Auf dem Proxmox-Host:
  ```bash
  ultimate-updater-api-token enable
  ultimate-updater-api-token create iobroker --permissions read,logs,check,update,reboot,cancel
  ```
  Der Token wird nur einmal angezeigt. Rechte, die du nicht vergeben willst, lässt du weg (z. B. `read,logs,check` nur für Status und Prüfungen); Die entsprechenden Buttons melden dann „keine Berechtigung“.

Die Anmeldung mit einem Proxmox-Konto über die Web-UI wird bewusst nicht unterstützt: Sie benötigen ein Konto mit vollen Administrator-Rechten, und ihre Endpunkte sind keine stabile Schnittstelle.

### Konfiguration

| Einstellung                                  | Beschreibung                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IP-Adresse / Hostname, Port, HTTPS verwenden | Adresse der Ultimate-Updater-Weboberfläche (die API funktioniert nur über HTTPS)                                                                                                                                                                                                                                                                                                |
| API-Token                                    | **Hier eingeben** (wird verschlüsselt gespeichert) oder **aus dem Credentials-Manager** des Admin (Einstellungen → Credentials, ein Eintrag vom Typ „Key“; benötigt Admin 7.9 und js-controller 7.2.2 oder neuer). Ein geänderter Eintrag wird sofort ohne Neustart des Adapters übernommen.                                                                                    |
| TLS-Zertifikat validieren                    | Standardmäßig aus, da die Web-UI meist das selbstsignierte Proxmox-Zertifikat nutzt                                                                                                                                                                                                                                                                                             |
| Vollständige Statusaktualisierung            | Intervall zum Lesen aller Ziele (Minuten, Standard 60). Nach einem beendeten Job wird der Status sofort aktualisiert.                                                                                                                                                                                                                                                           |
| Job-Abfrageintervall                         | Wie oft die Jobliste geprüft wird: im Leerlauf (Standard 30 s) und während ein Job läuft (Standard 2 s)                                                                                                                                                                                                                                                                         |
| Ausgenommen von „Alle aktualisieren“         | VMs/CTs, die die Sammel-Update-Buttons überspringen (z. B. der ioBroker-Container selbst). Einzelnen lassen sie sich weiterhin aktualisieren. Die Liste wird von der laufenden Instanz geladen.                                                                                                                                                                                 |
| Sammel-Updates                               | **Nur laufende VMs/CTs** (Standard) oder **alle VMs/CTs** . „Alle“ funktioniert nur, wenn im Ultimate Updater das Update gestoppter Gäste ebenfalls aktiviert ist (`STOPPED_CONTAINER` /`STOPPED_VM` in dessen `update.conf`): Er startet sie dann für das Update und fährt sie danach wieder herunter. Sonst überspringt der Ultimate Updater sie und ihre Jobs schlagen fehl. |
| Neustart-Buttons erlauben                    | Legt für Hosts/VMs/CTs, die einen Neustart brauchen, einen `reboot` -Knopf an. Standardmäßig aus.                                                                                                                                                                                                                                                                                |
| Nicht mehr ist Targets löschen               | Entfernt die Datenpunkte von Hosts/VMs/CTs, die der Ultimate Updater nicht mehr meldet (z. B. in Proxmox gelöscht). Standardmäßig an; ist die Option aus, bleiben sie erhalten.                                                                                                                                                                                                 |
| Benachrichtigungen                           | Neue Sicherheitsupdates, Neustart erforderlich, Job fehlgeschlagen/abgebrochen – jeweils einzeln abschaltbar                                                                                                                                                                                                                                                                    |

### Datenpunkte

| Datenpunkt                                                                                   | Beschreibung                                                                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`                                                                            | Verbindung zur Web-UI                                                                                                                                                                                                                             |
| `info.lastRefresh`, `info.targetCount`, `info.updaterVersion`, `info.updaterUpdateAvailable` | Allgemeine Informationen                                                                                                                                                                                                                          |
| `jobRunning`                                                                                 | Ein Prüf-/Update-Job läuft                                                                                                                                                                                                                        |
| `summary.text`                                                                               | Kurze Zusammenfassung in der Systemsprache, z. B. „7 Updates auf 3 Systemen, 1 Neustart nötig“                                                                                                                                                    |
| `summary.report`                                                                             | Statusbericht als mehrzeiliger Text wie die Status-Mail des Ultimate Updater (Updates je Node, aktuell, Neustart nötig, nicht erreichbar, Fehler, übersprungen), Überschriften in der Systemsprache – z. B. für Telegram oder eine Markdown-Karte |
| `summary.*`                                                                                  | Offene Sicherheits-/normale Updates gesamt, Targets mit Updates, nicht erreichbare Targets, Targets mit ausstehendem Neustart                                                                                                                     |
| `targets.<Name>_<ID>.*`                                                                      | Alle Felder, die der Ultimate Updater pro Host/LXC/VM liefert (z. B. `security_updates`, `normal_updates`, `reboot_required`, `reachable`, `last_check`)                                                                                          |
| `targets.<…>.jobState`, `targets.<…>.jobUnit`                                                | Status und ID des letzten Jobs dieses Targets (`none` (wenn es keinen gibt)                                                                                                                                                                       |
| `widget.data`                                                                                | Alle Ziele und Jobs in einem JSON-Datenpunkt – liest die Web-Komponente                                                                                                                                                                           |
| `jobs.<Unit>.*`                                                                              | Laufende und letzte Jobs; bei fehlgeschlagenen Jobs stehen die letzten Logzeilen in `log`                                                                                                                                                          |

### Tasten

| Taste                   | Aktion                                                                                                                                                                                                                                                |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `targets.<…>.checkNow`  | Diesen Host/diese VM/diesen CT prüfen (kein Update)                                                                                                                                                                                                   |
| `targets.<…>.updateNow` | Diesen Host/diese VM/diesen CT aktualisieren (Hosts per Node-Update, Gäste werden nicht erfasst)                                                                                                                                                      |
| `checkAll`              | Alle Ziele inklusive Hosts prüfen                                                                                                                                                                                                                     |
| `updateAllVmsCts`       | Alle VMs/CTs aktualisieren, Hosts und ausgenommene Targets werden übersprungen                                                                                                                                                                        |
| `updateSecurityOnly`    | **Komplett** -Update der VMs/CTs, die offene Sicherheitsupdates haben; Hosts und ausgenommene Targets werden übersprungen. Der Ultimate Updater kennt kein reines Sicherheits-Update, es werden auch alle offenen Updates dieser Targets installiert. |
| `bulk.stop`             | Laufendes Sammel-Update nach dem aktuellen Target beendet                                                                                                                                                                                             |
| `targets.<…>.reboot`    | Diesen Host/diese VM/diesen CT neu starten – nur vorhanden, wenn Neustart-Buttons erlaubt sind und das Target einen Neustart braucht                                                                                                                  |
| `jobs.<Unit>.cancel`    | Diesen Job abbrechen – nur vorhanden, solange der Job läuft                                                                                                                                                                                           |

Es wird nie automatisch aktualisiert oder neu gestartet – nur per Knopfdruck. Solange ein Job läuft, werden weitere Aktionen abgelehnt.

**Sammel-Updates laufen nacheinander:** Der Ultimate Updater antwortet, sobald ein Job _gestartet_ ist (HTTP 202). Der Adapter wartet deshalb, bis der Job eines Targets beendet ist, bevor er das nächste startet. Auch auf anderswo gestartete Jobs (z. B. in der Web-UI) wird gewartet. Den Fortschritt zeigen `bulk.active` und `bulk.progress` (z. B. `3/7: web`, am Ende z. B. `4 ok, 2 unchanged, 1 failed, 0 not started`; "unverändert" = Jobstatus `skipped`, es gab nichts zu aktualisieren).

### Widget (Web-Komponente) für AURA, vis-2 und andere Visualisierungen

Der Adapter bringt das Widget **„Ultimate-Updater-Tabelle“** mit (eine Web-Komponente, nutzbar in AURA, vis-2 und jeder andere Visualisierung, die Web-Komponenten unterstützt): alle Hosts, VMs und Container in einer Tabelle mit den offenen Updates (Sicherheit / weitere), Neustart-Hinweis, Job-Status und den Knöpfen – dieselben Datenpunkte wie oben, fertig fürs Dashboard. Sie benötigen kein Skript und keine simple-api: Die Knöpfe schreiben die Button-Datenpunkte direkt über die Verbindung der Visualisierung.

![Ultimative-Updater-Tabelle](https://raw.githubusercontent.com/ipod86/ioBroker.ultimate-updater/main/docs/widget_de.jpg)

- Zusammenfassung mit Fortschritt von „Alle prüfen“ und Sammel-Updates, Knöpfe _Alle prüfen_ , _Alle VMs/CTs updaten_ und _Nur mit Sicherheitsupdates_
- Je System: Status-Punkt, Typ und ID, Kennzeichen (Neustart, läuft, Fehler), Prüfen-/Update-/Neustart-Knöpfe als Symbole oder Text
- Fehlgeschlagene Jobs: Grund und letzte Logzeilen klappen unter der Zeile auf (das Log wird erst beim Öffnen gelesen)
- Rückfragen vor Updates und Neustarts erscheinen direkt unter der angetippten Zeile
- Optionale **CPU-, RAM- und Festplatten-Auslastung aus dem [proxmox-Adapter](https://github.com/iobroker-community-adapters/ioBroker.proxmox)** je System, orange/rot ab einstellbaren Grenzen (Festplatte: Container; VMs nur mit Gast-Agent)
- Einstellungen: welche Knöpfe und Systeme gezeigt werden (Hosts, ausgeschaltet, nur Systeme mit Updates), Reihenfolge, Zeilenhöhe, Textgröße, hinterlegte Zeilen und die Farben
- Neue oder gelöschte Systeme erscheinen von selbst

In AURA (ab 0.106.0) steht das Widget nach der Installation in der Widget-Liste; Beim Widget **„Klicks“ auf „Komponente“ stellen** , sonst kommen die Knöpfe nicht an. vis-2 benötigt Version 2.20.7 oder neuer.

### Benachrichtigungen

Der Adapter nutzt den ioBroker Notification Manager; Telegramm, E-Mail, Pushover usw. werden auch zentral im ioBroker eingerichtet. Gemeldet werden nur Änderungen, in der Systemsprache:

- **Neue Sicherheitsupdates** – die Anzahl der Sicherheitsupdates eines Hosts/einer VM/eines CT ist gestiegen
- **Neustart erforderlich** – ein Host/eine VM/ein CT braucht neu einen Neustart
- **Job fehlgeschlagen** – ein Prüf-/Update-/Neustart-Job ist fehlgeschlagen oder wurde abgebrochen (auch Jobs, die fehlschlugen, während der Adapter gestoppt war)

Beim allerersten Start wird nichts gemeldet; Der aktuelle Stand wird nur erfasst.

### Sicherheit

- Der **API-Token** gewährt keinen Proxmox-Login. Er funktioniert nur über HTTPS und hat genau die Rechte, die du ihm gibst (`read`, `logs`, `check`, `update`, `reboot`, `cancel`). Vergib nur, was du brauchst; entziehen kannst du ihn auf dem Host mit `ultimate-updater-api-token revoke <id>` Die
- Der Token liegt verschlüsselt in ioBroker (oder im zentralen Credentials-Manager). Wer Zugriff auf den ioBroker-Admin oder dessen Objektdatenbank hat, kann ihn mit seinen Rechten nutzen.
- Der Adapter **prüft das TLS-Zertifikat standardmäßig nicht** , da die Web-UI normalerweise das selbstsignierte Proxmox-Zertifikat verwendet. Die Verbindung ist dann zwar verschlüsselt, ein Angreifer im eigenen Netz könnte den Token aber abfangen (Man-in-the-Middle). Aktiviere _TLS-Zertifikat validieren_ , wenn die Web-UI ein vertrauenswürdiges Zertifikat nutzt, und betreibe den Adapter nur in einem vertrauenswürdigen Netz.
- Beschränke den Zugriff auf den Port der Ultimate-Updater-Web-UI auf die Systeme, die ihn brauchen (z. B. per Firewall).

### Hinweis zur API

Der Adapter nutzt die dokumentierte, versionierte Integrations-API v1 von Ultimate Updater 5.2 (Bearer-Token, eigene Rechte, nur HTTPS), die zusammen mit BassT23 entworfen wurde ( [BassT23/Proxmox#378](https://github.com/BassT23/Proxmox/issues/378) ).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-11-14)
* (ipod86) fix: Web-Komponente lädt deutlich schneller und in einem Schritt (alle Ziele und Jobs im neuen Datenpunkt `widget.data`); Rückfrage-Box in manchen Themes nicht mehr weiß

### 0.2.0 (2026-11-14)
* (ipod86) feat: Widget „Ultimate-Updater-Tabelle“ (Web-Komponente) für AURA, vis-2 und andere Visualisierungen, optional mit CPU/RAM/Festplatte aus dem proxmox-Adapter

### 0.1.3 (2026-11-14)
* (ipod86) fix: eine Benachrichtigung pro Kategorie und Statusabfrage mit allen Zielen statt einer pro Ziel – der Benachrichtigungs-Manager hat sonst bei jeder einzelnen Meldung die offenen erneut verschickt (doppelte Telegram-Nachrichten)

### 0.1.2 (2026-11-12)
* (ipod86) fix: Objektfelder der API (z. B. `error`, `skip_reason`) sind immer Channels; null leert deren Datenpunkte; fehlerhafte Objekte werden beim Start repariert
* (ipod86) fix: Log-Meldungen der Benachrichtigungen immer auf Englisch
* (ipod86) fix: unbehandelte Promise-Rejections in Hintergrundaufgaben; Wartezeiten enden beim Stoppen sofort
* (ipod86) fix: keine Standard-IP-Adresse mehr, eine fehlende Adresse wird gemeldet
* (ipod86) chore: nur noch die Buttons abonniert; Titel „Ultimate Updater“ in allen Sprachen; README nennt die Erlaubnis für Name und Icon

### 0.1.1 (2026-10-25)
* (ipod86) Release über den GitHub-Workflow veröffentlicht (Trusted Publishing); News nur für Versionen auf npm; vereinheitlichte Repository-URL

### 0.1.0 (2026-10-25)
* (ipod86) **Breaking:** nur noch Anmeldung per API-Token (Integrations-API v1, Ultimate Updater 5.2+); der Web-UI-Login mit Proxmox-Benutzer wurde entfernt
* (ipod86) Warnung, wenn HTTPS abgeschaltet ist; laufende Anfragen werden beim Stoppen abgebrochen; feste Rollen für Zeitfelder; `info.connection` nur bei Änderung geschrieben; README und Übersetzungen der News korrigiert
* (ipod86) Benachrichtigungen nennen das Ziel mit ID und Name („115 · iobroker“), damit gleichnamige Ziele unterscheidbar sind

### 0.0.2 (2026-10-21)
* (ipod86) Sammel-Updates laufen nacheinander (Warten auf jeden Job), Fortschritt in `bulk.*`
* (ipod86) Security-Update-Button klarer beschrieben; Sicherheitshinweise in der README
* (ipod86) Einstellung, ob Sammel-Updates auch ausgeschaltete VMs/CTs umfassen (Standard: nur laufende)
* (ipod86) Anmeldung per API-Token über die Integrations-API v1 von Ultimate Updater 5.2 (Web-UI-Login bleibt verfügbar)
* (ipod86) Sammel-Updates zählen Jobs ohne Paketänderung (Jobstatus `skipped`, Ultimate Updater 5.2) als "unchanged" statt als fehlgeschlagen
* (ipod86) neuer Datenpunkt `summary.report`: Statusbericht als Text wie die Status-Mail des Ultimate Updater

Ältere Changelog-Einträge stehen in CHANGELOG_OLD.md.

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