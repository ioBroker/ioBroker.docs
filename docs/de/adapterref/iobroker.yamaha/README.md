---
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