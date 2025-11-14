---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.docker-manager/README.md
title: Адаптер менеджера Docker ioBroker
hash: AVRvjIKjjeynfbQqaUN+aR3yujAFB5bKoI7uKsR9uuM=
---
![Логотип](../../../en/adapterref/iobroker.docker-manager/admin/docker-manager.svg)

![Количество установок](http://iobroker.live/badges/docker-manager-stable.svg)
![версия НПМ](http://img.shields.io/npm/v/iobroker.docker-manager.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.docker-manager.svg)

# IoBroker Адаптер менеджера Docker
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.docker-manager/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/docker-manager/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Подробнее об отключении сообщений об ошибках см. в разделе [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сообщения Sentry используются, начиная с версии js-controller 3.0.

## Введение
Этот адаптер представляет собой графический пользовательский интерфейс для управления Docker-контейнерами.
Он позволяет легко создавать, запускать, останавливать и удалять Docker-контейнеры непосредственно из интерфейса администратора ioBroker.

Адаптер обеспечивает удобный способ управления средой Docker без необходимости использования инструментов командной строки.

### Пояснение к образу Docker и контейнеру
Docker — это платформа с открытым исходным кодом для автоматизации развертывания, масштабирования и управления приложениями в контейнерах.
Контейнеры — это облегченные, изолированные среды, включающие все необходимые компоненты, такие как код, среда выполнения, библиотеки и конфигурации для запуска приложения.
С помощью Docker разработчики могут предоставлять приложения согласованно и переносимо, независимо от базовой инфраструктуры.
Это облегчает совместную работу команды, упрощает запуск приложений на разных системах и повышает масштабируемость.

Образ Docker — это лёгкий, автономный и исполняемый программный пакет, включающий всё необходимое для запуска программного обеспечения, включая код, среду выполнения, библиотеки, переменные среды и файлы конфигурации.
Его можно представить как снимок приложения и его зависимостей на определённый момент времени.
В нотации ioBroker он подобен адаптеру.

Контейнер Docker, с другой стороны, представляет собой экземпляр образа Docker, работающий в среде выполнения. Это облегчённая изолированная среда, в которой запускается приложение, определённое образом Docker.
При запуске образа Docker создаётся контейнер, инкапсулирующий приложение и его зависимости, что позволяет ему работать согласованно в различных средах.
В нотации ioBroker это похоже на экземпляр адаптера.

## Предпосылки
- В вашей системе должен быть установлен и запущен Docker.
– Пользователь, запускающий процесс ioBroker, должен иметь разрешение на доступ к демону Docker. Обычно это делается путём добавления пользователя в группу `docker`. Или просто вызовите `iob fix` для настройки разрешений.

## Как установить докер
- Инструкции по установке см. в официальной документации Docker: https://docs.docker.com/get-docker/
- После установки Docker убедитесь, что служба Docker запущена. Вы можете проверить её состояние с помощью следующей команды:
- В Linux: `systemctl status docker`
- В Windows и macOS должен быть запущен Docker Desktop.

## Использование API Docker
Адаптер может использовать API Docker для взаимодействия с демоном Docker на других хостах. Чтобы включить эту функцию, необходимо настроить демон Docker на прослушивание TCP-сокета.

### Включить Docker API в Linux
1. Откройте файл конфигурации сервиса Docker. Расположение этого файла может различаться в зависимости от вашего дистрибутива Linux. Обычно он находится в следующих местах:
- `/lib/systemd/system/docker.service`
- `/etc/docker/daemon.json`
- `/etc/systemd/system/docker.service`
2. Если файл называется `/etc/docker/daemon.json`, добавьте или измените запись `hosts`, включив в неё TCP-сокет. Например:

```json
{
    "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
}
```

Если файл является файлом службы systemd (например, `/lib/systemd/system/docker.service`), измените строку `ExecStart`, включив параметр `-H tcp://0.0.0.0:2375`. Например:

```
ExecStart=/usr/bin/dockerd -H fd:// -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock
```

3. Сохраните изменения и выйдите из редактора.
4. Перезапустите службу Docker, чтобы изменения вступили в силу:

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

5. Убедитесь, что демон Docker прослушивает TCP-сокет, выполнив:

```bash
netstat -tuln | grep 2375
```

## Задача
- BackItUp должен поддерживать `/opt/iobroker/docker-volumes`
- Подумайте о том, что js-controller удалит докеры, которые больше не используются, но имеют метку
- Установщик Docker: `iob docker <remove>`
- Индикатор прогресса: добавление/извлечение изображения, создание контейнера

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ХОДЕ** -->

## Changelog
### 0.1.3 (2025-10-15)

- (@GermanBluefox) Updated packages

### 0.1.2 (2025-10-09)

- (@GermanBluefox) Added volume browsing
- (@GermanBluefox) Added text file read from volume

### 0.1.1 (2025-09-26)

- (@GermanBluefox) Added network tab

### 0.0.3 (2025-09-17)

- (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2025 bluefox <dogafox@gmail.com>