---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.assistant/README.md
title: ioBroker.assistant
hash: uUunrOqtOwrG1ZS+AgF5S3TlKMQCBAwb1RrBw8qcTyk=
---
<img src="admin/assistant.svg" alt="ioBroker.assistant" width="200"/>

# IoBroker.assistant
Интерактивный помощник на основе LLM для ioBroker. Задавайте вопросы на естественном языке, и помощник сможет считывать или управлять **любым состоянием ioBroker** — он использует LLM с **вызовом инструментов** через собственный API ioBroker, поэтому нет жесткого механизма правил и дерева виртуальных устройств.

> Статус: **предварительная проверка концепции.** Ввод текста → вывод ответа. В дальнейшем планируется внедрение аудио (спутниковые каналы, STT/TTS) > и кодового слова активации на устройстве (см. Дорожную карту).

## Что работает сегодня
- Поставщик: **OpenAI** (и совместимые с OpenAI конечные точки через базовый URL) или **Anthropic (Claude)**.
- LLM может вызывать эти инструменты, все они поддерживаются собственным API адаптера:
- `list_rooms`, `list_functions` — чтение `enum.rooms` / `enum.functions`
- `find_states({ room?, func?, query? })` — найти состояния + текущие значения
- `get_state({ id })` — считывает одно значение
- `set_state({ id, value })` — управление устройством (можно отключить в настройках)
- Текстовый интерфейс в двух состояниях:
- Напишите свой вопрос в `assistant.0.text.request`
- прочитать ответ из `assistant.0.text.response`
- Или из скрипта: `sendTo('assistant.0', 'ask', { text: 'Wie Warm ist es im Wohnzimmer?' }, cb)`

## Конфигурация
В панели администратора адаптера (Экземпляры → помощник → ⚙):

| Обстановка | Смысл |
|--------------------------|---------------------------------------------------|
| Поставщик | `openai` или `anthropic` |
| Модель | например `gpt-4o-mini`, `gpt-4o`, `claude-sonnet-4-6` |
| Ключ API | Ключ API вашего провайдера |
| Базовый URL | необязательное переопределение конечной точки (например, Groq) |
| Разрешить управление состояниями | Если отключено, помощник доступен только для чтения |
| Системное сообщение | персона / поведение |

## Голосовые спутники (Ханна)
Адаптер запускает UDP-сервер голосовой связи, использующий протокол спутника **Hannah** (`0x01` управление / `0x02` аудио с микрофона / `0x03` TTS), поэтому существующий спутник Hannah Pi/ESP может напрямую с ним взаимодействовать. В адаптере работает протокол STT → LLM → TTS; спутник только захватывает аудиосигнал, распознает кодовое слово и воспроизводит ответ.

**На стороне адаптера:** откройте вкладку **Голос**, установите флажок *Включить голосовой сервер*, выберите поставщиков STT/TTS и учетные данные, оставьте порт (по умолчанию `7775`). После запуска экземпляра в журнале отобразится следующее:

```
Voice server listening on UDP 7775
```

Распознанный текст и ответ также отображаются в `assistant.0.text.request` / `.text.response`, а источник — в `assistant.0.text.querySource` (название спутника, `chat`, или пустое значение для прямой записи состояния).

**Объявления / TTS:** записывайте в `assistant.0.tts.text` для озвучивания на **всех** спутниках или в `assistant.0.satellites.<id>.tts` для **одного** спутника. Значение произносится как текст (с помощью настроенного механизма TTS) или — если это URL/путь к аудиофайлу (`.mp3`/`.wav`/…) — воспроизводится.

