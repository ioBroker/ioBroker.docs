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
hash: zOGPNkL3p1NrpCT6J5Fo4IjRP6vg1rtsnUPT9iG43Pc=
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
Настройки регистрируемых точек данных задаются на вкладке «Объекты» для соответствующей точки данных. [![Для этого выберите значок шестеренки для нужной точки данных в крайнем правом углу столбца. После этого откроется меню конфигурации: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Activated">Activated</span>
Включите логирование точки данных. Записывайте только изменения: значения сохраняются только при изменении значения точки данных. Это экономит место для хранения. Полезный подход - предварительно отфильтровать точки данных с помощью полей фильтра в заголовке таблицы, например, чтобы отфильтровать для логирования только точки данных "Состояние".

1. Отобразить представление в виде списка без группировки.
2. Введите фильтрующий(ие) термин(ы).
3. Выберите все отфильтрованные точки данных для записи в журнал.
1. Открывается меню настроек параметров журнала.
4. Включите ведение журнала для всех отфильтрованных точек данных одновременно.
1. Выберите дополнительные параметры, такие как «только изменения» и время хранения, одинаково для всех отфильтрованных точек данных.
5. Сохраните изменения.

### <span id="Custom_Tags">Пользовательские теги</span>
Каждая точка данных может иметь дополнительные фиксированные теги InfluxDB. Они вводятся в настройках точки данных в разделе «Пользовательские теги» в виде списка пар «имя/значение» и записываются вместе с каждым значением этой точки данных - как для InfluxDB 1.x, так и для 2.x, независимо от параметра «Сохранять метаданные как теги вместо полей».

Это позволяет выбирать и группировать значения различных точек данных в соответствии с их смыслом, а не идентификатором, например, все точки данных кухни с идентификатором `room=kitchen` и все датчики температуры с идентификатором `type=temperature`. Затем вы можете соответствующим образом отфильтровать или сгруппировать их в Grafana.

```
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._field == "value" and r.type == "temperature")
  |> group(columns: ["room"])
```

Пожалуйста, обрати внимание:

Имена `value`, `q`, `ack`, `from` и `time`, а также имена, начинающиеся с `_`, зарезервированы и не могут быть использованы. Строки без имени или значения игнорируются; игнорируемые теги регистрируются как предупреждение.
InfluxDB идентифицирует ряд данных на основе измерения и всех его тегов. Таким образом, изменение тегов точки данных запускает новый ряд; ранее записанные значения сохраняют свои старые теги. В InfluxDB 2.x вызов `getHistory` за период, в течение которого были изменены теги, агрегирует каждый ряд данных отдельно - таким образом, такой период может содержать два значения на интервал. Лучше всего устанавливать теги до начала логирования.
Каждая точка данных будет по-прежнему записываться в собственное измерение (с собственным идентификатором или псевдонимом). Использование одного и того же псевдонима для нескольких активных точек данных не поддерживается.

Теги также можно установить с помощью JavaScript, используя сообщение `enableHistory`:

```javascript
sendTo('influxdb.0', 'enableHistory', {
    id: 'hm-rpc.0.ABC123.1.TEMPERATURE',
    options: {
        customTags: [
            { name: 'room', value: 'kitchen' },
            { name: 'type', value: 'temperature' },
        ],
    },
});
```

* * *

## <span id="Statistics">Статистика и очистка</span>
Вкладка **Статистика** в конфигурации экземпляра отображает все точки данных, содержащиеся в базе данных, с указанием количества значений, самых старых и самых новых значений, количества рядов и статуса:

| Статус | Значение |
| --- | --- |
| Ведется логирование | Объект существует, и этот экземпляр регистрирует его |
| Выход из системы | Объект по-прежнему существует, но ведение журнала отключено - история по-прежнему доступна |
| Объект удален | Объект был удален в ioBroker; его история больше недоступна. |

В отношении этих цифр важны два момента:

- **Размер для каждой точки данных не указан.** InfluxDB его не предоставляет ни в версии 1.x (команды `SHOW STATS` и `SHOW SHARDS` знают только движок и шарды), ни в версии 2.x (использование диска отслеживается для каждого сегмента). Вместо этого отображается количество **серий**: это определяет требования к хранению индекса, а пользовательские теги обычно приводят к его непреднамеренному увеличению.
**Подсчет представляет собой полное сканирование.** InfluxDB не имеет собственного счетчика строк, поэтому она фактически считывает значения за сканируемый период времени. В случае базы данных, содержащей данные за несколько лет, это занимает время - выбор диапазона дат над таблицей ограничивает сканирование, если общий подсчет не требуется.

Процесс очистки удаляет сохраненные значения точек данных, которые больше не регистрируются. **Ничего не удаляется без подтверждения**: в диалоговом окне сначала отображается, что будет удалено при подтвержденном запуске. По умолчанию выбираются только объекты, которые больше не существуют в ioBroker. Точки данных с просто отключенной регистрацией включаются только в том случае, если они явно выбраны - их история по-прежнему доступна и часто необходима. Точка данных, которая в данный момент регистрируется, никогда не выбирается.

Доступ к тем же данным можно получить и через JavaScript, используя сообщения `getDpStatistics` и `cleanupOrphaned`, см. [README](https://github.com/ioBroker/ioBroker.influxdb/blob/master/README.md#statistics-and-cleanup).

* * *

## <span id="Bedienung">**Bedienung**</span>
Если в строке заголовка в разделе «История» выбрать «с» или «influxdb.0», будут отображаться только точки данных с логированием. [![[Изображение значка шестеренки](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg) Нажатие на значок шестеренки открывает записанные данные: [Изображение записи данных](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg) Данные отображаются в таблице на вкладке «Таблица». [![ioBroker_Adapter_rickshaw03](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_rickshaw03.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_rickshaw03.jpg) На вкладке «График» можно отобразить график тренда, если установлен адаптер Rickshaw.]

* * *

## Установка базы данных InfluxDB
Ниже приведено описание процедуры установки базы данных InfluxDB.

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