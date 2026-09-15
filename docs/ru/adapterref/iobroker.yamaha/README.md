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
hash: r4NhTt59T9mZfMasMG73NLks3s39ed+SjU24TQRptXk=
---
# AV-ресиверы Yamaha и устройства MusicCast

Этот адаптер управляет сетевыми аудиоустройствами Yamaha, приобретенными в ioBroker: AV-ресиверами, стереоресиверами, колонками и саундбарами MusicCast, а также CD-ресиверами — примерно с 2008 года.

Он заменяет два снятых с производства адаптера.`yamaha` и`musiccast` и поддерживает одновременно все три сетевых протокола Yamaha, поэтому одно устройство отображается как одно устройство, независимо от того, скольким из них оно отвечает.

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
2. Откройте настройки экземпляра. На вкладке **«Устройства»** ваши приемники отображаются как карты.
3. Оставьте список пустым, и адаптер самостоятельно выполнит поиск в сети и запустит все найденные устройства — или нажмите **+** и введите IP-адрес приемника. Вы можете сделать и то, и другое: устройства, которые вы ввели, и устройства, найденные в результате поиска, будут работать одновременно.

На каждой карточке есть небольшой значок, указывающий на источник адреса: карандаш — для адреса, который вы ввели, лупа — для адреса, найденного поиском. Найденное устройство также можно отредактировать — укажите фиксированный адрес получателя, и оно станет одним из введенных вами устройств.

Приёмник, выпущенный до 2010 года, не отвечает на поиск в сети и всегда должен быть добавлен вручную. То же самое относится к любому устройству, которое ваш маршрутизатор размещает в другом сетевом сегменте.

**Приёмнику присваивается фиксированный адрес.** Адаптер распознаёт устройство по его идентификатору, а не по адресу, и отслеживает его при изменении адреса — однако устройство, которое перемещается, когда адаптер не работает, будет обнаружено снова только при следующем поиске в сети.

### Настройки

- **Поиск устройств в сети** — поиск выполняется _автоматически,_ даже когда список устройств пуст, что адаптер всегда и делал. Поиск _всегда_ продолжается рядом с введенными вами устройствами. _Никогда не_ выполняется только с вашим списком. Устройство, которое было найдено ранее и больше не ищется, сохраняет свои данные — оно просто помечается как «офлайн». Только кнопка удаления на его карточке позволяет окончательно удалить устройство.
- **Сетевой интерфейс** — оставьте это поле пустым, и поиск будет выполняться через все сетевые карты вашего ioBroker-сервера. Задавайте это поле только в том случае, если ваш сервер подключен к нескольким сетям и поиск должен использовать определенную из них. Это не влияет на сами приемники.
- **Порт событий MusicCast** — отображается, недоступен для редактирования: устройства MusicCast передают свои изменения на UDP-порт 41100, протокол исправляет это. Он нужен администратору, чтобы предупредить вас, когда второй экземпляр на том же хосте займет этот порт.
- **Интервал опроса (для старых устройств)** — как часто запрашивается состояние у приемника, выпущенного до 2010 года. Эти модели не могут самостоятельно сообщать об изменениях. 60 секунд — разумное значение по умолчанию; более короткий интервал означает больший сетевой трафик при незначительной выгоде.
- **Группы точек данных** — см. ниже.

### На каждой плате устройства

- **Регулировка громкости от 0 до 100 %** — при выключенном режиме данные о громкости ресивера отображают шкалу, которую он сам показывает: децибелы или собственный счетчик шагов. При включенном режиме отображаются данные от 0 до 100 %, то есть основная зона и все остальные зоны ресивера — диапазон, ожидаемый большинством виджетов VIS. Адаптер преобразует данные в обоих направлениях, поэтому ресивер всегда получает ожидаемое значение.

  Это относится к устройству, а не к экземпляру: запрос на ввод процентов для одного приемника ничего не говорит об остальных. Вы устанавливаете это там же, где задаете имя и адрес устройства: в диалоговом окне добавления/редактирования на его карточке — и пока оно включено, на карточке отображается небольшой значок **0–100 %** рядом с метками протокола, так что вы можете видеть, какой объем памяти содержит приемник, не открывая ничего.

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

