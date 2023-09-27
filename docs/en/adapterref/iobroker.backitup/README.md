---
BADGE-Number of Installations: http://iobroker.live/badges/backitup-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.backitup.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.backitup.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.backitup/badge.svg
BADGE-License: https://img.shields.io/github/license/simatec/ioBroker.backitup?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
---
![Logo](https://github.com/simatec/ioBroker.backitup/blob/master/docs/en/img/backitup.png)

![Number of Installations](http://iobroker.live/badges/backitup-installed.svg)
![Number of Installations](http://iobroker.live/badges/backitup-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.backitup.svg)](https://www.npmjs.com/package/iobroker.backitup)
[![Downloads](https://img.shields.io/npm/dm/iobroker.backitup.svg)](https://www.npmjs.com/package/iobroker.backitup)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.backitup/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.backitup)
![Test and Release](https://github.com/simatec/ioBroker.backitup/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.backitup?style=flat)](https://github.com/simatec/ioBroker.backitup/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)


**If you like ioBroker.backitup, please consider making a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)


**************************************************************************************************************

## Disclaimer
**ioBroker.backitup is backup plugin only for the smart home software ioBroker.**<br>
**Is it not affiliated with or endorsed by [Nero BackItUp](https://www.nero.com/deu/products/nero-backitup/?vlang=en) (a Tool backup under Windows-Systems).**

**This personal project ioBroker.backitup is maintained in spare time and has no business goal.**

**************************************************************************************************************

# Basics
ioBroker.backitup is a backup solution with which the cyclical backup of an ioBroker installation and a Homematic CCU is possible.

The adapter is suitable for multi-platforms and can be used on Windows and Mac installations in addition to Linux installations.

Furthermore, there is the possibility to save various optional backups such as SQL databases, Influx databases and some adapter and device settings.

ioBroker.backitup works very closely with the js-controller and creates an ioBroker backup identical to the CLI command `iobroker backup`.

All states and objects as well as the user files such as VIS are backed up here identically to the standard backup of the js-controller.

Additionally ioBroker.backitup backs up other options like InfluxDB, Grafana and Redis.
All available options can be found here in the documentation.

With the CLI command `iob backup` only the pure ioBroker backup is currently executed.


The restore is also completely identical to the CLI command `iobroker restore <backupname>` of the js-controller.

With a restore, all states, objects and user data are restored by Backup.
After the restore, your iobroker restarts and from there the js-controller takes over the installation of missing adapters again.

ioBroker.backitup has no effect whatsoever on the recovery after the ioBroker has started. This all happens in the background and the js-controller takes over based on the restored information in the States and Objects.

_[Back to top](#top)_

---

# Dependencies
* For the CIFS mount cifs-utils must be installed.
     - `sudo apt install cifs-utils`

* Nfs-common must be installed for the NFS mount.
     - `sudo apt install nfs-common`

* To use the mysql backup from mysql systems, mysqldump must be installed on the system.
    - `sudo apt install mysql-client` or under Debian `sudo apt install default-mysql-client`.

* For using the MySql backup of MariaDB systems mysqldump must be installed on the system
    - `sudo apt install mariadb-client`

* To use the sqlite3 backup, sqlite3 must be installed on the system.
    - `sudo apt install sqlite3`

* To use the PostgreSQL backup, mysqldump must be installed on the system
     - [Installation instructions PostgreSQL](https://www.postgresql.org/download/linux/debian/)

* Influxd must be installed to use the InfluxDB backup
     - [Installation instructions InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1.8/introduction/install/)
     - [Installation instructions InfluxDB 2.x](https://docs.influxdata.com/influxdb/v2.1/install/)
     - [Installation instructions Influx-CLI für 2.x](https://docs.influxdata.com/influxdb/v2.1/tools/influx-cli/?t=Linux)

_[Back to top](#top)_

---

# Use and operation
ioBroker.backitup can be configured in the adapter instances. All of the following setting options are available there.<br><br>
A tab is available in the admin tab for the daily work and operation of ioBroker.backitup.<br>
If this tab is active in the tab menu of the admin interface, ioBroker.backitup can be operated directly via the tab in the left tab bar of the iobroker.<br><br>
Information on the backups made is available there, backups can be made and the backup can be restored.

![adminTab](https://github.com/simatec/ioBroker.backitup/blob/master/docs/en/img/adminTab.png)
![adminTabRestore](https://github.com/simatec/ioBroker.backitup/blob/master/docs/en/img/adminTabRestore.png)
![adminTabInfo](https://github.com/simatec/ioBroker.backitup/blob/master/docs/en/img/adminTabInfo.png)

_[Back to top](#top)_

---

# Backup types
ioBroker.backitup offers a lot of possibilities to carry out different backup types cyclically or at the push of a button. By default, every backup is stored in the /opt/iobroker/backups/ directory. Optionally, an FTP upload can be set up or, alternatively, a CIFS / NFS mount can be used.

## ioBroker backup
This backup corresponds to the backup contained in ioBroker which can be started in the console by calling `iobroker backup`. Only here it is carried out through the specified settings in the adapter configuration or the OneClick Backup widget without having to use the console.

## CCU backup (Homematic)
This backup offers the possibility to save 3 different variants of a Homematic installation (CCU-Original / pivCCU / Raspberrymatic). This backup can also be performed using the settings specified in the adapter configuration or the OneClick backup widget.<br> <br>
If you don't want to secure just one CCU, you can activate the "Securing multiple systems" option and then define your Homematic central units in the table.

## Mysql backup
If activated, this separately adjustable backup is created with every ioBroker backup and is also deleted after the specified retention time has expired. FTP or CIFS are also valid for this backup if the other ioBroker backup types are set.<br><br>
It is important that even if the mysql server is running on a remote system, the mysqldump must run on the ioBroker system. <br> For Linux systems, the installation command would be as follows: `sudo apt install mysql-client` or under Debian `sudo apt install default-mysql-client` or for MariaDB-Systems `sudo apt install mariadb-client`.<br> <br>
If you don't want to back up just one database, you can activate the "Back up multiple systems" option and then define your databases in the table.

## Sqlite3 backup
If it is activated, this separately adjustable backup is created with every backup ioBroker and also deleted after the specified retention time has expired. FTP or CIFS are also valid for this backup if set for the other ioBroker backup types.<br><br>
Sqlite3 (`sudo apt install msqlite3`) must be installed on the host system.

## Redis backup
If activated, this separately adjustable backup is created with every ioBroker backup and deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup provided the other ioBroker backup types are set. <br>
To use Redis with ioBroker.backitup, the rights for the iobroker user should be adjusted: <br>
```
sudo usermod -a -G redis iobroker
sudo reboot
```

For a remote backup, redis-cli is required on the local ioBroker system.

`sudo apt install redis-tools`


Here you have to enter your host and port of the remote Redis server and the login data of your system.

This is an important feature, especially for Docker users.

Please note that a Redis restore for remote systems is not possible via the backup GUI.Redis does not support this.
Here the dump.rdb contained in the tar.gz archive must be restored manually. To do this, the backup archive must be unpacked, the file copied to the Redis directory and the rights for the dump.rdb adjusted.

Here's an example:
```
sudo tar -xvzf <backup file>.tar.gz /var/lib/redis/
sudo chown redis:redis /var/lib/redis/dump.rdb
redis-cli shutdown nosave
```

## History data backup
If activated, this separately adjustable backup is created with every ioBroker backup and deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup, provided that the other ioBroker backup types are set.

## InfluxDB backup
If activated, this separately adjustable backup is created with every ioBroker backup and deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup if the other ioBroker backup types are set.<br><br>
**Requirements for a remote backup with InfluxDB v1.x:**

Some adjustments are necessary for the remote backup under InfluxDB 1.x.

**To be able to perform an InfluxDB backup, Influxd must be installed on the iobroker system.** <br>
**It does not matter whether the database is managed locally or on another server.**<br><br>
If the InfluxDB is to be backed up from a remote server, the remote rights for the RPC service must be adjusted in influxdb.conf on the remote server.

``
bind-address = "<InfluxDB-IP>: 8088"
``
or
``
bind-address = "0.0.0.0:8088"
``

**After changing the configuration, the InfluxDB service must be restarted.**

Further information on the data backup of the InfluxDB can be found [here] (https://docs.influxdata.com/influxdb/v1.8/administration/backup_and_restore/#online-backup-and-restore-for-influxdb-oss).<br> <br>

**Requirements for a backup with InfluxDB v2.x:**

In order to be able to create a backup of an InfluxDB 2.x, Influx-CLI must be installed on your system.
This is required for both a local and remote backup.

For a remote backup, Influx-CLI must be installed on the system on which your ioBroker is also running.
On the remote system where your database is working, installation for backup is not required.

Here you will find the official instructions on how to install Influx-CLI on your system.

[Installation guide Influx-CLI for 2.x](https://docs.influxdata.com/influxdb/v2.1/tools/influx-cli/?t=Linux)<br><br>

If you don't just want to back up one database, you can activate the "Backup of multiple systems" option and then define your databases in the table.<br>

## PostgreSQL backup
If activated, this separately adjustable backup is created with every ioBroker backup and deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup if the other ioBroker backup types are set.<br><br>
What is important here is that even if the PostgreSQL server is running on a remote system, PostgreSQL must run on the ioBroker system / debian /) an installation guide.<br> <br>
If you don't want to back up just one database, you can activate the "Back up multiple systems" option and then define your databases in the table.

## Javascript backup
If activated, this separately adjustable backup is created with every ioBroker backup and is also deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup if the other ioBroker backup types are set.<br><br>
As of ioBroker.backitup version 2.2.0, scripts are saved directly from the objects. Javascript backups from older backup versions are not compatible for a restore!!<br><br>
In order to be able to carry out JavaScript backups with ioBroker.backitup versions <2.2.0, the menu items "Mirroring scripts in the file path" and "Instance that makes the mirroring" must be specified in advance in the Javascript adapter configuration.<br>
ioBroker.backitup can then take over the settings in the configuration menu.

## Jarvis backup
If activated, this separately adjustable backup is created with every ioBroker backup and deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup if the other ioBroker backup types are set.<br><br>

## Zigbee backup
If activated, this separately adjustable backup is created with every ioBroker backup and deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup, provided that the other ioBroker backup types are set.

## Zigbee2MQTT backup
This backup, which can be set separately, is created with every backup ioBroker if it is activated and is also deleted after the specified retention time has expired. FTP or CIFS are also valid for this backup if set for the other IoBroker backup types.

The path in the ioBroker.backitup adapter should always be created directly to the `data` path of zigbee2mqtt.
Example: `/opt/zigbee2mqtt/data` or directly into the volume of a Docker installation of zigbee2mqtt.

It is also important here that the user "iobroker" gets permissions to the data folder to be able to read and write the files.

Group permissions can be set as follows:

```
sudo usermod -a -G <zigbe2mqtt User> iobroker
sudo reboot
```

## Node-Red-Backup
This backup, which can be set separately, is created with every backup ioBroker if it is activated and is also deleted after the specified retention time has expired. FTP or CIFS are also valid for this backup if set for the other ioBroker backup types.

## Grafana backup
If activated, this separately adjustable backup is created with every ioBroker backup and deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup if the other IoBroker backup types are set.<br><br>
**In order to be able to create a Grafana backup, the Grafana username (Admin) and password are required.**<br><br>
**Furthermore, an API key or service token must be created in the Grafana web interface to get access to the dashboards.** <br>
The API key can be created under ***"Configuration → API Keys or Service Token"*** and must have full admin permissions.

## Yahka backup
If activated, this separately adjustable backup is created with every ioBroker backup and is also deleted after the specified retention period has expired. FTP or CIFS are also valid for this backup if the other ioBroker backup types are set. <br> <br>
All system settings and device settings from Homekit are saved.

_[Back to top](#top)_

---

# Storage options

## Local
The default location for backups in ioBroker is `/opt/iobroker/backups`.
This is set by the system and cannot be changed.
If none of the CIFS or NFS mounts listed below are active, all backups will end up in the default path and will be local to the host system.

Additional storage options such as a cloud or FTP will only create a copy of the backup to the selected location outside the host system.

## CIFS
CIFS mount is no problem under Linux.<br>
It should be noted that cifs-utils is installed.

The path specification should look like this (example: "/share name/path specification")<br>
You can optionally activate / deactivate whether the backups should be deleted from the NAS

## NFS
NFS mount is no problem under Linux.<br>
It should be noted that nfs-common is installed.<br><br>
The path specification should look like this (example: "/share name/path specification").<br>
You can optionally activate / deactivate whether the backups should be deleted from the NAS

## FTP
FTP is possible on all OS and serves as an alternative to the CIFS Mount.<br>
The path specification under FTP must always begin with "/" (example: "/path specification")<br>
You can optionally activate / deactivate whether the backups should be deleted from the NAS
  
## Copy
If a CIFS mount is not possible, there is another possibility of the copy function.<br>
Here in the CIFS settings the path must be entered where the copy is to be made.<br>
The specification of the IP address must remain empty for the copy function.
  
## Dropbox
In order to use the backup in Dropbox, you have to get an access token. This can be done on the ioBroker.backitup configuration page.<br>
ioBroker only accesses the defined areas. No tokens or user data are stored in the cloud.

If you want to create your own Dropbox API app, you can select this in the ioBroker.backitup settings and then have to carry out the following steps.
 
> Note: Own apps only have a "short_live" token, which is only valid for 4 hours. We recommend using the ioBroker standard app.
 
To use the backup in Dropbox, an access token and an APP must be created at https://www.dropbox.com/developers/apps<br><br>
* Step 1: Use the "Create App" button
* Step 2: Select "Scoped access".
* Step 3: Select "App folder".
* Step 4: Enter "Name your app" and select "Create App" button
* Step 5: In the "Permissions" tab, check all 4 boxes in the "Files and folders" area
* Step 6: In the "Settings" tab, set the "Access token expiration" to "No expiration".
* Step 7: Press "Generated access token" button (This generated token is entered in the settings of ioBroker.backitup)

In your Dropbox there is now a new folder called "Apps".
  
## Google Drive
In order to use the backup in the Google Drive, you have to get an Access token. You can do that on the configuration page.<br>
ioBroker only accesses the defined areas. The code for oAuth can be viewed [here](https://github.com/simatec/ioBroker.backitup/blob/master/docs/oAuthService.js).<br><br>
No tokens or user data are stored in the cloud.

## Onedrive
In order to use the backup in the Onedrive, you have to get an access token. This can be done on the configuration page of ioBroker.backitup.<br>
ioBroker only accesses the defined areas. No tokens or user data are stored in the cloud.

## WebDAV
With WebDAV, ioBroker.backitup offers the possibility to address several cloud systems. The best known is NextCloud.
To establish a WebDAV connection, the username and password of the cloud account are required.<br>
The connection to the cloud is made via an encrypted connection.<br><br>
In order to be able to establish a connection, the host name of the cloud must meet all security certificates.
> Example URL: "https://example.com/remote.php/dav/files/username/"<br><br>
A connection with a local IP address is only possible if the option "Only allow signed certificates" is deactivated.

### [back](#Content)<!-- omit in toc -->
---

# Delete old backups
ioBroker.backitup can delete older backups automatically. The number of backups to be kept can be defined in the configuration of ioBroker.backitup.
Deletion of older backups only occurs when the adapter performs an automatic scheduled backup.

In case of manual backups, older backup files are not deleted.

If an error occurs during the backup process, older backups will also not be deleted for security reasons. 

Which backups were deleted and possible errors during deletion are output in Debuglog.

### [back](#Content)<!-- omit in toc -->
---


# Multihost support
Multihost for ioBroker.backitup can work with multiple instances of ioBroker.backitup on different hosts.<br>
An instance of ioBroker.backitup must be configured as a master to support it. All other instances on remote hosts are configured as slaves.<br><br>
The master takes over the management of the automatic backups. All slave instances can be selected in the master via the menu.<br>
The following backup options can be activated for the slave instances:<br>
* Redis
* Zigbee
* Jarvis
* History
* InfluxDB
* MySql
* Sqlite3
* PostgreSql
* Grafana
* Yahka
* Node-Red
* Zigbee2MQTT

Since the automatic backups are controlled by the master in a slave instance, iobroker backups, Javascript backups and CCU backups cannot be selected.<br><br>
The storage locations for the individual backups can be freely configured on each slave. So everyone can design their file storage system independently of the master.<br><br>

In systems with limited RAM, the backup master can automatically start the slave instances for the backup process and then stop them again.<br>
This option can be configured in the menu.

_[Back to top](#top)_

---

# Docker support
As of version 2.2.0, backup and restore are supported in the official Docker container.

Since no database systems should be installed in the Docker container, backups of all databases are not supported and cannot be selected in a recognised Docker container by default. To be able to back up external databases anyway, two container environment variables must be set:
* IOB_BACKITUP_EXTDB=true
* PACKAGES

The content of the environment variable "PACKAGES" is based on the packages to be installed, which are necessary for access to the respective database. Examples would be "mysql-client" or "redis-tools". Further details can be found [here](https://docs.buanet.de/iobroker-docker-image/docs_backitup/).

_[Back to top](#top)_

---

# Use
1. The adapter creates some data points for use in Vis<br>
    * oneClick.ccu -> serves as a trigger for a CCU backup (can be set to true in Vis using a button)
    * oneClick.iobroker -> serves as a trigger for a standard backup (can be set to true in Vis with a button)<br><br>
    * history.html -> serves as a history log which can be adapted from the design in Vis via CCS.
    * history.json -> serves as a history log which can be adapted from the design in Vis via CCS.
    * history.ccuLastTime -> saves the creation date and time of the last CCU backup
    * history.minimalLastTime -> saves the creation date and time of the last standard backup
    * history.ccuSuccess -> shows the state "true" if the backup is successful
    * history.minimalSuccess -> shows the state "true" if the backup is successful
    * history.iobrokerLastTime -> shows the last ioBroker backup
    * history.ccuLastTime -> shows the last CCU backup
    * info.ccuNextTime -> shows the next execution time of the CCU backup
    * info.iobrokerNextTime -> shows the next execution time of the ioBroker backup
    * info.latestBackup -> shows as json the last backup determined at the start

2. Show history log in Vis
   - It is possible to display the history log e.g. in an HTML widget by entering the following line in HTML:
```
{backitup.0.history.html}
```
Syntax: {BackitupInstance.history.html}

3. CCS formatting of the history log
```
   .html{
       display:block;
       width:100%;
   /*    overflow-y:scroll; */
   }
   .backup-type-iobroker
       {
           float:left;
           color:white;
           font-size:20px;
       }
   .backup-type-ccu
       {
           float:left;
           color:red;
           font-size:20px;
    }
   ```
4. OneClick button with status text
    - If a OneClick data point is set to true the corresponding backup starts and after a predefined time this data point is set to false again so it is possible to create a button with status, adjust the following line and enter it in Vis as button text:
```
{value: backitup.0.oneClick.iobroker; value === "true" || value === true ? "iobroker Backup </br> will be created" : "iobroker Backup </br> starten"}
```

Syntax: {value: <BackitupInstance>.oneClick.<trigger>; value ==="true" || value === true ? "Text during backup creation" : "Standard text"}

_[Back to top](#top)_

---

# Notifications
  ioBroker.backitup supports the following messengers for notification after a successful backup.
  The respective adapters must be installed and set up for use.

    * Telegram
    * Pushover
    * Email
    * Whatsapp
    * Signal
    * Matrix
    * Discord

_[Back to top](#top)_

---

# Restore

With ioBroker.backitup it is possible to restore all backup types created via the configuration menu in the ioBroker.<br><br>
ioBroker.backitup works very closely with the js-controller and creates an iobroker backup identical to the CLI command `iobroker backup`.

All states and objects as well as the user files such as VIS are backed up here identically to the standard backup of the js-controller.

The restore is also completely identical to the CLI command `iobroker restore <backupname>` of the js-controller.

With a restore, all states, objects and user data are restored by Backup.
After the restore, your iobroker restarts and from there the js-controller takes over the installation of missing adapters again.

ioBroker.backitup has no effect whatsoever on the recovery after the iobroker has started. This all happens in the background and the js-controller takes over based on the restored information in the States and Objects.

A restore can be carried out from all storage media.<br><br>
**Basically, however, the safest way is to execute the restore locally.**<br><br>
If you choose the safest way and want to do the restore locally, you have to store the backup file in the ioBroker backup folder.
On Linux systems this folder is located under the following path: `/opt/iobroker/backups`

With the backup types "ioBroker" and "redis", the ioBroker is stopped during the restore and then restarted automatically. <br>
After stopping the ioBroker, a new browser tab opens showing the progress of the restore.<br><br>
***If this tab does not open, the browser settings for block popups must be checked.***<br><br>

**ioBroker is not stopped with all other backup types. Here only the affected adapters are temporarily stopped.**<br><br>

If you prefer to restore your backups manually, you should do the following:

***Restore an ioBroker backup:***
    - As usual, the backup must be in the directory `opt/iobroker/backups`
    - It can be restored via the console using the command: `iobroker restore <Backupfilename>`.
    - After the restore an `iobroker upload all` is necessary

Detailed instructions for restoring with Backup and also for manual restoring can be found [here] (https://github.com/simatec/ioBroker.backitup/wiki/%5BHowTo%5D-Restore-auf-Linux-Distributionen).

**The CCU backup must still be restored via the CCU's web interface.**

***Restore a Raspberrymatic / CCU backup:***
    - Copy the * .sbk file via SCP into the directory "/usr/local/tmp" directory on the Raspberrymatic
    - Log in to the Raspberrymatic as a root user via the console
    - Execute the command: “/bin/restoreBackup.sh /user/local/tmp/BackupFileName” on the Raspberrymatic.
    - Execute the command: “reboot“ on the Raspberrymatic to restart the PI
    - Alternatively, the backup can of course also be restored as usual via the web interface.

_[Back to top](#top)_

---

# Troubleshooting

To log errors, ioBroker.backitup must be set to log level "debug" under the ioBroker tab "Instances".

_[Back to top](#top)_

---

# Errors / solutions encountered

Here is a list of the problems that have occurred so far and their solutions, if any.

1.Olifall (from the forum) had the problem that the web interface of the ioBroker was no longer accessible after the restore, he was able to fix this by taking the following steps on the console:
    - sudo iobroker status
    - Message = "No connection to states 127.0.0.0:6379[redis]"
    - sudo apt install redis-server

2. If the CIFS mount with IP address is not possible, the host name of the NAS should be used
3. If you use a password with special characters for the CIFS mount, users have found that the password must then be stored in the config with quotation marks.
4. According to some users, CIFS mount cannot handle very long passwords. If the mount doesn't work, shorten the password a little (12 characters work for me).
5. If the adapter cannot be installed, check your versions of node and nodejs. The adapter does not support versions <Node 8.
6. If your iobroker system was installed with the new installer script, it may happen that you do not have all rights for the new user iobroker.
    Unfortunately, this also applies to backitup, as backitup uses some system relevant commands.

    To fix the problem with missing rights, there is a fix for the iobroker installer script.
    Please execute the following commands on your ioBroker environment in the console:
    ```
    iobroker stop
    iobroker fix
    sudo reboot
    ```
7. If you get an error message when creating the Redis database, please check whether your user iobroker has the rights and whether he is in the Redis user group.
    If this is not the case, you can fix it with the following command in the console.
    ```
    sudo usermod -a -G redis iobroker
    sudo reboot
    ```
    If you have not set up your ioBroker installation with the installer script and your user has a different name, please replace "iobroker" with your user in the command.

8. If a Fritzbox is used as a NAS with a firmware > = 7.21, the SMB settings should be set to "3.1.1" in ioBroker.backitup and the "noserverino" option should be activated.

_[Back to top](#top)_

---

## Changelog
<!-- ### **WORK IN PROGRESS** -->
### 2.8.1 (2023-09-12)
* (simatec) Fix roles
* (simatec) help-links added

### 2.8.0 (2023-09-11)
* (simatec) small Sentry fixes
* (simatec) Bugfix System-Message
* (simatec) Docu & Wiki updated
* (simatec) Translation updated
* (simatec) dependencies updated
* (simatec) Fix Webdav
* (simatec) WOL Address & Port added
* (simatec) Restore for Backitup Config added

### 2.7.0 (2023-08-14)
* (simatec) dependencies updated
* (simatec) Fix error Messages
* (simatec) edit automatic name addition added
* (simatec) Docu & Wiki updated
* (simatec) small bug fixes
* (simatec) Translation updated
* (crycode-de) Add support for sending notifications via discord (requires ioBroker.discord >= 2.1)

### 2.6.23 (2023-05-25)
* (simatec) Fix Influx Restore for MultiDB
* (simatec) Token renew for Onedrive added
* (simatec) Fix PSQL Restore

### 2.6.22 (2023-05-24)
* (simatec) Fix Influx Restore for MultiDB
* (simatec) Default Ports for InfluxDB added

### 2.6.21 (2023-05-19)
* (simatec) small Sentry fixes
* (simatec) Fix Influx Restore
* (simatec) Fix Onedrive Download
* (simatec) dependencies updated

### 2.6.20 (2023-05-02)
* (simatec) FTP self signed Certificates added
* (simatec) dependencies updated

### 2.6.19 (2023-04-20)
* (simatec) small fix for js-controller 5

### 2.6.18 (2023-04-19)
* (simatec) dependencies updated
* (simatec) small Sentry fixes
* (simatec) Error notifications optimized

### 2.6.17 (2023-04-13)
* (simatec) Fix delete InfluxDB tmp dir
* (simatec) small Sentry fixes

### 2.6.16 (2023-03-30)
* (simatec) small fix for js-controller 5

### 2.6.15 (2023-03-27)
* (simatec) Node-Red Backup optimized
* (simatec) Grafana Backup optimized
* (simatec) Zigbee2mqtt Backup optimized
* (simatec) skip-verify for influxdb 2.x

### 2.6.14 (2023-03-22)
* (simatec) Bug Fix History JSON

### 2.6.13 (2023-03-22)
* (simatec) Fix Zigbee2mqtt Restore
* (simatec) Fix Grafana Backup
* (simatec) Backup notifications optimized
* (simatec) Error notifications optimized
* (simatec) history data optimized
* (simatec) small bug fixes

### 2.6.12 (2023-03-16)
* (simatec) Fix Zigbee2mqtt Backup & Restore
* (simatec) Node-Red Backup optimized
* (simatec) Grafana Backup optimized
* (simatec) InfluxDB Backup optimized
* (simatec) Docu & Wiki updated

### 2.6.11 (2023-03-11)
* (simatec) Fix Zigbee2mqtt Backup & Restore

### 2.6.10 (2023-03-10)
* (simatec) Design Fix
* (simatec) node 14 set as minimum requirement
* (simatec) cleaning status log added
* (simatec) Fix Node-Red Backup & Restore

### 2.6.9 (2023-03-08)
* (simatec) Dropbox session upload optimized
* (simatec) Error handling optimized

### 2.6.8 (2023-03-07)
* (simatec) Fix Dropbox session upload

### 2.6.7 (2023-03-06)
* (simatec) Dropbox session upload optimized

### 2.6.6 (2023-03-05)
* (simatec) Dropbox file upload up to 350 GB added

### 2.6.5 (2023-03-03)
* (simatec) Fix cifs Password
* (simatec) Fix InfluxDB-Backup

### 2.6.4 (2023-02-26)
* (simatec) Design optimized
* (simatec) Onedrive Upload Session added

### 2.6.3 (2023-02-24)
* (simatec) Fix SQLite3 Backup
* (simatec) Fix Matrix Message

### 2.6.2 (2023-02-23)
* (simatec) Fix SQLite3 Backup

### 2.6.1 (2023-02-20)
* (simatec) igonore temp-files for redis added

### 2.6.0 (2023-02-16)
* (simatec) Onedrive-Api added
* (simatec) Matrix Messenger added
* (simatec) TLS for FTP added
* (simatec) Tab Extra-Settings added
* (simatec) Node-Red Backup added
* (simatec) SQLLite Backup added
* (simatec) Zigbee2MQTT Backup added
* (simatec) Local-Storage check added
* (simatec) System-Message added
* (simatec) Jarvis Backup updated
* (simatec) many small Fixes

### 2.5.12 (2023-01-19)
* (simatec) Fix Windows ioBroker-Restore

### 2.5.11 (2023-01-18)
* (simatec) Fix Windows ioBroker-Restore

### 2.5.10 (2023-01-03)
* (simatec) Fix Docker Restore
* (simatec) Fix Link Design
* (simatec) dependencies updated
* (Grothesk242) Fix CIFS Mount

### 2.5.9 (2022-12-05)
* (simatec) dependencies dropbox-v2-api updated
* (simatec) Fix Zigbee Restore
* (simatec) Fix Yahka Restore
* (simatec) Fix Javascript Restore
* (simatec) Fix Dropbox Error Messages

### 2.5.8 (2022-12-03)
* (simatec) Fix iobroker Backup
* (simatec) dependencies updated

### 2.5.7 (2022-11-27)
* (simatec) Axios 1.1.3 added
* (bluefox) Added ukrainian language

### 2.5.6 (2022-11-14)
* (simatec) Fix Grafana Backup
* (simatec) Fix Downloadserver
* (simatec) Translation updated

### 2.5.5 (2022-11-13)
* (simatec) Design Fix
* (simatec) Docker DB Support added

### 2.5.4 (2022-11-02)
* (simatec) Fix maxBuffer for DB-Backups
* (simatec) Docu updated
* (simatec) Fix Dropbox error messages
* (simatec) Grafana self signed Certificates added

### 2.5.3 (2022-11-01)
* (simatec) dependencies updated

### 2.5.2 (2022-10-26)
* (simatec) Bugfix Google Drive

### 2.5.1 (2022-10-26)
* (simatec) Bugfix Google Drive

### 2.5.0 (2022-10-18)
* (bluefox) Google Drive authentication was fixed
* (simatec) small Bugfix

### 2.4.16 (2022-10-04)
* (simatec) small Bugfix

### 2.4.15 (2022-10-03)
* (simatec) adapter-core updated
* (simatec) path fix

### 2.4.14 (2022-09-29)
* (simatec) small Bugfix

### 2.4.13 (2022-09-28)
* (simatec) dependencies updated
* (simatec) Fix Grafana Backup
* (simatec) Appveyor testing removed
* (simatec) Fix Test & Release

### 2.4.12 (2022-08-11)
* (simatec) Fix WebDav Error Handling

### 2.4.11 (2022-08-10)
* (simatec) Filesize Check added
* (simatec) dependencies updated
* (simatec) Fix mySql Backup
* (simatec) Fix pgSql Backup

### 2.4.10 (2022-07-05)
* (simatec) Code cleaning
* (simatec) dependencies updated
* (simatec) Disclaimer added
* (simatec) Travis Support removed
* (simatec) Fix backup-download with ssl

### 2.4.9 (2022-05-25)
* (simatec) German Wiki added
* (simatec) English Wiki added
* (simatec) ignore .tar.gz files for zigbee Backups

### 2.4.8 (2022-05-18)
* (simatec) Fix restore from local Mount path

### 2.4.7 (2022-05-16)
* (simatec) dependencies updated
* (simatec) many small bugfixes
* (simatec) Fix Sentry Error Messages
* (simatec) Default SMB Version 3.1.1

### 2.4.6 (2022-04-06)
* (simatec) https support for Download added

### 2.4.5 (2022-04-04)
* (simatec) Download-Server close added

### 2.4.4 (2022-04-02)
* (simatec) try/catch GoogleDrive added
* (Bluefox/simatec) Backup Download added

### 2.4.3 (2022-03-29)
* (simatec) Bugfixes Dropbox
* (simatec) try/catch options added
* (simatec) code verifier check for Dropbox oAuth

### 2.4.2 (2022-03-29)
* (simatec) Bugfixes Dropbox

### 2.4.1 (2022-03-29)
* (simatec) small Bugfixes
* (simatec) try/catch Dropbox Api
* (simatec) Debug Log Dropbox Api

### 2.4.0 (2022-03-28)
* (simatec) Default History path added
* (simatec) dependencies updated
* (simatec) Dropbox default APP added
* (simatec) Bugfix Info Messages
* (simatec) Info Message for Script-Backup added
* (simatec) Signal-cmb added
* (simatec) many small Bugfixes
* (simatec) Documentation updated

### 2.3.5 (2022-02-26)
* (simatec) fix Redis Config

### 2.3.4 (2022-02-26)
* (simatec) Redis Remote Backup for Docker added
* (simatec) Docu updated

### 2.3.3 (2022-02-17)
* (simatec) small GUI fixes
* (simatec) Docker restore tunning

### 2.3.2 (2022-02-13)
* (simatec) Bugfix Restore Interface for http
* (simatec) Fix json history

### 2.3.1 (2022-02-12)
* (simatec) Bugfix Grafana
* (simatec) Bugfix Restore for Docker System
* (simatec) Restore Interface with https Support
* (simatec) use iobroker SSL Certificates for https

### 2.3.0 (2022-02-11)
* (simatec) Influxdb2 Backup added
* (simatec) Influxdb2 Restore added
* (simatec) Bugfix Grafana Backup
* (simatec) Bugfix GUI
* (simatec) Bugfix Redis Restore
* (simatec) New Restore WebIf added
* (simatec) dependencies updated
* (simatec) Bugfix start after Restore
* (simatec) redis remote Backup added
* (simatec) Error messages configurable
* (simatec) Translations added
* (simatec) Adjustments to js-controller 4

### 2.2.4 (2022-01-27)
* (simatec) Restore backup of different controller version added
* (simatec) Fix YAHKA Backup for more Instances

### 2.2.3 (2022-01-10)
* (simatec) Bugfix Error Message
* (simatec) dependencies updated

### 2.2.2 (06.11.2021)
* (simatec) Fix CCU option to use self-signed certificates
* (simatec) Fix Config Menu
* (simatec) dependabot added
* (simatec) small Bugfixes

### 2.2.1 (08.10.2021)
* (simatec) CCU option to use self-signed certificates
* (simatec) small fix for Javascript Message

### 2.2.0 (06.10.2021)
* (simatec) multihost function for master/slave systems added
* (simatec) Multi CCU Backup added
* (simatec) Multi InfluxDB Backup added
* (simatec) Multi MySql Backup added
* (simatec) Multi PGSql Backup added
* (simatec) Yahka backup added
* (simatec) Yahka Restore added
* (simatec) new Restore Interface added
* (simatec) new Tab-Menu added
* (simatec) Docker Support added
* (simatec) delete option for temp-directory added
* (simatec) breaking changes!! Javascript Backup from Objects added
* (simatec) breaking changes!! Javascript Restore from Objects added
* (simatec) WebDav option to use self-signed certificates

### 2.1.17 (15.08.2021)
* (simatec) dependencies updated
* (simatec) Preparation for dark design by Admin 5

### 2.1.16 (12.08.2021)
* (simatec) dependencies updated
* (simatec) https support for ccu backup
* (simatec) sentry Bugfixes

### 2.1.15 (05.08.2021)
* (simatec) Bugfix Google Drive
* (simatec) memory optimization
* (simatec) fix Zigbee Restore
* (simatec) Grafana Protocol selection added
* (simatec) translations updated

### 2.1.14 (04.08.2021)
* (simatec) dependencies updated
* (simatec) RAM memory optimization
* (simatec) googleapis deleted
* (simatec) @googleapis/drive added

### 2.1.13 (14.06.2021)
* (simatec) ready for Grafana 8.x
* (simatec) BugFix PostgreSQL
* (simatec) dependencies updated
* (simatec) Name-Sufix for Messages added

### 2.1.12 (01.06.2021)
* (simatec) adminTab edited
* (simatec) translation changed
* (simatec) dependencies updated
* (simatec) more debug for mount added
* (simatec) Bugfix history json

### 2.1.11 (19.05.2021)
* (simatec) adminTab edited
* (simatec) translation changed

### 2.1.10 (16.05.2021)
* (simatec) Bugfix adminTab

### 2.1.9 (15.05.2021)
* (simatec) adminTab for admin 5 changed

### 2.1.8 (14.05.2021)
* (simatec) adminTab for admin 5 changed

### 2.1.7 (14.05.2021)
* (simatec) Bugfix mysql Restore
* (simatec) Bugfix pgsql Restore
* (simatec) small Bugfix
* (simatec) dependencies updated
* (simatec) node 16 support added

### 2.1.6 (01.05.2021)
* (simatec) Bugfix for js-controller 3.3.x
* (simatec) small Bugfix Dropbox Log
* (simatec) small Bugfix for History Config reading

### 2.1.5 (29.04.2021)
* (simatec) Bugfix AdminTab
* (simatec) small Bugfix

### 2.1.4 (26.04.2021)
* (simatec) Redesign Restore GUI
* (simatec) small GUI Bugfix

### 2.1.3 (22.04.2021)
* (simatec) Admin-Tab changed
* (simatec) Javascript Restore changed
* (simatec) Redesign Admin-Tab
* (simatec) Redesign Config
* (simatec) Preparation for admin 5

### 2.1.2 (13.04.2021)
* (simatec) Creation of temporary folders changed
* (simatec) Filter for redis rdb files changed
* (simatec) automatic deletion of old influx databases added
* (simatec) noserverino option for CIFS mount added
* (simatec) dependencies updated

### 2.1.1 (11.04.2021)
* (simatec) Bugfix redis
* (simatec) debug Log for Restore request added
* (simatec) Bugfix influxdb
* (simatec) ignore Filenames for javascript-Backup added

### 2.1.0 (24.03.2021)
* (simatec) Admin-Tab added
* (simatec) dependencies targz removed
* (simatec) dependencies tar-fs added
* (simatec) dependencies updated
* (simatec) small Bugfixes

### 2.0.5 (14.03.2021)
* (simatec) error handling for redis backup added
* (simatec) error handling for history backup added
* (simatec) BugFix Grafana backup

### 2.0.4 (10.03.2021)
* (simatec) Bugfix history json
* (simatec) BugFix Redis backup
* (simatec) chmod for backup directory added
* (simatec) error handling for Grafana backup added

### 2.0.3 (04.03.2021)
* (simatec) Promise for redis aof added
* (simatec) BugFix Grafana restore
* (simatec) small BugFix umount

### 2.0.2 (03.03.2021)
* (simatec) BugFix redis backup
* (simatec) aof for redis added

### 2.0.1 (23.02.2021)
* (simatec) BugFix redis backup/restore
* (simatec) dependencies node-tar added
* (simatec) BugFix Notification
* (simatec) BugFix Grafana backup

### 2.0.0 (31.01.2021)
* (simatec) BugFix detect last backup
* (simatec) WebDAV added
* (simatec) BugFix Zigbee
* (simatec) stop/start Instances on restore
* (simatec) Download Icon for Cloud Restore added
* (simatec) javscript Backup added
* (simatec) Grafana Backup added
* (simatec) Restore added for some types without restart
* (simatec) timestamp for history-json added
* (simatec) Source code rewritten
* (simatec) Restore revised
* (simatec) fixed many small bugs
* (simatec) Added warning messages
* (simatec) Fixed cloud restore

### 1.8.5 (11.01.2021)
* (simatec) Bugfix Jarvis Backup
* (simatec) Bugfix GUI

### 1.8.4 (09.01.2021)
* (simatec) Bugfix influxDB Backup
* (simatec) Bugfix influxDB Restore
* (simatec) Jarvis Backup added
* (simatec) Jarvis Restore added
* (simatec) Bugfix mysql Backup
* (simatec) Bugfix pgsql Backup
* (simatec) small Bugfixes
* (simatec) Info-Message for storage added

### 1.8.3 (22.12.2020)
* (simatec) Bugfix iobroker start after restore on Windows
* (simatec) changed webui-port for restore
* (simatec) Bugfix influxDB Restore
* (simatec) dependencies updated

### 1.8.2 (09.12.2020)
* (simatec) code cleaned
* (simatec) code for history.html object revised
* (simatec) code for history.json object revised

### 1.8.1 (07.12.2020)
* (simatec) influxDB Backup added
* (simatec) influxDB Restore added
* (simatec) Postgresql Backup added
* (simatec) Postgresql Restore added
* (simatec) translation added
* (simatec) new zigbee Restore added
* (simatec) dependencies updated
* (simatec) many small bugfixes
* (simatec) new redis Restore added
* (simatec) enable/disable option for Sentry Plugin
* (simatec) smb 3.02 support added
* (simatec) smb 3.1.1 support added

### 1.7.0 (26.10.2020)
* (simatec) small Bugfix for umount on cifs/nfs mount
* (simatec) Dev-Dependencies updated
* (simatec) Dependencies updated

### 1.6.9 (30.09.2020)
* (simatec) Timeout fix for backup process

### 1.6.8 (24.09.2020)
* (simatec) Translations update for Weblate
* (simatec) dependencies updated
* (simatec) devdependencies updated
* (weblate) translation updated

### 1.6.7 (09.09.2020)
* (simatec) Bugfix error on GoogleDrive

### 1.6.6 (08.09.2020)
* (simatec) Bugfix clean local backups
* (simatec) Bugfix mount and umount for sentry.io

### 1.6.5 (07.09.2020)
* (simatec) Bugfix GoogleDrive Rate Limit errors 
* (simatec) small fixes on zigbee backup

### 1.6.4 (04.09.2020)
* (simatec) small fixes for sentry.io
* (simatec) small fixes on zigbee backup

### 1.6.3 (01.09.2020)
* (simatec) dependencies for googleapis updated
* (simatec) dependencies for dropbox-v2-api updated
* (simatec) devdependencies updated

### 1.6.2 (31.08.2020)
* (simatec) added whatsapp-cmb support for notifications

### 1.6.1 (24.08.2020)
* (Apollon77) several fixes and optimizations

### 1.6.0 (03.08.2020)
* (Jey-Cee/simatec) adapter configuration revised

### 1.5.9 (21.07.2020)
* (simatec) small fixes on mysql backup
* (simatec) next bugfixs errorhandling sentry.io
* (simatec) updated dependencies

### 1.5.8 (20.05.2020)
* (simatec) small fixes on zigbee backup
* (simatec) added log for zigbee Instances
* (simatec) next bugfix errorhandling sentry.io

### 1.5.7 (11.05.2020)
* (simatec) bugfix errorhandling sentry.io
* (simatec) updated dependencies
* (simatec) added node14 support

### 1.5.6 (02.05.2020)
* (simatec) Bugfix reading restore list

### 1.5.5 (01.05.2020)
* (simatec) bugfix errorhandling sentry.io

### 1.5.4 (29.04.2020)
* (simatec) added osDependencies for nfs and cifs
* (simatec) Bugfixes for errorhandling telegram, pushover, e-mail, ftp list and create backup folder

### 1.5.3 (28.04.2020)
* (simatec) many smal Bugfixes for errorhandling sentry.io

### 1.5.2 (24.04.2020)
* (simatec) errorhandling sentry.io
* (AlCalzone) docu updated

### 1.5.1 (23.04.2020)
* (simatec) Bugfix list from nas
* (simatec) Bugfix sentry errors

### 1.5.0 (21.04.2020)
* (simatec) revised error handling
* (simatec) revised mount process
* (simatec) revised umount process
* (simatec) added log for last backup file
* (simatec) updated dependencies
* (simatec) added sentry.io support

### 1.4.5 (23.03.2020)
* (simatec) Bugfix CIFS Domain

### 1.4.4 (23.03.2020)
* (simatec) Fix history error

### 1.4.3 (21.03.2020)
* (simatec) Fix for autochecker

### 1.4.2 (21.03.2020)
* (simatec) Fix start after restore
* (simatec) update dependencies

### 1.4.1 (02.03.2020)
* (simatec) json historystate with more options

### 1.4.0 (27.02.2020)
* (simatec) added next Backup Time
* (simatec) added Name Suffix for mysql Backup
* (simatec) added more Options for mysql
* (simatec) added domain support for cifs
* (simatec) added json historystate

### 1.3.6 (18.12.2019)
* (simatec) Fix historyList for compact-mode
* (simatec) Added ack for history states

### 1.3.5 (17.12.2019)
* (simatec) Fix compact-mode for history

### 1.3.4 (15.12.2019)
* (simatec) Fix hide passwords

### 1.3.3 (14.12.2019)
* (simatec) Fix Webinterface for Restore
* (simatec) Fix MySql Backup
* (simatec) Added some debug logs for Restore
* (simatec) some Bug Fix
* (simatec) Messagebox for restore list
* (simatec) hide password on log
* (simatec) Added password hiding
* (simatec) Clean Code
* (simatec) detected history path
* (simatec) Fix deteced

### 1.3.2 (04.12.2019)
* (simatec) Add Webinterface for Restore
* (simatec) Bug fix

### 1.3.1 (02.12.2019)
* (bluefox) Added information about latest backup
* (simatec) some Bug fix
* (simatec) add new translation
* (simatec) Fix translation
* (simatec) Default backup renamed to ioBroker backup
* (simatec) delete old objects

### 1.3.0 (22.11.2019)
* (simatec) support end for the total backup
* (simatec) Added backup of history data path
* (simatec) Added startup of all adapters after restore
* (simatec) Revision of the restoration for Redis
* (simatec) revision of log issues
* (simatec) Rebuild the start / stop processes under Unix
* (simatec) Rebuilding the start / stop processes under Windows
* (simatec) new translations
* (simatec) adjustments to the new Windows Installer
* (simatec) adjustments to the new Linux installer
* (simatec) fixed some small bugs

### 1.2.2 (20.10.2019)
* (simatec) Fix update process

### 1.2.1 (19.10.2019)
* (simatec) Fix CIFS password with special characters

### 1.2.0 (02.07.2019)
* (bluefox) Google Drive was added
* (simatec) Support for node 6 ended

### 1.1.4 (08.04.2019)
* (simatec) Support for SMB3
* (simatec) Backup for Zigbee Database
* (simatec) Restore for Zigbee Database

### 1.1.3 (12.03.2019)
* (simatec) Timeout for email sending
* (simatec) Timeout for pushover sending
* (simatec) Timeout for telegram sending
* (simatec) Code cleaned up

### 1.1.2 (21.02.2019)
* (simatec) exec Start for iobroker
* (simatec) Fix umount before Restore

### 1.1.1 (12.02.2019)
* (simatec) Fix iobroker-stop for total backup

### 1.1.0 (10.02.2019)
* (simatec) stable Release

### 1.0.9 (02.02.2019)
* (simatec) Add New umount query
* (simatec) Add Umount wait by device busy
* (simatec) Add Timeout for History settings
* (simatec) Add Notification only on error

### 1.0.8 (26.01.2019)
* (simatec) modification for new installer
* (simatec) WOL-waittime adjustable
* (simatec) Fix History settings

### 1.0.7 (17.01.2019)
* (simatec) better start/stop Handling for backup and restore

### 1.0.6 (16.01.2019)
* (simatec) Fix Start/Stop for new iobroker-installer

### 1.0.5 (14.01.2019)
* (simatec) Fix compact mode
* (simatec) Fix total backup
* (simatec) better history handling for html
* (simatec) better history handling
* (simatec) error Message for telegram
* (simatec) error Message for E-Mail
* (simatec) error Message for pushover

### 1.0.4 (08.01.2019)
* (simatec) support for compact mode

### 1.0.3 (06.01.2019)
* (simatec) Bugfix

### 1.0.2 (05.01.2019)
* (simatec) Fix start/stop for new iobroker-Installer

### 1.0.1 (30.12.2018)
* (simatec) Fix delete old Files
* (simatec) Add wake on LAN for CIFS and NFS

### 1.0.0 (24.12.2018)
* (simatec) Stable Release

### 0.4.4 (19.12.2018)
* (simatec) Fix cifs-mount User

### 0.4.3 (17.12.2018)
* (simatec) Add device ID for pushover

### 0.4.2 (10.12.2018)
* (simatec) Fix mount / umount
* (simatec) Fix Readme

### 0.4.1 (07.12.2018)
* (simatec) Added boolean for backup Success
* (simatec) Added Selection menu SMB type (CIFS)
* (simatec) Added Checkbox for mount as root (sudo)

### 0.4.0 (04.12.2018)
* (simatec) Added Pushover Notification

### 0.3.9 (03.12.2018)
* (simatec) Fix cifs/nfs mount and umount

### 0.3.8 (08.11.2018)
* (simatec) Fix notifications format
* (simatec) Fix Telegram User

### 0.3.7 (07.11.2018)
* (simatec) Added e-mail notification
* (simatec) Create backup directory on first boot
* (simatec) many small changes
* (peoples) Fix Telegram SilentNotice
* (peoples) Added Possibility to select a Telegram Receiver
* (peoples) Added Possibility to select a Telegram Notification length
* (peoples) Some Translations

### 0.3.6 (16.10.2018)
* (simatec) Fix Dropbox Backup
* (simatec) Fix Restore path for ownDir
* (simatec) Fix FTP and NAS path
* (simatec) Fix Access Token for dropbox

### 0.3.5 (03.10.2018)
* (simatec) Fix Translation
* (simatec) Fix Filename Suffix for Restore
* (peoples) Bugfix Title for Backup deletion

### 0.3.4 (01.10.2018)
* (simatec) Fix Restart after total-backup

### 0.3.3 (27.09.2018)
* (simatec) Fix Backup-Directoy for dropbox
* (simatec) Fix Restart after total-backup
* (simatec) Fix error Log on cifs

### 0.3.2 (25.09.2018)
* (simatec) Fix Filename for ccu backup

### 0.3.1 (25.09.2018)
* (simatec) Fix FTP Directory
* (simatec) delete old Files

### 0.3.0 (24.09.2018)
* (bluefox/simatec) Add Multiplatform (Windows/Linux/Mac)
* (bluefox/simatec) ioBroker.backitup switched to Javascript
* (bluefox/simatec) shell support removed
* (bluefox/simatec) Deleting old backups up to the last X backups added
* (bluefox/simatec) restore feature added (beta)
* (bluefox/simatec) Restore added via NAS/FTP/Local/Dropbox (Beta)
* (simatec) NFS support added
* (bluefox) Dropbox Support added
* (bluefox) Fix History
* (peoples) Added silent mode for telegram
* (simatec) Redis/mysql added with standard backup
* (simatec) translations added
* (simatec) Docs adapted

### 0.2.7 (29.07.2018)
* (simatec) Fix Delete old Files

### 0.2.6 (27.07.2018)
* (bluefox) Configurable redis path was added
* (simatec) Translations Script
* (simatec) Fix FTP Upload

### 0.2.5 (26.07.2018)
* (simatec) Check for dependencies
* (simatec) Delete older files if number of files greater than X
* (simatec) Check for Backup Dir
* (simatec) Translations added

### 0.2.4 (23.07.2018)
 * (peoples) Some Bugfixes
 * (peoples) Added translations in words.js

### 0.2.3 (19.07.2018)
 * (bluefox) The backup buttons in configuration dialog were added
 * (bluefox) Show bash output text
 * (peoples) Bug Fix Mysql-Login Error

### 0.2.2 (17.07.2018)
 * (peoples/simatec/bluefox) Bug Fix Code

### 0.2.1 (15.07.2018)
 * (peoples/simatec) Bug Fix

### 0.2.0 (14.07.2018)
 * (blufox) Code formatting

### 0.1.8 (11.07.2018)
 * (darkiop) MySQL-Sicherung um Host- und Portabfrage erweitert
 * (peoples) Versendende Telegram-Instanz wählbar
 * (peoples) Telegram-Nachrichten angepasst an Verbindungstyp
 * (peoples) History-Log angepasst an Verbindungstyp
 * (simatec) Komprimierung der MySQL-Datenbank-Sicherung eingebaut
 * (simatec) Anpassung der Konfigoberfläche an Telegram-Instanz Auswahl

### 0.1.7 (05.07.2018)
 * (peoples) Datenpunkte in io-package definiert

### 0.1.6 (04.07.2018)
 * (simatec/peoples) Beta Version

### 0.1.5 (03.07.2018)
 * (peoples) Log Einträge neu formatiert

### 0.1.4 (02.07.2018)
 * (simatec/peoples) diverse Anpassungen

### 0.1.3 (01.07.2018)
 * (simatec/peoples) Sprachen hinzugefügt

### 0.1.2 (30.06.2018)
 * (simatec/peoples) Erste Beta-Version

### 0.1.0 (25.06.2018)
 * (simatec/peoples) Erste Git-Adapter-Version

## License

The MIT License (MIT)

Copyright (c) 2018 - 2023 simatec

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.