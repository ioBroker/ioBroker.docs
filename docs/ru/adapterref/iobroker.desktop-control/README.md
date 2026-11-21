---
chapters: {"pages":{"en/adapterref/iobroker.desktop-control/README.md":{"title":{"en":"ioBroker.desktop-control"},"content":"en/adapterref/iobroker.desktop-control/README.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md":{"title":{"en":"Command reference"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md":{"title":{"en":"Befehlsreferenz"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.desktop-control/README.md
title: ioBroker.desktop-control
hash: VsCU3XTEZQJ1+R+NlJmfNt0M1Z/hosX84BX01SVVlq4=
---
![Логотип](../../../en/adapterref/iobroker.desktop-control/admin/desktop-control.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.desktop-control.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.desktop-control.svg)
![Количество установок](https://iobroker.live/badges/desktop-control-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/desktop-control-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.desktop-control.png?downloads=true)
![Тестирование и выпуск](https://github.com/ipod86/ioBroker.desktop-control/workflows/Test%20and%20Release/badge.svg)

# ioBroker.desktop-control

## Адаптер управления рабочим столом для ioBroker

Управляет компьютерами под управлением Windows через ioBroker: всплывающие окна, программы, звук, преобразование текста в речь, скриншоты, питание, клавиатура/мышь и многое другое. На каждом компьютере запускается небольшой агент **WinCtl** (один исполняемый файл, без установщика); адаптер и агент взаимодействуют через **MQTT** .

Агент описывает себя сам: он публикует все свои команды, параметры и состояния в виде манифеста, а адаптер создает на его основе точки данных. Поэтому новые команды агента появляются без обновления адаптера.

## Требования

- Node.js >= 22.12, js-controller >= 6.0.11, admin >= 7.8.23
- Агент WinCtl на каждом ПК для управления: загрузка `WinCtl.exe` из [релизов](https://github.com/ipod86/WinCtl/releases)
- Больше ничего: адаптер имеет встроенный MQTT-брокер. Вместо него можно использовать существующий брокер (Mosquitto, ioBroker MQTT adapter).

## Настраивать

1. Настройки адаптера: оставить "Встроенный брокер" (по умолчанию порт 1886). При желании можно задать имя пользователя и пароль — агенты должны будут их использовать.
2. Начинать `WinCtl.exe` На ПК. В его настройках введите **IP-адрес сервера ioBroker** , порт (1886) и логин.
3. Каждый ПК отображается как устройство сразу после подключения.

### Брокер: встроенный или существующий

Адаптер и агенты обмениваются всеми данными через MQTT-брокер. Два варианта:

|                    | Встроенный брокер (по умолчанию)                                                     | Существующий брокер                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Макет              | `WinCtl.exe` → **адаптер** (порт 1886)                                               | `WinCtl.exe` → брокер ← адаптер                                                                                                              |
| Настройка адаптера | "Встроенный брокер", порт, необязательные имя пользователя/пароль                    | "Существующий брокер" + адрес, порт и логин брокера.                                                                                         |
| В агенте           | IP-адрес сервера ioBroker, порт 1886, вход через адаптер.                            | адрес, порт и логин брокера                                                                                                                  |
| Подходит для       | В большинстве случаев установка не требуется – больше ничего устанавливать не нужно. | Mosquitto или адаптер ioBroker MQTT уже работают, требуются списки контроля доступа (ACL)/TLS, или же могут использоваться другие программы. |

Встроенный брокер намеренно использует порт 1886, а не 1883, чтобы избежать конфликта с существующим брокером или адаптером MQTT.

## Точки данных

### Обзор

| Точка данных      | Описание                                                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | Адаптер подключен к MQTT-брокеру.                                                                                                       |
| `<pc>.online`     | Агент этого ПК подключен                                                                                                                |
| `<pc>.lastSeen`   | Время последнего сообщения от агента                                                                                                    |
| `<pc>.info.*`     | Информация о ПК (см. ниже)                                                                                                              |
| `<pc>.state.*`    | Значения, указанные агентом (см. Штаты)                                                                                                 |
| `<pc>.event.*`    | События, происходящие на ПК (см. ниже)                                                                                                  |
| `<pc>.cmd.*`      | Одна точка данных на команду (см. Команды)                                                                                              |
| `<pc>.cmd.result` | Результат последней команды, например, ответ. `ask`                                                                                     |
| `<pc>.screenshot` | Путь к последнему скриншоту в файловом хранилище ioBroker, например: `/desktop-control.0/screenshots/<pc>.jpg`                          |
| `<pc>.cmd.wake`   | Включает ПК через функцию Wake-on-LAN – управление осуществляется с помощью адаптера, поэтому функция работает, даже когда ПК выключен. |
| `all.cmd.*`       | Отправляет команду всем компьютерам одновременно. `all.cmd.wake` (пробуждает все выключенные компьютеры)                                 |

### Информация (`<pc>.info.*`)

| Точка данных | Описание                                                                   |
| ------------ | -------------------------------------------------------------------------- |
| `hostname`   | Имя компьютера                                                             |
| `ip`         | IP-адрес                                                                   |
| `version`    | Версия агента                                                              |
| `os`         | версия для Windows                                                         |
| `user`       | Зарегистрированный пользователь                                            |
| `started`    | Время начала работы агента                                                 |
| `mac`        | MAC-адрес сетевой карты (для функции Wake-on-LAN)                          |
| `apps`       | Псевдонимы программ, которые может запустить агент (список в формате JSON) |

### События (`<pc>.event.*`)

Записывается при каждом событии (даже если содержимое одинаково), поэтому это триггер с `change: 'any'` Срабатывает каждый раз. Значение в формате JSON, например. `{"ts":"2026-10-23T12:00:00Z"}`.

| Точка данных                          | Когда                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| `lock` /`unlock`                      | Экран заблокирован/разблокирован                                                           |
| `logon` /`logoff`                     | Пользователь авторизован/выключен                                                          |
| `remote_connect` /`remote_disconnect` | Сеанс удаленного рабочего стола подключен/отключен                                         |
| `suspend` /`resume`                   | Компьютер переходит в режим ожидания / выходит из спящего режима                           |
| `hotkey`                              | Была нажата горячая клавиша из настроек агента: `{"name":"szene_kino","keys":"ctrl+alt+1"}` |

### Команды (`<pc>.cmd.*`)

- **Кнопка:** команды без опций – нажмите для выполнения.
- **Кнопка +`_json` ввод:** команды, все параметры которых являются необязательными (например) `screenshot`, `mute`, `beep` Кнопка работает с настройками по умолчанию. `cmd.<command>_json` выбирает варианты.
- **Ввод:** команды с обязательной опцией. Напишите один из следующих вариантов:
  - **Краткая форма** : просто значение основного параметра, например `Hello` в `cmd.speak`
  - **JSON** с любыми опциями, например: `{"text":"Hello","rate":2}`
  - `true` – запускает команду с параметрами по умолчанию
- В описании объекта каждой точки данных команды перечислены ее параметры и приведен пример.
- Результат отображается в `<pc>.cmd.result`.
- Команды, имеющие отношение к безопасности (например) `shell` Команды, отключенные в агенте, не получают никаких данных; их можно отправлять только через `sendTo`. `run` и `kill` Получить точку данных можно при условии, что агент запускает только программы из своего списка псевдонимов (отключено разрешение на запуск любых программ); `cmd.run` Предлагает псевдонимы в качестве варианта выбора.

<!-- generated:start -->

_Сгенерировано агентом (версия агента 0.6.4). Примеры и описания всех параметров: [docs/COMMANDS.md](/#/docs/adapterref/iobroker.desktop-control/docs/COMMANDS.md) ; в описании объекта каждой точки данных команды перечислены ее параметры и пример._

#### Система

| Командование    | Описание                                                     | Точка данных    | Краткая форма | Параметры |
| --------------- | ------------------------------------------------------------ | --------------- | ------------- | --------- |
| `ping`          | Признак жизни, ответы со временем и версия агента            | кнопка          |               |           |
| `get_state`     | Повторно публикует все значения состояния.                   | кнопка          |               |           |
| `reload_config` | Перезагружает конфигурацию агента и переподключается.        | кнопка          |               |           |
| `exit`          | Останавливает агента                                         | только `sendTo` |               |           |
| `list_commands` | Возвращает список всех команд.                               | кнопка          |               |           |
| `check_update`  | Проверяет наличие более новой версии агента (релизы GitHub). | кнопка          |               |           |
| `update`        | Устанавливает последнюю версию агента и перезапускает агент. | кнопка          |               |           |

#### Мощность и сессия

| Командование      | Описание                                                           | Точка данных                | Краткая форма | Параметры          |
| ----------------- | ------------------------------------------------------------------ | --------------------------- | ------------- | ------------------ |
| `lock`            | Блокирует экран (Win+L)                                            | кнопка                      |               |                    |
| `sleep`           | Поддерживать                                                       | кнопка                      |               |                    |
| `hibernate`       | Впасть в спячку                                                    | кнопка                      |               |                    |
| `shutdown`        | Выключает компьютер                                                | кнопка + `shutdown_json`    | `delay`       | `delay`, `force`  |
| `restart`         | Перезагружает компьютер                                            | кнопка + `restart_json`     | `delay`       | `delay`, `force`  |
| `logoff`          | Выводит пользователя из системы.                                   | кнопка                      |               |                    |
| `cancel_shutdown` | Отменяет запланированное отключение/перезапуск                     | кнопка                      |               |                    |
| `monitor_off`     | Выключает мониторы                                                 | кнопка                      |               |                    |
| `monitor_on`      | Включает мониторы                                                  | кнопка                      |               |                    |
| `screensaver`     | Запускает заставку (ту, что установлена в Windows, или файл .scr). | кнопка + `screensaver_json` | `file`        | `file`             |
| `keep_awake`      | Предотвращает переход в спящий режим и включение заставки.         | кнопка + `keep_awake_json`  | `state`       | `state`, `display` |

#### Программы и окна

| Командование        | Описание                                                               | Точка данных                     | Краткая форма | Параметры                                                                                                                   |
| ------------------- | ---------------------------------------------------------------------- | -------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `run`               | Запускает программу (псевдоним из настроек агента).                    | ввод (только список псевдонимов) | `path`        | `path` \*, `args`, `workdir`, `hidden`, `window` (нормальный/минимизированный/максимизированный), `admin`, `wait`, `timeout` |
| `open`              | Открывает URL-адрес, файл или папку с помощью приложения по умолчанию. | вход                             | `target`      | `target` \*                                                                                                                 |
| `kill`              | Завершает процессы по имени или PID.                                   | ввод (только список псевдонимов) | `name`        | `name`, `pid`                                                                                                              |
| `list_processes`    | Список запущенных процессов                                            | вход                             | `filter`      | `filter`                                                                                                                    |
| `list_windows`      | Список видимых окон                                                    | кнопка                           |               |                                                                                                                             |
| `focus_window`      | Выносит окно на передний план (в заголовке содержится…)                | вход                             | `title`       | `title` \*                                                                                                                  |
| `close_window`      | Закрывает окно (заголовок содержит…)                                   | вход                             | `title`       | `title` \*                                                                                                                  |
| `minimize_all`      | Сворачивает все окна (показывает рабочий стол) или восстанавливает их. | кнопка + `minimize_all_json`     |               | `undo`                                                                                                                      |
| `empty_recycle_bin` | Опустошает корзину для переработки.                                    | кнопка                           |               |                                                                                                                             |
| `shell`             | Выполняет команду PowerShell/cmd и возвращает результат.               | только `sendTo`                  | `command`     | `command` \*, `shell` (PowerShell/CMD), `timeout`                                                                             |

#### Аудио

| Командование    | Описание                                             | Точка данных                  | Краткая форма | Параметры                                                        |
| --------------- | ---------------------------------------------------- | ----------------------------- | ------------- | ---------------------------------------------------------------- |
| `volume`        | Устанавливает общий уровень громкости (0-100).       | вход                          | `level`       | `level` \*                                                       |
| `volume_change` | Изменяет громкость относительно                      | кнопка + `volume_change_json` | `delta`       | `delta`                                                          |
| `mute`          | Отключить звук / Включить звук / Переключить         | кнопка + `mute_json`          | `state`       | `state`                                                          |
| `media`         | Отправляет медиа-клавишу                             | вход                          | `key`         | `key` \* (playpause/next/prev/stop/volume\_up/volume\_down/mute) |
| `speak`         | Преобразование текста в речь                         | вход                          | `text`        | `text` \*, `voice`, `rate`, `volume`, `wait`, `interrupt`        |
| `list_voices`   | Отображает список установленных голосов.             | кнопка                        |               |                                                                  |
| `play_sound`    | Воспроизводит аудиофайл (mp3/wav/wma, путь или URL). | вход                          | `source`      | `source` \*, `wait`                                              |
| `stop_sound`    | Останавливает воспроизведение звука / речь           | кнопка                        |               |                                                                  |
| `beep`          | Простой звуковой сигнал                              | кнопка +`beep_json`           |               | `freq`, `ms`                                                      |

#### Отображать

| Командование    | Описание                                                                                                                                                 | Точка данных              | Краткая форма | Параметры                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `show_image`    | Отображает изображение во всплывающем окне, на весь экран или в углу.                                                                                    | вход                      | `source`      | `source` \*, `base64`, `fit` (содержать/растягивать/центрировать), `mode` (всплывающее окно/полноэкранный режим/угол), `seconds`, `monitor`, `position` (верхний левый/верхний/верхний правый/левый/центральный/правый/нижний левый/нижний/нижний правый), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg`                              |
| `show_video`    | Воспроизводит видео с помощью Edge/Chromium (mp4, WebM и т. д.)                                                                                          | вход                      | `source`      | `source` \*, `loop`, `muted`, `volume`, `controls`, `close_when_done`, `engine` (авто/edge/ie), `mode` (всплывающее окно/полноэкранный режим/угол), `seconds`, `monitor`, `position` (верхний левый/верхний/верхний правый/левый/центральный/правый/нижний левый/нижний/нижний правый), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg` |
| `show_web`      | Отображает веб-страницу (vis, Lovelace, видеопоток с камеры) в Edge/Chromium в окне или на весь экран, а также несколько страниц по очереди (слайд-шоу). | вход                      | `url`         | `url`, `urls`, `interval`, `zoom`, `engine` (авто/edge/ie), `mode` (всплывающее окно/полноэкранный режим/угол), `seconds`, `monitor`, `position` (верхний левый/верхний/верхний правый/левый/центральный/правый/нижний левый/нижний/нижний правый), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg`                                    |
| `show_text`     | Отображает текст в виде наложения.                                                                                                                       | вход                      | `text`        | `text` \*, `seconds`, `size`, `color`, `bg`, `opacity`, `position` (верх/центр/низ), `monitor`, `bold`, `font`, `click_through`, `slot`, `max_width`, `padding`, `margin`                                                                                                                                                                                                                                                        |
| `ask`           | Отображает диалоговое окно с кнопками/полями ввода и возвращает ответ.                                                                                   | вход                      | `text`        | `text` \*, `title`, `buttons`, `input`, `default`, `password`, `timeout`, `width`, `font_size`, `monitor`                                                                                                                                                                                                                                                                                                                       |
| `notify`        | Отображает уведомление Windows.                                                                                                                          | вход                      | `text`        | `text` \*, `title`, `icon` (info/warning/error/none), `seconds`                                                                                                                                                                                                                                                                                                                                                                  |
| `close_popups`  | Закрывает все всплывающие окна, наложения и диалоговые окна.                                                                                             | кнопка                    |               |                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `screenshot`    | Делает снимок экрана (сохраняется в файловом хранилище ioBroker).                                                                                        | кнопка +`screenshot_json` |               | `monitor`, `scale`, `quality`, `format` (jpeg/png), `inline`                                                                                                                                                                                                                                                                                                                                                                    |
| `set_wallpaper` | Устанавливает обои рабочего стола                                                                                                                        | вход                      | `source`      | `source` \*                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `brightness`    | Регулирует яркость (только для встроенных дисплеев ноутбука)                                                                                             | вход                      | `level`       | `level` \*                                                                                                                                                                                                                                                                                                                                                                                                                      |

#### Вход

| Командование    | Описание                                               | Точка данных         | Краткая форма | Параметры                                                                                |
| --------------- | ------------------------------------------------------ | -------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| `start_menu`    | Открывает или закрывает меню «Пуск» (клавиша Windows). | кнопка               |               |                                                                                          |
| `send_keys`     | Отправляет нажатия клавиш (синтаксис SendKeys)         | вход                 | `keys`        | `keys` \*                                                                                |
| `type_text`     | Вводит текст в активное окно                           | вход                 | `text`        | `text` \*                                                                                |
| `mouse`         | Перемещает/щелкает мышью                               | кнопка +`mouse_json` |               | `x`, `y`, `relative`, `click` (нет/один/два), `button` (слева/справа/посередине), `wheel` |
| `clipboard_set` | Задает текст в буфер обмена                            | вход                 | `text`        | `text` \*                                                                                |
| `clipboard_get` | Считывает текст из буфера обмена                       | кнопка               |               |                                                                                          |

\* = обязательно

### Штаты (`<pc>.state.*`)

| Точка данных                      | Тип        | Единица        | Записываемый | Описание                                                                                                       |
| --------------------------------- | ---------- | -------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `state.locked`                    | логический |                |              | Экран заблокирован                                                                                             |
| `state.user_present`              | логический |                |              | Пользователь активен (не заблокирован и ввод данных находится в пределах порогового значения для бездействия). |
| `state.idle`                      | число      | с              |              | Секунды с момента последнего ввода с мыши/клавиатуры                                                           |
| `state.active_window`             | нить       |                |              | Заголовок активного окна                                                                                       |
| `state.active_process`            | нить       |                |              | Процесс активного окна                                                                                         |
| `state.volume`                    | число      | %              | да           | Мастер-том                                                                                                     |
| `state.muted`                     | логический |                | да           | Приглушенный                                                                                                   |
| `state.cpu`                       | число      | %              |              | загрузка ЦП                                                                                                    |
| `state.ram`                       | число      | %              |              | Использование оперативной памяти                                                                               |
| `state.ram_free_gb`               | число      | Великобритания |              | Свободная память                                                                                               |
| `state.uptime_min`                | число      | мин            |              | Время с момента запуска Windows                                                                                |
| `state.battery`                   | число      | %              |              | Уровень заряда батареи (только для устройств с батареей)                                                       |
| `state.charging`                  | логический |                |              | Источник питания подключен (только для устройств с батареей)                                                   |
| `state.monitors`                  | число      |                |              | Количество мониторов                                                                                           |
| `state.ip`                        | нить       |                |              | Локальный IPv4-адрес                                                                                           |
| `state.user`                      | нить       |                |              | Зарегистрированный пользователь                                                                                |
| `state.keep_awake`                | логический |                | да           | keep\_awake active                                                                                             |
| `state.webcam_in_use`             | логический |                |              | Камера используется (например, во время видеозвонка)                                                           |
| `state.webcam_app`                | нить       |                |              | Программа(ы), использующая(ие) камеру                                                                          |
| `state.mic_in_use`                | логический |                |              | Микрофон используется                                                                                          |
| `state.mic_app`                   | нить       |                |              | Программа(ы), использующая(ие) микрофон                                                                        |
| `state.web_url`                   | нить       |                |              | Страница, которую в данный момент отображает show\_web (пусто = нет)                                           |
| `state.update_available`          | логический |                |              | Доступна более новая версия агента (проверяется при запуске и каждые 12 часов).                                |
| `state.latest_version`            | нить       |                |              | Новейшая версия агента доступна на GitHub.                                                                     |
| `state.disk.<drive>_free_gb`      | число      | Великобритания |              | Свободное место на каждом диске, например `disk.C_free_gb`                                                     |
| `state.disk.<drive>_used_percent` | число      | %              |              | Использование на один диск, например `disk.C_used_percent`                                                     |
| `state.proc.<name>`               | логический |                |              | Отслеживаемая программа запущена (в настройках агента "Процессы")                                              |

<!-- generated:end -->

## Скрипты (sendTo)

```js
// command to one PC (device id or host name), the answer is the result of the agent
sendTo('desktop-control.0', 'cmd', { device: 'office-pc', command: 'speak', params: { text: 'Dinner is ready' } }, res => log(JSON.stringify(res)));

// short form for the main parameter
sendTo('desktop-control.0', 'cmd', { device: 'office-pc', command: 'volume', params: 30 });

// question with buttons, waits for the answer (ask timeout from the settings)
sendTo('desktop-control.0', 'cmd', {
    device: 'living-room',
    command: 'ask',
    params: { text: 'Start movie mode?', buttons: ['Yes', 'No'], timeout: 30 },
}, res => log(res.result && res.result.button));

// all PCs, list of devices
sendTo('desktop-control.0', 'cmd', { device: 'all', command: 'lock' });
sendTo('desktop-control.0', 'devices', {}, list => log(JSON.stringify(list)));
```

Ответ имеет следующий вид: `{ ok, command, result, error }`.

## Wake-on-LAN

Агент сообщает MAC-адрес своей сетевой карты; адаптер сохраняет его, поэтому `cmd.wake` Работает также после перезагрузки при выключенном ПК. Требования: функция Wake-on-LAN включена в BIOS/UEFI и в настройках сетевой карты (Диспетчер устройств → сетевая карта → Управление питанием / Дополнительно), ПК подключен кабелем, ioBroker находится в той же сети. Функция «Быстрая загрузка» Windows может препятствовать пробуждению после выключения — отключите её при необходимости.

## Обновление информации об агенте

Агент проверяет наличие новой версии на GitHub при запуске и каждые 12 часов (эту функцию можно отключить в настройках агента, на первой вкладке после подключения). Он **не устанавливается автоматически** , а только сообщает:

- `<pc>.state.update_available` –`true` когда существует более новая версия
- `<pc>.state.latest_version` – самая новая версия на GitHub; установленная версия находится в `<pc>.info.version`

Установка:

- **из ioBroker:** кнопка `<pc>.cmd.update` – Загружает новый исполняемый файл, проверяет контрольную сумму, подменяет его и перезапускает агент. Через несколько секунд компьютер снова подключается к сети с новой версией. `info.version`.
- **На ПК:** значок в трее → пункт меню для проверки обновлений – отображает изменения и спрашивает, следует ли их установить.
- `<pc>.cmd.check_update` Проверяет сразу же, без установки.

Автоматически с помощью скрипта:

```js
on({ id: /^desktop-control\.0\.[^.]+\.state\.update_available$/, val: true }, obj => {
    setState(obj.id.replace('state.update_available', 'cmd.update'), true);
});
```

Требование: исполняемый файл находится в папке, в которую пользователь может записывать данные (например, `C:\Tools\WinCtl` или Загрузки, а не `C:\Program Files`).

## Безопасность

Кто бы ни написал `winctl/+/cmd/#` Управляет ПК. Защитите брокера с помощью логина/пароля и списков контроля доступа (ACL), при необходимости используйте TLS. По умолчанию агент запускает только программы из своего списка псевдонимов. `shell` выключено.

**Встроенный брокер:** он прослушивает все сетевые интерфейсы (`0.0.0.0`) и, пока не задано имя пользователя, принимает всех клиентов — любое устройство в локальной сети может отправлять команды на ПК или поддельные данные агентов. Рекомендуется задать имя пользователя и пароль в настройках адаптера (агенты затем будут входить в систему с их помощью); в качестве альтернативы можно ограничить «Прослушивание» одним сетевым интерфейсом. Без входа в систему адаптер будет регистрировать предупреждение при запуске.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.2 (2026-11-12)
* (ipod86) timeouts are checked in code (invalid values use the default)
* (ipod86) object ids that differ only in case from existing ones are not created (warning in the log)
* (ipod86) security hint and startup warning for the built-in broker without login
* (ipod86) role `media.mute` is kept; manifest states without a command stay read-only
* (ipod86) English documentation (docs/COMMANDS.md, docs/PROTOCOL.md)

### 0.1.1 (2026-10-25)
* (ipod86) release published by the GitHub workflow (trusted publishing); news only for versions on npm; normalized repository URL

### 0.1.0 (2026-10-25)
* (ipod86) first public release: controls Windows PCs via the WinCtl agent over MQTT – built-in MQTT broker, popups, images, videos and web pages (Microsoft Edge), programs, audio and text-to-speech, screenshots, power, keyboard/mouse, Wake-on-LAN, camera/microphone in use, agent update from ioBroker

Older changelogs are available in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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