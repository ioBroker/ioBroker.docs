---
chapters: {"pages":{"en/adapterref/iobroker.pondpump/README.md":{"title":{"en":"ioBroker.pondpump"},"content":"en/adapterref/iobroker.pondpump/README.md"},"en/adapterref/iobroker.pondpump/doc/research/wassertemperaturen-im-koiteich.md":{"title":{"en":"Wassertemperaturen im Koiteich"},"content":"en/adapterref/iobroker.pondpump/doc/research/wassertemperaturen-im-koiteich.md"},"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md":{"title":{"en":"ioBroker.pondpump — User Manual"},"content":"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md"}}}
---
# Wassertemperaturen im Koiteich

**Biologische Grenzwerte, Krankheitsfenster, Jahres- und Tagesgang, Wärmephysik, Heizen und Kühlen, Messung und Steuerung**

> Begleitdokument zu „Teichpumpen-Durchfluss nach Wassertemperatur und Wetter" · Stand: 10. September 2026 ·
> Recherche-Basis: rund 90 Suchanfragen und etwa 150 ausgewertete Quellen (WOAH/OIE-Handbücher, FAO,
> Universitäts-Extension, Fachzeitschriften, DWD-Klimadaten, Koi-Fachhändler, deutsche und britische Koi-Foren mit
> Messreihen). Zahlen, die aus Formeln oder Quellenwerten abgeleitet wurden, sind als **[eigene Berechnung]**
> markiert; Forenmessungen sind als **[Forum]** gekennzeichnet; Zitate aus englischsprachigen Quellen sind übersetzt.
> Quellenkürzel [T1] … [T93] verweisen auf das Verzeichnis am Ende.
>
> **Original-PDF:** [`../Wassertemperaturen_im_Koiteich.pdf`](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/Wassertemperaturen_im_Koiteich.pdf). Diese
> Markdown-Fassung ist die durchsuchbare/greppbare Referenz im Repo und die Grundlage der **Koi-Temperatur-Farbskala**
> im PumpVisual-/PumpScheduler-Widget (`tempColor` in `src-widgets/src/graphics.tsx`).

## 0. Kurzfassung

Koi sind Karpfen, und Karpfen sind eurytherm: Wildkarpfen überleben nachweislich Monate bei 0–4 °C unter Eis und
fressen noch bei 3 °C, ihre Vorzugstemperatur im Labor liegt bei 27–32 °C, die kritischen Maxima bei 40–43 °C. Die
Praxis der Koihaltung setzt engere Grenzen, und das aus guten Gründen: Ein hoch gezüchteter, in Japan warm
aufgezogener Koi hat weniger Reserven als ein Wildkarpfen, und in einem dicht besetzten Teich mit Biofilter
entscheiden nicht die Fische allein, sondern das Zusammenspiel von Sauerstoff, Krankheitserregern, Immunsystem und
Filterbiologie. Daraus ergibt sich eine Skala mit sechs Bändern: unter 2 °C lebensgefährlich, 2–4 °C Grenzbereich,
4–8 °C Winterruhe, 8–13 °C das gefährliche „Aeromonas-Fenster", in dem Erreger aktiv sind, das Immunsystem aber
nicht, 13–17 °C Übergang, 17–28 °C Normalbereich mit dem Wachstumsoptimum bei 23–26 °C, 28–30 °C Hitzestress mit
Sauerstoff als limitierendem Faktor, über 30 °C Gefahr. Die drei wichtigsten Krankheitsfenster sind scharf belegt:
SVC bei 11–17 °C, KHV bei 16–25 °C (Mortalität bis 28 °C, nicht mehr bei 29–30 °C), CEV bei 15–25 °C (Koi-Form)
beziehungsweise 6–12 °C (Karpfen-Form).

Ebenso wichtig wie die Absolutwerte ist die Änderungsrate: mehr als 2 °C je 24 Stunden gilt in der deutschen
Koi-Szene als Stress, 3–4 °C plötzlich als Schock; physiologisch steigt das Stresshormon Cortisol bereits bei
Erwärmung um 0,6 °C je Stunde, bei Abkühlung nicht. Unabgedeckte westdeutsche Koiteiche von 1,5 m Tiefe laufen in
normalen Jahren zwischen 3–6 °C im Februar und 22–26 °C im Juli/August, liegen im Sommer 1–3 K und im Herbst
2–4 K über dem Monatsmittel der Luft und folgen der Luft mit einer Zeitkonstante von etwa 2–4 Tagen; in Hitzewellen
erreichen 1,2–1,4 m tiefe Teiche 28–30 °C, 2 m tiefe bleiben bei 23–26 °C; in Kältewellen fallen Teiche mit laufender
Umwälzung auf 0,3–2 °C, während ein ruhiger Teich unter geschlossener Eisdecke am Grund 4 °C hält. Eine Abdeckung
hebt die Wintertemperatur um 2–6 K und drückt die Tagesschwankung von etwa 2 K auf 0,1–0,2 K. Heizen kostet
1,16 kWh je Kubikmeter und Kelvin; ein unabgedeckter Teich auf 6 °C braucht im Winter etwa 60 W je Kubikmeter
Dauerleistung, ein abgedeckter mit Ziel 4–6 °C kommt meist mit 30–40 W/m³ aus, die kaum je anspringen. Für die
Steuerung folgt: Regelfühler in 50–100 cm Tiefe, Zweitfühler am Grund, 24-h-Mittel für Schwellen, Hysterese um
0,4 K, Alarm bei Änderungsraten über 2 K/Tag, und als Führungsgröße nicht ein Sollwert, sondern das Vermeiden des
8/10–13 °C-Fensters in beide Richtungen.

## 1. Die Temperaturskala der Koi

> *Abbildung 1 (im Original-PDF): Temperaturskala für Koi – Zustand, Krankheits- und Parasitenfenster,
> Bewirtschaftungsfenster. Bänder nach den in Kapitel 1 und 2 belegten Quellen; Grenzen sind Übergänge, keine Sprünge.*

### 1.1 Toleranzgrenzen: Wissenschaft gegen Praxis

Die Laborwerte des Karpfens liegen weit außerhalb dessen, was ein Teich je erreicht. Für Jungkarpfen, die an 25, 30
und 35 °C angepasst waren, maßen Chatterjee et al. (2004) kritische Maxima von 39,7, 40,6 und 42,9 °C und kritische
Minima von 8,4, 8,6 und 10,2 °C – die Minima sind so hoch, weil warm angepasste Fische gemessen wurden [T1].
Umgekehrt zeigt die Kälteseite: Zierkarpfen (Koi) haben je nach Akklimatisation kritische Minima von 2,6–7,4 °C [T2],
kalt akklimatisierte Karpfen „können mehrere Monate Exposition gegenüber niedrigen Temperaturen von 0–4 °C
überleben" [T3], und in österreichischen Karpfenteichen unter Eis wurden über drei Winter Wassertemperaturen von
1,0 bis 3,7 °C gemessen, bei denen die Karpfen „deutlich aktiv" blieben, bei 3,1 °C nachweislich fraßen und höchstens
3,8 % Gewicht verloren [T4]. Die mitteleuropäische Karpfenteichwirtschaft überwintert bei 4–8 °C; Gewichtsverluste
von 5–10 % gelten dort als typisch [T5]. Jede Erwärmung der Akklimatisationstemperatur um 3 °C hebt die letale
Obergrenze um etwa 1 °C [T6]; die höchsten Toleranzwerte erreicht man mit einer Aufheizrate von 1 °C je Tag [T7].
Behördliche Zusammenstellungen nennen für Karpfen ein chronisches Limit von 32 °C, ein akutes von 37 °C und eine
Meidetemperatur von 34,5 °C [T8].

