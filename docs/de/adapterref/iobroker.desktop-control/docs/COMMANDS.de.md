---
chapters: {"pages":{"en/adapterref/iobroker.desktop-control/README.md":{"title":{"en":"ioBroker.desktop-control"},"content":"en/adapterref/iobroker.desktop-control/README.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md":{"title":{"en":"Command reference"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md":{"title":{"en":"Befehlsreferenz"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md
title: Befehlsreferenz
hash: Db0FEQE5MKG8QqRqKcGjIuyAubVxxq+FEUDiyHc4/gA=
---
# Befehlsreferenz

_Englische Version: [COMMANDS.md](/#/docs/adapterref/iobroker.desktop-control/docs/COMMANDS.md)_

_Automatisch erzeugt aus `WinCtl.exe --dump-protocol` (Protokoll 1, Version 0.6.4). Nicht von Hand ändern._

Befehle werden an `{base}/{id}/cmd/<befehl>` gesendet (Payload: JSON-Objekt oder - bei Befehlen mit _Kurzform_ - ein einfacher String).

## System

### `ping`

Lebenszeichen - antwortet mit Zeitstempel und Version

### `get_state`

Veröffentlicht alle State-Werte sofort neu

### `reload_config`

Config-Datei neu einlesen und neu verbinden

### `exit` _(⚠ sicherheitsrelevant)_

Beendet den Agent

### `list_commands`

Gibt die Liste aller Befehle zurück

### `check_update`

Prüft, ob es eine neuere WinCtl-Version gibt (GitHub-Releases)

### `update`

Installiert die neueste WinCtl-Version und startet den Agent neu

## Energie & Sitzung

### `lock`

Sperrt den Bildschirm (Win+L)

### `sleep`

Stehen zu

### `hibernate`

Ruhezustand

### `shutdown`

Fährt den PC herunter\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"delay": "<text>"}` Die

Beispiele:

```
60
{"delay":0,"force":true}
```

| Parameter | Typ             | Pflicht | Standard | Beschreibung                   |
| --------- | --------------- | ------- | -------- | ------------------------------ |
| `delay`   | ganze Zahl      |         | 10       | Verzögerung in Sekunden        |
| `force`   | boolescher Wert |         | FALSCH   | Programm zwangsweise schließen |

### `restart`

Startet den PC neu\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"delay": "<text>"}` Die

Beispiele:

```
30
{"delay":0,"force":true}
```

| Parameter | Typ             | Pflicht | Standard | Beschreibung                   |
| --------- | --------------- | ------- | -------- | ------------------------------ |
| `delay`   | ganze Zahl      |         | 10       | Verzögerung in Sekunden        |
| `force`   | boolescher Wert |         | FALSCH   | Programm zwangsweise schließen |

### `logoff`

Meldet den Benutzer ab

### `cancel_shutdown`

Bricht einen geplanten Shutdown/Neustart ab

### `monitor_off`

Schaltet die Monitore aus

### `monitor_on`

Weckt die Monitore auf

### `screensaver`

Startet den Bildschirmschoner (der in Windows eingestellte oder eine .scr-Datei)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"file": "<text>"}` Die

Beispiele:

```
{"file":"C:/Windows/System32/Mystify.scr"}
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung                                                  |
| --------- | ------------ | ------- | -------- | ------------------------------------------------------------- |
| `file`    | Zeichenkette |         | ""       | Pfad zu einer .scr-Datei (leer = der in Windows eingestellte) |

### `keep_awake` _(braucht GUI-Sitzung)_

Verhindert Standby/Bildschirmschoner (bis auf Widerruf)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"state": "<text>"}` Die

Beispiele:

```
{"state":true,"display":false}
```

| Parameter | Typ             | Pflicht | Standard | Beschreibung  |
| --------- | --------------- | ------- | -------- | ------------- |
| `state`   | boolescher Wert |         | WAHR     | an/aus        |
| `display` | boolescher Wert |         | WAHR     | auch anlassen |

## Programm & Fenster

### `run` _(⚠ sicherheitsrelevant)_

Startet ein Programm (Alias aus der Config oder - wenn erlaubt - beliebiger Pfad) mit Parametern\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"path": "<text>"}` Die

Beispiele:

```
notepad
{"path":"kodi","args":"--fullscreen","window":"maximized"}
```

| Parameter | Typ             | Pflicht | Standard | Beschreibung                                    |
| --------- | --------------- | ------- | -------- | ----------------------------------------------- |
| `path`    | Zeichenkette    | ja      |          | Alias (zB 'notepad') oder Pfad zur .exe         |
| `args`    | Zeichenkette    |         |          | Parameter als String oder Liste                 |
| `workdir` | Zeichenkette    |         |          | Arbeitsverzeichnis                              |
| `hidden`  | boolescher Wert |         |          | Ohne Fenster starten                            |
| `window`  | Zeichenkette    |         |          | Fensterzustand (normal / minimiert / maximiert) |
| `admin`   | boolescher Wert |         |          | Als Administrator (UAC-Abfrage am PC!)          |
| `wait`    | boolescher Wert |         |          | Auf Ende warten und Exit-Code zurückgeben       |
| `timeout` | ganze Zahl      |         | 60       | Wartezeit in Sekunden bei wait                  |

### `open`

Öffnet URL, Datei oder Ordner mit der Standard-App (Dateien/Ordner nur mit AllowAnyRun)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"target": "<text>"}` Die

Beispiele:

```
https://www.iobroker.net
ms-settings:display
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung                          |
| --------- | ------------ | ------- | -------- | ------------------------------------- |
| `target`  | Zeichenkette | ja      |          | URL (immer erlaubt), sonst Alias/Pfad |

### `kill` _(⚠ sicherheitsrelevant)_

Beendet Prozesse nach Name oder PID\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"name": "<text>"}` Die

Beispiele:

```
notepad
{"pid":1234}
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung             |
| --------- | ------------ | ------- | -------- | ------------------------ |
| `name`    | Zeichenkette |         |          | Prozessname, zB 'chrome' |
| `pid`     | ganze Zahl   |         |          | Prozess-ID               |

### `list_processes`

Listet laufende Prozesse (max. 300)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"filter": "<text>"}` Die

Beispiele:

```
chrome
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung |
| --------- | ------------ | ------- | -------- | ------------ |
| `filter`  | Zeichenkette |         |          | Namensfilter |

