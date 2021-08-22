---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.awattar/README.md
title: ioBroker.awattar
hash: PzT3xH36qGE3IjMR6UxLBEKz75D3cNiyFUoMT48FoK0=
---
![Логотип](../../../en/adapterref/iobroker.awattar/admin/awattar.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.awattar.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.awattar.svg)
![Количество установок (последнее)](http://iobroker.live/badges/awattar-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/awattar-stable.svg)
![Статус зависимости](https://img.shields.io/david/sirjojo69/iobroker.awattar.svg)
![Известные уязвимости](https://snyk.io/test/github/sirjojo69/ioBroker.awattar/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.awattar.png?downloads=true)

# IoBroker.awattar
** Тесты: ** ![Тестирование и выпуск](https://github.com/sirjojo69/ioBroker.awattar/workflows/Test%20and%20Release/badge.svg)

<p><a href="https://www.awattar.de/" target="_blank"><img border="0" alt="aWATTar" src="admin/awattarBig.png"></a></p>

## Адаптер aWATTar для ioBroker
Этот адаптер считывает почасовые цены на ближайший день поставщика электроэнергии <a href="https://www.awattar.de/" target="_blank">aWATTar</a> для почасовых и почасовых тарифов CAP. С помощью этой информации вы можете контролировать, когда, например, ваш электромобиль или домашнее хранилище следует заряжать (а именно, в самое дешевое время). Поскольку этот провайдер предлагает свои услуги только в Австрии и Германии, подробное описание только на немецком языке.

Dieser Adapter ist die Stunden Preise für den kommenden Tag des Stromanbieters <a href="https://www.awattar.de/" target="_blank">aWATTar</a> für die Tarife ежечасно и почасово CAP. Mit dieser Information kann man dann steuern wann zb das Elektroauto oder der Hausspeicher geladen werden soll (nämlich zur billigsten Zeit).

In den Einstellungen des Adapters findest du 5 Felder (die jeweils mit Standardwerten belegt sind):<li> В переменной &quot;URL для API WATTAR&quot; указан URL-адрес для API Preis Datenfeed от WATTAR.</li><li> Wer (zB für die Beladung seines Elektroautos) die billigsten Stunden in der Nacht wissen will, benutzt die beiden folgenden Parameter.<ul> In der Variable &quot;Start Threshold Loading (eg for EV)&quot; steht eine Uhrzeit die den Beginn eines Zeitraumes darstellt, für den man die billigsten Stunden in geordneter Reihenfolge bekommen möchte</ul><ul> In der Variable &quot;End Threshold Loading&quot; steht eine Uhrzeit die das Ende eines Zeitraumes darstellt, für den man die billigsten Stunden in geordneter Reihenfolge bekommen möchte</ul></li><li> In der Variable «фактическая ставка НДС (в процентах)» muss die aktuell gültige Mwst. angegeben werden. Die Preise die über die Schnittstelle kommen sind ohne Mwst.</li><li> In der Variable &quot;Arbeitspreis (&quot; Netznutzung &quot;+&quot; Umlagen, Abgaben, Steuern &quot;+&quot; Kosten für Ökostromzertifikate, Abrechnung und Vertrieb &quot;, включая MWSt.)&quot; Kannst du deinen persönlichen Arbeitspreis eintragen (abreitspreis eintragen)</li><br> Die Ergebnisse stehen dann im Object Baum des Adapters. (awattar.0) Der Folder «Цены» Enthält für Jede Stunde des Tages einen Eintrag mit dem Strompreis für diese Stunde Der Folder «price_ordered» enthält -sortiert nach dem Stundenpreis- einen Eintrag für jede Stunde des in den Settings Демократичные настройки für diese Stunde.<br><br> Im Ausgangszustand ist der Adapter так eingestellt dass er um 15.00 Uhr die Werte für die 24h des nächsten Tages holt. Расписание Dieser kann natürlich angepasst werden. Laut <a href="https://www.awattar.de/services/api" target="_blank">aWATTar api Doku</a> stehen diese Werte jeden Tag um 14.00 Uhr bereit.

## Changelog

### 1.0.6
* (SirJojo69) new version for official repo

### 1.0.5
* (SirJojo69) Gesamtpreis und Bruttopreis hinzugefügt, API Aufruf mit start und ende. some internal fixes.

### 1.0.3
* (SirJojo69) einige Einstellungen verändert.

### 1.0.1
* (SirJojo69) deleted admin tab.

### 1.0.0
* (SirJojo69) first stable release.

### 0.0.1
* (SirJojo69) initial release.

## License
MIT License

Copyright (c) 2020 - 2021 SirJojo69 <gtj.howe@gmx.de>

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