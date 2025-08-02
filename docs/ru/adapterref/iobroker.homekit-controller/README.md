---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit-контроллер
hash: +2YzgHirnHHWaBtRjfXGg0pLsndjbJJuAgYkUoisYvA=
---
![Логотип](../../../en/adapterref/iobroker.homekit-controller/admin/homekit-controller.png)

![Количество установок (последние)](https://iobroker.live/badges/homekit-controller-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/homekit-controller-stable.svg)
![версия NPM](https://img.shields.io/npm/v/iobroker.homekit-controller.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homekit-controller.svg)

# IoBroker.homekit-контроллер
![Тестируйте и выпускайте](https://github.com/Apollon77/ioBroker.homekit-controller/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/homekit-controller/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Адаптер homekit-controller для ioBroker
Этот адаптер позволяет подключать и напрямую управлять устройствами с логотипом «работает с HomeKit», которые нельзя использовать с Apple Home. Адаптер поддерживает устройства IP/WLAN, а также устройства BLE (Bluetooth LE). Адаптер работает полностью локально в вашей сети.

### Адаптер не...
... предлагая устройства или состояния ioBroker для управления приложением/системой Apple Home. Если вам нужно это направление, используйте адаптер [яхка](https://github.com/jensweigele/ioBroker.yahka).

... поддержка устройств на основе Thread "только". Спецификации Homekit Thread еще не опубликованы. Насколько нам известно, все устройства на рынке также поддерживают BLE или WLAN, поэтому адаптер просто не будет использовать Thread, а будет использовать другие способы связи.

### Как пользоваться адаптером
Адаптер прослушивает доступные устройства в вашей сети.

Существует три «типа» обнаруженных устройств:

* **Несопряженные устройства** — это устройства, которые обнаружены и доступны для сопряжения. Для этих устройств в ioBroker генерируются некоторые базовые состояния, которые содержат некоторые информационные и административные состояния. Указав PIN-код, вы можете связать эти устройства с этим экземпляром адаптера (см. раздел «Сопряжение» ниже).
* **Сопряженные с этим экземпляром** устройства можно полностью контролировать, значения состояния будут обновляться в «реальном времени» с использованием подписок (только для IP-устройств) и интервала опроса данных. Устройство также может быть «отвязано» от этого экземпляра (см. раздел ниже).
* **Устройства, сопряженные с кем-то еще** — это устройства, которые обнаружены, но уже связаны с каким-либо другим контроллером. Они регистрируются в режиме отладки, но для них не создаются состояния. Если вы хотите использовать их с ioBroker, вам сначала нужно отключить их от их текущего контроллера (иногда это возможно только с полной перезагрузкой или чем-то подобным — см. руководство), и после этого они должны отображаться как «несопряженное устройство».

После сопряжения поддерживаемые состояния считываются с устройства и создаются объекты и состояния. Все известные точки данных, определенные в стандарте HomeKit, должны быть названы в понятной для человека форме. Если вы видите UUID как имена, значит, производитель устройства добавил самоопределяемые данные. Если известно, что они предоставляют, это можно добавить в адаптер (например, как те, которые добавлены для устройств Elgato), чтобы они отображались как названные в следующей версии.

Точки данных создаются с правильными состояниями и, если они доступны, с правильными ролями. В противном случае используются общие роли.

### Идентифицировать информацию
Устройства, которые не связаны ни с одним контроллером, находятся в состоянии `admin.identify`, которое можно активировать с помощью `true`. В этом случае соответствующее устройство должно идентифицировать себя (например, должна мигать лампа или что-то в этом роде, чтобы его можно было идентифицировать). Эта функция доступна только до тех пор, пока устройство не сопряжено с контроллером.

#### Информация о сопряжении
Чтобы связать устройство с этим экземпляром адаптера, вам необходимо предоставить контактный код, который показан на устройстве, или этикетку или что-то подобное. PIN-код — это 8 цифр рядом с QR-кодом. Числа необходимо вводить в формате 123-45-678 (даже если прочерки не напечатаны на этикетке или не показаны на экране!)

Прямо сейчас необходимо ввести PIN-код в состояние admin.pairWithPin — вскоре последует пользовательский интерфейс администратора.

После сопряжения устройства с этим экземпляром НЕВОЗМОЖНО также добавить устройство в приложение Apple Home или подобное параллельно.

Могут быть случаи, которые все еще проблематичны для сопряжения, потому что я смог протестировать только с очень немногими устройствами, поэтому, пожалуйста, сообщите о проблемах, и я поддержу инструкциями, чтобы получить необходимые данные для отладки.

#### Информация об отсоединении
Чтобы разорвать пару, просто активируйте состояние `admin.unpair` со значением «true», и процесс разъединения будет выполнен — вскоре последует пользовательский интерфейс администратора.

#### Специальные примечания по использованию IP-устройств
IP-устройства обнаруживаются с помощью пакетов UDP, поэтому ваш хост должен находиться в той же сети, что и устройства. В настоящее время нет реального способа обойти это, потому что используемая запись MDNS содержит важную информацию для процесса сопряжения.
Особенно при использовании Docker вам нужно найти способы (режим хоста, macvlan, ...) для просмотра пакетов UDP.

Основная проблема для IP-устройств на основе WLAN без элементов управления или экрана — подключить их к вашей сети WLAN. Скорее всего, существует специальное мобильное приложение производителя для первоначального добавления устройств в вашу сеть. Если этот первоначальный процесс также связывает устройство с Apple Home, вам может потребоваться отключить его впоследствии (например, https://www.macrumors.com/how-to/delete-homekit-device/). После этого он должен быть в вашей WLAN и доступен для сопряжения с этим адаптером.

Как только IP-устройство сопряжено и IP-адрес остается прежним, адаптер напрямую подключается к устройству при запуске. Так что лучше всего закрепить IP в вашем маршрутизаторе. Если IP-адрес изменился, то соединение должно быть установлено при следующем обнаружении, а IP-адрес должен быть обновлен.

#### Специальные примечания по использованию устройств BLE
По умолчанию BLE отключен в настройках адаптера. После включения доступные устройства могут быть обнаружены.

Из-за ограничений устройств Bluetooth недоступны «обновления в реальном времени» изменений состояния. Устройства будут сообщать о «важных изменениях состояния» (например, об изменениях состояния «Включено») с помощью специальных пакетов, которые вызывают немедленное обновление данных. Кроме того, данные обновляются через определенные интервалы опроса данных. Не устанавливайте их слишком короткими!

После перезапуска адаптера Bluetooth-устройства не могут быть подключены напрямую — системе необходимо получить хотя бы один пакет обнаружения от устройства, чтобы получить необходимые сведения о подключении. Это означает, что устройства BLE могут быть доступны с небольшой задержкой.

### Исправление проблем
#### Известные несовместимые устройства
Если у вас возникли проблемы с сопряжением устройства с этим адаптером, попробуйте выполнить сопряжение с обычным приложением iOS Apple Home. Если это не работает, значит, что-то странное с устройством, и тогда этот адаптер также не может помочь. Pot попробуй сброс, а то иначе шансов нет.

В настоящее время это так для некоторых `Tado Door Locks`, например. Они должны быть сопряжены с помощью `Tado App`, который каким-то образом регистрирует устройство в Apple Home, но не через официальный процесс сопряжения.

Кроме того, `Nuki 3 Locks (BLE)` невозможно спарить, поскольку они используют компоненты аппаратной аутентификации, которые не задокументированы Apple в открытом доступе.

Для Netatmo пользователь узнал, как возможно сопряжение, когда у него возникла проблема. См. https://github.com/Apollon77/ioBroker.homekit-controller/issues/233#issuecomment-1311983379.

#### Другие потенциальные проблемы, которые необходимо проверить перед открытием заявки
##### Для устройств BLE
* Если у вас есть проблемы с тем, что соединение BLE не работает, и вы получаете ошибки, когда адаптер пытается инициализировать соединение BluetoothLE, сначала запустите `iobroker fix`, чтобы убедиться, что все разрешения и необходимые возможности установлены правильно.
* Если это не поможет, проверьте https://github.com/noble/noble#running-on-linux.
* Пожалуйста, убедитесь, что ваша система обновлена, включая обновление ядра `apt update && apt dist-upgrade`
* Попробуйте сбросить соответствующее устройство BLE, например. `сброс sudo hciconfig hci0`
* Для проблем также предоставьте вывод `uname -a` и `lsusb`
* Журнал устройства BLE низкого уровня можно получить с помощью `sudo hcidump -t -x >log.txt` (во второй оболочке дополнительно для запуска адаптера)

##### Общие советы
* Есть ли на устройстве режим сопряжения или что-то подобное, которое необходимо сначала активировать? Но также внимательно прочитайте руководство, возможно, режим сопряжения предназначен для какого-то другого устаревшего протокола или моста, но не для Apple Home.
* В основном, если при попытке сопряжения появляется ошибка «Характеристика настройки пары не найдена», это означает, что устройство не поддерживает сопряжение через Homekit в его текущем состоянии. Тогда адаптер ничего не может сделать!
* Обязательно вводите PIN-код с тире в формате «XXX-XX-XXX». Другие форматы должны быть отклонены библиотекой уже по ошибке, но просто для уверенности

## Отладка
Если у вас есть проблемы и вы хотите сообщить о проблеме (см. ниже), расширенный журнал отладки всегда полезен.

* Остановите экземпляр адаптера в админке iobBroker.
* Откройте оболочку на соответствующем сервере
* Вручную запустите адаптер, используя узел `DEBUG=hap* /opt/iobroker/node_modules/iobroker.homekit-controller/build/main.js 0 --debug --logs`
* Затем сделайте все, что приведет к ошибке, возьмите журнал из оболочки и отправьте сообщение с проблемой.
* выложите лог консоли также в выдаче. Это создаст журнал на уровне протокола.
* Кроме того, найдите соответствующий объект на вкладке «Объекты» администратора, щелкните карандаш справа и укажите JSON объекта.

### Ресурсы и ссылки
* Ресурс, который пытается расшифровать особые состояния `Elgato`: https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d

### ДЕЛАТЬ
* проверить как адаптер работает с кнопками (у них нет состояния, и у меня нет такого устройства. нужна поддержка для этого)
* изучить поддерживаемые видеоустройства
* посмотрите на устройства поддержки, которые предлагают изображения (метод есть, но никогда не видел его в действии)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

Copyright (c) 2021-2023 Ingo Fischer <github@fischer-ka.de>

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
