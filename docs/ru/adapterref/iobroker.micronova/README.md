---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.micronova/README.md
title: ioBroker.micronova
hash: PwFz3SdyouBU94AQHsGkdrMQkER8mgRvuv0MlD/dqpw=
---
![Логотип](../../../en/adapterref/iobroker.micronova/admin/micronova.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.micronova.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.micronova.svg)
![Количество установок](https://iobroker.live/badges/micronova-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/micronova-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.micronova.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.micronova/workflows/Test%20and%20Release/badge.svg)

# ioBroker.micronova

## Адаптер Micronova для ioBroker

Адаптер для устройств Micronova

Привет, я хочу новый адаптер для Micronova. Дополнительные приложения:

EvaCalòr - PuntoFuoco Elfire Wifi Karmek Wifi Easy Connect Easy Connect Plus Easy Connect Poêle Lorflam Home LMX Remote Control Boreal Home Bronpi Home EOSS WIFI LAMINOXREM REMOTE CONTROL 2.0 Jolly Mec Wi Fi Globe-fire TS Smart Stufe a pellet Italia My Corisit Fonte Flamme contrôle 1 Klover Home Nordic Fire 2.0 GO HEAT Wi-Phire Thermoflux Darwin Evolution Moretti design Fontana Forni MyPiazzetta (MySuperior?) Alfaplam Nina

Проблемы с выходом из системы других систем в системе Einstellungen wählen

## Авторизоваться

Вставить имя пользователя и пароль.

## **Стойерн**

Есть возможность setMethod. Это смещение регистра и значение enc\_val или собственное значение, которое необходимо для регистрации всех смещений с указанными именами.

Zb zum starten 232,85 смещение от status\_manged и для значения ON ist 85 OFF ist 170 также 232 170

установка температуры на 38 градусов (temp\_air = 32893 формула = /2 = 76/2 = 38 32893, 76

Статус актуален. Статус перехода Статус элемента 02 дан под значениями 02, которые можно найти. Der Wert unter Items ist dann der jeweilige Offset forter Registration

.status.Values19 Heizstufe 32895,Wert für Heizstufe

Zustand der Heizung Values02":

0 = Ausgeschaltet 1 = Zündung 2 = Warten auf Flamme 3 = Anlaufen 4 = Heizen 5 = Reinigung 6 = Auskühlen/Abkühlen

9 = keine Pellets vorhanden

## Дискуссия

<https://forum.iobroker.net/topic/59744/test-adapter-micronova-easy-connect-plus>

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