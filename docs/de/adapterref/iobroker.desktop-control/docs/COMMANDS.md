---
chapters: {"pages":{"en/adapterref/iobroker.desktop-control/README.md":{"title":{"en":"ioBroker.desktop-control"},"content":"en/adapterref/iobroker.desktop-control/README.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md":{"title":{"en":"Command reference"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md":{"title":{"en":"Befehlsreferenz"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.desktop-control/docs/COMMANDS.md
title: Befehlsreferenz
hash: 7TuTjtwDnTpm20yucgkyB24l0ozftDfH0MUrAwW5XYA=
---
# Befehlsreferenz

_Deutsche Fassung: [COMMANDS.de.md](/#/docs/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md)_

_Automatisch generiert aus `WinCtl.exe --dump-protocol` (Protokoll 1, Version 0.6.4). Nicht manuell bearbeiten._

Befehle werden gesendet an `{base}/{id}/cmd/<command>` (Nutzlast: JSON-Objekt oder – bei Befehlen mit _Kurzform_ – eine einfache Zeichenkette).

## System

### `ping`

Lebenszeichen, Antworten mit der Zeit und Agentenversion

### `get_state`

Veröffentlicht alle Zustandswerte erneut

### `reload_config`

Lädt die Agentenkonfiguration neu und stellt die Verbindung wieder her.

### `exit` _(⚠ sicherheitsrelevant)_

Stoppt den Agenten

### `list_commands`

Gibt die Liste aller Befehle zurück.

### `check_update`

Prüft auf eine neuere Agentenversion (GitHub-Releases)

### `update`

Installiert die neueste Agentenversion und startet den Agenten neu.

## Power & Session

### `lock`

Sperrt den Bildschirm (Win+L)

### `sleep`

Stehen zu

### `hibernate`

Überwintern

### `shutdown`

Schaltet den PC aus\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"delay": "<text>"}` Die

Beispiele:

```
60
{"delay":0,"force":true}
```

| Parameter | Typ             | Erforderlich | Standard | Beschreibung                     |
| --------- | --------------- | ------------ | -------- | -------------------------------- |
| `delay`   | ganze Zahl      |              | 10       | Verzögerung in Sekunden          |
| `force`   | boolescher Wert |              | FALSCH   | Programme zur Schließung zwingen |

### `restart`

Startet den PC neu.\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"delay": "<text>"}` Die

Beispiele:

```
30
{"delay":0,"force":true}
```

| Parameter | Typ             | Erforderlich | Standard | Beschreibung                     |
| --------- | --------------- | ------------ | -------- | -------------------------------- |
| `delay`   | ganze Zahl      |              | 10       | Verzögerung in Sekunden          |
| `force`   | boolescher Wert |              | FALSCH   | Programme zur Schließung zwingen |

### `logoff`

Meldet den Benutzer ab

### `cancel_shutdown`

Bricht eine geplante Abschaltung/einen Neustart ab

### `monitor_off`

Schaltet die Monitore aus

### `monitor_on`

Weckt die Monitore auf

### `screensaver`

Startet den Bildschirmschoner (den in Windows festgelegten oder eine .scr-Datei)\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"file": "<text>"}` Die

Beispiele:

```
{"file":"C:/Windows/System32/Mystify.scr"}
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung                                                      |
| --------- | ------------ | ------------ | -------- | ----------------------------------------------------------------- |
| `file`    | Zeichenkette |              | ""       | Pfad zu einer .scr-Datei (leer = der in Windows festgelegte Pfad) |

### `keep_awake` _(erfordert eine GUI-Sitzung)_

Verhindert Standby und Bildschirmschoner\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"state": "<text>"}` Die

Beispiele:

```
{"state":true,"display":false}
```

| Parameter | Typ             | Erforderlich | Standard | Beschreibung                                       |
| --------- | --------------- | ------------ | -------- | -------------------------------------------------- |
| `state`   | boolescher Wert |              | WAHR     | Ein/Aus                                            |
| `display` | boolescher Wert |              | WAHR     | Lassen Sie den Bildschirm ebenfalls eingeschaltet. |

## Programme & Fenster

### `run` _(⚠ sicherheitsrelevant)_

Startet ein Programm (Alias aus den Agenteneinstellungen)\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"path": "<text>"}` Die

Beispiele:

```
notepad
{"path":"kodi","args":"--fullscreen","window":"maximized"}
```

| Parameter | Typ             | Erforderlich | Standard | Beschreibung                                                |
| --------- | --------------- | ------------ | -------- | ----------------------------------------------------------- |
| `path`    | Zeichenkette    | Ja           |          | Alias (z. B. „notepad“) oder Pfad zur .exe-Datei            |
| `args`    | Zeichenkette    |              |          | Argumente als Zeichenkette oder Liste                       |
| `workdir` | Zeichenkette    |              |          | Arbeitsverzeichnis                                          |
| `hidden`  | boolescher Wert |              |          | Starten ohne Fenster                                        |
| `window`  | Zeichenkette    |              |          | Fensterstatus (normal / minimiert / maximiert)              |
| `admin`   | boolescher Wert |              |          | Als Administrator (UAC-Aufforderung auf dem PC!)            |
| `wait`    | boolescher Wert |              |          | Warten Sie auf das Ende und geben Sie den Exit-Code zurück. |
| `timeout` | ganze Zahl      |              | 60       | Wartezeit in Sekunden mit Wartezeit                         |

### `open`

Öffnet eine URL, Datei oder einen Ordner mit der Standard-App.\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"target": "<text>"}` Die

Beispiele:

```
https://www.iobroker.net
ms-settings:display
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung                               |
| --------- | ------------ | ------------ | -------- | ------------------------------------------ |
| `target`  | Zeichenkette | Ja           |          | URL (immer zulässig), ansonsten Alias/Pfad |

### `kill` _(⚠ sicherheitsrelevant)_

Beendet Prozesse anhand ihres Namens oder ihrer Prozess-ID\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"name": "<text>"}` Die

Beispiele:

```
notepad
{"pid":1234}
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung                |
| --------- | ------------ | ------------ | -------- | --------------------------- |
| `name`    | Zeichenkette |              |          | Prozessname, z. B. 'chrome' |
| `pid`     | ganze Zahl   |              |          | Prozess-ID                  |

### `list_processes`

Listet laufende Prozesse auf\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"filter": "<text>"}` Die

Beispiele:

```
chrome
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung |
| --------- | ------------ | ------------ | -------- | ------------ |
| `filter`  | Zeichenkette |              |          | Namensfilter |

