---
title: ioBroker Installation Fixer
lastChanged: 13.06.2019
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/install_fixer.md
hash: vuNKANk55QX5AJTCYrnPDujE/RNVWMlxzXnLfRIHcSI=
---
# Fix problems with user rights of the ioBroker installation
The Installation Fixer solves problems with the user rights of the ioBroker installation.
At the end of 2018 and especially in January 2019, @AlCalzone completely revised the ioBroker installer and thus all rights problems are a thing of the past in the current version from the beginning of February 2019. ioBroker no longer runs as "root" but under a separate user who is allowed to do everything he needs to be able to do for the current ioBroker adapter.
So everything is fine for all new installations.

But what if someone installed ioBroker earlier? He still runs as root? Or in the first days of the new installation routine? **Thanks to @AlCalzone we now have a solution for that as well: the Installation Fixer**

Using a command, an existing installation in /opt/iobroker is brought up to the same level as a current new installation. The script can also be used again and again in the future to update the installation in this regard.
Important: This script does not update nodejs, npm, js-controller or any adapter. Only the system rights etc. are edited.
Try it and give feedback in [discussion thread](https://forum.iobroker.net/topic/20212/diskussion-zum-neuen-installation-fixer)

!> [Please note]: Application under Docker should not be necessary because everything runs as root anyway and we currently advise against an application due to a lack of clear experience and feedback. If anyone wants to try it and give feedback: Use entirely at your own risk. Be sure to make a backup beforehand and know what you're doing!

Please note the FAQ post in this thread!

As with the installer, the script to be executed is loaded from GitHub and is therefore always up to date. The command is:

```
curl -sL https://iobroker.net/fix.sh | bash -
```

##FAQ
**Do you have to use the fixer?** We recommend updating the installation and therefore using the fixer. This gives you an installation that we can also support if there are problems. With npm 5 and higher there were more and more problems when working with root or sudo and the new installer and thus the fixer for Linux-based systems take this into account and try to prevent these problems. And the safety aspects should not be neglected either.

**Where can I see what the fixer is doing?** We try to keep the installer and fixer up to date.
Both also have a changelog.
[installers](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md) [fixer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md) Otherwise watch the script directly if you know something about shell programming :-)

**What is the best user to run the fixer as?** It doesn't really matter. It is best to run it as a normal user, then you can work with it afterwards.

**What's the best directory to run the fixer in?** It doesn't matter either. The current fixer (2019-02-21) expects to be installed in /opt/iobroker

**For which operating systems does the fixer apply?** For all Linux-based systems. Windows is not covered here.

**What exactly does the fixer do?** The fixer creates an ioBroker user, sets file and directory rights correctly for this user and also some sudo rights and everything that is needed to work with ioBroker and npm without root.

**Can the fixer be run multiple times if there are updates?** Yes, and this is explicitly intended to keep the installer up-to-date as the installer evolves.

**Are there special situations where the fixer should be run additionally?** The fixer also handles special privileges when using redis and backitup. If Redis is already installed in the application, everything is automatically set correctly. If Redis is installed later, the fixer sets everything correctly.

**Can the installation fixer also be used under Docker?** There is currently little experience and the results are very mixed. We therefore currently advise against using it, also because everything in the container usually runs as root and is therefore irrelevant anyway. If you still like it and want to give feedback: use Docker at your own risk and NEVER without a backup and knowledge of what you are doing!

**What can I do if I'm not sure what's going wrong?** You can simply copy the ioBroker directory beforehand, and nothing will be changed except for permissions.