---
title: About ioBroker
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/ecosystem/README.md
hash: JLz8I2w/x9AEVVzW8D07oNp76cu0SznNtHxZWSdL0g8=
---
# About ioBroker

Most chapters of this documentation describe what happens on your own computer. This one describes what lies behind the scenes: what data the project collects, where a crashed adapter reports to, and which internet addresses belong to ioBroker.

These are the topics for which there is hardly any reliable information outside of this documentation. Assumptions circulate in the forum, and these are mostly either too skeptical or too careless.

## The pages of this chapter

**[Usage statistics:](/docs/ecosystem/statistics.md)** What an installation reports about itself, where this is configured, what four levels there are, and what results from this on the statistics page of this website.

**[Crash messages:](/docs/ecosystem/sentry.md)** How a crashed adapter reaches its developer, what data is transmitted, and how to disable this for the entire installation, a host, or a single instance.

**[Adapter reviews:](/docs/ecosystem/rating.md)** Who is allowed to award stars in the admin panel, why they always refer to a specific version, and what belongs in a comment and what doesn't.

**[Addresses and services:](/docs/ecosystem/domains.md)** Which internet address belongs to which purpose, and which of them your installation addresses automatically.

## A brief overview

For those who simply want to know if ioBroker "phones home": yes, in two precisely defined cases, and both can be disabled.

One aspect is the **usage statistics** . These report which Node.js version and platform you are using, as well as which adapters are installed, linked to a random identifier but without your name or personal data. This information is then used to generate public statistics, which indicate which Node.js versions still need support and whether an adapter is still in use.

The other thing is the **crash reports** . If an adapter crashes, the error message is sent to its developer. This also happens without your data being transmitted.

Both options are found in the same system settings, under the _Statistics_ tab. If you **don't** select either option, nothing will be sent.

Everything else that your installation establishes in terms of connections is due to adapters that you have set up yourself and to retrieving the adapter list.