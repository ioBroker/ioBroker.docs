---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md
title: ioBroker Asterisk VoIP-Adapter
hash: Q8b3Wiiajj9NieZ7LKK79SaQIzHPK/QoyZC3j/Ashn8=
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

Zuerst müssen Sie die Verbindung zwischen ioBroker und Asterisk in der Registerkarte „Asterisk Einstellungen“ konfigurieren. Normalerweise lautet der Benutzername **manager** . Du kannst ein beliebiges Passwort auswählen. Der Benutzername und das Passwort müssen jedoch später mit den Einträgen in der manager.conf identisch sein. Diese Konfiguration ist unabhängig vom SIP-Provider wie zB Fritzbox, Telekom oder Sipgate. .

![iobroker\_main](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_main.png)

Wenn Sie mit den „Asterisk Einstellungen“ fertig sind, wechseln Sie auf die Registerkarte „SIP Einstellungen“. Wählen Sie als Service **pjsip** aus. Gebe nun folgendes ein:

1. IP/Hostname des SIP-Servers: Geben Sie hier **sipgate.de** als Hostnamen an
2. Benutzername des SIP-Servers: Hinterlege hier Deine Sipgate-ID. Zum Beispiel 2456379f
3. Passwort des SIP-Servers: Trage hier Dein Sipgate Passwort eine

![iobroker\_sipgate\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_sipgate_pjsip.png)

### Automatische Erstellung der Asterisk-Konfiguration

Gehen Sie auf den Reiter „Asterisk-Einstellungen“ und aktivieren Sie das Kontrollkästchen „Anlegen der Asterisk-Konfigurationsdateien (einmalig)“. Anschließend auf „Speichern und Schließen“ drücken. Nun befinden sich die Konfigurationsdateien im /tmp/ Verzeichnis. Kopieren Sie diese wie unten beschrieben im Verzeichnis /etc/asterisk. Die Benutzerberechtigungen der Dateien im /etc/asterisk Verzeichnis müssen unverändert bleiben. Möglicherweise müssen die Berechtigungen nach dem Kopieren angepasst werden.

```sh
sudo mv /tmp/extensions.ael /etc/asterisk/extensions.ael
sudo mv /tmp/manager.conf /etc/asterisk/manager.conf
sudo mv /tmp/pjsip_sipgate.conf /etc/asterisk/pjsip.conf
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
[global]
type=global
endpoint_identifier_order=ip,username

[transport-udp]
type = transport
protocol = udp
bind = 0.0.0.0

[iobroker]
type = registration
retry_interval = 20
max_retries = 10
contact_user = sipid
expiration = 120
transport = transport-udp
outbound_auth = iobroker
client_uri = sip:$sipid@sipgate.de:5060
server_uri = sip:sipgate.de:5060

[iobroker]
type = auth
username = $sipid
password = $sippw
realm = sipgate.de

[iobroker]
type = aor
contact = sip:$sipid@sipgate.de

[$sipid]
type = endpoint
context = ael-antwort
dtmf_mode = rfc4733
disallow = all
allow = alaw
rtp_symmetric = yes
force_rport = yes
rewrite_contact = yes
timers = yes
from_user = $sipid
from_domain = sipgate.de
language = en
outbound_auth = iobroker
aors = iobroker

[iobroker]
type = identify
endpoint = $sipid
match = sipgate.de


```

Ersetze in der _/etc/asterisk/psip.conf_ die Platzhalter **sipid** und **sippw** wie beschrieben:

- **$sipid** : Deine SIP Gate Id ohne führendes $
- **$sippw** : Dein SIP Passwort ohne führendes $

Nehmen Sie in der ioBroker Asterisk Konfiguration folgende Einstellungen vor:

- Die IP-Adresse/Hostname des SIP-Servers lautet **sipgate.de**
- Der Benutzername des SIP Servers ist Dein **Sipgate Id ($sipid)**
- Das Passwort des SIP-Servers ist Dein **Sipgate-Passwort ($sippw)**

![iobroker\_sipgate\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_sipgate_pjsip.png)

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

Ersetzen Sie den Inhalt der Datei _/etc/asterisk/extensions.ael_ ohne Änderungen.

Nun muss der Asterisk Server neu gestartet werden. Dies geschieht zb über _/etc/init.d/asterisk restart_ . Nun sollte sich ioBroker mit dem Asterisk Server verbinden.