---
title: Best Practices
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/bestpractices.md
hash: ALi3Fu8ZVUkYbaVUkTLyJlM9vSa0R1rKwhc4werP6Dw=
---
# Best practices for adapters

An adapter can run on other systems for years without anyone noticing. Much of what's described here only becomes apparent when it's missing. The points are ranked according to the hassle they prevent.

## Don't start from scratch

The [Adapter Creator](https://adapter-creator.iobroker.in/) generates a framework with the standard directory structure, tests, and translation files. It's not a beginner's tool, but rather the fastest way to create a structure that others will recognize. Additional tools are available under [Custom Adapter](/docs/dev/adapterdev.md) .

For access to ioBroker always`@iobroker/adapter-core` Never use the databases directly.

## Clean up when you finish

Every timer, subscription, and open connection is cleared when the instance is shut down. If this is neglected, the instance cannot be restarted cleanly, it consumes more memory with each restart, and eventually the user's system will crash.

This is the most common fault in adapters and the one that users find most difficult to find themselves.

## Use access sparingly.

- Only query a device as often as its value actually changes. A counter reading does not require second-by-second resolution.
- Only write values when they have changed. Every write operation consumes resources and, if recording is enabled, memory.
- Create objects once, don't rewrite them on every run. Object and state are two different things; see [JS controllers](/docs/dev/controller.md) .

The user notices a wasteful adapter when their Raspberry Pi gets warm and the SD card dies.

## Setting roles and units correctly

The [role](/docs/dev/stateroles.md) of a data point determines whether visualizations, voice assistants, and automatic device recognition can do anything with it.`state` It is allowed, but it is the answer for when you don't know any better.

Likewise,`type` ,`unit` ,`min` ,`max` ,`read` and`write` maintained. A data point without a unit is a meaningless number.

## Protect secrets

Passwords and access keys should be encrypted and stored in the configuration.`protectedNative` Protected from other adapters. How this works is explained under [Security](/docs/dev/adaptersecurity.md) .

Never write access data to the log, not even at this level.`debug` Excerpts from the minutes end up in forum posts.

## Properly document everything

`info` This is for normal operation: start, stop, connection established or lost. Everything else belongs after.`debug` An adapter that writes a line every second during normal operation renders the log unusable for all others. See [Logging](/docs/dev/logging.md) for details.

Error messages are meant to tell you what to do.`Error: undefined` It doesn't help anyone.

## Place files in the correct location

Your own files belong in the ioBroker [file storage](/docs/dev/filestorage.md) , not in a directory you created yourself under`/opt/iobroker` This is the only way they are included in a [data backup](/docs/config/backup.md) and survive an update.

## Translate

The text in the configuration interface and the names of the objects are translated. The [translator](https://translator.iobroker.in/) takes an English text and outputs the other languages. See [Translations](/docs/dev/adaptertranslate.md) for details.

## Get tested

Automated tests catch precisely those errors that you wouldn't see during manual testing because your own device responds and your configuration is correct. See [Testing adapters](/docs/dev/adaptertesting.md) .

## Before the adapter is released

The conditions for inclusion in the official repository, including category, connection type, and details in the`io-package.json` , are listed under [Publish Adapters](/docs/dev/adapterpublish.md) . The project maintains a list of requested adapters under [AdapterRequests](https://github.com/ioBroker/AdapterRequests/issues) .