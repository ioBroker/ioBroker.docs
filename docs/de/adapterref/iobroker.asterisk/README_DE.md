---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.asterisk/README_DE.md
title: ioBroker Asterisk VoIP-Adapter
hash: +Y8+1w5ep8hBY84K6CJaOkIa9/deivZFQvxBgBxAgfo=
---
![Logo](../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

![Travis CI Build-Status](https://travis-ci.org/schmupu/ioBroker.asterisk.svg?branch=master)
![AppVeyor Build-Status](https://ci.appveyor.com/api/projects/status/github/schmupu/ioBroker.asterisk?branch=master&svg=true)
![NPM-Version](http://img.shields.io/npm/v/iobroker.asterisk.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.asterisk.svg)
![NPM](https://nodei.co/npm/iobroker.asterisk.png?downloads=true)

# ioBroker Asterisk VoIP-Adapter

[Englisches Handbuch / Englische Anleitung](/#/adapters/asterisk)

Der Asterisk Adapter wandelt Textnachrichten in Sprachnachrichten um und ruft dann über Asterisk per VoIP eine beliebige Telefonnummer an und spielt die Sprachnachricht vor.

## Installation / Konfiguration

Asterisk muss sich für längere Gespräche mit Ihrem VoIP-Provider wie mit der Telekom oder Vodafone oder mit Ihrer FritzBox verbinden! Bitte folgen Sie einer dieser Installationsanleitungen.

### Linux-Pakete / ioBroker & Asterisk laufen auf dem gleichen Server mit ffmpeg

```sh
sudo apt-get install ffmpeg
# Falls das asterisk Paket fehlt, gehe wie unter "Maneulle Installation von asterisk" vor
sudo apt-get install asterisk
```

### Linux Pakete / ioBroker & Asterisk laufen auf dem gleichen Server mit sox

Falls Sie Probleme beim Transkodieren mit ffmpeg haben, können Sie sox als Transcoder verwenden. Dazu müssen Sie die folgenden Pakete installieren und sox in der Adapterkonfiguration auswählen.

```sh
sudo apt-get install lame
sudo apt-get install sox
sudo apt-get install libsox-fmt-mp3
# Falls das asterisk Paket fehlt, gehe wie unter "Maneulle Installation von asterisk"
sudo apt-get install asterisk
```

### Linux-Pakete / ioBroker & Asterisk laufen auf verschiedenen Servern mit ffmpeg

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

### Linux Pakete / ioBroker & Asterisk laufen auf verschiedenen Servern mit sox

Falls Sie Probleme beim Transkodieren mit ffmpeg haben, können Sie sox als Transcoder verwenden. Dazu müssen Sie die folgenden Pakete installieren und sox in der Adapterkonfiguration auswählen.

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

### Manuelle Installation von asterisk

Falls das Asterisk-Paket fehlt, gehe wie folgt vor:

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

### Konfiguration von Asterisk

Hier findest Du eine Anleitung, wie Du den Asterisk Adapter mit der Fritzbox, mit der Telekom oder mit Sipgate nutzen kannst.

- Konfiguration [Asterisk mit SIP über die FritzBox](/#/docs/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md) (der einfachste Weg)
- Konfiguration [Asterisk mit PJSIP über die FriztBox](/#/docs/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md) (pjsip ist moderner als pjsip, aber komplizierter)
- Konfiguration [Asterisk mit PJSIP über die Telekom als SIP-Provider](/#/docs/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md)
- Konfiguration [Asterisk mit PJSIP über Sipgate als SIP-Provider](/#/docs/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md)

### Konfiguration von Asterisk mit SSH

Nun musst Du auf dem Asterisk Server einen Benutzer einrichten, der über SSH erreichbar ist und Asterisk Benutzerberechtigungen besitzt. Damit ist sichergestellt, dass die kopierten Audiodateien per SSH von ioBroker für Asterik lesbar sind. Lege nun ein Verzeichnis auf dem Asterisk Server mit dem eben angelegten Benutzer an. Das Verzeichnis trägt Sie in der ioBroker-Konfiguration im Feld _„Pfad für temporäre Audiodateien“_ ein. Ist das geschehen, muss die Instanz des Adapters neu gestartet werden. Jetzt werden Audiodateien in ioBroker erstellt und per scp an den Asterisk Server kopiert.

![ssh](../../../en/adapterref/iobroker.asterisk/docs/iobroker_ssh.png)

## Nutzung von Asterisk

### Nutzung von Asterisk mit Objekten / Status für eingeführte Annrufe

Die einfachste Möglichkeit, Asterisk zu verwenden, ist es, die Seite mit den ioBroker-Objekten aufzurufen. Fülle dort die folgenden Felder unter dialout aus:

- Anruf: Anruf durchführen
- Anrufer-ID: Telefonnummer des Absenders. Wird dem angerufenen angezeigt
- dtmf: Nummern die der Anrufer auf seinem Telefon gedrückt hat
- Telnr: Nummer des anzurufenden
- Text: Text dem der Anrufer vorgespielt wird
- Sprache: Der Text wird in dieser Sprache als Audio umgewandelt

![iobroker\_dialout](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialout.png)

### Nutzung von Asteriks mit Objekten / Status für eingehende Anrufe

Wenn Sie den SIP-Provider (zum Beispiel Fritzbox, Sipgate, ...) und die Asterisk-Konfiguration so konfiguriert haben, dass Sie das eingehende Anrufe zulässt, können Sie folgende Einstellungen bei der Einwahl vornehmen

- Anrufer-ID: Telefnommer von dem Anrufer
- dtmf: Nummern die der Anrufer auf seinem Telefon gedrückt hat
- Text: Text dem der Anrufer vorgespielt wird
- Sprache: Der Text wird in dieser Sprache als Audio umgewandelt

![iobroker\_dialin](../../../en/adapterref/iobroker.asterisk/docs/iobroker_dialin.png)

### Nutzung von Asterisk mit Javascript oder Blocky um Anrufe zu tätigen

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

> In der Anweisung sendTo dial können Sie folgende Parameter verwendet werden:
>
> - **Sprache:** Sprache für die Umwandung der Textnachricht in eine Sprachnachricht (zulässige Werte: 'DE', 'EN', ... Der Standardwert ist die ioBroker Systemsprache)
> - **wiederholen:** wie oft soll die Audio-Nachricht wiederholt werden (zulässige Werte 1 bis n, Standard 5)
> - **Priorität:** Wenn du parallel viele sendTo-Dial-Anweisungen sendest, werden die Nachrichten mit der höchsten Priorität (1) zuerst gesendet (zulässige Werte 1 bis n, Standard 1).
> - **text:** Textnachricht, die als Sprachnachricht gesendet werden soll
> - **Timeout:** Timeout in Millisekunden, bis die Verbindung hergestellt wird (Standardeinstellung 60000 ms)
> - **async:** Ermöglicht das auführen von mehreren Aufrufen ohne auf eine Antwort zu warten (zulässige Werte: false / true Standardwert false). Bei Async false werden die Anrufe hintereinander gekauft.
> - **audiofile:** Es wird das Audiofile abgespielt. Das muss im GSM- oder MP3-Format vorliegen. **Parametertext** muss leer bleiben. Die Audiodatei muss auf dem Asterisk-Server liegen.
> - **Anrufer-ID:** Telefonnummer des Absenders.
> - **Telnr:** Anzurufende Telefonnummer.

## Problembehebung

Wenn Sie Probleme haben, schauen Sie in die Protokolldateien unter /var/log /asterisk auf dem Asterisk-Server. Wenn asterisk läuft, kannst Du auch **asterisk -rvvvvvv** eingeben. Du siehst dann war Asterisk tut. Auch kann man den Loglevel in ioBroker für Asterisk von Info auf Debug setzen. Damit erhält man allerhand mehr Informationen.

## Änderungen

[Änderungsprotokoll (Englisch)](/#/adapters/asterisk#changelog)

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