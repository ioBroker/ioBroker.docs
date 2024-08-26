---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hid-community/README.md
title: ioBroker.hid-сообщество
hash: wrdc7UMRCczdXq6tBx2ACtPn3vjI1vq4ZZHKf7MXwTY=
---
![Логотип](../../../en/adapterref/iobroker.hid-community/admin/hid.png)

![Количество установок](http://iobroker.live/badges/hid-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.hid-community.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/9w4enhutav1e2leu?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# IoBroker.hid-сообщество
## Описание
Адаптер для HID-устройств, например. Apple Remote

## Первоначальное создание
Этот адаптер был первоначально создан @soef на https://github.com/soef/ioBroker.hid, но больше не поддерживается, поэтому мы переместили его в сообщество iobroker, чтобы можно было исправить ошибки. спасибо @soef за его работу.

## Установка
Пожалуйста, установите bia Admin

Возможно, понадобятся следующие дополнительные вещи

* **подготовить разрешения**: выполнить `iob fix`
* **Установите дополнительные пакеты**: `sudo apt install libusb-1.0-0-dev`
* **Установка правильных прав**: Если устройство не открывается, посмотрите https://github.com/node-hid/node-hid#udev-device-permissions.

## Состояния
Есть две группы состояний, необработанные и ключевые. ключевая группа будет запущена только в том случае, если сопоставление найдено.

Только одно из состояний xxx.double, xxx.single и xxx.long изменится при событии.
Состояние xxx.dsl получает результаты .double, single или long.
Действие указывает вниз, вверх или повторить.

## Сопоставления
Добавьте или отредактируйте раздел сопоставления в файле io-package.json, чтобы увидеть имена кодов клавиш.
Это не обязательно, необработанные состояния данных будут созданы в любом случае.

```
  "mappings": {
    "26017F2A55": "AllLightsOn-(AM)",
    "26017F1867": "AllLightsOff-(Memory)",
    "26857A21DE": "OK",
    "26857A55AA": "ESC"
  },
```

<!--

#### Требования
Модуль node-hid не работает в Windows 10, пока вы не внесете небольшое изменение в проект node-hid.
После установки iobroker.hid-community отредактируйте:

```
<path to iobroker>/node_modules/iobroker.hid-community/node_modules/node-hid/hidapi/windows/hid.c
```

Находить:

```
open_device
```

Измените 2-й и 3-й параметр вызова функции «CreateFileA»:

```
static HANDLE open_device(const char *path, BOOL enumerate)
{
    ...

	handle = CreateFileA(path,
		//desired_access,                    // original line
		GENERIC_WRITE | GENERIC_READ,        // replaced line
		//share_mode,                        // original line
		FILE_SHARE_READ | FILE_SHARE_WRITE,  // replaced line
		NULL,
		OPEN_EXISTING,
		FILE_FLAG_OVERLAPPED,/*FILE_ATTRIBUTE_NORMAL,*/
		0);

	...
}
```

Чтобы перестроить модуль node-hid, перейдите в каталог:

```
cd <path to iobroker>/node_modules/iobroker.hid-community/node_modules/node-hid
```

выполнять:

```
npm install --build-from-source
```

Перезапустите модуль iobroker.hid-community...
-->

## Changelog
### 0.3.0 (2023-01-04)
* Renamed to hid-community

### 0.2.0 (2022-12-30)
* General updates

## License
The MIT License (MIT)

Copyright (c) 2015-2023 ioBroker-Community, soef <soef@gmx.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
