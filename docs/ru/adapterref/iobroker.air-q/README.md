---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.air-q/README.md
title: ioBroker.air-q
hash: /mRC28Db6zteKQ26qsHwEGoBQpAsc98CHy0AbKPJ7ns=
---
# IoBroker.air-q

![версия НПМ](https://img.shields.io/npm/v/iobroker.air-q.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.air-q.svg)
![Количество установок](https://iobroker.live/badges/air-q-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/air-q-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.air-q.png?downloads=true)

<img src="admin/air-q.png" alt="airq-logo" width="200"/>

**Тесты:** ![Тестирование и выпуск](https://github.com/CorantGmbH/ioBroker.air-q/workflows/Test%20and%20Release/badge.svg)

## Содержание
- [О нас](#о нас)
- [Начало работы](#start)
- [Список изменений](#change)
- [Лицензия](#лицензия)

## О<a id="about"/>
Этот адаптер ioBroker используется в сочетании с нашим [устройство air-Q](https://www.air-q.com). Он опрашивает значения с наших датчиков и отображает их в среде ioBroker.

</br></br>

![air-Q_frontal + Seitlich_full](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5c38d737-9641-463f-bd07-ac62ce5f1973)

## Начиная<a id="start" />
### Установите адаптер и добавьте экземпляр
В административном интерфейсе перейдите в боковую панель по адресу `Adapters` и найдите `air-q` в `Filter by name`. Выберите `+` (`Add instance`) в меню `⋮` (`Info`) адаптера.

Это автоматически откроет настройки экземпляра.

В противном случае вы можете использовать интерфейс командной строки ioBroker через консоль. Просто перейдите в корневую папку ioBroker и добавьте адаптер.

```
iobroker add air-q
```

Это установит адаптер (если он еще не установлен) и добавит экземпляр. Вам все равно потребуется настроить этот экземпляр, как описано ниже.

Если вам нужно только установить адаптер, не создавая пока экземпляр, используйте следующую команду:

```
iobroker install air-q
```

Для получения более подробной информации посетите документацию по CLI ioBroker по адресу https://github.com/ioBroker/ioBroker/wiki/Console-commands.

## Конфигурация
### Необходимый
Для настройки вашего экземпляра вам достаточно выбрать, хотите ли вы подключиться через IP-адрес или короткий идентификатор вашего устройства.

<img width="1263" height="953" alt="2025-12-10T17:57:57,025532652+01:00" src="https://github.com/user-attachments/assets/93ff4c76-bdf5-4336-bb5a-1a0aa844ec0d" />

Пожалуйста, убедитесь, что вы ввели правильный IP-адрес/идентификатор и пароль.

### Необязательный
- **Учитывать ночной режим устройства**. По умолчанию: `включено`. Если на вашем устройстве air-Q включен ночной режим, но Wi-Fi отключен в ночное время, адаптер может автоматически пропускать попытки опроса в эти часы. Это исключает ненужные ошибки подключения в ваших журналах. ⚠️ Если вы измените настройки ночного режима вашего устройства (время начала/окончания, включение/выключение), у вас есть два варианта:
1. (Рекомендуется): Перезагрузите адаптер, чтобы немедленно загрузить новую конфигурацию.
2. (Автоматический режим): Подождите до 1 часа, пока адаптер автоматически обновит конфигурацию (работает только вне ночного режима).

- **Обрезать отрицательные значения**. По умолчанию: `выкл.`. В целях базовой калибровки некоторые значения датчика могут кратковременно становиться отрицательными. Вы можете безопасно обрезать такие значения до 0.

- **Опрашивать данные каждые x секунд**. По умолчанию: `10`. Вы можете настроить частоту опроса данных, введя число в секундах.

- **Тип получаемых данных**. По умолчанию: `Усредненные данные`. В конфигурации по умолчанию air-Q усредняет поток значений датчика. Этот адаптер позволяет переключаться между опросом усредненных и необработанных данных с устройства. Для опроса зашумленных показаний датчика с устройства выберите `Данные в реальном времени` в выпадающем меню.

Теперь всё должно быть готово, и вы можете начинать работу!

## Датчики — это объекты
Данные будут получены и отображены на вкладке «Объекты» в соответствии с вашей конфигурацией после обнаружения устройства. Конечно, в зависимости от вашего устройства может отображаться больше датчиков.

![Скриншот 2024-02-13 110655](https://github.com/CorantGmbH/ioBroker.air-q/assets/107550719/5639fdcb-3acf-4223-b1fa-fb69016c9d7b)

***На данный момент все датчики для Air-Q Pro включены. Дополнительные датчики будут добавлены в одном из будущих обновлений.***

## Changelog

### 1.0.6
* The adapter can automatically respect your air-Q device's night mode configuration

### 1.0.5
* Fixed sensors dropping custom configuration after a restart
* Updated dependencies: version bump for `adapter-core`

### 1.0.4

* Updated dependencies: bumped multiple packages (`chai-as-promised`, `sinon`, `mocha`) to address vulnerabilities
* Codebase maintenance: updated `io-package.json` and added tests against Node.js 22

### 1.0.3

* Added a checkbox for showing and hiding the password in the instance configuration
* Edited the error messages to be more helpful
* Added logging information when the air-Q device is actually connected

### 1.0.2

* Added units for each sensor value
* Updates within config files

### 1.0.1

* Added sensor list update when connecting to a different air-Q in the same instance
* Fixed name display and update of device

### 1.0.0

* Include typescript files by @pr0crstntr in #6
* Created air-Q class by @pr0crstntr in #4
* Fix restart bug by @pr0crstntr in #7
* Update data poll by @pr0crstntr in #8
* Updated io-package by @pr0crstntr in #9
* Fixed save option for configuration by @pr0crstntr in #16
* Added clear intervals on unload by @pr0crstntr in #26
* Update README by @pr0crstntr in #37
* Changed role for temperature and added unit by @pr0crstntr in #38

### 0.0.1

* (Katharina K.) initial release

## License

MIT License

Copyright (c) 2024 Corant GmbH

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