### `list_windows`

Listet sichtbare Fenster mit Titel auf

### `focus_window`

Bringt ein Fenster (Titel enthält ...) in den Vordergrund\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"title": "<text>"}` Die

Beispiele:

```
Kodi
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung           |
| --------- | ------------ | ------- | -------- | ---------------------- |
| `title`   | Zeichenkette | ja      |          | Teil des Fenstertitels |

### `close_window`

Schließt ein Fenster sauber (Titel enthält ...)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"title": "<text>"}` Die

Beispiele:

```
Editor
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung           |
| --------- | ------------ | ------- | -------- | ---------------------- |
| `title`   | Zeichenkette | ja      |          | Teil des Fenstertitels |

### `minimize_all`

Alle Fenster minimieren (Desktop anzeigen) bzw. wiederherstellen

Beispiele:

```
{"undo":true}
```

| Parameter | Typ             | Pflicht | Standard | Beschreibung                      |
| --------- | --------------- | ------- | -------- | --------------------------------- |
| `undo`    | boolescher Wert |         | FALSCH   | Wiederherstellen statt minimieren |

### `empty_recycle_bin`

Leert den Papierkorb

### `shell` _(⚠ sicherheitsrelevant)_

Führt einen Shell-Befehl aus und liefert die Ausgabe (nur mit AllowShell=true)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"command": "<text>"}` Die

Beispiele:

```
Get-Date
{"command":"ipconfig","shell":"cmd"}
```

| Parameter | Typ          | Pflicht | Standard     | Beschreibung                   |
| --------- | ------------ | ------- | ------------ | ------------------------------ |
| `command` | Zeichenkette | ja      |              | Befehl / Skript                |
| `shell`   | Zeichenkette |         | "PowerShell" | Interpreter (PowerShell / cmd) |
| `timeout` | ganze Zahl   |         | 30           | Sekunden                       |

## Audio

### `volume`

Setzt die Master-Lautstärke (0-100)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"level": "<text>"}` Die

Beispiele:

```
30
```

| Parameter | Typ        | Pflicht | Standard | Beschreibung |
| --------- | ---------- | ------- | -------- | ------------ |
| `level`   | ganze Zahl | ja      |          | 0 - 100      |

