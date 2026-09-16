---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md
title: ioBroker Asterisk VoIP Adapter
hash: S/jGxxFVacElxaw4uT/qHX6Be7pc6GPh7raYyaJ9Puo=
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

Вам необходимо использовать новый LAN/WLAN-телефон в сетевом ящике. В моем случае FritzBox имеет IP-адрес 192.168.1.1, имя пользователя и адрес LAN/WLAN-телефона, номер _12345689_ и _мой пароль_ . Die Telefonnummer für abgehende und ankommende Anrufe ist \_ 03047114711 \_.

![Fritzbox1](../../../../en/adapterref/iobroker.asterisk/docs/fritzbox1.png)

Если вы не хотите, чтобы ioBroker был готов к работе с ioBroker, обратите внимание на «нур на folgende Rufnummern reagieren». Это, например, имя пользователя Fritzbox LAN/WLAN, телефонные звонки в пределах Zahlen besteht. Телефон: 12345689, 00004711 или 47110815!

![Fritzbox2](../../../../en/adapterref/iobroker.asterisk/docs/fritzbox2.png)

Необходимо настроить Verbindung zwischen ioBroker и Asterisk на регистрационной карте «Asterisk Einstellungen». Normalerweise lautet der Benutzername **менеджер** . Вы можете быть уверены в том, что пароль будет изменен. Имя пользователя и пароль должны быть идентифицированы с Einträgen в файле Manager.conf. Эта конфигурация недоступна для SIP-провайдера с помощью Fritzbox, Telekom или Sipgate.

![iobroker\_main](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_main.png)

Если вы выбрали «Asterisk Einstellungen», вы можете перейти на регистрационную карту «SIP Einstellungen». Wähle als Service **pjsip** aus. Gebe nun folgendes ein:

1. IP/имя хоста SIP-серверов: IP-адрес Deiner Fritzbox (по умолчанию 192.18.1.1)
2. Имя сервера SIP: Hier trägst du den Benutzernamen der auf dem Reiter Anmeldedaten Deines Fritzbox Telefoniegeräts steht ein (в unserem Beispiel 123456789)
3. Пароль SIP-сервера: Hier trägst du das Kennwort welches auf dem Reiter Anmeldedaten Deines Fritzbox Telefoniegeräts steht ein

![iobroker\_fritzbox\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_fritzbox_pjsip.png)

Регистрационная карта «SSH» просматривается. Это не означает, что Asterisk не работает на популярном сервере с ioBroker.

### Автоматическое определение конфигурации Asterisk

Откройте «Настройки Asterisk» и активируйте функцию «Отображение данных конфигурации Asterisk (einmalig)». Drücke anschließend auf «Speichern und Schließen». Nun befinden sich die Konfigurationsdateien im /tmp/ Verzeichnis. Скопируйте данные, которые будут указаны в файле Verzeichnis /etc/asterisk. Die Benutzerberechtigungen der Dateien в /etc/asterisk Verzeichnis müssen unverändert bleiben. Vielleicht müssen die Berechtigungen nach dem Kopieren angepasst werden.

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

В дате _/etc/asterisk/pjsip.conf_ укажите _имя хоста_ (IP-адрес Fritzbox или провайдеров VoIP), _секрет_ , _имя пользователя_ , имя _пользователя_ и пароль в Fritzbox.

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

Ersetze den Inhalt der Datei _/etc/asterisk/extensions.ael_ ohne Änderungen.

Nun muss der Asterisk Server не должен работать. Dieses geschieht zb über _/etc/init.d/asterisk restart_ . Теперь вы можете использовать ioBroker с сервером Asterisk.