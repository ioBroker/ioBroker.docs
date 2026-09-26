---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.yamaha
BADGE-stable: https://iobroker.live/badges/yamaha-stable.svg
BADGE-Installations: https://iobroker.live/badges/yamaha-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.yamaha
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.yamaha/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.yamaha/README.md
title: AV-ресиверы Yamaha и устройства MusicCast
hash: 3DOxHTGace49KrcUlruDfGOeZo5ZrAHhdx09GYxYYMY=
---
# AV-ресиверы Yamaha и устройства MusicCast

Этот адаптер управляет сетевыми аудиоустройствами Yamaha, приобретенными в ioBroker: AV-ресиверами, стереоресиверами, колонками и саундбарами MusicCast, а также CD-ресиверами — примерно с 2008 года.

Он заменяет два снятых с производства адаптера. `yamaha` и `musiccast` и поддерживает одновременно все три сетевых протокола Yamaha, поэтому одно устройство отображается как одно устройство, независимо от того, скольким из них оно отвечает.

## Какие устройства работают?

| Класс устройства                   | Примеры                          | Как это контролируется                             |
| ---------------------------------- | -------------------------------- | -------------------------------------------------- |
| AV-ресивер                         | RX-V, RX-A, RX-S, TSR, HTR, CX-A | YNCA, на моделях MusicCast дополнительно MusicCast |
| Стереоприемник / сетевой усилитель | RN, WXA, WXC, AS                 | MusicCast, на старых моделях YNCA                  |
| Беспроводная колонка               | MusicCast 20/50, WX, ISX         | Музыкальный подкаст                                |
| Саундбар                           | YSP, YAS, ATS, SR-B              | Музыкальный подкаст                                |
| CD-ресивер / сетевой плеер         | CRX, MCR, CD-NT                  | Музыкальный подкаст                                |
| Приёмник, выпущенный до 2010 года. | RX-V примерно 2008 года выпуска. | XML                                                |

Вам не нужно знать, какой протокол использует ваше устройство. Адаптер пробует все три и использует тот, который отвечает.

## Настройка

1. Установите адаптер и создайте экземпляр.
2. Откройте настройки экземпляра. В разделе **«Устройства»** ваши приемники указаны как карты.
3. Оставьте список пустым, и адаптер самостоятельно выполнит поиск в сети и запустит все найденные устройства — или нажмите **+** и введите IP-адрес приемника. Вы можете сделать и то, и другое: устройства, которые вы ввели, и устройства, найденные в результате поиска, будут работать одновременно.

На каждой карточке отображается символ динамика для регулировки громкости: динамик со знаком процента и текущим уровнем громкости основной зоны под ним, если **громкость отображается как 0–100 %** , в противном случае — просто динамик. Каждую карточку можно редактировать, включая найденные — присвойте найденному устройству фиксированный адрес, который вы назначили ресиверу, и оно станет одним из ваших добавленных устройств.

Приёмник, выпущенный до 2010 года, не отвечает на поиск в сети и всегда должен быть добавлен вручную. То же самое относится к любому устройству, которое ваш маршрутизатор размещает в другом сетевом сегменте.

**Приёмнику присваивается фиксированный адрес.** Адаптер распознаёт устройство по его идентификатору, а не по адресу, и отслеживает его при изменении адреса — однако устройство, которое перемещается, когда адаптер не работает, будет обнаружено снова только при следующем поиске в сети.

### Настройки

- **Поиск устройств в сети** — _автоматический_ поиск выполняется, пока список устройств пуст, что адаптер всегда и делал. Поиск _всегда_ продолжается рядом с введенными вами устройствами. _Никогда не_ запускает ваш список отдельно и не открывает прослушиватель на UDP-порту 1900. Устройство, которое было найдено ранее и больше не ищется, сохраняет свои данные — оно просто помечается как отключенное. Только кнопка удаления на его карточке удаляет устройство навсегда. Список, содержащий только строку, перенесенную с предыдущего адаптера (его имя — IP-адрес), считается пустым: никто не вводил этот адрес, поэтому поиск продолжается и следует за этим приемником к новому адресу.
- **Сетевой интерфейс** — оставьте это поле пустым, и поиск будет выполняться через все сетевые карты вашего ioBroker-сервера. Задавайте это поле только в том случае, если ваш сервер подключен к нескольким сетям и поиск должен использовать определенную из них. Это не влияет на сами приемники.
- **Порт событий MusicCast** — отображается, недоступен для редактирования: устройства MusicCast передают свои изменения на UDP-порт 41100, протокол исправляет это. Он нужен администратору, чтобы предупредить вас, когда второй экземпляр на том же хосте займет этот порт.
- **Интервал опроса (для старых устройств)** — как часто запрашивается состояние у приемника, выпущенного до 2010 года. Эти модели не могут самостоятельно сообщать об изменениях. 60 секунд — разумное значение по умолчанию; более короткий интервал означает больший сетевой трафик при незначительной выгоде.
- **Группы точек данных** — см. ниже.

