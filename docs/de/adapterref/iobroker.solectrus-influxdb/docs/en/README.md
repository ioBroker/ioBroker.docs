---
chapters: {"pages":{"en/adapterref/iobroker.solectrus-influxdb/README.md":{"title":{"en":"ioBroker.solectrus-influxdb"},"content":"en/adapterref/iobroker.solectrus-influxdb/README.md"},"en/adapterref/iobroker.solectrus-influxdb/docs/en/README.md":{"title":{"en":"SOLECTRUS InfluxDB Adapter -- Documentation"},"content":"en/adapterref/iobroker.solectrus-influxdb/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solectrus-influxdb/docs/en/README.md
title: SOLECTRUS InfluxDB-Adapter - Dokumentation
hash: UpZI6LyBTW8uJ682mJV4981Po16kHhTYH2VL2uDdP0I=
---
# SOLECTRUS InfluxDB-Adapter – Dokumentation

## Inhaltsverzeichnis

1. [InfluxDB-Konfiguration](#1-influxdb-configuration)
2. [Sensoren](#2-sensors)
3. [Registerkarte „Sensorenübersicht“](#3-sensors-overview-tab)
4. [Prognosequellen](#4-forecast-sources)
5. [Anleitung: pvForecast mit pvnode](#5-how-to-pvforecast-with-pvnode)
6. [Data-SOLECTRUS Formel-Engine](#6-data-solectrus-formula-engine)
7. [Elementmodi](#7-item-modes)
8. [Formelgenerator](#8-formula-builder)
9. [Zustandsmaschinenmodus](#9-state-machine-mode)
10. [Datenlaufzeiteinstellungen](#10-data-runtime-settings)
11. [Überwachung & Puffer](#11-monitoring--buffer)
12. [Verwendung berechneter Werte als Sensorquellen](#12-using-computed-values-as-sensor-sources)
13. [Debugging](#13-debugging)
14. [Benachrichtigungen](#14-notifications)
15. [Backup](#15-backup)

---

## 1. InfluxDB-Konfiguration

Öffnen Sie die Adaptereinstellungen und wechseln Sie zur Registerkarte **InfluxDB** .

| Feld                 | Beschreibung                                                  |
| -------------------- | ------------------------------------------------------------- |
| URL                  | InfluxDB 2.x Serveradresse (z. B.`http://192.168.1.10:8086` ) |
| Organisation         | Ihre InfluxDB-Organisation                                    |
| Eimer                | Ziel-Bucket für Zeitreihendaten                               |
| Token                | API-Token mit **Schreibberechtigungen**                       |
| Abfrageintervall (s) | Wie häufig werden die Sensorwerte erfasst (5-30 Sekunden)     |

Der Adapter überprüft die Verbindung beim Start durch Schreiben eines Testpunkts. Der Verbindungsstatus wird angezeigt in`info.connection` Die

Am unteren Rand dieses Tabs finden Sie:

- Ein Kontrollkästchen zur Aktivierung der **Data-SOLECTRUS-** Formel-Engine (siehe Abschnitt 5).
- Ein Kontrollkästchen zur Aktivierung **des Expertenmodus** (siehe Abschnitt 2 – Sensoren)

---

## 2. Sensoren

Wechseln Sie zum Reiter **„Sensoren“** . Der Master-/Detail-Editor zeigt alle konfigurierten Sensoren mit ihrem Live-Status und optionaler Gruppierung an.

### Standardmodus vs. Expertenmodus

Standardmäßig läuft der Adapter im **Standardmodus** . Die Sensorliste zeigt alle vorkonfigurierten Sensoren an (Wechselrichterleistung, Batterieladestand, Hausstrom, Wettervorhersagesensoren usw.). Im Standardmodus:

- Die Sensorliste kann nach **Ordner/Gruppe** reduziert werden. Alle vorkonfigurierten SOLECTRUS-Sensoren befinden sich **standardmäßig in der Gruppe „SOLECTRUS-Sensoren“** . Vorhandene Sensoren aus älteren Konfigurationen, die nicht dem Standard-Sensorsatz entsprechen, werden automatisch der Gruppe **„Benutzerdefinierte Sensoren“** zugewiesen.
- **Bearbeitbar** : Quellstatus (ioBroker-Status), Aktiviertes Kontrollkästchen
- **Schreibgeschützt** : Sensorname, Datentyp, Messung, Feld, JSON-Voreinstellung
- **Ausgeblendet** : Schaltflächen „Hinzufügen“, „Löschen“, „Duplizieren“, internes Kontrollkästchen, Ordner/Gruppe, Einheit, Maximalwert, Lebensdauer-Timeout

Dies ermöglicht es Einsteigern, Sensoren einfach zu aktivieren und Quellzustände zuzuweisen, ohne versehentlich das InfluxDB-Mapping zu ändern. Im Standardmodus gelten folgende Standardeinstellungen: **Wertüberwachung deaktiviert** (Maximalwert = 0) und **60 Minuten** Timeout. Eine detaillierte Konfiguration ist im Expertenmodus möglich.

Um die volle Kontrolle zu erhalten, aktivieren Sie **den Expertenmodus** auf der InfluxDB-Einstellungsseite. Im Expertenmodus:

- Alle Felder sind bearbeitbar.
- Sensoren können hinzugefügt, gelöscht, dupliziert und neu angeordnet werden.
- Neu erstellte Sensoren werden zunächst in der Gruppe **„Benutzerdefinierte Sensoren“** angezeigt und können dort neu gruppiert oder bei Bedarf ohne Gruppe gespeichert werden.
- JSON-Voreinstellungen können in den benutzerdefinierten Modus geändert werden.

### Sensoreinstellungen

Die folgende Tabelle zeigt alle konfigurierbaren Felder pro Sensor. Im **Expertenmodus** sind alle Felder bearbeitbar und Sensoren können hinzugefügt, gelöscht und neu angeordnet werden.

Klicken Sie auf **Hinzufügen** (Expertenmodus) oder wählen Sie einen vorhandenen Sensor zur Konfiguration aus:

| Einstellung                               | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                                               | Modus              |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Ermöglicht                                | Sensor aktivieren/deaktivieren                                                                                                                                                                                                                                                                                                                                                                                                                             | Standard + Experte |
| Intern                                    | Spiegelt den aktuellen Wert wider und hält die Überwachung aktiv, überspringt aber Schreibvorgänge in InfluxDB. Standard:`false` Die                                                                                                                                                                                                                                                                                                                       | Experte            |
| ioBroker Quellstatus                      | Der Quellzustand, aus dem Werte gelesen werden sollen. Verwenden Sie die Schaltfläche **„Auswählen** “, um die Objektstruktur zu durchsuchen.                                                                                                                                                                                                                                                                                                              | Standard + Experte |
| Ordner/Gruppe                             | Optionaler Gruppenname für die Sensorliste links. Leerer Wert = **Nicht gruppiert** . Alle Standardsensoren befinden sich unter **„Standard-SOLECTRUS-Sensoren“** . Ältere, nicht standardmäßige Sensoren und neu erstellte Sensoren im Expertenmodus befinden sich unter **„Benutzerdefinierte Sensoren“** .                                                                                                                                              | Experte            |
| Sensorname                                | Anzeigename (wird auch für die ioBroker-Status-ID verwendet unter`sensors.*` )                                                                                                                                                                                                                                                                                                                                                                             | Experte            |
| Einheit                                   | Physikalische Einheit des Sensorwertes (z. B.`W` ,`°C` ,`%` ,`A` Automatisch aus dem ioBroker-Status erkannt.`common.unit` wenn ein Quellstatus ausgewählt ist. Standardmäßig`W` Wenn keine Einheit konfiguriert ist. Kann im Expertenmodus manuell überschrieben werden.                                                                                                                                                                                  | Experte            |
| Maximalwert                               | Plausibilitätsgrenze pro Sensor. Wird diese überschritten, wird stattdessen der letzte gültige Wert gesendet und eine Warnung protokolliert. **0 = deaktiviert** (Standard).                                                                                                                                                                                                                                                                               | Experte            |
| Zeitüberschreitung (min, 0 = deaktiviert) | Wird innerhalb dieses Zeitraums kein neuer Wert empfangen: Ist der aktuelle Wert **ungleich null** , wird eine Warnung protokolliert und der Zeitstempel in der Übersicht **orange** angezeigt; ist der aktuelle Wert **0** , wird stattdessen eine Informationsmeldung protokolliert und die nächste Prüfung nach **60 Minuten** durchgeführt. **0 = deaktiviert** . Standard:`60` . Muss größer sein als das Aktualisierungsintervall des Quelladapters. | Experte            |
| Datentyp                                  | `int` ,`float` ,`bool` ,`string` , oder`json` (JSON-Array)                                                                                                                                                                                                                                                                                                                                                                                                 | Experte            |
| Zuflussmessung                            | Der Name der InfluxDB-Messung (z. B.`inverter` )                                                                                                                                                                                                                                                                                                                                                                                                           | Experte            |
| Zuflussfeld                               | Der InfluxDB-Feldname (z. B.`power` )                                                                                                                                                                                                                                                                                                                                                                                                                      | Experte            |

Mindestens ein Sensor muss aktiviert sein, damit Daten geschrieben werden können.

### Statussymbole in der Sensorliste

- `⚪` Der Sensor ist deaktiviert.
- `🟡` = Sensor ist aktiviert, aber **intern** (Überwachung ja, Influx-Schreiben nein)
- `🟢` Der Sensor ist aktiviert und sendet Daten an InfluxDB.

### JSON-Sensoren (Vorhersagedaten)

Für Wettervorhersage-/Wetterdaten stellen Sie den Datentyp auf **JSON-Array** ein. Zwei voreingestellte Modi stehen zur Verfügung:

| Modus           | Beschreibung                                                                                                                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Automatisch** | Erkennt automatisch bekannte Felder in den JSON-Daten (`y` ,`clearsky` ,`temp` und schreibt jeden Wert in die entsprechende InfluxDB-Messung/das entsprechende Feld. Ein Sensor verarbeitet alle erkannten Vorhersagetypen. |
| **Brauch**      | Definieren Sie manuell das JSON-Zeitstempelfeld, das Wertfeld und den InfluxDB-Typ. Verwenden Sie diese Option für nicht standardmäßige JSON-Quellen.                                                                       |

**Automatische Kartierungserkennung:**

| JSON-Feld  | InfluxDB-Messung             | InfluxDB-Feld | Typ      |
| ---------- | ---------------------------- | ------------- | -------- |
| `y`        | `inverter_forecast`          | `power`       | int      |
| `clearsky` | `inverter_forecast_clearsky` | `power`       | int      |
| `temp`     | `outdoor_forecast`           | `temperature` | schweben |

Felder, die im JSON nicht vorhanden sind, werden automatisch übersprungen.

### Wie Sensoren funktionieren

1. Der Adapter abonniert den Quellzustand jedes Sensors.
2. Die Werte werden gespiegelt unter`solectrus-influxdb.X.sensors.*`
3. Bei jedem Abfrageintervall werden die aktuellen Werte dem Schreibpuffer hinzugefügt ( **Collect** ).
4. Unmittelbar nach dem Sammeln wird der Puffer in InfluxDB geleert ( **Flush** ).

Sensoren, die als **intern** gekennzeichnet sind, werden weiterhin gespiegelt unter`solectrus-influxdb.X.sensors.*` und bleiben Teil der Überwachung von aktiven/maximalen Zuständen, sind aber von InfluxDB-Schreibvorgängen ausgeschlossen.

### Architektur sammeln & spülen

Sammeln und Spülen erfolgen nahezu gleichzeitig, ohne sich gegenseitig zu blockieren:

1. **Collect** erfasst alle Sensorwerte und schreibt sie in den Puffer.
2. **Sofortiger Flush** – nach dem Sammeln wird der Flush beim nächsten Ereignisschleifen-Tick ausgelöst (kein zusätzliches Warteintervall).
3. **Snapshot-and-Swap** – Beim Start des Flush-Vorgangs wird der aktuelle Puffer als Batch erfasst und durch ein neues, leeres Array ersetzt. Während der Flush auf die InfluxDB-Antwort wartet, schreibt ein paralleler Collect-Vorgang bereits in den neuen (leeren) Puffer. Der Batch wird während des Flush-Vorgangs nicht verändert.
4. **Fehlerbehebung** – falls das Leeren fehlschlägt, wird der Batch in chronologischer Reihenfolge wieder an den aktuellen Puffer angehängt. Es gehen keine Werte verloren.
5. **Überlappungsschutz** -- ein`isFlushing` Das Flag verhindert, dass mehrere Flush-Operationen gleichzeitig ausgeführt werden.

### NaN-Schutz

Ungültige Werte (`NaN` für int/float,`null` /`undefined` (für Zeichenketten) werden automatisch mit einer Protokollwarnung übersprungen.

### Negative Werte

SOLECTRUS akzeptiert keine negativen Werte. Liefert ein Sensor nach dem Start des Adapters einen negativen Wert, wird **einmalig** eine Warnung protokolliert. Die Werte werden zwar weiterhin an InfluxDB gesendet, können dort aber zu fehlerhaften Auswertungen führen. Um dies zu beheben, überprüfen Sie Ihre Quellzustände oder verwenden Sie die Data-SOLECTRUS-Formel-Engine mit der Option **„Negative Werte auf 0 begrenzen“** .

### Geräte-Automatikerkennung

Wenn in der Admin-Benutzeroberfläche ein Quellstatus ausgewählt wird (über den **Auswahldialog** oder durch Eingabe der Status-ID und anschließendes Verlassen des Feldes), liest die Admin-Benutzeroberfläche die`common.unit` Die Eigenschaft des ioBroker-Objekts füllt das Feld **„Unit“** aus. Wenn für den Zustand keine Einheit definiert ist, bleibt das Feld leer.`W` wird als Standardanzeige im Übersichtsreiter verwendet. Die Einheit kann im **Expertenmodus** jederzeit manuell geändert werden.

### Validierung des Maximalwerts

Jeder numerische Sensor (`int` ,`float` (oder Standardtyp) unterstützt ein Feld **für Maximalwerte** (konfigurierbar im Expertenmodus). Wenn ein erfasster Wert diesen Grenzwert überschreitet:

1. Es wird eine Warnung protokolliert:`Sensor "..." delivers implausible value (X > max Y). Using last valid value (Z) instead.`
2. Stattdessen wird der **letzte gültige Wert** (der aktuellste Wert, der dem Grenzwert entspricht oder darunter liegt) an InfluxDB gesendet.
3. Wenn für diesen Sensor noch kein gültiger Wert erfasst wurde, wird der Datenpunkt vollständig übersprungen.

Dadurch wird verhindert, dass kurzzeitige Sensorspitzen (z. B. ein kurzer Messwert von 99999 W) die Zeitreihendaten verfälschen.

Der Standardwert ist **0 (deaktiviert)** – die Wertüberwachung ist für neue Sensoren standardmäßig deaktiviert. Im Expertenmodus kann für jeden Sensor ein individueller Grenzwert festgelegt werden (z. B. 0,5).`15000` oder`5000` (für einen sekundären Wechselrichter). Wenn der Maximalwert auf`0` Die Wertüberwachung ist für diesen Sensor deaktiviert.

### Feldtypkonflikte

Wenn InfluxDB einen Feldtypkonflikt meldet (z. B. beim Schreiben eines Float-Werts in ein vorhandenes Integer-Feld), wird der betroffene Sensor automatisch deaktiviert und der Puffer geleert.

---

## 3. Registerkarte „Sensorenübersicht“

Die Registerkarte **SOLECTRUS Übersicht** (erreichbar über die Registerkartenleiste im Adapterbereich) bietet einen Echtzeit-Überblick über alle konfigurierten und aktiven Sensoren und Datenelemente.

![Beispiel für eine Sensorübersicht](../../../../../en/adapterref/iobroker.solectrus-influxdb/docs/img/sensor-overview.svg)

### Merkmale

- **Farblegende** (Symbolleiste, oben rechts neben dem Titel): zeigt die Bedeutung der Kartenfarben auf einen Blick – **grün** = aktiver Sensor, **gelb** = interner Sensor, **orange** = Zeitüberschreitung, **rot** = Maximalwert überschritten.
- Die Schaltfläche in der Registerkartenleiste ist allgemein mit **„Sensoren“** beschriftet; der Inhalt darunter ist in zwei Abschnitte unterteilt, jeder mit einer eigenen Überschrift: **InfluxDB-Sensoren** (blaues Diamantsymbol, Sensoren, die tatsächlich in InfluxDB geschrieben werden) und **Interne Sensoren** (🔒, wird nur angezeigt, wenn mindestens einer vorhanden ist).
- **InfluxDB-Sensoren-Grid** : Zeigt alle aktivierten Sensoren, deren Daten tatsächlich in InfluxDB geschrieben werden, als kompakte Karten in einem responsiven Grid an. Jede Karte zeigt Folgendes an:
  - **Sensorname** und **Datentyp-Abzeichen** (`int` ,`float` ,`bool` ,`string` ,`json` )
  - **Wertzeile** (nur numerische Sensoren): linksbündiger **aktueller Wert mit Einheit** (z. B. 1).`2697 W` Rechtsbündiges **Badge für den Maximalwert** – wird nur angezeigt, wenn der Maximalwert > 0 ist (Wertüberwachung aktiv). Zeigt _„n/a“_ an, wenn noch kein Wert empfangen wurde. JSON-Werte werden kompakt in einer nichtproportionalen Schriftart dargestellt. Sobald das konfigurierte Timeout überschritten ist, wird der aktuelle Wert **orange** angezeigt; wird auch der Maximalwert überschritten, hat **Rot** Vorrang vor Orange.
  - **Messung: Feld** — der Zielort in InfluxDB (durch einen Doppelpunkt getrennt)
  - **Quellstatus** – die gelesene ioBroker-Status-ID (gekürzt, vollständiger Pfad wird beim Überfahren mit der Maus angezeigt)
  - **Zeitstempelzeile** (angezeigt bei konfiguriertem Timeout): linksbündig ausgerichteter **Zeitstempel** (Datum und Uhrzeit des letzten vom Sensor empfangenen neuen Werts); rechtsbündig ausgerichtete **nächste erwartete Aktualisierung** als Badge (nur Zeit, keine Beschriftung, automatisch berechnet aus Zeitstempel + Timeout-Intervall – keine manuelle Eingabe erforderlich). Ist der aktuelle Wert 0, wird für die Berechnung der nächsten Aktualisierung das 60-Minuten-Fallback-Intervall verwendet. Die Zeile wird **orange** dargestellt, wenn das Timeout überschritten wurde.
- **Interne Sensoren** (nur angezeigt, wenn mindestens ein Sensor die Option **„Intern“** aktiviert hat): Ein separater Bereich unterhalb der InfluxDB-Sensorenübersicht mit demselben Kartenlayout, jedoch mit **gelbem linken Rand** und **gelbem aktuellen Wert** . Da diese Sensoren nicht in InfluxDB geschrieben werden, sind sie hier klar von den regulären (grünen) Sensoren getrennt.
- **Formel-Engine-Raster** (nur angezeigt, wenn Data-SOLECTRUS aktiviert ist): Zeigt alle aktiven berechneten Elemente im selben Kartenlayout mit Modus-Symbol, aktuellem Wert, Status-ID und Formel/Ausdruck an. Die Schriftgrößen bleiben in allen Bildschirmausrichtungen konstant. Numerische Werte werden mit **Einheit** angezeigt (z. B. 1000).`2697 W` ) — die für das Element konfigurierte Einheit, standardmäßig auf`W` Wenn kein Wert festgelegt ist, werden boolesche und Zeichenketten-Ergebnisse ohne Einheit angezeigt. Da Data-SOLECTRUS-Elemente niemals direkt in InfluxDB geschrieben werden (nur Sensoren), werden diese Karten immer wie **interne Sensoren** formatiert, mit **gelbem Rahmen** und **gelbem Wert** .
- **JSON-Array-Vorschau** : Für Sensoren mit dem Datentyp`json` Der Wert zeigt den **ersten Eintrag des Arrays** gefolgt von der Anzahl der weiteren Einträge an (z. B.`{"t":1710000000000,"y":1250} (+543 more entries)` ).
- **Automatische Aktualisierung** : Der Tab wird alle 5 Sekunden automatisch aktualisiert.
- **Layout-Umschaltung** : Die Schaltfläche **„Volle Breite** / **Flexibel“** in der Symbolleiste schaltet beide Raster zwischen einem flexiblen mehrspaltigen Layout und einem einspaltigen Layout in voller Breite um. Die Auswahl wird im Browser gespeichert und beim nächsten Besuch wiederhergestellt.

### Navigation

Klicken Sie auf **„Konfiguration öffnen“** (oben rechts), um direkt zur Instanzkonfigurationsseite dieses Adapters zu gelangen.

---

## 4. Prognosequellen

Vorhersage- und Wetterdaten von pvforecast oder ähnlichen Adaptern können mithilfe von **JSON-Sensoren** auf der Registerkarte „Sensoren“ in InfluxDB geschrieben werden. Stellen Sie einfach den Datentyp auf **„JSON-Array“** ein und verwenden Sie die Voreinstellung **„Automatisch“** .

### So funktioniert es

1. Der Adapter abonniert einen oder mehrere JSON-Zustände (z. B.`pvforecast.0.summary.JSONData` )
2. Wenn sich der JSON-Zustand ändert, analysiert der Adapter das JSON-Array.
3. Im **Automatikmodus** durchsucht der Adapter jeden Eintrag nach Feldern mit bekannten Werten (`y` ,`clearsky` ,`temp` )
4. Für jedes erkannte Feld wird ein Datenpunkt mit der korrekten Messung, dem Feld und dem Typ in InfluxDB geschrieben.
5. Da InfluxDB Datenpunkte mit denselben Messwerten, Tags und Zeitstempeln überschreibt, **werden bestehende Prognosepunkte automatisch aktualisiert,** wenn sich die Quelldaten ändern.

### JSON-Format

Der Quellzustand muss ein JSON-Array von Objekten enthalten. Jedes Objekt muss ein Zeitstempelfeld haben (`t` ) und ein oder mehrere Wertfelder:

```json
[
  { "t": 1709035200000, "y": 1500, "clearsky": 2000, "temp": 12.5 },
  { "t": 1709038800000, "y": 2200, "clearsky": 2800, "temp": 14.0 }
]
```

### Standard-Vorhersagesensoren

Der Adapter wird mit drei vorkonfigurierten Wettervorhersagesensoren geliefert:

| Sensor                               | Messung                      | Feld          | Typ      | JSON-Feld  |
| ------------------------------------ | ---------------------------- | ------------- | -------- | ---------- |
| Wechselrichter-Leistungsprognose     | `inverter_forecast`          | `power`       | int      | `y`        |
| INVERTER\_POWER\_FEARDASTE\_CLEARSKY | `inverter_forecast_clearsky` | `power`       | int      | `clearsky` |
| TEMPERATURVORHERSAGE IM FREIEN       | `outdoor_forecast`           | `temperature` | schweben | `temp`     |

Im **Automatikmodus** erkennt ein einzelner JSON-Sensor alle vorhandenen Felder und schreibt sie automatisch. Sie müssen lediglich einen Sensor aktivieren und ihn auf den JSON-Quellzustand verweisen.

### Zeitstempelverarbeitung

- **Millisekunden** (Zahl >= 10^12): Direkt verwendet
- **Sekunden** (Zahl < 10^12): Automatisch in Millisekunden umgerechnet
- **ISO-Zeichenkette** : Geparst über`Date` Konstruktor

---

## 5. Anleitung: pvForecast mit pvnode

In diesem Abschnitt wird erklärt, wie der **pvforecast-** Adapter mit SOLECTRUS InfluxDB für Vorhersagedaten verbunden wird.

### Voraussetzungen

- ioBroker mit installiertem pvforecast-Adapter
- Der SOLECTRUS InfluxDB-Adapter ist installiert und mit InfluxDB verbunden.

### Schritt 1: Wählen Sie Ihr pvforecast-Backend aus

Der pvforecast-Adapter unterstützt zwei Backends:

| Backend                | Verfügbare Felder            | Beschreibung                                                                               |
| ---------------------- | ---------------------------- | ------------------------------------------------------------------------------------------ |
| **Standard**           | `y` (Vorhergesagte Leistung) | Nur grundlegende PV-Leistungsprognose                                                      |
| **pvnode: bei V6.0.0** | `y` ,`clearsky` ,`temp`      | Vollständige Vorhersage mit Angaben zu Sonneneinstrahlung und Temperatur bei klarem Himmel |

> **Wichtig:** Die Felder`clearsky` (watt\_clearsky) und`temp` sind **nur mit pvnode als Backend verfügbar** . Das Standard-Backend pvforecast bietet nur die`y` (Prognoseleistung) Feld.

### Schritt 2: pvforecast konfigurieren

1. Installieren Sie den pvforecast-Adapter in ioBroker.
2. Konfigurieren Sie die Parameter Ihrer PV-Anlage (Standort, Module, Ausrichtung usw.).
3. Wenn Sie Clearsky- und Temperaturdaten benötigen, konfigurieren Sie **pvnode** als Backend.
4. Überprüfen Sie, ob`pvforecast.0.summary.JSONData` enthält ein JSON-Array mit Prognosedaten

### Schritt 3: Aktivieren Sie den JSON-Sensor in SOLECTRUS InfluxDB

1. Öffnen Sie die Einstellungen des SOLECTRUS InfluxDB-Adapters.
2. Wechseln Sie zur Registerkarte **„Sensoren“** .
3. Suchen Sie den Sensor **INVERTER\_POWER\_FORECAST** (oder einen beliebigen Prognosesensor).
4. Setzen Sie den **ioBroker-Quellstatus** auf`pvforecast.0.summary.JSONData`
5. Sensor aktivieren (Kontrollkästchen)
6. Konfiguration speichern

Der Adapter erkennt automatisch alle verfügbaren Felder in den JSON-Daten und schreibt sie in InfluxDB:

- `y` ->`inverter_forecast.power` (immer verfügbar)
- `clearsky` ->`inverter_forecast_clearsky.power` (nur pvnode)
- `temp` ->`outdoor_forecast.temperature` (nur pvnode)

### Schritt 4: In InfluxDB überprüfen

Überprüfen Sie nach dem nächsten pvforecast-Update Ihren InfluxDB-Bucket auf die Messwerte.`inverter_forecast` ,`inverter_forecast_clearsky` (nur pvnode), und`outdoor_forecast` (nur pvnode). Sie sollten das Feld sehen.`power` in den ersten beiden und`temperature` im dritten.

### Fehlerbehebung

- **Es wurden keine Daten geschrieben** : Stellen Sie sicher, dass der Sensor aktiviert ist und der Quellstatus ein gültiges JSON-Array enthält.
- **Nur`inverter_forecast` Messung** : Ihr pvforecast-Backend ist nicht pvnode. Wechseln Sie zu pvnode, um die zusätzlichen Funktionen zu nutzen.`clearsky` Und`temp` Felder
- **Falsche Zeitstempel** : Prüfen Sie, ob die JSON-Daten Unix-Zeitstempel (Sekunden oder Millisekunden) oder ISO-Zeichenketten verwenden.

---

## 6. Data-SOLECTRUS Formel-Engine

Die Formel-Engine ist eine optionale Funktion, mit der Sie abgeleitete Werte aus beliebigen ioBroker-Zuständen berechnen können. Aktivieren Sie sie, indem Sie auf der Registerkarte „InfluxDB“ **die Option „Data-SOLECTRUS (Formel-Engine) aktivieren“** auswählen.

Wenn diese Option aktiviert ist, erscheinen zwei zusätzliche Registerkarten:

- **Datenwerte** -- Berechnete Elemente konfigurieren
- **Datenlaufzeit** – Globale Abfrage- und Snapshot-Einstellungen

### Konzepte

- **Elemente** sind die Bausteine. Jedes Element liest einen oder mehrere ioBroker-Zustände und erzeugt einen Ausgabezustand unter`solectrus-influxdb.X.ds.*`
- Elemente können in drei Modi betrieben werden: **Quelle** , **Formel** oder **Zustandsautomat.**
- Zur besseren Übersicht können Elemente in **Ordnern/Gruppen** organisiert werden.
- Die berechneten Werte können als Sensordaten für den InfluxDB-Speicher verwendet werden.
- Jeder Artikel verfügt über ein optionales **Einheitenfeld** (Platzhalter).`W` Wenn keine Einheit festgelegt ist, werden numerische Elemente im Formel-Engine-Raster auf der Registerkarte **„SOLECTRUS-Übersicht“** (siehe Abschnitt 3) standardmäßig auf die Einheit „Einheit“ gesetzt.`W` — Dasselbe gilt für die InfluxDB-Sensoren. Boolesche und Zeichenketten-Elemente werden niemals mit einer Einheit angezeigt.

---

## 7. Artikelmodi

### Quellmodus

Spiegelt einen einzelnen ioBroker-Status wider. Optional kann ein Wert aus einer JSON-Nutzlast mithilfe von JSONPath extrahiert werden.

| Einstellung                     | Beschreibung                                                |
| ------------------------------- | ----------------------------------------------------------- |
| ioBroker Quellstatus            | Der Staat soll spiegeln                                     |
| JSONPath (optional)             | Extrahieren Sie einen verschachtelten Wert, z. B.`$.apower` |
| Datentyp                        | `number` (Standard),`boolean` ,`string` , oder`mixed`       |
| Klemme den negativen Wert auf 0 | Negative Ausgabewerte durch 0 ersetzen                      |

### Formelmodus

Berechnet einen Wert aus mehreren benannten Eingaben mithilfe eines mathematischen Ausdrucks.

| Einstellung            | Beschreibung                                                                   |
| ---------------------- | ------------------------------------------------------------------------------ |
| Eingaben               | Benannte Variablen, die jeweils mit einem ioBroker-Quellzustand verknüpft sind |
| Formelausdruck         | Mathematischer Ausdruck unter Verwendung von Eingabevariablennamen             |
| Datentyp               | Ausgabetyp                                                                     |
| Klemmung / Min. / Max. | Optionale Ausgangsklemmung                                                     |

**Eingabekonfiguration:**

| Feld                       | Beschreibung                                                     |
| -------------------------- | ---------------------------------------------------------------- |
| Schlüssel                  | Variablenname, der in der Formel verwendet wird (z. B.`pv1` )    |
| ioBroker Quellstatus       | Staat, aus dem der Wert gelesen werden soll                      |
| JSONPath (optional)        | Auszug aus der JSON-Nutzlast                                     |
| Klemmeingang negativ auf 0 | Diese spezifische Eingabe wird vor der Formelauswertung fixiert. |

**Beispielformel:**`pv1 + pv2 + pv3`

### Verfügbare Funktionen

| Funktion               | Beschreibung                  | Beispiel                   |
| ---------------------- | ----------------------------- | -------------------------- |
| `min(a, b)`            | Der kleinere der beiden Werte | `min(5, 10)` = 5           |
| `max(a, b)`            | Der größere der beiden Werte  | `max(0, value)`            |
| `clamp(v, min, max)`   | Klemme zwischen den Grenzen   | `clamp(v, 0, 100)`         |
| `IF(cond, then, else)` | Konditional                   | `IF(soc > 80, surplus, 0)` |
| `abs(v)`               | Absolutwert                   | `abs(-5)` = 5              |
| `round(v)`             | Auf ganze Zahl runden         | `round(3.7)` = 4           |
| `floor(v)` /`ceil(v)`  | Abrunden / Aufrunden          | `floor(3.7)` = 3           |
| `pow(base, exp)`       | Leistung                      | `pow(2, 3)` = 8            |

### Zustandsfunktionen (fortgeschritten)

Diese Funktionen lesen ioBroker-Zustände direkt in einer Formel, ohne benannte Eingaben zu definieren:

| Funktion             | Beschreibung                                                      | Beispiel                          |
| -------------------- | ----------------------------------------------------------------- | --------------------------------- |
| `s("id")`            | Lesen Sie den Status als sichere Zahl (0, falls nicht verfügbar). | `s("hm-rpc.0.power") + 100`       |
| `v("id")`            | Zustand als Rohwert (Zeichenkette/Zahl/Boolescher Wert) lesen     | `v("mqtt.0.status")`              |
| `jp("id", "$.path")` | Wert aus dem JSON-Zustand über JSONPath extrahieren               | `jp("shelly.0.json", "$.apower")` |

### Unterstützte Betreiber

`+`,`-` ,`*` ,`/` ,`%` ,`()` ,`&&` ,`||` ,`!` ,`==` ,`!=` ,`>=` ,`<=` ,`>` ,`<` ,`? :`

---

## 8. Formelgenerator

Klicken Sie neben dem Formeleingabefeld auf **„Builder…“** , um den visuellen Formel-Builder zu öffnen.

Der Bauträger bietet:

- **Variablen (Eingaben)** -- Klicken Sie hier, um Ihre benannten Eingabevariablen einzufügen.
- **Operatoren** – Klicken Sie hier, um Operatoren mit Tooltips einzufügen, die jeden einzelnen erklären.
- **Funktionen** -- Funktionsvorlagen einfügen (`min` ,`max` ,`clamp` ,`IF` )
- **Zustandsfunktionen** -- Einfügen`s()` ,`v()` , oder`jp()` mit einem Zustandsauswahldialog
- **Beispiele** -- Gängige Formelmuster (Barwertsumme, Überschuss, Prozentsatz, Klemmen, Bedingungen)
- **Live-Vorschau** – Das Formelergebnis in Echtzeit anzeigen (erfordert, dass der Adapter ausgeführt wird)

Die Formel kann jederzeit als Klartext bearbeitet werden. Der Editor fügt Bausteine nur an der Cursorposition ein.

---

## 9. Zustandsautomatenmodus

Der Zustandsautomatenmodus erzeugt Zeichenketten- oder boolesche Zustände basierend auf Regeln. Die Regeln werden von oben nach unten ausgewertet; die **erste übereinstimmende Regel gewinnt** .

Dies ist nützlich für:

- Übersetzung numerischer Statuscodes in lesbare Etiketten
- Bestimmung der Betriebsmodi anhand mehrerer Sensorwerte
- Erstellen von booleschen Flags aus komplexen Bedingungen

### Konfiguration

| Einstellung | Beschreibung                                  |
| ----------- | --------------------------------------------- |
| Eingaben    | Benannte Variablen (gleich dem Formelmodus)   |
| Datentyp    | `string` oder`boolean`                        |
| Regeln      | Geordnete Liste von Bedingungs-/Ausgabepaaren |

### Regeln

Jede Regel enthält:

| Feld        | Beschreibung                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| Zustand     | Ein Formelausdruck, der zu wahr/falsch ausgewertet wird. Verwenden Sie Eingabevariablennamen und Operatoren. |
| Ausgabewert | Die Zeichenkette oder der boolesche Wert, der ausgegeben werden soll, wenn die Bedingung erfüllt ist.        |

**Besondere Bedingungen:**

- `true` oder leer = Standard-/Ausweichregel (trifft immer zu)
- Eingabevariablen und Operatoren verwenden:`soc < 10` ,`battery > 80 && surplus > 0`

### Beispiel

Für ein Element mit Eingaben`soc` (Batterie-SOC) und`surplus` (PV-Überschuss):

| Zustand                      | Ausgabewert     |
| ---------------------------- | --------------- |
| `soc < 10`                   | `Battery-Empty` |
| `soc < 30`                   | `Battery-Low`   |
| `surplus > 1000 && soc > 80` | `Full-Export`   |
| `true`                       | `Normal`        |

Ergebnis: Der Ausgabestatus enthält`Battery-Empty` ,`Battery-Low` ,`Full-Export` , oder`Normal` abhängig von den aktuellen Werten.

---

## 10. Datenlaufzeiteinstellungen

Auf der Registerkarte **„Datenlaufzeit“** :

| Einstellung                                    | Beschreibung                                                        | Standard |
| ---------------------------------------------- | ------------------------------------------------------------------- | -------- |
| Abfrageintervall (Sekunden)                    | Wie oft berechnete Elemente neu bewertet werden                     | 5        |
| Eingaben bei jedem Takt lesen (Momentaufnahme) | Lesen Sie alle Eingabezustände bei jedem Auswertungszyklus neu ein. | aus      |
| Momentaufnahmeverzögerung (ms)                 | Wartezeit nach dem Einlesen des Snapshots vor der Auswertung        | 0        |

---

## 11. Überwachung & Puffer

### Lebendüberwachung

Der Adapter überwacht automatisch, ob die Sensorwerte noch regelmäßig aktualisiert werden. Das Feld **„Alive Timeout (min, 0 = deaktiviert)“** kann im **Expertenmodus** für jeden Sensor einzeln konfiguriert werden (Standard: 60 Minuten). Wenn das Timeout auf 0 eingestellt ist, …`0` Die Überwachung des aktiven Zustands ist für diesen Sensor vollständig deaktiviert – die Zeitstempelzeile ist in der Sensorübersicht ausgeblendet.

Wenn ein Sensor über den konfigurierten Timeout hinaus keinen neuen Wert empfangen hat, protokolliert der Adapter eine Warnung:

```
Sensor "INVERTER_POWER": no update since 4/5/2026, 6:30:00 PM (longer than 60 minute(s))
```

Darüber hinaus wird der letzte Zeitstempel des betroffenen Sensors in der **Registerkartenansicht** **orange** angezeigt, sodass Sie veraltete Sensoren auf einen Blick erkennen können, ohne das Protokoll öffnen zu müssen.

Um eine Überlastung der Protokolle zu vermeiden, wird die Warnung maximal einmal pro Sensor und Timeout-Periode wiederholt. Stellen Sie das Timeout auf ein.`0` Um die Prüfung für einen einzelnen Sensor zu deaktivieren (nur im Expertenmodus). Neu erstellte Sensoren haben standardmäßig ein Timeout von`60` Minuten. Das Timeout muss größer sein als das Aktualisierungsintervall des jeweiligen Quelladapters.

### Wertüberwachung (Maximalwert)

Die Wertüberwachung ist **standardmäßig deaktiviert** (Maximalwert = 0). Im **Expertenmodus** kann für jeden numerischen Sensor ein individueller Maximalwert festgelegt werden. Die Einheit wird zusammen mit dem Maximalwertsymbol in der Sensorübersicht angezeigt (standardmäßig 0).`W` Wenn keine Einheit konfiguriert ist. Ist der Maximalwert größer als 0, wird er in der Sensorübersicht als Symbol neben dem aktuellen Wert angezeigt. Ist die Wertüberwachung deaktiviert (Maximalwert = 0), wird das Symbol ausgeblendet.

### Adapterzustände

| Zustand              | Beschreibung                                  |
| -------------------- | --------------------------------------------- |
| `info.connection`    | `true` wenn InfluxDB erreichbar ist           |
| `info.buffer.size`   | Anzahl der gepufferten Datenpunkte            |
| `info.buffer.oldest` | Zeitstempel des ältesten gepufferten Punktes  |
| `info.buffer.clear`  | Schaltfläche zum manuellen Leeren des Puffers |
| `info.lastError`     | Letzte kritische Fehlermeldung                |

### Data-SOLECTRUS-Zustände (wenn aktiviert)

Die berechneten Werte werden unter`solectrus-influxdb.X.ds.*` mit diagnostischen Zuständen pro Artikel.

### Pufferverhalten

- Die Werte werden dauerhaft auf der Festplatte zwischengespeichert (`buffer.json` )
- Maximale Puffergröße: 100.000 Punkte
- Das Leeren der Datenbank erfolgt nur, wenn eine **aktive InfluxDB-Verbindung** bestätigt wird (`ensureInflux()` (prüft vor jedem Spülvorgang)
- Bei einem Ausfall von InfluxDB erhöhen sich die Wiederholungsintervalle exponentiell (bis zu 5 Minuten).
- Nach der Wiederverbindung werden alle zwischengespeicherten Punkte gelöscht.
- Beim Flush wird der Puffer nie verändert (Snapshot-and-Swap-Muster).
- Bei einem Fehler beim Leeren des Puffers werden die Daten automatisch im Puffer wiederhergestellt.

---

## 12. Verwendung berechneter Werte als Sensordatenquellen

Sie können die von Data-SOLECTRUS berechneten Werte als Eingabe für Sensoren verwenden, um sie in InfluxDB zu schreiben:

1. Erstellen Sie ein berechnetes Element (Quelle, Formel oder Zustandsautomat) auf der Registerkarte **„Datenwerte“.**
2. Fügen Sie auf der Registerkarte **„Sensoren“** einen neuen Sensor hinzu.
3. Wählen Sie als **ioBroker-Quellstatus** den berechneten Wertstatus aus:`solectrus-influxdb.X.ds.<outputId>`
4. Konfigurieren Sie Messung, Feld und Datentyp wie gewohnt.

Der Adapter handhabt die Initialisierungsreihenfolge automatisch – Sensorabonnements für`ds.*` Die Zustände funktionieren auch dann, wenn die Formel-Engine erst nach der Sensoreinrichtung startet.

---

## 13. Fehlersuche

Stellen Sie den Protokollierungsgrad des Adapters auf **„Debug“** ein, um detaillierte Ausgaben zu erhalten, einschließlich:

- Sensorwerterfassung
- InfluxDB-Schreibvorgänge
- Details zur Formelauswertung
- Regelabgleich der Zustandsmaschine
- Pufferoperationen

---

## 14. Benachrichtigungen

Der Adapter kann bei wichtigen Ereignissen über konfigurierbare Benachrichtigungsanbieter Nachrichten senden.

### Aktivierung

Der **Benachrichtigungs-** Tab ist standardmäßig ausgeblendet. Aktivieren Sie das Kontrollkästchen **„Benachrichtigungen aktivieren“** auf dem **InfluxDB-** Tab, um ihn anzuzeigen und die Funktion zu aktivieren.

1. Wählen Sie die gewünschten Triggerereignisse aus.
2. Konfigurieren Sie mindestens einen Benachrichtigungsanbieter.

### Auslöser

| Ereignis                                                    | Beschreibung                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **InfluxDB-Verbindungsfehler / Wiederherstellung**          | **❗** Wird beim ersten Verbindungsabbruch gesendet und **✅** erneut, wenn die Verbindung wiederhergestellt ist.                                                                                                                                                                                                                |
| **Sensor aktiv Zeitüberschreitung**                         | **⚠️** Wird gesendet, wenn ein Sensor innerhalb des konfigurierten Timeouts keine Aktualisierung liefert (nur für Werte ungleich Null)                                                                                                                                                                                         |
| **Maximalwert überschritten** (`notifyOnMaxValueExceeded` ) | **⚠️** Wird gesendet, wenn ein Sensorwert den konfigurierten Maximalwert überschreitet; maximal einmal pro Stunde und Sensor.                                                                                                                                                                                                  |
| **JSON-Feld fehlt** (`notifyOnJsonFieldMissing` )           | **⚠️** Wird einmal pro Sitzung gesendet, wenn ein bekanntes JSON-Feld (`y` ,`clearsky` ,`temp` ) fehlt vollständig in den Quelldaten – dies bedeutet, dass das Backend dieses Feld nicht bereitstellt (z. B.`clearsky` /`temp` (pvnode erforderlich). Die Benachrichtigung wird zurückgesetzt, wenn das Feld wieder erscheint. |

### Unterstützte Anbieter

| Anbieter          | Erfordernis                                                           |
| ----------------- | --------------------------------------------------------------------- |
| **Telegramm**     | ioBroker Telegram-Adapter installiert und konfiguriert                |
| **Leichtgläubig** | ioBroker Pushover-Adapter installiert und konfiguriert                |
| **WhatsApp**      | Der ioBroker WhatsApp-CMB-Adapter wurde installiert und konfiguriert. |
| **E-Mail**        | ioBroker-E-Mail-Adapter installiert und konfiguriert                  |
| **Signal**        | ioBroker signal-cmb-Adapter installiert und konfiguriert              |
| **Matrix**        | ioBroker Matrix-Org-Adapter installiert und konfiguriert              |
| **Synology-Chat** | ioBroker Synochat-Adapter installiert und konfiguriert                |

Es können mehrere Provider gleichzeitig konfiguriert werden. Vor dem Senden prüft der Adapter, ob die jeweilige Adapterinstanz aktiv ist, und protokolliert eine Warnung, falls die Instanz nicht ausgeführt wird.

### Instanzauswahl

Jeder Anbieter verfügt über eine Dropdown-Liste **mit Instanzen** . Verfügbare Adapterinstanzen werden automatisch ausgelesen und zur Auswahl angeboten. Dadurch lässt sich eine bestimmte Instanz einfach auswählen, wenn mehrere Instanzen desselben Adapters ausgeführt werden.

### Anmerkungen

- Benachrichtigungen werden lokalisiert über`getNotificationMessage()` unter Verwendung der konfigurierten`systemLanguage` Die
- Bei Verbindungsfehlern mit InfluxDB wird beim **ersten** Fehler eine Benachrichtigung gesendet, die sich danach wiederholen kann.`notifyRepeatMinutes` solange die Verbindung unterbrochen ist.
- Sensor-Timeout-Benachrichtigungen werden gesendet, wenn die konfigurierte Aktivierungs-Timeout-Bedingung erfüllt ist (Expertenmodus) und werden gedrosselt von`notifyRepeatMinutes` Die

## 15. Datensicherung

### Integrierter Backup-Tab

Über die Registerkarte **„Backup“** in der Adapterkonfiguration können Sie Backups dieser Instanz direkt erstellen, hochladen, wiederherstellen, herunterladen und löschen – es muss kein weiterer Adapter installiert werden. Ein Backup enthält:

- Allgemeine Konfiguration (Verbindungseinstellungen)
- Sensorkonfiguration, intern/extern, aktiviert/deaktiviert
- Data-SOLECTRUS-Elemente (Berechnungen/Formeln) und ihre Ordner
- Alle von dieser Instanz erstellten Objektordner/Kanäle/Zustände

Backups werden lokal auf diesem ioBroker-Host gespeichert. Standardmäßig befinden sie sich im Datenverzeichnis dieser Instanz. Sie können jedoch über das Feld „Backup-Verzeichnis“ einen benutzerdefinierten Speicherort auswählen (z. B. eine andere Festplatte oder eine eingebundene Netzwerkfreigabe). Mit dem Feld „Letzte N Backups behalten“ legen Sie fest, wie viele der aktuellsten Backups automatisch gespeichert werden. Ältere Backups werden gelöscht, sobald ein neues Backup erstellt wird. Durch das Wiederherstellen eines Backups wird die Instanz automatisch neu gestartet, sodass die wiederhergestellte Konfiguration wirksam wird.

> **Hinweis:** Das InfluxDB-Token ist eine geschützte/verschlüsselte Einstellung und wird niemals in diese Backups aufgenommen. Nach einer Wiederherstellung muss es manuell im **InfluxDB** -Tab erneut eingegeben werden.

> **Hinweis:** Der Konfigurationsdialog für Administratoren übernimmt die wiederhergestellten Einstellungen nicht automatisch, solange er geöffnet ist (es werden nur die beim Öffnen geladenen Einstellungen angezeigt). Schließen Sie nach einer Wiederherstellung den Adapterkonfigurationsdialog und öffnen Sie ihn erneut, um die wiederhergestellten Werte zu sehen.