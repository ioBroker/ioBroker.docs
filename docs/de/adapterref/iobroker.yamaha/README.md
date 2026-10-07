---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.yamaha
BADGE-stable: https://iobroker.live/badges/yamaha-stable.svg
BADGE-Installations: https://iobroker.live/badges/yamaha-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.yamaha
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.yamaha/actions/workflows/test-and-release.yml/badge.svg
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

Du musst nicht wissen, welches Protokoll dein Gerät spricht. Der Adapter probiert alle drei
und nutzt alles, was antwortet.

## Einrichtung

1. Adapter installieren und eine Instanz anlegen.
2. Die Instanz-Einstellungen öffnen. Der Abschnitt **Geräte** zeigt deine Receiver als Karten.
3. Die Liste leer lassen — dann sucht der Adapter selbst im Netz und betreibt, was er findet —
   oder auf **+** drücken und die IP-Adresse eines Receivers eintragen. Beides geht zusammen:
   eingetragene und gefundene Geräte laufen nebeneinander.

Jede Karte zeigt ein Lautsprecher-Symbol für die Lautstärke: einen Lautsprecher mit
Prozentzeichen und darunter die aktuelle Lautstärke der Hauptzone, solange **Lautstärke als
0–100 %** an ist, sonst den schlichten Lautsprecher. Jede Karte lässt sich bearbeiten, auch die
eines gefundenen Geräts — gib ihm die feste Adresse, die du dem Receiver vergeben hast, und es
wird zu einem deiner eingetragenen Geräte.

Ein Receiver von vor 2010 antwortet auf keine Netzwerksuche und muss immer von Hand
eingetragen werden. Dasselbe gilt für jedes Gerät, das dein Router in einem anderen
Netzabschnitt hält.

**Gib dem Receiver eine feste Adresse.** Der Adapter erkennt ein Gerät an seiner
Identität, nicht an der Adresse, und folgt ihm bei einem Adresswechsel — ein Gerät, das
umzieht, während der Adapter nicht läuft, findet aber erst die nächste Netzwerksuche wieder.

### Einstellungen

- **Netzsuche nach Geräten** — _Automatisch_ sucht, solange die Geräteliste leer ist; so hat
  der Adapter es immer gemacht. _Immer_ sucht zusätzlich zu den eingetragenen Geräten.
  _Nie_ überlässt deiner Liste allein das Feld und öffnet keinen Hörer auf UDP-Port 1900. Ein
  früher gefundenes Gerät, nach dem nicht mehr gesucht wird, behält seine Datenpunkte — sie
  werden nur als offline gekennzeichnet. Endgültig entfernt es allein der Löschknopf auf seiner
  Karte. Eine Liste, die nur die aus dem Vorgänger-Adapter übernommene Zeile enthält (ihr Name
  ist eine IP-Adresse), gilt als leer: diese Adresse hat niemand getippt, die Suche bleibt an
  und folgt dem Receiver zu einer neuen Adresse.
- **Netzwerk-Interface** — auf „alle Adressen“ (0.0.0.0) lassen, dann verlässt die Suche jede
  Netzwerkkarte deines ioBroker-Rechners. Nur setzen, wenn dein Server in mehreren Netzen hängt und die Suche eine
  bestimmte nehmen soll. Auf die Receiver selbst hat die Einstellung keine Wirkung.
- **MusicCast-Ereignisport** — wird angezeigt, ist nicht änderbar: MusicCast-Geräte melden ihre
  Änderungen an den UDP-Port 41100, das legt das Protokoll fest. Das Feld ist da, damit der Admin
  warnen kann, wenn eine zweite Instanz auf demselben Rechner den Port belegen würde.
- **XML-Abfrageintervall** — wie oft ein Receiver von vor 2010 nach seinem Zustand
  gefragt wird. Diese Modelle können Änderungen nicht von sich aus melden. 60 Sekunden sind
  sinnvoll; ein kürzeres Intervall erzeugt mehr Netzverkehr bei wenig Gewinn.
- **Datenpunkte** — siehe unten.

### Auf jeder Gerätekarte

- **Lautstärke als 0–100 %** — aus tragen die Lautstärke-Datenpunkte dieses Receivers die
  Skala, die er selbst anzeigt: Dezibel oder seine eigene Schrittzahl. Ein tragen sie
  stattdessen 0–100 %, Hauptzone wie jede weitere Zone dieses Receivers — der Bereich, den die
  meisten VIS-Widgets erwarten. Der Adapter rechnet in beide Richtungen um, der Receiver
  bekommt also immer den Wert, den er erwartet.

  Die Einstellung gehört dem Gerät, nicht der Instanz: dass ein Receiver Prozent will, sagt
  nichts über die anderen. Du setzt sie dort, wo auch Name und Adresse des Geräts stehen: im
  Anlegen-/Bearbeiten-Dialog seiner Karte — und solange sie an ist, trägt das
  Lautsprecher-Symbol der Karte ein Prozentzeichen, du siehst es also, ohne etwas zu öffnen.

