---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.beszel
BADGE-stable: https://iobroker.live/badges/beszel-stable.svg
BADGE-Installations: https://iobroker.live/badges/beszel-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.beszel
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"en/adapterref/iobroker.beszel/README.md":{"title":{"en":"ioBroker.beszel — User documentation"},"content":"en/adapterref/iobroker.beszel/README.md"},"en/adapterref/iobroker.beszel/datapoints.md":{"title":{"en":"Datapoints and metric switches"},"content":"en/adapterref/iobroker.beszel/datapoints.md"},"en/adapterref/iobroker.beszel/faq.md":{"title":{"en":"Questions and troubleshooting"},"content":"en/adapterref/iobroker.beszel/faq.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.beszel/README.md
title: ioBroker.beszel - Пользовательская документация
hash: X1fznjMoUsDEkxlgsBDqZ1Da1EOyWgorf8LBEVn7F/M=
---
# IoBroker.beszel - Пользовательская документация
Этот адаптер зеркалирует [Безель](https://beszel.dev) Hub в ioBroker. Beszel - это легковесный монитор серверов: небольшие агенты запускаются на машинах, за которыми вы хотите следить, и отправляют отчеты в центральный хаб; адаптер считывает данные из этого хаба через свой REST API и записывает данные об одном устройстве для каждой отслеживаемой системы.

Все данные доступны только для чтения. Адаптер никогда не записывает данные в концентратор и не создает точек данных, доступных для записи.

- [Переключения точек данных и метрик](datapoints.md)
- [Вопросы и устранение неполадок](faq.md)

## Перед началом
Для работы вам потребуется запущенный Beszel Hub с подключенным как минимум одним агентом и учетной записью для этого Hub.
Адаптер аутентифицируется как обычный пользователь Beszel - с использованием того же адреса электронной почты и пароля, что и для веб-интерфейса Beszel. Административная учетная запись не требуется.

Если вам нужны данные контейнера, этому пользователю также необходим доступ на чтение к коллекции `containers` в хабе.
Без этого все остальные метрики по-прежнему будут работать; адаптер выдаст предупреждение один раз и сохранит уже созданные точки данных контейнера.

## Настройка
1. **Установите и создайте экземпляр.** В ioBroker установите `beszel` и откройте настройки экземпляра.
2. **Введите URL-адрес хаба** в поле _URL-адрес хаба Beszel_ - тот же адрес, по которому вы открываете веб-сайт Beszel.

Интерфейс, например, с использованием `http://192.168.1.100:8090`. IPv6-адрес указывается в скобках: `http://[fd00::1]:8090`. Работают как `http`, так и `https`; через `http` на машину, отличную от хоста ioBroker, логин и токен передаются по сети в незашифрованном виде, и адаптер сообщает об этом в журнале.

3. **Введите имя пользователя и пароль.** Имя пользователя - это адрес электронной почты, который вы используете для входа в Beszel.
4. **Нажмите _Проверить соединение_.** Программа выполнит реальный вход в систему Hub и сообщит фактическое соединение.

Ошибка возникает, если что-то не так - неверный пароль, недоступный хост, опечатка в URL-адресе.

5. **Выберите метрики** на вкладке _Метрики_ (см. [Точки данных и переключатели метрик](datapoints.md)).

Настройки по умолчанию включают время безотказной работы, процессор, среднюю загрузку, память, дисковое пространство, пропускную способность диска, сеть и температуру. Все остальные параметры отключены, пока вы их не включите.

6. **Сохранить.** Экземпляр запускается, один раз считывает данные из Hub и создает дерево объектов.

## Интервал опроса и время ожидания
Параметр _Poll Interval_ принимает значения от 10 до 300 секунд и по умолчанию равен 60. Агенты Beszel записывают одно измерение в минуту, поэтому значение меньше 60 секунд приводит к дополнительным запросам без более свежих данных.
Значение, введенное вне этого диапазона - например, скриптом, напрямую записывающим конфигурацию, - будет ограничено, а не принято.

Параметр _Request timeout_ (от 5 до 120 секунд, по умолчанию 15) определяет, сколько времени может занять один запрос. Увеличьте его при медленном соединении или в хабе с большим количеством контейнеров.

## Что создает адаптер
```
beszel.0.
├── info.connection      is the Hub reachable
├── info.systemsTotal    systems registered on the Hub
├── info.systemsOnline   of those, how many report "up"
├── info.systemsAllUp    true while all of them do
└── systems.<name>.      one device per monitored system
```

Имя устройства - это системное имя из концентратора, записанное строчными буквами, при этом все, что не является буквой или цифрой, заменяется на `_`. Две системы, имена которых сводятся к одному и тому же идентификатору, получают короткий хеш-суффикс, чтобы предотвратить перезапись друг друга, и адаптер выдает предупреждение в случае такой перезаписи.

## Как ведет себя адаптер при отсутствии чего-либо
- **Система выходит из строя или приостанавливается.** Значение `info.online` становится false, а `info.status` показывает следующее.

«Это говорит Hub. Измеренные значения остаются на последнем показании, а не обнуляются - адаптер сообщает то, что ему известно, и ничего нового ему не известно».

- **Центр становится недоступным.** `info.connection` становится false, все системы переходят в состояние "Недоступно".

`info.online: false` и `info.status: unknown`, и счетчики флота падают до нуля. То же самое происходит, когда вы останавливаете экземпляр, поэтому ничто не продолжает показывать, что находится в сети, пока никто не читает.

- **Хаб отвечает пустым списком.** Ничего не удаляется. Сбой не должен привести к удалению вашего объекта.

Таким образом, список устройств исчезает только тогда, когда Центр управления действительно сообщает о более коротком списке.

- **Датчик, вентилятор, графический процессор, файловая система или контейнер исчезают.** Их данные удаляются. Если

Вся группа очищается мгновенно, адаптер ждет второго подряд опроса, прежде чем удалить - единичный сбой не приводит к очистке дерева.

## Обновление
Обновление повторно применяет имена и описания к уже имеющимся у вас точкам данных, поэтому исправленные формулировки и новые переводы будут применяться к существующим установкам, а не только к новым. В результате точка данных, которую вы переименовали самостоятельно в административной панели, получит обратно имя адаптера при следующем запуске.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.17.1 (2026-09-07)

- Improved: sixteen datapoints now carry an explanation in the object tree — online state, OS name, load average, container and service CPU, ZFS scrub errors and drive power cycles
- Fixed: the datapoint carrying the distribution name was labelled "OS Version" — it now reads "OS Name" in all eleven languages, matching what it actually shows

### 0.17.0 (2026-09-06)

- New: SMART data per drive as an opt-in metric — the drive's own overall verdict plus temperature, capacity, power-on hours and power cycles
- New: ZFS pool details as an opt-in metric — scrub status, per-vdev error counters and the datasets of each pool
- New: systemd service details as an opt-in metric — state, sub-state, CPU and memory for every unit the agent reports
- Improved: the two slow detail sources are read every 15 minutes instead of every poll, so switching them on costs your Hub almost nothing

### 0.16.0 (2026-09-06)

- Fixed: switching a metric group off now really empties it — a system that was offline at the time kept the empty channel and got it back after every restart
- Fixed: a stumble while starting no longer leaves the adapter alive but silent — it keeps going and updates your values as usual
- Changed: the status words of a system, of a ZFS pool and of a container are shown in your ioBroker language instead of English
- Changed: a container's health is now a proper status datapoint with its list of possible values, like the system status next to it
- Improved: starting up puts far less load on the ioBroker database, which shows most with many systems or many metrics switched off
- Changed: user documentation now covers the ZFS pools, the root disk name and the read/write totals

### 0.15.0 (2026-09-05)

- New: ZFS pools with usage, throughput and health as an opt-in metric, the root disk's custom name and cumulative read/write totals for disks and filesystems on Beszel 0.19.0.

### 0.14.2 (2026-09-05)

- Changed: Internal cleanup. No user-facing changes.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_