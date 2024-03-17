---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.air-q/README.md
title: ioBroker.air-q
hash: mzD/gjdYCbOB5POtFxieQaf/0hWj1xkhBVHe0CoSR1c=
---
# IoBroker.air-q

![НПМ-версия](https://img.shields.io/npm/v/iobroker.air-q.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.air-q.svg)
![Количество установок](https://iobroker.live/badges/air-q-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/air-q-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.air-q.png?downloads=true)

<img src="admin/air-q.png" alt="логотип airq" width="200"/>

**Тесты:** ![Тестирование и выпуск](https://github.com/CorantGmbH/ioBroker.air-q/workflows/Test%20and%20Release/badge.svg)

## Содержание
- [О программе](#о)
- [Начало работы](#start)
- [Журнал изменений](#change)
- [Лицензия](#лицензия)

## О<a id="about"/>
Этот адаптер ioBroker используется вместе с нашим [устройство air-Q](https://www.air-q.com). Он опрашивает значения с наших датчиков и отображает их для вас в среде ioBroker.
</br> </br>

![air-Q_frontal + Seitlich_full](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5c38d737-9641-463f-bd07-ac62ce5f1973)

## Начиная<a id="start" />
Вы сможете найти адаптер через интерфейс администратора.

В противном случае вы можете использовать интерфейс командной строки ioBroker через консоль. Просто перейдите в корневую папку ioBroker и добавьте адаптер через

```
iobroker add air-q
```

При этом адаптер будет установлен (если он еще не установлен) и запустится экземпляр.
Если вы хотите только установить адаптер, не создавая экземпляр, используйте следующую команду:

```
iobroker install air-q
```

Для получения дополнительной информации посетите документацию по интерфейсу командной строки ioBroker по адресу https://github.com/ioBroker/ioBroker/wiki/Console-commands.

Чтобы настроить свой экземпляр, вы просто выбираете, хотите ли вы подключить его через IP или короткий идентификатор вашего устройства.

![Скриншот 13.02.2024 103001](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/ec878783-af56-490d-af66-43c53c27df20)

Пожалуйста, убедитесь, что вы вводите правильный IP/ID и пароль.
Затем вы также можете выбрать, как следует получать данные. Вы можете обрезать отрицательные значения, если они вам не нужны, за исключением температуры, конечно. Вы можете настроить частоту опроса данных, введя число в секундах. И, наконец, вы можете выбирать между данными в реальном времени или средними данными.

![Скриншот 13 февраля 2024 г.: 104813](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/429c57ab-933f-4930-a02b-30da7b5df180)

Теперь все готово и можно приступать к работе!

Данные будут получены и отображены на вкладке «Объекты» в соответствии с вашей конфигурацией, когда устройство будет найдено. Конечно, в зависимости от вашего устройства может отображаться больше датчиков.

![Скриншот 13.02.2024 110655](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5639fdcb-3acf-4223-b1fa-fb69016c9d7b)

***На данный момент у нас есть все датчики для air-Q Pro. Дополнительные датчики будут включены в будущий патч.***

## Changelog

### 1.0.1

* Added sensor list update when connecting to a different air-Q in the same instance
* Fixed name display and update of device

### 1.0.0

* Include typescript files by @pr0crstntr in #6
* Created air-Q class by @pr0crstntr in #4
* Fix restart bug by @pr0crstntr in #7
* Update data poll by @pr0crstntr in #8
* Updated io-package by @pr0crstntr in #9
* Fixed save option for configuration by @pr0crstntr in #16
* Added clear intervals on unload by @pr0crstntr in #26
* Update README by @pr0crstntr in #37
* Changed role for temperature and added unit by @pr0crstntr in #38

### 0.0.1

* (Katharina K.) initial release

## License

MIT License

Copyright (c) 2024 Corant GmbH

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