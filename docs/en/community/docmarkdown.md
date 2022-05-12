---
title: Markdown
lastChanged: 23.04.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/docmarkdown.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: mjGgkxRz/ltg4/3OhZi5c/N+GKM1nmTaj+xCAMTAblo=
---
# Markdown: syntax
?> To ensure that the ioBroker documentation can be created quickly and is easy to read, Markdown was chosen as the simplified markup language. The following guide will help you get to know the syntax and the possibilities of Markdown and convert it into great documents.

Technically, only the following features are supported by the documentation system:

- Headers
- tables
- Inline HTML
- lists
- Left
- Images
- Bold text
- Italic text

## Overview
### Philosophy
Markdown was designed to be as easy to read and write as possible.

Readability is the primary goal here. A markdown-formatted document should be able to be published in its basic form without appearing to be tagged or formatted (as is the case with HTML).

Accordingly, Markdown's syntax consists only of characters that have been carefully chosen so that their appearance matches their meaning. For example, asterisks around a word actually look like \*stress\*. Lists in Markdown look like lists. Even Quote Blocks look like quoted text passages, as you know them from emails.

### Inline HTML
Markdown's syntax has one purpose: to be used to *write* for the web.

Markdown is not a replacement for HTML, not even remotely. The scope of the syntax is very small and only corresponds to a small part of all HTML tags. It is not Markdown's intention to make it easy to insert HTML tags. HTML is already simple enough. The idea behind Markdown is to make text as easy to read, write, and edit as possible. HTML is a *publication format*; Markdown is a *writing format*. Therefore, its syntax only takes into account content that can be conveyed with pure text.

Any formatting that cannot be done with Markdown can simply be used in HTML. There is no need to tag HTML to separate it from the rest.
It is simply written in the text.

The only limitation is block elements such as `<div>`, `<table>`, `<pre>`, `<p>` and so on. They must be separated from the surrounding content by blank lines, and the start and end tags should not be indented with spaces or tabs. Markdown is intelligent enough not to put additional (unwanted) `<p>` tags around HTML blocks.

For example, to include an HTML table in a Markdown article:

    This is a normal paragraph.

<table><tr><td>foo</td></tr></table>

    This is still a normal paragraph.

It should be noted that Markdown's syntax is not interpreted within HTML blocks. For example, *emphasis* cannot be used within HTML blocks.

Inline HTML tags such as `<span>`, `<cite>`, or `<del>` can be used anywhere in a markdown paragraph, bullet point, or header.
HTML tags can even be used instead of the equivalent Markdown formatting. It's fine to simply use `<a>` or `<img>` instead of Markdow's syntax for links or graphics.

Unlike block tags, markdown syntax *is* interpreted inside inline tags.

### Automatic masking of special characters
There are two characters in HTML that require special treatment: `<` and `&`.
The left angle bracket is used to open HTML tags, the ampersand is used to describe named characters (entities). If these characters are to be used as "themselves" in HTML documents, they must be escaped as entities, ie as `&lt;` and `&amp;`.

The ampersand is particularly impractical for web developers. If you want to write about "AT&T", you have to write "`AT&amp;T`". The ampersand must be escaped even in URLs. In a link to the page

`http://images.google.com/images?num=30&q=larry+bird`

the URL must be encoded as follows:

`http://images.google.com/images?num=30&amp;q=larry+bird`

This is easy to forget and probably the most popular mistake made when validating otherwise well-formed HTML documents.

Markdown allows these characters to be used normally. It handles the encoding itself. If an ampersand is used in an entity, it is not encoded, otherwise converted to `&amp;`.

So if you want to enter a copyright symbol, for example, you can just

`&copy;`

write, and Markdown will not modify this. But off

`AT&T`

becomes Markdown

`AT&amp;T`

do. Because Markdown supports inline HTML, angle brackets are treated as normal HTML when they do. Just from stuff like

`4 < 5`

becomes Markdown

`4 &lt; 5`

