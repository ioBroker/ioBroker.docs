---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hassemu/README.md
title: <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hassemu@main/admin/hassemu.svg" width="48" align="top" /> ioBroker.hassemu
hash: /lJG327SVBLROodZOHrPZr6Y++7D0fw3o4O92npA/kU=
---
# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.hassemu@main/admin/hassemu.svg" width="48" align="top" /> ioBroker.hassemu

![npm версия](https://img.shields.io/npm/v/iobroker.hassemu)
![стабильный](https://iobroker.live/badges/hassemu-stable.svg)
![Установки](https://iobroker.live/badges/hassemu-installed.svg)
![npm downloads](https://img.shields.io/npm/dt/iobroker.hassemu)
![Узел](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![Машинопись](https://img.shields.io/badge/TypeScript-strict-blue)
![Лицензия](https://img.shields.io/badge/license-MIT-green)
![Часовой](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)
![Ко-фи](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)
![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)

Имитирует сервер Home Assistant, поэтому на дисплеях, принимающих только панели управления HA, вместо этого отображается любой веб-адрес.

---

## Для чего это нужно
После завершения настройки Home Assistant на дисплее отобразится любой веб-адрес, на который вы укажете — VIS, VIS-2, Aura, Grafana, Node-RED, любой HTTP-сервис.

Типичные клиенты: семейство настенных дисплеев Shelly (встроенная страница Home Assistant; приложение Home Assistant на устройстве с прошивкой 2.6.0+), приложение Home Assistant Companion (настенные панели Android, приложения, установленные из сторонних источников). Любое устройство, использующее тот же процесс подключения к Home Assistant, должно работать — если у вас это не работает, создайте заявку с трассировкой неисправной конечной точки.

---

## Функции
- Один URL-адрес на каждый дисплей или один глобальный URL-адрес для всех дисплеев.
- Автоматическое обнаружение через mDNS, а также автоматическое определение каждого экземпляра VIS / VIS-2 / Aura, установленного на хосте (см. [Поддерживаемые панели мониторинга](#supported-dashboards) ниже).
— Два параллельных процесса авторизации в Home Assistant: классический JSON-файл `login_flow` для старых версий, а также процесс OAuth2 через браузер, используемый приложением Home Assistant на устройстве Shelly Wall Display 2.6.0+.
- Эмуляция регистрации в мобильном приложении, чтобы приложение HA Companion завершило процесс регистрации.
- На основе файлов cookie: дисплеи сохраняют свой URL-адрес после перезагрузки, изменения IP-адреса и переименования.

---

## Система Sentry / Отчет об ошибках
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Сообщение об ошибках отправляется только в том случае, если включена функция отправки сообщений об ошибках в диагностике ioBroker (**Системные настройки → Диагностика и отправка сообщений об ошибках**). Передается только анонимный идентификатор установки — имя, адрес электронной почты или IP-адрес не передаются.

Подробности и инструкции по отключению см. в разделе [документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Для отправки сообщений об ошибках требуется js-controller версии 3.0 или новее.

---

## Поддерживаемые панели мониторинга
В выпадающем списке режимов автоматически определяется, что установлено на вашем хосте ioBroker. У вас всегда есть возможность вставить любой другой HTTP-адрес в качестве `manual`.

| Источник | Что обнаруживается | Примечания |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ioBroker VIS** (`vis.0`+) | Одна запись на проект, плюс одна запись на представление внутри каждого проекта | Работает со всеми экземплярами `web.*` — несколько веб-экземпляров получают суффикс `(web.X)` к метке |
| **ioBroker Aura** (`aura.0`+) | Одна запись на каждый запущенный экземпляр Aura, указывающая на его интерфейс | Считывает фактическое значение `native.port`, настроенное в Aura (по умолчанию 8095, игнорирует жестко заданное значение в шаблоне `localLinks` Aura) — работает с переопределениями `https` и `customUrl` |
| **Плитки администратора** | Все, что адаптер рекламирует через `common.localLinks` / `common.welcomeScreen` (jarvis, material, grafana, пользовательский интерфейс…) | Разрешает `%ip%`, `%port%`, `%protocol%`, `%bind%` и межэкземплярные ссылки, такие как `%web.0_port%` |
| **URL вручную** | URL в свободной текстовой форме на ваш выбор — Grafana, Node-RED, пользовательский HTML, любой HTTP/HTTPS | Установите для параметра отображения `mode` значение `manual`, а для параметра `manualUrl` — URL. `javascript:`, `data:`, `file:` отклоняются в целях безопасности |
| **URL вручную** | URL в произвольном текстовом формате на ваш выбор — Grafana, Node-RED, пользовательский HTML, любой HTTP/HTTPS | Установите режим отображения `manual` и URL в `manualUrl`. `javascript:`, `data:`, `file:` отклоняются в целях безопасности |

Хотите добавить URL-адрес, который адаптер не определяет автоматически? Установите значение `manual` и вставьте его.

---

## Требования
- Node.js ≥ 22
- ioBroker js-controller ≥ 7.2.2
- ioBroker Admin ≥ 7.8.23

---

## Порты
| Порт | Использование |
| ---------- | ----------------------------------- |
| 8123 / TCP | Эмуляция высокой доступности (фиксированная, стандарт высокой доступности) |
| 5353 / UDP | mDNS-трансляция (только если mDNS включен) |

Один экземпляр на хост. Порт 8123 фиксирован для обеспечения высокой доступности. При наличии нескольких хостов ioBroker в одной локальной сети только на одном из них работает Hassemu.

**Весь трафик передается по протоколу HTTP** — клиенты HA не поддерживают HTTPS в этом потоке. Рассматривайте порт 8123 как предназначенный только для локальной сети и никогда не перенаправляйте его в интернет. При включенной аутентификации имя пользователя, пароль и токены передаются в незашифрованном виде по вашей локальной сети, поэтому аутентификация защищает API HA от других устройств локальной сети — это не защита от утечки данных в интернет.

---

## Первые шаги
1. Запустите экземпляр hassemu в ioBroker.
2. На экране добавьте сервер Home Assistant. При включенном mDNS он появится автоматически; в противном случае введите `http://<ioBroker-IP>:8123` вручную.
3. Завершите настройку HA на дисплее. При выключенной аутентификации вы можете пройти процедуру входа в систему; при включенной аутентификации введите имя пользователя и пароль из настроек экземпляра.
4. Теперь на экране отображается **целевая страница** с собственным идентификатором устройства — это означает, что оно подключено и ожидает URL-адрес.
5. В ioBroker откройте обозреватель объектов и установите для этого устройства параметр `hassemu.0.clients.<id>.mode`: выберите найденный URL из выпадающего списка или выберите `manual` и укажите любой URL в поле `clients.<id>.manualUrl`.
6. Экран перезагружается примерно через 30 секунд и отображает ваш URL-адрес.

Хотите, чтобы один и тот же URL отображался на всех экранах? Установите `global.mode` (плюс `global.manualUrl` для бесплатного URL) и включите главный переключатель `global.enabled` вместо настройки каждого клиента.

---

## Конфигурация
| Вариант | Что | По умолчанию |
| ------------------- | --------------------------------------------------------------------------------- | --------- |
| Привязка | Сетевой интерфейс | 0.0.0.0 |
| Название сервиса | Название, которое отображается на экране | ioBroker |
| mDNS | Автоматическое обнаружение локальной сети. Выкл. → установить `http://<ioBroker-IP>:8123` вручную на дисплее. | вкл. |
| Аутентификация | Требуется вход в систему (защищает API высокой доступности в локальной сети; учетные данные передаются по протоколу HTTP без шифрования) | выключено |
| Имя пользователя / Пароль | Когда аутентификация включена | admin / — |
| Доверенный прокси | Только за доверенным обратным прокси, который завершает TLS и удаляет X-Forwarded-* | off |

---

## Дерево штатов
```
hassemu.0.
├── info.
│   ├── connection      — server is running
│   ├── serverUuid      — server identity (read-only)
│   └── refreshUrls     — re-scan URL list (button, set to true)
├── global.
│   ├── enabled         — master switch
│   ├── mode            — URL choice used by every client whose mode is `global`
│   └── manualUrl       — free-text URL, used when global.mode = `manual`
└── clients.
    └── <id>            — one channel per display (channel name = hostname or IP)
        ├── mode        — per-client URL choice
        ├── manualUrl   — free-text URL, used when mode = `manual`
        ├── ip          — last seen client IP
        └── remove      — forget this client (button, set to true)
```

### Какой URL-адрес используется для отображения?
| `mode` | URL |
| `global` | использовать `global.mode` |
| `manual` | использовать `manualUrl` |
| `manual` | use `manualUrl` |
| пустая (`---`) | целевая страница |
| пустая (`---`) | целевая страница |

Главный выключатель:

- **включено** — все дисплеи следуют `global.mode`
- **выкл** — все дисплеи возвращаются в состояние «---»
- Новые дисплеи всегда начинаются с `---`

---

## Обновить
После смены URL-адреса экран перезагружается примерно через 30 секунд.

После добавления или переименования проекта или представления VIS-2 установите значение `info.refreshUrls` в `true`, чтобы оно отображалось в раскрывающемся списке.

Если Hassemu отключается во время работы дисплея, примерно через 1,5 минуты дисплей переключается на страницу с сообщением об ошибке и кнопкой перезагрузки, а после возобновления работы Hassemu автоматически возвращается на панель управления. Ограничение: дисплей, который перезагружается автоматически, _пока_ Hassemu не работает, не может загрузить эту страницу и отображает ошибку подключения, пока адаптер не будет снова запущен.

---

## Поиск неисправностей
Сначала установите уровень логирования экземпляра на `debug` — начиная с версии 1.31.1 адаптер отслеживает каждую точку принятия решения (идентификация, OAuth2, обнаружение URL-адреса, цепочка резолверов, веб-хуки мобильного приложения, главный коммутатор). Большинство проблем можно диагностировать, используя только этот лог.

**Дисплей не может найти сервер** — при включенном mDNS в журнале должна отображаться строка `mDNS: Broadcasting`. Если эта строка отсутствует, mDNS не удалось привязать (порт 5353/UDP). Обходное решение: отключите mDNS в конфигурации экземпляра и вручную наведите дисплей на строку `http://<ioBroker-IP>:8123`.

**На экране отображается неверный URL или целевая страница** — откройте обозреватель объектов, проверьте `clients.<id>.mode` (и `manualUrl`, если режим `manual`). В `mode='global'` также проверьте `global.mode` / `global.manualUrl`. Идентификатор устройства отображается на целевой странице и хранится в `clients.<id>.ip`. В журнале отладки отображается полная цепочка резолверов (`chain=global→manual→…`) для каждого запроса.

**Дисплей потерял свою идентичность (новый идентификатор при каждом посещении)** — дисплей не сохраняет cookie-файл. Распространенные причины: агрессивный режим конфиденциальности, сброс к заводским настройкам, очистка кэша браузера. Старые каналы `clients.<id>` можно удалить с помощью кнопки `remove`, но основная причина кроется на стороне дисплея, а не в Hassemu.

**Приложение HA Companion сообщает: «Сервер не является Home Assistant»** — укажите приложению путь `http://<ioBroker-IP>:8123`, а не порт ioBroker Admin. Если перед Hassemu находится обратный прокси-сервер, убедитесь, что `/manifest.json` передается без изменений — приложение анализирует `name === "Home Assistant"` для проверки сервера.

**В выпадающем списке Aura указан неверный порт** — `native.port` экземпляра Aura должен соответствовать фактически прослушиваемому порту. Запустите `info.refreshUrls = true` для повторного запуска обнаружения после исправления конфигурации Aura.

---

## Обновление
Миграция запускается автоматически при запуске адаптера.

У вас есть скрипты, которые по-прежнему записывают данные в `visUrl`? Обновите их — вместо этого записывайте данные в `manualUrl` и установите `mode` равным `manual`.

**Перешли с Shelly Wall Display на прошивке 2.6.0 или новее?** Убедитесь, что у вас установлена версия hassemu **≥ 1.29.2**. Приложение Home Assistant на устройстве, появившееся в прошивке 2.6.0, требует проверки подлинности сервера, шага регистрации мобильного приложения и сигнала «подключено» WebView — все три компонента были включены в версии 1.29.0–1.29.2. После обновления еще раз пройдите процедуру подключения Home Assistant к дисплею на устройстве.

---

## Поддержка разработки
Этот адаптер бесплатный и с открытым исходным кодом. Если он вам пригодится, подумайте о том, чтобы угостить меня кофе:

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.37.0 (2026-07-09)

- A custom name you give a display now survives even when its network hostname resolves later — the name you set sticks.
- A display that keeps losing its identity no longer fills ioBroker with unused entries over time.
- A display connection that simply goes away (a panel powered off) is now cleaned up instead of lingering until the adapter restarts.
- The manual URL-refresh datapoint is now `info.refreshUrls` (was `info.refresh_urls`); the old one is removed automatically on upgrade — update any script that wrote to the old name.
- Corrected the configuration help texts and the README to match the current setup, documented the offline behaviour, and added a first-steps guide.

### 1.36.0 (2026-06-22) — stable

- Fixed a rare adapter crash and restart loop that a malformed connection message could trigger — it briefly took all connected displays offline until the adapter recovered.
- A custom name you give a display (its channel name) is no longer overwritten with the device's IP address when that IP changes.
- With authentication enabled, a display again reloads automatically after you change its target URL.
- With authentication enabled, a password is now required — the settings can no longer be saved with an empty password.

### 1.35.3 (2026-06-15)

- Fixed Home Assistant discovery pointing the display at the wrong address on multi-interface hosts; it now uses the address the adapter actually listens on.

### 1.35.2 (2026-06-12)

- Displays whose registration became stale after an adapter restart now re-register automatically — the server previously answered in a way the companion app did not recognize as "please register again"
- Removing a display now also clears its leftover app registration, so a re-added display starts with a fresh one

### 1.35.1 (2026-06-09)

- Internal cleanup. No user-facing changes.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

<!-- prettier-ignore -->
*Developed with assistance from Claude.ai*