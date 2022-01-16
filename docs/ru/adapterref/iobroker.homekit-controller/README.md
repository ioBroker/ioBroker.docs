---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homekit-controller/README.md
title: ioBroker.homekit-контроллер
hash: NQucAtiQUOyd1k9Pgl1FFdssx3fMn5PPmENuplDEnWQ=
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

... поддержка устройств на основе потоков. Спецификации Homekit Thread еще не опубликованы.

### Как пользоваться адаптером
Адаптер прослушивает доступные устройства в вашей сети.

Существует три «типа» обнаруженных устройств:

* **Несопряженные устройства** — это устройства, которые обнаружены и доступны для сопряжения. Для этих устройств в ioBroker генерируются некоторые базовые состояния, которые содержат некоторые информационные и административные состояния. Указав PIN-код, вы можете связать эти устройства с этим экземпляром адаптера (см. раздел «Сопряжение» ниже).
* **Сопряженные с этим экземпляром** устройства могут полностью контролироваться, значения состояния будут обновляться в «реальном времени» с использованием подписок (только для IP-устройств) и интервала опроса данных. Устройство также может быть «отвязано» от этого экземпляра (см. раздел ниже).
* **Устройства, сопряженные с кем-то другим** — это устройства, которые обнаружены, но уже связаны с каким-либо другим контроллером. Они регистрируются в режиме отладки, но для них не создаются состояния. Если вы хотите использовать их с ioBroker, вам сначала нужно отключить их от их текущего контроллера (иногда это возможно только с полной перезагрузкой или чем-то подобным — см. руководство), и после этого они должны отображаться как «несопряженное устройство».

После сопряжения поддерживаемые состояния считываются с устройства и создаются объекты и состояния. Все известные точки данных, определенные в стандарте HomeKit, должны быть названы в понятной для человека форме. Если вы видите UUID как имена, значит производитель устройства добавил самоопределяемые данные. Если известно, что они предоставляют, это можно добавить в адаптер (например, как те, которые добавлены для устройств Elgato), чтобы они отображались как названные в следующей версии.

Точки данных создаются с правильными состояниями и, если они доступны, с правильными ролями. В противном случае используются общие роли.

### Идентифицировать информацию
Устройства, которые не связаны ни с одним контроллером, имеют состояние admin.identify, которое можно активировать с помощью «true». В этом случае соответствующее устройство должно идентифицировать себя (например, должна мигать лампа или что-то в этом роде, чтобы его можно было идентифицировать). Эта функция доступна только до тех пор, пока устройство не сопряжено с контроллером.

#### Информация о сопряжении
Чтобы связать устройство с этим экземпляром адаптера, вам необходимо предоставить контактный код, который показан на устройстве, или этикетку или что-то подобное. PIN-код — это 8 цифр рядом с QR-кодом. Числа необходимо вводить в формате 123-45-678 (даже если прочерки не напечатаны на этикетке или не показаны на экране!)

Прямо сейчас необходимо ввести PIN-код в состояние admin.pairWithPin — вскоре последует пользовательский интерфейс администратора.

После сопряжения устройства с этим экземпляром НЕВОЗМОЖНО также добавить устройство в приложение Apple Home или подобное параллельно.

Могут быть случаи, которые все еще проблематичны для сопряжения, потому что я смог протестировать только с очень немногими устройствами, поэтому, пожалуйста, сообщите о проблемах, и я поддержу инструкциями, чтобы получить необходимые данные для отладки.

#### Информация об удалении пары
Чтобы разорвать пару, просто активируйте состояние «admin.unpair» с «true», и процесс развязки будет выполнен — вскоре последует пользовательский интерфейс администратора.

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
Сопряжение mModus с PIN-кодом и связыванием

BLE: исправление iobroker

https://github.com/noble/noble#работает на Linux

Adapterinstanz остановлен в машине администратора Оболочка на стороне администратора DEBUG=hap* node /opt/iobroker/node_modules/iobroker.homekit-controller/build/main.js 0 --debug --logs Имя администратора в конфигурации адаптера ( адаптер nicht dort nochmal starten ... der läuft schon auf der Kommendozeile) und einmal pairen und warten bis wieder fehler kommt und so Dann Log von der Shell bitte posten. Da sollte mehr drin sein. gern als File hier anhängen Zusätzlich bitte im Admin unter Objekte mal das Device Objekt siuchen von dem Gerät und da rechts auf den Stift clicken und auch das JSON posten was da angezeigt wird unter "Raw" oder so

характеристика парной настройки не найдена

https://forum.iobroker.net/post/726590

### Ресурсы и ссылки
* Ресурс, который пытается расшифровать особые состояния Elgato: https://gist.github.com/simont77/3f4d4330fa55b83f8ca96388d9004e7d

### СДЕЛАТЬ
* проверить как адаптер работает с кнопками (у них нет состояния, и у меня нет такого устройства. нужна поддержка для этого)
* изучить поддерживаемые видеоустройства
* изучить устройства поддержки, предлагающие изображения
* проверьте все случаи, когда обновления опроса могут перекрываться - необходима обратная связь, если есть проблемы

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Only use one queue for all BLE devices
* (Apollon77) Store pairing data directly after pair
* (Apollon77) Optimize handing concurrent requests
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

Copyright (c) 2021 Ingo Fischer <github@fischer-ka.de>

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