### На каждой плате устройства

- **Регулировка громкости от 0 до 100 %** — при выключенном режиме данные о громкости ресивера отображают шкалу, которую он сам показывает: децибелы или собственный счетчик шагов. При включенном режиме отображаются данные от 0 до 100 %, то есть основная зона и все остальные зоны ресивера — диапазон, ожидаемый большинством виджетов VIS. Адаптер преобразует данные в обоих направлениях, поэтому ресивер всегда получает ожидаемое значение.

  Это относится к устройству, а не к экземпляру: запрос на отображение процентов для одного ресивера ничего не говорит об остальных. Вы устанавливаете это там же, где задаёте имя и адрес устройства: в диалоговом окне добавления/редактирования на его карточке — и пока оно включено, на значке динамика карточки отображается знак процента, поэтому вы можете видеть, какой уровень громкости у ресивера, не открывая ничего.

## Что вы получаете в дереве объектов

Каждый приемник становится отдельным устройством. Под ним:

- **Информация** — подключено ли устройство, его модель, версия прошивки, адрес и какой из трех протоколов активен в данный момент.
- **Питание, громкость, отключение звука, вход, звуковая программа, спящий режим** — ядро усилителя. Всегда присутствует, не может быть выключено.
- **Плеер** — что воспроизводится в данный момент: источник, исполнитель, альбом, трек, обложка, прошедшее и общее время, повтор и перемешивание, а также кнопки управления воспроизведением. Один блок на зону.
- **Тюнер** — диапазон, частота в килогерцах, предустановка, RDS и подробная информация о DAB, если устройство поддерживает DAB.
- **Мультирум** — это всё, что охватывает зоны или устройства: зоны со 2 по 4 со своим собственным регулятором громкости и входом, общим питанием, режимом вечеринки и группой MusicCast.
- **сцена** — вызвать сцену по номеру или по ее названию, а также по списку сцен, которые объявляет устройство.
- **Пульт дистанционного управления** — экранный пульт: курсорная панель и клавиши меню, расположенные там, где они находятся на ресивере.
- **Звук, HDMI, расширенные** настройки — регуляторы тембра, эквалайзер, информация о сигнале, выходы HDMI, настройки динамиков, назначаемые имена входов. На устройствах MusicCast к ним добавляются общесистемные настройки: автоматический режим ожидания и яркость дисплея. Числовые значения указывают на пределы, заявленные самим устройством, поэтому ползунок позволяет выбрать диапазон, точно соответствующий возможностям ресивера.

Создается только то, что фактически передает ваше устройство. Саундбар не получает зону 4, а стереоресивер — декодер объемного звучания.

### Время воспроизведения может быть двух видов.

`player.elapsedTime` и `player.totalTime` Это **число в секундах** — именно такой формат нужен виджету медиаплеера ioBroker, Alexa и Google, и именно в таком формате можно производить вычисления. Прямо рядом с ними, `player.elapsedTimeText` и `player.totalTimeText` имеют то же значение, что и читаемый текст (`1:23`), для визуализации, которая просто хочет это показать.

### Отключение групп точек данных

В настройках можно отключить семь групп: воспроизведение, тюнер, мультирум, HDMI, сцены, звук и расширенные настройки, а также часы на устройствах, которые их имеют. Меню и экранный пульт дистанционного управления относятся к группе воспроизведения. Отключение группы удаляет ее данные — адаптер не оставляет пустых остатков. Повторное включение создаст их при следующем подключении.

## Используя его

**Включите и выберите источник.**

```javascript
setState("yamaha.0.rx-v6a-1a2b.power", true);
setState("yamaha.0.rx-v6a-1a2b.input", "HDMI1");
```

