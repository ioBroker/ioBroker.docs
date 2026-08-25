---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.node-red?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.node-red?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.node-red?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.node-red?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker/iobroker.node-red?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker/iobroker.node-red?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker/iobroker.node-red?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker/iobroker.node-red?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker/iobroker.node-red?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker/iobroker.node-red/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.node-red.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/node-red-stable.svg
BADGE-Installed: http://iobroker.live/badges/node-red-installed.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.node-red/README.md
title: ioBroker.node-red
hash: m7OAyT9HiOPniI4y9Ns0yLlvYBonwYxwyHnxWfm5+ps=
---
![Логотип](../../../en/admin/node-red.png)

# IoBroker.node-red
**Примечание:** Если вы не можете найти свой штат в диалоговом окне выбора ID узлов ioBroker, нажмите кнопку обновления в настройках экземпляра или перезапустите экземпляр Node-RED. После перезапуска будет создан новый список объектов.

## Настройки
![Общие настройки](../../../en/adapterref/iobroker.node-red/img/instance-settings-general.png)

### Максимальный размер оперативной памяти
В конфигурации адаптера/экземпляра можно настроить максимальный объем ОЗУ/кучи для процесса Node-RED. Значение по умолчанию достаточно для небольших установок Node-RED. Если у вас много узлов или вы наблюдаете проблемы с производительностью или сбои процесса Node.RED в логах, пожалуйста, увеличьте значение максимального объема ОЗУ! В зависимости от доступного объема ОЗУ (см., например, использование `free -m` в параметре "avail") увеличьте его до 1024 (=1 ГБ) или даже больше.

### Безопасный режим
Запуск потоков не будет осуществлен, и вы можете отредактировать потоки, чтобы устранить проблемы с перегрузкой.

### Хранилище контекста
Node-RED может хранить контекст узла (`context`, `flow` и `global`) в разных [контекстные хранилища](https://nodered.org/docs/user-guide/context). Этот адаптер настраивает два из них:

| Магазин | Постоянный | Описание |
| ------------ | ---------- | ------------------------------------------------------------------------------------------------------- |
| `file` | да | Хранилище по умолчанию. Контекст записывается в каталог данных ioBroker и сохраняется после перезапуска адаптера |
| `memoryOnly` | нет | Контекст хранится только в оперативной памяти и теряется сразу после перезагрузки адаптера |

Хранилище можно выбрать в диалоговом окне конфигурации каждого узла, использующего контекст. Если хранилище не выбрано, используется `file`.

**Примечание:** До версии 6.0.8 файловое хранилище называлось `default`. Если вы явно выбрали хранилище в узле, откройте узел и снова выберите `file`, иначе Node-RED выдаст предупреждение о неизвестном контекстном хранилище.

## Аутентификация
### Никто
![Без аутентификации](../../../en/adapterref/iobroker.node-red/img/instance-settings-auth-none.png)

### Простой
![Простая аутентификация](../../../en/adapterref/iobroker.node-red/img/instance-settings-auth-simple.png)

### Расширенный
![Расширенная аутентификация](../../../en/adapterref/iobroker.node-red/img/instance-settings-auth-extended.png)

## Узлы
### IoBroker в
### IoBroker out
### IoBroker get
### IoBroker получить объект
### Список ioBroker
### IoBroker sendTo

## Changelog
### 7.0.2 (2026-08-15)
-   (@GermanBluefox) Allowed to use admin instance with authentication (Admin 7.6.4 is required)
-   (@thiloms) Added an additional memory based context storage (`memoryOnly`)
-   (@thiloms) The file based context storage was renamed from `default` to `file`. Existing data is kept, but nodes with an explicitly selected store must be re-selected in the editor
-   (@GermanBluefox) The adapter backend was rewritten in TypeScript. The sources are now located in `src` and are compiled into `build`
-   (@GermanBluefox) Disabled the node-red notification about a new node-red version, as node-red is updated together with the adapter
-   (@GermanBluefox) Updated nore-red to 5

### 6.0.8 (2025-03-24)
-   (@GermanBluefox) Do not try to connect to unsecure admin from secure page and vice versa

### 6.0.7 (2025-03-24)
-   (@GermanBluefox) Replace Select-ID dialog with a library
-   (@GermanBluefox) Packages were updated

### 6.0.5 (2024-12-30)

-   (@GermanBluefox) Restart node-red if admin settings changed
-   (@GermanBluefox) Node-red updated to 4.0.8

### 6.0.1 (2024-09-30)

-   (@GermanBluefox) Corrected the case if `envVars` settings is undefined
-   (@GermanBluefox) Used common `@iobroker/eslint-config`
-   (@GermanBluefox) Node-red updated to 4.0.3

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

Copyright 2014-2026 bluefox <dogafox@gmail.com>.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.