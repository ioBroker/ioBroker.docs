---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sayit/README.md
title: ioBroker sayit адаптер
hash: iKZAJidQHuyYqiVCtChm9m1nExJtvRV2zI1LVq7PX9s=
---
![Логотип](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Количество установок](http://iobroker.live/badges/sayit-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# IoBroker sayit адаптер
![Тест и выпуск](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер SayIt может преобразовывать текст в речь и воспроизводить ее на некоторых устройствах.

## Конфигурация
Фактически поддерживаются следующие выходы:

- *Браузер* - браузер воспроизведет текст на открытой странице `iobroker.vis`. Поддерживается почти всеми браузерами для настольных компьютеров и несколькими мобильными браузерами.

- *[Home24- MediaPlayer](http://www.home-24.net/index.php?app=media)* - текст будет отправлен и воспроизведен на Android-устройстве с установленным Home24 - MediaPlayer. Для этого будет использован встроенный в Android движок преобразования текста в речь. Порт нельзя изменить, установите значение 50000.

- *Home24 - MediaPlayer и [FTP Server](https://play.google.com/store/apps/details?id=lutey.FTPServer)* - текст будет отправлен и воспроизведен на Android-устройстве с установленным Home24 - MediaPlayer. Для этого будет использоваться движок Google text to speech. Сгенерированный mp3-файл будет скопирован по FTP на Android-устройство и воспроизведен с помощью Home24 - MediaPlayer.

Оба приложения должны иметь одинаковые домашние каталоги. (Например, корневой каталог \"sd card\").

- *Система* - текст будет воспроизводиться ОС, на которой работает адаптер ioBroker. Поддерживаются следующие ОС: Windows, linux, Mac OSx.

- *Движок Windows* - текст будет воспроизводиться Windows, где запущен адаптер sayIt. Для этого будет использоваться движок Windows Text to Speech, который должен быть предварительно настроен пользователем. Вы можете проверить [здесь](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7), как его настроить.

- *Sonos* - воспроизведение текста на устройстве Sonos. Убедитесь, что веб-адаптер включен. Он необходим для включения SONOS для чтения сгенерированных mp3-файлов.

- *Heos* - воспроизведение текста на устройстве HEOS. Убедитесь, что веб-адаптер включен. Он необходим для включения HEOS для чтения сгенерированных файлов mp3.

- *Chromecast* — воспроизведение текста на устройстве Chromecast.

- *MPD* - воспроизведение текста на Music Player Daemon. Используйте только **http** для веб-адаптера, не используйте https.

Чтобы включить функцию преобразования текста в речь на RaspberryPI или в системе Linux, выполните один раз следующую команду `sudo apt-get -y install mpg321`, чтобы установить mpg321.

Файлы mp3/wav можно воспроизводить, записав их имя в объект. (например, `/vis.0/main/img/door-bell.mp3`)

Файл должен быть сначала загружен.

### Двигатели TTS
Онлайн:

- Google: английский, немецкий, русский, итальянский, испанский, французский;
- Яндекс: Русский

Для использования голосов Яндекса необходимо запросить ключ API здесь: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/). [Эта услуга будет отключена 1 января 2019 года и заменена на Yandex.cloud] Для использования Yandex.cloud необходимо зарегистрироваться здесь: [https://cloud.yandex.ru/], установить SpeechKIT API в облаке и получить токен аутентификации и идентификатор папки, как описано в инструкциях API.

- Облако: для использования голосов Cloud вам необходимо настроить и запустить адаптер `cloud` или ввести ключ приложения непосредственно в настройках.
- Опрос Amazon Web Services:

Чтобы использовать голоса AWS Polly, вам необходимо создать ключ доступа и секретный ключ [здесь](https://console.aws.amazon.com/iam/home). Документацию Amazon вы можете найти [здесь](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).

Оффлайн:

- PicoTTS (только Linux): английский, немецкий, итальянский, испанский, французский;

Для PicoTTS необходимо установить следующие пакеты: `libttspico-utils` и lame.
Команда установки: `sudo apt-get install libttspico-utils lame`

- Coqui TTS: английский, немецкий, испанский, французский, голландский, японский, китайский;

Инструкции по использованию см. в разделе [официальная документация](https://tts.readthedocs.io/en/latest/index.html)

### Форматирование текста опроса Cloud и Amazon Web Services
Вы можете отформатировать текст с помощью [Язык разметки синтеза речи](http://docs.aws.amazon.com/polly/latest/dg/ssml.html).

Наиболее полезные функции:

- `<break time="3s"/>`- сделать паузу на x секунд (максимум 10 секунд).
- `<emphasis> большой </emphasis>` - сделать ударение на каком-либо слове.
- `<prosody volume="+6dB" rate="90%">Я говорю это</prosody>` - управление параметрами скорости и громкости.
- `<say-as interpret-as="digits">12345</say-as>` - произнесите каждую цифру отдельно.

Подробнее [информация](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### Системная команда
Если у вас есть какая-то программа, которая может воспроизводить аудиофайлы локально или где-то еще, вы можете написать эту команду здесь. Например:

`myCustomPlayer --option`

Если выбран выход **System**, адаптер `sayit` выполнит следующую команду в локальной системе:

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

Если имя файла должно располагаться где-то посередине, можно использовать *%s*, чтобы указать, где должно располагаться имя файла:

`myCustomPlayer --option "%s" > /dev/null`

sayIt сделает из него `myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null`.

## Использование
Адаптер SayIt не может использоваться отдельно. Он должен управляться из адаптера javascript или из "vis" с определенным виджетом. После создания экземпляра адаптера вы можете найти следующие объекты:

- `sayit.N.tts.text`: Фраза, которую нужно произнести.
- `sayit.N.tts.volume`: громкость, с которой будет воспроизводиться фраза.
- `sayit.N.tts.playing`: true, если текст сейчас воспроизводится, и false, если нет. Поддерживается только для режимов воспроизведения "windows" и "system".
- `sayit.N.tts.cachetext`: Фраза, которая будет кэширована, и затем ее можно будет использовать без подключения к интернету.

Например, вы можете ввести здесь вручную "Нет интернета" и если пинг до google.com отрицательный, написать "Нет интернета" в "tts.text" и это будет произнесено. Конечно, кэш должен быть включен.

Состояние `tts.text` поддерживает расширенный синтаксис, поэтому язык/движок и громкость могут быть определены вместе с текстом. Он используется для включения многоязычных движков text2speech.
Например, если адаптер имеет движок `Google-english`, возможно с помощью фразы `de:Sag es` принудительно использовать речевой движок Google-Deutsch.

С помощью `ru;75;Погода хорошая` мы можем принудительно использовать русский язык и громкость 75%.

Вы можете указать громкость объявления в процентах от текущей или заданной громкости (не от максимальной). Например, если команда `de;75;Gutes Wetter`и «громкость объявления» составляет 50%, объявление будет воспроизводиться с громкостью 38% из 100% возможных.

Также можно указать системную команду для воспроизведения mp3-файла. Если оставить поле пустым, будут использоваться настройки по умолчанию: windows - `cmdmp3.exe`, OSX - `/usr/bin/afplay`, linux - `mpg321` или `omxplayer` (рекомендуется).

Чтобы установить omxplayer, напишите `sudo apt-get install omxplayer` или напишите `sudo apt-get install mpg321`, чтобы установить mpg321.

**Примечание:** Выбор объявления по умолчанию будет возможен только после запуска экземпляра.

### Приоритеты
Чтобы немедленно произнести текст, несмотря на очередь текстов, у вас есть две возможности:

- поместите «!» в качестве первого символа в тексте, чтобы этот текст был произнесен сразу после текущего.
- запишите true в состояние "tts.clearQueue" и очередь будет очищена. После этого вы можете записать новый текст в `tts.text`, но все тексты в очереди будут отброшены.

### Двигатели
Возможны следующие значения для двигателей:

#### Google
- **en** - Английский
- **de** - немецкий
- **pl** - Польский
- **ru** - Русский
- **ук** - украинский
- **it** - Итальяно
- **es** - Эспаньол
- **fr** - французский
- **nl** - Нидерланды
- **zh-CN** - 简体中文
- **pt** - португальский

#### Яндекс
- **ru_Я:Яндекс** - Русский
- **ru_YA_CLOUD:Yandex Cloud** - Русский [API Яндекс.Облака генерирует файлы в формате OGG. Для воспроизведения файлов ogg на Linux необходимо установить mplayer и выбрать его в качестве системного проигрывателя]

#### Amazon опрос через облако
- **ru-RU_CLOUD_Female** - Русский - Татьяна
- **ru-RU_CLOUD_Male** - Русский - Максим
- **de-DE_CLOUD_Female** - Deutsch - Марлен
- **de-DE_CLOUD_Male** - Немецкий - Ганс
- **de-DE_CLOUD_Female_Vicki** - Deutsch - Вики
- **de-DE_CLOUD_Male_Daniel** - Deutsch - Даниэль
- **de-AT_CLOUD_Female_Hannah** - Австрия - Ханна
- **en-US_CLOUD_Female** - en-US - Женский - Салли
- **en-US_CLOUD_Male** - en-US - Мужской - Джоуи
- **da-DK_CLOUD_Female** - da-DK - Женщина - Наджа
- **da-DK_CLOUD_Male** - da-DK - Мужчина - Мэдс
- **en-AU_CLOUD_Female** - ru-AU – Женщина – Николь
- **en-AU_CLOUD_Male** - ru-AU – Мужской – Рассел
- **en-GB_CLOUD_Female_Amy** - en-GB - Женский - Эми
- **en-GB_CLOUD_Male** - ru-GB - Мужчина - Брайан
- **en-GB_CLOUD_Female_Emma** - ru-GB - Женщина - Эмма
- **en-GB-WLS_CLOUD_Female** - en-GB-WLS - Женский - Гвинет
- **en-GB-WLS_CLOUD_Male** - en-GB-WLS - Мужской - Geraint
- **cy-GB_CLOUD_Female** - cy-GB - Женский - Гвинет
- **cy-GB_CLOUD_Male** - cy-GB - Мужской - Герайнт
- **en-IN_CLOUD_Female** - en-IN - Женский - Равина
- **en-US_CLOUD_Male_Chipmunk** - en-US - Мужчина - Бурундук
- **en-US_CLOUD_Male_Eric** - en-US - Мужчина - Эрик
- **en-US_CLOUD_Female_Ivy** - en-US - Женский - Ivy
- **en-US_CLOUD_Female_Jennifer** - en-US - Женщина - Дженнифер
- **en-US_CLOUD_Male_Justin** - en-US - Мужской - Джастин
- **en-US_CLOUD_Женский_Кендра** - en-US - Женский - Кендра
- **en-US_CLOUD_Female_Kimberly** - en-US - Женский - Кимберли
- **es-ES_CLOUD_Female** - es-ES - Женщина - Кончита
- **es-ES_CLOUD_Male** - es-ES - Мужчина - Энрике
- **es-US_CLOUD_Female** - es-US - Женский - Пенелопа
- **es-US_CLOUD_Male** - es-US - Мужской - Мигель
- **fr-CA_CLOUD_Female** - fr-CA - Женский - Шанталь
- **fr-FR_CLOUD_Female** - fr-FR - Женский - Селин
- **fr-FR_CLOUD_Male** - fr-FR - Мужской - Матье
- **is-IS_CLOUD_Female** - is-IS - Женщина - Дора
- **is-IS_CLOUD_Male** - is-IS - Мужской - Карл
- **it-IT_CLOUD_Female** - it-IT - Женщина - Карла
- **it-IT_CLOUD_Male** - it-IT - Мужской - Джорджио
- **nb-NO_CLOUD_Female** - no-NO - Female - Liv
- **no-NO_CLOUD_Female** - no-NO - Female - Ида
- **nl-NL_CLOUD_Female** - nl-NL - Female - Лотте
- **nl-NL_CLOUD_Male** - nl-NL - Мужской - Рубен
- **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - Женщина - Агнешка
- **pl-PL_CLOUD_Male_Jacek** - pl-PL - Мужчина - Яцек
- **pl-PL_CLOUD_Female_Ewa** - pl-PL - Женщина - Ewa
- **pl-PL_CLOUD_Male_Jan** - pl-PL - Мужской - Янв
- **pl-PL_CLOUD_Female** - pl-PL - Женский - Майя
- **pt-BR_CLOUD_Female** - pt-BR - Female - Витория
- **pt-BR_CLOUD_Женский_Камила** - pt-BR - Женский - Камила
- **pt-BR_CLOUD_Male** - pt-BR - Мужчина - Рикардо
- **pt-PT_CLOUD_Male** - pt-PT - Мужской - Криштиану
- **pt-PT_CLOUD_Female** - pt-PT - Женщина - Инес
- **ro-RO_CLOUD_Female** - ro-RO - Женщина - Кармен
- **sv-SE_CLOUD_Female** - sv-SE - Женщина - Астрид
- **tr-TR_CLOUD_Female** - tr-TR - Женский - Филиз
- **pt-BR_CLOUD_Женский_Камила** - pt-BR - Женский - Камила

#### Пико ТТС
- **en-US** - Английский (США)
- **en-GB** - Английский GB
- **de-DE** - немецкий
- **it-IT** - Итальяно
- **es-ES** - Эспаньол
- **fr-FR** - французский

#### Коки ТТС
- Английский
- Немецкий
- Испанский
- французский
- Нидерланды
- 日本

#### Amazon опрос прямой
- **ru-RU_AP_Female** - Русский - Татьяна
- **ru-RU_AP_Male** - Русский - Максим
- **de-DE_AP_Female** - Deutsch - Марлен
- **de-DE_AP_Female_Vicki** - Deutsch - Вики
- **de-DE_AP_Male** - Немецкий - Ганс
- **en-US_AP_Female** - ru-US - Женский - Салли
- **en-US_AP_Male** - ru-US - Мужчина - Джоуи
- **da-DK_AP_Female** - da-DK - Женщина - Наджа
- **da-DK_AP_Male** - da-DK - Мужской - Мэдс
- **en-AU_AP_Female** - ru-AU - Женский - Николь
- **en-AU_AP_Male** - ru-AU - Мужской - Рассел
- **en-GB_AP_Female_Amy** - ru-GB - Женщина - Эми
- **en-GB_AP_Male** - ru-GB - Мужчина - Брайан
- **en-GB_AP_Female_Emma** - ru-GB - Женщина - Эмма
- **en-GB-WLS_AP_Female** - en-GB-WLS - Женский - Гвинет
- **en-GB-WLS_AP_Male** - en-GB-WLS - Мужской - Geraint
- **cy-GB_AP_Female** - cy-GB - Женщина - Гвинет
- **cy-GB_AP_Male** - cy-GB - Мужчина - Герайнт
- **en-IN_AP_Female** - en-IN - Женщина - Равина
- **en-US_AP_Male_Chipmunk** - en-US - Мужчина - Бурундук
- **en-US_AP_Male_Eric** - en-US - Мужчина - Эрик
- **en-US_AP_Female_Ivy** - en-US - Женский - Ivy
- **en-US_AP_Female_Jennifer** - en-US - Женщина - Дженнифер
- **en-US_AP_Male_Justin** - en-US - Мужчина - Джастин
- **en-US_AP_Female_Kendra** - ru-US - Женщина - Кендра
- **en-US_AP_Female_Kimberly** - en-US - Женский - Кимберли
- **es-ES_AP_Female** - es-ES - Женщина - Кончита
- **es-ES_AP_Male** - es-ES - Мужской - Энрике
- **es-US_AP_Female** - es-US - Женский - Пенелопа
- **es-US_AP_Male** - es-US - Мужской - Мигель
- **fr-CA_AP_Female** - fr-CA - Женский - Шанталь
- **fr-FR_AP_Female** - fr-FR - Женский - Селин
- **fr-FR_AP_Male** - fr-FR - Мале - Матье
- **is-IS_AP_Female** - is-IS - Женщина - Дора
- **is-IS_AP_Male** - is-IS - Мужчина - Карл
- **it-IT_AP_Female** - it-IT - Женщина - Карла
- **it-IT_AP_Male** - it-IT - Мужчина - Джорджио
- **nb-NO_AP_Female** - nb-NO - Женский - Liv
- **nl-NL_AP_Female** - nl-NL - Female - Лотте
- **nl-NL_AP_Male** - nl-NL - Мужчина - Рубен
- **pl-PL_AP_Female_Agnieszka** - pl-PL - Женщина - Агнешка
- **pl-PL_AP_Male_Jacek** - pl-PL - Мужской - Яцек
- **pl-PL_AP_Female_Ewa** - pl-PL - Женский - Ewa
- **pl-PL_AP_Male_Jan** - pl-PL - Мужской - Янв
- **pl-PL_AP_Female** - pl-PL - Женский - Майя
- **pt-BR_AP_Female** - pt-BR - Female - Витория
- **pt-BR_AP_Male** - pt-BR - Мужчина - Рикардо
- **pt-PT_AP_Male** - pt-PT - Мужчина - Криштиану
- **pt-PT_AP_Female** - pt-PT - Женщина - Инес
- **ro-RO_AP_Female** - ro-RO - Женщина - Кармен
- **sv-SE_AP_Female** - sv-SE - Женщина - Астрид
- **tr-TR_AP_Female** - tr-TR - Женский - Филиз
- **ko-KR_AP_Female** - ko-KR - Женщина - Соён

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 5.0.0 (2024-07-16)
* (mcm1957) Adapter requires admin v7 or newer now
* (mcm1957) Adapter requires jas-controller 5 or newer now
* (bluefox) Added possibility to play directly from states: `sayit.0/tts.userfiles/gong.mp3`

### 4.0.5 (2024-07-12)
* (bluefox) Packages updated
* (bluefox) Corrected playing in vis
* (bluefox) Corrected blockly
* (bluefox) Corrected upload of files

### 4.0.1 (2024-05-25)
* (bluefox) Packages updated
* (neopholus) Using the pre-calculated duration of the mp3 to wait long enough even for longer announcements

### 4.0.0 (2023-10-31)
* (bluefox) Breaking changes: A minimal node.js version is 16
* (bluefox) Browser outputs now to vis(1) and vis-2

### 3.0.5 (2023-04-17)
* (bluefox) Corrected error with System player
* (bluefox) Do not allow for chromecast to cache files.
* (bluefox) Allowed to add cloud App-Key without running cloud adapter
* (bluefox) Added austrian language
* (bluefox) Added norwegian language
* (klein0r) Used sendTo instead of setState in blockly

### 3.0.0 (2023-04-03)
* (bluefox) Restored cloud engines. Warning: update cloud adapter to at least 4.4.0
* (bluefox) Breaking changes: A minimal node.js version is 14

### 2.1.2 (2023-03-27)
* (bluefox) Corrected engines with web-link

### 2.1.1 (2023-03-24)
* (Jey-Cee) Added support for Coqui TTS
* (bluefox) Renamed all configuration attributes

### 2.0.0 (2023-03-23)
* (bluefox) Adapter was completely rewritten with async/await
* (bluefox) Could be buggy

### 1.13.0 (2023-03-22)
* (bluefox) Made compatible with future js-controller

### 1.12.6 (2022-02-09)
* (bluefox) used setForeignBinaryState if possible

### 1.12.5 (2022-02-09)
* (bluefox) Fixed errors in io-package.json

### 1.12.3 (2021-06-25)
* (bluefox) corrected the Google engine
* (bluefox) Added new voices: german, korean, brasil, Dutch

### 1.12.2 (2020-11-07)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SAYIT-Q, IOBROKER-SAYIT-S, IOBROKER-SAYIT-T)

### 1.12.0 (2020-10-19)
* (withstu) Support for HEOS was added

### 1.11.5 (2020-09-24)
* (Apollon77) prevent scheduled restart problems

### 1.11.3 (2020-09-17)
* (Apollon77) make sure initialize errors do not crash adapter (Sentry IOBROKER-SAYIT-N)

### 1.11.2 (2020-08-08)
* (Apollon77) catch errors in MDNS discovery (Sentry IOBROKER-SAYIT-E)

### 1.11.1 (2020-08-06)
* (Apollon77) handle errors from process spawn better (Sentry IOBROKER-SAYIT-D)

### 1.11.0 (2020-08-02)
* (Apollon77) Move the generated mp3 file to an own directory in iobroker-data instead of inside node_modules (Hopefully not breaking)
* (Apollon77) Change the file writing to use Sync methods to make sure they cannot run in parallel

### 1.10.2 (2020-07-19)
* (Apollon77) Crash case prevented (Sentry IOBROKER-SAYIT-8)

### 1.10.1 (2020-07-16)
* (Apollon77) Handle edge cases and prevent crashes (Sentry IOBROKER-SAYIT-4, IOBROKER-SAYIT-6)
* (Apollon77) try to get caching working again for Yandex

### 1.10.0 (2020-07-07)
* (algar42) GUI updated to fill drop-downs correctly. Premium voices added to Yandex.Cloud engine

### 1.9.8 (2020-06-11)
* (Apollon77) fixed error handling on file copy

### 1.9.7 (2020-06-11)
* (algar42) tts.ogg state added for ogg file type

### 1.9.6 (2020-05-24)
* (bluefox) Showed names of SONOS devices

### 1.9.4 (2020-05-11)
* (Apollon77) Fix Blockly
* (Apollon77) Update dependencies

### 1.9.3 (2020-04-24)
* (bluefox) Fixed blockly with missing languages

### 1.9.2 (2020-04-21)
Changed type of top-level object to "meta" in order to comply with js-controller v3

### 1.9.1 (2020-03-12)
* (foxriver76) removed usage of adapter.getMessage

### 1.9.0 (2019-11-06)
* (algar42) Output file extension is changed dynamically based on the engine selected

### 1.8.2 (2019-07-11)
* (bluefox) Web server URL will be updated if web server was updated

### 1.8.1
* Add Ukrainian Google Language

### 1.8.0 (2018-12-04)
* (bluefox) Priority for the text was added

### 1.7.1 (2018-09-19)
* (BuZZy1337) fixed error in Blockly-Block

### 1.7.0 (2018-06-08)
* (bluefox) Ivona removed
* (bluefox) Error was fixed by upload of file to FTP
* (bluefox) admin3

### 1.6.8 (2018-04-11)
* (BuZZy1337) Generate separate mp3 files for each instance.
* Fixes [Issue#34](https://github.com/ioBroker/ioBroker.sayit/issues/34)
* (BuZZy1337) Always upload mp3 files to the state sayit.X.tts.mp3

### 1.6.7 (2018-02-05)
* (Apollon77) Remove unneeded logging
* (bondrogeen) Admin3 Fixes

### 1.6.6 (2017-11-27)
* (angelnu) Wait for a Google Home announcement to complete

### 1.6.5 (2017-11-04)
* (bluefox) Fix cloud .pro

### 1.6.4 (2017-10-18)
* (bluefox) Fix system commands

### 1.6.3 (2017-10-04)
* (bluefox) Code refactoring
* (bluefox) Add Google Home as output
* (bluefox) Remove ivona because not more supported

### 1.5.2 (2017-03-09)
* (bluefox) Catch error if some directory in mp3 folder

### 1.5.1 (2017-02-15)
* (bluefox) Fix blockly language

### 1.5.0 (2017-01-27)
* (DarkChaos) Add AWS Polly as source
* (bluefox) Add cloud as a source

### 1.4.0 (2017-01-16)
* (bluefox) fixed install problem
* (bluefox) add PicoTTS as a source

### 1.3.3 (2017-01-13)
* (bluefox) show only installed instances in blockly

### 1.3.2 (2017-01-10)
* (angelnu) changes for new chromecast tts

### 1.3.1 (2016-12-27)
* (bluefox) small fixed of config dialog
* (AirKing555) Fix Volume change

### 1.3.0 (2016-12-20)
* (instalator) add mpd

### 1.2.1 (2016-10-31)
* (bluefox) Fix cache

### 1.2.0 (2016-10-28)
* (bluefox) Finish sayit

### 1.1.3 (2016-10-24)
* (bluefox) Fix changing of engine

### 1.1.2 (2016-10-20)
* (bluefox) Add omxplayer option

### 1.0.1 (2016-10-12)
* (bluefox) support for blockly

### 1.0.0 (2016-05-14)
* (bluefox) Make the type of mp3 as file

### 0.3.16 (2015-12-26)
* (Vegetto) Support for Chromecast devices

### 0.3.16 (2015-12-26)
* (bluefox) enable play of mp3 files from disk

### 0.3.15 (2015-11-10)
* (bluefox) fill default settings by first start

### 0.3.14 (2015-11-01)
* (bluefox) fixed error with sayItWindows

### 0.3.13 (2015-10-27)
* (bluefox) fixed error with sayItSystem

### 0.3.12 (2015-10-06)
* (bluefox) fixed error if received mp3 file is too short
* (bluefox) try to implement cache datapoint (you can use `sayit.0.tts.cachetext` to create cache for phrases and use sayit without internet)

### 0.3.11 (2015-08-03)
* (bluefox) change google requests from http to https

### 0.3.10 (2015-07-26)
* (bluefox) add new voice Russian-Maxim
* (bluefox) fixed error with mp24ftp

### 0.3.9 (2015-07-09)
* (bluefox) fixed error by mediaplayer24

### 0.3.8 (2015-06-09)
* (bluefox) make the volume for announcement configurable
* (bluefox) make the command for "system" configurable

### 0.3.7 (2015-05-28)
* (bluefox) fixed volume for an announcement
* (bluefox) support for play files from internal filesystem, like `/sayit.0/tts.userfiles/myGong.mp3`

### 0.3.6 (2015-03-24)
* (bluefox) fixed error with volume by sonos

### 0.3.5 (2015-03-22)
* (bluefox) fixed error in an announcement

### 0.3.4 (2015-03-20)
* (bluefox) fixed error in an announcement

### 0.3.3 (2015-03-20)
* (bluefox) enable announcement

### 0.3.2 (2015-03-16)
* (bluefox) clear cache if engine changed

### 0.3.1 (2015-03-15)
* (bluefox) fixed small error with log

### 0.3.0 (2015-03-08)
* (bluefox) add ivona/Amazon voices

### 0.2.2 (2015-03-08)
* (bluefox) fixed error by buffering of non-generated texts.

### 0.2.1 (2015-03-07)
* (bluefox) fixed error by buffering of non-generated texts.

### 0.2.0 (2015-03-02)
* (bluefox) add yandex-russian support

### 0.1.0 (2015-03-02)
* (bluefox) queue texts

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2024, bluefox <dogafox@gmail.com>

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