---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: lCaDZJwB+9mUhMR6b2ZBuS/7TKRIWwTIGNIB9R5XeH8=
---
![Логотип](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Количество установок (последние)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)
![Тестирование и выпуск](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

# ioBroker.solarviewdatareader

## ioBroker SolarView Data Reader

Этот адаптер считывает данные измерений с регистратора данных SolarView через его TCP-интерфейс. Для получения информации о SolarView и совместимом оборудовании посетите [веб-сайт SolarView](https://www.solarview.info/solarlogger.aspx) .

Адаптер использует незашифрованное TCP-соединение. SSL/TLS и проверка сертификатов не поддерживаются.

## Требования

- Node.js 22 или более поздняя версия
- ioBroker js-controller 6.0.11 или новее
- ioBroker Admin 7.6.20 или более поздняя версия

## Конфигурация

### Связь

Введите IP-адрес или имя хоста регистратора данных SolarView и его TCP-порт. Порт по умолчанию: `15000`.

### Интервал опроса и временное окно

Установите частоту запроса данных адаптером, от 10 до 3600 секунд. Временной интервал управляет опросом данных фотоэлектрических панелей и инвертора, включая данные о питании D0, когда преобразователь D0 включен. Данные счетчика собственного потребления и данные о потреблении D0 продолжают опрашиваться за пределами этого временного интервала.

Для временного интервала в целые сутки используйте `00:00` к `23:59`.

### Устройства

На вкладке **«Устройства и CCU»** включите только те устройства, которые настроены в SolarView:

- **Конвертер D0** : создает `d0supply` и `d0consumption` данные.
- **Счетчики собственного потребления** : активируйте общий счетчик и/или счетчики с 1 по 4.
- **Инверторы** : активируйте инверторы с 1 по 4 по отдельности.

### Система Homematic CCU переменная

Включите **параметр «Установить системную переменную CCU** для записи текущей мощности фотоэлектрической системы в системную переменную Homematic CCU». Введите, например, идентификатор состояния ioBroker. `hm-rega.0.12345`.

## Штаты

Адаптер создает `pvig` Канал для общих данных о фотоэлектрической системе. В зависимости от конфигурации, он также создает `pvi1` к `pvi4`, `d0supply`, `d0consumption`, и `scm0` к `scm4` каналы.

Каналы для фотоэлектрических систем и инверторов обеспечивают:

| Состояние | Описание                                   | Единица |
| --------- | ------------------------------------------ | ------- |
| `current` | Текущая мощность фотоэлектрических панелей | В       |
| `daily`   | Суточная урожайность                       | кВтч    |
| `monthly` | Ежемесячная доходность                     | кВтч    |
| `yearly`  | Годовая урожайность                        | кВтч    |
| `total`   | Общий урожай                               | кВтч    |

Включенные инверторные каналы также обеспечивают постоянное напряжение и ток для каждого трекера точки максимальной мощности (MPP): `udc` /`idc`, `udcb` /`idcb`, `udcc` /`idcc`, и `udcd` /`idcd` (В/А). В зависимости от версии протокола SolarView, они также могут включать напряжение и ток сети на фазу. `ul1` /`il1` к `ul3` /`il3`, В/А) и температура инвертора (`tkk`, °C).

Он `info` канал содержит информацию о состоянии соединения (`info.connection`) и метка времени последнего успешного обновления (`info.lastUpdate`).

## Changelog
### 1.3.0 (2026-10-26)
* (afuerhoff) legacy polling intervals are migrated from minutes to seconds
* (afuerhoff) socket error handling and connection status reporting improved
* (afuerhoff) configuration organized into tabs with improved validation and help texts
* (afuerhoff) configuration translations updated

### 1.2.6 (2026-09-13)
* (afuerhoff) dependencies updated
* (afuerhoff) issues detected by repository checker fixed [#289], [#305]

### 1.2.5 (2026-05-16)
* (copilot) Adapter requires node.js >= 22 now
* (afuerhoff) dependencies updated
* (afuerhoff) dependabot.yml fixed [#246](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/246)
* (afuerhoff) license information updated

### 1.2.4 (2025-10-24)
* (afuerhoff) dependencies updated
* (afuerhoff) npm security changes
* (afuerhoff) repository checker warnings fixed

### 1.2.3 (2025-09-19)
* (afuerhoff) dependencies updated
* (afuerhoff) repository checker issues fixed
* (afuerhoff) typescript error fixed

## License
MIT License

Copyright (c) 2019-2026 Achim Fürhoff <achim.fuerhoff@outlook.de>

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