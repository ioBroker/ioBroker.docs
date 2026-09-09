---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: 7n0k9l6hbnksg6m3Md2eqLxfElKRHa+vYGqtnBG6OHc=
---
![Логотип](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![Количество установок](https://iobroker.live/badges/gsmsms-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/gsmsms-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![Тестирование и выпуск](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# ioBroker.gsmsms

## gsmsms адаптер для ioBroker

Отправляйте и получайте SMS с помощью GSM-оборудования.

## Аппаратное обеспечение

Любое GSM-оборудование (например, плата расширения, стик и т. д.), подключенное к последовательному порту вашего устройства ioBroker. GSM-модули/стики потребляют много энергии. Пожалуйста, обеспечьте достаточное электропитание.

Для некоторых устройств необходимо установить правильный режим для последовательной связи (см. 'usb\_modeswitch').

## Настройки

### Настройки порта и подключения

#### Путь к последовательному порту — обязательно.

например`/dev/ttyUSB0` или`/dev/serial/by-id/xxxxxxxxxxx` (by-id более стабилен, ttyUSBx может измениться после перезагрузки)

Некоторые устройства имеют несколько USB-портов, поэтому, возможно, вам придётся их протестировать. Скорее всего, первый порт будет работать, но, возможно, не будет присылать уведомления о входящих сообщениях. В этом случае вы можете попробовать другой порт, отправить SMS и посмотреть, будет ли оно получено через несколько секунд (например, на Huawei это третий порт).

#### Ваш PIN-код SIM-карты

Если ваша SIM-карта защищена PIN-кодом, введите его, и он будет использован для разблокировки SIM-карты во время инициализации (пустое поле означает, что «на SIM-карте нет PIN-кода»).

<!--
#### Connection mode

##### Always open

Opens a modem connection as soon as the adapter is started. Incoming and outgoing SMS are delivered instantly. SMS arrived while the adapter is down will be delivered by the next adapter - startup (according to capacity of your SIM).

##### Retrieval interval

Outgoing SMS are sent instantly. Incoming SMS are retrieved periodically according to the specified interval. A modem connection is opened only for sending and retrieving SMS.

##### Send only

The adapter is only used to send SMS. All incoming SMS are ignored (possibly saved to SIM but not retrieved to the adapter).
-->

### настройки GSM

Чтобы не исчерпать память SIM-карты, все SMS-сообщения удаляются с SIM-карты после доставки/чтения. Используйте, например, адаптер «история» для хранения сообщений или любое другое удобное решение.

| Имя                                    | Тип        | По умолчанию              | Описание                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------- | ---------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Индикация входящего SMS                | логический | истинный                  | Позволяет модему уведомлять о получении нового SMS-сообщения.                                                                                                                                                                                                                                                                                                                                                                                                          |
| Включить конкатенацию                  | логический | истинный                  | Принимайте объединенные сообщения как одно целое.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Пользовательская команда инициализации | нить       |                           | Если вашему устройству требуется пользовательская команда инициализации, её можно указать, и она будет использована после проверки PIN-кода. Например, для некоторых устройств требуется команда 'AT+CPMS="SM","SM","SM"' для получения правильного набора памяти. Ожидается, что команда вернет результат.`'OK'` (Пустое поле означает «нет пользовательской команды для инициализации»). Пожалуйста, обратитесь к техническим характеристикам вашего GSM-устройства. |
| CNMI при открытии/закрытии модема      | нить       | '2,1,0,2,0' / '2,0,2,2,1' | Определяет, сохраняются ли сообщения на SIM-карте или доставляются мгновенно. Пожалуйста, обратитесь к техническим характеристикам вашего GSM-устройства.                                                                                                                                                                                                                                                                                                              |

<!--| Incoming call indication    | boolean | false                     | Receive `'onNewIncomingCall'` event when receiving calls.                                                                                                                 |-->                                                       

### Настройки последовательного порта

Пожалуйста, ознакомьтесь с техническими характеристиками вашего устройства GMS (в большинстве случаев вам поможет Google).

| Имя      | Тип        | По умолчанию | Описание                                                                        |
| -------- | ---------- | ------------ | ------------------------------------------------------------------------------- |
| baudRate | число      | 19200        | Скорость передачи данных в порту (боды).                                        |
| dataBits | число      | 8            | Должно быть одно из следующих значений: 8, 7, 6 или 5.                          |
| стопБитс | число      | 1            | Должно быть одно из следующих значений: 1 или 2.                                |
| паритет  | нить       | "никто"      | Должно быть одно из следующих значений: 'none', 'even', 'mark', 'odd', 'space'. |
| rtscts   | логический | ЛОЖЬ         | настройка управления потоком                                                    |
| ксон     | логический | ЛОЖЬ         | настройка управления потоком                                                    |
| xoff     | логический | ЛОЖЬ         | настройка управления потоком                                                    |
| ксани    | логический | ЛОЖЬ         | настройки управления потоком                                                    |

### Другие настройки и рекомендации

#### Для указания в качестве адаптерных объектов (`admin.x` )

- ваше имя (по умолчанию)`ownNumber` Максимальная длина — 16 символов.
- Ваш номер телефона.
- Режим работы SMS (`PDU` или`SMS` ,`PDU` (Это значение по умолчанию и рекомендуется).

Все входные данные должны быть введены с параметром ack=false!

#### История входящих/исходящих сообщений

Активировав адаптер истории для`inbox.messageRaw` - объект и`sendSMS.messageRaw` - Благодаря этому вы получаете полный список входящих и исходящих SMS-сообщений.

<!--
#### SMS - errors

When errors are returned and the error originated from the device (so the exchange with the device was technically successful), then in the error message, an error code should be listed, e.g. "+CMS ERROR: 500". The error message is displayed in the log on 'warn' - level and stored in the `info.error` object.
An (incomplete) list of possible error codes and their meanings can be found e.g. at <https://www.activexperts.com/sms-component/gsm-error-codes/>.
-->

## Функциональные возможности

### Получать SMS

Входящие SMS-сообщения записываются в`inbox.*` - объекты.`inbox.messageRaw` может использоваться в качестве триггера для дальнейших операций (например, пересылки входящих SMS-сообщений через адаптер электронной почты).

### Отправить SMS

Чтобы отправить SMS, заполните форму.`sendSMS.recipient, sendSMS.message` и при необходимости`sendSMS.alert` и толкнуть`sendSMS.send` - кнопка. Или установите`sendSMS.messageRaw` - Объект, содержащий строку в следующем формате и ack=false:`{"recipient": "Number", "message":"Yourtext", "alert":"false"}` .

Этот адаптер также предоставляет comm-block для функций blockly и sendTo для других скриптов (sendTo("gsmsms. _InstanceNo_ ", "send", {text: ' _yourText_ ',recipient: ' _phonenumber_ ', alert: ' _false/true_ '});).

### Выполнение команд AT+

! Пожалуйста, убедитесь, что вы понимаете, что делаете при настройке команд AT+, это ваша SIM-карта/устройство.

AT+команды отправляются путем установки параметров.`admin.atCommandSLR` в формате`AT+XXXXy` Отправьте любую команду, но имейте в виду, что вы увидите только последнюю строку ответа.

## Serialport-gsm

Этот адаптер основан на [плагине SerialPort-GSM](https://github.com/zabsalahid/serialport-gsm) для связи с GSM-модемами, в первую очередь для отправки SMS-сообщений.

## Кредиты

Создание этого адаптера было бы невозможно без замечательной работы @forelleblau ( <https://github.com/forelleblau> ), которая разрабатывала предыдущие версии этого адаптера.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.1.0 (2026-03-08)
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been update

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.gsmsms/blob/main/CHANGELOG_OLD.md)

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