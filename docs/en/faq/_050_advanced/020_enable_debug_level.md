---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/020_enable_debug_level.md
title: no title
hash: ZlCxc0HdNkXTIwXRbl4n0orTeN8mecEOR/yakITBDgI=
---
## How do I switch an instance to debug mode?

In the **Instances** tab, expand the details row of the instance and click on the log level. In the dialog box, set it to **Debug** .

<img src="media/faq_logstufe.png" alt="Der Dialog zum Ändern der Protokollebene" width="420" />

The setting is saved permanently. Without the " _Without restart"_ checkbox selected, the instance will restart. This is usually intentional, as only then will it log the complete process from the beginning.

Then trigger the action that caused the error and check the [logs](/docs/admin/log.md) .

!> After troubleshooting, reset to _Info_ .

For an error message in the forum or on GitHub, please include an excerpt from the **downloaded** log file, not a screenshot of the list. Long lines will be truncated in the display.