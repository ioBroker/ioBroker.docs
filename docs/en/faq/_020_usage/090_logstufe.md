---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_usage/090_logstufe.md
title: no title
hash: wsdiRzIWDT5lfMvJ6+QLxLCIIhvyx+pgUeejRjXzJ4Y=
---
## How do I change the log level?

In the rider **Instance** Expand the instance details row and click on the log level:

<img src="media/faq_logstufe.png" alt="Der Dialog zum Ändern der Protokollebene" width="420" />

The options range from the most detailed to the most concise level: **Everything**, **Debug**,
**info**, **warning**, **Mistake**The default setting is... _info_.

For troubleshooting, one sets _Debug_ Once it does, the instance restarts and reviews the logs again.

Then reset it. _Debug_ The protocol grows quickly and consumes write accesses. This is not a good idea on an SD card.

The requirement for **new** instances are in the
[System settings](/docs/admin/settings.md).