---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bydhvs/README.md
title: без заголовка
hash: XDgN8jFQAHHQEHMq7lcxT7JcSKDWP9ssqrlWB+z8oTc=
---
![Логотип](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## Адаптер bydhvs для ioBroker
Данные опроса батареи BYD HVS

## Введение
Этот адаптер получает данные от фотоэлектрической батареи byd (https://www.bydbatterybox.com/) и помещает их в точки данных адаптера. К сожалению, официального API и документации нет, поэтому я использовал Wireshark и симулятор byd-hvs, чтобы попытаться понять связь. Мой адаптер имитирует byd-приложение, отправляет на устройство аналогичные пакеты и анализирует ответы.

## Будь осторожен
Приложение beConnect состоит из двух шагов: на первом этапе вы получаете обычные данные, на втором этапе вы получаете подробные данные для всех ячеек (температура и напряжение отдельных ячеек, а также некоторые дополнительные сведения). Чтобы получить подробные данные, есть это будет задержка после одного из пакетов данных, пока я не смогу получить результат. Я думаю, что тем временем все клетки будут измерены, но я не уверен. Я определенно не уверен, что вы навредите своей батарее, слишком часто опрашивая эти данные, поэтому имейте в виду: вы действуете на свой страх и риск!

## Поддержка до 5 модулей
Теперь поддерживается до 5 модулей HVS.

## Настройки
Интервал: Это просто: как часто должны опрашиваться данные. IP-адрес: Это самоочевидно. Либо вы используете стандартный адрес (192.168.16.254) и меняете маршрутизацию дома, например: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343. Преимущество в том, что приложение beConnect тоже работает. Другая возможность: вы меняете IP-адрес ящика. Но: будьте осторожны: текст на веб-странице сбивает с толку, и если вы не совсем уверены в том, что делаете: ПОЖАЛУЙСТА, не трогайте настройки. На немецких форумах я читал от людей, которые заблокировались в своей системе и пути назад нет: либо byd отправляет вам замену HVU, либо вам придется покупать новый.
Сведения о батарее: Как объяснено выше: вам нужны сведения о батарее? Если да: установите checkobx.
Сведения о батарее — каждые ... циклы: Также, как указано выше, должно быть ясно. Тестовый режим — показывать данные в журнале ошибок: Если вы установите этот флажок: отправленные и полученные данные отображаются в журнале ошибок, поэтому вы можете легко загрузить их. данные и отправьте их мне в случае ошибок.
Копировать и вставить не получается - данные в конце обрезаются. Вам придется скачать его, прежде чем отправить мне.

[Ссылка на ознакомительные сведения о родном немецком языке:](README-German.md)

## **РАБОТА В ПРОЦЕССЕ**
* первая версия с двумя башнями в НПМ

### 1.5.1 (15 января 2024 г.)
* Включите возможность получать информацию из двух башен.
* СРОЧНОЕ ИЗМЕНЕНИЕ Структуры.

### 1.5.0 (04.11.2023)
* Критическое изменение: требуется минимум nodejs 16.
* поправлены автоматические проверки и релиз-скрипт (спасибо mcm1957, он сделал всю работу)
* больше ничего в коде не изменилось

### 1.4.2 (28 сентября 2023 г.)
* Удалена опечатка в номере версии.

### 1.4.1 (24 сентября 2023 г.)
* Совместимость с js.controller 5x.
* Устранены некоторые ошибки при обнаружении инвертора.
* Номер инвертора зарегистрирован, поэтому я могу легко добавить новые инверторы, если это необходимо. Просто пришлите мне глупый журнал, если инвертор неизвестен.

### 1.4.0 (31 октября 2022 г.)
* Обновление упомянутых модулей (в основном, связанных с тестированием)
* улучшения, предоставленные Tapter (5 модулей, файл readme и более читаемый код)
* Лучшее определение типа батареи и инвертора
* SOC не только на основе нормальных данных, но и на основе диагностических данных. Там у нас на один десятичный знак больше
* удалено ограничение частоты для подробных данных о батарее
* увеличено максимальное количество измерений температуры для HVS до 64
* поддержка до 5 модулей HVS

### 1.3.0 (06.11.2021)
* обновлено еще больше зависимостей
* официальный релиз с новым состоянием SOH

###

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## License
MIT License

Copyright (c) 2023 Christian <github@familie-herrmann.de>

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
