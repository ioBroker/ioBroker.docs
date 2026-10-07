---
chapters: {"pages":{"en/adapterref/iobroker.apple/README.md":{"title":{"en":"ioBroker.apple"},"content":"en/adapterref/iobroker.apple/README.md"},"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md":{"title":{"en":"ADR 0005: Version 0.1 Object And Command Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0005-v0.1-object-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md":{"title":{"en":"ADR 0011: Device Enablement And Admin Inventory"},"content":"en/adapterref/iobroker.apple/docs/decisions/0011-device-enablement-and-admin-inventory.md"},"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md":{"title":{"en":"ADR 0012: Apple TV Admin Tables"},"content":"en/adapterref/iobroker.apple/docs/decisions/0012-appletv-admin-tables.md"},"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md":{"title":{"en":"ADR 0017: Admin 8 GUI API Generation 2"},"content":"en/adapterref/iobroker.apple/docs/decisions/0017-admin-8-gui-api-generation-2.md"},"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md":{"title":{"en":"ADR 0013: AirPlay Receiver Identity And Read-Only Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0013-airplay-receiver-identity-and-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md":{"title":{"en":"ADR 0014: HomePod Transient Connection And Control Contract"},"content":"en/adapterref/iobroker.apple/docs/decisions/0014-homepod-transient-control-contract.md"},"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md":{"title":{"en":"ADR 0015: Explicit HomePod And AirPlay Receiver Management"},"content":"en/adapterref/iobroker.apple/docs/decisions/0015-explicit-homepod-and-receiver-management.md"},"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md":{"title":{"en":"ADR 0016: Instance-Local Admin Language"},"content":"en/adapterref/iobroker.apple/docs/decisions/0016-instance-admin-language.md"},"en/adapterref/iobroker.apple/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.apple"},"content":"en/adapterref/iobroker.apple/CONTRIBUTING.md"},"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md":{"title":{"en":"Technical Architecture"},"content":"en/adapterref/iobroker.apple/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.apple/docs/decisions/README.md":{"title":{"en":"Architecture Decision Records"},"content":"en/adapterref/iobroker.apple/docs/decisions/README.md"},"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md":{"title":{"en":"Upstream Source Assessment"},"content":"en/adapterref/iobroker.apple/docs/UPSTREAM_RESEARCH.md"},"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md":{"title":{"en":"Third-Party Notices And Source Policy"},"content":"en/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md"},"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md":{"title":{"en":"ADR 0008: Semantic Versioning And Release Classification"},"content":"en/adapterref/iobroker.apple/docs/decisions/0008-semantic-versioning.md"},"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md":{"title":{"en":"ADR 0003: Project License And Source Provenance"},"content":"en/adapterref/iobroker.apple/docs/decisions/0003-project-license.md"},"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md":{"title":{"en":"ADR 0018: ioBroker-Owned Timer Scheduler"},"content":"en/adapterref/iobroker.apple/docs/decisions/0018-iobroker-owned-timer-scheduler.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apple/THIRD_PARTY_NOTICES.md
title: Уведомления третьих сторон и политика в отношении источников
hash: njP18lrvL6+DhvnaVfsp0u86mBbAIcALqOSLvzCLTAc=
---
# Уведомления третьих сторон и политика в отношении источников

Данный проект распространяется под лицензией MIT. Использование сторонних пакетов и исходных материалов регулируется их соответствующими лицензиями и условиями.

В этом файле записываются проверенные проекты из вышестоящих источников. Это не сгенерированный список установленных зависимостей npm. Выпущенный пакет должен дополнительно сохранять все уведомления, требуемые зависимостями, фактически распространяемыми вместе с ним.

## Зависимости времени выполнения

### Протоколы Apple

- Проект: `basmilius/apple-protocols`
- Источник: <https://github.com/basmilius/apple-protocols>
- npm-пакеты: `@basmilius/apple-sdk`, `@basmilius/apple-common`
- Проверенная версия npm: `0.13.4`
- Лицензия: MIT
- Текущее использование: точная версия 0.13.4, используемая в зависимостях среды выполнения, обеспечивающих обнаружение, сопряжение и взаимодействие с бэкэндом Apple проекта.

Пакеты не включены в этот репозиторий. Авторские права и лицензии остаются за их соответствующими авторами. В проверенном репозитории исходного кода и манифестах npm указана лицензия MIT. В проверенном артефакте npm SDK отсутствует `LICENSE` Это уведомление содержит информацию об исходном коде и заявленной лицензии и включается в артефакт адаптера. Внедрение в среду выполнения принимается в соответствии с ADR 0007; обновления зависимостей требуют проверки исходного кода, артефакта и лицензии.

## Создание административного компонента

### Библиотеки компонентов и шаблоны административной панели ioBroker

- Проекты: `ioBroker/gui-components`, `ioBroker/ioBroker.admin`, и `ioBroker/ioBroker.admin-component-template`
- Проверенные пакеты: `@iobroker/gui-components@10.2.1` и `@iobroker/json-config@9.1.2`
- Проверенный шаблон: `ioBroker.admin-component-template` версия `3.0.5`, совершить `116026cef4623ac900cf3c3a992b7dd2049744c5`
- Лицензия: MIT
- Текущее использование: API графического интерфейса администратора 8 (второе поколение), шаблон сборки и общие библиотеки пользовательского интерфейса для сопряжения Apple TV, таблиц управления устройствами и выбора языка в локальной среде экземпляра.

Реализация компонента принадлежит проекту. Его конфигурация сборки основана на официальном шаблоне ioBroker, распространяемом по лицензии MIT. Соответствующее уведомление об авторских правах шаблона: Copyright (c) 2022-2026 bluefox <dogafox@gmail.com> . Полные условия разрешений и гарантий MIT совпадают с условиями, приведенными в корневом каталоге. `LICENSE` файл.

Сгенерированный административный пакет также использует React 19.2.8, MUI 9.4.0, Vite 8.1.5 и Module Federation Vite 1.21.2. Эти инструменты и библиотеки распространяются под лицензией MIT и остаются объектом авторского права их соответствующих авторов. Репозитории исходного кода: <https://github.com/facebook/react> , <https://github.com/mui/material-ui> , <https://github.com/vitejs/vite> и <https://github.com/module-federation/vite> .

## Эталонные реализации

### ioBroker Apple TV draft

- Проект: `h2okopfmt/ioBroker.apple-tv`
- Источник: <https://github.com/h2okopfmt/ioBroker.apple-tv>
- Проверен коммит: `eb7e8a527a313fdbb63f801335f0b22ae214e6c1`
- Лицензия: MIT
- Применение: только для оценки предшествующего уровня техники и пересечения проектов.

Никакие источники из этого проекта не включены, не скопированы, не адаптированы, не переведены и не предоставлены сторонними организациями. Результаты обзора легли в основу решения о независимом проекте, содержащегося в документе ADR 0001, и оценки общественного ландшафта в документе `docs/UPSTREAM_RESEARCH.md`.

### pyatv

- Проект: `postlund/pyatv`
- Источник: <https://github.com/postlund/pyatv>
- Проверенная версия: `0.18.0`
- Лицензия: MIT
- Использование: справочник по поведению протокола и его функциям; не является частью среды выполнения по умолчанию.

В настоящее время в этом репозитории отсутствует исходный код pyatv.

### Домашнее яблоко

- Проект: `basmilius/homey-apple`
- Источник: <https://github.com/basmilius/homey-apple>
- Проверено: `v1.8.0`
- Лицензия: GPL-3.0
- Применение: только для справочных целей, касающихся поведения и жизненного цикла.

Исходный код проекта, распространяемый по лицензии GPL-3.0, не должен копироваться, адаптироваться, переводиться или включаться в репозиторий, распространяемый по лицензии MIT. Аналогичное поведение должно быть реализовано независимо от документированных требований, общедоступных API и наших собственных тестов.

### Homebridge Alexa Player

- Проект: `BewhiskeredBard/homebridge-alexa-player`
- Источник: <https://github.com/BewhiskeredBard/homebridge-alexa-player>
- Проверенная версия: `0.5.3`
- Лицензия: MIT
- Применение: только для исторических исследований и в качестве справочного материала.

В настоящее время исходный код этого проекта не включен в данный репозиторий.

## Внешние API и товарные знаки

API Apple Music и MusicKit — это внешние сервисы Apple, регулируемые действующими условиями Apple для разработчиков. Их документация и содержимое проприетарного SDK не лицензируются в соответствии с лицензией MIT данного проекта.

Apple, Apple TV, HomePod, AirPlay, Apple Music, MusicKit и связанные с ними знаки являются товарными знаками Apple Inc. Этот независимый проект не связан с Apple Inc., не поддерживается ею и не спонсируется ею.

Amazon, Alexa, Echo и связанные с ними товарные знаки принадлежат их соответствующим владельцам. Любая будущая интеграция будет представлять собой независимую функцию обеспечения совместимости.

## Правило о взносах

Участники проекта обязаны указывать происхождение и лицензию скопированного или адаптированного материала в своем запросе на добавление (pull request). Существенный код сторонних разработчиков может быть добавлен только после проверки лицензии и со всеми необходимыми уведомлениями. Код с несовместимой лицензией не должен быть добавлен.