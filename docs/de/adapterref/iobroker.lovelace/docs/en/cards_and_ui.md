---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md
title: Benutzerdefinierte Karten, Designs & UI-Tipps
hash: ZK4xoFC8RElxssky4eweacFUGplOLAsnz4K+TyD0nrY=
---
![Logo](../../../../../en/adapterref/iobroker.lovelace/admin/lovelace.png)

# Benutzerdefinierte Karten, Designs & UI-Tipps

- [Benutzerdefinierte Karten](#custom-cards)
- [Eigene Bilder](#own-images)
- [Themen](#themes)
- [Symbole](#icons)
- [UI-Tipps](#ui-tips)

## Benutzerdefinierte Karten

Lovelace kann mit selbstgemachten Karten erweitert werden (`custom cards` Sie werden als JavaScript-Datei (\*.js) bereitgestellt, die über die Lovelace-Konfiguration hochgeladen werden muss (`Files` (Registerkarte im Adminbereich oder per Drag & Drop in den Instanzeinstellungen).

Zum Hochladen über die Kommandozeile, wo iobroker installiert ist:

`iobroker file write PATH_TO_FILE\bignumber-card.js /lovelace.0/cards/`

Nach einem Neustart des Lovelace-Adapters wurden alle Dateien von`cards` Die Verzeichnisse werden automatisch eingebunden.

Falls eine Karte zusätzliche Ressourcen (CSS- oder JS-Dateien) benötigt, erstellen Sie die Ordnerstruktur im folgenden Verzeichnis neu:`cards` Verzeichnis und die Dateien werden dort abgelegt. Der Adapter erkennt URLs, die mit beginnen.`/hacsfiles/` und leitet sie um zu`cards` Verzeichnis. Wenn Sie also sehen`404` Fehler für URLs einschließlich`/hacsfiles/` Passen Sie die Ordnerstruktur entsprechend an. Zum Beispiel eine Karte, die Folgendes benötigt`/hacsfiles/folder1/folder2/file3.json` muss platziert werden bei`/lovelace.0/cards/folder1/folder2/file3.json` Die

Oft werden benutzerdefinierte Karten als Quellcode auf GitHub gespeichert und müssen vor der Verwendung kompiliert werden. Überprüfen Sie die`Releases` Menü auf GitHub für kompilierte Dateien, z. B. [Mini-Graph-Karten-Releases](https://github.com/kalkih/mini-graph-card/releases) (suchen Sie nach`mini-graph-card-bundle.js` ).

### Getestete Karten

Die folgenden Karten wurden vom Entwickler oder der Community getestet und funktionieren. Im Allgemeinen sollten die meisten Karten funktionieren; Probleme entstehen oft durch Inkompatibilität zwischen der verwendeten Lovelace-Version und der Karte. Verwenden Sie daher möglichst die neuesten Kartenversionen.

- **[Clockwork Card](https://github.com/barleybobs/ha-clockwork-card)** – ein funktionierender Fork (das Original wird nicht mehr weiterentwickelt). Konfiguration: siehe [Uhr](#clock) . Es gibt keinen Zeitsensor; die Zeit wird vom Browser bezogen, daher muss die Konfiguration ohne Zeitsensor erfolgen.`entity_id` und mit Zeitzonen.
- **[Mini Media Player](https://github.com/kalkih/mini-media-player)** – ein sehr vielseitig konfigurierbarer Mediaplayer, der auch [Text-to-Speech und Schnellzugriffstasten](#mini-media-card-with-tts-and-shortcuts) unterstützt.
- **[Mini Graph Card](https://github.com/kalkih/mini-graph-card)** – eine sehr flexibel konfigurierbare Karte für Sensordaten, die verschiedene Entitäten als Graphen oder Balkendiagramme darstellt.

## Eigene Bilder

Benutzerdefinierte Bilder (z. B. für einen Hintergrund) können über denselben Dialog wie benutzerdefinierte Karten hochgeladen werden. Verwenden Sie sie in der Lovelace-Konfiguration wie folgt:

`background: center / cover no-repeat url("/cards/background.jpg") fixed`

oder

`background: center / cover no-repeat url("/local/custom_ui/background.jpg") fixed`

Mehr über Hintergründe in Lovelace erfahren Sie [hier](https://www.home-assistant.io/lovelace/views/#background) .

## Themen

Themes können im Konfigurationsdialog von ioBroker definiert werden. Mit dem Frontend-Update 2026 hat sich die Theme-Verwaltung geändert – siehe die [Hinweise zur Theme-Migration](/#/docs/adapterref/iobroker.lovelace/docs/en/theme_migration.md) . Fügen Sie beispielsweise Folgendes ein:

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

(Ein vollständiges Beispiel ist das [Mitternachtsthema](https://community.home-assistant.io/t/midnight-theme/28598/2) . Beachten Sie, dass viele`paper-*` Die Variablen des alten Themensystems sind veraltet – siehe die Migrationshinweise.)

## Symbole

Verwenden Sie Symbole in folgender Form`mdi:NAME` , wie`mdi:play-network` Die Namen finden Sie hier: <https://pictogrammers.com/library/mdi/>

## UI-Tipps

### Anpassen der Titelleiste

Die Titelleiste kann mit der [Card-Mod-](https://github.com/thomasloven/lovelace-card-mod) Erweiterung angepasst werden. Fügen Sie den folgenden YAML-Code zu Ihrem Theme hinzu:

Entfernen Sie die Glocke:

```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
```

Suche entfernen und Hilfe anbieten:

```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
    ha-icon-button[slot="actionItems"] { display: none; }
```

Suche, Hilfe und das Punktmenü entfernen:

```yaml
  card-mod-theme: THEMENAME
  card-mod-root: |
    mwc-icon-button[label] { display: none; }
    ha-icon-button[slot] { display: none; }
```

Titelleiste vollständig ausblenden: Status festlegen`lovelace.0.instances.hideHeader` Zu`true` (Nach einem Neuladen wird der Header in allen Browsern entfernt.) Der Zustand existiert zudem pro Instanz und kann daher für jeden Browser individuell festgelegt werden.

#### Ein komplettes Design, das wie das Standarddesign aussieht, aber ohne die Glocke.

Die oben genannten Code-Schnipsel funktionieren nur innerhalb eines Themes. Falls Sie kein eigenes Theme erstellen möchten, finden Sie hier ein kleines, in sich geschlossenes Theme (`no-bell-icon` ) das dem standardmäßigen dunklen Look weitgehend entspricht und die Glocke entfernt. Fügen Sie es in die Designkonfiguration ein und wählen Sie es anschließend aus (z. B. über den Status).`lovelace.0.instances.set_theme` Das Thema kann erst ausgewählt werden, nachdem der Datenpunkt vorhanden ist und der Adapter neu gestartet wurde.

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

### Mini-Medienkarte mit TTS und Kurzbefehlen

Die Mini Media Card unterstützt die Text-to-Speech-Eingabe (TTS) für Smart Speaker (Echo, Google Home usw.) und Schnellzugriffstasten für Lieder/Sender. TTS nutzt einen Dienst, der von ioBroker nicht standardmäßig unterstützt wird, daher ist eine ioBroker-spezifische Konfiguration erforderlich.

```yaml
tts:
  platform: iobroker
  entity_id: input_text.multimedia_Alexa_Arbeitszimmer_Commands_speak
```

`platform` muss sein`iobroker` Die`entity_id` muss auf einen bestehenden Text verweisen`entity` Anschließend wird der Text eingespielt – so kann jedes ioBroker-Text-to-Speech-System verwendet werden.

Über Tastenkombinationen können beliebige Dienste aufgerufen werden; für ioBroker funktioniert beispielsweise Folgendes gut:

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

`input_text.set_value` schreibt einen Text in einen Datenpunkt;`entity_id` ist die Textentität und`value` den zu schreibenden Text.

![Mini-Mediaplayer mit TTS und Tastenkombinationen](../../../../../en/adapterref/iobroker.lovelace/docs/de/media/mini-media-player.JPG)

### Uhr

Die Zeitangabe kann beispielsweise mit der [Clockwork Card](#tested-cards) eingebettet werden. Es gibt keinen Zeitsensor; die Zeit wird vom Browser bereitgestellt.

```yaml
type: 'custom:clockwork-card'
title: Time
locale: en-gb
other_time:
  - Europe/Berlin
```

Um den Block auf der rechten Seite auszublenden, blenden Sie ihn zusammen mit dem Block auf der rechten Seite aus.`card-mod` Karte:

```yaml
type: 'custom:clockwork-card'
title: Time
style: |
    .other_clocks { display: none }
locale: en-gb
other_time:
    - Europe/Berlin
```

### Markdown-Bindungen

Die Markdown-Karte kann mit Bindungen wie in [iobroker.vis](https://github.com/ioBroker/ioBroker.vis#bindings-of-objects) verwendet werden.

Beispiel der Text`Admin adapter is {a:system.adapter.admin.0.alive;a === true || a === 'true' ? ' ' : 'not '} *alive*.` produziert`Admin adapter is alive` in einer Markdown-Karte. Darüber hinaus gibt es Home Assistant-Vorlagen (`{{ states("…") }}` ,`is_state` ,`state_attr` ,`now()` , …) kann verwendet werden.