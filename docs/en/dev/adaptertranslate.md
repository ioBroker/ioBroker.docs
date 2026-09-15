---
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adaptertranslate.md
title: Translate adapter
lastChanged: 09.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: traQWPDJam56zpSNQ7pwPO1Fp8edt1DVRACNnl/cgFA=
---
# Translate adapter

ioBroker is used worldwide. For an adapter to be understood everywhere, three things need to be translated:

- the texts of the configuration interface,
- `title` and`desc` in the`io-package.json` ,
- the change notes (`news` ) in the`io-package.json` .

**English** and **German** are mandatory. Everything else is voluntary, but welcome.

## The supported languages

`en` ,`de` ,`ru` ,`pt` ,`nl` ,`fr` ,`it` ,`es` ,`pl` ,`uk` ,`zh-cn` .

## The tool

Translation is done with`@iobroker/adapter-dev` It belongs to the category of developmental dependencies:

```bash
npm install --save-dev @iobroker/adapter-dev
```

In the`package.json` It will receive an entry under`scripts` :

```json
"scripts": {
    "translate": "translate-adapter"
}
```

An adapter from [Adapter Creator](/docs/dev/adapterdev.md) already includes this feature.

!> The old`gulp translate` It's no longer available. Anyone who still has one...`Gruntfile` or a`gulpfile.js` For translations in the package, replace them with`adapter-dev` .

## The process

New texts are **only** written to the English file, i.e., in`admin/i18n/en.json` or`admin/src/i18n/en.json` . Thereafter:

```bash
npm run translate
```

This fills in all the missing translations in the other language files and in the`io-package.json` only certain languages:

```bash
npm run translate -- -l de fr it
```

An interface in the old HTML style also has a`words.js` It is no longer cultivated by hand, but produced:

```bash
npm run translate all
```

This translates and then writes`words.js` from the JSON files. Anyone who doesn't have any JSON files yet should call \[command/method] once.`npm run translate to-json` to remove them from the existing`words.js` to produce.

The commands come in three forms: written out (`to-json` ), as a sign (`j` ) and under the old gulp name (`adminWords2languages` They do the same thing.

## What is translated with

Used without any further settings`adapter-dev` The free Google Translate service has a limited number of uses. DeepL provides better results. This only requires one environment variable:

```bash
export DEEPL_API_KEY="…"
npm run translate
```

Is also`GOOGLE_APPLICATION_CREDENTIALS` If set to this order, it is DeepL, then Google Translate V3, then the free Google Translate.

Machine translation is a start, not a solution. The German and English texts should always be proofread manually. The section on technical terms in the [style guide](/docs/dev/adapterdocstyleguide.md) illustrates how often a machine gets it wrong.

## Weblate

For community-based translation, there's [weblate.iobroker.net](https://weblate.iobroker.net/) . If you register your adapter there, you'll receive translations from native speakers instead of a machine. Weblate calls`to-words` even as soon as something changes.

## The adapter documentation

A separate procedure applies to the pages under [Adapter](/adapters) . It is described under [Documentation Style Guide](/docs/dev/adapterdocstyleguide.md) and [Documentation Template](/docs/dev/adapterdoctemplate.md) .