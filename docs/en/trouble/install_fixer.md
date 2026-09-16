---
title: Installation Fixer
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/install_fixer.md
hash: fAsIY97hR/dMepl+Ti5isPDQvbCWizWYu1n9tStI3+M=
---
# Resolve permission issues

ioBroker runs under its own user named`iobroker` , not as`root` This user needs certain rights to the directory.`/opt/iobroker` , on npm and on some system services. If these are not correct, it manifests itself in errors that at first glance look like something completely different: adapters cannot be installed, files cannot be written, instances cannot be started.

The **fixer** restores these rights.

```bash
curl -sLf https://iobroker.net/fix.sh | bash -
```

The script is loaded from GitHub, just like the installation script, and is therefore always up to date.

## When he helps

- After an installation that included`sudo` or as`root` was carried out.
- If adapters fail to install and the log points to permissions issues (`EACCES` ,`permission denied` ).
- After **Redis** was subsequently installed, the fixer sets the permissions that ioBroker needs for access.
- After a relocation of the directory or a restoration in which the ownership has become confused.
- As a precaution, before asking for help in the forum: A system on which the fixer has been running is easier to support.

It can be run **as often as desired** . That's precisely what it's designed for: If the installation script is further developed, the fixer brings an existing installation up to the same level.

## What he does and what he doesn't do

**He does** : the user`iobroker` Create it if it is missing, and set the file and directory permissions under`/opt/iobroker` set up the necessary sudo rights and handle the special cases for Redis and BackItUp.

**It does not** update Node.js, npm, the js-controller, or any adapter. It only affects permissions and ownership. If you are looking for an update, you should see ["Installing Updates"](/docs/tutorial/updates.md) .

## Carry out

As **a normal user** , not as`root` and without`sudo` before that. The directory from which it is called is irrelevant; the fixer expects the installation in`/opt/iobroker` .

It applies to all Linux systems. It does not cover Windows.

**Do not apply this under Docker.** Everything runs as usual in the container anyway.`root` The permissions are understood differently there, and the fixer can do more harm than good. For problems with the Docker image, the best course of action is to consult its [own documentation](https://docs.buanet.de/de/iobroker-docker-image/) .

For those who are unsure: The fixer doesn't change the content, only the permissions. However, making a copy of the directory beforehand is always a good idea, and you should have a [backup](/docs/config/backup.md) anyway.

## What he changed

Both scripts maintain a change log:

- [Installation script](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_INSTALLER_LINUX.md)
- [Fixer](https://github.com/ioBroker/ioBroker/blob/master/CHANGELOG_FIXER_LINUX.md)

Anyone who can read shell scripts will check the script itself before executing it. This applies to every command that starts with`curl ... | bash` It ends, a good habit.