### `list_windows`

Listen Sie sichtbare Fenster auf

### `focus_window`

Bringt ein Fenster nach vorne (Titel enthält …)\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"title": "<text>"}` Die

Beispiele:

```
Kodi
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung           |
| --------- | ------------ | ------------ | -------- | ---------------------- |
| `title`   | Zeichenkette | Ja           |          | Teil des Fenstertitels |

### `close_window`

Schließt ein Fenster (Titel enthält …)\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"title": "<text>"}` Die

Beispiele:

```
Notepad
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung           |
| --------- | ------------ | ------------ | -------- | ---------------------- |
| `title`   | Zeichenkette | Ja           |          | Teil des Fenstertitels |

### `minimize_all`

Minimiert alle Fenster (Desktop anzeigen) oder stellt sie wieder her.

Beispiele:

```
{"undo":true}
```

| Parameter | Typ             | Erforderlich | Standard | Beschreibung                      |
| --------- | --------------- | ------------ | -------- | --------------------------------- |
| `undo`    | boolescher Wert |              | FALSCH   | Wiederherstellen statt minimieren |

### `empty_recycle_bin`

Leert den Recyclingbehälter

### `shell` _(⚠ sicherheitsrelevant)_

Führt einen PowerShell-/cmd-Befehl aus und gibt die Ausgabe zurück\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"command": "<text>"}` Die

Beispiele:

```
Get-Date
{"command":"ipconfig","shell":"cmd"}
```

| Parameter | Typ          | Erforderlich | Standard     | Beschreibung                   |
| --------- | ------------ | ------------ | ------------ | ------------------------------ |
| `command` | Zeichenkette | Ja           |              | Befehl / Skript                |
| `shell`   | Zeichenkette |              | "PowerShell" | Interpreter (PowerShell / cmd) |
| `timeout` | ganze Zahl   |              | 30           | Sekunden                       |

## Audio

### `volume`

Stellt die Gesamtlautstärke ein (0-100)\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"level": "<text>"}` Die

Beispiele:

```
30
```

| Parameter | Typ        | Erforderlich | Standard | Beschreibung |
| --------- | ---------- | ------------ | -------- | ------------ |
| `level`   | ganze Zahl | Ja           |          | 0 - 100      |

