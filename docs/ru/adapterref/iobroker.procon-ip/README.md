---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.procon-ip/README.md
title: ioBroker.procon-ip
hash: 4iqN3AF7oKF/D1R7sZG4oIHpqApYO7HiS2XzbVmJ5oQ=
---
![Логотип](https://github.com/ylabonte/ioBroker.procon-ip/blob/master/admin/procon-ip.png?raw=true)

![Количество установок](http://iobroker.live/badges/procon-ip-installed.svg)
![Текущая стабильная версия](http://iobroker.live/badges/procon-ip-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.procon-ip.svg)
![Известные уязвимости](https://snyk.io/test/github/ylabonte/ioBroker.procon-ip/badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.procon-ip.svg)

# IoBroker.procon-ip
[![Тестирование и выпуск](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ylabonte/ioBroker.procon-ip/actions/workflows/test-and-release.yml)

Адаптер ioBroker для контроллера бассейна Pool Digital ProCon.IP.
Он предназначен для интеграции с вашей системой домашней автоматизации ioBroker, например,
для создания логики, включающей другие устройства, или для сопряжения с вашими любимыми голосовыми помощниками:

— Вы можете использовать [_cloud_](https://github.com/ioBroker/ioBroker.cloud) или

[Интернет вещей](https://github.com/ioBroker/ioBroker.iot) адаптер для Alexa (а также, кажется, для Google Home) и

- [_yahka_](https://github.com/jensweigele/ioBroker.yahka) адаптер в качестве моста к

Apple HomeKit, доступный для Siri или

- используйте [_javascript_](https://github.com/ioBroker/ioBroker.javascript)

адаптер для создания собственной пользовательской логики.

Дополнительную информацию см. в [вики](https://github.com/ylabonte/ioBroker.procon-ip/wiki).

## Что такое контроллер пула ProCon.IP?
Блок управления бассейном ProCon.IP — это недорогой сетевой блок управления для домашних бассейнов. Благодаря программно управляемым реле, он может управлять несколькими насосами (для фильтра бассейна и различных режимов дозирования) либо по расписанию, либо в зависимости от показаний/значений с одного из многочисленных входных каналов для измерений (например, датчики расхода, термометры Dallas 1-Wire, редокс- и pH-электроды). По крайней мере, есть также возможность переключать эти реле по требованию, что делает их применимыми для включения/выключения освещения (или чего-либо еще по вашему желанию).
Не вся его функциональность доступна через API. Фактически, существует один документированный API для чтения (опроса) значений в формате CSV (`/GetState.csv`). Насколько я помню, был еще один для включения/выключения реле и включения по таймеру. Но я больше не могу найти второй. Так что, хотя и не очень красивый, но функциональный: ProCon.IP имеет два собственных веб-интерфейса, которые можно проанализировать, чтобы своего рода реверс-инжиниринг заданной функциональности (например, переключения реле).

Для получения более подробной информации перейдите по следующей ссылке (к сожалению, она только на немецком языке; пока не удалось найти документацию/информацию на английском языке):

- [интернет-магазинpooldigital.de](https://pooldigital.de/poolsteuerungen/procon.ip/35/procon.ip-webbasierte-poolsteuerung-/-dosieranlage)
- [форумpooldigital.de](https://www.poolsteuerung.de/)

**Чтобы было ясно: я не имею никакого отношения к разработке, продажам, маркетингу или поддержке блока управления бассейном. Я лишь разработал решение для его интеграции с ioBroker, чтобы сделать дом моих родителей немного умнее.**

## Подробная информация об адаптере
Адаптер использует API `/GetState.csv` модуля ProCon.IP для опроса его значений, а также другой — недокументированный — API, работающий с побитовыми командами для переключения реле. Второй API также используется оригинальными веб-интерфейсами ProCon.IP. Поэтому в будущем могут появиться обновления прошивки, которые нарушат совместимость с этим адаптером или, по крайней мере, его функциональность по переключению реле.

### Совместимость
На данный момент адаптер протестирован и разработан в сочетании с прошивкой ProCon.IP **версия 1.7.6.a**. Однако он должен работать с любой более новой/будущей версией прошивки.

## Развитие и участие
Если вы хотите принять участие в разработке, переводе или документировании этого адаптера, пожалуйста, свяжитесь со мной.

Полезные ссылки для данного подхода будут следующими:

- [шаблон адаптера TypeScript](https://github.com/ioBroker/ioBroker.template/tree/master/TypeScript)

Я начал с и

- [руководство для разработчиков адаптеров](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md).

### Локальное тестирование с использованием dev-сервера
Для практического тестирования на реальном контроллере ProCon.IP используйте [`@iobroker/dev-server`](https://github.com/ioBroker/dev-server). Он запускает временный локальный экземпляр ioBroker (js-контроллер + административный интерфейс) и запускает этот адаптер из вашей локальной сборки:

```bash
npm i -g @iobroker/dev-server   # once, globally
npm run dev:setup               # creates the local .dev-server/ profile (git-ignored)
npm run dev                     # builds, runs, admin UI at http://localhost:8081
```

Настройте экземпляр, указав URL-адрес вашего контроллера в административном интерфейсе. `npm run dev` перестраивает и перезагружает адаптер при изменении исходного кода.

## Пожертвование
Если вы хотите поддержать этот адаптер или выразить благодарность, вы можете:

[<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Купи мне кофе" style="height: 40px !important;width: 144px !important;" >](https://www.buymeacoffee.com/ylabonte)

## Changelog
### 1.9.0 (2026-08-23)

- **DMX512 lighting support (opt-in).** Enable "DMX512 channels" in the adapter settings to expose the controller's 16 DMX channels as writable 0–255 dimmer states (`dmx.CH01` … `dmx.CH16`).
- **Self-healing object definitions.** Objects are now updated on upgrade (via `extendObject`, versioned), so improved roles/types reach existing installations — while your custom object names are preserved.
- **Fewer redundant events.** State values are written only when they actually change, and relay/dosage/timer commands are acknowledged immediately once the controller confirms them.
- Subscriptions are narrowed to the writable command states, and the boolean status flags now use the `indicator` role.
- Large internal refactor for testability: the monolithic adapter was split into a thin shell plus focused, unit-tested modules with a CI coverage gate. No functional change from this part.

### 1.8.1 (2026-08-22)

- **Fixed relay and DMX switching**, which had silently stopped working since 1.8.0's move to the ProCon.IP 2.x library: the controller accepted a write with `200 OK` but ignored it. Updated the library to 2.1.1, which sends the exact HTTP request format the controller's firmware requires. Reads were never affected.
- Resilient startup: the adapter now comes up and keeps polling until the controller becomes reachable, instead of staying inactive when the controller was offline at boot time.
- Fixed a corner case in the forced-update handling that could keep a relay flagged for updates.
- Aligned the admin configuration defaults with the adapter's effective runtime defaults and fixed a help-text typo.
- Maintenance: fixed the unit-test runner so tests actually execute, trimmed the CI test matrix, bumped CI actions (checkout/codeql), and pinned `@types/node` to the supported Node baseline.

### 1.8.0 (2026-08-22)

- Raised the minimum Node.js version to 22 (Node 20 is end-of-life).
- Updated the ProCon.IP library to 2.x, replacing its axios HTTP client with a leaner implementation and typed error handling.
- Updated all dependencies and shrank the security-advisory backlog.
- Internal cleanup: migrated off the deprecated `setStateAsync` API to `setState`.
- Maintenance: adopted npm Trusted Publishing (OIDC), modernized the CI workflow, grouped Dependabot updates, and applied the latest ioBroker repository-checker fixes.

### 1.7.0 (2025-09-20)

- Satisfy latest requirements demanded by the ioBroker-Bot.
- Raise minimum required js-controller version to 7.0.7.
- Raise minimum required admin version to 7.6.17.
- Remove calls to deprecated methods.
- Minor code cleanup.
- Dependency updates.

### 1.6.0 (2024-09-08)

- Fix versioning according to prior changes in requirements (should have happened with v1.5.5).
    - Raise minimum required js-controller version to 5.0.19.
    - Raise minimum required node version to 20.
- Dependency updates.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2019-2026 Yannic Labonte <yannic.labonte@gmail.com>