### `volume_change`

Lautstärke relativ ändern\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"delta": "<text>"}` Die

Beispiele:

```
-10
```

| Parameter | Typ        | Pflicht | Standard | Beschreibung  |
| --------- | ---------- | ------- | -------- | ------------- |
| `delta`   | ganze Zahl |         | 5        | zB 5 oder -10 |

### `mute`

Stummschalten / aufheben / umschalten\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"state": "<text>"}` Die

Beispiele:

```
toggle
```

| Parameter | Typ          | Pflicht | Standard     | Beschreibung               |
| --------- | ------------ | ------- | ------------ | -------------------------- |
| `state`   | Zeichenkette |         | "Umschalten" | wahr / falsch / umschalten |

### `media`

Sendet eine Medientaste\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"key": "<text>"}` Die

Beispiele:

```
playpause
next
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung                                                                                                                             |
| --------- | ------------ | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `key`     | Zeichenkette | ja      |          | Medientaste (Wiedergabe/Pause / Nächster Titel / Vorheriger Titel / Stopp / Lautstärke erhöhen / Lautstärke verringern / Stummschaltung) |

### `speak`

Text-to-Speech (Windows-Stimme)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"text": "<text>"}` Die

Beispiele:

```
Das Essen ist fertig
{"text":"Achtung","voice":"Hedda","rate":2,"volume":80}
```

| Parameter   | Typ             | Pflicht | Standard | Beschreibung                       |
| ----------- | --------------- | ------- | -------- | ---------------------------------- |
| `text`      | Zeichenkette    | ja      |          | Zu sprechender Text                |
| `voice`     | Zeichenkette    |         |          | Teil des Stimmennamens, zB 'Hedda' |
| `rate`      | ganze Zahl      |         | 0        | -10 (langsam) bis 10 (schnell)     |
| `volume`    | ganze Zahl      |         | 100      | 0-100                              |
| `wait`      | boolescher Wert |         |          | Warten bis fertig gesprochen       |
| `interrupt` | boolescher Wert |         | WAHR     | Laufende Ausgabe abbrechen         |

### `list_voices`

Listet installierte TTS-Stimmen auf

### `play_sound`

Spielt eine Audiodatei (mp3/wav/wma, Pfad oder URL)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"source": "<text>"}` Die

Beispiele:

```
http://192.168.1.5/gong.mp3
{"source":"C:\\Sounds\\klingel.wav","wait":true}
```

| Parameter | Typ             | Pflicht | Standard | Beschreibung        |
| --------- | --------------- | ------- | -------- | ------------------- |
| `source`  | Zeichenkette    | ja      |          | Pfad oder URL       |
| `wait`    | boolescher Wert |         | FALSCH   | Warten bis zum Ende |

### `stop_sound`

Stoppt play\_sound / speak

### `beep`

Einfacher Piepton

Beispiele:

```
{"freq":1200,"ms":500}
```

| Parameter | Typ        | Pflicht | Standard | Beschreibung |
| --------- | ---------- | ------- | -------- | ------------ |
| `freq`    | ganze Zahl |         | 800      | Hz           |
| `ms`      | ganze Zahl |         | 300      | Dauer in ms  |

## Anzeige

### `show_image` _(braucht GUI-Sitzung)_

