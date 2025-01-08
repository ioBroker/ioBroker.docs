---
title: ioBroker Installation Fixer
lastChanged: 13.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/install_fixer.md
hash: tHDEojwxIw6xJmU1S4wqOljPM1nQ4+ZV1CNRLe9Mxqc=
---
# Fix problems with user rights of the ioBroker installation
The installation fixer solves problems with the user rights of the ioBroker installation.
At the end of 2018 and especially in January 2019, @AlCalzone completely revised the ioBroker installer and in the current version from the beginning of February 2019, all rights problems are now a thing of the past. ioBroker no longer runs as "root" but under its own user who can do everything it needs to be able to do for the current ioBroker adapter.
So everything is fine for all new installations.

But what if someone installed ioBroker earlier? It is still running as root? Or in the first few days of the new installation routine? **Thanks to @AlCalzone we now have a solution for this too: the Installation Fixer**

Using a command, an existing installation in /opt/iobroker is brought up to the same level as a current new installation. The script can be used again and again in the future to update the installation in this regard.
Important: This script does not update nodejs, npm, js-controller or any adapter. Only the system rights, etc. are edited.
Try it and give feedback in [discussion thread](https://forum.iobroker.net/topic/20212/diskussion-zum-neuen-installation-fixer)

!> [Please note]: Application under Docker should not be necessary, as everything runs as root anyway, and we currently advise against using it due to a lack of clear experience and feedback. If someone wants to try it and give feedback: use it entirely at your own risk. Make sure you make a backup beforehand and know what you are doing!

Please note the FAQ post in this thread!

The script to be executed is, as with the installer, loaded from GitHub and is therefore always up to date. The command is:

```
curl -sL https://iobroker.net/fix.sh | bash -
```

## FAQ
**Do you have to use the fixer?** We recommend updating the installation and therefore using the fixer. This means you have an installation that we can also support if there are any problems. With npm 5 and higher there were more and more problems when working with root or sudo and the new installer and therefore the fixer for Linux-based systems take this into account and try to prevent these problems. And the security aspects should not be neglected either.

**Where can I see what the fixer does?** We try to keep the installer and fixer up to date.
Both also have a changelog.
[installer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md) [Fixer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md) Otherwise, look at the script directly if you know anything about shell programming :-)

**Which user is best to run the fixer as?** It doesn't really matter. It's best to run it as a normal user, then you can work with it afterwards.

**In which directory is it best to run the fixer?** It doesn't matter. The current fixer (2019-02-21) expects installation in /opt/iobroker

**Which operating systems does the fixer apply to?** All Linux-based systems. Windows is not covered here.

**What exactly does the fixer do?** The fixer creates an ioBroker user, sets file and directory permissions correctly for this user and also some sudo rights and everything that is needed to be able to work with ioBroker and npm without root.

**Can the fixer be run multiple times if there are updates?** Yes, and this is explicitly intended to ensure that the installer remains up to date as it is further developed.

**Are there special situations where the fixer should be run additionally?** The fixer also handles special permissions when redis and backitup are used. If Redis is already installed in the application, everything is automatically set correctly. If Redis is installed later, the fixer also sets everything correctly.

**Can the installation fixer also be used under Docker?** Currently, there is little experience and the results are very mixed. We therefore advise against using it at the moment, also because everything in the container usually runs as root and is therefore not relevant anyway. If you still like it and want to give feedback: use it in Docker at your own risk and NEVER without a backup and knowing what you are doing!

**What can I do if I'm not sure what's going wrong?** You can simply copy the ioBroker directory beforehand, but nothing will be changed except for the permissions.