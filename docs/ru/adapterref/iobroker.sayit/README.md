---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sayit/README.md
title: адаптер ioBroker
hash: svcuBbXbXcVqfQFMIhFTugClyxe3otZ6kM/tvlhIBOI=
---
![Логотип](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Количество установок](http://iobroker.live/badges/sayit-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# Адаптер sayit ioBroker
![Тестируйте и выпускайте](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер SayIt может преобразовывать текст в речь и воспроизводить его на некоторых устройствах.

## Конфигурация
Поддерживаются фактические следующие выходы:

- *Браузер* - текст будет воспроизводиться браузером с открытой страницей iobroker.vis. Он поддерживается почти всеми настольными браузерами и несколькими мобильными браузерами.

- *[Home24-MediaPlayer](http://www.home-24.net/index.php?app=media)* - текст будет отправлен и воспроизведен на Android-устройстве с установленным Home24 - MediaPlayer. Для этого будет использоваться встроенный в Android движок преобразования текста в речь. Порт нельзя изменить и установить на 50000.

- *Home24 - MediaPlayer и [FTP-сервер](https://play.google.com/store/apps/details?id=lutey.FTPServer)* - текст будет отправлен и воспроизведен на устройстве Android с Home24 - MediaPlayer установлен. Для этого будет использоваться движок преобразования текста в речь Google. Сгенерированный файл mp3 будет скопирован через FTP на устройство Android и воспроизведен с помощью Home24 - MediaPlayer.

    Оба приложения должны иметь одинаковые домашние каталоги. (Например, корневой каталог \"sd-карты\").

- *Система* - текст будет воспроизводиться ОС, на которой работает адаптер ioBroker. Поддерживаются следующие ОС: Windows, Linux, Mac OSx.

- *Windows engine* - текст будет воспроизводиться окнами, в которых работает адаптер sayIt. Для этого будет использоваться движок преобразования текста в речь Windows, который должен быть предварительно настроен пользователем. Вы можете проверить [здесь](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7), как его настроить.

- *Sonos* - воспроизведение текста на устройстве Sonos. Убедитесь, что веб-адаптер включен. Требуется, чтобы SONOS мог читать сгенерированные файлы mp3.

- *Heos* - воспроизводить текст на устройстве HEOS. Убедитесь, что веб-адаптер включен. Необходимо, чтобы HEOS мог читать сгенерированные файлы mp3.

- *Chromecast* - воспроизведение текста на устройстве Chromecast.

- *MPD* - проигрывать текст на Music Player Daemon. Используйте только **http** для веб-адаптера, не используйте https.

Чтобы включить преобразование текста в речь в системе RaspberryPI или Linux, вызовите один раз следующую команду `sudo apt-get -y install mpg321`, чтобы установить mpg321.

Файлы mp3/wav можно воспроизводить, записав их имя в объект. (например, `/vis.0/main/img/door-bell.mp3`)

Файл должен быть предварительно загружен.

### Двигатели ТТС
В сети:

- Google: английский, немецкий, русский, итальянский, испанский, французский;
- Яндекс: русский

Чтобы использовать голоса Яндекса, вы должны запросить ключ API здесь: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/). [Этот сервис будет отключен 1 января 2019 года и заменен Яндекс.Облаком] Для использования Яндекс.Облака вам необходимо зарегистрироваться здесь: [https://cloud.yandex.ru/], установить SpeechKIT API в Облаке и получить Auth Token и идентификатор папки, как описано в инструкциях API.

- Облако: для использования облачных голосов вам необходимо настроить и запустить облачный адаптер.
- Полли Amazon Web Services:

  Чтобы использовать голоса AWS Polly, необходимо создать ключ доступа и секретный ключ [здесь] (https://console.aws.amazon.com/iam/home). Документацию Amazon вы можете найти [здесь](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).

не в сети:

- PicoTTS (только для Linux): английский, немецкий, итальянский, испанский, французский;

Для PicoTTS необходимо установить следующие пакеты: `libttspico-utils` и lame.
Команда установки: `sudo apt-get install libttspico-utils lame`

- Coqui TTS: английский, немецкий, испанский, французский, голландский, японский, китайский;

  Инструкции по использованию см. в [официальная документация](https://tts.readthedocs.io/en/latest/index.html)

### Облако и Amazon Web Services Форматирование текста Polly
Вы можете отформатировать текст с помощью [Язык разметки синтеза речи](http://docs.aws.amazon.com/polly/latest/dg/ssml.html).

Наиболее полезные функции:

- `<break time="3s"/>`- сделать паузу на x секунд (максимум 10 секунд).
- `<emphasis>большой</emphasis>` - сделать ударение на каком-то слове.
- `<prosody volume="+6dB" rate="90%">Я говорю это</prosody>` - управлять параметрами скорости и громкости.
- `<say-asterpret-as="digits">12345</say-as>` — произносить каждую цифру отдельно.

Еще [Информация](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### Системная команда
Если у вас есть программа, которая может воспроизводить аудиофайлы локально или где-то еще, вы можете написать эту команду здесь. Например.

```myCustomPlayer --option```

Если выбран выход **System**, адаптер `sayit` выполнит следующую команду в локальной системе:

```myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3```

Если имя файла должно оставаться где-то посередине, вы можете использовать *%s*, чтобы указать, где должно быть размещено имя файла:

```myCustomPlayer --option "%s" > /dev/null```

sayIt сделает из него ```myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null```.

## Использование
Адаптер SayIt нельзя использовать отдельно. Он должен управляться из javascript-адаптера или из «vis» с помощью определенного виджета.
После создания экземпляра адаптера вы можете найти следующие объекты:

- `sayit.N.tts.text`: Произносимая фраза.
- `sayit.N.tts.volume`: громкость, которая будет использоваться при воспроизведении фразы.
- `sayit.N.tts.playing`: true, если текст воспроизводится, и false, если нет. Поддерживается только для режимов воспроизведения «Windows» и «System».
- `sayit.N.tts.cachetext`: фраза для кэширования, после чего ее можно будет использовать без интернета.

   Например. вы можете ввести здесь вручную «Нет интернета», и если пинг до google.com отрицательный, напишите «Нет интернета» в «tts.text», и он будет произнесен. Кэш конечно должен быть включен.

Состояние **tts.text** поддерживает расширенный синтаксис, поэтому язык/механизм и громкость можно определить вместе с текстом. Он используется для включения многоязычных движков text2speech.
Например. если адаптер имеет движок "Google-english", можно с помощью фразы ```de:Sag es``` принудительно использовать речевой движок Google-Deutsch.

С помощью ```ru;75;Погода хорошая``` мы можем принудительно использовать русский язык и громкость 75%.

Вы можете указать громкость объявления в процентах от текущей или заданной громкости (не от максимальной). Например. если команда ```de;75;Gutes Wetter``` и "громкость объявления" равна 50%, то объявление будет воспроизводиться с громкостью 38% из возможных 100%.

Также можно указать системную команду для воспроизведения mp3-файла. Если вы оставите это поле пустым, будут использоваться настройки по умолчанию: Windows — `cmdmp3.exe`, OSX — `/usr/bin/afplay`, linux — `mpg321` или `omxplayer` (рекомендуется).

Чтобы установить omxplayer, напишите ```sudo apt-get install omxplayer``` или напишите ```sudo apt-get install mpg321```, чтобы установить mpg321.

**Примечание.** Выбор объявления по умолчанию будет возможен только после запуска экземпляра.

### Приоритеты
Чтобы немедленно произнести текст, несмотря на тексты в очереди, у вас есть 2 возможности:

- место "!" как первый символ в тексте, поэтому этот текст будет произноситься сразу после текущего.
- пропишите true в состояние "tts.clearQueue" и очередь будет очищена. После этого вы можете записать новый текст в "tts.text", но все тексты в очереди будут удалены.

### Двигатели
Возможны следующие значения для двигателей:

#### Google
- **en** - английский
- **de** - немецкий
- **pl** - польский
- **ru** - Русский
- **uk** - український
- **это** - итальяно
- **es** - Эспаньол
- **fr** - французский
- **nl** - Нидерланды
- **zh-CN** - 简体中文
- **pt** - португальский

#### Яндекс
- **ru_YA:Яндекс** - Русский
- **ru_YA_CLOUD:Яндекс Облако** - English [API Яндекс.Облака формирует файлы в формате OGG. Для воспроизведения ogg-файлов в Linux необходимо установить mplayer и выбрать его в качестве системного проигрывателя]

#### Amazon polly через облако
- **ru-RU_CLOUD_Female** - Русский - Татьяна
- **ru-RU_CLOUD_Male** - Русский - Максим
- **de-DE_CLOUD_Female** - Дойч - Марлен
- **de-DE_CLOUD_Male** - Немецкий - Ганс
- **de-DE_CLOUD_Female_Vicki** - Deutsch - Вики
- **en-US_CLOUD_Female** - en-US - Женский - Салли
- **en-US_CLOUD_Male** - en-US - Мужской - Джоуи
- **da-DK_CLOUD_Female** - da-DK - Женский - Naja
- **da-DK_CLOUD_Male** - da-DK - Мужской - Мадс
- **en-AU_CLOUD_Female** - en-AU - Женщина - Николь
- **en-AU_CLOUD_Male** - en-AU - Мужской - Рассел
- **en-GB_CLOUD_Female_Amy** - en-GB - Женский - Эми
- **en-GB_CLOUD_Male** - en-GB - Мужской - Брайан
- **en-GB_CLOUD_Female_Emma** - en-GB - Женщина - Эмма
- **en-GB-WLS_CLOUD_Female** - en-GB-WLS - Женский - Гвинет
- **en-GB-WLS_CLOUD_Male** - en-GB-WLS - Мужской - Герайнт
- **cy-GB_CLOUD_Female** - cy-GB - Женщина - Гвинет
- **cy-GB_CLOUD_Male** - cy-GB - Мужской - Герайнт
- **en-IN_CLOUD_Female** - en-IN - Женский - Равина
- **en-US_CLOUD_Male_Chipmunk** - en-US - Самец - Бурундук
- **en-US_CLOUD_Male_Eric** - en-US - Мужчина - Эрик
- **en-US_CLOUD_Female_Ivy** - en-US - Женский - Плющ
- **en-US_CLOUD_Female_Jennifer** - en-US - Женщина - Дженнифер
- **en-US_CLOUD_Male_Justin** - en-US - Мужчина - Джастин
- **en-US_CLOUD_Female_Kendra** - en-US - Женский - Кендра
- **en-US_CLOUD_Female_Kimberly** - en-US - Женщина - Кимберли
- **es-ES_CLOUD_Female** - es-ES - Женский - Кончита
- **es-ES_CLOUD_Male** - es-ES - Мужской - Энрике
- **es-US_CLOUD_Female** - es-US - Женский - Пенелопа
- **es-US_CLOUD_Male** - es-US - Мужской - Мигель
- **fr-CA_CLOUD_Female** - fr-CA - Женский - Шанталь
- **fr-FR_CLOUD_Female** - fr-FR - Женский - Селин
- **fr-FR_CLOUD_Male** - fr-FR - мужской - Матье
- **is-IS_CLOUD_Female** - is-IS - Женский - Дора
- **is-IS_CLOUD_Male** - is-IS - Мужчина - Карл
- **it-IT_CLOUD_Female** - it-IT - Женщина - Карла
- **it-IT_CLOUD_Male** - it-IT - Мужской - Джорджио
- **nb-NO_CLOUD_Female** - nb-NO - Женский - Лив
- **nl-NL_CLOUD_Female** - nl-NL - Женский - Lotte
- **nl-NL_CLOUD_Male** - nl-NL - Мужской - Рубен
- **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - Женский - Агнешка
- **pl-PL_CLOUD_Male_Jacek** - pl-PL - Male - Jacek
- **pl-PL_CLOUD_Female_Ewa** - pl-PL - женский - Ewa
- **pl-PL_CLOUD_Male_Jan** - pl-PL - Male - Jan
- **pl-PL_CLOUD_Female** - pl-PL - Женский - Майя
- **pt-BR_CLOUD_Female** - pt-BR - Женский - Витория
- **pt-BR_CLOUD_Female_Camila** - pt-BR - Женщина - Камила
- **pt-BR_CLOUD_Male** - pt-BR - Мужской - Рикардо
- **pt-PT_CLOUD_Male** - pt-PT - Мужчина - Криштиану
- **pt-PT_CLOUD_Female** - pt-PT - Женский - Инес
- **ro-RO_CLOUD_Female** - ro-RO - Женский - Кармен
- **sv-SE_CLOUD_Female** - sv-SE - Женский - Астрид
- **tr-TR_CLOUD_Female** - tr-TR - Женский - Филиз
- **pt-BR_CLOUD_Female_Camila** - pt-BR - Женщина - Камила

#### Пико ТТС
- **en-US** - Английский США
- **en-GB** - английский GB
- **de-DE** - Немецкий
- **it-IT** - итальяно
- **es-ES** - Эспаньол
- **fr-FR** - французский

#### Коки ТТС
- Английский
- немецкий
- Эспаньол
- Французский
- Нидерланды
- 日本

#### Амазонка Полли Директ
- **ru-RU_AP_Female** - Русский - Татьяна
- **ru-RU_AP_Male** - Русский - Максим
- **de-DE_AP_Female** - Дойч - Марлен
- **de-DE_AP_Female_Vicki** - Дойч - Вики
- **de-DE_AP_Male** - Немецкий - Ганс
- **en-US_AP_Female** - en-US - Женский - Салли
- **en-US_AP_Male** - en-US - Мужской - Джоуи
- **da-DK_AP_Female** - da-DK - Женский - Naja
- **da-DK_AP_Male** - da-DK - Мужской - Мадс
- **en-AU_AP_Female** - en-AU - Женщина - Николь
- **en-AU_AP_Male** - en-AU - Мужской - Рассел
- **en-GB_AP_Female_Amy** - en-GB - Женский - Эми
- **en-GB_AP_Male** - en-GB - Мужской - Брайан
- **en-GB_AP_Female_Emma** - en-GB - Женский - Эмма
- **en-GB-WLS_AP_Female** - en-GB-WLS - Женщина - Гвинет
- **en-GB-WLS_AP_Male** - en-GB-WLS - Мужской - Герайнт
- **cy-GB_AP_Female** - cy-GB - Женщина - Гвинет
- **cy-GB_AP_Male** - cy-GB - Мужской - Герайнт
- **en-IN_AP_Female** - en-IN - Женский - Равина
- **en-US_AP_Male_Chipmunk** - en-US - Самец - Бурундук
- **en-US_AP_Male_Eric** - en-US - Мужчина - Эрик
- **en-US_AP_Female_Ivy** - en-US - Женский - Плющ
- **en-US_AP_Female_Jennifer** - en-US - Женщина - Дженнифер
- **en-US_AP_Male_Justin** - en-US - Мужской - Джастин
- **en-US_AP_Female_Kendra** - en-US - Женский - Кендра
- **en-US_AP_Female_Kimberly** - en-US - Женщина - Кимберли
- **es-ES_AP_Female** - es-ES - Женский - Кончита
- **es-ES_AP_Male** - es-ES - Мужской - Энрике
- **es-US_AP_Female** - es-US - Женский - Пенелопа
- **es-US_AP_Male** - es-US - Мужской - Мигель
- **fr-CA_AP_Female** - fr-CA - Женский - Шанталь
- **fr-FR_AP_Female** - fr-FR - Женский - Селин
- **fr-FR_AP_Male** - fr-FR - Мужской - Матье
- **is-IS_AP_Female** - is-IS - Женский - Дора
- **is-IS_AP_Male** - is-IS - Мужской - Карл
- **it-IT_AP_Female** - it-IT - Женский - Карла
- **it-IT_AP_Male** - it-IT - Мужской - Джорджио
- **nb-NO_AP_Female** - nb-NO - Женский - Лив
- **nl-NL_AP_Female** - nl-NL - Женский - Lotte
- **nl-NL_AP_Male** - nl-NL - Кобель - Рубен
- **pl-PL_AP_Female_Agnieszka** - pl-PL - Женский - Агнешка
- **pl-PL_AP_Male_Jacek** - pl-PL - Male - Jacek
- **pl-PL_AP_Female_Ewa** - pl-PL - женский - Ewa
- **pl-PL_AP_Male_Jan** - pl-PL - Male - Jan
- **pl-PL_AP_Female** - pl-PL - Женский - Майя
- **pt-BR_AP_Female** - pt-BR - Женский - Витория
- **pt-BR_AP_Male** - pt-BR - Кобель - Рикардо
- **pt-PT_AP_Male** - pt-PT - Мужской - Криштиану
- **pt-PT_AP_Female** - pt-PT - Женский - Инес
- **ro-RO_AP_Female** - ro-RO - Женский - Кармен
- **sv-SE_AP_Female** - sv-SE - Женский - Астрид
- **tr-TR_AP_Female** - tr-TR - Женский - Филиз
- **ko-KR_AP_Female** - ko-KR - Женский - Соён

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 3.0.0 (2023-04-03)
* (bluefox) Restored cloud engines. Warning: update cloud adapter to at least 4.4.0
* (bluefox) Breaking changes: Minimal node.js version is 14

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
* (Apollon77) Change File write to use Sync methods to make sure they can not run in parallel

### 1.10.2 (2020-07-19)
* (Apollon77) Crash case prevented (Sentry IOBROKER-SAYIT-8)

### 1.10.1 (2020-07-16)
* (Apollon77) Handle edge cases and prevent crashes (Sentry IOBROKER-SAYIT-4, IOBROKER-SAYIT-6)
* (Apollon77) try to get caching working again for Yandex

### 1.10.0 (2020-07-07)
* (algar42) GUI updated to fill drop-downs correctly. Premium voices added to Yandex.Cloud engine

### 1.9.8 (2020-06-11)
* (Apollon77) fix error handling on file copy

### 1.9.7 (2020-06-11)
* (algar42) tts.ogg state added for ogg file type

### 1.9.6 (2020-05-24)
* (bluefox) Show names of SONOS devices

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
* (angelnu) Wait for Google Home announcement to complete

### 1.6.5 (2017-11-04)
* (bluefox) Fix cloud .pro

### 1.6.4 (2017-10-18)
* (bluefox) Fix system commands

### 1.6.3 (2017-10-04)
* (bluefox) Code refactoring
* (bluefox) Add google home as output
* (bluefox) Remove ivona because not more supported

### 1.5.2 (2017-03-09)
* (bluefox) Catch error if some directory in mp3 folder

### 1.5.1 (2017-02-15)
* (bluefox) Fix blockly language

### 1.5.0 (2017-01-27)
* (DarkChaos) Add AWS Polly as source
* (bluefox) Add cloud as source

### 1.4.0 (2017-01-16)
* (bluefox) fix install problem
* (bluefox) add PicoTTS as source

### 1.3.3 (2017-01-13)
* (bluefox) show only installed instances in blockly

### 1.3.2 (2017-01-10)
* (angelnu) changes for new chromecast tts

### 1.3.1 (2016-12-27)
* (bluefox) small fix of config dialog
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
* (bluefox) support of blockly

### 1.0.0 (2016-05-14)
* (bluefox) Make the type of mp3 as file

### 0.3.16 (2015-12-26)
* (Vegetto) Support for Chromecast devices

### 0.3.16 (2015-12-26)
* (bluefox) enable play of mp3 files from disk

### 0.3.15 (2015-11-10)
* (bluefox) fill default settings by first start

### 0.3.14 (2015-11-01)
* (bluefox) fix error with sayItWindows

### 0.3.13 (2015-10-27)
* (bluefox) fix error with sayItSystem

### 0.3.12 (2015-10-06)
* (bluefox) fix error if received mp3 file is too short
* (bluefox) try to implement cache datapoint (you can use sayit.0.tts.cachetext to create cache for phrases and use sayit without internet)

### 0.3.11 (2015-08-03)
* (bluefox) change google requests from http to https

### 0.3.10 (2015-07-26)
* (bluefox) add new voice Russian-Maxim
* (bluefox) fix error with mp24ftp

### 0.3.9 (2015-07-09)
* (bluefox) fix error by mediaplayer24

### 0.3.8 (2015-06-09)
* (bluefox) make the volume for announce configurable
* (bluefox) make the command for "system" configurable

### 0.3.7 (2015-05-28)
* (bluefox) fix volume for announce
* (bluefox) support of play files from internal filesystem, like "/sayit.0/tts.userfiles/myGong.mp3"

### 0.3.6 (2015-03-24)
* (bluefox) fix error with volume by sonos

### 0.3.5 (2015-03-22)
* (bluefox) fix error in announcement

### 0.3.4 (2015-03-20)
* (bluefox) fix error in announcement

### 0.3.3 (2015-03-20)
* (bluefox) enable announcement

### 0.3.2 (2015-03-16)
* (bluefox) clear cache if engine changed

### 0.3.1 (2015-03-15)
* (bluefox) fix small error with log

### 0.3.0 (2015-03-08)
* (bluefox) add ivona/Amazon voices

### 0.2.2 (2015-03-08)
* (bluefox) fix error by buffering of non-generated texts.

### 0.2.1 (2015-03-07)
* (bluefox) fix error by buffering of non-generated texts.

### 0.2.0 (2015-03-02)
* (bluefox) add yandex-russian support

### 0.1.0 (2015-03-02)
* (bluefox) queue texts

### 0.0.1 (2015-02-06)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2014-2023, bluefox <dogafox@gmail.com>

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