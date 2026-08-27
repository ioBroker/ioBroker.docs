---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-2-widgets-automatic-feeder/README.md
title: ioBroker.vis-2-widgets-automatic-feeder
hash: MshJEBjiUIwpJYyFivX/vVTGny2PlVTmkSeOkF3j9XI=
---
![Logo](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/admin/vis-2-widgets-automatic-feeder.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.vis-2-widgets-automatic-feeder.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-automatic-feeder.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vis-2-widgets-automatic-feeder-installed.svg)
![Lizenz](https://img.shields.io/npm/l/iobroker.vis-2-widgets-automatic-feeder.svg)

# IoBroker.vis-2-widgets-automatic-feeder
---

<p align="center"><a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Kauf mir einen Kaffee" /></a></p>

---

## Vis-2 Widgets für den automatischen Futterautomaten
Vorgefertigte **vis-2 Dashboard-Widgets** für den [ioBroker.automatic-feeder](https://github.com/ssbingo/ioBroker.automatic-feeder)-Adapter – Drag-and-Drop-Karten für einen Fisch-/Koi-/Teichfutterautomaten. **Es müssen **keine Objekt-IDs nachgeschlagen und kein HTML-Code geschrieben werden**: Sie wählen Ihre Futterautomateninstanz und Ihren Futterschalter **anhand ihres aussagekräftigen Namens** aus einem Dropdown-Menü aus, und jedes Widget liest und steuert die richtigen Datenpunkte selbstständig.

Dieses Paket enthält **sechs Widgets**, die zusammen ein komplettes Fütterungs-Dashboard bilden. Das dunkle, tabletfreundliche Kartendesign verfügt über eine Akzentfarbe, die Sie ändern können. Vier Widgets *zeigen* lediglich Daten an; zwei ermöglichen Ihnen zusätzlich Aktionen (z. B. eine einmalige Fütterung auslösen oder die Fütterung pausieren).

Dies ist lediglich die **Visualisierungsebene**. Die gesamte Zeitplanung, das Temperaturmodell, die Sonnenaufgangs-/Sonnenuntergangslogik, Pausen und Benachrichtigungen befinden sich im separaten **ioBroker.automatic-feeder**-Adapter. Diese Widgets bieten eine Live-Ansicht und Fernsteuerung für diesen Adapter. (In der umfassenderen Smart-Pond-Familie kann beispielsweise der zugehörige *Teichbelüftungs*-Adapter die Belüftung pausieren, während der Futterautomat arbeitet – dies wird jedoch dort konfiguriert, nicht hier.)

Dieses Dokument ist ein vollständiges Handbuch. Falls Sie diese Widgets noch nie verwendet haben, lesen Sie es bitte von oben bis unten: Die **Schnellstartanleitung** zeigt Ihnen, wie Sie in etwa einer Minute eine funktionierende Karte erstellen, und der Rest erklärt jedes Widget und jede Option im Detail.

> 🇩🇪 Deutsche Anleitung: [doc/de/README.md](doc/de/README.md) · andere Sprachen: siehe > [Dokumentation](#documentation) unten.

---

## Inhaltsverzeichnis
1. [Was sind Vis-2-Widgets?](#1-what-are-vis-2-widgets)
2. [Was Sie erhalten](#2-what-you-get)
3. [Anforderungen](#3-Anforderungen)
4. [Installation](#4-Installation)
5. [Schnellstart](#5-quick-start)
6. [Die Widgets im Detail](#6-the-widgets-in-detail)
- [6.1 FeederStatus](#61-feederstatus)
- [6.2 FeedControl](#62-feedcontrol)
- [6.3 Umgebung](#63-environment)
- [6.4 DynamicFeeding](#64-dynamicfeeding)
- [6.5 SeasonBanner](#65-seasonbanner)
   - [6.6 AnimatedFeeder](#66-animatedfeeder)
7. [Konfiguration & Bindungen](#7-configuration--bindings)
8. [Welche Datenpunkte jedes Widget verwendet](#8-which-data-points-each-widget-uses)
9. [Entwicklung](#9-Entwicklung)
10. [Fehlerbehebung & FAQ](#10-troubleshooting--faq)

---

## 1. Was sind Vis-2-Widgets?
**vis-2** ist das moderne Visualisierungstool von ioBroker (der Nachfolger des klassischen *vis 1*). Sie erstellen Dashboards („Ansichten“), indem Sie **Widgets** – Schaltflächen, Anzeigen, Karten – auf eine Arbeitsfläche ziehen und diese mit den Zuständen Ihres Geräts verbinden.

Normalerweise verknüpft man ein Widget manuell mit einem Zustand: Man sucht eine Objekt-ID (etwa `automatic-feeder.0.switches.sw-0.status.feedingActive`) und gibt sie in ein Bindungsfeld ein. Das funktioniert gut für einen einzelnen Wert, aber eine gute Feeder-Karte benötigt ein Dutzend solcher Widgets, die zusammenarbeiten.

Ein **Widget-Set** wie dieses löst das Problem: Es handelt sich um ein Add-on mit **speziell entwickelten Widgets** für einen Adapter. Jedes Widget kennt bereits die benötigten Zustände. Sie müssen lediglich den **zu verwendenden Feeder** angeben – alles andere ist bereits vorkonfiguriert. Anstatt also ein Dutzend manueller Bindungen vorzunehmen, genügen **zwei Klicks** (Instanz auswählen + Schalter) und Sie erhalten eine fertige Karte.

---

## 2. Was Sie erhalten
Sechs Widgets. Jedes ist eine in sich abgeschlossene Karte; Sie können nur eines verwenden oder sie zu einem vollständigen Dashboard kombinieren.

| Widget | Was es anzeigt / tut | Schreibt es? |
|--------|----------------------|---------|
| **FeederStatus** | Die Hauptstatuskarte: eine animierte Feedergrafik (der Lüfter dreht sich während des Fütterns), ein Live-Countdown, der Countdown bis zur **nächsten** Fütterung mit Zeitangabe und Modus, die **letzte** Fütterung und deren Ergebnis, das astronomische Zeitfenster (Sonnenaufgang/Sonnenuntergang) und – falls blockiert – der Grund. | nein |
| **Fütterungssteuerung** | Eine **Jetzt füttern**-Schaltfläche mit zweistufiger Bestätigung, ein Portionsregler (Fütterungsdauer) und ein Hauptschalter zum **Füttern pausieren**. | Ja |
| **Umgebung** | Wassertemperatur (flach und tief), thermische Schichtung Δ, Sauerstoffgehalt (nur falls ein Sensor vorhanden ist) und Tagesverlauf von Sonnenaufgang bis Sonnenuntergang mit einer aktuellen Markierung. | nein |
| **Dynamische Fütterung** | Das Temperaturmodell des Adapters **Q10** auf einen Blick: Durchschnittstemperatur, Förderrate, Intervall und Portion sowie der zugehörige Sensor (Wasser/Luft). | nein |
| **Saisonbanner** | Eine einzelne, farbcodierte Statuszeile, die den aktuell wichtigsten Status anzeigt (manuelle Pause → zeitbasierte Pause → Winterpause → automatisch aktiv). | nein |
| **Animierter Futterautomat** | Ein großer animierter Futterautomat auf einer Leinwand: Futterpellets fallen herunter und ein Countdown-Ring füllt sich während der Fütterung; ansonsten werden Pausensymbole (manuell / zeitgesteuert / Winter) angezeigt. **Tippen Sie darauf, um eine einmalige Fütterung auszulösen.** | Ja |

Die beiden "Schreib"-Widgets (**FeedControl**, **AnimatedFeeder**) schreiben nur, wenn *Sie* darauf klicken/tippen – von selbst ändert sich nichts.

In der Widget-Palette vis-2 erscheint das gesamte Set unter dem Gruppennamen **Automatischer Futterautomat**.

---

## 3. Anforderungen
- **ioBroker** mit installiertem **vis-2** (dem modernen vis). Dies sind vis-2-Widgets und funktionieren **nicht** in der klassischen Version.

vis 1.

- Der **ioBroker.automatic-feeder**-Adapter, installiert und konfiguriert mit **mindestens einem Switch** (ein "Switch" ist ein

Zuführung in der Adapterkonfiguration; sie hat einen aussagekräftigen Namen wie z. B. *KoiTeich Ponton*). Empfohlene Adapterversionen:

- **Version 1.4.0 oder neuer** – erforderlich für die numerischen Zeitstempel, den Befehl `blockReasonCode` und den Befehl `feedFor`

Widgets sind darauf angewiesen.

- **Version 1.5.0 oder neuer** – empfohlen, aktiviert zusätzlich den Live-**Laufzeit-Countdown** in FeederStatus

(der Datenpunkt `status.feedingEndsTs`).

- **Version 1.6.0 oder neuer** – empfohlen für den exakten Countdown-Ring in **AnimatedFeeder** (der

`status.feedingDurationSec` Datenpunkt).

Sie müssen niemals eine Objekt-ID manuell eingeben: Die Widgets lesen und schreiben nur die eigenen `status.*` und `settings.*` Datenpunkte des ausgewählten Schalters, die aus der von Ihnen ausgewählten Instanz und dem Schalter ermittelt werden.

---

## 4. Installation
1. Installieren Sie **ioBroker.vis-2-widgets-automatic-feeder** in ioBroker – aus der Admin-Liste **Adapter**, sobald es installiert ist.

aus dem Repository oder direkt von GitHub / npm. Es wird als *visualization-widgets*-Adapter installiert (`onlyWWW`, es wird keine laufende Instanz erstellt).

2. Öffnen Sie **vis-2**. In der Widget-Palette (linke Seite, im Bearbeitungsmodus) erscheint eine neue Widget-Gruppe **Automatischer Futterautomat**.

Modus).

3. Ziehen Sie ein beliebiges Widget auf eine Ansicht – siehe die [Schnellstartanleitung](#5-quick-start) unten.

**Nach jedem Update:** Führen Sie `iobroker upload vis-2-widgets-automatic-feeder` aus, starten Sie anschließend vis-2 neu (die Installation des Adapters veranlasst vis-2 bereits zu einem Neustart) und führen Sie ein vollständiges Neuladen (Strg+F5) im Browser durch, damit der Runner das neue Widget-Bundle erkennt. Siehe [Fehlerbehebung](#10-troubleshooting--faq).

---

## 5. Schnellstart
1. Wechseln Sie in vis-2 in den **Bearbeitungsmodus**, öffnen Sie eine Ansicht und ziehen Sie das Widget **FeederStatus** aus dem **Automatischen Futterautomaten**.

Gruppe darauf.

2. Wählen Sie das Widget aus, öffnen Sie das **Attribute**-Panel auf der rechten Seite und füllen Sie die beiden Felder im **allgemeinen** Bereich aus.

Gruppe:

- **Feeder-Instanz** — Wählen Sie Ihre `automatic-feeder`-Instanz aus (normalerweise `0`; dies ist eine Standard-Instanzauswahl).
- **Schalter** — Wählen Sie Ihren Zuleiter aus dem Dropdown-Menü. Dort werden Ihre konfigurierten Schalter **mit ihrem Anzeigenamen** aufgelistet.

(z.B. *KoiTeich Ponton*), direkt aus der Konfiguration des Adapters ausgelesen.

3. Die Karte zeigt sofort Live-Daten an. Wiederholen Sie dies für jedes andere Widget – die Instanz-/Schalterauswahl funktioniert genau so.

Gleiches gilt für alle sechs.

Das ist alles: keine Objekt-IDs, keine manuellen Bindungen, keine Skripte. Solange nicht beide Felder ausgefüllt sind, zeigt ein Widget anstelle von Daten den hilfreichen Hinweis „Wählen Sie den Zuleitungsschalterkanal in den Widget-Einstellungen aus.“ an.

---

## 6. Die Widgets im Detail
Alle Widgets benötigen dieselben zwei Einstellungen – **Futteranlage** und **Schalter** – in der **gemeinsamen** Attributgruppe (siehe [Konfiguration & Bindungen](#7-configuration--bindings)). Die Darstellungsoptionen der einzelnen Widgets sind unten aufgeführt. Alle Screenshots zeigen Live-Daten eines echten Koiteich-Futterautomaten.

### 6.1 FeederStatus
![FeederStatus-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/feederstatus.png)

Die Hauptkarte. Von oben nach unten zeigt sie:

- Eine **Statusanzeige**: **Bereit** (grün) oder **Blockiert** (gelb). „Blockiert“ bedeutet, dass der Adapter derzeit nicht berechtigt ist,

Fütterung (Nacht, Temperatur zu niedrig, Sauerstoffgehalt zu niedrig, eine Pause …).

- Eine **animierte Zuführungsgrafik**. Während der Zuführung läuft, dreht sich der Lüfter und – mit Adapter v1.5.0+ – eine **Laufzeit**.

Daneben erscheint ein Countdown** (z. B. `5 s`), der bis zum Ende der aktuellen Fütterung herunterzählt.

- Die **nächste Fütterung**: ein langer Countdown (*in ca. 27 Minuten*, oder 1 Stunde 05 Minuten nach der vollen Stunde), die genaue Uhrzeit und die

Modus (*dynamisches Intervall*, wenn dynamische Fütterung aktiviert ist, ansonsten *Zeitplan*).

- Die **letzte Fütterung** mit einem ✓ (Erfolg, grün) oder ✗ (Fehler, rot) Markierung und dem **Ergebnis** des Adapters.
- Das **astronomische Fenster** (Sonnenaufgang – Sonnenuntergang), das für die Tag/Nacht-Logik verwendet wird.
- Im Falle einer Blockierung wird eine zusätzliche **Grund**-Zeile mit dem für Menschen lesbaren Blockierungsgrund (in Gelb) angezeigt.

Die Karte wird einmal pro Sekunde neu gerendert, damit die Countdowns aktiv bleiben.

**Darstellungsoptionen** (Gruppe *Darstellung*):

| Option | Typ | Standard | Bedeutung |
|--------|------|---------|---------|
| **Akzentfarbe** | Farbe | `#33c1cf` | Hervorhebungsfarbe der Karte und Grafik. |
| **Position des Laufzeittimers** | auswählen (Rechts / Links) | Rechts | Zeigt den laufenden Countdown links oder rechts neben der Grafik an. |
| **Grafik des Zufuhrfachs animieren** | Kontrollkästchen | ein | Drehanimation des Lüfters ein-/ausschalten. |
| **Kein Kartenhintergrund** | Kontrollkästchen | Aus | Ohne Kartenhintergrund rendern (um ihn in einem eigenen Panel zu platzieren). |

Standard-Widgetgröße: 320 × 340 px.

### 6.2 Zuführungskontrolle
![FeedControl-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/feedcontrol.png)

Die Kontrollkarte:

- **Jetzt füttern** – eine **zweistufige** Schaltfläche. Der erste Klick aktiviert sie und die Beschriftung ändert sich zu *Bestätigen: N s ?*; die

Ein zweiter Klick löst genau **eine** Fütterung der gewählten Dauer aus und zeigt kurz *Ausgelöst ✓* an. Wenn Sie nicht innerhalb von ca. 4 Sekunden bestätigen, deaktiviert sich das Gerät automatisch.

- **Portion (manuell)** – ein Schieberegler, der die Fütterungsdauer in Sekunden von `1` bis zur *Maximalen Dauer* einstellt (Standardwert).

(beginnt bei 5 Sekunden).

- **Stromzufuhr unterbrechen** – ein Hauptschalter, der die **gesamte** Stromzufuhr für diesen Schalter sofort unterbricht, bis er betätigt wird.

Zurücktreten. Es schreibt den `settings.pauseNow` des Adapters, der jeden Modus und jede zeitbasierte Pause überschreibt.

**Darstellungsoptionen** (Gruppe *Darstellung*):

| Option | Typ | Standard | Bedeutung |
|--------|------|---------|---------|
| **Akzentfarbe** | Farbe | `#33c1cf` | Hervorhebungsfarbe. |
| **Maximale Dauer (s)** | Zahl (1–3600) | 30 | Oberes Ende des Portionsreglers. |
| **Pause-Schalter anzeigen** | Kontrollkästchen | ein | Hauptschalter *Feed-Unterbrechung* ein-/ausblenden. |
| **Kein Kartenhintergrund** | Kontrollkästchen | aus | Ohne Kartenhintergrund rendern. |

Standard-Widgetgröße: 300 × 240 px.

Die Schaltfläche sendet einen einmaligen Datenstrom über den Befehl `feedFor` des Adapters (Wert = Dauer in Sekunden). Ihr Zeitplan wird dadurch nicht geändert und der Adapter wird nicht neu gestartet.

### 6.3 Umgebung
![Umgebungs-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/environment.png)

Die Wasser-/Umweltkarte:

- **Wassertemperaturen im Flachwasserbereich** und im Tiefwasserbereich** (in °C, gerundet auf 0,1). Die Kachel für den Tiefwasserbereich bleibt auf „–“, wenn Sie nicht …

Konfigurieren Sie einen zweiten, tiefer liegenden Sensor.

- Eine **Schichtungspille**, die die Differenz Δ zwischen den beiden Schichten (in K) anzeigt. Sie färbt sich bernsteinfarben, wenn die Schichten

Sie unterscheiden sich um mehr als **3 K**.

- Eine **O₂**-Tablette in mg/l – wird **nur** angezeigt, wenn ein Sauerstoffsensor konfiguriert ist, und färbt sich rot, wenn der Wert sinkt.

unterhalb des konfigurierten Minimums (`settings.o2Min`).

- Ein **Tagesbalken** von Sonnenaufgang (☀) bis Sonnenuntergang (☾) mit einer Live-Markierung für die aktuelle Uhrzeit (wird jede Minute neu berechnet).

**Darstellungsoptionen** (Gruppe *Darstellung*):

| Option | Typ | Standard | Bedeutung |
|--------|------|---------|---------|
| **Akzentfarbe** | Farbe | `#33c1cf` | Hervorhebungsfarbe. |
| **Kein Kartenhintergrund** | Kontrollkästchen | aus | Ohne Kartenhintergrund rendern. |

Standard-Widgetgröße: 320 × 220 px.

### 6.4 Dynamische Zuführung
![DynamicFeeding-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/dynamicfeeding.png)

Zeigt das **Q10-Temperaturmodell**, das der Adapter zur Anpassung der Zufuhr an die Wassertemperatur verwendet. Vier Kacheln:

- **Durchschnittstemperatur** — die durchschnittliche Temperatur, auf der das Modell basiert (°C).
- **Rate (Q10)** — der resultierende Ratenfaktor (× relativ zur Referenztemperatur).
- **Intervall** — das sich daraus ergebende Fütterungsintervall in Minuten.
- **Portion** — die daraus resultierende Fütterungsdauer in Sekunden.

Eine **Quellen**-Pille in der Kopfzeile zeigt an, ob das Modell vom **Wassersensor (flach)** oder vom **Luftsensor** (`settings.dynamicSource`) gesteuert wird. Wenn die dynamische Zufuhr für diesen Schalter deaktiviert ist, zeigt die Karte anstelle der Kacheln den Hinweis *"Dynamische Zufuhr ist für diesen Schalter deaktiviert."* an.

**Darstellungsoptionen** (Gruppe *Darstellung*):

| Option | Typ | Standard | Bedeutung |
|--------|------|---------|---------|
| **Akzentfarbe** | Farbe | `#33c1cf` | Hervorhebungsfarbe der Kachel „Durchschnittstemperatur“. |
| **Kein Kartenhintergrund** | Kontrollkästchen | aus | Ohne Kartenhintergrund rendern. |

Standard-Widgetgröße: 460 × 150 px.

### 6.5 Saisonbanner
![SeasonBanner-Widget](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/seasonbanner.png)

Eine einzelne, farbcodierte Statuszeile – ideal für den oberen Bereich einer Ansicht. Sie zeigt stets den **wichtigsten** aktuellen Status in dieser Prioritätsreihenfolge an:

1. **Manuelle Pause** (rot) — der Hauptpausenschalter (`status.pauseManual`) ist eingeschaltet.
2. **Zeitbasierte Pause** (gelb) – ein konfiguriertes Pausenfenster ist aktiv (`status.pauseActive`), mit seiner Endzeit

angehängt (`status.pauseActiveUntil`).

3. **Winterpause** (blau) — das Winterfenster ist aktiv (`status.winterActive`).
4. **Automatisch aktiv** (grün) — nichts blockiert die Fütterung, der Zeitplan läuft normal ab.

Dieses Widget bietet **keine** weiteren Darstellungsoptionen außer den beiden Standardeinstellungen (Instanz + Schalter).

Standard-Widgetgröße: 460 × 44 px.

### 6.6 AnimatedFeeder
![AnimatedFeeder-Widget während des Fütterns](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/animatedfeeder.png)

Ein großer, animierter Futterautomat, dargestellt auf einer HTML-Seite (`<canvas>`) – das visuelle Herzstück eines Teich-Dashboards. Er reagiert live auf den Schalter:

- **Während der Fütterung:** Futterpellets fallen aus dem Auslass und ein **Countdown-Ring** mit den verbleibenden Sekunden füllt sich.

Der Ring ist exakt, wenn der Adapter `status.feedingDurationSec` (**v1.6.0+**) bereitstellt; bei älteren Adaptern wird die Gesamtdauer ab dem Zeitpunkt des Fütterungsbeginns berechnet.

- **Pause-Zustände**, dargestellt als Symbol auf einer Scheibe mit einem roten Kreuz, mit der gleichen Priorität wie das Saisonbanner:

**Manuelle Pause** (Hand) → **Zeitbasierte Pause** (Uhr) → **Winterpause** (Schneeflocke).

- **Leerlauf:** Nur der Futterautomat, mit einem optionalen *„Zum Füttern tippen“*-Hinweis.

![Leerlauf- und Pausenzustände von AnimatedFeeder](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/animatedfeeder-states.png)

**Tippen zum Füttern:** Tippen Sie einmal auf das Widget, um es zu aktivieren (*Bestätigen: N s ?*). Tippen Sie erneut, um eine einmalige Fütterung der konfigurierten Dauer auszulösen (über `feedFor`). Während einer Pause oder einer laufenden Fütterung wird das Tippen ignoriert. Die gesamte Funktion kann mit **Tippen zum Füttern aktivieren** deaktiviert werden. (Die Animation des fallenden Pellets wird automatisch reduziert, wenn das Betriebssystem weniger Bewegung anfordert.)

**Optionen** – der AnimatedFeeder verfügt über drei Attributgruppen:

*Verhalten:*

| Option | Typ | Standard | Bedeutung |
|--------|------|---------|---------|
| **Tippen zum Füttern aktivieren** | Kontrollkästchen | ein | Ermöglicht das Auslösen einer Fütterung durch Antippen des Widgets. |
| **Feed-Dauer (s)** | Zahl (1–3600) | 5 | Dauer, die durch die Tippaktion festgelegt wird. |
| **Futtergrafik animieren** | Kontrollkästchen | ein | Animation der fallenden Pellets ein-/ausschalten. |

*Aussehen:*

| Option | Typ | Standard | Bedeutung |
|--------|------|---------|---------|
| **Akzentfarbe** | Farbe | `#33c1cf` | Farbe des Countdown-Rings und des Hinweises. |
| **Bild (optional)** | Bild | *(integriert)* | Benutzerdefiniertes Bild für die Bildzuführung; lassen Sie dieses Feld leer, um die integrierte Grafik zu verwenden. Ein benutzerdefiniertes Bild kann ein anderes Seitenverhältnis haben. |
| **Kein Kartenhintergrund** | Kontrollkästchen | aus | Ohne Kartenhintergrund rendern. |

*Geometrie* – Die Positionen sind in **%** des Widgets angegeben, sodass die Animation ausgerichtet werden kann, wenn Sie Ihr eigenes Bild verwenden:

| Option | Typ | Standard | Bereich |
|--------|------|---------|-------|
| **Pelletauslass X (%)** | Anzahl | 50 | 0–100 |
| **Pelletauslass Y (%)** | Anzahl | 80 | 0–100 |
| **Countdown X (%)** | Zahl | 50 | 0–100 |
| **Countdown Y (%)** | Zahl | 44 | 0–100 |
| **Countdown-Größe (%)** | Anzahl | 20 | 5–45 |

Standard-Widgetgröße: 300 × 440 px.

---

## 7. Konfiguration & Bindungen
Jedes Widget verfügt über die gleichen zwei erforderlichen Einstellungen in der **gemeinsamen** Attributgruppe:

![Widget-Attribute: Instanz und Schalter nach Namen](../../../en/adapterref/iobroker.vis-2-widgets-automatic-feeder/img/config-attributes.png)

- **Feeder-Instanz** — Wählen Sie Ihre „automatische-Feeder“-Instanz aus dem Dropdown-Menü (normalerweise „0“). Akzeptiert entweder die

einfache Zahl (`0`) oder die Langform (`automatic-feeder.0`).

- **Schalter** — Wählen Sie den Feeder aus einer Dropdown-Liste, die Ihre konfigurierten Schalter **mit ihrem Anzeigenamen** auflistet (z. B.

*KoiTeich Ponton*), nicht über eine interne ID. Die Liste wird aus der Konfiguration der ausgewählten Instanz gelesen (`system.adapter.automatic-feeder.<instance>` → `native.switches[]`).

Aus diesen beiden Werten erstellt das Widget den Schaltkanal `automatic-feeder.<instance>.switches.<switch>` und abonniert die benötigten Unterzustände – Sie müssen die Bindung nicht selbst eingeben. Solange nicht beide Felder gesetzt sind, zeigt das Widget anstelle der Daten den Hinweis *"Wählen Sie den Zuleitungs-Schaltkanal aus…"* an.

Die optionalen Darstellungseinstellungen befinden sich in der Gruppe **Darstellung** jedes Widgets (und beim AnimatedFeeder zusätzlich in **Verhalten** und **Geometrie**); siehe die einzelnen Widgets oben. Gemeinsame Optionen für alle Widgets:

| Optionen | Widgets | Bedeutung |
|--------|---------|---------|
| **Akzentfarbe** | alle außer SeasonBanner | Die Hervorhebungsfarbe (Standard: Teichblau `#33c1cf`). |
| **Kein Kartenhintergrund** | alle außer SeasonBanner | Das Widget ohne Kartenhintergrund rendern, z. B. um es in einem benutzerdefinierten Panel zu platzieren. |

---

## 8. Welche Datenpunkte jedes Widget verwendet
Aus Gründen der vollständigen Transparenz – die Widgets abonnieren den Schaltkanal `automatic-feeder.<instance>.switches.<switch>.…` und verwenden ausschließlich diese relativen Datenpunkte:

| Widget | Liest | Schreibt |
|--------|-------|--------|
| **FeederStatus** | `status.feedingActive`, `status.feedingEndsTs`, `status.nextFeeding`, `status.nextFeedingTs`, `status.lastFeeding`, `status.lastResult`, `status.blocked`, `status.blockReasonCode`, `status.blockReason`, `status.error`, `status.sunrise`, `status.sunset`, `settings.dynamicEnabled` | — |
| **Umgebung** | `status.waterTemperature`, `status.waterTemperatureDeep`, `status.waterStratification`, `status.oxygen`, `status.sunrise`, `status.sunset`, `status.sunriseTs`, `status.sunsetTs`, `settings.o2Min` | — |
| **Dynamische Fütterung** | `settings.dynamicEnabled`, `settings.dynamicSource`, `status.dynamicAvgTemperature`, `status.dynamicRate`, `status.dynamicIntervalMin`, `status.dynamicDurationSec` | — |
| **Saisonbanner** | `status.winterActive`, `status.pauseActive`, `status.pauseActiveUntil`, `status.pauseManual`, `settings.winterWindow` | — |
| **Animierter Feeder** | `status.feedingActive`, `status.feedingEndsTs`, `status.feedingDurationSec`, `status.winterActive`, `status.pauseManual`, `status.pauseActive` | `feedFor` (Tippen zum Füttern, Wert = Sekunden) |
| **Animierter Futterautomat** | `status.feedingActive`, `status.feedingEndsTs`, `status.feedingDurationSec`, `status.winterActive`, `status.pauseManual`, `status.pauseActive` | `feedFor` (tippen zum Füttern, Wert = Sekunden) |

Die genaue Bedeutung der einzelnen Datenpunkte finden Sie im Abschnitt [ioBroker.automatic-feeder-Dokumentation](https://github.com/ssbingo/ioBroker.automatic-feeder).

---

## 9. Entwicklung
Die Widgets sind in **TypeScript + React 18** (mit MUI für die Attribut-Editoren) geschrieben und zusammen mit **Vite** und **Module Federation** in einem einzigen `customWidgets.js` gebündelt, das vis-2 zur Laufzeit lädt. Der Quellcode befindet sich in [`src-widgets-ts/src/`](src-widgets-ts/src/):

| Datei | Widget / Rolle |
|------|---------------|
| `FeederWidgetBase.tsx` | Gemeinsame Basisklasse, die von **vier** der Widgets (Environment, DynamicFeeding, SeasonBanner, AnimatedFeeder) verwendet wird: Sie löst den Switch-Kanal auf, abonniert die Unterzustände, speichert Werte im Zustand und bietet Hilfsfunktionen zum Lesen, Schreiben und Formatieren. FeederStatus und FeedControl erweitern `window.visRxWidget` direkt und führen ihre eigenen Subscribe-/Seed-Operationen durch. |
| `FeederStatus.tsx`, `FeedControl.tsx`, `Environment.tsx`, `DynamicFeeding.tsx`, `SeasonBanner.tsx`, `AnimatedFeeder.tsx` | Die sechs Widgets. |
| `styles.ts` | Das eingefügte CSS für das Kartendesign. |
| `translations.ts` + `i18n/*.json` | UI-Texte in 11 Sprachen. |
| `translations.ts` + `i18n/*.json` | UI-Texte in 11 Sprachen. |

Das Widget-Set ist in [`io-package.json`](io-package.json) unter `common.visWidgets.vis2AutomaticFeeder` registriert (Komponenten `FeederStatus`, `FeedControl`, `Environment`, `DynamicFeeding`, `SeasonBanner`, `AnimatedFeeder`).

**Build & Skripte** (vom Stammverzeichnis des Repositorys ausführen):

```bash
npm run npm      # install root + src-widgets-ts dependencies
npm run build    # build the TypeScript widgets → widgets/vis-2-widgets-automatic-feeder/
npm run lint     # ESLint over src-widgets-ts
npm test         # @iobroker/testing package tests (mocha test/package)
```

`npm run build` führt `node tasks --typescript` aus, welches `src-widgets-ts` mit Vite bereinigt, erstellt und `customWidgets.js` (die Assets, Bilder und das Icon-Set) in `widgets/vis-2-widgets-automatic-feeder/` kopiert (den Ordner, der an Endbenutzer ausgeliefert wird; `main` verweist auf `customWidgets.js`). Releases werden mit `@alcalzone/release-script` (`npm run release-patch` / `-minor` / `-major`) erstellt, welches den Build ebenfalls vor dem Commit ausführt.

---

## 10. Fehlerbehebung & Häufig gestellte Fragen
**Ein Widget zeigt lediglich „Wählen Sie den Zuleitungsschalterkanal…“ an.** Legen Sie beide **gemeinsamen** Felder (Instanz *und* Schalter) fest. Die Dropdown-Liste des Schalters wird mit den Daten der ausgewählten Instanz gefüllt. Wählen Sie daher zuerst die Instanz aus.

**Das Dropdown-Menü für die Schalter ist leer.** Die ausgewählte Instanz `automatic-feeder` verfügt noch über keine konfigurierten Schalter, oder die Instanznummer ist falsch. Konfigurieren Sie zuerst einen Schalter im Adapter.

**Die Werte zeigen `–` an.** Stellen Sie sicher, dass der Adapter **Version 1.4.0 oder neuer** ist (Version 1.5.0+ für den Laufzeit-Countdown). Ältere Versionen liefern nicht die numerischen Zeitstempel und Befehlsdatenpunkte, auf die die Widgets angewiesen sind. Die Kachel **Wassertiefe** zeigt weiterhin `–` an, sofern Sie keinen zweiten, tieferen Sensor konfiguriert haben; die **O₂**-Pille ist ausgeblendet, sofern kein Sauerstoffsensor konfiguriert ist – beides ist normal.

**Der Laufzeit-Countdown wird nie angezeigt.** Er benötigt den Adapter **v1.5.0+** (`status.feedingEndsTs`) und wird nur *während eines laufenden Fütterungsvorgangs* angezeigt.

**Der Countdown-Ring von AnimatedFeeder ist nicht exakt proportional.** Für einen exakten Ring wird der Adapter **v1.6.0+** (`status.feedingDurationSec`) benötigt; bei älteren Adaptern wird die Dauer anhand des Fütterungsbeginns geschätzt, daher ist der Ring nur annähernd.

**Neue/aktualisierte Widgets werden nicht angezeigt oder nur teilweise.** Dies liegt fast immer an einem veralteten Widget-Paket im Browser/Runner. Führen Sie `iobroker upload vis-2-widgets-automatic-feeder` aus, starten Sie vis-2 (oder den Host) neu und aktualisieren Sie den Browser (Strg+F5).

**Ersetzt dies den Adapter?** Nein. Es handelt sich hierbei lediglich um Dashboard-Widgets. Die gesamte Zeitplanung, Temperaturlogik, Pausen und Benachrichtigungen werden im **ioBroker.automatic-feeder**-Adapter gesteuert; die Widgets bieten lediglich eine Ansicht und eine Fernbedienung dafür.

---

## Dokumentation
- 🇩🇪 [Deutsche Dokumentation](doc/de/README.md)
- 🇷🇺 [Dokumentation auf Russisch](doc/ru/README.md)
- 🇳🇱 [Niederländische Dokumentation](doc/nl/README.md)
- 🇫🇷 [Documentation française](doc/fr/README.md)
- 🇮🇹 [Documentazione Italiana](doc/it/README.md)
- 🇪🇸 [Documentación en español](doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](doc/pl/README.md)
- 🇵🇹 [Portugiesische Dokumentation](doc/pt/README.md)
- 🇺🇦 [Документація українською](doc/uk/README.md)
- 🇨🇳 [简体中文文档](doc/zh-cn/README.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-07-07)
* (ssbingo) Fixed **AnimatedFeeder** showing nothing in Firefox: the built-in feeder image now uses a base64 data URI (Firefox rejects the non-standard `;utf8,` form that Chrome tolerated) and the canvas 2D context is initialised from the `<canvas>` ref callback, so it binds reliably regardless of mount order. A failed or zero-size custom image can no longer blank the whole widget

### 0.2.0 (2026-07-07)
* (ssbingo) New sixth widget **AnimatedFeeder**: a large animated feeder (canvas) with falling pellets, a countdown ring and pause symbols (manual / time-based / winter); tap it to trigger a one-off feeding. The exact countdown ring uses the adapter's new `status.feedingDurationSec` (**automatic-feeder v1.6.0+**)
* (ssbingo) New stylized adapter and widget-set icon (feeder on a light grey tile)

### 0.1.0 (2026-07-07)
* (ssbingo) Fixed the adapter icon not showing in the ioBroker Developer Portal — `extIcon` and `readme` now point to the real repository instead of the template placeholder

### 0.0.5 (2026-07-06)
* (ssbingo) Internal: the package test now uses the standard `@iobroker/testing` test suite (`tests.packageFiles`) so the ioBroker adapter checker can verify it

### 0.0.4 (2026-07-06)
* (ssbingo) Internal/CI: adopted the ioBroker standard workflow actions (`ioBroker/testing-action-check`, `ioBroker/testing-action-deploy`) — still token-less npm trusted publishing (OIDC) with provenance — and the standard Dependabot auto-merge workflow

### 0.0.3 (2026-07-06)
* (ssbingo) Full user manual with screenshots of every widget, plus translations in all 11 languages (`doc/<lang>/README.md`)
* (ssbingo) Repository and CI hardening: added a `check-and-lint` job, committed the root `package-lock.json`, replaced the broken Dependabot auto-merge with the GitHub-native flow, moved Dependabot to a distributed cron schedule and added `.vscode` JSON-schema settings; first release published with provenance via the npm Trusted Publisher pipeline

### 0.0.2 (2026-07-06)
* (ssbingo) All five widgets now register correctly; widget preview uses the feeder icon instead of the template demo image; the adapter installs straight from GitHub (removed the puppeteer-based demo test)

### 0.0.1 (2026-07-06)
* (ssbingo) Initial version with five widgets — FeederStatus, FeedControl, Environment, DynamicFeeding and SeasonBanner — for the ioBroker.automatic-feeder adapter, configurable by feeder instance and switch name

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