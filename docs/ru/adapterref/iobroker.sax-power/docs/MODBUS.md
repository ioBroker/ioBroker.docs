---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.sax-power/docs/MODBUS.md
title: План интеграции Modbus
hash: 1Efyi5HE9/fHvJmGkjLFebhAuL+mfJz3nScdYllMtwE=
---
# План интеграции Modbus

## Статус версии 1.0

В версии 1.0 управление по протоколу Modbus намеренно недоступно.

Версия 1.0 предоставляет:

- Облачное подключение SAX Power
- обнаружение устройств
- измерения в реальном времени
- историческая статистика
- агрегированные значения в реальном времени

Оно не обеспечивает возможности записи, управления зарядкой или разрядкой.

## Запланированный проект

В более поздней версии может быть предусмотрена возможность переадресации команд управления в состояния, доступные для записи, установленного адаптера ioBroker Modbus.

Конструкция должна оставаться независимой от фиксированного номера экземпляра Modbus. Пользователи будут выбирать необходимый экземпляр Modbus, и адаптер будет обнаруживать доступные для записи числовые состояния, расположенные ниже этого экземпляра.

## Известная информация о регистре питания SAX

На основе документации SAX Power, изученной в процессе разработки:

- Регистр 44 используется для ограничения мощности зарядки.
- Регистр 43 предназначен для ограничения мощности разряда.

Регистр 43 может отсутствовать в каждой существующей конфигурации ioBroker Modbus.

Адаптер не должен предполагать, что экземпляр Modbus находится в состоянии`modbus.1` .

## Требования безопасности

Перед выпуском системы управления Modbus реализация должна включать в себя:

- явное согласие
- проверка записываемых целевых состояний
- Проверка диапазона значений
- чистые единицы
- безопасное поведение при запуске
- После установки автоматическая запись невозможна.
- проверки зависимостей и доступности
- восстановление после ошибок
- Ведение журналов, удобное для аудита, без защиты конфиденциальных данных.
- проверка на наличие отсутствующих или устаревших состояний

## Интеллектуальная зарядка

Более поздняя функция управления может включать в себя определяемую пользователем логику зарядки. Эта функция отделена от базовой пересылки Modbus и должна учитывать такие зависимости, как:

- доступность фотоэлектрических систем
- потребление дома
- направление сетки
- уровень заряда батареи
- настроенные ограничения
- устаревшие измерения
- сбой связи
- несколько устройств хранения
- ручное управление
- резервное поведение

В версии 1.0 отсутствует алгоритм управления.