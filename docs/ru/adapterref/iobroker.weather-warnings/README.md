---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weather-warnings/README.md
title: ioBroker.weather-предупреждения
hash: yJIs/0h53Ul0pFadLx7sOtFyx92lZmKyFLbAaT12Vhs=
---
![Логотип](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![Количество установок](https://iobroker.live/badges/weather-warnings-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/weather-warnings-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.weather-warnings
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/287x66-grey.png)](https://weblate.iobroker.net/projects/adapters/weather-warnings/)

**Тесты:** [![Тестирование и выпуск] (https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml)

## Адаптер предупреждений о погоде для ioBroker
[Немецкий Readme (мейст актюллер)](https://github.com/ticaki/ioBroker.weather-warnings/blob/main/README_DE.md)

Этот адаптер получает доступ к погодным предупреждениям различных погодных служб и выводит их в виде текстовых или голосовых сообщений. Кроме того, он создает состояния, сгруппированные по типу, которые можно использовать для реагирования на текущие предупреждения.

Провайдер:

- ДВД
- ЗАМГ (Австрия)
- УВЗ

Push-сервис

- Телеграмма
- Ватсап
- Пушовер
- Электронная почта
- Алекса
- Скажи это

## Монтаж
Мин. Nodejs: v18 После установки автоматически откроется сайт конфигурации, и его необходимо будет **перезагрузить**. При этом будут показаны шаблоны на установленном языке.

## Конфигурация
![Базовая конфигурация](../../../en/adapterref/iobroker.weather-warnings/img/basic.png)

- **Активировать DWD/UWZ/ZAMG:** активируйте получение данных этих поставщиков услуг.
- **Активировать Telegram/Pushover,...:** активировать вывод сообщений на эти установленные адаптеры.
- **Активировать электронную почту:** записывает все текущие предупреждения в электронное письмо.
- **Активировать историю:** записывает историю, которая может содержать до 500 записей, в состояние: .history. Все данные или выбранные данные.
- **Активировать json-array:** особенный вариант: текущие предупреждения помещаются в массив или — после активации — пользовательский Json в массив, который может использоваться сценариями.

- **Интервал обновления:** интервал получения данных в минутах (минимум: 5).

- **Входящие предупреждения...:** После запуска адаптера предупреждения при первом получении данных будут считаться известными и не будут вызывать уведомления.

- **Эксперт**: активирует дополнительные дополнительные настройки.

- **Тестирование- Активировать...:** Использовать тестовые данные. Адаптер не в сети.

- **Тестирование. История необработанных данных:** Для отладки только по запросу.

![Шаблон](../../../en/adapterref/iobroker.weather-warnings/img/template.png)

Здесь вы можете создавать собственные сообщения или редактировать существующие. Все доступные «токены» и их значения отображаются под таблицей. Уникальный идентификатор используется службами push-уведомлений, чтобы определить, какой шаблон использовать для какого типа уведомления.

Сохраните и закройте после добавления или удаления шаблонов.

Знаки с особым значением:

- `${}` содержит токены, которые заменяются сгенерированной информацией. Идентификатор шаблона также можно использовать здесь.
- Идентификатор шаблона, начинающийся с `_`, не предоставляется службами.
- `${[0,1,2,3,4]token}` Строка со значениями, token должен быть числовым токеном. Индекс тот же, что показан в примере. 0 — первое значение в списке.
- `${(value=token)result1#result2}` или `${(value=token)result1}` аналогичны команде javascript: `if (value == token) result1 else result2` возможные сравнения: ` = < > != `
- для шаблона Jsons закрывающая скобка `}` должна быть записана таким образом `\}`
- см. примеры в адаптере
- альтернативно также возможно: `${[0,🟢,🟡,🟠,🔴]warnlevelnumber}`

**Восстановить шаблоны.** Возвращает шаблоны к текущему языку системы. Существующие шаблоны будут **потеряны**. После этого сохраните и закройте. Следует использовать после изменения языка системы.

![ДВД](../../../en/adapterref/iobroker.weather-warnings/img/DWD.png)

**DWD:** Выбор из списка из 10 000 мест. После ввода нажмите на другую вкладку и вернитесь, список слишком велик и его необходимо обновить.

**UWZ:** Ввод с использованием идентификатора страны DE AT (возможны другие, необходимо проверить) и почтового индекса, например DE12345.

**ZAMG:** Только для Австрии. Ввод координат внутри Австрии.

**Название места:** название места, определяемое пользователем, может использоваться в предупреждениях (полезно при наличии нескольких ячеек с предупреждением).

**Фильтр:**

- Фильтровать необработанные данные: фильтрует все, что происходит в течение X часов в будущем, перед каждой последующей обработкой.
- Тип: отбрасывает все объекты этого типа.
- Уровень: все, что ниже этого уровня, будет отброшено.

![телеграмма](../../../en/adapterref/iobroker.weather-warnings/img/telegram.png) **Адаптер:** Если эта опция активирована и имеется поле адаптера, необходимо выбрать допустимую опцию. Сообщение об ошибке в журнале указывает на отсутствие настроек.

**Активировать ...:** Отправлять предупреждения от этого провайдера с помощью этой службы.

**Фильтр:** 1) Игнорировать предупреждения этого типа 2) Игнорировать предупреждения с равным или меньшим уровнем

**Сообщения:** используйте следующие шаблоны для: Столбец 1: 1) Новые или существующие предупреждения. 2) Предупреждение было удалено, но есть **другие** активные предупреждения.
3) Предупреждения удалены, других активных предупреждений **нет**.

