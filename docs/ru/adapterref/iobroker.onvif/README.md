---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: V9UpEozWodsw93FDw5msQDnX6MKPUdm5xP4jIMbUMuM=
---
![Логотип](../../../en/adapterref/iobroker.onvif/admin/onvif.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.onvif.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.onvif.svg)
![Количество установок](https://iobroker.live/badges/onvif-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/onvif-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.onvif.png?downloads=true)

# IoBroker.onvif
**Тесты:** ![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.onvif/workflows/Test%20and%20Release/badge.svg)

## ONVIF адаптер для ioBroker
**Адаптер для камер ONVIF**

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Камеры hinzufügen
### Открытие:
Bei jedem Adapterstart wird mit dem in der Einstellungen eingetragen Benutzername und Password eine Discovery durchgeführt und versuch sich in die Kamera einzuloggen. Falls die Kamera noch nicht unter Objekte hinzugefügt wurde.

In den Einstellungen kann man die Discovery manuell ausführen. Falls die Kameras unterschiedliche Zugangsdaten haben müssen die jeweils eingegeben werden und eine discovery durchgeführt werden. Im Log sieht man Details zu dem Prozess.

Damit eine Kamera neu erkannt wird muss sie einfach unter Objekte gelöscht werden.

### Мануэль Суш
Es können Kameras manuell gesucht werden, падает Discovery nicht funktioniert. Dazu muss eine IP Range und Ports eingegeben und manuell ausgeführt werden. Im Log sieht man Details zu dem Prozess.

## Дата в пунктах
onvif.0.IP_PORT.events Events der Kamera wie z.b. Bewegungserkennung. Manchmal muss ein Event ausgelöst werden damit er angezeigt wird.

onvif.0.IP_PORT.general Общая информация о камерах

onvif.0.IP_PORT.info Informationen über die Kamera werden bei Adapterstart aktualisiert oder bei remote.refresh

URL-адрес видео и снимка:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Управление камерой

onvif.0.IP_PORT.remote.refresh Актуализация данных

onvif.0.IP_PORT.remote.gotoHomePosition PTZ-камера в HomePosition установлена

onvif.0.IP_PORT.remote.gotoPreset PTZ Camera Preset Nummer auswählen

onvif.0.IP_PORT.remote.snapshot Создание моментального снимка в onvif.0.IP_PORT.snapshot

## Сообщение
Adapter nimmt Message "snapshot" entgegen und gibt ein Bild zurück

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

# Поток в Вис Эйнбиндене
Wenn Stream in Apple Homekit angezeigt werden soll dann bitte direct in yahka eine camera erzeugen. Если вы не используете nicht funktioniert oder hksv benötigt wird, dann scrypted in einem docker installieren und die Kamera mit onvif и homekit plugin hinzufügen

## Rtsp2Web Докер
Ein Stream работает нормально через поток rtsp. Eine Umwandlung через Motion Eye ist Sehr Resourcen Aufwändig und Hat Ein Verzögerng. Ein Umwandlung в webrtc ist schneller und resourcenschonender. Meine Empfehlung ist ein [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb). Dazu muss ein Docker от ghcr.io/deepch/rtsptoweb:latest erstellt werden.

```
docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest
```

Es muss ein Volume für den Pfad /config und das network as host eingestellt werden.

Dann ist rtsptoweb erreichbar über

```
http://IP:8083
```

Dann kann man ein Stream hinzufügen. Die Stream url найти человека z.B. под `onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### Danach benötigen wir die Stream Id. Dafür Stream Edit und in der URL die Id rauskopieren
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Einzelnen Stream in der Vis einfügen
Dann in der vis ein HTML Objekt Auswählen. Данн виджет в HTML на сервере rtsp2web с идентификатором потока:

<img src="html.png" height="150">

## **Wenn mehrere Stream hinzugefügt werden soll muss `webrtc-url` и `webrtc-video` в html и скрипте с новым идентификатором ersetzt werden z.B. `webrtc-url2` и `webrtc-video2`**
```html
<input
  type="hidden"
  name="webrtc-url"
  id="webrtc-url"
  value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc"
/>

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

В виджете для скриптов используется скрипт:

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

## Все потоки как iFrame
Альтернативное подключение пользователя к обзору камеры, как Iframe: подключение виджета `iFrame` и подключение к серверу rtsp2web:

`http://192.168.0.2:8083/pages/multiview/full?controls`

## FFMpeg Unterstützung
Wenn die Kamera keine Snapshot Unterstützng hat wird mit ffmpeg ein snapshot aus dem rtsp stream erzeugt.

## Сервер моментальных снимков в сети
Адаптер установлен на сервере моментальных снимков без пароля. Dazu Server aktivieren in den Instanzeinstellungen und dann kann der aktuelle Snapshot http://iobrokerIp:8095/CAMERAIP_PORT z.B. http://192.168.0.1:8095/192_168_0_1_80 абгеруфен верден.

In der Vis ein Image Widget einfügen und die Url als Quelle angeben und eine Updatezeit auswählen

## Снимок в vis einbinden
Wenn möglich die snapshotUri verwenden z.B.
onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Den Datenpunkt nicht als Stream verwenden, da sonst die Festplatte zu hohe Last hat._
#### Дата актуализируется через onvif.0.IP_PORT.remote.snapshot
Den Datenpunkt onvif.0.IP_PORT.snapshot ein `String img src` element zuordnen

Другие варианты альтернативных падений

Den Datenpunkt onvif.0.IP_PORT.snapshot как элемент `HTML` в файле с зашифрованным изображением Inhalt

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Neuen Snapshot erzeugen bei Событие:

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    setState("onvif.0.192_168_178_100_80.remote.snapshot", true, false);
  }
});
```

# Английский
## Добавить камеры
### Открытие:
При каждом запуске адаптера выполняется обнаружение с введенными в настройках именем пользователя и паролем и предпринимается попытка входа в камеру. Если камера еще не добавлена в Объекты.

Вы можете выполнить обнаружение вручную в настройках. Если камеры имеют разные учетные данные, вы должны ввести их и выполнить обнаружение. В журнале вы можете увидеть подробности процесса.

Чтобы камера снова обнаружилась, ее нужно просто удалить в разделе «Объекты».

### Ручной поиск
Камеры можно искать вручную, если Discovery не работает. Для этого диапазон IP-адресов и порты необходимо ввести и выполнить вручную. В журнале вы можете увидеть подробности о процессе.

## Точки данных
onvif.0.IP_PORT.events События камеры, такие как, например. обнаружение движения. Иногда вам нужно инициировать событие, чтобы увидеть его.

onvif.0.IP_PORT.general Общая информация о камерах

onvif.0.IP_PORT.infos Информация о камере обновляется только при запуске адаптера или при удаленном обновлении.

URL-адрес видео и снимка:

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

onvif.0.IP_PORT.remote Управление камерой

onvif.0.IP_PORT.remote.refresh Обновление информационных данных

onvif.0.IP_PORT.remote.gotoHomePosition Установить PTZ-камеру в исходное положение

onvif.0.IP_PORT.remote.gotoPreset Выберите номер предустановки PTZ-камеры

onvif.0.IP_PORT.remote.snapshot Сохранить снимок в onvif.0.IP_PORT.snapshot

## Сообщение
Адаптер получает сообщение «моментальный снимок» и возвращает изображение

```javascript
sendTo("onvif.0", "snapshot", "192_168_178_100_80", (result) => {
  if (result) {
    sendTo("telegram.0", {
      text: result,

      type: "photo",

      caption: "camera2",
    });
  }
});
```

## Сообщение о движении в Telegram
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

# Включаем поток в vis
Если поток должен отображаться в Apple Homekit, создайте камеру прямо в yahka. Если это не работает или нужен hksv, установите scrypted в докере и добавьте камеру с плагином onvif и homekit.

## Rtsp2Web Докер
Поток обычно предоставляется через поток rtsp. Это должно быть преобразовано для vis. Моя рекомендация — [RTSPtoWeb](https://github.com/deepch/RTSPtoWeb). Для этого необходимо создать докер из ghcr.io/deepch/rtsptoweb:latest.

```

