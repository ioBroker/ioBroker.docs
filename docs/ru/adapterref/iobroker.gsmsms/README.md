---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.gsmsms/README.md
title: ioBroker.gsmsms
hash: 4OePWk7/C7Efli5jytPaWhasTCdJuILxZpyKT1Jicr0=
---
![Логотип](../../../en/adapterref/iobroker.gsmsms/admin/gsmsms.png)

![Количество установок](https://iobroker.live/badges/gsmsms-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/gsmsms-stable.svg)
![версия НПМ](https://img.shields.io/npm/v/iobroker.gsmsms.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.gsmsms.svg)

# IoBroker.gsmsms
![Тест и выпуск](https://github.com/forelleblau/ioBroker.gsmsms/workflows/Test%20and%20Release/badge.svg)

## Gsmsms адаптер для ioBroker
Отправка и получение SMS с помощью GSM-оборудования.

## Аппаратное обеспечение
Любое GSM-оборудование (shield, surfstick и т. д.), подключенное к последовательному порту вашего устройства ioBroker. GSM-модули/sticks требуют много энергии. Пожалуйста, обеспечьте достаточный источник питания.

Некоторые устройства необходимо настроить на правильный режим последовательной связи (см. «usb_modeswitch»).

## Настройки
### Настройка порта и подключения
#### Путь к последовательному порту — обязательно.
например, `/dev/ttyUSB0` или `/dev/serial/by-id/xxxxxxxxxxx` (by-id более стабилен, ttyUSBx может измениться при перезагрузке)

Некоторые устройства предоставляют несколько портов USB, поэтому может быть, что вам нужно попробовать. Скорее всего, "первый" будет работать, но, возможно, не будет доставлять "уведомления о входящих сообщениях", тогда вы можете попробовать другой и отправить смс и посмотреть, будет ли оно получено через несколько секунд (на Huawai это третий порт, например).

#### Ваш PIN-код SIM-карты
Если ваша SIM-карта защищена PIN-кодом, укажите PIN-код, и он будет использоваться для разблокировки SIM-карты во время инициализации (пустое поле означает «на SIM-карте нет PIN-кода»).

<!--

#### Режим подключения
##### Всегда открыто
Открывает модемное соединение сразу после запуска адаптера. Входящие и исходящие SMS доставляются мгновенно. SMS, пришедшие во время отключения адаптера, будут доставлены следующим адаптером - запуском (в соответствии с емкостью вашей SIM).

##### Интервал извлечения
Исходящие SMS отправляются мгновенно. Входящие SMS извлекаются периодически согласно указанному интервалу. Модемное соединение открывается только для отправки и получения SMS.

##### Только отправлять
Адаптер используется только для отправки SMS. Все входящие SMS игнорируются (возможно, сохраняются на SIM, но не извлекаются на адаптер).
-->

### Настройки GSM
Чтобы не исчерпать память SIM-карты, все SMS удаляются с SIM-карты после доставки/прочтения. Используйте, например, адаптер «история» для хранения сообщений или любое другое удобное решение.

| Имя | Тип | По умолчанию | Описание |
| --------------------------- | ------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Индикация входящего SMS | логическое значение | true | Позволяет модему уведомлять о получении нового SMS-сообщения. |
| Включить конкатенацию | boolean | true | Получать объединенные сообщения как одно. |
| Пользовательская команда Iinit | строка | | Если вашему устройству нужна пользовательская команда инициализации, она может быть предоставлена и будет использоваться после проверки PIN-кода. т. е. некоторым устройствам требуется 'AT+CPMS="SM","SM","SM"' для получения правильного набора хранилищ. Ожидается, что команда вернет `'OK'` (пусто, означает «нет пользовательской команды для инициализации»). пожалуйста, обратитесь к спецификациям вашего GSM-устройства. |
| CNMI при открытии/закрытии модема | строка | '2,1,0,2,0' / '2,0,2,2,1' | Определяет, будут ли сообщения сохраняться на SIM-карте или доставляться мгновенно. Пожалуйста, ознакомьтесь со спецификациями вашего GSM-устройства. |

<!--| Индикация входящего вызова | логическое значение | ложь | Получать событие `'onNewIncomingCall'` при получении вызовов. |-->

### Настройки последовательного порта
Пожалуйста, ознакомьтесь с характеристиками вашего GMS-устройства (в большинстве случаев вам поможет Google)

| Имя | Тип | По умолчанию | Описание |
| -------- | ------- | ------- | ------------------------------------------------------- |
| baudRate | число | 19200 | Скорость передачи данных порта. |
| dataBits | number | 8 | Должно быть одно из: 8, 7, 6 или 5. |
| stopBits | number | 1 | Должно быть одно из: 1 или 2. |
| четность | строка | "none" | Должно быть одно из: 'none', 'even', 'mark', 'odd', 'space'. |
| rtscts | логическое значение | false | настройка управления потоком |
| xon | boolean | false | настройка управления потоком |
| xoff | boolean | false | настройка управления потоком |
| xany | boolean | false | настройки управления потоком |

### Другие настройки и рекомендации
#### Указывать как адаптер - объекты (`admin.x`)
- ваше имя (по умолчанию `ownNumber`), максимальная длина 16 символов.
- Ваш номер телефона.
- Режим работы SMS (`PDU` или `SMS`, `PDU` является режимом по умолчанию и рекомендуется).

Все входные данные должны быть сделаны с ack=false!

#### Входящие/Исходящие - История
Активировав адаптер истории для объектов `inbox.messageRaw` и `sendSMS.messageRaw`, вы получаете полный список входящих и исходящих сообщений вашего SMS-трафика.

<!--

#### СМС - ошибки
Если возвращаются ошибки и ошибка произошла от устройства (то есть обмен с устройством был технически успешным), то в сообщении об ошибке должен быть указан код ошибки, например, "+CMS ERROR: 500". Сообщение об ошибке отображается в журнале на уровне "warn" и сохраняется в объекте `info.error`.
(Неполный) список возможных кодов ошибок и их значений можно найти, например, по адресу <https://www.activexperts.com/sms-component/gsm-error-codes/>.
-->

## Функциональность
### Получать СМС
Входящие SMS записываются в объекты `inbox.*`. `inbox.messageRaw` может использоваться как триггер для дальнейших операций (например, пересылка входящих SMS через адаптер электронной почты).

### Отправить СМС
Для отправки смс заполните `sendSMS.recipient, sendSMS.message` и опционально `sendSMS.alert` и нажмите кнопку `sendSMS.send` -. Или установите `sendSMS.messageRaw` - Объект со строкой в следующем виде и ack=false: `{"recipient": "Number", "message":"Yourtext", "alert":"false"}`.

Этот адаптер также предоставляет comm-block для функциональности blockly и sendTo для других скриптов (sendTo("gsmsms._InstanceNo_", "send", {text: '_yourText_',recipient: '_phonenumber_', alert: '_false/true_'});).

### Выполнение команд AT+
! Пожалуйста, убедитесь, что вы знаете, что вы делаете при настройке команд AT+, это ваша SIM-карта/устройство.

Команды AT+ отправляются с настройкой `admin.atCommandSLR` в формате `AT+XXXXy`.
Отправьте любую команду, которую захотите, но учтите, что вы увидите только последнюю строку ответа.

## Последовательный порт-gsm
Этот адаптер создан на основе [Плагин SerialPort-GSM](https://github.com/zabsalahid/serialport-gsm) для связи с GSM-модемами, в первую очередь для SMS.

## Кредиты
Этот адаптер был бы невозможен без огромной работы @forelleblau (https://github.com/forelleblau), который разработал предыдущие версии этого адаптера.

## Руководство разработчика
Этот раздел предназначен для разработчика. Его можно удалить позже.

### Начиная
Вы почти закончили, осталось всего несколько шагов:

1. Перейдите на [main.js](main.js) и начните программировать!

### Лучшие практики
Мы собрали несколько [лучшие практики](https://github.com/ioBroker/ioBroker.repositories#development-and-coding-best-practices) относительно разработки ioBroker и кодирования в целом. Если вы новичок в ioBroker или Node.js, вам стоит с ними ознакомиться. Если вы уже опытный, вам также стоит с ними ознакомиться — возможно, вы узнаете что-то новое :)

### Скрипты в `package.json`
Несколько скриптов npm предопределены для вашего удобства. Вы можете запустить их с помощью `npm run <scriptname>`

| Имя скрипта | Описание |
\|-------------\|-------------\|
\| `test:js` | Выполняет тесты, которые вы определили в файлах `*.test.js`. |
\| `test:package` | Гарантирует, что ваши `package.json` и `io-package.json` действительны. |
\| `test:unit` | Тестирует запуск адаптера с помощью модульных тестов (быстро, но для работы могут потребоваться имитации модулей). |
\| `test:integration` | Тестирует запуск адаптера с помощью фактического экземпляра ioBroker. |
\| `test` | Выполняет минимальный тестовый запуск файлов пакетов и ваших тестов. |
\| `check` | Выполняет проверку типов вашего кода (без компиляции чего-либо). |
\| `lint` | Запускает `ESLint` для проверки вашего кода на наличие ошибок форматирования и потенциальных ошибок. |
\| `release` | Создает новый выпуск, см. [`@alcalzone/release-script`](https://github.com/AlCalzone/release-script#usage) для получения более подробной информации. |

### Написание тестов
При правильном выполнении тестирование кода бесценно, поскольку оно дает вам уверенность в том, что вы можете изменить свой код, точно зная, сломается ли что-то и когда. Хорошее чтение по теме разработки через тестирование — <https://hackernoon.com/introduction-to-test-driven-development-tdd-61a13bc92d92>.
Хотя написание тестов перед кодом может показаться странным на первый взгляд, у него есть очень явные преимущества.

Шаблон предоставляет вам базовые тесты для запуска адаптера и файлы пакета.
Рекомендуется добавлять собственные тесты в смесь.

### Публикация адаптера
Используя GitHub Actions, вы можете включить автоматические релизы на npm всякий раз, когда вы отправляете новый тег git, соответствующий форме `v<major>.<minor>.<patch>`. Мы **настоятельно** рекомендуем вам это сделать. Необходимые шаги описаны в `.github/workflows/test-and-release.yml`.

После установки скрипта релиза вы можете создать новый релиз, просто вызвав:

```bash
npm run release
```

Дополнительные параметры командной строки для скрипта выпуска описаны в [документации по скрипту выпуска](<https://github.com/AlCalzone/release-script#command-line> ).

Чтобы выпустить свой адаптер в ioBroker, обратитесь к документации [ioBroker.репозитории](https://github.com/ioBroker/ioBroker.repositories#requirements-for-adapter-to-get-added-to-the-latest-repository).

### Тестирование адаптера вручную с помощью dev-server
После настройки `dev-server` вы можете использовать его для запуска, тестирования и отладки вашего адаптера.

Вы можете запустить `dev-server`, вызвав из вашего каталога dev:

```bash
dev-server watch
```

Интерфейс ioBroker.admin будет доступен по адресу <http://localhost:8081/>

Более подробную информацию см. в разделе [документация `dev-server`](https://github.com/ioBroker/dev-server#command-line).

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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

<!--