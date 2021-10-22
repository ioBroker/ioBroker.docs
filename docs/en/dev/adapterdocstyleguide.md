---
title: Documentation style guide
lastChanged: 06.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdocstyleguide.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: amdkGGbA28UH+A3DZkX3kwJ7W9Z1znae5k5zXk7cVMU=
---
# Style guide for creating adapter documentation
* The documentation is created using the "Markdown" language.
* The file storage for the adapter documentation is regulated as follows:
  * There is a folder in every adapter project

    `/doc`.

  * If the documentation is in German, it will be in the subfolder

`de` saved. Currently supported languages and thus folder names are: `en, de, ru, pt, nl, fr, it, es, pl`.

  * The actual adapter documentation is in the file `README.md`,

    which is located directly in the respective language folder.

  * Media are stored in the subfolder `media`, which is also located in the

    Language folder is located.

  * Except for README.md, file and folder names are written in lowercase letters.

The characters `a-z`, `0-9`, the underscore `_` and the decimal point `.` are allowed.

* Documents should have a line break of 80 characters.
* Preferably the text formatting is done like in the file `.editorconfig`

  described.

  * A [plugin] [] to automatically apply these rules is for

    different editors available.

* For German texts, compliance with the new German spelling is required

  preferred.

* In reference documentation, the use of personal pronouns (e.g.

  "I", "you", "we") should be avoided.

  * Use gender-neutral pronouns and multiple nouns.
    * OK: "they (several)", "their (property)", "persons",

      "People", "developers"

    * Not okay: "his", "her", "he", "she (woman)", "boys", "girls"
* If bracket elements are used (all bracket forms and

  Quotation marks), punctuation marks are set as follows:

  * Inside the bracket if the bracket element is a complete

    Sentence contains (subject, predicate, object).

  * Outside the bracket if the bracket element is only a subset

    contains.

* Documents always begin with a heading on level H1.
* Links are not placed inline (e.g. with `[a link] (http://example.com)`),

but with the help of inline `[a link][]` and `[a link]: https://a.link/to/know` at the end of the document.

* When dashes are used, the short notation is used

  with the minus sign and not "-" or `Option+Shift+"-"` in OSX.

* Additional content:
  * Documents such as binary files, images, video or audio recordings will be

    stored in the folder `media`.

  * The media are included in the text for general files

by means of `§§LLLLL_0§§` and for images by means of `![Media term](../../de/dev/media/{dateiname})`.

  * Images are preferably stored in SVG format. When SVG

is not possible, then as a PNG file. Please keep an eye on the file size.

  * Short videos can be embedded as a GIF file.
  * Under each picture there is a short description of the content in italics

    to specify.

* The following applies to source code sections:
  * Depending on the source code language, a corresponding markup must be selected. To the

    Example `\` \ `\`` for JavaScript.

  * A source text can, but does not have to be, complete. Source code blocks

represent examples to clarify the point of view just described. So there is no need to deliver completely executable programs. However, if a fully executable program is to be provided, this is done as a media file in the folder `media/{code_beispieldatei}` with a corresponding link in the documentation.

* If underscores, quotation marks, asterisks or backslashes are used

the correct escape characters have to be used: `\_`, `\*`, `\\` and ``\`` ` anstelle von `_`, ` * §§ SSSSS_6§§ \ ` und `` ` ``.

* To make a note stand out, the following guidelines are

  to note:

 *The "Note:" identifier must be set in italic, i.e. as `* Note* `.
  * After the "Note:" identifier, continue with a capital letter.
  * The note must be placed at the beginning of a new paragraph so that it

    is more visible.

* There is a [template] [] for the adapter documentation. The relevant

  Template sections are to be used in the stored order and form.

[Plugin]: http://editorconfig.org/#download

[Vorlage]: dev/adaptertemplate