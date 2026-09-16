---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_050_advanced/030_install_adapter_from_github.md
title: no title
hash: eW17k7GychUSRd3Us4DFX5F8tr9WU8eJ8gEO7ezYYVE=
---
## How do I install an adapter from GitHub?

Only if a developer explicitly requests it. Anything on GitHub is a work in progress and may be unusable in the meantime. Dependencies are **not** checked with this type of installation.

- Turn on **expert mode** .
- In the **Adapter** tab, select **Install from local source** .
- Switch to the **From GitHub** tab and select the adapter.

<img src="media/faq_von_github.png" alt="Der Dialog Installieren aus eigener Quelle, Reiter Von GitHub" width="820" />

The **"Custom"** tab accepts any address, such as a specific branch or another developer's repository. "Install **from file"** installs a locally stored package.

### Back again

An adapter that came from GitHub will not be automatically replaced by the next update from the repository. Its version number is usually higher than the official one. You can revert to the previous version by selecting _"Install a specific version"_ on the back of the adapter tile.