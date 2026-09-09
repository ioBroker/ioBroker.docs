---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/060_redis.md
title: no title
hash: NHCg04F8OPW7wrXHzHqjYdh1Og1DtlHKeWQmmUHbsOg=
---
## What is Redis, and when does it become worthwhile?

ioBroker maintains two databases: one for the **objects** (the structure) and one for the **states** (the values). The default setting for both is...`jsonl` , a file that is kept in memory during operation.

**Redis** is an alternative for managing states. It's worthwhile if many values change very frequently, as a rough guideline starting at a few thousand states with frequent changes, or if`memRss` The js-controller is growing noticeably.

Please note:

- Redis must be **persisted** , otherwise the states will be lost after a reboot.
- The backup must include Redis. BackItUp can do that.
- For objects, as a rule,`jsonl` the better choice.

For a typical home installation, the default settings are perfectly adequate. Changing them without experiencing any problems usually just introduces an additional potential source of error.

In detail: [Redis](/docs/config/redis.md)