---
chapters: {"pages":{"en/adapterref/iobroker.sungrow-local/README.md":{"title":{"en":"ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/README.md"},"en/adapterref/iobroker.sungrow-local/README_de.md":{"title":{"en":"ioBroker.sungrow-local – Kurzbeschreibung auf Deutsch"},"content":"en/adapterref/iobroker.sungrow-local/README_de.md"},"en/adapterref/iobroker.sungrow-local/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/vis-templates/README.md"}}}
---
![Logo](admin/sungrow-local.png)

# ioBroker.sungrow-local – Kurzbeschreibung auf Deutsch

Die vollständige Dokumentation steht in der englischen [README](/#/adapters/sungrow-local).

Der Adapter bindet einen **Sungrow-Hybridwechselrichter** (entwickelt mit einem SH20T) und den **Akku**
(SBH-Serie, z. B. SBH400) über das Kommunikationsmodul **WiNet-S2** per **Modbus TCP** ein – lokal, ohne
iSolarCloud. Er ersetzt eine generische `ioBroker.modbus`-Instanz und behält deren Datenpunkt-IDs bei.

Hersteller: [Sungrow Power Supply Co., Ltd.](https://www.sungrowpower.com/en) – Hybridwechselrichter der SH-Serie
(z. B. SH-RT), Batterien und das Kommunikationsmodul WiNet-S2: [Produktübersicht](https://en.sungrowpower.com/products).
Der Adapter ist ein unabhängiges Projekt und steht in keiner Verbindung zu Sungrow.

- **Genau eine TCP-Verbindung** zum WiNet, alle Anfragen streng nacheinander, mit Mindestpause.
- **Abfragegruppen** mit eigenem Takt, Timeout und optionaler Pause nach jeder Anfrage (Vorgabe, an einer
  Referenzanlage gemessen: `live` 5 s, `energy` 60 s, `control` 60 s, `battery` 120 s mit Timeout 15000 ms und
  5000 ms Pause). Kürzere Werte markiert die Admin-Seite rot (nur Warnung).
- **Ein Timeout betrifft nur seinen Block**; neu verbunden wird erst nach N Fehlern in Folge (Vorgabe 3) oder
  wenn das Gateway die Verbindung schließt.
- **Schreiben mit Vorrang** vor der nächsten Leseanfrage, danach sofortige Rücklesung; `ack=true` erst mit dem
  bestätigten Wert. Optionaler Nur-Lese-Modus.
- **Diagnose je Gruppe** unter `info.groups.<gruppe>.*` mit Herzschlag `lastRound` – alte Zeitstempel an
  Registern sind normal (geschrieben wird nur bei Änderung), ein hängender Bus zeigt sich an `lastRound`.
- **Neue Einstellungsseite (0.4.0, Admin ≥ 8.2):** Reiter *Übersicht* (Ampeln, Live-Kacheln, Einrichtungs-
  Assistent mit Verbindungstest und Modellerkennung), *Register* (Katalog nach Themen mit Suche, aktivieren per
  Klick oder Drag & Drop in eine Abfragegruppe, Busauslastung je Gruppe und gesamt mit Begründung jeder
  zusätzlichen Anfrage, eigene Register in jeder Adressschreibweise mit Testlesen), *Steuerung* (Schreiben je
  Register freigeben, Wertebereich, Protokoll der letzten Schreibbefehle), *Verbindung* (mit aufklappbarem
  „Erweitert“), *Werkzeuge* (Umrechnungshilfe, Diagnose) und *Experte* (die bisherigen Tabellen).
- **Busauslastung:** etwa 1,25 Anfragen/s schafft der WiNet-S2 dauerhaft (gemessen: live 5 s + energy 60 s +
  control 60 s + battery 120 s stabil, live 3 s ließ Runden aus, battery 60 s erzeugte Timeouts); Pausen langsamer
  Geräte (SBH: 5 s) kommen hinzu. Grün < 80 %, gelb bis 100 %, rot darüber.
- **Umstieg von ioBroker.modbus:** gleiche IDs, Namen, Einheiten, Faktoren, Typen und Rollen – Textersatz
  `modbus.N.` → `sungrow-local.0.`. Die alte Modbus-Instanz vorher abschalten: das WiNet soll nur einen Client sehen.
  Ausnahme seit 0.4.3: Zeichen außerhalb `[A-Za-z0-9_-]` (seit 0.5.0 auch das Komma) in der Namensspalte werden zu `_` (Umlaute
  umschrieben), wie ioBroker es für Objekt-IDs empfiehlt – z. B. `53051_Charge/discharge_command` →
  `53051_Charge_discharge_command`. Diese IDs beim Textersatz mit ändern.
- **Falle Weißliste:** Das WiNet-S2 hat eine IP-Weißliste für Modbus TCP. Nicht eingetragene Absender bekommen
  sofort `ECONNRESET` – die IP des ioBroker-Rechners (nach NAT) im WiNet eintragen.
- Die Vorgabetabellen sind englisch beschriftet; Namen, Klartexte, Einheiten und Grenzen lassen sich in den
  Registertabellen ändern, ohne dass sich die IDs ändern.
- **Register-Vorlage:** Neben den vorab gelesenen Registern stehen 206 weitere bekannte Sungrow-Register im
  Katalog (120 Input, 86 Holding, nicht aktiv; Namen in 11 Sprachen; seit 0.6.0 auch die Wallbox, experimentell): Gerätetyp, Seriennummer, Firmware, MPPT 4, Akkuleistung und
  -strom mit Vorzeichen, Zähler des Energiezählers, Monatserträge, Fehlercodes, Akkustrom/-temperatur des SBH,
  Uhr, Einspeisebegrenzung, Lade-/Entladegrenzen, Zwangsladung u. a. Häkchen setzen und speichern – das Register
  wird im Leseblock seiner Gruppe mitgelesen. Quellen: Home-Assistant-Integration von mkaiser (MIT) und die
  Registerliste der Referenzanlage. Abhaken eines bisher gelesenen Registers löscht dessen Datenpunkt – außer er hat
  eigene Einstellungen (History, InfluxDB, SQL …, seit 0.6.0): dann bleibt er mit `native.orphaned = true` stehen,
  und eine Warnung im Log nennt ihn bei jedem Start.
- **Gleiche Werte nicht schreiben** (0.6.0, ab Werk an): Ein Befehl mit dem Wert, den das Gerät bereits meldet,
  geht nicht über den WiNet; der Datenpunkt wird trotzdem mit `ack=true` bestätigt. **Schreibzähler je Register**
  unter `info.write.registers.*` und eine Warnung je Register und Tag ab N Befehlen (Vorgabe 50).
- **Akkusteuerung** (0.6.0, experimentell, ab Werk **aus**): `control.battery.mode` = normal / halten / laden mit
  Zeitlimit und Rückkehr zu normal (auch nach einem Neustart), Mindestpause und Tageslimit; Laden über das
  Zwangsladefenster des Wechselrichters statt Dauerbefehlen. Nur gegen eine Attrappe getestet. Details in der
  [README](/#/adapters/sungrow-local#battery-control-experimental).
- **Wallbox** (0.6.0, experimentell): Messwerte über die Weiterleitung des WiNet (Unit = Weiterleitungs-ID) und die
  EMS-Register 33539–33549 des Wechselrichters; Schreiben braucht zusätzlich den Schalter „Wallbox-EMS-Register“.
  Das Zeitformat von Frist/Start/Ende ist ungeklärt (Rohwerte).
- **Umrechnungshilfe** (eigener Reiter): Adresse in allen Schreibweisen (Sungrow-Doku ab 1 wie SunGather/openHAB;
  Protokolladresse ab 0 wie Excel-/Registerlisten, Home Assistant, evcc, ioBroker.modbus ohne Aliase; Spalte
  „Adresse“ = Protokoll + 30001/40001; Modicon 6-stellig), automatische Erkennung wo eindeutig, bekanntes Register
  an der Adresse und die Nachbarn bei Verzähler um eins (43022 = Battery power, 43023 = Battery level), Datentyp, Vorzeichen, Wortreihenfolge (Sungrow:
  niederwertiges Wort zuerst = `…sw`) und Faktor erklärt; Rohwerte werden auf alle üblichen Arten gelesen, mit
  Warnungen und auf Wunsch einmaliger Test-Lesung vom Gerät (nur lesen).

## Werte in evcc nutzen

evcc bringt eine eigene Sungrow-Vorlage mit, öffnet damit aber einen **zweiten Modbus-Client** am WiNet-S2 – das
WiNet verträgt zuverlässig nur einen (gemeinsamer RS485-Bus, langsamer Akku). Besser liest evcc die Werte, die
dieser Adapter ohnehin liest, über ioBroker: per **simple-api** (`http://<iobroker>:8087/getPlainValue/<ID>`) oder
per **MQTT-Adapter** (`source: mqtt`). Beispielkonfiguration siehe [README](/#/adapters/sungrow-local#using-the-values-in-evcc-or-other-software).
Strompreise liefert der Adapter nicht – das übernehmen evcc, tibberlink, ein Börsenpreis-Adapter oder ein Skript.

## Visualisierung (vis-Vorlagen)

Im Ordner [`vis-templates/`](https://github.com/SmarthomeElektroniker/ioBroker.sungrow-local/blob/main/vis-templates/) liegen fertige **vis-1**-Ansichten (animierter Energiefluss, Akku,
Wechselrichter & Netz, Adapter-Diagnose) und ein Akku-Symbol als Widget in zwei Farben. Sie nutzen nur
Datenpunkte von `sungrow-local.0` – keine Skripte, keine anderen Adapter. Import siehe
[vis-templates/README.md](/#/docs/adapterref/iobroker.sungrow-local/vis-templates/README.md).