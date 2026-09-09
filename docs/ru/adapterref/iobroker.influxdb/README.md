---
BADGE-Number of Installations: http://iobroker.live/badges/influxdb-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.influxdb.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.influxdb/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/influxdb/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.influxdb.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.influxdb/README.md
title: без названия
hash: 9WTJqbXLcKHlLbAztT1yGR9As+jVoNassq2ilS5W+gU=
---
* * *

## <span id="Configuration">Configuration</span>
### <span id="Storage-Settings">Настройки базы данных</span>
Здесь вы вводите параметры, которые были заданы при создании базы данных InfluxDB, чтобы сервер ioBroker мог получить к ней доступ. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

#### Хозяин
Имя хоста или IP-адрес сервера базы данных.

#### Порт
Здесь вы указываете порт, через который можно получить доступ к базе данных на хосте.

Протокол
Это определяет, должен ли доступ к базе данных осуществляться по простому протоколу HTTP или по защищенному протоколу HTTPS.

#### Авторизоваться
Владелец базы данных (Пользователь), под чьим идентификатором должны быть записаны данные.

#### Пароль
Это пароль для указанного пользователя в базе данных SQL. В целях безопасности этот пароль необходимо ввести повторно в следующее поле.

#### Округлить до
Укажите количество десятичных знаков, с которыми должны храниться числа.

#### Сбор заданий по письму
Введенное здесь значение определяет, какой объем новых данных должен быть доступен перед повторной записью в базу данных. Чем выше значение, тем реже данные записываются в базу данных, но тем больше потеря данных в случае отказа адаптера. Значение 0 приводит к немедленной записи в базу данных. Следовательно, ввод «0» означает: немедленную запись в базу данных. Это увеличивает нагрузку на базу данных и адаптер.

#### Интервал записи
Если здесь указано значение, данные будут записаны в базу данных по истечении указанного времени в секундах, даже если количество точек данных, заданное в последнем пункте, еще не достигнуто.

### <span id="Default_Einstellungen_fuer_Zustaende">Настройки по умолчанию для штатов</span>
Эти настройки определяют значения, которые следует использовать в качестве значений по умолчанию при настройке регистрации отдельных точек данных. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

#### Запись только изменений
Если этот флажок установлен, для записи последовательных точек данных должны быть разные значения. Если датчик, например, несколько раз передает одно и то же значение температуры, это не будет записано; новая запись данных будет создана только при изменении значения.

#### Записать одинаковые значения
Если вы хотите периодически сохранять одни и те же (неизмененные) значения, вы можете указать временной интервал в секундах, с какой частотой это должно происходить. Соответственно, ввод 0 означает, что повторяющиеся значения сохраняться не должны.

#### Минимальное отклонение от последнего значения
Если постоянно изменяющиеся значения не должны сохраняться, здесь можно установить минимальное значение, до которого значение должно измениться, прежде чем будет сохранено новое значение. Это полезно, например, для розеток с измерителями мощности, где не каждое незначительное изменение должно регистрироваться. Соответственно, ввод 0 означает, что каждое значение должно быть сохранено.

Сохранить как
При необходимости здесь можно указать тип данных, в котором должны храниться данные. Это следует сделать только перед первой активацией.

[![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg)](../../../de/adapterref/iobroker.influxdb/img/iinfluxdb_oBroker_Adapter_SQL_objects_type.jpg) В InfluxDB тип данных определяется с первой записью и должен оставаться неизменным в дальнейшем.

