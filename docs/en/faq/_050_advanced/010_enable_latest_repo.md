---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/010_enable_latest_repo.md
title: no title
hash: lAMR6OIzOl4yu03RNWCEzk5FvLWM8cijEBxWjmnLWIc=
---
## How do I get a beta version?

Sometimes you are asked to test a version that is not yet in the repository. This usually refers to the beta version of an adapter.

For a system that needs to run reliably, the beta repository is unsuitable. The versions there are not yet fully tested, and reverting to a previous version requires manual effort.

### The better way: use only a single adapter

Since Admin 5, this is required **not** The entire repository will be converted:

- The **Expert mode** Turn it on. The icon in the bottom left of the menu bar.
- In the rider **adapter** on **Install from your own source** go (the symbol with the Octocat).
- In the rider **From npm** Select and install the desired adapter.

All other adapters still come from _stable_.

### Change the entire repository

If it ever becomes necessary: In the
[System settings](/docs/admin/settings.md)
in the rider **Repositories** in the column _Active_ on **beta** switch.

<img src="media/faq_repositories.png" alt="Der Reiter Repositories in den Basiseinstellungen" width="900" />

Then, in the Adapter tab, reload the list. If beta is active, a warning will appear. This is intentional and serves as a reminder to revert back.

Detailed: [What is a repository?](/docs/basics/repositories.md)