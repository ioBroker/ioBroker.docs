---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mediola-gateway/README.md
title: ioBroker.mediola-шлюз
hash: mt+jhkQ8cCtlRO5VITibW6l4BtpRaTN0AdcfhOu/Uak=
---
![Логотип](../../../en/adapterref/iobroker.mediola-gateway/admin/mediola-gateway.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.mediola-gateway.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mediola-gateway.svg)
![Количество установок](https://iobroker.live/badges/mediola-gateway-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/mediola-gateway-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mediola-gateway.png?downloads=true)

# IoBroker.mediola-gateway
**Тесты:** ![Тестирование и выпуск](https://github.com/oelison/ioBroker.mediola-gateway/workflows/Test%20and%20Release/badge.svg)

## Адаптер mediola-gateway для ioBroker
Настройка и использование Mediola-Gateways

## Использование, например. шлюз Mediola V4/V5/V6
Если у вас есть только один шлюз Mediola (https://www.mediola.com/), автоматическое обнаружение — лучший способ начать работу. В журналах обнаруженные IP-адрес и MAC-адрес видны после обнаружения. Если у вас более одного шлюза Mediola, лучше присвоить адаптеру MAC-адрес. Тогда этот конкретный шлюз будет найден. Также возможно использовать IP-адрес, если он не меняется и более известен, чем MAC-адрес.
После того, как адаптер обнаружит шлюз Mediola, экземпляр станет зеленым, и объекты «ReceiveIrData», «SendIrData» и «SendRfData» станут пригодными для использования. Если у вас есть системные переменные в шлюзе Mediola, они также будут указаны в списке объектов. Через некоторое время в основном меняются полученные IrData. Это представляет собой полученную дату IR в комнате, где расположен шлюз Mediola.
Каждое изменение системных переменных также будет отображаться там и может быть использовано для автоматизации.
sendIrData тестируется с использованием нескольких изученных IR-кодов. Просто поместите ИК-код в объект для отправки данных.

## Поиск неисправностей
Проверьте http://ip-of-mediola/command?XC_FNC=getstates\ Ожидаемый результат: {XC_SUC}[...]\ Неожиданный результат: {"XC_ERR":{"code":"000007","msg" :"доступ запрещен"}} (никогда не встречается на шлюзе V4)\ Если это работает, у вас есть mediola без установленного пароля. Непонятно, почему адаптер не должен работать.\ Свяжитесь с форумом: https://forum.iobroker.net/topic/63560/neuer-adapter-mediola-gateway (извините, это немецкий язык, но возможен и английский)\ С пользователем и паролем:\ Проверьте http://ip-of-mediola/command?XC_USER=имя_пользователя&XC_PASS=пароль&XC_FNC=getstates\ Ожидаемый результат: {XC_SUC}[...]\ Неожиданный результат: {XC_ERR}{"код" :"010000"}\ Если это работает, в конфигурацию необходимо добавить имя пользователя и пароль. Если это не работает, возможно, у вас нет имени пользователя и правильного пароля. Если вы установили только пароль, вам необходимо настроить полноправного пользователя. (Шлюз V6)

## Использование для солнцезащитных жалюзи WIR (WR), Roto (BK) и Elero (ER).
Эти солнцезащитные жалюзи будут найдены автоматически. Они начинаются с WR, BK или ER. В адаптере две папки. Одно называется состоянием, а другое — действием.
В состоянии статус WR будет отображаться в процентах закрытия. Состояние BK и ER всегда пусто (никогда не видно другого значения). Для обновления состояния необходимо установить флаг «Чтение статуса из Mediola» в настройках экземпляра адаптера. Интервал обновления можно регулировать в минутах.
В папке действий можно было управлять солнцезащитными жалюзи. Для движения вверх нужно написать 1, для спуска 2 и 3 для остановки. Для WIR вы можете отправить 10, 20, 30, 40, 50, 60, 70, 80 и 90 для установки процента.

## Использование солнцезащитных штор Nobily (NY/DY)
На самом деле это немного сложно. Устройства не определяются автоматически. Вам необходимо переключиться в экспертный режим! Если она не существует, необходимо создать папку «action» в разделе «mediola-gateway.0». В эту папку вам необходимо добавить состояние «Datapoint» со строкой типа и именем «NY12345678» или «DY12345678». «NY» или «DY» должны быть заглавными буквами, а шестнадцатеричное число из 8 символов нужно получить с помощью инструмента отладки из инструмента настройки. Возьмите все номера, которые найдете в разделе группы.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ Все названия и логотипы продуктов и компаний являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо принадлежности или одобрения со стороны них или связанных с ними аффилированных лиц! Этот личный проект реализуется в развлекательных целях и не преследует никаких деловых целей. mediola является торговой маркой компании mediola-connected Living AG.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

-   RT (Somfy) system added (Thanks to Falk)
-   DY (Nobily) system added (Thanks to BlindlyBlinds)
-   ER (Elero) system added (Thanks to CsL-007 [#35](https://github.com/oelison/ioBroker.mediola-gateway/issues/35))

### 1.0.1 (2023-08-26)

-   folder action created as real folder
-   folder sysvars created as real folder

### 1.0.0 (2023-08-10)

-   user and password login to mediola
-   WIR system added (Thanks to Keulehd)
-   BK and NY system added (Thanks to line)
-   pull data added for not pushed states
-   sysvars are now in a folder (breaking change)

### 0.1.4 (2023-05-20)

-   axios with log error on error
-   ack true for readonly objects
-   ack check on state change
-   invalid chars checked

### 0.1.3 (2023-05-18)

-   test and release script corrected

### 0.1.2 (2023-05-18)

-   npm deploy activated
-   Readme improved

### 0.1.1 (2023-05-11)

-   dependencies update

### 0.1.0 (2023-05-03)

-   initial release
-   send ir (only IR_ID 01 front IR)
-   reveive ir

## License

MIT License

Copyright (c) 2023 oelison <iobrokermediola@sciphy.de>

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