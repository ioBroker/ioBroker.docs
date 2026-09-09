---
title: Crash reports
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/ecosystem/sentry.md
hash: rNUel+vL4gj/83sTrKgMJmBvHTnb5BzbtIgv1UizSrE=
---
# Crash reports

When an adapter crashes, an error message is logged. The developer only sees it if someone reports it. This is precisely the gap that crash reports close: a crashed adapter automatically sends the error to its developer without anyone having to create an issue.

This is powered **by Sentry** , a widely used bug tracking service. ioBroker uses its own plugin for this, which can incorporate an adapter. Not every adapter does this.

## What is being transmitted

A crash report contains the error itself: the message, the location in the program code, the call chain leading to it, the adapter version, and the environment in which it was running. It also includes the anonymous installation ID, so the developer can identify whether a hundred reports originate from a hundred different systems or from the same system.

Your name, email address, or IP address will not be transmitted. The messages will be deleted after a maximum of 90 days.

What a crash _doesn't_ send along is your data: no object values, no access data, no adapter configuration. What's transmitted is the program error, not the state of your system.

## Which adapters can do that?

In the adapter list, adapters that report crashes have a special symbol: **green mountains** . This allows you to see at a glance on an adapter's tile whether the developer is even aware of a crash.

The same information is available in the instance list in the column overview: there, a symbol per instance indicates whether that instance reports crashes.

## Switch off

There are three levels, and they operate independently of each other.

**The entire installation is configured** via System Preferences, _Statistics_ tab. If **no option** is selected there, according to the dialog's message, neither usage statistics nor crash reports will be transmitted. This is the setting for those who do not want to send anything at all. Details about the tab's appearance can be found under [Usage Statistics](/docs/ecosystem/statistics.md) .

**To use a single host** or instance via the command line:

```bash
iobroker plugin disable sentry
iobroker plugin disable sentry --instance adaptername.0
```

The first command applies to the host on which it is executed, the second only to the specified instance.`enable` instead of`disable` It will be switched on again.

**In the object tree** , if you're already there. The switch is located in`system.host.NAME.plugins.sentry.enabled` for a host and in`system.adapter.NAME.INSTANCE.plugins.sentry.enabled` for one instance. This is the same setting that the command line sets, only manually.

## For developers

An adapter receives crash reports via [plugin-sentry](https://github.com/ioBroker/plugin-sentry) . This is logged in the`io-package.json` under`common.plugins.sentry` , with the`dsn` The name of your own Sentry project is mandatory. Optionally, paths and error types can be included or excluded to prevent every irrelevant exception from ending up in your inbox.

Anyone who wants to prevent reporting for an instance altogether sets`common.disableDataReporting` in the instance object. The fields are described under [Object Schema](/docs/dev/objectsschema.md) .