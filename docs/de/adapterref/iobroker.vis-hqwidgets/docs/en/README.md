---
chapters: {"pages":{"en/adapterref/iobroker.vis-hqwidgets/README.md":{"title":{"en":"ioBroker.vis-hqWidgets"},"content":"en/adapterref/iobroker.vis-hqwidgets/README.md"},"en/adapterref/iobroker.vis-hqwidgets/docs/en/README.md":{"title":{"en":"hqWidgets for vis-2"},"content":"en/adapterref/iobroker.vis-hqwidgets/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-hqwidgets/docs/en/README.md
title: hqWidgets für vis-2
hash: /M+98MJ2PghX4NN7Ca0pkC7C7OKA3wNZfhA5K0ZoBcc=
---
# hqWidgets für vis-2

Die hqWidgets sind zehn Widgets für Schalter, Dimmer, Thermostate, Fenster, Türen und Theken. Diese Seite beschreibt die Version **vis-2** . vis (vis-1) bietet dieselben Widgets mit denselben Einstellungen, allerdings mit leicht abweichender Darstellung.

![Alle Widgets](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/overview.png)

**Inhalt**

- [Allgemein](#general)
  - [Anforderungen und Migration](#requirements-and-migration)
  - [Im Editor eingegebene Werte](#values-entered-in-the-editor)
  - [Beschreibungen](#descriptions)
  - [Indikatoren](#indicators)
  - [Stile und Änderungseffekte](#styles-and-change-effects)
  - [Dunkles Thema](#dark-theme)
  - [Einstellungen, die von den runden Widgets gemeinsam genutzt werden](#settings-shared-by-the-round-widgets)
- [Ein/Aus](#onoff---tplhqbutton)
- [Dimmer](#dimmer---tplhqdimmer)
- [Innentemperatur](#inner-temperature---tplhqintemp)
- [Außentemperatur](#outdoor-temperature---tplhqouttemp)
- [Fenster und Fensterladen](#window-and-shutter---tplhqshutter)
- [Tür](#door---tplhqdoor)
- [Sperren](#lock---tplhqlock)
- [Kontrollkästchen](#checkbox---tplhqcheckbox)
- [Kreisknopf](#circleknob---tplhqcircle)
- [Kilometerzähler](#odometer---tplhqodometer)
- [Unterschiede zu vis-1](#differences-to-vis-1)

## Allgemein

### Anforderungen und Migration

Die Widgets befinden sich im Widget-Set **„hqWidgets“** in der Widget-Liste des vis-2-Editors. Die hier beschriebenen React-Versionen benötigen **vis-2 Version 2.12.8** oder neuer. Ältere vis-2-Versionen zeigen stattdessen die vis-1-Widgets an.

Mit vis-1 erstellte Projekte funktionieren weiterhin ohne Änderungen. Beide Versionen verwenden dieselben Widget-IDs (`tplHqButton`, `tplHqDimmer`, ...) und dieselben Attributnamen, und vis-2 wählt die React-Version automatisch aus. Alle Einstellungen werden übernommen.

In den folgenden Tabellen ist **„Einstellung“** die Bezeichnung im vis-2-Editor und **„Attribut“** der im Projekt gespeicherte Name. Verwenden Sie den Attributnamen, wenn Sie ein Projekt in JSON bearbeiten oder Einstellungen zwischen Widgets kopieren.

### Im Editor eingegebene Werte

Manche Einstellungen benötigen einen Wert, der in einen Zustand geschrieben wird, beispielsweise _der Ein-_ und _Aus-Wert_ des Ein/Aus-Widgets oder _der Schließwert_ des Schlosses. Der Editor speichert diese als Text, und das Widget wandelt den Text folgendermaßen um:

| Eingegebener Text      | An den Staat geschrieben       |
| ---------------------- | ------------------------------ |
| `true` /`false`        | boolescher Wert `true` /`false` |
| `0`, `1`, `42.5`, ... | Nummer                         |
| irgendetwas anderes    | den Text, wie er ist           |
| (leer)                 | die Standardeinstellung        |

### Beschreibungen

Die runden Symbole – Fenster, Tür und Schloss – können links neben dem Symbol eine Beschriftungsbox anzeigen. Die rechten Beschriftungsboxen der runden Symbole zeigen den Wert, einen benutzerdefinierten Text, die Ventilstellung und den Zeitpunkt der letzten Änderung an. Das dritte Symbol im [Ein/Aus-](#onoff---tplhqbutton) Bild zeigt beide Beschriftungsboxen an.

| Einstellung                                        | Attribut                                        | Standard                  | Beschreibung                                                                                           |
| -------------------------------------------------- | ----------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| Keine Beschreibung (links)                         | `descriptionLeftDisabled`                       | aus                       | Versteckt die linke Pille.                                                                             |
| Beschreibung (links)                               | `descriptionLeft`                               |                           | Text der linken Pille. `\n` Beginnt eine neue Zeile. Der Text wird nie automatisch umgebrochen.         |
| Schriftgröße links                                 | `infoLeftFontSize`                              | 12                        | Schriftgröße der linken Pille in Pixeln.                                                               |
| Beschreibung (rechts)                              | `infoRight`                                     |                           | Text der rechten Pille (nur Ein/Aus).                                                                  |
| Richtige Schriftgröße                              | `infoFontRightSize`                             | 12                        | Schriftgröße der rechten Pille in Pixeln.                                                              |
| Textfarbe                                          | `infoColor`                                     |                           | Textfarbe beider Pillen. Die leere Variante folgt dem Thema.                                           |
| Hintergrund                                        | `infoBackground`                                |                           | Hintergrund beider Pillen. Das leere Bild passt zum Thema.                                             |
| Linker Abstand (links) / Rechter Abstand (links)   | `infoLeftPaddingLeft` /`infoLeftPaddingRight`   | 15 / 50                   | Innenabstand der linken Pille in Pixeln. Der rechte Abstand befindet sich unter dem Widget.            |
| Linker Abstand (rechts) / Rechter Abstand (rechts) | `infoRightPaddingLeft` /`infoRightPaddingRight` | 0 / 15 (Fenster: 15 / 15) | Innenabstand der rechten Pille in Pixeln. Der linke Innenabstand beträgt die Hälfte der Widget-Breite. |

Die runden Widgets können auch anzeigen, wann sich der Zustand zuletzt geändert hat:

| Einstellung                          | Attribut          | Standard | Beschreibung                                                                                                                                                                                              |
| ------------------------------------ | ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Letzte Aktion ausblenden nach (Std.) | `hoursLastAction` |          | Leer: Es wird keine Zeit angezeigt. Eine Zahl schaltet die Linie ein. Bei _der Zeiteinstellung als Intervall_ verschwindet die Linie, sobald die Änderung länger als diese Anzahl an Stunden zurückliegt. |
| Zeit als Intervall                   | `timeAsInterval`  | An       | Relative Zeit: _gerade eben_ , _vor 5 Minuten_ , _vor 2 Stunden und 10 Minuten_ , _gestern_ . Aktualisierung jede Minute.                                                                                 |
| Datumsformat                         | `format_date`     |          | Wird verwendet, wenn _die Option „Zeit als Intervall“_ deaktiviert ist: `YYYY.MM.DD hh:mm:ss`, `DD.MM.YYYY hh:mm:ss`, `YYYY/MM/DD hh:mm:ss`, `hh:mm:ss` oder `hh:mm` Leer bedeutet `DD.MM.YYYY hh:mm:ss` Die |

### Indikatoren

![Indikatoren](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/button-indicators.png)

Kleine Markierungen über dem Widget weisen auf Probleme hin. Von links nach rechts im Bild:

- **Funktioniert** (Zahnrad, oben links) – das Objekt mit _der ID „Funktioniert“_ ist `true` Ohne ein solches Objekt erscheint das Zahnradsymbol, während der Zustand des Widgets vom Gerät noch nicht bestätigt wurde (`ack = false` Wenn Sie umschalten, können Sie die Änderung so lange sehen, bis der Adapter den neuen Wert bestätigt.
- **Batterie** (oben rechts) – das Objekt mit _der Batterie-Objekt-ID_ ist `true` Die
- **Signal** (unten rechts) - Der Wert der _Signal-Objekt-ID_ wird als Text angezeigt, zum Beispiel die Signalstärke.
- **Kein Wert** (rotes Kreuz) - der Status in _der Objekt-ID_ hat noch keinen Wert.

Nicht jedes Widget bietet alle Indikatoren. In den Tabellen der Widgets ist aufgeführt, welche Indikatoren vorhanden sind.

### Stile und Änderungseffekte

Die runden Widgets und das Schloss verwenden eine der unten aufgeführten Oberflächenstrukturen. _„Normal“_ wird verwendet, wenn das Widget ausgeschaltet ist, _„Aktiv“,_ wenn es eingeschaltet ist. Die Temperatur-Widgets haben keine _aktive_ Oberfläche.

![Skins](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/button-skins.png)

| Einstellung            | Attribut         | Beschreibung                                                                                                                                                                                                                                                                                           |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Normal                 | `styleNormal`    | Skin für den ausgeschalteten Zustand (siehe Abbildung).                                                                                                                                                                                                                                                |
| Aktiv                  | `styleActive`    | Haut für den On-Zustand.                                                                                                                                                                                                                                                                               |
| jQuery-Stile verwenden | `usejQueryStyle` | Verwendet die Klassen `ui-state-default` /`ui-state-active` Anstelle der Skins wird ein jQuery UI-Theme verwendet. Dies hat nur dann Auswirkungen, wenn das Projekt ein solches Theme lädt.                                                                                                             |
| Änderungseffekt        | `changeEffect`   | Animation, die bei einer externen Wertänderung, beispielsweise beim Einschalten des Lichts an der Wand, abgespielt wird. Bei runden Widgets wird sie durch Klicks im Widget selbst nicht ausgelöst. Optionen: `waves`, `wobble`, `tada`, `swing`, `shake`, `rubberBand`, `pulse`, `flash`, `bounce` Die |
| Wellenfarbe            | `waveColor`      | Farbe der Ringe des `waves` Effekt. Standard: Grau.                                                                                                                                                                                                                                                     |
| Prüfen                 | `testActive`     | Nur für den Editor: Zeigt das Widget im umgekehrten Zustand an, sodass Sie das _aktive_ Skin überprüfen können, ohne das Gerät zu wechseln.                                                                                                                                                            |

### Dunkles Thema

Im dunklen Design von vis-2 ändert sich die Farbe aller Elemente im Sichtfeld: die Beschreibungsfelder, die Klingellinie, der Signaltext sowie die Pop-ups von Fenster und Schloss. Die Widgets selbst behalten in beiden Designs ihre Farben, da sie reale Objekte darstellen. Eine eingeschaltete Lampe bleibt nachts gelb.

![Dunkles Thema](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/dark-theme.png)

### Einstellungen, die von den runden Widgets gemeinsam genutzt werden

Ein/Aus, Dimmer, Innentemperatur und Außentemperatur sind auf demselben runden Knopf zusammengefasst. Sie teilen sich diese Gruppen. Die einzelnen Widget-Abschnitte unten listen nur die Unterschiede auf.

**Gruppe „Mitte“** – Inhalt in der Mitte der Schaltfläche

| Einstellung                     | Attribut                  | Standard            | Beschreibung                                                                                                                                                     |
| ------------------------------- | ------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Untertitel                      | `caption`                 |                     | Text in der Mitte. Ist das Widget höher als breit, steht der Text unter dem Symbol, andernfalls daneben.                                                         |
| Untertitel aktiv                | `captionOn`               |                     | Text, solange das Widget eingeschaltet ist (nur Ein/Aus). Bei leerem Widget bleibt _die Beschriftung_ erhalten.                                                  |
| Symbol                          | `iconName`                | hängt vom Widget ab | Bild in der Mitte.                                                                                                                                               |
| Aktives Symbol                  | `iconOn`                  |                     | Bild, solange das Widget aktiv ist. Bei leerem Widget bleibt _das Symbol_ erhalten. Die Temperatur-Widgets sind nie aktiv, daher hat dies dort keine Auswirkung. |
| Symbolbreite                    | `btIconWidth`             | 56 / 45             | Bildgröße in Pixeln.                                                                                                                                             |
| Automatische Positionierung     | `offsetAuto`              | An                  | Zentrumssymbol und Bildunterschrift.                                                                                                                             |
| Linker Versatz / Oberer Versatz | `leftOffset` /`topOffset` | 15 / 55             | Position in Prozent der Widget-Größe, falls _die automatische Positionierung_ deaktiviert ist.                                                                   |
| Kreisbreite                     | `circleWidth`             | 50                  | Ringgröße in Prozent **der** Widget-Breite: 50 bedeutet, dass der Ring 1,5-mal so breit wie das Widget ist. Nur Dimmer und Innentemperatur.                      |
| Wert anzeigen                   | `showValue`               | An                  | Zeigt den Wert im Ring an, während Sie mit dem Mauszeiger auf das Widget zeigen.                                                                                 |
| Kreis immer anzeigen            | `alwaysShow`              | aus                 | Der Ring wird permanent angezeigt, nicht nur, wenn Sie mit dem Finger auf das Widget zeigen.                                                                     |
| Mittlere Textfarbe              | `midTextColor`            |                     | Farbe für Temperatur und Luftfeuchtigkeit in der Mitte (Temperatur-Widgets).                                                                                     |

**Gruppe „Diagramm“** – Nur Innen- und Außentemperatur. Ein Klick öffnet eine Webseite, üblicherweise ein Temperaturdiagramm, in einem Dialogfeld über der Ansicht.

| Einstellung             | Attribut                        | Standard  | Beschreibung                                                                                                          |
| ----------------------- | ------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| URL                     | `url`                           |           | Adresse der Seite, beispielsweise ein Link zu einem Diagramm des _Flot-_ oder _ECharts-_ Adapters. Leer: kein Dialog. |
| Dialogtitel             | `dialog_title`                  |           | Name der eingebetteten Seite. Der Dialog „vis-2“ hat keine Titelleiste.                                               |
| Dialogbreite / -höhe    | `dialog_width` /`dialog_height` | 600 / 400 | Größe in Pixel.                                                                                                       |
| Modaler Dialog          | `dialog_modal`                  | aus       | Verdunkelt die Sicht hinter dem Dialog.                                                                               |
| Timeout ausblenden (ms) | `dialog_timeout`                |           | Schließt den Dialog nach dieser Anzahl Millisekunden. Leer oder 0: Bleibt geöffnet.                                   |
| Test offen              | `dialog_open`                   | aus       | Öffnet den Dialog im Editor, um Größe und URL zu überprüfen.                                                          |

Ein Klick außerhalb des Dialogfelds schließt es.

## Ein/Aus - `tplHqButton`

![Ein/Aus](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/button.png)

Ein runder Knopf für einen Schalter oder eine Lampe. Ein Klick schaltet zwischen _Aus_ und _Ein um_ . Die Abbildung zeigt von links nach rechts: Aus, Ein, Ein mit Beschreibungen und dem Zeitpunkt der letzten Änderung sowie ein rechteckiges Widget mit Beschriftung. Die Form des Widgets entspricht dem Widget-Stil. `border-radius: 64px` macht es rund; entfernen Sie es oder verkleinern Sie es, um ein Rechteck zu erhalten.

**So funktioniert es**

- Das Widget ist _eingeschaltet_ , solange der Status _dem Wert „Ein“_ entspricht, und ansonsten _ausgeschaltet_ . Der Vergleich ist ungenau, daher ist die Zahl `1` Spiele `true` Die
- **Druckknopf** : Drücken schreibt _den Wert „Ein“_ , Loslassen _den Wert „Aus“_ . Dies funktioniert auch, wenn der Zeiger außerhalb des Knopfes losgelassen wird. Verwenden Sie ihn für Türöffner und Klingeln.
- **Schreibgeschützt** : Zeigt den Status an, ignoriert aber Klicks.
- Das Widget reagiert nicht auf Klicks im Editor.

| Einstellung        | Attribut      | Standard | Beschreibung                                                                                                  |
| ------------------ | ------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| Objekt-ID          | `oid`         |          | Der Zustand, der umgeschaltet werden soll.                                                                    |
| Arbeitsobjekt-ID   | `oid-working` |          | Siehe [Indikatoren](#indicators) .                                                                            |
| Batterie-Objekt-ID | `oid-battery` |          | Siehe [Indikatoren](#indicators) .                                                                            |
| Signalobjekt-ID    | `oid-signal`  |          | Siehe [Indikatoren](#indicators) .                                                                            |
| Nur lesen          | `readOnly`    | aus      | Nur zur Anzeige.                                                                                              |
| Wert               | `min`         | `false`  | Geschrieben beim Ausschalten.                                                                                 |
| Zum Wert           | `max`         | `true`   | Geschrieben beim Einschalten.                                                                                 |
| Druckknopf         | `pushButton`  | aus      | Schreibt _den Wert „Ein“_ , solange die Taste gedrückt wird, und _den Wert „Aus“,_ wenn sie losgelassen wird. |

_Gruppencenter_ (Standardsymbol) `img/bulb_off.png`), _Beschreibungen_ und _Stile_ (Standardeinstellungen) `vis-hq-button-base-normal` /`vis-hq-button-base-on`): siehe [Allgemeines](#general) .

**Gruppe „Zusätzliche Steuerung“** – mehr Aktionen pro Schalter:

| Einstellung                           | Attribut                        | Beschreibung                                                                                                                           |
| ------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| URL für EIN / URL für AUS             | `urlTrue` /`urlFalse`           | Wird beim Ein-/Ausschalten aufgerufen. Ohne _URL für AUS_ wird _die URL für EIN_ in beiden Fällen aufgerufen.                          |
| Objekt-ID für EIN / Objekt-ID für AUS | `oidTrue` /`oidFalse`           | Ein weiterer Zustand, der beim Ein-/Ausschalten geschrieben wird. Ohne _Objekt-ID für AUS_ erhält _die Objekt-ID für EIN_ beide Werte. |
| Wert für EIN / Wert für AUS           | `oidTrueValue` /`oidFalseValue` | Die Werte für diese Zustände. Leer: _Ein-Wert_ / _Aus-Wert_ .                                                                          |

Die zusätzlichen Aktionen funktionieren auch ohne _Objekt-ID_ . Die Schaltfläche ruft dann lediglich die URLs auf oder schreibt die anderen Zustände.

## Dimmer - `tplHqDimmer`

![Dimmer](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/dimmer.png)

Ein runder Knopf mit einem Ring zur Anzeige eines Wertes von _Minimum_ bis _Maximum_ , typischerweise die Helligkeit einer Lampe. Der Ring erscheint, sobald Sie mit dem Mauszeiger über das Widget fahren, oder ist bei der _Einstellung „Kreis immer anzeigen“ dauerhaft_ sichtbar. Die Abbildung zeigt 0 %, 42 % und 42 % mit sichtbarem Ring.

**So funktioniert es**

- **Ziehen Sie** entlang des Rings, um den Wert festzulegen. Er wird beim Loslassen gespeichert.
- **Tippen Sie** kurz auf den Ring (weniger als 300 ms, ohne ihn zu bewegen), um umzuschalten. Bei Werten über 5 % des Bereichs wird auf den _Minimalwert_ umgeschaltet, ansonsten auf den _Maximalwert_ . Bei der _Option „Wert per Klick festlegen“_ schaltet ein Tippen den Ring aus, sobald der Wert über dem _Minimalwert_ liegt, und legt andernfalls diesen Wert fest.
- Die rechte Pille zeigt den Wert mit der Einheit an. Das Widget verwendet das _aktive_ Design, solange der Wert über dem _Minimum_ liegt.

| Einstellung                        | Attribut                                   | Standard | Beschreibung                                                                                                     |
| ---------------------------------- | ------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                          | `oid`                                      |          | Der Niveauzustand, z.B. `level.dimmer` Die                                                                        |
| Arbeits-/Batterie-/Signalobjekt-ID | `oid-working` /`oid-battery` /`oid-signal` |          | Siehe [Indikatoren](#indicators) .                                                                               |
| Nur lesen                          | `readOnly`                                 | aus      | Zeigt den Ring an, ändert aber nicht den Wert.                                                                   |
| Einheit                            | `unit`                                     | `%`      | Dem Wert angehängt.                                                                                              |
| Minimum / Maximum                  | `min` /`max`                               | 0 / 100  | Reichweite des Staates.                                                                                          |
| Ziffern nach dem Komma             | `digits`                                   | 0        | Dezimalstellen des angezeigten und des geschriebenen Wertes.                                                     |
| Schritt                            | `step`                                     | 1        | Schrittweite des Rings.                                                                                          |
| Komma als Dezimaltrennzeichen      | `is_comma`                                 | An       | `42,5` anstatt `42.5` Die                                                                                         |
| Wert per Klick festlegen           | `set_by_click`                             |          | Wert für einen Tap bei ausgeschaltetem Dimmer, z. B. 70 für eine angenehme Helligkeit anstelle von vollem Licht. |

_Gruppencenter_ (mit Ringeinstellungen, Standardsymbol) `img/bulb_off.png`), _Beschreibungen_ (ohne rechten Text) und _Stile_ : siehe [Allgemeines](#general) .

## Innentemperatur - `tplHqInTemp`

![Innentemperatur](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/intemp.png)

Ein Raumthermostat. In der Mitte werden die gemessene Temperatur (fett) und die Luftfeuchtigkeit angezeigt. Die rechte Anzeige zeigt den Sollwert und die Ventilstellung an. Der Sollwert wird mit dem Ring eingestellt.

Die Farbe des Rings variiert von Blau im _Minimum_ bis Rot im _Maximum_ :

![Farben des Rings](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/intemp-colors.png)

**So funktioniert es**

- **Ziehen Sie** am Ring entlang, um den Sollwert einzustellen. Er wird angezeigt, sobald Sie loslassen.
- **Tippen Sie auf** den Ring oder die Schaltfläche, um das [Diagramm](#settings-shared-by-the-round-widgets) zu öffnen, sofern eine _URL_ festgelegt ist.
- Der Ring wird nur beim Überfahren mit der Maus angezeigt, wobei die Messwerte in der Mitte verdeckt werden. Bei der _Option „Kreis immer anzeigen“_ sind beide sichtbar, und der Ring zeigt keine Zahl an.
- Das Widget verwendet immer das _Standard-_ Design. Es hat keinen Ein-/Aus-Zustand.

| Einstellung                               | Attribut       | Standard | Beschreibung                                                                                                        |
| ----------------------------------------- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                                 | `oid`          |          | Der Sollwert, z.B. `level.temperature` Die                                                                           |
| Tatsächliche Temperatur ID                | `oid-actual`   |          | Gemessene Temperatur, in der Mitte angezeigt.                                                                       |
| Feuchtigkeits-ID                          | `oid-humidity` |          | Luftfeuchtigkeit, in der Mitte dargestellt.                                                                         |
| Ventil-Innendurchmesser                   | `oid-drive`    |          | Ventilposition, dargestellt in der rechten Tablette.                                                                |
| Ventil nur Ein/Aus                        | `valveBinary`  | aus      | Bei Ventilen, die sich nur öffnen oder schließen: zeigt _geöffnet_ / _geschlossen_ an anstelle eines Prozentsatzes. |
| Das Ventil hat einen Bereich von 0 bis 1. | `valve1`       | aus      | Bei Ventilen, die 0...1 statt 0...100 melden: wird der Wert mit 100 multipliziert.                                  |
| Batterie-Objekt-ID                        | `oid-battery`  |          | Siehe [Indikatoren](#indicators) .                                                                                  |
| Nur lesen                                 | `readOnly`     | aus      | Der Ring wird angezeigt, der Sollwert wird jedoch nicht geändert.                                                   |
| Einheit                                   | `unit`         | `°C`     | Angehängt an die Temperaturen.                                                                                      |
| Minimum / Maximum                         | `min` /`max`   | 6 / 30   | Bereich des Sollwerts.                                                                                              |
| Ziffern nach dem Komma                    | `digits`       | 0        | Dezimalzahlen. Stelle 1 ein, um anzuzeigen `21,5` Die                                                                |
| Schritt                                   | `step`         | 1        | Schrittweite des Rings, z. B. 0,5.                                                                                  |
| Komma als Dezimaltrennzeichen             | `is_comma`     | An       | `21,5` anstatt `21.5` Die                                                                                            |

_Gruppencenter_ (Standardsymbol) `img/Heating.png` Symbolbreite 45), _Beschreibungen_ (ohne rechten Text), _Stile_ (nur _Normal_ , Standard) `hq-button-base-intemp`) und _Diagramm_ : siehe [Allgemeines](#general) .

Das Zahnrad der [Arbeitsanzeige](#indicators) leuchtet auf, obwohl der neue Sollwert noch nicht vom Thermostat bestätigt wurde.

## Außentemperatur - `tplHqOutTemp`

![Außentemperatur](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/outtemp.png)

Zeigt Temperatur und Luftfeuchtigkeit an. Es hat keinen Sollwert und keinen Klingelton. Ein Klick öffnet das Diagramm, sofern eine _URL_ angegeben ist.

| Einstellung                   | Attribut       | Standard | Beschreibung                       |
| ----------------------------- | -------------- | -------- | ---------------------------------- |
| Tatsächliche Temperatur ID    | `oid-actual`   |          | Temperatur.                        |
| Feuchtigkeits-ID              | `oid-humidity` |          | Luftfeuchtigkeit.                  |
| Batterie-Objekt-ID            | `oid-battery`  |          | Siehe [Indikatoren](#indicators) . |
| Einheit                       | `unit`         | `°C`     | An die Temperatur angehängt.       |
| Ziffern nach dem Komma        | `digits`       | 0        | Dezimalzahlen.                     |
| Komma als Dezimaltrennzeichen | `is_comma`     | An       | `22,3` anstatt `22.3` Die           |

_Gruppencenter_ (Standardsymbol) `img/Heating.png`), _Beschreibungen_ , _Stile_ (nur _Normal_ , Standard) `hq-button-base-outtemp`) und _Diagramm_ : siehe [Allgemein](#general) . Das Widget hat keinen Hauptzustand, daher haben die Einstellungen für den Zeitpunkt der letzten Änderung hier keine Auswirkung.

## Fenster und Rollladen - `tplHqShutter`

![Fenster und Fensterladen](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/shutter.png)

Ein Fenster mit bis zu sechs Flügeln und einem Rollladen. Jeder Flügel ist mit seinem Status (geschlossen, gekippt oder geöffnet) gekennzeichnet, der Rollladen zeigt seine Position an. Die Abbildung zeigt einen geschlossenen Flügel, zwei Flügel (gekippt und geöffnet) mit Positionsangabe im rechten Feld und drei Flügel mit Beschreibung im linken Feld.

Ein Klick auf das Fenster öffnet ein Steuerungs-Popup:

![Popup](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/shutter-popup.png)

- **Mit dem Pfeil nach oben** wird der Verschluss geöffnet, **mit dem Pfeil nach unten** geschlossen.
- **Ziehen Sie den Schieberegler,** um eine Position festzulegen. Diese wird angezeigt, sobald Sie ihn loslassen.
- Das Popup schließt sich nach dem Klicken auf eine Schaltfläche, nach _Ablauf einer Wartezeit_ ohne Interaktion oder durch einen Klick an einer anderen Stelle in der Ansicht. Im Editor wird kein Popup angezeigt.

**Position und Richtung.** Ohne _Invertierung_ bedeutet _Minimum_ vollständig geöffnet und _Maximum_ vollständig geschlossen (der Verschluss ist unten). Viele Geräte und die ioBroker-Rolle `level.blind` Zählen Sie in umgekehrter Richtung (100 % = offen). Aktivieren Sie hierfür die **Option „Invertieren“** .

| Einstellung                       | Attribut             | Standard | Beschreibung                                                                                                                                                 |
| --------------------------------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Objekt-ID                         | `oid`                |          | Position des Verschlusses, z.B. `level.blind` Ohne es zeigt das Widget nur das Fenster an.                                                                    |
| Arbeitsobjekt-ID                  | `oid-working`        |          | Für Vis-1-Projekte beibehalten. Das Fenster zeigt keine Arbeitsanzeige an (bei Vis-1 war das auch nicht der Fall).                                           |
| Minimum / Maximum                 | `min` /`max`         | 0 / 100  | Bereich des Positionszustands.                                                                                                                               |
| Rahmenbreite                      | `border_width`       | 3        | Breite des Fensterrahmens in Pixeln.                                                                                                                         |
| Anzahl der Folien                 | `slide_count`        | 1        | Anzahl der Schärpen, 1...6. Für jede Schärpe gibt es eine Gruppe _Slides_ (siehe unten).                                                                     |
| Umkehren                          | `invert`             | aus      | Schalten Sie es ein, wenn Ihr Gerät 100 % = geöffnet meldet.                                                                                                 |
| Zeitüberschreitung für Ausblenden | `hide_timeout`       | 2000     | Zeit in Millisekunden, nach der sich das Popup von selbst schließt. 0: bleibt geöffnet.                                                                      |
| Keine Animation                   | `noAnimate`          | aus      | Der Verschluss springt in die neue Position, anstatt sich zu bewegen.                                                                                        |
| Rahmenfarbe                       | `frameColor`         |          | Farbe des Rahmens und der Flügel. Die leere Einstellung behält die Standardfarbe Grau bei.                                                                   |
| Horizontale Popup-Position        | `popupHorizontalPos` | Center   | Wo das Popup vertikal erscheint: `top` - oberhalb des Widgets (an dessen Unterkante ausgerichtet), `bottom` - darunter (bündig mit der Oberkante), `center` Die |
| Vertikale Popup-Position          | `popupVerticalPos`   | Center   | Wo das Popup horizontal erscheint: `left` - auf der linken Seite (rechtsbündig), `right` - auf der rechten Seite (bündig mit dem linken Rand), `center` Die     |

Die Namen der beiden Positionseinstellungen scheinen vertauscht zu sein. Sie stammen aus vis-1 und wurden beibehalten, damit bestehende Projekte weiterhin funktionieren.

![Rahmenfarben](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/shutter-colors.png)

**Gruppe „Beschreibungen“** : _Keine Beschreibung (links)_ , _Beschreibung (links)_ , Schriftgrößen, Farben und Abstände wie unter [„Beschreibungen“](#descriptions) beschrieben. Anstelle eines Textes auf der rechten Seite:

| Einstellung   | Attribut     | Standard | Beschreibung                                                                            |
| ------------- | ------------ | -------- | --------------------------------------------------------------------------------------- |
| Wert anzeigen | `show_value` | aus      | Zeigt die Verschlussstellung in der rechten Pille an: 0 % = offen, 100 % = geschlossen. |

**Gruppe „Folien“** – einmal pro Folienbereich (Attributnamen enden mit der Foliennummer, z. B. `slide_type1`):

| Einstellung                               | Attribut                  | Beschreibung                                                                                                                                                                             |
| ----------------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Folientyp                                 | `slide_type`              | So öffnet sich der Fensterflügel. Leer: eine feststehende Scheibe ohne Griff. `left` /`right`: Links/rechts angelenkt, Griff auf der anderen Seite. `top` /`bottom`: Griff oben / unten. |
| Schiebesensor                             | `oid-slide-sensor`        | Kontakt der Schärpe: `true`, `1`, `open`, `opened` = offen; `2`, `tilt`, `tilted` = geneigt; alles andere = geschlossen.                                                                   |
| Schiebesensor bei niedrigem Batteriestand | `oid-slide-sensor-lowbat` | Niedriger Batteriestand des Kontakts – rotes Batteriesymbol.                                                                                                                             |
| Schiebegriff                              | `oid-slide-handle`        | Fenstergriffsensor: `0` = geschlossen `1` = geneigt, `2` = offen (wie der HomeMatic Drehgriffsensor).                                                                                       |
| Schiebegriff, niedriger Batteriestand     | `oid-slide-handle-lowbat` | Niedriger Batteriestand des Griffsensors – rosa Batteriesymbol.                                                                                                                          |

Bei einem Griffsensor folgt der Flügel der Griffbewegung. Bei einem Kontaktsensor folgt der Griff dem Kontakt. Bei beiden Sensoren steuert der Kontakt die Flügelbewegung und der Griff die Griffbewegung. Wird der Griff geneigt, öffnet sich der Flügel ebenfalls geneigt. Ein geneigter Griff ist gelb.

Alle Kombinationen aus Typ und Handle-Wert:

![Fenstertypen](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/shutter-sashes.png)

## Tür - `tplHqDoor`

![Tür](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/door.png)

Eine Tür, die ihren Kontakt anzeigt: geschlossen oder mit einem Spalt an der Seite des Schlosses geöffnet. Nur Anzeige – das Widget reagiert nicht auf Klicks. Die Abbildung zeigt geschlossen, geöffnet und mit einem Spalt geöffnet. `door_type = right`, benutzerdefinierte Farben und eine Beschreibung auf der linken Seite.

| Einstellung        | Attribut       | Standard  | Beschreibung                                                                                                                                 |
| ------------------ | -------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID          | `oid`          |           | Türkontakt. `true`, `"true"` und Zahlen ungleich 0 bedeuten offen.                                                                            |
| Batterie-Objekt-ID | `oid-battery`  |           | Siehe [Indikatoren](#indicators) .                                                                                                           |
| Signalobjekt-ID    | `oid-signal`   |           | Siehe [Indikatoren](#indicators) .                                                                                                           |
| Rahmenbreite       | `border_width` | 3         | Breite des Türrahmens in Pixeln.                                                                                                             |
| Umkehren           | `invert`       | aus       | Für Kontakte, die melden `true` wenn geschlossen.                                                                                             |
| Türschwingen       | `door_type`    | (links)   | Leer oder `left`: Links angeschlagen, öffnet sich die Lücke rechts. `right` Rechts ist das Scharnier angebracht, links öffnet sich die Lücke. |
| Keine Animation    | `noAnimate`    | aus       | Die Tür springt, anstatt zu schwingen.                                                                                                       |
| Türrahmenfarbe     | `emptyColor`   | `#515151` | Farbe des Spalts der offenen Tür.                                                                                                            |
| Rahmenfarbe        | `frameColor`   |           | Rahmenfarbe. Bei leerer Einstellung bleibt die Standardfarbe Grau erhalten.                                                                  |
| Türblattfarbe      | `sheetColor`   |           | Farbe des Türblatts und des Türgriffs. Die leere Einstellung behält die Standardeinstellung bei.                                             |

_Gruppenbeschreibungen_ : Nur linke Pille, siehe [Beschreibungen](#descriptions) .

## Sperren - `tplHqLock`

![Sperren](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/lock.png)

Ein Türschloss. Das Widget zeigt ein verriegeltes oder entriegeltes Vorhängeschloss an. Ein Klick öffnet ein rundes Popup mit bis zu drei Schaltflächen: **Verriegeln** (oben), **Entriegeln** (unten links) und, falls _die Objekt-ID „Offen“_ gesetzt ist, **Tür öffnen** (unten rechts). Das Popup schließt sich nach dem Klicken auf eine Schaltfläche, nach Ablauf _des Popup-Timeouts_ oder durch einen Klick an anderer Stelle in der Ansicht.

Das Schloss gilt nur dann als **entsperrt** , wenn der Status _„Offener Schlosswert“_ entspricht. Jeder andere Wert gilt als gesperrt.

| Einstellung        | Attribut      | Standard | Beschreibung                                                                                 |
| ------------------ | ------------- | -------- | -------------------------------------------------------------------------------------------- |
| Objekt-ID          | `oid`         |          | Sperrzustand, z.B. `switch.lock` Die                                                          |
| Objekt-ID öffnen   | `oid-open`    |          | Der Zustand, der die Tür öffnet (der Riegel). Ohne ihn hat das Popup nur zwei Schaltflächen. |
| Batterie-Objekt-ID | `oid-battery` |          | Siehe [Indikatoren](#indicators) .                                                           |
| Keine Animation    | `noAnimate`   | aus      | Das Popup erscheint auch ohne Zoomen.                                                        |

**Gruppe „Bilder“**

| Einstellung        | Attribut     | Standard                                 | Beschreibung                                  |
| ------------------ | ------------ | ---------------------------------------- | --------------------------------------------- |
| Symbol geschlossen | `closedIcon` | `widgets/hqwidgets/img/lockLocked.png`   | Abbildung des Widgets im gesperrten Zustand.  |
| Symbol geöffnet    | `openedIcon` | `widgets/hqwidgets/img/lockUnlocked.png` | Abbildung des Widgets im entsperrten Zustand. |

**Gruppe "Popup"**

| Einstellung                                        | Attribut                                         | Standard                               | Beschreibung                                                                                                  |
| -------------------------------------------------- | ------------------------------------------------ | -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Popup-Radius                                       | `popupRadius`                                    | 75                                     | Radius des Popups in Pixeln.                                                                                  |
| Radius der Schaltflächen                           | `buttonRadius`                                   | 50                                     | Eckradius der drei Tasten.                                                                                    |
| Schließen-Symbol / Schließen-Wert / Schließen-Stil | `closeIcon` /`closeValue` /`closeStyle`          | Sperrbild /`false` /                   | **Sperrknopf** : Bild, Wert in _Objekt-ID_ geschrieben und Skin (siehe [Stile](#styles-and-change-effects) ). |
| Schloss-Symbol öffnen / -Wert / -Stil              | `openIcon` /`openValue` /`openStyle`             | Bild eines offenen Schlosses /`true` / | Schaltfläche **„Entsperren“** . Der Wert bestimmt auch, wann das Widget als entsperrt gilt.                   |
| Tür öffnen-Symbol / -Wert / -Stil                  | `openDoorIcon` /`openDoorValue` /`openDoorStyle` | Türbild /`true` /                      | Taste **öffnet Tür** , schreibt in _Objekt-ID Open_ .                                                         |
| Popup-Timeout                                      | `showTimeout`                                    | 5000                                   | Zeit in Millisekunden, nach der sich das Popup von selbst schließt. 0: bleibt geöffnet.                       |

_Gruppenbeschreibungen_ : Nur linke Pille, siehe [Beschreibungen](#descriptions) . _Gruppenstile_ (Standard) `hq-button-no-background` (für beide Zustände): Siehe [Stile und Änderungseffekte](#styles-and-change-effects) . _„Normal“_ ist der gesperrte Zustand, _„Aktiv_ “ der entsperrte. Der Änderungseffekt wird bei jeder Änderung des Sperrzustands ausgeführt.

## Kontrollkästchen - `tplHqCheckbox`

![Kontrollkästchen](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/checkbox.png)

Ein Schiebeschalter. Ein Klick schaltet ihn um und zeigt _den Status „Ein“_ oder _„Aus“_ an. Der Schalter hat eine feste Größe: 216 x 68 px oder 108 x 34 px (bei variabler Größe). `small` Es ist im Widget zentriert.

![Farben](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/checkbox-colors.png)

| Einstellung     | Attribut          | Standard | Beschreibung                                                                                                                                                                       |
| --------------- | ----------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID       | `oid`             |          | Der Zustand, der umgeschaltet werden soll.                                                                                                                                         |
| Wert            | `val_false`       | `false`  | Geschrieben beim Ausschalten.                                                                                                                                                      |
| Zum Wert        | `val_true`        | `true`   | Wird beim Einschalten geschrieben. Der Schalter ist eingeschaltet, solange der Zustand diesem Wert entspricht. Wenn der Wert ist `true` Jede Zahl über 0 zählt ebenfalls als „ein“. |
| Statischer Wert | `staticValue`     |          | Nur ohne _Objekt-ID_ : Der Schalter zeigt einfach diesen Wert an, beispielsweise um einen festen Zustand anzuzeigen.                                                               |
| Nur lesen       | `readOnly`        | aus      | Nur zur Anzeige.                                                                                                                                                                   |
| Größe           | `checkboxSize`    | groß     | `big` (216 x 68) oder `small` (108 x 34).                                                                                                                                           |
| Farbe durch AUS | `checkboxColor`   | grau     | `orange`, `blue`, `green` oder `grey` Die                                                                                                                                           |
| Farbe von ON    | `checkboxColorOn` | orange   | `orange`, `blue`, `green` oder `grey` Die                                                                                                                                           |

## CircleKnob - `tplHqCircle`

![Kreisknopf](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/circle.png)

Ein runder Regler für beliebige Zahlen, beispielsweise Lautstärke oder Position. Er füllt das Widget aus – die kürzere Seite bestimmt die Größe. **Ziehen Sie** entlang des Rings, um den Wert festzulegen. Dieser wird beim Loslassen übernommen. Der Ring kann verkürzt und gedreht werden. Die Abbildung zeigt die Standardeinstellung, einen 270°-Ring mit abgerundeten Enden, einen Cursor anstelle eines Balkens, einen gegen den Uhrzeigersinn gedrehten Ring in anderen Farben und einen halben Ring.

| Einstellung                        | Attribut                                   | Standard  | Beschreibung                                                                                                                              |
| ---------------------------------- | ------------------------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID                          | `oid`                                      |           | Der Wert. Ohne ihn zeigt der Drehknopf nur den _Minimalwert_ an.                                                                          |
| Arbeits-/Batterie-/Signalobjekt-ID | `oid-working` /`oid-battery` /`oid-signal` |           | Siehe [Indikatoren](#indicators) .                                                                                                        |
| Einheit                            | `unit`                                     |           | An die Zahl angehängt.                                                                                                                    |
| Minimum / Maximum                  | `min` /`max`                               | 0 / 100   | Reichweite.                                                                                                                               |
| Ziffern nach dem Komma             | `digits`                                   | 0         | Dezimalstellen der Zahl.                                                                                                                  |
| Schritt                            | `step`                                     | 1         | Schrittgröße.                                                                                                                             |
| Komma als Dezimaltrennzeichen      | `is_comma`                                 | An        | `42,5` anstatt `42.5` Die                                                                                                                  |
| Nur lesen                          | `readOnly`                                 | aus       | Nur zur Anzeige.                                                                                                                          |
| Untertitel                         | `caption`                                  |           | Text unterhalb der Zahl.                                                                                                                  |
| Nummer ausblenden                  | `hideNumber`                               | aus       | Verbirgt die Zahl in der Mitte.                                                                                                           |
| Winkelversatz                      | `angleOffset`                              |           | Drehung der Skala in Grad, 0 = beginnt oben. Leer: Ein verkürzter Ring hat seine Lücke unten.                                             |
| Winkelbogen                        | `angleArc`                                 | 360       | Länge der Skala in Grad, z. B. 270 für einen unten offenen Ring.                                                                          |
| vorherige Anzeige                  | `displayPrevious`                          | An        | Beim Ziehen wird der aktuelle Wert als schwacher Balken angezeigt.                                                                        |
| Cursor                             | `cursor`                                   |           | Anstelle eines durchgehenden Balkens wird nur ein kurzes Segment an der entsprechenden Stelle gezeichnet. Die Zahl bestimmt dessen Länge. |
| Dicke                              | `thickness`                                | 0.35      | Breite des Rings als Bruchteil des Radius.                                                                                                |
| Farbe                              | `color`                                    | `#87CEEB` | Farbe des Balkens und die Zahl.                                                                                                           |
| Hintergrundfarbe                   | `bgcolor`                                  |           | Die Farbe der Strecke. Leer passt zum Thema.                                                                                              |
| Leitungskappe                      | `linecap`                                  | aus       | Abgerundete Enden des Stabes.                                                                                                             |
| Gegen den Uhrzeigersinn            | `anticlockwise`                            | aus       | Die Skala verläuft gegen den Uhrzeigersinn.                                                                                               |

## Kilometerzähler - `tplHqOdometer`

![Kilometerzähler](../../../../../en/adapterref/iobroker.vis-hqwidgets/docs/img/odometer.png)

Ein mechanischer Zähler, beispielsweise für Strom-, Gas- oder Wasserzähler. Ändert sich der Wert, springen die Ziffern auf den neuen Wert. Die Zifferngröße entspricht der Schriftgröße des Widgets (standardmäßig 24 px). Nur zur Anzeige.

| Einstellung          | Attribut       | Standard   | Beschreibung                                                                                                                                                                                                                                                                                                   |
| -------------------- | -------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID            | `oid`          |            | Ein Zahlenstaat.                                                                                                                                                                                                                                                                                               |
| Thema                | `style`        | Auto       | Blick auf die Theke: `car`, `default`, `digital`, `minimal`, `plaza`, `slot-machine`, `train-station` (siehe Abbildung).                                                                                                                                                                                        |
| Format               | `format`       | `(ddd),dd` | `d` steht für eine Ziffer. Der Ausdruck in Klammern wird über dem ganzzahligen Teil zusammen mit dem Dezimaltrennzeichen wiederholt. Darauf folgt das Dezimaltrennzeichen und eine Eins. `d` pro Dezimalstelle. Beispiele für 12345,67: `(.ddd),dd` →`12.345,67`, `(,ddd).dd` →`12,345.67`, `(ddd)` →`12346` Die |
| Faktor               | `factor`       | 1          | Der Wert wird damit multipliziert, z. B. 0,001, um Wh als kWh anzuzeigen.                                                                                                                                                                                                                                      |
| Führende Nullen      | `leadingZeros` | An         | Füllt den ganzzahligen Teil mit Nullen auf die Gruppenbreite auf, z. B. `005` Die                                                                                                                                                                                                                               |
| Animationsdauer (ms) | `duration`     | 3000       | Wie lange die Ziffern rollen.                                                                                                                                                                                                                                                                                  |

## Unterschiede zu vis-1

Die vis-2-Widgets verwenden kein jQuery, jQuery UI, `jquery.knob` oder `odometer.js` Projekte werden unverändert übernommen. Einige Details funktionieren anders:

- **Kontrollkästchen:** Größe `small` Die Größe des Widgets wird nicht mehr geändert. Der Schalter befindet sich stattdessen in der Mitte des Widgets.
- **Diagrammdialog:** der jQuery UI-Anzeigeeffekt (`dialog_effect`) ist verschwunden, und der Dialog hat keine Titelleiste mehr.
- **Temperaturring:** Die Farbe verläuft von Blau nach Rot. Im Vis-1-Spektrum durchlief sie in der Mitte Violett.
- **Ein/Aus:** _Die Werte für EIN_ / _AUS_ des zusätzlichen Steuerelements werden nun verwendet. vis-1 ignoriert sie.
- **Neue Einstellungen:** _Nur-Lese-Funktion_ für Dimmer, Innentemperatur und Drehknopf. Signal- und Türrahmenfarbe für die Tür. Anzeigen für den Drehknopf. Animationsdauer für den Kilometerzähler. Rahmen- und Türflügelfarben für Fenster und Tür.
- **Popups:** Die Popups des Fensters und des Schlosses schließen sich durch einen Klick an einer beliebigen anderen Stelle in der Ansicht.