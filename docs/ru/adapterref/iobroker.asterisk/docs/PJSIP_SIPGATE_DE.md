---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md
title: ioBroker Asterisk VoIP Adapter
hash: Q8b3Wiiajj9NieZ7LKK79SaQIzHPK/QoyZC3j/Ashn8=
---
![Логотип](../../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

# ioBroker Asterisk VoIP Adapter

## Grundeinstellungen

Вам необходимо установить Asterisk das Paket ffmpeg или sox в формате MP3-Audiodateien в формате GSM-Audiodateien.

Вы можете установить Asterisk на компьютеры Linux (Raspberry), Windows и Apple Mac. Если вы используете Asterisk в Docker-Container в Bridge-Modus, вы должны установить UDP-порты 5038,5060 и UDP-порты 7078 или 7097 в открытом контейнере.

Asterisk должен быть на популярном сервере, на котором установлен ioBroker, и на ioBroker, подключенном к Sprachnachrichten (Audiodateien) с помощью Asterisk.

Используйте ioBroker и Asterisk на сервере, который может получить доступ к ssh dafür nutzen. Здесь можно использовать ffmpeg или sox на сервере ioBroker. Клиент ssh должен быть установлен на сервере ioBroker, а сервер ssh — на сервере Asterisk. Die Trennung von ioBroker и Asterisk будут нужны вам, если вы хотите использовать Linux Kenntnisse Hat.

Для Linux (zB Raspberry) установите следующий пакет:

## Установка и настройка

Необходимо настроить Verbindung zwischen ioBroker и Asterisk на регистрационной карте «Asterisk Einstellungen». Normalerweise lautet der Benutzername **менеджер** . Вы можете быть уверены в том, что пароль будет изменен. Имя пользователя и пароль должны быть идентифицированы с Einträgen в файле Manager.conf. Эта конфигурация недоступна для SIP-провайдера с помощью Fritzbox, Telekom или Sipgate. .

![iobroker\_main](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_main.png)

Если вы выбрали «Asterisk Einstellungen», вы можете перейти на регистрационную карту «SIP Einstellungen». Wähle als Service **pjsip** aus. Gebe nun folgendes ein:

1. IP/имя хоста SIP-сервера: Gebe hier **sipgate.de** als Hostname an
2. Имя пользователя SIP-сервера: Hinterlege hier Deinen Sipgate Id. Для Бейспиля 2456379f
3. Пароль SIP-сервера: Trage hier Dein Sipgate Passwort eine

![iobroker\_sipgate\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_sipgate_pjsip.png)

### Автоматическое определение конфигурации Asterisk

Откройте «Настройки Asterisk» и активируйте функцию «Отображение данных конфигурации Asterisk (einmalig)». Drücke anschließend auf «Speichern und Schließen». Nun befinden sich die Konfigurationsdateien im /tmp/ Verzeichnis. Скопируйте данные, которые будут указаны в файле Verzeichnis /etc/asterisk. Die Benutzerberechtigungen der Dateien в /etc/asterisk Verzeichnis müssen unverändert bleiben. Vielleicht müssen die Berechtigungen nach dem Kopieren angepasst werden.

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

Ist der Kopiervorgang abgeschlossen должен сначала умереть Asterisk и дать Asterisk ioBroker Instanz neu gestartet werden. Выключите функцию адаптера Asterisk. Entferne noch die überflüssigen Konfigurationsdateien aus dem /tmp/ Verzeichnis da diese Passwörter enthalten.

### Мануэль Эрстеллунг дер Asterisk Konfiguration

Die Konfigurationsdateien können auch manuell erstellt werden. Dafür sind die Alten 4 Konfigurationsdateien durch die unten beschriebenen Dateien zu ersetzen. Dabeiändere nicht die Benutzerberechtigungen.

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

В файле _/etc/asterisk/manager.conf_ введите Werte für _secret_ und _Permit_ (ваша подсеть/маска подсети).

**/etc/asterisk/rtp.conf**

```sh
[general]
rtpstart=30000
rtpend=30100
```

В файле _/etc/asterisk/rtp.conf_ вы найдете Du nichts. Kopiere diese nur.

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

Вставьте в _/etc/asterisk/psip.conf_ Platzhalter **Sipid** и **SippWie** Beschrieben:

- **$sipid** : Идентификатор SIP-шлюза без дополнительных настроек $
- **$sippw** : Введите SIP-пароль без необходимости $

В конфигурации ioBroker Asterisk используются следующие методы:

- IP-адрес/имя хоста SIP-серверов можно найти на **sipgate.de**
- Имя пользователя SIP-серверов — это **идентификатор Sipgate ($sipid)**
- Пароль SIP-серверов — это **пароль Sipgate ($sippw).**

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

Ersetze den Inhalt der Datei _/etc/asterisk/extensions.ael_ ohne Änderungen.

Nun muss der Asterisk Server не должен работать. Dieses geschieht zb über _/etc/init.d/asterisk restart_ . Теперь вы можете использовать ioBroker с сервером Asterisk.