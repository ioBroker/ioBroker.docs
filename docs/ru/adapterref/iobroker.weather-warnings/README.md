---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.weather-warnings/README.md
title: ioBroker.weather-warnings
hash: kdUC0NdFxCviFkPyUpN+Ga8bx4lretJp0xQe+P0q2wU=
---
![Логотип](../../../en/adapterref/iobroker.weather-warnings/admin/weather-warnings.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.weather-warnings.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.weather-warnings.svg)
![Количество установок](https://iobroker.live/badges/weather-warnings-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/weather-warnings-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.weather-warnings.png?downloads=true)
![Пожертвование через PayPal](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)

# IoBroker.weather-warnings
[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/weather-warnings/287x66-grey.png)](https://weblate.iobroker.net/projects/adapters/weather-warnings/)

**Тесты:** [![Тестирование и выпуск](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml/badge.svg?event=push)](https://github.com/ticaki/ioBroker.weather-warnings/actions/workflows/test-and-release.yml)

## Адаптер предупреждений о погоде для ioBroker
[Немецкий Readme (мой участник)](https://github.com/ticaki/ioBroker.weather-warnings/blob/main/README_DE.md)

Этот адаптер получает доступ к предупреждениям о погоде от различных метеорологических служб и выводит их в виде текстовых или голосовых сообщений. Кроме того, он создает состояния, сгруппированные по типу, которые можно использовать для реагирования на текущие предупреждения.

Поставщик услуг:

- DWD
- ZAMG (Австрия)
- UWZ

Push-сервис

- Телеграм
- WhatsApp
- Легковерный
- Электронная почта
- Алекса
- Сайит

## Установка
Минимальная версия Nodejs: v22. После установки автоматически откроется страница конфигурации, которую необходимо будет **перезагрузить**. При этом шаблоны будут отображаться на выбранном языке.

## Конфигурация
![Базовая конфигурация](../../../en/adapterref/iobroker.weather-warnings/img/basic.png)

- **Активировать DWD/UWZ/ZAMG:** активировать получение данных от этих поставщиков услуг.
- **Активировать Telegram/Pushover,...:** активировать отправку сообщений на установленные адаптеры.
- **Активировать отправку электронных писем:** Отправляет все текущие предупреждения в электронном письме.
- **Активировать историю:** записывает историю, которая может содержать до 500 записей, в файл State: .history. Все данные или выбранные данные.
- **Активировать json-array:** это очень полезная функция, которая помещает текущие предупреждения в массив или — после активации — пользовательский JSON-файл в массив, который может использоваться скриптами.

- **Интервал обновления:** интервал получения данных в минутах (минимум: 5)

- **Входящие предупреждения...:** После запуска адаптера предупреждения о первом получении данных будут рассматриваться как известные и не вызовут уведомления.

- **Эксперт**: Активирует дополнительные необязательные настройки

- **Тестирование - Активация...:** Используйте тестовые данные. Адаптер отключен.

- **Тестирование - История исходных данных:** Только для отладки, по запросу.

![Шаблон](../../../en/adapterref/iobroker.weather-warnings/img/template.png)

Здесь вы можете создавать собственные сообщения или редактировать существующие. Все доступные «токены» и их значения отображаются ниже таблицы. Уникальный идентификатор используется службами push-уведомлений для определения того, какой шаблон использовать для какого типа уведомлений.

Сохраняйте и закрывайте приложение после добавления или удаления шаблонов.

Знаки, имеющие особое значение:

— `${}` содержит токены, которые заменяются сгенерированной информацией. Идентификатор шаблона также можно использовать здесь.
— Идентификаторы шаблонов, начинающиеся с `_`, не предоставляются сервисами.
- `${[0,1,2,3,4]token}` Строка со значениями, token должен быть числовым токеном. Индекс совпадает с индексом в примере. 0 — первое значение в списке.
— `${(value=token)result1#result2}` или `${(value=token)result1}` эквивалентно команде JavaScript: `if (value == token) result1 else result2`. Возможные сравнения: `= < > != `
- Для шаблона JSON закрывающая скобка `}` должна быть написана следующим образом: `\}`
- см. примеры в адаптере
— В качестве альтернативы также возможен вариант: `${[0,🟢,🟡,🟠,🔴]warnlevelnumber}`

**Восстановить шаблоны:** Сбрасывает шаблоны до текущего системного языка. Существующие шаблоны будут **потеряны**. После этого сохраните и закройте. Рекомендуется использовать после изменения системного языка.

![ДВД](../../../en/adapterref/iobroker.weather-warnings/img/DWD.png)

**DWD:** Выберите из списка из 10000 мест, после ввода перейдите на другую вкладку, а затем вернитесь назад. Список слишком большой и его необходимо обновить.

**UWZ:** Введите идентификатор страны DE AT (возможны и другие варианты, требуется проверка) и почтовый индекс, например, DE12345.

**ZAMG:** Только для Австрии. Ввод координат в пределах Австрии.

**Название места:** пользовательское название места, может использоваться в предупреждениях (полезно при наличии нескольких ячеек с предупреждениями).

**Фильтр:**

- Фильтрация необработанных данных: Перед каждой последующей обработкой отфильтровывает все данные за период с X часов включительно.
- Тип: отбрасывает все предметы с этим типом.
- Уровень: все, что ниже этого уровня, будет отброшено.

![телеграмма](../../../en/adapterref/iobroker.weather-warnings/img/telegram.png) **Адаптер:** Если эта опция активирована и есть поле для адаптера, необходимо выбрать допустимый вариант. Сообщение об ошибке в журнале указывает на отсутствие настроек.

**Активировать...:** Отправлять предупреждения от этого поставщика с помощью данной услуги.

**Фильтр:** 1) Игнорировать предупреждения этого типа 2) Игнорировать предупреждения с равным или более низким уровнем

**Сообщения:** Используйте следующие шаблоны для: Столбец 1: 1) Новые предупреждения или существующие предупреждения 2) Предупреждение было удалено, и есть **другие** активные предупреждения.

