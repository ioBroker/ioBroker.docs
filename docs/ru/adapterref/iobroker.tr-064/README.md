---
local: true
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: rN4KkHkTgQi739/0GZDQZ274L23nvqhd+4OxJHA44Ww=
---
![Логотип](../../../en/adapterref/iobroker.tr-064/media/tr-064.png)

# IoBroker.tr-064
### Информация
Этот адаптер считывает основную информацию из AVM Fritz!Box, например, список вызовов или количество сообщений на автоответчике.
На основании этого [Документация по АВМ](https://avm.de/service/schnittstellen/)

### Простые состояния и функции
- включить/выключить Wi-Fi для 2,4 ГГц и 5 ГГц,
- включить/выключить гостевой Wi-Fi,
- перезагрузить Fritz!Box,
- запустить процесс WPS,
- переподключить интернет
- внешний IP-адрес

### Звонок (набрать номер)
- При использовании внутреннего номера (например, **610) состояние звонка позволяет звонить на этот внутренний телефон.

например: **610[,тайм-аут]

- При использовании внешнего номера состояние звонка соединит вас с внешним номером.

FritzBox позвонит на внешний номер, и ваш телефон по умолчанию зазвонит, когда вы снимете трубку.
Телефон по умолчанию можно настроить в FritsBox в разделе: Telefonie/Anrufe/[Tab]Wahlhilfe/Wählhilfe verwenden.

### ToPauseState
- Значения: кольцо, подключение, конец
- Можно использовать для приостановки видеоплеера при входящем звонке (кольцо) или при поднятии трубки (подключение).
- Возобновление может быть сделано на конечном значении.

### Присутствие
Вы можете настроить список устройств для прослушивания.
Может запускаться mDNS. При использовании MDNS опрос не нужен и работает быстрее

### AB - Anrufbeantworter (автоответчик)
Можно включить/выключить.
Состояние cbIndex может быть установлено на адрес # автоответчика.

### Монитор вызовов
Callmonitor будет создавать состояния в реальном времени для каждого входящего и исходящего вызова.
Если телефонная книга включена (по умолчанию), номера будут преобразованы в имена. Существует также состояние, указывающее на звонящий телефон.

### Телефонная книга
- Телефонная книга, если она включена, будет использоваться для получения имени номера телефона вызывающего абонента.
- Далее есть три состояния для разрешения числа или имени. Если доступно, вы также получите URL-адрес изображения контакта.

  например: если вы установите номер телефонной книги состояния, все 3 состояния, имя, номер и изображение будут установлены для найденного контакта. Обратите внимание, что при поиске по имени сначала будет сравниваться полное имя, если оно не найдено, используется его часть.

### Списки вызовов
Выходные форматы:

- json
- HTML

Списки вызовов:

- все звонки
- пропущенные звонки
- входящие звонки
- исходящие звонки

Счетчик вызовов: счетчик вызовов может быть установлен на 0. Следующий вызов будет начинаться с 1.

Вывод html можно настроить по шаблону

### Команда и состояние commandResult
В состоянии команды вы можете вызывать каждую команду tr-064 из этого [документация](https://avm.de/service/schnittstellen/).
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

Состояние команды должно быть установлено в JSON из вышеуказанных строк. Итак, { ... } (без команды = и разрывов строк) Обратный вызов вызова установит состояние commandResult.

### Включить монитор вызовов
Чтобы использовать функцию мониторинга вызовов, ее необходимо сначала включить в AVM Fritz!Box.
Чтобы включить мониторинг вызовов, наберите ```#96*5*```, после чего откроется порт TCP/IP 1012. Чтобы закрыть порт, наберите ```#96*4*```.

### Предварительные версии
Предварительные версии доступны на npm с тегом dev.
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

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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