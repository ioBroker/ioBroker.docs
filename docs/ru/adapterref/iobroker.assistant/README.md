---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.assistant/README.md
title: ioBroker.assistant
hash: g44CUL3WLacTNb790bSUNbCxZlE5dRrWjAtY5HKi1Ik=
---
<img src="admin/assistant.svg" alt="ioBroker.assistant" width="200"/>

# ioBroker.assistant

Помощник на основе LLM для ioBroker. Задавайте вопросы на естественном языке, и помощник сможет считывать или управлять **любым состоянием ioBroker** — он использует LLM с **вызовом инструментов** через собственный API ioBroker, поэтому нет жесткого механизма правил и дерева виртуальных устройств.

> Статус: **предварительная проверка концепции.** Ввод текста → вывод ответа. В дальнейшем планируется внедрение аудио (спутниковые каналы, синтезатор речи/текста) и кодового слова активации на устройстве (см. Дорожную карту).

## Что работает сегодня

- Поставщик: **OpenAI** (и совместимые с OpenAI конечные точки через базовый URL) или **Anthropic (Claude)** .
- LLM может вызывать эти инструменты, и все они поддерживаются собственным API адаптера:
  - `list_rooms`, `list_functions` - читать `enum.rooms` /`enum.functions`
  - `find_states({ room?, func?, query? })` — найти состояния + текущие значения
  - `get_state({ id })` — прочитать одно значение
  - `set_state({ id, value })` — управлять устройством (можно отключить в настройках)
- Текстовый интерфейс в двух состояниях:
  - напишите свой вопрос `assistant.0.text.request`
  - прочитайте ответ из `assistant.0.text.response`
- Или из сценария: `sendTo('assistant.0', 'ask', { text: 'Wie warm ist es im Wohnzimmer?' }, cb)`

## Конфигурация

В панели администратора адаптера (Экземпляры → помощник → ⚙):

| Параметр                        | Значение                                                       |
| ------------------------------- | -------------------------------------------------------------- |
| Поставщик                       | `openai` или `anthropic`                                        |
| Модель                          | например `gpt-4o-mini`, `gpt-4o`, `claude-sonnet-4-6`           |
| ключ API                        | ключ API вашего поставщика                                     |
| Базовый URL                     | необязательное переопределение конечной точки (например, Groq) |
| Разрешить управляющие состояния | Если функция отключена, помощник доступен только для чтения.   |
| Системная подсказка             | личность / поведение                                           |

## Голосовые спутники (Ханна)

Адаптер запускает UDP-сервер голосовой связи, использующий спутниковый протокол **Hannah** . `0x01` контроль /`0x02` микрофон аудио /`0x03` TTS), поэтому существующий спутник Hannah Pi/ESP может напрямую с ним взаимодействовать. В адаптере работает STT → LLM → TTS; спутник только захватывает звук, распознает кодовое слово и воспроизводит ответ.

**На стороне адаптера:** откройте вкладку **«Голос»** , установите флажок _«Включить голосовой сервер»_ , выберите поставщиков STT/TTS и учетные данные, оставьте порт (по умолчанию). `7775` При запуске экземпляра в журнале отображается следующее:

```
Voice server listening on UDP 7775
```

Распознанный текст и ответ также отображаются в `assistant.0.text.request` /`.text.response`, происхождение которого связано с `assistant.0.text.querySource` (название спутника, `chat` или пустое значение для прямой записи состояния).

**Объявления / TTS:** напишите по адресу `assistant.0.tts.text` говорить на **всех** спутниках, или... `assistant.0.satellites.<id>.tts` Во- **первых** , значение произносится в виде текста (с помощью настроенного механизма преобразования текста в речь) или — если это URL-адрес/путь к аудиофайлу (`.mp3` /`.wav` /…) — воспроизведено.

