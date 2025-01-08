---
title: documentation style guide
lastChanged: 06.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdocstyleguide.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: dIrekLO+dxHSnEzRlai44ZY5jFzOWB7cjj8YT8I1hxg=
---
# Style guide for creating adapter documentation
* The documentation is created using the language "Markdown".
* The file storage for the adapter documentation is regulated as follows:
* In each adapter project there is a folder

`/doc`.

* If the documentation is available in German, it will be stored in the subfolder

`de`. Currently supported languages and therefore folder names are: `en, de, ru, pt, nl, fr, it, es, pl`.

* The actual adapter documentation is in the file `README.md`,

which is located directly in the respective language folder.

* Media is stored in the subfolder `media`, which is also located in the

languages folder.

* Except for README.md, file and folder names are lowercase.

The characters `a-z`, `0-9`, the underscore `_` and the decimal point `.` are permitted.

* Documents should have a line break at 80 characters.
* Preferably, text formatting is done as in the file `.editorconfig`

described.

* A [plugin][] to automatically apply these rules is available for

various editors available.

* For German texts, compliance with the new German orthography is

  preferred.

* In reference documentation, the use of personal pronouns (e.g.

"I", "you", "we").

* Use gender-neutral pronouns and plural nouns.
* OK: "they (several)", "their (possession)", "persons",

"people", "developers"

* Not OK: "his", "her", "he", "she (woman)", "boys", "girls"
* If bracket elements are used (all bracket shapes and

quotation marks), punctuation is placed as follows:

* Inside the bracket, if the bracket element has a complete

Sentence contains (subject, predicate, object).

* Outside the brackets, if the bracket element only contains a partial sentence

contains.

* Documents always start with a heading at level H1.
* Links are not placed inline (e.g. with `[a link](http://example.com)`),

but is placed at the end of the document using inline `[a link][]` and `[a link]: https://a.link/to/know`.

* When em dashes are used, the short form is used

with the minus sign and not "—" or `Option+Shift+"-"` in OSX.

* Additional content:
* Documents such as binary files, images, video or audio recordings are

stored in the folder `media`.

* The integration of media into the text is done for general files

using `§§LLLLL_0§§` and for images using `![media concept](../../de/dev/media/{dateiname})`.

* Images are preferably saved in SVG format. If SVG

If this is not possible, then as a PNG file. Please keep an eye on the file size.

* Short videos can be embedded as GIF files.
* Below each picture is a short description of the content in italics

to be specified.

* The following applies to source code sections:
* Depending on the source code language, an appropriate markup must be selected.

Example `\`\`\`` for JavaScript.

* A source text can, but does not have to, be complete. Source text blocks

are examples to illustrate the point just described. It is not necessary to provide fully executable programs. If a fully executable program is to be provided, this is done as a media file in the folder `media/{code_beispieldatei}` with a corresponding link in the documentation.

* If underscores, apostrophes, asterisks or backslashes are used

the correct escape characters must be set: `\_`, `\*`, `\\` and ``\` `` anstelle von `_`, `*`, `\` und `` ` ``.

* To emphasize a note, the following guidelines are

to note:

* The "Note:" identifier must be set in italic, i.e. as `*Note*:`.
* After the "Note:" identifier, continue with a capital letter.
* The note should be placed at the beginning of a new paragraph so that it

is more visible.

* There is a [template][] for the adapter documentation. The relevant

Template sections must be used in the order and form provided.

[Plugin]: http://editorconfig.org/#download

[Vorlage]: dev/adaptertemplate