---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md
title: ioBroker Asterisk VoIP Adapter
hash: YMt0d75BYA9q5e5Xrgl9FUghvD/1DvuHiuJyjO/EfFM=
---
![Логотип](../../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

# ioBroker Asterisk VoIP Adapter

## Установка / Основные настройки

Для VoIP-звонков вам потребуется установить Asterisk, а для преобразования MP3-файлов в GSM-аудиофайлы — ffmpeg на вашем оборудовании ioBroker. Для преобразования текстовых сообщений в аудиосообщения будет использоваться онлайн-инструмент преобразования текста в речь от Google.

Вы можете установить Asterisk и ffmpeg на компьютеры под управлением Linux (Raspberry Pi), Windows и Apple Mac. Если вы хотите установить Asterisk в контейнере Docker в режиме моста, вам необходимо открыть UDP-порты 5038, 5060 и UDP-порты с 7078 по 7097.

Asterisk и ffmpeg следует устанавливать на том же оборудовании, что и ioBroker! Причина в том, что аудиофайлы хранятся локально и доступны из ioBroker и Asterisk.

Если вы по-прежнему хотите использовать отдельный сервер для ioBroker и Asterisk, вы можете воспользоваться поддержкой SSH. При этом вам все равно потребуется установить ffmpeg или sox на сервере ioBroker.

Если вы используете Linux (например, Raspberry Pi), и ioBroker и Asterisk работают на одном сервере, вам необходимо установить ffmpeg и Asterisk следующим образом:

## Установка и настройка Asterisk с провайдером Sipgate Basic с использованием PJSIP.

Настройте соединение между ioBroker и сервером Asterisk на вкладке «Настройки Asterisk». Эта настройка не зависит от того, используете ли вы в качестве SIP-провайдера Fritzbox, Telekom, Sipgate или другого поставщика. Обычно имя пользователя — **manager** . Вы можете выбрать любой пароль. Но имя пользователя и пароль manager в ioBroker должны совпадать с теми, что указаны в файле manager.conf.

![iobroker\_main](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_main.png)

После завершения настройки раздела «Параметры Asterisk» перейдите на вкладку «Параметры SIP». Выберите **pjsip** в качестве службы. Теперь вам нужно ввести следующее:

1. IP-адрес/имя хоста SIP-сервера: введите **sipgate.de** в качестве имени хоста.
2. Имя пользователя SIP-сервера: укажите свой идентификатор Sipgate. Например, 2456379f
3. Пароль SIP-сервера: введите свой пароль Sipgate.

![iobroker\_sipgate\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_sipgate_pjsip.png)

### Автоматическое создание конфигурационных файлов Asterisk

Теперь перейдите на вкладку «Настройки Asterisk» и установите флажок «Создавать конфигурационные файлы Asterisk (один раз)». Сохраните изменения и запустите экземпляр Asterisk. Скопируйте следующие файлы из каталога /tmp/ в каталог /etc/asterisk/. Перед копированием в /etc/asterisk, пожалуйста, проверьте права доступа пользователей к этим файлам. Возможно, вам потребуется изменить права доступа пользователей позже.

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

Теперь снова запустите Asterisk. Например, с помощью команды /etc/init.d/asterisk restart и перезапустите экземпляр Asterisk iobroker. Теперь всё должно работать, и настройка завершена. Пожалуйста, удалите все конфигурационные файлы в каталоге /tmp/, так как ваш пароль указан в этих файлах.

### Создание конфигурационных файлов Asterisk вручную

Вместо автоматического создания конфигурационных файлов вы можете сделать это самостоятельно. Теперь вам нужно отредактировать следующие конфигурационные файлы Asterisk. Удалите старые данные сотрудников из этих 4 файлов! Не изменяйте права доступа пользователей к файлам.

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

Необходимо изменить в файле _/etc/asterisk/manager.conf_ значения параметров _secret_ и _permit_ (ваша подсеть + маска подсети).

**/etc/asterisk/rtp.conf**

```sh
[general]
rtpstart=30000
rtpend=30100
```

В файле _/etc/asterisk/rtp.conf_ ничего менять не нужно. Скопируйте только этот файл.

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

Вам необходимо внести некоторые изменения в файл _/etc/asterisk/psip.conf_ . Пожалуйста, замените заполнители **sipid** и **sippw,** как описано:

- **$sipid** : ваш SIP-идентификатор без префикса $ в начале
- **$sippw** : ваш SIP-пароль без символа $

В административной панели Asterisk в ioBroker необходимо выполнить следующие настройки.

- IP-адрес/имя хоста SIP-сервера должно быть **sipgate.de**
- Имя пользователя SIP-сервера должно быть **Sipgate Id ($sipid).**
- Пароль SIP-сервера должен совпадать с **паролем Sipgate ($sippw)** вашей учетной записи Sipgate.

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

Скопируйте приведенное выше содержимое в файл _/etc/asterisk/extensions.ael_ и ничего не меняйте! Если вы что-то здесь измените, ваша команда набора номера ioBroker работать не будет.

Для запуска сервера Asterisk введите команду _/etc/init.d/asterisk start._ Теперь необходимо подключить ioBroker к серверу Asterisk. Если ioBroker и сервер Asterisk используют IP-адрес 192.168.1.2, необходимо настроить этот IP-адрес, а также порт, имя пользователя и пароль в файле _/etc/asterisk/manager.conf_ . В качестве имени пользователя в файле sip.conf или pjsip.conf введите _iobroker_ . Необходимо указать путь для временных аудиофайлов. Этот путь должен быть доступен и авторизован для Asterisk и ioBroker.