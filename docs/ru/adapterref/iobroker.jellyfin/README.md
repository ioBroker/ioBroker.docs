---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.jellyfin/README.md
title: ioBroker.jellyfin
hash: LXNQZh8RGfjeUghOkVbk4eOPUTEbrGRDMbIjUpRKWbM=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.jellyfin.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.jellyfin.svg)
![Количество установок](https://iobroker.live/badges/jellyfin-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/jellyfin-stable.svg)
![Тестирование и выпуск](https://github.com/Schimi1983/ioBroker.jellyfin/workflows/Test%20and%20Release/badge.svg)
![Спонсоры GitHub](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)
![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white)

<img src="admin/jellyfin.png" alt="Logo" width="100">

# ioBroker.jellyfin

**🇩🇪 Deutsche Anleitung: [docs/de/README.md](https://github.com/Schimi1983/ioBroker.jellyfin/blob/main/docs/de/README.md)**

Просматривайте контент, воспроизводимый в ваших приложениях [Jellyfin](https://jellyfin.org) , и управляйте им из ioBroker — ставьте фильм на паузу, когда звонит дверной звонок, приглушайте свет, когда начинается фильм, или отображайте обложку в своей визуализации.

## Что вы можете сделать

- В каждом приложении Jellyfin (телевизор, телефон, браузер) вы можете увидеть, что воспроизводится: название, сериал, серия, обложка, позиция.
- Начинать фильм, сериал, эпизод, альбом или песню с его названия.
- Воспроизведение, пауза, остановка, перемотка вперед и назад, переход к нужной позиции
- Изменить громкость или отключить звук
- Вывести сообщение на экран телевизора (например, «Кто-то стучит в дверь»).
- Начните сканирование ваших библиотек

## Что вам нужно

- Сервер Jellyfin, версия 12 или новее.
- Приложение Jellyfin на устройствах, которые вы хотите просматривать или контролировать.

## Настройка в 3 шага

1. **Создайте ключ в Jellyfin:** откройте Jellyfin в браузере → **Панель управления** → **Ключи API** → **+** , дайте ему имя. `ioBroker` и скопируйте ключ.
2. **Установите адаптер** в ioBroker и откройте настройки экземпляра.
3. **Введите адрес сервера** точно так же, как вы открываете Jellyfin в браузере (с указанием порта, например). `http://192.168.1.10:8096`) и **ключ** , затем сохраните.

Вот и всё. Каждое приложение Jellyfin, подключенное к серверу, теперь отображается как устройство ниже. `jellyfin.0`.

## Используя значения

Каждое устройство имеет три папки:

| Папка     | Что в нём содержится?                                                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info`    | Название устройства, приложения, пользователя, подключено ли оно и можно ли им управлять.                                                                        |
| `media`   | Что показывают: `state` (воспроизведение / пауза / остановка), `title`, `series`, `season`, `episode`, `cover`, `elapsed`, `duration`, и `seek`, `volume`, `mute` |
| `command` | Кнопки: `play`, `pause`, `playPause`, `stop`, `next`, `previous`, `forward`, `rewind`, `volumeUp`, `volumeDown`, `toggleMute`, `playTitle` и `message`             |

**Примеры**

- **Приглушите свет, когда начинается фильм:** отреагируйте на `jellyfin.0.<device>.media.state` изменение на `play`.
- **Начать фильм:** ввести его название в `jellyfin.0.<device>.command.playTitle` например `Home Alone`.
- **Пауза при звонке в дверь:** установить `jellyfin.0.<device>.command.pause` к `true`.
- **Сообщение на телевизоре:** напишите текст в `jellyfin.0.<device>.command.message`.
- **Покрытие в VIS:** использовать `jellyfin.0.<device>.media.cover` в качестве адреса изображения.
- **Перейти к середине:** написать `50` в `media.seek` (процент от фильма).

Ниже `jellyfin.0.server` Вы видите версию сервера, информацию о наличии ожидающих обновления или перезапуска, количество подключенных и работающих устройств, а также кнопку. `refreshLibrary` просканировать все библиотеки.

## Полезно знать.

- **Одно устройство, два подключения:** приложения Jellyfin для телефонов, планшетов и телевизоров дважды регистрируются на сервере (приложение и его плеер). Адаптер объединяет оба устройства в одно: вы видите то, что отображает плеер, а команды передаются в приложение.
- **На экране устройства отображается сообщение «не поддается управлению»** (`info.remoteControl` ( = false) Хотя приложение открыто: перезапустите приложение. Если это не поможет, выйдите из приложения и войдите снова.
- Регулировка **громкости** на каждом устройстве работает по-разному:

| Устройство                                             | Значение объема            | Громче / тише | Немой                                                  |
| ------------------------------------------------------ | -------------------------- | ------------- | ------------------------------------------------------ |
| Браузер                                                | ✔                          | ✔             | ✔                                                      |
| Приложение для ТВ (Fire TV, NVIDIA SHIELD, Android TV) | ✘ всего лишь маленький шаг | ✔             | ✔ (не в том случае, если звук поступает на AV-ресивер) |
| Приложение для телефона/планшета                       | ✘ (громкость системы)      | ✘             | ✔                                                      |

- **Приложение для Android-смартфона:** при использовании встроенного плеера (по умолчанию) вы видите, что воспроизводится, но приложение не принимает команды. Дистанционное управление работает с **веб-плеером** (настройки приложения) – фильм, запущенный через ioBroker, ждет, пока вы один раз нажмете кнопку воспроизведения на телефоне.
- **Приложение для iPad:** работает сразу после установки, фильм, запущенный через ioBroker, воспроизводится немедленно.
- **Сообщения:** Приложения для телевизоров скрывают сообщения с указанием времени отображения через 2–3 секунды, независимо от установленного времени. В браузере сообщения без указания времени отображения остаются до тех пор, пока не будут закрыты.
- **На экране устройства отображается сообщение «не подключено»:** приложение закрыто или устройство выключено. Как только приложение снова подключится, все обновится автоматически.
- Команда отправляется только в том случае, если приложение принимает её в данный момент. В противном случае вы увидите короткую заметку в журнале.
- **Старые устройства** никогда не удаляются автоматически, поэтому ваши скрипты и ссылки VIS сохраняются, даже если устройство некоторое время выключено. Вы можете удалить устройство, которое больше не используете, на вкладке **«Объекты»** .
- **Параметр «Показывать только управляемые устройства»:** новые устройства добавляются только в том случае, если они принимают команды. Уже существующие устройства сохраняются — удалите их на вкладке **«Объекты»** , если они вам не нужны.

## Вопросы и проблемы

- **"Сервер Jellyfin отклонил ключ API"** — проверьте ключ или создайте новый в панели управления Jellyfin.
- **"Jellyfin не найден по этому адресу"** — проверьте адрес, порт и — если Jellyfin работает за обратным прокси-сервером — путь (например, `https://example.com/jellyfin`).
- **"Не удается связаться с сервером Jellyfin"** — запущен ли сервер и доступен ли он с компьютера ioBroker?
- **"Jellyfin… не поддерживается"** – для работы адаптера требуется Jellyfin 12 или более поздняя версия, пожалуйста, обновите сервер.
- Что-нибудь ещё? Пожалуйста, создайте [заявку](https://github.com/Schimi1983/ioBroker.jellyfin/issues) и добавьте лог (уровень логирования: _debug_ ).

<details>
<summary>For advanced users</summary>

### Все состояния устройства

| Состояние                                                                                                                                | Тип        | Доступ        | Описание                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `info.name`                                                                                                                              | нить       | читать        | название устройства                                                                                                          |
| `info.client` /`info.version`                                                                                                            | нить       | читать        | приложение и версия                                                                                                          |
| `info.user`                                                                                                                              | нить       | читать        | Пользователь Jellyfin                                                                                                        |
| `info.reachable`                                                                                                                         | логический | читать        | Сессия существует на сервере                                                                                                 |
| `info.remoteControl`                                                                                                                     | логический | читать        | В данный момент сессия принимает команды.                                                                                    |
| `info.lastActivity`                                                                                                                      | число      | читать        | Последняя активность (временная метка в мс)                                                                                  |
| `media.state`                                                                                                                            | нить       | читать        | `play`, `pause`, `stop`                                                                                                      |
| `media.title`, `media.type`, `media.series`, `media.season`, `media.episode`, `media.artist`, `media.album`, `media.genre`, `media.year` | нить       | читать        | текущий товар                                                                                                                |
| `media.cover`                                                                                                                            | нить       | читать        | URL обложки (вход в систему не требуется)                                                                                    |
| `media.duration` /`media.elapsed`                                                                                                        | число (ы)  | читать        | длина и положение                                                                                                            |
| `media.seek`                                                                                                                             | число (%)  | чтение/запись | позицию в процентах, написать для перехода                                                                                   |
| `media.volume`                                                                                                                           | число (%)  | чтение/запись | объем (заполняется только в том случае, если приложение сообщает о своем объеме)                                             |
| `media.mute`                                                                                                                             | логический | чтение/запись | Отключить звук (заполняется только в том случае, если приложение сообщает о его громкости)                                   |
| `media.repeat`                                                                                                                           | число      | чтение/запись | `0` выключенный, `1` все, `2` один (заполняется только если приложение это поддерживает)                                       |
| `media.itemId`                                                                                                                           | нить       | читать        | Идентификатор Jellyfin текущего элемента                                                                                     |
| `command.*`                                                                                                                              | логический | писать        | кнопки                                                                                                                       |
| `command.playTitle`                                                                                                                      | нить       | чтение/запись | название (поиск, предпочтительно точное совпадение; сериал начинается с первого эпизода) или идентификатор элемента Jellyfin |
| `command.message`                                                                                                                        | нить       | чтение/запись | текст или JSON `{"text":"…","header":"…","timeoutMs":5000}`                                                                  |
| `command.generalCommand`                                                                                                                 | нить       | чтение/запись | любая команда Jellyfin, например `GoHome` или `{"Name":"SetVolume","Arguments":{"Volume":"30"}}`                               |

Идентификаторы устройств: браузеры используют свой собственный (сокращенный) идентификатор; приложения идентифицируются по названию приложения, имени устройства и имени пользователя (16-символьный хеш), поэтому оба подключения приложения завершаются на одном и том же устройстве.

### Сообщение, отправленное по скрипту.

```typescript
// all devices that can show messages
sendTo('jellyfin.0', 'message', { text: 'Someone is at the door', header: 'Doorbell' });
// one device (object id or part of the device name)
sendTo('jellyfin.0', 'message', { text: 'Dinner is ready', device: 'SHIELD' }, (res) => log(JSON.stringify(res)));
```

Ответ `{ sent: <number of devices>, errors: [...] }`.

### Экспертные настройки

В настройках экземпляра при включенном экспертном режиме отображаются следующие параметры: интервал обновления (как часто сервер отправляет статус воспроизведения, по умолчанию 5 с), высота обложки (по умолчанию 300 пикселей, 0 = оригинал) и время ожидания запроса.

</details>

## Поддерживать

Адаптер бесплатен и останется бесплатным. Если он вам полезен и вы хотите выразить благодарность, вы можете поддержать разработку:

Сообщения об ошибках и предложения в разделе ["Проблемы"](https://github.com/Schimi1983/ioBroker.jellyfin/issues) также очень помогают.

## Отказ от ответственности

Jellyfin — это проект свободного программного обеспечения. Данный адаптер не связан с проектом Jellyfin и не поддерживается им. Логотип Jellyfin является собственностью авторов Jellyfin ( [jellyfin-ux](https://github.com/jellyfin/jellyfin-ux) ) и распространяется по лицензии [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) .

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.7 (2026-11-20)

- (Schimi1983) The elapsed time (`media.elapsed`, `media.seek`) now counts on every second while playing, instead of jumping with each report of the server

### 0.1.6 (2026-11-16)

- (Schimi) Outdated value lists of states are replaced without `setObject()` (repository checker S5054)
- (Schimi) Errors while marking devices as not connected after a lost connection are logged instead of being swallowed

### 0.1.5 (2026-11-12)

- (Schimi) Devices that are offline at adapter start also get the updated objects (`media.repeat` as number, `info.client` role) and their old repeat value is converted

### 0.1.4 (2026-11-12)

- (Schimi) **Changed:** `media.repeat` is now a number with role `media.mode.repeat` (0 off, 1 all, 2 one) instead of the Jellyfin names; scripts that write `RepeatNone`/`RepeatAll`/`RepeatOne` keep working
- (Schimi) Device ids that contain uppercase letters are hashed, so two ids can never differ only in case
- (Schimi) The connection to Jellyfin is given up and retried if it cannot be opened within the request timeout
- (Schimi) `info.client` uses the role `text`

### 0.1.3 (2026-11-01)

- (Schimi) Existing installations also get the translated names of `info` and `info.connection`

## License

MIT License

Copyright (c) 2026 Schimi <github@world-mg.de>

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