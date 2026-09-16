---
chapters: {"pages":{"en/adapterref/iobroker.sunenergyxt500/README.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.md"},"en/adapterref/iobroker.sunenergyxt500/README.en.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.en.md"},"en/adapterref/iobroker.sunenergyxt500/README.de.md":{"title":{"en":"ioBroker.sunenergyxt500"},"content":"en/adapterref/iobroker.sunenergyxt500/README.de.md"}}}
---
![Logo](admin/sunenergyxt500.png)
# ioBroker.sunenergyxt500

[![NPM version](https://img.shields.io/npm/v/iobroker.sunenergyxt500.svg)](https://www.npmjs.com/package/iobroker.sunenergyxt500)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sunenergyxt500.svg)](https://www.npmjs.com/package/iobroker.sunenergyxt500)
![Number of Installations](https://iobroker.live/badges/sunenergyxt500-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/sunenergyxt500-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.sunenergyxt500.png?downloads=true)](https://nodei.co/npm/iobroker.sunenergyxt500/)

**Tests:** ![Test and Release](https://github.com/Creekhail/ioBroker.sunenergyxt500/workflows/Test%20and%20Release/badge.svg)

## sunenergyxt500-Adapter für ioBroker

Integration und Eigenverbrauchsregelung für **[SunEnergyXT 500 / 500 PRO](https://www.sunenergyxt.com/details-500-series)** AC-gekoppelte Hybrid-Batteriespeicher (Hersteller: [SunEnergyXT](https://www.sunenergyxt.com/)) über die **lokale HTTP-API** des Geräts — kein Cloud-Konto nötig. Eine Instanz verwaltet **bis zu drei Köpfe** (Speichertürme).

## Sprache / Language

- [English](/#/docs/adapterref/iobroker.sunenergyxt500/README.en.md)
- [Deutsch](/#/docs/adapterref/iobroker.sunenergyxt500/README.de.md) (Standard)

## Funktionen

* Verwaltet **einen bis drei Köpfe** in einer Instanz, jeden unter eigenem Teilbaum `heads.<n>.*`, plus zusammengefasste `total.*`-Aggregate.
* Pollt die lokale API (`GET /read`) und spiegelt alle stabilen Felder in States: SoC, Batterie-/Netz-/Last-/PV-Leistung, Strom/Spannung je MPPT, Tagesenergiezähler, SoC je Pack, Geräte-/Firmware-Infos und Zählerstatus.
* Schreibbare Steuerfelder (`POST /write`, durch Rücklesen bestätigt), passend zur Bedienoberfläche der offiziellen Integration — außer den in der API-Doku als *reserved* markierten Feldern: Netz-Sollwert `GS`, max. Einspeisung `IS`, SoC-Grenzen `SI`/`SA`/`SO`, Eigenverbrauchsmodus `MM`, Zählerkonfiguration `MD`, Zeitzone `TZ`, Neustart `RT`, max. Netzausgang `MG`, die Schalter `LFB`/`LPS`/`PM` sowie lokaler Modus `LM` (⚠️ `LM=1` blockiert die Cloud-/App-Steuerung bis zum Zurücksetzen). Reservierte Felder (z. B. `PT`, `SI1`, `SA1`) sind nur read-only verfügbar.
* Zwei umschaltbare **Steuermodi**: ein adapterseitiger Eigenverbrauchs-**Regler** (schreibt `GS` aus *einem beliebigen* ioBroker-Zähler-State, Feedforward + P, mit Watchdog/Failsafe), der **einen Netz-Sollwert auf alle Köpfe verteilt**, oder **Geräte-Eigenregelung** (bindet einen unterstützten Zähler in einen einzelnen Speicher ein und lässt das Gerät selbst regeln) — plus ein **Aus**-Modus für reines Monitoring.
* Ein **„Test all heads"**-Knopf im Admin prüft die Erreichbarkeit jedes konfigurierten Kopfes (Modell + SoC) vor dem Speichern.
* Verbindungsanzeige (`info.connection`) plus `info.lastUpdate`, sowie pro Kopf `online` / `lastError`.
* Die komplette, unveränderte `/read`-Antwort jedes Kopfes liegt in `heads.<n>.info.rawResponse` (JSON), sodass jedes Feld, das der Adapter nicht auf einen eigenen State abbildet, dort weiterhin auslesbar ist.

## Wie dieser Adapter funktioniert

Dieser Adapter steuert den Speicher **lokal**, ohne Hersteller-Cloud. Eine Instanz verwaltet **einen bis drei Köpfe** (Speichertürme). Der Eigenverbrauch lässt sich auf **zwei sich gegenseitig ausschließende Arten** umsetzen — du wählst eine über die Einstellung **Steuermodus**:

**Modus B — Adapter-Regler (Standard-Empfehlung, mit jedem Zähler, 1–3 Köpfe).** ioBroker liest die aktuelle Netzleistung aus **einem beliebigen State**, auf den du ihn zeigen lässt (`gridPowerStateId`), und der Adapter schreibt den Netz-Sollwert `GS` (Feedforward + P-Korrektur, mit Watchdog). Der Zähler kann *alles* sein, was ioBroker unterstützt — Shelly, Tasmota, ein Smartmeter-/Modbus-Adapter — **auch Zähler, die der Speicher selbst nicht lesen kann**. Du lieferst einen State mit der **Netto-Netzleistung in Watt** (`>0` = Bezug, `<0` = Einspeisung; *Vorzeichen invertieren* falls umgekehrt; bei kW / getrennten Bezug-/Einspeisezählern / pro Phase zunächst einen sauberen Nettowert in einem kleinen ioBroker-State berechnen). Bei mehr als einem Kopf berechnet der Regler **einen** Gesamt-Sollwert und **verteilt ihn auf die Online-Köpfe** — gleichmäßig, auf die Leistung jedes Kopfes begrenzt, und überspringt einen Kopf, der voll (beim Laden) bzw. leer (beim Entladen) ist; dessen Anteil wird auf die anderen umgelegt. Der Adapter erzwingt `MM=0` auf jedem Kopf, damit die Geräte `GS` ausführen; der Zähler bleibt voll in ioBroker nutzbar.

**Modus A — Geräte-Eigenregelung (unterstützte Zähler, nur Einzelkopf).** Der Adapter bindet einen unterstützten Zähler **in den Speicher** ein (`MM=1` + `MD`) und lässt das **Gerät selbst regeln** — der herstellereigene Eigenverbrauch, der evtl. schneller reagiert als eine externe Schleife. Dieser Modus ist **nur mit einem einzelnen Kopf** verfügbar; mit zwei oder drei konfigurierten Köpfen ist er nicht wählbar — nutze stattdessen den Adapter-Regler. Es werden nur vier Zählertypen unterstützt (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota), und der Zähler muss für den Speicher im LAN erreichbar sein. In diesem Modus schreibt der Adapter **kein** `GS`. Die Anbindung ist nur mDNS-/HTTP-Polling, der Zähler **bleibt in ioBroker nutzbar** — anders als die Zähler-Einrichtung der Hersteller-App, die den Zähler umkonfigurieren und aus ioBroker entfernen kann; dieser Adapter bindet direkt und vermeidet das.

**Aus (Standard, nur Monitoring).** Der Adapter schreibt nie `MM`/`MD`/`GS`; er pollt nur. `control.*`-States kannst du weiterhin manuell befehlen.

In beiden Steuermodi **besitzt der Adapter `MM`**: bei jedem Poll prüft er das `MM` jedes Kopfes gegen den gewählten Modus und setzt es (mit Warnung) wieder, falls etwas anderes es geändert hat — so kann eine versehentliche Zählerbindung oder ein externes Skript die Steuerung nicht stillschweigend lahmlegen. Hinweis: Ein Kopf führt ein geschriebenes `GS` nur bei `MM=0` aus; mit gebundenem Zähler (`MM=1`) regelt er selbst und ignoriert `GS`.

**Mehrere Köpfe müssen auf unterschiedlichen Phasen liegen.** Das ist die elektrische Verantwortung des Betreibers — der Adapter prüft (und kann) das nicht. Der Regler regelt die **Netto-(Summen-)Netzleistung**, die dein Zähler meldet, also genau das, was ein üblicher saldierender deutscher Zweirichtungszähler abrechnet; eine Per-Phasen-Optimierung ist nicht vorgesehen.

**Lokaler Modus (`LM=1`) ist Voraussetzung.** Jedes Gerät stellt seine lokale HTTP-API (`/read` / `/write`) nur bereit, wenn der **lokale Modus aktiviert** ist — ohne ihn liefert `/read` keine Daten (auf der getesteten Firmware bestätigt). Der lokale Modus schaltet außerdem die Cloud-/App-Fernsteuerung ab; folglich kann die Hersteller-App das Gerät nicht mehr steuern.

## Voraussetzungen

* Ein bis drei SunEnergyXT 500 (`PK=1`, 800 W) oder 500 PRO (`PK=2`, 2400 W) Köpfe, erreichbar im lokalen Netzwerk (Mischbetrieb verschiedener Modelle ist möglich).
* **Lokaler Modus (`LM=1`) an jedem Gerät aktiviert** — Voraussetzung, damit die lokale HTTP-API Werte liefert (siehe *Wie dieser Adapter funktioniert*). Deaktiviert zugleich die Cloud-/App-Fernsteuerung.
* Ein Zähler, je nach Steuermodus: für **Modus B** (Adapter-Regler) ein beliebiger Zähler, dessen Netzleistung als **ioBroker-State** verfügbar ist; für **Modus A** (Geräte-Eigenregelung, Einzelkopf) einer der vier unterstützten Zähler (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota), für den Speicher im LAN erreichbar. Im *Aus*-Modus nicht nötig.

## Installation

1. Im ioBroker-Admin **Adapter** öffnen, nach **sunenergyxt500** suchen und installieren.
2. Nach der Installation entsteht eine Instanz `sunenergyxt500.0`. Deren Einstellungen öffnen und die **Kopf-1-IP / Hostname** eintragen (bei mehreren Köpfen auch **Kopf 2 / Kopf 3**). Für reines Monitoring den **Steuermodus** auf *Aus* lassen.
3. Speichern & schließen — der Adapter beginnt zu pollen und füllt den Objektbaum unter `sunenergyxt500.0.heads.*` (und `total.*`).

## Konfiguration

**Verbindung**
* **Kopf 1 — IP / Hostname** (Pflicht) und **Kopf 2 / Kopf 3** (optional) — lokale Adressen deiner Speicherköpfe, je mit optionalem Label. Bis zu drei Köpfe werden von dieser einen Instanz verwaltet. Mehrere Köpfe auf **unterschiedliche Phasen** legen (Verantwortung des Betreibers); der Adapter regelt die **Netto-Summen**-Netzleistung. Dieselbe Adresse kann nicht doppelt eingetragen werden.
* **Test all heads** — fragt jeden konfigurierten Kopf ab und meldet Modell + SoC (oder einen Fehler), damit du die Adressen vor dem Speichern prüfen kannst.
* **Abfrageintervall (s)** — wie oft jeder Kopf per `/read` abgefragt wird (Standard 5 s).
* **Anfrage-Timeout (ms)** — HTTP-Timeout (Standard 8000 ms).

**Steuerung** — einen **Steuermodus** wählen:

*Aus* (Standard) — nur Monitoring; der Adapter schreibt nie `MM`/`MD`/`GS`.

*Adapter-Regler* (Modus B) — Felder:
* **Quell-State Netzleistung** — ein Fremd-State mit der Netzleistung deines Hauszählers. Konvention: `>0` = Netzbezug, `<0` = Einspeisung. **Vorzeichen invertieren** aktivieren, falls dein Zähler die umgekehrte Konvention nutzt.
* **Adaptive Regelung** (Standard an): regelt in drei herstellererprobten Stufen — kleine Abweichungen sanft (alle 7 s, 20-W-Schritte), mittlere alle 2,5 s (120 W), große Lastsprünge sofort (450 W), mit festem 5-W-Totband. Deaktivieren, um den Regler manuell über die Felder Verstärkung / Totband / Schreibintervall / Schritt-Limit einzustellen (erscheinen nur dann).
* **Ziel-Netzleistung** (W, Standard 0): 0 = Nulleinspeisung; positive Werte halten bewusst einen kleinen Netzbezug (nie einspeisen), negative eine kleine Einspeisung — gleiche Vorzeichenkonvention wie der Quell-State (`>0` = Bezug).
* **Max. Änderung pro Korrektur** (W, Standard 500, 0 = unbegrenzt): begrenzt, wie weit sich der Sollwert pro Regelschritt bewegt — hohe Verstärkung kann so bei Zähler-Ausreißern nicht überschwingen.
* **Verstärkung** (Standard 0.3), **Totband** (W), **Min. Schreibintervall** (ms), **Per-Kopf-Schreib-Totband** (W — minimale Änderung des Kopf-Sollwerts, bevor er erneut geschrieben wird, gegen Zappeln bei sich verschiebender Aufteilung). Die Maximalleistung jedes Kopfes wird **automatisch** vom Gerät erkannt (800 W beim 500, 2400 W beim 500 PRO), Mischbetrieb funktioniert also ohne Zusatzkonfiguration.
* **Watchdog Warnung / Failsafe (s)** — wird die Netzquelle zu alt, loggt der Regler eine Warnung und erzwingt schließlich `GS=0` auf **allen Köpfen** (sicherer Neutralzustand), bis die Quelle zurück ist. Watchdog-Telemetrie liegt unter `controller.*`.

Der Regler liest vor jeder Korrektur die tatsächliche Netzleistung (`GP`) jedes Geräts zurück — das ergibt natürlichen Anti-Windup, wenn ein Gerät intern begrenzt (z. B. durch SoC).

*Geräte-Eigenregelung* (Modus A, **nur Einzelkopf**) — Felder:
* **Zählertyp** — EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota.
* **Zähler-SN / IP** — die Seriennummer für Shelly/Tasmota (per mDNS aufgelöst) bzw. die LAN-IP für EcoTracker (direkt). Bei Tasmota die SN ohne die letzten 4 Zeichen und den **Power-Key** passend zu deinem Energiezähler-Subtyp setzen.

Der Adapter bindet den Zähler (`MM=1` + `MD`) und das Gerät regelt selbst; der Adapter schreibt kein `GS`. Der gebundene Zähler bleibt in ioBroker nutzbar. Dieser Modus wird ausgeblendet/gesperrt, sobald ein zweiter oder dritter Kopf konfiguriert ist.

> **Sicherheit:** Im *Aus*-Modus ist der Adapter read-only — er pollt nur `/read` und schreibt nichts, außer du befiehlst einen `control.*`-State. In einem Steuermodus **erzwingt** der Adapter das passende `MM` auf jedem Kopf und setzt es bei externer Änderung wieder; lass **nicht** gleichzeitig einen zweiten `GS`-Schreiber laufen (dein eigenes Skript oder den geräteeigenen `MM`-Modus mit einem anderen Zähler), sonst kämpfen sie um den Akku.

## Regelverhalten, Genauigkeit und Grenzen

**Was du erwarten kannst:** Der Regler hält die Netzleistung in einem Band von typisch **±10–20 W um den Nullpunkt** und regelt Lastsprünge — je nach Einstellungen — innerhalb von **~1–3 Sekunden bis ~30 Sekunden** aus. Eine dauerhafte, exakte 0,0 W ist **prinzipbedingt nicht erreichbar** — mit keiner Regelung auf dieser Hardware:

* **Zähler-Genauigkeit und Rauschen:** Der externe Zähler selbst misst mit einigen Watt Toleranz und Rauschen — feiner zu regeln ist sinnlos. (Der `GS`-Sollwert hat 1-W-Auflösung, die Stellgranularität ist also nicht die Grenze.)
* **Messketten-Latenz:** Zähler misst → ioBroker-State → Regler → `/write` → Gerät rampt. Zwischen Lastsprung und Korrektur vergehen unvermeidbar ~1–3 Sekunden.
* **Lastdynamik:** Ein Kompressor oder Wasserkocher springt in Millisekunden an — jede Regelung reagiert danach. Kurze Leistungsspitzen im Diagramm sind normal und energetisch bedeutungslos (Wattsekunden).
* Der Regler regelt auf die eingestellte **Ziel-Netzleistung** (Standard 0) und pendelt **symmetrisch** darum — kurze, kleine Einspeise-Momente gehören zur Nulleinspeisung dazu. Wer nie einspeisen will, setzt das Ziel auf einen kleinen bewussten Bezug (z. B. +10 W).

**Wie die Einstellungen wirken:**

| Einstellung | Wirkung | kleiner Wert | größerer Wert |
|---|---|---|---|
| **Verstärkung** | Anteil der Abweichung, der pro Schritt korrigiert wird | träge, glatt (0,3 ≈ 7 Schritte bis ~0) | schnell (1,0 = eine Korrektur), reagiert aber härter auf Messrauschen; >1 kann überschwingen |
| **Ziel-Netzleistung (W)** | der Wert, auf den die Netzleistung geregelt wird | <0 = bewusste Einspeisung | >0 = bewusster Bezug („nie einspeisen") |
| **Max. Änderung pro Korrektur (W)** | begrenzt die Sollwert-Bewegung pro Schritt | zähmt Zähler-Ausreißer bei hoher Verstärkung | größer (oder 0 = unbegrenzt) reagiert schneller auf große Lastsprünge |
| **Totband (W)** | Abweichungen darunter werden ignoriert | präziser, mehr Schreibvorgänge (0 = alles korrigieren) | ruhiger, lässt kleine Dauerabweichung stehen |
| **Min. Schreibintervall** | Takt der Korrekturen | schnelleres Ausregeln (Untergrenze 1000 ms) | weniger Gerätezugriffe, langsameres Nachführen |
| **Per-Kopf-Schreib-Totband** | unterdrückt Mini-Umverteilungen zwischen Köpfen (Mehrkopf) | präziser | weniger Zappeln |

**Adaptive Regelung** (Standard) wählt ihr Tempo automatisch je Stufe. Für den manuellen Modus zwei erprobte Profile: *Gelassen* (Standardwerte — ruhig, minimale Gerätezugriffe, Band ±20–30 W) und *Präzise* (Verstärkung 0,8–1,0 · Totband 0 · Intervall 1000 ms · Schreib-Totband 0 — Band ±10–20 W, Ausregeln in 1–3 s). Beide erreichen über den Tag praktisch dieselbe Energiebilanz — der Unterschied ist Optik im Diagramm, nicht Geld.

## Vorzeichenkonventionen

* `GP` (Netzleistung): `>0` = Einspeisung, `<0` = Bezug — **entgegengesetzt zu einem Shelly-Zähler** (`api.GP ≈ −shelly.gridPower`).
* `BP` (Batterieleistung): `>0` = Laden, `<0` = Entladen.
* `GS` (Netz-Sollwert): `>0` = Einspeisung/Entladen, `<0` = Netzladen (±2400 W beim Pro, 1-W-Auflösung).

## Objektbaum

Jeder Kopf erhält seinen eigenen Teilbaum unter **`heads.<n>.*`** (`n` = 1…3), dazu zusammengefasste **`total.*`**-Aggregate sowie adapterweite `controller.*` / `info.*`. Innerhalb eines Kopfes sind die States in thematische Kanäle gruppiert; das **Blatt jeder Objekt-ID ist der API-Feldcode** des Geräts (die Entitäts-ID der offiziellen Feldreferenz), und der zweisprachige Objektname beschreibt es — so bildet der Baum die dokumentierten Gerätefelder 1:1 ab.

| Kanal | Inhalt |
|---|---|
| `heads.<n>.battery.*` | SoC (`SC`), Batterieleistung (`BP`), SoC je Pack (`SC0`–`SC5`), Packs online (`ON`), SoC-Hysterese (`SI1`/`SA1`) |
| `heads.<n>.grid.*` | Netzleistung (`GP`), Tages-Lade-/Einspeiseenergie (`GD1`/`GD2`) |
| `heads.<n>.load.*` | Lastleistung (`LP`), Tages-Inselbetriebs-Lastenergie (`LD`) |
| `heads.<n>.pv.*` | PV gesamt (`PV`), Tages-PV-Erzeugungsenergie (`PD`) und Leistung/Strom/Spannung je MPPT (`mppt1`–`mppt4`) |
| `heads.<n>.system.*` | Gesamt-Ein-/Ausgangsleistung (`IW`/`OP`) |
| `heads.<n>.device.*` | Typ/Modell/Seriennummer/Status; `network.*` (IP, Port, WLAN); `firmware.*` (`ES`/`AS`/`DS` Software, `EH`/`AH`/`DH` Hardware, `BS0`–`BS5` BMS) |
| `heads.<n>.meter.*` | Status des externen Zählers (`MS`) |
| `heads.<n>.ups.*` | USV-Modus / Netzladen / Bypass (`UO`/`UG`/`FP`) |
| `heads.<n>.fault.*` | Fehler-Bitmasks (`TF`/`EF`/`DF1`/`DF2`/`AF1`/`AF2`/`BF`) — nur im aktiven Fehlerfall befüllt |
| `heads.<n>.control.*` | alle **schreibbaren** Felder (siehe unten) |
| `heads.<n>.info.*` | pro Kopf `online`, `lastError`, `rawResponse` (komplette `/read`-Rohantwort) |
| `total.*` | Gesamtsicht: kapazitätsgewichteter `soc`, summierte `batteryPower` / `gridPower` / `maxPower`, `onlineCount` |
| `controller.*` | Telemetrie des Eigenverbrauchsreglers (`status`, Alter der Netzquelle) |
| `info.*` | `connection` (mind. ein Kopf erreichbar) und `lastUpdate` |

### Schreibbare Steuerfelder (`heads.<n>.control.*`)

Per ioBroker-Konvention liegen alle schreibbaren Felder unter dem `control.*` jedes Kopfes. Da das die thematische Zuordnung verflacht, zeigt diese Tabelle, wozu jedes Feld gehört:

| Objekt | Feld | Gehört zu | Beschreibung |
|---|---|---|---|
| `control.GS` | GS | grid | Netzleistungs-Sollwert (`>0` Einspeisung / `<0` Netzladen) |
| `control.IS` | IS | grid | Max. Netzeinspeisung / WR-Ausgangsgrenze |
| `control.MG` | MG | grid | Max. netzgekoppelte Ausgangsleistung |
| `control.SI` | SI | battery | Min. Entlade-SoC (Netzbetrieb) |
| `control.SA` | SA | battery | Max. Lade-SoC (Netzbetrieb) |
| `control.SO` | SO | battery | Min. Entlade-SoC (Inselbetrieb) |
| `control.MM` | MM | mode | Lokale Nulleinspeisung / Eigenverbrauch (gekoppelt mit `MD`) |
| `control.MD` | MD | meter | Zählerverbindung als JSON (gekoppelt mit `MM`) |
| `control.LM` | LM | mode | Lokaler Modus (⚠️ `1` blockiert Cloud-/App-Steuerung) |
| `control.LFB` | LFB | mode | Lastprioritäts-Schalter |
| `control.LPS` | LPS | mode | Inselausgang-Schalter |
| `control.PM` | PM | mode | Parallel-Modus |
| `control.TZ` | TZ | device | POSIX-Zeitzone |
| `control.RT` | RT | device | Gerät neu starten (Button — ein Soft-Restart, **kein** vollständiger Stromlos-Neustart) |

> Tipp: Im ioBroker-Admin kannst du die Objektliste auch nach dem *beschreibbar*-Flag filtern, um alle Steuerfelder auf einmal zu finden.

`device.PK` wird aus `DevType` abgeleitet, wenn die Firmware `PK` nicht mehr liefert. Reservierte Felder (`PT`, `SI1`, `SA1`) sind read-only. Vom Hersteller entfernte (`UP`) oder reine Doku-Artefakte (`WT`, `BN`) werden nicht angelegt; alles Ungemappte steht weiterhin in `heads.<n>.info.rawResponse`.

## Manuelle Zähler-/Modus-Felder (MM / MD)

`MM`/`MD` sind die geräteeigene zählerbasierte Eigenverbrauchsregelung eines Kopfes. Wenn du einen **Steuermodus** wählst, verwaltet der Adapter sie für dich (Modus A setzt `MM=1` + `MD` auf dem einzelnen Kopf; Modus B erzwingt `MM=0` auf jedem Kopf), und sein Guard setzt das modusgerechte `MM` beim nächsten Poll wieder — eine manuelle Änderung in einem Steuermodus ist also nur vorübergehend.

Die Roh-Felder bleiben für Experten-/Handbetrieb schreibbar (z. B. im *Aus*-Modus). Sie folgen der offiziellen Kopplung: `MM` ausschalten löscht auch `MD`, und das Schreiben von `MD` aktiviert `MM` (nicht-leer) bzw. deaktiviert es (leer). Die `MD`-JSON-Formate der vier unterstützten Zähler stehen in der lokalen API-Referenz des Geräts; im Modus *Geräte-Eigenregelung* baut der Adapter sie aus Zählertyp und SN/IP für dich.

## Einschränkungen

* **Bis zu drei Köpfe pro Instanz.** Der Einzelkopf-Betrieb ist an echter Hardware validiert; die Mehrkopf-Aufteilung ist durch Unit-Tests abgesichert, zum jetzigen Zeitpunkt aber **an einer echten 2–3-Kopf-Anlage ungetestet** — Rückmeldungen aus Mehrkopf-Setups sind sehr willkommen. *Geräte-Eigenregelung* nur mit Einzelkopf.
* **Köpfe müssen auf unterschiedlichen Phasen liegen** (Verantwortung des Betreibers). Der Adapter regelt die **Netto-Summen**-Netzleistung, nicht pro Phase.
* Das Balancing der einzelnen Packs übernimmt das BMS jedes Kopfes — der Adapter steuert nur die Gesamtleistung des Kopfes und nutzt `battery.SC` (gesamt) zur Regelung; einzelne Packs verwaltet er nicht.
* Tagesenergiezähler (`PD`/`GD1`/`GD2`/`LD`) sind rohe **Wh**, nicht kWh. `PD` benötigt Steuermodul-Firmware `ES 1.1.14` (öffentlich als „1.1.4" vermarktet — die öffentliche Zählweise weicht von der internen in `ES` ab); ältere Firmware liefert das Feld schlicht nicht, der State bleibt dann leer.
* Die Tageszähler werden vom Gerät beim Neustart zurückgesetzt — ein Firmwareupdate mitten am Tag setzt sie also auf 0.
* `MD` und `TZ` wirken sofort, werden vom Gerät aber nicht garantiert wortgleich zurückgemeldet — über die Wirkung bestätigen, nicht über das Echo.
* **PV-Eingänge sind ungetestet mit Hardware** (die Referenzanlage läuft ohne PV-Module, daher sind `PV1–4` immer 0). Integration und Regler sind PV-agnostisch und vollständig, aber PV-Firmware-Edge-Cases (z. B. Akku voll + PV-Überschuss, USV-/Bypass-Felder `FP`/`UG`) sind unverifiziert — Feedback willkommen.

## Fehlerbehebung

* **`info.connection` bleibt `false` / keine Daten:** stelle zuerst sicher, dass der **lokale Modus (`LM=1`)** am Gerät aktiviert ist — ohne ihn liefert die lokale API keine Werte. Prüfe dann, ob `http://<geräte-ip>/read` vom ioBroker-Host erreichbar ist (mit Browser oder `curl` testen). Pro Kopf zeigen `heads.<n>.info.online` und `heads.<n>.info.lastError`, welcher ausfällt.
* **Es wird nichts gesteuert:** prüfe den **Steuermodus** — *Aus* schreibt nie. Im *Adapter-Regler* einen gültigen **Quell-State Netzleistung** setzen; in *Geräte-Eigenregelung* einen unterstützten **Zählertyp** und **SN/IP**.
* **Gerät ignoriert `GS` / Akku reagiert nicht:** ein Kopf führt ein geschriebenes `GS` nur bei `MM=0` aus. Im *Adapter-Regler*-Modus erzwingt der Adapter das; wenn du `GS` manuell schreibst, stelle sicher, dass kein Zähler gebunden ist (`MM=0`). Mit gebundenem Zähler (`MM=1`) regelt das Gerät selbst und ignoriert `GS`.
* **Der Regler ist zu langsam / erreicht nie exakt 0:** siehe *Regelverhalten, Genauigkeit und Grenzen* — die Messkette bringt ~1–3 s Latenz mit und der Zähler misst mit endlicher Genauigkeit, ein Band von ±10–20 W um das Ziel ist das physikalische Optimum. Für die schnellste Reaktion das *Präzise*-Profil nutzen (Verstärkung 0,8–1,0, Totband 0, min. Schreibintervall 1000 ms); wer nie einspeisen will, setzt die **Ziel-Netzleistung** auf einen kleinen positiven Bezug.
* **Zeitstempel von States wirken alt / Quality-Flag 32:** Der Adapter schreibt einen State nur bei Wertänderung (Standard-Praxis — schützt die States-DB vor Millionen identischer Schreibvorgänge). Der Zeitstempel zeigt also die letzte Wert*änderung*, nicht den letzten Poll. Die Datenfrische zeigt `info.lastUpdate` (bei jedem erfolgreichen Poll aktualisiert) bzw. `heads.<n>.info.online`. Quality 32 („Ersatz-Initialwert") bleibt nur auf States, die das Gerät nie liefert (z. B. SoC nicht vorhandener Erweiterungspacks); nach jedem Adapterstart werden alle gelieferten Werte einmal geschrieben — ihre Zeitstempel sind also mindestens so frisch wie der Start.
* **Zwei Regler kämpfen um den Akku:** nur einen laufen lassen. Der Adapter erzwingt `MM` für den gewählten Modus — deaktiviere ein externes `GS`-Skript (oder den geräteeigenen `MM` mit anderem Zähler), bevor du einen Steuermodus nutzt.
* **Manche States bleiben leer (`0` / `""`):** ein Gerät liefert nur die Felder, die seine Firmware/Topologie tatsächlich bereitstellt (z. B. weitere Packs `SC2`–`SC5` oder Fehler-Bitmasks nur im Fehlerfall). Die komplette Rohantwort steht immer in `heads.<n>.info.rawResponse`.
* **Nach dem Update von einer Einzelkopf-Version sieht der Baum falsch aus:** der Objektbaum wurde in 0.2.0 auf `heads.<n>.*` umgestellt. Der Adapter entfernt veraltete Objekte beim Start automatisch; bleibt doch etwas übrig, die alten Objekte löschen (oder die Instanz neu anlegen).
* **Köpfe fallen sporadisch aus / Ping-Timeouts:** das WLAN-Modul im Kopf ist schwach, und gestapelte Geräte setzen ein Metallgehäuse direkt über die Antenne. Prüfe `heads.<n>.device.network.WR` (Signalstärke in dB) — unterhalb von −75 dB wird die Verbindung unzuverlässig. Gestapelte Geräte trennen und das **Abfrageintervall** auf 10–15 s erhöhen (die Regelgüte leidet kaum: der Regler reagiert auf die Netzleistungsquelle, nicht auf diese Abfrage). Um den Adapter auszuschließen: Instanz stoppen und den Kopf einige Minuten anpingen — bleiben die Ausfälle, liegt es nicht an der Abfrage. Der Adapter selbst sendet ein `/read` pro Kopf und Intervall, fragt mehrere Köpfe zeitversetzt ab, schließt jede Verbindung nach Gebrauch und bremst nach fehlgeschlagenen Abfragen automatisch ab.

## Änderungshistorie (Changelog)

Die Änderungshistorie wird im Haupt-[README.md](/#/adapters/sunenergyxt500#changelog) gepflegt.

## Lizenz
MIT-Lizenz

Copyright (c) 2026 Marcus Bortel (Creekhail)

Die Erlaubnis wird hiermit unentgeltlich jeder Person erteilt, die eine Kopie dieser Software und der zugehörigen Dokumentationsdateien (die „Software") erhält, mit der Software uneingeschränkt zu handeln, einschließlich und ohne Einschränkung der Rechte, sie zu nutzen, zu kopieren, zu ändern, zusammenzuführen, zu veröffentlichen, zu verbreiten, zu unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software überlassen wird, dies zu gestatten, unter den folgenden Bedingungen:

Der obige Urheberrechtshinweis und dieser Erlaubnishinweis sind in allen Kopien oder wesentlichen Teilen der Software beizufügen.

DIE SOFTWARE WIRD „WIE BESEHEN" BEREITGESTELLT, OHNE JEGLICHE AUSDRÜCKLICHE ODER STILLSCHWEIGENDE GEWÄHRLEISTUNG, EINSCHLIESSLICH, ABER NICHT BESCHRÄNKT AUF DIE GEWÄHRLEISTUNG DER MARKTGÄNGIGKEIT, DER EIGNUNG FÜR EINEN BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG VON RECHTEN. IN KEINEM FALL HAFTEN DIE AUTOREN ODER URHEBERRECHTSINHABER FÜR ANSPRÜCHE, SCHÄDEN ODER SONSTIGE HAFTUNG, OB AUS VERTRAG, UNERLAUBTER HANDLUNG ODER ANDERWEITIG, DIE SICH AUS DER SOFTWARE ODER DER NUTZUNG ODER SONSTIGEN VERWENDUNG DER SOFTWARE ERGEBEN.