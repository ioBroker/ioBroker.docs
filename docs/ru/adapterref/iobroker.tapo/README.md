---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tapo/README.md
title: ioBroker.tapo
hash: RfiNbbyj4P5BGxOht9yHSwECxWi6Gi6dTc+McamHXX8=
---
![Логотип](../../../en/adapterref/iobroker.tapo/admin/tapo.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.tapo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tapo.svg)
![Количество установок](https://iobroker.live/badges/tapo-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/tapo-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.tapo.svg)
![НПМ](https://nodei.co/npm/iobroker.tapo.png?downloads=true)

# IoBroker.tapo
**Тесты:** ![Тестируйте и выпускайте](https://github.com/TA2k/ioBroker.tapo/workflows/Test%20and%20Release/badge.svg)

## Тапо-адаптер для ioBroker
Адаптер для TP-Link Tapo

на основе https://github.com/apatsufas/homebridge-tapo-p100

## Войти
Die Tapo Mail и Passwort автоматически. Es werden die Geräte via Cloud abgerufen, aber local gesteuert.
Wenn die IP nicht gefunden wird muss sie manuell unter tapo.0.id.ip gesetzt werden.

## Штойрн
tapo.0.id.remote auf true/false setzen steuert den jeweiligen Befehl. Der Befehl wird местный дас Gerät gesendet.

## Обсуждение и обсуждение
<https://forum.iobroker.net/topic/57336/test-adapter-tp-link-tapo/>

## Changelog

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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
