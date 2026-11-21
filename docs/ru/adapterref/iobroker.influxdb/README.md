---
BADGE-Number of Installations: https://iobroker.live/badges/influxdb-stable.svg
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.influxdb.svg
BADGE-Test and Release: https://github.com/ioBroker/ioBroker.influxdb/workflows/Test%20and%20Release/badge.svg
BADGE-Translation status: https://weblate.iobroker.net/widgets/adapters/-/influxdb/svg-badge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.influxdb.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.influxdb/README.md
title: без названия
hash: QP0ayIMxTy3HP2EPn3weOTVeeIlXXKwH4/c1Lp+QqsM=
---
* * *

## <span id="Configuration">Configuration</span>
### <span id="Storage-Settings">Настройки базы данных</span>
Здесь вы вводите параметры, которые были заданы при создании базы данных InfluxDB, чтобы сервер ioBroker мог получить доступ к этой базе данных. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_Konfig.jpg)

#### Хозяин
Имя хоста или IP-адрес сервера базы данных.

#### Порт
Здесь вы указываете порт, через который можно получить доступ к базе данных на хосте.

Протокол
Это определяет, должен ли доступ к базе данных осуществляться по простому протоколу HTTP или по защищенному протоколу HTTPS.

#### Авторизоваться
Владелец базы данных (пользователь), под чьим идентификатором должны быть записаны данные. Только для InfluxDB 1.x; для InfluxDB 2.x и 3.x вход осуществляется с помощью токена.

#### Пароль
Это пароль для указанного пользователя в базе данных SQL. В целях безопасности этот пароль необходимо ввести повторно в следующее поле. Применимо только к InfluxDB 1.x.