**Установите громкость** в соответствии со шкалой, отображаемой на ресивере (в децибелах или с шагом регулировки), в пределах его возможностей. `volume` Данные: при **уровне громкости от 0 до 100 %** , в процентах. На приемнике, отображающем децибелы:

```javascript
setState("yamaha.0.rx-v6a-1a2b.volume", -35.5);
```

**Воспроизвести сцену** — по номеру или по названию, отображаемому на устройстве:

```javascript
setState("yamaha.0.rx-v6a-1a2b.scene.recall", "Movie Viewing");
```

**Нажмите клавишу на экранном пульте дистанционного управления** —`up`, `down`, `left`, `right`, `select`, `return`, `home`:

```javascript
setState("yamaha.0.rx-v6a-1a2b.remote.cursor", "left");
```

Слова одинаковы во всех трех протоколах, поэтому скрипт продолжает работать даже после замены приемника. Устройство предлагает только те клавиши, которые у него действительно есть: старые модели не знают клавиш меню, и их курсор работает в открытом меню.

**Просмотрите меню сетевого источника.** `player.browse.source` открывает источник, восемь `line1` …`line8` Данные отображают текущее окно. `selectLine` действует как клавиша «ОК», и `pageUp` /`pageDown` /`back` /`home` Навигация. Для скриптов есть `path`: писать `Bookmarks>Radio Paradise` и адаптер перемещается туда сам по себе.

## Что стоит знать

**Первое подключение занимает некоторое время.** При первом же соединении адаптер запрашивает у приемника информацию о его функциях — до получаса на устройстве YNCA. Ответы запоминаются для каждого устройства и сохраняются после перезагрузки, поэтому каждый последующий запуск запускает устройство за считанные секунды и обновляет значения в фоновом режиме. Обновление прошивки или подключение другого устройства по тому же адресу распознаются и запрашиваются повторно.

**Для обновления MusicCast требуется UDP-порт 41100.** Устройства MusicCast отправляют обновления на порт 41100 на вашем компьютере с ioBroker, и только одна программа может его хранить. Если старая версия... `musiccast` Адаптер по-прежнему установлен и работает, он занимает этот порт. Обновления также не происходят, когда ioBroker работает в Docker без опубликованного UDP-порта или когда вторая программа MusicCast на той же машине регистрируется для их получения. Адаптер замечает изменение, произошедшее без обновления: после двух обновлений он один раз записывает это в журнал, считывает каждую запись обратно и запрашивает все данные каждые пять минут. Устройства YNCA не затрагиваются. Освободите или опубликуйте порт, чтобы снова получать мгновенные обновления — в журнале будет указано, когда они снова появятся.

**Зона 2 — это полноценная зона.** Она имеет собственный объем, вход, блок проигрывателя и сцены. `multiroom.zone2` Вызов избранного переключает зону, которая прослушивает этот источник, не всегда в основную зону.

**Идентификатор объекта устройства — это его модель и конец серийного номера** — например. `yamaha.0.rx-v6a-1a2b` Таким образом, два устройства одной модели получают два дерева объектов, и устройство сохраняет свой идентификатор независимо от того, как вы или приложение его называете: имя рядом с идентификатором берется из самого устройства и может быть изменено на его карточке. Если два устройства одной модели имеют общие последние четыре символа, второе получает полный серийный номер. Устройство, которое не сообщает серийный номер — приемник YNCA, чей XML-контроллер не отвечает, — определяется по своей модели: `rx-v473`, `rx-v473-2` Устройство, добавленное вручную в выключенном состоянии, запускается под введенным вами именем; после ответа его объекты при следующем запуске перемещаются к идентификатору модели.

**Приёмник известен по своему серийному номеру, а не по адресу.** Адаптер получает серийный номер (и MAC-адрес) от самого приёмника — из его сетевого объявления, от MusicCast, из XML-управления. Устройство, получившее новый IP-адрес или новое имя, сохраняет свои объекты: найденные устройства и строка, перенесённая с предыдущего адаптера, перемещаются на новый адрес, обычно в течение нескольких секунд, поскольку приёмник объявляет о своём появлении — и самое позднее, когда поиск срабатывает при потере соединения. Устройство, которое вы ввели вручную, остаётся по указанному вами адресу; когда поиск обнаруживает, что оно отвечает в другом месте, в журнале это указывается один раз — отредактируйте карточку, чтобы переместить его. Прослушиватель использует порт 1900 совместно с другими службами UPnP на вашем компьютере; если он не может использовать порт, об этом сообщается в одном предупреждении, и адаптер периодически переключается на поиск.

