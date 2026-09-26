---
chapters: {"pages":{"de/adapterref/iobroker.beszel/README.md":{"title":{"de":"ioBroker.beszel — Benutzerdokumentation"},"content":"de/adapterref/iobroker.beszel/README.md"},"de/adapterref/iobroker.beszel/datapoints.md":{"title":{"de":"Datenpunkte und Metrik-Schalter"},"content":"de/adapterref/iobroker.beszel/datapoints.md"},"de/adapterref/iobroker.beszel/faq.md":{"title":{"de":"Fragen und Fehlersuche"},"content":"de/adapterref/iobroker.beszel/faq.md"}}}
---
# Datenpunkte und Metrik-Schalter

Jeder Schalter im Reiter _Metrics_ gilt global, also für alle überwachten Systeme. Ihn
auszuschalten stoppt nicht nur die Aktualisierung — die zugehörigen Datenpunkte werden beim
nächsten Start entfernt, und die Protokollzeile `Object tree updated: removed N datapoint(s)` sagt,
wie viele. Wieder einschalten legt sie neu an.

Ein Kategorie-Schalter regiert auch seine Detail-Schalter. Mit ausgeschaltetem _CPU Usage_ bleiben
Lastmittel, Aufschlüsselung und Kernauslastung ebenfalls aus — in der Admin ausgegraut und im Baum
gar nicht erst angelegt. Die Kategorie System hat keinen solchen Basis-Schalter: Laufzeit,
System-Infos und systemd-Dienste sind unabhängig, nur die Dienst-Details hängen am Dienste-Schalter.
Gruppen ohne Detailstufe — Lüfter, Akku, Container, SMART, Netzwerk-Monitore — sind einzelne
Schalter.

## System

| Schalter         | Datenpunkte                                                                                                                                                 | Hinweis                                                                                                            |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Uptime _(an)_    | `info.uptime`                                                                                                                                               | Sekunden seit dem letzten Start                                                                                    |
| System info      | `info.hostname`, `info.os`, `info.os_name`, `info.kernel`, `info.cpu_model`, `info.arch`, `info.cores`, `info.threads`, `info.podman`, `info.agent_version` | gelesen beim Start, bei einem neuen System und wenn eines wieder online kommt; die Agent-Version bei jeder Abfrage |
| Systemd Services | `info.services_total`, `info.services_failed`                                                                                                               | nur Linux mit systemd                                                                                              |

`info.os` ist die Plattform-Familie (`Linux`, `macOS`, `Windows`, `FreeBSD`); `info.os_name` ist
die Distribution oder Ausgabe, die der Agent daneben meldet, etwa `Ubuntu 24.04.1 LTS`.

Uptime und Agent-Version erscheinen, sobald sich ein System zum ersten Mal verbunden hat — ein
System, das noch `pending` ist, hat beides nicht, und der Hub behält beide vom letzten Kontakt,
solange es down ist. Solange ein System pausiert ist, schickt der Hub seine Systemwerte als Nullen;
der Adapter behält stattdessen die letzten echten.

`info.services_total` zählt die systemd-Units, die der Agent beobachtet — standardmäßig jeden
Dienst, der schon einmal aktiv war —, `info.services_failed`, wie viele davon im Fehlerzustand sind.

Immer vorhanden, unabhängig von jedem Schalter: `info.online` und `info.status`. `info.online` ist
der Wert, den das Gerätesymbol im Objektbaum liest: wahr nur, solange der Hub `up` meldet, und
wieder falsch, sobald nichts gelesen wird. `info.status` trägt die vier Werte des Hubs
(`up`, `down`, `paused`, `pending`) und einen fünften des Adapters, `unknown` — für die Zeit, in der
der Adapter gestoppt ist oder den Hub nicht erreicht. Einen der vier Hub-Werte zu schreiben, würde
dort etwas behaupten, das niemand gemessen hat.

## CPU

| Schalter            | Datenpunkte                                                     |
| ------------------- | --------------------------------------------------------------- |
| CPU Usage _(an)_    | `cpu.usage`                                                     |
| Load Average _(an)_ | `cpu.load_1m`, `cpu.load_5m`, `cpu.load_15m`                    |
| CPU Breakdown       | `cpu.user`, `cpu.system`, `cpu.iowait`, `cpu.steal`, `cpu.idle` |
| Per-core usage      | `cpu.cores.core0`, `core1`, …                                   |

