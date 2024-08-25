---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartthings/README.md
title: ioBroker.smartthings
hash: Q47BVVpyPnZejeYC0pAFCqs/NiNWvj6Zwvwp8fmtZpE=
---
![Логотип](../../../en/adapterref/iobroker.smartthings/admin/smartthings.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.smartthings.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.smartthings.svg)
![Количество установок](https://iobroker.live/badges/smartthings-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/smartthings-stable.svg)
![Статус зависимости](https://img.shields.io/david/TA2k/iobroker.smartthings.svg)
![НПМ](https://nodei.co/npm/iobroker.smartthings.png?downloads=true)

# IoBroker.smartthings
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.smartthings/workflows/Test%20and%20Release/badge.svg)

## Адаптер smartthings для ioBroker
Адаптер для Samsung Smartthings

## Процесс входа:
Посетите ссылку. https://account.smartthings.com/tokens Войдите в свою учетную запись Samsung, чтобы перейти на страницу «Токены личного доступа».
Нажмите кнопку «Создать новый токен», чтобы перейти на страницу «Новый токен доступа».
Укажите имя для нового токена. В разделе «Авторизованные области» выберите любую функциональность, которую вы хотите авторизовать для токена.
Когда закончите, нажмите кнопку «Создать токен», и вы вернетесь на страницу «Токены личного доступа». Скопируйте вновь сгенерированный токен и сохраните его в надежном месте. Это ваш единственный способ получить вновь сгенерированное значение токена.

## Руль
smartthings.0.id.capabilities либо устанавливается в значение true, либо устанавливает предопределенное значение.

## Обсуждение и вопросы:
https://forum.iobroker.net/topic/48091/test-adapter-samsung-smartthings-v-0-0-x

## Changelog
### 0.1.2 (2024-05-19)

- Update Dependencies

- 0.1.0 Added object excluding to reduce cpu usage

- 0.0.4 Reduced cpu load while writing states

- 0.0.3 (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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
