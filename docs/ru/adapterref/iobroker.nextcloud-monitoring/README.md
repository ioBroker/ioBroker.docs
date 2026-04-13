---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nextcloud-monitoring/README.md
title: ioBroker.nextcloud-monitoring
hash: momSlqN6CXpmBHPru4FOT30LKaT66YrCXQSfXks16wM=
---
![Логотип](../../../en/adapterref/iobroker.nextcloud-monitoring/admin/nextcloud_monitoring.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.nextcloud-monitoring.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/nextcloud-monitoring-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nextcloud-monitoring.svg)
![Количество установок](https://iobroker.live/badges/nextcloud-monitoring-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.nextcloud-monitoring.png?downloads=true)

# IoBroker.nextcloud-monitoring
**Тесты:** ![Тестирование и выпуск](https://github.com/H5N1v2/iobroker.nextcloud-monitoring/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и инструкций по отключению сообщений об ошибках, пожалуйста, обратитесь к разделу [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Использование системы отчетов Sentry начинается с версии js-controller 3.0.

Я использую собственный сервер Sentry на базе Glitchtip.

# Адаптер nextcloud-monitoring для ioBroker
---

## ⚠️ Важное примечание: Изменение соглашения об именовании (версия 1.1.2+)
> **ВНИМАНИЕ:** В соответствии с официальными правилами именования ioBroker, этот адаптер был переименован из `nextcloud_monitoring` (подчеркивание) в **`nextcloud-monitoring`** (тире).

**Что это значит для вас?**

* **Автоматические обновления отсутствуют:** Если вы используете версию 1.1.1 или более старую, вы больше не будете получать обновления через старое имя пакета.
* **Требуется переустановка:** Пожалуйста, удалите старую версию (`nextcloud_monitoring`) и установите новую версию (`nextcloud-monitoring`) через репозиторий ioBroker или GitHub.
* **Настройки:** В новой версии вам потребуется повторно ввести конфигурацию вашего экземпляра.

Приносим извинения за неудобства, но это изменение было необходимо для соответствия официальным стандартам репозитория ioBroker.

--

## Описание
### Во-первых: если вам нужен виджет специально для этого адаптера, создайте его с помощью [VIS2-widget-nextcloud-monitoring](https://github.com/H5N1v2/VIS2-widget-nextcloud-monitoring)
Этот адаптер позволяет осуществлять детальный мониторинг вашего экземпляра Nextcloud через официальный API OCS (`serverinfo`). Он предоставляет множество системных данных, статистику пользователей, информацию о распределении ресурсов, а также показатели производительности PHP (OPcache/FPM) и базы данных непосредственно в ioBroker.

## Функции
* **Состояние системы:** загрузка ЦП, использование ОЗУ, свободное место на диске и версия Nextcloud.
* **Статистика пользователей:** Количество активных пользователей (5 мин, 1 ч, 24 ч), общее количество файлов и использование хранилища.
* **Общие ресурсы:** Мониторинг общих ресурсов, чатов и объединенных ресурсов.
* **Состояние сервера:** версия PHP, лимит памяти, частота попаданий в OPcache и подробная статистика процесса FPM.
* **Виджет:** Специальный виджет для мониторинга Nextcloud доступен [ЗДЕСЬ](https://github.com/H5N1v2/VIS2-widget-nextcloud-monitoring).

---

## Установка и настройка
### 1. Настройки подключения
* **Домен:** Введите свой домен Nextcloud без `https://` (например, `cloud.yourdomain.com`).
* **Токен:** Токен API OCS для вашего Nextcloud (см. раздел «Как использовать: Токен»).
* **Интервал обновления:** Время в минутах между запросами к API (по умолчанию: 10 мин, минимум: 5 мин).
* **Многосерверная поддержка:** Теперь вы можете добавлять несколько серверов, например: my_server_1, и следующий сервер, например: other_server_2

### 2. Параметры данных
* **Пропустить приложения:** Отключает подробный список установленных приложений для снижения нагрузки на API.
* **Пропустить проверку обновлений:** Отключает проверку наличия новых версий Nextcloud.

---

# Инструкция: Создание и установка токена
Для доступа к API `serverinfo` требуется действительный токен API. Этот токен необходимо сохранить непосредственно в конфигурации Nextcloud.

### Генерация токена (Linux / Windows)
Для предоставления доступа необходимо сгенерировать токен (случайную строку) и зарегистрировать его в вашем экземпляре Nextcloud с помощью инструмента `occ`.

**Команда для генерации токена:**

* **Linux (терминал):**

`openssl rand -hex 32`

* **Windows (PowerShell):**

`$bytes = New-Object Byte[] 32; (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [System.BitConverter]::ToString($bytes).Replace("-", "").ToLower()`

* В качестве альтернативы вы можете использовать онлайн-инструменты, такие как

[it-tools.tech/token-generator](https://it-tools.tech/token-generator).*

# Установка токена в Nextcloud
**Пример для Linux (стандартный путь) в терминале:**

```bash
sudo -u www-data php /path_to/your/nextcloud_folder/occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
```

**Пример для Linux (непосредственно в папке Nextcloud) в терминале:**

```bash
sudo -u www-data php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
```

**Если вы используете Nextcloud в веб-пространстве или у другого провайдера, в большинстве случаев вам не потребуется sudo, просто выполните следующие действия:**

```bash
#Directly in your Nextcloudfolder
hp occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN

 Or with path
hp /path_to/your/nextcloud_folder/occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
``

Команда для Windows (PowerShell/CMD): Перейдите в каталог Nextcloud и выполните:

`php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN`

Отслеживаемые точки данных (выдержка)

| Путь | Описание | Тип данных |
| :--- | :--- | :--- |
| `system.version` | Установленная версия Nextcloud | строка |
| `system.freespace` | Свободное место на диске | строка |
| `storage.num_users` | Общее количество пользователей | число |
| `server.php.opcache_hit_rate` | Эффективность кэша PHP | строка |
| `fpm.active_processes` | Активные процессы PHP-FPM | количество |
| `activeUsers.last5min` | Пользователи, активные за последние 5 минут | количество |
| `activeUsers.last5min` | Пользователи, активные за последние 5 минут | число |

# Устранение неполадок (Часто задаваемые вопросы)
### Недопустимый домен: Введите домен без протокола.
Правильно: mycloud.com или mycloud.com/folder

Неверно: https://mycloud.com или http://mycloud.com/folder

### API не предоставляет данных:
Убедитесь, что приложение «Информация о сервере» (стандартное приложение) включено в Nextcloud в разделе «Приложения». Без этого приложения адаптер не сможет получать данные.

### Ошибка токена:
Проверьте правильность сохранения токена в Nextcloud, используя следующую команду:

* В Linux:

`sudo -u www-data php /path_to/your/nextcloud_folder/occ config:app:get serverinfo token`

* Или, если вы находитесь непосредственно в папке, используйте:

`sudo -u www-data php occ config:app:get serverinfo token`

* Если вы используете Nextcloud в веб-пространстве или у другого провайдера, в большинстве случаев вам не потребуется sudo:

`php occ config:app:get serverinfo token` или `php /path_to/your/nextcloud_folder/occ config:app:get serverinfo token`

### Режим технического обслуживания:
Если ваш Nextcloud находится в режиме обслуживания, адаптер не сможет получать данные и запишет в лог сообщение с информацией. Это нормальное поведение, поскольку API отключен во время обслуживания.

## Поддержка и обратная связь
Если вы обнаружите какие-либо **ошибки**, у вас есть **предложения по улучшению функций** или вы хотите внести **поправки**, пожалуйста, не стесняйтесь создавать **проблемы** на GitHub. Это поможет отслеживать прогресс и поможет другим пользователям с аналогичными проблемами.

[👉 Откройте новую заявку здесь](https://github.com/H5N1v2/iobroker.nextcloud-monitoring/issues)

---

## Changelog
### 2.0.6 (2026-03-30)
* (H5N1v2) Update axios dependency to version 1.14.0

### 2.0.5 (2026-03-26)
* (H5N1v2) add sentry plugin to automatically report errors to developer

### 2.0.4 (2026-03-25)
* (H5N1v2) update @types/node dependency to version 22.19.15
* (mcm1957) fix: update opcache hit rate state type from string to number

### 2.0.3 (2026-03-18)
* (mcm1957) fix: reevaluate state roles
* (mcm1957) fix: creation of intermediate objects missing

### 2.0.2 (2026-03-05)
* (H5N1v2) fix: language used for stateIds and names
* (H5N1v2) fix: creation of intermediate objects missing
* (H5N1v2) chore: update dependencies to latest versions
* (H5N1v2) added axios in dependencies

### 2.0.1 (2026-02-05)
* (H5N1v2) fix: Optimize state creation by caching existing states
* (H5N1v2) fix: Set Connection header to 'close' in API request

### 2.0.0 (2026-01-16)
* (H5N1v2) Added Multi-Server Support: You can now manage and monitor multiple Nextcloud instances within a single adapter instance using a dynamic table configuration.
* (H5N1v2) Refactored State Structure: Reorganized the object tree to provide a cleaner and more logical hierarchy for all monitored data.
* (H5N1v2) Expanded Data Points: Added several new monitoring points including detailed PHP Opcache, APCu stats, and FPM process information.
* (H5N1v2) Enhanced Localization: Updated and added comprehensive translations for 11 languages (DE, EN, IT, FR, ES, NL, RU, UK, ZH-CN, PL, PT).
* (H5N1v2) Improved Admin UI: Integrated a dynamic table-based management system with helpful tooltips and descriptions for better user experience.

### 1.1.3 (2026-01-14)
* (H5N1v2) repair tsconfig and cleanup release config

### 1.1.2 (2026-01-14)
* (H5N1v2) Change name from nextcloud_monitoring to nextcloud-monitoring
* (H5N1v2) Improved handling of Nextcloud maintenance mode (logged as info instead of error)

### 1.1.1 (2026-01-13)
* (H5N1v2) fixed: repository URLs and naming conventions
* (H5N1v2) added: encrypted and protected native support for tokens

### 1.1.0

* (H5N1v2) Initial release.
* (H5N1v2) Multi-language support for object names (DE/EN/IT/ES/RU etc.).
* (H5N1v2) Support for OCS API Token.
* (H5N1v2) Integrated dynamic update interval.

---

## License
MIT License

Copyright (c) 2026 H5N1v2 <h5n1@iknox.de>

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