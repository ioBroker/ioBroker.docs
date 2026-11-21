---
chapters: {"pages":{"en/adapterref/iobroker.idm-modbus/README.md":{"title":{"en":"ioBroker.idm-modbus"},"content":"en/adapterref/iobroker.idm-modbus/README.md"},"en/adapterref/iobroker.idm-modbus/docs/en/manual.md":{"title":{"en":"ioBroker.idm-modbus – Manual"},"content":"en/adapterref/iobroker.idm-modbus/docs/en/manual.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.idm-modbus/docs/en/manual.md
title: ioBroker.idm-modbus - Handbuch
hash: Czj+zgSnO7QCObKp/m5Zb91RKC3J0P6F2wDNLMlz6kc=
---
# ioBroker.idm-modbus – Handbuch

Lokaler ioBroker-Adapter für IDM-Wärmepumpen mit Navigator-Steuerung (Navigator 2.0/Pro verifiziert, Navigator 10 und 1.0/1.7 laut IDM-Dokumentation). Die Kommunikation mit dem Navigator erfolgt über **Modbus TCP** in Ihrem eigenen Netzwerk, ohne Cloud-Anbindung. [Deutsche Version](https://github.com/seaspotter/ioBroker.idm-modbus/blob/main/docs/de/handbuch.md)

## 1. Bevor Sie beginnen

Zwei Dinge müssen **einmalig im Navigator** eingerichtet werden, normalerweise auf Ebene des Installateurs/Serviceanbieters (fragen Sie Ihren Installateur, wenn Sie die Menüs nicht erreichen können):

1. **Modbus TCP** ist standardmäßig deaktiviert. Wählen Sie im Hauptmenü „Einstellungen“ die Option „Gebäudeleittechnik“ und aktivieren Sie „Modbus TCP“. Weisen Sie dem Navigator eine feste IP-Adresse zu. Andernfalls kann der Adapter keine Daten empfangen; _der Verbindungstest_ meldet dann einen Verbindungsfehler.
2. **Netzwerk-PIN** – nur für die optionale _Weboberfläche_ (Zimmernamen, Zimmerdaten, Statistiken von den Navigator-Webseiten). Der Adapter funktioniert auch ohne sie.

Der Adapter schaltet niemals Installationsfunktionen frei und ändert diese Einstellungen auch niemals selbst.

**Sicherheitshinweis:** Lesen ist immer unbedenklich. Schreiben ist standardmäßig gruppenweise deaktiviert, und jeder Schreibvorgang wird geprüft, begrenzt und gezählt. Viele Navigator-Einstellungen befinden sich in einem EEPROM, das etwa 300.000 Schreibzyklen pro Einstellung übersteht. Lassen Sie daher niemals eine Automatisierung diese Einstellungen kontinuierlich beschreiben.

## 2. Erste Einrichtung (5 Minuten)

1. Installieren Sie den Adapter und erstellen Sie eine Instanz.
2. Registerkarte **„Verbindung“** : Geben Sie die IP-Adresse des Navigationsgeräts ein und wählen Sie die Generation des Navigationsgeräts aus. Klicken Sie auf **„Verbindung testen“** : Es werden die Außentemperatur und die erkannte Generation angezeigt (ein Hinweis erscheint, falls diese von Ihrer Auswahl abweicht).
3. **Installations-** Registerkarte: Klicken Sie auf **„Gerät scannen“** (ca. 3 Minuten, nur Leseanfragen; starten Sie den Adapter währenddessen nicht neu; der Fortschritt wird angezeigt). Sobald _„Scan abgeschlossen“_ angezeigt wird, klicken Sie auf **„Vorschlag anwenden“** . Dadurch werden die Heizkreise, Zonenmodule und Blöcke ausgewählt, die der Navigator tatsächlich besitzt. Markieren Sie diese und klicken Sie anschließend **auf „Speichern“** .
4. Statusmeldungen werden angezeigt, sobald der Navigator einen Wert meldet. Hardware, die in Ihrem Werk nicht vorhanden ist, erhält keine leeren Statusmeldungen.

Alles andere ist optional und deaktiviert, bis Sie es einschalten.

## 3. Einstellungsreferenz

### Verbindung

![Registerkarte „Verbindungen“](../../../../../en/adapterref/iobroker.idm-modbus/docs/images/en/settings-connection.png)

| Einstellung             | Bedeutung                                                                                                                                                                                                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigator-Host / IP     | Adresse des Navigationsgeräts. Verwenden Sie eine feste Adresse.                                                                                                                                                                                                                                                                         |
| Navigator-Generation    | 2.0 (auch Pro), 1.7 oder 10. Die Testtaste erkennt es für Sie.                                                                                                                                                                                                                                                                           |
| Webinterface (optional) | Lesen Sie außerdem Daten von der Weboberfläche: Ein- und Ausgänge (Navigator 2.0/Pro und 10) sowie Raumnamen, Raumdaten und Statistiken (Navigator 2.0/Pro). Nicht für Navigator 1.0/1.7. Benötigt die Netzwerk-PIN des Displays (verschlüsselt gespeichert, unverschlüsselt über Ihr lokales Netzwerk wie in einem Browser übertragen). |
| Diagramm                | Wärmequelle, auszulassende Teile, Räume neben Heizkreisläufen; siehe Abschnitt 8a.                                                                                                                                                                                                                                                       |
| Experteneinstellungen   | Im Expertenmodus des Administrators sichtbar: Port (502), Geräte-ID (1), Anfrage-Timeout, Pause zwischen Anfragen (mindestens 100 ms: Der Navigator bleibt bei hartem Polling hängen), Polling-Intervalle schnell/mittel/langsam/Einstellungen (30 s / 60 s / 300 s / 3600 s) und die Web-Intervalle.                                    |

### Installation

Heizkreisläufe A–G (mit optionalen Namen), Anzahl der Zonenmodule und Räume pro Modul, optionale Registerblöcke (Solar, ISC, Kaskade, Bivalenz, PV- und Leistungswerte, Druckerhöhungspumpen des Navigator 10), der Gerätescan mit _Anwendungsvorschlag_ und zwei Optionen, für welche Zustände existieren:

- **Zustände von Hardware ohne Messwerte ausblenden** (standardmäßig aktiviert): Zustände von Sensoren, Pumpen usw., die in Ihrer Anlage nicht vorhanden sind, werden nicht erstellt. Ein Zustand wird automatisch erstellt, sobald ein gültiger Wert vorliegt, und bleibt dann bestehen: Der Adapter löscht niemals einen bestehenden Zustand (dies geschieht nur durch Deaktivieren eines Registers in den Einstellungen).
- **Hier werden die Zustände von deaktivierten Stromkreisen, Zonen und Blöcken gelöscht** : Dadurch werden die deaktivierten Elemente entfernt.

### Statistiken

Abgeleitete Werte und Statistiken (siehe Abschnitt 6): optionaler externer Stromzähler (Zähler und/oder Leistungszähler) und Wärmezähler, welche Wärmequelle die Effizienzwerte speist, Preis pro kWh (fest oder von einem Staat, in Währung oder Cent pro kWh), Währung, CO₂-Faktor (fest oder von einem Staat, in g oder kg pro kWh), maximales Alter der externen Werte, _Statistiken zurücksetzen_ .

### Kontrolle

Ermöglicht das Schreiben von Daten an die Wärmepumpe. **Alle Funktionen sind standardmäßig deaktiviert** , gruppenweise: Systemmodus und Fehlerbestätigung, Warmwassereinstellungen, jeder Heizkreis, Raumsollwerte und Betriebsarten der Zonenmodule (Navigator Pro), Solarmodus und Zweiwert-/Kaskadenbetrieb (Expertenmodus). Zusätzlich werden die einmalige Warmwassergebühr, die Mindestzeit zwischen zwei Schreibvorgängen einer Einstellung (standardmäßig 60 Sekunden) und ein Warnschwellenwert für Schreibvorgänge pro Einstellung und Tag festgelegt.

### Photovoltaik, Raumsensoren, Gebäudeautomation

Informationen zur Übertragung von Werten aus ioBroker-Zuständen an den Navigator finden Sie in Abschnitt 7.

### Diagnostik

_Erstellen Sie eine Supportdatei_ (Abschnitt 9).

## 4. Der Objektbaum

Alle Zustände befinden sich unterhalb der Instanz (`idm-modbus.0.` Die Namen werden in Ihre ioBroker-Sprache übersetzt.

| Kanal                                              | Inhalt                                                                                                                               |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `info`                                             | `connection`, `family`, `errors`, `lastSuccess`                                                                                     |
| `system`                                           | Außentemperatur, Systemmodus, Fehlernummer `internal_message` und dessen Text `internal_message_text`                                 |
| `dhw`                                              | Warmwasser: Speicher- und Heiztemperaturen, Sollwerte, einmalige Gebühr (`boost_*`)                                                 |
| `hp`                                               | Wärmepumpe: Vor-/Rücklauf, Betriebsart, Kompressoren, Pumpen, Ventile, Bedarf, Fehlerübersicht                                       |
| `hc.A` …`hc.G`                                     | pro Heizkreis: Durchfluss, Raumtemperatur, Betriebsart, Sollwerte, Heizkurve, Grenzwerte                                             |
| `zones.1.rooms.1` …                                | Zonenmodule: Raumtemperatur, Sollwert, Luftfeuchtigkeit, Betriebsart, Relais (Namen aus der Weboberfläche, falls aktiviert)          |
| `energy`                                           | Wärmemengenzähler, Momentanleistung                                                                                                  |
| `solar`, `isc`, `cascade`, `bivalence`, `pv`, `glt` | optionale Blöcke                                                                                                                     |
| `calc`                                             | Berechnete Werte: Temperaturdifferenzen, Strömungsabweichung, momentaner COP                                                         |
| `stats`                                            | Energieverbrauch pro Betriebsart, COP und jährlicher Leistungsfaktor, Kosten, CO₂-Emissionen, Betriebsstunden, Starts, Abtauvorgänge |
| `web`                                              | Ein- und Ausgänge, Raumdaten und Statistiken von der Webschnittstelle                                                                |
| `rooms`                                            | Fütterung bei Raumtemperatur: `writer_conflict`, `last_write` (wie `pv` Und `glt`)                                                     |
| `diagram`                                          | Einstellungen des Wärmepumpendiagramms (`settings`)                                                                                 |
| `diag`                                             | Anfragestatistiken, letzter Fehler, Schreibzähler, Scanstatus                                                                        |

Regeln für die Werte:

- Temperaturen, Temperaturdifferenzen und Zähler (kWh, Stunden) werden **auf eine Dezimalstelle genau** angezeigt.
- Ein Wert, der vom Navigator als _nicht verfügbar_ (Sensor fehlt) gekennzeichnet wird, ist leer und mit einem Qualitätshinweis versehen, niemals eine erfundene Zahl.
- Beschreibbare Zustände werden geschrieben mit `ack=false` Der Adapter bestätigt mit `ack=true` nachdem der Navigator den Wert akzeptiert und zurückgelesen hatte.

## 5. Schrift und ihr Schutz

Jeder Schreibvorgang durchläuft diese Prüfungen: zulässige Gruppe, gültiger Wert (nur dokumentierter Bereich und zulässige Werte), nur wenn er sich vom aktuellen Wert unterscheidet (für EEPROM-Einstellungen), Entprellung (1 s), mindestens 60 s zwischen zwei Schreibvorgängen einer EEPROM-Einstellung (der neueste Wert gewinnt), geschrieben, nach 1 s **wieder ausgelesen** und gezählt (`diag.writes.<id>` Ein plötzlicher Anstieg oder das Überschreiten des täglichen Schwellenwerts löst eine Warnung aus; drei aufeinanderfolgende Fehler sperren eine Einstellung für zehn Minuten. Während der Navigator offline ist, werden keine Anfragen in die Warteschlange gestellt, und ein abgelehnter Wert wird als tatsächlicher Wert angezeigt.

**Einmalige Warmwassergebühr** (Registerkarte „Steuerung“, standardmäßig deaktiviert): `dhw.boost_start` /`dhw.boost_stop` Es schaltet die Warmwasseranforderung (Register 1712) ein, aktualisiert sie alle 30 Sekunden und **schaltet sie immer wieder aus** : bei der Zieltemperatur (Standard 55 °C), nach Ablauf der Zeitbegrenzung (Standard 60 Minuten), auf Anfrage, nach drei fehlgeschlagenen Schreibvorgängen, beim Stoppen des Adapters und nach einem Neustart.

## 6. Statistik

- **Berechnete Werte** (`calc`): Wärmepumpen-Vorlauf minus Rücklauf, Wärmequellen-Einlass minus Auslass, Warmwasser minus Sollwert, Durchflussabweichung pro Heizkreis, momentaner COP (intern von den Leistungsregistern des Navigators, extern, wenn Sie über einen eigenen Zähler verfügen).
- **Energie und Effizienz** (`stats`): elektrische und thermische Energie pro Betriebsart (Heizung, Warmwasser, Kühlung, Abtauung) für heute, diesen Monat, dieses Jahr und seit Beginn, COP und jährlicher Leistungsfaktor (auch die letzten 365 Tage), Kosten zum Preis, der zum Zeitpunkt der Nutzung der Energie gültig war, CO₂ bei der damals gültigen Intensität (`stats.co2.intensity` Zeigt den Betriebsfaktor (Betriebsstunden), die Anzahl der Starts und Kurzläufe pro Kompressor sowie die Anzahl der Abtauzyklen und -stunden. Die Statistiken bleiben auch nach Neustarts erhalten. COP-Grenzwerte: mindestens 50 W, mindestens 0,1 kWh pro Periode.
- **Externe Messgeräte:** Ein Zählerzustand ist bevorzugt (er zählt weiter, auch wenn der Adapter ausgeschaltet ist); ein reiner Strommodus ist integriert. Die Einheit wird aus dem Zustand ausgelesen; falls keine Einheit vorhanden ist, wird diese ausgewählt, andernfalls bleibt die Stromquelle mit einer Warnung ausgeschaltet (der Adapter ermittelt die Einheit nicht automatisch).
- **Webstatistik** (`web.statistics` (PIN erforderlich): Laufzeit, Wärmemenge und elektrischer Energieverbrauch pro Betriebszustand für heute, Monat, Jahr und Gesamt, ein JSON-Verlauf der Tage, Monate und Jahre (zurück zum ersten Betrieb) sowie der daraus berechnete COP. Vergleichen Sie diese Werte mit den Modbus-basierten Daten, bevor Sie sich darauf verlassen; insbesondere der COP für Warmwasser hängt davon ab, wie der Navigator die Energie zuordnet.

## 7. Werte an den Navigator übermitteln

Alle drei Module sind **standardmäßig deaktiviert** , schreiben nur, wenn etwas konfiguriert ist, und lesen das Geschriebene zurück, um einen zweiten Schreiber zu erkennen (`*.writer_conflict`).

![Registerkarte Photovoltaik](../../../../../en/adapterref/iobroker.idm-modbus/docs/images/en/settings-pv.png)

- **Photovoltaik** (Register 74–86): Je ein Block für PV-Überschuss (74), Produktion (78), Hausverbrauch (82, inklusive Wärmepumpe), Batterieentladung (84, positiv = Entladung, negativ = Ladung) und Batterieladestand (86). Jedem Block muss ein Quellstatus zugewiesen werden, damit er Daten sendet; **ein Block ohne Status sendet keine Daten** . Der elektrische Heizstab (76) wird nicht angeboten, sondern vom Navigator automatisch bereitgestellt. Ein Faktor (1 für kW, 0,001 für W, Punkt oder Komma; bewusst kein Standardwert) dient zur Umrechnung in kW. Zusätzlich können Invertierung und Grenzwerte festgelegt werden (ein Grenzwert wird durch Leeren des Feldes gelöscht). Der Überschuss wird direkt aus einem Status übernommen oder als Produktion minus Hausverbrauch berechnet. Jeder konfigurierte Wert wird in jedem Zyklus (standardmäßig 30 s) geschrieben, unabhängig davon, ob er geändert wurde oder nicht, da der Navigator fehlende Daten meldet, wenn keine Werte mehr empfangen werden. Wenn eine Quelle fehlt oder zu alt ist, wird **0** geschrieben (Batteriestand: **-1** , „nicht verfügbar“), damit der Navigator weiterhin alle Werte empfängt und die Wärmepumpe nicht mit einem alten Überschuss weiterläuft. Beim Start warnt der Adapter vor fehlenden Einstellungen (kein Überschussblock, berechneter Überschuss ohne Produktion oder Hausverbrauch, Batteriestand ohne Batterieleistung). Das PV-Menü des Navigators muss eingerichtet sein. Deaktivieren Sie alle anderen Programme, die diese Register beschreiben. Ältere Konfigurationen mit der Zeilentabelle werden beim ersten Start in die Blöcke verschoben.
- **Quellzustände:** Jeder Quellzustand der Registerkarten PV, Raum, Gebäudeautomation und Statistik muss bestätigte Werte enthalten (`ack=true`). Werte geschrieben mit `ack=false` (ein schlichtes `setState(id, value)` (in einem Skript) werden ignoriert, und der Status wird im Protokoll nur einmal genannt. In Skripten verwenden `setState(id, value, true)` Die
- **Raumsensoren** (Register 1650+): Die Temperatur eines Zustands wird als externe Raumtemperatur eines Heizkreises erfasst; die Speicherung erfolgt bei einer Änderung von 0,2 °C oder im 300-Sekunden-Takt (Heartbeat), jedoch nur innerhalb eines Bereichs von 15–30 °C und nicht anhand von Datenquellen, die älter als 15 Minuten sind (oder einem festen Ausweichwert). Im Navigator muss der Raum den Modbus/GLT-Sensor als Temperaturquelle verwenden.
- **Gebäudeautomation** (Register 1690–1722): Außentemperatur, Luftfeuchtigkeit, Temperatur- und Heiz-/Kühl-/Warmwasserbedarf, Speichertemperaturen. Aktivieren Sie zuerst die entsprechende GLT-Option im Navigator (z. B. „GLT Außentemperatur“). Nicht an einem realen Gerät getestet.

## 8. Webinterface (optional)

> **Sprache:** Dieser Teil wurde nur mit der Navigator-Sprache Deutsch getestet und wird nur unterstützt (Allgemeine Einstellungen | Sprache im Display). Bei anderen Sprachen können Statistiken, Teilebezeichnungen und das Diagramm fehlen oder fehlerhaft sein. Der Adapter gibt eine Warnung aus, wenn in den Statistiken unbekannte Bezeichnungen verwendet werden. Alle Modbus-Daten sind sprachunabhängig.

Mithilfe der Display-PIN liest der Adapter die lokalen Webseiten des Navigators (schreibgeschützt): Raumnamen und Namen der Heizkreise (werden als Namen in der Objektstruktur verwendet), Raumtemperatur, Zielwert, Luftfeuchtigkeit und Betriebsmodus pro Raum sowie die Statistiken. Die Weboberfläche ist von IDM nicht dokumentiert und kann sich mit Firmware-Updates ändern. Die Abfrage erfolgt alle 60 Sekunden (Räume, Ein- und Ausgänge) bzw. 15 Minuten (Statistiken); maximal alle 30 Sekunden bzw. 5 Minuten.

Die Ein- und Ausgänge des Informationsmenüs des Navigators werden zu Zuständen unter `web.io`: Sensoreingänge, die Modbus nicht liefert (z. B. Heizvolumenstrom B2 und Kältemittelkreislaufdrücke und -temperaturen), digitale Eingänge (z. B. Warmwasser-Durchflussschalter B1 und Fehlerkontakte), analoge Ausgänge (Pumpen- und Lüftersteuerung, -1 % bedeutet „nicht gesteuert“) und digitale Ausgänge (Pumpen, Ventile, Heizstäbe). Die Bezeichnungen sind englisch und werden, sofern der Adapter das Bauteil kennt, übersetzt; andernfalls verwendet der Navigator eigene Bezeichnungen.

Navigator 10: Die gleichen Eingabe-/Ausgabetabellen werden über den WebSocket des Navigator 10 (Port 61220, PIN-Code des Displays als Login) ausgelesen. Räume, Stromkreisnamen und Statistiken werden dort noch nicht ausgelesen. Dies wurde ausschließlich mit einem simulierten Navigator 10 gemäß dem von Xerolux dokumentierten Protokoll getestet. Bitte berichten Sie über das Verhalten auf einem realen Gerät. Navigator 1.0/1.7: Es gibt keine Weboberfläche zum Auslesen; die entsprechende Option ist ausgeblendet.

Modbus gewinnt: Ein von Modbus geliefertes Teil (der Adapter stimmt mit dem IDM-Tag in den Registernamen überein, z. B. B33, M64) wird nicht aus diesen Tabellen erstellt, und ein von Modbus gelesener Raum hat keinen Eintrag unter `web.rooms` überhaupt nicht (sein Name ist der Staat) `zones.<zone>.rooms.<room>.name` und der Name des Kanals, dessen Werte die Zonenzustände darstellen). Die Webkopie wird nur angezeigt, wenn Modbus keinen Wert hat, beispielsweise für die Ladepumpe M73 im Stillstand (-1 % = nicht angesteuert, kann von Modbus nicht von „nicht verfügbar“ unterschieden werden). Eine bestehende Webkopie bleibt erhalten (es wird nichts gelöscht), aber nur Teile, für die Modbus aktuell keinen Wert meldet, erhalten eine neue.

## 8a. Wärmepumpendiagramm

Das Diagramm ist eine Live-Darstellung Ihrer Anlage auf einer Webseite. Es basiert auf den vom Adapter gelesenen Werten, ist schreibgeschützt und kann nicht verändert werden. Die Seite läuft in Ihrem Browser und bezieht ihre Daten über den ioBroker **-Webadapter** . Daher benötigt sie eine Webinstanz (üblicherweise Port 8082) und keinen eigenen Port.

**Öffnen.** Klicken Sie auf den Link _„Wärmepumpendiagramm“_ neben der Instanz in der Instanzenliste oder öffnen Sie die Seite. `http://<ioBroker computer>:8082/idm-modbus/index.html?instance=0` (Die Zahl gibt die Instanz dieses Adapters an.) Die Seite verwendet die Sprache der ioBroker-Systemeinstellungen.

**So lesen Sie es.** Die folgenden Abbildungen stammen von Beispielwerten (keine echte Pflanze).

- **Orangefarbene** Rohre transportieren das heiße Wasser von der Wärmepumpe (oder einem Heizkessel, Ofen, Solaranlage), **blaue** Rohre den Rücklauf und, während der Abkühlung, das kalte Wasser.
- Ein **dünnes graues** Rohr führt derzeit kein Wasser (entweder wird es im Betriebsmodus nicht verwendet oder die dahinter liegende Pumpe ist ausgeschaltet); auch das Wertschild ist grau.
- **Helle Striche,** die sich entlang eines farbigen Rohrs bewegen, bedeuten, dass dort jetzt Wasser fließt.
- **Grün** (ein Punkt, ein Pumpen- oder Mischersymbol) bedeutet laufend oder angetrieben, Grau bedeutet aus.
- Die Kurzcodes (B33, B38, M73 ...) bezeichnen die IDM-Messpunkte (B = Sensor, M = Aktor); bewegen Sie den Mauszeiger über eine Bezeichnung, um deren Namen anzuzeigen.

![Heizung](../../../../../en/adapterref/iobroker.idm-modbus/docs/images/en/diagram-heating.png)

_Heizung: Die Wärmepumpe (oben links) lädt den Heizspeicher (Mitte), Heizkreis A (rechts) bezieht seine Wärme von ihm. Der Warmwasserspeicher mit Frischwasserentnahmestelle (unten) ist stillgelegt, daher sind seine Leitungen grau. Die Solarthermieanlage (unten links) erwärmt den Speicher über eine Heizschlange._

![Heißes Wasser](../../../../../en/adapterref/iobroker.idm-modbus/docs/images/en/diagram-hot-water.png)

_Warmwasser: Die Anlage läuft im selben Zustand, während die Wärmepumpe den Warmwasserspeicher auflädt. Die Leitungen zum Speicher sind nun farbig markiert, die Leitungen der Wärmepumpe zum Pufferspeicher bleiben unverändert. Der Pufferspeicher versorgt weiterhin Kreislauf A, daher bleiben seine Leitungen farbig._

![Kühlung](../../../../../en/adapterref/iobroker.idm-modbus/docs/images/en/diagram-cooling.png)

_Kühlung: Die Wärmepumpe lädt den Kältespeicher (Mitte, blau), aus dem der Kühlkreislauf seine Kälte bezieht. Alle Kaltwasserleitungen sind blau; Pufferspeicher und Warmwasserspeicher sind nicht enthalten._

**Einstellungen (Registerkarte „Diagramm“).** Diese werden sofort angewendet, die Seite wird neu gezeichnet.

| Einstellung                           | Bedeutung                                                                                                                                                                                                                                                 |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wärmequelle                           | Automatische Auswahl (Luft, Boden oder Grundwasser). Die automatische Auswahl erfolgt anhand der vom Navigator gemeldeten Sensordaten; bei einer falschen Einschätzung muss die Auswahl manuell getroffen werden.                                         |
| Energiequelle und COP                 | Elektrische Leistung, thermische Leistung und COP werden entweder vom Navigator (Standardeinstellung) oder von externen Zählern (Registerkarte „Statistik“) bezogen. Steht kein externer Zähler zur Verfügung, wird der Wert aus dem Navigator verwendet. |
| COP-Reihen                            | Zeigt den COP der ausgewählten Quelle (Standard), beide COPs (Navigator und extern) oder keinen an.                                                                                                                                                       |
| Teile, die weggelassen werden sollten | Pufferspeicher, Warmwasserspeicher, Frischwasserstation, Photovoltaik, Solarthermie, Zweiwertige Energieversorgung. Anlagenteile, die nicht vorhanden sind, werden ohnehin nicht eingezeichnet.                                                           |
| Speicher im Diagramm                  | Ein Behälter (ein Hygienik mit Schichtplatte: Heizpuffer und Warmwasser teilen sich diese) oder zwei Behälter (ein separater Heizpuffer neben einem Hygienik oder AQA). Die Sensoren können die beiden nicht unterscheiden.                               |
| Größe des Diagramms (%)               | Die Größe des Diagramms wird in Prozent der Originalgröße angegeben (Standardwert: 90).                                                                                                                                                                   |
| Räume neben Heizkreisläufen           | Standardmäßig befinden sich die Räume des Zonenmoduls 1 neben Heizkreis A, die des Moduls 2 neben Heizkreis B usw. Fügen Sie eine Zeile hinzu, um ein Zonenmodul neben einem anderen Heizkreis zu platzieren.                                             |

**Was Sie sehen.** Das Diagramm setzt sich von selbst zusammen: Ein Teil erscheint nur dann, wenn der Adapter einen realen Wert dafür hat.

- **Wärmepumpe** (links): Elektrische und thermische Leistung, COP, Heizvolumenstrom (B2), Sensoren der Wärmequelle (z. B. Lufteinlass B37), Pumpenstatus (M73), Betriebsart und links davon die Außentemperatur (B32). Der Lüfter dreht sich mit der Lüfterspannung M13 oder während des Kompressorbetriebs. Eine Erd- oder Grundwasserwärmepumpe (mit Sensoren und Pumpen für die Wärmequelle, ohne Lufteinlass) zeigt anstelle des Lüfters ein Pumpensymbol an, die Sensoren für die Wärmequellenpumpen sind M15 und M16.
- **Speicher** (Mitte): Warmwasser oben (B48) und in der Mitte (B41), Wärmespeicher unten (B38). Drei Leitungen führen zur Wärmepumpe: Heißgasleitung (B35), Vorlauf (B33) und Rücklauf (B34). Ein Speicher mit weniger Sensoren zeigt weniger Füllstände an.
- **Frischwasserentnahmestelle** (rechts vom Speicher, wenn die Entnahmetemperatur B42 angezeigt wird): Wärmetauscher, Kaltwasserzulauf und Wasserhahn mit B42 und Warmwasser-Sollwert. Der Tropfen leuchtet, solange Warmwasser entnommen wird (Durchflussschalter B1).
- **Zwei Behälter:** Bei Anlagen mit separatem Heizpuffer hängt der Warmwasserbehälter unterhalb des Puffers und wird über eigene Leitungen befüllt. Eine Kälteanlage mit Kaltwasserspeicher (B40) stellt ihn als separaten Behälter dar. Anlagen ohne Heizpuffer führen die Leitungen direkt zu den Heizkreisläufen.
- **Heizkreisläufe** (rechts): Eine Karte pro Kreislauf mit Vorlauftemperatur (B51 für Kreislauf A, B52 für B usw.), Sollwert, Raumtemperatur, Pumpe (M31 für A, M32 für B usw.) und Mischer (M41 usw.). Der Punkt in der Ecke der Karte leuchtet grün, solange die Kreislaufpumpe läuft. Ein Kreislauf mit Pumpe, aber ohne Mischer, ist ein Direktkreislauf. Die Räume des Zonenmoduls N befinden sich neben Kreislauf N; weitere Kreisläufe sind übereinander angeordnet.
- **Solarthermie** (unten links, falls vorhanden): Kollektor (B73), Speicherschlange, Lade- (B74) und Rücklaufleitungen (B75), Solarpumpen (M75, M76) und weitere Solarsensoren im Gehäuse. Die Solarleitungen bewegen sich während des Pumpenbetriebs (ohne Pumpenwerte: B74 ist deutlich wärmer als B75).
- **Heizstab und Umwälzpumpe:** die Stufen des elektrischen Heizstabs und der Warmwasserumwälzpumpe (M64), in denen das Werk sie meldet.
- **Weitere Wärmeerzeuger** (unten links): eine Kaskade von Wärmepumpen (die für Heizung, Kühlung und Warmwasserbereitung verfügbaren Stufen laufen; die Sensoren der anderen Einheiten sind nicht sichtbar), ein Öl- oder Gaskessel (Prioritätsventil M111) und ein Kachelofen (Pumpe M88, Sensor B84). Ihre Leitungen sind mit dem Heizspeicher oder, falls keiner vorhanden ist, mit den Wärmepumpenleitungen verbunden und bewegen sich während des Betriebs. Der Kessel wird stets vom Heizspeicher gespeist, kann aber über seine Ventile auch auf den Warmwasserspeicher umschalten.
- **Energiefelder** (unten): Photovoltaik, Batterie, Überschuss, Haus- und Wärmepumpenstrom. Sie sind nicht an die Wärmepumpe gekoppelt.

![Kessel](../../../../../en/adapterref/iobroker.idm-modbus/docs/images/en/diagram-boiler.png)

_Ein Öl- oder Gaskessel (unten links) speist den Heizpuffer während des Betriebs; ein Kachelofen funktioniert nach dem gleichen Prinzip._

![Kaskade](../../../../../en/adapterref/iobroker.idm-modbus/docs/images/en/diagram-cascade.png)

_Eine Kaskade aus zwei Wärmepumpen: Die Karte (unten links) zeigt, wie viele Stufen der für Heizung und Warmwasser verfügbaren Wärmepumpen in Betrieb sind; ihre Rohre sind mit den Wärmepumpenrohren verbunden._

**Pumpen und Mischer.** Pumpen (die Ladepumpe M73, die Frischwasserpumpe M22, die Heizkreispumpe M31 und die Quellpumpen einer Erdwärmepumpe) werden als kleines Pumpensymbol dargestellt: grün im Betrieb, grau im Stillstand, jeweils mit Angabe der Drehzahl. Der Heißgasmischer M71 (im Wärmepumpengehäuse) und der Mischer M41 des Heizkreises A (die vom Navigator angezeigte Information) werden als Ventilsymbol dargestellt, grün im Betrieb. M71 und der Lüfter M13 sind 0-10-V-Ausgänge und werden mit 0-100 % angezeigt. Der Pumpenkreis leuchtet grün, solange die Pumpe läuft. Mischer sowie die Pumpen M22, M31 und M73 benötigen die Werte der Webschnittstelle.

**Farben und Bewegung.** Heizungsrohre sind orange (Vorlauf) und blau (Rücklauf), der Speicher verläuft von heiß (oben) nach kalt (unten). Das Wasser folgt dem jeweiligen Betriebsmodus: Während die Wärmepumpe heizt, sind die Rohre zum Heizspeicher und den Heizkreisen farbig markiert; während sie Warmwasser liefert, die Rohre zum Warmwasserspeicher; während sie abkühlt, sind alle Kaltwasserrohre blau und führen zum Kaltwasserspeicher (oder direkt zu den Heizkreisen ohne Speicher). Ein Rohr ist nur dann farbig markiert, wenn tatsächlich Wasser hindurchfließt (die Heizkreise beziehen weiterhin Wasser aus dem Heizspeicher, auch wenn die Wärmepumpe selbst ausgeschaltet ist oder abtaut); ein Rohr im aktiven Kreislauf, dessen Pumpe ausgeschaltet ist, und alle Rohre, die im aktuellen Betriebsmodus nicht genutzt werden, bleiben dünn und grau, ebenso wie die Wertangaben darauf. Lichtstriche bewegen sich entlang eines farbigen Rohrs, während etwas in Betrieb ist: die Ladepumpe M73 oder der Durchflusssensor B2 für die Wärmepumpenleitungen, der Mischer M71 und das Wasser für die Warmgasleitung, die Kreiselpumpe (M31, M32, ...) für die Leitungen eines Kreislaufs, die Station während der Warmwasserentnahme (alle vier Leitungen der Station während des Betriebs) oder die Solarpumpen für den Solarkreislauf. Wenn Sie den Mauszeiger über eine Beschriftung bewegen, die nur ein Tag und einen Wert anzeigt (z. B. B38), wird der Name des entsprechenden Bauteils angezeigt.

**Woher die Werte stammen?** Hauptsächlich von Modbus. Einige wenige sind nur in der Weboberfläche verfügbar (Durchflussrate B2, Warmwasser-Durchflussschalter B1, Pumpe M22, Lüfterspannung M13, Pumpe M31): Aktivieren Sie _die Weboberfläche_ und geben Sie die Display-PIN ein, um diese anzuzeigen. Wenn sowohl Modbus als auch die Weboberfläche einen Wert liefern, wird Modbus verwendet.

**Nur mit Modbus.** Wenn die Weboberfläche deaktiviert oder nicht verfügbar ist, werden alle Modbus-Daten wie gewohnt dargestellt. Folgende Informationen fehlen: die Pumpen- und Mischerzeilen der Kreisläufe, die Stationspumpe M22 und der Durchflussschalter B1, die Lüfterspannung M13, der Durchfluss B2, der Heißgasmischer M71, die Solarpumpen, die Heizstabstufen, der Kessel und der Ofen sowie die Raum- und Kreislaufbezeichnungen. Das Diagramm verwendet dann die verbleibenden Informationen und gibt nie mehr an, als es tatsächlich weiß: Ein Kreislauf ohne Pumpenstatus zeigt seinen Betriebsmodus durch einen Punkt an, und seine Rohre sind entsprechend dem Betriebsmodus farbig dargestellt, aber nicht animiert; die Frischwasserstation ist farbig dargestellt, aber nicht animiert (es wird nicht angezeigt, ob Warmwasser entnommen wird); der Lüfter dreht sich, solange der Kompressor läuft; der Solarkreislauf folgt den Sensoren B74 und B75.

Die Seite **bleibt stets aktuell.** Sie vergleicht jede Minute alle Werte mit dem Server, zeigt die aktuellen Werte nach einer Verbindungsunterbrechung zum Webadapter an, versucht einen fehlgeschlagenen Ladevorgang erneut, stellt die Verbindung wieder her, sobald keine Antwort mehr erfolgt, und aktualisiert die Seite, sobald ein im Hintergrund laufender Tab wieder sichtbar wird. Eine Statuszeile am oberen Rand zeigt den Zeitpunkt der letzten Aktualisierung an.

**Gut zu wissen.** Die Räume werden den Heizkreisen über die Zonenmodulnummer zugeordnet (Zone 1 zu Heizkreis A, Zone 2 zu Heizkreis B usw.); dies ist eine Annahme. Die Heizkreise sind für die Heizkreise A bis G mit B51 bis B57 (Vorlauf) und B61 bis B67 (Raum) nummeriert. Die Erd- und Grundwasservariante sowie der Solarblock wurden bisher noch nicht in einer realen Anlage eingesetzt.

## 9. Unterstützung

Registerkarte _„Diagnose“_ → **Supportdatei erstellen** : Ein Bericht für Fehlerberichte mit der Konfiguration (ohne Host-, PIN- und Status-IDs), dem Verbindungsstatus, Registern ohne Wert, dem letzten Messwert jedes Registers und dem letzten Scan-Ergebnis. IP- und E-Mail-Adressen werden entfernt. Die Datei wird in einem neuen Tab geöffnet und im Dateibereich gespeichert. `support` (Die letzten fünf Dateien). Hängen Sie diese zusammen mit dem Adapterprotokoll an (stellen Sie den Protokollierungsgrad auf _Debug_ , um Verbindungsprobleme zu erkennen).

## 10. Fehlerbehebung

| Symptom                                                 | Ursache / Abhilfe                                                                                                                                                                                                                             |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Verbindungstest_ fehlgeschlagen                        | Modbus TCP ist auf dem Navigator nicht aktiviert, falsche IP-Adresse oder ein anderer Client blockiert den Port.                                                                                                                              |
| Verbindung besteht, aber keine Außentemperaturanzeige   | Geräte-ID ungleich 1 (Experteneinstellungen).                                                                                                                                                                                                 |
| Viele leere Staaten                                     | Hardware, die Ihre Anlage nicht besitzt: Lassen Sie _die Option „Status von Hardware ausblenden, die keinen Wert meldet“_ aktiviert oder führen Sie den Scan aus und wenden Sie den Vorschlag an.                                             |
| Falsche oder fehlende Werte nach dem Generationswechsel | Wählen Sie die Generation aus, die die Testschaltfläche meldet.                                                                                                                                                                               |
| Der Navigator wird langsam                              | Die Abfrageintervalle bzw. die Pause zwischen den Anfragen sind zu kurz; behalten Sie die Standardeinstellungen bei.                                                                                                                          |
| Der Scan stoppt bei etwa 25 %.                          | Der Adapter wurde während des Scans neu gestartet (auch durch eine Konfigurationsspeicherung); starten Sie ihn erneut und lassen Sie den Adapter in Ruhe.                                                                                     |
| `web.connected` ist falsch                              | Falsche PIN, Webinterface nicht erreichbar oder PIN auf dem Navigator nicht festgelegt.                                                                                                                                                       |
| Das Diagramm lässt sich nicht öffnen                    | Installieren und starten Sie eine Webadapter-Instanz; die Seite wird von dieser bereitgestellt (`/idm-modbus/` Nutzen Sie den Link neben der Instanz; er enthält die Instanznummer.                                                           |
| Im Diagramm fehlt ein Teil.                             | Der Adapter ist dafür wertlos: Die Anlage verfügt nicht darüber, er ist im Installationsmenü nicht aktiviert oder (Durchflussrate, Pumpen, Lüfterspannung) die Weboberfläche ist deaktiviert.                                                 |
| Ein Schreibvorgang hat keine Wirkung                    | Prüfen Sie, ob die Gruppe im Register „Steuerung“ aktiviert ist; im Protokoll wird der Grund angegeben (Bereich, gleicher Wert, Intervall, Sperre). Raum-Sollwerte sind nur wirksam, wenn sich der Raum im Betriebsmodus _„Normal“_ befindet. |

## 11. Bekannte Grenzwerte

- Die Registerdateien für Navigator 10 und 1.0/1.7 stammen aus den IDM-Dokumenten und wurden nicht an realen Geräten getestet; Scans von anderen Besitzern bestätigen ihre Korrektheit. Die Spulenregister 1.7 (3000–3003) werden nicht unterstützt.
- Der Navigator kann falsche Daten liefern, wenn sich überlappende Register in einem Block lesen; der Adapter liest die betroffenen Register (z. B. Raumfeuchtigkeit und Modus) nacheinander.
- Ein in der Navigator-App erstellter Modbus-Raum kann von diesem Adapter noch nicht versorgt werden; die Art und Weise, wie der Navigator seine Temperatur erwartet, ist noch offen.

## 12. Impressum und Haftungsausschluss

Die Registerdefinitionen folgen den IDM Modbus TCP-Dokumenten (Navigator 2.0: 812170 Rev.10, Navigator 10: 812663 Rev.0, Navigator 1.0/1.7: 812049 Rev.1). Vielen Dank an **Xerolux** ( [idm-heatpump-api](https://github.com/Xerolux/idm-heatpump-api) , [idm-heatpump-hass](https://github.com/Xerolux/idm-heatpump-hass) , MIT) für die Vergleichsdaten und die frühzeitige Entdeckung vieler Gerätebesonderheiten. Dies ist ein unabhängiges Community-Projekt und steht in keiner Verbindung zu IDM Energiesysteme GmbH und wird von dieser auch nicht unterstützt. Die Nutzung erfolgt auf eigene Gefahr, insbesondere beim Schreiben von Code.