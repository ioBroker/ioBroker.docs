---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md
title: Советы по созданию пользовательских карточек, тем и интерфейсов
hash: ZK4xoFC8RElxssky4eweacFUGplOLAsnz4K+TyD0nrY=
---
![Логотип](../../../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

# Советы по созданию пользовательских карточек, тем и интерфейсов

- [Пользовательские карты](#custom-cards)
- [Собственные изображения](#own-images)
- [Темы](#themes)
- [Иконки](#icons)
- [Советы по пользовательскому интерфейсу](#ui-tips)

## Пользовательские карты

Дополнить произведения Лавлейса можно самодельными открытками (`custom cards` Они поставляются в виде JavaScript-файла (\*.js), который необходимо загрузить через конфигурацию Lovelace.`Files` (вкладка в разделе «Администрирование» или перетаскивание в настройках экземпляра).

Для загрузки данных из командной строки, где установлен iobroker:

`iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/`

После перезапуска адаптера Lovelace все файлы из`cards` Каталоги включаются автоматически.

Если карточке требуются дополнительные ресурсы (файлы CSS или JS), пересоздайте структуру папок в файле.`cards` и поместите эти файлы в каталог. Адаптер распознает URL-адреса, начинающиеся с`/hacsfiles/` и перенаправляет их на`cards` каталог. Так что, если вы видите`404` ошибки для URL-адресов, включая`/hacsfiles/` Соответственно скорректируйте структуру папок. Например, для карты, требующей`/hacsfiles/folder1/folder2/file3.json` необходимо разместить в`/lovelace.0/cards/folder1/folder2/file3.json` .

Часто пользовательские карточки хранятся на GitHub в виде исходных кодов и должны быть скомпилированы перед использованием. Проверьте`Releases` Меню на GitHub для скомпилированных файлов, например, [релизы mini-graph-card](https://github.com/kalkih/mini-graph-card/releases) (ищите`mini-graph-card-bundle.js` ).

### Протестированные карты

Следующие карты были протестированы разработчиком или сообществом и работают. В целом, большинство карт должны работать; проблемы часто возникают из-за несовместимости между используемой версией Lovelace и картой, поэтому старайтесь использовать самые новые версии карт.

- **[Clockwork Card](https://github.com/barleybobs/ha-clockwork-card)** — рабочая версия (оригинал больше не поддерживается). Конфигурация: см. [clock](#clock) . Датчика времени нет; время берется из браузера, поэтому настройте его без него.`entity_id` и с учетом часовых поясов.
- **[Mini Media Player](https://github.com/kalkih/mini-media-player)** — это медиаплеер с широкими возможностями настройки, который также поддерживает [преобразование текста в речь и кнопки быстрого доступа](#mini-media-card-with-tts-and-shortcuts) .
- **[Мини-карточка для графиков](https://github.com/kalkih/mini-graph-card)** — очень гибко настраиваемая карточка для отображения данных с датчиков, позволяющая отображать различные объекты в виде графиков или столбчатых диаграмм.

## Собственные изображения

Пользовательские изображения (например, для фона) можно загружать через тот же диалог, что и пользовательские карточки. Используйте их следующим образом в настройках Lovelace:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

или

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

Подробнее о фоновых изображениях в фильме «Лавлейс» можно прочитать [здесь](https://www.home-assistant.io/lovelace/views/#background) .

## Темы

Темы оформления можно задать в диалоговом окне конфигурации ioBroker. В обновлении интерфейса 2026 года обработка тем изменилась — см. [примечания по миграции тем](/#/docs/adapterref/iobroker.lovelace/docs/en/theme_migration.md) . Вставьте что-то вроде:

```yaml
midnight:
  # Main colors
  primary-color: '#5294E2'
  accent-color: '#E45E65'
  dark-primary-color: 'var(--accent-color)'
  light-primary-color: 'var(--accent-color)'
  # Text colors
  primary-text-color: '#FFFFFF'
  secondary-text-color: '#5294E2'
  disabled-text-color: '#7F848E'
  # Background colors
  primary-background-color: '#383C45'
  secondary-background-color: '#383C45'
  divider-color: 'rgba(0, 0, 0, .12)'
  # Paper card
  paper-card-background-color: '#434954'
  paper-item-icon-active-color: '#F9C536'
```

(Полный пример — [тема "Полночь"](https://community.home-assistant.io/t/midnight-theme/28598/2) . Обратите внимание, что многие`paper-*` (Переменные старой системы тем устарели — см. примечания по миграции.)

## Иконки

Используйте значки в форме`mdi:NAME` , нравиться`mdi:play-network` Имена можно найти здесь: <https://pictogrammers.com/library/mdi/>

## Советы по пользовательскому интерфейсу

### Настройка заголовка окна

Заголовок окна можно настроить с помощью расширения [card-mod](https://github.com/thomasloven/lovelace-card-mod) . Добавьте следующий YAML-код в свою тему:

Снимите звонок:

```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
```

Удалить поиск и справку:

```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
    ha-icon-button[slot="actionItems"] { display: none; }
```

Удалите поиск, подсказки и точечное меню:

```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
    ha-icon-button[slot] { display: none; }
```

Полностью скрыть заголовок окна: установить состояние`lovelace.0.instances.hideHeader` к`true` (После перезагрузки заголовок удаляется во всех браузерах). Состояние также существует для каждого экземпляра, поэтому его можно установить для каждого браузера.

#### Полноценная тема оформления, которая выглядит как стандартная, но без значка колокольчика.

Приведённые выше фрагменты кода работают только внутри темы оформления. Если вы не хотите создавать собственную тему, вот небольшой, самодостаточный пример темы (`no-bell-icon` ) который примерно соответствует стандартному темному оформлению и убирает колокольчик. Вставьте его в конфигурацию темы, затем выберите (например, через состояние).`lovelace.0.instances.set_theme` Тема становится доступной для выбора только после того, как точка данных будет создана и адаптер перезапущен.

```yaml
no-bell-icon:
  primary-background-color: "#111111"
  card-background-color: "#1c1c1c"
  secondary-background-color: "#282828"
  primary-text-color: "#e1e1e1"
  secondary-text-color: "#9b9b9b"
  disabled-text-color: "#6f6f6f"
  divider-color: "rgba(225, 225, 225, .12)"

  input-label-ink-color: var(--primary-text-color)
  ha-color-form-background: var(--card-background-color)
  ha-color-form-background-hover: var(--light-primary-color)
  ha-color-form-background-disabled: var(--primary-background-color)
  wa-color-neutral-fill-normal: var(--ha-color-on-primary-normal)

  # Hide the bell icon in the toolbar. Requires card-mod.
  # https://github.com/thomasloven/lovelace-card-mod
  card-mod-theme: no-bell-icon
  card-mod-root-yaml: |
    .: |
      mwc-icon-button[label] {
        display: none;
      }
```

### Мини-карта памяти с поддержкой синтеза речи и ярлыками.

Карта Mini Media поддерживает ввод текста в речь (TTS) для умных колонок (Echo, Google Home и др.) и кнопки быстрого доступа к песням/станциям. TTS использует сервис, который ioBroker не поддерживает по умолчанию, поэтому требуется специальная настройка для ioBroker:

```yaml
tts:
  platform: iobroker
  entity_id: input_text.multimedia_Alexa_Arbeitszimmer_Commands_speak
```

`platform` должно быть`iobroker` .`entity_id` должен указывать на существующий текст`entity` Затем эта область заполняется текстом — таким образом, можно использовать любую систему преобразования текста в речь ioBroker.

Кнопки быстрого доступа могут вызывать любые сервисы; для ioBroker хорошо подходит что-то подобное:

```yaml
shortcuts:
  columns: 4
  buttons:
    - icon: 'mdi:pirate'
      type: service
      id: input_text.set_value
      data:
        entity_id: input_text.multimedia_Alexa_Arbeitszimmer_Player_playSongAmazon
        value: Piraten von Karsten Glück
    - icon: 'mdi:cake'
      type: service
      id: input_text.set_value
      data:
        entity_id: input_text.multimedia_Alexa_Arbeitszimmer_Player_playSongAmazon
        value: Wie schön dass du geboren bist
```

`input_text.set_value` записывает текст в точку данных;`entity_id` является текстовым объектом и`value` текст для написания.

![мини-медиаплеер с поддержкой синтеза речи и сочетаниями клавиш](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/mini-media-player.JPG)

### Часы

Встраивание времени, например, с помощью [Clockwork Card](#tested-cards) . Датчика времени нет; время предоставляет браузер:

```yaml
type: 'custom:clockwork-card'
title: Time
locale: en-gb
other_time:
  - Europe/Berlin
```

Чтобы скрыть блок справа, скройте его вместе с...`card-mod` карта:

```yaml
type: 'custom:clockwork-card'
title: Time
style: |
    .other_clocks { display: none }
locale: en-gb
other_time:
    - Europe/Berlin
```

### Привязки Markdown

Карточку Markdown можно использовать с привязками, как в [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) .

Например, текст`Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` производит`Admin adapter is alive` в карточке Markdown. Кроме того, шаблоны Home Assistant (`{{ states("…") }}` ,`is_state` ,`state_attr` ,`now()` , …) можно использовать.