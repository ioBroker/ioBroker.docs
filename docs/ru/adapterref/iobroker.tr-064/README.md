---
local: true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: D59HzSVYkdStJaSDx6e91FA6u2/6TTOD7QeUisJd0X0=
---
![Логотип](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### Информация
Этот адаптер считывает основную информацию с AVM Fritz!Box, например, список вызовов или количество сообщений на автоответчике.
На основе этого [Документация AVM](https://avm.de/service/schnittstellen/)

### Простые состояния и функции
- включить/выключить Wi-Fi для 2,4 ГГц и 5 ГГц,
- включить/выключить гостевой Wi-Fi,
- перезагрузить Fritz!Box,
- начать процесс WPS,
- переподключите Интернет
- внешний IP-адрес

### Звонок (наберите номер)
- При использовании внутреннего номера (например, **610) режим звонка позволит звонить на этот внутренний телефон.

например: **610[,время ожидания]

- При использовании внешнего номера сигнал вызова соединит вас с внешним номером.

FritzBox позвонит на внешний номер, и ваш телефон по умолчанию зазвонит, когда будет поднята трубка вызываемого телефона.
Телефон по умолчанию можно настроить в FritsBox в разделе: Telefonie/Anrufe/[Tab]Wahlhilfe/Wählhilfe verwenden

### ToPauseState
- Значения: кольцо, соединение, конец
- Может использоваться для приостановки видеоплеера при входящем звонке (звонке) или при поднятии трубки (подключении).
- Возобновление можно осуществить по конечному значению.

### Присутствие
Вы можете настроить список устройств для прослушивания.
Может быть активировано mDNS. При использовании MDNS опрос не требуется, и это быстрее

###AB — Anrufbeantworter (автоответчик)
Можно включить/выключить.
Состояние cbIndex можно установить по адресу # автоответчика.

### Вызов монитора
Callmonitor создаст состояния в реальном времени для каждого входящего и исходящего вызова.
Если телефонная книга включена (по умолчанию), номера будут преобразованы в имена. Также есть состояние, указывающее на звонящий телефон.

### Телефонная книга
- Телефонная книга, если она включена, будет использоваться для получения имени или номера телефона звонящего.
- Далее есть три состояния для разрешения номера или имени. Если доступно, вы также получите URL изображения контакта.

например: если вы установите состояние phonebook.number, все 3 состояния, имя, номер и изображение будут установлены для найденного контакта. Обратите внимание, поиск по имени сначала будет сравнивать полное имя, если не найдено, используется часть.

### Списки вызовов
Выходные форматы:

- json
- html

Списки вызовов:

- все звонки
- пропущенные звонки
- входящие звонки
- исходящие звонки

Количество вызовов: количество вызовов можно установить на 0. Следующий вызов увеличится на 1.

Вывод HTML можно настроить с помощью шаблона

### Команда и состояние commandResult
С помощью состояния команды вы можете вызвать каждую команду tr-064 из этого [документация](https://avm.de/service/schnittstellen/).
например

```
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

Состояние команды должно быть установлено в JSON из приведенных выше строк. Так { ... } (без command = и переносов строк) Обратный вызов вызова установит состояние commandResult.

### Включить монитор вызовов
Чтобы использовать функцию монитора вызовов, ее необходимо сначала включить в AVM Fritz!Box.
Чтобы включить монитор вызовов, наберите ```#96*5*```, и порт TCP/IP 1012 будет открыт. Чтобы закрыть порт, наберите ```#96*4*```.

### Предварительные версии
Предварительные версии доступны в npm с тегом dev.
Вы не можете установить их из корневого каталога ioBroker с помощью:

```
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 4.3.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 4.2.18 (2023-01-04)
* (Apollon77) Prepare for future js-controller verisons

### 4.2.17 (2022-09-16)
* (simatec/Apollon77) Prevent duplication of entries in configuration
* (Apollon77) Make sure active status of devices in jsonDeviceList is correct

### 4.2.16 (2022-03-21)
* (Apollon77) Fix info logs on callee/caller
* (Apollon77) Add special handling for potential broken external image links in phonebook
* (Apollon77) Prevent some crash cases reported by Sentry

### 4.2.15 (2021-12-08)
* (bluefox) fix crash case (Sentry IOBROKER-TR-064-35)

## License
The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 soef <soef@gmx.net>, ioBroker-Community-Developers

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