---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nibeuplink/README.md
title: ioBroker.nibeuplink
hash: 6kBlzH6zxfy578l1FZq6McfUTKvGCnx0zZu0mOuGsNA=
---
# IoBroker.nibeuplink

![версия NPM](https://img.shields.io/npm/v/iobroker.nibeuplink.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/nibeuplink-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nibeuplink.svg)
![Количество установок](https://iobroker.live/badges/nibeuplink-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.nibeuplink.png?downloads=true)

[![Статус сборки] (https://github.com/sebilm/ioBroker.nibeuplink/workflows/Test%20and%20Release/badge.svg)](https://github.com/sebilm/ioBroker.nibeuplink/actions/workflows/test-and-release.yml)

## Адаптер nibeuplink для ioBroker
Этот адаптер ioBroker получает данные от теплового насоса Nibe от Nibe Uplink.
Этот адаптер НЕ работает с Nibe myUplink! Поэтому он НЕ работает с тепловыми насосами серии S, такими как Nibe VVM S320.

## Использование этого адаптера
1. Вам нужен тепловой насос Nibe — купите его, если у вас его нет ;-)
2. Вам нужна учетная запись на Nibe Uplink: https://www.nibeuplink.com/
3. После входа в систему у вас есть URL-адрес в следующем виде: https://www.nibeuplink.com/System/XXXXX/Status/Overview.
4. Вместо ХХХХХ стоит число. Это ваш идентификатор системы. Нам нужен этот идентификатор.
5. Перейдите в Nibe Uplink Api: https://api.nibeuplink.com/Account/LogIn и войдите в систему.
6. Нажмите «МОИ ПРИЛОЖЕНИЯ», а затем «Создать приложение».
7. Заполните: Имя и Описание могут быть любыми, например. ioBroker
8. URL-адрес обратного вызова важен. Вы можете использовать https://sebilm.github.io/ioBroker.nibeuplink/nibe.html
9. Примите Соглашение об услугах NIBE Uplink API и нажмите «Создать приложение».
10. Далее вы получаете Идентификатор и Секрет - они нам нужны
11. Установите этот адаптер в ioBroker
12. На странице настройки адаптера заполните Идентификатор и Секрет.
13. Щелкните ссылку «Щелкните здесь, чтобы сгенерировать код авторизации на восходящем канале NIBE».
14. Следуйте инструкциям. В конце вы получите свой код nibe-fetcher
15. Скопируйте этот код и вставьте его в настройках адаптера в «Код авторизации».
16. Введите свой системный идентификатор из URL-адреса Nibe Uplink.
17. Выберите свой язык.
18. Нажмите «Сохранить и закрыть».

Если вы (позже) получите в журнале ошибку «400 неверный запрос», вы должны получить новый код авторизации — так же, как и номера с 13 по 15 и 18.

## Управление/Написать поддержку
Кажется, вы можете изменить список параметров только на следующей веб-странице:

https://api.nibeuplink.com/docs/v1/Parameters (раздел настроек)

Параметр «hot_water_boost» — это параметр ID 48132.

Вы можете читать другие значения, но я думаю, что вы не можете писать другие значения. Здесь перечислены другие значения:

https://github.com/sebilm/ioBroker.nibeuplink/blob/master/nibe-fetcher.js#L41

## Changelog
### 1.2.1 (2022-10-03)
- Fix getting data directory

### 1.2.0 (2022-10-02)
- Requires js-controller >= 3.3.22 and admin >= 5.0.0
- Update some files from up-to-date adapter creator
- Bump dependencies

### 1.1.1 - 2022-04-02
- Fix write support (does not send zero) #6 #128
- Bump dependencies

### 1.1.0 - 2022-02-06

- Switch to TypeScript
- Use axios instead of wreck

### 1.0.1 - 2021-12-31

- Fix write support #6

### 1.0.0 - 2021-12-30

- Support to manage Nibe heat pump (write support #6)
  - To manage your Nibe heat pump you must pay for it on Nibe Uplink website!
  - You need to run the new version 30 minutes and then get a new AuthCode in the settings to use it!

### 0.5.3 - 2021-11-21

- Bump dependencies

### 0.5.2 - 2021-07-04

- Change default callback URL to own GitHub Pages
- Bump dependencies

### 0.5.1 - 2021-05-14

- Store 'no current connection error' as empty string, not null
- Bump dependencies

### 0.5.0 - 2021-05-13

- Add new connection types (cloud, poll)
- Set supported node.js versions to >=12.0.0 <17
- Do not log errors immediately after installation

### 0.4.0 - 2020-12-24

- Set required js-controller to >=2.0.0
- Test for Node 8 removed
- Support for compact mode enabled
- Support for more than one unit added
  - There is a new object structure - one level more for the unit.
  - The old objects will be updated if they are found - so don't panic.
  - If you don't need the old objects, you can remove them. They will not be created again.
- Devide by 10 added to external flow temperature
- Hundreds of missing parameters were added
  - The old fallback objects are no longer supported and updated. So check your objects update time.
  - You can remove the old objects. They will not be created again.
- Fallback names for unknown parameters changed (id added at the beginning)
  - The old fallback objects are no longer supported and updated. So check your objects update time.
  - You can remove the old objects. They will not be created again.
  - If you have objects with numbers at the beginning, then these are fallback names. Please email me and I can add them.
- Store session in iobroker data directory
  - After the adapter update you always had to get a new AuthCode and set it in the adapter settings.
  - This is no longer necessary from the next version.
  - But after the update to this version (0.4.0) it is necessary once again.
- Translate object keys of serial number, version and product in english for all languages (section SYSTEM_INFO)
  - The old objects are no longer supported and updated. So check your objects update time.
- Norwegian added
- Code refactoring

### 0.3.0 - 2019-10-31

- Compact mode disabled
- Support for Node 6 removed
- Trim whitespaces from setting parameters
- Bugfix: Customs disabled

### 0.2.2 - 2019-03-24

- Internal clean-up

### 0.2.1 - 2019-03-21

- Dependencies updated
- Fix problem with nodejs 6 and the spread operator and async

### 0.2.0 - 2019-03-16

- Code change to new template
- Support for Compact mode (js-Controller 2.0 Feature) added (#1)
- Translations in settings page
- Type moved from general to climate control

### 0.1.1 - 2019-02-19

- Do not create deprecated sub path objects - only update them if present (if you have them and don't use them, you can delete them)
- info.connection added

### 0.1.0 - 2019-02-17

- Objects tree changed: New, more readable objects added

### 0.0.2 - 2019-02-17

- Language support for objects tree

### 0.0.1 - 2018-12-09

- Initial release

## License

MIT License

Copyright (c) 2022 Sebastian Häßelbarth <seb@sebmail.de>

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
