---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/030_install_adapter_from_github.md
title: no title
hash: eW17k7GychUSRd3Us4DFX5F8tr9WU8eJ8gEO7ezYYVE=
---
## How do I install an adapter from GitHub?

Only if a developer explicitly requests it. Anything on GitHub is a work in progress and may become unusable in the meantime. Dependencies are not affected by this type of installation. **not** checked.

- The **Expert mode** turn on.
- In the rider **adapter** on **Install from your own source** go.
- Into the rider **From GitHub** Switch and select the adapter.

<img src="media/faq_von_github.png" alt="Der Dialog Installieren aus eigener Quelle, Reiter Von GitHub" width="820" />

The rider **User-defined** accepts any address, such as a specific branch or the repository of another developer. **From file**
installs a locally available package.

### Back again

An adapter that came from GitHub will not be automatically replaced by the next update from the repository. Its version number is usually higher than the official one. You can go back via... _Install a specific version_ on the back of the adapter tile.