`player.elapsedTime` и`player.totalTime` Это **число в секундах** — именно такой формат нужен виджету медиаплеера ioBroker, Alexa и Google, и именно в таком формате можно производить вычисления. Прямо рядом с ними,`player.elapsedTimeText` и`player.totalTimeText` имеют то же значение, что и читаемый текст (`1:23` ), для визуализации, которая просто хочет это показать.

### Отключение групп точек данных

В настройках можно отключить семь групп: воспроизведение, тюнер, мультирум, HDMI, сцены, звук и расширенные настройки, а также часы на устройствах, которые их имеют. Меню и экранный пульт дистанционного управления относятся к группе воспроизведения. Отключение группы удаляет ее данные — адаптер не оставляет пустых остатков. Повторное включение создаст их при следующем подключении.

## Используя его

**Включите и выберите источник.**

```javascript
setState("yamaha.0.living.power", true);
setState("yamaha.0.living.input", "HDMI1");
```

**Установите громкость** — в децибелах, точно так, как показывает ресивер:

```javascript
setState("yamaha.0.living.volume", -35.5);
```

**Воспроизвести сцену** — по номеру или по названию, отображаемому на устройстве:

```javascript
setState("yamaha.0.living.scene.recall", "Movie Viewing");
```

**Нажмите клавишу на экранном пульте дистанционного управления** —`up` ,`down` ,`left` ,`right` ,`select` ,`return` ,`home` :

```javascript
setState("yamaha.0.living.remote.cursor", "left");
```

Слова одинаковы во всех трех протоколах, поэтому скрипт продолжает работать даже после замены приемника. Устройство предлагает только те клавиши, которые у него действительно есть: старые модели не знают клавиш меню, и их курсор работает в открытом меню.

**Просмотрите меню сетевого источника.**`player.browse.source` открывает источник, восемь`line1` …`line8` Данные отображают текущее окно.`selectLine` действует как клавиша «ОК», и`pageUp` /`pageDown` /`back` /`home` Навигация. Для скриптов есть`path` : писать`Bookmarks>Radio Paradise` и адаптер перемещается туда сам по себе.

## Что стоит знать

**Первое подключение занимает некоторое время.** При первом же соединении адаптер запрашивает у приемника информацию о его функциях — до получаса на устройстве YNCA. Ответы запоминаются для каждого устройства и сохраняются после перезагрузки, поэтому каждый последующий запуск запускает устройство за считанные секунды и обновляет значения в фоновом режиме. Обновление прошивки или подключение другого устройства по тому же адресу распознаются и запрашиваются повторно.

**Порт MusicCast может принадлежать только одной программе.** Устройства MusicCast отправляют свои обновления на порт 41100 на вашем компьютере с ioBroker, и только одна программа может его использовать. Если старая версия...`musiccast` Адаптер по-прежнему установлен и работает, он занимает этот порт, и вместо получения уведомлений адаптер начинает запрашивать информацию каждые пять минут. Устройства YNCA не затронуты. Удалите или остановите старый адаптер, чтобы снова получать мгновенные обновления.

**Зона 2 — это полноценная зона.** Она имеет собственный объем, вход, блок проигрывателя и сцены.`multiroom.zone2` Вызов избранного переключает зону, которая прослушивает этот источник, не всегда в основную зону.

**В журнале отображается сообщение об отклоненной команде.** Если приемник отклоняет что-либо — сцену, которую не поддерживает его генерация, или функцию, недоступную в режиме ожидания, — вы увидите это в виде предупреждения в журнале адаптера, а не в виде молчаливого сообщения об ошибке.