Zeigt ein Bild als Popup, Vollbild oder Ecken-Einblendung (Pfad, URL oder Base64)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"source": "<text>"}` Die

Beispiele:

```
http://kamera/snapshot.jpg
{"source":"http://kamera/snapshot.jpg","mode":"corner","position":"top-right","size":30,"seconds":10,"caption":"Haustür","slot":"klingel"}
{"source":"https://picsum.photos/1920/1080","mode":"fullscreen","seconds":15}
```

| Parameter       | Typ             | Pflicht | Standard       | Beschreibung                                                                                                    |
| --------------- | --------------- | ------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| `source`        | Zeichenkette    | ja      |                | Pfad, http(s)-URL oder data:-URI                                                                                |
| `base64`        | Zeichenkette    |         |                | Alternativ: Base64-Daten                                                                                        |
| `fit`           | Zeichenkette    |         | "enthalten"    | Skalierung (enthalten / strecken / zentrieren)                                                                  |
| `mode`          | Zeichenkette    |         | "Popup"        | Popup = Fenster in der Mitte, Vollbild = Vollbild, Ecke = Ecke (zB Türklingel-Kamera) (Popup / Vollbild / Ecke) |
| `seconds`       | Nummer          |         |                | Automatisch schließen nach X Sekunden (0 = bleibt bis Klick/close\_popups)                                      |
| `monitor`       | ganze Zahl      |         | -1             | Monitor-Index (0 = erster, -1 = Hauptmonitor)                                                                   |
| `position`      | Zeichenkette    |         | "unten rechts" | Lage bei mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right) |
| `size`          | Nummer          |         |                | Breite in % des Bildschirms (5 - 100, Seitenverhältnis bleibt; leer = automatisch: Ecke 28 %, Popup max. 70 %)  |
| `margin`        | ganze Zahl      |         | 16             | Abstand zum Bildschirmrand in Pixel (Modus=Ecke)                                                                |
| `border`        | ganze Zahl      |         | 2              | Rahmenbreite in Pixel (0 = kein Rahmen)                                                                         |
| `border_color`  | Zeichenkette    |         | "#282828"      | Rahmenfarbe, zB #ff0000                                                                                         |
| `caption_size`  | Nummer          |         | 11             | Schriftgröße der Beschriftung                                                                                   |
| `caption_color` | Zeichenkette    |         | "#ffffff"      | Farbe der Beschriftung                                                                                          |
| `caption`       | Zeichenkette    |         |                | Beschriftung unter dem Inhalt                                                                                   |
| `slot`          | Zeichenkette    |         |                | Gleicher Slot ersetzt das vorherige Popup (zB Kamerabild aktualisieren)                                         |
| `click_close`   | boolescher Wert |         |                | Klicken schließt das Popup                                                                                      |
| `opacity`       | Nummer          |         |                | Deckkraft 0,1 - 1                                                                                               |
| `activate`      | boolescher Wert |         | FALSCH         | Fokus übernehmen (Standard: nein, stört nicht beim Arbeiten)                                                    |
| `bg`            | Zeichenkette    |         |                | Hintergrundfarbe, zB #000000                                                                                    |

### `show_video` _(braucht GUI-Sitzung)_

Spielt ein Video ab (Datei oder URL; mit Edge mp4/H.264, WebM, Ogg, je nach Windows-Codecs auch HEVC)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"source": "<text>"}` Die

Beispiele:

```
http://server/video.mp4
{"source":"http://server/video.mp4","mode":"corner","position":"bottom-left","size":25,"muted":true,"loop":true}
{"source":"C:\\Videos\\intro.mp4","mode":"fullscreen","close_when_done":true}
```

| Parameter         | Typ             | Pflicht | Standard       | Beschreibung                                                                                                    |
| ----------------- | --------------- | ------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| `source`          | Zeichenkette    | ja      |                | Pfad oder URL                                                                                                   |
| `loop`            | boolescher Wert |         | FALSCH         | Endlosschleife                                                                                                  |
| `muted`           | boolescher Wert |         | FALSCH         | Ohne Ton                                                                                                        |
| `volume`          | Nummer          |         | 1              | 0 - 1                                                                                                           |
| `controls`        | boolescher Wert |         | FALSCH         | Bedienelemente anzeigen                                                                                         |
| `close_when_done` | boolescher Wert |         | WAHR           | Nach Ende schließen                                                                                             |
| `engine`          | Zeichenkette    |         | "Auto"         | Player: auto = Edge (WebView2), sonst IE11; edge = nur Edge; ie = altes IE11 (auto / edge / ie)                 |
| `mode`            | Zeichenkette    |         | "Popup"        | Popup = Fenster in der Mitte, Vollbild = Vollbild, Ecke = Ecke (zB Türklingel-Kamera) (Popup / Vollbild / Ecke) |
| `seconds`         | Nummer          |         |                | Automatisch schließen nach X Sekunden (0 = bleibt bis Klick/close\_popups)                                      |
| `monitor`         | ganze Zahl      |         | -1             | Monitor-Index (0 = erster, -1 = Hauptmonitor)                                                                   |
| `position`        | Zeichenkette    |         | "unten rechts" | Lage bei mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right) |
| `size`            | Nummer          |         |                | Breite in % des Bildschirms (5 - 100, Seitenverhältnis bleibt; leer = automatisch: Ecke 28 %, Popup max. 70 %)  |
| `margin`          | ganze Zahl      |         | 16             | Abstand zum Bildschirmrand in Pixel (Modus=Ecke)                                                                |
| `border`          | ganze Zahl      |         | 2              | Rahmenbreite in Pixel (0 = kein Rahmen)                                                                         |
| `border_color`    | Zeichenkette    |         | "#282828"      | Rahmenfarbe, zB #ff0000                                                                                         |
| `caption_size`    | Nummer          |         | 11             | Schriftgröße der Beschriftung                                                                                   |
| `caption_color`   | Zeichenkette    |         | "#ffffff"      | Farbe der Beschriftung                                                                                          |
| `caption`         | Zeichenkette    |         |                | Beschriftung unter dem Inhalt                                                                                   |
| `slot`            | Zeichenkette    |         |                | Gleicher Slot ersetzt das vorherige Popup (zB Kamerabild aktualisieren)                                         |
| `click_close`     | boolescher Wert |         |                | Klicken schließt das Popup                                                                                      |
| `opacity`         | Nummer          |         |                | Deckkraft 0,1 - 1                                                                                               |
| `activate`        | boolescher Wert |         | FALSCH         | Fokus übernehmen (Standard: nein, stört nicht beim Arbeiten)                                                    |
| `bg`              | Zeichenkette    |         |                | Hintergrundfarbe, zB #000000                                                                                    |

