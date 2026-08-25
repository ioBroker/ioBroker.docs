---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tractive-gps/README.md
title: ioBroker.tractive-gps
hash: MteWBrTibzitkSIjOvWT36omfScaaB0vj3YuA+WrA90=
---
![Логотип](../../../en/adapterref/iobroker.tractive-gps/admin/tractive-gps.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.tractive-gps)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tractive-gps.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.tractive-gps)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.tractive-gps)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.tractive-gps/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.tractive-gps)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.tractive-gps)
![Версия NPM](https://img.shields.io/npm/v/iobroker.tractive-gps.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/tractive-gps-stable.svg)
![Количество установок](https://iobroker.live/badges/tractive-gps-installed.svg)

# IoBroker.tractive-gps
[![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tractive-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>

**Версия:**

## Отказ от ответственности
Все названия продуктов и компаний, логотипы и товарные знаки, упомянутые в этом проекте, принадлежат их соответствующим владельцам. Компания Tractive и связанные с ней названия, логотипы и товарные знаки являются собственностью Tractive GmbH или их соответствующих владельцев. Их использование осуществляется исключительно в целях идентификации и не подразумевает какой-либо связи, спонсорства или одобрения со стороны Tractive GmbH или ее дочерних компаний. Это частный, некоммерческий проект, разработанный в развлекательных целях.

## Сообщение об ошибках в Sentry
Этот адаптер использует интеграцию Sentry, предоставляемую ioBroker, для автоматического сообщения разработчикам о неожиданных исключениях и ошибках в коде. Функция сообщения об ошибках доступна через js-controller начиная с версии 3.0 и помогает выявлять и устранять дефекты, которые в противном случае могли бы остаться незамеченными.

Подробную информацию о передаваемых данных и инструкции по отключению сообщений об ошибках см. в разделе [официальная документация ioBroker Sentry](https://github.com/ioBroker/ioBroker.js-controller#error-reporting-via-iobroker-sentry).

## Описание
Адаптер подключает ioBroker к учетной записи Tractive и предоставляет актуальную информацию о домашних животных и GPS-трекерах в виде состояний ioBroker. Это позволяет использовать данные о местоположении, уровне заряда батареи, состоянии подключения, информацию о домашних животных и поддерживаемых функциях трекеров в автоматизациях и визуализациях.

Адаптер использует неофициальный интерфейс сервиса Tractive. Для его работы необходимы действующая учетная запись Tractive и активная подписка на трекеры. Этот адаптер, созданный сообществом, не связан с Tractive и не поддерживается ею.

> [Немецкая документация](README_DE.md)

## Требования
- Node.js 22.13 или более поздняя версия
- js-controller 7.2.2 или новее
- Администратор 8 или более поздняя версия
- VIS 2 версии 2.12.8 или новее при использовании встроенного виджета.
- Учетная запись Tractive, к которой подключен как минимум один трекер.

## Функции
- Извлекает фактические имена и данные о домашних животных, связанных с учетной записью.
— Предоставляет текущие координаты GPS, высоту, скорость, точность определения местоположения, расстояние от заданного местоположения ioBroker и время последнего обновления.
- При необходимости преобразует координаты в читаемый адрес.
— Отображает уровень заряда батареи, состояние зарядки, используемый источник местоположения (`KNOWN_WIFI`/`GPS`), статус «дома/вне дома», состояние подключения к сети и режим энергосбережения.
— Предоставляет информацию о модели, прошивке, версии оборудования, возможностях, поле, дате рождения, росте, весе и другую доступную информацию.
- Поддерживает отслеживание в реальном времени, управление светодиодами и звуковой сигналом, когда трекер сообщает о наличии соответствующей возможности.
- Сохраняет все полученные данные об учетной записи, подписке, совместном использовании, питомце, трекере, местоположении и оборудовании в виде логического дерева локального состояния и в виде одного полного JSON-снимка.
- В комплект входит адаптивная карта VIS 2 с изображением питомца, интерактивной картой, отображением дальности действия и статусом трекера.
- Поддерживает изображение, предоставленное Tractive, или пользовательское изображение, загруженное в ioBroker.
- Обнаруживает отсутствующие или устаревшие данные трекера без автоматического удаления существующих объектов.

## Конфигурация
Откройте экземпляр адаптера и настройте следующие параметры:

| Настройки | Описание |
| --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Электронная почта | Адрес электронной почты учетной записи Tractive. |
| Пароль | Пароль учетной записи Tractive. Он хранится в стандартном зашифрованном формате конфигурации ioBroker. |
| Интервал обновления | Время между регулярными обновлениями местоположения. Доступны значения от 2 до 60 минут. |
| Преобразовать координаты в адрес | Запрашивает читаемый адрес для текущих координат. Отключите эту опцию, если адрес не требуется. |

Используйте кнопку **Проверить соединение**, чтобы подтвердить введенные учетные данные. Сохраните все настройки с помощью обычной кнопки ioBroker **Сохранить** внизу страницы конфигурации.

Если поле для пароля оставить пустым после сохранения конфигурации, пароль останется неизменным. Существующие пароли, использующие старый формат шифрования ioBroker, будут преобразованы в текущий формат AES при следующем сохранении конфигурации.

### График обновления данных
— Позиции обновляются в соответствии с заданным интервалом обновления.
— Информация о батарее и аппаратном обеспечении обновляется каждые 15 минут.
- Профили питомцев, изображения и другие статические данные обновляются во время ежедневной полной синхронизации.
— Полная синхронизация также выполняется после запуска адаптера.

Tractive может временно ограничивать запросы с HTTP-кодом 429. Адаптер распределяет запросы, приостанавливает все запросы при обнаружении такого ограничения и автоматически повторяет попытку. Успешное обновление отображается в `info.lastSuccessfulSync` и `info.dataFresh`.

## Объекты и состояния
Наиболее важные объекты сгруппированы следующим образом:

```text
tractive-gps.0
├── info
│   ├── connection
│   ├── dataFresh
│   ├── lastSync
│   ├── lastSuccessfulSync
│   ├── currentApi
│   ├── refresh
│   └── status
├── account.*
├── subscriptions.<subscription-id>.*
├── pets.<pet-id>
│   ├── info.*
│   ├── activity.*
│   └── media.*
├── trackers.<tracker-id>
│   ├── info.*
│   ├── status.*
│   ├── location.*
│   ├── hardware.*
│   └── commands.*
```

### Информация об адаптере
- `info.connection`: Указывает, была ли последняя синхронизация успешной.
- `info.dataFresh`: Указывает, доступны ли в данный момент данные, пригодные для использования.
- `info.lastSync`: Время последней попытки синхронизации.
- `info.lastSuccessfulSync`: Время последней успешной синхронизации.
- `info.refresh`: Кнопка для ручного запуска полной синхронизации.
- `info.status`: Текущее состояние адаптера.
- `info.currentApi`: Полный JSON-снимок доступных в данный момент данных о тяговом потоке.

### Домашние животные
В разделах `pets.<pet-id>.*`, расположенных ниже, содержится полезная информация о профиле питомца, назначение трекера, цели активности и фотография профиля. Пустые и внутренние поля API опущены.

### Трекеры
Состояния, указанные ниже в `trackers.<tracker-id>.*`, содержат идентификацию трекера, рабочее и онлайн-состояние, местоположение, источник данных о местоположении, расстояние от местоположения системы ioBroker, адрес, информацию о батарее и поддерживаемые команды. `location.sensorUsed` содержит источник данных о местоположении Tractive. `status.home` выводится из `KNOWN_WIFI` или `GPS`. Состояние `connectionType` не дублируется. Широта и долгота ioBroker задаются в системных настройках.

### Полные данные API
В качестве отдельных состояний создаются только значения, полезные для скриптов, автоматизации и визуализации. Пустые значения, метаданные API, внутренние поля версий и повторяющиеся представления опускаются. Полный, неизмененный объединенный ответ остается доступным в виде одного значения JSON в `info.currentApi`. Пароли для входа и токены доступа никогда к нему не добавляются.

## Команды трекера
Следующие состояния, допускающие запись, создаются только при поддержке выбранного трекера:

- `trackers.<tracker-id>.commands.liveTracking`
- `trackers.<tracker-id>.commands.led`
- `trackers.<tracker-id>.commands.buzzer`

Установите желаемое состояние на `true` или `false`. Состояние подтверждается после того, как Tractive примет команду.

## Виджет VIS 2
Адаптер включает виджет `PetTrackerCard` для VIS 2. Добавьте по одному виджету для каждого питомца или трекера и назначьте необходимые состояния в настройках виджета.

На карте можно отобразить:

- имя, порода, пол, возраст и вес питомца.
- название трекера и состояние онлайн,
- изображение питомца из локального состояния `media.localProfilePictureUrl`,
- интерактивная карта Leaflet/OpenStreetMap,
- указанный или заданный вручную радиус позиции,
- уровень заряда батареи, источник данных о местоположении, статус «дома/вне дома» и расстояние до ioBroker.
- последнее обновление, адрес, режим энергосбережения, состояние зарядки, скорость, высота и точность определения местоположения.
- переключатели для звукового сигнала, светодиода и отслеживания в реальном времени на поддерживаемых трекерах.

Для изображения Tractive выберите `pets.<pet-id>.media.localProfilePictureUrl` в качестве состояния изображения. Оно содержит URL-адрес копии, хранящейся в локальном файловом хранилище ioBroker. Если изображение не возвращается или его невозможно загрузить, выберите или загрузите собственное изображение в разделе **Внешний вид** виджета.

Карта может автоматически подстраиваться под полный круг точности или дальности. В виджете можно настроить минимальный и максимальный масштаб, интерактивность, источник дальности и радиус вручную. При отображении карты загружаются фрагменты карты из OpenStreetMap.

Для использования переключателей команд назначьте соответствующие состояния `trackers.<tracker-id>.commands.*` в разделе **Команды** виджета. Команды отключены во время редактирования представления VIS и становятся активными в режиме выполнения.

## Конфиденциальность и безопасность
— Пароль хранится с использованием механизма зашифрованной конфигурации ioBroker.
— Токены доступа хранятся в памяти и автоматически обновляются.
— Выбранная информация об учетной записи и подписке хранится в логическом дереве объектов. Полные полученные данные API хранятся локально в `info.currentApi`. Соответственно защитите доступ к дереву объектов ioBroker.
— Пароли и токены доступа никогда не добавляются в дерево состояний API и остаются защищенными зашифрованной конфигурацией или в памяти.
— Точные координаты хранятся локально в состояниях ioBroker, поскольку они необходимы для работы адаптера.
— Обратное геокодирование является необязательным и при включении отправляет координаты в адресную службу Tractive.
- Система обработки ошибок Sentry следует глобальной конфигурации ioBroker Sentry.
- Тела ответов API и полный локальный снимок не записываются в журнал адаптера и не отправляются явно в Sentry.

## Поиск неисправностей
- **Проверка соединения не удалась:** Проверьте адрес электронной почты, пароль, интернет-соединение и исходящий HTTPS-доступ.
- **Питомцы и трекеры не отображаются:** Убедитесь, что трекеры назначены настроенной учетной записи Tractive, затем перезапустите экземпляр адаптера.
- **Данные не обновлены:** Проверьте `info.status`, `info.dataFresh` и `info.lastSuccessfulSync`.
- **Сообщается об ошибке HTTP 429:** Оставьте экземпляр запущенным. Адаптер приостанавливает запросы и автоматически повторяет попытку после истечения лимита Tractive.
- **Адрес не отображается:** Включите обратное геокодирование в конфигурации адаптера.
- **Отсутствует команда:** Трекер не сообщил о требуемой возможности.
- **Изображение питомца отсутствует:** Присвойте виджету значение `localProfilePictureUrl` или выберите собственное изображение.

## Документация для разработчиков
Информация для авторов доступна в разделе [Документация для разработчиков](docs/DEVELOPMENT.md).

## Благодарности
Первоначально создано [xXBJXx](https://github.com/xXBJXx) и поддерживается организацией ioBroker community adapters.

## Changelog
### 3.0.0 (2026-08-24)

- (xXBJXx) BREAKING: rewritten for Node.js 22, js-controller 7.2.2, and Admin 8.
- (xXBJXx) Configured Sentry through ioBroker's adapter integration (#4).
- (xXBJXx) Replaced stored authorization data with in-memory authentication, automatic token renewal, request validation, retry handling, and account-wide rate limiting (#16, #115, #213, #231).
- (xXBJXx) Added the `pets.*`, `trackers.*`, and health object structures.
- (xXBJXx) Fixed pet names and added all available pet profile states with corrected height and weight units.
- (xXBJXx) Fixed missing state definitions for API fields that were not known in advance (#81, #113, #305; supersedes #114 and #175).
- (xXBJXx) Replaced the duplicate API hierarchy with a curated account, subscription, pet, tracker, position, and hardware state tree while retaining the complete JSON snapshot.
- (xXBJXx) Restored `sensor_used` and distance-from-ioBroker information based on PR #3, added home/away information, and removed the duplicate `connectionType` state.
- (xXBJXx) Fixed Tractive CDN profile-picture URLs and added home/away status and distance to the VIS 2 card.
- (xXBJXx) Cached Tractive profile pictures in ioBroker so VIS 2 can display CDN files delivered as binary downloads.
- (xXBJXx) Fixed profile-picture storage by using a dedicated ioBroker `meta` file container.
- (xXBJXx) Added the local profile-picture URL, textual charging state, speed, and altitude to the curated states and VIS 2 card.
- (xXBJXx) Fixed recognition of relative ioBroker file URLs in `localProfilePictureUrl`.
- (xXBJXx) Added live tracking, LED, and buzzer commands for supported trackers.
- (xXBJXx) Added buzzer, LED, and live-tracking controls to the VIS 2 card.
- (xXBJXx) Reorganized the VIS 2 card into compact command, location, tracker, and pet sections.
- (xXBJXx) Updated the release tooling and added fixed-version Lerna support for the private npm workspaces.
- (xXBJXx) Rebuilt the adapter configuration for Admin 8 and removed the invalid jsonConfig configuration (#176).
- (xXBJXx) Added the VIS 2 `PetTrackerCard` widget with pet image, Leaflet/OpenStreetMap map, range display, and tracker information.
- (xXBJXx) Added support for Tractive profile images and custom ioBroker images.
- (xXBJXx) Added automatic light and dark theme colors to the VIS 2 widget.
- (xXBJXx) Added configurable map interaction, automatic range fitting, and minimum and maximum zoom.
- (xXBJXx) Switched password storage to ioBroker's server-side AES encryption and automatic migration of older passwords.
- (xXBJXx) Reduced recurring API traffic and added separate update intervals for positions, battery information, and static profile data.
- (xXBJXx) Added adaptive HTTP 429 handling, global request pauses, conservative retries, and cached address lookup.
- (xXBJXx) Migrated linting to ESLint 9 and `@iobroker/eslint-config` (#45).
- (xXBJXx) Added Node.js 24 to the CI test matrix (#116).
- (xXBJXx) Migrated automated npm releases to Trusted Publishing with GitHub OIDC (#169).
- (xXBJXx) Updated repository metadata and schema configuration, superseding maintenance PRs #214, #215, #216, and #291.
- (xXBJXx) Updated dependencies and workspace tooling, superseding PRs #91, #140, #147, #203, #211, #220, #256, #281, #298, #301, and #303.
- (xXBJXx) Updated tests, documentation, and privacy safeguards.

### 2.1.0 (2024-11-12)

- (mcm1957) Adapter requires Node.js 20 now.
- (mcm1957) Adapter requires js-controller 5.0.19 and Admin 6.17.14 now.
- (simatec) Adapter changed to meet responsive design rules.
- (mcm1957) Corrected an error in the jsonConfig reauthorization command.
- (mcm1957) Dependencies have been updated.

### 2.0.1 (2024-08-20)

- (bluefox) Fixed encryption of the access token.

### 2.0.0 (2024-08-18)

- (bluefox) BREAKING: credentials must be entered again.
- (bluefox) Removed old code and rewrote the GUI.
- (bluefox) Updated dependencies.

### 1.2.0 (2024-04-28)

- (mcm1957) Adapter requires Node.js 18 and js-controller 5 or newer.
- (mcm1957) Updated dependencies.

## License

MIT License. See [LICENSE](LICENSE).