### `volume_change`

Ändert die Lautstärke relativ\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"delta": "<text>"}` Die

Beispiele:

```
-10
```

| Parameter | Typ        | Erforderlich | Standard | Beschreibung     |
| --------- | ---------- | ------------ | -------- | ---------------- |
| `delta`   | ganze Zahl |              | 5        | z. B. 5 oder -10 |

### `mute`

Stummschalten / Stummschaltung aufheben / umschalten\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"state": "<text>"}` Die

Beispiele:

```
toggle
```

| Parameter | Typ          | Erforderlich | Standard     | Beschreibung               |
| --------- | ------------ | ------------ | ------------ | -------------------------- |
| `state`   | Zeichenkette |              | "Umschalten" | wahr / falsch / umschalten |

### `media`

Sendet einen Medienschlüssel\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"key": "<text>"}` Die

Beispiele:

```
playpause
next
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung                                                                                                                              |
| --------- | ------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `key`     | Zeichenkette | Ja           |          | Medientasten (Wiedergabe/Pause / Nächster Titel / Vorheriger Titel / Stopp / Lautstärke erhöhen / Lautstärke verringern / Stummschaltung) |

### `speak`

Text-zu-Sprache-Umwandlung\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"text": "<text>"}` Die

Beispiele:

```
Dinner is ready
{"text":"Attention","voice":"Zira","rate":2,"volume":80}
```

| Parameter   | Typ             | Erforderlich | Standard | Beschreibung                              |
| ----------- | --------------- | ------------ | -------- | ----------------------------------------- |
| `text`      | Zeichenkette    | Ja           |          | Text-to-Speech                            |
| `voice`     | Zeichenkette    |              |          | Teil des Stimmennamens, z. B. „Hedda“     |
| `rate`      | ganze Zahl      |              | 0        | -10 (langsam) bis 10 (schnell)            |
| `volume`    | ganze Zahl      |              | 100      | 0-100                                     |
| `wait`      | boolescher Wert |              |          | Warten Sie, bis das Sprechen beendet ist. |
| `interrupt` | boolescher Wert |              | WAHR     | Aktuelle Ausgabe abbrechen                |

### `list_voices`

Listet die installierten Stimmen auf

### `play_sound`

Spielt eine Audiodatei ab (mp3/wav/wma, Pfad oder URL)\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"source": "<text>"}` Die

Beispiele:

```
http://192.168.1.5/gong.mp3
{"source":"C:\\Sounds\\doorbell.wav","wait":true}
```

| Parameter | Typ             | Erforderlich | Standard | Beschreibung            |
| --------- | --------------- | ------------ | -------- | ----------------------- |
| `source`  | Zeichenkette    | Ja           |          | Pfad oder URL           |
| `wait`    | boolescher Wert |              | FALSCH   | Warten Sie bis zum Ende |

### `stop_sound`

Stoppt die Wiedergabe von Tönen / das Sprechen

### `beep`

Einfacher Piepton

Beispiele:

```
{"freq":1200,"ms":500}
```

| Parameter | Typ        | Erforderlich | Standard | Beschreibung |
| --------- | ---------- | ------------ | -------- | ------------ |
| `freq`    | ganze Zahl |              | 800      | Hz           |
| `ms`      | ganze Zahl |              | 300      | Dauer in ms  |

## Anzeige

### `show_image` _(erfordert eine GUI-Sitzung)_

