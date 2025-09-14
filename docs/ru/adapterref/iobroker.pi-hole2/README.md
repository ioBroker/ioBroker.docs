---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pi-hole2/README.md
title: ioBroker.pi-hole2
hash: dC/XCoMH5f/nSE0e0yLWYEOwmiduSLjsIHPM0wcq25Q=
---
# IoBroker.pi-hole2
![Логотип](../../../en/adapterref/iobroker.pi-hole2/admin/pi-hole2.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.pi-hole2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pi-hole2.svg)
![Количество установок](https://iobroker.live/badges/pi-hole2-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/pi-hole2-stable.svg)
![Конфигурация nycrc на GitHub](https://img.shields.io/nycrc/oweitman/iobroker.pi-hole2?preferredThreshold=functions)
![НПМ](https://nodei.co/npm/iobroker.pi-hole2.png?downloads=true)

**Тесты:** ![Тестирование и выпуск](https://github.com/oweitman/ioBroker.pi-hole2/workflows/Test%20and%20Release/badge.svg)

## Адаптер pi-hole2 для ioBroker
Управление установкой pi-hole версии >=6.
Получение информации от pi-hole.
Включение/выключение блокировки доменов.
(для pi-hole версии <6 используйте адаптер ioBroker.pi-hole)

ИСПОЛЬЗУЙТЕ НА СВОЙ СТРАХ И РИСК!!! АБСОЛЮТНО НИКАКИХ ГАРАНТИЙ НА УЩЕРБ И Т.П.!!!

Помощь и подсказки приветствуются.

Этот адаптер был переписан для pi-hole V6 на основе идеи Михаэля Шустера <development@unltd-networx.de>.

## Шаги
1. Установите адаптер.

2. Заполните поля адаптера-администратора. Укажите URL-адрес устройства pi-hole, пароль и (обязательно) интервал обновления значений pi-hole (статистика обновления в iobroker). Ввод данных во все поля обновления возможен только в диапазоне от 1 до 86400 секунд (24 часа).

## Функции
### Включить/отключить блокировку
Чтобы включить/отключить блокировку, используйте переключатель в разделе «Блокировка точек данных». Параметр BlockingTime используется только для отключения блокировки и её автоматического повторного включения. Включение происходит немедленно.

### Подробная информация Резюме
Некоторые данные из Summary извлекаются в точки данных в Data.Summary.
Это можно включить/отключить в настройках.
Точки данных подсвечиваются зелёным/красным цветом, когда функция включена/отключена.

### Подробная информация Версия
Некоторые данные из Version извлекаются в точки данных в Data.Version.
Это можно включить/отключить в настройках.
Точки данных подсвечиваются зелёным/красным цветом, когда функция включена/отключена.

### Общая функция SendTo
Функция sendTo используется для отправки команд устройству pi-hole.
Вы можете протестировать API на локальном компьютере.
Перейдите в [http://pihole/api/docs/#](http://pihole/api/docs/#), введите пароль и нажмите кнопку **Войти**.
Если домен `pihole` не работает, проверьте имя хоста вашего экземпляра pi-hole в правом верхнем углу страницы панели управления.

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

Если вы хотите использовать временные метки в качестве параметров, обратите внимание, что pi-hole использует временные метки UNIX.
Они отсчитывают секунды с 1 января 1970 года. Временную метку JavaScript можно разделить на 1000:

```javascript
new Date('2025-02-01#12:34:56').getTime() / 1000;
```

## Визуализация
### Версии с виджетом jsontemplate для vis и vis2
Виджет jsontemplate можно установить с помощью следующей документации: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

В конфигурации виджета введите следующую точку данных:

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
Виджет jsontemplate можно установить с помощью следующей документации: <https://forum.iobroker.net/topic/31521/test-widget-json-template>

В конфигурации виджета введите следующую точку данных:

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
- ~~логин~~
- ~~интервал времени~~
- ~~активировать / деактивировать блокировку~~
- ~~активация/деактивация временного интервала~~
- ~~версия~~
- ~~версии~~
- ~~резюме~~
- тип
- резюмеСырое? Подробности не знаю
- topItems ? не знаю подробностей
- getQuerySources ? подробностей не знаю
- overTimeData10mins ? подробности не знаю
- getForwardDestinations ? не знаю подробностей

## Todo Новые функции
- ~~sendTo Функции для управления и получения информации с параметрами~~

## Не реализованные или не запланированные функции
- 2FA
- протокол https (возможно, но не протестировано)

## Поиск неисправностей
### ВНИМАНИЕ: Нет доступных бесплатных мест API
Перейдите в папку с установленным pi-hole и удалите в разделе **Настройки/Веб-интерфейс/API/Текущие активные сеансы** все сеансы с пользовательским агентом iobroker.pi-hole2.
Вы слишком часто перезапускаете адаптер при каждом запросе нового сеанса.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

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

## License

MIT License

Copyright (c) 2025 oweitman <oweitman@gmx.de>

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