Die drei Load-Average-Werte haben keine Einheit: sie zählen die Prozesse, die die CPU nutzen oder
auf sie warten — deshalb gehören sie zur Kernzahl ins Verhältnis gesetzt: 4,0 ist ein ausgelasteter
Vierkerner und eine ruhige 32-Kern-Maschine. Sie gibt es nur für Systeme, deren Agent einen Wert
meldet: ein zu alter Agent bekommt keine `load_*`-Datenpunkte, und welche, die eine ältere
Adapter-Version für ihn angelegt hat, werden entfernt.

`cpu.steal` ist der Zeitanteil, den der Hypervisor anderen Gästen gegeben hat — auf echter Hardware
bleibt er bei null, auf einer überbuchten VM ist er die Zahl, die erklärt, warum sich alles zäh
anfühlt.

## Arbeitsspeicher

| Schalter            | Datenpunkte                                     |
| ------------------- | ----------------------------------------------- |
| Memory Usage _(an)_ | `memory.percent`, `memory.used`, `memory.total` |
| Memory Details      | `memory.buffers`, `memory.zfs_arc`              |
| Swap                | `memory.swap_used`, `memory.swap_total`         |

Puffer, Datei-Cache und ZFS-ARC gehören nicht zu `memory.used`: das System kann sie zurückholen,
und der Agent meldet sie getrennt. `memory.zfs_arc` gibt es nur auf Rechnern, deren ZFS-Cache
Speicher belegt, die beiden Swap-Datenpunkte nur dort, wo Swap eingerichtet ist — `swap_used`
zeigt 0, solange er ungenutzt ist.

## Festplatte

| Schalter                | Datenpunkte                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Disk Usage _(an)_       | `disk.percent`, `disk.used`, `disk.total`, `disk.name`                                                                       |
| Read/Write Speed _(an)_ | `disk.read`, `disk.write`                                                                                                    |
| Additional Filesystems  | `filesystems.<name>.disk_percent`, `.disk_used`, `.disk_total`, `.read_speed`, `.write_speed`, `.total_read`, `.total_write` |
| I/O load                | `disk.io_util`, `disk.io_await_read`, `disk.io_await_write`, `disk.total_read`, `disk.total_write`                           |

Die `disk.*`-Werte beschreiben das Dateisystem, das der Agent als Wurzel führt. Alles weitere, was
Sie in Beszel eingerichtet haben, steht unter `filesystems.`, benannt nach dem Gerät oder dem am
Agenten gesetzten eigenen Namen (`EXTRA_FILESYSTEMS=device__name`). `io_util` ist der Zeitanteil, in dem
mindestens eine Anfrage an der Platte offen war; die beiden `io_await`-Werte sind die
Durchschnittsdauer eines einzelnen Lese- bzw. Schreibvorgangs — dieselben Größen, die `iostat` als
`r_await` und `w_await` ausgibt.

`disk.name` ist der Name, den Sie der Systemfestplatte am Agenten geben können
(`FILESYSTEM=device__name`); der Datenpunkt entsteht nur, wenn dort einer gesetzt ist. Die
`total_read`/`total_write`-Werte sind Mengen, keine Raten: wie viel das Gerät seit seinem Start
gelesen bzw. geschrieben hat. Sie brauchen Beszel 0.19.0 oder neuer und beginnen nach einem Neustart
wieder bei null, weil auch der Zähler dort beginnt.

## Netzwerk

| Schalter               | Datenpunkte                                                         |
| ---------------------- | ------------------------------------------------------------------- |
| Network Traffic _(an)_ | `network.sent`, `network.recv`                                      |
| Per interface          | `network.interfaces.<name>.up`, `.down`, `.total_up`, `.total_down` |

`up`/`down` sind Raten in MB/s; `total_up`/`total_down` sind die kumulierten Zähler des
Betriebssystems in GB seit dem Start der Schnittstelle — meist seit dem Booten —, sie beginnen also
nach einem Neustart des Rechners wieder bei null, nicht nach einem Agenten-Neustart.
`network.sent`/`network.recv` zeigen 0, solange die Leitung ruht — der Hub lässt eine ruhende Rate
im Datensatz weg, und Ruhe ist ein Wert, keine Lücke.

