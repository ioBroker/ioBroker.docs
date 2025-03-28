---
title: архитектура
lastChanged: 24.08.2024
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/basics/architecture.md
hash: fBfqIkwe2R088CwuRMCh53RGxixMmytK+tGKMdHsiV0=
---
# Построение системы
## Архитектура
ioBroker является модульным, то есть состоит из множества отдельных компонентов. Каждый модуль имеет определенную задачу. Поэтому, чтобы иметь обзор, у ioBroker есть центральный координатор для всех своих модулей. Этот координатор — `js-controller`, работающий в фоновом режиме. Он отвечает за централизованное хранение данных, а также управление и связь между всеми модулями. Сами модули называются `Adapter`.
Адаптеры устанавливаются пользователем только при необходимости. Веб-интерфейс администрирования `admin` сам по себе также является адаптером. Адаптер администратора или сокращенно «Администратор» — это интерфейс управления системой ioBroker. Вызывается [Admin](https://www.iobroker.net/#de/documentation/admin/README.md) обычно имеет адрес [http://localhost:8081](http://localhost:8081).

Когда новый адаптер устанавливается с помощью администратора, файлы адаптера сначала загружаются из Интернета и записываются на жесткий диск сервера. Если адаптер должен быть запущен, сначала создается `Instanz` адаптера. Каждый экземпляр адаптера можно настроить индивидуально, а также остановить и запустить независимо с администратором. Вот почему каждый экземпляр запускается в своем собственном процессе, который в фоновом режиме взаимодействует с js-контроллером ioBroker.

В системе `Multihost` с несколькими серверами ioBroker экземпляры адаптеров также могут быть распределены по разным серверам. Это позволяет распределить нагрузку или подключить дополнительное оборудование непосредственно на месте (например, порты ввода-вывода, USB).

Связь между адаптерами, js-контроллерами, базами данных и веб-интерфейсами осуществляется через несколько соединений TCP/IP. В зависимости от выбранной настройки обмен данными осуществляется либо в виде обычного текста, либо в зашифрованном виде.

ioBroker и адаптеры в основном написаны на языке программирования JavaScript. Для выполнения JavaScript вам нужна соответствующая среда выполнения. Поэтому ioBroker полагается на [Node.js](https://github.com/nodesource/distributions#installation-instructions). Эта среда выполнения доступна для широкого спектра программных платформ, таких как Linux, Windows и macOS.

Диспетчер пакетов Node, сокращенно `npm`, используется для установки ioBroker и адаптеров. Он может искать, устанавливать, удалять, компилировать и обновлять модули и их зависимости.
Без Node.js ioBroker не работает. Нет необходимости устанавливать Node.js вручную; установщик ioBroker делает это напрямую.

Как это часто бывает со многими технологиями с открытым исходным кодом, Node.js быстро развивается. Небольшие обновления, повышающие стабильность и безопасность или даже добавляющие новые функции, появляются регулярно.

Версии Node.js с **четным** основным номером версии называются версиями LTS (долгосрочная поддержка) и поддерживаются в течение нескольких лет (например, 12.x). Каждый год в LTS выходит новая версия — в 2021 году это была Node.js 16, которая вышла в апреле и станет версией LTS с октября 2021 года.

В то же время срок службы более ранних версий LTS подходит к концу (EOL). Node.js 10 получил статус EOL в апреле 2021 года и поэтому больше не будет получать обновления. Срок службы Nodejs 12.x закончится в конце апреля 2022 года. Так что обновлений безопасности больше не будет!

ioBroker использует множество модулей и расширений из среды JavaScript с открытым исходным кодом, где регулярно случается, что версии, прошедшие EOL, вскоре после этого перестают поддерживаться. На первом этапе это не окажет реального влияния, но в среднесрочной перспективе появятся адаптеры, а позже и контроллер js, которые больше не поддерживают EOL-версии Node.js.

## Адаптеры и экземпляры
Адаптеры — это специальные модули, которые интегрируют различные устройства, сервисы или протоколы в систему ioBroker. Они действуют как интерфейсы между ioBroker и внешними системами, которыми вы управляете или из которых они собирают данные. Адаптеры можно разделить на различные категории, такие как адаптеры устройств, адаптеры протоколов, адаптеры служб, адаптеры баз данных, адаптеры визуализации, адаптеры сценариев и специальные адаптеры.

Каждый экземпляр адаптера можно индивидуально настроить, остановить и запустить независимо от администратора. Это обеспечивает гибкую и масштабируемую интеграцию различных устройств и сервисов в систему ioBroker. Экземпляры адаптера выполняются в своих собственных процессах и взаимодействуют с контроллером js в фоновом режиме.

## Многохостовые системы
В мультихостовой системе несколько серверов ioBroker могут быть соединены друг с другом для распределения нагрузки или подключения дополнительного оборудования на месте. Это обеспечивает лучшую масштабируемость и гибкость системы ioBroker. Экземпляры адаптера можно распределить по разным серверам, чтобы оптимально использовать системные ресурсы.

Связь между серверами происходит посредством TCP/IP-соединений, а обмен данными может осуществляться в текстовом или зашифрованном виде, в зависимости от настроек. Многохостовые системы предоставляют надежное и масштабируемое решение для крупных установок со множеством устройств и сервисов.

## Безопасность и обновления
Безопасность и регулярные обновления являются важными аспектами при использовании ioBroker. Node.js, базовая среда выполнения, быстро развивается и получает регулярные обновления, повышающие стабильность и безопасность. Важно использовать LTS-версии Node.js, поскольку они постоянно обновляются и получают обновления безопасности.

ioBroker и его адаптеры используют множество модулей и расширений сообщества JavaScript с открытым исходным кодом. Важно регулярно обновлять эти модули, чтобы воспользоваться последними улучшениями безопасности и стабильности. Диспетчер пакетов узлов (npm) упрощает управление этими модулями и их обновление.

## Краткое содержание
ioBroker — модульная и масштабируемая система для интеграции и управления различными устройствами, сервисами и протоколами. Центральный координатор — js-контроллер — управляет адаптерами и обеспечивает связь между различными компонентами системы. Адаптеры обеспечивают гибкую интеграцию устройств и сервисов, а многохостовые системы обеспечивают дополнительную масштабируемость и гибкость. Безопасность и регулярные обновления являются важными аспектами обеспечения стабильности и надежности системы ioBroker.