---
chapters: {"pages":{"en/adapterref/iobroker.miele-local/README.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README.md"},"en/adapterref/iobroker.miele-local/README_de.md":{"title":{"en":"ioBroker.miele-local"},"content":"en/adapterref/iobroker.miele-local/README_de.md"},"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md":{"title":{"en":"Ein unbekanntes Miele-Gerät erkunden"},"content":"en/adapterref/iobroker.miele-local/docs/geraet-erkunden.md"}}}
---
# Ein unbekanntes Miele-Gerät erkunden

Wie man herausfindet, welche Daten ein Gerät über DOP2 hergibt — und welche davon etwas
bedeuten. Geschrieben nach der Erkundung von WCR860 (Waschmaschine), G5840 (Spülmaschine) und
H2469BP (Backofen) im September 2026.

Der Adapter bringt alles mit, was dafür nötig ist. Diese Anleitung sagt, in welcher
Reihenfolge man es benutzt und woran man scheitert, wenn man es anders macht.

---

## 1. Das Gerät muss erreichbar sein

Voraussetzung ist eine bestehende Verbindung: IP eingetragen, GroupID und GroupKey vorhanden,
`info.connection` steht auf `true`. Wie das zustande kommt, steht in der README — hier geht es
um das, was danach kommt.

**Die wichtigste Eigenschaft des Geräts:** Ein Miele-Modul beantwortet immer nur **eine**
Verbindung. Zwei gleichzeitige Anfragen bringen es aus dem Tritt; deshalb hat `lib/api.js` eine
Warteschlange. Wer sie umgeht, bekommt keine schnelleren Antworten, sondern gar keine.

---

## 2. Was das Gerät überhaupt beantwortet: der Leaf-Scan

DOP2 adressiert Daten über `unit/attribute`. Vier Adressen sind aus fremden Projekten bekannt
und am Gerät bestätigt:

| Leaf | Inhalt |
|---|---|
| 2/119 | Betriebsstunden |
| 2/256 | Rest- und Laufzeit |
| 2/1583 | Benutzeranfrage |
| 2/6195 | EcoFeedback |

Woher sie stammen, ist nicht dokumentiert. Was daneben noch antwortet, weiß niemand — und
genau das findet der Scan heraus.

### So wird gescannt

Datenpunkt `<gerät>.sammlung.leafScan` auf `true` setzen. Der Schalter **bleibt stehen** und
bedeutet „scanne, bis fertig": Der Adapter arbeitet Durchgang um Durchgang, mit einer Minute
Verschnaufpause dazwischen, bis nichts mehr offen ist oder der Schalter umgelegt wird.

Der Fortschritt steht in `sammlung.leafScanStand`, die Ergebnisse in `sammlung.leafScanJson`.
Ein Adapterneustart beendet den Dauerlauf; der Fortschritt ist gesichert, und ein erneutes
Umlegen macht dort weiter, wo er stand.

### Die Bereiche und ihre Reihenfolge

`lib/leafscan.js`, Konstante `BEREICHE` — 882 Adressen, in dieser Reihenfolge:

1. `2/6100–6300` — die Umgebung des EcoFeedback
2. `2/1500–1700` — die Umgebung der Benutzeranfrage
3. `2/1–400` — Zustand und Zeiten
4. `1/1–40` und `3/1–40` — Gerätedaten, Konfiguration

**Die Reihenfolge ist die Aussicht auf Erfolg, nicht die Nummer.** Bis September 2026 stand
Unit 1 vorn, und der Scan kam nie darüber hinaus: Nach vier Wochen standen 20 von 882 Adressen
als geprüft, alle aus Unit 1, alle ohne Antwort. Ein Durchgang umfasst 40 Adressen und läuft
nur, wenn die Maschine wach ist — wer die ersten achtzig davon auf einen Bereich verwendet, der
nachweislich schweigt, kommt nie an die Stelle, an der etwas zu holen wäre.

### Wann gescannt wird

**Im Leerlauf, nicht während eines Programms.** Der Unterschied ist groß:

| Zustand | Adressen je Durchgang |
|---|---|
| Programm läuft | ~3 |
| wach, aber im Leerlauf | ~24 |
| aus | nur 500er, nichts verwertbar |

