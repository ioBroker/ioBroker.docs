---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.govee-local/README.md
title: без заголовка
hash: 0+ORttMM0E5A5h+aitNGmGMC97RYQQ4WFXIfEaZsbJY=
---
![Логотип](../../../en/adapterref/iobroker.govee-local/admin/govee-local.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.govee-local.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.govee-local.svg)
![Количество установок](https://iobroker.live/badges/govee-local-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/govee-local-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.govee-local.png?downloads=true)

## Govee-local адаптер для ioBroker
**Тесты:** ![Тестирование и выпуск](https://github.com/boergegrunicke/ioBroker.govee-local/workflows/Test%20and%20Release/badge.svg)

Управляйте устройствами Govee через локальный доступ (без облака)

Чтобы иметь возможность локально управлять устройством govee, эту функцию необходимо явно включить в настройках приложения govve, как описано в [документация](<https://app-h5.govee.com/user-manual/wlan-guide#:~:text=Supported%20Product%20Models%20(continually%20updated)>). Поскольку в настоящее время у меня есть только лампа H6051, это единственное устройство Могу протестировать с помощью.

Для пользователей **Windows**: зайдите в настройки и убедитесь, что вы выбрали правильный сетевой интерфейс, иначе адаптер не получит никакого ответа от устройств Govee.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.5 (2024-01-13)

-   create only one socket, as the second seems not to be necessary
-   refactoring the code for better structure
-   possibility to choose listen interface in settings

### 0.2.4 (2024-01-05)

-   fix access

### 0.2.2 (2024-01-05)

-   fix color temperature messsage

### 0.2.1 (2023-12-24)

-   repair onOff / all other actions Fixes: [#65](https://github.com/boergegrunicke/ioBroker.govee-local/issues/65)
-   fix log spamming because of wildcard

### 0.2.0 (2023-12-17)

-   support controlling the color
-   extended logging mode

### 0.1.2 (2023-09-06)

-   change icon path and resolution

### 0.1.1 (2023-08-21)

-   fix image

### 0.1.0 (2023-08-09)

-   make search intervals configurable
-   clear all timeouts, when adapter is stopped
-   replace forbidden characters in names
-   update translations
-   update dependecies

### 0.0.6 (2023-05-18)

-   update dependencies

### 0.0.5 (2023-04-02)

-   make pipeline run

### 0.0.4 (2023-04-02)

-   make device status refresh invertal indepentent from device search interval

### 0.0.3 (2023-04-01)

-   update dependecies

### 0.0.2

-   frequently searching for devices and requesting their specific state
-   on / off state, brightness and and color temperature can be controlled

## License

MIT License

Copyright (c) 2024 Børge Grunicke

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
