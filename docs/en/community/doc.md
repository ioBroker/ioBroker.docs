---
title: Write an article
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/doc.md
hash: aiFRH7cy88V0rS5ClS7sEPvbhCG7XA1fLIHDHM017hY=
---
# Write an article

This documentation is available as a collection of Markdown files in the repository.
[ioBroker.docs](https://github.com/ioBroker/ioBroker.docs)Each page here corresponds exactly to one file there. Anyone who finds an error or wants to add something should edit this file.

## The fast way

At the bottom of each page, next to the modification date, is the reference. **Edit on GitHub**It leads directly to the file that generated this page, and from there the pencil icon opens an editor in the browser. When saving, GitHub creates a branch and suggests a pull request. A GitHub account is all that's needed for a fix.

For larger changes, the usual approach is worthwhile: branch off the repository, make the changes locally, and submit a pull request.

## Which file is the correct one?

The documentation is available in four languages at `docs/de`, `docs/en`, `docs/ru`
and `docs/zh-cn`Only one of them is the source. This can be identified by the file header:

```
---
title:       "Reiter Benutzer"
lastChanged: "07.09.2026"
---
```

This is what a source code looks like. A generated translation, on the other hand, displays a field.
`translatedFrom` and a warning about that:

```
---
translatedFrom: de
translatedWarning: If you want to edit this document ...
hash: ...
---
```

!> A file with `translatedFrom` **not** Editing will regenerate the file on the next run, and the change will be lost. The file is edited in the language from which it was translated.

## Regulate

The binding requirements are set out in
[Style guide](/docs/community/styleguidedoc.md)The most important points are:

- File names in small, only `a-z`, `0-9`, `_` and `.`.
- Line break at 80 characters.
- Every document begins with a Level 1 heading.
- No personal pronouns in reference texts, gender-neutral formulations.
- Use the minus sign as a dash, not a long em dash.
- Pictures and other attachments in the folder `media` next to the side.

**Technical terms remain in the original.** Anything contained in the code, a JSON file, or the object tree will not be translated: `state`, `role`,
`button`, `level`, `string`, `callback`, `payload`Anyone looking for `level.` A search doesn't find "Stufen" (levels). For developers, the English term is the more familiar one anyway.

It's different for terms that the user reads on the screen: these are written as in the German admin interface, i.e. **objects**, **Conditions**,
**Categories**, **Protocols**, **Instance**, **Hosts**.

Information on other available awards, such as the colored indicator boxes, can be found under
[Markdown syntax](/docs/community/docmarkdown.md).

## New pages

A new file alone is not enough: the page must also be in `docs/content.md`
It must be entered, otherwise it will not appear in the menu. The entry also determines the title in the four languages:

```
  * [en:Users;de:Benutzer;ru:Пользователи;zh-cn:用户](admin/users)
```

If only a word without a language code is listed, it applies to all languages.

## What matters in terms of content

- **Check instead of remembering.** If a page describes a surface, it belongs next to the open surface. Labels change.
- **Tell them what needs to be done.** A list of buttons is not a set of instructions. The reader has a goal.
- **Recent pictures.** A screenshot of an old version is more confusing than helpful. Better no image than an incorrect one.
- **Don't claim anything that hasn't been verified.** Writing down a conjecture as fact does more harm than a gap in the information.

You don't need to write a whole page. A corrected command, an added sentence, or a current image are welcome contributions.