---
title: Markdown syntax
lastChanged: 08.09.2026
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/docmarkdown.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: B+1RR7XQZluKSlEDHUO/7vMSkGuxWoiYo+sm+yAaG5g=
---
# Markdown in the ioBroker documentation

The documentation is in **Markdown** written: a markup language chosen so that a file remains readable even without rendering. Those wishing to contribute an article can find the procedure at
[Write an article](/docs/community/doc.md).

This page has two parts. First, what **here** This applies, meaning the specific features of this documentation. Then, the Markdown syntax in detail.

## What applies here

### The header of each file

```
---
title:       "Kurzer Seitentitel"
lastChanged: "08.09.2026"
---
```

`title` is the name of the page, `lastChanged` the date of the last content change in the format `TT.MM.JJJJ`. The **Name in menu** However, it doesn't come from here, but from... `content.md`.

A field `translatedFrom` This means: The file has been machine-translated and will be overwritten during the next translation run. Do not edit such files.

### Information boxes

Two strings at the beginning of the line create the colored boxes:

```
?> Ein Hinweis. Nützlich, aber nicht dringend.

!> Eine Warnung. Wer sie überliest, macht etwas kaputt.
```

Use sparingly. A page where everything is highlighted highlights nothing.

### Left

Always as **simple path from the root of the documentary**, not relative to the file:

| Goal               | spelling                                  |
| ------------------ | ----------------------------------------- |
| Documentation page | `[Installation](/docs/install/README.md)` |
| Place on one page  | `[Views](/docs/viz/vis.md#views)`         |
| Adapter side       | `[BackItUp](/adapters/backitup)`          |
| Adapter list       | `[Adapter](/adapters)`                    |
| statistics         | `[Statistik](/statistics)`                |

!> **Jump markers always with full path**, even within the same page. And they only work up to the third heading level: a `####` It receives no identifier, and therefore cannot be linked to.

### Pictures

Images are located in the folder `media` next to the side and are addressed from there:

```
![Kurze Beschreibung](../../de/community/media/dateiname.png)
```

The text in square brackets is not decorative: it appears where the image cannot be loaded, and it will be read aloud. If an image should be narrower than the text area, this can be achieved by specifying a width:

```html
<img src="media/dateiname.png" alt="Kurze Beschreibung" width="630" />
```

### What the renderer can do

In addition to the original Markdown syntax, the following are available:

- **tables** in GitHub notation (`| Spalte | Spalte |`)
- **Code blocks with three backticks**, with language specification for the coloring
- **Strikethrough text** with `~~zwei Tilden~~`
- **Inline HTML**, for cases that Markdown does not cover

### spelling

- Line break at 80 characters.
- Every document begins with a Level 1 heading, and only one.
- The minus sign is represented by a line. **none** long dash.
- Technical terms remain in the original: `state`, `role`, `level`, `string`Anyone looking for
  `level.` Searching, it does not find "Stufen".
- File names in small, only `a-z`, `0-9`, `_` and `.`.

The full specifications are available in
[Style guide](/docs/community/styleguidedoc.md).

## The Markdown syntax in detail

The following section is a translation of John Gruber's original syntax description; the source and license are listed at the end of the page. It describes Markdown 1.0.1 and therefore does not include tables or code blocks with backticks; however, both are present here, as mentioned above.

### Regarding the origin of this description

#### philosophy

Markdown was designed with the basic idea of being easy to read and write.\
to be as good as possible.

Readability is the primary goal here. A Markdown-formatted document should\
in its basic form can be published without giving the impression that\
It should be tagged or formatted with commands (as is the case with HTML).

Accordingly, Markdown's syntax consists only of characters that have been carefully chosen.\
They were chosen so that their appearance reflected their importance. For example, they look\
An asterisk around a word actually looks like an \*emphasis\*. (Listen in Markdown.)\
They look like lists. Even quote blocks look like quoted text passages.\
as you know them from emails.

#### Inline HTML

Markdown's syntax has one purpose: to be used for the web. _write_.

Markdown is not a replacement for HTML, not even close. The scope of the syntax\
is very small and represents only a small fraction of all HTML tags. It is\
Markdown's intention is not to facilitate the insertion of HTML tags. HTML\
is already simple enough. The idea behind Markdown is to make text as easy as possible.\
It is possible to read, write, and edit HTML. _Publication format_;\
Markdown is a _Writing forma&#x74;_&#x54;herefore, its syntax only considers content.\
which can be conveyed with text alone.

