---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.netatmo-crawler/README.md
title: ioBroker.netatmo-crawler
hash: YJtbbntubeP/5CC/A1idWy9ui6wMTFdEprQHr2Oanrs=
---
![Logo](../../../en/adapterref/iobroker.netatmo-crawler/img/netatmo-logo.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.netatmo-crawler.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.netatmo-crawler.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/netatmo-crawler-installed.svg)
![Stabile Version](http://iobroker.live/badges/netatmo-crawler-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Bart1909/iobroker.netatmo-crawler.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/Bart1909/ioBroker.netatmo-crawler/badge.svg)
![Build-Status](https://travis-ci.org/Bart1909/ioBroker.netatmo-crawler.svg?branch=master)
![NPM](https://nodei.co/npm/iobroker.netatmo-crawler.png?downloads=true)

# IoBroker.netatmo-crawler
Netatmo-Crawler-Adapter für ioBroker

=================

Crawlt Informationen von öffentlichen Netatmo-Stationen

Inhaltsverzeichnis

=================

* [Anweisung](#Anweisung)
* [Allgemeine Informationen](#general-information)
* [Luftfeuchtigkeit](#Luftfeuchtigkeit)
* [Regen](#rain)
* [Druck](#Druck)
* [Temperatur](#temperature)
* [Wind](#wind)
* [Credits](#credits)
* [Änderungsprotokoll](#changelog)
* [Lizenz](#Lizenz)

Anweisung

===========

Um die URL Ihrer bevorzugten Wetterstation zu finden, folgen Sie diesen Schritten:

1. Öffnen Sie die [Netatmo-Wetterkarte](https://weathermap.netatmo.com)
2. Suchen Sie Ihre Station und klicken Sie auf das Teilen-Symbol

   ![Bild teilen](../../../en/adapterref/iobroker.netatmo-crawler/img/share.jpg)

3. Klicken Sie auf *Link kopieren*

   ![Link kopieren](../../../en/adapterref/iobroker.netatmo-crawler/img/copyLink.jpg)

4. Fügen Sie den Link in die Instanzeinstellungen des Adapters ein

   ![Einfügen](../../../en/adapterref/iobroker.netatmo-crawler/img/insert.png)

allgemeine Informationen

===================

Der „Netatmo Crawler“ analysiert viele lokale Informationen in Ihrer Nähe. Was machen Sie mit all diesen Informationen? Hier sind einige allgemeine Fakten und Beispiele:

Luftfeuchtigkeit -------- Netatmo verwendet die relative Luftfeuchtigkeit. Dies ist das Verhältnis der aktuellen absoluten Luftfeuchtigkeit zur höchstmöglichen absoluten Luftfeuchtigkeit (abhängig von der aktuellen Lufttemperatur). Ein Wert von 100 Prozent relativer Luftfeuchtigkeit bedeutet, dass die Luft vollständig mit Wasserdampf gesättigt ist und keinen weiteren Wasserdampf aufnehmen kann, wodurch Regen möglich ist. Das bedeutet nicht, dass die relative Luftfeuchtigkeit 100 Prozent betragen muss, damit es regnet – sie muss dort, wo sich Wolken bilden, 100 Prozent betragen, aber die relative Luftfeuchtigkeit in Bodennähe kann deutlich geringer sein.

Regen ---- Verwendet die Einheit Millimeter. Wenn Sie die Einheit Liter pro Kubikmeter wünschen, können Sie diese trotzdem verwenden. Sie können diese beispielsweise für die Gartenbewässerung verwenden.

Druck -------- Die Luft um Sie herum hat Gewicht und drückt auf alles, was sie berührt. Dieser Druck wird atmosphärischer Druck oder Luftdruck genannt.
Was tun Sie mit diesem Wert? So einfach es klingt: Wettervorhersage! Hoher Druck = gutes Wetter, niedriger Druck = schlechtes Wetter.
Der normale Mittelwert liegt bei 1013 mBar.
Für eine „echte“ Wettervorhersage benötigen Sie den Druckverlauf für einige Stunden (ich verwende vier Stunden).
Sinkt der Druck, sollte es in Zukunft schlechtes Wetter geben, steigt er, sollte es gutes Wetter geben.
Ich habe eine [Skript für die Prognose hier](http://www.beteljuice.co.uk/zambretti/forecast.html) gefunden (sie heißt Zambretti-Methode für eine 90%-Vorhersage).
Andere Einheiten: 1 mbar = 100 Pa = 1 hPa

Temperatur ----------- Hier können Sie die gefühlte Temperatur berechnen. Für niedrige Temperaturen verwenden Sie den Windchill (10 °C oder weniger, Berechnung mit Wind), für hohe Temperaturen den Hitzeindex (25 °C oder mehr, Berechnung mit Luftfeuchtigkeit).
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

Wind – Die Windgeschwindigkeit ist ein Maß für die Bewegung von Luft von hohem zu niedrigem Druck, meist aufgrund von Temperaturschwankungen.
Die Böenstärke ist der höchste Windwert, gemessen in einer kurzen Zeit (etwa drei Sekunden).
Sie sollten ein Skript für Ihre Markise oder für die Zambretti-Methode erstellen (siehe oben).

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @bart1909 (https://github.com/jbart1909) nicht möglich gewesen, der Versionen dieses Adapters vor V1.x.x erstellt hat.

Vielen Dank an [Backfisch](https://github.com/backfisch88) für die ursprüngliche Idee und Unterstützung!

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2025-06-13)
* (Bart1909) A problem handling urls and authentication has been fixed.
* (mcm1957) Adapter has been migrated into iobroker-community-adapters organisation.
* (Bart1909) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) Dependencies have been updated.

### 0.8.0
* (Bart19) Adds additional 'rain_lastHour' state as 'rain' state is now real time value

### 0.7.1
* (Bart19) removed old news (#17)

### 0.7.0
* (Bart19) saves states as read-only (#23)

### 0.6.3
* (Bart19) updates dependencies

## License

MIT License

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022 Bart19 <webmaster@bart19.de>

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