---
chapters: {"pages":{"en/adapterref/iobroker.kecontact/README.md":{"title":{"en":"ioBroker.kecontact"},"content":"en/adapterref/iobroker.kecontact/README.md"},"en/adapterref/iobroker.kecontact/kecontact.md":{"title":{"en":"Programmablauf – ioBroker.kecontact"},"content":"en/adapterref/iobroker.kecontact/kecontact.md"}}}
---
# Programmablauf – ioBroker.kecontact

Dieses Dokument beschreibt den Programmfluss des Adapters, das Zusammenspiel der
Konfigurations­optionen und der Datenpunkte. Die gesamte Logik liegt in `main.js`
in der Klasse `Kecontact`.

---

## 1. Übersicht

Der Adapter steuert eine KEBA KeContact P20/P30 (bzw. BMW i) Wallbox über **UDP**.
Kernaufgabe: den Ladestrom periodisch so regeln, dass das Fahrzeug bevorzugt aus
PV-Überschuss (optional aus Batteriespeicher) geladen wird und dabei Netz- und
Amperegrenzen eingehalten werden.

Zwei Betriebsarten:

- **Aktiv** (Standard): Adapter empfängt Broadcasts der Wallbox, rechnet und regelt.
- **Passiv** (`passiveMode` oder `subsequent wallbox`): nur Beobachtung, keine
  Regelung. Nötig, weil pro Wallbox nur **eine** Instanz den Broadcast-Port
  belegen darf.

---

## 2. Lebenszyklus / Start

```mermaid
flowchart TD
    A[onReady] --> B{I18n vorhanden?<br/>js-controller >= 7}
    B -- nein --> Bx[Fehler, Abbruch]
    B -- ja --> C[checkConfig]
    C -- ungültig --> Cx[Fehler, Abbruch]
    C -- gültig --> D{loadChargingSessions?}
    D -- ja --> E[createHistory<br/>History-Datenpunkte anlegen]
    D -- nein --> F
    E --> F[info.connection = false]
    F --> G[setupUdpCommunication<br/>txSocket + 2 rxSockets binden]
    G --> H[initializeInternalStateValues<br/>alle States in internen Cache laden<br/>Foreign-States registrieren]
    H --> I[subscribeStatesAndStartWorking]
    I --> J["subscribeStates('*')<br/>+ stateChangeListeners registrieren"]
    J --> K[requestReports<br/>Report 1/2/3 anfordern]
    K --> L[enableChargingTimer<br/>Intervall = aktiv/passiv Update]
    L --> M((Poll-Schleife läuft))
```

Wichtige Punkte:

- `checkConfig()` verwirft ungültige IPs (`0.0.0.0`, `127.0.0.1`), setzt
  `isPassive` und die Update-Intervalle.
- Der interne State-Cache (`getStateInternal`/`setStateInternal`) spiegelt alle
  ioBroker-States, damit die Regelung ohne asynchrone Reads rechnen kann.
- `stateVehicleSoC` kann auf einen **Fremd-State** zeigen; dieser wird beim Start
  und bei Änderung dynamisch (un)subscribed.

---

## 3. UDP-Kommunikation

```mermaid
flowchart LR
    subgraph Empfang
      RX1[rxSocketReports<br/>Port 7090] --> HM[handleWallboxMessage]
      RX2[rxSocketBroadcast<br/>Broadcast-Port] --> HB[handleWallboxBroadcast]
      HM --> HMSG[handleMessage]
      HB --> HMSG
      HMSG --> HJ[handleJsonMessage<br/>KEBA-Report JSON parsen]
      HJ --> UP[updateState<br/>Datenpunkte aktualisieren]
    end
    subgraph Senden
      Q[sendUdpDatagram<br/>Prioritäts-Queue] --> SN[sendNextQueueDatagram<br/>gedrosselt via sendDelayTimer]
      SN --> TX[txSocket -> Wallbox]
    end
```

- **Senden ist gedrosselt** (Queue + `sendDelayTimer`), weil die Wallbox schnelle
  Kommandos verwirft. `highPriority` stellt ein Kommando vorne in die Queue.
