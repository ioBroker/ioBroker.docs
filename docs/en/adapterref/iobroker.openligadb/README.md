![Logo](admin/openligadb_n.png)

# ioBroker Adapter to get soccer sport match results from OpenLigaDB

[![NPM version](https://img.shields.io/npm/v/iobroker.openligadb.svg)](https://www.npmjs.com/package/iobroker.openligadb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openligadb.svg)](https://www.npmjs.com/package/iobroker.openligadb)
![Number of Installations](https://iobroker.live/badges/openligadb-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/openligadb-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.openligadb.png?downloads=true)](https://nodei.co/npm/iobroker.openligadb/)

## Overview

Adapter to request game data for soccer or other games form `openligadb.de`

## Configuration

Add an instance of the adapter and click on the wrench symbol
In the form you can add the shortcut from a league and a season.
Please visit `openligadb.de` for available leagues,seasons and shortcuts
If a season is spread over two years, please enter only the start year.

Example data for 1. German Bundliga is
`shortcut = bl1 season = 2023`

If you saved and closed the configuration, a short while after this there must
be new datapoints for your league and season.

## Widgets

Actually there are 5 widgets available. Please enter openligadb in the widget filter

### Table 4

![Widget table 4](/widgets/openligadb/img/table.png)

Das ist die klassische Tabellenansicht.\
Die Tabelle enthält verschiedene Spalten.

- Sp=Anzahl gespielter Spiele
- S=Siege
- U=Unentschieden
- N=Niederlagen
- Tore=Torverhältnis
- Punkte=Punktestand

#### Attribute Table

| Attribut                            | Gruppe                   | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| allmatches                          |                          | Hier muss ein Datenpunkt mit der Bezeichnung allmatches (Achtung im alten widget musste hier noch table ausgewählt werden) ausgewählt werden. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Datenpunkt enthält alle Spieldaten einer Liga/Season im JSON-Format. Aus diesen Daten wird dann auf Basis des Modus die Tabellen die verschiedenen Modis berechnet. |
| currgameday                         |                          | Hier ist ein Datenpunk zu wählen, der mit currgameday benannt ist. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Wert wird im Adapter auf Basis des aktuellen Datums berechnet. Der aktuelle Spieltag wechselt zur Hälfte der Zeit zwischen dem letzten Spiel des vorherigen Spieltags und dem ersten Spiel des folgenden Spieltages.                           |
| mode                                |                          | Listenauswahl in welchem Modus die Tabelle angezeigt werden soll zur Auswahl steht Gesamt(1total), Heim (2home) oder Auswärts (3away), Hinrunde (4round1) oder Rückrunde (5round2).                                                                                                                                                                                                                                                        |
| mode_binding                        |                          | Dieses Attribut entspricht inhaltlich dem Attribut mode. Es wurde ergänzend eingeführ, so das der Tabellenmodus ebenfalls per Binding gesteuert werden kann. In dieses Textfeld können genau die gleichen Werte wie bei mode eingetragen werden.Wenn hier ein korrekter Wert eingetragen ist, dann hat dieses Attribut vorrang vor dem Attribut mode. Ein Normalanwender sollte er nichts eintragen.                                       |
| maxicon                             |                          | Maximale Größe des Manschaftsicons in x oder y-Richtung.                                                                                                                                                                                                                                                                                                                                                                                   |
| shortname                           |                          | Anstatt des Manschaftsnamens wird der Kurzname angezeigt, falls dieser in den vorliegenden Daten gepflegt wurde.                                                                                                                                                                                                                                                                                                                           |
| sowtrend                            |                          | Auswahl, wenn Trendicons angezeigt werden sollen. Der Trend wird im Vergleich zum vorherigen Spieltag berechnet.                                                                                                                                                                                                                                                                                                                           |
| highlight                           |                          | Hier können ein oder mehrere Begriffe mit Semikolon (;) getrennt eingegeben werden die hervorgehoben werden sollen. Die Suche erfolgt nur in den Mannschaftsnamen. Der jeweilige Namen wird mit HTML-Tags `<b>` eingefasst. Eine detailliertere Formatierung kann über die css-Klasse "favorite" erfolgen. Ausserdem kann je Highlight eine individuelle CSS-Klasse angegeben werden. Vgl. Kapitel todo                                    |
| filter                              |                          | Hier können ein oder mehrere Begriffe mit Semikolon (;) getrennt eingegeben werden anhand deren die Tabelle gefiltert dargestellt wird.                                                                                                                                                                                                                                                                                                    |
| iconup,icondn,iconst                | Attributgruppe Icons     | Hier können eigene Trendicons definiert werden.                                                                                                                                                                                                                                                                                                                                                                                            |
| showgameday in der Attributgruppe   | Erweiterte Einstellungen | Hier kann ein vom aktuellen Spieltag abweichender Tag zur Berechnung der Tabelle eingegeben werden                                                                                                                                                                                                                                                                                                                                         |
| lastgamecount in der Attributgruppe | Erweiterte Einstellungen | Wenn hier eine Zahl eingegeben wird, dann wird die Tabelle nur für die Anzahl von Spieltagen bis zum aktuell angezeigten Spieltag (in Abhängigkeit von currgameday und showgameday) berechnet Beispiel: Eingabe bei showgameday = 10 und bei lastgamecount=5: Die Tabelle wird nur für die Spieltage 6-10 berechnet (5 Spieltage)                                                                                                          |

### Games of Gameday v2

![Widget Gameday](/widgets/openligadb/img/gameday.png)

Dieses Widget zeigt den Spieltag an. Je nach Einstellung kann immer der
aktuelle, relativ zum aktuellen oder ein bestimmter Spieltag angezeigt werden.  
Darüber hinaus kann auch die Menge der angezeigten Spieltage festgelegt werden.
Bestimmte Elemente der Anzeige wurden mit **CSS-Klassen** versehen,
für die dann beliebig eine bestimmte Formatierung festgelegt werden kann:

| CSS-Klasse      | Formatierung betrifft welches Element           | Anmerkung                                                                                                                                                                 |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| favorite        | im Anzeigekopf eines Spieltages (Datum/Uhrzeit) | Hier kann Datum und Uhrzeit formatiert werden, wenn die Lieblingsmannschaft am Spieltag spielt. ggfs. kann es auch mit der CSS-Klasse "todaygameheader" verbunden werden. |
| favorite        | Mannschaftsname                                 | Hier kann der Mannschaftsname entsprechend formatiert werden.                                                                                                             |
| todaygame       | Die komplette Zeile eines Spiels                | Wird markiert, wenn das Spiel am heutigen Tag statt findet.                                                                                                               |
| todaygameheader | im Anzeigekopf eines Spieltages (Datum/Uhrzeit) | Wird markiert, wenn das Spieltagsdatum am heutigen Tag ist                                                                                                                |

#### Beispiele für CSS Klassen

##### Beispiel Anzeigekopf eines Spieltages (Datum generell)

```css
.oldb-tt tr.favorite {
  color: yellow;
}
```

##### Beispiel Mannschaftsname

```css
.oldb-tt b.favorite {
  color: blue;
}
```

##### Beispiel Zeile eines Spiels

```css
.oldb-tt .todaygame {
  color: red;
}
```

##### Beispiel Anzeigekopf eines Spieltages (Datum heute)

```css
.oldb-tt .todaygameheader {
  color: lightgreen;
}
```

#### Attribute Game of Gamedays

| Attribut         | Gruppe                   | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allmatches       |                          | Hier muss ein Datenpunkt mit der Bezeichnung allmatches ausgewählt werden. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Datenpunkt enthält alle Spiele und Ergebnisse einer Liga/Season im JSON-Format Wenn der Spieltag am heutigen Tag statt findet, dann wird das Datum (todaygameheader) und das jeweilige Spiel (todaygame) mit CSS-Klassen versehen. |
| currgameday      |                          | Hier ist ein Datenpunk zu wählen, der mit currgameday benannt ist. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Wert wird im Adapter auf Basis des aktuellen Datums berechnet. Der aktuelle Spieltag wechselt zur Hälfte der Zeit zwischen dem letzten Spielt der vorherigen Spieltags und dem ersten Spiel des folgenden Spieltages.                      |
| maxicon          |                          | Maximale Größe des Manschaftsicons in x oder y-Richtung.                                                                                                                                                                                                                                                                                                                                                                               |
| shortname        |                          | Anstatt des Manschaftsnamens wird der Kurzname angezeigt, falls dieser in den vorliegenden Daten gepflegt wurde.                                                                                                                                                                                                                                                                                                                       |
| showgoals        |                          | Informationen zu den Torschützen wird angezeigt.                                                                                                                                                                                                                                                                                                                                                                                       |
| highlight        |                          | Hier können ein oder mehrere Begriffe mit Semicolon (;) getrennt eingegeben werden, die hervorgehoben werden sollen. Die Suche erfolgt nur in den Mannschaftsnamen. Der jeweilige Namen wird mit HTML-Tags `<b>` eingefasst. Eine detailliertere Formatierung kann über die css-Klasse "favorite" erfolgen. Ausserdem kann je Highlight eine individuelle CSS-Klasse angegeben werden. Vgl. Kapitel todo                               |
| showgameday      | Erweiterte Einstellungen | Wenn dieses Feld leer bleibt, wird immer der aktuelle Spieltag angezeigt.Trägt man eine positive Zahl ein, dann wird, falls vorhanden, der ausgewählte Spieltag angezeigt.Trägt man eine negative Zahl ein, dann wird relativ vom aktuellen Spieltag dieser angezeigt (bspw -1 entspricht dem vorherigen Spieltag)                                                                                                                     |
| showgamedaycount | Erweiterte Einstellungen | Üblicherweise bleibt dieses Feld leer oder enthält 1. Dadurch wird genau ein Spieltag angezeigt. Wird hier eine andere Zahl eingegeben, dann wird diese Anzahl von Spieltagen, ausgehend von der 'Einstellung in showgameday angezeigt.                                                                                                                                                                                                |
| showweekday      | Erweiterte Einstellungen | Zeigt vor dem Datum wahlweise den Wochentag an.                                                                                                                                                                                                                                                                                                                                                                                        |

##### Beispiele

###### Beispiele für das Binding im Attribut showgameday

ggfs. kann dieses Feld auch über vis-binding berechnet und gefüllt werden.
Beispiele für relativ berechneten Spieltag: |

```text
    Vorheriger Spieltag
    {a:openligadb.0.bl1.2019.currgameday;a-1} oder
    Nachfolgender Spieltag
    {a:openligadb.0.bl1.2019.currgameday;a+1}
```

Da das Binding nicht im vis editmode berechnet wird,
wird bei Verwendung von Binding im editmode immer der aktuelle Spieltag angezeigt.

### Games of favorite clubs 2

![Favorite Games](/widgets/openligadb/img/favgames.png)  
Diese Widget zeigt die nächsten Spiele deiner Lieblingsmannschaften aus ein oder
mehrerer Ligen an. Durch die Auswahl der Anzahl der anzuzeigenden Ligen,
wird für jede Liga eine separate Konfigurationsgruppe angezeigt,
in der die folgenden Einstellungen vorgenommen werden können.
Wenn das Spiel am heutigen Tag statt findet, dann wird das jeweilige
Spiel (todaygame) mit CSS-Klassen versehen.

#### Beispiel

```css
.todaygame {
  color: red;
}

.todaygameheader {
  color: yellow;
}
```

#### Attribute

| Attribut         | Gruppe     | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anzahl Liga      | Allgemein  | Hier kann die Anzahl der abzufragenden Ligen eingetragen werden. Für jede Liga wird ein separate Konfigurationsgruppe angezeigt.                                                                                                                                                                                                                                                                                           |
| maxicon          | Allgemeinv | Maximale Größe des Manschaftsicons in x oder y-Richtung.                                                                                                                                                                                                                                                                                                                                                                   |
| showresult       | Allgemein  | Auswahl, ob die Spielergebnisse, sofern bekannt, angezeigt werden sollen                                                                                                                                                                                                                                                                                                                                                   |
| showabbreviation | Allgemein  | Um die Spiele der einzelnen Ligen unterscheiden zu können, kann man eine eigene Kürzung in der jeweiligen Konfiguration eintragen. Hier kann ausgewählt werden, ob diese angezeigt werden soll.                                                                                                                                                                                                                            |
| showweekday      | Allgemein  | Zeigt vor dem Datum wahlweise den Wochentag an. Die folgenden Attribute in der Gruppe Liga können sich in Abhängigkeit der Eingabe bei **Anzahl Liga** mehrfach wiederholen.                                                                                                                                                                                                                                               |
| allmatches       | Liga       | Hier muss ein Datenpunkt mit der Bezeichnung allmatches ausgewählt werden. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Datenpunkt enthält alle Spiele und Ergebnisse einer Liga/Season im JSON-Format                                                                                                                                         |
| currgameday      | Liga       | Hier muss ein Datenpunkt mit der Bezeichnung currgameday ausgewählt werden. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Wert wird im Adapter auf Basis des aktuellen Datums berechnet. Der aktuelle Spieltag wechselt zur Hälfte der Zeit zwischen dem letzten Spielt der vorherigen Spieltags und dem ersten Spiel des folgenden Spieltages. |
| showgameday      | Liga       | Wenn dieses Feld leer bleibt, wird immer vom aktuelle Spieltag ausgegangen. Trägt man eine positive Zahl ein, dann wird, falls vorhanden, vom ausgewählte Spieltag ausgegangen. Trägt man eine negative Zahl ein, dann wird relativ vom aktuellen Spieltag ausgegangen (bspw -1 entspricht dem vorherigen Spieltag)                                                                                                        |
| showgamedaycount | Liga       | Hier kann angegeben werden für wie viele Spieltage die Spiele angezeigt werden sollen. Wenn das Feld leer bleibt, dann werden alle restlichen Spieltage angezeigt (max 9999 Spieltage) Wird hier eine andere Zahl angezeigt, dann werden alle Spiele für diese Anzahl von Spieltagen, ausgehend von der 'Einstellung in showgameday angezeigt.                                                                             |
| shortname        | Liga       | Anstatt des Manschaftsnamens wird der Kurzname angezeigt, falls dieser in den vorliegenden Daten gepflegt wurde.                                                                                                                                                                                                                                                                                                           |
| abbreviation     | Liga       | Abkürzung die für diese Liga angezeigt werden soll, sofern showabbreviation ausgewählt wurde.                                                                                                                                                                                                                                                                                                                              |
| highlight        | Liga       | Hier können ein oder mehrere Begriffe mit Semicolon (;) getrennt eingegeben werden, um die Lieblingsmanschaften zu finden. Die Suche erfolgt nur in den Mannschaftsnamen. Eine besondere Hervorhebung wie bei den anderen Widgets gibt es hier nicht.                                                                                                                                                                      |

#### Beispiele Game of Favorite Clubs

##### Beispiele für das Binding im Attribut showgameday Game of Favorite Clubs

ggfs. kann dieses Feld auch über vis-binding berechnet und gefüllt werden.  
Beispiele für einen relativ berechneten Spieltag:

```css
    Vorheriger Spieltag
    {a:openligadb.0.bl1.2019.currgameday;a-1} oder
    Nachfolgender Spieltag
    {a:openligadb.0.bl1.2019.currgameday;a+1}
```

Da das Binding nicht im vis editmode berechnet wird, wird bei Verwendung
von Binding im editmode immer der aktuelle Spieltag angezeigt.

### Pivot Table 2

Diese Widget zeigt die alle Spiele und Ergebnisse als Pivottabelle an

| CSS-Klasse | Formatierung betrifft welches Element          | Beispiel |
| ---------- | ---------------------------------------------- | -------- |
| favorite   | Der per highlight ausgewählte Mannschaftsnamen |          |

#### Beispiele Pivot Table

##### Beispiel Der per highlight ausgewählte Mannschaftsnamen

```css
.oldb-tt .favorite {
  color: yellow;
}
```

#### Attribute Pivot Table

| Attribut            | Gruppe    | Beschreibung                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| allmatches          | Allgemein | Hier muss ein Datenpunkt mit der Bezeichnung allmatches ausgewählt werden. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Datenpunkt enthält alle Spiele und Ergebnisse einer Liga/Season im JSON-Format                                                                                                                                         |
| currgameday         | Allgemein | Hier muss ein Datenpunkt mit der Bezeichnung currgameday ausgewählt werden. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Wert wird im Adapter auf Basis des aktuellen Datums berechnet. Der aktuelle Spieltag wechselt zur Hälfte der Zeit zwischen dem letzten Spielt der vorherigen Spieltags und dem ersten Spiel des folgenden Spieltages. |
| maxicon             |           | Maximale Größe des Manschaftsicons in x oder y-Richtung.                                                                                                                                                                                                                                                                                                                                                                   |
| sort4e              |           | Einstellung nachdem sortiert werden soll.                                                                                                                                                                                                                                                                                                                                                                                  |
| shortname           |           | Anstatt des Manschaftsnamens wird der Kurzname angezeigt, falls dieser in den vorliegenden Daten gepflegt wurde.                                                                                                                                                                                                                                                                                                           |
| highlight am Anfang |           | Das highlight wird am Anfang der Tabelle angezeigt.                                                                                                                                                                                                                                                                                                                                                                        |
| highlight           |           | Hier können ein oder mehrere Begriffe mit Semicolon (;) getrennt eingegeben werden, die hervorgehoben werden sollen. Die Suche erfolgt nur in den Mannschaftsnamen. Der jeweilige Namen wird mit HTML-Tags `<b>` eingefasst. Eine detailliertere Formatierung kann über die css-Klasse "favorite" erfolgen.                                                                                                                |

### Goal getters 2

Diese Widget zeigt die alle Torjäger an

#### Attribute Goal getters

| Attribut        | Gruppe    | Beschreibung                                                                                                                                                                                                                                                                                            |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| goalgetters     | Allgemein | Hier muss ein Datenpunkt mit der Bezeichnung goalgetters ausgewählt werden. Dieser Datenpunkt wird nach dem Anlegen der Liga/Season in der Konfiguration erzeugt, falls die Angaben gültig sind. Der Datenpunkt enthält alle Torjäger der aktuellen Saison.                                             |
| maximala Anzahl |           | Nur die angegebene Anzahl an Torjäger wird angezeigt.                                                                                                                                                                                                                                                   |
| sortiert        |           | Auswahl der Sortierreihenfolge.                                                                                                                                                                                                                                                                         |
| Nur Highlights  |           | Nur die Einträge zum Higlightfilter werden angezeigt.                                                                                                                                                                                                                                                   |
| highlight       |           | Hier können ein oder mehrere Begriffe mit Semicolon (;) getrennt eingegeben werden, die hervorgehoben werden sollen. Die Suche erfolgt nur in den Spielernamen. Der jeweilige Namen wird mit HTML-Tags `<b>` eingefasst. Eine detailliertere Formatierung kann über die css-Klasse "favorite" erfolgen. |

## Rezepte zur Wiederverwendung

### Steuerung des Tabellenmodus über Knöpfe

1. Ein Widgets table v2 anlegen. und wie hier in der Hilfe beschrieben konfigurieren
2. Bei Widgeteinstellungen in der Gruppe Sichtbarkeit bei Datenpunkt deinen
   erstellten Datenpunk eintragen
3. Dieses Widget kopieren und nebeneinander einfügen, so das es insgesamt
   3 mal im view existiert
4. Bei Widgeteinstellungen in der Gruppe Sichtbarkeit den "Wert für die
   Bedingung dann bei jedem der 3 Widgets jeweils nur einen der folgenden
   Werte eintragen total,home,away
5. Dann ein neues Widget anlegen: Radiobuttons ValueList (ist in der
   Standardinstallation von vis schon enthalten
6. In diesem Widget in Gruppe Allgemein deinen angelegten ObjectID auswählen
7. Bei Werte das folgende eintragen: total;home;away (dies muss mit dem was
   du unter sichtbarkeit bei den widgets eingetragen hast zusammenpassen
8. Bei Texte das folgende eintragen: Gesamt;Heim;Auswärts
9. Dann in den vis runtime gehen und ausprobieren
10. Wenn alles funktioniert zum Schluss noch die widgets exakt übereinander
    legen, so das es wie eines aussieht

### Laufschrift einer Widgetzeile

sieht nur schön aus, wenn nur eine oder wenige Zeilen angezeigt werden bspw
bei dem FavGame-widget

`#w00000` ist die ID des widgets, das animiert werden soll.

Expand

```css
#w00000 .oldb-tt {
  max-width: 100vw; /* iOS braucht das */
  overflow: hidden;
}

#w00000 .oldb-tt tbody {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 10s linear infinite;
}

/* Make it move */
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
```

### Spieltag über +/- Buttons steuern, sowie direkte Auswahl per Listbox

![Controlbuttons](/widgets/openligadb/img/controlbuttons.png)  
Dazu ist für die Steuerung ein zusätzlicher Datenpunkt mit
Typ Zahl/number anzulegen.  
In diesem Beispiel wurde er javascript.0.bl1.spieltag genannt.  
Danke an bommel_030  
Die 4 Steuerelemente zum importieren findet ihr hier:

Expand

```text
    [{"tpl":"_tplGroup","data":{"members":["w00065","w00066","g00001"],"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","attrCount":"1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"widgetSet":null,"style":{"top":38.28125,"left":"663px","width":"141px","height":"37px"}},{"tpl":"tplIconInc","data":{"oid":"javascript.0.bl1.spieltag","repeat_delay":"800","repeat_interval":"800","src":"","step":"-1","minmax":"1","text":"-","g_last_change":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"name":"spieltag_minus","g_visibility":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","g_gestures":false,"g_signals":false,"signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false},"style":{"left":"0%","top":"16.22%","background":"#303030","width":"17.73%","height":"67.57%","z-index":"50","font-family":"","background-color":"#303030","font-weight":"bolder","border-width":"2px","border-radius":"10px","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","color":"white","border-style":"solid","border-color":"white","font-size":""},"widgetSet":"jqui","grouped":true,"groupName":"w00065"},{"tpl":"tplIconInc","data":{"oid":"javascript.0.bl1.spieltag","repeat_delay":"800","repeat_interval":"800","src":"","step":"+1","minmax":"34","text":"+","gestures-offsetX":0,"gestures-offsetY":"-1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis.0/VIS/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis.0/VIS/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis.0/VIS/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"g_last_change":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"name":"spieltag_plus","g_visibility":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide"},"style":{"left":"82.27%","top":"16.22%","background":"#303030","width":"17.73%","height":"67.57%","z-index":"50","font-family":"","background-color":"#303030","font-weight":"bolder","border-width":"2px","border-radius":"10px","box-shadow":"2px 2px 3px rgba(20, 20, 20, 50)","color":"white","border-style":"solid","border-color":"white"},"widgetSet":"jqui","grouped":true,"groupName":"w00066"},{"tpl":"_tplGroup","data":{"members":["w00064","w00059"],"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","attrCount":"1","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"widgetSet":null,"style":{"top":"0%","left":"21.99%","width":"56.74%","height":"100%"},"grouped":true,"groupName":"g00001"},{"tpl":"tplJquiSelectList","data":{"oid":"javascript.0.bl1.spieltag","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":true,"g_css_border":true,"g_gestures":false,"g_signals":false,"values":"1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25;26;27;28;29;30;31;32;33;34","texts":"1. Spieltag;2. Spieltag;3. Spieltag;4. Spieltag;5. Spieltag;6. Spieltag;7. Spieltag;8. Spieltag;9. Spieltag;10. Spieltag;11. Spieltag;12. Spieltag;13. Spieltag;14. Spieltag;15. Spieltag;16. Spieltag;17. Spieltag;18. Spieltag;19. Spieltag;20. Spieltag;21. Spieltag;22. Spieltag;23. Spieltag;24. Spieltag;25. Spieltag;26. Spieltag;27. Spieltag;28. Spieltag;29. Spieltag;30. Spieltag;31. Spieltag;32. Spieltag;33. Spieltag;34. Spieltag","height":"150","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"no_style":true,"class":"","lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"open":false,"name":"spieltag_liste","visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide"},"style":{"left":"0%","top":"54.77%","height":"45.95%","width":"100%","background":"","box-shadow":"","border-radius":"5px","padding-left":"","padding-right":"","margin-right":"","color":"","font-weight":"bolder","border-width":"2px","border-style":"solid","border-color":"white","background-color":""},"widgetSet":"jqui","grouped":true,"groupName":"w00064"},{"tpl":"tplIconState","data":{"oid":"javascript.0.bl1.spieltag","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"text":"Heute","invert_icon":false,"value":"{openligadb.0.bl1.2019.currgameday}"},"style":{"left":"0%","top":"0%","color":"white","background":"#303030","font-size":"small","font-weight":"normal","height":"45.95%","border-width":"2px","border-style":"solid","border-color":"white","width":"100%"},"widgetSet":"jqui","grouped":true,"groupName":"w00059"}]
```

### Anzeige von bestimmten Eigenschaften, falls eine der Lieblingsmannschaften am heutigen Tag spielen

**Beipiel 1** HTML-Widget erhält einen grünen Hintergrund,
wenn bayern heute spielt.  
Der Bindungsausdruck wir hier in das Feld background-color im Reiter
CSS Hintergrund gesetzt.

```text
    {a:openligadb.0.bl1.2019.currgameday;vis.binds["openligadb"].checkTodayFavorite('openligadb.0.bl1.2019.allmatches','bayern')?'red':'green'}
```

Expand

```text
    [{"tpl":"tplHtml","data":{"g_fixed":false,"g_visibility":false,"g_css_font_text":false,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":true,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","refreshInterval":"0","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0},"style":{"left":"445px","top":"589px","background":"{a:openligadb.0.bl1.2019.currgameday;vis.binds[\"openligadb\"].checkTodayFavorite('openligadb.0.bl1.2019.allmatches','bayer')?'red':'green'}","width":"70px","height":"70px","border-radius":"10px"},"widgetSet":"basic"}]
```

### Auswahl des Tabellenmodus für das table widget

![Tabellenmodus](/widgets/openligadb/img/tableselect.png)  
Mit diesem HTML-widget lässt sich der Modus des Tabellen widgets steuern.  
Der im folgenden widget verwendete Datenpunkt lautet:

`javascript.0.tabellemodus`

Dieser ist als Bindung in das attribut mode_binding im tabellen
widget wie folgt zu hinterlegen:

```text
    {javascript.0.tabellemodus}
```

Hier der widget code zum importieren.

Expand

```text
    [{"tpl":"tplJquiRadioList","data":{"oid":"javascript.0.tabellemodus","g_fixed":true,"g_visibility":false,"g_css_font_text":true,"g_css_background":true,"g_css_shadow_padding":false,"g_css_border":false,"g_gestures":false,"g_signals":false,"g_last_change":false,"visibility-cond":"==","visibility-val":1,"visibility-groups-action":"hide","values":"1total;2home;3away;4round1;5round2","texts":"Gesamt;Heim;Auswärts;Hinrunde;Rückrunde","signals-cond-0":"==","signals-val-0":true,"signals-icon-0":"/vis/signals/lowbattery.png","signals-icon-size-0":0,"signals-blink-0":false,"signals-horz-0":0,"signals-vert-0":0,"signals-hide-edit-0":false,"signals-cond-1":"==","signals-val-1":true,"signals-icon-1":"/vis/signals/lowbattery.png","signals-icon-size-1":0,"signals-blink-1":false,"signals-horz-1":0,"signals-vert-1":0,"signals-hide-edit-1":false,"signals-cond-2":"==","signals-val-2":true,"signals-icon-2":"/vis/signals/lowbattery.png","signals-icon-size-2":0,"signals-blink-2":false,"signals-horz-2":0,"signals-vert-2":0,"signals-hide-edit-2":false,"lc-type":"last-change","lc-is-interval":true,"lc-is-moment":false,"lc-format":"","lc-position-vert":"top","lc-position-horz":"right","lc-offset-vert":0,"lc-offset-horz":0,"lc-font-size":"12px","lc-font-family":"","lc-font-style":"","lc-bkg-color":"","lc-color":"","lc-border-width":"0","lc-border-style":"","lc-border-color":"","lc-border-radius":10,"lc-zindex":0,"class":""},"style":{"left":"54px","top":"356px","background":"black","font-size":"xx-small"},"widgetSet":"jqui"}]
```

## Besondere Funktionen

### vis.binds\["openligadb"\].checkTodayFavorite(ObjectID,Favorites)

Javascript-Funktion zur Überprüfung, ob am heutigen Tag für ein oder
mehrere Mannschaften ein Spiel statt findet. Diese Funktion kann über vis
binding verwendet werden. Aufgrund der Anforderung des Bindings sind hier
ein paar Dinge zu beachten.

Diese Funktion kann im Binding bspw. wie folgt verwendet werden.  
Zum Test kann die folgende Notation in ein HTML-widget eingetragen werden.
Als Ergebnis wird dann entweder ja oder nein ausgegeben, je nachdem ob am
heutigen Tag der Suchbegriff in den Mannschaftsnamen gefunden wurde.  
Alle Anführungszeichen (einfache und doppelte) müssen exakt so eingegeben werden.

#### Schema

```text
    {a:oid;vis.binds["openligadb"].checkTodayFavorite('oid_allmatches','clubsuche1,clubsuche2')?'ja':'nein'}
```

#### Real life Example

```text
    {a:openligadb.0.bl1.2024.currgameday;vis.binds["openligadb"].checkTodayFavorite('openligadb.0.bl1.2024.allmatches','bayern')?'ja':'nein'}
```

#### Bedeutung der Parameter

```text
<table><tbody><tr><td>oid</td><td>ein beliebiger Datenpunkt, der die Aktualisierung triggert. Es empfiehlt sich bspw. currgameday zu wählen,<br>da dies gleichzeitig mit allmatches aktualisiert wird.</td></tr><tr><td>oid_allmatches</td><td>Bezeichnung eines Datenpunktes allmatches der jeweiligen Liga/Saison.</td></tr><tr><td>clubsuche</td><td>ein oder mehrere Bezeichnungen (können auch Teilbezeichnungen sein), mit Komma (,) getrennt. Bitte beachten.<br>Diese Feld entspricht in den Widgets dem Feldt highlight. Mehrere Suchbegriffe müssen hier nur mit Komma getrennt werden und nicht mit Semikolon wie in den Widgets.</td></tr></tbody></table>
```

Documentation for the vis-widgets are available inside vis or [Widget-Documentation/german](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html)

## `sendTo` Commands

### `getMatchData`

Request the data from OpenLigaDB by league,season and a time range.

#### Mandatory parameters

| `Parameter` | `Example`          | `Type`   | `Description`                              |
| ----------- | ------------------ | -------- | ------------------------------------------ |
| `league`    | `bl1`              | `string` | `identifier of the league, see openlogadb` |
| `season`    | `2024`             | `string` | `name of the season, see openlogadb`       |
| `datefrom`  | `2024-09-01T00:00` | `string` | `date in ISO notation`                     |
| `datetill`  | `2024-09-10T00:00` | `string` | `date in ISO notation`                     |

#### Example

```javascript
sendTo(
  "openligadb.0",
  "getMatchData",
  {
    league: "bl1",
    season: "2024",
    datefrom: "2024-09-01T00:00",
    datetill: "2024-09-10T00:00",
  },
  function (matches) {
    console.log(matches);
  }
);
```

## Todo

- validation in widget if user didnt select the right datapoint
- ~~translation~~
- ~~documentation for new widgets pivottable and goalgetters~~
- ~~extend table modes with 1st round,2nd round~~
- ~~new widget pivot table of played games~~
- ~~new widget goal getter ranking with sort function~~
- ~~extend table with trend sign (arrow up/down, point for no change)~~
- ~~extend table to calculate with x last games~~
- ~~extend table to calculate ranking for a defined gameday~~
- ~~documentation adapter / widget~~
- ~~fix issue for dynamic with of club column~~
- ~~new widget: next x games of club~~
- ~~widget gameday setting for start gameday an length (-1,3 = show previous
  gameday and 3 gamedays after that)~~
- ~~Replacement value for edit mode if showgameday is set with binding~~
- ~~highlight favorite club~~
- ~~controllable gameday in the gameday widget~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- revert to node 18

### 1.8.1 (2025-01-23)

- adjust breakpoints in jsonConfig as a workaround for the new table/card-elements

### 1.8.0 (2024-10-27)

- move widget documentation from html file to readme
- adjust and prove responsive design for jsonconfig
- implement individual color settings for highlite and filters for each widget

### 1.7.0 (2024-09-16)

- fix quotes

### 1.6.0 (2024-09-16)

- reimplement checkTodayFavorite

### 1.5.0 (2024-09-15)

- Addition of a CSS example for the Pivot Table widget
- add `sendTo` command to getMatchData
- remove deprecated widgets
- addition widget option "only logo" to supress the teamname

### 1.4.11 (2024-08-09)

- fix issues from adapter checker

### 1.4.10 (2024-08-02)

- switch to eslint 9
- adjust markdownlint settings to be compatible with prettier

### 1.4.9 (2024-06-13)

- fix if no game exist for team1/team2
- somme prettier changes
- launch config for vscode

### 1.4.8 (2024-06-06)

- release

### 1.4.7 (2024-06-04)

- update dependencies

### 1.4.6 (2024-06-01)

- fix yml structure

### 1.4.5 (2024-06-01)

- fix yml structure

### 1.4.4 (2024-06-01)

- Enable NPM Publish
- Enable dependabot
- fix checks from adapter checker

### 1.4.3 (2024-06-01)

- remove files from eslint check

### 1.4.2 (2024-06-01)

- fix double qoutes
- remove files from eslint check

### 1.4.1 (2024-06-01)

- update package and io-broker files
- fix problems with vis2
- remove vis as a

### 1.2.4

- fix problems reported by adapter-checker

### 1.2.3

- add connectiontype and datasource to io-package.json

### 1.2.2

- fix result calculation

### 1.2.1

- fix object type

### 1.2.0

- fix display of goals if goals are without minutes and playername saved by openligadb

- fixed that sometimed request of states failed

### 1.1.0

- prepare v1.1.0

### 1.0.3

- change setstate/createobject logic

### 1.0.2

- remove deprecated widgets / change widget beta flag

- improve debug messages

### 1.0.1

- improve error message for requests

### 1.0.0

- prepare for stable repository

### 0.11.5

- pivottable: show only results for selected gameday
- table3: icon attributes, add image selection dialog
- table3: add an extra attribute for mode to use with binding
- all widgets: update documentation

### 0.11.4

- fixed build/test problem

### 0.11.3

- pivottable: fix problem with rank number

### 0.11.2

- pivottable: fix problem with sort and highlightontop
- fix problem with goalgetters

### 0.11.1

- change some template settings, goalgetter table get headers,
  add object change sensing
- widget goalgetters: add parameter highlight and showonlyhighlight
- widget pivottable: add sort option and choice to place favorite teams on top
- remove year from date for several widgets

### 0.11.0

- extend table to calculate with x last games and extend table to calculate
  ranking for a defined gameday, to ensure backward compatibility i have to
  create a new table v3 widget
- extend table with trend sign (arrow up/down, point for no change)
- new widget goal getter ranking with sort function
- new widget pivot table of played games
- extend table modes with 1st round,2nd round

### 0.10.3

- change computing and output logic of gameday widget to mark gameday
  header with favorite class
- improve documentation with css-klasses for table widget
- bugfix for calculate gameday.

### 0.10.2

- Add data column goaldiff to table widget, improve more documentation
  (systax highlighting,copy code function), add example to
  control gameday with buttons,

### 0.10.1

- Improve documentation with more recipes and syntax highlighting,
  improve code to get and subscribe states

### 0.10.0

- New widget Table 2 that includes the calculation of the total, home and
  away results. the previous widget is now deprecated, due to the
  different datapoint (allmatches) to be selected.

### 0.9.3

- Remove ES6 features due to compatibility with older browsers

### 0.9.2

- next try to fix the experimental javascript binding function

### 0.9.1

- fix bugs in calculation matchresults and highlight clubs in favgames

### 0.9.0

- new Function for vis Binding to search for games at the actual day for
  favorite clubs, css-classes für games at actual day, fix bug to show
  the right match results,

### 0.8.0

- push version for latest repository. fix some typos. fix a problem with
  date handling on different OS

### 0.0.11

- widget gameday: fix issue with not working gamedaycount

### 0.0.10

- widget gameday: optional you can show informations about the goalgetters

### 0.0.9

- optional weekday for widgets: gameday and gamesoffavclub,highlight the
  clubname in gamesoffavclub

### 0.0.8

- new widget games of favorite clubs with multi league support as
  replacement for the old one

### 0.0.7

- close connections and remove observers (timeouts/intervals)

### 0.0.6

- NPM deployment and preperation for the latest repository

### 0.0.5

- highlight favorite club,
- Replacement value for edit mode if showgameday is set with binding,
- widget gameday setting for start gameday an length (-1,3 = show previous
  gameday and 3 gamedays after that)
- some documentation
- remove unused code
- new widget: next x games of club
- fix issue for dynamic with of club column

### 0.0.4

- fixed more oids in vis runtime

### 0.0.3

- fixed getting oids in vis runtime

### 0.0.2

- add controlable gameday logic to gameday widget and adapter

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2025 oweitman

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
