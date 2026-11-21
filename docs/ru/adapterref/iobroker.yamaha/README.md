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
hash: cDUboeP+m1byoM1skIFCIwudM9BkO1mkGJN1V1po2uU=
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
- **Сетевой интерфейс** — сохраните «все адреса» (0.0.0.0), и адаптер будет использовать каждую сетевую карту вашей машины ioBroker. Установите это значение, если ваш сервер находится в нескольких сетях: поиск, каждое соединение с ресивером и порт событий MusicCast — тогда используйте только этот адрес. Адрес, которого нет у машины, игнорируется с одним предупреждением в журнале.
- **Порт событий MusicCast** — отображается, недоступен для редактирования: устройства MusicCast передают свои изменения на UDP-порт 41100, протокол исправляет это. Он нужен администратору, чтобы предупредить вас, когда второй экземпляр на том же хосте займет этот порт.
- **Интервал XML-запросов** — это частота запросов к получателю, использующему данные до 2010 года. Эти модели не могут самостоятельно сообщать об изменениях. 60 секунд — разумное значение по умолчанию; более короткий интервал означает больший сетевой трафик при незначительной выгоде.
- **Данные** представлены ниже.

### На каждой плате устройства

- **Регулировка громкости от 0 до 100 %** — при выключенном режиме данные о громкости ресивера отображают шкалу, которую он сам показывает: децибелы или собственный счетчик шагов. При включенном режиме отображаются данные от 0 до 100 %, то есть основная зона и все остальные зоны ресивера — диапазон, ожидаемый большинством виджетов VIS. Адаптер преобразует данные в обоих направлениях, поэтому ресивер всегда получает ожидаемое значение.

  Это относится к устройству, а не к экземпляру: запрос на отображение процентов для одного ресивера ничего не говорит об остальных. Вы устанавливаете это там же, где задаёте имя и адрес устройства: в диалоговом окне добавления/редактирования на его карточке — и пока оно включено, на значке динамика карточки отображается знак процента, поэтому вы можете видеть, какой уровень громкости у ресивера, не открывая ничего.

## Что вы получаете в дереве объектов

Каждый приемник становится отдельным устройством. Под ним:

- **Информация** — подключено ли устройство, его модель, версия прошивки, адрес и какой из трех протоколов активен в данный момент.
- **Питание, громкость, отключение звука, вход, звуковая программа, спящий режим** — ядро усилителя. Его нельзя выключить; устройство получает те функции, которые у него есть (у динамика нет звуковой программы).
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

Для всего остального создайте диагностический отчет: в настройках экземпляра откройте вкладку **«Эксперт»** , выберите устройство и нажмите **«Создать диагностический отчет»** . Адаптер считывает данные с приемника по всем используемым протоколам — только для чтения, ничего на приемнике не изменяется — это занимает до минуты, и ваш браузер сохраняет один файл: что может делать приемник и на что он ответил, его данные, последние строки журнала адаптера (включая строки отладки, даже с уровнем логирования info) и установлен ли, включен ли и работает ли адаптер musiccast. Адреса, серийные номера, имена сети, комнаты, устройства и входа заменяются маркерами — даже когда приемник выключен, — и адаптер ничего не записывает на диск — он хранит отчет в памяти только до тех пор, пока ваш браузер его не получит. Если экземпляр не запущен, вкладка сообщит об этом, вместо того чтобы ждать. Прикрепите файл к [отчету об устройстве на GitHub](https://github.com/iobroker-community-adapters/ioBroker.yamaha/issues/new?template=device-support.yml) .

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22.19.0 now

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 3.3.0 (2026-10-14)

- (krobipd) New: Diagnostics report on the new Expert tab, with a "Report a device" issue form for it
- (krobipd) New: Names you change in the receiver or the MusicCast app reach the input, scene and sound program dropdowns while the adapter runs
- (krobipd) Changed: YNCA, MusicCast and XML datapoints now share names, roles and value lists
- (krobipd) Changed: The YNCA input dropdown shows your input names; advanced.inputNames.\* is removed
- (krobipd) Changed: sound.adaptiveDrc is a switch on every receiver; writing "Auto" still works
- (krobipd) Changed: On MusicCast-only devices, sleep is a dropdown and bass and treble are in dB
- (krobipd) Changed: The Zone B name moves from multiroom.zoneB.name to multiroom.zoneB.zoneName
- (krobipd) Changed: The network interface setting applies to every connection of the adapter
- (krobipd) Fixed: info.model and info.firmware are filled on devices without YNCA
- (krobipd) Fixed: Scene, tuner and playback commands work on more receivers
- (krobipd) Fixed: Empty or invalid values written to scene.recall or a preset no longer recall anything
- (krobipd) Fixed: A tuner frequency written right after the band goes to the new band
- (krobipd) Fixed: Switches on 2008–2017 receivers no longer show an On/Standby list
- (krobipd) Fixed: The on-screen remote works over XML on the 2012 entry class (RX-V473 …)
- (krobipd) Fixed: A YNCA receiver that did not answer at one start is read in full at the next
- (krobipd) Fixed: Editing a device card no longer restarts the instance, and deleted receivers stay deleted
- (krobipd) Fixed: Zones on Main Zone Sync show the main zone's playback; zones without a media input get no player datapoints
- (krobipd) Fixed: MusicCast link groups, favourites and volume right after power-on on soundbars work reliably
- (krobipd) Fixed: Receivers with a CD drive and MusicCast get their CD datapoints
- (krobipd) Fixed: Scenes without a title show as "Scene 1", "Scene 2" … in the scene dropdown instead of a bare number
- (krobipd) Fixed: Menu paths find entries on later pages, and XML menus are no longer hidden after a "not now" answer
- (krobipd) Fixed: A powered-off XML receiver goes offline in seconds
- (krobipd) Fixed: A MusicCast-only device that loses power goes offline within three minutes instead of fifteen

### 3.2.0 (2026-10-02)

- (krobipd) Fixed: Dropdown lists such as sound program, sleep timer and Adaptive DRC no longer go empty when the receiver loses power; lists emptied that way come back
- (krobipd) Changed: Your datapoints stay exactly as they are while the adapter runs, also when a receiver goes offline; they change only after an adapter or firmware update
- (krobipd) New: A command the receiver refuses over one protocol, or one sent while that protocol is offline, goes out over another protocol that understands it
- (krobipd) New: A firmware update of the receiver is noticed and logged; the adapter reads the receiver again and reports it ready once that is done
- (krobipd) Fixed: Datapoints of found receivers are no longer deleted at adapter start when the receiver list cannot be read or an entered receiver has the same address

### 3.1.3 (2026-10-02)

- (krobipd) Fixed: Menu lines fill again after switching player.browse.source, also on receivers that were in standby when the adapter started
- (krobipd) Fixed: On receivers that offer their menus only over XML (models from before 2010), the menu lines no longer stay empty after a source switch
- (krobipd) Changed: A new instance starts switched off and waits until you have set it up; existing instances keep their own setting

### 3.1.2 (2026-09-30)

- (krobipd) Fixed: The sleep timer lists the receiver's own values again (Off, 30 min …) instead of MusicCast's minutes, so a picked value is one the receiver accepts

### 3.1.1 (2026-09-30)

- (krobipd) Fixed: A receiver that replaces another at the same address is asked again whether zones 2 and 3 have an on-screen remote, instead of inheriting the old answer

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