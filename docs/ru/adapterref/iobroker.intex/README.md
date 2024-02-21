---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.intex/README.md
title: ioBroker.intex
hash: LzjlC+djKM5jR/Tz9XJnk3QJ1oO7kdofxCoROZ7nris=
---
![Логотип](../../../en/adapterref/iobroker.intex/admin/intex.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.intex.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.intex.svg)
![Количество установок](https://iobroker.live/badges/intex-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/intex-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.intex.png?downloads=true)

# IoBroker.intex
**Тесты:** ![Тестирование и выпуск](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

## Адаптер intex для ioBroker
Адаптер для Intex Whirlpool с модулем Wi-Fi

## Стратегия взаимодействия с пулом и облаком
### Об облаках
#### Облако вторичное; Локальный пул, если доступен
В этом режиме система пытается подать команду управления и команду обновления локально. При возникновении ошибки в локальной связи система переключается на работу в облаке до повторного запуска адаптера.

IP-адрес и порт берутся из облака. Если IP-адрес тот же, пул необходимо заново зарегистрировать в приложении. Нажмите и удерживайте кнопку подключения и выполните поиск в пуле. Удаление его из приложения обычно не требуется.

#### Облако вторичное; Бассейн только местный
В этом режиме система выдает команду управления и команду обновления локально. При возникновении ошибки в локальной связи система не переключается на работу в облаке.

Здесь можно установить интервал 0,5 минуты.

IP-адрес и порт берутся из облака. Если IP-адрес тот же, пул необходимо заново зарегистрировать в приложении. Нажмите и удерживайте кнопку подключения и выполните поиск в пуле. Удаление его из приложения обычно не требуется.

#### Только облако
В этом режиме система отправляет только команду управления и команду обновления через облако.

##### Авторизоваться
Введите почту и пароль приложения Intex.

### Местный
#### Только локально
В локальном режиме в настоящее время также предлагаются функции, которые пул не поддерживает. В поле «Адрес» необходимо указать либо DNS-имя пула на маршрутизаторе, либо IP-адрес пула.

Здесь также можно установить интервал 0,5 минуты.

IP-адрес пула можно найти с помощью кнопки поиска. Однако маршрутизаторы могут предотвратить это, если, например. Б. Устройствам WLAN не разрешено взаимодействовать друг с другом, либо порты или встроенная трансляция заблокированы в локальном брандмауэре компьютера.

## Управление функциями спа
Для параметра «intex.0.-id-.control.-command-», установленного в значение true или false, контролируется состояние команды пула.

# Обсуждение и вопросы на немецком языке
https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x

## **РАБОТА В ПРОЦЕССЕ**
- (PLCHome) Настройте этот адаптер для использования сценария выпуска.

## 0.1.5
* (PLCHome) исправлена орфографическая ошибка sanitzer на sanitizer в статусах control.sanitizer и control.sanitizerTime.

## 0.1.4
* (PLCHome) Изменение объектов, доступных только для чтения, например. температура, больше не вызывает сбой.

## 0.1.3
* (PLCHome) Оставшееся время работы фильтра корректируется на время дезинфекции, если оно больше.

## 0.1.2
* (PLCHome) Исправлено оставшееся время фильтра при нагреве от 1 до -1 на бесконечность.

## 0.1.1
* (PLCHome) Оставшееся время для добавления фильтра и дезинфицирующего средства под контролем.
* (PLCHome) Обновление добавлено в раздел «Контроль».
* (PLCHome) Пульт удален, потому что Control может сделать это лучше.

## 0.1.0
* (rbartl/PLCHome) Поддержка локального IP. Как через облако, так и только локально без облака. Спасибо Австрии Роберту Бартлу.
* (PLCHome) Подтвердите непосредственно после переключения через Control.

## 0.0.7
* (PLCHome) Переключение через пульт снова работает.
* (PLCHome) После переключения через Control предыдущий статус трафика можно передать из облака. Это может привести к переключению статуса.

## 0.0.6
* (PLCHome) Определенная настройка состояний
* (PLCHome) Изменение Фаренгейта по Цельсию
* (PLCHome) «control.temperature», только чтение, объект из 0.0.5 необходимо удалить один раз.

## 0.0.5
* (PLCHome) Добавлена установка температуры, объект необходимо удалить один раз.
* (PLCHome) Расшифровка информации о состоянии

## 0.0.1
* (TA2k) первоначальный выпуск

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

## License

MIT License

Copyright (c) 2021 - 2024 TA2k <tombox2020@gmail.com>

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