---
title: Style guide documentation
lastChanged: 13.06.2019
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/styleguidedoc.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: mfCPW6sFRTOA8DZNqHydfib2TK+qdfZMNwiFfig9vtw=
---
# Style guide documentation
* The documentation is created using the [Markdown] [] language.
* File and folder names are written in lowercase letters.

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

but placed at the end of the document with the help of inline `[a link][]` and `[a link]: https://a.link/to/know`.

* If dashes are used, use the short notation

  with the minus sign and not "-" or `Option+Shift+"-"` in OSX.

* Additional content:
      * Documents such as binary files, images, video or audio recordings will be

      stored in the folder `media`.

      * The media are included in the text for general files

by means of `§§LLLLL_0§§` and for images by means of `![Media term](../../de/community/media/{dateiname})`.

      * Images are preferably stored in SVG format. When SVG

is not possible, then as a jpg or png file. Please keep an eye on the file size.

* The following applies to source code sections:
      * Depending on the source code language, a corresponding markup must be selected. To the

        Example ` ```js` for JavaScript.

      * A source text can, but does not have to be, complete. Source code blocks

represent examples to clarify the point of view just described. So there is no need to deliver completely executable programs. However, if a fully executable program is to be provided, this is done as a media file in the folder `media/{code_beispieldatei}` with a corresponding link in the documentation.

* If underscores, inverted commas, asterisks or backslashes are used

the correct escape characters have to be used: `\_`, `\*`, `\\` and ``\`` ` anstelle von `_`, ` * §§ SSSSS_6§§ \ ` und `` ` ``.

* To make a note stand out, the following guidelines are

  to note:

     - The "Note:" identifier must be set in italic, i.e. as `* Note *:`.
     - After the "Note:" identifier, continue with a capital letter.
     - The note should be placed at the beginning of a new paragraph so that it is more visible.

* There is a separate [Style Guide] [] for adapter documentation.

[Plugin]: http://editorconfig.org/#download

[Style Guide]: https://www.iobroker.net/#de/documentation/dev/adapterdocstyleguide.md

[Markdown]: https://www.iobroker.net/#de/documentation/community/docmarkdown.md