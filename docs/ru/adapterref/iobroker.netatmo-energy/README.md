---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.netatmo-energy.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/netatmo-energy-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/netatmo-energy-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg
BADGE-Test and Release: https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/admin/svg-badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.netatmo-energy/README.md
title: ioBroker.net atmo-energy
hash: 4z3UY0aciizHDfRPeK9IJRAakjE8ibhSSZmOlt1lb3c=
---
![логотип](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/admin/netatmo-energy.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)
![Количество установок (последние)](http://iobroker.live/badges/netatmo-energy-installed.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/netatmo-energy-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)
![Тестирование и выпуск](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/admin/svg-badge.svg)
![НПМ](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)

# ioBroker.net atmo-energy

**Этот адаптер использует библиотеки Sentry для автоматической отправки отчетов о сбоях и ошибках в коде разработчикам.** Для получения более подробной информации и сведений об отключении этой функции обратитесь к [документации плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетов Sentry доступна начиная с версии js-controller 3.0.

## Требования и конфигурация

Учетная запись Netatmo Energy Hardware (термостаты, клапаны) в Netatmo Cloud.

- Адаптер работает с admin >= 3 и nodejs >= 16.
- Создайте свою учетную запись [: https://auth.netatmo.com/de-de/access/signup](https://auth.netatmo.com/de-de/access/signup)
- Войдите в API [по адресу https://dev.netatmo.com/apidocumentation/energy](https://dev.netatmo.com/apidocumentation/energy)
- Создайте собственное приложение, перейдя в свой аккаунт (вверху слева) и нажав кнопку «Создать».
  - Заполните форму и сохраните её.
  - Скопируйте полученные идентификатор клиента и секретный ключ клиента в конфигурацию адаптера.
  - Перейдите к документации API [: https://dev.netatmo.com/apidocumentation/energy](https://dev.netatmo.com/apidocumentation/energy)
  - Выберите "Получить homesdata" - "Попробовать" - "Выполнить / HOMESDATA"
    - Вы получите ответ, содержащий ваш домашний идентификатор.
    - Добавьте их в конфигурацию адаптера.
    - Запустите адаптер Netatmo Energy Adapter и пройдите аутентификацию через API Netatmo.
      - Подтвердите, нажав кнопку «Аутентифицироваться с помощью Netatmo».
      - При необходимости войдите в свой аккаунт.
      - Подтвердите разрешение для сторонних поставщиков для вашего приложения Netatmo.
      - Закройте окно браузера
  - Выберите необходимые параметры в разделе «Настройки API» и сохраните конфигурацию адаптера.
    - Мгновенная передача изменений температуры... немедленная передача изменений температуры в состоянии "SetTemp" в API.
    - Считывайте состояния API сразу после изменений... Получайте данные API через homestatus сразу после обновлений API.
    - Обновление состояний API каждые x секунд... Непрерывное обновление данных API. (0 = Нет обновления)
  - При желании можно настроить службу уведомлений для получения информации об изменениях статуса. Это позволит вам получать информационные сообщения, предупреждения или сообщения об ошибках. Для этого необходимо активировать опцию «Включить/отключить уведомления» в разделе «Информация для входа», а затем настроить параметры в меню «Уведомления».
  - Кроме того, в настройках датчиков можно зарегистрировать датчики дверей/окон и определить желаемое действие. Эти функции, как правило, можно включить или отключить на странице входа в систему.

Подробное описание доступно в вики ( <https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki> ).

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_login_de.png" alt="settingsLogin" width="70%"/>

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_api_de.png" alt="settingsAPI" width="70%"/>

## адаптер netatmo-energy для ioBroker

API Netatmo Energy используется для получения и изменения текущих настроек. Адаптер использует запрос fetch для передачи данных в API Netatmo Energy. Официальная документация по API: <https://dev.netatmo.com/apidocumentation/energy>

Адаптер создает собственное устройство "energyAPP", которое содержит запросы API и триггеры.

### API-запросы

- Команда \`homesdata\` получает полную структуру установки Netatmo Energy (используя параметр NAPlug). Все остальные параметры для ручных запросов можно выбрать самостоятельно.

- Система homestatus определяет и передает информацию о состоянии и технические характеристики закрепленных за ней клапанов. Если вам нужна информация о конкретном типе устройства, вы можете выбрать его самостоятельно.

- getroommeasure ... Эта функция предоставит вам исторические данные о ваших комнатах. Результат будет введен в поле "response".

- Функция getmeasure... позволит получить исторические данные по вашему котлу. Результат будет введен в поле "response".

- setthermmode\_schedule ... Устанавливает режим работы установки Netatmo Energy в "Расписание" (по умолчанию)

- setthermmode\_hq ... Устанавливает режим работы установки Netatmo Energy в "hq" (защита от замерзания)

- setthermmode\_away ... Устанавливает режим работы установки Netatmo Energy в положение «вне дома» (не дома).

- \`switchhomeschedule\`... Задает «режим расписания» API Netatmo Energy. Все возможные режимы перечислены в канале \`switchhomeschedule\`.

- Команда \`createnewhomeschedule\` устанавливает «режим расписания» API Netatmo Energy. Все возможные режимы перечислены в канале \`switchhomeschedule\`.

- SyncHomeSchedule... Задает расписание отопления в приложении Netatmo Energy. Чтобы изменить конкретное расписание отопления, введите значение. В противном случае будет изменено текущее расписание. Пожалуйста, введите необходимые параметры и запустите запрос SyncHomeSchedule.

- createnewhomeschedule ... Создает новое расписание отопления для вашего приложения Netatmo Energy. Пожалуйста, введите необходимые параметры и запустите запрос createnewhomeschedule.

Если API-запрос требует параметров, вы можете найти их в соответствующем канале запроса в канале "параметры".

### Курок

- Функция \`applychanges\` передает все ожидающие ручного изменения настроек ваших клапанов в приложение Netatmo Energy.
- Функция \`refresh\_structure\` генерирует запросы \`homesdata\` и \`homestatus\` последовательно.

### Запросы на изменения

- В зависимости от ручных изменений в канале «Настройки», эти изменения передаются в приложение Netatmo Energy (либо немедленно, либо автоматически — «Передача изменений температуры немедленно»).
- Кнопка "set\_mode\_to\_home" в канале "setting" устанавливает режим работы клапана в "домашний". Она также немедленно инициирует запрос к API для передачи изменения.

### Новости

- message\_text ... все сообщения передаются в этой точке данных

### статус

- Выполняется... Здесь вы можете увидеть, выполняется ли в данный момент запрос к API.

### Структура запроса

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP_measure.png" alt="settingsLogin" width="80%"/><img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP.png" alt="settingsLogin" width="80%"/>

## Строительные сооружения

При запуске адаптера обновляется текущее состояние всего приложения Netatmo Energy, и передается состояние всех клапанов и термостатов. В зависимости от общих настроек (чтение состояний API сразу после изменений), состояния клапанов и термостатов извлекаются сразу после изменения API (немедленно отправляется запрос на определение состояния дома). Инициализация выполняется при запуске адаптера.

## Уведомления

Если в настройках адаптера включена служба уведомлений, вам будут отправляться различные сообщения. Доступны следующие службы.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_types_de.png" alt="notifications" width="30%"/>

Пожалуйста, укажите необходимые данные для подключения к выбранной вами службе уведомлений.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_de.png" alt="notifications" width="70%"/>

## Новости

Здесь вы можете запускать отправку определенных сообщений в зависимости от изменений статуса. Вы можете определить желаемое сообщение, которое всегда будет передаваться в точку данных "message\_text".

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/messages_de.png" alt="messages" width="70%"/>

Нажатие кнопки «ОТПРАВИТЬ ТЕСТОВОЕ СООБЩЕНИЕ» позволяет протестировать службу обмена сообщениями. Перед тестированием необходимо сохранить все настройки службы обмена сообщениями.

## Датчики

В таблице можно настроить реакцию на атрибут «Датчик окна/двери» для каждой комнаты. Изменение состояния соответствующих датчиков окна может инициировать действие; это действие необходимо указать здесь. Можно выбрать все датчики логического типа. Это также позволяет интегрировать внешние датчики.

Могут быть запущены следующие действия:

- Заданная температура
- Установить домашний режим
- Установить режим нагрева
  - Защита от мороза
  - Не дома
  - Нормальная работа
- Активировать график отопления
  - Доступны все существующие графики отопления из приложения Netatmo Energy.

Это позволяет регулировать температуру клапана при открытии или закрытии окна/двери. Указав время задержки (в секундах), запрограммированное действие выполняется с задержкой. Если датчик срабатывания снова изменится в течение времени задержки, остальные ожидающие действия не будут выполнены.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/sensors_de.png" alt="sensors" width="70%"/>

## Вкладка "Администратор"

На вкладке «Администрирование» вы можете просмотреть все термостаты, мосты и клапаны вашего экземпляра Netatmo Energy. Оттуда вы также можете обновить этот список или инициировать полное обновление API. Кроме того, у вас есть возможность перенести изменения в облако и переключиться из ручного режима в режим по умолчанию.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/admintab_de.png" alt="admintab" width="70%"/>

На каждой карточке отображаются значки состояния, указывающие на текущее состояние термостата, клапанов и вилки. На обратной стороне термостата вы найдете различные запросы API для установки режима работы термостата и расписания отопления.

## Виджет

Виджет для VIS, отображающий полный термостат. Вам нужно ввести только значение параметра "SetTemp". Вся остальная информация определяется динамически на основе структуры "rooms".

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/valve_widget_de.png" alt="widget" width="250px"/>

## Changelog

[Older changes](CHANGELOG_OLD.md)
<!-- ### **WORK IN PROGRESS** -->
### 3.0.2 (2025-12-26)

* (ioKlausi) Update dependencies

### 3.0.1 (2025-12-23)

* (ioKlausi) Update dependencies

### 3.0.0 (2025-11-09)

* (ioKlausi) Added additional tests

### 2.8.8 (2025-11-01)

* (ioKlausi) Trusted publishing for npm packages

### 2.8.6 (2025-11-01)

* (ioKlausi) Trusted publishing for npm packages

### 2.8.5 (2025-11-01)

* (ioKlausi) Update dependencies

### 2.8.4 (2025-11-01)

* (ioKlausi) Update dependencies

### 2.8.3 (2025-09-08)

* (ioKlausi) Update dependencies

### 2.8.2 (2025-05-31)

* (ioKlausi) Update dependencies

### 2.8.1 (2025-04-24)

* (ioKlausi) Update dependencies

### 2.8.0 (2025-01-31)

* (ioKlausi) Update dependencies

### 2.7.3 (2024-01-27)

* (ioKlausi) Option 'Only update datapoints if changes are detected' corrected

### 2.7.2 (2024-01-18)

* (ioKlausi) Adjust attributes of the adapter

### 2.7.1 (2023-12-10)

* (ioKlausi) Remove GULP support
* (ioKlausi) Support dark mode

### 2.7.0 (2023-11-19)

* (ioKlausi) Adjust default value for parameters

### 2.6.5 (2023-11-05)

* (ioKlausi) New options in the adapter configuration for updating datapoints

### 2.6.4 (2023-10-25)

* (ioKlausi) Change value only if changes are detected

### 2.6.3 (2023-10-14)

* (ioKlausi) Adapt GULP

### 2.6.2 (2023-10-13)

* (ioKlausi) Bug fix of 'Sentry errors'

### 2.6.1 (2023-06-01)

* (ioKlausi) Correct some adapter check issues

### 2.6.0 (2023-05-01)

* (ioKlausi) Enable / Disable sensor actions

### 2.5.8 (2023-04-16)

* (ioKlausi) Bug fix of translations

### 2.5.7 (2023-04-16)

* (ioKlausi) Bug fix of sensor actions

### 2.5.6 (2023-04-15)

* (ioKlausi) Bug fix of Sentry errors
* (ioKlausi) Home mode for individual rooms in admin tab established
* (ioKlausi) Bug fix of translations

### 2.5.5 (2023-04-11)

* (ioKlausi) Bug fix of Sentry errors

### 2.5.4 (2023-04-10)

* (ioKlausi) Bug fix of Sentry errors

### 2.5.3 (2023-04-10)

* (ioKlausi) Added data point for messages

### 2.5.2 (2023-04-09)

* (ioKlausi) Made some adjustments in the admin config

### 2.5.1 (2023-04-09)

* (ioKlausi) Test message in config added
* (ioKlausi) Revise ioBroker Netatmo-Energy APP

### 2.5.0 (2023-04-07)

* (ioKlausi) Sensor changed to object ID type boolean

## License

MIT License

Copyright (c) 2021-2026 ioKlausi <nii@gmx.at>

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