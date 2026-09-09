---
title: Usage statistics
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/ecosystem/statistics.md
hash: UJy7x2IAR47owf5kClLHAWdQRwlyM2+I4UYcUBYo4UQ=
---
# Usage statistics

Each installation can anonymously report what it is running. This creates the
[Statistics page](/statistics) This website: how many installations there are, on which operating systems they run, with which Node.js versions, in which countries and with which adapters.

Participation is voluntary, and it's the only way the project can answer such questions. Whether an adapter is still in use, whether an older Node.js version still needs support, whether the effort for a particular platform is worthwhile: none of this is reflected in sales statistics because there aren't any.

## Where this is set up

In the admin area under **system**, rider **statistics**There are four settings listed there:

| Attitude         | Meaning                                                 |
| ---------------- | ------------------------------------------------------- |
| **none**         | Nothing is transmitted.                                 |
| **Normal**       | The usual scope.                                        |
| **without city** | Same as above, but the location is omitted.             |
| **expanded**     | The full scope, including a list of installed adapters. |

The crucial point in this dialogue: **On the left it shows the list of fields and on the right the actual data record.**, exactly as it would be transmitted, in plain text and for your installation. So you don't have to believe anyone what's being sent; you can read it yourself.

## What is transmitted

The most comprehensive settings include, among other things:

- the **UUID** the installation, i.e. an identifier without reference to a person,
- **Language** and **country**, depending on the setting, also the city,
- per host **Version of the js-controller**, the platform and system type,
- the **Node.js version**, the processor architecture and whether it is a Docker installation,
- the **installed adapter** with version and origin
- which database types are used for objects and states.

The information is transmitted when the adapter list is updated, not continuously.

The country and city originate from the rider. **system** the same
[System settings](/docs/admin/settings.md)ioBroker also uses these data to calculate sunrise and sunset. No location tracking is performed and no IP addresses are evaluated.

The same setting also controls the **Crash reports**, see
[Error reports](/docs/ecosystem/sentry.md)Anyone who is on _none_ If it turns off, both are switched off.

## What results from this

On the [Statistics page](/statistics) The evaluations include: the number of installations and their development since 2015, the distribution by country, operating system, language and Node.js version, and how many systems work with multiple hosts.

The map on this page is loaded from Google Maps and will therefore only be displayed if you explicitly request it. Until then, no request is sent there.

The graph counts installations, not people. Anyone setting up a new installation instead of restoring from a backup gets a new UUID and is counted again.

## What that does to you

Nothing. There's no advertising, no data sales, and no tracking back to an individual. The benefit lies elsewhere: the numbers help determine which adapter is maintained and when an old Node.js version can be deprecated.