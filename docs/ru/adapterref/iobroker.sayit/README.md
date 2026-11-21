---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sayit/README.md
title: ioBroker sayit адаптер
hash: A6qaHOVK/4pRMXRx+uRimgtJ8twX99PPlctxbYNK8Vk=
---
![Логотип](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Количество установок](https://iobroker.live/badges/sayit-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.sayit.svg)
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# ioBroker sayit адаптер

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Адаптер SayIt может преобразовывать текст в речь и воспроизводить его на некоторых устройствах.

## Конфигурация

Фактически поддерживаются следующие выходные данные:

- _Браузер_ — браузер воспроизведет текст внутри открытого окна. `iobroker.vis` страница. Она поддерживается практически всеми настольными браузерами и некоторыми мобильными браузерами. При установке параметра "Экземпляры Vis" на _панели мониторинга Aura_ текст воспроизводится на открытых панелях мониторинга [Aura](https://github.com/hdering/ioBroker.aura) . Параметр "Экземпляр браузера" принимает список идентификаторов клиентов Aura, разделенных запятыми, или `FFFFFFFF` для каждой панели мониторинга.

- _[Home24-MediaPlayer](http://www.home-24.net/index.php?app=media)_ — текст будет отправлен и воспроизведен на устройстве Android с установленным Home24-MediaPlayer. Для этого будет использоваться встроенный в Android механизм преобразования текста в речь. Порт изменить нельзя, он должен быть установлен на 50000.

- _Home24 — медиаплеер и [FTP-сервер](https://play.google.com/store/apps/details?id=lutey.FTPServer)_ — текст будет отправлен и воспроизведен на устройстве Android с установленным Home24 — медиаплеером. Для этого будет использоваться движок преобразования текста в речь от Google. Сгенерированный файл mp3 будет скопирован по FTP на устройство Android и воспроизведен с помощью Home24 — медиаплеера. Оба приложения должны иметь одинаковые домашние каталоги (например, корневой каталог «sd card»).

- _Система_ — воспроизведение текста будет осуществляться операционной системой, на которой работает адаптер ioBroker. Поддерживаются следующие ОС: Windows, Linux, Mac OSx.

- _Движок Windows_ — текст будет воспроизводиться в Windows, где работает адаптер sayIt. Для этого будет использоваться движок преобразования текста в речь Windows, который должен быть предварительно настроен пользователем. Инструкции по настройке можно найти [здесь](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7) .

- _Sonos_ — воспроизведите текст на устройстве Sonos. Убедитесь, что веб-адаптер включен. Он необходим для того, чтобы SONOS мог читать сгенерированные файлы mp3.

- _Heos_ - воспроизведение текста на устройстве HEOS. Убедитесь, что веб-адаптер включен. Он необходим для того, чтобы HEOS мог читать сгенерированные файлы mp3.

- _Squeezebox_ — воспроизведение текста на плеере Logitech Media Server (Lyrion) с адаптером [squeezeboxrpc](https://github.com/oweitman/ioBroker.squeezeboxrpc) (версия 2.0.0 или новее). Текст записывается в состояние `Announce` Из-за этого воспроизведение проигрывателя останавливается и возобновляется позже. Громкость объявления настраивается в адаптере squeezeboxrpc. Убедитесь, что веб-адаптер включен, чтобы медиасервер мог читать сгенерированные файлы mp3.

- _WiiM / LinkPlay_ — воспроизведение текста на устройствах WiiM, Arylic или других устройствах на базе LinkPlay с помощью адаптера [WiiM](https://github.com/KaiIOB/ioBroker.wiim) . На устройствах Arylic с прошивкой 4.6.415145 или новее, а также на других устройствах LinkPlay ссылка на файл записывается в состояние. `playPromptUrl` стримера, поэтому файл воспроизводится как уведомление: текущая скорость воспроизведения снижается, а затем возобновляется. Устройства WiiM не поддерживают эту функцию. `playPromptUrl` Таким образом, ссылка записывается в состояние. `play_URL` Воспроизведение останавливается и не возобновляется после объявления. Объявление воспроизводится с фактической громкостью стримера. Убедитесь, что веб-адаптер включен, чтобы стример мог считывать сгенерированные файлы mp3.

- _Голосовые сателлиты ассистента_ — воспроизведение текста на голосовых сателлитах адаптера [ассистента](https://github.com/ioBroker/ioBroker.assistant) . Выберите экземпляр (например, `assistant.0`) воспроизвести текст на всех спутниках (государственных) `tts.text`) или один спутник (государство) `satellites.<id>.tts` Текст озвучивается голосом, выбранным в sayit, вспомогательный адаптер воспроизводит только сгенерированный файл mp3, поэтому ему необходим [ffmpeg](https://ffmpeg.org/) на хосте. Убедитесь, что веб-адаптер включен, чтобы вспомогательный адаптер мог читать сгенерированные файлы mp3.

- _Alexa_ — произнесите текст на устройстве Echo (или группе устройств) с адаптером [alexa2](https://github.com/Apollon77/ioBroker.alexa2) . Alexa произносит текст своим **собственным голосом** , поэтому голос (движок) sayit, кэш и звуковое объявление не используются, и звуковые файлы (mp3, wav) воспроизводиться не могут. Текст записывается в состояние `Commands.speak` или `Commands.announcement` (со звуковым сигналом Alexa, только если для устройства включены уведомления и отключен режим «Не беспокоить»). Длинные тексты разбиваются на блоки по 250 символов, громкость устанавливается перед текстом и восстанавливается после него адаптером Alexa2. Поскольку Alexa говорит в облаке, она может лишь приблизительно оценить продолжительность текста до отправки следующего.

- _Fully Kiosk Browser_ — воспроизведение текста на планшете Android с помощью [Fully Kiosk Browser](https://www.fully-kiosk.com) и адаптера [fullybrowser](https://github.com/arteck/ioBroker.fullybrowser) (версия 3.0.5 или новее). Команда REST `playSound` отправляется через государство `Commands.setRAW` громкость устройства регулируется с помощью `Commands.setAudioVolume` Убедитесь, что веб-адаптер включен, чтобы планшет мог считывать сгенерированные файлы mp3.

- _Bose SoundTouch_ — воспроизведение текста на колонке Bose SoundTouch, подключенной к адаптеру [bosesoundtouch](https://github.com/iobroker-community-adapters/ioBroker.bosesoundtouch) (один экземпляр на колонку). sayit отправляет ссылку на файл непосредственно в интерфейс уведомлений. `/speaker` (порт 8090) динамика, поэтому текущее воспроизведение приостанавливается и возобновляется позже. Это поддерживают только некоторые модели (например, SoundTouch 10, 20 и 30 Series III), другие модели отклоняют объявление (см. журнал). Динамик проверяет ключ приложения в облаке Bose, которое было отключено 6 мая 2026 года, поэтому без замены облака Bose (например, сервиса [Bose SoundTouch Toolkit](https://gesellix.github.io/Bose-SoundTouch/) , который принимает любой непустой ключ) динамик может отклонить объявление. Убедитесь, что веб-адаптер включен, чтобы динамик мог читать сгенерированные файлы mp3.

- _Kodi_ — воспроизведение текста в Kodi с помощью адаптера [Kodi](https://github.com/iobroker-community-adapters/ioBroker.kodi) (один экземпляр на каждый Kodi). Ссылка на файл записывается в состояние. `open` В данном случае адаптер Kodi очищает музыкальный плейлист Kodi и переключается на полноэкранный плеер, поэтому текущее воспроизведение останавливается и **не восстанавливается** после текста. Файл воспроизводится с фактической громкостью Kodi. Убедитесь, что веб-адаптер включен, чтобы Kodi мог читать сгенерированные файлы mp3.

- _Asterisk (телефонный звонок)_ — позвоните по номеру телефона с помощью адаптера [Asterisk](https://github.com/schmupu/ioBroker.asterisk) и воспроизведите текст звонка. Sayit отправляет путь к сгенерированному файлу MP3 с помощью команды. `dial` к адаптеру Asterisk, который преобразует его в GSM и отправляет на сервер Asterisk. Таким образом, sayit и адаптер Asterisk **должны работать на одном хосте** . Каждое текстовое сообщение — это отдельный вызов, поэтому звуковое оповещение не воспроизводится. Номер телефона, идентификатор вызывающего абонента и количество повторов сообщения задаются в конфигурации; номер и идентификатор вызывающего абонента также можно указать в файле конфигурации. `say` сообщение (`asteriskTelnr`, `asteriskCallerId`).

- _Chromecast_ — воспроизведение текста на устройстве Chromecast.

- _Google Home_ — воспроизведение текста на Google Home или другом устройстве с функцией трансляции, которым SayIt управляет напрямую. Текущее воспроизведение (например, музыки из Spotify) останавливается и **не возобновляется** после текста. Используйте тип вывода _Chromecast_ с адаптером Chromecast, если необходимо возобновить воспроизведение.

- _MPD_ — воспроизведение текста в демоне музыкального проигрывателя. Используйте только **HTTP** для веб-адаптера, не используйте HTTPS.

Чтобы включить функцию преобразования текста в речь на Raspberry Pi или в системе Linux, однократно выполните следующую команду. `sudo apt-get -y install mpg321` установить mpg321.

Воспроизведение файлов mp3/wav осуществляется путем ввода их имени в объект. (например) `/vis.0/main/img/door-bell.mp3`)

Файл необходимо сначала загрузить.

### Двигатели TTS

Онлайн:

- Google: английский, немецкий, русский, итальянский, испанский, французский;
- Яндекс: Русский. Для использования голосов Яндекса необходимо запросить ключ API здесь: <https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/> . \[Этот сервис будет отключен 1 января 2019 года и заменен на Yandex.cloud]. Для использования Yandex.cloud необходимо зарегистрироваться здесь: \[ <https://cloud.yandex.ru/> ], установить API SpeechKIT в облаке и получить токен авторизации и идентификатор папки, как описано в инструкциях к API.
- FreeTTS: более 400 голосов на более чем 75 языках, предоставленных <https://freetts.org> . Язык выбирается не движком, а самим голосом, например. `de-DE-KatjaNeural` Для использования требуется ключ API со [страницы с ценами](https://freetts.org/pricing) . Бесплатный тарифный план добавляет к каждому тексту голосовое сообщение «сгенерировано с помощью freeTTS.org», поэтому его нельзя использовать для объявлений.
- Облачные сервисы: Для использования облачных голосовых сервисов необходимо настроить и запустить соответствующие приложения. `cloud` адаптер или введите ключ приложения непосредственно в настройках
- Amazon Web Services Polly: Для использования голосовых сервисов AWS Polly необходимо создать ключ доступа и секретный ключ [здесь](https://console.aws.amazon.com/iam/home) . Документацию Amazon можно найти [здесь](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) .

Офлайн:

- PicoTTS (только для Linux): английский, немецкий, итальянский, испанский, французский; для работы PicoTTS необходимо установить следующие пакеты: `libttspico-utils` и отстой. Команда установки: `sudo apt-get install libttspico-utils lame`

- Coqui TTS: английский, немецкий, испанский, французский, голландский, японский, китайский; инструкции по использованию см. в [официальной документации.](https://tts.readthedocs.io/en/latest/index.html)

- Piper: быстрые локальные голосовые системы на многих языках, например, немецкие голоса [Thorsten-Voice](https://www.thorsten-voice.de) . [Piper](https://github.com/OHF-Voice/piper1-gpl) работает как HTTP-сервер в локальной сети (на хосте ioBroker или на любом другом), поэтому один сервер может использоваться несколькими приложениями. Для работы не требуется подключение к интернету и никаких других инструментов на хосте ioBroker. Установка сервера (см. [HTTP API](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/API_HTTP.md) ):
  ```
  python3 -m pip install piper-tts[http]
  python3 -m piper.download_voices de_DE-thorsten-high
  python3 -m piper.http_server -m de_DE-thorsten-high --host 0.0.0.0 --port 5000
  ```
  Введите адрес сервера, например: `http://192.168.1.10:5000` В настройках. Голосовые модули, установленные на сервере, предлагаются в диалоговом окне настроек.

### Тестирование генерации текста

С помощью кнопки `Test text generation` на вкладке `Engine` Вы можете проверить, правильно ли настроен выбранный двигатель.

Поле `Test text` Поле предварительно заполняется тестовым предложением на языке выбранного движка и может быть изменено по желанию. Если поле пустое, будет использовано то же предложение. Текст будет сгенерирован с учетом настроек диалогового окна, поэтому их не следует сохранять перед тестированием.

Текст будет только сгенерирован, но не воспроизведен, поэтому тест будет работать, даже если проигрыватель недоступен. Диалоговое окно отображает размер и продолжительность сгенерированного файла и пытается открыть его в новой вкладке браузера, чтобы вы могли его прослушать. Для этого браузер должен разрешать всплывающие окна для административной панели ioBroker.

Для одновременной проверки генерации **и** воспроизведения используйте кнопку. `Test` на вкладке `Player`.

### Облачные и Amazon Web Services: форматирование текста Polly

Вы можете форматировать текст с помощью [языка разметки синтеза речи (Speech Synthesis Markup Language)](http://docs.aws.amazon.com/polly/latest/dg/ssml.html) .

Наиболее полезные функции:

- `<break time="3s"/>` - сделать паузу на x секунд (максимум 10 секунд).
- `<emphasis> big </emphasis>` - сделать акцент на каком-либо слове.
- `<prosody volume="+6dB" rate="90%">I am speaking this</prosody>` - Регулировка параметров скорости и громкости.
- `<say-as interpret-as="digits">12345</say-as>` - произносить каждую цифру отдельно.

Дополнительная [информация](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference) .

### Системная команда

Если у вас есть программа, которая может воспроизводить аудиофайлы локально или в другом месте, вы можете написать здесь эту команду. Например:

`myCustomPlayer --option`

Если выбран вариант **«Системный** вывод», то `sayit` Адаптер выполнит следующую команду в локальной системе:

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

Если имя файла должно находиться где-то посередине, можно использовать _%s_ для указания места, где должно быть размещено имя файла:

`myCustomPlayer --option "%s" > /dev/null`

скажите, это сделает `myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null` от него.

## Использование

Адаптер SayIt нельзя использовать отдельно. Он должен управляться из JavaScript-адаптера или из компонента "vis" с помощью специального виджета. После создания экземпляра адаптера вы найдете следующие объекты:

- `sayit.N.tts.text` Фраза для произнесения.
- `sayit.N.tts.volume`: громкость, которая будет использоваться при воспроизведении фразы.
- `sayit.N.tts.playing`: true, если текст воспроизводится, и false, если нет. Поддерживается только для режимов воспроизведения "Windows" и "System".
- `sayit.N.tts.cachetext` Фраза, которую необходимо кэшировать, после чего её можно будет использовать без подключения к интернету. Например, вы можете вручную ввести сюда "Нет интернета", и если пинг до google.com окажется отрицательным, напишите "Нет интернета" в "tts.text", и это будет произнесено. Конечно, кэширование должно быть включено.

Кэшированные файлы хранятся в каталоге кэша. Относительный путь указывается относительно `iobroker-data/sayit` Абсолютный путь используется как есть. Значение по умолчанию для новых экземпляров —`cache`, т.е. `iobroker-data/sayit/cache` Более старые экземпляры сохраняют `../../cache/`, т.е. `<ioBroker installation>/cache`.

Состояние `tts.text` Поддерживает расширенный синтаксис, поэтому язык/движок и громкость могут быть определены вместе с текстом. Используется для включения многоязычных движков преобразования текста в речь. Например, если адаптер имеет движок `Google-english` Это возможно с помощью фразы. `de:Sag es` принудительно использовать речевой движок Google-Deutsch.

С `ru;75;Погода хорошая` Мы можем принудительно включить русский язык и громкость на 75%.

Вы можете указать громкость объявления в процентах от текущей или заданной громкости (не от максимальной). Например, если команда такая: `de;75;Gutes Wetter` Если громкость объявления составляет 50%, объявление будет воспроизводиться с громкостью 38% от максимально возможной в 100%.

Также можно указать системную команду для воспроизведения файла mp3. Если оставить это поле пустым, будут использоваться настройки по умолчанию: windows -`cmdmp3.exe`, OSX -`/usr/bin/afplay`, linux -`mpg321` или `omxplayer` (рекомендуется).

Для установки omxplayer напишите `sudo apt-get install omxplayer` или написать `sudo apt-get install mpg321` установить mpg321.

**Примечание:** Выбор опции "объявить" по умолчанию будет возможен только после запуска экземпляра.

С `sendTo` Вы можете передавать больше различных параметров, например: `sonosDevice` или `browserInstance`:

```javascript
sendTo('sayit.0', 'say', {
    text: 'Hello',
    sonosDevice: 'Wohnzimmer', // optional, if not defined, the device from configuration will be used
    engine: 'Google-de', // optional, if not defined, the device from configuration will be used
    type: 'sonos', // optional, if not defined, the device from configuration will be used
    volume: 20, // optional, if not defined, the device from configuration will be used
});
```

### Сообщения для скриптов и агентов искусственного интеллекта.

`sendTo('sayit.0', 'help', {})` ответы `{ help, commands }`: описание всех сообщений (например) `say` со всеми его параметрами) для агентов ИИ (например, pi-agent) и авторов скриптов, а также список всех команд с `write` (`true` (если команда имеет эффект, например, воспроизводит что-либо).

### Приоритеты

Чтобы текст был произнесен немедленно, несмотря на наличие текста в очереди, у вас есть два варианта:

- Вставьте "!" в качестве первого символа в текст, чтобы этот текст произносился сразу после текущего.
- Запишите значение true в состояние "tts.clearQueue", и очередь будет очищена. После этого вы можете записать новый текст. `tts.text` Однако все тексты, находящиеся в очереди, удаляются.

### Двигатели

Для двигателей возможны следующие значения:

#### Google

- **эн** - английский
- **de** - Deutsch
- **pl** - Polski
- **ру** - Русский
- **uk** - український
- **это** - итальяно
- **es** - Espaniol
- **fr** - Français
- **nl** - Nederlands
- **zh-CN** - 简体中文
- **pt** - Português

#### FreeTTS

- **freeTTS** — голос, скорость и высота тона берутся из конфигурации экземпляра.

Язык является частью голосового сопровождения, поэтому существует только одно название движка. Голосовое сопровождение, например... `de-DE-KatjaNeural` В диалоговом окне настроек выбирается соответствующий параметр, и из сервиса считывается список всех доступных голосов. Запрос ограничен 10000 символами, поэтому более длинные тексты разбиваются на части и произносятся один за другим.

#### Пайпер

- **Piper** — параметры сервера, голоса, динамика и скорости берутся из конфигурации экземпляра.

Как и в FreeTTS, язык является частью голоса, например... `de_DE-thorsten-high` Если голос не выбран, используется голос сервера по умолчанию.

#### Яндекс

- **ru\_YA:Яндекс** - Русский
- **ru\_YA\_CLOUD:Яндекс Облако** - Русский \[API Yandex.Cloud генерирует файлы в формате OGG. Для воспроизведения файлов OGG в Linux необходимо установить mplayer и выбрать его в качестве системного проигрывателя]

#### Amazon Polly через облако

- **ru-RU\_CLOUD\_Female** - Русский - Татьяна
- **ru-RU\_CLOUD\_Male** - Русский - Максим
- **de-DE\_CLOUD\_Female** - Deutsch - Марлен
- **de-DE\_CLOUD\_Male** - Deutsch - Ганс
- **de-DE\_CLOUD\_Female\_Vicki** - Deutsch - Вики
- **de-DE\_CLOUD\_Male\_Daniel** - Deutsch - Даниэль
- **de-AT\_CLOUD\_Female\_Hannah** - Австрия - Ханна
- **en-US\_CLOUD\_Female** - en-US - Female - Salli
- **en-US\_CLOUD\_Male** - en-US - Male - Joey
- **da-DK\_CLOUD\_Female** - da-DK - Женщина - Ная
- **da-DK\_CLOUD\_Male** - da-DK - Мужской - Мадс
- **ru-AU\_CLOUD\_Female** - ru-AU - Женщина - Николь
- **ru-AU\_CLOUD\_Male** - ru-AU - Мужской - Рассел
- **ru-GB\_CLOUD\_Female\_Amy** - ru-GB - Женщина - Эми
- **en-GB\_CLOUD\_Male** - en-GB - Мужчина - Брайан
- **ru-GB\_CLOUD\_Female\_Emma** - ru-GB - Женщина - Эмма
- **en-GB-WLS\_CLOUD\_Female** - en-GB-WLS - Female - Gwyneth
- **en-GB-WLS\_CLOUD\_Male** - en-GB-WLS - Male - Geraint
- **cy-GB\_CLOUD\_Female** - cy-GB - Female - Gwyneth
- **cy-GB\_CLOUD\_Male** - cy-GB - Male - Geraint
- **en-IN\_CLOUD\_Female** - en-IN - Female - Raveena
- **en-US\_CLOUD\_Male\_Chipmunk** - en-US - Male - Chipmunk
- **en-US\_CLOUD\_Male\_Eric** - en-US - Male - Eric
- **en-US\_CLOUD\_Female\_Ivy** - en-US - Female - Ivy
- **en-US\_CLOUD\_Female\_Jennifer** - en-US - Female - Jennifer
- **ru-US\_CLOUD\_Male\_Justin** - ru-US - Мужчина - Джастин
- **en-US\_CLOUD\_Female\_Kendra** - en-US - Female - Kendra
- **en-US\_CLOUD\_Female\_Kimberly** - en-US - Female - Kimberly
- **es-ES\_CLOUD\_Female** - es-ES - Женщина - Кончита
- **es-ES\_CLOUD\_Male** - es-ES - Мужчина - Энрике
- **es-US\_CLOUD\_Female** - es-US - Female - Penelope
- **es-US\_CLOUD\_Male** - es-US - Male - Miguel
- **fr-CA\_CLOUD\_Female** - fr-CA - Female - Chantal
- **fr-FR\_CLOUD\_Female** - fr-FR - Female - Celine
- **fr-FR\_CLOUD\_Male** - fr-FR - Male - Mathieu
- **is-IS\_CLOUD\_Female** - is-IS - Female - Dora
- **is-IS\_CLOUD\_Male** - is-IS - Male - Karl
- **it-IT\_CLOUD\_Female** - it-IT - Female - Carla
- **it-IT\_CLOUD\_Male** - it-IT - Male - Giorgio
- **nb-NO\_CLOUD\_Female** - no-NO - Female - Liv
- **no-NO\_CLOUD\_Female** - no-NO - Female - Ida
- **nl-NL\_CLOUD\_Female** - nl-NL - Female - Lotte
- **nl-NL\_CLOUD\_Male** - nl-NL - Male - Ruben
- **pl-PL\_CLOUD\_Female\_Agnieszka** - pl-PL - Female - Agnieszka
- **pl-PL\_CLOUD\_Male\_Jacek** - pl-PL - Мужской - Яцек
- **pl-PL\_CLOUD\_Female\_Ewa** - pl-PL - Female - Ewa
- **pl-PL\_CLOUD\_Male\_Jan** - pl-PL - Male - Jan
- **pl-PL\_CLOUD\_Female** - pl-PL - Female - Maja
- **pt-BR\_CLOUD\_Female** - pt-BR - Female - Vitoria
- **pt-BR\_CLOUD\_Female\_Camila** - pt-BR - Female - Camila
- **pt-BR\_CLOUD\_Male** - pt-BR - Male - Ricardo
- **pt-PT\_CLOUD\_Male** - pt-PT - Male - Cristiano
- **pt-PT\_CLOUD\_Female** - pt-PT - Female - Ines
- **ro-RO\_CLOUD\_Female** - ro-RO - Female - Carmen
- **sv-SE\_CLOUD\_Female** - sv-SE - Female - Astrid
- **tr-TR\_CLOUD\_Female** - tr-TR - Female - Filiz
- **pt-BR\_CLOUD\_Female\_Camila** - pt-BR - Female - Camila

#### Пико ТТС

- **en-US** - Englisch US
- **en-GB** - Englisch GB
- **de-DE** - Deutsch
- **it-IT** - Italiano
- **es-ES** - Espaniol
- **fr-FR** - Français

#### Коки TTS

- Английский
- немецкий
- Испанский
- Французский
- Нидерландский
- 日本

#### Amazon Polly Direct

- **ru-RU\_AP\_Female** - Русский - Татьяна
- **ru-RU\_AP\_Male** - Русский - Максим
- **de-DE\_AP\_Female** - Deutsch - Марлен
- **de-DE\_AP\_Female\_Vicki** - Deutsch - Вики
- **de-DE\_AP\_Male** - Deutsch - Ганс
- **en-US\_AP\_Female** - en-US - Female - Salli
- **ru-US\_AP\_Male** - ru-US - Мужчина - Джоуи
- **da-DK\_AP\_Female** - da-DK - Женщина - Наджа
- **da-DK\_AP\_Male** - da-DK - Мужской - Мадс
- **ru-AU\_AP\_Female** - ru-AU - Женщина - Николь
- **ru-AU\_AP\_Male** - ru-AU - Мужской - Рассел
- **ru-GB\_AP\_Female\_Amy** - ru-GB - Женщина - Эми
- **en-GB\_AP\_Male** - en-GB - Мужчина - Брайан
- **ru-GB\_AP\_Female\_Emma** - ru-GB - Женщина - Эмма
- **en-GB-WLS\_AP\_Female** - en-GB-WLS - Женщина - Гвинет
- **en-GB-WLS\_AP\_Male** - en-GB-WLS - Male - Geraint
- **cy-GB\_AP\_Female** - cy-GB - Female - Gwyneth
- **cy-GB\_AP\_Male** - cy-GB - Male - Geraint
- **en-IN\_AP\_Female** - en-IN - Женщина - Равина
- **ru-US\_AP\_Male\_Chipmunk** - ru-US - Самец - Бурундук
- **en-US\_AP\_Male\_Eric** - en-US - Male - Eric
- **en-US\_AP\_Female\_Ivy** - en-US - Female - Ivy
- **en-US\_AP\_Female\_Jennifer** - en-US - Female - Jennifer
- **ru-US\_AP\_Male\_Justin** - ru-US - Мужчина - Джастин
- **en-US\_AP\_Female\_Kendra** - en-US - Female - Kendra
- **en-US\_AP\_Female\_Kimberly** - en-US - Female - Kimberly
- **es-ES\_AP\_Female** - es-ES - Женщина - Кончита
- **es-ES\_AP\_Male** - es-ES - Мужчина - Энрике
- **es-US\_AP\_Female** - es-US - Female - Penelope
- **es-US\_AP\_Male** - es-US - Мужской - Мигель
- **fr-CA\_AP\_Female** - fr-CA - Female - Chantal
- **fr-FR\_AP\_Female** - fr-FR - Female - Celine
- **fr-FR\_AP\_Male** - fr-FR - Male - Mathieu
- **is-IS\_AP\_Female** - is-IS - Female - Dora
- **is-IS\_AP\_Male** - is-IS - Male - Karl
- **it-IT\_AP\_Female** - it-IT - Female - Carla
- **it-IT\_AP\_Male** - it-IT - Male - Giorgio
- **nb-NO\_AP\_Female** - nb-NO - Female - Liv
- **nl-NL\_AP\_Female** - nl-NL - Female - Lotte
- **nl-NL\_AP\_Male** - nl-NL - Male - Ruben
- **pl-PL\_AP\_Female\_Agnieszka** - pl-PL - Женщина - Агнешка
- **pl-PL\_AP\_Male\_Jacek** - pl-PL - Мужской - Яцек
- **pl-PL\_AP\_Female\_Ewa** - pl-PL - Female - Ewa
- **pl-PL\_AP\_Male\_Jan** - pl-PL - Male - Jan
- **pl-PL\_AP\_Female** - pl-PL - Female - Maja
- **pt-BR\_AP\_Female** - pt-BR - Female - Vitoria
- **pt-BR\_AP\_Male** - pt-BR - Male - Ricardo
- **pt-PT\_AP\_Male** - pt-PT - Male - Cristiano
- **pt-PT\_AP\_Female** - pt-PT - Female - Ines
- **ro-RO\_AP\_Female** - ro-RO - Female - Carmen
- **sv-SE\_AP\_Female** - sv-SE - Женщина - Астрид
- **tr-TR\_AP\_Female** - tr-TR - Female - Filiz
- **ko-KR\_AP\_Female** - ko-KR - Женщина - Соён

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 5.7.0 (2026-11-19)
- (@GermanBluefox) Added the message "help": a description of all messages for AI agents (e.g. pi-agent), and common.supportedMessages.help

### 5.6.1 (2026-11-18)
- (@GermanBluefox) Fixed: WiiM streamers use the state play_URL, as they do not support playPromptUrl (#537)

### 5.6.0 (2026-11-04)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (@GermanBluefox) Fixed: the announcement sound was overwritten by the following text, so external players (e.g. Squeezebox) said the text twice (#527)
- (@GermanBluefox) Added the output type "WiiM / LinkPlay" for the streamers of the wiim adapter
- (@GermanBluefox) Added the output type "Assistant satellites" for the voice satellites of the assistant adapter
- (@GermanBluefox) Added the output type "Alexa" for the Echo devices of the alexa2 adapter
- (@GermanBluefox) Added the output type "Bose SoundTouch" with the notification interface of the speaker, which resumes the playback
- (@GermanBluefox) Added the output type "Kodi" for the kodi adapter
- (@GermanBluefox) Added the output type "Asterisk (phone call)": the text is played in a phone call of the asterisk adapter
- (@GermanBluefox) The configuration shows a hint for the output types, which do not restore the playback (Google Home, Kodi)

### 5.5.0 (2026-10-27)
* (@hdering) Added the Aura dashboards as a target of the output type "Browser" (#518)
* (@GermanBluefox) Added the output type "Fully Kiosk Browser" for the tablets of the fullybrowser adapter

### 5.4.0 (2026-10-23)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Added the output type "Squeezebox" for the players of the squeezeboxrpc adapter (#5)
* (@GermanBluefox) Added Piper as a new local TTS engine, e.g. with the voices of Thorsten-Voice (#398)

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