---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/docs/en/features.md
title: Функции
hash: iPyOGVEVHI72Xg/0B7FZmUj949XzsRT784RlKtKk3IU=
---
![Логотип](../../../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

# Функции

- [Уведомления](#notifications)
- [Голосовое управление](#voice-control)
- [Видео / прямые трансляции](#video--live-streams)
- [Поиск неисправностей](#trouble-shooting)

## Уведомления

Вы можете добавить уведомления через`sendTo` функциональность или путем записи состояния в`lovelace.X.notifications.add` :

```js
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

или

```js
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Голосовое управление

Все команды из веб-интерфейса записываются в файл.`lovelace.X.conversation` государство с`ack=false` Вы можете написать скрипт, который реагирует на запрос и отвечает на него:

```js
on({id: 'lovelace.0.conversation', ack: false, change: 'any'}, obj => {
   console.log('Question: ' + obj.state.val);
   if (obj.state.val.includes('time')) {
      setState('lovelace.0.conversation', new Date().toString(), true); // true marks this as the answer
   } else {
      setState('lovelace.0.conversation', 'Sorry I don\'t know, what do you want', true);
   }
});
```

## Видео / прямые трансляции

С помощью этого устройства можно отображать видео или прямую трансляцию (например, с дверного звонка / камеры Ring).`iframe` Карта указывает на URL потока. Для фиксированного URL используется обычный`iframe` карта с`url:` Этого достаточно. Если URL-адрес меняется (каждый раз новый клип/прямая трансляция), считывайте его динамически из состояния с помощью [шаблона конфигурации](https://github.com/iantrich/config-template-card) (установите через HACS).

Сопоставьте состояние ioBroker, содержащее URL-адрес (например)`ring.0.doorbell_625818110.Livestream.url` ) к`input_text` сущность, затем:

```yaml
type: custom:config-template-card
variables:
  URL: states['input_text.doorbell_625818110_Livestream_url'].state
entities:
  - input_text.doorbell_625818110_Livestream_url
card:
  type: iframe
  url: ${URL}
  aspect_ratio: 100%
  title: Letztes Live Video
```

(Спасибо @Vippis2000 в [#575](https://github.com/ioBroker/ioBroker.lovelace/issues/575) .)

## Поиск неисправностей

Если вы допустили ошибку в YAML-коде и видите пустую страницу, но при этом отображается верхнее меню, включите режим редактирования (если он еще не включен) в меню, а затем снова откройте меню, чтобы получить доступ к «Редактору необработанного YAML-кода», где вы увидите полный YAML-код и сможете его исправить.

Если это не поможет, откройте объект.`lovelace.*.configuration` Посмотрите в редакторе исходных данных в ioBroker. Вы также можете восстановить этот объект из резервной копии — она содержит полную конфигурацию вашей визуализации.