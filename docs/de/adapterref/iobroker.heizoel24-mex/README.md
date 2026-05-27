---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: m9tlHglZw1zXdc24DjansbtlpKjHplLaw4XBW6nga4o=
---
![Logo](../../../en/adapterref/iobroker.heizoel24-mex/admin/heizoel24-mex.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)
![Anzahl der Installationen](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/heizoel24-mex-stable.svg)
![NPM](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)

# IoBroker.heizoel24-mex
**Tests:** ![Test und Freigabe](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## Heizoel24-MEX-Adapter für ioBroker
Das MEX ist ein Heizöl-Füllstandsmessgerät. Dieser Adapter liest die MEX-Daten vom Heizoel24-Server aus.

Siehe: https://www.heizoel24.de/mex

## Verwenden:
Geben Sie einfach die Anmeldedaten Ihres Heizoel24-Kontos (E-Mail-Adresse und Passwort) ein.<br> Die MEX-Daten sind im Datenpunkt heizoel24-mex gespeichert.<br> Der Adapter startet standardmäßig alle 3 Stunden. Das ist völlig ausreichend, da der MEX nur einmal täglich Daten sendet.<br> Die Datenpunkte CalculatedRemaining/JsonForEcharts (berechnete Restmenge) und OilUsage/JsonForEcharts können direkt mit eCharts verwendet werden.<br> Der Adapter kann Daten via MQTT senden.<br> Die Original-App berechnet die jährliche Nutzung immer zum 31. Dezember.<br> Das ist unpraktisch, da dies mitten in der Heizperiode geschieht.<br> Dieser Adapter kann den Jahresverbrauch auf Basis eines bestimmten Monats berechnen.<br>

## Changelog
### 1.9.2 (2026-05-26)

- Fix: Prevent crash on network errors by safely handling axios exceptions…
- Issues E0036 & E5050 resolved

### 1.9.1 (2026-05-22)

- Fix: Prevent crash on network errors by safely handling axios exceptions & Remove unused main1.js backup file

### 1.9.0 (2026-05-03)
- (copilot) Adapter requires node.js >= 22 now

### 1.8.1 (2026-04-06)

- "Reference month for annual consumption (1–12)" edited

### 1.8.0 (2026-04-05)

- Yearly Oil usage by reference month added