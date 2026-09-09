---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sayit/README.md
title: ioBroker sayit адаптер
hash: BP8TzXMcwx9s4XbFXcpeZG7WZoH/KN2HPkIEXRkdYiw=
---
![Логотип](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Количество установок](http://iobroker.live/badges/sayit-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# ioBroker sayit адаптер

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Адаптер SayIt может преобразовывать текст в речь и воспроизводить его на некоторых устройствах.

## Конфигурация

Фактически поддерживаются следующие выходные данные:

- _Браузер_ — браузер воспроизведет текст внутри открытого окна.`iobroker.vis` Эта страница поддерживается практически всеми настольными браузерами и некоторыми мобильными браузерами.

- _[Home24-MediaPlayer](http://www.home-24.net/index.php?app=media)_ — текст будет отправлен и воспроизведен на устройстве Android с установленным Home24-MediaPlayer. Для этого будет использоваться встроенный в Android механизм преобразования текста в речь. Порт изменить нельзя, он должен быть установлен на 50000.

- _Home24 — медиаплеер и [FTP-сервер](https://play.google.com/store/apps/details?id=lutey.FTPServer)_ — текст будет отправлен и воспроизведен на устройстве Android с установленным Home24 — медиаплеером. Для этого будет использоваться движок преобразования текста в речь от Google. Сгенерированный файл mp3 будет скопирован по FTP на устройство Android и воспроизведен с помощью Home24 — медиаплеера. Оба приложения должны иметь одинаковые домашние каталоги (например, корневой каталог «sd card»).

- _Система_ — воспроизведение текста будет осуществляться операционной системой, на которой работает адаптер ioBroker. Поддерживаются следующие ОС: Windows, Linux, Mac OSx.

- _Движок Windows_ — текст будет воспроизводиться в Windows, где работает адаптер sayIt. Для этого будет использоваться движок преобразования текста в речь Windows, который должен быть предварительно настроен пользователем. Инструкции по настройке можно найти [здесь](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7) .

- _Sonos_ — воспроизведите текст на устройстве Sonos. Убедитесь, что веб-адаптер включен. Он необходим для того, чтобы SONOS мог читать сгенерированные файлы mp3.

- _Heos_ - воспроизведение текста на устройстве HEOS. Убедитесь, что веб-адаптер включен. Он необходим для того, чтобы HEOS мог читать сгенерированные файлы mp3.

- _Chromecast_ — воспроизведение текста на устройстве Chromecast.

- _MPD_ — воспроизведение текста в демоне музыкального проигрывателя. Используйте только **HTTP** для веб-адаптера, не используйте HTTPS.

Чтобы включить функцию преобразования текста в речь на Raspberry Pi или в системе Linux, однократно выполните следующую команду.`sudo apt-get -y install mpg321` установить mpg321.

Воспроизведение файлов mp3/wav осуществляется путем ввода их имени в объект. (например)`/vis.0/main/img/door-bell.mp3` )

Файл необходимо сначала загрузить.

### Двигатели TTS

Онлайн:

- Google: английский, немецкий, русский, итальянский, испанский, французский;
- Яндекс: Русский. Для использования голосов Яндекса необходимо запросить ключ API здесь: <https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/> . \[Этот сервис будет отключен 1 января 2019 года и заменен на Yandex.cloud]. Для использования Yandex.cloud необходимо зарегистрироваться здесь: \[ <https://cloud.yandex.ru/> ], установить API SpeechKIT в облаке и получить токен авторизации и идентификатор папки, как описано в инструкциях к API.
- FreeTTS: более 400 голосов на более чем 75 языках, предоставленных <https://freetts.org> . Язык выбирается не движком, а самим голосом, например.`de-DE-KatjaNeural` Для использования требуется ключ API со [страницы с ценами](https://freetts.org/pricing) . Бесплатный тарифный план добавляет к каждому тексту голосовое сообщение «сгенерировано с помощью freeTTS.org», поэтому его нельзя использовать для объявлений.
- Облачные сервисы: Для использования облачных голосовых сервисов необходимо настроить и запустить соответствующие приложения.`cloud` адаптер или введите ключ приложения непосредственно в настройках
- Amazon Web Services Polly: Для использования голосовых сервисов AWS Polly необходимо создать ключ доступа и секретный ключ [здесь](https://console.aws.amazon.com/iam/home) . Документацию Amazon можно найти [здесь](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) .

Офлайн:

- PicoTTS (только для Linux): английский, немецкий, итальянский, испанский, французский; для работы PicoTTS необходимо установить следующие пакеты:`libttspico-utils` и отстой. Команда установки:`sudo apt-get install libttspico-utils lame`

- Coqui TTS: английский, немецкий, испанский, французский, голландский, японский, китайский; инструкции по использованию см. в [официальной документации.](https://tts.readthedocs.io/en/latest/index.html)

### Тестирование генерации текста

С помощью кнопки`Test text generation` на вкладке`Engine` Вы можете проверить, правильно ли настроен выбранный двигатель.

Поле`Test text` Поле предварительно заполняется тестовым предложением на языке выбранного движка и может быть изменено по желанию. Если поле пустое, будет использовано то же предложение. Текст будет сгенерирован с учетом настроек диалогового окна, поэтому их не следует сохранять перед тестированием.

Текст будет только сгенерирован, но не воспроизведен, поэтому тест будет работать, даже если проигрыватель недоступен. Диалоговое окно отображает размер и продолжительность сгенерированного файла и пытается открыть его в новой вкладке браузера, чтобы вы могли его прослушать. Для этого браузер должен разрешать всплывающие окна для административной панели ioBroker.

Для одновременной проверки генерации **и** воспроизведения используйте кнопку.`Test` на вкладке`Player` .

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

Если выбран вариант **«Системный** вывод», то`sayit` Адаптер выполнит следующую команду в локальной системе:

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

Если имя файла должно находиться где-то посередине, можно использовать _%s_ для указания места, где должно быть размещено имя файла:

`myCustomPlayer --option "%s" > /dev/null`

скажите, это сделает`myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null` от него.

## Использование

Адаптер SayIt нельзя использовать отдельно. Он должен управляться из JavaScript-адаптера или из компонента "vis" с помощью специального виджета. После создания экземпляра адаптера вы найдете следующие объекты:

- `sayit.N.tts.text` Фраза для произнесения.
- `sayit.N.tts.volume` : громкость, которая будет использоваться при воспроизведении фразы.
- `sayit.N.tts.playing` : true, если текст воспроизводится, и false, если нет. Поддерживается только для режимов воспроизведения "Windows" и "System".
- `sayit.N.tts.cachetext` Фраза, которую необходимо кэшировать, после чего её можно будет использовать без подключения к интернету. Например, вы можете вручную ввести сюда "Нет интернета", и если пинг до google.com окажется отрицательным, напишите "Нет интернета" в "tts.text", и это будет произнесено. Конечно, кэширование должно быть включено.

Состояние`tts.text` Поддерживает расширенный синтаксис, поэтому язык/движок и громкость могут быть определены вместе с текстом. Используется для включения многоязычных движков преобразования текста в речь. Например, если адаптер имеет движок`Google-english` Это возможно с помощью фразы.`de:Sag es` принудительно использовать речевой движок Google-Deutsch.

С`ru;75;Погода хорошая` Мы можем принудительно включить русский язык и громкость на 75%.

Вы можете указать громкость объявления в процентах от текущей или заданной громкости (не от максимальной). Например, если команда такая:`de;75;Gutes Wetter` Если громкость объявления составляет 50%, объявление будет воспроизводиться с громкостью 38% от максимально возможной в 100%.

Также можно указать системную команду для воспроизведения файла mp3. Если оставить это поле пустым, будут использоваться настройки по умолчанию: windows -`cmdmp3.exe` , OSX -`/usr/bin/afplay` , linux -`mpg321` или`omxplayer` (рекомендуется).

Для установки omxplayer напишите`sudo apt-get install omxplayer` или написать`sudo apt-get install mpg321` установить mpg321.

**Примечание:** Выбор опции "объявить" по умолчанию будет возможен только после запуска экземпляра.

С`sendTo` Вы можете передавать больше различных параметров, например:`sonosDevice` или`browserInstance` :

```javascript
sendTo('sayit.0', 'say', {
    text: 'Hello',
    sonosDevice: 'Wohnzimmer', // optional, if not defined, the device from configuration will be used
    engine: 'Google-de', // optional, if not defined, the device from configuration will be used
    type: 'sonos', // optional, if not defined, the device from configuration will be used
    volume: 20, // optional, if not defined, the device from configuration will be used
});
```

### Приоритеты

Чтобы текст был произнесен немедленно, несмотря на наличие текста в очереди, у вас есть два варианта:

- Вставьте "!" в качестве первого символа в текст, чтобы этот текст произносился сразу после текущего.
- Запишите значение true в состояние "tts.clearQueue", и очередь будет очищена. После этого вы можете записать новый текст.`tts.text` Однако все тексты, находящиеся в очереди, удаляются.

### Двигатели

Для двигателей возможны следующие значения:

#### Google

- **эн** - английский
- **де** - немецкий
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

Язык является частью голосового сопровождения, поэтому существует только одно название движка. Голосовое сопровождение, например...`de-DE-KatjaNeural` В диалоговом окне настроек выбирается соответствующий параметр, и из сервиса считывается список всех доступных голосов. Запрос ограничен 10000 символами, поэтому более длинные тексты разбиваются на части и произносятся один за другим.

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
### 5.3.1 (2026-08-13)
* (@GermanBluefox) Added the button "Test text generation" to the "Engine" tab, so the selected engine can be tested with an own text
* (@GermanBluefox) Test generations do not overwrite the cached files anymore
* (@GermanBluefox) Adapter requires node.js >= 22 and js-controller >= 6.0.11 now
* (@GermanBluefox) Older changelog entries were moved to CHANGELOG_OLD.md
* (@GermanBluefox) Updated the dependabot and auto-merge configuration

### 5.3.0 (2026-08-13)
* (@GermanBluefox) Added freetts.org as a new TTS engine with more than 400 voices. An API key is required
* (@GermanBluefox) The engine is selected in two steps now: first the provider and then the voice
* (@GermanBluefox) The words of the Blockly block are translated into all 11 languages now
* (@GermanBluefox) Blockly block migrated to TypeScript and the generated code is unchanged

### 5.2.4 (2026-08-07)
* (@GermanBluefox) Corrected the upload of the announcement mp3 files and the location of the cache directory
* (@GermanBluefox) Corrected the splitting of long texts for the Google engine
* (@GermanBluefox) Corrected the detection of sonos devices in the configuration dialog
* (@GermanBluefox) Cached files will be deleted again if the engine was changed
* (@GermanBluefox) The queue does not block anymore if an error occurs by processing of a task
* (@GermanBluefox) Texts with semicolons will not be interpreted as "language;volume;text" anymore
* (@GermanBluefox) The local engines (PicoTTS, CoquiTTS) and the windows player are called without shell now
* (@GermanBluefox) Corrected the default settings of a new instance

### 5.1.0 (2025-09-17)
* (bluefox) Adapter was rewritten with TypeScript
* (bluefox) Updated Polly voices list
* (bluefox) Added an option to send sonos device as a parameter in sendTo command

### 5.0.0 (2024-07-16)
* (mcm1957) Adapter requires admin v7 or newer now
* (mcm1957) Adapter requires jas-controller 5 or newer now
* (bluefox) Added possibility to play directly from states: `sayit.0/tts.userfiles/gong.mp3`

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.sayit/blob/master/CHANGELOG_OLD.md)

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