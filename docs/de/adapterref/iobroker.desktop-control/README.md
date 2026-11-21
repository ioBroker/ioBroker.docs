---
chapters: {"pages":{"en/adapterref/iobroker.desktop-control/README.md":{"title":{"en":"ioBroker.desktop-control"},"content":"en/adapterref/iobroker.desktop-control/README.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md":{"title":{"en":"Command reference"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md":{"title":{"en":"Befehlsreferenz"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.desktop-control/README.md
title: ioBroker.desktop-control
hash: VsCU3XTEZQJ1+R+NlJmfNt0M1Z/hosX84BX01SVVlq4=
---
![Logo](../../../en/adapterref/iobroker.desktop-control/admin/desktop-control.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.desktop-control.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.desktop-control.svg)
![Anzahl der Installationen](https://iobroker.live/badges/desktop-control-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/desktop-control-stable.svg)
![NPM](https://nodei.co/npm/iobroker.desktop-control.png?downloads=true)
![Test und Freigabe](https://github.com/ipod86/ioBroker.desktop-control/workflows/Test%20and%20Release/badge.svg)

# ioBroker.desktop-control

## Desktop-Steuerungsadapter für ioBroker

Steuert Windows-PCs über ioBroker: Popups, Programme, Audio, Text-to-Speech, Screenshots, Energieverwaltung, Tastatur/Maus und mehr. Auf jedem PC läuft der kleine **WinCtl-** Agent (eine einzelne EXE-Datei, kein Installationsprogramm); Adapter und Agent kommunizieren über **MQTT** .

Der Agent beschreibt sich selbst: Er veröffentlicht alle seine Befehle, Parameter und Zustände als Manifest, und der Adapter generiert daraus die Datenpunkte. Neue Agentenbefehle erscheinen daher ohne Adapteraktualisierung.

## Anforderungen

- Node.js >= 22.12, js-controller >= 6.0.11, admin >= 7.8.23
- Der WinCtl-Agent auf jedem PC zur Steuerung: Download `WinCtl.exe` aus [den Veröffentlichungen](https://github.com/ipod86/WinCtl/releases)
- Sonst nichts: Der Adapter verfügt über einen integrierten MQTT-Broker. Alternativ kann auch ein vorhandener Broker (Mosquitto, ioBroker MQTT-Adapter) verwendet werden.

## Aufstellen

1. Adaptereinstellungen: „Integrierter Broker“ beibehalten (standardmäßig Port 1886). Optional können Sie einen Benutzernamen und ein Passwort festlegen – die Agenten müssen diese dann verwenden.
2. Start `WinCtl.exe` auf dem PC. Geben Sie in den Einstellungen die **IP-Adresse des ioBroker-Servers** , den Port (1886) und den Benutzernamen ein.
3. Sobald ein PC angeschlossen ist, wird er als Gerät erkannt.

### Makler: integriert oder vorhanden

Adapter und Agenten tauschen alle Daten über einen MQTT-Broker aus. Zwei Optionen:

|                    | Eingebauter Broker (Standard)                                               | Bestehender Makler                                                                                                      |
| ------------------ | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Layout             | `WinCtl.exe` → **Adapter** (Anschluss 1886)                                 | `WinCtl.exe` → Broker ← Adapter                                                                                         |
| Adaptereinstellung | „Integrierter Broker“, Port, optionaler Benutzername/Passwort               | "Bestehender Broker" + Adresse, Port und Login des Brokers                                                              |
| Im Agenten         | IP-Adresse des ioBroker-Servers, Port 1886, Anmeldung über den Adapter      | Adresse, Port und Login des Brokers                                                                                     |
| Gut für            | Bei den meisten Installationen ist keine weitere Installation erforderlich. | Mosquitto oder der ioBroker MQTT-Adapter läuft bereits, ACLs/TLS sind erwünscht, oder andere Programme sollten mitlesen |

Der integrierte Broker verwendet absichtlich Port 1886 und nicht 1883, um Konflikte mit einem bestehenden Broker oder dem MQTT-Adapter zu vermeiden.

## Datenpunkte

### Überblick

| Datenpunkt        | Beschreibung                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | Adapter mit MQTT-Broker verbunden                                                                                                       |
| `<pc>.online`     | Agent dieses PCs verbunden                                                                                                              |
| `<pc>.lastSeen`   | Zeitpunkt der letzten Nachricht des Agenten                                                                                             |
| `<pc>.info.*`     | Informationen zum PC (siehe unten)                                                                                                      |
| `<pc>.state.*`    | Vom Agenten gemeldete Werte (siehe Staaten)                                                                                             |
| `<pc>.event.*`    | Ereignisse des PC (siehe unten)                                                                                                         |
| `<pc>.cmd.*`      | Ein Datenpunkt pro Befehl (siehe Befehle)                                                                                               |
| `<pc>.cmd.result` | Ergebnis des letzten Befehls, z. B. die Antwort von `ask`                                                                               |
| `<pc>.screenshot` | Pfad des letzten Screenshots im ioBroker-Dateispeicher, z. B. `/desktop-control.0/screenshots/<pc>.jpg`                                 |
| `<pc>.cmd.wake`   | Schaltet den PC über Wake-on-LAN ein – dies wird vom Adapter gesteuert, sodass es auch im ausgeschalteten Zustand des PCs funktioniert. |
| `all.cmd.*`       | Sendet einen Befehl gleichzeitig an alle PCs (`all.cmd.wake` (weckt alle ausgeschalteten PCs auf)                                       |

### Info (`<pc>.info.*`)

| Datenpunkt | Beschreibung                                             |
| ---------- | -------------------------------------------------------- |
| `hostname` | Computername                                             |
| `ip`       | IP-Adresse                                               |
| `version`  | Agentenversion                                           |
| `os`       | Windows-Version                                          |
| `user`     | Angemeldeter Benutzer                                    |
| `started`  | Startzeit des Agenten                                    |
| `mac`      | MAC-Adresse der Netzwerkkarte (für Wake-on-LAN)          |
| `apps`     | Programm-Aliase, die der Agent starten kann (JSON-Liste) |

### Veranstaltungen (`<pc>.event.*`)

Wird bei jedem Ereignis geschrieben (auch wenn der Inhalt gleich ist), also ein Auslöser mit `change: 'any'` Wird jedes Mal ausgelöst. Der Wert ist JSON, z. B. `{"ts":"2026-10-23T12:00:00Z"}` Die

| Datenpunkt                            | Wann                                                                                                              |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `lock` /`unlock`                      | Bildschirm gesperrt / entsperrt                                                                                   |
| `logon` /`logoff`                     | Benutzer angemeldet / abgemeldet                                                                                  |
| `remote_connect` /`remote_disconnect` | Remotedesktop-Sitzung verbunden / getrennt                                                                        |
| `suspend` /`resume`                   | PC geht in den Standby-Modus / wacht auf                                                                          |
| `hotkey`                              | Es wurde eine Tastenkombination aus den Agenteneinstellungen gedrückt: `{"name":"szene_kino","keys":"ctrl+alt+1"}` |

### Befehle (`<pc>.cmd.*`)

- **Schaltfläche:** Befehle ohne Optionen – zum Ausführen klicken.
- **Taste +`_json` Eingabe:** Befehle, deren Optionen alle optional sind (z. B. `screenshot`, `mute`, `beep`): Die Schaltfläche funktioniert mit den Standardeinstellungen, `cmd.<command>_json` nimmt die Optionen.
- **Eingabe:** Befehle mit einer erforderlichen Option. Geben Sie einen der folgenden Befehle ein:
  - die **Kurzform** : einfach der Wert der Hauptoption, z. B. `Hello` hinein `cmd.speak`
  - **JSON** mit beliebigen Optionen, z. B. `{"text":"Hello","rate":2}`
  - `true` – führt den Befehl mit seinen Standardoptionen aus
- Die Objektbeschreibung jedes Befehlsdatenpunkts listet dessen Optionen und ein Beispiel auf.
- Das Ergebnis erscheint in `<pc>.cmd.result` Die
- Sicherheitsrelevante Befehle (z. B. `shell`) und im Agenten deaktivierte Befehle erhalten keinen Datenpunkt; sie können nur über `sendTo` Die `run` Und `kill` Es wird ein Datenpunkt gespeichert, solange der Agent nur Programme aus seiner Aliasliste startet (Option "beliebiges Programm zulassen" deaktiviert). `cmd.run` bietet die Aliase als Auswahl an.

<!-- generated:start -->

_Generiert vom Agenten (Agentenversion 0.6.4). Beispiele und alle Optionsbeschreibungen: [docs/COMMANDS.md](/#/docs/adapterref/iobroker.desktop-control/docs/COMMANDS.md) ; die Objektbeschreibung jedes Befehlsdatenpunkts listet dessen Optionen und ein Beispiel auf._

#### System

| Befehl          | Beschreibung                                                            | Datenpunkt   | Kurzform | Optionen |
| --------------- | ----------------------------------------------------------------------- | ------------ | -------- | -------- |
| `ping`          | Lebenszeichen, Antworten mit der Zeit und Agentenversion                | Taste        |          |          |
| `get_state`     | Veröffentlicht alle Zustandswerte erneut                                | Taste        |          |          |
| `reload_config` | Lädt die Agentenkonfiguration neu und stellt die Verbindung wieder her. | Taste        |          |          |
| `exit`          | Stoppt den Agenten                                                      | nur `sendTo` |          |          |
| `list_commands` | Gibt die Liste aller Befehle zurück.                                    | Taste        |          |          |
| `check_update`  | Prüft auf eine neuere Agentenversion (GitHub-Releases)                  | Taste        |          |          |
| `update`        | Installiert die neueste Agentenversion und startet den Agenten neu.     | Taste        |          |          |

#### Power & Session

| Befehl            | Beschreibung                                                                     | Datenpunkt                        | Kurzform | Optionen           |
| ----------------- | -------------------------------------------------------------------------------- | --------------------------------- | -------- | ------------------ |
| `lock`            | Sperrt den Bildschirm (Win+L)                                                    | Taste                             |          |                    |
| `sleep`           | Stehen zu                                                                        | Taste                             |          |                    |
| `hibernate`       | Überwintern                                                                      | Taste                             |          |                    |
| `shutdown`        | Schaltet den PC aus                                                              | Schaltfläche + `shutdown_json`    | `delay`  | `delay`, `force`  |
| `restart`         | Startet den PC neu.                                                              | Schaltfläche + `restart_json`     | `delay`  | `delay`, `force`  |
| `logoff`          | Meldet den Benutzer ab                                                           | Taste                             |          |                    |
| `cancel_shutdown` | Bricht eine geplante Abschaltung/einen Neustart ab                               | Taste                             |          |                    |
| `monitor_off`     | Schaltet die Monitore aus                                                        | Taste                             |          |                    |
| `monitor_on`      | Weckt die Monitore auf                                                           | Taste                             |          |                    |
| `screensaver`     | Startet den Bildschirmschoner (den in Windows festgelegten oder eine .scr-Datei) | Schaltfläche + `screensaver_json` | `file`   | `file`             |
| `keep_awake`      | Verhindert Standby und Bildschirmschoner                                         | Schaltfläche + `keep_awake_json`  | `state`  | `state`, `display` |

#### Programme & Fenster

| Befehl              | Beschreibung                                                          | Datenpunkt                         | Kurzform  | Optionen                                                                                                 |
| ------------------- | --------------------------------------------------------------------- | ---------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| `run`               | Startet ein Programm (Alias aus den Agenteneinstellungen)             | Eingabe (nur Aliasliste)           | `path`    | `path` \*, `args`, `workdir`, `hidden`, `window` (normal/minimiert/maximiert), `admin`, `wait`, `timeout` |
| `open`              | Öffnet eine URL, Datei oder einen Ordner mit der Standard-App.        | Eingang                            | `target`  | `target` \*                                                                                              |
| `kill`              | Beendet Prozesse anhand ihres Namens oder ihrer Prozess-ID            | Eingabe (nur Aliasliste)           | `name`    | `name`, `pid`                                                                                           |
| `list_processes`    | Listet laufende Prozesse auf                                          | Eingang                            | `filter`  | `filter`                                                                                                 |
| `list_windows`      | Listen Sie sichtbare Fenster auf                                      | Taste                              |           |                                                                                                          |
| `focus_window`      | Bringt ein Fenster nach vorne (Titel enthält …)                       | Eingang                            | `title`   | `title` \*                                                                                               |
| `close_window`      | Schließt ein Fenster (Titel enthält …)                                | Eingang                            | `title`   | `title` \*                                                                                               |
| `minimize_all`      | Minimiert alle Fenster (Desktop anzeigen) oder stellt sie wieder her. | Schaltfläche + `minimize_all_json` |           | `undo`                                                                                                   |
| `empty_recycle_bin` | Leert den Recyclingbehälter                                           | Taste                              |           |                                                                                                          |
| `shell`             | Führt einen PowerShell-/cmd-Befehl aus und gibt die Ausgabe zurück    | nur `sendTo`                       | `command` | `command` \*, `shell` (PowerShell/cmd), `timeout`                                                          |

#### Audio

| Befehl          | Beschreibung                                           | Datenpunkt                          | Kurzform | Optionen                                                                                                                  |
| --------------- | ------------------------------------------------------ | ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| `volume`        | Stellt die Gesamtlautstärke ein (0-100)                | Eingang                             | `level`  | `level` \*                                                                                                                |
| `volume_change` | Ändert die Lautstärke relativ                          | Schaltfläche + `volume_change_json` | `delta`  | `delta`                                                                                                                   |
| `mute`          | Stummschalten / Stummschaltung aufheben / umschalten   | Schaltfläche + `mute_json`          | `state`  | `state`                                                                                                                   |
| `media`         | Sendet einen Medienschlüssel                           | Eingang                             | `key`    | `key` \* (Wiedergabe/Pause/Nächster Titel/Vorheriger Titel/Stopp/Lautstärke erhöhen/Lautstärke verringern/Stummschaltung) |
| `speak`         | Text-zu-Sprache-Umwandlung                             | Eingang                             | `text`   | `text` \*, `voice`, `rate`, `volume`, `wait`, `interrupt`                                                                 |
| `list_voices`   | Listet die installierten Stimmen auf                   | Taste                               |          |                                                                                                                           |
| `play_sound`    | Spielt eine Audiodatei ab (mp3/wav/wma, Pfad oder URL) | Eingang                             | `source` | `source` \*, `wait`                                                                                                       |
| `stop_sound`    | Stoppt die Wiedergabe von Tönen / das Sprechen         | Taste                               |          |                                                                                                                           |
| `beep`          | Einfacher Piepton                                      | Schaltfläche +`beep_json`           |          | `freq`, `ms`                                                                                                               |

#### Anzeige

| Befehl          | Beschreibung                                                                                                                                               | Datenpunkt                      | Kurzform | Optionen                                                                                                                                                                                                                                                                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `show_image`    | Zeigt ein Bild als Popup, im Vollbildmodus oder in einer Ecke an.                                                                                          | Eingang                         | `source` | `source` \*, `base64`, `fit` (enthalten/strecken/zentrieren), `mode` (Popup/Vollbild/Ecke), `seconds`, `monitor`, `position` (oben links/oben/oben rechts/links/Mitte/rechts/unten links/unten/unten rechts), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg`                                   |
| `show_video`    | Spielt ein Video mit Edge/Chromium (mp4, WebM, …) ab.                                                                                                      | Eingang                         | `source` | `source` \*, `loop`, `muted`, `volume`, `controls`, `close_when_done`, `engine` (auto/edge/ie), `mode` (Popup/Vollbild/Ecke), `seconds`, `monitor`, `position` (oben links/oben/oben rechts/links/Mitte/rechts/unten links/unten/unten rechts), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg` |
| `show_web`      | Zeigt eine Webseite (vis, Lovelace, Kamerastream) mit Edge/Chromium in einem Fenster oder im Vollbildmodus an, auch mehrere Seiten nacheinander (Diashow). | Eingang                         | `url`    | `url`, `urls`, `interval`, `zoom`, `engine` (auto/edge/ie), `mode` (Popup/Vollbild/Ecke), `seconds`, `monitor`, `position` (oben links/oben/oben rechts/links/Mitte/rechts/unten links/unten/unten rechts), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg`                                    |
| `show_text`     | Zeigt Text als Überlagerung an                                                                                                                             | Eingang                         | `text`   | `text` \*, `seconds`, `size`, `color`, `bg`, `opacity`, `position` (oben/Mitte/unten), `monitor`, `bold`, `font`, `click_through`, `slot`, `max_width`, `padding`, `margin`                                                                                                                                                                                                              |
| `ask`           | Zeigt einen Dialog mit Schaltflächen/Eingabefeldern an und gibt die Antwort zurück.                                                                        | Eingang                         | `text`   | `text` \*, `title`, `buttons`, `input`, `default`, `password`, `timeout`, `width`, `font_size`, `monitor`                                                                                                                                                                                                                                                                               |
| `notify`        | Zeigt eine Windows-Benachrichtigung an                                                                                                                     | Eingang                         | `text`   | `text` \*, `title`, `icon` (Info/Warnung/Fehler/keine), `seconds`                                                                                                                                                                                                                                                                                                                        |
| `close_popups`  | Schließt alle Popups, Overlays und Dialoge                                                                                                                 | Taste                           |          |                                                                                                                                                                                                                                                                                                                                                                                         |
| `screenshot`    | Erstellt einen Screenshot (gespeichert im ioBroker-Dateispeicher)                                                                                          | Schaltfläche +`screenshot_json` |          | `monitor`, `scale`, `quality`, `format` (jpeg/png), `inline`                                                                                                                                                                                                                                                                                                                            |
| `set_wallpaper` | Legt das Desktop-Hintergrundbild fest                                                                                                                      | Eingang                         | `source` | `source` \*                                                                                                                                                                                                                                                                                                                                                                             |
| `brightness`    | Stellt die Helligkeit ein (nur interne Laptop-Displays)                                                                                                    | Eingang                         | `level`  | `level` \*                                                                                                                                                                                                                                                                                                                                                                              |

#### Eingang

| Befehl          | Beschreibung                                       | Datenpunkt                 | Kurzform | Optionen                                                                                       |
| --------------- | -------------------------------------------------- | -------------------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `start_menu`    | Öffnet oder schließt das Startmenü (Windows-Taste) | Taste                      |          |                                                                                                |
| `send_keys`     | Sendet Tastendrücke (SendKeys-Syntax)              | Eingang                    | `keys`   | `keys` \*                                                                                      |
| `type_text`     | Gibt Text in das aktive Fenster ein                | Eingang                    | `text`   | `text` \*                                                                                      |
| `mouse`         | Bewegt/klickt die Maus                             | Schaltfläche +`mouse_json` |          | `x`, `y`, `relative`, `click` (keine/einfache/doppelte), `button` (links/rechts/Mitte), `wheel` |
| `clipboard_set` | Legt den Text in der Zwischenablage fest           | Eingang                    | `text`   | `text` \*                                                                                      |
| `clipboard_get` | Liest den Text aus der Zwischenablage              | Taste                      |          |                                                                                                |

\* = erforderlich

### Staaten (`<pc>.state.*`)

| Datenpunkt                        | Typ             | Einheit | Beschreibbar | Beschreibung                                                                      |
| --------------------------------- | --------------- | ------- | ------------ | --------------------------------------------------------------------------------- |
| `state.locked`                    | boolescher Wert |         |              | Bildschirm gesperrt                                                               |
| `state.user_present`              | boolescher Wert |         |              | Benutzer aktiv (nicht gesperrt und Eingaben innerhalb des Leerlaufschwellenwerts) |
| `state.idle`                      | Nummer          | S       |              | Sekunden seit der letzten Maus-/Tastatureingabe                                   |
| `state.active_window`             | Zeichenkette    |         |              | Titel des aktiven Fensters                                                        |
| `state.active_process`            | Zeichenkette    |         |              | Prozess des aktiven Fensters                                                      |
| `state.volume`                    | Nummer          | %       | Ja           | Gesamtlautstärke                                                                  |
| `state.muted`                     | boolescher Wert |         | Ja           | Gedämpft                                                                          |
| `state.cpu`                       | Nummer          | %       |              | CPU-Auslastung                                                                    |
| `state.ram`                       | Nummer          | %       |              | RAM-Nutzung                                                                       |
| `state.ram_free_gb`               | Nummer          | GB      |              | Freier Speicher                                                                   |
| `state.uptime_min`                | Nummer          | min     |              | Zeit seit dem Windows-Start                                                       |
| `state.battery`                   | Nummer          | %       |              | Akkustand (nur Geräte mit Akku)                                                   |
| `state.charging`                  | boolescher Wert |         |              | Netzteil angeschlossen (nur für Geräte mit Batteriebetrieb)                       |
| `state.monitors`                  | Nummer          |         |              | Anzahl der Monitore                                                               |
| `state.ip`                        | Zeichenkette    |         |              | Lokale IPv4-Adresse                                                               |
| `state.user`                      | Zeichenkette    |         |              | Angemeldeter Benutzer                                                             |
| `state.keep_awake`                | boolescher Wert |         | Ja           | wach halten aktiv                                                                 |
| `state.webcam_in_use`             | boolescher Wert |         |              | Kamera in Gebrauch (z. B. Videoanruf)                                             |
| `state.webcam_app`                | Zeichenkette    |         |              | Programm(e), das/die die Kamera verwendet/nutzen                                  |
| `state.mic_in_use`                | boolescher Wert |         |              | Mikrofon in Gebrauch                                                              |
| `state.mic_app`                   | Zeichenkette    |         |              | Programm(e), das/die das Mikrofon verwendet/nutzen                                |
| `state.web_url`                   | Zeichenkette    |         |              | Seite, die show\_web aktuell anzeigt (leer = keine)                               |
| `state.update_available`          | boolescher Wert |         |              | Neuere Agentenversion verfügbar (wird beim Start und alle 12 Stunden geprüft)     |
| `state.latest_version`            | Zeichenkette    |         |              | Neueste Agentenversion auf GitHub                                                 |
| `state.disk.<drive>_free_gb`      | Nummer          | GB      |              | Freier Speicherplatz pro Laufwerk, z.B. `disk.C_free_gb`                          |
| `state.disk.<drive>_used_percent` | Nummer          | %       |              | Nutzung pro Laufwerk, z.B. `disk.C_used_percent`                                  |
| `state.proc.<name>`               | boolescher Wert |         |              | Das überwachte Programm läuft (Agenteneinstellungen „Prozesse“)                   |

<!-- generated:end -->

## Skripte (sendTo)

```js
// command to one PC (device id or host name), the answer is the result of the agent
sendTo('desktop-control.0', 'cmd', { device: 'office-pc', command: 'speak', params: { text: 'Dinner is ready' } }, res => log(JSON.stringify(res)));

// short form for the main parameter
sendTo('desktop-control.0', 'cmd', { device: 'office-pc', command: 'volume', params: 30 });

// question with buttons, waits for the answer (ask timeout from the settings)
sendTo('desktop-control.0', 'cmd', {
    device: 'living-room',
    command: 'ask',
    params: { text: 'Start movie mode?', buttons: ['Yes', 'No'], timeout: 30 },
}, res => log(res.result && res.result.button));

// all PCs, list of devices
sendTo('desktop-control.0', 'cmd', { device: 'all', command: 'lock' });
sendTo('desktop-control.0', 'devices', {}, list => log(JSON.stringify(list)));
```

Die Antwort hat die Form `{ ok, command, result, error }` Die

## Wake-on-LAN

Der Agent meldet die MAC-Adresse seiner Netzwerkkarte; der Adapter speichert sie, `cmd.wake` Funktioniert auch nach einem Neustart im ausgeschalteten Zustand. Voraussetzungen: Wake-on-LAN muss im BIOS/UEFI und in den Netzwerkkarteneinstellungen (Geräte-Manager → Netzwerkkarte → Energieverwaltung/Erweitert) aktiviert sein, der PC muss per Kabel verbunden sein und ioBroker muss sich im selben Netzwerk befinden. Der Windows-Schnellstart kann das Aufwachen aus dem Herunterfahren verhindern – deaktivieren Sie ihn gegebenenfalls.

## Aktualisierung des Agenten

Der Agent prüft beim Start und alle 12 Stunden auf GitHub auf neue Versionen (kann in den Agenteneinstellungen, erster Tab nach der Verbindung, deaktiviert werden). Er **installiert sich nicht selbst** , sondern meldet lediglich:

- `<pc>.state.update_available` –`true` wenn eine neuere Version existiert
- `<pc>.state.latest_version` – neueste Version auf GitHub; die installierte Version befindet sich in `<pc>.info.version`

Installation:

- **von ioBroker:** Schaltfläche `<pc>.cmd.update` – Lädt die neue EXE-Datei herunter, prüft die Prüfsumme, tauscht sie aus und startet den Agenten neu. Nach wenigen Sekunden ist der PC mit der neuen Version wieder online. `info.version` Die
- **Auf dem PC:** Symbol in der Taskleiste → Menüeintrag zum Prüfen auf Aktualisierungen – zeigt die Änderungen an und fragt, ob diese installiert werden sollen.
- `<pc>.cmd.check_update` Prüft sofort, ohne Installation.

Automatisch mit einem Skript:

```js
on({ id: /^desktop-control\.0\.[^.]+\.state\.update_available$/, val: true }, obj => {
    setState(obj.id.replace('state.update_available', 'cmd.update'), true);
});
```

Anforderung: Die ausführbare Datei muss sich in einem Ordner befinden, in den der Benutzer Schreibrechte hat (z. B. `C:\Tools\WinCtl` oder Downloads, nicht `C:\Program Files`).

## Sicherheit

Wer auch immer schreiben mag an `winctl/+/cmd/#` Der Agent steuert den PC. Sichern Sie den Broker mit Benutzername/Passwort und Zugriffskontrolllisten (ACLs), verwenden Sie bei Bedarf TLS. Standardmäßig startet der Agent nur Programme aus seiner Aliasliste. `shell` ist aus.

**Eingebauter Broker:** Er lauscht auf allen Netzwerkschnittstellen (`0.0.0.0` Solange kein Benutzername festgelegt ist, akzeptiert der Adapter jeden Client – jedes Gerät im LAN könnte dann Befehle an die PCs senden oder gefälschte Agentendaten übermitteln. Es wird empfohlen, in den Adaptereinstellungen einen Benutzernamen und ein Passwort festzulegen (die Agenten melden sich dann damit an); alternativ kann die Option „Abhören auf“ auf eine Netzwerkschnittstelle beschränkt werden. Ohne Anmeldung protokolliert der Adapter beim Start eine Warnung.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.2 (2026-11-12)
* (ipod86) timeouts are checked in code (invalid values use the default)
* (ipod86) object ids that differ only in case from existing ones are not created (warning in the log)
* (ipod86) security hint and startup warning for the built-in broker without login
* (ipod86) role `media.mute` is kept; manifest states without a command stay read-only
* (ipod86) English documentation (docs/COMMANDS.md, docs/PROTOCOL.md)

### 0.1.1 (2026-10-25)
* (ipod86) release published by the GitHub workflow (trusted publishing); news only for versions on npm; normalized repository URL

### 0.1.0 (2026-10-25)
* (ipod86) first public release: controls Windows PCs via the WinCtl agent over MQTT – built-in MQTT broker, popups, images, videos and web pages (Microsoft Edge), programs, audio and text-to-speech, screenshots, power, keyboard/mouse, Wake-on-LAN, camera/microphone in use, agent update from ioBroker

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