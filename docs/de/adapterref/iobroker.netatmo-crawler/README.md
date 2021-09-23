---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.netatmo-crawler/README.md
title: ioBroker.netatmo-crawler
hash: oB8p/jhz6Le9bthZbypmyxDLjomElX9IjZQRjTISB0g=
---
![Logo](../../../en/adapterref/iobroker.netatmo-crawler/img/netatmo-logo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.netatmo-crawler.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo-crawler.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/netatmo-crawler-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/netatmo-crawler-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Bart1909/iobroker.netatmo-crawler.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Bart1909/ioBroker.netatmo-crawler/badge.svg)
![Build-Status](https://travis-ci.org/Bart1909/ioBroker.netatmo-crawler.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.netatmo-crawler.png?downloads=true)

# IoBroker.netatmo-Crawler
netatmo-Crawler-Adapter für ioBroker

=================

Crawlt Informationen von öffentlichen Netatmo-Stationen

Inhaltsverzeichnis

=================

* [Anleitung](#Anleitung)
* [Allgemeine Informationen](#allgemeine-Informationen)
* [Luftfeuchtigkeit](#Luftfeuchtigkeit)
* [Regen regen)
* [Druck](#Druck)
* [Temperatur](#temperatur)
* [Wind](#Wind)
* [Informationen](#Informationen)
* [Credits](#Credits)
* [Änderungsprotokoll](#Änderungsprotokoll)
* [Lizenz](#Lizenz)

Anweisung

===========

Gehen Sie folgendermaßen vor, um die URL Ihrer bevorzugten Wetterstation zu finden:

1. Öffnen Sie die [Netatmo Wetterkarte](https://weathermap.netatmo.com)
2. Suchen Sie Ihre Station und klicken Sie auf das Teilen-Symbol

   ![Bild teilen](../../../en/adapterref/iobroker.netatmo-crawler/img/share.jpg)

3. Klicken Sie auf *Link kopieren*

   ![Link kopieren](../../../en/adapterref/iobroker.netatmo-crawler/img/copyLink.jpg)

4. Fügen Sie den Link in die Instanzeinstellungen des Adapters ein

   ![Einfügung](../../../en/adapterref/iobroker.netatmo-crawler/img/insert.png)

Allgemeine Information

===================

Der „Netatmo Crawler“ analysiert viele echte lokale Informationen in Ihrer Nähe. Was machst du mit all diesen Informationen? Hier einige allgemeine Fakten und Beispiele:

Luftfeuchtigkeit -------- Netatmo verwendet die relative Luftfeuchtigkeit, dies ist das Verhältnis der aktuellen absoluten Luftfeuchtigkeit zur höchstmöglichen absoluten Luftfeuchtigkeit (die von der aktuellen Lufttemperatur abhängt). Ein Messwert von 100 Prozent relativer Luftfeuchtigkeit bedeutet, dass die Luft vollständig mit Wasserdampf gesättigt ist und nicht mehr aufnehmen kann, sodass Regen möglich ist. Dies bedeutet nicht, dass die relative Luftfeuchtigkeit 100 Prozent betragen muss, damit es regnen kann – sie muss 100 Prozent betragen, wo sich die Wolken bilden, aber die relative Luftfeuchtigkeit in Bodennähe könnte viel geringer sein.

Regen ---- Verwendet die Einheit Millimeter. Wenn Sie die Einheit Liter pro Meter Würfel wünschen, können Sie diese trotzdem verwenden. Sie können es beispielsweise zum Gießen im Garten verwenden.

Druck -------- Die Luft um dich herum hat Gewicht und drückt gegen alles, was sie berührt. Dieser Druck wird Atmosphärendruck oder Luftdruck genannt.
Was tun mit diesem Wert? So einfach es klingt: Wettervorhersage! Hochdruck = gutes Wetter, niedriger Druck = schlechtes Wetter.
Der normale Mittelwert beträgt 1013 mBar.
Für eine „echte“ Wettervorhersage sollten Sie die Druckhistorie für einige Stunden benötigen (ich verwende vier Stunden).
Wenn es fällt, soll es in Zukunft schlechtes Wetter sein, wenn es steigt, soll es gutes Wetter sein.
Ich habe eine [Skript für die Vorhersage hier](http://www.beteljuice.co.uk/zambretti/forecast.html) gefunden (sie heißt Zambretti-Methode für eine 90%-Prognose).
Andere Einheiten: 1 mbar = 100 Pa = 1 hPa

Temperatur -------------- Hier können Sie die Kühltemperatur berechnen. Bei niedrigen Temperaturen den Windchill (10 °C oder niedriger, mit Wind rechnen) für hohe Temperaturen können Sie den Hitzeindex (25 °C oder höher, mit Luftfeuchtigkeit berechnen) verwenden.
Beispielskript:

```
windchill1 = windchill(temp, windkmh); //Vars to-from IOBroker

function windchill(temperature, windspeed) {
	var windchill = 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windspeed, 0.16) + 0.3965 *
			temperature * Math.pow(windspeed, 0.16);
	return windchill;
}

heatindex1 = heatindex(temp, hum); //Vars to-from IOBroker

function heat(temperature, humidity) {
	var heatindex = -8.784695 + 1.61139411 * temperature + 2.338549 * humidity - 0.14611605 *
			temperature * humidity - 0.012308094 * (temperature * temperature) -
			0.016424828 * (humidity * humidity) + 0.002211732* (temperature *
			temperature) * humidity + 0.00072546 * temperature * (humidity * humidity)
			- 0.000003582 * (temperature * temperature) * (humidity * humidity);
	return heatindex;
}
```

Wind ---- Die Windgeschwindigkeit ist ein Maß dafür, dass sich die Luft von hohem zu niedrigem Druck bewegt, normalerweise aufgrund von Temperaturänderungen.
Die Böenstärke ist der höchste Windwert, gemessen in kurzer Zeit (etwa drei Sekunden).
Sie sollten ein Skript für Ihre Markise oder für die Zambretti-Methode erstellen (siehe oben).

Information ---- **Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Credits

=======

Vielen Dank an [Backfisch](https://github.com/backfisch88) für die erste Idee und Unterstützung!

## Changelog

### 0.6.0
* (Xenon-s) saves states with acknowledgement (#23 & #26)
* (Bart19) updates dependencies and documentation (#25 & #27)
### 0.5.1
* (Bart19) updates dependencies
### 0.5.0
* (Bart19) adds measures for wind and gust with m/s (#22) and do not query rain_today in the first 15 minutes of a day (#21)
### 0.4.1
* (Bart19) changes exit code and introduces an exit message
### 0.4.0
* (Bart19) Rounds values to two decimals
### 0.3.13
* (Bart19) updates dependencies
### 0.3.9
* (Bart19) updates dependencies
### 0.3.8
* (Bart19) small fix in error handling
### 0.3.7
* (Bart19) caches authorization token
### 0.3.6
* (Bart19) adds Sentry for error reporting
### 0.3.5
* (Bart19) fix for new netatmo website
### 0.3.4
* (Bart19) optimizes error handling
### 0.3.3
* (Bart19) changes some log level
* (Backfisch) adds more documentation
### 0.3.2
* (Bart19) fixes, that rain_yesterday was saved with value rain_today
### 0.3.1
* (Bart19) optimizes error handling
### 0.3.0
* (Bart19) adds timestamps, when last info retrieved from Netatmo and timestamp, when each measure was updated last. In addition, rain_yesterday added
### 0.2.0
* (Bart19) changes admin view. Now you can enter as many station urls as you want. In addition, you can select, how the data should be stored
### 0.1.2
* (Bart19) fix for station4 and introduces allowInit, so adapter will run once on config edits
### 0.1.1
* (Bart19) removes files from archive which are unnecessary
### 0.1.0
* (Bart19) implements automatic tests
### 0.0.8
* (Bart19) updates logo
### 0.0.7
* (Bart19) changes loglevel
### 0.0.6
* (Bart19) updates description
### 0.0.5
* (Bart19) bugfixes
### 0.0.4
* (Bart19) bugfixes
### 0.0.3
* (Bart19) bugfixes
### 0.0.2
* (Bart19) bugfixes
### 0.0.1
* (Bart19) initial release

## License

MIT License

Copyright (c) 2020 Bart19 <webmaster@bart19.de>

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