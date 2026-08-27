---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sayit/README.md
title: ioBroker Sayit-Adapter
hash: +ihpuczRngjRxTmffEJbUT5jR1VuwSqI598CSYm6N90=
---
![Logo](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Anzahl der Installationen](http://iobroker.live/badges/sayit-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# IoBroker Sayit-Adapter
![Test und Freigabe](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Der SayIt-Adapter kann Text in Sprache umwandeln und auf bestimmten Geräten wiedergeben.

## Konfiguration
Tatsächlich werden folgende Ausgaben unterstützt:

- *Browser* – Der Browser gibt den Text auf der geöffneten Seite `iobroker.vis` wieder. Dies wird von nahezu allen Desktop-Browsern und einigen mobilen Browsern unterstützt.

Der Text wird an das Android-Gerät mit installiertem Home24 MediaPlayer gesendet und dort wiedergegeben. Hierfür wird die in Android integrierte Text-to-Speech-Funktion verwendet. Der Port kann nicht geändert werden und muss auf 50000 eingestellt sein.

*Home24 – MediaPlayer und [FTP-Server](https://play.google.com/store/apps/details?id=lutey.FTPServer)* – Der Text wird an das Android-Gerät mit installiertem Home24 – MediaPlayer gesendet und dort wiedergegeben. Hierfür wird die Google-Text-to-Speech-Engine verwendet. Die generierte MP3-Datei wird per FTP auf das Android-Gerät kopiert und mit Home24 – MediaPlayer abgespielt.

Beide Apps müssen das gleiche Stammverzeichnis haben. (z. B. das Stammverzeichnis der „SD-Karte“).

- *System* - Der Text wird vom Betriebssystem abgespielt, auf dem der ioBroker-Adapter ausgeführt wird. Folgende Betriebssysteme werden unterstützt: Windows, Linux, Mac OS X.

Die Windows-Engine gibt den Text wieder, auf dem der sayIt-Adapter ausgeführt wird. Hierfür wird die Windows-Sprachausgabe verwendet, die vom Benutzer vorkonfiguriert werden muss. Informationen zur Einrichtung finden Sie [hier](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7).

Sonos – Wiedergabe von Text auf dem Sonos-Gerät. Stellen Sie sicher, dass der Webadapter aktiviert ist. Er ist erforderlich, damit Sonos die generierten MP3-Dateien lesen kann.

- *Heos* – Textwiedergabe auf HEOS-Geräten. Stellen Sie sicher, dass der Webadapter aktiviert ist. Er ist erforderlich, damit HEOS die generierten MP3-Dateien abspielen kann.

- *Chromecast* - Text auf einem Chromecast-Gerät abspielen.

- *MPD* – Wiedergabe von Text im Musikplayer-Daemon. Verwenden Sie für den Webadapter ausschließlich **http**, nicht https.

Um die Text-zu-Sprache-Funktion auf einem Raspberry Pi oder Linux-System zu aktivieren, rufen Sie einmalig den folgenden Befehl auf: `sudo apt-get -y install mpg321`, um mpg321 zu installieren.

Die MP3-/WAV-Dateien können abgespielt werden, indem ihr Name in das Objekt geschrieben wird. (z. B. `/vis.0/main/img/door-bell.mp3`)

Die Datei muss zuerst geladen werden.

### TTS-Motoren
Online:

- Google: Englisch, Deutsch, Russisch, Italienisch, Spanisch, Französisch;
- Yandex: Russisch

Um Yandex Voices zu nutzen, müssen Sie hier den API-Schlüssel anfordern: [https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/](https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/). [Dieser Dienst wird am 1. Januar 2019 deaktiviert und durch Yandex.Cloud ersetzt.] Um Yandex.Cloud zu nutzen, registrieren Sie sich hier: [https://cloud.yandex.ru/], installieren Sie die SpeechKIT-API in der Cloud und rufen Sie das Authentifizierungstoken und die Ordner-ID gemäß der API-Anleitung ab.

- FreeTTS: mehr als 400 Stimmen in mehr als 75 Sprachen, bereitgestellt von [https://freetts.org](https://freetts.org).

Die Sprache wird nicht vom System, sondern von der Stimme ausgewählt, z. B. `de-DE-KatjaNeural`.

Ein API-Schlüssel von [Preisseite](https://freetts.org/pricing) ist erforderlich. Die kostenlose Version des Dienstes fügt jedem Text den gesprochenen Hinweis „Generiert mit freeTTS.org“ hinzu und ist daher nicht für Ansagen geeignet.

- Cloud: Um Cloud-Stimmen zu nutzen, benötigen Sie einen konfigurierten und laufenden „Cloud“-Adapter oder geben Sie den App-Schlüssel direkt in den Einstellungen ein.
- Amazon Web Services Polly:

Um AWS Polly Voices zu verwenden, müssen Sie einen Zugriffsschlüssel und einen geheimen Schlüssel [Die Amazon-Dokumentation finden Sie hier: [https://console.aws.amazon.com/iam/home].](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) erstellen.

Offline:

- PicoTTS (nur Linux): Englisch, Deutsch, Italienisch, Spanisch, Französisch;

Für PicoTTS müssen die folgenden Pakete installiert werden: `libttspico-utils` und lame.
Installationsbefehl: `sudo apt-get install libttspico-utils lame`

- Coqui TTS: Englisch, Deutsch, Spanisch, Französisch, Niederländisch, Japanisch, Chinesisch;

Eine Anleitung zur Verwendung finden Sie unter [offizielle Dokumentation](https://tts.readthedocs.io/en/latest/index.html)

### Test der Textgenerierung
Mit der Schaltfläche `Test text generation` auf der Registerkarte `Engine` können Sie überprüfen, ob die ausgewählte Engine richtig konfiguriert ist.

Das Feld `Test text` ist mit einem Testsatz in der Sprache der ausgewählten Engine vorausgefüllt und kann nach Belieben geändert werden. Ist das Feld leer, wird derselbe Satz verwendet. Der Text wird anhand der Dialogeinstellungen generiert; diese dürfen daher vor dem Test nicht gespeichert werden.

Der Text wird nur generiert, aber nicht abgespielt. Der Test funktioniert daher auch ohne verfügbaren Player.
Im Dialogfeld werden Größe und Dauer der generierten Datei angezeigt. Es wird versucht, die Datei in einem neuen Browser-Tab zu öffnen, damit Sie sie anhören können. Dafür muss Ihr Browser Pop-ups für die ioBroker-Administration zulassen.

Um die Generierung **und** die Wiedergabe gleichzeitig zu testen, verwenden Sie die Schaltfläche `Test` auf der Registerkarte `Player`.

### Cloud- und Amazon Web Services Polly-Textformatierung
Sie können Ihren Text mit [Sprachsynthese-Auszeichnungssprache](http://docs.aws.amazon.com/polly/latest/dg/ssml.html) formatieren.

Die nützlichsten Funktionen:

- `<break time="3s"/>`- eine Pause für x Sekunden (maximal 10 Sekunden) einfügen.
- `<emphasis> groß </emphasis>` - ein bestimmtes Wort hervorheben.
- `<prosody volume="+6dB" rate="90%">Ich spreche dies</prosody>` - Steuere Geschwindigkeits- und Lautstärkeparameter.
- `<say-as interpret-as="digits">12345</say-as>` - jede Ziffer einzeln aussprechen.

Mehr [Info](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference).

### Systembefehl
Wenn Sie ein Programm haben, das Audiodateien lokal oder extern abspielen kann, können Sie diesen Befehl hier eingeben. Z. B.

`myCustomPlayer --option`

Wenn die **Systemausgabe** ausgewählt ist, führt der `sayit`-Adapter den folgenden Befehl auf einem lokalen System aus:

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

Wenn der Dateiname irgendwo in der Mitte stehen muss, können Sie *%s* verwenden, um anzugeben, wo der Dateiname platziert werden soll:

`myCustomPlayer --option "%s" > /dev/null`

sayIt will make `myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null` from it.

## Verwendung
Der SayIt-Adapter kann nicht eigenständig verwendet werden. Er muss über einen JavaScript-Adapter oder über „vis“ mit einem spezifischen Widget gesteuert werden.
Nach der Erstellung der Adapterinstanz finden Sie die folgenden Objekte:

- `sayit.N.tts.text`: Zu sprechender Satz.
- `sayit.N.tts.volume`: Lautstärke, die beim Abspielen des Satzes verwendet wird.
- `sayit.N.tts.playing`: Gibt true zurück, wenn gerade ein Text abgespielt wird, und false, wenn nicht. Wird nur für die Wiedergabemodi „Windows“ und „System“ unterstützt.
- `sayit.N.tts.cachetext`: Der zwischengespeicherte Satz kann dann auch ohne Internetverbindung verwendet werden.

Sie können beispielsweise manuell „Kein Internet“ eingeben. Wenn der Ping an google.com negativ ausfällt, schreiben Sie „Kein Internet“ in „tts.text“, und es wird vorgelesen. Der Cache muss natürlich aktiviert sein.

Der Status `tts.text` unterstützt eine erweiterte Syntax, sodass Sprache/Engine und Lautstärke zusammen mit dem Text definiert werden können. Er wird verwendet, um mehrsprachige Text-zu-Sprache-Engines zu aktivieren.
Beispiel: Wenn der Adapter die Engine `Google-english` verwendet, kann mit der Phrase `de:Sag es` die Verwendung der Google-Deutsch-Sprachausgabe erzwungen werden.

Mit `ru;75;Погода хорошая` können wir die Verwendung der russischen Sprache und der Lautstärke auf 75 % erzwingen.

Sie können die Lautstärke der Ansage in Prozent der aktuellen oder einer vorgegebenen Lautstärke (nicht der maximalen) festlegen. Beispiel: Bei dem Befehl `de;75;Gutes Wetter` und einer Lautstärke von 50 % wird die Ansage mit 38 % der maximal möglichen Lautstärke abgespielt.

Der Systembefehl zum Abspielen der MP3-Datei kann ebenfalls angegeben werden. Wenn Sie das Feld leer lassen, werden die Standardeinstellungen verwendet: Windows – `cmdmp3.exe`, macOS – `/usr/bin/afplay`, Linux – `mpg321` oder `omxplayer` (empfohlen).

Um omxplayer zu installieren, geben Sie `sudo apt-get install omxplayer` ein, oder geben Sie `sudo apt-get install mpg321` ein, um mpg321 zu installieren.

**Hinweis:** Die Auswahl der Standardankündigung ist erst nach dem Start der Instanz möglich.

Mit `sendTo` können Sie weitere verschiedene Parameter senden, wie z. B. `sonosDevice` oder `browserInstance`:

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
Um den Text trotz der in der Warteschlange befindlichen Texte sofort auszusprechen, haben Sie zwei Möglichkeiten:

- Setzen Sie "!" als erstes Zeichen in den Text, damit dieser Text direkt im Anschluss an den aktuellen Text ausgesprochen wird.
- Schreiben Sie den Wert „true“ in den Zustand „tts.clearQueue“, um die Warteschlange zu leeren. Anschließend können Sie einen neuen Text in „tts.text“ schreiben, wobei alle in der Warteschlange befindlichen Texte verworfen werden.

### Motoren
Folgende Werte für Motoren sind möglich:

#### Google
- **en** - Englisch
- **de** - Deutsch
- **pl** - Polski
- **ru** - Русский
- **uk** - український
- **it** - Italiano
- **es** - Spanisch
- **fr** - Français
- **nl** - Niederländisch
- **zh-CN** - 简体中文
- **pt** - Português

#### FreeTTS
- **freeTTS** - Stimme, Geschwindigkeit und Tonhöhe werden aus der Instanzkonfiguration übernommen.

Die Sprache ist Teil der Sprachausgabe, daher existiert nur ein einziger Name für die Sprachausgabe. Die gewünschte Stimme, z. B. `de-DE-KatjaNeural`, wird im Konfigurationsdialog ausgewählt, und die Liste aller verfügbaren Stimmen wird vom Dienst abgerufen.
Eine Anfrage ist auf 10.000 Zeichen begrenzt; längere Texte werden daher aufgeteilt und nacheinander vorgelesen.

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
- **en-US_CLOUD_Male_Chipmunk** - en-US - Männlich - Streifenhörnchen
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
- **ist-IS_WOLKE_Weiblich** - ist-IS - Weiblich - Dora
- **is-IS_CLOUD_Male** - is-IS - Male - Karl
- **it-IT_CLOUD_Female** - it-IT - Weiblich - Carla
- **it-IT_CLOUD_Male** - it-IT - Male - Giorgio
- **nb-NO_CLOUD_Female** - no-NO - Female - Liv
- **no-NO_CLOUD_Female** - no-NO - Female - Ida
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
- **es-ES** - Spanisch
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
- **is-IS_AP_Male** - is-IS - Male - Karl
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

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

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