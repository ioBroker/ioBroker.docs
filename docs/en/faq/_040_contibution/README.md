---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_040_contibution/README.md
title: Contribution
hash: jF7fUHJzM+MGQoRv/pZopwAUovn8TAKFm15fp+wteEM=
---
# Contribution
There are different ways in which you can participate in the development of ioBroker.
We have summarized the most important options in this chapter.

## Documentation
The documentation is an important part of ioBroker. It is the first point of contact for new users who want to get to grips with ioBroker.

The documentation can be found in this GitHub repository and e.g. this text can be edited here: [docs/en/faq_040_contribution/README.md](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/de/faq/_040_contibution/README.md).

The documentation can be written in one of 3 languages: English (preferred), German and Russian.

The texts and pages are written in Markdown and can be edited with any text editor or directly in the browser on GitHub.

You can use the language you like best.
If you don't know a language, you can also use a Google translation.
We will then correct the texts. The most important thing is that the texts are understandable and their meaning is not only kept in your head, but also saved on paper (on GitHub).

Pay attention to the language in which an existing document is recorded. If `translatedFrom: XX` is at the top, then this document is being translated from another language and all your changes will be overwritten.
If you want to edit the document in exactly this language, please delete the `translatedFrom` entry so that the document is not translated again.

But it is better to edit original language because then we can make synchronization between languages easier.

## Report error
If you find a bug in ioBroker, you can report it to the corresponding adapter on GutHub.

You will need a free GitHub account for this. If you don't have one yet, you can register here: [github.com](https://github.com).
Registration only takes a few seconds, but it will help us tremendously in maintaining and fixing the bugs.

Please remember that the developer cannot read your mind.
When reporting a bug, please describe exactly what you did, what happened and what you expected.
It helps a lot if you attach error logs as well. Screenshots are also very helpful.

Please do not forget to mention the version number of the adapter and the version of `ioBroker.js-controller`.

How to report graphical errors (occurring in the browser) can be found in [here](#fehlerindergrafischeoberflchemelden).

Please remember that you can also view ioBroker logs in the CLI:

- `iob logs` to display the last 100 lines of the logs,
- `iob logs --w` to view the logs in real time.

## Development
It may happen that you want to develop an adapter yourself or even contribute to the ioBroker Core.

Both are possible. :)

To develop an adapter, there is a [Instructions](../dev/adapterdev.md).

## Answer questions on ioBroker forum
You can also help by answering questions on the ioBroker forum.
New users come every day and they have questions because the documentation is insufficient or not understandable.

## Contribute ideas
If you have an idea how ioBroker can be improved, you can discuss it on the ioBroker forum or post a request [here](https://github.com/ioBroker/AdapterRequests/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+is%3Aopen).
If your idea receives enough support, it will be included in the roadmap.