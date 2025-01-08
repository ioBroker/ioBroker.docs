---
title: What is a repository?
lastChanged: 23.11.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/repositories.md
hash: IzW9bZryoELmq+VV6xs1s9c+RUIKf/FwJo2BN75kEvg=
---
A repository is a central storage location for software programs.

The adapters, which can be displayed and installed/updated via the ioBroker admin interface, are managed via a central storage location (a repository).
By default, after an installation, ioBroker is configured to access the "stable" repository and offer the adapters stored there for installation.

There are two repositories available in ioBroker:

- **stable**: In this repository, the adapters are available in the version that has already been tested and can therefore be used on a productive system
- **beta**: This repository contains the adapter versions that are currently in the test phase (!) and may still contain several errors. The beta repository was previously called latest, but since the purpose was not really clear from the name, it was renamed from latest to beta.

?> Basically, the stable repository should ***ALWAYS*** be used for a productive installation of ioBroker. The beta repository contains versions that still contain errors and may affect the entire system.

## Repository selection
In the system settings, use the wrench to open the basic settings:

![](../../de/basics/media/Repository_IconBasicSettings.png)

![](../../de/basics/media/Repository_BasicsSettingsDefaultPath.png)

(1) In the Repositories tab, the desired repository can be selected by activating the corresponding checkbox in the "Active" column.

(2) The button resets the paths to the standard repositories stable and beta to the standard paths. Attention: This button also deletes the manually added repositories

(3) In the "Stable" column, the checkbox is automatically activated if the repository was recognized as a "stable" repository after the first read

The default paths of the stable and beta repositories are:

- stable - Link to the repository http://download.iobroker.net/sources-dist.json
- beta - Link to repository http://download.iobroker.net/sources-dist-latest.json

If the beta repository has been selected, a corresponding warning appears in the adapter overview:

![](../../de/basics/media/Repository_AdapterRepInfo.png)

## What should I do if I need an adapter from the beta repository?
In the past, this meant changing the repository in ioBroker from stable to beta, installing one adapter and then changing back again. The latter was usually left behind.

Since Admin 5, this has become much more convenient WITHOUT having to change the repository!

- Activate the expert mode
- In the "Adapter" menu, click on the "Install from own URL" (GitHub) button and switch to the first tab "From NPM"
- In the "Select adapter" field you can now enter / select the adapter you want to install

This way you can install the latest beta version without having to change your repository.

![](../../de/basics/media/Repository_AdapterInstallNpm.png)

Important note: Only install an adapter from Github if you are explicitly asked to do so by the developer (e.g. as part of alpha tests, bug fixing, etc.). Adapter versions that are installed directly from Github are under development and may therefore not be functional in the meantime.

## How does an adapter get into the beta or stable repository?
Long before an adapter is available for installation in ioBroker via the admin interface, a developer submits a request for inclusion in the repository. Once this has happened, experienced developers look at the new adapter source code and give the requesting developer feedback on the points that need to be addressed before the new adapter can be included in the repository.

A new adapter is first available in the beta repository and can then be extensively tested by the (beta) testers. Once the testing phase is completed and the reported bugs have been fixed, the version of the adapter is made available in the stable repository.

After a functional change to the adapter, it is normally only made available for testing in the beta repository until the version is released for the stable repository after the test phase has been completed.