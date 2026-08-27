---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: R2YOflZRZ7SUS6SXQJFi9zSA02CB2JE+OROWDLwPJFE=
---
![Логотип](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Версия (стабильная)](https://iobroker.live/badges/stiebel-isg-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![Количество установок (последние)](https://iobroker.live/badges/stiebel-isg-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.stiebel-isg.svg?data=d,s)

# IoBroker.stiebel-isg
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## Адаптер ioBroker для интернет-шлюзов STIEBEL ELTRON/Tecalor (ISG)
Этот адаптер считывает значения с веб-страниц интернет-шлюзов STIEBEL ELTRON/Tecalor (ISG) и может отправлять команды для управления устройством.

**ПРИМЕЧАНИЕ:** Данный адаптер был протестирован только с устаревшими устройствами ISG (ISG Plus и ISG Web). Совместимость с текущим устройством ISG Connect пока не определена.

**ПРИМЕЧАНИЕ:** Этот адаптер был передан в iobroker-community-adapters для дальнейшего обслуживания. В будущем будут выпускаться только важные исправления ошибок и обновления зависимостей. Однако запросы на слияние с исправлениями ошибок или улучшениями функций всегда приветствуются.

**Благодарности:** Создание этого адаптера было бы невозможно без замечательной работы Майкла Шустера (unltdnetworx) <https://github.com/unltdnetworx>, который создал предыдущие версии этого адаптера.

## Примечания к выпуску
**Внимание:** Версия 2.0.x содержит некоторые изменения, нарушающие обратную совместимость:

* Требуется Node.js >= 20, js-controller >= 6.0.11 и admin >= 7.7.22.

Для использования этого адаптера обновите ioBroker как минимум до этой версии программного обеспечения.

* Шифрование паролей и имен пользователей в пользовательском интерфейсе настроек

Если вы обновляете этот адаптер с предыдущей версии, а не устанавливаете новую, он может не запуститься, даже если ваш пароль и имя пользователя в конфигурации верны и не были изменены. Чтобы исправить это, просто введите тот же предыдущий пароль и имя пользователя еще раз в интерфейсе конфигурации, сохраните изменения и закройте интерфейс конфигурации, чтобы перезапустить адаптер. Это, конечно, необходимо сделать только один раз после первого запуска после обновления.

* Тип и/или название некоторых объектов на вкладке «Объекты» изменились.

Если вы обновляете этот адаптер с предыдущей версии вместо новой установки, вы можете обнаружить предупреждения в журнале ioBroker или некорректное обновление значений и/или имен объектов. Чтобы предотвратить это, самое простое решение — остановить адаптер на вкладке «Экземпляры» в ioBroker, полностью удалить дерево объектов на вкладке «Объекты», а затем перезапустить адаптер. Однако это необходимо сделать только один раз после обновления и не требуется при чистой новой установке.

**ВНИМАНИЕ:** Удаление дерева объектов приведет к удалению всех пользовательских настроек, например, ссылок на другие адаптеры, таких как история или статистика. Вам придется создать их заново вручную, поэтому обязательно запомните подробности настроек.

## Конфигурация
1. Настройте экземпляр, введя IP-адрес или доменное имя группы обеспечения информационной безопасности (ISG), а также, если это указано в ISG, имя пользователя и пароль.
2. Остальные настройки и список веб-страниц ISG на вкладках URL можно оставить со значениями по умолчанию.
3. Вы можете повысить производительность и снизить нагрузку на ISG, удалив из вкладки URL-адресов все пути, которые отсутствуют в вашем веб-интерфейсе ISG или которые вас не интересуют. Вы можете легко определить URL-адреса, открыв веб-страницу ISG SERVICEWELT и последовательно открывая различные вкладки навигации. URL-адрес соответствующей страницы отображается в вашем браузере, например, <http://IP-адрес вашего ISG/?s=1,0> — это путь к значению INFO/ANLAGE.

## Юридические уведомления
STIEBEL ELTRON, TECALOR, ISG и соответствующие логотипы являются товарными знаками или зарегистрированными товарными знаками компании STIEBEL ELTRON GmbH & Co KG [https://www.stiebel-eltron.com](https://www.stiebel-eltron.com)

Все остальные товарные знаки являются собственностью их соответствующих владельцев.

Авторы никоим образом не поддерживают компанию STIEBEL ELTRON GmbH & Co KG, а также не связаны с ней или какими-либо ее дочерними компаниями, логотипами или товарными знаками.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.3 (2026-03-04) - 2026H1 maintenance release

* (copilot) Adapter requires admin >= 7.7.22 now
* (pdbjjens) **Fixed**: update release-script (#143)
* (pdbjjens) **Fixed**: parse missing "info_alone" objects (#140)
* (pdbjjens) **Fixed**: Cleanup some eslint issues

### 2.0.2 (2025-11-23)

* (pdbjjens) **Fixed**: Adapter hangup on wrong credentials. (fixes #127)

### 2.0.1 (2025-11-12)

* (pdbjjens) **Fixed**: ioBroker warnings are avoided by clamping any values exceeding min/max to the min value before setting. (fixes #53 & #65)

### 2.0.0 (2025-10-27)

* (mcm1957) Change: Adapter has been migrated to iobroker-community-adapters organisation
* (mcm1957) Change: Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (mcm1957) Fix: Dependencies have been updated
* (pdbjjens) Change: remove .npmignore
* (pdbjjens) Change: migrate adapter configuration to jsonConfig
* (pdbjjens) Change: migrate from deprecated "request" http client to native fetch API
* (pdbjjens) Fix: min/max handling

### 1.7.7

* security- and compatibility update

## License

MIT License

Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 Michael Schuster <development@unltd-networx.de>

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