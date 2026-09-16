---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vds2465-server/README.md
title: ioBroker.vds2465-server
hash: GPA+sUr8uEvtOAYqv6pPPSMP8hADy6IHfDXKxnBdgbo=
---
![Логотип](../../../en/adapterref/iobroker.vds2465-server/admin/vds2465-server.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.vds2465-server.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vds2465-server.svg)
![Количество установок](https://iobroker.live/badges/vds2465-server-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/vds2465-server-stable.svg)
![Статус зависимости](https://img.shields.io/david/Hirsch-DE/iobroker.vds2465-server.svg)
![НПМ](https://nodei.co/npm/iobroker.vds2465-server.png?downloads=true)
![Тестирование и выпуск](https://github.com/Hirsch-DE/ioBroker.vds2465-server/workflows/Test%20and%20Release/badge.svg)

# ioBroker.vds2465-server

## vds2465-server адаптер для ioBroker

Эмпфенгер от VdS2465-Meldungen

Адаптер должен быть подключен к протоколу VdS2465-S2. Dabei sind folgende Varianten möglich

1. bedarfsgesteuert unverschlüsselt
2. stehend unverschlüsselt
3. bedarfsgesteuert verschlüsselt (AES-128-бит)
4. Stehend Verschlüsselt (AES-128-бит)

Если вы хотите, чтобы адаптер был установлен в зависимости от состояния вашего устройства и дополнительного места, вы должны быть уверены в том, что вы используете адаптер.

Реле включает конфигурацию адаптера в качестве объекта ангела.

Es werden zusätzliche Inhalte wie

- Приоритет
- Fehlermeldungen
- Testmeldung
- Дата и время
- Zeichenfolge
- Herstelleridentifikation
- Gerätemerkmale
- Transportdienstkennung
- Telegrammzähler

ausgewertet.

Если адаптер будет включен в «Запрос на обслуживание», он может быть активирован или включен в другой протокол VdS2465.

## Changelog
### 1.1.1
* (Hirsch-DE) Dependencies updated
* (Hirsch-DE) Minimum node.js version is 22.x
### 1.1.0
* (Hirsch-DE) devDependencies updated
* (Hirsch-DE) Änderung create in extendObject
* (Hirsch-DE) ConnectionStatus auf dem Device anzeigen
### 1.0.3
* (Hirsch-DE) Fix npm publish
* (Hirsch-DE) dependencies updated
### 1.0.2
* (Hirsch-DE) Packages updated
### 1.0.1
* (Hirsch-DE) Packages updated
* (Hirsch-DE) Design Anpassungen
### 1.0.0
* (Hirsch-DE) Packages updated
* (Hirsch-DE) Minimum node.js version is 18.x

[Older changelogs can be found there](https://github.com/Hirsch-DE/ioBroker.vds2465-server/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 Hirsch-DE <github731@hirschfeldonline.de>

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