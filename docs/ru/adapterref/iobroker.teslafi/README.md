---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.teslafi/README.md
title: ioBroker.teslafi
hash: zZ8jXiqQ2D7rCBec/vRim2x0l9kXwfKBRQYlqPEnnHw=
---
![Логотип](../../../en/adapterref/iobroker.teslafi/admin/teslafi.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.teslafi.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.teslafi.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.teslafi?style=flat-square)
![Статус зависимостей Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.teslafi?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/hombach/iobroker.teslafi?style=flat-square)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/hombach/iobroker.teslafi?logo=github&style=flat-square)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Проблемы на GitHub](https://img.shields.io/github/issues/hombach/iobroker.teslafi?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.teslafi/test-and-release.yml?branch=master&logo=github&style=flat-square)
![CodeQL](https://github.com/hombach/ioBroker.teslafi/actions/workflows/codeql-analysis.yml/badge.svg)
![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.teslafi?branch=master&svg=true)
![Известные уязвимости SNYK](https://snyk.io/test/github/hombach/ioBroker.teslafi/badge.svg)
![Бета](https://img.shields.io/npm/v/iobroker.teslafi.svg?color=red&label=beta)
![Стабильный](https://iobroker.live/badges/teslafi-stable.svg)
![Установлено](https://iobroker.live/badges/teslafi-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.teslafi.png?downloads=true)

# ioBroker.teslafi

## Версии

## Sentry

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также сведения о том, как отключить отправку сообщений об ошибках, см. в разделе \[ссылка на соответствующий раздел].<a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry"> Документация по плагину Sentry</a> !

## Адаптер ioBroker TeslaFi – бесшовная интеграция данных Tesla для вашего умного дома.

Адаптер TeslaFi обеспечивает простую интеграцию данных об автомобиле из вашей учетной записи TeslaFi в систему ioBroker. Используйте эти данные для улучшения работы с Tesla и оптимизации процессов домашней автоматизации.

## Почему именно этот адаптер?

Основная цель этого адаптера — интегрировать данные Tesla в ioBroker без прямого запроса к системам автомобиля. Используя существующую систему опроса данных TeslaFi, адаптер избегает дополнительных запросов к автомобилю, экономя заряд батареи и обеспечивая эффективный доступ к данным.

## Функции

Адаптер подключается к API TeslaFi для получения исчерпывающей информации о вашем автомобиле Tesla и делает эти данные доступными в ioBroker. Все модели Tesla, поддерживаемые TeslaFi, полностью совместимы. В настоящее время доступны следующие категории данных:

- **Тепловое состояние** : анализ системы терморегулирования и температурных режимов.
- **Состояние батареи** : информация о состоянии батареи, уровне заряда и дальности хода.
- **Состояние транспортного средства** : Общее состояние транспортного средства, включая местоположение и общее состояние.
- **Данные об автомобиле** : подробная информация об автомобиле, такая как название и VIN-номер.

## Типичные сценарии использования

- **Автоматизация** : Запускайте действия умного дома на основе состояния вашего Tesla в режиме реального времени. Например, автоматически регулируйте климат-контроль в доме, когда автомобиль подъезжает.
- **Управление энергопотреблением** : Оптимизируйте потребление энергии, планируя время зарядки автомобиля и отслеживая состояние батареи непосредственно через ioBroker.
- **Уведомления и отчеты** : Настройте оповещения о конкретных состояниях автомобиля, таких как низкий уровень заряда батареи, завершенные сеансы зарядки или доступные обновления.

## Конфигурация

Настройка адаптера очень проста:

1. Введите свой API-ключ TeslaFi на экране конфигурации адаптера.
2. Установите желаемый интервал опроса, чтобы настроить частоту обновления данных.
3. При желании включите **параметр «Использовать кодировку TeslaFi для запросов данных (encoding=1)»** , если название вашего автомобиля содержит специальные символы. Это добавит `encoding=1` Только для запросов данных; команды для транспортных средств остаются без изменений. Эта опция отключена по умолчанию, в том числе и для существующих установок. Ответы по-прежнему обрабатываются как JSON без дополнительного декодирования. Необходимо проверить, решает ли параметр конкретную проблему с именем, в TeslaFi с включенной и выключенной этой опцией.

## Геозонирование (присутствие / вход / выход)

Адаптер может изменить местоположение, указанное в TeslaFi (`vehicle-state.location`) в надежные события присутствия — например, чтобы гаражные ворота открывались только тогда, когда машина действительно возвращается домой. Сопоставление осуществляется по точному названию местоположения (как указано в TeslaFi), поэтому вычисления расстояния по GPS не требуются.

Настройте геозоны на вкладке **«Геозоны»** . Каждая строка содержит:

| Столбец                                | Значение                                                                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Название местоположения TeslaFi**    | Точное название тега из TeslaFi (например) `Home`)                                                                                                                  |
| **Мин. пути (минут)**                  | Машина, должно быть, отсутствовала как минимум столько времени, прежде чем... `enter` Событие может произойти (блокирует кратковременное изменение местоположения).  |
| **Требуется движение**                 | Только огонь `enter` если машина действительно двигалась во время моего отсутствия                                                                                   |
| **Пороговая скорость движения (км/ч)** | Скорость, которая считается движением                                                                                                                               |
| **Отключение (опросы)**                | Количество последовательных опросов, в которых изменения должны сохраняться, прежде чем `enter` /`leave` предотвращает возгорание (защищает от мерцания GPS-сигнала) |

Для каждого заданного местоположения адаптер создает:

- `geofence.current` – текущее отмеченное местоположение
- `geofence.<Location>.present` – подтвержденное присутствие (логическое значение)
- `geofence.<Location>.enter` – импульсы `true` для одного опроса по отфильтрованному поступлению
- `geofence.<Location>.leave` – импульсы `true` для одного опроса при отъезде
- `geofence.<Location>.awaySince` – отметка времени (мс) с момента отъезда автомобиля; `0` присутствуя

`<Location>` Название местоположения TeslaFi, в котором символы, недопустимые в идентификаторах объектов ioBroker, заменены на `_` Например, местоположение, помеченное тегом. `My Home` результаты в штатах `geofence.My_Home.*`.

Нет `enter` Событие генерируется при запуске адаптера, а колебания GPS во время стоянки не приводят к возникновению событий.

### Пример: открыть гараж на время встречи выпускников.

Запустить правило JavaScript/Blockly по восходящему фронту `teslafi.0.geofence.Home.enter`:

```javascript
on({ id: "teslafi.0.geofence.Home.enter", val: true, ack: true }, () => {
	setState("zigbee.0.garage_door.open", true);
});
```

С `minAwayMinutes: 10`, `requireMotion: true` и `debouncePolls: 2` Этот сигнал срабатывает ровно один раз, когда машина возвращается домой после реальной поездки, игнорируя при этом кратковременные изменения местоположения возле дома, дрожание GPS-сигнала и перезагрузки адаптера.

## Совместимость

Адаптер совместим со всеми моделями Tesla, поддерживаемыми TeslaFi. Для работы требуется действующая учетная запись TeslaFi с доступом к API.

## Активная разработка и вклад пользователей

Адаптер TeslaFi активно поддерживается, и дополнительные функции или категории данных могут быть добавлены по запросам пользователей. Не стесняйтесь предлагать свои идеи и помогать улучшать адаптер для всего сообщества!

## Пожертвовать

<a href="https://www.paypal.com/donate/?hosted_button_id=6EE4YUJRK7UWC"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.teslafi/master/docu/bluePayPal.svg" height="40"></a> Если вам понравился этот проект — или вы просто чувствуете себя щедрым, — подумайте о том, чтобы угостить меня пивом. За ваше здоровье! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.1.1 (2026-11-11)

- (HombachC) added optional TeslaFi encoding for data requests (#45)
- (hombach) updated ioBroker/testing
- (hombach) updated dependencies
- (hombach) updated axios

### 3.1.0 (2026-10-11)

- (hombach) added geofence presence/enter/leave with away- and motion-gates (#325)
- (hombach) fixed speed unit: `vehicle-state.speed` is now labeled mph and a new `vehicle-state.speed_km` (km/h) was added
- (hombach) geofence: harden against invalid config values, non-numeric speed and colliding/duplicate location names
- (hombach) speed unit label is now also corrected on existing installations
- (hombach) switch to iobroker testing 6.x
- (hombach) updated dependencies

### 3.0.4 (2026-08-10)

- (hombach) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts
- (hombach) updated dependencies

### 3.0.3 (2026-07-05)

- (hombach) removed unneeded test devDependencies (chai, sinon-chai, proxyquire) and switched tests to Node.js assert
- (hombach) updated axios

### 3.0.2 (2026-06-19)

- (hombach) fixed warnings by adapter checker

## License

MIT License

Copyright (c) 2024-2026 C.Hombach <TeslaFi@homba.ch>

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