---
title: Documentation style guide
lastChanged: 06.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdocstyleguide.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: KNaN4V9UbZzyglcLi3e59mWopbv6OYPmg0lWHg4svgU=
---
# Style guide for creating an adapter documentation
* Documentation is created using the Markdown language.
* The file storage for the adapter documentation is regulated as follows:
  * There is a folder in each adapter project

    `/doc`.

  * If the documentation is in German, it will be in the subfolder

`de` saved. Currently supported languages and thus folder names are: `en, de, ru, pt, nl, fr, it, es, pl`.

  * The actual adapter documentation is in the `README.md` file,

    which is located directly in the respective language folder.

  * Media is placed in the `media` subfolder, which is also in the

    language folder is located.

  * Except for README.md, file and folder names are in lower case.

The characters `a-z`, `0-9`, the underscore `_` and the decimal point `.` are permitted.

* Documents should have a line break at 80 characters.
* Preferably, the text formatting is done as in the `.editorconfig` file

  described.

  * A [plugin][] to automatically apply these rules is available for

    different editors available.

* For German texts, compliance with the new German orthography

  prefers.

* In reference documentation, the use of personal pronouns (e.g.

  "I", "you", "we") to avoid.

  * Use gender-neutral pronouns and multiple nouns.
    * Alright: "they (several)", "your (possession)", "persons",

      "people", "developers"

    * Out of order: "his", "her", "he", "she (woman)", "boys", "gals"
* If bracket elements are used (all bracket shapes and

  quotation marks), punctuation marks are set as follows:

  * Inside the bracket if the bracket element has a complete

    Sentence contains (subject, predicate, object).

  * Outside the parenthesis if the parenthesis element is only a sub-sentence

    contains.

* Documents always begin with a heading at level H1.
* Links are not placed inline (e.g. with `[a link](http://example.com)`),

but placed at the end of the document using inline `[a link][]` and `[a link]: https://a.link/to/know`.

* When dashes are used, the short notation is used

  with the minus sign and not "—" or `Option+Shift+"-"` in OSX.

* Additional content:
  * Documents such as binary files, images, video or audio recordings

    stored in the `media` folder.

  * The integration of the media in the text is done for general files

using `§§LLLLL_0§§` and for images using `![media term](../../de/dev/media/{dateiname})`.

  * Images are preferably stored in SVG format. If SVG

is not possible, then as a PNG file. Please keep an eye on the file size.

  * Short videos can be embedded as a GIF file.
  * Below each image is a brief description of the content in italics

    to specify.

* The following applies to source code sections:
  * Depending on the source code language, an appropriate markup must be selected. For the

    Example `\`\`\`` for JavaScript.

  * A source text can, but does not have to be complete. code blocks

represent examples to clarify the point of view just described by jewels. It is therefore not necessary to supply fully executable programs. However, if a fully executable program is to be made available, this is done as a media file in the `media/{code_beispieldatei}` folder with a corresponding link in the documentation.

* If underscores, inverted commas, asterisks or backslashes are used

the correct escape characters must be set: `\_`, `\*`, `\\` and ``\` `` anstelle von `_`, `*§§ SSSSS_6§§\` und `` ` ``.

* In order to emphasize a note, the following are guidelines

  to note:

  * The "Note:" identifier must be set in italic, ie as `*Note*:`.
  * After the "Hint:" identifier, proceed with a capital letter.
  * The reference should be placed at the beginning of a new paragraph so that it

    is more visible.

* There is a [template][] for the adapter documentation. The relevant ones

  Template sections are to be used in the specified order and form.

[Plugin]: http://editorconfig.org/#download

[Vorlage]: dev/adaptertemplate