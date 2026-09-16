---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/docs/en/README.md
title: ioBroker.lovelace - Документация
hash: dHALAkifjortu4QuDqsfh4Yiw82U9/RX0UuFzxAZEVU=
---
![Логотип](../../../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

# ioBroker.lovelace — Документация

С помощью этого адаптера вы можете создать визуализацию для ioBroker, используя пользовательский интерфейс Lovelace в Home Assistant.

Адаптер эмулирует среду Home Assistant, предоставляя доступ к устройствам, присутствующим в ioBroker. В Home Assistant функции предоставляются следующим образом:`entities` (ан`entity` (обычно соответствует одному устройству). В ioBroker устройство часто состоит из нескольких устройств.`states` , следовательно, отображение 1:1`state` к`entity` Это не всегда пустяк.

Ан`entity` всегда требуется уникальный идентификатор формы`domain.unique_name` . The`domain` (например`light` ,`cover` ,`input_number` ) описывает функцию сущности и определяет, как ведут себя карты Лавлейс.

## Темы

- [Сущности](/#/docs/adapterref/iobroker.lovelace/docs/en/entities.md) — автоматическое определение, ручная настройка, поддерживаемые и специальные типы сущностей
- [Советы по созданию пользовательских карточек, тем и интерфейсов](/#/docs/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md)
- [Функции](/#/docs/adapterref/iobroker.lovelace/docs/en/features.md) — уведомления, голосовое управление, видео, устранение неполадок.
- [Перенос тем оформления (обновление интерфейса 2026 года)](/#/docs/adapterref/iobroker.lovelace/docs/en/theme_migration.md)

Документация для разработчиков/сборки находится в [корневом файле README](/#/adapters/lovelace#development) .

## Экземплярные объекты

В папке`instances` Существуют некоторые объекты, которые можно использовать для управления пользовательским интерфейсом. Для каждого браузера создается новая подпапка со случайным идентификатором. Этот идентификатор хранится в веб-хранилище клиентского браузера. Если вы удалите веб-хранилище, будет создан новый экземпляр. Если вы используете Fully Kiosk Browser, убедитесь, что функция включена.`Delete webstorage on reload` **отключено** .

Эта функциональность использует browser\_mod, который устанавливается и обновляется адаптером. Не добавляйте свою собственную версию browser\_mod в качестве пользовательской карточки.

## Удаленный доступ через облако ioBroker

Помимо использования VPN или открытия порта экземпляра Lovelace (со встроенной авторизацией и SSL), вы также можете использовать Lovelace через облако ioBroker. Преимущество: соединение извне в вашу сеть не открывается — соединение инициируется вашей системой облачным адаптером. Это особенно полезно при использовании Dual Stack Lite или других сложных сетевых конфигураций, над которыми вы не имеете полного контроля.

Для активации зарегистрируйтесь на iobroker.pro и установите облачный адаптер. В настройках облачного адаптера выберите нужный экземпляр Lovelace. После этого Lovelace появится в разделе «Приложения» в пользовательском интерфейсе iobroker.pro и после входа в систему станет доступен по адресу`https://iobroker.pro:4443/lovelace/` .

В экземпляре Lovelace следует отключить SSL. Авторизация также не требуется, поскольку она осуществляется через учетную запись ioBroker.