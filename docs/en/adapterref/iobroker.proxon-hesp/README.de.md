---
chapters: {"pages":{"en/adapterref/iobroker.proxon-hesp/README.md":{"title":{"en":"ioBroker.proxon-hesp"},"content":"en/adapterref/iobroker.proxon-hesp/README.md"},"en/adapterref/iobroker.proxon-hesp/README.de.md":{"title":{"en":"ioBroker.proxon-hesp"},"content":"en/adapterref/iobroker.proxon-hesp/README.de.md"},"en/adapterref/iobroker.proxon-hesp/NOTICE.md":{"title":{"en":"Sources and acknowledgements"},"content":"en/adapterref/iobroker.proxon-hesp/NOTICE.md"}}}
---
# ioBroker.proxon-hesp

*[English version](/#/adapters/proxon-hesp)*

Liest den internen HESP-Bus von Proxon-Lüftungsanlagen/Wärmepumpen (z. B. FWT 2-R, Hersteller:
[Zimmermann Lüftungs- und Wärmesysteme](https://www.zimmermann-lueftung.de/)) **passiv** mit und legt alle Werte in ioBroker ab.
Der Bus wird über ein RS485-TCP-Gateway oder direkt über eine serielle RS485-Schnittstelle (z. B. USB-RS485-Adapter) erreicht.
Standardmäßig sendet der Adapter nichts auf den Bus. Optional (Reiter **Steuerung**) können Raum-Sollwerte geschrieben werden.

## Voraussetzungen

- Zugang zum HESP-Bus (19200 Baud, 8N1), wahlweise:
  - **TCP-Client** (Standard): RS485-TCP-Gateway im transparenten TCP-Server-Modus (z. B. Port 502); der Adapter verbindet sich damit.
    Mehrere TCP-Clients gleichzeitig sind unkritisch, solange nur gelesen wird.
  - **TCP-Server:** Das Gateway arbeitet als TCP-Client und verbindet sich mit dem Adapter (Port einstellbar).
  - **Serielle Schnittstelle:** eine RS485-Schnittstelle am ioBroker-Rechner, z. B. ein USB-RS485-Adapter (`/dev/ttyUSB0`,
    besser der feste Name unter `/dev/serial/by-id/`, unter Windows z. B. `COM3`).
    Ohne Puffer des Gateways trifft das Senden die kurzen Buslücken vermutlich zuverlässiger (an einem echten Bus noch nicht getestet).
- Für „Parameter lesen“ und das Schreiben möglichst nur den Adapter mit dem Gateway verbinden:
  Die Sendelücke auf dem Bus ist nur etwa 70–80 ms lang, jede zusätzliche Verbindung verzögert das Gateway.
- js-controller ≥ 6, Admin ≥ 7.6.20, Node.js ≥ 22.

## Installation

> **Hinweis:** Inoffizielles Community-Projekt, nicht vom Hersteller. Alle Zuordnungen beruhen auf Beobachtungen am Bus. Nutzung auf eigene Gefahr – insbesondere die optionalen Schreibfunktionen: Schreibzugriffe auf den Bus können die Herstellergarantie des Geräts berühren.

### 1. Gateway anschließen

- Ein RS485-TCP-Gateway (getestet: USR-TCP232-Serie) an die HESP-Busleitung (A/B) des Lüftungsgeräts anschließen.
- Schnittstelle: **19200 Baud, 8 Datenbits, keine Parität, 1 Stoppbit**.
- Betriebsart **TCP-Server**, transparent (keine Modbus-Umsetzung), z. B. Port 502.
- Mit einem Programm wie `nc <gateway> 502 | xxd` prüfen, ob laufend Bytes ankommen.

### 2. Adapter installieren

- Im Admin unter **Adapter** installieren und eine Instanz anlegen.

### 3. Instanz einrichten

- **Verbindung:** Datenquelle (TCP-Client, TCP-Server oder serielle Schnittstelle) und deren Einstellungen.
- **Module:** Busadresse → Ordnername. Übliche Belegung:
  - `2` = Lüftungsgerät (`unit`)
  - `10`–`15` = Raummodule (`room10` … `room15`, nach Belieben umbenennen), vermutlich Neben-Bedienelemente (NBE; sie melden als Namen „Nbe“)
  - Bei der untersuchten Anlage entsprachen 10–15 der Reihenfolge im zentralen Bedienelement (BDE): Diele, Schlafen, Kind 1–4.
  - Unbekannte Teilnehmer erscheinen als `module<Adresse>`.
- **Zuordnungen:** Die Standardzeilen passen für eine FWT 2-R mit BDE Comfort. Sie lassen sich beliebig ergänzen.
- **Steuerung** (optional): Schreiben von Raum-Sollwerten freigeben, regelmäßige Parameter-Abfrage.

Nach dem Start erscheinen die Werte innerhalb weniger Sekunden. `info.connection` zeigt, ob gültige Telegramme ankommen.

## Datenpunkte

| Pfad | Inhalt |
|---|---|
| `info.connection` | Verbunden und gültige Telegramme |
| `info.events`, `info.lastEvent` | Seltene Ereignisse: neue Register, geänderte Texte, Meta-Antworten |
| `info.capture` | Schalter: schreibt alle Telegramme für *n* Minuten in eine Datei im Instanz-Datenordner (`iobroker-data/proxon-hesp.0/`) |
| `info.framesPerHour`, `info.skippedBytesPerHour` | Statistik |
| `<Modul>.<Name>` | Benannte Werte gemäß Tabelle **Zuordnungen** (Name mit führendem `/` = ab Instanzwurzel, z. B. `/controlPanelRoom.temperature`) |
| `<Modul>.registers.<R/W>_<DP>` | Jedes mitgelesene Register: `value` (automatisch gedeutet: Zahl, Text oder Liste), `raw` (hex), `lastSeen`, `count` |
| `<Raum>.heaterEnable` | nur bei „Heizelement freigeben/sperren erlauben“: schreibbar (true/false); wird einmalig als SET `0x0196` gesendet und bestätigt, sobald das Modul den Zustand in `0x0194` Bit 3 meldet. Das zentrale Bedienelement (BDE) erfährt davon nichts. Die Tastensperre (`0x0199`) ist so nicht schaltbar: das zentrale Bedienelement schreibt sie alle ~11 s neu |
| `unit.device.setClock` | nur bei „Uhr stellen erlauben“: Taste; stellt die Uhr des Lüftungsgeräts (SET `1>2 0x032E`) auf Systemzeit + Versatz (Einstellungen). Gleiches geht über die Taste „Uhr jetzt stellen“ in den Einstellungen. Gesetzt werden nur Datum, Stunde und Minute – die Sekunden zählt das Gerät selbst weiter; die Minute wird so gewählt, dass die Abweichung höchstens 30 s beträgt. Das zentrale Bedienelement fragt die Uhrzeit beim Gerät ab und zeigt dann die neue Zeit an |
| `<Raum>.setpoint` | nur bei „Schreiben erlauben“: schreibbarer Sollwert; wird einmalig als SET `0x01FB` an das Raummodul gesendet und nach dessen Rückmeldung bestätigt. Gesendet wird erst 2 s nach der letzten Änderung (Schieberegler liefern beim Ziehen Zwischenwerte). Gesendet wird in den Buslücken nach `2>1 0x02D9` und nach `40>1 0x0194` (je nur ~70 ms); da Telegramme dort oft mit dem Busverkehr kollidieren, bis zu 10 Versuche. Eine aktive Tastensperre verhindert die Übernahme nach bisheriger Beobachtung nicht |
| `<Modul>.meta.*` | Selbstauskunft der Module (Name, DP-Liste, Typcodes, Zugriff, Einheiten, Fehlertext), durch „Parameter lesen“ oder wenn der Master sie abfragt |
| `<Modul>.parameters.*` | Mit „Parameter lesen“ abgefragte Werte aller Register eines Moduls |
| `paramRead.*` | Knopf `start` und Status (`running`, `progress`, `status`, `lastRun`) des Parameter-Lesens |

`R` = Antwort des Moduls auf eine Leseanfrage, `W` = Wert, den der Master an das Modul schreibt.
Registernummern sind dezimal (z. B. `R_951` = DP `0x03B7`).

Die schreibbaren Datenpunkte (`setpoint`, `heaterEnable`, `setClock`) gibt es nur, solange die jeweilige Option eingeschaltet ist.

## Umstieg von 0.5.x

Bis Version 0.5.x waren die Objekt-IDs deutsch (z. B. `Zentrale.Temperaturen.T1_Zuluft`). Ab 0.6.0 sind sie
englisch (z. B. `unit.temperatures.t1SupplyAir`). Beim ersten Start stellt der Adapter einmalig um:
- Modul- und Zuordnungsnamen in der Instanzkonfiguration, soweit sie noch die früheren Standardnamen tragen
  (eigene Namen, z. B. Raumnamen, bleiben erhalten),
- alle Objekte samt aktuellem Wert und Einstellungen (z. B. History-Aufzeichnung),
- Zuordnungen in Aufzählungen (Räume, Funktionen) und Alias-Ziele,
- den Ordner des Lernprotokolls (`lernen` → `learn`).

Die Liste alter und neuer IDs steht danach in `iobroker-data/proxon-hesp.N/migration-0.6.0.json`.
**Bereits aufgezeichnete Werte bleiben in der History-Datenbank unter den alten IDs**; Skripte, Visualisierungen
und Diagramme müssen auf die neuen IDs umgestellt werden.

## Zuordnungen

In den Instanzeinstellungen lassen sich Register beliebig benennen: Modul, Art,
Register, Element-Index, Typ (`float32`, `int16`, …, `Text`, Kalender, Uhrzeit,
Lüfterstufe), Faktor, Einheit, Bit, zu ignorierender Rohwert, Gültigkeitsbereich,
Wertetexte und History. Die Standardzeilen decken Temperaturfühler T1–T13,
Lüfterdrehzahlen/-ansteuerung/-kennlinien, Betriebsart, Bypass, Filter,
Betriebsstunden, Verdichterdrehzahl, Gerätezeit und Raummodule ab.

## Lernprotokoll

Die Option *Lernprotokoll* (Reiter *Erweitert*, standardmäßig aus) schreibt Tagesdateien nach `iobroker-data/proxon-hesp.N/learn/`:
- `changes_JJJJ-MM-TT.log`: jede Wertänderung eines Registers, je Zeile `ms-Zeitstempel R|W<Modul>:<DP hex>:<Sub> <Nutzdaten hex>`. Jede Datei beginnt mit dem vollständigen Stand.
- `unknown_JJJJ-MM-TT.log`: Bytes, die nicht als Telegramm erkannt wurden (CRC-Fehler, Störungen), sowie Telegramme unbekannten Typs.

Dateien, die älter als die eingestellte Anzahl Tage sind (Standard 90, 0 = unbegrenzt), werden gelöscht. Eine Tagesdatei hat typischerweise einige MB.

## Parameter lesen

Der Knopf `paramRead.start` direkt unter der Instanz fragt nacheinander jedes konfigurierte Modul ab, zuerst das Lüftungsgerät:
- **Name** (Meta `0x0001`)
- **Verzeichnis** (Meta `0x0033` DP-Liste, `0x0034` Typ, `0x0038` Zugriff, `0x0039` Einheit), abgelegt unter `<Modul>.meta`
- **jeden Parameter** einmal, abgelegt unter `<Modul>.parameters.DP_xxxx`. Zugriffsrecht und Rohdaten stehen in der Beschreibung des Datenpunkts.

Es werden **nur Lese-Anfragen** gesendet, eine je Buslücke (ca. alle 12 s). Ein Durchlauf über alle Module dauert deshalb über eine Stunde. Den Stand zeigen diese Datenpunkte:
- `paramRead.running`
- `paramRead.progress` (%)
- `paramRead.status`
- `paramRead.lastRun`

Meta-Listen liefern je Anfrage 64 Einträge ab dem Offset im Sub-Selektor. Das Gerät antwortet nur, solange Offset + 64 ≤ Listenlänge ist. Daraus wird die Länge ermittelt.

Unter „Steuerung“ lässt sich eine regelmäßige Abfrage des Lüftungsgeräts einschalten (standardmäßig **aus**).

## Protokoll (Kurzfassung)

```
h0 h1 h2 | id (uint32 LE) | len (Nibbles) | Nutzdaten | CRC16 LE
```

- Kopf: 24 Bit LE, Bit 0–3 Typ (0 Anfrage, 1 Setzen, 2 Antwort, 3 Quittung, 4 Ablehnung, z. B. Meta-Seite außerhalb der Liste),
  Bit 4–13 Quelle, Bit 14–23 Ziel (vermutete Deutung, mit Mitschnitten konsistent)
- CRC: Init `0xFFFF`, Polynom `0x8048` reflektiert, 16 Schiebeschritte je Byte
- Längenfeld läuft bei 128-Byte-Antworten vermutlich über (`0x00`)

Quellen und Danksagung: siehe [NOTICE.md](/#/docs/adapterref/iobroker.proxon-hesp/NOTICE.md).

## Changelog

### 0.6.2 (2026-11-23)

- Objekte mit eigenen Einstellungen (z. B. History-Aufzeichnung) werden beim Abschalten einer Option nicht mehr gelöscht, sondern schreibgeschützt behalten; im Log erscheint eine Warnung
- Bereits verwendete (ohne Beachtung der Groß-/Kleinschreibung) oder reservierte Modulnamen (`info`, `paramRead`) werden mit einer Warnung durch `module<Adresse>` ersetzt
- Name des Modulordners der Busadresse 1 übersetzt (war aus älteren Versionen noch deutsch)
- Fehler von Hintergrundaufgaben werden protokolliert, statt den Adapter neu zu starten
- Namen für die Wärmepumpen-Parameter 0x0115 (Einschaltschwelle) und 0x011C (Dauerlauf-Temperatur)

### 0.6.1 (2026-11-19)

- Namen der Datenpunkte und Kanäle in allen 11 ioBroker-Sprachen (bisher nur Englisch und Deutsch); bestehende Objekte werden beim ersten Start aktualisiert
- Datenpunkte der Stundenstatistik werden beim Start angelegt

### 0.6.0 (2026-11-18)

- (Bruch) Englische Objekt-IDs; bestehende Installationen werden beim ersten Start automatisch umgestellt (siehe „Umstieg von 0.5.x“)
- Namen der Datenpunkte auf Englisch und Deutsch; Log-Meldungen, Ereignis- und Wertetexte auf Englisch
- Lernprotokoll-Dateien umbenannt (`learn/changes_*`, `learn/unknown_*`)
- Zeiteinstellungen werden im Code auf gültige Bereiche begrenzt
- Schreibbare Datenpunkte abgeschalteter Optionen werden entfernt; fehlende Elternkanäle werden angelegt
- README: Installation nur noch über das ioBroker-Repository; NOTICE.md auf Englisch

### 0.5.1 (2026-11-17)

- Erstes Release, das automatisch per npm Trusted Publishing (mit Herkunftsnachweis) veröffentlicht wird
- README: Link zum Hersteller; Paket-Metadaten bereinigt

### 0.5.0 (2026-11-17)

- Datenquelle wählbar: TCP-Client (wie bisher), TCP-Server (das Gateway verbindet sich mit dem Adapter) oder serielle Schnittstelle (z. B. USB-RS485)
- Admin-Oberfläche übersetzt (Englisch, Deutsch und weitere Sprachen); Neuigkeiten und Beschreibung in allen Sprachen
- Node.js ≥ 22 und Admin ≥ 7.6.20 erforderlich; Standard-Test- und Release-Ablauf von ioBroker

- Adresse 30 als PTC-Modul erkannt (Name „PTC-Modul“); neue Datenpunkte Wärmepumpe angefordert/aktiv, Fühlerkorrektur je Raum
- Optionales Lernprotokoll: jede Wertänderung und alle nicht erkannten Bytes in Tagesdateien
- Parameter lesen: bis zu 8 Versuche je Anfrage (die Buslücke ist nur ~70–80 ms lang, nur gut 40 % der Anfragen kommen durch), Ablehnungen (Typ 4) werden sofort erkannt; nach 12 unbeantworteten Anfragen in Folge wird die Verbindung zum Gateway neu aufgebaut
- Optional: Heizelement je Raum freigeben/sperren (SET `0x0196`, Bestätigung über `0x0194` Bit 3)
- Optional: Uhr des Lüftungsgeräts stellen (SET `0x032E`, Systemzeit + Versatz in Minuten)
- Sollwerte: Senden in zwei Buslücken je Zyklus, bis zu 10 Versuche

### 0.4.0 (2026-11-09)

- Parameter lesen für alle Module; Knopf und Status direkt unter der Instanz; Meta-Listen zusammengeführt

### 0.3.2 (2026-11-09)

- Parameter lesen: robuster gegen ausbleibende Antworten, Abbruch wird gemeldet

### 0.3.1 (2026-11-09)

- Sollwert-Schrittweite einstellbar, Standard 1 °C: Raummodule übernehmen 20,5 °C nicht (getestet)

### 0.3.0 (2026-11-09)

- Knopf „Parameter lesen“ (nur Lese-Anfragen), optional regelmäßige Abfrage (Standard: aus)

### 0.2.1 (2026-11-09)

- Adresse 40 als Luftqualitätssensor erkannt (Luftfeuchte, CO2), Meta-Texte mit Längenbyte

### 0.2.0 (2026-11-08)

- Optional: Raum-Sollwerte schreiben (SET `0x01FB`), gesendet in einer ruhigen Buslücke, Bestätigung über die Rückmeldung des Raummoduls

### 0.1.2 (2026-11-08)

- Raummodule: Heizanforderung (`0x019A`), Heizelement freigegeben und Tastensperre (`0x0194` Bit 3/11)
- „Wohnen“ (Raum des zentralen Bedienelements) als eigener Ordner, Referenzraum-Werte `0x0229`/`0x022A`
- Zuordnungsnamen mit führendem `/` werden ab der Instanzwurzel angelegt

### 0.1.1 (2026-11-08)

- Fehlerbehebung: Gleitkommawerte (z. B. Lüfterdrehzahlen) wurden teils fälschlich als Text erkannt

### 0.1.0 (2026-11-08)

- Erste Version: passives Mitlesen, CRC-Prüfung mit Neusynchronisation,
  konfigurierbare Zuordnungen, Registerablage, Meta-Datenpunkte, Ereignisse, Mitschnitt

## Lizenz

MIT-Lizenz, siehe [LICENSE](https://github.com/mkneppe/ioBroker.proxon-hesp/blob/main/LICENSE).

Copyright (c) 2026 Martin <mkspam@kneppe.org>