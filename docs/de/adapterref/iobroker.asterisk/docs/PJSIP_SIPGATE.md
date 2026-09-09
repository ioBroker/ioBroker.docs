---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md
title: ioBroker Asterisk VoIP-Adapter
hash: YMt0d75BYA9q5e5Xrgl9FUghvD/1DvuHiuJyjO/EfFM=
---
![Logo](../../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

# ioBroker Asterisk VoIP-Adapter

## Installation / Grundeinstellungen

Sie müssen Asterisk für VoIP-Anrufe und ffmpeg zum Transkodieren von MP3-Audiodateien in GSM-Audiodateien auf Ihrer ioBroker-Hardware installieren. Zum Erstellen von Sprachnachrichten wird das Online-Tool zur Umwandlung von Text in Sprache von Google verwendet.

Sie können Asterisk und ffmpeg auf Linux- (Raspberry Pi), Windows- und Apple-Mac-Computern installieren. Wenn Sie Asterisk in einem Docker-Container im Bridge-Modus installieren möchten, müssen Sie die UDP-Ports 5038 und 5060 sowie die UDP-Ports 7078 bis 7097 freigeben.

Sie müssen Asterisk und ffmpeg auf derselben Hardware wie ioBroker installieren! Der Grund dafür ist, dass die Audiodateien lokal gespeichert und von ioBroker und Asterisk aus zugänglich sind.

Wenn Sie weiterhin separate Server für ioBroker und Asterisk verwenden möchten, können Sie die SSH-Unterstützung nutzen. Sie müssen ffmpeg oder sox weiterhin auf dem ioBroker-Server installieren.

Wenn Sie Linux (z. B. Raspberry Pi) verwenden und ioBroker und Asterisk auf demselben Server laufen, müssen Sie ffmpeg und Asterisk wie folgt installieren:

## Installation und Konfiguration von Asterisk mit dem Anbieter Sipgate Basic über PJSIP

Konfigurieren Sie die Verbindung von ioBroker zum Asterisk-Server auf dem Tab „Asterisk-Einstellungen“. Diese Konfiguration ist unabhängig davon, ob Sie Ihre Fritzbox, Telekom, Sipgate oder einen anderen Anbieter als SIP-Provider verwenden. Der Benutzername lautet üblicherweise **„manager“** . Sie können ein beliebiges Passwort wählen. Benutzername und Passwort für „manager“ in ioBroker müssen jedoch mit den späteren Einstellungen in der Datei „manager.conf“ übereinstimmen.

![iobroker\_main](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_main.png)

Wenn Sie die Konfiguration der „Asterisk-Einstellungen“ abgeschlossen haben, wechseln Sie zum Tab „SIP-Einstellungen“. Wählen Sie **pjsip** als Dienst aus. Geben Sie nun Folgendes ein:

1. IP-Adresse/Hostname des SIP-Servers: Geben Sie **sipgate.de** als Hostnamen ein.
2. Benutzername des SIP-Servers: Geben Sie Ihre Sipgate-ID ein. Zum Beispiel 2456379f
3. SIP-Server-Passwort: Geben Sie Ihr Sipgate-Passwort ein

![iobroker\_sipgate\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_sipgate_pjsip.png)

### Automatische Erstellung von Asterisk-Konfigurationsdateien

Wechseln Sie nun zum Tab „Asterisk-Einstellungen“ und aktivieren Sie das Kontrollkästchen „Asterisk-Konfigurationsdateien (einmalig) erstellen“. Speichern Sie die Einstellungen und starten Sie die Asterisk-Instanz. Kopieren Sie die folgenden Dateien aus Ihrem /tmp/-Verzeichnis in das Verzeichnis /etc/asterisk/. Prüfen Sie bitte vor dem Kopieren nach /etc/asterisk/, welche Benutzerrechte die Dateien haben. Gegebenenfalls müssen Sie die Benutzerrechte anschließend anpassen.

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
```

Starten Sie Asterisk nun neu. Führen Sie beispielsweise \`/etc/init.d/asterisk restart\` aus und starten Sie die Asterisk iobroker-Instanz neu. Alles sollte nun funktionieren und die Konfiguration ist abgeschlossen. Bitte löschen Sie alle Konfigurationsdateien im Verzeichnis \`/tmp/\`, da Ihr Passwort in diesen Dateien gespeichert ist.

### Manuelle Erstellung von Asterisk-Konfigurationsdateien

Anstatt die Konfigurationsdateien automatisch erstellen zu lassen, können Sie dies manuell tun. Bearbeiten Sie dazu die folgenden Asterisk-Konfigurationsdateien. Löschen Sie die alten Einträge in diesen vier Dateien! Ändern Sie die Benutzerberechtigungen der Dateien nicht.

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

Sie müssen in der Datei _/etc/asterisk/psip.conf_ einige Änderungen vornehmen. Bitte ersetzen Sie die Platzhalter **sipid** und **sippw** wie beschrieben:

- **$sipid** : Ihre SIP-ID ohne vorangestelltes $
- **$sippw** : Ihr SIP-Passwort ohne $

In der ioBroker Asterisk-Administration müssen Sie folgende Anpassungen vornehmen.

- Die IP-Adresse/der Hostname des SIP-Servers muss **sipgate.de** lauten.
- Der Benutzername des SIP-Servers muss **die Sipgate-ID ($sipid)** sein.
- Das Passwort des SIP-Servers muss **das Sipgate-Passwort ($sippw)** Ihres Sipgate-Kontos sein.

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

Kopieren Sie den obigen Inhalt in die _Datei /etc/asterisk/extensions.ael_ und ändern Sie nichts! Wenn Sie hier etwas ändern, funktioniert Ihr ioBroker-Wählbefehl nicht mehr.

Um den Asterisk-Server zu starten, _geben Sie \`/etc/init.d/asterisk start\` ein._ Anschließend müssen Sie ioBroker mit dem Asterisk-Server verbinden. Falls ioBroker und der Asterisk-Server die IP-Adresse 192.168.1.2 verwenden, müssen Sie diese IP-Adresse sowie Port, Benutzername und Passwort in der Datei _\`/etc/asterisk/_ manager.conf\` konfigurieren. Tragen Sie für den Benutzernamen in \`sip.conf\` oder \`pjsip.conf\` den _Wert \`iobroker\`_ ein. Sie müssen außerdem einen Pfad für temporäre Audiodateien angeben. Dieser Pfad muss für Asterisk und ioBroker zugänglich und autorisiert sein.