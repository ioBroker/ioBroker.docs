---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-einkaufsliste
hash: r5nDQXWStgnd8CQzQtUDbON4qebgQ6aQ6/Nol4aY2Yk=
---
![Logo](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![Anzahl der Installationen](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa-Einkaufsliste
**Tests:** ![Testen und freigeben](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## Alexa-Einkaufslisten-Adapter für ioBroker
Erzeugt die Einkaufsliste von Alexa

Sie können auch andere Listen von Alexa verwenden. Konfigurieren Sie es im Admin.
Wenn Sie die neue Admin-Benutzeroberfläche verwenden, wird es für Sie viel einfacher.

Es gibt einen Status zum Einfügen neuer Artikel. Schreiben Sie einfach den Text und geben Sie ihn ein.
Sie können aktive und inaktive Listen löschen.
Sie können auch nur einen Artikel in beide Richtungen verschieben.

Ich hoffe es gefällt dir

## Datenpunkte
| DP-Name | Geben Sie | ein Beschreibung |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| add_position | Zeichenfolge | Geben Sie Text ein, der in die Liste eingefügt werden soll |
| delete_activ_list | Schaltfläche | Löscht die aktive Liste und verschiebt sie in die inaktive Liste |
| delete_inactiv_list | Schaltfläche | Löscht die inaktive Liste |
| position_to_shift | Nummer | Sie können die Positionsnummer des Artikels verschieben einfügen, als Schaltfläche to_active_list oder to_inactive list |
| list_active | JSON | Die aktive Liste als JSON |
| list_active_sort | Schalter | Sie können die aktive Liste nach Namen oder nach Einfügezeit | sortieren |
| list_inactive | JSON | Die inaktive Liste als JSON |
| list_inactive_sort | Schalter | Sie können die inaktive Liste nach Namen oder nach Einfügezeit | sortieren |
| to_activ_list | Schaltfläche | Fügen Sie zuerst position_to_shift ein und drücken Sie dann die Taste, um zu activ_list | zu wechseln |
| to_inactive_list | Schaltfläche | Fügen Sie zuerst position_to_shift ein und drücken Sie dann die Schaltfläche, um zu inactiv_list | zu wechseln |

| Attribut in JSON | Beschreibung |
| ----------------- | ----------------------------------------- |
| Name | Name des Artikels |
| Zeit | Zeitstempel der Einfügung |
| ID | id im Alexa2 Adapter |
| Pos. | Position in der Liste |
| Schaltfläche bewegen | Schaltfläche zum Wechseln zur aktiven oder inaktiven Liste |
| SchaltflächeLöschen | Schaltfläche zum vollständigen Löschen des Elements |

Der JSON enthält nun 2 Buttons um Items zu verschieben oder zu löschen.
Dazu müssen Sie im VIS-Editor unter Skript Code einfügen, diesen einfügen:

```
 /* Alexa Einkaufsliste JSON */

function setOnDblClickCustomShop( myvalue) {
    let id = myvalue.slice(0,myvalue.indexOf(","));
    let val = myvalue.slice(myvalue.indexOf(",")+1, myvalue.length);
    if (val){
      vis.setValue(id,val);
    }
  }
```

![](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/Skript.png)

## Changelog

### 0.1.5 (09.01.2023)

- Error when deleting via the JSON list fixed

### 0.1.4 (25.09.2022)

- Its now possible to delete always the Inactiv list, when you delete an Articel from the Activ list
- You only have to check the Checkbox

### 0.1.2 ( 09.04.2022)

- Add Buttons in JSON String

### 0.1.1 ( 20.02.2022)

- Error fixed in jsonConfig

### 0.1.0 ( 20.02.2022)

- First complete working Release

### 0.0.1

- (MiRo1310) initial release

## License

MIT License

Copyright (c) 2023 MiRo1310 <michael.roling@gmx.de>

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