Der beste Moment ist direkt nach einem Programm, solange das Gerät noch wach ist und
stundenlang nichts anderes zu tun hat.

**Weder am ausgeschalteten Gerät noch während eines Programms darf gescannt werden**, und der
Adapter verhindert seit 0.3.29 beides selbst — gescannt wird nur im Leerlauf (Status 7): Ein ausgeschaltetes Modul beantwortet **jede** Adresse mit 500, und diese
500er sind von einem echten „gibt es nicht" nicht zu unterscheiden. Ein Scan, der so
durchläuft, meldet danach „882 von 882 geprüft" und hat in Wahrheit nichts gefragt.

Der Scan wartet jetzt, statt Fehlurteile zu sammeln.

**Ein Beispiel, wie man sich dabei selbst täuscht.** Die Spülmaschine G5840 lieferte 875
Adressen mit 500 und genau **einen** Treffer, während die baugleich angebundene Waschmaschine
zehn Leafs hatte. Das sah nach genau diesem Artefakt aus, und der Scan wurde zweimal verworfen
und wiederholt. Beim genauen Hinsehen enthielt er aber **6 × 404** — und die lagen zusammen
mit dem Treffer alle im 1500er-Bereich. Das Gerät hatte also sehr wohl Auskunft gegeben, nur
eben ausschließlich dort, wo es etwas zu sagen hatte. **Der ursprüngliche Befund stimmte: Die
G5840 hat kein EcoFeedback-Leaf.**

Die Lehre gilt in beide Richtungen: Ein Ergebnis aus lauter 500ern ist wertlos — aber schon
eine Handvoll 404er darin macht es gültig. Vor dem Verwerfen eines Scans also nachsehen, *wo*
die differenzierten Antworten liegen.

**Ein laufendes Programm ist genauso schlecht — das wurde zuerst übersehen.** Am 07.09.2026
lief der Scan an der *arbeitenden* Spülmaschine und lieferte 102 Adressen, davon **102 mit
500, ausnahmslos**. Zur selben Zeit beantwortete die ebenfalls arbeitende Waschmaschine
Anfragen auf `2/6192` — ein Leaf, das sie nachweislich hat — nur noch mit Timeouts. Während
eines Programms hat das Modul keine Kapazität, und seine Absagen bedeuten nichts.

**Die Probe auf ein brauchbares Ergebnis: Kommt mehr als eine Sorte Antwort?** Ein Gerät, das
wirklich antwortet, unterscheidet — die Waschmaschine lieferte 500er *und* 404er *und*
Treffer. Ein Ergebnis aus lauter 500ern ist kein Ergebnis, egal wie viele Adressen darin
stehen.

**Seit 0.3.31 prüft der Adapter das selbst, vor jedem Durchgang** (`gespraechsbereit`): Er
fragt eine Adresse, die es nicht gibt, und wertet die Antwort aus — 404 heißt „ich gebe
Auskunft", 500 oder Schweigen heißt „gerade nicht". Das ersetzt die frühere Regel „nur im
Standby scannen", die zu grob war: Der Gerätestatus sagt nichts über die Kapazität des Moduls.
Eine Spülmaschine im Trocknen steht auf „In Betrieb" und wartet dabei nur; umgekehrt schalten
manche Geräte nach dem Programm sofort ab und zeigen nie einen Leerlauf.

**Die Kontrolladresse muss in einem Bereich liegen, den das Gerät kennt.** Erst stand dort
2/6196 (neben dem EcoFeedback) — die Spülmaschine kennt den gesamten 6000er-Bereich nicht und
hätte damit dauerhaft als ausgelastet gegolten. Jetzt ist es **2/1583**: Dort antworten beide
bekannten Geräte differenziert, die Waschmaschine mit einem Treffer, die Spülmaschine mit 404.

### Was einen Neustart überlebt — und was nicht

Drei Dinge liefen als Schleife oder Merkposten im Speicher, während ihr Schalter auf der Platte
stand. Ein Adapterneustart nahm jeweils das eine mit und ließ das andere stehen; der Zustand
las sich danach als „läuft" und tat nichts, ohne eine Zeile im Log:

