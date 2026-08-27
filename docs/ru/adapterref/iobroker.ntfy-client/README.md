---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ntfy-client/README.md
title: ioBroker.ntfy-client
hash: T6o4lKkNpKm22ELPVEGcrI8UXHtzheamg4I7ub8IpQU=
---
![Логотип](../../../en/adapterref/iobroker.ntfy-client/admin/ntfy-client.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ntfy-client.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ntfy-client.svg)
![Количество установок](https://iobroker.live/badges/ntfy-client-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/ntfy-client-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ntfy-client.png?downloads=true)

# IoBroker.ntfy-client
**Тесты:** [![Тестирование и выпуск](https://github.com/lubepi/ioBroker.ntfy-client/workflows/Test%20and%20Release/badge.svg)](https://github.com/lubepi/ioBroker.ntfy-client/actions?query=workflow%3A%22Test+and+Release%22)

Неофициальный клиентский адаптер ntfy.sh для ioBroker

Отправляйте и получайте уведомления через [ntfy.sh](https://ntfy.sh) напрямую из ioBroker. Этот адаптер является проектом сообщества и не связан с ntfy LLC.

### Функции
- **Публикация уведомлений** с полной поддержкой параметров ntfy.
— **Подписывайтесь на темы** и получайте сообщения в режиме реального времени через SSE (Server-Sent Events).
- **Статистика учетной записи** – просмотр статистики использования (сообщения, электронные письма, звонки, вложения, бронирования)
- **Проверка версии сервера** – обнаружение доступных обновлений для самостоятельно размещенных экземпляров ntfy.
- **Состояние подключения** – мониторинг подключения адаптера к серверу NTFI с помощью динамических проверок работоспособности.
— Поддержка базовой аутентификации и токенов носителя.
- Пользовательские URL-адреса сервера (или стандартный экземпляр ntfy.sh)
- **Встроенные блоки Blockly `sendTo`** для графических скриптов (отправка и управление)
- **Отклонить (очистить) и удалить уведомления** по идентификатору последовательности
- Загрузка файлов с помощью команды PUT

### Поддерживаемые параметры уведомлений
| Параметр | Описание |
| -------------- | ---------------------------------------------------------------------------------- |
| `message` | Текст уведомления (по умолчанию "сработало", если текст пуст) |
| `title` | Заголовок уведомления |
| `priority` | Уровень приоритета: 1 (мин), 2 (низкий), 3 (по умолчанию), 4 (высокий), 5 (макс) |
| `tags` | Теги или короткие коды эмодзи (строка или массив, разделенные запятыми) |
| `click` | URL открывается при нажатии на уведомление |
| `attach` | URL файла для прикрепления |
| `attach_file` | Локальный путь к файлу для загрузки в качестве вложения (используется PUT) |
| `filename` | Пользовательское имя файла для вложения |
| `actions` | Кнопки действий (строка JSON или объект) |
| `markdown` | Включить форматирование Markdown (`true`/`false`) |
| `delay` | Задержка доставки (например, "30 с", "5 м", "2 ч") |
| `email` | Переслать уведомление на этот адрес электронной почты |
| `call` | Номер телефона для звонка с использованием синтеза речи (требуется ntfy Pro) |
| `icon` | URL значка, отображаемый рядом с уведомлением |
| `sequence_id` | Заменить/обновить существующее уведомление с тем же идентификатором последовательности |
| `disable_cache` | Установите значение `true`/`yes`, чтобы отключить кэширование на стороне сервера |
| `disable_firebase` | Установите значение `true`/`yes`, чтобы отключить пересылку в Firebase Cloud Messaging (Android) |
| `unified_push` | Установите значение `1`, чтобы включить поддержку UnifiedPush |
| `template` | Используйте `true`/`yes` для встроенных шаблонов или имя, например `github`, для предопределенных |
| `data` | Объект данных JSON или строка, используемая в контексте шаблона |
| `data` | Объект данных JSON или строка, используемая в контексте шаблона |

### Подписка на темы (получение сообщений)
Настройте темы в параметрах адаптера на вкладке **Темы**. Адаптер подписывается на эти темы через SSE и создает состояния для каждой темы в разделе `ntfy-client.0.topics.<topicName>`:

| Штат | Описание |
| ----------------------- | ----------------------------------------- |
| `lastMessage` | Текст последнего полученного сообщения |
| `lastPriority` | Последний полученный приоритет |
| `lastTags` | Последние полученные теги (разделенные запятыми) |
| `lastClick` | URL последнего полученного клика |
| `lastIcon` | URL последнего полученного значка |
| `lastActions` | Последние полученные действия (JSON) |
| `lastAttachmentUrl` | URL последнего полученного вложения |
| `lastAttachmentName` | Название последнего полученного вложения |
| `lastAttachmentType` | MIME-тип последнего полученного вложения |
| `lastAttachmentSize` | Размер последнего полученного вложения (байты) |
| `lastAttachmentExpires` | Отметка времени истечения срока действия последнего полученного вложения |
| `lastTimestamp` | Отметка времени последнего сообщения |
| `lastExpires` | Отметка времени истечения срока действия последнего сообщения |
| `lastMessageId` | ID последнего сообщения |
| `lastSequenceId` | Последний идентификатор последовательности (для управления сообщениями) |
| `lastTopic` | Название последней полученной темы |
| `lastEvent` | Последний полученный тип события |
| `lastJson` | Полный JSON последнего полученного сообщения |
| `subscribed` | Активна ли подписка |
| `подписано` | Активна ли подписка |

### Статистика аккаунта
При настройке аутентификации адаптер получает статистику по учетной записи каждые 15 минут и сохраняет ее в папке `ntfy-client.0.stats`:

- **Сообщения**: опубликовано, осталось, лимит, срок действия
- **Электронные письма**: отправлено, осталось, лимит
- **Телефонные звонки**: совершено, остаток, лимит
- **Зарезервированные темы**: количество, оставшиеся, лимит
- **Вложения**: использованное/оставшееся/лимит хранилища, срок действия, лимит размера файла, лимит пропускной способности
- **Учетная запись**: уровень подписки

### Проверка состояния соединения и работоспособности
Адаптер отслеживает соединение с сервером ntfy через состояние `info.connection`:

| Штат | Описание |
| ---------------------- | ------------------------------------------- |
| `info.connection` | Статус подключения к серверу ntfy |
| `info.latestVersion` | Последняя доступная версия (только для самостоятельного размещения) |
| `info.updateAvailable` | Доступно ли обновление сервера |
| `info.updateAvailable` | Доступно ли обновление сервера |

Проверка работоспособности выполняется для конечной точки `/v1/health` с **динамическими интервалами**:

- **Каждые 6 часов**, когда сервер исправен.
- **Каждые 5 минут**, если последняя проверка не удалась (для более быстрого восстановления)

Кроме того, статус подключения автоматически устанавливается в состояние **подключено** в следующих случаях:

- Уведомление успешно отправлено
- Подписка SSE успешно подключена
- Получено сообщение по теме, на которую оформлена подписка.

### Примеры Blockly
В категории **Отправить** используйте следующие блоки:

#### 1. Уведомление ntfy-client (отправка)
Отправьте сообщение со всеми поддерживаемыми параметрами:

1. Установите **экземпляр**.
2. Установите **сообщение**.
3. Укажите **тему** (или оставьте поле пустым, чтобы использовать тему по умолчанию).
4. При желании можно добавить дополнительные параметры с помощью **мутатора** (значок шестеренки): заголовок, приоритет, теги, значок, URL-адрес клика, действия, вложения, задержка, электронная почта, звонок и т. д.
5. Используйте **идентификатор последовательности**, если вы хотите обновить/перезаписать существующее уведомление позже.

#### 2. Управление ntfy-клиентом (manage)
Очистить или удалить существующее уведомление:

1. Установите **экземпляр**.
2. Установите **действие** (пометить как прочитанное и закрыть или удалить).
3. Определите **тему**.
4. Укажите **идентификатор последовательности** сообщения, которым вы хотите управлять.

> **Примечание об идентификаторах:** Каждому уведомлению сервер присваивает уникальный `id` (идентификатор сообщения).
> > - Если вы **указываете** `sequence_id` при отправке, вы **должны использовать этот `sequence_id`** для всех действий управления (отклонить, удалить).
> - Если вы **не указываете** `sequence_id`, то сгенерированный сервером `id` (идентификатор сообщения) служит `sequence_id` для управления.
> > Несколько сообщений, имеющих один и тот же `sequence_id`, образуют последовательность — отображается только последнее сообщение в последовательности.

### Примеры на JavaScript
#### Отправить уведомление
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Motion detected in the backyard!",
  title: "Security Alert",
  topic: "home_alerts_xyz",
  priority: "high",
  tags: "warning,motion",
  click: "https://example.com",
  markdown: true,
});
```

#### Отправить с пересылкой электронной почты и иконкой
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Temperature above threshold!",
  topic: "home_alerts_xyz",
  email: "admin@example.com",
  icon: "https://example.com/icon.png",
  priority: "4",
});
```

#### Отправить с прикрепленным файлом
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Security camera snapshot",
  topic: "home_alerts_xyz",
  attach_file: "/tmp/snapshot.jpg",
  filename: "camera_snapshot.jpg",
});
```

#### Отправка с помощью кнопок действий
```javascript
sendTo("ntfy-client.0", "send", {
  message: "Doorbell rang!",
  topic: "home_alerts_xyz",
  actions: [
    { action: "view", label: "Open Camera", url: "https://camera.example.com" },
    {
      action: "http",
      label: "Turn on Light",
      url: "https://ha.example.com/api/light/on",
      method: "POST",
    },
  ],
});
```

#### Отправить с использованием шаблона (встроенный / вручную)
Используйте поле `message` в качестве шаблонной строки и укажите контекст JSON в поле `data`:

```javascript
sendTo("ntfy-client.0", "send", {
  topic: "home_alerts_xyz",
  template: true,
  message: "Current temperature is {{.temp}}°C from {{.sensor}}",
  data: { temp: 42, sensor: "living_room" },
});
```

#### Отправка с использованием шаблона (предопределенного / например, GitHub)
Для предопределенных шаблонов, таких как `github`, укажите исходные JSON-данные веб-перехватчика в поле `data`. Структура данных должна соответствовать тому, что отправляет исходный сервис ([см. исходный код шаблона](https://github.com/binwiederhier/ntfy/blob/main/server/templates/github.yml)):

```javascript
sendTo("ntfy-client.0", "send", {
  topic: "github_webhooks",
  template: "github",
  data: {
    action: "opened",
    issue: {
      number: 42,
      title: "Found a bug",
      html_url: "https://github.com/my/repo/issues/42",
      user: { html_url: "https://github.com/octocat" },
    },
    repository: {
      full_name: "my/repo",
      html_url: "https://github.com/my/repo",
    },
  },
});
```

> **Примечание:** Предопределенные шаблоны ожидают **точно такую же структуру данных**, как и исходный сервис. Отсутствующие или неправильно названные поля будут отображаться как `<no value>`. Для полного контроля над форматированием используйте вместо этого встроенный шаблон (`template: true`).

#### Отклонить уведомление
```javascript
sendTo("ntfy-client.0", "dismiss", {
  topic: "home_alerts_xyz",
  sequence_id: "abc123",
});
```

#### Удалить уведомление
```javascript
sendTo("ntfy-client.0", "delete", {
  topic: "home_alerts_xyz",
  sequence_id: "abc123",
});
```

### Аутентификация
Ntfy поддерживает несколько вариантов:

- **Нет**: Подходит для стандартных серверов ntfy.sh (темы публичные!).
- **Базовая аутентификация**: Настройте локальный сервер с именем пользователя и паролем.
- **Токен доступа**: Создайте токены и используйте проверку токенов Bearer для вашей темы.

### Команды
| Команда | Описание |
| ------------------- | ---------------------------------------------------- |
| `send` / `publish` | Отправить уведомление |
| `delete` | Удалить уведомление по sequence_id |
| `delete` | Удалить уведомление по sequence_id |

## Юридическое уведомление
Этот адаптер **НЕ** является официальным продуктом ntfy LLC. Название **ntfy**, логотип и фирменная символика являются товарными знаками ntfy LLC. Этот адаптер — проект сообщества, предназначенный для интеграции с ioBroker.

## Changelog

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.4 (2026-06-07)

- (lubepi) **FIXED**: Adapter now creates missing parent folder objects (stats, topics) so they appear correctly in the object tree
- (lubepi) **FIXED**: Corrected state roles for attachment-related states (storage, file size, bandwidth)
- (lubepi) **ENHANCED**: Hardened error handling throughout the adapter and extracted reusable helper methods
- (lubepi) **ENHANCED**: Cleaned up orphaned translation keys from all language files

### 0.1.3 (2026-04-12)
- (lubepi) Refactor: Move internal config signature to local file storage (remove useless object from tree)

### 0.1.2 (2026-04-12)
- (lubepi) Update axios due to critical security fixes (SSRF, Header Injection)

### 0.1.1 (2026-04-12)
- (lubepi) Reset runtime states on server or account configuration changes
- (lubepi) Mask credentials in logs and only log the configured authentication type

### 0.1.0 (2026-04-12)
- (lubepi) Initial release with full ntfy.sh support
- Subscribe to topics via SSE (receive messages in real-time)
- Publish notifications with all ntfy parameters (title, priority, tags, click, attach, actions, markdown, delay, email, call, icon, sequence_id, disable_cache, disable_firebase, unified_push, template)
- File upload attachments via PUT
- Dismiss and delete notifications by sequence_id
- Account statistics (messages, emails, calls, attachments, reservations)
- Server version check for self-hosted instances
- Dynamic connection status monitoring with health checks
- Blockly blocks for sending and managing notifications
- Full i18n support (en, de, ru, pt, nl, fr, it, es, pl, uk, zh-cn)

[Older changes can be found here](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 lubepi

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