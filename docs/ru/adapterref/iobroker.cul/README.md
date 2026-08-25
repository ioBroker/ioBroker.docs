---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.cul/README.md
title: ioBroker.cul
hash: jmRF5YMscwGBaQJSz+/IKr05+JCBED1Py+hhuQa6JFQ=
---
![Логотип](../../../en/adapterref/iobroker.cul/admin/busware.jpg)

![Количество установок](http://iobroker.live/badges/cul-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.cul.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.cul.svg)

# IoBroker.cul
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.cul/workflows/Test%20and%20Release/badge.svg) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/cul/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

Адаптер ioBroker для управления FS20, Max!, HMS и другими устройствами через [КУЛ](http://busware.de/tiki-index.php?page=CUL) / [калв](http://culfw.de). Зависит от https://github.com/hobbyquaker/cul

## Поддерживаемые устройства
- *EM* - EM1000WZ, EMWZ
- *FS20*, включая ESA1000/2000
- *HMS* - HMS100-TF, HMS100-T, HMS100-WD, RM100-2, HMS100-TFK, HMS100-MG, HMS100-CO, HMS100-FIT
- *МОРИЦ* - МАКС!
- *WS* - KS300TH, S300TH, WS2000/WS7000

## Как сделать
### Отправка команды устройству FS20, например, с помощью JavaScript
```sendTo("cul.0", "send", {"protocol":"FS20", "housecode":"A1B2", "address":"01", "command":"00"});```

### Отправка необработанной команды (например, на устройство InterTechno) с помощью JavaScript
```sendTo("cul.0", "sendraw", {"command": 'is0FFFFF0FFFFF'});```

Эти команды используют библиотеку CUL данного адаптера для отправки команд устройству.
Адаптер `Busware CUL USB / culfw` на основе Javascript/Node.js

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->
### 3.0.1 (2026-08-25)
* (bluefox) Теперь последовательный порт можно ввести вручную, поэтому можно использовать символическую ссылку ниже `/dev/serial/by-id` (#150)
* (bluefox) Список портов предлагает символические ссылки `/dev/serial/by-id` в дополнение к устройствам `/dev/ttyUSBx` в Linux. Они больше не скрыты за экспериментальной опцией и не заменяют пути к устройствам.

### 3.0.0 (2026-08-25)
* (bluefox) КРАЙНЯЯ СИТУАЦИЯ: Для работы адаптера теперь требуются Node.js >= 22, js-controller >= 6.0.11 и admin >= 7.0.0.
* (bluefox) Адаптер был переписан на TypeScript. Исходный код находится в `src/`, опубликованный код — в `build/`.
* (bluefox) Обновлен пакет `cul` до версии 1.0.0. Он использует последовательный порт 13, поэтому для установки больше не требуются инструменты сборки.
* (bluefox) КРИТИКА: В версии `cul` 1.0.0 некоторые точки данных были переименованы: `battery` теперь `batteryLow`/`batteryState`, `window`/`isopen` теперь `open`, `valveposition` теперь `valvePosition`. Старые состояния больше не записываются и могут быть удалены.
* (bluefox) Исправлена ошибка с перепутанными метками `Mode` и `Type` в диалоговом окне настроек.
* (bluefox) Исправлен список портов в экспериментальном режиме: записи `/dev/serial/by-id` создавались из неопределенного значения.
* (bluefox) Диалоговое окно конфигурации HTML и файл gulpfile были удалены.
* (bluefox) Был удалён отладочный драйвер, который воспроизводил файл `lib/rawData.txt` при установке переменной окружения `DEBUG`.

### 2.2.0 (17.04.2023)
* (jpk) В качестве опции можно выбрать порт по идентификатору, а не по имени.
* (bluefox) Обновлен графический интерфейс для администратора 6

### 2.0.2 (11.05.2022)
* ВАЖНО: Теперь требуется как минимум Nodejs 12.x!
* (Apollon77/achimmm) Добавлена поддержка устройств с адресом 0
* (bluefox) Обновленный пакет serialport

### 1.3.5 (12.04.2021)
* (Apollon77) Убедитесь, что CUL подключен, прежде чем принимать изменения состояния (Sentry IOBROKER-CUL-R)

[Более старые списки изменений можно найти там.](CHANGELOG_OLD.md)

## License

[Licensed under GPLv2](LICENSE) Copyright (c) 2014-2026 hobbyquaker