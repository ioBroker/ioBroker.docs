---
title: Style guide surface
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/dev/styleguideui.md
hash: lrLZqATDKWGLIWb+tK5N1Gt/4g71xa90GlvCs8k+SU4=
---
# Style guide for the adapter surface

For many users, the configuration page is the only part of an adapter they ever see. It determines whether an adapter is considered simple or complicated, regardless of how well it actually works.

## Use JSON configuration

Configuration pages are referred to as`jsonConfig.json` It's described, not as a separate HTML page. The administrator builds the interface from this. This has three consequences, all pointing in the same direction:

- The site looks and behaves like all the others.
- It automatically adjusts to the color theme, language, and screen size.
- It will continue to work if the admin changes.

The complete description of all field types can be found under [JSON-Config](/docs/dev/adapterjsonconfig.md) .

Custom-built HTML pages are the reason why some adapters are unreadable or unusable on a phone in dark mode. They are not an option for new adapters.

## Just ask what's needed.

Each field on the page represents a decision the user must make. Therefore, let's proceed in order:

1. **Can the adapter detect the IP address itself?** Devices on the network can often be searched. A selection list of found devices is better than an input field for an IP address.
2. **Is there a sensible default setting?** If so, enter it. A field that remains unchanged in 99 percent of cases doesn't belong at the top.
3. **Is this even necessary?** A query interval that nobody changes anyway is one setting too many.

Items that are rarely used should be placed on a separate tab or behind the expert mode, not on the first page.

## Label

- **Describe what happens, not the field name.** "Query interval in seconds" is useful.`pollInterval` not.
- **Include the units:** seconds or milliseconds, degrees or percent.
- **Keep help texts short.** A sentence below the field is better than a paragraph that nobody reads.
- **Translate everything,** including the help texts. The [translator](https://translator.iobroker.in/) takes an English text and provides translations in the other languages.

## Give feedback

The user needs to see if it worked. A connection test button that provides a clear answer would save more forum posts than any help text. If something goes wrong, the message should tell you **what to do** , not just that it failed.

## Access data

Passwords and keys belong in fields of type password, are stored encrypted, and are transmitted via`protectedNative` Protected from other adapters. See [Safety](/docs/dev/adaptersecurity.md) .

## View before publishing

| Test                        | Why                                                          |
| --------------------------- | ------------------------------------------------------------ |
| Open in both color themes   | Permanently established colors stand out immediately.        |
| Open in another language    | Missing translations and overly long labels become apparent. |
| Open on a narrow window     | Many users configure the settings from their tablet.         |
| Save without input          | It needs to be clear what information is missing.            |
| Save with false information | The report must be helpful.                                  |

The configuration pages of well-maintained adapters from the official repository serve as a model. Replicating existing designs is expressly encouraged, as recognizability is the whole point.