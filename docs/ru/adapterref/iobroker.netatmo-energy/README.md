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
title: ioBroker.netатмо-энергия
hash: QgPU6VWQpgxU3o6yrwqVOGok3fynYGHA/iFryvaHrlE=
---
![логотип](https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/admin/netatmo-energy.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.netatmo-energy.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.netatmo-energy.svg)
![Количество установок (последние)](http://iobroker.live/badges/netatmo-energy-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/netatmo-energy-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/Homemade-Disaster/ioBroker.netatmo-energy/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.netatmo-energy.png?downloads=true)

# IoBroker.netatmo-energy
**Тесты:** ![тестирование и выпуск](https://github.com/Homemade-Disaster/ioBroker.netatmo-energy/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для отправки автоматических отчетов о сбоях и ошибках программного кода разработчикам.** Дополнительные сведения и информацию о том, как отключить эту функцию, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry доступны, начиная с js-controller 3.0.

## Требования и конфигурация
Учетная запись оборудования Netatmo Energy (термостат, клапаны) в облаке Netatmo

- Адаптер работает с admin => 3 и nodejs >= 12
- Создайте свою учетную запись https://auth.netatmo.com/de-de/access/signup
- Вход в API https://dev.netatmo.com/apidocumentation/energy
- Создайте собственное приложение, щелкнув свою учетную запись (вверху/слева) и нажав кнопку «Создать».
  - Заполните форму и сохраните ее
  - Применить полученный client-ID и client-secret-ID к конфигурации адаптера
  - Перейдите к документации по API https://dev.netatmo.com/apidocumentation/energy.
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

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/settings_login_de.png" alt="настройкиВход" width="70%"/>

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/settings_api_de.png" alt="настройкиAPI" width="70%"/>

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
* setroomthermpoint ... в зависимости от ручных изменений в канале «настройка», изменения передаются в приложение Netatmo Energy. (либо мгновенно, либо автоматически - «немедленная передача изменений температуры»)

### Состояние
* работает ... здесь вы можете увидеть, выполняется ли в данный момент запрос API

### Структура запроса
<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/EnergyAPP_measure.png" alt="настройкиВход" width="80%"/><img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/EnergyAPP.png" alt="настройкиВход" width="80%"/>

## Создание структур
При запуске адаптера обновляется текущее состояние всего приложения Netatmo Energy и передается состояние всех клапанов и термостатов. В зависимости от общих настроек (чтение состояний API сразу после изменения) состояние клапанов и термостатов снова загружается сразу после изменения API (немедленно отправляется запрос исходного состояния).
Инициализация выполняется при запуске адаптера.

## Уведомления
Если вы активировали службу уведомлений в конфигурации адаптера, вам будут приходить различные сообщения.
Доступны следующие услуги.

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/notification_types_de.png" alt="настройкиAPI" width="30%"/>

    Пожалуйста, введите необходимые данные для подключения к выбранной вами службе уведомлений.

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/notification_de.png" alt="настройкиAPI" width="70%"/>

## Виджет
Виджет для VIS для отображения полного термостата. Вам нужно только ввести точку данных "SetTemp". Вся остальная информация определяется динамически из структуры "rooms".

<img src="https://raw.githubusercontent.com/Homemade-Disaster/ioBroker.netatmo-energy/master/docs/img/valve_widget_de.png" alt="настройкиAPI" width="250px"/>

## Список изменений
<!-- Заполнитель для следующей версии (в начале строки):

### **ВЫПОЛНЯЕТСЯ** -->
### 1.0.2 (27 февраля 2022 г.)
* (ioKlausi) Изменено кодирование

### 1.0.1 (27 февраля 2022 г.)
* (ioKlausi) Изменено кодирование

### 1.0.0 (25 февраля 2022 г.)
* Опубликовать (ioKlausi) основную версию

### 0.2.4 (13 февраля 2022 г.)
* Добавлен (ioKlausi) скрипт релиза

### 0.2.3
* Добавлен (ioKlausi) AbortController

### 0.2.2
* (ioKlausi) добавлены переводы и протестирован компактный режим

### 0.2.1
* (ioKlausi) Настроено создание объектов

### 0.2.0
* (ioKlausi) проверка совместимости для js-контроллера 4.0

### 00.01.20
* (ioKlausi) исправления ошибок (ошибка часового)

### 01.01.19
* (ioKlausi) Адаптер завершен, вики создана

### 01.01.18
* (ioKlausi) Созданы отдельные иконки для сигналов виджета

### 01.01.17
* (ioKlausi) Виджет настроен на открытое окно, исправление ошибки setroomthermpoint

### 01.01.16
* (ioKlausi) исправления ошибок

### 01.01.15
* (ioKlausi) Добавлен собственный виджет для термостата

### 01.01.14
* Добавлен (ioKlausi) помощник по уведомлениям

### 0.1.13
* (ioKlausi) Изменена проверка действительности токена

### 01.01.12
* (ioKlausi) Пересмотреть кодировку, включить часовой, проверить достоверность токена

### 01.01.11
* (ioKlausi) изменен тип адаптера

### 01.01.10
* Добавлены (ioKlausi) API-запросы getmeasure и getroommeasure для ручного использования

### 0.1.9
* Добавлено (ioKlausi) расписание запросов API для ручного использования

### 0.1.8
* (ioKlausi) Добавлен запрос API switchhomeschedule и все возможные запросы

### 0.1.7
* (ioKlausi) Пересмотреть роли состояний

### 0.1.6
* (ioKlausi) Инициировать запрос домашних состояний с использованием таймера и переработанный экран конфигурации

### 0.1.5
* (ioKlausi) добавлено шифрование/дешифрование пароля

### 0.1.4
* (ioKlausi) Создана новая версия NPM

### 0.1.3
* (ioKlausi) Программа исправлена

### 0.1.2
* (ioKlausi) «SpecialRequests» изменено на устройство «energyAPP».

### 0.1.1
* Активировать (ioKlausi) домашний статус API сразу после изменения

### 0.1.0
* (ioKlausi) Исправление ошибок и выпуск адаптера

### 0.0.6
* (ioKlausi) Значения по умолчанию для последних установленных

### 0.0.5
* (ioKlausi) изменена логика ACK

### 0.0.4
* (ioKlausi) Изменение создания папки API

### 0.0.3
* (ioKlausi) Перевод и исправления ошибок

### 0.0.2
* (ioKlausi) API-запросы и структура установлены

### 0.0.1
* (ioKlausi) Первоначальный выпуск

создание адаптера

## Лицензия
лицензия Массачусетского технологического института

Авторское право (c) 2022 ioKlausi <nii@gmx.at>

Настоящим предоставляется бесплатное разрешение любому лицу, получившему копию этого программного обеспечения и связанных с ним файлов документации («Программное обеспечение»), использовать, копировать, изменять, объединять Программное обеспечение без ограничений, в том числе без ограничения прав, публиковать , распространять, сублицензировать и/или продавать копии Программного обеспечения и разрешать установку Программного обеспечения лицами, для которых оно предназначено, при соблюдении следующих условий:

Вышеупомянутое уведомление об авторских правах и это уведомление о разрешении должны быть включены в любую включенную копию или существенную часть Программного обеспечения.

ПРОГРАММНОЕ ОБЕСПЕЧЕНИЕ ПРЕДОСТАВЛЯЕТСЯ «КАК ЕСТЬ» БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ ЯВНЫХ, ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ, ПОМИМО ПРОЧЕГО, ГАРАНТИИ КОММЕРЧЕСКОЙ ПРИГОДНОСТИ, ПРИГОДНОСТИ ДЛЯ ОПРЕДЕЛЕННОЙ ЦЕЛИ И НЕНАРУШЕНИЯ ПРАВ. НИ ПРИ КАКИХ ОБСТОЯТЕЛЬСТВАХ АВТОРЫ ИЛИ ОБЛАДАТЕЛИ АВТОРСКИМ ПРАВОМ НЕ НЕСУТ ОТВЕТСТВЕННОСТИ ЗА ЛЮБЫЕ ПРЕТЕНЗИИ, УЩЕРБ ИЛИ ИНУЮ ОТВЕТСТВЕННОСТЬ, БУДУТ СВЯЗАННЫЕ С ДОГОВОРОМ, ПРАВОМ ИЛИ ИНЫМ ОБРАЗОМ, ВОЗНИКАЮЩИЕ В СВЯЗИ С ПРОГРАММНЫМ ОБЕСПЕЧЕНИЕМ, ИСПОЛЬЗОВАНИЕМ ИЛИ ДРУГИМИ ДЕЙСТВИЯМИ В ПРОГРАММНОМ ОБЕСПЕЧЕНИИ.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.2 (2022-02-27)
* (ioKlausi) Redesign coding

### 1.0.1 (2022-02-27)
* (ioKlausi) Redesign coding

### 1.0.0 (2022-02-25)
* (ioKlausi) Create major version

### 0.2.4 (2022-02-13)
* (ioKlausi) Release Script added

### 0.2.3
* (ioKlausi) AbortController added

### 0.2.2
* (ioKlausi) Übersetzungen hinzugefügt & Kompaktmodus getestet

### 0.2.1
* (ioKlausi) Creation of states adapted

### 0.2.0
* (ioKlausi) Compatibility check to js-controller 4.0

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