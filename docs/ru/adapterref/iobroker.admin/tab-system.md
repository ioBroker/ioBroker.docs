---
chapters: {"pages":{"de/adapterref/iobroker.admin/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.admin/README.md"},"de/adapterref/iobroker.admin/admin/tab-adapters.md":{"title":{"de":"Der Reiter Adapter"},"content":"de/adapterref/iobroker.admin/admin/tab-adapters.md"},"de/adapterref/iobroker.admin/admin/tab-instances.md":{"title":{"de":"Der Reiter Instanzen"},"content":"de/adapterref/iobroker.admin/admin/tab-instances.md"},"de/adapterref/iobroker.admin/admin/tab-objects.md":{"title":{"de":"Der Reiter Objekte"},"content":"de/adapterref/iobroker.admin/admin/tab-objects.md"},"de/adapterref/iobroker.admin/admin/tab-states.md":{"title":{"de":"Der Reiter Zustände"},"content":"de/adapterref/iobroker.admin/admin/tab-states.md"},"de/adapterref/iobroker.admin/admin/tab-groups.md":{"title":{"de":"Der Reiter Gruppen"},"content":"de/adapterref/iobroker.admin/admin/tab-groups.md"},"de/adapterref/iobroker.admin/admin/tab-users.md":{"title":{"de":"Der Reiter Benutzer"},"content":"de/adapterref/iobroker.admin/admin/tab-users.md"},"de/adapterref/iobroker.admin/admin/tab-events.md":{"title":{"de":"Der Reiter Ereignisse"},"content":"de/adapterref/iobroker.admin/admin/tab-events.md"},"de/adapterref/iobroker.admin/admin/tab-hosts.md":{"title":{"de":"Der Reiter Hosts"},"content":"de/adapterref/iobroker.admin/admin/tab-hosts.md"},"de/adapterref/iobroker.admin/admin/tab-enums.md":{"title":{"de":"Der Reiter Aufzählungen"},"content":"de/adapterref/iobroker.admin/admin/tab-enums.md"},"de/adapterref/iobroker.admin/admin/tab-log.md":{"title":{"de":"Der Reiter Log"},"content":"de/adapterref/iobroker.admin/admin/tab-log.md"},"de/adapterref/iobroker.admin/admin/tab-system.md":{"title":{"de":"Die Systemeinstellungen"},"content":"de/adapterref/iobroker.admin/admin/tab-system.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.admin/tab-system.md
title: Системные настройки
hash: oKEU2KVCb/vFwsN+dbBvAxWAKluBKE0yIrUNfvA+VtU=
---
# Системные настройки
Здесь задаются основные параметры для ioBroker.

![Системные настройки администратора](../../../de/adapterref/iobroker.admin/img/tab-system_Systemeinstellungen.jpg)

## Основные параметры
### Язык системы
вы можете выбрать язык системы: немецкий, английский, русский

### Температура агрегата
это значение используется некоторыми адаптерами. Возможно °C или °F.

### Валюта
На данный момент он не использует адаптер

### Формат даты
выберите способ отображения даты в admin и vis.

### Разделитель
Запятая или точка для значений с плавающей запятой

### Экземпляр истории по умолчанию
Этот экземпляр адаптера SQL/History/InfluxDB используется по умолчанию для флота и рикши (диаграммы).

## Репозитории или репозитории
![](../../../de/adapterref/iobroker.admin/img/tab-system_Verwahrungsorte2.jpg)

ioBroker может получить список адаптеров из разных источников. При установке вводятся следующие источники:

* **по умолчанию** — http://download.iobroker.net/sources-dist.json — Генерируется ежедневно в 01:00 на сервере.

Доступ очень быстрый, но информация о версии может быть старше 24 часов.

* **онлайн** — https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json — репозиторий

генерируется из онлайн-источника. Доступ может занять много времени, это самый актуальный источник

* **sources - conf/sources-dist.json** - Также генерируется автоматически и также занимает много времени, но ссылки могут быть устаревшими (могут отсутствовать некоторые адаптеры)

## Сертификаты
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_33_54-ioBroker.jpg)

Это центральное место для сертификатов, используемых для связи SSL/HTTPS. Сертификаты используются admin, web, simple-api, socketio. Стандартные сертификаты устанавливаются по умолчанию. С этим ничего не проверишь. Они используются только для связи SSL. Поскольку сертификаты открыты, вам следует использовать собственные (самозаверяющие) сертификаты, покупать настоящие сертификаты или перейти на Let's Encrypt. Связь с сертификатами по умолчанию небезопасна, и если кто-то хочет прочитать трафик, это можно сделать. Обязательно установите собственные сертификаты. Например. согласно [линукс](http://guides.intertech.de/ssl_certificate_self.html).

## Давайте зашифруем
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_40_07-ioBroker.jpg)

