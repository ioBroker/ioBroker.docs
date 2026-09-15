---
title: Restore
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/restore.md
hash: 78zr7S56B2Whg5zN+7hWJNlmh03BXAyuzO3xD+Xr5Xs=
---
# Restore an installation

After a hardware change, a faulty memory card, or a failed update, the installation is restored from a backup. This sounds more complicated than it is: if done correctly, the process takes less than an hour, and in the end, the system is back to where it was.

This page describes the complete process for setting up a **newly configured** system. For minor issues, such as an accidentally deleted item, there are faster methods: [Restore configuration](/docs/trouble/restore.md) .

## What's included in the fuse and what isn't

**An ioBroker backup does not include the recorded measurements.** It backs up objects, states, configurations, scripts, and visualizations. The data from`history` InfluxDB and SQL are **separate** backup types in BackItUp and must be enabled there separately. The same applies to the Zigbee database and Redis. See [Data Backup](/docs/config/backup.md) for details.

Anyone who only notices this during the restoration process will realize it too late.

## Preparation

**1. Set up a working system.** Install the operating system, then ioBroker according to the [instructions for Linux](/docs/install/linux.md) . Restoring the system requires a working, empty installation.

**2. Find out if Redis is needed.** If there is still access to the old system, give

```bash
iobroker status
```

the information:

```
Objects type: redis
States  type: redis
```

It says there next to one of the two`redis` A Redis server must be running on the new system **beforehand** . This is stated for both.`file` or`jsonl` It's not needed. If in doubt, i.e., without access to the old system, it's better to install Redis.

**3. Install Redis** , if necessary:

```bash
sudo apt update
sudo apt install redis-server
sudo usermod -a -G redis iobroker
sudo reboot
```

**4. Transfer the backup to the new system.** Use an SFTP program like FileZilla or WinSCP to copy it to the folder.`/opt/iobroker/backups` The installation already creates it.

BackItUp can also restore directly from NAS, Dropbox, or Google Drive. However, restoring from a local file is the method with the fewest potential errors and is therefore the one described in this guide.

## Option 1: with BackItUp

The more convenient way, without using a single console command.

**1. Install BackItUp.** In the _Adapter_ tab, look for`backitup` Search and create an instance using the plus sign.

**2. Open the Restore tab** and set the backup source to **Local** , then save.

![The Restore tab in BackItUp](../../de/tutorial/media/restore/1575301096581-restoretab.jpg)

The setting **"Start all adapters after restore"** remains disabled if the backup is being performed on a **different** host. Before starting the backup, IP addresses usually need to be adjusted on that host. It can be enabled on the same device.

**3. Retrieve backups.** The file you just uploaded will appear in the list under _iobroker_ . Select it.

![The list of found fuses](../../de/tutorial/media/restore/1575301146928-restoreliste.jpg)

**4. Confirm.** The message states that ioBroker will be stopped for recovery and then restarted.

![The question before the start](../../de/tutorial/media/restore/1575301175231-restorestart.jpg)

**5. Watch.** Another tab opens in the browser, where the process runs as if on the console.

![The recovery process is underway.](../../de/tutorial/media/restore/restoreWebUI.JPG)

The story ends with a success story.

![The restoration is complete.](../../de/tutorial/media/restore/restoreWebUI_finish.JPG)

Depending on the device and the size of the installation, this takes about 10 to 15 minutes, after which ioBroker restarts automatically.

**6. The remaining backups.** If Redis, Zigbee, SQL, or history data were also backed up, they will now be restored individually using the same method. They appear as separate entries in the list:

![All backup types in the list](../../de/tutorial/media/restore/1575362131512-fullliste.jpg)

## Method 2: via the console

Those who want to see what's happening right now take the direct route.

```bash
iobroker stop
iobroker status
```

Only when`iobroker status` confirms that nothing is working anymore:

```bash
cd /opt/iobroker
iobroker restore <Name der Sicherung>
iobroker start
```

Lists without names`iobroker restore` The existing fuses can be selected by number.

**Only ioBroker backups** can be restored this way. Redis, Zigbee, MySQL, or history backups come from BackItUp and can only be restored there.

## After the restoration

The _Log_ tab shows how ioBroker reinstalls all adapters from the old installation one after the other via npm. This is the time-consuming part: depending on the size of the installation, the device's performance, and the internet connection, it can take two to three hours.

Do not **touch anything during this time.** Do not restart, do not intervene. You can track what has already finished in the instances: Adapters without a symbol are still in the queue. Refreshing the view occasionally is sufficient.

If ioBroker does not start automatically after restoration in exceptional cases:

```bash
iobroker start
```

Once all instances have their icon, the system is complete again: with all settings, scripts, visualizations, and mappings.

## Which way

Both methods lead to the same result. Those who are uncomfortable using the console should choose BackItUp and are less likely to make mistakes. Those who want to see exactly what is happening on the system should take the second method.

And after that, even before making your first change: create a fresh backup and check that it ends up in a different location than on the device itself.