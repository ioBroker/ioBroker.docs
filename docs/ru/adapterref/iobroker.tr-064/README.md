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

### 4.2.14 (2021-07-21)
* (Apollon77) Further optimizations for js-controller 3.3

### 4.2.13 (2021-07-12)
* (Apollon77) Optimize for js-controller 3.3 and prevent warnings (you pot. need to delete datapoints if you still see errors, they will be recreated)

### 4.2.12 (2021-04-16)
* (Apollon77) prevent html template for call lists to be overwritten by default one
* (Apollon77) fix crash case (Sentry IOBROKER-TR-064-2M)

### 4.2.11 (2021-03-12)
* (Apollon77) fix id-reset detection for single calls

### 4.2.10 (2021-03-11)
* (Apollon77) better handle caller id resets by reboots/FW updates to also update list specific counter and log when this happened

### 4.2.9 (2021-03-10)
* (Apollon77) try to better handle calllist resets on FW updates
* (Apollon77) Make sure jsonDeviceList do not get deleted on start
* (Apollon77) Better handle not initialized calllist templates

### 4.2.8 (2021-03-09)
* (Apollon77) Optimize customized HTML templates if state is empty

### 4.2.7 (2021-03-08)
* (Apollon77) Allow customized HTML templates again

### 4.2.6 (2021-02-18)
* (Apollon77) Fix crash case (IOBROKER-TR-064-20)
* (Apollon77) Get calllists working again

### 4.2.4 (2021-02-02)
* (Apollon77) Prevent crash case (Sentry IOBROKER-TR-064-1T)

### 4.2.3 (2021-01-16)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-1N)

### 4.2.2 (2020-12-25)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-1K)

### 4.2.1 (2020-11-13)
* (Apollon77) try to fix pot. not working disabling commands

### 4.2.0 (2020-11-09)
* (Apollon77) Crash case prevented (Sentry IOBROKER-TR-064-15, IOBROKER-TR-064-16)
* (Apollon77) Try to solve error 500 problem with offline devices
* (SliX185) Add IPv6 states
* (foxriver76) optimizations
* (Apollon77) Fix initialization if ip/host

### 4.1.0 (2020-09-17)
* (Apollon77) Fix crash case (Sentry IOBROKER-TR-064-14)
* (bazidibavaria) added tablesort to device search
* (bazidibavaria) added Fritzbox link to admin

### 4.0.13 (2020-08-17)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-10)

### 4.0.12 (2020-08-06)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-Y)

### 4.0.11 (2020-07-26)
* (Apollon77) Crash prevented (Sentry IOBROKER-TR-064-W)

### 4.0.9 (2020-07-01)
* (Apollon77) handle cases correctly when no hosts are existing on device (Sentry IOBROKER-TR-064-R)

### 4.0.8 (2020-06-20)
* (Apollon77) Make sure states are only subscribed if initialization is done (Sentry IOBROKER-TR-064-J)

### 4.0.7 (2020-06-09)
* (Apollon77) Fix Admin UI to allow setting poll Interval correctly again

### 4.0.4 (2020-06-05)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-D)
* (Apollon77) Make sure adapter do not crash when invalid parameter are provided (Sentry IOBROKER-TR-064-B)
* (Apollon77) https is not supported right now (Sentry IOBROKER-TR-064-E)

### 4.0.3 (2020-05-11)
* (Apollon77) Make sure adapter do not crash of no calls were returned (Sentry IOBROKER-TR-064-7)
* (Apollon77) Make sure adapter do not crash when providing a non string to "ring" state (Sentry IOBROKER-TR-064-8)

### 4.0.1 (2020-04-23)
* (Apollon77) handle case where no Phone deflections are available (Sentry IOBROKER-TR-064-1/2)

### 4.0.0 (2020-04-12)
* (Apollon77) update dependencies, use auto decrypt features with js-controller 3.0
* (foxriver76) make callmonitor compatible with js-controller 3.0

### 3.1.4 (2020-01-26)
* (Apollon77) fix error and check some other code check comments
* (Apollon77) Add proper meta data for buttons

### 3.1.1 (2020-01-25)
* (bluefox) Configuration dialog was improved
* (bluefox) Soef library was removed

### 3.0.0 (2020-01-24)
* (Apollon77) Switch Name back to tr064 because ewe got it from npmjs
* (maeb3) Enhance call handling and fix wrong data for currently active calls 
* (Apollon77) Remove unused state phonebook.ringing

### 2.0.3 (2019-12-17)
* (Jey Cee) fix delete last device from list

### 2.0.2 (2019-12-16)
* __requires js-controller v2__
* (foxriver76) no longer use adapter.objects
* (Apollon77) several fixes, Call lists working again, Phonebook fixed and many more

### 1.1.0 (2019-11-10)
* (jey cee) added Admin v3 support

### 1.0.0 (2019-04-01)
* (ldittmar) first version for the community

## License
The MIT License (MIT)

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