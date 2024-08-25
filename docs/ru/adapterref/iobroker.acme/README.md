---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.acme/README.md
title: ioBroker.acme
hash: EI7PWt7/bcUS9IgzLxwMsZr18fEf5I+fxtYWcKdl2kE=
---
![Логотип](../../../en/adapterref/iobroker.acme/admin/acme.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.acme.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.acme.svg)
![Количество установок](https://iobroker.live/badges/acme-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/acme-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.acme.png?downloads=true)

# IoBroker.acme
**Тесты:** ![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.acme/workflows/Test%20and%20Release/badge.svg)

## Адаптер ACME для ioBroker
Этот адаптер генерирует сертификаты, используя вызовы ACME.

## Использование
Адаптер запускается периодически (по умолчанию в полночь) и после обновления конфигурации для создания всех необходимых сертификатов (новых или с истекающим сроком действия).

В настоящее время заказы обрабатываются центром сертификации Let's Encrypt и, таким образом, бесплатны.

Сведения о сертификате хранятся в объекте «коллекция сертификатов», который включает в себя другие важные сведения, такие как дата истечения срока действия, домены, которые необходимо защитить, и закрытый ключ.
На эти объекты ссылаются по их идентификатору коллекции.

Адаптеры, которым нужны сертификаты для защиты связи (например, [веб-адаптер](https://www.npmjs.com/package/iobroker.web)), могут загружать и использовать наборы сертификатов.

Хранение и использование управляются интерфейсом, содержащимся в [основной контроллер ioBroker](https://www.npmjs.com/package/iobroker.js-controller).

### Испытания ACME
Реализовано два метода проверки вызовов, и хотя бы один из них должен быть включен на странице конфигурации.

Обратите внимание, что заказы на подстановочные сертификаты можно проверить только с помощью запроса DNS-01.

#### HTTP-01
Адаптер запускает собственный сервер вызовов HTTP-01 на настроенном порту и адресе.

Чтобы вызов HTTP-01 был успешным, порт/адрес сервера вызова **должен** быть общедоступным как порт 80 полного доменного имени, указанного в коллекции общих/альтернативных имен из открытого Интернета.

Настройте брандмауэр, обратный прокси-сервер и т. д. соответствующим образом.

Примеры сценариев:

1. Хост IoB, на котором работает ACME, находится за маршрутизатором, и этот маршрутизатор имеет общедоступный IP-адрес:

    Решение:

    - Настройте ACME для работы на любом свободном порту: например: 8092.
    - Настройте маршрутизатор для переадресации соединений с порта 80 его общедоступного адреса на порт 8092 хоста IoB.
    - Настройте DNS-имя желаемого общего имени сертификата, чтобы оно разрешалось в общедоступный адрес маршрутизатора.

2. Хост IoB, на котором работает ACME, имеет прямое подключение к Интернету с общедоступным IP-адресом:

    Решение:

     - Настройте адаптер ACME для прослушивания на порту 80.
     - Настройте DNS-имя желаемого общего имени сертификата, чтобы оно разрешалось в общедоступный адрес хоста IoB.

3. Сценарий 1 и 2 невозможен, поскольку другая служба работает на порту 80 общедоступного IP-адреса.

    Возможные решения:

    1. Если другая служба является адаптером IoB в соответствии со стандартами именования портов, ACME остановит его перед попыткой заказать сертификат, использует порт 80 для сервера вызовов HTTP-01 и перезапустит любой остановленный адаптер после завершения.

       Очевидно, что это вызывает кратковременное отключение другого адаптера, что может быть нежелательно.

    2. Используйте вызов DNS-01.

    3. Настройте HTTP-прокси именованного виртуального хоста на порту 80 маршрутизатора или общедоступном хосте IoB.

       - Дайте существующей службе имя хоста, отличное от того, для которого требуется сертификат, и настройте это имя хоста для разрешения на тот же адрес.
       - Настройте прокси-сервер для пересылки запросов либо к существующей службе, либо к адаптеру ACME в зависимости от используемого имени.

    4. Запускайте ACME вручную только при наличии необходимого доступа к порту. **Не рекомендуется**, но должно работать:

        - Отключить (остановить) адаптер ACME после установки.
        - Незадолго до того, как потребуется заказ или продление сертификата (обновление произойдет за 7 дней до истечения срока действия), вручную выполните следующие действия:
          - Настройте любой брандмауэр/переадресацию портов/другое обслуживание, необходимое для того, чтобы ACME работал на настроенном порту и чтобы этот порт был доступен из общедоступного Интернета.
          - Запустите ACME вручную со страницы IoB Admin Instances.
          - Подождите, пока ACME выполнит любые заказы на сертификаты.
          - Остановите ACME вручную на странице IoB Admin Instances.
        - Эти шаги потребуются каждый раз, когда требуется заказ/обновление сертификата, и поэтому этот метод **не рекомендуется**. ACME предназначен для облегчения полностью автоматизированного процесса.

#### ДНС-01
Для популярных платформ хостинга доменов реализованы различные подключаемые модули проверки DNS-01.

#### Использованная литература
Подробнее см. в [AMCS.js](https://www.npmjs.com/package/acme).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (raintonr) Use @iobroker/webserver (#10).
* (bluefox) Corrected detection of instances on the same port.

### 0.0.2 (2023-03-01)
* (bluefox) Now all running on the same port adapters will be stopped before update.

### 0.0.1 (2023-01-29)
* (Robin Rainton) Initial release.

## License
MIT License

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