**Удаление является окончательным.** Кнопка удаления на карточке сначала запрашивает информацию и сообщает, что относится к устройству: все его точки данных, их историю и все привязки визуализации. Устройство, найденное сетевым поиском, не добавляется повторно — оно находится в списке исключений, пока вы не добавите его вручную или не отметите его в разделе **«Исключенные устройства…»** над списком устройств, что позволит следующему поиску вернуть его обратно.

**Отклоненная команда отображается в журнале.** Если приемник отклоняет что-либо — сцену, которую не поддерживает его генерация, или функцию, недоступную в режиме ожидания, — вы увидите это в виде предупреждения в журнале адаптера, а не как ничего не происходящего в фоновом режиме. Ответ устройства MusicCast сопровождается своим смыслом, например... `Guarded` для "невозможно в текущем состоянии". Затем точка данных снова отображает значение устройства.

## Когда что-то не работает

- **Устройство не найдено.** Более старые устройства не отвечают на поиск — добавьте их по IP-адресу. В противном случае убедитесь, что ioBroker и приемник находятся в одном сетевом сегменте, и попробуйте явно указать сетевой интерфейс.
- **Устройство остаётся в автономном режиме.** Проверьте адрес и доступность приёмника (обычно на его собственном веб-сайте есть ответ). `http://<address>` Адаптер самостоятельно повторяет попытку с увеличивающимися паузами. Если приемник получил новый адрес, найденное устройство автоматически следует за ним; устройство, введенное вами вручную, необходимо отредактировать — в журнале будет указано имя нового адреса.
- **Я удалил устройство, и оно появилось снова / Я хочу его вернуть.** Удаленное устройство не будет отображаться в результатах поиска, пока вы не разрешите его повторное добавление: добавьте его вручную или откройте **раздел «Исключенные устройства…»** над списком и отметьте его галочкой.
- **Точка данных остается пустой.** Устройство не сообщает это значение — адаптер создает только то, о чем ему было сообщено, поэтому пустая точка данных обычно означает, что эта функция существует на других моделях, но отсутствует на вашей.
- **Больше ничего не обновляется.** Найдите сообщение о порте MusicCast выше и проверьте. `info.connection` на устройстве.

В остальных случаях на мгновение переключите уровень логирования экземпляра в режим отладки — адаптер сообщит, что он запрашивает, что получает и что отказывается отправлять.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 3.0.0 (2026-09-26)

- (krobipd) Changed: Every device gets a new object ID once — its model and the end of its serial number, e.g. `wx-030-2b3c`; scripts and VIS need the new IDs
- (krobipd) Changed: The move carries values, recording settings, rooms, functions and aliases along, and recorded history continues in its old series
- (krobipd) Fixed: A second device of the same model and name is no longer skipped — every device gets its own object tree
- (krobipd) Fixed: After a restart, the input list of a YNCA receiver offers only the sources the receiver has again, not the whole catalog
- (krobipd) New: A device added by hand is asked for its model and serial number, and the name you type is its display name from the start
- (krobipd) New: The device card shows the object ID, the MAC address and the serial number under its details

### 2.13.0 (2026-09-25)

- (krobipd) Fixed: A value a receiver refuses no longer stays on the datapoint — every write is read back, and the log names the device's reason
- (krobipd) Fixed: MusicCast values stay current in Docker or next to a second MusicCast app — missing events are noticed, then the adapter polls and reads writes back
- (krobipd) New: MusicCast devices write every setting the specification gives a setter for: dialogue level, 3D surround, tone mode, speaker A/B, dimmer, group name and more
- (krobipd) Fixed: MusicCast Link groups are built and left as Yamaha specifies — the joining zone switches to MusicCast Link, multiroom.group.status shows the progress
- (krobipd) Fixed: Names you give inputs, sound programs and zones in the app or on the receiver show up at the next connection instead of staying frozen
- (krobipd) Fixed: Umlauts in names and titles arrive intact on all three protocols, and YNCA zone names are written in the character set the receiver expects
- (krobipd) Fixed: When one protocol of a receiver drops, a live one takes over every datapoint it serves the same way, so power and volume keep working
- (krobipd) Fixed: true, a hex string or "1e2" written to a level, preset or scene no longer reaches the receiver; in percent mode "50" counts like 50
- (krobipd) Fixed: Back and Home work on 2012-and-later YNCA receivers, and a refused key no longer switches the remote pad to another command set for good
- (krobipd) Fixed: YNCA reads every word the official lists declare — an attenuated mute reads as muted, and repeat-one is written in the receiver's own word
- (krobipd) Fixed: A deleted device carried over from yamaha 0.5.x stays deleted, and a hostname in the device list works like an IP address
- (krobipd) New: Menus on the 2008 XML receivers (RX-V3900 generation); XML zones write tone and dialogue level the way the receiver declares them
- (krobipd) Changed: The first start after this update asks every receiver again what it can do — up to half a minute on a YNCA receiver, as on a first contact
- (krobipd) Improved: The README lists the ports the adapter uses; with the network search set to Never it opens no listener on UDP port 1900
- (krobipd) Changed: Settings left over from older versions are removed from the instance once after the update; the instance restarts once for it