docker run --name rtsp-to-web -v /YOURPATHFORCONFIG:/config --network host ghcr.io/deepch/rtsptoweb:latest

```

Вы должны установить том для пути /config и сети в качестве хоста.

Тогда rtsptoweb доступен через

```

http://IP:8083

```

Затем вы можете добавить поток. URL-адрес потока можно найти, например. под

`onvif.0.IP_PORT.infos.streamUris.ProfileName.live_stream_tcp.uri`

<img src="addstream.png" height="600">

### После этого нам нужен идентификатор потока. Для этого нам нужен Stream Edit и в URL копируем Id
`http://192.168.178.2:8083/pages/stream/edit/ddbdb583-9f80-4b61-bafa-613aa7a5daa5`

## Вставьте одиночный поток в визуализацию
Затем выберите объект HTML в окне просмотра. Затем в виджете под HTML введите сервер rtsp2web с идентификатором потока:

<img src="html.png" height="150">

## **Если необходимо добавить более одного потока, `webrtc-url` и `webrtc-video` необходимо заменить в html и скрипте новым идентификатором, например. `webrtc-url2` и `webrtc-video2`.**
```html
<input type="hidden name="webrtc-url" id="webrtc-url"
value="http://192.168.0.2:8083/stream/ddbdb583-9f80-4b61-bafa-613aa7a5daa5/channel/0/webrtc" />

<video id="webrtc-video" autoplay muted playsinline controls style="max-width: 100%; max-height: 100%;"></video>
```

