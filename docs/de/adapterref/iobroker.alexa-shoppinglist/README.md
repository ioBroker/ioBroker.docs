---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-Einkaufsliste
hash: 6egxt8ZmXvDHA1Wy1yHws/5BBQHshFPj77Kv1TE6mws=
---
![Logo](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![Anzahl der Installationen](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa-shoppingList
**Tests:** ![Testen und Freigeben](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## Alexa-ShoppingList-Adapter für ioBroker
Generiert die Einkaufsliste von Alexa

Sie können auch andere Listen von Alexa verwenden. Konfigurieren Sie diese im Admin.
Mit der neuen Admin-Benutzeroberfläche wird es für Sie viel einfacher.

Es gibt einen Status zum Einfügen neuer Elemente. Schreiben Sie einfach den Text und drücken Sie die Eingabetaste.
Sie können aktive und inaktive Listen löschen.
Sie können auch nur ein Element in beide Richtungen verschieben.

Ich hoffe, es gefällt euch

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

## Datenpunkte
| DP-Name | Typ | Beschreibung |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------- |
| add_position | String | Geben Sie den in die Liste einzufügenden Text ein |
| delete_activ_list | Schaltfläche | Löscht die aktive Liste und verschiebt sie in die inaktive Liste |
| delete_inactiv_list | Schaltfläche | Löscht die Inaktivliste |
| position_to_shift | Nummer | Sie können die Positionsnummer des zu verschiebenden Elements eingeben und dann auf die Schaltfläche to_active_list oder to_inactive list klicken. |
| list_active | JSON | Die aktive Liste als JSON |
| list_active_sort | Schalter | Sie können die aktive Liste nach Namen oder Einfügezeit sortieren |
| list_inactive | JSON | Die inaktive Liste als JSON |
| list_inactive_sort | Schalter | Sie können die Inaktivitätsliste nach Namen oder Einfügezeit sortieren |
| zur_aktiv_liste | Schaltfläche | Geben Sie zuerst die Position zum Verschieben ein und drücken Sie dann die Schaltfläche, um zur Aktiv_liste zu wechseln |
| zur_inaktiven_Liste | Schaltfläche | Geben Sie zuerst die zu verschiebende Position ein und drücken Sie dann die Schaltfläche, um zur inaktiven_Liste zu wechseln |

| Attribut in JSON | Beschreibung |
| ----------------- | ----------------------------------------- |
| Name | Name des Artikels |
| Zeit | Zeitstempel der Einfügung |
| id | id im Alexa2-Adapter |
| pos | Position in der Liste |
| buttonmove | Schaltfläche zum Wechseln zur aktiven oder inaktiven Liste |
| buttondelete | Schaltfläche zum vollständigen Löschen des Elements |

Das JSON enthält nun 2 Buttons zum Verschieben oder Löschen von Items.

Hierfür müsst ihr im VIS Editor unter Skript Code einfügen, und zwar diesen hier:

```
 /* Alexa Einkaufsliste JSON */

function setOnDblClickCustomShop( myvalue) {
    let id = myvalue.slice(0,myvalue.indexOf(","));
    let val = myvalue.slice(myvalue.indexOf(",")+1, myvalue.length);
    if (val=== "true"){
      vis.setValue(id,true);
      return
    }
    vis.setValue(id,false);
  }
```

![](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/Skript.png)

## Changelog
### 1.0.0 (2024-08-09)

- Js-controller >=5.0.19 is required
- Breaking change: minimal supported node.js version is 18.x

### 0.1.5 (09.01.2023)

- Error when deleting via the JSON list fixed

### 0.1.4 (25.09.2022)

- Its now possible to delete always the inactive list, when you delete an article from the active list
- You only have to check the checkbox

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

Copyright (c) 2024 MiRo1310 <michael.roling@gmx.de>

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