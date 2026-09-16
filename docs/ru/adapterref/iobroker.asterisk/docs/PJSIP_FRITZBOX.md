---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md
title: ioBroker Asterisk VoIP Adapter
hash: yc2I1tT4r+8V1MORERIeh1GVFY+d8n1oAynW1EeAJYU=
---
![Логотип](../../../../en/adapterref/iobroker.asterisk/admin/asterisk.png)

# ioBroker Asterisk VoIP Adapter

## Установка / Основные настройки

Для VoIP-звонков вам потребуется установить Asterisk, а для преобразования MP3-файлов в GSM-аудиофайлы — ffmpeg на вашем оборудовании ioBroker. Для преобразования текстовых сообщений в аудиосообщения будет использоваться онлайн-инструмент преобразования текста в речь от Google.

Вы можете установить Asterisk и ffmpeg на компьютеры под управлением Linux (Raspberry Pi), Windows и Apple Mac. Если вы хотите установить Asterisk в контейнере Docker в режиме моста, вам необходимо открыть UDP-порты 5038, 5060 и UDP-порты с 7078 по 7097.

Asterisk и ffmpeg следует устанавливать на том же оборудовании, что и ioBroker! Причина в том, что аудиофайлы хранятся локально и доступны из ioBroker и Asterisk.

Если вы по-прежнему хотите использовать отдельный сервер для ioBroker и Asterisk, вы можете воспользоваться поддержкой SSH. При этом вам все равно потребуется установить ffmpeg или sox на сервере ioBroker.

Если вы используете Linux (например, Raspberry Pi), и ioBroker и Asterisk работают на одном сервере, вам необходимо установить ffmpeg и Asterisk следующим образом:

## Установка и настройка Asterisk на Fritzbox с использованием PJSIP.

Сначала необходимо открыть конфигурацию Fritzbox и добавить новое телефонное устройство LAN/WLAN. В моем примере у Fritzbox IP-адрес 192.168.1.1, имя пользователя _12345689_ , пароль _mypassword_ . Номер телефона для исходящих и входящих звонков — _03047114711_ .

![Fritzbox1](../../../../en/adapterref/iobroker.asterisk/docs/fritzbox1.png)

Если вы не хотите, чтобы ioBroker отвечал на телефонные звонки, оставьте «nur auf folgende Rufnummern reagieren» пустым. Важно: имя пользователя Fritzbox (Benutzername) должно состоять только из цифр. Пример: 12345689, 00004711 или 47110815 !!

![Fritzbox2](../../../../en/adapterref/iobroker.asterisk/docs/fritzbox2.png)

Сначала необходимо настроить соединение между ioBroker и сервером Asterisk на вкладке «Настройки Asterisk». Эта настройка не зависит от того, используете ли вы в качестве SIP-провайдера Fritzbox, Telekom, Sipgate или другого поставщика. Обычно имя пользователя — **manager** . Вы можете выбрать любой пароль. Но имя пользователя и пароль manager в ioBroker должны совпадать с теми, что указаны в файле manager.conf.

![iobroker\_main](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_main.png)

После завершения настройки раздела «Параметры Asterisk» перейдите на вкладку «Параметры SIP». Выберите **pjsip** в качестве службы. Теперь вам нужно ввести следующее:

1. IP-адрес/имя хоста SIP-сервера: ваш IP-адрес Fritzbox (в нашем примере 192.18.1.1)
2. Имя пользователя SIP-сервера: введите свое имя пользователя в Anmeldedaten вашего Fritzbox Telefoniegerät (в нашем примере 123456789)
3. Пароль SIP-сервера: вставьте свой Kennwort в Anmeldedaten вашего Fritzbox Telefoniegerät.

![iobroker\_fritzbox\_pjsip](../../../../en/adapterref/iobroker.asterisk/docs/iobroker_fritzbox_pjsip.png)

### Автоматическое создание конфигурационных файлов Asterisk

Теперь перейдите на вкладку «Настройки Asterisk» и установите флажок «Создавать конфигурационные файлы Asterisk (один раз)». Сохраните изменения и запустите экземпляр Asterisk. Скопируйте следующие файлы из каталога /tmp/ в каталог /etc/asterisk/. Перед копированием в /etc/asterisk, пожалуйста, проверьте права доступа пользователей к этим файлам. Возможно, вам потребуется изменить права доступа пользователей позже.

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
```

Теперь снова запустите Asterisk. Например, с помощью команды /etc/init.d/asterisk restart и перезапустите экземпляр Asterisk iobroker. Теперь всё должно работать, и настройка завершена. Пожалуйста, удалите все конфигурационные файлы в каталоге /tmp/, так как ваш пароль указан в этих файлах.

### Создание конфигурационных файлов Asterisk вручную

Вместо автоматического создания конфигурационных файлов вы можете сделать это самостоятельно. Теперь вам нужно отредактировать следующие конфигурационные файлы Asterisk. Удалите старый контент из этих 4 файлов! Не меняйте права доступа к файлам. Вам нужно решить, хотите ли вы использовать sip.conf или pjsip.conf. Не используйте оба файла одновременно, это не сработает!

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

Необходимо изменить в файле _/etc/asterisk/psip.conf_ IP-адрес/имя хоста SIP-сервера, имя пользователя SIP-сервера и пароль SIP-сервера.

- IP-адрес/имя хоста SIP-сервера должно совпадать с IP-адресом вашего устройства Fritzbox.
- Имя пользователя SIP-сервера должно быть **именем Benutzername вашего Fritzbox** (Telefonie -> Anmeldedaten).
- Паролем SIP-сервера должен быть **пароль вашего Fritzbox** (Telefonie -> Anmeldedaten).

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

Скопируйте приведенное выше содержимое в файл _/etc/asterisk/extensions.ael_ и ничего не меняйте! Если вы что-то здесь измените, ваша команда набора номера ioBroker работать не будет.

Для запуска сервера Asterisk введите команду _/etc/init.d/asterisk start._ Теперь необходимо подключить ioBroker к серверу Asterisk. Если ioBroker и сервер Asterisk используют IP-адрес 192.168.1.2, необходимо настроить этот IP-адрес, а также порт, имя пользователя и пароль в файле _/etc/asterisk/manager.conf_ . В качестве имени пользователя в файле sip.conf или pjsip.conf введите _iobroker_ . Необходимо указать путь для временных аудиофайлов. Этот путь должен быть доступен и авторизован для Asterisk и ioBroker.