| Was | Symptom | seit |
|---|---|---|
| Feinaufzeichnung | zeichnete stumm nicht mehr auf | 0.3.26 behoben |
| Leaf-Scan-Dauerlauf | Scan stand bei 4 von 882 Adressen | 0.3.27 behoben |
| Zählerstand bei Programmstart | `history.gemessenLetzter` blieb 0 | 0.3.27 behoben |

Ausgelöst wurden alle drei durch etwas völlig Harmloses: **eine Konfigurationsänderung startet
die Instanz neu.** Wer einen Energiezähler einträgt, während ein Scan läuft, hat den Scan
beendet. Beim Bau eines langlaufenden Vorgangs gehört deshalb immer beides dazu — der Zustand
in einem Datenpunkt *und* eine Fortsetzung beim Adapterstart.

### Die Antworten und was sie bedeuten

| Antwort | Bedeutung | Behandlung |
|---|---|---|
| 200 + Felder | Treffer | wird gespeichert |
| 101, 404, 500 | „gibt es nicht" | Adresse ist erledigt — **nur am wachen Gerät!** |
| **503** | „gerade beschäftigt" | **warten und erneut fragen** |
| socket hang up, Timeout | Modul kommt nicht mit | nach 5 in Folge abbrechen |

Der Unterschied zwischen den letzten beiden entscheidet, ob der Scan je fertig wird. Ein 503
ist eine höfliche Absage: Das Modul hat gehört und bittet um Geduld. Darauf gehört Warten
(2 s → 4 → 8 → 16 → 32, gedeckelt bei 60 s), kein Rückzug. Ein abgebrochener Socket dagegen
heißt, dass das Modul **nicht konnte** — genau so kündigte sich am 04.09.2026 ein Ausfall an,
bei dem die Waschmaschine ihre Verbindung lokal *und* zur Cloud verlor und von selbst nicht
zurückkam.

**Eine Absage ist nur dann eine Absage, wenn das Gerät sie ausgesprochen hat.** Wer 503 als
Ergebnis ablegt, hakt Adressen ab, die nie gefragt wurden. Am 04.09. geschah genau das: Von 239
unbeantworteten Adressen kamen 132 mit 503 zurück, und zwei Leafs, die vorher Daten geliefert
hatten (2/122, 2/123), standen danach als erledigt im Ergebnis.

---

## 3. Was die gefundenen Leafs bedeuten: der Werteverlauf

Ein Leaf mit siebenundvierzig Feldern ist eine Wand aus Zahlen. Erst der Verlauf zeigt, welche
davon sich mit dem Gerät bewegen — und nur solche Felder können eine Messung tragen.

Die Aufzeichnung läuft von selbst: Alle drei Minuten werden die gefundenen Leafs erneut
gelesen, **aber nur bei Geräten, die gerade arbeiten**. Ein Gerät im Standby liefert dieselben
Zahlen wie vor einer Stunde.

- `sammlung.leafVerlaufJson` — je Leaf und Feld eine Reihe von Wertwechseln mit Zeitstempel
- `sammlung.leafVerlaufStand` — Umfang der Ablage

### Wenn die drei Minuten nicht reichen

Für Felder, die sich mit dem Programm bewegen, ist die Abtastung fein genug. Für **schaltende
Verbraucher** ist sie es nicht: Das Heizelement der WCR860 taktet im Minutenrhythmus zwischen
2200 W und Standby (am 06.09.2026 an der Messsteckdose belegt, 86 Sprünge über 800 W). Jede
Drei-Minuten-Messung fällt in einen zufälligen Takt — ein vorhandenes Schaltbit ist so
grundsätzlich nicht von Rauschen zu unterscheiden. Genau das war das Ergebnis: Über 24
aufgezeichnete Wahrheitswerte lag die beste Trennschärfe bei 7,6 % gegen 0,6 %, also Zufall.

Dafür gibt es `sammlung.leafVerlaufFein`: die Leaf-Adresse eintragen, und **dieses eine Leaf**
wird alle zwanzig Sekunden gelesen, während die normale Runde für das Gerät aussetzt. Die Last
bleibt dieselbe — ein Leaf alle 20 s statt zehn alle 3 min —, die Auflösung wird neunfach
feiner. Sie endet von selbst mit dem Programm.

