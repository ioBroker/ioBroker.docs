---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.netatmo-energy.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/netatmo-energy-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/netatmo-energy-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg
BADGE-NPM: https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.netatmo-energy/README.md
title: ioBroker.netatmo-энергия
hash: Fmn20MfuW0IuNXJv9L7ChDDT/aJM2/ojMEIhsyJZYZc=
---
![логотип](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/admin/netatmo-energy.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)
![Количество установок (последние)](http://iobroker.live/badges/netatmo-energy-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/netatmo-energy-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)

# IoBroker.netatmo-energy
![тестирование и выпуск](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/admin/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для отправки автоматических отчетов о сбоях и ошибках программного кода разработчикам.** Дополнительные сведения и информацию о том, как отключить эту функцию, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry доступны, начиная с js-controller 3.0.

## Требования и конфигурация
Учетная запись оборудования Netatmo Energy (термостат, клапаны) в облаке Netatmo

- Адаптер работает с admin >= 3 и nodejs >= 14
- Создайте свою учетную запись <https://auth.netatmo.com/de-de/access/signup>
- Выполните вход в API <https://dev.netatmo.com/apidocumentation/energy>.
- Создайте собственное приложение, щелкнув свою учетную запись (вверху/слева) и нажав кнопку «Создать».
  - Заполните форму и сохраните ее
  - Применить полученный client-ID и client-secret-ID к конфигурации адаптера
  - Перейдите к документации по API <https://dev.netatmo.com/apidocumentation/energy>.
  - Выберите "ПОЛУЧИТЬ домашние данные" - "Попробовать" - "ВЫПОЛНИТЬ / HOMESDATA"
    - вы получите ответ, в котором найдете свой домашний ID
    - Применить их к конфигурации адаптера
    - Запустите адаптер Netatmo-Energy и авторизуйтесь с помощью Netatmo API.
      - Подтвердите кнопку «Аутентифицировать себя с помощью Netatmo»
      - Войдите в свою учетную запись, если это необходимо
      - Подтвердите стороннее разрешение для вашего приложения Netatmo.
      - Закройте окно браузера
  - Выберите нужные параметры в "Настройках API" и сохраните конфигурацию адаптера
    - Немедленная передача изменений температуры... немедленная передача изменений температуры в состоянии "SetTemp" в API
    - Чтение состояний API сразу после изменений... получение данных API с помощью homestatus сразу после обновления API
    - Обновление состояний API через x секунд... Постоянное обновление данных API. (0 = нет обновления)
  - При желании также можно настроить службу уведомлений для получения определенных изменений статуса. Возможно

  Получать информационные сообщения, предупреждения или сообщения об ошибках. Для этого необходимо активировать опцию «Активировать/деактивировать уведомления» в «Информации для входа», а затем настроить параметры в меню «Уведомления».

  - Кроме того, можно ввести датчики двери/окна в систему датчиков и сохранить желаемое действие

Подробное описание доступно в виде вики (<https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki>).

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_login_de.png" alt="настройкиВход" width="70%"/>

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_api_de.png" alt="настройкиAPI" width="70%"/>

## Адаптер netatmo-energy для ioBroker
Текущие настройки извлекаются или изменяются с помощью API Netatmo-Energy. Адаптер использует запрос на выборку для передачи данных в Netatmo Energy API. Официальная документация API: <https://dev.netatmo.com/apidocumentation/energy>.

Адаптер создает собственное устройство «energyAPP», которое содержит «APIRequests» и «trigger».

### API-запросы
-homesdata... извлекает всю структуру установки Netatmo Energy (используя параметр NAPlug). Все остальные параметры для ручных запросов вы можете выбрать самостоятельно.
- homestatus ... определяет и передает состояние и техническую информацию назначенных вам клапанов. Если вам нужна информация о конкретном типе устройства, вы можете выбрать его самостоятельно.
- getroommeasure ... При этом вы получаете исторические данные о ваших комнатах. Результат вводится в поле «Ответ».
- getmeasure... Это даст вам исторические данные вашего котла. Результат вводится в поле «Ответ».
- setthermmode_schedule... Устанавливает режим работы установки Netatmo Energy на «Расписание» (по умолчанию)
- setthermmode_hq... устанавливает режим работы установки Netatmo Energy на "hq" (монитор мороза)
-setthermmode_away... Устанавливает режим работы установки Netatmo Energy на "в гостях" (не дома)
- switchhomeschedule ... Устанавливает «режим расписания» Netatmo Energy API. Все возможные режимы перечислены в канале "switchhomeschedule".

- createnewhomeschedule ... Устанавливает «режим расписания» API Netatmo Energy. Все возможные режимы перечислены в канале "switchhomeschedule".

- synchomeschedule ... Устанавливает графики нагрева вашего приложения Netatmo Energy. Чтобы изменить конкретный график нагрева, введите его. В противном случае текущий установленный будет изменен. Пожалуйста, введите необходимые параметры и инициируйте запрос расписания синхронизации.
- createnewhomeschedule ... Создает новый график отопления для вашего приложения Netatmo Energy. Пожалуйста, введите необходимые параметры и инициируйте запрос createnewhomeschedule.

Если для запроса API требуются параметры, их можно найти в соответствующем канале запроса в канале «параметры».

### Триггеры
- applychanges ... передает все ожидающие ручные изменения ваших клапанов в приложение Netatmo Energy
- refresh_structure... генерировать запросы homedata и homestatus один за другим

### Запросы на изменение
- setroomthermpoint ... в зависимости от ручных изменений в канале «настройка», изменения передаются в приложение Netatmo Energy. (либо мгновенно, либо автоматически - "немедленная передача изменений температуры").
- set_mode_to_home... Кнопка "set_mode_to_home" в канале "setting" устанавливает режим клапана "set_mode_to_home" на "home". Кроме того, запрос API инициируется немедленно для распространения изменения.

### Новости
- message_text ... все сообщения передаются в этой точке данных

### Состояние
- работает... здесь вы можете увидеть, выполняется ли в данный момент запрос API

### Структура запроса
<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP_measure.png" alt="настройкиВход" width="80%"/><img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP.png" alt="настройкиВход" width="80%"/>

## Создание структур
При запуске адаптера текущее состояние всего приложения Netatmo Energy обновляется и передается состояние всех клапанов и термостатов. В зависимости от общих настроек (чтение состояний API сразу после изменения) состояние клапанов и термостатов снова загружается сразу после изменения API (немедленно отправляется запрос исходного состояния).
Инициализация выполняется при запуске адаптера.

## Уведомления
Если вы активировали службу уведомлений в конфигурации адаптера, вам будут приходить различные сообщения.
Доступны следующие услуги.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_types_de.png" alt="уведомления" width="30%"/>

Пожалуйста, введите необходимые данные для подключения к выбранной вами службе уведомлений.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_de.png" alt="уведомления" width="70%"/>

## Новости
Здесь вы можете активировать определенные сообщения для определенных изменений статуса. Вы можете оставить сообщение, которое вы хотите. Они всегда передаются в точку данных "message_text".

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/messages_de.png" alt="Сообщения" width="70%"/>

Нажав кнопку «ОТПРАВИТЬ ПРОБНОЕ СООБЩЕНИЕ», можно протестировать службу сообщений. Перед тестом необходимо сохранить все настройки службы сообщений.

## Датчики
В таблице вы можете реагировать на атрибут «датчик окна/двери» для каждой комнаты. Состояние соответствующих оконных датчиков может инициировать действие при изменении, которое необходимо ввести здесь. Здесь можно выбрать все датчики типа bool. Это означает, что внешние датчики также могут быть интегрированы.

Могут быть инициированы следующие действия:

- Установленная температура
- Установить домашний режим
- Установить режим нагрева
  - Ледяной страж
  - Не дома
  - Нормальная операция
- Активировать план отопления
  - предлагаются все существующие планы отопления приложения Netatmo-Energy

Таким образом, температуру клапана можно установить при открытии или закрытии окна/двери. При вводе времени задержки (в секундах) сохраненное действие выполняется с задержкой. Если датчик срабатывания снова меняется в течение времени задержки, отложенные действия не выполняются.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/sensors_de.png" alt="датчики" width="70%"/>

## Вкладка администратора
На вкладке администратора вы можете отобразить все термостаты, мосты и клапаны вашего экземпляра netatmo energy. Там же можно обновить это представление или запустить полное обновление API. Кроме того, у вас есть возможность перенести изменения в облако и переключиться обратно в стандартный режим из возможного ручного режима.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/admintab_de.png" alt="вкладка администратора" width="70%"/>

На каждой плате отображаются значки состояния, показывающие текущее состояние термостата, клапанов и разъема. На второй странице термостата вы найдете различные API-запросы для установки режима термостата или плана отопления.

## Виджет
Виджет для VIS для отображения полного термостата. Вам нужно только ввести точку данных "SetTemp". Вся остальная информация определяется динамически из структуры «rooms».

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/valve_widget_de.png" alt="виджет" width="250px"/>

## Changelog

[Older changes](CHANGELOG_OLD.md)
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 2.4.5 (2023-04-06)

* (ioKlausi) Implementation of sensor abort functionality

### 2.4.4 (2023-04-03)

* (ioKlausi) Add delay time, to perform action

### 2.4.3 (2023-04-02)

* (ioKlausi) Default entries for sensor table

### 2.4.2 (2023-04-02)

* (ioKlausi) Bug fix for Sentry errors

### 2.4.1 (2023-04-02)

* (ioKlausi) Revice coding

### 2.4.0 (2023-04-01)

* (ioKlausi) Implement actions for window sensors

### 2.3.1 (2023-02-12)

* (ioKlausi) Redesign coding

## License

MIT License

Copyright (c) 2021-2023 ioKlausi <nii@gmx.at>

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