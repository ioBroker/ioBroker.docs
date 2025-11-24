---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.stiebel-isg/README.md
title: ioBroker.stiebel-isg
hash: o6fcnDGzNQPpOQyJmW93WYzMfxvxdNMuqZO6ihbMZ1g=
---
![Логотип](../../../en/adapterref/iobroker.stiebel-isg/admin/stiebel-isg.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.stiebel-isg.svg)
![Версия (стабильная)](https://iobroker.live/badges/stiebel-isg-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.stiebel-isg.svg)
![Количество установок (последнее)](https://iobroker.live/badges/stiebel-isg-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.stiebel-isg.svg?data=d,s)

# IoBroker.stiebel-isg
**Тесты:** ![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.stiebel-isg/workflows/Test%20and%20Release/badge.svg)

## Адаптер ioBroker для интернет-шлюзов STIEBEL ELTRON/Tecalor (ISG)
Этот адаптер считывает значения с веб-страниц шлюзов интернет-услуг STIEBEL ELTRON/Tecalor (ISG) и может отправлять команды для управления устройством.

**ПРИМЕЧАНИЕ:** Этот адаптер протестирован только с устаревшими устройствами ISG (ISG Plus и ISG Web). Будет ли он работать с текущим устройством ISG Connect, пока неясно.

**ПРИМЕЧАНИЕ:** Этот адаптер перенесён в iobroker-community-adapters для обслуживания. В дальнейшем будут выпускаться только важные исправления ошибок и обновления зависимостей. Тем не менее, запросы на исправление ошибок или улучшения функций всегда приветствуются.

**Благодарности:** Создание этого адаптера было бы невозможно без выдающейся работы Майкла Шустера (unltdnetworx) <https://github.com/unltdnetworx>, создавшего предыдущие версии этого адаптера.

## Примечания к выпуску
**Внимание:** Версия 2.0.x включает в себя некоторые критические изменения:

* требуется node.js >= 20, js-controller >= 6.0.11 и admin >= 7.6.17

Обновите свой ioBroker как минимум до этого уровня программного обеспечения, если вы хотите использовать этот адаптер.

* Шифрование паролей в интерфейсе конфигурации

Если вы обновите этот адаптер с предыдущей версии вместо новой установки, он может не запуститься, даже если ваш пароль в конфигурации верный и не менялся. Чтобы исправить это, просто введите тот же самый предыдущий пароль ещё раз в интерфейсе конфигурации, сохраните его и закройте интерфейс конфигурации, чтобы перезапустить адаптер. Это, конечно, необходимо сделать только один раз после первого запуска после обновления.

* Изменился тип и/или название некоторых объектов на вкладке «Объекты».

Если вы обновляете этот адаптер с предыдущей версии вместо новой установки, вы можете обнаружить предупреждения в журнале ioBroker, а также ошибки в обновлении значений и/или имён объектов. Чтобы предотвратить это, проще всего остановить адаптер на вкладке «Экземпляры» ioBroker, полностью удалить дерево объектов на вкладке «Объекты» и перезапустить адаптер. Конечно, это необходимо делать только один раз после обновления и не требуется при чистой установке.

## Установка
1. Вам необходим полностью настроенный и работающий шлюз STIEBEL ELTRON или Tecalor Internet Service Gateway (ISG Web или ISG Plus) в той же сети, что и ваш сервер ioBroker.
2. Установите адаптер на свой сервер ioBroker и создайте экземпляр.

## Конфигурация
1. Настройте экземпляр, введя IP-адрес или доменное имя ISG, а также, если настроено в ISG, имя пользователя и пароль.
2. Остальные настройки и список веб-страниц ISG на вкладке URL-адресов можно оставить по умолчанию.
3. Вы можете повысить производительность и снизить нагрузку на ISG, удалив из вкладки URL-адресов все пути, которых нет в вашем веб-интерфейсе ISG или которые вам не нужны. Вы можете легко определить URL-адреса, открыв веб-страницу ISG SERVICEWELT и последовательно открывая различные вкладки навигации. URL-адрес соответствующей страницы отображается в вашем браузере, например, http://IP-адрес-вашего-ISG/?s=1,0 — это путь к INFO/ANLAGE.

## Юридические уведомления
STIEBEL ELTRON, TECALOR, ISG и соответствующие логотипы являются товарными знаками или зарегистрированными товарными знаками STIEBEL ELTRON GmbH & Co KG [https://www.stiebel-eltron.com](https://www.stiebel-eltron.com)

Все остальные товарные знаки являются собственностью их соответствующих владельцев.

Авторы никоим образом не поддерживаются и не связаны с компанией STIEBEL ELTRON GmbH & Co KG или любыми связанными с ней дочерними компаниями, логотипами или товарными знаками.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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

### 1.7.6

* fix error with controller v5

### 1.7.5

* security enhancements

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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