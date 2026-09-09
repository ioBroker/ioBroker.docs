---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.docker-manager/README.md
title: Адаптер Docker-менеджера ioBroker
hash: L5iZIMplEN0PQPdM6skQTuquEqZU9VMQocqIZzyDjzY=
---
![Логотип](../../../en/adapterref/iobroker.docker-manager/admin/docker-manager.svg)

![Количество установок](http://iobroker.live/badges/docker-manager-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.docker-manager.svg)
![Тестирование и выпуск](https://github.com/ioBroker/ioBroker.docker-manager/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/docker-manager/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.docker-manager.svg)

# Адаптер менеджера Docker ioBroker

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках, см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

## Введение

Этот адаптер представляет собой графический пользовательский интерфейс для управления контейнерами Docker. Он позволяет легко создавать, запускать, останавливать и удалять контейнеры Docker непосредственно из административного интерфейса ioBroker.

Этот адаптер предоставляет удобный способ управления средой Docker без необходимости использования инструментов командной строки.

### Пояснение к образу и контейнеру Docker.

Docker — это платформа с открытым исходным кодом для автоматизации развертывания, масштабирования и управления приложениями в контейнерах. Контейнеры представляют собой легковесные, изолированные среды, включающие все необходимые компоненты, такие как код, среда выполнения, библиотеки и конфигурации для запуска приложения. С помощью Docker разработчики могут предоставлять приложения согласованно и портативно, независимо от базовой инфраструктуры. Это облегчает командную работу, упрощает запуск приложений на разных системах и повышает масштабируемость.

Образ Docker — это легковесный, автономный и исполняемый программный пакет, который включает в себя всё необходимое для запуска программного обеспечения, включая код, среду выполнения, библиотеки, переменные среды и файлы конфигурации. Представьте его как снимок приложения и его зависимостей в определённый момент времени. В нотации ioBroker это похоже на адаптер.

С другой стороны, контейнер Docker — это экземпляр образа Docker, выполняющийся во время работы. Это легковесная, изолированная среда, в которой запускается приложение, определенное образом Docker. При запуске образа Docker создается контейнер, который инкапсулирует приложение и его зависимости, позволяя ему стабильно работать в различных средах. В нотации ioBroker это похоже на экземпляр адаптера.

## Предварительные требования

- Для корректной работы вам необходимо установить и запустить Docker в вашей системе.
- Пользователь, запускающий процесс ioBroker, должен иметь разрешение на доступ к демону Docker. Обычно это делается путем добавления пользователя в список рассылки.`docker` группа. Или просто позвоните.`iob fix` установить права доступа.

## Как установить Docker

- Инструкции по установке см. в официальной документации Docker: <https://docs.docker.com/get-docker/>
- После установки Docker убедитесь, что служба Docker запущена. Проверить состояние службы Docker можно с помощью следующей команды:
  - В Linux:`systemctl status docker`
  - В операционных системах Windows и macOS Docker Desktop должен быть запущен.

## Использование API Docker

Адаптер может использовать API Docker для связи с демоном Docker на других хостах. Для включения этой функции необходимо настроить демон Docker на прослушивание TCP-сокета.

### Включение API Docker в Linux

1. Откройте файл конфигурации службы Docker. Расположение этого файла может различаться в зависимости от вашего дистрибутива Linux. Обычно он находится в следующих местах:
   - `/lib/systemd/system/docker.service`
   - `/etc/docker/daemon.json`
   - `/etc/systemd/system/docker.service`
2. Если файл`/etc/docker/daemon.json` добавить или изменить`hosts` Запись, включающая TCP-сокет. Например:
   ```json
   {
       "hosts": ["unix:///var/run/docker.sock", "tcp://0.0.0.0:2375"]
   }
   ```
   Если файл является файлом службы systemd (например,`/lib/systemd/system/docker.service` ), изменить`ExecStart` строка для включения`-H tcp://0.0.0.0:2375` вариант. Например:
   ```
   ExecStart=/usr/bin/dockerd -H fd:// -H unix:///var/run/docker.sock -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock 
   ```
3. Сохраните изменения и закройте редактор.
4. Перезапустите службу Docker, чтобы применить изменения:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```
5. Убедитесь, что демон Docker прослушивает TCP-сокет, выполнив следующую команду:
   ```bash
   netstat -tuln | grep 2375
   ```

## Все

- BackItUp должен поддерживать`/opt/iobroker/docker-volumes`
- Подумайте о том, что js-контроллер удалит докеры, которые больше не используются, но имеют метку.
- Установщик Docker:`iob docker <remove>`
- Индикатор выполнения: добавление/загрузка образа, создание контейнера

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.0.1 (2026-08-07)

- (@GermanBluefox) Added an interactive terminal for running containers (xterm.js)
- (@GermanBluefox) Updated GUI to React 19
- (@GermanBluefox) Added better JSON viewer for container configuration
- (@GermanBluefox) Breaking: Node.js 22 is minimum requirement now

### 0.1.5 (2026-01-09)

- (@GermanBluefox) Updated packages

### 0.1.3 (2025-10-15)

- (@GermanBluefox) Updated packages

### 0.1.2 (2025-10-09)

- (@GermanBluefox) Added volume browsing
- (@GermanBluefox) Added a text file read from volume

### 0.1.1 (2025-09-26)

- (@GermanBluefox) Added network tab

### 0.0.3 (2025-09-17)

- (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2025-2026 bluefox <dogafox@gmail.com>