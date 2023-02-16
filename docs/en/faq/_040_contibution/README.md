---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_040_contibution/README.md
title: contribution
hash: B+xY42m31y1RW45SPTaSuNKZTq+l++EXSVaUgJPKI+g=
---
# Contribution
There are different ways you can contribute to the development of ioBroker.
We have summarized the most important options in this chapter.

## Documentation
Documentation is an important part of ioBroker. She is the first port of call for new users who want to get involved with ioBroker.

The documentation can be found in this GitHub repository and e.g. this text has to be edited here: [docs/en/faq_040_contribution/README.md](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/de/faq/_040_contibution/README.md).

The documentation can be written in one of 3 languages: English (preferred), German and Russian.

The texts and pages are written in Markdown and can be edited with any text editor, or directly in the browser on GitHub.

You can use the language you like the most.
If you don't speak a language, you can also use a translation from Google.
We will then correct the texts. The most important thing is that the texts are understandable and their will not only stay in your head, but are also saved on paper (on GitHub).

Pay attention to the language in which an existing document is recorded. If `translatedFrom: XX` is at the top, then this document will be translated from another language and all your changes will then be overwritten again.
However, if you want to edit the document in exactly this language, please delete the `translatedFrom` entry so that the document is not translated again.

But it is better to edit original language, because then we can make synchronization between languages easier.

## Report an error
If you find a bug in ioBroker, then you can report it to the appropriate adapter on GutHub.

You need a free GitHub account for this. If you don't have one yet, you can register here: [github.com](https://github.com).
Registration only takes a few seconds, but that will help us tremendously in maintaining and fixing the errors.

Please remember that the developer cannot read your mind.
When reporting a bug, please describe exactly what you did, what happened, and what you expected.
It helps a lot if error logs are also attached. Screenshots are also very helpful.

Please don't forget to mention the version number of the adapter and the version of `ioBroker.js-controller`.

How to report graphical errors (occurring in the browser) see [here](./010_how_to_debug_gui.md).

Please don't forget that you can also view ioBroker logs in the CLI:

- `iob logs` to display the last 100 lines of logs,
- `iob logs --w` to display the logs in real time.

## Development
It may happen that you want to develop an adapter yourself or even want to work on the ioBroker core.

Both are possible. :)

To develop an adapter, there is a [Instructions](../dev/adapterdev.md).

## Answer questions on ioBroker Forum
You can also help with this by answering the questions on the ioBroker forum.
New users come every day and they have questions because the documentation is not sufficient or not understandable.

## Contribute ideas
If you have an idea how ioBroker can be improved, then you can discuss it on the ioBroker forum or make a [here](https://github.com/ioBroker/AdapterRequests/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3AReleased) wish.
If your idea gets enough support, it will be included in the roadmap.