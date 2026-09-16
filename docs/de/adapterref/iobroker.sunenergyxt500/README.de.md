---
chapters: {"pages":{"en/adapterref/iobroker.sunenergyxt500/README.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.md"},"en/adapterref/iobroker.sunenergyxt500/README.en.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.en.md"},"en/adapterref/iobroker.sunenergyxt500/README.de.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sunenergyxt500/README.de.md
title: ioBroker.sunenergyxt500
hash: kF9dSqhhzwMXBcJgjaVvg3xNZYAXPFNayY508qdKhzQ=
---
![Logo](../../../en/adapterref/iobroker.sunenergyxt500/admin/sunenergyxt500.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sunenergyxt500.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sunenergyxt500.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sunenergyxt500-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sunenergyxt500-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sunenergyxt500.png?downloads=true)
![Test und Freigabe](https://github.com/Creekhail/ioBroker.sunenergyxt500/workflows/Test%20and%20Release/badge.svg)

# ioBroker.sunenergyxt500

## sunenergyxt500-Adapter für ioBroker

Integration und Eigenverbrauchsregelung für **[SunEnergyXT 500 / 500 PRO](https://www.sunenergyxt.com/details-500-series)** AC-gekoppelte Hybrid-Batteriespeicher (Hersteller: [SunEnergyXT](https://www.sunenergyxt.com/) ) über die **lokale HTTP-API** des Geräts – kein Cloud-Konto nötig. Eine Instanz verwaltet **bis zu drei Köpfe** (Speichertürme).

## Sprache / Language

- [Englisch](/#/docs/adapterref/iobroker.sunenergyxt500/README.en.md)
- [Deutsch](/#/docs/adapterref/iobroker.sunenergyxt500/README.de.md) (Standard)

## Funktionen

- Verwaltet **einen bis drei Köpfe** in einer Instanz, jeden unter eigenem Teilbaum`heads.<n>.*` , plus eingeführte`total.*` -Aggregat.
- Pollt die lokale API (`GET /read` ) und spiegelt alle stabilen Felder in States wider: SoC, Batterie-/Netz-/Last-/PV-Leistung, Strom/Spannung je MPPT, Tagesenergiezähler, SoC je Pack, Geräte-/Firmware-Infos und Zählerstatus.
- Schreibbare Steuerfelder (`POST /write` , durch Rücklesen bestätigt), passend zur Bedienoberfläche der offiziellen Integration – außer den in der API-Doku als _reserviert_ markierten Feldern: Netz-Sollwert`GS` , max. Einspeisung`IS` , SoC-Grenzen`SI` /`SA` /`SO` Eigenverbrauchsmodus`MM` Zählerkonfiguration`MD` , Zeitzone`TZ` Neustart`RT` , max. Netzausgang`MG` , die Schalter`LFB` /`LPS` /`PM` sowie lokaler Modus`LM` (⚠️`LM=1` blockiert die Cloud-/App-Steuerung bis zum Zurücksetzen). Reservierte Felder (z. B.`PT` ,`SI1` ,`SA1` ) sind nur schreibgeschützt verfügbar.
- Zwei umschaltbare **Steuermodi** : ein adapterseitiger Eigenverbrauchs- **Regler** (schreibt`GS` aus _einem beliebigen_ ioBroker-Zähler-State, Feedforward + P, mit Watchdog/Failsafe), der **einen Netz-Sollwert auf alle Köpfe verteilt** , oder **Geräte-Eigenregelung** (bindet einen unterstützten Zähler in einen einzelnen Speicher ein und lässt das Gerät selbst regeln) – plus ein **Aus-** Modus für reines Monitoring.
- Ein **„Test all head“** -Knopf im Admin prüft die Erreichbarkeit jedes konfigurierten Kopfes (Modell + SoC) vor dem Speichern.
- Verbindungsanzeige (`info.connection` ) plus`info.lastUpdate` sowie pro Kopf`online` /`lastError` Die
- Die komplette, unveränderte`/read` -Antwort jedes Kopfes liegt in`heads.<n>.info.rawResponse` (JSON), sodass jedes Feld, das der Adapter nicht auf einen eigenen Zustand abbildet, dort weiterhin auslesbar ist.

## Wie dieser Adapter funktioniert

Dieser Adapter steuert den Speicher **lokal** , ohne Hersteller-Cloud. Eine Instanz verwaltet **einen bis drei Köpfe** (Speichertürme). Der Eigenverbrauch lässt sich auf **zwei sich gegenseitig ausschließende Arten** umsetzen – du wählst eine über die Einstellung **Steuermodus** :

**Modus B – Adapter-Regler (Standard-Empfehlung, mit jedem Zähler, 1–3 Köpfe).** ioBroker liest die aktuelle Netzleistung aus **einem beliebigen Staat** , auf den du ihn zeigen lässt (`gridPowerStateId` ), und der Adapter schreibt den Netz-Sollwert`GS` (Feedforward + P-Korrektur, mit Watchdog). Der Zähler kann _alles_ sein, was ioBroker unterstützt — Shelly, Tasmota, ein Smartmeter-/Modbus-Adapter — **auch Zähler, die der Speicher selbst nicht lesen kann** . Du lieferst einen Zustand mit der **Netto-Netzleistung in Watt** (`>0` = Bezug,`<0` = Einspeisung; _Vorzeichen invertieren_ fällt umgekehrt; bei kW / getrennten Bezug-/Einspeisezählern / pro Phase zunächst einen sauberen Nettowert in einem kleinen ioBroker-State berechnen). Bei mehr als einem Kopf berechnet der Regler **einen** Gesamt-Sollwert und **verteilt ihn auf die Online-Köpfe** – gleichmäßig, auf die Leistung jedes Kopfes begrenzt, und überspringt einen Kopf, der voll (beim Laden) bzw. leer (beim Entladen) ist; Dessen Anteil wird auf die anderen umgelegt. Der Adapter erzwingt`MM=0` auf jedem Kopf, damit die Geräte`GS` ausführen; Der Zähler bleibt voll im ioBroker nutzbar.

**Modus A – Geräte-Eigenregelung (unterstützte Zähler, nur Einzelkopf).** Der Adapter bindet einen unterstützten Zähler **in den Speicher** ein (`MM=1` +`MD` ) und lässt das **Gerät selbst regeln** — der herstellereigene Eigenverbrauch, der evtl. schneller reagiert als eine externe Schleife. Dieser Modus ist **nur mit einem einzelnen Kopf** verfügbar; mit zwei oder drei konfigurierten Köpfen ist er nicht wählbar – verwenden Sie stattdessen den Adapter-Regler. Es werden nur vier Zählertypen unterstützt (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota), und der Zähler muss für den Speicher im LAN erreichbar sein. In diesem Modus schreibt der Adapter **kein**`GS` . Die Anbindung ist nur mDNS-/HTTP-Polling, der Zähler **bleibt in ioBroker nutzbar** – anders als die Zähler-Einrichtung der Hersteller-App, die den Zähler umkonfigurieren und aus ioBroker entfernen kann; Dieser Adapter bindet direkt und vermeidet das.

**Aus (Standard, nur Überwachung).** Der Adapter schreibt nie`MM` /`MD` /`GS` ; er pollt nur.`control.*` -States kannst du weiterhin manuell befehlen.

In beiden Steuermodi **besitzt der Adapter`MM`** : bei jeder Umfrage prüft er das`MM` Jedes Kopfes gegen den gewählten Modus und setzt es (mit Warnung) wieder, falls etwas anderes es geändert hat – so kann eine versehentliche Zählerbindung oder ein externes Skript die Steuerung nicht stillschweigend lahmlegen. Hinweis: Ein Kopf führt eingeschriebenes`GS` nur bei`MM=0` aus; mit gebundenem Zähler (`MM=1` ) regiert er selbst und ignoriert`GS` Die

**Mehrere Köpfe müssen auf unterschiedlichen Phasen liegen.** Das liegt in der elektrischen Verantwortung des Betreibers – der Adapter prüft (und kann) das nicht. Der Regler regelt die **Netto-(Summen-)Netzleistung** , die dein Zähler meldet, also genau das, was ein üblicher saldierender deutscher Zweirichtungszähler abbrechnet; Eine Per-Phasen-Optimierung ist nicht vorgesehen.

**Lokaler Modus (`LM=1` ) ist Voraussetzung.** Jedes Gerät stellt seine lokale HTTP-API (`/read` /`/write` ) nur bereit, wenn der **lokale Modus aktiviert** ist – ohne ihn liefert`/read` keine Daten (auf der getesteten Firmware bestätigt). Der lokale Modus schaltet außerdem die Cloud-/App-Fernsteuerung ab; Außerdem kann die Hersteller-App das Gerät nicht mehr steuern.

## Voraussetzungen

- Ein bis drei SunEnergyXT 500 (`PK=1` , 800 W) oder 500 PRO (`PK=2` , 2400 W) Köpfe, erreichbar im lokalen Netzwerk (Mischbetrieb verschiedener Modelle ist möglich).
- **Lokaler Modus (`LM=1` ) an jedem Gerät aktiviert** — Voraussetzung, damit die lokale HTTP-API Werte liefert (siehe _Wie dieser Adapter funktioniert_ ). Deaktiviert gleichzeitig die Cloud-/App-Fernsteuerung.
- Ein Zähler, je nach Steuermodus: für **Modus B** (Adapter-Regler) ein beliebiger Zähler, dessen Netzleistung als **ioBroker-State** verfügbar ist; für **Modus A** (Geräte-Eigenregelung, Einzelkopf) einer der vier unterstützten Zähler (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota), für den Speicher im LAN erreichbar. Im _Aus_ -Modus nicht nötig.

## Installation

1. Im ioBroker-Admin- **Adapter** öffnen, nach **sunenergyxt500** suchen und installieren.
2. Nach der Installation entsteht eine Instanz`sunenergyxt500.0` . Deren Einstellungen öffnen und die **Kopf-1-IP / Hostname** eintragen (bei mehreren Köpfen auch **Kopf 2 / Kopf 3** ). Für reines Monitoring den **Steuermodus** auf _Aus_ lassen.
3. Speichern & schließen – der Adapter beginnt zu pollen und füllt den Objektbaum unter`sunenergyxt500.0.heads.*` (und`total.*` ).

## Konfiguration

**Verbindung**

- **Kopf 1 – IP / Hostname** (Pflicht) und **Kopf 2 / Kopf 3** (optional) – lokale Adressen deiner Speicherköpfe, je mit optionalem Label. Bis zu drei Köpfe werden von dieser einer Instanz verwaltet. Mehrere Köpfe auf **unterschiedliche Phasen** legen (Verantwortung des Betreibers); Der Adapter regelt die **Netto-Summen-** Netzleistung. Dieselbe Adresse kann nicht doppelt eingetragen werden.
- **Testen Sie alle Köpfe** – fragt jeden konfigurierten Kopf ab und meldet Modell + SoC (oder einen Fehler), damit Sie die Adressen vor dem Speichern prüfen können.
- **Abfrageintervall (s)** — wie oft jeder Kopf pro`/read` abgefragt wird (Standard 5 s).
- **Anfrage-Timeout (ms)** — HTTP-Timeout (Standard 8000 ms).

**Steuerung** – einen **Steuermodus** wählen:

_Aus_ (Standard) – nur Überwachung; der Adapter schreibt nie`MM` /`MD` /`GS` Die

_Adapter-Regler_ (Modus B) — Felder:

- **Quell-State Netzleistung** – ein Fremd-State mit der Netzleistung deines Hauszählers. Konvention:`>0` = Netzbezug,`<0` = Einspeisung. **Vorzeichen invertieren** aktivieren, wenn dein Zähler die umgekehrte Konvention nutzt.
- **Adaptive Regelung** (Standard): Regelt in drei herstellerspezifischen Stufen – kleine Abweichungen sanft (alle 7 s, 20-W-Schritte), mittlere alle 2,5 s (120 W), große Lastsprünge sofort (450 W), mit festem 5-W-Gesamtband. Deaktivieren, um den Regler manuell über die Felder Verstärkung / Totband / Schreibintervall / Schritt-Limit einzustellen (erscheinen nur dann).
- **Ziel-Netzleistung** (W, Standard 0): 0 = Nulleinspeisung; positive Werte halten bewusst einen kleinen Netzbezug (nie einspeisen), negative eine kleine Einspeisung – gleiche Vorzeichenkonvention wie der Quell-State (`>0` = Bezug).
- **Max. Änderung pro Korrektur** (W, Standard 500, 0 = unbegrenzt): begrenzt, wie weit sich der Sollwert pro Regelschritt bewegt – hohe Verstärkung kann so bei Zähler-Ausreißern nicht überschwingen.
- **Verstärkung** (Standard 0,3), **Gesamtband** (W), **Min. Schreibintervall** (ms), **Per-Kopf-Schreib-Totband** (W — minimale Änderung des Kopf-Sollwerts, bevor er erneut geschrieben wird, gegen Zappeln bei sich verschiebender Aufteilung). Die Maximalleistung jedes Kopfes wird **automatisch** vom Gerät erkannt (800 W beim 500, 2400 W beim 500 PRO), Mischbetrieb funktioniert auch ohne Zusatzkonfiguration.
- **Watchdog Warnung / Failsafe(s)** – wird die Netzquelle zu alt, loggt der Regler eine Warnung und erzwingt schließlich`GS=0` auf **allen Köpfen** (sicherer Neutralzustand), bis die Quelle zurück ist. Watchdog-Telemetrie liegt unter`controller.*` Die

Der Regler liegt vor jeder Korrektur der tatsächlichen Netzleistung (`GP` ) jedes Geräts zurück – das ergibt natürliches Anti-Windup, wenn ein Gerät intern begrenzt ist (z. B. durch SoC).

_Geräte-Eigenregelung_ (Modus A, **nur Einzelkopf** ) — Felder:

- **Zählertyp** — EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota.
- **Zähler-SN / IP** – die Seriennummer für Shelly/Tasmota (per mDNS aufgelöst) bzw. die LAN-IP für EcoTracker (direkt). Bei Tasmota die SN ohne die letzten 4 Zeichen und den **Power-Key** passend zu deinem Energiezähler-Subtyp setzen.

Der Adapter bindet den Zähler (`MM=1` +`MD` ) und das Gerät reguliert sich selbst; der Adapter schreibt kein`GS` . Der gebundene Zähler bleibt im ioBroker nutzbar. Dieser Modus wird ausgeblendet/gesperrt, sobald ein zweiter oder dritter Kopf konfiguriert ist.

> **Sicherheit:** Im _Aus_ -Modus ist der Adapter read-only — er pollt nur`/read` und schreibt nichts, außer du befiehlst einen`control.*` -Zustand. In einem Steuermodus **erzwingt** der Adapter das Passende`MM` auf jedem Kopf und setzt es bei externer Änderung wieder; Lass **nicht** gleichzeitig einen zweiten`GS` -Schreiber laufen (dein eigenes Skript oder den geräteeigenen`MM` -Modus mit einem anderen Zähler), sonst kämpft sie um den Akku.

## Regelverhalten, Genauigkeit und Grenzen

**Was du erwarten kannst:** Der Regler hält die Netzleistung in einem Band von typisch **±10–20 W um den Nullpunkt** und regelt Lastsprünge – je nach Einstellungen – innerhalb von **\~1–3 Sekunden bis \~30 Sekunden** aus. Eine dauerhafte, exakte 0,0 W ist **prinzipbedingt nicht erreichbar** — mit keiner Regelung auf dieser Hardware:

- **Zähler-Genauigkeit und Rauschen:** Der externe Zähler selbst misst mit einigen Watt Toleranz und Rauschen – feiner zu regeln ist sinnlos. (Der`GS` -Sollwert hat 1-W-Auflösung, die Stellgranularität ist auch nicht die Grenze.)
- **Messketten-Latenz:** Zähler misst → ioBroker-State → Regler →`/write` → Gerät rampt. Zwischen Lastsprung und Korrektur vergehen unvermeidbar \~1–3 Sekunden.
- **Lastdynamik:** Ein Kompressor oder Wasserkocher springt in Millisekunden an – jede Regelung reagiert danach. Kurze Leistungsspitzen im Diagramm sind normal und energiebedeutungslos (Wattsekunden).
- Der Regler regelt auf die eingestellte **Ziel-Netzleistung** (Standard 0) und pendelt **symmetrisch** darum — kurze, kleine Einspeise-Momente gehören zur Nulleinspeisung dazu. Wer nicht einspeisen will, setzt das Ziel auf einen kleinen bewussten Bezug (z. B. +10 W).

**Wie die Einstellungen wirken:**

| Einstellung                         | Wirkung                                                    | kleiner Wert                                           | größerer Wert                                                                                |
| ----------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| **Verstärkung**                     | Anteil der Abweichung, der pro Schritt korrigiert wird     | träge, glatt (0,3 ≈ 7 Schritte bis \~0)                | schnell (1,0 = eine Korrektur), reagiert aber härter auf Messrauschen; >1 kann überschwingen |
| **Ziel-Netzleistung (W)**           | der Wert, auf den die Netzleistung geregelt wird           | <0 = bewusste Einspeisung                              | >0 = bewusster Bezug („nie einspeisen“)                                                      |
| **Max. Änderung pro Korrektur (W)** | begrenzt die Sollwert-Bewegung pro Schritt                 | zähmt Zähler-Ausreißer bei hoher Verstärkung           | größer (oder 0 = unbegrenzt) reagiert schneller auf große Lastsprünge                        |
| **Totband (W)**                     | Abweichungen darunter werden ignoriert                     | präziser, mehr Schreibvorgänge (0 = alles korrigieren) | ruhiger, lässt kleine Dauerabweichung stehen                                                 |
| **Min. Schreibintervall**           | Takt der Korrekturen                                       | Schnelleres Ausregeln (Untergrenze 1000 ms)            | Weniger Gerätezugriffe, langsameres Nachführen                                               |
| **Per-Kopf-Schreib-Totband**        | unterdrückt Mini-Umverteilungen zwischen Köpfen (Mehrkopf) | r                                                      | weniger Zappeln                                                                              |

**Adaptive Regelung** (Standard) wählt ihr Tempo automatisch je Stufe. Für den manuellen Modus zwei erprobte Profile: _Gelassen_ (Standardwerte — ruhig, minimale Gerätezugriffe, Band ±20–30 W) und _Präzise_ (Verstärkung 0,8–1,0 · Totband 0 · Intervall 1000 ms · Schreib-Totband 0 — Band ±10–20 W, Ausregeln in 1–3 s). Beide erreichen über den Tag praktisch dieselbe Energiebilanz – der Unterschied ist Optik im Diagramm, nicht Geld.

## Vorzeichenkonventionen

- `GP` (Netzleistung):`>0` = Einspeisung,`<0` = Bezug — **entgegengesetzt zu einem Shelly-Zähler** (`api.GP ≈ −shelly.gridPower` ).
- `BP` (Batterieleistung):`>0` = Laden,`<0` = Entladen.
- `GS` (Netz-Sollwert):`>0` = Einspeisung/Entladen,`<0` = Netzladen (±2400 W beim Pro, 1-W-Auflösung).

## Objektbaum

Jeder Kopf erhält seinen eigenen Teilbaum unte&#x72;**`heads.<n>.*`** (`n` = 1…3), dazu zusammengefasst&#x65;**`total.*`** -Aggregate sowie adapterweite`controller.*` /`info.*` . Innerhalb eines Kopfes sind die Staaten in thematischen Kanälen gruppiert; Das **Blatt jeder Objekt-ID ist der API-Feldcode** des Geräts (die Entitäts-ID der offiziellen Feldreferenz), und der zweisprachige Objektname beschreibt es – so bildet der Baum die dokumentierten Gerätefelder 1:1 ab.

| Kanal                 | Inhalt                                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `heads.<n>.battery.*` | SoC (`SC` ), Batterieleistung (`BP` ), SoC je Pack (`SC0` –`SC5` ), Pakete online (`ON` ), SoC-Hysterese (`SI1` /`SA1` )                        |
| `heads.<n>.grid.*`    | Netzleistung (`GP` ), Tages-Lade-/Einspeiseenergie (`GD1` /`GD2` )                                                                              |
| `heads.<n>.load.*`    | Lastleistung (`LP` ), Tages-Inselbetriebs-Lastenergie (`LD` )                                                                                   |
| `heads.<n>.pv.*`      | PV gesamt (`PV` ), Tages-PV-Erzeugungsenergie (`PD` ) und Leistung/Strom/Spannung je MPPT (`mppt1` –`mppt4` )                                   |
| `heads.<n>.system.*`  | Gesamt-Ein-/Ausgangsleistung (`IW` /`OP` )                                                                                                      |
| `heads.<n>.device.*`  | Typ/Modell/Seriennummer/Status;`network.*` (IP, Port, WLAN);`firmware.*` (`ES` /`AS` /`DS` Software,`EH` /`AH` /`DH` Hardware,`BS0` –`BS5` BMS) |
| `heads.<n>.meter.*`   | Status des externen Zählers (`MS` )                                                                                                             |
| `heads.<n>.ups.*`     | USV-Modus / Netzladen / Bypass (`UO` /`UG` /`FP` )                                                                                              |
| `heads.<n>.fault.*`   | Fehler-Bitmasken (`TF` /`EF` /`DF1` /`DF2` /`AF1` /`AF2` /`BF` ) — nur im aktiven Fehlerfall befüllt                                            |
| `heads.<n>.control.*` | alle **beschreibbaren** Felder (siehe unten)                                                                                                    |
| `heads.<n>.info.*`    | pro Kopf`online` ,`lastError` ,`rawResponse` (komplette`/read` -Rohantwort)                                                                     |
| `total.*`             | Gesamtsicht: Kapazitätsgewichteter`soc` , summierte`batteryPower` /`gridPower` /`maxPower` , `onlineCount`                                      |
| `controller.*`        | Telemetrie des Eigenverbrauchsreglers (`status` , Alter der Netzquelle)                                                                         |
| `info.*`              | `connection` (mind. ein Kopf erreichbar) und`lastUpdate`                                                                                        |

### Schreibbare Steuerfelder (`heads.<n>.control.*` )

Per ioBroker-Konvention liegen alle beschreibbaren Felder unter dem`control.*` jeden Kopfes. Da das die thematische Zuordnung verflacht, zeigt diese Tabelle, wozu jedes Feld gehört:

| Objekt        | Feld | Gehört zu | Beschreibung                                                                            |
| ------------- | ---- | --------- | --------------------------------------------------------------------------------------- |
| `control.GS`  | GS   | Netz      | Netzleistungs-Sollwert (`>0` Einspeisung /`<0` Netzladen)                               |
| `control.IS`  | IST  | Netz      | Max. Netzeinspeisung / WR-Ausgangsgrenze                                                |
| `control.MG`  | MG   | Netz      | Max. netzgekoppelte Ausgangsleistung                                                    |
| `control.SI`  | SI   | Batterie  | Min. Entlade-SoC (Netzbetrieb)                                                          |
| `control.SA`  | SA   | Batterie  | Max. Lade-SoC (Netzbetrieb)                                                             |
| `control.SO`  | ALSO | Batterie  | Min. Entlade-SoC (Inselbetrieb)                                                         |
| `control.MM`  | MM   | Modus     | Lokale Nulleinspeisung / Eigenverbrauch (gekoppelt mit`MD` )                            |
| `control.MD`  | MD   | Meter     | Zählerverbindung als JSON (gekoppelt mit`MM` )                                          |
| `control.LM`  | LM   | Modus     | Lokaler Modus (⚠️`1` blockierte Cloud-/App-Steuerung)                                   |
| `control.LFB` | LFB  | Modus     | Lastprioritäten-Schalter                                                                |
| `control.LPS` | LPS  | Modus     | Inselausgang-Schalter                                                                   |
| `control.PM`  | PM   | Modus     | Parallelmodus                                                                           |
| `control.TZ`  | TZ   | Gerät     | POSIX-Zeitzone                                                                          |
| `control.RT`  | RT   | Gerät     | Gerät neu starten (Button — ein Soft-Restart, **kein** vollständiger Stromlos-Neustart) |

> Tipp: Im ioBroker-Admin kannst du die Objektliste auch nach dem _beschreibbar_ -Flag filtern, um alle Steuerfelder auf einmal zu finden.

`device.PK` wird aus`DevType` abgeleitet, wenn die Firmware`PK` nicht mehr liefert. Reservierte Felder (`PT` ,`SI1` ,`SA1` ) sind schreibgeschützt. Vom Hersteller entfernte (`UP` ) oder reine Doku-Artefakte (`WT` ,`BN` ) werden nicht angelegt; Alles Ungemappte steht weiterhin in`heads.<n>.info.rawResponse` Die

## Manuelle Zähler-/Modus-Felder (MM / MD)

`MM`/`MD` sind die geräteeigene zählerbasierte Eigenverbrauchsregelung eines Kopfes. Wenn Sie einen **Steuermodus** wählen, verwaltet der Adapter sie für Sie (Modus A setzt).`MM=1` +`MD` auf dem einzelnen Kopf; Modus B erzwingt`MM=0` auf jedem Kopf), und sein Guard setzt das modusgerechte`MM` Beim nächsten Poll wieder — eine manuelle Änderung in einem Steuermodus ist also nur vorübergehend.

Die Roh-Felder bleiben für Experten-/Handbetrieb schreibbar (z. B. im _Aus-_ Modus). Sie folgen der offiziellen Kopplung:`MM` ausschalten löscht auch`MD` und das Schreiben von`MD` aktiviert`MM` (nicht-leer) bzw. deaktiviert es (leer). Sterben`MD` -JSON-Formate der vier unterstützten Zähler stehen in der lokalen API-Referenz des Geräts; Im Modus _Geräte-Eigenregelung_ baut der Adapter sie aus Zählertyp und SN/IP für dich.

## Einschränkungen

- **Bis zu drei Köpfe pro Instanz.** Der Einzelkopf-Betrieb ist an echte Hardware validiert; die Mehrkopf-Aufteilung ist durch Unit-Tests abgesichert, zum jetzigen Zeitpunkt aber **an einer echten 2–3-Kopf-Anlage ungetestet** – Rückmeldungen aus Mehrkopf-Setups sind sehr willkommen. _Geräte-Eigenregelung_ nur mit Einzelkopf.
- **Köpfe müssen auf unterschiedlichen Phasen liegen** (Verantwortung des Betreibers). Der Adapter regelt die **Netto-Summen** -Netzleistung, nicht pro Phase.
- Das Balancing der einzelnen Packs übernimmt das BMS jedes Kopfes – der Adapter steuert nur die Gesamtleistung des Kopfes und nutzt`battery.SC` (gesamt) zur Regelung; Einzelne Packs werden nicht verwaltet.
- Tagesenergiezähler (`PD` /`GD1` /`GD2` /`LD` ) sind rohe **Wh** , nicht kWh.`PD` benötigt Steuermodul-Firmware`ES 1.1.14` (öffentlich als „1.1.4“ vermarktet — die öffentliche Zählweise weicht von der internen in`ES` ab); Ältere Firmware liefert das Feld schlicht nicht, der Zustand bleibt dann leer.
- Die Tageszähler werden vom Gerät beim Neustart zurückgesetzt – ein Firmwareupdate mitten am Tag setzt sie also auf 0.
- `MD` und`TZ` wirken sofort, werden vom Gerät aber nicht garantiert wortgleich zurückgemeldet – über die Wirkung bestätigen, nicht über das Echo.
- **PV-Eingänge sind ungetestet mit Hardware** (die Referenzanlage läuft ohne PV-Module, daher sind`PV1–4` immer 0). Integration und Regler sind PV-agnostisch und vollständig, aber PV-Firmware-Edge-Cases (z. B. Akku voll + PV-Überschuss, USV-/Bypass-Felder`FP` /`UG` ) sind unverifiziert — Feedback willkommen.

## Implementierung

- **`info.connection`bleibt`false` / keine Daten:** Stelle zuerst sicher, dass der **lokale Modus (`LM=1` )** am Gerät aktiviert ist — ohne ihn liefert die lokale API keine Werte. Prüfe dann, ob`http://<geräte-ip>/read` vom ioBroker-Host erreichbar ist (mit Browser oder`curl` testen). Pro Kopf zeigen`heads.<n>.info.online` und`heads.<n>.info.lastError` , welcher ausfällt.
- **Es wird nicht gesteuert:** prüfe den **Steuermodus** – _Aus_ schreibt nie. Im _Adapter-Regler_ einen gültigen **Quell-State Netzleistung** setzen; in _Geräte-Eigenregelung_ einen unterstützten **Zählertyp** und **SN/IP** .
- **Gerät ignoriert`GS` / Akku reagiert nicht:** ein Kopf führt ein geschriebenes`GS` nur bei`MM=0` aus. Im _Adapter-Regler-_ Modus erzwingt der Adapter das; wenn du`GS` manuell schreiben, Stelle sicher, dass kein Zähler gebunden ist (`MM=0` Mit gebundenem Zähler (`MM=1` ) Regelt das Gerät selbst und ignoriert`GS` Die
- **Der Regler ist zu langsam / erreicht nie exakt 0:** siehe _Regelverhalten, Genauigkeit und Grenzen_ — die Messkette bringt \~1–3 s Latenz mit und der Zähler misst mit endlicher Genauigkeit, ein Band von ±10–20 W um das Ziel ist das physikalische Optimum. Für die schnellste Reaktion das _Präzise_ -Profil nutzen (Verstärkung 0,8–1,0, Totband 0, min. Schreibintervall 1000 ms); Wer nie einspeisen will, setzt die **Ziel-Netzleistung** auf einen kleinen positiven Bezug.
- **Zeitstempel von States wirken alt / Quality-Flag 32:** Der Adapter schreibt einen State nur bei Wertänderung (Standard-Praxis — schützt die States-DB vor Millionen identischer Schreibvorgänge). Der Zeitstempel zeigt auch die letzte _Wertänderung_ , nicht den letzten Poll. Die Datenfrische zeigt`info.lastUpdate` (bei jeder erfolgreichen Umfrage aktualisiert) bzw.`heads.<n>.info.online` . Qualität 32 („Ersatz-Initialwert“) bleibt nur auf Staaten, die das Gerät nie liefert (z. B. SoC nicht vorhandener Erweiterungspacks); Nach jedem Adapterstart werden alle gelieferten Werte einmal geschrieben – ihre Zeitstempel sind auch mindestens so frisch wie der Start.
- **Zwei Regler kämpfen um den Akku:** Nur einen laufen lassen. Der Adapter erzwingt`MM` für den gewählten Modus — deaktiviere ein externes`GS` -Skript (oder den geräteeigenen`MM` mit Zähler), bevor du einen Steuermodus nutzt.
- **Manche Staaten bleiben leer (`0` /`""` ):** ein Gerät liefert nur die Felder, die seine Firmware/Topologie tatsächlich bereitstellt (z. B. weitere Packs`SC2` –`SC5` oder Fehler-Bitmasks nur im Fehlerfall). Die Roh kompletteantwort steht immer in`heads.<n>.info.rawResponse` Die
- **Nach dem Update einer Einzelkopf-Version sieht der Baum falsch aus:** der Objektbaum wurde in 0.2.0 auf`heads.<n>.*` umgestellt. Der Adapter entfernt veraltete Objekte beim Start automatisch; Bleibt doch etwas übrig, die alten Objekte löschen (oder die Instanz neu anlegen).
- **Köpfe fallen sporadisch aus / Ping-Timeouts:** das WLAN-Modul im Kopf ist schwach, und gestapelte Geräte setzen ein Metallgehäuse direkt über die Antenne. Prüfe`heads.<n>.device.network.WR` (Signalstärke in dB) — unterhalb von −75 dB wird die Verbindung unzulässig. Gestapelte Geräte trennen und das **Abfrageintervall** auf 10–15 Sekunden erhöhen (die Regelgüte leidet kaum: der Regler reagiert auf die Netzleistungsquelle, nicht auf diese Abfrage). Um den Adapter auszuschließen: Instanz stoppen und den Kopf einige Minuten anpingen – bleiben die Ausfälle, liegt es nicht an der Abfrage. Der Adapter wird selbst verschickt`/read` pro Kopf und Intervall, fragt mehrere Köpfe zeitversetzt ab, schließt jede Verbindung nach Gebrauch und bremst nach fehlgeschlagenen Abfragen automatisch ab.

## Änderungshistorie (Changelog)

Die Änderungshistorie wird im Haupt- [README.md](/#/adapters/sunenergyxt500#changelog) gepflegt.

## Lizenz

MIT-Lizenz

Copyright (c) 2026 Marcus Bortel (Creekhail)

Die Erlaubnis wird hiermit unentgeltlich jeder Person erteilt, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software“) erhält, mit der Software uneingeschränkt zu handeln, einschließlich und ohne Einschränkung der Rechte, sie zu nutzen, zu kopieren, zu ändern, zusammenzuführen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software überlassen wird, dies zu gestatten, unter den folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Erlaubnishinweis sind in allen Kopien oder wesentlichen Teilen der Software beizufügen.

DIE SOFTWARE WIRD „WIE BESEHEN“ BEREITGESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG VON RECHTEN. IN KEINEM FALL HAFTEN DIE AUTOREN ODER URHEBERRECHTSINHABER FÜR ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNG, OB AUS VERTRAG, UNERLAUBTER HANDLUNG ODER ANDERWEITIG, DIE SICH AUS DER SOFTWARE ODER DER NUTZUNG ODER SONSTIGEN VERWENDUNG DER SOFTWARE ERGEBEN.