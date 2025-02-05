---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cameras/README.md
title: ioBroker.камеры
hash: dZX3hFUGrq1Y8V1kpiebGfWcc/EzvTPUzfh6XSKvtmM=
---
![Логотип](../../../en/adapterref/iobroker.cameras/admin/cameras.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.cameras.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cameras.svg)
![Статус зависимости](https://img.shields.io/david/ioBroker/iobroker.cameras.svg)
![Известные уязвимости](https://snyk.io/test/github/ioBroker/ioBroker.cameras/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.cameras.png?downloads=true)
![Трэвис-CI](http://img.shields.io/travis/ioBroker/ioBroker.cameras/master.svg)

# IoBroker.камеры
## Адаптер IP-камер для ioBroker
Вы можете интегрировать свои веб-/IP-камеры в vis и другие визуализации.
Если вы настроите камеру с именем `cam1`, она будет доступна на веб-сервере под именем `http(s)://iobroker-IP:8082/cameras.0/cam1`.

Кроме того, изображение можно запросить с помощью сообщения:

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

Результат всегда имеет формат `jpg`.

Поддерживаемые камеры:

- `Reolink E1 Pro` через RTSP (важно, без `Pro` работать не будет)
- `Eufy` через адаптер Eusec
- [HiKam](https://support.hikam.de/support/solutions/articles/16000070656-zugriff-auf-kameras-der-2-generation-via-onvif-f%C3%BCr-s6-q8-a7-2-generation-) второго и третьего поколения через ONVIF (для S6, Q8, A7 2. Generation), A7 Pro, A9
- [WIWICam M1 через адаптер HiKam](https://www.wiwacam.com/de/mw1-minikamera-kurzanleitung-und-faq/)
- RTSP Native - если ваша камера поддерживает протокол RTSP
- Скриншоты через HTTP URL - если вы можете получить снимок с вашей камеры через URL

### URL-адрес изображения
Это обычный URL-запрос, где все параметры находятся в URL. Например, `http://mycam/snapshot.jpg`

### URL-адрес изображения с базовой аутентификацией
Это URL-запрос для изображения, где все параметры находятся в URL, но вы можете предоставить учетные данные для базовой аутентификации. Например, `http://mycam/snapshot.jpg`

### FFmpeg
Если вы хотите получить доступ к снимкам на камерах RTSP, вы можете использовать ffmpeg. Вам необходимо установить ffmpeg в вашей системе:

- В Windows уже есть скомпилированный ffmpeg, и нет необходимости ничего скачивать. (Версия для Windows взята отсюда: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z)
- Linux: `sudo apt-get install ffmpeg -y`

Как обновить версию Windows `ffmpeg`:

- Скачать файл https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z
- Извлечь `bin/ffmpeg.exe`
- Переименуйте `ffmpeg.exe` в `win-ffmpeg.exe`
- Заархивируйте `win-ffmpeg.exe` в `win-ffmpeg.zip`
- Поместите `win-ffmpeg.zip` в корень этого репозитория.
- Выполните `win-ffmpeg.exe --version`, чтобы получить версию и сохранить ее в `main.ts` константа `WIN_FFMPEG_VERSION` (например, `2025-02-02-git-957eb2323a-full_build-www.gyan.dev`)

Вот пример того, как добавить Reolink E1:

![ртсп](../../../en/adapterref/iobroker.cameras/img/rtsp.png)

### Ezviz - Как повторно включить RTSP для камер EZVIZ
По какой-то причине EZVIZ решили отключить RTSP для своих камер:

- Откройте приложение EZVIZ и перейдите в раздел: Профиль / Настройки / Просмотр в реальном времени по локальной сети.
- Начните сканирование, а затем выберите камеру:
- Войдите в систему, используя пароль вашей камеры (пароль по умолчанию указан на наклейке камеры)
- Нажмите значок «Настройки» и выберите «Настройки локальной службы».
- Включить RTSP

## Как добавить новую камеру (для разработчиков)
Чтобы добавить новую камеру, необходимо создать запрос на извлечение на GitHub со следующими изменениями:

- Добавьте новый файл в папку `cameras`. Это бэкэнд для чтения одного изображения с камеры.
- Добавьте файл GUI в папку `src/src/Types/`. Это диалоговое окно настройки камеры
- Добавьте этот диалог в файл `src/src/Tabs/Cameras.js` аналогично добавлению других камер. Нужно добавить только две строки:
- Импорт нового диалогового окна конфигурации, например `import RTSPMyCamConfig from '../Types/RTSPMyCam';`
- Расширьте структуру `TYPES` с помощью новой камеры, например `mycam: { Config: RTSPMyCamConfig, name: 'MyCam' },`

Имя атрибута должно совпадать с именем файла в папке `cameras`.

## То, что нужно сделать
- [ ] Отправлять новые запросы на подписку для RTSP-камер, если диалоговое окно открыто или закрыто

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### **WORK IN PROGRESS**
* (@GermanBluefox) Completely rewritten in TypeScript
* (@GermanBluefox) Added Ezviz cameras

### 2.1.2 (2024-07-15)
* (bluefox) Updated packages

### 2.1.1 (2024-07-07)
* (bluefox) Removed withStyles package

### 2.0.8 (2024-06-09)
* (bluefox) Packages updated
* (bluefox) Allowed selecting another source (with bigger resolution) for URL cameras

### 2.0.5 (2023-12-19)
* (bluefox) Minimal supported Node.js version is 18
* (bluefox) Corrected widgets

### 1.4.0 (2023-12-04)
* (bluefox) Changed widget set name
* (bluefox) Added the caching of images with time, size and rotation
* (bluefox) Added timeout for RTSP cameras

### 1.3.0 (2023-09-28)
* (bluefox) Utilized the new js-controller feature: sendToUI. RTSP Streaming works only with js-controller 5.0.13 or higher
* (bluefox) Implemented a second widget for simple cameras

### 1.2.3 (2023-09-27)
* (bluefox) Added WiWiCam MW1 and HiKam cameras

### 1.2.2 (2023-07-07)
* (bluefox) Corrected passwords with exclamation mark

### 1.2.1 (2023-07-06)
* (bluefox) Added eufy camera

### 1.1.1 (2023-03-15)
* (bluefox) Added Reolink E1 camera

### 1.0.3 (2023-01-11)
* (bluefox) Corrected GUI config error

### 1.0.2 (2023-01-07)
* (bluefox) added RTSP camera
* (bluefox) added cache of snapshots

### 0.2.0 (2022-09-27)
* (bluefox) GUI updated to MUIv5

### 0.1.8 (2022-02-13)
* (bluefox) replaced the deprecated package `request` with `axios`

### 0.1.5 (2022-02-13)
* (bluefox) Preparations for js-controller@4.x are made

### 0.1.4 (2021-07-13)
* (bluefox) Add a role for states

### 0.1.3 (2020-08-08)
* (Hirsch-DE) Parameters were applied

### 0.1.2 (2020-06-03)
* (bluefox) implemented get image by message

### 0.1.0
* (bluefox) URL and URL with basic authentication were implemented

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2025 bluefox <dogafox@gmail.com>

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