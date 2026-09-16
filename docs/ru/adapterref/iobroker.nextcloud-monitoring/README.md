---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nextcloud-monitoring/README.md
title: ioBroker.nextcloud-monitoring
hash: mvu7g+auWg97ABYzlrU97koyuwyBrvQAaxxLxYCSS1I=
---
![Логотип](../../../en/adapterref/iobroker.nextcloud-monitoring/admin/nextcloud_monitoring.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.nextcloud-monitoring.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/nextcloud-monitoring-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.nextcloud-monitoring.svg)
![Количество установок](https://iobroker.live/badges/nextcloud-monitoring-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.nextcloud-monitoring.png?downloads=true)
![Тестирование и выпуск](https://github.com/H5N1v2/iobroker.nextcloud-monitoring/workflows/Test%20and%20Release/badge.svg)

# ioBroker.nextcloud-monitoring

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и инструкций по отключению сообщений об ошибках, пожалуйста, обратитесь к [документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Использование системы отчетности Sentry начинается с версии js-controller 3.0.

Я использую собственный сервер Sentry на базе Glitchtip.

---

## Описание

Этот адаптер позволяет осуществлять детальный мониторинг вашего экземпляра Nextcloud через официальный API OCS.`serverinfo` Он предоставляет многочисленные системные данные, статистику пользователей, информацию о распределении ресурсов, а также показатели производительности PHP (OPcache/FPM) и базы данных непосредственно в ioBroker.

## Функции

- **Состояние системы:** загрузка ЦП, использование ОЗУ, свободное место на диске и версия Nextcloud.
- **Статистика пользователей:** количество активных пользователей (5 мин, 1 ч, 24 ч), общее количество файлов и объем используемого хранилища.
- **Совместное использование ресурсов:** Мониторинг обмена ссылками, чатов и объединенных ресурсов.
- **Состояние сервера:** версия PHP, лимит памяти, частота попаданий в OPcache и подробная статистика процесса FPM.
- **Виджет:** Используйте встроенный виджет, который создает точку данных htmlWidget в папке location; или, если вы хотите настроить его самостоятельно, используйте [этот](https://github.com/H5N1v2/VIS2-widget-nextcloud-monitoring) .

---

## Установка и настройка

### 1. Настройки подключения

- **Домен:** Введите свой домен Nextcloud без`https://` (например,`cloud.yourdomain.com` ).
- **Токен:** Токен API OCS для вашего Nextcloud (см. раздел «Как использовать: Токен»).
- **Интервал обновления:** время в минутах между запросами к API (по умолчанию: 10 мин, минимум: 5 мин).
- **Добавление нескольких серверов:** Теперь вы можете добавить несколько серверов, например, my\_server\_1, и следующий сервер, например, other\_server\_2.
- **Виджет:**

1. **Включить:** Установите флажок «Создать виджет» в настройках экземпляра для вашего местоположения.
2. **Найти состояние:** Адаптер создаст состояние с именем`htmlWidget` (под`nextcloud-monitoring.0.SERVERNAME.htmlWidget` ).
3. **В VIS/VIS2:** \* Перетащите стандартный **виджет "HTML"** на ваше представление.
   - Установите свойство "HTML" этого виджета в соответствии с привязкой вашего состояния:`{nextcloud-monitoring.0.SERVERNAME.htmlWidget}` .
   - Отрегулируйте ширину и высоту контейнера виджета в соответствии с содержимым.

### 2. Варианты данных

- **Пропустить приложения:** Отключает подробный список установленных приложений для снижения нагрузки на API.
- **Пропустить проверку обновлений:** Отключает проверку наличия новых версий Nextcloud.

---

## Инструкция: Создание и установка токена

Доступ к`serverinfo` Для работы API требуется действительный API-токен. Этот токен должен храниться непосредственно в конфигурации Nextcloud.

### Сгенерировать токен (Linux / Windows)

Для предоставления доступа необходимо сгенерировать токен (случайную строку) и зарегистрировать его в вашем экземпляре Nextcloud, используя...`occ` инструмент.

**Команда для генерации токена:**

- **Linux (Терминал):**

`openssl rand -hex 32`

- **Windows (PowerShell):**

`$bytes = New-Object Byte[] 32; (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [System.BitConverter]::ToString($bytes).Replace("-", "").ToLower()`

- В качестве альтернативы вы можете использовать онлайн-инструменты, такие как

[it-tools.tech/token-generator](https://it-tools.tech/token-generator) .\*

## Установить токен в Nextcloud

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
php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN

#Or with path
php /path_to/your/nextcloud_folder/occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN
```

Команда для Windows (PowerShell/CMD): Перейдите в каталог Nextcloud и выполните:

`php occ config:app:set serverinfo token --value YOUR_GENERATED_TOKEN`

Отслеживаемые точки данных (выдержка)

| Путь                          | Описание                                   | Тип данных |
| :---------------------------- | :----------------------------------------- | :--------- |
| `system.version`              | Установлена версия Nextcloud.              | нить       |
| `system.cpuload_1`            | Загрузка ЦП за последнюю минуту            | число      |
| `system.freespace`            | Свободное место на диске                   | нить       |
| `storage.num_users`           | Общее количество пользователей             | число      |
| `server.php.opcache_hit_rate` | Эффективность кэширования PHP              | нить       |
| `fpm.active_processes`        | Активные процессы PHP-FPM                  | число      |
| `activeUsers.last5min`        | Пользователи, активные в последние 5 минут | число      |

## Устранение неполадок (Часто задаваемые вопросы)

### Недопустимый домен: введите домен без протокола.

```
Correct: mycloud.com or mycloud.com/folder

Incorrect: https://mycloud.com or http://mycloud.com/folder
```

### API не предоставляет никаких данных:

Убедитесь, что приложение «Информация о сервере» (стандартное приложение) включено в Nextcloud в разделе «Приложения». Без этого приложения адаптер не сможет получать данные.

### Ошибка токена:

Проверьте правильность сохранения токена в Nextcloud, используя следующую команду:

- В Linux:

`sudo -u www-data php /path_to/your/nextcloud_folder/occ config:app:get serverinfo token`

- Или, если вы находитесь непосредственно в папке, используйте:

`sudo -u www-data php occ config:app:get serverinfo token`

- Если вы используете Nextcloud в веб-пространстве или у другого провайдера, в большинстве случаев вам не потребуется использовать команду sudo:

`php occ config:app:get serverinfo token` или`php /path_to/your/nextcloud_folder/occ config:app:get serverinfo token`

### Режим технического обслуживания:

Если ваш Nextcloud находится в режиме обслуживания, адаптер не сможет получать данные и запишет в лог сообщение с информацией. Это нормальное поведение, поскольку API отключен во время обслуживания.

## Поддержка и обратная связь

Если вы обнаружите какие-либо **ошибки** , у вас есть **пожелания по улучшению функционала** или вы хотите внести предложения **по усовершенствованию** , пожалуйста, не стесняйтесь создавать **Issue** на GitHub. Это поможет отслеживать прогресс и поможет другим пользователям с аналогичными проблемами.

[👉 Откройте новую заявку здесь](https://github.com/H5N1v2/iobroker.nextcloud-monitoring/issues)

---

## Changelog
### 2.1.1 (2026-07-06)
* (H5N1v2) chore: update dependencies
* (H5N1v2) fix: [W5612] add translations for 'your-cloud.com' in multiple languages
* (H5N1v2) fix: [E6025] README.md must contain exactly one H1 heading, but found 6.

### 2.1.0 (2026-05-09)
* (H5N1v2) widget toggleable in the admin area.
* (H5N1v2) update dependencies.
* (copilot) Adapter requires node.js >= 22 now.

### 2.0.6 (2026-03-30)
* (H5N1v2) Update axios dependency to version 1.14.0

### 2.0.5 (2026-03-26)
* (H5N1v2) add sentry plugin to automatically report errors to developer

### 2.0.4 (2026-03-25)
* (H5N1v2) update @types/node dependency to version 22.19.15
* (mcm1957) fix: update opcache hit rate state type from string to number

[Older changelogs can be found there](https://github.com/H5N1v2/ioBroker.nextcloud-monitoring/blob/main/CHANGELOG_OLD.md)

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