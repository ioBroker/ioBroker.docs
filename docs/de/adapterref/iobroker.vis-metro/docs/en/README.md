---
chapters: {"pages":{"en/adapterref/iobroker.vis-metro/README.md":{"title":{"en":"ioBroker.vis-metro"},"content":"en/adapterref/iobroker.vis-metro/README.md"},"en/adapterref/iobroker.vis-metro/docs/en/README.md":{"title":{"en":"Metro widgets"},"content":"en/adapterref/iobroker.vis-metro/docs/en/README.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-metro/docs/en/README.md
title: Metro-Widgets
hash: Wv5U0yVmHK3HJb2toEzvg/H3u0+n7N9HNkXL4CK7GL8=
---
# Metro-Widgets

Kacheln im Stil von Windows 8 („Metro UI“): farbige Kacheln mit Symbol, Beschriftungsleiste und Badge, Kacheln, die einen Dialog öffnen, Steuerelemente für Dimmer, Jalousien und Thermostate sowie ein Schieberegler, ein Schalter und ein Kontrollkästchen.

![Alle Widgets](../../../../../en/adapterref/iobroker.vis-metro/docs/img/overview.png)

Der Adapter liefert jedes Widget zweimal aus: für **vis** (vis-1) wie bisher und für **vis-2** als React-Widgets. Beide haben dieselben Widget-IDs und Einstellungen, sodass ein vis-Projekt auch in vis-2 unverändert funktioniert – vis-2 zeichnet die Widgets mit der React-Version, die identisch aussieht und sich gleich verhält. Die React-Widgets benötigen vis-2 Version 2.12.8 oder neuer; ältere Versionen von vis-2 verwenden die vis-1-Widgets.

Die Widgets befinden sich in der Gruppe **Metro** der Widget-Palette.

- [Allgemeine Einstellungen](#common-settings)
- [Kacheln, die einen Status anzeigen](#tiles-that-show-a-state) : [Kachel Bool](#tile-bool) , [Kachel Bool/Zahl](#tile-bool--number) , [Kachel Zeichenkette](#tile-string) , [Kachel Werteliste 8](#tile-valuelist-8)
- [Umschaltbare Kacheln](#tiles-that-switch) : [Kachelstatus](#tile-state) , [Kachelstatus/Abzeichennummer](#tile-state--badge-number) , [Kachelumschaltung](#tile-toggle) , [Kachelumschaltung/Abzeichennummer](#tile-toggle--badge-number) , [Kachelnavigation](#tile-navigation)
- [Bedienelemente](#controls) : [Schieberegler (horizontal und vertikal)](#slider-horizontal-and-vertical) , [Kontrollkästchen und Schalter](#bool-checkbox-and-switch)
- [Kacheln mit Dialog](#tiles-with-a-dialog) : [Tile Bool Dialog](#tile-bool-dialog) , [Tile Dialog, view](#tile-dialog-view) , [Tile Dialog, HTML](#tile-dialog-html) , [Tile Dialog, state text](#tile-dialog-state-text) , [Tile Dialog, iFrame](#tile-dialog-iframe)
- [Dimmer, Rollladen und Heizung](#dimmer-shutter-and-heating) : [Fliesendimmer](#tile-dimmer) , [Dialog Fliesendimmer](#tile-dimmer-dialog) , [Fliesenrollladen](#tile-shutter) , [Dialog Fliesenrollladen](#tile-shutter-dialog) , [Fliesenheizung](#tile-heating) , [Dialog Fliesenheizung](#tile-heating-dialog)
- [Unterschiede zu vis-1](#differences-to-vis-1)

## Allgemeine Einstellungen

Eine Kachel besteht aus dem **Hintergrund** , dem **Symbol** in der Mitte, der **Marke** – dem Streifen am unteren Rand mit dem Etikett – und dem **Logo** am rechten Ende des Streifens.

| Einstellung                                          | Bedeutung                                                                                                                                                      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hintergrund, Markenhintergrund, Abzeichenhintergrund | Farben der Metro-Palette: `bg-*` sind einfarbige Farben `ribbed-*` gestreifte. Der Herausgeber bietet sie in einer Liste mit einem Beispiel an.                  |
| Symbolklasse, Symbolabzeichen                        | Ein Symbol der Metro-Symbolschriftart (`icon-*`), ausgewählt aus einer Liste.                                                                                 |
| Symbol-URL, Badge-URL                                | Ein Bild anstelle (oder zusätzlich) der Symbolschriftart. Breite, Höhe und der Abstand vom oberen und linken Rand werden in Prozent der Kachelgröße angegeben. |
| Etikett                                              | Der Text des Comics. Beschriftungen können HTML-Code enthalten.                                                                                                |
| Schwebeeffekt                                        | Ein Frame, während sich der Mauszeiger über der Kachel befindet.                                                                                               |
| Verwandeln                                           | Die Fliese neigt sich zu der Stelle, an der sie gedrückt wird.                                                                                                 |
| Auswählen nach Wahrheit / Auswählen nach Wert        | Ein Rahmen um die Kachel, solange der Zustand wahr ist (oder den Wert hat).                                                                                    |

Viele Kacheln haben zwei Varianten jeder Farbe, jedes Symbols und jeder Beschriftung: **... durch „falsch“** und **... durch „wahr“** . Die Kachel zeigt die Variante an, die zum Zustand passt: „falsch“ sind `false`, `0`, `"0"`, `"false"`, ein leerer Wert und überhaupt kein Wert - alles andere ist wahr.

Die **Dialogeinstellungen** der Dialogkacheln:

| Einstellung              | Bedeutung                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| Titel                    | Titel des Dialogs (HTML zulässig). Bei einigen Kacheln wird stattdessen die Bezeichnung verwendet. |
| Dialogbreite, Dialoghöhe | Größe in Pixeln. Ohne Größenangabe passt sich das Dialogfeld der Größe seines Inhalts an.          |
| Flaches Design           | Ein flaches Fenster ohne blauen Rahmen.                                                            |
| Schatten                 | Ein Schatten um das Fenster.                                                                       |
| Verschiebbar             | Der Dialog kann über seine Titelleiste verschoben werden.                                          |
| Modal                    | Die Seite hinter dem Dialog ist abgedunkelt.                                                       |
| Symbol-URL, Symbolklasse | Ein Symbol in der Titelleiste.                                                                     |

Es kann immer nur ein Dialogfenster geöffnet sein. Solange es geöffnet ist, reagiert die dahinterliegende Seite – egal ob modal oder nicht – nicht, und das Dialogfenster schließt sich mit dem × in der Titelleiste.

## Kacheln, die einen Zustand anzeigen

### Tile Bool

![Tile Bool](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileBool.png)

`tplMetroTileBool` - zeigt einen booleschen Zustand an: Hintergrund, Symbol, Beschriftung, Streifen und Abzeichen haben eine Variante für wahr und für falsch.

| Einstellung                                           | Bedeutung                  |
| ----------------------------------------------------- | -------------------------- |
| Objekt-ID                                             | Der Staat, der sich zeigt. |
| Beschriftung, falls falsch / Beschriftung, falls wahr | Das Etikett des Streifens. |

### Kachel Bool / Zahl

![Kachel Bool / Zahl](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileBoolNumber.png)

`tplMetroTileBoolNumber` - ähnlich wie Tile Bool, und der Wert eines Zahlenzustands wird der Beschriftung hinzugefügt.

| Einstellung    | Bedeutung                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------- |
| Staats-ID      | Der boolesche Zustand, der die Variante auswählt.                                            |
| Nummernkennung | Die Zahl, die hinter dem Etikett steht, gefolgt von **Label anhängen** (z. B. eine Einheit). |

### Fliesenkette

![Fliesenkette](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileString.png)

`tplMetroTileString` - zeigt den Wert eines Zustands als Text an; Farben und Symbole folgen einem zweiten, booleschen Zustand.

| Einstellung    | Bedeutung                                                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Content ID     | Der Zustand, dessen Wert auf der Kachel angezeigt wird (HTML zulässig), mit **vorangestelltem** und **angehängtem Content** . |
| Staats-ID      | Der boolesche Zustand, der die Variante auswählt.                                                                             |
| Label ObjectID | Das Label wird aus diesem Zustand übernommen und mit **Label prepend** und **Label append** umschlossen.                      |

### Kachelwerteliste 8

![Kachelwerteliste 8](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileList8.png)

`tplMetroTileList8` - zeigt eines von acht Erscheinungsbildern, ausgewählt durch die Zahl 0 bis 7 eines Bundesstaates: Beschriftung, Hintergrund, Symbol, Abzeichensymbol, Abzeichen und Streifenfarbe existieren jeweils einmal pro Zahl ( **Beschriftung \[0]** ... **Beschriftung \[7]** usw.). `true` zählt als 1, `false` als 0.

## Fliesen, die sich umschalten

### Fliesenstatus

![Fliesenstatus](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileState.png)

`tplMetroTileState` - Ein Klick schreibt einen festen Wert; die Kachel zeigt an, ob der Zustand diesen Wert hat.

| Einstellung    | Bedeutung                                                                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Staats-ID      | Der beschriebene Zustand.                                                                                                                                                                                                                   |
| Wert           | Der Wert, den ein Klick schreibt. `true` /`false` werden als boolesche Werte, Zahlen als Zahlen geschrieben (`5`), alles andere als Text -`01` Beispielsweise bleibt der Text "01" stehen. Ohne einen Wert wird ein leerer Text ausgegeben. |
| Wert auswählen | Ein Frame, während der Zustand den Wert hat.                                                                                                                                                                                                |

### Kachelstaat / Abzeichennummer

![Kachelstaat / Abzeichennummer](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileStateNumber.png)

`tplMetroTileStateNumber` - wie Tile State, mit dem Wert der **Number ID** im Badge.

### Kachel-Umschalter

![Kachel-Umschalter](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileToggle.png)

`tplMetroTileToggle` - Ein Klick schaltet die **Objekt-ID** um: `false`, ein leerer Wert oder kein Wert wird `true`, `true` wird `false` Eine Zahl wird `0` wenn es 0,5 oder mehr ist, sonst `1` Die

Bei den Einstellungen der Gruppe **„Andere Zustände steuern“** schaltet die Kachel stattdessen andere Zustände um:

| Einstellung                               | Bedeutung                                                                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Objekt-ID für wahr / Objekt-ID für falsch | Anstelle der Objekt-ID wird geschrieben; ohne **Objekt-ID für „false“** wird die Objekt-ID für „true“ in beiden Fällen verwendet. |
| Wert für wahr / Wert für falsch           | Die angegebenen Werte.                                                                                                            |
| URL für „wahr“ / URL für „falsch“         | Wird beim Klicken aufgerufen; ohne **URL für „false“** wird die URL für „true“ beide Male aufgerufen.                             |

Welche der beiden Varianten verwendet wird, hängt von der Objekt-ID ab: wenn sie aktiviert ist (`true`, `1` Wenn keine Objekt-ID vorhanden ist, wird die „falsche“ Seite verwendet, andernfalls die „wahre“. Ohne Objekt-ID merkt sich die Kachel den letzten Klick und wechselt bei jedem Klick die Seite.

### Kachel-Umschalter / Abzeichennummer

![Kachel-Umschalter / Abzeichennummer](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileToggleNumber.png)

`tplMetroTileToggleNumber` - ähnlich wie Tile Toggle, wobei der Wert der **numerischen ID** im Badge enthalten ist.

### Kachelnavigation

![Kachelnavigation](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileNav.png)

`tplMetroTileNav` Öffnet die **zu öffnende Ansicht** . Während diese Ansicht angezeigt wird, übernimmt die Kachel ihre aktiven Farben ( **Hintergrund aktiv** , **Markenhintergrund aktiv** , **Badge-Hintergrund aktiv** ) und bei **Auswahl der aktuellen Ansicht** zusätzlich einen Rahmen. **Der Seitenhintergrund** legt den Hintergrund der Seite beim Öffnen der Ansicht fest.

## Bedienelemente

### Schieberegler horizontal und vertikal

![Schieberegler horizontal](../img/tplMetroSlider.png)![Schieberegler vertikal](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroSliderVertical.png)

`tplMetroSlider`, `tplMetroSliderVertical` - ein Schieberegler, der den Wert während des Ziehens ausgibt.

| Einstellung                       | Bedeutung                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| Objekt-ID                         | Der Staat.                                                                          |
| Minimum, Maximum                  | Der Bereich; ohne sie 0 bis 1. `true` wird als Maximum angezeigt `false` als Minimum. |
| Schritt                           | Die ausgeschriebenen Werte werden auf diesen Schritt gerundet.                      |
| Schieberfarbe, Schiebergrifffarbe | Die Farben des ausgefüllten Teils und des Griffs.                                   |

### Boolesche Checkbox und Schalter

![Boolesche Checkbox](../img/tplMetroValueBoolCheckbox.png)![Schalten](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroValueBoolSwitch.png)

`tplMetroValueBoolCheckbox`, `tplMetroValueBoolSwitch` - Eine Checkbox oder ein Ein-/Ausschalter für einen booleschen Zustand, mit freiem HTML-Code davor und danach ( **HTML davor** , **HTML danach** ). Ein Klick schreibt `true` oder `false` Die

## Kacheln mit einem Dialog

Ein Klick auf diese Kacheln öffnet einen Dialog. Die Kachel selbst hat einen Hintergrund, ein Symbol ( **Symbolklasse** oder **Symbol-URL** ), eine Beschriftung und ein Badge.

### Tile Bool Dialog

![Tile Bool Dialog](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileBoolDialog.png)

`tplMetroTileBoolDialog` - ein Tile-Bool-Wert, dessen Klick die **Ansicht im Dialogfeld** öffnet.

### Kacheldialog, Ansicht

![Kacheldialog, Ansicht](../img/tplMetroTileDialog.png)![Kacheldialog, Ansicht / Ausweisnummer](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileDialogNumber.png)

`tplMetroTileDialog`, `tplMetroTileDialogNumber` Ein Klick öffnet die **Ansicht im Dialogfeld** . Der zweite Klick zeigt den Wert der **Nummer-ID** im Badge an, solange dieser über 0 liegt.

### Kacheldialog, HTML

![Kacheldialog, HTML](../img/tplMetroTileDialogStatic.png)![Kacheldialog, HTML / Badge-Nummer](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileStaticDialogNumber.png)

`tplMetroTileDialogStatic`, `tplMetroTileStaticDialogNumber` Ein Klick öffnet einen Dialog mit dem festgelegten **Dialoginhalt (HTML)** . Die erste Kachel zeigt neben dem Symbol die **Inhalts-ID** an; die zweite Kachel zeigt zusätzlich eine Zahl im Badge an.

### Kacheldialog, Statustext

![Kacheldialog, Statustext](../img/tplMetroTileDialogString.png)![Kacheldialog, Statustext / Ausweisnummer](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileStringDialogNumber.png)

`tplMetroTileDialogString`, `tplMetroTileStringDialogNumber` Ein Klick öffnet einen Dialog mit der **Dialog-ID** (HTML zulässig), der **Dialog-Schriftgröße** , dem **Dialog-Padding** und der **Dialog-Textausrichtung** . Der Dialog passt sich den Zustandsänderungen an, solange er geöffnet ist.

### Kacheldialog, iFrame

![Kacheldialog, iFrame](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileFrameDialogNumber.png)

`tplMetroTileFrameDialogNumber` Ein Klick öffnet die **Dialog-URL** in einem Frame; **„Scrollen im iFrame“** ermöglicht das Scrollen. Das Badge zeigt den **Badge-Text** an, die Kachel den **Inhalt** neben dem Symbol.

## Dimmer, Rollladen und Heizung

### Fliesendimmer

![Fliesendimmer](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileDimmer.png)

`tplMetroTileDimmer` - eine breite Kachel mit einer Lampe in elf Stufen, einem Schalter und einem Schieberegler für die **Objekt-ID** .

| Einstellung                                             | Bedeutung                                                                                                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Minimum, Maximum                                        | Der Dimmbereich. Der Schalter zeigt „Max.“ und „Min.“ an. **Stellen Sie beide ein** – ohne diese funktioniert der Schieberegler nicht, wie in vis-1. |
| Schritt                                                 | Die Schiebereglerwerte werden auf diesen Schritt gerundet.                                                                                           |
| Schieberfarbe, Schieber-Gesamtfarbe, Schiebergrifffarbe | Die Farben des Schiebereglers.                                                                                                                       |

### Dialog zur Fliesendimmerfunktion

![Dialog zur Fliesendimmerfunktion](../img/tplMetroTileDimmerDialog.png)![Dialog zum Dimmen von Fliesen, aktiver Streifen](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileDimmerDialogactiv.png)

`tplMetroTileDimmerDialog`, `tplMetroTileDimmerDialogactiv` Eine Kachel mit der Lampe; ein Klick öffnet den Schalter und den Schieberegler in einem Dialogfeld. Ohne Minimal- und Maximalwerte liegt der Bereich zwischen 0 und 1. Die **Option „Dezimalstellen“** bewirkt, dass der Schieberegler den Wert mit der entsprechenden Anzahl an Dezimalstellen (als Text) ausgibt. Die zweite Kachel färbt ihren Streifen mit **dem Markenhintergrund** ein, solange der Dimmer eingeschaltet ist, und mit **dem Markenhintergrund,** solange er ausgeschaltet ist.

![Dimmerdialog](../../../../../en/adapterref/iobroker.vis-metro/docs/img/dialog-dimmer.png)

### Fliesen-Fensterladen

![Fliesen-Fensterladen](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileShutter.png)

`tplMetroTileShutter` Eine breite Kachel mit einem Fenster in elf Schritten, einem Schalter und einem Schieberegler für die **Objekt-ID** . Das Fenster ist in der maximalen Position geöffnet und in der minimalen geschlossen. Solange die **Status-ID „Arbeiten“** lautet, behält der Schalter seine Position bei.

### Dialog für Kacheljalousie

![Dialog für Kacheljalousie](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileShutterDialog.png)

`tplMetroTileShutterDialog` - eine Kachel mit dem Fenster; ein Klick öffnet den Schalter und den Schieberegler in einem Dialog.

### Fliesenheizung

![Fliesenheizung](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileHeating.png)

`tplMetroTileHeating` Eine breite Kachel zeigt Soll- und Ist-Temperatur, Ventilstellung und Luftfeuchtigkeit sowie einen Schieberegler für die Solltemperatur an. Jede Zeile wird nur angezeigt, wenn der entsprechende Zustand ausgewählt ist; ohne Solltemperatur ist der Schieberegler ausgeblendet.

| Einstellung                                             | Bedeutung                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Solltemperatur-ID                                       | Der Sollwert. Wenn ein Zustand mit der Rolle `level.temperature` Wird eine Option ausgewählt, füllt der Editor die anderen noch leeren Zustände desselben Thermostats aus: Isttemperatur, Ventil, Luftfeuchtigkeit und niedriger Batteriestand entsprechend ihrer Funktionen, Steuermodus und Fenster anhand der Namen der Homematic-Thermostate (`CONTROL_MODE`, `WINDOW_STATE`, `WINDOW_OPEN_REPORTING`). |
| Ist-Temperatur-ID, Ventilpositions-ID, Feuchtigkeits-ID | Die anderen Zeilen.                                                                                                                                                                                                                                                                                                                                                                                         |
| Temperaturangabe ... Luftfeuchtigkeitsangabe            | Eigene Texte für die Zeilen.                                                                                                                                                                                                                                                                                                                                                                                |
| Minimum, Maximum, Schritt                               | Bereich des Schiebers (6 bis 30 °C) und seine Schrittweite (0,1 ohne).                                                                                                                                                                                                                                                                                                                                      |
| Steuermodus-ID, Niedrigbatterie-ID, Fenster geöffnet-ID | Die Symbole des Badges: Im Kontrollmodus werden **der Symbol-Automodus** und seine Geschwister für die Werte 0, 1 und 2 angezeigt; die Batterie- und Fenstersymbole werden angezeigt, solange ihr Zustand wahr ist.                                                                                                                                                                                         |

### Dialog zur Fliesenheizung

![Dialog zur Fliesenheizung](../../../../../en/adapterref/iobroker.vis-metro/docs/img/tplMetroTileHeatingDialog.png)

`tplMetroTileHeatingDialog` - zeigt die Temperaturen kurz an ( **Kurzbezeichnung ...** ); ein Klick öffnet einen Dialog mit einem Schieberegler für die eingestellte Temperatur und den drei Werten.

![Heizungsdialog](../../../../../en/adapterref/iobroker.vis-metro/docs/img/dialog-heating.png)

## Unterschiede zu vis-1

Die vis-2-Widgets bilden die vis-1-Widgets exakt nach – jedes Widget, jeder geöffnete Dialog und jeder Klick wurde Pixel für Pixel und Zeile für Zeile mit den Originalvorlagen verglichen. Dies schließt einige Besonderheiten von vis-1 ein, die beibehalten wurden, damit bestehende Projekte einheitlich aussehen:

- Das Badge-Bild von Tile Bool, Tile Bool Dialog und Tile Toggle ist immer **Badge URL by false** .
- Tile Toggle wählt sein Symbol anhand des einfachen Wertes aus: Die Texte "false" und "0" zeigen das Symbol für wahr an, während alles andere auf der Kachel "false" anzeigt.
- Der Schalter für Dimmer- und Jalousiekacheln ist für jeden Wert außer 0, false und leer eingeschaltet - nicht nur oberhalb der Mitte von min und max.
- Tile Dimmer funktioniert nicht ohne min und max (siehe oben).
- Die Lampe und das Fenster zählen `true` als 1, nicht als max.
- Die Kachelumschaltung mit **Objekt-ID auf „true“** , aber ohne **Wert auf „true“,** schreibt einen leeren Text.
- Ein Dialog mit einem Statustext zeigt einen Status an `null` als "null"; ebenso verhält es sich mit der kurzen Zeile der Heizungsdialogkachel.
- Die Standardbezeichnung „Temperatur einstellen“ im Heizungsdialog ist nicht übersetzt.

Einige Einstellungen hatten in vis-1 keine Auswirkung und werden nicht mehr angeboten; die in einem Projekt gespeicherten Werte bleiben erhalten und werden wie zuvor einfach ignoriert:

| Widget                                          | Einstellung                                                                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Kachelstaat / Abzeichennummer                   | Abzeichenhintergrund, Ausblenden um 0                                                                                      |
| Kachel-Umschalter / Abzeichennummer             | Ausblenden (0), Abzeichenhintergrund (false/true)                                                                          |
| Dialogkacheln mit einer Badge-Nummer            | Ausblenden um 0                                                                                                            |
| Kachelnavigation                                | Die Ansichtsänderungseffekte (Effekt ein-/ausblenden, Dauer, Optionen, Synchronisierung) – vis-2 ändert die Ansicht selbst |
| Schieberegler horizontal und vertikal           | Schiebereglerfarbe, Arbeitsstatus-ID                                                                                       |
| Dialog zum Dimmen von Fliesen, aktiver Streifen | Markenhintergrund, das automatische Schließen des Dialogs                                                                  |

Zwei Dinge funktionieren besser als in vis-1: Der Heizungsdialog zeigt die Werte auch dann an, wenn ein Zustand ein Text ist (vis-1 zeigte einen leeren Dialog an), und die Schieberegler messen sich neu, wenn die Größe des Widgets geändert wird.