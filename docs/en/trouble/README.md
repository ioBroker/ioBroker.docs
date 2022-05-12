---
title: introduction
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/README.md
hash: NAHfCKNrau6ZZZiSXWF0k0KN7z/OGtn4WhfS7IzATmk=
---
# Troubleshooting
?> ***This is a placeholder***.<br><br> Help ioBroker and expand this article. Please note the [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) so that the changes can be adopted more easily.

@@@ Comprehensive procedures. Refer to individual help for specific adapter, installation procedure, and platform.
@@@

On this page you will find information about problems and their solutions or approaches to solutions.
Please look through the topics to see whether your problem is already included here or on the subpages and, if so, the solution.

## First Aid Checklist "My ioBroker has stopped working" - What should I check first and always post in the forum?
Important information is always the following version information:

* `node -v`: ioBroker supports the "LTS versions" of nodejs (even version numbers). New installations must use at least nodejs 8.12. **Attention:** Development versions of nodejs (odd version numbers) are not officially supported! Please only use completely new LTS versions after forum information. Nodejs 8.15 or higher is recommended.
* `npm -v`: ioBroker supports npm in version 3 and >5.7.1, recommended is 6.4.1 or higher
* `iobroker -v`
* Version number of the adapter(s) in question
* Operating system (Linux, MacOS, Windows)
* Hardware platform

It is best to provide this information directly in the thread.

Furthermore, BEFORE a forum request, please check this troubleshooting page and also the FAQ --LINK-- to see whether the topic is already included there. If you have already tried actions from these documents, please write that down at the same time.

Please check the logs for helpful entries from the relevant adapters at the time of the problem. Always put logs and scripts etc. in spoilers.

## Where can I find logs?
In the simplest case, logs can be found in the admin UI in the web browser. Please note that the log lines in the admin are truncated after about 200 characters. As a result, important information may be lost or incomplete.
Furthermore, the logs in the admin are only available for the current browser session.

ioBroker continues to write all logs to a log file. This is located in the ioBroker directory in the "log" subdirectory and is normally available there for 7 days. Simply open it with a text editor and send excerpts if necessary.

## How do I change the log level of an adapter instance?
By default, the js-controller and the adapters run in the "info" log level. This means that information that the adapter developer considered useful is written to the log. In total, there are the following log levels:

* **error**: Only errors are logged
* **warn**: Errors and warnings are logged
* **info**: information, warnings and errors are logged, default
* **debug**: in addition to information, warnings and errors, additional information is logged that the adapter developer considers useful for troubleshooting.
* **silly**: Most detailed log level, in which messages from the js-controller are also logged, only use if explicitly requested.

The log level of an instance can be set in the Admin WebUI. To do this, activate the expert mode under "Instances" and set the log level in the column of the same name for the instance.
After changing the log level, the instance is automatically restarted.

**Caution:** Depending on the log level (especially debug and silly), the log file on disk can become quite large. Pay attention to the available storage space.

## After operating system updates, ioBroker no longer works (check node versions and such)
## An adapter/ioBroker no longer starts with the error "wrong node version native package. bla" ? (npm rebuild and such)
## I have several different nodejs versions on my machine?
## Suddenly ioBroker/Adapter no longer works with the message "Syntax Error Unexpected/Invalid Token or similar." (File corrupt, SD card ...)
## When starting the adapter Error 7/ Reconnect to DB (reasons... solutions)
## The ioBroker is suddenly no longer accessible, but is my computer still available? (syslog oom or something)
## Whole host suddenly freezes on the fly (swapping top...)
## Whole host freezes on adapter updates (e.g. sql installation)
## How can I manually reinstall the js controller and when should I do this? What do I have to consider?
## How can I manually reinstall an adapter and when should I do so? What do I have to consider?
## When installing an adapter, a window appears with "index.html not found"? (Install Admin3)
## My adapters are all gone?
...

## Where is the data from iobroker located?
* iobroker-data objects, and backup and such

## My storage RAM is constantly full?
## My system crashes? Stands still, no longer available
* ssh yet?
* Not more?
* Power adapter?
* Syslog

## Where can I find the iobroker log file?
## Cannot be installed twice on the same computer/Docker
## Node and nodejs different outputs
## How do I turn on debug log mode on adapter instances?
## Ppm failed to install adapters
* ENOGITE
* EACCESS
* ENOSPC

## Error: Module version mismatch. Expected 48, got 67.
## Iot devices no longer work?
## Cloud or iot?
## Error when calling the admin page "index.html not found"
## When Forum when GitHub issue?
## Everything worked, I didn't change anything and now something isn't working anymore?
* Communication error
* File system error

## After power failure/power off without clean shutdown error
## Iobroker updates? Adapter? controllers? When npm?
## Warnings on ppm actions?
* NoAccess
* Audit, Security, Deductions

## Reconnection to DB
## Error 7 Adapter is already running
## Reinstall/rebuild (and error shell script)
## Didn't make a backup but still have the Biobroker directory? Is it enough for restore?