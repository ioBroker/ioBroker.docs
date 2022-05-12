---
title: Style guide documentation
lastChanged: 13.06.2019
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/styleguidedoc.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: Zmgjn4ZXZEX/lmxZOYDoitahdM5B6U5aczZS5gjD+Sk=
---
# Style Guide documentation
* The documentation is created using the [Markdown][] language.
* File and folder names are written in lower case.

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

but placed at the end of the document with the help of inline `[a link][]` and `[a link]: https://a.link/to/know`.

* When dashes are used, the short notation is used

  with the minus sign and not "—" or `Option+Shift+"-"` in OSX.

* Additional content:
      * Documents such as binary files, images, video or audio recordings

      stored in the `media` folder.

      * The integration of the media in the text is done for general files

using `§§LLLLL_0§§` and for images using `![media term](../../de/community/media/{dateiname})`.

      * Images are preferably saved in SVG format. If SVG

is not possible, then as a jpg or png file. Please keep an eye on the file size.

* The following applies to source code sections:
      * Depending on the source code language, an appropriate markup must be selected. To the

        Example ` ```js` for JavaScript.

      * A source text can, but does not have to be complete. code blocks

provide examples to clarify the point of view just described. It is therefore not necessary to supply fully executable programs. However, if a fully executable program is to be made available, this is done as a media file in the `media/{code_beispieldatei}` folder with a corresponding link in the documentation.

* If underscores, inverted commas, asterisks or backslashes are used

the correct escape characters must be set: `\_`, `\*`, `\\` and ``\` `` anstelle von `_`, `*§§ SSSSS_6§§\` und `` ` ``.

* In order to emphasize a note, the following are guidelines

  to note:

     - The "Note:" identifier must be set in italic, i.e. as `*Note*:`.
     - After the "Hint:" identifier, proceed with a capital letter.
     - The reference should be placed at the beginning of a new paragraph so that it is more visible.

* There is a separate [Style Guide][] for adapter documentation.

[Plugin]: http://editorconfig.org/#download

[Style Guide]: https://www.iobroker.net/#de/documentation/dev/adapterdocstyleguide.md

[Markdown]: https://www.iobroker.net/#de/documentation/community/docmarkdown.md