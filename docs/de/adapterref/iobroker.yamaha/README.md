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
- **Netzwerk-Schnittstelle** — leer lassen, dann verlässt die Suche jede Netzwerkkarte deines
  ioBroker-Rechners. Nur setzen, wenn dein Server in mehreren Netzen hängt und die Suche eine
  bestimmte nehmen soll. Auf die Receiver selbst hat die Einstellung keine Wirkung.
- **MusicCast-Ereignisport** — wird angezeigt, ist nicht änderbar: MusicCast-Geräte melden ihre
  Änderungen an den UDP-Port 41100, das legt das Protokoll fest. Das Feld ist da, damit der Admin
  warnen kann, wenn eine zweite Instanz auf demselben Rechner den Port belegen würde.
- **Abfrageintervall (ältere Geräte)** — wie oft ein Receiver von vor 2010 nach seinem Zustand
  gefragt wird. Diese Modelle können Änderungen nicht von sich aus melden. 60 Sekunden sind
  sinnvoll; ein kürzeres Intervall erzeugt mehr Netzverkehr bei wenig Gewinn.
- **Datenpunktgruppen** — siehe unten.

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
  liegen, und setz die Netzwerk-Schnittstelle einmal ausdrücklich.
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

### 3.0.0 (2026-09-26)

- (krobipd) Changed: Every device gets a new object ID once — its model and the end of its serial number, e.g. `wx-030-2b3c`; scripts and VIS need the new IDs
- (krobipd) Changed: The move carries values, recording settings, rooms, functions and aliases along, and recorded history continues in its old series
- (krobipd) Fixed: A second device of the same model and name is no longer skipped — every device gets its own object tree
- (krobipd) Fixed: After a restart, the input list of a YNCA receiver offers only the sources the receiver has again, not the whole catalog
- (krobipd) New: A device added by hand is asked for its model and serial number, and the name you type is its display name from the start
- (krobipd) New: The device card shows the object ID, the MAC address and the serial number under its details

### 2.13.0 (2026-09-25)

- (krobipd) Fixed: A value a receiver refuses no longer stays on the datapoint — every write is read back, and the log names the device's reason
- (krobipd) Fixed: MusicCast values stay current in Docker or next to a second MusicCast app — missing events are noticed, then the adapter polls and reads writes back
- (krobipd) New: MusicCast devices write every setting the specification gives a setter for: dialogue level, 3D surround, tone mode, speaker A/B, dimmer, group name and more
- (krobipd) Fixed: MusicCast Link groups are built and left as Yamaha specifies — the joining zone switches to MusicCast Link, multiroom.group.status shows the progress
- (krobipd) Fixed: Names you give inputs, sound programs and zones in the app or on the receiver show up at the next connection instead of staying frozen
- (krobipd) Fixed: Umlauts in names and titles arrive intact on all three protocols, and YNCA zone names are written in the character set the receiver expects
- (krobipd) Fixed: When one protocol of a receiver drops, a live one takes over every datapoint it serves the same way, so power and volume keep working
- (krobipd) Fixed: true, a hex string or "1e2" written to a level, preset or scene no longer reaches the receiver; in percent mode "50" counts like 50
- (krobipd) Fixed: Back and Home work on 2012-and-later YNCA receivers, and a refused key no longer switches the remote pad to another command set for good
- (krobipd) Fixed: YNCA reads every word the official lists declare — an attenuated mute reads as muted, and repeat-one is written in the receiver's own word
- (krobipd) Fixed: A deleted device carried over from yamaha 0.5.x stays deleted, and a hostname in the device list works like an IP address
- (krobipd) New: Menus on the 2008 XML receivers (RX-V3900 generation); XML zones write tone and dialogue level the way the receiver declares them
- (krobipd) Changed: The first start after this update asks every receiver again what it can do — up to half a minute on a YNCA receiver, as on a first contact
- (krobipd) Improved: The README lists the ports the adapter uses; with the network search set to Never it opens no listener on UDP port 1900
- (krobipd) Changed: Settings left over from older versions are removed from the instance once after the update; the instance restarts once for it

### 2.12.0 (2026-09-22)

- (krobipd) Fixed: Deleting a device is final: the card asks first and names the datapoints, the device stays out of the search until you admit it again, and the log says how many datapoints went
- (krobipd) New: A device is known by its serial number: a receiver with a new IP address or a new name keeps its objects and is reconnected at the new address within seconds
- (krobipd) New: "Excluded devices…" above the device list shows the deleted devices and lets the network search admit a ticked one again — it says what it looks for and what it found
- (krobipd) Improved: A receiver that lost power is offline in about 90 seconds instead of up to 15 minutes: the first protocol that notices asks the others at once
- (krobipd) Improved: The adapter hears devices announcing themselves on the network, and while no device runs it keeps searching every five minutes
- (krobipd) Changed: A row carried over from the old adapter (name = IP) follows the receiver to a new address; a device entered by hand stays where it was typed, the log says if it answers elsewhere
- (krobipd) Improved: Switching a receiver off no longer fills the log with warnings, and every search the log announces also tells you what it found — or that nothing answered
- (krobipd) Improved: Less network noise while a receiver stays unreachable: the retries knock only on the protocols that device actually speaks, not on all three

### 2.11.0 (2026-09-17) — stable

- (krobipd) Fixed: The adapter no longer stops when the object database is briefly unavailable while a receiver reports a change
- (krobipd) Fixed: A datapoint whose value range a receiver no longer reports keeps its value, its history and its room and function assignments
- (krobipd) Fixed: A receiver that is switched off keeps its name after a restart
- (krobipd) Fixed: A name you type on a device card now wins over every name the receiver reports for itself
- (krobipd) Improved: When something goes wrong, the log names the cause instead of a placeholder

### 2.10.0 (2026-09-15)

- (krobipd) Fixed: A receiver the search found is searched for again after it moved to another address — until now that only worked for receivers found at start-up
- (krobipd) Fixed: A receiver that is unplugged or switched off at the mains now shows as disconnected within about 90 seconds instead of staying green for many minutes
- (krobipd) Fixed: A MusicCast device that stops answering a command is checked right away and shown as disconnected — until now that took up to 15 minutes
- (krobipd) Fixed: On receivers without live updates, a value you write is confirmed as soon as the receiver took it, instead of up to five minutes later
- (krobipd) Fixed: A zone name you changed on an older receiver stays after a reconnect — until now the previous name came back
- (krobipd) Fixed: Deleting a device from its card while it is still connecting no longer leaves parts of its object tree behind
- (krobipd) Fixed: Writing false, off or 0 to a switch datapoint now switches it off — until now any text, even the word false, switched it on
- (krobipd) Improved: The history of a datapoint only records values the receiver actually changed — a restart or a lost connection no longer adds identical entries
- (krobipd) Improved: MusicCast live updates now start on their own once a port another program held at start-up becomes free — before, only a restart helped
- (krobipd) New: Device pictograms in the object tree and on the device cards — receiver, stereo receiver, speaker, soundbar or CD system, readable in every theme, also for a device that is off
- (krobipd) Changed: The device card shows a speaker symbol; with the percent switch on it also shows the current volume as a percentage. The pencil and magnifier markers are gone
- (krobipd) Fixed: The adapter logo is readable in the Admin's dark themes as well — until now its dark strokes vanished on a dark background
- (krobipd) Changed: The instance settings show the fixed MusicCast event port, so the Admin warns when a second instance on the same host would take it

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