---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.al-ko.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.al-ko.svg
BADGE-Number of Installations: https://iobroker.live/badges/al-ko-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/al-ko-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.al-ko.png?downloads=true
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.al-ko/README.md
title: ioBroker.al-ko – немецкая документация
hash: kWJTXjzNI4eSIS0CkGJ3ZfGnZsHvJB8XFSnoO+w7sf4=
---
# IoBroker.al-ko – немецкая документация
![логотип](../../../de/admin/al-ko-128.png)

## Обзор
Адаптер ioBroker.al-ko интегрирует **роботизированные газонокосилки AL-KO Robolinho** и другие устройства AL-KO Smart Garden в платформу ioBroker.

Обмен данными осуществляется через **официальный облачный API AL-KO**, включая обновления в реальном времени через WebSocket.

---

## Функции
- Подключение к официальному API облака AL-KO
- Автоматическое создание всех читаемых состояний
- Записываемые состояния контролируются с помощью белого списка.
- Изменения передаются в AL-KO (желаемое состояние) через PATCH.
- Обновления в режиме реального времени через WebSocket
- Поддержка нескольких устройств
- Совместимо с современными компонентами ioBroker Admin / jsonConfig

---

## Требования
Для использования API AL-KO необходимы данные для доступа:

Запросить можно здесь: ➡ https://alko-garden.at/iot-api-zugang-anfordern/

Необходимый:

- Имя пользователя
- Пароль
- Идентификатор клиента
- Секрет клиента

Введите в разделе: **Экземпляры → al-ko → Конфигурация**

---

## Отказ от ответственности
Этот адаптер — **проект сообщества**.

AL-KO **не предоставляет официальной поддержки** для него.

---

## Изменения (отрывок)
### 0.3.11 (2026-05-07)
- Проблемы с непрерывной интеграцией решены, рабочий процесс стабилизирован.
— Обновлены инструменты выпуска
Требуется версия Node.js >= 22.13.0.
- Улучшено качество кода (eslint/prettier)

### 0.3.10 (2026-05-07)
- i18n переключился на короткий формат
- tsconfig адаптирован для Node.js 22
— Требование к Node.js повышено до >=22.13.0
- Конфигурация CI стабилизирована

### 0.3.9 (2026-05-07)
- Добавлена недостающая запись в журнале изменений для версии 0.3.8
- Сравнение версий

### 0.3.8 (2026-05-07)
- Проблемы с CI/npm Publish решены
- Зависимости обновлены
- Улучшения стабильности

### 0.3.7 (2026-05-07)
— Обновлены зависимости (включая исправления безопасности Axios)
Требуется Node.js версии 22 или выше.
- Улучшения стабильности

### 0.3.6 (2026-04-26)
- Исправлены некорректные роли состояния (удалено `value.number`, исправлено использование `value` и `level`)
- Исправлен белый список для состояний, допускающих запись.
- Структура объекта улучшена в соответствии с требованиями проверки.

### 0.3.5 (2026-03-26)
- Включена функция npm Trusted Publishing
- Исправлены предупреждения рабочего процесса GitHub Actions

Полный список изменений смотрите здесь: ➡ [CHANGELOG_OLD.md](../../CHANGELOG_OLD.md)

Ключевые нововведения:

- Улучшена структура объекта
- Пересмотренная система регистрации
- Улучшена очистка идентификационных данных
- Глобальные тайм-ауты и таймеры, безопасные для адаптеров.
- Документация пересмотрена

---

## Лицензия
Опубликовано под лицензией **MIT**.

## Changelog

### 0.3.11 (2026-05-07)
- Fixed CI issues and stabilized workflow
- Updated release tooling
- Require Node.js >= 22.13.0
- Improved code quality (eslint/prettier)

### 0.3.10 (2026-05-07)
- Migrated i18n to short format
- Aligned tsconfig with Node.js 22
- Updated Node.js requirement to >=22.13.0
- Stabilized CI configuration

### 0.3.9 (2026-05-07)
- Fixed missing changelog entry for 0.3.8
- Version alignment

### 0.3.8 (2026-05-07)
- Fixed CI/npm publish issues
- Updated dependencies
- Stability improvements

### 0.3.7 (2026-05-07)
- Updated dependencies (including axios security fixes)
- Require Node.js >= 22
- Stability improvements


➡ Full changelog here:  
[CHANGELOG_OLD.md](./CHANGELOG_OLD.md)

---

## License

MIT License

Copyright (c) 2026 Hubert Zechner <hubertiob@posteo.at>

This project is released under the **MIT License**.  
See the included **LICENSE** file for full details.