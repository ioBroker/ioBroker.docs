---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/dev/adaptertranslate.md
title: Adapter übersetzen
lastChanged: "09.09.2026"
---

# Adapter übersetzen

ioBroker wird weltweit benutzt. Damit ein Adapter überall verständlich ist,
müssen drei Dinge übersetzt sein:

* die Texte der Konfigurationsoberfläche,
* `title` und `desc` in der `io-package.json`,
* die Änderungshinweise (`news`) in der `io-package.json`.

Pflicht sind **Englisch** und **Deutsch**. Alles Weitere ist freiwillig, aber
erwünscht.

## Die unterstützten Sprachen

`en`, `de`, `ru`, `pt`, `nl`, `fr`, `it`, `es`, `pl`, `uk`, `zh-cn`.

## Das Werkzeug

Übersetzt wird mit `@iobroker/adapter-dev`. Es gehört in die
Entwicklungsabhängigkeiten:

```bash
npm install --save-dev @iobroker/adapter-dev
```

In der `package.json` bekommt es einen Eintrag unter `scripts`:

```json
"scripts": {
    "translate": "translate-adapter"
}
```

Ein Adapter aus dem [Adapter Creator](/docs/dev/adapterdev.md) bringt das
bereits mit.

!> Das alte `gulp translate` gibt es nicht mehr. Wer noch eine `Gruntfile` oder
ein `gulpfile.js` für Übersetzungen im Paket hat, ersetzt sie durch
`adapter-dev`.

## Der Ablauf

Neue Texte werden **nur** in die englische Datei geschrieben, also in
`admin/i18n/en.json` beziehungsweise `admin/src/i18n/en.json`. Danach:

```bash
npm run translate
```

Das füllt alle fehlenden Übersetzungen in den anderen Sprachdateien und in der
`io-package.json` auf. Nur einzelne Sprachen:

```bash
npm run translate -- -l de fr it
```

Eine Oberfläche im alten HTML-Stil hat zusätzlich eine `words.js`. Sie wird
nicht mehr von Hand gepflegt, sondern erzeugt:

```bash
npm run translate all
```

Das übersetzt und schreibt anschließend `words.js` aus den JSON-Dateien neu.
Wer noch gar keine JSON-Dateien hat, ruft einmalig `npm run translate to-json`
auf, um sie aus der vorhandenen `words.js` zu erzeugen.

?> Die Befehle gibt es in drei Schreibweisen: ausgeschrieben (`to-json`), als
ein Zeichen (`j`) und unter dem alten gulp-Namen
(`adminWords2languages`). Sie tun dasselbe.

## Womit übersetzt wird

Ohne weitere Einstellung benutzt `adapter-dev` das freie Google Translate, das
mengenmäßig begrenzt ist. Besser wird das Ergebnis mit DeepL. Dafür genügt eine
Umgebungsvariable:

```bash
export DEEPL_API_KEY="…"
npm run translate
```

Ist auch `GOOGLE_APPLICATION_CREDENTIALS` gesetzt, gilt die Reihenfolge DeepL,
dann Google Translate V3, dann das freie Google Translate.

!> Maschinelle Übersetzung ist ein Anfang, kein Ergebnis. Die deutschen und
englischen Texte sollten immer noch einmal von Hand gelesen werden. Wie oft
eine Maschine daneben greift, zeigt der Abschnitt zu den Fachbegriffen im
[Styleguide](/docs/dev/adapterdocstyleguide.md).

## Weblate

Für die Übersetzung durch die Gemeinschaft gibt es
[weblate.iobroker.net](https://weblate.iobroker.net/). Wer seinen Adapter dort
einträgt, bekommt Übersetzungen von Muttersprachlern statt von einer Maschine.
Weblate ruft `to-words` selbst auf, sobald sich etwas ändert.

## Die Adapterdokumentation

Für die Seiten unter [Adapter](/adapters) gilt ein eigener Weg. Er steht unter
[Dokumentation-Styleguide](/docs/dev/adapterdocstyleguide.md) und
[Dokumentation-Template](/docs/dev/adapterdoctemplate.md).
