---
chapters: {"pages":{"en/adapterref/iobroker.sehybrid/README.md":{"title":{"en":"ioBroker adapter for SolarEdge hybrid inverters"},"content":"en/adapterref/iobroker.sehybrid/README.md"},"en/adapterref/iobroker.sehybrid/README_dev.md":{"title":{"en":"ioBroker.sehybrid — Developer Guide"},"content":"en/adapterref/iobroker.sehybrid/README_dev.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sehybrid/README.md
title: ioBroker-Adapter für SolarEdge-Hybridwechselrichter
hash: rRLjqPwOYarH41L2eOXG3Do06d1/Nqs0Z/GhmVhUXrM=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.sehybrid.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sehybrid.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sehybrid-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sehybrid-stable.svg)
![NPM](https://nodei.co/npm/iobroker.sehybrid.png?downloads=true)
![Test und Freigabe](https://github.com/heresiarch/ioBroker.sehybrid/workflows/Test%20and%20Release/badge.svg)

<img src="admin/sehybrid.png" alt="Logo" width="100" />

# ioBroker-Adapter für SolarEdge-Hybridwechselrichter

> ⚠️ **In Entwicklung – Nutzung auf eigene Gefahr.** Dieser Adapter befindet sich in aktiver Entwicklung. Schnittstellen und Zustandsstrukturen können sich zwischen den Versionen ändern.

## Haftungsausschluss

Dieses Projekt ist ein unabhängiges Open-Source-Projekt und steht in keiner Verbindung zu SolarEdge Technologies, Inc. oder deren Tochtergesellschaften, wird von diesen weder unterstützt noch gesponsert.

SolarEdge und SolarEdge Home Hub sind Marken der SolarEdge Technologies, Inc. In diesem Projekt werden diese Namen ausschließlich zur Kennzeichnung der Produkte verwendet, mit denen der Adapter kompatibel ist.

## Merkmale und Funktionen

Überwacht und steuert SolarEdge-Hybridwechselrichter über **Modbus TCP** (SunSpec). Es liest PV-, Batterie- und Betriebsdaten vom Wechselrichter und stellt diese als ioBroker-Zustände bereit. Außerdem stellt es den **globalen StorEdge-Steuerblock** des Wechselrichters als beschreibbaren Satz von Zuständen bereit, sodass Sie (oder Ihre eigenen ioBroker-Skripte) die Fernsteuerung und zugehörige Speichereinstellungen direkt ansteuern können (siehe [StorEdge-Steuerblock](#storedge-control-block) ).

## Anforderungen

- Ein [SolarEdge Home Hub (Hybrid) Wechselrichter](https://www.solaredge.com/en/products/residential/pv-inverters/solaredge-home-hub-inverters) mit **aktiviertem Modbus TCP** , der über Ihr Netzwerk erreichbar ist.

> Modbus TCP wird üblicherweise im SetApp-/Installationsmenü des Wechselrichters aktiviert. Der Standard-TCP-Port ist **502** oder **1502** .

## Installation

Installieren Sie **sehybrid** über die ioBroker-Administration (Registerkarte „Adapter“) und erstellen Sie anschließend eine Instanz.

## Konfiguration

Öffnen Sie die Instanzeinstellungen und konfigurieren Sie die Verbindung zu Ihrem Wechselrichter:

| Einstellung      | Standard         | Beschreibung                                                                                            |
| ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| Gastgeber        | _(leer)_         | IP-Adresse oder Hostname des Wechselrichters. Die Abfrage beginnt erst, nachdem diese festgelegt wurde. |
| Hafen            | `502` oder `1502` | Modbus TCP-Anschluss des Wechselrichters.                                                               |
| Einheiten-ID     | `1`              | Modbus-Einheit / Slave-ID des Wechselrichters.                                                          |
| Umfrageintervall | `30`             | Wie oft (in Sekunden) der Adapter Daten vom Wechselrichter abliest.                                     |

Für den StorEdge-Steuerblock gibt es keine separate Konfiguration – er wird immer erstellt und ist immer aktiv, unabhängig von jeglichen Einstellungen (siehe [StorEdge-Steuerblock](#storedge-control-block) ).

## Staaten

Der Adapter ordnet die gelesenen Werte in Kanälen an:

- **info.connection** —`true` während der Adapter den Wechselrichter erfolgreich abfragt, `false` ansonsten.
- **Wechselrichter** – Leistungs-, Energie-, AC/DC-Messwerte und Statusinformationen des Wechselrichters.
- **Zähler** — Daten von angeschlossenen SunSpec-Zählern (Import/Export, Leistung, Energie).
- **Batterie** – Ladezustand, Leistung, Temperatur und Status der angeschlossenen Batterien.
- **StorEdgeControlBlock** – die neun StorEdge-Steuerregister, die immer erstellt, gelesen und beschrieben werden (siehe unten).

Die genaue Liste der Bundesstaaten hängt von Ihrem Wechselrichtermodell und den daran angeschlossenen Zählern/Batterien ab.

## StorEdge-Steuerblock

Der Adapter legt stets den **Global StorEdge Control Block** des Wechselrichters frei – neun vom Hersteller dokumentierte Register, beginnend bei `0xE004` — als Wohnung `StorEdgeControlBlock` Dieser Kanal wird bei jedem Adapterstart automatisch erstellt; es gibt keinen Aktivierungsschalter und keine Konfiguration dafür.

Bei jedem Wahlzyklus werden alle neun Bundesstaaten mit den aktuellen Werten des Wechselrichters aktualisiert (`ack=true` Jeder der neun Zustände akzeptiert auch Schreibvorgänge: einen neuen Wert setzen (`ack=false`) aus einem Skript, der Admin-Objektstruktur oder einem anderen Adapter, und es wird bereichsvalidiert und direkt über Modbus an den Wechselrichter geschrieben:

| Zustand (`StorEdgeControlBlock.*`) | Beschreibung                                                                                            |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `storageControlMode`                | Speichersteuerungsmodus                                                                                 |
| `storageAcChargePolicy`             | Klimaanlagen-Gebührenrichtlinie                                                                         |
| `storageAcChargeLimit`              | AC-Ladebegrenzung                                                                                       |
| `storageBackupReservedSetting`      | Backup-Reservierungseinstellung                                                                         |
| `storageChargeDischargeDefaultMode` | Standard-Lade-/Entlademodus                                                                             |
| `remoteControlCommandTimeout`       | Zeitüberschreitung für Fernbedienungsbefehle                                                            |
| `remoteControlCommandMode`          | Fernbedienungsbefehlsmodus (liest `null` (wenn der Wechselrichter nicht ferngesteuert ist – siehe unten) |
| `remoteControlChargeLimit`          | Ladebegrenzung für Fernbedienungen                                                                      |
| `remoteControlDischargeLimit`       | Entladegrenze der Fernbedienung                                                                         |

Die Registeradresse, die Kodierung, die Einheit, der Bereich und der Modbus-Funktionscode für jeden Zustand sind in der unten stehenden Referenz der generierten [StorEdge-Steuerblockregister](#storedge-control-block-registers) enthalten.

> ** `remoteControlCommandMode` Ist `null` es sei denn, die Fernsteuerung ist aktiv.** Der Wechselrichter meldet nur einen realen Befehlsmodus (`0` –`7`) in diesem Register während `storageControlMode` ist eingestellt auf `4` (Fernsteuerung). Wenn sich der Wechselrichter in einem anderen Speichersteuerungsmodus befindet, registrieren Sie `0xE00D` SunSpec wird zurückgegeben `NOT_IMPLEMENTED` Wächter `0xFFFF`, dem der Adapter zugeordnet ist `null` Dies ist so zu erwarten und kein Fehler – das Register nimmt wieder einen gültigen Wert an, sobald `storageControlMode = 4` wird gesetzt (und kehrt zurück zu `null` nachdem der Wechselrichter die Fernbedienung verlässt, z.B. einmal `remoteControlCommandTimeout` (verstreicht). Der Adapter schreibt Folgendes: `null` Bei jeder Umfrage wird der aktuelle Stand aktualisiert, sodass der Status stets die aktuellen Wählerdaten widerspiegelt und nicht einen veralteten Zustand aus einer früheren Fernsteuerungsabfrage beibehält.

Der jeweils zulässige Bereich jedes Zustands ist auf dem Objekt selbst dokumentiert (`common.min` /`common.max` (im administrativen Objektbaum). Schreibvorgänge außerhalb dieses Bereichs werden abgelehnt: Der Adapter protokolliert einen Fehler, schreibt nicht an den Inverter, und der Status behält seinen vorherigen Wert. Es gibt keine Unterdrückung von Schreibvorgängen nur bei Änderungen – jeder gültige Schreibvorgang wird jedes Mal an den Inverter gesendet.

Der Adapter selbst berechnet oder schreibt niemals selbstständig einen Wert in diese Register (es gibt keine integrierte verbrauchsbasierte Automatisierung). Die Ansteuerung dieser Register zur Implementierung von Funktionen wie der Begrenzung der Entladung per Fernsteuerung basierend auf dem Verbrauch im Haus/an der Wanddose obliegt Ihren eigenen ioBroker-Skripten, die einfach in diese Register schreiben können. `StorEdgeControlBlock.remoteControlDischargeLimit` (und die anderen Register, die der Fernsteuerungsmodus benötigt) wie jeder andere beschreibbare Zustand.

> **Portalvoraussetzung für die Fernsteuerung:** wenn Sie den Speichersteuerungsmodus verwenden möchten. `4` (Fernsteuerung): Deaktivieren Sie zunächst das StorEdge-Speicherprofil im SolarEdge-Überwachungsportal / SetApp (Admin → Energiemanager → Speicherprofil). Andernfalls stört das Cloud-Profil des Wechselrichters die Modbus-Befehle und stellt die Fernsteuerung nach etwa 10 Sekunden wieder auf _„Maximaler Eigenverbrauch“_ um. Dies ist ein einmaliger, manueller Schritt am Wechselrichter; der Adapter kann dies nicht automatisch durchführen. Diese Vorgehensweise entspricht der in der Community dokumentierten Lösung (siehe [binsentsu/home-assistant-solaredge-modbus #130](https://github.com/binsentsu/home-assistant-solaredge-modbus/issues/130) ).

> **Hinweis zur Gleitkomma-Kodierung:** Die Leistungssteuerungsregister von StorEdge verwenden _Big-Endian-Gleitkommazahlen (float32, Wortvertauschung_ , Bytes Big-Endian, die beiden 16-Bit-Wörter sind vertauscht – das niederwertige Wort zuerst). Dies entspricht dem Datentyp „Big Endian Word swap“ des Standard-ioBroker-Modbus-Adapters und wurde im Live-Betrieb mit dem Wechselrichter verifiziert.

> **Sicherheit:** Schreiben an `StorEdgeControlBlock` states schreibt direkt in die Batteriesteuerungsregister Ihres Wechselrichters. Überprüfen Sie das Verhalten sorgfältig, bevor Sie darauf aufbauende Automatisierungen verwenden. Dieser Adapter befindet sich noch in der Entwicklung; die Verwendung erfolgt auf eigene Gefahr.

## Modbus-Registerreferenz

Die folgenden Tabellen enthalten die vollständige Modbus-Registerreferenz, die direkt aus den Quellzuordnungen des Adapters generiert wurde (`src/lib/sunspec-map.ts` Und `src/lib/storedge-control-map.ts`) – Sie sind die einzige verlässliche Quelle, daher weicht die Referenz niemals vom Code ab. Bearbeiten Sie den Inhalt zwischen den generierten Markierungen nicht manuell; führen Sie aus `npm run docs:readme` um es zu regenerieren.

### Wechselrichterwerte

<!-- BEGIN:GENERATED:sunspec-inverter -->

| Name                   | Registrieren | Datentyp | Modell | Beschreibung                                                                   |
| ---------------------- | ------------ | -------- | ------ | ------------------------------------------------------------------------------ |
| Aktuelle               | 40071        | uint16   | 101    | I\_AC\_Current — Wechselstrom-Gesamtstromwert                                  |
| acCurrentA             | 40072        | uint16   | 101    | I\_AC\_CurrentA — Wert des Wechselstroms in Phase A                            |
| acCurrentB             | 40073        | uint16   | 101    | I\_AC\_CurrentB — Wert des Wechselstroms in Phase B                            |
| acCurrentC             | 40074        | uint16   | 101    | I\_AC\_CurrentC — Wert des Wechselstroms in Phase C                            |
| WechselspannungAB      | 40076        | uint16   | 101    | I\_AC\_VoltageAB — Wert der Wechselspannung Phase AB                           |
| WechselspannungBC      | 40077        | uint16   | 101    | I\_AC\_VoltageBC — Wert der Wechselspannungsphase BC                           |
| Wechselspannung CA     | 40078        | uint16   | 101    | I\_AC\_VoltageCA — Wert der Wechselspannungsphase CA                           |
| WechselspannungAN      | 40079        | uint16   | 101    | I\_AC\_VoltageAN — Wechselspannungswert Phase A bis N                          |
| WechselspannungBN      | 40080        | uint16   | 101    | I\_AC\_VoltageBN — Wechselspannungswert Phase B nach N                         |
| WechselspannungCN      | 40081        | uint16   | 101    | I\_AC\_VoltageCN — Wechselspannungswert zwischen Phase C und N                 |
| Wechselstrom           | 40083        | int16    | 101    | I\_AC\_Power — Wechselstromleistungswert                                       |
| acFrequenz             | 40085        | uint16   | 101    | I\_AC\_Frequency — Wechselstromfrequenzwert                                    |
| acVA                   | 40087        | int16    | 101    | I\_AC\_VA — Scheinleistung                                                     |
| acVAR                  | 40089        | int16    | 101    | I\_AC\_VAR — Blindleistung                                                     |
| acPF                   | 40091        | int16    | 101    | I\_AC\_PF — Leistungsfaktor                                                    |
| acEnergyWh             | 40093        | acc32    | 101    | I\_AC\_Energy\_WH — Lebenszeitenergieproduktion                                |
| Gleichstrom            | 40096        | uint16   | 101    | I\_DC\_Current — Gleichstromwert                                               |
| Gleichspannung         | 40098        | uint16   | 101    | I\_DC\_Voltage — Gleichspannungswert                                           |
| Gleichstrom            | 40100        | int16    | 101    | I\_DC\_Power — Gleichstromleistungswert                                        |
| tempSink               | 40103        | int16    | 101    | I\_Temp\_Sink — Kühlkörpertemperatur                                           |
| Status                 | 40107        | uint16   | 101    | I\_Status — Betriebszustand                                                    |
| Status des Lieferanten | 40108        | uint16   | 101    | I\_Status\_Vendor – Vom Hersteller definierte Betriebszustände und Fehlercodes |

<!-- END:GENERATED:sunspec-inverter -->

### Zählerwerte

<!-- BEGIN:GENERATED:sunspec-meter -->

| Name         | Registrieren | Datentyp | Modell | Beschreibung                                                                |
| ------------ | ------------ | -------- | ------ | --------------------------------------------------------------------------- |
| mStrom       | 40190        | int16    | 201    | M\_AC\_Current — Wechselstrom (Summe der aktiven Phasen)                    |
| mCurrentA    | 40191        | int16    | 201    | M\_AC\_Current\_A — Wechselstrom der Phase A                                |
| mCurrentB    | 40192        | int16    | 201    | M\_AC\_Current\_B — Wechselstrom der Phase B                                |
| mCurrentC    | 40193        | int16    | 201    | M\_AC\_Current\_C — Wechselstrom der Phase C                                |
| mVoltageLN   | 40195        | int16    | 201    | M\_AC\_Voltage\_LN — Wechselspannung zwischen Außenleiter und Neutralleiter |
| mVoltageAN   | 40196        | int16    | 201    | M\_AC\_Voltage\_AN — Wechselspannung zwischen Phase A und Neutralleiter     |
| mVoltageBN   | 40197        | int16    | 201    | M\_AC\_Voltage\_BN — Wechselspannung zwischen Phase B und Neutralleiter     |
| mVoltageCN   | 40198        | int16    | 201    | M\_AC\_Voltage\_CN — Wechselspannung zwischen Phase C und Neutralleiter     |
| mVoltageLL   | 40199        | int16    | 201    | M\_AC\_Voltage\_LL — Wechselspannung zwischen den Leitern                   |
| mVoltageAB   | 40200        | int16    | 201    | M\_AC\_Voltage\_AB — Wechselspannung zwischen Phase A und Phase B           |
| mVoltageBC   | 40201        | int16    | 201    | M\_AC\_Voltage\_BC — Wechselspannung zwischen Phase B und Phase C           |
| mVoltageCA   | 40202        | int16    | 201    | M\_AC\_Voltage\_CA — Wechselspannung zwischen Phase C und Phase A           |
| mFrequenz    | 40204        | int16    | 201    | M\_AC\_Freq — Wechselstromfrequenz                                          |
| mPower       | 40206        | int16    | 201    | M\_AC\_Power — Gesamtwirkleistung (Summe der aktiven Phasen)                |
| mPowerA      | 40207        | int16    | 201    | M\_AC\_Power\_A — Wechselstromleistung Phase A                              |
| mPowerB      | 40208        | int16    | 201    | M\_AC\_Power\_B — Wechselstromleistung Phase B                              |
| mPowerC      | 40209        | int16    | 201    | M\_AC\_Power\_C — Wirkleistung der Phase C                                  |
| mVA          | 40211        | int16    | 201    | M\_AC\_VA — Gesamte Wechselstrom-Scheinleistung (Summe der aktiven Phasen)  |
| mVAA         | 40212        | int16    | 201    | M\_AC\_VA\_A — Scheinleistung der Phase A                                   |
| mVAB         | 40213        | int16    | 201    | M\_AC\_VA\_B — Scheinleistung der Phase B                                   |
| mVAC         | 40214        | int16    | 201    | M\_AC\_VA\_C — Scheinleistung der Phase C                                   |
| mVAR         | 40216        | int16    | 201    | M\_AC\_VAR — Gesamte Wechselstrom-Blindleistung (Summe der aktiven Phasen)  |
| mVARA        | 40217        | int16    | 201    | M\_AC\_VAR\_A — Wechselstrom-Blindleistung Phase A                          |
| mVARB        | 40218        | int16    | 201    | M\_AC\_VAR\_B — Wechselstrom-Blindleistung Phase B                          |
| mVARC        | 40219        | int16    | 201    | M\_AC\_VAR\_C — Wechselstrom-Blindleistung Phase C                          |
| mPF          | 40221        | int16    | 201    | M\_AC\_PF — Durchschnittlicher Leistungsfaktor                              |
| mPFA         | 40222        | int16    | 201    | M\_AC\_PF\_A — Leistungsfaktor Phase A                                      |
| mPFB         | 40223        | int16    | 201    | M\_AC\_PF\_B — Leistungsfaktor Phase B                                      |
| mPFC         | 40224        | int16    | 201    | M\_AC\_PF\_C — Leistungsfaktor Phase C                                      |
| mExportedWh  | 40226        | acc32    | 201    | M\_Exported — Gesamtexportierte Realenergie                                 |
| mExportedWhA | 40228        | acc32    | 201    | M\_Exported\_A — Phase A Exportierte Realenergie                            |
| mExportedWhB | 40230        | acc32    | 201    | M\_Exported\_B — Phase B Exportierte Realenergie                            |
| mExportedWhC | 40232        | acc32    | 201    | M\_Exported\_C — Phase C Exportierte Realenergie                            |
| mImportedWh  | 40234        | acc32    | 201    | M\_Imported — Gesamtimportierte reale Energie                               |
| mImportedWhA | 40236        | acc32    | 201    | M\_Imported\_A — Phase A Importierte Realenergie                            |
| mImportedWhB | 40238        | acc32    | 201    | M\_Imported\_B — Phase B Importierte Realenergie                            |
| mImportedWhC | 40240        | acc32    | 201    | M\_Imported\_C — Phase C Importierte Realenergie                            |

<!-- END:GENERATED:sunspec-meter -->

### Batteriewerte

<!-- BEGIN:GENERATED:sunspec-battery -->

| Name                        | Registrieren | Datentyp  | Modell   | Beschreibung                                                                                             |
| --------------------------- | ------------ | --------- | -------- | -------------------------------------------------------------------------------------------------------- |
| bewertete Energie           | 57666        | float32le | Batterie | Batterie Nennenergie — Nennenergie                                                                       |
| maxChargeContinuousPower    | 57668        | float32le | Batterie | Maximale Ladeleistung (Max\_Charge\_Continuous\_Power)                                                   |
| maxDischargeContinuousPower | 57670        | float32le | Batterie | Maximale Dauerentladungsleistung der Batterie — Maximale Dauerentladungsleistung                         |
| maxChargePeakPower          | 57672        | float32le | Batterie | Maximale Ladespitzenleistung                                                                             |
| maxDischargePeakPower       | 57674        | float32le | Batterie | Maximale Entladespitzenleistung der Batterie                                                             |
| Durchschnittstemperatur     | 57708        | float32le | Batterie | Durchschnittstemperatur der Batterie — Durchschnittstemperatur                                           |
| maximale Temperatur         | 57710        | float32le | Batterie | Maximale Batterietemperatur — Maximale Temperatur                                                        |
| Momentanspannung            | 57712        | float32le | Batterie | Momentane Batteriespannung — Momentane Spannung                                                          |
| Momentanstrom               | 57714        | float32le | Batterie | Momentanstrom der Batterie                                                                               |
| Momentanleistung            | 57716        | float32le | Batterie | Batterie-Momentanleistung — Momentanleistung                                                             |
| lebenslangeExportenergie    | 57718        | uint64le  | Batterie | Batterielebensdauer\_Exportenergie — Gesamte exportierte Energie                                         |
| LebensdauerImportenergie    | 57722        | uint64le  | Batterie | Batterielebensdauer\_Importenergie — Gesamtimportenergie                                                 |
| maximale Energie            | 57726        | float32le | Batterie | Maximale Batterieenergie — Maximale Energie                                                              |
| verfügbare Energie          | 57728        | float32le | Batterie | Verfügbare Batterieenergie — Verfügbare Energie                                                          |
| soh                         | 57730        | float32le | Batterie | Batterie SOH – Zustand der Gesundheit                                                                    |
| soe                         | 57732        | float32le | Batterie | Batterie-SOE – Energiezustand                                                                            |
| Status                      | 57734        | uint32le  | Batterie | Batteriestatus — Status (0 Aus, 1 Standby, 2 Initialisierung, 3 Laden, 4 Entladen, 5 Fehler, 6 Leerlauf) |
| Status: Intern              | 57736        | uint32le  | Batterie | Batteriestatus\_Intern — Interner Status                                                                 |

<!-- END:GENERATED:sunspec-battery -->

### Register des StorEdge-Steuerblocks

<!-- BEGIN:GENERATED:storedge-control -->

| Name                                  | Adresse | Codierung | Einheit | Reichweite | Funktionscode |
| ------------------------------------- | ------- | --------- | ------- | ---------- | ------------- |
| Speichersteuerungsmodus               | 0xE004  | uint16    |         | 0..4       | FC06          |
| Richtlinie für Speicherstromgebühren  | 0xE005  | uint16    |         | 0..3       | FC06          |
| Speicherladegrenze                    | 0xE006  | float32   | kWh     | 0..∞       | FC16          |
| storageBackupReservedSetting          | 0xE008  | float32   | %       | 0..100     | FC16          |
| Speicher Laden Entladen Standardmodus | 0xE00A  | uint16    |         | 0..7       | FC06          |
| RemoteControlCommandTimeout           | 0xE00B  | uint32    | S       | 0..86400   | FC16          |
| Fernbedienungsbefehlsmodus            | 0xE00D  | uint16    |         | 0..7       | FC06          |
| Fernbedienungsladegrenze              | 0xE00E  | float32   | W       | 0..10000   | FC16          |
| Fernbedienung Entladegrenze           | 0xE010  | float32   | W       | 0..10000   | FC16          |

<!-- END:GENERATED:storedge-control -->

## Fehlerbehebung

- **Keine Daten /`info.connection` Aufenthalte `false` ** — Prüfen Sie, ob der Host korrekt eingestellt ist, Modbus TCP am Wechselrichter aktiviert ist und der Port `502` oder `1502` ist von Ihrem ioBroker-Host aus erreichbar.
- **Verbindungsfehler im Protokoll** – überprüfen Sie, ob die Geräte-ID mit Ihrem Wechselrichter übereinstimmt und ob kein anderer Client die einzige vom Wechselrichter zugelassene Modbus-TCP-Verbindung belegt.
- **Die Fernsteuerung schaltet nach wenigen Sekunden wieder auf „Maximaler Eigenverbrauch“ um** – Sie haben das Speicherprofil „StorEdge“ im SolarEdge-Überwachungsportal/SetApp nicht deaktiviert. Beachten Sie die oben genannte Voraussetzung.
- **Ein Brief an einen `StorEdgeControlBlock` Der Zustand hat keine Auswirkung** – überprüfen Sie das Adapterprotokoll; der Wert liegt wahrscheinlich außerhalb des dokumentierten Bereichs dieses Zustands (sichtbar als `common.min` /`common.max` auf dem Objekt) und wurde zurückgewiesen, bevor es an den Wechselrichter gesendet wurde.

## Unterstützung

Bitte melden Sie Probleme unter [GitHub Issues](https://github.com/heresiarch/ioBroker.sehybrid/issues) .

Entwickler: Anweisungen zum Erstellen, Testen und Veröffentlichen finden Sie in der [Datei README\_dev.md](/#/docs/adapterref/iobroker.sehybrid/README_dev.md) .

## Changelog
### 1.1.4 (2026-11-09)
* fix GH workflows

### 1.1.3 (2026-11-05)
fix: tolerate rejected meter presence read on meterless inverters

### 1.1.2 (2026-10-31)
* fix log priority for modbus write op
* fix translation in io-package.json

### 1.1.1 (2026-10-15)
* fix size attributes

### 1.1.0 (2026-10-15)
* jsonConfig Migration for Admin UI
* fix Readme.md
* fix JSDoc warnings

## License

Copyright (c) 2026 René Meyer <heresiarch@online.de>
see [LICENSE](https://github.com/heresiarch/ioBroker.sehybrid/blob/main/LICENSE)