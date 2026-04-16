---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e3oncan/README.md
title: ioBroker.e3oncan
hash: 8mk2ybif7DmQLIK1kNTbrxTutX7NCm21GNxys/rkW7E=
---
![Logo](../../../en/adapterref/iobroker.e3oncan/admin/e3oncan_small.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.e3oncan.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)
![Anzahl der Installationen](https://iobroker.live/badges/e3oncan-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/e3oncan-stable.svg)
![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)

# IoBroker.e3oncan
**Tests:** ![Test und Freigabe](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## E3oncan-Adapter für ioBroker
## Inhaltsverzeichnis
- [Übersicht](#overview)
- [Schnellstart](#quick-start)
- [Konfigurationsleitfaden](#configuration-guide)
- [Schritt 1 – CAN-Adapter](#step-1--can-adapter)
- [Schritt 2 – Gerätescan](#step-2--device-scan)
- [Schritt 3 – Datenpunktscan](#step-3--data-point-scan)
- [Schritt 4 – Aufgaben und Zeitpläne](#step-4--assignments-and-schedules)
- [Datenpunkte lesen](#reading-data-points)
- [Schreiben von Datenpunkten](#writing-data-points)
- [Datenpunkte und Metadaten](#data-points-and-metadata)
- [Energiezähler](#energy-meters)
- [E380 Daten und Einheiten](#e380-data-and-units)
- [E3100CB Daten und Einheiten](#e3100cb-data-and-units)
- [FAQ und Einschränkungen](#faq-and-limitations)
- [Spenden](#donate)
- [Änderungsprotokoll](#changelog)

---

## Übersicht
Geräte der Viessmann E3-Serie (One Base-Ökosystem) tauschen große Datenmengen über den CAN-Bus aus. Dieser Adapter greift auf diese Kommunikation zu und stellt die Daten in ioBroker zur Verfügung.

Zwei Betriebsarten funktionieren unabhängig voneinander und können kombiniert werden:

| Modus | Beschreibung |
|---|---|
| **Erfassen** | Lauscht passiv auf dem CAN-Bus und extrahiert Daten in Echtzeit, während Geräte diese austauschen. Es werden keine Anfragen gesendet. Ideal für sich schnell ändernde Werte wie z. B. den Energiefluss. |
| **UDSonCAN** | Liest und schreibt aktiv Datenpunkte mithilfe des UDS-Protokolls (Universal Diagnostic Services over CAN). Erforderlich für Sollwerte, Zeitpläne und Daten, die nicht spontan übertragen werden. |

Welche Modi verfügbar sind, hängt von Ihrer Gerätetopologie ab. Siehe Abschnitt [Weitere Details zur Gerätetopologie finden Sie in der Diskussion unter [https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34]. Anregungen für die Verwendung des Adapters finden Sie in der Diskussion zu Anwendungsfällen.](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35).

Wichtige Teile dieses Adapters basieren auf dem Projekt [open3e](https://github.com/open3e).

Eine Python-basierte Implementierung, die ausschließlich Daten sammelt und MQTT verwendet, ist unter [E3onCAN](https://github.com/MyHomeMyData/E3onCAN) verfügbar.

---

## Schnellstart
**Voraussetzungen**

- Ein USB-zu-CAN- oder CAN-Adapter, der an den externen oder internen CAN-Bus Ihres Viessmann E3-Geräts angeschlossen ist.
- Ein Linux-basiertes Hostsystem (nur Linux wird unterstützt).
- Der CAN-Adapter ist aktiv und im System sichtbar, z. B. als `can0` (Überprüfung mit `ifconfig`).
- Einzelheiten zur Einrichtung des CAN-Adapters finden Sie im [open3e Projekt-Wiki](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry).

**Wichtig:** Stellen Sie sicher, dass kein anderer UDSonCAN-Client (z. B. open3e) ausgeführt wird, während Sie diesen Adapter zum ersten Mal einrichten. Parallele UDS-Kommunikation führt zu Fehlern in beiden Anwendungen.

**Ersteinrichtung – auf einen Blick**

1. Installieren Sie den Adapter und öffnen Sie dessen Konfigurationsdialog.
2. Konfigurieren Sie Ihren/Ihre CAN-Adapter auf der Registerkarte **CAN-Adapter** und speichern Sie die Einstellungen.
3. Suchen Sie auf der Registerkarte **Liste der UDS-Geräte** nach E3-Geräten.
4. Suchen Sie auf der Registerkarte **Liste der Datenpunkte** nach Datenpunkten (dauert bis zu 5 Minuten).
5. Richten Sie auf der Registerkarte **Aufgaben** Lesepläne ein und speichern Sie diese.

Die detaillierten Schritte werden in den nachfolgenden Abschnitten [Konfigurationsleitfaden](#configuration-guide) beschrieben.

**Nach einem Node.js-Upgrade:** Die von diesem Adapter verwendeten nativen Module müssen bei einer Änderung der Node.js-Version neu kompiliert werden. Falls der Adapter nach einem Node.js-Upgrade nicht startet, stoppen Sie ihn, führen Sie in der Kommandozeile den Befehl ``iob rebuild`` aus und starten Sie ihn anschließend erneut.

---

## Konfigurationsleitfaden
### Schritt 1 – CAN-Adapter
Öffnen Sie den Adapterkonfigurationsdialog und wechseln Sie zur Registerkarte **CAN-Adapter**.

- Geben Sie den Namen Ihrer CAN-Schnittstelle ein (Standard: `can0`).
- Aktivieren Sie **Mit Adapter verbinden** für jede Schnittstelle, die Sie verwenden möchten.
- Drücken Sie **SPEICHERN**. Die Adapterinstanz wird neu gestartet und verbindet sich mit dem CAN-Bus.

Falls Sie über einen zweiten CAN-Bus verfügen (z. B. einen internen Bus), konfigurieren Sie diesen hier als zweiten Adapter. Nach der Konfiguration des zweiten Adapters wird ein zweiter Reiter „Zuweisungen“ angezeigt.

### Schritt 2 – Gerätescan
Wechseln Sie zum Tab **Liste der UDS-Geräte** und klicken Sie auf die Schaltfläche **Scannen**.

Der Scan dauert einige Sekunden. Sie können den Fortschritt im Adapterprotokoll verfolgen (öffnen Sie dazu einen zweiten Browsertab).
Alle im Bus befindlichen E3-Geräte werden aufgelistet. Energiezähler (E380, E3100CB) werden hier nicht aufgeführt – sie werden separat konfiguriert.
- Sie können die Geräte in der zweiten Spalte umbenennen. Diese Namen werden als Kennungen im Objektbaum von ioBroker verwendet.
- Klicken Sie nach Abschluss auf **SPEICHERN**. Die Instanz wird neu gestartet.

Während des Gerätescans liest der Adapter auch die Datenformatkonfiguration des Geräts (Datenpunkt 382), einschließlich der Temperatureinheiten (°C oder °F) und des Datums-/Zeitformats. Diese Daten werden gespeichert und bei nachfolgenden Datenpunktscans verwendet.

### Schritt 3 – Datenpunktscan
Gehen Sie zum Tab **Liste der Datenpunkte**, klicken Sie auf **Scan starten…** und bestätigen Sie mit **OK**.

**Bitte haben Sie Geduld** – der Scan kann bis zu 5 Minuten dauern. Der Fortschritt wird im Adapterprotokoll angezeigt.

Was der Scan bewirkt:

- Ermittelt alle verfügbaren Datenpunkte für jedes Gerät.
- Fügt jedem Datenpunktobjekt Metadaten (Beschreibung, Einheit, Lese-/Schreibzugriff) hinzu.
- Legt die physikalischen Einheiten anhand der in Schritt 2 ermittelten Geräteformatkonfiguration fest.
- Erstellt den vollständigen Objektbaum für jedes Gerät in ioBroker.

Dieser Schritt ist für die Nutzung im Nur-Lese-Modus nicht unbedingt erforderlich, wird aber **dringend empfohlen** – und ist **erforderlich**, wenn Sie Datenpunkte beschreiben möchten.

Nach dem Scan können Sie die gefundenen Datenpunkte im Konfigurationsdialog durchsuchen, indem Sie ein Gerät auswählen und auf „Datenpunktliste aktualisieren“ klicken. Verwenden Sie das Filtersymbol, um nach Name oder Codec zu suchen. Deaktivieren Sie den Filter, bevor Sie zu einem anderen Gerät wechseln.

### Schritt 4 – Aufgaben und Zeitpläne
Wechseln Sie zum Reiter **Zuweisungen zum UDS CAN-Adapter** (und gegebenenfalls zum Reiter des zweiten Adapters).

**Energiemesser (Sammelmodus)**

Wenn Sie Energiezähler vom Typ E380 oder E3100CB verwenden, können Sie die Datenüberwachung hier aktivieren. Legen Sie die **Mindestaktualisierungszeit (s)** fest, um zu steuern, wie oft Werte gespeichert werden. Der Standardwert von 5 Sekunden wird empfohlen, da Energiezähler mehr als 20 Werte pro Sekunde übertragen. Die Einstellung auf 0 führt zu einer hohen Auslastung von ioBroker.

**E3-Geräteerfassung (Erfassungsmodus)**

Drücken Sie **+**, um ein Gerät hinzuzufügen. Aktivieren Sie **Aktiv**, wählen Sie das Gerät aus und legen Sie die **Mindestaktualisierungszeit (s)** fest. Ein Wert von 5 Sekunden wird empfohlen; 0 Sekunden (Speichern jedes empfangenen Werts) sind zwar möglich, führen aber zu einer höheren Systemlast.

Dieser Modus erfasst die zwischen Ihren E3-Geräten ausgetauschten Daten in Echtzeit, ohne Anfragen zu senden. Details zu den Geräten, die dies unterstützen, finden Sie im Abschnitt [Häufig gestellte Fragen](#faq-and-limitations).

**UDSonCAN kann Spielpläne lesen**

Drücken Sie **+**, um einen Zeitplan hinzuzufügen. Wählen Sie ein Gerät und eine Liste der zu erfassenden Datenpunkte aus und legen Sie anschließend ein Intervall in Sekunden fest. Der Wert 0 bedeutet, dass die Datenpunkte einmalig beim Start des Adapters erfasst werden.

Sie können pro Gerät mehrere Zeitpläne hinzufügen, um bestimmte Datenpunkte häufiger als andere abzufragen. Nutzen Sie die Registerkarte **Liste der Datenpunkte** (in einem zweiten Browser-Tab öffnen) als Referenz.

Klicken Sie nach Abschluss auf **SPEICHERN & SCHLIESSEN**. Überprüfen Sie die Objektstruktur, um sicherzustellen, dass Daten erfasst werden.

---

## Datenpunkte lesen
Die Datenpunkte werden automatisch gemäß den von Ihnen konfigurierten Zeitplänen ausgelesen. Die Werte erscheinen im Objektbaum von ioBroker unter dem Gerätenamen und sind in die Unterobjekte `json`, `raw` und `tree` mit lesbaren Namen und Metadaten unterteilt.

**Auslesen eines bestimmten Datenpunkts auf Anfrage**

Sie können jederzeit beliebige Datenpunkte anfordern, indem Sie den Status `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` bearbeiten und eine Liste von Datenpunkt-IDs eingeben, beispielsweise `[3350, 3351, 3352]`. Ist der Datenpunkt auf dem Gerät verfügbar, wird der Wert in der Objektstruktur angezeigt und kann in Leseplänen verwendet werden.

Der numerische Scanbereich ist derzeit begrenzt (z. B. 256–3338 in Version 0.11.0). Verwenden Sie `udsReadByDid`, um Datenpunkte außerhalb dieses Bereichs zu untersuchen.

---

## Schreiben von Datenpunkten
Der Schreibvorgang ist bewusst einfach gehalten: Der Wert des entsprechenden Zustands in ioBroker wird geändert und gespeichert, **ohne** das Kontrollkästchen `Acknowledged` (Bestätigung) zu aktivieren. Der Adapter erkennt den nicht bestätigten Schreibvorgang und sendet ihn an das Gerät.

Etwa 2,5 Sekunden nach dem Schreiben liest der Adapter den Datenpunkt vom Gerät zurück und speichert den bestätigten Wert. Wird der Status anschließend nicht bestätigt, überprüfen Sie das Adapterprotokoll auf Fehlerdetails.

**Whitelist der beschreibbaren Datenpunkte**

Das Schreiben ist auf Datenpunkte auf einer Positivliste beschränkt, die hier gespeichert ist:

```
e3oncan.0.<DEVICE>.info.udsDidsWritable
```

Sie können die Liste erweitern, indem Sie diesen Status bearbeiten. Speichern Sie ihn **ohne** `Acknowledged` zu aktivieren.

Manche Datenpunkte können selbst dann nicht geändert werden, wenn sie auf der Whitelist stehen – das Gerät gibt eine negative Antwort zurück. Der Adapter versucht es dann mit einem alternativen Dienst (nur interner CAN-Bus). Überprüfen Sie Schreibvorgänge immer, indem Sie kontrollieren, ob der Wert bestätigt wurde.

---

## Datenpunkte und Metadaten
Detaillierte Informationen darüber, wie Datenpunkte strukturiert sind, wie Variantendatenpunkte und Metadaten funktionieren und wie Temperatur-/Datums-/Zeitformate behandelt werden, finden Sie in [data-points.md](lib/data-points.md).

---

## Energiezähler
### E380 Daten und Einheiten
Es werden bis zu zwei E380-Energiezähler unterstützt. Die Datenpunkt-IDs hängen von der CAN-Adresse des Geräts ab:

- **CAN-Adresse 97:** Datenpunkte mit geraden IDs
- **CAN-Adresse 98:** Datenpunkte mit ungeraden IDs

| ID | Daten | Einheit |
|---|---|---|
| 592, 593 | Wirkleistung L1, L2, L3, Gesamt | W |
| 594, 595 | Blindleistung L1, L2, L3, Gesamt | var |
| 596, 597 | Absoluter Strom L1, L2, L3; cosPhi | A, — |
| 598, 599 | Spannung L1, L2, L3; Frequenz | V, Hz |
| 600, 601 | Kumulierte Importe, Exporte | kWh |
| 602, 603 | Gesamtwirkleistung, Gesamtblindleistung | W, var |
| 604, 605 | Kumulierte Importe | kWh |

### E3100CB Daten und Einheiten
| ID | Daten | Einheit |
|---|---|---|
| 1385_01 | Kumulierter Import | kWh |
| 1385_02 | Kumulierte Exporte | kWh |
| 1385_03 | Zustand: −1 = Einspeisung / +1 = Versorgung | — |
| 1385_04 | Gesamtleistung (Wirkleistung) | W |
| 1385_08 | Wirkleistung L1 | W |
| 1385_12 | Wirkleistung L2 | W |
| 1385_16 | Wirkleistung L3 | W |
| 1385_05 | Blindleistung gesamt | var |
| 1385_09 | Blindleistung L1 | var |
| 1385_13 | Blindleistung L2 | var |
| 1385_17 | Blindleistung L3 | var |
| 1385_06 | Stromstärke, absolut L1 | A |
| 1385_10 | Stromstärke, absolut L2 | A |
| 1385_14 | Stromstärke, absolut L3 | A |
| 1385_07 | Spannung L1 | V |
| 1385_11 | Spannung L2 | V |
| 1385_15 | Spannung L3 | V |

---

## Häufig gestellte Fragen und Einschränkungen
**Warum sollte man Collect und UDSonCAN zusammen verwenden?**

Collect liefert Ihnen Echtzeitdaten für alle zwischen den Geräten ausgetauschten Daten – schnell veränderliche Werte wie den Energiefluss und langsam veränderliche Werte wie Temperaturen, die alle sofort aktualisiert werden. UDSonCAN ermöglicht Ihnen den Zugriff auf Daten, die nicht spontan übertragen werden, typischerweise Sollwerte und Konfigurationswerte. Die Kombination beider Systeme bietet Ihnen ein umfassendes und aktuelles Bild Ihres Systems.

**Welche Geräte unterstützen den Sammelmodus?**

Das Collect-Protokoll ist derzeit bekannt für:

- Vitocal (lauscht auf CAN-ID `0x693`, interner CAN-Bus)
- Vitocharge VX3 und Vitoair (hören auf CAN-ID `0x451`, externer und interner CAN-Bus)

Kann ich open3e gleichzeitig verwenden?

Ja, unter bestimmten Bedingungen. Wenn Sie in diesem Adapter ausschließlich den Collect-Modus verwenden, kann open3e ohne Einschränkungen parallel dazu ausgeführt werden. Wenn Sie hier UDSonCAN verwenden, sollten Sie open3e nicht gleichzeitig für dieselben Geräte ausführen – dies führt zu sporadischen Kommunikationsfehlern in beiden Anwendungen.

**Der Adapter funktioniert nach einem Node.js-Upgrade nicht mehr. Was kann ich tun?**

Dieser Adapter verwendet native Module, die bei einer Änderung der Node.js-Version neu kompiliert werden müssen. Stoppen Sie den Adapter, führen Sie in der Kommandozeile ``iob rebuild`` aus und starten Sie den Adapter anschließend neu. Sollte das Problem weiterhin bestehen, melden Sie es bitte.

**Was unterscheidet es vom open3e-Projekt?**

- Direkte Integration in ioBroker: Konfiguration über Dialoge, Daten direkt im Objektbaum sichtbar.
- Echtzeit-Erfassungsmodus zusätzlich zu UDSonCAN.
- Das Schreiben von Daten ist einfacher: Man ändert einfach einen Statuswert und speichert ihn, ohne eine Bestätigung abzugeben.
- Kein MQTT erforderlich (obwohl MQTT natürlich über die normale ioBroker-Konfiguration verfügbar ist).
Die 64-Bit-Ganzzahlkodierung für Schreibvorgänge ist auf Werte unter 2^52 (4.503.599.627.370.496) beschränkt. Die Dekodierung funktioniert über den gesamten 64-Bit-Bereich korrekt.

**Kann ich Datenpunkte außerhalb des Scanbereichs anfordern?**

Ja. Bearbeiten Sie den Status `e3oncan.0.<DEVICE>.cmnd.udsReadByDid` und geben Sie eine Liste von Datenpunkt-IDs ein, z. B. `[3350, 3351, 3352, 3353]`. Verfügbare Datenpunkte werden in der Objektstruktur angezeigt und können in Leseplänen verwendet werden. Nicht verfügbare Datenpunkte führen zu einer Meldung „Negative Antwort“ im Protokoll.

---

## Spenden
<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a> Wenn dir dieses Projekt gefallen hat – oder du einfach nur großzügig sein möchtest –, spendiere mir doch ein Bier. Prost! 😉

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (MyHomeMyData) To take full advantage of the variant data points and metadata, please perform a device scan followed by a data point scan
* (MyHomeMyData) Added handling for variant data points and for device's data format configuration, refer to https://github.com/MyHomeMyData/ioBroker.e3oncan/lib/data-points.md for details
* (MyHomeMyData) Added metadata to several data points, e.g. description, unit, link to further info
* (MyHomeMyData) During scan of data points now metadata are added to data point objects
* (MyHomeMyData) Changed handling of writable data points; this info now also is available within definition of data point; however, there is no change to handling of the whitelist of writables
* (MyHomeMyData) During device scan the information about used data formats (data point 382) is evaluated
* (MyHomeMyData) Updated structure of the following data points: 268,269,271,274,279,282,284,285,286,287,288,289,290,291,318,320,321,324,531,1659,1684,1768,1769,1770,1771,1772,2084,2085,2087,2088,2090,2091,2093,2094,2096,2097,2099,2100,2102,2103,2105,2106,2108,2109,2111,2112,2114,2115,2117,2118,2120,2121,2123,2124,2126,2127,2129,2130,2132,2133,2135,2136,2138,2139,2141,2142,2240,2260,2261,2263,2264,2266,2267,2269,2270,2272,2273,2275,2276,2278,2279,2281,2282,2284,2285,2287,2288,2290,2291,2293,2294,2296,2297,2299,2300,2302,2303,2305,2306,2308,2309,2311,2312,2314,2315,2317,2318,2320,2333,2334,2351,2352,2593,2735,2806,3014,3015,3016,3017,3018,3032,3034,3035,3036
* (MyHomeMyData) Hint: For all sensor data points the last entry "Unknown" was changed to "SensorStatus". That's why the list of changed data points is so long.
* (MyHomeMyData) Hint: For the frequently used data points 531, 1415..1418, 2351, 2532 and 2735 the numerical value has been moved to the sub "ID": 0531_DomesticHotWaterOperationState, 1415_MixerOneCircuitOperationState.State.ID, 2351_HeatPumpCompressor.PowerState.ID, 2352_AdditionalElectricHeater.PowerState.ID, 2735_FourThreeWayValveValveCurrentPosition.ID

### 0.10.14 (2025-11-03)
* (MyHomeMyData) Added elements to enums.js based of PR no. 182 of open3e
* (MyHomeMyData) Simplified configuration of dids scan limits in source code
* (MyHomeMyData) Extended scan up to did 3338
* (MyHomeMyData) Added hint regarding scan range in Readme
* (MyHomeMyData) Fixes for issue #169 (repository checker)
* (MyHomeMyData) Bugfix: Manual change of device specific dids was not evaluated for collect workers
* (MyHomeMyData) Update of list of data points for E3 devices to version 20251102

### 0.10.13 (2025-09-30)
* (MyHomeMyData) Fix for issue #162

### 0.10.12 (2025-09-15)
* (MyHomeMyData) Migration to ESLint 9, refer to issues #141 and #152

### 0.10.11 (2025-09-06)
* (MyHomeMyData) Fix for issue #152 (repository checker) and #126 (node.js 24)
* (MyHomeMyData) Added hint to readme regarding user action after upgrading version of node.js
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250903

### 0.10.10 (2025-08-07)
* (MyHomeMyData) Fix for issue #142 (WriteByDid not working in case of specific UDS control frame)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250729
* (MyHomeMyData) Added codec for 64-bit integers. Remark: Encoding (for writing of data) is limited to values < 2^52 (4.503.599.627.370.496).

### 0.10.9 (2025-05-22)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250422
* (MyHomeMyData) Fixed version number of enum info
* (MyHomeMyData) Fix for issue #125 (findings of repository checker)

### 0.10.8 (2025-03-07)
* (MyHomeMyData) Bugfix for issue #117
* (MyHomeMyData) Updated data point 381, refer to discussion https://github.com/open3e/open3e/discussions/212
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250307

### 0.10.7 (2025-02-26)
* (MyHomeMyData) Updated dependencies according to issue #111

### 0.10.6 (2025-02-19)
* (MyHomeMyData) Added missing enum info for data point 2850

### 0.10.5 (2025-02-18)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250217
* (MyHomeMyData) Updated dependencies according to issues #101 and #108

### 0.10.4 (2025-01-15)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20250114

### 0.10.3 (2024-11-26)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241125

### 0.10.2 (2024-11-16)
* (MyHomeMyData) Update of list of data points for E3 devices to version 20241115
* (MyHomeMyData) Fixes for issue #81 (added missing size attributes)

### 0.10.1 (2024-10-20)
* (MyHomeMyData) Fixes for issue #79 (improvements for usability on mobile devices)

### 0.10.0 (2024-10-14)
* (MyHomeMyData) Added extended support for writing of data points.
* (MyHomeMyData) Changed naming for CAN adapter.

Older changelog entries are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2024-2026 MyHomeMyData <juergen.bonfert@gmail.com>

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