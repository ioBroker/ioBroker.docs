---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sonos/README.md
title: ioBroker.sonos
hash: sI1dqxd4WPtTMhfZNtk9MqONfidUsa64vaK2pZJePxE=
---
![Логотип](../../../en/adapterref/iobroker.sonos/admin/sonos.png)

![Количество установок](http://iobroker.live/badges/sonos-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sonos.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sonos.svg)

# ioBroker.sonos

![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.sonos/workflows/Test%20and%20Release/badge.svg)[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sonos/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Управляйте и контролируйте устройства SONOS с помощью ioBroker.

## Виджеты

Адаптер поставляется с одним виджетом для обоих адаптеров визуализации. Оба устанавливаются вместе с адаптером; **vis** и **vis-2** перезапускаются автоматически, а редактор требует принудительной перезагрузки (Ctrl+F5).

**Sonos Control** позволяет переключать комнаты, управлять воспроизведением, создавать группы и запускать избранные треки, плейлисты, треки в очереди воспроизведения, недавно прослушанные треки и источники. Можно привязать его, например, к конкретному _экземпляру приложения_ .`sonos.0` - не к одному штату, например`play` Виджет самостоятельно обнаруживает каждого говорящего в данном экземпляре.

Все найденные колонки отображаются в виде значка вверху. Членство в группе переключается с помощью флажков. Если комната принадлежит группе, в области воспроизведения отображается трек группы, а не последний локальный трек этой комнаты. Кнопки библиотеки ( **Избранное** , **Плейлисты** , **Очередь** , **Недавние** , **Источники** ) открывают всплывающее окно под ними. В разделе **«Недавние»** отображаются последние треки выбранной комнаты.

![Sonos Control - плеер](../../../en/adapterref/iobroker.sonos/img/widget-player.png)

_Комнаты, группировка и текущий воспроизводимый контент_

![Sonos Control - избранное](../../../en/adapterref/iobroker.sonos/img/widget-favorites.png)

_Кнопки библиотеки открывают страницу под названиями комнат._

![Sonos Control - источники](../../../en/adapterref/iobroker.sonos/img/widget-sources.png)

_Источники: TuneIn, музыкальная библиотека, сетевые ресурсы, линейный вход и HDMI-вход телевизора._

![Sonos Control - HDMI для телевизора](../../../en/adapterref/iobroker.sonos/img/widget-hdmi.png)

_HDMI на телевизоре: название ТВ, формат, отключение звука, ночной звук и улучшение речи._

### вис-2 и вис 1

Под одним и тем же идентификатором шаблона существует две реализации **Sonos Control.**`tplSonosControl` : React-версия для vis-2 (`src-widgets` ) и оригинальный jQuery-вариант для vis 1 (`widgets/sonos.html` ).

Каждый редактор отображает только один из них. Потому что адаптер заявляет`common.visWidgets` , пропуски vis-2`widgets/sonos.html` полностью загружает виджет React; виджет vis 1 не знает о наборах виджетов React и загружает виджет jQuery. Представления, созданные с помощью виджета vis-1, сохраняют свои`oid` связывание при открытии в vis-2.

vis-2 дополнительно предлагает **Sonos Room** — компактную карту с одной колонкой, обложкой, названием, воспроизведением и громкостью. Последняя кнопка открывает диалоговое окно выбора источника, поэтому с одной карты можно также запустить избранное, плейлист или источник. У vis-1 нет аналога.

В vis-2 каждую часть Sonos Control (комнаты, группы, громкость, библиотека) можно отключить, и виджет может запускаться в конкретной комнате.

### Источники

Поиск **источников** осуществляется через каталог контента колонки: радио TuneIn, музыкальная библиотека, сетевые ресурсы и линейный вход. Музыкальные сервисы отображаются только в том случае, если домохозяйство фактически сообщает о них, а поиск сервисов с каталогом SMAPI (например, Spotify) возможен после однократного входа в систему. Сервисы без такого каталога отображают только то, что уже сохранено в приложении Sonos как избранное или плейлист.

Изображение **с телевизора** отображается только на колонках, имеющих HDMI или оптический вход (Arc, Beam, Playbar, Playbase, Ray, Amp). При подключении к телевизору отсутствуют элементы управления воспроизведением — воспроизведение, пауза, перемотка, следующий и предыдущий треки недоступны; есть функция отключения звука, ночной звук и улучшение речи.

## Виджеты для ioBroker.devices

Помимо виджетов vis, адаптер предоставляет два виджета для панели управления адаптера **ioBroker.devices** . Они добавляются туда с помощью **+ → SONOS player** / **SONOS rooms** , и каждый виджет настраивается с помощью собственного диалога настроек — никаких настроек вручную выбирать не нужно.

**Плеер SONOS** — это одна колонка. В настройках запрашивается экземпляр и колонка; список колонок формируется самим адаптером, поэтому он всегда соответствует устройствам на вкладке _«Устройства SONOS»_ .

| Размер   | Что показано                                                                                 |
| -------- | -------------------------------------------------------------------------------------------- |
| 1x1      | Обложка в качестве фона, комната, заголовок и кнопки воспроизведения/паузы.                  |
| 2x0.5    | Комикс: обложка, заголовок, предыдущий/воспроизвести/следующий, отключить звук               |
| 2х1, 2х2 | Весь плеер: обложка, название, воспроизведение, перемешивание, повтор, прогресс и громкость. |

Кнопки «Обложка», «Прогресс», «Громкость», «Перемешивание/Повтор» и кнопка выбора источника можно отключать по отдельности. На колонке, воспроизводящей звук через телевизионный вход, кнопки управления воспроизведением скрыты, поскольку HDMI-вход не управляется — остается только кнопка отключения звука.

Кнопка «Источник» открывает тот же раздел, что и виджет vis — избранное, плейлисты, очередь воспроизведения, недавно воспроизведенные и доступные для просмотра источники динамика — в виде диалогового окна поверх плитки.

**SONOS Rooms** — это виджет для всей семьи: сколько колонок воспроизводят музыку, что каждая из них воспроизводит и насколько громко. Маленькие размеры отображают счетчик и открывают список в диалоговом окне; 2x1 и 2x2 отображают список напрямую.

В каждой строке также есть кнопка выбора источника, которая открывает меню выбора источника для данного динамика, поэтому можно запустить избранное или плейлист, не покидая общий обзор.

Также происходит формирование групп: кнопка связи на одном динамике помечает его как главный в группе, а кнопка связи на каждом другом динамике затем добавляет его в эту группу или удаляет из нее. Повторное нажатие на главный динамик выходит из этого режима.

## Вкладка «Управление» в административной панели

В настройках экземпляра есть третья вкладка — **«Управление»** . Это тот же плеер, что и в vis, но внутри административной панели: выберите динамик слева и управляйте им справа — воспроизведение, прогресс, громкость, группировка, а также библиотека с избранными треками, плейлистами, очередью воспроизведения, недавно воспроизведенными треками и источниками.

Эта вкладка предназначена для проверки того, действительно ли недавно добавленный динамик отвечает, не выходя из настроек адаптера. Вкладка взаимодействует с запущенным экземпляром, поэтому она остается пустой, пока экземпляр остановлен.

## Страница управления в браузере

Адаптер поставляется со страницей управления для **веб-** адаптера. Она доступна по адресу:

```
http://<ioBroker>:8082/sonos/
```

и предлагает то же самое, что и виджет vis: индикаторы комнат, воспроизводимый контент с привязкой к обложке, управление воспроизведением, прогресс, громкость, флажки группировки и выбор источников с избранными, плейлистами, очередью воспроизведения, недавно воспроизведенными и доступными для просмотра источниками динамика.

Никакого веб-расширения не требуется.`iobroker upload sonos` помещает`www/` Адаптер сохраняет содержимое папки в свое файловое хранилище ioBroker, и веб-адаптер предоставляет его оттуда — его маршрут «всегда» считывает первый сегмент пути URL как имя адаптера. Это тот же механизм, который адаптер уже использует для передачи файла TTS диктору.

Страница взаимодействует с ioBroker через сокет веб-экземпляра, который её обслуживает, поэтому она наследует аутентификацию этого экземпляра и права пользователя. Клиент сокета не входит в комплект поставки: страница запрашивает у веб-адаптера...`socket.io.js` и получает то, что использует данный экземпляр — socket.io или`@iobroker/ws` .

`?instance=sonos.1` закрепляет страницу за одним экземпляром.`?room=Kitchen` Открывает приложение для конкретного говорящего. В противном случае используется первый экземпляр, а последний говорящий запоминается в браузере.

В административной панели страница также отображается в виде плитки в обзоре, рядом с плитками других адаптеров.

## Работа с группами

- Штаты, принимающие решения по работе с группами SONOS:
  - **`coordinator`** : установить/получить координатора, то есть устройство SONOS, которое является главным и координирует группу. Для этого требуется IP-адрес (имя канала) устройства SONOS, которое будет координатором, но с подчеркиванием.`_` вместо точки`.` , поэтому используйте, например,`192_168_0_100` для IP-адреса`192.168.0.100` Если устройство не принадлежит ни к одной группе, то значение равно имени собственного канала (IP-адресу).
  - **`group_volume`** : объем группы
  - **`group_muted`** : статус отключения звука в группе.
  - **`add_to_group`** : Добавьте определенное устройство SONOS к устройству SONOS, к которому относится это состояние. Используйте IP-адрес с подчеркиваниями (см. выше).
  - **`remove_from_group`** : Удалите определенное устройство SONOS из списка устройств SONOS, к которым относится это состояние. Используйте IP-адрес с подчеркиваниями (см. выше).

\*) Эти состояния будут обновлены при внесении изменений в приложение SONOS.

## Использование с адаптером sayIt.

Для использования [адаптера sayit](https://github.com/ioBroker/ioBroker.sayit) с этим адаптером SONOS убедитесь, что [веб-адаптер](https://github.com/ioBroker/ioBroker.web) также создан и запущен. Веб-адаптер необходим для того, чтобы адаптер SONOS мог считывать сгенерированный адаптером sayit MP3-файл.

### Предупреждение: Возможны проблемы со стабильностью при использовании с адаптером sayIt.

Обратите внимание: при использовании функции преобразования текста в речь с адаптером sayIt у этого адаптера SONOS наблюдаются проблемы со стабильностью. Наблюдаемые симптомы:

1. Произвольное изменение объема до 0 или 100 %.
2. Отсутствие реакции после случайного количества последовательностей преобразования текста в речь.

В качестве обходного пути для преобразования текста в речь можно использовать [HTTP API SONOS](https://github.com/jishi/node-sonos-http-api) .

## Избранное и очередь в VIS

Используйте состояния`favorites_list_html` и`queue_html` Для отображения плейлистов и текущей очереди воспроизведения с помощью простого HTML-виджета в VIS. При нажатии на строку плейлист или трек будут воспроизведены немедленно.

Для собственного пользовательского интерфейса доступны те же списки в формате JSON:`favorites_list_array` ,`playlist_list_array` и`queue_array` .`queue` соединяет дорожки запятой и не может быть надежно разделена обратно, поэтому используйте`queue_array` - он несет один`{ artist, title, album, cover }` для каждой дорожки, а индекс записи — это значение для`current_track_number` Отформатируйте таблицу, используя следующие CSS-классы:

### Избранное

- `sonosFavoriteTable` : отверстие любимого стола
- `sonosFavoriteRow` : строки с любимой информацией
- `sonosFavoriteNumber` Количество избранных
- `sonosFavoriteCover` Обложка любимого альбома (скопируйте изображение с помощью`.sonosFavoriteCover img` )
- `sonosFavoriteTitle` Имя любимого человека

### Очередь

- `.sonosQueueTable` : стол с отверстиями
- `.sonosQueueRow` : строки, содержащие информацию о треке
- `.currentTrack` : добавлено в строку, содержащую текущий воспроизводимый трек
- `.sonosQueueTrackNumber` Номер или трек
- `.sonosQueueTrackCover` Обложка альбома (скачать изображение с помощью`.sonosQueueTrackCover img` )
- `.sonosQueueTrackArtist` Имя художника
- `.sonosQueueTrackAlbum` : Название альбома (используйте)`display:none` (если не требуется)
- `.sonosQueueTrackTitle` Название должности

Для длинных списков добавьте`overflow:auto;` или`overflow-y:auto;` Для базового HTML-виджета. Обратите внимание: выделение текущего любимого плеера не поддерживается.

### Пример CSS

```
.sonosFavoriteTable {
    color: #bbb;
    font-size: 12px;
}
.sonosFavoriteRow {
    cursor: pointer;
}
.sonosFavoriteNumber {}
.sonosFavoriteCover img {
    width: 30px;
    height: 30px;
}
.sonosFavoriteTitle {}

.sonosQueueTable {
    color: #bbb;
    font-size: 12px;
}
.sonosQueueRow {
    display: table-row;
    cursor: pointer;
}
.sonosQueueRow.currentTrack {
    color: #fff;
    font-weight: bold;
}
.sonosQueueTrackNumber {}
.sonosQueueTrackCover img {
    width: 30px;
    height: 30px;
    display: table-column;
}
.sonosQueueTrackArtist {
    display: table-row;
}
.sonosQueueTrackAlbum {
    display: none;
}
.sonosQueueTrackTitle {
    display: table-row;
}
```

## Разработка

Рядом с адаптером расположены четыре интерфейса, все они созданы с использованием Vite, причем первые три дополнительно используют федерацию модулей:

| Источники      | Результат сборки    | Загружено пользователем                          |
| -------------- | ------------------- | ------------------------------------------------ |
| `src-widgets/` | `widgets/sonos/`    | вис-2                                            |
| `src-admin/`   | `admin/custom/`     | вкладка **«Управление»** в настройках экземпляра |
| `src-devices/` | `admin/dm-widgets/` | Панель управления ioBroker.devices               |
| `src-web/`     | `www/`              | **веб-** адаптер, по адресу`/sonos/`             |

```bash
npm run npm:all        # install the adapter and all four front-ends
npm run build          # adapter + vis-2 widgets + web page - what CI and npm publish run
npm run build:web      # the control page          -> www/
npm run build:admin    # the Control tab component -> admin/custom
npm run build:devices  # the ioBroker.devices widgets -> admin/dm-widgets
npm run build:all      # everything
```

`admin/custom/`и`admin/dm-widgets/` изменения внесены, поскольку холодная сборка федерации модулей предварительно собирает весь общий стек графического интерфейса и занимает несколько минут — пересоберите их с помощью приведенных выше скриптов всякий раз, когда что-то происходит ниже.`src-admin/` или`src-devices/` Изменено, и зафиксируйте результат.

`src-devices` имеет комплект для разработчиков:`cd src-devices && npm start` открывает виджеты на`http://localhost:3000` против реального администратора ioBroker`localhost:8081` Таким образом, их можно разрабатывать без необходимости каждый раз пересобирать в ioBroker.devices.

`src-web` имеет то же самое:`cd src-web && npm start` отображает страницу управления на`http://localhost:4174` и передает сокет, клиент сокета и изображения-заглушки на веб-экземпляр.`localhost:8082` .

## Что нужно сделать

- Переписать с помощью <https://github.com/svrooij/node-sonos-ts>

## Конфигурация

- Веб-сервер - \[необязательно] Включение или выключение веб-сервера
- Обновление прошедшего времени (мс) — интервал в миллисекундах, определяющий частоту обновления таймера во время воспроизведения игры. (По умолчанию 2000)
- Библиотека Sonos — какая клиентская библиотека взаимодействует с колонками, см. ниже.

### Библиотека Sonos

Адаптер поставляется с двумя клиентскими библиотеками, и в настройках выбирается одна из них. Ничего больше не меняется: состояния, их названия и значения остаются одинаковыми в любом случае.

| Параметр                        | Библиотека        | Статус                                             |
| ------------------------------- | ----------------- | -------------------------------------------------- |
| `sonos-discovery (default)`     | `sonos-discovery` | Что всегда использовал адаптер                     |
| `@svrooij/sonos (experimental)` | `@svrooij/sonos`  | Замена в рабочем состоянии, проходит тестирование. |

`sonos-discovery` С 2022 года программа не выпускалась, и одна из её зависимостей сломала адаптер при запуске, поэтому готовится замена. Она предлагается здесь для того, чтобы её можно было протестировать в реальных домашних условиях — в CI нет оборудования SONOS, а те части, которые задействуются только реальные колонки, не могут быть охвачены тестами.

Если попробуете, интересные ситуации будут включать группировку динамиков и последующее расформирование группы, объявления поверх воспроизводимого контента, запуск избранного трека или плейлиста, подключение саундбара к телевизионному входу и поиск в музыкальном сервисе. **Если что-то пойдет не так, вернитесь к настройкам по умолчанию** и, пожалуйста, сообщите о своих наблюдениях — эта настройка существует для того, чтобы никому не приходилось понижать версию адаптера для восстановления работоспособности.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.2.5 (2026-09-08)
* (@GermanBluefox) Added a control page for the web adapter under `/sonos/`, plus a tile on the admin overview
* (@GermanBluefox) Added the source selection (favorites, playlists, queue, recently played, sources) to all four widgets
* (@GermanBluefox) Added `queue_array`, the play queue as JSON - `queue` joins the tracks with a comma and cannot be split back reliably

### 4.2.2 (2026-09-08)
* (@GermanBluefox) Added two widgets for the `ioBroker.devices` dashboard: SONOS player and SONOS rooms
* (@GermanBluefox) Added a "Control" tab to the instance settings, which plays and groups the speakers directly in admin

### 4.2.0 (2026-09-06)
* (@GermanBluefox) The client library can be switched in the instance settings
* (@GermanBluefox) Added `@svrooij/sonos` as an experimental alternative to `sonos-discovery`
* (@GermanBluefox) The adapter talks to a backend interface now, so both libraries fill the same states

### 4.1.0 (2026-09-06)
* (@GermanBluefox) Added a React implementation of `Sonos Control` for vis-2, plus the new `Sonos room` widget
* (kosmix1980) vis widget: rooms, groups, favorites, playlists, queue, recent tracks and sources
* (kosmix1980) Sources: TuneIn, music library, network shares, line-in and SMAPI catalog search
* (kosmix1980) TV HDMI as a playable source with format, cover, night sound and speech enhancement
* (kosmix1980) Added `playlist_list` / `playlist_list_array` and per-room `recent_tracks`
* (kosmix1980) Group members follow the coordinator's now-playing and transport
* (@GermanBluefox) TV is offered only on speakers that have an HDMI/optical input
* (@GermanBluefox) Music services are listed only when the household reports them
* (@GermanBluefox) Removed the YouTube Music catalog search: it used a private, undocumented Google endpoint
* (@GermanBluefox) Only the group coordinator updates the elapsed time of the group now
* (@GermanBluefox) SMAPI account tokens are stored with restrictive file permissions

### 4.0.3 (2026-08-13)
* (@GermanBluefox) Fixed TTS: without a volume in the file name, the announcement was played with volume 0
* (@GermanBluefox) Fixed the immediate stop of TTS: the state before TTS was not restored and TTS stayed blocked
* (@GermanBluefox) A muted player is unmuted now for the announcement and muted again afterwards
* (@GermanBluefox) An empty value in the `tts` state stops the running announcement
* (@GermanBluefox) The adapter was migrated to TypeScript and is now based on classes
* (@GermanBluefox) The "root" device object is created now by js-controller from io-package.json
* (biglouis) Missing states of the already existing devices will be created at the start
* (VierlingMt) Fixed the error if `favorites_set` was called with an empty value
* (seb2010) Added support for treble and bass information
* (Apollon77) stores the tts files in files instead of binary states

## License

The MIT License (MIT)

Copyright (c) 2014-2026, bluefox <dogafox@gmail.com>

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