### `show_web` _(braucht GUI-Sitzung)_

Zeigt eine Webseite (zB vis, Lovelace, Kamera-Stream) mit Edge/Chromium in einem Fenster oder als Kiosk-Vollbild, auch mehrere im Wechsel (Diashow)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"url": "<text>"}` Die

Beispiele:

```
http://192.168.1.5:8082/vis/
{"url":"http://192.168.1.5:8082/vis/","mode":"fullscreen"}
{"urls":["http://192.168.1.5:8082/vis/","http://kamera/snapshot.jpg"],"interval":20,"mode":"fullscreen"}
{"url":"http://kamera/stream","mode":"corner","size":35,"seconds":30,"slot":"kamera"}
```

| Parameter       | Typ             | Pflicht | Standard       | Beschreibung                                                                                                    |
| --------------- | --------------- | ------- | -------------- | --------------------------------------------------------------------------------------------------------------- |
| `url`           | Zeichenkette    |         |                | Adresse (oder 'urls' für eine Diashow)                                                                          |
| `urls`          | Array           |         |                | Diashow: mehrere Adressen, wechseln nach 'interval' Sekunden                                                    |
| `interval`      | Nummer          |         | 30             | Diashow: Sekunden je Seite                                                                                      |
| `zoom`          | Nummer          |         | 1              | Zoom, z. B. 1,25 = 125 % (nur Edge)                                                                             |
| `engine`        | Zeichenkette    |         | "Auto"         | Browser: auto = Edge (WebView2), sonst IE11; edge = nur Edge; ie = altes IE11 (auto / edge / ie)                |
| `mode`          | Zeichenkette    |         | "Popup"        | Popup = Fenster in der Mitte, Vollbild = Vollbild, Ecke = Ecke (zB Türklingel-Kamera) (Popup / Vollbild / Ecke) |
| `seconds`       | Nummer          |         |                | Automatisch schließen nach X Sekunden (0 = bleibt bis Klick/close\_popups)                                      |
| `monitor`       | ganze Zahl      |         | -1             | Monitor-Index (0 = erster, -1 = Hauptmonitor)                                                                   |
| `position`      | Zeichenkette    |         | "unten rechts" | Lage bei mode=corner (top-left / top / top-right / left / center / right / bottom-left / bottom / bottom-right) |
| `size`          | Nummer          |         |                | Breite in % des Bildschirms (5 - 100, Seitenverhältnis bleibt; leer = automatisch: Ecke 28 %, Popup max. 70 %)  |
| `margin`        | ganze Zahl      |         | 16             | Abstand zum Bildschirmrand in Pixel (Modus=Ecke)                                                                |
| `border`        | ganze Zahl      |         | 2              | Rahmenbreite in Pixel (0 = kein Rahmen)                                                                         |
| `border_color`  | Zeichenkette    |         | "#282828"      | Rahmenfarbe, zB #ff0000                                                                                         |
| `caption_size`  | Nummer          |         | 11             | Schriftgröße der Beschriftung                                                                                   |
| `caption_color` | Zeichenkette    |         | "#ffffff"      | Farbe der Beschriftung                                                                                          |
| `caption`       | Zeichenkette    |         |                | Beschriftung unter dem Inhalt                                                                                   |
| `slot`          | Zeichenkette    |         |                | Gleicher Slot ersetzt das vorherige Popup (zB Kamerabild aktualisieren)                                         |
| `click_close`   | boolescher Wert |         |                | Klicken schließt das Popup                                                                                      |
| `opacity`       | Nummer          |         |                | Deckkraft 0,1 - 1                                                                                               |
| `activate`      | boolescher Wert |         | FALSCH         | Fokus übernehmen (Standard: nein, stört nicht beim Arbeiten)                                                    |
| `bg`            | Zeichenkette    |         |                | Hintergrundfarbe, zB #000000                                                                                    |

### `show_text` _(braucht GUI-Sitzung)_

Blendet Text als Overlay ein (klickdurchlässig)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"text": "<text>"}` Die

