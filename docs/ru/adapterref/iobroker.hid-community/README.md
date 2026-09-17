---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hid-community/README.md
title: ioBroker.hid-community
hash: yZmkSP418yMEpRLmhTofhf+E1duoLFkoZS8G7gZbtk8=
---
![Логотип](../../../en/adapterref/iobroker.hid-community/admin/hid.png)

![Количество установок](http://iobroker.live/badges/hid-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hid-community.svg)
![Статус сборки](https://ci.appveyor.com/api/projects/status/9w4enhutav1e2leu?svg=true)
![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

# ioBroker.hid-community

## Описание

Адаптер для HID-устройств, например, пульта дистанционного управления Apple.

## Первоначальное создание

Этот адаптер был первоначально создан @soef по адресу <https://github.com/soef/ioBroker.hid> , но его поддержка прекращена, поэтому мы перенесли его в iobroker-community для исправления ошибок. Спасибо @soef за его работу.

## Установка

Пожалуйста, установите bia Admin.

В некоторых случаях могут потребоваться следующие дополнительные вещи.

- **подготовка прав доступа** : выполнить `iob fix`
- **Установите дополнительные пакеты** : `sudo apt install libusb-1.0-0-dev`
- **Настройка правильных прав** : Если устройство не открывается, пожалуйста, обратитесь к <https://github.com/node-hid/node-hid#udev-device-permissions>

## Штаты

Существует две группы состояний: необработанная и ключевая. Ключевая группа будет активирована только в том случае, если будет найдено соответствие.

При возникновении события изменяется только одно из состояний: xxx.double, xxx.single или xxx.long. Состояние xxx.dsl принимает результаты .double, single или long. Действие указывает на нажатие клавиши вниз, вверх или повтор.

## Сопоставления

Добавьте или отредактируйте раздел сопоставления в файле io-package.json, чтобы увидеть названия кодов клавиш. Это необязательно, исходные данные состояний будут созданы в любом случае.

```
  "mappings": {
    "26017F2A55": "AllLightsOn-(AM)",
    "26017F1867": "AllLightsOff-(Memory)",
    "26857A21DE": "OK",
    "26857A55AA": "ESC"
  },
```

<!--
#### Requirements

The node-hid module does not work on Windows 10 until you make a smal change to the node-hid project.
After installation of iobroker.hid-community edit:
```
<path to iobroker>/node_modules/iobroker.hid-community/node_modules/node-hid/hidapi/windows/hid.c
```
Find:
```
open_device
```
Change the 2nd and 3rd parameter of the function call "CreateFileA":
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
To rebuild the node-hid module, change to the irectory:
```
cd <path to iobroker>/node_modules/iobroker.hid-community/node_modules/node-hid
```
execute:                              
```
npm install --build-from-source 
```
Restart the iobroker.hid-community module...
-->

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 0.4.0 (2024-04-17)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.3.0 (2023-01-04)
* Renamed to hid-community

### 0.2.0 (2022-12-30)
* General updates

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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