---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.epson_ecotank_et_2750/README.md
title: ioBroker.epson_ecotank_et_2750
hash: DJUocHZJ6dK/9ez/ELJZEYxWdAE6Ooed4DI/EEFo72A=
---
![Логотип](../../../en/adapterref/iobroker.epson_ecotank_et_2750/admin/epson_ecotank_et_2750.png)

![Количество установок](https://iobroker.live/badges/epson_ecotank_et_2750-stable.svg?dummy=unused)
![версия НПМ](https://img.shields.io/npm/v/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![Загрузки](https://img.shields.io/npm/dm/iobroker.epson_ecotank_et_2750.svg?dummy=unused)
![НПМ](https://nodei.co/npm/iobroker.epson_ecotank_et_2750.png?downloads=true)

# IoBroker.epson_ecotank_et_2750
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/epson_ecotank_et_2750/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Адаптер EPSON EcoTank ET-2750 для ioBroker
Этот адаптер считывает уровень в баке и другую информацию из [EPSON EcoTank ET-2750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2750) и сохраняет в ioBroker.

[EPSON EcoTank ET-4750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-4750) также поддерживается (протестировано [Homoran](https://forum.iobroker.net/user/homoran)) [EPSON EcoTank ET-3750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-3750) также поддерживается (протестировано [christofkac](https://github.com/christofkac)) [EPSON EcoTank ET-2721](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2721) также поддерживается (протестировано [mikepiko](https://github.com/mikepiko)) [EPSON WORKFORCE WF-3620DWF](https://www.epson.de/products/printers/inkjet-printers/for-home/workforce-wf-3620dwf) также поддерживается (протестировано [HReimann](https://github.com/HReimann))

## Кредиты
Этот адаптер был бы невозможен без огромной работы @o0Shojo0o (https://github.com/o0Shojo0o), который разработал предыдущие версии этого адаптера.

## Как сообщать о проблемах и запрашивать новые функции
В идеале, пожалуйста, используйте для этого GitHub issues, а лучший метод достигается путем установки адаптера в режим Debug log (Instances -> Expert mode -> Column Log level). Затем извлеките файл журнала с диска через подкаталог ioBroker 'log', **не** из Admin, что приведет к сокращению строк.

## Конфигурация
1. Создайте новый экземпляр адаптера
2. Введите URL/IP и порт EPSON EcoTank ET-2750
3. Настройте время синхронизации (по умолчанию 10 минут)
4. Сохраните настройки.

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

### 0.0.12 (2022-06-09)

-   (o0Shojo0o) fix ETIMEDOUT error

### 0.0.11 (2021-08-24)

-   (o0Shojo0o) fix name for Workforce 3620
-   (o0Shojo0o) fix firmware for Workforce 3620

### 0.0.10 (2021-08-19)

-   (o0Shojo0o) fix translation

## License

The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <dennis.rathjen@outlook.de>

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

---

_Dank an die Erfinder des Basisskripts zum Parsen der Daten, Idittmar und MistyReblaus aus dem [Homematic-Forum](http://homematic-forum.de/forum/viewtopic.php?f=31&t=25140)._ :+1:

\*Dank an pix und rr0v1 für die Vorlage