do. However, in code or span blocks, angle brackets and ampersands are *always* encoded. This simplifies writing over HTML in Markdown (unlike raw HTML, where it's mostly a nightmare to code each `<` and `&`).

## Block elements
### Paragraphs and line breaks
A paragraph is simply one or more lines of text, separated by one or more blank lines. (A blank line is any line that *looks* like a blank line -- a line that contains nothing but spaces and tabs is treated as blank.) Normal paragraphs should not be indented with spaces or tabs.

The "one or more lines" rule implies one thing: Markdown supports "hard-break" paragraphs. This is in big contrast to most other text-to-HTML formatters (including Movable Type's "Convert Line Breaks" option), which format each line break in a paragraph as `<br />`.

If you *want* to have a `<br />` as a break, you can just end the line with two or more spaces.

While this is a small overhead to produce a `<br />`, a simple "every newline is a `<br />`" rule wouldn't work in Markdown.

Markdown's email-style [Quotes](#quotes) and [List Entries](#listen) with multiple paragraphs works best -- and looks better -- when formatted with line breaks.

[bq]: #blockquote

[l]:  #list

### Headers
Markdown here only supports one type of header formatting: atx.
Atx-style headers use 1-6 hash characters at the beginning of the line, corresponding to levels 1-6. For example:

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

### Quotations
Markdown uses - like e-mails - the character `>` for quote blocks. If you have experience with citations in email, you also know how to create citations in Markdown. It looks best if you wrap the text per line and put a `>` in front of each line:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `> consectetuer adipiscing elit. Aliquam hendrerit mi posuere` `> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet` `> vitae, risus.` `>` `> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `> Suspendisse id sem consectetuer libero luctus adipiscing.`

But Markdown also allows to be lazy and use the `>` only on the first line of a hard-break paragraph:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.` `Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,` `risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `Suspendisse id sem consectetuer libero luctus adipiscing.`

Quotations can be nested (i.e. quotation within a quotation) by using more `>`:

`    > Dies ist die erste Zitat-Ebene.` `    >` `    > > Dies ist ein verschachteltes Zitat.` `    >` `    > Zurück auf der ersten Ebene.`

Quotations can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a headline.
>> 1. This is the first item in the list.
> 2. This is the second item in the list.
> > Here is some sample code: > > return shell_exec("echo $input | $Markdown_script");

Any sane text editor should make email-style citation easy. In BBEdit, for example, you can make a selection and choose `Increase Quote Level` from the `Text` menu.

### Lists
Markdown supports sorted (numbered) and unordered (enumerated) lists.

Unordered lists use asterisks, pluses, and hyphens -- interchangeably -- as list markers:

    *   Red
    *   Green
    *   Blue

is equal to:

+ Red + Green + Blue

And:

    -   Red
    -   Green
    -   Blue

Sorted lists use numbers followed by a dot:

    1st dog
    2. cat
    3. Mouse

It's important to understand that the numbers themselves have no effect on the output of Markdown. Markdown creates the following HTML code from the last list:

<ol><li>dog</li><li> Cat</li><li> Mouse</li></ol>

If you write the list like this instead:

    1st dog
    1. cat
    1. Mouse

Or even:

    3. dog
    1. cat
    8. Mouse

the same list comes out every time. If desired, you can number your lists correctly by hand. But if you want to be lazy, you can always use the same number.

However, even then you should start the list with number 1. In the future, Markdown may want to set a starting digit for the first list entry.

List entries usually start at the left margin of the document, but can be indented up to three spaces to the right.
List markers must be separated from the following text with one or more spaces or a tab.

In order to format lists nicely, the individual entries can be further indented, like this:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

        Suspension id sem consectetuer libero luctus adipiscing.

The following example generates the same code but is less tidy:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    Suspension id sem consectetuer libero luctus adipiscing.

If list items are separated by blank lines, markdown will wrap the list items with `<p>` and `</p>`.

For example this will:

    * Warsteiner
    * king

to

<ul><li>Warsteiner</li><li> king</li></ul>

But this:

    * Warsteiner

    * king

becomes

<ul><li><p>Warsteiner</p></li><li><p> king</p></li></ul>

List items can consist of several paragraphs. Each following paragraph in a list item must be indented with at least 4 spaces or a tab:

    1. This is a two paragraph bullet point. Lorem ipsum dolor

sit amet, consectetuer adipiscing elit. Aliquam hendrit mi posuere lectus.

Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    2. Suspension id sem consectetuer libero luctus adipiscing.

It looks nice if every line of the following paragraph is indented, but again Markdown allows the lazy to indent just the first line:

    * This is a two paragraph bullet point

This is the second paragraph in this list item. Only the first line needs to be indented. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

    * Another item in the same list.

To use a quote in a list item, the quote must be indented:

    * A list item with a quote:

> This is a quote > In a list.

To use a block of code in a list item, it must be indented *twice* -- 8 spaces or two tabs:

    * A list point with code example:

            <insert code here>

It is possible to create lists unintentionally, e.g.
writes the following:

    1986. What a wonderful year.

In other words: The sequence *number-dot-space* at the beginning of a line. To avoid this problem, the dot can be masked with a backslash:

    1986\. What a wonderful year.

<h3 id="precode">code blocks</h3>

Preformatted code blocks are used to write over program or markup source code. Instead of forming normal paragraphs, the lines in a block of code are interpreted as they are found. Markdown includes blocks of code with the `<pre>` and `<code>` tags.

To create a block of code in Markdown, simply indent each line of the block with at least 4 spaces or a tab. From the following input...

    This is a normal paragraph.

        This is a block of code.

...markdown does the following:

<p>This is a normal paragraph.</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

One level of indentation -- 4 spaces or 1 tab -- is removed from each line of indentation. For example the following...

    An example in AppleScript:

tell application "Foo" beep end tell

...becomes

<p>An example in AppleScript:</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

A block of code ends at the first line that is not indented (or at the end of the document).

In a code block, the ampersand (`&`) and angle brackets (`<` and `>`) are automatically converted to HTML entities. This makes incorporating chunks of HTML a lot easier -- just copy HTML into the document, indent it, and let Markdown do the encoding for the ampersands and angle brackets. For example:

<div class="footer">© 2004 Foo Corporation</div>

becomes:

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

Normal Markdown syntax is not processed in Code Blocks. i.e.
Asterisks are just asterisks in a block of code, not the signal to emphasize the text. As a result, it's easy to talk *about* Markdown in Markdown.

<a id="hr"></a>

### Horizontal Lines The horizontal line tag (`<hr />`) can be generated by writing 3 or more dashes or asterisks alone on a line. Spaces between characters are also allowed. All of the following examples would generate a horizontal line:
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## Span elements
<a id="link"></a>

### Left
Markdown supports two types of links: *inline* and *references*.

In both styles, the link text is marked with [square brackets].

To create an inline link, write normal brackets directly after the closing square bracket. Within these brackets is written the URL to link to along with an *optional* title for the link in quotes. Examples:

This is [an example](http://example.com/ "Der Linktitel") for an inline link.

    [This link](http://example.net/) has no title attribute.

This becomes:

<p>This is <a href="http://example.com/" title="title">an example</a> of an inline link.</p>

<p><a href="http://example.net/">This link</a> has no title attribute.</p>

If you want to point to content on the same server, you can use relative paths:

    There is more information on the [About me](/about/) page.

Reference links use a second set of square brackets in which an arbitrarily chosen identifier for the link is written:

    This is [an example][id] for a reference link.

You can also add a space between the brackets if you like:

    This is [an example][id] for a reference link.

Then, somewhere in the document, the link is defined on its own line, like this:

[id]: http://example.com/  "Optionalen Titel hier eintragen"

So:

* Square brackets containing the link identifier (optionally with

    indented with up to three spaces);

* followed by a colon;
* followed by one or more spaces (or tabs);
* followed by the URL for the link;
* optionally followed by the text for the link's title attribute,

    wrapped in brackets, single or double quotes.

The following three definitions are identical:

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

**Note:** There is a known bug in Markdown 1.0.1 that breaks the functionality of single quotes as separators for link titles.

The link URL can optionally be wrapped in angle brackets:

[id]: <http://example.com/>  "Optionaler Titel hier"

The title attribute can also be set to the next line and indented with more spaces or tabs. This looks better with long URLs:

[id]: http://example.com/langer/pfad/zu/seite

        "Optional title here"

Link definitions are only used to create links while Markdown is processing the document and are removed from the document before the HTML is rendered.

The identifiers for link definitions can consist of letters, numbers, spaces and punctuation marks. They are *independent* of case:

[link text][a] [link text][A]

The two link definitions are equivalent.

The *implied link identifier* allows the link identifier to be omitted. In this case, the link text is used as an identifier. It simply adds an empty set of square brackets to the link text:

[Google][]

Then the link is defined:

[Google]: http://google.com/

Since link identifiers can contain spaces, this abbreviation even works for multiple words in the link text:

Visit [Daring Fireball][] for more information.

Then the link is defined:

[Daring Fireball]: http://daringfireball.net/

Link definitions can be placed anywhere in the Markdown document. In general, it's a good idea to do them after the paragraph they're used in. However, like footnotes, they can also be listed all together at the end of the document.

A small example:

I get ten times more traffic from [Google][1] than from [Yahoo][2] or [MSN][3].

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

With the abbreviation via the implied link identifier, one can also write the following:

I get ten times more traffic from [Google][] than from [Yahoo][] or [MSN][].

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

Both examples would result in the following HTML code:

<p>I get ten times more traffic from <a href="http://google.com/" title="Google">Google</a> than from <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a> or <a href="http://search.msn.com/" title="MSN Search">MSN</a> .</p>

For comparison, the same paragraph using Markdown's inline links follows:

I get ten times more traffic from [Google](http://google.com/ "Google") than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or [MSN](http://search.msn.com/ "MSN Search").

The idea behind reference links isn't that they're easier to write. The idea is that they make documents far more readable. The example paragraph is only 80 characters long with reference links, with reference links it is a full 181 characters long; as HTML it's 239 characters, more markup than content.

With Markdown's reference links, the source document more closely resembles the final output format as viewed in the browser. The ability to get metadata for markup out of the paragraph allows links to be integrated into the text without slowing down the flow of the text.

<a id="em"></a>

### Emphasis Markdown treats asterisks (`*`) and underscores (`_`) as indicators of emphasis. Text wrapped in single `*` or `_` is wrapped with the HTML tag `<em>`, duplicate `*` or `_` are marked with the tag `<strong>` . The following text for example:
    *single asterisks*

    _single underscore_

    **Double Asterisks**

    __Double underscores__

Will output:

<em>Single asterisks</em>

<em>Single underscores</em>

<strong>double asterisks</strong>

<strong>Double underscores</strong>

The style can be chosen arbitrarily. The only limitation is that the same character must be used to open and close an accented area.

Emphasis can be used in the middle of a word:

    Lord*God*sacrament

But if a `*` or `_` is surrounded by spaces, it is treated as a single asterisk or underscore.

To write an asterisk or an underscore where it would be interpreted as an emphasis, it can be escaped with a backslash:

    \*This text is surrounded by asterisks.\*

<a id="code"></a>

### Code To mark a code range, it is enclosed in backtick characters (`` ` ``). Unlike a code block, a code region formats code within a regular paragraph:
    Use the `printf()` function to output text.

Becomes:

<p>Use the <code>printf()</code> function to print text.</p>

If a backtick is to be displayed in the code area, then several backticks can be used before and after the code area:

    ``Irgendwo hier (`) is a backtick hidden.``

This becomes:

<p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

The backtick separators around a code region can contain spaces -- one after the opening backticks, one before the closing backticks. This allows the use of backticks within the code area also at the beginning or end:

A single backtick in a range of code: `` ` ``

A backtick wrapped string in a code section: `` `foo` ``

becomes:

<p>A single backtick in a section of code: <code>`</code></p>

<p>A backtick-wrapped string in a code section: <code>`foo`</code></p>

In code areas, the ampersand and angle brackets are encoded as HTML entities.

    Nobody uses `<blink>` tags.

This becomes:

<p>Nobody uses <code>&lt;blink&gt;</code> tags.</p>

The following also works:

    `&#8212;` is the decimal coded equivalent of `&mdash;`.

This becomes

<p><code>&amp;#8212;</code> is the decimal coded equivalent of <code>&amp;mdash;</code> .</p>

<a id="img"></a>

### Graphics Admittedly, it's quite difficult to find a "natural" syntax for including graphics in text.
To do this, Markdown uses a syntax that is intended to resemble the style of links. This allows two types: inline and reference.

The inline syntax looks like this:

    ![alternative text](../../de/community/pfad/zum/bild.jpg)

    ![alternative text](../../de/community/pfad/zum/bild.jpg "Optional title")

So:

* An exclamation mark: `!`;
* followed by a set of square brackets enclosing the value of the

    `alt` attributes for the graphic contain;

* followed by parentheses, which are the URL or path to the graphic

and the value of an optional `title` attribute, enclosed in double quotes.

Reference-style image references look like this:

    ![alternative text][id]

"id" here is the name of a defined image reference. Image references are defined using the same syntax as link references:

[id]: url/zur/grafik  "Optionales title-Attribut"

Currently, Markdown has no syntax for specifying the size of an image. Should this be necessary, the normal HTML tag `<img>` can be used.

* * *

<div id="misc"></div>

## Various
<a id="backslash"></a>

### Backslash masking
Markdown allows using backslash escaping to write characters that otherwise have a specific meaning in Markdown's syntax.
For example, if you want to surround a word with asterisks (instead of the HTML tag `<em>`), you can put backslashes in front of the asterisks:

    \*Surrounded by asterisks\*

Markdown offers this possibility for the following characters:

\ backslash ` backtick

    * Asterisk

_ Underscore {} Curly brackets [] Square brackets () Parentheses

# Hash + plus sign
    - minus sign (hyphen)

. Point ! exclamation mark

* * *

<a id="lizenz"></a>

### License
This work is licensed under a [Creative Commons Attribution-Share Alike (BY-SA) 4.0 International License][by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?>This is a translation of the [original syntax documentation][osd] by [John Grubers][jg] [Markdown][md]. This translation is current as of December 15, 2013 (Markdown Version 1.0.1). No guarantee is given for the correctness of the translation. If there are errors in the translation, please send a short message to <lasar@liepins.net>.
Any other type of feedback is also welcome.*

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax