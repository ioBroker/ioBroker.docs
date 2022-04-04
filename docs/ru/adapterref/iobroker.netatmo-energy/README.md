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
hash: EashoI8oUHPC/tEwLfM39+6cGSh44aMa3YEu4XWQ2XY=
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

- Адаптер работает с admin => 3 и nodejs >= 12
- Создайте свою учетную запись https://auth.netatmo.com/de-de/access/signup
- Вход в API https://dev.netatmo.com/apidocumentation/energy
- Создайте собственное приложение, щелкнув свою учетную запись (вверху/слева) и нажав кнопку «Создать».
  - Заполните форму и сохраните ее
  - Применить полученный client-ID и client-secret-ID к конфигурации адаптера
  - Перейти к документации по API https://dev.netatmo.com/apidocumentation/energy
  - Выберите "ПОЛУЧИТЬ домашние данные" - "Попробовать" - "ВЫПОЛНИТЬ / HOMESDATA"
    - вы получите ответ, в котором найдете свой домашний ID
    - Применить их к конфигурации адаптера
  - введите имя пользователя и пароль Netatmo Cloud в конфигурации адаптера
  - Выберите нужные параметры в "Настройках API" и сохраните конфигурацию адаптера
    - Немедленная передача изменений температуры... немедленная передача изменений температуры в состоянии "SetTemp" в API
    - Чтение состояний API сразу после изменений... получение данных API с помощью homestatus сразу после обновления API
    - Обновление состояний API через x секунд... Постоянное обновление данных API. (0 = нет обновления)
  - При желании также можно настроить службу уведомлений для получения определенных изменений статуса. Можно получать информационные сообщения, предупреждения или сообщения об ошибках. Для этого необходимо активировать опцию «Активировать/деактивировать уведомления» в «Информации для входа», а затем настроить параметры в меню «Уведомления».

Подробное описание доступно в виде вики (https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/wiki).

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_login_de.png" alt="настройкиВход" width="70%"/>

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/settings_api_de.png" alt="настройкиAPI" width="70%"/>

## Адаптер netatmo-energy для ioBroker
Текущие настройки извлекаются или изменяются с помощью API Netatmo-Energy. Адаптер использует запрос на выборку для передачи данных в Netatmo Energy API. Официальная документация API: https://dev.netatmo.com/apidocumentation/energy.

Адаптер создает свое собственное устройство «energyAPP», которое содержит «APIRequests» и «trigger».

### API-запросы
* homedata ... извлекает всю структуру установки Netatmo Energy (используя параметр NAPlug). Все остальные параметры для ручных запросов вы можете выбрать самостоятельно.
* homestatus ... определяет и передает состояние и техническую информацию назначенных вам клапанов. Если вам нужна информация о конкретном типе устройства, вы можете выбрать его самостоятельно.
* getroommeasure ... При этом вы получаете исторические данные о ваших комнатах. Результат вводится в поле «Ответ».
* getmeasure ... Это даст вам исторические данные вашего котла. Результат вводится в поле «Ответ».
* setthermmode_schedule ... Устанавливает рабочий режим установки Netatmo Energy на «Расписание» (по умолчанию)
* setthermmode_hq ... устанавливает режим работы установки Netatmo Energy на "hq" (защита от замерзания)
* setthermmode_away … Устанавливает режим работы установки Netatmo Energy на «в гостях» (не дома)
* switchhomeschedule ... Устанавливает «режим расписания» API Netatmo Energy. Все возможные режимы перечислены в канале "switchhomeschedule".
* synchomeschedule ... Устанавливает графики нагрева вашего приложения Netatmo Energy. Чтобы изменить конкретный график отопления, введите его. В противном случае текущий установленный будет изменен. Введите необходимые параметры и инициируйте запрос расписания синхронизации.

Если для запроса API требуются параметры, их можно найти в соответствующем канале запроса в канале «параметры».

### Триггеры
* applychanges ... передает все ожидающие ручные изменения ваших клапанов в приложение Netatmo Energy
* refresh_structure ... генерировать запросы homedata и homestatus один за другим

