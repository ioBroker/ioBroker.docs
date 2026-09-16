---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mediola-gateway/README.md
title: ioBroker.mediola-gateway
hash: Pj2+zNiC37sB2AmJD2qnS3hf1uQNa391exu/PkW0sHs=
---
![Логотип](../../../en/adapterref/iobroker.mediola-gateway/admin/mediola-gateway.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.mediola-gateway.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mediola-gateway.svg)
![Количество установок](https://iobroker.live/badges/mediola-gateway-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/mediola-gateway-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.mediola-gateway.png?downloads=true)
![Тестирование и выпуск](https://github.com/oelison/ioBroker.mediola-gateway/workflows/Test%20and%20Release/badge.svg)

# IoBroker.mediola-gateway
## Адаптер mediola-gateway для ioBroker
Настройка и использование шлюзов Mediola

## Использование, например. шлюз Mediola V4/V5/V6
Если у вас только один шлюз Mediola (https://www.mediola.com/), автоматическое определение - лучший способ начать работу. В логах после определения отображаются обнаруженные IP-адрес и MAC-адрес. Если у вас несколько шлюзов Mediola, лучше указать адаптеру MAC-адрес. Тогда будет найден именно этот шлюз. Также можно использовать IP-адрес, если он не меняется и известен лучше, чем MAC-адрес.
После того, как адаптер обнаружит шлюз Mediola, состояние экземпляра станет зеленым, и объекты receivedIrData, sendIrData и sendRfData станут доступны для использования. Если у вас есть системные переменные в шлюзе Mediola, они также будут отображаться в списке объектов. Через некоторое время, как правило, изменяется receivedIrData. Это представляет собой данные о полученных ИК-сигналах в помещении, где расположен шлюз Mediola.
Все изменения системных переменных также будут отображаться там и могут быть использованы для автоматизации.

Функция sendIrData протестирована с несколькими изученными ИК-кодами. Для отправки данных достаточно просто ввести ИК-код в объект.

## Поиск неисправностей
Проверьте http://ip-of-mediola/command?XC_FNC=getstates\ Ожидаемый результат: {XC_SUC}[...]\ Неожиданный результат: {"XC_ERR":{"code":"000007","msg":"access denied"}} (никогда не наблюдалось на Gateway V4)\ Если это работает, значит, у вас Mediola без установленного пароля. Нет никаких оснований полагать, что адаптер не работает.\ Свяжитесь с форумом: https://forum.iobroker.net/topic/63560/neuer-adapter-mediola-gateway (извините, он на немецком, но можно и на английском).\ С именем пользователя и паролем или ключом аутентификации:\ Проверьте http://ip-of-mediola/command?XC_USER=username&XC_PASS=password&XC_FNC=getstates\ или Проверьте http://ip-of-mediola/command?auth=authkey&XC_FNC=getstates\ Ожидаемый результат: {XC_SUC}[...]\ Неожиданный результат: {XC_ERR}{"code":"010000"}\ Если это работает, необходимо добавить имя пользователя и пароль в конфигурацию. Если это не работает, возможно, у вас нет имени пользователя и правильного пароля. Если вы установили только пароль, необходимо настроить полноправного пользователя. (Шлюз V6)

Проверьте http://ip-of-mediola/command?auth=authkey&XC_FNC=getstates\

## Применение для солнцезащитных жалюзи WIR (WR), Roto (BK) и Elero (ER)
Эти солнцезащитные жалюзи будут обнаружены автоматически. Они начинаются с WR, BK или ER. В адаптере есть две папки. Одна называется state, а другая - action.
В папке state статус WR отображается в процентах закрытия. Статусы BK и ER всегда пусты (никогда не отображаются другие значения). Для обновления статуса необходимо установить флаг "считывать статус из Mediola" в настройках экземпляра адаптера. Интервал обновления можно настроить в минутах.
В папке action можно управлять солнцезащитными жалюзи. Для подъема нужно ввести 1, для опускания - 2, а для остановки - 3. Для WIR можно отправить 10, 20, 30, 40, 50, 60, 70, 80 и 90 для установки процента.

## Применение для солнцезащитных жалюзи Nobily (NY/DY)
На самом деле это немного сложно. Устройства не определяются автоматически. Вам нужно переключиться в экспертный режим! Если папка "action" не существует, её необходимо создать в каталоге "mediola-gateway.0". В эту папку нужно добавить состояние "Datapoint" строкового типа с именем "NY12345678" или "DY12345678". "NY" или "DY" должны быть написаны заглавными буквами, а шестнадцатеричное число из 8 символов нужно получить из инструмента отладки в инструменте конфигурации. Возьмите все числа, которые вы найдете в разделе group.

### ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ
ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ: Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи или одобрения с ними или связанными с ними компаниями! Этот личный проект осуществляется в развлекательных целях и не преследует никаких коммерческих целей. mediola является товарным знаком компании mediola - connected living AG.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.0 (2026-06-05)

-   BK with self qualified direction (2 digits)
-   updates from deps
-   bumps
-   node 22 or higher is needed now
-   js-controller >= 6.0.11
-   admin >= 7.6.20

### 1.2.0 (2025-02-15)

-   Node 16 removed
-   some updates of libs
-   DY2 as 2DY added (Thanks to JEnsR)

### 1.1.0 (2024-01-21)

-   RT (Somfy) system added (Thanks to Falk)
-   DY (Nobily) system added (Thanks to BlindlyBlinds)
-   ER (Elero) system added (Thanks to CsL-007 [#35](https://github.com/oelison/ioBroker.mediola-gateway/issues/35))
-   HM (HomeMatic) read added (Thanks to drapo)
-   command and cmd calls possible

### 1.0.1 (2023-08-26)

-   folder action created as real folder
-   folder sysvars created as real folder

### 1.0.0 (2023-08-10)

-   user and password login to mediola
-   WIR system added (Thanks to Keulehd)
-   BK and NY system added (Thanks to line)
-   pull data added for not pushed states
-   sysvars are now in a folder (breaking change)

[Older changelogs can be found there](https://github.com/oelison/ioBroker.mediola-gateway/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 oelison <iobrokermediola@sciphy.de> (bots could use the mail, humans add a "2" before the @)

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