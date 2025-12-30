---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.acme/README.md
title: ioBroker.acme
hash: 6PaTYasXWjL2QReVKVOM7tmkighgHD/M/nHbtZ3KGmU=
---
![Логотип](../../../en/adapterref/iobroker.acme/admin/acme.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.acme.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.acme.svg)
![Количество установок](https://iobroker.live/badges/acme-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/acme-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.acme.png?downloads=true)

# IoBroker.acme
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.acme/workflows/Test%20and%20Release/badge.svg)

## Адаптер ACME для ioBroker
Этот адаптер генерирует сертификаты с использованием ACME-запросов.

## Использование
Адаптер запускается периодически (по умолчанию в полночь) и после обновлений конфигурации для генерации необходимых сертификатов (новых или тех, срок действия которых скоро истечет).

В настоящее время заказы обрабатываются через центр сертификации Let's Encrypt и, следовательно, предоставляются бесплатно.

Сведения о сертификате хранятся в объекте «коллекция сертификатов», который включает в себя другие важные данные, такие как дата истечения срока действия, защищаемые домены и закрытый ключ.
На эти объекты ссылаются по их идентификатору коллекции.

Адаптеры, которым для защиты связи требуются сертификаты (например, [веб-адаптер](https://www.npmjs.com/package/iobroker.web)), могут загружать и использовать наборы сертификатов.

Хранение и использование осуществляется через интерфейс, содержащийся в [основной контроллер ioBroker](https://www.npmjs.com/package/iobroker.js-controller).

### Проблемы ACME
Реализованы два метода проверки подлинности, и как минимум один из них должен быть включен на странице конфигурации.

Обратите внимание, что заказы на сертификаты с подстановочными знаками могут быть проверены только с использованием запроса DNS-01.

#### HTTP-01
Адаптер запускает собственный сервер проверки подлинности HTTP-01 на настроенном порту и адресе.

Для успешного выполнения HTTP-запроса HTTP-01 порт/адрес сервера запроса **должен** быть общедоступным по порту 80 полного доменного имени (FQDN), указанного в наборе общих/альтернативных имен из открытого интернета.

Настройте брандмауэр, обратный прокси и т.д. соответствующим образом.

Примеры сценариев:

1. Хост IoB, на котором работает ACME, находится за маршрутизатором, и этот маршрутизатор имеет общедоступный IP-адрес:

    Решение:

- Настройте ACME для работы на любом свободном порту: например, 8092.
- Настройте маршрутизатор для переадресации соединений с порта 80 его публичного адреса на порт 8092 хоста IoB.
- Настройте DNS-имя желаемого общего имени сертификата таким образом, чтобы оно разрешалось в публичный адрес маршрутизатора.

2. Хост IoB, на котором работает ACME, имеет прямое подключение к интернету с общедоступным IP-адресом:

    Решение:

- Настройте адаптер ACME для прослушивания порта 80.
- Настройте DNS-имя желаемого общего имени сертификата таким образом, чтобы оно разрешалось в публичный адрес хоста IoB.

3. Сценарии 1 и 2 невозможны, поскольку на порту 80 общедоступного IP-адреса работает другая служба.

Возможные решения:

1. Если другая служба представляет собой адаптер IoB, использующий стандарты именования портов, ACME остановит его перед попыткой заказа сертификата, будет использовать порт 80 для сервера проверки HTTP-01 и перезапустит любой остановленный адаптер после завершения работы.

Очевидно, это приведет к кратковременному отключению другого адаптера, что может быть нежелательно.

2. Используйте DNS-01-проверку подлинности.
3. Настройте именованный виртуальный хост HTTP-прокси на порту 80 маршрутизатора или общедоступного хоста IoB.

- Присвойте существующей службе другое имя хоста, отличное от того, для которого требуется сертификат, и настройте это имя хоста так, чтобы оно разрешалось в тот же адрес.
- Настройте прокси-сервер для переадресации запросов либо к существующей службе, либо к адаптеру ACME в зависимости от используемого имени.

4. Запускайте ACME вручную только при наличии необходимого доступа к портам. **Не рекомендуется**, но должно работать:

— Отключите (остановите) адаптер ACME после установки.
— Незадолго до необходимости заказа или продления сертификата (продление произойдет не позднее чем за 7 дней до истечения срока действия) выполните следующие действия вручную:
- Настройте брандмауэр/переадресацию портов/другие необходимые параметры обслуживания, чтобы ACME мог работать на настроенном порту и чтобы этот порт был доступен из общедоступного интернета.
- Запустите ACME вручную со страницы «Административные экземпляры IoB».
— Дождитесь завершения компанией ACME оформления всех заказов на сертификаты.
— Остановите ACME вручную со страницы «Административные экземпляры IoB».
— Эти шаги потребуются каждый раз при заказе/продлении сертификата, поэтому данный метод **не рекомендуется**. Система ACME разработана для обеспечения полностью автоматизированного процесса.

#### DNS-01
Для популярных платформ хостинга доменов реализованы различные плагины для проверки подлинности DNS-01.

#### Ссылки
Более подробная информация в разделе [AMCS.js](https://www.npmjs.com/package/acme).

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog

### **WORK IN PROGRESS**
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.0.6 (2024-12-27)

- (mcm1957) Missing size attributes for jsonCOnfig have been added.
- (mcm1957) Dependencies have been updated

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

## License

MIT License


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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