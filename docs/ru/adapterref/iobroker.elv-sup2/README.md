---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.elv-sup2/README.md
title: ioBroker.elv-sup2
hash: D1tL/XdUlmLnXmWIUr1eJW1S1CvM+IyKPgH5LT/yYBA=
---
![Логотип](../../../en/adapterref/iobroker.elv-sup2/admin/elv-sup2.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.elv-sup2.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/elv-sup2-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.elv-sup2.svg)
![Количество установок](https://iobroker.live/badges/elv-sup2-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.elv-sup2.png?data=d,s)

# IoBroker.elv-sup2
![Тестирование и выпуск](https://github.com/pdbjjens/ioBroker.elv-sup2/workflows/Test%20and%20Release/badge.svg)

## Адаптер elv-sup2 для ioBroker
Этот адаптер подключает ELV HQ-Stereo-FM-Testgenerator SUP2 к ioBroker через последовательный USB-порт. Он позволяет получать и устанавливать определенные параметры конфигурации тестгенератора, в том числе текст RDS, имя и тип программы RDS. Обновление SUP2 не поддерживается. Для этой цели используйте программу для Windows, предоставленную ELV.

## Конфигурация
Единственным параметром конфигурации является идентификатор последовательного порта, к которому подключен SUP2.
Формат должен быть, например, следующим: /dev/ttyUSBx в Linux или COMx в Windows-версиях ioBroker.

## Юридические уведомления
ELV и другие являются товарными знаками или зарегистрированными товарными знаками компании ELV Elektronik AG, D-26787 Леер, Германия - <https://de.elv.com/>

Все остальные товарные знаки являются собственностью их соответствующих владельцев.
Авторы никоим образом не поддерживают компанию ELV Elektronik AG и не связаны с ней, а также с какими-либо ее дочерними компаниями, логотипами или товарными знаками.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.3 (2026-03-04) - 2026H1 maintenance release

* (pdbjjens) **Changed**: node>=20, js-controller>=7.0.7 and admin>=7.7.22 required
* (pdbjjens) **Fixed**: update release-script (#434)

### 0.2.2 (2025-12-15)

* (pdbjjens) **Fixed:** state roles corrected

### 0.2.1 (2025-11-27)

* (pdbjjens) Change: Migrate To Trusted Publishing

### 0.2.0 (2025-08-29) - 2025H2 maintenance release

* (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
* (pdbjjens) Change: Updated to ESLint 9 and serialport 13
* (pdbjjens) Change: Cleanup devDependencies

### 0.1.1 (2024-11-24) - 2025H1 maintenance release

* (pdbjjens) New: Tested with node.js 22
* (pdbjjens) Fix: Responsive Design tweaks
* (pdbjjens) New: Updated dependencies

## License

MIT License

Copyright (c) 2026 pdbjjens <jjensen@t-online.de>

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