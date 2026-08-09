---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.midas-aquatemp/README.md
title: ioBroker.midas-aquatemp
hash: rOtzxDCLO1xb0up4n/6LQBft3dt06yVrRXcZ148KB4o=
---
![Логотип](../../../en/adapterref/iobroker.midas-aquatemp/admin/midas-aquatemp.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.midas-aquatemp.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.midas-aquatemp.svg)
![Количество установок](https://iobroker.live/badges/midas-aquatemp-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/midas-aquatemp-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.midas-aquatemp.png?downloads=true)

# IoBroker.midas-aquatemp
**Тесты:** ![Тестирование и выпуск](https://github.com/Miro1310/ioBroker.midas-aquatemp/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и инструкций по отключению сообщений об ошибках, пожалуйста, обратитесь к разделу [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Использование системы отчетности Sentry начинается с версии js-controller 3.0.

## Адаптер midas-aquatemp для ioBroker
## Документация
### Конфигурация
| Поле | Описание |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Имя пользователя** | Адрес электронной почты вашей учетной записи Linked-Go в облаке. Настоятельно рекомендуется создать отдельную вторую учетную запись для адаптера, поскольку одновременный вход из других приложений может вызвать конфликты. |
| **Пароль** | Пароль для облачного аккаунта Linked-Go. |
| **Интервал обновления** | Частота опроса устройства адаптером на наличие новых данных, в секундах. Минимальное значение — 60 секунд. |
| **Уровень API** | Версия облачного API, используемая для связи с устройством. Начните с **API 3** (по умолчанию). Если ваше устройство не найдено или данные отсутствуют, попробуйте использовать API 2 или API 1. |
| **MAC-адрес устройства** | MAC-адрес устройства, отображаемый в приложении Linked-Go. Требуется только при включенной опции **Использовать MAC-адрес устройства**. |
| **Использовать MAC-адрес устройства** | Если эта функция включена, адаптер пропускает автоматическое обнаружение устройства и подключается напрямую, используя указанный выше MAC-адрес. Используйте этот режим, если устройство не может быть найдено через обычный список устройств. Примечание: состояние `flowSwitch` может быть недоступно в этом режиме на всех устройствах. |
| **Разрешить небезопасный TLS** | Отключает проверку TLS-сертификатов. **Только для устранения неполадок — не рекомендуется для обычного использования.** |

Проверка TLS-сертификатов включена по умолчанию. Ее можно отключить только с помощью параметра адаптера **Разрешить небезопасный TLS**, указанного выше; при активации адаптер будет выводить предупреждение при запуске.

### Поддерживаемые устройства
Подтверждена совместимость с данным адаптером следующих устройств. Другие устройства [Мидас](https://www.midas-gmbh.de/) / Poolsana, использующие облачный API Linked-Go, также могут быть совместимы, но это не гарантируется.

Если вашего устройства нет в списке, но вы успешно использовали его с этим адаптером, смело создавайте запросы на добавление или отправляйте их через pull request.

**Подтверждено, что работает:**

- Poolsana InverterPro Series (17, 21) с Wi-Fi-адаптером для инверторного обогревателя Midas
- Poolsana Prime 8
- XPS-50, 5 кВт, COP5,1, до 16 м³

Если у вас возникнут проблемы, свяжитесь с нами.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.3.3 (2026-07-25)

- FIX: #138 Correct power consumption calculation to handle decimal values
- FIX: #126 Repository checker and Claude Review for latest repro

### 1.3.2 (2026-07-05)

- FIX: Code style and linting issues

### 1.3.1 (2026-06-15)

- FIX: Object Structure Check

### 1.3.0 (2026-06-15)

- FIX: Compatibility with the updated Linked-Go cloud API (API level 3 with new endpoint paths and camelCase parameters)
- FIX: Device discovery now tries both deviceList payload formats (default and legacy) to ensure devices are found
  regardless of API behaviour
- FIX: Numerous control and polling issues (mode, silent mode, set temperature, fault detection)
- FIX: Product-specific protocol codes for Poolsana vs. other devices
- FIX: TLS certificate validation enabled by default; optional insecure mode via adapter config or environment variable
- FIX: Invalid or missing sensor values are no longer written as NaN
- FEAT: Add online state — boolean datapoint that indicates whether the device is currently reachable via the cloud API
- CHORE: Update dependencies

### 1.2.5 (2025-08-02)

- Add size attributes to jsonConfig
- Minimal admin version: 7.4.10
- Breaking change: minimal supported node.js version is 20.x

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 MiRo1310 <michael.roling@gmx.de>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.