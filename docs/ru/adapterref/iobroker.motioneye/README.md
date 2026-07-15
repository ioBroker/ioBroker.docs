---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.motioneye/README.md
title: Адаптер ioBroker для MotionEye
hash: MngFxWSppDM8hsTAl4lZqY4xQ01OZrvtxHqVMzRGj9U=
---
![Логотип](../../../en/adapterref/iobroker.motioneye/admin/motioneye.png)

![Количество установок](https://iobroker.live/badges/motioneye-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/motioneye-stable.svg)
![Версия NPM](https://nodei.co/npm/iobroker.motioneye.svg?style=shields&data=v,u,d&color=orange)
![Загрузки](https://img.shields.io/npm/dm/iobroker.motioneye.svg)
![СООБЩЕСТВО](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![ОБСЛУЖИВАЮЩИЙ](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![ИИ](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# Адаптер ioBroker для MotionEye
---

## Что делает этот адаптер
Подключите камеры MotionEye к ioBroker для обнаружения движения, создания снимков и потоковой передачи в реальном времени. Управляйте режимами обнаружения (`off` / `still` / `sharp`) из ioBroker или VIS и предоставляйте `streamUrl` HTML для любого виджета, поддерживающего HTML — для веб-хуков не требуется простой API.

## Документация
- 🇺🇸 [Документация](docs/en/README.md)
- 🇩🇪 [Документация](docs/de/README.md)

Часто задаваемые вопросы и устранение неполадок (Docker/Unraid, `unauthorized`, поток VIS): [[EN](docs/en/faq.md) · [DE]](docs/de/faq.md)

## Функции
- Пользовательские имена камер в ioBroker (независимые от меток MotionEye)
- Динамические каналы в папке `motioneye.0.<name>.*` (названия папок в нижнем регистре)
- Встроенный сервер веб-хуков — без зависимости от simple-api
- Синхронизация API конфигурации MotionEye для режимов и URL-адресов веб-перехватчиков.
- `_info.connection` — экземпляр, показывающий, когда MotionEye недоступен.
- Перепривязка соседних потоков после повторного рендеринга VIS (многокамерные панели мониторинга)

## Точки данных
### Для каждой камеры (`motioneye.0.<name>.*`)
Названия папок каналов пишутся строчными буквами (например, `innenhof_ii`, `auffahrt`).

| Состояние | Тип | Чтение | Запись | Описание |
|-------|------|------|-------|-------------|
| `mode` | значение | да | да | `off` / `still` / `sharp` |
| `snapshot` | кнопка | нет | да | Запустить снимок |
| `stream` | переключатель | да | да | Включение/выключение потоковой передачи MJPEG в реальном времени |
| `streamPulse` | кнопка | нет | да | Кратковременное включение трансляции (автоматическое отключение) |
| `streamUrl` | текст | да | нет | HTML `<img>` для виджета HTML |
| `status` | текст | да | нет | Статус последней синхронизации |
| `lastAction` | текст | да | нет | Последнее действие API |
| `webhookUrl` | url | да | нет | URL записан в MotionEye |
| `motionEyeId` | значение | да | нет | Идентификатор камеры MotionEye |
| `motionEyeName` | текст | да | нет | Оригинальное название в MotionEye |
| `motionEyeName` | текст | да | нет | Оригинальное имя в MotionEye |

### Настройки для каждого устройства камеры (`motioneye.0.<name>.settings.*`)
| Состояние | Тип | Чтение | Запись | Описание |
|-------|------|------|-------|-------------|
| `framerate` | уровень | да | да | Захват частоты кадров в кадрах в секунду |
| `availableResolutions` | текст | да | нет | Поддерживаемые разрешения (разделенные запятыми) |
| `rotation` | уровень | да | да | Поворот видео `0` / `90` / `180` / `270` |
| `autoBrightness` | переключатель | да | да | Автоматическое включение/выключение яркости |
| `privacyMask` | переключатель | да | да | Маска конфиденциальности включена/выключена (области маски отображаются в пользовательском интерфейсе MotionEye; см. [Часто задаваемые вопросы](docs/en/faq.md#device-settings-settings)) |
| `privacyMask` | переключатель | да | да | Маска конфиденциальности включена/выключена (области маски отображаются в пользовательском интерфейсе MotionEye; см. [FAQ](docs/en/faq.md#device-settings-settings)) |

> Параметры яркости/контрастности/насыщенности/оттенка доступны в MotionEye только для локальных камер v4l2/USB, а не для сетевых камер (RTSP/MJPEG), поэтому они не отображаются в виде точек данных.

### Наложение текста для каждой камеры (`motioneye.0.<name>.overlay.*`)
| Состояние | Тип | Чтение | Запись | Описание |
|-------|------|------|-------|-------------|
| `enabled` | переключатель | да | да | Наложение текста вкл/выкл |
| `rightText` | текст (выпадающий список) | да | да | Те же параметры, что и в `leftText` |
| `customLeftText` | текст | да | да | Используется, когда `leftText = custom-text` |
| `customRightText` | текст | да | да | Используется, когда `rightText = custom-text` |
| `textScale` | уровень | да | да | Размер текста, `1`–`10` |
| `textScale` | level | yes | yes | Размер текста, `1`–`10` |

> При установке `leftText`/`rightText` в `custom-text`, также установите `customLeftText`/`customRightText` — в противном случае MotionEye отобразит пустой текст. См. [Часто задаваемые вопросы](docs/en/faq.md#text-overlay-overlay).

Эти параметры также можно предварительно задать для каждой камеры на вкладке конфигурации **Наложение** (удобно при одновременной настройке множества камер). См. [[Конфигурация](#configuration) и [Часто задаваемые вопросы]](docs/en/faq.md#text-overlay-overlay).

### Хранение данных на каждой камере (`motioneye.0.<name>.storage.*`)
| Состояние | Тип | Чтение | Запись | Описание |
|-------|------|------|-------|-------------|
| `snapshotCount` | значение | да | нет | Количество сохраненных снимков |
| `usedSpaceMb` | значение | да | нет | Занятое пространство (снимки + видео), в МБ |
| `lastRefresh` | текст | да | нет | Отметка времени последнего успешного обновления |
| `refresh` | кнопка | нет | да | Запустить обновление сейчас |
| `обновить` | кнопка | нет | да | Запустить обновление сейчас |

Для обновления MotionEye требуется рекурсивное сканирование и проверка каждого сохраненного файла, что может быть медленно для камер с большими медиатеками. Это не входит в обычный опрос состояния — обновляйте вручную с помощью `refresh` или включите медленное автоматическое обновление на вкладке конфигурации **Хранилище** (`storagePollEnabled` + `storagePollIntervalSec`, по умолчанию: отключено), где вы также можете исключить отдельные камеры из этого автоматического обновления, сохраняя при этом доступной точку данных `refresh`, доступную для ручного обновления. См. [Часто задаваемые вопросы](docs/en/faq.md#storage-storage).

### Экземпляр (`motioneye.0._info.*`)
| Штат | Тип | Описание |
|-------|------|-------------|
| `_info.connection` | логическое значение | Доступность MotionEye |
| `_info.lastSync` | текст | Отметка времени последнего опроса статуса |
| `_info.motionEyeVersion` | текст | Версия сервера MotionEye |
| `_info.motionVersion` | текст | Версия демона движения |
| `_info.motionVersion` | текст | Версия демона Motion |

## Установка
1. Установите адаптер через административный интерфейс ioBroker.
2. Создайте новый экземпляр.
3. Настройка **параметров**: хост MotionEye, порты, учетные данные (необязательно), хост веб-перехватчика.
4. Добавьте камеры на вкладке **Камеры** (отображаемое имя, идентификатор MotionEye, необязательная папка с медиафайлами).
5. Сохраните и перезапустите экземпляр — будут созданы точки данных и URL-адреса веб-перехватчиков записаны в MotionEye.

### Совместимость с версиями MotionEye
| MotionEye | Адаптер | Примечания |
|-----------|---------|-------|
| **0.43.x** | 0.4.x или **0.5.0+** | Аутентификация по подписи URL |
| **0.44+** | **0.5.0+** требуется | Вход в сессию (`POST /login`); адаптер 0.4.x показывает `unauthorized`, даже когда веб-вход работает |
| **0.43.x** | **0.5.0+** | Безопасное обновление — обратная совместимость |

Подробности: [Часто задаваемые вопросы EN](docs/en/faq.md#motioneye-044-adapter-050) · [FAQ DE](docs/de/faq.md#motioneye-044-adapter-050)

### Режимы камеры
| Режим | Обнаружение движения | Видеозапись | Веб-перехватчик |
|------|------------------|-----------------|---------|
| `off` | нет | нет | нет |
| `sharp` | да | MP4, активируемый движением | да |
| `четкий` | да | MP4 с датчиком движения | да |

## Конфигурация
| Вариант | По умолчанию | Описание |
|--------|---------|-------------|
| `motionHost` | *(пусто)* | Имя хоста или IP-адрес сервера MotionEye (обязательно) |
| `motionEyeUser` | `admin` | Пользователь, вошедший в MotionEye |
| `motionEyePassword` | *(пусто)* | Пароль MotionEye (в открытом виде, хранится в зашифрованном виде) |
| `webhookHost` | *(обязательно)* | IP-адрес или имя хоста ioBroker, доступного из MotionEye (используется в URL-адресах веб-перехватчиков) |
| `webhookPort` | `8090` | Встроенный порт прослушивателя веб-хуков |
| `motionResetMs` | `15000` | Автоматический сброс для `.motion` после вебхука |
| `statusPollIntervalSec` | `300` | Интервал опроса состояния MotionEye |
| `useMotionEyeConfig` | `true` | Режим записи, URL-адреса веб-перехватчиков и включение/выключение потоковой передачи в MotionEye (оставьте включенным для обычного использования) |
| `useMotionEyeConfig` | `true` | Режим записи, URL-адреса веб-перехватчиков и включение/выключение потоковой передачи в MotionEye (оставьте включенным для обычного использования) |

Для каждой камеры (вкладка «Камеры»): необязательное имя **папки с медиафайлами** в разделе `/var/lib/motioneye` (например, `Bambu` вместо имени по умолчанию `Camera8`). Применяется при запуске адаптера, если включена синхронизация конфигурации. Не переименовывает существующие папки на диске.

`storagePollEnabled` (по умолчанию `false`) и `storagePollIntervalSec` (по умолчанию `3600`) находятся на вкладке **Хранилище**, а не здесь — см. ниже.

### Вкладка "Наложение"
На специальной вкладке **Наложение** предварительно задаются параметры `overlay.*` (включено, текст слева/справа, пользовательский текст, размер текста) для каждой камеры в таблице, содержащей одну строку на каждую камеру, взятой из вкладки «Камеры». Это односторонний процесс, и изменения параметров в реальном времени никогда не считываются обратно в таблицу:

- **Новая камера**: заполненные поля становятся исходным значением точки данных при первом создании.
- **Существующая камера**: заполненные поля вступают в силу только после нажатия кнопки **Применить настройки наложения сейчас** — сохранение/перезапуск не требуется.
— Пустые поля всегда означают «оставить без изменений».

Подробности см. в [Часто задаваемые вопросы](docs/en/faq.md#text-overlay-overlay).

### Вкладка "Хранилище"
На отдельной вкладке **Хранилище** собрана вся информация для `storage.*`: глобальный переключатель/интервал автоматического обновления, таблица с одной строкой на каждую камеру и флажком **Исключить из автоматического обновления** (по умолчанию выключен), а также кнопка **Обновить статистику хранилища сейчас**:

- **Включить автоматическое обновление статистики хранилища** (`storagePollEnabled`, по умолчанию выключено) + **интервал в секундах** (`storagePollIntervalSec`, по умолчанию `3600`): глобальный переключатель и частота автоматического обновления.
- **Флажок «Исключить из автоматического обновления»** (для каждой камеры, по умолчанию снят): установите его для неважных камер с большими медиатеками, чтобы пропустить их при запуске автоматического обновления — их данные `storage.*` все равно будут обновляться в любое время с помощью триггера `storage.refresh`.
- **Обновить статистику хранилища сейчас**: немедленно обновляет данные со всех камер в таблице — сохранение/перезапуск не требуется, и игнорирует флажок «Исключить» (ручное нажатие всегда обновляет все перечисленные камеры).

Подробности см. в [Часто задаваемые вопросы](docs/en/faq.md#storage-storage).

## Поддерживать
Если вам нравится наша работа и вы хотели бы нас поддержать, мы будем благодарны за любое пожертвование.

(Эта ссылка ведет на наш счет PayPal и не связана с ioBroker.)

[![Пожертвовать](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Более старые изменения
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog

<!--
  ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-07-10)
- (skvarel) Fixed `snapshot` action failing with `404 not found` on some MotionEye/Motion combinations: snapshots are now triggered via MotionEye's own authenticated `/action/{id}/snapshot` endpoint (same connection as everything else) instead of a direct, unauthenticated call to Motion's raw webcontrol port. The `motionPort` setting is no longer needed and has been removed.

### 0.9.0 (2026-07-05)
- (skvarel) Per-camera storage stats under `storage.*`: snapshot count, video count, and occupied space in MB (`storage.snapshotCount`, `storage.videoCount`, `storage.usedSpaceMb`, `storage.lastRefresh`), refreshed on demand via `storage.refresh`
- (skvarel) New **Storage** config tab: global auto-refresh on/off switch + interval (`storagePollEnabled`, `storagePollIntervalSec`, off by default), a per-camera "Exclude from auto-refresh" checkbox to skip unimportant cameras, and a button to refresh all listed cameras immediately

### 0.8.0 (2026-07-04)
- (skvarel) New **Overlay** config tab: preset `overlay.*` (enabled/leftText/rightText/customLeftText/customRightText/textScale) per camera in a table, with a button to apply the table to already-running cameras immediately; values only ever flow from the config table to the datapoints, never back, so live datapoint changes are never overwritten on a restart

### 0.7.0 (2026-07-03)
- (skvarel) Per-camera text overlay under `overlay.*`: read and control overlay on/off, left/right text mode (camera name / timestamp / custom text / disabled), custom text strings, and text size (`overlay.enabled`, `overlay.leftText`, `overlay.rightText`, `overlay.customLeftText`, `overlay.customRightText`, `overlay.textScale`); `leftText`/`rightText` and their custom text are always saved together, in any order
- (skvarel) Fixed a race condition where setting two `settings.*` datapoints for the same camera at nearly the same time could silently drop one of the changes ("lost update"); config writes per camera are now serialized

### 0.6.1 (2026-07-03)
- (skvarel) Fixed privacy mask regions not surviving adapter restarts/updates: mask lines are now persisted to the settings channel's native config instead of only in memory

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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