## Когда что-то не работает

- **Устройство не найдено.** Более старые устройства не отвечают на поиск — добавьте их по IP-адресу. В противном случае убедитесь, что ioBroker и приемник находятся в одном сетевом сегменте, и попробуйте явно указать сетевой интерфейс.
- **Устройство остаётся в автономном режиме.** Проверьте адрес и доступность приёмника (обычно на его собственном веб-сайте есть ответ).`http://<address>` Адаптер самостоятельно повторяет попытку, при этом паузы увеличиваются.
- **Точка данных остается пустой.** Устройство не сообщает это значение — адаптер создает только то, о чем ему было сообщено, поэтому пустая точка данных обычно означает, что эта функция существует на других моделях, но отсутствует на вашей.
- **Больше ничего не обновляется.** Найдите сообщение о порте MusicCast выше и проверьте.`info.connection` на устройстве.

В остальных случаях на мгновение переключите уровень логирования экземпляра в режим отладки — адаптер сообщит, что он запрашивает, что получает и что отказывается отправлять.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 2.9.2 (2026-09-12)

- (krobipd) New: The device card shows a 0–100 % badge while that receiver's volume is in percent, so you can tell the two scales apart at a glance
- (krobipd) Fixed: The percent setting is made in one place again — the device's edit dialog; the extra switch on the card showed the wrong position and is gone

### 2.9.1 (2026-09-12)

- (krobipd) Fixed: A receiver the network search found keeps its datapoints when you add a device by hand — they stay with their history and are marked offline instead of deleted

### 2.9.0 (2026-09-12)

- (krobipd) New: Devices you enter by hand and devices the network search finds now run side by side — entering one receiver no longer takes every found one out of the instance
- (krobipd) New: Setting "Search the network for devices" — automatically while your device list is empty (as before), always next to it, or never
- (krobipd) New: Every device card can be edited. Give a found receiver the fixed address you assigned it and it becomes one of your entered devices, keeping its whole object tree
- (krobipd) New: Each card shows where its address came from, and "Volume as 0–100 %" is now set per device instead of once for the whole instance — every receiver keeps what it had
- (krobipd) Fixed: hdmi.aspect and hdmi.resolution were missing on every receiver from 2012 on — the models moved those settings to another subunit and the adapter only ever asked the old one
- (krobipd) Fixed: Receivers from 2010/2011 were offered a 4K video resolution their model does not support
- (krobipd) Fixed: A write to a receiver could be dropped without a trace while another of its protocols was reconnecting
- (krobipd) Fixed: Deleting a device and adding the same one again left it with the wrong icon until the next restart, and a pending write could recreate the deleted device object
- (krobipd) Changed: A MusicCast receiver's datapoints now update only when their value really changed — automations tied to them stop firing for no reason

### 2.8.0 (2026-09-11)

- (krobipd) Fixed: A volume written to a MusicCast receiver now arrives exactly — the adapter reads the receiver's own step declaration instead of guessing a ratio (#623)
- (krobipd) Fixed: Every zone of a receiver now carries the same volume scale — a third zone used to show a raw 0…161 count next to decibels in the other two
- (krobipd) Changed: The volume datapoint now carries the minimum, maximum and step the receiver reports for that zone — a receiver whose zones differ gets a different range per zone
- (krobipd) New: Setting "Volume as 0–100 %" turns every volume datapoint, in every zone, into a percentage — what most VIS widgets expect. Off by default; the receiver's own scale stays the truth
- (krobipd) Changed: The datapoints actualVolume, actualVolumeMode and inputText are gone — volume and input carry the same information
- (krobipd) Changed: After this update every receiver is asked about its abilities once more, so the first start takes a little longer than usual
- (krobipd) Fixed: A DAB receiver no longer logs a warning on every tuner poll — the frequency datapoint was limited to the FM band while the receiver reported DAB frequencies

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