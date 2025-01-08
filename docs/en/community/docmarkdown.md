---
title: Markdown
lastChanged: 23.04.2021
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/community/docmarkdown.md
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
hash: 9qginu+6BT6Cm5JzwTYlJJ+LmFCjpyS0LVuttJtXxqc=
---
# Markdown: Syntax
?> To ensure that ioBroker's documentation is quick to create and easy to read, Markdown was chosen as a simplified markup language. The following guide will help you get to know the syntax and capabilities of Markdown and turn it into great documents.

Technically, the documentation system only supports the following features:

- Headers
- Tables
- Inline HTML
- Lists
- Links
- Images
- Bold text
- Italic text

## Overview
### Philosophy
Markdown was designed with the basic idea of being as easy to read and write as possible.

Readability is the primary goal here. A Markdown-formatted document should be able to be published in its basic form, without giving the impression that it has been tagged or formatted (as is the case with HTML).

Accordingly, Markdown's syntax consists only of characters that have been carefully chosen so that their appearance corresponds to their meaning. For example, asterisks around a word actually look like \*emphasis\*. Lists in Markdown look like lists. Even quote blocks look like quoted text passages, as you know them from emails.

### Inline HTML
Markdown's syntax has one purpose: to be used to *write* for the web.

Markdown is not a replacement for HTML, not even close. The scope of its syntax is very small and corresponds to only a small part of all HTML tags. It is not the intention of Markdown to make it easier to insert HTML tags. HTML is already simple enough. The idea behind Markdown is to make text as easy to read, write and edit as possible. HTML is a *publication format*; Markdown is a *writing format*. Therefore, its syntax only takes into account content that can be conveyed using pure text.

For any formatting that is not possible with Markdown, HTML can simply be used. There is no need to mark up HTML to separate it from the rest.
It is simply written into the text.

The only restriction is block elements such as `<div>`, `<table>`, `<pre>`, `<p>` and so on. They must be separated from the surrounding content by empty lines, and the start and end tags should not be indented with spaces or tabs. Markdown is smart enough not to put additional (unwanted) `<p>` tags around HTML blocks.

For example, you can insert an HTML table into a Markdown article:

This is a normal paragraph.

<table><tr><td>Foo</td></tr></table>

This is still a normal paragraph.

Please note that Markdown syntax is not interpreted within HTML blocks. For example, *emphasis* cannot be used within HTML blocks.

Inline HTML tags such as `<span>`, `<cite>`, or `<del>` can be used anywhere in a Markdown paragraph, bullet, or header.
HTML tags can even be used instead of the corresponding Markdown formatting. It's no problem to simply use `<a>` or `<img>` instead of Markdown's syntax for links or graphics.

Unlike block tags, Markdown syntax *is* interpreted within inline tags.

### Automatic masking of special characters
In HTML, there are two characters that require special treatment: `<` and `&`.
The left angle bracket is used to open HTML tags, the ampersand is used to describe named characters (entities). If these characters are to be used as "themselves" in HTML documents, they must be escaped as entities, i.e. as `&lt;` and `&amp;`.

The ampersand is particularly inconvenient for web developers. If you want to write about "AT&T", you have to write "`AT&amp;T`". The ampersand even has to be escaped in URLs. In a link to the page

`http://images.google.com/images?num=30&q=larry+bird`

the URL must be encoded as follows:

`http://images.google.com/images?num=30&amp;q=larry+bird`

This is easy to forget and probably the most popular mistake when validating otherwise well-formed HTML documents.

Markdown allows you to use these characters normally. It handles the encoding itself. If an ampersand is used in an entity, it is not encoded, otherwise it is converted to `&amp;`.

For example, if you want to enter a copyright symbol, you can simply

`&copy;`

and Markdown will not modify this. But for

`AT&T`

becomes Markdown

`AT&amp;T`

Since Markdown supports inline HTML, angle brackets are treated as normal HTML in the appropriate case. Only for things like

`4 < 5`

becomes Markdown

`4 &lt; 5`