3) Предупреждения были удалены, и **других** активных предупреждений нет.

Столбец 2: 1) Уведомления, запускаемые вручную 2) Использовать для отсутствия предупреждения 1.3

Шаблоны для пункта 3) не могут содержать токены `${}`.

**Особенности**

**Электронная почта:** Заголовок размещается перед самим письмом, за ним следует 1, 2 или 3 символа + перенос строки, а затем нижний колонтитул. Письмо отправляется в формате HTML, поэтому вы можете добавить любой HTML-тег по своему усмотрению. (Дополнительные функции находятся в разработке, пока не готовы)

**Алекса:** Кроме того, необходимо выбрать одно или несколько устройств. Громкость изменяется только для голосовых сообщений и впоследствии должна быть сброшена до значений по умолчанию. Размер сообщения для каждого предупреждения ограничен 250 символами. Звуковые сигналы возможны, активируйте режим «Эксперт», чтобы отобразить параметры.

**Заголовок, заголовок, нижний колонтитул** — здесь работает только ${status}. Другие токены содержат случайные значения или не имеют значения.

## Общее поведение
— Не следует отправлять дублирующие сообщения для одной и той же цели. DWD очень щепетильно относится к этому вопросу.
- Если в качестве шаблона выбрано «none», уведомления по этому шаблону не отправляются.
- Состояния в файле .alerts содержат массивы для начала, конца, типа предупреждения, текущего состояния и заголовка, сгруппированные по типу предупреждения. Отображается одно предупреждение из каждой группы, отфильтрованное по следующим критериям:

1) Предупреждение **теперь** активно (предупреждение с наивысшим уровнем).

## Иконки
Значок DWD: авторские права принадлежат Deutscher Wetterdienst ZAMG. Значок: авторские права принадлежат Deutscher Wetterdienst ZAMG.

другие:

Автор: [Адри Ансях](https://www.youtube.com/channel/UChLOv1L-ftAFc2ZizdEAKgw?view_as=subscriber)

Изменения: В оригинале они синие, остальные цвета — это изменения по сравнению с оригиналом.

Лицензия: [CC BY 4.0 ПРАВОВОЙ КОДЕКС](https://creativecommons.org/licenses/by/4.0/legalcode)

Страница с иконкой: https://icon-icons.com/de/symbol/Wetter-wind-cloud-Blitz-Regen/189105

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.11.2 (2026-06-18)
- (ticaki) **FIXED**: DWD spoken/written color names (`warnlevelcolorname`) now come from an exact lookup of the official DWD CAP color palette instead of a hue heuristic; light heat violet is now distinguished from dark heat violet, and the extreme-storm, UV and preliminary-information colors are named correctly (adds the color names light violet, dark red, magenta and pink) (#220)

### 0.11.1 (2026-06-18)
- (ticaki) **FIXED**: spoken/written color name for DWD heat warnings (`warnlevelcolorname`) is now correct: the light violet DWD heat color (`#cc99ff`) was misclassified as "green" and is now named "violet", matching email/vis (#220)

### 0.11.0 (2026-06-02)
- (copilot) **BREAKING**: Adapter requires node.js >= 22 now
- (ticaki) **NEW**: added DWD warning type 86 "extreme black ice" (extremes Glatteis) (#251)
- (ticaki) **NEW**: added global aggregate states `provider.hasActiveWarning` (boolean), `provider.maxLevel` (number) and `provider.maxLevelText` (text)
- (ticaki) **FIXED**: alexa2 notification no longer crashes when a warning type has no assigned sound
- (ticaki) **FIXED**: per-provider deactivation of datapoint categories (warning/alerts/formatedKeys) is applied again on restart
- (ticaki) **FIXED**: addressed ioBroker repository checker findings (node >= 22, `source-map-support` moved to runtime dependencies, admin jsonConfig schema issues, missing translations) (#300, #112)
- (ticaki) **FIXED**: DWD color name (`warnlevelcolorname`, e.g. spoken by Alexa) now matches the actual DWD warning color shown in email/vis instead of being derived from severity (#220)

### 0.10.1 (2026-04-20)
- (ticaki) **FIXED**: Network errors (e.g. internet down, DNS failure, HTTP errors) now show a clear, readable message instead of `[object Object]` or a useless stack trace

### 0.10.0 (2025-11-13)
- (ticaki) update deps
- (ticaki) fix a problem with "remove" key
- (ticaki) support added for nspanel-lovelace-ui (>= v0.8.0)