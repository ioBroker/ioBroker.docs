---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tr-064/README.md
title: ioBroker.tr-064
hash: P0ws0tCFzve9Hd4S+gtMecUzFOIp98i/OreueFatlAk=
---
![Количество установок](http://iobroker.live/badges/tr-064-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.tr-064.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.tr-064/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/tr-064/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.tr-064.svg)

<img src="admin/tr-064.svg" width="128" height="128">

# ioBroker.tr-064

**Этот адаптер использует библиотеки Sentry. Эти библиотеки автоматически сообщают разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации, а также о том, как отключить отправку сообщений об ошибках, см. [документацию плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Система отчетности Sentry используется начиная с версии js-controller 3.0.

## Информация

Этот адаптер считывает наиболее важную информацию с устройства AVM Fritz!Box. Например, список вызовов и количество сообщений на автоответчике.

Данный адаптер создан на основе [документации по интерфейсу FRITZ!](https://fritz.com/pages/schnittstellen/)

## Необходимые настройки в вашем Fritz!Box

- Измените способ входа в систему на «Использовать имя пользователя и пароль».
- Fritz!Box использует пароль длиной не более 32 символов. Более длинные пароли Fritz!Box сокращает в собственном пользовательском интерфейсе без предупреждения. Поэтому в конфигурации адаптера следует вводить только эти 32 символа.
- Создайте пользователя и предоставьте ему разрешение на управление Fritz!Box и его настройками.
- Включите доступ для приложений на вкладке «Сеть». В немецкой версии пользовательского интерфейса путь следующий:`Netzwerk` ->`Heimnetzfreigaben` ->`Zugriff für Anwendungen` ->`aktiviert` .
- Если вы хотите использовать`ring` Для работы функции необходимо настроить дополнительные параметры. См. раздел [«Звонок (наберите номер)»](#ring-dial-a-number) .

## Функции

### Простые состояния и функции

- Включайте и выключайте Wi-Fi на частотах 2,4 ГГц и 5 ГГц.
- Включайте и выключайте гостевой Wi-Fi.
- Перезагрузите Fritz!Box
- Запустить процесс WPS
- Восстановите интернет-соединение.
- Прочитайте внешний IP-адрес

### звонить (набрать номер)

- Если вы используете внутренний номер, например...`**610` государство`ring` позволяет этому внутреннему телефону звонить. Пример:`**610[,timeout]`
- Если вы используете внешний номер, то это будет штат.`ring` Соединяет вас с этим внешним номером. Fritz!Box звонит на внешний номер, и ваш основной телефон звонит, как только вызываемый абонент поднимает трубку.

В устройстве Fritz!Box можно настроить телефон по умолчанию. В немецком пользовательском интерфейсе путь к нему следующий:`Telefonie` ->`Anrufe` ->`Wahlhilfe` ->`Wählhilfe verwenden` Выберите там также эту опцию.`Verbindung mit dem Telefon ISDN- und Schnurlostelefone` .

### toPauseState

- Возможные значения:`ring` ,`connect` ,`end`
- Вы можете использовать это состояние, чтобы приостановить воспроизведение видеоплеера при входящем звонке.`ring` ), или когда кто-то поднимает трубку телефона (`connect` ).
- Вы можете продолжить воспроизведение с этого значения.`end` .

### Присутствие

Этот адаптер позволяет отслеживать присутствие людей в вашем доме. Таким образом, вы будете видеть, когда член вашей семьи или сосед по комнате покидает дом или возвращается:

- Откройте настройки адаптера и перейдите на вкладку «Устройства».
- Добавьте все устройства членов вашей семьи или соседей по комнате, например, их смартфоны, и подтвердите, нажав кнопку «Сохранить».
- Для каждого устройства адаптер создает структуру папок в объектах адаптера. Обычно это папка.`tr-064.0.devices` .
- Как только кто-то приходит или уходит, адаптер получает эту информацию. Состояние`tr-064.0.devices.xxx.active` , где`xxx` — это название устройства, указывающее, доступно ли это устройство, и, следовательно, находится ли человек дома.

Также можно включить опцию «Использовать mDNS для обнаружения новых устройств». При использовании mDNS адаптеру не нужно опрашивать Fritz!Box, и он быстрее обнаруживает изменения.

Пользователи сообщают, что функция обнаружения также надежно работает на устройствах iOS, например, на iPhone. Что касается iPhone, пользователи сообщают, что Fritz!Box требуется до 10 минут, чтобы обнаружить, что человек ушел и больше не подключен к Wi-Fi. Для повторного обнаружения присутствия Fritz!Box требуется до 1 минуты.

Сообщество ioBroker опубликовало скрипт, который использует эту информацию от адаптера для запуска действий. Примеры: автоматическое отключение всего оборудования после того, как все люди покинут дом, отображение количества людей, находящихся дома, или отображение статуса человека в системе VIS. См. [тему на форуме ioBroker](https://forum.iobroker.net/topic/4538/anwesenheitscontrol-basierend-auf-tr64-adapter-script) (на немецком языке).

### Автоответчик (на немецком языке):`Anrufbeantworter` )

Вы можете включать и выключать автоответчик. В соответствии с законодательством штата`cbIndex` Вы выбираете номер автоответчика.

### Монитор вызовов

Монитор вызовов в режиме реального времени создает состояния для каждого входящего и исходящего вызова. Если телефонная книга включена (что является настройкой по умолчанию), адаптер преобразует номера в имена. Также есть состояние, отображающее звонок телефона.

### Телефонный справочник

- Если телефонная книга включена, адаптер использует её для поиска имени абонента по номеру телефона.
- Для определения номера или имени доступны еще три состояния. Если доступно изображение, вы также получите URL-адрес изображения контакта.

Пример: если вы зададите состояние`phonebook.number` Адаптер устанавливает все 3 состояния.`name` ,`number` и`image` к значениям найденного контакта. Примечание: при поиске по имени адаптер сначала сравнивает полное имя. Если контакт не найден, адаптер ищет часть имени.

### Списки звонков

Форматы вывода:

- `json`
- `html`

Существуют следующие списки звонков:

- все звонки
- пропущенные звонки
- входящие звонки
- исходящие звонки

Счетчик звонков: вы можете установить счетчик звонков на 0. Следующий звонок увеличит счетчик на 1.

Вы можете настроить вывод HTML-кода с помощью шаблона.

### Командование штатов и результат командования

С государством`command` Вы можете вызвать любую команду tr-064 из этой [документации](https://avm.de/service/schnittstellen/) . Пример:

```javascript
command = {
    "service": "urn:dslforum-org:service:WLANConfiguration:1",
    "action": "X_AVM-DE_SetWPSConfig",
    "params": {
        "NewX_AVM-DE_WPSMode": "pbc",
        "NewX_AVM-DE_WPSClientPIN": ""
    }
};
```

Установить состояние`command` В JSON-коде приведенных выше строк это означает следующее:`{ ... }` , без`command =` и без переносов строк. Ответ на звонок записывается в состояние.`commandResult` .

В следующем примере показано, как включать и выключать автоответчик Fritz!Box в зависимости от его состояния.`command` Для проверки вы можете скопировать текст и вставить его в состояние.`tr-064.0.states.command` .

Включите автоответчик:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "1"}}`

Выключите автоответчик:

`{"service": "urn:dslforum-org:service:X_AVM-DE_TAM:1","action": "SetEnable", "params": {"NewIndex": "0","NewEnable": "0"}}`

Подробное описание действий и параметров TAM вы найдете здесь: [x\_tam.pdf](https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/x_tam.pdf) . Эта ссылка также содержится в документации AVM, указанной выше.

### Включите монитор звонков

Перед использованием функции мониторинга звонков необходимо включить её в устройстве AVM Fritz!Box. Для включения мониторинга звонков наберите`#96*5*` На подключенном телефоне. Затем Fritz!Box открывает TCP/IP-порт 1012. Чтобы закрыть порт, наберите`#96*4*` .

## Предварительные версии

Предварительные версии доступны на npm по соответствующему тегу.`dev` Вы можете установить их из корневого каталога ioBroker с помощью следующих команд:

```bash
npm install iobroker.tr-064@dev
iobroker upload tr-064
```

## Первоначальное создание

@soef создал этот адаптер по [адресу https://github.com/soef/ioBroker.tr-064](https://github.com/soef/ioBroker.tr-064) . Поддержка адаптера там больше не ведется. Поэтому он был перенесен в iobroker-community для исправления ошибок. Спасибо @soef за его работу.

## Как выполнить миграцию с версии tr-064-community (промежуточная версия и название)

Если вы перейдете с адаптера tr-064-community, вы сможете скопировать полный список устройств и все настройки:

- Откройте раздел «Объекты» в административной панели и включите экспертный режим.
- Найдите дерево объектов.`system.adapter.tr-064-community.0` , где`0` Это номер экземпляра. Если у вас было несколько экземпляров, выберите правильный.
- Нажмите на кнопку с изображением карандаша справа от этой линии.
- В окне выберите «raw (experts only)» и скопируйте фрагмент.`native` JSON.
- Открыть`system.adapter.tr-064.0` , где`0` Это номер экземпляра. Если у вас было несколько экземпляров, выберите правильный.
- Вставьте скопированное содержимое в соответствующую часть.`native` .
- Сохраните изменения.
- Запустите адаптер.
- Проверьте конфигурацию и убедитесь, что все данные были восстановлены корректно.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (@justr1) Expected disconnects of the call monitor (`ETIMEDOUT`, `ECONNRESET`, `EPIPE`) are logged as info now, because the adapter reconnects on its own
- (@GermanBluefox) The mDNS socket is closed when the adapter stops, so a restart does not leave a listener behind
- (@GermanBluefox) A phone book with only one contact is read now
- (@GermanBluefox) The hint how to open port 1012 is shown again if the call monitor is refused by the Fritz!Box
- (@GermanBluefox) The adapter was refactored to TypeScript. The sources are in `src/`, the adapter runs from `build/`
- (@GermanBluefox) The configuration dialog was rewritten as JsonConfig. Admin 7.7.22 or newer is required for it
- (@GermanBluefox) **Breaking change:** the adapter requires node.js >= 22 now
- (@GermanBluefox) The adapter can only be installed from npm now, no longer directly from GitHub (`common.nogit`)
- (@GermanBluefox) The options "Use call forwarding options", "Use mDNS" and "Create JSON device list" have a default value in `io-package.json` now
- (@GermanBluefox) The command `dumpservices.fs` writes the file again instead of stopping the adapter
- (@GermanBluefox) Adapter requires admin >= 7.7.22 now
- (@GermanBluefox) Adapter requires js-controller >= 6.0.11 now

### 4.3.0 (2024-04-30)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 4.2.18 (2023-01-04)
* (Apollon77) Prepare for future js-controller versions

### 4.2.17 (2022-09-16)
* (simatec/Apollon77) Prevent duplication of entries in configuration
* (Apollon77) Make sure the active status of devices in jsonDeviceList is correct

### 4.2.16 (2022-03-21)
* (Apollon77) Fix info logs on callee/caller
* (Apollon77) Add special handling for potential broken external image links in a phonebook
* (Apollon77) Prevent some crash cases reported by Sentry

### 4.2.15 (2021-12-08)
* (bluefox) fix crash case (Sentry IOBROKER-TR-064-35)

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.tr-064/blob/master/CHANGELOG_OLD.md)

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