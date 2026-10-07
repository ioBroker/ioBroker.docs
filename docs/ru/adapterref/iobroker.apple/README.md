---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/README.md
title: ioBroker.apple
hash: z8ei5w2gY+KOIBV8QGKbOAO0ExaM4oyhCsbPH/G9ovk=
---
# ioBroker.apple

<img src="admin/apple-logo.png" alt="ioBroker Apple adapter logo" width="128">

`iobroker.apple` Обнаруживает и управляет поддерживаемыми медиаустройствами Apple в локальной сети. Версия 0.4 является текущей базовой версией для разработки. Она содержит вертикальный срез Apple TV и консервативную предварительную версию HomePod для публичного тестирования оборудования. Ее объектные контракты разработаны для автоматизации и визуализации ioBroker без раскрытия деталей протокола Apple.

## Текущий объем разработки

- Обнаружение устройств Apple TV через сервисы AirPlay, Companion Link и RAOP DNS-SD;
- Стабильная идентификация определяется на основе идентификаторов протокола, а не имени или IP-адреса;
- Сопряжение PIN-кода осуществляется со страницы администратора ioBroker;
- зашифрованное, ограниченное экземпляром, сохраняющее учетные данные только для владельца;
- автоматические попытки переподключения после периодического повторного обнаружения;
- Были проверены состояние подключения, питания, воспроизведения, приложения и громкости;
- Навигация с ограничением по функциональности, воспроизведение/пауза, включение/выключение, приостановка и регулировка громкости;
- Запускаемый каталог приложений с читаемыми кнопками запуска для каждого приложения и ограничением по функциональным возможностям. `apps.openurl` команда для поиска известных универсальных или прикладных ссылок;
- Вкладки для администрирования, позволяющие настраивать общие параметры, устройства и Apple Music;
- Выбор конфигурации адаптера (немецкий/английский) сохраняется для каждого экземпляра;
- Таблицы обнаруженных и управляемых устройств для каждого класса устройств с возможностью выбора активного/пассивного режима, локальным удалением и отсутствием повторяющихся строк;
- Отдельные данные о количестве обнаруженных устройств для Apple TV, HomePod и универсальных AirPlay-ресиверов, включая текущие названия и модели, обнаруженные в разделе «Администрирование»;
- Надежно идентифицируемые устройства HomePod/HomePod mini с автоматическим временным сопряжением и без PIN-кода или постоянных учетных данных HomePod;
- Добавлена поддержка подключения HomePod, фазы сопряжения, режима воспроизведения, воспроизведения и состояния громкости, а также возможность управления воспроизведением и записью параметров громкости;
- Диагностика и отладка HomePod с сохранением конфиденциальности, охватывающие этапы обнаружения, сопряжения, подключения, возможностей, событий, команд, ошибок, повторного обнаружения и выгрузки;
- Ограниченное обнаружение и полная очистка после выгрузки адаптера.

Управление HomePod — это непроверенная предварительная версия для разработчиков, и она не входит в заявленную совместимость с выпущенной версией 0.2. Индивидуальное управление AirPlay-ресивером, потоковая передача аудио, мультирум, Apple Music и Alexa остаются вне текущей области применения.

## Открытые вопросы / Дальнейшие шаги

Между текущей базовой версией 0.4 и запланированным первым стабильным релизом адаптера остается следующая работа:

- **Полный контроль над Apple TV:** добавление возможности управления поиском/пропуском, отображение обложек, выбор учетной записи, а также обнаружение и выбор аудиовыходов.
- **Проверьте работоспособность HomePod и добавьте управление приемником AirPlay:** запустите предварительную версию HomePod на репрезентативных устройствах HomePod и HomePod mini, запишите результаты сопряжения, состояния, управления, восстановления, перезапуска и выгрузки, а также сохраните возможность обнаружения приемников без надежной идентификации.
- **Реализуйте источники мультимедиа и воспроизведение:** поддерживайте проверенные локальные файлы, URL-адреса, веб-радио и синтез речи, где можно продемонстрировать законное воспроизведение и поддержку протокола. Определите ограничения и порядок очистки для потоков, временных данных и внешних инструментов.
- **Оцените возможности использования сторонних поставщиков медиаконтента:** используйте отдельные модули поставщиков для поиска по каналам и каталогам контента. Воспроизведение может осуществляться только с использованием проверенных прямых ссылок на приложения или законно доступных потоков, и запись не должна быть помечена как воспроизводимая до тех пор, пока ее конкретный выбор не будет успешно выполнен на реальном целевом устройстве.
- **Определите поведение групп и многокомнатных систем:** укажите принадлежность группы, выбор выходных данных, ожидания синхронизации, частичный сбой и восстановление, прежде чем раскрывать публичный контракт группы.
- **Завершите разработку API, не зависящего от устройства:** зафиксируйте нормализованную модель проигрывателя, версионированную универсальную конечную точку команд и ограниченный механизм сцен с документированными схемами, обработкой ошибок, отменой, таймаутами и правилами миграции.
- **Интеграция Apple Music через официальные API:** реализация авторизации разработчиков и пользователей, доступа к каталогу и персонализированным данным, жизненного цикла токенов, пагинации, кэширования и разрешения воспроизведения. Метаданные Apple Music не будут рассматриваться как источник потокового аудио.
- **Проверьте интерфейс Admin 8:** проведите визуальную проверку всех таблиц устройств второго поколения на общесистемном языке администрирования ioBroker на репрезентативном хосте ioBroker.
- **Полная проверка выпуска:** проверка перезапуска, переподключения, компактного режима, выгрузки, сохранения состояния, безопасности и контракта публичного объекта в рамках поддерживаемой матрицы Node.js/OS и документированной матрицы реальных устройств; затем прохождение проверки адаптера ioBroker и выполнение требований к публикации в репозитории.

