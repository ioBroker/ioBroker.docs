---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mediola-gateway/README.md
title: ioBroker.mediola-шлюз
hash: ZbXps5bi5Ycj0fEoRzrSrqUtuLCPQQ35384m/3FDP9Q=
---
![Логотип](../../../en/adapterref/iobroker.mediola-gateway/admin/mediola-gateway.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.mediola-gateway.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mediola-gateway.svg)
![Количество установок](https://iobroker.live/badges/mediola-gateway-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/mediola-gateway-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mediola-gateway.png?downloads=true)

# IoBroker.mediola-шлюз
**Тесты:** ![Тестируйте и выпускайте](https://github.com/oelison/ioBroker.mediola-gateway/workflows/Test%20and%20Release/badge.svg)

## Адаптер mediola-gateway для ioBroker
Настройка и использование Mediola-Gateways

## Использование, например, с шлюз mediola V4/V5/V6
Если у вас есть только один шлюз Mediola (https://www.mediola.com/), автоматическое определение — лучший способ начать работу. В журналах видны обнаруженные IP-адрес и MAC-адрес после обнаружения. Если у вас более одного шлюза Mediola, лучше присвоить адаптеру MAC-адрес. Тогда этот конкретный шлюз будет найден. Также можно использовать IP-адрес, если он не меняется и более известен, чем MAC-адрес.
После того, как адаптер найдет шлюз Mediola, экземпляр становится зеленым, и объекты ReceiveIrData, sendIrData и sendRfData можно использовать. Если у вас есть системные переменные в Mediola Gateway, они также будут перечислены в списке объектов. Через какое-то время в основном меняются полученные IrData. Представляет собой полученную ИК-дату в помещении, где находится шлюз Mediola.
Каждое изменение системных переменных также будет отображаться там и может быть использовано для автоматизации.
sendIrData тестируется с использованием нескольких изученных ИК-кодов. Просто поместите ИК-код в объект для отправки данных.

## Использование для солнцезащитных штор WIR (WR) и Roto (BK)
Эти солнцезащитные шторки будут найдены автоматически. Они начинаются с WR или BK. В адаптере две папки. Одно называется состоянием, а другое называется действием.
В состоянии состояние WR будет отображаться в процентах закрытия. Состояние BK всегда пусто (никогда не видел другого значения). Для обновления состояния необходимо установить флаг «читать статус из Медиолы» в настройках экземпляра адаптера. Интервал обновления можно настроить в минутах.
В папке действий можно было управлять солнцезащитными шторками. Для движения вверх нужно написать 1, для вниз 2 и 3 для остановки. Для WIR вы можете отправить 10, 20, 30, 40, 50, 60, 70, 80 и 90 для установки процента.

## Использование солнцезащитных штор Nobily (NY)
Это на самом деле немного сложно. Устройства не определяются автоматически. Вам нужно переключиться в экспертный режим! Если папка «action» не существует, необходимо создать ее в «mediola-gateway.0». В эту папку нужно добавить состояние "Datapoint" с типом string и именем "NY12345678". «NY» должно быть заглавными буквами, а шестнадцатеричное число с 8 символами необходимо получить из инструмента отладки из инструмента конфигурации. Возьмите все номера, которые вы найдете в разделе группы.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ Все названия продуктов и компаний или логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо аффилированности или одобрения ими или связанными с ними аффилированными лицами! Этот личный проект осуществляется в развлекательных целях и не имеет коммерческих целей. mediola является торговой маркой компании mediola - Connected Living AG.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

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