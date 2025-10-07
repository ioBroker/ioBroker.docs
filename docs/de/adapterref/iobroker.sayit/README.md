---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sayit/README.md
title: ioBroker Sayit-Adapter
hash: CA2pWU0DOob+HMkxIHUAojmfwU4Bf5w+nb0qDp/Vxs0=
---
![Logo](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Anzahl der Installationen](http://iobroker.live/badges/sayit-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# IoBroker sayit-Adapter
![Testen und Freigeben](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Der SayIt-Adapter kann Text in Sprache umwandeln und auf einigen Geräten abspielen.

## Konfiguration
Derzeit werden die folgenden Ausgaben unterstützt:

- *Browser* – Der Browser spielt den Text auf der geöffneten Seite „iobroker.vis“ ab. Dies wird von fast jedem Desktop-Browser und einigen mobilen Browsern unterstützt.

- *[Home24- MediaPlayer](http://www.home-24.net/index.php?app=media)* - Der Text wird an das Android-Gerät gesendet und dort abgespielt, auf dem der Home24- MediaPlayer installiert ist. Hierfür wird die in Android integrierte Text-to-Speech-Engine verwendet. Der Port ist nicht änderbar und auf 50000 eingestellt.

- *Home24 - MediaPlayer und [FTP-Server](https://play.google.com/store/apps/details?id=lutey.FTPServer)* - Der Text wird gesendet und auf dem Android-Gerät mit installiertem Home24 - MediaPlayer abgespielt. Dazu wird die Text-to-Speech-Engine von Google verwendet. Die generierte MP3-Datei wird per FTP auf ein Android-Gerät kopiert und mit dem Home24 - MediaPlayer abgespielt.

Beide Apps müssen dieselben Home-Verzeichnisse haben. (Z. B. das Stammverzeichnis der „SD-Karte“).

- *System* - Der Text wird vom Betriebssystem abgespielt, auf dem der ioBroker-Adapter läuft. Folgende Betriebssysteme werden unterstützt: Windows, Linux, Mac OSx.

- *Windows-Engine* - Der Text wird von Windows abgespielt, wo der sayIt-Adapter läuft. Dazu wird die Windows-Text-to-Speech-Engine verwendet, die vom Benutzer vorkonfiguriert werden sollte. Wie Sie sie einrichten, erfahren Sie [hier](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7).

- *Sonos* - Text auf dem Sonos-Gerät abspielen. Stellen Sie sicher, dass der Webadapter aktiviert ist. Er ist erforderlich, damit SONOS die generierten MP3-Dateien lesen kann.

- *Heos* - Text auf HEOS-Geräten abspielen. Stellen Sie sicher, dass der Webadapter aktiviert ist. HEOS muss aktiviert sein, um die generierten MP3-Dateien lesen zu können.

- *Chromecast* – Text auf einem Chromecast-Gerät abspielen.

- *MPD* – Text auf dem Music Player Daemon abspielen. Verwenden Sie für den Webadapter nur **http**, kein https.

Um die Text-to-Speech-Funktion auf RaspberryPI oder Linux zu aktivieren, rufen Sie einmal den folgenden Befehl `sudo apt-get -y install mpg321` auf, um mpg321 zu installieren.

Die MP3-/WAV-Dateien können abgespielt werden, indem ihr Name in das Objekt geschrieben wird. (z. B. `/vis.0/main/img/door-bell.mp3`)

Die Datei muss zuerst geladen werden.

### TTS-Motoren
Online:

- Google: Englisch, Deutsch, Russisch, Italienisch, Spanisch, Französisch;
- Yandex: Russisch

Um Yandex-Stimmen zu verwenden, müssen Sie hier den API-Schlüssel anfordern: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/). [Dieser Dienst wird am 1. Januar 2019 deaktiviert und durch Yandex.cloud ersetzt.] Um Yandex.cloud zu verwenden, sollten Sie sich hier registrieren: [https://cloud.yandex.ru/], die SpeechKIT-API in der Cloud installieren und das Authentifizierungstoken und die Ordner-ID wie in den API-Anweisungen beschrieben abrufen.

- Cloud: Um Cloud-Stimmen zu verwenden, müssen Sie einen konfigurierten und laufenden „Cloud“-Adapter verwenden oder den App-Schlüssel direkt in den Einstellungen eingeben.
- Amazon Web Services Polly:

Um AWS Polly-Stimmen zu verwenden, müssen Sie einen Zugriffsschlüssel und einen geheimen Schlüssel [hier](https://console.aws.amazon.com/iam/home). Die Amazon-Dokumentation finden Sie [hier](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) erstellen.

Offline:

- PicoTTS (nur Linux): Englisch, Deutsch, Italienisch, Spanisch, Französisch;

Für PicoTTS müssen die folgenden Pakete installiert werden: `libttspico-utils` und lame.
Installationsbefehl: `sudo apt-get install libttspico-utils lame`

- Coqui TTS: Englisch, Deutsch, Spanisch, Französisch, Niederländisch, Japanisch, Chinesisch;

Anweisungen zur Verwendung finden Sie unter [offizielle Dokumentation](https://tts.readthedocs.io/en/latest/index.html)

### Cloud und Amazon Web Services Polly-Textformatierung
Mit [Sprachsynthese-Markup-Sprache](http://docs.aws.amazon.com/polly/latest/dg/ssml.html) können Sie Ihren Text formatieren.

Nützlichste Funktionen:

- `<break time="3s"/>`- Machen Sie eine Pause von x Sekunden (max. 10 Sekunden).
- `<emphasis> big </emphasis>` – Betonen Sie ein Wort.
- `<prosody volume="+6dB" rate="90%">Ich spreche dies</prosody>` – Geschwindigkeits- und Lautstärkeparameter steuern.
- `<say-as interpret-as="digits">12345</say-as>` – jede Ziffer einzeln aussprechen.

Mehr [Info](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### Systembefehl
Wenn Sie ein Programm haben, das Audiodateien lokal oder woanders abspielen kann, können Sie diesen Befehl hier schreiben. Z. B.

`myCustomPlayer --option`

Wenn die **System**-Ausgabe ausgewählt ist, führt der Adapter `sayit` den folgenden Befehl auf einem lokalen System aus:

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

Wenn der Dateiname irgendwo in der Mitte bleiben muss, können Sie *%s* verwenden, um anzugeben, wo der Dateiname platziert werden muss:

`myCustomPlayer --option "%s" > /dev/null`

sayIt macht daraus `myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null`.

## Verwendung
Der SayIt-Adapter kann nicht allein verwendet werden. Er muss über einen JavaScript-Adapter oder über „vis“ mit einem speziellen Widget gesteuert werden.
Nach der Erstellung der Adapterinstanz finden Sie folgende Objekte:

- `sayit.N.tts.text`: Zu sprechender Satz.
- `sayit.N.tts.volume`: Lautstärke, die beim Abspielen der Phrase verwendet wird.
- `sayit.N.tts.playing`: true, wenn gerade ein Text abgespielt wird, andernfalls false. Wird nur für die Wiedergabemodi „Windows“ und „System“ unterstützt.
- `sayit.N.tts.cachetext`: Phrase, die zwischengespeichert werden soll und dann ohne Internet verwendet werden kann.

Hier kann man z.B. manuell "Kein Internet" eingeben und wenn der Ping zu google.com negativ ist, schreibt man "Kein Internet" in "tts.text" und es wird ausgesprochen. Natürlich muss der Cache aktiviert sein.

Der Status `tts.text` unterstützt erweiterte Syntax, sodass Sprache/Engine und Lautstärke zusammen mit dem Text definiert werden können. Er wird verwendet, um mehrsprachige Text-zu-Sprache-Engines zu aktivieren.

Wenn der Adapter beispielsweise über die Engine `Google-english` verfügt, kann mit der Phrase `de:Sag es` die Verwendung der Google-Deutsch-Sprach-Engine erzwungen werden.

Mit `ru;75;Погода хорошая` können wir die Verwendung der russischen Sprache und einer Lautstärke von 75 % erzwingen.

Sie können die Lautstärke der Ansage in Prozent der aktuellen oder vorgegebenen Lautstärke (nicht der maximalen) angeben. Beispiel: Wenn der Befehl `de;75;Gutes Wetter` lautet und die „Ansagelautstärke“ 50 % beträgt, wird die Ansage mit einer Lautstärke von 38 % der möglichen 100 % abgespielt.

Der Systembefehl zum Abspielen der MP3-Datei kann ebenfalls angegeben werden. Wenn Sie dieses Feld leer lassen, werden die Standardeinstellungen verwendet: Windows - `cmdmp3.exe`, OSX - `/usr/bin/afplay`, Linux - `mpg321` oder `omxplayer` (empfohlen).

Um omxplayer zu installieren, schreiben Sie `sudo apt-get install omxplayer` oder schreiben Sie `sudo apt-get install mpg321`, um mpg321 zu installieren.

**Hinweis:** Die standardmäßige Ankündigungsauswahl ist erst nach dem Start der Instanz möglich.

Mit `sendTo` können Sie weitere unterschiedliche Parameter senden, wie z. B. `sonosDevice` oder `browserInstance`:

```javascript
sendTo('sayit.0', 'say', {
    text: 'Hello',
    sonosDevice: 'Wohnzimmer', // optional, if not defined, the device from configuration will be used
    engine: 'Google-de', // optional, if not defined, the device from configuration will be used
    type: 'sonos', // optional, if not defined, the device from configuration will be used
    volume: 20, // optional, if not defined, the device from configuration will be used
});
```

### Prioritäten
Um den Text trotz der anstehenden Texte sofort auszusprechen, haben Sie zwei Möglichkeiten:

- Platzieren Sie „!“ als erstes Zeichen im Text, sodass dieser Text unmittelbar nach dem aktuellen ausgesprochen wird.
- Schreiben Sie true in den Status "tts.clearQueue", und die Warteschlange wird gelöscht. Danach können Sie einen neuen Text in `tts.text` schreiben, aber alle in der Warteschlange befindlichen Texte werden verworfen.

### Motoren
Folgende Werte für Motoren sind möglich:

#### Google
- **en** - Englisch
- **de** - Deutsch
- **pl** - Polnisch
- **ru** - Русский
- **uk** - український
- **it** - Italienisch
- **es** - Spanisch
- **fr** - Français
- **nl** - Niederländisch
- **zh-CN** - 简体中文
- **pt** - Português

#### Yandex
- **ru_YA:Yandex** – Russisch
- **ru_YA_CLOUD:Yandex Cloud** - Русский [Die Yandex.Cloud-API generiert Dateien im OGG-Format. Um OGG-Dateien unter Linux abzuspielen, muss mplayer installiert und als Systemplayer ausgewählt sein.]

#### Amazon Polly über die Cloud
- **ru-RU_CLOUD_Female** - Russisch - Tatjana
- **ru-RU_CLOUD_Male** - Russisch - Maxim
- **de-DE_CLOUD_Female** - Deutsch - Marlene
- **de-DE_CLOUD_Male** - Deutsch - Hans
- **de-DE_CLOUD_Female_Vicki** - Deutsch - Vicki
- **de-DE_CLOUD_Male_Daniel** - Deutsch - Daniel
- **de-AT_CLOUD_Female_Hannah** - Österreich - Hannah
- **en-US_CLOUD_Female** - en-US - Weiblich - Salli
- **en-US_CLOUD_Male** - en-US - Männlich - Joey
- **da-DK_CLOUD_Female** - da-DK - Weiblich - Naja
- **da-DK_CLOUD_Male** - da-DK - Männlich - Mads
- **en-AU_CLOUD_Female** - en-AU - Weiblich - Nicole
- **en-AU_CLOUD_Male** - en-AU - Männlich - Russell
- **en-GB_CLOUD_Female_Amy** - en-GB - Weiblich - Amy
- **en-GB_CLOUD_Male** - en-GB - Männlich - Brian
- **en-GB_CLOUD_Female_Emma** - en-GB - Weiblich - Emma
- **en-GB-WLS_CLOUD_Female** - en-GB-WLS - Weiblich - Gwyneth
- **en-GB-WLS_CLOUD_Male** - en-GB-WLS - Männlich - Geraint
- **cy-GB_CLOUD_Female** - cy-GB - Weiblich - Gwyneth
- **cy-GB_CLOUD_Male** - cy-GB - Männlich - Geraint
- **en-IN_CLOUD_Female** - en-IN - Weiblich - Raveena
- **en-US_CLOUD_Male_Chipmunk** - en-US - Männlich - Chipmunk
- **en-US_CLOUD_Male_Eric** - en-US - Männlich - Eric
- **en-US_CLOUD_Female_Ivy** - en-US - Weiblich - Ivy
- **en-US_CLOUD_Female_Jennifer** - en-US - Weiblich - Jennifer
- **en-US_CLOUD_Male_Justin** - en-US - Männlich - Justin
- **en-US_CLOUD_Female_Kendra** - en-US - Weiblich - Kendra
- **en-US_CLOUD_Female_Kimberly** - en-US - Weiblich - Kimberly
- **es-ES_CLOUD_Female** - es-ES - Weiblich - Conchita
- **es-ES_CLOUD_Male** - es-ES - Männlich - Enrique
- **es-US_CLOUD_Female** - es-US - Weiblich - Penelope
- **es-US_CLOUD_Male** - es-US - Männlich - Miguel
- **fr-CA_CLOUD_Female** - fr-CA - Weiblich - Chantal
- **fr-FR_CLOUD_Female** - fr-FR - Weiblich - Celine
- **fr-FR_CLOUD_Male** - fr-FR - Männlich - Mathieu
- **is-IS_CLOUD_Female** - is-IS - Weiblich - Dora
- **is-IS_CLOUD_Male** - is-IS - Männlich - Karl
- **it-IT_CLOUD_Female** - it-IT - Weiblich - Carla
- **it-IT_CLOUD_Male** - it-IT - Männlich - Giorgio
- **nb-NO_CLOUD_Female** - no-NO - Weiblich - Liv
- **no-NO_CLOUD_Female** - no-NO - Weiblich - Ida
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

#### Pico TTS
- **en-US** - Englisch US
- **en-GB** - Englisch GB
- **de-DE** - Deutsch
- **it-IT** - Italiano
- **es-ES** - Espaniol
- **fr-FR** - Français

#### Coqui TTS
- Englisch
- Deutsch
- Spanisch
- Französisch
- Niederländisch
- 日本

#### Amazon Polly Direct
- **ru-RU_AP_Female** - Russisch - Tatjana
- **ru-RU_AP_Male** - Russisch - Maxim
- **de-DE_AP_Female** - Deutsch - Marlene
- **de-DE_AP_Female_Vicki** - Deutsch - Vicki
- **de-DE_AP_Male** - Deutsch - Hans
- **en-US_AP_Female** - en-US - Weiblich - Salli
- **en-US_AP_Male** - en-US - Männlich - Joey
- **da-DK_AP_Female** - da-DK - Weiblich - Naja
- **da-DK_AP_Male** - da-DK - Männlich - Mads
- **en-AU_AP_Female** - en-AU - Weiblich - Nicole
- **en-AU_AP_Male** - en-AU - Männlich - Russell
- **en-GB_AP_Female_Amy** - en-GB - Weiblich - Amy
- **en-GB_AP_Male** - en-GB - Männlich - Brian
- **en-GB_AP_Female_Emma** - en-GB - Weiblich - Emma
- **en-GB-WLS_AP_Female** - en-GB-WLS - Weiblich - Gwyneth
- **en-GB-WLS_AP_Male** - en-GB-WLS - Männlich - Geraint
- **cy-GB_AP_Female** - cy-GB - Weiblich - Gwyneth
- **cy-GB_AP_Male** - cy-GB - Männlich - Geraint
- **en-IN_AP_Female** - en-IN - Weiblich - Raveena
- **en-US_AP_Male_Chipmunk** - en-US - Männlich - Streifenhörnchen
- **en-US_AP_Male_Eric** - en-US - Männlich - Eric
- **en-US_AP_Female_Ivy** - en-US - Weiblich - Ivy
- **en-US_AP_Female_Jennifer** - en-US - Weiblich - Jennifer
- **en-US_AP_Male_Justin** - en-US - Männlich - Justin
- **en-US_AP_Female_Kendra** - en-US - Weiblich - Kendra
- **en-US_AP_Female_Kimberly** - en-US - Weiblich - Kimberly
- **es-ES_AP_Female** - es-ES - Weiblich - Conchita
- **es-ES_AP_Male** - es-ES - Männlich - Enrique
- **es-US_AP_Female** - es-US - Weiblich - Penelope
- **es-US_AP_Male** - es-US - Männlich - Miguel
- **fr-CA_AP_Female** - fr-CA - Weiblich - Chantal
- **fr-FR_AP_Female** - fr-FR - Weiblich - Celine
- **fr-FR_AP_Male** - fr-FR - Männlich - Mathieu
- **is-IS_AP_Female** - is-IS - Weiblich - Dora
- **is-IS_AP_Male** - is-IS - Männlich - Karl
- **it-IT_AP_Female** - it-IT - Weiblich - Carla
- **it-IT_AP_Male** - it-IT - Männlich - Giorgio
- **nb-NO_AP_Female** - nb-NO - Weiblich - Liv
- **nl-NL_AP_Female** - nl-NL - Weiblich - Lotte
- **nl-NL_AP_Male** - nl-NL - Male - Ruben
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

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN ARBEIT** -->

## Changelog
### 5.1.0 (2025-09-17)
* (bluefox) Adapter was rewritten with TypeScript
* (bluefox) Updated Polly voices list
* (bluefox) Added option to send sonos device as parameter in sendTo command

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

Copyright (c) 2014-2025, bluefox <dogafox@gmail.com>

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