- Schreiben auf steuernde Datenpunkte löst über `stateChangeListeners` das passende
  UDP-Kommando aus (siehe Tabelle Abschnitt 6).
- Bei mehreren Instanzen tauschen sich diese über `internal.message`
  (`handleWallboxExchange`) aus.

---

## 4. Regel-Schleife: `checkWallboxPower()`

Das Herz des Adapters. Wird periodisch (Timer) und bei erzwungenen Neuberechnungen
(`forceUpdateOfCalculation`) aufgerufen. Ergebnis ist ein Ladestrom `curr` in mA,
der via `regulateWallbox()` gesetzt wird – oder `stopCharging()`.

```mermaid
flowchart TD
    START[checkWallboxPower] --> LADEN{lädt Fahrzeug bereits<br/>ohne chargeTimestamp?}
    LADEN -- ja --> TS[chargeTimestamp setzen]
    LADEN -- nein --> LIMITS
    TS --> LIMITS

    subgraph LIMITS[Obergrenzen bestimmen tempMax]
      L1[Start: tempMax = getMaxCurrent]
      L1 --> L2{maxGridPowerActive?}
      L2 -- ja --> L2a[Netzleistungs-Limit<br/>getTotalPowerAvailable -> Ampere]
      L2 -- nein --> L3
      L2a --> L3{maxAmperageActive?}
      L3 -- ja --> L3a[Amperegrenze je Phase<br/>getTotalAmperageAvailable]
      L3 -- nein --> L4
      L3a --> L4{§14a EnWG aktiv?}
      L4 -- ja --> L4a[getMaxCurrentEnWG]
      L4 -- nein --> L5
      L4a --> L5[tempMax < minCurrent -> tempMax = 0]
    end

    LIMITS --> SUR[available = getSurplusWithoutWallbox<br/>statistics.surplus setzen]
    SUR --> SW{check1p3pSwitching<br/>läuft Phasenumschaltung?}
    SW -- ja --> RET1[return, warten]
    SW -- nein --> PAS{isPassive?}
    PAS -- ja --> RET2[nur Session-Daten pflegen, return]
    PAS -- nein --> IVAL{innerhalb<br/>intervalCalculating?}
    IVAL -- ja --> IVALa[nur bei Bedarf auf tempMax deckeln, return]
    IVAL -- nein --> LOCK

    LOCK{gesperrt?<br/>pauseWallbox / tempMax=0 /<br/>PV aktiv & nicht eingesteckt}
    LOCK -- ja --> CURR0[curr = 0]
    LOCK -- nein --> DYN{isDynamicChargingActive?<br/>PV-Automatik greift}

    DYN -- nein --> MAXP[curr = tempMax<br/>Laden mit Maximalleistung<br/>1p3p -> 3p bzw. off]
    DYN -- ja --> CALC[curr = getAmperage available, phases]

    CALC --> BAT{Batterie-Mindestladung?}
    BAT --> SOC{maxSoC erreicht?}
    SOC -- ja --> CURR0
    SOC -- nein --> P13{has1P3PAutomatic?}
    P13 -- ja --> P13a[prepareFor1p/3pCharging<br/>je nach manuellem Schalter/Überschuss]
    P13 -- nein --> ADD
    P13a --> ADD[addPower: Netzbezug bis Grenze zulassen]
    ADD --> HOLD{chargeTimestamp gesetzt?<br/>Session halten}
    HOLD -- ja --> HOLDa[underusage / minTime /<br/>regardTime prüfen -> ggf. curr = minCurrent]
    HOLD -- nein --> AUTH
    HOLDa --> AUTH

    CURR0 --> AUTH
    MAXP --> AUTH
    AUTH{authChargingTime aktiv &<br/>frisch autorisiert?}
    AUTH -- ja --> AUTHa[curr = minCurrent für Startfenster]
    AUTH -- nein --> DEC
    AUTHa --> DEC

    DEC{curr < minCurrent?}
    DEC -- ja --> STOP[Phasen auf Default,<br/>stopCharging]
    DEC -- nein --> SET[ggf. 1p3p umschalten<br/>curr auf tempMax deckeln<br/>regulateWallbox curr<br/>chargingToBeStarted = true]
```

