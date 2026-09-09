---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/docs/en/features.md
title: Merkmale
hash: iPyOGVEVHI72Xg/0B7FZmUj949XzsRT784RlKtKk3IU=
---
![Logo](../../../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

# Merkmale

- [Benachrichtigungen](#notifications)
- [Sprachsteuerung](#voice-control)
- [Video / Live-Streams](#video--live-streams)
- [Fehlerbehebung](#trouble-shooting)

## Benachrichtigungen

Sie können Benachrichtigungen über die`sendTo` Funktionalität oder indem der Zustand in`lovelace.X.notifications.add` :

```js
sendTo('lovelace.0', 'send', {message: 'Message text', title: 'Title'}); // full version
sendTo('lovelace.0', 'send', 'Message text'); // short version
```

oder

```js
setState('lovelace.0.notifications.add', '{"message": "Message text", "title": "Title"}'); // full version
setState('lovelace.0.notifications.add', 'Message text'); // short version
```

## Sprachsteuerung

Alle Befehle der Weboberfläche werden in die`lovelace.X.conversation` Staat mit`ack=false` Sie können ein Skript schreiben, das auf die Anfrage reagiert und antwortet:

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

## Video / Live-Streams

Sie können ein Video oder einen Livestream (z. B. von einer Türklingel-/Ring-Kamera) mit einem anzeigen.`iframe` Karte zeigt auf die Stream-URL. Für eine feste URL ein einfacher`iframe` Karte mit`url:` Das genügt. Wenn sich die URL ändert (jedes Mal ein neuer Clip / eine neue Live-Session), lesen Sie sie dynamisch aus einem Status mit der [Konfigurationsvorlagenkarte](https://github.com/iantrich/config-template-card) (Installation über HACS).

Ordnen Sie den ioBroker-Zustand zu, der die URL enthält (z. B.`ring.0.doorbell_625818110.Livestream.url` ) zu einem`input_text` Entität, dann:

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

(Vielen Dank an @Vippis2000 in [#575](https://github.com/ioBroker/ioBroker.lovelace/issues/575) .)

## Fehlerbehebung

Falls Sie den YAML-Code durcheinandergebracht haben und eine leere Seite sehen, aber immer noch das obere Menü vorhanden ist, aktivieren Sie den Bearbeitungsmodus (falls er noch nicht aktiviert ist) über das Menü und öffnen Sie dann das Menü erneut, um auf den "RAW Yaml Editor" zuzugreifen, wo Sie den vollständigen YAML-Code sehen und ihn bereinigen können.

Wenn das nicht hilft, öffnen Sie das Objekt.`lovelace.*.configuration` Schauen Sie im Rohdaten-Editor von ioBroker nach. Sie können das Objekt auch aus einer Sicherung wiederherstellen – es enthält die vollständige Konfiguration Ihrer Visualisierung.