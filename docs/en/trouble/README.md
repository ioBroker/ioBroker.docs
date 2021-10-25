---
title: introduction
lastChanged: 14.09.2018
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/trouble/README.md
hash: zyX2YdM6CIiREEqfh+LxO6fCXcvENhSZ8SXnod+1Dh8=
---
# Troubleshooting
?> ***This is a placeholder*** .<br><br> Help with ioBroker and expand this article. Please note [ioBroker Style Guide](https://www.iobroker.net/#de/documentation/community/styleguidedoc.md) so that the changes can be adopted more easily.

@@@ Overarching procedures. Refer to individual help with the specific adapter, installation method and platform.
@@@

On this page you will find information about problems and their solutions or approaches for solutions.
Please look through the topics to see whether your problem is already included here or on the sub-pages and thus the solution, if applicable.

## First aid checklist "My ioBroker has stopped working" - What should I check first and always post in the forum?
Important information is always the following version information:

* `node -v`: ioBroker supports the" LTS versions "of nodejs (even version numbers). New installations must use at least nodejs 8.12. **Attention:** Development versions of nodejs (uneven version numbers) are not officially supported! Please also use completely new LTS versions only after having informed the forum. We recommend nodejs 8.15 or higher.
* `npm -v`: ioBroker supports npm in version 3 and> 5.7.1, recommended is 6.4.1 or higher
* `iobroker -v`
* Version number of the adapter (s) concerned
* Operating system (Linux, MacOS, Windows)
* Hardware platform

It is best to provide this information directly in the thread.

Furthermore, please check this troubleshooting page and the FAQ --LINK-- BEFORE a forum request whether the topic is already included there. If you have already tried actions from these documents, please write them down at the same time.

Please check the logs to see whether there are any helpful entries from the relevant adapters at the point in time of the problem. Always puts logs and scripts or similar in spoilers.

## Where can I find logs?
In the simplest case, logs can be found in the admin UI in the web browser. Please note, however, that in the admin the log lines are cut off after approx. 200 characters. As a result, important information may be lost or incomplete.
Furthermore, the logs in the admin are only available for the current browser session.

ioBroker continues to write all logs to a log file. This is located in the ioBroker directory in the "log" subdirectory and is normally available there for 7 days. Simply open it with a text editor and send excerpts if necessary.

## How do I change the log level of an adapter instance?
By default, the js-controller and the adapters run in the "info" log level. This means that information that the adapter developer considered useful is output in the log. In total there are the following log levels:

* **error** Only errors are logged
* **warn** Errors and warnings are logged
* **info** Information, warnings and errors are logged, standard
* **debug** in addition to information, warnings and errors, additional information is logged that the adapter developer considers useful for troubleshooting.
* **silly** Most detailed log level, in which messages from the js controller are also logged, only use if explicitly requested.

The log level of an instance can be set in the Admin WebUI. To do this, activate the expert mode under "Instances" and set the log level in the column of the same name for the instance.
After changing the log level, the instance is automatically restarted.

** Attention: ** Depending on the log level (especially debug and silly) the log file on the disk can be quite large. Pay attention to the available storage space.

## After operating system updates, ioBroker no longer works (check node versions and something like that)
## An adapter / ioBroker no longer starts with the error "wrong node version native packet. Blah"? (npm rebuild and such)
## I have several different nodejs versions on my computer?
## Suddenly ioBroker / Adapter no longer works with the message "Syntax Error Unexpected / Invalid Token or similar." (File corrupt, SD card ...)
## At adapter start Error 7 / Reconnect to DB (reasons ... solutions)
## The ioBroker can suddenly no longer be reached, but my computer is still? (syslog oom or something)
## The whole host suddenly freezes during operation (swapping top ...)
## The whole host freezes during adapter updates (e.g. sql installation)
## How can I manually reinstall the js controller and when should I do something like that? What do I have to consider?
## How can I manually reinstall an adapter and when should I do this? What do I have to consider?
## When installing an adapter, a window appears with "index.html not found"? (Install Admin3)
## Are all my adapters gone?
...

## Where is iobroker's data located?
* Iobroker-data objects, and backup and such

## My memory RAM is always full?
## My system crashes? Stops constantly, no longer available
* Ssh still?
* Not more?
* Power adapter?
* Syslog

## Where can I find the iobroker log file?
## Cannot be installed twice on the same computer / Docker
## Node and nodejs have different outputs
## How do I activate the debug log mode for adapter instances?
## Ppm error while installing adapters
* ENOGIT
* EACCESS
* ENOSPC

## Error: Module version mismatch. Expected 48, got 67.
## Iot devices no longer work?
## Cloud or iot?
## Error when calling the admin page "index.html not found"
## When forum when GitHub issue?
## Everything worked, I didn't change anything and now something is no longer working?
* Communication error
* File system error

## After power failure / power gone without a clean shutdown error
## Iobroker updates? Adapter? Controller? When npm?
## Warnings for ppm actions?
* No Access
* Audit, security, deprications

## Reconnection to DB
## Error 7 adapter is already running
## Reinstall / rebuild (and error shell script)
## Didn't make a backup but still have the biobroker directory? Enough for restore?