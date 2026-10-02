---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cameras/README.md
title: ioBroker.cameras
hash: Q7mzLadolyAMlUapsqA2DejZr2K6hW8v0xZ3vxRvdYA=
---
![Логотип](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.cameras.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.cameras
## Адаптер IP-камер для ioBroker
Вы можете интегрировать свои веб/IP-камеры в vis и другие средства визуализации.
Если вы настроите камеру с именем `cam1`, она будет доступна на веб-сервере по адресу `http(s)://iobroker-IP:8082/cameras.0/cam1`.

**Используйте именно этот URL-адрес - без расширения файла.** Каждый запрос к нему получает новый кадр с камеры, поэтому периодическая перезагрузка обеспечивает отображение изображения в реальном времени.

Адаптер дополнительно сохраняет последний кадр в файл под адресом `cameras.0/cam1.jpg`, который веб-сервер также обслуживает под адресом `http(s)://iobroker-IP:8082/cameras.0/cam1.jpg`. Этот файл перезаписывается только при запуске адаптера и при обработке сообщения `image` - он **не** обновляется при запросе. Поэтому при наведении виджета на `.jpg` отображается изображение, которое никогда не обновляется, независимо от заданного интервала обновления.

Кроме того, изображение можно запросить через сообщение:

```js
sendTo('cameras.0', 'image', {
    name: 'cam1',
    width: 100, // optional
    height: 50, // optional
    angle: 90,   // optional
    noCache: true // optional, if you want to get the image not from cache
}, result => {
    const img = 'data:' + result.contentType + ';base64,' + result.data;
    console.log('Show image: ' + img);
});
```

Результат всегда отображается в формате `jpg`.

Поддерживаемые камеры:

- `Reolink E1 Pro` через RTSP (важно, без `Pro` работать не будет)
- `Eufy` через адаптер eusec
- `UniFi Protect` - каждая камера, управляемая консолью UniFi или видеорегистратором (NVR), см. ниже.
- [HiKam](https://support.hikam.de/support/solutions/articles/16000070656-zugriff-auf-kameras-der-2-generation-via-onvif-f%C3%BCr-s6-q8-a7-2-generation-) второго и третьего поколения через ONVIF (для S6, Q8, A7 2. Generation), A7 Pro, A9
- [WIWICam M1 через адаптер HiKam](https://www.wiwacam.com/de/mw1-minikamera-kurzanleitung-und-faq/)
- Поддержка RTSP (если ваша камера поддерживает протокол RTSP)
- Скриншоты через HTTP-адрес - если вы можете получить снимок с вашей камеры через URL-адрес.

### UniFi Protect
Protect передаёт потоковое видео с каждой камеры с консоли, поэтому адрес - это адрес консоли (или NVR), а не камеры. Вместо учётных данных ссылка на поток содержит токен: `rtsp://<console>:7447/<token>` или `rtsps://<console>:7441/<token>?enableSrtp`.
Сам Protect всегда использует эти два порта. Поле *RTSP-порт* необходимо только в том случае, если доступ к консоли осуществляется через переадресацию портов или прокси; если оно пустое, используется настройка RTSPS.

Существует два способа настройки камеры:

- **С помощью ключа API** (Protect 5.3 или новее): создайте ключ в *UniFi OS → Настройки → Панель управления →

В разделе «Интеграции»* введите его вместе с IP-адресом консоли и нажмите *Загрузить камеры*. После этого токен считывается из Protect при каждом запуске, и Protect делает снимки (примерно за 0,3 с, ffmpeg не требуется).
Если у Protect еще нет RTSP-потока для выбранного качества, адаптер включает его - аналогично включению «RTSP» для камеры в пользовательском интерфейсе Protect.

- **Только с токеном**: включите RTSP для камеры в Protect и вставьте ссылку (или только её последнюю часть) в

*Токен потока*. Затем снимки декодируются из потока с помощью ffmpeg.

**Рекомендуется: введите оба параметра.** Ключ API поддерживает актуальность токена - Protect выдает новый токен при выключении и повторном включении RTSP или при повторном подключении камеры, и токен, введенный вручную, перестает работать до тех пор, пока не будет заменен.
Токен сохраняется в качестве резервного: если API недоступен или ключ был удален, поток используется с настроенным токеном, а снимки загружаются из ffmpeg.

Используйте **только токен**, если вы не хотите предоставлять ioBroker ключ API - ключ открывает весь API Protect, все камеры и их настройки, в то время как токен предоставляет доступ только для чтения к одному потоку - или если ваша версия Protect старше 5.3. В обоих случаях для потоковой передачи в реальном времени используется протокол RTSP/RTSPS с токеном; ключ влияет только на снимки и способ получения токена.

Консоль использует самоподписанный сертификат, который не проверяется для этих запросов. Многие камеры Protect отправляют H.265; снимки делаются только из ключевых кадров, в противном случае первое изображение представляет собой серую область. API снимков Protect знает только высокое и низкое разрешение, поэтому *среднее* разрешение соответствует высокому.

### URL изображения
Это обычный URL-запрос, где все параметры находятся в URL. Например, `http://mycam/snapshot.jpg`

### Изображение по URL с базовой аутентификацией
Это запрос изображения по URL, где все параметры указаны в URL, но вы можете указать учетные данные для базовой аутентификации. Например, `http://mycam/snapshot.jpg`

### FFmpeg
Для доступа к снимкам с RTSP-камер можно использовать ffmpeg. Необходимо установить ffmpeg на вашем компьютере:

- В Windows ffmpeg уже скомпилирован, и ничего скачивать не нужно. (Версия для Windows взята отсюда: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z)
- Linux: `sudo apt-get install ffmpeg -y`

Как обновить версию `ffmpeg` для Windows:

- Скачать файл https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z
- Распакуйте файл `bin/ffmpeg.exe`
- Переименовать `ffmpeg.exe` в `win-ffmpeg.exe`
- Заархивируйте файл `win-ffmpeg.exe` в файл `win-ffmpeg.zip`
- Поместите файл `win-ffmpeg.zip` в корневую папку этого репозитория.
- Выполните команду `win-ffmpeg.exe --version`, чтобы получить версию, и сохраните её в константе `WIN_FFMPEG_VERSION` в файле `main.ts` (например, `2025-02-02-git-957eb2323a-full_build-www.gyan.dev`).

Вот пример того, как добавить Reolink E1:

![ртсп](../../../en/adapterref/iobroker.cameras/img/rtsp.png)

### Ezviz - Как повторно включить RTSP для камер EZVIZ
По какой-то причине компания EZVIZ решила отключить протокол RTSP для своих камер:

Откройте приложение EZVIZ и перейдите в: Профиль / Настройки / Просмотр в режиме реального времени по локальной сети
- Начните сканирование, затем выберите «Камера»:
- Войдите в систему, используя пароль от вашей камеры (пароль по умолчанию указан на наклейке камеры).
- Нажмите на значок «Настройки» и выберите «Настройки локальных служб».
- Включить RTSP

## Как добавить новую камеру (для разработчиков)
### Простой способ: новый производитель универсального типа
Большинству камер не требуется никакого кода. Тип `universal` определяется файлами данных в `src-admin/public/data/`, которые генерируются с сайта ispyconnect.com:

1. Добавьте производителя в карту `MANUFACTURERS` в верхней части файла `tools/parser.js`.
2. Запустите `node tools/parser.js <manufacturer>` - это запишет `src-admin/public/data/<manufacturer>.json`

и обновления `manufacturers.json`

3. Запустите `node tools/logos.js`, чтобы добавить логотип. Он использует фирменный знак из `simple-icons`, если это необходимо.

В коллекции указан производитель, в противном случае генерируется монограмма. Чтобы использовать настоящий логотип, просто поместите `<manufacturer>.svg`, `.png` или `.jpg` в `src-admin/public/data/` - существующие файлы никогда не перезаписываются (если не указан `--force`).

Новый производитель затем отображается в выпадающем списке типа камеры «По производителю».

Порт строки данных захватывается только тогда, когда камера, вероятно, принимает его без дополнительных настроек (`PLAUSIBLE_PORTS` в `tools/parser.js`). ispyconnect сохраняет тот порт, через который отправитель подключился к своей камере, что часто представляет собой переадресацию портов маршрутизатора, и это не должно стать значением по умолчанию для каждого владельца модели. Все остальное записывается как `0`, поэтому диалоговое окно предлагает 80 или 554 - и поле порта можно изменить там в любом случае.

### Специализированный тип камеры
Требуется только в том случае, если камере необходима собственная логика. Создайте запрос на слияние (Pull Request) со следующим содержимым:

- `src/types.d.ts` - добавить ключ в объединение `CameraType`, добавить `CameraConfigMyCam extends CameraConfig`

и добавить его в объединение `CameraConfigAny`

- `src/cameras/MyCamCamera.ts` - расширить `GenericCamera` для получения простого HTTP-снимка или `GenericRtspCamera`

для RTSP (заполните `this.settings` и `this.decodedPassword` в `init()` перед вызовом `super.init()`)

- `src/cameras/Factory.ts` - добавить `case` для нового типа
- `src-admin/src/Types/MyCam.tsx` - диалоговое окно настройки, расширяющее `ConfigGeneric`.
- `src-admin/src/Tabs/Cameras.tsx` - импортируйте диалоговое окно и добавьте его в структуру `TYPES`, например:

`mycam: { Config: MyCamConfig as unknown as IConfigGeneric, name: 'MyCam' },`. Ключ должен быть идентичен ключу `type`, используемому в бэкэнде.

- Добавьте новые метки ко всем файлам в `src-admin/src/i18n/`

### Go2rtc (необязательно)
Если в настройках включен параметр `go2rtc`, локальный процесс [go2rtc](https://github.com/AlexxIT/go2rtc) заменяет процессы `ffmpeg`: по одному на каждый снимок в адаптере и по одному на каждую камеру в веб-расширении. go2rtc поддерживает одно соединение на каждую камеру и обслуживает всех потребителей с этой камеры.

go2rtc привязывает свой API к `127.0.0.1` и никогда не доступен напрямую из браузера. Весь доступ осуществляется через адаптер `web`, поэтому он использует ту же аутентификацию и ту же схему http/https, что и остальная часть ioBroker - никаких дополнительных портов открывать не нужно. Помимо существующего веб-сокета, каждая камера также предлагает `/<instance>/<camera>/stream.mjpeg`, который можно использовать в обычном `<img src="...">`.

Если исполняемый файл не найден или не запускается, адаптер автоматически переключается на `ffmpeg`.

## Todo
- [ ] Отправлять новые запросы на подписку на RTSP-камеры, если диалоговое окно открыто или закрыто

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### 3.2.0 (2026-10-01)
* (@hdering) Added: UniFi Protect cameras, with the stream token from the Protect API or entered by hand (#133)
* (@hdering) Added: RTSPS for UniFi Protect, also through go2rtc
* (@GermanBluefox) Fixed: the stderr of a failed ffmpeg call was passed on unmasked, so a camera password could end up in the log
* (@hdering) Fixed: the web URL of a camera in the admin was always shown with `http://`, also for a web instance with https; the MJPEG stream URL is shown when go2rtc is enabled
* (@GermanBluefox) Fixed: a request for the MJPEG stream of a camera was left hanging when go2rtc was switched on but not reachable
* (@hdering) Fixed: all camera URLs of the web extension answered 404 when the native WebRTC binary was missing (#321)
* (@GermanBluefox) Removed the unfinished `rtsp2WebRTC` experiment and the `@roamhq/wrtc` dependency with it - WebRTC runs through go2rtc

### 3.1.0 (2026-09-29)
* (@GermanBluefox) Fixed: after a single failed request a camera stayed broken until the adapter was restarted
* (@GermanBluefox) Fixed: after a live stream had ended, every snapshot kept showing its last frame
* (@GermanBluefox) Fixed: an RTSP camera with "original width/height" never delivered a picture, because the scale filter was passed to ffmpeg without `-vf`
* (@GermanBluefox) Fixed: the first picture of a live stream appeared only after a delay of 10 seconds
* (@GermanBluefox) Fixed: closing the view of one camera also unsubscribed the other cameras of the same browser
* (@GermanBluefox) Fixed: a camera that failed to start could throw when a GUI client unsubscribed from it
* (@GermanBluefox) Fixed: two cameras with the same IP address overwrote each other's snapshot
* (@GermanBluefox) Fixed: a password containing `!` appeared in the log in clear text
* (@GermanBluefox) Pictures are cached per requested size, so the web adapter and a widget no longer evict each other
* (@GermanBluefox) A browser that leaves the page no longer produces warnings in the log
* (@GermanBluefox) The universal camera type has a port field now - the port from the model table is only a suggestion
* (@GermanBluefox) Fixed: the model table of the universal type offered the port of somebody's port forwarding as the default for 226 URLs
* (@GermanBluefox) Fixed: `[WIDTH]`, `[HEIGHT]` and `[AUTH]` in the URL of a universal camera were never replaced, and a placeholder was only replaced once per URL
* (@GermanBluefox) Added the VIVOTEK H9161
* (@GermanBluefox) Updated packages

### 3.0.2 (2026-08-17)
* (@GermanBluefox) The web extension can now request snapshots via messages instead of the private HTTP server, which is used automatically when the cameras adapter runs on a different host than the web instance
* (@GermanBluefox) Fixed: a failed snapshot request answered with an empty `{}` instead of the error message

### 3.0.1 (2026-08-16)
* (@GermanBluefox) Completely rewritten in TypeScript
* (@GermanBluefox) Added Ezviz cameras
* (@GermanBluefox) Snapshot requests are answered with `Cache-Control: no-store` so browsers cannot show a stale frame
* (@GermanBluefox) Fixed: a list of allowed IPs was never split correctly, so any list with more than one address rejected every request
* (@GermanBluefox) Fixed: connections from the IPv6 loopback address were not recognized as local
* (@GermanBluefox) Fixed: a failed image request could terminate the adapter with `ERR_HTTP_HEADERS_SENT`
* (@GermanBluefox) The cameras are reachable immediately after start instead of only after the first frame of every camera was grabbed
* (@GermanBluefox) The web extension picks up a changed key by itself, without restarting ioBroker.web
* (@paul179) Added Steinel cameras (as manufacturer of the universal camera type)
* (@GermanBluefox) The universal camera type now offers ~50 manufacturers with ~13000 models, each with a logo
* (ioBroker-Bot) Removed the deprecated `common.materialize` from io-package.json
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now
* (ioBroker-Bot) Adapter requires node.js >= 22 now
* (@GermanBluefox) Added Instar cameras
* (@GermanBluefox) Added optional go2rtc support for snapshots and live streams, proxied via the web adapter
* (@GermanBluefox) Fixed: the second viewer of the same camera did not receive any picture
* (@GermanBluefox) Added two widgets for ioBroker.devices: RTSP camera and snapshot camera
* (@GermanBluefox) Fixed: the `.running` state did not start or stop the stream
* (@GermanBluefox) Fixed: width/height/angle of the `image` message were ignored
* (@GermanBluefox) Fixed: a camera in the dialog of the snapshot widget was never used

### 2.1.2 (2024-07-15)
* (bluefox) Updated packages

## License
MIT License

Copyright (c) 2020-2026 bluefox <dogafox@gmail.com>

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