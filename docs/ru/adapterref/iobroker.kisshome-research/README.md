---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.kisshome-research/README.md
title: ioBroker KISSHome исследование
hash: wjt8/4j+SR/hP41gz6ztVLW+12/LVqGLIvB0ErLzBAk=
---
![Логотип](../../../en/adapterref/iobroker.kisshome-research/admin/kisshome-research.png)

![Количество установок](http://iobroker.live/badges/kisshome-research-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.kisshome-research.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.kisshome-research.svg)

# IoBroker KISSHome исследование
![Тест и выпуск](https://github.com/ioBroker/ioBroker.kisshome-research/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/kisshome-research/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Этот специальный адаптер был разработан для исследовательского проекта KISSHome. Он не предназначен для общего использования.

Чтобы использовать этот адаптер, вам необходимо сначала зарегистрироваться на сайте [KISSДомашние исследования](https://kisshome-feldversuch.if-is.net) и получить письмо с подтверждением.

Для запуска этого адаптера вам необходимо:

- Более 3-х устройств умного дома
- Маршрутизатор Fritz!Box. Без `Fritz!Box` адаптер работать не будет.
- iobroker должен работать на Debian/Raspbian (или, по крайней мере, на Linux, где доступны следующие команды: `which`, `rsync`)

## То, что нужно сделать
Определить IP-адреса из:

- [X] hm-rpc (Homematic CCU),
- [X] локсон,
- [X] Шелли,
- [X] mqtt
- [X] тр-064,
- [-] alexa-2 - невозможно, так как alexa не считывает IP-адреса
- [X] сонофф,
- [X] модбус,
- [X] оттенок (оттенок Philips),
- [-] туя - невозможно, он общается с облаком
- [X] mqtt-клиент,
- [-] synology - это многофункциональное устройство - игнорируйте его,
- [X] сонос,
- [X] михоум-вакуум,
- [ ] hmip (Homematic Cloud),
- [ ] хоумконнект,
- [ ] светодиод (ESP8266/ESP32),
- [ ] объединить,
- [X] гармония,
- [ ] самсунг (телевизор),
- [ ] onvif (Веб-камеры),
- [ ] камеры (URL или IP-камеры),
- [ ] проксмокс,
- [ ] бродлинк2,
- [ ] lgtv,
- [ ] knx (KNX-шлюз),
- [ ] лкн,
- [ ] контроллер homekit,
- [ ] уппнп,
- [X] openknx,
- [ ] мерос

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 0.3.1 (2024-08-31)
* (bluefox) Added detection of some IPs

### 0.2.1 (2024-08-28)
* (bluefox) used valid URL address

### 0.1.1 (2024-08-20)
* (bluefox) Used MD5 for the file consistency check

### 0.1.0 (2024-08-19)
* (bluefox) File upload was implemented

### 0.0.3 (2024-08-14)
* (bluefox) Added the recording enabled option

### 0.0.2 (2024-07-22)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2024 Denis Haev <dogafox@gmail.com>

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