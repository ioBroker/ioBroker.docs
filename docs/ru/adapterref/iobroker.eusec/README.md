---
chapters: {"pages":{"en/adapterref/iobroker.eusec/README.md":{"title":{"en":"ioBroker.euSec"},"content":"en/adapterref/iobroker.eusec/README.md"},"en/adapterref/iobroker.eusec/docs/devices.md":{"title":{"en":"Supported devices"},"content":"en/adapterref/iobroker.eusec/docs/devices.md"},"en/adapterref/iobroker.eusec/docs/debugging.md":{"title":{"en":"Debugging"},"content":"en/adapterref/iobroker.eusec/docs/debugging.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.eusec/README.md
title: ioBroker.euSec
hash: Mstau96X0SbJF3LGV9+Jb1hJr3/Edhw6iFo8lpRfquU=
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

> \[!ВАЖНО] Этот адаптер нельзя установить из GitHub

Это адаптер [ioBroker](https://www.iobroker.net) , использующий библиотеку [eufy-security-client](https://github.com/bropat/eufy-security-client) для связи с устройствами Eufy.

**Этот проект не связан с компаниями Anker и Eufy (Eufy Security). Это личный проект, который я поддерживаю в свободное время.**

## Описание

Этот адаптер позволяет управлять [устройствами безопасности Eufy](https://us.eufylife.com/collections/security) , подключаясь к облачным серверам Eufy и локальным/удалённым станциям.

Вам необходимо указать свои учетные данные для входа в облако. Адаптер подключается к вашей облачной учетной записи и запрашивает все данные устройства по протоколу HTTPS. Теперь также поддерживается локальное или удаленное P2P-соединение со станциями/устройствами Eufy. Однако подключение к облаку Eufy всегда является обязательным условием.

Один экземпляр адаптера отобразит все устройства из одной учетной записи Eufy Cloud и позволит вам управлять ими.

## Документация

Ознакомиться с документацией можно [здесь](https://github.com/iobroker-community-adapters/ioBroker.eusec/tree/master/docs) .

## Известные рабочие устройства

Информацию о поддерживаемых устройствах можно найти [здесь](/#/docs/adapterref/iobroker.eusec/docs/devices.md) .

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
### 3.4.0 (2026-10-02)
- (typhosj) Floodlight Cam E30 (T8426): preset positions are now sent to the camera (before, writing `preset_position`, `save_preset_position` or `delete_preset_position` had no effect), and the livestream is no longer rejected with `ERROR_INVALID_ACCOUNT`. The camera now gets the commands of the Floodlight Cam E340, which the library already defines it like (reported in the forum)
- (hdering) **Changed URLs:** without a configured host name, the livestream URLs (states `livestream`, `livestream_rtsp`) now use the IPv4 address in the LAN of the ioBroker host the instance runs on instead of the name of the first ioBroker host (e.g. `http://192.168.1.10:1984/...` instead of `http://iobroker:1984/...`). Tablets, phones and dashboards often cannot resolve the name, and with several hosts the first one is not necessarily the one that runs go2rtc. Visualizations and scripts that store the URL get the new one with the next livestream; to keep a name, enter it in the setting "Hostname"
- (hdering) New setting "Start livestreams on demand": the livestream of a camera starts as soon as its player page or RTSP URL is opened and stops shortly after the last viewer left, so `start_stream` is no longer needed and a dashboard shows a picture right away. A livestream that ends at the maximum duration is started again while somebody still watches. A station carries one livestream at a time: while one of its cameras is watched, the player of another one says which camera that is and starts by itself once the station is free, and a paused player releases the station. Starts the camera acknowledges without sending anything are retried. The states `livestream` and `livestream_rtsp` always carry the URL in this mode. go2rtc's player page and API port have no authentication, so every device in the network that reaches them can wake the cameras. Off by default
- (hdering) New tab "Streams" in the instance settings: every device with a livestream with its station, the player URL to open and the RTSP URL - no need to look the streams up in go2rtc anymore
- (hdering) New setting "Livestream quality": sets the streaming quality of every camera to low, medium or high before its livestream starts, so no camera streams at "Auto", where it changes the resolution mid-stream and browsers show a green or frozen picture. The encoding of battery doorbells ("Medium / Low Encoding") is kept, devices that name their qualities by resolution ("1080P", "2K HD") are left alone. Off by default. The warning about the "Auto" quality is now logged once per device instead of at every livestream start, and names the state to change and the fixed qualities the device offers
- (hdering) New setting "Wait for camera data (sec)", 15 seconds by default: a livestream is no longer given up after 5 seconds without data. Battery cameras that first have to wake up often need longer, and their livestream then ended with "we haven't received any data for 5 seconds" before the first frame
- (hdering) The maximum livestream duration counts from the first picture instead of from the start command, so a camera that needs a minute to wake up no longer loses that minute of its livestream
- (hdering) Livestream: the audio track (or, with a slow camera, the whole stream) no longer breaks after 5 seconds with `socket hang up`. go2rtc drops connections whose request header does not arrive within 5 seconds, and the adapter only sent it with the first data. A livestream that already ended is no longer stopped a second time, which logged a misleading warning

### 3.3.0 (2026-09-21)
- (typhosj) **Breaking:** the tilt down button of pan and tilt cameras is renamed from `titl_down` to `tilt_down`. The update moves the existing object with its name and custom settings (e.g. history); scripts and visualizations that use the old id have to be changed to `tilt_down`
- (typhosj) New setting "Devices with a compatibility stream": the livestream of a camera listed there is re-encoded to 720p H.264, keeping the aspect ratio of the camera, before it reaches the player, which makes it playable on old WebViews, kiosk tablets and hardware decoders that cannot handle the resolution the camera sends. The states `livestream` and `livestream_rtsp` of that camera point at the transcoded stream, the untouched one stays available under the serial number. Transcoding costs CPU on the ioBroker host while such a stream is watched, which is why it is off by default and set per device (#153)
- (typhosj) Talkback: devices with a speaker get the state `talkback_play`. Writing an http(s) URL or an absolute file path to it plays that audio through the device; a livestream is started for it if none is running and stopped again afterwards (#34)
- (typhosj) New setting "Battery devices that stay connected": standalone battery devices on permanent power (power supply or solar panel) listed there keep their P2P connection instead of losing it 30 seconds after the last command, and are reconnected when it drops. It drains the battery of a device that is not on permanent power (#33)
- (typhosj) The eufyCam C31 (T817L) is no longer an unknown device without states; the adapter handles it like the SoloCam Spotlight 1080, which gives it livestream, motion and person detection, light and alarm. Pan and tilt are not available yet (#156)
- (typhosj) Installing the adapter now removes only `--security-revert=CVE-2023-46809` from the node process parameters of an instance instead of clearing them all, so parameters such as `--max-old-space-size` survive an update. A failure there no longer aborts the installation
- (typhosj) Event pictures that arrive in a format the adapter cannot decrypt (e.g. `v8_eufysecurity`) are now loaded from the HomeBase over P2P instead, the way the picture is loaded when the adapter starts. The picture appears about a minute after the event, once the station has stored it (#136)
- (typhosj) Livestreams no longer fail with "RSA_PKCS1_PADDING is no longer supported for private decryption" on node.js builds that refuse RSA PKCS#1 v1.5 decryption; the stream key is now decrypted by node-rsa's own implementation (#144)
- (typhosj) Error messages in the log show the actual error again; before, an error passed along with a log line was written as `{}`, and an error with circular references could not be logged at all
- (typhosj) A device or station property whose state had no value yet now receives its updates; before, such a state stayed empty until the adapter was restarted
- (typhosj) The adapter no longer rewrites the object of every property state on each start, only the ones whose definition actually changed
- (typhosj) A station that disconnects no longer causes warnings about missing `livestream` states for sensors, locks and other devices without a livestream
- (typhosj) The `chime` message command now always answers exactly once: with an error if parameters are missing (before: no answer at all) and only with "not supported" for a station without chime (before: also "chime command sent")
- (typhosj) The state `set_privacy_angle` is named "Set Privacy Angle" instead of "Set Default Angle"; existing objects are renamed on update unless their name was changed by hand
- (typhosj) A channel named "unknown" is no longer deleted on start while it still holds states that have no value yet; only channels without any object below them are removed
- (typhosj) Update migrations compare adapter versions correctly beyond x.9 (3.10.0 was treated as older than 3.9.0)
- (typhosj) Removed unused code and the no longer needed dependencies `@bropat/fluent-ffmpeg` and `fs-extra`

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