#### InfluxDB 3.x
Выберите версию базы данных "3.x", введите хост, порт (по умолчанию `8181`), токен и имя базы данных. InfluxDB 3 не может удалять отдельные значения или временной диапазон и не сообщает количество серий. В экспертных настройках параметр "Ожидание сохранения каждого значения базой данных" заставляет отдельные значения ожидать записи в журнал предварительной записи (примерно одна секунда на каждое) вместо немедленного подтверждения. Подробности и все ограничения: [README, InfluxDB 3.x](https://github.com/ioBroker/ioBroker.influxdb/blob/master/README.md#influxdb-3x).

#### Округлить до
Укажите количество десятичных знаков, с которыми должны храниться числа.

#### Сбор заданий по письму
Введенное здесь значение определяет, какой объем новых данных должен быть доступен перед повторной записью в базу данных. Чем выше значение, тем реже данные записываются в базу данных, но тем больше потеря данных в случае сбоя адаптера. Значение 0 приводит к немедленной записи в базу данных. Следовательно, ввод «0» означает немедленную запись в базу данных. Это увеличивает нагрузку на базу данных и адаптер.

#### Интервал записи
Если здесь будет введено значение, данные будут записаны в базу данных по истечении указанного времени в секундах, даже если количество точек данных, заданное на предыдущем шаге, еще не достигнуто.

### <span id="Default_Einstellungen_fuer_Zustaende">Настройки по умолчанию для штатов</span>
Эти настройки определяют значения, которые следует использовать в качестве значений по умолчанию при настройке регистрации отдельных точек данных. [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

#### Запись только изменений
Если этот флажок установлен, для записи последовательных точек данных должны быть разные значения. Если датчик, например, несколько раз передает одно и то же значение температуры, это не будет записано; новая запись данных будет создана только при изменении значения.

#### Записать одинаковые значения
Если вы хотите периодически сохранять одни и те же (неизмененные) значения, вы можете указать временной интервал в секундах, с какой частотой это должно происходить. Соответственно, ввод 0 означает, что повторяющиеся значения сохраняться не должны.

#### Минимальное отклонение от последнего значения
Если постоянно изменяющиеся значения не должны сохраняться, здесь можно установить минимальное значение, до которого значение должно измениться, прежде чем будет сохранено новое значение. Это полезно, например, для розеток с измерителями мощности, где не каждое незначительное изменение должно регистрироваться. Соответственно, ввод 0 означает, что каждое значение должно быть сохранено.

Сохранить как
При необходимости здесь можно указать тип данных, используемый для хранения информации. Это следует сделать только перед первой активацией.

[![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_SQL_objects_type.jpg) В InfluxDB тип данных определяется с первой записью и должен оставаться неизменным в дальнейшем.

#### Время хранения
Указывает, как долго следует хранить значения (бессрочно, 2 года, 1 год, ..., 1 день). [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_SQL_objects_timerange.jpg)

#### Время подавления дребезга контактов (мс)
Защита от чрезмерно частых изменений значения. Это минимальный интервал в миллисекундах, после которого значение не будет записано снова.

* * *

## <span id="Settings_for_data_points">Настройки для точек данных</span>
Настройки регистрируемых точек данных задаются на вкладке «Объекты» для соответствующей точки данных. [![Для этого выберите значок шестеренки для нужной точки данных в крайнем правом углу столбца. Откроется меню конфигурации: [![](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_influxDB_objects.jpg)

### <span id="Activated">Activated</span>
Включите логирование для записи только изменений значений: значения сохраняются только при изменении значения точки данных. Это экономит место для хранения. Полезный подход - предварительно отфильтровать точки данных с помощью полей фильтра в заголовке таблицы, например, чтобы отфильтровать для логирования только точки данных "Состояние".

1. Отобразить представление в виде списка без группировки.
2. Введите фильтрующий(ие) термин(ы).
3. Выберите все отфильтрованные точки данных для записи в журнал.
1. Открывается меню настроек параметров журнала.
4. Включите ведение журнала для всех отфильтрованных точек данных одновременно.
1. Выберите дополнительные параметры, такие как «только изменения» и время хранения, одинаково для всех отфильтрованных точек данных.
5. Сохраните изменения.

### <span id="Custom_Tags">Пользовательские теги</span>
Каждая точка данных может иметь дополнительные фиксированные теги InfluxDB. Они вводятся в настройках точки данных в разделе «Пользовательские теги» в виде списка пар «имя/значение» и записываются вместе с каждым значением этой точки данных - для всех версий InfluxDB и независимо от параметра «Сохранять метаданные как теги, а не поля».

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
|-----------------|-------------------------------------------------------------------------------------------------------|
| Ведется логирование | Объект существует, и этот экземпляр регистрирует его |
| Выход из системы | Объект по-прежнему существует, но ведение журнала отключено - история по-прежнему доступна |
| Объект удален | Объект был удален в ioBroker; его история больше недоступна. |

В отношении этих цифр важны два момента:

**Размер для каждой точки данных не указан.** InfluxDB не предоставляет такой информации ни в версии 1.x (команды `SHOW STATS` и `SHOW SHARDS` знают только движок и шарды), ни в версии 2.x (использование диска отслеживается для каждого сегмента). Вместо этого отображается количество **серий**: это определяет требования к хранению индекса, а использование пользовательских тегов обычно приводит к его непреднамеренному увеличению.
**Подсчет представляет собой полное сканирование.** InfluxDB не имеет собственного счетчика строк, поэтому она фактически считывает значения за сканируемый период времени. В случае базы данных, содержащей данные за несколько лет, это занимает время - выбор диапазона дат над таблицей ограничивает сканирование, если общий подсчет не требуется.

Процесс очистки удаляет сохраненные значения точек данных, которые больше не регистрируются. **Ничего не удаляется без подтверждения**: в диалоговом окне сначала отображается, что будет удалено при подтвержденном запуске. По умолчанию выбираются только объекты, которые больше не существуют в ioBroker. Точки данных с просто отключенной регистрацией включаются только в том случае, если они явно выбраны - их история по-прежнему доступна и часто необходима. Точка данных, которая в данный момент регистрируется, никогда не выбирается. В диалоговом окне все найденные точки данных предварительно выбраны; отдельные точки данных, которые необходимо сохранить, можно снять с выбора с помощью флажков. Удаляются только выбранные точки данных.

Адаптер знает только, существует ли объект для измерения. Если скрипт записывает данные непосредственно в базу данных без соответствующего объекта, для этого измерения также будет отображаться сообщение «Объект удален». Чтобы отличить такие измерения от действительно неактивных точек данных, диалоговое окно отображает самое старое и самое новое значения для каждой точки данных. Если в поле **Последнее значение старше … дней** указано число, предварительно выбираются только точки данных, самое новое значение которых старше (или которые вообще не имеют значения). Точки данных, в которые еще ведется запись, исключаются, но их все еще можно выбрать вручную.

Доступ к тем же данным можно получить и через JavaScript, используя сообщения `getDpStatistics` и `cleanupOrphaned`, см. [README](https://github.com/ioBroker/ioBroker.influxdb/blob/master/README.md#statistics-and-cleanup).

* * *

## <span id="Bedienung">**Bedienung**</span>
Если в разделе «История» в строке заголовка выбрать «с» или `influxdb.0`, будут отображаться только точки данных с записью. [![[Изображение значка шестеренки](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_filter.jpg) Нажатие на значок шестеренки открывает записанные данные: [Изображение записи данных](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg)](img/influxdb_ioBroker_Adapter_SQL_objects_Data.jpg) Данные отображаются в таблице на вкладке «Таблица». [![ioBroker_Adapter_rickshaw03](https://github.com/ioBroker/ioBroker.influxdb/blob/master/docs/de/img/influxdb_ioBroker_Adapter_rickshaw03.jpg)](../../../de/adapterref/iobroker.influxdb/img/influxdb_ioBroker_Adapter_rickshaw03.jpg)] График тренда можно отобразить на вкладке «Диаграмма», если установлен адаптер «Рикша».

* * *

## <span id="Docker">InfluxDB и Grafana в Docker</span>
Адаптер может запускать InfluxDB 2.x (не 3.x) и, при необходимости, саму Grafana в виде контейнера Docker. Docker должен быть установлен на хосте ioBroker, а пользователь `iobroker` должен иметь права доступа к Docker (при необходимости запустите `iob fix`).

### InfluxDB в Docker
В настройках экземпляра включите параметр **Использовать самостоятельно размещенную InfluxDB в Docker**. После этого хост, порт, организация, токен и т. д. будут скрыты - адаптер установит соединение самостоятельно.

Контейнер создается со следующими фиксированными значениями:

| Настройка | Значение |
|---------------------|--------------------------------------------|
| URL | `http://<ioBroker-Host>:8086` |
| Организация | `iobroker` |
| ведро | `iobroker` |
| API-токен | `aW9icm9rZXI4NjY0NTYzODU0NjU2NTY1MjY1Ng==` |
| API-токен | `aW9icm9rZXI4NjY0NTYzODU0NjU2NTY1MjY1Ng==` |

По умолчанию контейнер прослушивает только `127.0.0.1`, что означает, что веб-интерфейс InfluxDB доступен только непосредственно на хосте ioBroker. Для доступа к нему с другой машины введите `0.0.0.0` (для всех интерфейсов) или IP-адрес хоста в разделе **Запуск контейнера по IP-адресу** настроек _InfluxDB Docker_. **Делайте это только в доверенной сети** - имя пользователя, пароль и токен, указанные выше, одинаковы для всех установок. Пароль можно изменить в интерфейсе InfluxDB (меню пользователя → _Изменить пароль_), но адаптер будет входить в систему, используя токен, и это изменение не повлияет на его работу. Не удаляйте токен.

Данные находятся в томах Docker `flux_data` и `flux_config` и сохраняются при обновлении или пересоздании контейнера.

### Grafana в Docker
[Графана](https://grafana.com/) отображает данные из InfluxDB в виде панелей мониторинга. Если InfluxDB работает в Docker, адаптер Grafana может запуститься автоматически: в настройках экземпляра включите **Использовать саморазмещенную Grafana в Docker** (флажок появляется только в том случае, если включена опция **Использовать саморазмещенную InfluxDB в Docker**). Соединение с InfluxDB устанавливается автоматически - в Grafana не требуется никакой настройки.

#### Первая регистрация
1. Откройте `http://<ioBroker-Host>:3000` в браузере - или просто щелкните плитку _Grafana_ на вводной странице администратора (также доступна в виде ссылки в списке экземпляров). Адаптер создает эту ссылку сразу после активации Grafana и перезапускает свой экземпляр. Порт можно изменить в разделе _Grafana Docker_. По умолчанию Grafana прослушивает все интерфейсы (`0.0.0.0`); если она должна быть доступна только на самом хосте, введите `127.0.0.1` в поле **Запуск контейнера по IP-адресу**.
2. Войдите в систему с помощью
- **Пользователь: `admin` **
- **Пароль: `iobroker` ** - или значение **пароля администратора** в разделе _Grafana Docker_, если он был изменен до первого запуска.
3. Grafana запрашивает новый пароль. Введите его или пропустите, нажав _Пропустить_.

**Пароль администратора используется только при первом запуске контейнера**, когда Grafana создает свою базу данных. Последующие изменения **пароля безопасности администратора** в настройках адаптера не будут иметь никакого эффекта, и пароль, измененный в Grafana, не будет сохранен в настройках адаптера. Если вы забыли свой пароль, сбросьте его на хосте ioBroker.

```bash
docker ps --filter name=grafana --format '{{.Names}}'     # zeigt den Containernamen, z.B. iob_influxdb_0_grafana
docker exec -it iob_influxdb_0_grafana grafana cli admin reset-admin-password <neues-passwort>
```

При включенной опции **Включить регистрацию пользователей** на странице входа отображается ссылка _Регистрация_, которую может использовать любой пользователь, имеющий доступ к Grafana, для создания учетной записи. Если Grafana доступна из интернета, эту опцию следует отключить.

#### Источник данных
Источник данных `InfluxDB` уже существует и установлен по умолчанию (_Подключения → Источники данных_). Он использует язык запросов **Flux**, организацию `iobroker` и корзину `iobroker` и подключается к контейнеру InfluxDB в сети Docker - независимо от порта, настроенного для хоста. Адаптер перезаписывает этот источник данных при каждом запуске, поэтому его нельзя редактировать в Grafana. Наряду с ним можно создавать пользовательские источники данных.

#### Первая панель управления
1. Выберите _Панели мониторинга → Создать → Новая панель мониторинга → Добавить визуализацию_ и выберите источник данных `InfluxDB`.
2. При необходимости переключитесь в редактор запросов на _code_ и введите запрос Flux. Каждая точка данных сохраняется в измерении с ее идентификатором (или псевдонимом идентификатора), а значение находится в поле `value`.

```
from(bucket: "iobroker")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._measurement == "system.adapter.admin.0.memRss" and r._field == "value")
  |> aggregateWindow(every: v.windowPeriod, fn: mean, createEmpty: false)
```

Замените `system.adapter.admin.0.memRss` на идентификатор пользовательской точки данных, регистрируемой в журнале. `aggregateWindow` уменьшает количество точек до того, что помещается на графике - для значений, которые не являются числами или не должны усредняться, используйте `fn: last`.

3. Нажмите кнопку «Обновить» над диаграммой, затем нажмите кнопку «Сохранить панель мониторинга».

Проще всего найти правильные названия измерений и полей в интерфейсе InfluxDB в обозревателе данных (см. выше): выберите сегмент, измерение и поле, а затем нажмите «Редактор скриптов» - это сгенерирует соответствующий запрос Flux. В Grafana вы можете опробовать запросы в разделе «Исследование», не используя панель мониторинга.

Дополнительная информация:

- Плагины можно установить через опцию **Plugins** в разделе _Grafana Docker_ (например, `grafana-clock-panel`); они будут установлены при следующем запуске контейнера.
- Если доступ к Grafana осуществляется через обратный прокси-сервер по подкаталогу, введите полный публичный URL-адрес в поле **Корневой URL-адрес сервера**.
Панели мониторинга, пользователи и настройки находятся в томе Docker `grafana_data` и сохраняются при обновлении контейнера.

### Grafana без Docker
Без Docker Grafana необходимо устанавливать отдельно, см. описание в разделе [Инструкции по установке](https://grafana.com/docs/grafana/latest/setup-grafana/installation/). Затем откройте `http://<Host>:3000` и войдите в систему с именем `admin` / `admin` (пароль по умолчанию Grafana; новый пароль будет запрошен немедленно). Далее создайте источник данных, как показано [здесь].](https://grafana.com/docs/grafana/latest/datasources/influxdb/):

- InfluxDB 1.x: Язык запросов _InfluxQL_, URL InfluxDB, имя базы данных и имя пользователя/пароль из настроек адаптера.
- InfluxDB 2.x: Язык запросов _Flux_, URL InfluxDB, организация, токен и корзина по умолчанию из настроек адаптера.
- InfluxDB 3.x: Язык запросов _InfluxQL_ (или _SQL_), URL-адрес InfluxDB, имя базы данных и токен из настроек адаптера.

Запрос из [Первая панель управления](#das-erste-dashboard) работает для InfluxDB 2.x. Для InfluxDB 1.x и 3.x с InfluxQL, например:

```
SELECT mean("value") FROM "system.adapter.admin.0.memRss" WHERE $timeFilter GROUP BY time($__interval) fill(previous)
```

* * *

## Установка базы данных InfluxDB
Ниже приведено описание процедуры установки базы данных InfluxDB.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (GermanBluefox) Fixed: `getHistory` with `id: '*'` (or without ID) answers an error instead of an empty result. InfluxDB keeps one measurement per state and cannot read all states at once; the example in this README that used `'*'` reads one state now
* (GermanBluefox) Fixed: `getHistory` with an aggregate (e.g. average) and without `start` answers instead of failing with "Invalid time value" (the step was NaN). Like the sql and history adapters, it takes the newest `count` values and builds the intervals from them. An unparsable `start` or `end` is refused with "is not a valid date", a time stamp as text ("1700000000000") is accepted

### 5.4.0 (2026-11-19)
* (GermanBluefox) Fixed: `delete` / `deleteRange` without a valid `ts` or range no longer deletes all values of the state. A single `{id, state: {start, end}}`, a state without `ts` or with `ts: 0` deleted everything (InfluxDB 1.x since 2000, 2.x since 1970, 3.x the whole table), an unparsable `start` everything up to `end`. Such a message is refused now with an error and nothing is deleted; `{id, state: {start, end}}` and `{id, start, end}` delete the range, `ts: 0` the value at 0
* (GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and `common.supportedMessages.help`

### 5.3.1 (2026-11-17)
* (GermanBluefox) Fixed: timed relog leaked timers and wrote the skipped value multiple times when a state was set twice in quick succession (#595)
* (GermanBluefox) Data browser: the values of a datapoint can be exported as CSV (e.g. for Excel) or as JSON (the format of `storeState`) for the selected time range
- (copilot) Adapter requires node.js >= 22.19.0 now
* (GermanBluefox) InfluxDB 2.x: the `query` command with several Flux queries separated by `;` works again. Since 5.0 the queries were sent as one broken statement and InfluxDB answered with "invalid statement: ,". When one of several queries fails, the error names the failing query (#580)

### 5.2.3 (2026-10-29)
* (GermanBluefox) `getHistory` accepts `intervalBorders`: the client can send the borders of the intervals itself, e.g. the local days of a chart. InfluxDB groups by equally long windows, so after a switch of the daylight saving time every window ended an hour away from the midnight and a value written at 23:59:59 was shown on the next day. With borders the values are read raw and aggregated by the adapter (ioBroker/ioBroker.echarts#1311)
* (GermanBluefox) `getHistory` with a start reads the whole range of raw values again: `count` limited them for "onchange" too, so a chart line ended after the oldest 2000 (InfluxDB 1.x) or 500 (InfluxDB 2.x) values and ran straight to the right edge. Like in the sql and history adapters, `count` limits the raw values only for "none" and for a request without start (ioBroker/ioBroker.echarts#1275)
* (GermanBluefox) InfluxDB 2.x: deleting values (cleanup of the statistics tab, `delete`, `deleteRange`, `deleteAll`) waits up to 10 minutes. A delete walks every shard of the bucket and failed after the request timeout of 30 s with "Request timed out"

### 5.2.2 (2026-10-27)
* (GermanBluefox) The cleanup dialog of the statistics tab shows the oldest and the newest value of each datapoint and can preselect only datapoints whose last value is older than a given number of days, so measurements that scripts still write to stay untouched

### 5.2.0 (2026-10-24)
* (GermanBluefox) The cleanup dialog of the statistics tab has checkboxes, so only the selected datapoints are deleted (#565)

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