For any formatting that is not possible with Markdown, HTML can simply be used.\
It can be used. There is no need to mark up HTML to separate it from the rest.\
It is simply written into the text.

The only limitation is block elements such as... `<div>`, `<table>`, `<pre>`,\
`<p>` and so on. They must be separated from the surrounding content by blank lines.\
Furthermore, the start and end tags should not contain spaces or tabs.\
It should be indented. Markdown is intelligent enough not to add any extra (unwanted) indentation.\
`<p>`-Tags to set HTML blocks.

Here's how to embed an HTML table in a Markdown article, for example:

```
Dies ist ein normaler Absatz.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

Dies ist noch ein normaler Absatz.
```

It should be noted that Markdown syntax does not work within HTML blocks.\
is interpreted. For example, it cannot be interpreted as... _emphasis_ within HTML\
Blocks are used.

Inline HTML tags such as `<span>`, `<cite>`, or `<del>` can anywhere in\
a Markdown paragraph, list item or header can be used.\
HTML tags can even be used instead of the corresponding Markdown formatting.\
It will be. It is no problem to use Markdown's syntax for links or graphics instead.\
simply `<a>` or `<img>` to use.

Unlike block tags _becomes_ the Markdown syntax within inline tags\
interpreted.

#### Automatic masking of special characters

In HTML, there are two characters that require special treatment: `<` and `&`.\
The left angle bracket is used to open HTML tags, the commercial one.\
And is used to describe named entities.\
Characters in HTML documents that are to be used as "themselves" must be\
be masked as entities, i.e., as `&lt;` and `&amp;`.

The ampersand (&) is particularly impractical for web developers. If you want to talk about...\
To write "AT\&T", one must "`AT&amp;T`"write. The commercial 'And' must even be used."\
be masked in URLs. In a link to the page

`http://images.google.com/images?num=30&q=larry+bird`

The URL must be encoded as follows:

`http://images.google.com/images?num=30&amp;q=larry+bird`

This is easy to forget and probably the most common mistake in validation.\
from otherwise well-formed HTML documents.

Markdown allows you to use these characters normally. It handles the encoding.\
Even if an ampersand is used in an entity, it is not encoded.\
otherwise `&amp;` converted.

So, for example, if you want to enter a copyright symbol, you can simply

`&copy;`

write, and Markdown will not modify this. But from

`AT&T`

will Markdown

`AT&amp;T`

do this. Since Markdown supports inline HTML, angle brackets in the corresponding\
The case is treated normally as HTML. Only things like...

`4 < 5`

will Markdown

`4 &lt; 5`

