---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.life360ng/README.md
title: ioBroker.life360ng
hash: IP0mE2nAEA+zdt+Z2nCaFJfUEyM2kSKQ4NxPbsglAxQ=
---
# IoBroker.life360ng
![Логотип](../../../en/adapterref/iobroker.life360ng/admin/Life360ng.svg)

![Количество установок](https://iobroker.live/badges/life360ng-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/life360ng-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.life360ng.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.life360ng.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## Адаптер Life360 для ioBroker (нового поколения)
Адаптер ioBroker для [Жизнь360](https://www.life360.com) — обновлен для пользователей из ЕС с современной аутентификацией на основе токенов.

> **Отказ от ответственности:** Это неофициальный адаптер, разработанный сообществом. Он не связан с компанией Life360, Inc. и не поддерживается ею. Предоставляется бесплатно для личного, некоммерческого использования в системах домашней автоматизации. Используйте на свой страх и риск. Life360 может отключить или изменить свой API в любое время без предварительного уведомления.

> **Конфиденциальность:** Все данные, полученные от Life360, хранятся исключительно в вашей локальной системе ioBroker. Этот адаптер **не** передает никакие данные третьим лицам или внешним облачным сервисам, за исключением самого API Life360.

## Описание
Этот адаптер подключается к облачным сервисам [Жизнь360](https://www.life360.com) для отслеживания людей и определения их присутствия в заданных местах. Он получает данные о кругах, участниках и местах и сохраняет их в соответствии с состоянием ioBroker, обновляя с настраиваемым интервалом.

## Документация
- 🇺🇸 [Документация](./docs/en/README.md)
- 🇩🇪 [Документация](./docs/de/README.md)

## Конфигурация
### Токен Bearer (необходим для пользователей из ЕС)
Компания Life360 отключила вход в систему с использованием пароля для пользователей из ЕС. Получите токен Bearer вручную:

1. Откройте [https://life360.com/login](https://life360.com/login) в своем браузере.
2. Введите свой адрес электронной почты и нажмите **Продолжить**.
3. Введите одноразовый код, отправленный на вашу электронную почту.
4. Откройте инструменты разработчика в браузере (клавиша F12) и перейдите на вкладку «Сеть».
5. Найдите **POST**-запрос с именем `token` (игнорируйте OPTIONS).
6. В **Предварительном просмотре** / **Ответе** скопируйте значение `access_token`.
7. Вставьте его в поле **Токен носителя** в конфигурации адаптера.

**Примечание:** Введите токен БЕЗ слова «Bearer» и БЕЗ пробелов!

**Примечание:** Срок действия токенов длительный (обычно несколько месяцев). По истечении срока действия в журнале адаптера отобразится ошибка подключения — повторите описанные выше шаги, чтобы получить новый токен.

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
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog

<!--
    ### **WORK IN PROGRESS**
-->
### 1.7.0 (2026-05-14)
- (skvarel) Fixed crash on fresh install caused by adapter writing tracker files before the namespace meta object was created
- (skvarel) Improved error message when Life360 API requests are blocked by Cloudflare (IP rate-limited); no longer logs the full HTML response
- (skvarel) Hovering over a route point or line now temporarily highlights the active day (thicker line, full opacity, other days faded) when "Day highlight" is enabled; the tooltip on a line shows date (person map) or name and date (circle map)
- (skvarel) Clicking a line now opens a single popup at the cursor position with date and name instead of opening all marker popups
- (skvarel) Added optional radius circles for Life360 places and own places (My Places) on the tracker map; toggleable via new "Place radius" and "My Place radius" checkboxes in the hamburger menu; circles use the same color as the flag markers
- (skvarel) Updated documentation
- (skvarel) Added per-person minimum distance setting to the tracker table; a value of 0 falls back to the global minimum distance

### 1.6.0 (2026-05-12) 
- (skvarel) Added refresh button to the hamburger menu
- (skvarel) Clicking a route point in multi-day view now highlights the active day (thicker line, full opacity) while other days fade into the background; all timestamps for the selected day open simultaneously; clicking the map background or the same point again resets the view
- (skvarel) Added "Day highlight" toggle to the hamburger menu to switch between single-popup and day-highlight mode; state persists per map in the browser
- (skvarel) Reduced popup size (smaller font and padding) for a less dominant appearance
- (skvarel) Added configurable popup opacity in the Map Display settings (default: 1.0)
- (skvarel) Active day highlight and open popups are restored after auto-refresh
- (skvarel) Added configurable default view range for the date picker; the map opens showing the last N days by default on every load

### 1.5.2 (2026-05-10)
- (skvarel) Added configurable opacity for flag markers (Life360 places and own places)

### 1.5.1 (2026-05-10)
- (skvarel) Extracted shared map JS and CSS from HTML tracker files into static files served once by the web adapter, reducing the size of each GPS-update HTML file significantly
- (skvarel) Fixed JSDoc type warnings introduced by updated ESLint config (jsdoc/reject-any-type, jsdoc/reject-function-type)
- (skvarel) Added documentation for tracker file storage location (Admin → Files → life360ng.<instance>/tracker/)
- (skvarel) Added separate docs page for the Map Display tab (colors, route style, place flags, layout) in English and German; moved map appearance content out of the Logbook docs page

### 1.5.0 (2026-05-10)
- (skvarel) Added flag markers for Life360 places and own places (MyPlaces) to all tracker maps, configurable color, size and visibility per source
- (skvarel) Map legend now hides automatically when the route checkbox is unchecked, on both person and circle maps
- (skvarel) Removed the separate "Show map legend" checkbox – legend visibility is now controlled via the route checkbox
- (skvarel) Moved map appearance settings (colors, markers, flags, layout) to a dedicated "Map Display" tab in admin config
- (skvarel) Replaced header checkboxes with a hamburger menu (☰) on all tracker maps; Route, Places, Footer and Map Size are now toggleable directly in the map; footer and map-size preferences are stored per map in the browser
- (skvarel) Map no longer auto-zooms after a data refresh when the user has manually panned or zoomed; the chosen view is kept until the tab or window is closed

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