Первый стабильный релиз считается завершенным только после реализации, документирования и подтверждения автоматизированными и реальными данными с устройств всех указанных выше пунктов. Alexa/Echo остается возможным вариантом бэкэнда для будущих плееров и не является обязательным условием для первого стабильного релиза.

## Требования

- Node.js 22 или более поздняя версия;
- js-controller 7.2.2 или новее;
- Admin 8 или более поздняя версия; Admin 7 больше не поддерживается, поскольку пользовательские генерации GUI-API несовместимы с предыдущими версиями;
- Apple TV или HomePod и хост ioBroker находятся в одной локальной сети с поддержкой многоадресной рассылки.

## Официальная информация о продуктах Apple

- [Apple TV 4K](https://www.apple.com/apple-tv-4k/)
- [HomePod](https://www.apple.com/homepod/)
- [AirPlay](https://www.apple.com/airplay/)

## Настройка и сопряжение

1. Установите адаптер и создайте экземпляр.
2. Не выключайте Apple TV и откройте вкладку **«Устройства»** в настройках адаптера.
3. Выберите пункт **«Начать сопряжение»** в строке нужного устройства Apple TV.
4. Введите четырехзначный PIN-код, отображаемый на экране Apple TV, в той же строке и выберите **«Завершить сопряжение»** . Операцию также можно отменить в этой же строке.

PIN-код отправляется только в активную сессию сопряжения и никогда не записывается в конфигурацию адаптера, дерево объектов, журналы или файл учетных данных. Долгосрочные учетные данные шифруются с помощью секретного ключа установки ioBroker. Учетные данные, созданные в ходе предыдущего временного PoC, намеренно не импортируются; каждое устройство должно быть сопряжено с адаптером только один раз.

Интервал обнаружения по умолчанию составляет 60 секунд и может быть настроен в диапазоне от 30 до 3600 секунд. Адреса и порты устройств обновляются при обнаружении и не сохраняются в качестве идентификаторов.

Для подключения HomePod не требуется ввод PIN-кода вручную. HomePod с надежной идентификацией сначала отображается как неуправляемый кандидат. При его активации создается дерево сопряжения, и он автоматически подключается с помощью новой временной сессии сопряжения AirPlay. Учетные данные HomePod не записываются в базу данных сопряжения. Кнопки воспроизведения и состояние громкости, доступное для записи, появляются только после того, как подключенный HomePod сообщит об этих возможностях.

Сопряженные Apple TV по умолчанию активны. Установка устройства в пассивный режим сохраняет зашифрованное сопряжение, но отключает его и удаляет дерево объектов. Повторная активация восстанавливает соединение и создает дерево заново при обнаружении устройства. Удаление устройства из списка сопряженных устройств также полностью удаляет учетные данные сопряжения и дерево объектов.

Устройства HomePod и AirPlay Receiver, имеющие четкую идентификацию, также перемещаются из таблицы обнаруженных устройств в таблицу управляемых устройств при активации. Перевод их в пассивный режим сохраняет их локальную запись управления, но удаляет их индивидуальное дерево. Удаление записи управления удаляет дерево; устройство, остающееся видимым в сети, затем возвращается в таблицу обнаруженных устройств. Активация универсального приемника создает инвентаризацию только для чтения и не подтверждает поддержку воспроизведения или потоковой передачи.

## Дерево объектов

Ниже создаются активные сопряженные устройства Apple TV. `apple.<instance>.devices.appletv.<protocol-device-id>` Папки классов устройств `appletv`, `homepod`, и `airplayReceiver` Отображаются данные об обнаружении. Активные управляемые универсальные AirPlay-приемники со стабильным идентификатором устройства AirPlay/RAOP дополнительно получают доступ к обнаружению каждого устройства и инвентаризации рекламируемых служб только для чтения. Дерево Apple TV содержит информацию только для чтения, независимое состояние AirPlay и Companion Link, возможности, питание, текущее воспроизведение, громкость и результат последней команды. Доступные для записи состояния навигации, воспроизведения, питания и приложений создаются только после того, как подключенное устройство сообщит о соответствующей возможности.

Ниже создаются активно управляемые и строго идентифицируемые HomePod. `apple.<instance>.devices.homepod.<protocol-device-id>` Их дерево содержит информацию только для чтения: идентификатор, обнаружение, служба, состояние подключения и временного сопряжения, возможности, данные о текущем воспроизведении, громкость и результат последней команды. Поддерживаемые кнопки управления воспроизведением используют `ack=false` /`ack=true` Моментальная семантика. HomePod `volume.level` принимает значения от 0 до 100 и `volume.muted` При наличии возможности управления объемом данных принимается явно заданное логическое значение.

Запись данных с помощью кнопки представляет собой кратковременные логические значения. Адаптер принимает только `true` с `ack=false` выполняет команду последовательно для каждого устройства, записывает результат и возвращает кнопку в исходное положение. `false` с `ack=true`. `apps.openurl` вместо этого принимает одну абсолютную строку URL с `ack=false` и сбрасывает его до пустой строки с `ack=true` Операционная система tvOS и принимающее приложение определяют, откроет ли этот URL-адрес запрошенный контент.

Базовый контракт объекта описан в [ADR 0005](/#/docs/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md) и изменен в соответствии с последующими решениями по иерархии устройств и приложениям. Включение устройств и инвентаризация администратора описаны в [ADR 0011.](/#/docs/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md) Исходные динамические таблицы администратора описаны в [ADR 0012](/#/docs/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md) ; их миграция в Generation-2 и Admin-8 определена в [ADR 0017.](/#/docs/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md) Стабильная идентификация универсального приемника и его контракт состояния только для чтения описаны в [ADR 0013.](/#/docs/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md) Непроверенный контракт предварительного просмотра HomePod и граница конфиденциальности диагностики описаны в [ADR 0014.](/#/docs/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md) Явное принятие и включение приемника HomePod/AirPlay описаны в [ADR 0015.](/#/docs/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md) Удаленный локальный выбор немецкого/английского языка для администратора описан в [ADR 0016](/#/docs/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md) .

## публичное тестирование HomePod

Поддержка HomePod реализована автоматически, но проверка на реальном HomePod еще не проводилась. Волонтерам следует включить адаптер. `debug` Чтобы проверить уровень логирования, перезапустите экземпляр, дождитесь завершения цикла обнаружения, проверьте каждое видимое воспроизведение и регулятор громкости, затем протестируйте временную потерю сети и повторите перезапуск. Полезный отчет включает модель HomePod, версию программного обеспечения HomePod, версии ioBroker/адаптера/Node.js, протестированные операции, результирующие состояния объектов и полный интервал отладки адаптера. Адаптер намеренно не включает в диагностику HomePod сетевые адреса, имена устройств, записи TXT, названия медиафайлов, учетные данные и необработанные ошибки восходящего потока; тем не менее, тестировщикам следует просмотреть журналы перед их публичной публикацией.

## Разработка

```bash
npm install
npm run check
npm run lint
npm test
npm run test:integration
```

Для подтверждения возможности выпуска продукта необходимо, чтобы поведение устройства на реальном устройстве соответствовало требованиям Apple TV или приемника. См. [руководство по внесению вклада](/#/docs/adapterref/iobroker.apple/CONTRIBUTING.md) , [архитектуру](/#/docs/adapterref/iobroker.apple/docs/ARCHITECTURE.md) , [записи решений](/#/docs/adapterref/iobroker.apple/docs/decisions/README.md) , [оценку вышестоящих разработчиков](/#/docs/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md) и [уведомления третьих сторон](/#/docs/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md) .

Выпуски осуществляются в соответствии с принципами семантического версионирования. Правила привязки, включая более строгую политику совместимости и миграции для версий до 1.0, описаны в [документе ADR 0008](/#/docs/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md) .

## Changelog

No unreleased changes.

### 0.4.1 - 2026-10-01

- Address ioBroker latest repository review findings.
- Add public copyright contact details in README and license metadata.
- Update ioBroker testing tooling, keep the package runtime audit clean, and
  exclude `CHANGELOG_OLD.md` from npm package contents.

### 0.4.0 - 2026-09-10

- Add capability-gated Apple TV absolute volume control.
- Repair checker-relevant metadata for existing device objects during startup.
- Update Admin build dependencies from the three Dependabot PRs and keep
  `react-color` explicit for the current JSON Config color component.

### 0.3.3 - 2026-09-06

- Align ioBroker release news with published npm versions.
- Add `CHANGELOG_OLD.md` for older pre-public-release changelog entries.
- Align the release workflow topology with ioBroker latest repository checks.

### 0.3.2 - 2026-09-03

- Correct release metadata for ioBroker latest repository submission.

### 0.3.1 - 2026-09-03

- Fix Windows release test compatibility for managed-device persistence.

Older pre-public-release changelog entries are stored in
CHANGELOG_OLD.md.

## License

Copyright (c) 2026 C@ptain Ch@os <butan_akrobat1t@icloud.com>

This project is licensed under the [MIT License](https://github.com/Musashi1965/ioBroker.apple/blob/main/LICENSE). Third-party sources
and dependencies retain their licenses. Apple and related marks are trademarks
of Apple Inc. This independent project is not affiliated with, endorsed by, or
sponsored by Apple Inc.