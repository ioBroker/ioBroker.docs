---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit-controller
hash: 28xtlOcTsduZ+0cq5I5uxpDVgGDYpdn41O1/djPL6Bo=
---
![Логотип](../../../en/adapterref/iobroker.homekit-controller/admin/homekit-controller.png)

![Количество установок (последние)](https://iobroker.live/badges/homekit-controller-installed.svg)
![Количество установок (стабильных)](https://iobroker.live/badges/homekit-controller-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)
![Тестирование и выпуск](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)

# ioBroker.homekit-controller

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## адаптер homekit-controller для ioBroker

Этот адаптер позволяет сопрягать и напрямую управлять устройствами с логотипом «работает с HomeKit», которые можно использовать с Apple Home. Адаптер поддерживает устройства IP/WLAN, а также устройства BLE (Bluetooth LE). Адаптер работает полностью локально в вашей сети.

### Адаптер не...

...предлагая устройства или состояния ioBroker для управления с помощью приложения/системы Apple Home. Если вас интересует это направление, пожалуйста, используйте адаптер [Yahka](https://github.com/jensweigele/ioBroker.yahka) .

...поддержка устройств, работающих исключительно на основе Thread. Спецификации Homekit Thread пока не опубликованы. Судя по имеющейся информации, все устройства на рынке также поддерживают BLE или WLAN, поэтому адаптер просто не будет использовать Thread, а другие способы связи.

### Как использовать адаптер

Адаптер отслеживает наличие доступных устройств в вашей сети.

Существует три «типа» обнаруженных устройств:

- **Несопряжённые устройства** — это устройства, которые обнаружены и доступны для сопряжения. Для этих устройств в ioBroker генерируются некоторые базовые состояния, содержащие информационную и административную информацию. Указав PIN-код, вы можете сопрячь эти устройства с данным экземпляром адаптера (см. раздел «Сопряжение» ниже).
- **В паре с этим экземпляром** устройства можно полностью контролировать, они будут обновлять значения состояния в режиме реального времени, используя подписки (только для IP-устройств) и интервал опроса данных. Устройство также можно «отключить» от этого экземпляра (см. раздел ниже).
- Устройства **, сопряженные с другими** устройствами, — это устройства, которые обнаружены, но уже сопряжены с другим контроллером. Они регистрируются в режиме отладки, но для них не создаются никакие состояния. Если вы хотите использовать их с ioBroker, сначала необходимо отменить сопряжение с текущим контроллером (иногда это возможно только с помощью жесткой перезагрузки или чего-то подобного — см. руководство), после чего они должны отображаться как «несопряженное устройство».

После сопряжения поддерживаемые состояния считываются с устройства, и создаются объекты и состояния. Все известные точки данных, определенные в стандарте HomeKit, должны быть названы удобочитаемым образом. Если вы видите UUID в качестве имен, значит, производитель устройства добавил собственные данные. Если известно, что они предоставляют, это можно добавить в адаптер (например, как это сделано для устройств Elgato), чтобы они отображались в следующей версии в виде имен.

Точки данных создаются с соответствующими состояниями и, если таковые имеются, также с правильными ролями. В противном случае используются общие роли.

### Идентификационная информация

Устройства, не сопряженные ни с одним контроллером, имеют`admin.identify` состояние, которое может быть активировано с помощью`true` В этом случае соответствующее устройство должно идентифицировать себя (например, должна мигать лампа или что-то подобное, чтобы его можно было распознать). Эта функция доступна только до тех пор, пока устройство не сопряжено с контроллером.

#### Информация о паре

Для сопряжения устройства с данным адаптером необходимо ввести PIN-код, указанный на устройстве, этикетке или другом подобном элементе. PIN-код состоит из 8 цифр рядом с QR-кодом. Цифры необходимо ввести в формате 123-45-678 (даже если дефисы не напечатаны на этикетке или не отображаются на экране!).

В настоящий момент PIN-код необходимо ввести в состояние admin.pairWithPin — пользовательский интерфейс администратора появится в ближайшее время.

После сопряжения устройства с этим экземпляром НЕВОЗМОЖНО одновременно добавить устройство в приложение Apple Home или аналогичное приложение.

В некоторых случаях сопряжение может оставаться проблематичным, поскольку я смог протестировать устройство лишь на очень небольшом количестве устройств, поэтому, пожалуйста, сообщайте о проблемах, и я предоставлю инструкции по получению необходимых отладочных данных.

#### Информация о распараллеливании

Для отмены сопряжения просто активируйте`admin.unpair` Укажите значение "true", и будет выполнен процесс отмены сопряжения — вскоре появится административный интерфейс.

#### Особые указания по использованию IP-устройств

IP-устройства обнаруживаются с помощью UDP-пакетов, поэтому ваш хост должен находиться в той же сети, что и устройства. В настоящее время обойти это ограничение практически невозможно, поскольку используемая запись MDNS содержит важную информацию для процесса сопряжения. Особенно при использовании Docker необходимо найти способы (режим хоста, macvlan и т. д.) для обнаружения UDP-пакетов.

Основная проблема для беспроводных IP-устройств без элементов управления или экрана — это подключение их к вашей беспроводной сети. Скорее всего, существует мобильное приложение от производителя, позволяющее первоначально добавить устройства в вашу сеть. Если этот начальный процесс также сопрягает устройство с Apple Home, возможно, потребуется отменить сопряжение (например, <https://www.macrumors.com/how-to/delete-homekit-device/> ). После этого устройство должно появиться в вашей беспроводной сети и стать доступным для сопряжения с этим адаптером.

После сопряжения IP-устройства и сохранения IP-адреса адаптер напрямую подключается к устройству при запуске. Поэтому лучше всего закрепить IP-адрес в настройках маршрутизатора. Если IP-адрес изменился, соединение должно быть установлено при следующем обнаружении, и IP-адрес следует обновить.

#### Особые указания по использованию устройств BLE

По умолчанию функция BLE отключена в настройках адаптера. После включения можно будет обнаружить доступные устройства.

Из-за ограничений устройств Bluetooth функция «обновления в реальном времени» для отслеживания изменений состояния недоступна. Устройства будут сообщать о «важных изменениях состояния» (например, об изменении состояния «Включено») с помощью специальных пакетов, которые запустят немедленное обновление данных. Кроме того, данные обновляются с заданными интервалами опроса. Не устанавливайте их слишком короткими!

После перезагрузки адаптера устройства Bluetooth не могут быть подключены напрямую — системе необходимо получить от устройства как минимум один пакет обнаружения, чтобы получить необходимые данные для подключения. Это означает, что устройства BLE могут быть доступны с небольшой задержкой.

### Поиск неисправностей

#### Известные несовместимые устройства

Если у вас возникли проблемы с сопряжением устройства с этим адаптером, попробуйте выполнить сопряжение с обычным приложением Apple Home для iOS. Если это не сработает, значит, с устройством что-то не так, и этот адаптер тоже не поможет. Можно попробовать сбросить настройки, но в остальном шансов нет.

В настоящее время для некоторых это именно так.`Tado Door Locks` в качестве примера. Их необходимо сопоставить, используя`Tado App` Это каким-то образом приводит к регистрации устройства в Apple Home, но не посредством официального процесса сопряжения.

Дополнительно также`Nuki 3 Locks (BLE)` Их невозможно соединить, поскольку они используют компоненты аппаратной аутентификации, которые не документированы компанией Apple.

В компании Netatmo один пользователь выяснил, как можно выполнить сопряжение, несмотря на возникшую проблему. См. <https://github.com/Apollon77/ioBroker.homekit-controller/issues/233#issuecomment-1311983379>

#### Другие потенциальные проблемы, которые следует проверить перед созданием заявки.

##### для устройств BLE

- Если у вас возникли проблемы с работой BLE-соединения или ошибки при попытке инициализации BluetoothLE-соединения адаптером, пожалуйста, сначала выполните следующие действия:`iobroker fix` чтобы убедиться, что все разрешения и необходимые возможности установлены правильно.
- Если это не поможет, пожалуйста, проверьте <https://github.com/noble/noble#running-on-linux>
- Пожалуйста, убедитесь, что ваша система обновлена, включая ядро.`apt update && apt dist-upgrade`
- Попробуйте перезагрузить соответствующее BLE-устройство, например, с помощью команды.`sudo hciconfig hci0 reset`
- Для решения проблем также предоставляются результаты выполнения следующих действий:`uname -a` и`lsusb`
- Журнал событий устройства BLE низкого уровня можно получить с помощью`sudo hcidump -t -x >log.txt` (в дополнительной оболочке для запуска адаптера)

##### Общие рекомендации

- Есть ли у устройства режим сопряжения, который необходимо активировать предварительно? Но также внимательно прочитайте инструкцию, возможно, режим сопряжения предназначен для какого-то другого устаревшего протокола или моста, а не для Apple Home.
- По сути, если при попытке сопряжения появляется ошибка "характеристика настройки сопряжения не найдена", это означает, что устройство в текущем состоянии не поддерживает сопряжение через HomeKit. В этом случае адаптер ничего не сможет сделать!
- Пожалуйста, убедитесь, что вы вводите PIN-код с дефисами в формате "XXX-XX-XXX". Другие форматы, скорее всего, будут отклонены библиотекой по ошибке, но на всякий случай.

## Отладка

Если у вас возникли проблемы и вы хотите сообщить о них (см. ниже), то расширенный журнал отладки всегда полезен.

- Пожалуйста, остановите экземпляр адаптера в административной панели iobBroker.
- Откройте командную оболочку на соответствующем сервере.
- Запустите адаптер вручную, используя`DEBUG=hap* node /opt/iobroker/node_modules/iobroker.homekit-controller/build/main.js 0 --debug --logs`
- Затем выполните действия, вызывающие ошибку, получите лог из командной строки и опубликуйте его вместе с описанием проблемы.
- Разместите лог консоли также в этом сообщении. Это позволит сгенерировать лог на уровне протокола.
- Кроме того, найдите нужный объект на вкладке «Объекты» в разделе «Администрирование», нажмите на значок карандаша справа и укажите JSON-код объекта.

### Ресурсы и ссылки

- Ресурс, который пытается расшифровать`Elgato` особые состояния: <https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d>

### TODO

- Проверьте, как адаптер работает с кнопками (у них нет состояния, и у меня нет такого устройства. Нужна помощь в этом вопросе).
- изучите информацию о поддержке видеоустройств.
- Изучите устройства поддержки, которые предоставляют изображения (метод существует, но я никогда не видел его в действии).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.5.11 (2024-10-31)
* (Apollon77) Stability and compatibility improvements for BLE

### 0.5.10 (2024-01-26)
* (bluefox) Fix user interface

### 0.5.9 (2023-11-23)
* (Apollon77) Prevent crash when a single value is returned as error status
* (Apollon77) send booleans always as 0/1 to make sure all devices handle it correctly
* (Apollon77) Update dependencies

### 0.5.8 (2023-02-27)
* (Apollon77) Update Noble to address CPU/RAM issues

### 0.5.7 (2023-01-27)
* (Apollon77) Added support for Ikea Dirigera Hubs and other devices with very log Accessory IDs
* (Apollon77) Optimize handling of configuration changes
* (Apollon77) Optimize connection state handling

### 0.5.6 (2023-01-05)
* (Apollon77) Upgrade noble library

### 0.5.5 (2022-12-31)
* (Apollon77) Downgrade noble library again

### 0.5.3 (2022-12-22)
* (bluefox) Corrected active TAB Background

### 0.5.2 (2022-12-22)
* (bluefox) Updated GUI packages
* (Apollon77) Upgraded noble BLE library

### 0.5.1 (2022-06-10)
* (Apollon77) Optimizations for BLE connections

### 0.5.0 (2022-06-08)
* (Apollon77) Add Connection identifier for Admin object list
* (Apollon77) Count polling errors and reinitialize device connection when too many errors occur
* (Apollon77) Optimize adapter startup to prevent double initialization of devices

### 0.4.4 (2022-05-06)
* (Apollon77) Add Host header to HTTP devices to prevent issues with some devices
* (Apollon77) Fix several edge case issues

### 0.4.3 (2022-01-25)
* (Apollon77) make sure all connections get closed on reconnect

### 0.4.2 (2022-01-25)
* (Apollon77) Reset HTTP connection if timeouts happen on data polling

### 0.4.1 (2022-01-21)
* (Apollon77) Optimize close of connections on adapter stop

### 0.4.0 (2022-01-21)
* (Apollon77) performance increase by using persistent connections to IP devices and many more optimizations
* (Apollon77) Only use one queue for all BLE devices
* (Apollon77) Store pairing data directly after pair
* (Apollon77) Optimize handing of concurrent requests
* (Apollon77) Optimize value update handling and better detect stale data to force an update on next polling

### 0.3.3 (2021-10-26)
* (bluefox) Fix the Discovery checkboxes

### 0.3.1 (2021-10-25)
* (Apollon77) Fix datatype of lastDiscovered state

### 0.3.0 (2021-10-24)
* (Apollon77) BREAKING CHANGE: All channel names will be changed and a number gets added at the end of the name. Please manually delete the ones without such a number

### 0.2.0 (2021-10-23)
* (bluefox) Add Admin UI
* (Apollon77) Store pairing data additionally in an instance directory and retry them on start if objects where deleted or such
* (Apollon77) Add info.lastDiscovered state with a timestamp to allow manual cleanup of devices that are paired somewhere else then with the adapter instance (because such objects would currently not be deleted)
* (Apollon77) Add missing device and channel objects
* (Apollon77) Always convert bool-type to boolean because it might be numbers coming from the devices
* (Apollon77) sort devices for Admin UI to have those with available actions on top
* (Apollon77) Enhance error messages
* (Apollon77) Adjust some roles

### 0.1.0 (2021-10-19)
* (Apollon77) Optimizations and added some Elgato states
* (Apollon77) Initial GitHub release

### 0.0.x
* (Apollon77) Initial commit and Alpha GitHub testing

## License
MIT License

Copyright (c) 2021-2024 Ingo Fischer <github@fischer-ka.de>

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