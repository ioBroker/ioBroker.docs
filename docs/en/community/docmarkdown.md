---
title: Markdown syntax
lastChanged: 08.09.2026
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/docmarkdown.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: B+1RR7XQZluKSlEDHUO/7vMSkGuxWoiYo+sm+yAaG5g=
---
# Markdown in the ioBroker documentation
The documentation is written in **Markdown**: a markup language chosen so that a file remains readable even without rendering. Those wishing to contribute an article can find the procedure under [Write an article](/docs/community/doc.md).

This page has two parts. First, what applies **here**, i.e., the specifics of this documentation. Then, the Markdown syntax in detail.

## What applies here
### The head of each file
```
---
title:       "Kurzer Seitentitel"
lastChanged: "08.09.2026"
---
```

`title` is the name of the page, `lastChanged` is the date of the last content change in the format `TT.MM.JJJJ`. The **name in the menu**, however, does not come from here, but from `content.md`.

A field `translatedFrom` means: The file has been machine-translated and will be overwritten during the next translation run. Do not edit such files.

### Notice boxes
Two strings at the beginning of the line create the colored boxes:

```
?> Ein Hinweis. Nützlich, aber nicht dringend.

!> Eine Warnung. Wer sie überliest, macht etwas kaputt.
```

Use sparingly. A page where everything is highlighted highlights nothing.

### Links
Always as a **simple path from the root of the documentation**, not relative to the file:

| Goal | Notation |
| --- | --- |
| Documentation page | `§§LLLLL_0§§` |
| Adapter page | `§§LLLLL_0§§` |
| Adapter list | `§§LLLLL_0§§` |
| Statistics | `§§LLLLL_0§§` |
| Statistics | `[Statistics](/statistics)` |

**Always use full path links, even within the same page. And they only work up to the third heading level: a `####` receives no identifier and cannot be linked to.

### Pictures
Images are located in the folder `media` next to the page and are accessed from there:

```
![Kurze Beschreibung](../../de/community/media/dateiname.png)
```

The text in square brackets is not decorative: it appears where the image cannot be loaded, and it will be read aloud. If an image should be narrower than the text area, this can be achieved by specifying a width:

```html
<img src="media/dateiname.png" alt="Kurze Beschreibung" width="630" />
```

### What the renderer can do
In addition to the original Markdown syntax, the following are available:

* **Tables** in GitHub notation (`| column | column |`)
* **Code blocks with three backticks**, with language indication for coloring
* **Strikethrough text** with `~~two tildes~~`
* **Inline HTML**, for cases that Markdown doesn't cover.

### Notation
* Line break after 80 characters.
* Every document begins with a Level 1 heading, and only one.
* Use a minus sign as a dash, **not a** long em dash.
* Technical terms remain in the original: `state`, `role`, `level`, `string`. Anyone looking for

`level.` searches, but does not find “Steps”.

* File names are small, only `a-z`, `0-9`, `_` and `.`.

The complete specifications are set out in [Style guide](/docs/community/styleguidedoc.md).

## The Markdown Syntax in Detail
The following section is a translation of John Gruber's original syntax description; the source and license are listed at the end of the page. It describes Markdown 1.0.1 and therefore does not include tables or code blocks with backticks; however, both are present here, as mentioned above.

### On the origin of this description
#### Philosophy
Markdown was designed with the basic idea of being as easy to read and write as possible.

Readability is the primary goal here. A Markdown-formatted document should be able to be published in its basic form without giving the impression that it contains tags or formatting commands (as is the case with HTML).

Accordingly, Markdown's syntax consists only of characters that have been carefully chosen so that their appearance corresponds to their meaning. For example, asterisks around a word actually look like *emphasis*. Lists in Markdown look like lists. Even quote blocks look like quoted text passages, as you would find in an email.

#### Inline HTML
Markdown's syntax has one purpose: to be used for *writing* for the web.

Markdown is not a replacement for HTML, not even close. Its syntax is very small, representing only a fraction of all HTML tags. Markdown is not intended to simplify the insertion of HTML tags; HTML is already simple enough. The idea behind Markdown is to make text as easy to read, write, and edit as possible. HTML is a *publishing format*; Markdown is a *writing format*. Therefore, its syntax only considers content that can be conveyed with plain text.

