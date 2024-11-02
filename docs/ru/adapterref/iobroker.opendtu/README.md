---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.opendtu/README.md
title: ioBroker.opendtu
hash: alLXbwYFsoM6loMs4wtm8WG7PEhiR+WLYwwf3XsM8wg=
---
![Логотип](../../../en/adapterref/iobroker.opendtu/admin/opendtu.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.opendtu.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.opendtu.svg)
![Количество установок](https://iobroker.live/badges/opendtu-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/opendtu-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.opendtu.png?downloads=true)

# IoBroker.opendtu
**Тесты:** ![Тест и выпуск](https://github.com/o0shojo0o/ioBroker.opendtu/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml/badge.svg)](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml)

## Адаптер opendtu для ioBroker
Этот адаптер получает точки данных из проекта [OpenDTU](https://github.com/tbnobody/OpenDTU), доступные в режиме реального времени.
Кроме того, следующие точки данных могут использоваться через адаптер для управления ограничением мощности OpenDTU.

```
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_absolute
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_relative
- opendtu.0.xxxxxx.power_control.limit_persistent_absolute
- opendtu.0.xxxxxx.power_control.limit_persistent_relative
```

Для получения дополнительной информации о точках данных см. их описание или нажмите [здесь](https://github.com/tbnobody/OpenDTU/blob/master/docs/MQTT_Topics.md#inverter-limit-specific-topics).

## Кредиты
Этот адаптер был бы невозможен без огромной работы @o0Shojo0o (https://github.com/o0Shojo0o), который разработал предыдущие версии этого адаптера.

## Как сообщать о проблемах и запрашивать новые функции
В идеале, пожалуйста, используйте для этого GitHub issues, а лучший метод достигается путем установки адаптера в режим Debug log (Instances -> Expert mode -> Column Log level). Затем извлеките файл журнала с диска через подкаталог ioBroker 'log', **не** из Admin, что приведет к сокращению строк.

## Конфигурация
1. Создайте новый экземпляр адаптера
2. Заполните поля Безопасность *(по умолчанию http)*, IP-адрес и порт *(по умолчанию 80)* оборудования [OpenDTU](https://github.com/tbnobody/OpenDTU)
3. Установите пароль WebUI **(это обязательно, если он неверный, ограничение не может быть установлено!)**
4. Сохраните настройки.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (mattreim) Description has benn translated into supported languages.
- (mattreim) Admin-UI has been adapted for some display sizes.

### 3.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 3.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 2.1.0 (2024-10-11)

- (o0shojo0o) update dependencies
- (mattreim) support small screens
- (mattreim) update translations
- (mattreim) update object names
- (mattreim) add variable polling intervall [1-59s]

### 2.0.0 (2024-08-13)

- (o0shojo0o) changes for new websocket structure ([#129](https://github.com/o0shojo0o/ioBroker.opendtu/issues/129))
- (o0shojo0o) `Efficiency`, `YieldTotal`, `YieldDay` and `DC Power` moved from the AC section to the INV (old data points must be removed manually)
- (mattreim) update to current OpenDTU logo ([#156](https://github.com/o0shojo0o/ioBroker.opendtu/issues/156))
- (mattreim) update dependencies ([#162](https://github.com/o0shojo0o/ioBroker.opendtu/issues/162)), ([#179](https://github.com/o0shojo0o/ioBroker.opendtu/issues/179))
- (mattreim) fix GUI translation ([#163](https://github.com/o0shojo0o/ioBroker.opendtu/issues/163))

### 1.0.1 (2023-10-29)

- (o0shojo0o) fixed `power_control.current_limit_absolute" has value "-1" less than min "0"`

## License
MIT License

Copyright (c) 2024 Dennis Rathjen <dennis.rathjen@outlook.de>

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