## Was im Objektbaum entsteht

Jeder Receiver wird ein Gerät. Darunter:

- **info** — ob das Gerät verbunden ist, sein Modell, die Firmware, die Adresse und welches
  der drei Protokolle gerade lebt.
- **power, volume, mute, input, soundProgram, sleep** — der Verstärker-Kern. Nicht abschaltbar;
  ein Gerät bekommt die, die es hat (ein Lautsprecher hat kein Klangprogramm).
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

Angelegt wird nur, was dein Gerät wirklich meldet. Eine Soundbar bekommt keine Zone 4, ein
Stereo-Receiver keinen Surround-Dekoder.

### Wiedergabezeiten gibt es in zwei Formen

`player.elapsedTime` und `player.totalTime` sind eine **Zahl in Sekunden** — das ist die Form,
die das ioBroker-Medienspieler-Widget, Alexa und Google brauchen, und die Form, mit der du
rechnen kannst. Direkt daneben tragen `player.elapsedTimeText` und `player.totalTimeText`
denselben Wert als lesbaren Text (`1:23`), für eine Visualisierung, die ihn nur anzeigen will.

### Datenpunktgruppen abschalten

Sieben Gruppen lassen sich in den Einstellungen abschalten: Wiedergabe, Tuner, Multiroom,
HDMI, Szenen, Klang und Erweitert, dazu die Uhr auf Geräten, die eine haben. Das Menü und die
Bildschirm-Fernbedienung gehören zur Wiedergabe-Gruppe. Schaltest du eine Gruppe ab,
verschwinden ihre Datenpunkte — der Adapter lässt keine leeren Reste stehen. Beim
Wiedereinschalten entstehen sie mit der nächsten Verbindung neu.

## Anwendung

**Einschalten und Quelle wählen**

```javascript
setState("yamaha.0.rx-v6a-1a2b.power", true);
setState("yamaha.0.rx-v6a-1a2b.input", "HDMI1");
```

**Lautstärke setzen** — in der Skala, die der Receiver anzeigt (Dezibel oder seine eigenen
Schritte), innerhalb der Grenzen seines `volume`-Datenpunkts; mit **Lautstärke als 0–100 %** in
Prozent. Auf einem Receiver mit Dezibel-Anzeige:

```javascript
setState("yamaha.0.rx-v6a-1a2b.volume", -35.5);
```

**Szene aufrufen** — über die Nummer oder über den Namen, der am Gerät steht:

```javascript
setState("yamaha.0.rx-v6a-1a2b.scene.recall", "Movie Viewing");
```

**Eine Taste der Bildschirm-Fernbedienung drücken** — `up`, `down`, `left`, `right`, `select`,
`return`, `home`:

```javascript
setState("yamaha.0.rx-v6a-1a2b.remote.cursor", "left");
```

Die Wörter sind auf allen drei Protokollen dieselben, ein Skript überlebt also den Gerätewechsel.
Angeboten wird nur, was das Gerät wirklich kann: ältere Modelle kennen keine Menütasten, und ihr
Steuerkreuz wirkt auf das geöffnete Menü.

**Im Menü einer Netzwerkquelle blättern.** `player.browse.source` öffnet eine Quelle, die acht
Datenpunkte `line1` bis `line8` zeigen das aktuelle Fenster, `selectLine` wirkt wie die
OK-Taste, und `pageUp`/`pageDown`/`back`/`home` navigieren. Für Skripte gibt es `path`:
schreib `Bookmarks>Radio Paradise` hinein, und der Adapter läuft den Weg selbst ab.

## Was du wissen solltest

**Der erste Kontakt dauert.** Beim allerersten Verbinden fragt der Adapter den Receiver, welche
Funktionen er hat — auf einem YNCA-Gerät bis zu eine halbe Minute. Die Antworten werden je
Gerät gemerkt und überstehen einen Neustart, deshalb ist das Gerät bei jedem späteren Start in
Sekunden da und die Werte werden im Hintergrund aufgefrischt. Ein Firmware-Update oder ein
anderes Gerät unter derselben Adresse fällt auf und wird neu gefragt.

