---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asterisk/README_DE.md
title: ioBroker Asterisk VoIP Adapter
hash: +Y8+1w5ep8hBY84K6CJaOkIa9/deivZFQvxBgBxAgfo=
---
![Логотип](../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

![Статус сборки Travis CI](https://travis-ci.org/schmupu/ioBroker.asterisk.svg?branch=master)
![Статус сборки AppVeyor](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.asterisk?branch=master&svg=true)
![Версия NPM](http://img.shields.io/npm/v/iobroker.asterisk.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.asterisk.svg)
![НПМ](https://nodei.co/npm/iobroker.asterisk.png?downloads=true)

# ioBroker Asterisk VoIP Adapter

[Руководство на английском языке / Englische Anleitung](/#/adapters/asterisk)

Адаптер Asterisk позволяет использовать текстовые сообщения в Sprachnachrichten um und ruft Dann über Asterisk для VoIP, чтобы вы могли использовать свой надежный телефонный номер и использовать Sprachnachricht vor.

## Монтаж / Конфигурация

Asterisk должна быть полезна для вашего VoIP-провайдера с Telekom или Vodafone или с вашим FritzBox verbinden! Bitte folge einer dieser Installationsanleitungen.

### Linux Pakete / ioBroker и Asterisk доступны на сервере с ffmpeg

```sh
sudo apt-get install ffmpeg
# Falls das asterisk Paket fehlt, gehe wie unter "Maneulle Installation von asterisk" vor
sudo apt-get install asterisk
```

### Linux Pakete / ioBroker и Asterisk laufen auf dem gleichem Server с sox

Если у вас возникли проблемы с транскодированием с помощью ffmpeg, вы можете выбрать sox в качестве транскодера. Для этого необходимо установить следующие пакеты и выбрать sox в конфигурации адаптера.

```sh
sudo apt-get install lame
sudo apt-get install sox
sudo apt-get install libsox-fmt-mp3
# Falls das asterisk Paket fehlt, gehe wie unter "Maneulle Installation von asterisk"
sudo apt-get install asterisk
```

### Linux Pakete / ioBroker и Asterisk доступны на различных серверах с ffmpeg

```sh
# iobroker server
sudo apt-get install ffmpeg
sudo apt install openssh-client
```

```sh
# asterisk server
# Falls das asterisk Paket fehlt, gehe wie unter "Maneulle Installation von asterisk" vor
sudo apt-get install asterisk
sudo apt-get install openssh-server
```

### Linux Pakete / ioBroker и Asterisk доступны на различных серверах с sox

Если у вас возникли проблемы с транскодированием с помощью ffmpeg, вы можете выбрать sox в качестве транскодера. Для этого необходимо установить следующие пакеты и выбрать sox в конфигурации адаптера.

```sh
# iobroker server
sudo apt-get install lame
sudo apt-get install sox
sudo apt-get install libsox-fmt-mp3
sudo apt-get install openssh-server
```

```sh
# asterisk server
# Falls das asterisk Paket fehlt, gehe wie unter "Maneulle Installation von asterisk" vor
sudo apt-get install asterisk
sudo apt-get install openssh-server
```

### Манёвр установки asterisk

Падает звездочка в пакете, вот что значит:

```sh
sudo apt install git vim curl wget libnewt-dev libssl-dev libncurses5-dev subversion libsqlite3-dev build-essential libjansson-dev libxml2-dev uuid-dev

cd /usr/src/
sudo wget https://downloads.asterisk.org/pub/telephony/asterisk/old-releases/asterisk-16.30.1.tar.gz
sudo tar xvf asterisk-16*.tar.gz
cd asterisk-16*/
sudo contrib/scripts/get_mp3_source.sh
sudo contrib/scripts/install_prereq install
sudo ./configure
sudo make menuselect

# Choose following packages in the menu:
## Add-ons: chan_ooh323 & format_mp3
## Core Sound Packages: Audio packets CORE-SOUNDS-EN-*
## Music On Hold: MOH-OPSOUND-WAV bis MOH-G729
## Extra Sound: EXTRA-SOUNDS-EN-WAV bis EXTRA-SOUNDS-EN-G729
## Applications: app_macro
## Exit with "Save&Exit".

sudo make
sudo make install
sudo make progdocs # (optional documentation)
sudo make samples
sudo make config
sudo ldconfig

sudo groupadd asterisk
sudo useradd -r -d /var/lib/asterisk -g asterisk asterisk
sudo usermod -aG audio,dialout asterisk
sudo chown -R asterisk:asterisk /etc/asterisk
sudo chown -R asterisk:asterisk /var/{lib,log,spool}/asterisk
sudo chown -R asterisk:asterisk /usr/lib/asterisk

# asterisk as default user for asterisk
sudo nano /etc/default/asterisk
AST_USER="asterisk"
AST_GROUP="asterisk"

# Insert/ replae follwoing in the config file /etc/asterisk/asterisk.conf
sudo nano /etc/asterisk/asterisk.conf
runuser = asterisk ; The user to run as.
rungroup = asterisk ; The group to run as

sudo ufw allow proto tcp from any to any port 5060,5061 # (optional open Firewall, if activ)

sudo systemctl restart asterisk
sudo systemctl enable asterisk

# Check state of asterisk
sudo systemctl status asterisk
sudo asterisk -rvv
```

### Настройка звездочки

Здесь вы найдете лучший вариант использования, например, адаптер Asterisk с Fritzbox, с Telekom или с Sipgate, который можно использовать.

- Конфигурация [Asterisk с SIP и FritzBox](/#/docs/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md) (на einfachste Weg)
- Конфигурация [Asterisk с PJSIP и FriztBox](/#/docs/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md) (pjsip — современный, как pjsip, более сложный)
- Конфигурация [Asterisk с PJSIP и Telekom как SIP-провайдер](/#/docs/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md)
- Конфигурация [Asterisk с PJSIP и Sipgate как SIP-провайдер](/#/docs/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md)

### Конфигурация Asterisk с SSH

Если на сервере Asterisk вы должны быть уверены в том, что у вас есть SSH-бар, и Asterisk Benutzerberechtigungen besitzt. Это важный момент, когда вы копируете аудиоданные для SSH от ioBroker для Asterik Lesbar Sind. Lege nun eine ein Verzeichnis auf dem Asterisk Server mit dem eben angelegten Benutzer an. Das Verzeichnis trägst Du in der ioBroker Configuration в поле _«Путь к временным аудиофайлам»_ . Ist das heschehen muss die Instant des Adapters neu gestartet werden. Используйте аудиофайлы в ioBroker, а также для scp и копии сервера Asterisk.

![ssh](../../../en/adapterref/iobroker.asterisk/docs/iobroker_ssh.png)

## Nutzung von Asterisk

### Nutzung von Asterisk mit Objketen / Status für ausgehende Annrufe

Die einfachste Möglichkeit Asterisk zu verwenden ist es die Seite mit den ioBroker Objekten aufzurufen. Чтобы получить доступ к следующему номеру телефона:

- call: Anruf tätigen
- callerid: Absender Telefonnummer. Wird dem angerufenem angezeigt
- dtmf: Numbern die der Anrufer auf seinem Telefon gedrückt шляпа
- телнр: Номер анзуфруфендема
- текст: Текст dem der Anrufer vorgespielt wird
- язык: der Text wird in dieser Sprache als Audio umgewandelt

![iobroker\_dialout](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialout.png)

### Nutzung von Asteriks mit Objekten / Status für eingehende Anrufe

Когда вы используете SIP-провайдер (например, Fritzbox, Sipgate, ...) и конфигурацию Asterisk, настроенную таким образом, чтобы она была выбрана отдельно, вы можете выполнить следующие действия при наборе номера.

- Callerid: Telefnommer von dem Anrufer
- dtmf: Numbern die der Anrufer auf seinem Telefon gedrückt Hat
- текст: Текст dem der Anrufer vorgespielt wird
- язык: der Text wird in dieser Sprache als Audio umgewandelt

![iobroker\_dialin](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialin.png)

### Nutzung von Asterisk с javascript или блочным интерфейсом для просмотра

Beispielprogramm um jemanden anzurufen und eine Nachricht vorzuspielen

```sh
var number   = "040 666-7766";
var callerid = '040 123 999'; // Optional
var msg      = "Hello, this textmessage will be converted to audio";

// rufe Telefonnumer 040 666-7766 and und spiele Textnachricht als Sprachnachricht ab
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, text:  msg},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// rufe Telefonnummer 040 666-7766 an und spiele Audiodatei im MP3 Format ab
// MP3 Datei muss auf dem Asterisk Server existieren
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, audiofile: '/tmp/audio.mp3'},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// rufe Telefonnummer 040 666-7766 an und spiele Audiodatei im GSM Format ab
// GSM Datei muss auf dem Asterisk Server existieren
sendTo('asterisk.0', "dial", { telnr: number, callerid: callerid, audiofile: '/tmp/audio.gsm'},  (res) => {
      console.log('Result: ' + JSON.stringify(res));
});

// Zeige bei eingehendem Anruf DTMF Nachricht an
on({ id: "asterisk.0.dialin.dtmf"/*DTMF Code*/ },  (obj) => {
    let dtmf = obj.state.val;
    console.log("DTMF: " + dtmf);
});

// Zeige bei ausgehendem Anruf DTMF Nachricht an
on({ id: "asterisk.0.dialout.dtmf"/*DTMF Code*/ },  (obj) => {
    let dtmf = obj.state.val;
    console.log("DTMF: " + dtmf);
});

```

> В ответ на команду sendTo наберите следующие параметры:
>
> - **язык:** Sprache für die Umwandung der Textnachricht in eine Sprachnachricht (zulässige Werte: 'DE', 'EN', ... Der Standardwert ist die ioBroker Systemsprache)
> - **повтор:** wie часто soll die Audio-Nachricht wiederholt werden (zulässige Werte 1 bis n, Standard 5)
> - **приоритет:** при параллельном вызове sendTo-Dial-Anweisungen sendest, werden die Nachrichten mit der höchsten Priorität (1) будет отправлен (zulässige Werte 1 bis n, Standard 1).
> - **текст:** Textnachricht, die als Sprachnachricht gesendet werden soll
> - **timeout:** Тайм-аут в миллисекундах, bis die Verbindung Hergestellt Wird (Standardeinstellung 60000 мс)
> - **async:** Ermöglicht das auführen von mehreren Aufrufe ohne auf eine Antwort zu warten (zulässige Werte: false/true Standardwert false). Если Async ложен, вы можете получить дополнительную информацию.
> - **аудиофайл:** Es wird das Audiofile abgespielt. Вы можете использовать GSM или любой другой формат MP3. **Текст** параметра должен быть открыт. Аудиодатеи должны быть на сервере Asterisk.
> - **callerid:** Absender Telefonnummer.
> - **тел.:** Anzurufende Telefonunumer.

## Проблемабихебунг

Если у вас возникла проблема, вы должны указать протокол в /var/log/asterisk на сервере Asterisk. Если звездочка открыта, вы можете выбрать **другую звездочку -rvvvvvv** eingeben. Du siehst dann был здесь Asterisk. Вы можете использовать уровень журнала в ioBroker для Asterisk от Info в настройках отладки. Дамит Эрхалт может предоставить дополнительную информацию.

## Änderungen

[Список изменений (английский)](/#/adapters/asterisk#changelog)

## License

The MIT License (MIT)

Copyright (c) 2025 Thorsten Stueben <thorsten@stueben.de> / <https://github.com/schmupu>

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