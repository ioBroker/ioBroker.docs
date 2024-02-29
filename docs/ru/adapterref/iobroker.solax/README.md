---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.solax.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.solax.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/solax-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/solax-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg
BADGE-License: https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solax/README.md
title: ioBroker.solax
hash: RZW6F+kMWyyDPRGfkXmz1YZ5xP43u5qCgjakymep7ZI=
---
![Логотип](../../../en/admin/solax.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.solax.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solax.svg)
![Количество установок (последних)](http://iobroker.live/badges/solax-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/solax-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg)
![Лицензия](https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat)
![Пожертвовать](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.solax
![Тестирование и выпуск](https://github.com/simatec/ioBroker.solax/workflows/Test%20and%20Release/badge.svg)

***

**Если вам это нравится, рассмотрите возможность пожертвования:**

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

***

## Соединение с облаком Solax
Соединение с облаком Solax Inverter API

Этот адаптер вызывает данные вашего инвертора от производителя Solax в iobroker.

Для этого вам понадобится учетная запись в Solax, идентификатор вашего токена и серийный номер вашего модуля Wi-Fi.

## API-токен
<span><img src="../img/solax_api.png"></span>

## Серийный номер
<span><img src="../img/wifi-stick.png"></span>

## Экспертные настройки
Локальное соединение в настоящее время поддерживается только Pocket Wifi Stick. Сетевые карты LAN могут работать только в облачном режиме.

Внимание, если вы активируете локальный режим в экспертных настройках, вам следует заранее проверить текущую версию прошивки вашего Pocket Wifi Stick.<br> На флешке не должна быть установлена версия прошивки выше 2.30.20 (Wifi-Pocket V1/V2) и меньше 3.001 (Wifi-Pocket V3), поскольку Solax блокирует локальный доступ в более высоких версиях и приводит к сбою Wi-Fi-флешки.

Здесь объясняется, как проверить версию прошивки и перейти на правильную версию.

Чтобы проверить прошивку на флешке, вам необходимо подключиться к точке доступа флешки.
Имя вашей точки доступа должно выглядеть следующим образом: `Solax_SWXXXXXXXX` или `Wifi_SWXXXXXXXX`. XXXXXXXX будет заменен вашим серийным номером.

Если вы подключены к точке доступа, перейдите в веб-интерфейс Wi-Fi-модуля в браузере со следующим IP-адресом: `5.8.8.8`.<br> Если вы не меняли пароль во время первоначальной настройки, данные для входа по умолчанию — admin:admin.

<span><img src="../img/webif.png"></span>

В веб-интерфейсе вы переходите на вкладку «Система» и там найдете установленную на данный момент версию прошивки.<br> Если версия выше 2.033.20 (Wifi-Pocket V1/V2) и меньше 3.001 (Wifi-Pocket V3), прошить правильную версию можно на той же вкладке через пункт меню «Обновить прошивку (.usb)». .

Скачать версию 2.033.20 можно по следующей ссылке:

[Скачать прошивку карманного Wi-Fi](https://github.com/simatec/ioBroker.solax/raw/master/docs/files/618.00122.00_Pocket_WIFI_V2.033.20_20190313.usb.zip)

ZIP-файл необходимо распаковать и выбрать файл с расширением «.usb».<br> Теперь вы можете начать понижение версии и примерно через 20-30 секунд вы получите сообщение о том, что обновление прошло успешно, и флешка будет перезапущена.

После успешного перезапуска вы можете получить доступ к Wi-Fi-модулю через точку доступа с IP-адресом `5.8.8.8` или через локальный IP-адрес в вашей сети.

Перед подключением к адаптеру еще раз проверьте, прошел ли переход на более раннюю версию и установлена ли правильная прошивка.
К счастью, флешка не выполняет автоматическое обновление прошивки и полностью работоспособна с версией 2.033.20.

Локальный IP-адрес (а не IP-адрес точки доступа) и пароль веб-интерфейса необходимо ввести в адаптер, и теперь у вас есть локальный анализ вашего инвертора с точностью до секунды.

Следующие инверторы в настоящее время поддерживаются в локальном режиме:

* X1 мини
* Повышение X1
* X3-Гибийд/Фит
* Х3-20К/30К
* X3-МИКР/ПРО
* X3-Гибрид-G4
* X3-MIC/PRO-G2
* X1-Гибрид-G4
* Настенная коробка X1/X3-EVC

Если вы хотите интегрировать другие инверторы, вам следует сделать оценку данных локального запроса доступной в качестве проблемы.

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### __WORK IN PROGRESS__
* (simatec) Dependencies updated

### 0.9.6 (2024-02-05)
* (simatec) small Design Fix

### 0.9.5 (2024-02-04)
* (simatec) Dependencies updated
* (simatec) Fix Data for X1/X3-EVC Wallbox

### 0.9.4 (2024-01-22)
* (simatec) adapter-dev added
* (simatec) delete Gulp
* (Andre-0815-4711) Data for X1/X3-EVC Wallbox added

### 0.9.3 (2024-01-14)
* (simatec) Fix Data for X1/X3-EVC Wallbox
* (simatec) Fix Inverter data
* (simatec) Dependencies updated

### 0.9.2 (2024-01-13)
* (simatec) Fix Data for X1/X3-EVC Wallbox

### 0.9.1 (2024-01-02)
* (simatec) Fix Inverter data
* (simatec) Fix Data for X1/X3-EVC Wallbox
* (simatec) Update Docu

### 0.9.0 (2024-01-02)
* (simatec) Cloud URL Check added
* (simatec) X1/X3-EVC added
* (simatec) Inverter Data for X3-Hybrid-G4 updated
* (simatec) Fix Inverter Data for X1 Hybrid G4
* (simatec) Dependencies updated

### 0.8.0 (2023-10-23)
* (simatec) X1-Hybrid-G4 added

### 0.7.7 (2023-09-06)
* (simatec) Dependencies updated
* (simatec) small Bugfix

### 0.7.6 (2023-07-30)
* (simatec) X3-Hybrid-G4 data updated
* (simatec) Dependencies updated
* (simatec) small Bugfix
* (simatec) Ukrainian translation added

### 0.7.5 (2023-05-29)
* (simatec) X3-MIC/PRO-G2 added
* (simatec) small Fix
* (simatec) Dependencies updated

### 0.7.4 (2023-05-04)
* (simatec) connection state added
* (simatec) suncalc package added
* (simatec) change from dawn und dusk calc

### 0.7.3 (2023-05-03)
* (simatec) small Bugfix
* (simatec) X3-Hybrid data added
* (simatec) Dependencies updated

### 0.7.2 (2023-04-27)
* (simatec) small Bugfix

### 0.7.1 (2023-04-27)
* (simatec) small Bugfix

### 0.7.0 (2023-04-26)
* (simatec) Dependencies updated
* (simatec) Config for Firmware Version added
* (simatec) small Bugfix

### 0.6.0 (2023-03-04)
* (simatec) Dependencies updated
* (simatec) Fix URL
* (simatec) small Bugfix

### 0.5.7 (2022-11-01)
* (simatec) Dependencies updated

### 0.5.6 (2022-09-21)
* (simatec) local mode for X1 boost added

### 0.5.5 (2022-09-21)
* (simatec) small Bugfixes

### 0.5.4 (2022-09-20)
* (simatec) small Bugfixes

### 0.5.3 (2022-09-20)
* (simatec) Hybrid-G4 added
* (simatec) small Bugfixes
* (simatec) appveyor test removed
* (simatec) travis test removed

### 0.5.1 (2022-09-13)
* (simatec) feedin added

### 0.5.0 (2022-09-12)
* (simatec) Dependencies updated
* (simatec) small Bugfixes
* (clausmuus) Add support for firmware version 3.001

### 0.4.6 (2022-04-11)
* (simatec) Fix states

### 0.4.5 (2022-04-04)
* (simatec) Dependencies updated
* (simatec) small Bugfixes

### 0.4.4 (2022-03-14)
* (simatec) Dependencies updated
* (simatec) battery data for local request added
* (simatec) night mode turn on/off added

### 0.4.3 (2022-02-03)
* (simatec) refactoring Sourcecode
* (simatec) Dependencies updated
* (simatec) Fix API Request

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

Copyright (c) 2021 - 2024 simatec

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