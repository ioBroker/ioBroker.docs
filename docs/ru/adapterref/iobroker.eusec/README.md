---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eusec/README.md
title: ioBroker.euSec
hash: EoqRf/yEagOqrnNE0pySy7GA/XyPYslWRTZXlgP8y5U=
---
![Логотип](../../../en/adapterref/iobroker.eusec/docs/_media/ioBroker.euSec.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.eusec.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.eusec.svg)
![Общее количество загрузок](https://img.shields.io/npm/dt/iobroker.eusec.svg)
![Требования к версии Node.](https://img.shields.io/node/v/iobroker.eusec)
![Количество установок (последние)](https://iobroker.live/badges/eusec-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/eusec-stable.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.eusec)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.eusec/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.eusec.png?downloads=true)

# ioBroker.euSec

Это адаптер [ioBroker](https://www.iobroker.net) , использующий библиотеку [eufy-security-client](https://github.com/bropat/eufy-security-client) для связи с устройствами Eufy.

**Этот проект не связан с компаниями Anker и Eufy (Eufy Security). Это личный проект, который я поддерживаю в свободное время.**

## Описание

Этот адаптер позволяет управлять [устройствами безопасности Eufy](https://us.eufylife.com/collections/security) , подключаясь к облачным серверам Eufy и локальным/удалённым станциям.

Вам необходимо указать свои учетные данные для входа в облако. Адаптер подключается к вашей облачной учетной записи и запрашивает все данные устройства по протоколу HTTPS. Теперь также поддерживается локальное или удаленное P2P-соединение со станциями/устройствами Eufy. Однако подключение к облаку Eufy всегда является обязательным условием.

Один экземпляр адаптера отобразит все устройства из одной учетной записи Eufy Cloud и позволит вам управлять ими.

## Документация

Ознакомиться с документацией можно [здесь](https://iobroker-community-adapters.github.io/ioBroker.eusec/) .

## Известные рабочие устройства

Информацию о поддерживаемых устройствах можно найти [здесь](https://github.com/bropat/eufy-security-client#known-working-devices) .

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы Патрика Броэтто (brobat) <https://github.com/bropat> , который разработал предыдущие версии этого адаптера.

## Обновление с адаптера версии 2.x или более старой.

Добавлен адаптер 2.x и более старых версий. `--security-revert=CVE-2023-46809` к параметрам процесса Node.js каждого экземпляра, работающего на Node.js 18 или 20. Node.js 22 и более новые версии отказываются запускать экземпляр с этим флагом, и для этого адаптера требуется Node.js 24.

Установка этого адаптера автоматически удаляет флаг из всех экземпляров eusec; остальные параметры процесса узла сохраняются. Если экземпляр по-прежнему не запускается и в его журнале отображается следующее: `--security-revert=CVE-2023-46809` Удалите параметры вручную и перезапустите экземпляр:

```
iobroker object set system.adapter.eusec.0 common.nodeProcessParams=[]
```

Подробное описание (на немецком языке) доступно на нашем форуме ( <https://forum.iobroker.net/topic/82651/test-adapter-eusec-v2-0-x> ).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (typhosj) Talkback: devices with a speaker get the state `talkback_play`. Writing an http(s) URL or an absolute file path to it plays that audio through the device; a livestream is started for it if none is running and stopped again afterwards (#34)
- (typhosj) New setting "Battery devices that stay connected": standalone battery devices on permanent power (power supply or solar panel) listed there keep their P2P connection instead of losing it 30 seconds after the last command, and are reconnected when it drops. It drains the battery of a device that is not on permanent power (#33)
- (typhosj) Installing the adapter now removes only `--security-revert=CVE-2023-46809` from the node process parameters of an instance instead of clearing them all, so parameters such as `--max-old-space-size` survive an update. A failure there no longer aborts the installation
- (typhosj) Livestreams no longer fail with "RSA_PKCS1_PADDING is no longer supported for private decryption" on node.js builds that refuse RSA PKCS#1 v1.5 decryption; the stream key is now decrypted by node-rsa's own implementation (#144)
- (typhosj) The eufyCam C31 (T817L) is no longer an unknown device without states; the adapter handles it like the SoloCam Spotlight 1080, which gives it livestream, motion and person detection, light and alarm. Pan and tilt are not available yet (#156)

### 3.2.1 (2026-09-18)
- (typhosj) An event picture that cannot be decoded no longer replaces the last picture with a `<serial>.unknown` file; `picture_url` and `picture_html` keep the previous picture and a warning names the device, the data length and the image format (#136)

### 3.2.0 (2026-09-15)
- (typhosj) Pan and tilt cameras expose their four PTZ preset positions: `preset_position` moves the camera to a preset, `save_preset_position` stores the current position in one and `delete_preset_position` clears one. The states are only created for devices that report the matching command (#155)

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