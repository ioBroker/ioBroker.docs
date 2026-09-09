---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.oekofen-json/README.md
title: ioBroker.oekofen-json
hash: zdn+Hu3qc5ThAR3NqNSucR7KhDE8tvjxxnNeeuWGH20=
---
![Логотип](../../../en/adapterref/iobroker.oekofen-json/admin/oekofen-json.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.oekofen-json.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.oekofen-json.svg)
![Количество установок](https://iobroker.live/badges/oekofen-json-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/oekofen-json-stable.svg)
![Статус зависимости](https://img.shields.io/david/chaozmc/iobroker.oekofen-json.svg)
![НПМ](https://nodei.co/npm/iobroker.oekofen-json.png?downloads=true)
![Тестирование и выпуск](https://github.com/chaozmc/ioBroker.oekofen-json/workflows/Test%20and%20Release/badge.svg)

# ioBroker.oekofen-json

## адаптер oekofen-json для ioBroker

### Описание

Этот адаптер подключает нагреватель OekoFEN с новым сенсорным интерфейсом (также называемым [Pelletronic Touch](https://www.oekofen.com/en-gb/pelletronic-touch/) ) к ioBroker. Поскольку OekoFEN реализовывал JSON-интерфейс поэтапно и без общедоступной документации, он должен работать как минимум с версией 3.10d и новее. Поскольку существует множество комбинаций нагревателей, солнечных модулей, накопителей энергии, двигателей Sterling и т. д., этот адаптер пытается считать все доступные данные из интерфейса и создает объекты на лету при запуске.

Данные только для чтения создаются таким образом, что их имя начинается с префикса L\_. Также адаптер преобразует масштаб числа в соответствии с информацией, предоставляемой интерфейсом (атрибут factor). Например, нагреватель работает с температурами в формате XXX и коэффициентом 0,1; адаптер преобразует это в XX.X при операциях чтения и обратно в XXX при операциях записи.

### Установка

После установки потребуется лишь ввести

- IP-адрес
- TCP-порт,
- так называемый пароль
- и интервал

в этот момент адаптер пытается загрузить обновления.

Адаптер поддерживает состояние подключения, даже если нет реального постоянного соединения. Если устройство отправляет ошибку или адаптер не может связаться с контроллером OekoFEN, он устанавливает состояние подключения в значение false. Например, это может произойти, если на контроллер поступает слишком много запросов, и в этом случае он отвечает HTTP 401. В нормальных условиях лимит запросов контроллера не должен быть превышен (2,5 секунды между запросами).

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы Маркуса Фейлера (chaozmc) <https://github.com/chaozmc> , который создал предыдущие версии этого адаптера.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now

### 2.0.0 (2025-11-26)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Dependencies have been updated

### 1.0.5 (2023-09-23)
* (chaozmc) set min node version to 18.x (merge pull request #23)

### 1.0.4 (2023-09-22)
* (chaozmc) Removed Node 16.x from Test-and-release (fix Issue #19)
* (chaozmc) updated dependencies
* (chaozmc) updated protobufjs and google-gax
* (chaozmc) updated word-wrap

### 1.0.3 (2023-05-09)
* (chaozmc) Bump version

### 1.0.2 (2023-05-09)
* (chaozmc) Added missing translations
* (chaozmc) Updated Copyright Year
* (chaozmc) Added .releaseconfig.json for release-script
* (chaozmc) changed github workflow config

### **0.0.3**
* (chaozmc) code cleanup, trigger for update & rescan

### **0.0.2**
* (chaozmc) first working release, fixed 0-value updates

### **0.0.1**
* (chaozmc) initial build phase, much try and error

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.oekofen-json/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 chaozmc <chaozmc@is-jo.org>

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