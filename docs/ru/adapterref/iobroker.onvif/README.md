---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.onvif/README.md
title: ioBroker.onvif
hash: F2tuDV4GbZhUASUcdgAfL+tR0mD3CzRd1Q4dFl1UGcY=
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

## Включить снимок в vis
Используйте URL-адрес моментального снимка, когда это возможно

onvif.0.IP_PORT.infos.streamUris.MediaProfile_Channel1_MainStream.snapshotUrl.uri

Не используйте эту точку данных в качестве потока, поскольку нагрузка на жесткий диск слишком высока.

Назначьте элемент `String img src` точке данных onvif.0.IP_PORT.snapshot

Добавьте точку данных onvif.0.IP_PORT.snapshot как элемент `HTML` в vis со следующим содержимым

```javascript
<img src="{onvif.0.IP_PORT.snapshot}" width="500px" />
```

## Обсуждения / Обсуждения и обсуждения
<https://forum.iobroker.net/topic/63145/test-adapter-onvif-camera-v1-0-0>

## Changelog

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