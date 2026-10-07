---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md
title: ADR 0017: Admin 8 GUI API Generation 2
hash: 4GrJXMctDmDT0YqdS3tHwrtoGADtbJQ0E1WthBaK0cU=
---
# ADR 0017: Admin 8 GUI API Generation 2

- Статус: принято
- Дата: 03.09.2026

## Контекст

Динамические элементы управления Apple TV, HomePod, AirPlay Receiver и, исторически, языковыми настройками изначально были разработаны для Admin 7 с API графического интерфейса первого поколения. Локальный тестовый хост на Linux aarch64 теперь предоставляет Admin 8 и API графического интерфейса второго поколения. Admin 8 намеренно отказывается запускать компоненты первого поколения, поскольку его общие библиотеки компонентов React, MUI и ioBroker не являются бинарно совместимыми со старой сборкой.

В результате для каждого пользовательского компонента отображалось видимое предупреждение загрузчика, в то время как стандартные поля конфигурации JSON продолжали отображаться. Добавление только `guiApi: 2` Это приведет к ошибочному объявлению несовместимого пакета и, следовательно, не является допустимым исправлением.

## Решение

Перенесите весь набор пользовательских компонентов административной панели на API второго поколения с использованием официального API. `ioBroker.admin-component-template` В качестве эталонной сборки использована версия 3.0.5. В сборке второго поколения используются точно такие же проверенные версии для разработчиков. `@iobroker/gui-components` 10.0.5, `@iobroker/json-config` 9.0.8, React 19.2.8, MUI 9.2.0, Vite 8.1.5 и соответствующие пакеты Module Federation, указанные в `THIRD_PARTY_NOTICES.md`.

Каждый изготовленный на заказ предмет в `admin/jsonConfig.json` заявляет `guiApi: 2` Импорт исходного кода `I18n` и конфигурация совместного использования модулей в рамках федерации модулей. `@iobroker/gui-components`; асинхронные методы жизненного цикла второго поколения ожидают своей базовой реализации. Устаревшие `bundlerType` декларация и поколение 1 `@iobroker/adapter-react-v5` Зависимости удалены.

Для работы адаптера требуется ioBroker Admin. `>=8.0.0` Admin 7 больше не является поддерживаемой целевой платформой для установки. Об этой несовместимости необходимо сообщить. `BREAKING` В следующем минорном релизе, предшествующем версии 1.0, текущая версия для разработчиков не изменяется, за исключением явно авторизованных релизов.

## Последствия

Пользовательские элементы управления устройствами используют ту же генерацию React 19/MUI 9, что и Admin 8, и могут проходить проверку через его контроллер загрузчика компонентов. В ADR 0016 был заменен и удален селектор языка, специфичный для адаптера, поэтому пользовательский интерфейс Admin соответствует общесистемному языку ioBroker. API сообщений бэкэнда, безопасность сопряжения, сохранение данных устройства и дерево публичных объектов остались без изменений.

Один сгенерированный пакет административной панели не может обслуживать оба поколения API графического интерфейса. Восстановление поддержки Admin 7 потребует отдельного создания и выбора пользовательского интерфейса первого поколения, а не ослабления диапазона версий или использования ложных параметров. `guiApi` декларация.

Для сборки исходного кода требуется версия Node, поддерживаемая Vite 8 и Module Federation Vite 1.19.1. В настоящее время проект поддерживает версии Node 22, 24 и 26, которые превышают минимальные требования этих инструментов для Node 22.12.

## Рассмотренные альтернативы

- Объявление `guiApi: 2` Существующий пакет был отклонен, поскольку он по-прежнему содержит зависимости React 18/MUI 6 первого поколения.
- Предложение оставить Admin 7 в качестве единственной целевой платформы было отклонено, поскольку представительская установка была перенесена на Admin 8, и все пользовательские элементы управления там недоступны.
- Удаление пользовательских таблиц было отклонено, поскольку стандартный JSON Config не может выразить их временные PIN-коды и рабочие процессы управления устройствами, специфичные для каждой строки.
- Выпуск двух поколений фронтенда был отложен, поскольку в JSON Config отсутствует простой статический селектор совместимости, а дублирование области сборки/тестирования не оправдано для текущего адаптера до версии 1.0.

## Проверка

Контрактные испытания подтверждают `guiApi: 2` Глобальная зависимость Admin 8, отсутствие пакета устаревших компонентов и отсутствие языкового селектора, специфичного для адаптера. Проверка типов, сборка Admin для производственной среды, тестирование пакетов, полный контроль адаптера и тесты Node 22/24/26 являются обязательными. Визуальная проверка на локальном тестовом хосте Linux aarch64 должна подтвердить наличие средств управления устройствами и отсутствие предупреждений о загрузчике компонентов или переводе перед следующим релизом.