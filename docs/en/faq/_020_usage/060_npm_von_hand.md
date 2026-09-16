---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_usage/060_npm_von_hand.md
title: no title
hash: T+g8pfQ73LO7T7vvns8LBTPsLgec4vUcp+Gb8qIc1r0=
---
## When should I manually install something using npm?

Normally: **not at all.**

ioBroker manages its own adapters.`npm install` by hand in the directory`/opt/iobroker` It creates files that ioBroker is unaware of. The change will be lost with the next update; in the worst case, the installation will be corrupted.

Everything you need is done through the admin or via`iob` on the command line. The commands are listed under [Command Line](/docs/config/cli.md) .

One exception is additional Node modules that require their own JavaScript script. These are not installed manually, but rather entered in the configuration of the JavaScript instance; ioBroker then takes care of it.