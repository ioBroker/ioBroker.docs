---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/010_enable_latest_repo.md
title: no title
hash: lAMR6OIzOl4yu03RNWCEzk5FvLWM8cijEBxWjmnLWIc=
---
## How do I get a beta version?
Sometimes you are asked to test a version that is not yet in the repository. This usually refers to the beta version of an adapter.

For a system that needs to run reliably, the beta repository is unsuitable.

The versions there are not yet fully tested, and reverting to a previous version requires manual effort.

### The better way: only a single adapter
Since Admin 5, it is **no longer** necessary to change the entire repository for this:

* Activate **Expert Mode**. The icon is located in the bottom left corner of the menu bar.
* In the **Adapters** tab, go to **Install from own source** (the symbol

(with the Octocat).

* In the **From npm** tab, select and install the desired adapter.

All other adapters will continue to come from *stable*.

### Convert the entire repository
If it is ever necessary: In [System settings](/docs/admin/settings.md), in the **Repositories** tab, switch to **beta** in the *Active* column.

<img src="media/faq_repositories.png" alt="The Repositories tab in the basic settings" width="900" />

Then, in the Adapter tab, reload the list. If beta is active, a warning will appear. This is intentional and serves as a reminder to revert back.

In detail: [What is a repository?](/docs/basics/repositories.md)