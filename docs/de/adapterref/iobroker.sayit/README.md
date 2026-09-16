---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sayit/README.md
title: ioBroker Sayit-Adapter
hash: BP8TzXMcwx9s4XbFXcpeZG7WZoH/KN2HPkIEXRkdYiw=
---
![Logo](../../../en/adapterref/iobroker.sayit/admin/sayit.png)

![Anzahl der Installationen](http://iobroker.live/badges/sayit-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sayit.svg)
![Test und Freigabe](https://github.com/ioBroker/iobroker.sayit/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sayit/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sayit.svg)

# ioBroker Sayit-Adapter

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Der SayIt-Adapter kann Text in Sprache umwandeln und auf bestimmten Geräten wiedergeben.

## Konfiguration

Tatsächlich werden folgende Ausgaben unterstützt:

- _Browser_ – der Browser spielt den Text innerhalb des geöffneten Bereichs ab.`iobroker.vis` Seite. Sie wird von nahezu allen Desktop-Browsern und einigen mobilen Browsern unterstützt.

- _[Home24-MediaPlayer](http://www.home-24.net/index.php?app=media)_ – Der Text wird an das Android-Gerät mit installiertem Home24-MediaPlayer gesendet und dort wiedergegeben. Hierfür wird die in Android integrierte Text-to-Speech-Funktion verwendet. Der Port kann nicht geändert werden und muss auf 50000 eingestellt sein.

- _Home24 – MediaPlayer und [FTP-Server](https://play.google.com/store/apps/details?id=lutey.FTPServer)_ : Der Text wird an das Android-Gerät mit installiertem Home24 MediaPlayer gesendet und dort wiedergegeben. Hierfür wird die Google-Text-to-Speech-Engine verwendet. Die generierte MP3-Datei wird per FTP auf das Android-Gerät kopiert und mit Home24 MediaPlayer abgespielt. Beide Apps müssen dasselbe Benutzerverzeichnis verwenden (z. B. das Stammverzeichnis der SD-Karte).

- _System_ – Der Text wird vom Betriebssystem abgespielt, auf dem der ioBroker-Adapter ausgeführt wird. Folgende Betriebssysteme werden unterstützt: Windows, Linux, Mac OS X.

- _Windows-Engine_ – Der Text wird von Windows wiedergegeben, auf dem der sayIt-Adapter ausgeführt wird. Hierfür wird die Windows-Text-to-Speech-Engine verwendet, die vom Benutzer vorkonfiguriert werden muss. Eine Anleitung zur Einrichtung finden Sie [hier](http://windows.microsoft.com/en-us/windows/setting-speech-options#1TC=windows-7) .

- _Sonos_ – Wiedergabe von Text auf dem Sonos-Gerät. Stellen Sie sicher, dass der Webadapter aktiviert ist. Er ist erforderlich, damit Sonos die generierten MP3-Dateien lesen kann.

- _HEOS_ – Textwiedergabe auf HEOS-Geräten. Stellen Sie sicher, dass der Webadapter aktiviert ist. Er ist erforderlich, damit HEOS die generierten MP3-Dateien abspielen kann.

- _Chromecast_ – Text auf einem Chromecast-Gerät abspielen.

- _MPD_ – Wiedergabe von Text über den Musikplayer-Daemon. Verwenden Sie für den Webadapter ausschließlich **http** , nicht https.

Um die Text-zu-Sprache-Funktion auf einem Raspberry Pi oder Linux-System zu aktivieren, führen Sie einmalig folgenden Befehl aus:`sudo apt-get -y install mpg321` mpg321 installieren.

Die MP3-/WAV-Dateien können abgespielt werden, indem ihr Name in das Objekt eingegeben wird. (z. B.`/vis.0/main/img/door-bell.mp3` )

Die Datei muss zuerst geladen werden.

### TTS-Motoren

Online:

- Google: Englisch, Deutsch, Russisch, Italienisch, Spanisch, Französisch;
- Yandex: Russisch. Um Yandex Voices zu nutzen, müssen Sie hier einen API-Schlüssel anfordern: <https://tech.yandex.ru/speechkit/cloud/doc/dg/concepts/About-docpage/> . \[Dieser Dienst wird am 1. Januar 2019 eingestellt und durch Yandex.Cloud ersetzt.] Um Yandex.Cloud zu nutzen, registrieren Sie sich hier: \[ <https://cloud.yandex.ru/> ], installieren Sie die SpeechKIT-API in der Cloud und rufen Sie das Authentifizierungstoken und die Ordner-ID gemäß der API-Anleitung ab.
- FreeTTS: Über 400 Stimmen in mehr als 75 Sprachen, bereitgestellt von <https://freetts.org> . Die Sprache wird nicht von der Engine, sondern von der jeweiligen Stimme ausgewählt.`de-DE-KatjaNeural` Ein API-Schlüssel von der [Preisseite](https://freetts.org/pricing) ist erforderlich. Die kostenlose Version des Dienstes fügt jedem Text den gesprochenen Hinweis „Generiert mit freeTTS.org“ hinzu und kann daher nicht für Ansagen verwendet werden.
- Cloud: Um Cloud Voices nutzen zu können, müssen Sie es konfigurieren und ausführen lassen.`cloud` Adapter oder App-Schlüssel direkt in den Einstellungen eingeben
- Amazon Web Services Polly: Um AWS Polly-Stimmen zu verwenden, müssen Sie [hier](https://console.aws.amazon.com/iam/home) einen Zugriffsschlüssel und einen geheimen Schlüssel erstellen. Die Amazon-Dokumentation finden Sie [hier](http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) .

Offline:

- PicoTTS (nur Linux): Englisch, Deutsch, Italienisch, Spanisch, Französisch; Für PicoTTS müssen die folgenden Pakete installiert werden:`libttspico-utils` und lahm. Installationsbefehl:`sudo apt-get install libttspico-utils lame`

- Coqui TTS: Englisch, Deutsch, Spanisch, Französisch, Niederländisch, Japanisch, Chinesisch; Anweisungen zur Verwendung finden Sie in der [offiziellen Dokumentation.](https://tts.readthedocs.io/en/latest/index.html)

### Test der Textgenerierung

Mit dem Knopf`Test text generation` auf der Registerkarte`Engine` Sie können überprüfen, ob der ausgewählte Motor richtig konfiguriert ist.

Das Feld`Test text` Das Feld ist mit einem Testsatz in der Sprache der ausgewählten Engine vorausgefüllt und kann nach Belieben geändert werden. Ist das Feld leer, wird derselbe Satz verwendet. Der Text wird anhand der Dialogeinstellungen generiert; diese dürfen daher vor dem Test nicht gespeichert werden.

Der Text wird lediglich generiert, aber nicht abgespielt. Der Test funktioniert daher auch ohne verfügbaren Player. Im Dialogfeld werden Größe und Dauer der generierten Datei angezeigt und versucht, diese in einem neuen Browsertab zu öffnen, damit Sie sie anhören können. Hierfür muss der Browser Pop-ups für die ioBroker-Administration zulassen.

Um die Generierung **und** Wiedergabe gleichzeitig zu testen, verwenden Sie die Schaltfläche`Test` auf der Registerkarte`Player` Die

### Cloud- und Amazon Web Services Polly-Textformatierung

Sie können Ihren Text mit [der Speech Synthesis Markup Language](http://docs.aws.amazon.com/polly/latest/dg/ssml.html) formatieren.

Die nützlichsten Funktionen:

- `<break time="3s"/>` - eine Pause von x Sekunden (maximal 10 Sekunden) einfügen.
- `<emphasis> big </emphasis>` - ein bestimmtes Wort hervorheben.
- `<prosody volume="+6dB" rate="90%">I am speaking this</prosody>` - Steuerung von Geschwindigkeits- und Lautstärkeparametern.
- `<say-as interpret-as="digits">12345</say-as>` - Sagen Sie jede Ziffer einzeln.

Mehr [Infos](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/speech-synthesis-markup-language-ssml-reference) .

### Systembefehl

Wenn Sie ein Programm haben, das Audiodateien lokal oder extern abspielen kann, können Sie diesen Befehl hier eingeben. Z. B.

`myCustomPlayer --option`

Wenn **die Systemausgabe** ausgewählt ist,`sayit` Der Adapter führt folgenden Befehl auf dem lokalen System aus:

`myCustomPlayer --option /opt/iobroker/node_modules/iobroker.sayit/say.mp3`

Wenn der Dateiname irgendwo in der Mitte stehen muss, können Sie _%s_ verwenden, um anzugeben, wo der Dateiname platziert werden soll:

`myCustomPlayer --option "%s" > /dev/null`

Es wird dazu führen`myCustomPlayer --option "/opt/iobroker/node_modules/iobroker.sayit/say.mp3" > /dev/null` davon.

## Verwendung

Der SayIt-Adapter kann nicht eigenständig verwendet werden. Er muss über einen JavaScript-Adapter oder über „vis“ mit einem spezifischen Widget gesteuert werden. Nach der Erstellung der Adapterinstanz finden Sie die folgenden Objekte:

- `sayit.N.tts.text` : Der auszusprechende Satz.
- `sayit.N.tts.volume` Lautstärke, die beim Abspielen des Satzes verwendet wird.
- `sayit.N.tts.playing` Gibt „true“ zurück, wenn gerade ein Text abgespielt wird, andernfalls „false“. Wird nur für die Wiedergabemodi „Windows“ und „System“ unterstützt.
- `sayit.N.tts.cachetext` Dieser Satz wird zwischengespeichert und kann dann offline verwendet werden. Sie können beispielsweise manuell „Kein Internet“ eingeben. Wenn ein Ping an google.com negativ ausfällt, schreiben Sie „Kein Internet“ in „tts.text“, und der Satz wird vorgelesen. Der Cache muss natürlich aktiviert sein.

Zustand`tts.text` Unterstützt eine erweiterte Syntax, sodass Sprache/Engine und Lautstärke zusammen mit dem Text definiert werden können. Dies wird verwendet, um mehrsprachige Text-zu-Sprache-Engines zu aktivieren. Beispiel: Wenn der Adapter über eine Engine verfügt`Google-english` Mit der Formulierung ist dies möglich.`de:Sag es` um die Verwendung der Google-Deutsch-Sprachausgabe zu erzwingen.

Mit`ru;75;Погода хорошая` Wir können die Verwendung der russischen Sprache und einer Lautstärke von 75 % erzwingen.

Sie können die Lautstärke der Ankündigung in Prozent der aktuellen oder einer vorgegebenen Lautstärke (nicht der maximalen Lautstärke) angeben. Beispiel: Wenn der Befehl lautet`de;75;Gutes Wetter` und die "Ankündigungslautstärke" 50% beträgt, wird die Ankündigung mit einer Lautstärke von 38% von maximal 100% abgespielt.

Der Systembefehl zum Abspielen der MP3-Datei kann ebenfalls angegeben werden. Wenn Sie das Feld leer lassen, werden die Standardeinstellungen verwendet: Windows –`cmdmp3.exe` , OSX -`/usr/bin/afplay` , Linux -`mpg321` oder`omxplayer` (empfohlen).

Um omxplayer zu installieren, schreiben Sie`sudo apt-get install omxplayer` oder schreiben`sudo apt-get install mpg321` mpg321 installieren.

**Hinweis:** Die Auswahl der Standardankündigung ist erst nach dem Start der Instanz möglich.

Mit`sendTo` Sie können weitere verschiedene Parameter senden, wie zum Beispiel`sonosDevice` oder`browserInstance` :

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
- Schreiben Sie „true“ in den Zustand „tts.clearQueue“, um die Warteschlange zu leeren. Anschließend können Sie einen neuen Text schreiben.`tts.text` Alle in der Warteschlange befindlichen Texte werden jedoch verworfen.

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

- **freeTTS** – Stimme, Geschwindigkeit und Tonhöhe werden aus der Instanzkonfiguration übernommen.

Die Sprache ist Teil der Stimme, daher existiert nur ein Engine-Name. Die Stimme, z. B.`de-DE-KatjaNeural` Im Konfigurationsdialog wird diese Option ausgewählt, woraufhin die Liste aller verfügbaren Stimmen vom Dienst vorgelesen wird. Eine Anfrage ist auf 10.000 Zeichen begrenzt; längere Texte werden daher aufgeteilt und nacheinander vorgelesen.

#### Yandex

- **ru\_YA:Yandex** - Русский
- **ru\_YA\_CLOUD:Yandex Cloud** - Русский \[Die Yandex.Cloud-API generiert Dateien im OGG-Format. Um OGG-Dateien unter Linux abzuspielen, muss mplayer installiert und als Systemplayer ausgewählt sein.]

#### Amazon Polyphone via Cloud

- **ru-RU\_CLOUD\_Female** – Russisch – Tatjana
- **ru-RU\_CLOUD\_Male** – Russisch – Maxim
- **de-DE\_CLOUD\_Female** - Deutsch - Marlene
- **de-DE\_CLOUD\_Male** - Deutsch - Hans
- **de-DE\_CLOUD\_Female\_Vicki** - Deutsch - Vicki
- **de-DE\_CLOUD\_Male\_Daniel** - Deutsch - Daniel
- **de-AT\_CLOUD\_Female\_Hannah** - Österreich - Hannah
- **en-US\_CLOUD\_Female** - en-US - Female - Salli
- **en-US\_CLOUD\_Male** - en-US - Male - Joey
- **da-DK\_CLOUD\_Female** – da-DK – Weiblich – Naja
- **da-DK\_CLOUD\_Male** – da-DK – Männlich – Mads
- **en-AU\_CLOUD\_Female** – en-AU – Weiblich – Nicole
- **en-AU\_CLOUD\_Male** – en-AU – Männlich – Russell
- **en-GB\_CLOUD\_Female\_Amy** - en-GB - Weiblich - Amy
- **en-GB\_CLOUD\_Male** – en-GB – Männlich – Brian
- **en-GB\_CLOUD\_Female\_Emma** - en-GB - Weiblich - Emma
- **en-GB-WLS\_CLOUD\_Female** - en-GB-WLS - Weiblich - Gwyneth
- **en-GB-WLS\_CLOUD\_Male** - en-GB-WLS - Männlich - Geraint
- **cy-GB\_CLOUD\_Female** - cy-GB - Weiblich - Gwyneth
- **cy-GB\_CLOUD\_Male** - cy-GB - Male - Geraint
- **en-IN\_CLOUD\_Female** - en-IN - Female - Raveena
- **en-US\_CLOUD\_Male\_Chipmunk** - en-US - Male - Chipmunk
- **en-US\_CLOUD\_Male\_Eric** - en-US - Male - Eric
- **en-US\_CLOUD\_Female\_Ivy** - en-US - Weiblich - Ivy
- **en-US\_CLOUD\_Female\_Jennifer** - en-US - Weiblich - Jennifer
- **en-US\_CLOUD\_Male\_Justin** – en-US – Männlich – Justin
- **en-US\_CLOUD\_Female\_Kendra** - en-US - Weiblich - Kendra
- **en-US\_CLOUD\_Female\_Kimberly** - en-US - Weiblich - Kimberly
- **es-ES\_CLOUD\_Female** – es-ES – Weiblich – Conchita
- **es-ES\_CLOUD\_Male** – es-ES – Männlich – Enrique
- **es-US\_CLOUD\_Female** - es-US - Weiblich - Penelope
- **es-US\_CLOUD\_Male** - es-US - Male - Miguel
- **fr-CA\_CLOUD\_Female** - fr-CA - Female - Chantal
- **fr-FR\_CLOUD\_Female** - fr-FR - Female - Celine
- **fr-FR\_CLOUD\_Male** - fr-FR - Male - Mathieu
- **is-IS\_CLOUD\_Female** - is-IS - Female - Dora
- **is-IS\_CLOUD\_Male** - is-IS - Male - Karl
- **it-IT\_CLOUD\_Female** - it-IT - Female - Carla
- **it-IT\_CLOUD\_Male** - it-IT - Male - Giorgio
- **nb-NO\_CLOUD\_Female** - no-NO - Female - Liv
- **keine\_Wolke\_Weiblich** - nein-NEIN - Weiblich - Ida
- **nl-NL\_CLOUD\_Female** - nl-NL - Weiblich - Lotte
- **nl-NL\_CLOUD\_Male** - nl-NL - Male - Ruben
- **pl-PL\_CLOUD\_Female\_Agnieszka** - pl-PL - Weiblich - Agnieszka
- **pl-PL\_CLOUD\_Male\_Jacek** – pl-PL – Männlich – Jacek
- **pl-PL\_CLOUD\_Female\_Ewa** - pl-PL - Weiblich - Ewa
- **pl-PL\_CLOUD\_Male\_Jan** - pl-PL - Male - Jan
- **pl-PL\_CLOUD\_Female** - pl-PL - Weiblich - Maja
- **pt-BR\_CLOUD\_Female** - pt-BR - Weiblich - Vitoria
- **pt-BR\_CLOUD\_Female\_Camila** - pt-BR - Weiblich - Camila
- **pt-BR\_CLOUD\_Male** - pt-BR - Male - Ricardo
- **pt-PT\_CLOUD\_Male** - pt-PT - Male - Cristiano
- **pt-PT\_CLOUD\_Female** - pt-PT - Female - Ines
- **ro-RO\_CLOUD\_Female** - ro-RO - Weiblich - Carmen
- **sv-SE\_CLOUD\_Female** - sv-SE - Weiblich - Astrid
- **tr-TR\_CLOUD\_Female** - tr-TR - Weiblich - Filiz
- **pt-BR\_CLOUD\_Female\_Camila** - pt-BR - Weiblich - Camila

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

- **ru-RU\_AP\_Female** – Russisch – Tatjana
- **ru-RU\_AP\_Male** – Russisch – Maxim
- **de-DE\_AP\_Female** - Deutsch - Marlene
- **de-DE\_AP\_Female\_Vicki** - Deutsch - Vicki
- **de-DE\_AP\_Male** - Deutsch - Hans
- **en-US\_AP\_Female** - en-US - Female - Salli
- **en-US\_AP\_Male** - en-US - Männlich - Joey
- **da-DK\_AP\_Female** - da-DK - Weiblich - Naja
- **da-DK\_AP\_Male** – da-DK – Männlich – Mads
- **en-AU\_AP\_Female** - en-AU - Weiblich - Nicole
- **en-AU\_AP\_Male** – en-AU – Männlich – Russell
- **en-GB\_AP\_Female\_Amy** - en-GB - Weiblich - Amy
- **en-GB\_AP\_Male** – en-GB – Männlich – Brian
- **en-GB\_AP\_Female\_Emma** - en-GB - Weiblich - Emma
- **en-GB-WLS\_AP\_Female** - en-GB-WLS - Weiblich - Gwyneth
- **en-GB-WLS\_AP\_Male** - en-GB-WLS - Männlich - Geraint
- **cy-GB\_AP\_Female** - cy-GB - Weiblich - Gwyneth
- **cy-GB\_AP\_Male** - cy-GB - Male - Geraint
- **en-IN\_AP\_Female** - en-IN - Weiblich - Raveena
- **en-US\_AP\_Male\_Chipmunk** - en-US - Männlich - Streifenhörnchen
- **en-US\_AP\_Male\_Eric** - en-US - Male - Eric
- **en-US\_AP\_Female\_Ivy** - en-US - Weiblich - Ivy
- **en-US\_AP\_Female\_Jennifer** - en-US - Weiblich - Jennifer
- **en-US\_AP\_Male\_Justin** - en-US - Männlich - Justin
- **en-US\_AP\_Female\_Kendra** - en-US - Weiblich - Kendra
- **en-US\_AP\_Female\_Kimberly** - en-US - Weiblich - Kimberly
- **es-ES\_AP\_Female** - es-ES - Weiblich - Conchita
- **es-ES\_AP\_Male** – es-ES – Männlich – Enrique
- **es-US\_AP\_Female** - es-US - Weiblich - Penelope
- **es-US\_AP\_Male** – es-US – Männlich – Miguel
- **fr-CA\_AP\_Female** - fr-CA - Female - Chantal
- **fr-FR\_AP\_Female** - fr-FR - Weiblich - Celine
- **fr-FR\_AP\_Male** - fr-FR - Male - Mathieu
- **is-IS\_AP\_Female** - is-IS - Female - Dora
- **is-IS\_AP\_Male** - is-IS - Male - Karl
- **it-IT\_AP\_Female** - it-IT - Female - Carla
- **it-IT\_AP\_Male** - it-IT - Male - Giorgio
- **nb-NO\_AP\_Female** - nb-NO - Weiblich - Lebend
- **nl-NL\_AP\_Female** - nl-NL - Weiblich - Lotte
- **nl-NL\_AP\_Male** - nl-NL - Male - Ruben
- **pl-PL\_AP\_Female\_Agnieszka** - pl-PL - Weiblich - Agnieszka
- **pl-PL\_AP\_Male\_Jacek** – pl-PL – Männlich – Jacek
- **pl-PL\_AP\_Female\_Ewa** - pl-PL - Weiblich - Ewa
- **pl-PL\_AP\_Male\_Jan** - pl-PL - Male - Jan
- **pl-PL\_AP\_Female** - pl-PL - Weiblich - Maja
- **pt-BR\_AP\_Female** - pt-BR - Weiblich - Vitoria
- **pt-BR\_AP\_Male** - pt-BR - Male - Ricardo
- **pt-PT\_AP\_Male** - pt-PT - Male - Cristiano
- **pt-PT\_AP\_Female** - pt-PT - Female - Ines
- **ro-RO\_AP\_Female** - ro-RO - Weiblich - Carmen
- **sv-SE\_AP\_Female** - sv-SE - Weiblich - Astrid
- **tr-TR\_AP\_Female** - tr-TR - Weiblich - Filiz
- **ko-KR\_AP\_Female** - ko-KR - Weiblich - Seoyeon

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