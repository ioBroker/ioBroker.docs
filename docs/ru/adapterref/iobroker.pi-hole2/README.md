---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pi-hole2/README.md
title: ioBroker.pi-hole2
hash: HwWYE6ADMhcIgO1IwXByzAU2KYvRt4ReBuACjCGlhbY=
---
# IoBroker.pi-hole2
![Логотип](../../../en/adapterref/iobroker.pi-hole2/admin/pi-hole2.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.pi-hole2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pi-hole2.svg)
![Количество установок](https://iobroker.live/badges/pi-hole2-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/pi-hole2-stable.svg)
![nycrc config на GitHub](https://img.shields.io/nycrc/oweitman/iobroker.pi-hole2?preferredThreshold=functions)
![НПМ](https://nodei.co/npm/iobroker.pi-hole2.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.pi-hole2/workflows/Test%20and%20Release/badge.svg)

## Адаптер pi-hole2 для ioBroker
Управление установкой Pi-hole версии >= 6.
Получение информации из Pi-hole.
Запуск/остановка блокировки доменов.

Для Pi-hole версии < 6 используйте адаптер ioBroker.pi-hole)

ИСПОЛЬЗУЙТЕ НА СВОЙ СТРАХ И РИСК!!! ГАРАНТИЯ ОТВЕТСТВЕННОСТИ ЗА ПОВРЕЖДЕНИЯ И Т.Д. АБСОЛЮТНО НЕ ПРЕДОСТАВЛЯЕТСЯ!!!

Помощь или подсказки приветствуются.

Данный адаптер был переписан для Pi-Hole V6 на основе идеи Михаэля Шустера <development@unltd-networx.de>.

## Шаги
1. Установите адаптер.

2. Заполните поля администратора адаптера. Укажите URL-адрес устройства Pi-hole, пароль и обязательный интервал обновления значений Pi-hole (статистика обновления в iobroker). Во все поля обновления следует вводить только интервал от 1 секунды до 86400 секунд (24 часа).

## Функции
### Включение/отключение блокировки
Для включения/выключения блокировки используйте переключатель в разделе «Блокировка точек данных». Параметр BlockingTime используется только для автоматического включения блокировки при отключении. Включение происходит немедленно.

### Подробная сводка информации
Часть данных из раздела «Сводка» извлекается в точки данных в Data.Summary.
Эту функцию можно включить/отключить в конфигурации.
Точки данных подсвечиваются зеленым/красным цветом, когда функция включена/отключена.

### Подробная информация Версия
Часть данных из Version извлекается в точки данных в Data.Version.
Эту функцию можно включить/отключить в конфигурации.
Точки данных подсвечиваются зеленым/красным цветом, когда функция включена/отключена.

### Количество доменов на одного клиента в текущий день
Дополнительная статистика для каждого домена клиента считывает журнал запросов Pi-hole за текущий локальный календарный день. По умолчанию она обновляется раз в час. Запросы клиентов распределяются на 10 процентов этого интервала обновления, чтобы снизить нагрузку на Pi-hole. Процент можно настроить от 0 до 90. Адаптер рассчитывает индивидуальную паузу, исходя из текущего количества клиентов, поэтому сумма всех пауз никогда не может превысить интервал обновления.

Для каждого именованного клиента Pi-hole адаптер создает два состояния в формате JSON:

```text
pi-hole2.0.Clients.<clientName>.permitted
pi-hole2.0.Clients.<clientName>.blocked
pi-hole2.0.Clients.<clientName>.QueriesTotal
pi-hole2.0.Clients.<clientName>.QueriesBlocked
```

Каждое значение представляет собой массив JSON, например, `[{"domain":"example.org","count":12}]`. Домен встречается в каждом массиве только один раз, а записи сортируются по убыванию количества. Символы, небезопасные в идентификаторе объекта ioBroker (включая `.` и `#`), заменяются на `_`. Если два имени клиента приводят к одному и тому же идентификатору, числовой суффикс позволяет разделить их состояния.
`QueriesTotal` содержит абсолютное число всех запросов, прочитанных для клиента, а `QueriesBlocked` содержит абсолютное число заблокированных запросов. Имена соответствуют той же системе обозначений, что и подробные сводные данные.

Имена клиентов Pi-hole сопоставляются с их IP-адресами с использованием информации о клиентах, возвращаемой вместе с запросами. Клиент с именем хоста сохраняет очищенное имя хоста в качестве идентификатора объекта ioBroker, в то время как отображаемое имя объекта канала содержит его IP-адрес. Если Pi-hole сообщает только IP-адрес, очищенный IP-адрес используется как в качестве идентификатора объекта, так и в качестве отображаемого имени.

К этим данным также применяются уровни конфиденциальности Pi-hole и настройки Pi-hole `excludeClients`/`excludeDomains`. Адаптер только считывает журнал запросов; он не изменяет списки разрешенных или запрещенных запросов.

Дополнительная очистка неактивных клиентов выполняется один раз в локальные сутки после 00:05. Она рекурсивно удаляет клиентский канал только в том случае, если его объект канала не обновлялся с начала предыдущего локального календарного дня и его состояние `QueriesTotal` равно `0`. Это означает, что в течение всего предыдущего дня не было произведено ни одной записи. Временные метки в будущем не рассматриваются как активность. Новые клиентские каналы создаются только после того, как был найден хотя бы один запрос за текущий день.

### Общая функция SendTo
Функция sendTo используется для отправки команд на устройство Pi-hole.
Вы можете попробовать API на своем локальном компьютере.
Перейдите в [http://pihole/api/docs/#](http://pihole/api/docs/#), введите свой пароль и нажмите кнопку **Войти**.
Если домен `pihole` не работает, проверьте имя хоста вашего экземпляра Pi-hole в правом верхнем углу страницы панели управления.

#### Пример
```javascript
sendTo(
    'pi-hole2.0',
    'piholeapi',
    {
        method: 'GET',
        endpoint: '/history/clients',
        params: {
            N: 20,
        },
    },
    function (data) {
        console.log(data);
    },
);
```

Если вы хотите использовать метки времени в качестве параметров, обратите внимание, что pi-hole использует метки времени UNIX.
Они отсчитывают секунды с 1 января 1970 года. Метку времени JavaScript можно разделить на 1000:

```javascript
new Date('2025-02-01#12:34:56').getTime() / 1000;
```

## Визуализация
### Версии с виджетом jsontemplate для vis и vis2
Виджет jsontemplate можно установить, следуя инструкциям в документации: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

В настройках виджета введите следующую точку данных:

```javascript
pi-hole2.0.Version
```

и следующий шаблон:

```ejs
<style>
    p.pihole {
        margin: 0px;
    }
    p.pihole .name {
        display: inline-block;
        width: 100px;
    }
    p.pihole .version {
        display: inline-block;
        width: 50px;
    }
</style>
<p class="pihole"><span class="pihole name">core.local:</span><span class="pihole version"><%- data.version.core.local.version %></span></p>
<p class="pihole"><span class="pihole name">core.remote:</span><span class="pihole version"><%- data.version.core.remote.version %></span></p>
<p class="pihole"><span class="pihole name">web.local:</span><span class="pihole version"><%- data.version.web.local.version %></span></p>
<p class="pihole"><span class="pihole name">web.remote:</span><span class="pihole version"><%- data.version.web.remote.version %></span></p>
<p class="pihole"><span  class="pihole name">ftl.local:</span><span class="pihole version"><%- data.version.ftl.local.version %></span></p>
<p class="pihole"><span class="pihole name">ftl.remote:</span><span class="pihole version"><%- data.version.ftl.remote.version %></span></p>

```

### Сводка с виджетом jsontemplate для vis и vis2
Виджет jsontemplate можно установить, следуя инструкциям в документации: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

В настройках виджета введите следующую точку данных:

```javascript
pi-hole2.0.Summary
```

и следующий шаблон:

```ejs
<style>
    p.pihole {
        margin: 0px;
    }
    p.pihole .name {
        display: inline-block;
        width: 150px;
    }
    p.pihole .number {
        display: inline-block;
        width: 70px;
        text-align: right;
    }
</style>
<p class="pihole"><span class="pihole name">queries.total:</span><span class="pihole number"><%- data.queries.total %></span></p>
<p class="pihole"><span class="pihole name">queries.blocked:</span><span class="pihole number"><%- data.queries.blocked %></span></p>
<p class="pihole"><span class="pihole name">clients.active:</span><span class="pihole number"><%- data.clients.active %></span></p>
<p class="pihole"><span class="pihole name">clients.total:</span><span class="pihole number"><%- data.clients.total %></span></p>

```

## Todo Существующие функции
- ~~вход~~
- ~~интервал времени~~
- ~~активировать / деактивировать блокировку~~
- ~~интервал времени активации/деактивации~~
- ~~версия~~
- ~~версии~~
- ~~краткое содержание~~
- тип
- summaryRaw ? dont know details
- Лучшие товары? Подробности неизвестны.
- getQuerySources? Подробности неизвестны.
- Данные о сверхурочном времени (10 минут)? Подробности неизвестны.
- getForwardDestinations? Подробности неизвестны.

## Задачи: Новые функции
- ~~Функции sendTo для управления и получения информации с помощью параметров~~

## Не реализованные или не запланированные функции
- 2FA
- Протокол HTTPS (возможно, но не тестировалось)

## Поиск неисправностей
### ВНИМАНИЕ: Свободных мест в API нет
Перейдите в раздел установки Pi-hole и удалите в **Настройки / Веб-интерфейс / API / Текущие активные сессии** все сессии с пользовательским агентом iobroker.pi-hole2.
Вы слишком часто перезапускаете адаптер, и каждый раз запрашивается новая сессия.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.5.0 (2026-08-23)

- Optional cleanup of clients if no update took place the previous day and QueriesTotal is 0.
- Unnamed clients with IP addresses have been added. Only clients that have performed at least one DNS query
  during the day are added.

### 1.4.2 (2026-08-22)

- fix pihole session handling

### 1.4.1 (2026-08-21)

- An issue with the Pi-hole API prevented all data from being retrieved; this has been fixed.

### 1.4.0 (2026-08-21)

- Added QueriesTotal and QueriesBlocked as counts per client.
- move coverage dir to docs/coverage.
- fix setTimeout and setObject

### 1.3.0 (2026-08-20)

- Added configurable per-client daily domain statistics for permitted and blocked queries, including safe request distribution and JSON datapoints
  sorted by query count.

### 1.2.0 (2026-06-10)

- fix errors
- add test and coverage
- improve and harden error handling

### 1.1.1 (2025-07-25)

- fix translation

### 1.1.0 (2025-07-24)

- add update indicators for different pihole components in the Data/Versions datapoints

### 1.0.0 (2025-07-16)

- If the adapter was already installed, please remove all existing data points of the adapter and restart the adapter.
- first beta channel release

### 0.4.2 (2025-07-16)

- set rejectUnauthorized to false
- remove some double jsdoc blocks
- fixed comments from adapter review

    remove unload event, create datapoint "Data", adjust state roles, check and limit refresh input parameters, fix roles

### 0.4.1 (2025-06-27)

- fix repochecker issues
- update packages
- remove history datapoint
- add jsdoc
- fix Blockingtime enabling
- fix datapoint coloring

### 0.4.0 (2025-06-25)

- Make extraction of detail values ​​for version/summary deactivatable

### 0.3.0 (2025-06-25)

- add translation files
- rework refresh logic aligned with pihole
- encrypt password (Password must be entered again )
- add detailed datapoints for Summary and Version for selected data

### 0.2.3 (2025-06-25)

- small documentation bugfix
- adjust user agent and add trouble shooting info
- add visualization example for versions
- add visualization example for summary

### 0.2.2 (2025-06-24)

- fix github action file

### 0.2.1 (2025-06-24)

- enable NPM deploy

### 0.2.0 (2025-06-24)

- (oweitman) first npm release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 oweitman <oweitman@gmx.de>

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