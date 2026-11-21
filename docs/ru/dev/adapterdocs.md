---
title: Документация по адаптеру
lastChanged: 19.11.2026
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/dev/adapterdocs.md
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
hash: sx35+ecahQer85kuH1OfjAdM1zPKhA+3Nw7D6cGuqgU=
---
# Документация по адаптеру: README, doc/ и common.docs

![Версия NPM](https://img.shields.io/npm/v/iobroker.myadapter.svg)

Документация к адаптеру хранится в трех местах, каждое из которых предназначено для разных читателей:

| файл                   | читатель                                                                            | Язык                       |
| ---------------------- | ----------------------------------------------------------------------------------- | -------------------------- |
| `README.md`            | Всем, кто найдет адаптер на GitHub, npm или iobroker.net                            | Только на английском языке |
| `doc/en/…`, `doc/de/…` | Пользователи, которые устанавливают и настраивают адаптер (необязательно)           | одна папка на каждый язык  |
| `DEVELOPMENT.md`       | все, кто самостоятельно создает или участвует в разработке адаптера (необязательно) | Английский                 |

`common.docs` в `io-package.json` ioBroker покажет вам, где находится пользовательская документация.

## 1. README.md

### Долг

- **Только английский язык.** Нет абзацев на немецком, нет двуязычных разделов, нет "описания на немецком языке ниже". Переводы должны располагаться после. `doc/<sprache>/` (см. раздел 2).[Repository-Checker][checker] сообщается о наличии файла README не на английском языке (`W6016`).
- **Укажите, для чего предназначен адаптер** , — прямо в первых нескольких строках: к какому устройству, какой службе или протоколу он подключается и что получает от этого пользователь.
- **Ссылка на производителя или устройство** , если таковая имеется: страница продукта, документация по API, веб-сайт сервиса. Должно быть сразу понятно, о каком устройстве идет речь.
- **Достаточно подробное описание.** Пользователь должен иметь возможность установить, настроить и использовать адаптер, не читая код: предварительные условия, настройки в диалоговом окне администратора, созданные точки данных и известные ограничения. Ограничений по количеству слов нет – в обзоре это оценивается с помощью ИИ. README, состоящий из заголовка, одного предложения, списка изменений и лицензии, недостаточен.
- **Инструкций по (совместной) разработке нет.** Сборка, тестирование, сервер разработки, отладка, процесс выпуска и «как внести свой вклад» относятся к разделу «Совместная разработка». `DEVELOPMENT.md` В файле README ссылки на них размещены в одной строке.
- **Установка через npm или GitHub не требуется.** Адаптеры устанавливаются через учетную запись администратора. Инструкции, например... `npm install iobroker.xyz` или средство проверки сообщает о возможности установки с URL-адреса GitHub (`E6012`, `E6013`).
- ** `## Changelog` и `## License` ** как и в двух последних разделах, лицензия находится в самом конце (`E6003`, `E6004`, `W6021`).
- Использует ли адаптер систему Sentry: информация о системе Sentry находится вверху (`W6023`).

### строительные леса

```markdown
![Logo](../../de/dev/admin/myadapter.png)
# ioBroker.myadapter

...

## myadapter adapter for ioBroker

Connects ioBroker to the XY-1000 heat pump by [Manufacturer](https://www.manufacturer.example/xy-1000)
over its local Modbus TCP interface. Reads temperatures, power and operating mode and lets you
change the target temperature and the mode.

## Requirements
- XY-1000 with firmware 2.4 or newer, Modbus TCP enabled in the device menu
- The device must be reachable from the ioBroker host on port 502

## Configuration
| Setting  | Description                                   | Default |
|----------|-----------------------------------------------|---------|
| IP       | Address of the heat pump                      | -       |
| Interval | Polling interval in seconds                   | 30      |

## States
| State               | Writable | Description                 |
|---------------------|:--------:|-----------------------------|
| `info.connection`   |    -     | Connected to the device     |
| `control.mode`      |    ✓     | 0 = off, 1 = heat, 2 = cool |

## Known limitations
- Only one device per instance.

## Documentation
- [User guide (English)](doc/en/README.md)
- [Benutzerhandbuch (Deutsch)](doc/de/README.md)

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md).

## 2. Anwenderdokumentation in doc/en und doc/de

Das README ist die Visitenkarte des Adapters. Die eigentliche Anleitung für Anwender liegt in einem
eigenen Ordner, mit einem Unterordner je Sprache:

```

doc/ en/ README.md ← Главная страница руководства devices.md ← Дополнительные страницы, ссылки на которые есть в README.md media/ ← Скриншоты для этого языка de/ README.md devices.md media/

````

Was hineingehört: Einrichtung Schritt für Schritt mit Screenshots, jede Einstellung erklärt, der
Objektbaum und die Bedeutung der Datenpunkte, Beispiele (Blockly, JavaScript, vis), FAQ und
Fehlersuche. Weitere Seiten werden von der `README.md` desselben Ordners aus verlinkt; iobroker.net
folgt diesen Links und zeigt die Seiten als Kapitel des Adapters an.

**Warum doc/de wichtig ist.** Ohne deutsche Dokumentation ist die deutsche Seite des Adapters auf
iobroker.net eine Maschinenübersetzung des englischen READMEs. Eine von einem Menschen geschriebene
(oder wenigstens gelesene) deutsche Anleitung ist deutlich besser - und ein großer Teil der
ioBroker-Anwender liest Deutsch.

**README_de.md ist nur ein Workaround.** Eine deutsche Kopie des READMEs im Hauptverzeichnis

- erscheint auf iobroker.net nur, wenn sie in `common.docs` eingetragen ist,
- dupliziert Changelog und Lizenz, die dann vom README abweichen,
- bietet keinen Platz für mehrere Seiten oder Screenshots je Sprache.

Den Inhalt nach `doc/de/README.md` verschieben und Changelog und Lizenz dort entfernen - iobroker.net
übernimmt beides automatisch aus dem englischen README.

*Hinweis*: Manche Adapter verwenden `docs/` statt `doc/`. Beides funktioniert, solange `common.docs`
auf die richtigen Dateien zeigt.

## 3. common.docs in der io-package.json

`common.docs` listet die Anwenderdokumentation je Sprache auf. Die Schlüssel sind Sprachkürzel, die
Werte Pfade **relativ zum Hauptverzeichnis des Repositorys**:

```json
{
  "common": {
    "docs": {
      "en": "doc/en/README.md",
      "de": "doc/de/README.md"
    }
  }
}
````

Несколько страниц для каждого языка указываются в виде массива:

```json
"docs": {
  "en": ["doc/en/README.md", "doc/en/devices.md"],
  "de": ["doc/de/README.md", "doc/de/devices.md"]
}
```

Регулировать:

- **`en`является обязательным** , как только`docs` существует ([Schema der io-package.json][schema] (требуется). Если отдельного руководства на английском языке нет, то это`"en": "README.md"` чтобы.
- Разрешенные ключи:`en` ,`de` ,`ru` ,`pt` ,`nl` ,`fr` ,`it` ,`es` ,`pl` ,`uk` ,`zh-cn` .
- Пути без начальной косой черты, не URL-адреса. Регистр букв должен точно соответствовать регистру символов в файле на GitHub.
- **Первая запись** для языка будет содержать ссылку на страницу адаптера на iobroker.net на этом языке. Страницы, на которые ведут ссылки из этой папки, будут автоматически включены; однако, все не связанные между собой страницы все равно следует добавить.
- Список изменений, лицензия и значки всегда поступают из \[источника].`README.md` В`doc/` Не повторяйте.

## Контрольный список для проверки

- [ ] `README.md` исключительно на английском языке
- [ ] `README.md` Указывается назначение адаптера и приводятся ссылки на производителя/устройство/сервис (если применимо).
- [ ] `README.md` Достаточно подробное описание для установки, настройки и использования адаптера.
- [ ] В данном документе отсутствуют инструкции по разработке или участию.`README.md` - они находятся в`DEVELOPMENT.md`
- [ ] Руководство пользователя`doc/en/` и`doc/de/` (вместо`README_de.md` (в главном каталоге)
- [ ] `common.docs` в`io-package.json` ссылки на эти файлы`en` доступно

См. также: [Публикация адаптера](/docs/dev/adapterpublish.md) , [io-package.json](/docs/dev/iopackage.md) , [Руководство по стилю для документации адаптера](/docs/dev/adapterdocstyleguide.md) .

[checker]: https://adapter-check.iobroker.in/
[schema]: https://github.com/ioBroker/ioBroker.js-controller/blob/master/schemas/io-package.json

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2026-11-19)
- (author) initial release

## License
MIT License

Copyright (c) 2026 Author Name
...
```

Das Gerüst ist absichtlich englisch - genau so soll das README aussehen.