---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.yamaha
BADGE-stable: https://iobroker.live/badges/yamaha-stable.svg
BADGE-Installations: https://iobroker.live/badges/yamaha-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.yamaha
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg
---
# Yamaha AV-Receiver und MusicCast-Geräte

Dieser Adapter steuert netzwerkfähige Yamaha-Audiogeräte aus ioBroker: AV-Receiver,
Stereo-Receiver, MusicCast-Lautsprecher und Soundbars sowie CD-Receiver — ab etwa Baujahr 2008.

Er ersetzt die beiden eingestellten Adapter `yamaha` und `musiccast` und spricht alle drei
Yamaha-Netzwerkprotokolle gleichzeitig. Ein Gerät erscheint deshalb als ein Gerät, egal wie
viele davon es beantwortet.

## Welche Geräte funktionieren

| Geräteklasse                         | Beispiele                        | Wie gesteuert wird                                |
| ------------------------------------ | -------------------------------- | ------------------------------------------------- |
| AV-Receiver                          | RX-V, RX-A, RX-S, TSR, HTR, CX-A | YNCA, bei MusicCast-Modellen zusätzlich MusicCast |
| Stereo-Receiver / Netzwerkverstärker | R-N, WXA, WXC, A-S               | MusicCast, bei älteren Modellen YNCA              |
| Funklautsprecher                     | MusicCast 20/50, WX, ISX         | MusicCast                                         |
| Soundbar                             | YSP, YAS, ATS, SR-B              | MusicCast                                         |
| CD-Receiver / Netzwerkspieler        | CRX, MCR, CD-NT                  | MusicCast                                         |
| Receiver vor 2010                    | RX-V ab etwa 2008                | XML                                               |

Sie müssen nicht wissen, welches Protokoll Ihr Gerät spricht. Der Adapter probiert alle drei
und nutzt alles, was antwortet.

## Einrichtung

1. Adapter installieren und eine Instanz anlegen.
2. Die Instanz-Einstellungen öffnen. Der Reiter **Geräte** zeigt Ihre Receiver als Karten.
3. Entweder die Liste leer lassen — dann sucht der Adapter selbst im Netz und betreibt, was
   er findet — oder auf **+** drücken und die IP-Adresse eines Receivers eintragen.

Ein Receiver von vor 2010 antwortet auf keine Netzwerksuche und muss immer von Hand
eingetragen werden. Dasselbe gilt für jedes Gerät, das Ihr Router in einem anderen
Netzabschnitt hält.

**Geben Sie dem Receiver eine feste Adresse.** Der Adapter erkennt ein Gerät an seiner
Identität, nicht an der Adresse, und folgt ihm bei einem Adresswechsel — ein Gerät, das
umzieht, während der Adapter nicht läuft, findet aber erst die nächste Netzwerksuche wieder.

### Einstellungen

- **Netzwerk-Schnittstelle** — leer lassen, dann verlässt die Suche jede Netzwerkkarte Ihres
  ioBroker-Rechners. Nur setzen, wenn Ihr Server in mehreren Netzen hängt und die Suche eine
  bestimmte nehmen soll. Auf die Receiver selbst hat die Einstellung keine Wirkung.
- **Abfrageintervall (ältere Geräte)** — wie oft ein Receiver von vor 2010 nach seinem Zustand
  gefragt wird. Diese Modelle können Änderungen nicht von sich aus melden. 60 Sekunden sind
  sinnvoll; ein kürzeres Intervall erzeugt mehr Netzverkehr bei wenig Gewinn.
- **Datenpunktgruppen** — siehe unten.

## Was im Objektbaum entsteht

Jeder Receiver wird ein Gerät. Darunter:

- **info** — ob das Gerät verbunden ist, sein Modell, die Firmware, die Adresse und welches
  der drei Protokolle gerade lebt.
- **power, volume, mute, input, soundProgram, sleep** — der Verstärker-Kern. Immer vorhanden,
  nicht abschaltbar.
- **player** — was gerade läuft: Quelle, Interpret, Album, Titel, Titelbild, abgelaufene und
  Gesamtzeit, Wiederholung und Zufall sowie die Transporttasten. Ein Block je Zone.
- **tuner** — Band, Frequenz in Kilohertz, Speicherplatz, RDS und die DAB-Details, wo das
  Gerät DAB hat.
- **multiroom** — alles, was über eine Zone oder über das Gerät hinausgeht: Zone 2 bis 4 mit
  eigener Lautstärke und eigenem Eingang, Hauptschalter, Party-Modus und die MusicCast-Gruppe.
- **scene** — eine Szene über ihre Nummer oder ihren Namen aufrufen, dazu die Liste der
  Szenen, die das Gerät meldet.
- **remote** — die Bildschirm-Fernbedienung: ein Steuerkreuz und, wo der Receiver sie hat, die
  Menütasten.