Zeigt ein Bild als Popup, im Vollbildmodus oder in einer Ecke an.\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"source": "<text>"}` Die

Beispiele:

```
http://camera/snapshot.jpg
{"source":"http://camera/snapshot.jpg","mode":"corner","position":"top-right","size":30,"seconds":10,"caption":"Front door","slot":"doorbell"}
{"source":"https://picsum.photos/1920/1080","mode":"fullscreen","seconds":15}
```

| Parameter       | Typ             | Erforderlich | Standard       | Beschreibung                                                                                                            |
| --------------- | --------------- | ------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `source`        | Zeichenkette    | Ja           |                | Pfad, HTTP(S)-URL oder Daten: URI                                                                                       |
| `base64`        | Zeichenkette    |              |                | Alternativ: Base64-Daten                                                                                                |
| `fit`           | Zeichenkette    |              | "enthalten"    | Skalierung (enthalten / dehnen / zentrieren)                                                                            |
| `mode`          | Zeichenkette    |              | "Popup"        | Popup = Fenster in der Mitte, Vollbild = Vollbild, Ecke = Ecke (z. B. Türklingelkamera) (Popup / Vollbild / Ecke)       |
| `seconds`       | Nummer          |              |                | Schließt sich nach X Sekunden automatisch (0 = bleibt bis zum Klick/close\_popups bestehen)                             |
| `monitor`       | ganze Zahl      |              | -1             | Monitorindex (0 = erster, -1 = primärer Monitor)                                                                        |
| `position`      | Zeichenkette    |              | "unten rechts" | Position mit Modus=Ecke (oben links / oben / oben rechts / links / Mitte / rechts / unten links / unten / unten rechts) |
| `size`          | Nummer          |              |                | Breite in % des Bildschirms (5 - 100, Seitenverhältnis bleibt erhalten; leer = automatisch: Ecke 28 %, Popup max. 70 %) |
| `margin`        | ganze Zahl      |              | 16             | Abstand zum Bildschirmrand in Pixeln (Modus=Ecke)                                                                       |
| `border`        | ganze Zahl      |              | 2              | Rahmenbreite in Pixeln (0 = kein Rahmen)                                                                                |
| `border_color`  | Zeichenkette    |              | "#282828"      | Rahmenfarbe, z. B. #ff0000                                                                                              |
| `caption_size`  | Nummer          |              | 11             | Schriftgröße der Bildunterschrift                                                                                       |
| `caption_color` | Zeichenkette    |              | "#ffffff"      | Farbe der Bildunterschrift                                                                                              |
| `caption`       | Zeichenkette    |              |                | Bildunterschrift unterhalb des Inhalts                                                                                  |
| `slot`          | Zeichenkette    |              |                | Im selben Slot wird das vorherige Popup ersetzt (z. B. zum Aktualisieren eines Kamerabildes).                           |
| `click_close`   | boolescher Wert |              |                | Ein Klick schließt das Popup.                                                                                           |
| `opacity`       | Nummer          |              |                | Deckkraft 0,1 - 1                                                                                                       |
| `activate`      | boolescher Wert |              | FALSCH         | Fokus übernehmen (Standard: nein, stört die Arbeit nicht)                                                               |
| `bg`            | Zeichenkette    |              |                | Hintergrundfarbe, z. B. #000000                                                                                         |

### `show_video` _(erfordert eine GUI-Sitzung)_

Spielt ein Video mit Edge/Chromium (mp4, WebM, …) ab.\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"source": "<text>"}` Die

Beispiele:

```
http://server/video.mp4
{"source":"http://server/video.mp4","mode":"corner","position":"bottom-left","size":25,"muted":true,"loop":true}
{"source":"C:\\Videos\\intro.mp4","mode":"fullscreen","close_when_done":true}
```

