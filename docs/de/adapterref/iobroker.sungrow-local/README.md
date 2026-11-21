---
chapters: {"pages":{"en/adapterref/iobroker.sungrow-local/README.md":{"title":{"en":"ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/README.md"},"en/adapterref/iobroker.sungrow-local/README_de.md":{"title":{"en":"ioBroker.sungrow-local – Kurzbeschreibung auf Deutsch"},"content":"en/adapterref/iobroker.sungrow-local/README_de.md"},"en/adapterref/iobroker.sungrow-local/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.sungrow-local"},"content":"en/adapterref/iobroker.sungrow-local/vis-templates/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sungrow-local/README.md
title: ioBroker.sungrow-local
hash: 2j6r3FZxlE+TzYldbK+OMzORucm+o5PpbFwDI15f3gc=
---
![Logo](../../../en/adapterref/iobroker.sungrow-local/admin/sungrow-local.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.sungrow-local.svg)
![Test und Freigabe](https://github.com/SmarthomeElektroniker/ioBroker.sungrow-local/actions/workflows/test-and-release.yml/badge.svg)

# IoBroker.sungrow-local
*Lesen Sie dies in einer anderen Sprache: [Deutsche Kurzbeschreibung](/#/docs/adapterref/iobroker.sungrow-local/README_de.md).*

Verbindet einen **Sungrow Hybrid-Wechselrichter** (entwickelt mit einem SH20T) und seine **Batterie** (SBH-Serie, z. B. SBH400) über das **WiNet-S2** Kommunikationsmodul via **Modbus TCP** mit ioBroker - lokal, ohne iSolarCloud.

Hersteller: [Sungrow Power Supply Co., Ltd.](https://www.sungrowpower.com/en) - Hybrid-Wechselrichter der SH-Serie (z. B. SH-RT), Batterien und das WiNet-S2-Kommunikationsmodul: [Produktübersicht](https://en.sungrowpower.com/products).

Dieser Adapter ist ein eigenständiges Projekt (siehe [Warenzeichen](#trademark)).

Der Adapter wurde als Ersatz für eine generische `ioBroker.modbus`-Instanz entwickelt, die dieselben Register liest.
Er behält die Status-IDs einer solchen Instanz bei, sodass bestehende Skripte, Visualisierungen und Verlaufseinstellungen durch einfaches Ersetzen der entsprechenden Textpassagen übernommen werden können (siehe [Migration](#migration-from-iobrokermodbus)).

## Warum noch ein Modbus-Adapter?
Das WiNet-S2 ist ein Modbus TCP ↔ RTU-Gateway: Jede Anfrage landet auf einem RS485-Bus, der vom Wechselrichter (Einheit 1) und der Batterie (Einheit 2) gemeinsam genutzt wird. Die Batterie ist langsam - das WiNet gibt ihr ein *Anweisungsintervall* von 5000 ms, während dessen der Bus blockiert ist. Bei einer generischen Modbus-Instanz führt dies zu Folgendem:

- ein einziges Abfrageintervall für alles - entweder sind die Leistungswerte zu langsam oder die Batterieanforderungen laufen ins Timeout.
- Bei jedem Timeout wird die gesamte TCP-Verbindung unterbrochen; nach der Wiederherstellung fehlen alle PV-Werte für etwa eine Minute.
- Schreibvorgänge, die auf den blockierten Bus treffen, werden verworfen und sehen so aus, als ob der Inverter sie ignoriert hätte.

## Merkmale
- **Genau eine TCP-Verbindung** zum WiNet-S2. Alle Anfragen werden in eine Warteschlange gestellt und strikt nacheinander gesendet.

mit einer einstellbaren Mindestpause dazwischen.

- **Abfragegruppen** mit eigenem Intervall, Anfrage-Timeout und optionaler Pause nach jeder Anfrage. Standardwerte

(Gemessen an einer Referenzinstallation): `live` 5 s, `energy` 60 s, `control` 60 s, `battery` 120 s mit einem Timeout von 15000 ms und einer Pause von 5000 ms. Kürzere Werte werden in der Admin-Oberfläche rot markiert (nur Warnung).
Blöcke werden wie in ioBroker.modbus erstellt (maximale Blockgröße / maximaler Abstand), jedoch pro Gruppe.

**Ein Timeout führt nur zum Fehlschlagen des eigenen Blocks.** Die Verbindung wird erst nach N aufeinanderfolgenden Fehlschlägen wiederhergestellt.

(Standardwert 3) oder wenn das Gateway die Socket-Verbindung schließt; nur dann wird `info.connection` zu `false`. Modbus-Ausnahmen werden als Antwort gewertet.

- **Priorisierte Schreibvorgänge:** Halteregister werden vor der nächsten Leseanforderung beschrieben (FC6; mit

*Mehrere Register nicht beschreiben* (auch nicht für 32-Bit-Werte) und sofort wieder auslesen. `ack=true` wird nur mit dem bestätigten Wert gesetzt - auch wenn derselbe Wert erneut geschrieben wurde.

- **Schreibgeschützter Modus** (Schreibvorgänge ablehnen und den Zustand zurücksetzen), z. B. für die ersten Tage nach einer Migration.
- **Unveränderte Schreibvorgänge überspringen** (Standardeinstellung, Version 0.6.0): Ein Befehl, dessen Wert das Gerät bereits meldet (gleicher Rohwert).

Der Wert nach Faktor/Offset (abgefragtes Register, Wert nicht älter als zwei Abfrageintervalle + 10 s) wird nicht über das WiNet gesendet; der Zustand wird dennoch mit `ack=true` bestätigt. Sungrow rät von häufigen Schreibvorgängen in RW-Register über das WiNet ab.

- **Schreibzähler pro Register** (0.6.0) unter `info.write.registers.<register>.*` (Befehle und bestätigte

schreibt, heute und insgesamt) und eine Warnung pro Register und Tag über N Befehlen (Standard 50) - Skripte, die ständig schreiben, werden sichtbar.

- **Batteriesteuerung und Wanddosenregister** (0.6.0, experimentell, **standardmäßig deaktiviert**) - siehe

  [Batteriesteuerung](#battery-control-experimental) und [Wallbox](#wallbox-experimental).

- **Klartext und Grenzwerte** pro Register (`states` als `Wert:Text;Wert:Text`, `min`, `max`). Ein Schreibvorgang außerhalb

Diese Grenzwerte werden als Warnung protokolliert und trotzdem gesendet.

- **Diagnosedaten pro Gruppe** unter `info.groups.<group>.*`: Antwortzeit, letzter Erfolg, letzter Fehler,

Anfragen/Zeitüberschreitungen/Fehler/übersprungene Runden heute und Zeitüberschreitungen/Fehler insgesamt; Schreibvorgänge unter `info.write.*`.

- **Herzschlag** pro Gruppe: `lastRound` (Zeitstempel jeder abgeschlossenen Runde, auch ohne Wertänderungen),

`roundDuration` und `lastRoundText`, sowie `info.lastValueUpdate`. Registerwerte werden nur bei Änderung geschrieben, daher ist ein alter Zeitstempel in einem Register kein Fehler - ein blockierter Bus zeigt sich in `lastRound`.

- **Registerkarte „Status“** in den Instanzeinstellungen mit Verbindungsstatus, Heartbeat, Antwortzeit und Zählern pro Gruppe.
- **Registervorlage:** Neben den standardmäßig gelesenen Registern enthalten die Tabellen 100 weitere bekannte Sungrow-Register.

Register (nicht ausgewählt). Markieren Sie eine Zeile, um sie zu lesen - sie wird den Anforderungsblöcken ihrer Gruppe hinzugefügt, ohne zusätzliche Verbindung. Eigene Register können weiterhin hinzugefügt werden.

- Registerkarte **Konvertierungshilfe**: Adressen in allen Notationen, Datentyp, Vorzeichen, Wortreihenfolge und Faktor erklärt, Rohdaten

Werte werden auf alle gängigen Arten dekodiert, Plausibilitätswarnungen werden ausgegeben und optional kann ein einzelner Testlauf des Registers durchgeführt werden.

- **Geräteverwaltungskarten** (Admin → *Geräte*): Wechselrichter, Batterie und Netzzähler mit den wichtigsten Werten, Live-Informationen

Richtung (Laden/Entladen, Import/Einspeisung) und Fehleranzeige - nur lesbar, die Karten beschreiben nichts.

## Anforderungen
- Sungrow Hybrid-Wechselrichter mit **WiNet-S2**-Modul und aktiviertem Modbus TCP (Port 502).
Der WiNet-S2 verfügt über eine **Liste zulässiger IP-Adressen für Modbus TCP**. Ein Client, der nicht auf dieser Liste steht, erhält eine Verbindung.

Die Anfrage wurde akzeptiert und dann beim ersten Versuch zurückgesetzt (`ECONNRESET`) - dies deutet auf ein Netzwerkproblem hin. Fügen Sie die IP-Adresse des ioBroker-Hosts (wie sie von WiNet gesehen wird, d. h. nach der NAT-Übersetzung) in der WiNet-Weboberfläche hinzu.

Es sollte jeweils nur ein Modbus-Client mit dem WiNet kommunizieren. Deaktivieren Sie alle anderen Modbus-Instanzen, die denselben Client abfragen.

Gateway vor Aktivierung dieses Adapters.

- js-controller >= 6.0.11, **admin >= 8.2.0** (die Konfigurationsseite verwendet React-Komponenten des Adminbereichs), Node.js >= 22.

## Konfiguration
Die Konfigurationsseite hat sechs Registerkarten. Alles lässt sich mit Maus, Tastatur und Touchscreen bedienen; Drag & Drop ist immer optional (für jede Aktion gibt es eine Schaltfläche).

1. **Übersicht** - Ampelsysteme zum Beispiel, Verbindungen, letzte Werte und jede Umfragegruppe (letzte Runde, Runde

Dauer, Timeouts/Fehler/übersprungene Runden heute) und Live-Kacheln: PV-Leistung, Batterieleistung mit Richtung (Vorzeichen des Batteriestroms `43021`), Batteriestand, Netz (`35601`, + Import / − Einspeisung), Hausverbrauch (berechnet: AC-Ausgang `43034` + Netz; nicht geklemmt - ein nicht gemessener Generator im Hausnetz wird als „nicht ausgleichbar“ angezeigt) und alle anderen Register. Kacheln können hinzugefügt, entfernt und sortiert werden.

Bei einer neuen Instanz (noch keine Adresse) öffnet sich hier der **Einrichtungsassistent**: Gateway-Adresse, Verbindungstest (Gerätetypcode → Modell, Seriennummer, Batterie am Wechselrichter, SBH-Batterie an Einheit 2) und ein Profil *Basis / Batterie / Erweitert* mit einer Vorschau der Buslast.

2. **Register** - der Registerkatalog nach Themen (PV, Batterie, Netz, Wechselrichter, Steuerung, Info, Eigenbesitz) mit Suchfunktion.

Aktivieren Sie ein Register per Klick (in die Standardgruppe, Pfeil = andere Gruppe) oder ziehen Sie es in eine Abfragegruppe. Jede Gruppe wird als Spalte mit ihrem Intervall und den gesendeten Anfragen dargestellt. Die **Buslastanzeige** (pro Gruppe und insgesamt) wird anhand der tatsächlichen Blockstruktur des Adapters berechnet und zeigt an, *warum* ein Register eine zusätzliche Anfrage verursacht (+1 Anfrage, da 13050 nicht neben den anderen liegt). **Eigene Register**: Adresse in beliebiger Notation (Sungrow-Dokument ab 1, Protokoll ab 0, Spalte 30001/40001, Modicon) mit Off-by-One-Warnung und Testlesung vor dem Speichern.

3. **Steuerung** - die beschreibbaren Holding-Register. Das Schreiben wird **pro Register freigegeben** (neu in Version 0.4.0; bestehende

Installationen behalten ihre getickten Register (beschreibbar), den Wertebereich (Min./Max. oder Wertetabelle), das Verhalten außerhalb des Bereichs (Warnung oder Ablehnung), den schreibgeschützten Master-Schalter und das Protokoll der letzten Schreibbefehle (`info.write.log`).

4. **Verbindung** - Adresse und Port des WiNet-S2; *Erweitert* (ausgeblendet): Pausen, Wiederverbindungsverhalten, Schreiben

Timeout/Wiederholungsversuche, Blockbildung, Dezimalzahlen und die für die Lastbalken verwendete Buskapazität.

5. **Tools** - Konvertierungshilfe (siehe unten) und Diagnose aller Gruppen in einer Tabelle.
6. **Experte** - die einfachen Tabellen (Gruppen, Eingabe- und Halteregister) für Massenänderungen.

### Buslastmodell
Das Gateway verarbeitet über einen längeren Zeitraum etwa **1,25 Anfragen pro Sekunde** (gemessen an der Referenzinstallation SH20T + SBH400 hinter einem WiNet-S2): `live` 5 s + `energy` 60 s + `control` 60 s + `battery` 120 s (1,14 Anfragen/s) lief stabil, `live` 3 s (1,81/s) führte zu Rundenüberspringungen und `battery` 60 s verursachte Timeouts. Eine Anfrage an ein Gerät mit langsamem Bus blockiert den Bus zusätzlich für dessen Pause (SBH-Batterie: 5 s). Last = Anfragen pro Sekunde / Kapazität + Pausenanteil; Grün unter 80 %, Gelb bis 100 % (vollständig ausgelastet), Rot darüber. Gruppen, deren Intervall kürzer ist als die Pause einer anderen Gruppe, überspringen Runden. Die Kapazität kann unter *Verbindung → Erweitert* geändert werden.

## Vorlage registrieren
Die Registertabellen enthalten alle Register, die dieser Adapter kennt; die **markierten** Register werden gelesen:

- **Standardmäßig aktiviert** sind genau die Register der früheren Versionen - ein Update ändert nichts daran.

gelesen und kein staatlicher Ausweis.

- **Nicht markiert** sind die weiteren bekannten Register (seit Version 0.6.0: 120 Eingangs- und 86 Halteregister, einschließlich der Wallbox-Zeilen): Gerätetyp (mit Modellnamen), Seriennummer und Firmware

Versionen, MPPT 4, signierte Batterieleistung und -strom (neuere Firmware), präzise Netzfrequenz, Spannungen/Ströme/Summen der Energiezähler, monatliche PV-Erträge, Alarm- und Fehlercodes, Batteriestrom und -temperatur der SBH (Einheit 2), Systemuhr, Exportbegrenzung, Lastanpassung, Batterielade-/Entladeleistungsgrenzen, Zwangsladung und mehr. Schreibbare Zeilen enthalten Klartext (`states`) oder Grenzwerte.

- Markieren Sie eine Zeile und speichern Sie: Der Eintrag wird den Anforderungsblöcken seiner Gruppe hinzugefügt (z. B. Batteriestrom und

Die Temperatur von Einheit 2 liegt innerhalb der bestehenden Batterieanforderung - keine zusätzliche Anforderung. Selten ändernde Werte befinden sich in der Gruppe `info` (einmal pro Stunde).

- **Das Deaktivieren** eines zuvor gelesenen Registers entfernt dessen Datenpunkt - **sofern keine benutzerdefinierten Einstellungen vorliegen**

(Historie, InfluxDB, SQL …, seit Version 0.6.0): Das Objekt behält dann den Wert `native.orphaned = true`, empfängt keine weiteren Werte und wird bei jedem Start mit einem Warnhinweis versehen. Entfernen Sie die Einstellungen (oder das Objekt) manuell, sobald die gespeicherten Daten nicht mehr benötigt werden. Durch erneutes Aktivieren des Registers wird die Markierung entfernt.

- Bestehende Installationen erhalten die Vorlage einmalig beim ersten Start von Version 0.3.0 (die Instanz wird einmal neu gestartet); Zeilen

Sie haben selbst konfiguriert - es wird immer gewonnen. Eine Vorlagenzeile, die eines Ihrer Register überlappt, wird nicht hinzugefügt.

- Die Spalte *Quelle / Anmerkung* gibt an, woher eine Zeile stammt:
- **HA mkaiser (MIT)** - [Sungrow-SHx-Inverter-Modbus-Home-Assistant](https://github.com/mkaiser/Sungrow-SHx-Inverter-Modbus-Home-Assistant)

von Martin Kaiser, MIT-Lizenz, © 2025 Martin Kaiser. Registeradressen, Datentypen, Skalierung und die Wertetabellen (Gerätetypcodes, Ein-/Aus-Codes, EMS- und Lastanpassungsmodi) wurden aus `modbus_sungrow.yaml` übernommen.

- **Referenzliste** - Liste der Referenzinstallation (SH20T + SBH400 über WiNet-S2), geprüft am

das Gerät; teilweise mit Anmerkungen (z.B. monatliche Erträge: Faktor 0,1 gemessen, im Dokument steht 1).

- Die Netzanschlussbedingungen (LVRT/HVRT, Frequenz-/Spannungsschutz, Blindleistungskurven) werden absichtlich nicht eingehalten.

Teil der Vorlage - es handelt sich um Installationseinstellungen ohne dokumentierte Skalierung.

## Konvertierungshilfe
Sungrow-Dokumente, Home Assistant-Konfigurationen und Modbus-Tools zählen Adressen unterschiedlich und beschreiben Datentypen auf unterschiedliche Weise. Der Tab **Konvertierungshilfe** fügt ein Register in alle Notationen ein:

| Notation | Akkustand | Max. SoC | Regel | Verwendet von |
|---|---|---|---|---|
| Sungrow-Dokument, Spalte *Register* (zählt ab 1) | Eingang 13023 | Inhalt 13058 | - | Sungrow PDF, SunGather, openHAB-Binding (beide subtrahieren 1 vor dem Senden) |
| Protokolladresse (zählt ab 0, wird über den Bus gesendet) | 13022 | 13057 | Dokument − 1 | Registerlisten "Adresse inkl. Offset", Home Assistant / mkaiser `address: 13022  # reg 13023`, evcc, Loxone, ioBroker.modbus **ohne** Aliase (die übliche Forumanleitung, IDs wie `13022_Battery_level`) |
| Spalte *Adresse* dieses Adapters = ioBroker.modbus **mit** Aliasen | 43023 | 53058 | Protokoll + 30001 / + 40001 | dieser Adapter |
| Modicon, 6-stellig | 313023 | 413058 | Protokoll + 300001 / + 400001 | Modbus-Tools |

- **Die Zahl ist …:** Wählen Sie die Quelle Ihrer Zahl oder *automatisch erkennen*: Spalte (Eingabe ≥ 30001,

Bei Zahlen mit einem Wert ≥ 40001 und 6-stelligen Modicon-Zahlen ist die Zählung eindeutig; bei kleineren Zahlen kann die Zählung bei 0 oder bei 1 beginnen - der Helfer zeigt dann beide Messwerte an, wobei das Register, das dieser Adapter kennt, dort steht und nichts liest.

- **Bekanntes Register und Off-by-One:** Der Helfer nennt das Register Ihrer Tische an der Adresse und die

Nachbarn, die man erhält, wenn man von 0 statt von 1 zählt (Spalte 43022 ist *Batterieleistung*, 43023 *Batteriestand*).

- **Datentypen:** 16 Bit `U16` (niemals negativ) oder `S16` (Leistung, Strom, Temperatur - Rohwerte oben)

32767 sind negativ). 32-Bit-Werte verwenden zwei Register, und Sungrow sendet das **niederwertige Wort zuerst**: `uint32sw` / `int32sw`. Die Typenliste in den Tabellen enthält diese Erläuterungen.

- **Faktor:** Sungrow gibt die Auflösung an, z. B. "0,1 kWh" = Faktor 0,1. Wert = Rohwert × Faktor + Offset.
- **Rohwerte:** Geben Sie diese ein (`950`, `0x03B6`, `4464 1` für 32 Bit) oder aktivieren Sie *Vom Gerät lesen*: die

Der Adapter liest das Register einmal über seine Verbindung (wird wie jede andere Anfrage in eine Warteschlange gestellt, höchstens alle 5 Sekunden, nur FC4/FC3 - niemals ein Schreibvorgang).

- **Ausgabe:** alle Adressen und die resultierende Status-ID, der Wert des ausgewählten Typs, dieselben Rohdaten wie

U16/S16/U32/S32 in beiden Wortreihenfolgen, Warnungen (`0xFFFF` = kein Wert, Vorzeichen, Wortreihenfolge, unplausibler Wert mit einem besseren Faktor) und die in die Registertabelle einzugebende Zeile.

- Wenn ein Register nach dem Start zum ersten Mal gelesen wird, wird sein Wert pro Sitzung mit einem plausiblen Bereich verglichen.

Einheit (V, A, W, kWh, %, °C, Hz); ein unplausibler erster Wert wird als Hinweis (info) protokolliert.

## Objekte
| ID | Inhalt |
|---|---|
| `inputRegisters.<unit>.<address>_<name>` | Eingangsregister (schreibgeschützt) |
| `info.connection`, `info.reconnects`, `info.lastReconnect`, `info.queueLength`, `info.lastValueUpdate` | Verbindung |
| `info.groups.<group>.*` | Diagnose und Herzschlag pro Abfragegruppe (Standardwerte: `live`, `energy`, `control`, `battery`, `info`) |
| `info.write.*` | Diagnose von Schreibvorgängen |
| `info.write.registers.<register>.*` | Schreibbefehle und bestätigte Schreibvorgänge pro freigegebenem Register (heute/gesamt) |
| `control.battery.*` | Batteriesteuerung (nur bei eingeschaltetem Zustand): `mode`, `minutes`, `targetSoc`, `active`, `until`, `lastResult` |
| `control.battery.*` | Batteriesteuerung (nur wenn eingeschaltet): `mode`, `minutes`, `targetSoc`, `active`, `until`, `lastResult` |

`<address>` ist die Spalte *Adresse* in der ioBroker.modbus-Aliasnotation: Eingangsregister = 30001 + Protokolladresse, Halteregister = 40001 + Protokolladresse - d. h. Sungrow-Dokumentnummer + 30000 / + 40000 (Batteriestand: Dokument 13023, Protokoll 13022, ID `43023_…`). `<name>` ist die Spalte *Name*, wobei Leerzeichen und Punkte durch `_` ersetzt werden. Die Spalte *Beschreibung* wird zum Objektnamen.

## Batteriesteuerung (experimentell)
**Standardmäßig deaktiviert.** Aktivieren Sie es im Reiter *Steuerung*. Dann akzeptiert `control.battery.mode` drei Modi: Der Adapter beschreibt die benötigten Register selbst (sie müssen nicht aktiviert werden) mit dem normalen Schreibpfad (Schreiben vor dem nächsten Lesevorgang, Bestätigungslesevorgang):

| Modus | Beschriebene Register (Sungrow-Dokumentnummern) | Effekt |
|---|---|---|
| `normal` | Erzwungenes Ladefenster aus (33208 = 0x55), Befehl Stopp (13051 = 0xCC), EMS-Modus Eigenverbrauch (13050 = 0) | Normalbetrieb |
| `charge` | Befehl Stopp, Eigenverbrauch, erzwungenes Laden Fenster 1 ab jetzt für `minutes` bis `targetSoc` (33209-33214), Fenster an (33208 = 0xAA) zuletzt | Der Wechselrichter lädt in seinem eigenen Zeitfenster |
| `charge` | Befehl stoppen, Eigenverbrauch, erzwungenes Laden im Zeitfenster 1 ab jetzt für `minutes` bis zu `targetSoc` (33209-33214), Fenster bei (33208 = 0xAA) zuletzt | Der Wechselrichter lädt in seinem eigenen Zeitfenster |

Sicherheit:

- `hold` und `charge` enden nach `minutes` (1 … *maximale Dauer*, Standardwert 240 min); der Adapter kehrt dann zu

`normal`. Das Ende wird in `control.battery.until` gespeichert: Nach einem Neustart des Adapters kehrt ein abgelaufener Modus direkt nach dem Verbinden zu `normal` zurück. Das Ladefenster endet spätestens um 23:59 Uhr und wird vom Wechselrichter selbst beendet - es erfolgen keine wiederholten Befehle.

- Mindestpause zwischen zwei Änderungen (Standard 60 s) und maximale Anzahl von Halte-/Ladebefehlen pro Tag (Standard 12);

`normal` ist immer zulässig. Solange die Instanz schreibgeschützt ist, werden keine Daten geschrieben.

- Wenn ein Register vom Typ `hold`/`charge` nicht beschrieben oder bestätigt werden kann, kehrt der Adapter in den Normalzustand zurück.
- **Solange der Adapter gestoppt ist, kehrt nichts in den Normalzustand zurück.** - Die „Hold“-Funktion (erzwungener Modus) bleibt im Wechselrichter aktiv.

bis der Adapter wieder funktioniert.

- Das Zeitfenster für die Zwangsladung ist eine Tageszeit, die vom **Wechselrichteruhr** bestimmt wird (siehe Sungrow-Dokument 5000 ff.).

Einige Firmware-Versionen ignorieren dies, und ein maximaler SoC-Wert (13058/33031) unterhalb des Zielwerts begrenzt den Ladevorgang.
Die Register stammen aus dem Sungrow-Protokoll V1.1.11 und der Referenzliste; **das Schreiben wurde nur mit einem simulierten WiNet getestet**, nicht mit einem realen Wechselrichter.

## Wallbox (experimentell)
Die Vorlagenversion 8 fügt die Sungrow AC-Wanddose (AC007/AC011E/AC22E) hinzu - alle Zeilen **nicht markiert**:

- **Messwerte** (Eingangsregister 21299-21316: Gesamtenergie und Sitzungsenergie, Spannung/Strom pro Phase, Ladeleistung,

Startmodus, Ladestatus) über die **Weiterleitung des WiNet-S2**: Die Einheit ist die *Weiterleitungs-Modbus-ID* der Wanddose in der WiNet-Geräteliste (oft 2 oder 3; die Vorlage verwendet 3 - ändern Sie die Spalte „Einheit“, falls Ihre Liste etwas anderes angibt; Einheit 2 ist oft der Akku). Gruppe `energy` (60 s).

- **EMS-Register am Wechselrichter** (Haltestelle, Einheit 1, Sungrow-Protokolladressen 33539-33549, IDs `73540_…` -

`73550_…`): Ladevorgang freigegeben (0x55/0xAA), Lademodus (0xA0 Schnell, 0xA1 PV-Überschuss, 0xA2 Menge und Frist, 0xA3 benutzerdefiniert), Menge (0,1 kWh), Stromstärke (0,1 A), PV-Überschuss mit/ohne Netzstrom und drei 32-Bit-Zeiten (Frist, Start, Ende) als **Rohwerte: Das Zeitformat ist nicht klar definiert** (eine Quelle spricht von Unix-Zeit, eine andere nicht). Zuerst den Modus angeben, dann die davon abhängigen Werte.

- Zum Schreiben dieser EMS-Register ist der Schalter **"Wallbox EMS-Register"** (Registerkarte *Steuerung*, standardmäßig deaktiviert) erforderlich.

zusätzlich** zur Freigabe pro Register.

Laut der [ha-modbus-manager-Dokumentation](https://github.com/TCzerny/ha-modbus-manager) ist der Wechselrichter

Spiegelt nur diese EMS-Register und auch nur dann, wenn eine Wallbox über RS485 angeschlossen ist; größere SH-T-Hybride mit AC22E benötigen üblicherweise den iHomeManager. Quellen: TCzerny/ha-modbus-manager (MIT) und Forenbeiträge; **nicht an einer realen Wallbox getestet**.

## Migration von ioBroker.modbus
Die IDs, Namen, Einheiten, Faktoren, Datentypen und Rollen sind exakt wie in ioBroker.modbus aufgebaut (mit aktivierter *Multi-Device-ID*). Daher können die Registertabellen einer bestehenden Instanz in diesen Adapter kopiert werden, und alle Status-IDs bleiben bis auf das Instanzpräfix (`modbus.N.` → `sungrow-local.0.`) unverändert.

Dies gilt für Instanzen mit aktivierten *Aliasen*. Die meisten Sungrow-Anleitungen für ioBroker.modbus deaktivieren Aliase **und geben Protokolladressen ein (IDs wie `13022_Battery_level`): Addieren Sie 30001 (Eingang) / 40001 (Halteadresse) zu diesen Adressen - die IDs ändern sich dann (`13022_…` → `43023_…`), Skripte und Verlauf müssen angepasst werden.

Eine Ausnahme seit Version 0.4.3: Zeichen außerhalb von `[A-Za-z0-9_-]` (seit Version 0.5.0 auch das Komma) in der Namensspalte werden durch `_` ersetzt (Umlaute werden transliteriert), wie es ioBroker für Objekt-IDs empfiehlt. ioBroker.modbus behält beispielsweise `/` von `53051_Charge/discharge_command` bei; hier lautet die ID `53051_Charge_discharge_command`. Ersetzen Sie auch diese IDs.

Empfohlene Reihenfolge: Backup erstellen; Skripte/Watchdogs auf die neue Instanz umstellen; die alte Modbus-Instanz deaktivieren (WiNet sollte nur einen Client erkennen); den Host aufrufen und diesen Adapter aktivieren (zuerst schreibgeschützt); die Werte vergleichen; anschließend Schreibvorgänge zulassen. Die Verlaufsdaten der alten Zustände können mit der Einstellung `aliasId` des Verlaufsadapters fortgeführt werden.

## Unterschied zu anderen Adaptern
**ioBroker.modbus** ist der generische Modbus-Adapter und die Basis, mit der dieser Adapter kompatibel ist.

Die richtige Wahl für jedes andere Modbus-Gerät. `sungrow-local` fügt nur das hinzu, was WiNet-S2 benötigt: gruppenbezogene Intervalle, Timeouts, die die Verbindung nicht unterbrechen, priorisierte und bestätigte Schreibvorgänge sowie Diagnosefunktionen.

Zum Zeitpunkt der Erstellung dieses Dokuments existiert **kein dedizierter Sungrow-Adapter** im ioBroker-Repository; andere Lösungen

Nutzen Sie die iSolarCloud- (Internet-) oder die WiNet-WebSocket-API. Dieser Adapter verwendet ausschließlich die dokumentierte lokale Modbus-TCP-Schnittstelle.

## Verwendung der Werte in evcc (oder anderer Software)
evcc verwendet zwar eine eigene Sungrow-Vorlage, öffnet aber einen **zweiten Modbus-Client** am WiNet-S2. Der WiNet kann jedoch nur einen Client zuverlässig verarbeiten (ein gemeinsam genutzter RS485-Bus, langsame Batterieeinheit) - zwei Clients kollidieren und verursachen Timeouts auf beiden Seiten. Lassen Sie evcc stattdessen die Werte, die dieser Adapter bereits gelesen hat, über ioBroker auslesen.

- **Simple-API-Adapter** (HTTP, Standardport 8087): `http://<iobroker>:8087/getPlainValue/<state ID>` gibt Folgendes zurück

der einfache Wert.

- **MQTT-Adapter**: veröffentlicht die Zustände als Themen (z. B. `sungrow-local/0/inputRegisters/1/35601_power_total-EnergyMeter`);

evcc liest sie mit `source: mqtt`.

Beispiel mit simple-api (evcc-eigene Zähler; die genaue Syntax finden Sie in der evcc-Dokumentation Ihrer Version):

```yaml
meters:
  - name: grid
    type: custom
    power: # + = import, - = feed-in
      source: http
      uri: http://192.168.1.10:8087/getPlainValue/sungrow-local.0.inputRegisters.1.35601_power_total-EnergyMeter
  - name: pv
    type: custom
    power:
      source: http
      uri: http://192.168.1.10:8087/getPlainValue/sungrow-local.0.inputRegisters.1.35017_Total_DC_Power
  - name: battery
    type: custom
    power: # + = discharging, - = charging (tick the template row 35214 "Battery power signed")
      source: http
      uri: http://192.168.1.10:8087/getPlainValue/sungrow-local.0.inputRegisters.1.35214_Battery_power_signed
    soc:
      source: http
      uri: http://192.168.1.10:8087/getPlainValue/sungrow-local.0.inputRegisters.1.43023_Battery_level
```

Die Strompreise sind nicht Teil dieses Adapters: Sie werden von evcc, tibberlink, einem Spotpreis-Adapter oder einem Skript bereitgestellt.

## Visualisierung (Vis-Vorlagen)
Der Ordner [`vis-templates/`](https://github.com/SmarthomeElektroniker/ioBroker.sungrow-local/blob/main/vis-templates/) enthält vorgefertigte **vis 1**-Ansichten (animierter Energiefluss, Batterie, Wechselrichter & Netz, Adapterdiagnose) und ein Batteriesymbol-Widget in zwei Farben. Sie verwenden ausschließlich Datenpunkte aus `sungrow-local.0` - keine Skripte, keine weiteren Adapter. Importanleitung: [vis-templates/README.md](/#/docs/adapterref/iobroker.sungrow-local/vis-templates/README.md).

## Notizen
- `35016` ist der aktuelle Wert von MPPT 3. Bis Version 0.3.0 hieß die Standardzeile „MPPT 2 Current“ (geerbt von einer alten Version).

Modbus-Konfiguration). Neuinstallationen verwenden `35016_MPPT_3_Current`; bestehende Installationen behalten `35016_MPPT_2_Current` bei, bis die Zeile in der Registertabelle umbenannt wird (das alte Objekt kann dann gelöscht werden).

- `43001` (Laufstatus) ist ein Bitfeld und `43030` (Grid-Status) ist nicht eindeutig dokumentiert - beide werden angezeigt als

Zahlen ohne Klartext (`43030` unskaliert, Faktor 1).

- Der obere Grenzwert von 20000 W für die Lade-/Entladeleistung des Modells `53052` ist eine Annahme für einen SH20T; passen Sie ihn für andere Geräte an.

Modelle.

- `43008` (Lastleistung) wird als `int32sw` gelesen und die Phasenströme `43031`-`43033` als `int16be` (vorzeichenbehaftet, wie in

(Sungrow-Protokoll); bis Version 0.3.0 waren sie vorzeichenlos, und `43030` hatte den Faktor 0,1. Vorhandene Instanzen werden beim ersten Start einmalig korrigiert, es sei denn, die Zeile wurde manuell geändert. Die IDs bleiben unverändert.

- `43022` (Batterieleistung) ist ein Wert ohne Vorzeichen - das Vorzeichen von `43021` (Batteriestrom) oder der Vorlagenzeile

`35214` *Batterieleistungssignal* (Register 5214, neuere Firmware) gibt die Richtung an.

- `43023` (Akkuladestand) ist der nutzbare Ladestand zwischen minimalem und maximalem SoC; der Ladestand des Akkus selbst beträgt `40744`

(Einheit 2). Beide stimmen gemäß `40744 ≈ min SoC + 43023 × (max SoC − min SoC) / 100` überein, solange sich das Niveau innerhalb des Fensters befindet.

## Tests
```
npm test                                         # package check + unit tests (incl. simulated WiNet-S2)
IOB_CONTROLLER=latest npm run test:integration
npm run lint
```

`test/fakeWinet.js` simuliert das WiNet-S2: ein gemeinsamer Bus, Latenz und Befehlsintervall pro Einheit, verschluckte Anfragen, verspätete Antworten, Totalausfall und Verbindungsverlust.

## Marke
Sungrow, WiNet und iSolarCloud sind Marken der Sungrow Power Supply Co., Ltd. Dieser Adapter ist ein unabhängiges Projekt und steht in keiner Verbindung zu Sungrow und wird auch nicht von Sungrow unterstützt.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-11-14)

- **Review fixes (Bluefox, forum thread 85824):** async work that is not awaited (setState from poller events,
  restoring rejected commands, reconnects) can no longer end in an unhandled promise rejection – js-controller
  restarted the instance on those, e.g. while the adapter stopped. Errors are logged on debug level while stopping,
  otherwise as error at most once per task and minute; a failing start is logged and restarts the instance.
  eslint `no-floating-promises` guards the adapter code.
- **Review fixes:** unticked registers, legacy IDs and diagnostics of inactive groups are no longer deleted when
  they have custom settings (history, InfluxDB, SQL): the object stays, marked `native.orphaned`, with a warning.
- **Skip unchanged writes** (default on) and **write counters per register** with a warning above N commands a day.
- Value tables of hex codes (0x55/0xAA/0xBB/0xCC/0xA0–0xA3) show the code.
- README: evcc reads the values through simple-api or MQTT instead of a second Modbus client.
- **Experimental, off by default:** battery control (`control.battery.*`: normal/hold/charge with time limit and
  return to normal) and the Sungrow wallbox (template v8: readings via the WiNet forwarding, EMS registers
  33539–33549 locked behind an own switch; time format of the 32-bit times not clarified).

### 0.5.1 (2026-11-12)

- **Value tables in all 11 languages:** the operating state (43000) and the output type (35002) of the template
  are translated like the control registers (type codes and model names stay as they are). `common.states` only
  takes plain texts, so the translation goes by the raw value: the objects carry the system language, the cards
  of the device manager and the overview tiles show the texts (e.g. EMS mode, operating state) in the language.
  Own texts in the `states` column are never replaced.
- Wording of some card texts (de: battery state of health, pl: feed-in to the grid, uk/ru: idle).

### 0.5.0 (2026-11-12)

- **English names of the default poll groups:** `akku` → `battery`, `energie` → `energy`, `steuerung` → `control`
  (`live` and `info` stay). The group name is part of the diagnostic IDs (`info.groups.<group>.*`). Existing
  instances are migrated once on the first start (template version 7): the groups and the register rows of these
  groups are renamed, the objects `info.groups.akku/energie/steuerung.*` move to the new names with their values
  (counters go on), custom settings (history/sql/influxdb with `aliasId` = old ID) and rooms/functions; the old
  objects are deleted. Groups you named yourself are not touched; if a group with the new name exists already, the
  old group keeps its name (warning in the log). **Switch scripts and visualisations that use
  `info.groups.akku`, `info.groups.energie` or `info.groups.steuerung`** (the log lists them). Register IDs do not
  change. The vis templates use the new IDs.
- English default descriptions of the poll groups (they are part of the channel names). Existing descriptions are
  only replaced while they are still the German default text of earlier versions.
- State IDs no longer contain commas (`,` is in the forbidden characters of the js-controller). No default or
  template register has a comma in its name; objects of an own register with a comma move to the new ID like in
  0.4.3.
- Device manager support (`@iobroker/dm-utils`): read-only cards for the running operation. Directly on the card:
  *Inverter* PV power, PV yield today and total, backup output power; *Battery* (if a battery register is
  configured) state of charge (card status), power and voltage, manufacturer and model from the BMS (software
  version 40721 of unit 2 + capacity 43039, e.g. Sungrow SBH400; nothing is guessed for other batteries);
  *Grid meter* (if 35601 is configured) grid power, import and feed-in today and total. Live direction indicators
  (battery: sign of 43021 / 35214, + discharging, − charging; grid: 35601, + import, − feed-in) and the fault
  indicator (43052) on the inverter with the tooltip "No fault" / "Fault: …". A value whose register is not ticked is left out. The control dialog of a
  card shows more (AC output, house consumption, temperatures, health, backup reserve, min./max. SoC, EMS mode if
  polled). No actions, no configuration and no writing from the cards.
- README: link to the manufacturer and its product overview.

### 0.4.3 (2026-10-25)

- State IDs only contain the characters recommended by ioBroker (`[A-Za-z0-9_,-]`): other characters of the
  name column (e.g. `/`) become `_`, umlauts are transliterated. Affected defaults:
  `holdingRegisters.1.53051_Charge_discharge_command`, `53052_Charge_discharge_power`,
  `70230_Manual_Scanning_-_ON_OFF`, `72535_Zustand_Netzanschluss_-_ON_OFF`. Existing objects are migrated on the
  first start: custom settings (history/sql/influxdb with `aliasId` = old ID, so the recorded data goes on), the
  last value and the rooms/functions move to the new ID, the old object is deleted. **Switch scripts and
  visualisations to the new IDs** (the log lists them).
- The role `level.mode` of older configurations (not in the ioBroker role list) becomes `level` (template v6).
- vis template *Akku*: register 53051 is labelled "Zwangsbefehl (nur im Zwangsmodus)" - it only acts in the EMS
  forced mode.
- Poller: no variable named `wait` (repository checker W5051); the pause between requests stays on the adapter
  timers, because stopping must end it immediately.

### 0.4.2 (2026-10-25)

- When stopping, the connection is closed without waiting (no plain timer during shutdown).
- Admin: sizes for large screens in the tab *Tools*; Dutch text completed.
- README: formula of the house consumption tile (AC output 43034 + grid).

### 0.4.1 (2026-10-25)

- Register objects are created without a default value: before the first read there is no state
  (previously 0 with ack=true, so scripts could react on e.g. SoC 0 % at adapter start). The default value
  is removed from existing objects; IDs, custom settings and values stay.
- Debug log line for every incoming command.
- Tests: the EMS command test waits until the adapter is ready (was flaky on slow Windows CI runners).

### 0.4.0 (2026-10-25)

- New configuration page with React components (admin >= 8.2): overview with traffic lights and live tiles,
  register catalog by topic with search, drag & drop into poll groups and a live bus load per group and in
  total (from the real block building, with the reason for every extra request), own registers in any address
  notation with test read, setup wizard (connection test, model detection, profile), tab *Control*, tab
  *Tools* with conversion helper and diagnostics, tab *Expert* with the plain tables.
- Register catalog: 187 further known registers (109 input, 78 holding: Sungrow protocol V1.1.11, register list
  of the reference installation, Home Assistant integration by mkaiser), every register with a name and a
  description in 11 languages; object names are translated as long as the description column is unchanged.
- Writing is released per holding register (`allowWrite`); a write to a register that is not released is
  rejected and the device value restored. Existing installations keep their ticked registers writable
  (template version 3). New option: reject values outside the range instead of only warning.
- Write log `info.write.log` (last 25 write commands with result).
- A too short answer (fewer registers than requested) discards the whole block and counts as an answer, not as a
  connection error.
- Messages for the admin: `probe` (test read, FC3/FC4 only), `wizardTest`, `analyse`.
- Value tables of writable registers (EMS mode, charge/discharge command, backup, load control, forced charging,
  on/off switches – 24 registers) in 11 languages: the states appear as a selection in admin/vis/apps, the tab
  *Control* offers them as a menu with a short explanation per mode and writes only after a confirmation. With
  "reject" a value outside the table is not written (template version 4 adds missing tables; own texts stay).
- Uniform register names (one term per quantity; "(from inverter)" / "(from BMS)" / "(from meter)" where the same
  quantity comes from two sources; pairs are shown next to each other). IDs do not change; object names follow the
  catalog as long as the description column still holds a former default text.
- Nearly constant values (nominal power, battery health, battery capacity, installed PV power, battery net capacity,
  rated load power) are read in the group `info` (hourly); existing instances move them once if the row still has the
  default group (template version 5).
- Read test of every template register on an SH20T behind a WiNet-S2: 67 addresses are rejected there ("illegal data
  address") and are marked in the catalog; the log explains a request that fails for this reason.
- Fix: battery direction. A positive battery current (43021) means **discharging** (verified with 4 days of history
  and raw reads); the overview and the vis templates showed it inverted. House consumption = AC output (43034) +
  meter (35601); a result clearly below zero (a generator the inverter does not measure) is shown as
  "not balanceable" instead of 0 W.

### 0.3.0 (2026-10-24)

- Register template: 100 further known registers (74 input, 26 holding) from the Home Assistant integration by
  mkaiser (MIT) and the register list of the reference installation, unticked in the register tables; existing
  installations get them once on the first start (one restart). Nothing that was read before changes.
- New column *Read* (tick) and *Source / note*; readable data type names, factor choice with examples.
- New tab *Conversion helper*: addresses in all notations (Sungrow document from 1, protocol address from 0 as in
  register lists / Home Assistant / evcc / ioBroker.modbus without aliases, column of this adapter, 6-digit
  Modicon) with automatic detection where unambiguous, the known register at the address and its off-by-one
  neighbours, interpretations of raw words, warnings, single test read (read only).
- New poll group `info` (3600 s) for device information; diagnostics only for groups that read registers.
- Hint in the log when the first value of a register is implausible for its unit.
- Fix: the round duration after a reconnect no longer contains the time without connection (was 26 640 904 ms
  after a night without gateway).
- Fix: no more warning "setTimeout called, but adapter is shutting down" when the instance stops.
- Fix: `43008` load power is signed (`int32sw`), phase currents `43031`–`43033` are signed (`int16be`), `43030`
  grid state is unscaled (factor 1). Existing instances get the correction once (template version 2) unless
  the row was edited.

### 0.2.1 (2026-10-23)

- First public release (functionally the same as 0.2.0): published on GitHub and npm.
- Default register tables in English (object names and plain texts), no default room.
- Control registers with plain text use the role `level` (`level.mode` is not a valid role).
- Admin UI translated into all languages.
- Every level of the state IDs exists as an object: a folder per register type and a device per Modbus unit
  (`inputRegisters.1`, `inputRegisters.2`, …); the state IDs are unchanged.

Older entries (versions before the first public release) are in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Immanuel <github@freitag.online>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.