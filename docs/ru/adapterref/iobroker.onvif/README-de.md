---
chapters: {"pages":{"en/adapterref/iobroker.onvif/README.md":{"title":{"en":"ioBroker.onvif"},"content":"en/adapterref/iobroker.onvif/README.md"},"en/adapterref/iobroker.onvif/README-de.md":{"title":{"en":"ioBroker.onvif"},"content":"en/adapterref/iobroker.onvif/README-de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onvif/README-de.md
title: ioBroker.onvif
hash: v1KN29h+PcNGNw+3xNzN1u1LugBoq+wLrq4xiCSSCYM=
---
![Логотип](../../../en/adapterref/iobroker.onvif/admin/onvif.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.onvif.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![Количество установок](https://iobroker.live/badges/onvif-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/onvif-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.onvif.png?downloads=true)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

# ioBroker.onvif

## ONVIF-адаптер для ioBroker

**Адаптер для ONVIF-камер**

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Kameras hinzufügen

### Открытие:

Сначала адаптер запустится с ним в Einstellungen eingetragen Benutzername и Passwort eine Discovery, чтобы сохранить его и использовать в камере. Falls die Kamera noch nicht unter Objekte hinzugefügt wurde.

В ден Einstellungen человек может умереть Discovery вручную. Falls die Kameras unterschiedliche Zugangsdaten haben müssen die Jeweils eingegeben werden und Eine Discovery durchgeführt werden. Im Log sieht man Подробности о процессе.

Дамит вашей камеры не может быть использован в качестве объекта съемки.

### Мануэль Суше

Если камера не работает вручную, Discovery не работает. Вы должны указать диапазон IP-адресов и порты, а также вручную изменить их. Im Log sieht man Подробности о процессе.

## Точки данных

onvif.0.IP\_PORT.events События камеры, связанные с Bewegungserkennung. Manchmal muss ein Event ausgelöst werden damit er angezeigt wird.

onvif.0.IP\_PORT.general Общая информация о камерах

onvif.0.IP\_PORT.info Информация о камере включена в адаптере, актуализирована или удалена.обновить

URL видео и снимков:

onvif.0.IP\_PORT.infos.streamUris.MediaProfile\_Channel1\_MainStream.snapshotUrl.uri

onvif.0.IP\_PORT.remote Управление камерой

onvif.0.IP\_PORT.remote.refresh Актуализация информационных данных

onvif.0.IP\_PORT.remote.gotoHomePosition PTZ-камера в настройках HomePosition

onvif.0.IP\_PORT.remote.gotoPreset Номер предустановки PTZ-камеры

onvif.0.IP\_PORT.remote.snapshot Выведите снимок экрана под onvif.0.IP\_PORT.snapshot

## Сообщение

Адаптер nimmt Сообщение «снимок» entgegen und gibt ein Bild zurück

```javascript
sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
  if (result) {
    sendTo("telegram.0", {
      text: result,
      type: "photo",
      caption: "Kamera 2",
    });
  }
});
```

## Bewegungsmeldung zu Telegram

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
      if (result) {
        sendTo("telegram.0", {
          text: result,
          type: "photo",
          caption: "Camera 2",
        });
      }
    });
  }
});
```

# Stream in vis einbinden

Включите потоковую передачу в Apple Homekit, чтобы увидеть, как это происходит, прямо в вашей камере. Если эта функция не работает или hksv хорошо работает, если вы зашифровали ее в einem docker, установите и установите камеру с onvif и плагином Homekit.

## go2rtsp Docker

Ein Stream работает нормально через поток rtsp. Умение с помощью движения глаз — это дополнительный ресурс и возможность просмотра. Ein Umwandlung в webrtc — это шнеллер и ресурсодержатель. Meine Empfehlung ist ein [go2rtsp](https://github.com/AlexxIT/go2rtc) . Dazu должен использовать Docker от alexxit/go2rtc в другом месте. <https://hub.docker.com/r/alexxit/go2rtc>

Доступна любая версия с аппаратным обеспечением: <https://github.com/AlexxIT/go2rtc/wiki/Hardware-acceleration>

Для локальной установки go2rtc: <https://forum.iobroker.net/post/1031526>

```
 image: alexxit/go2rtc
    network_mode: host       # important for WebRTC, HomeKit, UDP cameras
    privileged: true         # only for FFmpeg hardware transcoding
    restart: unless-stopped  # autorestart on fail or config change from WebUI
    environment:
      - TZ=Europe/Berlin  # timezone in logs
    volumes:
      - "~/go2rtc:/config"   # folder for go2rtc.yaml file (edit from WebUI)
```

Это должен быть том для Pfad /config и Netzwerk как Host eingestellt werden.

Dann ist go2rtsp erreichbar über

```
http://IP:1984
```

Dann kann man ein Stream hinzufügen. URL-адрес Die Stream findet man zB unter`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addgo.png" height="300">

### Stream als iFrame einfügen