Beispiele:

```
Waschmaschine fertig
{"text":"Alarm!","size":60,"color":"#ffffff","bg":"#c00000","position":"center","seconds":10}
```

| Parameter       | Typ             | Pflicht | Standard   | Beschreibung                                          |
| --------------- | --------------- | ------- | ---------- | ----------------------------------------------------- |
| `text`          | Zeichenkette    | ja      |            | Text                                                  |
| `seconds`       | Nummer          |         | 5          | Anzeigedauer                                          |
| `size`          | Nummer          |         | 40         | Schriftgröße                                          |
| `color`         | Zeichenkette    |         | "#ffffff"  | Textfarbe                                             |
| `bg`            | Zeichenkette    |         | "#202020"  | Hintergrund                                           |
| `opacity`       | Nummer          |         | 0.9        | Deckkraft                                             |
| `position`      | Zeichenkette    |         | "unten"    | Lage (oben / Mitte / unten)                           |
| `monitor`       | ganze Zahl      |         | -1         | Monitor-Index                                         |
| `bold`          | boolescher Wert |         | WAHR       | Fett                                                  |
| `font`          | Zeichenkette    |         | "Segoe UI" | Fußgänger                                             |
| `click_through` | boolescher Wert |         | WAHR       | Mausklicks gehen durch                                |
| `slot`          | Zeichenkette    |         |            | Ersetzt Overlay mit demselben Slot                    |
| `max_width`     | Nummer          |         | 80         | Maximale Breite in % des Bildschirms (Text bricht um) |
| `padding`       | ganze Zahl      |         | 24         | Innenabstand in Pixel                                 |
| `margin`        | ganze Zahl      |         |            | Abstand zum Rand in Pixel (oben: 40, unten: 60)       |

### `ask` _(braucht GUI-Sitzung)_

Zeigt einen Dialog mit Buttons/Eingabefeld und liefert die Antwort im Ergebnis zurück\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"text": "<text>"}` Die

Beispiele:

```
Licht ausschalten?
{"text":"Kinomodus starten?","buttons":["Ja","Nein"],"timeout":30}
{"text":"Wie warm soll es werden?","input":true,"default":"21","buttons":["OK","Abbrechen"]}
```

| Parameter   | Typ             | Pflicht | Standard | Beschreibung                                   |
| ----------- | --------------- | ------- | -------- | ---------------------------------------------- |
| `text`      | Zeichenkette    | ja      |          | Fragetext                                      |
| `title`     | Zeichenkette    |         |          | Titel                                          |
| `buttons`   | Array           |         | \["OK"]  | Beschriftungen, zB \[„Ja“, „Nein“]             |
| `input`     | boolescher Wert |         | FALSCH   | Texteingabefeld anzeigen                       |
| `default`   | Zeichenkette    |         |          | Vorgabe im Eingabefeld                         |
| `password`  | boolescher Wert |         | FALSCH   | Eingabe verdecken                              |
| `timeout`   | ganze Zahl      |         | 0        | Sekunden bis automatisch geschlossen (0 = nie) |
| `width`     | ganze Zahl      |         | 460      | Breite des Dialogs in Pixel                    |
| `font_size` | Nummer          |         | 10       | Schriftgröße                                   |
| `monitor`   | ganze Zahl      |         | -1       | Monitor-Index (-1 = Hauptmonitor)              |

### `notify` _(braucht GUI-Sitzung)_

Zeigt eine Windows-Benachrichtigung an\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"text": "<text>"}` Die

