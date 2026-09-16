---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_020_usage/080_logdateien.md
title: no title
hash: cueiceNrwpfLJ3hDiEzpNDLO4ZY8wWl0CZlxj/D6b2c=
---
## Where can I find the logs?

In the admin panel, under the [Logs tab](/docs/admin/log.md) , you can filter by instance, level, and text.

They lie on the plate under`/opt/iobroker/log/` One file per day. The full file can be downloaded via the **"Download Log"** button.

It also works via the command line:

```bash
iob logs          # die letzten 100 Zeilen
iob logs --watch  # fortlaufend mitlesen
```

Long lines are cut off in the browser display. Anyone who wants to investigate a message properly should check the downloaded file. The cause is often found in the lines preceding it.