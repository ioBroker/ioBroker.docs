---
chapters: {"pages":{"en/adapterref/iobroker.faikout/README.md":{"title":{"en":"ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/README.md"},"en/adapterref/iobroker.faikout/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.faikout"},"content":"en/adapterref/iobroker.faikout/vis-templates/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.faikout/vis-templates/README.md
title: vis-Vorlagen für ioBroker.faikout
hash: w4MZLnTpfSnD5ypLzNix/w+uZMG1Vl5hHk9PxNjbouU=
---
# vis-Vorlagen für ioBroker.faikout

Vorgefertigte Ansichten für **Vis 1** (`iobroker.vis` 1.x) für zwei Klimaanlagen. Sie verwenden nur Datenpunkte von `faikout.0` Die eigenen VIS-Widgets des Adapters (auf _„faikout“_ gesetzt) funktionieren daher mit jeder Installation dieses Adapters: ohne Skripte, ohne weitere Adapter, ohne Diagrammadapter. Dunkles Design, 1280 × 800 px für Tablets und Desktop-Computer sowie eine 412 px breite Ansicht für Smartphones. Die Beschriftungen sind auf Deutsch (eine deutsche Zusammenfassung folgt unten).

| Datei                                                    | Inhalt                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view_Faikout_Uebersicht.json`                           | Startseite: Eine Karte pro Gerät – Raum- und Solltemperatur, Betriebsmodus (Farbe richtet sich nach dem Betriebsmodus), Lüfter, Lüftungsschlitze, Voreinstellung, Außentemperatur, Luftfeuchtigkeit, Leistung, Kompressor, Lüfterdrehzahl, Kältemittel, Energieverbrauch heute (Heizen/Kühlen), gestern, diesen/letzten Monat, Zählerstände, Anschluss. Durch Antippen einer Karte wird deren Detailseite geöffnet. |
| `view_Faikout_Geraet1.json` /`view_Faikout_Geraet2.json` | Detailseite pro Gerät: Sollwertbogen mit − / + und Ein/Aus, Modus, Lüftergeschwindigkeit, Zusatzfunktionen (Swing, Econo, Power, Comfort, Streamer – je nachdem, was das Gerät hat), alle Temperaturen, aktueller Betrieb, Energietabelle, Anschluss.                                                                                                                                                               |
| `view_Faikout_Energie.json`                              | Energie: Balkendiagramm pro Einheit (letzte 24 Stunden / 31 Tage / 12 Monate, Heizung und Kühlung getrennt) und eine Tabelle Stunde/Tag/Monat.                                                                                                                                                                                                                                                                      |
| `view_Faikout_Handy.json`                                | Telefon: Kompaktkarte plus Bedienelemente für beide Einheiten, eine unter der anderen (412 × 2338 px, scrollbar).                                                                                                                                                                                                                                                                                                   |

## Anforderungen

- `iobroker.faikout` **Version 0.0.18 oder neuer** – die Widgets älterer Versionen wurden in der Vis-Laufzeitumgebung nicht gerendert (sie zeigten nichts an und wurden protokolliert). `missing ) after argument list`).
- Nach der Installation oder Aktualisierung des Adapters muss vis seine Widget-Liste neu erstellen: Starten Sie vis neu. `vis` Instanz einmalig.

## Import

1. Ersetzen Sie vor dem Import die Platzhalter in **allen** Dateien (beliebiger Texteditor, „Alle ersetzen“):

   - `faikout.0.DEVICE_1` → Ihre erste Einheit, z. B. `faikout.0.Living_room`
   - `faikout.0.DEVICE_2` → Ihre zweite Einheit
   - optional: die Anzeigenamen `Gerät 1` /`Gerät 2`

   Das Geräteobjekt ist der Ordner direkt darunter `faikout.0` (der Hostname des Moduls mit `_` (anstelle von Leerzeichen). Anderes Beispiel? Verwenden Sie z. B. `faikout.1.` stattdessen.
2. Öffnen Sie den Vis-Editor (`http://<iobroker>:8082/vis/edit.html` Für jede Ansicht: Registerkarte **Ansichten** → **Ansicht importieren** , Inhalt einfügen von `view_<Name>.json` und geben Sie den Namen **genau** so ein, wie er im Dateinamen steht (`Faikout_Uebersicht`, `Faikout_Geraet1`, `Faikout_Geraet2`, `Faikout_Energie`, `Faikout_Handy` Die Navigationsschaltflächen verlinken zu diesen Namen (`#Faikout_Geraet1` …).
3. Speichern. Öffnen. `…/vis/index.html#Faikout_Uebersicht` (Tablette) oder `…#Faikout_Handy` (Telefon).

Nur eine Einheit? Import `Faikout_Geraet1` Und `Faikout_Energie` Löschen Sie die zweite Karte in der Übersicht und den zweiten Block in der Telefonansicht.

## Was schreibt, was zeigt nur an

- Displaykarten sind HTML-Widgets mit Vis-Bindungen – sie schreiben nie.
- Das Schreiben erfolgt ausschließlich durch die Bedienelemente des Adapters (Bogen -/+, Ein-/Ausschalter, Modus, Lüftergeschwindigkeit, Zusatzfunktionen). Sie schreiben an `faikout.0.<unit>.control.*` d. h. nur auf Datenpunkte, die der Adapter als beschreibbar erstellt, und nur auf solche, die das Gerät tatsächlich meldet. Das Gerät bestätigt dies innerhalb von etwa einer Sekunde.
- Die Ansichten enthalten keine weiteren Steuerelemente.

## Einheiten und fehlende Werte

- Kompressor (`status.comp`) und Ventilator (`status.fanfreq` Die Drehzahl wird in **Hz** angezeigt – dem Standardwert des Moduls. Wenn Ihr Modul Drehzahl in U/min meldet (Einstellungen `ha.comprpm` /`ha.fanrpm`), ersetzen Sie jedes `Hz` in den Dateien von `rpm` – Der Text erscheint erst nach diesen beiden Werten (die Widgets des Adapters übernehmen die Einheit automatisch aus dem Objekt).
- Ein Wert, den das Gerät nicht anzeigt (z. B. die Luftfeuchtigkeit bei vielen Modellen), wird angezeigt `–` Die
- Die Energiewerte stammen aus dem Verbrauchszweig des Adapters (`consumption.<total|heating|cooling>.*` Sie erscheinen, nachdem das Modul seine Energiezähler mindestens einmal gesendet hat.

## Anmerkungen zur Bearbeitung

- vis 1 behandelt jeden `{…}` in einer Zeile als Bindung. Die Formeln in diesen Vorlagen enthalten daher keine `;`, `{` oder `}` Bitte behalten Sie die Änderungen bei, wenn Sie sie bearbeiten.
- Die Ansichten wurden generiert mit `werkzeuge/vis_vorlagen.py` in diesem Repository.

---

## Deutsch

Fertige Ansichten für **Vis 1** für zwei Klimaanlagen, nur mit Datenpunkten aus `faikout.0` und den Widgets des Adapters – keine Skripte, keine weiteren Adapter. Dunkles Design, 1280 × 800 px (Tablet) und 412 px breit (Handy).

- **Ansichten:** `Faikout_Uebersicht` (Start, je Anlage eine Karte), `Faikout_Geraet1` /`Faikout_Geraet2` (Bedienung und alle Werte), `Faikout_Energie` (Säulen 24 h / 31 Tage / 12 Monate, Tabelle), `Faikout_Handy` (beide Anlagen untereinander).
- **Voraussetzung:** `iobroker.faikout` ab **0.0.18** (vorher zeichnete die vis-Laufzeit die Widgets nicht); Nach dem Adapter-Update die vis-Instanz einmal neu starten.
- **Importieren:** In alle Dateien `faikout.0.DEVICE_1` und `faikout.0.DEVICE_2` durch die eigenen Geräteobjekte ersetzen (optional die Namen `Gerät 1` /`Gerät 2`), dann im vis-Editor unter _Ansichten → Ansicht importiert_ jede Datei mit genau dem Namen aus dem Dateinamen anlegen.
- **Schreiben** Sie nur die Adapter-Widgets (Bogen − / +, Ein/Aus, Betriebsart, Lüfter, Zusatzfunktionen) – ausschließlich auf die beschreibbaren Datenpunkte `control.*` Die Karten zeigen nur an.
- **Einheiten:** Verdichter und Lüfter stehen in Hz (Werkseinstellung des Moduls). Meldet das Modul rpm, in den Dateien jedes `Hz` durch `rpm` ersetzen (kommt nur bei diesen beiden Werten vor). Fehlende Werte zeigen `–` Die