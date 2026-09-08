## Welche Node.js-Version brauche ich?

ioBroker läuft auf Node.js. Empfohlen ist die LTS-Version **Node.js 22**.

!> **Ungerade Versionsnummern dürfen nicht verwendet werden** (21, 23, 25 …).
Das sind Entwicklungszweige ohne Langzeitunterstützung.

Unter Debian, Ubuntu und Raspberry Pi OS erledigt das Installationsskript von
ioBroker Node.js gleich mit. Wer es von Hand macht:

```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Prüfen lässt sich die installierte Version mit:

```bash
node -v
npm -v
```

Beide müssen zusammenpassen. Wenn `nodeCurrent`, `nodeNewest` und
`nodeNewestNext` im Reiter Hosts auseinanderlaufen, steht ein Update an.

Einzelheiten: [Node.js installieren](https://www.iobroker.net/#de/documentation/install/nodejs.md)
