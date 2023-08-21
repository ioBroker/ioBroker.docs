---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarwetter/README.md
title: ioBroker.solarwetter
hash: iFiZKXxoTa8ilR4AJyMW3YZS4yNkcUfjQV+4FuxNpG8=
---
![Логотип](../../../en/adapterref/iobroker.solarwetter/admin/solarwetter.png)

![Количество установок](http://iobroker.live/badges/solarwetter-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.solarwetter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarwetter.svg)
![НПМ](https://nodei.co/npm/iobroker.solarwetter.png?downloads=true)

# IoBroker.solarwetter
## Информация / Описание
:de: Dieser Adapter обеспечивает прогнозирование данных Solarstrom Tagesertrag für eine bestimmte Region. Die Daten kommen [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).
Bei Eingabe der Leistung der eigenen Solaranlage errechnet der Adapter auch die zu erwartende Energieabgabe der Anlage.

:uk: Этот адаптер предоставляет прогноз ежедневного количества солнечной энергии для определенного региона от поставщика [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).
Переводить!!!!

## Einstellungen / Конфигурация
### Пользователь/Пароль
Seit 2022/03 ist die Authentifizierung beim Anbieter nicht mehr nötig.

С 2022/03 аутентификация больше не требуется.

### Стандарт/местоположение
Örtlichkeit durch Auswahl des Postleitzahlenbereichs bestimmen Gesamtleistung der eigenen Solaranlage zur Berechnung der Energieerzeugung

Выберите свой регион, выбрав из списка почтовых индексов.
Введите мощность вашей солнечной электростанции, чтобы рассчитать выходную мощность.

### Solaranlage / Солнечная электростанция
Hier kann die Gesamtleistung der eigenen Solaranlage zur Rechnung der voraussichtlich erzeugten Energiemenge eingegeben werden (auch Dezimalzahlen möglich).

Введите общую мощность вашей солнечной электростанции, чтобы рассчитать ежедневный прогноз производства энергии (возможны десятичные разделители)

### 4-Tage-Prognose / 4-дневный прогноз
Wählen Sie Hier Eine Stadt. Der Adapter erzeugt einen Link zu einem Chart mit der 4-Tage-Prognose (Datenpunkt `solarwetter.0.forecast.chart.__url__` ).

Выберите город, чтобы адаптер создал ссылку на график прогноза на 4 дня (точка данных `solarwetter.0.forecast.chart.__url__` ).

![альтернативный текст](../../../en/adapterref/iobroker.solarwetter/img/solarwetterSettingScreenshot.jpg "Настройки снимка экрана")

## Активация / Расписание
Der Adapter startet einmal täglich.

Адаптер запускается раз в сутки.

## Datenpunkte / Datapoints
`solarwetter.0.forecast.__clearSky__` (*значение*)

`solarwetter.0.forecast.__realSky_min__` (*значение*)

`solarwetter.0.forecast.__realSky_max__` (*значение*)

`solarwetter.0.forecast.__Datum__` (*строка, без метки времени*)

`solarwetter.0.forecast.__Region__` (*значение*)

`solarwetter.0.forecast.home.__clearSky__` (*значение*)

`solarwetter.0.forecast.home.__realSky_min__` (*значение*)

`solarwetter.0.forecast.home.__realSky_max__` (*значение*)

`solarwetter.0.forecast.home.__Leistung__` (*значение*)

`solarwetter.0.forecast.chart.__city__` (*значение*)

`solarwetter.0.forecast.chart.__url__` (*значение*)

<!-- ### **ВЫПОЛНЯЕТСЯ** -->

### 1.1.5 (15 августа 2023 г.)
* (motuditli) С поправкой на изменения сайта - удаление аутентификации
* (bluefox) Добавлен компактный режим и конфигурация JSON

### 1.0.0 (2017-10-15)
* (pix) Конец бета-тестирования, требуется Node.js 4 или выше

### 0.3.0 (28 мая 2017 г.)
* (pix) Войти с паролем веб-сайта и именем пользователя

### 0.2.0 (05.01.2017)
* (пикс) Добавлено тестирование Travis CI

### 0.1.2 (21 июня 2016 г.)
* (пиксель) исправлен выбор города

### 0.1.1 (20 июня 2016 г.)
* (пикс) Диаграмма прогноза на 4 дня

### 0.1.0 (2016-06-12)
* (пикс) опубликовать на npm

### 0.0.6 (2016-06-09)
* (пикс.) Исправлена функция Adapter.stop()

### 0.0.5 (2016-05-14)
* (пиксель) Настройки теперь показывают правильное местоположение, если оно уже определено

### 0.0.4 (13 мая 2016 г.)
* (пикс) Внешний вид окна настроек

### 0.0.3 (13 мая 2016 г.)
* (пикс) Расчет мощности собственной солнечной электростанции

### 0.0.2 (13 мая 2016 г.)
* (пикс.) Выбираемая область почтового индекса

### 0.0.1 (2016-05-12)
* (пикс) первый выпуск

## Делать
* Перевод точек данных
* Русский перевод окна настроек

## License

The MIT License (MIT)

Copyright (c) 2020-2023 pix

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

---
*Logo is partly crafted by CHALLENGER* :+1: