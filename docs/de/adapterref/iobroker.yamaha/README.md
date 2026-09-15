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

Sie müssen nicht wissen, welches Protokoll Ihr Gerät spricht. Der Adapter probiert alle drei
und nutzt alles, was antwortet.

## Einrichtung

1. Adapter installieren und eine Instanz anlegen.
2. Die Instanz-Einstellungen öffnen. Der Reiter **Geräte** zeigt Ihre Receiver als Karten.
3. Die Liste leer lassen — dann sucht der Adapter selbst im Netz und betreibt, was er findet —
   oder auf **+** drücken und die IP-Adresse eines Receivers eintragen. Beides geht zusammen:
   eingetragene und gefundene Geräte laufen nebeneinander.

Jede Karte trägt ein kleines Symbol dafür, woher ihre Adresse kommt: ein Stift für ein
eingetragenes Gerät, eine Lupe für ein gefundenes. Auch ein gefundenes Gerät lässt sich
bearbeiten — geben Sie ihm die feste Adresse, die Sie dem Receiver vergeben haben, und es wird
zu einem Ihrer eingetragenen Geräte.

Ein Receiver von vor 2010 antwortet auf keine Netzwerksuche und muss immer von Hand
eingetragen werden. Dasselbe gilt für jedes Gerät, das Ihr Router in einem anderen
Netzabschnitt hält.

**Geben Sie dem Receiver eine feste Adresse.** Der Adapter erkennt ein Gerät an seiner
Identität, nicht an der Adresse, und folgt ihm bei einem Adresswechsel — ein Gerät, das
umzieht, während der Adapter nicht läuft, findet aber erst die nächste Netzwerksuche wieder.

### Einstellungen

- **Netzsuche nach Geräten** — _Automatisch_ sucht, solange die Geräteliste leer ist; so hat
  der Adapter es immer gemacht. _Immer_ sucht zusätzlich zu den eingetragenen Geräten.
  _Nie_ überlässt Ihrer Liste allein das Feld. Ein früher gefundenes Gerät, nach dem nicht mehr
  gesucht wird, behält seine Datenpunkte — sie werden nur als offline gekennzeichnet. Endgültig
  entfernt es allein der Löschknopf auf seiner Karte.
- **Netzwerk-Schnittstelle** — leer lassen, dann verlässt die Suche jede Netzwerkkarte Ihres
  ioBroker-Rechners. Nur setzen, wenn Ihr Server in mehreren Netzen hängt und die Suche eine
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
  nichts über die anderen. Gesetzt wird sie dort, wo auch Name und Adresse des Geräts stehen:
  im Anlegen-/Bearbeiten-Dialog seiner Karte — und solange sie an ist, trägt die Karte neben den
  Protokoll-Kürzeln ein kleines **0–100 %**-Abzeichen, man sieht es also ohne etwas zu öffnen.

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

### 2.9.2 (2026-09-12)

- (krobipd) New: The device card shows a 0–100 % badge while that receiver's volume is in percent, so you can tell the two scales apart at a glance
- (krobipd) Fixed: The percent setting is made in one place again — the device's edit dialog; the extra switch on the card showed the wrong position and is gone

### 2.9.1 (2026-09-12)

- (krobipd) Fixed: A receiver the network search found keeps its datapoints when you add a device by hand — they stay with their history and are marked offline instead of deleted

### 2.9.0 (2026-09-12)

- (krobipd) New: Devices you enter by hand and devices the network search finds now run side by side — entering one receiver no longer takes every found one out of the instance
- (krobipd) New: Setting "Search the network for devices" — automatically while your device list is empty (as before), always next to it, or never
- (krobipd) New: Every device card can be edited. Give a found receiver the fixed address you assigned it and it becomes one of your entered devices, keeping its whole object tree
- (krobipd) New: Each card shows where its address came from, and "Volume as 0–100 %" is now set per device instead of once for the whole instance — every receiver keeps what it had
- (krobipd) Fixed: hdmi.aspect and hdmi.resolution were missing on every receiver from 2012 on — the models moved those settings to another subunit and the adapter only ever asked the old one
- (krobipd) Fixed: Receivers from 2010/2011 were offered a 4K video resolution their model does not support
- (krobipd) Fixed: A write to a receiver could be dropped without a trace while another of its protocols was reconnecting
- (krobipd) Fixed: Deleting a device and adding the same one again left it with the wrong icon until the next restart, and a pending write could recreate the deleted device object
- (krobipd) Changed: A MusicCast receiver's datapoints now update only when their value really changed — automations tied to them stop firing for no reason

### 2.8.0 (2026-09-11)

- (krobipd) Fixed: A volume written to a MusicCast receiver now arrives exactly — the adapter reads the receiver's own step declaration instead of guessing a ratio (#623)
- (krobipd) Fixed: Every zone of a receiver now carries the same volume scale — a third zone used to show a raw 0…161 count next to decibels in the other two
- (krobipd) Changed: The volume datapoint now carries the minimum, maximum and step the receiver reports for that zone — a receiver whose zones differ gets a different range per zone
- (krobipd) New: Setting "Volume as 0–100 %" turns every volume datapoint, in every zone, into a percentage — what most VIS widgets expect. Off by default; the receiver's own scale stays the truth
- (krobipd) Changed: The datapoints actualVolume, actualVolumeMode and inputText are gone — volume and input carry the same information
- (krobipd) Changed: After this update every receiver is asked about its abilities once more, so the first start takes a little longer than usual
- (krobipd) Fixed: A DAB receiver no longer logs a warning on every tuner poll — the frequency datapoint was limited to the FM band while the receiver reported DAB frequencies

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