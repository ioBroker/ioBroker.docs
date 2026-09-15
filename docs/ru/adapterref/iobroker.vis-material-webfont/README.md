---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-material-webfont/README.md
title: ioBroker.material-webfont
hash: kaityeD7ZEIP9IIznnytr/wTy12yRYg0pNYvN/bem20=
---
![Логотип](../../../en/adapterref/iobroker.vis-material-webfont/admin/material-webfont.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.vis-material-webfont.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.vis-material-webfont.svg)
![Статус зависимости](https://img.shields.io/david/om2804/iobroker.vis-material-webfont.svg)
![Известные уязвимости](https://snyk.io/test/github/om2804/ioBroker.vis-material-webfont/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.vis-material-webfont.png?downloads=true)

# ioBroker.material-webfont

## адаптер vis-material-webfont для ioBroker

Иконки в стиле Material Design от ( <https://materialdesignicons.com/> )

## Использование

Добавьте базовый HTML и используйте **класс General -> CSS** . ( <https://dev.materialdesignicons.com/getting-started/webfont> )

### Базовый

Каждую иконку можно указать по её имени с префиксом _mdi-_ . Например, чтобы получить иконку «Домой», используйте команду _mdi-home_ .

**Пример:** mdi mdi-home

### Повернуть

```
mdi-rotate-45 - Rotates 45 Degrees.
mdi-rotate-90 - Rotates 90 Degrees.
mdi-rotate-135 - Rotates 135 Degrees.
mdi-rotate-180 - Rotates 180 Degrees.
mdi-rotate-225 - Rotates 225 Degrees.
mdi-rotate-270 - Rotates 270 Degrees.
mdi-rotate-315 - Rotates 315 Degrees.
```

**Пример:** mdi mdi-account mdi-rotate-45

### Подбросить

```
mdi-flip-h - Flip horizontal.
mdi-flip-v - Flip vertical.
```

**Пример:** mdi mdi-account mdi-flip-h **Примечание:** классы mdi-flip-\* и mdi-rotate-\* нельзя использовать для одного и того же элемента одновременно.

### Вращаться

```
mdi-spin - Spinning icon.
```

**Пример:** mdi mdi-loading mdi-spin

### Более

Чтобы увидеть больше (/widgets/material-webfont/css/materialdesignicons.css)

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