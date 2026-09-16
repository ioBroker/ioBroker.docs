---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.opendtu/README.md
title: ioBroker.opendtu
hash: bK2YqK7+R30UTb51u9qECvub7wc1MW2UUWD2Y97Prqs=
---
![Логотип](../../../en/adapterref/iobroker.opendtu/admin/opendtu.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.opendtu.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.opendtu.svg)
![Количество установок](https://iobroker.live/badges/opendtu-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/opendtu-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.opendtu.png?downloads=true)
![Тестирование и выпуск](https://github.com/o0shojo0o/ioBroker.opendtu/workflows/Test%20and%20Release/badge.svg)
![CodeQL](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml/badge.svg)

# ioBroker.opendtu

## адаптер opendtu для ioBroker

Этот адаптер получает данные из проекта [OpenDTU](https://github.com/tbnobody/OpenDTU) в режиме реального времени.\
&#x20;Кроме того, следующие параметры можно использовать через адаптер для управления ограничением мощности OpenDTU.

```
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_absolute
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_relative
- opendtu.0.xxxxxx.power_control.limit_persistent_absolute
- opendtu.0.xxxxxx.power_control.limit_persistent_relative  
```

Для получения более подробной информации о данных, ознакомьтесь с их описанием или перейдите [по этой ссылке](https://github.com/tbnobody/OpenDTU/blob/master/docs/MQTT_Topics.md#inverter-limit-specific-topics) .

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы @o0Shojo0o ( <https://github.com/o0Shojo0o> ), который разрабатывал предыдущие версии этого адаптера.

## Как сообщать о проблемах и отправлять запросы на добавление новых функций

В идеале, пожалуйста, используйте для этого раздел "Проблемы" на GitHub, а наилучший способ — установить для адаптера режим отладочного логирования (Экземпляры -> Экспертный режим -> Уровень логирования столбцов). Затем получите файл лога с диска через подкаталог ioBroker 'log', **а не** через административную панель, так как это позволит сократить строки.

## Конфигурация

1. Создайте новый экземпляр адаптера.
2. Укажите параметры безопасности _(по умолчанию http)_ , IP-адрес и порт _(по умолчанию 80)_ оборудования [OpenDTU.](https://github.com/tbnobody/OpenDTU)
3. Установите пароль для веб-интерфейса **(это обязательно, если он неверный, установить ограничение будет невозможно!).**
4. Сохраните настройки

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 3.1.0 (2024-12-02)
- (mattreim) Variable polling interval has been removed and polling intervals hev been increased.
- (mattreim) Description has been translated into supported languages.
- (mattreim) Admin-UI has been adapted for some display sizes.
- (mcm1957) Dependencies have been updated.

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.opendtu/blob/main/CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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