### Запросы на изменение
* setroomthermpoint ... в зависимости от ручных изменений в канале «настройка», изменения передаются в приложение Netatmo Energy. (либо мгновенно, либо автоматически - "немедленная передача изменений температуры").
* set_mode_to_home ... Кнопка "set_mode_to_home" в канале "setting" устанавливает режим клапана "set_mode_to_home" на "home". Кроме того, запрос API инициируется немедленно для передачи изменения.

### Состояние
* работает ... здесь вы можете увидеть, выполняется ли в данный момент запрос API

### Структура запроса
<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP_measure.png" alt="настройкиВход" width="80%"/><img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/EnergyAPP.png" alt="настройкиВход" width="80%"/>

## Создание структур
При запуске адаптера обновляется текущее состояние всего приложения Netatmo Energy и передается состояние всех клапанов и термостатов. В зависимости от общих настроек (чтение состояний API сразу после изменения) состояние клапанов и термостатов снова загружается сразу после изменения API (немедленно отправляется запрос исходного состояния).
Инициализация выполняется при запуске адаптера.

## Уведомления
Если вы активировали службу уведомлений в конфигурации адаптера, вам будут приходить различные сообщения.
Доступны следующие услуги.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_types_de.png" alt="настройкиAPI" width="30%"/>

Пожалуйста, введите необходимые данные для подключения к выбранной вами службе уведомлений.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/notification_de.png" alt="настройкиAPI" width="70%"/>

## Сообщения
Здесь вы можете активировать определенные сообщения для определенных изменений статуса. Вы можете оставить сообщение, которое вы хотите.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/messages_de.png" alt="настройкиAPI" width="70%"/>

## Вкладка администратора
На вкладке администратора вы можете отобразить все термостаты, мосты и клапаны вашего экземпляра netatmo energy. Там же можно обновить это представление или запустить полное обновление API. Кроме того, у вас есть возможность перенести изменения в облако и переключиться обратно в стандартный режим из возможного ручного режима.

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/admintab_de.png" alt="вкладка администратора" width="70%"/>

## Виджет
Виджет для VIS для отображения полного термостата. Вам нужно только ввести точку данных "SetTemp". Вся остальная информация определяется динамически из структуры "rooms".

<img src="https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/raw/master/docs/img/valve_widget_de.png" alt="настройкиAPI" width="250px"/>

## Changelog
[Older changes](CHANGELOG_OLD.md)
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.2.2 (2022-04-03)
* (ioKlausi) Added a slider to each valve to change the temperature and added some API requests to admin tab to transfer changes to the cloud 

### 1.2.1 (2022-04-01)
* (ioKlausi) Messages for specific events created

### 1.2.0 (2022-03-31)
* (ioKlausi) Close message functionality added on admin tab

### 1.1.7 (2022-03-24)
* (ioKlausi) Bridge information added to each card

### 1.1.6 (2022-03-24)
* (ioKlausi) Rework README.md & WIKI

### 1.1.5 (2022-03-23)
* (ioKlausi) Refresh functionality added to admin tab

### 1.1.4 (2022-03-20)
* (ioKlausi) Plug added to admin tab 

### 1.1.3 (2022-03-19)
* (ioKlausi) Admin tab for valves added 

### 1.1.2 (2022-03-06)
* (ioKlausi) Bugfix Easy Admin 

### 1.1.1 (2022-03-06)
* (ioKlausi) Bugfix setroomthermpoint 

### 1.1.0 (2022-03-06)
* (ioKlausi) setroomthermpoint - Trigger for valve-mode implemented

### 1.0.4 (2022-03-05)
* (ioKlausi) Bugfix - send message

### 1.0.3 (2022-03-05)
* (ioKlausi) Transfered Customizing-UI to json

### 1.0.2 (2022-02-27)
* (ioKlausi) Redesign coding

### 1.0.0 (2022-02-25)
* (ioKlausi) Create major version

## License
MIT License

Copyright (c) 2022 ioKlausi <nii@gmx.at>

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