В виджете под скриптами добавьте этот скрипт:

```javascript
setTimeout(function () {

  function startPlay(videoEl, url) {

    const webrtc = new RTCPeerConnection({

      iceServers: [

        {

          urls: ["stun:stun.l.google.com:19302"]

        },

      ],

      { "sdpSemantics": [ "unified-plan" ], [ "unified-plan"], [ "unified-plan"],

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

## Все потоки как iFrame
Кроме того, вы также можете добавить обзор камеры в виде iframe:

Добавьте виджет `iFrame` и укажите сервер rtsp2web в качестве источника:

`http://192.168.0.2:8083/pages/multiview/full?controls`

## Поддержка FFMpeg
Если камера не поддерживает моментальные снимки, ffmpeg создаст снимок из потока rtsp.

## Включить сервер моментальных снимков в vis
Адаптер предлагает сервер моментальных снимков без пароля. Активируйте сервер в настройках экземпляра, и тогда вы сможете получить текущий снимок http://iobrokerIp:8095/CAMERAIP_PORT, например. http://192.168.0.1:8095/192_168_0_1_80.

Вставьте виджет изображения в визу и укажите URL-адрес в качестве источника и выберите время обновления.

## Включить снимок в vis
Если возможно, используйте snapshotUri, например.

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

### _Не используйте точку данных в качестве потока, иначе нагрузка на диск будет слишком высокой._
#### Обновление точки данных через onvif.0.IP_PORT.remote.snapshot
Назначьте элемент `String img src` точке данных onvif.0.IP_PORT.snapshot.

Или как альтернатива, если `String img src` не работает

Вставьте точку данных onvif.0.IP_PORT.snapshot как элемент `HTML` в визу со следующим содержимым

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

Создать новый снимок по событию:

```javascript
on("onvif.0.192_168_178_100_80.events.RuleEngine/CellMotionDetector/Motion", (obj) => {
  if (obj.state.val === true) {
    setState("onvif.0.192_168_178_100_80.remote.snapshot", true, false);
  }
});
```

## Обсуждения / Обсуждения и обсуждения
<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

### 1.0.5

- Improve event handling

### 1.0.4

- (TA2k) Minor bugfixes and readme update for livestream in vis

### 1.0.3

- (TA2k) Minor bugfixes

### 1.0.2

- (TA2k) Fixed a reonnect and empty event bug

### 1.0.1

- (TA2k) initial new release

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