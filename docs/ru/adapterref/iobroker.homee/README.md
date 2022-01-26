---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.homee/README.md
title: Адаптер ioBroker homee
hash: UebqvVp7K22VBsbePxsF3E6xIrE8m0q27YxLhfpZWn0=
---
![Логотип](../../../en/adapterref/iobroker.homee/admin/homee.png)

![Количество установок](http://iobroker.live/badges/homee-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.homee.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.homee.svg)

# IoBroker homee адаптер
![Тестирование и выпуск](https://github.com/Apollon77/iobroker.homee/workflows/Test%20and%20Release/badge.svg) [![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/homee/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Описание
Этот адаптер подключает ioBroker к homee и предоставляет следующие функции:

* позволяет подключение через IP или homee-ID и имя пользователя / пароль
* читать все устройства (узлы) и состояния (атрибуты) и отображать их значения, включая обновления, в ioBroker
* разрешить изменять значения в ioBroker и отправлять их обратно в homee для управления устройствами
* действует как поставщик истории ioBroker для всех устройств состояний, где история включена в homee. Это означает, что вы можете использовать значения истории, хранящиеся в homee, для отображения в ioBroker, используя flot, Admin или также JavaScript, включая все агрегаты на уровне данных, как известно, например, из Адаптер истории

не (пока) поддерживается:

* группы, потому что они не предлагают никаких функций, таких как состояние уровня группы или реальная запись на все устройства одновременно в homee
* планы отопления

Этот адаптер основан на выдающейся работе [stfnhmplr] (http://twitter.com/stfnhmplr) и его [homee-api](https://github.com/stfnhmplr/homee-api).

## Известные проблемы
* На js-controller <1.5.0 он может иметь странные эффекты при включении других поставщиков истории для некоторых ролей (например, "переключатель")

## Как сообщить о проблемах и запросах функций
Пожалуйста, используйте для этого проблемы GitHub.

Лучше всего установить адаптер в режим журнала отладки (Экземпляры -> Экспертный режим -> Уровень журнала столбцов). Затем получите файл журнала с диска (подкаталог "log" в установочном каталоге ioBroker, а не из Admin, потому что Admin сокращает строки). Если вам не нравится предоставлять его в выпуске GitHub, вы также можете отправить его мне по электронной почте (iobroker@fischer-ka.de). Добавьте ссылку на соответствующую проблему GitHub И также опишите, что я вижу в журнале и в какое время.

## Changelog
### 1.2.0 (2021-08-01)
* (bluefox) Added admin5 support
* (Apollon77) Update to homee 2.33

### 1.1.1 (2021-04-10)
* (Apollon77) Update to homee 2.32

### 1.1.0 (2020-11-30)
* (Apollon77) Update to homee 2.30

### 1.0.7 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.0.6 (2020-06-12)
* (Apollon77) Fix Admin

### 1.0.5 (2020.04.12)
* (Apollon77) update homee lib to prevent a crash case

### 1.0.4 (2020.04.12)
* (Apollon77) fixes and optimizations
* (Apollon77) use js-controller 3.0 features if available 

### 1.0.2 (2020.03.22)
* (Apollon77) fixes and optimizations 

### 1.0.1 (2020.03.18)
* (Apollon77) fixes and optimizations 

### 1.0.0 (2020.03.13)
* (Seraphis411) fixed writing of HomeeMode
* (Seraphis411) bumped version of homee-api to 0.12.0 (no new features adopted)
* (Seraphis411) now support for nodejs 10 thanks to newer ws-library (^7.1.2) in homee-api
* (Apollon77) add sentry for error reporting
* (Apollon77) update homee api to 0.15.0

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2021 Apollon77 <iobroker@fischer-ka.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.