---
chapters: {"pages":{"en/adapterref/iobroker.go-e-charger/README.md":{"title":{"en":"ioBroker.go-eCharger"},"content":"en/adapterref/iobroker.go-e-charger/README.md"},"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e.md":{"title":{"en":"Migrating from the go-e adapter (ioBroker.go-e) to go-e-charger"},"content":"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e.md"},"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md":{"title":{"en":"Umstieg vom go-e-Adapter (ioBroker.go-e) auf go-e-charger"},"content":"en/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.go-e-charger/docu/migration-from-go-e_de.md
title: Wechsel vom go-e-Adapter (ioBroker.go-e) auf go-e-charger
hash: jI9DpSxkqSrYi4REIUuDthfilpto58T+YDv8DoQM9Qg=
---
# Wechsel vom go-e-Adapter (ioBroker.go-e) auf go-e-charger

[Englische Version](/#/docs/adapterref/iobroker.go-e-charger/docu/migration-from-go-e.md)

Diese Anleitung hilft Nutzern des Adapters [ioBroker.go-e](https://github.com/MK-2001/ioBroker.go-e) (Instanz `go-e.0`) beim Umstieg auf **ioBroker.go-e-charger** (Instanz `go-e-charger.0`). Beide Adapter sprechen die lokale HTTP-API des Chargers an, verwenden aber unterschiedliche Objektstrukturen und Konfigurationskonzepte. Beim Umstieg müssen daher Skripte, Visualisierungen und History-Einstellungen auf die neuen Datenpunkte umgestellt werden.

## Warum umsteigen?

- **Mehrere Ladegeräte in einer Instanz** , PV-Überschuss wird in der Reihenfolge der Wallbox-Liste verteilt, optional mit Gesamtstrom-Budget (Absicherung).
- **ChargeManager** : PV-Überschussladen mit Hausakku-Modi (deaktiviert / Mindest-SoC / Akku-Priorität), SoC-Hysterese und Prüfung auf veraltete SoC-Werte.
- **Automatische 1-/3-Phasenumschaltung** (ab Gen 3) und `Settings.PhaseMode` (0 = automatisch, 1, 3) im laufenden Betrieb.
- **Nur-Lese-Modus** pro Charger, `info.chargeState` erklärt, warum ein Charger (nicht) lädt, Offline-Erkennung.
- Ladungen, die per go-e-App, Taster oder RFID gestartet wurden, werden nicht abgebrochen, wenn beide Adapter-Modi aus sind.
- Nutzt HTTP-API v1 und v2, getestet mit Firmware V033 bis V60.6, wird aktiv gepflegt.

Der go-e-Adapter bietet einige Funktionen, die go-e-charger (noch) nicht hat – siehe [(noch) nicht unterstützt](#noch-nicht-unterstützt) , bevor du umsteigst.

## Zuordnung der Datenpunkte

`X` ist die Wallbox-Nummer in go-e-charger (`Wallbox_0` für den ersten Eintrag der Wallbox-Liste). Werte, die in go-e-charger nur lesbar sind, werden über die `Settings` -Datenpunkte gesteuert.

| go-e (`go-e.0.`)                                                | go-e-charger (`go-e-charger.0.`)                                                                                      | Hinweise                                                                                                 |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `info.connection`                                                | `Wallbox_X.info.connection`                                                                                            |                                                                                                          |
| `car`                                                            | `Wallbox_X.info.carState`                                                                                              | gleiche Werte (1 = bereit, 2 = lädt, 3 = warte auf Fahrzeug, 4 = fertig); Text rein `info.carStateString` |
| `allow_charging` (schreibbar)                                    | `Wallbox_X.Power.ChargingAllowed` (boolean, nur lesbar)                                                                | Steuerung über `Settings.ChargeNOW` /`Settings.ChargeManager`                                             |
| `ampere` (schreibbar)                                            | `Wallbox_X.Power.ChargeCurrent` (nur lesbar)                                                                           | Strom für ChargeNOW: `Settings.ChargeCurrent`                                                             |
| `amperePV` (schreibbar)                                          | `Wallbox_X.Power.ChargeCurrentVolatile` (nur lesbar)                                                                   | wird vom ChargeManager gesetzt                                                                           |
| `solarLoadOnly`                                                  | `Wallbox_X.Settings.ChargeManager`                                                                                     | PV-Überschussladen ein/aus                                                                               |
| `energy.power` (kW)                                              | `Wallbox_X.Power.Charge` ( **W** )                                                                                     | andere Einheit                                                                                           |
| `energy.phase1..3.voltage`                                       | `Wallbox_X.Power.VoltageL1..L3`                                                                                        |                                                                                                          |
| `energy.phase1..3.ampere`                                        | `Wallbox_X.Power.MeasuredMaxPhaseCurrent`                                                                              | nur das Maximum der drei Phasen ( [#922](https://github.com/hombach/ioBroker.go-e-charger/issues/922) )  |
| `phases` (Rohwert `pha`), `energy.phaseN.pre/postContactorActive` | `Wallbox_X.Power.GridPhases`, `Wallbox_X.Power.EnabledPhases`                                                          | Anzahl Phasen statt Bit-Flags                                                                            |
| `phaseSwitchModeEnabled`, `phaseSwitchMode`                      | Wallbox-Option „automatische 1-/3-Phasenumschaltung“, `Wallbox_X.Settings.PhaseMode`, `Wallbox_X.Settings.Charge3Phase` | `PhaseMode`: 0 = automatisch, 1 = einphasig, 3 = dreiphasig                                             |
| `energy.total`                                                   | `Wallbox_X.statistics.chargedEnergy` (kWh)                                                                             | Summe aller Charger: `statisticsGlobal.chargedEnergy`                                                     |
| `reboot_counter`, `reboot_timer`                                 | `Wallbox_X.statistics.rebootCounter`, `Wallbox_X.statistics.rebootTimer` (H)                                           |                                                                                                          |
| `firmware_version`                                               | `Wallbox_X.info.firmwareVersion`                                                                                       | Hardware-Generation: `info.hardwareVersion`                                                               |
| `max_ampere` (`ama`), `cable_ampere_code` (`cbl`)               | `Wallbox_X.info.hardwareMaxChargeCurrent`                                                                              | kombinierte wirksame Hardware-Grenze; Minimum: `info.hardwareMinChargeCurrent`                            |
| `access_state` (schreibbar)                                      | `Wallbox_X.info.accessControlState` (nur lesbar)                                                                       |                                                                                                          |
| `unlocked_by`                                                    | `Wallbox_X.info.unlockedByRFIDNo`, `Wallbox_X.info.unlockedByRFIDName`                                                 |                                                                                                          |
| `rfid.badges.N.id` /`.name` /`.consumption`                      | `Wallbox_X.statistics.RFIDN.cardId` /`.cardName` /`.chargedEnergy`                                                     | N = 1 … 10, Kanäle nur für angelernte Karten                                                             |
| –                                                                | `Wallbox_X.info.chargeState`, `Wallbox_X.info.ipAddress`, `Wallbox_X.Power.GridFrequency`                              | neu in go-e-charger                                                                                      |
| –                                                                | `Settings.Setpoint_HomeBatSoC`                                                                                         | Mindest-SoC des Hausakkus für Überschussladen                                                            |

Hier nicht aufgeführte Datenpunkte des go-e-Adapters (Temperaturen, Fehlercode, Leistung pro Phase, Leistungsfaktor, WLAN, MQTT, Lastmanagement, Zeitplan, LED- und Taster-Einstellungen, …) haben noch keine Sprech Entung – siehe unten.

## Zuordnung der Einstellungen

| go-e-Einstellung                                                  | go-e-charger-Einstellung                                                                                                      | Hinweise                                                                                                                                                                        |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Servername / IP (`serverName`)                                   | Wallbox-Liste → IP-Adresse (`ipAddress`), optionaler Ladegerät-Name                                                          | ein Eintrag pro Charger                                                                                                                                                         |
| Aktualisierungsintervall \[s] (`serverInterval`)                 | Abfragezyklus \[ms] (`cycleTime`)                                                                                            | Standard 10 s, Minimum 3 s                                                                                                                                                      |
| `ampUpdateInterval`                                               | –                                                                                                                             | Der Strom ändert sich um höchstes 1 A pro Zyklus                                                                                                                                |
| API-Version (`apiVersion`), `selectedAttributes`                  | –                                                                                                                             | v1 wird immer genutzt, v2 für zusätzliche Funktionen ab Gen 3; feste Auswahl an Werten                                                                                          |
| Max. Ampere (`maxAmp`)                                           | Maximaler Ladestrom (`maxChargeCurrent`), Pro Wallbox `maxAmp` /`minAmp`                                                      | dazu optionales Gesamtbudget `maxAmpTotal`                                                                                                                                       |
| Solar-Objekt (`solarPowerForeignObjectID`) + Negieren / nur Ack  | Objekt für PV-Leistung (`stateHomeSolarPower`)                                                                               | **muss die positive PV-Erzeugung sein** ; ein vorzeichenbehafteter Netzwert wird noch nicht unterstützt ( [#919](https://github.com/hombach/ioBroker.go-e-charger/issues/919) ) |
| Hausverbrauch-Objekt (`houseConsumptionForeignObjectID`)         | Objekt für Hausverbrauch (`stateHomePowerConsumption`) + „Verbrauch des Chargers ist enthalten“ (`subtractSelfConsumption`) | positives W                                                                                                                                                                     |
| Hausakku-Objekt (`houseBatteryForeignObjectID` Akkuleistung in W) | Objekt für Hausakku-SoC (`stateHomeBatSoc`, %) + Hausakku-Modus (`batteryMode`)                                             | Anderes Konzept: SoC statt Akkuleistung                                                                                                                                         |
| Puffer zur Solarleistung (`bufferToSolar`)                       | Netzreserve (`chargeManagerReservePower`)                                                                                    |                                                                                                                                                                                 |
| Mindestens mit 6 A geladen (`loadWith6AAtLeast`)                 | –                                                                                                                             | [#920](https://github.com/hombach/ioBroker.go-e-charger/issues/920)                                                                                                             |
| Fahrzeug-SoC-Objekt (`carBatterySoCForeignObjectID`)             | –                                                                                                                             |                                                                                                                                                                                 |
| `phaseSwitchWatts`, `timeToWait`, `defaultPSM`                    | Wallbox-Option „automatische 1-/3-Phasenumschaltung“, `Settings.PhaseMode`                                                     | Schwellen und Verzögerung sind fest ( [#925](https://github.com/hombach/ioBroker.go-e-charger/issues/925) )                                                                     |
| Berechnungsmethode „go-e Hardware“ (`calcMethod`)                | –                                                                                                                             | go-e-charger rechnet immer in ioBroker                                                                                                                                          |
| `writeTemperatureArray`                                           | –                                                                                                                             | [#922](https://github.com/hombach/ioBroker.go-e-charger/issues/922)                                                                                                             |

## Häufig gestellte Fragen

**Welche HTTP-API muss ich in der go-e-App aktivieren?** Für Hardware-Generation 3 und 4 „HTTP API v1“ aktivieren (erforderlich). Für Phasenumschaltung, Netzfrequenz und den Hardware-Mindeststrom zusätzlich „HTTP API v2“. Ältere Charger (Gen 2) stellen API v1 ohne diese Einstellung bereit.

**Welchen Modus soll ich in der go-e-App wählen (Eco oder Basic)?** go-e-charger steuert den Charger selbst (Ladefreigabe und flüchtiger Ladestrom). Funktionen im Charger, die ebenfalls Laden starten, stoppen oder begrenzen – PV-Überschuss (Eco-Modus mit der PV-Logik des Chargers), strompreisabhängiges Laden oder Lade-Timer – können dem ChargeManager entgegenwirken. Bei Nutzung des ChargeManagers lassen sich diese Charger-Funktionen ausschalten und den Basis-/Standard-Lademodus verwenden; Über das Laden entscheiden dann ChargeNOW und ChargeManager.

**Welches Vorzeichen braucht PV- und Verbrauchswert?** Beide sind positive Werte in W: PV-Erzeugung ≥ 0, Hausverbrauch ≥ 0. Werte in kW müssen in W umgerechnet werden. Ein einzelner Netzbezugs-/Einspeisewert kann noch nicht direkt verwendet werden ( [#919](https://github.com/hombach/ioBroker.go-e-charger/issues/919) ); Bis dahin einen Alias oder einen per Skript berechneten Datenpunkt mit den benötigten Werten anlegen. Wenn in der go-e-Konfiguration „Negieren“ aktiv war, hat das Quellobjekt für go-e-charger sehr wahrscheinlich das falsche Vorzeichen.

**Kann ich beide Adapter parallel betreiben?** Ja, zum Lesen. Während du Werte vergleichst, für den Charger in go-e-charger den **Nur-Lese-Modus** aktivieren: Dann werden Daten gelesen, aber keine Steuerbefehle gesendet. Beide Adapter dürfen nicht gleichzeitig denselben Charger steuern (PV-Steuerung des go-e-Adapters / Schreiben von `allow_charging` Oder `amperePV` und ChargeManager / ChargeNOW von go-e-charger) – sie würden sich gegenseitig überschreiben. Wenn alles passt, die go-e-Instanz (oder deren PV-Steuerung) stoppen, den Nur-Lese-Modus abschalten und `Settings.ChargeManager` Aktivieren.

**Verliere ich meine Geschichte?** History-Daten werden pro Objekt-ID gespeichert. History für die neuen Datenpunkte aktivieren; Diese Daten bleiben unter den `go-e.0` -IDs gespeichert.

**Was ist mit dem Flash/EEPROM des Ladegeräts?** go-e-charger schreibt den Ladestrom über den flüchtigen Wert `amx` (nur Firmware 033 nutzt `amp`) und verwirft Befehle, deren Wert der Charger bereits gemeldet wird.

## (Noch) nicht unterstützt

Folgende Funktionen des go-e-Adapters gibt es in go-e-charger nicht. Ideen werden als Issues gesammelt – Feedback und Pull Requests sind willkommen:

- Netzzähler-Eingang mit vorzeichenbehaftetem Bezugs-/Einspeisewert, Optionen Negieren und nur Ack – [#919](https://github.com/hombach/ioBroker.go-e-charger/issues/919)
- Min+PV-Modus (immer mindestens 6 A, plus Überschuss) – [#920](https://github.com/hombach/ioBroker.go-e-charger/issues/920)
- Energie der aktuellen Ladung und Energielimit in kWh – [#921](https://github.com/hombach/ioBroker.go-e-charger/issues/921)
- Zusätzliche Datenpunkte (Temperaturen, Fehlercode, Strom/Leistung pro Phase, Leistungsfaktor, WLAN, Seriennummer, `modelStatus`, …) – [Nr. 922](https://github.com/hombach/ioBroker.go-e-charger/issues/922)
- Timer: X Minuten laden / zu einer Uhrzeit stoppen – [#923](https://github.com/hombach/ioBroker.go-e-charger/issues/923)
- Skript-Schnittstelle in Watt (`energy.max_watts`, `adjustAmpLevelInWatts`) – [Nr. 924](https://github.com/hombach/ioBroker.go-e-charger/issues/924)
- einstellbare Schwellen, Puffer und Verzögerung der Phasenumschaltung – [#925](https://github.com/hombach/ioBroker.go-e-charger/issues/925)
- Geräte-Einstellungen schreiben (Kabelverriegelung, Zugangskontrolle, LED, Taster-Stromstufen) – [#926](https://github.com/hombach/ioBroker.go-e-charger/issues/926)
- Stopp bei Fahrzeug-SoC, PV-Berechnung im Ladegerät (`ids`), MQTT-/Cloud-/Lastmanagement-Informationen und Strombörsen-Werte (aWATTar)