Beispiele:

```
Paket ist angekommen
{"text":"Fenster offen","title":"Heizung","icon":"warning","seconds":10}
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung                              |
| --------- | ------------ | ------- | -------- | ----------------------------------------- |
| `text`    | Zeichenkette | ja      |          | Text                                      |
| `title`   | Zeichenkette |         | "WinCtl" | Titel                                     |
| `icon`    | Zeichenkette |         | "Info"   | Symbol (Info / Warnung / Fehler / keines) |
| `seconds` | ganze Zahl   |         | 5        | Dauer                                     |

### `close_popups` _(braucht GUI-Sitzung)_

Schließt alle Popups/Overlays/Dialoge von WinCtl

### `screenshot` _(braucht GUI-Sitzung)_

Macht einen Screenshot und veröffentlicht das Bild (JPEG/PNG-Rohdaten) auf<base> /<id> /Screenshot

Beispiele:

```
{"monitor":0,"scale":1,"format":"png"}
```

| Parameter | Typ             | Pflicht | Standard | Beschreibung                            |
| --------- | --------------- | ------- | -------- | --------------------------------------- |
| `monitor` | ganze Zahl      |         | -1       | -1 = alle Monitore, 0 = erster ...      |
| `scale`   | Nummer          |         | 0.5      | Verkleinerung 0,05 - 1                  |
| `quality` | ganze Zahl      |         | 70       | JPEG-Qualität                           |
| `format`  | Zeichenkette    |         | "jpeg"   | Bildformat (jpeg / png)                 |
| `inline`  | boolescher Wert |         | FALSCH   | Base64 zusätzlich im Ergebnis mitsenden |

### `set_wallpaper`

Setzt das Desktop-Hintergrundbild (Pfad oder URL)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"source": "<text>"}` Die

Beispiele:

```
https://picsum.photos/1920/1080
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung  |
| --------- | ------------ | ------- | -------- | ------------- |
| `source`  | Zeichenkette | ja      |          | Pfad oder URL |

### `brightness`

Setzt die Helligkeit (nur interne Laptop-Displays, 0-100)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"level": "<text>"}` Die

Beispiele:

```
60
```

| Parameter | Typ        | Pflicht | Standard | Beschreibung |
| --------- | ---------- | ------- | -------- | ------------ |
| `level`   | ganze Zahl | ja      |          | 0 - 100      |

## Eingabe

### `start_menu`

Öffnet bzw. schließt das Startmenü (Windows-Taste)

### `send_keys` _(braucht GUI-Sitzung)_

Sendet Tastendrücke (SendKeys-Syntax: ^=Strg, %=Alt, +=Umschalt, {ENTER}, {F5} ...)\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"keys": "<text>"}` Die

Beispiele:

```
^c
%{F4}
{ENTER}
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung                  |
| --------- | ------------ | ------- | -------- | ----------------------------- |
| `keys`    | Zeichenkette | ja      |          | zB ^c oder %{F4} oder {ENTER} |

### `type_text` _(braucht GUI-Sitzung)_

Tippt Text in das aktive Fenster\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"text": "<text>"}` Die

Beispiele:

```
Hallo Welt
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung |
| --------- | ------------ | ------- | -------- | ------------ |
| `text`    | Zeichenkette | ja      |          | Text         |

### `mouse`

Bewegt/klickt die Maus

Beispiele:

```
{"x":100,"y":200,"click":"single"}
{"wheel":-3}
```

| Parameter  | Typ             | Pflicht | Standard | Beschreibung                           |
| ---------- | --------------- | ------- | -------- | -------------------------------------- |
| `x`        | ganze Zahl      |         |          | X-Koordinate                           |
| `y`        | ganze Zahl      |         |          | Y-Koordinate                           |
| `relative` | boolescher Wert |         | FALSCH   | Relativ zur aktuellen Position         |
| `click`    | Zeichenkette    |         | "keiner" | Klickart (kein / einfach / doppelt)    |
| `button`   | Zeichenkette    |         | "links"  | Geschmack (links / rechts / Mitte)     |
| `wheel`    | ganze Zahl      |         |          | Scrollrad-Schritte (+ hoch / - runter) |

