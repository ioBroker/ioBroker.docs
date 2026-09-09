---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.yamaha
BADGE-stable: https://iobroker.live/badges/yamaha-stable.svg
BADGE-Installations: https://iobroker.live/badges/yamaha-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.yamaha
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
hash: JoSFhWr0iB0n7ko4kMSFLSruoZJDWBuV6jOirxZrvr0=
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
2. Откройте настройки экземпляра. **Устройства** На вкладке ваши получатели отображаются в виде карт.
3. Либо оставьте список пустым — тогда адаптер самостоятельно выполнит поиск в сети и запустит найденное — либо нажмите **+** и введите IP-адрес получателя.

Приёмник, выпущенный до 2010 года, не отвечает на поиск в сети и всегда должен быть добавлен вручную. То же самое относится к любому устройству, которое ваш маршрутизатор размещает в другом сетевом сегменте.

**Укажите получателю фиксированный адрес.** Адаптер распознает устройство по его идентификатору, а не по адресу, и отслеживает его при изменении адреса — однако устройство, которое перемещается, когда адаптер не работает, будет обнаружено снова только при следующем поиске в сети.

### Настройки

- **Сетевой интерфейс** — Оставьте это поле пустым, и поиск будет выполняться через все сетевые карты вашего ioBroker-сервера. Устанавливайте это поле только в том случае, если ваш сервер находится в нескольких сетях и поиск должен использовать конкретную сеть. Это никак не влияет на сами приемники.
- **Интервал опроса (для старых устройств)** — Как часто запрашивается состояние у приемника, выпущенного до 2010 года. Эти модели не могут самостоятельно сообщать об изменениях. 60 секунд — разумное значение по умолчанию; более короткий интервал означает больший сетевой трафик при незначительной выгоде.
- **Группы точек данных** - см. ниже.

## Что вы получаете в дереве объектов

Каждый приемник становится отдельным устройством. Под ним:

- **информация** — подключено ли устройство, его модель, версия прошивки, адрес и какой из трех протоколов активен в данный момент.
- **питание, громкость, отключение звука, вход, звуковая программа, сон** — ядро усилителя. Всегда присутствует, отключить невозможно.
- **игрок** — Что воспроизводится прямо сейчас: источник, исполнитель, альбом, трек, обложка, прошедшее и общее время, повтор и перемешивание, а также кнопки управления воспроизведением. Один блок на зону.
- **тюнер** — диапазон, частота в килогерцах, предустановка, RDS и подробная информация о DAB, если устройство поддерживает DAB.
- **мультирум** — всё, что охватывает зоны или устройства: зоны со 2 по 4 со своим собственным регулятором громкости и входом, общим питанием, режимом вечеринки и группой MusicCast.
- **сцена** — Воспроизвести сцену по номеру или по ее названию, а также по списку сцен, которые объявляет устройство.
- **удаленный** — Экранный пульт дистанционного управления: сенсорная панель и клавиши меню, расположенные там же, где и на ресивере.
- **звук, HDMI, расширенные возможности** — Регуляторы тембра, эквалайзер, информация о сигнале, выходы HDMI, настройки динамиков, назначаемые имена входов. На устройствах MusicCast к ним добавляются общесистемные настройки: автоматический переход в режим ожидания и яркость дисплея. Числовые значения указывают на пределы, заявленные самим устройством, поэтому ползунок позволяет выбрать диапазон, точно соответствующий возможностям ресивера.

Создается только то, что фактически передает ваше устройство. Саундбар не получает зону 4, а стереоресивер — декодер объемного звучания.

### Время воспроизведения может быть двух видов.

`player.elapsedTime` и `player.totalTime` область **число в секундах** — Именно такой формат нужен виджету медиаплеера ioBroker, Alexa и Google, и именно в таком формате можно производить вычисления. Прямо рядом с ними, `player.elapsedTimeText` и `player.totalTimeText` имеют то же значение, что и читаемый текст (`1:23`), для визуализации, которая просто хочет это показать.

### Отключение групп точек данных

В настройках можно отключить семь групп: воспроизведение, тюнер, мультирум, HDMI, сцены, звук и расширенные настройки, а также часы на устройствах, которые их имеют. Меню и экранный пульт дистанционного управления относятся к группе воспроизведения. Отключение группы удаляет ее данные — адаптер не оставляет пустых остатков. Повторное включение создаст их при следующем подключении.

## Используя его

**Включите и выберите источник.**

```javascript
setState("yamaha.0.living.power", true);
setState("yamaha.0.living.input", "HDMI1");
```

**Установите громкость** — в децибелах, точно так, как показывает приемник:

```javascript
setState("yamaha.0.living.volume", -35.5);
```

**Вспомните сцену** — по номеру или по названию, указанному на устройстве:

```javascript
setState("yamaha.0.living.scene.recall", "Movie Viewing");
```

**Нажмите клавишу на экранном пульте дистанционного управления.** — `up`, `down`, `left`, `right`, `select`, `return`,
`home`:

```javascript
setState("yamaha.0.living.remote.cursor", "left");
```

Слова одинаковы во всех трех протоколах, поэтому скрипт продолжает работать даже после замены приемника. Устройство предлагает только те клавиши, которые у него действительно есть: старые модели не знают клавиш меню, и их курсор работает в открытом меню.