Let's Encrypt — это бесплатный автоматизированный центр сертификации с открытым исходным кодом, созданный независимой исследовательской группой Internet Security Research Group (ISRG).

Дополнительная информация о Let's Encrypt доступна [здесь](https://letsencrypt.org/).

Некоторые установки используют динамический DNS или аналогичный для доступа к собственному домену через назначенный оттуда адрес. ioBroker поддерживает автоматический запрос и обновление сертификатов организации Let's Encrypt.

Возможность использования бесплатных сертификатов Let's Encrypt существует почти в каждом адаптере, который может запускать веб-сервер и поддерживает HTTPS.

Если вы активируете опцию использования сертификатов, но не автоматическое обновление, соответствующий экземпляр пытается работать с сохраненными сертификатами.

Если автоматическое обновление включено, экземпляр пытается запросить сертификаты у Let's Encrypt и автоматически их обновляет.

Сертификаты запрашиваются в первый раз, когда соответствующий адрес вызывается в первый раз. Это означает, что если, например, вы настроите «sub.domain.com» в качестве адреса, а затем вызовете [https://sub.domain.com](https://sub.domain.com/), сертификаты будут запрошены в первый раз, что может занять некоторое время, прежде чем придет ответ.

Выдача сертификатов — сложная процедура, но если вы будете следовать приведенным ниже объяснениям, получить бесплатные сертификаты будет несложно.

**Метод:**

1. Должна быть создана новая учетная запись с введенным адресом электронной почты (настройка для этого в настройках системы)
2. В качестве пароля к учетной записи генерируется случайный ключ.
3. Когда учетная запись будет создана, система откроет небольшой веб-сайт на порту 80 для проверки адреса.
4. Let's encrypt **всегда** использует порт **80** для проверки адреса.
5. Если порт 80 уже используется другой службой, применяется пункт 4 - т.е. назначьте другой службе другой порт!
6. При запуске малого веб-сервера запрос сертификатов для адресов, указанных в настройках системы, отправляется на сервер Let's encrypt.
7. Сервер Let's Encrypt отправляет обратно контрольную фразу в ответ на запрос и через некоторое время пытается прочитать эту контрольную фразу по адресу «http://yourdomain:80/.well-known/acme-challenge/».
8. Когда сервер получает от нас эту контрольную фразу, сервер Let's Encrypt отправляет сертификаты. Они сохраняются в каталоге, указанном в системных настройках.

Это звучит сложно, но все, что вам нужно сделать, это установить несколько флажков и ввести адрес электронной почты и веб-адрес в настройках системы.

Полученные сертификаты действительны в течение примерно 90 дней. После того, как эти сертификаты выданы в первый раз, запускается другая задача, которая автоматически продлевает срок действия.

Эта тема довольно сложна, и тысячи вещей могут пойти не так. Если это не сработает, мы рекомендуем использовать облачный адаптер для доступа, когда вы в пути.

**Let’s Encrypt работает только с версией node.js >=4.5**

## Статистика
![](../../../de/adapterref/iobroker.admin/img/tab-system_2017-01-19-09_48_46-ioBroker.jpg)

Администратор ioBroker отправляет следующую информацию на сайт download.iobroker.net:

<pre>{ &quot;uuid&quot;: &quot;56cf0d20-XXXX-YYYY-BBBB-66eec47ZZZZZ&quot;, &quot;language&quot;: &quot;de&quot;, &quot;hosts&quot;: [ { &quot;version&quot;: &quot;0.15.1&quot;, &quot;platform&quot;: &quot;Javascript/Node. js&quot;, &quot;тип&quot;: &quot;win32&quot; } ], &quot;адаптеры&quot;: { &quot;admin&quot;: { &quot;версия&quot;: &quot;1.0.2&quot;, &quot;платформа&quot;: &quot;Javascript/Node.js&quot; }, &quot;hm-rpc &quot;: { &quot;версия&quot;: &quot;1.1.2&quot;, &quot;платформа&quot;: &quot;Javascript/Node.js&quot; } } }</pre>

Это можно отключить, установив для статистики значение «**none**».

Тем не менее, разработчики запрашивают эту информацию:

<pre>Мы упорно трудились, чтобы сдвинуть этот проект с мертвой точки.
В свою очередь, мы просим вас присылать нам статистику использования.
Никакая личная информация не отправляется на ioBroker.org.
При каждом обновлении списка адаптеров также отправляется анонимная статистика.
Большое спасибо!</pre>
