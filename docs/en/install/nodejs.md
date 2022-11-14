---
title: Node.js and npm
lastChanged: 29.10.2022
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/nodejs.md
hash: sAI2l1MMLvhgR6/dOfnrhGREXZ03D0oGEqcHGFA3cJQ=
---
!> With the introduction of the installation script, a separate installation of Node.js and npm on standard Linux systems is no longer necessary! See [Installation on Linux](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker and adapters are mainly written in the JavaScript programming language and since a computer cannot execute JavaScript directly, it needs the Node.js runtime environment to do so.

?> We recommend installing ioBroker on Debian and Ubuntu based Linux distributions.

Node.js is installed here if needed with the following commands:

```curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

!> As of October 2022, version 16 of Node.js is recommended for ioBroker!

!> Odd Node.js versions may not be used.

Further information on installing Node.js for a wide variety of operating systems can be found here [Node.js Foundation](https://nodejs.org/en/download/package-manager/).