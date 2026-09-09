---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wireless-mbus/README.md
title: ioBroker.wireless-mbus
hash: hjoPsz84eeGIspT5Vhyzef5SoGWx0XbQXK7uevCjvcs=
---
![Логотип](../../../en/adapterref/iobroker.wireless-mbus/admin/wireless-mbus.png)

![количество установленных](https://iobroker.live/badges/wireless-mbus-installed.svg)
![стабильная версия](https://iobroker.live/badges/wireless-mbus-stable.svg)

# ioBroker.wireless-mbus

Этот адаптер позволяет принимать беспроводные данные M-Bus от поддерживаемых приемников. Возможности реализации на разных устройствах различаются, но режимы wMBus можно настроить для всех перечисленных устройств.

- Модули Embit WMB
- Amber Wireless AMB8465 ( **Внимание:** включен командный режим (UART\_CMD\_Out\_Enable)!)
- IMST iM871A
- IMST iU891A-XL
- КУЛ

Стек WMBUS был "переработан" на основе проекта FHEM и подвергся значительной доработке и рефакторингу. Тестирование проводилось с использованием исходных данных, полученных из интернета, примеров данных OMS и некоторых тестовых данных из библиотеки jmbus. Некоторые граничные случаи еще не протестированы.

Создание, обновление и т.д. устройств в основном основаны на адаптере M-Bus от Apollon77 (см. ниже).

Если адаптер получает зашифрованные телеграммы, на вкладке конфигурации ключа AES идентификатор устройства должен отображаться автоматически.

Если парсер выдаст ошибку, необработанные данные телеграммы будут сохранены в состоянии info.rawdata.

_Внимание:_ Приёмник Amber, похоже, зависает через некоторое время (или после получения определённого количества сообщений) в режиме C? Аппаратная неисправность?

_Вариант IMST iM871A:_ Существует USB-приемник "RWE Smart Home", который по сути является IMST iM871A, но ядро не загружает соответствующий драйвер автоматически. Вот однострочный код для создания правила udev, чтобы это исправить:

```shell
sudo bash -c "echo \$'ACTION==\"add\", ATTRS{idVendor}==\"10c4\", ATTRS{idProduct}==\"87ed\", RUN+=\"/sbin/modprobe cp210x\" RUN+=\"/bin/sh -c \\'echo 10c4 87ed > /sys/bus/usb-serial/drivers/cp210x/new_id\\'\"' > /etc/udev/rules.d/99-imst.rules"
```

## Ссылки:

- [Модуль стека WMBus](https://github.com/mhop/fhem-mirror/blob/master/fhem/FHEM/WMBus.pm)
- [ioBroker.mbus](https://github.com/Apollon77/ioBroker.mbus)
- [Исходный стек WMBUS: wm-bus](https://github.com/soef/wm-bus)
- [протокол M-Bus](http://www.m-bus.com/files/MBDOC48.PDF)
- [Технические характеристики OMS](https://oms-group.org/en/download4all/oms-specification/)

## Первоначальная настройка

Первоначальная настройка требует конфигурации основных параметров (аппаратное подключение к приемнику wmbus) и настройки ключей AES для всех зашифрованных узлов wmbus, данные с которых будут собираться. Самая сложная часть — это ключи AES.

### Базовая настройка

Для этого необходимо выбрать соответствующее USB-устройство и правильную скорость передачи данных ( **обычно** для IMST iM871A: 57600 бод; IMST iU891A-XL: 115200 бод; Amber: 9600 бод; Embit: 9600 бод, CUL: 38400 или 9600 бод). Большинство **измерительных приборов** будут передавать данные в режиме "T".

Начиная с версии 0.9.0, адаптер также поддерживает подключение к последовательным устройствам, доступным через TCP-сокет. Однако административный интерфейс пока это не отражает, и вам нужно выбрать «пользовательский порт» и ввести хост в качестве параметра.`tcp://host:port` .

### Другие варианты

- **Обновление неизмененных состояний** : При получении телеграммы все состояния будут обновлены, даже если их значение не изменилось. (по умолчанию: включено)
- **Принудительный перевод единиц энергии в кВт·ч** : Все единицы энергии (Вт·ч и Дж) будут переведены в кВт·ч. (по умолчанию: выключено)
- **Временно блокировать устройство после нескольких неудачных попыток** : если 10 последовательных телеграмм от одного и того же устройства не будут успешно обработаны, устройство будет игнорироваться до перезагрузки адаптера (по умолчанию: включено).
- **Обрабатывайте только устройства, у которых уже есть дерево объектов** : телеграммы от устройств, у которых еще нет дерева объектов, игнорируются, поэтому новые устройства не создаются — это полезно после того, как все интересующие вас счетчики настроены. Телеграммы, которые вообще не могут быть расшифрованы, также игнорируются: они не добавляют устройство в список ключей AES и не записываются в`info.rawdata` Автоматический список блокировки по-прежнему учитывает их, поэтому нежелательное устройство перестает требовать попытки декодирования — просто в журнале об этом не сообщается. Поиск устройств выполняется при запуске адаптера, поэтому устройство, удаленное из дерева объектов, исчезнет навсегда после следующего перезапуска, а устройство, которое должно быть обнаружено снова, также потребует добавления в список блокировки. (по умолчанию: выключено)

Автоматически поддерживаются компактные телеграммы (используемые некоторыми устройствами Kamstrup): структура полной телеграммы запоминается устройством, чтобы она сохранялась после перезагрузки адаптера, и используется для декодирования компактных телеграмм. Только компактные телеграммы, отправленные устройством до первой отправки полной телеграммы, не могут быть декодированы и молча пропускаются.

### Ключи AES

Идентификатор устройства представляет собой комбинацию кода производителя и идентификатора устройства (например, AAA-12345678). Ключ может быть введен либо в виде открытого текста длиной в 16 символов, либо в виде шестнадцатеричной строки длиной в 32 символа (16 байт).

Самый простой способ настроить ключи — запустить адаптер без предварительной настройки ключей и дождаться зашифрованной телеграммы, после чего адаптер сгенерирует запись с ключом "НЕИЗВЕСТНЫЙ". (Если включена опция "обрабатывать только устройства, у которых уже есть дерево объектов", ни одно устройство не может ожидать ключа — кнопка будет отключена и будет это указывать.) Затем вы можете ввести соответствующий ключ и сохранить настройки. Если вы видите устройства, которые вам неизвестны или от которых вы просто хотите избавиться (например, устройства соседей), вы можете добавить их на вкладку "Заблокированные устройства" (см. ниже).

### Блокировка нежелательных устройств

Вкладка «Заблокированные устройства» позволяет полностью запретить адаптеру обрабатывать телеграммы с нежелательных устройств.

Вам нужно лишь ввести идентификатор устройства (например, AAA-12345678), который можно получить из дерева объектов после получения и анализа телеграммы или из журнала отладки.

Впоследствии, при удалении устройства из дерева объектов, адаптер не будет создавать его заново.

## Обновление с версии 0.11.x

В версии 0.12.0 встроенный парсер Telegram заменен библиотекой [wireless-mbus-parser](https://github.com/lvogt/wireless-mbus-parser) . Идентификаторы объектов остаются прежними, но меняются четыре вещи:

- **Измеренные значения теперь представляют собой числа** , а не предварительно отформатированный текст.`"474.240"` стал`474.24` Штаты всегда были определенного типа.`mixed` Таким образом, сам ioBroker не возражает, но бэкэнд истории, хранящий данные в текстовом формате, — нет: InfluxDB отклоняет числовые значения для поля, содержащего строки, а SQL-адаптер хранит один тип данных для каждой точки данных, поэтому эти серии начинаются заново. После обновления просмотрите лог вашего адаптера истории и решите для каждой серии, следует ли удалить старые данные или сохранить их рядом с новыми.
- Необходимо обратить внимание **на скрипты и визуализации, которые сравнивают или форматируют этот текст** :`state.val === '474.240'` Теперь данные не совпадают, и виджет, который использовал фиксированное количество десятичных знаков, отображает простое число.
- **Данные о тарифе и устройстве были считаны из неправильных битов** , теперь они корректны, поэтому _названия_ состояний счетчика с несколькими тарифами меняются. Их идентификаторы остаются неизменными.
- **Зарезервированные и неизвестные VIF-файлы могут иметь разные имена** в библиотеке, поэтому некоторые необычные значения счетчиков отображаются под новым идентификатором. Старые значения остаются и могут быть удалены — все остальное записывается как прежде.

Опция "Кэширование для поддержки компактных кадров" также исчезла: теперь компактные телеграммы поддерживаются всегда, и первая телеграмма из метра больше не учитывается в списке автоматической блокировки.

### Измерительные приборы Techem and Diehl (PRIOS)

В версии 0.12.0 были допущены две ошибки: распределитель затрат на отопление Techem выдавал бессмысленные данные под такими названиями, как...`VIF_RETURN_TEMP` Счетчик тепла Techem вообще не считывался и попал в список автоматической блокировки, а счетчик воды PRIOS показал свой объем в единицах стоимости тепла. Версия 0.12.1 снова считывает их корректно — созданные для них в версии 0.12.0 состояния сохраняются и могут быть удалены, а правильные записываются в следующей телеграмме.

Два из их состояний названы иначе, чем в версии 0.11.x, поскольку значения предыдущего периода теперь содержат номер хранилища, к которому они относятся.`1-1-…` скорее, чем`1-0-…` ), а оставшийся срок службы батареи счетчика PRIOS указывается в месяцах, а не в годах.

## Список дел

- Отправка телеграмм для приемников в режиме S?
- Обработка данных со счетчиков с помощью "множественных телеграмм"

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.12.3 (2026-09-07)
* (ChL) Fix the CUL initialisation on the receivers that lose the first byte written after the line has been idle: every command is now sent with a separator in front of it, which is what gets lost instead of the command letter, and setting the mode waits for its confirmation rather than failing on a line that crossed it (#312)

### 0.12.2 (2026-09-05)
* (ChL) Add an option to only handle devices that already have an object tree, so that no new devices are created and no telegram of a device without one is reported
* (ChL) Remember the record layout of a device, so that its compact telegrams are decoded right after a restart of the adapter
* (ChL) Update wireless-mbus-parser to 1.3.1, which fixes the date of the current reading of a Techem meter - it used to be stamped with the year it was decoded in rather than with the year of the meter
* (ChL) Report at the log level the message deserves: a receiver that stays away no longer writes an error with every attempt, what the hardware says about itself is a warning, and the noise of the air is debug

### 0.12.1 (2026-09-05)
* (ChL) Fix Techem and Diehl (PRIOS) meters, which 0.12.0 decoded wrongly or not at all - the states it wrote for them carry wrong names and values and can be deleted
* (ChL) Fix the adapter stopping instead of blocking a device whose telegrams keep failing to decode
* (ChL) A 64 bit measured value with a scaling factor is a number now, like every other measured value

### 0.12.0 (2026-09-03)
* (ChL) Replace the built-in telegram parser with the wireless-mbus-parser library
* (ChL) New admin configuration UI (JSON config); a serial port can now simply be typed in, the separate "custom port" field is gone
* (ChL) Fix shutdown of the adapter: a serial connection over TCP was not closed properly and could reconnect itself while the adapter was stopping
* (ChL) Measured values are now stored as numbers instead of preformatted strings - a history adapter that stored them as text starts a new series
* (ChL) Fix decoding of the tariff and device unit of a data record
* (ChL) Compact telegrams are now supported without a separate option; the option "Cache for compact frames support" was removed
* (ChL) Follow further ioBroker repository recommendations: move the test code below `test/`, use the short `admin/i18n/<lang>.json` layout and clean up the keywords
* (ChL) Run the adapter tests only after linting and type checking succeeded
* (ChL) Use the adapter's own timer functions, so pending timers are cleared when the adapter is unloaded
* (ChL) Fix receivers getting stuck after disturbed reception: a damaged telegram no longer takes the following ones with it, and no longer leaves the adapter yellow until it is restarted by hand (#308, #309)
* (ChL) The adapter reconnects to the receiver instead of staying idle or stopping when the connection fails
* (ChL) Fix telegrams getting lost when several meters transmit at once, and damaged data being reported as readings of devices that do not exist
* (ChL) Declare the state that holds the raw data of an unreadable telegram as text rather than as a numeric value

### 0.11.0 (2026-08-29)
* (ChL) Require node.js 22 or newer, js-controller >=6.0.11 and admin >=7.6.20
* (ChL) Switch to @iobroker/eslint-config (ESLint 9 + Prettier)
* (ChL) Add release-script based release management
* (ChL) Include the admin translations in the published package

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright (c) 2019 ISFH - Institute for Solar Energy Research www.isfh.de  
Copyright (c) 2021 - 2026 Christian Landvogt

Licensed under GPLv2. See [LICENSE](LICENSE) and [NOTICE](NOTICE)