---
title: Report a bug
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/issue.md
hash: gNepyM9GF+63kb0W7I6SuHAfRa9MNz3eVbyO7MbOUV8=
---
# Report a bug

Something isn't working. Before reporting this to the developer, one question needs to be answered, and it's more important than anything else on this page: is the problem actually with the program?

## First: is it a bug in the program?

Most problems aren't problems at all. They stem from a setting, an outdated version, a device that isn't responding, or a misunderstanding of how something is supposed to work. So let's take it one step at a time:

1. **Limit yourself.** Is the instance running? Are values being received? What does the log say? The procedure is described below.
   [Troubleshooting](/docs/trouble/search.md).
2. **In the [forum](/docs/trouble/forum.md)
   questions.** There, it is quickly determined whether the problem lies with the institution itself. Very often, the answer is found there, and no one needs to change anything in the program.

Rule of thumb: **forum**, as long as it is unclear whether an error has actually occurred.
**Report to the developer** Only proceed once the error is reproducible and it's clear which adapter is causing it. If in doubt, check the forum first. If it turns out to be a genuine error, someone there will usually point you in the right direction.

## Then: check three things

- **Is everything up to date?** Adapter and JS controller are up to date. Many bugs have long since been fixed.
- **Can the mistake be repeated?** If so, note how. That is the most valuable piece of information in the entire report.
- **Has he already been registered?** Instructions on how to check this are below.

## What an issue is

Reports are not submitted via email, but as **Issue**This is an entry in a program's error list. Every adapter, the JS controller, the admin interface, and even this documentation have such a list. It's located on GitHub, the platform where the ioBroker source code is managed.

|                           | forum                               | Issue                                        |
| ------------------------- | ----------------------------------- | -------------------------------------------- |
| Who is reading along?     | Other users                         | The person who wrote the adapter             |
| What is it intended for?  | Questions, help with your own setup | A bug in the program                         |
| What will become of this? | An answer                           | A change to the program, or a reason why not |

Two characteristics are important to know.

An issue is **public**Anyone can read it, it remains permanently displayed, and search engines can find it. This is intentional, so that the next person with the same problem can find it. However, it also means that no login credentials should be included.

And it is **no support contract**Adapters are written and given away in the author's free time. An issue is a notification to the person who created it, not a guarantee of a response within a specific timeframe.

## Finding the right list

| What is affected                      | Where                             |
| ------------------------------------- | --------------------------------- |
| A single adapter                      | The repository of this adapter    |
| The admin himself                     | `ioBroker/ioBroker.admin`         |
| Start, Databases, `iobroker`-commands | `ioBroker/ioBroker.js-controller` |
| Installation under Linux              | `ioBroker/ioBroker`               |
| This documentation                    | `ioBroker/ioBroker.docs`          |

The quickest way to find an adapter's repository is via the
[Adapter list](/adapters) On this website: Select the adapter; a button with the GitHub logo will take you directly to the repository. Alternatively, a search on GitHub will help.
`ioBroker.<name>`.

Adapters are maintained by different people, so the repository is not always located under \[the relevant user account]. `ioBroker`The crucial point is that the name is on
`ioBroker.<adaptername>` ends.

## Creating an issue, step by step

1. **Create an account.** A GitHub account is required to contribute content. It's free; reading is possible without one.
2. **Go to the repository** and the rider at the top **Issues** open.
3. **Search first.** The search field above the list only searches open entries. For closed entries, use the filter. `is:open` remove and
   `is:issue <stichwort>` Enter the answer. Often the solution is already there.
4. **On `New issue` click.** Some adapters then offer a selection of templates, such as... _Bug report_ and _Feature reques&#x74;_&#x53;elect the error message. The template asks for exactly what is needed; fill in all fields and do not simply delete the information lines.
5. **Write the title and text.** What belongs in it is explained in the next section.
6. **Submit** with `Submit new issue`.

You will then receive an email as soon as someone replies. Answering follow-up questions is the most important part: a report that remains untouched after the first question is closed without any changes. Finally, the person who created the report closes the entry. If the error reappears, the same entry can be commented on or reopened.

## What belongs inside

1. **A title that names the problem.** “hm-rpc loses connection to CCU3 after restart” is useful, “doesn’t work” is not.
2. **What you expected** and **what happened instead**Two sentences, but separate from each other.
3. **How to trigger the error**, Step by step.
4. **The versions**Adapter, js-controller, Node.js, operating system.
   `iobroker version` and the rider
   [Hosts](/docs/admin/hosts.md) The information is provided.
5. **The protocol excerpt at the level `debug`**, from the **downloaded**
   Log file. How to change the level is described under
   [Troubleshooting](/docs/trouble/search.md).

Protocols should be included as text, not as screenshots: long lines will be cut off in the display, and it's impossible to search or quote from an image. To preserve the formatting, enclose the text in three back quotes.

````
```
2026-09-08 14:02:11.431  - error: hm-rpc.0 (1234) Cannot connect to 192.168.1.20
```
````

For errors in the user interface, a screenshot is exactly what's needed. It can simply be dragged and dropped into the text field.

!> Review before submitting. Passwords, access keys, tokens, serial numbers, and the installation UUID do not belong in a public report.

## Language

English reaches all developers. For adapters from German-speaking countries, German is fine. In both cases, an adapter represents work that someone has given away, and the tone often determines how quickly things happen.

## Automatic error messages

Many adapters automatically report crashes to Sentry if this occurs.
[System settings](/docs/admin/settings.md)
This is permitted. The program flow of the crash is transmitted, not personal data. This allows the developer to see... **that** The report records when an error occurs and how often, but not what you did when it happened. Therefore, a self-written report remains valuable.

## And if you can fix it yourself

Then there is a **Pull Request** The next step: a suggested change to the source code, which the supervising person can then accept. How this works is explained below.
[Working in a team](/docs/community/project.md)The rules for adapters are listed under
[Best Practices](/docs/dev/bestpractices.md), which are for documentation under
[Write an article](/docs/community/doc.md).