### 2.12.0 (2026-09-22)

- (krobipd) Fixed: Deleting a device is final: the card asks first and names the datapoints, the device stays out of the search until you admit it again, and the log says how many datapoints went
- (krobipd) New: A device is known by its serial number: a receiver with a new IP address or a new name keeps its objects and is reconnected at the new address within seconds
- (krobipd) New: "Excluded devices…" above the device list shows the deleted devices and lets the network search admit a ticked one again — it says what it looks for and what it found
- (krobipd) Improved: A receiver that lost power is offline in about 90 seconds instead of up to 15 minutes: the first protocol that notices asks the others at once
- (krobipd) Improved: The adapter hears devices announcing themselves on the network, and while no device runs it keeps searching every five minutes
- (krobipd) Changed: A row carried over from the old adapter (name = IP) follows the receiver to a new address; a device entered by hand stays where it was typed, the log says if it answers elsewhere
- (krobipd) Improved: Switching a receiver off no longer fills the log with warnings, and every search the log announces also tells you what it found — or that nothing answered
- (krobipd) Improved: Less network noise while a receiver stays unreachable: the retries knock only on the protocols that device actually speaks, not on all three

### 2.11.0 (2026-09-17) — stable

- (krobipd) Fixed: The adapter no longer stops when the object database is briefly unavailable while a receiver reports a change
- (krobipd) Fixed: A datapoint whose value range a receiver no longer reports keeps its value, its history and its room and function assignments
- (krobipd) Fixed: A receiver that is switched off keeps its name after a restart
- (krobipd) Fixed: A name you type on a device card now wins over every name the receiver reports for itself
- (krobipd) Improved: When something goes wrong, the log names the cause instead of a placeholder

### 2.10.0 (2026-09-15)

- (krobipd) Fixed: A receiver the search found is searched for again after it moved to another address — until now that only worked for receivers found at start-up
- (krobipd) Fixed: A receiver that is unplugged or switched off at the mains now shows as disconnected within about 90 seconds instead of staying green for many minutes
- (krobipd) Fixed: A MusicCast device that stops answering a command is checked right away and shown as disconnected — until now that took up to 15 minutes
- (krobipd) Fixed: On receivers without live updates, a value you write is confirmed as soon as the receiver took it, instead of up to five minutes later
- (krobipd) Fixed: A zone name you changed on an older receiver stays after a reconnect — until now the previous name came back
- (krobipd) Fixed: Deleting a device from its card while it is still connecting no longer leaves parts of its object tree behind
- (krobipd) Fixed: Writing false, off or 0 to a switch datapoint now switches it off — until now any text, even the word false, switched it on
- (krobipd) Improved: The history of a datapoint only records values the receiver actually changed — a restart or a lost connection no longer adds identical entries
- (krobipd) Improved: MusicCast live updates now start on their own once a port another program held at start-up becomes free — before, only a restart helped
- (krobipd) New: Device pictograms in the object tree and on the device cards — receiver, stereo receiver, speaker, soundbar or CD system, readable in every theme, also for a device that is off
- (krobipd) Changed: The device card shows a speaker symbol; with the percent switch on it also shows the current volume as a percentage. The pencil and magnifier markers are gone
- (krobipd) Fixed: The adapter logo is readable in the Admin's dark themes as well — until now its dark strokes vanished on a dark background
- (krobipd) Changed: The instance settings show the fixed MusicCast event port, so the Admin warns when a second instance on the same host would take it

## License

The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>  
Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

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