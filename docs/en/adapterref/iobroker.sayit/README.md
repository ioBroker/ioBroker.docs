![Logo](admin/sayit.png)
# ioBroker sayit adapter

![Number of Installations](http://iobroker.live/badges/sayit-installed.svg)
![Number of Installations](http://iobroker.live/badges/sayit-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.sayit.svg)](https://www.npmjs.com/package/iobroker.sayit)

![Test and Release](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.sayit.svg)](https://www.npmjs.com/package/iobroker.sayit)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

SayIt Adapter can convert text to speech and play it on some device.

## Configuration
Actually, the following outputs are supported:

- *Browser* - browser will play the text within opened `iobroker.vis` page. It is supported almost by every desktop browser and by few mobile Browsers.
  With "Vis instances" set to *Aura dashboards*, the text is played in the open [Aura](https://github.com/hdering/ioBroker.aura) dashboards instead. "Browser instance" then takes a comma-separated list of Aura client IDs, or `FFFFFFFF` for every dashboard.

- *[Home24- MediaPlayer](http://www.home-24.net/index.php?app=media)* - the text will be sent and played to the Android device with Home24 - MediaPlayer installed. For this will be used build in Android text to speech engine. The port cannot be changed and set to 50000.

- *Home24 - MediaPlayer and [FTP Server](https://play.google.com/store/apps/details?id=lutey.FTPServer)* - the text will be sent and played on the Android device with Home24 - MediaPlayer installed. For this will be used the Google text to speech engine. Generated mp3 file will be copied over FTP to an Android device and played with Home24 - MediaPlayer.
    Both apps have to have same home directories. (E.g., root directory of \"sd card\").

- *System* - the text will be played by OS, where the ioBroker adapter runs. Following OS are supported: Windows, linux, Mac OSx.

- *Windows engine* - the text will be played by windows, where the sayIt adapter runs. For this will be used the Windows text to speech engine, that should be preconfigured by user. You can check [here](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7) how to set up it.

- *Sonos* - play text on the Sonos device. Be sure the Web Adapter is enabled. It is required to enable SONOS to read the generated mp3 files.

- *Heos* - play text on HEOS device. Be sure the Web Adapter is enabled. It is required to enable HEOS to read the generated mp3 files.

- *Squeezebox* - play text on a player of the Logitech Media Server (Lyrion) with the [squeezeboxrpc](https://github.com/oweitman/ioBroker.squeezeboxrpc) adapter (version 2.0.0 or newer). The text is written into the state `Announce` of the player, so the current playback is stopped and restored afterward. The volume of the announcement is configured in the squeezeboxrpc adapter. Be sure the Web Adapter is enabled, so the Media Server can read the generated mp3 files.

- *Fully Kiosk Browser* - play text on an Android tablet with [Fully Kiosk Browser](https://www.fully-kiosk.com) and the [fullybrowser](https://github.com/arteck/ioBroker.fullybrowser) adapter (version 3.0.5 or newer). The REST command `playSound` is sent via the state `Commands.setRAW` of the device and the volume is set via `Commands.setAudioVolume`. Be sure the Web Adapter is enabled, so the tablet can read the generated mp3 files.

- *Chromecast* - play text on a Chromecast device.

- *MPD* - play text on Music Player Daemon. Use only **http** for web adapter, don't use https.

To enable the text to speech on RaspberryPI or linux system call one time following command `sudo apt-get -y install mpg321` to install mpg321.

The mp3/wav files can be played to by writing its name into the object. (e.g. `/vis.0/main/img/door-bell.mp3`)

The file must be first loaded.

### TTS engines
Online:
- Google: English, German, Russian, Italian, Spanish, French;
- Yandex: Russian
  To use Yandex voices you must request the API key here: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/).  [This service will be disabled 1st of Jan 2019 and replaced by Yandex.cloud]
  To use Yandex.cloud you should register here: [https://cloud.yandex.ru/], install SpeechKIT API in the Cloud and get Auth Token and Folder ID as described in API instructions.
- FreeTTS: more than 400 voices in more than 75 languages, provided by [https://freetts.org](https://freetts.org).
  The language is not selected by the engine, but by the voice, e.g. `de-DE-KatjaNeural`.
  An API key from the [pricing page](https://freetts.org/pricing) is required. The free tier of the service
  appends a spoken "generated with freeTTS.org" to every text, so it cannot be used for announcements.
- Cloud: To use Cloud voices you need configured and running `cloud` adapter or enter app-key directly in settings
- Amazon Web Services Polly:
  To use AWS Polly voices, you need to create an access key and secret key [here](https://console.aws.amazon.com/iam/home). The Amazon documentation can you find [here](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html).

Offline:
- PicoTTS (linux only): English, German, Italian, Spanish, French;
  For PicoTTS it is necessary to install the following packages: `libttspico-utils` and lame.
  Installation command: `sudo apt-get install libttspico-utils lame`

- Coqui TTS: English, German, Spanish, French, Dutch, Japanese, Chinese;
  For instructions how to use go to the [official documentation](https://tts.readthedocs.io/en/latest/index.html)

- Piper: fast local voices in many languages, e.g. the German voices of [Thorsten-Voice](https://www.thorsten-voice.de).
  [Piper](https://github.com/OHF-Voice/piper1-gpl) runs as an HTTP server in the local network (on the ioBroker host or on any other one),
  so one server could be used by several applications. No internet and no other tools on the ioBroker host are required.
  Installation of the server (see the [HTTP API](https://github.com/OHF-Voice/piper1-gpl/blob/main/docs/API_HTTP.md)):
  ```
  python3 -m pip install piper-tts[http]
  python3 -m piper.download_voices de_DE-thorsten-high
  python3 -m piper.http_server -m de_DE-thorsten-high --host 0.0.0.0 --port 5000
  ```
  Enter the address of the server, e.g. `http://192.168.1.10:5000`, in the configuration. The voices installed on the server are offered in the configuration dialog.

### Test of the text generation
With the button `Test text generation` on the tab `Engine` you can check if the selected engine is configured properly.

The field `Test text` is prefilled with a test sentence in the language of the selected engine and can be changed
as desired. If the field is empty, the same sentence will be used. The text will be generated with the settings
of the dialog, so they must not be saved before the test.

The text will be only generated and not played, so the test works even if no player is available.
The dialog shows the size and the duration of the generated file and tries to open it in a new browser tab,
so you can listen to it. For that the browser must allow pop-ups for the ioBroker admin.

To test the generation **and** the playback together, use the button `Test` on the tab `Player`.

### Cloud and Amazon Web Services Polly text formatting
You can format your text with [Speech Synthesis Markup Language](http://docs.aws.amazon.com/polly/latest/dg/ssml.html).

Most useful features:
- `<break time="3s"/>`- make a pause for x seconds (max 10 seconds).
- `<emphasis> big </emphasis>` - make an emphasis on some word.
- `<prosody volume="+6dB" rate="90%">I am speaking this</prosody>` - control speed and volume parameters.
- `<say-as interpret-as="digits">12345</say-as>` - say every digit separately.

More [info](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### System command
If you have some program, that can play audio files locally or somewhere else, you can write this command here. E.g.

`myCustomPlayer --option`

If **System** output is selected, the `sayit` adapter will execute the following command on a local system:

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

If file name must stay somewhere in the middle, you can use *%s* to specify where the file name must be placed:

`myCustomPlayer --option "%s" > /dev/null`

sayIt will make `myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null` from it.

## Usage
SayIt adapter cannot be used alone. It must be controlled from javascript adapter or from "vis" with specific widget.
After creation of adapter instance, you can find the following objects:
- `sayit.N.tts.text`: Phrase to be spoken.
- `sayit.N.tts.volume`: volume which will be used by playing of the phrase.
- `sayit.N.tts.playing`: true if a text is now playing and false if not. Supported only for "windows" and "system" play mode.
- `sayit.N.tts.cachetext`: Phrase to be cached, and then it can be used without an internet.
   E.g., you can enter here manually "No internet" and if ping to google.com is negative, write "No internet" to "tts.text" and it will be pronounced. Of course, cache must be enabled.

The cached files are stored in the cache directory. A relative path is relative to `iobroker-data/sayit`, an absolute path is used as it is. The default for new instances is `cache`, i.e. `iobroker-data/sayit/cache`. Older instances keep `../../cache/`, i.e. `<ioBroker installation>/cache`.

State `tts.text` supports extended syntax, so the language/engine and volume can be defined together with text. It is used to enable multi-language text2speech engines.
E.g., if adapter has engine `Google-english`, it is possible with phrase `de:Sag es` to force using Google-Deutsch speech engine.

With `ru;75;Погода хорошая` we can force using russian language and volume 75%.

You can specify the volume of announcement in percent from current or given volume (not from maximal). E.g., if command is `de;75;Gutes Wetter`and "announce volume" is 50%, the announcement will be played with volume 38% from 100% possible.

The system command to play the mp3 file can be specified too. If you leave it blank, the default settings will be used: windows - `cmdmp3.exe`, OSX - `/usr/bin/afplay`, linux - `mpg321` or `omxplayer` (recommended).

To install omxplayer write `sudo apt-get install omxplayer` or write `sudo apt-get install mpg321` to install mpg321.

**Note:** The default announce selection will be possible only after the start of the instance.

With `sendTo` you can send more different parameters, like `sonosDevice` or `browserInstance`:
```javascript
sendTo('sayit.0', 'say', {
    text: 'Hello',
    sonosDevice: 'Wohnzimmer', // optional, if not defined, the device from configuration will be used
    engine: 'Google-de', // optional, if not defined, the device from configuration will be used
    type: 'sonos', // optional, if not defined, the device from configuration will be used
    volume: 20, // optional, if not defined, the device from configuration will be used
});
```

### Priorities
To immediately pronounce the text despite the queued texts, you have two possibilities:
- place "!" as a first character in text, so this text will be pronounced immediately after the current one.
- write true into "tts.clearQueue" state and the queue will be cleared. After that you can write a new text into `tts.text`, but all queued texts are thrown away.

### Engines
The following values for engines are possible:

#### Google
- **en** - English
- **de** - Deutsch
- **pl** - Polski
- **ru** - Русский
- **uk** - український
- **it** - Italiano
- **es** - Espaniol
- **fr** - Français
- **nl** - Nederlands
- **zh-CN** - 简体中文
- **pt** - Português

#### FreeTTS
- **freeTTS** - the voice, the speed and the pitch are taken from the instance configuration

The language is a part of the voice, so only one engine name exists. The voice, e.g. `de-DE-KatjaNeural`,
is selected in the configuration dialog and the list of all available voices is read from the service.
A request is limited to 10000 characters, so longer texts are split and said one after another.

#### Piper
- **piper** - the server, the voice, the speaker and the speed are taken from the instance configuration

Like by FreeTTS, the language is a part of the voice, e.g. `de_DE-thorsten-high`. If no voice is selected, the default voice of the server is used.

#### Yandex
- **ru_YA:Yandex** - Русский
- **ru_YA_CLOUD:Yandex Cloud** - Русский [Yandex.Cloud API generates files in OGG format. To play ogg files on linux mplayer should be installed and selected as system player]

#### Amazon polly via cloud
- **ru-RU_CLOUD_Female** -         Русский - Татьяна
- **ru-RU_CLOUD_Male** -           Русский - Максим
- **de-DE_CLOUD_Female** -         Deutsch - Marlene
- **de-DE_CLOUD_Male** -           Deutsch - Hans
- **de-DE_CLOUD_Female_Vicki**  -  Deutsch - Vicki
- **de-DE_CLOUD_Male_Daniel**  -   Deutsch - Daniel
- **de-AT_CLOUD_Female_Hannah**  - Österreich - Hannah
- **en-US_CLOUD_Female** -         en-US - Female - Salli
- **en-US_CLOUD_Male** -           en-US - Male - Joey
- **da-DK_CLOUD_Female** -         da-DK - Female - Naja
- **da-DK_CLOUD_Male** -           da-DK - Male - Mads
- **en-AU_CLOUD_Female** -         en-AU - Female - Nicole
- **en-AU_CLOUD_Male** -           en-AU - Male - Russell
- **en-GB_CLOUD_Female_Amy** -     en-GB - Female - Amy
- **en-GB_CLOUD_Male** -           en-GB - Male - Brian
- **en-GB_CLOUD_Female_Emma** -    en-GB - Female - Emma
- **en-GB-WLS_CLOUD_Female** -     en-GB-WLS - Female - Gwyneth
- **en-GB-WLS_CLOUD_Male** -       en-GB-WLS - Male - Geraint
- **cy-GB_CLOUD_Female** -         cy-GB - Female - Gwyneth
- **cy-GB_CLOUD_Male** -           cy-GB - Male - Geraint
- **en-IN_CLOUD_Female** -         en-IN - Female - Raveena
- **en-US_CLOUD_Male_Chipmunk** -  en-US - Male - Chipmunk
- **en-US_CLOUD_Male_Eric** -      en-US - Male - Eric
- **en-US_CLOUD_Female_Ivy** -     en-US - Female - Ivy
- **en-US_CLOUD_Female_Jennifer** -  en-US - Female - Jennifer
- **en-US_CLOUD_Male_Justin** -    en-US - Male - Justin
- **en-US_CLOUD_Female_Kendra** -  en-US - Female - Kendra
- **en-US_CLOUD_Female_Kimberly** -  en-US - Female - Kimberly
- **es-ES_CLOUD_Female** -         es-ES - Female - Conchita
- **es-ES_CLOUD_Male** -           es-ES - Male - Enrique
- **es-US_CLOUD_Female** -         es-US - Female - Penelope
- **es-US_CLOUD_Male** -           es-US - Male - Miguel
- **fr-CA_CLOUD_Female** -         fr-CA - Female - Chantal
- **fr-FR_CLOUD_Female** -         fr-FR - Female - Celine
- **fr-FR_CLOUD_Male** -           fr-FR - Male - Mathieu
- **is-IS_CLOUD_Female** -         is-IS - Female - Dora
- **is-IS_CLOUD_Male** -           is-IS - Male - Karl
- **it-IT_CLOUD_Female** -         it-IT - Female - Carla
- **it-IT_CLOUD_Male** -           it-IT - Male - Giorgio
- **nb-NO_CLOUD_Female** -         no-NO - Female - Liv
- **no-NO_CLOUD_Female** -         no-NO - Female - Ida
- **nl-NL_CLOUD_Female** -         nl-NL - Female - Lotte
- **nl-NL_CLOUD_Male** -           nl-NL - Male - Ruben
- **pl-PL_CLOUD_Female_Agnieszka** -  pl-PL - Female - Agnieszka
- **pl-PL_CLOUD_Male_Jacek** -     pl-PL - Male - Jacek
- **pl-PL_CLOUD_Female_Ewa** -     pl-PL - Female - Ewa
- **pl-PL_CLOUD_Male_Jan** -       pl-PL - Male - Jan
- **pl-PL_CLOUD_Female** -         pl-PL - Female - Maja
- **pt-BR_CLOUD_Female** -         pt-BR - Female - Vitoria
- **pt-BR_CLOUD_Female_Camila**  - pt-BR - Female - Camila
- **pt-BR_CLOUD_Male** -           pt-BR - Male - Ricardo
- **pt-PT_CLOUD_Male** -           pt-PT - Male - Cristiano
- **pt-PT_CLOUD_Female** -         pt-PT - Female - Ines
- **ro-RO_CLOUD_Female** -         ro-RO - Female - Carmen
- **sv-SE_CLOUD_Female** -         sv-SE - Female - Astrid
- **tr-TR_CLOUD_Female** -         tr-TR - Female - Filiz
- **pt-BR_CLOUD_Female_Camila** -  pt-BR - Female - Camila

#### Pico TTS
- **en-US** - Englisch US
- **en-GB** - Englisch GB
- **de-DE** - Deutsch
- **it-IT** - Italiano
- **es-ES** - Espaniol
- **fr-FR** - Français

#### Coqui TTS
- English
- Deutsch
- Espanol
- Francais
- Nederlands
- 日本

#### Amazon polly direct
- **ru-RU_AP_Female** -           Русский - Татьяна
- **ru-RU_AP_Male** -             Русский - Максим
- **de-DE_AP_Female** -           Deutsch - Marlene
- **de-DE_AP_Female_Vicki** -     Deutsch - Vicki
- **de-DE_AP_Male** -             Deutsch - Hans
- **en-US_AP_Female** -           en-US - Female - Salli
- **en-US_AP_Male** -             en-US - Male - Joey
- **da-DK_AP_Female** -           da-DK - Female - Naja
- **da-DK_AP_Male** -             da-DK - Male - Mads
- **en-AU_AP_Female** -           en-AU - Female - Nicole
- **en-AU_AP_Male** -             en-AU - Male - Russell
- **en-GB_AP_Female_Amy** -       en-GB - Female - Amy
- **en-GB_AP_Male** -             en-GB - Male - Brian
- **en-GB_AP_Female_Emma** -      en-GB - Female - Emma
- **en-GB-WLS_AP_Female** -       en-GB-WLS - Female - Gwyneth
- **en-GB-WLS_AP_Male** -         en-GB-WLS - Male - Geraint
- **cy-GB_AP_Female** -           cy-GB - Female - Gwyneth
- **cy-GB_AP_Male** -             cy-GB - Male - Geraint
- **en-IN_AP_Female** -           en-IN - Female - Raveena
- **en-US_AP_Male_Chipmunk** -    en-US - Male - Chipmunk
- **en-US_AP_Male_Eric** -        en-US - Male - Eric
- **en-US_AP_Female_Ivy** -       en-US - Female - Ivy
- **en-US_AP_Female_Jennifer** -  en-US - Female - Jennifer
- **en-US_AP_Male_Justin** -      en-US - Male - Justin
- **en-US_AP_Female_Kendra** -    en-US - Female - Kendra
- **en-US_AP_Female_Kimberly** -  en-US - Female - Kimberly
- **es-ES_AP_Female** -           es-ES - Female - Conchita
- **es-ES_AP_Male** -             es-ES - Male - Enrique
- **es-US_AP_Female** -           es-US - Female - Penelope
- **es-US_AP_Male** -             es-US - Male - Miguel
- **fr-CA_AP_Female** -           fr-CA - Female - Chantal
- **fr-FR_AP_Female** -           fr-FR - Female - Celine
- **fr-FR_AP_Male** -             fr-FR - Male - Mathieu
- **is-IS_AP_Female** -           is-IS - Female - Dora
- **is-IS_AP_Male** -             is-IS - Male - Karl
- **it-IT_AP_Female** -           it-IT - Female - Carla
- **it-IT_AP_Male** -             it-IT - Male - Giorgio
- **nb-NO_AP_Female** -           nb-NO - Female - Liv
- **nl-NL_AP_Female** -           nl-NL - Female - Lotte
- **nl-NL_AP_Male** -             nl-NL - Male - Ruben
- **pl-PL_AP_Female_Agnieszka** -  pl-PL - Female - Agnieszka
- **pl-PL_AP_Male_Jacek** -       pl-PL - Male - Jacek
- **pl-PL_AP_Female_Ewa** -       pl-PL - Female - Ewa
- **pl-PL_AP_Male_Jan** -         pl-PL - Male - Jan
- **pl-PL_AP_Female** -           pl-PL - Female - Maja
- **pt-BR_AP_Female** -           pt-BR - Female - Vitoria
- **pt-BR_AP_Male** -             pt-BR - Male - Ricardo
- **pt-PT_AP_Male** -             pt-PT - Male - Cristiano
- **pt-PT_AP_Female** -           pt-PT - Female - Ines
- **ro-RO_AP_Female** -           ro-RO - Female - Carmen
- **sv-SE_AP_Female** -           sv-SE - Female - Astrid
- **tr-TR_AP_Female** -           tr-TR - Female - Filiz
- **ko-KR_AP_Female** -           ko-KR - Female - Seoyeon

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 5.5.0 (2026-10-27)
* (@hdering) Added the Aura dashboards as a target of the output type "Browser" (#518)
* (@GermanBluefox) Added the output type "Fully Kiosk Browser" for the tablets of the fullybrowser adapter

### 5.4.0 (2026-10-23)
* (@GermanBluefox) Updated packages
* (@GermanBluefox) Added the output type "Squeezebox" for the players of the squeezeboxrpc adapter (#5)
* (@GermanBluefox) Added Piper as a new local TTS engine, e.g. with the voices of Thorsten-Voice (#398)

### 5.3.3 (2026-10-23)
* (@GermanBluefox) Fixed: a cache hit played the last generated text instead of the cached file (#497)
* (@GermanBluefox) The cache directory is now resolved relative to `iobroker-data/sayit` and could be absolute. It can be changed in the configuration dialog. New instances store the cache in `iobroker-data/sayit/cache` (#442)
* (@GermanBluefox) By changing of the engine, only cached files are deleted from the cache directory and not all files
* (@GermanBluefox) Fixed: the heos players were not listed in the configuration dialog (#416)
* (@GermanBluefox) Fixed: IPv6 addresses of the web server are written in square brackets in the link for the devices. Only IPv4 addresses are offered in the configuration dialog (#399)
* (@GermanBluefox) Fixed: the cache was not used for the texts sent by the "say" command, e.g. from Blockly or scripts
* (@GermanBluefox) Fixed: texts with SSML tags were never found in the cache, if the engine does not support SSML
* (@GermanBluefox) Corrected the roles of the states `tts.text`, `tts.cachetext` and `tts.playing`
* (@GermanBluefox) Used the timers of the adapter and added the missing size attributes in the configuration dialog

### 5.3.2 (2026-10-13)
* (@GermanBluefox) Removed the "install" script and `process.exit()` for compact mode
* (@GermanBluefox) Passwords and API keys are now protected from reading by non-admin users

### 5.3.1 (2026-08-13)
* (@GermanBluefox) Added the button "Test text generation" to the "Engine" tab, so the selected engine can be tested with an own text
* (@GermanBluefox) Test generations do not overwrite the cached files anymore
* (@GermanBluefox) Adapter requires node.js >= 22 and js-controller >= 6.0.11 now
* (@GermanBluefox) Older changelog entries were moved to CHANGELOG_OLD.md
* (@GermanBluefox) Updated the dependabot and auto-merge configuration

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