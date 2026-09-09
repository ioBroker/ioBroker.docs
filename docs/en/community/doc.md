---
title: Write an article
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/doc.md
hash: aiFRH7cy88V0rS5ClS7sEPvbhCG7XA1fLIHDHM017hY=
---
# Write an article

This documentation is a collection of Markdown files located in the [ioBroker.docs](https://github.com/ioBroker/ioBroker.docs) repository. Each page here corresponds to exactly one file there. If you find an error or want to add something, edit this file.

## The fast way

At the bottom of each page, next to the modification date, is the link " **Edit on GitHub** ." This links directly to the file that generated the page, and from there, the pencil icon opens an editor in the browser. When saving, GitHub creates a branch and suggests a pull request. A GitHub account is all you need; nothing more is required to make a correction.

For larger changes, the usual approach is worthwhile: branch off the repository, make the changes locally, and submit a pull request.

## Which file is the correct one?

The documentation is available in four languages at`docs/de` ,`docs/en` ,`docs/ru` and`docs/zh-cn` Only one of them is the source. This can be identified by the file header:

```
---
title:       "Reiter Benutzer"
lastChanged: "07.09.2026"
---
```

This is what a source code looks like. A generated translation, on the other hand, displays a field.`translatedFrom` and a warning about that:

```
---
translatedFrom: de
translatedWarning: If you want to edit this document ...
hash: ...
---
```

!> A file with`translatedFrom` **Do not** edit. It will be regenerated on the next run, and the change will be lost. The file is edited in the language from which it was translated.

## Regulate

The binding guidelines are set out in the [style guide](/docs/community/styleguidedoc.md) . The most important points are:

- File names in small, only`a-z` ,`0-9` ,`_` and`.` .
- Line break at 80 characters.
- Every document begins with a Level 1 heading.
- No personal pronouns in reference texts, gender-neutral formulations.
- Use the minus sign as a dash, not a long em dash.
- Pictures and other attachments in the folder`media` next to the side.

**Technical terms remain in their original form.** Anything in the code, a JSON file, or the object tree that appears in this way will not be translated.`state` ,`role` ,`button` ,`level` ,`string` ,`callback` ,`payload` Anyone looking for`level.` A search doesn't find "Stufen" (levels). For developers, the English term is the more familiar one anyway.

It's different for terms that the user reads on the screen: these are written as in the German Admin, i.e. **objects** , **states** , **categories** , **protocols** , **instances** , **hosts** .

Further information on available markup options, such as colored indicator boxes, can be found under [Markdown Syntax](/docs/community/docmarkdown.md) .

## New pages

A new file alone is not enough: the page must also be in`docs/content.md` It must be entered, otherwise it will not appear in the menu. The entry also determines the title in the four languages:

```
  * [en:Users;de:Benutzer;ru:Пользователи;zh-cn:用户](admin/users)
```

If only a word without a language code is listed, it applies to all languages.

## What matters in terms of content

- **Check instead of remembering.** If a page describes a surface, it belongs next to the open surface. Labels change.
- **Tell them what to do.** A list of buttons is not an instruction manual. The reader has a goal.
- **Current images.** A screenshot of an old version is more confusing than helpful. Better no image than an incorrect one.
- **Never claim anything that hasn't been verified.** Presenting a supposition as fact does more harm than admitting a gap in the data.

You don't need to write a whole page. A corrected command, an added sentence, or a current image are welcome contributions.