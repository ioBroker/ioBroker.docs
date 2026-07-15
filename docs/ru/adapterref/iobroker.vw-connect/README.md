---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vw-connect/README.md
title: ioBroker.vw-connect
hash: cZy9mvENELEPraB4OeA9M82LjH4f5jvYy2a4xQAigak=
---
![Логотип](../../../en/adapterref/iobroker.vw-connect/admin/vw-connect.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vw-connect.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vw-connect.svg)
![Статус зависимости](https://img.shields.io/david/ta2k/iobroker.vw-connect.svg)
![Известные уязвимости](https://snyk.io/test/github/ta2k/ioBroker.vw-connect/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vw-connect.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ta2k/ioBroker.vw-connect/master.svg)

# IoBroker.vw-connect
## Адаптер vw-connect для ioBroker
Адаптер для VW We Connect, We Connect ID, We Charge, myAudi, Skoda Connect, Seat Connect и We Connect Go.

Пожалуйста, обновите вашу систему на Node 10.
<https://forum.iobroker.net/topic/22867/how-to-node-js-f%C3%BCr-iobroker-richtig-updaten>

## Kurzfassung (стенд, июнь 2026 г.)
VW Hat Den Klassischen App-Login for **VW ID, CUPRA und SEAT** abgeschaltet. Для работы этой маркировки в любое время суток — на панели конфигурации, нажмите на несколько параллельных строк:

- **Портал EU Data Act** — автоматически активируется в браузере на портале, автоматически включается пакет данных в течение **всех 15 минут** и не используется в практике **unzuverlässig**: автоматическое включение даты в момент активации (по Фаренгейту, загруженному, климату), автопарковка и просмотр наборов данных. Außerdem hat das Portal selbst öfter 5xx-Aussetzer.
- **Tibber Data API (empfohlen)** — kostenlos, **liefert aktuelle Werte** (SoC, Reichweite, Lade-Status). **Если вам нужен Tibber-Stromkunde **, вы можете добавить Tibber-аккаунт в новом приложении. Beim Anlegen verlangt die App eine deutsche Adresse — die muss **nicht korrekt sein**, irgendeine pausible Straße/PLZ reicht. Включите приложение и зарегистрируйте OAuth-клиент при <https://data-api.tibber.com/clients/manage> (подробности см. в интерфейсе адаптера).

Для других марок (Audi, MyŠKODA, Seat Elli, ŠKODA Powerpass, Audi DataPlug, ŠKODA Alt, VW Connect Go) функционирует классический вход в систему.

## VW ID: Портал, созданный в соответствии с Законом ЕС о данных, теперь является единственным источником данных (с 01.06.2026)
VW прекратил поддержку классического клиента VW-ID OAuth (`a24fba63-...`) **1 июня 2026 года**. IdP по адресу `identity.vwgroup.io/oidc/v1/authorize` возвращает HTTP 403 со страницей ошибки Auth0 «неправильная конфигурация клиента» для этого клиента; зеркало BFF по адресу `emea.bff.cariad.digital/auth/v1/idk/oidc/authorize` делает то же самое. Клиенты других марок (Audi `cc29b87a-...`, Skoda `3ea88bf9-...`, Seat/Cupra `f85e5b69-...`, VW Passenger Cars EU-Data-Act `9b58543e-...`) не затронуты.

Для `config.type === "id"` адаптер теперь полностью пропускает классический вход в систему и использует **Tibber Data API (рекомендуется)** или портал EU Data Act. **Вы ОБЯЗАТЕЛЬНО должны настроить хотя бы один из них, иначе передача данных не будет осуществляться.** См. разделы «Tibber Data API» и «Портал EU Data Act» ниже.

## Cupra / SEAT: классический вход в систему отключен (с 10.06.2026)
В бэкенде Cupra/SEAT OLA (`ola.prod.code.seat.cloud.vwgroup.com`) примерно в июне 2026 года была внедрена проверка приложений Firebase с помощью провайдера Play Integrity. Теперь каждый вызов API требует заголовка `X-Firebase-AppCheck`. Декомпилированный APK-файл MyCupra 2.18.0 подтверждает: перехватчик OkHttp (`es.seat.ola.attestation.interceptor.AppCheckInterceptor`, проект Firebase `ola-apps-prod`, идентификатор приложения `1:530284123617:android:9b9ba5a87c7ffd37fbeea0`) автоматически добавляет токен. Без него сервер возвращает `403 Forbidden device detected, missing-device-token`.

Токены Play Integrity генерируются **сервисами Google Play на реальном устройстве Android** с использованием зарегистрированного сертификата подписи APK SHA-256. Адаптер Node.js не может их сгенерировать — документированного способа обхода нет.

Для `config.type === "seatcupra"` и `"seat"` адаптер теперь пропускает классический вход в систему. **Вместо этого используйте API данных Tibber (рекомендуется) или портал EU Data Act** — оба варианта по-прежнему работают для автомобилей Cupra и SEAT. См. разделы ниже.

## Дополнительно: Портал Закона ЕС о данных в качестве дополнительного источника данных (начиная с версии 0.9.0)
Для всех марок VW Group (VW, Audi, Škoda, Seat, Cupra) адаптер может **дополнительно** использовать непрерывные 15-минутные наборы данных, которые VW публикует через портал EU Data Act по адресу <https://eu-data-act.drivesomethinggreater.com>. Это **необязательно** — классический вход в систему для конкретной марки является основным источником и работает самостоятельно. Путь EU Data Act добавляет несколько сотен дополнительных точек данных на каждый набор данных (в основном поля диагностики, конфигурации и отчетов) в рамках `<vin>.statuseudata.*` (имена в формате Snake_case с точками, например, `battery_state_report.soc`, `mileage.value`, `parking_brake`, `charging_state_report.current_charge_state`).

Один и тот же портал обслуживает все бренды — отличается только ключ бренда OIDC. Адаптер выбирает правильный бренд на основе настроенного вами параметра `type`:

| Адаптер `type` | Бренд, зарегистрированный в соответствии с Законом ЕС о защите данных |
| `VW ID / Volkswagen App` | `VOLKSWAGEN_PASSENGER_CARS` |
| `Audi E-tron`, `Audi DataPlug` | `AUDI` |
| `MyŠKODA`, `ŠKODA Alt` | `SKODA` |
| `My SEAT` | `SEAT` |
| `My CUPRA` | `CUPRA` |
| `Моя КУПРА` | `КУПРА` |

Для включения этой функции необходимо настроить непрерывный запрос данных **один раз в браузере**; адаптер загружает только то, что генерирует портал, он не может создать запрос за вас. Если вы пропустите этот шаг, адаптер все равно будет работать нормально, просто в журнале не будет отображаться информация о соответствии Закону ЕС о защите данных.

### Настройка запроса данных (однократно, в браузере)
1. Откройте <https://eu-data-act.drivesomethinggreater.com/> и **войдите в систему, используя свою учетную запись, относящуюся к конкретной марке автомобиля** (тот же адрес электронной почты и пароль, которые вы используете в приложении Volkswagen / myAudi / MyŠKODA / SEAT Connect / MyCUPRA и в настройках этого адаптера).
2. Перейдите в раздел **Кластеры данных → Обзор транспортных средств**.
3. Если VIN вашего автомобиля еще не указан, нажмите кнопку **Подключить автомобиль** и следуйте инструкциям по сопряжению/подтверждению на экране.
4. Нажмите **Benutzerdefinierte Daten anfragen** («Получить персонализированные данные»). Совет от портала: es kann immer nur eine benutzerdefinierte Datenanfrage gleichzeitig aktiv sein.
5. **Vereinbarung gemäß Artikel 4 EU Data Act** ankreuzen («Ich bestätige, dass ich die Vereinbarung gemäß Artikel 4 EU Data Act gelesen und akzeptiert habe.») → **Weiter**.
6. **Кластер данных auswählen**: **Все данные** anhaken («Все данные, соответствующие Закону ЕС о данных»). Andere Cluster nur wenn du gezielt einschränken will — выбор только некоторых ограничивает то, что будет содержать `<vin>.statuseudata.*`.
7. **Name des Datenpakets** vergeben (frei wählbar, z.B. «ioBroker»). Используйте префикс `_dataset_name` в именах файлов.
8. **Frequenz wählen**: **Все 15 минут**. Другие варианты (täglich) не могут быть использованы для Auflösung für Live-Werte.
9. **Дауэр**: **Kein Enddatum** (fortlaufend ohne Enddatum).
10. Запрос отсутствует. Наборы данных обычно начинают появляться **через 15 минут — несколько часов**. Первая партия может отображаться как `*_no_content_found.zip`, пока ваш автомобиль не "проснется". Принудительная синхронизация через приложение Volkswagen или однократное вождение активирует сторону производителя.

Адаптер автоматически обрабатывает запрос — никаких дополнительных настроек в ioBroker не требуется. Пока `type` равен `VW ID / Volkswagen App` и ваши учетные данные совпадают с данными портала, он опрашивает список каждую минуту и загружает данные только тогда, когда появляется новый ZIP-архив.

После активации режима защиты данных в соответствии с Законом ЕС, дерево объектов для каждого VIN-номера:

```text
<vin>.general.vin
<vin>.general.nickname
<vin>.general.licensePlate
<vin>.general.imageLocation
<vin>.statuseudata.battery_state_report.soc          (= 58 %)
<vin>.statuseudata.battery_state_report.charge_power (= 0.0 kW)
<vin>.statuseudata.charging_state_report.current_charge_state
<vin>.statuseudata.mileage.value
<vin>.statuseudata.parking_brake
<vin>.statuseudata.locked
<vin>.statuseudata._dataset_name
<vin>.statuseudata._dataset_created_on
... and many more (depending on the Data Clusters you ticked on the portal)
```

### Устранение неполадок (только в соответствии с Законом ЕС о защите данных — эти проблемы никогда не блокируют классический процесс)
- **`Закон ЕС о защите данных... запрос данных не настроен`**: вы не выполнили указанную выше настройку на стороне портала. Классический вход в систему продолжает работать.
- **`На портале имеется N наборов данных, но во всех указано '_no_content_found'`**: автомобиль находился в спящем режиме во время каждого сеанса выборки. Принудительно синхронизируйте автомобиль через приложение VW или просто прокатитесь один раз.
- **Отсутствует канал `<vin>.statuseudata`**: на портале пока нет наборов данных контента — исправление аналогичное описанному выше.
- **Ошибка HTTP 400 сразу после активации**: портал все еще обрабатывает ваш запрос на данные. Проблема разрешится сама собой через несколько часов.
- **Устаревшие значения**: портал объединяет несколько снимков отчетов в один плоский массив для каждого набора данных. Если одно и то же поле встречается несколько раз с разными значениями, адаптер детерминированно выбирает запись с наименьшим UUID (стабильным после обновления — тот же подход, что и в интеграции с Home Assistant).
- **Эталонная реализация** (Home Assistant, Python): <https://github.com/mikrohard/hass-vw-eu-data-act>

## Использование
Используйте режим дистанционного управления для удаленного управления автомобилем.
Нормальное обновление — это интервал опроса для получения данных из облака VAG. Принудительное обновление — для автомобилей без электропривода, чтобы принудительно обеспечить обновление; это число ограничено VAG до повторного включения автомобиля.
Данные о поездке доступны только для автомобилей без электропривода.

Вы можете установить температуру климат-контроля в файле .climater.settings.targetTemperature.content.

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/26438/test-adapter-vw-connect-für-vw-id-audi-seat-skoda>

## Пояснение к полям статуса
### Список записей
```

```

### 0.9.6 (2026-06-27)
- Улучшена обработка данных ЕС.

### 0.9.5 (2026-06-13)
— Вход в приложение Cupra отключен

### 0.9.4 (2026-06-06)
- добавить поддержку Tibber

### 0.9.3 (2026-05-31)
- улучшить получение данных из eudata

### 0.9.2 (2026-05-31)
- Добавлена поддержка получения данных из Eudata для Seat, Skoda и Audi.
- улучшить получение данных из eudata

### 0.9.1 (2026-05-30)
- Исправлена ошибка при входе в систему для автомобилей VW и Audi.
- добавить необязательный поток данных на портал в соответствии с Законом ЕС о данных

### 0.8.8 (2026-05-28)
- Исправлена ошибка входа в системы Audi и VW.

### 0.8.7 (2026-05-27)
- исправить вход в систему Audi

### 0.8.6 (2026-05-27)
- исправить вход в систему с использованием ID

### 0.8.5 (2026-05-24)
- исправить Cupra

### 0.8.4 (2026-05-14)
- отключить Skoda MQTT

### 0.8.3 (2026-05-10)
- исправление MQTT для Skoda

### 0.8.1 (2026-05-06)
- исправление MQTT для Skoda

### 0.8.0 (2026-04-13)
- исправление для Seat Cupra

### 0.7.16 (2026-03-18)
- исправить подключение MQTT к MySkoda

### 0.7.15 (2025-11-26)
- исправление токена обновления vw

### 0.7.14 (2025-11-25)
- исправлена ошибка входа в систему с использованием идентификатора vw

### 0.7.13 (2025-11-09)
- Исправлена ошибка входа в систему Skoda

### 0.7.12 (2025-05-05)
- Исправлена ошибка с токеном обновления Skoda
- исправление для активации вентиляции
- добавить новые неподдерживаемые конечные точки

### 0.7.9 (2025-03-20)
- исправление для настенного зарядного устройства ID

### 0.7.7 (2025-03-02)
- Исправлена ошибка, связанная с дополнительным обогревом Skoda и продолжительностью его работы.
- Исправление проблемы с блокировкой/разблокировкой дверей Skoda

### 0.7.6 (2025-02-28)
- Исправлена ошибка, из-за которой обновления статуса зарядки происходили только при запуске.
- Исправлена ошибка в программе Skoda isMoving State

### 0.7.3 (2025-02-26)
- исправление для установки setTemperature
- Исправление проблемы с блокировкой при разблокировке дверей Skoda

### 0.7.0 (2025-02-25)
- исправление для Skoda и Seat
— Структура состояний полностью изменена, пожалуйста, удалите старые состояния в разделе «Объекты».

### 0.6.1 (01.10.2024)
- Исправлена ошибка входа в систему Skoda

### 0.6.0 (2024-04-11)
- добавить дополнительные штаты Cupra

### 0.5.4 (2024-03-17)
- исправить состояние дверных окон

### 0.4.1
- Исправление обновления статуса VW

### 0.0.65
- Исправлена ошибка входа в Cupra

### 0.0.63
- Исправлена ошибка входа в систему VW/Skoda Etron

### 0.0.62
- Исправлена ошибка входа в систему Audi etron

### 0.0.61
- Исправлена ошибка входа по ID

### 0.0.60
- Незначительные улучшения. Минимальный интервал зарядки WeCharge теперь составляет 15 минут.

### 0.0.55
- исправить обновление статуса идентификатора

### 0.0.51
- исправлена ошибка входа в Audi Etron

### 0.0.48
- Исправлена ошибка входа в систему, исправлено обновление аудиосистемы, добавлено ограничение для Wallbox.

### 0.0.43
- увеличить время ожидания обновления токена

### 0.0.42
- Исправлена ошибка входа в систему Skoda

### 0.0.40
- Добавлена система климат-контроля версии 3 для новых автомобилей. Добавлены Powerpass и Seat Elli.

### 0.0.39
- исправлена ошибка входа в систему с использованием ID

### 0.0.36
- добавить поддержку Skoda Enyaq

### 0.0.35
- добавлена совместимость с Node.js версии 10.

### 0.0.34
- добавить автоматическое подтверждение нового согласия на обработку персональных данных

### 0.0.32
- правильный выбор последних поездок

### 0.0.31
- включить возможность выбора нескольких типов поездок

### 0.0.30
- Исправлена проблема с несколькими автомобилями, добавлен режим VWv2; на данный момент нет никакой разницы между VW и VWv2.

### 0.0.29
- Исправлена ошибка в функции skoda refreshToken, внесены небольшие улучшения.

### 0.0.26
- исправления ошибок

### 0.0.25
- мы взимаем дополнительную плату

### 0.0.24
- добавить удаленное обновление состояния

### 0.0.23
- Добавлены сиденья и новая система климат-контроля v2

### 0.0.22
- Расчет наружной температуры в °C также доступен для автомобилей Skoda и Audi.

### 0.0.21
- добавить пульты дистанционного управления для идентификации

### 0.0.20
- Исправлена ошибка входа в Audi, добавлен вход по ID.

### 0.0.19
- Сохранять объекты состояния в файле state по идентификатору вместо последовательных чисел.

### 0.0.18
- Исправлена ошибка отображения состояния батареи для моделей 2020 года.

### 0.0.17
- Добавлена поддержка моделей 2020 года

### 0.0.16
- Исправлены проблемы с js.controller 3

### 0.0.11
- Исправлена ошибка Audi, связанная с несколькими автомобилями.
- скрыть ошибку обновления статуса, если эта функция недоступна

## License

MIT License

Copyright (c) 2019-2030 ta2k <tombox2020@gmail.com>

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