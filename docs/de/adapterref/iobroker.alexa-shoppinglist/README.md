---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-einkaufsliste
hash: HSFwRXQrrs4eNztQ9DaQN8lE/YF/bl79FvsVUjpidLs=
---
![Logo](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![Anzahl der Installationen](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa-shoppinglist
**Tests:** ![Test und Freigabe](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## Alexa-Shoppinglist-Adapter für ioBroker
Erzeugt die Einkaufsliste von Alexa

Sie können auch andere Listen von Alexa verwenden. Konfigurieren Sie es im Admin.
Wenn Sie die neue Admin-Benutzeroberfläche verwenden, wird es für Sie viel einfacher.

Es gibt einen Status zum Einfügen neuer Elemente. Schreiben Sie einfach den Text und geben Sie ein.
Sie können aktive und inaktive Listen löschen.
Sie können auch nur einen Gegenstand in beide Richtungen bewegen.

Ich hoffe es gefällt dir

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

## Datenpunkte
| DP-Name | Geben Sie | ein Beschreibung |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| add_position | Zeichenfolge | Geben Sie Text ein, der in die Liste eingefügt werden soll |
| delete_activ_list | Knopf | Löscht die aktive Liste und verschiebt sie in die inaktive Liste |
| delete_inactiv_list | Knopf | Löscht die inaktive Liste |
| position_to_shift | Nummer | Sie können die Positionsnummer der Elementverschiebung über die Schaltfläche to_active_list oder to_inactive list | eingeben |
| list_active | JSON | Die Aktivliste als JSON |
| list_active_sort | Schalter | Sie können die aktive Liste nach Name oder nach Einfügezeit | sortieren |
| list_inactive | JSON | Die inaktive Liste als JSON |
| list_inactive_sort | Schalter | Sie können die inaktive Liste nach Name oder nach Einfügezeit | sortieren |
| to_activ_list | Knopf | Geben Sie zuerst position_to_shift ein und drücken Sie dann die Taste, um zu activ_list | zu wechseln |
| to_inactive_list | Knopf | Geben Sie zuerst position_to_shift ein und drücken Sie dann die Taste, um zu inactiv_list | zu wechseln |

| Attribut in JSON | Beschreibung |
| ----------------- | ----------------------------------------- |
| Name | Name des Artikels |
| Zeit | Zeitstempel der Einfügung |
| id | id im Alexa2-Adapter |
| pos | Position in der Liste |
| buttonmove | Schaltfläche zum Wechseln zur aktiven oder inaktiven Liste |
| buttondelete | Schaltfläche zum vollständigen Löschen des Elements |

Das JSON enthält nun 2 Buttons zum Verschieben oder Löschen von Elementen.
Dazu müssen Sie im VIS-Editor unter Skript Code einfügen, diesen eingeben:

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

- First complete working Releases

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