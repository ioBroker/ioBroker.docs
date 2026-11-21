---
chapters: {"pages":{"en/adapterref/iobroker.mill-local/README.md":{"title":{"en":"ioBroker.mill-local"},"content":"en/adapterref/iobroker.mill-local/README.md"},"en/adapterref/iobroker.mill-local/README_de.md":{"title":{"en":"ioBroker.mill-local – Kurzbeschreibung auf Deutsch"},"content":"en/adapterref/iobroker.mill-local/README_de.md"},"en/adapterref/iobroker.mill-local/vis-templates/README.md":{"title":{"en":"vis templates for ioBroker.mill-local"},"content":"en/adapterref/iobroker.mill-local/vis-templates/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mill-local/vis-templates/README.md
title: vis-Vorlagen für ioBroker.mill-local
hash: /j2yHNFBVgOb9cCNHbhI0XzyzOWdKGoZwv1tTlK6O5Q=
---
# vis-Vorlagen für ioBroker.mill-local

Vorgefertigte Ansichten für **Vis 1** (`iobroker.vis` 1.x). Sie verwenden nur Datenpunkte von `mill-local.0` Die eigenen vis-Widgets des Adapters (auf _„mill-local“_ eingestellt) funktionieren daher auf jeder Installation dieses Adapters: keine Skripte, kein Diagrammadapter erforderlich. Dunkles und helles Design (jedes Widget passt sich standardmäßig den Browsereinstellungen an, Attribut _„Farbschema“_ ), 1280 × 800 px für Tablets und Desktop-Computer sowie eine 390 px breite Ansicht für Smartphones. Die Texte stammen aus den Widgets und werden in der vis-Sprache (elf Sprachen) angezeigt.

| Datei                                              | Inhalt                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view_Mill_Uebersicht.json`                        | Startseite: Eine Karte pro Gerät (Raumtemperatur, Laufzeit oder Betriebsmodus, Zielwert mit −/+, Ein/Aus, aktuelle Leistung, heutiger Energieverbrauch), Gesamtleistung und Gesamtenergie sowie die heutigen Laufzeiten aller Geräte. Durch Antippen einer Karte wird deren Detailseite geöffnet. |
| `view_Mill_Geraet1.json` …`view_Mill_Geraet4.json` | Detailseite pro Gerät: Raumtemperatur mit Laufzeit (z. B. _Komfort (22 °C) bis 22:00 Uhr_ ), Zielwert mit − / +, Werte, Betriebsmodus, Wochenprogramm als Raster (nur Anzeige) und Verlaufsdiagramm.                                                                                              |
| `view_Mill_Handy.json`                             | Telefon: eine Kompaktkarte pro Gerät mit − / +.                                                                                                                                                                                                                                                   |

## Import

1. Ersetzen Sie vor dem Import die Platzhalter in **allen** Dateien (beliebiger Texteditor, „Alle ersetzen“): `mill-local.0.DEVICE_1` …`mill-local.0.DEVICE_4` → Ihre Geräte, z. B. `mill-local.0.94e686001234` (Das Geräteobjekt ist der Ordner direkt darunter) `mill-local.0` (Der Name entspricht der MAC-Adresse). Weniger Geräte: Löschen Sie die Widgets der fehlenden Geräte; mehr Geräte: Kopieren Sie eine Karte und legen Sie deren Geräteattribut fest.
2. Öffnen Sie den Vis-Editor (`http://<iobroker>:8082/vis/edit.html` Für jede Ansicht: Registerkarte **Ansichten** → **Ansicht importieren** , Inhalt einfügen von `view_<Name>.json` und geben Sie den Namen **genau** so ein, wie er im Dateinamen steht (`Mill_Uebersicht`, `Mill_Geraet1` …, `Mill_Handy` Die Karten und der Backlink führen zu diesen Namen.
3. Speichern. Öffnen. `…/vis/index.html#Mill_Uebersicht` (Tablette) oder `…#Mill_Handy` (Telefon).

Nach der Installation oder Aktualisierung des Adapters erstellt Vis beim Neustart seine Widget-Liste neu (der Adapter fordert diesen Neustart selbst an; falls die Widgets fehlen, muss Vis neu gestartet werden). `vis` (einmalig).

## Verlaufsdiagramm

Das Diagramm zeigt die Raumtemperatur, den vom Gerät eingestellten Sollwert (Linienlinie) und die aktuelle Leistung (Fläche, rechte Achse) sowie die Luftfeuchtigkeit an den WLAN-Steckdosen in einem kleinen Feld darunter – für die letzten 24 Stunden (Rohwerte) oder 7 Tage (stündlicher Mittelwert). Es liest die Werte aus, die ein Verlaufsadapter aufgezeichnet hat.

- **Datenquelle:** Attribut _„History“ der Widget-Instanz_ – z. B. `history.0`, `influxdb.0` oder `sql.0`; leer = die Standard-Verlaufsinstanz des Systems ( _Systemeinstellungen → Standardverlauf_ ).
- **Die Aufzeichnung liegt in Ihrer Verantwortung; der Adapter schaltet standardmäßig keine Aufzeichnung ein.** Aktivieren Sie die Aufzeichnung für jeden Datenpunkt in der Objektstruktur (Zahnradsymbol des Datenpunkts → Ihr Verlaufsadapter → aktiviert; „Nur Änderungen“ genügt):

  | Datenpunkt                                | Angezeigt als                                                            |
  | ----------------------------------------- | ------------------------------------------------------------------------ |
  | `<device>.sensor.temperature`             | Raumtemperatur                                                           |
  | `<device>.status.activeTargetTemperature` | Ziel (der aktuell laufende Zeitraum, leer, solange er ausgeschaltet ist) |
  | `<device>.status.power`                   | aktuelle Leistung                                                        |
  | `<device>.sensor.humidity`                | Luftfeuchtigkeit (nur WLAN-Steckdose)                                    |
  | `<device>.control.targetTemperature`      | optional, das normale Ziel (nützlich für Auswertungen)                   |

  Ohne eine Aufzeichnung zeigt das Diagramm an, welcher Datenpunkt fehlt.

## Was schreibt, was zeigt nur an

- Schreiben: die − / + Tasten (`control.targetTemperature`, 0,5 °C Schritte, 5 … 35 °C), ein/aus (`control.power`) und der Betriebsmodus (`control.operationMode`) – die gleichen Zustände wie die Gerätekarte im Adminbereich, mit den gleichen Prüfungen.
- Es wird nur das Wochenprogramm angezeigt; die Bearbeitung erfolgt im Adminbereich auf der Gerätekarte (Kalender-Schaltfläche).

---

## Deutsch

Fertige Ansichten für **vis 1** , nur mit Datenpunkten aus `mill-local.0` und den Widgets des Adapters (Satz _mill-local_ ) – keine Skripte, kein Diagramm-Adapter. Dunkel und hell (jedes Widget folgt standardmäßig der Browsereinstellung, Attribut _Farbschema_ ), 1280 × 800 px und 390 px breit fürs Handy. Die Texte kommen aus den Widgets in der vis-Sprache.

- **Ansichten:** `Mill_Uebersicht` (je Gerät eine Karte, Gesamtleistung, heutige Abschnitte aller Geräte), `Mill_Geraet1` …`Mill_Geraet4` (Raumtemperatur mit laufendem Abschnitt, Soll − / +, Werte, Betriebsart, Wochenprogramm als Raster zum Ansehen, Verlauf), `Mill_Handy` Die
- **Importieren:** In alle Dateien `mill-local.0.DEVICE_1` …`DEVICE_4` durch die eigenen Geräteobjekte ersetzen (Ordner direkt unter `mill-local.0`, Name = MAC-Adresse), dann im vis-Editor unter _Ansichten → Ansicht importiert_ jede Datei mit genau dem Namen aus dem Dateinamen anlegen.
- **Verlauf:** Raumtemperatur, Soll (Stufenlinie), aktuelle Leistung (Fläche, rechte Achse), bei der Steckdose die Luftfeuchte; 24 h (Rohwerte) oder 7 Tage (Mittel je Stunde). Datenquelle im Widget-Attribut _Verlaufs-Instanz_ (`history.0`, `influxdb.0`, `sql.0` …; leer = Standard-History des Systems). **Die Aufzeichnung schaltet den Anwender ein, der Adapter tut es nicht:** im Objektbaum am Zahnrad des Datenpunkts, für `sensor.temperature`, `status.activeTargetTemperature`, `status.power`, `sensor.humidity` (Steckdose) und optional `control.targetTemperature` Die
- **Schreiben Sie** nur Soll − / +, Ein/Aus und Betriebsart. Das Wochenprogramm wird nur angezeigt und im Admin über die Gerätekarte bearbeitet.