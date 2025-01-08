---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adddevice.md
title: Как добавить устройство в Alexa или Google Home
hash: KJyj2QNgNPa29Jr/BcB/QJi6yPa8ucW5nGzTU+4Hr+A=
---
# Как добавить устройство в Alexa или Google Home
Чтобы добавить устройство, нам нужно выполнить 4 шага:

- При необходимости расширьте государственные роли, добавив необходимые новые роли.
- Расширьте тип детектора новым устройством
- Добавьте устройство в iobroker.devices, чтобы можно было его имитировать.
- Добавить устройство в Alexa/Google и т.д.

## Новые роли
У нас есть 3 (или даже больше) источника, которые необходимо проверить перед добавлением нового устройства:

- API умного дома Alexa: https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-brightnesscontroller.html
- API Яндекса: https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-types-docpage/
- API Google: https://developers.google.com/assistant/smarthome/guides

Кроме того, может быть полезно проверить имеющееся устройство в каком-либо адаптере.

Возьмем в качестве примера кондиционер. У нас есть:

- https://yandex.ru/dev/dialogs/alice/doc/smart-home/concepts/device-type-thermostat-ac-docpage/
- https://developer.amazon.com/de-DE/docs/alexa/device-apis/alexa-thermostatcontroller.html
- https://developers.google.com/assistant/smarthome/guides/aircooler

Наиболее полная картина состояний у Яндекса, поэтому разумно взять ее за основу.
Мы увидели, что для режима термостата и для положения качания в документации нет ролей.

Поэтому мы добавим его здесь: https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md#air-condition-or-thermostat

Все остальные состояния (мощность, заданная температура) пока существуют.

## Тип детектора
После того, как все требуемые роли будут добавлены или найдены, детектор типов должен быть расширен.
Добавьте новый тип устройства в глобальный список: https://github.com/ioBroker/ioBroker.type-detector/blob/master/index.js#L29 Возьмите какое-нибудь устройство за основу и скопируйте его в `patterns` класса `ChannelDetector`.
Детектор типов должен каким-то образом различать устройства, поэтому ваше устройство должно иметь уникальный набор ролей.
Мы возьмем `level.temperature` и `level.mode.thermostat` в качестве определенного шаблона для кондиционера и отметим эти два состояния как `required`.
Самые сложные устройства должны быть вверху списка, поэтому они будут обнаружены первыми, а в конце будут идти все более и более простые устройства.

Вам необходимо создать новую версию пакета npm `iobroker.type-detector`.

## Iobroker.устройства
Перейдите по адресу https://github.com/ioBroker/ioBroker.devices/blob/master/src/package.json и обновите свою версию там.
После этого расширьте список иконок: https://github.com/ioBroker/ioBroker.devices/blob/master/src/src/Components/TypeIcon.js

И создайте новую версию тоже.