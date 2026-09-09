---
title: The first steps
lastChanged: 08.09.2026
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/tutorial/setup.md
hash: qDcfIGwH4o9IYTWfi6aTS29MRhhZ/f27N/cnKmUacjU=
---
# The first steps

ioBroker is installed and running. This page guides you through the necessary steps that come before everything else. They take about half an hour in total and will save you a lot of trouble later.

Not installed yet? Then first
[installation](/docs/install/README.md).

## 1. Open the surface

Enter the server address and port in your browser. `8081` call:

```
http://<adresse-des-servers>:8081
```

The administrator appears without logging in. This is correct initially and will be changed in step 4.

## 2. Fill in the system settings

Bottom left above the gear
[System settings](/docs/admin/settings.md)
Open. Four pieces of information must be correct before the first adapter is added:

| Information          | Why                                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Language**         | This applies to the user interface and to the names that adapters create.                                                          |
| **Location**         | ioBroker calculates sunrise and sunset times based on latitude and longitude. Almost every automatic timer system depends on this. |
| **temperature unit** | Degrees Celsius or Fahrenheit.                                                                                                     |
| **currency**         | For adapters that provide prices or operating costs.                                                                               |

!> Enter the location correctly. If this is omitted, ioBroker will assume a preset location, and the lights will turn on at the wrong time.

## 3. Check for updates

In the rider [Hosts](/docs/admin/hosts.md)
It indicates whether a newer version of the JS controller is available. With a fresh installation, everything is usually up to date. Instructions on how to perform an update are available at \[link/section].
[Install updates](/docs/tutorial/updates.md).

## 4. Assign a password

As long as no login is enabled, anyone on the network can open the interface and change everything.

1. In the rider [user](/docs/admin/users.md)
   the user `admin` Give a password.
2. Then in the instance settings `admin.0` the **authentication**
   turn on.

The order is important: first the password, then the login. Detailed instructions are available at \[link/reference].
[authentication](/docs/config/login.md).

## 5. Set up data backup

The step that almost everyone puts off and later regrets: the adapter.
**BackItUp** It creates regular backups; this includes a destination outside the computer. The procedure is described under
[Data backup](/docs/config/backup.md).

Then manually trigger a backup and check if the file has actually arrived at its destination. A backup that has never been checked is just an assumption.

## 6. Install the first adapter

Now comes the part you installed ioBroker for. In the tab
[adapter](/docs/admin/adapter.md) Find the appropriate adapter and create an instance using the plus sign. The difference between an adapter and an instance, and the potential pitfalls, are explained below.
[Manage adapters](/docs/tutorial/adapter.md).

Adapters without hardware are suitable for testing, for example. `openweathermap` for the weather or `ping`, to see which devices are reachable on the network.

## What happens next?

| Next                                         | What it's about                                           |
| -------------------------------------------- | --------------------------------------------------------- |
| [tour](/docs/tutorial/admin.md)              | What the surface riders do and which ones you need daily. |
| [Manage adapters](/docs/tutorial/adapter.md) | Install, update, uninstall.                               |
| [First automation](/docs/tutorial/logic.md)  | Turning values into action.                               |