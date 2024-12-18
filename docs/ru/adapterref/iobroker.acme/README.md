---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.acme/README.md
title: ioBroker.acme
hash: FmXLZhYoeZJF9Hzf1mENOYBQDeUW9LAHIcg1cFlwv/M=
---
![Логотип](../../../en/adapterref/iobroker.acme/admin/acme.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.acme.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.acme.svg)
![Количество установок](https://iobroker.live/badges/acme-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/acme-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.acme.png?downloads=true)

# IoBroker.acme
**Тесты:** ![Тест и выпуск](https://github.com/iobroker-community-adapters/ioBroker.acme/workflows/Test%20and%20Release/badge.svg)

## Адаптер ACME для ioBroker
Этот адаптер генерирует сертификаты с использованием ACME-задач.

## Использование
Адаптер запускается периодически (по умолчанию в полночь) и после обновления конфигурации для генерации всех необходимых сертификатов (новых или истекающих).

В настоящее время заказы обрабатываются центром сертификации Let's Encrypt и, таким образом, являются бесплатными.

Данные сертификата хранятся в объекте «коллекция сертификатов», который включает другие соответствующие данные, такие как дата истечения срока действия, домены, которые необходимо защитить, и закрытый ключ.
На эти объекты ссылаются по их идентификатору коллекции.

Адаптеры, которым требуются сертификаты для защиты своих коммуникаций (например, [веб-адаптер](https://www.npmjs.com/package/iobroker.web)), могут загружать и использовать коллекции сертификатов.

Хранение и использование осуществляется с помощью интерфейса, содержащегося в [основной контроллер ioBroker](https://www.npmjs.com/package/iobroker.js-controller).

### Проблемы ACME
Реализованы два метода проверки подлинности, и по крайней мере один из них должен быть включен на странице конфигурации.

Обратите внимание, что заказы на wildcard-сертификаты можно проверить только с помощью проверки DNS-01.

#### HTTP-01
Адаптер запускает собственный сервер HTTP-01 на настроенном порту и адресе.

Для успешного выполнения HTTP-01-запроса порт/адрес сервера запроса **должен** быть публично доступен как порт 80 полного доменного имени, указанного в коллекции общих/альтернативных имен из открытого Интернета.

Настройте брандмауэр, обратный прокси-сервер и т. д. соответствующим образом.

Примеры сценариев:

1. Хост IoB, на котором работает ACME, находится за маршрутизатором, и этот маршрутизатор имеет общедоступный IP-адрес:

    Решение:

- Настройте ACME для работы на любом свободном порту: например, 8092.
- Настройте маршрутизатор для переадресации подключений к порту 80 его публичного адреса на порт 8092 хоста IoB.
- Настройте DNS-имя общего имени требуемого сертификата для разрешения его в публичный адрес маршрутизатора.

2. Хост IoB, на котором работает ACME, имеет прямое подключение к Интернету с общедоступным IP-адресом:

    Решение:

- Настройте адаптер ACME для прослушивания порта 80.
- Настройте DNS-имя общего имени требуемого сертификата для разрешения его в публичный адрес хоста IoB.

3. Сценарии 1 и 2 невозможны, поскольку на порту 80 общедоступного IP-адреса работает другая служба.

Возможные решения:

1. Если другая служба является адаптером IoB, соответствующим стандартам именования конфигурации портов, ACME остановит его перед попыткой заказать сертификат, использует порт 80 для сервера HTTP-01 и перезапустит любой остановленный адаптер после завершения.

Очевидно, это приведет к кратковременному отключению другого адаптера, что может быть нежелательным.

2. Используйте проверку DNS-01.
3. Настройте именованный виртуальный хост HTTP-прокси на порту 80 маршрутизатора или общедоступном хосте IoB.

- Присвойте существующей службе имя хоста, отличное от того, для которого требуется сертификат, и настройте это имя хоста для разрешения в тот же адрес.
- Настройте прокси-сервер для пересылки запросов либо существующей службе, либо адаптеру ACME в зависимости от используемого имени.

4. Запускайте ACME вручную только при наличии необходимого доступа к порту. **Не рекомендуется**, но должно работать:

- Отключите (остановите) адаптер ACME после установки.
- Незадолго до того, как потребуется заказать или продлить сертификат (продление произойдет не позднее, чем за 7 дней до истечения срока действия), вручную выполните следующие действия:
- Настройте все необходимые параметры брандмауэра/переадресации портов/другого обслуживания, чтобы разрешить работу ACME на настроенном порту и сделать этот порт доступным из общедоступного Интернета.
- Запустите ACME вручную со страницы экземпляров IoB Admin.
- Подождите, пока ACME выполнит все заказы на сертификаты.
- Остановите ACME вручную со страницы экземпляров IoB Admin.
- Эти шаги потребуются каждый раз, когда требуется заказ/обновление сертификата, и поэтому этот метод **не рекомендуется**. ACME разработан для упрощения полностью автоматизированного процесса.

#### DNS-01
Для популярных платформ хостинга доменов реализованы различные плагины проверки DNS-01.

#### Ссылки
Более подробную информацию см. в [AMCS.js](https://www.npmjs.com/package/acme).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.5 (2024-12-08)

- (@GermanBluefox) Corrected error with admin 7.4.3

### 1.0.3 (2024-11-27)

- (@GermanBluefox) Migrated GUI for admin 7 (one more time)

### 1.0.1 (2024-07-06)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated
- (bluefox) Prepared for admin v7

### 0.1.2 (2023-11-15)

- (mcm1957) Issues reported by adapter checker have been fixed.
- (mcm1957) Release 0.1.1 has been released again due to error during deploy.

### 0.1.1 (2023-11-15)

- (raintonr) Various improvements in start/stop of other adapters using HTTP challenge server port fixing restart loop (#43).
- (raintonr) Fixed ACME notify messages (#64).

## License

MIT License

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Robin Rainton <robin@rainton.com>

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