| Parameter         | Typ             | Erforderlich | Standard       | Beschreibung                                                                                                            |
| ----------------- | --------------- | ------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `source`          | Zeichenkette    | Ja           |                | Pfad oder URL                                                                                                           |
| `loop`            | boolescher Wert |              | FALSCH         | Endlosschleife                                                                                                          |
| `muted`           | boolescher Wert |              | FALSCH         | Ohne Ton                                                                                                                |
| `volume`          | Nummer          |              | 1              | 0 - 1                                                                                                                   |
| `controls`        | boolescher Wert |              | FALSCH         | Steuerelemente anzeigen                                                                                                 |
| `close_when_done` | boolescher Wert |              | WAHR           | Nach Gebrauch schließen.                                                                                                |
| `engine`          | Zeichenkette    |              | "Auto"         | Player: auto = Edge (WebView2), ansonsten IE11; edge = nur Edge; ie = altes IE11 (auto / edge / ie)                     |
| `mode`            | Zeichenkette    |              | "Popup"        | Popup = Fenster in der Mitte, Vollbild = Vollbild, Ecke = Ecke (z. B. Türklingelkamera) (Popup / Vollbild / Ecke)       |
| `seconds`         | Nummer          |              |                | Schließt sich nach X Sekunden automatisch (0 = bleibt bis zum Klick/close\_popups bestehen)                             |
| `monitor`         | ganze Zahl      |              | -1             | Monitorindex (0 = erster, -1 = primärer Monitor)                                                                        |
| `position`        | Zeichenkette    |              | "unten rechts" | Position mit Modus=Ecke (oben links / oben / oben rechts / links / Mitte / rechts / unten links / unten / unten rechts) |
| `size`            | Nummer          |              |                | Breite in % des Bildschirms (5 - 100, Seitenverhältnis bleibt erhalten; leer = automatisch: Ecke 28 %, Popup max. 70 %) |
| `margin`          | ganze Zahl      |              | 16             | Abstand zum Bildschirmrand in Pixeln (Modus=Ecke)                                                                       |
| `border`          | ganze Zahl      |              | 2              | Rahmenbreite in Pixeln (0 = kein Rahmen)                                                                                |
| `border_color`    | Zeichenkette    |              | "#282828"      | Rahmenfarbe, z. B. #ff0000                                                                                              |
| `caption_size`    | Nummer          |              | 11             | Schriftgröße der Bildunterschrift                                                                                       |
| `caption_color`   | Zeichenkette    |              | "#ffffff"      | Farbe der Bildunterschrift                                                                                              |
| `caption`         | Zeichenkette    |              |                | Bildunterschrift unterhalb des Inhalts                                                                                  |
| `slot`            | Zeichenkette    |              |                | Im selben Slot wird das vorherige Popup ersetzt (z. B. zum Aktualisieren eines Kamerabildes).                           |
| `click_close`     | boolescher Wert |              |                | Ein Klick schließt das Popup.                                                                                           |
| `opacity`         | Nummer          |              |                | Deckkraft 0,1 - 1                                                                                                       |
| `activate`        | boolescher Wert |              | FALSCH         | Fokus übernehmen (Standard: nein, stört die Arbeit nicht)                                                               |
| `bg`              | Zeichenkette    |              |                | Hintergrundfarbe, z. B. #000000                                                                                         |

### `show_web` _(erfordert eine GUI-Sitzung)_

Zeigt eine Webseite (vis, Lovelace, Kamerastream) mit Edge/Chromium in einem Fenster oder im Vollbildmodus an, auch mehrere Seiten nacheinander (Diashow).\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"url": "<text>"}` Die

Beispiele:

```
http://192.168.1.5:8082/vis/
{"url":"http://192.168.1.5:8082/vis/","mode":"fullscreen"}
{"urls":["http://192.168.1.5:8082/vis/","http://camera/snapshot.jpg"],"interval":20,"mode":"fullscreen"}
{"url":"http://camera/stream","mode":"corner","size":35,"seconds":30,"slot":"camera"}
```

| Parameter       | Typ             | Erforderlich | Standard       | Beschreibung                                                                                                            |
| --------------- | --------------- | ------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `url`           | Zeichenkette    |              |                | Adresse (oder „URLs“ für eine Diashow)                                                                                  |
| `urls`          | Array           |              |                | Diashow: Mehrere Adressen, Umschaltung nach jeweils einer „Intervall“-Sekunden                                          |
| `interval`      | Nummer          |              | 30             | Diashow: Sekunden pro Seite                                                                                             |
| `zoom`          | Nummer          |              | 1              | Zoom, z. B. 1,25 = 125 % (nur Rand)                                                                                     |
| `engine`        | Zeichenkette    |              | "Auto"         | Browser: auto = Edge (WebView2), ansonsten IE11; edge = nur Edge; ie = altes IE11 (auto / edge / ie)                    |
| `mode`          | Zeichenkette    |              | "Popup"        | Popup = Fenster in der Mitte, Vollbild = Vollbild, Ecke = Ecke (z. B. Türklingelkamera) (Popup / Vollbild / Ecke)       |
| `seconds`       | Nummer          |              |                | Schließt sich nach X Sekunden automatisch (0 = bleibt bis zum Klick/close\_popups bestehen)                             |
| `monitor`       | ganze Zahl      |              | -1             | Monitorindex (0 = erster, -1 = primärer Monitor)                                                                        |
| `position`      | Zeichenkette    |              | "unten rechts" | Position mit Modus=Ecke (oben links / oben / oben rechts / links / Mitte / rechts / unten links / unten / unten rechts) |
| `size`          | Nummer          |              |                | Breite in % des Bildschirms (5 - 100, Seitenverhältnis bleibt erhalten; leer = automatisch: Ecke 28 %, Popup max. 70 %) |
| `margin`        | ganze Zahl      |              | 16             | Abstand zum Bildschirmrand in Pixeln (Modus=Ecke)                                                                       |
| `border`        | ganze Zahl      |              | 2              | Rahmenbreite in Pixeln (0 = kein Rahmen)                                                                                |
| `border_color`  | Zeichenkette    |              | "#282828"      | Rahmenfarbe, z. B. #ff0000                                                                                              |
| `caption_size`  | Nummer          |              | 11             | Schriftgröße der Bildunterschrift                                                                                       |
| `caption_color` | Zeichenkette    |              | "#ffffff"      | Farbe der Bildunterschrift                                                                                              |
| `caption`       | Zeichenkette    |              |                | Bildunterschrift unterhalb des Inhalts                                                                                  |
| `slot`          | Zeichenkette    |              |                | Im selben Slot wird das vorherige Popup ersetzt (z. B. zum Aktualisieren eines Kamerabildes).                           |
| `click_close`   | boolescher Wert |              |                | Ein Klick schließt das Popup.                                                                                           |
| `opacity`       | Nummer          |              |                | Deckkraft 0,1 - 1                                                                                                       |
| `activate`      | boolescher Wert |              | FALSCH         | Fokus übernehmen (Standard: nein, stört die Arbeit nicht)                                                               |
| `bg`            | Zeichenkette    |              |                | Hintergrundfarbe, z. B. #000000                                                                                         |

### `show_text` _(erfordert eine GUI-Sitzung)_

Zeigt Text als Überlagerung an\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"text": "<text>"}` Die

