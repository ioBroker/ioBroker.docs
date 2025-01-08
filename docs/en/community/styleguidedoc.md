---
title: style guide documentation
lastChanged: 13.06.2019
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/styleguidedoc.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: mfCPW6sFRTOA8DZNqHydfib2TK+qdfZMNwiFfig9vtw=
---
# Style Guide Documentation
* The documentation is created using the [Markdown][] language.
* File and folder names are written in lowercase letters.

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

* Outside the brackets, if the bracket element contains only a partial sentence

contains.

* Documents always start with a heading at level H1.
* Links are not placed inline (e.g. with `[a link](http://example.com)`),

but placed at the end of the document using inline `[a link][]` and `[a link]: https://a.link/to/know`.

* When em dashes are used, the short form is used

with the minus sign and not "—" or `Option+Shift+"-"` in OSX.

* Additional content:
* Documents such as binary files, images, video or audio recordings are

stored in the folder `media`.

* The integration of media into the text is done for general files

using `§§LLLLL_0§§` and for images using `![media concept](../../de/community/media/{dateiname})`.

* Images are preferably saved in SVG format. If SVG

If this is not possible, then as a jpg or png file. Please keep an eye on the file size.

* The following applies to source code sections:
* Depending on the source code language, an appropriate markup must be selected.

Example ` ```js` for JavaScript.

* A source text can, but does not have to, be complete. Source text blocks

are examples to illustrate the point just described. It is not necessary to provide fully executable programs. If a fully executable program is to be provided, this is done as a media file in the folder `media/{code_beispieldatei}` with a corresponding link in the documentation.

* If underscores, apostrophes, asterisks or backslashes are used

the correct escape characters must be set: `\_`, `\*`, `\\` and ``\` `` anstelle von `_`, `*`, `\` und `` ` ``.

* To emphasize a note, the following guidelines are

to note:

- The "Note:" identifier must be set in italic, i.e. as `*Note*:`.
- After the "Note:" identifier, continue with a capital letter.
- The note should be placed at the beginning of a new paragraph so that it is more visible.

* There is a separate [Style Guide][] for adapter documentation.

[Plugin]: http://editorconfig.org/#download

[Style Guide]: https://www.iobroker.net/#de/documentation/dev/adapterdocstyleguide.md

[Markdown]: https://www.iobroker.net/#de/documentation/community/docmarkdown.md