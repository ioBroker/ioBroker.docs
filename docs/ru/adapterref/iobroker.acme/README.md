---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.acme/README.md
title: ioBroker.acme
hash: 9hCNmBB7epF0tkkBlualwwlC5cip4nYGJX427VVlf/I=
---
![Логотип](../../../en/adapterref/iobroker.acme/admin/acme.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.acme.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.acme.svg)
![Количество установок](https://iobroker.live/badges/acme-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/acme-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.acme.png?downloads=true)

# ioBroker.acme

**Тесты:**![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.acme/workflows/Test%20and%20Release/badge.svg)

## Адаптер ACME для ioBroker

Этот адаптер генерирует сертификаты с использованием ACME-запросов.

## Использование

Адаптер запускается периодически (по умолчанию в полночь) и после обновлений конфигурации для генерации необходимых сертификатов (новых или тех, срок действия которых скоро истечет).

В настоящее время заказы обрабатываются через центр сертификации Let's Encrypt и, следовательно, предоставляются бесплатно.

Информация о сертификатах хранится в объекте «коллекция сертификатов», который включает в себя другие важные сведения, такие как дата истечения срока действия, защищаемые домены и закрытый ключ. На эти объекты ссылаются по их идентификатору коллекции.

Адаптеры, которым для защиты связи требуются сертификаты (например, [веб-адаптер](https://www.npmjs.com/package/iobroker.web) ), могут загружать и использовать наборы сертификатов.

Хранение и использование данных осуществляются через интерфейс, встроенный в [основной контроллер ioBroker](https://www.npmjs.com/package/iobroker.js-controller) .

### Проблемы ACME

Реализованы два метода проверки подлинности, и как минимум один из них должен быть включен на странице настроек.

Обратите внимание, что заказы на сертификаты с подстановочными знаками могут быть проверены только с использованием запроса DNS-01.

#### HTTP-01

Центр сертификации получает данные.`http://<FQDN>/.well-known/acme-challenge/<token>` на порту 80. Этот путь и порт фиксированы протоколом ACME, поэтому кто-то должен на них ответить.

**Результатом выполнения HTTP-запроса HTTP-01** на странице конфигурации является следующее:

- **Автоматический (рекомендуется)** — адаптер публикует токены проверки в состоянии.`acme.<instance>.info.httpChallenges` .`web` и`admin` обслуживать их напрямую оттуда, когда они запустят достаточно новую программу.`@iobroker/webserver` Таким образом, ничего останавливать не нужно, и ни один порт не должен быть свободен. Если настроенный порт не отвечает опубликованным токеном, адаптер переключается на свой собственный сервер проверки подлинности и останавливает адаптеры на этом порту, точно так же, как это делали более старые версии.
- **Собственный сервер проверки подлинности, остановка конфликтующих адаптеров** — всегда запускайте собственный сервер на настроенном порту, останавливая на нем любой адаптер на время выполнения команды. Это было единственным вариантом поведения до версии 5.0.0.
- **При использовании другого адаптера или обратного прокси** — опубликуйте токены и никогда не изменяйте порт. Используйте это при работе с nginx, Traefik или другими подобными сервисами.`proxy` адаптер вперед`/.well-known/acme-challenge/` к веб-серверу, который считывает состояние.

Для успешного выполнения HTTP-запроса HTTP-01 **необходимо** , чтобы сервер, обслуживающий запрос, был общедоступным по порту 80 полного доменного имени (FQDN), указанного в общем/альтернативном имени коллекции, из открытого интернета. Let's Encrypt использует перенаправления, поэтому запрос может быть отправлен на другой порт или по протоколу HTTPS, но он всегда начинается с порта 80.

Настройте брандмауэр, обратный прокси и т.д. соответствующим образом.

Примеры сценариев:

1. Хост IoB, на котором работает ACME, находится за маршрутизатором, и этот маршрутизатор имеет общедоступный IP-адрес:

   Решение:

   - Настройте ACME для работы на любом свободном порту: например, 8092.
   - Настройте маршрутизатор для переадресации соединений с порта 80 его публичного адреса на порт 8092 хоста IoB.
   - Настройте DNS-имя общего имени нужного сертификата таким образом, чтобы оно разрешалось в публичный адрес маршрутизатора.

2. Хост IoB, на котором работает ACME, имеет прямое подключение к интернету с общедоступным IP-адресом:

   Решение:

   - Настройте адаптер ACME для прослушивания порта 80.
   - Настройте DNS-имя желаемого общего имени сертификата таким образом, чтобы оно разрешалось в публичный адрес хоста IoB.

3. Сценарии 1 и 2 невозможны, поскольку на порту 80 общедоступного IP-адреса работает другая служба.

   Возможные решения:

   1. Если другая услуга`web` или`admin` в версии с использованием`@iobroker/webserver` При поддержке ACME ничего делать не нужно: система сама решает поставленные задачи и продолжает работу. Оставьте **автоматическую** доставку.

   2. Если другая служба представляет собой адаптер IoB, соответствующий стандартам именования портов, но не может самостоятельно обрабатывать запросы на проверку подлинности, ACME остановит его перед попыткой заказа сертификата, использует порт 80 для собственного сервера запросов HTTP-01 и перезапустит любой остановленный адаптер после завершения работы.

      Очевидно, это приведет к кратковременному отключению другого адаптера, что может быть нежелательно.

   3. Используйте проверку DNS-01.

   4. Настройте именованный виртуальный хост HTTP-прокси на порту 80 маршрутизатора или общедоступного хоста IoB.

      - Присвойте существующей службе другое имя хоста, отличное от того, для которого требуется сертификат, и настройте это имя хоста так, чтобы оно разрешалось в тот же адрес.
      - Настройте прокси-сервер таким образом, чтобы он перенаправлял запросы либо к существующей службе, либо к адаптеру ACME в зависимости от используемого имени.

   5. Запускайте ACME вручную только при наличии необходимого доступа к портам. **Не рекомендуется** , но должно работать:

      - После установки отключите (остановите) адаптер ACME.
      - Незадолго до необходимости заказа или продления сертификата (продление произойдет не позднее чем за 7 дней до истечения срока действия) выполните следующие действия вручную:
        - Настройте брандмауэр/переадресацию портов/другие необходимые параметры обслуживания, чтобы ACME мог работать на настроенном порту и чтобы этот порт был доступен из общедоступного интернета.
        - Запустите ACME вручную со страницы «Административные экземпляры IoB».
        - Дождитесь, пока компания ACME завершит оформление всех заказов на сертификаты.
        - Остановите ACME вручную со страницы «Административные экземпляры IoB».
      - Эти шаги потребуются каждый раз при заказе/продлении сертификата, поэтому данный метод **не рекомендуется** . Система ACME разработана для обеспечения полностью автоматизированного процесса.

##### Самостоятельно решайте опубликованные задачи.

государство`acme.<instance>.info.httpChallenges` Это контракт между данным адаптером и любым устройством, обслуживающим порт 80. Он содержит JSON-объект, ключом которого является токен проверки подлинности:

```json
{
    "<token>": {
        "keyAuthorization": "<token>.<account key thumbprint>",
        "expires": 1756200000000
    }
}
```

Ответ читателя`GET /.well-known/acme-challenge/<token>` должен:

- Прочитайте каждый случай, то есть шаблон иностранного государства.`acme.*.info.httpChallenges` - Количество экземпляров не фиксировано, и два экземпляра могут оформлять заказы одновременно;
- отклонить токен, который не является`[A-Za-z0-9_-]{16,128}` прежде чем искать это в интернете;
- игнорировать запись, чья`expires` осталось в прошлом;
- отвечать`200` с`keyAuthorization` как всё тело, или`404` ;
- Все это необходимо сделать **до** аутентификации, поскольку центр сертификации является анонимным.

Значения по умолчанию являются общедоступными — они передаются по протоколу HTTP любому, кто их запросит, — и удаляются сразу после завершения обработки заказа.

#### DNS-01

Для популярных платформ хостинга доменов реализованы различные плагины для проверки подлинности DNS-01.

#### Ссылки

Более подробную информацию см. в [файле AMCS.js.](https://www.npmjs.com/package/acme)

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 5.0.2 (2026-09-08)
- (@GermanBluefox) HTTP-01 challenges are now published in `acme.<instance>.info.httpChallenges` so `web`/`admin` can serve them; adapters on port 80 are only stopped when nothing answers there (#85)
- (@GermanBluefox) Added the "HTTP-01 challenge delivery" setting to choose between automatic, an own challenge server, and an external responder
- (@GermanBluefox) Added support for deSEC and PowerDNS DNS-01 challenges
- (@GermanBluefox) Fixed DigitalOcean, DNSimple, Gandi, name.com and Route53 DNS-01 challenges failing with "request is not a function" after the acme-client migration
- (@GermanBluefox) Added support for Hetzner and Dynu DNS-01 challenges
- (@GermanBluefox) Added support for IONOS DNS-01 challenge
- (@GermanBluefox) BREAKING: Migrated from the abandoned ACME.js to acme-client. The saved ACME account is registered once anew on first run after the update.
- (chris299) Added support for eDNS.de DNS-01 challenge
- (chris299) Fixed certificate issuance failing against current Let's Encrypt with 409 / "Unhandled status '403'"
- (chris299) Fixed certificate renewal failing with "Cannot read properties of undefined (reading '0')"

### 4.0.3 (2026-08-03)
- (@GermanBluefox) Migrated to admin 8
- (@GermanBluefox) Adapter requires admin >= 8.0.0 now

### 3.1.0 (2026-05-04)
- (copilot) Adapter requires node.js >= 22 now
- (mcm1957) Dependencies have been updated

### 3.0.2 (2026-03-10)
- (@GermanBluefox) Correcting configuration dialog
- (@GermanBluefox) Added tests for the GUI component

### 3.0.0 (2026-03-05)
- (lubepi) BREAKING: DNS-01 credentials are encrypted now. You might have to reenter them once after upgrading the aadapter. 
- (copilot) Adapter requires admin >= 7.7.22 now
- (lubepi) Added support for Netcup DNS-01 challenge 
- (@GermanBluefox) Optimisations on log output and error handling

[Older changelogs can be found there](CHANGELOG_OLD.md)

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