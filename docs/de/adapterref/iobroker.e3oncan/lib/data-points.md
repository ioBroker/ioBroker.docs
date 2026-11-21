---
chapters: {"pages":{"en/adapterref/iobroker.e3oncan/README.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.md"},"en/adapterref/iobroker.e3oncan/lib/data-points.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/lib/data-points.md"},"en/adapterref/iobroker.e3oncan/README.de.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.de.md"},"en/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md":{"title":{"en":"Raw-Gateway-API (open3e-esp32 ↔ ioBroker.e3oncan)"},"content":"en/adapterref/iobroker.e3oncan/docs/raw-gateway-api.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3oncan/lib/data-points.md
title: ioBroker.e3oncan
hash: rDmpY6+7yF+1U7Jdb/C6kWGszy7VCs9WOq7TD/cigXw=
---
![Logo](../../../../en/adapterref/iobroker.e3oncan/lib/admin/e3oncan_small.png)

# IoBroker.e3oncan
## Umgang mit Datenpunkten
### Inhaltsverzeichnis
- [Was ist ein Datenpunkt?](#what-is-a-data-point)
- [Generische und varianten Datenpunkte](#generic-and-variant-data-points)
- [Metadaten](#metadata)
- [Datenformate für Temperatur, Datum und Uhrzeit](#data-formats-for-temperature-date-and-time)
- [Schreibbarkeit von Datenpunkten](#writability-of-data-points)
- [Was passiert beim Start des Adapters und nach Aktualisierungen?](#what-happens-on-adapter-start-and-after-updates)
- [Durchführen eines Datenpunktscans](#running-a-data-point-scan)
- [Benutzerdefinierte Datenpunktstrukturen in udsDidsSpecific](#user-defined-data-point-structures-in-udsdidsspecific)
- [Änderungsprotokoll der Datenpunktdefinitionen](#changelog-of-data-point-definitions)

---

### Was ist ein Datenpunkt?
Bei Geräten der E3-Serie sind alle Informationen in Datenpunkten organisiert. Jeder Datenpunkt enthält:

- eine numerische Kennung (z. B. `256`)
- ein Name (z. B. `BusIdentification`)
- eine Länge in Bytes
- eine interne Struktur, die von einem Codec beschrieben wird

Beim Lesen und Schreiben werden stets Rohbytes über den CAN-Bus übertragen. Der Codec übersetzt diese Bytes in lesbare Werte. Ist die Struktur eines Datenpunkts noch nicht bekannt, wird das `RawCodec` verwendet, das den unveränderten Bytestrom durchläuft.

Die Datenbank bekannter Datenpunkte wird im Projekt [open3e](https://github.com/open3e)-Projekt. Dieser Adapter und der [E3onCAN](https://github.com/MyHomeMyData/E3onCAN) gepflegt und basiert auf derselben Datenbank wie open3e. Aktualisierungen werden regelmäßig eingearbeitet. Benutzer sind herzlich eingeladen, über das open3e-Diskussionsforum, Issues oder Pull Requests beizutragen.

---

### Generische und varianten Datenpunkte
Manche Datenpunkte weisen auf verschiedenen Geräten unterschiedliche Längen und Strukturen auf. Um dies zu berücksichtigen, werden die Datenpunkte in zwei Kategorien unterteilt:

- **Generische Datenpunkte** - eine einheitliche Definition, die für die meisten Geräte geeignet ist.
- **Variantendatenpunkte** - alternative Definitionen für Geräte, auf die die generische Definition nicht zutrifft.

Der Adapter wählt während des Datenpunkt-Scans automatisch die richtige Variante für jedes Gerät aus.

Eine Übersicht aller bekannten Datenpunkte einschließlich ihrer Varianten ist in [open3e-Projekt](https://github.com/open3e/open3e/blob/develop/src/open3e/Open3Edatapoints.md) verfügbar.

---

### Metadaten
Ab open3e Version 0.6.1 und Adapter Version 0.11.0 enthalten viele Datenpunkte zusätzliche Metadaten:

| Metadatenfeld | Beschreibung |
|---|---|
| Beschreibung | Kurze, für Menschen verständliche Erklärung des Datenpunkts |
| Physikalische Einheit | z. B. °C, kWh, W (falls zutreffend) |
| Hinweise / Link | Weiterführende Informationen oder Referenzen |
| Zugriff | Ob der Datenpunkt schreibgeschützt oder les- und schreibbar ist |

Metadaten werden Datenpunktobjekten während des Datenpunktscans hinzugefügt. Bei Datenpunkten, die beim Start des Adapters neu erstellt werden (z. B. nach einer Strukturänderung in einer Definition), werden Metadaten automatisch angewendet. Bei allen anderen vorhandenen Datenpunkten werden Metadaten nur durch einen erneuten Datenpunktscan aktualisiert.

---

### Datenformate für Temperatur, Datum und Uhrzeit
Der Datenpunkt `382` enthält die Datenformatkonfiguration des Geräts, einschließlich:

- **Physikalisches Format:** Metrisch (°C) oder Imperial (°F)
- **Datumsformat:** TagMonatJahr, MonatTagJahr, JahrMonatTag
- **Zeitformat:** 24 Stunden oder 12 Stunden

Die Standardkonfiguration lautet: `Metric / DayMonthYear / TwentyFourHours`.

Ab Adapterversion 0.11.0 werden diese Informationen während des Gerätescans ausgelesen und pro Gerät gespeichert. Die gespeicherte Konfiguration wird dann wie folgt angewendet:

- **Während eines Datenpunktscans:** Die Temperatureinheitenbezeichnungen werden auf °C (metrisch) oder °F (imperial) eingestellt. Es findet keine Umrechnung der numerischen Werte statt.
**Beim Lesen und Schreiben gilt:** Datums- und Zeitwerte werden gemäß dem gespeicherten Format interpretiert. Beispielsweise wird im Format MonatTagJahr ein Datum als Monat-Tag-Jahr erwartet und gespeichert, nicht als Tag-Monat-Jahr.

**Hinweis:** Die Verarbeitung von Datums-/Zeitformaten, die nicht den Standardeinstellungen entsprechen, ist experimentell. Bitte überprüfen Sie die Ergebnisse sorgfältig, falls Ihr Gerät nicht mit den Standardeinstellungen konfiguriert ist.

Ist der Datenpunkt `382` für ein Gerät nicht vorhanden, wird die Konfiguration des Mastergeräts (CAN-Adresse `0x680`) als Ausweichkonfiguration verwendet. Steht überhaupt keine Konfiguration zur Verfügung, verhält sich der Adapter wie in Versionen vor 0.11.0.

---

### Schreibbarkeit von Datenpunkten
Ein Datenpunkt wird als beschreibbar behandelt, wenn eine der folgenden Bedingungen zutrifft:

- Seine ID ist in der Whitelist `e3oncan.0.<DEVICE>.info.udsDidsWritable` enthalten.
- Es ist in seinen Metadaten als les- und schreibbar gekennzeichnet (verfügbar ab Adapterversion 0.11.0).

Beide Bedingungen werden geprüft; die Whitelist funktioniert weiterhin wie bisher.

---

### Was passiert beim Start des Adapters und nach Updates?
Bei jedem Start des Adapters werden die Versionen der vorhandenen Datenpunktdefinitionen mit den im aktuellen Adapter enthaltenen Versionen verglichen. Sind neuere Definitionen verfügbar (z. B. nach einem Adapter-Update), werden die betroffenen Datenpunkte automatisch aktualisiert. Dieser Vorgang wird detailliert protokolliert.

**Was Sie bei einem Update erwartet:**

Ändert sich die Struktur eines Datenpunkts, wird das gesamte Unterobjekt `tree` für diesen Datenpunkt gelöscht und mit der neuen Struktur neu erstellt. Dies ist für die korrekte Funktion des Adapters erforderlich, hat aber Nebenwirkungen:
- **Archivierte Daten** für Elemente des betroffenen `tree`-Unterobjekts können verloren gehen.
- **Verweise** auf diese Elemente in Skripten, Visualisierungen oder anderen Adaptern müssen möglicherweise aktualisiert werden.
- Falls ein gerätespezifischer Datenpunkt vom Benutzer geändert wurde, wird vor der Anwendung des Updates eine Sicherungskopie der ursprünglichen Struktur erstellt.

> **Empfehlung für alle, die am ioBroker-Beta-Repository arbeiten:** Sichern Sie vor dem ersten Start des Adapters nach einem Update alle Objekte der Adapterinstanz (z. B. `e3oncan.0`) oder zumindest die Objekte der einzelnen Geräte.

---

### Ausführen eines Datenpunktscans
Ein Datenpunktscan ermittelt alle verfügbaren Datenpunkte auf jedem Gerät und erstellt oder aktualisiert die entsprechenden Objekte in ioBroker.

**Was ein Scan bewirkt:**

- Erkennt alle verfügbaren Datenpunkte auf jedem konfigurierten Gerät.
- Fügt Metadaten (Beschreibung, Einheit, Zugriffsinformationen) für jeden vorhandenen Datenpunkt hinzu oder aktualisiert diese - Einzelheiten finden Sie in der Speicheroption weiter unten.
- Legt die Temperatureinheitenbezeichnungen basierend auf der Geräteformatkonfiguration fest (Datenpunkt `382`).
- Schreibt optional die während des Scans gelesenen Werte in den Objektbaum (siehe unten).

**Option: Alle Datenpunktwerte während des Scans speichern**

Der Scan-Dialog bietet ein Kontrollkästchen **Alle Datenpunktwerte während des Scans im Objektbaum speichern**:

- **Aktiviert (Standard):** Alle während des Scans gelesenen Werte werden in den Objektbaum geschrieben. Fehlende Datenpunktobjekte werden erstellt.
- **Nicht aktiviert:** Werte und Metadaten werden für *vorhandene* Datenpunktobjekte geschrieben. Datenpunktobjekte, die noch nicht existieren, werden *nicht* erstellt. Verwenden Sie diese Option, um Metadaten zu aktualisieren, ohne die Objektstruktur zu erweitern - beispielsweise nach einer Migration von einer älteren Adapterversion.

**Wann sollte ein Scan durchgeführt werden?**

- Während der Ersteinrichtung (dringend empfohlen, für das Schreiben erforderlich).
- Nach einem Adapter-Update, das neue Datenpunktdefinitionen einführt.
- Nach einem Software-Update von Viessmann-Geräten.

> **Empfehlung:** Führen Sie zuerst einen Gerätescan durch (gehen Sie zur Registerkarte **Liste der UDS-Geräte**, klicken Sie auf **Scan starten…**).

**So starten Sie einen Scan:**

Öffnen Sie den Konfigurationsdialog des Adapters, wechseln Sie zum Tab **Liste der Datenpunkte**, klicken Sie auf **Scan starten…** und bestätigen Sie mit **OK**. Der Scan kann bis zu 5 Minuten dauern. Der Fortschritt wird im Adapterprotokoll angezeigt (öffnen Sie dazu einen zweiten Browsertab).

---

### Benutzerdefinierte Datenpunktstrukturen in udsDidsSpecific
Der Zustand `e3oncan.0.<DEVICE>.info.udsDidsSpecific` speichert die gerätespezifischen Datenpunktdefinitionen, die sich von den generischen Definitionen in `didsE3.json` unterscheiden. Dies umfasst:

- **Variantendatenpunkte** - Definitionen, die während eines Datenpunktscans automatisch ausgewählt wurden, weil das Gerät eine Länge zurückgegeben hat, die mit einem Eintrag in `didsE3var.json` übereinstimmt.
- **Benutzerdefinierte Strukturen** - Definitionen, die vom Benutzer manuell erstellt oder geändert werden.

Jeder Eintrag in `udsDidsSpecific` ist ein JSON-Objekt, dessen Schlüssel die numerische Datenpunkt-ID ist. Der Adapter verfolgt den Ursprung jedes Eintrags über das Feld `source`:

| `source` Wert | Bedeutung |
|---|---|
| `"didsE3var_YYYYMMDD"` | Automatisch vom Adapter festgelegt; Version von `didsE3var.json` zum Zeitpunkt der letzten Aktualisierung |
| `"didsE3var_YYYYMMDD"` | Wird automatisch vom Adapter gesetzt; Version von `didsE3var.json` zum Zeitpunkt der letzten Aktualisierung |

**Verhalten beim Start des Adapters und beim Scannen der Datenpunkte:**

- Einträge mit `source: "didsE3var_..."` werden auf die neueste Version aus `didsE3var.json` aktualisiert, falls sich die Struktur geändert hat.
- Einträge ohne ein `source`-Feld, die `RawCodec` verwenden (automatisch durch alte Scans platziert), werden ebenfalls aktualisiert.
- Eine Sicherungskopie der überschriebenen Einträge wird im Unterabschnitt `Backup` von `udsDidsSpecific` gespeichert.

**Schutz einer benutzerdefinierten Struktur vor Überschreiben (Adapter ≥ 1.0.3):**

Wenn Sie die Struktur eines Variantendatenpunkts manuell definiert oder überprüft haben und verhindern möchten, dass der Adapter diese überschreibt, fügen Sie dem Eintrag in `udsDidsSpecific` ein Feld `"protected": true` hinzu. Optional können Sie ein Feld `"reason"` mit einer Freitextbeschreibung hinzufügen; dieser Text wird in das Adapterprotokoll aufgenommen, sobald der Schutz angewendet wird.

Beispieleintrag für DID 2086:

```json
"2086": {
  "codec": "O3EComplexType",
  "len": 68,
  "id": "ZigBeeOneDeviceCurrentValues",
  "protected": true,
  "reason": "Custom ZigBee TRV structure verified for my device",
  "args": { ... },
  "source": "didsE3var_20260527"
}
```

Der Adapter protokolliert `Variant datapoint ... is protected by user. Update skipped. Reason: "..."` und lässt die Definition sowohl beim Start des Adapters als auch während eines Datenpunktscans unverändert.

**Hinweis:** Der Schutz gilt nur für **Variantendatenpunkte** (die in `didsE3var.json` vorhanden sind). Definitionen für gemeinsame Datenpunkte (aus `didsE3.json`) sind in `udsDidsCommon` gespeichert und werden von diesem Mechanismus nicht beeinflusst.

---

## Änderungsprotokoll der Datenpunktdefinitionen
### V1.3.0 (17.11.2026)
* **Neue Geräte** wurden zu den Enum-Werten hinzugefügt.
* **ZigBee-Geräte**: Die Dekodierung von `Hardware-Version` (zuvor roh, in **40 `ZigBee*DeviceProperty`-DIDs**) und Geräte-`ConnectionState` (zuvor roh, in **80 `ZigBee*DeviceCurrentValues`-Definitionen**, sowohl 57- als auch 68-Byte-Varianten) erfolgt mit dem neuen Enum `ZigBeeConnectionStates`, siehe PR #402
* ** `OpStates` **: Korrektur gemäß Problem Nr. 145 - die vorherige Dekodierung (aus einer älteren viGuide-App-Version) erwies sich im Feldversuch als falsch; die neuen Werte wurden anhand zweier unabhängiger Berichte (Philip-Wieges systematische Tests an einem Vitocal 250-A, Wangnicks Beobachtung des Wertes 255 bei ungenutzten Heizkreisen) und der Daten der aktuellen viGuide-App überprüft.
* ** `Fehler` **: Die Liste wurde basierend auf dem Fehlerkatalog der aktuellen viGuide-App von 1098 auf 1351 Einträge erweitert. Zwei Einträge, die sich fälschlicherweise an Position 1095/1096 befanden („WallboxGeneralError“/`EebusConfigurationIncorrect“), wurden korrigiert und befinden sich nun an ihren korrekten Positionen 65533/65534 zusammen mit den beiden Sonderwerten („ViewedErrorList“/` ErrorHasBeenConfirmed“), die zuvor dort angezeigt wurden.
* Fehlende Enumerationswerte wurden durch Vergleich mit der aktuellen viGuide-App hinzugefügt: ** `GasTypes` ** (+1: `BioGas`), ** `BusTypes` ** (+2: `PWM`, `IP`), ** `RemoteControls` ** (+5), ** `DigitalInputConfigurations` ** (+6), ** `PowerStates` ** (+1)
* **DID 1718 `ElectricalEnergySystemConfiguration` **: Die zuvor als Rohbytes dekodierten Werte wurden als `InverterType` und `SystemType` dekodiert. Basierend auf der Strukturzuordnung der aktuellen viGuide-App wurden die neuen Enumerationen `ElectricalEnergySystemInverterTypes` und `EnergyManagementControlUnitTypes` erstellt.
* Neue **DID 3369 `ElectricalActivePowerConsumptionLimitationSettings` ** (§14a EnWG Lastbegrenzungsmodus-Selektor, neue Aufzählung `FourteenAConfigurationModes`) und **DID 3370 `ElectricalActivePowerConsumptionLimitationSettingsConfiguration` ** (rohe 4-Byte-Support-Flags-Bitmaske für die fünf Modi von DID 3369) hinzugefügt, die in der aktuellen viGuide-App zu finden sind.
* **Vitoair FS 300 (VCU)**: 6-Byte-Varianten für **DIDs 1006/1007 `TargetQuickMode`/`CurrentQuickMode` ** und **DID 2605 `QuickModeRuntime` ** hinzugefügt, siehe PR #398
* **Vitoair FS 300 (VCU)**: Die zuvor unformatierten **DIDs 2489 `FrostProtectionStatus`, 2493 `VentilationBypassPosition`, 2608 `FilterSettings`, 2759 `EnergyRecoveredCrossHeatExchanger`, 2946 `EnergyConsumptionElectricalPreHeater` ** wurden dekodiert und die neuen **DIDs 2846 `VentilationBypassDynamicVentilationLevel`, 3206 `FilterPercentageBlocked` ** hinzugefügt (siehe PR #399).

### V1.2.0 (15.10.2026)
**Gemeinsame Datenpunkte (didsE3.json, v20261014)**

* Dekodierung für **DID 1593 `BufferHysteresis` ** hinzufügen
* **Einheiten in Unterfeldern:** Die Unterfelder von 250 zusammengesetzten Datenpunkten enthalten nun ihre Einheiten, z. B. zeigen die Temperatursensoren „°C“ an, wo die Einheit zuvor leer war. 13 weitere Datenpunkte haben eine Einheit erhalten, z. B. „MainPowerSupplyValue“ („V“).
* **Strukturierte Dekodierung:** 171 Datenpunkte, die zuvor als Rohbytes dekodiert wurden, besitzen nun eine Struktur: 147 als Listen (`O3EList`), 23 als zusammengesetzte Strukturen (`O3EComplexType`), z. B. `DaylightSavingTimeActive` (912), und 1 als Byte-Wert (`O3EByteVal`). Ihr Objektbaum ändert sich und wird beim nächsten Start des Adapters neu aufgebaut.
* **Schreibbarkeit:** 18 Datenpunkte wurden von schreibgeschützt auf beschreibbar umgestellt, darunter `DaylightSavingTimeActive` (912), `DomesticHotWaterHysteresis` (1085), `CentralHeatingPumpPerformance` (1432), `IntervalStrategyProperties` (1606), `WaterPressureConfiguration` (1721) sowie die Einstellungen für Raumklima und Frostschutz der vier Mischkreisläufe (2426-2429, 2855-2858). Ein Datenpunkt, `TargetDemandHeatProducer` (2353), wurde von beschreibbar auf schreibgeschützt umgestellt. Die neuen Flags werden mit dem nächsten Datenpunkt-Scan wirksam.
* **Korrekturen:** Die Skala von `OutsideTemperatureDampingFactor` (919) wurde von 10 auf 1 korrigiert, und `GatewayRemoteSignalStrength` (900) wurde um eine Beschreibung ergänzt.

**Variantendatenpunkte (didsE3var.json, v20260727)**

* Zwei Varianten hinzugefügt: `DomesticHotWaterSetpointMetaData` (504, Länge 10) und `LegionellaProtectionTargetTemperatureSetpoint` (874, Länge 2).

**Enumerationen (enums.js, v20260727)**

* Neue Aufzählung `RoomSetpoints` (2 Reduziert, 3 Normal, 4 Komfort).

### V1.1.1 (2026-07-06)
**Gemeinsame Datenpunkte (didsE3.json, v20260705)**

* **ZigBee-Stromwerte DIDs 2086-2143 und 2262** (57 Byte): Umstrukturiert um einen neuen `ViCareDevice` O3ESwitch-Diskriminator, der die dekodierten Felder nach Gerätetyp auswählt. Details siehe unten (v1.1.0).

### V1.1.0 (05.07.2026)
**Variantendatenpunkte (didsE3var.json, v20260630)**

* **ZigBee-Stromwerte-DIDs 2086-2143 und 2262** (68-Byte-Variante): Umstrukturiert um einen neuen `ViCareDevice` O3ESwitch-Diskriminator, der die dekodierten Felder nach Gerätetyp auswählt:
- Typ 0 - leerer Slot (roh)
- Typ 1 - Klimasensor: `Aktuelle Temperatur` (°C), `Luftfeuchtigkeit` (%)
- Typ 2 - TRV: `Isttemperatur` (°C), `Ventilöffnung` (%), `Gerätedisplay eingeschaltet`, `Geräte-Kindersicherung aktiv`, `Geräte-Sollwerttemperatur` (°C)
  - Typ 3 - Bodenthermostat / Verteiler: „FlowTemperature“ (°C, int16 LE), „OperatingMode“.
- Typ 4/5 - Stellantrieb NC/NO: `Anforderung` (%), `Ventilzustand`
- `SignalLevel` (%) und `BatteryRssi` (dBm, vorzeichenbehaftet) wurden allen Typen hinzugefügt
* **Raum-Eigenschafts-DIDs 1884-1943** (85-Byte-Variante): Verknüpfte ZigBee-Geräteindexfelder hinzugefügt; Beschreibung von `ChildLockActive` aktualisiert; Enumeration von `WindowDetection` korrigiert.
* **DID 1603** (PointOfCommonCouplingPower): kleinere Aktualisierung der Beschreibung.

**Gemeinsame Datenpunkte (didsE3.json, v20260701)**

* **3 neue DIDs** mit `O3EFloat32`:
- 2990 `ElektrischesEnergiesystemBatteriekapazitätDelta`
- 2991 `Batteriekapazität des elektrischen Energiesystems`
- 2992 `ElectricalEnergySystemStateOfChargeUseable`
* **Einheitenkorrekturen**: DID 279 und 281 Feld `Actual`: Einheit auf °C korrigiert (war leer); DID 321 Feld `Average`: Einheit auf °C korrigiert (war hPa); DID 322 Feld `Average`: Einheit auf hPa korrigiert (war °C).
* Das Feld `decimals` wurde allen numerischen Unterfeldern hinzugefügt, um die Konsistenz mit der aktualisierten Codec-Definition zu gewährleisten (Wert `0` - keine Änderung der dekodierten Werte).

### V1.0.3 (31.05.2026)
* **ZigBee-DIDs 2084-2319 strukturiert**: ZigBeeDeviceProperty (inkl. Artikelnummer), ZigBeeDeviceCurrentValues in 57-Byte- (Gasheizung) und 68-Byte-Varianten (Wärmepumpe) mit den Feldern WorkingMode, Setpoint, Display und ChildLock
* **Raum-DIDs 1884-1943 strukturiert**: Raumeigenschaften (Name, Typ, Temperaturregelung, Fenstererkennung) und aktuelle Raumwerte (Temperatur, Luftfeuchtigkeit min./max.) in 84/85-Byte-Varianten
* **Neue, von ViGuide abgeleitete DID-Strukturen**: Brennstoffzellenmetriken (1349-1362), Energieabdeckungsmatrizen (1354-1373), Bedarfsdeckung (1383), Batterie-/Wechselrichter-Abonnement-DIDs (257-266, 2214 ff.)
* **Aktualisierte Aufzählungsnummern**: `ViCareDeviceTypes` (TRV, Sensor, Repeater, UFH-Aktor), `CurrentWorkingModeLevels` (Kühlung=100)
* Codec-Konvention: `Unbekannte*`-Felder verwenden nun einheitlich `RawCodec`

### V0.11.0 (14.04.2026)
Aktualisierte Struktur der folgenden Datenpunkte: 268, 269, 271, 274, 279, 282, 284, 285, 286, 287, 288, 289, 290, 291, 318, 320, 321, 324, 531, 1659, 1684, 1768, 1769, 1770, 1771, 1772, 2084, 2085, 2087, 2088, 2090, 2091, 2093, 2094, 2096, 2097, 2099, 2100, 2102, 2103, 2105, 2106, 2108, 2109, 2111, 2112, 2114, 2115, 2117, 2118, 2120, 2121, 2123, 2124, 2126, 2127, 2129, 2130, 2132, 2133, 2135, 2136, 2138, 2139, 2141, 2142, 2240, 2260, 2261, 2263, 2264, 2266, 2267, 2269, 2270, 2272, 2273, 2275, 2276, 2278, 2279, 2281, 2282, 2284, 2285, 2287, 2288, 2290, 2291, 2293, 2294, 2296, 2297, 2299, 2300, 2302, 2303, 2305, 2306, 2308, 2309, 2311, 2312, 2314, 2315, 2317, 2318, 2320, 2333, 2334, 2351, 2352, 2593, 2735, 2806, 3014, 3015, 3016, 3017, 3018, 3032, 3034, 3035, 3036

**Anmerkungen:**

Bei allen Sensordatenpunkten wurde der letzte Eintrag „Unbekannt“ in „Sensorstatus“ umbenannt. Dies erklärt die große Anzahl geänderter Datenpunkte.
- Für die häufig verwendeten Datenpunkte 531, 2351, 2532 und 2735 wurde der numerische Wert in eine Unterzustands-`ID` verschoben:
- `0531_DomesticHotWaterOperationState.ID`
- `2351_HeatPumpCompressor.PowerState.ID`
- `2352_AdditionalElectricHeater.PowerState.ID`
- `2735_FourThreeWayValveValveCurrentPosition.ID`