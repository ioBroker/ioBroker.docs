---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.oasecontrol/README.md
title: ioBroker.oasecontrol
hash: d0ERCppohm4g2Z0mkWNOXFm5kB6Ldlq89QGMf1Mm4JY=
---
# IoBroker.oasecontrol
**Тесты:** ![Тестирование и выпуск](https://github.com/mr-suw/ioBroker.oasecontrol/workflows/Test%20and%20Release/badge.svg)

## Адаптер oasecontrol для ioBroker
ioBroker.oasecontrol управляет наружными устройствами из OASE.
Поддерживаемые устройства: серия InScenio FM-Master EGC.

В настоящее время тестируются следующие устройства:

- FM-Master WLAN EGC Home с 4 розетками

В настоящее время поддерживаются следующие функции:

- переключаемые розетки
- розетка с регулировкой яркости
- новые элементы объекта для обеспечения возможности чтения выключателя розетки.

Также может работать с

- [Серия InScenio FM-Master Cloud](https://www.oase.com/en/products-a-z/family/product/p/70788-inscenio-fm-master-cloud-int.html)

## Совместимость
Совместимость с OASE FW: 51.25

протестировано с 51,25

Обязательно добавьте MAC-адрес io.broker в белый список широковещательных сообщений вашей точки доступа WLAN.

## Настройка в ioBroker
**IP-адрес устройства OASE:** статический IPv4-адрес вашего устройства OASE.

**IP TCP-сервер:** статический IPv4-адрес вашего экземпляра ioBroker

**Пароль устройства OASE**: вот в чем сложность; перехватите его во время входа в приложение; это зашифрованная строка из 74 символов, полученная из http://app-oasecloud-prod.azurewebsites.net/User/Inventory. Символы \\\u следует заменить на \u

**Опрос(ы):** как часто в секундах следует опрашивать устройство OASE для получения новых данных

## Проверка настроек
Настройка адаптера прошла успешно, если последовательность логов следующая:

```
authenticated to device
Starting TCP server with TLS...
Detected device:FM-Master EGC Home
```

Объекты oasecontrol присутствуют в следующем виде:

```
info.connection = true
...
serial-number = < device serial number >
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.4 (2026-05-31)
* Fix errors reported by checker

### 0.1.3 (2026-05-16)
* Fix deploy issue

### 0.1.0 (2026-05-16)
* Adapter requires node.js >= 22 now

### 0.0.8
* NPM release

## License
MIT license

Copyright (c) 2026 mrsuw mrsuw@icloud.com