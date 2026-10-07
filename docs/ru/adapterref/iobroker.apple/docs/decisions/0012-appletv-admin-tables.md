---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md
title: ADR 0012: Административные таблицы Apple TV
hash: saqJq7LTqeQZlmawANe3hJGfrSLEJpTvCIaunzoIGQI=
---
# ADR 0012: Административные таблицы Apple TV

- Статус: заменено на ADR 0017 для обеспечения совместимости с административным интерфейсом и ограничениями сборки; поведение таблиц остается допустимым.
- Дата: 01.09.2026

## Контекст

Стандартные элементы управления JSON Config могут отображать список устройств, предоставляемых средой выполнения, или вызывать одно сообщение адаптера, но они не могут объединять временные данные обнаружения, непостоянное поле PIN-кода и несколько действий, специфичных для каждой строки, в одну динамическую таблицу. Поэтому предыдущие селекторы Apple TV занимали значительное вертикальное пространство и отображали недействительные значки-заполнители для имен действий, не поддерживаемых стандартом. `sendTo` компонент.

В текущей тестовой и развертываемой версии используется ioBroker Admin 7.8.23. В Admin 8 используется другой общий механизм генерации компонентов React и GUI, и намеренно отклоняются пользовательские компоненты, созданные с помощью устаревших технологий.

## Решение

Обеспечьте сопряжение Apple TV и управление сопряженными устройствами с помощью одного пользовательского компонента JSON Config, созданного из исходного кода. `src-admin/` Компонент использует официальный интерфейс Admin 7 Module Federation и импортирует элементы управления и значки из библиотек Admin 7 React/MUI. Сгенерированные ресурсы для производственной среды представлены ниже. `admin/custom/` и входят в комплект поставки адаптера.

В последующих версиях ADR 0015 и 0016 эта граница между исходным кодом и сборкой была повторно использована для таблиц управления HomePod и AirPlay Receiver, а также, исторически, для двухязычного селектора экземпляров. Версия ADR 0016 была заменена, поскольку текущие правила контрольного списка ioBroker требуют, чтобы пользовательский интерфейс администратора соответствовал общесистемному языку администрирования.

Компонент использует существующую границу сообщения адаптера. В ответах, содержащих списки кандидатов и сопряженных устройств, к существующим полям добавляются несекретные структурированные поля. `label` и `value` поля. `getPairingStatus` Добавляет стабильный идентификатор устройства только во время активной сессии сопряжения, позволяя браузеру привязать глобальный координатор сопряжения для одной сессии к соответствующей строке таблицы.

PIN-код хранится только в состоянии компонента, фильтруется до четырех цифр и отправляется один раз. `finishPairing` и удаляется после завершения или отмены. Он никогда не записывается через JSON Config. `onChange` путь, который никогда не становится нативной конфигурацией адаптера.

Компонент сохраняет существующее правило «одна сессия сопряжения на экземпляр». Он сериализует видимые действия во время выполнения запроса, обновляет список доступных устройств после каждого действия и выполняет автоматическое десятисекундное обновление статуса подключения и обнаружения. Пассивные операции и операции «забыть» сохраняют явное подтверждение браузера.

Данная версия ориентирована на Admin 7.8.23 и остальные версии Admin 7. Объявленная глобальная зависимость от Admin сужена до `>=7.8.23 <8.0.0` Для поддержки Admin 8 требуется перестроить или добавить компонент GUI API второго поколения и протестировать оба поколения, прежде чем расширять этот диапазон. Это изменение совместимости будет включено в будущий минорный релиз, предшествующий версии 1.0.

## Последствия

Каждое обнаруженное устройство Apple TV имеет одну компактную строку с именем/моделью, статусом сопряжения, кнопками запуска, временным PIN-кодом, завершением и отменой. Каждое сопряженное устройство Apple TV имеет одну строку со статусом подключения/включения и действиями «активно», «пассивно» и «забыть». Все действия используют встроенные значки MUI, избегая ограниченного словаря строковых значков стандарта. `sendTo` контроль.

В исходную сборку добавлены закрепленные зависимости для разработки, доступные только администратору, и сгенерированные ресурсы интерфейса. Поведение протокола, учетные данные, формат сохранения и публичные идентификаторы объектов остаются без изменений. Дополнительные поля сообщений остаются несекретными и обратно совместимыми с более ранними селекторами.

## Рассмотренные альтернативы

- Сохранение строк, хранящихся во время выполнения, в стандартном JSON-файле конфигурации. `table` Отклонено, поскольку результаты обнаружения и PIN-коды не соответствуют надежной конфигурации адаптера.
- Рендеринг HTML через `textSendTo` было отклонено, поскольку не поддерживает границы сообщений типа row-action или transient-input.
- Предложение о сохранении компактных селекторов было отклонено, поскольку оно не обеспечивало бы запрошенный рабочий процесс для каждого устройства.
- Сборка только для Admin 8 была отклонена, поскольку на тестируемом хосте ioBroker установлена версия Admin 7.8.23.

## Проверка

Помимо проверки полного адаптера, должны пройти проверку типов и сборку производственного компонента. Контрактные тесты проверяют ссылку на пользовательский компонент, сгенерированную точку входа, действия с PIN-кодом и идентификатор активного сопряженного устройства. Вкладка «Устройства» должна загружаться на репрезентативном хосте ioBroker под управлением Linux aarch64 с Admin 7.8.23 без ошибок консоли или загрузчика компонентов.