- **sound, hdmi, advanced** — Klangregelung, Equalizer, Signalinformationen, HDMI-Ausgänge,
  Lautsprechereinstellungen, die frei belegbaren Eingangsnamen. Auf MusicCast-Geräten kommen die
  geräteweiten Einstellungen dazu: automatische Abschaltung und Display-Helligkeit. Zahlen-
  Datenpunkte tragen die Grenzen, die das Gerät selbst angibt — ein Schieberegler bietet damit
  genau den Bereich an, den der Receiver annimmt.

Angelegt wird nur, was Ihr Gerät wirklich meldet. Eine Soundbar bekommt keine Zone 4, ein
Stereo-Receiver keinen Surround-Dekoder.

### Wiedergabezeiten gibt es in zwei Formen

`player.elapsedTime` und `player.totalTime` sind eine **Zahl in Sekunden** — das ist die Form,
die das ioBroker-Medienspieler-Widget, Alexa und Google brauchen, und die Form, mit der man
rechnen kann. Direkt daneben tragen `player.elapsedTimeText` und `player.totalTimeText`
denselben Wert als lesbaren Text (`1:23`), für eine Visualisierung, die ihn nur anzeigen will.

### Datenpunktgruppen abschalten

Sieben Gruppen lassen sich in den Einstellungen abschalten: Wiedergabe, Tuner, Multiroom,
HDMI, Szenen, Klang und Erweitert, dazu die Uhr auf Geräten, die eine haben. Das Menü und die
Bildschirm-Fernbedienung gehören zur Wiedergabe-Gruppe. Wird eine Gruppe
abgeschaltet, verschwinden ihre Datenpunkte — der Adapter lässt keine leeren Reste stehen.
Beim Wiedereinschalten entstehen sie mit der nächsten Verbindung neu.

## Anwendung

**Einschalten und Quelle wählen**

```javascript
setState("yamaha.0.wohnzimmer.power", true);
setState("yamaha.0.wohnzimmer.input", "HDMI1");
```

**Lautstärke setzen** — in Dezibel, genau so, wie der Receiver sie anzeigt:

```javascript
setState("yamaha.0.wohnzimmer.volume", -35.5);
```

**Szene aufrufen** — über die Nummer oder über den Namen, der am Gerät steht:

```javascript
setState("yamaha.0.wohnzimmer.scene.recall", "Movie Viewing");
```

**Eine Taste der Bildschirm-Fernbedienung drücken** — `up`, `down`, `left`, `right`, `select`,
`return`, `home`:

```javascript
setState("yamaha.0.wohnzimmer.remote.cursor", "left");
```

Die Wörter sind auf allen drei Protokollen dieselben, ein Skript überlebt also den Gerätewechsel.
Angeboten wird nur, was das Gerät wirklich kann: ältere Modelle kennen keine Menütasten, und ihr
Steuerkreuz wirkt auf das geöffnete Menü.

**Im Menü einer Netzwerkquelle blättern.** `player.browse.source` öffnet eine Quelle, die acht
Datenpunkte `line1` bis `line8` zeigen das aktuelle Fenster, `selectLine` wirkt wie die
OK-Taste, und `pageUp`/`pageDown`/`back`/`home` navigieren. Für Skripte gibt es `path`:
schreiben Sie `Bookmarks>Radio Paradise` hinein, und der Adapter läuft den Weg selbst ab.

## Was man wissen sollte

**Der erste Kontakt dauert.** Beim allerersten Verbinden fragt der Adapter den Receiver, welche
Funktionen er hat — auf einem YNCA-Gerät bis zu eine halbe Minute. Die Antworten werden je
Gerät gemerkt und überstehen einen Neustart, deshalb ist das Gerät bei jedem späteren Start in
Sekunden da und die Werte werden im Hintergrund aufgefrischt. Ein Firmware-Update oder ein
anderes Gerät unter derselben Adresse fällt auf und wird neu gefragt.

**Der MusicCast-Port gehört immer nur einem Programm.** MusicCast-Geräte schicken ihre
Meldungen an Port 41100 Ihres ioBroker-Rechners, und den kann nur ein Programm halten. Ist der
alte `musiccast`-Adapter noch installiert und aktiv, hält er diesen Port, und dieser Adapter
fragt dann alle fünf Minuten nach, statt benachrichtigt zu werden. YNCA-Geräte sind davon
nicht betroffen. Den alten Adapter deinstallieren oder stoppen, dann kommen die sofortigen
Meldungen zurück.

**Zone 2 ist eine vollwertige Zone.** Sie hat unter `multiroom.zone2` eine eigene Lautstärke,
einen eigenen Eingang, einen eigenen Wiedergabeblock und eigene Szenen. Der Aufruf eines
Favoriten schaltet die Zone um, die auf diese Quelle hört — nicht immer die Hauptzone.

