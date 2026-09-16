---
title: forum
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/forum.md
hash: F5/HHKcfQqpvPGZsjsGDQwV1/veM9fVRAWBaAqXHzTg=
---
# The forum

The [ioBroker forum](https://forum.iobroker.net) is the place to go if your own [troubleshooting efforts](/docs/trouble/search.md) are unsuccessful. Other users and many adapter developers help there, voluntarily and in their free time. How quickly and how well a question is answered depends almost entirely on how it is phrased.

## Before writing

**Search.** Most questions have already been asked. Searching the forum for the exact wording of the error message often leads directly to the relevant topic.

**Choose the correct subforum.** There are separate sections for beginners, for individual adapters, for hardware, for scripts, and for development. An adapter question posted in the beginner section will not reach the developer.

**Only continue an existing thread** if it truly deals with the same problem. Introducing a new problem into another thread only confuses both cases.

## What belongs in the post

| Information                  | Why                                                             |
| ---------------------------- | --------------------------------------------------------------- |
| **What you want to achieve** | Often there is an easier way than the one that has been chosen. |
| **What you did**             | So that no one makes suggestions you've already tried.          |
| **What happened**            | The actual observation, not the assumption about the cause.     |
| **The versions**             | js-controller, Node.js, affected adapter, operating system.     |
| **The protocol**             | The section around the error, a few lines before and after.     |

The versions deliver`iobroker version` and the [Hosts](/docs/admin/hosts.md) tab.

## The title

The title determines who even opens the post. It should name the problem, not the emotional state.

- Good: "hm-rpc.0 loses connection to the CCU3 after restart"
- Bad: "Help!!! It's not working anymore"

## The protocol as text, not as an image

A screenshot of the log is useless: it's not searchable, the lines are cut off, and no one can quote from it. Paste the text from the **downloaded** log file and place it in a code box to preserve the formatting.

Before submitting, please review your post and remove passwords, access keys, public IP addresses, serial numbers, and the installation UUID. Forum posts are public and will be indexed by search engines.

## After sending

- **Answer follow-up questions.** Those who want to help often need more information.
- **Be patient.** Everyone responding is doing this voluntarily. Asking "Does nobody have any ideas?" after two hours won't help.
- **Add the solution later.** If it works in the end, explain the cause in your final post. The next person with the same problem will find it via search and be grateful.

## Forum or bug report

Not every problem belongs in the forum. A general rule of thumb:

- **Forum** , if it is unclear whether it is even a mistake, if it concerns one's own setup, or if there is a question about the best way to proceed.
- **[A bug report should be submitted](/docs/trouble/issue.md)** to the developer when a reproducible bug is identified and it is clear which adapter it is located in.

If in doubt, check the forum first. If it turns out to be a genuine error, someone there will usually point you in the right direction.