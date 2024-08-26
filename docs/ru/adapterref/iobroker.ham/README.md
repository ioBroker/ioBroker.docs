---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ham/README.md
title: Менеджер по аксессуарам ioBroker Homebridge
hash: YWFx1PvhxXq7iwHc0gKP5lLvYFgwg1b+x09oPZ8cidA=
---
![Логотип](../../../en/adapterref/iobroker.ham/admin/ham.png)

![Количество установок](http://iobroker.live/badges/ham-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.ham.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ham.svg)

# Менеджер по аксессуарам ioBroker Homebridge
![Тестируйте и выпускайте](https://github.com/ioBroker/iobroker.ham/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/ham/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Используйте плагины Homebridge в ioBroker или запустите глобально установленный Homebridge в качестве адаптера ioBroker.
Все состояния из Homebridge также будут доступны в ioBroker, и ими также можно будет управлять там.

## Описание
Этот адаптер обеспечивает три различных режима:

### Режим по умолчанию (оболочка)
В режиме по умолчанию адаптер позволяет напрямую использовать подключаемые модули homebridge.
Вы можете ознакомиться со всеми доступными подключаемыми модулями на веб-сайте NPM по адресу [поиск по ключевому слову `homebridge-plugin`](https://www.npmjs.com/search?q=homebridge-plugin).

Вы просто добавляете список модулей в конфигурацию адаптера и предоставляете конфигурацию в JSON-редакторе (см. описания плагинов).
После этого все объекты Homebridge также будут созданы в ioBroker, и все объекты, доступные для записи, также можно будет изменить.

** ВАЖНО: этот режим позволяет использовать интеграцию устройств с предоставленными плагинами Homebridge. Не предусмотрено никакого «моста», который может использоваться приложением Home!**

Ссылку на успешно опробованные плагины с примерами можно найти здесь: https://forum.iobroker.net/viewtopic.php?f=20&t=15021

### Режим локального домашнего моста
Если вы хотите, чтобы опубликованный мост использовался приложением Home, и хотите также взаимодействовать с ним из ioBroker и получать данные, но еще не установили домашний мост, используйте этот режим.

Локальный режим устанавливает текущую совместимую версию homebridge и запускает ее от имени пользователя ioBroker. Вы предоставляете полную конфигурацию домашнего моста с помощью ioBroker.
Установка модулей хоумбриджа также осуществляется через ioBroker.

**ВАЖНО: При использовании дочерних мостов (новая функция домашнего моста начиная с версии 1.3.x) адаптер НЕ МОЖЕТ получить доступ к данным, предоставляемым этими дочерними мостами! Доступен только главный мост!**

### Global-Homebridge-Mode
Если вы уже используете Homebridge (Apple OpenSource SmartHome) в качестве глобальной установки на хосте, на котором также работает ioBroker, вы можете использовать эту существующую установку Homebridge и запустить эту установку Homebridge как процесс ioBroker. **В этом случае сервер Homebridge запускается ioBroker.**

**ВАЖНО: Вам необходимо убедиться, что глобальная служба НЕ запущена системой или чем-то подобным. ioBroker сам сделает старт! Ниже приведены рекомендации по настройке.**

**ВАЖНО: Поскольку ioBroker запускает Homebridge, ioBroker также ведет журнал. ВЫ можете установить уровень логирования экземпляра на глупый, чтобы также видеть все журналы Homebridge, иначе они будут отфильтрованы для важных вещей.**

Кроме того, все состояния из Homebridge доступны как состояния в ioBroker и позволяют управлять ими из ioBroker.

Чтобы это работало, вам необходимо указать расположение системной глобальной папки node-modules. Для этого вызовите **npm root -g**. Кроме того, вам необходимо указать путь к каталогу конфигурации homebridge (обычно .homebridge в папке «users»).

**ВАЖНО: ioBroker запускается от имени пользователя «iobroker», а homebridge обычно от имени пользователя root или пользователя homebridge (в зависимости от того, как вы его установили). Вы должны убедиться, что пользователь ioBroker может получить доступ к папке homebride «persistance», иначе вы увидите ошибки, что файл не может быть сохранен (что может привести к сбою адаптера!)**

**ВАЖНО: При использовании дочерних мостов (новая функция домашнего моста начиная с версии 1.3.x) адаптер НЕ МОЖЕТ получить доступ к данным, предоставляемым этими дочерними мостами! Доступен только главный мост!**

#### Установить как данные глобального моста
Благодаря @Anzic23 здесь некоторые подробности о том, как идеально настроить домашний мост для глобального режима:

1. `sudo npm install -g --unsafe-perm homebridge homebridge-config-ui-x`
2. установить hb-service (sudo hb-service install --user homebridge) Этот шаг необходим для создания необходимых файлов и каталогов
3. удалить hb-service (удалить sudo hb-service)
4. после установки хоумбриджа

```
sudo chmod 777 -R /var/lib/homebridge/
sudo chmod 777 -R /usr/lib/node_modules/homebridge
```

в iobroker Global Homebridge Путь: /usr/lib/node_modules/homebridge

Путь к глобальному каталогу конфигурации Homebridge: /var/lib/homebridge

## Следующие плагины были протестированы в режиме по умолчанию
* homebridge-chamberlain v1.0.1 - плагин для открывания гаражных ворот Чемберлен с MyQ
* homebridge-doorbird v0.0.4 - Плагин для Doorbird
* homebridge-dyson-link v2.2.2 — устройства Dyson Link
* homebridge-edomoticz v2.1.11 - Полноценный современный плагин для Domoticz
* homebridge-Fibaro-HC2 v2.1.5 - интеграция Fibaro HomeCenter
* homebridge-homee v0.2.4 - Полноценный современный плагин для Homee
* homebridge-ikea-tradfri-gateway v1.0.26 - Tradfri
* homebridge-noolite v0.0.29 - Noolite через USB модули MTRF-64 или MTRF-64
* homebridge-platform-wemo v1.0.1 — плагин Belkin WeMo Platform
* homebridge-seasons v1.0.1 - Плагин для отображения текущего времени года.
* homebridge-vera v0.8.2 — VeraLink — приложение для аксессуаров Z-Wave от Vera (Node.js 8.11.3)

... и многое другое

## СДЕЛАТЬ
* Тесты
* Больше документации?!
* Проверьте и узнайте, будут ли модули ESM работать в каком режиме (я ожидаю, что нет)

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Optimize value determination on accessory initialization

### 5.3.1 (2022-09-28)
* (bluefox) Updated GUI packages

### 5.3.0 (2022-09-15)
* (Apollon77) Add option to enable homebridge debug logging

### 5.2.4 (2022-09-15)
* (Apollon77) Prevent crash when accessing a state which is not controllable anymore

### 5.2.3 (2022-09-14)
* (Apollon77) Optimize Accessory processing

### 5.2.2 (2022-09-14)
* (Apollon77) make compatible to more plugins

### 5.2.1 (2022-09-12)
* (Apollon77) make compatible to more plugins

### 5.1.0 (2022-08-17)
* IMPORTANT update homebridge and wrapper to 1.5.0 (latest as of today). IMPORTANT: Requires also homebridge 1.5.x installed when using global mode and local mode will update to 1.5.x too! Check your plugins for updates!

### 5.0.2 (2022-07-20)
* (bluefox) Update tab GUI

### 5.0.1 (2022-06-28)
* (Apollon77) Make sure values are set after objects were created

### 5.0.0 (2022-06-27)
* IMPORTANT update homebridge and wrapper to 1.4.1 (latest as of today). IMPORTANT: Requires also homebridge 1.4.x installed when using global mode and local mode will update to 1.4.x too! Check your plugins for updates!
* (Apollon77) Sync forbidden characters with ioBroker standard - Object IDs might change with this version!
* (Apollon77) Basically allow to specify http URLS as plugins in the main configuration list (not the tab!)
* (Apollon77) Also try to register on external accessories like cameras (experimental)
* (Apollon77) Fix loading issues with the tab

### 4.0.4 (2022-06-07)
* (bluefox) Corrected configuration in dark theme

### 4.0.3 (2022-03-20)
* (bluefox) Update packages

### 4.0.2 (2021-05-08)
* (Apollon77) prevent warnings in js-controller 3.3

### 4.0.1 (2021-03-24)
* (Apollon77) update homebridge and wrapper to 1.3.4 (latest as of today). IMPORTANT: Requires also homebridge 1.3.x installed when using global mode and local mode will update to 1.3.x too! Check your plugins for updates!
* (UncleSamSwiss) Add an experimental version of new plugin selection and configuration tab - TRY IT OUT!
* (Apollon77) IMPORTANT: Configurations in local/global mode with child bridges will NOT work because ioBroker can not access the data on the child bridge processes!

### 3.0.2 (2020-11-29)
* (Apollon77) update homebridge in wrapper to 1.1.6 (latest as of today)

### 3.0.1 (2020-08-08)
* (Apollon77) set a very high limit (again) on allowed accessories and services because irrelevant

### 3.0.0 (2020-08-04)
* (Apollon77) BREAKING: ONLY WORKS WITH HOMEBRIDGE 1.1.x+ AND Node JS >=10.17.0!! Make sure plugins support it AND homebridge is updated to 1.1.x when you use the Global Mode!

### 1.1.2 (2019-07-08)
* (Apollon77) Allow more than 149 accessories in wrapper mode

### 1.1.1 (2019-07-05)
* (Apollon77) Add option to update NPM modules in Admin. Reinstall will happen after saving settings
* (Apollon77) Enhance NPM installation handling
* (Apollon77) Allow to specify special version of homebridge NPM packages using name@version
* (Apollon77) Allow to specify homebridge command line options. They will be added to the command line arguments (Some plugins need that or special features are only available with it)
* (Apollon77) Add "Local" mode that installs an own homebridge and run it as bridge

### 1.0.1 (2019-01-16)
* (SchumyHao) Add Chinese support

### 1.0.0 (WIP)
* (Apollon77) add polling interval to global mode
* (Apollon77) add option to use insecure flag in wrapper mode

### 0.4.5 (2018.08.21)
* (Apollon77) issues fixed

### 0.4.4 (2018.08.07)
* (Apollon77) corrected automatic role determination and bugs fixed

### 0.4.2 (2018.06.25)
* (Apollon77) Fix for global mode

### 0.4.1 (2018.06.21)
* (Apollon77) option to poll values from the plugins added and other optimizations

### 0.3.1 (2018.06.20)
* (kirovilya) Fixed a bug in global mode that values were not reported back to iOS devices

### 0.3.0 (2018.06.20)
* (bluefox) Support of ham plugins was added

### 0.2.6 (2018.06.19)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.5 (2018.06.18)
* (Apollon77) Catch all console logs from Homebridge and make available as debug log

### 0.2.4 (2018.06.18)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.3 (2018.06.17)
* (Apollon77) Updates for Homebridge-Wrapper

### 0.2.2 (2018.06.17)
* (Bluefox) Fixes for JSON editor in Firefox and Chrome

### 0.2.0/0.2.1 (2018.06.17)
* (Apollon77) Public test version with both modes
* (Bluefox) Admin3

### 0.1.0 (2018.06.09)
* (Apollon77) Update for working mode 1

### 0.0.1 (2018.03.24)
* (kirovilya) initial commit

## License
The MIT License (MIT)

Copyright (c) 2018-2022 Apollon77 <ingo@fischer-ka.de>

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