Beispiele:

```
Washing machine finished
{"text":"Alarm!","size":60,"color":"#ffffff","bg":"#c00000","position":"center","seconds":10}
```

| Parameter       | Typ             | Erforderlich | Standard   | Beschreibung                                       |
| --------------- | --------------- | ------------ | ---------- | -------------------------------------------------- |
| `text`          | Zeichenkette    | Ja           |            | Text                                               |
| `seconds`       | Nummer          |              | 5          | Anzeigedauer                                       |
| `size`          | Nummer          |              | 40         | Schriftgröße                                       |
| `color`         | Zeichenkette    |              | "#ffffff"  | Textfarbe                                          |
| `bg`            | Zeichenkette    |              | "#202020"  | Hintergrund                                        |
| `opacity`       | Nummer          |              | 0.9        | Opazität                                           |
| `position`      | Zeichenkette    |              | "unten"    | Position (oben / Mitte / unten)                    |
| `monitor`       | ganze Zahl      |              | -1         | Monitorindex                                       |
| `bold`          | boolescher Wert |              | WAHR       | Deutlich                                           |
| `font`          | Zeichenkette    |              | "Segoe UI" | Schriftart                                         |
| `click_through` | boolescher Wert |              | WAHR       | Mausklicks werden weitergeleitet                   |
| `slot`          | Zeichenkette    |              |            | Ersetzt die Abdeckung durch denselben Steckplatz   |
| `max_width`     | Nummer          |              | 80         | Maximale Breite in % des Bildschirms (Textumbruch) |
| `padding`       | ganze Zahl      |              | 24         | Abstand in Pixeln                                  |
| `margin`        | ganze Zahl      |              |            | Abstand zum Rand in Pixeln (oben: 40, unten: 60)   |

### `ask` _(erfordert eine GUI-Sitzung)_

Zeigt einen Dialog mit Schaltflächen/Eingabefeldern an und gibt die Antwort zurück.\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"text": "<text>"}` Die

Beispiele:

```
Switch the light off?
{"text":"Start cinema mode?","buttons":["Yes","No"],"timeout":30}
{"text":"How warm should it be?","input":true,"default":"21","buttons":["OK","Cancel"]}
```

| Parameter   | Typ             | Erforderlich | Standard | Beschreibung                                       |
| ----------- | --------------- | ------------ | -------- | -------------------------------------------------- |
| `text`      | Zeichenkette    | Ja           |          | Fragetext                                          |
| `title`     | Zeichenkette    |              |          | Titel                                              |
| `buttons`   | Array           |              | \["OK"]  | Schaltflächenbeschriftungen, z. B. \["Ja","Nein"]  |
| `input`     | boolescher Wert |              | FALSCH   | Zeige ein Texteingabefeld an                       |
| `default`   | Zeichenkette    |              |          | Standardwert des Eingabefelds                      |
| `password`  | boolescher Wert |              | FALSCH   | Eingabe ausblenden                                 |
| `timeout`   | ganze Zahl      |              | 0        | Sekunden bis zum automatischen Schließen (0 = nie) |
| `width`     | ganze Zahl      |              | 460      | Breite des Dialogs in Pixeln                       |
| `font_size` | Nummer          |              | 10       | Schriftgröße                                       |
| `monitor`   | ganze Zahl      |              | -1       | Monitorindex (-1 = primärer Monitor)               |

### `notify` _(erfordert eine GUI-Sitzung)_

Zeigt eine Windows-Benachrichtigung an\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"text": "<text>"}` Die