## Temperatur und Lüfter

| Schalter                       | Datenpunkte                              |
| ------------------------------ | ---------------------------------------- |
| Temperature _(an)_             | `temperature.average`, `temperature.max` |
| Individual Temperature Sensors | `temperature.sensors.<name>`             |
| Fan Speeds                     | `fans.<name>`                            |

`temperature.average` mittelt die drei heißesten Sensoren, nicht alle — ein Board mit zwanzig
Sensoren würde eine heiße CPU sonst in kühlen Nachbarn ertränken. `temperature.max` ist der
heißeste Einzelwert und damit meist der, auf den sich eine Warnung lohnt. Beide gibt es nur auf
Rechnern, deren Agent Sensoren meldet — eine VM oder ein Container-Host ohne hwmon-Daten bekommt
keinen Temperatur-Kanal, und ein Rechner, dessen Sensoren nicht mehr gemeldet werden, verliert die
beiden Datenpunkte nach zwei Abfragen, statt einen leeren Wert zu behalten.

Lüfter brauchen Beszel 0.18.8 oder neuer und gibt es nur unter Linux, weil der Agent sie aus hwmon
liest. Sie stehen in einem eigenen Kanal `fans` statt unter Temperatur: andere Quelle, andere
Bedeutung. Ein Lüfter mit 0 rpm bleibt stehen — ein stehender Lüfter ist ein Messwert, kein
fehlender Wert.

## Speicherpools (ZFS und btrfs)

| Schalter      | Datenpunkte                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Speicherpools | `zfs.<pool>.pool_type`, `.disk_percent`, `.disk_used`, `.disk_total`, `.raw`, `.read_speed`, `.write_speed`, `.health` |

Ein Kanal je Pool. ZFS-Pools brauchen Beszel 0.19.0 oder neuer und heißen, wie `zpool list` sie
nennt; btrfs-Dateisysteme brauchen Beszel 0.20.0 und tragen den Namen, den der Agent ihnen gibt
(das Label, sonst den Einhängepunkt, sonst die UUID), während ihre Kanal-Kennung die UUID des
Dateisystems bleibt — ein neues Label verschiebt den Kanal also nicht. Die internen Namen (`zfs.`,
der Schalter) stammen aus der Zeit, als es nur ZFS gab. `pool_type` sagt, welches der beiden es ist.

Die Belegung ist das, was der Pool als belegt gegen seine Größe meldet — also nicht dieselbe Zahl,
die ein `df` in einem Dataset zeigt. Ist `raw` wahr, sind Größe und Belegung rohe physische Bytes
über alle Mitgliedsgeräte (ein btrfs-Dateisystem, dessen nutzbaren Platz der Agent nicht lesen
konnte) — dann gibt es kein `disk_percent`, weil diese Zahl in die Irre führen würde. Der Durchsatz
ist das, was der Pool im letzten Erfassungsintervall bewegt hat; ein ruhender Pool zeigt 0, nicht
„unbekannt". `health` trägt das eigene Wort des Pools (`ONLINE`, `DEGRADED`, `FAULTED`, …,
`UNKNOWN`); der Adapter reicht es unverändert weiter, ein Wort aus einer neueren Version kommt also
auch dann an, wenn es nicht in der Auswahlliste der Admin steht.

Eine btrfs-Wurzel kann zusätzlich unter Festplatte oder Zusätzliche Dateisysteme erscheinen — der
Agent meldet sie an beiden Stellen. Die Detaildaten eines Pools (Scrub-Zustand, vdevs, Datasets)
liegen in einer eigenen Sammlung auf dem Hub — dafür den Schalter **Pool-Details** einschalten
(siehe unten).

## GPU

| Schalter    | Datenpunkte                                                 |
| ----------- | ----------------------------------------------------------- |
| GPU Metrics | `gpu.<id>.usage`, `.memory_used`, `.memory_total`, `.power` |
| Details     | `gpu.<id>.power_package`, `gpu.<id>.engines.<name>`         |

