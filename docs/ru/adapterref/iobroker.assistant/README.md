---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.assistant/README.md
title: ioBroker.assistant
hash: 2e1xP5xYhicsKkfkHwjXtLp6KlUoH9dcN+miU29ZTmQ=
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

> **Для воспроизведения аудиофайлов на хост-системе (Windows и Linux) необходим [ffmpeg](https://ffmpeg.org/)** : Linux →`sudo apt install ffmpeg`; Windows → установите ffmpeg и добавьте его в `PATH` или введите полный путь к ffmpeg в **поле «Путь к ffmpeg»** на вкладке «Голос». Без этого **команда «Загрузить ffmpeg»** на вкладке «Голос» загружает статическую сборку (ffmpeg-static, 20–30 МБ) в каталог данных экземпляра. Для синтеза речи в обычном текстовом формате это не требуется — только для воспроизведения аудиофайлов (mp3/wav/…).

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

### Ключевые слова: какая модель для какого спутника

Ключевое слово всегда распознается **спутником** , поэтому формат модели зависит от типа спутника. Существует два семейства моделей, и обе могут поставляться в различных вариантах. `.tflite` — Они **не взаимозаменяемы** : модель, обученная для одного типа спутников, не будет работать на другом. Чтобы использовать одну и ту же фразу на обоих типах спутников, обучите модель дважды.

| Спутник                                                                         | Двигатель                                                  | Пользовательская модель                                              | Куда это денется                                                                                |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ESPHome (спикер ThirdReality)                                                   | [microWakeWord](https://github.com/kahrendt/microWakeWord) | `.tflite`, опционально с его `.json`                                 | Этот адаптер: вкладка **«Спутники»** → ⚙ → _Загрузить собственное кодовое слово для активации._ |
| Родной спутник (`assistant-satellite` адаптер, `@iobroker/assistant-satellite`) | [openWakeWord](https://github.com/dscripka/openWakeWord)   | один самодостаточный `.onnx`                                          | Настройки спутника: загрузить, затем выбрать его. `wakewordModel` (или URL/путь)                 |
| Спутник Ханна Пи (UDP)                                                          | openWakeWord                                               | `.onnx` (`.tflite` только с `inference_framework: tflite` (на armv7l) | `--wakeword-model <path>`                                                                       |
| клиенты из Вайоминга                                                            | что бы ни запускал клиент                                  | —                                                                    | На стороне клиента; не управляется этим адаптером.                                              |

**microWakeWord (ESPHome)**

- Модель принимает 40 спектрограммных признаков на кадр: входные данные `[1, n, 40]`, **квантованный** (int8 на входе, uint8 на выходе) — как официальные модели в [esphome/micro-wake-word-models](https://github.com/esphome/micro-wake-word-models) .

- Обучите своих собственных с помощью microWakeWord. `notebooks/basic_training_notebook.ipynb` (Python 3.10, использование графического процессора очень помогает). Результат: `trained_models/wakeword/tflite_stream_state_internal_quant/stream_state_internal_quant.tflite` — переименовать его в соответствии с фразой, например `vita_nova.tflite` становится «Вита Нова».

- Он `.json` Это необязательный параметр. Без него адаптер берет фразу из имени файла, а язык — из... `voiceLanguage`, пороговое значение `0.97` и раздвижное окно `5` Укажите один параметр для установки другого значения. `micro.probability_cutoff`:

  ```json
  {
    "type": "micro",
    "wake_word": "Vita Nova",
    "model": "vita_nova.tflite",
    "trained_languages": ["de"],
    "version": 2,
    "micro": { "probability_cutoff": 0.97, "sliding_window_size": 5 }
  }
  ```

- При загрузке проверяется модель и отклоняется всё, что устройство не может запустить, с указанием причины — модель openWakeWord имеет такое имя.

- Устройство загружает модель с медиасервера при **активации** чипа; одновременно активны не более двух ключевых слов активации. Загруженная модель остается на устройстве (API не может ее удалить). Устройство, прошивка которого не поддерживает внешние ключевые слова активации, не отображает загруженную модель в списке.

**openWakeWord (собственная версия и сателлиты Hannah)**

- Модель принимает векторные представления речи, содержащие 96 значений, например, входные данные. `[1, 16, 96]`, float — именно поэтому он не работает на устройствах ESPHome.
- Экспорт обучающих блокнотов openWakeWord `.onnx` и `.tflite` Родной спутник нуждается в `.onnx` в виде **одного** файла — модель, разделенная на `.onnx` +`.onnx.data` не поддерживается.
- Встроено в собственный спутник: `hey_jarvis`, `alexa`, `hey_mycroft`, `hey_rhasspy`; до трех ключевых слов для пробуждения одновременно.

## Дорожная карта

1. **Помощник по работе с текстом (готово)** — LLM + вызов инструментов через состояния ioBroker.
2. **Ускоренный путь** для выполнения распространенных команд (вкл/выкл/таймер) без обратного обмена данными через LLM.
3. **Механизмы преобразования текста в речь (TTS/STT** ) (Polly/Azure/OpenAI/AWS Transcribe) в качестве адаптерных модулей + конфигурация.
4. **Конечная точка спутника** — аудио по протоколу UDP + управление по протоколу MQTT, поэтому спутники ESP/Pi взаимодействуют с адаптером напрямую.
5. **Кодовое слово** — запрограммировано/управляется через ioBroker, работающий на устройстве.
6. **Конечная точка сервера Вайоминга** — принять `wyoming-satellite` и клиенты в стиле Расспи.
7. **Спутники ESPHome (готово)** — управляют устройствами ThirdReality / HA Voice PE / linux-voice-assistant.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (@GermanBluefox) 3D plan: "zeig Unterdeck", "show the galley", "покажи кухню", "zeig das ganze Haus" make every open 3D view of home3d fly there (writes `home3d.N.show`); only names the plan knows (`home3d.N.places`) are taken, everything else goes on as before

### 1.13.0 (2026-11-20)
* (@GermanBluefox) Music from Spotify: "play Bohemian Rhapsody by Queen", "spiel das Album … in der Küche", "spiel meine Playlist …" find the song, album, artist or playlist and play it on a Spotify Connect device (table "Spotify players" on the Services tab, needs spotify-premium 3.3.0 or newer); LLM tools `play_music` and `music_player`, message `playMusic`
* (@GermanBluefox) Music clips on the TV: "spiel den Clip Bohemian Rhapsody von Queen", "play the music video … by …", "включи клип …" search the clip on YouTube and play it on the YouTube player; so does a song for a TV

### 1.12.1 (2026-11-19)
* (@GermanBluefox) Voice per answer language: the language is a drop-down now. A language picked from the suggestions was saved as its label (e.g. "de – Deutsch") and the row was never used; such rows get the language code on the first start
* (@GermanBluefox) Spoken requests: the speech recognition no longer waits for the device names it gets as hints (up to 3 s on large installations each time a minute had passed since the last request); the last list is used while a new one is built
* (@GermanBluefox) Request details: the speech recognition step shows the language it really got (that of the wake word) and the ioBroker.voice instance instead of the unrelated Vosk model; the speech synthesis step shows the voice, model and language that really spoke (a row of "voice per answer language" or the reserve) instead of the main voice of the settings

### 1.12.0 (2026-11-19)
* (@GermanBluefox) Device commands can be understood by the adapter smart-text2command instead of the built-in rules (tab Commands, "Device commands understood by"): it runs only the actions approved there and asks back when the room or the device is unclear; the next utterance of the same satellite or chat answers. What it does not understand goes on to the local and the cloud model; timers, alarms, time, weather and volume stay with the built-in rules
* (@GermanBluefox) New first tab "Flow": the way of a request as a diagram (sources → speech recognition → local decision → local LLM → cloud LLM / pi-agent → speech output), each step can be set up with a click

### 1.11.0 (2026-11-18)
* (@sadam6752-tech) ESPHome satellites: a language per wake word (tab Satellites, "Language per wake word", e.g. Alisa → Russian, Hey Bro → German): speech recognition, the reply voice and the follow-ups of that conversation use it, and pi-agent asks its yes/no questions in it
* (@sadam6752-tech) ESPHome satellites on an ESP32: two wake words can be active at once (the firmware reports a limit of one, but runs every wake word it is sent)
* (@sadam6752-tech) ioBroker.voice gets the language of the speech (its model Canary 1B v2 uses it, Parakeet ignores it) and only the hints in the alphabet of the language
* (@sadam6752-tech) Whisper (OpenAI and compatible servers) gets only the device and room names in Latin letters as hints for a language written in them: Russian names pulled German speech towards Cyrillic letters

### 1.10.0 (2026-11-17)
* (@GermanBluefox) ESPHome satellites: the adapter ships microWakeWord models ("ioBroker", "Hey Bro", "Alisa"); one click in the satellite settings puts one on the device and switches it on, replacing an older version of the same word
* (@GermanBluefox) Wake words from a training run get a short name with their date, e.g. `261103_iobroker` instead of "20261103 085427 9b0f Microwakeword Iobroker"
* (@GermanBluefox) A wake word selected right after it was uploaded is no longer dropped as unknown

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