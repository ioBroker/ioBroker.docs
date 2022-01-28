---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solax/README.md
title: ioBroker.solax
hash: HUBxVg5wWIo2qX34/a2x74UiyQ7rBdb6Bi8u4BJtnDI=
---
![Логотип](../../../en/adapterref/iobroker.solax/admin/solax.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.solax.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solax.svg)
![Количество установок (последние)](http://iobroker.live/badges/solax-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/solax-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.solax
![Тестируйте и выпускайте](https://github.com/simatec/ioBroker.solax/workflows/Test%20and%20Release/badge.svg)

**************************************************************************************************************

**Если вам это нравится, рассмотрите пожертвование:**

[![PayPal] (https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=Q4EEXQ6U96ZTQ&source=url)

**************************************************************************************************************

### Адаптер Solax для ioBroker
**************************************************************************************************************

### Немецкая документация
#### Solax Cloud-Verbindung
Solax Wechselrichter API-Cloud-Verbindung

Dieser Adapter ruft die Daten deines Wechselrichters vom Hersteller Solax für iobroker ab.

Был dazu benötigt wird, ist ein Konto bei Solax, eine Token-ID und die Seriennummer des Pocket Wifi oder LAN Sticks.

#### API-токен
<span><img src="docs/en/img/solax_api.png"></span>

#### Серийный номер
<span><img src="docs/en/img/wifi-stick.png"></span>

#### Experteneinstellungen
Локальное подключение Wird aktuell nur dem Pocket Wifi Sticks unterstützt. LAN-Sticks подключены к облачному модусу.

Achtung, wer in den Experteneinstellungen den lokalen Modus aktiviert sollte im Vorfeld zwingend die aktuelle Firmwareversion seines Pocket Wifi Sticks prüfen.
Eine Firmware Version больше 2.30.20 darf der Stick nicht installiert haben, da Solax in höheren Versionen den lokalen Zugriff blockiert und es zu einem Absturz des Wifi Sticks führt.

Wie man die Версия микропрограммы prüfen kann und ein Downgrade auf die correkte Version hinbekommt, wird hier erklärt.

Um die Firmware auf dem Stick zu prüfen, müsst ihr euch mit dem Hotspot des Sticks verbinden.
Der Name des Hotspots sollte bei euch wie folgt aussehen: `Solax_SWXXXXXXXX`. XXXXXXXX wird durch eure Seriennummer ersetzt.

Если вы используете Hotspot verbunden seit, dann geht ihr mit fogender IP-адрес в вашем браузере на веб-интерфейсе Wi-Fi-Sticks: `5.8.8.8`<br> Solltet ihr euer Passwort bei der Ersteinrichtung nicht geändert haben, sind die Standard Login-Daten admin:admin

<span><img src="docs/en/img/webif.png"></span>

Я открываю веб-интерфейс на вкладке «Система» и нахожу актуальную версию встроенного ПО.<br> Если версия выше 2.033.20, то она должна быть обновлена Вкладка в меню «Обновление встроенного ПО (.usb)» с исправлением версии.

Die Version 2.033.20 könnt ihr euch unter folgenden Link herunterladen:

[Скачать прошивку для карманного Wi-Fi](https://github.com/simatec/ioBroker.solax/raw/master/docs/files/618.00122.00_Pocket_WIFI_V2.033.20_20190313.usb.zip)

Die Zip-Datei muss entpackt werden und es muss die Datei mit der Endung &quot;.usb&quot; ausgewählt werden.<br> Nun könnt Ihr den Downgrade starten und werdet nach ca. 20-30 Sekunden eine Meldung bekommen, dass das Update erfolgreich war und der Stick neu gestartet wird.

Nach erfolgreichen Neustart könnt ihr nun über den Hotspot mit der IP-Adresse `5.8.8.8` oder auch über eure locale IP in eurem Netzwerk auf den Wifi-Stick zugreifen.

Prüft bitte vor einer Verbindung zu dem Adapter noch einmal, ob der Downgrade erfolgreich war und die correkte Firmware installiert ist.

Im Adapter müssen die lokale IP-Adresse (nicht die Hotspot IP) und das Passwort des Webinterfaces eingetragen werden und ihr habt nun eine sekundengenaue lokale Analyze eures Wechselrichters

**************************************************************************************************************

### Документация на английском языке
#### Подключение к облаку Solax
Подключение к облаку API-интерфейса Solax Inverter

Этот адаптер вызывает данные вашего инвертора от производителя Solax в iobroker.

Для этого вам нужна учетная запись в Solax, ваш идентификатор токена и серийный номер вашего WiFi-модуля.

#### API-токен
<span><img src="docs/en/img/solax_api.png"></span>

#### Серийный номер
<span><img src="docs/en/img/wifi-stick.png"></span>

#### Экспертные настройки
Локальное соединение в настоящее время поддерживается только Pocket Wifi Sticks. Сетевые флешки могут работать только в облачном режиме.

Внимание, если вы активируете локальный режим в экспертных настройках, вам следует заранее проверить текущую версию прошивки вашего Pocket Wifi Stick.<br> На флешке не должна быть установлена версия прошивки выше 2.30.20, поскольку Solax блокирует локальный доступ в более высоких версиях и вызывает сбой флешки Wifi.

Здесь объясняется, как проверить версию прошивки и как перейти на правильную версию.

Чтобы проверить прошивку на флешке, необходимо подключиться к точке доступа флешки.
Имя вашей точки доступа должно выглядеть следующим образом: `Solax_SWXXXXXXXX`. XXXXXXXX будет заменен вашим серийным номером.

Если вы подключены к точке доступа, перейдите в веб-интерфейс Wifi-модуля в браузере со следующим IP-адресом: `5.8.8.8`<br> Если вы не меняли пароль во время первоначальной настройки, данные для входа по умолчанию — admin:admin.

<span><img src="docs/en/img/webif.png"></span>

В веб-интерфейсе вы переходите на вкладку «Система» и там вы найдете текущую версию установленной прошивки.<br> Если версия выше 2.033.20, можно прошить нужную версию в той же вкладке через пункт меню &quot;Обновить прошивку (.usb)&quot;.

Вы можете скачать версию 2.033.20 по следующей ссылке:

[Скачать прошивку для карманного Wi-Fi](https://github.com/simatec/ioBroker.solax/raw/master/docs/files/618.00122.00_Pocket_WIFI_V2.033.20_20190313.usb.zip)

Zip-файл необходимо распаковать и выбрать файл с расширением «.usb».<br> Теперь вы можете начать даунгрейд и примерно через 20-30 секунд вы получите сообщение о том, что обновление прошло успешно и флешка будет перезапущена.

После успешного перезапуска вы можете получить доступ к WiFi-модулю через точку доступа с IP-адресом `5.8.8.8` или через локальный IP-адрес в вашей сети.

Перед подключением к адаптеру еще раз проверьте, прошел ли даунгрейд успешно и установлена ли правильная прошивка.

Локальный IP-адрес (не IP-адрес точки доступа) и пароль веб-интерфейса должны быть введены в адаптер, и теперь у вас есть локальный анализ вашего инвертора с точностью до секунды.

**************************************************************************************************************

### Что такое Sentry.io и что сообщается серверам этой компании?
Sentry.io — это сервис для разработчиков, позволяющий получить обзор ошибок их приложений. И именно это реализовано в данном адаптере.

Когда адаптер выходит из строя или возникает другая ошибка кода, это сообщение об ошибке, которое также появляется в журнале ioBroker, отправляется в Sentry. Когда вы разрешаете iobroker GmbH собирать диагностические данные, также включается ваш идентификатор установки (это просто уникальный идентификатор **без** какой-либо дополнительной информации о вас, электронной почте, имени и т. д.). Это позволяет Sentry группировать ошибки и показывать, сколько уникальных пользователей затронуто такой ошибкой. Все это помогает мне создавать безошибочные адаптеры, которые практически никогда не дают сбоев.

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 0.4.2 (2022-01-27)
* (simatec) Fix json state

### 0.4.1 (2022-01-26)
* (simatec) Fix react Translatation

### 0.4.0 (2022-01-25)
* (simatec) local request for Wifi Pocket Stick added
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Number of days of history data added
* (simatec) Expert-Mode added
* (simatec) Docu updated
* (simatec) Bugfixes

### 0.3.7 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.6 (2021-08-04)
* (simatec) deps fixed

### 0.3.5 (31.07.2021)
* (simatec) await/async functions fixed

### 0.3.4 (30.07.2021)
* (simatec) code cleanig
* (simatec) await functions fixed

### 0.3.3 (29.07.2021)
* (simatec) Formatted objects
* (simatec) await functions fixed
* (simatec) query interval changed
* (simatec) Dependencies updated

### 0.3.2 (28.07.2021)
* (simatec) fix for latest repo

### 0.3.1 (11.06.2021)
* (simatec) fix for latest repo
* (simatec) API-Token encrypted

### 0.3.0 (09.06.2021)
* (simatec) state settings changed
* (simatec) sentry plugin added
* (simatec) readme added
* (simatec) sunposition added
* (simatec) nightmode added

### 0.2.0 (07.06.2021)
* (simatec) powerdc 1-4 added
* (simatec) battPower added
* (simatec) many small bugfixes

### 0.1.1 (02.06.2021)
* (simatec) small Bugfixes

### 0.1.0 (02.06.2021)
* (simatec) first beta

## License
MIT License

Copyright (c) 2021 - 2022 simatec

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.