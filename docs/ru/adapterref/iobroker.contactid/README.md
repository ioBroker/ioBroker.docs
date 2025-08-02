---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.contactid/README.md
title: ioBroker.контактид
hash: S07MW5c8PDaN9uaElOPFwo63BajDrHBj3G2mwmlQ8R0=
---
![Логотип](../../../en/adapterref/iobroker.contactid/admin/contactid.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.contactid.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.contactid.svg)
![Количество установок (последнее)](http://iobroker.live/badges/contactid-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/contactid-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/schmupu/ioBroker.contactid/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.contactid.png?downloads=true)

# IoBroker.контактид
**Тесты:** ![Тест и выпуск](https://github.com/schmupu/ioBroker.contactid/workflows/Test%20and%20Release/badge.svg)

Протокол Contact ID, используемый системами охранной сигнализации для связи с центральными станциями.

Этот адаптер является сервером Contact ID. При срабатывании тревожного события система сигнализации отправляет по IP сообщение Contact ID на центральную станцию.
Вы можете использовать ioBroker с этим адаптером в качестве центральной станции. Например, вы можете отправить сообщение Telegram для тревожного события по Conntact ID.

Сообщение Contact-ID

СССС 18QEEEGGZZZC

- SSSS – Абонент. Эти четыре цифры идентифицируют конкретную систему сигнализации или клиента на центральной станции. ioBroker допускает более длинные имена абонентов.

- 18 - Тип сообщения. По сути, это поле всегда должно быть «18».
- Q – Квалификация события.
- EEE – Код события.
- GG – Номер группы/раздела.
- ZZZ – Номер зоны (001 - 999). Это номер зоны, вызвавшей тревогу.
- C – Контрольная сумма.

[Протокол идентификации контактов](http://www.technoimport.com.co/Producto/pdfs/ADEMCO%20-%20DC05_Contact_ID.pdf)

## Установка и настройка
1. Установите адаптер.
2. Конфигурация адаптера:

Выберите IP-адрес и порт для прослушивания запросов Conctact-ID.
Зарегистрируйте свое имя абонента, чтобы идентифицировать ваши сообщения о охранной сигнализации, и выберите тип вашей охранной сигнализации.

3. Настройте систему защиты от взлома на отправку сообщений Contact ID

Люпусек XT1:

Указания -> Контактный идентификатор: rptn://subcriber@ip-address-iobroker:port Пример: rptn://test@192.168.20.1:50000

Люпусек XT1+/XT2/XT2+/XT3/XT4:

Einstellungen -> Идентификатор контакта: ip://subcriber@ip-address-iobroker:port/CID Пример: ip://test@192.168.20.1:50000/CID

4. Тестирование Адаптера

Откройте командную оболочку и введите

```
telnet ip-address-iobroker port
Example: telnet 192.168.20.1 50000

```

Теперь вы можете отправить сообщение Conntact ID. Для систем охранной сигнализации Lupsec сообщение начинается и заканчивается [ и ]. Введите в сеансе telnet:

```
[SSSS 18QEEEGGZZZC]
Example: [test 18160201010B]
```

Теперь вы можете увидеть сообщение в объектах ioBroker

5. Проблемы/вопросы

Если у вас возникли проблемы с обработкой сообщений ContactID, пожалуйста, создайте issue.
В issue мне нужна следующая информация:

1. Производитель и тип охранной системы
2. Сообщение ContactID как файл. Вы можете создать файл, если активируете его в конфигурации экземпляра.
3. Отладочный вывод ioBroker при обработке сообщения
4. Подробное описание ошибки

Вы можете проверить сохраненное сообщение ContactID с помощью следующей команды:

```
# cat fileanme_of_cid_message | nc ip_address_of_iobroker cid_port
cat /tmp/cid/cid_msg_fa165cc0-8e3a-faa1-eb5c-fd3e47479044.txt | nc localhost 55000
```

## Changelog
### 2.0.1 (2025-02-01)

- (Stübi) Fixed Notification from ioBroker Check and Service Bot (Issue #46)

### 2.0.0 (2025-01-18)

- (Stübi) Redesign of Contact ID Adapter.
- (Stübi) Wokring now with nodejs 20 and 22
- (Stübi) js-controller in version 6 and 7 will be supported (Issue #19, #28)
- (Stübi) nodejs 20 and nodejs 22 will be suported (Issue #20, #36)
- (Stübi) states moved to channel subscriber
- (Stübi) add Lupusec XT4 to list of alarm systems
- (Stübi) migration to eslint 9 (Issue #39)
- (Stübi) change admin configuration (Issue #38)
- (Stübi) fixed dependency ot iobroker adapter-core (Issue #37)
- (Stübi) fixed iobroker notifications (Issue 35)

### 1.0.2 (2020.12.13)

- (Stübi) Bugfixing, ACK-invalid Format - Issue #14
- (Stübi) Bugfixing, Issue #9

## License

MIT License

Copyright (c) 2025 Thorsten Stueben <thorsten@stueben.de>

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