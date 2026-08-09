---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: zq9DV1BOr3VI3pXcPtQRTJUyRJslFvIWQbwrUyf01cs=
---
![Логотип](../../../en/adapterref/iobroker.onvif/admin/onvif.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.onvif.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![Количество установок](https://iobroker.live/badges/onvif-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/onvif-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.onvif.png?downloads=true)

# IoBroker.onvif
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

## ONVIF-адаптер для ioBroker
**Адаптер для ONVIF-камер**

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

[zur deutschen Dokumentation](README-de.md)

## Добавить камеры
### Открытие:
При каждом запуске адаптера выполняется поиск с использованием имени пользователя и пароля, введенных в настройках, и предпринимается попытка входа в камеру. Если камера еще не добавлена в раздел «Объекты».

Обнаружение можно выполнить вручную в настройках. Если у камер разные учетные данные, вам нужно будет ввести их и выполнить обнаружение. В журнале вы увидите подробности процесса.

Для того чтобы камера снова была обнаружена, её достаточно просто удалить в разделе «Объекты».

### Ручной поиск
Если функция обнаружения не работает, поиск камер можно выполнить вручную. Для этого необходимо ввести диапазон IP-адресов и портов и выполнить поиск вручную. В журнале можно увидеть подробности процесса.

## Штаты
onvif.0.IP_PORT.events События камеры, например, обнаружение движения. Иногда для просмотра события необходимо его инициировать.

onvif.0.IP_PORT.general Общая информация о камерах

Информация о камере в файле onvif.0.IP_PORT.infos обновляется только при запуске адаптера или при выполнении команды remote.refresh.

Ссылки на видео и снимки экрана:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Управление камерой

onvif.0.IP_PORT.remote.refresh Обновление информационных данных

onvif.0.IP_PORT.remote.gotoHomePosition Установить PTZ-камеру в исходное положение

onvif.0.IP_PORT.remote.gotoPreset Выберите номер предустановки PTZ-камеры

onvif.0.IP_PORT.remote.snapshot Сохранить снимок в onvif.0.IP_PORT.napshot

## Сообщение
Адаптер получает сообщение "снимок" и возвращает изображение.

```javascript
sendTo('onvif.0', 'snapshot', '192_168_178_100_80', (result) => {
  if (result) {
    sendTo('telegram.0', {
      text: result,

      type: 'photo',

      caption: 'camera2',
    });
  }
});
```

## Отправьте сообщение в Telegram
```javascript
on('onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion', (obj) => {
  if (obj.state.val === true) {
    sendTo('onvif.0', 'snapshot', '192_168_178_100_80', (result) => {
      if (result) {
        sendTo('telegram.0', {
          text: result,

          type: 'photo',

          caption: 'Camera 2',
        });
      }
    });
  }
});
```

## Включить поток в визуализацию
Если потоковое изображение должно отображаться в Apple HomeKit, создайте камеру непосредственно в Yahka. Если это не сработает или требуется HKSV, установите Scrypted в Docker и добавьте камеру с ONVIF и плагином HomeKit.

## Go2rtsp Docker
Поток обычно передается через RTSP. Преобразование через MotionEye очень ресурсоемко и сопровождается задержкой. Преобразование в WebRTC происходит быстрее и экономит ресурсы. Я рекомендую использовать [go2rtsp](https://github.com/AlexxIT/go2rtc). Для этого необходимо создать Docker-контейнер из alexxit/go2rtc.

https://hub.docker.com/r/alexxit/go2rtc

```
 image: alexxit/go2rtc
    network_mode: host # important for WebRTC, HomeKit, UDP cameras
    privileged: true # only for FFmpeg hardware transcoding
    restart: unless-stopped # autorestart on fail or config change from WebUI
    environment:
      - TZ=Europe/Berlin # timezone in logs
    volumes:
      - "~/go2rtc:/config" # folder for go2rtc.yaml file (edit from WebUI)
```

Необходимо указать в качестве пути /config том, а в качестве хоста — сеть.

Затем доступ к go2rtsp осуществляется через

```
http://IP:1984
```

Затем вы можете добавить поток. URL-адрес потока можно найти, например, в разделе `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addgo.png" height="300">

### Вставить поток как iFrame
Добавьте виджет `iFrame` в Vis и используйте ссылку на поток от go2rtsp в качестве источника.

`http://192.168.178.1:1984/stream.html?src=camera&mode=webrtc`

## Rtsp2Web Docker
Альтернативным вариантом является Docker-контейнер [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb). Однако его настройка сложнее.
Docker-контейнер необходимо создать из ghcr.io/deepch/rtsptoweb:latest.

<details>

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

Необходимо указать том для пути /config, а сеть должна быть настроена как хост.

Затем доступ к rtsptoweb можно получить через

```
http://IP:8083
```

Затем вы можете добавить поток. URL-адрес потока можно найти, например, в разделе `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Затем нам нужен идентификатор потока. Для этого отредактируйте поток и скопируйте идентификатор из URL-адреса.
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Вставка отдельного потока в визуализацию
Затем выберите HTML-объект в виджете. После этого в поле HTML введите адрес rtsp2web-сервера с идентификатором потока:

<img src="html.png" height="150">

## **Если необходимо добавить несколько потоков, идентификаторы `webrtc-url` и `webrtc-video` в HTML и скрипте необходимо заменить новыми идентификаторами, например, `webrtc-url2` и `webrtc-video2`**
```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

Добавьте этот скрипт в виджет в разделе «Скрипты»:

```javascript
setTimeout(function () {
  function startPlay(videoEl, url) {
    const webrtc = new RTCPeerConnection({
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302'],
        },
      ],
      sdpSemantics: 'unified-plan',
    });
    webrtc.ontrack = function (event) {
      console.log(event.streams.length + ' track is delivered');
      videoEl.srcObject = event.streams[0];
      videoEl.play();
    };
    webrtc.addTransceiver('video', { direction: 'sendrecv' });
    webrtc.onnegotiationneeded = async function handleNegotiationNeeded() {
      const offer = await webrtc.createOffer();

      await webrtc.setLocalDescription(offer);

      fetch(url, {
        method: 'POST',
        body: new URLSearchParams({ data: btoa(webrtc.localDescription.sdp) }),
      })
        .then((response) => response.text())
        .then((data) => {
          try {
            webrtc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: atob(data) }));
          } catch (e) {
            console.warn(e);
          }
        });
    };

    const webrtcSendChannel = webrtc.createDataChannel('rtsptowebSendChannel');
    webrtcSendChannel.onopen = (event) => {
      console.log(`${webrtcSendChannel.label} has opened`);
      webrtcSendChannel.send('ping');
    };
    webrtcSendChannel.onclose = (_event) => {
      console.log(`${webrtcSendChannel.label} has closed`);
      startPlay(videoEl, url);
    };
    webrtcSendChannel.onmessage = (event) => console.log(event.data);
  }

  const videoEl = document.querySelector('#webrtc-video');
  const webrtcUrl = document.querySelector('#webrtc-url').value;

  startPlay(videoEl, webrtcUrl);
}, 1000);
```

<img src="widgetskript.png" height="200">

## Все потоки в формате iFrame
В качестве альтернативы вы также можете вставить обзор камеры в виде iframe: добавьте виджет `iFrame` и укажите сервер rtsp2web в качестве источника:

`http://192.168.0.2:8083/pages/multiview/full?controls`

</details>

## Поддержка FFMpeg
Если камера не поддерживает создание снимков, ffmpeg создаст снимок из потока RTSP.

## Включение сервера снимков в визуализацию
Адаптер предоставляет сервер моментальных снимков без пароля. Активируйте сервер в настройках экземпляра, и вы сможете получить текущий моментальный снимок по адресу http://iobrokerIp:8095/CAMERAIP_PORT, например, http://192.168.0.1:8095/192_168_0_1_80.

Вставьте виджет изображения в визуализацию, укажите URL-адрес в качестве источника и выберите время обновления.

## Включить снимок в визуализацию
По возможности используйте snapshotUri, например:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Не используйте состояние в качестве потока, иначе нагрузка на диск будет слишком высокой._
#### Обновление состояния через onvif.0.IP_PORT.remote.snapshot
Присвойте элемент `String img src` состоянию onvif.0.IP_PORT.snapshot.

Или в качестве альтернативы, если `String img src` не работает.

Вставьте элемент состояния onvif.0.IP_PORT.snapshot как `HTML` в vis со следующим содержимым.

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Создать новый снимок события:

```javascript
on('onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion', (obj) => {
  if (obj.state.val === true) {
    setState('onvif.0.192_168_178_100_80.remote.snapshot', true, false);
  }
});
```

## Обсуждение (на немецком языке)
<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.6 (2026-08-08)

- (TA2k) Faster reconnect after a camera reboot (detection in ~30-50s instead of ~4min)
- (TA2k) Connection state now reflects the real reconnect instead of flipping back to true too early
- (TA2k) Throttled the repeated event error log messages during a reboot

### 1.1.5 (2026-08-06)

- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 1.1.4 (2024-05-27)

- update onvif lib to support newer TAPO cameras
- (mcm1957) Adapter requires nodejs >=18 now.

### 1.1.3 (2024-03-15)

- Allow non number PTZ presets

### 1.1.2 (2023-12-29)

- (TA2k) Catch callback error

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023-2024 TA2k <tombox2020@gmail.com>

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