Столбец 2: 1) Уведомления, запускаемые вручную 2) Использовать без предупреждения 1.3

Шаблоны для 3) не могут содержать токены `${}`.

**Особые возможности**

**email:** Заголовок помещается перед письмом, за ним следует 1,2 или 3 + разрыв строки, а затем нижний колонтитул. Электронное письмо отправляется в формате HTML, поэтому вы можете добавить любой тег HTML по своему усмотрению. (над дополнительными функциями работают, еще не готовы)

**alexa:** Кроме того, необходимо выбрать одно или несколько устройств. Громкость изменяется только для голосовых сообщений, после чего ее следует сбросить на значение по умолчанию. Размер сообщения для каждого предупреждения ограничен 250 символами. Звуки возможны, активируйте «Эксперт», чтобы отобразить параметры.

**title, header, footer** здесь работает только ${status}. Другие токены содержат случайные значения или не содержат значений.

## Общее поведение
- Не следует отправлять повторяющиеся сообщения по одному и тому же поводу. DWD очень внимательно относится к этому.
- Если в качестве шаблона выбрано «Нет», для него не отправляются уведомления.
— Состояния в .alerts содержат массивы для начала, окончания, типа предупреждения, текущего активного и заголовка, сгруппированные по типу предупреждения. Отображается одно предупреждение на группу, отфильтрованное по следующим критериям:

  1) Предупреждение **сейчас** активно (тот, у которого самый высокий уровень).

## Иконки
Значок DWD: Авторские права принадлежат Deutscher Wetterdienst ZAMG. Значок: Авторские права принадлежат Deutscher Wetterdienst ZAMG.

другие:

Создатель: [Адри Ансия](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)

Изменения: В оригинале они синие, остальные цвета - это изменения оригинала.

