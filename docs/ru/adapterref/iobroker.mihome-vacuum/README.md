---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mihome-vacuum/README.md
title: ioBroker mihome-vacuum adapter
hash: AXaqOxcOQ8yRYsihj6P0D18pdns2eKaXACOz2EpvcVs=
---
![Логотип](../../../en/adapterref/iobroker.mihome-vacuum/admin/mihome-vacuum.png)

![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![Количество установок](https://iobroker.live/badges/mihome-vacuum-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.mihome-vacuum.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mihome-vacuum.svg)

# ioBroker mihome-vacuum adapter

![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.mihome-vacuum/workflows/Test%20and%20Release/badge.svg)
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/mihome-vacuum/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[Немецкая документация](README_de.md)

Адаптер mihome-vacuum подключает ioBroker к совместимым роботам-пылесосам экосистемы Xiaomi. Он поддерживает локальное управление с помощью IP-адреса и токена робота, опциональное обнаружение устройств и карты в облаке Xiaomi, уборку комнат, таймеры, историю уборки, информацию о расходных материалах, а также специальные виджеты VIS 1 и VIS 2.

Поддерживаемые семейства устройств включают Roborock/rockrobo, Viomi и Dreame. Точные команды, функции карты, комнаты, управление шваброй, управление док-станцией и состояние расходных материалов зависят от модели и прошивки.

## Установка

Установите и обновите адаптер через административную панель ioBroker, используя опубликованную версию npm. Прямая установка из GitHub не поддерживается и отключена в административной панели. В исходном репозитории отсутствуют сгенерированные пакеты среды выполнения, административного интерфейса или VIS 2; они включены в опубликованные пакеты.

## Поддерживаемые устройства и функции

Поддерживаются следующие модели, что указано в документации. Другие модели из того же семейства устройств могут работать с менеджером совместимости, но это не гарантируется до проведения тестирования. Доступные функции также могут различаться в зависимости от установленной прошивки.

| Устройство             | Базовое управление | История уборки | Уборка номера | Карта |
| :--------------------- | :----------------: | :------------: | :-----------: | :---: |
| `viomi.vacuum.v6`      |          ✅         |        —       |       —       |   —   |
| `viomi.vacuum.v7`      |          ✅         |        —       |       —       |   —   |
| `viomi.vacuum.v8`      |          ✅         |        —       |       —       |   —   |
| `viomi.vacuum.v19`     |          ✅         |        —       |       —       |   —   |
| `rockrobo.vacuum.v1`   |          ✅         |        ✅       |       —       |   ✅   |
| `roborock.vacuum.s4`   |          ✅         |        ✅       |       ✅       |   ✅   |
| `roborock.vacuum.s5`   |          ✅         |        ✅       |       ✅       |   ✅   |
| `roborock.vacuum.s5e`  |          ✅         |        ✅       |       ✅       |   ✅   |
| `roborock.vacuum.m1s`  |          ✅         |        ✅       |       ✅       |   ✅   |
| `roborock.vacuum.a10`  |          ✅         |        ✅       |       ✅       |   ✅   |
| `roborock.vacuum.a15`  |          ✅         |        ✅       |       ✅       |   ✅   |
| `dreame.vacuum.r2205`  |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.r2216o` |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.r2228o` |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2008`  |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2009`  |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2027`  |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2028`  |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2029`  |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2036`  |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2041o` |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2114a` |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2148o` |          ✅         |        ✅       |       —       |   —   |
| `dreame.vacuum.p2156o` |          ✅         |        ✅       |       —       |   —   |

`✅` Это означает, что данная функция поддерживается для описанной модели. `—` Это означает, что адаптер в настоящее время не предоставляет эту функцию для данной модели.

## Отказ от ответственности

Все названия продуктов и компаний, логотипы и товарные знаки, упомянутые в этом проекте, принадлежат их соответствующим владельцам. Xiaomi, Mi Home, Roborock, Viomi, Dreame, а также связанные с ними названия, логотипы и товарные знаки являются собственностью их соответствующих владельцев. Их использование осуществляется исключительно в целях идентификации и не подразумевает какой-либо связи, спонсорства или одобрения. Это частный, некоммерческий проект с открытым исходным кодом, разработанный в развлекательных целях.

## Часовой

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и инструкций по отключению отчетов об ошибках, пожалуйста, обратитесь к следующему разделу. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry)Система отчетности Sentry доступна в js-controller версии 3.0 и новее.

## Требования

- Node.js 22.13 или более поздняя версия
- js-controller 7.2.2 или новее
- Администратор 7.8.23 или более поздняя версия
- Хост ioBroker и робот должны быть доступны через одну и ту же локальную сеть.
- Для локального управления UDP требуется действительный локальный токен устройства.

Xiaomi Cloud является необязательным инструментом для обычного локального управления. Он используется для удобного обнаружения устройств и отображения карт Xiaomi Cloud.

## Быстрый старт

1. Установите адаптер и создайте экземпляр.
2. Откройте конфигурацию экземпляра и выберите **Связь** вкладка.
3. Выберите регион Xiaomi, в котором зарегистрирован пылесос.
4. Нажмите **Создать ссылку для входа в Xiaomi**.
5. Откройте указанную ссылку и подтвердите вход в систему Xiaomi в браузере.
6. Вернитесь в ioBroker после того, как статус облака изменится на **Аутентифицированный**.
7. Нажмите **Получить устройства** и выберите пылесос из списка устройств.
8. Проверьте автоматически заполненные данные токена, IP-адреса, модели и менеджера.
9. Сохраните конфигурацию и убедитесь в этом. `info.connection` становится `true`.

![Подключение и вход в Xiaomi Cloud](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Login%20VacuumControl-redacted.png)

Вход осуществляется через ссылку для авторизации Xiaomi. Адаптер не генерирует QR-код. Ссылка истекает через короткое время; создайте новую ссылку, если статус изменится на... `expired` или `error`.

Выбранное устройство обычно автоматически предоставляет локальный токен, IP-адрес и модель. Токен шифруется в конфигурации экземпляра ioBroker и скрывается в пользовательском интерфейсе. Используйте кнопку с изображением глаза только в том случае, если вам необходимо просмотреть или скопировать его.

Никогда не публикуйте токен устройства, ссылку для входа в Xiaomi, cookie, облачную сессию или неотредактированные отладочные ответы в сообщениях на форумах или в вопросах.

## Локальная настройка без облачного сервиса Xiaomi.

Локальное управление не зависит от активной сессии Xiaomi Cloud. Если локальный токен, IP-адрес и модель уже известны, введите их. **Ручные настройки**:

- **Токен:** локальный шестнадцатеричный токен устройства
- **IP-адрес:** текущий локальный адрес робота
- **Модель:** идентификатор модели, например `roborock.vacuum.s5`
- **Менеджер:** Обычно определяется автоматически; выбирайте Roborock, Viomi или Dreame вручную только при необходимости.
- **Вакуумный порт:** обычно `54321`
- **Собственный порт:** локальный UDP-порт, используемый данным экземпляром адаптера, обычно `53421`

Назначьте роботу фиксированный DHCP-адрес, чтобы его IP-адрес не менялся.

### Получение токена вручную

Получение локального токена устройства вручную может оказаться самой сложной частью настройки без обнаружения устройства в облаке Xiaomi. В следующем внешнем руководстве описан один из возможных вариантов процедуры для нескольких моделей Xiaomi и Roborock:

[Руководство по извлечению токенов (на немецком языке)](https://www.smarthomeassistent.de/token-auslesen-roborock-s6-roborock-s5-xiaomi-mi-robot-xiaowa/)

Это руководство от стороннего разработчика и может не работать со всеми моделями, версиями прошивки или текущими версиями приложения Mi Home. Относитесь к токену как к паролю: храните его в безопасном месте и никогда не публикуйте в журналах, скриншотах, сообщениях об ошибках или на форумах.

## Конфигурация

### Связь

Вкладка «Подключение» содержит информацию об аутентификации в облаке Xiaomi, обнаружении устройств и локальных настройках, используемых для прямой связи с пылесосом.

- Успешный вход в облако сохраняется как защищенная, зашифрованная сессия.
- **Получить устройства** Становится доступным только после аутентификации.
- Выбор обнаруженного пылесоса заполняет недостающие локальные настройки и при необходимости заменяет устаревший токен.
- Ссылка для входа удаляется после успешного входа в систему или по истечении срока ее действия.
- Удаление сохраненного токена вступает в силу при сохранении конфигурации.

### Общие настройки

![Общие настройки](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Settings%20VacuumControl.png)

- **Интервал состояния запроса:** Как часто запрашивается текущий статус робота. Очень короткие интервалы увеличивают нагрузку на сеть и робота.
- **Запросить интервал состояния Wi-Fi:** Как часто обновляется информация о сигналах.
- **Включить карту из облака Xiaomi:** Включает загрузку карт из облака Xiaomi. Требуется авторизованная облачная сессия.
- **Включить Valetudo:** Использует совместимый локальный источник карт Valetudo.
- **Отправляйте собственные команды:** создает экспертные государства `control.X_send_command` и `control.X_get_response`.
- **Добавить штаты Alexa/IoT:** дополнительно создает `control.pauseResume` для голосовых помощников и интеграции с устройствами Интернета вещей. `control.clean_home` всегда существует.
- **Сделайте паузу перед тем, как отправиться домой:** Перед командой возврата в док-станцию отправляет паузу для моделей, которые этого требуют.
- **Возобновить приостановленную очистку зоны с помощью кнопки «Пуск»:** возобновляет прерванную зональную очистку вместо начала полной очистки.
- **Расширенная регистрация диагностических данных:** Добавляет подробную, отредактированную отладочную информацию. Включайте её только временно во время устранения неполадок.

### Настройки карты

![Настройки карты](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Karteeinstellung%20VacuumControl.png)

Поддержка карт зависит от модели вакуума и выбранного источника.

- **Интервал запроса:** определяет, как часто запрашивается источник карты.
- **Интервал сохранения карты:** управляет частотой записи сгенерированного PNG-файла.
- **Новый формат карты с цветовой маркировкой помещений:** Включает сегментированное отображение помещения там, где это поддерживается.
- **Цвета пола, стен и дорожек:** Настройте сгенерированную карту.
- **Значок робота:** Выбирает символ, отображаемый в позиции робота.

| Карта штата          | Описание                                               |
| -------------------- | ------------------------------------------------------ |
| `cleanmap.map64`     | Карта Base64/data-URL, рекомендуется для виджетов VIS. |
| `cleanmap.mapURL`    | Путь к сгенерированному PNG-файлу                      |
| `cleanmap.actualMap` | Активный идентификатор карты                           |
| `cleanmap.mapStatus` | Текущий статус обработки карты                         |
| `cleanmap.loadMap`   | Запрос на обновление карты                             |

Для работы облачных карт Xiaomi необходимы оба компонента. **Включить карту из облака Xiaomi** и действительный вход в облако. Локальные команды робота продолжают работать, даже если облачная сессия недоступна.

### Таймер

![Настройка таймера](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Timer%20VacuumControl.png)

Таймеры адаптера позволяют запускать выбранные каналы в комнате в выбранный день недели и время.

1. Сначала загрузите или создайте каналы комнаты.
2. Открыть **Таймер** и нажмите **Добавлять**.
3. Выберите день недели, час, минуту, комнаты и/или каналы, относящиеся к комнате.
4. Включите таймер и нажмите **Сохранение таймеров**.

Таймеры адаптера хранятся в ioBroker и, следовательно, могут отображаться или управляться также из VIS. Они не зависят от таймеров, настроенных в приложении Xiaomi.

## Функции

### Базовое управление

| Состояние            | Функция                                                     |
| -------------------- | ----------------------------------------------------------- |
| `control.start`      | Начните полную уборку                                       |
| `control.pause`      | Приостановить текущую задачу                                |
| `control.home`       | Вернитесь на зарядную станцию                               |
| `control.find`       | Воспроизвести звук местоположения робота                    |
| `control.spotclean`  | Начните точечную уборку.                                    |
| `control.fan_power`  | Прочитайте или установите мощность всасывания.              |
| `control.zoneClean`  | Очистите одну или несколько зон, основанных на координатах. |
| `control.goTo`       | Перейти к координатам на карте                              |
| `control.clearQueue` | Очистить очередь ожидающих очистки                          |
| `control.clean_home` | `true` начинает уборку, `false` возвращается домой          |

Дополнительные элементы управления для влажной уборки, мытья, сушки, сбора пыли, режима работы с коврами и функций док-станции создаются только в том случае, если они поддерживаются выбранной моделью.

### Комнаты

Адаптер создает каналы ниже. `rooms` когда робот отображает информацию о помещении или сегменте.

- Использовать `rooms.loadRooms` для перезагрузки комнат роботом.
- В адресе канала комнаты содержится индекс карты или координаты зоны, а также команда запуска.
- Назначьте каналы комнаты для ioBroker. `enum.rooms` для использования читаемых назначений помещений.
- Перед включением питания в комнате установите желаемый уровень мощности всасывания.
- `rooms.multiRoomClean` Можно одновременно запустить несколько назначенных комнат.
- `rooms.addRoom` Можно создать комнату вручную, используя индекс карты или координаты зоны.

Названия и возможности помещений задаются роботом и могут различаться в зависимости от модели и версии прошивки.

### История уборки

Он `history` В канале отображается общее время уборки, общая площадь, количество уборок и последние записи об уборке в формате JSON и HTML. История также отображается в обоих предоставленных виджетах.

### Расходные материалы и техническое обслуживание

Поддерживаемые значения параметров обслуживания создаются ниже. `consumable`Например, фильтр, основная щетка, боковая щетка, датчики, фильтр для воды, насадка для швабры, сетчатый фильтр, чистящая щетка и счетчики пылесборников.

Сброс времени жизни компонента возможен только после его очистки или замены. Неподдерживаемые расходные материалы не отображаются в виджетах.

### Расширенные пользовательские команды

Когда **Отправляйте собственные команды** Если эта функция включена, команды можно записывать в `control.X_send_command`Ответы появляются в `control.X_get_response`Это предназначено для опытных пользователей. Недопустимые или несовместимые с моделью команды могут привести к неожиданному поведению робота.

## Важные штаты

| Канал               | Цель                                                                             |
| ------------------- | -------------------------------------------------------------------------------- |
| `info.connection`   | Статус локального соединения                                                     |
| `info.state`        | Числовое значение состояния робота с читаемыми метками состояния.                |
| `info.error`        | Числовой код ошибки с читаемыми обозначениями ошибок.                            |
| `info.battery`      | Уровень заряда батареи в процентах                                               |
| `info.cleanedarea`  | Участок, очищенный во время текущей/последней работы.                            |
| `info.cleanedtime`  | Продолжительность уборки                                                         |
| `info.wifi_signal`  | Уровень сигнала Wi-Fi робота                                                     |
| `deviceInfo.model`  | Обнаруженная модель                                                              |
| `deviceInfo.fw_ver` | Версия прошивки                                                                  |
| `auth.status`       | статус аутентификации в облаке Xiaomi                                            |
| `auth.loginUrl`     | Временная ссылка для входа; удаляется после завершения/истечения срока действия. |
| `auth.lastError`    | Последнее сообщение об ошибке безопасной аутентификации                          |
| `auth.expiresAt`    | Время истечения срока действия ссылки для входа                                  |

`info.state` и `info.error` В определение объекта ioBroker следует включить перечисляемый текст. Неизвестные коды остаются видимыми, поэтому их можно отобразить без потери исходного значения.

## Виджеты VIS 1 и VIS 2

Оба виджета, входящие в комплект, обеспечивают адаптивную панель управления с картой, состоянием подключения и робота, батареей, зоной уборки, продолжительностью работы, информацией об ошибках, выбором уровня всасывания, быстрыми элементами управления, возможностью работы с шестью комнатами, действиями по техническому обслуживанию и отдельным просмотром истории.

### ВИС 1

Выберите набор виджетов **mihome-vacuum** и добавить **Панель приборов пылесоса с картой, информацией о техническом обслуживании и историей.**&#x412;ыберите **состояние**
(`info.state`Сначала заполните все остальные пустые атрибуты состояния вашего экземпляра: виджет заполнит все остальные пустые атрибуты состояния этого экземпляра, включая варианты Viomi и Dreame для уровня воды, режима швабры и состояния док-станции.

Виджет VIS 1 предлагает те же разделы, что и виджет VIS 2: уровень воды, режим влажной уборки и режим уборки ковров, док-станция с ее действиями, селектор карт с функцией перезагрузки для роботов, работающих с несколькими картами, состояние «не беспокоить» с указанием следующего таймера и настраиваемое количество записей истории. Каждый раздел отображается только тогда, когда ему назначено соответствующее состояние, поэтому оставьте пустыми состояния функций, которых нет у вашего робота. Таймеры можно переключать только в VIS 2; VIS 1 отображает следующий запланированный запуск.

![ВИС 1 вакуумный виджет](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Vis%201%20VacuumControlWidget.png)

### ВИС 2

Выберите набор виджетов **Пылесос Mi Home** и добавить **Управление вакуумом с помощью карты**Настройки сгруппированы по категориям: общие параметры, состояния и элементы управления, техническое обслуживание, комнаты и история.

- **Выбор экземпляра:** выберите **состояние** (`info.state`) экземпляра адаптера, который вы хотите отобразить. Все пустые атрибуты состояния заполняются автоматически из этого экземпляра, поэтому переключение с `mihome-vacuum.0` Для перехода к другому экземпляру достаточно одного щелчка.
- **Тема:** Виджет будет соответствовать светлой или темной теме и основному цвету вашего проекта VIS 2. (Дополнительно) **акцентный цвет** Переопределяет основной цвет.
- **Уровни всасывания:** Выбираемые уровни берутся из `control.fan_power` Состояние вашего робота, поэтому каждая модель отображает свои уровни. Три числовых резервных значения используются только в том случае, если для состояния нет каталога уровней.
- **Тексты состояния и ошибок:** взято из определений состояния адаптера и переведено там, где существует перевод.
- **История:** Количество отображаемых циклов очистки можно настроить.
- **Настройки очистки:** Уровень воды, режим влажной уборки и режим чистки ковров отображаются в качестве элементов управления, когда ваш робот выдает соответствующие состояния. При выборе экземпляра также находятся варианты этих состояний для роботов Viomi и Dreame.
- **Док-станция:** Отображает состояние док-станции и предлагает опорожнить пылесборник, а также вымыть и высушить швабру (для роботов, оснащенных такой станцией).
- **Карты:** Роботы, имеющие несколько карт, получают селектор карты на изображении карты, и **Перезагрузить карту** получает текущую карту от робота.
- **Расписание:** Отображает состояние «не беспокоить», следующий таймер и все таймеры, созданные в конфигурации адаптера. Таймер можно включить или выключить, пропустить один раз или запустить немедленно из виджета. Раздел можно скрыть с помощью **Расписание шоу**.

Каждый элемент управления отображается только тогда, когда адаптер создал соответствующее состояние для вашего робота, поэтому виджет адаптируется к набору функций модели. Виджеты, созданные с помощью более ранней версии адаптера, автоматически подхватывают новые состояния своего экземпляра; атрибуты в настройках виджета нужно изменять только тогда, когда состояние должно указывать в другое место.

![Вибровиджет VIS 2](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/Vis%202%20VacuumControlWidget.png)

### Комнаты, уровни всасывания и планировка

С **Автоматическое определение помещений** (по умолчанию) Виджет VIS 2 отображает все комнаты, созданные адаптером, указанные ниже. `rooms.*`включая собственный уровень всасывания в месте опоры робота. Отключите возможность ручной настройки до шести комнат с отображаемым названием, начальным состоянием и состоянием мощности вентилятора. Виджет VIS 1 всегда использует ручную настройку комнат.

Виджеты сохраняют полное соотношение сторон карты и адаптируют свою компоновку к собственной ширине, а не к ширине окна браузера. Если виджет слишком мал, его содержимое прокручивается, вместо того чтобы карта перекрывала элементы управления или карточки обслуживания. Для сброса счетчика расходуемых предметов требуется предварительное подтверждение.

### История виджетов

На вкладке «История» отображается общее количество уборок, общая площадь, общее время и результаты последних уборок.

![История уборки VIS 1 и VIS 2](../../../en/adapterref/iobroker.mihome-vacuum/admin/media/History%20vis%201%20und%202%20VacuumControlWidget.png)

## Поиск неисправностей

### Робот не подключается

- Проверять `info.connection`IP-адрес робота, токен и выбранная модель.
- Убедитесь, что робот и хост ioBroker могут взаимодействовать через локальную сеть. Для некоторых моделей требуется одна и та же подсеть.
- Зарезервируйте IP-адрес робота на DHCP-сервере.
- Держите вакуумный порт в... `54321` если только устройство явно не использует другой порт.
- Убедитесь, что другой экземпляр адаптера не использует тот же UDP-порт.

### Сбой при входе в облако или обнаружении устройства.

- Выберите тот же регион Xiaomi, который используется роботом.
- Если предыдущая ссылка для входа устарела, создайте новую.
- Перед нажатием кнопки завершите авторизацию в браузере. **Получить устройства**.
- А Xiaomi `401` или `403` В результате выполнения команды сохраненная сессия становится недействительной, и требуется повторный явный вход в систему.

### Карта не отображается

- Убедитесь, что подключенная модель поддерживает получение данных с карты.
- Включите либо облачные карты Xiaomi, либо Valetudo.
- Для карт Xiaomi проверьте следующее: `auth.status` является `authenticated`.
- Проверять `cleanmap.mapStatus`, `cleanmap.map64`а также журнал отладки адаптера.

### Установка завершается с ошибкой при создании холста.

Визуализатор карты использует необязательный собственный механизм. `canvas` Если в Linux нет готового бинарного файла, перед переустановкой установите необходимые системные пакеты:

```sh
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

Не устанавливайте старую версию вручную. `canvas` Добавьте версию 2.x в каталог адаптера.

### Множество роботов

Для каждого робота создайте отдельный экземпляр адаптера. Каждый экземпляр должен использовать свой собственный адаптер. **Собственный порт**, например `53421`, `53422`, и так далее.

## Служба поддержки и сообщения об ошибках

При сообщении о проблеме укажите версию адаптера, версию Node.js, версию js-контроллера, идентификатор модели, соответствующие строки лога и действие, вызвавшее проблему. Перед публикацией логов удалите токены, ссылки для входа, cookie, облачные сессии, IP-адреса и другие конфиденциальные данные.

Используйте [Система отслеживания ошибок GitHub](https://github.com/iobroker-community-adapters/ioBroker.mihome-vacuum/issues) для воспроизводимых ошибок и запросов на добавление новых функций.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
    * ()
-->
### **WORK IN PROGRESS**

### 6.1.0 (2026-09-08)

* (xXBJXx) VIS 1 widget: added the cleaning settings, dock station, map selection, do-not-disturb and next-timer sections of the VIS 2 widget, a configurable history length, manager-specific auto-fill of the state attributes, translated state and error texts in all languages, SVG icons instead of Unicode symbols, and a layout that follows the widget width
* (xXBJXx) Removed 115 unused duplicate translation keys of the widget texts
* (xXBJXx) Completed the Spanish, French, Italian, Dutch, Polish, Portuguese, Russian, Ukrainian and Chinese translations of the Admin configuration and both widgets; they previously showed English texts
* (xXBJXx) VIS 2 widget: added water level, mop mode and carpet mode controls, dock station status and actions, map selection and reload, and a schedule section with do-not-disturb, next timer and timer switches; every control appears only when the robot provides the matching state, and the instance selection also finds the Viomi and Dreame state names
* (xXBJXx) Reworked the VIS 2 widget: it follows the VIS 2 theme with an optional accent color, lays itself out by its own width, fills all state attributes from the selected instance, detects rooms automatically, takes suction levels and status texts from the adapter states, confirms resets in a dialog, and has a configurable history length
* (xXBJXx) VIS 1 widget: respect the configured widget size instead of forcing 1280x800 and label the map image correctly
* (xXBJXx) Upgraded the Admin configuration and the VIS 2 widget to React 19, MUI 9, and `@iobroker/gui-components` 10 so the widget keeps working with upcoming VIS 2 releases while staying compatible with the current VIS 2
* (xXBJXx) Updated `qs` to 6.16 and the VIS 2 type definitions and Module Federation tooling to their current versions

### 6.0.1 (2026-09-07)

* (xXBJXx) Remove install-time and prepublish build hooks, build explicitly in CI, and disable unsupported GitHub installations (#1223)
* (xXBJXx) Start directly from `build/main.js` and generate Admin/VIS bundles for npm packages instead of tracking build output in Git
* (xXBJXx) Verify script-free package installation, generated UI assets, direct startup, and Compact Mode
* (xXBJXx) Remove unused Chai test plugins, add VS Code metadata schema support, and annotate the optional Canvas dependency for the repository checker (#1222)
* (xXBJXx) Allow Dependabot updates of GitHub Actions and dependency versions without failing the package policy tests (#1235)
* (xXBJXx) Restore the "Add Alexa/IoT states" option in the Admin configuration so `control.pauseResume` is no longer deleted on every start
* (xXBJXx) Fix the `getCleaningSummary` message, which sent a consumable reset instead of requesting the cleaning summary
* (xXBJXx) Answer the legacy `send` message only once and no longer forward it to the device manager
* (xXBJXx) Reject map updates with a clear error when neither the Xiaomi Cloud map nor Valetudo is enabled instead of leaving the request pending
* (xXBJXx) Track every pending internal delay separately so all of them are cancelled on unload, and remove a duplicated `control.goTo` definition
* (kosmix1980) Apply the room fan, water and mop settings through miIO before queued and repeated room cleanings start instead of racing them against the start command (#1231)
* (kosmix1980) Keep the native multi-pass segment cleaning lockout only for the current run instead of persisting it after a single error (#1231)
* (xXBJXx) Continue starting the cleaning with a warning when a fan, water or mop parameter command fails

### 6.0.0 (2026-08-26)

* (xXBJXx) Align the Admin requirement with stable Admin 7.8.23 and remove the invalid empty instance-object declaration
* (xXBJXx) Add the official ioBroker adapter development toolchain and allow compatible `qs` patch updates
* (xXBJXx) Require Node.js 22.13 or newer, js-controller 7.2.2 or newer, and Admin 7.8.23 or newer
* (xXBJXx) Build the productive runtime from TypeScript and start it through a Git-install-compatible bootstrap
* (xXBJXx) Added a responsive React, Vite and TypeScript configuration UI with connection, general, map and timer settings
* (xXBJXx) Added Xiaomi login-link authentication and the `auth.status`, `auth.loginUrl`, `auth.lastError`, and `auth.expiresAt` states
* (xXBJXx) Added encrypted and protected persistence for the local device token and reusable Xiaomi Cloud session
* (xXBJXx) Added opt-in advanced diagnostic logging with credential and personal-data redaction
* (xXBJXx) Added TypeScript, protocol, lifecycle, multi-instance, admin-security, package and integration test coverage
* (xXBJXx) Added clean package builds and a packed-runtime installation smoke test
* (xXBJXx) Added redesigned VIS 1 and VIS 2 widgets with maps, rooms, maintenance and history
* (xXBJXx) Added shared ioBroker/Weblate translations for Admin, VIS 1 and VIS 2
* (xXBJXx) Completed all shipped translations and migrated Admin and VIS 2 to ioBroker's short i18n format
* (xXBJXx) Migrated the adapter runtime and its Roborock, Viomi and Dreame managers from JavaScript to TypeScript
* (xXBJXx) Updated the local UDP startup, request dispatching, timeout handling and shutdown lifecycle
* (xXBJXx) Migrated runtime callbacks to unload-aware ioBroker timers and deprecated object writes to supported APIs
* (xXBJXx) Isolated runtime state per adapter and manager instance for Compact Mode and multiple instances
* (xXBJXx) Kept local IP/token control independent from Xiaomi Cloud authentication
* (xXBJXx) Updated runtime and development dependencies, including `canvas` 3.2.3, `qs` 6.15.3 and the current ioBroker tooling
* (xXBJXx) Updated CI to build and test the backend, admin UI and installation package on supported Node.js versions
* (xXBJXx) Always create `control.clean_home`, independently of optional Alexa/IoT configuration
* (xXBJXx) Prevent the first `miIO.info` request from being lost directly after the UDP connection event
* (xXBJXx) Prevent timers and pending requests from writing states after adapter shutdown
* (xXBJXx) Prevent delayed status callbacks from losing their manager context and terminating the adapter
* (xXBJXx) Validate cloud sessions, cloud responses, room objects and optional configuration values before use
* (xXBJXx) Redact device tokens, cloud sessions, cookies, login URLs and complete API payloads from normal logs

### 5.3.0 (2025-07-24)

* (dirkhe) update dependecies
* (dirkhe) replace request with axios
* (dirkhe) fix login issues by replacing and moving code to XiaomiCloudConnector

### 5.2.0 (2025-01-22)

* (dirkhe) add IP Adress to info
* (dirkhe) assign rockrobo (valetudo) to roborock Manager

[Older changelog entries](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2017-2023 bluefox <dogafox@gmail.com>

See [LICENSE](LICENSE) for the complete license text.