However, in code or span blocks, angle brackets and ampersands are *always* encoded. This makes writing over HTML in Markdown easier (as opposed to raw HTML, where it's usually a nightmare to encode every `<` and `&`).

## Block elements
### Paragraphs and line breaks
A paragraph is simply one or more lines of text separated by one or more blank lines. (A blank line is any line that *looks* like a blank line -- a line that contains nothing but spaces and tabs is treated as blank.) Normal paragraphs should not be indented with spaces or tabs.

The "one or more lines" rule implies one thing: Markdown supports paragraphs with "hard breaks". This is a big difference from most other text-to-HTML formatters (including Movable Type's "Convert Line Breaks" option), which format every line break in a paragraph as `<br />`.

If you *want* to have a `<br />` as a line break, you can simply end the line with two or more spaces.

While this is a small overhead to create a `<br />`, a simple "every line break is a `<br />`" rule would not work in Markdown.

Markdown's email-like [Quotes](#quotes) and [list entries](#listen) with multiple paragraphs work best -- and look better -- when formatted with line breaks.

[bq]: #blockquote

[l]:  #list

### Headers
Markdown here supports only one type of header formatting: atx.
Atx-style headers use 1-6 hash characters at the beginning of the line, corresponding to levels 1-6. For example:

`# Dies ist ein H1`

`## Dies ist ein H2`

`###### Dies ist ein H6`

### Quotes
Markdown uses - like emails - the character `>` for quotation blocks. If you have experience with quotations in emails, you also know how to create quotations in Markdown. It looks best if you break the text per line and put a `>` in front of each line:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `> consectetuer adipiscing elit. Aliquam hendrerit mi posuere` `> lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet` `> vitae, risus.` `>` `> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `> Suspendisse id sem consectetuer libero luctus adipiscing.`

But Markdown also allows you to be lazy and use `>` only on the first line of a hard-break paragraph:

`> Dies ist ein Zitat mit zwei Absätzen. Lorem ipsum dolor sit amet,` `consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.` `Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae,` `risus.`

`> Donec sit amet nisl. Aliquam semper ipsum sit amet velit.` `Suspendisse id sem consectetuer libero luctus adipiscing.`

Quotations can be nested (i.e. quotation within a quotation) by using more `>`:

`    > Dies ist die erste Zitat-Ebene.` `    >` `    > > Dies ist ein verschachteltes Zitat.` `    >` `    > Zurück auf der ersten Ebene.`

Quotations can contain other Markdown elements, including headers, lists, and code blocks:

> ## This is a heading.
> > 1. This is the first list item.
> 2. This is the second list item.
> > Here is some example code: > > return shell_exec("echo $input | $Markdown_script");

Any decent text editor should make it easy to quote in email style. In BBEdit, for example, you can make a selection and choose `Text` and then `Increase Quote Level` from the menu.

### Lists
Markdown supports sorted (numbered) and unsorted lists (bulleted lists).

Unsorted lists use asterisks, pluses and hyphens -- interchangeably -- as list markers:

    *   Red
    *   Green
    *   Blue

is the same:

+ Red + Green + Blue

And:

    -   Red
    -   Green
    -   Blue

Sorted lists use numbers followed by a dot:

1st dog
2nd cat
3rd mouse

It is important to understand that the numbers themselves have no effect on the output of Markdown. Markdown creates the following HTML code from the last list:

<ol><li>Dog</li><li> Cat</li><li> Mouse</li></ol>

If you write the list like this instead:

1st dog
1st cat
1st mouse

Or even:

3rd dog
1st cat
8th mouse

the same list comes out every time. If you want, you can number your lists correctly by hand. But if you want to be lazy, you can always use the same number.

However, you should still start the list with the number 1. In the future, Markdown may want to specify a starting number for the first list entry.

List items usually start at the left edge of the document, but they can be indented up to three spaces to the right.
List markers must be separated from the following text by one or more spaces or a tab.

To format lists nicely, the individual entries can be further indented, like this:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit mi posere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

        Suspendisse id sem consectetuer libero luctus adipiscing.

The following example generates the same code, but is less tidy:

    * Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

Aliquam hendrerit mi posere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    * Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    Suspendisse id sem consectetuer libero luctus adipiscing.

If list items are separated by blank lines, Markdown will wrap the list items with `<p>` and `</p>`.

For example, this will be:

* Warsteiner
* King

to

<ul><li>Warsteiner</li><li> king</li></ul>

But this:

* Warsteiner

* King

becomes

<ul><li><p>Warsteiner</p></li><li><p> king</p></li></ul>

List items can consist of several paragraphs. Each subsequent paragraph in a list item must be indented with at least 4 spaces or a tab:

1. This is a two-paragraph list item. Lorem ipsum dolor

sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posere lectus.

Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus. Donec sit amet nisl. Aliquam semper ipsum sit amet velit.

    2. Suspendisse id sem consectetuer libero luctus adipiscing.

It looks good if every line of the following paragraph is indented, but again Markdown allows the lazy to indent only the first line:

* This is a list item with two paragraphs

This is the second paragraph in this bullet point. Only the first line needs to be indented. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.

* Another item on the same list.

To use a quote in a list item, the quote must be indented:

* A list item with a quote:

> This is a quote > In a list.

To use a code block in a list item, it must be indented *twice* -- 8 spaces or two tabs:

* A list item with code example:

<insert code here>

It is possible to create lists unintentionally by writing, for example,
the following:

1986. What a wonderful year.

In other words: The sequence *number-dot-space* at the beginning of a line. To avoid this problem, the dot can be escaped with a backslash:

1986\. What a wonderful year.

<h3 id="precode">code blocks</h3>

Preformatted code blocks are used to write over program or markup source code. Instead of forming normal paragraphs, the lines in a code block are interpreted as found. Markdown includes code blocks with the tags `<pre>` and `<code>`.

To create a code block in Markdown, simply indent each line of the block with at least 4 spaces or a tab. From the following input...

This is a normal paragraph.

This is a code block.

...Markdown does the following:

    <p>This is a normal paragraph.</p>

<pre><code>Dies ist ein Code-Block.
</code></pre>

One level of indentation -- 4 spaces or 1 tab -- is removed from each line of indentation. For example, the following...

An example in AppleScript:

tell application "Foo" beep end tell

...becomes

    <p>An example in AppleScript:</p>

<pre><code>tell application "Foo" beep end tell </code></pre>

A code block ends at the first line that is not indented (or at the end of the document).

In a code block, the ampersand (`&`) and angle brackets (`<` and `>`) are automatically converted to HTML entities. This makes embedding HTML pieces much easier -- just copy HTML into the document, indent it, and Markdown will do the encoding of the ampersand and angle brackets. For example:

<div class="footer">© 2004 Foo Corporation</div>

becomes:

<pre><code>&lt;div class="footer"&gt; &amp;copy; 2004 Foo Corporation &lt;/div&gt; </code></pre>

Normal Markdown syntax is not processed in code blocks. That is,
asterisks are just asterisks in a code block and not the signal to highlight the text. The consequence is that it is easy to talk *about* Markdown in Markdown.

<a id="hr"></a>

### Horizontal lines The horizontal line tag (`<hr />`) can be generated by writing 3 or more hyphens or asterisks alone on a line. Spaces between characters are also allowed. All of the following examples would generate a horizontal line:
    * * *

    ***

    *****

    - - -

    ---------------------------------------

* * *

<div id="span"></div>

## Span elements
<a id="link"></a>

### Links
Markdown supports two types of links: *inline* and *references*.

In both styles, the link text is marked with [square brackets].

To create an inline link, write normal brackets directly after the closing square bracket. In these brackets, write the URL to which you want to link, along with an *optional* title for the link in quotation marks. Examples:

This is [an example](http://example.com/ "Der Linktitel") for an inline link.

[This link](http://example.net/) has no title attribute.

This results in:

<p>This is <a href="http://example.com/" title="title">an example</a> of an inline link.</p>

<p><a href="http://example.net/">This link</a> has no title attribute.</p>

If you want to reference content on the same server, you can use relative paths:

Further information is available on the page [About me](/about/).

Reference links use a second set of square brackets in which an arbitrarily chosen identifier for the link is written:

This is [an example][id] of a reference link.

If desired, you can also insert a space between the brackets:

This is [an example] [id] for a reference link.

Then, somewhere in the document, the link is defined on a separate line as follows:

[id]: http://example.com/  "Optionalen Titel hier eintragen"

So:

* Square brackets containing the link identifier (optionally with

indented with up to three spaces);

* followed by a colon;
* followed by one or more spaces (or tabs);
* followed by the URL for the link;
* optionally followed by the text for the title attribute of the link,

enclosed in brackets, single or double quotation marks.

The following three definitions are identical:

[foo]: http://example.com/  "Optionaler Titel"

[foo]: http://example.com/  'Optionaler Titel'

[foo]: http://example.com/  (Optionaler Titel)

**Note:** There is a known bug in Markdown 1.0.1 that prevents single quotes from separating link titles.

The link URL can optionally be wrapped in angle brackets:

[id]: <http://example.com/>  "Optionaler Titel hier"

The title attribute can also be placed on the next line and indented with more spaces or tabs. This looks better with long URLs:

[id]: http://example.com/langer/pfad/zu/seite

"Optional title here"

Link definitions are only used to create links while Markdown is processing the document and are removed from the document before the HTML is output.

The identifiers for link definitions can consist of letters, numbers, spaces and punctuation marks. They are *independent* of upper and lower case:

[Link-Text][a] [Link-Text][A]

The two link definitions are equivalent.

The *implied link identifier* allows the link identifier to be omitted. In this case, the link text is used as the identifier. Simply add an empty set of square brackets to the link text:

[Google][]

Then the link is defined:

[Google]: http://google.com/

Since link identifiers can contain spaces, this abbreviation even works for multiple words in the link text:

Visit [Daring Fireball][] for more information.

Then the link is defined:

[Daring Fireball]: http://daringfireball.net/

Link definitions can be made anywhere in the Markdown document. Generally, it's a good idea to make them after the paragraph in which they are used. But they can also be listed all together at the end of the document, like footnotes.

A small example:

I get ten times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].

[1]: http://google.com/        "Google"

[2]: http://search.yahoo.com/  "Yahoo Search"

[3]: http://search.msn.com/    "MSN Search"

Using the abbreviation via the implied link identifier, you can also write the following:

I get ten times more traffic from [Google][] than from [Yahoo][] or [MSN][].

[google]: http://google.com/       "Google"

[yahoo]: http://search.yahoo.com/  "Yahoo Search"

[msn]: http://search.msn.com/      "MSN Search"

Both examples would result in the following HTML code:

<p>I get ten times more traffic from <a href="http://google.com/" title="Google">Google</a> than from <a href="http://search.yahoo.com/" title="Yahoo Search">Yahoo</a> or <a href="http://search.msn.com/" title="MSN Search">MSN</a> .</p>

For comparison, here is the same paragraph using Markdown’s inline links:

I get ten times more traffic from [Google](http://google.com/ "Google") than from [Yahoo](http://search.yahoo.com/ "Yahoo Search") or [MSN](http://search.msn.com/ "MSN Search").

The idea behind reference links is not that they are easier to write. The idea is that they make documents far more readable. The example paragraph is only 80 characters long with reference links, but with reference links it is a full 181 characters long; as HTML it is 239 characters, more markup than content.

With Markdown's reference links, the source document more closely resembles the final output format as shown in the browser. The ability to extract metadata for markup from the paragraph allows links to be integrated into the text without slowing down the flow of the text.

<a id="em"></a>

### Emphasis Markdown treats asterisks (`*`) and underscores (`_`) as indicators of emphasis. Text packed into single `*` or `_` is enclosed with the HTML tag `<em>`, and duplicate `*` or `_` are marked with the tag `<strong>`. For example, the following text:
*Single asterisk*

_Single underscores_

**Double asterisks**

__Double underscores__

Will output the following:

    <em>Single asterisks</em>

    <em>Single underscores</em>

    <strong>Double asterisks</strong>

    <strong>Double underscores</strong>

The style can be chosen arbitrarily. The only limitation is that the same character must be used to open and close an emphasis area.

Stress can be used in the middle of a word:

Lord*God*sacrament

But if a `*` or `_` is surrounded by spaces, it is treated like a simple asterisk or underscore.

To write an asterisk or an underscore in a place where it would be understood as an emphasis, it can be escaped with a backslash:

\*This text is enclosed in asterisks.\*

<a id="code"></a>

### Code To mark a code section, it is enclosed in backtick characters (`` ` ``). In contrast to a code block, a code section formats code within a normal paragraph:
Use the function `printf()` to output text.

Becomes:

    <p>Use the <code>printf()</code> function to output text.</p>

If a backtick is to be displayed in the code area, then several backticks can be used before and after the code area:

``Irgendwo hier (`) a backtick is hidden.``

This becomes:

    <p><code>irgendwo hier (`) ist ein Backtick versteckt.</code></p>

The backtick separators around a code section can contain spaces -- one after the opening backticks, one before the closing backticks. This allows the use of backticks within the code section, even at the beginning or end:

A single backtick in a code section: `` ` ``

A backtick-enclosed string in a code section: `` `foo` ``

becomes:

	<p>A single backtick in a code section: <code>`</code></p>

	<p>A backtick-enclosed string in a code section: <code>`foo`</code></p>

In code areas, the ampersand and angle brackets are encoded as HTML entities.

Nobody uses `<blink>` tags.

This becomes:

    <p>Nobody uses <code>&lt;blink&gt;</code> tags.</p>

The following also works:

`&#8212;` is the decimal encoded equivalent of `&mdash;`.

This will lead to

<p><code>&amp;#8212;</code> is the decimal encoded equivalent of <code>&amp;mdash;</code> .</p>

<a id="img"></a>

### Graphics Admittedly, it is quite difficult to find a "natural" syntax for embedding graphics in text.
Markdown uses a syntax that is intended to resemble the style of links. This allows two types: inline and reference.

The inline syntax looks like this:

    ![Alternative text](../../de/community/pfad/zum/bild.jpg)

    ![Alternative text](../../de/community/pfad/zum/bild.jpg "Optional title")

So:

* An exclamation mark: `!`;
* followed by a set of square brackets that contain the value of the

`alt` attributes for the graphic;

* followed by parentheses, which are the URL or path to the graphic

and the value of an optional `title` attribute, wrapped in quotation marks.

Image references in reference style look like this:

![Alternative text][id]

"id" is the name of a defined image reference. Image references are defined using the same syntax as link references:

[id]: url/zur/grafik  "Optionales title-Attribut"

Currently, Markdown does not have a syntax for specifying the size of an image. If this is necessary, the normal HTML tag `<img>` can be used.

* * *

<div id="misc"></div>

## Miscellaneous
<a id="backslash"></a>

### Backslash masking
Markdown allows you to use backslash escaping to write characters that otherwise have a specific meaning in Markdown's syntax.
For example, if you want to surround a word with asterisks (instead of the HTML tag `<em>`), you can put backslashes in front of the asterisks:

\*Surrounded by asterisks\*

Markdown offers this option for the following characters:

\ Backslash ` Backtick

* asterisk

_ Underscore {} Curly brackets [] Square brackets () Round brackets

# Hash + Plus sign
- Minus sign (hyphen)

. Period ! Exclamation mark

* * *

<a id="lizenz"></a>

### License
This work is licensed under a [Creative Commons Attribution-ShareAlike (BY-SA) 4.0 International License][by-sa].

[by-sa]: http://creativecommons.org/licenses/by-sa/4.0/deed.de

?>This is a translation of the [original syntax documentation][osd] by [John Gruber's][jg] [Markdown][md]. This translation is as of December 15, 2013 (Markdown version 1.0.1). No guarantee is given for the accuracy of the translation. If you find any errors in the translation, please send a short message to <lasar@liepins.net>.

Any other kind of feedback is also welcome.*

[jg]: http://daringfireball.net/

[md]: http://daringfireball.net/projects/markdown/

[osd]: http://daringfireball.net/projects/markdown/syntax