to do. Angle brackets and the commercial code are used in code or span blocks.\
And however _always_ encoded. This simplifies writing HTML in Markdown.\
(Unlike raw HTML, where it's usually a nightmare to manage every `<` and `&` to code).

### Block elements

#### Paragraphs and line breaks

A paragraph simply consists of one or more lines of text, separated by a line.\
through one or more empty lines. (An empty line is any line that _looks_\
like a blank line -- a line that contains nothing but spaces and\
Tabs are treated as empty.) Normal paragraphs should not contain spaces or\
Tabs should be indented.

The "one or more lines" rule implies one thing: Markdown supports\
Paragraphs with "hard breaks". This is a big difference from most.\
other text-to-HTML formatters (including the "Convert Line Breaks" option of\
Movable Type), which treats each line break in a paragraph as `<br />` format.

If you have a `<br />` as a period of change _will_, you can simply replace the line with\
two or more spaces terminate the sequence.

This is a small additional effort to a `<br />` to create, but a simple\
"each line break is a `<br />`"This rule wouldn't work in Markdown."

Markdown's email-like [Quotes](#zitate) and [List entries](#listen) with several paragraphs\
They work best – and look better – when they use line breaks.\
be formatted.

[bq]: #blockquote
[l]: #list

#### Headings

Markdown here only supports one type of header formatting: atx.\
ATX-type headers use 1-6 hash symbols at the beginning of the line, accordingly\
Levels 1-6. For example:

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

#### Quotes

Markdown uses the character - like emails do. `>` for quote blocks. If you\
Anyone with experience using quotes in emails also knows how to use quotes in Markdown.\
created. It looks best if you wrap the text on each line and a\
`>` places before each line:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,`
`> consectetuer adipiscing elit. Aliquam hendrerit mi posuere`
`> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet`
`> vitae, risus.`
`>`
`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.`
`> Suspendisse id sem consectetuer libero luctus adipiscing.`

Markdown also allows you to be lazy, and that `>` only on the first line of a\
to use a hard-break paragraph:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,`
`consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.`
`Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,`
`risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.`
`Suspendisse id sem consectetuer libero luctus adipiscing.`

Quotes can be nested (i.e., a quote within a quote) by using more `>`\
used:

`    > Dies ist die erste Zitat-Ebene.`
`    >`
`    > > Dies ist ein verschachteltes Zitat.`
`    >`
`    > Zurück auf der ersten Ebene.`

Quotes can contain other Markdown elements, including headers, lists, and\
Code blocks:

```
> ## Dies ist eine Überschrift.
>
> 1.   Dies ist der erste Listenpunkt.
> 2.   Dies ist der zweite Listenpunkt.
>
> Hier ist ein wenig Beispiel-Code:
>
>     return shell_exec("echo $input | $Markdown_script");
```

Any decent text editor should make quoting in email style easy. In BBEdit, for example, you can make a selection and choose from the menu. `Text` the point `Increase Quote Level` choose.

#### Listen

Markdown supports sorted (numbered) and unsorted lists (enumerations).

Unsorted lists use asterisks, plus signs, and dashes—interchangeable—as list markers:

```
*   Rot
*   Grün
*   Blau
```

is the same:

```
+   Rot
+   Grün
+   Blau
```

And:

```
-   Rot
-   Grün
-   Blau
```

Sorted lists use numbers followed by a period:

```
1.  Hund
2.  Katze
3.  Maus
```

It's important to understand that the numbers themselves have no effect on the output of Markdown. Markdown generates the following HTML code from the last list:

```
<ol>
<li>Hund</li>
<li>Katze</li>
<li>Maus</li>
</ol>
```

If you write the list like this instead:

```
1.  Hund
1.  Katze
1.  Maus
```

Or even:

```
3. Hund
1. Katze
8. Maus
```

The same list is generated every time. If desired, you can number your lists correctly by hand. But if you want to be lazy, you can simply use the same number every time.

However, you should still start the list with number 1. In the future, Markdown may want to specify a starting number for the first list entry.

List entries normally begin on the left margin of the document, but they can be indented up to three spaces to the right. List markers must be separated from the following text by one or more spaces or a tab.

To format lists nicely, the individual entries can be indented further, as shown here:

```
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
    viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.
```

The following example generates the same code, but is less clean:

```
*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,
viverra nec, fringilla in, laoreet vitae, risus.
*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
Suspendisse id sem consectetuer libero luctus adipiscing.
```

If list entries are separated by blank lines, Markdown will group the list entries with `<p>` and `</p>` envelop.

For example, this will:

```
*   Warsteiner
*   König
```

to

```
<ul>
<li>Warsteiner</li>
<li>König</li>
</ul>
```

But this:

```
*   Warsteiner

*   König
```

will be

```
<ul>
<li><p>Warsteiner</p></li>
<li><p>König</p></li>
</ul>
```

List items can consist of multiple paragraphs. Each subsequent paragraph within a list item must be indented by at least four spaces or a tab:

```
1.  Dies ist eine Listenpunkt mit zwei Absätzen. Lorem ipsum dolor
    sit amet, consectetuer adipiscing elit. Aliquam hendrerit
    mi posuere lectus.

    Vestibulum enim wisi, viverra nec, fringilla in, laoreet
    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum
    sit amet velit.

2.  Suspendisse id sem consectetuer libero luctus adipiscing.
```

It looks good if every line of the following paragraph is indented, but again, Markdown allows the lazy person to indent only the first line:

```
*   Dies ist ein Listenpunkt mit zwei Absätzen

    Dies ist der zweite Absatz in diesem Listenpunkt. Nur die
erste Zeile muss eingerückt sein. Lorem ipsum dolor sit amet,
consectetuer adipiscing elit.

*   Ein weiterer Punkt in der selben Liste.
```

To use a quote in a list item, the quote must be indented:

```
*   Ein Listenpunkt mit einem Zitat:

    > Dies ist ein Zitat
    > In einer Liste.
```

To use a code block in a list item, it must _twice_
indented -- 8 spaces or two tabs:

```
*   Ein Listenpunkt mit Codebeispiel:

        <hier Code einfügen>
```

It is possible to create lists unintentionally by writing, for example, the following:

```
1986. Was für ein wundervolles Jahr.
```

In other words: The sequence _Number-period-space_ at the beginning of a line. To avoid this problem, the period can be escaped with a backslash:

```
1986\. Was für ein wundervolles Jahr.
```

<h3 id="precode">Code-Blöcke</h3>

Preformatted code blocks are used to write over program or markup source code. Instead of forming normal paragraphs, the lines within a code block are interpreted as they are found. Markdown includes code blocks with the tags \`\<code>\`. `<pre>` and `<code>`.

To create a code block in Markdown, simply indent each line of the block with at least four spaces or a tab. For example, from the following input...

```
Dies ist ein normaler Absatz.

    Dies ist ein Code-Block.
```

...Markdown does the following:

```
<p>Dies ist ein normaler Absatz.</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>
```

One level of indentation—4 spaces or 1 tab—is removed from each line of indentation. For example...

```
Ein Beispiel in AppleScript:

    tell application "Foo"
        beep
    end tell
```

...becomes

```
<p>Ein Beispiel in AppleScript:</p>

<pre><code>tell application "Foo"
    beep
end tell
</code></pre>
```

A code block ends at the first line that is not indented (or at the end of the document).

In a code block, the ampersand (`&`) and angle brackets (`<` and `>`) automatically converted into HTML entities. This greatly simplifies the integration of HTML snippets—simply copy the HTML into the document, indent it, and Markdown handles the encoding of the ampersand and angle brackets. For example:

```
<div class="footer">
    &copy; 2004 Foo Corporation
</div>
```

becomes:

```
<pre><code>&lt;div class="footer"&gt;
    &amp;copy; 2004 Foo Corporation
&lt;/div&gt;
</code></pre>
```

Normal Markdown syntax is not processed within code blocks. This means that asterisks are simply asterisks within a code block and do not signal text highlighting. Consequently, it is easy to... _above_ to speak Markdown.

<a id="hr"></a>

#### Horizontal lines

The day for horizontal lines (`<hr />`A horizontal line can be generated by writing three or more hyphens or asterisks on a single line. Spaces between the characters are also allowed. All of the following examples would generate a horizontal line:

```
* * *

***

*****

- - -

---------------------------------------
```

---

<div id="span"></div>
### Span-Elemente

<a id="link"></a>

#### Left

Markdown supports two types of links: _Inline_ and _References_.

In both styles, the link text is marked with \[square brackets].

To create an inline link, you write regular parentheses directly after the closing square bracket. Inside these parentheses, you write the URL to which you want to link, along with a...
_optional_ Title for the link in quotation marks. Examples:

```
Dies ist [ein Beispiel](http://example.com/ "Der Linktitel") für
einen Inline-Link.

[Dieser Link](http://example.net/) hat kein Titel-Attribut.
```

This results in:

```
<p>Dies ist <a href="http://example.com/" title="Titel">
ein Beispiel</a> für einen Inline-Link.</p>

<p><a href="http://example.net/">Dieser Link</a> hat kein
Titel-Attribut.</p>
```

If you want to reference content on the same server, you can use relative paths:

```
Auf der Seite [Über mich](/about/) gibt es weitere Informationen.
```

Reference links use a second set of square brackets in which an arbitrarily chosen identifier for the link is written:

```
Dies ist [ein Beispiel][id] für einen Referenz-Link.
```

A space can also be inserted between the parentheses if desired:

```
Dies ist [ein Beispiel] [id] für einen Referenz-Link.
```

Then, somewhere in the document, the link is defined on its own line as follows:

```
[id]: http://example.com/  "Optionalen Titel hier eintragen"
```

So:

- Square brackets containing the link identifier (optionally indented with up to three spaces);
- followed by a colon;
- followed by one or more spaces (or tabs);
- followed by the URL for the link;
- optionally followed by the text for the link's title attribute, enclosed in brackets, single or double quotation marks.

The following three definitions are identical:

```
[foo]: http://example.com/  "Optionaler Titel"
[foo]: http://example.com/  'Optionaler Titel'
[foo]: http://example.com/  (Optionaler Titel)
```

**Note:** There is a known bug in Markdown 1.0.1 that hinders the use of single quotation marks as separators for link titles.

The link URL can optionally be enclosed in angle brackets:

```
[id]: <http://example.com/>  "Optionaler Titel hier"
```

The title attribute can also be set to the next line and indented with more spaces or tabs. This looks better with long URLs:

```
[id]: http://example.com/langer/pfad/zu/seite
    "Optionaler Titel hier"
```

Link definitions are only used to create links while Markdown processes the document and are removed from the document before the HTML is output.

Link definitions may consist of letters, numbers, spaces, and punctuation marks. _independent_ Regarding capitalization:

```
[Link-Text][a]
[Link-Text][A]
```

The two link definitions are equivalent.

The _implied link identifiers_ Allows the link identifier to be omitted. In this case, the link text itself is used as the identifier. Simply add an empty set of square brackets to the link text:

```
[Google][]
```

Then the link is defined:

```
[Google]: http://google.com/
```

Since link identifiers are allowed to contain spaces, this abbreviation even works for multiple words in the link text:

```
Besuchen Sie [Daring Fireball][] für weitere Informationen.
```

Then the link is defined:

```
[Daring Fireball]: http://daringfireball.net/
```

Link definitions can be placed anywhere in the Markdown document. Generally, it's a good idea to place them after the paragraph in which they are used. However, they can also be listed together at the end of the document, like footnotes.

A small example:

```
Ich bekomme zehn Mal mehr Traffic von [Google] [1] als von
[Yahoo] [2] oder [MSN] [3].

  [1]: http://google.com/        "Google"
  [2]: http://search.yahoo.com/  "Yahoo Search"
  [3]: http://search.msn.com/    "MSN Search"
```

Using the abbreviation via the implied link identifier, one can also write the following:

I get ten times more traffic from \[Google]\[] than from \[Yahoo]\[] or \[MSN]\[].

```
  [google]: http://google.com/       "Google"
  [yahoo]: http://search.yahoo.com/  "Yahoo Search"
  [msn]: http://search.msn.com/      "MSN Search"
```

Both examples would result in the following HTML code:

```
<p>Ich bekomme zehn Mal mehr Traffic von <a href="http://google.com/"
title="Google">Google</a> als von
<a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a>
oder <a href="http://search.msn.com/" title="MSN Search">MSN</a>.</p>
```

For comparison, the same paragraph follows using Markdown's inline links:

```
Ich bekomme zehn Mal mehr Traffic von [Google](http://google.com/ "Google")
als von [Yahoo](http://search.yahoo.com/ "Yahoo Search") oder
[MSN](http://search.msn.com/ "MSN Search").
```

The idea behind reference links isn't that they're easier to write. The idea is that they make documents far more readable. The example paragraph is only 80 characters long with reference links, but a full 181 characters long with them; as HTML, it's 239 characters, more markup than content.

Markdown's reference links make the source document more similar to the final output format as displayed in the browser. The ability to extract metadata for markup from the paragraph allows links to be integrated into the text without disrupting the flow.

<a id="em"></a>

#### emphasis

Markdown handles asterisks (`*`) and underscores (`_`) as indicators of emphasis. In individual `*` or `_` Packed text is enclosed in the HTML tag `<em>` enclosed, double `*` or `_` will be with the day `<strong>` highlighted. The following text, for example:

```
*Einzelne Sternchen*

_Einzelne Unterstriche_

**Doppelte Sternchen**

__Doppelte Unterstriche__
```

Will output the following:

```
<em>Einzelne Sternchen</em>

<em>Einzelne Unterstriche</em>

<strong>Doppelte Sternchen</strong>

<strong>Doppelte Unterstriche</strong>
```

The style can be chosen freely. The only restriction is that the same character must be used to open and close an emphasis area.

Emphasis can be used in the middle of a word:

```
Herr*gott*sakrament
```

But if a `*` or `_` If it is surrounded by spaces, it is treated like a simple asterisk or underscore.

To write an asterisk or an underscore in a place where it would be understood as emphasis, it can be masked with a backslash:

```
\*Dieser Text ist von Sternchen umschlossen.\*
```

<a id="code"></a>

#### code

To mark a code range, it is enclosed with backtick characters (`` ` ``Unlike a code block, a code area formats code within a normal paragraph:

```
Benutze die Funktion `printf()` um Text auszugeben.
```

Becomes:

```
<p>Benutze die Funktion <code>printf()</code> um Text auszugeben.</p>
```

If a backtick is to be displayed in the code area, then multiple backticks can be used before and after the code area:

```
``Irgendwo hier (`) ist ein Backtick versteckt.``
```

This will become:

```
<p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>
```

The backtick separators around a code range can contain spaces—one after the opening backticks and one before the closing backtick. This allows backticks to be used within the code range, even at the beginning or end.

```
Ein einzelner Backtick in einem Code-Bereich: `` ` ``

Ein Backtick-umschlossener String in einem Code-Bereich: `` `foo` ``
```

becomes:

```
<p>Ein einzelner Backtick in einem Code-Bereich: <code>`</code></p>

<p>Ein Backtick-umschlossener String in einem Code-Bereich: <code>`foo`</code></p>
```

In code sections, the ampersand (&) and angle brackets are encoded as HTML entities.

```
Niemand benutzt `<blink>` Tags.
```

This will become:

```
<p>Niemand benutzt <code>&lt;blink&gt;</code> Tags.</p>
```

The following also works:

```
`&#8212;` ist das dezimal kodierte Äquivalent von `&mdash;`.
```

This will lead to

```
<p><code>&amp;#8212;</code> ist das dezimal kodierte
Äquivalent von <code>&amp;mdash;</code>.</p>
```

<a id="img"></a>

#### Graphics

Admittedly, it is quite difficult to find a "natural" syntax for embedding graphics in text.

Markdown uses a syntax for this that is intended to resemble the style of links. This allows for two types: inline and reference.

The inline syntax looks like this:

```
![Alternativer Text](../../de/community/pfad/zum/bild.jpg)

![Alternativer Text](../../de/community/pfad/zum/bild.jpg "Optionaler Titel")
```

So:

- An exclamation mark: `!`;
- followed by a set of square brackets that define the value of the
  `alt`-Attributes for the graphic included;
- followed by parentheses containing the URL or path to the image, as well as the value of an optional value. `title`-Attributes, enclosed in quotation marks.

Image references in the reference style look like this:

```
![Alternativer Text][id]
```

"id" here is the name of a defined image reference. Image references are defined using the same syntax as link references:

```
[id]: url/zur/grafik  "Optionales title-Attribut"
```

Markdown currently lacks a syntax for specifying the size of an image. If this is necessary, the standard HTML tag can be used.
`<img>` be used.

---

<div id="misc"></div>
### Verschiedenes

<a id="backslash"></a>

#### Backslash masking

Markdown allows you to use backslash escaping to write characters that otherwise have a specific meaning in Markdown's syntax. For example, if you want to surround a word with asterisks (instead of the HTML tag \`\`). `<em>`), you can put backslashes before the asterisks:

```
\*Von Sternchen umgeben\*
```

Markdown offers this capability for the following characters:

```
\   Backslash
`   Backtick
*   Sternchen
_   Unterstrich
{}  Geschweifte Klammern
[]  Eckige Klammern
()  Runde Klammern
#   Raute
+	Plus-Zeichen
-	Minus-Zeichen (Bindestrich)
.   Punkt
!   Ausrufezeichen
```

---

<a id="lizenz"></a>

## Origin and license

This work is licensed under a [Creative Commons Attribution-ShareAlike (BY-SA) 4.0 International License][by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

This is a translation of [original syntax documentation][osd]
from [John Gruber's][jg] [Markdown][md]This translation reflects the state of Markdown as of December 15, 2013 (Markdown version 1.0.1). No guarantee is given for the accuracy of the translation. Please send a brief message to \[email address/contact information missing] if you find any errors in the translation. <lasar@liepins.net> requested. Any other type of feedback is also welcome.\*

[jg]: http://daringfireball.net/
[md]: http://daringfireball.net/projects/markdown/
[osd]: http://daringfireball.net/projects/markdown/syntax