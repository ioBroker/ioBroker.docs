---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_installation/010_nodejs.md
title: no title
hash: g+0DZtij/7h1Qps5LH6Sx/RQsFAUj+1Ay+oTcYuTb7U=
---
## Which Node.js version do I need?

ioBroker runs on Node.js. The LTS version is recommended. **Node.js 22**.

!> **Odd version numbers must not be used.** (21, 23, 25 …). These are development sectors without long-term support.

On Debian, Ubuntu, and Raspberry Pi OS, the ioBroker installation script automatically installs Node.js. For manual installation:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

The installed version can be checked with:

```bash
node -v
npm -v
```

They both need to be compatible. `nodeCurrent`, `nodeNewest` and
`nodeNewestNext` If the Hosts tab shows discrepancies, an update is needed.

Details: [Install Node.js](/docs/install/nodejs.md)