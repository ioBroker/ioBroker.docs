---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/020_enable_debug_level.md
title: no title
hash: ZlCxc0HdNkXTIwXRbl4n0orTeN8mecEOR/yakITBDgI=
---
## How do I switch an instance to debug mode?

In the rider **Instance** Expand the instance details row and click on the log level. In the dialog box, click on **Debug** place:

<img src="media/faq_logstufe.png" alt="Der Dialog zum Ändern der Protokollebene" width="420" />

The setting will be saved permanently. Without the checkmark next to _Without restarting_
The instance restarts. This is usually intentional, because only then does it log the complete process from the beginning.

Then trigger the action that creates the error, and in the
[Protocols](/docs/admin/log.md) check.

!> After troubleshooting, back to normal _info_ postpone.

For an error message in the forum or on GitHub, the following excerpt from the
**downloaded** Please provide a log file, not a screenshot of the list. Long lines are cut off in the display.