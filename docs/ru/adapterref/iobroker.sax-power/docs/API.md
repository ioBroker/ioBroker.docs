---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/docs/API.md
title: SAX Power Cloud API
hash: yFve5lLgf78ROSCg5ouh5VRTCfQKg0SvjnHK7v4+NNA=
---
# SAX Power Cloud API

## Объем

В этом документе описываются облачные вызовы, используемые адаптером. API не документирован здесь как общедоступный или стабильный сторонний контракт. Поведение конечной точки может изменяться без предварительного уведомления.

Адаптер использует API только для чтения данных.

## Базовый URL API по умолчанию

```text
https://webserver.sax-power.net
```

Базовый URL-адрес можно настроить в экземпляре адаптера.

## Аутентификация

### Запрос токена

```http
POST /api/auth/token/
```

Запрос аутентифицируется с использованием настроенного имени пользователя или адреса электронной почты SAX Power и пароля.

Возвращенный токен bearer хранится в памяти и не сохраняется в состояниях ioBroker и не записывается в журналы.

## Данные в реальном времени

```http
GET /api/auth/data/
```

Этот конечный пункт возвращает информацию об устройствах хранения, назначенных учетной записи, и их текущие значения.

Адаптер использует ответ для:

- обнаружение устройств
- информация об устройстве
- значения состояния батареи в реальном времени
- значения сетки в реальном времени
- дополнительные значения PV
- состояние заряда

Не каждая установка возвращает все возможные поля. Отсутствующие значения отображаются как недоступные, а не заменяются нулем.

## Историческая диаграмма энергопотребления

```http
GET /api/auth/energy_chart/
```

Адаптер запрашивает поддерживаемые периоды для выбранного серийного номера хранилища.

К числу проверенных форматов периодичности относятся:

```text
week_YYYY-MM-DD
month_YYYY-MM-DD
year_YYYY-MM-DD
total_YYYY-MM-DD
```

Сервис SAX Power может использовать другой формат параметров для данных ежедневных графиков. В версии 1.0 сегодняшние значения вычисляются на основе ответа за текущий месяц.

## Исторические поля

Наблюдаемые реакции на события из прошлого могут включать в себя:

- `m2`
- `m2N`
- `m4`
- `m5`
- `m5N`
- `total_m2`
- `total_m2N`
- `total_m4`
- `total_m5`
- `total_m5N`
- `de_time`
- `me_time`
- `year`

Парсер адаптера сопоставляет соответствующие значения энергии батареи со следующими параметрами:

- заряженная энергия
- разряженная энергия

Исходные имена полей облачной инфраструктуры намеренно не отображаются в качестве общедоступного контракта объекта ioBroker.

## Политика запросов

Версия 1.0 выполняет только следующие функции:

- запросы аутентификации
- чтение данных в реальном времени
- исторические данные графика энергопотребления

Оно не работает:

- `PUT`
- `PATCH`
- `DELETE`
- изменения конфигурации облака
- команды управления
- Модбус пишет

## Политика проведения опросов

Минимальный интервал опроса облака составляет 60 секунд.

Панель мониторинга в режиме реального времени обновляет состояния ioBroker независимо и не увеличивает частоту запросов к облаку SAX Power.

## Обработка ошибок

Адаптер рассматривает следующие неисправности как отдельные сбои:

- Ошибка DNS или сети
- HTTP-ошибка
- ошибка аутентификации
- недопустимая форма ответа
- отсутствуют данные устройства
- недоступное необязательное поле

Пароли и токены не включаются в диагностический вывод.