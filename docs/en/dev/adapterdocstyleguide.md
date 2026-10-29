---
title: Documentation Style Guide
lastChanged: 06.05.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/adapterdocstyleguide.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: KNaN4V9UbZzyglcLi3e59mWopbv6OYPmg0lWHg4svgU=
---
# Style guide for creating adapter documentation

- The documentation is created using the "Markdown" language.
- The file storage for the adapter documentation is regulated as follows:
  - Each adapter project contains a folder `/doc`.
  - If the documentation is available in German, it will be located in the subfolder `de` saved. Currently supported languages and therefore folder names are: `en, de, ru, pt, nl, fr, it, es, pl`.
  - The actual adapter documentation is in the file `README.md`, which is located directly in the respective language folder.
  - Media will be stored in the subfolder `media` filed, which is also located in the language folder.
  - Except for README.md, file and folder names are written in lowercase. The following characters are allowed: `a-z`, `0-9`, the underscore `_` as well as the decimal point `.`
- Documents should have a line break after 80 characters.
- Preferably, the text formatting should be as shown in the file. `.editorconfig` described.
  - A[Plugin][] The automatic application of these rules is available for various editors.
- For German texts, adherence to the new German spelling rules is preferred.
- The use of personal pronouns (e.g. "I", "you", "we") should be avoided in reference documentation.
  - Use gender-neutral pronouns and plural nouns.
    - Okay: "they (several)", "their (possessions)", "persons", "people", "developers"
    - Incorrect: "his", "her", "he", "she (woman)", "boys", "girls"
- When bracket elements are used (all bracket forms and quotation marks), punctuation is placed as follows:
  - Within the parentheses, if the parenthesized element contains a complete sentence (subject, predicate, object).
  - Outside the parentheses, if the parenthesized element contains only a clause.
- Documents always begin with a heading at the H1 level.
- Links are not placed inline (e.g., with `[a link](http://example.com)`), but using inline `[a link][]` and `[a link]: https://a.link/to/know` placed at the end of the document.
- When using dashes, the short form with the minus sign is used, not "—" or `Option+Shift+"-"` in OSX.
- Additional content:
  - Documents such as binary files, images, video or audio recordings are stored in the folder `media` filed.
  - For general files, media is embedded in the text using... `[Medienbegriff](media/{dateiname})` and for images using `![Medienbegriff](../../de/dev/media/{dateiname})`.
  - Images should preferably be saved in SVG format. If SVG is not possible, then a PNG file is acceptable. Please keep an eye on the file size.
  - Short videos can be embedded as GIF files.
  - A brief description of the content should be given in italics under each image.
- The following applies to source code sections:
  - Depending on the source code language, appropriate markup must be chosen. For example: `\` \`\`\` for JavaScript.
  - Source code can be complete, but it doesn't have to be. Source code blocks provide examples to illustrate the point being described. Therefore, fully functional programs do not need to be provided. If a fully functional program is required, it will be provided as a media file in the folder. `media/{code_beispieldatei}` with a corresponding link in the documentation.
- If underscores, single quotes, asterisks or backslashes are used, the correct escape characters must be inserted: `\_`, `\*`, `\\` and``\` `` instead of `_`, `*`, `\` and`` ` ``.
- To highlight a particular point, the following guidelines should be observed:
  - The "Note:" label should be set in italics, i.e., as `*Hinweis*:`.
  - After the "Note:" identifier, continue with a capital letter.
  - The note should be placed at the beginning of a new paragraph so that it is more visible.
- There is a \[documentation] for the adapters.[Vorlage][] The relevant template sections must be used in the specified order and format.

[Plugin]: http://editorconfig.org/#download
[Vorlage]: dev/adaptertemplate