---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.assistant-satellite/README.md
title: ioBroker.assistant-satellite
hash: SMwPC8GqLB2hN4xQpJ0Eh20mFqyjz5cNlmBdTZ/frcE=
---
<img src="admin/assistant-satellite.svg" alt="ioBroker.assistant" width="200"/>

# IoBroker.assistant-satellite
Адаптер ioBroker, который превращает хост, на котором он работает, в **голосовой сателлит** для [`ioBroker.assistant`](https://github.com/ioBroker/ioBroker.assistant): он распознает кодовое слово, передает сигнал с микрофона на голосовой сервер голосового помощника и воспроизводит произнесенный ответ.

Это тонкая оболочка для автономного пакета [`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite) — используйте этот адаптер, если на сателлитном устройстве уже запущен ioBroker (конфигурация + статус через административный интерфейс). На Raspberry Pi без ioBroker используйте автономный пакет напрямую (`npx @iobroker/assistant-satellite`).

## Требования
- Микрофон + динамик у ведущего
- Аудиобэкенд (выбирается автоматически или принудительно устанавливается в разделе **Аудиобэкенд**):
- **Linux** → `alsa-utils`: `arecord` записывает, `aplay` воспроизводит (`sudo apt install alsa-utils`)
- **Windows / macOS** → **ffmpeg**: `ffmpeg` записывает, а `ffplay` воспроизводит — вам нужны **оба** исполняемых файла.

Доступен через `PATH` (см. ниже). Минимальных сборок, содержащих только `ffmpeg.exe`, недостаточно.

- Запущенный экземпляр `ioBroker.assistant` (по умолчанию спутник взаимодействует с ним через шину сообщений ioBroker).

### Добавьте ffmpeg / ffplay в переменную PATH (Windows, macOS)
Адаптер запускается по именам `ffmpeg` и `ffplay`, поэтому папка, содержащая их, должна находиться в `PATH` учетной записи, под которой работает ioBroker, а не просто в вашем собственном терминале:

- **Windows** — скачайте полную сборку (например, [gyan.dev](https://www.gyan.dev/ffmpeg/builds/) или

[BtbN](https://github.com/BtbN/FFmpeg-Builds/releases)), распакуйте его, например, в `C:\FFMPEG`, затем добавьте папку, содержащую `ffmpeg.exe` **и** `ffplay.exe`, в **системную** `Path` (*Свойства системы → Дополнительно → Переменные среды → Системные переменные → Путь*).
Проверьте в **новой** оболочке: `where ffmpeg` и `where ffplay`.

- **macOS** — `brew install ffmpeg` (устанавливает оба файла в каталог `bin` Homebrew); проверьте с помощью

`which ffmpeg ffplay`.

Процесс видит только тот параметр `PATH`, который он унаследовал при запуске, поэтому **перезапустите ioBroker (службу или хост) после его изменения** — в противном случае в журнале экземпляра будет постоянно отображаться `ffmpeg failed: spawn ffmpeg ENOENT — is it installed? (install ffmpeg)`.

## Настраивать
Установите адаптер, добавьте экземпляр, а затем настройте его. Настройки сгруппированы следующим образом:

**Сервер ioBroker.assistant**

- **Экземпляр Assistant** — выберите запущенный экземпляр `ioBroker.assistant`, с которым взаимодействует этот сателлит.
- **Транспорт** — **ioBroker** (аудио через шину сообщений, без порта UDP, централизованное STT/TTS — *рекомендуется*)

или **UDP** (аудиопоток в стиле Hannah, совместимый с ESP). При использовании UDP установите **локальный порт прослушивания** (по умолчанию `7776`) и, если автоматически выбран неправильный интерфейс, **переопределите IP-адрес хоста**.

**Личность**

- **Комната** — назначьте спутник комнате

**Аудио**

- **Аудио бэкенд** — `Авто` / `ALSA` / `ffmpeg`
- **Устройство микрофона/динамика** — например, `plughw:2,0` на Raspberry Pi (ALSA) или имя dshow / индекс avfoundation

(ffmpeg); `default` = системный параметр по умолчанию. Списки устройств считываются с этого хоста (экземпляр должен быть запущен).
В **Windows / macOS** можно перечислить только *устройства захвата*, а `ffplay` всегда воспроизводит звук на системном устройстве вывода по умолчанию — выберите динамик в настройках звука ОС, а не здесь.

- **Управление микшером ALSA** — опционально; используется только в состояниях `громкость`/`отключение звука` (см. ниже). Пусто = автоматическое определение.

На карточке докладчика; задайте имя (например, `PCM`, `Master`, `Speaker`), если выбрано неправильное имя. Только для ALSA.

**Кодовое слово**

- **Модель кодового слова активации** — встроенная `hey_jarvis` (по умолчанию), `alexa`, `hey_mycroft`, `hey_rhasspy` или URL-адрес /

локальный путь `.onnx`. Вы можете настроить до **трех** ключевых слов активации — спутник срабатывает по любому из них.

- **Порог** — 0–1, чем ниже, тем выше чувствительность.
- **Загрузка пользовательской модели ключевого слова активации** — загрузка одного автономного файла `.onnx` (внешние данные `.onnx` +

`.onnx.data` не поддерживается), затем выберите его в поле для ключевого слова выше. Используйте встроенный **тест ключевого слова** для проверки обнаружения в режиме реального времени (в `test.*` указано, что во время выполнения сообщается оценка / пиковый уровень / уровень микрофона).

- **Дальнейший разговор** — после ответа оставьте микрофон включенным на короткое **время для дальнейшего разговора**, чтобы вы могли

продолжить ("…и кухню тоже") или ответить на уточняющий вопрос, не повторяя снова ключевое слово.

**Запись (расширенные настройки)** — обнаружение тишины и настройка длины записи: **порог RMS тишины**, **тишина (мс)**, **минимальная/максимальная длительность записи (мс)** и **блоки предварительной буферизации**.

При первом запуске модели OpenWakeWord загружаются в каталог данных экземпляра. Затем произнесите кодовое слово → произнесите → ответ будет воспроизведен. Состояние `status` показывает `idle` / `listening` / `processing` / `speaking`, а `info.connection` отражает, зарегистрирован ли спутник в голосовом помощнике.

## Громкость, отключение звука, режим «Не беспокоить»
Эти изменяемые состояния применяются ко всем действиям: ответам, объявлениям и звуковому сигналу:

- **объем** — 0–100 %
- **`mute`** — заглушить говорящего
- **`dnd`** — Режим «Не беспокоить»: **объявления подавляются** (ответы на ваши собственные вопросы по-прежнему воспроизводятся)

`volume` и `mute` управляют микшером хоста. При запуске всё работает в обратном порядке: адаптер считывает текущие настройки хоста в эти два состояния, поэтому запуск экземпляра никогда не меняет громкость воспроизведения. Каждая последующая запись в состояния применяется к микшеру:

- **Linux (ALSA)** — микшер звуковой карты динамика. Управление определяется автоматически или устанавливается в настройках.

**Управление микшером ALSA**, если выбран неправильный вариант.

- **Windows** — общая громкость / отключение звука **устройства воспроизведения по умолчанию** (Core Audio, управляемого через

Встроенный PowerShell — ничего дополнительного устанавливать не нужно). Именно здесь вступает в действие `ffplay`, то есть тот же ползунок, что и в настройках звука Windows, поэтому он применяется **по всей системе**, а не только к спутнику.

- **macOS** — не подключено: команда `dnd` работает, команды `volume` / `mute` — нет.

**Приоритетные объявления:** если текст объявления (отправленный через голосового помощника `tts.text` / `satellites.<id>.tts`) начинается с **`!`**, то `!` удаляется, и объявление воспроизводится **даже при включенном режиме «Не беспокоить»** — например, `!Water leak in the basement`.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.3 (2026-08-19)
* (@GermanBluefox) `volume` / `mute` now work on Windows too (default playback device via Core Audio)
* (@GermanBluefox) On start the current host volume/mute is adopted into the states instead of being overwritten
* (@GermanBluefox) Documented the `ffmpeg` / `ffplay` PATH requirement for Windows and macOS

### 0.1.2 (2026-08-03)
* (@GermanBluefox) Updated packages

### 0.1.0 (2026-07-12)
* (@GermanBluefox) Support of multiple wake-words
* (@GermanBluefox) Added test of wake-words
* (@GermanBluefox) Connect to the assistant by instance selection with a choice of transport (ioBroker message bus or UDP)
* (@GermanBluefox) Added selectable audio backend (auto / ALSA / ffmpeg) and room assignment
* (@GermanBluefox) Added follow-up conversation mode (continue without repeating the wake word)
* Added `volume` / `mute` / `dnd` states (ALSA mixer); announcements starting with `!` bypass Do-Not-Disturb

### 0.0.2 (2026-07-05)
* (@GermanBluefox) Initial commit

## License

MIT License

Copyright (c) 2026 Denis Haev <dogafox@gmail.com>

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