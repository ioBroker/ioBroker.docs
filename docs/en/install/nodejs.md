---
title: Node.js and npm
lastChanged: 11.08.2023
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/nodejs.md
hash: +/clKGI6Nn2MdnSbbF4O7f+FeueoHcyUaLSIcalX/Gs=
---
!> With the introduction of the installation script, a separate installation of Node.js and npm on standard Linux systems is no longer necessary! See [Installation under Linux](https://www.iobroker.net/#de/documentation/install/linux.md)

ioBroker and adapters are primarily written in the JavaScript programming language, and since a computer cannot execute JavaScript directly, it requires the Node.js runtime environment.

?> We recommend installing ioBroker on Debian and Ubuntu based Linux distributions.

Node.js is installed here if required with the following commands:

```curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

!> As of March 2023, version 18 of Node.js is recommended for ioBroker!

!> Odd Node.js versions must not be used.

Further information on installing Node.js for different operating systems can be found here [Node.js Foundation](https://nodejs.org/en/download/package-manager/).