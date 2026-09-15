---
chapters: {"pages":{"en/adapterref/iobroker.tibberlink/README.md":{"title":{"en":"ioBroker.tibberlink"},"content":"en/adapterref/iobroker.tibberlink/README.md"},"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md":{"title":{"en":"Calculator Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/CalculatorConfiguration.md"},"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md":{"title":{"en":"Graph Output Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/GraphOutput.md"},"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md":{"title":{"en":"Vehicles & Chargers Configuration"},"content":"en/adapterref/iobroker.tibberlink/docu/VehiclesAndChargers.md"},"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md":{"title":{"en":"Direct local poll of Pulse data"},"content":"en/adapterref/iobroker.tibberlink/docu/LocalPulse.md"},"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.tibberlink/docu/TemplateFlexChart01.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.tibberlink/docu/LocalPulse.md
title: Прямой локальный опрос данных Pulse.
hash: JO5AJQAI7GiwQALkHcB1Lpxc1idNlvCUFmUdnJMFZq4=
---
# Прямой локальный опрос данных Pulse.

_Часть [документации ioBroker.tibberlink](/#/adapters/tibberlink) ._

Для этого необходимо изменить веб-интерфейс Bridge, чтобы он оставался постоянно включенным. marq24 дает отличное описание того, как это сделать для своей интеграции с Home Assistant, здесь:

<https://github.com/marq24/ha-tibber-pulse-local>

Если всё работает корректно, данные с счётчика будут записываться в состояния ioBroker каждые 2 секунды.

## Поддерживаемые режимы работы счетчика

Из сообщения о мосте Тиббер`meter_mode` для подключенного сетевого счетчика. Адаптер поддерживает оба варианта кодировки телеграмм, используемые распространенными счетчиками:

| `meter_mode` | Кодирование                                                      | Примеры счетчиков          |
| ------------ | ---------------------------------------------------------------- | -------------------------- |
| 1            | Простой текст OBIS                                               | ZPA GH305                  |
| 3            | Бинарный SML                                                     | ISKRA, EasyMeter, EMH, EFR |
| 4            | Обычный текст OBIS (или двоичный SML на некоторых счетчиках EMH) | eBZ DD3                    |
| 5            | Простой текст OBIS                                               | eBZ                        |

Если ваш измеритель показывает другой режим или не обновляется, пожалуйста, создайте заявку, приложив необработанный HEX-код из журнала отладки. Полная техническая информация: [../Info/PulseMeterModes.md](https://github.com/Hombach/ioBroker.tibberlink/blob/master/Info/PulseMeterModes.md) .