---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: QEmnX/veJh16zAHkvrteP/h5/cifw+VnHqwPi9K30i0=
---
![Логотип](../../../en/adapterref/iobroker.solarmanpv/admin/solarmanpv.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)
![Количество установок](https://iobroker.live/badges/solarmanpv-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/solarmanpv-stable.svg)
![Статус зависимости](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)
![НПМ](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)

# IoBroker.solarmanpv
**Тесты:** ![Тестирование и выпуск](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## Адаптер solarmanpv для ioBroker
Считывание данных с балконной электростанции

### Начиная
Этот адаптер используется для отображения данных о работе балконной электростанции, обеспечиваемой инвертором "Bosswerk MI600", в ioBroker. Данный инвертор совместим с другими инверторами семейства Deye.

Предполагаю, что на данный момент за работой электростанции ведется наблюдение с помощью приложения «Solarman».
Этот адаптер получает данные из облачного хранилища.

Сначала вам нужно обратиться в службу поддержки Solarman по адресу <service@solarmanpv.com> за необходимыми учетными данными (app_id и app_secret).
Может возникнуть вопрос типа: «Какую платформу вы используете? Какова ваша роль? Вы частное лицо, поставщик услуг по эксплуатации и техническому обслуживанию, производитель или дистрибьютор? Можете ли вы предоставить мне свой адрес электронной почты для API?». В моем случае затем возник еще один вопрос: «Почему вы подаете заявку на API?». Я вежливо ответил и на этот вопрос, и необходимые данные были отправлены мне на следующий день.

На странице администратора 4 поля должны соответствовать описанию.
Этот адаптер создан как «планируемый» адаптер.
Поскольку данные в облаке обновляются примерно каждые 6 минут, это не требует более частого запуска адаптера.

Начиная с версии 0.3.0, в отличие от предыдущих версий, появилась возможность использования черного списка. Это означает, что считываются «все» значения, предоставляемые API, и пользователь может отфильтровать ненужные значения с помощью черного списка. Соответствующие точки данных можно удалить, что делает количество объектов более наглядным.

Начиная с 16.04.2023 Solarman перешел на новую платформу — версию 0.4.0.
Дальнейших изменений API, насколько это возможно, не производилось.

В версиях с 0.5.2 по 0.6.x были внесены только корректировки для разработчиков.

В версии 0.7.0 версия Node.js была повышена до рекомендуемой 20.x, а js-controller >6 стал обязательным условием. Адрес электронной почты и секретный ключ приложения зашифрованы. Поэтому оба значения необходимо ввести заново после обновления!

В версии 0.7.1 были внесены лишь незначительные изменения в представление экземпляра.

Потенциально конфиденциальные данные, такие как «activeToken», должны быть зашифрованы, но это не обеспечивает надежной работы. Поэтому в версии 0.7.3 это было отменено.

## Совместимость
- Протестировано с Node.js 22
- Протестировано с js-controller 7
- Неправильно введенные состояния ioBroker автоматически исправляются при следующем запуске адаптера.
— Удаление существующих объектов вручную не требуется.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- Fix dynamic state type handling
- Automatically repair incorrect ioBroker state types
- Improved compatibility with js-controller 7
- Better handling of string based Solarman values

### 0.7.4 (2026-05-29)

- (raschy) Bump axios from 1.13.6 to 1.16.1
- (raschy) Removed the unused 'paket' module
- (raschy) NodeJS >= 22.x is required

### 0.7.3 (2025-11-04)

- (raschy) Bump axios from 1.12.2 to 1.13.1
- (raschy) Token encryption revoked
- (raschy) Dependencies updated according to Dependabot on November 24

### 0.7.2 (2025-10-01)

- (raschy) Bump axios from 1.11.0 to 1.12.2

### 0.7.1 (2025-04-25)

- (raschy) jsonConfig customized

### 0.7.0 (2025-04-23)

- (raschy) NodeJS >= 20.x and js-controller >= 6 is required
- (raschy) email and appsecret is now encrypted, please re-enter!

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2022-2026 raschy <raschy@gmx.de>

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