> **Для воспроизведения аудиофайлов на хост-системе (Windows и Linux) необходим [ffmpeg](https://ffmpeg.org/)** : Linux →`sudo apt install ffmpeg`; Windows → установите ffmpeg и добавьте его в `PATH` Для синтеза речи в обычном текстовом формате это не требуется — это необходимо только для воспроизведения аудиофайлов (mp3/wav/…).

### Запустите спутник Hannah, направленный на этот адаптер.

Подберите частоту воспроизведения звука в соответствии с вашим устройством (`--sample-rate` = микрофон, `--tts-rate` = динамик); список устройств и поддерживаемых скоростей с `python3 -c "import pyaudio; p=pyaudio.PyAudio(); [print(i, p.get_device_info_by_index(i)) for i in range(p.get_device_count())]"`.

Стандартный спутник Hannah определяет местоположение сервера через **MQTT-обнаружение** , поэтому ему необходим доступный брокер и одно сохраненное сообщение обнаружения. `--host` на хосте ioBroker явно:

```bash
 # 1. publish the adapter address once (retained) so the satellite finds it:
mosquitto_pub -h <broker-ip> -t hannah/server -r -m '{"host":"<iobroker-ip>","port":7775}'

 # 2. start the satellite (venv), --broker = MQTT broker, --host = this adapter:
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer \
  --broker <broker-ip> --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

Успех выглядит так: `Registrierung bestätigt (ACK empfangen)` в журнале спутниковых наблюдений и `Satellite registered: wohnzimmer` в журнале адаптера. Затем произнесите кодовое слово → произнесите → ответ будет произнесен в ответ.

### Без брокера MQTT

Стандартный спутник Hannah всегда подключается к MQTT (даже при наличии...). `--host`) и завершает работу, если брокер недоступен. Чтобы работать **полностью без брокера** , пропустите этот единственный вызов — в `satellite.py`, `_resolve_hannah_address()`:

```python
if self.cfg.hannah_host:
    self._hannah_addr = (self.cfg.hannah_host, self.cfg.hannah_port)
    # self._mqtt.connect()   # ← comment out to run without a broker (disables MQTT status/LWT only)
else:
    self._hannah_addr = self._mqtt.connect()
```

Регистрация, аудио и синтез речи работают по протоколу UDP, поэтому теряется только (необязательная) передача статуса по MQTT. Затем начните с простого... `--host` (нет `--broker` нужный):

```bash
/opt/Hannah/satellite-pi/venv/bin/python3 /opt/Hannah/satellite-pi/satellite.py \
  --device wohnzimmer --room Wohnzimmer --host <iobroker-ip> --port 7775 \
  --mic 0 --speaker 0 --sample-rate 16000 --tts-rate 48000
```

### Нативный спутник Node.js

Доступен автономный **Node.js-спутник** — ioBroker и MQTT-брокер не требуются. Работает на Raspberry Pi (или любом другом компьютере с Linux/Windows/macOS) с микрофоном и динамиком:

```bash
npx @iobroker/assistant-satellite            # writes a default config, then edit "host"
npx @iobroker/assistant-satellite config.json
```

Он воспроизводит кодовое слово (OpenWakeWord) на устройстве и передает его на голосовой сервер этого адаптера. См.[`@iobroker/assistant-satellite`](https://github.com/ioBroker/assistant-satellite) для настройки, `check` диагностика и `install` (служба systemd).

### Конечная точка в Вайоминге (экспериментальная)

[Wyoming](https://github.com/rhasspy/wyoming) — это открытый голосовой протокол из проекта Home Assistant / Rhasspy (JSONL-события по **TCP** ), используемый... `wyoming-satellite` а также другие сервисы в стиле Rhasspy.

> Голосовые устройства ESPHome (включая **Home Assistant Voice PE** ) **не** поддерживают язык программирования Wyoming — они используют собственный API ESPHome. Для них используйте указанный ниже транспорт.

Включите опцию **«Также принимать клиентов из Вайоминга (TCP)»** на вкладке «Голосовая связь» (порт по умолчанию). `10700` Затем адаптер предоставляет доступ к серверу в Вайоминге, который подключается к тому же конвейеру: `audio-start` /`audio-chunk` /`audio-stop` → STT → ответ → TTS транслируется обратно как `audio-*` (плюс `transcript` событие); `describe` →`info`; `synthesize` → TTS.

> Структура протокола протестирована с помощью модульных тестов, но совместимость с реальным протоколом не гарантирована. `wyoming-satellite` Это пока **экспериментальная функция** — пожалуйста, сообщите, что работает. Использует те же поставщики STT/TTS, что и голосовой сервер UDP.

### Голосовые спутники ESPHome

Устройства, на которых работает **голосовой помощник ESPHome** — [ThirdReality Voice & Music Assistant (Dev Edition)](https://www.thirdreality.com/products/voice-music-assistant-dev-edition) , **Home Assistant Voice PE** или любое другое устройство под управлением [linux-voice-assistant](https://github.com/OHF-Voice/linux-voice-assistant) — не подключаются к серверу: они сами _являются_ сервером, ожидающим **TCP-соединения 6053.** Таким образом, адаптер выступает в роли клиента и набирает номер, как это делал бы Home Assistant. Кодовое слово, подавление эха и воспроизведение остаются на устройстве; адаптер выполняет распознавание речи, ответ и синтез речи.

Включите параметр **«Также управлять голосовыми сателлитами ESPHome»** на вкладке «Голос» и добавьте по одной строке для каждого устройства (адрес, необязательный порт, комната). Ничего не нужно устанавливать или прошивать на устройство, и никаких инструментов ESPHome не требуется — «ESPHome native API» — это просто название протокола.

Два момента отличают этот вид транспорта от других:

- **Адаптер определяет, когда вы перестали говорить.** Эти устройства передают сигнал до тех пор, пока сервер не остановит его, поэтому здесь запускается функция определения конца речи — настройте её с помощью **параметра «Конец речи через (мс тишины)»,** если ответы прерывают вас или голосовой помощник слишком долго ждёт.
- **Голосовой ответ загружается, а не отправляется по электронной почте.** Устройство воспроизводит URL-адрес, поэтому адаптер запускает небольшой HTTP-сервер ( **порт медиасервера** , по умолчанию). `8099`), который отображает видеоролик в течение нескольких минут. Он должен быть доступен _с устройства_ ; адрес определяется каждым подключением устройства и требует ручной настройки только за NAT/Docker/VLAN.

Объявления (`tts.text`, `satellites.<id>.tts` (таймеры и будильники) также поступают на эти спутники, и каждый из них отображается в списке. `assistant.0.satellites.*` как и любой другой.

> Разработано на основе исходного кода прошивки колонки ThirdReality и проверено с помощью теста обратной связи на имитированном устройстве; отзывы от пользователей реального оборудования приветствуются.

## Дорожная карта

1. **Текстовый ассистент (готово)** — LLM + вызов инструментов через состояния ioBroker.
2. **Ускоренный путь** для выполнения распространенных команд (вкл/выкл/таймер) без обратного обмена данными через LLM.
3. **Движки TTS/STT** (Polly/Azure/OpenAI/AWS Transcribe) в качестве адаптерных модулей + конфигурация.
4. **Конечная точка спутника** — аудио по протоколу UDP + управление по протоколу MQTT, поэтому спутники ESP/Pi взаимодействуют с адаптером напрямую.
5. **Кодовое слово** — запрограммировано/управляется через ioBroker, работающий на устройстве.
6. **Конечная точка сервера Вайоминга** — принять `wyoming-satellite` и клиенты в стиле Расспи.
7. **Спутники ESPHome (готово)** — управляют устройствами ThirdReality / HA Voice PE / linux-voice-assistant.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-10-04)
* (@GermanBluefox) Added routines: a phrase ("good night") runs a list of actions and answers once. Matched before the offline rule engine and before the LLM, so a macro you wrote down is never reinterpreted
* (@GermanBluefox) The offline rule engine now answers questions about a kind of measurement without a device being named: "how is the air in here", "how warm is it everywhere", "how bright is it" are answered from every sensor of that kind, with a word for the air-quality number
* (@GermanBluefox) Spoken text is cached on disk, so repeated replies ("Okay.", "Timer finished") cost no cloud call and no latency. An answer over 400 characters is cut at the last sentence that fits, and `<speak>…</speak>` is now spoken as real SSML by Azure and Polly
* (@GermanBluefox) Added an optional second speech engine per direction: if the configured provider fails (outage, expired key, empty quota), speech-to-text and text-to-speech fall back to another one — with Vosk/Piper behind a cloud provider the house keeps working without the internet
* (@GermanBluefox) Added two optional settings for switch commands: confirm with a short beep instead of a spoken sentence, and verify the device's acknowledgement before reporting success
* (@GermanBluefox) An ESPHome satellite's own measurements (temperature, presence, status texts) now appear as read-only states under `satellites.<id>.controls.*`
* (@GermanBluefox) Announcements can address a group of rooms or a person: name a set of satellites in the new "Announcement targets" table and use it anywhere a target is accepted (`notify`, `askUser`, a trigger's room, the per-satellite `tts` state). The LLM also got an `announce` tool, so "tell Denis that dinner is ready" reaches his speakers — the configured names are part of the tool description. A question asked to a group counts the first answer, and the text is synthesised once for the whole group
* (@GermanBluefox) The assistant can now know who is at home: point the new "Presence" table at the states you already have (the residents adapter, a phone ping, your own flag) and name the person. It tells the LLM who is around, holds back announcements to an empty house on request (`notify` with `onlyWhenHome`), and exposes `presence.anyoneHome` / `presence.list` / `presence.lastArrival` — so greeting somebody on arrival is just a trigger on that state
* (@GermanBluefox) System notifications can now be spoken: write to `notify.text` / `notify.alert`, call `sendTo('assistant.0', 'notify', { text, severity })`, or pick the assistant in the ioBroker notification manager. The LLM turns the raw text into one natural sentence whose tone follows the severity (`info`/`notify`/`alert`, plus `direct` to speak it verbatim)
* (@GermanBluefox) Added Do-Not-Disturb, enforced by the adapter for every transport: `dnd` globally and `satellites.<id>.dnd` per satellite. Announcements are suppressed while it is on; alerts and texts starting with `!` are still played, and answers to your own questions are never affected
* (@GermanBluefox) Added proactive triggers (new "Triggers" tab): a trigger watches states or the clock and then announces something, writes a state, or asks you a question and acts on your answer ("The fryer has been on for 5 hours. Shall I switch it off?" — the LLM classifies the spoken reply against the configured response rules). Supports alternative conditions, `also`/`unless` refinements, a delay with `cancelWhen`, and a cooldown; each trigger has `triggers.items.<id>.{enabled,fire,lastFired,nextFireAt}` states plus a `triggers.enabled` master switch
* (@GermanBluefox) The assistant can now ask a question and wait for the answer: `sendTo('assistant.0', 'askUser', { question, room })` speaks it on a satellite, re-opens the microphone without a wake word and returns what was said. While a question is open that answer is routed to the caller instead of being read as a new command
* (@GermanBluefox) Added a fourth voice transport: ESPHome voice satellites (ThirdReality Voice & Music Assistant, Home Assistant Voice PE, linux-voice-assistant). The adapter dials the devices on TCP 6053, detects the end of speech itself and serves the spoken reply over a small HTTP media server

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