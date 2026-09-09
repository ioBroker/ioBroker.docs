---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_usage/090_logstufe.md
title: no title
hash: wsdiRzIWDT5lfMvJ6+QLxLCIIhvyx+pgUeejRjXzJ4Y=
---
## How do I change the log level?

In the **Instances** tab, expand the details row of the instance and click on the log level:

<img src="media/faq_logstufe.png" alt="Der Dialog zum Ändern der Protokollebene" width="420" />

The available options, from most detailed to most concise, are: **All** , **Debug** , **Info** , **Warning** , **Error** . _Info_ is the default.

To troubleshoot, enable _debug mode_ , restart the instance, and review the logs again.

Then switch back. _Debug_ mode grows the log quickly and consumes write accesses. This is not a good idea on an SD card.

The setting for **new** instances is in the [system settings](/docs/admin/settings.md) .