---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ntfy-client/README.md
title: ioBroker.ntfy-client
hash: T6o4lKkNpKm22ELPVEGcrI8UXHtzheamg4I7ub8IpQU=
---
![Logo](../../../en/adapterref/iobroker.ntfy-client/admin/ntfy-client.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ntfy-client.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ntfy-client.svg)
![Anzahl der Installationen](https://iobroker.live/badges/ntfy-client-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/ntfy-client-stable.svg)
![NPM](https://nodei.co/npm/iobroker.ntfy-client.png?downloads=true)

# IoBroker.ntfy-client
**Tests:** [![Test und Veröffentlichung](https://github.com/lubepi/ioBroker.ntfy-client/workflows/Test%20and%20Release/badge.svg)](https://github.com/lubepi/ioBroker.ntfy-client/actions?query=workflow%3A%22Test+and+Release%22)

Inoffizieller ntfy.sh-Clientadapter für ioBroker

Senden und empfangen Sie Benachrichtigungen direkt von ioBroker über [ntfy.sh](https://ntfy.sh). Dieser Adapter ist ein Community-Projekt und steht in keiner Verbindung zu ntfy LLC.

### Merkmale
- **Benachrichtigungen veröffentlichen** mit vollständiger Unterstützung für ntfy-Parameter
- **Abonnieren Sie Themen** und erhalten Sie Nachrichten in Echtzeit über SSE (Server-Sent Events).
- **Kontostatistiken** – Nutzungsstatistiken anzeigen (Nachrichten, E-Mails, Anrufe, Anhänge, Reservierungen)
- **Serverversionsprüfung** – Verfügbare Updates für selbstgehostete ntfy-Instanzen erkennen
- **Verbindungsstatus** – Überwachen Sie die Verbindung des Adapters zum ntfy-Server mithilfe dynamischer Integritätsprüfungen.
- Unterstützung für Basisauthentifizierung und Bearer-Token
- Benutzerdefinierte Server-URLs (oder die Standardinstanz ntfy.sh)
- **Integrierte `sendTo`-Blockly-Blöcke** für Grafikskripte (Senden und Verwalten)
- **Benachrichtigungen verwerfen (löschen) und löschen** anhand der Sequenz-ID
- Dateianhänge per PUT hochladen

### Unterstützte Benachrichtigungsparameter
| Parameter | Beschreibung |
| -------------- | ---------------------------------------------------------------------------------- |
| `message` | Benachrichtigungstext (Standardwert: "ausgelöst", falls leer) |
| `title` | Benachrichtigungstitel |
| `priority` | Prioritätsstufe: 1 (min), 2 (niedrig), 3 (Standard), 4 (hoch), 5 (max) |
| `tags` | Tags oder Emoji-Shortcodes (durch Kommas getrennte Zeichenkette oder Array) |
| `click` | URL wird beim Klicken auf die Benachrichtigung geöffnet |
| `attach` | URL der anzuhängenden Datei |
| `attach_file` | Lokaler Dateipfad zum Hochladen als Anhang (verwendet PUT) |
| `filename` | Benutzerdefinierter Dateiname für den Anhang |
| `actions` | Aktionsschaltflächen (JSON-Zeichenfolge oder -Objekt) |
| `markdown` | Markdown-Formatierung aktivieren (`true`/`false`) |
| `delay` | Verzögerte Zustellung (z. B. "30s", "5m", "2h") |
| `email` | Benachrichtigung an diese E-Mail-Adresse weiterleiten |
| `call` | Telefonnummer für TTS (erfordert ntfy Pro) |
| `icon` | Symbol-URL, die neben der Benachrichtigung angezeigt wird |
| `sequence_id` | Eine bestehende Benachrichtigung mit derselben Sequenz-ID ersetzen/aktualisieren |
| `disable_cache` | Auf `true`/`yes` setzen, um serverseitiges Caching zu deaktivieren |
| `disable_firebase` | Auf `true`/`yes` setzen, um die Weiterleitung an Firebase Cloud Messaging (Android) zu deaktivieren |
| `unified_push` | Auf `1` setzen, um UnifiedPush-Unterstützung zu aktivieren |
| `template` | Verwenden Sie `true`/`yes` für Inline-Vorlagen oder einen Namen wie `github` für vordefinierte Vorlagen |
| `data` | JSON-Datenobjekt oder -Zeichenfolge, die für den Vorlagenkontext verwendet werden soll |
| `data` | JSON-Datenobjekt oder -Zeichenfolge, die für den Vorlagenkontext verwendet werden soll |

### Themenabonnement (Nachrichten empfangen)
Konfigurieren Sie die Themen in den Adaptereinstellungen unter der Registerkarte **Themen**. Der Adapter abonniert diese Themen über SSE und erstellt Zustände für jedes Thema unter `ntfy-client.0.topics.<topicName>`:

| Bundesland | Beschreibung |
| ----------------------- | ----------------------------------------- |
| `lastMessage` | Text der zuletzt empfangenen Nachricht |
| `lastPriority` | Zuletzt erhaltene Priorität |
| `lastTags` | Zuletzt empfangene Tags (kommagetrennt) |
| `lastClick` | URL des zuletzt empfangenen Klicks |
| `lastIcon` | URL des zuletzt empfangenen Symbols |
| `lastActions` | Zuletzt empfangene Aktionen (JSON) |
| `lastAttachmentUrl` | URL des zuletzt empfangenen Anhangs |
| `lastAttachmentName` | Name des zuletzt empfangenen Anhangs |
| `lastAttachmentType` | MIME-Typ des zuletzt empfangenen Anhangs |
| `lastAttachmentSize` | Größe des zuletzt empfangenen Anhangs (Bytes) |
| `lastAttachmentExpires` | Zeitstempel des Ablaufs des zuletzt empfangenen Anhangs |
| `lastTimestamp` | Zeitstempel der letzten Nachricht |
| `lastExpires` | Zeitstempel des Ablaufs der letzten Nachricht |
| `lastMessageId` | Letzte Nachrichten-ID |
| `lastSequenceId` | Letzte Sequenz-ID (zur Nachrichtenverwaltung) |
| `lastTopic` | Name des zuletzt empfangenen Themas |
| `lastEvent` | Letzter empfangener Ereignistyp |
| `lastJson` | Vollständiges JSON der zuletzt empfangenen Nachricht |
| `subscribed` | Gibt an, ob das Abonnement aktiv ist |
| `subscribed` | Gibt an, ob das Abonnement aktiv ist |

### Kontostatistiken
Wenn die Authentifizierung konfiguriert ist, ruft der Adapter alle 15 Minuten Kontostatistiken ab und speichert sie unter `ntfy-client.0.stats`:

- **Nachrichten**: veröffentlicht, verbleibend, Limit, Ablaufdauer
- **E-Mails**: gesendet, verbleibend, Limit
- **Telefonate**: getätigt, verbleibend, Limit
- **Reservierte Themen**: Anzahl, verbleibend, Limit
- **Anhänge**: Speicherplatz belegt/verbleibend/limitiert, Ablaufdatum, Dateigrößenbeschränkung, Bandbreitenlimit
- **Konto**: Abonnementstufe

### Verbindungsstatus und Integritätsprüfungen
Der Adapter überwacht die Verbindung zum ntfy-Server über den Zustand `info.connection`:

| Bundesland | Beschreibung |
| ---------------------- | ------------------------------------------- |
| `info.connection` | Verbindungsstatus zum ntfy-Server |
| `info.latestVersion` | Neueste verfügbare Version (nur selbst gehostet) |
| `info.updateAvailable` | Gibt an, ob ein Server-Update verfügbar ist |
| `info.updateAvailable` | Gibt an, ob ein Server-Update verfügbar ist |

Der Health Check wird mit **dynamischen Intervallen** gegen den Endpunkt `/v1/health` ausgeführt:

- **Alle 6 Stunden**, wenn der Server betriebsbereit ist
- **Alle 5 Minuten**, wenn die letzte Überprüfung fehlgeschlagen ist (zur schnelleren Wiederherstellung)

Außerdem wird der Verbindungsstatus automatisch auf **verbunden** gesetzt, wenn:

Eine Benachrichtigung wurde erfolgreich gesendet
- Eine SSE-Abonnementverbindung wurde erfolgreich hergestellt
- Es wurde eine Nachricht zu einem abonnierten Thema empfangen.

### Blockly-Beispiele
Verwenden Sie unter der Kategorie **Senden an** die folgenden Blöcke:

#### 1. ntfy-Client-Benachrichtigung (senden)
Sende eine Nachricht mit allen unterstützten Parametern:

1. Legen Sie die **Instanz** fest.
2. Legen Sie die **Nachricht** fest.
3. Legen Sie das **Thema** fest (oder lassen Sie das Feld leer, um das Standardthema zu verwenden).
4. Optional können über den **Mutator** (Zahnradsymbol) weitere Parameter hinzugefügt werden: Titel, Priorität, Tags, Symbol, Klick-URL, Aktionen, Anhänge, Verzögerung, E-Mail, Anruf usw.
5. Verwenden Sie die **Sequenz-ID**, wenn Sie eine bestehende Benachrichtigung später aktualisieren/überschreiben möchten.

#### 2. ntfy-Clientverwaltung (verwalten)
Eine bestehende Benachrichtigung löschen oder entfernen:

1. Die **Instanz** festlegen.
2. Die **Aktion** festlegen (als gelesen markieren und verwerfen oder löschen).
3. Legen Sie das **Thema** fest.
4. Legen Sie die **Sequenz-ID** der Nachricht fest, die Sie verwalten möchten.

**Hinweis zu IDs:** Jeder Benachrichtigung wird vom Server eine eindeutige `id` (Nachrichten-ID) zugewiesen.

– Wenn Sie beim Senden eine `sequence_id` angeben, müssen Sie diese `sequence_id` für alle Verwaltungsaktionen (Verwerfen, Löschen) verwenden.

– Wenn Sie keine `sequence_id` angeben, dient die vom Server generierte `id` (Nachrichten-ID) als `sequence_id` für die Verwaltung.

Mehrere Nachrichten mit derselben `sequence_id` bilden eine Sequenz – es wird nur die letzte Nachricht einer Sequenz angezeigt.

### JavaScript-Beispiele
#### Benachrichtigung senden
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Motion detected in the backyard!",
  title: "Security Alert",
  topic: "home_alerts_xyz",
  priority: "high",
  tags: "warning,motion",
  click: "https://example.com",
  markdown: true,
});
```

#### Mit E-Mail-Weiterleitung und Symbol senden
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Temperature above threshold!",
  topic: "home_alerts_xyz",
  email: "admin@example.com",
  icon: "https://example.com/icon.png",
  priority: "4",
});
```

#### Mit Dateianhang senden
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Security camera snapshot",
  topic: "home_alerts_xyz",
  attach_file: "/tmp/snapshot.jpg",
  filename: "camera_snapshot.jpg",
});
```

#### Mit Aktionsschaltflächen senden
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Doorbell rang!",
  topic: "home_alerts_xyz",
  actions: [
    { action: "view", label: "Open Camera", url: "https://camera.example.com" },
    {
      action: "http",
      label: "Turn on Light",
      url: "https://ha.example.com/api/light/on",
      method: "POST",
    },
  ],
});
```

#### Mit Vorlage senden (Inline / Manuell)
Verwenden Sie das Feld `message` als Vorlagenzeichenfolge und geben Sie den JSON-Kontext im Feld `data` an:

```javascript
sendTo("ntfy-client.0", "send", {
  topic: "home_alerts_xyz",
  template: true,
  message: "Current temperature is {{.temp}}°C from {{.sensor}}",
  data: { temp: 42, sensor: "living_room" },
});
```

#### Mit Vorlage senden (Vordefiniert / z. B. GitHub)
Für vordefinierte Vorlagen wie `github` geben Sie die ursprünglichen Webhook-JSON-Daten im Feld `data` an. Die Datenstruktur muss mit derjenigen übereinstimmen, die der ursprüngliche Dienst sendet ([siehe Quelltext](https://github.com/binwiederhier/ntfy/blob/main/server/templates/github.yml)):

```javascript
sendTo("ntfy-client.0", "send", {
  topic: "github_webhooks",
  template: "github",
  data: {
    action: "opened",
    issue: {
      number: 42,
      title: "Found a bug",
      html_url: "https://github.com/my/repo/issues/42",
      user: { html_url: "https://github.com/octocat" },
    },
    repository: {
      full_name: "my/repo",
      html_url: "https://github.com/my/repo",
    },
  },
});
```

**Hinweis:** Vordefinierte Vorlagen erwarten die **exakte Datenstruktur** des Originaldienstes. Fehlende oder falsch benannte Felder werden als `<no value>` angezeigt. Für volle Kontrolle über die Formatierung verwenden Sie stattdessen eine Inline-Vorlage (`template: true`).

#### Benachrichtigung ausblenden
```javascript
sendTo("ntfy-client.0", "dismiss", {
  topic: "home_alerts_xyz",
  sequence_id: "abc123",
});
```

#### Eine Benachrichtigung löschen
```javascript
sendTo("ntfy-client.0", "delete", {
  topic: "home_alerts_xyz",
  sequence_id: "abc123",
});
```

### Authentifizierung
Ntfy unterstützt einige Varianten:

- **Keine**: Geeignet für Standard-ntfy.sh-Server (Themen sind öffentlich!).
- **Basisauthentifizierung**: Lokalen Server mit Benutzername und Passwort einrichten.
- **Zugriffstoken**: Erstellen Sie Tokens und verwenden Sie die Bearer-Token-Validierung für Ihr Thema.

### Befehle
| Befehl | Beschreibung |
| ------------------- | ---------------------------------------------------- |
| `send` / `publish` | Benachrichtigung senden |
| `delete` | Benachrichtigung anhand der sequence_id löschen |
| `delete` | Eine Benachrichtigung anhand der sequence_id löschen |

## Rechtliche Hinweise
Dieser Adapter ist **KEIN** offizielles Produkt der ntfy LLC. Der Name **ntfy**, das Logo und die Markenrechte sind eingetragene Warenzeichen der ntfy LLC. Dieser Adapter ist ein Community-Projekt zur Integration in ioBroker.

## Changelog

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.4 (2026-06-07)

- (lubepi) **FIXED**: Adapter now creates missing parent folder objects (stats, topics) so they appear correctly in the object tree
- (lubepi) **FIXED**: Corrected state roles for attachment-related states (storage, file size, bandwidth)
- (lubepi) **ENHANCED**: Hardened error handling throughout the adapter and extracted reusable helper methods
- (lubepi) **ENHANCED**: Cleaned up orphaned translation keys from all language files

### 0.1.3 (2026-04-12)
- (lubepi) Refactor: Move internal config signature to local file storage (remove useless object from tree)

### 0.1.2 (2026-04-12)
- (lubepi) Update axios due to critical security fixes (SSRF, Header Injection)

### 0.1.1 (2026-04-12)
- (lubepi) Reset runtime states on server or account configuration changes
- (lubepi) Mask credentials in logs and only log the configured authentication type

### 0.1.0 (2026-04-12)
- (lubepi) Initial release with full ntfy.sh support
- Subscribe to topics via SSE (receive messages in real-time)
- Publish notifications with all ntfy parameters (title, priority, tags, click, attach, actions, markdown, delay, email, call, icon, sequence_id, disable_cache, disable_firebase, unified_push, template)
- File upload attachments via PUT
- Dismiss and delete notifications by sequence_id
- Account statistics (messages, emails, calls, attachments, reservations)
- Server version check for self-hosted instances
- Dynamic connection status monitoring with health checks
- Blockly blocks for sending and managing notifications
- Full i18n support (en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn)

[Older changes can be found here](CHANGELOG_OLD.md)

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