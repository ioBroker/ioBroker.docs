---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cul/README.md
title: ioBroker.cul
hash: iuC5sWZgWcjohSQ+O7Jp2ALARtgxkY7u6qOQDzUxfMQ=
---
![Логотип](../../../en/adapterref/iobroker.cul/admin/busware.jpg)

![Количество установок](http://iobroker.live/badges/cul-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.cul.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cul.svg)

# ioBroker.cul

![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg)[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Адаптер ioBroker для управления FS20, Max!, HMS и другими устройствами через [CUL](http://busware.de/tiki-index.php?page=CUL) / [cullw](http://culfw.de) . Зависит от <https://github.com/hobbyquaker/cul>

## Поддерживаемые устройства

- _EM_ - EM1000WZ, EMWZ
- _FS20_ , включая ESA1000/2000
- _HMS_ - HMS100-TF, HMS100-T, HMS100-WD, RM100-2, HMS100-TFK, HMS100-MG, HMS100-CO, HMS100-FIT
- _МОРИЦ_ - МАКС!
- _WS_ - KS300TH, S300TH, WS2000/WS7000

## Как сделать

### Отправьте команду устройству FS20, например, с помощью JavaScript.

`sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});`

### Отправьте необработанную команду (например, на устройство InterTechno) с помощью JavaScript.

`sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});`

Эти команды используют библиотеку CUL данного адаптера для отправки команд устройству. Основано на JavaScript/Node.js.`Busware CUL USB / culfw` адаптер

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 3.0.2 (2026-09-02)

- (@GermanBluefox) Удалён скрипт подготовки

### 3.0.1 (2026-08-25)

- (@GermanBluefox) Теперь последовательный порт можно ввести вручную, поэтому ниже приведена символическая ссылка.`/dev/serial/by-id` можно использовать (#150)
- (@GermanBluefox) Список портов предлагает`/dev/serial/by-id` символические ссылки в дополнение к`/dev/ttyUSBx` Устройства в Linux. Они больше не скрыты за экспериментальной опцией и больше не заменяют пути к устройствам.

### 3.0.0 (2026-08-25)

- (bluefox) КРАЙНЯЯ СИТУАЦИЯ: Для работы адаптера теперь требуются Node.js >= 22, js-controller >= 6.0.11 и admin >= 7.0.0.
- (bluefox) Адаптер был переписан на TypeScript. Исходный код находится в`src/` опубликованный код в`build/`
- (bluefox) Обновлено`cul` Пакет версии 1.0.0. Он использует последовательный порт 13, поэтому для установки больше не требуются инструменты сборки.
- (синяя лиса) СРОЧНО:`cul` В версии 1.0.0 некоторые данные были переименованы:`battery` сейчас`batteryLow` /`batteryState` ,`window` /`isopen` сейчас`open` ,`valveposition` сейчас`valvePosition` Старые состояния больше не записываются и могут быть удалены.
- (bluefox) Исправлена ошибка с заменой.`Mode` и`Type` метки в диалоговом окне конфигурации
- (bluefox) Исправлен список портов в экспериментальном режиме:`/dev/serial/by-id` Записи были созданы на основе неопределенного значения.
- (bluefox) Диалоговое окно конфигурации HTML и файл gulpfile были удалены.
- (bluefox) Отладочный драйвер, который воспроизводил`lib/rawData.txt` когда переменная среды`DEBUG` был установлен, был удален

### 2.2.0 (2023-04-17)

- (jpk) В качестве опции можно выбрать порт по идентификатору, а не по имени.
- (bluefox) Обновлен графический интерфейс для администратора 6

### 2.0.2 (2022-05-11)

- ВАЖНО: Теперь требуется как минимум Nodejs 12.x!
- (Apollon77/achimmm) Добавлена поддержка устройств с адресом 0
- (bluefox) Обновленный пакет serialport

[Более старые списки изменений можно найти там.](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2026 hobbyquaker