Лицензия: [ПРАВОВОЙ КОДЕКС CC BY 4.0](https://creativecommons.org/licenses/by/4.0/legalcode)

Страница значков: https://icon-icons.com/de/symbol/Wetter-wind-cloud-Blitz-Regen/189105

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (ticaki) add cleartimeout, add axios timeout

### 0.6.2 (2023-11-20)
* (ticaki) Reduce zamg spam

### 0.6.1 (2023-11-19)
* (ticaki) Optimise: DWD City names, adminconfiguration, translations

### 0.6.0 (2023-11-16)
* (ticaki) Added: global alerts.
* (ticaki) Changed: Token ...adverb - if no adverb, then day of the week.

### 0.5.6 (2023-11-15)
* (ticaki) Added: Select template for manual notification without warnings.
* (ticaki) Added: Configuration dialogue marks invalid template keys for most notification services.

### 0.5.5 (2023-11-14)
* (ticaki) Added: Missing space in emailMessage template.
* (ticaki) Fixed: wrong status for all removed.
* (ticaki) Admin: moving test options to tab general.

### 0.5.4 (2023-11-10)
* (ticaki) Fixed: Fixed randomly occurring errors in the first approx. 15 seconds.
* (ticaki) Added: max number of warnings (default 5)
* (ticaki) Fixed: not crash with the wrong uwz configuration.
* (ticaki) Fixed: small error in quiet times.

### 0.5.3 (2023-11-09)
* (ticaki) Fixed: command states (text / automode)
* (ticaki) Added: .alerts. List of warning types.
* (ticaki) Changed: .alerts. view current event with highest level or next event

### 0.5.2 (2023-11-06)
* (ticaki) Multiple Say-It instances.
* (ticaki) Some icons added.
* (ticaki) -no warning- Warning level for uwz corrected.

### 0.5.1 (2023-11-05)
* (ticaki) Fixed: Foreign languages did not work for UWZ.
* (ticaki) Fixed: clearHistory command didnt work on gloabl level.
* (ticaki) Fixed: uwz colours assigned to the correct level.

### 0.5.0 (2023-11-04)
* (ticaki) breaking changes: New UWZ configuration. reconfigure
* (ticaki) breaking changes: Rename and move manual push command states.
* (ticaki) Quiet times changed, reconfigure. 
* (ticaki) better DWD configuration.
* (ticaki) alot improvements.

### 0.4.8 (2023-10-30)
* (ticaki) Wrong level assignment for zamg fixed
* (ticaki) better set defaults

### 0.4.7 (2023-10-29)
* (ticaki) improved admin ui
* (ticaki) improved formatedKeys for vis

### 0.4.6 (2023-10-28)
* (ticaki) fix startup crash

### 0.4.5 (2023-10-28)
* (ticaki) Quiet times with profile & control states
* (ticaki) Fixed: Jumping of the data tree
* (ticaki) Bugfixing

### 0.4.4 (2023-10-25)
* (ticaki) Added Say-It
* (ticaki) User-definable icons (path)
* (ticaki) Email works, Added title for pushover and email

### 0.4.2 (2023-10-24)
* (ticaki) optimise german 22. & 28. for alexa.
* (ticaki) Quiet times for voice notifications.
* (ticaki) bugfix: now the English translation is loaded. Alexa uses the correct day of the week with DWD heading.

### 0.4.1 (2023-10-22)
* (ticaki) update german translation for alexa

### 0.4.0 (2023-10-22)
* (ticaki) Welcome to latest.
* (ticaki) zamg date convert for alexa

### 0.3.7 (2023-10-21)
* (ticaki) Alexa Sounds for warntypes
* (ticaki) more options for pushover, telegram, alexa, email html
* (ticaki) Usable urls for icons
* (ticaki) fixed error in type filter

### 0.3.6 (2023-10-20)
* (ticaki) added: icons

### 0.3.5 (2023-10-16)
* (ticaki) added: Data points for manually triggering notifications.

### 0.3.4 (2023-10-14)
* (ticaki) add translation to common.name

### 0.3.3 (2023-10-13)
* (ticaki) fixed: repeat message dwd
* (ticaki) small bugfixes

### 0.3.2 (2023-10-10)
* add alexa volumen

### 0.3.1 (2023-10-10)
* (ticaki) added alexa

### 0.3.0 (2023-10-03)
* (ticaki) added multiple warncell
* added option to remove channels
* fixed alot bugs

### 0.2.6-alpha.0 (2023-10-02)
* (ticaki) added email, json, history
* add more template key
* add mulitple dwd warncells
* fixed alot bugs

### 0.2.5-alpha.0 (2023-09-30)
* (ticaki) added telegram, whatsapp, pushover
* added remove all
* added json/array output for all current warnings.

### 0.2.4-alpha.0 (2023-09-29)
* (ticaki) add alerts

### 0.2.3-alpha.0 (2023-09-28)
* (ticaki) more translations
* filter warn type, generic warntypes
* more prebuild tests

### 0.2.2-alpha1.0 (2023-09-26)
* (ticaki) more CustomTokens,
* translations for warntypes, warnlevelcolor,
* total active warningcountshttps://github.com/ticaki/ioBroker.weather-warnings
* remove old warnings

### 0.2.1-alpha.0 (2023-09-25)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2023 ticaki <github@renopoint.de>

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
