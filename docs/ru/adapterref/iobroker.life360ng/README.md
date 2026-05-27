---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.life360ng/README.md
title: Адаптер ioBroker для Life360 (нового поколения)
hash: LJzjPPkeIFkh3FtPq6/AeHZwmpVqJx4c1ABLT5jRdPg=
---
![Логотип](../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

![Количество установок](https://iobroker.live/badges/life360ng-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/life360ng-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.life360ng.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.life360ng.svg)
![СООБЩЕСТВО](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![ОБСЛУЖИВАЮЩИЙ](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![ИИ](https://img.shields.io/badge/ai%20assisted-copilot-blue.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Адаптер ioBroker для Life360 (следующего поколения)
---

## Обновлено для пользователей из ЕС с современной аутентификацией на основе токенов.
> **Отказ от ответственности:** Это неофициальный адаптер, разработанный сообществом. Он не связан с компанией Life360, Inc. и не поддерживается ею. Предоставляется бесплатно для личного, некоммерческого использования в системах домашней автоматизации. Используйте на свой страх и риск. Life360 может отключить или изменить свой API в любое время без предварительного уведомления.

> **Конфиденциальность:** Все данные, полученные от Life360, хранятся исключительно в вашей локальной системе ioBroker. Этот адаптер **не** передает никакие данные третьим лицам или внешним облачным сервисам, за исключением самого API Life360.

## Описание
Этот адаптер подключается к облачным сервисам [Жизнь360](https://www.life360.com) для отслеживания людей и определения их присутствия в заданных местах. Он получает данные о кругах, участниках и местах и сохраняет их в соответствии с состоянием ioBroker, обновляя с настраиваемым интервалом.

## Документация
- 🇺🇸 [Документация](https://github.com/inventwo/ioBroker.life360ng/blob/main/docs/en/README.md)
- 🇩🇪 [Документация](https://github.com/inventwo/ioBroker.life360ng/blob/main/docs/de/README.md)

## Конфигурация
### Токен Bearer (необходим для пользователей из ЕС)
Компания Life360 отключила вход в систему с использованием пароля для пользователей из ЕС. Получите токен Bearer вручную:

1. Откройте [https://life360.com/login](https://life360.com/login) в своем браузере.
2. Откройте инструменты разработчика в браузере (клавиша F12) и перейдите на вкладку «Сеть».
3. Введите свой адрес электронной почты и нажмите **Продолжить**.
4. Введите одноразовый код, отправленный на вашу электронную почту.
5. Найдите **POST**-запрос с именем `token` (игнорируйте OPTIONS).
6. В **Предварительном просмотре** / **Ответе** скопируйте значение `access_token`.
7. Вставьте его в поле **Токен носителя** в конфигурации адаптера.

>**Примечание:** Введите токен БЕЗ слова «Bearer», БЕЗ пробелов и БЕЗ кавычек!!

>**Примечание:** Срок действия токенов длительный (обычно несколько месяцев). По истечении срока действия в журнале адаптера отобразится ошибка подключения — повторите описанные выше шаги, чтобы получить новый токен.

![Токен](../../../en/adapterref/iobroker.life360ng/img/readme_anonym.png)

### Мои места
Добавьте закрытые места, невидимые для облачных сервисов Life360. Адаптер проверяет наличие ваших пользовательских мест при каждом опросе.

- Придумайте **название** для этого места.
- Укажите географическое положение (широту и долготу).
- Задайте радиус в метрах.

### Интеграция
Выберите, какие данные Life360 обрабатывать: круги, места, люди.

### Отслеживание местоположения
Включите отслеживание местоположения, чтобы добавить к данным о людях информацию о географическом положении (широта, долгота, `locationName`).

## Примечания по миграции/обновлению
### Обновление с версии 1.0.x до 1.1.0
Внутренняя иерархия объектов была реструктурирована в соответствии с правилами типов объектов ioBroker.

**После обновления выполните следующие действия:**

1. Остановите экземпляр адаптера.
2. Удалите все объекты адаптера (в административной панели ioBroker:

Объекты → life360ng.0 → Удалить все)

3. Снова запустите экземпляр адаптера.
4. Все точки данных будут воссозданы автоматически.

> ⚠️ Ваши существующие скрипты и автоматизации **не** нуждаются в изменении – > все идентификаторы точек данных остаются прежними.

## Штаты
круги
Life360 объединяет в круги информацию о связанных с ними местах и присутствии участников.

| Штат | Тип | Описание |
|---|---|---|
| `circles.<id>.name` | текст | Название круга (например, `Family skvarel`) |
| `circles.<id>.memberCount` | значение | Количество членов круга *(может быть пустым)* |
| `circles.<id>.createdAt` | дата | Дата создания круга |
| `circles.<id>.timestamp` | дата | Последнее обновление данных |
| `circles.<id>.places.<placeId>.<memberId>.isPresent` | индикатор | Участник присутствует в этом месте |
| `circles.<id>.places.<placeId>.membersPresent` | значение | Количество участников, находящихся в этом месте |
| `circles.<id>.places.<placeId>.membersPresent` | значение | Количество участников, находящихся в этом месте |

### Информация
| Штат | Тип | Описание |
|---|---|---|
| `info.connection` | логическое значение | `true` при подключении к облаку Life360 |

### Мои места
Пользовательские места, определенные в конфигурации адаптера (не синхронизируются с облаком Life360).

Структура: `myplaces.<placeName>.<memberName>.*`

| Штат | Тип | Описание |
|---|---|---|
| `myplaces.<place>.<member>.distance` | value.distance | Расстояние до центра точки размещения в метрах |
| `myplaces.<place>.<member>.startTimestamp` | дата | Отметка времени, когда участник вошел в это место |
| `myplaces.<place>.<member>.timestamp` | дата | Время последней проверки |
| `myplaces.<place>.gps-coordinates` | value.gps | Разместить центр в формате JSON `{"lat":..,"lng":..}` |
| `myplaces.<place>.latitude` | value.gps.latitude | Широта центра местоположения |
| `myplaces.<place>.longitude` | value.gps.longitude | Долгота центра местоположения |
| `myplaces.<place>.members` | список | Все участники проверены по этому месту |
| `myplaces.<place>.membersCount` | значение | Общее количество отслеживаемых участников |
| `myplaces.<place>.membersPresent` | список | Имена присутствующих членов |
| `myplaces.<place>.membersPresentCount` | значение | Количество присутствующих в данный момент участников |
| `myplaces.<place>.radius` | значение | Настроенный радиус в метрах |
| `myplaces.<place>.timestamp` | дата | Последнее обновление данных |
| `myplaces.<place>.urlMap` | text.url | Ссылка на место в OpenStreetMap |
| `myplaces.<place>.urlMapIframe` | text.url | URL для встраивания Google Maps |
| `myplaces.<place>.urlMapIframe` | text.url | URL для встраивания Google Maps |

### Люди
Каждый участник круга Life360 получает свой собственный канал в разделе `people.<id>`, где `<id>` — это UUID участника Life360.

| Штат | Тип | Описание |
|---|---|---|
| `people.<id>.avatar` | text.url | URL изображения профиля |
| `people.<id>.createdAt` | дата | Дата создания учетной записи |
| `people.<id>.disconnected` | индикатор | Приложение явно отключено |
| `people.<id>.firstName` | текст | Имя |
| `people.<id>.gps-coordinates` | value.gps | GPS-позиция в формате JSON `{"lat":..,"lng":..}` |
| `people.<id>.id` | текст | UUID участника Life360 |
| `people.<id>.isConnected` | indicator.reachable | Приложение подключено и доступно |
| `people.<id>.isSharingLocation` | индикатор | Совместное использование местоположения активно |
| `people.<id>.lastName` | текст | Фамилия |
| `people.<id>.lastPositionAt` | дата | Отметка времени последнего обновления позиции |
| `people.<id>.latitude` | value.gps.latitude | Текущая широта |
| `people.<id>.locationName` | текст | Текущее название места (например, `Home`) |
| `people.<id>.longitude` | value.gps.longitude | Текущая долгота |
| `people.<id>.status` | текст | Статус соединения (например, `Ok`) |
| `people.<id>.timestamp` | дата | Отметка времени последнего обновления данных |
| `people.<id>.urlMap` | text.url | Ссылка OpenStreetMap на текущее местоположение |
| `people.<id>.urlMapIframe` | text.url | URL для встраивания Google Maps |
| `people.<id>.urlMapOsmIframe` | text.url | URL для встраивания OpenStreetMap (iFrame) |
| `people.<id>.urlMapOsmIframe` | text.url | Встраиваемый URL OpenStreetMap (iFrame) |

> **Примечание:** `isConnected` указывает на доступность приложения Life360, > а `disconnected` указывает на явное состояние разрыва соединения.
> Оба значения могут одновременно соответствовать `false` при потере соединения.

### Места
Данные Life360 синхронизируются напрямую из облака Life360 (настроенного в приложении Life360).
Эти данные доступны только для чтения и не могут быть настроены в адаптере.

| Штат | Тип | Описание |
|---|---|---|
| `places.<id>.name` | текст | Название места (например, `Refugium`) |
| `places.<id>.circleId` | текст | UUID круга, к которому принадлежит это место |
| `places.<id>.ownerId` | текст | UUID владельца места |
| `places.<id>.gps-coordinates` | value.gps | Разместить центр в формате JSON `{"lat":..,"lng":..}` |
| `places.<id>.latitude` | value.gps.latitude | Широта центра местоположения |
| `places.<id>.longitude` | value.gps.longitude | Долгота центра местоположения |
| `places.<id>.radius` | значение | Радиус в метрах |
| `places.<id>.timestamp` | дата | Последнее обновление данных |
| `places.<id>.urlMap` | text.url | Ссылка на место в OpenStreetMap |
| `places.<id>.urlMapIframe` | text.url | URL для встраивания Google Maps |
| `places.<id>.urlMapIframe` | text.url | URL для встраивания Google Maps |

> **Примечание:** Информацию о местах, где может быть настроено определение присутствия, см. в разделе [мои места](#myplaces).

> **Места Life360 недоступны?** Life360 ограничил доступ к API облачных мест для некоторых учетных записей (особенно для бесплатных учетных записей в ЕС). Если в журнале адаптера отображается `All place sources returned 0 places`, API Life360 больше не возвращает данные о местах для вашей учетной записи. **Обходное решение:** Определите свои места на вкладке [Мои места](#my-places) — они работают независимо от облака Life360 и обеспечивают такое же определение присутствия.

трекер
В комплект адаптера входит дополнительный GPS-регистратор маршрутов, который записывает перемещения каждого участника Life360 и генерирует интерактивные карты Leaflet, доступные напрямую по URL-адресу в любом браузере, ioBroker Vis или панели управления Jarvis.

#### Как это работает
При каждом обновлении GPS-координат трекер проверяет, находится ли новая позиция на расстоянии не менее **minDistance** метров от последней зарегистрированной точки. Если да, то точка добавляется к объекту GeoJSON LineString за текущий день. Полная история хранится в `allTime.geojson`, а ежемесячные резервные копии записываются в `currentYear.MM.geojson`.

После каждого обновления автоматически (повторно) генерируется HTML-карта, которая записывается в файловую систему ioBroker. Она сразу же становится доступна по протоколу HTTP.

#### Включение трекера
1. Откройте настройки адаптера.
2. В разделе **Трекер / Журнал маршрута** включите отслеживание для каждого человека.
3. При желании можно включить **карту семьи** для каждого человека, чтобы включить их в общее семейное представление.
4. Установите **минимальное расстояние** (по умолчанию: 20 м), чтобы отфильтровать помехи GPS.
5. Сохраните изменения и перезапустите адаптер.

#### URL-адреса карт
Каждому человеку и семейной группе присваивается отдельный URL-адрес карты, который хранится в состоянии ioBroker:

| Штат | Описание |
|---|---|
| `tracker.<Name>.url` | Относительный URL-адрес индивидуальной карты пользователя |
| `tracker.circle.url` | Относительный URL объединенной карты кругов |
| `tracker.circle.urlLocal` | Полный URL с IP-адресом сервера ioBroker и портом веб-адаптера |
| `tracker.circle.urlLocal` | Полный URL с IP-адресом сервера ioBroker и портом веб-адаптера |

Формат URL-адреса:

```
/<namespace>/tracker/<name>.html
```

Откройте этот URL-адрес в любом браузере. Карта автоматически обновляется с заданным интервалом опроса.

> **Примечание:** Карты трекера предоставляются компонентом [веб-адаптер ioBroker](https://github.com/ioBroker/ioBroker.web). Убедитесь, что он установлен и запущен. Состояние `urlLocal` формируется автоматически на основе IP-адреса сервера и порта веб-адаптера (по умолчанию: 8082).

> > Сгенерированные HTML, CSS и JS файлы хранятся в файловой системе ioBroker и доступны для просмотра в разделе **Администрирование → Файлы → `life360ng.<instance>/tracker/`**.

#### Особенности карты
— **Интерактивная карта Leaflet** — панорамирование и масштабирование, основана на OpenStreetMap.
- **Выбор даты** — переключение между всеми записанными днями (полная история, без ограничений)
- **Цветовая кодировка маршрутов** — для каждого человека предусмотрен свой собственный, настраиваемый цвет маршрута.
- **Маркеры начала/конца** — четко обозначают первую и последнюю позицию за день.
- **Автоматическое обновление** — страница автоматически перезагружается (интервал опроса + 10 с)
- **Семейная карта** — все лица, имеющие право на участие, на одной объединенной карте с легендой.
- **Флаги** — Места Life360 и собственные пользовательские места (Мои места) могут отображаться на карте в виде флажков, каждый из которых имеет настраиваемый цвет, размер и прозрачность (0,0 = невидим, 1,0 = полностью виден).

#### Особенности отдельной карты
- **Флажок маршрута:** На каждой карте для одного человека есть флажок «Маршрут», позволяющий переключать отображение маршрута на выбранный период. Состояние сохраняется для каждого человека в браузере и не меняется при перезагрузке страницы.
- **Динамический выбор даты:** Параметры выбора диапазона дат отображаются только при включенном маршруте. Если маршрут отключен, отображается только последняя известная точка.
- **Персонализированные цвета:** Цвет флажка соответствует цвету человека.
- **Единообразный заголовок:** Высота заголовка остается неизменной независимо от состояния флажка.

#### Отслеживание штатов
##### Конфигурация (`tracker.config.*`)
Все параметры цвета и поведения можно изменить во время выполнения — карты перерисовываются немедленно без перезапуска адаптера.

| Штат | Тип | Описание |
|---|---|---|

| `tracker.config.enabled` | логическое значение | Включить/отключить регистратор маршрутов |as ghst

##### Данные на человека (`tracker.<Name>.*`)
| Штат | Тип | Описание |
|---|---|---|
| `tracker.<Name>.allTime.geojson` | строка (JSON) | Полная история GeoJSON (за все дни) |
| `tracker.<Name>.mapSize` | число (КБ) | Размер файла сгенерированной HTML-карты |
| `tracker.<Name>.url` | text.url | HTTP URL карты пользователя |
| `tracker.<Name>.urlLocal` | text.url | HTTP-URL с IP-адресом сервера ioBroker и портом веб-адаптера |
| `tracker.<Name>.urlLocal` | text.url | HTTP-URL с IP-адресом сервера ioBroker и портом веб-адаптера |

##### Круговая карта (`tracker.circle.*`)
| Штат | Тип | Описание |
|---|---|---|
| `tracker.circle.allTime.geojson` | строка (JSON) | Объединенный GeoJSON всех членов круга |
| `tracker.circle.mapSize` | число (КБ) | Размер файла сгенерированной HTML-карты |
| `tracker.circle.url` | text.url | HTTP URL объединенной карты кругов |
| `tracker.circle.urlLocal` | text.url | HTTP-URL с IP-адресом сервера ioBroker и портом веб-адаптера |
| `tracker.circle.urlLocal` | text.url | HTTP-URL с IP-адресом сервера ioBroker и портом веб-адаптера |

#### Встраивание в Vis / Jarvis
Используйте URL-адрес карты в **виджете iFrame** (Vis) или **блоке URL** (Jarvis):

```
/life360ng.0/tracker/<name>.html
```

Карта обновляется автоматически — дополнительная настройка не требуется.

> **Примечание:** >- Полная история маршрутов (`allTime.geojson`) постоянно пополняется. При интервале опроса 60 секунд и минимальном расстоянии 20 м ожидайте примерно **1 МБ на человека в год** — что вполне укладывается в ограничения ioBroker по хранению файлов.

>- Используйте **Срок хранения (дни)** в конфигурации адаптера для автоматического удаления данных старше заданного количества дней (0 = хранить вечно). Очистка выполняется при каждом запуске адаптера и один раз в день.

>- Чтобы вручную очистить записанные данные маршрута человека, установите флажок **"Очистить запись."** в таблице людей и сохраните конфигурацию. `allTime.geojson` человека будет уменьшен до последней известной точки. Поскольку семейная карта строится на основе данных отдельных людей, она также автоматически обновляется. Ежемесячные файлы GeoJSON (`currentYear.MM`) никогда не затрагиваются.

>- Цвета маршрута для каждого человека настраиваются в параметрах адаптера (вкладка «Трекер»).

## Поддерживать
Если вам нравится наша работа и вы хотели бы нас поддержать, мы будем благодарны за любое пожертвование.

(Эта ссылка ведет на наш счет PayPal и не связана с ioBroker.)

[![Spende](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Благодарности
Данный адаптер основан на оригинальной работе [Миголлер](https://github.com/MiGoller).<br> Большое спасибо за первоначальную реализацию и идею! В этом репозитории содержатся оптимизации и дальнейшая разработка.<br> Примечание: Оригинальный текст [репозиторий](https://github.com/MiGoller/ioBroker.life360) архивирован и больше не поддерживается.

## Более старые изменения
- [CHANGELOG_OLD.md](https://github.com/inventwo/ioBroker.life360ng/blob/main/CHANGELOG_OLD.md)

## Changelog

<!--
    ### **WORK IN PROGRESS**
-->
### 1.10.2 (2026-05-25)
- (skvarel) Updated @alcalzone/release-script and related plugins to minimum required version 5.2.0
- (skvarel) Updated minimum required Node.js engine from 20 to 22 in package.json
- (skvarel) Replaced custom wait/sleep helper with the built-in adapter.delay() method

### 1.10.1 (2026-05-24)
- (skvarel) Life360 places display settings in Map Display tab are now hidden when "Process Life360 places" is disabled in the Integration tab
- (skvarel) Added "Enable own places" checkbox in the Integration tab; disabling it hides the My Places tab, related Map Display settings and own place markers in the map hamburger menus
- (skvarel) Added descriptive info text to the Logging tab explaining what verbose logging records and when to use it

### 1.10.0 (2026-05-23)
- (skvarel) Improved Life360 places discovery with multiple API fallbacks: v3 endpoint, embedded v4 circle data (including singular "place" key), and direct v4 places endpoint; logs a one-time info message when no places are available via any source (affects some EU free-tier accounts); added documentation note about this API restriction
- (skvarel) Added person display name aliases in the Integration tab: assign a custom alias per person used in tracker map headers, legend labels, and ioBroker object display names; circle map header name setting moved to the same tab
- (skvarel) Fixed `people.<id>.disconnected` and `people.<id>.isConnected` states always showing wrong values because the Life360 API returns the `disconnected` field as a string instead of a boolean
- (skvarel) Added `notifications.lastSpokenText` state that stores every notification text for use in Blockly, Sonos, or other automations without requiring Telegram or Alexa
- (skvarel) Added Auto-Refresh checkbox (default on) and Live Follow checkbox to tracker map hamburger menus; in the circle map, clicking a person's name in the legend focuses the map on that person's route

### 1.9.1 (2026-05-20)
- (skvarel) Fixed tracker map showing wrong day (yesterday's route) for users in timezones ahead of UTC: date calculations now use local time instead of UTC, preventing GPS points and the default date range from being assigned to the previous day between midnight and the UTC offset hour
- (skvarel) Reduced risk of Cloudflare rate-limiting: API retry loops now abort immediately on a 403/503 block instead of hammering the API with further requests; added a short delay between consecutive API calls within each poll cycle

### 1.9.0 (2026-05-18)
- (skvarel) Added place-specific notification overrides table in the Notifications tab: configure custom arrival and leave messages per place and person, with optional suppression of the default standard message; place and person columns use dropdowns populated from known places and Life360 persons

## License

MIT License

Copyright (c) 2026 skvarel <sk@inventwo.com>

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