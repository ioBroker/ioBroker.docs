---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.adguard/README.md
title: ioBroker.adguard
hash: LjuS7ZNH3yS1ivp9ZY52sadIaODeAdRlkmzLJwwRkeU=
---
![Логотип](../../../en/adapterref/iobroker.adguard/admin/adguard.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.adguard.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.adguard.svg)
![Количество установок (последнее)](https://iobroker.live/badges/adguard-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/adguard-stable.svg)
![Статус зависимости](https://img.shields.io/david/o0shojo0o/iobroker.adguard.svg)
![НПМ](https://nodei.co/npm/iobroker.adguard.png?downloads=true)

# IoBroker.adguard
**Тесты:** ![Тест и выпуск](https://github.com/o0shojo0o/ioBroker.adguard/workflows/Test%20and%20Release/badge.svg)

## Адаптер AdGuard для ioBroker
AdGuard Home — это сетевой DNS-сервер, блокирующий рекламу и трекеры, с возможностями родительского контроля (блокировки контента для взрослых). Адаптер AdGuard позволяет вам контролировать и отслеживать ваш экземпляр AdGuard Home в ioBroker.

## Кредиты
Этот адаптер был бы невозможен без огромной работы @o0Shojo0o (https://github.com/o0Shojo0o), который разработал предыдущие версии этого адаптера.

## Как сообщать о проблемах и запрашивать новые функции
В идеале, пожалуйста, используйте для этого GitHub issues, а лучший метод достигается путем установки адаптера в режим Debug log (Instances -> Expert mode -> Column Log level). Затем извлеките файл журнала с диска через подкаталог ioBroker 'log', **не** из Admin, что приведет к сокращению строк.

## Конфигурация
1. Создайте новый экземпляр адаптера
2. Введите URL/IP с сервера AdGurad
3. Настройте имя пользователя и пароль.
4. Сохраните настройки.
5. Развлекайтесь :)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 1.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 0.0.8 (2021-08-18)

-   (o0Shojo0o) change UI to JSONConfig

### 0.0.7 (2021-08-01)

-   (o0Shojo0o) better unload handling

### 0.0.6 (2021-08-01)

-   (o0Shojo0o) more resource-efficient handling of the States
-   (o0Shojo0o) better unload handling

## License

MIT License

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <info@bastelbunker.de>

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