---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sunenergyxt500/README.md
title: ioBroker.sunenergyxt500
hash: qNrNH04U1gZ07RGJvsZJUnseMJ7UchU0mY3+gqiBJ/M=
---
![Logo](../../../en/adapterref/iobroker.sunenergyxt500/admin/sunenergyxt500.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sunenergyxt500.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sunenergyxt500.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sunenergyxt500-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sunenergyxt500-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sunenergyxt500.png?downloads=true)

# IoBroker.sunenergyxt500
**Tests:** ![Test und Freigabe](https://github.com/Creekhail/ioBroker.sunenergyxt500/workflows/Test%20and%20Release/badge.svg)

## Sunenergyxt500 Adapter für ioBroker
Integration und Eigenverbrauchssteuerung für **[SunEnergyXT 500 / 500 PRO](https://www.sunenergyxt.com/details-500-series)** Wechselstromgekoppelte Hybrid-Batteriespeichersysteme (Hersteller: SunEnergyXT)](https://www.sunenergyxt.com/)) über die **lokale HTTP-API** des Geräts – kein Cloud-Konto erforderlich. Eine Instanz verwaltet **bis zu drei Speichereinheiten**.

## Sprache
- [Englisch](README.en.md) (Standard)
- [Deutsch](README.de.md)

## Merkmale
* Verwaltet **ein bis drei Köpfe** in einer einzigen Instanz, jeder unter seinem eigenen Unterbaum `heads.<n>.*`, plus kombinierte `total.*`-Aggregate.
* Fragt die lokale API ab (`GET /read`) und spiegelt alle stabilen Felder in Zuständen wider: SoC, Batterie-/Netz-/Last-/PV-Leistung, Strom/Spannung pro MPPT, tägliche Energiezähler, SoC pro Akkupack, Geräte-/Firmware-Informationen und Zählerstatus.
* Beschreibbare Steuerfelder (`POST /write`, durch erneutes Einlesen bestätigt), die der offiziellen Steuerungsoberfläche der Integration entsprechen, mit Ausnahme der Felder, die in der API-Dokumentation als *reserviert* gekennzeichnet sind: Netzsollwert `GS`, maximale Einspeisung `IS`, SoC-Grenzwerte `SI`/`SA`/`SO`, Eigenverbrauchsmodus `MM`, Zählerkonfiguration `MD`, Zeitzone `TZ`, Neustart `RT`, maximale Netzleistung `MG`, die Schalter `LFB`/`LPS`/`PM` und der lokale Modus `LM` (⚠️ `LM=1` blockiert die Cloud-/App-Steuerung bis zum Reset). Reservierte Felder (z. B. `PT`, `SI1`, `SA1`) sind nur lesbar zugänglich.
* Zwei umschaltbare **Steuerungsmodi**: ein adapterseitiger Eigenverbrauchs-**Regler** (schreibt `GS` aus *jedem* ioBroker-Zählerstatus, Vorwärtskopplung + P, mit Watchdog/Failsafe), der **einen Netzsollwert auf alle Zähler aufteilt**, oder eine **Geräte-Selbstregulierung** (bindet einen unterstützten Zähler in einen einzigen Speicher ein und ermöglicht es dem Gerät, sich selbst zu steuern) – plus ein **Aus**-Modus für reine Überwachung.
* Eine Schaltfläche **"Alle Köpfe testen"** im Adminbereich prüft die Erreichbarkeit jedes konfigurierten Kopfes (Modell + SoC), bevor Sie speichern.
* Verbindungsindikator (`info.connection`) plus `info.lastUpdate` und pro Kopf `online` / `lastError`.
* Die vollständige, unveränderte `/read`-Antwort jedes Heads wird in `heads.<n>.info.rawResponse` (JSON) gespeichert, sodass jedes Feld, das der Adapter keinem dedizierten Zustand zuordnet, dennoch von dort gelesen werden kann.

## So funktioniert dieser Adapter
Dieser Adapter steuert den Speicher **lokal**, ohne die Hersteller-Cloud. Eine einzelne Instanz verwaltet **ein bis drei Speichereinheiten**. Der Eigenverbrauch kann auf **zwei sich gegenseitig ausschließende Arten** erfolgen – Sie wählen eine über die Einstellung **Steuerungsmodus** aus:

**Modus B – Adaptersteuerung (Standardeinstellung empfohlen, funktioniert mit jedem Zähler, 1–3 Zählerköpfe).** ioBroker liest die aktuelle Netzleistung aus **einem beliebigen Zustand, auf den Sie ihn verweisen** (`gridPowerStateId`), und der Adapter schreibt den Netzsollwert `GS` (Vorsteuerung + P-Korrektur, mit Watchdog). Der Zähler kann *jedes* sein, was ioBroker unterstützt – Shelly, Tasmota, ein Smart-Meter/Modbus-Adapter – **einschließlich Zähler, die der Speicher nicht selbst auslesen kann**. Sie geben einen Zustand an, der die **Netzleistung in Watt** enthält (`>0` = Entnahme, `<0` = Einspeisung; *Quellenvorzeichen umkehren* aktivieren, falls umgekehrt; für kW-/Split-Import/Export-/Phasenzähler wird zunächst ein sauberer Nettowert in einem kleinen ioBroker-Zustand berechnet). Bei mehreren Zählern berechnet der Controller einen Gesamtsollwert und teilt diesen gleichmäßig auf die angeschlossenen Zähler auf – begrenzt auf die jeweilige Leistung. Ein voller (beim Laden) oder leerer (beim Entladen) Zähler wird übersprungen; sein Anteil wird auf die übrigen Zähler verteilt. Der Adapter erzwingt `MM=0` auf jedem Zähler, sodass die Geräte `GS` ausführen und der Zähler in ioBroker voll funktionsfähig bleibt.

**Modus A – Geräte-Selbstregulierung (unterstützte Zähler, nur Einzelzähler).** Der Adapter bindet einen unterstützten Zähler **in den Speicher** (`MM=1` + `MD`) ein und ermöglicht dem Gerät die **Selbstregulierung** – den Eigenverbrauch des Herstellers, der schneller reagieren kann als eine externe Regelung. Dieser Modus ist **nur mit einem Einzelzähler** verfügbar; bei zwei oder drei konfigurierten Zählern kann er nicht ausgewählt werden – verwenden Sie stattdessen den Adapter-Controller. Es werden nur vier Zählertypen unterstützt (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota), und der Zähler muss über das LAN vom Speicher erreichbar sein. Der Adapter schreibt in diesem Modus **nicht** in `GS`. Die Einbindung erfolgt lediglich über mDNS/HTTP-Polling, sodass der Zähler **in ioBroker weiterhin nutzbar bleibt** – im Gegensatz zur Zählerkonfiguration der Hersteller-App, die den Zähler neu konfigurieren und aus ioBroker entfernen kann. Dieser Adapter bindet direkt und vermeidet das.

**Aus (Standardeinstellung, nur Überwachung).** Der Adapter schreibt niemals in die Zustände `MM`/`MD`/`GS`; er fragt sie nur ab. Sie können die Zustände `control.*` weiterhin manuell steuern.

In beiden Steuermodi **besitzt der Adapter `MM`**: Bei jeder Abfrage prüft er den Wert von `MM` jedes Messkopfes anhand des gewählten Modus und stellt ihn (mit einer Warnung) wieder her, falls er geändert wurde – so kann eine fehlerhafte Zählerbindung oder ein externes Skript die Steuerung nicht unbemerkt deaktivieren. Hinweis: Ein Messkopf führt einen geschriebenen Wert von `GS` nur dann aus, wenn `MM=0` aktiv ist; bei einer Zählerbindung (`MM=1`) reguliert er sich selbst und ignoriert `GS`.

**Mehrere Zählerköpfe müssen an unterschiedlichen Phasen angeschlossen sein.** Dies liegt in der Verantwortung des Netzbetreibers – der Adapter überprüft dies nicht (und kann es auch nicht). Der Regler steuert die **Netto-Netzleistung**, die Ihr Zähler meldet. Dies entspricht der Abrechnung eines standardmäßigen deutschen bidirektionalen Netzzählers; eine Optimierung pro Phase fällt nicht in seinen Leistungsumfang.

**Der lokale Modus (`LM=1`) ist erforderlich.** Jedes Gerät stellt seine lokale HTTP-API (`/read` / `/write`) nur dann bereit, wenn der **lokale Modus aktiviert** ist. Ist er deaktiviert, liefert `/read` keine Daten (bestätigt in der getesteten Firmware). Durch Aktivieren des lokalen Modus wird auch die Fernsteuerung per Cloud/App deaktiviert; folglich kann die Smartphone-App des Herstellers das Gerät nicht mehr steuern.

## Anforderungen
* Ein bis drei SunEnergyXT 500 (`PK=1`, 800 W) oder 500 PRO (`PK=2`, 2400 W) Leuchtenköpfe, die im lokalen Netzwerk erreichbar sind (gemischte Modelle sind zulässig).
* **Lokaler Modus (`LM=1`) auf jedem Gerät aktiviert** – erforderlich, damit die lokale HTTP-API Werte liefern kann (siehe *Funktionsweise dieses Adapters*). Dadurch wird auch die Fernsteuerung per Cloud/App deaktiviert.
* Ein Zähler, abhängig vom Steuermodus: Im **Modus B** (Adaptersteuerung) ein beliebiger Zähler, dessen Netzstrom als **ioBroker-Status** verfügbar ist; im **Modus A** (Geräte-Selbstregulierung, Einzelkopf) einer der vier unterstützten Zähler (EcoTracker, Shelly 3EM, Shelly Pro 3EM, Tasmota), die über den Speicher im LAN erreichbar sind. Im *Aus*-Modus nicht erforderlich.

## Installation
1. Öffnen Sie in ioBroker Admin den Menüpunkt **Adapter**, suchen Sie nach **sunenergyxt500** und installieren Sie es.
2. Nach der Installation wird eine Instanz namens „sunenergyxt500.0“ erstellt. Öffnen Sie deren Einstellungen und geben Sie die **IP-Adresse/den Hostnamen von Sensor 1** ein (fügen Sie **Sensor 2/3** hinzu, falls Sie weitere Sensoren haben). Lassen Sie den **Steuerungsmodus** für die reine Überwachung auf *Aus*.
3. Speichern & schließen — der Adapter beginnt mit dem Abfragen und füllt den Objektbaum unter `sunenergyxt500.0.heads.*` (und `total.*`).

## Konfiguration
**Verbindung**

* **Head 1 IP-Adresse/Hostname** (erforderlich) und **Head 2/Head 3** (optional) – lokale Adressen Ihrer Speicherköpfe, jeweils mit optionaler Bezeichnung. Bis zu drei Köpfe werden von dieser Instanz verwaltet. Schließen Sie mehrere Köpfe an **verschiedene Phasen** an (Verantwortung des Betreibers); der Adapter regelt die **gesamt** Netzleistung. Dieselbe Adresse darf nicht zweimal eingegeben werden.
* **Test aller Köpfe** — prüft jeden konfigurierten Kopf und meldet Modell + SoC (oder einen Fehler), sodass Sie die Adressen vor dem Speichern überprüfen können.
* **Abfrageintervall (s)** — wie oft jeder Kopf über `/read` abgefragt wird (Standardwert 5 s).
* **Anfrage-Timeout (ms)** — HTTP-Timeout (Standard 8000 ms).

**Steuerung** – wählen Sie einen **Steuerungsmodus**:

*Aus* (Standardeinstellung) — nur Überwachung; der Adapter schreibt niemals `MM`/`MD`/`GS`.

*Adapter-Controller* (Modus B) — Felder:

* **Netzstromquellenstatus** – ein externer Status, der den Netzstrom Ihres Hauszählers speichert. Konvention: `>0` = Netzbezug, `<0` = Einspeisung. Aktivieren Sie **Quellenvorzeichen umkehren**, wenn Ihr Zähler die umgekehrte Konvention verwendet.
* **Adaptive Regelung** (standardmäßig aktiviert): Regelt in drei vom Hersteller bewährten Stufen – kleine Laständerungen sanft (alle 7 s, 20-W-Schritte), mittlere Laständerungen alle 2,5 s (120 W), große Laständerungen sofort (450 W), mit einer festen Totzone von 5 W. Deaktivieren Sie diese Funktion, um den Regler manuell über die Felder für Verstärkung, Totzone, Schreibintervall und Schrittbegrenzung einzustellen (diese Felder werden nur dann angezeigt).
* **Zielnetzleistung** (W, Standardwert 0): 0 = keine Einspeisung; positive Werte sorgen für eine geringe, bewusste Netzentnahme (niemals Einspeisung), negative Werte für eine geringe, bewusste Einspeisung – gleiche Vorzeichenkonvention wie beim Quellzustand (`>0` = Entnahme).
* **Maximale Anpassung pro Korrektur** (W, Standard 500, 0 = unbegrenzt): Begrenzt die Abweichung des Sollwerts pro Regelschritt, sodass eine hohe Verstärkung bei Messspitzen nicht überschwingen kann.
* **Verstärkung** (Standard 0,3), **Totzone** (W), **Mindest-Schreibintervall** (ms), **Totzone pro Kopf** (W – minimale Änderung des Sollwerts eines Kopfes, bevor er neu beschrieben wird, um Störungen beim Verschieben des Splitts zu vermeiden). Die maximale Leistung jedes Kopfes wird **automatisch** vom Gerät erkannt (800 W für einen 500, 2400 W für einen 500 PRO), sodass gemischte Setups ohne zusätzliche Konfiguration funktionieren.
* **Watchdog-Warnung/Failsafe-Funktion(en)** – Wenn die Grid-Quelle veraltet ist, protokolliert der Controller eine Warnung und erzwingt schließlich `GS=0` an **allen Köpfen** (sicherer Neutralzustand), bis sich die Quelle erholt hat. Die Watchdog-Telemetriedaten sind unter `controller.*` verfügbar.

Der Controller liest vor der Korrektur die tatsächliche Netzleistung jedes Geräts (`GP`) zurück, wodurch ein natürlicher Anti-Windup entsteht, wenn ein Gerät intern begrenzt (z. B. durch SoC).

*Geräte-Selbstregulierung* (Modus A, **nur Einzelkopf**) — Felder:

* **Zählertyp** — EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota.
* **Zähler-SN/IP** – die Seriennummer für Shelly/Tasmota (aufgelöst über mDNS) oder die LAN-IP-Adresse für EcoTracker (direkt). Verwenden Sie für Tasmota das SN-Präfix ohne die letzten vier Zeichen und stellen Sie den **Ein-/Ausschalter** entsprechend Ihrem Energiemonitor-Subtyp ein.

Der Adapter bindet den Zähler (`MM=1` + `MD`), und das Gerät reguliert sich selbst; der Adapter beschreibt `GS` nicht. Der gebundene Zähler bleibt in ioBroker nutzbar. Dieser Modus wird ausgeblendet/gesperrt, sobald ein zweiter oder dritter Messkopf konfiguriert ist.

**Sicherheitshinweise:** Im *Aus*-Modus ist der Adapter schreibgeschützt – er fragt lediglich den Zustand `/read` ab und schreibt nur dann, wenn Sie den Zustand `control.*` anweisen. Im Steuermodus **erzwingt der Adapter den Zustand `MM`** für jeden Messkopf in diesem Modus und stellt ihn nach externen Änderungen wieder her. Führen Sie **nicht** gleichzeitig einen zweiten Schreiber für `GS` aus (z. B. Ihr eigenes Skript oder den Schreiber für `MM` eines Geräts mit einem anderen Messgerät), da diese sonst die Batterie beanspruchen.

## Regelverhalten, Genauigkeit und Grenzen
**Was Sie erwarten können:** Der Regler hält die Netzleistung typischerweise innerhalb eines Bereichs von **±10–20 W um Null** und korrigiert Lastsprünge – abhängig von den Einstellungen – innerhalb von **ca. 1–3 Sekunden bis zu ca. 30 Sekunden**. Ein dauerhafter, exakter Wert von 0,0 W ist **systembedingt nicht erreichbar** – mit keinem Regler auf dieser Hardware.

* **Messgenauigkeit und Rauschen:** Das externe Messgerät selbst misst mit einer Toleranz und einem Rauschen von wenigen Watt – eine Regelung unterhalb dieses Wertes ist sinnlos. (Der Sollwert „GS“ hat eine Auflösung von 1 W, die Sollwertgenauigkeit ist also nicht der limitierende Faktor.)
* **Latenz der Messkette:** Messwerte → ioBroker-Status → Controller → `/write` → Geräterampen. Zwischen einem Lastschritt und seiner Korrektur vergehen unvermeidbar etwa 1–3 Sekunden.
* **Lastdynamik:** Ein Kompressor oder Wasserkocher schaltet sich in Millisekunden ein – jeder Regler reagiert erst danach. Kurze Leistungsspitzen in Ihren Diagrammen sind normal und energetisch bedeutungslos (Wattsekunden).
Der Regler regelt auf die konfigurierte **Ziel-Netzleistung** (Standardwert 0) und oszilliert **symmetrisch** um diesen Wert – kurze, geringe Einspeisevorgänge gehören zur Null-Einspeisung. Wenn Sie niemals Strom einspeisen möchten, stellen Sie den Zielwert auf eine geringe, bewusst gewählte Leistungsaufnahme ein (z. B. +10 W).

**So wirken sich die Einstellungen aus:**

| Einstellung | Effekt | kleinerer Wert | größerer Wert |
|---|---|---|---|
| **Gewinn** | Anteil der pro Schritt korrigierten Abweichung | träge, gleichmäßig (0,3 ≈ 7 Schritte bis ~0) | schnell (1,0 = eine Korrektur), reagiert aber stärker auf Messgeräterauschen; >1 kann zu Überschwingen führen |
| **Ziel-Netzleistung (W)** | der Wert, auf den die Netzleistung geregelt wird | <0 = bewusste Einspeisung | >0 = bewusste Entnahme ("niemals einspeisen") |
| **Maximale Anpassung pro Korrektur (W)** | Begrenzt die Sollwertänderung pro Schritt | Dämpft Messwertspitzen bei hoher Verstärkung | Größerer Wert (oder 0 = unbegrenzt) reagiert schneller auf große Lastsprünge |
| **Totzone (W)** | Abweichungen darunter werden ignoriert | präziser, mehr Schreibvorgänge (0 = alles korrigieren) | ruhiger, hinterlässt eine kleine, dauerhafte Abweichung |
| **Mindestschreibintervall** | Korrekturfrequenz | Schnelleres Einschwingen (Mindestwert 1000 ms) | Weniger Geräteschreibvorgänge, langsamere Nachführung |
| **Schreibstillstandszone pro Kopf** | unterdrückt Mini-Umverteilungen zwischen Köpfen (Mehrkopf) | präziser | weniger Störungen |

**Adaptive Steuerung** (Standardeinstellung) passt die Geschwindigkeit automatisch an die jeweilige Leistungsstufe an. Im manuellen Modus stehen zwei bewährte Profile zur Verfügung: *Entspannt* (Standardeinstellungen – ruhiger Betrieb, minimale Geräteeingaben, ±20–30-Watt-Band) und *Präzise* (Verstärkung 0,8–1,0 · Totzone 0 · Intervall 1000 ms · Schreib-Totzone 0 – ±10–20-Watt-Band, Einschwingzeit 1–3 Sekunden). Über einen Tag hinweg erzielen beide Profile praktisch die gleiche Energiebilanz – der Unterschied liegt lediglich in der Darstellung des Diagramms, nicht im Preis.

## Vorzeichenkonventionen
* `GP` (Netzstrom): `>0` = Einspeisung, `<0` = Entnahme — **Gegenteil eines Shelly-Zählers** (`api.GP ≈ −shelly.gridPower`).
* `BP` (Batterieleistung): `>0` = Laden, `<0` = Entladen.
* `GS` (Netzsollwert): `>0` = Einspeisung/Entladung, `<0` = Netzladung (±2400 W beim Pro, 1 W Auflösung).

## Objektbaum
Jeder Kopf erhält seinen eigenen Unterbaum unter **`heads.<n>.*`** (`n` = 1…3) sowie kombinierte **`total.*`**-Aggregate und adapterbezogene `controller.*` / `info.*`. Innerhalb eines Kopfes sind Zustände in thematischen Kanälen gruppiert; das **Blatt jeder Objekt-ID ist der API-Feldcode des Geräts** (die Entitäts-ID aus der offiziellen Feldreferenz), und der zweisprachige Objektname beschreibt ihn – der Baum entspricht also 1:1 den dokumentierten Feldern des Geräts.

| Kanal | Inhalte |
|---|---|
| `heads.<n>.battery.*` | SoC (`SC`), Akkuleistung (`BP`), SoC pro Akkupack (`SC0`–`SC5`), Online-Akkupacks (`ON`), SoC-Hysterese (`SI1`/`SA1`) |
| `heads.<n>.load.*` | Lastleistung (`LP`), tägliche netzunabhängige Lastenergie (`LD`) |
| `heads.<n>.pv.*` | Gesamt-PV (`PV`) und Leistung/Strom/Spannung pro MPPT (`mppt1`–`mppt4`) |
| `heads.<n>.system.*` | Gesamte Eingangs-/Ausgangsleistung (`IW`/`OP`) |
| `heads.<n>.device.*` | Typ/Modell/Seriennummer/Status; `network.*` (IP, Port, Wi-Fi); `firmware.*` (`ES`/`AS`/`DS` Software, `EH`/`AH`/`DH` Hardware, `BS0`–`BS5` BMS) |
| `heads.<n>.meter.*` | Status des externen Zählers (`MS`) |
| `heads.<n>.ups.*` | USV-Modus / Netzladung / Bypass (`UO`/`UG`/`FP`) |
| `heads.<n>.fault.*` | Fehlerbitmasken (`TF`/`EF`/`DF1`/`DF2`/`AF1`/`AF2`/`BF`) — werden nur belegt, solange ein Fehler aktiv ist |
| `heads.<n>.control.*` | alle **beschreibbaren** Felder (siehe unten) |
| `heads.<n>.info.*` | pro Kopf `online`, `lastError`, `rawResponse` (die vollständigen Rohdaten `/read`) |
| `total.*` | kombinierte Ansicht: kapazitätsgewichtetes `soc`, summiertes `batteryPower` / `gridPower` / `maxPower`, `onlineCount` |
| `controller.*` | Telemetrie des Eigenverbrauchsreglers (`status`, Alter der Netzquelle) |
| `info.*` | `connection` (jeder erreichbare Kopf) und `lastUpdate` |
| `info.*` | `connection` (beliebiger erreichbarer Kopf) und `lastUpdate` |

### Beschreibbare Steuerelemente (`heads.<n>.control.*`)
Gemäß der ioBroker-Konvention befinden sich alle beschreibbaren Felder unter dem jeweiligen Head `control.*`. Da dies die Themen vereinfacht, zeigt diese Tabelle, worauf sich jedes Feld bezieht:

| Objekt | Feld | Bezieht sich auf | Beschreibung |
|---|---|---|---|
| `control.GS` | GS | Netz | Netzleistungssollwert (`>0` Einspeisung / `<0` Netzgebühr) |
| `control.MG` | MG | Netz | Max. netzgekoppelte Ausgangsleistung |
| `control.SI` | SI | Batterie | Min. Entladezustand SoC (Netzmodus) |
| `control.SA` | SA | Akku | Max. Ladezustand (Grid-Modus) |
| `control.SO` | SO | Batterie | Min. Entladezustand SoC (Inselbetrieb) |
| `control.MM` | MM | Modus | Lokaler Nulleinspeisungs-/Eigenverbrauchsmodus (gekoppelt mit `MD`) |
| `control.MD` | MD | Meter | Zählerverbindungs-JSON (gekoppelt mit `MM`) |
| `control.LM` | LM | Modus | Lokaler Modus (⚠️ `1` blockiert die Cloud-/App-Steuerung) |
| `control.LFB` | LFB | Modus | Lastprioritätsschalter |
| `control.LPS` | LPS | Modus | Off-Grid-Ausgangsschalter |
| `control.PM` | PM | Modus | Parallelmodus |
| `control.TZ` | TZ | Gerät | POSIX-Zeitzone |
| `control.RT` | RT | Gerät | Gerät neu starten (Taste – ein sanfter Neustart, **kein** vollständiger Neustart) |
| `control.RT` | RT | Gerät | Gerät neu starten (Taste – ein sanfter Neustart, **kein** vollständiger Neustart) |

Tipp: In der ioBroker-Administration können Sie die Objektliste auch nach dem *writable*-Flag filtern, um alle Steuerelemente auf einmal zu finden.

`device.PK` wird von `DevType` auf Firmware abgeleitet, die `PK` nicht mehr meldet. Reservierte Felder (`PT`, `SI1`, `SA1`) sind schreibgeschützt. Felder, die vom Hersteller entfernt wurden (`PD`, `UP`) oder die nur in der Dokumentation vorhanden sind (`WT`, `BN`), sind nicht zugänglich; alle nicht zugeordneten Felder sind weiterhin in `heads.<n>.info.rawResponse` verfügbar.

## Manuelle Mess-/Modusfelder (MM / MD)
`MM`/`MD` sind die verbrauchsabhängigen Werte eines einzelnen Messkopfes. Wenn Sie einen **Steuermodus** auswählen, übernimmt der Adapter die Verwaltung (Modus A setzt `MM=1` + `MD` auf den einzelnen Messkopf; Modus B erzwingt `MM=0` auf allen Messköpfen), und der Schutzmechanismus stellt beim nächsten Abruf den modusspezifischen Wert `MM` wieder her – daher ist jede manuelle Änderung eines Steuermodus nur vorübergehend.

Die Rohdatenfelder bleiben für die manuelle Nutzung durch Experten beschreibbar (z. B. im *Aus*-Modus). Sie entsprechen der offiziellen Verknüpfung: Das Deaktivieren von `MM` löscht auch `MD`, und das Schreiben von `MD` aktiviert `MM` (sofern nicht leer) oder deaktiviert es (sofern leer). Die JSON-Formate für `MD` für die vier unterstützten Zähler befinden sich in der lokalen API-Referenz des Geräts; im *Geräte-Selbstregulierungsmodus* erstellt der Adapter diese automatisch anhand des Zählertyps und der Seriennummer/IP-Adresse.

## Einschränkungen
* **Bis zu drei Köpfe pro Instanz.** Der Betrieb mit einem einzelnen Kopf wurde auf realer Hardware validiert; die Aufteilung in mehrere Köpfe ist durch Unit-Tests abgedeckt, wurde aber zum Zeitpunkt der Erstellung dieses Dokuments **noch nicht an einer realen Installation mit 2–3 Köpfen getestet** – Rückmeldungen zu Setups mit mehreren Köpfen sind sehr willkommen. *Die Selbstregulierung des Geräts* ist nur für einen einzelnen Kopf verfügbar.
* **Die Netzanschlüsse müssen an unterschiedlichen Phasen angeschlossen sein** (Verantwortung des Netzbetreibers). Der Adapter regelt die **gesamte Netzleistung**, nicht die Leistung pro Phase.
* Die Akku-spezifische Lastverteilung erfolgt durch das jeweilige Batteriemanagementsystem (BMS) des Blitzkopfes – der Adapter steuert lediglich die Gesamtleistung des Blitzkopfes und liest den Wert `battery.SC` (total) zur Kontrolle aus; er verwaltet keine einzelnen Akkus.
* Die täglichen Energiezähler (`GD1`/`GD2`/`LD`) geben den Rohenergieverbrauch in **Wh** an, nicht in kWh.
* `MD` und `TZ` werden sofort wirksam, es wird jedoch nicht garantiert, dass sie vom Gerät wortgetreu wiedergegeben werden – die Bestätigung erfolgt durch die Wirkung, nicht durch die Wiedergabe.
* **PV-Eingänge sind nicht mit der Hardware getestet** (die Referenzinstallation läuft ohne PV-Module, daher sind `PV1–4` immer 0). Integration und Controller sind PV-unabhängig und vollständig, jedoch sind Grenzfälle der PV-Firmware (z. B. Batterie voll + PV-Überschuss, USV-/Bypass-Felder `FP`/`UG`) nicht verifiziert – Feedback ist willkommen.

## Fehlerbehebung
* **`info.connection` bleibt `false` / keine Daten:** Stellen Sie zunächst sicher, dass der **lokale Modus (`LM=1`)** auf dem Gerät aktiviert ist – andernfalls liefert die lokale API keine Werte. Überprüfen Sie anschließend, ob `http://<Geräte-IP>/read` vom ioBroker-Host aus erreichbar ist (Test mit einem Browser oder `curl`). Pro Head zeigen `heads.<n>.info.online` und `heads.<n>.info.lastError` an, welcher Head fehlschlägt.
* **Es wird nichts gesteuert:** Überprüfen Sie den **Steuerungsmodus** – *Aus* schreibt nie. Stellen Sie im *Adapter-Controller* einen gültigen **Netzstromquellenstatus** ein; stellen Sie in der *Geräte-Selbstregulierung* einen unterstützten **Zählertyp** und **SN/IP** ein.
* **Gerät ignoriert `GS` / Batterie reagiert nicht:** Ein Messkopf führt ein geschriebenes `GS` nur aus, wenn `MM=0`. Im *Adapter-Controller*-Modus wird dies vom Adapter erzwungen. Wenn Sie `GS` manuell schreiben, stellen Sie sicher, dass kein Zähler angeschlossen ist (`MM=0`). Bei angeschlossenem Zähler (`MM=1`) reguliert sich das Gerät selbst und ignoriert `GS`.
* **Der Regler ist zu langsam / erreicht nie exakt 0:** Siehe *Regelverhalten, Genauigkeit und Grenzen* – die Messkette verursacht eine Latenz von ca. 1–3 s, und das Messgerät selbst hat eine begrenzte Genauigkeit. Daher ist ein Bereich von ±10–20 W um den Zielwert physikalisch optimal. Für die schnellste Reaktion verwenden Sie das Profil *Präzise* (Verstärkung 0,8–1,0, Totzone 0, minimales Schreibintervall 1000 ms). Um eine Einspeisung zu vermeiden, stellen Sie die **Zielnetzleistung** auf einen kleinen positiven Wert ein.
* **Status-Zeitstempel wirken veraltet / Qualitätsflag 32:** Der Adapter schreibt einen Status nur, wenn sich sein Wert ändert (Standardverfahren – dies schützt die Statusdatenbank vor Millionen identischer Schreibvorgänge). Der Zeitstempel eines Status zeigt daher die letzte Wertänderung an, nicht die letzte Abfrage. Überprüfen Sie die Aktualität der Daten mit `info.lastUpdate` (wird bei jeder erfolgreichen Abfrage aktualisiert) und `heads.<n>.info.online`. Die Qualität 32 („Anfangswert ersetzen“) wird nur für Status verwendet, die das Gerät nie liefert (z. B. den SoC von nicht installierten Erweiterungspaketen). Nach jedem Start des Adapters werden alle gelieferten Werte einmal geschrieben, sodass ihre Zeitstempel mindestens so aktuell sind wie beim Start.
* **Zwei Controller konkurrieren um die Batterie:** Verwenden Sie nur einen. Der Adapter erzwingt `MM` für den ausgewählten Modus – deaktivieren Sie vor der Verwendung eines Steuermodus alle externen `GS`-Skripte (oder das geräteeigene `MM` mit einem anderen Zähler).
* **Einige Zustände bleiben leer (`0` / `""`):** Ein Gerät gibt nur die Felder zurück, die seine Firmware/Topologie tatsächlich bereitstellt (z. B. zusätzliche Pakete `SC2`–`SC5` oder Fehlerbitmasken nur im Fehlerfall). Die vollständige Rohantwort ist immer in `heads.<n>.info.rawResponse` verfügbar.
* **Nach dem Update von einer Single-Head-Version sieht die Baumstruktur fehlerhaft aus:** Die Objektstruktur wurde in Version 0.2.0 in `heads.<n>.*` umstrukturiert. Der Adapter entfernt veraltete Objekte automatisch beim Start; falls noch Objekte vorhanden sind, löschen Sie diese (oder fügen Sie die Instanz erneut hinzu).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.2.7 (2026-07-05)
* (Creekhail) New **adaptive control** (enabled by default): the controller regulates in three manufacturer-proven tiers — small deviations gently (every 7 s, 20 W steps), medium ones every 2.5 s (120 W), large load steps immediately (450 W), with a fixed 5 W dead band. Disable the new checkbox to keep tuning gain, dead band, write interval and step limit manually. **Existing installations are switched to adaptive by this update** (uncheck to return to your manual tuning).
* (Creekhail) Admin: help texts for gain, dead band and min. write interval; requires admin >= 7.8.23; CHANGELOG_OLD.md added and the Dependabot auto-merge workflow aligned with the canonical template (iobroker-bot).

### 0.2.6 (2026-07-04)
* (Creekhail) Controller: new **target grid power** (deliberate small draw or feed-in — e.g. +10 W to never feed in; the manufacturer's HA blueprint offers the same option) and a **maximum adjustment per correction** step (default 500 W) that allows a high gain without overshoot on meter spikes.
* (Creekhail) Documentation: corrected the setpoint-granularity statement — the device accepts `GS` with 1 W resolution (previously documented as 10 W steps); the practical accuracy limits are measurement-chain latency and meter noise.

### 0.2.5 (2026-07-02)
* (Creekhail) Review follow-up: added the manufacturer/product link to the README, and the controller now only accepts acknowledged grid-power values (`ack=true`) from the configured meter state (a manually written test value can no longer drive the battery).

### 0.2.4 (2026-07-02)
* (Creekhail) State names are now provided in all ioBroker languages: English and German stay hand-written, the other languages are machine-translated (generated file, merged at object creation; existing installations are updated in place).

### 0.2.3 (2026-07-02)
* (Creekhail) Object-tree compliance for the repository review:
  * The `heads` container is now a **folder** so the hierarchy follows the required device→channel→state order.
  * The switch states `control.MM` / `LM` / `LFB` / `LPS` / `PM` are now real **booleans** (previously 0/1 numbers) — adjust scripts that read or write them; the device still receives 0/1.
  * Corrected roles: `GS`/`IS`/`MG` use `level`, `ups.UO` uses `value`.
  * Object definitions are merged onto existing objects on start, so role/type/name updates reach existing installations (user settings like history configs are preserved).

### 0.2.2 (2026-07-02)
* (Creekhail) Repository-checker compliance: complete admin translations in all languages (including the validator messages), release notes translated into all languages, removed an unknown jsonConfig property from the test button and use the adapter-managed timer during unload.

### 0.2.1 (2026-07-01)
* (Creekhail) Controller robustness and hardening:
  * Config values of 0 are respected (gain / dead bands) instead of silently becoming defaults.
  * A failing GS write on one head no longer aborts the setpoints of the other heads.
  * Anti-windup: when a device visibly limits internally (SoC/temperature), the controller adopts the reported grid power as its feed-forward base.
  * GS is neutralized to 0 on all reachable heads when the controller stops (adapter stop/restart or leaving controller mode), so no head keeps executing a stale setpoint unwatched.
  * Heads are polled in parallel (one unreachable head no longer stretches the poll cycle); fewer state-DB reads per poll.
  * The startup object cleanup only touches adapter-managed subtrees; user-created states in the namespace survive.
  * Missing MG falls back to the model's power limit (500 → 800 W) instead of assuming a PRO; device responses are size-capped.
  * Manual GS writes are rejected (with a warning) while the controller is active; failsafe no longer retries offline heads every tick.
  * New unit tests for the controller (regulation, dead bands, throttling, failsafe, anti-windup).

### 0.2.0 (2026-06-30)
* (Creekhail) Multi-head support: manage up to three SunEnergyXT heads in one instance. The adapter controller now computes one grid setpoint and splits it across all online heads (equal split, gated by each head's SoC headroom, with per-head power caps and overflow redistribution). New per-head object tree `heads.<n>.*` and combined `total.*` aggregates; a "Test all heads" connectivity button; device self-regulation is restricted to a single head. **The object tree was restructured — existing single-head instances should be re-created (delete the old objects / re-add the instance).**

### 0.1.1 (2026-06-29)
* (Creekhail) Released via npm trusted publishing (provenance) and a package metadata fix.

### 0.1.0 (2026-06-28)
* (Creekhail) Initial release: local-API polling to states; writable control fields; two switchable control modes — an adapter-side self-consumption controller (any ioBroker meter state, feed-forward + P, with watchdog/failsafe) and device self-regulation (binds a supported meter: EcoTracker / Shelly 3EM / Shelly Pro 3EM / Tasmota); plus a monitoring-only mode, with an MM-mode guard.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 Marcus Bortel (Creekhail)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.