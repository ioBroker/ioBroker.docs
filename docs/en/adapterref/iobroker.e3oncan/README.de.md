---
chapters: {"pages":{"en/adapterref/iobroker.e3oncan/README.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.md"},"en/adapterref/iobroker.e3oncan/lib/data-points.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/lib/data-points.md"},"en/adapterref/iobroker.e3oncan/README.de.md":{"title":{"en":"ioBroker.e3oncan"},"content":"en/adapterref/iobroker.e3oncan/README.de.md"}}}
---
![Logo](admin/e3oncan_small.png)
# ioBroker.e3oncan

[![NPM version](https://img.shields.io/npm/v/iobroker.e3oncan.svg)](https://www.npmjs.com/package/iobroker.e3oncan)
[![Downloads](https://img.shields.io/npm/dm/iobroker.e3oncan.svg)](https://www.npmjs.com/package/iobroker.e3oncan)
![Number of Installations](https://iobroker.live/badges/e3oncan-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/e3oncan-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.e3oncan.png?downloads=true)](https://nodei.co/npm/iobroker.e3oncan/)

**Tests:** ![Test and Release](https://github.com/MyHomeMyData/ioBroker.e3oncan/workflows/Test%20and%20Release/badge.svg)

## e3oncan Adapter für ioBroker

> **Hinweis:** Die Navigationslinks in diesem Dokument funktionieren am besten in der [GitHub-Ansicht](/#/docs/adapterref/iobroker.e3oncan/README.de.md). Relative Links zu anderen Dokumenten (z.B. [data-points.md](/#/docs/adapterref/iobroker.e3oncan/lib/data-points.md)) öffnen ebenfalls auf GitHub.

> Dieses Dokument ist die deutsche Version der Dokumentation. [English version: README.md](/#/adapters/e3oncan)

## Inhaltsverzeichnis

- [Übersicht](#übersicht)
- [Was ist neu in v1.1.0](#was-ist-neu-in-v110)
- [Was ist neu in v1.0.3](#was-ist-neu-in-v103)
- [Was ist neu in v1.0.0](#was-ist-neu-in-v100)
- [Schnellstart](#schnellstart)
- [Konfigurationsanleitung](#konfigurationsanleitung)
  - [Schritt 1 – CAN-Adapter](#schritt-1--can-adapter)
  - [Schritt 2 – Gerätescan und Energiezähler-Erkennung](#schritt-2--gerätescan-und-energiezähler-erkennung)
  - [Schritt 3 – Datenpunktscan](#schritt-3--datenpunktscan)
  - [Schritt 4 – Zuweisungen und Zeitpläne](#schritt-4--zuweisungen-und-zeitpläne)
- [Bus-Topologie-Analyse](#bus-topologie-analyse)
- [e3oncan Datenpunkte-Seite](#e3oncan-datenpunkte-seite)
- [Datenpunkte lesen](#datenpunkte-lesen)
- [Datenpunkte schreiben](#datenpunkte-schreiben)
- [Datenpunkte und Metadaten](#datenpunkte-und-metadaten)
- [Energiezähler](#energiezähler)
  - [E380 – Daten und Einheiten](#e380--daten-und-einheiten)
  - [E3100CB – Daten und Einheiten](#e3100cb--daten-und-einheiten)
- [FAQ und Einschränkungen](#faq-und-einschränkungen)
- [Spenden](#spenden)
- [Changelog](#changelog)

---

## Übersicht

Viessmann-Geräte der E3-Serie (One Base Ökosystem) tauschen über den CAN-Bus eine große Datenmenge aus. Dieser Adapter klinkt sich in diese Kommunikation ein und stellt die Daten in ioBroker zur Verfügung.

Zwei Betriebsmodi arbeiten unabhängig voneinander und können kombiniert werden:

| Modus | Beschreibung |
|---|---|
| **Collect** | Hört passiv auf dem CAN-Bus zu und extrahiert Daten in Echtzeit, während die Geräte sie austauschen. Es werden keine Anfragen gesendet. Ideal für sich schnell ändernde Werte wie Energiefluss. |
| **UDSonCAN** | Liest und schreibt Datenpunkte aktiv über das UDS-Protokoll (Universal Diagnostic Services over CAN). Erforderlich für Sollwerte, Zeitprogramme und Daten, die nicht spontan gesendet werden. |

Welche Modi verfügbar sind, hängt von der Gerätekonfiguration ab. Weitere Details in der [Diskussion zur Gerätetopologie](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/34). Anwendungsbeispiele sind in der [Diskussion zu Anwendungsfällen](https://github.com/MyHomeMyData/ioBroker.e3oncan/discussions/35) zu finden.

> Wichtige Teile dieses Adapters basieren auf dem [open3e](https://github.com/open3e)-Projekt.
> Eine Python-basierte Collect-only-Implementierung mit MQTT ist unter [E3onCAN](https://github.com/MyHomeMyData/E3onCAN) verfügbar.

---

## Was ist neu in v1.1.1

### Aktualisierte Datenpunkt-Definitionen

Die Datenpunktdefinitionen wurden auf Version 20260705 (allgemein) und 20260630 (Varianten) aktualisiert.

### Neuer Codec O3ESwitch

Ein neuer Codec `O3ESwitch` wurde für Datenpunkte ergänzt, deren Struktur von einem gerätespezifischen Diskriminator-Byte abhängt. Das erste Byte wählt die aktive Variante aus einem Satz vordefinierter Codec-Zweige. Damit wird die vollständig strukturierte Dekodierung der ZigBee-Geräteslot-DIDs (2086–2143, 2262) ermöglicht, bei denen die dekodierten Felder je nach Gerätetyp unterschiedlich sind (z. B. Klimasensor, Heizkörperthermostat, Fußbodenheizungsthermostat, Stellantrieb).

### Dezimalrundung für numerische Codecs

Numerische Codecs (`O3EInt8`, `O3EInt16`, `O3EInt32`, `O3EInt64`, `O3EFloat32`) unterstützen jetzt einen optionalen Parameter `decimals`. Ist dieser größer als 0, wird das Dekodierergebnis auf die angegebene Anzahl Nachkommastellen gerundet. Beispielsweise wird `SignalLevel` (Skalierung 2,55, Dezimalstellen 2) damit ohne übermäßig lange Gleitkommazahlen ausgegeben.

### Einheiten und Metadaten werden beim Start nach Strukturänderungen gesetzt

Erkennt der Adapter beim Start, dass sich die Struktur eines Datenpunkts geändert hat (neue Version in `didsE3var.json` oder `didsE3.json`), werden Einheiten und Beschreibungen für alle Unterzustände des neu angelegten Tree-Abschnitts jetzt korrekt gesetzt. Bisher wurden Einheiten nur beim Datenpunktscan gesetzt; nach einer Strukturaktualisierung war ein erneuter Scan erforderlich, um sie zu befüllen.

---

## Was ist neu in v1.0.3

### Kein Rebuild mehr nach einem Node.js-Upgrade

Das native CAN-Modul `socketcan` wurde auf Version 4.2.1 aktualisiert und verwendet jetzt die stabile **N-API**-Schnittstelle. Das Modul muss nach einem Wechsel der Node.js-Version nicht mehr neu kompiliert werden. Ein Upgrade von Node.js (z. B. von 22 auf 24) erfordert keinen `iob rebuild`-Schritt mehr — der Adapter startet ohne weitere Maßnahmen.

### Filter für geplante Datenpunkte in der Datenpunkte-Seite

Ein Klick auf das grüne Badge mit der Anzahl geplanter Datenpunkte auf einer Gerätekarte **filtert die Karte auf die geplanten Datenpunkte**. So lassen sich Zeitpläne für ein bestimmtes Gerät schnell prüfen und anpassen. Ein weiterer Klick auf das Badge oder auf den Kartenkopf stellt die vollständige Ansicht wieder her.

### Schutz benutzerdefinierter Variantendatenpunkt-Definitionen

Benutzerdefinierte Strukturen in `e3oncan.0.<GERÄT>.info.udsDidsSpecific` können jetzt durch das Setzen von `"protected": true` **vor automatischen Updates geschützt** werden. Ein optionales Feld `"reason"` wird in das Log geschrieben, wenn der Schutz greift. Ohne Schutz werden Variantendatenpunkte (die auch in `didsE3var.json` enthalten sind) weiterhin automatisch auf neuere Definitionen aktualisiert. Details stehen in der [Dokumentation](/#/docs/adapterref/iobroker.e3oncan/lib/data-points.md#user-defined-data-point-structures-in-udsdidsspecific).

### Aktualisierte Datenpunkt-Definitionen

Die Datenpunktdefinitionen wurden auf Version 20260528 (allgemein) und 20260527 (Varianten) aktualisiert. Highlights:
- ZigBee-DIDs 2084–2319 vollständig strukturiert (Geräteeigenschaften, aktuelle Werte in 57- und 68-Byte-Varianten)
- Raum-DIDs 1884–1943 strukturiert (Name, Typ, Temperaturregelung, Fenstererkennung, Min/Max-Luftfeuchte)
- Neue ViGuide-basierte DID-Strukturen für Brennstoffzellenmetriken, Energiedeckung und Batterie-/Wechselrichter-Abonnements
- `Unknown*`-Felder verwenden jetzt einheitlich `RawCodec`

---

## Was ist neu in v1.0.0

### Datenpunkte-Seite

Eine neue **e3oncan Datenpunkte**-Seite ist direkt in der Instanzzeile des Adapters in der ioBroker-Instanzansicht verankert. Klicke auf die Schaltfläche <img src="admin/icon_open_tab.svg" height="20"> in der Instanzzeile, um sie zu öffnen. Sie bietet eine dedizierte Oberfläche zum Verwalten von Zeitplänen und Collect-Einstellungen je Gerät und Datenpunkt — ohne dass der vollständige Adapterkonfigurationsdialog geöffnet werden muss.

### Automatische Erkennung von Energiezählern

Energiezähler (E380 und E3100CB) werden jetzt während des Gerätescans **automatisch erkannt**, indem passiv auf beiden CAN-Kanälen gelauscht wird. Die State-Namen werden anhand der erkannten CAN-Adresse und des Kanals automatisch vergeben. Der Aktiv/Inaktiv-Schalter und die Collect-Verzögerung für jeden Energiezähler werden ausschließlich in der Datenpunkte-Seite konfiguriert.

Beim ersten Start nach einem Upgrade von einer früheren Version wird die bisherige Energiezähler-Konfiguration automatisch migriert.

### Automatische Erkennung von Collect-fähigen Geräten

Während des Datenpunktscans lauscht der Adapter passiv auf dem CAN-Bus, um zu erkennen, welche Geräte den Collect-Modus unterstützen. Erkannte Geräte werden mit einem Pin-Symbol im Gerätekarten-Header der Datenpunkte-Seite hervorgehoben.

### Flexibler Datenpunktscan

Eine neue Option **Datenpunktwerte während des Scans im Objektbaum speichern** steuert, ob die aktuellen Werte während des Scans in den Objektbaum geschrieben werden. Wenn diese Option deaktiviert ist, aktualisiert der Adapter Werte und Metadaten für bereits vorhandene Datenpunkt-Objekte, erstellt aber keine neuen — diese werden automatisch angelegt, wenn nach dem Scan erstmals Daten empfangen werden.

### Bus-Topologie-Analyse

Nach dem Datenpunktscan wertet der Adapter automatisch alle während des Scans gesammelten Topologie-Daten aus und erzeugt eine Zusammenfassung. Das Ergebnis wird in zwei neuen States im `info`-Kanal gespeichert:

- `info.topology` – strukturiertes JSON mit allen gefundenen UDS-zugänglichen Geräten und Topologie-Elementen (dedupliziert über alle Topologie-Matrizen).
- `info.topologyHtml` – eine fertig gerenderte HTML-Tabelle, farbkodiert nach Bus-Typ (CanInternal, CanExternal, CanRaw, ModBus, ServiceBus), mit UDS-Badge für Geräte, die auch über UDS erreichbar sind. Geeignet zur Anzeige in vis, jarvis oder einem beliebigen HTML-Widget.

---

## Schnellstart

**Voraussetzungen**

- Ein USB-to-CAN- oder CAN-Adapter, der mit dem externen oder internen CAN-Bus des Viessmann-E3-Geräts verbunden ist.
- Ein Linux-basiertes Hostsystem (nur Linux wird unterstützt).
- Der CAN-Adapter ist aktiv und im System sichtbar, z. B. als `can0` (prüfen mit `ifconfig`).
- Zur Einrichtung des CAN-Adapters siehe das [open3e-Projekt-Wiki](https://github.com/open3e/open3e/wiki/020-Inbetriebnahme-CAN-Adapter-am-Raspberry).

> **Wichtig:** Stellen Sie sicher, dass kein anderer UDSonCAN-Client (z. B. open3e) läuft, während dieser Adapter zum ersten Mal eingerichtet wird. Parallele UDS-Kommunikation verursacht Fehler in beiden Anwendungen.

**Ersteinrichtung – Kurzübersicht**

1. Adapter installieren und Konfigurationsdialog öffnen.
2. CAN-Adapter auf dem Tab **CAN Adapter** konfigurieren und speichern.
3. E3-Geräte auf dem Tab **Liste der UDS-Geräte** scannen.
4. Datenpunkte auf dem Tab **Liste der Datenpunkte** scannen (dauert bis zu 5 Minuten).
5. Leseintervalle auf dem Tab **Zuweisungen** einrichten und speichern.

Die detaillierten Schritte sind in der [Konfigurationsanleitung](#konfigurationsanleitung) weiter unten beschrieben.

> **Nach einem Node.js-Upgrade:** Native Module dieses Adapters müssen neu kompiliert werden, wenn sich die Node.js-Version ändert. Falls der Adapter nach einem Node.js-Upgrade nicht startet, Adapter stoppen, `iob rebuild` auf der Kommandozeile ausführen und Adapter neu starten.

---

## Konfigurationsanleitung

### Schritt 1 – CAN-Adapter

Öffnen Sie den Adapterkonfigurationsdialog und wechseln Sie zum Tab **CAN Adapter**.

- Namen der CAN-Schnittstelle eingeben (Standard: `can0`).
- **Mit Adapter verbinden** für jede gewünschte Schnittstelle aktivieren.
- **SPEICHERN** drücken. Die Adapterinstanz wird neu gestartet und stellt die CAN-Bus-Verbindung her.

Falls ein zweiter CAN-Bus vorhanden ist (z. B. interner Bus), kann er hier als zweiter Adapter konfiguriert werden. Ein zweiter **Zuweisungen**-Tab erscheint, sobald der zweite Adapter konfiguriert ist.

### Schritt 2 – Gerätescan und Energiezähler-Erkennung

Zum Tab **Liste der UDS-Geräte** wechseln und **Scan** drücken.

- Der Scan dauert einige Sekunden. Der Fortschritt ist im Adapter-Log sichtbar (zweiten Browser-Tab öffnen).
- Alle auf dem Bus gefundenen E3-Geräte werden aufgelistet. Die Geräte können in der zweiten Spalte umbenannt werden — diese Namen werden als Bezeichner im ioBroker-Objektbaum verwendet.
- **SPEICHERN** drücken, wenn fertig. Die Instanz wird neu gestartet.

> Während des Gerätescans liest der Adapter auch die Datenformatkonfiguration des Geräts (Datenpunkt 382) aus, einschließlich Temperatureinheiten (°C oder °F) und Datums-/Zeitformaten. Diese werden gespeichert und beim nachfolgenden Datenpunktscan verwendet.

**Energiezähler-Erkennung**

Während der Gerätescan läuft, lauscht der Adapter passiv auf dem CAN-Bus auf Broadcasts von E380- und E3100CB-Energiezählern. Es ist keine zusätzliche Scanzeit erforderlich — die Erkennung läuft parallel. Das Ergebnis wird gespeichert und angezeigt:

- Im Adapterkonfigurationsdialog (Tab **Liste der UDS-Geräte**) als Textzusammenfassung.
- In der **e3oncan Datenpunkte**-Seite als einzelne Karten für jeden erkannten Zählertyp (siehe [unten](#e3oncan-datenpunkte-seite)).

### Schritt 3 – Datenpunktscan

Tab **Liste der Datenpunkte** öffnen, **Scan starten …** drücken und mit **OK** bestätigen.

> **Geduld** – der Scan kann bis zu 5 Minuten dauern. Der Fortschritt ist im Adapter-Log sichtbar.

Was der Scan tut:
- Ermittelt alle verfügbaren Datenpunkte für jedes Gerät.
- Fügt Metadaten (Beschreibung, Einheit, Lese-/Schreibzugriff) zu jedem Datenpunkt-Objekt hinzu.
- Setzt physikalische Einheiten gemäß der in Schritt 2 gefundenen Datenformatkonfiguration.
- Erstellt den vollständigen Objektbaum für jedes Gerät in ioBroker.
- Erkennt Collect-fähige Geräte, indem passiv auf deren Zeitübertragungen auf dem CAN-Bus gelauscht wird (keine zusätzliche Scanzeit — läuft parallel). Ein Pin-Symbol erscheint im Gerätekarten-Header der **e3oncan Datenpunkte**-Seite für jedes erkannte Gerät.

Dieser Schritt ist für die reine Lesenutzung nicht zwingend erforderlich, wird aber **dringend empfohlen** — und ist **notwendig**, wenn Datenpunkte geschrieben werden sollen.

**Datenpunktwerte während des Scans im Objektbaum speichern**

Standardmäßig schreibt der Scan auch den aktuellen Wert jedes Datenpunkts in den Objektbaum (`json`-, `raw`- und `tree`-States). Das Verhalten kann über die Option **Datenpunktwerte im Objektbaum während des Scans speichern** oberhalb der Scan-Schaltfläche angepasst werden. Wenn diese Option deaktiviert ist, aktualisiert der Adapter Werte und Metadaten für bereits vorhandene Datenpunkt-Objekte, erstellt aber keine neuen — diese werden automatisch angelegt, wenn nach dem Scan erstmals Daten empfangen werden.

Diese Option ist nützlich, wenn eine große Anzahl von State-Schreibvorgängen während des Scans vermieden werden soll (z. B. auf Systemen mit vielen Geräten). Wenn zuvor ein Scan mit gespeicherten Werten durchgeführt wurde und jetzt ein sauberer Neuanfang gewünscht wird, können die `json`-, `raw`- oder `tree`-Unterobjekte eines Geräts aus dem ioBroker-Objektbaum gelöscht werden — der Adapter legt sie automatisch neu an, wenn er das nächste Mal Daten empfängt. **Hinweis:** Das gleichzeitige Löschen vieler Objekte veranlasst ioBroker, viele interne Ereignisse auf einmal auszulösen, was kurzzeitig den RAM-Verbrauch erhöhen kann. Auf Systemen mit knappem Arbeitsspeicher besser in kleinen Batches löschen.

> **Hinweis zu History-Adaptern:** Das Löschen von Objekten löscht **nicht** die historischen Daten, die von einem History-Adapter (History, InfluxDB, SQL) gespeichert wurden. Die aufgezeichneten Werte bleiben im Backend des Adapters erhalten und erscheinen in Diagrammen wieder, sobald die State-ID neu erstellt wurde. Die History-Abonnement-Konfiguration (das „enabled"-Flag am Objekt) geht jedoch beim Löschen verloren und muss am neuen Objekt manuell wieder aktiviert werden.

> **Warnung:** Den `info`-Kanal niemals löschen (z. B. `e3oncan.0.info`). Er enthält Scan-Ergebnisse, Energiezähler-Erkennung, Verzögerungen, Aktiv-Flags, Bus-Topologie-Zusammenfassungen und den CAN-Verbindungsstatus. Ein Löschen führt zum Verlust von Konfigurationsdaten, die nicht automatisch wiederhergestellt werden können.

**Bus-Topologie-Analyse**

Nach dem Scan erzeugt der Adapter automatisch eine Bus-Topologie-Zusammenfassung und speichert sie in zwei States im `info`-Kanal: `info.topology` (JSON) und `info.topologyHtml` (HTML). Weitere Details unter [Bus-Topologie-Analyse](#bus-topologie-analyse) weiter unten.

Nach dem Scan können die gefundenen Datenpunkte über die **e3oncan Datenpunkte**-Seite durchsucht und verwaltet werden (siehe [unten](#e3oncan-datenpunkte-seite)).

### Schritt 4 – Zuweisungen und Zeitpläne

Die empfohlene Vorgehensweise zum Konfigurieren von Leseintervallen und geräteindividuellem Collect-Modus ist die **e3oncan Datenpunkte**-Seite (siehe [unten](#e3oncan-datenpunkte-seite)).

**Energiezähler**

Wenn der Gerätescan E380- oder E3100CB-Energiezähler erkannt hat, erscheint für jeden erkannten Zähler eine Karte in der **e3oncan Datenpunkte**-Seite. Das Sammeln mit dem **Collect**-Schalter auf der Karte aktivieren. Im Feld **Verzögerung (s)** das Mindestintervall zwischen Wertaktualisierungen in ioBroker einstellen. Der Standardwert von 5 Sekunden ist empfohlen — Energiezähler übertragen mehr als 20 Werte pro Sekunde, und ein Wert von 0 würde ioBroker stark belasten.

**Speichern & Schließen** drücken, wenn fertig. Den Objektbaum prüfen, ob Daten gesammelt werden.

---

## Bus-Topologie-Analyse

Nach dem Datenpunktscan wertet der Adapter alle während des Scans gesammelten Topologie-Daten aus und speichert das Ergebnis in zwei States im `info`-Kanal:

| State | Rolle | Inhalt |
|---|---|---|
| `info.topology` | `json` | Strukturiertes JSON: Liste aller UDS-zugänglichen Geräte und aller Topologie-Elemente, dedupliziert über alle Topologie-Matrizen |
| `info.topologyHtml` | `html` | Fertig gerenderte HTML-Tabelle, farbkodiert nach Bus-Typ, mit **UDS**-Badge für Geräte, die auch über UDS erreichbar sind |

**Anzeige der HTML-Tabelle**

Am einfachsten lässt sich die Topologie in ioBroker mit einem Dashboard-Tool anzeigen, das HTML-States rendern kann:

- **jarvis**: **stateHTML**-Widget hinzufügen → `e3oncan.x.info.topologyHtml` auswählen.
- **vis / vis2**: Widget **basic – String (unescaped)** oder **HTML** → `e3oncan.x.info.topologyHtml` auswählen.

> **Hinweis:** Die States `info.topology` und `info.topologyHtml` können für den Standard-ioBroker-Admin-State-Editor-Dialog zu groß sein. Dies ist eine bekannte Einschränkung des Admin-UI für große String-States. Die States werden korrekt geschrieben und können normal von Skripten und Widgets verwendet werden.

---

## e3oncan Datenpunkte-Seite

Die **e3oncan Datenpunkte**-Seite ist die zentrale Stelle zum Durchsuchen von Datenpunkten und zum Konfigurieren von UDSonCAN-Leseintervallen und geräteindividuellem Collect-Modus. Sie öffnet sich in einem neuen Browser-Tab, wenn in der ioBroker-Admin-Instanzansicht auf die Schaltfläche **Datenpunkte** in der Instanzzeile des Adapters geklickt wird.

**Datenpunkte durchsuchen**

Alle Geräte und erkannte Energiezähler werden als aufklappbare Karten angezeigt, standardmäßig zugeklappt für einen schnellen Überblick über das gesamte System. Ein Klick auf den Karten-Header klappt die Karte auf. Das Suchfeld filtert nach Name oder ID, passende Karten werden automatisch ausgeklappt.

Wenn für ein Gerät noch kein Datenpunktscan durchgeführt wurde, erscheint oben auf der Seite ein Warnbanner als Erinnerung. Wenn ein Scan vorhanden ist, die in v1.x eingeführte Collect-Auto-Erkennung aber noch nicht ausgeführt wurde, empfiehlt ein Info-Banner einen erneuten Scan. Dieser Hinweis kann per Instanz dauerhaft ausgeblendet werden (Schaltfläche **Nicht mehr anzeigen**).

**Gerätekarten**

Jede Gerätekarte listet ihre Datenpunkte mit ID, Name, Codec und Zeitplaneinstellungen auf. Der Collect-Schalter und die minimale Aktualisierungszeit erscheinen im Karten-Header. Wenn während des Datenpunktscans Collect-Traffic vom Gerät erkannt wurde, wird im Karten-Header ein grünes Pin-Symbol als Bestätigung angezeigt. Sind Datenpunkte eingeplant, erscheint ein grünes **N scheduled**-Badge — ein Klick darauf klappt die Karte auf und zeigt nur die eingeplanten Datenpunkte. Nochmaliger Klick auf das Badge hebt den Filter auf; ein Klick auf den Karten-Header hebt den Filter auf und klappt die Karte ein oder vollständig auf, je nachdem, ob das Badge sie geöffnet hatte.

**Energiezähler-Karten**

Wenn während des Gerätescans Energiezähler erkannt wurden (siehe [Schritt 2](#schritt-2--gerätescan-und-energiezähler-erkennung)), erscheint oben auf der Seite für jeden erkannten Zähler eine Karte. Den **Collect**-Schalter zum Aktivieren der Datenerfassung verwenden und im Feld **Verzögerung (s)** das Mindestintervall zwischen Wertaktualisierungen in ioBroker einstellen.

**Zeitpläne**

Für jeden Datenpunkt kann Folgendes eingestellt werden:
- **Beim Start** aktivieren – der Datenpunkt wird einmal beim Start des Adapters gelesen.
- **Intervall (s)** eingeben – der Datenpunkt wird in diesem Abstand wiederholt gelesen.

Beide Optionen können kombiniert werden. Den Zeitplan-Filter (Alle / Beim Start / Intervall) verwenden, um schnell auf bereits eingeplante Datenpunkte zu fokussieren.

**Topologie**

Die Schaltfläche **Topology** in der Toolbar öffnet das Bus-Topologie-Diagramm in einem modalen Dialog. Das Diagramm wird automatisch nach jedem Datenpunktscan erstellt (siehe [Bus-Topologie-Analyse](#bus-topologie-analyse)). Die Schaltfläche ist deaktiviert, solange noch keine Topologie-Daten vorliegen.

**Speichern**

**Speichern** drückt die Änderungen an, ohne den Tab zu schließen. **Speichern & Schließen** speichert und schließt den Tab und kehrt zur Instanzansicht zurück. **Verwerfen & Schließen** schließt den Tab ohne Speichern — kein Adapter-Neustart wird ausgelöst. Ein **Nicht gespeicherte Änderungen**-Badge erscheint, sobald ausstehende Änderungen vorhanden sind.

> **Hinweis:** Beim Speichern werden die Zeitpläne aller in diesem Tab angezeigten Geräte aus dem aktuellen UI-Zustand neu aufgebaut. Zeitpläne für Geräte, die hier nicht aufgeführt sind (z. B. direkt im Adapterkonfigurationsdialog angelegt), bleiben unverändert erhalten. Existieren für dasselbe Gerät Zeitpläne an beiden Stellen, überschreibt der Datenpunkte-Tab beim Speichern. Doppelte Einträge werden automatisch entfernt.

---

## Datenpunkte lesen

Datenpunkte werden automatisch gemäß den konfigurierten Zeitplänen gelesen. Die Werte erscheinen im ioBroker-Objektbaum unter dem Gerätenamen, aufgeteilt in `json`-, `raw`- und `tree`-Unterobjekte mit lesbaren Namen und Metadaten.

**Einzelnen Datenpunkt auf Abruf lesen**

Jeder Datenpunkt kann jederzeit abgefragt werden, indem der State `e3oncan.0.<GERÄT>.cmnd.udsReadByDid` bearbeitet und eine Liste von Datenpunkt-IDs eingegeben wird, z. B. `[3350, 3351, 3352]`. Wenn der Datenpunkt auf dem Gerät verfügbar ist, erscheint der Wert im Objektbaum und kann in Leseintervallen verwendet werden.

Der numerische Scanbereich ist derzeit begrenzt (z. B. 256–3338 in Version 0.11.0). Mit `udsReadByDid` können Datenpunkte außerhalb dieses Bereichs abgerufen werden.

---

## Datenpunkte schreiben

Das Schreiben ist bewusst einfach gehalten: Den Wert des entsprechenden States in ioBroker ändern und speichern, **ohne** das Kontrollkästchen `Bestätigt` (ack) zu aktivieren. Der Adapter erkennt den unbestätigten Schreibvorgang und sendet ihn an das Gerät.

Etwa 2,5 Sekunden nach dem Schreiben liest der Adapter den Datenpunkt vom Gerät zurück und speichert den bestätigten Wert. Wenn der State danach nicht bestätigt ist, bitte das Adapter-Log auf Fehlerdetails prüfen.

**Whitelist schreibbarer Datenpunkte**

Das Schreiben ist auf Datenpunkte einer Whitelist beschränkt, gespeichert unter:

```
e3oncan.0.<GERÄT>.info.udsDidsWritable
```

Die Liste kann durch Bearbeiten dieses States erweitert werden. Speichern **ohne** `Bestätigt` zu aktivieren.

Einige Datenpunkte können auch nach der Aufnahme in die Whitelist nicht geändert werden — das Gerät liefert dann eine negative Antwort. Der Adapter versucht es dann mit einem alternativen Dienst (nur interner CAN-Bus). Schreibvorgänge immer durch Prüfen des bestätigten Werts verifizieren.

---

## Datenpunkte und Metadaten

Ausführliche Informationen zur Struktur der Datenpunkte, zur Funktionsweise von Varianten-Datenpunkten und Metadaten sowie zur Handhabung von Temperatur-, Datums- und Zeitformaten sind in [data-points.md](/#/docs/adapterref/iobroker.e3oncan/lib/data-points.md) (englisch) zu finden.

---

## Energiezähler

Energiezähler werden während des Gerätescans automatisch erkannt. Eine manuelle Konfiguration ist nicht erforderlich. Der Adapter vergibt einen State-Namen im ioBroker-Objektbaum basierend darauf, wo jeder Zähler gefunden wurde:

| Kanal | CAN-Adresse | State-Name |
|---|---|---|
| UDS CAN | 98 | `e380` |
| UDS CAN | 97 | `e380_97` |
| 2. CAN | 98 | `e380_98` |
| 2. CAN | 97 | `e380_97` |

`e380` (ohne Suffix) wird für CAN-Adresse 98 auf dem UDS-CAN-Kanal verwendet, um die Abwärtskompatibilität mit bestehenden Installationen zu erhalten. `e3100cb` wird immer für den E3100CB verwendet.

Die Collect-Verzögerung (Standard 5 s) kann pro Zählertyp in der **e3oncan Datenpunkte**-Seite angepasst werden. Änderungen werden nach einem Adapter-Neustart wirksam.

### E380 – Daten und Einheiten

Es werden bis zu zwei E380-Energiezähler unterstützt. Die Datenpunkt-IDs hängen von der CAN-Adresse des Geräts ab:

- **CAN-Adresse 97:** Datenpunkte mit geraden IDs
- **CAN-Adresse 98:** Datenpunkte mit ungeraden IDs

| ID | Daten | Einheit |
|---|---|---|
| 592, 593 | Wirkleistung L1, L2, L3, Gesamt | W |
| 594, 595 | Blindleistung L1, L2, L3, Gesamt | var |
| 596, 597 | Betragsstrom L1, L2, L3; cosPhi | A, — |
| 598, 599 | Spannung L1, L2, L3; Frequenz | V, Hz |
| 600, 601 | Kumulierter Bezug, Einspeisung | kWh |
| 602, 603 | Gesamtwirkleistung, Gesamtblindleistung | W, var |
| 604, 605 | Kumulierter Bezug | kWh |

### E3100CB – Daten und Einheiten

| ID | Daten | Einheit |
|---|---|---|
| 1385_01 | Kumulierter Bezug | kWh |
| 1385_02 | Kumulierte Einspeisung | kWh |
| 1385_03 | Status: −1 = Einspeisung / +1 = Bezug | — |
| 1385_04 | Wirkleistung Gesamt | W |
| 1385_08 | Wirkleistung L1 | W |
| 1385_12 | Wirkleistung L2 | W |
| 1385_16 | Wirkleistung L3 | W |
| 1385_05 | Blindleistung Gesamt | var |
| 1385_09 | Blindleistung L1 | var |
| 1385_13 | Blindleistung L2 | var |
| 1385_17 | Blindleistung L3 | var |
| 1385_06 | Betragsstrom L1 | A |
| 1385_10 | Betragsstrom L2 | A |
| 1385_14 | Betragsstrom L3 | A |
| 1385_07 | Spannung L1 | V |
| 1385_11 | Spannung L2 | V |
| 1385_15 | Spannung L3 | V |

---

## FAQ und Einschränkungen

**Warum Collect und UDSonCAN kombinieren?**

Collect liefert Echtzeitdaten für alles, was die Geräte untereinander austauschen — schnell wechselnde Werte wie Energiefluss und langsam wechselnde wie Temperaturen, jeweils aktualisiert in dem Moment, in dem sie sich ändern. UDSonCAN ermöglicht den Zugriff auf Daten, die nicht spontan gesendet werden, typischerweise Sollwerte und Konfigurationswerte. Die Kombination beider Modi liefert das vollständigste und aktuellste Bild des Systems.

**Welche Geräte unterstützen den Collect-Modus?**

Derzeit ist das Collect-Protokoll bekannt für:
- Vitocal / HPMUMASTER (Collect-ID `0x693`, interner CAN-Bus)
- Vitocharge VX3 und Vitoair / EMCUMASTER (Collect-ID `0x451`, externer und interner CAN-Bus)

Die Collect-CAN-IDs werden beim Gerätescan anhand des UDS-Gerätenamens automatisch zugewiesen. Ein Gerät, das nicht in der Liste steht, erhält keine Collect-ID automatisch; sie kann manuell in der Adapterkonfiguration eingetragen werden.

**Kann open3e gleichzeitig genutzt werden?**

Ja, mit Einschränkungen. Wenn in diesem Adapter nur der Collect-Modus verwendet wird, kann open3e ohne Einschränkungen parallel laufen. Wenn UDSonCAN hier genutzt wird, open3e nicht gleichzeitig für dieselben Geräte betreiben — das verursacht sporadische Kommunikationsfehler in beiden Anwendungen.

**Der Adapter funktioniert nach einem Node.js-Upgrade nicht mehr. Was tun?**

Dieser Adapter verwendet native Module, die bei einem Wechsel der Node.js-Version neu kompiliert werden müssen. Adapter stoppen, `iob rebuild` auf der Kommandozeile ausführen, dann Adapter neu starten. Falls das Problem weiterhin besteht, bitte ein Issue eröffnen.

**Was ist der Unterschied zum open3e-Projekt?**

- Direkte Integration in ioBroker: Konfiguration über Dialoge, Daten direkt im Objektbaum sichtbar.
- Echtzeit-Collect-Modus zusätzlich zu UDSonCAN.
- Schreiben von Daten ist einfacher: einfach einen State-Wert ändern und ohne Bestätigung speichern.
- Kein MQTT erforderlich (MQTT ist natürlich über die normale ioBroker-Konfiguration verfügbar).
- 64-Bit-Integer-Kodierung beim Schreiben ist auf Werte unterhalb von 2^52 (4.503.599.627.370.496) begrenzt. Das Dekodieren funktioniert korrekt über den vollen 64-Bit-Bereich.

**Können Datenpunkte außerhalb des Scanbereichs abgefragt werden?**

Ja. Den State `e3oncan.0.<GERÄT>.cmnd.udsReadByDid` bearbeiten und eine Liste von Datenpunkt-IDs eingeben, z. B. `[3350, 3351, 3352, 3353]`. Verfügbare Datenpunkte erscheinen im Objektbaum und können in Leseintervallen verwendet werden. Nicht verfügbare Datenpunkte erzeugen eine „Negative response"-Meldung im Log.

---

## Spenden

<a href="https://www.paypal.com/donate/?hosted_button_id=WKY6JPYJNCCCQ"><img src="https://raw.githubusercontent.com/MyHomeMyData/ioBroker.e3oncan/main/admin/bluePayPal.svg" height="40"></a>  
Wenn Ihnen dieses Projekt gefällt — oder Sie einfach großzügig sind — würde ich mich über ein Bier freuen. Prost! :beers:

## Changelog

### Historie der Änderungen

Die Changelog-Einträge sind in der englischen Verison der (README.MD)[README.MD#changelog] verfügbar.

### Ältere Versionen

Ältere Changelog-Einträge sind in [CHANGELOG_OLD.md](https://github.com/MyHomeMyData/ioBroker.e3oncan/blob/main/CHANGELOG_OLD.md) zu finden.

## Lizenz
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