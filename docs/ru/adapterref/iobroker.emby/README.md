---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.emby/README.md
title: ioBroker.emby
hash: s4A5YxBEA/iKR3cZjzRcUPoZQLhJ3hEhTFRf1RABw+4=
---
![Логотип](../../../en/adapterref/iobroker.emby/admin/emby.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.emby)
![Загрузки](https://img.shields.io/npm/dm/iobroker.emby.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.emby)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/emby/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.emby)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.emby/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.emby)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.emby)
![Версия NPM](https://img.shields.io/npm/v/iobroker.emby.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/emby-stable.svg)
![Количество установок](https://iobroker.live/badges/emby-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)

# ioBroker.emby

</br>
**Version:** </br>
</br>
**Tests:** </br>

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub. Установите его из списка адаптеров в административной панели ioBroker. Файлы на GitHub содержат только исходный код, файлы программы создаются при публикации релиза в npm.

## Адаптер Emby для ioBroker

Подключает ioBroker к вашему медиасерверу [Emby](https://emby.media) . В ioBroker вы видите, что воспроизводится в ваших приложениях Emby (телевизор, телефон, планшет, веб-браузер), и можете управлять ими, например:

- В визуализации укажите название и постер текущего фильма или эпизода.
- Поставьте телевизор на паузу, когда зазвонит дверной звонок.
- Показать сообщение на телевизоре («Кто-то стучит в дверь»),
- Убавьте громкость на ночь.

## Кредиты

Создание этого адаптера было бы невозможно без огромной работы @thewhobox <iobroker@mikegerst.de> , который написал первоначальные версии этого адаптера и передал его организации iobroker-community-adapters.

## Быстрый старт

1. **Установите адаптер** из списка адаптеров в административной панели ioBroker и создайте экземпляр.
2. **Создание ключа API в Emby:** откройте веб-интерфейс Emby, перейдите в _«Настройки» (значок шестеренки) > «Дополнительно» > «Ключи API»_ , нажмите _«Новый ключ API»_ (+) и введите имя, например. `ioBroker` Скопируйте ключ. Без ключа вы сможете только видеть, что воспроизводится, но не сможете ничем управлять.
3. **Заполните настройки экземпляра:**
   - _Адрес сервера Emby_ : IP-адрес или имя хоста **с указанием порта** , например: `192.168.0.100:8096` Вы увидите это в адресной строке вашего браузера, когда открыт веб-интерфейс Emby.
   - _Защищенное соединение (https)_ : отмечайте этот пункт только в том случае, если вы открываете Emby с использованием HTTPS. `https://` (например, за обратным прокси-сервером).
   - _Ключ API_ : вставьте ключ из шага 2.
   - Сохраните и закройте. Индикатор экземпляра загорится зеленым, как только будет установлено соединение с сервером.
4. **Откройте приложение Emby** (на телевизоре, телефоне, в браузере) и запустите что-нибудь. Через несколько секунд в дереве объектов появится папка с именем устройства. `emby.0` Emby сообщает только об открытых приложениях, поэтому каждое устройство отображается при первом использовании.
5. **Используйте объекты** из вашей визуализации или скриптов: то, что воспроизводится, находится под ними. `media` Кнопки и настройки для управления устройством находятся ниже. `command` (см. [Объекты](#objects) ).

Требования: сервер Emby (протестировано с версией 4.10), к которому может подключиться ioBroker, Node.js 22.19 или новее, js-controller 6.0.11 или новее, Admin 7.7.22 или новее.

## Настройки

| Параметр                                   | Что это делает                                                                                                                                                                                                     | Рекомендация                                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Адрес сервера Emby                         | IP-адрес или имя хоста сервера Emby с указанием порта.                                                                                                                                                             | например `192.168.0.100:8096`                                                               |
| Защищенное соединение (https)              | Подключается по протоколу HTTPS вместо HTTP.                                                                                                                                                                       | Только если вы откроете Emby с помощью `https://`                                           |
| ключ API                                   | Позволяет ioBroker управлять вашими приложениями Emby. Данные хранятся в зашифрованном виде.                                                                                                                       | Всегда вводите один                                                                        |
| Устройства, которые следует игнорировать   | Устройства, которые не должны отображаться в ioBroker, разделены запятыми. Введите название папки в поле ниже. `emby.0` (или значение `info.deviceId` Уже созданные папки затем можно удалить в дереве объектов.     | Оставьте пустым                                                                            |
| Задержка перед "паузой" / "простоем"       | Когда воспроизведение останавливается, `media.state` Ждет так долго, прежде чем что-то изменится. Между двумя эпизодами состояние остается неизменным. `playing` вместо мерцания.                                    | 500 мс; увеличить (например, до 3000), если состояние по-прежнему мерцает между эпизодами. |
| Интервал обновления                        | Как часто ioBroker запрашивает у сервера текущее состояние всех устройств? Emby и так немедленно сообщает об изменениях; это обеспечивает... `info.lastActivity` Актуально и необходимо для автоматической очистки. | 60 с                                                                                       |
| Удалить устройства, удаленные в Emby       | Если вы удалите устройство в Emby ( _Настройки > Устройства_ ), его папка в ioBroker также будет удалена.                                                                                                          | На                                                                                         |
| Удалите неактивные устройства через (дней) | Удаляет папки устройств, которые не использовались в течение указанного количества дней, например, старых телефонов или браузеров. Скрипты и история настроек этих объектов теряются.                              | 0 (никогда); например, 90, если накопилось много старых устройств.                         |

## Устройства в ioBroker

Каждое приложение Emby получает собственную папку в своей директории. `emby.0` Имя папки формируется на основе идентификатора устройства, который Emby присваивает приложению, поэтому оно остается неизменным после перезагрузок и повторного подключения. Отображаемое имя папки — это имя устройства в Emby; вы можете изменить его в Emby в разделе _«Настройки» > «Устройства»_ .

- Несколько вкладок браузера с Emby считаются одним устройством.
- На выключенных устройствах папка сохраняется. `info.online = false` Таким образом, скрипты и визуализации продолжают работать. Их можно удалить, как описано в [разделе «Настройки»](#settings) , или удалить вручную.
- Длинные идентификаторы устройств (например, веб-браузеров) сокращаются до 16-символьного кода.

### Обновление с версии 2.x до 3.0.0

Вплоть до версии 2.x названия папок представляли собой идентификаторы сессий Emby, которые изменяются при повторном подключении приложения. Начиная с версии 3.0.0, они формируются на основе идентификатора устройства. Существующие объекты автоматически перемещаются при первом запуске (версия 2.x) или сразу после повторного использования приложения (версия 1.3.0), включая значения, настройки истории и назначения комнат/функций. Скрипты, визуализации и псевдонимы, использующие старые идентификаторы, необходимо корректировать; в журнале отображается следующее: `Migrated objects of "…" from <old id> to <new id>` для каждого устройства. Записанные ранее исторические данные остаются под старыми идентификаторами.

## Объекты

Таблицы служат справочным материалом для скриптов и визуализаций. `x` обозначает папку устройства.

### Адаптер

| Объект                 | Описание                                                                         |
| ---------------------- | -------------------------------------------------------------------------------- |
| info.connection        | `true` пока открыто соединение WebSocket с сервером                              |
| сервер.имя             | Название сервера Emby                                                            |
| сервер.версия          | Версия сервера Emby                                                              |
| server.updateAvailable | `true` если доступно обновление сервера                                          |
| server.restartPending  | `true` если сервер необходимо перезапустить (например, после обновления плагина) |
| server.refreshLibrary  | Кнопка: сканирует все библиотеки                                                 |

Состояния сервера считываются каждые 10 минут и требуют наличия ключа API.

### Информация

| Объект                   | Описание                                              | Информация                                                                                                                                |
| ------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| x.info.online            | В данный момент сервер сообщает о наличии сессии.     | `false` после закрытия или отключения клиента                                                                                             |
| x.info.deviceId          | Идентификатор устройства Emby клиента                 |                                                                                                                                           |
| x.info.sessionId         | Текущий идентификатор сессии Emb                      | Изменения при повторном подключении клиента.                                                                                              |
| x.info.deviceName        | Название устройства                                   |                                                                                                                                           |
| x.info.userName          | Имя пользователя, вошедшего в систему на устройстве.  |                                                                                                                                           |
| x.info.supportedCommands | Поддерживаемые клиентом команды (массив JSON)         |                                                                                                                                           |
| x.info.lastActivity      | Время последней активности, зафиксированной сервером. | Временная метка (мс). Emby хранит сессии закрытых клиентов некоторое время, поэтому это показывает, действительно ли клиент используется. |

### СМИ

| Объект                | Описание                                         | Информация                                                                                                                     |
| --------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| x.media.state         | Состояние клиента                                | `playing`, `paused`, `idle`                                                                                                    |
| x.media.title         | Название элемента                                |                                                                                                                                |
| x.media.originaltitle | Оригинальное название                            |                                                                                                                                |
| x.media.description   | Описание товара                                  |                                                                                                                                |
| x.media.type          | Тип товара                                       | `Episode`, `Movie`, `Audio`, `None` …                                                                                          |
| x.media.seriesName    | Название сериала                                 | Только для эпизодов, в остальном пусто.                                                                                        |
| x.media.seasonName    | Название сезона                                  | Только для эпизодов, в остальном пусто.                                                                                        |
| x.media.endtime       | Ожидаемое окончание воспроизведения              | `HH:MM`                                                                                                                        |
| x.media.elapsed       | Позиция воспроизведения в секундах               | `null` Если местоположение неизвестно, Emby сообщает о его изменении только при запуске, паузе, перемотке и при опросе сессии. |
| x.media.duration      | Длительность воспроизведения элемента в секундах | `null` если неизвестно                                                                                                         |
| x.media.rating        | Рейтинг сообщества                               | `null` если неизвестно                                                                                                         |
| x.media.agerating     | Официальный возрастной рейтинг                   |                                                                                                                                |
| x.media.year          | Год производства                                 | `null` если неизвестно                                                                                                         |
| x.media.genres        | Жанры (разделенные запятыми)                     |                                                                                                                                |
| x.media.tags          | Слоган (разделённые запятыми)                    |                                                                                                                                |
| x.media.backdropimage | Теги фонового изображения (разделенные запятыми) |                                                                                                                                |
| x.media.ratio         | Соотношение сторон основного изображения         | `null` если неизвестно                                                                                                         |
| x.media.isMuted       | Клиент отключен                                  | Не все клиенты сообщают об этом.                                                                                               |

### Плакаты

| Объект            | Описание                                   | Информация          |
| ----------------- | ------------------------------------------ | ------------------- |
| x.posters.main    | URL основного постера (фильма или сериала) |                     |
| x.posters.season  | URL сезонного постера                      | Только для эпизодов |
| x.posters.episode | URL изображения эпизода                    | Только для эпизодов |

### Команды

Создано только для клиентов, поддерживающих удаленное управление, и только для команд, которые сообщает клиент.

| Объект                   | Описание                                                                  | Информация                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x.command.play           | Возобновить воспроизведение                                               | Кнопка                                                                                                                                                                                      |
| x.command.pause          | Приостановить воспроизведение                                             | Кнопка                                                                                                                                                                                      |
| x.command.toggleplay     | Переключить воспроизведение/паузу                                         | Кнопка                                                                                                                                                                                      |
| x.command.stop           | Остановить воспроизведение                                                | Кнопка                                                                                                                                                                                      |
| x.command.next           | Следующий элемент (эпизод, трек)                                          | Кнопка                                                                                                                                                                                      |
| x.command.previous       | Предыдущий пункт                                                          | Кнопка. Приложение iOS надежно возвращается к исходному состоянию только после того, как элемент проиграется в течение нескольких минут (см. [Протестированные клиенты](#tested-clients) ). |
| x.command.seek           | Позиция воспроизведения в %                                               | Также отображается текущая позиция; введите значение от 0 до 100, чтобы перейти в эту позицию.                                                                                              |
| x.command.generalCommand | Отправьте любую общую команду через API Emby.                             | JSON, например `{"Name": "SetSubtitleStreamIndex", "Arguments": {"Index": 2}}`. Поддерживаемые клиентом имена находятся в `info.supportedCommands`                                           |
| x.command.mute           | Немой                                                                     | Кнопка                                                                                                                                                                                      |
| x.command.unmute         | Включить звук                                                             | Кнопка                                                                                                                                                                                      |
| x.command.togglemute     | Отключить звук                                                            | Кнопка                                                                                                                                                                                      |
| x.command.goHome         | Перейдите на главный экран                                                | Кнопка                                                                                                                                                                                      |
| x.command.goToSearch     | Откройте поиск                                                            | Кнопка                                                                                                                                                                                      |
| x.command.back           | Вернуться назад                                                           | Кнопка                                                                                                                                                                                      |
| x.command.volume         | Объем 0-100                                                               | Также отображается текущий уровень громкости, сообщаемый клиентом. Приложения для Android TV не изменяют громкость (см. раздел [«Протестированные клиенты](#tested-clients) »).             |
| x.command.message        | Показать короткое сообщение                                               | Текст. Приложения отображают его всего около 2-3 секунд. Для важных сообщений используйте `command.dialog`                                                                                   |
| x.command.dialog         | Отобразить диалоговое окно, которое будет оставаться видимым до закрытия. | `Header\|Text`, без `\|` Заголовок — "ioBroker"                                                                                                                                             |

## Сообщения из скриптов (sendTo)

Отображает сообщение на экране клиента, например, при звонке в дверь:

```js
sendTo('emby.0', 'message', {
    text: 'Someone is at the door',
    header: 'Doorbell', // optional, default "ioBroker"
    timeoutMs: 10000, // optional; without it the message stays until it is closed (recommended)
    device: 'Living room TV', // optional: device name, object ID, device ID or session ID; without it all connected clients that can show messages
}, result => log(JSON.stringify(result))); // { result: 'ok', sent: ['<object id>', ...] } or { error: '...' }
```

Также принимается обычная строка: `sendTo('emby.0', 'message', 'Hello')`.

Продолжительность сохранения сообщения определяется приложением: с помощью `timeoutMs` Все протестированные приложения отображали это только в течение 2-3 секунд, независимо от значения. Без этого `timeoutMs` Сообщение остаётся до тех пор, пока не будет закрыто (в веб-клиенте в виде всплывающего окна). Для дверного звонка опустите следующее: `timeoutMs`.

## Протестированные клиенты

Адаптер отправляет одни и те же команды каждому клиенту; дальнейшие действия зависят от приложения Emby. Протестировано с Emby Server 4.10.2:

|                                                                    | Веб-клиент (Firefox) | телефон на Android | iPad (iOS)                                                                                                                                         | Android TV (NVIDIA Shield, Fire TV)                  |
| ------------------------------------------------------------------ | -------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Воспроизвести, пауза, остановка, перемотка, следующий              | ✓                    | ✓                  | ✓                                                                                                                                                  | ✓                                                    |
| Предыдущий                                                         | ✓                    | ✓                  | Воспроизведение должно завершиться только через несколько минут, в противном случае приложение перезапустит воспроизведение или перемотает вперед. | ✓ (проверено после нескольких минут воспроизведения) |
| Громкость, отключение звука                                        | ✓                    | ✓                  | ✓                                                                                                                                                  | – (без эффекта)                                      |
| Сообщение с отображением времени (`command.message`, `timeoutMs`) | примерно 2-3 с       | примерно 2-3 с     | примерно 2-3 с                                                                                                                                     | примерно 2-3 с                                       |
| Диалог (`command.dialog` сообщение без `timeoutMs`)                | ✓ (всплывающее окно) | ✓                  | ✓                                                                                                                                                  | ✓                                                    |

Веб-браузеры могут блокировать воспроизведение, начатое без щелчка мышью во вкладке (автовоспроизведение).

## Проблемы?

| Проблема                                                                         | Решение                                                                                                                                                                                             |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Состояние объекта остается красным/желтым.                                       | Проверьте адрес и порт (открыты). `http://<address>` в браузере в той же сети) и в настройке _«Защищенное соединение»_ . В журнале экземпляра отображается причина.                                  |
| Устройство не отображается                                                       | Emby сообщает только об открытых приложениях. Откройте приложение Emby или веб-интерфейс и запустите что-нибудь. Убедитесь, что устройство не находится в _списке «Устройства для игнорирования»_ . |
| Нет никакого `command` папка / кнопки ничего не делают                            | Введите ключ API. Некоторые приложения вообще не поддерживают удаленное управление; поддерживаемые приложением команды перечислены в `info.supportedCommands`.                                      |
| Функции регулировки громкости и отключения звука не влияют на работу телевизора. | Приложения Emby для Android TV (NVIDIA Shield, Fire TV) игнорируют эти команды, см. [раздел «Протестированные клиенты»](#tested-clients) .                                                          |
| Сообщение исчезает через 2-3 секунды.                                            | Это решает приложение. Используйте `command.dialog` или `sendTo` без `timeoutMs` См. [Сообщения из скриптов](#messages-from-scripts-sendto) .                                                          |
| `media.state` переходит к `idle` между двумя эпизодами                            | Увеличьте _задержку перед состоянием "пауза" / "ожидание"_ .                                                                                                                                        |
| Старые устройства накапливаются                                                  | Удалите их в Emby ( _Настройки > Устройства_ ) или установите параметр _«Удалять неактивные устройства через (дней)»_ .                                                                             |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.1.2 (2026-11-17)
- (Schimi1983) Repository checker suggestions: @iobroker/testing updated to 6.3.2, .vscode/settings.json with JSON schemas added
- (Schimi1983) README rewritten for users without technical background (quick start, settings with recommendations, problem solving); texts of the settings page made clearer in all languages

### 3.1.1 (2026-11-04)
- (Schimi1983) Roles of existing states corrected to the official ioBroker state roles (e.g. button.play, media.genre, media.cover, text); object IDs and values are unchanged

### 3.1.0 (2026-11-03)
- (GermanBluefox) Repository maintenance: added email to copyright line in README and LICENSE (#330)
- (Schimi1983) New commands stop, next, previous, seek (in %) and generalCommand; new states media.elapsed and media.duration
- (Schimi1983) New server states (name, version, update available, restart pending) and button to scan all libraries
- (Schimi1983) Messages can be sent from scripts with sendTo('emby.0', 'message', {...})

### 3.0.0 (2026-10-29)
- (Schimi1983) **BREAKING:** Clients are identified by the Emby device ID instead of the session ID, so the object IDs no longer change when a client reconnects. Existing objects including values, history settings and room/function assignments are migrated automatically; scripts and visualisations using the old IDs have to be adjusted (see README)
- (Schimi1983) New states info.deviceId and info.sessionId; several sessions of one client (e.g. browser tabs) are shown as one device
- (Schimi1983) Objects that older versions created for ioBroker connections (other instances, version 1.3.0) are removed and no longer created
- (Schimi1983) Integration test against a mock Emby server added

### 2.0.0 (2026-10-29)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (Schimi1983) Connection is re-established after the server closes it (e.g. server restart), KeepAlive is sent, info.connection reflects the real state
- (Schimi1983) Only "Sessions" messages are processed as sessions, invalid messages no longer cause errors
- (Schimi1983) Fixed command.volume (always failed), command.unmute is created for clients reporting "Unmute"
- (Schimi1983) Messages and dialogs with quotes or line breaks work now
- (Schimi1983) Commands use https if SSL is enabled, API key is sent as header and no longer logged
- (Schimi1983) API key is stored encrypted, an existing key is converted automatically (one restart)
- (Schimi1983) New states info.online and info.lastActivity per session; sessions that disappear are reset to idle
- (Schimi1983) Current sessions are read via REST right after connecting, the server pushes them only on the next change
- (Schimi1983) Sessions are polled every 60 s (configurable) to keep info.lastActivity current
- (Schimi1983) Optional cleanup: objects of clients deleted in Emby (default on) or inactive for a configurable number of days (default off) are removed
- (Schimi1983) Object types of buttons fixed, empty numbers are written as null, states are only written on change
- (Schimi1983) Dependencies "request" and "websocket" replaced by native fetch and WebSocket
- (Schimi1983) API key is entered in a password field
- (Schimi1983) The adapter no longer shows up as its own device, it connects with a device ID per instance
- (Schimi1983) Objects of an old session are removed when the same client connects with a new session ID
- (Schimi1983) Command states are created as soon as a client reports remote control support, not only on adapter start
- (Schimi1983) Device names follow the display name set in the Emby dashboard; REST calls use the adapter's device ID so they do not appear as an extra client
- (Schimi1983) README updated: configuration, all objects, broken CodeQL badge removed
- (Schimi1983) Admin UI migrated to jsonConfig (based on #275), API key is entered in a password field, short-form i18n files
- (GermanBluefox) Dependencies updated (@iobroker/adapter-core 3.4.3)
- (GermanBluefox) Package content defined via "files" in package.json, tsconfig added for type checking
- (GermanBluefox) The adapter was refactored to TypeScript

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2023 thewhobox <admin@mikegerst.de>

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