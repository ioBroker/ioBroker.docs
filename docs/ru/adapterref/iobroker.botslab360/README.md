---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.botslab360/README.md
title: ioBroker.botslab360
hash: P4PNjxI2RbXsk/6KBGPZg6sAAUUb8SDQJ07aBdLQaqg=
---
![Логотип](../../../en/adapterref/iobroker.botslab360/admin/botslab360.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.botslab360.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.botslab360.svg)
![Количество установок](https://iobroker.live/badges/botslab360-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/botslab360-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.botslab360.png?downloads=true)
![Тестирование и выпуск](https://github.com/TA2k/ioBroker.botslab360/workflows/Test%20and%20Release/badge.svg)

# ioBroker.botslab360

## адаптер botslab360 для ioBroker

Адаптер для роботов-пылесосов Botslab / 360.

## Настраивать

1. Создайте экземпляр адаптера.
2. Выберите **сервер** , соответствующий приложению, в котором была создана ваша учетная запись:
   - **Международная версия (Botslab)** для аккаунтов из приложения Botslab.
   - **Китай (360Robot)** для учетных записей из приложения 360Robot (`q.smart.360.cn` Используйте это, если при международной авторизации сообщается, что учетная запись не существует.
3. Введите адрес **электронной почты** и **пароль** вашей учетной записи.
4. Для международного сервера выберите **регион** , к которому относится ваша учетная запись (na1 / eu1 / ap1). Адаптер автоматически попытается подключиться к другим регионам, если учетная запись не будет найдена в выбранном регионе. Для китайского сервера регион не указывается.

### Капча

Если при входе в систему используется капча, адаптер сохраняет изображение в виде URL-адреса данных. `info.captchaImage` а также записывает это в лог (скачайте лог, чтобы просмотреть его). Решите задачу и напишите код для... `info.captchaRequest` Для продолжения входа в систему.

## Стойерн

Удаленный доступ к устройству Befehle gesendet werden.

## Статус

Статус Abruf für Verbrauchsgüter und Karte должен быть изменен вручную. Beim China-Server обеспечивает асинхронную обработку с помощью Push-Verbindung geliefert и unter `<sn>.status` veröffentlicht.

## Вопросы и дискуссии

<https://forum.iobroker.net/topic/60046/test-adapter-360-staubsauger-botslab>

## Changelog

### 0.3.1

- (TA2k) Fix the China (360Robot) session mint (errno 100) and recognize the expired-session error so login and device polling work

### 0.3.0

- (TA2k) Add a China (360Robot / q.smart.360.cn) backend selectable via the new Server option, for accounts that cannot log in on the international servers

### 0.2.1

- (TA2k) Auto-retry other regions when the account is not found; verbose debug logging; log the captcha image inline

### 0.2.0

- (TA2k) Switch to headless email/password login on the /v1 API; cookie login is no longer required

### 0.1.0

- (TA2k) Add login with an existing 360 web session

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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