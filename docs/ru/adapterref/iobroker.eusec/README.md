---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eusec/README.md
title: ioBroker.euSec
hash: C77/s6KN2XAqArbUPAGdpTKiVWkd9yskKbayitLGYqU=
---
![Логотип](../../../en/adapterref/iobroker.eusec/docs/_media/ioBroker.euSec.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.eusec.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.eusec.svg)
![Общее количество загрузок](https://img.shields.io/npm/dt/iobroker.eusec.svg)
![Требования к версии Node.](https://img.shields.io/node/v/iobroker.eusec)
![Количество установок (последние)](https://iobroker.live/badges/eusec-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/eusec-stable.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.eusec)
![НПМ](https://nodei.co/npm/iobroker.eusec.png?downloads=true)

# ioBroker.euSec

**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.eusec/workflows/Test%20and%20Release/badge.svg)

Это [ioBroker](https://www.iobroker.net) адаптер, который использует [eufy-security-client](https://github.com/bropat/eufy-security-client) библиотека для связи с устройствами Eufy.

**Этот проект не связан с компаниями Anker и Eufy (Eufy Security). Это личный проект, который я поддерживаю в свободное время.**

## Описание

Этот адаптер позволяет вам управлять [охранные устройства Eufy](https://us.eufylife.com/collections/security) путем подключения к облачным серверам Eufy и локальным/удаленным станциям.

Вам необходимо указать свои учетные данные для входа в облако. Адаптер подключается к вашей облачной учетной записи и запрашивает все данные устройства по протоколу HTTPS. Теперь также поддерживается локальное или удаленное P2P-соединение со станциями/устройствами Eufy. Однако подключение к облаку Eufy всегда является обязательным условием.

Один экземпляр адаптера отобразит все устройства из одной учетной записи Eufy Cloud и позволит вам управлять ими.

## Документация

Ознакомьтесь с документацией. [здесь](https://iobroker-community-adapters.github.io/ioBroker.eusec/).

## Известные рабочие устройства

Информацию о поддерживаемых устройствах можно найти здесь. [здесь](https://github.com/bropat/eufy-security-client#known-working-devices).

## Кредиты

Создание этого адаптера было бы невозможно без огромной работы Патрика Броэтто (brobat). <https://github.com/bropat>, который создал предыдущие версии этого адаптера.

## ВАЖНАЯ информация при обновлении до Node.js 22

Адаптер версии 2.0.3 и более новых поддерживает Node.js 22. Более ранние версии Node.js требовали специальной настройки, которая стала недействительной с выходом Node.js 22. Поэтому при обновлении Node.js с любой версии ниже 22.xx до Node.js 22, пожалуйста, выполните следующие шаги:

- Если у вас установлены Node.js версии < 22 и адаптер версии < 2.0.0, сначала обновите Node.js, а затем установите адаптер версии 2.0.3.
- Если у вас установлен адаптер версии >= 2.0.0 с любой версией Node.js до 22, вам НЕОБХОДИМО переустановить адаптер. Подробное описание (на немецком языке) доступно на нашем форуме.<https://forum.iobroker.net/topic/82651/test-adapter-eusec-v2-0-x>)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 3.1.0 (2026-09-03)
- (typhosj) The adapter requires node.js >= 24 now as`eufy-security-client` 4.x requires `node >=24` itself
- (typhosj) The `livestream`, `livestream_rtsp` and `rtsp_stream_url` states are emptied instead of deleted when a stream ends. 
- (typhosj) Removed the "HTTPS streaming url" setting. The adapter never configures TLS for go2rtc and go2rtc ignores `api.tls_listen` without a certificate, so the option only ever produced a livestream URL that could not be opened. The URL is built with `http` now
- (typhosj) The livestream page (`http://<host>:1984/stream.html?src=<serial>`) is now served by the adapter, with the defaults that make a stream unstable on weak clients such as a Fire tablet
- (typhosj) The `livestream` state now carries `&background=false`, so the player disconnects while its page is not visible. Without it the browser keeps decoding behind a switched off display and leaves a consumer attached that never recovers once the producer is gone
- (typhosj) go2rtc serves its web pages from the adapter directory now (`api.static_dir`). That replaces the files embedded in go2rtc, so the stream list, the log page, the link list and the WebRTC viewer are shipped along and keep answering.

### 3.0.2 (2026-09-02)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (@GermanBluefox) Refactoring
- (@GermanBluefox) Fixed login failing with `Get passport profile - Response code not ok` since the eufy cloud started answering successful requests with code 200 instead of 0 (see [bropat/eufy-security-client#975](https://github.com/bropat/eufy-security-client/pull/975))
- (typhosj) Fixed livestreaming being broken when go2rtc is configured to use an API port other than 1984, and the eufy livestream is now stopped when streaming into go2rtc fails ([#151](https://github.com/iobroker-community-adapters/ioBroker.eusec/pull/151), [#160](https://github.com/iobroker-community-adapters/ioBroker.eusec/issues/160))
- (typhosj) go2rtc is now supervised and restarted if it terminates unexpectedly, the livestream states are cleared when a station disconnects, and a warning is logged when a camera streams at "Auto" quality ([#152](https://github.com/iobroker-community-adapters/ioBroker.eusec/pull/152))
- (@GermanBluefox) The warning about the "Auto" streaming quality now also covers devices where "Auto" is not value 0 (eufyCam 3, Professional models and battery doorbells)
- (@GermanBluefox) Removed the obsolete CVE-2023-46809 workaround for node.js 20 from the adapter startup
- (@GermanBluefox) Pinned eufy-security-client to 4.1.1-1 and removed the unused packages mime and @types/ffmpeg-static

### 2.0.3 (2025-10-26)
- (mcm1957) Remove fix for CVE-2023-46809 for node.js 22 and newer

### 2.0.0 (2025-10-26)

- (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.3.3 (2024-09-28)

* (bropat) Updated version of the package eufy-security-client (3.1.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (3.1.1)


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 bropat <patrick.broetto@gmail.com>

The web pages in `www/` that go2rtc serves are taken from [go2rtc](https://github.com/AlexxIT/go2rtc),
MIT licensed, Copyright (c) 2022 Alexey Khit. Their license text is in `www/LICENSE.go2rtc`, the list
of files and what was changed is in `www/VENDOR.md`.

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