For any formatting that isn't possible with Markdown, you can simply use HTML. There's no need to mark up HTML to distinguish it from the rest.

It's simply written within the text.

The only restriction is block elements such as `<div>`, `<table>`, `<pre>`, `<p>`, and so on. They must be separated from the surrounding content by blank lines, and the start and end tags should not be indented with spaces or tabs. Markdown is intelligent enough not to add extra (unwanted) `<p>` tags around HTML blocks.

Here's how to embed an HTML table in a Markdown article, for example:

This is a normal paragraph.

<table> <tr> <td>Foo</td> </tr> </table>

This is still a normal paragraph.

It should be noted that Markdown syntax is not interpreted within HTML blocks. For example, *emphasis* cannot be used within HTML blocks.

Inline HTML tags such as `<span>`, `<cite>`, or `<del>` can be used anywhere in a Markdown paragraph, list item, or header.

HTML tags can even be used instead of the corresponding Markdown formatting. It's perfectly fine to use `<a>` or `<img>` instead of Markdown's syntax for links or graphics.

Unlike block tags, Markdown syntax *is* interpreted within inline tags.

#### Automatic masking of special characters
In HTML, there are two characters that require special handling: `<` and `&`.

The left angle bracket is used to open HTML tags, and the ampersand (&) is used to describe named characters (entities). If these characters are to be used as "themselves" in HTML documents, they must be escaped as entities, i.e., as `&lt;` and `&amp;`.

The ampersand (&) is particularly impractical for web developers. If you want to write about "AT&T", you have to write "`AT&amp;T`". The ampersand even needs to be escaped in URLs. (In a link to the page...)

`http://images.google.com/images?num=30&q=larry+bird`

The URL must be encoded as follows:

`http://images.google.com/images?num=30&amp;q=larry+bird`

This is easy to forget and is probably the most common mistake when validating otherwise well-formed HTML documents.

Markdown allows these characters to be used normally. It handles the encoding itself. If an ampersand is used in an entity, it is not encoded; otherwise, it is converted to `&amp;`.

So, for example, if you want to enter a copyright symbol, you can simply

`&copy;`

write, and Markdown will not modify this. But from

`AT&T`

will Markdown

`AT&amp;T`

Since Markdown supports inline HTML, angle brackets are treated as normal HTML in the appropriate case. Only from things like

`4 < 5`

will Markdown

`4 &lt; 5`

Do this. In code or span blocks, angle brackets and the ampersand are *always* encoded. This simplifies writing about HTML in Markdown (unlike raw HTML, where encoding every `<` and `&` is usually a nightmare).

### Block Elements
#### Paragraphs and line breaks
A paragraph simply consists of one or more lines of text, separated by one or more blank lines. (A blank line is any line that *looks* like a blank line-a line containing nothing but spaces and tabs is treated as blank.) Normal paragraphs should not be indented with spaces or tabs.

