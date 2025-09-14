---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-shoppingList
hash: or7jj4BKgLMQAtb9TD415gPeR8SUoLzBJq0i6Me7pzQ=
---
![Logo](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![Anzahl der Installationen](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)

# IoBroker.alexa-shoppingList
**Tests: ** ![Testen und Freigeben](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

## Alexa-ShoppingList-Adapter für ioBroker
Dieser Adapter verwendet Sentry-Bibliotheken, um Exceptions und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in der Sentry-Plugin-Dokumentation! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Generiert die Einkaufsliste von Alexa

Sie können auch andere Listen von Alexa verwenden. Konfigurieren Sie diese im Admin-Bereich.
Mit der neuen Admin-Benutzeroberfläche wird es für Sie viel einfacher.

Es gibt einen Status zum Einfügen neuer Elemente. Geben Sie einfach den Text ein und drücken Sie die Eingabetaste.
Sie können aktive und inaktive Listen löschen.
Sie können auch nur ein Element in beide Richtungen verschieben.

Ich hoffe, es gefällt Ihnen

**Wenn es Ihnen gefällt, denken Sie bitte über eine Spende nach:**

[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

## Datenpunkte
| DP-Name | Typ | Beschreibung |
|---------------------|--------|-----------------------------------------------------------------------------------------------------|
| add_position | Zeichenfolge | Geben Sie den in die Liste einzufügenden Text ein |
| delete_activ_list | Schaltfläche | Löscht die aktive Liste und verschiebt sie in die inaktive Liste |
| delete_inactiv_list | Schaltfläche | Löscht die Inaktivliste |
| position_to_shift | Nummer | Sie können die Positionsnummer des Elements eingeben, das Sie verschieben möchten, und dann auf die Schaltfläche „to_active_list“ oder „to_inactive_list“ klicken. |
| list_active | JSON | Die aktive Liste als JSON |
| list_active_sort | Schalter | Sie können die aktive Liste nach Name oder Einfügezeit sortieren |
| list_inactive | JSON | Die inaktive Liste als JSON |
| list_inactive_sort | Schalter | Sie können die inaktive Liste nach Namen oder Einfügezeit sortieren |
| to_activ_list | Button | Geben Sie zuerst position_to_shift ein und drücken Sie dann den Button, um zur Activ_list zu wechseln |
| to_inactive_list | Button | Geben Sie zuerst position_to_shift ein und drücken Sie dann den Button, um zur inactiv_list zu wechseln |

| Attribut in JSON | Beschreibung |
|-------------------|-------------------------------------------|
| Name | Name des Artikels |
| Zeit | Zeitstempel des Einfügens |
| id | id im Alexa2-Adapter |
| pos | Position in der Liste |
| buttonmove | Schaltfläche zum Wechseln zur aktiven oder inaktiven Liste |
| buttondelete | Schaltfläche zum vollständigen Löschen des Elements |

Das JSON enthält nun zwei Schaltflächen zum Verschieben oder Löschen von Elementen.
Hierfür müssen Sie im VIS-Editor unter Skript Code einfügen. Geben Sie Folgendes ein:

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

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- CHORE: #145 Update dependencies

### 1.1.1 (2025-08-13)

- FIX: Error reported by sentry

### 1.1.0 (2025-07-14)

- FEAT: Activate sentry
- Breaking change: minimal supported node.js version is 20.x
- FEAT: Add typescript

### 1.0.3 (2024-12-04)

- CHORE: Migration to ESLint 9 and @iobroker/eslint-config

### 1.0.2 (2024-11-09)

- FIX: #97 Add missing attributes to jsonConfig

### 1.0.1 (2024-10-19)

- FEAT: #95 Responsive Design

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

Copyright (c) 2025 MiRo1310 <michael.roling@gmx.de>

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