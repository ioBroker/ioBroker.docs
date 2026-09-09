---
title: docker
lastChanged: 07.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/install/docker.md
hash: dvLoyXchMmciXWojy9MlJ0SHMM9lhV6lLumBwq7hFdc=
---
# ioBroker under Docker

Docker puts ioBroker into a container: a self-contained package with everything it needs. The host system remains clean, and the container can be replaced without losing the configuration.

The image is from **buanet** maintained, not by the ioBroker project itself. It is the only one supported in the forum, and its
[official documentation](https://docs.buanet.de/de/iobroker-docker-image/) is more detailed than this page - it contains everything about environment variables, time zone, rights and the intricacies of the individual adapters.

Docker is worthwhile if you already have a Docker host or a NAS. For your first ioBroker setup on your own device, the
[Installation under Linux](/docs/install/linux.md)
the shorter path - one less level that gets in the way in case of an error.

## Requirements

Before installation, check if the system
[Requirements](/docs/install/requirements.md)
Fulfilled. The same values apply to the container as to a normal installation, plus what the host system itself requires.

## The fastest way

```bash
docker run -p 8081:8081 --name iobroker \
  -v iobrokerdata:/opt/iobroker \
  buanet/iobroker:latest
```

After that, the surface is under `http://<adresse-des-hosts>:8081` reachable.

## Using docker compose

For continuous operation, a Compose file is the better choice because the settings are stored in one place and can be easily reviewed:

```yaml
services:
  iobroker:
    image: buanet/iobroker:latest-v11
    container_name: iobroker
    restart: always
    ports:
      - "8081:8081"
    volumes:
      - iobrokerdata:/opt/iobroker

volumes:
  iobrokerdata:
```

## The three sticking points

### The volume is the installation

Everything that makes ioBroker what it is – configuration, adapters, database, scripts – lies under `/opt/iobroker`Without a volume at this location, everything will be lost the next time the container is replaced.

A container is not a storage location. The container is replaced, the volume remains – that's the whole point. Anyone who forgets the volume will notice it during the first update.

### A fixed day instead `latest`

`latest` It always points to the latest version, even across version jumps. Next `docker pull` This means a major version can be advanced without anyone having decided to do so. For a system that is intended to run, a tag with a major version or a fixed version is the right choice. The buanet documentation explicitly recommends this. The major version of the image in September 2026 was 11, and the tag is named accordingly. `latest-v11`.

### The network

In normal bridge mode, the container only sees the home network via forwarded ports. This is sufficient for most adapters. **Not** This is sufficient where devices are searched for on the network – anything that uses broadcast or multicast: Philips Hue, Sonos, Chromecast, the device search in the admin panel. Such adapters require host mode or a MACVLAN network.

Similarly, any connected hardware – a Zigbee stick, a CUL – must be explicitly passed through to the container.

## Secure

The backup system is working as usual: `iob backup` The file is stored in the container, and the resulting file resides in the volume. Anyone who backs up the volume has everything. The adapter is also a worthwhile addition. _backitup_, who can plan the security measures and remove them from the house.

## Read more

- [Official documentation of the image](https://docs.buanet.de/de/iobroker-docker-image/)
- [Requirements](/docs/install/requirements.md)
- [Update](/docs/install/update.md)