#### Время хранения
Указывает, как долго следует хранить значения (бессрочно, 2 года, 1 год, ..., 1 день). [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

#### Время подавления дребезга контактов (мс)
Защита от чрезмерно частых изменений значения. Это минимальный интервал в миллисекундах, после которого значение не будет записано снова.

* * *

## <span id="Settings_for_data_points">Настройки для точек данных</span>
Настройки регистрируемых точек данных задаются на вкладке «Объекты» для соответствующей точки данных. [![Для этого выберите значок шестеренки для нужной точки данных в крайнем правом углу столбца. Откроется меню конфигурации: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Activated">Activated</span>
Включите логирование точки данных. Записывайте только изменения: значения сохраняются только при изменении значения точки данных. Это экономит место для хранения. Полезный подход - предварительно отфильтровать точки данных с помощью полей фильтра в заголовке таблицы, например, чтобы отфильтровать для логирования только точки данных "Состояние".

1. Отобразить представление в виде списка без группировки.
2. Введите фильтрующий(ие) термин(ы).
3. Выберите все отфильтрованные точки данных для записи в журнал.
1. Открывается меню настроек параметров журнала.
4. Включите ведение журнала для всех отфильтрованных точек данных одновременно.
1. Выберите дополнительные параметры, такие как «только изменения» и время хранения, одинаково для всех отфильтрованных точек данных.
5. Сохраните изменения.

* * *

## <span id="Bedienung">**Bedienung**</span>
Если в строке заголовка в разделе «История» выбрать «с» или «influxdb.0», будут отображаться только точки данных с логированием. [![[Изображение значка шестеренки](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg) Нажатие на значок шестеренки открывает записанные данные: [Изображение записи данных](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg) Данные отображаются в таблице на вкладке «Таблица». [![ioBroker_Adapter_rickshaw03](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_rickshaw03.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_rickshaw03.jpg) На вкладке «График» можно отобразить график тренда, если установлен адаптер Rickshaw.]

* * *

## Установка базы данных InfluxDB
Ниже приведено описание процедуры установки базы данных InfluxDB.

## Changelog
### 5.0.4 (2026-08-28)
* (@GermanBluefox) Fixed Grafana not finding the InfluxDB running next to it in Docker: the provisioned data source pointed at `iob_influxdb_<instance>`, while the container was named `iob_influxdb_<instance>_flux_data` because the compose file gave it a name of its own. Inside the shared network only the container name resolves, so the data source could not connect. The influx service uses the default name of the instance now - the name the data source and `testConnection()` both expect
* (@GermanBluefox) Fixed the port of that data source: it used the port published on the host, although Grafana reaches InfluxDB inside the docker network, where the container port 8086 applies. The data source broke as soon as the port was changed in the settings
* (@GermanBluefox) Fixed the Grafana container never being started when Grafana is enabled and InfluxDB is not: the plugin waits for the readiness signal of the adapter before it starts any container of the instance, and that signal was only sent when both were switched on. That state is reachable by switching InfluxDB off afterwards - the Grafana checkbox is hidden then, but its stored value stays
* (@GermanBluefox) The "automatic image update" setting of Grafana had no effect: the compose file never passed it on to the plugin
* (@GermanBluefox) **Existing installations with InfluxDB in Docker have to remove the old container once**, because it is renamed by the first fix: `docker rm -f iob_influxdb_<instance>_flux_data`. It still holds the published port, so the correctly named container cannot start next to it. The data is not affected - it lives in the volumes, which keep their names

### 5.0.3 (2026-08-27)
* (@GermanBluefox) Errors are logged with more detail: error code, `cause` and a driver-specific error name (`HttpError`, `ServiceNotAvailableError`) are shown now, and a nested error without a message no longer degrades to `{}` (same implementation as in the SQL adapter)
* (@GermanBluefox) A switched-off or unreachable InfluxDB no longer floods the log (and syslog): a connection error is now recognized by its error code - Node reports a failed TCP connect as an `AggregateError` with an empty message, which no check could match before - so the points are buffered and a reconnect is scheduled instead of retrying every single point. The repeated error is logged once and afterwards only once an hour
* (@GermanBluefox) `getHostsAvailable()` reports the real state again: it returned a hardcoded `1` since the TypeScript port, so every "host not available" check in the adapter was dead code. After a connection error the host is now taken out of rotation for a short backoff and values are buffered instead of being written - and logged - point by point
* (@GermanBluefox) A failing buffer flush inside the interval timer no longer produces an unhandled promise rejection, which terminates the adapter process on current Node.js versions
* (@GermanBluefox) `storeState` answers with an error again if a value cannot be stored (`null`, `NaN`, or a non-numeric value for a `Number` datapoint) instead of reporting `success: true` and silently discarding it; on the state-change path such a value is still logged only once per datapoint
* (@GermanBluefox) The warning about an `undefined` state value is logged only once per datapoint as well

### 5.0.2 (2026-08-26)
* (@GermanBluefox) Added the data browser to the configuration, so the stored values can be viewed, edited and deleted.
* (@GermanBluefox) The aggregation is used now from `@iobroker/aggregate` and is shared with the history and SQL adapters.
* (@joltcoke) Fixed average and total returning null for every interval that contains a null value: parseFloat(null) is NaN and poisoned the sum of the whole interval (thanks to @joltcoke, ioBroker/ioBroker.sql#526). As the result was NaN and not null, ignoreNull could not act on it either
* (@joltcoke) Fixed min returning a wrong value if the interval contains a null, minmax losing the minimum if the interval starts with a null, and percentile/quantile counting a null as 0

### 5.0.1 (2026-08-15)
* (@GermanBluefox) Completely refactored the code to TypeScript and ES6
* (@GermanBluefox) Added possibility to start docker containers directly from the adapter
* (mcm1957) Adapter requires admin >= 7.7.2 now
* (arteck) Fixed the connection handling for InfluxDB 1.x: the health check (ping) and the automatic reconnect were never started
* (arteck) Fixed the loss of buffered values if the writing was running while new values arrived or if the write failed
* (arteck) Values are no longer written twice if they are written directly (buffer size 0 or conflicting points)
* (arteck) State IDs and database names are now escaped in the queries
* (arteck) The password/token is no longer written into the log by the connection test
* (arteck) The settings "request timeout" and "validate SSL" are now used for InfluxDB 1.x too
* (arteck) Fixed the cache file name if more than one instance runs in the compact mode
* (arteck) Fixed the aggregation for `percentile: 100`/`quantile: 1` and the last value of `integralTotal`
* (bluefox) Fixed empty charts for the aggregation `onchange` ("raw" in e-charts): it was run through the interval aggregation and returned only `null` values
* (@GermanBluefox) Minimal node.js version is 22

### 4.0.3 (2024-05-16)
* (bluefox) Some packages were updated

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2015-2026 bluefox, apollon77

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.