**Die Objekt-ID eines Geräts ist sein Modell und das Ende seiner Seriennummer** — zum Beispiel
`yamaha.0.rx-v6a-1a2b`. Zwei Geräte desselben Modells bekommen damit zwei Objektbäume, und ein
Gerät behält seine ID, wie auch immer du oder die App es nennen: Der Name neben der ID kommt vom
Gerät und lässt sich auf seiner Karte ändern. Haben zwei Geräte desselben Modells dieselben
letzten vier Stellen, bekommt das zweite die ganze Seriennummer. Ein Gerät, das keine
Seriennummer meldet — ein YNCA-Receiver, dessen XML-Steuerung nicht antwortet —, heißt nach
seinem Modell: `rx-v473`, `rx-v473-2`. Ein Gerät, das du von Hand einträgst, während es aus ist,
startet unter dem getippten Namen; sobald es geantwortet hat, ziehen seine Objekte beim nächsten
Start auf seine Modell-ID um.

**Ein Receiver ist an seiner Seriennummer bekannt, nicht an seiner Adresse.** Der Adapter
lernt die Seriennummer (und die MAC) vom Receiver selbst — aus seiner Netz-Ankündigung, über
MusicCast, über die XML-Steuerung. Ein Gerät, das eine neue IP-Adresse oder einen neuen Namen
bekommt, behält seine Objekte: gefundene Geräte und die aus dem Vorgänger übernommene Zeile
werden an die neue Adresse umgezogen, meist innerhalb von Sekunden, weil ein Receiver sich
beim Start im Netz meldet — spätestens durch die Suche, die ein Verbindungsabriss auslöst.
Ein von Hand eingetragenes Gerät bleibt an der getippten Adresse; sieht die Suche es woanders
antworten, sagt das Log es einmal — bearbeite die Karte, um es umzuziehen. Der Hörer teilt sich
Port 1900 mit anderen UPnP-Diensten auf deinem Rechner; kann er den Port nicht nutzen, steht
eine Warnung im Log und der Adapter sucht nur noch periodisch.

**Löschen ist endgültig.** Der Löschknopf auf einer Karte fragt zuerst und sagt, was mit dem
Gerät geht: alle seine Datenpunkte, ihre Historie und jede Visualisierungs-Bindung. Ein per
Netzsuche gefundenes Gerät wird nicht wieder aufgenommen — es steht auf der Ausschlussliste,
bis du es entweder von Hand hinzufügst oder in **Ausgeschlossene Geräte…** über der
Geräteliste anhakst; dann nimmt die nächste Suche es wieder auf.

**MusicCast-Meldungen brauchen UDP-Port 41100.** MusicCast-Geräte schicken ihre Meldungen an
Port 41100 deines ioBroker-Rechners, und den kann nur ein Programm halten. Ist der alte
`musiccast`-Adapter noch installiert und aktiv, hält er diesen Port. Die Meldungen bleiben auch
aus, wenn ioBroker in Docker läuft und dieser UDP-Port nicht freigegeben ist, oder wenn sich
ein zweites MusicCast-Programm auf demselben Rechner für sie anmeldet. Der Adapter merkt eine
Änderung, zu der keine Meldung kam: nach zweien sagt er es einmal im Log, liest jeden
Schreibvorgang zurück und fragt alle fünf Minuten alles ab. YNCA-Geräte sind davon nicht
betroffen. Gib den Port frei, dann kommen die sofortigen Meldungen zurück — das Log sagt es,
sobald sie wieder ankommen.

**Zone 2 ist eine vollwertige Zone.** Sie hat unter `multiroom.zone2` eine eigene Lautstärke,
einen eigenen Eingang, einen eigenen Wiedergabeblock und eigene Szenen. Der Aufruf eines
Favoriten schaltet die Zone um, die auf diese Quelle hört — nicht immer die Hauptzone.

**Ein abgelehnter Befehl steht im Log.** Weist ein Receiver etwas zurück — eine Szene, die
seine Generation nicht kennt, eine Funktion, die im Bereitschaftszustand nicht geht —, findest
du das als Warnung im Adapter-Log, statt dass einfach nichts passiert. Die Antwort eines
MusicCast-Geräts kommt mit ihrer Bedeutung, z. B. `Guarded` für „im jetzigen Zustand nicht
möglich“. Der Datenpunkt zeigt danach wieder den Wert des Geräts.

## Wenn etwas nicht geht