Die Koi-Praxis zieht ihre Untergrenze deutlich höher, und die Quellen sind sich uneins: K.O.I. sieht Koi unter 5 °C in
Winterstarre und „um 2 °C über längere Zeit dem Tod nahe" [T9]; Syd Mitchell nennt Temperaturen „unter etwa 4 °C
eine Gefahr für das Leben der Koi" und setzt seine Heizung auf 4 °C [T10]; Koi-Consult hält 4 °C für gut überstehbar,
sofern der Rest des Jahres warm genug und schwankungsarm ist [T11]; Genesis setzt 5 °C als Minimum für längere Zeit
und 30 °C als Maximum [T12]; Koi-Company warnt, dass „Temperaturen unter 6 °C bereits bei Einzeltieren zum Tod
führen können" [T13]. Die Erfahrungsberichte der Foren [Forum] reichen von einem 54-m³-Teich, der 2012 fünf Tage
bei 0,3 °C lag („unter 1 °C … ein Glücksspiel"), bis zu Teichen, die bei 0,5 °C am Grund ohne Verluste überwinterten
[T14]. Die Lesart: Physiologisch ist 0–4 °C für Karpfen überlebbar; die Praxisgrenze von 4–6 °C ist eine
Sicherheitsmarge für warm aufgezogene, fettarme Zuchtfische, für Fehler in der Sauerstoffversorgung unter Eis und
für die Parasiten und Pilze, die im kalten Wasser weiter aktiv sind (Kapitel 2).

Nach oben ist die Praxisgrenze 28–30 °C – nicht wegen der Fische, sondern wegen des Wassers: Bei 28 °C wird „die
Menge Sauerstoff, die sich im Wasser lösen lässt, zum limitierenden Faktor" [T9]; Händler nennen 27 °C als Maximum
oder „28 °C nicht überschreiten" [T15], Genesis 30 °C [T12]. Dass Karpfen im Labor 27–32 °C bevorzugen [T8][T16],
erklärt, warum Koi an heißen Tagen scheinbar unbeeindruckt bleiben, bis nachts der Sauerstoff knapp wird.

### 1.2 Winterruhe und Überwinterungsziele

Unter etwa 5 °C sinken Koi in eine Winterstarre, in der sie „ihre Energie sparen, indem sie kaum schwimmen … im
relativ warmen Wasser nahe dem Grund" [T17]. Das warme Wasser am Grund ist das 4-°C-Wasser des Dichtemaximums
(Kapitel 3.5). Für die Zieltemperatur beheizter oder abgedeckter Teiche gibt es drei Schulen, die sich nur in einem
Punkt einig sind – dem Bereich, den man meiden soll:

Die **Kaltüberwinterung** hält 4–6 °C (deutsche Foren, Mitchell), Koi-Company mindestens 6 °C am Teichboden,
Niederrhein-Koi „im Idealfall zwischen 5 und 10 Grad … und konstant" [T13][T18]. Die **Warmüberwinterung** hält
mindestens 13 °C (britische Szene, „13 °C Minimum, um das Immunsystem zu stützen") oder 14–16 °C (Koi-Company:
„die Gefahr eines Energiemangels im Frühjahr deutlich minimiert") [T19][T13]. **Beide meiden das Zwischenfenster:**
„Der Bereich zwischen 10 und 13 °C ist problematisch, weil Keime aktiv sind, das Immunsystem der Koi aber noch nicht
ausreichend arbeitet" (Koi-Company); „entweder unter 10 °C oder über 13 °C" (Genesis); „der Temperaturbereich
zwischen 6–12 Grad Celsius ist der ungünstigste" (Forum); britische Halter nennen 14–19 °C zusätzlich als
„problematischsten" Bereich, weil die Fische fressen wollen, aber schlecht verdauen [T13][T12][T20][T19]. K.O.I.
formuliert die Strategie: entweder das ganze Jahr über 13 °C halten oder nach einer Übergangsphase im Herbst „zügig
auf 4 °C abkühlen" [T17]. Koi aus japanischer Aufzucht, die „in überdachten und beheizten Systemen zügig
großgefüttert" wurden, müssen an niedrige Temperaturen besonders vorsichtig gewöhnt werden [T21].

### 1.3 Immunsystem und das „Aeromonas-Fenster"

Die Immunabwehr des Karpfens ist temperaturabhängig, und zwar auf zwei Ebenen. Die unspezifische Abwehr arbeitet
auch kalt; die spezifische, antikörpervermittelte Abwehr wird durch Kälte gebremst: Bei Karpfen zwischen 12 und
24 °C verzögerten sinkende Temperaturen den Höhepunkt der Antikörperantwort, und das immunologische Gedächtnis
war bei 24 und 20 °C nachweisbar, bei 18 °C aber „verloren" [T22]; niedrige Temperaturen „beeinträchtigen
spezifische Immunantworten, die durch T-Helferzellen vermittelt werden" [T23]. Die Hobby-Literatur verdichtet das zu
Schwellen: „Unterhalb von etwa 12,8 °C finden sich keine weißen Blutkörperchen im Blut der Koi" (K.O.I.; ohne
Primärquelle) [T17], das Immunsystem sei unter 12 °C „sehr stark beeinträchtigt" [T10], arbeite bei 18 °C „mit weniger
als 50 % Effizienz" [T24], werde „erst ab etwa 14–15 °C richtig leistungsfähig" [T13] und sei „je näher an 18 °C und
darüber, desto aktiver" [T25]. Die Gegenseite, vor allem Aeromonas-Bakterien, ist ab etwa 4,4 °C aktiv und erreicht
ihr Aktivitätsmaximum um 15,6 °C [T17]; ein aktueller Review beschreibt für Aeromonas die höchste
Virulenzgen-Expression bei 28 °C und die höchste Protease-Aktivität bei 18 °C [T26]. Daraus entsteht die „Aeromonas
Alley": je nach Autor 4,4–12,8 °C (K.O.I.), 5,6–16,7 °C (US-Händler), 10–13 °C (Koi-Company, Genesis) oder 6–12 °C
(deutsche Foren) [T17][T24][T13][T20]. Für die Steuerung ist weniger die exakte Grenze wichtig als die Konsequenz:
Dieses Fenster wird im Herbst und im Frühjahr zwangsläufig durchquert – möglichst zügig, mit stabiler Temperatur,
ohne Fütterungs- und Behandlungsfehler, und nie als Dauerzustand.

### 1.4 Fütterung, Verdauung, Wachstum

Karpfen wachsen bei 23–30 °C am besten (FAO) [T27]; Jungkarpfen wuchsen bei 20 und 24 °C besser als bei 16 und
28 °C, ihre Futteraufnahme stieg von 16 bis 24 °C und stagnierte darüber [T28]; für Koi-Larven war 26 °C günstiger als
28 oder 30 °C [T29]; als Wachstumsoptimum wird 27 °C genannt [T8]. Nach unten liegt die Wachstumsschwelle
wildlebender Karpfen bei etwa 8 °C, bei 12 °C sind noch 0,7 % Körpermasse Zuwachs je Tag beobachtet worden [T30].
Der Verdauungsapparat ist der Engpass: Händlerangaben zur Verdauungsdauer lauten 48–72 Stunden bei 10 °C,
12–24 Stunden bei 20 °C, 6–12 Stunden bei 25 °C [T31]; eine Tierärztin verlangt, dass der Teich bei 13–18 °C
mindestens fünf Stunden in diesem Bereich bleibt, damit eine Mahlzeit verdaut wird [T32].

Die Fütterungsschwellen der Praxis streuen entsprechend: K.O.I. und Kodama stoppen bei 10 °C, die meisten deutschen
Händler bei 8 °C (Bachflohkrebse: „Unter 8 Grad Celsius darf nicht mehr gefüttert werden"; Hanako: „unter etwa 8 bis
10 °C"), Koifriend erst unter 5 °C, Koiparadise unter 4 °C [T33][T34][T35]. Dazwischen liegt das Weizenkeimfutter
(8/10–15 °C), ab 15–18 °C normales Futter, bei 22–26 °C drei- bis viermal täglich, über 28 °C reduziert und über 30 °C
gar nicht [T31][T35]. Rationsgrößen: etwa 1 % Körpermasse je Tag unter 15 °C, 2 % bei 20 °C, 3 % bei 25 °C [T35].
Dass Karpfen wissenschaftlich auch bei 3–8 °C fressen [T4][T30], widerlegt die Praxisregel nicht: Sie ist eine
Vorsichtsmaßnahme gegen unverdautes Futter im Darm, Ammoniak im kalten Wasser und die noch inaktive
Filterbiologie.

### 1.5 Fortpflanzung

„Das Laichen des europäischen Karpfens beginnt, wenn die Wassertemperatur 17–18 °C erreicht"; optimal sind
18–22 °C, die Embryonalentwicklung dauert bei 20–23 °C etwa drei Tage (60–70 Tagesgrade) [T36]. Im Koiteich fällt
das in den Mai und Juni („unter etwa 18 °C passiert meist wenig") und bringt Verletzungen, Sprünge, Eiweißeintrag
und Sauerstoffzehrung mit sich [T37]; Cortisol und Antikörperspiegel sind in der Laichzeit erhöht [T38]. Für die
Steuerung: Das erste stabile Überschreiten von 18 °C im Frühjahr ist ein sinnvoller Hinweis für Wasserwechsel- und
Sauerstoffbereitschaft.

### 1.6 Temperaturänderungen: Raten und Schocks

Die deutsche Koi-Szene ist sich einig: „Die Wassertemperatur sollte binnen 24 h nicht um mehr als 2 °C schwanken"
(Koi-Consult) [T11]; Koitec24 warnt vor „Temperaturschwankungen von mehr als 2 °C am Tag" und davor, dass
Schwankungen und Temperaturen unter 4 °C das Immunsystem schwächen [T39]; Forenbetreiber heizen und kühlen in
„1–2 °C Schritten pro Tag", „nicht mehr als 2–3 Grad pro Tag" [T40]. Britische Quellen sind großzügiger: Mitchell sieht
einen Anstieg um 4,5 °C in 24 Stunden „an der Grenze dessen, was Koi erleben sollten" [T10]; K.O.I. nennt 3–4 °C
plötzlicher Differenz als möglichen Schock und für den kurzfristigen Umsetzvorgang 0,2 °C je Minute als meist
tolerierbar [T9]. Die Physiologie liefert die Richtung: Karpfen setzten bei einer Erwärmung um etwa 0,6 °C je Stunde
über fünf Stunden vermehrt Cortisol frei, bei Abkühlung nicht [T41] – **Erwärmung ist der stressigere Vorgang, nicht
Abkühlung.** Zwei Sonderfälle: Plötzliche Abkühlung im Frühjahr, wenn der Filter warm eingefahren ist, kostet den
Nitrifizierern überproportional Leistung (siehe Hauptdokument, Kapitel 2.4), und Chilodonella-Ausbrüche folgen
typischerweise einem Kältesturz [T42].

### 1.7 Präferenz, Optimum und Praxis in einer Tabelle

| Größe | Wert | Quelle |
| --- | --- | --- |
| Kritisches Minimum, kalt akklimatisiert | 2,6 °C (Koi); Überleben 0–4 °C über Monate (Karpfen) | [T2][T3][T4] |
| Kritisches Maximum | 39,7–42,9 °C (Akklimatisation 25–35 °C) | [T1] |
| Chronisches Limit / Meidetemperatur | 32 °C / 34,5 °C | [T8] |
| Vorzugstemperatur (Labor) | 27,4–32 °C | [T8][T16] |
| Wachstumsoptimum | 23–30 °C (FAO), 27 °C, Koi-Consult 23–26 °C | [T27][T8][T11] |
| Wachstumsschwelle | ≈ 8 °C | [T30] |
| Laichauslöser | 17–18 °C, optimal 18–22 °C | [T36] |
| Immunsystem eingeschränkt | < 12–13 °C (Hobby); spezifische Antwort verzögert < 20 °C, Gedächtnis verloren bei 18 °C (Labor) | [T17][T22] |
| Aeromonas | aktiv > 4,4 °C, Maximum ≈ 15,6 °C | [T17] |
| Praxisminimum | 2 / 4 / 5 / 6 °C je nach Autor | [T9][T10][T12][T13] |
| Praxismaximum | 27–30 °C | [T15][T12][T9] |
| Zulässige Änderung | 2 °C/24 h (DE), 4,5 °C/24 h (UK-Grenze), 3–4 °C plötzlich = Schock | [T11][T10][T9] |

## 2. Krankheiten und Parasiten nach Temperatur

Die drei meldepflichtigen beziehungsweise überwachten Viruskrankheiten haben scharfe, behördlich dokumentierte
Temperaturfenster; Bakterien, Pilze und Parasiten sind unschärfer.

**Koi-Herpesvirus (KHV, CyHV-3).** Das WOAH-Handbuch: „Die Krankheit ist temperaturabhängig und tritt zwischen
16 und 25 °C auf"; unter Versuchsbedingungen „hohe Mortalität bei 28 °C, aber nicht bei 29 oder 30 °C und nicht bei
13 °C"; permissiv sind Temperaturen „> 17 °C", der Verlauf ist bei 23–25 °C am schnellsten; bei 13 °C bleibt virale DNA
nachweisbar, sodass kalt überlebende Fische Reservoire sein können; infektiöses Virus wurde bei 16 °C länger
ausgeschieden als bei 23 oder 28 °C; für die Diagnose werden Verdachtsfische bei 20–24 °C gehalten [T43]. Gilad et al.
(2003) maßen Mortalitäten von 85 % bei 18 °C, 95 % bei 23 °C und 89–95 % bei 28 °C, keine bei 13 °C; das Umsetzen
exponierter Fische von 13 auf 23 °C löste rasch Sterben aus [T44]. Die „Heilung" durch 30 °C hinterlässt Träger [T45].
Praktische Folge: Das Frühjahrsfenster 16–18 °C ist der klassische Ausbruchszeitpunkt, Neuzugänge gehören bei
20–24 °C in Quarantäne.

**Carp-Edema-Virus (CEV, „Koi-Schlafkrankheit").** WOAH: „zwischen 15 °C und 25 °C … auch bei niedrigeren
Temperaturen berichtet" [T46]. Neuere Arbeiten trennen zwei Formen: „Klinische CEV-Infektionen treten bei Nutz- und
Koikarpfen üblicherweise bei Wassertemperaturen von 6–12 °C beziehungsweise 15–25 °C auf"; ein dokumentierter
Fall zeigte unter Eis bei 2 °C keine Verluste, die begannen, als das Wasser auf 8 °C stieg [T47]. Deutsche Ausbrüche
lagen bei 17–22 °C, britische bis hinunter zu 3 °C, europäische Karpfen erkrankten bei 7–15 °C [T48][T49].

**Frühjahrsvirämie (SVC).** WOAH: „Krankheitsausbrüche bei Karpfen treten im Allgemeinen zwischen 11 und 17 °C
auf. Sie treten selten unter 10 °C auf, und die Mortalität, insbesondere bei älteren Fischen, nimmt ab, wenn die
Temperatur 22 °C übersteigt"; „eine Erhöhung der Wassertemperatur über 19–20 °C kann SVC-Ausbrüche stoppen oder
verhindern"; bei 10 °C bilden sich Antikörper kaum oder erst nach Wochen, bei 20 °C nach einer Woche [T50].

**Bakterien und Pilze.** Columnaris über 15 °C, Karpfenpocken über 14 °C (FAO) [T27]; Saprolegnia („Winterpilz")
schlägt zu, wenn die Temperatur unter 15 °C gefallen ist und im Frühjahr wieder steigt [T51]; Aeromonas siehe 1.3.

**Parasiten.** Ichthyophthirius entwickelt sich „zwischen 5 und 30 °C", Schwärmer schlüpfen bei 25–30 °C nach
16–27 Stunden, bei 5 °C nach 8–9 Tagen; der Zyklus dauert bei 24–26 °C 3–6 Tage [T52][T53]. Costia (Ichthyobodo)
„lebt bei 2 bis 30 °C oder höher, vermehrt sich aber schnell bei 20–25 °C" [T54]. Chilodonella hat ein Optimum bei
etwa 4–10 °C und ist der typische Kaltwasser- und Kältesturz-Parasit [T42][T55]. Trichodina vermehrt sich bei
4–30 °C [T56]. Dactylogyrus-Eier schlüpfen bei 5 °C nicht, holen es aber bei Erwärmung nach [T57]. Lernaea
(Ankerwurm) braucht für die Entwicklung über 20 °C (Optimum 26–28 °C, bei 14 °C keine Vermehrung), Argulus
(Karpfenlaus) beginnt die Eiablage über 10 °C, die Eier brauchen bei 23 °C 17 Tage, bei 20 °C 30 Tage [T58][T59][T60].

| Erreger | Fenster | Bemerkung | Quelle |
| --- | --- | --- | --- |
| KHV (CyHV-3) | 16–25 °C, Mortalität bis 28 °C | nicht bei 13 °C und nicht bei ≥ 29 °C; permissiv > 17 °C; Träger bleiben | [T43][T44][T45] |
| CEV / KSD | 15–25 °C (Koi), 6–12 °C (Karpfen) | UK-Fälle bis 3 °C; DE 17–22 °C | [T46][T47][T48][T49] |
| SVC | 11–17 °C | selten < 10 °C, abnehmend > 22 °C; > 19–20 °C stoppt | [T50] |
| Aeromonas / Pseudomonas | aktiv > 4,4 °C, Maximum ≈ 15,6 °C | Geschwüre im „Fenster" 8/10–13/16 °C | [T17][T26] |
| Saprolegnia | < 15 °C, bei Wiedererwärmung | Winter/Frühjahr | [T51] |
| Ichthyophthirius | 5–30 °C, schnell bei 24–26 °C | Zyklus 3–6 Tage warm, Wochen kalt | [T52][T53] |
| Costia | 2–30 °C, schnell 20–25 °C | auch im Winter aktiv | [T54] |
| Chilodonella | Optimum ≈ 4–10 °C | nach Kältesturz | [T42][T55] |
| Trichodina | 4–30 °C | ganzjährig | [T56] |
| Dactylogyrus | Eier ruhen bei 5 °C | Frühjahrswelle | [T57] |
| Lernaea | > 20 °C, Optimum 26–28 °C | keine Vermehrung bei 14 °C | [T58] |
| Argulus | Eiablage > 10 °C | Eier 17 d bei 23 °C, 30 d bei 20 °C | [T59][T60] |

Die Tabelle zeigt, warum das Fenster 8–17 °C die gefährlichste Phase des Jahres ist: SVC, CEV, Aeromonas,
Saprolegnia, Costia und Chilodonella sind dort aktiv, das spezifische Immunsystem nicht, und der Biofilter ist noch
nicht eingefahren. Über 20 °C dominieren KHV, Lernaea, Argulus und Ich – bei aktivem Immunsystem und
leistungsfähigem Filter.

## 3. Was der Teich physikalisch tut

### 3.1 Wärmebilanz und Kennzahlen

Ein Teich ist ein Wärmespeicher mit einer Deckelfläche, über die fast alle Wärme kommt und geht. Die Bilanz je
Quadratmeter Oberfläche lautet: Sonneneinstrahlung minus langwellige Abstrahlung minus Verdunstung minus
Konvektion an die Luft plus Bodenwärmestrom plus Heizung plus Frischwasser. Die Kennzahlen dazu [eigene
Zusammenstellung aus [T61]–[T66]]:

Die Wärmekapazität des Wassers beträgt 4,18 MJ je Kubikmeter und Kelvin, also 1,16 kWh je m³ und K; ein 30-m³-Teich
braucht je Kelvin 35 kWh [T61]. Der Gesamt-Wärmeübergangskoeffizient einer offenen Wasseroberfläche an die
Atmosphäre liegt nach Seemessungen bei 17–28 W/m²K im Jahresgang [T62]; die Konvektion allein folgt etwa
1,16·(10,45 − v + 10·√v) W/m²K mit der Windgeschwindigkeit v, die langwellige Abstrahlung trägt rund 5 W/m²K bei,
die Verdunstung ein bis zwei Konvektionsanteile [T63]. Daraus folgt die Zeitkonstante τ = ρ·c·Tiefe/U: für 1,5 m
Wassertiefe und U = 20–30 W/m²K rund 2–4 Tage (0,8 m: 1–2 Tage; 2 m: 3–5 Tage); unter Abdeckung sinkt U grob auf
3–8 W/m²K, τ steigt auf 10–20 Tage [eigene Berechnung; U-Werte von Abdeckungen sind nicht gemessen]. Das ist der
Grund, warum die Wassertemperatur dem 3–7-Tage-Mittel der Luft folgt und Tagesspitzen der Luft von 35–40 °C keine
30 °C im Wasser erzeugen. Die Verdunstung beträgt im Sommer 3–7 mm je Tag, bei Wind und Sonne bis 10 mm [Forum]
[T64]; 5 mm entsprechen 12,3 MJ/m² oder 140 W/m² im Tagesmittel – ein Kühlpotenzial von etwa 2 K je Tag bei 1,5 m
Tiefe [eigene Berechnung]. Ein 70 cm tiefer Stadtteich gab in einer durchschnittlichen Sommernacht 2,7 MJ/m² ab,
43 % als Abstrahlung, 39 % als Verdunstung, 11 % als fühlbare Wärme, 0,1–0,3 MJ/m² in den Boden [T65] – bei 1,5 m
Tiefe etwa 0,4 K je Nacht [eigene Berechnung]. Der Boden ist im Winter ein kleiner Wärmelieferant: In 1 m Tiefe liegt
die Bodentemperatur Anfang Februar um 2 °C, in 2 m um 4,5 °C, im August in 1 m bis 20 °C; die Frostgrenze liegt bei
80–120 cm [T66]. Grund- und Brunnenwasser hat 8–11 °C, im Jahresmittel etwa 9–10 °C [T67].

### 3.2 Jahresgang in Westdeutschland

> *Abbildung 2 (im Original-PDF): Monatsmittel der Lufttemperatur (DWD-Klimanormal 1991–2020, Düsseldorf) und
> typische Bandbreite der Wassertemperatur in 1 m Tiefe eines 1,5 m tiefen, unabgedeckten, umgewälzten Koiteichs,
> zusammengestellt aus Forenmessreihen 2020–2026 (Unsicherheit ± 2 K; Punktmessungen, kein Klimamittel).*

Die DWD-Normalwerte 1991–2020 für Düsseldorf lauten (Januar bis Dezember) 3,5 / 4,0 / 6,9 / 10,5 / 14,3 / 17,3 /
19,4 / 18,9 / 15,2 / 11,2 / 7,1 / 4,2 °C, Jahresmittel 11,0 °C, mit 52 Frosttagen, 5,7 Eistagen und 10,2 heißen Tagen je
Jahr; Essen-Bredeney und Bochum liegen 0,4–0,5 K darunter [T68]. Die Sammelthreads „Wie kalt/warm ist es bei euch
– Temperaturen im Teich" des Hobby-Gartenteich-Forums mit Hunderten Einzelmessungen wiederkehrender Teiche
(14–130 m³, 1,3–2,6 m tief, Hessen, NRW, Berlin, Brandenburg, Bayern) ergeben dazu folgendes Bild [Forum] [T69]:

| Monat | Luft Ø Düsseldorf | Wasser typisch (1 m) | Beobachtete Extreme |
| --- | --- | --- | --- |
| Januar | 3,5 | 4–6 | 2–3 in Kältewellen; 0,3–1 in 2-m-Teichen mit laufender Pumpe (2012) |
| Februar | 4,0 | 3–6 | 1,7 (Brandenburg, −7 °C Luft); 3,0 unter Eis trotz 12,7 °C Luft |
| März | 6,9 | 6–12 | Mitte März bei Sonne 11–12 |
| April | 10,5 | 10–15 | – |
| Mai | 14,3 | 15–20 | 18–21 Mitte Mai 2022 |
| Juni | 17,3 | 19–24 | 27–28 bei 39–40 °C Luft (2026) |
| Juli | 19,4 | 22–26 | 28–30 bei 1,3–1,4 m; 23–26 bei 2 m |
| August | 18,9 | 21–26 | 22–25 NRW/Hessen 2020; 27–28 Berlin |
| September | 15,2 | 17–20 | Wasser 2–4 K über Luft (Nachlauf) |
| Oktober | 11,2 | 12–17 | Anfang Oktober 14–17, Ende Oktober 10–12 |
| November | 7,1 | 7–10 | Monatsmittel 7,9 (54 m³, 2011) |
| Dezember | 4,2 | 4–7 | 2–5 in der Kältewelle Dezember 2022 |

Drei Regelmäßigkeiten fallen auf. Im Sommer liegt das Wasser 1–3 K über dem Luft-Monatsmittel (Strahlungsgewinn),
im Herbst 2–4 K darüber (Wärmeträgheit), im Winter 1–3 K darüber (Bodenwärme, Dichteanomalie). Das Wasser folgt
der Luft mit mehreren Tagen Verzögerung – Nachtminima von 7–8 °C Luft senken einen 20-°C-Teich nicht, Tagesmaxima
von 39 °C heben ihn um 1–2 K. Und die Tiefe entscheidet über die Sommermaxima: 1,2–1,4 m tiefe Teiche erreichten in
den Hitzewellen 2020, 2022 und 2026 28–30 °C, 1,5–1,6 m tiefe 26–28 °C, 2 m und tiefere 23–26 °C [T69]. Zum
Vergleich: Der flache Altmühlsee erreichte 2022 ein Winterminimum von 1,1 °C und ein Sommermaximum von 28,3 °C,
der tiefere Schliersee 2,2 und 24,9 °C [T70].

### 3.3 Tagesgang und Schichtung

Die Wassertemperatur schwankt in typischen Koiteichen um 1–3 K je 24 Stunden, mit Minimum kurz vor
Sonnenaufgang und Maximum gegen Sonnenuntergang [T71]. Unter Abdeckung schrumpft das auf 0,1–0,2 K: „ohne
Abdeckung Temperaturschwankungen von bis zu 2 Grad pro Tag/Nacht. Mit Abdeckung und isolierter Teichwand
maximale Schwankungen von 0,1–0,2 Grad" [Forum] [T72]. Die Vertikale hängt vom Betrieb ab: Bei laufender
Umwälzung messen Halter zwischen 1 und 2 m Tiefe 0,2–0,3 K Unterschied, „oben und unten immer gleiche
Temperatur" [Forum] [T73]; ohne Umwälzung baut sich im Sommer tagsüber eine Schichtung auf (70-cm-Stadtteich:
25,2 °C oben, 20,8 °C unten zu Nachtbeginn; kleine Seen schichten an 64 % der Sommertage tagsüber und mischen
nachts konvektiv), morgens ist der Grund 1–1,5 K kühler als 1 m [T65][T74][T69]. Die oberste Schicht (5–15 cm) weicht
deutlich ab: 2,8 °C in 10 cm gegen 4,8 °C am Grund im Januar, 19 °C in 10 cm bei 8 °C Luft an einem Augustmorgen
[Forum] [T69] – ein Schwimmthermometer misst diese Schicht, nicht den Teich.

### 3.4 Tiefe, Volumen, Abdeckung

Die Mindesttiefen der Händler: Hanako 1,30 m Minimum, 1,50 m Standard, 1,60–2,50 m optimal – „ab ca. 1,30 m
bildet sich unter dem Eis eine stabile Schicht mit ca. 4 °C"; Koigarten Müller mindestens 1,50 m für Koi,
Frostsicherheit ab 1,30 m; Koi-Consult 1,8–2 m [T75][T76][T11]. Die Messungen stützen das nur zur Hälfte: Für die
Sommermaxima ist Tiefe entscheidend (3.2), für das Winterminimum zählt mehr die Ruhe als die Tiefe – ein nur 90 cm
tiefer, stehender Teich unter 10 cm Eis blieb bei 4,1 °C, 2 m tiefe Teiche mit laufender Pumpe fielen 2012 auf
0,3–0,5 °C [Forum] [T14][T77].

Die Abdeckung (Noppenfolie, Doppelstegplatten, Styrodur, Folientunnel, PE-Bälle) ist der wirksamste Einzeleingriff.
Forenmessungen unbeheizter, abgedeckter Teiche: 7 °C bei 0–1 °C Außenluft, 7,5 °C ohne Zuheizen unter Doppelsteg
plus Styrodur, 4,5 °C unter Styrodur bei Frost, aber auch 2,3 °C und „2–4 Grad am Teichboden" unter Noppenfolie
[Forum] [T72][T78]; beheizt abgedeckte Teiche blieben bei −10 °C Luft über 10 °C. Herstellerangaben – Noppenfolie
„bis zu 60 %" weniger Wärmeverlust, PE-Bälle „bis zu 90 %" weniger Wärmeaustausch und bis 75 %
Heizkostenersparnis – sind nicht unabhängig belegt; Koigarten Müller schreibt Abdeckbällen nur „eine geringe
Dämmwirkung" zu [T75][T76]. Nasser Schnee auf der Abdeckung kühlt den Teich, weil er das Dämmmaterial nass und
leitfähig macht [Forum] [T72].

### 3.5 Winter im Detail: Dichteanomalie, Eis, Umwälzung

Wasser ist bei 3,98 °C am dichtesten; „unterhalb einer Temperatur von etwa 4 °C sinkt Oberflächenwasser nicht nach
unten" [T79]. Ein ruhender Teich kühlt deshalb bis zur vollständigen Durchmischung auf 4 °C ab, danach bleibt das
4-°C-Wasser am Grund, kälteres Wasser schichtet sich darüber, und erst dann bildet sich Eis. Die Eisdecke isoliert:
Unter geschlossenem Eis blieb ein 1-m-Messpunkt bei zweistelligem Frost „immer noch über vier Grad", das Eis wuchs
in zehn Frosttagen auf 22 cm, im Extremwinter bis 50–60 cm bei 1,2 m Bodenfrost [Forum] [T69][T14]. Zwei Dinge
zerstören das Refugium: Sprudler und Umwälzung („Sprudler zerstört Schichtung in 3 Stunden"; „mit laufender Pumpe
unter 1 °C gemessen"; „bei laufenden Anlagen wird es keine echte Temperaturschichtung geben") [Forum]
[T69][T77][T73] und – bei umgepumpten, unabgedeckten Teichen – der Wärmeverlust über die Oberfläche, weil
„permanent über die Bodenabläufe wärmeres Wasser vom Boden abgesaugt … und an der mit der Umgebungstemperatur
korrespondierenden Oberfläche diesem wieder zugeführt wird" [T80]. Der Betreiber muss sich also entscheiden:
ruhender Teich mit Eisloch und 4-°C-Zone, oder umgewälzter Teich, der dann abgedeckt oder beheizt sein sollte (siehe
Hauptdokument, Kapitel 5).

## 4. Heizen und Kühlen

### 4.1 Energiebedarf und Heizleistung

Die Grundrechnung ist einfach: 1,16 kWh je Kubikmeter und Kelvin. Ein 25-m³-Teich braucht je Kelvin 29 kWh, ein
30-m³-Teich 35 kWh [T61][T83]. Schwieriger ist die Verlustleistung, und dafür gibt es einen belastbaren Praxisfall
[Forum] [T81]: Ein 62-m³-Teich, 3 m tief, unabgedeckt, wurde mit einem 8,4-kW-Elektroheizer auf 6 °C gehalten; in 60
Wintertagen lief der Heizer 628 Stunden, also rund 5 300 kWh oder 88 kWh je Tag – im Mittel 3,7 kW Dauerleistung,
etwa 60 W je Kubikmeter, für rund 1 000–1 500 € je Winter [eigene Ableitung aus den Forumsangaben]. Bezogen auf
die Oberfläche von etwa 21 m² sind das 176 W/m² bei rund 8 K Differenz zur Luft, also ein Wärmeübergang von etwa
22 W/m²K – genau der Wert, den die Seemessungen liefern (3.1) [eigene Berechnung]. Abgedeckte Teiche brauchen
einen Bruchteil: Halter mit 1–1,2-kW-Heizern an 30–38 m³ (30–40 W/m³) und Ziel 4–6 °C berichten, der Heizer sei
„diesen Winter bisher noch nicht einmal angesprungen" [Forum] [T78][T81]. Ganzjährig warme Teiche kosten
entsprechend mehr: 70 m³ auf 20–24 °C über die Hausheizung etwa 12 000–15 000 kWh Wärme im Jahr (rund 1 200 l
Heizöl, etwa 1 000 €), mit Wärmepumpe bei COP 4 rund 3 000 kWh Strom; Forenbetreiber messen an
Luft-Wärmepumpen COP über 3 ab 10 °C Luft, etwa 4 bei 15 °C und 5 bei 20 °C, ein abgedeckter Teich mit
Erdwärmepumpe kam mit etwa 1 400 kWh Strom im Jahr aus [Forum] [T82]. Die Händler-Faustregeln beziehen sich auf
Anschlussleistung, nicht auf Dauerleistung: Tauchheizer „2 000 W bis 10 000 Liter" (200 W/m³ mit Thermostat),
Heizspiralen als Wärmetauscher 15 kW bis 10 m³ und 30 kW bis 30 m³ (rund 1 kW/m³ für schnelles Aufheizen),
Heizkabel etwa 40 W/m, Heizbälle mit 300/600 W halten „4–6 °C", Regelgenauigkeit ±1 °C [T84][T75]. Für die
Steuerung ist die Umrechnung nützlich: 1 kW in 30 m³ erwärmt um 0,69 K je Tag; ein Frischwasserzulauf ändert die
Temperatur um ΔT = (Zulauf/Volumen)·(T_Zulauf − T_Teich), also bei 7 % Tagesvolumen und 10 K Differenz um 0,7 K je
Tag [eigene Berechnung].

### 4.2 Strategien und Übergänge

Die **Kaltstrategie** hält den Teich ruhig bei 4–6 °C: Abdeckung, Heizung nur als Frostwächter (Sollwert 4–5 °C,
„unter 5 °C" als Auslöser [T75]), Fütterungsstopp unter 8 °C, minimale Umwälzung ohne Tiefenabsaugung, Belüfter
flach. Ein Teil der Szene schaltet bei 2 °C sogar die Heizung ab, „damit sich eine isolierende Eisschicht bilden kann"
[Forum] [T20]. Die **Warmstrategie** hält 13–16 °C oder mehr, braucht zwingend Abdeckung und meist eine
Wärmepumpe, füttert leicht weiter und hat im Frühjahr keinen Reservemangel; sie ist teuer und macht die Anlage vom
Strom abhängig. Für beide gilt der Übergang als kritische Phase: Im Herbst wird abgedeckt, „wenn der Teich 12 Grad"
hat oder Ende Oktober, warm gehaltene Teiche früher [Forum] [T85]; abkühlen darf es mit 1–2 K je Tag, aufheizen im
Frühjahr ebenfalls mit 1 °C je Tag bis 12–13 °C (Koitec24), und das 8/10–13 °C-Fenster wird in beide Richtungen zügig
durchquert, nicht bewohnt [T39][T40][T13]. Die Physiologie gibt dazu zwei Randbedingungen: Erwärmung ist der
stressigere Vorgang (Cortisol ab 0,6 °C/h) [T41], und die maximale Toleranz erreicht man mit 1 °C je Tag [T7].
Hochwertige Japankoi brauchen nach Koi-Consult eine Heizung ohnehin, „um eine Mindesttemperatur im Sommer und
im Winter sicherzustellen und um Temperaturschwankungen klein zu halten (nicht mehr wie 2° in 24 h)" [T11].

### 4.3 Kühlen im Sommer

Die Schwellen der Händler: aktiv belüften ab 26 °C (Hanako), Maximum 27 °C (OlympiaKoi) bzw. „28 Grad nicht
überschreiten", Ideal 23–25 °C (Koitec24) [T86][T15][T39]. Das wirksamste Mittel ist die Bauweise: 2 m Tiefe statt
1,3 m senkt die Hitzewellen-Maxima um 3–5 K (3.2). Danach kommt Beschattung – Sonnensegel oder Ufergehölz, von
Haltern ab 25 °C Wassertemperatur aufgespannt [Forum] [T88]. Frischwasser aus dem Brunnen (8–11 °C) kühlt
messbar, aber langsam: 2 000 l je Tag in einem etwa 50-m³-Teich brachten 0,25 K je Tag; ein Zulauf von etwa 3 % des
Volumens täglich hält einen Teich nach Halterangabe bei etwa 23 °C konstant [Forum] [T87] – die Formel aus 4.1 macht
das nachrechenbar. Verdunstung über Bachlauf oder Wasserfall kühlt nachts, tagsüber bei trockener Luft schwach, bei
Schwüle gar nicht (Hauptdokument, Kapitel 3.2); die Größenordnung liegt bei Zehntelgraden je Nacht. Für Kühlgeräte
und Erdwärmetauscher fand die Recherche keine quantifizierten Erfahrungswerte, für einen Kühlradiator die Aussage,
der Effekt sei „nur gering" [Forum] [T88]. Was bleibt, ist Lastreduktion: weniger Futter über 26–28 °C, keines über
30 °C, maximale Belüftung, keine Nachtabsenkung des Filters.

## 5. Messen und Steuern

### 5.1 Sensorplatzierung und Genauigkeit

Wo der Fühler sitzt, entscheidet über den Messwert. Die obersten 10 cm zeigen Sonne und Tagesgang (3.3), der Grund
im Winter die 4-°C-Zone, dazwischen liegt die repräsentative Temperatur. Erfahrene Halter messen mit
Industriefühlern in 50 cm, in 100 cm oder in 180 cm plus 5 cm, dazu die Luft in 2 m und 5 cm Höhe [Forum] [T89]; für
die Regelung eignet sich ein Fühler in 50–100 cm Tiefe, ein zweiter am Grund für den Winter und optional ein dritter in
5–10 cm für die Sommeroberfläche. Die Filterkammer ist bei laufender Umwälzung gleichwertig („identische Werte",
„keinen Unterschied" zwischen Bürstenkammer und Teich) [Forum] [T90], bei abgeschaltetem oder gedrosseltem Filter
im Winter dagegen kälter als der Teich. Der DS18B20 hat ±0,5 °C Genauigkeit bei 0,0625 °C Auflösung, Pt1000 der
Klasse A ±(0,15 + 0,002·|t|) °C, Klasse B ±(0,3 + 0,005·|t|) °C [T91]. Für Absolutschwellen reicht der DS18B20; für
Differenzmessungen (Oberfläche gegen Grund, 0,2–1 K) müssen Fühlerpaare im Eiswasserbad abgeglichen oder
Pt1000 Klasse A eingesetzt werden. Praxishinweise: Offset in der Steuerung hinterlegen und alle paar Monate prüfen,
Biofilm vom Fühler wischen, Kabelfühler können unter Eis Fehlwerte liefern (Beispiel: 7 °C angezeigt bei fast
geschlossener Eisdecke) [Forum] [T90][T89]. Der Außenfühler gehört in eine Wetterschutzhülle auf die Nordseite
[T92]. Ein Genesis-Heizungsregler arbeitet mit Sollwert 5,5 °C und Schaltpunkten 5,3/5,7 °C, also 0,4 K Hysterese
[Forum] [T69] – eine brauchbare Vorgabe.

### 5.2 Steuerungsrelevante Schwellen

Weil der Teich eine Zeitkonstante von Tagen hat, gehört jede Schwelle auf ein gleitendes 24-h-Mittel mit 0,4–1 K
Hysterese; Momentanwerte taugen nur für Alarme. Die Bänder, zusammengeführt aus Kapitel 1–4 und dem
Hauptdokument [eigene Synthese]:

| Wassertemp. (24-h-Mittel) | Zustand | Pumpe/Filter (Hauptdok.) | Fütterung | Heizen/Kühlen | Alarme und Hinweise |
| --- | --- | --- | --- | --- | --- |
| < 2 °C | lebensgefährlich | Q_min, kontinuierlich, nie takten | keine | Frostwächter hat versagt | Alarm; Eisloch prüfen; nichts verändern |
| 2–4 °C | Grenzbereich | Q_min; Ansaugung 30–60 cm unter Oberfläche | keine | Heizung auf 4–5 °C, sofern vorhanden | Warnung; Costia/Chilodonella möglich, aber nicht behandelbar |
| 4–8 °C | Winterruhe (Kaltziel 4–6 °C) | 40–50 % | keine (Bachflohkrebse, Hanako); K.O.I. bis 10 °C | Abdeckung; Heizung als Frostwächter | CEV-Karpfenform ab 6 °C; Änderungsrate ≤ 2 K/Tag überwachen |
| 8–13 °C | „Aeromonas-Fenster" | 50–70 % | Weizenkeim 1–2×/Woche bis 1×/Tag | zügig durchqueren, 1–2 K/Tag; nicht als Sollwert | SVC ab 11 °C; Geschwüre; Immunsystem aus; Filter unreif |
| 13–17 °C | Übergang | 70–90 % | Weizenkeim/leicht, 1×/Tag | Warmziel ≥ 13–16 °C | Aeromonas-Maximum 15,6 °C; CEV-Koiform ab 15 °C; KHV ab 16 °C |
| 17–23 °C | Normalbereich | 100 % | normal, 2–3×/Tag | – | Laichen 17–22 °C; KHV-Fenster; Quarantäne 20–24 °C |
| 23–26 °C | Optimum | 100 %, Belüftung nachts | 3–4×/Tag | Sommer-Obergrenze der Heizung | KHV-Mortalitätsmaximum; Lernaea/Argulus |
| 26–28 °C | Hitzestress beginnt | 100 %, Belüftung maximal | reduziert | Beschattung, Frischwasser | Sauerstoff morgens messen; Bachlauf nur nachts |
| 28–30 °C | Hitzestress | 100 %, Belüftung maximal | stark reduziert | Kühlen aktiv | O₂-Alarm; keine Behandlungen |
| > 30 °C | Gefahr | 100 %, Belüftung maximal | keine | Notkühlung (Frischwasser, Schatten) | Alarm; Änderungsrate beachten (1 K/Tag) |

Zwei Regeln quer über alle Bänder: Eine Änderung von mehr als 2 K je 24 Stunden löst eine Warnung aus, unabhängig
vom Band; und jede Behandlung (Medikamente, Salz, Parasitenmittel) ist temperaturgebunden – die meisten Mittel
wirken oder dürfen erst über 12–15 °C eingesetzt werden, was hier nur als Hinweis auf die Herstellerangaben vermerkt
ist.

### 5.3 Ein einfaches Prognosemodell

Für Vorwarnungen („Teich unterschreitet in vier Tagen 8 °C – Abdeckung?") genügt ein Einknotenmodell [eigene
Ableitung, Struktur nach dem air2water-Modell für Seen [T93]]:

```text
T_w(t+1) = T_w(t) + Δt/τ · (T_gleich − T_w(t))
```

mit T_gleich ≈ Lufttemperatur (3–7-Tage-Prognosemittel) plus Jahreszeit-Offset (Sommer +1 bis +3 K, Herbst +2 bis
+4 K, Winter +1 bis +3 K, aus 3.2) und τ = 2–4 Tage für den offenen 1,5-m-Teich beziehungsweise 10–20 Tage unter
Abdeckung. Die beiden Parameter lassen sich aus den eigenen Messreihen des Teichs anpassen (τ aus der Abklingzeit
nach einem Wettersturz, der Offset aus dem Monatsvergleich Wasser gegen Luft); das ist ehrlicher als jeder
Literaturwert, weil Beschattung, Wind und Bodenkontakt jeden Teich anders machen. Heizung und Frischwasser gehen
additiv ein (4.1). Das Modell kennt weder Eisbildung noch Schichtung; unterhalb von 4 °C und bei ruhendem Teich
gelten die Regeln aus 3.5.

## 6. Konsens, Dissens und Lücken

Konsens besteht bei den Krankheitsfenstern (WOAH, FAO, Universitäten), bei der Physik (Dichteanomalie,
Wärmekapazität, Zeitkonstante), bei der Änderungsrate von etwa 2 K je Tag als Komfortgrenze, beim Sommermaximum
von 27–30 °C und bei der Ächtung des Zwischenfensters 8/10–13 °C für die Überwinterung. Dissens besteht beim
Praxisminimum (2, 4, 5 oder 6 °C), bei der Fütterungsschwelle (4, 5, 8 oder 10 °C), bei der Lage des
„Aeromonas-Fensters" (4,4–12,8, 5,6–16,7, 6–12 oder 10–13 °C), bei der Einschalttemperatur des Immunsystems
(12,8, 13, 14–15 oder 18 °C), bei der KHV-Obergrenze (25 oder 28 °C) und beim „Optimum" (15–25 °C nach K.O.I.,
23–26 °C nach Koi-Consult, 27–32 °C Vorzugstemperatur im Labor). Diese Streuung ist kein Widerspruch, sondern
spiegelt unterschiedliche Fische (Wildkarpfen gegen japanische Zuchtkoi), unterschiedliche Anlagen (Teichwirtschaft
gegen dicht besetzten Filterteich) und unterschiedliche Risikobereitschaft. Lücken: Für die 12,8-°C-Schwelle der
weißen Blutkörperchen gibt es keine auffindbare Primärquelle; U-Werte von Teichabdeckungen sind nicht gemessen;
Kühlgeräte und Erdwärmetauscher sind nicht quantifiziert; die Forenmessreihen sind Punktmessungen mit unbekannter
Sensorqualität, kein Klimamittel; DWD-Bodentemperaturnormale für NRW waren nicht abrufbar;
Chilodonella-Temperaturbereiche aus peer-reviewten Quellen blieben hinter Bezahlschranken. Für eine konkrete Anlage
fehlen: Tiefe, Volumen, Oberfläche, Abdeckung, Heizung, Herkunft der Fische und die eigene Messreihe – mit ihr lassen
sich τ und Offset aus 5.3 in wenigen Wochen bestimmen.

## Quellen

- [T1] Chatterjee et al. (2004), *Thermal tolerance and oxygen consumption of Labeo rohita and Cyprinus carpio early fingerlings*, J. Thermal Biology 29.
- [T2] Yanar, Erdoğan & Kumlu (2019), *Thermal tolerance of thirteen ornamental fish species*, Aquaculture.
- [T3] Long et al. (2020), *Frontiers in Genetics* – Kältetoleranz des Karpfens.
- [T4] Bauer & Schlott (2004), *Overwintering of farmed common carp in ponds* (Radiotelemetrie), Aquaculture 241.
- [T5] *Sustainability* (2022) 14:3724, Überwinterung von Karpfen in Teich und Kreislaufanlage.
- [T6] Opuszyński et al. (1989), *Upper lethal temperatures of juvenile carp*.
- [T7] Golovanov & Smirnov (2007), *Journal of Ichthyology*.
- [T8] Nevada Division of Environmental Protection, *Carp thermal tolerance compilation*.
- [T9] Koi Organisation International (C. Neaves), *Water Temperature and Koi*.
- [T10] S. Mitchell (mankysanke), *Heating koi ponds*.
- [T11] Koi-Consult, *Regelwerk für den Bau von Koi-Teichen*.
- [T12] Genesis, *Bei welcher Temperatur man Koi besser nicht überwintert*.
- [T13] Koi-Company, *Überwinterung / optimale Wintertemperatur / ideale Überwinterungstemperatur*.
- [T14] Koi-Live-Forum, *Wintertemperatur – Erfahrungsbericht*.
- [T15] Koi-Live-Forum, *Maximale Wassertemperatur*.
- [T16] Jobling (1981), *Temperature tolerance and the final preferendum*.
- [T17] Koi Organisation International (S. Mitchell), *The Science behind Cold Water in Koi Ponds*.
- [T18] Niederrhein-Koi, *Koi-Überwinterung – Wassertemperatur*.
- [T19] koiforum.uk, *Minimum heated temperature recommendations*.
- [T20] Hobby-Gartenteich-Forum, Thread 51374 (6–12 °C ungünstig); Koi-Live-Forum, *Optimale Temperatur im Winter*.
- [T21] koifuttershop.de, *Koi-Innenhälterung*.
- [T22] Rijkers et al. (1980), *Temperature dependence of the immune response in carp*, Immunology.
- [T23] Le Morvan et al. (1998), J. Exp. Biol. 201:165.
- [T24] Kloubec Koi / POND Trade, *Aeromonas Alley*.
- [T25] Cuttlebrook Koi Farm, *To heat or not to heat*.
- [T26] Aquaculture International (2024), *Aeromonas review*.
- [T27] FAO, *Cultured aquatic species – common carp* (via The Fish Site).
- [T28] Oyugi et al. (2012), *Temperature and growth of juvenile carp*.
- [T29] Fishes (2025) 10:95, *Koi-Larven bei 26–30 °C*.
- [T30] Specziár & Turcsányi (2018), Knowl. Manag. Aquat. Ecosyst.
- [T31] Bachflohkrebse.de, *Koi-Fütterung im Sommer / Winterruhe*.
- [T32] J. Sanders DVM, *How to feed koi* (cafishvet.com).
- [T33] K.O.I., *Koi Care Brochure 2020*; Kodama Koi Farm, *Winter preparation*.
- [T34] Hanako-Koi, *Ab welcher Temperatur nicht mehr füttern*.
- [T35] Koifriend, *Fütterungstipps*; Koiparadise, *Fütterung nach Temperatur*; koifuttershop, *Koifutter im Sommer*.
- [T36] FAO, *Common carp propagation manual*.
- [T37] Hanako-Koi, *Wann vermehren sich Koi*; Aquatop, *Koi-Laichzeit*.
- [T38] Saha et al. (2002), *Fish Physiology and Biochemistry*.
- [T39] Koitec24, *Teich winterfest / Teich im Sommer*.
- [T40] Koi-Live-Forum, *Wie kalt darf das Wasser im Koiteich maximal sein im Sommer*.
- [T41] Takahara et al. (2011), *Hydrobiologia – Cortisol release of carp under temperature change*.
- [T42] Hernández et al. (2024), *Chilodonella mass mortality after a cold drop*.
- [T43] WOAH, *Manual of Diagnostic Tests for Aquatic Animals – Infection with koi herpesvirus*.
- [T44] Gilad et al. (2003), J. Gen. Virol.
- [T45] UF/IFAS VM113, *Koi herpesvirus disease*.
- [T46] WOAH, *Carp edema virus disease card* (2022).
- [T47] Frontiers in Veterinary Science (2025), *CEV case report*.
- [T48] Jung-Schroers et al. (2015), BMC Veterinary Research.
- [T49] Environment Agency/Cefas, *Carp Edema Virus leaflet*; Vetmeduni Vienna (ScienceDaily 2015).
- [T50] WOAH, *Manual – Spring viraemia of carp*.
- [T51] Texas A&M AgriLife, *Saprolegniasis*.
- [T52] Aihua & Buchmann (2001), *Ichthyophthirius temperature development*.
- [T53] UF/IFAS FA006, *Ichthyophthirius multifiliis*.
- [T54] Pillay (via BrainKart), *Ichthyobodosis*.
- [T55] koihealth.info / fishdoc, *Chilodonella* (Hobby-Fachseiten; peer-reviewte Temperaturbereiche nicht zugänglich).
- [T56] Velda, *Trichodina*.
- [T57] *Dactylogyrus egg hatching and temperature*.
- [T58] UF/IFAS FA185, *Lernaea (anchorworm)*.
- [T59] UF/IFAS FA184, *Argulus (fish louse)*.
- [T60] IFM/Environment Agency, *Argulus in trout fisheries*.
- [T61] Engineering Toolbox, *Specific heat of water*.
- [T62] Lake Aegeri heat exchange study (Springer).
- [T63] Engineering Toolbox, *Convective heat transfer / Evaporation from water surfaces*.
- [T64] Hobby-Gartenteich-Forum, *Wieviel Verdunstung ist normal*; Koi-Live-Forum, *Wasserverdunstung täglich*.
- [T65] Frontiers in Earth Science (2019), *Nighttime Cooling of an Urban Pond*.
- [T66] Wikipedia, *Erdwärmekollektor / Bodentemperatur*.
- [T67] LfU Bayern, *Grundwassertemperatur / Gewässerkundlicher Jahresbericht 2017*.
- [T68] DWD OpenData, *Vieljährige Mittel 1991–2020* (Temperatur, Frosttage, Eistage, Heiße Tage).
- [T69] Hobby-Gartenteich-Forum, *Wie kalt/warm ist es bei euch – Temperaturen im Teich* 2020/2021/2022/2026.
- [T70] LfU Bayern, *Seewassertemperatur 2022*.
- [T71] Koi Organisation International (C. Neaves), *The Dynamics of a Koi Pond*.
- [T72] Koi-Live-Forum, *Teich abdecken im Winter ohne zu heizen bringt gar nichts*.
- [T73] Koi-Live-Forum, *Schichtungen auch im Teich vorhanden*; Hobby-Gartenteich-Forum, *Temperaturschichtung*.
- [T74] Hydrobiologia (2018), *Diel stratification of small lakes*.
- [T75] Hanako-Koi, *Wie tief muss ein Koiteich im Winter sein / Welche Teichheizung / Hitze im Sommer*.
- [T76] Koigarten Müller, *Teichtiefe*.
- [T77] Koi-Live-Forum, *Wintertemperatur im Teich (eigene Messung)*.
- [T78] Koi-Live-Forum, *Also doch Teichheizung*.
- [T79] Wikipedia, *Dichteanomalie*.
- [T80] Genesis, *Pumpe im Winter drosseln oder volle Kraft voraus?*.
- [T81] Hobby-Gartenteich-Forum, *Stromverbrauch einer Elektroheizung im Winter*.
- [T82] Koi-Live-Forum, *Luft-Wärmepumpe für Koiteiche*.
- [T83] Koi-Live-Forum, *Heizen ja oder nein*.
- [T84] Händlerangaben zu Heizleistungen: teichpflege.eu (Tauchheizer); Koi-Company (Heizspiralen 15/30 kW).
- [T85] Koi-Live-Forum, *Ab welcher Temperatur deckt ihr euren Teich ab*.
- [T86] Hanako-Koi, *Hitze im Sommer*.
- [T87] Koi-Live-Forum, *Brunnenwasser kühlt Teich ab*.
- [T88] Hobby-Gartenteich-Forum, *Heißer Sommer – wie stark sind Teiche beeinflusst / Wie hält man den Teich kühl*.
- [T89] Hobby-Gartenteich-Forum, *Wie macht ihr die Temperaturmessung im/am Teich*.
- [T90] Koi-Live-Forum, *Wassertemperatur mittels Shelly ermitteln*.
- [T91] Analog Devices, *DS18B20 Datenblatt*; Wikipedia, *Widerstandsthermometer* (DIN EN 60751 Klassen).
- [T92] koiteichblog.de, *Smarte Temperaturüberwachung am Koiteich*.
- [T93] Piccolroaz et al. (2013), *A simple lumped model to convert air temperature into surface water temperature in lakes (air2water)*, HESS 17.

---

## Anhang: Ableitung der Farbskala im Widget

Die `tempColor`-Funktion (`src-widgets/src/graphics.tsx`) setzt die **Zustandsbänder aus Kapitel 0 / 5.2** in Farben um
(Grenzen sind Übergänge). Das kräftige Grün liegt bewusst auf dem **Wachstumsoptimum 23–26 °C**; das kalte
**8–13 °C-„Aeromonas-Fenster"** wird trotz niedriger Temperatur **gelb (Vorsicht)** markiert, weil dort Erreger aktiv
sind, das Immunsystem aber nicht:

| Band | Farbe | Zustand |
| --- | --- | --- |
| < 2 °C | Rot | lebensgefährlich |
| 2–4 °C | Orange | Grenzbereich |
| 4–8 °C | Blau | Winterruhe (Kaltziel) |
| 8–13 °C | Gelb | „Aeromonas-Fenster" – Vorsicht (Erreger aktiv, Immunsystem aus) |
| 13–17 °C | Türkis | Übergang |
| 17–23 °C | Hellgrün | Normalbereich |
| 23–26 °C | Grün | Wachstumsoptimum (ideal) |
| 26–28 °C | Hellgrün | oberer Normalbereich |
| 28–30 °C | Orange | Hitzestress |
| ≥ 30 °C | Rot | Gefahr |