### `clipboard_set` _(braucht GUI-Sitzung)_

Setzt den Text der Zwischenablage\
&#x20;Kurzform: Nutzlast `<text>` entspricht `{"text": "<text>"}` Die

Beispiele:

```
Text für die Zwischenablage
```

| Parameter | Typ          | Pflicht | Standard | Beschreibung |
| --------- | ------------ | ------- | -------- | ------------ |
| `text`    | Zeichenkette | ja      |          | Text         |

### `clipboard_get` _(braucht GUI-Sitzung)_

Liest den Text der Zwischenablage

## Staaten

| Thema (`{base}/{id}/state/…`) | Typ             | Einheit | Rolle           | Beschreibung                                                             |
| ------------------------------ | --------------- | ------- | --------------- | ------------------------------------------------------------------------ |
| `locked`                       | boolescher Wert |         | `indicator`     | Bildschirm gesperrt                                                      |
| `user_present`                 | boolescher Wert |         | `indicator`     | Benutzer aktiv (nicht gesperrt und Eingabe innerhalb der Idle-Schwelle)  |
| `idle`                         | Nummer          | S       | `value`         | Sekunden seit der letzten Maus-/Tastatureingabe                          |
| `active_window`                | Zeichenkette    |         | `text`          | Titel des aktiven Fensters                                               |
| `active_process`               | Zeichenkette    |         | `text`          | Prozess des aktiven Fensters                                             |
| `volume`                       | Nummer          | %       | `level.volume`  | Master-Lautstärke                                                        |
| `muted`                        | boolescher Wert |         | `media.mute`    | Stummgeschaltet                                                          |
| `cpu`                          | Nummer          | %       | `value`         | CPU-Auslastung                                                           |
| `ram`                          | Nummer          | %       | `value`         | RAM-Auslastung                                                           |
| `ram_free_gb`                  | Nummer          | GB      | `value`         | Freier Arbeitsspeicher                                                   |
| `uptime_min`                   | Nummer          | min     | `value`         | Laufzeit seit Windows-Start                                              |
| `battery`                      | Nummer          | %       | `value.battery` | Akkustand (nur Geräte mit Akku)                                          |
| `charging`                     | boolescher Wert |         | `indicator`     | Netzteil angeschlossen (nur Geräte mit Akku)                             |
| `monitors`                     | Nummer          |         | `value`         | Anzahl Monitore                                                          |
| `ip`                           | Zeichenkette    |         | `text`          | Lokale IPv4-Adresse                                                      |
| `user`                         | Zeichenkette    |         | `text`          | Angemeldeter Benutzer                                                    |
| `keep_awake`                   | boolescher Wert |         | `indicator`     | wach halten aktiv                                                        |
| `webcam_in_use`                | boolescher Wert |         | `indicator`     | Kamera wird gerade benutzt (zB Videokonferenz)                           |
| `webcam_app`                   | Zeichenkette    |         | `text`          | Programm(e), die die Kamera benutzen                                     |
| `mic_in_use`                   | boolescher Wert |         | `indicator`     | Das Mikrofon wird gerade benutzt                                         |
| `mic_app`                      | Zeichenkette    |         | `text`          | Programm(e), die das Mikrofon benutzen                                   |
| `web_url`                      | Zeichenkette    |         | `text.url`      | Seite, die show\_web gerade angezeigt (leer = keine)                     |
| `update_available`             | boolescher Wert |         | `indicator`     | Neuere WinCtl-Version verfügbar (Prüfung beim Start und alle 12 Stunden) |
| `latest_version`               | Zeichenkette    |         | `text`          | Neueste WinCtl-Version auf GitHub                                        |
| `disk/<laufwerk>_free_gb`      | Nummer          | GB      | `value`         | Freier Platz je Festplatte (dynamisch)                                   |
| `disk/<laufwerk>_used_percent` | Nummer          | %       | `value`         | Belegung je Festplatte (dynamisch)                                       |
| `proc/<name>`                  | boolescher Wert |         | `indicator`     | Prozess läuft (aus Config 'WatchProcesses', dynamisch)                   |