---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.jellyfin/README.md
title: ioBroker.jellyfin
hash: LXNQZh8RGfjeUghOkVbk4eOPUTEbrGRDMbIjUpRKWbM=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.jellyfin.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.jellyfin.svg)
![Anzahl der Installationen](https://iobroker.live/badges/jellyfin-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/jellyfin-stable.svg)
![Test und Freigabe](https://github.com/Schimi1983/ioBroker.jellyfin/workflows/Test%20and%20Release/badge.svg)
![GitHub-Sponsoren](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white)

<img src="admin/jellyfin.png" alt="Logo" width="100">

# ioBroker.jellyfin

**🇩🇪 Deutsche Anleitung: [docs/de/README.md](https://github.com/Schimi1983/ioBroker.jellyfin/blob/main/docs/de/README.md)**

Sehen Sie, was auf Ihren [Jellyfin](https://jellyfin.org) -Apps abgespielt wird, und steuern Sie diese über ioBroker – pausieren Sie den Film, wenn die Türklingel ertönt, dimmen Sie das Licht, wenn ein Film beginnt, oder zeigen Sie das Cover in Ihrer Visualisierung an.

## Was Sie tun können

- Sehen Sie in jeder Jellyfin-App (TV, Smartphone, Browser), was gerade läuft: Titel, Serie, Folge, Cover, Position
- Beginnen Sie einen Film, eine Serie, eine Episode, ein Album oder ein Lied mit seinem Titel
- Wiedergabe, Pause, Stopp, vor- und zurückspringen, zu einer Position springen
- Lautstärke ändern oder stummschalten
- Zeigen Sie eine Nachricht auf dem Fernsehbildschirm an (z. B. „Jemand ist an der Tür“).
- Starten Sie einen Scan Ihrer Bibliotheken

## Was Sie benötigen

- Ein Jellyfin-Server, Version 12 oder neuer
- Die Jellyfin-App auf den Geräten, die Sie sehen oder steuern möchten.

## Einrichtung in 3 Schritten

1. **Erstellen Sie einen Schlüssel in Jellyfin:** Öffnen Sie Jellyfin im Browser → **Dashboard** → **API-Schlüssel** → **+** , benennen Sie ihn. `ioBroker` und den Schlüssel kopieren.
2. **Installieren Sie den Adapter** in ioBroker und öffnen Sie die Instanzeinstellungen.
3. **Geben Sie die Serveradresse** genau so ein, wie Sie Jellyfin im Browser öffnen (mit Port, z. B. ). `http://192.168.1.10:8096`) und den **Schlüssel** , dann speichern.

Das war's. Jede Jellyfin-App, die mit dem Server verbunden ist, wird nun unten als Gerät angezeigt. `jellyfin.0` Die

## Anhand der Werte

Jedes Gerät verfügt über drei Ordner:

| Ordner    | Was ist darin enthalten?                                                                                                                                       |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info`    | Name des Geräts, der App, des Benutzers, ob es verbunden ist und ob es gesteuert werden kann                                                                   |
| `media`   | Was wird abgespielt? `state` (Wiedergabe / Pause / Stopp), `title`, `series`, `season`, `episode`, `cover`, `elapsed`, `duration`, Und `seek`, `volume`, `mute` |
| `command` | Tasten: `play`, `pause`, `playPause`, `stop`, `next`, `previous`, `forward`, `rewind`, `volumeUp`, `volumeDown`, `toggleMute`, `playTitle` Und `message`         |

**Beispiele**

- **Licht dimmen, wenn ein Film beginnt:** reagieren auf `jellyfin.0.<device>.media.state` Änderung zu `play` Die
- **Einen Film starten:** Den Titel in ein Feld eingeben `jellyfin.0.<device>.command.playTitle` z.B. `Home Alone` Die
- **Pause beim Klingeln an der Tür:** einstellen `jellyfin.0.<device>.command.pause` Zu `true` Die
- **Nachricht im Fernsehen:** Schreiben Sie den Text in `jellyfin.0.<device>.command.message` Die
- **Abdeckung in VIS:** verwenden `jellyfin.0.<device>.media.cover` als Bildadresse.
- **Springe zur Mitte:** schreibe `50` hinein `media.seek` (Prozent des Films).

Unten `jellyfin.0.server` Sie sehen die Serverversion, ob ein Update oder Neustart aussteht, wie viele Geräte verbunden sind und spielen, und die Schaltfläche `refreshLibrary` Alle Bibliotheken durchsuchen.

## Gut zu wissen

- **Ein Gerät, zwei Verbindungen:** Die Jellyfin-Apps für Smartphones, Tablets und Fernseher registrieren sich zweimal beim Server (App und Player). Der Adapter vereint beides in einem Gerät: Sie sehen, was der Player anzeigt, und die Befehle werden an die App gesendet.
- **Ein Gerät zeigt „kann nicht gesteuert werden“** an `info.remoteControl` = false), obwohl die App geöffnet ist: Starten Sie die App neu. Falls das nicht hilft, melden Sie sich in der App ab und wieder an.
- **Die Lautstärkeregelung** funktioniert auf jedem Gerät anders:

| Gerät                                       | Volumenwert               | Lauter / leiser | Stumm                                                            |
| ------------------------------------------- | ------------------------- | --------------- | ---------------------------------------------------------------- |
| Browser                                     | ✔                         | ✔               | ✔                                                                |
| TV-App (Fire TV, NVIDIA SHIELD, Android TV) | ✘ nur ein kleiner Schritt | ✔               | ✔ (nicht, wenn der Ton an einen AV-Receiver weitergeleitet wird) |
| Smartphone-/Tablet-App                      | ✘ (Systemlautstärke)      | ✘               | ✔                                                                |

- **Android-Smartphone-App:** Mit dem integrierten Player (Standardeinstellung) sehen Sie, was gerade abgespielt wird, die App reagiert jedoch nicht auf Eingaben. Die Fernsteuerung funktioniert mit dem **Webplayer** (App-Einstellungen): Ein über ioBroker gestarteter Film wartet, bis Sie einmal auf dem Smartphone auf „Wiedergabe“ tippen.
- **iPad-App:** Funktioniert sofort, ein über ioBroker gestarteter Film wird sofort abgespielt.
- **Nachrichten:** TV-Apps blenden Nachrichten mit einer Anzeigedauer nach 2–3 Sekunden aus, unabhängig von der eingestellten Zeit. Im Browser bleiben Nachrichten ohne Anzeigedauer so lange sichtbar, bis sie geschlossen werden.
- **Wenn ein Gerät als „nicht verbunden“ angezeigt wird,** ist die App geschlossen oder das Gerät ausgeschaltet. Sobald die App wieder eine Verbindung herstellt, werden alle Daten automatisch aktualisiert.
- Ein Befehl wird nur dann gesendet, wenn die App ihn in diesem Moment akzeptiert. Andernfalls finden Sie eine kurze Meldung im Protokoll.
- **Alte Geräte** werden nie automatisch gelöscht, sodass Ihre Skripte und VIS-Verknüpfungen erhalten bleiben, auch wenn ein Gerät längere Zeit ausgeschaltet ist. Sie können nicht mehr benötigte Geräte im Tab **„Objekte“** löschen.
- **Option „Nur steuerbare Geräte anzeigen“:** Neue Geräte werden nur hinzugefügt, wenn sie Befehle akzeptieren. Bereits vorhandene Geräte bleiben erhalten – löschen Sie sie im Tab **„Objekte“** , wenn Sie sie nicht mehr benötigen.

## Fragen und Probleme

- **„Der Jellyfin-Server hat den API-Schlüssel abgelehnt“** – überprüfen Sie den Schlüssel oder erstellen Sie einen neuen im Jellyfin-Dashboard.
- **„Jellyfin wurde unter dieser Adresse nicht gefunden“** – überprüfen Sie die Adresse, den Port und – falls Jellyfin hinter einem Reverse-Proxy läuft – den Pfad (z. B. `https://example.com/jellyfin`).
- **"Der Jellyfin-Server ist nicht erreichbar"** – Läuft der Server und ist er vom ioBroker-Computer aus erreichbar?
- **„Jellyfin … wird nicht unterstützt“** – der Adapter benötigt Jellyfin 12 oder neuer, bitte aktualisieren Sie den Server.
- Gibt es noch etwas? Bitte erstellen Sie ein [Ticket](https://github.com/Schimi1983/ioBroker.jellyfin/issues) und fügen Sie das Log hinzu (Log-Level: _Debug_ ).

<details>
<summary>For advanced users</summary>

### Alle Zustände eines Geräts

| Zustand                                                                                                                                  | Typ             | Zugang          | Beschreibung                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- |
| `info.name`                                                                                                                              | Zeichenkette    | lesen           | Gerätename                                                                                                          |
| `info.client` /`info.version`                                                                                                            | Zeichenkette    | lesen           | App und Version                                                                                                     |
| `info.user`                                                                                                                              | Zeichenkette    | lesen           | Jellyfin-Nutzer                                                                                                     |
| `info.reachable`                                                                                                                         | boolescher Wert | lesen           | Eine Sitzung ist auf dem Server vorhanden.                                                                          |
| `info.remoteControl`                                                                                                                     | boolescher Wert | lesen           | Die Sitzung nimmt jetzt Befehle entgegen.                                                                           |
| `info.lastActivity`                                                                                                                      | Nummer          | lesen           | letzte Aktivität (Zeitstempel in ms)                                                                                |
| `media.state`                                                                                                                            | Zeichenkette    | lesen           | `play`, `pause`, `stop`                                                                                             |
| `media.title`, `media.type`, `media.series`, `media.season`, `media.episode`, `media.artist`, `media.album`, `media.genre`, `media.year` | Zeichenkette    | lesen           | aktueller Artikel                                                                                                   |
| `media.cover`                                                                                                                            | Zeichenkette    | lesen           | Cover-URL (keine Anmeldung erforderlich)                                                                            |
| `media.duration` /`media.elapsed`                                                                                                        | Nummer(n)       | lesen           | Länge und Position                                                                                                  |
| `media.seek`                                                                                                                             | Nummer (%)      | lesen/schreiben | Position in Prozent, schreibe zum Springen                                                                          |
| `media.volume`                                                                                                                           | Nummer (%)      | lesen/schreiben | Lautstärke (wird nur angezeigt, wenn die App ihre Lautstärke meldet)                                                |
| `media.mute`                                                                                                                             | boolescher Wert | lesen/schreiben | Stumm (wird nur ausgefüllt, wenn die App ihre Lautstärke meldet)                                                    |
| `media.repeat`                                                                                                                           | Nummer          | lesen/schreiben | `0` aus, `1` alle, `2` eins (nur ausfüllen, wenn die App dies unterstützt)                                            |
| `media.itemId`                                                                                                                           | Zeichenkette    | lesen           | Quallen-ID des aktuellen Artikels                                                                                   |
| `command.*`                                                                                                                              | boolescher Wert | schreiben       | Tasten                                                                                                              |
| `command.playTitle`                                                                                                                      | Zeichenkette    | lesen/schreiben | Titel (Suche, exakte Übereinstimmung bevorzugt; eine Serie beginnt mit ihrer ersten Folge) oder Jellyfin-Artikel-ID |
| `command.message`                                                                                                                        | Zeichenkette    | lesen/schreiben | Text oder JSON `{"text":"…","header":"…","timeoutMs":5000}`                                                         |
| `command.generalCommand`                                                                                                                 | Zeichenkette    | lesen/schreiben | jeder Jellyfin-Befehl, z.B. `GoHome` oder `{"Name":"SetVolume","Arguments":{"Volume":"30"}}`                          |

Geräte-IDs: Browser verwenden ihre eigene (gekürzte) ID; Apps werden durch App-, Gerätenamen und Benutzer (16-stelliger Hash) identifiziert, sodass beide Verbindungen einer App auf demselben Gerät landen.

### Nachricht per Skript

```typescript
// all devices that can show messages
sendTo('jellyfin.0', 'message', { text: 'Someone is at the door', header: 'Doorbell' });
// one device (object id or part of the device name)
sendTo('jellyfin.0', 'message', { text: 'Dinner is ready', device: 'SHIELD' }, (res) => log(JSON.stringify(res)));
```

Die Antwort lautet: `{ sent: <number of devices>, errors: [...] }` Die

### Experteneinstellungen

In den Instanzeinstellungen sichtbar, wenn der Expertenmodus aktiviert ist: Aktualisierungsintervall (wie oft der Server den Wiedergabestatus sendet, Standard 5 s), Coverhöhe (Standard 300 px, 0 = Original) und Anfrage-Timeout.

</details>

## Unterstützung

Der Adapter ist und bleibt kostenlos. Wenn er Ihnen nützlich ist und Sie sich bedanken möchten, können Sie die Entwicklung unterstützen:

Fehlerberichte und Ideen in den [Issues](https://github.com/Schimi1983/ioBroker.jellyfin/issues) sind genauso hilfreich.

## Haftungsausschluss

Jellyfin ist ein freies Softwareprojekt. Dieser Adapter steht in keiner Verbindung zum Jellyfin-Projekt und wird von diesem auch nicht unterstützt. Das Jellyfin-Logo ist © den Jellyfin-Mitwirkenden ( [jellyfin-ux](https://github.com/jellyfin/jellyfin-ux) ) und unter der Lizenz [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) lizenziert.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.7 (2026-11-20)

- (Schimi1983) The elapsed time (`media.elapsed`, `media.seek`) now counts on every second while playing, instead of jumping with each report of the server

### 0.1.6 (2026-11-16)

- (Schimi) Outdated value lists of states are replaced without `setObject()` (repository checker S5054)
- (Schimi) Errors while marking devices as not connected after a lost connection are logged instead of being swallowed

### 0.1.5 (2026-11-12)

- (Schimi) Devices that are offline at adapter start also get the updated objects (`media.repeat` as number, `info.client` role) and their old repeat value is converted

### 0.1.4 (2026-11-12)

- (Schimi) **Changed:** `media.repeat` is now a number with role `media.mode.repeat` (0 off, 1 all, 2 one) instead of the Jellyfin names; scripts that write `RepeatNone`/`RepeatAll`/`RepeatOne` keep working
- (Schimi) Device ids that contain uppercase letters are hashed, so two ids can never differ only in case
- (Schimi) The connection to Jellyfin is given up and retried if it cannot be opened within the request timeout
- (Schimi) `info.client` uses the role `text`

### 0.1.3 (2026-11-01)

- (Schimi) Existing installations also get the translated names of `info` and `info.connection`

## License

MIT License

Copyright (c) 2026 Schimi <github@world-mg.de>

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