---
chapters: {"pages":{"en/adapterref/iobroker.plex/README.md":{"title":{"en":"ioBroker.plex"},"content":"en/adapterref/iobroker.plex/README.md"},"en/adapterref/iobroker.plex/README-states.md":{"title":{"en":"Channels & States"},"content":"en/adapterref/iobroker.plex/README-states.md"},"en/adapterref/iobroker.plex/README-tautulli.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.plex/README-tautulli.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.plex/README.md
title: ioBroker.plex
hash: k3t70c41MQGDulD5mAqLLlHjpmm3pXY4PKDA39Hw3+k=
---
![Логотип](../../../en/adapterref/iobroker.plex/admin/plex.jpg)

![Количество установок](http://iobroker.live/badges/plex-installed.svg)
![Стабильная версия](http://iobroker.live/badges/plex-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.plex.svg)
![Изменения с момента последнего релиза](https://img.shields.io/github/commits-since/Zefau/ioBroker.plex/latest.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.plex.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/plex/svg-badge.svg)

# ioBroker.plex

Интеграция Plex Media Server в ioBroker (с Plex Pass или без него). Кроме того, интеграция с Tautulli.

**Оглавление**

1. [Функции](#1-features)
2. [Инструкции по установке](#2-setup-instructions)
   1. [Базовая настройка](#21-basic-setup)
   2. [Расширенные настройки](#22-advanced-setup-plex-pass-or-tautulli)
3. [Каналы и штаты](#3-channels--states)
   1. [с базовой настройкой](#31-with-basis-setup)
   2. [с расширенными настройками](#32-with-advanced-setup)
4. [Список изменений](#changelog)
5. [Лицензия](#license)

## 1. Характеристики

- Получайте подробную информацию о воспроизводимом медиафайле (например, битрейт видео, кодек, информация о субтитрах, звук; полный список см. в разделе [«Расширенные настройки](/#/docs/adapterref/iobroker.plex/README-states.md#with-advanced-setup) »).
- Получать`events` из Plex (через [Plex Webhook](https://support.plex.tv/articles/115002267687-webhooks/#toc-0) и [уведомления Plex](https://support.plex.tv/articles/push-notifications/#toc-0) с использованием Plex Pass или через Tautulli, [**см. настройку!**](#22-advanced-setup-plex-pass-or-tautulli) )
- Управление воспроизведением для игроков
- Забрать`servers`
- Забрать`libraries`
- Получить все предметы в библиотеке
- Забрать`users` (только с Таутулли)
- Забрать`statistics` (только с Таутулли)
- Забрать`playlists`
- Забрать`settings`
- Получить все данные от управляемых клиентов.
- Веб-интерфейс, отображающий последние события из Plex:![Веб-интерфейс Plex](../../../en/adapterref/iobroker.plex/img/screenshot_adapter-interface.png)

## 2. Инструкции по настройке

### 2.1. Базовая настройка

Для базовой настройки необходимо указать IP-адрес (и порт) вашей установки Plex. Кроме того, вам потребуется получить специальный токен, чтобы адаптер мог получать данные из Plex.

После предоставления этих данных ioBroker.plex получит все основные данные (включая серверы и библиотеки). Полный список основных данных см. в разделе [«Каналы и состояния»](#21-with-basis-setup) .

### 2.2. Расширенная настройка (Plex Pass или Tautulli)

#### 2.2.1. Plex Pass

**Вебхук**

Если вы являетесь пользователем Plex Pass, вы можете [настроить веб-перехватчик](https://support.plex.tv/articles/115002267687-webhooks/#toc-0) в настройках Plex для получения текущего события/действия с вашего медиасервера Plex (воспроизведение, пауза, возобновление, остановка, просмотр и оценка).

Перейдите к своему медиасерверу Plex и выберите...`Settings` и`Webhook` Создан новый веб-перехватчик путем нажатия кнопки.`Add Webhook` и введите свой IP-адрес ioBroker с пользовательским портом, указанным в настройках ioBroker.plex, и в конце введите...`/plex` путь, например`http://192.168.178.29:41891/plex` :

![Вебхук Plex](../../../en/adapterref/iobroker.plex/img/screenshot_plex-webhook.png)

**События**

Для получения информации о уведомлениях Plex, пожалуйста, [ознакомьтесь с официальной документацией](https://support.plex.tv/articles/push-notifications/#toc-0) . Чтобы включить уведомления на вашем медиасервере Plex, перейдите по ссылке:`Settings` >`Server` >`General` а затем включить`Push Notifications` предпочтения.

#### 2.2.2.Таутулли

[Tautulli — это стороннее приложение](https://tautulli.com/#about) , которое можно запустить вместе с вашим Plex Media Server для мониторинга активности и отслеживания различной статистики. Самое важное, что эта статистика включает в себя информацию о том, что было просмотрено, кто смотрел, когда и где, а также как это было просмотрено. Вся статистика представлена в удобном и понятном интерфейсе с множеством таблиц и графиков, что позволяет легко похвастаться вашим сервером перед другими. Если вас заинтересовало приложение, ознакомьтесь [с предварительной версией Tautulli](https://tautulli.com/#preview) и [установите её на свою систему](https://github.com/Tautulli/Tautulli-Wiki/wiki/Installation) .

Этот адаптер подключается к [API Tautulli](https://github.com/Tautulli/Tautulli/blob/master/API.md) , а также получает события веб-перехватчика от Tautulli.

##### 2.2.2.1. API

После установки Tautulli откройте страницу _«Настройки»_ на панели управления Tautulli и перейдите в раздел _«Веб-интерфейс»_ . Прокрутите вниз до раздела _«API»_ и убедитесь, что...`Enable API` отмечено. Скопируйте.`API key` и введите его в настройки ioBroker.plex. Кроме того, добавьте IP-адрес и порт Tautulli, чтобы разрешить взаимодействие через API.

##### 2.2.2.2. Вебхук

###### Обзор

Чтобы настроить веб-книгу с помощью Tautulli, следуйте приведенным ниже инструкциям и убедитесь, что вы выполнили все 4 шага:

1. Добавить агент уведомлений
2. Настройка веб-перехватчика в агенте уведомлений
3. Настройка триггеров в агенте уведомлений
4. Настройка данных в агенте уведомлений
5. Настройка параметров уведомлений

###### Описание

После установки откройте страницу настроек на панели управления Tautulli и перейдите в раздел «Агенты уведомлений», как показано ниже:

![Настройки Таутулли](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-settings.png)

1. Нажмите _«Добавить новый агент уведомлений_ и _веб-перехватчик»_ .

2. Введите IP-адрес вашего ioBroker с пользовательским портом, указанным в настройках ioBroker.plex, и добавьте в конце...`/tautulli` путь, например`http://192.168.178.29:41891/tautulli` :

   ![Вебхук Таутулли](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-webhook.png) Кроме того, выберите`POST` Для _метода веб-перехватчика_ введите любое описание по вашему желанию в _поле «Описание»_ .

3. Далее перейдите на вкладку _«Триггеры»_ , выберите нужные (или все) агенты уведомлений. Включенный агент уведомлений запустит событие, которое затем будет отправлено в ioBroker. На следующем шаге **обязательно** укажите необходимые данные для каждого из включенных агентов уведомлений!

4. Теперь, **что наиболее важно** , заполните соответствующие данные на вкладке _«Данные»_ в соответствии с **[конфигурацией уведомлений, которую можно найти здесь](/#/docs/adapterref/iobroker.plex/README-tautulli.md#notification-configuration)** . Скопируйте конфигурацию уведомлений соответствующих агентов уведомлений из предыдущего шага (например,`Playback Start` ,`Playback Stop` ,`Playback Pause` и`Playback Resume` ) в каждом из текстовых полей, как показано ниже для`Playback Start` :

   ![Уведомление Таутулли](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification.png)

5. Наконец, отметьте этот вариант.`Allow Consecutive Notifications` Включить возможность отправки последовательных уведомлений (например, как о просмотренных, так и о заблокированных уведомлениях):

   ![Настройки уведомлений Таутулли](../../../en/adapterref/iobroker.plex/img/screenshot_tautulli-notification_settings.png)

## 3. Каналы и государства

После настройки как базовых, так и расширенных параметров отобразятся следующие каналы (библиотеки, серверы и пользователи — это, конечно, лишь примеры). [Полный список каналов и состояний](#21-with-basis-setup) см. ниже.

![Пример каналов и состояний](../../../en/adapterref/iobroker.plex/img/screenshot_plex-states.jpg)

### 3.1. С настройкой базовой системы

После успешной базовой настройки будут созданы каналы в соответствии со следующей таблицей. Список всех создаваемых штатов [см. в специальном списке штатов](/#/docs/adapterref/iobroker.plex/README-states.md#with-basis-setup) .

| Канал / Папка  | Описание        |
| -------------- | --------------- |
| **библиотеки** | Библиотеки Plex |
| **серверы**    | Серверы Plex    |
| **настройки**  | Настройки Plex  |

### 3.2. С расширенными настройками

После успешной расширенной настройки будут _дополнительно_ созданы следующие каналы. Список всех создаваемых штатов [см. в специальном списке штатов](/#/docs/adapterref/iobroker.plex/README-states.md#with-advanced-setup) .

| Канал / Папка    | Описание                            | Примечание               |
| ---------------- | ----------------------------------- | ------------------------ |
| **\_играет**     | Воспроизводится контент Plex Media. | с Plex Pass или Tautulli |
| **статистика**   | Статистика просмотра Plex           | только с Таутулли        |
| **пользователи** | Пользователи Plex                   | только с Таутулли        |

## Кредиты

Этот адаптер не был бы возможен без замечательной работы @Zefau ( <https://github.com/Zefau> ), который создал и поддерживал его до 2021 года.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.0.0 (2026-08-16)
- (bluefox) Breaking: Admin 8 or newer is now required — the configuration UI no longer runs under Admin 7.
- (bluefox) Dependencies have been updated.

### 2.1.1 (2026-06-21)
- (mcm1957) some issues reported by repository checker have been fixed
- (mcm1957) dependencies have been updated

### 2.1.0 (2026-05-13)
- (ticaki) New: server management commands — library scan, force-refresh, empty trash, analyze streams (`libraries.{id}._commands.*`).
- (ticaki) New: global maintenance buttons — refresh all libraries, clean bundles, optimize database (`maintenance.*`).
- (ticaki) New: Butler task buttons — trigger any of Plex's scheduled background tasks on demand (`butler.*`).
- (ticaki) New: per-media commands when playback starts — mark watched/unwatched, rate, refresh metadata (`_playing.*._Commands.*`).
- (ticaki) New: Plex server settings are now writable — changes are sent to the server immediately (`settings.*`).
- (ticaki) Fix: library `_refresh` button was created as non-writable channel; now correctly a writable boolean button.

### 2.0.0 (2026-05-10)
- (ticaki) **Breaking:** Data points under `_playing.*` have been restructured — existing scripts and Vis widgets need to be updated.
- (ticaki) Data retrieval from Plex Media Server reworked; which fields are populated depends on the interface used (local / Plex.tv cloud).
- (ticaki) Adapter configuration fully migrated to the modern jsonConfig format.
- (ticaki) Built-in web interface redesigned: timeline of recent events, Now Playing display, and customizable layout.
- (ticaki) Player detection improved: Plexamp, Plex iOS/Android, PlexHTPC, and newer TV apps now reliably detected.
- (ticaki) Reconnect after connection errors accelerated: progressive backoff instead of fixed wait time.
- (ticaki) Fixed: Plex iOS, Android, and Web devices no longer generate "State has no existing object" log warnings after an upgrade.
- (ticaki) Fixed: deleting a device via adapter settings now correctly clears all internal state entries.
- (ticaki) New privacy option: media link states can store a placeholder instead of the real Plex token in plain text (configurable in adapter settings, enabled by default).
- (ticaki) Adapter rewritten in TypeScript. Requires Node.js >= 22.

### 1.1.5 (2024-12-11)
- (ticaki) State _playing.*.Metadata.viewOffset is created.
- (ticaki) Dependencies updated
- (mcm1957) Adapter requires nodejs >= 18 now

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.plex/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters  
Copyright (c) 2019-2020 Zefau <zefau@mailbox.org>  


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.