- **Das Gerät wird nicht gefunden.** Ältere Geräte antworten auf keine Suche — trag sie
  über ihre IP-Adresse ein. Ansonsten prüf, ob ioBroker und Receiver im selben Netzabschnitt
  liegen, und setz das Netzwerk-Interface einmal ausdrücklich.
- **Das Gerät bleibt offline.** Prüf die Adresse, und ob der Receiver überhaupt erreichbar ist
  (seine eigene Webseite antwortet meist unter `http://<Adresse>`). Der Adapter versucht es
  von selbst weiter, mit wachsenden Pausen. Hat der Receiver eine neue Adresse bekommen, folgt
  ihm ein gefundenes Gerät von selbst; ein von Hand eingetragenes musst du bearbeiten — das
  Log nennt die neue Adresse.
- **Ich habe ein Gerät gelöscht und es kommt wieder / ich will es zurück.** Ein gelöschtes
  Gerät bleibt aus der Suche draußen, bis du es wieder zulässt: von Hand hinzufügen, oder
  **Ausgeschlossene Geräte…** über der Liste öffnen und es anhaken.
- **Ein Datenpunkt bleibt leer.** Das Gerät meldet diesen Wert nicht — der Adapter legt nur
  an, was ihm gemeldet wurde. Ein leerer Datenpunkt heißt meist: andere Modelle haben die
  Funktion, deines nicht.
- **Es kommen keine Aktualisierungen mehr.** Achte auf den Hinweis zum MusicCast-Port oben und
  sieh dir `info.connection` am Gerät an.

Für alles Weitere stell die Protokollstufe der Instanz kurz auf `debug` — der Adapter sagt
dort, was er fragt, was er bekommt und was er nicht abschickt.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 3.2.0 (2026-10-02)

- (krobipd) Fixed: Dropdown lists such as sound program, sleep timer and Adaptive DRC no longer go empty when the receiver loses power; lists emptied that way come back
- (krobipd) Changed: Your datapoints stay exactly as they are while the adapter runs, also when a receiver goes offline; they change only after an adapter or firmware update
- (krobipd) New: A command the receiver refuses over one protocol, or one sent while that protocol is offline, goes out over another protocol that understands it
- (krobipd) New: A firmware update of the receiver is noticed and logged; the adapter reads the receiver again and reports it ready once that is done
- (krobipd) Fixed: Datapoints of found receivers are no longer deleted at adapter start when the receiver list cannot be read or an entered receiver has the same address

### 3.1.3 (2026-10-02)

- (krobipd) Fixed: Menu lines fill again after switching player.browse.source, also on receivers that were in standby when the adapter started
- (krobipd) Fixed: On receivers that offer their menus only over XML (models from before 2010), the menu lines no longer stay empty after a source switch
- (krobipd) Changed: A new instance starts switched off and waits until you have set it up; existing instances keep their own setting

### 3.1.2 (2026-09-30)

- (krobipd) Fixed: The sleep timer lists the receiver's own values again (Off, 30 min …) instead of MusicCast's minutes, so a picked value is one the receiver accepts

### 3.1.1 (2026-09-30)

- (krobipd) Fixed: A receiver that replaces another at the same address is asked again whether zones 2 and 3 have an on-screen remote, instead of inheriting the old answer

### 3.1.0 (2026-09-30)

- (krobipd) Changed: player.playback follows the ioBroker standard now — 0 pause, 1 play, 2 stop; repeat and shuffle can be set directly where the device allows it
- (krobipd) New: Receivers from before 2010 show what is playing — artist, album, track, station, status and cover — and 2008 models get their zone names
- (krobipd) New: Every favourite, recent item, playlist, stored station and scene title is a datapoint of its own, next to the list
- (krobipd) New: Volume up/down keys, a mute level, storing and clearing tuner presets, station search, and a settable clock and alarm on MusicCast clock radios
- (krobipd) Fixed: A protocol that does not answer at start is connected again later, and its datapoints keep their type in the meantime
- (krobipd) Fixed: On older receivers only what the device declares can be written, with its own limits; 2008 tuner presets A1–E8, band and frequency work
- (krobipd) New: More menu sources on older receivers, TIDAL on MusicCast, menus in your ioBroker language, and remote pads for zones 2 and 3 of 2011/2012 AVENTAGE
- (krobipd) Fixed: A MusicCast Zone B shows as Zone B and joins a group with Zone A, and the cover changes with the track
- (krobipd) Fixed: Deleting a device, renaming it in the dialog or stopping the adapter no longer loses a name or leaves a network search running
- (krobipd) Improved: Dropdowns show readable names in your ioBroker language, the playing source shows the input's name, and each queued track is its own datapoint

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