Beispiele:

```
Parcel has arrived
{"text":"Window open","title":"Heating","icon":"warning","seconds":10}
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung                             |
| --------- | ------------ | ------------ | -------- | ---------------------------------------- |
| `text`    | Zeichenkette | Ja           |          | Text                                     |
| `title`   | Zeichenkette |              | "WinCtl" | Titel                                    |
| `icon`    | Zeichenkette |              | "Info"   | Symbol (Info / Warnung / Fehler / keine) |
| `seconds` | ganze Zahl   |              | 5        | Dauer                                    |

### `close_popups` _(erfordert eine GUI-Sitzung)_

Schließt alle Popups, Overlays und Dialoge

### `screenshot` _(erfordert eine GUI-Sitzung)_

Erstellt einen Screenshot (gespeichert im ioBroker-Dateispeicher)

Beispiele:

```
{"monitor":0,"scale":1,"format":"png"}
```

| Parameter | Typ             | Erforderlich | Standard | Beschreibung                            |
| --------- | --------------- | ------------ | -------- | --------------------------------------- |
| `monitor` | ganze Zahl      |              | -1       | -1 = alle Monitore, 0 = erster ...      |
| `scale`   | Nummer          |              | 0.5      | Verkleinerung 0,05 - 1                  |
| `quality` | ganze Zahl      |              | 70       | JPEG-Qualität                           |
| `format`  | Zeichenkette    |              | "jpeg"   | Bildformat (jpeg / png)                 |
| `inline`  | boolescher Wert |              | FALSCH   | Senden Sie außerdem Base64 im Ergebnis. |

### `set_wallpaper`

Legt das Desktop-Hintergrundbild fest\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"source": "<text>"}` Die

Beispiele:

```
https://picsum.photos/1920/1080
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung  |
| --------- | ------------ | ------------ | -------- | ------------- |
| `source`  | Zeichenkette | Ja           |          | Pfad oder URL |

### `brightness`

Stellt die Helligkeit ein (nur interne Laptop-Displays)\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"level": "<text>"}` Die

Beispiele:

```
60
```

| Parameter | Typ        | Erforderlich | Standard | Beschreibung |
| --------- | ---------- | ------------ | -------- | ------------ |
| `level`   | ganze Zahl | Ja           |          | 0 - 100      |

## Eingang

### `start_menu`

Öffnet oder schließt das Startmenü (Windows-Taste).

### `send_keys` _(erfordert eine GUI-Sitzung)_

Sendet Tastendrücke (SendKeys-Syntax)\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"keys": "<text>"}` Die

Beispiele:

```
^c
%{F4}
{ENTER}
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung                         |
| --------- | ------------ | ------------ | -------- | ------------------------------------ |
| `keys`    | Zeichenkette | Ja           |          | z. B. Strg+C oder %{F4} oder {ENTER} |

### `type_text` _(erfordert eine GUI-Sitzung)_

Gibt Text in das aktive Fenster ein\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"text": "<text>"}` Die

Beispiele:

```
Hello world
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung |
| --------- | ------------ | ------------ | -------- | ------------ |
| `text`    | Zeichenkette | Ja           |          | Text         |

### `mouse`

Bewegt/klickt die Maus

Beispiele:

```
{"x":100,"y":200,"click":"single"}
{"wheel":-3}
```

| Parameter  | Typ             | Erforderlich | Standard | Beschreibung                           |
| ---------- | --------------- | ------------ | -------- | -------------------------------------- |
| `x`        | ganze Zahl      |              |          | X-Koordinate                           |
| `y`        | ganze Zahl      |              |          | Y-Koordinate                           |
| `relative` | boolescher Wert |              | FALSCH   | Im Vergleich zur aktuellen Position    |
| `click`    | Zeichenkette    |              | "keiner" | Klicktyp (kein / einfach / doppelt)    |
| `button`   | Zeichenkette    |              | "links"  | Knopf (links / rechts / Mitte)         |
| `wheel`    | ganze Zahl      |              |          | Scrollrad-Schritte (+ hoch / - runter) |

