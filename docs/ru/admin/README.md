---
title: администратор
lastChanged: 11.11.2022
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/admin/README.md
hash: EBGvdYWH0ZAf9QUM3TNnRRTRhH1I1ZMNTPMf046zUKQ=
---
# Пользовательский интерфейс
!> ** Из-за объема документации это только обзор, подробная информация представлена на страницах, связанных с вкладками через заголовки разделов. Пожалуйста, нажимайте на заголовки.**

Администратор адаптера является основным адаптером и используется для управления всей установкой ioBroker. Предоставляет веб-интерфейс. Это вызывается в ``<IP-Adresse des Servers>:8081``.

Этот адаптер создается непосредственно при установке ioBroker, ручная установка не требуется.

![Админ в виде плитки](../../de/admin/media/ADMIN_Adapter_Kachel.png)

Доступ к следующим функциям, среди прочего, можно получить через графический интерфейс, предоставляемый адаптером:

* Ввод общесистемных настроек
* Установка дополнительных адаптеров и их экземпляров
* Доступ к конфигурации экземпляров
* Доступ к объекту и обзор его состояния
* Доступ к администрированию пользователей и групп
* Доступ к лог-файлам (протоколам)
* Управление хостами
* Управление файлами

Вид адаптера разделен на области 1 - строка меню, 2 - главное окно и 3 - системные настройки.

![Структура админ.](../../de/admin/media/ADMIN_Screen_numbers.png)

## Строка меню
Строка меню содержит несколько пунктов меню. В базовой установке эти элементы отображаются, как показано на рисунке. После установки дополнительных адаптеров можно использовать значок треугольника в левом верхнем углу (1), чтобы активировать дополнительные точки или деактивировать их для лучшего обзора.

![Пункты меню](../../de/admin/media/ADMIN_Screen01_menuitems_numbers.png)

Например, чтобы на мобильных устройствах было больше места, строку меню можно уменьшить и скрыть или отобразить:

![Меню свернуто](../../de/admin/media/ADMIN_Screen01_menucollapsed.gif)

## Главное окно
В главном окне отображается содержимое, относящееся к выбранному пункту меню.

Подробная информация об этом контенте хранится на страницах, связанных через заголовки.

[обзор](https://www.iobroker.net/#de/documentation/admin/overview.md) Здесь отображаются все страницы с собственным веб-интерфейсом и информацией о хостах.

[адаптер](https://www.iobroker.net/#de/documentation/admin/adapter.md) Здесь отображаются и управляются доступные и установленные адаптеры.

[экземпляры](https://www.iobroker.net/#de/documentation/admin/instances.md) Здесь перечислены экземпляры, уже установленные на вкладке Адаптер, и их можно соответствующим образом настроить.

[объекты](https://www.iobroker.net/#de/documentation/admin/objects.md) Структуры управляемых объектов и точки данных устройств, интегрированных через адаптеры. Здесь можно создавать и удалять объекты. Целые структуры объектов могут быть загружены или загружены с помощью кнопок «Стрелка вверх» и «Стрелка вниз».

Если значения отображаются красным цветом, они еще не подтверждены получателем (ack = false).

[перечисления](https://www.iobroker.net/#de/documentation/admin/enums.md) Здесь перечислены фавориты, сделки и комнаты из Homematic-CCU.

[журналы](https://www.iobroker.net/#de/documentation/admin/log.md) Здесь отображается журнал

На вкладке Экземпляры можно установить уровень ведения журнала для отдельных экземпляров. Минимальный отображаемый уровень журнала выбирается в меню выбора. При возникновении ошибки заголовок вкладки становится красным.

[пользователь](https://www.iobroker.net/#de/documentation/admin/users.md) Здесь можно создавать пользователей и добавлять их в существующие группы.

[хозяева](https://www.iobroker.net/#de/documentation/admin/hosts.md) Информация о компьютере, на котором установлен ioBroker. Если доступна новая версия, в этой записи в строке меню появляется примечание.

[сценарии](scripts.md) Если установлен адаптер сценариев Java, на этой странице можно создавать собственные сценарии с помощью javascript, Blockly или Typescript.

[файлы](https://www.iobroker.net/#de/documentation/admin/files.md) Файловый менеджер для управления файлами.

## Системные настройки
[системные настройки](https://www.iobroker.net/#de/documentation/admin/settings.md), такие как язык, формат времени и даты и другие общесистемные настройки, выполняются в меню, которое открывается здесь.

Здесь также можно установить репозитории и параметры безопасности.

[Übersicht]: https://www.iobroker.net/#de/documentation/admin/overview.md

[Adapter]: https://www.iobroker.net/#de/documentation/admin/adapter.md

[Instanzen]: https://www.iobroker.net/#de/documentation/admin/instances.md

[Objekte]: https://www.iobroker.net/#de/documentation/admin/objects.md

[Aufzählungen]: https://www.iobroker.net/#de/documentation/admin/enums.md

[Log]: https://www.iobroker.net/#de/documentation/admin/log.md

[файлы](https://www.iobroker.net/#de/documentation/admin/files.md)

[Benutzer]: https://www.iobroker.net/#de/documentation/admin/users.md

[Hosts]: https://www.iobroker.net/#de/documentation/admin/hosts.md

[Systemeinstellungen]: https://www.iobroker.net/#de/documentation/admin/settings.md
