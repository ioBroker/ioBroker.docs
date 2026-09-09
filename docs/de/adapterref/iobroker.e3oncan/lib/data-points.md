---
chapters: {"pages":{"en/adapterref/iobroker.e3oncan/README.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.md"},"en/adapterref/iobroker.e3oncan/lib/data-points.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/lib/data-points.md"},"en/adapterref/iobroker.e3oncan/README.de.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.de.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3oncan/lib/data-points.md
title: ioBroker.e3oncan
hash: ml6SY369uv9vbG44CqTcTM+0WEwBSKfBIYkq6Ckwets=
---
![Logo](../../../../en/adapterref/iobroker.e3oncan/lib/admin/e3oncan_small.png)

# ioBroker.e3oncan

## Umgang mit Datenpunkten

### Inhaltsverzeichnis

- [Was ist ein Datenpunkt?](#what-is-a-data-point)
- [Generische und varianten Datenpunkte](#generic-and-variant-data-points)
- [Metadaten](#metadata)
- [Datenformate für Temperatur, Datum und Uhrzeit](#data-formats-for-temperature-date-and-time)
- [Schreibbarkeit von Datenpunkten](#writability-of-data-points)
- [Was geschieht beim Start des Adapters und nach Updates?](#what-happens-on-adapter-start-and-after-updates)
- [Durchführung eines Datenpunktscans](#running-a-data-point-scan)
- [Benutzerdefinierte Datenpunktstrukturen in udsDidsSpecific](#user-defined-data-point-structures-in-udsdidsspecific)
- [Änderungsprotokoll der Datenpunktdefinitionen](#changelog-of-data-point-definitions)

---

### Was ist ein Datenpunkt?

Bei Geräten der E3-Serie sind alle Informationen in Datenpunkten organisiert. Jeder Datenpunkt enthält:

- eine numerische Kennung (z. B.`256` )
- ein Name (z. B.`BusIdentification` )
- eine Länge in Bytes
- eine interne Struktur, die von einem Codec beschrieben wird

Beim Lesen und Schreiben werden stets Rohdaten (Bytes) über den CAN-Bus übertragen. Der Codec übersetzt diese Daten in für Menschen lesbare Werte. Wenn die Struktur eines Datenpunkts noch nicht bekannt ist,`RawCodec` wird verwendet, das den unveränderten Bytestrom durchleitet.

Die Datenbank bekannter Datenpunkte wird im Projekt [open3e](https://github.com/open3e) gepflegt. Dieser Adapter und das Projekt [E3onCAN](https://github.com/MyHomeMyData/E3onCAN) nutzen dieselbe, von open3e abgeleitete Datenbank. Aktualisierungen werden regelmäßig eingearbeitet. Beiträge sind über das open3e-Diskussionsforum, Issues oder Pull Requests willkommen.

---

### Generische und varianten Datenpunkte

Manche Datenpunkte weisen auf verschiedenen Geräten unterschiedliche Längen und Strukturen auf. Um dies zu berücksichtigen, werden die Datenpunkte in zwei Kategorien unterteilt:

- **Generische Datenpunkte** – eine einheitliche Definition, die für die meisten Geräte passt.
- **Variantendatenpunkte** – alternative Definitionen für Geräte, auf die die generische Definition nicht zutrifft.

Der Adapter wählt während des Datenpunkt-Scans automatisch die richtige Variante für jedes Gerät aus.

Eine Übersicht aller bekannten Datenpunkte einschließlich ihrer Varianten ist im [Projekt open3e](https://github.com/open3e/open3e/blob/develop/src/open3e/Open3Edatapoints.md) verfügbar.

---

### Metadaten

Ab open3e Version 0.6.1 und Adapter Version 0.11.0 enthalten viele Datenpunkte zusätzliche Metadaten:

| Metadatenfeld         | Beschreibung                                                    |
| --------------------- | --------------------------------------------------------------- |
| Beschreibung          | Kurze, für Menschen verständliche Erklärung des Datenpunkts     |
| Physikalische Einheit | z. B. °C, kWh, W (sofern zutreffend)                            |
| Notizen / Link        | Weitere Informationen oder Referenzen                           |
| Zugang                | Ob der Datenpunkt schreibgeschützt oder les- und schreibbar ist |

Metadaten werden Datenpunktobjekten während des Datenpunktscans hinzugefügt. Bei Datenpunkten, die beim Start des Adapters neu erstellt werden (z. B. nach einer Strukturänderung in einer Definition), werden Metadaten automatisch angewendet. Bei allen anderen vorhandenen Datenpunkten werden Metadaten nur durch einen erneuten Datenpunktscan aktualisiert.

---

### Datenformate für Temperatur, Datum und Uhrzeit

Datenpunkt`382` enthält die Datenformatkonfiguration des Geräts, einschließlich:

- **Physikalisches Format:** Metrisch (°C) oder Imperial (°F)
- **Datumsformat:** TagMonatJahr, MonatTagJahr, JahrMonatTag
- **Zeitformat:** 24 Stunden oder 12 Stunden

Die Standardkonfiguration ist:`Metric / DayMonthYear / TwentyFourHours` Die

Ab Adapterversion 0.11.0 werden diese Informationen während des Gerätescans ausgelesen und pro Gerät gespeichert. Die gespeicherte Konfiguration wird dann wie folgt angewendet:

- **Während eines Datenpunktscans** werden die Temperatureinheiten auf °C (metrisch) oder °F (imperial) eingestellt. Es findet keine Umrechnung der numerischen Werte statt.
- **Beim Lesen und Schreiben** werden Datums- und Zeitwerte entsprechend dem gespeicherten Format interpretiert. Beispielsweise wird im Format MonatTagJahr ein Datum als Monat-Tag-Jahr erwartet und gespeichert, nicht als Tag-Monat-Jahr.

> **Hinweis:** Die Verarbeitung von abweichenden Datums-/Zeitformaten ist experimentell. Bitte überprüfen Sie die Ergebnisse sorgfältig, falls Ihr Gerät nicht mit den Standardeinstellungen konfiguriert ist.

Wenn Datenpunkt`382` ist für ein Gerät nicht vorhanden, die Konfiguration des Mastergeräts (CAN-Adresse)`0x680` ) wird als Ausweichlösung verwendet. Steht überhaupt keine Konfiguration zur Verfügung, verhält sich der Adapter wie in Versionen vor 0.11.0.

---

### Schreibbarkeit von Datenpunkten

Ein Datenpunkt wird als beschreibbar behandelt, wenn eine der folgenden Bedingungen zutrifft:

- Seine ID ist in der Whitelist enthalten.`e3oncan.0.<DEVICE>.info.udsDidsWritable` Die
- Es ist in seinen Metadaten als les- und schreibbar gekennzeichnet (verfügbar ab Adapterversion 0.11.0).

Beide Bedingungen werden geprüft; die Whitelist funktioniert weiterhin wie bisher.

---

### Was geschieht beim Start des Adapters und nach Updates?

Bei jedem Start des Adapters werden die Versionen der vorhandenen Datenpunktdefinitionen mit den im aktuellen Adapter enthaltenen Versionen verglichen. Sind neuere Definitionen verfügbar (z. B. nach einem Adapter-Update), werden die betroffenen Datenpunkte automatisch aktualisiert. Dieser Vorgang wird detailliert protokolliert.

**Was Sie bei einem Update erwarten können:**

- Wenn sich die Struktur eines Datenpunkts ändert, ändert sich das gesamte`tree` Das Unterobjekt für diesen Datenpunkt wird gelöscht und mit der neuen Struktur neu erstellt. Dies ist für die korrekte Funktion des Adapters erforderlich, hat aber Nebenwirkungen:
  - **Archivierte Daten** für Elemente des betroffenen`tree` Unterobjekte können verloren gehen.
  - **Verweise** auf diese Elemente in Skripten, Visualisierungen oder anderen Adaptern müssen möglicherweise aktualisiert werden.
- Wenn ein gerätespezifischer Datenpunkt vom Benutzer geändert wurde, wird vor der Anwendung des Updates eine Sicherungskopie der ursprünglichen Struktur erstellt.

> **Empfehlung für die Arbeit mit dem ioBroker-Beta-Repository:** Sichern Sie vor dem ersten Start des Adapters nach einem Update alle Objekte der Adapterinstanz (z. B. \`.src\`).`e3oncan.0` oder zumindest die Objekte einzelner Geräte.

---

### Durchführung eines Datenpunktscans

Ein Datenpunktscan ermittelt alle verfügbaren Datenpunkte auf jedem Gerät und erstellt oder aktualisiert die entsprechenden Objekte in ioBroker.

**Was ein Scan bewirkt:**

- Erkennt alle verfügbaren Datenpunkte auf jedem konfigurierten Gerät.
- Fügt Metadaten (Beschreibung, Einheit, Zugriffsinformationen) für jeden vorhandenen Datenpunkt hinzu oder aktualisiert diese – Einzelheiten finden Sie in der Speicheroption weiter unten.
- Legt Temperatureinheitenbezeichnungen basierend auf der Geräteformatkonfiguration fest (Datenpunkt`382` ).
- Optional werden die während des Scans gelesenen Werte in den Objektbaum geschrieben (siehe unten).

**Option: Alle Datenpunktwerte während des Scans speichern**

Der Scan-Dialog bietet ein Kontrollkästchen: **Alle Datenpunktwerte während des Scans im Objektbaum speichern** :

- **Aktiviert (Standardeinstellung):** Alle während des Scans gelesenen Werte werden in den Objektbaum geschrieben. Fehlende Datenpunktobjekte werden erstellt.
- **Nicht aktiviert:** Werte und Metadaten werden für _bestehende_ Datenpunktobjekte geschrieben. Nicht vorhandene Datenpunktobjekte werden _nicht_ erstellt. Verwenden Sie diese Option, um Metadaten zu aktualisieren, ohne die Objektstruktur zu erweitern – beispielsweise nach einer Migration von einer älteren Adapterversion.

**Wann sollte ein Scan durchgeführt werden?**

- Während der Ersteinrichtung (dringend empfohlen, für das Schreiben erforderlich).
- Nach einem Adapter-Update, das neue Datenpunktdefinitionen einführt.
- Nach einem Software-Update von Viessmann-Geräten.

> **Empfehlung:** Führen Sie zuerst einen Gerätescan durch (gehen Sie zur Registerkarte **Liste der UDS-Geräte** , klicken Sie auf **Scan starten …** ).

**So starten Sie einen Scan:**

Öffnen Sie den Konfigurationsdialog des Adapters, wechseln Sie zum Tab **„Liste der Datenpunkte“** , klicken Sie auf **„Scan starten…“** und bestätigen Sie mit **„OK“** . Der Scan kann bis zu 5 Minuten dauern. Der Fortschritt wird im Adapterprotokoll angezeigt (öffnen Sie dazu einen zweiten Browsertab).

---

### Benutzerdefinierte Datenpunktstrukturen in udsDidsSpecific

Der Staat`e3oncan.0.<DEVICE>.info.udsDidsSpecific` speichert die gerätespezifischen Datenpunktdefinitionen, die sich von den generischen Definitionen unterscheiden in`didsE3.json` Dies umfasst:

- **Variantendatenpunkte** – Definitionen, die während eines Datenpunktscans automatisch ausgewählt wurden, weil das Gerät eine Länge zurückgegeben hat, die einem Eintrag in`didsE3var.json` Die
- **Benutzerdefinierte Strukturen** – Definitionen, die vom Benutzer manuell erstellt oder geändert werden.

Jeder Eintrag in`udsDidsSpecific` ist ein JSON-Objekt, dessen Schlüssel die numerische Datenpunkt-ID ist. Der Adapter verfolgt den Ursprung jedes Eintrags über die`source` Feld:

| `source` Wert          | Bedeutung                                                                                                             |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| abwesend               | Vom Benutzer erstellte Definition oder automatisch platziert vor Einführung der Versionsverfolgung (Adapter < 0.11.0) |
| `"didsE3var_YYYYMMDD"` | Automatisch vom Adapter eingestellt; Version von`didsE3var.json` zum Zeitpunkt der letzten Aktualisierung             |

**Verhalten während des Adapterstarts und des Datenpunktscans:**

- Einträge mit`source: "didsE3var_..."` werden auf die neueste Version aktualisiert von`didsE3var.json` wenn sich die Struktur geändert hat.
- Einträge ohne`source` Feld, das verwendet`RawCodec` (automatisch durch alte Scans platzierte) werden ebenfalls aktualisiert.
- Eine Sicherungskopie der überschriebenen Einträge wird gespeichert in der`Backup` Unterabschnitt von`udsDidsSpecific` Die

**Schutz einer benutzerdefinierten Struktur vor Überschreiben (Adapter ≥ 1.0.3):**

Wenn Sie die Struktur eines Variantendatenpunkts manuell definiert oder überprüft haben und verhindern möchten, dass der Adapter diese überschreibt, fügen Sie einen hinzu.`"protected": true` Feld zum Eintrag in`udsDidsSpecific` Sie können optional ein/e hinzufügen`"reason"` Feld mit einer Freitextbeschreibung; dieser Text wird immer dann in das Adapterprotokoll aufgenommen, wenn der Schutz angewendet wird.

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

Der Adapter protokolliert`Variant datapoint ... is protected by user. Update skipped. Reason: "..."` und die Definition sowohl beim Start des Adapters als auch während eines Datenpunktscans unverändert lassen.

> **Hinweis:** Der Schutz gilt nur für **Variantendatenpunkte** (solche, die in`didsE3var.json` Definitionen für gängige Datenpunkte (aus`didsE3.json` ) werden gespeichert in`udsDidsCommon` und sind von diesem Mechanismus nicht betroffen.

---

## Changelog

### v1.1.1 (2026-07-06)
**Common data points (didsE3.json, v20260705)**

* **ZigBee current-values DIDs 2086–2143 and 2262** (57-byte): Restructured around a new `ViCareDevice` O3ESwitch discriminator that selects the decoded fields by device type. For details see below (v1.1.0).

### v1.1.0 (2026-07-05)

**Variant data points (didsE3var.json, v20260630)**

* **ZigBee current-values DIDs 2086–2143 and 2262** (68-byte variant): Restructured around a new `ViCareDevice` O3ESwitch discriminator that selects the decoded fields by device type:
  - type 0 — empty slot (raw)
  - type 1 — climate sensor: `ActualTemperature` (°C), `Humidity` (%)
  - type 2 — TRV: `ActualTemperature` (°C), `ValveOpening` (%), `DeviceDisplayTurned`, `DeviceChildLockActive`, `DeviceTemperatureSetpoint` (°C)
  - type 3 — floor thermostat / Verteiler: `FlowTemperature` (°C, int16 LE), `OperatingMode`
  - type 4/5 — actuator NC/NO: `Demand` (%), `ValveState`
  - `SignalLevel` (%) and `BatteryRssi` (dBm, signed) added to all types
* **Room property DIDs 1884–1943** (85-byte variant): Added linked ZigBee device index fields; `ChildLockActive` description updated; `WindowDetection` enum corrected.
* **DID 1603** (PointOfCommonCouplingPower): minor description update.

**Common data points (didsE3.json, v20260701)**

* **3 new DIDs** using `O3EFloat32`:
  - 2990 `ElectricalEnergySystemBatteryCapacityDelta`
  - 2991 `ElectricalEnergySystemBatteryCapacity`
  - 2992 `ElectricalEnergySystemStateOfChargeUseable`
* **Unit fixes**: DID 279 and 281 field `Actual`: unit corrected to °C (was empty); DID 321 field `Average`: unit corrected to °C (was hPa); DID 322 field `Average`: unit corrected to hPa (was °C).
* `decimals` field added to all numeric sub-fields for consistency with the updated codec definition (value `0` — no change to decoded values).

### v1.0.3 (2026-05-31)
* **ZigBee DIDs 2084–2319 structured**: ZigBeeDeviceProperty (incl. ArticleNumber), ZigBeeDeviceCurrentValues in 57-byte (gas heater) and 68-byte (heat pump) variants with WorkingMode, Setpoint, Display, ChildLock fields
* **Room DIDs 1884–1943 structured**: RoomProperty (name, type, temperature control, window detection) and RoomCurrentValues (temperature, humidity min/max) in 84/85-byte variants
* **New ViGuide-derived DID structures**: fuel cell metrics (1349–1362), energy coverage matrices (1354–1373), demand coverage (1383), battery/inverter subscription DIDs (257–266, 2214 ff.)
* **Enums updated**: `ViCareDeviceTypes` (TRV, sensor, repeater, UFH actuator), `CurrentWorkingModeLevels` (Cooling=100)
* Codec convention: `Unknown*` fields now consistently use `RawCodec`

### v0.11.0 (2026-04-14)

Updated structure of the following data points:
268, 269, 271, 274, 279, 282, 284, 285, 286, 287, 288, 289, 290, 291, 318, 320, 321, 324, 531, 1659, 1684, 1768, 1769, 1770, 1771, 1772, 2084, 2085, 2087, 2088, 2090, 2091, 2093, 2094, 2096, 2097, 2099, 2100, 2102, 2103, 2105, 2106, 2108, 2109, 2111, 2112, 2114, 2115, 2117, 2118, 2120, 2121, 2123, 2124, 2126, 2127, 2129, 2130, 2132, 2133, 2135, 2136, 2138, 2139, 2141, 2142, 2240, 2260, 2261, 2263, 2264, 2266, 2267, 2269, 2270, 2272, 2273, 2275, 2276, 2278, 2279, 2281, 2282, 2284, 2285, 2287, 2288, 2290, 2291, 2293, 2294, 2296, 2297, 2299, 2300, 2302, 2303, 2305, 2306, 2308, 2309, 2311, 2312, 2314, 2315, 2317, 2318, 2320, 2333, 2334, 2351, 2352, 2593, 2735, 2806, 3014, 3015, 3016, 3017, 3018, 3032, 3034, 3035, 3036

**Notes:**
- For all sensor data points the last entry `Unknown` was renamed to `SensorStatus`. This is the reason for the large number of changed data points.
- For the frequently used data points 531, 2351, 2532 and 2735 the numerical value has been moved to a sub-state `ID`:
  - `0531_DomesticHotWaterOperationState.ID`
  - `2351_HeatPumpCompressor.PowerState.ID`
  - `2352_AdditionalElectricHeater.PowerState.ID`
  - `2735_FourThreeWayValveValveCurrentPosition.ID`