---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adddevice.md
title: Как добавить устройство в Alexa или Google Home
hash: 7LOEqf58Vo+Ne7CyV77jozHsy8UjnC7Ghl8TQAR8aD0=
---
# Как добавить устройство в Alexa или Google Home
Чтобы добавить устройство, у нас есть 4 шага:

- Расширьте государственные роли необходимыми новыми ролями, если это необходимо.
- Расширьте детектор типа новым устройством
- Добавьте устройство в iobroker.devices, чтобы можно было его имитировать.
- Добавить устройство в Alexa/Google и др.

## Новые роли
У нас есть 3 (или даже больше) источника, которые необходимо проверить перед добавлением нового устройства:

- API умного дома Alexa: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- API Яндекса: https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- Google API: https://developers.google.com/assistant/smarthome/guides

Кроме того, может быть полезно проверить существующее устройство в каком-либо адаптере.

Возьмем в качестве примера кондиционер. У нас есть:

- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

У Яндекса самая полная картина состояний, так что разумно было бы взять ее за основу.
Мы могли видеть, что для режима термостата и положения поворота в документации нет ролей.

Поэтому мы добавим его сюда: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat.

Все остальные состояния (мощность, заданная температура) пока существуют.

## Детектор типа
После того, как все необходимые роли добавлены или найдены, необходимо расширить детектор типов.
Добавьте новый тип устройства в глобальный список: https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29 Возьмите за основу какое-то устройство и скопируйте его в `patterns` класс `ChannelDetector`.
Детектор типов должен каким-то образом различать устройства, поэтому у вашего устройства должен быть уникальный набор ролей.
Мы возьмем `level.temperature` и `level.mode.thermostat` в качестве определенного шаблона для кондиционера и пометим эти два состояния как `required`.
Самые сложные устройства должны быть вверху в списке, чтобы они были обнаружены первыми, а в конце шло все больше и больше простых устройств.

Вы должны создать новую версию пакета `iobroker.type-detector` npm.

 ## iobroker.devices
Перейдите на https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json и обновите там свою версию.
После этого расширьте список значков: https://github.com/ioBroker/ioBroker.devices/blob/master/src/src/Components/TypeIcon.js.

 И создать новую версию тоже.
