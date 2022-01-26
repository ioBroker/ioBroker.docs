---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hekr/README.md
title: ioBroker.hekr
hash: /5C1XJSnWxGJjGbsjCn9PIRw6CU+e2Dt+QNrFoYSmY8=
---
![Логотип](../../../en/adapterref/iobroker.hekr/admin/hekr.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.hekr.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hekr.svg)
![Количество установок](https://iobroker.live/badges/hekr-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/hekr-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.hekr.svg)
![НПМ](https://nodei.co/npm/iobroker.hekr.png?downloads=true)

# IoBroker.hekr
** Испытания: ** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.hekr/workflows/Test%20and%20Release/badge.svg)

## Адаптер hekr для ioBroker
Адаптер для приложений Hekr Wisen Elro

## Loginablauf
Die Wisen App Mail и пароль.

## Befehle im lokalen Netzwerk senden
Befehle werden im lokalen Netzwerk an das Gerät gesendet.

## Steuern
Einschalten / Ausschalten hekr.0. {ID} .status.sw auf 1 или 0 setzen hekr.0. {ID} .status.light_Sw auf 1 или 0 setzen hekr.0. {ID} .status.Statue 0 = Aus, 1 = Ожидание, 2 = Личен / L� после hekr.0. {ID} .status.cleaning auf 0 stzen l�scht die Info Filterwechsel.
hekr.0. {ID} .status.rgb Wechselt die Farbe der Haube. Nur Hex erlaubt Bsp. # 65ff00 или 65ff00 hekr.0. {ID} .status.speed Geschwindigkeit 1, 2, 3 и 4 m�glich.
hekr.0. {ID} .status.time Zeit von IOBroker wird wird �bertragen.
hekr.0. {ID} .status.tm_Minutes Automatische Abschaltung Wert 1-60 m�glich hekr.0. {ID} .status.B Kann nicht gesteuert werden. Anzeige der aktuelle Farbe.
hekr.0. {ID} .status.G Kann nicht gesteuert werden. Anzeige der aktuelle Farbe.
hekr.0. {ID} .status.R Kann nicht gesteuert werden. Anzeige der aktuelle Farbe.
hekr.0. {ID} .status.fitter Bei 1 muss der Kohlefilter gewechselt oder gereinigt werden.

## Diskussion und Fragen
<https://forum.iobroker.net/topic/48262/test-adapter-hekr-wisen-elro-app-v0-0-x>

## Changelog

### 0.0.3

* (TA2k) initial release

## License

MIT License

Copyright (c) 2021 TA2k <tombox2020@gmail.com>

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