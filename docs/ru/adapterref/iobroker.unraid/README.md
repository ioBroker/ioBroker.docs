---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.unraid/README.md
title: ioBroker.unraid
hash: Klz4BrytXGLfoSSr+r2o3NOepVL0kjcr7g4bE06sAZo=
---
![Логотип](../../../en/adapterref/iobroker.unraid/admin/unraid.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.unraid.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.unraid.svg)
![Количество установок](https://iobroker.live/badges/unraid-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/unraid-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.unraid.png?downloads=true)

# IoBroker.unraid
> **⚠️ Работа в процессе**: Данный адаптер находится в активной разработке. Дополнительные данные и функции планируются в будущих релизах.

**Тесты:** ![Тестирование и выпуск](https://github.com/ingel81/ioBroker.unraid/workflows/Test%20and%20Release/badge.svg)

## Адаптер Unraid для ioBroker
Этот адаптер подключает ioBroker к серверам Unraid через API GraphQL для мониторинга системных метрик и состояния.

## Функции
- Мониторинг использования ЦП и памяти (включая статистику по каждому ядру)
- Отслеживание состояния сервера и сетевой информации.
- Мониторинг и управление контейнерами Docker (запуск/остановка).
- Просмотр состояния дисков массива (данные, четность, кэш) с информацией о их работоспособности.
- Мониторинг сетевых ресурсов (использование, конфигурация, сведения о файловой системе)
- Мониторинг и управление виртуальными машинами (запуск/остановка/пауза/возобновление/перезагрузка)
- Настраиваемый интервал опроса

## Конфигурация
### Генерация API-токена в Unraid
#### Для версий Unraid до 7.2:
1. Установите плагин **Unraid Connect** из магазина приложений Unraid Community.
2. После установки перейдите по пути: **Настройки → Управление доступом → Ключи API**

#### Для Unraid 7.2 и более поздних версий:
— Функциональность API встроена, перейдите непосредственно по пути: **Настройки → Управление доступом → Ключи API**

#### Создание токена:
1. Нажмите на кнопку «Добавить ключ API».
2. Настройте права доступа:
- **Базовая роль**: Выберите **«Просмотрщик»** (предоставляет доступ на чтение к информации о системе, метрикам, дискам и т. д.)
- **Дополнительные разрешения** (необходимы для функций управления):
- **Менеджер Docker**: Позволяет запускать/останавливать контейнеры Docker.
- **Диспетчер виртуальных машин**: Позволяет запускать, останавливать и приостанавливать работу виртуальных машин.

**Быстрый вариант настройки**: Скопируйте эту строку шаблона и вставьте ее в **API Keys → "Create from template"**:

```
?name=ioBroker+unraid+adapter+key&scopes=role%3Aviewer%2Cdocker%2Bvms%3Acreate_any%2Bdelete_any%2Bread_any%2Bupdate_any%2Carray%2Bdashboard%2Bdisk%2Binfo%2Blogs%2Bnetwork%3Aread_any
```

3. Присвойте токену описательное имя (например, "ioBroker")
4. Скопируйте сгенерированный токен (ключ API) — он понадобится для настройки адаптера.

![API-токен Unraid](../../../en/adapterref/iobroker.unraid/docs/de/img/unraid_token01.png)

### Настройки адаптера
1. **Базовый URL**: Введите адрес вашего сервера Unraid (например, `https://192.168.1.10` или `https://tower.local`)
2. **API-токен**: Вставьте сгенерированный вами в Unraid токен администратора.
3. **Интервал опроса**: Установите частоту получения данных (по умолчанию: 60 секунд, минимум: 10 секунд)
4. **Самоподписанные сертификаты**: Включите эту опцию, если ваш сервер Unraid использует самоподписанный HTTPS-сертификат.
5. **Области данных**: Выберите категории данных для мониторинга (Информация о системе, Состояние сервера, Метрики и т. д.)

### Интерфейс конфигурации
![Конфигурация](../../../en/adapterref/iobroker.unraid/docs/de/img/ioBroker_config01.png)

### Созданные объекты
Адаптер создает структурированное дерево объектов для отслеживаемых данных:

![Объекты](../../../en/adapterref/iobroker.unraid/docs/de/img/ioBroker_objects01.png)<br>

![Управление контейнерами Docker](../../../en/adapterref/iobroker.unraid/docs/de/img/ioBroker_objects02.png)<br>

![Управление виртуальной машиной](../../../en/adapterref/iobroker.unraid/docs/de/img/ioBroker_objects03.png)

## Требования
- Сервер Unraid (рекомендуется версия 7.0.0+)
- Для версий до 7.2: установите плагин "Unraid Connect" из раздела "Приложения сообщества".
- Для версии 7.2 и выше: поддержка API встроена.
- API-токен с ролью "Просмотрщик" (плюс Docker/VM Manager для управления функциями)
- Сетевой доступ от ioBroker к серверу Unraid

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.7.1 (2025-11-30)

- (ingel81) Minor pipeline issues fixed

### 0.7.0 (2025-11-30)

- (ingel81) Migrated admin UI to @iobroker/adapter-react-v5 (React 18, MUI v6)
- (ingel81) Extended Unraid GraphQL schema (CPU package power and temperatures)
- (ingel81) Refined API token documentation with Viewer role permissions
- (ingel81) Updated dependencies (release-script 5.x, adapter-react-v5 8.x)

### 0.6.2 (2025-10-19)

- (ingel81) dependencies updated

### 0.6.2-alpha.1 (2025-10-19)

- (ingel81) npm deployment adjusted pt.2

### 0.6.2-alpha.0 (2025-10-19)

- (ingel81) npm deployment adjusted

### 0.6.1 (2025-09-28)

- (ingel81) fix: Use themecolors in settings

### 0.6.0 (2025-09-24)

- (ingel81) Added VM and Docker container control functionality
- (ingel81) Code refactoring and cleanup
- (ingel81) Translation

### 0.5.3 (2025-09-23)

- (ingel81) Support for node 20, 22 and 24

### 0.5.2 (2025-09-22)

- (ingel81) Documentation
- (ingel81) Minor admin page improvements

### 0.5.1 (2025-09-22)

- (ingel81) ESLint9 Migration
- (ingel81) Code refactor

### 0.5.0 (2025-09-21)

- (ingel81) More Unraid queries: Docker containers, shares, VMs, array disks with dynamic state creation,
- (ingel81) Apollo Client migration

### 0.4.1 (2025-09-21)

- (ingel81) Documentation

### 0.4.0 (2025-09-21)

- (ingel81) Adapter renamed to iobroker.unraid

### 0.3.0 (2025-09-21)

- (ingel81) Translations
- (ingel81) Logo
- (ingel81) Readme

### 0.2.2 (2025-09-21)

- (ingel81) Release testing with npm, reloaded2

## License

MIT License

Copyright (c) 2025 ingel81 <ingel81@sgeht.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.