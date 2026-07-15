---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.air-q/README.md
title: ioBroker.air-q
hash: n8TAgcFn4LhWTlqTjxNW1MkZ003SePBMmj9nOZmqgXo=
---
# IoBroker.air-q

![Версия NPM](https://img.shields.io/npm/v/iobroker.air-q.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.air-q.svg)
![Количество установок](https://iobroker.live/badges/air-q-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/air-q-stable.svg)
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
В административном интерфейсе перейдите к `Adapters` на боковой панели и найдите `air-q` в `Filter by name`. Выберите `+` (`Add instance`) в меню `⋮` (`Info`) адаптера.

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
![Конфигурация](../../../en/adapterref/iobroker.air-q/docs/screenshot-config.png)

### Как найти ваше устройство air-Q
Адаптер может автоматически обнаруживать устройства air-Q в вашей локальной сети с помощью mDNS (Bonjour). При открытии настроек экземпляра в раскрывающемся списке **Сканировать сеть** будет выполнен поиск устройств (примерно 10 секунд), и отобразится список всех найденных устройств air-Q по имени. Выберите ваше устройство, и короткий идентификатор и IP-адрес будут заполнены автоматически.

**Если устройства не обнаружены**, возможно, ваш маршрутизатор блокирует mDNS-трафик между устройствами (это часто встречается в ячеистых сетях, гостевых сетях или корпоративных системах). В этом случае установите флажок **Подключиться по IP** и введите IP-адрес устройства вручную. IP-адрес можно найти в приложении air-Q для смартфона или в списке устройств вашего маршрутизатора.

Вы также можете настроить адаптер через **ioBroker.discovery**: запустите сканирование сети с помощью адаптера обнаружения, и устройства air-Q будут обнаружены автоматически через DNS или HTTP.

### Варианты подключения
- **Сканирование сети**: Автоматически обнаруживает устройства air-Q через mDNS. Выберите устройство, чтобы автоматически заполнить короткий идентификатор и IP-адрес.
- **Подключение по IP-адресу**: Подключайтесь напрямую, используя IP-адрес устройства. Используйте этот вариант, если обнаружение mDNS не работает в вашей сети.
- **Краткий идентификатор**: первые 5 символов серийного номера вашего устройства. Используется для поиска mDNS, если флажок «Подключиться по IP» снят.
- **Пароль устройства**: Пароль вашего устройства air-Q.

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

### 1.2.0
* **Network discovery**: air-Q devices on the local network are now automatically discovered via mDNS. Select a device from the dropdown and the Short ID and IP are filled in automatically.
* **Admin UI modernized**: Migrated from Materialize HTML to jsonConfig (declarative JSON). Settings are now organized in two tabs: Connection and Data Retrieval.
* **ioBroker.discovery integration**: Fixed the detection file to correctly populate adapter config fields, call the discovery callback, and distinguish multiple air-Q devices. Added HTTP `/ping` fallback for networks without reverse DNS.
* **Troubleshooting guidance**: The admin UI now explains what to do when mDNS doesn't work (router blocking, how to find the device IP).

### 1.1.0
* Added support for 19 new sensors: acetaldehyde (C₂H₄O), arsine (AsH₃), bromine (Br₂), methanethiol (CH₄S), chlorine dioxide (ClO₂), carbon disulfide (CS₂), ethylene (C₂H₄), fluorine (F₂), temperature in Farenheit, hydrochloric acid (HCl), hydrogen cyanide (HCN), hydrogen fluoride (HF), hydrogen peroxide (H₂O₂), mold protection, phosphine (PH₃), refrigerant R-32, refrigerant R-454B, refrigerant R-454C, silane (SiH₄)

### 1.0.7
* Missing (e.g. warming up) sensors are skipped gracefully
* Fixed incorrect translations
* Refactor redundant methods

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

Copyright (c) 2024-2026 Corant GmbH

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