Der GPU-Speicher wird in MB gemeldet und existiert nur bei GPUs, die ihn melden — eine
integrierte GPU tut das meist nicht und bekommt keine Speicher-Datenpunkte. `power_package`
(GPU-Details) gibt es ebenso nur bei GPUs mit Paketleistungs-Sensor, etwa Intel-GPUs über
`intel_gpu_top`; eine NVIDIA-Karte hat keinen.

## Container

| Schalter             | Datenpunkte                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Container Monitoring | `containers.<name>.status`, `.health`, `.cpu`, `.memory`, `.image`, `.network`, `.update_available` |

`health` ist das Ergebnis der Health-Prüfung des Images und steht auf `none`, wenn das Image keine
definiert. `cpu` ist der Anteil an der gesamten CPU des Hosts, alle Kerne zusammen sind also 100 % —
`docker stats` teilt stattdessen durch einen einzelnen Kern und zeigt für dieselbe Last eine höhere
Zahl. `network` ist Gesendet und Empfangen zusammen in Byte pro Sekunde und erscheint nur, wenn der
Hub den Wert liefert.

`update_available` (Beszel 0.20.0) ist wahr, wenn die Registry unter dem Tag des Containers ein
neueres Image hat als das, mit dem er läuft. Falsch heißt: kein Update bekannt — auch wenn das
Image fest angepinnt oder von der Prüfung ausgenommen ist, die Prüfung scheiterte oder noch nicht
lief. Der Datenpunkt erscheint nur, wenn der Hub die Spalte führt.

## Akku

| Schalter       | Datenpunkte                                                       |
| -------------- | ----------------------------------------------------------------- |
| Battery Status | `battery.percent`, `battery.charging`, `battery.batteries.<name>` |

`battery.charging` ist nur wahr, während der Akku wirklich lädt — nicht wenn er voll ist, im
Leerlauf oder entlädt. Die Werte je Akku brauchen Beszel 0.18.8 oder neuer; eine Maschine mit einem
einzigen Akku bekommt genau diesen einen Eintrag, ohne Schwelle, die beim Entfernen eines zweiten
Akkus die Kinder löschen würde. Ein Rechner ohne Akku bekommt gar keinen Akku-Kanal.

## SMART-Geräte

| Schalter     | Datenpunkte                                                                                                                            | Hinweise                                           |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| SMART-Geräte | `smart.<Gerät>.state`, `.model`, `.serial`, `.firmware`, `.interface`, `.temperature`, `.capacity`, `.power_on_hours`, `.power_cycles` | braucht smartctl auf dem Host; alle 15 Min gelesen |

`state` ist das Gesamturteil: die SMART-Selbstbewertung des Laufwerks (`PASSED` / `FAILED`), oder
bei eMMC-Speicher und Linux-md-RAIDs — die der Agent ohne smartctl liest — der Verschleiß- bzw.
Array-Zustand, der auch `WARNING` sagen kann. `UNKNOWN` heißt, der Agent konnte das Laufwerk nicht
beurteilen. `power_on_hours` und `power_cycles` zählen über die gesamte Lebensdauer des Laufwerks,
nicht seit dem letzten Start. `temperature` und `capacity` gibt es nur für Laufwerke, die sie
melden, und eine Textspalte, die das Laufwerk nicht gefüllt hat, bleibt leer, statt etwas zu melden,
das wie ein Messwert aussieht.

Der Hub frischt die SMART-Daten standardmäßig einmal pro Stunde auf (die Agent-Einstellung
`SMART_INTERVAL` ändert das); der Adapter liest sie alle 15 Minuten, ein neues Urteil erscheint
also spätestens eine Viertelstunde nach der Auffrischung am Hub.

## Pool-Details

| Schalter     | Datenpunkte                                                                          | Hinweise                                        |
| ------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------- |
| Pool-Details | `zfs.<Pool>.scrub_state`, `.scrub_progress`, `.scrub_errors`                         | braucht den Schalter Speicherpools              |
| Pool-Details | `zfs.<Pool>.vdevs.<Vdev>.state`, `.read_errors`, `.write_errors`, `.checksum_errors` | gezählt seit dem letzten Zurücksetzen des Pools |
| Pool-Details | `zfs.<Pool>.datasets.<Dataset>.used`, `.avail`, `.mountpoint`                        | GB                                              |

