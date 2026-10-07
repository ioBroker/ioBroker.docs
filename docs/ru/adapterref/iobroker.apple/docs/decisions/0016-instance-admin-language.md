---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md
title: ADR 0016: Язык локального администрирования экземпляра
hash: ws1TkuQYzPVEOi2Ifsr+Ofc5q1ovVixzGAYx3OWCsj8=
---
# ADR 0016: Язык локального администрирования экземпляра

- Статус: заменен
- Дата: 02.09.2026
- Заменено: 13.09.2026 текущим требованием контрольного списка адаптера ioBroker, согласно которому административные интерфейсы должны соответствовать общесистемному языку администрирования и не должны иметь возможности переключения языка, специфичной для адаптера.

## Отменяющее решение

Удалите селектор немецкого/английского языка, специфичный для данного адаптера, и сохраните изменения. `native.interfaceLanguage` Настройка. Конфигурация администратора соответствует общесистемному языку администрирования ioBroker, выбранному во время настройки администратора.

Адаптер продолжает поставлять стандартный каталог переводов административной панели для всех поддерживаемых языков административной панели ioBroker. Отсутствующие или неполные переводы должны быть исправлены в файлах переводов, а не обойдены путем переопределения языка в локальной среде экземпляра.

Это изменяет только пользовательский интерфейс административной конфигурации и собственную панель конфигурации. Это не изменяет поведение протокола, общедоступные идентификаторы объектов устройств, метки времени выполнения, учетные данные или сохраненные записи управления устройствами.

## Исторический контекст

Следующее решение было реализовано в рамках разработки версии 0.4.0 и сохранено лишь в качестве исторического контекста.

## Контекст

В настоящее время конфигурация адаптера соответствует языку административной панели ioBroker. Разработчику необходимо явно указать выбор между немецким и английским языками на вкладке «Общие» без внесения каких-либо изменений. `system.config` или расширить область поддерживаемого адаптером перевода на языки, конфигурационный текст которых является неполным.

## Решение

Добавлять `interfaceLanguage` в собственную конфигурацию экземпляра. Допустимые сохраняемые значения: `de` и `en`; В пустом значении параметра обновления по умолчанию начальное отображение определяется текущим языком административной панели, при этом используется английский язык, если это не немецкий и не английский.

На вкладке «Общие» отображается настраиваемый двухкнопочный селектор языка. Он загружает выбранный файл перевода адаптера, изменяет контекст перевода JSON-конфигурации и запрашивает немедленную перерисовку страницы конфигурации. Выбранный язык становится постоянным после сохранения пользователем конфигурации экземпляра. Он не изменяет глобальный объект системного языка ioBroker и не влияет на поведение протокола, общедоступные состояния устройств, идентификаторы объектов или метки времени выполнения.

Предлагаются только немецкий и английский языки. Существующие минимальные файлы для других языков ioBroker остаются резервными пакетами, но их нельзя выбрать с помощью этого элемента управления, специфичного для адаптера.

## Последствия

Каждый экземпляр адаптера может повторно открыть свою конфигурацию на выбранном языке. В исходной реализации использовался контекст конфигурации JSON Admin 7. ADR 0017 переносит его вместе со всеми остальными пользовательскими компонентами на второе поколение API графического интерфейса пользователя.

`interfaceLanguage` Это дополнительное поле собственной конфигурации. В будущем его удаление, переименование или семантические изменения потребуют проверки миграции в рамках публичного конфигурационного контракта.

Текущий контрольный список заменяет собой проверку миграции: сохранение возможности переопределения языка, специфичного для адаптера, заблокирует принятие репозитория.

## Проверка

Тесты контракта администратора проверяют ссылку на пользовательский компонент, два допустимых значения и отсутствие глобальной записи в системный язык. Проверка типов и сборка производственного пакета администратора являются обязательными. Визуальное подтверждение должно проверять оба направления на репрезентативной установке Admin 8.

Заменяющая реализация проверяется с помощью тестов административного контракта, подтверждающих отсутствие `interfaceLanguage`, путем проверки TypeScript и путем перегенерации пакета Admin второго поколения без селектора.