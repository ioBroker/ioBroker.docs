---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-material-webfont/README.md
title: ioBroker.material-webfont
hash: kaityeD7ZEIP9IIznnytr/wTy12yRYg0pNYvN/bem20=
---
![Logo](../../../en/adapterref/iobroker.vis-material-webfont/admin/material-webfont.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.vis-material-webfont.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vis-material-webfont.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/om2804/iobroker.vis-material-webfont.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/om2804/ioBroker.vis-material-webfont/badge.svg)
![NPM](https://nodei.co/npm/iobroker.vis-material-webfont.png?downloads=true)

# ioBroker.material-webfont

## vis-material-webfont-Adapter für ioBroker

Material Design Icons von ( <https://materialdesignicons.com/> )

## Verwendung

Fügen Sie basic-HTML hinzu und verwenden Sie **die CSS-Klasse „Allgemein“ -> „Webfont** “. ( <https://dev.materialdesignicons.com/getting-started/webfont> )

### Basic

Jedes Symbol kann über seinen Namen mit dem Präfix _mdi-_ aufgerufen werden. Um beispielsweise das Home-Symbol zu erhalten, verwendet man _mdi-home_ .

**Beispiel:** mdi mdi-home

### Drehen

```
mdi-rotate-45 - Rotates 45 Degrees.
mdi-rotate-90 - Rotates 90 Degrees.
mdi-rotate-135 - Rotates 135 Degrees.
mdi-rotate-180 - Rotates 180 Degrees.
mdi-rotate-225 - Rotates 225 Degrees.
mdi-rotate-270 - Rotates 270 Degrees.
mdi-rotate-315 - Rotates 315 Degrees.
```

**Beispiel:** mdi mdi-account mdi-rotate-45

### Umdrehen

```
mdi-flip-h - Flip horizontal.
mdi-flip-v - Flip vertical.
```

**Beispiel:** mdi mdi-account mdi-flip-h **Hinweis:** Die Klassen mdi-flip-\* und mdi-rotate-\* können nicht gleichzeitig auf dasselbe Element angewendet werden.

### Drehen

```
mdi-spin - Spinning icon.
```

**Beispiel:** mdi mdi-loading mdi-spin

### Mehr

Weitere Informationen finden Sie unter (/widgets/material-webfont/css/materialdesignicons.css)

## Changelog

### 0.0.3
* (om2804) fixes

### 0.0.1
* (om2804) initial release

## License
Apache 2.0 and SIL Open Font License 1.1

Copyright (c) 2019 om2804 <om2804@mail.ru>

Copyright (c) 2014, Austin Andrews (http://materialdesignicons.com/),
with Reserved Font Name Material Design Icons.

Copyright (c) 2014, Google (http://www.google.com/design/)
uses the license at https://github.com/google/material-design-icons/blob/master/LICENSE