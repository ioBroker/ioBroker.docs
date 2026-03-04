---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.porsche/README.md
title: ioBroker.porsche
hash: FxnW7nhmAhoUTIf6CcWeWC3L/BeyMHd3zn4X2sJwCyY=
---
![Логотип](../../../en/adapterref/iobroker.porsche/admin/porsche.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.porsche.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.porsche.svg)
![Количество установок](https://iobroker.live/badges/porsche-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/porsche-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.porsche.svg)
![НПМ](https://nodei.co/npm/iobroker.porsche.png?downloads=true)

# IoBroker.porsche
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.porsche/workflows/Test%20and%20Release/badge.svg)

## Адаптер Porsche для ioBroker
Адаптер для моего Porsche

## Логинаблауф
Используйте myPorsche Mail и пароль.

### Капча
Для входа в систему используйте капчу от Porsche angefordert. Осенью Дисема:

1. Адаптер-Einstellungen im Admin öffnen
2. Я использую «Вход с помощью Captcha» с использованием Captcha-Bild angezeigt.
3. Введите код в поле «Код капчи»
4. Нажмите «Отправить код»

Если сообщение Captcha-Bild будет изменено при входе в систему, сайт не будет загружен.

## Steuern
porsche.0.vin.remote auf true/false setzen steuert den jeweiligen Befehl

## Обсуждение и вопросы
<https://forum.iobroker.net/topic/50883/test-adapter-myporsche-v0-0-x>

## Changelog

### 0.5.1
- fix login and add remotes

### 0.2.0

- (TA2k) fix login

## License

MIT License

Copyright (c) 2023 TA2k <tombox2020@gmail.com>

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