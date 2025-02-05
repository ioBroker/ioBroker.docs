---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asterisk/README.md
title: Адаптер VoIP Asterisk ioBroker
hash: /epcTbsSNLXOiJlMxorB29LVQBYTZQcPGTFvmTa/gv0=
---
![Логотип](../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

![Статус сборки Travis CI](https://travis-ci.org/schmupu/ioBroker.asterisk.svg?branch=master)
![Статус сборки AppVeyor](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.asterisk?branch=master&svg=true)
![Количество установок](http://iobroker.live/badges/asterisk-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.asterisk.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.asterisk.svg)
![НПМ](https://nodei.co/npm/iobroker.asterisk.png?downloads=true)

# IoBroker Asterisk VoIP-адаптер
[Немецкое руководство / Deutsche Anleitung](README_DE.md)

Адаптер Asterisk преобразует текстовые сообщения в аудиофайлы, а затем звонит через Asterisk по VoIP на любой нужный вам номер телефона и воспроизводит аудиосообщение.

## Установка / Конфигурации
Asterisk должен подключаться для исходящих звонков к вашему провайдеру VoIP, например Telekom или Vodfone, или к вашему FritzBox! Пожалуйста, следуйте одному из этих руководств по установке.

### Пакеты Linux / ioBroker и asterisk, работающие на одном сервере с ffmpeg
```sh
sudo apt-get install ffmpeg
# if asterisk package is missing, follow the instructions "Install asterisk manual"
sudo apt-get install asterisk
```

### Пакеты Linux / ioBroker и asterisk, работающие на одном сервере с sox
Если у вас возникли проблемы с транскодированием с помощью ffmpeg, вы можете выбрать sox в качестве транскодера. Для этого вам необходимо установить следующие пакеты и выбрать sox в конфигурации адаптера.

```sh
sudo apt-get install lame
sudo apt-get install sox
sudo apt-get install libsox-fmt-mp3
# if asterisk package is missing, follow the instructions "Install asterisk manual"
sudo apt-get install asterisk
```

### Пакеты Linux / ioBroker и asterisk, работающие на разных серверах с ffmpeg
```sh
# ioBroker server
sudo apt-get install ffmpeg
sudo apt install openssh-client
```

```sh
# asterisk server
# if asterisk package is missing, follow the instructions "Install asterisk manual"
sudo apt-get install asterisk
sudo apt-get install openssh-server
```

### Пакеты Linux / ioBroker и asterisk, работающие на разных серверах с sox
Если у вас возникли проблемы с транскодированием с помощью ffmpeg, вы можете выбрать sox в качестве транскодера. Для этого вам необходимо установить следующие пакеты и выбрать sox в конфигурации адаптера.

```sh
sudo apt-get install lame
sudo apt-get install sox
sudo apt-get install libsox-fmt-mp3
```

```sh
# asterisk server
# if asterisk package is missing, follow the instructions "Install asterisk manual"
sudo apt-get install asterisk
sudo apt-get install openssh-server
```

### Установка asterix вручную
Если пакет apt asterisk отсутствует, вы можете установить asterisk вручную:

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

### Конфигурация звездочки
В следующих документах подробно описывается настройка Asterisk.

- Настройка [Asterisk через SIP с FritzBox](docs/SIP_FRITZBOX.md) (самый простой способ)
- Конфигурация [Asterisk через PJSIP с FriztBox](docs/PJSIP_FRITZBOX.md) (pjsip более современен, чем sip)
- Конфигурация [Asterisk через PJSIP с Telekom в качестве провайдера](docs/PJSIP_TELEKOM.md)
- Конфигурация [Asterisk через PJSIP с Sipgate в качестве провайдера](docs/PJSIP_SIPGATE.md)

### Конфигурация с использованием SSH
Если iobroker и asterisk установлены под разными пользователями, вам нужен на сервере asterisk пользователь с доступом с сервера iobroker для входа по ssh.
У пользователя должны быть права пользователя unix для записи файлов, которые может читать asterisk.
Вы создаете на сервере asterisk каталог с именем, которое вы настроили в конфигурации адаптера iobroker asterisk, под именем _'Путь для временных аудиофайлов'_. Путь должен быть доступен и разрешен для asterisk и ssh, поскольку iobroker отправляет сгенерированный аудиофайл (ваше текстовое сообщение) по scp на сервер asterisk и сохраняет его в 'Путь для временных аудиофайлов'.
После этого ioBroker отправит через AMI api сообщение asterisk для набора и воспроизведения сгенерированного аудиофайла, сохраненного по указанному пути.

![сш](../../../en/adapterref/iobroker.asterisk/docs/iobroker_ssh.png)

## Использование Asterisk
### Использование Asterisk с объектами/состояниями для исходящих звонков
Самый простой способ использовать asterisk — через страницу объектов ioBroker. Там заполните следующие значения в параметре dialout:

- вызов: нажмите кнопку, чтобы инициировать вызов
- callerid: номер телефона, который будет показан вызываемому абоненту
- dtmf: вызываемый абонент нажал цифры на клавиатуре
- telnr: номер, который нужно набрать
- текст: текст, который будет воспроизведен вызываемому абоненту
- язык: текст будет преобразован в аудио на этом языке

![iobroker_dialout](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialout.png)

### Использование Asterisk с объектами/состояниями для дозвона
Если вы настроили своего SIP-провайдера (например, Fritzbox, Sipgate, ...) и конфигурацию Asterisk для разрешения звонков по телефонной линии, вы можете установить следующий параметр

- callerid: номер телефона, с которого звонили asteriks
- dtmf: звонящие нажимали цифры на клавиатуре
- текст: текст, который будет воспроизведен вызывающему абоненту
- язык: текст будет преобразован в аудио на этом языке

![iobroker_dialin](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialin.png)

### Использование Asterisk с JavaScript или Blocky для исходящих звонков
Теперь вы можете использовать адаптер в своих javascript или блочных программах.

```sh
const number   = '040 666-7766';
const callerid = '040 123 999'; // optional, if not set anonymous call
const msg      = 'Hello, this textmessage will be converted to audio';

// call telephone nummber 040 666-7766 and play text message as audio
sendTo('asterisk.0', 'dial', { telnr: number, callerid: callerid, text:  msg},  (res) => {
      console.log(`Result: ${JSON.stringify(res)}`);
});

// call telephone nummber 040 666-7766 and play mp3 audio file
// mp3 file has to exist on asterix server
sendTo('asterisk.0', 'dial', { telnr: number, callerid: callerid, aufiofile: '/tmp/audio.mp3'},  (res) => {
      console.log(`Result: ${JSON.stringify(res)}`);
});

// call telephone nummber 040 666-7766 and play gsm audio file
// gsm file has to exist on asterix server
sendTo('asterisk.0', 'dial', { telnr: number, callerid: callerid, aufiofile: '/tmp/audio.gsm'},  (res) => {
      console.log(`Result: ${JSON.stringify(res)}`);
});

// create dial in message
sendTo('asterisk.0', 'dial', { text:  'Please enter PIN after hashtag.' },  (res) => {
      console.log(`Result: ${JSON.stringify(res)}`);
});

// Show entered DTMF code
on({ id: 'asterisk.0.dialin.dtmf'/*DTMF Code*/ },  (obj) => {
    const dtmf = obj.state.val;
    console.log(`DTMF: ${dtmf}`);
});

// Show entered DTMF code
on({ id: 'asterisk.0.dialout.dtmf'/*DTMF Code*/ },  (obj) => {
    const dtmf = obj.state.val;
    console.log(`DTMF: ${dtmf}`);
});

```

> В операторе набора номера sendTo можно использовать следующий параметр: > > - **language:** язык для функции преобразования текста в речь (tts). (допустимые значения: 'DE', 'EN', ... По умолчанию используется системный язык ioBroker) > - **repeat:** сколько раз будет повторяться звуковое сообщение (допустимые значения от 1 до n, по умолчанию 5) > - **priority:** если вы отправляете параллельно несколько операторов набора номера sendTo, сообщения с наименьшим приоритетом будут отправлены первыми (допустимые значения от 1 до n, по умолчанию 1) > - **text:** текстовое сообщение, которое будет отправлено как аудио > - **timeout:** время ожидания в миллисекундах для установления соединения (по умолчанию 60000 мс) > - **async:** позволяет генерировать несколько вызовов без ожидания ответа (допустимые значения: false/true, по умолчанию false) > - **audiofile:** если вы используете параметр text. Преобразованный текст в аудио будет сохранен в аудиофайле. Если аудиофайл существует, он будет перезаписан. Если вы не используете параметр text, будет воспроизведен аудиофайл.
> - **callerid:** Определяет идентификатор (номер телефона отправителя). Если callerid отсутствует, переданный номер телефона будет анонимным > - **telnr:** номер телефона для набора.

## Решение проблем
Если у вас возникли проблемы с asterisk, вы можете попытаться найти что-нибудь в файлах журнала в /var/log/asterisk. После запуска asterisk вы можете вызвать asterisk с помощью asterisk -rvvvvvv в командной оболочке для отладки. После запуска asterisk -rvvvvvv вы можете инициализировать вызов с помощью iobroker и посмотреть, что произойдет.

## Changelog
### 2.0.2 (2025-02-01)

- (Stübi) Add Create Directory
- (Stübi) Add translation for configuration
- (Stübi) Bugfixing

### 2.0.1 (2025-01-24)

- (Stübi) Fix error by using asterisk and iobroker on the same server
- (Stübi) Add action command for send messages
- (Stübi) Add dial in command for send messages
- (Stübi) Add create butteon for create dial in file

### 2.0.0 (2025-01-24)

- (Stübi) Redesign of Asterisk
- (Stübi) Switching from Javascript to Typescript
- (Stübi) Nodes 20 and 22 are now supported
- (Stübi) js controllers in versions 6 and 7 are supported
- (Stübi) Attention: Passwords must be re-entered from this version!
- (Stübi) Language object added
- (Stübi) Revision of the reconnect if Asterisk is restarted once
- (Stübi) Fixing errors from repository checker (Issue #51)
- (Stübi) Add documentation how to install asterisk manual (Issue #33)

### 1.0.6 ((2019-02-27)

- (Stübi) Update documentation and templates
- (Stübi) Asterisk adapter can create now asterisk configuration files. You have to rename and move them afterwards to the /etc/asterisk directory
- (Stübi) a new documentation for using Sipgate as provide.
- (Stübi) Now you can call internal fritzbox numbers. You must change your extensions.ael if you install the version 1.0.4! (replace **10 => { ... }** with **\_. => { ... }**)
- (Stübi) You can install asterisk on a different server and use scp to transfer audio files from ioBroker to asterisk.
- (Stübi) You can use the service PJSIP instead of SIP now.
- (Stübi) Support js-controller compact mode
- (Stübi) Calling without extension, if you do not use the fritzbox for example (leave sip.conf username in adapter config empty)
- (Stübi) Instead of ffmpeg you can use now sox too
- (Stübi) Update with languages
- (Stübi) Add Callerid to dialin states
- (Stübi) A lot of new features. Now you can call ioBroker / Asterisk by telephone number and enter a DTMF Code.
- (Stübi) You can enter a DTMF Code if you get called by ioBroker / Asterisk
- (Stübi) Bugfixing and password will be saved encrypted and text message size can be unlimited
- (Stübi) First Version

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