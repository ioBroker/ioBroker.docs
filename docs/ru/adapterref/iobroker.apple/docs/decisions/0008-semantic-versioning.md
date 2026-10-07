---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md
title: ADR 0008: Семантическое версионирование и классификация релизов
hash: cs7MG9+QUJl+e2MCmqH+tbLYvbWgqDSI6lzp/pTPgJw=
---
# ADR 0008: Семантическое версионирование и классификация релизов
- Статус: принято
- Дата: 31.08.2026

## Контекст
В соответствии с рекомендациями по разработке ioBroker, требуется семантическое версионирование. Этот адаптер предоставляет доступ не только к JavaScript API: объекты и состояния ioBroker, конфигурация администратора, сообщения, команды, сохраненные данные, требования среды выполнения и документированное поведение интеграции - все это используется извне. Номер релиза должен указывать, могут ли эти потребители обновиться без миграции.

В настоящее время проект находится ниже версии `1.0.0`. SemVer допускает нестабильность в версии `0.y.z`, но выпуск скрытых патчей, нарушающих совместимость, сделает раннюю интеграцию автоматизации и визуализации ненадежной.

Ссылки:

- https://semver.org/
- https://forum.iobroker.net/topic/26204/versionierung-von-iobroker-und-adaptern

## Решение
Используйте семантическое версионирование 2.0.0 в формате `MAJOR.MINOR.PATCH`.

Для стабильных версий, начинающихся с `1.0.0`:

- Увеличивать значение `MAJOR` при любом изменении публичного контракта, несовместимом с предыдущими версиями;
- Увеличивайте значение `MINOR` для обеспечения обратной совместимости или при публикации.

Данная функция устарела;

- Увеличивайте значение `PATCH` только для исправлений, обеспечивающих обратную совместимость.

Договор на использование общедоступного адаптера включает в себя:

- Идентификаторы объектов и состояний, иерархия, типы, роли, единицы измерения, диапазоны, чтение/запись

флаги, значения и семантика подтверждения;

- Поля конфигурации администратора и проверка данных;
- Схемы сообщений, команд, сцен и полезной нагрузки в формате JSON;
- Нормализованное поведение плеера и интеграции;
- Сохранение форматов конфигурации и учетных данных в случае невозможности обновления.

перенести их прозрачно;

- Документированные минимальные требования к Node.js, js-controller и Admin;
- документированное поддерживаемое поведение, удаление которого нарушит работу существующего

установка.

Примерами существенных изменений после `1.0.0` являются переименование/удаление состояния, изменение типа состояния или значения команды, необходимость ручного повторного сопряжения без пути миграции, отказ от документированной версии среды выполнения или удаление поддерживаемого поведения. Дополнительные необязательные состояния и возможности обычно незначительны, если существующие потребители продолжают работать без изменений.

На начальном этапе разработки (`0.y.z`) применяйте более строгую политику проекта, чем минимальные требования SemVer:

- `0.MINOR.0` обозначает этап разработки новой функции и может содержать явно указанный

разрешенное нарушение совместимости;

- `0.y.PATCH` всегда обратно совместим;
- Каждое нарушение совместимости должно быть помечено как «КРАЙНЕЕ» в примечаниях к выпуску.

Сводные отчеты о коммитах/проверках, требуется утвержденное соглашение о разрешении споров (ADR), а также информация о влиянии миграции и отката;

- предпочтительнее отказ от устаревших функций и прозрачная миграция, чем полный разрыв отношений;
- `1.0.0` объявляет о первом стабильном публичном контракте адаптера.

В предварительных версиях могут использоваться `-alpha.N`, `-beta.N` или `-rc.N`. Они имеют более низкий приоритет, чем соответствующая стандартная версия, и не несут в себе обещания стабильной совместимости, присущих этой стандартной версии.

Опубликованные версии и теги Git являются неизменяемыми. Никогда не заменяйте опубликованный артефакт npm и не перемещайте/повторно используйте тег релиза для другого содержимого. Исправление - это новая версия.

В релизе необходимо обеспечить согласованность следующих местоположений:

- Версия файла `package.json`;
- версия корневого пакета в файле `package-lock.json`;
- `io-package.json` `common.version` и `common.news`;
- пользовательские примечания к выпуску/список изменений;
- Git-тег `vMAJOR.MINOR.PATCH` или его допустимая предварительная версия.

Не следует повышать версии в спекулятивном порядке во время обычной работы над новыми функциями. Выбор версии, присвоение тегов, публикация в npm и создание релиза на GitHub происходят одновременно после прохождения проверки качества релиза.

## Последствия
Пользователи могут оценить риск обновления по номеру версии. При классификации релизов необходимо проверять не только экспорт данных TypeScript, но и общедоступные контракты ioBroker и интеграционные контракты. Ранние релизы могут свободно развиваться, но патчи не могут скрывать нарушения совместимости, и каждое преднамеренное нарушение имеет запись о миграции.

Изменения в функционале, исправления и зависимости должны оцениваться по их наблюдаемому эффекту. Небольшое изменение кода может потребовать крупного релиза, в то время как масштабная внутренняя рефакторизация может остаться патчем, если поведение не изменилось и было проверено.

## Рассмотренные альтернативы
- Неофициальные номера версий: отклонены, поскольку не указывают на обновление.

совместимость и конфликт с рекомендациями ioBroker.

- Рассматривать каждый релиз `0.y.z` как полностью нестабильный без соблюдения правил миграции:

отклонено, поскольку потребителям автоматизации и визуализации необходимы предсказуемые обновления до `1.0.0`.

- Версионирование календаря: отклонено, поскольку важна совместимость, а не дата выпуска.

основная информация, необходимая пользователям.

## Проверка
- В описании проекта, руководстве по внесению вклада и файле README содержится ссылка на данное объявление о разрешении на участие в проекте.
- Пакет, файл блокировки, новости ioBroker, список изменений и тег Git совпадают для каждого

Выпущена новая версия; `0.2.0` - это первый этап разработки, использующий данную политику.

- Процесс выпуска принимает теги SemVer и теги предварительной версии.