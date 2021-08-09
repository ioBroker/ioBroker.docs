---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sayit/README.md
title: ioBroker sayit-Adapter
hash: dVFKADhbgDqafi/M87JumTUg0kZhVqrVo0ih/VSNkLY=
---
![Logo](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Anzahl der Installationen](http://iobroker.live/badges/sayit-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# IoBroker sayit-Adapter
![Testen und freigeben](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

SayIt Adapter kann Text in Sprache umwandeln und auf einigen Geräten wiedergeben.

## Aufbau
Tatsächlich werden folgende Ausgaben unterstützt:

- *Browser* - der Text wird vom Browser mit geöffneter iobroker.vis-Seite abgespielt. Es wird von fast jedem Desktop-Browser und von wenigen mobilen Browsern unterstützt.

- *[Home24- MediaPlayer](http://www.home-24.net/index.php?app=media)* - Der Text wird gesendet und auf das Android-Gerät mit installiertem Home24 - MediaPlayer abgespielt. Dafür wird die in Android eingebaute Text-to-Speech-Engine verwendet. Der Port kann nicht geändert und auf 50000 gesetzt werden.

- *Home24 - MediaPlayer und [FTP Server](https://play.google.com/store/apps/details?id=lutey.FTPServer)* - der Text wird gesendet und auf dem Android-Gerät mit Home24 - MediaPlayer abgespielt Eingerichtet. Dazu wird die Text-to-Speech-Engine von Google verwendet. Die erzeugte mp3-Datei wird über FTP auf das Android-Gerät kopiert und mit Home24 - MediaPlayer abgespielt.

    Beide Apps müssen die gleichen Home-Verzeichnisse haben. (z.B. Stammverzeichnis von \"SD-Karte\").

- *System* - der Text wird vom Betriebssystem abgespielt, auf dem der ioBroker-Adapter läuft. Folgende Betriebssysteme werden unterstützt: Windows, Linux, Mac OSx.

- *Windows-Engine* - der Text wird von Windows abgespielt, wo der sayIt-Adapter läuft. Dazu wird Windows Text to Speech Engine verwendet, die vom Benutzer vorkonfiguriert werden sollte. Sie können [hier](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7) überprüfen, wie Sie es einrichten.

- *Sonos* - Text auf dem Sonos-Gerät abspielen. Stellen Sie sicher, dass der Web Adapter aktiviert ist. Es ist erforderlich, damit SONOS die generierten mp3-Dateien lesen kann.

- *Heos* - Text auf dem Heos-Gerät abspielen. Stellen Sie sicher, dass der Web Adapter aktiviert ist. Es ist erforderlich, damit HEOS die generierten mp3-Dateien lesen kann.

- *Chromecast* - Text auf Chromecast-Gerät abspielen.

- *MPD* - Text auf dem Music Player Daemon abspielen. Verwenden Sie nur **http** für den Webadapter, verwenden Sie kein https.

Um Text-to-Speech auf RaspberryPI oder Linux zu aktivieren, rufen Sie einmal den Befehl ```sudo apt-get -y install mpg321``` auf, um mpg321 zu installieren.

Die mp3/wav-Dateien können abgespielt werden, indem ihr Name in das Objekt geschrieben wird. (z.B. "/vis.0/main/img/door-bell.mp3")

Die Datei muss zuerst geladen werden.

###TTS-Motoren
online:

- Google: Englisch, Deutsch, Russisch, Italienisch, Spanisch, Französisch
- Yandex: Russisch

Um Yandex-Stimmen zu verwenden, müssen Sie den API-Schlüssel hier anfordern: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/). [Dieser Dienst wird am 1. Januar 2019 deaktiviert und durch Yandex.cloud ersetzt] Um Yandex.cloud zu nutzen, sollten Sie sich hier registrieren: [https://cloud.yandex.ru/], SpeechKIT API in der Cloud installieren und Auth Token erhalten und Ordner-ID wie in den API-Anweisungen beschrieben.

- Ivona: Englisch, Deutsch, Russisch, Italienisch, Spanisch, Französisch, Dänisch, Walisisch, Isländisch, Niederländisch, Polnisch, Portugiesisch, Rumänisch, Schwedisch, Türkisch

        Um Amazon(Ivona)-Stimmen verwenden zu können, benötigen Sie den Zugangsschlüssel und den geheimen Schlüssel [Hier](http://www.ivona.com/us/for-business/speech-cloud/).

- Wolke:

        Um Cloud-Stimmen zu verwenden, benötigen Sie einen konfigurierten Cloud-Adapter. (Sie kann deaktiviert werden, muss jedoch konfiguriert werden). Dieser Service verwendet AWS Polly und kann direkt verwendet werden.

- Amazon Web Services Polly:

        Um AWS Polly-Stimmen zu verwenden, müssen Sie den Zugriffsschlüssel und den geheimen Schlüssel [hier](https://console.aws.amazon.com/iam/home). Die Amazon-Dokumentation finden Sie [hier](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) erstellen.

offline:

- PicoTTS (nur Linux): Englisch, Deutsch, Italienisch, Spanisch, Französisch

Für PicoTTS müssen die folgenden Pakete installiert werden: libttspico-utils und lame.
Installationsbefehl: 'sudo apt-get install libttspico-utils lame'

### Textformatierung für Cloud und Amazon Web Services Polly
Sie können Ihren Text mit [Sprachsynthese-Markup-Sprache](http://docs.aws.amazon.com/polly/latest/dg/ssml.html) formatieren.

Die nützlichsten Funktionen:

- ```<break time="3s"/>```- Machen Sie eine Pause für x Sekunden (max. 10 Sekunden).
- ```<emphasis> groß </emphasis>``` - Betonung eines Wortes.
- ```<prosody volume="+6dB" rate="90%">Ich spreche das</prosody>``` - Steuert Geschwindigkeits- und Lautstärkeparameter.
- ```<say-as interpret-as="digits">12345</say-as>``` - Sagen Sie jede Ziffer einzeln.

Mehr [die Info](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### Systembefehl
Wenn Sie ein Programm haben, das Audiodateien lokal oder woanders abspielen kann, können Sie diesen Befehl hier schreiben. Z.B.

```myCustomPlayer --option```

Wenn **System**-Ausgabe ausgewählt ist, führt der sayit-Adapter den folgenden Befehl auf dem lokalen System aus:

```myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3```

Wenn der Dateiname irgendwo in der Mitte bleiben muss, können Sie *%s* verwenden, um anzugeben, wo der Dateiname platziert werden muss:

```myCustomPlayer --option "%s" > /dev/null```

sayIt wird daraus ```myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null``` machen.

## Verwendung
Der SayIt-Adapter kann nicht allein verwendet werden. Es muss vom Javascript-Adapter oder von "vis" mit einem bestimmten Widget gesteuert werden.
Nach der Erstellung der Adapterinstanz können folgende Objekte gefunden werden:

- sayit.N.tts.text: Zu sprechender Satz.
- sayit.N.tts.volume: Lautstärke, die beim Spielen der Phrase verwendet wird.
- sayit.N.tts.playing: true, wenn Text gerade abgespielt wird und false, wenn nicht. Wird nur für den Wiedergabemodus "Windows" und "System" unterstützt.
- sayit.N.tts.cachetext: Phrase, die zwischengespeichert werden soll und dann ohne Internet verwendet werden kann.

   Z.B. Sie können hier manuell "Kein Internet" eingeben und wenn der Ping an google.com negativ ist, schreiben Sie "Kein Internet" in "tts.text" und es wird ausgesprochen. Cache muss natürlich aktiviert sein.

State **tts.text** unterstützt erweiterte Syntax, sodass Sprache/Engine und Volume zusammen mit Text definiert werden können. Es wird verwendet, um mehrsprachige text2speech-Engines zu aktivieren.
Z.B. Wenn der Adapter die Engine "Google-english" hat, ist es möglich mit der Phrase ```de:Sag es``` die Verwendung der Google-Deustch Sprachengine zu erzwingen.

Mit ```ru;75;Погода хорошая``` können wir die russische Sprache und Lautstärke 75% erzwingen.

Sie können die Ansagelautstärke in Prozent von aktueller oder vorgegebener Lautstärke (nicht von maximal) festlegen. Z.B. wenn Befehl ```de;75;Gutes Wetter```und "Ansage Lautstärke" 50% ist, wird die Ansage mit Lautstärke 38% von 100% möglich abgespielt.

Der Systembefehl zum Abspielen der mp3-Datei kann ebenfalls angegeben werden. Wenn Sie es leer lassen, werden die Standardeinstellungen verwendet: windows - cmdmp3.exe, OSX - /usr/bin/afplay, linux - mpg321 oder omxplayer (empfohlen).

Um omxplayer zu installieren schreibe ```sudo apt-get install omxplayer``` oder schreibe ```sudo apt-get install mpg321``` um mpg321 zu installieren.

**Hinweis:** Die standardmäßige Ansage-Auswahl ist erst nach dem Start der Instanz möglich.

###Prioritäten
Um den Text trotz der anstehenden Texte sofort auszusprechen, haben Sie 2 Möglichkeiten:

- Platz "!" als erstes Zeichen im Text, so dass dieser Text unmittelbar nach dem aktuellen ausgesprochen wird.
- schreibe true in den Zustand "tts.clearQueue" und die Warteschlange wird gelöscht. Danach können Sie einen neuen Text in "tts.text" schreiben, aber alle Texte in der Warteschlange werden verworfen.

### Motoren
Folgende Werte für Motoren sind möglich:

#### Google
- **de** - Englisch
- **de** - English
- **pl** - Polski
- **ru** - усский
- **uk** - український
- **es** - Italiano
- **es** - Spanisch
- **fr** - Français
- **nl** - Niederlande
- **zh-CN** -
- **pt** - Portugiesisch

#### Yandex
- **ru_YA:Yandex** - усский
- **ru_YA_CLOUD:Yandex Cloud** - Русский [Yandex.Cloud API generiert Dateien im OGG-Format. Um ogg-Dateien unter Linux abzuspielen, sollte der Mplayer installiert und als Systemplayer ausgewählt sein]

#### Amazon Umfrage über die Cloud
- **ru-RU_CLOUD_Female** - усский - Татьяна
- **ru-RU_CLOUD_Male** - усский - Максим
- **de-DE_CLOUD_Female** - Deutsch - Marlene
- **de-DE_CLOUD_Male** - Deutsch - Hans
- **de-DE_CLOUD_Female_Vicki** - Deutsch - Vicki
- **en-US_CLOUD_Female** - de-DE - Weiblich - Salli
- **en-US_CLOUD_Male** - de-DE - Männlich - Joey
- **da-DK_CLOUD_Female** - da-DK - Weiblich - Naja
- **da-DK_CLOUD_Male** - da-DK - Männlich - Mads
- **de-DE_CLOUD_Female** - de-DE - Weiblich - Nicole
- **en-AU_CLOUD_Male** - de-AU - Männlich - Russell
- **de-DE_CLOUD_Female_Amy** - de-DE - Weiblich - Amy
- **de-DE_CLOUD_Male** - de-DE - Männlich - Brian
- **de-DE_CLOUD_Female_Emma** - de-DE - Weiblich - Emma
- **de-DE-WLS_CLOUD_Female** - de-DE-WLS - Weiblich - Gwyneth
- **de-GB-WLS_CLOUD_Male** - de-GB-WLS - Männlich - Geraint
- **cy-GB_CLOUD_Female** - cy-GB - Weiblich - Gwyneth
- **cy-GB_CLOUD_Male** - cy-GB - Männlich - Geraint
- **de-IN_CLOUD_Female** - de-IN - Weiblich - Raveena
- **de-DE_CLOUD_Male_Chipmunk** - de-DE - Männlich - Chipmunk
- **de-DE_CLOUD_Male_Eric** - de-DE - Männlich - Eric
- **de-US_CLOUD_Female_Ivy** - de-DE - Weiblich - Ivy
- **en-US_CLOUD_Female_Jennifer** - de-US - Weiblich - Jennifer
- **de-DE_CLOUD_Male_Justin** - de-DE - Männlich - Justin
- **de-DE_CLOUD_Female_Kendra** - de-DE - Weiblich - Kendra
- **de-DE_CLOUD_Female_Kimberly** - de-DE - Weiblich - Kimberly
- **es-ES_CLOUD_Female** - es-ES - Weiblich - Conchita
- **es-ES_CLOUD_Male** - es-ES - Männlich - Enrique
- **es-US_CLOUD_Female** - es-US - Weiblich - Penelope
- **es-US_CLOUD_Male** - es-US - Männlich - Miguel
- **fr-CA_CLOUD_Female** - fr-CA - Weiblich - Chantal
- **fr-FR_CLOUD_Female** - fr-FR - Weiblich - Celine
- **fr-FR_CLOUD_Male** - fr-FR - Männlich - Mathieu
- **ist-IS_CLOUD_Female** - is-IS - Weiblich - Dora
- **ist-IS_CLOUD_Male** - is-IS - Männlich - Karl
- **it-IT_CLOUD_Female** - it-IT - Weiblich - Carla
- **it-IT_CLOUD_Male** - it-IT - Männlich - Giorgio
- **nb-NO_CLOUD_Female** - nb-NO - Weiblich - Liv
- **nl-NL_CLOUD_Female** - nl-NL - Weiblich - Lotte
- **nl-NL_CLOUD_Male** - nl-NL - Männlich - Ruben
- **pl-PL_CLOUD_Female_Agnieszka** - pl-PL - Weiblich - Agnieszka
- **pl-PL_CLOUD_Male_Jacek** - pl-PL - Männlich - Jacek
- **pl-PL_CLOUD_Female_Ewa** - pl-PL - Weiblich - Ewa
- **pl-PL_CLOUD_Male_Jan** - pl-PL - Männlich - Jan
- **pl-PL_CLOUD_Female** - pl-PL - Weiblich - Maja
- **pt-BR_CLOUD_Female** - pt-BR - Weiblich - Vitoria
- **pt-BR_CLOUD_Female_Camila** - pt-BR - Weiblich - Camila
- **pt-BR_CLOUD_Male** - pt-BR - Männlich - Ricardo
- **pt-PT_CLOUD_Male** - pt-PT - Männlich - Cristiano
- **pt-PT_CLOUD_Female** - pt-PT - Weiblich - Ines
- **ro-RO_CLOUD_Female** - ro-RO - Weiblich - Carmen
- **sv-SE_CLOUD_Female** - sv-SE - Weiblich - Astrid
- **tr-TR_CLOUD_Female** - tr-TR - Weiblich - Filiz
- **pt-BR_CLOUD_Female_Camila** - pt-BR - Weiblich - Camila

#### Pico-TTS
- **en-US** - Englisch US
- **de-GB** - Englisch GB
- **de-DE** - English
- **it-IT** - Italiano
- **es-ES** - Spanisch
- **fr-FR** - Français

#### Amazon Umfrage direkt
- **ru-RU_AP_Female** - усский - Татьяна
- **ru-RU_AP_Male** - усский - Максим
- **de-DE_AP_Female** - Deutsch - Marlene
- **de-DE_AP_Female_Vicki** - Deutsch - Vicki
- **de-DE_AP_Male** - Deutsch - Hans
- **en-US_AP_Female** - de-US - Weiblich - Salli
- **en-US_AP_Male** - de-US - Männlich - Joey
- **da-DK_AP_Female** - da-DK - Weiblich - Naja
- **da-DK_AP_Male** - da-DK - Männlich - Mads
- **de-AU_AP_Female** - de-AU - Weiblich - Nicole
- **en-AU_AP_Male** - de-AU - Männlich - Russell
- **de-DE_AP_Female_Amy** - de-DE - Weiblich - Amy
- **de-DE_AP_Male** - de-DE - Männlich - Brian
- **de-DE_AP_Female_Emma** - de-DE - Weiblich - Emma
- **de-GB-WLS_AP_Female** - de-GB-WLS - Weiblich - Gwyneth
- **de-GB-WLS_AP_Male** - de-GB-WLS - Männlich - Geraint
- **cy-GB_AP_Female** - cy-GB - Weiblich - Gwyneth
- **cy-GB_AP_Male** - cy-GB - Männlich - Geraint
- **en-IN_AP_Female** - de-IN - Weiblich - Raveena
- **en-US_AP_Male_Chipmunk** - de-US - Männlich - Chipmunk
- **en-US_AP_Male_Eric** - de-DE - Männlich - Eric
- **en-US_AP_Female_Ivy** - de-US - Weiblich - Ivy
- **en-US_AP_Female_Jennifer** - de-US - Weiblich - Jennifer
- **de-US_AP_Male_Justin** - de-DE - Männlich - Justin
- **en-US_AP_Female_Kendra** - de-US - Weiblich - Kendra
- **en-US_AP_Female_Kimberly** - de-DE - Weiblich - Kimberly
- **es-ES_AP_Female** - es-ES - Weiblich - Conchita
- **es-ES_AP_Male** - es-ES - Männlich - Enrique
- **es-US_AP_Female** - es-US - Weiblich - Penelope
- **es-US_AP_Male** - es-US - Männlich - Miguel
- **fr-CA_AP_Female** - fr-CA - Weiblich - Chantal
- **fr-FR_AP_Female** - fr-FR - Weiblich - Celine
- **fr-FR_AP_Male** - fr-FR - Männlich - Mathieu
- **ist-IS_AP_Female** - is-IS - Weiblich - Dora
- **ist-IS_AP_Male** - is-IS - Männlich - Karl
- **it-IT_AP_Female** - it-IT - Weiblich - Carla
- **it-IT_AP_Male** - it-IT - Männlich - Giorgio
- **nb-NO_AP_Female** - nb-NO - Weiblich - Liv
- **nl-NL_AP_Female** - nl-NL - Weiblich - Lotte
- **nl-NL_AP_Male** - nl-NL - Männlich - Ruben
- **pl-PL_AP_Female_Agnieszka** - pl-PL - Weiblich - Agnieszka
- **pl-PL_AP_Male_Jacek** - pl-PL - Männlich - Jacek
- **pl-PL_AP_Female_Ewa** - pl-PL - Weiblich - Ewa
- **pl-PL_AP_Male_Jan** - pl-PL - Männlich - Jan
- **pl-PL_AP_Female** - pl-PL - Weiblich - Maja
- **pt-BR_AP_Female** - pt-BR - Weiblich - Vitoria
- **pt-BR_AP_Male** - pt-BR - Männlich - Ricardo
- **pt-PT_AP_Male** - pt-PT - Männlich - Cristiano
- **pt-PT_AP_Female** - pt-PT - Weiblich - Ines
- **ro-RO_AP_Female** - ro-RO - Weiblich - Carmen
- **sv-SE_AP_Female** - sv-SE - Weiblich - Astrid
- **tr-TR_AP_Female** - tr-TR - Weiblich - Filiz
- **ko-KR_AP_Female** - ko-KR - Weiblich - Seoyeon

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->

## Changelog
### 1.12.3 (2021-06-25)
* (bluefox) corrected the google engine
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

Copyright (c) 2014-2021, bluefox <dogafox@gmail.com>

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