The "one or more lines" rule implies one thing: Markdown supports paragraphs with "hard breaks." This is a major difference from most other text-to-HTML formatters (including Movable Type's "Convert Line Breaks" option), which format every line break in a paragraph as `<br />`.

If you *want* to have a `<br />` as a line break, you can simply end the line with two or more spaces.

While this is a small additional effort to generate a `<br />`, a simple "every line break is a `<br />`" rule would not work in Markdown.

Markdown's email-like [Quotes](#quotes) and [list entries]](#listen) with multiple paragraphs works best - and looks better -- when formatted with line breaks.

[bq]: #blockquote

[l]:  #list

#### Headings
Markdown here only supports one type of header formatting: atx.

ATX-style headers use 1-6 hash symbols at the beginning of the line, corresponding to levels 1-6. For example:

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

#### Quotes
Markdown, like email, uses the character `>` for quote blocks. If you have experience with quotes in emails, you'll also know how to create quotes in Markdown. It looks best if you wrap the text on each line and place a `>` before each line:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `> consectetuer adipiscing elit. Aliquam hendrerit mi posuere` `> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet` `> vitae, risus.` `>` `> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `> Suspendisse id sem consectetuer libero luctus adipiscing.`

Markdown also allows you to be lazy and use `>` only on the first line of a hard-break paragraph:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.` `Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,` `risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `Suspendisse id sem consectetuer libero luctus adipiscing.`

Quotes can be nested (i.e., a quote within a quote) by using more `>`:

`    > Dies ist die erste Zitat-Ebene.` `    >` `    > > Dies ist ein verschachteltes Zitat.` `    >` `    > Zurück auf der ersten Ebene.`

Quotes can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a heading.

> > 1. This is the first list item.

> 2. This is the second list item.

> > Here is some example code: > > return shell_exec("echo $input | $Markdown_script");

Any decent text editor should make quoting in email style easy. In BBEdit, for example, you can make a selection and choose `Text` from the menu §§SSSS_0§§ and then select `Increase Quote Level`.

#### Listen
Markdown supports sorted (numbered) and unsorted lists (enumerations).

Unsorted lists use asterisks, plus signs, and dashes-interchangeable-as list markers:

    *   Red
    *   Green
    *   Blue

is the same:

+ Red + Green + Blue

And:

    -   Red
    -   Green
    -   Blue

Sorted lists use numbers followed by a period:

1. Dog
2. Cat
3. Mouse

It's important to understand that the numbers themselves have no effect on the output of Markdown. Markdown generates the following HTML code from the last list:

<ol> <li>Dog</li> <li>Cat</li> <li>Mouse</li> </ol>

If you write the list like this instead:

1. Dog
1. Cat
1. Mouse

Or even:

3rd dog
1. Cat
8. Mouse

The same list is generated every time. If desired, you can number your lists correctly by hand. But if you want to be lazy, you can simply use the same number every time.

However, you should still start the list with number 1. In the future, Markdown may want to specify a starting number for the first list entry.

List items normally begin on the left margin of the document, but they can be indented up to three spaces to the right.

List markers must be separated from the following text by one or more spaces or a tab.

To format lists nicely, the individual entries can be indented further, as shown here:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit mi posere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

        Suspendisse id sem consectetuer libero luctus adipiscing.

The following example generates the same code, but is less clean:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit mi posere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    Suspendisse id sem consectetuer libero luctus adipiscing.

If list entries are separated by blank lines, Markdown will wrap the list entries with `<p>` and `</p>`.

For example, this will:

* Warsteiner
* King

to

<ul> <li>Warsteiner</li> <li>King</li> </ul>

But this:

* Warsteiner

* King

will be

<ul> <li><p>Warsteiner</p></li> <li><p>King</p></li> </ul>

List items can consist of multiple paragraphs. Each subsequent paragraph within a list item must be indented by at least four spaces or a tab:

1. This is a list item with two paragraphs. Lorem ipsum dolor

sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posere lectus.

Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    2. Suspendisse id sem consectetuer libero luctus adipiscing.

It looks good if every line of the following paragraph is indented, but again, Markdown allows the lazy person to indent only the first line:

* This is a list item with two paragraphs

This is the second paragraph in this list item. Only the first line needs to be indented. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

* Another item on the same list.

To use a quote in a list item, the quote must be indented:

* A list item with a quote:

This is a quote in a list.

To use a code block within a list item, it must be indented *twice* -- 8 spaces or two tabs:

* A list item with a code example:

<Insert code here>

It is possible to unintentionally create lists by, for example, writing the following:

1986. What a wonderful year.

In other words: The sequence *number-period-space* at the beginning of a line. To avoid this problem, the period can be escaped with a backslash:

1986. What a wonderful year.

<h3 id="precode">Code blocks</h3>

Preformatted code blocks are used to write over program or markup source code. Instead of forming normal paragraphs, the lines within a code block are interpreted as they are found. Markdown includes code blocks with the tags `<pre>` and `<code>`.

To create a code block in Markdown, simply indent each line of the block with at least four spaces or a tab. For example, from the following input...

This is a normal paragraph.

This is a code block.

...Markdown does the following:

<p>This is a normal paragraph.</p>

<pre><code>This is a code block.

</code></pre>

One level of indentation-4 spaces or 1 tab-is removed from each line of indentation. For example...

An example in AppleScript:

tell application "Foo" beep end tell

...becomes

<p>An example in AppleScript:</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

A code block ends at the first line that is not indented (or at the end of the document).

Within a code block, the ampersand (`&`) and angle brackets (`<` and `>`) are automatically converted into HTML entities. This greatly simplifies the inclusion of HTML snippets-simply copy the HTML into the document, indent it, and Markdown handles the encoding of the ampersand and angle brackets. For example:

<div class="footer"> &copy; 2004 Foo Corporation </div>

becomes:

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

Normal Markdown syntax is not processed within code blocks. This means that asterisks are simply asterisks within a code block and do not signal text highlighting. The consequence is that it's easy to talk *about* Markdown within Markdown.

<a id="hr"></a>

#### Horizontal Lines The tag for horizontal lines (`<hr />`) can be generated by writing 3 or more hyphens or asterisks on a single line. Spaces between the characters are also allowed. All of the following examples would generate a horizontal line:
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

### Span elements
<a id="link"></a>

#### Links
Markdown supports two types of links: *Inline* and *References*.

In both styles, the link text is marked with [square brackets].

To create an inline link, write regular parentheses directly after the closing square bracket. Inside these parentheses, write the URL to which you want to link, along with an *optional* title for the link in quotation marks. Examples:

This is [an example](http://example.com/ "Der Linktitel") for an inline link.

[This link](http://example.net/) has no title attribute.

This results in:

<p>This is <a href="http://example.com/" title="Title"> an example</a> of an inline link.</p>

<p><a href="http://example.net/">This link</a> has no title attribute.</p>

If you want to reference content on the same server, you can use relative paths:

Further information can be found on page [About me](/about/).

Reference links use a second set of square brackets in which an arbitrarily chosen identifier for the link is written:

This is [an example][id] for a reference link.

A space can also be inserted between the parentheses if desired:

This is [an example] [id] for a reference link.

Then, somewhere in the document, the link is defined on its own line as follows:

[id]: http://example.com/  "Optionalen Titel hier eintragen"

So:

* Square brackets containing the link identifier (optionally with

indented with up to three spaces);

* followed by a colon;
* followed by one or more spaces (or tabs);
* followed by the URL for the link;
* optionally followed by the text for the link's title attribute,

enclosed in brackets, single or double quotation marks.

The following three definitions are identical:

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

**Note:** There is a known bug in Markdown 1.0.1 that prevents single quotation marks from functioning as separators for link titles.

The link URL can optionally be enclosed in angle brackets:

[id]: <http://example.com/>  "Optionaler Titel hier"

The title attribute can also be set to the next line and indented with more spaces or tabs. This looks better with long URLs:

[id]: http://example.com/langer/pfad/zu/seite

"Optional title here"

Link definitions are only used to create links while Markdown processes the document and are removed from the document before the HTML is output.

Link definitions may consist of letters, numbers, spaces, and punctuation marks. They are *case-independent*.

[Link text][a] [Link text][A]

The two link definitions are equivalent.

The *implied link identifier* allows you to omit the link identifier. In this case, the link text itself is used as the identifier. Simply add an empty set of square brackets to the link text:

[Google][]

Then the link is defined:

[Google]: http://google.com/

Since link identifiers are allowed to contain spaces, this abbreviation even works for multiple words in the link text:

Visit [Daring Fireball][] for more information.

Then the link is defined:

[Daring Fireball]: http://daringfireball.net/

Link definitions can be placed anywhere in the Markdown document. Generally, it's a good idea to place them after the paragraph in which they are used. However, they can also be listed together at the end of the document, like footnotes.

A small example:

I get ten times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

Using the abbreviation via the implied link identifier, one can also write the following:

I get ten times more traffic from [Google][] than from [Yahoo][] or [MSN][].

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

Both examples would result in the following HTML code:

<p>I get ten times more traffic from <a href="http://google.com/" title="Google">Google</a> than from <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a> or <a href="http://search.msn.com/" title="MSN Search">MSN</a>.</p>

For comparison, the same paragraph follows using Markdown's inline links:

I get ten times more traffic from [Google](http://google.com/ "Google") than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or [MSN](http://search.msn.com/ "MSN Search").

The idea behind reference links isn't that they're easier to write. The idea is that they make documents far more readable. The example paragraph is only 80 characters long with reference links, but a full 181 characters long with them; as HTML, it's 239 characters, more markup than content.

Markdown's reference links make the source document more similar to the final output format as displayed in the browser. The ability to extract metadata for markup from the paragraph allows links to be integrated into the text without disrupting the flow.

<a id="em"></a>

#### Emphasis Markdown treats asterisks (`*`) and underscores (`_`) as indicators of emphasis. Text wrapped in single `*` or `_` is enclosed with the HTML tag `<em>`, while duplicate `*` or `_` are marked with the tag `<strong>`. For example:
*Individual asterisks*

_Single underscores_

**Double asterisks**

__Double underscores__

Will output the following:

    <em>Single asterisks</em>

    <em>Single underscores</em>

<strong>Double asterisk</strong>

<strong>Double underscores</strong>

The style can be chosen freely. The only restriction is that the same character must be used to open and close an emphasis area.

Emphasis can be used in the middle of a word:

Lord*God*sacrament

However, if a `*` or `_` is surrounded by spaces, it is treated like a simple asterisk or a simple underscore.

To write an asterisk or an underscore in a place where it would be understood as emphasis, it can be masked with a backslash:

*This text is enclosed in asterisks.*

<a id="code"></a>

#### Code To mark a code block, it is enclosed in backticks (`` ` ``). Unlike a code block, a code block formats code within a normal paragraph:
Use the function `printf()` to output text.

Becomes:

Use the `printf()` function to output text.

If a backtick is to be displayed in the code area, then multiple backticks can be used before and after the code area:

``Irgendwo hier (`) has a hidden backtick.``

This will become:

<p><code>There's a backtick hidden somewhere here (`).</code></p>

The backtick separators around a code range can contain spaces-one after the opening backticks and one before the closing backtick. This allows backticks to be used within the code range, even at the beginning or end.

A single backtick in a code area: `` ` ``

A backtick-enclosed string in a code section: `` `foo` ``

becomes:

<p>A single backtick in a code block: <code>`</code></p>

<p>A backtick-enclosed string in a code block: <code>`foo`</code></p>

In code sections, the ampersand (&) and angle brackets are encoded as HTML entities.

Nobody uses `<blink>` tags.

This will become:

<p>Nobody uses <code><blink></code> tags.</p>

The following also works:

`&#8212;` is the decimal-coded equivalent of `&mdash;`.

This will lead to

<p><code>&amp;#8212;</code> is the decimal-encoded equivalent of <code>&amp;mdash;</code>.</p>

<a id="img"></a>

#### Graphics Admittedly, it is quite difficult to find a "natural" syntax for embedding graphics in text.
Markdown uses a syntax for this that is intended to resemble the style of links. This allows for two types: inline and reference.

The inline syntax looks like this:

    ![Alternative text](../../de/community/pfad/zum/bild.jpg)

    ![Alternative text](../../de/community/pfad/zum/bild.jpg "Optional title")

So:

* An exclamation mark: `!`;
* followed by a set of square brackets indicating the value of the

`alt` attributes included for the graphic;

* followed by parentheses, which contain the URL or path to the image

included as well as the value of an optional `title` attribute, wrapped in quotation marks.

Image references in the reference style look like this:

![Alternative Text][id]

"id" here is the name of a defined image reference. Image references are defined using the same syntax as link references:

[id]: url/zur/grafik  "Optionales title-Attribut"

Markdown currently lacks a syntax for specifying the size of an image. If this is necessary, the standard HTML tag `<img>` can simply be used.

* * *

<div id="misc"></div>

### Miscellaneous
<a id="backslash"></a>

#### Backslash masking
Markdown allows you to use backslash escaping to write characters that otherwise have a specific meaning in Markdown's syntax.

For example, if you want to surround a word with asterisks (instead of the HTML tag `<em>`), you can place backslashes before the asterisks:

*Surrounded by asterisks*

Markdown offers this capability for the following characters:

\ Backslash ` Backtick

* asterisk

_ Underscore {} Curly braces [] Square brackets () Parentheses

# Hash + Plus sign
- Minus sign (hyphen)

. Full stop! exclamation mark

* * *

<a id="license"></a>

## Origin and License
This work is licensed under a [Creative Commons Attribution-ShareAlike (BY-SA) 4.0 International License][by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

This is a translation of the original syntax documentation by John Grubers (Markdown version 1.0.1). This translation reflects the state of Markdown as of December 15, 2013. No guarantee is given for the accuracy of this translation. Please send a brief message to lasar@liepins.net if you find any errors.

Any other kind of feedback is also welcome.

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax