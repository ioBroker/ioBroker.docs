---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa-shoppinglist/README.md
title: ioBroker.alexa-shoppingList
hash: fxCRuH3x9ArJRqJXHPL4X+hELVfy2/DI+KsRVct1J8M=
---
![Logo](../../../en/adapterref/iobroker.alexa-shoppinglist/admin/alexa-shoppinglist.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.alexa-shoppinglist.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa-shoppinglist.svg)
![Anzahl der Installationen](https://iobroker.live/badges/alexa-shoppinglist-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/alexa-shoppinglist-stable.svg)
![NPM](https://nodei.co/npm/iobroker.alexa-shoppinglist.png?downloads=true)
![Test und Freigabe](https://github.com/MiRo1310/ioBroker.alexa-shoppinglist/workflows/Test%20and%20Release/badge.svg)

# ioBroker.alexa-shoppingList

\*\*Tests:

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Informationen und Anweisungen zum Deaktivieren der Fehlerberichterstattung finden Sie in der [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 unterstützt.

## Alexa-Einkaufslisten-Adapter für ioBroker

Erstellt die Einkaufsliste von Alexa.

Sie können auch andere Listen von Alexa verwenden – konfigurieren Sie dies in den Administratoreinstellungen. Die neue Administratoroberfläche vereinfacht dies erheblich.

Es gibt eine Funktion zum Einfügen neuer Elemente: Geben Sie einfach den Text ein und drücken Sie die Eingabetaste. Sie können aktive und inaktive Listen löschen. Außerdem können Sie einzelne Elemente in beide Richtungen verschieben.

Ich hoffe, es gefällt Ihnen.

**Wenn es Ihnen gefällt, erwägen Sie bitte eine Spende:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?hosted_button_id=7QGL5CXJCUSCE)

## Datenpunkte

| DP-Name                | Typ          | Beschreibung                                                                                                                                                                                |
| ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| add\_position          | Zeichenkette | Geben Sie den Text ein, der in die Liste eingefügt werden soll                                                                                                                              |
| delete\_activ\_list    | Taste        | Löscht die aktive Liste und verschiebt sie in die inaktive Liste.                                                                                                                           |
| Inaktive Liste löschen | Taste        | Löscht die inaktive Liste                                                                                                                                                                   |
| position\_to\_shift    | Nummer       | Sie können die Positionsnummer des zu verschiebenden Elements eingeben und anschließend auf die Schaltflächen „Zur aktiven Liste hinzufügen“ oder „Zur inaktiven Liste hinzufügen“ klicken. |
| list\_active           | JSON         | Die Aktivliste als JSON                                                                                                                                                                     |
| list\_active\_sort     | Schalten     | Sie können die aktive Liste nach Namen oder nach Einfügezeit sortieren.                                                                                                                     |
| list\_inactive         | JSON         | Die Liste der inaktiven Personen als JSON                                                                                                                                                   |
| list\_inactive\_sort   | Schalten     | Sie können die Liste der inaktiven Elemente nach Namen oder nach Einfügezeit sortieren.                                                                                                     |
| to\_activ\_list        | Taste        | Zuerst position\_to\_shift eingeben und dann die Schaltfläche drücken, um zur activ\_list zu wechseln.                                                                                      |
| inaktive Liste         | Taste        | Fügen Sie zuerst position\_to\_shift ein und drücken Sie dann die Schaltfläche, um zur inactiv\_list zu wechseln.                                                                           |

| Attribute in JSON | Beschreibung                                               |
| ----------------- | ---------------------------------------------------------- |
| Name              | Name des Artikels                                          |
| Zeit              | Zeitstempel der Einfügung                                  |
| Ausweis           | id im Alexa2-Adapter                                       |
| pos               | Position in der Liste                                      |
| buttonmove        | Schaltfläche zum Wechseln zur aktiven oder inaktiven Liste |
| Entf-Taste        | Schaltfläche zum vollständigen Löschen des Eintrags        |

Die JSON-Datei enthält nun zwei Schaltflächen zum Verschieben oder Löschen von Elementen. Dazu müssen Sie im VIS-Editor unter „Skript“ folgenden Code einfügen:

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
### 1.1.5 (2026-06-04)

- CHORE: Update dependencies

### 1.1.4 (2026-06-04)

- CHORE: Add unit tests
- (copilot) Adapter requires node.js >= 22 now
- CHORE: Update dependencies
- CHORE: #203 Issues reported by repository checker
- CHORE: #193-Repository-Checker

### 1.1.3 (2025-11-29)

- CHORE: Update dependencies
- FIX: Error reported by sentry

### 1.1.2 (2025-09-20)

- CHORE: #145 Update dependencies

### 1.1.1 (2025-08-13)

- FIX: Error reported by sentry

## License

## License

MIT License

Copyright (c) 2021-2026 MiRo1310 <michael.roling@gmx.de>

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