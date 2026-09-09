---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md
title: ioBroker Asterisk VoIP-Adapter
hash: S/jGxxFVacElxaw4uT/qHX6Be7pc6GPh7raYyaJ9Puo=
---
![Logo](../../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

# ioBroker Asterisk VoIP-Adapter

## Grundeinstellungen

Du musst für Asterisk das Paket ffmpeg oder sox installieren, um MP3-Audiodateien in GSM-Audiodateien umzuwandeln.

Du kannst Asterisk unter Linux (Raspberry), Windows und Apple Macs Computer installieren. Wenn Du Asterisk in einem Docker-Container im Bridge-Modus installieren möchtest, musst Du die UDP-Ports 5038,5060 und die UDP-Ports 7078 bis 7097 im Container exponieren.

Asterisk muss auf dem gleichen Server wie ioBroker installiert werden, da auf die Sprachnachrichten (Audiodateien) von ioBroker sowie Asterisk zugegriffen wird.

Sollten ioBroker und Asterisk auf getrennten Servern laufen, kannst Du ssh dafür nutzen. Hier wird weiterhin ffmpeg oder sox auf dem ioBroker Server benötigt. Ein ssh-Client muss auf dem ioBroker-Server und ein ssh-Server auf dem Asterisk-Server installiert sein. Die Trennung von ioBroker und Asterisk sollte nur vorgenommen werden, wenn man gute Linux-Kenntnisse hat.

Unter Linux (zB Raspberry) installiere folgende Pakete:

## Installation und Konfiguration

Zunächst müssen Sie in der Fritzbox ein neues LAN/WLAN-Telefongerät hinzufügen. In meinem Beispiel hat die FritzBox die IP-Adresse 192.168.1.1, der Benutzername und das Kennwort des LAN / WLAN Telefongeräts lauten _12345689_ und _myPasswort_ . Die Telefonnummer für abgehende und ankommende Anrufe ist \_ 03047114711 \_.

![Fritzbox1](../../../../en/adapterref/iobroker.asterisk/docs/fritzbox1.png)

Wenn Sie nicht möchten, dass der ioBroker auf eingehende Anrufe antwortet, lassen Sie einfach „nur auf folgende Rufnummern reagieren“ leer. Wichtig ist, dass der Benutzername des Fritzbox LAN / WLAN Telefongeräts nur aus Zahlen besteht. Beispiel: 12345689, 00004711 oder 47110815!

![Fritzbox2](../../../../en/adapterref/iobroker.asterisk/docs/fritzbox2.png)

Zuerst müssen Sie die Verbindung zwischen ioBroker und Asterisk in der Registerkarte „Asterisk Einstellungen“ konfigurieren. Normalerweise lautet der Benutzername **manager** . Du kannst ein beliebiges Passwort auswählen. Der Benutzername und das Passwort müssen jedoch später mit den Einträgen in der manager.conf identisch sein. Diese Konfiguration ist unabhängig vom SIP-Provider wie zB Fritzbox, Telekom oder Sipgate.

![iobroker\_main](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_main.png)

Wenn Sie mit den „Asterisk Einstellungen“ fertig sind, wechseln Sie auf die Registerkarte „SIP Einstellungen“. Wählen Sie als Service **pjsip** aus. Gebe nun folgendes ein:

1. IP/Hostname des SIP-Servers: Die IP-Adresse Deiner Fritzbox (in unserem Beispiel 192.18.1.1)
2. Benutzername des SIP Servers: Hier trägst du den Benutzernamen der auf dem Reiter Anmeldedaten Deines Fritzbox Telefoniegeräts steht ein (in unserem Beispiel 123456789)
3. Passwort des SIP-Servers: Hier trägst du das Passwort, welches auf dem Reiter Anmeldedaten Deines Fritzbox Telefoniegeräts steht ein

![iobroker\_fritzbox\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_fritzbox_pjsip.png)

Die Registerkarte „SSH“ lässt Sie leer. Diese ist nur auszufüllen, wenn Asterisk nicht auf dem gleichen Server wie ioBroker läuft.

### Automatische Erstellung der Asterisk-Konfiguration

Gehen Sie auf den Reiter „Asterisk-Einstellungen“ und aktivieren Sie das Kontrollkästchen „Anlegen der Asterisk-Konfigurationsdateien (einmalig)“. Anschließend auf „Speichern und Schließen“ drücken. Nun befinden sich die Konfigurationsdateien im /tmp/ Verzeichnis. Kopieren Sie diese wie unten beschrieben im Verzeichnis /etc/asterisk. Die Benutzerberechtigungen der Dateien im /etc/asterisk Verzeichnis müssen unverändert bleiben. Möglicherweise müssen die Berechtigungen nach dem Kopieren angepasst werden.

```sh
sudo mv /tmp/extensions.ael /etc/asterisk/extensions.ael
sudo mv /tmp/manager.conf /etc/asterisk/manager.conf
sudo mv /tmp/pjsip_fritzbox.conf /etc/asterisk/pjsip.conf
sudo mv /tmp/rtp.conf /etc/asterisk/rtp.conf

# Example if userrights of files have owner asterisk and group asterisk
sudo chown asterisk:asterisk  /etc/asterisk/extensions.ael
sudo chown asterisk:asterisk /etc/asterisk/manager.conf
sudo chown asterisk:asterisk /etc/asterisk/pjsip.conf
sudo chown asterisk:asterisk /etc/asterisk/rtp.conf

# Asterisk restart
sudo /etc/init.d/asterisk restart

```

Ist der Kopiervorgang abgeschlossen, muss zuerst der Asterisk und danach die Asterisk ioBroker Instanz neu gestartet werden. Jetzt sollte der Asterisk-Adapter funktionieren. Entferne noch die überflüssigen Konfigurationsdateien aus dem /tmp/ Verzeichnis, da diese Passwörter enthalten.

### Manuelle Erstellung der Asterisk-Konfiguration

Die Konfigurationsdateien können auch manuell erstellt werden. Dafür sind die alten 4 Konfigurationsdateien durch die unten beschriebenen Dateien zu ersetzen. Dabei ändern sich nicht die Benutzerberechtigungen.

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

In der Datei _/etc/asterisk/manager.conf_ werden die Werte für _„secret“_ und _„permit“_ durch (Ihr Subnetz/Ihre Subnetzmaske) ersetzt.

**/etc/asterisk/rtp.conf**

```sh
[general]
rtpstart=30000
rtpend=30100
```

In der Datei _/etc/asterisk/rtp.conf_ änderst Du nichts. Kopiere diese nur.

**/etc/asterisk/pjsip.conf**

```sh
[transport-udp]
type = transport
protocol = udp
bind = 0.0.0.0

[transport-tcp]
type=transport
protocol=tcp
bind=0.0.0.0

[iobroker]
type = registration
outbound_auth = iobroker
server_uri = sip:192.168.1.1:5060 ; Username, Password and IP address of Fritzbox WLAN/LAN telephone
client_uri = sip:123456789@192.168.1.1:5060 ; Username, Password and IP address of Fritzbox WLAN/LAN telephone

[iobroker]
type = auth
auth_type = userpass
password = mypassword ; Change to password of Fritzbox WLAN/LAN telephone
username = 123456789  ; Change to username of Fritzbox WLAN/LAN telephone

[iobroker]
type = aor
contact = sip:192.168.1.1:5060 ; Change hostname / IP address of Fritzbox

[123456789]			 ; Change to username of Fritzbox WLAN/LAN telephone
type = endpoint
context = ael-antwort
outbound_auth = iobroker
aors = iobroker
disallow=all
allow=ulaw
allow=alaw
allow=gsm
from_domain = 192.168.1.1 ; Change to hostname / IP address of Fritzbox
from_user = 123456789     ; Change to username of Fritzbox WLAN/LAN telephone

[iobroker]
type = identify
endpoint = 123456789 ; Change to username of Fritzbox WLAN/LAN telephone
match = 192.168.1.1  ; Change to hostname / IP address of Fritzbox
```

In der Datei _/etc/asterisk/pjsip.conf_ ändern sich _Host_ durch (IP Adresse der Fritzbox oder des VoIP Providers), _Secret_ , _Username_ , _Fromuser_ mit dem hinterlegtem Benutzernamen und Password in der Fritzbox.

![iobroker\_fritzbox\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_fritzbox_pjsip.png)

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
}
```

Ersetzen Sie den Inhalt der Datei _/etc/asterisk/extensions.ael_ ohne Änderungen.

Nun muss der Asterisk Server neu gestartet werden. Dies geschieht zb über _/etc/init.d/asterisk restart_ . Nun sollte sich ioBroker mit dem Asterisk Server verbinden.