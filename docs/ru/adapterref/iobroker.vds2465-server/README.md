---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vds2465-server/README.md
title: ioBroker.vds2465-сервер
hash: Zxq/QGZttqQJD3uwSPiK8e3xNBSsSujuBG33TwIhn7U=
---
![Логотип](../../../en/adapterref/iobroker.vds2465-server/admin/vds2465-server.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.vds2465-server.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vds2465-server.svg)
![Количество установок](https://iobroker.live/badges/vds2465-server-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/vds2465-server-stable.svg)
![Статус зависимости](https://img.shields.io/david/Hirsch-DE/iobroker.vds2465-server.svg)
![НПМ](https://nodei.co/npm/iobroker.vds2465-server.png?downloads=true)

# IoBroker.vds2465-сервер
**Тесты:** ![Тестируйте и выпускайте](https://github.com/Hirsch-DE/ioBroker.vds2465-server/workflows/Test%20and%20Release/badge.svg)

## Адаптер vds2465-server для ioBroker
Empfänger von VdS2465-Meldungen

Der Adapter empfängt Meldungen Meldungen von Wählgeräten mit dem VdS2465-2 Protokoll.
Dabei sind folgende Varianten möglich

1. bedarfsgesteuert unverschlüsselt
1. stehend unverschlüsselt
1. bedarfsgesteuert verschlüsselt (AES-128-Bit)
1. stehend verschlüsselt (AES-128-Bit)

Bei stehenden Verbindungen kann vom Adapter aus der Status von Eingängen und Ausgängen abgefragt, sowie bei Ausgängen der Zustand umgeschaltet werden.

Die Relais werden über die Adapter-Konfiguration als Objekt angelegt.

Es werden zusätzliche Inhalte wie

- Приоритет
- Fehlermeldungen
- Тестирование
- Datum und Uhrzeit
- Цайхенфольге
- Herstelleridentifikation
- Gerätemerkmale
- Транспортная служба
- Telegrammzahler

ausgewertet.

Адаптер Von diesem wird auch das "Service Request" unterstützt, welches in einigen Wählgeräten auch beim alten VdS2465-Protokoll aktiviert werden kann.

## Changelog

### 0.1.0
* (Hirsch-DE) Fix VdSServiceRequest
* (Hirsch-DE) Zaehler Service Request festgelegt
* (Hirsch-DE) Haendeln von mehreren Verbindungen von einer ID
* (Hirsch-DE) Blockierende Schleife entfernt
### 0.0.3
* (Hirsch-DE) Fix Priorität
* (Hirsch-DE) Fix VdS-Request
### 0.0.2
* (Hirsch-DE) Andere Sprachen in Einstelldialog hinzugefügt
* (Hirsch-DE) diverse kleine Anpassungen
### 0.0.1
* (Hirsch-DE) initial release

## License
MIT License

Copyright (c) 2022 Hirsch-DE <github731@hirschfeldonline.de>

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