Die Scrub-Datenpunkte gibt es erst, wenn ein Pool einmal gescrubbt wurde — ein ZFS-Pool, der nie
gescrubbt wurde, und jedes btrfs-Dateisystem (der Agent liest keinen btrfs-Scrub) hat keine.
`scrub_state` ist `SCANNING`, `FINISHED` oder `CANCELED`, `scrub_progress` der erledigte Anteil
während eines laufenden Scrubs (etwa `42.10%`). `scrub_errors` ist das, was der letzte Scrub oder
Resilver nicht beheben konnte; der Wert bleibt bis zum Ende des nächsten Laufs stehen — eine Null
dort ist also nur so frisch wie der letzte Scrub.

Ein btrfs-Dateisystem führt seine Mitgliedsgeräte als vdevs und hat keine Datasets. Ein
vdev-`state` `MISSING` heißt, ein Mitgliedsgerät fehlt.

Der Hub frischt diese Details etwa stündlich auf, der Adapter liest sie deshalb höchstens
alle 15 Minuten — Belegung und Zustand der Pools im Minutentakt stehen weiter oben bei den
Speicherpools. Details erreichen nur Pools, die die Speicherpool-Gruppe gerade zeigt.

## systemd-Dienst-Details

| Schalter       | Datenpunkte                                                                           | Hinweise                             |
| -------------- | ------------------------------------------------------------------------------------- | ------------------------------------ |
| Dienst-Details | `services.<Unit>.state`, `.sub_state`, `.cpu`, `.cpu_peak`, `.memory`, `.memory_peak` | braucht den Schalter Systemd-Dienste |

Ein Kanal je Unit — auf einem gut gefüllten Host sind das viele Datenpunkte. `state` und
`sub_state` tragen das systemd-Wort (`active`, `running`, …), nicht die Zahl des Hubs. Der Agent
liest die Units alle 10 Minuten: `cpu` ist das Mittel über diese 10 Minuten als Anteil am ganzen
Host, alle Kerne zusammen sind 100 %. `cpu_peak` und `memory_peak` sind die Höchstwerte, seit der
Agent die Unit beobachtet; beim Speicher zählt auch der eigene Spitzenwert von systemd seit dem
Start der Unit.

## Netzwerk-Monitore

| Schalter          | Datenpunkte                                                                                                                                                                                                   | Hinweise                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| Netzwerk-Monitore | `monitors.<id>.protocol`, `.target`, `.port`, `.interval`, `.enabled`, `.response`, `.response_avg_1h`, `.response_min_1h`, `.response_max_1h`, `.loss_1h`, `.last_probe_loss`, `.last_probe`, `.last_update` | Beszel 0.20.0 oder neuer |

Ein Kanal je Monitor, den Sie für das System am Hub eingerichtet haben — der Agent prüft das Ziel
per Ping (`icmp`), `tcp`, `http` oder `dns` im eingestellten Intervall. Die Kanal-Kennung setzt
sich aus Protokoll und Ziel zusammen (bei tcp mit Port); ändert sich das Ziel eines Monitors,
wandert er auf einen neuen Kanal, und der alte geht. `port` gibt es nur bei tcp-Monitoren.

`response` ist die letzte Antwortzeit in ms, `response_avg_1h`, `response_min_1h` und
`response_max_1h` decken die letzte Stunde ab; alle vier bleiben leer, solange es keine
erfolgreiche Prüfung gab. `loss_1h` ist der Anteil fehlgeschlagener Prüfungen der letzten Stunde
in %. `last_probe_loss` und `last_probe` stammen aus dem neuesten Prüf-Datensatz: sein Verlust und
sein Zeitpunkt — bei langem Intervall kann dieser Datensatz bis zu ein Intervall alt sein, deshalb
heißt er nicht „letzte Minute". `last_update` ist der Zeitpunkt, zu dem der Hub den Monitor zuletzt
aktualisiert hat; bei einem nie gemessenen Monitor bleibt er leer, und seine Werte ebenso. Ein am
Hub abgeschalteter Monitor behält seine letzten Werte mit `enabled` falsch.