---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.bydhvs/README.md
title: без заголовка
hash: rdIh77tbZwWxtyNaiQ+u+VWM8qKa82gxi9pQbGIM1S8=
---
![Логотип](../../../en/adapterref/iobroker.bydhvs/admin/bydhvs.png)

## Адаптер bydhvs для ioBroker
Данные опроса батареи BYD HVS

## Введение
Этот адаптер получает данные от фотоэлектрической батареи byd (https://www.bydbatterybox.com/) и помещает их в точки данных адаптера. К сожалению, официального API и документации нет, поэтому я использовал Wireshark и симулятор byd-hvs, чтобы попытаться понять связь. Мой адаптер имитирует byd-приложение, отправляет на устройство аналогичные пакеты и анализирует ответы.

## Будь осторожен
Приложение beConnect состоит из двух шагов: на первом этапе вы получаете обычные данные, на втором этапе вы получаете подробные данные для всех ячеек (температура и напряжение отдельных ячеек, а также некоторые другие подробности). Чтобы получить подробные данные, есть это будет задержка после одного из пакетов данных, пока я не смогу получить результат. Я думаю, что тем временем все клетки будут измерены, но я не уверен. Я определенно не уверен, что вы навредите своей батарее, слишком часто опрашивая эти данные, поэтому имейте в виду: вы действуете на свой страх и риск!

## Поддержка до 5 модулей
Теперь поддерживается до 5 модулей HVS.

## Настройки
Интервал: Это просто: как часто должны опрашиваться данные. IP-адрес: Это самоочевидно. Либо вы используете стандартный адрес (192.168.16.254) и меняете маршрутизацию дома, например: https://www.photovoltaikforum.com/thread/150898-byd-hvs-firmware-update/?postID=2215343#post2215343. Преимущество в том, что приложение beConnect тоже работает. Другая возможность: вы меняете IP-адрес ящика. Но: будьте осторожны: текст на веб-странице сбивает с толку, и если вы не совсем уверены в том, что делаете: ПОЖАЛУЙСТА, не трогайте настройки. На немецких форумах я читал от людей, которые заблокировались в своей системе и пути назад нет: либо byd отправляет вам замену HVU, либо вам придется покупать новый.
Сведения о батарее: Как объяснено выше: вам нужны сведения о батарее? Если да: установите checkobx.
Сведения о батарее — каждые ... циклы: Также, как указано выше, должно быть ясно. Тестовый режим — показывать данные в журнале ошибок: Если вы установите этот флажок: отправленные и полученные данные отображаются в журнале ошибок, поэтому вы можете легко загрузить их. данные и отправьте их мне в случае ошибок.
Копировать и вставить не получается - данные в конце обрезаются. Вам придется скачать его, прежде чем отправить мне.

[Ссылка на ознакомительные сведения о родном немецком языке:](README-German.md)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.5.0 (2023-11-04)
* Breaking change: nodejs 16 minimum required  
* automated checks and release-script repaired (thanks to mcm1957, he did the work)
* nothing else changed in code

### 1.4.2 (2023-09-28)
* Typo in version number removed

### 1.4.1 (2023-09-24)
* Compatibility with js.controller 5x
* Removed some bugs in detecting inverter
* Inverternumber ist logged, so I can easily add new inverters if neccerary, just send me the silly-log if inverter is unknown.

### 1.4.0 (2022-10-31)
* Update of referred modules (mainly around testing)
* improvmenets contributed by Tapter (5 modules, readme and better readable code)
* Better detection of battery type and inverter
* SOC not only from normal data but from diagnosis-data, too. There we have one decimal place more
* removed frequency limit for battery detail data
* increased max count of temperature measurements for HVS to 64
* support for up to 5 HVS modules

### 1.3.0 (2021-11-06)
* updated even more dependencies
* official release with new state SOH

###

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