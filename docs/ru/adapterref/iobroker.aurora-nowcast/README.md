---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.aurora-nowcast/README.md
title: ioBroker.aurora-nowcast
hash: PscidRWIBAikwBat+ojYqF9Ab91H0IaiMIV+qsgz9jU=
---
# IoBroker.aurora-nowcast
![Логотип](../../../en/adapterref/iobroker.aurora-nowcast/admin/aurora-nowcast.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.aurora-nowcast.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.aurora-nowcast.svg)
![Количество установок](https://iobroker.live/badges/aurora-nowcast-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/aurora-nowcast-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.aurora-nowcast.png?downloads=true)
![Пожертвовать](https://img.shields.io/badge/Donate-PayPal-blue.svg)

**Тесты:** ![Тестирование и выпуск](https://github.com/chrmenne/ioBroker.aurora-nowcast/actions/workflows/test-and-release.yml/badge.svg)

---

## Адаптер Aurora Nowcast для ioBroker
Предоставляет **актуальные (прогнозируемые) данные** об активности северного и южного сияния для заданного местоположения на основе общедоступных данных Центра прогнозирования космической погоды NOAA (SWPC).

> **Примечание:** > Этот адаптер предоставляет *данные о текущих условиях / краткосрочные прогнозы* на основе измерений в реальном времени и результатов моделирования.

> Он **не** предоставляет долгосрочные прогнозы.

---

## Функции
- Получает данные об активности полярного сияния в режиме реального времени (модель NOAA OVATION) как для северного, так и для южного полушария.
- Вычисляет вероятность видимости северного сияния в заданном местоположении.
- Предоставляет состояния ioBroker для автоматизации, визуализации и оповещений.
- Возможность использования местоположения системы или ручного ввода широты/долготы.
— Подходит для панелей мониторинга, уведомлений и сценариев «умного дома»

---

## Конфигурация
Вы можете сделать одно из двух:

- Используйте местоположение системы, указанное в ioBroker, или
- Укажите координаты вручную (широта/долгота в десятичных градусах).

Если определение местоположения системой отключено, необходимо ввести координаты вручную.

Примеры:

| Местоположение | Широта | Долгота |
|-----------------|----------|-----------|
| Берлин | 52,5 | 13,4 |
| Буэнос-Айрес | -34,6 | -58,4 |
| Рейкьявик | 64.1 | -21.9 |

Значения для северо-восточного направления положительные, значения для юго-западного направления отрицательные.

---

## Штаты
Адаптер создает следующие состояния:

| Штат | Тип | Описание |
|---------------------|---------|------------------------------------------------------------------------------------|
| `probability` | число | Предполагаемая вероятность видимости северного сияния в указанном месте (%) |
| `forecast_time` | число | Время, для которого рассчитывается прогнозируемый геомагнитный отклик Земли (UTC, мс) |
| `forecast_time` | число | Время, для которого рассчитывается прогнозируемый геомагнитный отклик Земли (UTC, мс) |

Эти состояния могут использоваться для:

- Уведомления (например, push-уведомления)
- Визуализация данных на панели мониторинга
- Правила автоматизации (например, активировать камеру при высокой активности)

---

## Источник данных
Этот адаптер использует общедоступные данные, предоставленные:

- Центр прогнозирования космической погоды NOAA (SWPC)

<https://www.swpc.noaa.gov/>

В частности, для оценки активности полярных сияний в заданном местоположении используется модель прогнозирования полярных сияний OVATION и связанные с ней геомагнитные индексы в реальном времени.

---

## Отказ от ответственности
NOAA и SWPC не имеют отношения к этому проекту.

Данные, используемые этим адаптером, предоставлены NOAA для общественного пользования.
Не предоставляется никаких гарантий относительно точности, полноты или актуальности предоставленной информации.

Видимость северного сияния зависит от множества внешних факторов (например, облачности, светового загрязнения, ориентации межпланетного магнитного поля), которые выходят за рамки возможностей данного адаптера.

---

## ❤️ Поддержка
Если вам полезен проект **ioBroker.aurora-nowcast** и вы хотели бы поддержать его дальнейшее развитие, вы можете угостить меня кофе ☕🙂

Спасибо за вашу поддержку!

---

## Changelog
### 2.2.2 (2026-04-17)

- re-added git-type URL because of npm linter

### 2.2.1 (2026-04-17)

- more checks
- fixed Readme link to a more stable direct link instead of an anchor
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/24>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/27>)

### 2.2.0 (2026-03-30)

- fixed review findings (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/21>)

### 2.1.4 (2026-03-11)

- disabled Sentry in GitHub workflow

### 2.1.3 (2026-03-11)

- fixed iobroker-Bot warnings: <https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/18>
- slightly retouched the icon

### 2.1.2 (2026-03-09)

- fixed overlooked linter error regarding whitespace

### 2.1.1 (2026-03-09)

- fixed a bug concerning the coordinates validation

### 2.1.0 (2026-03-02)

- added internationalization (i18n)
- further smaller adjustments to meet ioBroker standards

### 2.0.2 (2026-02-27)

- fixed icon size to 512x512 (or less) for ioBroker release

### 2.0.1 (2026-02-27)

- necessary adjustments for ioBroker official release

### 2.0.0 (2026-02-27)

- Renamed adapter. Minor housekeeping.

### 1.0.0 (2026-02-26)

- First stable release

---

## License

GNU General Public License v3.0

Copyright (c) 2026 Christian Menne

See LICENSE file for full license text.