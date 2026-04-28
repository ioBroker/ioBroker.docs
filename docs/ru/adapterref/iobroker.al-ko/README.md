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
hash: mfnW7nb851CN+8eNR8e8QpAUijOu62ETX0SmdtNp/bY=
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
### 0.3.6 (2026-04-26)
- Исправлены некорректные роли состояния (удалено `value.number`, исправлено использование `value` и `level`)
- Исправлен белый список для состояний, допускающих запись.
- Структура объекта улучшена в соответствии с требованиями проверки.

### 0.3.5 (2026-03-26)
- Включена функция npm Trusted Publishing
- Исправлены предупреждения рабочего процесса GitHub Actions

### 0.3.4 (2026-03-20)
- Исправлена адаптивная разметка в jsonConfig (xs/sm/md/lg/xl)
- Примеры записей i18n (опция 1/опция 2) удалены.

### 0.3.3 (2026-03-13)
- Улучшена обработка WebSocket
- Исправлена обработка сообщений WebSocket `reportedState` от AL-KO.
- Более стабильное восстановление соединения WebSocket.
— Обновлены рабочие процессы GitHub (Dependabot / Automerge)
- Зависимости разработки обновлены

### 0.3.2 (2026-03-12)
- Улучшено переподключение WebSocket после обновления токена
- Предотвращает зацикливание переподключения в преднамеренно закрытых соединениях WebSocket.
- Улучшено логирование ошибок API для push-запросов.
- Добавлено логирование кода закрытия WebSocket и причины ошибки.

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

### 0.3.6
- Fixed invalid state roles (`value.number` removed, correct usage of `value` and `level`)
- Fixed whitelist handling for writable states
- Improved object structure according to review feedback

### 0.3.5 (2026-03-26)

- Enable npm trusted publishing
- Fix GitHub Actions workflow warnings


➡ Full changelog here:  
[CHANGELOG_OLD.md](./CHANGELOG_OLD.md)

---

## License

MIT License

Copyright (c) 2026 Hubert Zechner <hubertiob@posteo.at>

This project is released under the **MIT License**.  
See the included **LICENSE** file for full details.