**Ein abgelehnter Befehl steht im Log.** Weist ein Receiver etwas zurück — eine Szene, die
seine Generation nicht kennt, eine Funktion, die im Bereitschaftszustand nicht geht —, finden
Sie das als Warnung im Adapter-Log, statt dass einfach nichts passiert.

## Wenn etwas nicht geht

- **Das Gerät wird nicht gefunden.** Ältere Geräte antworten auf keine Suche — tragen Sie sie
  über ihre IP-Adresse ein. Ansonsten prüfen, ob ioBroker und Receiver im selben Netzabschnitt
  liegen, und die Netzwerk-Schnittstelle einmal ausdrücklich setzen.
- **Das Gerät bleibt offline.** Adresse prüfen, und ob der Receiver überhaupt erreichbar ist
  (seine eigene Webseite antwortet meist unter `http://<Adresse>`). Der Adapter versucht es
  von selbst weiter, mit wachsenden Pausen.
- **Ein Datenpunkt bleibt leer.** Das Gerät meldet diesen Wert nicht — der Adapter legt nur
  an, was ihm gemeldet wurde. Ein leerer Datenpunkt heißt meist: andere Modelle haben die
  Funktion, Ihres nicht.
- **Es kommen keine Aktualisierungen mehr.** Auf den Hinweis zum MusicCast-Port oben achten
  und `info.connection` am Gerät ansehen.

Für alles Weitere die Protokollstufe der Instanz kurz auf `debug` stellen — der Adapter sagt
dort, was er fragt, was er bekommt und was er nicht abschickt.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (krobipd) Improved: The first connection asks a receiver only what its generation can answer, so zones, trigger sockets and per-input settings follow the device, not a catalogue.
- (krobipd) New: A datapoint the receiver reveals later now appears at once — a function it starts answering, a value it reports for the first time, a status field it begins delivering.
- (krobipd) Changed: A datapoint that never carried a value is removed only after two starts confirm it, so a receiver left in standby no longer loses datapoints it still has.

### 2.6.0 (2026-09-09)

- (krobipd) Fixed: input and sound program lists now offer only what the receiver itself declares or proves it has, instead of every value any Yamaha may have (#619)
- (krobipd) Fixed: the 2008 receiver generation gets volume, mute and sound program back; HDMI output, aspect, resolution and decoder lists carry the values the receiver reports
- (krobipd) New: HD Radio and Sirius on the US models, zone balance, pre-out mode and zone scenes, party volume keys, HDMI video mode, lip sync, a second trigger output and speaker pattern
- (krobipd) New: on older XML receivers the enhancer, CINEMA DSP 3D, speaker A/B, Zone B, a zone-wide cursor pad, transport keys and zone names; MusicCast gains standby-through and speaker pattern
- (krobipd) Improved: a receiver is set up from its own declaration of zones and inputs, so it comes online faster and is learned again by itself after an update that changes how it is read
- (krobipd) Improved: the first connection to a YNCA receiver asks fewer questions, so its datapoints appear sooner

### 2.5.2 (2026-09-07)

- (krobipd) Improved: 174 more datapoints explain themselves — volume and tone now say which scale they use, the stored lists say what is inside them, and the menu rows say what they are for
- (krobipd) Improved: a receiver's "Connected" now says what it means — a device on network standby answers as well, so it is not the same as being switched on

### 2.5.1 (2026-09-07)

- (krobipd) Changed: installing straight from GitHub is no longer offered — the adapter is built before publishing, so it is installed from the ioBroker repository instead

### 2.5.0 (2026-09-07)

- (krobipd) Fixed: switching off a datapoint group now clears it in every zone — turning off "Sound" used to leave the zone 2/3/4 sound datapoints standing, and "Playback" left 304 of them
- (krobipd) Fixed: folders explain themselves on all three protocols now — on MusicCast and older XML receivers the explanation was missing, so a speaker or soundbar got almost none
- (krobipd) Improved: numeric datapoints carry the limits the device itself declares, so a slider offers exactly the range the receiver accepts instead of an open number field
- (krobipd) New: 61 setup datapoints of the 2010 receiver generation — speaker configuration, HDMI and lip-sync settings, trigger assignment, subwoofer trim, YPAO volume and the RDS clock
- (krobipd) New: the device-wide MusicCast settings are readable and writable — automatic standby, display brightness and the two HDMI outputs, created only where the device really offers them
- (krobipd) Fixed: bass, treble and subwoofer trim showed doubled values on MusicCast receivers — that scale counts in half decibels and was labelled as decibels
- (krobipd) Fixed: a receiver that was in standby when the adapter started could end up with an empty media menu until the next restart

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>  
Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.