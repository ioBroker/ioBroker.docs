---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.dune-hd-remote/README.md
title: ioBroker.dune-hd-remote
hash: hrNpuqf2X/dmmuNWLYcD1naPNozwZxs6BsIZSo1qtoE=
---
# IoBroker.dune-hd-remote
![Логотип](../../../en/adapterref/iobroker.dune-hd-remote/admin/dune-hd-remote.png)

Управляйте медиаплеерами [Дюна HD](https://dune-hd.com/) через IP-сеть с помощью ioBroker.

[Дюна HD](https://dune-hd.com/) производит высококачественные сетевые медиаплееры, поддерживающие воспроизведение 4K HDR, Blu-ray и широкий спектр медиаформатов. Все плееры Dune HD на базе Linux поддерживают управление по IP через HTTP API, который данный адаптер использует для обеспечения полного удаленного управления из ioBroker.

## Функции
- Полное управление воспроизведением (воспроизведение, пауза, остановка, перемотка, предыдущая/следующая композиция, перемотка вперед/назад)
- Навигация (D-pad, Enter, Return, меню)
- Регулировка громкости и отключение звука
- Опрос состояния (состояние проигрывателя, позиция, продолжительность, громкость, битрейт, язык аудио, разрешение видео)
— Встроенный веб-пульт PWA — используйте свой телефон в качестве пульта дистанционного управления.
- Интеллектуальный опрос в автономном режиме — снижает частоту опроса, когда игрок недоступен.
- Ввод текста в PWA — отправка текста непосредственно на экранную клавиатуру игрока.
- PWA Play URL — запуск воспроизведения мультимедиа с любого URL-адреса непосредственно с пульта дистанционного управления.

## Поддерживаемые модели
Все медиаплееры Dune HD с поддержкой IP-управления (прошивка на базе Linux).
Протестировано на: **Dune HD Pro 4K** (прошивка с форматом ответа XML).

| Тип модели | Порт по умолчанию |
|---|---|
| На базе Linux (Pro 4K, Solo 4K и т. д.) | 80 |
| На базе Android/ATV | 11080 |

## Конфигурация
### Игрок
| Поле | Описание |
|---|---|
| Имя игрока | Отображаемое имя (только для справки) |
| IP-адрес плеера | IP-адрес плеера Dune HD |
| Порт плеера | HTTP-порт (по умолчанию: 80) |
| Таймаут соединения | Время ожидания запроса в мс (по умолчанию: 5000) |

### Опрос состояния
| Поле | Описание |
|---|---|
| Включить опрос состояния | Включить периодические обновления состояния |
| Интервал опроса | Интервал в секундах, когда игрок находится в сети (по умолчанию: 5) |
| Интервал опроса в автономном режиме | Интервал в секундах, когда игрок недоступен (по умолчанию: 30) |

### Пульт дистанционного управления PWA
Включите встроенный веб-пульт дистанционного управления, чтобы управлять плеером из любого браузера или мобильного устройства.

| Поле | Описание |
|---|---|
| Включить удаленное управление PWA | Запустить встроенный веб-сервер |
| IP-адрес для привязки | Сетевой интерфейс для привязки (0.0.0.0 = все интерфейсы) |
| Порт PWA-сервера | Порт для удаленного веб-сервера (по умолчанию: 8765) |

После включения откройте `http://<iobroker-host>:8765/` в вашем браузере.
URL также сохраняется в состоянии `info.pwaUrl`.

**Особенности PWA:**

- Главная вкладка: крестовина, элементы управления воспроизведением, громкость, перемотка
- Главная вкладка: поле ввода текста — отправляет текст на клавиатуру активного игрока (API `set_text`)
- Главная вкладка: Поле «URL воспроизведения» — запускает воспроизведение медиафайлов с любого URL (API `launch_media_url`)
- Вкладка «Цифры»: цифровые клавиши, цветные кнопки (A/B/C/D), субтитры, масштабирование, извлечение диска, запись.
- Вкладка «Настройки»: темная/светлая тема, параметры подключения.
- Работает как устанавливаемое PWA на iOS и Android (добавляется на главный экран)

### Плагин уведомлений Dune
Отображать уведомления от ioBroker **поверх видео** во время воспроизведения.
Требуется установленный на плеере PHP-плагин **dune-notify** (см. папку `dune-notify/`).

| Поле | Описание |
|---|---|
| Включить уведомления | Включить интеграцию с dune-notify |
| Время ожидания запроса | Время ожидания HTTP-запроса в мс (по умолчанию: 3000) |

## Штаты
| Штат | Тип | Описание |
|---|---|---|
| `info.connection` | логическое значение | Доступен ли игрок |
| `info.playerModel` | строка | Название модели игрока |
| `info.firmwareVersion` | строка | Версия прошивки |
| `status.playerStatus` | строка | воспроизводится / остановлено / приостановлено |
| `status.position` | номер | Позиция воспроизведения (секунды) |
| `status.duration` | число | Общая продолжительность (секунды) |
| `status.volume` | номер | Уровень громкости |
| `status.mute` | логическое значение | Состояние отключения звука |
| `status.caption` | строка | Название текущего медиафайла |
| `status.audioLang` | строка | Язык аудио |
| `status.videoWidth/Height` | число | Разрешение видео |
| `status.bitrate` | число | Текущая скорость передачи данных (бит/с) |
| `control.play/pause/stop` | логическое значение | Запуск действий воспроизведения |
| `control.volume` | номер | Установить громкость |
| `navigation.up/down/left/right/ok/back` | логическое значение | Кнопки навигации |
| `media.playUrl` | строка | Воспроизвести медиафайл по URL |
| `media.seek` | число | Перейти к позиции (секунды) |
| `notify.send` | строка | Отправить уведомление (текст или JSON) |
| `notify.hide` | логическое значение | Скрыть текущее уведомление |
| `notify.lastResult` | строка | Результат последнего запроса на уведомление |
| `notify.lastResult` | строка | Результат последнего запроса на уведомление |

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.2.1
- Fix E8915: add dependabot cooldown (7 days) to reduce supply chain risk
- Fix deploy step: use Node.js 24 for trusted publishing compatibility
- Remove redundant `eslint` and `prettier` devDependencies (included via `@iobroker/eslint-config`)
- Add manufacturer link and device description to README
- Add CHANGELOG_OLD.md for older changelog entries

### 1.2.0
- Add dune-notify plugin integration: show notifications on screen during playback
- New states: `notify.send`, `notify.hide`, `notify.lastResult`
- New config options: `notifyEnabled`, `notifyTimeout`

### 1.1.5
- Fixed README: added missing changelog entry for 1.1.4

### 1.1.4
- Fixed README changelog (E6006), added `needs: check-and-lint` to adapter-tests job (S3014)

### 1.1.3
- Use standard workflow and testing scripts as provided by create-adapter
- Added `needs: check-and-lint` to adapter-tests job
- Restructured test directory to match ioBroker.example template

### 1.1.2
- Use `node:` prefix for all built-in Node.js modules (fs, http, path, url)

### 1.1.1
- Fixed prettier formatting errors in lib files
- Added `test:integration` script for CI/CD compatibility

For older changelog entries see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT © 2026 sadam6752-tech

Copyright (c) 2026 sadam6752-tech <sadam6752@gmail.com>