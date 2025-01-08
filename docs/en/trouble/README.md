---
title: Introduction
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/README.md
hash: f+b5Wx4PObU1hl03ZqMvdYWbEwCSyTc+LPx3j3prRfQ=
---
# Troubleshooting
@@@ General procedures. Refer to individual help for each adapter, installation procedure and platform.
@@@

On this page you will find information about problems and their solutions or approaches to solutions.
Please look through the topics to see whether your problem is already included here or on the subpages and possibly also the solution.

## First aid checklist "My ioBroker no longer works" - What should I check first and always post in the forum?
Important information is always the following version information:

* `node -v`: ioBroker supports the "LTS versions" of nodejs (even version numbers). New installations must use at least nodejs 8.12. **Attention:** Development versions of nodejs (odd version numbers) are not officially supported! Please only use completely new LTS versions after reading the forum information. Nodejs 8.15 or higher is recommended.
* `npm -v`: ioBroker supports npm version 3 and >5.7.1. Recommended is 6.4.1 or higher
* `iobroker -v`
* Version number of the adapter(s) in question
* Operating system (Linux, MacOS, Windows)
* Hardware platform

It is best to provide this information directly in the thread.

Furthermore, BEFORE posting a forum query, please check this troubleshooting page and the FAQ --LINK-- to see if the topic is already covered there. If you have already tried actions from these documents, please write that down as well.

Please check the logs to see if there are any entries from the relevant adapters at the time of the problem that are helpful. Always put logs and scripts etc. in spoilers.

## Where can I find logs?
In the simplest case, logs can be found in the admin UI in the web browser. Please note, however, that in the admin the log lines are cut off after around 200 characters. This may result in important information being lost or incomplete.
Furthermore, the logs in the admin are only available for the current browser session.

ioBroker also writes all logs to a log file. This is located in the ioBroker directory in the "log" subdirectory and is normally available there for 7 days. Simply open it with a text editor and send excerpts if necessary.

## How do I change the log level of an adapter instance?
By default, the js controller and the adapters run in the log level "info". This means that information that the adapter developer considers useful is output in the log. In total, there are the following log levels:

* **error**: Only errors are logged
* **warn**: Errors and warnings are logged
* **info**: Information, warnings and errors are logged, default
* **debug**: in addition to information, warnings and errors, additional information is logged that the adapter developer considers useful for debugging.
* **silly**: Most detailed log level, in which messages from the js-controller are also logged, only use if explicitly requested.

The log level of an instance can be set in the Admin WebUI. To do this, activate the expert mode under "Instances" and set the log level in the column of the same name for the instance.
After changing the log level, the instance is automatically restarted.

**Warning:** Depending on the log level (especially debug and silly), the log file on the disk can become quite large. Pay attention to the available storage space.

## After operating system updates ioBroker no longer works (checking node versions and such)
## An adapter/ioBroker no longer starts with the error "wrong node version native package. bla" ? (npm rebuild and so on)
## I have several different nodejs versions on my computer?
## Suddenly ioBroker/Adapter stops working with the message "Syntax Error Unexpected/Invalid Token or similar" (File corrupt, SD card ...)
## Error 7/ Reconnect to DB when starting the adapter (Reasons...Solutions)
## The ioBroker is suddenly no longer accessible, but my computer is still accessible? (syslog oom or something like that)
## The whole host suddenly freezes during operation (swapping top ...)
## The whole host freezes during adapter updates (e.g. sql installation)
## How can I manually reinstall the js-controller and when should I do this? What do I need to consider?
## How can I manually reinstall an adapter and when should I do this? What do I need to consider?
## When installing an adapter, a window appears with "index.html not found"? (Install Admin3)
## My adapters are all gone?
...

## Where is iobroker's data?
* Iobroker-data Objects, and Backup and so on

## My RAM memory is always full?
## My system crashes? Constantly stops, no longer accessible
* SSH still?
* Not at all anymore?
* Power supply?
* Syslog

## Where can I find the iobroker log file?
## Cannot be installed twice on the same computer/Docker
## Node and nodejs different outputs
## How do I enable debug log mode for adapter instances?
## Ppm error when installing adapters
* ENOGIT
* EACCESS
* ENOSPC

## Error: Module version mismatch. Expected 48, got 67.
## IoT devices no longer work?
## Cloud or IoT?
## Error when accessing the admin page "index.html not found"
## When forum when GitHub issue?
## Everything worked, I didn't change anything and now something isn't working?
* Communication error
* Filesystem error

## After power failure/power off without clean shutdown error
## Iobroker updates? Adapter? Controller? When npm?
## Warnings for ppm actions?
* No Access
* Audit, security, deprivations

## Reconnection to DB
## Error 7 Adapter is already running
## Reinstall/rebuild (and error shell script)
## I haven't made a backup but still have the ioBroker directory? Is that enough for a restore?