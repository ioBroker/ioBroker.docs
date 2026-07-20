---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weathersense/README.md
title: ioBroker.weathersense
hash: KidM5Ba4LU29tLpPps9GkMP8pYa1nrPOuLUfmYmcTjY=
---
![Логотип](../../../en/adapterref/iobroker.weathersense/admin/weathersense.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.weathersense.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weathersense.svg)
![Количество установок](https://iobroker.live/badges/weathersense-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/weathersense-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.weathersense.png?downloads=true)

# IoBroker.weathersense
**Тесты:** ![Тестирование и выпуск](https://github.com/ltspicer/ioBroker.weathersense/workflows/Test%20and%20Release/badge.svg)

## Адаптер WeatherSense для ioBroker
WeatherSense — это облачная платформа для метеостанций. Этот адаптер считывает данные с сервера WeatherSense.

См.: https://play.google.com/store/apps/details?id=com.emax.weahter&hl=de_CH

Некоторые метеостанции, работающие по Wi-Fi, используют облачную платформу WeatherSense.

Например, вот эта метеостанция с Wi-Fi от компании Ideoon (Pearl):

![Скриншот](https://github.com/ltspicer/WeatherSense/blob/main/wetterstation.png)

![Скриншот](https://github.com/ltspicer/WeatherSense/blob/main/casativo_ideoon_weatherstation.png)

## Использовать:
Просто введите данные для входа в свою учетную запись WeatherSense (адрес электронной почты и пароль).
Данные метеостанции сохраняются в точке данных WeatherSense.
Данные также могут передаваться через MQTT.

## Работа с несколькими метеостанциями (поддержка нескольких экземпляров)
Оригинальный облачный сервер WeatherSense имеет программное ограничение/ошибку: если вы зарегистрируете две или более одинаковых метеостанции в одной учетной записи смартфона, они перезапишут друг друга и исчезнут из списка ваших устройств.

Для успешного одновременного чтения данных с нескольких станций без конфликтов можно использовать встроенную многоэкземплярную архитектуру ioBroker.

### Пошаговая настройка:
1. **Создайте отдельные облачные учетные записи:** Зарегистрируйте уникальную бесплатную учетную запись для **каждой** из ваших метеостанций в мобильном приложении WeatherSense (например, *адрес электронной почты A* для станции 1 и *адрес электронной почты B* для станции 2).
2. **Привяжите одну станцию к одной учетной записи:** Привяжите первую станцию исключительно к учетной записи A, а вторую — исключительно к учетной записи B.
3. **Добавьте несколько экземпляров в ioBroker:**
* Перейдите на вкладку «Экземпляры» в ioBroker и добавьте второй экземпляр адаптера WeatherSense (это создаст `weathersense.0` и `weathersense.1`).
4. **Настройте экземпляры:**
* Откройте конфигурацию для **`weathersense.0`** и введите учетные данные для **учетной записи A**. Установите `идентификатор датчика` равным `1`.
* Откройте конфигурацию для **`weathersense.1`** и введите учетные данные для **учетной записи B**. Установите `идентификатор датчика` равным `2`.

### Преимущества данной конфигурации:
* **Отсутствие конфликтов данных:** ioBroker запустит два совершенно отдельных процесса.
* **Разделенные объекты:** Ваши точки данных аккуратно разделены на `weathersense.0.*` и `weathersense.1.*`.
* **Чистая маршрутизация MQTT:** Если вы используете встроенную функцию MQTT, ваши темы будут четко разделены по идентификатору датчика (например, `weathersense/1/...` и `weathersense/2/...`), что предотвратит перезапись данных на вашем брокере.

## Changelog
### 5.2.2 (2026-07-09)

- Typo corrected

### 5.2.1 (2026-07-09)

- Typo corrected

### 5.2.0 (2026-07-09)

- Invert PowerStatus flag added

### 5.1.1 (2026-07-05)

- Bugfix: Unit windDirection km/h → °

### 5.1.0 (2026-07-04)

- Now filenames of JSON files beginning with weathersense.{sensor_id}...

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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