> **Для воспроизведения аудиофайлов требуется [ffmpeg](https://ffmpeg.org/) на хосте** (Windows и Linux): > Linux → `sudo apt install ffmpeg`; Windows → установите ffmpeg и добавьте его в `PATH`.
> Для синтеза речи в обычном текстовом формате это не требуется — только для воспроизведения аудиофайлов (mp3/wav/…).

### Запустите спутник Hannah, направленный на этот адаптер
Сопоставьте частоту воспроизведения звука с вашим устройством (`--sample-rate` = микрофон, `--tts-rate` = динамик); список устройств и поддерживаемых частот можно перечислить с помощью `python3 -c "import pyaudio; p=pyaudio.PyAudio(); [print(i, p.get_device_info_by_index(i)) for i in range(p.get_device_count())]"`.

Стандартный спутник Hannah определяет местоположение сервера через **MQTT-обнаружение**, поэтому ему необходим доступный брокер и одно сохраненное сообщение обнаружения. Укажите `--host` на хост ioBroker явным образом:

```bash
 # 1. publish the adapter address once (retained) so the satellite finds it:
mosquitto_pub -h <broker-ip> -t hannah/server -r -m '{"host":"<iobroker-ip>","port":7775}'

 # 2. start the satellite (venv), --broker = MQTT broker, --host = this adapter:
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer \
  --broker <broker-ip> --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

В журнале спутника статус "Успех" отображается как `Registrierung bestätigt (ACK empfangen)`, а в журнале адаптера - `Satellite registered: wohnzimmer`. Затем произнесите кодовое слово → произнесите → ответ будет произнесен в ответ.

### Без брокера MQTT
Стандартный спутник Hannah всегда подключается к MQTT (даже с `--host`) и завершает работу, если брокер недоступен. Чтобы работать **полностью без брокера**, пропустите этот единственный вызов — в `satellite.py`, `_resolve_hannah_address()`:

```python
if self.cfg.hannah_host:
    self._hannah_addr = (self.cfg.hannah_host, self.cfg.hannah_port)
    # self._mqtt.connect()   # ← comment out to run without a broker (disables MQTT status/LWT only)
else:
    self._hannah_addr = self._mqtt.connect()
```

Регистрация, аудио и синтез речи работают по протоколу UDP, поэтому теряется только (необязательная) передача статуса по MQTT.
Тогда начните с `--host` (`--broker` не требуется):

```bash
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

### Нативный спутник Node.js
Доступен автономный **спутник Node.js** — ioBroker и MQTT-брокер не требуются. Работает на Raspberry Pi (или любом другом компьютере с Linux/Windows/macOS) с микрофоном и динамиком:

```bash
npx @iobroker/assistant-satellite            # writes a default config, then edit "host"
npx @iobroker/assistant-satellite config.json
```

Программа запускает кодовое слово (OpenWakeWord) на устройстве и передает его на голосовой сервер этого адаптера. См. [`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite) для настройки, `check` для диагностики и `install` (служба systemd).

### Конечная точка в Вайоминге (экспериментальная)
[Вайоминг](https://github.com/rhasspy/wyoming) — это открытый голосовой протокол из проекта Home Assistant / Rhasspy (события JSONL по протоколу **TCP**), используемый `wyoming-satellite`, устройством **Home Assistant Voice PE** puck и голосовыми устройствами **ESPHome**.

Включите параметр **Также принимать клиентов из Вайоминга (TCP)** на вкладке «Голос» (порт по умолчанию `10700`). Затем адаптер предоставляет доступ к серверу из Вайоминга, который подключается к тому же каналу связи: `audio-start`/`audio-chunk`/`audio-stop` → STT → ответ → TTS, передаваемый обратно как `audio-*` (плюс событие `transcript`); `describe` → `info`; `synthesize` → TTS.

> Протокол формирования кадров протестирован с помощью модульных тестов, но взаимодействие с реальным HA Voice PE / `wyoming-satellite` пока **экспериментальное** — пожалуйста, сообщите, что работает. Использует те же поставщики STT/TTS, что и UDP-сервер голосовой связи.

## Дорожная карта
1. **Помощник по работе с текстом (готово)** — LLM + вызов инструментов через состояния ioBroker.
2. **Быстрый путь** для распространенных команд (вкл/выкл/таймер) без обратного обмена данными с LLM.
3. **Движки TTS / STT** (Polly / Azure / OpenAI / AWS Transcribe) в качестве адаптерных модулей + конфигурация.
4. **Спутниковая точка подключения** — аудио по протоколу UDP + управление по протоколу MQTT, благодаря чему спутники ESP/Pi взаимодействуют с адаптером напрямую.
5. **Кодовое слово активации** — обучается/управляется через ioBroker, работающий на устройстве.
6. **Конечная точка сервера в Вайоминге** — принимает голосовые устройства Home Assistant Voice PE / `wyoming-satellite` / ESPHome.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.6 (2026-08-26)
* (@GermanBluefox) The offline rule engine now understands combined commands: "switch the light on and set the blind to 30 %", and one verb for several devices ("switch the light and the lamp on")
* (@GermanBluefox) Fixed: "50 percent" was not recognised as a level in English
* (@GermanBluefox) The selected weather adapter is now fed to the LLM as context (current conditions plus today/tomorrow), so weather questions are answered without an extra tool round-trip
* (@GermanBluefox) The local LLM receives the weather context too, so it no longer invents a forecast
* (@GermanBluefox) Documented the weather source selection in the user documentation

### 0.1.5 (2026-08-19)
* (@GermanBluefox) Corrected credentials

### 0.1.3 (2026-08-15)
* (@GermanBluefox) Updated packages

### 0.1.2 (2026-08-03)
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