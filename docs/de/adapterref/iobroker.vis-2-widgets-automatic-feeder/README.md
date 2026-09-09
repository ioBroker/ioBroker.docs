---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-automatic-feeder/README.md
title: ioBroker.vis-2-widgets-automatic-feeder
hash: +Btx3P1HNcjKwoHyiHb5kQoYNEK7qDwX5BjiDP4CGLA=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/admin/vis-2-widgets-automatic-feeder.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-automatic-feeder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-automatic-feeder.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vis-2-widgets-automatic-feeder-installed.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.vis-2-widgets-automatic-feeder.svg)

# ioBroker.vis-2-widgets-automatic-feeder

---

<p align="center">
  <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy me a coffee" /></a>
</p>

---

## vis-2 Widgets für den automatischen Zuführer

Fertigprodukte **vis-2 Dashboard-Widgets** für die
[ioBroker.automatic-feeder](https://github.com/ssbingo/ioBroker.automatic-feeder) Adapter – Karten zum Ziehen und Ablegen für einen Fisch-/Koi-/Teichfutterautomaten. Es gibt **Keine Objekt-IDs zum Nachschlagen und kein HTML-Code zum Schreiben**Sie wählen Ihre Zufuhrinstanz und Ihren Zufuhrschalter aus. **bei seinem freundlichen Namen** aus einem Dropdown-Menü, und jedes Widget liest und steuert die richtigen Datenpunkte selbstständig.

Dieses Paket wird versendet **sechs Widgets** Zusammen bilden sie ein vollständiges Feeder-Dashboard in einem dunklen, tabletfreundlichen Kartendesign mit einer Akzentfarbe, die Sie ändern können. Nur vier Widgets. _Anzeige_ Daten; zwei lassen Sie auch _Akt_ (eine einmalige Fütterung auslösen oder die Fütterung unterbrechen).

> Dies ist nur das **Visualisierungsebene**Die gesamte Zeitplanung, das Temperaturmodell, die Sonnenaufgangs-/Sonnenuntergangslogik, Pausen und Benachrichtigungen befinden sich in der separaten **ioBroker.automatic-feeder** Adapter; diese Widgets bieten eine Live-Ansicht und Fernsteuerung für diesen Adapter. (In der größeren Smart-Pond-Familie das Schwesterprodukt) _Teichbelüftung_ Der Adapter kann beispielsweise die Belüftung unterbrechen, während der Dosierer arbeitet – das wird aber dort konfiguriert, nicht hier.

Dieses Dokument ist ein vollständiges Handbuch. Falls Sie diese Widgets noch nie verwendet haben, lesen Sie es bitte von oben bis unten durch:
**Schnellstart** Sie erhalten in etwa einer Minute eine funktionierende Karte, und der Rest erklärt jedes Widget und jede Option im Detail.

> 🇩🇪 Deutsche Anleitung: [doc/de/README.md](doc/de/README.md) • andere Sprachen: siehe
> [Dokumentation](#documentation) ganz unten.

---

## Inhaltsverzeichnis

1. [Was sind Vis-2-Widgets?](#1-what-are-vis-2-widgets)
2. [Was Sie erhalten](#2-what-you-get)
3. [Anforderungen](#3-requirements)
4. [Installation](#4-installation)
5. [Schnellstart](#5-quick-start)
6. [Die Widgets im Detail](#6-the-widgets-in-detail)
   - [6.1 FeederStatus](#61-feederstatus)
   - [6.2 Zuführungskontrolle](#62-feedcontrol)
   - [6.3 Umwelt](#63-environment)
   - [6.4 Dynamische Fütterung](#64-dynamicfeeding)
   - [6.5 Saisonbanner](#65-seasonbanner)
   - [6.6 Animierter Feeder](#66-animatedfeeder)
   - [6.7 Futtermenge](#67-feedingamount)
   - [6.8 Einstellungen für die Fütterungsmenge](#68-feedingamountsettings)
7. [Konfiguration & Bindungen](#7-configuration--bindings)
8. [Welche Datenpunkte jedes Widget verwendet](#8-which-data-points-each-widget-uses)
9. [Entwicklung](#9-development)
10. [Fehlerbehebung & Häufig gestellte Fragen](#10-troubleshooting--faq)

---

## 1. Was sind Vis-2-Widgets?

**vis-2** ist das moderne Visualisierungstool von ioBroker (der Nachfolger des klassischen ioBroker). _vis &#x31;_&#x53;ie erstellen Dashboards („Ansichten“) durch Ziehen **Widgets** — Schaltflächen, Anzeigen, Karten — auf einer Arbeitsfläche und deren Verbindung mit den Gerätezuständen.

Normalerweise verbindet man ein Widget manuell mit einem Zustand: Man sucht eine Objekt-ID (etwa so etwas wie
`automatic-feeder.0.switches.sw-0.status.feedingActive`) und geben Sie es in ein Bindungsfeld ein. Das ist für einen einzelnen Wert in Ordnung, aber eine gute Zuführungskarte benötigt ein Dutzend davon, die zusammenarbeiten.

A **Widget-Set** So löst dieses Produkt das Problem: Es handelt sich um ein Add-on, das mitgeliefert wird. **speziell entwickelte Widgets** Für einen Adapter. Jedes Widget weiß bereits, welche Zustände es benötigt. Sie teilen es ihm nur mit. **welcher Futterautomat** Um es Ihnen zu zeigen – alles andere ist bereits für Sie verkabelt. Anstatt also ein Dutzend manuelle Bindungen vorzunehmen, müssen Sie Folgendes tun: **zwei Klicks** (Instanz + Schalter) und erhalte eine fertige Karte.

---

## 2. Was Sie erhalten

Sechs Widgets. Jedes ist eine in sich abgeschlossene Karte; Sie können nur eines verwenden oder sie zu einem vollständigen Dashboard kombinieren.

| Widget                   | Was es zeigt / tut                                                                                                                                                                                                                                                                                                                                              | Schreibt? |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **FeederStatus**         | Die Hauptstatuskarte: eine animierte Grafik des Fördersystems (der Lüfter dreht sich während des Förderns), ein Live-Countdown, der Countdown bis zum Ende **nächste** Fütterung mit Zeit und Modus, die **zuletzt** Nahrungsaufnahme und deren Folge, das astronomische Fenster (Sonnenaufgang/Sonnenuntergang) und – wenn es blockiert ist – der Grund dafür. | NEIN      |
| **FeedControl**          | A **Jetzt füttern** Schaltfläche mit zweistufiger Bestätigung, ein Schieberegler für die Dauer und ein Master-Button **Fütterung aussetzen** schalten.                                                                                                                                                                                                          | Ja        |
| **Umfeld**               | Wassertemperatur (flach und tief), die thermische Schichtung Δ, ein Sauerstoffwert (nur wenn ein Sensor vorhanden ist) und ein Tagesbalken von Sonnenaufgang bis Sonnenuntergang mit einer Live-Anzeige „Jetzt“.                                                                                                                                                | NEIN      |
| **Dynamische Fütterung** | Der Adapter **Q10** Temperaturmodell auf einen Blick: Durchschnittstemperatur, Änderungsfaktor, Intervall und Anteil sowie der zugehörige Sensor (Wasser/Luft).                                                                                                                                                                                                 | NEIN      |
| **Saisonbanner**         | Eine einzelne, farbcodierte Statuszeile, die den aktuell wichtigsten Zustand anzeigt (manuelle Pause → zeitbasierte Pause → Winterpause → automatische Aktivierung).                                                                                                                                                                                            | NEIN      |
| **Animierter Feeder**    | Ein großer animierter Futterautomat auf einer Leinwand: Während des Fütterns fallen Futterpellets herunter und ein Countdown-Ring füllt sich; ansonsten werden Pausensymbole (manuell / Zeit / Winter) angezeigt. **Tippen Sie darauf, um eine einmalige Fütterung auszulösen.**                                                                                | Ja        |

Die beiden "Schreib"-Widgets (**FeedControl**, **Animierter Feeder**) schreibe ich nur dann, wenn _Du_ Klicken/Tippen – es ändert sich nichts von selbst.

In der Widget-Palette vis-2 erscheint das gesamte Set unter dem Gruppennamen **Automatischer Zuführer**.

---

## 3. Anforderungen

- **ioBroker** mit **vis-2** installiert (das moderne Vis). Dies sind Vis-2-Widgets und tun Folgendes: **nicht** Arbeiten in klassischer Vis 1.
- Der **ioBroker.automatic-feeder** Adapter, installiert und konfiguriert mit **mindestens ein Schalter** (Ein „Switch“ ist eine Zuleitung in der Konfiguration des Adapters; er hat einen aussagekräftigen Namen wie z. B. _KoiTeich Ponto&#x6E;_&#x45;mpfohlene Adapterversionen:
  - **Version 1.4.0 oder neuer** — erforderlich für die numerischen Zeitstempel `blockReasonCode` und die `feedFor` Die Befehle, auf die die Widgets angewiesen sind.
  - **Version 1.5.0 oder neuer** — empfohlen, ermöglicht zusätzlich das Live-Erlebnis **Countdown zur Laufzeit** in FeederStatus (der `status.feedingEndsTs` Datenpunkt).
  - **Version 1.6.0 oder neuer** — empfohlen für den genauen Countdown-Klingelschlag **Animierter Feeder** (Die
    `status.feedingDurationSec` Datenpunkt).

Sie müssen niemals eine Objekt-ID manuell eingeben: Die Widgets lesen und schreiben nur die ID des ausgewählten Schalters. `status.*` Und
`settings.*` Datenpunkte, ermittelt aus der von Ihnen gewählten Instanz und dem gewählten Schalter.

---

## 4. Installation

1. Installieren **ioBroker.vis-2-widgets-automatic-feeder** in ioBroker – vom Administrator **Adapter** Die Liste wird angezeigt, sobald die Datei im Repository oder direkt von GitHub/npm verfügbar ist. Die Installation erfolgt als _Visualisierungs-Widgets_ Adapter (`onlyWWW`(Es wird keine laufende Instanz erstellt).
2. Offen **vis-2**Eine neue Widget-Gruppe **Automatischer Zuführer** erscheint in der Widget-Palette (linke Seite, im Bearbeitungsmodus).
3. Ziehen Sie ein beliebiges Widget davon in eine Ansicht – siehe [Schnellstart](#5-quick-start) unten.

> **Nach jedem Update:** laufen `iobroker upload vis-2-widgets-automatic-feeder`Starten Sie anschließend vis-2 neu (die Installation des Adapters veranlasst vis-2 bereits zu einem Neustart) und führen Sie einen vollständigen Seitenneuladen (Strg+F5) im Browser durch, damit der Runner das neue Widget-Bundle erkennt. Siehe [Fehlerbehebung](#10-troubleshooting--faq).

---

## 5. Schnellstart

1. In vis-2 wechseln Sie zu **Bearbeitungsmodus**Öffnen Sie eine Ansicht und ziehen Sie die **FeederStatus** Widget vom **Automatischer Zuführer**
   Gruppe darauf.
2. Öffnen Sie bei ausgewähltem Widget die **Attribute** Öffnen Sie das Bedienfeld auf der rechten Seite und füllen Sie die beiden Felder im **gemeinsam**
   Gruppe:
   - **Zuführungsinstanz** — wählen Sie Ihre `automatic-feeder` Instanz (üblicherweise `0`(Dies ist eine Standard-Instanzauswahl.)
   - **Schalten** — Wählen Sie Ihren Feeder aus dem Dropdown-Menü aus. Dort werden Ihre konfigurierten Schalter aufgelistet. **mit ihrem freundlichen Namen**
     (z.B _KoiTeich Ponton_), direkt aus der Konfiguration des Adapters ausgelesen.
3. Die Karte zeigt sofort Live-Daten an. Wiederholen Sie dies für jedes andere Widget – die Instanz-/Schalterauswahl funktioniert für alle sechs Widgets genau gleich.

Das ist alles: keine Objekt-IDs, keine manuellen Bindungen, keine Skripte. Solange nicht beide Felder ausgefüllt sind, zeigt ein Widget eine benutzerfreundliche Ansicht an.
_„Wählen Sie den Zuleitungsschalterkanal in den Widget-Einstellungen aus.“_ Hinweis statt Daten.

---

## 6. Die Widgets im Detail

Alle Widgets benötigen dieselben zwei Einstellungen — **Zuführungsinstanz** Und **Schalten** - im **gemeinsam** Attributgruppe (siehe [Konfiguration & Bindungen](#7-configuration--bindings)Die Darstellungsoptionen der einzelnen Widgets sind unten bei jedem Widget aufgeführt. Alle Screenshots zeigen Live-Daten von einem echten Koiteich-Futterautomaten.

### 6.1 FeederStatus

![FeederStatus-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/feederstatus.png)

Die Hauptkarte. Von oben nach unten zeigt sie:

- A **Statuspille**: **Bereit** (grün) oder **blockiert** (gelb). „Blockiert“ bedeutet, dass der Adapter derzeit keine Zufuhr erhält (Nacht, Temperatur zu niedrig, Sauerstoffgehalt zu niedrig, eine Pause …).
- Ein **animierte Futtergrafik**Während der Zufuhr läuft, dreht sich der Lüfter und – mit Adapter v1.5.0+ – ein **Countdown zur Laufzeit** (z.B `5 s`) erscheint daneben und zählt bis zum Ende der aktuellen Fütterung herunter.
- Der **nächste Fütterung**: ein großer Countdown (_in ca. 27 Minuten_, oder `1 h 05 min` nach einer Stunde), die genaue Uhrzeit und den Modus (_dynamisches Intervall_ wenn die dynamische Fütterung eingeschaltet ist, andernfalls _Zeitplan_).
- Der **letzte Fütterung** mit einem ✓ (Erfolg, grün) oder ✗ (Fehler, rot) Symbol und dem Adapter **Ergebnis** Text.
- Der **Astrofenster** (Sonnenaufgang – Sonnenuntergang) wird für die Tag/Nacht-Logik verwendet.
- Wenn blockiert, ein zusätzliches **Grund** Zeile mit der für Menschen lesbaren Blockierungsbegründung (in Gelb).

Die Karte wird einmal pro Sekunde neu gerendert, damit die Countdowns aktiv bleiben.

**Erscheinungsbildoptionen** (Gruppe _Aussehen_):

| Option                     | Typ                        | Standard  | Bedeutung                                                                              |
| -------------------------- | -------------------------- | --------- | -------------------------------------------------------------------------------------- |
| **Akzentfarbe**            | Farbe                      | `#33c1cf` | Hervorhebungsfarbe der Karte und der Grafik.                                           |
| **Laufzeittimerposition**  | Auswählen (Rechts / Links) | Rechts    | Zeigen Sie den laufenden Fütterungs-Countdown links oder rechts neben der Grafik an.   |
| **Animierte Futtergrafik** | Kontrollkästchen           | An        | Drehanimation des Ventilators ein-/ausschalten.                                        |
| **Kein Kartenhintergrund** | Kontrollkästchen           | aus       | Rendern Sie ohne den Kartenhintergrund (um ihn auf Ihrem eigenen Panel zu platzieren). |

Standard-Widgetgröße: 320 × 340 px.

### 6.2 Zuführungskontrolle

![FeedControl-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/feedcontrol.png)

Die Kontrollkarte:

- **Jetzt füttern** - A **zweistufig** Schaltfläche. Der erste Klick _Waffen_ es und die Etikettenänderungen zu _Bestätigen: N s ?_&#x44;er zweite Klick löst genau Folgendes aus **eins** Fütterung der gewählten Dauer und zeigt kurz _Ausgelöst ✓_&#x57;enn Sie nicht innerhalb von ca. 4 Sekunden bestätigen, deaktiviert es sich selbst.
- **Teil (manuell)** — ein Schieberegler, der die Fütterungsdauer in Sekunden einstellt, von `1` bis zu _Maximale Dauer_ (Standardmäßig beginnt es bei 5 Sekunden).
- **Fütterung aussetzen** — ein Hauptschalter, der sofort den Betrieb unterbricht **alle** Die Stromversorgung für diesen Schalter wird so lange gespeichert, bis er wieder ausgeschaltet wird. Er speichert die Daten des Adapters. `settings.pauseNow`, wodurch jeder Modus und jede zeitbasierte Pause außer Kraft gesetzt wird.

**Erscheinungsbildoptionen** (Gruppe _Aussehen_):

| Option                     | Typ              | Standard  | Bedeutung                                                  |
| -------------------------- | ---------------- | --------- | ---------------------------------------------------------- |
| **Akzentfarbe**            | Farbe            | `#33c1cf` | Hervorhebungsfarbe.                                        |
| **Maximale Dauer (s)**     | Nummer (1–3600)  | 30        | Oberes Ende des Portionsschiebers.                         |
| **Pauseschalter anzeigen** | Kontrollkästchen | An        | Master anzeigen/ausblenden _Fütterung aussetzen_ schalten. |
| **Kein Kartenhintergrund** | Kontrollkästchen | aus       | Rendern Sie ohne Kartenhintergrund.                        |

Standard-Widgetgröße: 300 × 240 px.

> Der Knopf schreibt eine **einmalige** Zuführung über den Adapter `feedFor` Befehl (Wert = Dauer in Sekunden). Es funktioniert.
> **nicht** Ändern Sie Ihren Zeitplan und tun Sie **nicht** Starten Sie den Adapter neu.

### 6.3 Umwelt

![Umgebungs-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/environment.png)

Die Wasser-/Umweltkarte:

- **Wasser flach** Und **Wasser tief** Temperaturen (in °C, gerundet auf 0,1). Die tiefe Fliese bleibt bei `–` falls Sie keinen zweiten, tiefer liegenden Sensor konfiguriert haben.
- A **Schichtung** Die Pille zeigt die Differenz Δ zwischen den beiden Schichten (in K) an. Sie färbt sich bernsteinfarben, wenn sich die Schichten um mehr als 1 K unterscheiden. **3 K**.
- Ein **O₂** Tablette in mg/l — angezeigt **nur** wenn ein Sauerstoffsensor konfiguriert ist, und rot leuchtet, wenn der Wert unter den konfigurierten Mindestwert fällt (`settings.o2Min`).
- A **Tagesbar** von Sonnenaufgang (☀) bis Sonnenuntergang (☾) mit einer Live-Anzeige der aktuellen Uhrzeit (wird jede Minute neu berechnet).

**Erscheinungsbildoptionen** (Gruppe _Aussehen_):

| Option                     | Typ              | Standard  | Bedeutung                           |
| -------------------------- | ---------------- | --------- | ----------------------------------- |
| **Akzentfarbe**            | Farbe            | `#33c1cf` | Hervorhebungsfarbe.                 |
| **Kein Kartenhintergrund** | Kontrollkästchen | aus       | Rendern Sie ohne Kartenhintergrund. |

Standard-Widgetgröße: 320 × 220 px.

### 6.4 Dynamische Fütterung

![DynamicFeeding-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/dynamicfeeding.png)

Zeigt die **Q10-Temperaturmodell** Der Adapter dient dazu, die Zufuhr an die Wassertemperatur anzupassen. Vier Fliesen:

- **Durchschnittstemperatur** — die Durchschnittstemperatur, auf der das Modell basiert (°C).
- **Rate (Q10)** — der resultierende Geschwindigkeitsfaktor (× relativ zur Referenztemperatur).
- **Intervall** — das sich daraus ergebende Fütterungsintervall in Minuten.
- **Portion** — die sich daraus ergebende Fütterungsdauer in Sekunden.

A **Quelle** Die Pille in der Kopfzeile zeigt an, ob das Modell von folgendem gesteuert wird: **Wasser (flach)** oder die **Luft** Sensor (`settings.dynamicSource`Wenn die dynamische Zufuhr für diesen Schalter deaktiviert ist, zeigt die Karte den Hinweis an. _Die dynamische Zufuhr ist für diesen Schalter deaktiviert._ anstelle der Fliesen.

**Erscheinungsbildoptionen** (Gruppe _Aussehen_):

| Option                     | Typ              | Standard  | Bedeutung                                                |
| -------------------------- | ---------------- | --------- | -------------------------------------------------------- |
| **Akzentfarbe**            | Farbe            | `#33c1cf` | Hervorhebungsfarbe der Kachel „Durchschnittstemperatur“. |
| **Kein Kartenhintergrund** | Kontrollkästchen | aus       | Rendern Sie ohne Kartenhintergrund.                      |

Standard-Widgetgröße: 460 × 150 px.

### 6.5 Saisonbanner

![SeasonBanner-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/seasonbanner.png)

Eine einzelne, farbcodierte Statuszeile – ideal für den oberen Bereich einer Ansicht. Sie zeigt immer den Status an. **am wichtigsten** Aktueller Zustand, in dieser Prioritätsreihenfolge:

1. **Manuelle Pause** (rot) — der Hauptpausenschalter (`status.pauseManual`) ist eingeschaltet.
2. **Zeitbasierte Pause** (gelb) — ein konfiguriertes Pausenfenster ist aktiv (`status.pauseActive`), mit angehängter Endzeit (`status.pauseActiveUntil`).
3. **Winterpause** (blau) — das Winterfenster ist aktiv (`status.winterActive`).
4. **Automatische Aktivierung** (grün) — Es gibt keine Störungen bei der Fütterung, der Zeitplan läuft normal.

Dieses Widget hat **NEIN** Darstellungsoptionen jenseits der beiden Standardeinstellungen (Instanz + Schalter).

Standard-Widgetgröße: 460 × 44 px.

### 6.6 Animierter Feeder

![AnimatedFeeder-Widget während des Fütterns](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/animatedfeeder.png)

Ein großer, animierter Futterautomat, der auf einer HTML-Seite gerendert wird `<canvas>` — das visuelle Herzstück eines Teich-Dashboards. Es reagiert live auf den Schalter:

- **Während des Fütterns:** Futterpellets fallen aus dem Auslass und ein **Countdown-Ring** Die verbleibenden Sekunden füllen sich. Der Ring ist genau dann, wenn der Adapter dies ermöglicht. `status.feedingDurationSec` (**Version 1.6.0+**&#x42;ei älteren Adaptern wird die Gesamtdauer ab dem Zeitpunkt des Fütterungsbeginns berechnet.
- **Pausenzustände**, dargestellt als Symbol auf einer Scheibe mit einem roten Kreuz, mit der gleichen Priorität wie das Saisonbanner:
  **manuelle Pause** (Hand) → **zeitbasierte Pause** (Uhr) → **Winterpause** (Schneeflocke).
- **Leerlauf:** nur der Futterautomat, mit optionalem _"Zum Füttern tippen"_ Hinweis.

![Leerlauf- und Pausenzustände von AnimatedFeeder](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/animatedfeeder-states.png)

**Zum Füttern tippen:** Tippen Sie einmal auf das Widget, um es zu aktivieren (_Bestätigen: N s ?_&#x54;ippen Sie erneut, um eine einmalige Zufuhr der konfigurierten Dauer auszulösen (über `feedFor`Tippvorgänge werden ignoriert, solange eine Pause aktiv ist oder eine Fütterung bereits läuft, und die gesamte Funktion kann deaktiviert werden mit **Tipp-zum-Füllen aktivieren**(Die Animation des fallenden Pellets wird automatisch reduziert, wenn das Betriebssystem eine Verringerung der Bewegung anfordert.)

**Optionen** — Der AnimatedFeeder verfügt über drei Attributgruppen:

_Verhalten:_

| Option                         | Typ              | Standard | Bedeutung                                                        |
| ------------------------------ | ---------------- | -------- | ---------------------------------------------------------------- |
| **Tipp-zum-Füllen aktivieren** | Kontrollkästchen | An       | Durch Antippen des Widgets kann eine Fütterung ausgelöst werden. |
| **Fütterungsdauer (s)**        | Nummer (1–3600)  | 5        | Die Dauer wird durch die Tippaktion bestimmt.                    |
| **Animierte Futtergrafik**     | Kontrollkästchen | An       | Animation der fallenden Pellets ein-/ausschalten.                |

_Aussehen:_

| Option                     | Typ              | Standard      | Bedeutung                                                                                                                                                                  |
| -------------------------- | ---------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Akzentfarbe**            | Farbe            | `#33c1cf`     | Farbe des Countdown-Rings und des Hinweises.                                                                                                                               |
| **Bild (optional)**        | Bild             | _(eingebaut)_ | Benutzerdefiniertes Bild für den Bildeinzug; lassen Sie dieses Feld für die integrierte Grafik leer. Ein benutzerdefiniertes Bild kann ein anderes Seitenverhältnis haben. |
| **Kein Kartenhintergrund** | Kontrollkästchen | aus           | Rendern Sie ohne Kartenhintergrund.                                                                                                                                        |

_Geometrie_ — Positionen sind in **%** des Widgets, damit die Animation ausgerichtet werden kann, wenn Sie Ihr eigenes Bild verwenden:

| Option                  | Typ    | Standard | Reichweite |
| ----------------------- | ------ | -------- | ---------- |
| **Pelletauslass X (%)** | Nummer | 50       | 0–100      |
| **Pelletauslass Y (%)** | Nummer | 80       | 0–100      |
| **Countdown X (%)**     | Nummer | 50       | 0–100      |
| **Countdown Y (%)**     | Nummer | 44       | 0–100      |
| **Countdown-Größe (%)** | Nummer | 20       | 5–45       |

Standard-Widgetgröße: 300 × 440 px.

---

### 6.7 Futtermenge

Ein Kompaktmodell **Nur lesbar** Karte für das Zufuhrmengenmodell des Adapters (**automatischer Zuführer v1.16.0+**) eines Schalters. Es zeigt die empfohlene **Tagesration** in Gramm, die **Fütterungsprozentsatz** für die aktuelle Wassertemperatur und die geschätzte **Gesamtgewicht der Fische**Wenn der Adapter angeschlossen ist **Steuermodus** (Phase B) zeigt es zusätzlich die
**Portion pro Fütterung**, Die **Dauer pro Fütterung** und die **tägliche Laufzeit**, plus der Name des **aktives Fütterungsprofil**Die genauen Werte pro Fütterung stammen vom Adapter. `status.feedTargetPortionGrams` /
`status.feedingsPerDayToday`Ältere Adapter greifen auf eine Ableitung zurück.

Eine Pille in der Kopfzeile zeigt an, ob es sich um das Modell handelt. _Beratung_ (Phase A) oder _kontrolliert die Fütterung_ (Phase B). Bis **bearbeiten** Das Modell (Fischzahlen, Temperaturprozentsätze, Fütterungsprofil, Phasenumschaltungen, Tageshöchstmenge) wird separat verwendet.
**Einstellungen für die Fütterungsmenge** Widget unten.

_Aussehen:_ **Akzentfarbe** (Standard `#f2a63c`) Und **Kein Kartenhintergrund**Standard-Widgetgröße: 460 × 190 px.

---

### 6.8 Einstellungen für die Fütterungsmenge

Der **Editor** für das Modell mit einstellbarer Futtermenge – ein Bedienfeld mit Lichteinstellungen, das direkt auf die beschreibbare Speicherkarte des Adapters schreibt.
`switches.<id>.settings.*` Staaten (Bedürfnisse) **automatischer Zuführer v1.16.0+** für die Spiegeleinstellungen und **Version 1.17.0+** (für den Feed-Profil-Umschalter). Verwenden Sie es auf einem Dashboard neben dem schreibgeschützten Bereich. **Futtermenge** Karte.

Es bietet:

- A **Modell ein/aus** schalten (`amountModelEnabled`);
- A **Fischliste** mit einem Symbol pro Größe, dem festgelegten Referenzgewicht und einer bearbeitbaren Anzahl für jede Größenklasse (15/20/30/40/50/60 cm), mit einer Live-Funktion **Gesamtgewicht**;
- ein **Aktiv-Speise-Schalter** Erstellt aus den Feed-Profilen, die Sie für den Switch in der Adapterverwaltung definiert haben – ein Tippen wählt das aktive Profil aus (schreibt `settings.activeFeed`) und seine Abgaberate (g/s) bestimmt den Regelmodus;
- die sieben **Temperaturprozentsätze** (`<15°` … `>30°`);
- A **Steuerung Ein/Aus** Schalter (Phase B) und, wenn eingeschaltet, die optionale **Tagesmaximum** in Gramm.

Jedes Feld wird im Widget sofort aktualisiert und an den Adapter geschrieben, der die Aktualisierung anwendet und die Instanz neu startet (kurze Entprellzeit), damit das Modell neu berechnet wird. Das Panel folgt dem vis-2-Design. **Farbmodus** (dunkel/hell). Standard-Widget-Größe: 470 × 620 px.

---

## 7. Konfiguration & Bindungen

Jedes Widget hat die gleichen zwei erforderlichen Einstellungen in der **gemeinsam** Attributgruppe:

![Widget-Attribute: Instanz und Schalter nach Namen](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/config-attributes.png)

- **Zuführungsinstanz** — wählen Sie Ihre `automatic-feeder` Instanz aus dem Dropdown-Menü (normalerweise `0`Akzeptiert entweder die einfache Zahl (`0`) oder die vollständige Form (`automatic-feeder.0`).
- **Schalten** — Wählen Sie den Feeder aus einer Dropdown-Liste aus, die Ihre konfigurierten Schalter auflistet. **mit ihrem freundlichen Namen** (z.B
  _KoiTeich Ponto&#x6E;_&#x6E;icht anhand einer internen ID. Die Liste wird aus der Konfiguration der ausgewählten Instanz gelesen (`system.adapter.automatic-feeder.<instance>` → `native.switches[]`).

Aus diesen beiden Werten erstellt das Widget den Schaltkanal.
`automatic-feeder.<instance>.switches.<switch>` und abonniert die benötigten zugehörigen Unterzustände – Sie müssen die Bindung nie selbst eingeben. Solange nicht beide Felder festgelegt sind, zeigt ein Widget einen _"Wählen Sie den Zuleitungsschalterkanal aus…"_ Hinweis statt Daten.

Die optionalen Darstellungseinstellungen befinden sich in den jeweiligen Widget-Einstellungen. **Aussehen** Gruppe (und für AnimatedFeeder in) **Verhalten**
Und **Geometrie**Siehe die einzelnen Widgets oben. Gemeinsame Optionen für alle Widgets:

| Option                     | Widgets                 | Bedeutung                                                                                                        |
| -------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Akzentfarbe**            | alle außer SeasonBanner | Die Hervorhebungsfarbe (Standard: Teich-Aquamarin) `#33c1cf`).                                                   |
| **Kein Kartenhintergrund** | alle außer SeasonBanner | Das Widget ohne seinen Kartenhintergrund rendern, z. B. um es auf einem benutzerdefinierten Panel zu platzieren. |

---

## 8. Welche Datenpunkte verwendet jedes Widget?

Zur vollständigen Transparenz: Die Widgets abonnieren den Schaltkanal.
`automatic-feeder.<instance>.switches.<switch>.…` und verwenden Sie nur diese relativen Datenpunkte:

| Widget                                    | Liest                                                                                                                                                                                                                                                                                    | Schreibt                                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **FeederStatus**                          | `status.feedingActive`, `status.feedingEndsTs`, `status.nextFeeding`, `status.nextFeedingTs`, `status.lastFeeding`, `status.lastResult`, `status.blocked`, `status.blockReasonCode`, `status.blockReason`, `status.error`, `status.sunrise`, `status.sunset`, `settings.dynamicEnabled`  | —                                                                                        |
| **FeedControl**                           | `status.pauseManual`, `status.feedingActive`                                                                                                                                                                                                                                             | `feedFor` (einmalige Fütterung, Wert = Sekunden), `settings.pauseNow` (Suspend-Schalter) |
| **Umfeld**                                | `status.waterTemperature`, `status.waterTemperatureDeep`, `status.waterStratification`, `status.oxygen`, `status.sunrise`, `status.sunset`, `status.sunriseTs`, `status.sunsetTs`, `settings.o2Min`                                                                                      | —                                                                                        |
| **Dynamische Fütterung**                  | `settings.dynamicEnabled`, `settings.dynamicSource`, `status.dynamicAvgTemperature`, `status.dynamicRate`, `status.dynamicIntervalMin`, `status.dynamicDurationSec`                                                                                                                      | —                                                                                        |
| **Saisonbanner**                          | `status.winterActive`, `status.pauseActive`, `status.pauseActiveUntil`, `status.pauseManual`, `settings.winterWindow`                                                                                                                                                                    | —                                                                                        |
| **Animierter Feeder**                     | `status.feedingActive`, `status.feedingEndsTs`, `status.feedingDurationSec`, `status.winterActive`, `status.pauseManual`, `status.pauseActive`                                                                                                                                           | `feedFor` (Tippen zum Zuführen, Wert = Sekunden)                                         |
| **Futtermenge**                           | `status.fishTotalWeight`, `status.feedPercentToday`, `status.feedTargetGramsToday`, `status.feedingsPerDayToday`, `status.feedTargetPortionGrams`, `status.feedTargetSecondsToday`, `status.feedEffectiveDurationSec`, `status.activeFeedName`                                           | —                                                                                        |
| **Einstellungen für die Fütterungsmenge** | `settings.amountModelEnabled`, `settings.amountControlEnabled`, `settings.feedDailyMaxGrams`, `settings.activeFeed`, `settings.fishCount15…60`, `settings.feedPctBelow15`/`feedPct15…30`; liest Feedprofile von `system.adapter.automatic-feeder.<n>` → `native.switches[].feedProfiles` | das gleiche `settings.*` Es heißt darin:                                                 |

Siehe die [ioBroker.automatic-feeder-Dokumentation](https://github.com/ssbingo/ioBroker.automatic-feeder) für die genaue Bedeutung jedes einzelnen Datenpunkts.

---

## 9. Entwicklung

Die Widgets sind geschrieben in **TypeScript + React 18** (mit MUI für die Attributeditoren) und im Paket enthalten **Vite**
Und **Modulföderation** in einen einzigen `customWidgets.js` vis-2 wird zur Laufzeit geladen. Der Quellcode befindet sich in
[`src-widgets-ts/src/`](src-widgets-ts/src/):

| Datei                                                                                                                    | Widget / Rolle                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FeederWidgetBase.tsx`                                                                                                   | Gemeinsame Basisklasse, die von **vier** Die Widgets (Umgebung, Dynamische Fütterung, Saisonbanner, Animierter Futterautomat) lösen den Schaltkanal auf, abonnieren die Unterzustände, speichern Werte im Zustand und bieten Hilfsfunktionen zum Lesen, Schreiben und Formatieren. FeederStatus und FeedControl erweitern diese Funktion. `window.visRxWidget` direkt und führen ihre eigene Subscribe/Seed-Kampagne durch. |
| `common.tsx`                                                                                                             | Das gemeinsame _gemeinsam_ Attributgruppe (Instanzauswahl + Dropdown-Menü „Nach Namen wechseln“) und die `channelOf()` Helfer.                                                                                                                                                                                                                                                                                              |
| `FeederStatus.tsx`, `FeedControl.tsx`, `Environment.tsx`, `DynamicFeeding.tsx`, `SeasonBanner.tsx`, `AnimatedFeeder.tsx` | Die sechs Widgets.                                                                                                                                                                                                                                                                                                                                                                                                          |
| `styles.ts`                                                                                                              | Das eingefügte CSS für das Kartendesign.                                                                                                                                                                                                                                                                                                                                                                                    |
| `translations.ts` + `i18n/*.json`                                                                                        | UI-Texte in 11 Sprachen.                                                                                                                                                                                                                                                                                                                                                                                                    |

Das Widget-Set ist registriert in [`io-package.json`](io-package.json) unter `common.visWidgets.vis2AutomaticFeeder`
(Komponenten) `FeederStatus`, `FeedControl`, `Environment`, `DynamicFeeding`, `SeasonBanner`, `AnimatedFeeder`).

**Build & Skripte** (vom Stammverzeichnis des Repositorys ausführen):

```bash
npm run npm      # install root + src-widgets-ts dependencies
npm run build    # build the TypeScript widgets → widgets/vis-2-widgets-automatic-feeder/
npm run lint     # ESLint over src-widgets-ts
npm test         # @iobroker/testing package tests (mocha test/package)
```

`npm run build` Läufe `node tasks --typescript`, das reinigt, aufbaut `src-widgets-ts` mit Vite und Kopien
`customWidgets.js`, die Assets, Bilder und Icons in `widgets/vis-2-widgets-automatic-feeder/` (der Ordner, der an die Endbenutzer ausgeliefert wird; `main` zeigt auf seine `customWidgets.js`). Die Veröffentlichungen werden mit dem `@alcalzone/release-script`
(`npm run release-patch` / `-minor` / `-major`), wodurch der Build auch vor dem Commit ausgeführt wird.

---

## 10. Fehlerbehebung & Häufig gestellte Fragen

**Ein Widget zeigt lediglich „Wählen Sie den Zuleitungsschalterkanal aus…“ an.**
Stellen Sie beides ein **gemeinsam** Felder (Instanz _Und_ (Schalter). Das Dropdown-Menü des Schalters wird mit den Daten der ausgewählten Instanz gefüllt, wählen Sie also zuerst die Instanz aus.

**Das Dropdown-Menü für den Schalter ist leer.**
Die Auserwählten `automatic-feeder` Für diese Instanz sind noch keine Switches konfiguriert, oder die Instanznummer ist falsch. Konfigurieren Sie zuerst einen Switch im Adapter.

**Werte zeigen `–`.**
Stellen Sie sicher, dass der Adapter **Version 1.4.0 oder neuer** (Version 1.5.0+ für den Laufzeit-Countdown). Ältere Versionen liefern nicht die numerischen Zeitstempel und Befehlsdatenpunkte, auf die die Widgets angewiesen sind. **Wasser tief** Fliesen bleiben `–` es sei denn, Sie haben einen zweiten, tiefer liegenden Sensor konfiguriert; **O₂** Die Pille ist nur dann sichtbar, wenn ein Sauerstoffsensor konfiguriert ist – beides ist normal.

**Der Countdown für die verbleibende Laufzeit wird nie angezeigt.**
Es wird ein Adapter benötigt. **Version 1.5.0+** (`status.feedingEndsTs`und wird nur angezeigt _während einer Fütterung läuft_.

**Der Countdown-Ring von AnimatedFeeder ist nicht exakt proportional.**
Für den passenden Ring wird ein Adapter benötigt. **Version 1.6.0+** (`status.feedingDurationSec`Bei älteren Adaptern wird die Dauer ab dem Zeitpunkt des Fütterungsbeginns geschätzt, daher ist der Ring nur eine Näherung.

**Neue/aktualisierte Widgets werden nicht angezeigt, oder nur einige sind sichtbar.**
Es handelt sich dabei fast immer um ein veraltetes Widget-Bundle im Browser/Runner. Ausführen
`iobroker upload vis-2-widgets-automatic-feeder`Starten Sie vis-2 (oder den Host) neu und aktualisieren Sie den Browser (Strg+F5).

**Ersetzt dies den Adapter?**
Nein. Dies sind lediglich die Dashboard-Widgets. Alle Zeitpläne, Temperaturlogik, Pausen und Benachrichtigungen befinden sich in der...
**ioBroker.automatic-feeder** Adapter; die Widgets sind eine Ansicht darauf und eine Fernbedienung dafür.

---

## Dokumentation

- 🇩🇪 [Deutsche Dokumentation](doc/de/README.md)
- 🇷🇺 [Dokumentation auf Russisch](doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](doc/nl/README.md)
- 🇫🇷 [Dokumentation française](doc/fr/README.md)
- 🇮🇹 [Documentazione italiana](doc/it/README.md)
- 🇪🇸 [Documentación en español](doc/es/README.md)
- 🇵🇱 [Polnische Dokumentarfilme](doc/pl/README.md)
- 🇵🇹 [Documentação portuguesa](doc/pt/README.md)
- 🇺🇦 [Dokumentarfilm](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.4 (2026-09-06)
* (ssbingo) Maintenance: dependency and build-tooling updates (`@iobroker/adapter-react-v5` 8.3.3, `@iobroker/types-vis-2` 2.15.4, `@module-federation/vite` 1.21.1). No widget changes

### 0.4.3 (2026-09-01)
* (ssbingo) **FeedingAmountSettings** now selects the active feed from the adapter's **central feed list** (`native.feeds`) via a dropdown, written id-based to `settings.activeFeed` — replacing the deprecated per-switch feed profiles (needs **automatic-feeder v1.18.0+**). **FeedingAmount** additionally shows the active feed's pellet size (`status.activeFeedSize`)

### 0.4.2 (2026-09-01)
* (ssbingo) **FeedingAmountSettings** now has an **Accent colour** option (Appearance group), just like the FeedingAmount widget — the accent drives the toggles, active borders and highlighted values, so both widgets can be given the same accent for a consistent design. In light mode the accent is darkened for readable text; in dark mode it is used directly

### 0.4.1 (2026-09-01)
* (ssbingo) **FeedingAmountSettings** now follows the vis-2 **colour mode** (dark/light) like the other widgets — it reads `context.themeType` and renders a dark panel in dark mode and the light panel in light mode (previously it was always light)
* (ssbingo) The **No card background** option of FeedingAmountSettings now actually works (transparent background) instead of doing nothing

### 0.4.0 (2026-09-01)
* (ssbingo) New separate **FeedingAmountSettings** widget — a light settings panel matching the agreed design: a model on/off switch, a fish list with per-size icons + reference weights and editable counts (with a live total weight), the seven temperature percentages, a Phase-B control switch and the optional daily maximum. All fields write to the adapter's writable `switches.<id>.settings.*` states (**automatic-feeder v1.16.0+**)
* (ssbingo) FeedingAmountSettings has an **active-feed switcher** built from the feed profiles configured for the switch in the adapter admin; one tap selects the active profile and its dispense rate (writes `settings.activeFeed`, needs **automatic-feeder v1.17.0+**)
* (ssbingo) The **FeedingAmount** widget is now purely a **read-only** display card again; all editing moved to the new FeedingAmountSettings widget. It also shows the active feed-profile name (`status.activeFeedName`)

### 0.3.2 (2026-09-01)
* (ssbingo) Housekeeping: keep only the latest 7 entries in `common.news` (repository checker W1032). No widget changes

### 0.3.1 (2026-09-01)
* (ssbingo) Housekeeping (repository checker): bumped `@alcalzone/release-script-plugin-license` to 5.2.2 (S0064), removed the unneeded `prepublishOnly` script (W0095) and the unnecessary **admin** dependency — this is a pure widget set with no admin config UI (S1091) — and unpinned the CI deploy action to `@v1` (S3044). No widget changes

### 0.3.0 (2026-09-01)
* (ssbingo) New widget **FeedingAmount**: shows the adapter's feeding-amount model for a switch — recommended daily ration, the feeding percentage for the current water temperature, estimated total weight and, in control mode, the per-feeding portion and motor run-times. It uses the adapter's `status.feedTargetPortionGrams` / `status.feedingsPerDayToday` for an exact per-feeding amount (**automatic-feeder v1.16.0+**)
* (ssbingo) The FeedingAmount widget is **editable**: an *Edit* toggle lets you change the fish counts, the temperature percentages, the Phase-A/B switches and the dispense rate; the changes are written to the adapter's writable `switches.<id>.settings.*` states (needs **automatic-feeder v1.16.0+** for the amount-model settings mirror)

### 0.2.1 (2026-07-07)
* (ssbingo) Fixed **AnimatedFeeder** showing nothing in Firefox: the built-in feeder image now uses a base64 data URI (Firefox rejects the non-standard `;utf8,` form that Chrome tolerated) and the canvas 2D context is initialised from the `<canvas>` ref callback, so it binds reliably regardless of mount order. A failed or zero-size custom image can no longer blank the whole widget

### 0.2.0 (2026-07-07)
* (ssbingo) New sixth widget **AnimatedFeeder**: a large animated feeder (canvas) with falling pellets, a countdown ring and pause symbols (manual / time-based / winter); tap it to trigger a one-off feeding. The exact countdown ring uses the adapter's new `status.feedingDurationSec` (**automatic-feeder v1.6.0+**)
* (ssbingo) New stylized adapter and widget-set icon (feeder on a light grey tile)

---

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 ssbingo <silvio.sternitzke@googlemail.com>

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