Виджет`iFrame` в der Vis hinzufügen und als Quelle den Stream Link von go2rtsp verwenden

`http://192.168.178.1:1984/stream.html?src=camera&mode=webrtc`

Unterlinks kann noch die Art des Players ausgewählt werden (Микрофон)

## Rtsp2Web Docker

Альтернатива — это [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb) Docker. Dies ist aber von der Einrichtun komplizierter. Dazu muss ein Docker von ghcr.io/deepch/rtsptoweb:latest erstellt werden.

<details>

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

Это должен быть том для Pfad /config и сети, в которой находится хост.

Dann ist rtsptoweb erreichbar über

```
http://IP:8083
```

Dann kann man ein Stream hinzufügen. URL-адрес Die Stream findet man zB unter`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Получите выгоду от идентификатора потока. Dafür Stream Edit и URL-адрес подтвержден

`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Ручей Эйнзельнен в дер Вис Эйнфюген

Ознакомьтесь с вашим HTML-объектом. Данн в виджете в HTML на сервере rtsp2web с идентификатором потока внутри:

<img src="html.png" height="150">

## **Wenn mehrere Stream hinzugefügt werden soll muss`webrtc-url` унд`webrtc-video` в формате html и скрипт с новым идентификатором ersetzt werden zB`webrtc-url2` унд`webrtc-video2`**

```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

В этих виджетах для скриптов используются следующие скрипты:

```javascript
setTimeout(function () {
  function startPlay(videoEl, url) {
    const webrtc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302"],
        },
      ],
      sdpSemantics: "unified-plan",
    });
    webrtc.ontrack = function (event) {
      console.log(event.streams.length + " track is delivered");
      videoEl.srcObject = event.streams[0];
      videoEl.play();
    };
    webrtc.addTransceiver("video", { direction: "sendrecv" });
    webrtc.onnegotiationneeded = async function handleNegotiationNeeded() {
      const offer = await webrtc.createOffer();

      await webrtc.setLocalDescription(offer);

      fetch(url, {
        method: "POST",
        body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) }),
      })
        .then((response) => response.text())
        .then((data) => {
          try {
            webrtc.setRemoteDescription(new RTCSessionDescription({ type: "answer", sdp: atob(data) }));
          } catch (e) {
            console.warn(e);
          }
        });
    };

    const webrtcSendChannel = webrtc.createDataChannel("rtsptowebSendChannel");
    webrtcSendChannel.onopen = (event) => {
      console.log(`${webrtcSendChannel.label} has opened`);
      webrtcSendChannel.send("ping");
    };
    webrtcSendChannel.onclose = (_event) => {
      console.log(`${webrtcSendChannel.label} has closed`);
      startPlay(videoEl, url);
    };
    webrtcSendChannel.onmessage = (event) => console.log(event.data);
  }

  const videoEl = document.querySelector("#webrtc-video");
  const webrtcUrl = document.querySelector("#webrtc-url").value;

  startPlay(videoEl, webrtcUrl);
}, 1000);
```

<img src="widgetskript.png" height="200">

## Alle Streams als iFrame

Альтернативный вариант, который можно использовать для обзора камеры как Iframe einfügen: Das Widget`iFrame` Рекомендации и другие сведения о сервере rtsp2web внутри:

`http://192.168.0.2:8083/pages/multiview/full?controls`

</details>

## FFMpeg Unterstützung

Когда камера будет сделана моментальный снимок, вы сможете сделать снимок с помощью ffmpeg или RTSP-потока.

## Сервер моментальных снимков в vis einbinden

Адаптер содержит сервер моментальных снимков без пароля и пароля. Сервер Dazu активируется в мгновенном режиме и может быть сделан снимок экрана <http://iobrokerIp:8095/CAMERAIP_PORT> zB <http://192.168.0.1:8095/192_168_0_1_80> .

В виджете изображения можно найти и указать URL-адрес, который будет отображаться и обновляться автоматически

## Snapshot in vis einbinden

Когда вы можете использовать snapshotUri, zB onvif.0.IP\_PORT.infos.streamUris.MediaProfile\_Channel1\_MainStream.snapshotUrl.uri

### _Den Datenpunkt nicht als Stream verwenden, da sonst die Festplatte zu hohe Last Hat._

#### Den Datenpunkt актуализируется через onvif.0.IP\_PORT.remote.snapshot

Den Datenpunkt onvif.0.IP\_PORT.snapshot ein`String img src` элемент зуорднен

Oder als Alternative falls`String img src` nicht funktioniert

Den Datenpunkt onvif.0.IP\_PORT.snapshot als`HTML` элемент в умирании от einfügen mit folgendem Inhalt

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Новый моментальный снимок события:

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    setState("onvif.0.192_168_178_100_80.remote.snapshot", true, false);
  }
});
```

## Discussion und Fragen

<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

Das Changelog findet sich in der englischen README.md.

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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

```

```