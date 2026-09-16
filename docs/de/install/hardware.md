---
title:       "Hardware"
lastChanged: "07.09.2026"
---

# Welche Hardware für ioBroker?

ioBroker läuft überall dort, wo Node.js läuft. Die Frage ist deshalb nicht, ob
eine Hardware es *kann*, sondern ob sie es **rund um die Uhr, über Jahre und
ohne Aufsicht** kann. Danach richten sich die Empfehlungen auf dieser Seite.

Die Mindest- und Richtwerte für Arbeitsspeicher und Plattenplatz stehen unter
[Anforderungen](/docs/install/requirements.md).
Hier geht es um die Geräteklassen selbst.

## Die vier Klassen

### Raspberry Pi und andere Einplatinenrechner

Der übliche Einstieg, und für ein Haus mit überschaubarer Technik völlig
ausreichend. Empfehlenswert ab einem Raspberry Pi 4 mit 4 GB Arbeitsspeicher.
Kleinere Modelle und der Zero sind zu knapp, sobald mehr als eine Handvoll
Adapter laufen.

Zwei Punkte entscheiden hier über Freude oder Ärger:

!> **Das Netzteil.** Handy-Ladegeräte reichen nicht. Ein zu schwaches Netzteil
   erzeugt Fehler, die wie Softwareprobleme aussehen: abstürzende Adapter,
   beschädigte Datenbanken, spontane Neustarts. Das Originalnetzteil des
   Herstellers ist die sichere Wahl.

!> **Keine SD-Karte für den Dauerbetrieb.** ioBroker schreibt ständig -
   Zustände, Protokolle, Datenbanken. SD-Karten vertragen das nur begrenzt und
   sterben leise: Erst wird das System langsam, dann tauchen unerklärliche
   Fehler auf, dann ist es zu spät. Ein Pi 4 oder 5 startet von einer USB-SSD,
   und das ist die einzige Empfehlung, die hier ohne Einschränkung gilt.

### Mini-PC

Ein gebrauchter Bürorechner im Kleinformat oder ein NUC-artiges Gerät ist die
Klasse, in der die meisten größeren Installationen laufen. Mehr Arbeitsspeicher,
eine richtige SSD, deutlich mehr Rechenleistung als ein Einplatinenrechner - und
im Leerlauf oft nur wenige Watt mehr.

Für alles, was über die reine Haussteuerung hinausgeht - eine Zeitreihen-
datenbank, Grafana, Kameras, Sprachverarbeitung - ist das die untere Grenze.

### NAS

Wer ohnehin ein NAS betreibt, kann ioBroker dort im
[Docker-Container](/docs/install/docker.md)
laufen lassen. Das spart ein Gerät, hat aber zwei Haken: Das NAS muss die
Ressourcen zusätzlich zu seinen eigenen Aufgaben aufbringen, und Adapter, die
Geräte im Netz suchen oder auf angesteckte Hardware zugreifen, brauchen
besondere Einstellungen am Container.

### Server mit Virtualisierung

Auf einem Rechner laufen mehrere Systeme nebeneinander, ioBroker ist eines
davon - siehe
[Proxmox](/docs/install/proxmox.md). Der
Vorteil ist die Trennung: Ein Schnappschuss vor einem Update, und im Zweifel ist
der Stand von vorhin in einer Minute zurück. Der Preis ist eine weitere Ebene,
die man verstehen und pflegen muss.

## Was für alle Geräte gilt

**Strom.** Ein Gerät, das durchgehend läuft, kostet pro Watt und Jahr etwa drei
Euro. Zwischen einem sparsamen und einem beliebigen Aufbau liegen schnell 20
Watt - das ist der spürbarere Unterschied als der Kaufpreis.

**Betriebssystem ohne Oberfläche.** Die Servervariante ohne Desktop. Eine
grafische Oberfläche verbraucht Ressourcen für etwas, das niemand sieht, und
vergrößert die Angriffsfläche.

**Debian oder ein Abkömmling.** Ubuntu und Raspberry Pi OS gehören dazu.
Andere Distributionen sind möglich, aber die Skripte, die Anleitungen und die
Antworten im Forum sind auf Debian abgestimmt.

**64 Bit.** Auch auf einem Raspberry Pi. Node.js unterstützt 32-Bit-Systeme
zunehmend schlechter.

**Reserve einplanen.** Eine Installation wächst. Der Adapter, der heute noch
nicht gebraucht wird, ist in einem Jahr installiert, und die Historie, die
heute leer ist, füllt sich täglich.

## Was sich nicht lohnt

* **Ein Gerät, das auch etwas anderes tut** - der Arbeitsrechner, der
  Medienserver im Wohnzimmer. ioBroker soll laufen, wenn niemand daran denkt.
* **WLAN statt Kabel**, wenn es sich vermeiden lässt. Eine
  Haussteuerung, die vom WLAN abhängt, fällt mit dem WLAN aus.
* **Der billigste Speicher.** Die Karte oder die SSD hält die Daten von Jahren.

?> Ein Umzug auf stärkere Hardware ist keine Neuinstallation: Ein Backup mit
   `iob backup` und das Zurückspielen auf dem neuen Gerät bringen die komplette
   Installation mit. Es lohnt sich also nicht, aus Sorge vor dem Umzug zu groß
   zu kaufen.
