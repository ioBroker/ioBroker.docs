## Was ist Redis, und ab wann lohnt sich das?

ioBroker führt zwei Datenbanken: eine für die **Objekte** (die Struktur) und eine
für die **Zustände** (die Werte). Voreingestellt ist für beide `jsonl`, eine
Datei, die im Betrieb im Arbeitsspeicher gehalten wird.

**Redis** ist eine Alternative für die Zustände. Sie lohnt sich, wenn viele Werte
sehr häufig wechseln, als grobe Marke ab einigen tausend Zuständen mit reger
Änderung, oder wenn `memRss` des js-controllers auffällig wächst.

Zu beachten:

* Redis muss **persistiert** werden, sonst sind die Zustände nach einem Neustart
  weg.
* Das Backup muss Redis mit einschließen. BackItUp kann das.
* Für Objekte bleibt in aller Regel `jsonl` die bessere Wahl.

Für eine normale Hausinstallation ist die Voreinstellung völlig ausreichend. Wer
umstellt, ohne ein Problem zu haben, holt sich meist nur eine zusätzliche
Fehlerquelle.

Ausführlich: [Redis](/docs/config/redis.md)
