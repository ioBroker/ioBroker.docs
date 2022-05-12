---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/install/centos.md
title: Installieren Sie auf CentOS
hash: NNHd5PMz5EEH2++Yd5IKcnE5qyP9RhewUgl2YZil5Co=
---
# Auf CentOS installieren
## Automatische Installation
Stellen Sie sicher, dass `curl` installiert ist oder installieren Sie es mit:

`sudo yum install -y curl`

Und dann das Installationsskript verwenden:

`curl -sL https://iobroker.net/install.sh | bash -`

Wenn die automatische Installation nicht funktioniert, können Sie immer noch die manuelle Installation verwenden.

## Manuelle Installation
### Node.js installieren
Falls nicht installiert:

```
sudo yum install -y gcc-c++ make build-essential
curl -sL https://rpm.nodesource.com/setup_10.x | sudo -E bash -
sudo yum install -y nodejs
```

### Installieren Sie ioBroker
```
sudo groupadd iobroker
sudo adduser -g iobroker iobroker
sudo usermod -G iobroker iobroker
sudo usermod -a -G redis iobroker
sudo usermod iobroker --shell /sbin/nologin
sudo mkdir /opt/iobroker
sudo chmod 777 /opt/iobroker
cd /opt/iobroker
npm i iobroker.admin --production
npm i iobroker.js-controller@stable --production
```

### Optional install redis
```
sudo yum install -y epel-release nano
sudo yum update
sudo yum install -y redis
sudo systemctl start redis
sudo systemctl enable redis
sudo nano /etc/redis.conf
```

#### Redis als Status-DB setzen
```
./iobroker setup custom
```

Ausgänge:

```
# Type of objects DB [(f)ile, (c)ouch, (r)edis], default [file]: <ENTER>
# Host / Unix Socket of objects DB(file), default[127.0.0.1]: <ENTER>
# Port of objects DB(file), default[9001]: <ENTER>
# Type of states DB [(f)file, (r)edis], default [file]: r   <============= This is important
# Host / Unix Socket of states DB (redis), default[127.0.0.1]: <ENTER>
# Port of states DB (redis), default[6379]: <ENTER>
# Data directory (file), default[../../../iobroker-data/]: <ENTER>
# Host name of this machine [ip-172-31-5-42.eu-west-1.compute.internal]: <ENTER>
# creating conf/iobroker.json
```

#### Optional nur für Redis+Multihost
Ändern Sie Bindung 127.0.0.1 in Bindung 0.0.0.0

```
sudo systemctl restart redis
```

### Benutzer zu "iobroker" ändern
```
cd /opt/iobroker/
sudo chmod 744 * -R
sudo chown iobroker:iobroker * -R
```

### Auto-Start
```
sudo nano /lib/systemd/system/iobroker.service
```

Kopieren Sie dies in die Datei:

```
[Unit]
Description=ioBroker Server
Documentation=https://iobroker.net
After=network.target redis.service
Wants=redis.service

[Service]
Type=simple
User=iobroker
ExecStart=/bin/sh -c '/usr/bin/node /opt/iobroker/node_modules/iobroker.js-controller/controller.js'
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

### Iobroker starten
```
sudo chown root:root /lib/systemd/system/iobroker.service
sudo chmod 755 /lib/systemd/system/iobroker.service
sudo systemctl daemon-reload
sudo systemctl enable iobroker
sudo systemctl start iobroker
```