### Kern-Reihenfolge (Priorität der Einschränkungen)

1. **Harte Obergrenzen** zuerst: `maxGridPower` → `maxAmperage` → `§14a EnWG`.
   Diese können den Strom nur **senken**, nie erhöhen.
2. **Sperren**: manuelle Pause, kein Fahrzeug eingesteckt, `tempMax = 0`.
3. **Betriebsmodus**: dynamisch (PV) vs. Maximalleistung
   (`isDynamicChargingActive` – abhängig von PV-Automatik, `targetSoC`, `maxSoC`).
4. **Überschussrechnung** mit optionaler Batterie-Einbeziehung.
5. **Session-Halten**: `addPower`, `underusage`, `minTime`, `regardTime` verhindern
   ständiges Ein/Aus – ein einmal gestarteter Ladevorgang wird toleriert
   fortgeführt.
6. **Phasenumschaltung 1p/3p** als Sonderfall, der die Rechnung neu anstößt.

---

## 5. Zusammenspiel der Optionen (Konfiguration → Verhalten)

Optionen aus `admin/jsonConfig.json` (`this.config.*`). Fremd-States sind Verweise
auf Datenpunkte **anderer** Adapter (Energiezähler, Speicher, Fahrzeug-SoC).

| Bereich | Option(en) | Wirkung im Ablauf |
|---|---|---|
| Verbindung | `host`, `pollInterval`, `passiveMode`, `loadChargingSessions`, `lessInfoLogs` | Basis: IP, Poll-Takt, aktiv/passiv, Session-Download, Log-Detail |
| PV-Basis | `stateSurplus`, `stateRegard` | Fremd-States für Überschuss / Netzbezug → `getSurplusWithoutWallbox` |
| PV-Feintuning | `minAmperage`, `addPower`, `delta`, `underusage`, `minTime`, `regardTime` | Start-/Halte-Verhalten der Session, Hysterese gegen Flattern |
| Wallbox-Einbezug | `statesIncludeWallbox`, `wallboxNotIncluded` | ob Wallbox-Leistung in Zählerwerten bereits enthalten ist |
| 1p/3p | `state1p3pSwitch`, `1p3pSwitchIsNO`, `1p3pViaX2`, `useX1forAutomatic` | Phasenumschaltung via Schütz (NO/NC) oder X2-Port; X1-Eingang |
| Batteriespeicher | `stateBatteryCharging`, `stateBatteryDischarging`, `stateBatterySoC`, `batteryPower`, `batteryChargePower`, `batteryMinSoC`, `batteryLimitSoC`, `batteryStorageStrategy` | ob/wie Speicher fürs Fahrzeug genutzt wird → `getBatteryStoragePower`, Strategie 1–4 |
| §14a EnWG | `stateEnWG`, `dynamicEnWG`, `powerEnWG` | fixe 6 A oder dynamische Begrenzung → `getMaxCurrentEnWG` |
| Leistungslimit | `maxPower`, `stateEnergyMeter1..3`, `wallboxNotIncluded` | Gesamt­leistungs-Deckel → `getTotalPowerAvailable` |
| Amperelimit | `maxAmperage`, `stateAmperagePhase1..3`, `amperageUnit` | Deckel je Phase → `getTotalAmperageAvailable` |
| Autorisierung | `authChargingTime` | Zwangs-Ladefenster nach RFID-Autorisierung |

Merksatz: **Fremd-States liefern Messwerte**, **Optionen liefern Parameter/Grenzen**,
und die dynamischen `automatic.*`-Datenpunkte erlauben Übersteuerung zur Laufzeit.

---

## 6. Steuernde Datenpunkte (Schreiben → UDP-Kommando)

Registriert in `subscribeStatesAndStartWorking()`. Schreiben löst sofort ein
UDP-Kommando aus:

