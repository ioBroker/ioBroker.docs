---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md
title: ADR 0013: Идентификатор приемника AirPlay и контракт только для чтения
hash: fp5viedoufNqO70zIoKpUAQur+m7S3Fo3Fq9I2KqQTk=
---
# ADR 0013: Идентификатор приемника AirPlay и контракт только для чтения

- Статус: принято; права собственности на проекцию изменены в соответствии с ADR 0015
- Дата: 01.09.2026

## Контекст

Обнаружение универсальных AirPlay-ресиверов уже классифицирует компьютеры Mac в режиме ресивера, устройства AirPort Express, совместимые колонки, смарт-телевизоры и AV-ресиверы, но отображает только количество классов и временный текст администратора. Имена, адреса, порты и имена экземпляров DNS-SD могут меняться и, следовательно, не могут иметь постоянных путей к объектам ioBroker. Текущие данные SDK также не позволяют утверждать, что адаптер может передавать потоковое видео на каждый заявленный ресивер или управлять им.

Для работы адаптера необходим стабильный первый контракт на устройство, который улучшает инвентаризацию и внешние привязки, не блокируя при этом воспроизведение, сопряжение, громкость или транспортную семантику.

## Решение

Создайте один отдельный объект только для чтения ниже. `devices.airplayReceiver.<stableDeviceId>` Только при обнаружении устройства, предоставляющем нормализованный 12-символьный идентификатор протокольного устройства, и при условии, что пользователь явно активировал устройство в соответствии с ADR 0015. Идентификатор берется из AirPlay TXT. `deviceid` или ведущий идентификатор устройства экземпляра службы RAOP. Публичный путь представлен в шестнадцатеричном формате в нижнем регистре; `info.deviceId` отображает нормализованное значение в верхнем регистре.

Никогда не определяйте публичный путь к устройству, основываясь только на отображаемом имени, модели, IP-адресе, порте, имени хоста, полном доменном имени (FQDN), суффиксе экземпляра службы, порядке обнаружения или открытом ключе. Открытый ключ может сопоставлять данные AirPlay и RAOP в рамках одного сканирования, но сам по себе он не авторизует постоянный объект устройства. Слабо идентифицированные приемники остаются включенными в подсчет обнаруженных классов и снимок администратора.

Классификация остается однозначной: сначала Apple TV, затем HomePod, а потом универсальный приемник AirPlay. Идентификатор устройства протокола, присвоенный распознанным Apple TV или HomePod, не должен одновременно создавать объект универсального приемника. Связанные службы AirPlay и RAOP создают один универсальный приемник.

Первоначальный контракт, определяющий состояние каждого устройства, выглядит следующим образом:

| Суффикс штата         | Тип        | Роль            | Читать | Писать | Значение                                                              |
| --------------------- | ---------- | --------------- | ------ | ------ | --------------------------------------------------------------------- |
| `info.name`           | нить       | `info.name`     | да     | нет    | Последнее отображаемое имя                                            |
| `info.type`           | нить       | `text`          | да     | нет    | Постоянный `airplayReceiver`                                          |
| `info.model`          | нить       | `info.hardware` | да     | нет    | Последняя зарегистрированная модель или пустая                        |
| `info.deviceId`       | нить       | `text`          | да     | нет    | Стабильный нормализованный идентификатор протокола                    |
| `info.lastSeen`       | число      | `value.time`    | да     | нет    | Последнее успешное сканирование, содержащее приемник.                 |
| `discovery.available` | логический | `indicator`     | да     | нет    | Присутствует в результатах последнего успешного полного сканирования. |
| `services.airplay`    | логический | `indicator`     | да     | нет    | На этом снимке рекламируется сервис AirPlay.                          |
| `services.raop`       | логический | `indicator`     | да     | нет    | На этом снимке рекламируется услуга RAOP.                             |

Каждая операция записи проекции использует `ack=true` Контракт не раскрывает информацию о состоянии для записи, учетных данных, сетевой конечной точке, записи TXT, необработанном битовом поле функции или типе SDK вышестоящего разработчика. Заявленное наличие сервиса является доказательством обнаружения, а не подтверждением работоспособности сеанса протокола или успешного воспроизведения звука.

Активные управляемые объекты-приемники остаются в дереве объектов, даже если последующее успешное сканирование их больше не обнаруживает. Они помечаются как недоступные, их флаги объявленной службы становятся ложными, и `lastSeen` остается без изменений. При запуске применяются те же безопасные недоступные значения по умолчанию, что и перед первым сканированием. Неудачное сканирование не удаляет предыдущее успешное наблюдение. Пассивные и явно удаленные устройства не имеют отдельного дерева объектов; все еще видимое удаленное устройство возвращается в список неуправляемых обнаружений.

`devices.airplayReceiver.info.deviceCount` продолжает подсчитывать все объекты-приемники, классифицированные исключительно в рамках последнего успешного открытия, включая наблюдения без устойчивой идентификации. Следовательно, их число может быть больше, чем число отдельных объектов-приемников.

## Последствия

Автоматизация и визуализация могут привязываться к путям приемников, которые сохраняются после переименования дисплеев, изменения DHCP, изменения портов, временного отсутствия и перезапуска адаптера. Пользователи могут отличать текущие данные обнаружения от активного соединения. Активные приемники, находящиеся в автономном режиме, остаются видимыми до тех пор, пока пользователь не переведет их в пассивный режим или не удалит их локальную запись управления. Наблюдения в процессе обнаружения без явного подтверждения никогда не создают привязки для автоматизации.

Потоковая передача, временное сопряжение, громкость, транспорт, метаданные, обложки, группировка и включение приемника остаются вне рамок данного контракта. Для каждого из этих аспектов требуется узкоспециализированная проверка SDK, обнаружение возможностей, семантика сбоев и проверка на реальном устройстве, прежде чем будут добавлены состояния, допускающие запись, или заявления о доступности.

Это добавление функции, обеспечивающее обратную совместимость, запланировано на будущий минорный релиз, предшествующий версии 1.0.

## Рассмотренные альтернативы

- Пути, основанные на именах, были отклонены, поскольку переименования и дубликаты нарушают идентичность.
- Пути, основанные на IP-адресах или конечных точках, были отклонены из-за изменений портов DHCP и DNS-SD.
- Использование полных путей с открытым ключом было отклонено, поскольку наблюдения только с открытым ключом пока не обеспечивают достаточных межустройственных и сбрасываемых доказательств для надежной идентификации.
- Удаление отсутствующих объектов-приемников после каждого сканирования было отклонено, поскольку один результат mDNS с потерями данных привел бы к удалению стабильных привязок автоматизации.
- Добавление потокового воспроизведения или состояний управления было отклонено, поскольку реклама не является доказательством работоспособности или успешного завершения сеанса.

## Проверка

Тесты контрактов и корреляции охватывают нормализацию идентификаторов устройств AirPlay, идентификацию только по протоколу RAOP, корреляцию AirPlay/RAOP, независимость переименования и адресов, исключение классов, подавление слабых идентификаторов, детерминированное упорядочивание, метаданные объектов только для чтения. `ack=true` проекция, `lastSeen`, параметры запуска по умолчанию и сохранение данных при отсутствии устройства. Полная настройка адаптера необходима, поскольку контракт публичного объекта и схема межпроцессного взаимодействия при обнаружении изменяются. Для обнаружения реальных устройств по-прежнему необходимо подтвердить поля идентификации и обслуживания для каждой модели приемника, прежде чем будет заявлена поддержка конкретной модели.