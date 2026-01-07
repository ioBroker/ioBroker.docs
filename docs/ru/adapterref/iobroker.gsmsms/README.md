---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: ykSSjcimEZZQZ7armAhD/4UGD7kCyj1GonMOufBqzs0=
---
![Логотип](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![Количество установок](https://iobroker.live/badges/gsmsms-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/gsmsms-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# IoBroker.gsmsms
![Тестирование и выпуск](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## Адаптер gsmsms для ioBroker
Отправляйте и получайте SMS с помощью GSM-оборудования.

## Аппаратное обеспечение
Любое GSM-оборудование (модуль, стик и т. д.), подключенное к последовательному порту вашего устройства ioBroker.
GSM-модули/стики потребляют много энергии. Пожалуйста, обеспечьте достаточное электропитание.

Для некоторых устройств необходимо установить правильный режим для последовательной связи (см. 'usb_modeswitch').

## Настройки
### Настройки порта и подключения
#### Путь к последовательному порту — обязательно.
Например, `/dev/ttyUSB0` или `/dev/serial/by-id/xxxxxxxxxxx` (by-id более стабилен, ttyUSBx может измениться после перезагрузки)

Некоторые устройства имеют несколько USB-портов, поэтому, возможно, вам придётся их протестировать. Скорее всего, первый порт будет работать, но, возможно, не будет присылать уведомления о входящих сообщениях. В этом случае вы можете попробовать другой порт, отправить SMS и посмотреть, будет ли оно получено через несколько секунд (например, на Huawei это третий порт).

#### Ваш SIM-код
Если ваша SIM-карта защищена PIN-кодом, введите его, и он будет использован для разблокировки SIM-карты во время инициализации (пустое поле означает, что «на SIM-карте нет PIN-кода»).

<!--

#### Режим подключения
##### Всегда открыто
Устанавливает модемное соединение сразу после включения адаптера. Входящие и исходящие SMS доставляются мгновенно. SMS, полученные во время простоя адаптера, будут доставлены следующим при включении адаптера (в зависимости от емкости вашей SIM-карты).

##### Интервал извлечения
Исходящие SMS-сообщения отправляются мгновенно. Входящие SMS-сообщения извлекаются периодически с заданным интервалом. Модемное соединение устанавливается только для отправки и получения SMS-сообщений.

##### Только отправка
Адаптер используется только для отправки SMS. Все входящие SMS игнорируются (возможно, сохраняются на SIM-карте, но не загружаются в адаптер).

->

### Настройки GSM
Чтобы не исчерпать память SIM-карты, все SMS-сообщения удаляются с SIM-карты после доставки/чтения. Используйте, например, адаптер «история» для хранения сообщений или любое другое удобное решение.

| Название | Тип | По умолчанию | Описание |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Индикация входящего SMS | логическое значение | true | Позволяет модему уведомлять о получении нового SMS-сообщения. |
| Включить конкатенацию | логическое значение | true | Получать конкатенированные сообщения как одно. |
| Пользовательская команда инициализации | строка | | Если вашему устройству требуется пользовательская команда инициализации, её можно указать, и она будет использована после проверки PIN-кода. Например, некоторым устройствам требуется 'AT+CPMS="SM","SM","SM"' для получения правильного набора памяти. Ожидается, что команда вернет `'OK'` (пусто, означает «нет пользовательской команды для инициализации»). Пожалуйста, обратитесь к техническим характеристикам вашего GSM-устройства. |
| CNMI при открытии/закрытии модема | строка | '2,1,0,2,0' / '2,0,2,2,1' | Определяет, сохраняются ли сообщения на SIM-карте или доставляются мгновенно. Пожалуйста, обратитесь к техническим характеристикам вашего GSM-устройства. |

<!--| Индикация входящего вызова | логическое значение | false | Получать событие `'onNewIncomingCall'` при получении вызова. |-->

### Настройки последовательного порта
Пожалуйста, ознакомьтесь с техническими характеристиками вашего устройства GMS (в большинстве случаев вам поможет Google).

| Название | Тип | По умолчанию | Описание |
| -------- | ------- | ------- | ------------------------------------------------------- |
| Скорость передачи данных | число | 19200 | Скорость передачи данных порта. |
| dataBits | число | 8 | Должно быть одним из следующих: 8, 7, 6 или 5. |
| stopBits | число | 1 | Должно быть одним из: 1 или 2. |
| четность | строка | "нет" | Должно быть одним из следующих значений: 'нет', 'четный', 'метка', 'нечетный', 'пробел'. |
| rtscts | логическое значение | false | настройка управления потоком |
| xon | логическое значение | false | настройка управления потоком |
| xoff | логическое значение | false | настройка управления потоком |
| xany | boolean | false | настройки управления потоком |

### Другие настройки и рекомендации
#### Указывается как адаптер - объекты (`admin.x`)
- Ваше имя (по умолчанию `ownNumber`), максимальная длина — 16 символов.
- ваш номер телефона.
- Режим работы SMS (`PDU` или `SMS`, по умолчанию рекомендуется использовать `PDU`).

Все входные данные должны быть введены с параметром ack=false!

#### История входящих/исходящих сообщений
Активировав адаптер истории для объектов `inbox.messageRaw` и `sendSMS.messageRaw`, вы получите полную информацию о входящих и исходящих SMS-сообщениях.

<!--

#### SMS - ошибки
Если возвращаются ошибки, и ошибка возникла на устройстве (то есть обмен данными с устройством был технически успешным), то в сообщении об ошибке должен быть указан код ошибки, например, "+CMS ERROR: 500". Сообщение об ошибке отображается в журнале на уровне "предупреждение" и сохраняется в объекте `info.error`.
(Неполный) список возможных кодов ошибок и их значений можно найти, например, по адресу <https://www.activexperts.com/sms-component/gsm-error-codes/>.

->

## Функциональные возможности
### Получать SMS
Входящие SMS-сообщения записываются в объекты `inbox.*`. Объект `inbox.messageRaw` может использоваться в качестве триггера для дальнейших операций (например, пересылки входящих SMS-сообщений почтовым адаптером).

### Отправить SMS
Чтобы отправить SMS, заполните поля `sendSMS.recipient, sendSMS.message` и, при необходимости, `sendSMS.alert` и нажмите кнопку `sendSMS.send`. Или задайте объект `sendSMS.messageRaw` со строкой следующего вида и параметром ack=false: `{"recipient": "Number", "message":"Yourtext", "alert":"false"}`.

Этот адаптер также предоставляет блок связи для функций blockly и sendTo для других скриптов (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', alert: '_false/true_'});).

### Выполнение команд AT+
! Пожалуйста, убедитесь, что вы понимаете, что делаете при настройке команд AT+, это ваша SIM-карта/устройство.

AT-команды отправляются путем установки параметра `admin.atCommandSLR` в формате `AT+XXXXy`.
Отправляйте любые команды, но имейте в виду, что вы увидите только последнюю строку ответа.

## Serialport-gsm
Этот адаптер основан на [плагин SerialPort-GSM](https://github.com/zabsalahid/serialport-gsm) и предназначен для связи с GSM-модемами, в первую очередь для отправки SMS.

## Благодарности
Создание этого адаптера было бы невозможно без замечательной работы @forelleblau (https://github.com/forelleblau), которая разрабатывала предыдущие версии этого адаптера.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.0.0 (2024-11-23)
- (mcm1957) Adapter requires node.js 20 now.
- (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
- (mcm1957) Adapter has been moved to iobroker-community-adapters organization
- (mcm1957) Some issues reported by adapter checker have been fixed.
- (mcm1957) Dependencies have been update

### 0.0.6
- (forelleblau) jsonConfig.json, notifications-manager

### 0.0.5
- (forelleblau) bug fixed (adapter set "undefined" into state values)

### 0.0.4
- (Apollon77) Optimizations, brush up to comply with ioBroker.repositories requirements

### 0.0.3
- (forelleblau) dependencies updated, bugs fixed

### 0.0.2
- (forelleblau) first published version

### 0.0.1
- (forelleblau) initial release

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2022-2023 forelleblau <mailto:marceladam@gmx.ch>

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