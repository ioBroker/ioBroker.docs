---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pjlink/README.md
title: ioBroker.pjlink
hash: TsZjfOSchW6qOZEFUBjL32Lsk8Bcio5TviwZM0/V064=
---
![Логотип](../../../en/adapterref/iobroker.pjlink/admin/pjlink.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.pjlink.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pjlink.svg)
![Количество установок](https://iobroker.live/badges/pjlink-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/pjlink-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.pjlink.png?downloads=true)

# IoBroker.pjlink
**Тесты:** ![Тестируйте и выпускайте](https://github.com/Bannsaenger/ioBroker.pjlink/workflows/Test%20and%20Release/badge.svg)

## Адаптер pjlink для ioBroker
Управление проектором PJLink

**!! На данный момент поддерживается только протокол класса 1**

## О PJLink
> PJLink — это унифицированный стандарт для эксплуатации и управления информационными проекторами.
PJLink обеспечивает централизованное управление проекторами, изготовленными различными поставщиками, и проекторами можно управлять с помощью контроллера.
Оборудованием, совместимым с PJLink, можно управлять и управлять им в любое время и в любом месте, независимо от производителя.
PJLink — это новый стандарт, разработанный для того, чтобы сделать коммуникационные интерфейсы и коммуникационные протоколы, отличающиеся от одного производителя проектора к другому, едиными и общими.

> Оборудование, совместимое с PJLink, отличается высокой степенью взаимосвязи между моделями и производителями, что позволяет легко создавать среды, смешанные с различными моделями и системами, и легко заменять уже установленные системы.

* [Взято с домашней страницы PJLink] (https://pjlink.jbmia.or.jp/english/)

## Кредиты
Протокол является торговой маркой: **Авторские права © Japan Business Machine and Information System Industries Association. Все права защищены** [Домашняя страница PJLink](https://pjlink.jbmia.or.jp/english/)

Эта работа основана на модуле nodejs с реализацией pjlink от **sy1vain**: [https://github.com/sy1vain/node-pjlink](https://github.com/sy1vain/node-pjlink)

## Сделать
* поддержка проекта node-pjlink для реализации класса 2
* запрос INST возвращает больше информации, поскольку вводятся только доступные входные данные. Дополнительная информация добавляется модулем node-pjlink. На данный момент он заносится в базу данных как строковый объект. Можно изменить на «папку» со всеми входами с их именами и т. д.
* включите класс 2 в этот адаптер iobroker

## Как работает адаптер
На данный момент поддерживается только класс 1. Это означает, что адаптер может только опрашивать статус.
Активная отправка информации о состоянии с устройства на адаптер может быть добавлена, как только будет поддерживаться класс 2.

#### Входы PJLink класса 1
* Входы должны быть установлены как двузначные числа. Первая цифра описывает тип входа

| Тип | Номер | возможные входы |
| ------- | ------ | --------------- |
| RGB | 1 | 1 - 9 |
| ВИДЕО | 2 | 1 - 9 |
| ЦИФРОВОЙ | 3 | 1 - 9 |
| ХРАНЕНИЕ | 4 | 1 - 9 |
| СЕТЬ | 5 | 1 - 9 |

Возможные входные данные можно найти в базе данных после запуска адаптера в разделе >pjlink.\<экземпляр\>.deviceInfo.availableInputs

### Выключатель
С состоянием (установленным на **true**)

>pjlink.\<экземпляр\>.power

проектор можно включать **и** выключать в зависимости от текущего состояния питания.

>pjlink.\<экземпляр\>.powerStatus

Переключатель питания автоматически вернется в положение **false**.

#### Состояние лампы
В базе данных предопределена только одна лампа. Если запрос лампы возвращает более одной лампы, остальные лампы будут добавлены динамически.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.0.3 (2022-10-19)
* (Bannsaenger) updated react dependency

### 0.0.2 (2022-10-19)
* (Bannsaenger) changed some info logs to debug. Fixed one power state issue.
* (Bannsaenger) redesign of timer and error handling

### 0.0.1 (2022-10-13)
* (Bannsaenger) initial release

## License
MIT License

Copyright (c) 2022 Bannsaenger <bannsaenger@gmx.de>

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