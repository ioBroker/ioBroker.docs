---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md
title: ioBroker Asterisk VoIP-Adapter
hash: e5Yw4Qe43PuyYK+Am0lb4DVwj6pTIo4tUhQ4esK/S2s=
---
![Logo](../../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

# ioBroker Asterisk VoIP-Adapter

## Installation / Grundeinstellungen

Sie müssen Asterisk für VoIP-Anrufe und ffmpeg zum Transkodieren von MP3-Audiodateien in GSM-Audiodateien auf Ihrer ioBroker-Hardware installieren. Zum Erstellen von Sprachnachrichten wird das Online-Tool zur Umwandlung von Text in Sprache von Google verwendet.

Sie können Asterisk und ffmpeg auf Linux- (Raspberry Pi), Windows- und Apple-Mac-Computern installieren. Wenn Sie Asterisk in einem Docker-Container im Bridge-Modus installieren möchten, müssen Sie die UDP-Ports 5038 und 5060 sowie die UDP-Ports 7078 bis 7097 freigeben.

Sie müssen Asterisk und ffmpeg auf derselben Hardware wie ioBroker installieren! Der Grund dafür ist, dass die Audiodateien lokal gespeichert und von ioBroker und Asterisk aus zugänglich sind.

Wenn Sie weiterhin separate Server für ioBroker und Asterisk verwenden möchten, können Sie die SSH-Unterstützung nutzen. Sie müssen ffmpeg oder sox weiterhin auf dem ioBroker-Server installieren.

Wenn Sie Linux (z. B. Raspberry Pi) verwenden und ioBroker und Asterisk auf demselben Server laufen, müssen Sie ffmpeg und Asterisk wie folgt installieren:

## Installation und Konfiguration von Asterisk mit der Fritzbox über SIP

Zuerst müssen Sie die Fritzbox-Konfiguration öffnen und ein neues LAN/WLAN-Telefongerät hinzufügen. In meinem Beispiel hat die Fritzbox die IP-Adresse 192.168.1.1, der Benutzername lautet _12345689_ und das Passwort _„meinpasswort“_ . Die Telefonnummer für ausgehende und eingehende Anrufe ist _03047114711_ .

![Fritzbox1](../../../../en/adapterref/iobroker.asterisk/docs/fritzbox1.png)

Wenn Sie nicht möchten, dass ioBroker ans Telefon geht, lassen Sie bitte „nur auf folgende Rufnummern reagiert“ leer. Wichtig: Der Benutzername der Fritzbox darf nur aus Zahlen bestehen. Beispiel: 12345689, 00004711 oder 47110815 !!

![Fritzbox2](../../../../en/adapterref/iobroker.asterisk/docs/fritzbox2.png)

Zuerst müssen Sie die Verbindung von ioBroker zum Asterisk-Server im Tab „Asterisk-Einstellungen“ konfigurieren. Diese Konfiguration ist unabhängig davon, ob Sie Ihre Fritzbox, Telekom, Sipgate oder einen anderen Anbieter als SIP-Provider verwenden. Der Benutzername lautet üblicherweise **„manager“** . Sie können ein beliebiges Passwort wählen. Benutzername und Passwort „manager“ in ioBroker müssen jedoch mit den späteren Einstellungen in der Datei „manager.conf“ übereinstimmen.

![iobroker\_main](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_main.png)

Wenn Sie die Konfiguration der „Asterisk-Einstellungen“ abgeschlossen haben, wechseln Sie zum Tab „SIP-Einstellungen“. Wählen Sie **SIP** als Dienst aus. Geben Sie nun Folgendes ein:

1. IP-Adresse/Hostname des SIP-Servers: Ihre IP-Adresse Ihrer Fritzbox (in unserem Beispiel 192.18.1.1)
2. Benutzername des SIP-Servers: Geben Sie Ihren Benutzernamen in die Anmeldedaten Ihres Fritzbox-Telefoniegeräts ein (in unserem Beispiel 123456789).
3. Passwort des SIP-Servers: Geben Sie Ihr Passwort in die Anmeldedaten Ihres Fritzbox-Telefoniegeräts ein

![Iobroker\_fritzbox\_sip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_fritzbox_sip.png)

Lassen Sie den Reiter „SSH“ leer, wenn Asterisk und iobroker auf demselben Rechner (Server) laufen.

### Automatische Erstellung von Asterisk-Konfigurationsdateien

Wechseln Sie nun zum Tab „Asterisk-Einstellungen“ und aktivieren Sie das Kontrollkästchen „Asterisk-Konfigurationsdateien (einmalig) erstellen“. Speichern Sie die Einstellungen und starten Sie die Asterisk-Instanz. Kopieren Sie die folgenden Dateien aus Ihrem /tmp/-Verzeichnis in das Verzeichnis /etc/asterisk/. Prüfen Sie bitte vor dem Kopieren nach /etc/asterisk/, welche Benutzerrechte die Dateien haben. Gegebenenfalls müssen Sie die Benutzerrechte anschließend anpassen.

```sh
sudo mv /tmp/extensions.ael /etc/asterisk/extensions.ael
sudo mv /tmp/manager.conf /etc/asterisk/manager.conf
sudo mv /tmp/sip_fritzbox.conf /etc/asterisk/sip.conf
sudo mv /tmp/rtp.conf /etc/asterisk/rtp.conf

# Example if userrights of files have owner asterisk and group asterisk
sudo chown asterisk:asterisk  /etc/asterisk/extensions.ael
sudo chown asterisk:asterisk /etc/asterisk/manager.conf
sudo chown asterisk:asterisk /etc/asterisk/sip.conf
sudo chown asterisk:asterisk /etc/asterisk/rtp.conf
```

Starten Sie Asterisk nun neu. Führen Sie beispielsweise \`/etc/init.d/asterisk restart\` aus und starten Sie die Asterisk iobroker-Instanz neu. Alles sollte nun funktionieren und die Konfiguration ist abgeschlossen. Bitte löschen Sie alle Konfigurationsdateien im Verzeichnis \`/tmp/\`, da Ihr Passwort in diesen Dateien gespeichert ist.

### Manuelle Erstellung von Asterisk-Konfigurationsdateien

Anstatt die Konfigurationsdateien automatisch erstellen zu lassen, können Sie dies manuell tun. Bearbeiten Sie dazu die folgenden Asterisk-Konfigurationsdateien. Löschen Sie die alten Einträge in diesen vier Dateien! Ändern Sie die Benutzerberechtigungen und -rechte der Dateien nicht.

**/etc/asterisk/manager.conf**

```sh
[general]						; Do not change
enabled = yes						; Do not change
port = 5038						; Do not change
bindaddr = 0.0.0.0					; Do not change

[manager]						; Do not change
secret = managerpassword				; Change Manager password for ioBroker asterisk adapter
permit = 0.0.0.0/0.0.0.0                                ; Change to your subnet and netmask if you like
read = all						; Do not change
write = all						; Do not change
```

Sie müssen in der _Datei /etc/asterisk/manager.conf_ die Werte _secret_ , _permit_ (Ihr Subnetz + Subnetzmaske) ändern.

**/etc/asterisk/rtp.conf**

```sh
[general]
rtpstart=30000
rtpend=30100
```

Sie müssen in der Datei _/etc/asterisk/rtp.conf_ nichts ändern. Kopieren Sie lediglich diese Datei.

**/etc/asterisk/sip.conf**

```sh
[general]				; Do not change
port = 5060				; Do not change
bindaddr = 0.0.0.0			; Do not change
context = default			; Do not change
subscribecontext = default		; Do not change


register => 12345689:mypassword@192.168.1.1/1000 ; Username, Password and IP address of Fritzbox WLAN/LAN telephone

[123456789]               		; Change to username of Fritzbox WLAN/LAN telephone
type = friend			    	; Do not change
username = 123456789      		; Change to username of Fritzbox WLAN/LAN telephone
host = 192.168.1.1        		; Change hostname / IP address of Fritzbox
secret = mypassword       		; Change password of Fritzbox WLAN/LAN telephone
fromdomain = 192.168.1.1  		; Change hostname / IP address of Fritzbox
fromuser = 123456789   	  		; Change username of Fritzbox WLAN/LAN telephone
```

Sie müssen in der Datei _\`/etc/asterisk/sip.conf\`_ die Werte _für \`host\`_ (IP-Adresse der Fritzbox oder des VoIP-Anbieters), \` _secret\`_ , _\`username\`_ und _\`fromuser\`_ durch die in der Fritzbox oder beim VoIP-Anbieter konfigurierten Benutzernamen ersetzen. Ändern Sie die _\`callerid\`_ in Ihre in der Fritzbox konfigurierte Telefonnummer. Wichtig: Der Fritzbox-Benutzername darf nur aus Ziffern bestehen. Beispiele: 12345689, 00004711 oder 47110815.

**/etc/asterisk/extensions.ael**

```sh
context default {
  	1000 => {
        Goto(ael-antwort,s,1);
  	}
}

context ael-ansage {
	_. => {
        Answer();
        Wait(1);
		Read(dtmf,${file}&beep,0,s,${repeat},1);
		if ("${dtmf}" != "") {
			SayDigits(${dtmf});
		}
		Hangup();
    }

	h =>  {
    	if ("${del}" = "delete") {
				NoOp(/bin/rm ${file}.*);
                System(/bin/rm ${file}.*);
		}
	}
}

context ael-antwort {
	s  => {
		Answer();
		Wait(1);
		Set(repeat=5);
		Read(dtmf,/tmp/asterisk_dtmf&beep,0,s,${repeat},1);
		if ("${dtmf}" != "") {
			SayDigits(${dtmf});
		}
    	Hangup();
	}

	_.  => {
        Goto(ael-antwort,s,1);
  	}
}
```

Kopieren Sie den obigen Inhalt in die _Datei /etc/asterisk/extensions.ael_ und ändern Sie nichts! Wenn Sie hier etwas ändern, funktioniert Ihr ioBroker-Wählbefehl nicht mehr.

Um den Asterisk-Server zu starten, _geben Sie \`/etc/init.d/asterisk start\` ein._ Anschließend müssen Sie ioBroker mit dem Asterisk-Server verbinden. Falls ioBroker und der Asterisk-Server die IP-Adresse 192.168.1.2 verwenden, müssen Sie diese IP-Adresse, den Port, den Benutzernamen und das Passwort in der _Datei \`/etc/asterisk/_ manager.conf\` sowie den Benutzernamen Ihrer \`sip.conf\` (z. B. 123456789) konfigurieren. Geben Sie außerdem einen Pfad für temporäre Audiodateien an. Dieser Pfad muss für Asterisk und ioBroker zugänglich und autorisiert sein.