| Datenpunkt | Kommando an Wallbox |
|---|---|
| `enableUser` | `ena 0/1` |
| `currentUser` | `curr <mA>` |
| `currentTimer` (+`timeoutCurrentTimer`) | `currtime <mA> <t>` |
| `output` | `output 0/1` |
| `display` | `display 0 0 0 0 <text>` |
| `setenergy` | `setenergy <Wh*10>` |
| `report` | `report <n>` |
| `start` / `stop` | `start <tag>` / `stop <tag>` |
| `setdatetime` | `setdatetime <...>` |
| `unlock` | `unlock` |
| `x2phaseSource` / `x2phaseSwitch` | `x2src <n>` / `x2 <n>` (+ `1p3pSwTimestamp`) |

---

## 7. Dynamische Steuer-Datenpunkte `automatic.*`

Diese verändern das Regelverhalten zur Laufzeit (per Skript/Vis beschreibbar),
ohne UDP-Kommando – sie fließen in `checkWallboxPower` ein:

| Datenpunkt | Bedeutung |
|---|---|
| `automatic.photovoltaics` | PV-Automatik an (dynamisch) / aus (Maximalleistung) |
| `automatic.pauseWallbox` | sofortiger Ladestopp, solange `true` |
| `automatic.addPower` | erlaubter zusätzlicher Netzbezug (W); negativ = Reserve |
| `automatic.limitCurrent` / `automatic.limitCurrent1p` | Ampere-Deckel dynamisches Laden (0 = aus / aus Settings) |
| `automatic.maxGridPower` | Netzleistungs-Deckel (0 = aus Settings, `maxPower`) |
| `automatic.calcPhases` | Phasenzahl für Berechnung (KeContact Deutschland-Edition) |
| `automatic.1p3pCharging` | erzwungen 1p oder 3p |
| `automatic.batteryStorageStrategy` | Speicher-Strategie 1–4 |
| `automatic.batterySoCForCharging` | Speicher erst ab diesem SoC nutzen |
| `automatic.stateVehicleSoC` | Fremd-State mit Fahrzeug-SoC |
| `automatic.targetSoC` | bis zu diesem SoC ohne PV mit Maximalleistung laden |
| `automatic.maxSoC` | oberhalb dieses SoC nicht mehr laden |
| `automatic.resetTargetSoC` | `targetSoC` nach Erreichen zurücksetzen |

---

## 8. Ergebnis-/Status-Datenpunkte

| Datenpunkt | Inhalt (gesetzt durch Regelung) |
|---|---|
| `statistics.surplus` | aktueller Überschuss für PV-Automatik |
| `statistics.maxPower` / `statistics.maxAmperage` | wirksame Leistungs-/Amperegrenze |
| `statistics.chargingPhases` | aktuelle Phasenzahl |
| `statistics.plugTimestamp` / `chargeTimestamp` / `authPlugTimestamp` | Zeitstempel Einstecken / Ladebeginn / Autorisierung |
| `statistics.consumptionTimestamp` / `1p3pSwTimestamp` | Halte-Timer Netzbezug / letzte Phasenumschaltung |
| `statistics.lastChargeStart` / `lastChargeFinish` / `lastChargeAmount` | letzte Ladesession |
| `statistics.sessionId`, `rfid_tag`, `rfid_class` | Session-/RFID-Infos |
| `info.connection` | Wallbox erreichbar |

Roh-Messwerte der Wallbox (aus KEBA-Reports): `state`, `plug`, `p`, `u1..u3`,
`i1..i3`, `ePres`, `eTotal`, `maxCurrent`, `currentHardware` usw.

---

## 9. Kurz-Zusammenfassung des Zusammenspiels

1. **Messwerte** kommen per UDP-Report (eigene Wallbox) und aus **Fremd-States**
   (Zähler, Speicher, Fahrzeug-SoC) in den internen Cache.
2. **Optionen** legen Parameter und harte Grenzen fest; **`automatic.*`** erlaubt
   Laufzeit-Übersteuerung.
3. `checkWallboxPower()` verrechnet beides zu einem Ladestrom, unter Beachtung der
   Reihenfolge Grenzen → Sperren → Modus → Überschuss → Session-Halten → 1p/3p.
4. Das Ergebnis wird via `regulateWallbox()`/`stopCharging()` als UDP-Kommando
   gesendet und in `statistics.*` gespiegelt.