**Damit fiel die Zuordnung sofort.** Zwanzig Minuten auf 2/6192 genügten:

| Feld 1 in 2/6192 | Leistung an der Steckdose |
|---|---|
| `[8, true, 0]` | 2102 – 2230 W (6 Messungen) |
| `[8, false, 0]` | 7 – 80 W (7 Messungen) |

Zwei Kilowatt Abstand zwischen den Gruppen, keine Überlappung: **Feld 1 ist das Heizelement.**
Alle elf Felder des Leafs haben dieselbe Form `[8, bool, 0]` — 2/6192 ist die
**Schaltzustandstabelle der Aktoren**. Feld 3 schaltet in einer späteren Phase mit deutlich
kleineren Lasten (Mittel 220 W gegen 48 W) und dürfte Pumpe oder Ventil sein.

Die Lehre ist allgemein: **Wer ein Schaltbit sucht, muss schneller abtasten als das Bauteil
schaltet.** Kein Ergebnis bei grober Abtastung ist kein Beleg für ein fehlendes Signal.

**Nur Wechsel werden gespeichert.** Ein Feld, das eine Woche lang `7` zeigt, belegt einen
Eintrag statt dreitausend. Das ist zugleich die interessante Information: Eine Zahl, die
stillsteht, ist Konfiguration und keine Messung.

**Der Gerätezustand wird mitgeschrieben** (Zweig `_zustand`): Programm, Phase, Status,
Solltemperatur, Drehzahl. Ohne ihn ist keine Zahlenreihe zu deuten — „608, 368, −378, −598"
wird erst zur Aussage, wenn danebensteht, ob die Maschine wusch, spülte oder schleuderte.

### Die Falle beim Auslesen

`dop2.parseLeaf` liefert je Feld ein Paar aus Typ und Wert. Bei Listen ist der Wert **selbst
wieder** eine Liste solcher Paare. Wer nur die oberste Schicht abstreift, speichert
`[{'type':'u8','value':3}, …]` statt `[3, …]` — und keine Auswertung kann damit etwas anfangen.
`MieleLocal.reinerWert()` löst das rekursiv auf; Tests dazu in `test/leafwerte.js`.

---

## 4. Deuten: von der Zahlenreihe zur Bedeutung

Die Reihenfolge, in der sich Fragen beantworten lassen:

**a) Welche Felder bewegen sich überhaupt?** `leafverlauf.bewegt(von, bis)` über die Dauer
eines Programms. Alles Unbewegte scheidet aus.

**b) Passt der Verlauf zu einer bekannten Größe?** Die stärksten Belege kommen aus Werten, die
das Gerät selbst nennt:

- **Solltemperatur** (`state.targetTemperature`) — ein Feld, das darauf zuläuft und dort
  stehenbleibt, ist die Isttemperatur. So wurde Feld 9 in 2/6193 belegt: 23 → 29 → 35 → 41 →
  44 → 50 → 55 → **60** bei Sollwert 60, dann Halten, dann Abfall beim Spülen.
- **Programmphase** — ein Feld, das genau beim Wechsel auf „Schleudern" springt, hat mit der
  Trommel zu tun.
- **Cloud-Werte** — solange die Cloud angebunden ist, ist sie die Gegenprobe. So wurde der
  Wasserverbrauch belegt (Feld 21 in 2/6195, geteilt durch 199,4, auf 0,5 % genau).
- **Messsteckdose** — für den Stromverbrauch die einzige verlässliche Quelle.

**c) Was ist eine Ableitung, keine Messung?** `lib/feldsuche.js` prüft, ob zwei Felder in
festem Verhältnis stehen. Feld 25 in 2/6195 sah lange nach der Energie aus — bis sich zeigte,
dass es Feld 26 × 1,7822 ist, also eine Umrechnung ohne eigenen Messwert.

**d) Vorzeichen und Sprünge lesen.** Negative Werte schließen manche Deutungen aus (ein
Füllstand wird nicht negativ), legen andere nahe (Drehrichtung, Regelabweichung). Ein Feld, das
von 1200 auf 9 einbricht, während die Phase auf „Knitterschutz" wechselt, hat mit der
Trommeldrehzahl zu tun.