**Просмотрите меню сетевого источника.** `player.browse.source` открывает источник, восемь
`line1` … `line8` Данные отображают текущее окно. `selectLine` действует как клавиша «ОК», и
`pageUp`/`pageDown`/`back`/`home` Навигация. Для скриптов есть `path`: писать
`Bookmarks>Radio Paradise` и адаптер перемещается туда сам по себе.

## Что стоит знать

**Первый контакт занимает некоторое время.** При первом же подключении адаптер запрашивает у приемника информацию о его функциях — на устройстве YNCA это может занять до получаса. Ответы запоминаются для каждого устройства и сохраняются после перезагрузки, поэтому каждый последующий запуск запускает устройство за считанные секунды и обновляет значения в фоновом режиме. Обновление прошивки или подключение другого устройства по тому же адресу распознаются и запрашиваются повторно.

**Порт MusicCast может принадлежать только одной программе.** Устройства MusicCast отправляют свои обновления на порт 41100 на вашем компьютере с ioBroker, и только одна программа может их хранить. Если старая версия...
`musiccast` Адаптер по-прежнему установлен и работает, он занимает этот порт, и вместо получения уведомлений адаптер начинает запрашивать информацию каждые пять минут. Устройства YNCA не затронуты. Удалите или остановите старый адаптер, чтобы снова получать мгновенные обновления.

**Зона 2 полностью заполнена.** Он имеет собственный регулятор громкости, вход, блок проигрывателя и сцены.
`multiroom.zone2`Вызов избранного переключает зону, которая прослушивает этот источник, не всегда в основную зону.

**В журнале появляется сообщение об отклоненной команде.** Если приемник отклоняет что-либо — сцену, которую не поддерживает его генерация, или функцию, недоступную в режиме ожидания, — вы увидите это в виде предупреждения в журнале адаптера, а не в виде молчаливого сообщения об ошибке.

## Когда что-то не работает

- **Устройство не обнаружено.** Более старые устройства не отвечают на поиск — добавляйте их по IP-адресу. В противном случае убедитесь, что ioBroker и приемник находятся в одном сетевом сегменте, и попробуйте явно указать сетевой интерфейс.
- **Устройство остаётся в автономном режиме.** Проверьте адрес и доступность получателя (обычно на его собственном веб-сайте отвечают). `http://<address>`Адаптер самостоятельно повторяет попытку, при этом паузы увеличиваются.
- **Точка данных остается пустой.** Устройство не сообщает это значение — адаптер создает только то, о чем ему было сообщено, поэтому пустая точка данных обычно означает, что эта функция существует на других моделях, но отсутствует на вашей.
- **Ничего больше не обновляется.** Найдите сообщение о порте MusicCast выше и проверьте.
  `info.connection` на устройстве.

В остальных случаях на мгновение переключите уровень логирования экземпляра в режим отладки — адаптер сообщит, что он запрашивает, что получает и что отказывается отправлять.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 2.5.2 (2026-09-07)

- (krobipd) Improved: 174 more datapoints explain themselves — volume and tone now say which scale they use, the stored lists say what is inside them, and the menu rows say what they are for
- (krobipd) Improved: a receiver's "Connected" now says what it means — a device on network standby answers as well, so it is not the same as being switched on

### 2.5.1 (2026-09-07)

- (krobipd) Changed: installing straight from GitHub is no longer offered — the adapter is built before publishing, so it is installed from the ioBroker repository instead

### 2.5.0 (2026-09-07)

- (krobipd) Fixed: switching off a datapoint group now clears it in every zone — turning off "Sound" used to leave the zone 2/3/4 sound datapoints standing, and "Playback" left 304 of them
- (krobipd) Fixed: folders explain themselves on all three protocols now — on MusicCast and older XML receivers the explanation was missing, so a speaker or soundbar got almost none
- (krobipd) Improved: numeric datapoints carry the limits the device itself declares, so a slider offers exactly the range the receiver accepts instead of an open number field
- (krobipd) New: 61 setup datapoints of the 2010 receiver generation — speaker configuration, HDMI and lip-sync settings, trigger assignment, subwoofer trim, YPAO volume and the RDS clock
- (krobipd) New: the device-wide MusicCast settings are readable and writable — automatic standby, display brightness and the two HDMI outputs, created only where the device really offers them
- (krobipd) Fixed: bass, treble and subwoofer trim showed doubled values on MusicCast receivers — that scale counts in half decibels and was labelled as decibels
- (krobipd) Fixed: a receiver that was in standby when the adapter started could end up with an empty media menu until the next restart

### 2.4.0 (2026-09-03)

- (krobipd) New: the on-screen remote reaches every protocol now — the cursor pad and the menu keys work on YNCA and pre-2010 XML receivers, not just on MusicCast
- (krobipd) Changed: stepping one menu level back no longer switches to a substitute key on a receiver that rejects it — on those models the new cursor pad does it

### 2.3.3 (2026-09-03)

- (krobipd) New: the menu browser, the MusicCast group, the clock alarm and the disc drive now explain their datapoints too, in eleven languages

[Older changelogs can be found there](CHANGELOG_OLD.md)

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