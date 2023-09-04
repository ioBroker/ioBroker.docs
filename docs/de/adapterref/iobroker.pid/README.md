---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pid/README.md
title: ioBroker.pid
hash: T3lRBLIggbW/x5Eu3EnCKSmX6yzwBn4JHckOhGrlWgk=
---
![Logo](../../../en/adapterref/iobroker.pid/admin/pid.png)

![GitHub-Lizenz](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.pid)
![Downloads](https://img.shields.io/npm/dm/iobroker.pid.svg)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.pid)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.pid)
![GitHub-Commits seit der letzten Veröffentlichung (nach Datum)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.pid/latest)
![GitHub letzter Commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.pid)
![GitHub-Probleme](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.pid)
![NPM-Version](http://img.shields.io/npm/v/iobroker.pid.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/pid-stable.svg)
![Anzahl der Installationen](https://iobroker.live/badges/pid-installed.svg)

# IoBroker.pid
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/pid/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Version:** </br> </br> **Tests:** </br> [![Test und Veröffentlichung](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.pid/actions/workflows/codeql.yml)

<!--

## Sentry **Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.
->
## PID-Adapter für ioBroker
Dieser Adapter bietet einen konfigurierbaren PID-Regler.

## Allgemeine Informationen
Dieser Adapter bietet die Funktionalität eines PID-Reglers.

In der Praxis berechnet ein PID-Regler automatisch einen Korrekturwert für ein System basierend auf einem Istwert und einem Sollwert. Das Verhalten wird durch Parameter gesteuert. Ein alltägliches Beispiel ist der Tempomat eines Autos, bei dem beim Bergauffahren die Geschwindigkeit verringert würde, wenn eine konstante Motorleistung angewendet würde. Der PID-Algorithmus des Reglers stellt die gemessene Geschwindigkeit mit minimaler Verzögerung und minimalem Überschwingen auf die gewünschte Geschwindigkeit wieder her, indem er die Leistungsabgabe des Motors auf kontrollierte Weise erhöht. [(c) Wikipedia]

Innerhalb einer Adapterinstanz kann mehr als ein Controller konfiguriert sein. Der Adapter unterstützt die Konfiguration der Parameter (P-, I-, D-Komponenten) und der für die Berechnung verwendeten Zykluszeit. Darüber hinaus kann die Berechnung unterbrochen und wieder aufgenommen sowie die Steuerung überhaupt zurückgesetzt werden. Als praktischer Server kann ein manueller Modus eingeschaltet werden, um den Ausgang direkt einzustellen. Die Ausgabe kann auf einen minimalen/maximalen Wert begrenzt werden und einen festen Offset enthalten.

Für Diagnosezwecke stehen alle relevanten Werte inklusive interner Daten als Zustände zur Verfügung.

## Dokumentation
[Englische Dokumentation](docs/en/pid_en.md)<br> [deutsche Dokumentation](docs/de/pid_de.md)

## Credits
Die Bereitstellung dieses Adapters wäre ohne die großartige Arbeit von @Philmod (https://github.com/Philmod), der den Node-Pid-Controller (https://github.com/Philmod/node-pid-controller) entwickelt hat, nicht möglich gewesen. .

## So melden Sie Probleme und Funktionswünsche
Bitte nutzen Sie hierfür GitHub Issues.

Am besten stellen Sie den Adapter auf den Debug-Protokollmodus ein (Instanzen -> Expertenmodus -> Spaltenprotokollebene). Dann holen Sie sich bitte die Protokolldatei von der Festplatte (Unterverzeichnis „log“ im ioBroker-Installationsverzeichnis und nicht vom Administrator, da der Administrator die Zeilen abschneidet). Wenn Sie es nicht in der GitHub-Ausgabe bereitstellen möchten, können Sie es mir auch per E-Mail (mcm57@gmx.at) senden. Bitte fügen Sie einen Verweis auf das entsprechende GitHub-Problem hinzu UND beschreiben Sie auch, was ich zu welchem Zeitpunkt im Protokoll sehe.
„title“: „lblCtrlInvert“,

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.8 (2023-07-13)

-   (mcm1957) changed: Overall stability during state updates has been increased
-   (mcm1957) changed: Dependencies have been updated

### 0.0.7 (2023-04-24)

-   (mcm1957) changed: Cycle time is now required to be at least 100ms
-   (mcm1957) changed: Recalculations are now controlled by cycle timer only, no extra updates are performed (#62)
-   (mcm1957) changed: Several dependencies have been updated

### 0.0.6 (2023-04-14)

-   (mcm1957) solved: Calculation of sumerr in case of hitting max/min Limits has been corrected

### 0.0.5 (2023-04-14)

-   (mcm1957) new: npm/npmjs support has been added

### 0.0.4 (2023-04-14)

-   (mcm1957) changed: State last_upd_str has been removed
-   (mcm1957) changed: Some roles have been updated
-   (mcm1957) changed: Translations have been updated

### 0.0.3-alpha.1 (2023-04-13)

-   (mcm1957) changed: Setting rst state does no longer trigger a recalculation
-   (mcm1957) changed: State diff now displays error value even if sup is active
-   (mcm1957) changed: Calculation of I-part has been changed, changing Tn effects future calculations only now

### 0.0.3-alpha.0 (2023-04-12)

-   (mcm1957) new: optionally use folder structure for states
-   (mcm1957) changed: reset timer at restart after pausing calculation
-   (mcm1957) changed: use values stored for ack and set when starting adapter
-   (mcm1957) changed: log state changes with unexpected ack=true
-   (mcm1957) changed: fix incorrect updates occuring whenever act is written
-   (mcm1957) changed: fix invert flag not working at all
-   (mcm1957) changed: remove error display whenever adapter is hitting the limits
-   (mcm1957) changed: fix q flag handling
-   (mcm1957) changed: fix unexpected bahavior of sup parameter
-   (mcm1957) changed: rename run state to hold

### 0.0.2-alpha.2 (2023-04-06)

-   (mcm1957) changed: values of 'kp', 'xp' and 'sup' are now verified if set using states
-   (mcm1957) changed: values of 'min' and 'max' are now verified if set using states
-   (mcm1957) changed: activation of 'man' updates output 'y' with current value of 'man_inp' now
-   (mcm1957) changed: 'min' value is now conserved when restarting the instance
-   (mcm1957) changed: conversion between and xp has been fixed at several places
-   (mcm1957) changed: 'kp' or 'xp' are writepotected now depending on 'useXp' parameter

### 0.0.2-alpha.1 (2023-04-04)

-   (mcm1957) changed: some small fixes

### 0.0.2-alpha.0 (2023-04-04)

-   (mcm1957) THIS IS AN ALPHA RELEASE ONLY
-   (mcm1957) major changes after discussion in forum
-   (mcm1957) new initial release

## License

MIT License

Copyright (c) 2023 mcm1957 <mcm57@gmx.at>

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