### Was sich nicht finden ließ

**Die Energie steht in keinem Feld von 2/6195.** Geprüft wurden alle 47 Felder in vier
Ableitungen (Endwert, Differenz, Maximum, Spanne) gegen elf Vergleichswerte; das beste Feld lag
25 % daneben. Der Grund ist grundsätzlich: `eco.energyWh` ist die **Erwartung** des Geräts für
das Programm, gesetzt beim Start — keine Messung. Am 03.09.2026 belegt: Der Wert stand 2:40
Stunden unverändert auf 770 Wh, während der Shelly von 0 auf 847 Wh stieg; über den ganzen Lauf
maß der Shelly 1158 Wh.

Ein zweites Argument, das hier lange stand, ist **falsch und zurückgenommen**: Eine Regression
über Wassermenge × Temperaturhub ergab 0,000486 kWh/(L·K), also 42 % der Wärmekapazität von
Wasser — was unmöglich schien. Der Fehler liegt in der Wassermenge: Die genannten Liter sind
der **Gesamtverbrauch über alle Wasch- und Spülgänge**, geheizt wird nur die Hauptwäsche.
Dieselbe Rechnung auf den Katalogwert der Anleitung angewandt (Baumwolle 60 °C: 1,45 kWh bei
65 l und 55 °C Wäschetemperatur) ergibt 48 % — für einen Wert aus dem EU-Prüfprogramm. Wo eine
Plausibilitätsrechnung auch die geprüfte Referenz verwirft, ist die Rechnung widerlegt, nicht
die Referenz.

Der Messbeleg oben trägt allein. **Der Vergleich mit der Anleitung ist die naheliegende
Gegenprobe** und steht in `docs/`-Nachbarschaft noch aus: Die Verbrauchsdatentabelle nennt je
Programm Energie und Wasser bei Nennbeladung, und die Anleitung sagt selbst, dass die im
Feedback angezeigten Werte davon abweichen können. Zusatzoptionen wirken laut Anleitung
gerichtet auf die Energie — *Quick*, *Intensiv* und *AllergoWash* erhöhen sie, *Extra schonend*
senkt sie —, ohne dass die Tabelle den Betrag beziffert.

---

## 5. Was ein neues Gerät braucht

Wenn der Scan Treffer liefert und der Verlauf zeigt, welche Felder tragen:

1. **Objekte anlegen** — `lib/objects.js`, dort steht die Beschreibung aller Datenpunkte an
   einer Stelle. Nie an zwei Stellen definieren: Zwei Definitionen liefen im September 2026
   auseinander, und jedes laufende Programm setzte die Umbenennung zurück.
2. **Abfrage einhängen** — als eigener Timer mit eigenem Intervall, nach dem Muster von
   `pollEco`/`pollHours`. Mit Rücksicht auf die eine Verbindung.
3. **Absagen zählen** — nicht jedes Modell hat jedes Leaf. Nach mehreren echten Absagen (nicht
   503!) die Abfrage einstellen und die Objekte entfernen, statt ewig weiterzufragen.
4. **Prüfroutine anlegen** — `lib/kontrolle.js` vergleicht laufend gegen eine zweite Quelle und
   meldet, wenn die Zuordnung nicht mehr trägt.

---

## Werkzeuge im Überblick

| Datei | Wofür |
|---|---|
| `lib/leafscan.js` | Adressbereiche, Fortschritt, Absage gegen Störung |
| `lib/leafverlauf.js` | Werteverlauf, Zustandsaufzeichnung, `bewegt()` |
| `lib/feldsuche.js` | Feld gegen Vergleichswerte prüfen, feste Verhältnisse erkennen |
| `lib/kontrolle.js` | laufende Gegenprobe einer eingestellten Zuordnung |
| `lib/objects.js` | Beschreibung aller Datenpunkte |

Die Ablagen unter `<gerät>.sammlung` sind Werkzeuge, keine Dauereinrichtung: Sie lassen sich
wegwerfen, sobald klar ist, welche Felder taugen.