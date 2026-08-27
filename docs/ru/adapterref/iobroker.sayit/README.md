---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sayit/README.md
title: ioBroker sayit адаптер
hash: +ihpuczRngjRxTmffEJbUT5jR1VuwSqI598CSYm6N90=
---
![Логотип](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Количество установок](http://iobroker.live/badges/sayit-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# IoBroker sayit adapter
![Тестирование и выпуск](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

Адаптер SayIt может преобразовывать текст в речь и воспроизводить его на некоторых устройствах.

## Конфигурация
Фактически поддерживаются следующие выходные данные:

- *Браузер* - браузер будет воспроизводить текст на открытой странице `iobroker.vis`. Эта функция поддерживается практически всеми настольными браузерами и некоторыми мобильными браузерами.

- *[Home24- MediaPlayer](http://www.home-24.net/index.php?app=media)* - текст будет отправлен и воспроизведен на устройстве Android с установленным Home24- MediaPlayer. Для этого будет использоваться встроенный в Android механизм преобразования текста в речь. Порт изменить нельзя, установите значение 50000.

- *Home24 - MediaPlayer и [FTP-сервер](https://play.google.com/store/apps/details?id=lutey.FTPServer)* - текст будет отправлен и воспроизведен на устройстве Android с установленным Home24 - MediaPlayer. Для этого будет использоваться движок преобразования текста в речь от Google. Сгенерированный файл mp3 будет скопирован по FTP на устройство Android и воспроизведен с помощью Home24 - MediaPlayer.

Оба приложения должны иметь одинаковые домашние каталоги (например, корневой каталог "SD-карты").

- *Система* - текст будет воспроизводиться операционной системой, на которой работает адаптер ioBroker. Поддерживаются следующие ОС: Windows, Linux, Mac OSx.

- *Движок Windows* - текст будет воспроизводиться в Windows, где работает адаптер sayIt. Для этого будет использоваться механизм преобразования текста в речь Windows, который должен быть предварительно настроен пользователем. Инструкции по настройке можно посмотреть [здесь](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7).

- *Sonos* - воспроизведите текст на устройстве Sonos. Убедитесь, что веб-адаптер включен. Он необходим для того, чтобы SONOS мог читать сгенерированные файлы mp3.

- *Heos* - воспроизведите текст на устройстве HEOS. Убедитесь, что веб-адаптер включен. Он необходим для того, чтобы HEOS мог читать сгенерированные файлы mp3.

- *Chromecast* - воспроизведение текста на устройстве Chromecast.

- *MPD* - воспроизводить текст в демоне музыкального проигрывателя. Используйте только **http** для веб-адаптера, не используйте https.

Чтобы включить функцию преобразования текста в речь на Raspberry Pi или в системе Linux, однократно выполните следующую команду: `sudo apt-get -y install mpg321` для установки mpg321.

Воспроизведение файлов mp3/wav осуществляется путем ввода их имени в объект (например, `/vis.0/main/img/door-bell.mp3`).

Файл необходимо сначала загрузить.

### Двигатели TTS
Онлайн:

- Google: английский, немецкий, русский, итальянский, испанский, французский;
- Яндекс: Русский

Для использования голосов Яндекса необходимо запросить ключ API здесь: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/). [Этот сервис будет отключен 1 января 2019 года и заменен на Yandex.cloud]. Для использования Yandex.cloud необходимо зарегистрироваться здесь: [https://cloud.yandex.ru/], установить API SpeechKIT в облаке и получить токен авторизации и идентификатор папки, как описано в инструкции к API.

- FreeTTS: более 400 голосов на более чем 75 языках, предоставленных [https://freetts.org](https://freetts.org).

Язык выбирается не движком, а голосом, например, `de-DE-KatjaNeural`.
Требуется ключ API из [страница с ценами](https://freetts.org/pricing). Бесплатный уровень сервиса добавляет к каждому тексту озвученную фразу «сгенерировано с помощью freeTTS.org», поэтому его нельзя использовать для объявлений.

- Облако: Для использования голосовых сервисов Cloud необходимо настроить и запустить адаптер `cloud` или ввести ключ приложения непосредственно в настройках.
- Amazon Web Services Polly:

Для использования голосовых сервисов AWS Polly необходимо создать ключ доступа и секретный ключ [[Здесь](https://console.aws.amazon.com/iam/home). Документацию Amazon можно найти [здесь].](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).

Офлайн:

- PicoTTS (только для Linux): английский, немецкий, итальянский, испанский, французский;

Для PicoTTS необходимо установить следующие пакеты: `libttspico-utils` и lame.
Команда установки: `sudo apt-get install libttspico-utils lame`

- Coqui TTS: английский, немецкий, испанский, французский, голландский, японский, китайский;

Инструкции по использованию см. в разделе [официальная документация](https://tts.readthedocs.io/en/latest/index.html)

### Тестирование генерации текста
С помощью кнопки `Test text generation` на вкладке `Engine` можно проверить, правильно ли настроен выбранный двигатель.

Поле `Test text` предварительно заполняется тестовым предложением на языке выбранного движка и может быть изменено по желанию. Если поле пустое, будет использовано то же предложение. Текст будет сгенерирован с учетом настроек диалогового окна, поэтому их не следует сохранять перед тестированием.

Текст будет только сгенерирован, но не воспроизведен, поэтому тест будет работать, даже если проигрыватель недоступен.
В диалоговом окне отображается размер и продолжительность сгенерированного файла, и предпринимается попытка открыть его в новой вкладке браузера, чтобы вы могли его прослушать. Для этого браузер должен разрешать всплывающие окна для административной панели ioBroker.

Чтобы протестировать одновременное создание и воспроизведение, используйте кнопку `Test` на вкладке `Player`.

### Форматирование текста Polly для облачных сервисов и Amazon Web Services
Вы можете отформатировать текст с помощью [Язык разметки синтеза речи](http://docs.aws.amazon.com/polly/latest/dg/ssml.html).

Наиболее полезные функции:

- `<break time="3s"/>` - сделать паузу на x секунд (максимум 10 секунд).
- `<emphasis> big </emphasis>` - сделать акцент на каком-либо слове.
- `<prosody volume="+6dB" rate="90%">Я говорю это</prosody>` - параметры управления скоростью и громкостью.
- `<say-as interpret-as="digits">12345</say-as>` - произносите каждую цифру отдельно.

Ещё [информация](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### Системная команда
Если у вас есть программа, которая может воспроизводить аудиофайлы локально или где-либо ещё, вы можете написать здесь эту команду. Например:

`myCustomPlayer --option`

Если выбран вывод **Системный**, адаптер `sayit` выполнит следующую команду в локальной системе:

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

Если имя файла должно находиться где-то посередине, можно использовать *%s* для указания места, где должно быть размещено имя файла:

`myCustomPlayer --option "%s" > /dev/null`

sayIt создаст из этого `myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null`.

## Использование
Адаптер SayIt нельзя использовать отдельно. Он должен управляться из JavaScript-адаптера или из компонента "vis" с помощью специального виджета.
После создания экземпляра адаптера вы можете найти следующие объекты:

- `sayit.N.tts.text`: Произносимая фраза.
- `sayit.N.tts.volume`: громкость, которая будет использоваться при воспроизведении фразы.
- `sayit.N.tts.playing`: true, если текст воспроизводится, и false, если нет. Поддерживается только для режимов воспроизведения "Windows" и "System".
- `sayit.N.tts.cachetext`: Фраза для кэширования, после чего её можно использовать без подключения к интернету.

Например, вы можете вручную ввести сюда "Нет интернета", и если пинг до google.com будет отрицательным, напишите "Нет интернета" в "tts.text", и это будет произнесено. Конечно, кэширование должно быть включено.

Параметр State `tts.text` поддерживает расширенный синтаксис, поэтому язык/движок и громкость могут быть определены вместе с текстом. Он используется для включения многоязычных движков преобразования текста в речь.
Например, если адаптер имеет движок `Google-english`, то с помощью фразы `de:Sag es` можно принудительно использовать движок речи Google-Deutsch.

С помощью `ru;75;Погода хорошая` мы можем принудительно установить русский язык и громкость на 75%.

Вы можете указать громкость объявления в процентах от текущей или заданной громкости (не от максимальной). Например, если команда `de;75;Gutes Wetter` и "громкость объявления" равна 50%, объявление будет воспроизводиться с громкостью 38% от 100% от возможной.

Также можно указать системную команду для воспроизведения файла mp3. Если оставить это поле пустым, будут использоваться настройки по умолчанию: Windows - `cmdmp3.exe`, OSX - `/usr/bin/afplay`, Linux - `mpg321` или `omxplayer` (рекомендуется).

Для установки omxplayer напишите `sudo apt-get install omxplayer`, а для установки mpg321 — `sudo apt-get install mpg321`.

**Примечание:** Выбор опции "объявить" по умолчанию будет возможен только после запуска экземпляра.

С помощью `sendTo` можно передавать больше различных параметров, например, `sonosDevice` или `browserInstance`:

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

- Поместите "!" в качестве первого символа в текст, чтобы этот текст произносился сразу после текущего.
— Запишите значение true в состояние "tts.clearQueue", и очередь будет очищена. После этого вы можете записать новый текст в `tts.text`, но все тексты из очереди будут удалены.

### Двигатели
Для двигателей возможны следующие значения:

#### Google
- **en** - English
- **de** - Deutsch
- **пл** - польский
- **ру** - Русский
- **ук** - украинский
- **это** - Italiano
- **es** - Espaniol
- **fr** - Français
- **nl** - Nederlands
- **zh-CN** - 简体中文
- **pt** - Português

#### FreeTTS
- **freeTTS** - голос, скорость и высота тона берутся из конфигурации экземпляра.

Язык является частью голоса, поэтому существует только одно имя движка. Голос, например, `de-DE-KatjaNeural`, выбирается в диалоговом окне конфигурации, и список всех доступных голосов считывается из сервиса.
Запрос ограничен 10000 символами, поэтому более длинные тексты разбиваются и произносятся один за другим.

#### Яндекс
- **ru_Я:Яндекс** - Русский
- **ru_YA_CLOUD:Яндекс Облако** - Русский [API Yandex.Cloud генерирует файлы в формате OGG. Для воспроизведения файлов OGG в Linux необходимо установить mplayer и выбрать его в качестве системного проигрывателя]

#### Amazon Polly через облако
- **ru-RU_CLOUD_Female** - Русский - Татьяна
- **ru-RU_CLOUD_Male** - Русский - Максим
- **de-DE_CLOUD_Female** - Deutsch - Марлен
- **de-DE_CLOUD_Male** - Немецкий - Ганс
- **de-DE_CLOUD_Female_Vicki** - Deutsch - Вики
- **de-DE_CLOUD_Male_Daniel** - Deutsch - Даниэль
- **de-AT_CLOUD_Female_Hannah** - Австрия - Ханна
- **en-US_CLOUD_Female** - en-US - Female - Salli
- **en-US_CLOUD_Male** - en-US - Male - Joey
- **da-DK_CLOUD_Female** - da-DK - Женщина - Наджа
- **da-DK_CLOUD_Male** - da-DK - Мужчина - Мэдс
- **en-AU_CLOUD_Female** - ru-AU – Женщина – Николь
- **en-AU_CLOUD_Male** - ru-AU - Мужской - Рассел
- **en-GB_CLOUD_Female_Amy** - ru-GB - Женщина - Эми
- **en-GB_CLOUD_Male** - ru-GB - Мужчина - Брайан
- **en-GB_CLOUD_Female_Emma** - ru-GB - Женщина - Эмма
- **en-GB-WLS_CLOUD_Female** - en-GB-WLS - Female - Gwyneth
- **en-GB-WLS_CLOUD_Male** - en-GB-WLS - Мужской - Geraint
- **cy-GB_CLOUD_Female** - cy-GB - Female - Gwyneth
- **cy-GB_CLOUD_Male** - cy-GB - Male - Geraint
- **en-IN_CLOUD_Female** - en-IN - Female - Raveena
- **en-US_CLOUD_Male_Chipmunk** - en-US - Male - Chipmunk
- **en-US_CLOUD_Male_Eric** - en-US - Male - Eric
- **en-US_CLOUD_Female_Ivy** - en-US - Female - Ivy
- **en-US_CLOUD_Female_Jennifer** - en-US - Female - Jennifer
- **en-US_CLOUD_Male_Justin** - ru-US - Мужчина - Джастин
- **en-US_CLOUD_Female_Kendra** - en-US - Female - Kendra
- **en-US_CLOUD_Female_Kimberly** - en-US - Female - Kimberly
- **es-ES_CLOUD_Female** - es-ES - Женщина - Кончита
- **es-ES_CLOUD_Male** - es-ES - Мужчина - Энрике
- **es-US_CLOUD_Female** - es-US - Female - Penelope
- **es-US_CLOUD_Male** - es-US - Male - Miguel
- **fr-CA_CLOUD_Female** - fr-CA - Female - Chantal
- **fr-FR_CLOUD_Female** - fr-FR - Female - Celine
- **fr-FR_CLOUD_Male** - fr-FR - Male - Mathieu
- **is-IS_CLOUD_Female** - is-IS - Female - Dora
- **is-IS_CLOUD_Male** - is-IS - Male - Karl
- **it-IT_CLOUD_Female** - it-IT - Female - Carla
- **it-IT_CLOUD_Male** - it-IT - Male - Giorgio
- **nb-NO_CLOUD_Female** - no-NO - Female - Liv
- **no-NO_CLOUD_Female** - no-NO - Female - Ida
- **nl-NL_CLOUD_Female** - nl-NL - Female - Lotte
- **nl-NL_CLOUD_Male** - nl-NL - Male - Ruben
- **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - Female - Agnieszka
- **pl-PL_CLOUD_Male_Jacek** - pl-PL - Мужчина - Яцек
- **pl-PL_CLOUD_Female_Ewa** - pl-PL - Female - Ewa
- **pl-PL_CLOUD_Male_Jan** - pl-PL - Male - Jan
- **pl-PL_CLOUD_Female** - pl-PL - Female - Maja
- **pt-BR_CLOUD_Female** - pt-BR - Female - Vitoria
- **pt-BR_CLOUD_Female_Camila** - pt-BR - Female - Camila
- **pt-BR_CLOUD_Male** - pt-BR - Male - Ricardo
- **pt-PT_CLOUD_Male** - pt-PT - Male - Cristiano
- **pt-PT_CLOUD_Female** - pt-PT - Female - Ines
- **ro-RO_CLOUD_Female** - ro-RO - Female - Carmen
- **sv-SE_CLOUD_Female** - sv-SE - Female - Astrid
- **tr-TR_CLOUD_Female** - tr-TR - Female - Filiz
- **pt-BR_CLOUD_Female_Camila** - pt-BR - Female - Camila

#### Пико TTS
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
- **ru-RU_AP_Female** - Русский - Татьяна
- **ru-RU_AP_Male** - Русский - Максим
- **de-DE_AP_Female** - Deutsch - Марлен
- **de-DE_AP_Female_Vicki** - Deutsch - Вики
- **de-DE_AP_Male** - Немецкий - Ганс
- **en-US_AP_Female** - en-US - Female - Salli
- **en-US_AP_Male** - ru-US - Мужчина - Джоуи
- **da-DK_AP_Female** - da-DK - Женщина - Наджа
- **da-DK_AP_Male** - da-DK - Мужчина - Мэдс
- **en-AU_AP_Female** - ru-AU – Женский – Николь
- **en-AU_AP_Male** - ru-AU - Мужской - Рассел
- **en-GB_AP_Female_Amy** - ru-GB - Женщина - Эми
- **en-GB_AP_Male** - ru-GB - Мужчина - Брайан
- **en-GB_AP_Female_Emma** - ru-GB - Женщина - Эмма
- **en-GB-WLS_AP_Female** - en-GB-WLS - Женщина - Гвинет
- **en-GB-WLS_AP_Male** - en-GB-WLS - Мужской - Geraint
- **cy-GB_AP_Female** - cy-GB - Female - Gwyneth
- **cy-GB_AP_Male** - cy-GB - Male - Geraint
- **en-IN_AP_Female** - en-IN - Женщина - Равина
- **en-US_AP_Male_Chipmunk** - ru-US - Самец - Бурундук
- **en-US_AP_Male_Eric** - en-US - Male - Eric
- **en-US_AP_Female_Ivy** - en-US - Female - Ivy
- **en-US_AP_Female_Jennifer** - en-US - Female - Jennifer
- **en-US_AP_Male_Justin** - ru-US - Мужчина - Джастин
- **en-US_AP_Female_Kendra** - en-US - Female - Kendra
- **en-US_AP_Female_Kimberly** - en-US - Female - Kimberly
- **es-ES_AP_Female** - es-ES - Женщина - Кончита
- **es-ES_AP_Male** - es-ES - Мужской - Энрике
- **es-US_AP_Female** - es-US - Female - Penelope
- **es-US_AP_Male** - es-US - Мужской - Мигель
- **fr-CA_AP_Female** - fr-CA - Female - Chantal
- **fr-FR_AP_Female** - fr-FR - Female - Celine
- **fr-FR_AP_Male** - fr-FR - Male - Mathieu
- **is-IS_AP_Female** - is-IS - Female - Dora
- **is-IS_AP_Male** - is-IS - Male - Karl
- **it-IT_AP_Female** - it-IT - Female - Carla
- **it-IT_AP_Male** - it-IT - Male - Giorgio
- **nb-NO_AP_Female** - nb-NO - Female - Liv
- **nl-NL_AP_Female** - nl-NL - Female - Lotte
- **nl-NL_AP_Male** - nl-NL - Male - Ruben
- **pl-PL_AP_Female_Agnieszka** - pl-PL - Женщина - Агнешка
- **pl-PL_AP_Male_Jacek** - pl-PL - Мужской - Яцек
- **pl-PL_AP_Female_Ewa** - pl-PL - Female - Ewa
- **pl-PL_AP_Male_Jan** - pl-PL - Male - Jan
- **pl-PL_AP_Female** - pl-PL - Female - Maja
- **pt-BR_AP_Female** - pt-BR - Female - Vitoria
- **pt-BR_AP_Male** - pt-BR - Male - Ricardo
- **pt-PT_AP_Male** - pt-PT - Male - Cristiano
- **pt-PT_AP_Female** - pt-PT - Female - Ines
- **ro-RO_AP_Female** - ro-RO - Female - Carmen
- **sv-SE_AP_Female** - sv-SE - Женщина - Астрид
- **tr-TR_AP_Female** - tr-TR - Female - Filiz
- **ko-KR_AP_Female** - ko-KR - Женщина - Соён

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

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