### `clipboard_set` _(erfordert eine GUI-Sitzung)_

Legt den Text in der Zwischenablage fest\
&#x20;Kurzform: Nutzlast `<text>` gleich `{"text": "<text>"}` Die

Beispiele:

```
Text for the clipboard
```

| Parameter | Typ          | Erforderlich | Standard | Beschreibung |
| --------- | ------------ | ------------ | -------- | ------------ |
| `text`    | Zeichenkette | Ja           |          | Text         |

### `clipboard_get` _(erfordert eine GUI-Sitzung)_

Liest den Text aus der Zwischenablage

## Staaten

| Thema (`{base}/{id}/state/…`) | Typ             | Einheit | Rolle           | Beschreibung                                                                      |
| ------------------------------ | --------------- | ------- | --------------- | --------------------------------------------------------------------------------- |
| `locked`                       | boolescher Wert |         | `indicator`     | Bildschirm gesperrt                                                               |
| `user_present`                 | boolescher Wert |         | `indicator`     | Benutzer aktiv (nicht gesperrt und Eingaben innerhalb des Leerlaufschwellenwerts) |
| `idle`                         | Nummer          | S       | `value`         | Sekunden seit der letzten Maus-/Tastatureingabe                                   |
| `active_window`                | Zeichenkette    |         | `text`          | Titel des aktiven Fensters                                                        |
| `active_process`               | Zeichenkette    |         | `text`          | Prozess des aktiven Fensters                                                      |
| `volume`                       | Nummer          | %       | `level.volume`  | Gesamtlautstärke                                                                  |
| `muted`                        | boolescher Wert |         | `media.mute`    | Gedämpft                                                                          |
| `cpu`                          | Nummer          | %       | `value`         | CPU-Auslastung                                                                    |
| `ram`                          | Nummer          | %       | `value`         | RAM-Nutzung                                                                       |
| `ram_free_gb`                  | Nummer          | GB      | `value`         | Freier Speicher                                                                   |
| `uptime_min`                   | Nummer          | min     | `value`         | Zeit seit dem Windows-Start                                                       |
| `battery`                      | Nummer          | %       | `value.battery` | Akkustand (nur Geräte mit Akku)                                                   |
| `charging`                     | boolescher Wert |         | `indicator`     | Netzteil angeschlossen (nur für Geräte mit Batteriebetrieb)                       |
| `monitors`                     | Nummer          |         | `value`         | Anzahl der Monitore                                                               |
| `ip`                           | Zeichenkette    |         | `text`          | Lokale IPv4-Adresse                                                               |
| `user`                         | Zeichenkette    |         | `text`          | Angemeldeter Benutzer                                                             |
| `keep_awake`                   | boolescher Wert |         | `indicator`     | wach halten aktiv                                                                 |
| `webcam_in_use`                | boolescher Wert |         | `indicator`     | Kamera in Gebrauch (z. B. Videoanruf)                                             |
| `webcam_app`                   | Zeichenkette    |         | `text`          | Programm(e), das/die die Kamera verwendet/nutzen                                  |
| `mic_in_use`                   | boolescher Wert |         | `indicator`     | Mikrofon in Gebrauch                                                              |
| `mic_app`                      | Zeichenkette    |         | `text`          | Programm(e), das/die das Mikrofon verwendet/nutzen                                |
| `web_url`                      | Zeichenkette    |         | `text.url`      | Seite, die show\_web aktuell anzeigt (leer = keine)                               |
| `update_available`             | boolescher Wert |         | `indicator`     | Neuere Agentenversion verfügbar (wird beim Start und alle 12 Stunden geprüft)     |
| `latest_version`               | Zeichenkette    |         | `text`          | Neueste Agentenversion auf GitHub                                                 |
| `disk/<drive>_free_gb`         | Nummer          | GB      | `value`         | Freier Speicherplatz pro Laufwerk, z.B. `disk.C_free_gb`                          |
| `disk/<drive>_used_percent`    | Nummer          | %       | `value`         | Nutzung pro Laufwerk, z.B. `disk.C_used_percent`                                  |
| `proc/<name>`                  | boolescher Wert |         | `indicator`     | Das überwachte Programm läuft (Agenteneinstellungen „Prozesse“)                   |